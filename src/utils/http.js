import axios from 'axios'
import message from 'vanilla-antd-message'
import 'vanilla-antd-message/dist/style.css'

// const message = new Message();
const service = axios.create({
  baseURL: process.env.USE_MOCK ? '/mock' : process.env.BASE_API,
  timeout: 30000, 
  withCredentials:true,
})

service.interceptors.request.use(
  config => {
    // add timestamp prevent ie cache
    let url = config.url
    let timeStamp = 'timestamp=' + new Date().getTime().toString()
    if (url.indexOf('?') === -1) {
      url = url + '?' + timeStamp
    } else {
      url = url + '&' + timeStamp
    }
    config.url = url

    /// if use token
    // if (store.state.token !== null && store.state.token !== '') {
    // config.headers['Authorization'] = store.state.token;
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    message.error(error)
    // Promise.reject({message:error})
  }
)

service.interceptors.response.use(
  response => {
    let data = response.data
    if (data.success) {
      return data
    } else {
      switch (data.code) {
        case 401:
          // message.warning('登录失效或登录超时，请重新登录')
          // window.location.href = '/login'
          break;
        default:
          message.error(data.message)
          // return Promise.reject(response)
      }
      //1，这里， 2api的catch，3如果没catch才会下面
    }
    // console.log(process.env.VUE_APP_ENV == 'mock' ? '/mock' : env.apiHost);
    return Promise.reject(response)
  },
  error => {
    console.log(error)
    let errorInfo = {}
    if (error.response) {
      errorInfo.errCode = error.response.data.code
      errorInfo.message = error.response.data.message
    } else {
      errorInfo.message = error.message
    }
    message.error(errorInfo.message)

    return Promise.reject(errorInfo)
  }
)

export default service
