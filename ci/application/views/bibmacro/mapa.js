var data = [];

var dicc = {'á':'a','é':'e','í':'i','ó':'o','ú':'u',' ':'-'};

var mapa ='';

var body_revista = '';
var tabla_revista = '<table id="revistas" class="display" style="width:100%;font-size:11px"><thead><tr><th width="80%" >Universidades</th><th>Revistas</th></tr></thead><tbody id="bodyRevista"></tbody></table>';
var tr_revista = '<tr><td><rev></td><td><art></td></tr>';

var pais = '';
var pais_revista = 'mexico';//window.location.href.split('/')[window.location.href.split('/').length-1];

var revistas = '';
var disciplinas = '';
var anios = '';

//color-verde #4fb800;
var tabla_datos_revistas= '<span style="font-size:11px"></span><table id="tb_revistas" class="display" style="width:100%;font-size:11px"><thead>'+
'<tr><th style="background-color: #ff800040">Revista</th>'+
'<th style="background-color: #ff800040" class="td_pais">País</th>'+
'<th style="background-color: #ff800040">Ciudad</th>'+
'<th style="background-color: #ff800040" class="td_area">Área de conocimiento</th>'+
'<th style="background-color: #ff800040" class="td_disciplina">Disciplina</th>'+
'<th style="background-color: #ff800040">Naturaleza de la publicación</th>'+
'<th style="background-color: #ff800040" class="td_universidad">Universidad</th>'+
'<th style="background-color: #ff800040">Entidad editora</th>'+
'<th style="background-color: #ff800040">ISSN impreso</th>'+
'<th style="background-color: #ff800040">ISSN electrónico</th>'+
'<th style="background-color: #ff800040">URL de la revista</th>'+
'<th style="background-color: #ff800040">URL del repósitorio</th>'+
'</tr></thead><tbody id="body_datos_revistas"></tbody></table>';

var tr_datos_revistas = '<tr id="tr_<id>"><td class="td_tabla"><span id="<id>" style="cursor:pointer"><titulo></span></td>'+
'<td><pais></td>'+
'<td><ciudad></td>'+
'<td><area_conocimiento></td>'+
'<td><disciplina></td>'+
'<td><naturaleza></td>'+
'<td><universidad></td>'+
'<td><entidad_editora></td>'+
'<td><issn_i></td>'+
'<td><issn_e></td>'+
'<td><url_rev></td>'+
'<td><url_rep></td>'+
'</tr>';

