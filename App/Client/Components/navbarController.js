import temp from '../Templates/navbarTemplate.vue';
import { mapState } from 'vuex';
import auth from '../Auth/auth.js'

const navbar = {
  name: 'navbar',
  template: temp.template,
  data () {
    return {
      user: auth.user
    };
  },
  computed: {
    username () {
      return this.$store.state.user.username;
    },
    isAuth() {
      return user.auth.user;
    }
  },

  methods: {
    checkAuth () {
      return auth.user.isAuth;
    },
    logout: function() {
      this.user.isAuth = false;
      auth.logout();
      this.$router.push(`/`);
    },
    goToMyProfile: function() {
      if(window.localStorage['id_token']) {
        this.$router.push('/myprofile/' + this.user.username);
      }
    },
    goToEditProfile: function() {
      this.$router.push('/myprofile/' + this.user.username + '/edit');
    },
    goToEvents: function() {
      this.$router.push('/myprofile/' + this.user.username + '/events');
    },
    
    login () {
      var userData = {
        username: this.user.username,
        password: this.user.password,
      };
      var context = this;
      auth.login(context, userData, {headers: auth.getHeaders()})
      .then((response) => {
        auth.user.isAuth = true;
        response.data.data.password ="";
        localStorage.setItem('id_token', response.data.id_token);
        localStorage.setItem('username', userData.username)
        context.user = response.data.data;
        context.user.isAuth = true;
        context.$store.commit('setUser', context.user);
        context.$router.push(`/myprofile/${userData.username}`);
      })

      .catch((err) => {
        this.error = err;
      });
    },
  }
};

export default navbar;


