function loadMainCss(){mainCssVisible?(mainCssVisible=!1,$(".liste-cv").slideDown(),document.getElementById("main-css").setAttribute("href",""),document.getElementById("load-main-css").innerHTML="Mettre en forme"):(mainCssVisible=!0,document.getElementById("main-css").setAttribute("href","/assets/css/main.css"),document.getElementById("load-main-css").innerHTML="Sans mise en forme",$(".liste-cv").slideUp(1e3),loadEvents||($(document).on("click",".pannel-slide",function(){$(this).siblings(".liste-cv").slideToggle(1e3)}),loadEvents=!0))}function loadJQuery(){var e=document.createElement("script");e.setAttribute("type","text/javascript"),e.setAttribute("src","/assets/vendor/jquery/jquery.js"),document.getElementById("jquery-js").appendChild(e),waitForjQuery()}function waitForjQuery(){"undefined"==typeof jQuery?timeout=window.setTimeout(function(){waitForjQuery()},100):($("#load-main-css").removeAttr("disabled"),window.clearTimeout(timeout))}var timeout,mainCssVisible=!1,loadEvents=!1;