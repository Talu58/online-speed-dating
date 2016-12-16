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
    },
    vIF () {
      if (localStorage['id_token']) {
        return false;
      } else {
        return true;
      }
    }
  }
};

export default navbar;


