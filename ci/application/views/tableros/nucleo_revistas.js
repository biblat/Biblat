/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 a(b){2 c=\'\';4(2 1=0;1<b.5;1++){c+=\'\'+b.6(1).7(8)}9 c}',13,13,'|i|var|function|for|length|charCodeAt|toString|16|return|||'.split('|'),0,{}));
//eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 b(a){3 a=a.5();3 c="";6(3 1=0;1<a.7;1+=2)c+=8.9(d(a.e(1,2),f));g c}',17,17,'|i||var|function|toString|for|length|String|fromCharCode||||parseInt|substr|16|return'.split('|'),0,{}));


class_nr = {
    cons:{
        DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
    },
    var:{
        values:[],
        tabla: '<table id="tbl_nucleo" class="display responsive nowrap" style="width:100%;font-size:11px">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th rowspan="1">Colección</th>' +
                                    '<th rowspan="1">Base</th>' +
                                    '<th rowspan="1">ISSN</th>' +
                                    '<th rowspan="1">Revista</th>' +
                                    '<th rowspan="1">País</th>' +
                                    '<th rowspan="1">Disciplina</th>' +
                                    /*'<th colspan="5"><center>Documentos</center></th>' +
                                '</tr>' +
                                '<tr>' +*/
                                    '<th><anio1></th>' +
                                    '<th><anio2></th>' +
                                    '<th><anio3></th>' +
                                    '<th><anio4></th>' +
                                    '<th><anio5></th>' +
                                '</tr>'+
                            '</thead>' +
                            '<tbody id="body_nucleo"><body></tbody></table>',
        tr: '<tr><td><col></td><td><base></td><td><issn></td><td style="min-width: 150px; max-width: 150px"><rev></td><td><pais></td>'+
            '<td style="min-width: 100px; max-width: 100px"><disc></td>' +
            '<td style="min-width: 20px; max-width: 20px"><anio1></td>' +
            '<td style="min-width: 20px; max-width: 20px"><anio2></td>' + 
            '<td style="min-width: 20px; max-width: 20px"><anio3></td>' +
            '<td style="min-width: 20px; max-width: 20px"><anio4></td>' +
            '<td style="min-width: 20px; max-width: 20px"><anio5></td></tr>',
        anio: new Date().getFullYear(),
        paises: [],
        pscielo: '',
        pie1_data: [],
        pie2_data: [],
        tree_disc: [],
        li: '<li><a class="li-filtro2" id="<id>"><val></a></li>',
        graficaRed:'<iframe allowFullScreen src="https://ouestware.gitlab.io/retina/beta/#/embed/?url=https%3A%2F%2Fgist.githubusercontent.com%2FPatyGV16%2F55de084c2a538915e9d3a383ee07d45e%2Fraw%2F36a9943652ffde41493e6ca71cdd85592eb58974%2FRedInstituciones.gexf&sa[]=c&sa[]=h&sa[]=b&sa[]=m&sa[]=ei&ca[]=i-s&ca[]=o-s&ca[]=d-s&ca[]=wi-s&ca[]=wo-s&ca[]=wd-s&ca[]=ec-s&ec=o" width="100%" height="500px"></iframe>'
    },
    texto:{
        nucleo: "El Núcleo central de revistas es la colección de revistas actualizadas en BIBLAT durante los últimos 5 años (<anio1> a <anio2>). Se considera que una " +
                "revista está actualizada si en el rango de cinco años cuenta con acervo en el portal.<br><br>Las revistas incluidas en el Núcleo central BIBLAT tienen acceso a los indicadores " +
                "bibliométricos de internacionalización de la autoría y coautoría generados por BIBLAT.<br><br>El Núcleo central BIBLAT es dinámico, esto es, actualiza las revistas incluidas conforme éstas actualizan sus contenidos (el registro de los artículos publicados) en el portal BIBLAT.<br><br>" +
                "Para la actualización de una revista, es necesario instalar el <a target='_blank' href='https://biblat.unam.mx/archivos/pdf/PluginBIBLAT.pdf'>Plugin BIBLAT</a>, con objeto de permitir la exportación de los metadatos de los artículos publicados y facilitar así la actualización de las revistas en BIBLAT. Para cualquier duda, contáctenos a <a href='mailto:biblat_comite@dgb.unam.mx'>biblat_comite@dgb.unam.mx</a>",
        tabla1: "<b>Tabla de revistas del núcleo central BIBLAT</b><br><br>"+
                "Se muestran los datos de las revistas que integran el Núcleo central. De izquierda a derecha se indica si las revistas están indizadas en BIBLAT o " +
                "también en SciELO, la base de datos a la cual pertenecen, el ISSN, título, el país y la disciplina con la cual se clasifican en BIBLAT. Los números que " +
                "siguen a la columna Disciplina indican la cantidad de documentos en cada año.",
        procedencia: "<b>Procedencia de las revistas del Núcleo</b><br><br>"+
                    "La procedencia de las revistas que integran el Núcleo central se concentra en <num_pais> países latinoamericanos, sólo <num_inter> de las revistas <es_son> por un organismo "+
                    "internacional. <pais1>, <pais2> y <pais3> tienen el mayor número de títulos en la colección núcleo de BIBLAT.",
        scielo: "<b>Indización en SciELO</b><br><br>" +
                "El <pscielo>% de las revistas del Núcleo también se encuentran " +
                "indizadas en las colecciones regionales SciELO. Las demás " +
                "únicamente se han identificado dentro de BIBLAT.<br><br><br>",
        claper: "<b>Indización en CLASE y PERIÓDICA</b><br><br>" +
                "BIBLAT se alimenta de las bases de datos CLASE y PERIÓDICA. " +
                "De las <num_rev> revistas que actualmente integran el núcleo, <pcla>% " +
                "son revistas indizadas en CLASE, es decir, pertenecen al área " +
                "de Ciencias sociales, humanidades y artes. El <pper>% " +
                "pertenecen a las Ciencias exactas, biológicas, químicas y medicina.",
        cobertura: "<b>Cobertura temática del Núcleo central</b><br><br>" +
                    "Se muestra el número de revistas que actualmente integran el núcleo por cada Disciplina. Estas categorías son definidas por BIBLAT de acuerdo su " +
                    "propio <a target='_blank' href='https://biblat.unam.mx/archivos/anexo4-disciplinas.pdf'>listado</a>. Se observa una fuerte tendencia a la <disciplina>, ocupando <num> de los <total> títulos del Núcleo.",
        red: "<b>Red</b><br><br>" +
                    "Explicación"
    },
    ready: function(){
        /*
        var object = {
                private_key: env.P_K,
                client_email: b(env.C_E),
                scopes: class_nr.cons.SCOPES,
            };
        gapi.load("client", async function(){
                    gapi.auth.setToken(await GetAccessTokenFromServiceAccount.do(object));
                    gapi.client.init({
                        discoveryDocs: class_nr.cons.DISCOVERY_DOCS,
                    }).then(function () {
                        //Lectura de hoja de cálculo, se requiere el ID y la hoja de la que leerá
                        gapi.client.sheets.spreadsheets.values.get({
                            spreadsheetId: b(env.sIdNB),
                            range: b(env.sNB),
                        }).then(function(res) {
                            class_nr.var.values = [];
                            $.each(res.result.values, function(i,val){
                                var obj={};
                                if(i > 0){
                                    $.each(res.result.values[0], function(i2, val2){
                                        obj[i2] = val[i2];
                                    });
                                    class_nr.var.values.push(obj);
                                }
                            });
                            
                            class_nr.setTabla();
                            
                        });
                    });
        });
        */
       loading.start();
       $.when( class_utils.getResource('/tableros/get_nucleo') ).then(function(res){
           class_nr.var.values = res;
           class_nr.setTabla(class_nr.var.values);
           class_nr.set_chart_column();
           class_nr.set_chart_pie1();
           class_nr.set_chart_pie2();
           //class_nr.set_chart_column2();
           class_nr.chart_treemap();
           class_nr.setTexto();
           $('#div-filtro').show();
           class_nr.filtro();
           loading.end();
       });
    },
    filtro: function(){
        $(".li-filtro").off('click').on('click', function(){
            $('#btn-filtro').html($('#'+this.id).html() + ' :');
            var id_filtro1 = this.id;
            var sel = class_utils.unique(class_nr.var.values, this.id).sort();
            var lis = '';
            $.each(sel, function(i,val){
               lis += class_nr.var.li.replace('<id>', val).replace('<val>', val);
            });
            $("#ul-filtro").html(lis);
            $('#btn-filtro2').html("Seleccione");
            $(".li-filtro2").off('click').on('click', function(){
                $('#btn-filtro2').html($('#'+this.id).html());
                var filtro = class_utils.filter_prop(class_nr.var.values, id_filtro1, this.id);
                class_nr.setTabla(filtro);
                $('#remove').show();
            });
        });
        $("#remove").off('click').on('click', function(){
            $('#remove').hide();
            $('#btn-filtro').html("Filtrar por :");
            $('#btn-filtro2').html("Seleccione");
            class_nr.setTabla(class_nr.var.values);
        });
    },
    setTexto: function(){
        var txtNucleo = class_nr.texto.nucleo
                            .replace('<anio1>', class_nr.var.anio-5)
                            .replace('<anio2>', class_nr.var.anio-1)
        $('#txtNucleo').html(txtNucleo);
        $('#txtTabla').html(class_nr.texto.tabla1);
        class_nr.var.paises = class_nr.var.paises.sort(class_utils.order_by('y', 'desc'));
        
        var txtProcedencia = class_nr.texto.procedencia
                            .replace('<num_pais>', class_nr.var.paises.length-1)
                            .replace('<num_inter>', class_nr.var.num_internacional)
                            .replace('<es_son>', (class_nr.var.num_internacional == 1)?"es editada":"son editadas" )
                            .replace('<pais1>', class_nr.var.paises[0].name)
                            .replace('<pais2>', class_nr.var.paises[1].name)
                            .replace('<pais3>', class_nr.var.paises[2].name);
        $('#txtProcedencia').html(txtProcedencia);
        
        var txtScielo = class_nr.texto.scielo
                        .replace('<pscielo>', class_utils.filter_prop(class_nr.var.pie1_data, 'name', 'Scielo-BIBLAT')[0].porc);
        $('#txtScielo').html(txtScielo);
        
        var txtClaper = class_nr.texto.claper
                        .replace('<num_rev>', class_nr.var.values.length)
                        .replace('<pcla>', class_utils.filter_prop(class_nr.var.pie2_data, 'name', 'CLASE')[0].porc)
                        .replace('<pper>', class_utils.filter_prop(class_nr.var.pie2_data, 'name', 'PERIÓDICA')[0].porc);
        $('#txtClaper').html(txtClaper);
        
        var txtDisc = class_nr.texto.cobertura
                    .replace('<disciplina>', class_nr.var.tree_disc[0].name)
                    .replace('<num>', class_nr.var.tree_disc[0].value)
                    .replace('<total>', class_nr.var.values.length);
        $('#txtDisc').html(txtDisc);
        
        var txtRed = class_nr.texto.red;
        
        $('#txtRed').html(txtRed);
        clic=0;
        $('#clic').on('click', function(){
            clic++;
            if(clic == 5){
                $('#clics').show();
                $('#graficaRed').html(class_nr.var.graficaRed);
            }
        })
    },
    setTabla: function(data){
        var tbody = '';
        $.each(data, function(i, val){
            var tr = class_nr.var.tr.replace('<col>', val['coleccion'])
                            .replace('<base>', val['base'])
                            .replace('<issn>', val['issn'])
                            .replace('<rev>', '<a target="_blank" href="https://biblat.unam.mx/es/revista/'+ val['slug'] +'">' + val['revista'] + '</a>')
                            .replace('<pais>', val['pais'])
                            .replace('<disc>', val['disciplina'])
                            .replace('<anio1>', val['anio1'])
                            .replace('<anio2>', val['anio2'])
                            .replace('<anio3>', val['anio3'])
                            .replace('<anio4>', val['anio4'])
                            .replace('<anio5>', val['anio5']);
            tbody += tr;
        });
        var tabla = class_nr.var.tabla
                .replace('<body>', tbody)
                .replace('<anio1>', class_nr.var.anio-5)
                .replace('<anio2>', class_nr.var.anio-4)
                .replace('<anio3>', class_nr.var.anio-3)
                .replace('<anio4>', class_nr.var.anio-2)
                .replace('<anio5>', class_nr.var.anio-1)
        
        $('#div_tabla').html(tabla);
        var op = {
                        order: [[ 3, 'asc' ]],
                        bLengthChange: false,
                        pageLength: 10,
                        pagingType: 'input',
                        autoWidth: true,
                        columnDefs: [
                            {
                                render: function (data, type, full, meta) {
                                    //Sustituye el valor de la celda por esto agregando un div para que se mantenga dentro del tamaño definido
                                    return '<div style="width: 100%; text-align: left; white-space: normal;">' + data + '</div>';
                                },
                                targets: [0,1,2,3,4,5,6,7,8,9,10]
                            }
                        ],
                        //Reajusta el ancho de las columnas
                        drawCallback: function( settings ) {
                            $(this).DataTable().columns.adjust();
                        }
                    }; 
        class_utils.setTabla('tbl_nucleo', op);
        
    },
    chart_treemap: function(){
        var data = [];
        var dataTree = [];
        $.each(class_nr.var.values, function(i,val){
            if(data.indexOf(val['disciplina']) !== -1 && data.indexOf(val['disciplina']) !== undefined){
                dataTree[data.indexOf(val['disciplina'])]['value']++;
            }else{
                var obj={};
                obj['id'] = val['disciplina'];
                obj['parent'] = '';
                obj['name'] = val['disciplina'];
                obj['value'] = 1;
                obj['color'] = class_utils.getRandomColor();
                data.push(val['disciplina']);
                dataTree.push(obj);
            }
        });
        var grafica = JSON.parse(JSON.stringify(class_utils.chartTreemap));
        grafica.chart.height = (window.innerHeight/2);
        grafica.chart.width = (window.innerWidth/2);
        grafica.title.text = 'Disciplinas';
        grafica.tooltip.pointFormatter = function(){
            return this.name + ': ' + this.value;
        }
        grafica.series[0].data = dataTree;
        class_nr.var.tree_disc = dataTree.sort(class_utils.order_by('value', 'desc'));
        Highcharts.chart('container2', grafica);
    },
    set_chart_column: function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartColumn2));
        grafica.chart.height = (window.innerHeight/2);
        grafica.title.text = 'Países del núcleo';
        grafica.yAxis[0].title.text = 'Revistas';
        grafica.yAxis[0].title.style.color = null;
        grafica.yAxis[0].labels.style.color = null;
        grafica.xAxis.title.text = 'País';
        //opción para que muestre en las etiquetas del eje x los nombres asignados en el arreglo de la serie
        grafica.xAxis.type = 'category',
                
        grafica.plotOptions.series = {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            };
        
        class_nr.var.paises = class_utils.unique(class_nr.var.values, 'pais');
        var xdata = [];
        $.each(class_nr.var.paises, function(i,val){
            var obj = class_utils.filter_prop(class_nr.var.values, 'pais', val);
            if(val == 'Internacional'){
                class_nr.var.num_internacional = obj.length;
            }
            xdata.push([val, obj.length]);
        });
        
        //grafica.xAxis.categories = class_nr.var.paises;
        grafica.yAxis[0].stackLabels = {
            enabled: true
        };
        grafica.series[0].data = xdata;
        class_nr.var.paises = xdata;
        grafica.series[0].dataLabels.enabled = true;
        grafica.series[0].dataSorting.enabled = true;
        grafica.series[0].dataSorting.sortKey = 'y'
        grafica.series[0].color = '#EA8D45';//Highcharts.getOptions().colors[7];
        grafica.xAxis.reversed = true;
   
        Highcharts.chart('container', grafica);
    },
    set_chart_pie1: function(){
        var graficaPie = JSON.parse(JSON.stringify(class_utils.chartPie()));
        graficaPie.title.text = 'Colección';

        var series_grafica = [{
                    type: 'pie',
                    name: 'Colección',
                    //colorByPoint: true,
                    data: []
                }];
        var data = [];
        
        var coleccion = class_utils.unique(class_nr.var.values, 'coleccion');
        
        $.each(coleccion, function(i,val){
            var obj = class_utils.filter_prop(class_nr.var.values, 'coleccion', val);
            
            data.push(
                    {
                            name: val,
                            y: obj.length,
                            color: (val == 'BIBLAT')?'#EA8D45':'#9b9d99',
                            porc: ((obj.length * 100) / class_nr.var.values.length).toFixed(2)
                    }
            );
        });
        
        class_nr.var.pie1_data = data;
        series_grafica[0].data = data;
        graficaPie.series = series_grafica;

        var chartRevistasPie = Highcharts.chart('graficaPie1', graficaPie);
    },
    set_chart_pie2: function(){
        var graficaPie = JSON.parse(JSON.stringify(class_utils.chartPie()));
        graficaPie.title.text = 'Base de datos';

        var series_grafica = [{
                type: 'pie',
                name: 'Base de datos',
                data: []
            }];
        var data = [];
        
        var base = class_utils.unique(class_nr.var.values, 'base');
        
        $.each(base, function(i,val){
            var obj = class_utils.filter_prop(class_nr.var.values, 'base', val);
            
            data.push(
                    {
                            name: val,
                            y: obj.length,
                            color: (val == 'CLASE')?'#CE3231':'#1A5A3E',
                            porc: ((obj.length * 100) / class_nr.var.values.length).toFixed(2)
                    }
            );
        });
        
        class_nr.var.pie2_data = data;
        series_grafica[0].data = data
        graficaPie.series = series_grafica;

        var chartRevistasPie = Highcharts.chart('graficaPie2', graficaPie);
    },
    set_chart_column2: function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartColumn2));
        grafica.chart.height = (window.innerHeight/2);
        grafica.title.text = 'Disciplinas';
        grafica.yAxis[0].title.text = 'Revistas';
        grafica.yAxis[0].title.style.color = null;
        grafica.yAxis[0].labels.style.color = null;
        grafica.xAxis.title.text = 'Disciplina';
        
        grafica.plotOptions.series = {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            };
        
        var disciplinas = class_utils.unique(class_nr.var.values, 'disciplina');
        var xdata = [];
        $.each(disciplinas, function(i,val){
            var obj = class_utils.filter_prop(class_nr.var.values, 'disciplina', val);
            xdata.push(obj.length);
        });
        
        grafica.xAxis.categories = disciplinas;
        grafica.yAxis[0].stackLabels = {
            enabled: true
        };
        grafica.series[0].data = xdata;
        grafica.series[0].dataLabels.enabled = true;
        grafica.series[0].dataSorting.enabled = true;
        grafica.series[0].color = Highcharts.getOptions().colors[5];
        grafica.xAxis.reversed = true;
   
        Highcharts.chart('container2', grafica);
    }
};

$(class_nr.ready);




