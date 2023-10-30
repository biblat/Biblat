class_utils= {
    ready: function(){
    },
    cons: {
        html_option: '<option value="<id>"><val></option>'
    },
    grafica:{
        data: [],
        campos: [],
        anios: [],
        campo_categoria: '',
        campo_fecha: '',
        categoria: [],
        data_categoria: [],
        campo_subcategoria: '',
        subcategoria: [],
        data_subcategoria: [],
        campo_agrupacion: '',
        agrupacion: [],
        data_agrupacion: [],
        campo_fecha: null,
        fecha_inicio: null,
        fecha_fin: null
    },
    options: function(id, arr, mensaje){
        if(mensaje){
            $('#'+id).attr('data-placeholder', mensaje);
        }
        if( typeof(arr[0])=='object' ){
            var options = '<option></option>';
            $.each(arr,function(i, val){
                if( val !== class_utils.grafica.campo_fecha)
                    options += class_utils.cons.html_option.replace('<id>', val['id']).replace('<val>', val['val']);
            });
        }else{
            var options = '<option></option>';
            $.each(arr,function(i, val){
                if( val !== class_utils.grafica.campo_fecha)
                    options += class_utils.cons.html_option.replace('<id>', val).replace('<val>', val);
            });
        }
        $('#'+id).html(options);
        $('#'+id).select2("enable", true);
        $('#'+id).select2({allowClear: true, closeOnSelect: true});
    },
    setChartData: function(data){
        class_utils.grafica.data = JSON.parse(JSON.stringify(data));
        class_utils.setDataDate(class_utils.grafica.data);
        
    },
    setDataDate: function(data, campo){
        var anios = [];
        class_utils.grafica.campos = Object.keys(data[0]);
        //Revisión de campos para obtener el campo que contiene la fecha
        $.each(class_utils.grafica.campos, function(i, val){
            var anio = new Date(data[0][val]).getFullYear();
            var mes = new Date(data[0][val]).getMonth() + 1;
            if(!isNaN(anio) && !isNaN(mes) && data[0][val].length>=10){
                class_utils.grafica.campo_fecha = val;
                return 0;
            }
        });
        
        if(!campo){
            campo = class_utils.grafica.campo_fecha;
        }
        
        $.each(data, function(i, val){
               var anio = new Date(val[campo]).getFullYear();
               var mes = new Date(val[campo]).getMonth() + 1;
               val[campo] = {tiempo:true, fecha:val[campo], anio, mes};
               val['Año'] =String(anio);
               val['Mes']=String(mes);
               if(anios.indexOf(String(anio)) == -1){
                   anios.push(String(anio));
               }
            });
        class_utils.grafica.anios = anios.sort();
        return anios.sort();
    },
    controlGrafica: function(obj){
        var graficaColumn = function(v_subcategoria=null){
            var subcategoria = (v_subcategoria)?v_subcategoria:($('#subcategoria').val() == '')?null:'subcategoria';
            subcategoria = (subcategoria == 'subcategoria')?($('#anios')[0].checked)?'subcategoria-anios':'subcategoria':($('#anios')[0].checked)?'anios':null;
            var sub_op = ($('#subcategoria_op')[0].checked)?'normal':null;
            var horizontal_op = ($('#horizontal_op')[0].checked)?'bar':'column';
            var drill = $('#drill')[0].checked;
            
            class_utils.setSerieColumn(obj, horizontal_op, subcategoria, sub_op, drill);
        };
        
        $('#categoria').off('change').on('change', function(e){
            class_utils.grafica.campo_categoria = $('#categoria').val();
            if(class_utils.grafica.campo_categoria == class_utils.grafica.campo_fecha){
                class_utils.grafica.campo_categoria = "Año";
            }
            class_utils.grafica.categoria = class_utils.unique(obj, class_utils.grafica.campo_categoria).sort();
            class_utils.options('filtro_categoria', class_utils.grafica.categoria, "Seleccione una o varias opciones");
            graficaColumn();
            //$('#subcategoria').select2("val","");
        });
        
        $('#filtro_categoria').off('change').on('change', function(e){
            class_utils.grafica.categoria = $('#filtro_categoria').val();
            if(!class_utils.grafica.categoria){
                 class_utils.grafica.categoria = class_utils.unique(obj, class_utils.grafica.campo_categoria).sort();
            }    
            //$('#subcategoria').select2("val","");
            graficaColumn();
            $('#subcategoria').change();
        });
        
        $('#subcategoria').off('change').on('change', function(e){
            class_utils.grafica.campo_subcategoria = $('#subcategoria').val();
            class_utils.grafica.subcategoria = class_utils.unique(class_utils.grafica.data_categoria, class_utils.grafica.campo_subcategoria).sort();
            class_utils.options('filtro_subcategoria', class_utils.grafica.subcategoria, "Seleccione una o varias opciones");
            graficaColumn();
        });
        
        $('#filtro_subcategoria').off('change').on('change', function(e){
            class_utils.grafica.subcategoria = $('#filtro_subcategoria').val();
            if(!class_utils.grafica.subcategoria){
                 class_utils.grafica.subcategoria = class_utils.unique(class_utils.grafica.data_categoria, class_utils.grafica.campo_subcategoria).sort();
            }    
            //$('#subcategoria').select2("val","");
            graficaColumn();
        });
        
        $('#subcategoria_op').off('change').on('change', function(e){
            graficaColumn();
        });
        
        $('#horizontal_op').off('change').on('change', function(e){
            graficaColumn();
        });
        
        $('#anios').off('change').on('change', function(e){
            //$('#subcategoria').select2("val","");
            graficaColumn();
        });
        
        $('#drill').off('change').on('change', function(e){
            //$('#subcategoria').select2("val","");
            graficaColumn();
        });
        
        
        /*$('#agrupacion').off('change').on('change', function(e){
            class_utils.grafica.campo_agrupacion = $('#agrupacion').val();
            class_utils.grafica.agrupacion = class_utils.unique(class_utils.grafica.data_subcategoria, class_utils.grafica.campo_agrupacion).sort();
            //class_utils.options('filtro_subcategoria', class_utils.grafica.subcategoria, "Seleccione una o varias opciones");
            graficaColumn();
        });*/
        
        class_utils.grafica.fecha_inicio = parseInt(class_utils.grafica.anios[0]);
        class_utils.grafica.fecha_fin = parseInt(class_utils.grafica.anios[class_utils.grafica.anios.length-1]);
        $("#sliderPeriodo")[0].defaultValue=class_utils.grafica.fecha_inicio+";"+class_utils.grafica.fecha_fin;
        $("#sliderPeriodo").jslider({
                                from: class_utils.grafica.fecha_inicio, 
                                to: class_utils.grafica.fecha_fin, 
                                format: { format: '####', locale: 'us' }, 
                                limits: false, 
                                step: 1, 
                                callback: function(value){
                                    class_utils.grafica.fecha_inicio = parseInt(value.split(';')[0]);
                                    class_utils.grafica.fecha_fin = parseInt(value.split(';')[1]);
                                    graficaColumn();
                                }
                        });
    },
    getResource: function(resource) { 
        return $.ajax({url:resource, dataType: 'json', type:'GET', cache:false}); 
    },
    setResource: function(resource, data) { 
        return $.ajax({
                        url:resource, 
                        type:'POST',
                        data: data,
                        cache:false,
                        dataType:"json"
                    });
    },
    setLiTabla: function(id, extra){
        var options_default = {
            "scrollY":        "400px",
            "scrollCollapse": true,
            "paging":         false,
            "responsive": false,
            "bFilter": false,
            "bInfo" : false,
            "stripeClasses": [ 'odd', 'even' ]
        };
        return $('#'+id).DataTable( Object.assign(options_default,extra) );
    },
    setTabla: function(id, extra){
        var options_default = {
//            dom: 'Bfrtip',
//            buttons: [
//                'csvHtml5',
//            ],
            responsive: true,
            language:{
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla",
                "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst":    "<<",
                    "sLast":     ">>",
                    "sNext":     ">",
                    "sPrevious": "<"
                },
                "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                },
//                "buttons": {
//                    "copy": "Copiar",
//                    "colvis": "Visibilidad"
//                }
            },
            footerCallback: function ( row, data, start, end, display ) {
                var api = this.api(), data;

                // Remove the formatting to get integer data for summation
                var intVal = function ( i ) {
                    return typeof i === 'string' ?
                        i.replace(/[\$,]/g, '')*1 :
                        typeof i === 'number' ?
                            i : 0;
                };

                // Total over all pages
                var total = api
                    .column( 1 )
                    .data()
                    .reduce( function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0 );

                // Total over this page
                var pageTotal = api
                    .column( 1, { page: 'current'} )
                    .data()
                    .reduce( function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0 );

                // Update footer
                $( api.column( 1 ).footer() ).html(
                    '$'+pageTotal +' ( $'+ total +' total)'
                );
            }
        }
        return $('#'+id).DataTable( Object.assign(options_default,extra) );
    },
    setSerieColumn: function(data, horizontal_op='column', option=null, stack=null, drill=false){
        console.log(option);
        var arr = [];
        var categorias = [];
        var valores = [];
        var valores_sub = [];
        var subcategorias = [];
        var grafica = JSON.parse(JSON.stringify(class_utils.chartColumn2));
        grafica.chart.type = horizontal_op;
        
        //Drill
        var drill_serie =   [{  "name": class_utils.grafica.campo_categoria,
                                "colorByPoint": true,
                                "data": []
                            }];
        var drill_drill =   {
                                breadcrumbs:    {
                                    position:   {
                                        align: 'right'
                                    }
                                },
                                series: []
                            };
        console.log(data);
        //if(option == null){
            class_utils.grafica.data_categoria = [];
            class_utils.grafica.data_subcategoria = [];
            $.each(data, function(i, val){
                var pass = true;
                //console.log(val);
                //Limita por fecha
                if(class_utils.grafica.campo_fecha){
                    var anio = (new Date(val[class_utils.grafica.campo_fecha]['fecha'])).getFullYear();
                    if( !(anio >= class_utils.grafica.fecha_inicio && anio <= class_utils.grafica.fecha_fin) ){
                        pass = false;
                    }
                }
                if(pass){
                    //console.log('pass');
                    //console.log(val[class_utils.grafica.campo_categoria]);
                    //console.log(String(val[class_utils.grafica.campo_categoria]));
                    //Si se selecciona una categoría se filtra
                    if(val[class_utils.grafica.campo_categoria] && class_utils.grafica.categoria.indexOf(String(val[class_utils.grafica.campo_categoria])) !== -1){
                        class_utils.grafica.data_categoria.push(val);
                        if(class_utils.grafica.categoria.length == 1 && option == 'subcategoria'){
                            var cat = String(val[class_utils.grafica.campo_subcategoria]).trim();
                            if(cat !== ''){
                                var posicion = categorias.indexOf(cat);
                                if(posicion == -1){
                                    categorias.push(cat);
                                    valores.push(1);
                                    //Si son demasiadas categorías la gráfica no se muestra
                                    if(categorias.length > 800){
                                        return 0;
                                    }
                                }else{
                                    valores[posicion]++;
                                }
                            }
                        }else{
                            var cat = String(val[class_utils.grafica.campo_categoria]).trim();
                            if(cat !== ''){
                                var posicion = categorias.indexOf(cat);
                                if(posicion == -1){
                                    categorias.push(cat);
                                    valores.push(1);
                                    //Si son demasiadas categorías la gráfica no se muestra
                                    if(categorias.length > 800){
                                        return 0;
                                    }
                                }else{
                                    valores[posicion]++;
                                }
                            }
                        }
                    }
                }
            });
        //}else
        if(option == 'anios'){
            $.each(class_utils.grafica.data_categoria, function(i, val){
                var pass = true;
                //Limita por fecha
                if(class_utils.grafica.campo_fecha){
                    var anio = (new Date(val[class_utils.grafica.campo_fecha]['fecha'])).getFullYear();
                    if( !(anio >= class_utils.grafica.fecha_inicio && anio <= class_utils.grafica.fecha_fin) ){
                        pass = false;
                    }
                }
                if(pass){
                    if(val["Año"] && class_utils.grafica.anios.indexOf(String(val["Año"])) !== -1){
                        var cat = String(val["Año"]).trim();
                        if(cat !== ''){
                            var posicion = class_utils.grafica.anios.indexOf(cat);
                            if(isNaN(valores_sub[posicion]))
                                valores_sub[posicion]=1;
                            else
                                valores_sub[posicion]++;
                        }
                    }
                }
            });
        }
        if(option == 'subcategoria' && class_utils.grafica.categoria.length > 1){
            $.each(class_utils.grafica.data_categoria, function(i, val){
                var pass = true;
                //Limita por fecha
                if(class_utils.grafica.campo_fecha){
                    var anio = (new Date(val[class_utils.grafica.campo_fecha]['fecha'])).getFullYear();
                    if( !(anio >= class_utils.grafica.fecha_inicio && anio <= class_utils.grafica.fecha_fin) ){
                        pass = false;
                    }
                }
                if(pass){
                    //Si se selecciona una subcategoría se filtra
                    if(val[class_utils.grafica.campo_subcategoria] && class_utils.grafica.subcategoria.indexOf(val[class_utils.grafica.campo_subcategoria]) !== -1){
                        class_utils.grafica.data_subcategoria.push(val);
                        var subcat = String(val[class_utils.grafica.campo_subcategoria]).trim();
                        if(subcat !== ''){
                            var posicion = subcategorias.indexOf(subcat);
                            if(posicion == -1){
                                subcategorias.push(subcat);
                                var obj={};
                                obj['name']=subcat;
                                obj['data']=[];
                                obj['data'][class_utils.grafica.categoria.length-1]=0;
                                obj['data'].fill(0,0,class_utils.grafica.categoria.length-1);
                                obj['data'][class_utils.grafica.categoria.indexOf(val[class_utils.grafica.campo_categoria])]=1;
                                arr.push(obj);
                                if( (arr.length*class_utils.grafica.categoria.length-1) > 500){
                                    return 0;
                                }
                            }else{
                                arr[posicion]['data'][class_utils.grafica.categoria.indexOf(val[class_utils.grafica.campo_categoria])]++;
                            }
                        }
                        if(drill){
                            //Data de acuerdo a la posisción en el array de categoria
                            var posicion_serie = class_utils.grafica.categoria.indexOf(val[class_utils.grafica.campo_categoria]);
                            var posicion_drill = class_utils.grafica.subcategoria.indexOf(val[class_utils.grafica.campo_subcategoria]);

                            if( drill_serie[0].data[posicion_serie] == undefined ){
                                drill_serie[0].data[posicion_serie] = {};
                            }
                            drill_serie[0].data[posicion_serie]['name'] = val[class_utils.grafica.campo_categoria];
                            var val_y = drill_serie[0].data[posicion_serie]['y'];
                            drill_serie[0].data[posicion_serie]['y'] = (val_y == undefined)?1:(val_y+1);
                            drill_serie[0].data[posicion_serie]['drilldown'] = val[class_utils.grafica.campo_categoria];

                            if( drill_drill.series[posicion_serie] == undefined ){
                                drill_drill.series[posicion_serie] = {};
                            }
                            drill_drill.series[posicion_serie]['name'] = val[class_utils.grafica.campo_categoria];
                            drill_drill.series[posicion_serie]['id'] = val[class_utils.grafica.campo_categoria];
                            var val_data = drill_drill.series[posicion_serie]['data'];
                            if(val_data == undefined){
                                drill_drill.series[posicion_serie]['data'] = [];
                            }
                            var val_drill = drill_drill.series[posicion_serie]['data'][posicion_drill];
                            if(val_drill == undefined){
                                drill_drill.series[posicion_serie]['data'][posicion_drill] = [];
                                drill_drill.series[posicion_serie]['data'][posicion_drill][0] = val[class_utils.grafica.campo_subcategoria];
                                drill_drill.series[posicion_serie]['data'][posicion_drill][1] = 1;
                            }else{
                                val_drill = drill_drill.series[posicion_serie]['data'][posicion_drill][1];
                                drill_drill.series[posicion_serie]['data'][posicion_drill][1] = (val_drill+1);
                            }
                        }
                    }
                }
            });
            
            $.each(drill_drill.series, function(i, val){
                var arr_data = [];
                if(val != undefined){
                    $.each(val.data, function(i2, val2){
                        if(val2 !== undefined){
                            arr_data.push(val2);
                        }
                    });
                    val.data = arr_data;
                }
            });
            console.log(drill_serie);
            console.log(drill_drill);
        }
        if(option == 'subcategoria-anios'){
            $.each(class_utils.grafica.data_categoria, function(i, val){
                var pass = true;
                //Limita por fecha
                if(class_utils.grafica.campo_fecha){
                    var anio = (new Date(val[class_utils.grafica.campo_fecha]['fecha'])).getFullYear();
                    if( !(anio >= class_utils.grafica.fecha_inicio && anio <= class_utils.grafica.fecha_fin) ){
                        pass = false;
                    }
                }
                if(pass){
                    //Si se selecciona una subcategoría se filtra
                    if(val[class_utils.grafica.campo_subcategoria] && class_utils.grafica.subcategoria.indexOf(val[class_utils.grafica.campo_subcategoria]) !== -1){
                        class_utils.grafica.data_subcategoria.push(val);
                        var subcat = String(val[class_utils.grafica.campo_subcategoria]).trim();
                        if(subcat !== ''){
                            var posicion = subcategorias.indexOf(subcat);
                            if(posicion == -1){
                                subcategorias.push(subcat);
                                var obj={};
                                obj['name']=subcat;
                                obj['data']=[];
                                obj['data'][class_utils.grafica.anios.length-1]=0;
                                obj['data'].fill(0,0,class_utils.grafica.anios.length-1);
                                obj['data'][class_utils.grafica.anios.indexOf(val["Año"])]=1;
                                arr.push(obj);
                                if( (arr.length*class_utils.grafica.anios.length-1) > 500){
                                    return 0;
                                }
                            }else{
                                arr[posicion]['data'][class_utils.grafica.anios.indexOf(val["Año"])]++;
                            }
                        }
                    }
                }
            });
        }
        
        grafica.plotOptions.series.stacking = stack;
        
        if(option == null || (option == 'subcategoria' && class_utils.grafica.categoria.length == 1)){
            if(categorias.length < 800){
                $.each(categorias, function(i, val){
                    arr.push([val, valores[i]]);
                });
                grafica.xAxis.categories = categorias.sort();
                grafica.series[0].data = arr.sort();
                console.log(grafica);
                Highcharts.chart('container', grafica);
            }else{
                $('#container').html('Demasiados valores para mostrar');
            }
        }else if(option == 'anios'){
            if(class_utils.grafica.anios.length < 800){
                $.each(class_utils.grafica.anios, function(i, val){
                    arr.push([val, valores_sub[i]]);
                });
                grafica.xAxis.categories = class_utils.grafica.anios;
                grafica.series[0].data = arr.sort();
                console.log(grafica);
                Highcharts.chart('container', grafica);
            }else{
                $('#container').html('Demasiados valores para mostrar');
            }
        }else if(option == 'subcategoria' && class_utils.grafica.categoria.length > 1){
            if((arr.length*class_utils.grafica.categoria.length-1) < 500){
                grafica.xAxis.categories = class_utils.grafica.categoria;
                grafica.series = arr.sort();
                if(drill){
                    grafica.xAxis = { type: 'category'};
                    grafica.plotOptions.series['borderWidth'] = 0;
                    grafica.plotOptions.series['dataLabels'] = {enabled: true, format: '{point.y}'};
                    grafica.series = drill_serie;
                    grafica.drilldown = drill_drill;
                }
                console.log(grafica);
                Highcharts.chart('container', grafica);
            }else{
                $('#container').html('Demasiados valores para mostrar');
            }
        }else if(option == 'subcategoria-anios'){
            if((arr.length*class_utils.grafica.anios.length-1) < 500){
                grafica.xAxis.categories = class_utils.grafica.anios;
                grafica.series = arr;
                console.log(grafica);
                Highcharts.chart('container', grafica);
            }else{
                $('#container').html('Demasiados valores para mostrar');
            }
        }
    },
    chartColumn: {
        chart: {
    //        type: 'column',
            height: '300px',
            backgroundColor: 'transparent'
        },
        title: {
            text: '',//'Histórico',
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
                    color: Highcharts.getOptions().colors[0]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }
        }],
        tooltip: {
            pointFormat: '<table style="font-size:11px"><tr><td style="color:{series.color};padding:0">{series.name}:</td>' +
            '<td style="padding:0">{point.y}</td></tr></table>',
            footerFormat: '',
            shared: true,
            useHTML: true,
            /*Habilita click en href del point*/
            style: {
                pointerEvents: 'auto'
            }
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
            name: '',
            data: [],
            dataLabels: {
                    enabled: false
                },
            color: Highcharts.getOptions().colors[0],
            yAxis: 0
            }       
        ],
        credits: {href: "https://biblat.unam.mx/es", text: "Fuente: biblat.unam.mx"}
    },
    chartSun:{
        chart: {
            height: '100%',
            backgroundColor: 'transparent',
            events: {drilldown:''}
        },
        title: {
            style: {'font-size': '11px', fontWeight: 'bold'},
            text: ''            
        },
        subtitle: {
            text: ''
        },
        series: [{
            type: "sunburst",
            data: [],
            allowDrillToNode: true,
            cursor: 'pointer',
            drillUpButton: {
                text: '< Regresar'
            },
            dataLabels: {
                format: '{point.name}',
                filter: {
                    property: 'innerArcLength',
                    operator: '>',
                    value: 16
                },
                rotationMode: 'circular'
            },
            levels: [{
                level: 1,
                levelIsConstant: false,
                dataLabels: {
                    filter: {
                        property: 'outerArcLength',
                        operator: '>',
                        value: 64
                    }
                }
            }, {
                level: 2,
                colorByPoint: true
            },
            {
                level: 3,
                colorVariation: {
                    key: 'brightness',
                    to: -0.5
                }
            }, {
                level: 4,
                colorVariation: {
                    key: 'brightness',
                    to: 0.5
                }
            }]

        }],
        plotOptions: {
            series: {
                turboThreshold: 10000
            },
            sunburst:{events:{click:''}}
        },
        tooltip: {
            headerFormat: "",
            pointFormat: '{point.name}: {point.value} documentos',//'The population of <b>{point.name}</b> is <b>{point.value}</b>'
            useHTML: true,
            style: {
                pointerEvents: 'auto'
            }
        },
        credits: {href: "https://biblat.unam.mx/es", text: "Fuente: biblat.unam.mx"}
    },
    chartColumn2: {
        chart: {
            type: 'column',
            height: '300px',
            backgroundColor: 'transparent'
        },
        title: {
            text: '',//'Histórico',
            style: {fontSize: '11px', fontWeight: 'bold'}
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [],
            //sombreado en el area por categoría (true)
            crosshair: false,   
            title: {
                text: ''
            },
            reversed: false
        },
        yAxis: [{ // Primary yAxis
            labels: {
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }
        }],
        tooltip: {
            pointFormat: '<table style="font-size:11px"><tr><td style="color:{series.color};padding:0">{series.name}:</td>' +
            '<td style="padding:0">{point.y}</td></tr></table>',
            footerFormat: '',
            //Muestra el tooltip en una gran tabla (true)o uno por uno (false)
            shared: false,
            useHTML: true,
            /*Habilita click en href del point*/
            style: {
                pointerEvents: 'auto'
            }
        },
        plotOptions: {
            series:{
                
            },
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
            name: '',
            data: [],
            dataLabels: {
                    enabled: false
                },
            color: Highcharts.getOptions().colors[0],
            yAxis: 0,
            dataSorting: {
                enabled: false,
                //sortKey: 'custom.value'
            }
        }       
        ],
        credits: {href: "https://biblat.unam.mx/es", text: "Fuente: biblat.unam.mx"}
    },
    chartPie: function(){
        var chart = {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: 'transparent'
        };
        var title = {
           text: '',
           style: {fontSize: '11px', fontWeight: 'bold'}
        };      
        var tooltip = {
           pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.2f}%)</b>'
        };
        var plotOptions = {
           pie: {
              allowPointSelect: true,
              cursor: 'pointer',

              dataLabels: {
                 enabled: false           
              },

              showInLegend: true
           }
        };
        var series = [{
        }];     
    
        var credits = {href: "https://biblat.unam.mx/es", text: "Fuente: biblat.unam.mx"};
        
        var json = {};   
        json.chart = chart; 
        json.title = title;     
        json.tooltip = tooltip;  
        json.series = series;
        json.plotOptions = plotOptions;
        json.credits = credits;
        return json;
    },
    chartRadialBar:{
        colors: ['green', 'lightgray', 'red'],
        chart: {
            type: 'column',
            inverted: true,
            polar: true
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        tooltip: {
            outside: true
        },
        pane: {
            size: '85%',
            innerSize: '40%',
            endAngle: 270
        },
        xAxis: {
            tickInterval: 1,
            labels: {
                align: 'right',
                useHTML: true,
                allowOverlap: true,
                step: 1,
                y: 3,
                style: {
                    fontSize: '13px'
                }
            },
            lineWidth: 0,
            categories: [
                //'Norway <span class="f16"><span id="flag" class="flag no">' +
                //'</span></span>',
                //'United States <span class="f16"><span id="flag" class="flag us">' +
                //'</span></span>'
            ]
        },
        yAxis: {
            crosshair: {
                enabled: true,
                color: '#333'
            },
            lineWidth: 0,
            tickInterval: 25,
            reversedStacks: false,
            endOnTick: true,
            showLastLabel: true
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                borderWidth: 0,
                pointPadding: 0,
                groupPadding: 0.15
            }
        },
        series: [
            /*{
            name: 'Gold medals',
            data: [0, 113, 104, 71, 77]
            }, {
            name: 'Silver medals',
            data: [113, 122, 98, 88, 72]
            }*/
        ],
        credits: {href: "https://biblat.unam.mx/es", text: "Fuente: biblat.unam.mx"}
    },
    chartTreemap: {
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            allowDrillToNode: true,
            animationLimit: 1000,
			drillUpButton: {
				position: {
                    align: 'left',
					y: -50
				},
                text: '< Regresar'
            },
            dataLabels: {
                enabled: false
            },
            levels: [{
                level: 1,
                dataLabels: {
                    enabled: true
                },
                borderWidth: 3,
				levelIsConstant: false,
            }],
            accessibility: {
                exposeAsGroupOnly: true
            },
            data: [],
			opacity:1,
			/*states: {
				hover: {
					opacity: 1
				},
				inactive: {
					opacity: 1
				},
			}*/
        }],
        subtitle: {
            text: ''
        },
        title: {
            text: '',
            style: {fontSize: '11px', fontWeight: 'bold'}
        },
        plotOptions: {
            treemap: {
                dataLabels: {
                    formatter:function(){
                        //return '<a target="_blank" style="color:black" href="indice/disciplina/' + this.point.name.toLowerCase().split('').map(letra=>dicc[letra] || letra).join('') + '">' + this.point.name + '</a>'
						return this.point.name;
                    },
                    useHTML: true
                },
				opacity:0
            }
        },
		tooltip: {
            headerFormat: "",
            pointFormat: null,
			pointFormatter: null,
            useHTML: true,
            style: {
                pointerEvents: 'auto'
            }
        },
        chart: {
            height: '100%',
            backgroundColor: 'transparent',
			spacingTop: 100
        },        
        credits: {href: "http://biblat.unam.mx/", text: "Fuente: biblat.unam.mx"}
    },
    filter_prop: function(obj,prop,val){
        return obj.filter(function(obj2){
            return obj2[prop] == val;
        });
    },
    filter_prop_arr: function(obj,prop,val){
        return obj.filter(function(obj2){
            return val.indexOf(obj2[prop]) !== -1;
        });
    },
    filter_val: function(obj,prop,val){
        return obj.filter(function(obj2){
            return val.indexOf(obj2[prop]) !== -1 && ["", undefined, null].indexOf(obj2[prop]) == -1;
        });
    },
    filter_prop_notarr: function(obj,prop,val){
        return obj.filter(function(obj2){
            return val.indexOf(obj2[prop]) == -1;
        });
    },
    //objetos obj que estén en el objeto 2 obj2 se eliminan del obj, se compara por propiedad
    filter_prop_arr_diff: function(obj,prop,obj2,prop2){
        var listado = [];
        $.each(obj2, function(i,val){
            if( listado.indexOf(val[prop2]) == -1)
                listado.push(val[prop2]);
        });
        return obj.filter(function(o){
            return listado.indexOf(o[prop]) == -1;
        });
    },
    filter_prop_arr_or: function(obj,props,vals){
        return obj.filter(function(obj2){
            var res = false;
            $.each(props, function(i,prop){
                if(vals[i].indexOf(obj2[prop]) !== -1)
                    res = true;
            });
            return res;
        });
    },
    filter_prop_er: function(obj,prop,er){
        return obj.filter(function(obj2){
            return er.test(obj2[prop]);
        });
    },
    filter_prop_noter: function(obj,prop,er){
        return obj.filter(function(obj2){
            return !er.test(obj2[prop]);
        });
    },
    filter_len: function(obj,prop,len){
        return obj.filter(function(obj2){
            return obj2[prop].length > len;
        });
    },
    filterdiff_prop: function(obj,prop,val){
        return obj.filter(function(obj2){
            return val.indexOf(obj2[prop]) === -1;
        });
    },
    filterdiff_prop_or: function(obj,props,vals){
        return obj.filter(function(obj2){
            var res = false;
            $.each(props, function(i,prop){
                if(vals[i].indexOf(obj2[prop]) === -1)
                    res = true;
            });
            return res;
        });
    },
    find_prop: function(obj,prop,val){
        return obj.find(function(obj2){
            return obj2[prop] == val;
        });
    },
    find_prop2: function(obj,prop1,prop2,val1,val2){
        return obj.find(function(obj2){
            return eval('obj2.' + prop1 + '== val1 && obj2.' + prop2 + '== val2');
        });
    },
    cleanHtml: function(str){
        return new DOMParser().parseFromString(str, 'text/html').body.textContent.replace(/(\n|\r|\t)/gm, '').trim().replaceAll("'","''").replaceAll("‘", '"').replaceAll("’", '"').replaceAll("“",'"').replaceAll("”",'"');
    },
    order_by: function(key, order = 'asc') {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
          }

          const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase().trim() : a[key];
          const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase().trim() : b[key];

          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order === 'desc') ? (comparison * -1) : comparison
          );
        };
    },
    order_by_arr: function(key_arr, order = 'asc') {
        return function(a, b) {
            var ev = '';
            $.each(key_arr, function(i,val){
                if( ev !== '' ){
                    ev += '||'
                }
                ev += 'a[key_arr['+i+']] - b[key_arr['+i+']]';
            });
            return eval(ev);
        };
    },
    getRandomColor: function() {
        var letters1 = '0123456789ABCDEF';
        var letters2 = 'CDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            if ( [0,2,4].indexOf(i) !== -1)
                var l = letters2[Math.floor(Math.random() * 4)];
            else
                var l = letters1[Math.floor(Math.random() * 16)];
            color += l;
        }
        return color;
    },
    getRandomColorF: function() {
        /*
        // Generar un color aleatorio en formato hexadecimal
        let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        // Agregar la opacidad al color
        let colorConOpacidad = color + Math.floor(opacidad * 255).toString(16);
        return colorConOpacidad;*/
        var colores = ['rgb(255,255,255)', 'rgb(0,0,0)', 'rgb(31,31,36)', 'rgb(0,35,34)'];
        var color = 'rgb(255,255,255)';
        
        while(colores.indexOf(color) !== -1){
            color = Highcharts.color(Highcharts.getOptions().colors[Math.floor(Math.random() * 10)]).brighten((Math.floor(Math.random() * 5) - 3) / 7).get();
        }
        
        return color;
    },
    unique: function(obj,prop){
        var arr = [];
        $.each(obj, function(i, val){
			if( arr.indexOf(val[prop]) == -1){
				arr.push(val[prop]);
			}
		});
		return arr;
    },
    unique_obj: function(obj,prop){
        var arr = [];
        var arr_prop = [];
        $.each(obj, function(i, val){
			if( arr_prop.indexOf(val[prop]) == -1){
				arr.push(val);
                                arr_prop.push(val[prop]);
			}
		});
		return arr;
    },
    unique_arr: function(obj,prop){
        var utils_arr = [];
        var arr = [];
        $.each(obj, function(i, val){
            var props = '';
            $.each(prop, function(i2, val2){
                props = props + '-' + val[val2];
            });
            if( utils_arr.indexOf(props) == -1){
		utils_arr.push(props);
                arr.push(val);
            }
	});
	return arr;
    },
    slug: function(e){
        var dicc = {'á':'a','à':'a','â':'a','ã':'a','ä':'a','å':'a','ā':'a','ă':'a','ą':'a','Á':'a','Â':'a','Ã':'a','Ä':'a','Å':'a','Ā':'a','Ă':'a','Ą':'a',
            'é':'e','è':'e','é':'e','ê':'e','ë':'e','ē':'e','ĕ':'e','ė':'e','ę':'e','ě':'e','Ē':'e','Ĕ':'e','Ė':'e','Ę':'e','Ě':'e',
            'í':'i','ì':'i','î':'i','ï':'i','ì':'i','ĩ':'i','ī':'i','ĭ':'i','Ì':'i','Í':'i','Î':'i','Ï':'i','Ì':'i','Ĩ':'i','Ī':'i','Ĭ':'i',
            'ó':'o','ô':'o','õ':'o','ö':'o','ō':'o','ŏ':'o','ő':'o','Ò':'o','Ó':'o','Ô':'o','Õ':'o','Ö':'o','Ō':'o','Ŏ':'o','Ő':'o',
            'ú':'u','ü':'u','u':'u','ù':'u','û':'u','ũ':'u','ū':'u','ŭ':'u','ů':'u','Ù':'u','Ú':'u','Û':'u','Ü':'u','Ũ':'u','Ū':'u','Ŭ':'u','Ů':'u',
            'ç':'c','Ç':'c','ÿ':'y','&':'-',',':'-','.':'-','Ñ':'n','Š':'s','š':'s','ş':'s','Ş':'s','Ž':'z','ž':'z','Ý':'y','Þ':'b','ß':'s','ø':'o','ý':'y','þ':'b',
            ' ':'-','.':'-','&':'-',',':'-','ñ':'n'};
        var str = e.toLowerCase().split('').map(letra=>dicc[letra] || letra).join('');
        
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-') // collapse dashes
            .replace(/-$/g, '') // collapse dashes
            .replace(/^-/g, ''); // collapse dashes
            
        return str;
    },
    sslug:function(str){
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaeeeeiiiioooouuuunc------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    },
    setWithExpiry: function(key, value, ttl){
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
        try{
            localStorage.setItem(key, JSON.stringify(item))
        } catch(e){
            localStorage.clear();
            try{
                localStorage.setItem(key, JSON.stringify(item))
            }catch(e){
                console.log('Imposible guardar');
            }
        }
    },
    getWithExpiry: function(key) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value
    }
}

$(class_utils.ready);