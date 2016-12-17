import temp from '../Templates/myProfileTemplate.vue';
import { mapState } from 'vuex';
import moment from 'moment';
import auth from '../Auth/auth.js';


var myProfile = {
  name: 'myProfile',
  template: temp.template,
  data: function() {
    return {
      msg: `${this.$store.state.user.username} Welcome To Do-We!`,
      background: '../Images/background.jpg',
      savedEvents: '',

      match: true,
      user: this.$store.state.user,
      moment: moment
    };
  },
  
  computed: {
    savedEvents () {
      return this.$store.state.savedEvents;
    }
  },

  methods: {
    toDate (event) {
      this.$router.push('/date/' + event._id + '/active');
    },
    editProfile () {
      this.$router.push('/myprofile/' + this.username + '/edit');
    }
  }
};

export default myProfile;
