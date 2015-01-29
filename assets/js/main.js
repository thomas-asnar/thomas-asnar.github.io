var mainCssVisible = false ;
function loadMainCss(){
    if(! mainCssVisible){
        (document.getElementById('main-css')).setAttribute("href","/assets/css/main.css") ;
        mainCssVisible = true ;
        (document.getElementById('load-main-css')).innerHTML = "Remettre sans forme" ;
    }else{
       (document.getElementById('main-css')).setAttribute("href","");
        mainCssVisible = false ;
        (document.getElementById('load-main-css')).innerHTML = "Mettre en forme" ;
    }
}