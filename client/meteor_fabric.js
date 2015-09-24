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
    //   source: 'http://su0.ru/TyrS',
    //   repeat: 'repeat'
    //   }, function() {
    //   canvas.renderAll();
    //  });
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
      var cl,size,color,posx,posy;
      if(data.indexOf('куб')!=-1||data.indexOf('квадрат')!=-1 || data.indexOf( 'прямоугольник')!=-1 ){
          cl = 'Rect';
      }
      else if(data.indexOf('шар')!=-1||data.indexOf('сфера')!=-1 || data.indexOf( 'круг')!=-1 ){
          cl = 'Circle';
      }
      else if(data.indexOf('треугольник')!=-1||data.indexOf('трехугольник')!=-1 || data.indexOf( 'три')!=-1 ){
          cl = 'Triangle';
      }
      if(data.indexOf('большой')!=-1||data.indexOf('приличный')!=-1 || data.indexOf( 'хороший')!=-1 ){
          size = 50;
      }
      else if(data.indexOf('огромный')!=-1||data.indexOf('на весь экран')!=-1 || data.indexOf( 'пиздец')!=-1 ){
          size = 350;
      }
      else if(data.indexOf('маленький')!=-1||data.indexOf('малый')!=-1 || data.indexOf( 'мелкий')!=-1 ){
          size = 15;
      }
      if(data.indexOf('цвет')!=-1){
          var c = data.split(' ');
          var cc= '#ffad09';
          for(var i=0;i<c.length;i++){
            if(c[i].indexOf('#')!=-1){
              cc = c[i];
            }
          }
          color = cc;
      }
      Meteor.canMan.newObj(CLAS = cl,SIZE = size,COLOR = color,posx,posy);
    }
  },2500);

  var PRX, PRY;
  var CAN = false;

  fabric.Image.fromURL('vkback.png', function(img) {
    img.scale(0.5).set({
    left: 150,
    top: 150
    });
    canvas.add(img);
  });
  // fabric.Image.fromURL('vkback.png', function(img) {
  //   img.scale(0.5).set({
  //   left: 150,
  //   top: 150
  //   });
  //   canvas.add(img);
  // });
  fabric.Image.fromURL('vkback0.png', function(img) {
    img.scale(0.5).set({
    left: 150,
    top: 150
    });
    canvas.add(img);
  });
  fabric.Image.fromURL('vkback1.png', function(img) {
    img.scale(0.5).set({
    left: 150,
    top: 150
    });
    canvas.add(img);
  });
  fabric.Image.fromURL('vkback2.png', function(img) {
    img.scale(0.5).set({
    left: 150,
    top: 150
    });
    canvas.add(img);
  });
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

  // Tracker.autorun(function(){
  //   canvas.setBackgroundColor([0]);
  // });
