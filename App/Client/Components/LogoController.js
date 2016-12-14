import temp from '../Templates/logoTemplate.vue';
import {mapState} from 'vuex';

const logo = {
  name: 'logo',
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
  },
};

export default logo;