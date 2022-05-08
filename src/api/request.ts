import axios from "axios"

axios.defaults.baseURL = ""

// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
// See below for an example using Custom instance defaults instead.
// axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN"

// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded"

const instance = axios.create()

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status === 200) {
      return response.data
    }
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // alert && alert(error.response.data.msg)
    console.log(error.response.status)
    return Promise.reject(error)
  }
)

// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
instance.defaults.timeout = 10000

export { instance }
