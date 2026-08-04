import ViewState from './ViewState.jsx'
import { useCollection } from './useCollection.js'

export default function Activities() {
  const { items: activities, status, error } = useCollection('activities')

  return (
    <section className="page-section">
      <header className="page-header">
        <span>Logs</span>
        <h1>Activities</h1>
      </header>

      <ViewState status={status} error={error}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Activity</th>
                <th>User</th>
                <th>Duration</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.type}-${activity.activityDate}`}>
                  <td>{activity.type}</td>
                  <td>{activity.user?.displayName ?? activity.user?.username ?? 'Unknown'}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ViewState>
    </section>
  )
}