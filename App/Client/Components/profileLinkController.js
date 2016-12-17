import temp from '../Templates/profileLinkTemplate.vue';
import {mapState} from 'vuex';
import auth from '../Auth/auth.js'

const profileLink = {
  name: 'profileLink',
  template: temp.template,
  data () {
    return {
      user: {}
    };
  },

  computed: {
    username () {
      return this.$store.state.user.username;
    },
    checkAuth() {
      return auth.user.isAuth
    },
    
  }
};

export default profileLink;