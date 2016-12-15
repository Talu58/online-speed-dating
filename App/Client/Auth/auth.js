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
    context.$http.post(LOGIN_URL, credentials)
    .then((data) => {
      console.log('DATA ON LOGIN?', login);
      localStorage.setItem('id_token', data.body.id_token);
      this.user.isAuth = true;
      if(redirect) {
        console.log('redirect!', redirect)
        this.$router.push(redirect);      
      }
    })
    .catch((err) => {
      context.error = err;
    })
  },

  signup(context, credentials, redirect) {
    context.$http.post(SIGNUP_URL, credentials)
    .then((data) => {
      console.log('DATA ON SIGNUP?', data)
      localStorage.setItem('id_token', data.body.id_token);
      this.user.isAuth = true;
      if(redirect) {
        this.$router.push(redirect);        
      }
      context.checkAuth();
    })
    .catch((err) => {
      context.error = err
    })
  },

  // To log out, we just need to remove the token
  logout() {
    console.log("this.user", this.user)
    localStorage.removeItem('id_token');
    this.user.isAuth = false;
  },
  
  checkAuth() {
    console.log('checkAuth', this.user, localStorage.getItem('id_token'))
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.isAuth = true;
    }
    else {
      this.user.isAuth = false;      
    }
  },

  // The object to be passed as a header for isAuth requests
  getAndSetAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}

export default auth;