import storage from './storage'

const JWT_TOKEN_KEY = 'token'

export default {
  setToken (token) {//写token
    storage.write(JWT_TOKEN_KEY, token)
  },
  getToken () {//读取token
    return storage.read(JWT_TOKEN_KEY)
  },
  removeToken () {//移出token
    storage.delete(JWT_TOKEN_KEY)
  },
  checkAuth () {//检查token
    return storage.check(JWT_TOKEN_KEY)
  }
}
