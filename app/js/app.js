var App = Vue.extend({});
var router = new VueRouter();

Vue.filter('checkmark', function (value) {
  return value ? '\u2713' : '\u2718';
});

var phoneList = Vue.extend({
  template: '#phones-list',
  data: function(){
    return {
      query: '',
      orderProp: 'age',
      phones:[]      
    }
  },
  created: function(){
    var self = this;
    $.getJSON('phones/phones.json').done(function(data){
      self.phones = data;
    });
  }  
});

var phoneDetail = Vue.extend({
  template: '#phones-detail',
  data: function(){
    return {  
      phone: {},
      mainImageUrl: ''
    }
  }, 
  route:{
    data: function(transition){
      var self = this;
      var phoneId = transition.to.params.phoneId;
      $.getJSON('phones/' + phoneId + '.json').done(function(data){
        transition.next({
          phone:  data,
          mainImageUrl: data.images[0]
        })
      });
    }
  },
  methods: {
    setImage: function(imageUrl) {
      this.mainImageUrl = imageUrl;
    }
  }  
});

router.map({
  '*': {
    component: phoneList
  },  
  '/phones': {
    name: 'list',
    component: phoneList
  },
  '/phones/:phoneId': { 
    name: 'detail',
    component:phoneDetail
  }
})

router.start(App, 'body');
