import { useState } from 'react'
import { FormActionProps } from './ex-create-exercice'
import { getRecaptchaToken } from '../../utils/reCaptcha'
import { BASE_URL } from '.'
import { POSTrequest } from '../../utils/requests'
import TitleModule from './ex-title'
import UserInput from './ex-user-input'
import ExButton from './ex-button'

export default function CreateUserModule({ updateServerResponse }: FormActionProps) {
  const [username, setUsername] = useState<string>('')

  async function handleCreateUser() {
    const stuff = {
      username: username,
      gRecaptchaResponse: await getRecaptchaToken(),
    }

    try {
      const url = `${BASE_URL}/api/users`
      const response = await POSTrequest(url, stuff)
      setUsername('')

      updateServerResponse(JSON.stringify(response, null, 2))
    } catch (error) {
      updateServerResponse('Une Erreur est survenue')
    }
  }

  return (
    <div className='flex flex-col items-center md:items-start'>
      <TitleModule title={'Créer un Utilisateur'} method={'post'} endpoint={'/api/users'} />
      <div className='flex flex-col md:flex-row items-center md:justify-between md:w-[19.5rem] lg:w-[20.5rem] xl:w-[17.5rem] 2xl:w-[19.5rem] my-2'>
        <UserInput placeholder={`Nom d'utilisateur`} value={username} updateValue={setUsername} />
        <ExButton execute={handleCreateUser} />
      </div>
    </div>
  )
}
