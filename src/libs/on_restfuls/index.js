import axios from 'axios'
import qs from 'qs'
import object from './../object'
import hook from '../hook'
const methods = ['get', 'post', 'options', 'delete', 'head', 'put', 'patch']
let on_restfuls = {};
for (const method of methods) {
  on_restfuls[method] = (cors, ...args) => {
    let _args
    let headers
    if (cors === true) { // 需要跨域
      headers = {'Access-Control-Allow-Headers': 'X-Requested-With,content-type'}
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
    hook.before(..._args)
    return axios[method](..._args).then((res) => {
      return new Promise((resolve) => {
        if (!object.hasOwnProps(res.data, 'code', 'data', 'message')) {
          hook.error('返回的结果不规范',..._args)
          throw new Error('返回的结果不规范')
        }
        if (res.data.code !== 200) {
          hook.error(res.data.message,..._args)
          throw new Error(res.data.message)
        }
        hook.after(..._args)
        resolve(res.data.data)
      })
    }, (err) => {
      hook.error('啊哦~~服务器开小差了',..._args)
      throw new Error(err)
    })
  }
}

export default on_restfuls
