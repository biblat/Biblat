var anio_actual = ((new Date()).getFullYear());
var anio_hasta = 2024;
var dia_actual=(new Date()).getDate();
var dia_hasta=1;
var mes_actual=(new Date()).getMonth()+1;
var mes_hasta=8;
var hora_actual=(new Date()).getHours();
var hora_hasta=9;
if(dia_actual == dia_hasta && mes_actual==mes_hasta && anio_actual==anio_hasta){
    if(hora_actual < hora_hasta){
        $('#primer').removeClass('active');
        $('#aviso').addClass('active');
    }else{
        $('#aviso').remove();
    }
}else if(dia_actual < dia_hasta && mes_actual==mes_hasta && anio_actual==anio_hasta){
    $('#primer').removeClass('active');
    $('#aviso').addClass('active');
}else if(mes_actual < mes_hasta && anio_actual==anio_hasta){
    $('#primer').removeClass('active');
    $('#aviso').addClass('active');
}else{
    $('#aviso').remove();
}

var data = [];

var dicc = {'á':'a','é':'e','í':'i','ó':'o','ú':'u',' ':'-'};

var mapa ='';

var body_revista = '';
var tabla_revista = '<table id="revistas" class="display" style="width:100%;font-size:11px"><thead><tr><th>Revista</th><th>Documentos</th></tr></thead><tbody id="bodyRevista"></tbody></table>';
var tr_revista = '<tr><td><rev></td><td><art></td></tr>';

var pais = '';
var pais_revista = 'mexico';//window.location.href.split('/')[window.location.href.split('/').length-1];

var revistas = '';
var disciplinas = '';
var anios = '';

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
            text: 'Disciplinas',
            style: {fontSize: '11px', fontWeight: 'bold'}
        },
        plotOptions: {
            treemap: {
                dataLabels: {
                    formatter:function(){
						if( this.point.name !== undefined && this.point.name !== null ){
							return '<a target="_blank" style="color:black" href="indice/disciplina/' + this.point.name.toLowerCase().split('').map(letra=>dicc[letra] || letra).join('') + '">' + this.point.name + '</a>';
						}else{
							return '';
						}
                    },
                    useHTML: true
                }
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
                        e.point.color = '#ff8000';
                        pais = e.point.name;
                        class_utils.find_prop(mapa.series[0].points,'name',pais).update({color: '#ff8000'});
                        
                        body_revista = '';
                        pais_revista = e.point.name.toLowerCase().split('').map(letra=>dicc[letra] || letra).join('');
                        var revistas_filter = class_utils.filter_prop(revistas,'pais',pais_revista);
                        $.each(revistas_filter,function(i,val){
                            body_revista += tr_revista.replace('<rev>',val.revista)
                                                         .replace('<art>','<a target="_blank" class="enlace" href="revista/'+val.revistaSlug+'">' + new Intl.NumberFormat("en").format(val.art) + '</a>' );
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
                                    value: parseInt(val.art),
                                },
                            );
                        });

                        Highcharts.chart('div_charttreemap',chartTreemap);
                        
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
                                '&nbsp;Revistas: ' + new Intl.NumberFormat("en").format( paises[this.point.properties['name'].toLowerCase().split('').map(letra=>dicc[letra] || letra).join('')].props.revistas )+ '<br>' +
                                '&nbsp;Documentos:' + new Intl.NumberFormat("en").format( paises[this.point.properties['name'].toLowerCase().split('').map(letra=>dicc[letra] || letra).join('')].props.articulos )+
                            '</td>' +
                        '</tr>' +
                    '</table>'
        }        
    },       
    
    series: [{
        data: data,
        //name: 'Random data',
        borderColor: '#ff8000',
        nullColor: 'lightgray',
        color: 'gray',
        states: {
            hover: {
                color: '#ff8000'
            }
        },
//        dataLabels: {
//            enabled: true,
//            format: '{point.name}'
//        }
    }],

    credits: { enabled: false, href: "https://biblat.unam.mx/es", text: "Fuente: biblat.unam.mx"}
};

