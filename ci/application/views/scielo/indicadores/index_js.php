google.load('visualization', '1.1', {packages:['corechart', 'table', 'bar', 'line'], 'language': 'en'});
var realIndicator = null;
var val = {indicador: null, coleccion: null, area: null, revista: null, paisAutor: null, paisRevista: null, edad: null, tipodoc: null}
var chart = {normal: null, bradford:null, group1:null, group2:null, bargrp:null, data:null};
chart.data = {normal: null, bradford:null, group1:null, group2:null, bargrp:null, bargrpJ:null};
var tables = {normal: null, bradford:null, group1:null, group2:null, group3:null, bargrp:null};
var brfLim = null;
var popState = {indicador:false, coleccion:false, revista:false, paisRevista:false, paisAutor:false, periodo:false, area:false, edad: false, tipodoc: false};
var rangoPeriodo="0-0";
var urls = {coleccion:'', area:'', revista:'', paisAutor:'', paisRevista:'', edad:'', tipodoc:''}
var asyncAjax=false;
var urlData = null;
var lastGeneralChart = 'fasciculos';
var cloneToolTip = {};
Highcharts.setOptions({
	colors: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#651067'],
	lang: {decimalPoint: '.', thousandsSep: ','}
});
$(document).ready(function(){
	$(window).bind('popstate',  function(event) {
		console.log('pop:');
		updateData(event.originalEvent.state)	
	});

	$('.carousel').carousel({
	  interval: false
	})
	$('#indicador, #coleccion, #area, #revista, #paisRevista, #paisAutor, #edad, #tipodoc').select2({
		allowClear: true,
		closeOnSelect: true
	});

	$("#indicador").on("change", function(e){
		console.log('indicador change');
		$.each(val, function(k,v){val[k]=null;});
		$.each(urls, function(k,v){urls[k]='';});
		val.indicador = $(this).val();
		realIndicator = val.indicador;
		$('#coleccion, #area, #revista, #paisRevista, #paisAutor, #edad, #tipodoc').select2('val', '').select2('enable', false).parent().hide();
		$('#revista, #paisRevista, #paisAutor').empty().append('<option></option>').select2('destroy');
		$("#periodos, #tabs, #chartContainer, #bradfodContainer, #group-container").hide('slow');
		$('#sliderPeriodo').prop('disabled', true);
		switch (val.indicador){
			case 'distribucion-articulos-coleccion':
				updateInfo();
				$('#coleccion').select2('enable', true).parent().show();
				if(urlData == null || typeof urlData.coleccion === "undefined")
					setPeriodos();
				break;
			case 'distribucion-revista-coleccion':
			case 'indicadores-generales-revista':
				updateInfo();
				$('#coleccion').select2('enable', true).parent().show();
				break;
			case 'citacion-articulos-edad':
				updateInfo();
				$("#edad").select2('enable', true).parent().show();
				break;
			case 'citacion-articulos-tipo':
				updateInfo();
				$('#tipodoc').select2('enable', true).parent().show();
				break;
			case 'citaction-articulos-area-revista':
				updateInfo();
				$('#area').select2('enable', true).parent().show();
				break;
			default:
				break;
		}

		if(typeof history.pushState === "function" && !popState.indicador){
			history.pushState($("#generarIndicador").serializeJSON(), null, '<?=site_url('scielo/indicadores')."/"?>' + val.indicador);
		}
		popState.indicador=false;
		console.log(e);
	});

	$('#coleccion').on("change", function(e){
		console.log('coleccion change');
		val.coleccion = $(this).val();
		console.log(val.coleccion);
		urls.coleccion = "";
		if(val.coleccion != "" && val.coleccion != null){
			urls.coleccion='/coleccion/' + val.coleccion.join('/');
		}
		if(typeof history.pushState === "function" && !popState.coleccion){
			history.pushState($("#generarIndicador").serializeJSON(), null, '<?=site_url('scielo/indicadores')."/"?>' + val.indicador + urls.coleccion);
		}
		$("#chartContainer, #bradfodContainer, #group-container").hide();
		switch (realIndicator){
			case 'distribucion-articulos-coleccion':
			case 'distribucion-articulos-coleccion-area':
			case 'distribucion-articulos-coleccion-revista':
			case 'distribucion-articulos-coleccion-afiliacion':
				realIndicator = val.indicador;
				$('#tabs, #group-container').show();
				if(val.coleccion != "" && val.coleccion != null){
					$('#area, #revista, #paisAutor').select2('enable', true)
					.parent().show();
					$.ajax({
						url: '<?=site_url("scielo/indicadores/getOptionData");?>',
						type: 'POST',
						dataType: 'json',
						data: getSerializedForm(),
						async: false,
						success: function(data) {
							console.log(data);
							$('#revista, #paisAutor').empty()
							.append('<option></option>')
							.select2('destroy');
							$('#revista, #paisAutor').parent().hide();
							if(typeof data.revistas !== "undefined"){
								$.each(data.revistas, function(key, revista) {
									optgroup = $('<optgroup label="SciELO '+key+'"></optgroup>');
									$.each(revista, function(k, v){
										optgroup.append('<option value="' + k +'">' + v + '</option>');
									});
									$('#revista').append(optgroup);
								});
								if(val.revista != null && val.revista != '')
									$('#revista').val(val.revista);
								$('#revista').show().select2({allowClear: true, closeOnSelect: true})
								.select2('enable', true).parent().show();
							}
							if(typeof data.paises !== "undefined"){
								$.each(data.paises, function(k, v) {
									$('#paisAutor').append('<option value="' + k +'">' + v + '</option>');
								});
								if(val.paisAutor != null && val.paisAutor != '')
									$('#paisAutor').val(val.paisAutor);
								$('#paisAutor').show().select2({allowClear: true, closeOnSelect: true})
								.select2('enable', true).parent().show();
							}
						}
					});
					if(val.area !== "" && val.area != null){
						$('#area').trigger('change');
					}
					if(val.revista !== "" && val.revista != null){
						$('#revista').trigger('change');
					}
					if(val.paisAutor !== "" && val.paisAutor != null){
						$('#paisAutor').trigger('change');
					}
					if((urlData == null || (typeof urlData.area === "undefined" && typeof urlData.revista === "undefined" && typeof urlData.paisAutor === "undefined")) && (val.area === "" || val.area == null) && (val.revista === "" || val.revista == null) && (val.paisAutor === "" || val.paisAutor == null)){
						setPeriodos();
					}
				}else{
					$('#indicador').trigger('change');
				}
				break;
			case 'distribucion-articulos-coleccion-area-revista':
				if(val.coleccion != "" && val.coleccion != null){
					val.revista = $('#revista').val() == null ? null : $.unique($('#revista').val());
					$('#area').trigger('change');
				}else{
					$('#indicador').trigger('change');
				}
				break;
			case 'distribucion-revista-coleccion':
				$('#tabs, #periodos, #chartContainer, #bradfodContainer, #group-container').hide();
				if(val.coleccion != "" && val.coleccion != null){
					setPeriodos();
				}
				break;
			case 'indicadores-generales-revista':
				if(val.coleccion != "" && val.coleccion != null){
					$('#revista').parent().show();
					$('#revista').select2('enable', true);
					$.ajax({
						url: '<?=site_url("scielo/indicadores/getOptionData");?>',
						type: 'POST',
						dataType: 'json',
						data: getSerializedForm(),
						async: false,
						success: function(data) {
							console.log(data);
							$('#revista').empty()
							.append('<option></option>')
							.select2('destroy')
							.parent().hide();
							if(typeof data.revistas !== "undefined"){
								$.each(data.revistas, function(key, revista) {
									optgroup = $('<optgroup label="SciELO '+key+'"></optgroup>');
									$.each(revista, function(k, v){
										optgroup.append('<option value="' + k +'">' + v + '</option>');
									});
									$('#revista').append(optgroup);
								});
								if(val.revista != null && val.revista != '')
									$('#revista').val(val.revista);
								$('#revista').select2({allowClear: true, closeOnSelect: true})
								.select2('enable', true)
								.parent().show();
							}
						}
					});
					if(val.revista !== "" && val.revista != null){
						$('#revista').trigger('change');
					}
				}else{
					$('#tabs, #group-container, #periodos').hide();
					$('#revista').select2('val', '?')
					.select2('enable', false)
					.parent().hide();
					val.revista = null;
				}
				break;
			default:
				$('#tabs, #periodos, #chartContainer, #bradfodContainer, #group-container').hide();
				break;
		}
		popState.coleccion=false;
		console.log(e);
	});

	$('#area').on('change', function(e){
		console.log('area change');
		val.area = $(this).val();
		urls.area="";
		if(val.area != "" && val.area != null){
			urls.area='/area/' + val.area.join('/');
		}
		if(typeof history.pushState === "function" && !popState.area){
			history.pushState($("#generarIndicador").serializeJSON(), null, '<?=site_url('scielo/indicadores')."/"?>' + val.indicador + urls.coleccion + urls.edad + urls.tipodoc + urls.area + urls.revista);
		}
		$("#chartContainer, #bradfodContainer, #group-container").hide();
		switch (realIndicator){
			case 'distribucion-articulos-coleccion':
			case 'distribucion-articulos-coleccion-area':
			case 'distribucion-articulos-coleccion-area-revista':
				$('#tabs, #chartContainer').show();
				if(val.area != "" && val.area != null){
					$('#paisAutor').select2('enable', false).parent().hide();
					if (val.revista == null || val.revista == '')
						realIndicator = 'distribucion-articulos-coleccion-area';
					$.ajax({
						url: '<?=site_url("scielo/indicadores/getOptionData");?>',
						type: 'POST',
						dataType: 'json',
						data: getSerializedForm(),
						async: false,
						success: function(data) {
							console.log(data);
							$('#revista').empty()
							.append('<option></option>')
							.select2('destroy').parent().hide();
							if(typeof data.revistas !== "undefined"){
								$.each(data.revistas, function(key, area) {
									optgroup = $('<optgroup label="SciELO '+key+'"></optgroup>');
									$.each(area, function(key2, revista){
										optgroup2 = $('<optgroup label="'+key2+'"></optgroup>');
										$.each(revista, function(k, v){
											optgroup2.append('<option value="' + k +'">' + v + '</option>');
										});
										optgroup.append(optgroup2);
									});
									$('#revista').append(optgroup);
								});
								if(val.revista != null && val.revista != '')
									$('#revista').val(val.revista);
								val.revista = $('#revista').val() == null ? null : $.unique($('#revista').val());
								$('#revista').show().select2({allowClear: true, closeOnSelect: true}).select2('enable', true)
								.parent().show();
							}
						}
					});
					if (val.revista == null || val.revista == '')
						realIndicator = 'distribucion-articulos-coleccion-area';
					updateInfo();
					if(urlData == null || typeof urlData.revista === "undefined")
						setPeriodos();
				}else{
					realIndicator = val.indicador
					$('#revista, #paisAutor').select2('val', '?').select2('enable', true)
					.parent().show();
					val.revista = null;
					if(!popState.coleccion)
						$('#coleccion').trigger('change');
				}
				break;
			case 'citacion-articulos-edad':
			case 'citacion-articulos-edad-area':
				$('#tabs, #chartContainer').show();
				if(val.area != "" && val.area != null){
					$('#revista, #paisAutor').select2('enable', false)
					.parent().hide();
					realIndicator = 'citacion-articulos-edad-area';
					updateInfo();
					setPeriodos();
				}else{
					$('#area, #revista, #paisAutor').select2('enable', true)
					.parent().show();
					if(!popState.edad)
						$('#edad').trigger('change');
				}
				break;
			case 'citacion-articulos-tipo':
			case 'citacion-articulos-tipo-area':
				$('#tabs, #chartContainer').show();
				if(val.area != "" && val.area != null){
					$('#revista, #paisAutor').select2('enable', false)
					.parent().hide();
					realIndicator = 'citacion-articulos-tipo-area';
					updateInfo();
					setPeriodos();
				}else{
					$('#area, #revista, #paisAutor').select2('enable', true)
					.parent().show();
					if(!popState.tipodoc)
						$('#tipodoc').trigger('change');
				}
				break;
			case 'citaction-articulos-area-revista':
				$('#tabs, #chartContainer').show();
				if(val.area != "" && val.area != null){
					$('#paisAutor').select2('enable', false).parent().hide();
					$.ajax({
						url: '<?=site_url("scielo/indicadores/getOptionData");?>',
						type: 'POST',
						dataType: 'json',
						data: getSerializedForm(),
						async: false,
						success: function(data) {
							console.log(data);
							$('#revista').empty()
							.append('<option></option>')
							.select2('destroy').parent().hide();
							if(typeof data.revistas !== "undefined"){
								$.each(data.revistas, function(key, revista) {
									$('#revista').append('<option value="' + key +'">' + revista + '</option>');
								});
								if(val.revista != null && val.revista != '')
									$('#revista').val(val.revista);
								val.revista = $('#revista').val();
								$('#revista').show().select2({allowClear: true, closeOnSelect: true}).select2('enable', true)
								.parent().show();
							}
						}
					});
				}else{
					$('#revista').select2('val', '?').select2('enable', false)
					.parent().hide();
					val.revista = null;
				}
				break;
			default:
				break;
		}
		popState.area=false;
		console.log(e);
	});

	$('#revista').on("change", function(e){
		console.log('revista change');
		val.revista = $(this).val() == null ? null : $.unique($(this).val());
		urls.revista="";
		if(val.revista != null){
			urls.revista='/revista/' + val.revista.join('/');
		}
		if(typeof history.pushState === "function" && !popState.revista){
			history.pushState($("#generarIndicador").serializeJSON(), null, '<?=site_url('scielo/indicadores')."/"?>' + val.indicador + urls.coleccion + urls.edad + urls.tipodoc + urls.area + urls.revista);
		}
		$("#chartContainer, #bradfodContainer, #group-container").hide();
		switch (realIndicator){
			case 'distribucion-articulos-coleccion':
			case 'distribucion-articulos-coleccion-revista':
				$('#tabs, #chartContainer').show();
				if(val.revista != "" && val.revista != null){
					realIndicator = 'distribucion-articulos-coleccion-revista';
					$('#area, #paisAutor').select2('enable', false)
					.parent().hide();
					updateInfo();
					setPeriodos();
				}else{
					$('#area, #revista, #paisAutor').select2('enable', true)
					.parent().show();
					if(!popState.coleccion)
						$('#coleccion').trigger('change');
				}
				break;
			case 'distribucion-articulos-coleccion-area':
			case 'distribucion-articulos-coleccion-area-revista':
				$('#tabs, #chartContainer').show();
				if(val.revista != "" && val.revista != null){
					$('#paisAutor').select2('enable', false)
					.parent().hide();
					realIndicator = 'distribucion-articulos-coleccion-area-revista';
					updateInfo();
					setPeriodos();
				}else if(!popState.coleccion){
					realIndicator = 'distribucion-articulos-coleccion-area';
					$('#area').trigger('change');
				}
				break;
			case 'indicadores-generales-revista':
				$('#tabs, #group-container').show();
				if(val.revista != "" && val.revista != null){
					setPeriodos();
				}else{
					$('#tabs, #group-container, #periodos').hide();
				}
				break;
			case 'citacion-articulos-edad':
			case 'citacion-articulos-edad-revista':
				$('#tabs, #chartContainer').show();
				if(val.revista != "" && val.revista != null){
					$('#area, #paisAutor').select2('enable', false)
					.parent().hide();
					realIndicator = 'citacion-articulos-edad-revista';
					updateInfo();
					setPeriodos();
				}else{
					$('#area, #revista, #paisAutor').select2('enable', true)
					.parent().show();
					if(!popState.edad)
						$('#edad').trigger('change')
				};
				break;
			case 'citacion-articulos-tipo':
			case 'citacion-articulos-tipo-revista':
				$('#tabs, #chartContainer').show();
				if(val.revista != "" && val.revista != null){
					$('#area, #paisAutor').select2('enable', false)
					.parent().hide();
					realIndicator = 'citacion-articulos-tipo-revista';
					updateInfo();
					setPeriodos();
				}else{
					$('#area, #revista, #paisAutor').select2('enable', true)
					.parent().show();
					if(!popState.tipodoc)
						$('#tipodoc').trigger('change');
				}
				break;
			default:
				break;
		}
		popState.revista=false;
		console.log(e);
	});

	$('#paisAutor').on("change", function(e){
		console.log('paisAutor change');
		val.paisAutor = $(this).val();
		urls.paisAutor="";
		if(val.paisAutor != "" && val.paisAutor != null){
			urls.paisAutor='/pais-autor/' + val.paisAutor.join('/');
		}
		if(typeof history.pushState === "function" && !popState.paisAutor){
			history.pushState($("#generarIndicador").serializeJSON(), null, '<?=site_url('scielo/indicadores')."/"?>' + val.indicador + urls.coleccion + urls.edad + urls.tipodoc + urls.paisAutor);
		}
		$("#chartContainer, #bradfodContainer, #group-container").hide();
		switch (val.indicador){
			case 'distribucion-articulos-coleccion':
			case 'distribucion-articulos-coleccion-afiliacion':
				$('#tabs, #chartContainer').show();
				if(val.paisAutor != "" && val.paisAutor != null){
					realIndicator = 'distribucion-articulos-coleccion-afiliacion';
					$('#revista, #area').select2('enable', false)
					.parent().hide();
					updateInfo();
					setPeriodos();
				}else{
					$('#area, #revista, #paisAutor').select2('enable', true)
					.parent().show();
					if(!popState.coleccion)
						$('#coleccion').trigger('change');
				}
				break;
			case 'citacion-articulos-edad':
			case 'citacion-articulos-edad-afiliacion':
				$('#tabs, #chartContainer').show();
				if(val.paisAutor != "" && val.paisAutor != null){
					$('#area, #revista').select2('enable', false)
					.parent().hide();
					realIndicator = 'citacion-articulos-edad-afiliacion';
					updateInfo();
					setPeriodos();
				}else{
					$('#area, #revista, #paisAutor').select2('enable', true)
					.parent().show();
					if(!popState.edad)
						$('#edad').trigger('change');
				}
				break;
			case 'citacion-articulos-tipo':
			case 'citacion-articulos-tipo-afiliacion':
				$('#tabs, #chartContainer').show();
				if(val.paisAutor != "" && val.paisAutor != null){
					$('#area, #revista').select2('enable', false)
					.parent().hide();
					realIndicator = 'citacion-articulos-tipo-afiliacion';
					updateInfo();
					setPeriodos();
				}else{
					$('#area, #revista, #paisAutor').select2('enable', true)
					.parent().show();
					if(!popState.tipodoc)
						$('#tipodoc').trigger('change');
				}
				break;
			default:
				break;
		}
		popState.paisAutor=false;
		console.log(e);
	});

	$('#paisRevista').on("change", function(e){
		value = $(this).val();
		indicadorValue = $("#indicador").val();
		coleccionValue = $('#coleccion').val();
		$('#sliderPeriodo').prop("disabled", true);
		if (value != "" && value != null) {
			$('#revista').select2('enable', false);
			$('#paisAutor').select2('enable', false);
			setPeriodos();
		}else{
			$("#periodos, #tabs, #chartContainer").hide('slow');
			$('#revista').select2('enable', true);
			$('#paisAutor').select2('enable', true);
		}
		if(typeof history.pushState === "function" && !popState.paisRevista){
			urls.paisRevista="";
			if(value != "" && value != null){
				urls.paisRevista='/pais-revista/' + value.join('/');
			}
			console.log('pushState');
			console.log(urls.paisRevista);
			history.pushState($("#generarIndicador").serializeJSON(), null, '<?=site_url('scielo/indicadores')."/"?>' + indicadorValue + '/coleccion/' + coleccionValue + urls.paisRevista);
		}
		popState.paisRevista=false;
		console.log(e);
	});

	$('#edad').on('change', function(e){
		console.log('edad change');
		val.edad = $(this).val();
		urls.edad="";
		if(val.edad != "" && val.edad != null){
			urls.edad='/edad/' + val.edad.join('/');
		}
		if(typeof history.pushState === "function" && !popState.edad){
			history.pushState($("#generarIndicador").serializeJSON(), null, '<?=site_url('scielo/indicadores')."/"?>' + val.indicador + urls.edad);
		}
		$("#tabs, #periodos, #chartContainer, #bradfodContainer, #group-container").hide();
		$('#area, #revista, #paisRevista, #paisAutor').select2('enable', false);
		switch(realIndicator){
			case 'citacion-articulos-edad':
			case 'citacion-articulos-edad-area':
			case 'citacion-articulos-edad-revista':
			case 'citacion-articulos-edad-afiliacion':
				realIndicator = val.indicador;
				if(val.edad != "" && val.edad != null){
					$('#area, #revista, #paisAutor').select2('enable', true)
					.parent().show();
					$.ajax({
						url: '<?=site_url("scielo/indicadores/getOptionData");?>',
						type: 'POST',
						dataType: 'json',
						data: getSerializedForm(),
						async: false,
						success: function(data) {
							console.log(data);
							$('#revista, #paisAutor').empty()
							.append('<option></option>')
							.select2('destroy');
							$('#revista, #paisAutor').parent().hide();
							if(typeof data.revistas !== "undefined"){
								$.each(data.revistas, function(k, v) {
									$('#revista').append('<option value="' + k +'">' + v + '</option>');
								});
								if(val.revista != null && val.revista != '')
									$('#revista').val(val.revista);
								$('#revista').show().select2({allowClear: true, closeOnSelect: true})
								.select2('enable', true).parent().show();
							}
							if(typeof data.paises !== "undefined"){
								$.each(data.paises, function(k, v) {
									$('#paisAutor').append('<option value="' + k +'">' + v + '</option>');
								});
								if(val.paisAutor != null && val.paisAutor != '')
									$('#paisAutor').val(val.paisAutor);
								$('#paisAutor').show().select2({allowClear: true, closeOnSelect: true})
								.select2('enable', true).parent().show();
							}
						}
					});
					if((urlData == null || (typeof urlData.area === "undefined" && typeof urlData.revista === "undefined" && typeof urlData.paisAutor === "undefined")) && (val.area === "" || val.area == null) && (val.revista === "" || val.revista == null) && (val.paisAutor === "" || val.paisAutor == null)){
						$('#tabs, #chartContainer').show();
						setPeriodos();
					}
					if(val.area !== "" && val.area != null){
						$('#area').trigger('change');
					}
					if(val.revista !== "" && val.revista != null){
						$('#revista').trigger('change');
					}
					if(val.paisAutor !== "" && val.paisAutor != null){
						$('#paisAutor').trigger('change');
					}
				}else{
					$('#area, #revista, #paisAutor').select2('val', '?').select2('enable', false)
					.parent().hide();
					val.area = null;
					val.revista = null;
					val.paisAutor = null;
				}
				break;
			default:
				break;
		}
		popState.edad=false;
		console.log(e);
	});

	$('#tipodoc').on('change', function(e){
		console.log('tipodoc change');
		val.tipodoc = $(this).val();
		urls.tipodoc="";
		if(val.tipodoc != "" && val.tipodoc != null){
			urls.tipodoc='/tipo-documento/' + val.tipodoc.join('/');
		}
		if(typeof history.pushState === "function" && !popState.tipodoc){
			history.pushState($("#generarIndicador").serializeJSON(), null, '<?=site_url('scielo/indicadores')."/"?>' + val.indicador + urls.tipodoc);
		}
		$('#tabs, #periodos, #chartContainer, #bradfodContainer, #group-container').hide();
		$('#area, #revista, #paisRevista, #paisAutor').select2('enable', false);
		switch(realIndicator){
			case 'citacion-articulos-tipo':
			case 'citacion-articulos-tipo-area':
			case 'citacion-articulos-tipo-revista':
			case 'citacion-articulos-tipo-afiliacion':
				realIndicator = val.indicador;
				if(val.tipodoc != "" && val.tipodoc != null){
					$('#area, #revista, #paisAutor').select2('enable', true)
					.parent().show();
					$.ajax({
						url: '<?=site_url("scielo/indicadores/getOptionData");?>',
						type: 'POST',
						dataType: 'json',
						data: getSerializedForm(),
						async: false,
						success: function(data) {
							console.log(data);
							$('#revista, #paisAutor').empty()
							.append('<option></option>')
							.select2('destroy');
							$('#revista, #paisAutor').parent().hide();
							if(typeof data.revistas !== "undefined"){
								$.each(data.revistas, function(k, v) {
									$('#revista').append('<option value="' + k +'">' + v + '</option>');
								});
								if(val.revista != null && val.revista != '')
									$('#revista').val(val.revista);
								$('#revista').show().select2({allowClear: true, closeOnSelect: true})
								.select2('enable', true).parent().show();
							}
							if(typeof data.paises !== "undefined"){
								$.each(data.paises, function(k, v) {
									$('#paisAutor').append('<option value="' + k +'">' + v + '</option>');
								});
								if(val.paisAutor != null && val.paisAutor != '')
									$('#paisAutor').val(val.paisAutor);
								$('#paisAutor').show().select2({allowClear: true, closeOnSelect: true})
								.select2('enable', true).parent().show();
							}
						}
					});
					if((urlData == null || (typeof urlData.area === "undefined" && typeof urlData.revista === "undefined" && typeof urlData.paisAutor === "undefined")) && (val.area === "" || val.area == null) && (val.revista === "" || val.revista == null) && (val.paisAutor === "" || val.paisAutor == null)){
						$('#tabs, #chartContainer').show();
						setPeriodos();
					}
					if(val.area !== "" && val.area != null){
						$('#area').trigger('change');
					}
					if(val.revista !== "" && val.revista != null){
						$('#revista').trigger('change');
					}
					if(val.paisAutor !== "" && val.paisAutor != null){
						$('#paisAutor').trigger('change');
					}
				}else{
					$('#area, #revista, #paisAutor').select2('val', '?').select2('enable', false)
					.parent().hide();
					val.area = null;
					val.revista = null;
					val.paisAutor = null;
				}
				break;
			default:
				break;
		}
		popState.tipodoc=false;
		console.log(e);	
	});

	$('#sliderPeriodo').jslider();

	$('#tabs').tabs({ 
		show: { effect: "fade", duration: 800 }
	});

	$("#gridContainer").accordion({
		heightStyle: "content",
		collapsible: true,
		active: false,
		activate: function( event, ui ) {
			$('html, body').animate({
				scrollTop: $('#tabs').offset().top
			}, 700);
		}
	});

	$("#generarIndicador").on("submit", function(e){
		console.log(e);
		e.preventDefault();
		loading.start();
		urlRequest = '<?=site_url("scielo/indicadores/getChartData");?>';
		jQuery.ajax({
		  url: urlRequest,
		  type: 'POST',
		  dataType: 'json',
		  data: getSerializedForm(),
		  success: function(data) {
		  	console.log(data);
		  	$('#tabs').tabs("option", "active", 0);
			$('#carousel-chargrp').off('slid.bs.carousel');
			cloneToolTip = {};
			switch(realIndicator){
				case "distribucion-articulos-coleccion":
					$("#tabs, #group-container").slideDown('slow');
					chart.bargrp = new Array();
					chart.data.bargrp = new Array();
					chart.data.bargrpJ = data.journal;
					$("#carousel-chargrp .carousel-indicators, #carousel-chargrp .carousel-inner").empty();
					jQuery.each(data.highchart, function(key, grupo) {
						cloneToolTip[key] = {};
						var active = ''
						if(key == 0)
							active = 'active' 
						$("#carousel-chargrp .carousel-indicators").append('<li data-target="#carousel-chargrp" data-slide-to="' + key + '" class="' + active + '"></li>');
						$("#carousel-chargrp .carousel-inner").append('<div id="chartParent' + key + '" class="item ' + active + '">' + data.chartTitle + ' <div id="groupChart' + key +'" class="chart_data"></div></div>');
						data.highchart[key].tooltip = {formatter: function(){
							var articulos, otros;
							articulos = this.y;
							otros = this.point.stackTotal - this.y;
							if (/.*-otros$/m.test(this.series.name)){
								articulos = this.point.stackTotal - this.y;
								otros = this.y;
							}
							return '<b>' + this.series.name.replace('-otros', '') + ' (' + this.x + ')</b><br/>' +
								'<?php _e("Artículos originales")?>: ' + articulos.toLocaleString() +'<br/>' +
								'<?php _e("Otros documentos")?>: ' + otros.toLocaleString() +'<br/>' +
								'Total: ' + this.point.stackTotal.toLocaleString();
						}};
						data.highchart[key].plotOptions.series.events = {legendItemClick: function(e){
								e.preventDefault();
							}
						};
						data.highchart[key].plotOptions.series.point.events = {click: function(){
							cloneToolTipFn(this, key);
						}};
						$('#groupChart'+key).highcharts(data.highchart[key]);
						chart.bargrp[key] = $('#groupChart'+key).highcharts();
					});
					$("#carousel-chargrp").carousel(0);
					var tableData = new google.visualization.DataTable(data.table);
					$("#gridContainer").empty();
					$("#gridContainer").append(data.tableTitle);
					$("#gridContainer").append('<div id="table0"></div>');
					tables.bargrp = new google.visualization.Table(document.getElementById('table0'));
					tables.bargrp.draw(tableData, data.tableOptions);
					changeTableClass();
					google.visualization.events.addListener(tables.bargrp , 'sort', changeTableClass);
					break;
				case "indicadores-generales-revista":
					$("#tabs, #group-container").slideDown('slow');
					chart.bargrp = new Array();
					chart.data.bargrp = new Array();
					chart.data.bargrpJ = data.journal;
					$("#carousel-chargrp .carousel-indicators, #carousel-chargrp .carousel-inner").empty();
					nav = 0;
					jQuery.each(data.highchart, function(key, grupo) {
						cloneToolTip[key] = {};
						var active = ''
						if(key == lastGeneralChart)
							active = 'active' 
						$("#carousel-chargrp .carousel-indicators").append('<li data-target="#carousel-chargrp" data-slide-to="' + nav + '" class="' + active + '"></li>');
						$("#carousel-chargrp .carousel-inner").append('<div id="chartParent' + key + '" class="item ' + active + '"><div class="text-center nowrap"><h4>' + data.title[key] + '</h4>' + data.update + '</div><div id="groupChart' + key +'" class="chart_data"></div></div>');
						switch(key){
							case 'citas':
								data.highchart[key].tooltip = {formatter: function(){
									var citas, autocitas;
									citas = this.y;
									autocitas = this.point.stackTotal - this.y;
									if (/.*-autocitas$/m.test(this.series.name)){
										citas = this.point.stackTotal - this.y;
										autocitas = this.y;
									}
									return '<b>' + this.series.name.replace('-autocitas', '') + ' (' + this.x + ')</b><br/>' +
										'<?php _e("Citas")?>: ' + citas.toLocaleString() + ' ('+ ((citas/this.point.stackTotal)*100).toFixed(2) +'%)<br/>' +
										'<?php _e("Autocitas")?>: ' + autocitas.toLocaleString() + ' ('+ ((autocitas/this.point.stackTotal)*100).toFixed(2) +'%)<br/>' +
										'Total: ' + this.point.stackTotal.toLocaleString();
								}};
								break;
							case 'vidaMedia':
								data.highchart[key].plotOptions.series.dataLabels.formatter = function(){
									value = this.y;
									if (value > 10)
										value = '>10.0';
									return value;
								};
								data.highchart[key].tooltip = {formatter: function(){
									var citas, autocitas;
									value = this.y;
									if (value > 10)
										value = '>10.0';
									return '<b>'+this.series.name+'</b><br/><?php _e("Vida media en el año")?> '+this.x+': <b>'+value+'</b> <?php _e("Años")?>';
								}};
							default:
								break;
						}
						data.highchart[key].plotOptions.series.events = {legendItemClick: function(e){
								e.preventDefault();
							}
						};
						data.highchart[key].plotOptions.series.point.events = {click: function(){
							cloneToolTipFn(this, key);
						}};
						$('#groupChart'+key).highcharts(data.highchart[key]);
						chart.bargrp[key] = $('#groupChart'+key).highcharts();
						nav++;
					});
					$('#carousel-chargrp').on('slid.bs.carousel', function () {
						lastGeneralChart = $('#carousel-chargrp').find('.item.active').attr('id').replace('chartParent', '');
						updateInfoRevista();
						console.log(lastGeneralChart);
					});
					var tableData = new google.visualization.DataTable(data.dataTable);
					$("#gridContainer").empty();
					$("#gridContainer").append(data.tableTitle);
					$("#gridContainer").append($('<div></div>').attr('id', 'table0'));
					tables.normal = new google.visualization.Table(document.getElementById('table0'));
					tables.normal.draw(tableData, data.tableOptions);
					google.visualization.events.addListener(tables.normal , 'sort', changeTableClass);
					changeTableClass();
					updateInfoRevista();
					break;
				default:
					cloneToolTip['normal'] = {};
					$("#tabs, #chartContainer").show('slow');
					data.highchart.plotOptions.series.point.events = {click: function(){
						cloneToolTipFn(this, 'normal');
					}};
					$('#chart').highcharts(data.highchart);
					chart.normal = $('#chart').highcharts();
					$("#chartTitle").html(data.chartTitle);

					var tableData = new google.visualization.DataTable(data.dataTable);
					$("#gridContainer").empty();
					$("#gridContainer").append(data.tableTitle);
					$("#gridContainer").append('<div id="table0"></div>');
					tables.normal = new google.visualization.Table(document.getElementById('table0'));
					tables.normal.draw(tableData, data.tableOptions);
					changeTableClass();
					google.visualization.events.addListener(tables.normal , 'sort', changeTableClass);
					break;
			}
			console.log(chart);
			loading.end();
		  }
		});
	});
<?php if (preg_match('%indicadores/(...+?)%', uri_string())):?>
	urlData = {
<?php 	if (preg_match('%indicadores/(.+?)(/.*|$)%', uri_string())):?>
		indicador:"<?=preg_replace('%.+?/indicadores/(.+?)(/.*|$)%', '\1', uri_string());?>",
<?php 	endif;?>
<?php 	if (preg_match('%.*?/coleccion/(.+?)(/.*|$)%', uri_string())):?>
		coleccion:"<?=preg_replace('%.*?/coleccion/(.+?)(/area.*|/revista.*|/pais.*|/[0-9]{4}-[0-9]{4}|$)%', '\1', uri_string());?>".split('/'),
<?php 	endif;?>
<?php 	if (preg_match('%.*?/edad/(.+?)(/.*|$)%', uri_string())):?>
		edad:"<?=preg_replace('%.*?/edad/(.+?)(/area.*|/revista.*|/pais.*|/[0-9]{4}-[0-9]{4}|$)%', '\1', uri_string());?>".split('/'),
<?php 	endif;?>
<?php 	if (preg_match('%.*?/tipo-documento/(.+?)(/.*|$)%', uri_string())):?>
		tipodoc:"<?=preg_replace('%.*?/tipo-documento/(.+?)(/area.*|/revista/.*|/pais.*|/[0-9]{4}-[0-9]{4}|$)%', '\1', uri_string());?>".split('/'),
<?php 	endif;?>
<?php 	if (preg_match('%.*?/area/(.+?)(/.*|$)%', uri_string())):?>
		area:"<?=preg_replace('%.*?/area/(.+?)(/revista.*|/pais.*|/[0-9]{4}-[0-9]{4}|$)%', '\1', uri_string());?>".split('/'),
<?php 	endif;?>
<?php 	if (preg_match('%.*?/revista/(.+?)(/.*|$)%', uri_string())):?>
		revista:"<?=preg_replace('%.*?/revista/(.+?)(/area.*|/pais.*|/[0-9]{4}-[0-9]{4}|$)%', '\1', uri_string());?>".split('/'),
<?php 	endif;?>
<?php 	if (preg_match('%.*?/pais-revista/(.+?)(/.*|$)%', uri_string())):?>
		paisRevista:"<?=preg_replace('%.*?/pais-revista/(.+?)(/.*|$)%', '\1', uri_string());?>".split('/'),
<?php 	endif;?>
<?php 	if (preg_match('%.*?/pais-autor/(.+?)(/.*|$)%', uri_string())):?>
		paisAutor:"<?=preg_replace('%.*?/pais-autor/(.+?)(/area.*|/revista.*|/[0-9]{4}-[0-9]{4}|$)%', '\1', uri_string());?>".split('/'),
<?php 	endif;?>
<?php 	if (preg_match('%.*?/([0-9]{4})-([0-9]{4})%', uri_string())):?>
		periodo:"<?=preg_replace('%.*?/([0-9]{4})-([0-9]{4})%', '\1;\2', uri_string());?>"
<?php 	endif;?>
	}
	if(typeof urlData.indicador !== "undefined"){
		updateData();
	}
<?php endif;?>
	if(typeof history.replaceState === "function"){
		history.replaceState($("#generarIndicador").serializeJSON(), null);
	}
});
getSerializedForm = function () {
	dataPost = $('#generarIndicador').serializeArray();
	for (index = 0; index < dataPost.length; ++index) {
		if (dataPost[index].name == "indicador") {
			dataPost[index].value = realIndicator;
			break;
		}
	}
	return $.param(dataPost);
}

