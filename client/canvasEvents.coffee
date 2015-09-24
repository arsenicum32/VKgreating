# Session.setDefault('disc', 0);
# Template.panel.events({
#   'keydown': function(e) {
#     var dis = function(up) {
#       alert(up);
#       if (up > 2) {
#         alert('yesss');
#         Session.set('disc', 0);
#         if (up) {
#           Session.set('disc', Session.get('disc') + 1);
#         } else {
#           Session.set('disc', 0);
#         }
#         return up;
#       }
#     };
#     var pr = e.keyCode;
#     //alert(pr);
#     switch (Session.get('disc')) {
#       case 0:
#         return dis(pr === 53);
#       case 1:
#         return dis(pr === 54);
#       case 2:
#         return dis(pr === 51);
#       case 3:
#         return dis(pr === 56);
#       case 4:
#         return dis(pr === 52);
#       default:
#         return dis(Session.get('disc'));
#     }
#   }
# });
# Session.setDefault 'disc', ''
#
# Template.panel.events 'keyup': (e)->
#   true
  # pr = e.keyCode
  # if Session.get('disc')==266
  # if pr in [51..56]
  #   Session.set 'disc', Session.get('disc') + e.keyCode
  # else
  #   Session.set 'disc', 0
