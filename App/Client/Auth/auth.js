import {router} from '../Router/router.js'

// URL and endpoint constants
const API_URL = 'http://localhost:4321'
const LOGIN_URL = API_URL + '/auth/login'
const SIGNUP_URL = API_URL + '/auth/signup'

var auth = {
  // User object will let us check authentication status
  user: {
    isAuth: false
  },
  // Send a request to the login URL and save the returned JWT
  login(context, credentials, redirect) {
    return context.$http.post(LOGIN_URL, credentials)
  },

  signup(context, credentials, redirect) {
    return context.$http.post(SIGNUP_URL, credentials)
  },

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('userData');
    this.user.isAuth = false;
  },
  
  checkAuth() {
    var jwt = localStorage.getItem('id_token');
    if(jwt) {
      this.user.isAuth = true;
    }
    else {
      this.user.isAuth = false;
    }
  },

  getHeaders () {
    var obj = {
                Authorization: 'Bearer ' + localStorage.getItem('id_token')
              }
    return obj;
  }
}

export default auth;