$(".liste-cv").slideUp(1000);

/* EVENTS */
$(document).on('click',".pannel-slide,.titres-separator",function(e){
  var selThis = $(this);
  var selSpan ;
  if(selThis.hasClass("titres-separator")){
     selSpan = selThis.find("span") ;
  }else{
     selSpan = selThis.siblings(".titres-separator").find("span") ;
  }
    
  if(selSpan.hasClass('glyphicon-menu-down')){
    selSpan.removeClass('glyphicon-menu-down');
    selSpan.addClass('glyphicon-menu-up');
  }else{
    selSpan.removeClass('glyphicon-menu-up');
    selSpan.addClass('glyphicon-menu-down');
  }
  selThis.siblings(".liste-cv").slideToggle(1000);
});

