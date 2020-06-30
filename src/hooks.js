import { useLocation, useNavigate } from '@reach/router'
import Maybe from 'crocks/Maybe'
import { prop } from 'ramda'
import { useCallback, useEffect, useState } from 'react'

const { Nothing } = Maybe

export const useQuery = () => new URLSearchParams(useLocation().search)

export const useLanguage = () => {
  const query = useQuery()
  const location = useLocation()
  const navigate = useNavigate()
  const queryLanguage = query.get('language')

  useEffect(() => {
    if (!queryLanguage) {
      const pathname = prop('pathname')
      navigate(`${pathname(location)}?language=en`)
    }
  }, [navigate, location, query, queryLanguage])
  return queryLanguage
}

export const useContentfulRequest = request => {
  const [data, setData] = useState(Nothing())
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  const handleDataLoaded = useCallback(x => {
    setLoading(false)
    setData(x)
  }, [])

  useEffect(() =>
    request(setError)(handleDataLoaded), [handleDataLoaded, request])

  return [loading, error, data]
}
