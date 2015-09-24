users = {'210149434':'1b787bd329f38906797fbc00dd04d228296588bb9297618215bea8b6c10a05271b558a1bb1d19e0487174','323284220':'c1d98d13a53393469035e7cc268ee4b7748455b295b9edb5c1f3fec547c51bf5b4f5633cb87ee21d703f3'};
if (Meteor.isClient) {
    Session.setDefault('counters','');
    Session.setDefault('response','');
    Session.setDefault('newMes',[]);



    Template.hello.events({
        'click button' : function () {
            Meteor.getPicture();
            //Meteor.VK.readNew();
        }
    });
    Template.hello.helpers({
      inner:function(){
        Meteor.getUser($('#getId').val());
        return JSON.parse(Session.get('response'))['response'][0];
      },
      norm: function(){
        return true;
      },
      new: function(){
        return Session.get('newMes')[0];
      }
    });



    Meteor.getUser=function(ID){
        Meteor.call("g", "users.get",{user_id:ID,v:5.37,fields:'photo_200'}, function(error, results){
          //return JSON.parse(results.content)['response'];
          Session.set('response',results.content.toString());
          //alert(JSON.parse(results.content)['response']);
          //alert(results.content);
        });
      };
    Meteor.getPicture = function(){
      Meteor.call("g", "execute.getPicture",{user_id:323284220,access_token:users['323284220']}, function(error, results){
        //return JSON.parse(results.content)['response'];
        Session.set('response',results.content);
        //alert(JSON.parse(results.content)['response']);
        //alert(Session.get('response'));
      });
    };
    Meteor.VK = {
      'readNew': function(){
        Meteor.call("g", "execute.getNewMes",{user_id:323284220,access_token:users['323284220']}, function(error, results){
          //return JSON.parse(results.content)['response'];
          Session.set('response',results.content);
          //alert(JSON.parse(results.content)['response']);
          //alert(Session.get('response'));
          Session.set('newMes',JSON.parse(results.content)['response']);
        });
      },
      'newMes': []
    };
}

if (Meteor.isServer) {
    Meteor.startup(function () {
    });
    Meteor.methods({
        g: function (methodName,paramS) {
            var ActualV = 5.37;
            paramS['v'] = ActualV;
            try {
              this.unblock();
              return HTTP.call( "GET","https://api.vk.com/method/"+methodName, {params: paramS });
            } catch (e) {
              return false;
            }
        }
        // checkTwitter: function (methodName,paramS) {  async callback
        //     try {
        //       this.unblock();
        //       Meteor.http.get("https://api.vk.com/method/"+methodName, {params: paramS}, function(error, results){
        //         console.log(results.content);
        //         //return JSON.parse(results.content)['response'];
        //         return results.content.toString();
        //       });
        //     } catch (e) {
        //       return false;
        //     }
        // }
    });
  }
