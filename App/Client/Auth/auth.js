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
    return context.$http.post(LOGIN_URL, credentials);
  },

  signup(context, credentials, redirect) {
    return context.$http.post(SIGNUP_URL, credentials);
  },

  // To log out, we just need to remove the token
  // logout() {
  //   localStorage.removeItem('id_token');
  //   this.user.isAuth = false;
  // },

  checkAuth() {
    var jwt = localStorage.getItem('id_token');
    if(jwt) {
      this.user.isAuth = true;
    }
    else {
      this.user.isAuth = false;
    }
    console.log('checkAuth', this.user.isAuth, localStorage.getItem('id_token'));
  },
}

export default auth;