var paises = {    
    'santa-lucia': {'props': {'id': 'lc', 'nombre': 'Santa Lucía'}},
    'islas-virgenes': {'props': {'id': 'vi', 'nombre': 'Islas Vírgenes de los Estados Unidos'}},
    'cuba': {'props': {'id': 'cu', 'nombre': 'Cuba'}},
    'san-cristobal-y-nieves': {'props': {'id': 'kn', 'nombre': 'San Cristobal y Nieves'}},
    'nicaragua': {'props': {'id': 'ni', 'nombre': 'Nicaragua'}},
    'dominica': {'props': {'id': 'dm', 'nombre': 'Dominica'}},
    'antigua-y-barbuda': {'props': {'id': 'ag', 'nombre': 'Antigua y Barbuda'}},
    'trinidad-y-tobago': {'props': {'id': 'tt', 'nombre': 'Trinidad y Tobago'}},
    'isla-serranilla': {'props': {'id': 'sw', 'nombre': 'Isla Serranilla'}},
    'barbados': {'props': {'id': 'bb', 'nombre': 'Barbados'}},
    'jamaica': {'props': {'id': 'jm', 'nombre': 'Jamaica'}},
    'bajo-nuevo': {'props': {'id': 'bu', 'nombre': 'Isla Bajo Nuevo'}},
    'bahamas': {'props': {'id': 'bs', 'nombre': 'Bahamas'}},
    'san-vicente-y-las-granadinas': {'props': {'id': 'vc', 'nombre': 'San Vicente y las Granadinas'}},
    'haiti': {'props': {'id': 'ht', 'nombre': 'Haití'}},
    'el-salvador': {'props': {'id': 'sv', 'nombre': 'El Salvador'}},
    'honduras': {'props': {'id': 'hn', 'nombre': 'Honduras'}},
    'republica-dominicana': {'props': {'id': 'do', 'nombre': 'República Dominicana'}},
    'mexico': {'props': {'id': 'mx', 'nombre': 'México'}},
    'belice': {'props': {'id': 'bz', 'nombre': 'Belice'}},
    'guatemala': {'props': {'id': 'gt', 'nombre': 'Guatemala'}},
    'costa-rica': {'props': {'id': 'cr', 'nombre': 'Costa Rica'}},
    'puerto-rico': {'props': {'id': 'pr', 'nombre': 'Puerto Rico'}},
    'panama': {'props': {'id': 'pa', 'nombre': 'Panamá'}},
    'brasil': {'props': {'id': 'br', 'nombre': 'Brasil'}},
    'ecuador': {'props': {'id': 'ec', 'nombre': 'Ecuador'}},
    'venezuela': {'props': {'id': 've', 'nombre': 'Venezuela'}},
    'chile': {'props': {'id': 'cl', 'nombre': 'Chile'}},
    'argentina': {'props': {'id': 'ar', 'nombre': 'Argentina'}},
    'peru': {'props': {'id': 'pe', 'nombre': 'Perú'}},
    'uruguay': {'props': {'id': 'uy', 'nombre': 'Uruguay'}},
    'paraguay': {'props': {'id': 'py', 'nombre': 'Paraguay'}},
    'bolivia': {'props': {'id': 'bo', 'nombre': 'Bolivia'}},
    'surinam': {'props': {'id': 'sr', 'nombre': 'Surinam'}},
    'guyana': {'props': {'id': 'gy', 'nombre': 'Guyana'}},
    'colombia': {'props': {'id': 'co', 'nombre': 'Colombia'}},
    };
//];

Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});

var chartTreemap = {
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            allowDrillToNode: false,
            animationLimit: 1000,
            dataLabels: {
                enabled: false
            },
            levelIsConstant: false,
            levels: [{
                level: 1,
                dataLabels: {
                    enabled: true
                },
                borderWidth: 3
            }],
            data: [],
        }],
        subtitle: {
            text: ''
        },
        title: {
            text: 'Revistas por disciplina',
            style: {fontSize: '11px', fontWeight: 'bold'}
        },
        plotOptions: {
            treemap: {
                dataLabels: {
//                    formatter:function(){
//                        return '<a target="_blank" style="color:black" href="indice/disciplina/' + this.point.name.toLowerCase().split('').map(letra=>dicc[letra] || letra).join('') + '">' + this.point.name + '</a>'
//                    },
//                    formatter:function(){
//                        fn_search=function(val){
//                            $('#tb_revistas').DataTable().columns(4).search(val+'$', regex=true).draw()
//                        };
//                        op_url = window.location.origin + window.location.pathname + '#tb_revistas';
//                        return '<a href="'+op_url+'" style="color:black" onclick="fn_search(\''+this.point.name+'\')">' + this.point.name + '</a>'
//                    },
                    useHTML: true
                },
                point:{
                    events:{
                        click:function(){
                            //Reset de la búsqueda desde el input
                            $('input[type=search]').val('').change();
                            $('#tb_revistas').DataTable().search('').draw();
                            //Reset de la búsqueda por columna
                            $('#tb_revistas').DataTable().columns().search('').draw();
                            $('#tb_revistas').DataTable().columns(4).search(this.name+'$', regex=true).draw();
                            $('#txt_revistas').html('Revistas clasificadas en la disciplina: "'+this.name+'"');
                            //Reset demás estilos
                            $('.td_area').css('font-size', '11px');
                            $('.td_area').css('background-color', 'rgba(255, 128, 0, 0.25)');
                            $('.td_universidad').css('font-size', '11px');
                            $('.td_universidad').css('background-color', 'rgba(255, 128, 0, 0.25)');
                            $('.td_pais').css('font-size', '11px');
                            $('.td_pais').css('background-color', 'rgba(255, 128, 0, 0.25)');
                            //Estilo para la columna
                            $('.td_disciplina').css('font-size', '13px');
                            $('.td_disciplina').css('font-weight', 'bold');
                            $('.td_disciplina').css('background-color', 'rgb(163, 183, 241)');
                            $('#reset_revistas').show();
                            window.location.href = window.location.origin + window.location.pathname + '#txt_revistas';
                        }
                    }
                },
                cursor: "pointer"
            }
        },
        chart: {
            height: '300px',
            backgroundColor: 'transparent'
        },        
        credits: { enabled: false, href: "https://biblat.unam.mx/es", text: "Fuente: biblat.unam.mx" }
    };
    