loading.start();
$.when(
        class_utils.getResource('/datos/datosPais')        
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
            paises[val.pais].props['articulos'] = val.articulos;
            num++;
        }
    });
    
    pais = paises[pais_revista].props.nombre;
    
    mapa = Highcharts.mapChart('mapa-biblat', mapaChart);
    class_utils.find_prop(mapa.series[0].points,'name',pais).update({color: '#ff8000'});
    
    loading.end();
    
    $.when(
        class_utils.getResource('/datos/datosRevistas'),
        class_utils.getResource('/datos/disciplinaPais'),
        class_utils.getResource('/datos/anioPais')
    )
    .then(function(resp2, resp3, resp4){
    revistas = resp2[0];
    disciplinas = resp3[0];
    anios = resp4[0];
    
    
//    if( window.location.href.indexOf('mapa') !== -1 ){
        var revistas_filter = class_utils.filter_prop(revistas,'pais',pais_revista);    
        $.each(revistas_filter,function(i,val){
            body_revista += tr_revista.replace('<rev>',val.revista)
                                         .replace('<art>','<a target="_blank" class="enlace" href="revista/'+val.revistaSlug+'">' + new Intl.NumberFormat("en").format(val.art) + '</a>' );
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
                    value: parseInt(val.art),
                },
            );
        });
        
        Highcharts.chart('div_charttreemap',chartTreemap);
        
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
        
//        mapa.plotOptions.map.events.click = 
//    }


//if( window.location.href.indexOf('mapa') !== -1 ){
//    pais = paises[window.location.href.split('/')[window.location.href.split('/').length-1]].props.nombre;
    
//}

});

});



/****************** frecuencias **************/

