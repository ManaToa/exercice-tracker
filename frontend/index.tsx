import { useEffect, useState } from 'react'
import { initRecaptcha } from '../../utils/reCaptcha'
import BoxContainer from './ex-box-container'
import GETRequests from './ex-GET-requests'
import ServerResponse from './ex-server-response'
import CreateExerciceModule from './ex-create-exercice'
import CreateUserModule from './ex-create-user'

export const BASE_URL = '/exercise-tracker'

export default function ExerciceTracker() {
  const [serverResult, setServerResult] = useState<string>('')

  useEffect(() => {
    initRecaptcha()
  }, [])

  return (
    <div className='w-[13.5rem] md:w-[33rem] xl:w-[29rem] 2xl:w-[35rem]'>
      <BoxContainer children={<CreateUserModule updateServerResponse={setServerResult} />} />
      <BoxContainer children={<CreateExerciceModule updateServerResponse={setServerResult} />} />
      <BoxContainer children={<ServerResponse response={serverResult} />} />
      <BoxContainer children={<GETRequests />} />
    </div>
  )
}
