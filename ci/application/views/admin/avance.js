class_av = {
    cons: {
        DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
    },   
    var: {
        usuariosJSON: [],
        analistasJSON: [],
        avance_por_mes: [],
        init: true,
        url_oai: '',
        data: '',
        revistas: '',
        revista: {},
        registros:{},
        tabla: '<table id="tbl_analistas" class="display responsive nowrap" style="width:100%;font-size:11px">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th rowspan="1">Analista</th>' +
                                    '<th rowspan="1">En revisión</th>' +
                                    '<th rowspan="1">Completados</th>' +
                                    '<th rowspan="1">Borrados</th>' +
                                    '<th rowspan="1">Total</th>' +
                                    '<th rowspan="1">% Avance</th>' +
                                    '<th rowspan="1">% Meta departamento</th>' +
                                '</tr>'+
                            '</thead>' +
                            '<tbody id="body_revistas"><body></tbody></table>',
        tr: '<tr><td><usuario></td><td><rev></td><td><comp></td><td><borr></td><td><total></td><td><av></td><td><meta></td></td>',
        barra_avance:   '<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="<avance>" aria-valuemin="0" aria-valuemax="100" style="width: <avance>%">' +
                        '<span style="color:black;font-size:11px"><b><mes></b></span><br>' +
                        '<span style="color:black;font-size:11px"><b><avance>%</b></span>' +
                        '</div>',
        barra_avance_esperado:   '<div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%;background-color:#5cb85c47">' +
                        '<span style="color:black"><b>Ene-Mar 25%</b></span>' +
                        '</div>' +
                        '<div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%;background-color:#5cb85c87">' +
                        '<span style="color:black"><b>Abr-Jun 50%</b></span>' +
                        '</div>' +
                        '<div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%;background-color:#5cb85cc7">' +
                        '<span style="color:black"><b>Jul-Sept 75%</b></span>' +
                        '</div>' +
                        '<div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%;background-color:#5cb85c">' +
                        '<span style="color:black"><b>Oct-Dic 100%</b></span>' +
                        '</div>'
    },
    initClient: function() {
        $.when(class_utils.getResource('/datos/avance/'),
                class_utils.getResource('/datos/avance_total/')
        ) 
        .then(function(resp_analistas, resp_total){
            class_av.var.analistasJSON = resp_analistas[0];
            class_av.var.avance_por_mes = resp_total[0];
            class_av.setTabla(class_av.var.analistasJSON);
            loading.end();
        });
    },
    ready: function(){
        loading.start();
        class_av.initClient();
    },
    setTabla: function(data){
        var tbody = '';
        var total_departamento = 30000;
        var total_meta = 0;
        $.each(data, function(i, val){
			if( val['nombre'] !== 'EDITOR' || cons.rol.val == 'Administrador'){
				var num = parseInt(val['revision']) + parseInt(val['completados']) + parseInt(val['borrados']);
				var num2 = parseInt(val['completados']);
				var avance =  (num - parseInt(val['revision'])) / parseInt(val['total']);
				var meta = num2 / total_departamento;
				total_meta += num2;
				var tr = class_av.var.tr.replace('<usuario>', val['analista'])
								.replace('<rev>', val['revision'])
								.replace('<comp>', val['completados'])
								.replace('<borr>', val['borrados'])
								.replace('<total>', val['total'])
								.replace('<av>', ( avance * 100 ).toFixed(2) + ' %' )
								.replace('<meta>', ( meta * 100 ).toFixed(2) + ' %' );
				tbody += tr;
			}
        });
        
        //$('.progress').html(class_av.var.barra_avance.replaceAll('<avance>', ( total_meta/total_departamento*100 ).toFixed(2)));
        var bar_progress = '';
        var avance_total = 0;
        $.each(class_av.var.avance_por_mes, function(i, val){
            var tmp = class_av.var.barra_avance;
            avance_total += parseFloat(val.total);
            if(i%2 !== 0){
               tmp = tmp.replaceAll('progress-bar-striped', '');
            }
            bar_progress += tmp.replaceAll('<avance>', ( val.total/total_departamento*100 ).toFixed(2)).replaceAll('<mes>', class_utils.cons.meses[val.mes]);
        });
        $('#avance_total').html(avance_total.toLocaleString().replaceAll('.', ','));
        $('.progress').html(bar_progress);
        $('.progress.esperado').html(class_av.var.barra_avance_esperado);
        
        var tabla = class_av.var.tabla
                .replace('<body>', tbody);
        
        $('#div_tabla').html(tabla);
        var op = {
                        order: [[ 0, 'asc' ]],
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
                                targets: [0,1,2,3,4,5,6]
                            }
                        ],
                        //Reajusta el ancho de las columnas
                        drawCallback: function( settings ) {
                            $(this).DataTable().columns.adjust();
                            //class_av.control();
                        }
                    }; 
        class_utils.setTabla('tbl_analistas', op);
        
    }
};

$(class_av.ready);



