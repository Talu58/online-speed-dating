import temp from '../Templates/logoutTemplate.vue';
import {mapState} from 'vuex';

const logout = {
  name: 'logout',
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
    logout: function() {
      this.$router.push('/');
      this.$store.commit('clearState');
      this.$http.get('/auth/logout')
      .then(()=>{

        console.log('logged out');
      });
    }
  },
};

export default logout;