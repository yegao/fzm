import Notyf from './../notyf/index.js'
import axios from 'axios'
import qs from 'qs'
const notyf = new Notyf()
const methods = ['get', 'post', 'options', 'delete', 'head', 'put', 'patch']
const sp_restfuls = {
  before() {
    console.log('开始请求')
  },
  after() {
    console.log('获得数据')
  }
}
for (const method of methods) {
  sp_restfuls[method] = (cors, ...args) => {
    sp_restfuls.before()
    let _args
    const headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
    if (cors === true) { // 需要跨域
      Object.assign(headers, { 'Access-Control-Allow-Headers': 'X-Requested-With,content-type' })
    } else {
      args = [cors, ...args]
    }
    if (~['get', 'delete', 'head', 'options'].indexOf(method)) {
      args[1] && Object.assign(headers, args[1].headers)
      _args = [args[0], { ...args[1], headers }]
    } else {
      args[2] && Object.assign(headers, args[2].headers)
      if (~headers['Content-Type'].indexOf('x-www-form-urlencoded')) {
        // 不直接qs.stringify(args[1])是因为args[1]有可能是undefined {...undefined} === {}
        args[1] = qs.stringify({ ...args[1] })
      }
      _args = [args[0], args[1], { ...args[2], headers }]
    }
    return axios[method](..._args).then((res) => {
      sp_restfuls.after()
      return new Promise((resolve) => {
        resolve(res.data)
      })
    }, (err) => {
      sp_restfuls.after()
      notyf.alert(err)
      throw new Error(err)
    })
  }
}

export default sp_restfuls
