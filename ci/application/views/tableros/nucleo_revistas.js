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
                                    '<th>2018</th>' +
                                    '<th>2019</th>' +
                                    '<th>2020</th>' +
                                    '<th>2021</th>' +
                                    '<th>2022</th>' +
                                '</tr>'+
                            '</thead>' +
                            '<tbody id="body_nucleo"><body></tbody></table>',
        tr: '<tr><td><col></td><td><base></td><td><issn></td><td style="min-width: 150px; max-width: 150px"><rev></td><td><pais></td>'+
            '<td style="min-width: 100px; max-width: 100px"><disc></td>' +
            '<td style="min-width: 20px; max-width: 20px"><2018></td>' +
            '<td style="min-width: 20px; max-width: 20px"><2019></td>' + 
            '<td style="min-width: 20px; max-width: 20px"><2020></td>' +
            '<td style="min-width: 20px; max-width: 20px"><2021></td>' +
            '<td style="min-width: 20px; max-width: 20px"><2022></td></tr>',
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
           class_nr.setTabla();
           class_nr.set_chart_column();
           class_nr.set_chart_pie1();
           class_nr.set_chart_pie2();
           class_nr.set_chart_column2();
           loading.end();
       });
    },
    setTabla: function(){
        var tbody = '';
        $.each(class_nr.var.values, function(i, val){
            var tr = class_nr.var.tr.replace('<col>', val['coleccion'])
                            .replace('<base>', val['base'])
                            .replace('<issn>', val['issn'])
                            .replace('<rev>', val['revista'])
                            .replace('<pais>', val['pais'])
                            .replace('<disc>', val['disciplina'])
                            .replace('<2018>', val['anio1'])
                            .replace('<2019>', val['anio2'])
                            .replace('<2020>', val['anio3'])
                            .replace('<2021>', val['anio4'])
                            .replace('<2022>', val['anio5']);
            tbody += tr;
        });
        var tabla = class_nr.var.tabla.replace('<body>', tbody);
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
    chart_treemap: function(data){
        grafica = JSON.parse(JSON.stringify(class_utils.chartTreemap));
        grafica.chart.height = (window.innerHeight/2);
        grafica.chart.width = (window.innerWidth/2);
        grafica.title.text = 'Procedencia de las consultas';
        grafica.tooltip.pointFormatter = function(){
            return this.name + ': ' + this.value;
        }
        grafica.series[0].data = data;
        Highcharts.chart('container', grafica);
    },
    set_chart_column: function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartColumn2));
        grafica.title.text = 'Países del núcleo';
        grafica.yAxis[0].title.text = 'Revistas';
        grafica.yAxis[0].title.style.color = null;
        grafica.yAxis[0].labels.style.color = null;
        grafica.xAxis.title.text = 'País';
        
        grafica.plotOptions.series = {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            };
        
        var paises = class_utils.unique(class_nr.var.values, 'pais');
        var xdata = [];
        $.each(paises, function(i,val){
            var obj = class_utils.filter_prop(class_nr.var.values, 'pais', val);
            xdata.push(obj.length);
        });
        
        grafica.xAxis.categories = paises;
        grafica.yAxis[0].stackLabels = {
            enabled: true
        };
        grafica.series[0].data = xdata;
        grafica.series[0].dataLabels.enabled = true;
        grafica.series[0].dataSorting.enabled = true;
        grafica.series[0].color = class_utils.getRandomColor();
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
                            color: class_utils.getRandomColorF(0.5)
                    }
            );
        });
        
        series_grafica[0].data = data
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
                            color: class_utils.getRandomColorF(0.5)
                    }
            );
        });
        
        series_grafica[0].data = data
        graficaPie.series = series_grafica;

        var chartRevistasPie = Highcharts.chart('graficaPie2', graficaPie);
    },
    set_chart_column2: function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartColumn2));
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
        grafica.series[0].color = class_utils.getRandomColor();
        grafica.xAxis.reversed = true;
   
        Highcharts.chart('container2', grafica);
    }
};

$(class_nr.ready);




