import temp from '../Templates/signupTemplate.vue';
import {mapState} from 'vuex';
import auth from '../Auth/auth.js'


let signup = {
  template: temp.template,
  name: 'signup',
  data () {
    return {
      user: {
        username: '',
        password: '',
        age: '',
        gender: '',
        location: '',
        interestedIn: '',
        isAuth: !!(localStorage['id_token'])
      }
    };
  },

  methods: {
    signup () {
      let userData = {
        username: this.user.username,
        password: this.user.password,
        age: this.user.age,
        gender: this.user.gender,
        location: this.user.location,
        interestedIn: this.user.interestedIn
      };
      var context = this;
      auth.signup(this, userData)
      .then((response) => {
        console.log('RESP', response)
        auth.user.isAuth = true;
        response.data.data.password ="";
        localStorage.setItem('id_token', response.data.id_token);
        localStorage.setItem('username', userData.username)
        context.user = response.data.data;
        context.user.isAuth = true;
        context.$store.commit('setUser', context.user);
        console.log("CONTEXT", context.user)
        context.$router.push(`/myprofile/${response.data.data.username}`);
      })
      .catch((err) => {
        this.error = err;
      });
    }
  }
};

export default signup;








    //   this.$http.post('/auth/signup', body)
    //   .then((response) => {
    //     // this.login();
    //     var body = response.body;
    //     console.log('RESP BODY ON SIGNUP', response.body)
    //     this.$store.commit('setUser', body);
    //     this.$store.commit('setSavedEvents', body.events);
    //     this.$router.push('/myprofile/' + this.username);
    //     this.$http.get('/api/events')
    //       .then((res) => {
    //         this.$store.commit('setAllEvents', res.body);
    //       });
    //   })
    //   .catch((err) => {
    //     alert('username already exists');
    //   });


    // need to port over login function correctly from login controller
    // login: function() {
    //   this.$http.post('/auth/login', {
    //     username: this.username,
    //     password: this.password
    //   })
    //   .then((res) => {
    //     var body = res.body;
    //     this.$http.get('/api/events')
    //       .then((res) => {
    //         this.$store.commit('setAllEvents', res.body);
    //       });
    //     this.$store.commit('setUser', body);
    //     this.$store.commit('setSavedEvents', body.events);
    //     this.$router.push('/myprofile/' + this.username);
    //   })
    //   .catch((err) => console.error(err));
    // }







