$.ajax({
  type:'GET',
  url:'/sitemap.xml',
  dataType: 'xml',
  success:function(xml){
    var htmlSitemap = "<ul>";
    $(xml).find('url').each(function(){
      htmlSitemap += '<li>\
      <a href="'+$(this).find('loc').text()+'">'+$(this).find('loc').text()+'</a>\
</li>';
    }) ;
    htmlSitemap += "</ul>";
    $('#page-content').append(htmlSitemap);
  }
});