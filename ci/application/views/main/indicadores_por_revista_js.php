$(document).ready(function() {
    location.hash && 
    $(location.hash).collapse('show') &&
    $('html, body').animate({
        scrollTop: $(location.hash).parent().offset().top
    }, 1000);

    jQuery('a.referencia').colorbox({
            inline: true,
            innerWidth: 600,
            innerHeight: 100
    });
    jQuery('a.manual').colorbox({
            inline: true,
            width: 750,
            height: 500
    });
	jQuery('a.numeros').colorbox({
            width: 500,
            height: 700
    });
    $('.copy-code').on('click', function(e){
	$('.codehtml').select();
	document.execCommand('copy');
    });
    /*document.addEventListener('mouseup', () => {
    	let selected = window.getSelection().toString(); 
  	let copySelected = document.execCommand('copy');
  	copySelected ? copySelected : console.log('sorry, your browser doesn\'t support execCommand')
    });*/
});