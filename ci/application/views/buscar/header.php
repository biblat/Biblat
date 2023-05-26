	$(document).ready(function() {
		$(".add-ref").click(function(){
			console.log($(this).attr("id"));
			/*formBuscador = $("#buscador").serialize();
			$.ajax({
				type: "POST",
				async: false,
				url: "<?=base_url('saveCheck.php')?>",
				data: formBuscador
			}).done(function( msg ) {
				//alert( "Data Saved: " + msg );
			});*/
			return false;
		});
		$(".registro").colorbox({
			rel:'registro', 
			transition:"fade", 
			data: {ajax:true}, 
			height:"90%", 
			current:"<?php _printf('Artículo %s de %s', '{current}', '{total}');?>"
		});
		$(document).bind('cbox_complete', function(){
<?php if(ENVIRONMENT === "production"):?>
			addthis.toolbox('.addthis_toolbox');
<?php endif;?>
			$('#formSolicitudDocumento').validate();
		});
<?php if(isset($slugHighLight)):?>
		$("#resultados").highlight([<?=$slugHighLight;?>], { element: 'mark'});
<?php endif;?>
<?php if(isset($search['filtro'])):?>
		$("#search-opts li[rel='<?=$search['filtro']?>']").trigger("click");
<?php if($search['filtro'] == "avanzada"):?>
		$('#advsearch').advancedSearch('val', $.parseJSON('<?=$search['json']?>'));
		$('.evo-bDel').trigger("click");
<?php endif;?>
<?php endif;?>
	});
