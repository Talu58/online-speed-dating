import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import PubNub from 'pubnub';
import PHONE from './Dependencies/pubnubWebrtc.js';
// import auth from '../Auth/auth.js'

Vue.use(Vuex);
Vue.use(VueResource);

var store = new Vuex.Store({
  state: {
    interests: ['reading', 'cooking', 'traveling', 'outdoor', 'food', 'crafting', 'partying', 'animals', 'culture' ],
    videoOutSrc: '',
    myVideoSrc: '',
    beforeEventFlag: true,
    soloViewFlag: true,
    calleeReadyFlag: false,
    activeViewFlag: true,
    beforeStartFlag: true,
    datePartnerOffline: false,
    currentRound: null,
    savedEvents: [],
    allEvents: [],
    user: {
      isAuth: (typeof localStorage.getItem('id_token')) === "string"
    }
  },
  getters: {
    getProfileInfo(state, user) {
      console.log('GET PROFILE INFO', state.user);
      return state.user;
    },

    getall (state, user) {
      return state.savedEvents;
    }
  },
  mutations: {
    logout (state) {
      localStorage.removeItem('id_token');
      console.log('satet user logout', state.user)
      state.user.isAuth = false;
    },

    clearState(state) {
      console.log('this is before ', state);
      var initialState = {
        videoOutSrc: '',
        myVideoSrc: '',
        beforeEventFlag: true,
        soloViewFlag: true,
        calleeReadyFlag: false,
        activeViewFlag: true,
        beforeStartFlag: true,
        datePartnerOffline: false,
        currentRound: null,
        savedEvents: [],
        allEvents: [],

        user: {
          username: ''
        }
      };

      for (var key in initialState) {
        state[key] = initialState[key];
      }

      state = initialState;
      console.log('this is asfter ', state);
      if (state.pubnub) {
        state.pubnub.stop();
      }
      if (state.phone) {
        state.phone.hangup();
        state.phone.mystream.getVideoTracks()[0].stop();
      }
    },
    setUser(state, obj) {
      for (var key in obj) {
        state.user[key] = obj[key];
        state.isCallerFlag = obj.callList[0];
        if (key === 'events') {
          state.savedEvents = obj[key];
        }
      }
      this.$router.push(`/myprofile/${userData.username}`);

      console.log('saved events: ', state.savedEvents);
      // store.getters.getProfileInfo;
    },
    setSavedEvents(state, arr ) {
      var tempSavedEvents = [];
      for (var i = 0; i < arr.length; i++) {
        Vue.http.get('/api/user/events', { params: { _id: arr[i] } })
          .then((res) => {
            if (res.body._id) {
              tempSavedEvents.push(res.body);
            }
            state.savedEvents = tempSavedEvents;
          })
          .catch((err) => console.log(err));
      }
    },
    initPubNub(state) {
      state.pubnub = new PubNub({
        publishKey: 'pub-c-97dbae08-7b07-4052-b8e0-aa255720ea8a', // Our Pub Key
        subscribeKey: 'sub-c-794b9810-b865-11e6-a856-0619f8945a4f', // Our Sub Key
        ssl: true
      });
      state.pubnub.addListener({
        message: function(message) {
          if (message.message === 'Ready') {
            console.log('GotReadyMessageFromPartner');
            state.calleeReadyFlag = true;
          } else if (message.message === 'End') {
            console.log('Got End MESSAGE');
            state.activeViewFlag = false;
            state.pubnub.stop();
            state.phone.hangup();

            state.phone.mystream.getVideoTracks()[0].stop();

          } else {
            console.log('This is round', message.message);
            state.phone.hangup();
            if (state.currentRound) {
              state.pubnub.unsubscribe({
                channels: ['eventId' + state.user.callList[state.currentRound]]
              });
            }
            state.currentRound = message.message;
            //possibly check if corresponding user is online currently--use presence to do this
            //alternatively use failed call error handling
            if (state.user.callList[0]) {
              state.pubnub.subscribe({
                channels: ['eventId' + state.user.callList[state.currentRound]]
              });
            }
            state.soloViewFlag = true;
            state.beforeStartFlag = false;
            state.calleeReadyFlag = false;
          }
        },
        status: function(statusEvent) {
        }
      });
    },
    initPhone(state) {
      state.phone = window.phone = new PHONE({
        number: state.user.username,
        publish_key: 'pub-c-97dbae08-7b07-4052-b8e0-aa255720ea8a', // ff Our Pub Key
        subscribe_key: 'sub-c-794b9810-b865-11e6-a856-0619f8945a4f', // Our Sub Key
        ssl: true
      });

      var sessionConnected = function (session) {
        console.log('connected with', session);
        state.videoOutSrc = session.video.src;

      };
      state.phone.ready(function() {
        state.myVideoSrc = URL.createObjectURL(phone.mystream);
        console.log('phone ready');
      });
      state.phone.receive(function (session) {
        state.soloViewFlag = false;
        console.log( 'i receieved');
        state.videoIn = session;

        session.connected(sessionConnected);
        session.ended(function(idk) {
          console.log('sessionn ended');
        });
      });
    },
    signalEventReadyFlags(state) {
      state.beforeStartFlag = true;
      state.beforeEventFlag = false;
      state.soloViewFlag = true;
      state.activeEventFlag = true;
    },
    signalCalleeReadyFlag(state) {
      state.calleeReadyFlag = true;
    },

    setEvents (state, arr) {
      state.user.events = arr;
    },

    setAllEvents (state, arr) {
      //The admin should have access to all events
      if (state.user.admin) {
        state.allEvents = arr;
      } else {
        //building an array of interests from user
        var userInterests = [];
        for (var i = 0; i < state.interests.length; i++) {
          if (state.user[state.interests[i]]) {
            userInterests.push(state.interests[i]);
          }
        }
        //Setting a temporary storage for the Events related to the current user
        var temp = [];
        for (var i = 0; i < arr.length; i++) {
          if (userInterests.length !== 0) {
            for (var j = 0; j < userInterests.length; j++) {
              if (arr[i].eventType === userInterests[j]) {
                if (arr[i].eventRelationshipType === 'homosexual') {
                  if ((arr[i].eventGender === state.user.gender) && (state.user.gender === state.user.interestedIn)) {
                    temp.push(arr[i]);
                  }
                } else {
                  if (state.user.gender !== state.user.interestedIn) {
                    temp.push(arr[i]);
                  }
                }
              }
            }
          } else {
            if (arr[i].eventRelationshipType === 'homosexual') {
              if ((arr[i].eventGender === state.user.gender) && (state.user.gender === state.user.interestedIn)) {
                temp.push(arr[i]);
              }
            } else {
              if (state.user.gender !== state.user.interestedIn) {
                temp.push(arr[i]);
              }
            }
          }
        }
        state.allEvents = temp;
      }
    },

    setNewEvent (state, event) {
      state.allEvents.push(event);
    },

    addToSavedEvents(state, arr) {
      state.savedEvents = arr;
      console.log('state.savedEvents: ', state.savedEvents);
    }
  }
});

export default store;