setPeriodos = function(){
	loading.start();
	$('#periodos').removeClass("hidden").slideDown('slow');
	jQuery.ajax({
		url: '<?=site_url("scielo/indicadores/getPeriodos");?>',
		type: 'POST',
		dataType: 'json',
		data: getSerializedForm(),
		async: false,
		success: function(data) {
			console.log(data);
			console.log(jQuery.parseJSON(data.scale));
			console.log(jQuery.parseJSON(data.heterogeneity));
			if(data.result){
				$('#sliderPeriodo').jslider().destroy();
				$('#sliderPeriodo').prop('disabled', false);
				$("#generate").prop('disabled', false);
				rangoPeriodo=data.anioBase + ";" + data.anioFinal;
				console.log(data)
				$('#sliderPeriodo').val(rangoPeriodo);
				$('#sliderPeriodo').data('pre', $('#sliderPeriodo').val());
				$('#sliderPeriodo').jslider({
					from: data.anioBase, 
					to: data.anioFinal, 
					heterogeneity: jQuery.parseJSON(data.heterogeneity), 
					scale: jQuery.parseJSON(data.scale),
					format: { format: '####', locale: 'us' }, 
					limits: false, 
					step: 1, 
					callback: function(value){
						console.log(value);
						if($('#sliderPeriodo').data('pre') != value){
							$('#sliderPeriodo').data('pre', value);
							$('#sliderPeriodo').val(value);
							rango=value.replace(';', '-');
							if(typeof history.pushState === "function"){
								history.pushState($("#generarIndicador").serializeJSON(), null, '<?=site_url('scielo/indicadores')."/"?>' + val.indicador + urls.coleccion + urls.area + urls.revista + urls.edad + '/' + rango);
							}
							$("#revista, #paisRevista").select2("close");
							$("#generarIndicador").submit();
						}
					}
				});
				$('#sliderPeriodo').jslider("value", data.anioBase, data.anioFinal);
				if(!popState.periodo){
					$("#generarIndicador").submit();
				}
				popState.periodo=false;
			}else{
				$('#sliderPeriodo').prop('disabled', true);
				$("#generate").prop('disabled', true);
				console.log(data.error);
			}
			loading.end();
		}
	});
};

