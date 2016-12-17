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
        //why don't we also edit it to be {value: xxx}?
        divorced: this.$store.state.user.divorced,
        kids: this.$store.state.user.kids,
        description: this.$store.state.user.description
      },
      interests: {
        reading: {value: this.$store.state.user.reading},
        cooking: {value: this.$store.state.user.cooking},
        traveling: {value: this.$store.state.user.traveling},
        outdoor: {value: this.$store.state.user.outdoor},
        food: {value: this.$store.state.user.food},
        crafting: {value: this.$store.state.user.crafting},
        partying: {value: this.$store.state.user.partying},
        animals: {value: this.$store.state.user.animals},
        culture: {value: this.$store.state.user.culture},
      },
      picked: ''
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

    updateUserBasicInfo: function(userProp, updatedInfo) {
      console.log('this.$store.state.user', this.$store.state.user)
      var body = {
        username: this.$store.state.user.username,
      };
      body[userProp] = updatedInfo;
      this.$http.put('/api/userBasic', body, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('id_token')
          }
        })
      .then((response) => {
        this.user[userProp] = updatedInfo;
        this.$store.commit('setUser', this.user);
      })
      .catch((err) => {
      });
    },

    updateUserPersonalInfo: function(personal) {
      var body = this.personal;
      body['username'] = this.$store.state.user.username;
      console.log('are we even updating body', body)

      this.$http.put('/api/userPersonal', body, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        }
      })
      .then((response) => {
        for (var key in this.personal) {
          this.user[key] = this.personal[key];
        }
        this.$store.commit('setUser', this.user);
      })
      .catch((err) => {
      });
    },

    updateInterests: function(interest) {
      this.$data.interests[interest].value = !this.$data.interests[interest].value;
      var body = {username: this.$store.state.user.username};
      body[interest] = this.$data.interests[interest].value;
      console.log('what are we sending to the back as body? ', body);
      this.$http.put('/api/userInterests', body, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        }
      })
      .then((response) => {
        console.log('response', response)
        // console.log('body again', this.interests[interest])
        this.user[interest] = this.interests[interest].value;
        this.$store.commit('setUser', this.user);
      })
      .catch((err) => {
      });
    }
  },
};

export default profileCreation;