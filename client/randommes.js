Meteor.AI = {
  decodeMes: function(mes){
    //alert(mes.toString().toLowerCase());
    mes = mes.toString();
    mes = mes.toLowerCase();
    //mes = mes.replace(/\s{2,}/g, ' ');
    var mesAr = {figure:null,size:null,col:null};
    // for(var i in mes.split(' ')){
    //   switch (i) {
    //     case 'куб':
    //       mesAr.figure = 'Rect';
    //       break;
    //       case 'квадрат':
    //         mesAr.figure = 'Rect';
    //         break;
    //         case 'прямоугольник':
    //           mesAr.figure = 'Rect';
    //           break;
    //           case 'шар':
    //             mesAr.figure = 'Circle';
    //             break;
    //             case 'круг':
    //               mesAr.figure = 'Circle';
    //               break;
    //               case 'окружность':
    //                 mesAr.figure = 'Circle';
    //                 break;
    //                 case 'треугольник':
    //                   mesAr.figure = 'Triangle';
    //                   break;
    //                   case 'многоугольник':
    //                     mesAr.figure = 'Triangle';
    //                     break;
    //                     case 'красный':
    //                       mesAr.col = 'red';
    //                       break;
    //                       case 'зелёный':
    //                         mesAr.col = 'green';
    //                         break;
    //                         case 'жёлтый':
    //                           mesAr.col = 'yellow';
    //                           break;
    //                           case 'синий':
    //                             mesAr.col = 'blue';
    //                             break;
    //                             case 'оранжевый':
    //                               mesAr.col = 'orange';
    //                               break;
    //                               case 'большой':
    //                                 mesAr.size = 50;
    //                                 break;
    //                                 case 'огромный':
    //                                   mesAr.size = 500;
    //                                   break;
    //                                   case 'маленький':
    //                                     mesAr.size = 15;
    //                                     break;
    //                                     case 'малюсенький':
    //                                       mesAr.size = 5;
    //                                       break;
    //   }
    // }
    //alert(mesAr.figure + ' ' + mesAr.col + ' ' + mesAr.size);
    var cl,size,color,posx,posy;
    if(mes.indexOf('куб')!=-1||mes.indexOf('квадрат')!=-1 || mes.indexOf( 'прямоугольник')!=-1 ){
        cl = 'Rect';
    }
    else if(mes.indexOf('шар')!=-1||mes.indexOf('сфера')!=-1 || mes.indexOf( 'круг')!=-1 ){
        cl = 'Circle';
    }
    else if(mes.indexOf('треугольник')!=-1||mes.indexOf('трехугольник')!=-1 || mes.indexOf( 'три')!=-1 ){
        cl = 'Triangle';
    }
    if(mes.indexOf('большой')!=-1||mes.indexOf('приличный')!=-1 || mes.indexOf( 'хороший')!=-1 ){
        size = 50;
    }
    else if(mes.indexOf('огромный')!=-1||mes.indexOf('на весь экран')!=-1 || mes.indexOf( 'пиздец')!=-1 ){
        size = 350;
    }
    else if(mes.indexOf('маленький')!=-1||mes.indexOf('малый')!=-1 || mes.indexOf( 'мелкий')!=-1 ){
        size = 15;
    }
    if(mes.indexOf('цвет')!=-1){
        var c = mes.split(' ');
        var cc= '#ffad09';
        for(var i=0;i<c.length;i++){
          if(c[i].indexOf('#')!=-1){
            cc = c[i];
          }
        }
        color = cc;
    }
    return {CLAS:cl,COLOR:color,SIZE:size};
  }
};
