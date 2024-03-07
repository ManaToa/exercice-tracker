const db = require('../controllers/database/db-exercice-tracker')
const captcha = require('../controllers/reCaptcha')

const checkInput = (input) => /^[\w\s.-]*$/i.test(input)

module.exports = (app) => {
  app.get('/exercise-tracker/api/users', (req, res) => {
    db.getAllUsers((err, users) => {
      if (err) return res.json(err)
      res.json(users)
    })
  })

  app.get('/exercise-tracker/api/users/:_id/logs', (req, res) => {
    const from = req.query.from ? new Date(req.query.from) : null
    const to = req.query.to ? new Date(req.query.to) : null
    const limit = req.query.limit
    db.getUserById(req.params._id, (err, user) => {
      if (err) return res.json(err)
      db.getExercicesFromUser(user._id, from, to, limit, (err2, exs) => {
        if (err2) return res.json(err2)
        const count = exs.length
        const logsData = {
          _id: user._id,
          username: user.username,
          count: count,
          log: exs.map((ex) => ({
            description: ex.description,
            duration: ex.duration,
            date: ex.date.toDateString(),
          })),
        }
        res.json(logsData)
      })
    })
  })

  app.post('/exercise-tracker/api/users', async (req, res) => {
    const isNotBot = await captcha.verify(req.body)
    if (!isNotBot.success)
      return res.json({
        error: `Désolé, nous n'avons pas pu vérifier que vous n'êtes pas un robot. Veuillez réessayer.`,
      })

    const username = req.body.username

    if (!checkInput(username))
      return res.json({
        error: `Entrée Invalide, certains caractères ne sont pas autorisés.`,
      })

    db.createUser(username, (err, data) => {
      if (err) return res.json(err)
      res.json(data)
    })
  })

  app.post('/exercise-tracker/api/users/:_id/exercises', async (req, res) => {
    const isNotBot = await captcha.verify(req.body)
    if (!isNotBot.success)
      return res.json({
        error: `Désolé, nous n'avons pas pu vérifier que vous n'êtes pas un robot. Veuillez réessayer.`,
      })

    if (
      !checkInput(req.body._id) ||
      !checkInput(req.body.description) ||
      !checkInput(req.body.duration) ||
      !checkInput(req.body.date)
    )
      return res.json({
        error: `Entrée Invalide, certains caractères ne sont pas autorisés.`,
      })

    db.getUserById(req.params._id, (err, user) => {
      if (err) return res.json(err)
      const exData = {
        _id: user._id,
        username: user.username,
        description: req.body.description,
        duration: req.body.duration,
        date: !isNaN(new Date(req.body.date))
          ? new Date(req.body.date)
          : new Date(),
      }
      db.createExercice(exData, (err, data) => {
        if (err) return res.json(err)
        res.json({
          _id: data.userId,
          username: user.username,
          description: data.description,
          duration: data.duration,
          date: data.date.toDateString(),
        })
      })
    })
  })
}
