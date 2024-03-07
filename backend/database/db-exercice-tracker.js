//require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MANGO_URI)

const exerciseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
})

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
})

const Exercice = mongoose.model('Exercice', exerciseSchema)
const User = mongoose.model('User', userSchema)

const createUser = (username, done) => {
  const user = new User({ username: username })
  user
    .save()
    .then((data) => done(null, data))
    .catch((err) => done({ error: err.message }, null))
}

const getUserById = (userId, done) => {
  User.findById(userId)
    .then((user) => done(null, user))
    .catch((err) => done({ error: err.message }, null))
}

const getAllUsers = (done) => {
  User.find({})
    .then((users) => done(null, users))
    .catch((err) => done({ error: err.message }, null))
}

const createExercice = (exData, done) => {
  const exercice = new Exercice({
    userId: exData._id,
    description: exData.description,
    duration: exData.duration,
    date: exData.date,
  })
  exercice
    .save()
    .then((data) => done(null, data))
    .catch((err) => done({ error: err.message }, null))
}

const getExercicesFromUser = (userId, from, to, limit, done) => {
  const filter = { userId: userId }
  const dateFilter = {}
  if (from) dateFilter['$gte'] = from
  if (to) dateFilter['$lte'] = to
  if (from || to) filter.date = dateFilter

  Exercice.find(filter)
    .select({ _id: 0, userId: 0, __v: 0 })
    .limit(parseInt(limit))
    .exec()
    .then((data) => done(null, data))
    .catch((err) => done({ error: err.message }, null))
}

module.exports = {
  createUser: createUser,
  getUserById: getUserById,
  getAllUsers: getAllUsers,
  createExercice: createExercice,
  getExercicesFromUser: getExercicesFromUser,
}
