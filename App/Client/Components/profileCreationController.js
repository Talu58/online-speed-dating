import temp from '../Templates/profileCreationTemplate.vue';
import { mapState } from 'vuex';

var profileCreation = {
  template: temp.template,
  name: 'edit',
  data: function() {
    return {
      user: this.$store.state.user,
      basic: {
        firstname: {value: this.$store.state.user.firstname},
        lastname: {value: this.$store.state.user.lastname},
        location: {value: this.$store.state.user.location},
        email: {value: this.$store.state.user.email},
        phone: {value: this.$store.state.user.phone}
      },
      personal: {
        divorced: this.$store.state.user.divorced,
        kids: this.$store.state.user.kids,
        description: this.$store.state.user.description
      },
      interests: {}
    };
  },

  watch: {
    '$route': 'checkRoute'
  },

  methods: {
    checkRoute () {
      if (this.$route.params.id !== this.$store.state.user.username) {
        console.error('dont do that HO!');
        this.$router.go(-1);
      } else {
        this.$router.push('/myprofile/' + this.$route.params.id + '/edit');
      }
    },

    updateUserInfo: function(userProp, updatedInfo) {
      var body = {
        username: this.$store.state.user.username,
        userProp: updatedInfo
      };
      this.$http.put('/api/user', body)
      .then((response) => {
        this.$store.commit('setUser', body);
      })
      .catch((err) => {
      });
    }
  },
};

export default profileCreation;