c_frec = {
    var: {
        tabla: '',
        btn_top: '<div id="btn_<id>" class="form-group"><div class="input-group">'+
                '<div class="input-group-addon" style="background:#FF8000"><button id="top_<id>" class="btn btn-search"><b>TOP 100</b></button></div>'+
                '<div class="input-group-addon" style="background:#FF800040"><button id="total_<id>" class="btn btn-search"><b>Lista completa</b></button></div></div></div>',
        btn_completa: '<div class="form-group"><div class="input-group">'+
                '<div class="input-group-addon" style="background:#FF8000"><button id="total_<id>" class="btn btn-search"><b>Lista completa</b></button></div></div>',
        tabla_frecuencias: '<table id="frecuencias" class="display" style="width:100%;font-size:12px"><thead><tr><th style="background-color: #ff800040">Institución</th><th style="background-color: #ff800040">Documentos</th></tr></thead><tbody id="body_frecuencias"></tbody></table>',
        tr_frecuencias: '<tr id="tr_<id>"><td id="<id>" class="td_tabla_ins institucion"><inst></td><td><doc></td></tr>',
        tabla_paises: '<table id="paises" class="display" style="font-size:11px;width:200px"><thead><tr><th>País</th><th>Ver</th></tr></thead><tbody id="body_paises"></tbody></table>',
        tr_paises: '<tr><td style="width:100px" id="<pais_id>_html"><pais></td><td style="width:10px;cursor:pointer;color:lightgreen"><i id="<pais_id>" class="fa fa-eye"></i></td></tr>',
        tabla_autores: '<span style="font-size:11px"></span><table id="autores" class="display" style="width:100%;font-size:11px"><thead><tr><th style="background-color: #ff800040">Autor</th><th style="background-color: #ff800040">Documentos</th></tr></thead><tbody id="body_autores"></tbody></table>',
        tr_autores: '<tr id="tr_<id>"><td class="td_tabla"><span id="<id>" style="cursor:pointer"><autor></span></td><td><doc></td></tr>',
        tabla_coautoria: '<span style="font-size:11px"></span><table id="coautoria" class="display" style="width:100%;font-size:11px"><thead><tr><th style="background-color: #ff800040">Institución coautora</th><th style="background-color: #ff800040">Documentos</th></tr></thead><tbody id="body_coautoria"></tbody></table>',
        tr_coautoria: '<tr id="tr_<id>"><td class="td_tabla"><span id="<id>" style="cursor:pointer"><coautor></span></td><td><doc></td></tr>',
        subtitulo: '<hr><h4><center><sub><br>Autores e Instituciones coautoras</center></h4><hr>',
        data_frecuencias: '',
        data_frec_pais: '',
        data_frec_disc: '',
        data_frec_autor: '',
        data_frec_coautoria: '',
        body_frecuencias: '',
        body_paises: '',
        body_autores: '',
        body_coautoria: '',
        df_institucion: 'universidad-nacional-autonoma-de-mexico',
        df_sub: 'Universidad Nacional Autónoma de México',
        loading: '<center><br><br><div class="fa-2x" style="color:#ff8000"><i class="fa fa-refresh fa-spin"></i></div></center>',
        filter_pais: [],
        html_options: '<center><br><input id="ver_todos" type="button" value="Ver todos"><br><br><input id="sin_paises" type="button" value="<val>"></center>',
        con_paises: true,
        refresh_tabla: true,
        chartColumn: JSON.parse( JSON.stringify(class_utils.chartColumn) ),
        chartSun: JSON.parse( JSON.stringify(class_utils.chartSun) )
    },
    ready: function(){
        loading.start();
        Highcharts.setOptions({
            lang: {
                thousandsSep: ',',
                drillUpText:'< Regresar'
            }
        });
        $.when(class_utils.getResource('/datos/frec_institucion/sin/100'))
        .then(function(resp){
            c_frec.var.data_frecuencias = resp;
            
            c_frec.get_tabla_institucion();
            
            loading.end();
            $('#div_chartcolumn_pais').html(c_frec.var.loading);
            $('#div_chartsun').html(c_frec.var.loading);
            $('#div_tablasun').html(c_frec.var.loading);
            $('#div_tabla_autor').html(c_frec.var.loading);
            $('#div_tabla_coautoria').html(c_frec.var.loading);
            
            $.when(class_utils.getResource('/datos/frec_institucion_pais/'+c_frec.var.df_institucion),
                class_utils.getResource('/datos/frec_ipdr/'+c_frec.var.df_institucion),
                class_utils.getResource('/datos/frec_institucion_autor/'+c_frec.var.df_institucion+'/100'),
                class_utils.getResource('/datos/frec_institucion_coautoria/'+c_frec.var.df_institucion+'/100'),
            )
            .then(function(resp2, resp3, resp4, resp5){
                c_frec.var.data_frec_pais = resp2[0];                
                c_frec.var.data_frec_idpr = resp3[0];
                c_frec.var.data_frec_autor = resp4[0];
                c_frec.var.data_frec_coautoria = resp5[0];
                
                c_frec.get_tabla_autor();
                c_frec.get_tabla_coautoria();
                c_frec.control();
                
                $.when(class_utils.getResource('/datos/frec_institucion_disc/'+c_frec.var.df_institucion))
                .then(function(resp6){
                    c_frec.var.data_frec_disc = resp6;
                });
                
                c_frec.get_chart_column();
                
                c_frec.get_chart_sun();
            });
        });
    },
    get_chart_column: function(){
        if(c_frec.var.con_paises)
            var filter_institucion_pais = class_utils.filterdiff_prop( c_frec.var.data_frec_pais, 'paisRevista', c_frec.var.filter_pais);
        else
            var filter_institucion_pais = class_utils.filterdiff_prop( c_frec.var.data_frec_disc, 'disciplina', c_frec.var.filter_pais);
        
        c_frec.var.chartColumn.series[0].data = [];        

        /*Banderas*/
        var xAxis= {
            type: 'category',
            max: filter_institucion_pais.length-1,
            labels: {
                useHTML: true,
                animate: true,
                formatter: function () {
                    if(c_frec.var.con_paises){
                        var value = class_utils.find_prop(filter_institucion_pais,'paisRevista',this.value).paisRevistaSlug;
                        if(value === 'internacional') value = 'america';
                        return '<span><img src="/img/' + value + '.png" style="width: 20px; height: 20px;"/><br></span>';
                    }else
                        return this.value;
                }
            }
        };
        
        c_frec.var.chartColumn.tooltip.formatter = function(){
            if(c_frec.var.con_paises)
                var url = '/pais/';
            else
                var url = '/disciplina/';
            return '<center style="font-size:11px">' + this.points[0].key + '<a target="_blank" href="/frecuencias/institucion/' + c_frec.var.df_institucion + url + class_utils.slug(this.points[0].key) + '"><br>' + this.points[0].y + '<br>documentos</a></center>';
        };
//        class_utils.chartColumn.yAxis[0].title.text = 'No. Documentos';
        c_frec.var.chartColumn.xAxis.categories = [];
        c_frec.var.chartColumn.title.text = (c_frec.var.con_paises)?'País de publicación':'Disciplinas en la Institución';
        c_frec.var.chartColumn.chart.height = '400px';
        $.each(filter_institucion_pais, function(i,val){
            c_frec.var.chartColumn.series[0].data.push({
                name: (c_frec.var.con_paises)?val.paisRevista:val.disciplina, 
                y: parseInt(val.documentos)
            });
        });
        c_frec.var.chartColumn.xAxis = xAxis;
        Highcharts.chart('div_chartcolumn_pais',c_frec.var.chartColumn);
    },
    get_chart_sun: function(){
        c_frec.var.chartSun.series[0].data=[];
                
        c_frec.var.chartSun.series[0].data.push({
            id: 'institucion',
            parent: '',
            name: c_frec.var.data_frec_idpr[0].institucion
        });
        
        c_frec.var.chartSun.tooltip.formatter = function(){
//            return '<center style="font-size:11px">' + this.key + '<a target="_blank" href="/frecuencias/institucion/' + c_frec.var.df_institucion + class_utils.slug(this.key) + '"><br>' + this.point.value + '<br>documentos</a></center>';
            var clic = ''
            if ( this.point.id.indexOf('rev')!== -1)
                clic = '<br>(Clic para ver documentos)';
            return this.key + ': ' + new Intl.NumberFormat("en").format(this.point.value) + ' documentos' + clic;
        };
        
        c_frec.var.chartSun.plotOptions.sunburst.events.click = function(e) {            
            if(e.point.id.indexOf('rev')!== -1)
                window.open('/frecuencias/institucion/'+c_frec.var.df_institucion+'/revista/'+class_utils.slug(e.point.name), '_blank');
        };
        
        var ids = [];
        var ids2 = [];
        var ids3 = [];
        var paises = [];
        var disciplinas =[];
        
        if(c_frec.var.con_paises){
            
            c_frec.var.chartSun.title.text = 'Revistas por País y Disciplina';
            $.each(class_utils.filterdiff_prop(c_frec.var.data_frec_idpr,'paisRevista',c_frec.var.filter_pais), function(i,val){
            if(ids.indexOf(val.paisRevistaSlug) === -1){
                ids.push(val.paisRevistaSlug);
                paises.push(val.paisRevista);
                c_frec.var.chartSun.series[0].data.push({
                    id: ids.indexOf(val.paisRevistaSlug)+'',
                    parent: 'institucion',
                    name: val.paisRevista
                });
            }

            if(ids2.indexOf(val.paisRevistaSlug+'-'+val.disciplinaSlug) === -1){                       
                ids2.push(val.paisRevistaSlug+'-'+val.disciplinaSlug);    
                c_frec.var.chartSun.series[0].data.push({
                    id: ids.indexOf(val.paisRevistaSlug)+'.'+ids2.indexOf(val.paisRevistaSlug+'-'+val.disciplinaSlug),
                    parent: ids.indexOf(val.paisRevistaSlug)+'',
                    name: val.disciplinaRevista
                });
            }
            ids3.push(val.revistaSlug);
            c_frec.var.chartSun.series[0].data.push({
                id: 'rev-'+ids3.indexOf(val.revistaSlug),
                parent: ids.indexOf(val.paisRevistaSlug)+'.'+ids2.indexOf(val.paisRevistaSlug+'-'+val.disciplinaSlug),
                name: val.revista,
                value: parseInt(val.documentos)
            });
        });
        
        }else{
            
            c_frec.var.chartSun.title.text = 'Revistas por Disciplina';
            $.each(class_utils.filterdiff_prop(c_frec.var.data_frec_idpr,'disciplinaRevista',c_frec.var.filter_pais), function(i,val){
            if(ids2.indexOf(val.disciplinaSlug) === -1){                       
                ids2.push(val.disciplinaSlug);
                disciplinas.push(val.disciplinaRevista);
                c_frec.var.chartSun.series[0].data.push({
                    id: ids2.indexOf(val.disciplinaSlug)+'',
                    parent: 'institucion',
                    name: val.disciplinaRevista
                });
            }
            ids3.push(val.revistaSlug);
            c_frec.var.chartSun.series[0].data.push({
                id: 'rev-'+ids3.indexOf(val.revistaSlug),
                parent: ids2.indexOf(val.disciplinaSlug)+'',
                name: val.revista,
                value: parseInt(val.documentos)
            });
        });
        
        }
        Highcharts.chart('div_chartsun',c_frec.var.chartSun);        
        
        if(c_frec.var.refresh_tabla){

            c_frec.var.body_paises='';

            if(c_frec.var.con_paises){
                var opciones = paises;
                $('#div_tablasun').html(c_frec.var.tabla_paises);
                var html_options = c_frec.var.html_options.replace('<val>','Ver sólo disciplinas');
            }else{
                var opciones = disciplinas;
                $('#div_tablasun').html(c_frec.var.tabla_paises.replace('País','Disciplina'));
                var html_options = c_frec.var.html_options.replace('<val>','Ver con países');
            }

            $.each(opciones,function(i,val){
                c_frec.var.body_paises += c_frec.var.tr_paises.replace('<pais>',val).replace(/<pais_id>/g,class_utils.slug(val));
            });
            $.each(c_frec.var.filter_pais,function(i,val){
                c_frec.var.body_paises += c_frec.var.tr_paises.replace('<pais>',val).replace(/<pais_id>/g,class_utils.slug(val)).replace('fa-eye','fa-eye-slash').replace('color:lightgreen','color:red');
            });

            $('#body_paises').html(c_frec.var.body_paises);
        
            var op = {scrollY:'200px'};
            class_utils.setLiTabla('paises',op);
            $('#div_tablasun').append(html_options);
        }
        
        $('.fa-eye').off('click').on('click',function(){
            c_frec.var.filter_pais.push($('#'+this.id+'_html')[0].innerHTML);
            $('#'+this.id).removeClass('fa-eye');
            $('#'+this.id).addClass('fa-eye-slash');
            $('#'+this.id).css('color','red');
            $('#div_chartcolumn_pais').html(c_frec.var.loading);
            $('#div_chartsun').html(c_frec.var.loading);
            setTimeout(function(){ 
                c_frec.get_chart_column();
                c_frec.var.refresh_tabla = false;
                c_frec.get_chart_sun();
                c_frec.var.refresh_tabla = true;
            },1000);
        });

        $('.fa-eye-slash').off('click').on('click',function(){
            c_frec.var.filter_pais.splice(c_frec.var.filter_pais.indexOf($('#'+this.id+'_html')[0].innerHTML),1);
            $('#'+this.id).removeClass('fa-eye-slash');
            $('#'+this.id).addClass('fa-eye');
            $('#'+this.id).css('color','lightgreen');
            $('#div_chartcolumn_pais').html(c_frec.var.loading);
            $('#div_chartsun').html(c_frec.var.loading);
            setTimeout(function(){                 
                c_frec.get_chart_column();
                c_frec.var.refresh_tabla = false;
                c_frec.get_chart_sun();
                c_frec.var.refresh_tabla = true;
            },1000);
        });

        $('#sin_paises').off('click').on('click',function(){
            c_frec.var.con_paises = !c_frec.var.con_paises;
            c_frec.var.filter_pais = [];
            $('#div_chartcolumn_pais').html(c_frec.var.loading);
            $('#div_chartsun').html(c_frec.var.loading);
            if(c_frec.var.con_paises)
                $('#sin_paises').val('Ver sólo disciplinas');
            else
                $('#sin_paises').val('Ver con países');
            setTimeout(function(){                 
                c_frec.get_chart_column();
                c_frec.get_chart_sun();
            },1000);
        });
        
        $('#ver_todos').off('click').on('click',function(){
            c_frec.var.filter_pais = [];
            $('#div_chartcolumn_pais').html(c_frec.var.loading);
            $('#div_chartsun').html(c_frec.var.loading);
            setTimeout(function(){                 
                c_frec.get_chart_column();
                c_frec.get_chart_sun();
            },1000);
        });
    },
    get_tabla_autor: function(){
        $('#subtitulo').html(c_frec.var.subtitulo.replace('<sub>',c_frec.var.df_sub));
        c_frec.var.body_autores = '';
        $.each(c_frec.var.data_frec_autor,function(i,val){
                c_frec.var.body_autores += c_frec.var.tr_autores.replace('<autor>',val.autor)
                                         .replace('<doc>','<a target="_blank" class="enlace" href="/frecuencias/institucion/' + val.institucionSlug + '/autor/' + val.autorSlug + '" >' + new Intl.NumberFormat("en").format(val.documentos) + '</a>' )
                                         .replace(/<id>/g,val.autorSlug);
            });
            if( $('#total_autor')[0]=== undefined )
                $('#div_tabla_autor').parent().prepend(c_frec.var.btn_top.replace(/<id>/g,'autor').replace(/<button/g,'<button style="font-size:11px"'));
            $('#div_tabla_autor').html(c_frec.var.tabla_autores);
            $('#body_autores').html(c_frec.var.body_autores);
            var op = {
                        order: [[ 1, 'desc' ]],
                        bLengthChange: false,
                        pageLength: 10,
                        pagingType: 'input',
                    };                    
                    
            class_utils.setTabla('autores',op);
            $('#autores_filter').css('font-size',11);
            $('#autores_info').css('font-size',11);
            $('#autores_paginate').css('font-size',11);
            $('#autores_paginate .paginate_input').css('width',50);
    },
    get_tabla_coautoria: function(){
        c_frec.var.body_coautoria = '';
        $.each(c_frec.var.data_frec_coautoria,function(i,val){
                c_frec.var.body_coautoria += c_frec.var.tr_coautoria.replace('<coautor>',val.institucionCoautoria)
                                         .replace('<doc>','<a target="_blank" class="enlace" href="/frecuencias/institucion/' + val.institucionSlug + '/coautoria/' + val.institucionCoSlug + '" >' + new Intl.NumberFormat("en").format(val.documentos) + '</a>' )
                                         .replace(/<id>/g,val.institucionCoSlug);
            });
            if( $('#total_coautoria')[0]=== undefined )
                $('#div_tabla_coautoria').parent().prepend(c_frec.var.btn_top.replace(/<id>/g,'coautoria').replace(/<button/g,'<button style="font-size:11px"'));
            $('#div_tabla_coautoria').html(c_frec.var.tabla_coautoria);
            $('#body_coautoria').html(c_frec.var.body_coautoria);
            var op = {
                        order: [[ 1, 'desc' ]],
                        bLengthChange: false,
                        pageLength: 10,
                        pagingType: 'input',
                    };
                    
            class_utils.setTabla('coautoria',op);
            $('#coautoria_filter').css('font-size',11);
            $('#coautoria_info').css('font-size',11);
            $('#coautoria_paginate').css('font-size',11);
            $('#coautoria_paginate .paginate_input').css('width',50);
    },
    get_tabla_institucion: function(){
        c_frec.var.body_frecuencias = '';
        /*Tabla de instituciones y documentos*/
        $.each(c_frec.var.data_frecuencias,function(i,val){
            c_frec.var.body_frecuencias += c_frec.var.tr_frecuencias.replace('td_tabla_ins','td_tabla_ins'+((c_frec.var.df_institucion === val.institucionSlug)?'td_tabla_ins td_select':''))
                                     .replace('<inst>',val.institucion)
                                     .replace('<doc>','<a target="_blank" class="enlace" href="/frecuencias/institucion/'+val.institucionSlug+'/documento">' + new Intl.NumberFormat("en").format(val.documentos) + '</a>' )
                                     .replace(/<id>/g,val.institucionSlug);
            if(c_frec.var.df_institucion === val.institucionSlug){
                c_frec.var.body_frecuencias = c_frec.var.body_frecuencias.replace('>'+val.institucion+'<','><b><i class="fa fa-bar-chart"></i> '+val.institucion+'</b><');                
            }    
        });
        
        if( $('#total_ins')[0]=== undefined )
            $('#div_tabla_frec').parent().prepend(c_frec.var.btn_top.replace(/<id>/g,'ins'));
        $('#div_tabla_frec').html(c_frec.var.tabla_frecuencias);
        $('#body_frecuencias').html(c_frec.var.body_frecuencias);
        var op = {
                    order: [[ 1, 'desc' ]],
                    bLengthChange: false,
                    pageLength: 10,
                    pagingType: 'input',
                    scrollY: '460px',
                    drawCallback: function() {
                        c_frec.control_tabla();
                    }
                };                    
        console.time('tabla');
        c_frec.var.tabla = class_utils.setTabla('frecuencias',op);
        console.timeEnd('tabla');
        $('#frecuencias_filter').css('font-size',12);
        $('#frecuencias_info').css('font-size',12);
        $('#frecuencias_paginate').css('font-size',12);
        $('#frecuencias_paginate .paginate_input').css('width',50);
    },
    control_tabla: function(){
        $('.institucion').off('click').on('click',function(e){
            if( c_frec.var.df_institucion !== this.id ){
//                $('#'+c_frec.var.df_institucion).html( $('#'+c_frec.var.df_institucion).html().replace('<b><i class="fa fa-bar-chart"></i> ','').replace('</b>','') );
                $('#'+c_frec.var.df_institucion).removeClass('td_select');
                var row = c_frec.var.tabla.row('#tr_'+c_frec.var.df_institucion).data();
                row[0] = row[0].replace('<b><i class="fa fa-bar-chart"></i> ','').replace('</b>','');
                c_frec.var.tabla.row('#tr_'+c_frec.var.df_institucion).data(row);
                
                c_frec.var.con_paises = true;
                $('#btn_autor').remove();
                $('#btn_coautoria').remove();
                $('#div_chartcolumn_pais').html(c_frec.var.loading);
                $('#div_chartsun').html(c_frec.var.loading);
                $('#div_tablasun').html(c_frec.var.loading);
                $('#div_tabla_autor').html(c_frec.var.loading);
                $('#div_tabla_coautoria').html(c_frec.var.loading);
                c_frec.var.filter_pais = [];
                c_frec.var.df_institucion = this.id;
                c_frec.var.df_sub = this.innerHTML;
                $('#'+c_frec.var.df_institucion).addClass('td_select');
//                $('#'+c_frec.var.df_institucion).html( this.innerHTML.replace(this.innerHTML,'<b><i class="fa fa-bar-chart"></i> '+this.innerHTML+'</b>') );
                var row = c_frec.var.tabla.row('#tr_'+c_frec.var.df_institucion).data();
                row[0] = row[0].replace(this.innerHTML,'<b><i class="fa fa-bar-chart"></i> '+this.innerHTML+'</b>');
                c_frec.var.tabla.row('#tr_'+c_frec.var.df_institucion).data(row);
                
                setTimeout(function(){ 

                $.when(
                        class_utils.getResource('/datos/frec_institucion/'+c_frec.var.df_institucion)
                )
                .then(function(resp){
                    c_frec.var.data_frecuencias = resp[0];
                    c_frec.var.df_institucion = c_frec.var.data_frecuencias.institucionSlug;                                 

                    $.when(
                        class_utils.getResource('/datos/frec_institucion_pais/'+c_frec.var.df_institucion),
                        class_utils.getResource('/datos/frec_institucion_disc/'+c_frec.var.df_institucion),
                        class_utils.getResource('/datos/frec_institucion_autor/'+c_frec.var.df_institucion+'/100'),
                        class_utils.getResource('/datos/frec_institucion_coautoria/'+c_frec.var.df_institucion+'/100')
                    )
                    .then(function(resp2, resp3, resp4, resp5){
                        c_frec.var.data_frec_pais = resp2[0];
                        c_frec.var.data_frec_disc = resp3[0];
                        c_frec.var.data_frec_autor = resp4[0];
                        c_frec.var.data_frec_coautoria = resp5[0];
                                                
                        c_frec.get_chart_column();
                        c_frec.get_tabla_autor();
                        c_frec.get_tabla_coautoria();
                        c_frec.control();
                    });
                });

                $.when(
                    class_utils.getResource('/datos/frec_ipdr/'+c_frec.var.df_institucion)
                )
                .then(function(resp){
                    c_frec.var.data_frec_idpr = resp;
                    c_frec.get_chart_sun();
                    c_frec.control_tabla();
                });

                },1000);
            }
        });
    },
    control: function(){
        $('#total_ins').off('click').on('click',function(){
            $('#'+this.id).parent().css('background','#FF8000');
            $('#'+this.id).off('click');
            $('#top_ins').parent().remove();
            $('#div_tabla_frec').html(c_frec.var.loading);
            $.when(class_utils.getResource('/datos/frec_institucion'))
            .then(function(resp){
                c_frec.var.data_frecuencias = resp;
                c_frec.get_tabla_institucion();                
            });
        });
        
        $('#total_autor').off('click').on('click',function(){
            $('#'+this.id).parent().css('background','#FF8000');
            $('#'+this.id).off('click');
            $('#top_autor').parent().remove();
            $('#div_tabla_autor').html(c_frec.var.loading);
            $.when(class_utils.getResource('/datos/frec_institucion_autor/'+c_frec.var.df_institucion))
            .then(function(resp){
                c_frec.var.data_frec_autor = resp;
                c_frec.get_tabla_autor();
            });
        });
        
        $('#total_coautoria').off('click').on('click',function(){
            $('#'+this.id).parent().css('background','#FF8000');
            $('#'+this.id).off('click');
            $('#top_coautoria').parent().remove();
            $('#div_tabla_coautoria').html(c_frec.var.loading);
            $.when(class_utils.getResource('/datos/frec_institucion_coautoria/'+c_frec.var.df_institucion))
            .then(function(resp){
                c_frec.var.data_frec_coautoria = resp;
                c_frec.get_tabla_coautoria();
            });
        });
    }
}

$(c_frec.ready());