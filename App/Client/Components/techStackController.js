import temp from '../Templates/techStackTemplate.vue';

var techstack = {
  template: temp.template,
  data: function() {
    return { 
      vue: '../Images/logo.png',
      mongo: '../Images/mongo.png',
      express: '../Images/express.png',
      pubnub: '../Images/pubnub.png'
    };
  },
};

export default techstack;