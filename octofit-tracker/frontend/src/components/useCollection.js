import { useEffect, useState } from 'react'

import { fetchCollection } from './api.js'

export function useCollection(collectionName, endpointPath) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadItems() {
      try {
        setStatus('loading')
        const nextItems = await fetchCollection(collectionName, endpointPath)

        if (!ignore) {
          setItems(nextItems)
          setStatus('ready')
        }
      } catch (caughtError) {
        if (!ignore) {
          setError(caughtError instanceof Error ? caughtError.message : 'Unable to load data')
          setStatus('error')
        }
      }
    }

    loadItems()

    return () => {
      ignore = true
    }
  }, [collectionName, endpointPath])

  return { items, status, error }
}