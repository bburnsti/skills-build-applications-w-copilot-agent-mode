const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function normalizeCollection(payload, collectionName) {
  if (Array.isArray(payload)) {
    return payload
  }

  const candidates = [
    payload?.[collectionName],
    payload?.data?.[collectionName],
    payload?.results,
    payload?.items,
    payload?.data,
  ]

  return candidates.find(Array.isArray) ?? []
}

export async function fetchCollection(collectionName, endpointPath = `/api/${collectionName}/`) {
  const apiPath = endpointPath.replace(/^\/api/, '')
  const response = await fetch(`${API_BASE_URL}${apiPath}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return normalizeCollection(payload, collectionName)
}