updateInfo = function(){
	$("#info").children(".infoBox").hide();
	$("#info-" + realIndicator).show();
}

updateInfoRevista = function(){
	$("#info-" + realIndicator).children("div").hide();
	$("#info-" + realIndicator).children("#revista-" + lastGeneralChart).show();
}

updateData = function(){
	console.log("urlData");
	console.log(urlData);
	asyncAjax=false;
	actualForm = $("#generarIndicador").serializeJSON();
	if(typeof urlData.periodo !== "undefined"){
		popState.periodo = true;
	}
	// if(typeof urlData.indicador !== "undefined"){
	// 	updateInfo(urlData.indicador);
	// }
	if(typeof urlData.indicador !== "undefined"){
		popState.indicador=true;
		$("#indicador").val(urlData.indicador).trigger("change");
		actualForm = $("#generarIndicador").serializeJSON();
	}
	if(typeof urlData.coleccion !== "undefined"){
		popState.coleccion=true;
		popState.area=true;
		popState.revista=true;
		popState.paisAutor=true;
		$('#coleccion').val(urlData.coleccion).trigger("change");
		actualForm = $("#generarIndicador").serializeJSON();
	}

	if(typeof urlData.edad !== "undefined"){
		popState.edad=true;
		$('#edad').val(urlData.edad).trigger("change");
		actualForm = $("#generarIndicador").serializeJSON();
	}

	if(typeof urlData.tipodoc !== "undefined"){
		popState.tipodoc=true;
		$('#tipodoc').val(urlData.tipodoc).trigger("change");
		actualForm = $("#generarIndicador").serializeJSON();
	}

	if(typeof urlData.area !== "undefined"){
		popState.area=true;
		$("#area").val(urlData.area).trigger("change");
		actualForm = $("#generarIndicador").serializeJSON();
	}

	if(typeof urlData.revista !== "undefined"){
		popState.revista=true;
		$('#revista').val(urlData.revista).trigger("change");
		actualForm = $("#generarIndicador").serializeJSON();
	}

	if(typeof urlData.paisAutor !== "undefined"){
		popState.paisAutor=true;
		$('#paisAutor').val(urlData.paisAutor).trigger("change");
		actualForm = $("#generarIndicador").serializeJSON();
	}

	if(typeof urlData.periodo !== "undefined"){
		$('#sliderPeriodo').prop("disabled", false);
		$('#sliderPeriodo').jslider("value", urlData.periodo.substring(0, 4), urlData.periodo.substring(5));
		$('#sliderPeriodo').val(urlData.periodo);
		$("#generarIndicador").submit();
	}
	$.each(popState, function(k,v){popState[k]=false;});
	asyncAjax=true;
	urlData=null;
};

