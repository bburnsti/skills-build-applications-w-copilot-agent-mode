import ViewState from './ViewState.jsx'
import { useCollection } from './useCollection.js'

const endpointPath = '/api/teams/'

export default function Teams() {
  const { items: teams, status, error } = useCollection('teams', endpointPath)

  return (
    <section className="page-section">
      <header className="page-header">
        <span>Groups</span>
        <h1>Teams</h1>
      </header>

      <ViewState status={status} error={error}>
        <div className="data-grid">
          {teams.map((team) => (
            <article className="data-card" key={team._id ?? team.name}>
              <div>
                <h2>{team.name}</h2>
                <p>{team.city}</p>
              </div>
              <dl>
                <div>
                  <dt>Mascot</dt>
                  <dd>{team.mascot}</dd>
                </div>
                <div>
                  <dt>Members</dt>
                  <dd>{team.members?.length ?? 0}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </ViewState>
    </section>
  )
}