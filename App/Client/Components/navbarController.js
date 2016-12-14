import temp from '../Templates/navbarTemplate.vue';
import { mapState } from 'vuex';


const navbar = {
  name: 'navbar',
  template: temp.template,
  data () {
    return {
    };
  },
  computed: {
    username () {
      return this.$store.state.user.username;
    }
  },

  methods: {
    goToMyProfile: function() {
      this.$router.push('/myprofile/' + this.username);
    },
    goToEditProfile: function() {
      this.$router.push('/myprofile/' + this.username + '/edit');
    },
    goToEvents: function() {
      this.$router.push('/events');
    },
    logout: function() {
      this.$router.push('/');
      this.$store.commit('clearState');
      this.$http.get('/auth/logout')
      .then(()=>{

        console.log('logged out');
      });
    }
  }
};

export default navbar;
