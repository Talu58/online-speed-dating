import temp from '../Templates/aboutUsTemplate.vue';

var aboutus = {
  template: temp.template,
  data: function() {
    return { 
      dan: '../Images/dan.png',
      elliott: '../Images/elliott.png',
      eric: '../Images/eric.png',
      wasiff: '../Images/wasiff.png'
    };
  },
};

export default aboutus;