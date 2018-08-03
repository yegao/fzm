import Notyf from './../notyf/index.js'
import axios from 'axios'
import qs from 'qs'
const notyf = new Notyf()
const methods = ['get', 'post', 'options', 'delete', 'head', 'put', 'patch']
const on_restfuls = {
  before () {
  },
  after () {
  },
  error () {
  }
}
for (const method of methods) {
  on_restfuls[method] = (cors, ...args) => {
    let _args
    let headers
    if (cors === true) { // 需要跨域
      Object.assign({ 'Access-Control-Allow-Headers': 'X-Requested-With,content-type' })
    } else {
      args = [cors, ...args]
    }
    if (~['get', 'delete', 'head', 'options'].indexOf(method)) {
      headers = args[1] && args[1].headers || null
      _args = [args[0], { ...args[1], headers }]
    } else {
      headers = args[2] && args[2].headers || null
      if (~headers['Content-Type'].indexOf('x-www-form-urlencoded')) {
        // 不直接qs.stringify(args[1])是因为args[1]有可能是undefined {...undefined} === {}
        args[1] = qs.stringify({ ...args[1] })
      }
      _args = [args[0], args[1], { ...args[2], headers }]
    }
    on_restfuls.before(..._args)
    return axios[method](..._args).then((res) => {
      return new Promise((resolve) => {
        on_restfuls.after(..._args)
        resolve(res.data)
      })
    }, (err) => {
      on_restfuls.error(..._args)
      notyf.alert(err)
      throw new Error(err)
    })
  }
}

export default on_restfuls
