import apiClient, { endpoint } from '../index'
import * as queries from './queries'

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  searchUsers(queryString: string) {
    return apiClient.post(endpoint, {
      query: queries.searchUsers,
      variables: { queryString },
    })
  },
}
