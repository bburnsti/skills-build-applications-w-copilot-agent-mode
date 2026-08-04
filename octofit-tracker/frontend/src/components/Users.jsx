import ViewState from './ViewState.jsx'
import { useCollection } from './useCollection.js'

const endpointPath = '/api/users/'

export default function Users() {
  const { items: users, status, error } = useCollection('users', endpointPath)

  return (
    <section className="page-section">
      <header className="page-header">
        <span>Profiles</span>
        <h1>Users</h1>
      </header>

      <ViewState status={status} error={error}>
        <div className="data-grid users-grid">
          {users.map((user) => (
            <article className="data-card" key={user._id ?? user.username}>
              <div>
                <h2>{user.displayName ?? user.username}</h2>
                <p>{user.email}</p>
              </div>
              <dl>
                <div>
                  <dt>Username</dt>
                  <dd>{user.username}</dd>
                </div>
                <div>
                  <dt>Fitness level</dt>
                  <dd>{user.fitnessLevel}</dd>
                </div>
                <div>
                  <dt>Team</dt>
                  <dd>{user.team?.name ?? 'Unassigned'}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </ViewState>
    </section>
  )
}