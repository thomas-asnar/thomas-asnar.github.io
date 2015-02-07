$(".liste-cv").slideUp(1000);

/* EVENTS */
$(document).on('click',".panel-slide,.titres-separator",function(e){
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

$(document).on('click',"#display-search",function(){
  $('#exec-search-container').fadeToggle().find('input').focus();
});

$(document).on('click','#exec-search',function(){
  searchSite($(this).siblings('input').val());
});
$('#exec-search ~ input').keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
    searchSite($(this).val());
  }
});

/* Functions */
function searchSite(words){
  $.ajax({
    type:'GET',
    url:'/feed.xml',
    dataType: 'xml',
    success:function(xml){
      var items = $(xml).find('item:contains('+words+')') ;
      $('.post-list').fadeOut();
      $('.pagination').fadeOut();
      var heading = $('.page-heading');
      
      if(items.length > 0){
        var postListHtml = '<ul class="post-list">';
        items.each(function(index){
          var categoriesButtons = '' ;
          var categories = $(items[index]).find('category') ;
          categories.each(function(indexCat){
            categoriesButtons += '<button type="button" class="btn btn-default btn-xs btn-categories hidden-xs">\
            <span class="glyphicon glyphicon-asterisk"></span>'+$(categories[indexCat]).text()+'</button> ' ;
            ; 
          });

          postListHtml += '\
<li>\
<h3><a class="post-link" href="'+ $(items[index]).find('link').text() +'">'+ $(items[index]).find('title').text() +'</a></h3>\
<footer class="post-footer">'+categoriesButtons+'\
</footer>\
</li>\
          ';
        });
        postListHtml += '</ul>';
        heading.after(postListHtml);
      }else{
        heading.after('Aucun Résultat');
      }
    }
  });
} 