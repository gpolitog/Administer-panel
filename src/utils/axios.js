import axios from 'axios'
import store from 'store'

const instance = axios.create({
  baseURL: '/api',

  validateStatus (status) {
    return status >= 200 && status < 300
  }
})

instance.interceptors.request.use(putAuthToken)
instance.interceptors.response.use(mergeRedundantData)

export default instance

/*
*  Inject from store the user token
*/
function putAuthToken (request) {
  request.headers.common['Authorization'] = store.state.auth.token
  return request
}

function mergeRedundantData (response) {
  if (response.data && response.data.data) {
    return Object.assign(response, response.data)
  }

  return response
}
