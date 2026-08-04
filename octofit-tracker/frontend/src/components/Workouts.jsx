import ViewState from './ViewState.jsx'
import { useCollection } from './useCollection.js'

export default function Workouts() {
  const { items: workouts, status, error } = useCollection('workouts')

  return (
    <section className="page-section">
      <header className="page-header">
        <span>Suggestions</span>
        <h1>Workouts</h1>
      </header>

      <ViewState status={status} error={error}>
        <div className="data-grid">
          {workouts.map((workout) => (
            <article className="data-card workout-card" key={workout._id ?? workout.title}>
              <div>
                <h2>{workout.title}</h2>
                <p>{workout.description}</p>
              </div>
              <div className="chip-row">
                <span>{workout.difficulty}</span>
                <span>{workout.durationMinutes} min</span>
              </div>
              <ul>
                {(workout.exercises ?? []).map((exercise) => (
                  <li key={exercise}>{exercise}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </ViewState>
    </section>
  )
}