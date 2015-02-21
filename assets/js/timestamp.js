$(document).ready(function(){
	var snd = document.getElementById('alien-siren');
	snd.load();
	
	function checkTime(i){
		if(i<10){
			i="0" + i ;
		}
		return i;
	}
	
	function getHtstmp(d){
		return parseInt( d.getTime() / 1000 );
	}
	
	function getHth(d){
		var day = checkTime(d.getDate()) ;
	   var month = checkTime(d.getMonth() + 1) ;
	   var hours = checkTime(d.getHours()) ;
	   var minutes = checkTime(d.getMinutes()) ;
	   var seconds = checkTime(d.getSeconds()) ;
	   var nowdate = day + "-" +
				 month + "-" +
				 d.getFullYear() + " " +
				 hours + ":" +
				 minutes + ":" +
				 seconds ;
		return nowdate ;
	}

	function addRowHtstmp(htstmp){
		var date = new Date(htstmp * 1000) ;
		$('#addrow').append('<div class="row added-row">\
			<div class="col-md-5"><h2>'+ htstmp +'</h2></div>\
			<div class="col-md-offset-2 col-md-5"><h2>'+ getHth(date) +'</h2></div>\
		</div>');
	}
	
   function updateDate(){
	   var d = new Date();
		var nowtimestamp = getHtstmp(d) ;
		var nowdate = getHth(d) ;
	   $("#now-timestamp").html(nowtimestamp); 
	   $("#now-date").html(nowdate);
	   window.setTimeout(updateDate,1000);
   }
   updateDate() ;
   
   function minuteur(s){
		if(s >= 0){
			var hours = parseInt(s / 3600) ;
			hours = checkTime(hours);
		    var minutes = parseInt((s % 3600) / 60) ;
		    minutes = checkTime(minutes);
			var seconds = s % 60 ;
		    seconds = checkTime(seconds);
		    var nowdate = hours + ":" +
					 minutes + ":" +
					 seconds ;
			var percent = s * 100 / parseInt($('#tth').attr('data-value-init')) ;
			$('#progress-bar-minuteur').attr('aria-valuenow',percent).css('width',percent+'%');
			if(percent < 30 && percent > 15){
						$('#progress-bar-minuteur') .removeClass('progress-bar-success')
													.removeClass('progress-bar-warning')
													.removeClass('progress-bar-danger')
													.addClass('progress-bar-warning');
			}else if(percent <= 15){
				$('#progress-bar-minuteur') .removeClass('progress-bar-success')
											.removeClass('progress-bar-warning')
											.removeClass('progress-bar-danger')
											.addClass('progress-bar-danger');
			}else{
				$('#progress-bar-minuteur') .removeClass('progress-bar-success')
											.removeClass('progress-bar-warning')
											.removeClass('progress-bar-danger')
											.addClass('progress-bar-success');
			}
			$('#tth').html(nowdate) ;
			$('#tth').attr('value',s) ;
			var d = new Date();
			var nowTimestamp = getHtstmp(d) ;
			// s = s - 1 ;
			// console.log( "tempsMinuteur : "+window.tempsMinuteur+" / nowTimestamp : "+nowTimestamp+" / minuteurTimestamp : "+window.minuteurTimestamp );
			// console.log( window.tempsMinuteur - (nowTimestamp - window.minuteurTimestamp) );
			s = window.tempsMinuteur - (nowTimestamp - window.minuteurTimestamp) ;
			window.minuteur = window.setTimeout(minuteur,1000,s);
		}else{
			snd.play();
		}
   }
   
  
   $("#hth").datepicker({
	   changeMonth:true,
	   changeYear:true
   }) ;

	for(var i = 0; i < 60 ; i++){
		if( i < 24){
			$('select[name=hthh]').append('<option value="'+i+'">'+i+'</option>') ;
			$('select[name=tthh]').append('<option value="'+i+'">'+i+'</option>') ;
		}
		$('select[name=hthm]').append('<option value="'+i+'">'+i+'</option>') ;
		$('select[name=tthm]').append('<option value="'+i+'">'+i+'</option>') ;
		$('select[name=hths]').append('<option value="'+i+'">'+i+'</option>') ;
		$('select[name=tths]').append('<option value="'+i+'">'+i+'</option>') ;
	}
   
   /* events */
   
   $(document).on('click','#htstmp-plus',function(e){
		e.preventDefault();
		var htstmp = $('input[name=htstmp]') ;
		if( htstmp.val().match('[0-9].*') ){
			addRowHtstmp(htstmp.val());
			htstmp.parent().removeClass('has-error').addClass('has-success');
		}else{
			htstmp.parent().addClass('has-error');
		}
   });
   $(document).on('click','#hth-plus',function(e){
		e.preventDefault();
		var hth = $('input[name=hth]').val() ;
		var hthh = $('select[name=hthh]').val() ;
		var hthm = $('select[name=hthm]').val() ;
		var hths = $('select[name=hths]').val() ;
		var d = new Date(hth + " " + hthh + ":" + hthm + ":" + hths );
		var htstmp = getHtstmp(d);
		addRowHtstmp(htstmp);
   });
   $(document).on('click','#init00',function(e){
		e.preventDefault();
		$('select[name=hthh] option[value=0],select[name=hthm] option[value=0],select[name=hths] option[value=0]').attr('selected','true');
		
   });
   $(document).on('click','#tth-plus',function(e){
		e.preventDefault();
		snd.pause();
		clearTimeout(window.minuteur);
		$('#tth-pause').find('i').removeClass('glyphicon-play').addClass('glyphicon-pause');
		var hours = parseInt($('select[name=tthh]').val());
		var minutes = parseInt($('select[name=tthm]').val());
		var seconds = parseInt($('select[name=tths]').val());
		var s = (hours * 3600) + (minutes * 60) + seconds ;
		$('#tth').attr('data-value-init',s);
		window.tempsMinuteur = s ;
		var d = new Date();
		window.minuteurTimestamp = getHtstmp(d) ;
		minuteur(s);		
   });
   $(document).on('click','#tth-pause',function(e){
		e.preventDefault();
		snd.pause();
		var icon = $(this).find('i') ;
		if(icon.hasClass('glyphicon-pause')){
			clearTimeout(window.minuteur);
			icon.removeClass('glyphicon-pause').addClass('glyphicon-play');
		}else{
			window.tempsMinuteur = $('#tth').attr('value') ;
			var d = new Date();
			window.minuteurTimestamp = getHtstmp(d) ;
			minuteur($('#tth').attr('value'));
			icon.removeClass('glyphicon-play').addClass('glyphicon-pause');
		}
   });
	$(document).on('click','.tth-btn',function(e){
		e.preventDefault();
		clearTimeout(window.minuteur);
		$('#tth-pause').find('i').removeClass('glyphicon-play').addClass('glyphicon-pause');
		$('#tth').attr('data-value-init',$(this).val());
		
		window.tempsMinuteur = $(this).val() ;
		var d = new Date();
		window.minuteurTimestamp = getHtstmp(d) ;
		
		minuteur($(this).val());
	});
   
}) ;