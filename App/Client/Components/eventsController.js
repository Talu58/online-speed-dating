import temp from '../Templates/eventsTemplate.vue';
import auth from '../Auth/auth.js';
var moment = require('moment');


var events = {
  template: temp.template,
  data () {
    return {
      user: this.$store.state.user
    };
  },
  created () {
    this.getEvents();
  },
  computed: {
    result () {
      return this.$store.state.allEvents;
    }
  },

  methods: {
    getEvents () {
      this.$http.get('/api/events', { headers: auth.getHeaders()})
      .then((res) => {
        console.log("events", res)
        this.$store.commit('setAllEvents', res.body);
      })
      .catch((err) => { console.error('There was an err with your GET request, ', err); });
    },

    hasNotJoined (event) {
      var flag = true;
      for (var i = 0; i < this.$store.state.savedEvents.length; i++) {
        if (this.$store.state.savedEvents[i]._id === event._id) {
          flag = false;
        }
      }
      return flag;
    },

    join (event) {
      //handles event creation within users array
      var currentUserEvents = this.$store.state.user.events;
      var savedUserEvents = this.$store.state.savedEvents;

      //check to see if event is in curren users event list
      if (currentUserEvents.indexOf(event._id) === -1 ) {
        event.usernames.push(this.$store.state.user.username);
        // currentUserEvents.push(event._id);
        console.log("!!1",this.$store.state.user)
        var body = {
          username: this.$store.state.user.username,
          event: event
        };
        this.$store.commit('setEvents', currentUserEvents);
        this.$http.put('/api/user/addEvent', body ,
          { headers: auth.getHeaders()})
        .then((res) => {
          console.log(res)
          savedUserEvents.push(event);
          this.$store.commit('addToSavedEvents', savedUserEvents);
        })
        .catch((err) => { console.error('error ', err); });

        this.$http.put('/api/events', event, { headers: auth.getHeaders() } )
        .then((res) => {
          this.getEvents();
        })
        .catch((err) => { console.error('error ', err); });
      }
    },

    unjoin(event) {
      var currentUserEvents = this.$store.state.user.events;
      var savedUserEvents = this.$store.state.savedEvents;

      // console.log('currentUserEvents before', currentUserEvents)
      // console.log('savedUserEvents before', savedUserEvents)

//remove the chosen event out of the user's events collection
      for (var i = 0; i< currentUserEvents.length; i++) {
        if (currentUserEvents[i]._id === event._id) {
          currentUserEvents.splice(i, 1);
          //savedUserEvents.splice(i, 1);
          console.log('currentUserEvents after', currentUserEvents)
          //this.$store.commit('addToSavedEvents', savedUserEvents);
        }
      }
      this.$store.commit('setEvents', currentUserEvents);

//remove the current user out of the chosen event's user list
      for (var i = 0; i < event.usernames.length; i++) {
        if (event.usernames[i] === this.$store.state.user.username) {
          event.usernames.splice(i, 1)
        }
      }

      var body = {
        username: this.$store.state.user.username,
        event: event
      }
      console.log('body', body);

      this.$http.put('/api/user/unjoinEvent', body, { headers: auth.getHeaders()})
      .then((res) => {
        console.log('res',res);
        for (var i = 0 ; i < savedUserEvents.length; i++) {
          if (savedUserEvents[i]._id === event._id) {
            savedUserEvents.splice(i,1)
          }
        }
        this.$store.commit('addToSavedEvents', savedUserEvents);
      })
      .catch((err) => {
        console.error('error ', err);
      });

      // this.$http.put('/api/events', event, { headers: auth.getHeaders() } )
      // .then((res) => {
      //   this.getEvents();
      // })
      // .catch((err) => { console.error('error ', err); });

//double check with romain to see if this works for persistency
    },

    moment: function (date) {
      return moment(date);
    }
  }
};



export default events;