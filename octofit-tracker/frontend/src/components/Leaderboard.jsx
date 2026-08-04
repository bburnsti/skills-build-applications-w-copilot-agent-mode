import ViewState from './ViewState.jsx'
import { useCollection } from './useCollection.js'

const endpointPath = '/api/leaderboard/'

export default function Leaderboard() {
  const { items: leaderboard, status, error } = useCollection('leaderboard', endpointPath)

  return (
    <section className="page-section">
      <header className="page-header">
        <span>Competition</span>
        <h1>Leaderboard</h1>
      </header>

      <ViewState status={status} error={error}>
        <ol className="leaderboard-list">
          {leaderboard.map((entry) => (
            <li key={entry._id ?? entry.rank}>
              <span className="rank">#{entry.rank}</span>
              <div>
                <strong>{entry.user?.displayName ?? entry.user?.username ?? 'Athlete'}</strong>
                <small>{entry.workoutsCompleted} workouts</small>
              </div>
              <span className="score">{entry.score}</span>
            </li>
          ))}
        </ol>
      </ViewState>
    </section>
  )
}