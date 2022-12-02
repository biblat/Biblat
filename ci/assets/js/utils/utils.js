class_utils= {
    ready: function(){
    },
    getResource: function(resource) { 
        return $.ajax({url:resource, dataType: 'json', type:'GET', cache:false}); 
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
	chartRadialBar:{
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
        ]
    },				
    filter_prop: function(obj,prop,val){
        return obj.filter(function(obj2){
            return eval('obj2.' + prop + '== val');
        });
    },
	filter_prop_arr: function(obj,prop,val){
        return obj.filter(function(obj2){
            return val.indexOf(obj2[prop]) !== -1;
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
            return eval('obj2.' + prop + '== val');
        });
    },
    find_prop2: function(obj,prop1,prop2,val1,val2){
        return obj.find(function(obj2){
            return eval('obj2.' + prop1 + '== val1' && 'obj2.' + prop2 + '== val2');
        });
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
	unique: function(obj,prop){
        var arr = [];
        $.each(obj, function(i, val){
			if( arr.indexOf(val[prop]) ==	-1){
				arr.push(val[prop]);
			}
		});
		return arr;
    },
    slug: function(e){
        var dicc = {'á':'a','é':'e','í':'i','ó':'o','ú':'u',' ':'-','.':'-','&':'-',',':'-','ñ':'n'};
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
    }
}

$(class_utils.ready);