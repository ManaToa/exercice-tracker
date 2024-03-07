import { useState } from 'react'
import { getRecaptchaToken } from '../../utils/reCaptcha'
import { POSTrequest } from '../../utils/requests'
import { BASE_URL } from '.'
import TitleModule from './ex-title'
import UserInput from './ex-user-input'
import ExButton from './ex-button'

export interface FormActionProps {
  updateServerResponse: React.Dispatch<React.SetStateAction<string>>
}

export default function CreateExerciceModule({ updateServerResponse }: FormActionProps) {
  const [uid, setUid] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [date, setDate] = useState<string>('')

  async function handleCreateExercice() {
    const stuff = {
      _id: uid,
      description: description,
      duration: duration,
      date: date,
      gRecaptchaResponse: await getRecaptchaToken(),
    }

    try {
      const url = `${BASE_URL}/api/users/${uid}/exercises`
      const response = await POSTrequest(url, stuff)
      console.log({ response })

      updateServerResponse(JSON.stringify(response, null, 2))
    } catch (error) {
      updateServerResponse('Une Erreur est survenue')
    }
  }

  return (
    <div>
      <TitleModule
        title={'Créer un Exercice'}
        method={'post'}
        endpoint={'/api/users/:_id/exercices'}
      />
      <div className='flex flex-wrap justify-between my-2'>
        <UserInput placeholder={`:_id`} updateValue={setUid} value={uid} />
        <UserInput placeholder={`Description *`} updateValue={setDescription} value={description} />
        <UserInput placeholder={`Durée * (mins.)`} updateValue={setDuration} value={duration} />
        <UserInput placeholder={`Date (AAAA-MM-JJ)`} updateValue={setDate} value={date} />
        <ExButton execute={handleCreateExercice} />
      </div>
    </div>
  )
}
