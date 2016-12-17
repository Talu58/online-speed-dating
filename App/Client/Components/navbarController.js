import temp from '../Templates/navbarTemplate.vue';
import { mapState } from 'vuex';
import auth from '../Auth/auth.js'

const navbar = {
  name: 'navbar',
  template: temp.template,
  data () {
    return {
      user: {
        isAuth: auth.user.isAuth
      }
    };
  },
  computed: {
    username () {
      return this.$store.state.user.username;
    }
  },

  methods: {
    checkAuth () {
      console.log("checkAuth", this.$store.state.user.isAuth)
      return auth.user.isAuth;
    },
    goToMyProfile: function() {
      if(this.checkAuth()) {
        this.$router.push('/myprofile/' + this.user.username);
      }
    },
    goToEditProfile: function() {
      this.$router.push('/myprofile/' + this.user.username + '/edit');
    },
    goToEvents: function() {
      this.$router.push('/events/' + this.user.username );
    },
    logout: function() {
      this.$store.commit('logout');
      auth.user.isAuth = false;
      this.$router.push('/');
    },
    login () {
      var userData = {
        username: this.user.username,
        password: this.user.password
      };
      auth.login(this, userData, {headers: auth.getHeaders()})
      .then((response) => {
        auth.user.isAuth = true;
        console.log(response)
        localStorage.setItem('id_token', response.body.id_token);
        this.user = response.data.data;
        this.user.isAuth = true;
        this.$store.commit('setUser', this.user);
        this.$router.push(`/myprofile/${userData.username}`);
      })
      .catch((err) => {
        this.error = err;
      });
    },
  }
};

export default navbar;


