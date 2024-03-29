import axios from 'axios'

export const endpoint = 'https://api.github.com/graphql'

const apiClient = axios.create({
  baseURL: endpoint,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `bearer ${process.env.VUE_APP_ACCESS_TOKEN}`,
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