var chartColumn = {
    chart: {
//        type: 'column',
        height: '300px',
        backgroundColor: 'transparent'
    },
    title: {
        text: 'Histórico',
        style: {fontSize: '11px', fontWeight: 'bold'}
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [],
        crosshair: true,        
    },
    yAxis: [{ // Primary yAxis
        labels: {
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'No. Documentos acumulados',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        labels: {
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        title: {
            text: 'No. Documentos',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true
    }],
    tooltip: {
        footerFormat: '',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }        
    },
    legend: {
        enabled: false
    },
    series: [{
        type: 'column',
        name: 'En el año',
        data: [],
        dataLabels: {
                enabled: false
            },
        color: Highcharts.getOptions().colors[0],
        yAxis: 1
        },        
        {
        type: 'spline',
        name: 'Acumulados',
        data: [],
        dataLabels: {
                enabled: false
            },
        color: Highcharts.getOptions().colors[1]        
        },       
    ],
    credits: {href: "https://biblat.unam.mx/es", text: "Fuente: biblat.unam.mx"}
}

// Create the chart
mapaChart = {
    chart: {
        map: 'custom/world',        
        height: '400px',
        backgroundColor: 'transparent'
    },

    title: {
        text: '',//'<a href="indice/pais/mexico">México</a>',
        useHTML: true
    },

    subtitle: {
        text: ''
    },

    mapNavigation: {
        enabled: true,
//        buttonOptions: {
//            verticalAlign: 'bottom'
//        }
    },

//    colorAxis: {
//        min: 0
//    },

    legend: {
        enabled: false
    },
    
    plotOptions: {
        map: {
            events: {
                click: function(e) {
//                    if( window.location.href.indexOf('mapa') !== -1 ){
                        //this.userOptions.states.hover.color='gray';                   
                        //e.point.color = (e.point.color == '#ff8000')?'gray':'#ff8000';
                        class_utils.find_prop(mapa.series[0].points,'name',pais).update({color: 'gray'});
                        e.point.color = '#00299e';
                        pais = e.point.name;
                        class_utils.find_prop(mapa.series[0].points,'name',pais).update({color: '#00299e'});
                        
                        body_revista = '';
                        pais_revista = e.point.name.toLowerCase().split('').map(letra=>dicc[letra] || letra).join('');
                        
                        var revistas_filter = class_utils.filter_prop(revistas,'pais',pais_revista);
                        
                        //Reset de la búsqueda desde el input
                        $('input[type=search]').val('').change();
                        $('#tb_revistas').DataTable().search('').draw();
                        //Reset de la búsqueda por columna
                        $('#tb_revistas').DataTable().columns().search('').draw();
                        $('#tb_revistas').DataTable().columns(1).search(e.point.name+'$', regex=true).draw();
                        //Reset demás estilos
                        $('.td_disciplina').css('font-size', '11px');
                        $('.td_disciplina').css('background-color', 'rgba(255, 128, 0, 0.25)');
                        $('.td_area').css('font-size', '11px');
                        $('.td_area').css('background-color', 'rgba(255, 128, 0, 0.25)');
                        $('.td_universidad').css('font-size', '11px');
                        $('.td_universidad').css('background-color', 'rgba(255, 128, 0, 0.25)');
                        //Estilo para la columna
                        $('.td_pais').css('font-size', '13px');
                        $('.td_pais').css('font-weight', 'bold');
                        $('.td_pais').css('background-color', 'rgb(163, 183, 241)');
                        $('#reset_revistas').show();
                        $('#txt_revistas').html('Revistas del país: "' + e.point.name + '"');
                        
                        fn_search=function(val){
                            //Reset de la búsqueda desde el input
                            $('input[type=search]').val('').change();
                            $('#tb_revistas').DataTable().search('').draw();
                            //Reset de la búsqueda por columna
                            $('#tb_revistas').DataTable().columns().search('').draw();
                            $('#tb_revistas').DataTable().columns(6).search(val+'$', regex=true).draw();
                            $('#txt_revistas').html('Revistas de la universidad: "'+val+'"');
                            //Reset demás estilos
                            $('.td_disciplina').css('font-size', '11px');
                            $('.td_disciplina').css('background-color', 'rgba(255, 128, 0, 0.25)');
                            $('.td_area').css('font-size', '11px');
                            $('.td_area').css('background-color', 'rgba(255, 128, 0, 0.25)');
                            $('.td_pais').css('font-size', '11px');
                            $('.td_pais').css('background-color', 'rgba(255, 128, 0, 0.25)');
                            //Estilo para la columna
                            $('.td_universidad').css('font-size', '13px');
                            $('.td_universidad').css('font-weight', 'bold');
                            $('.td_universidad').css('background-color', 'rgb(163, 183, 241)');
                            $('#reset_revistas').show();
                            window.location.href = window.location.origin + window.location.pathname + '#txt_revistas';
                        };
                        $.each(revistas_filter,function(i,val){
                            body_revista += tr_revista.replace('<rev>',val.universidad)
                                                       //.replace('<art>','<a target="_blank" class="enlace" href="revista/'+val.universidad+'">' + new Intl.NumberFormat("en").format(val.rev) + '</a>' );
                                                       .replace('<art>', '<a style="cursor:pointer" onclick="fn_search(\''+val.universidad+'\')">' + new Intl.NumberFormat("en").format(val.rev) + '</a>' );
                        });

                        $('#div_tabla').html(tabla_revista);
                        $('#bodyRevista').html(body_revista);

                        class_utils.setLiTabla('revistas',{"order": [[ 1, "desc" ]]});
                        
                        var disciplinas_filter = class_utils.filter_prop(disciplinas,'pais',pais_revista);
                        chartTreemap.series[0].data = [];
                        $.each(disciplinas_filter,function(i,val){            
                            chartTreemap.series[0].data.push(
                                {
                                    id: 'id_' + i,
                                    name: val.disciplina,
                                    color: class_utils.getRandomColor(),
                                },
                                {
                                    name: val.disciplina,
                                    parent: 'id_' + i,
                                    value: parseInt(val.rev),
                                },
                            );
                        });
                        
                        Highcharts.chart('div_charttreemap',chartTreemap);
                        
                        var chartTreemap2 = JSON.parse(JSON.stringify(chartTreemap));
                        chartTreemap2.title.text = "Revistas por áreas de conocimiento"
                        chartTreemap2.plotOptions.treemap.point.events = { click:function(){
                                //Reset de la búsqueda desde el input
                                $('input[type=search]').val('').change();
                                $('#tb_revistas').DataTable().search('').draw();
                                //Reset de la búsqueda por columna
                                $('#tb_revistas').DataTable().columns().search('').draw();
                                $('#tb_revistas').DataTable().columns(3).search(this.name+'$', regex=true).draw();
                                $('#txt_revistas').html('Revistas clasificadas en el área: "'+this.name+'"');
                                //Reset demás estilos
                                $('.td_disciplina').css('font-size', '11px');
                                $('.td_disciplina').css('background-color', 'rgba(255, 128, 0, 0.25)');
                                $('.td_universidad').css('font-size', '11px');
                                $('.td_universidad').css('background-color', 'rgba(255, 128, 0, 0.25)');
                                $('.td_pais').css('font-size', '11px');
                                $('.td_pais').css('background-color', 'rgba(255, 128, 0, 0.25)');
                                //Estilo para la columna
                                $('.td_area').css('font-size', '13px');
                                $('.td_area').css('font-weight', 'bold');
                                $('.td_area').css('background-color', 'rgb(163, 183, 241)');
                                $('#reset_revistas').show();
                                window.location.href = window.location.origin + window.location.pathname + '#txt_revistas';
                            }
                        };
                        
                        var areas_filter = class_utils.filter_prop(area_conocimiento,'pais',pais_revista);
                        chartTreemap2.series[0].data = [];
                        $.each(areas_filter,function(i,val){            
                            chartTreemap2.series[0].data.push(
                                {
                                    id: 'id_' + i,
                                    name: val.area_conocimiento,
                                    color: class_utils.getRandomColor(),
                                },
                                {
                                    name: val.area_conocimiento,
                                    parent: 'id_' + i,
                                    value: parseInt(val.rev),
                                },
                            );
                        });

                        Highcharts.chart('div_charttreemap2',chartTreemap2);
                        
                        var anios_filter = class_utils.filter_prop(anios,'pais',pais_revista).sort(class_utils.order_by('anio'));
                        chartColumn.series[0].data = [];
                        chartColumn.series[1].data = [];
                        chartColumn.xAxis.categories = [];
                        var sum_total=0;
                        $.each(anios_filter,function(i,val){
                            if(val.anio.length== 4 && val.anio.indexOf('?') == -1 && chartColumn.xAxis.categories.indexOf(val.anio) == -1){
                                chartColumn.xAxis.categories.push(val.anio);
                                var anio_filter = class_utils.filter_prop(anios_filter,'anio',val.anio);
                                var sum = 0;
                                $.each(anio_filter,function(i,val2){
                                    sum += parseInt(val2.art);
                                });
                                sum_total += sum;
                                chartColumn.series[0].data.push(sum);
                                chartColumn.series[1].data.push(sum_total);
                            }
                        });

                        Highcharts.chart('div_chartcolumn',chartColumn);
                        
//                    }else{
//                        window.location.href = window.location.href + '/mapa/' + e.point.name.toLowerCase().split('').map(letra=>dicc[letra] || letra).join('');
//                    }
                }
            }
        }
    },
    
    tooltip: {
//        headerFormat: '',
//        pointFormat: '<img width="50px" src="img/{point.name}.jpg">',
        style:{
            cursor:"pointer"
        },
        positioner: function () {
                return { x: 100, y: 200 };
        },
        useHTML: true,
        formatter: function() {
            return  '<table>' +
                        '<tr>' +
                            '<td>' +
                                this.point.properties['name'] + '<br>' +
                                '<img width="100px" height="100px" src="/img/' + this.point.name.toLowerCase().split('').map(letra=>dicc[letra] || letra).join('') + '.png' + '">' +
                            '</td>' +
                            '<td align="left">' +
                                '&nbsp;Universidades: ' + new Intl.NumberFormat("en").format( paises[this.point.properties['name'].toLowerCase().split('').map(letra=>dicc[letra] || letra).join('')].props.universidades )+ '<br>' +
                                '&nbsp;Revistas: ' + new Intl.NumberFormat("en").format( paises[this.point.properties['name'].toLowerCase().split('').map(letra=>dicc[letra] || letra).join('')].props.revistas )+ '<br>' +
                                '&nbsp;Indizadas BIBLAT: ' + new Intl.NumberFormat("en").format( paises[this.point.properties['name'].toLowerCase().split('').map(letra=>dicc[letra] || letra).join('')].props.indizadas )+
                            '</td>' +
                        '</tr>' +
                    '</table>'
        }        
    },       
    
    series: [{
        data: data,
        //name: 'Random data',
        borderColor: '#00299e',
        nullColor: 'lightgray',
        color: 'gray',
        states: {
            hover: {
                color: '#00299e'
            }
        },
//        dataLabels: {
//            enabled: true,
//            format: '{point.name}'
//        }
    }],

    credits: { enabled: false, href: "https://biblat.unam.mx/es", text: "Fuente: biblat.unam.mx"}
};


$.when(
        class_utils.getResource('/datos/tabla/mvpaisrevistasuniv')        
//        (window.location.href.indexOf('mapa') !== -1)?class_utils.getResource('/datos/datosRevistas'):window.location.href,
//        (window.location.href.indexOf('mapa') !== -1)?class_utils.getResource('/datos/disciplinaPais'):window.location.href,
//        (window.location.href.indexOf('mapa') !== -1)?class_utils.getResource('/datos/anioPais'):window.location.href
)
.then(function(resp){
    
    var num = 0;
    $.each(resp,function(i,val){
        if(paises.hasOwnProperty(val.pais)){
            data.push(Array(paises[val.pais].props.id,num));
            paises[val.pais].props['revistas'] = val.revistas;
            paises[val.pais].props['universidades'] = val.universidades;
            paises[val.pais].props['indizadas'] = val.indizadas;
            num++;
        }
    });
    
    pais = paises[pais_revista].props.nombre;
    
    mapa = Highcharts.mapChart('mapa-biblat', mapaChart);
    class_utils.find_prop(mapa.series[0].points,'name',pais).update({color: '#00299e'});
    
    
    $.when(
        class_utils.getResource('/datos/tabla/mvunivrevistas'),
        class_utils.getResource('/datos/tabla/mvpaisdisciplina'),
        //class_utils.getResource('/datos/anioPais'),
        class_utils.getResource('/datos/tabla/mvdatosrevistas'),
        class_utils.getResource('/datos/tabla/mvpaisareaconocimiento')
    )
    .then(function(resp2, resp3, resp4, resp5){
    revistas = resp2[0];
    disciplinas = resp3[0];
    //anios = resp4[0];
    datosrevistas = resp4[0];
    area_conocimiento = resp5[0];
    
    
//    if( window.location.href.indexOf('mapa') !== -1 ){
        var revistas_filter = class_utils.filter_prop(revistas,'pais',pais_revista);    
        fn_search=function(val){
                            //Reset de la búsqueda desde el input
                            $('input[type=search]').val('').change();
                            $('#tb_revistas').DataTable().search('').draw();
                            //Reset de la búsqueda por columna
                            $('#tb_revistas').DataTable().columns().search('').draw();
                            $('#tb_revistas').DataTable().columns(6).search(val+'$', regex=true).draw();
                            $('#txt_revistas').html('Revistas de la universidad: "'+val+'"');
                            //Reset demás estilos
                            $('.td_disciplina').css('font-size', '11px');
                            $('.td_disciplina').css('background-color', 'rgba(255, 128, 0, 0.25)');
                            $('.td_area').css('font-size', '11px');
                            $('.td_area').css('background-color', 'rgba(255, 128, 0, 0.25)');
                            $('.td_pais').css('font-size', '11px');
                            $('.td_pais').css('background-color', 'rgba(255, 128, 0, 0.25)');
                            //Estilo para la columna
                            $('.td_universidad').css('font-size', '13px');
                            $('.td_universidad').css('font-weight', 'bold');
                            $('.td_universidad').css('background-color', 'rgb(163, 183, 241)');
                            $('#reset_revistas').show();
                            window.location.href = window.location.origin + window.location.pathname + '#txt_revistas';
                        };
        $.each(revistas_filter,function(i,val){
            body_revista += tr_revista.replace('<rev>',val.universidad)
                                        //.replace('<art>','<a target="_blank" class="enlace" href="revista/'+val.universidad+'">' + new Intl.NumberFormat("en").format(val.rev) + '</a>' );
                                        .replace('<art>', '<a style="cursor:pointer" onclick="fn_search(\''+val.universidad+'\')">' + new Intl.NumberFormat("en").format(val.rev) + '</a>' );
        });
        
        $('#div_tabla').html(tabla_revista);
        $('#bodyRevista').html(body_revista);

        class_utils.setLiTabla('revistas',{"order": [[ 1, "desc" ]]});
        
        var disciplinas_filter = class_utils.filter_prop(disciplinas,'pais',pais_revista);
        chartTreemap.series[0].data = [];
        $.each(disciplinas_filter,function(i,val){            
            chartTreemap.series[0].data.push(
                {
                    id: 'id_' + i,
                    name: val.disciplina,
                    color: class_utils.getRandomColor(),
                },
                {
                    name: val.disciplina,
                    parent: 'id_' + i,
                    value: parseInt(val.rev),
                },
            );
        });
        
        Highcharts.chart('div_charttreemap',chartTreemap);
        
        var chartTreemap2 = JSON.parse(JSON.stringify(chartTreemap));
        chartTreemap2.title.text = "Revistas por áreas de conocimiento"
        chartTreemap2.plotOptions.treemap.point.events = { click:function(){
                            //Reset de la búsqueda desde el input
                            $('input[type=search]').val('').change();
                            $('#tb_revistas').DataTable().search('').draw();
                            //Reset de la búsqueda por columna
                            $('#tb_revistas').DataTable().columns().search('').draw();
                            $('#tb_revistas').DataTable().columns(3).search(this.name+'$', regex=true).draw();
                            $('#txt_revistas').html('Revistas clasificadas en el área: "'+this.name+'"');
                            //Reset demás estilos
                            $('.td_disciplina').css('font-size', '11px');
                            $('.td_disciplina').css('background-color', 'rgba(255, 128, 0, 0.25)');
                            $('.td_universidad').css('font-size', '11px');
                            $('.td_universidad').css('background-color', 'rgba(255, 128, 0, 0.25)');
                            $('.td_pais').css('font-size', '11px');
                            $('.td_pais').css('background-color', 'rgba(255, 128, 0, 0.25)');
                            //Estilo para la columna
                            $('.td_area').css('font-size', '13px');
                            $('.td_area').css('font-weight', 'bold');
                            $('.td_area').css('background-color', 'rgb(163, 183, 241)');
                            $('#reset_revistas').show();
                            window.location.href = window.location.origin + window.location.pathname + '#txt_revistas';
                        }
                    };
        
        var areas_filter = class_utils.filter_prop(area_conocimiento,'pais',pais_revista);
        chartTreemap2.series[0].data = [];
        $.each(areas_filter,function(i,val){            
            chartTreemap2.series[0].data.push(
                {
                    id: 'id_' + i,
                    name: val.area_conocimiento,
                    color: class_utils.getRandomColor(),
                },
                {
                    name: val.area_conocimiento,
                    parent: 'id_' + i,
                    value: parseInt(val.rev),
                },
            );
        });
        
        Highcharts.chart('div_charttreemap2',chartTreemap2);
        
        var body_revistas = '';
        
        $.each(datosrevistas,function(i,val){
            body_revistas += tr_datos_revistas.replace('<titulo>', val.titulo)
                                        .replace('<pais>', val.pais)
                                        .replace('<ciudad>', val.ciudad)
                                        .replace('<area_conocimiento>', val.area_conocimiento)
                                        .replace('<disciplina>', val.disciplina)
                                        .replace('<naturaleza>', val.naturaleza)
                                        .replace('<universidad>', val.universidad)
                                        .replace('<entidad_editora>', val.entidad_editora)
                                        .replace('<issn_i>', val.issn_i)
                                        .replace('<issn_e>', val.issn_e)
                                        .replace('<url_rev>', val.url_revista)
                                        .replace('<url_rep>', val.url_repositorio);
                                
        });
        
        $('#div_tbl_revistas').html(tabla_datos_revistas);
        $('#body_datos_revistas').html(body_revistas);
        
        var op = {
                        order: [[ 0, 'asc' ]],
                        bLengthChange: false,
                        pageLength: 10,
                        pagingType: 'input',
                    };                    
                    
        class_utils.setTabla('tb_revistas',op);
        
        $('#tb_revistas_filter').css('font-size',11);
        $('#tb_revistas_info').css('font-size',11);
        $('#tb_revistas_paginate').css('font-size',11);
        $('#tb_revistas_paginate .paginate_input').css('width',50);
        $('#tb_revistas').DataTable().columns(1).search("México"+'$', regex=true).draw();
        $('#txt_revistas').html('Revistas del país: "México"');
        $('.td_pais').css('font-size', '13px');
        $('.td_pais').css('font-weight', 'bold');
        $('.td_pais').css('background-color', 'rgb(163, 183, 241)');
        $('#div_revistas').show();
        
        $('#tb_revistas_filter, #reset_revistas').off('click').on('click', function(){
            $('#div_tbl_revistas').html(tabla_datos_revistas);
            $('#body_datos_revistas').html(body_revistas);

            var op = {
                            order: [[ 0, 'asc' ]],
                            bLengthChange: false,
                            pageLength: 10,
                            pagingType: 'input',
                        };                    

            class_utils.setTabla('tb_revistas',op);
            $('#txt_revistas').html('Revistas');
            
            $('#tb_revistas_filter').css('font-size',11);
            $('#tb_revistas_info').css('font-size',11);
            $('#tb_revistas_paginate').css('font-size',11);
            $('#tb_revistas_paginate .paginate_input').css('width',50);
            
            //Reset demás estilos
            $('.td_disciplina').css('font-size', '11px');
            $('.td_disciplina').css('background-color', 'rgba(255, 128, 0, 0.25)');
            $('.td_universidad').css('font-size', '11px');
            $('.td_universidad').css('background-color', 'rgba(255, 128, 0, 0.25)');
            $('.td_area').css('font-size', '11px');
            $('.td_area').css('background-color', 'rgba(255, 128, 0, 0.25)');
            $('.td_pais').css('font-size', '11px');
            $('.td_pais').css('background-color', 'rgba(255, 128, 0, 0.25)');
        });
        
        /*
        var anios_filter = class_utils.filter_prop(anios,'pais',pais_revista).sort(class_utils.order_by('anio'));
        chartColumn.series[0].data = [];
        var sum_total=0;
        $.each(anios_filter,function(i,val){
            if(val.anio.length== 4 && val.anio.indexOf('?') == -1 && chartColumn.xAxis.categories.indexOf(val.anio) == -1){
                chartColumn.xAxis.categories.push(val.anio);
                var anio_filter = class_utils.filter_prop(anios_filter,'anio',val.anio);
                var sum = 0;
                $.each(anio_filter,function(i,val2){
                    sum += parseInt(val2.art);
                });
                sum_total += sum;
                chartColumn.series[0].data.push(sum);
                chartColumn.series[1].data.push(sum_total);
            }
        });
        
        Highcharts.chart('div_chartcolumn',chartColumn);
         *
         */
        
//        mapa.plotOptions.map.events.click = 
//    }


//if( window.location.href.indexOf('mapa') !== -1 ){
//    pais = paises[window.location.href.split('/')[window.location.href.split('/').length-1]].props.nombre;
    
//}

});

});


