class_av = {
    cons: {
        DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
    },   
    var: {
        usuariosJSON: [],
        analistasJSON: [],
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
                        '<span style="color:black"><b><avance> %</b></span>' +
                        '</div>'
    },
    initClient: function() {
        $.when(class_utils.getResource('/datos/avance/')) 
        .then(function(resp_analistas){
            class_av.var.analistasJSON = resp_analistas;
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
            var num = parseInt(val['revision']) + parseInt(val['completados']) + parseInt(val['borrados']);
            var num2 = parseInt(val['revision']) + parseInt(val['completados']);
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
        });
       
        $('.progress').html(class_av.var.barra_avance.replaceAll('<avance>', ( total_meta/total_departamento*100 ).toFixed(2)));
        
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



