import temp from '../Templates/adminTemplate.vue';
import moment from 'moment';

var admin = {
  template: temp.template,
  data: function () {
    return {
      interests: ['reading', 'cooking', 'traveling', 'outdoor', 'food', 'crafting', 'partying', 'animals', 'culture' ],
      date: '',
      eventType: '',
      eventName: '',
      eventLocation: '',
      eventInterest: '',
      eventGender: '',
      eventInterestedIn: '',
      currentEvent: ''
    };
  },
  computed: {
    allEvents () {
      return this.$store.state.allEvents;
    }
  },

  created () {
    this.$store.commit('initPubNub');
  },

  methods: {
    startEvent(event) {
      this[event._id] = 1;
    },

    setupEvent(event) {
      console.log(event._id);
      this.$http.post('/event/setup', {
        _id: event._id
      })
      .then((res) => {
        var body = res.body;
        console.log('BODY: ', body);
        this.$store.commit('setUser', body);
      })
      .catch((err) => console.error(err));
    },

    endEvent(event) {
      this.$store.state.pubnub.publish({
        message: 'End',
        channel: [event._id]
      });
    },

    incrementRound(event) {
      this.$store.state.pubnub.publish({
        message: this[event._id],
        channel: [event._id]
      });
      this[event._id]++;
    },

    moment: function (date) {
      return moment(date);
    },
    submit () {
      var body = {
        date: this.date,
        eventName: this.eventName,
        eventLocation: this.eventLocation,
        eventType: this.eventInterest,
        eventGender: this.eventGender,
        eventInterestedIn: this.eventInterestedIn
      };
      console.log(body);
      let dbUrl = '/api/events';
      this.$http.post(dbUrl, body)
      .then((res) => {
        console.log(res.body);
        this.$store.commit( 'setNewEvent', res.body);
        //clear form fields
        this.date = '',
        this.eventType = '',
        this.eventName = '';
        this.eventLocation = '';

      })
      .catch((err) => {
        console.error('Something went wrong with POST: ', err);
      });
    },
    updateCurrentEvent (eventName) {
      for (var event in this.$store.state.allEvents) {
        if (eventName === this.$store.state.allEvents[event].eventName) {
          this.currentEvent = this.$store.state.allEvents[event];
        }
      }
    }

  },
};


export default admin;