chooseZone = function () {
	var selection = chart.bradford.getSelection();
	console.log(selection);
	if (selection[0] != null && selection[0].row != null){
		var value = chart.data.bradford.getFormattedValue(selection[0].row, 0);
		if (value <= brfLim[1].lim.x){
			$("#carousel-bradford").carousel(1);
		}
		else if (value > brfLim[1].lim.x && value <= brfLim[2].lim.x) {
			$("#carousel-bradford").carousel(2);
		}else{
			$('#tabs').tabs("option", "active", 1);
			$("#gridContainer").accordion("option", "active", 3);
		}
	}else if  (selection[0] != null && selection[0].column != null){
		if(selection[0].column == 2){
			$("#carousel-bradford").carousel(1);
		}else if (selection[0].column == 3){
			$("#carousel-bradford").carousel(2);
		}else{
			$('#tabs').tabs("option", "active", 1);
			$("#gridContainer").accordion("option", "active", 3);
		}
	}
}

choosePoint = function () {
	var selection = chart.normal.getSelection()[0];
	indicadorValue = $("#indicador").val();
	if (selection && indicadorValue == "modelo-elitismo"){
		var revistaPais = chart.data.normal.getColumnId(selection.column);
		var anio = chart.data.normal.getFormattedValue(selection.row, 0);
		console.log(anio);
		jQuery.ajax({
			url: '<?=site_url("scielo/indicadores/getAutoresPrice");?>/'+ revistaPais + '/' + anio,
			type: 'POST',
			dataType: 'json',
			data: getSerializedForm(),
			success: function(data){
				console.log(data);
				var tableData = new google.visualization.DataTable(data.table);
				var table = new google.visualization.Table(document.getElementById('floatTable'));
				table.draw(tableData, data.tableOptions);
				changeTableClass();
				google.visualization.events.addListener(table , 'sort', changeTableClass);
				jQuery.colorbox({inline: true, href: $('#floatTable'), height:"90%",});
			}
		});
	}
}

