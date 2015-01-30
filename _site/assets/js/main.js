var timeout ;
var mainCssVisible = false ;
var loadEvents = false ;
function loadMainCss(){
    if(! mainCssVisible){
        mainCssVisible = true ;
        document.getElementById('main-css').setAttribute("href","/assets/css/main.css") ;
        document.getElementById('load-main-css').innerHTML = "Sans mise en forme" ;
        $('.liste-cv').slideUp(1000);
        if(! loadEvents){
          $(document).on('click',".pannel-slide",function(e){
            $(this).siblings(".liste-cv").slideToggle(1000);
          });
          loadEvents = true ;
        }
    }else{
        mainCssVisible = false ;
        $('.liste-cv').slideDown();
        document.getElementById('main-css').setAttribute("href","");
        document.getElementById('load-main-css').innerHTML = "Mettre en forme" ;
    }
}
function loadJQuery(){
  var jquery=document.createElement('script');
  jquery.setAttribute("type","text/javascript");
  jquery.setAttribute("src", '/assets/vendor/jquery/jquery.js');
  document.getElementById("jquery-js").appendChild(jquery);
  waitForjQuery();
}
function waitForjQuery() {
    if (typeof jQuery == 'undefined') {
      timeout = window.setTimeout(function () { waitForjQuery(); }, 100);
    }else{
      $('#load-main-css').removeAttr('disabled');
      window.clearTimeout(timeout);
    }
}