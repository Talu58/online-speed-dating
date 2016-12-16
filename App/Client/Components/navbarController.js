import temp from '../Templates/navbarTemplate.vue';
import { mapState } from 'vuex';
import auth from '../Auth/auth.js'

const navbar = {
  name: 'navbar',
  template: temp.template,
  data () {
    return {
      user: auth.user,
    };
  },
  computed: {
    username () {
      return this.$store.state.user.username;
    }
  },

  methods: {
    goToMyProfile: function() {
      this.$router.push('/myprofile/' + this.user.username);
    },
    goToEditProfile: function() {
      this.$router.push('/myprofile/' + this.user.username + '/edit');
    },
    goToEvents: function() {
      this.$router.push('/events');
    },
    logout: function() {
      auth.logout();
      this.$router.push('/');
      this.$store.commit('clearState');
    },
    login () {
      let userData = {
        username: this.user.username,
        password: this.user.password
      };
      auth.login(this, userData)
      .then((response) => {
        localStorage.setItem('id_token', response.body.id_token);
        this.user.isAuth = true;
        this.$store.commit('setUser', response.data.data);
        this.$router.push(`/myprofile/${userData.username}`);
      })
      .catch((err) => {
        this.error = err;
      });
    }
  }
};

export default navbar;


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




