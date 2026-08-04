export default function ViewState({ status, error, children }) {
  if (status === 'loading') {
    return <div className="status-panel">Loading data...</div>
  }

  if (status === 'error') {
    return <div className="status-panel error">{error}</div>
  }

  return children
}