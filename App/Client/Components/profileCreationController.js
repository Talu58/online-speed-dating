import temp from '../Templates/profileCreationTemplate.vue';
import { mapState } from 'vuex';

var profileCreation = {
  template: temp.template,
  name: 'edit',
  data: function() {
    return {
      user: this.$store.state.user,
      basic: {
        // firstname: this.$store.state.user.firstname,
        // lastname: this.$store.state.user.lastname,
        location: this.$store.state.user.location,
        email: this.$store.state.user.email,
        password: this.$store.state.user.password,
        // phone: this.$store.state.user.phone
      },
      personnal: {
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

    setUserInfo: function() {
      var body = this.$store.state.user;
      if (!!body.name && !!body.gender && !! body.location) {
        this.$http.put('/api/user', body)
        .then((response) => {
          this.$store.commit('setUser', body);
          this.$router.push('/myprofile/' + body.username);
        })
        .catch((err) => {
        });
      } else {
        window.alert('Please provide name, gender and location');
      }
    }
  },
};

export default profileCreation;