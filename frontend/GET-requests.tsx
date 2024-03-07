import CodeLook from './ex-code'
import TitleModule from './ex-title'

export default function GETRequests() {
  return (
    <div>
      <TitleModule title='Requêtes GET' />
      <TitleModule
        title={`Tous les Utilisateurs`}
        method={`get`}
        endpoint={`/api/users`}
        small={true}
      />
      <TitleModule
        title={`Logs d'un Utilisateurs`}
        method={`get`}
        endpoint={`/api/users/:_id/logs?[from]&[to]&[limit]`}
        small={true}
      />
      <div className='flex *:mb-3 md:*:mb-0 justify-between flex-col md:flex-row items-start text-xs md:text-base'>
        <p>
          <CodeLook text={`[]`} /> = optionnel
        </p>
        <p>
          <CodeLook text={`from, to`} /> = dates
        </p>
        <p>
          <CodeLook text={`limit`} /> = nombre
        </p>
      </div>
    </div>
  )
}
