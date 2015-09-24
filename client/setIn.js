Meteor.setInterval( function(){
  // Meteor.call("g", "account.getCounters",{user_id:323284220,access_token:users['323284220']}, function(error, results){
  //   //return JSON.parse(results.content)['response'];
  //   //Session.set('response',results.content);
  //   //alert(JSON.parse(results.content)['response']);
  //   console.log(results.content);
  //   Session.set('counters',results.content);
  // });
  Meteor.VK.readNew();
  if(Meteor.VK.newMes==[]){
    console.log(Meteor.VK.newMes);
  }
  $('#textIn').val($('#textIn').val()+Session.get('newMes'));
}, 2500);
