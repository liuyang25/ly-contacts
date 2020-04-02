import http from '@/utils/http'

export default {
  list(params) {
    return http.get('/contacts', params)
  },
  detail(id) {
    return http.get('/contacts/${id}')
  },
  updateActivities(id, params) {
    return http.post('/contacts/${id}', params)
  }
}