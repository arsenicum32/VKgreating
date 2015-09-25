Meteor.canMan = {
  newObj: function(CLAS,SIZE,COLOR,POSX,POSY){
    var dim = SIZE || fabric.util.getRandomInt(30, 60);
    var klass =  CLAS || ['Rect', 'Triangle', 'Circle'][fabric.util.getRandomInt(0, 2)];
    var options = {
      top: POSX || fabric.util.getRandomInt(0, $(window).height()),
      left: POSY || fabric.util.getRandomInt(0, $(window).width()),
      fill: COLOR || ['green','red','blue','black'][fabric.util.getRandomInt(0, 4)]
    };
    if (klass === 'Circle') {
      options.radius = dim;
    } else {
      options.width = dim;
      options.height = dim;
    }
    canvas.add(new fabric[klass](options));
  },
  newText: function(mes){
    function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var ran = getRandomInt(0,mes.toString().split(' ').length);
    var text = new fabric.Text(mes.toString().split(' ')[ran], {
      left: fabric.util.getRandomInt(0, $(window).width()),
      top: fabric.util.getRandomInt(0, $(window).height()),
      fontFamily: ['Helvetica','Comic Sans','Impact',"Times New Roman"][fabric.util.getRandomInt(0, 4)]
    });
    canvas.add(text);
  }
};
// FlowRouter.watchPathChange();
// var param = FlowRouter.current().params;
// var qparam = FlowRouter.current().queryParams;

  Template.drawing.rendered = function(){
    canvas = new fabric.Canvas('c');
    canvas.setHeight($(window).height());
    canvas.setWidth($(window).width());
    canvas.selection = false;
    canvas.defaultCursor = 'move';
    canvas.hoverCursor = 'pointer';
    $(window).on('resize', function() {
      canvas.setHeight($(window).height());
      canvas.setWidth($(window).width());
    });
    // create a rectangle object
    var offsetX = 0; //-canvas.getWidth()/2;
    var offsetY = 0; //-canvas.getHeight()/2;
    //canvas.absolutePan(new fabric.Point(offsetX, offsetY));

  setInterval(function(){
    if(Session.get('newMes')!=''){
      var data = Session.get('newMes');
      var dec = Meteor.AI.decodeMes(data || '');
      Meteor.canMan.newObj(dec.CLAS,dec.SIZE,dec.COLOR);
    }
  },2500);

  var PRX, PRY;
  var CAN = false;

  // fabric.Image.fromURL('vkback.png', function(img) {
  //   img.scale(0.5).set({
  //   left: 150,
  //   top: 150
  //   });
  //   canvas.add(img);
  // });
  // fabric.Image.fromURL('vkback.png', function(img) {
  //   img.scale(0.5).set({
  //   left: 150,
  //   top: 150
  //   });
  //   canvas.add(img);
  // });
  // fabric.Image.fromURL('vkback0.png', function(img) {
  //   img.scale(0.5).set({
  //   left: 150,
  //   top: 150
  //   });
  //   canvas.add(img);
  // });
  // fabric.Image.fromURL('vkback1.png', function(img) {
  //   img.scale(0.5).set({
  //   left: 150,
  //   top: 150
  //   });
  //   canvas.add(img);
  // });
  // fabric.Image.fromURL('vkback2.png', function(img) {
  //   img.scale(0.5).set({
  //   left: 150,
  //   top: 150
  //   });
  //   canvas.add(img);
  // });
  // fabric.Image.fromURL('vkback3.png', function(img) {
  //   img.scale(0.5).set({
  //   left: 150,
  //   top: 150
  //   });
  //   canvas.add(img);
  // });
  canvas.renderAll();
  canvas.on({
    'mouse:down': function(options) {
      if (options.target) {
        options.target.opacity = 0.5;
        canvas.renderAll();
      };
      if (canvas.getActiveObject() == null) {
        PRX = options.e.clientX;
        PRY = options.e.clientY;
        CAN = true;
      }
    },
    'mouse:up': function(options) {
      if (options.target) {
        options.target.opacity = 1;
        canvas.renderAll();
      };
      if (canvas.getActiveObject() == null) {
        offsetX -= options.e.clientX - PRX;
        offsetY -= options.e.clientY - PRY;
        canvas.absolutePan(new fabric.Point(offsetX, offsetY));
        CAN = false;
      }
    },
    'mouse:move': function(options) {
      if (canvas.getActiveObject() == null && CAN) {
        canvas.absolutePan(new fabric.Point(offsetX - options.e.clientX + PRX, offsetY - options.e.clientY + PRY));
      }
    },
    'object:moved': function(e) {
      e.target.opacity = 0.5;
    },
    'object:modified': function(e) {
      e.target.opacity = 1;
      //e.target.foobar = 'hello';
      //alert(e.target.foobar);
    },
    'mouse:over': function(e){
      canvas.renderAll();
    },
    'mouse:out':function(e){
      canvas.renderAll();
    },
    'touch:gesture': function() {
      alert('gesture');
    },
    'touch:dragstart': function(options) {
      if (options.target) {
        options.target.opacity = 0.5;
        canvas.renderAll();
      };
      if (canvas.getActiveObject() == null) {
        PRX = options.e.clientX;
        PRY = options.e.clientY;
        CAN = true;
      }
    },
    'touch:dragenter': function(options) {
      if (canvas.getActiveObject() == null && CAN) {
        canvas.absolutePan(new fabric.Point(offsetX - options.e.clientX + PRX, offsetY - options.e.clientY + PRY));
      }
    },
    'touch:dragend': function(options) {
      if (options.target) {
        options.target.opacity = 1;
        canvas.renderAll();
      };
      if (canvas.getActiveObject() == null) {
        offsetX -= options.e.clientX - PRX;
        offsetY -= options.e.clientY - PRY;
        canvas.absolutePan(new fabric.Point(offsetX, offsetY));
        CAN = false;
      }
    },
    'touch:orientation': function() {
      //alert('shake');
    },
    'touch:shake': function() {
    //alert('orientation');
    },
    'touch:longpress': function() {
      //alert('longpress');
    }
  });
  // "add" rectangle onto canvas
  fabric.Object.prototype.transparentCorners = false;
  // add random objects
  ////////////////////////////////////////////////////////////////////
  // for (var i = 15; i--;) {
  //   Meteor.canMan.newObj('Rect');
  // }

  //canvas.item(0).lockRotation = true;
  //canvas.item(0).lockScalingX = canvas.item(0).lockScalingY = true;
  for(var n=0;n<canvas.getObjects().length;n++){
  canvas.item(n).hasControls = canvas.item(n).hasBorders = false;
  }

   canvas.renderAll();
  };

  Template.randommes.rendered = function(){
    canvas = new fabric.Canvas('c');
    canvas.setHeight($(window).height());
    canvas.setWidth($(window).width());
    canvas.selection = false;
    canvas.defaultCursor = 'move';
    canvas.hoverCursor = 'pointer';
    $(window).on('resize', function() {
      canvas.setHeight($(window).height());
      canvas.setWidth($(window).width());
    });
    var offsetX = 0;
    var offsetY = 0;
    setInterval(function(){
      if(Session.get('newMes')!=''){
        var data = Session.get('newMes');
        Meteor.canMan.newText(data);
      }
    },2500);
    var PRX, PRY;
    var CAN = false;
    canvas.on({
      'mouse:down': function(options) {
        if (options.target) {
          options.target.opacity = 0.5;
          canvas.renderAll();
        };
        if (canvas.getActiveObject() == null) {
          PRX = options.e.clientX;
          PRY = options.e.clientY;
          CAN = true;
        }
      },
      'mouse:up': function(options) {
        if (options.target) {
          options.target.opacity = 1;
          canvas.renderAll();
        };
        if (canvas.getActiveObject() == null) {
          offsetX -= options.e.clientX - PRX;
          offsetY -= options.e.clientY - PRY;
          canvas.absolutePan(new fabric.Point(offsetX, offsetY));
          CAN = false;
        }
      },
      'mouse:move': function(options) {
        if (canvas.getActiveObject() == null && CAN) {
          canvas.absolutePan(new fabric.Point(offsetX - options.e.clientX + PRX, offsetY - options.e.clientY + PRY));
        }
      },
      'object:moved': function(e) {
        e.target.opacity = 0.5;
      },
      'object:modified': function(e) {
        e.target.opacity = 1;
      },
      'mouse:over': function(e){
        canvas.renderAll();
      },
      'mouse:out':function(e){
        canvas.renderAll();
      },
      'touch:gesture': function() {
        alert('gesture');
      },
      'touch:dragstart': function(options) {
        if (options.target) {
          options.target.opacity = 0.5;
          canvas.renderAll();
        };
        if (canvas.getActiveObject() == null) {
          PRX = options.e.clientX;
          PRY = options.e.clientY;
          CAN = true;
        }
      },
      'touch:dragenter': function(options) {
        if (canvas.getActiveObject() == null && CAN) {
          canvas.absolutePan(new fabric.Point(offsetX - options.e.clientX + PRX, offsetY - options.e.clientY + PRY));
        }
      },
      'touch:dragend': function(options) {
        if (options.target) {
          options.target.opacity = 1;
          canvas.renderAll();
        };
        if (canvas.getActiveObject() == null) {
          offsetX -= options.e.clientX - PRX;
          offsetY -= options.e.clientY - PRY;
          canvas.absolutePan(new fabric.Point(offsetX, offsetY));
          CAN = false;
        }
      },
      'touch:orientation': function() {
      },
      'touch:shake': function() {
      },
      'touch:longpress': function() {
      }
    });
    canvas.renderAll();
  };

  // Tracker.autorun(function(){
  //   canvas.setBackgroundColor([0]);
  // });
