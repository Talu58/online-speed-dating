import temp from '../Templates/signupTemplate.vue';

var signup = {
  template: temp.template,
  data: function() {
    return {
      username: '',
      password: '',
      age: '',
      gender: '',
      location: '',
      interestedIn: ''
    };
  },

  methods: {
    signup: function($http) {
      var body = {
        username: this.username,
        password: this.password,
        gender: this.gender,
        age: this.age,
        location: this.location,
        interestedIn: this.interestedIn,
        admin: false
      };
      console.log('body: ', body);
      this.$http.post('/auth/signup', body)
      .then((response) => {
        // this.login();
        var body = response.body;
        console.log('RESP BODY ON SIGNUP', response.body)
        this.$store.commit('setUser', body);
        this.$store.commit('setSavedEvents', body.events);
        this.$router.push('/myprofile/' + this.username);

        this.$http.get('/api/events')
          .then((res) => {
            this.$store.commit('setAllEvents', res.body);
          });
        t
      })

      .catch((err) => {
        alert('username already exists');
      });
    }
    //need to port over login function correctly from login controller
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
  }
};

export default signup;