bradfordArticles = function (group) {
	var selection = chart[group].getSelection()[0];
	indicadorValue = $("#indicador").val();
	if (selection && indicadorValue == "modelo-bradford-revista"){
		var revista = chart.data[group].getColumnId(selection.column);
		var disciplina=$('#coleccion').val();
		location.href = "<?=site_url("scielo/indicadores/modelo-bradford-revista/disciplina");?>/"+ disciplina + "/revista/"+ revista + "/documentos"
	}
}

getFrecuencias = function (key) {
	var selection = chart.bargrp[key].getSelection();
	if (selection[0] != null && selection[0].column != null){
		disciplina=$('#coleccion').val();
		revista=chart.data.bargrpJ[key][(selection[0].column+1)/2 -1];
		jQuery.ajax({
			url: '<?=site_url("scielo/indicadores/getFrecuencias");?>/'+ revista,
			type: 'POST',
			dataType: 'json',
			data: getSerializedForm(),
			success: function(data){
				console.log(data);
				var tableData = new google.visualization.DataTable(data.table);
				var table = new google.visualization.Table(document.getElementById('floatTable'));
				table.draw(tableData, data.tableOptions);
				changeTableClass();
				google.visualization.events.addListener(table , 'sort', changeTableClass);
				jQuery.colorbox({inline: true, href: $('#floatTable'), height:"90%",});
			}
		});
		
		console.log(revista);
	}
}
changeTableClass = function (argument) {
	$('.google-visualization-table-table')
	.removeClass('google-visualization-table-table')
	.addClass('table table-bordered table-condensed table-striped')
	.parent().removeClass('top-level').addClass('table-responsive')
	.parent().attr('style', 'position: relative;').removeClass('google-visualization-table content');
}

