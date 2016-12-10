import temp from './profileTemplate.vue';
import { mapState } from 'vuex';

var profile = {
  name: 'profile',
  template: temp.template,
  data: function() {
    return {
      username: '',
      name: '',
      location: '',
      profileImg: '',
      gender: '',
      userinfo: ''
    };
  },
  created () {
    this.loadUserProfile();
  },
  watch: {
    '$route': 'loadUserProfile'
  },
  methods: {
    editProfile: function() {
      this.$router.push('/myprofile/' + this.username + '/edit');
    }, 
    setProfileInfo: function(res) {
      for (var key in res) {
        this[key] = res[key]; 
      }
    },
    loadUserProfile: function() {
      if (this.$route.params.id !== this.$store.state.user.username) {
        this.$http.get(
          '/api/user',
          { params: {username: this.$route.params.id}}
        )
        .then((res)=>{
          this.setProfileInfo(res.body); 
        });
      } else {
        this.setProfileInfo(this.$store.getters.getProfileInfo); 
      } 
    }
  },
};

export default profile;