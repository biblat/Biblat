google.load("visualization", "1", {packages:["corechart", "table"], 'language': 'en'});
var chart = {normal: null, bradford:null, group1:null, group2:null, pratt:null, data:null};
chart.data = {normal: null, bradford:null, group1:null, group2:null, pratt:null, prattJ:null};
var tables = {normal: null, bradford:null, group1:null, group2:null, group3:null, pratt:null};
var popState = {indicador:false, disciplina:false, revista:false, paisRevista:false, paisAutor:false, periodo:false};
var rangoPeriodo="0-0";
var dataPeriodo="0-0";
var paisRevistaURL="";
var asyncAjax=false;
<?php 	if (preg_match('%.*?/revista/(.+?)($|/[0-9]{4}-[0-9]{4})%', uri_string())):?>
var revistaHidden =  ['indice-concentracion', 'productividad-exogena'];
<?php 	else:?>
var revistaHidden =  [];
<?php 	endif;?>
var soloDisciplina = ['modelo-bradford-revista', 'modelo-bradford-institucion', 'indice-concentracion', 'productividad-exogena'];
var soloPaisAutor = ['indice-coautoria', 'tasa-documentos-coautorados', 'indice-colaboracion', 'frecuencias-institucion-documento', 'coautoria-pais'];
var agregaPeriodo = ['productividad-exogena'];
var cloneToolTip = {};
Highcharts.setOptions({
	colors: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#651067'],
	lang: {decimalPoint: '.', thousandsSep: ',', drillUpText:'< Regresar' }
});
$(document).ready(function(){
	$('.carousel').carousel({
	  interval: false
	})
	$("#indicador").select2({
		allowClear: true
	});

	$("#indicador").on("change", function(e){
		value = $(this).val();
		if(window.location.href.indexOf(value)===-1)
            window.location.replace(window.location.protocol+'//'+window.location.hostname+'/indicadores/'+ value);
		$("#paisRevistaDiv, #periodos, #tabs, #chartContainer, #bradfodContainer, #prattContainer").hide("slow");
		$("#disciplina").select2("val", "");
		$("#sliderPeriodo").prop('disabled', true);
		if (value == "") {
			$("#disciplina, #revista, #paisRevista, #paisAutor").select2("enable", false);
			$("#revista, #paisRevista, #paisAutor").empty().append('<option></option>');
			$("#revista, #paisRevista, #paisAutor").select2("destroy");
		}else if($.inArray(value, soloDisciplina) > -1){
			$("#revista, #paisRevista, #paisAutor").select2("enable", false);
			$("#revista, #paisRevista, #paisAutor").empty().append('<option></option>');
			$("#revista, #paisRevista, #paisAutor").select2("destroy");
			$("#disciplina").select2("enable", true);
			if($.inArray(value, revistaHidden) > -1)
				$("#revista").select2({allowClear: true, closeOnSelect: true});
			updateInfo(value);
		}else{
			$("#revista, #paisRevista, #paisAutor").select2({allowClear: true, closeOnSelect: true});
			$("#disciplina").select2("enable", true);
			updateInfo(value);
		}

		if(typeof history.pushState === "function" && !popState.indicador){
			history.pushState($("#generarIndicador").serializeJSON(), null, '<?=site_url('indicadores')."/"?>' + value);
		}
		popState.indicador=false;
		console.log(e);
	});

	$(window).bind('popstate',  function(event) {
		console.log('pop:');
		updateData(event.originalEvent.state)
		
	});

	$("#disciplina").select2({
		allowClear: true
	});

	$("#disciplina").on("change", function(e){
		value = $(this).val();
		indicadorValue = $("#indicador").val();
		$("#sliderPeriodo").prop('disabled', true);
		if (value == "") {
			$("#paisRevistaDiv, #periodos, #tabs, #chartContainer, #bradfodContainer, #prattContainer").hide("slow");
			$("#revista, #paisRevista, #paisAutor").empty().append('<option></option>');
			$("#revista, #paisRevista, #paisAutor").select2("destroy");
			$("#revista, #paisRevista, #paisAutor").select2({allowClear: true, closeOnSelect: true});
			$("#revista, #paisRevista, #paisAutor").select2("enable", false);
		} else if ($.inArray(indicadorValue, soloDisciplina) > -1 && $.inArray(indicadorValue, revistaHidden) == -1) {
			$("#generarIndicador").submit();
		} else {
			if(!loading.status && !popState.disciplina){
				loading.start();
			}
			if($.inArray(indicadorValue, revistaHidden) == -1){
				$("#orPaisRevistaColumn").show();
				$("#paisRevistaDiv").removeClass("hidden").slideDown("slow");
				$("#periodos, #tabs, #chartContainer, #bradfodContainer, #prattContainer").hide("slow");
			}else{
				$("#paisRevistaDiv").removeClass("hidden").slideDown("slow");
			}
			$.ajax({
				url: '<?=site_url("indicadores/getRevistasPaises");?>',
				type: 'POST',
				dataType: 'json',
				data: $("#generarIndicador").serialize(),
				async: asyncAjax,
				complete: function(data) {
                                        data = JSON.parse(data.responseText);
					console.log(data);
					controlsTotal = 0;
					$("#revista, #paisRevista, #paisAutor").empty().append('<option></option>');
					$("#revista").select2("destroy");
					$("#paisRevista").select2("destroy");
					$("#paisAutor").select2("destroy");
					$("#revista, #paisRevista, #paisAutor").hide();
					if(typeof data.revistas !== "undefined"){
						$("#revista").show().select2({allowClear: true, closeOnSelect: true}).select2("enable", false);
						$.each(data.revistas, function(key, val) {
							$("#revista").append('<option value="' + val.val +'">' + val.text + '</option>');
						});
						$("#revista").select2("enable", true);
						controlsTotal++;
					}
					if(typeof data.paisesRevistas !== "undefined" && indicadorValue != "indice-densidad-documentos"){
						$("#paisRevista").show().select2({allowClear: true, closeOnSelect: true}).select2("enable", false);
						$.each(data.paisesRevistas, function(key, val) {
							$("#paisRevista").append('<option value="' + val.val +'">' + val.text + '</option>');
						});
						$("#paisRevista").select2("enable", true);
						controlsTotal++;
					}
					if(typeof data.paisesAutores !== "undefined" && $.inArray(indicadorValue, soloPaisAutor) > -1){
						$("#paisAutor").show().select2({allowClear: true, closeOnSelect: true}).select2("enable", false);
						$.each(data.paisesAutores, function(key, val) {
							$("#paisAutor").append('<option value="' + val.val +'">' + val.text + '</option>');
						});
						$("#paisAutor").select2("enable", true);
						controlsTotal++;
					}
					if(controlsTotal < 2){
						$("#orPaisRevistaColumn").hide();
					}
					if(controlsTotal == 0){
						$.pnotify({
							title: '<?php _e('No se encontraron datos para la disciplina seleccionada');?>',
							icon: true,
							type: 'error',
							addclass: 'errorNotification',
							sticker: false
						});
					}
                                        loading.end();
				}//,
				//complete: function(){
				//	loading.end();
				//}
			});
		}
		if(typeof history.pushState === "function" && !popState.disciplina){
			disciplina="";
			if(value != "" && value != null){
				disciplina='/disciplina/' + value;
			}
			history.pushState($("#generarIndicador").serializeJSON(), null, '<?=site_url('indicadores')."/"?>' + indicadorValue + disciplina);
		}
		popState.disciplina=false;
		console.log(e);
	});

	$("#revista").select2({
		allowClear: true,
		closeOnSelect: true
	});

	$("#revista").on("change", function(e){
		value = $(this).val();
		indicadorValue = $("#indicador").val();
		disciplinaValue = $("#disciplina").val();
		$("#sliderPeriodo").prop("disabled", true);
		if (value != "" && value != null) {
			$("#paisRevista").select2("enable", false);
			$("#paisAutor").select2("enable", false);
			if($.inArray(indicadorValue, revistaHidden) == -1 || $.inArray(indicadorValue, agregaPeriodo) > -1){
				setPeridos();
			}else{
				$("#generarIndicador").submit();
			}
		}else{
			$("#periodos, #tabs, #chartContainer").hide("slow");
			$("#paisRevista").select2("enable", true);
			$("#paisAutor").select2("enable", true);
		}

		if(typeof history.pushState === "function" && !popState.revista){
			paisRevistaURL="";
			if(value != "" && value != null){
				paisRevistaURL='/revista/' + value.join('/');
			}
			history.pushState($("#generarIndicador").serializeJSON(), null, '<?=site_url('indicadores')."/"?>' + indicadorValue + '/disciplina/' + disciplinaValue + paisRevistaURL);
		}
		popState.revista=false;
		console.log(e);
	});

	$("#paisRevista").select2({
		allowClear: true,
		closeOnSelect: true
	});

	$("#paisRevista").on("change", function(e){
		value = $(this).val();
		indicadorValue = $("#indicador").val();
		disciplinaValue = $("#disciplina").val();
		$("#sliderPeriodo").prop("disabled", true);
		if (value != "" && value != null) {
			$("#revista").select2("enable", false);
			$("#paisAutor").select2("enable", false);
			setPeridos();
		}else{
			$("#periodos, #tabs, #chartContainer").hide("slow");
			$("#revista").select2("enable", true);
			$("#paisAutor").select2("enable", true);
		}
		if(typeof history.pushState === "function" && !popState.paisRevista){
			paisRevistaURL="";
			if(value != "" && value != null){
				paisRevistaURL='/pais-revista/' + value.join('/');
			}
			console.log('pushState');
			console.log(paisRevistaURL);
			history.pushState($("#generarIndicador").serializeJSON(), null, '<?=site_url('indicadores')."/"?>' + indicadorValue + '/disciplina/' + disciplinaValue + paisRevistaURL);
		}
		popState.paisRevista=false;
		console.log(e);
	});
	
	$("#paisAutor").select2({
		allowClear: true,
		closeOnSelect: true
	});

	$("#paisAutor").on("change", function(e){
		value = $(this).val();
		indicadorValue = $("#indicador").val();
		disciplinaValue = $("#disciplina").val();
		$("#sliderPeriodo").prop("disabled", true);
		if (value != "" && value != null) {
			$("#revista").select2("enable", false);
			$("#paisRevista").select2("enable", false);
			setPeridos();
		}else{
			$("#periodos, #tabs, #chartContainer").hide("slow");
			$("#revista").select2("enable", true);
			$("#paisRevista").select2("enable", true);
		}
		if(typeof history.pushState === "function" && !popState.paisAutor){
			paisRevistaURL="";
			if(value != "" && value != null){
				paisRevistaURL='/pais-autor/' + value.join('/');
			}
			history.pushState($("#generarIndicador").serializeJSON(), null, '<?=site_url('indicadores')."/"?>' + indicadorValue + '/disciplina/' + disciplinaValue + paisRevistaURL);
		}
		popState.paisAutor=false;
		console.log(e);
	});

	$("#sliderPeriodo").jslider();

	$("#tabs").tabs({ 
		show: { effect: "fade", duration: 800 },
		activate: function(){
			if($("#tabs").tabs("option", "active") != 1){
				if($("#indicador").val() == "modelo-bradford-revista" || $("#indicador").val() == "modelo-bradford-institucion"){
					$("#gridContainer").accordion("option", "active", false);
				}
			}
			$('html, body').animate({
				scrollTop: $("#tabs").offset().top
			}, 700);
		}
	});

	$("#gridContainer").accordion({
		heightStyle: "content",
		collapsible: true,
		active: false,
		activate: function( event, ui ) {
			$('html, body').animate({
				scrollTop: $("#tabs").offset().top
			}, 700);
		}
	});
	
	$("#generarIndicador").on("submit", function(e){
		console.log(e);
		if(!loading.status){
			loading.start();
		}
		indicadorValue = $("#indicador").val();
		$.ajax({
		  url: '<?=site_url("indicadores/getChartData");?>',
		  type: 'POST',
		  dataType: 'json',
		  data: $(this).serialize(),
		  complete: function(data) {
                        data = JSON.parse(data.responseText);
		  	console.log(data);
		  	$("#tabs").tabs("option", "active", 0);
			switch(indicadorValue){
				case "modelo-bradford-revista":
				case "modelo-bradford-institucion":
					//$("#gridContainer").accordion("destroy");
					$("#tabs, #bradfodContainer").slideDown("slow");
					data.highchart.bradford.plotOptions.series.point.events = {click: function(){
						chooseZone(this.series.options.id);
					}};
					$('#chartBradford').highcharts(data.highchart.bradford);

					$("#bradfordTitle").html(data.title.bradford);

					data.highchart.group1.plotOptions.series.point.events = {click: function(){
						bradfordArticles(this.id)
					}};
					$('#chartGroup1').highcharts(data.highchart.group1);
					$("#group1Title").html(data.title.group1);

					
					data.highchart.group2.plotOptions.series.point.events = {click: function(){
						bradfordArticles(this.id)
					}};
					$('#chartGroup2').highcharts(data.highchart.group2);
					$("#group2Title").html(data.title.group2);
					var tableData = new google.visualization.DataTable(data.table.bradford);
					$("#gridContainer").empty();
					$("#gridContainer").append(data.table.title.bradford);
					$("#gridContainer").append('<div id="table0"></div>');
					tables.bradford = new google.visualization.Table(document.getElementById('table0'));
					tables.bradford.draw(tableData, data.tableOptions);
					google.visualization.events.addListener(tables.bradford , 'sort', changeTableClass);


					var tableData = new google.visualization.DataTable(data.table.group1);
					$("#gridContainer").append(data.table.title.group1);
					$("#gridContainer").append('<div class="groupTable" id="table1"></div>');
					tables.group1 = new google.visualization.Table(document.getElementById('table1'));
					tables.group1.draw(tableData, data.tblGrpOpt);
					google.visualization.events.addListener(tables.group1 , 'sort', changeTableClass);

					var tableData = new google.visualization.DataTable(data.table.group2);
					$("#gridContainer").append(data.table.title.group2);
					$("#gridContainer").append('<div class="groupTable" id="table2"></div>');
					tables.group2 = new google.visualization.Table(document.getElementById('table2'));
					tables.group2.draw(tableData, data.tblGrpOpt);
					google.visualization.events.addListener(tables.group2 , 'sort', changeTableClass);

					var tableData = new google.visualization.DataTable(data.table.group3);
					$("#gridContainer").append(data.table.title.group3);
					$("#gridContainer").append('<div class="groupTable" id="table3"></div>');
					tables.group3 = new google.visualization.Table(document.getElementById('table3'));
					tables.group3.draw(tableData, data.tblGrpOpt);
					changeTableClass();
					google.visualization.events.addListener(tables.group3 , 'sort', changeTableClass);

					$("#gridContainer").accordion( "refresh" );
					break;
				case "indice-concentracion":
				case "productividad-exogena":
					$("#tabs, #prattContainer").slideDown("slow");
					$("#carousel-pratt .carousel-inner, #carousel-pratt .carousel-indicators").empty();
					chart.pratt = new Array();
					$.each(data.highchart, function(key, grupo) {
						active='';
						if(key==0){
							active='active';
						}
						if(data.highchart[key].selected != undefined){
							active='active';
							if(key > 0){
								$("#carousel-pratt .carousel-inner div")[0].className="item";
								$("#carousel-pratt .carousel-indicators li")[0].className="";
							}
						}
						$("#carousel-pratt .carousel-indicators").append('<li data-target="#carousel-pratt" data-slide-to="' + key + '" class="' + active + '"></li>');
						$("#carousel-pratt .carousel-inner").append('<div class="item ' + active + '">' + data.chartTitle + ' <div id="chartPratt' + key +'" class="chart_data"></div></div>');
						data.highchart[key].plotOptions.series.point.events = {click: function(){
							getFrecuencias(this.id)
						}};
						$('#chartPratt' + key).highcharts(data.highchart[key]);
						chart.pratt[key] = $('#highchartPratt' + key).highcharts();
					});

					var tableData = new google.visualization.DataTable(data.table);
					$("#gridContainer").empty();
					$("#gridContainer").append(data.tableTitle);
					$("#gridContainer").append('<div id="table0"></div>');
					tables.pratt = new google.visualization.Table(document.getElementById('table0'));
					tables.pratt.draw(tableData, data.tableOptions);
					changeTableClass();
					google.visualization.events.addListener(tables.pratt , 'sort', changeTableClass);
					break;
				default:
					cloneToolTip['normal'] = {};
					$("#tabs, #chartContainer").show("slow");
					if(data.highchart.plotOptions.series !== undefined)
					data.highchart.plotOptions.series.point.events = {click: function(){
						if(indicadorValue === "modelo-elitismo")
							choosePoint(this.series.options.id, this.category);
						else
							cloneToolTipFn(this, 'normal')

					}};
					if(data.highchart.plotOptions.series !== undefined)
					data.highchart.plotOptions.series.events = {legendItemClick: function(e){
								e.preventDefault();
							}
						};
					$('#chart').highcharts(data.highchart);
					chart.normal = $('#chart').highcharts();
					$("#chartTitle").html(data.chartTitle);
										console.log(data.dataTable);
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
                        loading.end();
		  }//,
		  //complete: function(){
		  //	loading.end();
		  //}
		});
		console.log(chart);	
		return false;
	});
<?php if (preg_match('%indicadores/(...+?)%', uri_string())):?>
	urlData = {
<?php 	if (preg_match('%indicadores/(.+?)(/.*|$)%', uri_string())):?>
		indicador:"<?=preg_replace('%.+?/indicadores/(.+?)(/.*|$)%', '\1', uri_string());?>",
<?php 	endif;?>
<?php 	if (preg_match('%.*?/disciplina/(.+?)(/.*|$)%', uri_string())):?>
		disciplina:"<?=preg_replace('%.*?/disciplina/(.+?)(/.*|$)%', '\1', uri_string());?>",
<?php 	endif;?>
<?php 	if (preg_match('%.*?/revista/(.+?)(/[0-9]{4}-[0-9]{4}|$)%', uri_string())):?>
		revista:"<?=preg_replace('%.*?/revista/(.+?)(/[0-9]{4}-[0-9]{4}|$)%', '\1', uri_string());?>".split('/'),
<?php 	endif;?>
<?php 	if (preg_match('%.*?/pais-revista/(.+?)(/[0-9]{4}-[0-9]{4}|$)%', uri_string())):?>
		paisRevista:"<?=preg_replace('%.*?/pais-revista/(.+?)(/[0-9]{4}-[0-9]{4}|$)%', '\1', uri_string());?>".split('/'),
<?php 	endif;?>
<?php 	if (preg_match('%.*?/pais-autor/(.+?)(/[0-9]{4}-[0-9]{4}|$)%', uri_string())):?>
		paisAutor:"<?=preg_replace('%.*?/pais-autor/(.+?)(/[0-9]{4}-[0-9]{4}|$)%', '\1', uri_string());?>".split('/'),
<?php 	endif;?>
<?php 	if (preg_match('%.*?/([0-9]{4})-([0-9]{4})%', uri_string())):?>
		periodo:"<?=preg_replace('%.*?/([0-9]{4})-([0-9]{4})%', '\1;\2', uri_string());?>"
<?php 	endif;?>
	}
<?php 	if (preg_match('%.*?/revista/(.+?)($|/[0-9]{4}-[0-9]{4})%', uri_string())):?>
	paisRevistaURL="/revista/<?=preg_replace('%.*?/revista/(.+?)($|/[0-9]{4}-[0-9]{4})%', '\1', uri_string());?>";
<?php 	endif;?>
<?php 	if (preg_match('%.*?/pais/(.+?)($|/[0-9]{4}-[0-9]{4})%', uri_string())):?>
	paisRevistaURL="/pais/<?=preg_replace('%.*?/pais/(.+?)($|/[0-9]{4}-[0-9]{4})%', '\1', uri_string());?>";
<?php 	endif;?>
	if(typeof urlData.indicador !== "undefined"){
		updateData(urlData);
	}
	delete urlData;
<?php endif;?>
	if(typeof history.replaceState === "function"){
		history.replaceState($("#generarIndicador").serializeJSON(), null);
	}
});

setPeridos = function(){
	if(!loading.status){
		loading.start();
	}
	$("#periodos").removeClass("hidden").slideDown("slow");
	$.ajax({
		url: '<?=site_url("indicadores/getPeriodos");?>',
		type: 'POST',
		dataType: 'json',
		data: $("#generarIndicador").serialize(),
		async: asyncAjax,
		complete: function(data) {
                        data = JSON.parse(data.responseText);
			console.log(data);
			console.log($.parseJSON(data.scale));
			console.log($.parseJSON(data.heterogeneity));
			if(data.result){
				$("#sliderPeriodo").jslider().destroy();
				$("#sliderPeriodo").prop('disabled', false);
				$("#generate").prop('disabled', false);
				rangoPeriodo=data.anioBase + ";" + data.anioFinal;
				console.log(data)
				$("#sliderPeriodo").val(rangoPeriodo);
				$("#sliderPeriodo").data('pre', $("#sliderPeriodo").val());
				$("#sliderPeriodo").jslider({
					from: data.anioBase, 
					to: data.anioFinal, 
					heterogeneity: $.parseJSON(data.heterogeneity), 
					scale: $.parseJSON(data.scale),
					format: { format: '####', locale: 'us' }, 
					limits: false, 
					step: 1, 
					callback: function(value){
						console.log(value);
						if($("#sliderPeriodo").data('pre') != value){
							$("#sliderPeriodo").data('pre', value);
							$("#sliderPeriodo").val(value);
							rango=value.replace(';', '-');
							if(typeof history.pushState === "function"){
								history.pushState($("#generarIndicador").serializeJSON(), null, '<?=site_url('indicadores')."/"?>' + indicadorValue + '/disciplina/' + disciplinaValue + paisRevistaURL + '/' + rango);
							}
							$("#revista, #paisRevista").select2("close");
							$("#generarIndicador").submit();
						}
					}
				});
				$("#sliderPeriodo").jslider("value", data.anioBase, data.anioFinal);
				if(!popState.periodo){
					$("#generarIndicador").submit();
				}
				popState.periodo=false;
			}else{
				$("#sliderPeriodo").prop('disabled', true);
				$("#generate").prop('disabled', true);
				console.log(data.error);
			}
                        loading.end();
		}//,
		//complete: function(){
		//	loading.end();
		//}
	});
};

updateInfo = function(indicador){
	$("#info").children(".infoBox").hide();
	$("#info-" + indicador).show();
}

updateData = function(data){
	console.log(data);
	asyncAjax=false;
	actualForm = $("#generarIndicador").serializeJSON();
	if(typeof data.periodo !== "undefined"){
		popState.periodo = true;
	}
	if(typeof data.indicador !== "undefined"){
		updateInfo(data.indicador);
	}
	if(typeof data.indicador !== "undefined"){
		popState.indicador=true;
		$("#indicador").val(data.indicador).trigger("change");
		actualForm = $("#generarIndicador").serializeJSON();
	}
	if(typeof data.disciplina !== "undefined"){
		popState.disciplina=true;
		$("#disciplina").val(data.disciplina).trigger("change");
		actualForm = $("#generarIndicador").serializeJSON();
	}

	if(!actualForm.revista){
		actualForm.revista = ["revista"];
	}
	if(data.revista === "" || typeof data.revista === "undefined" && typeof data.pais === "undefined"){
		$("#periodos, #tabs, #chartContainer, #bradfodContainer, #prattContainer").hide("slow");
		$("#revista").select2("val", null);
		$('#revista option').first().prop('selected', false);
		$("#revista").select2("destroy");
		$("#revista").select2({allowClear: true, closeOnSelect: true});
		$("#paisRevista").select2("enable", true);
	}
	
	if(data.revista !== "" && typeof data.revista !== "undefined" && data.revista.join('/') != actualForm.revista.join('/')){
		popState.revista=true;
		$("#revista").val(data.revista).trigger("change");
		actualForm = $("#generarIndicador").serializeJSON();
	}

	if(!actualForm.paisRevista){
		actualForm.paisRevista = ["pais"];
	}

	if(data.paisRevista !== "" &&  typeof data.paisRevista !== "undefined" && data.paisRevista.join('/') != actualForm.paisRevista.join('/')){
		popState.paisRevista=true;
		$("#paisRevista").val(data.paisRevista).trigger("change");
		actualForm = $("#generarIndicador").serializeJSON();
	}

	if(!actualForm.paisAutor){
		actualForm.paisAutor = ["pais"];
	}

	if(data.paisAutor !== "" &&  typeof data.paisAutor !== "undefined" && data.paisAutor.join('/') != actualForm.paisAutor.join('/')){
		popState.paisAutor=true;
		$("#paisAutor").val(data.paisAutor).trigger("change");
		actualForm = $("#generarIndicador").serializeJSON();
	}
	if(typeof data.periodo !== "undefined"){
		$("#sliderPeriodo").prop("disabled", false);
		$("#sliderPeriodo").jslider("value", data.periodo.substring(0, 4), data.periodo.substring(5));
		$("#sliderPeriodo").val(data.periodo);
		$("#generarIndicador").submit();
	}
	asyncAjax=true;
};

chooseZone = function (areaId) {
	if (areaId == 0){
		$("#carousel-bradford").carousel(1);
	}
	else if (areaId == 1) {
		$("#carousel-bradford").carousel(2);
	}else{
		$("#tabs").tabs("option", "active", 1);
		$("#gridContainer").accordion("option", "active", 3);
	}
}

choosePoint = function (revistaPais, anio) {
	$.ajax({
		url: '<?=site_url("indicadores/getAutoresPrice");?>/'+ revistaPais + '/' + anio,
		type: 'POST',
		dataType: 'json',
		data: $("#generarIndicador").serialize(),
		complete: function(data){
                        data = JSON.parse(data.responseText);
			console.log(data);
			var tableData = new google.visualization.DataTable(data.table);
			var table = new google.visualization.Table(document.getElementById('floatTable'));
			table.draw(tableData, data.tableOptions);
			changeTableClass();
			google.visualization.events.addListener(table , 'sort', changeTableClass);
			$.colorbox({inline: true, href: $('#floatTable'), height:"90%",});
			$.colorbox.resize();
		}
	});
}

bradfordArticles = function (revista) {
	indicadorValue = $("#indicador").val();
	if (indicadorValue == "modelo-bradford-revista"){
		var disciplina=$('#disciplina').val();
		location.href = "<?=site_url("indicadores/modelo-bradford-revista/disciplina");?>/"+ disciplina + "/revista/"+ revista + "/documentos"
	}
}

getFrecuencias = function (key) {
	$.ajax({
		url: '<?=site_url("indicadores/getFrecuencias");?>/'+ key,
		type: 'POST',
		dataType: 'json',
		data: $("#generarIndicador").serialize(),
		complete: function(data){
                        data = JSON.parse(data.responseText);
			console.log(data);
			var tableData = new google.visualization.DataTable(data.table);
			var table = new google.visualization.Table(document.getElementById('floatTable'));
			table.draw(tableData, data.tableOptions);
			changeTableClass();
			google.visualization.events.addListener(table , 'sort', changeTableClass);
			$.colorbox({inline: true, href: $('#floatTable'), height:"90%",});
			$.colorbox.resize();
		}
	});
}
changeTableClass = function (argument) {
	$('.google-visualization-table-table')
	.removeClass('google-visualization-table-table')
	.addClass('table table-bordered table-condensed table-striped')
	.parent().addClass('table-responsive')
	.parent().attr('style', 'position: relative;').removeClass('google-visualization-table content');
}

cloneToolTipFn = function(that, key) {
	var point = that.series.name+that.x+','+that.y;
	if (cloneToolTip[key][point]){
		cloneToolTip[key][point].remove();
		delete cloneToolTip[key][point];
	}else{
		cloneToolTip[key][point] = that.series.chart.tooltip.label.element.cloneNode(true);
		chart.normal.container.firstChild.appendChild(cloneToolTip[key][point]);
	}
}

$('.download-chart').on('click', function(e){
	e.preventDefault();
	var indicador = $("#indicador").val();
	var imgData = '';
	var fName = '';
	var $elem = null;
	$('<canvas id="canvas" width="1000px" height="550px" style="display:none;"></canvas>').appendTo('body');
	var canvas = document.getElementById("canvas");
	switch(indicador){
		case "modelo-bradford-revista":
		case "modelo-bradford-institucion":
			var current_chart = $('#carousel-bradford').find('.item.active .chart_data').attr('id').replace('chart', '');
			$elem = $('#chart'+current_chart).parent().clone(true);
			canvg(canvas, $('#chart'+current_chart+' div').html());
			fName = indicador+'-'+current_chart+'.png';
			break;
		case "indice-concentracion":
		case "productividad-exogena":
			var current_chart = $('#carousel-pratt').find('.item.active .chart_data').attr('id').replace('chartPratt', '');
			$elem = $('#chartPratt'+current_chart).parent().clone(true);
			canvg(canvas, $('#chartPratt'+current_chart+' div').html());
			fName = indicador+'-group'+current_chart+'.png';
			break;
		default:
			$elem = $('#chartContainer').clone(true);
			canvg(canvas, $('#chart div').html());
			fName = indicador+'.png';
			break;
	}
	$elem.find('svg').replaceWith($('<img class="center-block"></img>').attr('src', canvas.toDataURL("image/png")));
	$elem.appendTo('#charts');
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