cloneToolTipFn = function(that, key) {
	var point = that.series.name+that.x+','+that.y;
	if (cloneToolTip[key][point]){
		cloneToolTip[key][point].remove();
		delete cloneToolTip[key][point];
	}else{
		cloneToolTip[key][point] = that.series.chart.tooltip.label.element.cloneNode(true);
		if (key === "normal")
			chart.normal.container.firstChild.appendChild(cloneToolTip[key][point]);
		else
			chart.bargrp[key].container.firstChild.appendChild(cloneToolTip[key][point]);
	}
}

$('.download-chart').on('click', function(e){
	e.preventDefault();
	$('#tabs').tabs("option", "active", 0);
	var fName = '';
	var $elem = null;
	$('<canvas id="canvas" width="1000px" height="550px" style="display:none;"></canvas>').appendTo('body');
	var canvas = document.getElementById("canvas");
	switch(realIndicator){
		case 'distribucion-articulos-coleccion':
		case 'indicadores-generales-revista':
			var current_chart = $('#carousel-chargrp').find('.item.active').attr('id').replace('chartParent', '');
			$elem = $('#chartParent'+current_chart).clone(true);
			canvg(canvas, $('#groupChart'+current_chart+' div svg')[0].outerHTML);
			fName = realIndicator+'-'+current_chart+'.png';
			break;
		default:
			$elem = $('#chartContainer').clone(true);
			canvg(canvas, $('#chart div svg')[0].outerHTML);
			fName = realIndicator+'.png';
			break;
	}
	$elem.find('svg').replaceWith($('<img class="center-block"></img>').attr('src', canvas.toDataURL("image/png")));
	$elem.appendTo('#charts');
	$('#canvas').remove();
	console.log($elem);
	html2canvas($elem, {background: '#FAFAFA'}).then(function(canvas) {
		console.log("rendered");
		var ctx = canvas.getContext('2d');
		ctx.webkitImageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
		var imgData = canvas.toDataURL("image/png");
		$elem.remove();
		tmp=$('<a></a>').attr('href', imgData).attr('download', fName);
		$('body').append(tmp);
		tmp.get(0).click();
		tmp.remove();
	});
});
$('.download-table').on('click', function(e){
	e.preventDefault();
	$('#tabs').tabs("option", "active", 1);
	$table = $('#table0').find('table').clone();
	$table.table2excel({name: '', fname: realIndicator+'.xls'});
	delete $table;
});
