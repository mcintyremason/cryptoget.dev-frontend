import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { isEmpty } from 'utils/baseUtils'

// custom hook to expose the query parameters, and search type
export const useSearchParams = () => {
  const history = useHistory<any>()

  const query = useParams()

  const [parsed, setParsed] = useState<any>(query)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const parsed = queryString.parse(history.location.search)
    const previousRequest = history.location.state?.previousRequest || {}
    // parsed is empty when on the balances view
    let newParsed = {}
    if (!isEmpty(parsed)) {
      newParsed = parsed
    } else if (!isEmpty(previousRequest)) {
      // pre-fill the holdings form with the search that was used to go to the balances page
      newParsed = previousRequest
    } else {
      // (has no history)
      setSearch('')
    }
    setParsed(newParsed)
    // only reset state if there is a non empty value to use, otherwise
    // keep the state for the balances view
    // if (resetSearch(newParsed)) setSearch('')
  }, [query, history.location])

  return { parsed, search, setSearch }
}
