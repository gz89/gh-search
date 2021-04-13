import axios from 'axios'

export const endpoint = 'https://api.github.com/graphql'
const accessToken = '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'

const apiClient = axios.create({
  baseURL: endpoint,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `bearer ${accessToken}`,
  },
})

apiClient.interceptors.response.use(null, (error) => {
  // TODO: this is totally useless as GraphQL never sends 401
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('JWT')
    window.location.href = '/signin'
  }
  return Promise.reject(error.response.data)
})

export default apiClient
