FlowRouter.route('/pre/:name', {
    name: "pre",
    action: function(params, queryParams) {
      //console.log(Blaze.View(params.name));
      BlazeLayout.render(params.name);
    }
});
FlowRouter.route('/', {
    name: "main",
    action: function(params, queryParams) {
      BlazeLayout.render("hello");
    }
});
