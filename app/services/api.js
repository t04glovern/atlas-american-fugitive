import { CancelToken, get } from 'axios'

/** API Wrapper Service Class */
export class ApiService {
  constructor (url = 'http://localhost:5000/') {
    this.url = url
    this.cancelToken = CancelToken.source()
  }

  async httpGet (endpoint = '') {
    this.cancelToken.cancel('Cancelled Ongoing Request')
    this.cancelToken = CancelToken.source()
    const response = await get(`${this.url}${endpoint}`, { cancelToken: this.cancelToken.token })
    return response.data
  }

  async getLocations (type) {
    return require(`../../public/types/${type}.json`)
  }

  async getLocationSummary (id) {
    return this.httpGet(`locations/${id}/summary`)
  }
}
