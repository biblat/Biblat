class_av = {
    cons: {
        DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
    },   
    var: {
        usuariosJSON: [],
        analistasJSON: [],
        avance_por_mes: [],
		avance_pc: [],
        init: true,
        url_oai: '',
        data: '',
        revistas: '',
        revista: {},
        registros:{},
		anio: null,
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
		tablaPC: '<table id="tbl_analistasPC" class="display responsive nowrap" style="width:100%;font-size:11px">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th rowspan="1">Analista</th>' +
                                    '<th rowspan="1">En revisión PC</th>' +
                                    '<th rowspan="1">Completados PC</th>' +
                                    '<th rowspan="1">Total PC</th>' +
                                    '<th rowspan="1">% Avance</th>' +
                                '</tr>'+
                            '</thead>' +
                            '<tbody id="body_revistas"><body></tbody></table>',
        tr: '<tr><td><usuario></td><td><rev></td><td><comp></td><td><borr></td><td><total></td><td><av></td><td><meta></td></tr>',
		trPC: '<tr><td><usuario></td><td><rev></td><td><comp></td><td><total></td><td><av></td></tr>',
        tabla_prod: '<table id="tbl_produccion" class="display responsive nowrap" style="width:50%;font-size:11px">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th rowspan="1" style="width:200px">Analista</th>' +
                                    '<th rowspan="1" style="width:200px">CLASE</th>' +
                                    '<th rowspan="1" style="width:200px">PERIÓDICA</th>' +
                                    '<th rowspan="1" style="width:200px">Hrs totales</th>' +
									'<th rowspan="1" style="width:200px">Días trabajados</th>' +
                                    '<th rowspan="1" style="width:200px">Hrs trabajadas</th>' +
                                    '<th rowspan="1" style="width:200px">% Hrs de trabajo</th>' +
                                    '<th rowspan="1" style="width:200px">Tiempo mínimo</th>' +
                                    '<th rowspan="1" style="width:200px">Tiempo máximo</th>' +
                                    '<th rowspan="1" style="width:200px">Tiempo promedio</th>' +
                                '</tr>'+
                            '</thead>' +
                            '<tbody id="body_produccion"><body></tbody></table>',
		tabla_prod_analista: '<table id="tbl_produccion" class="display responsive nowrap" style="width:50%;font-size:11px">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th rowspan="1" style="width:200px">Analista</th>' +
                                    '<th rowspan="1" style="width:200px">CLASE</th>' +
                                    '<th rowspan="1" style="width:200px">PERIÓDICA</th>' +
                                    '<th rowspan="1" style="width:200px">Total</th>' +
                                '</tr>'+
                            '</thead>' +
                            '<tbody id="body_produccion"><body></tbody></table>',
        tr_prod: '<tr><td><usuario></td><td><cla></td><td><per></td>' +
                    '<td><hr_to></td>' +
					'<td><dias></td>' +
                    '<td><hr_tr></td>' +
                    '<td><hr_p></td>' +
                    '<td><t_min></td>' +
                    '<td><t_max></td>' +
                    '<td><t_prom></td> </tr>',
		tr_prod_analista: '<tr><td><usuario></td><td><cla></td><td><per></td><td><total></td> </tr>',
        barra_avance:   '<div id="<id>" class="progress-bar progress-bar-warning progress-bar-striped avance-mes" role="progressbar" aria-valuenow="<avance>" aria-valuemin="0" aria-valuemax="100" style="width: <avance>%">' +
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
                        '</div>',
        tproduccion: [],
		tproduccionpc: []
    },
    initClient: function() {
		$.when(class_utils.getResource('/datos/avance/'),
			class_utils.getResource('/datos/avance_total/'),
			class_utils.getResource('/datos/avancepc/')
		)  
		.then(function(resp_analistas, resp_total, resp_avancepc){
			class_av.var.analistasJSON = resp_analistas[0];
			class_av.var.avance_por_mes = resp_total[0];
			class_av.var.avance_pc = resp_avancepc[0];
			class_av.setTabla(class_av.var.analistasJSON);
			if(cons.rol.val == 'Administrador' || cons.pal_cla.val == '1'){
				class_av.setTablaPC(class_av.var.avance_pc);
			}
			if(cons.rol.val == 'Administrador'){
				$('.avance-mes, #avance-actual').css('cursor', 'pointer');
				class_av.control_admin();
			}else{
                $('.avance-mes, #avance-actual').css('cursor', 'pointer');
                class_av.control_analista();
            }
			loading.end();
		});
    },
    ready: function(){
        loading.start();
        class_av.initClient();
    },
    control_admin: function(){
		$('#btn-anio').off('click').on('click', function(){
            loading.start();
            var anio = (new Date(Date.now())).getFullYear()-1;
            class_av.var.anio = anio;
            $.when(class_utils.getResource('/datos/avance/'+anio),
                class_utils.getResource('/datos/avance_total/'+anio),
                class_utils.getResource('/datos/avancepc/'+anio)
            ) 
            .then(function(resp_analistas, resp_total, resp_avancepc){
                class_av.var.analistasJSON = resp_analistas[0];
                class_av.var.avance_por_mes = resp_total[0];
                class_av.var.avance_pc = resp_avancepc[0];
                class_av.setTabla(class_av.var.analistasJSON);
                if(cons.rol.val == 'Administrador' || cons.pal_cla.val == '1'){
                    class_av.setTablaPC(class_av.var.avance_pc);
                }
                if(cons.rol.val == 'Administrador'){
					$('.avance-mes').show();
                    $('.avance-mes, #avance-actual').css('cursor', 'pointer');
                    class_av.control_admin();
                }
                loading.end();
				$('#btn-anio').html('Ver año actual');
                $('#btn-anio').off('click').on('click', function(){
                   window.location.reload(); 
                });
            });
        });
		
        $('.avance-mes').off('click').on('click', function(){
            loading.start();
           var mes = this.id;
           var anio = class_av.var.anio;
            if(anio == null){
                anio = (new Date(Date.now())).getFullYear();
            }
            $.when( 
                    class_utils.getResource('/datos/produccion/'+mes+'/'+anio),
                    class_utils.getResource('/datos/tiempo_produccion/'+mes+'/'+anio),
                    class_utils.getResource('/datos/produccionpc/'+mes+'/'+anio),
                    class_utils.getResource('/datos/tiempo_produccionpc/'+mes+'/'+anio) 
            )
            .then(function(resp_produccion, resp_tproduccion, resp_produccionpc, resp_tproduccionpc){
                class_av.var.tproduccion = resp_tproduccion[0];
                class_av.var.tproduccionpc = resp_tproduccionpc[0];
                class_av.setTablaProd(resp_produccion[0]);
                class_av.setTablaProdPC(resp_produccionpc[0]);
                class_av.setGraficaProd();
                class_av.setGraficaProdPC();
                loading.end();
            });
        });
        $('#avance-actual').off('click').on('click', function(){
           class_av.ready();
        });
    },
	control_analista: function(){
        $('#btn-anio').off('click').on('click', function(){
            loading.start();
            var anio = (new Date(Date.now())).getFullYear()-1;
            class_av.var.anio = anio;
            $.when(class_utils.getResource('/datos/avance/'+anio),
                class_utils.getResource('/datos/avance_total/'+anio),
                class_utils.getResource('/datos/avancepc/'+anio)
            ) 
            .then(function(resp_analistas, resp_total, resp_avancepc){
                class_av.var.analistasJSON = resp_analistas[0];
                class_av.var.avance_por_mes = resp_total[0];
                class_av.var.avance_pc = resp_avancepc[0];
                class_av.setTabla(class_av.var.analistasJSON);
                if(cons.rol.val == 'Administrador' || cons.pal_cla.val == '1'){
                    class_av.setTablaPC(class_av.var.avance_pc);
                }
                if(cons.rol.val == 'Administrador'){
                    $('.avance-mes').show();
                    $('.avance-mes, #avance-actual').css('cursor', 'pointer');
                    class_av.control_admin();
                }else{
                    $('.avance-mes').show();
                    $('.avance-mes, #avance-actual').css('cursor', 'pointer');
                    class_av.control_analista();
                }
                loading.end();
                $('#btn-anio').html('Ver año actual');
                $('#btn-anio').off('click').on('click', function(){
                   window.location.reload(); 
                });
            });
        });
        
        $('.avance-mes').off('click').on('click', function(){
            loading.start();
           var mes = this.id;
           var anio = class_av.var.anio;
            if(anio == null){
                anio = (new Date(Date.now())).getFullYear();
            }
            $.when( 
                    class_utils.getResource('/datos/produccion_analista/'+mes+'/'+anio),
                    class_utils.getResource('/datos/produccionpc/'+mes+'/'+anio)
            )
            .then(function(resp_produccion, resp_produccionpc){
                class_av.setTablaProdAnalista(resp_produccion[0]);
                if(cons.pal_cla.val == '1'){
                    class_av.setTablaProdPCAnalista(resp_produccionpc[0]);
                }
                loading.end();
            });
        });
        $('#avance-actual').off('click').on('click', function(){
           class_av.ready();
        });
    },
    setTabla: function(data){
        var tbody = '';
        var total_departamento = 30958;
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
            var pre_total = avance_total;
            var tmp = class_av.var.barra_avance;
            avance_total += parseFloat(val.total);
            
            if(avance_total > total_departamento){
                val.total = total_departamento - pre_total;
                $('#conseguida').show();
                setTimeout(function(){
                    $(".esperado").after('<div class="firework"></div>');
                },1000);
                setTimeout(function(){
                    $(".esperado").after('<div class="firework2"></div>');
                },2000);
                setTimeout(function(){
                    $(".esperado").after('<div class="firework3"></div>');
                },3000);
            }
            
            if(i%2 !== 0){
               tmp = tmp.replaceAll('progress-bar-striped', '');
            }
            tmp = tmp.replace('<id>', val.mes);
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
        
    },
	setTablaPC: function(data){
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
                var tr = class_av.var.trPC.replace('<usuario>', val['analista'])
                                .replace('<rev>', val['revision'])
                                .replace('<comp>', val['completados'])
                                .replace('<total>', val['total'])
                                .replace('<av>', ( avance * 100 ).toFixed(2) + ' %' );
                                //.replace('<meta>', ( meta * 100 ).toFixed(2) + ' %' );
                tbody += tr;
            }
        });
        
        var tabla = class_av.var.tablaPC
                .replace('<body>', tbody);
        
        $('#div_tablaPC').html(tabla);
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
                                targets: [0,1,2,3,4]
                            }
                        ],
                        //Reajusta el ancho de las columnas
                        drawCallback: function( settings ) {
                            $(this).DataTable().columns.adjust();
                            //class_av.control();
                        }
                    }; 
        class_utils.setTabla('tbl_analistasPC', op);
        
    },
    setTablaProd: function(data){
        var tbody = '';
        var categorias = class_utils.unique_obj(class_av.var.tproduccion,'fecha').map(fechas => fechas.fecha);
        var usuarios = class_utils.unique_obj(class_av.var.tproduccion,'usuario').map(usuario => usuario.usuario);
        var usuarios2 = [];
        var articulos = {};
        var maximo = {};
        var minimo = {};
        
        $.each(usuarios, function(i, val){
            var obj = {};
            obj.name = val;
            var filtro = class_utils.filter_prop(class_av.var.tproduccion, 'usuario', val);
            var dias = class_utils.unique_obj(filtro,'fecha').map(fechas => fechas.fecha);
            articulos[val] = [];
            maximo[val] = [];
            minimo[val] = [];
            
            articulos[val] = filtro.length;
            if(filtro.length > 0){
                maximo[val] = filtro.reduce((max, obj) => Math.max(max, obj.tiempo), -Infinity);
                minimo[val] = filtro.reduce((min, obj) => Math.min(min, obj.tiempo), Infinity);
            }else{
                maximo[val] = 0;
                minimo[val] = 0;
            }
            
            obj.totalSeconds = (filtro
                                .map(res => res.tiempo)
                                .filter(tiempo => !isNaN(tiempo))
                                .map(tiempo => Number(tiempo) / 1000 )
                                .reduce((total, tiempo) => parseFloat((total + tiempo).toFixed(2)), null));
            
            obj.maxSeconds = Number(maximo[val])/1000;
            obj.minSeconds = Number(minimo[val])/1000;
            obj.hours = Math.floor(obj.totalSeconds / 3600);
            obj.minutes = Math.floor((obj.totalSeconds % 3600) / 60);
            obj.seconds = Math.floor(obj.totalSeconds % 60);
            obj.minutesMax = Math.floor((obj.maxSeconds % 3600) / 60);
            obj.secondsMax = Math.floor(obj.maxSeconds % 60);
            obj.minutesMin = Math.floor((obj.minSeconds % 3600) / 60);
            obj.secondsMin = Math.floor(obj.minSeconds % 60);
            
            obj.promedio = obj.totalSeconds / articulos[val];
            obj.promMinutes = Math.floor((obj.promedio % 3600) / 60);
            obj.promSeconds = Math.floor(obj.promedio % 60);
			obj.dias = dias.length;
            
            usuarios2.push(obj);
        });
        
        $.each(data, function(i, val){
                var nombre = val['nombre'].replace(',', '').replace('OJS', '').replace('SciELO', '').replace(' ', '');
                var us = class_utils.find_prop(usuarios2, 'name', nombre);
                if(us == undefined){
                    us = {};
                    us.hours = '00';
                    us.minutes = '00';
                    us.seconds = '00';
                    us.porcentaje = 'N/A';
                    us.minutesMin = '00';
                    us.secondsMin = '00';
                    us.minutesMax = '00';
                    us.secondsMax = '00';
                    us.promMinutes = '00';
                    us.promSeconds = '00';
                }
                
                us.porcentaje = (us.totalSeconds/(categorias.length * 8 * 60 * 60) * 100).toFixed(2) + '%';
                
                var tr = class_av.var.tr_prod.replace('<usuario>', val['nombre'])
                                .replace('<cla>', val['clase'])
								.replace('<dias>', us.dias || 0)
                                .replace('<per>', val['periodica'])
                                .replace('<hr_to>', (categorias.length * 8) + 'h' )
                                .replace('<hr_tr>', (us.hours+'').padStart(2, '0') + 'h ' + (us.minutes+'').padStart(2, '0') + 'm ' + (us.seconds+'').padStart(2, '0') + 's' )
                                .replace('<hr_p>', (us.porcentaje+'').replace('NaN','00').padStart(6, '0') )
                                .replace('<t_min>', (us.minutesMin+'').padStart(2, '0') + 'm ' + (us.secondsMin+'').padStart(2, '0') + 's'  )
                                .replace('<t_max>', (us.minutesMax+'').padStart(2, '0') + 'm ' + (us.secondsMax+'').padStart(2, '0') + 's'  )
                                .replace('<t_prom>', (us.promMinutes+'').padStart(2, '0') + 'm ' + (us.promSeconds+'').padStart(2, '0') + 's'  )
                                ;
                tbody += tr;
        });
                
        var tabla = class_av.var.tabla_prod
                .replace('<body>', tbody);
        
        $('#div_tabla').html(tabla);
        
        var op = {
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                extend: 'csvHtml5',
                                text: 'Exportar CSV',
                                exportOptions: {
                                    columns: [0,1,2,3,4,5,6,7,8,9]
                                }
                            }
                        ],
                        order: [[ 0, 'asc' ]],
                        bLengthChange: false,
                        paging: false,
                        pagingType: 'input',
                        autoWidth: true,
                        columnDefs: [
                            {
                                render: function (data, type, full, meta) {
                                    //Sustituye el valor de la celda por esto agregando un div para que se mantenga dentro del tamaño definido
                                    return '<div style="width: 100%; text-align: left; white-space: normal;">' + data + '</div>';
                                },
                                targets: [0,1,2]
                            }
                        ],
                        //Reajusta el ancho de las columnas
                        drawCallback: function( settings ) {
                            $(this).DataTable().columns.adjust();
                        }
                    }; 
        class_utils.setTabla('tbl_produccion', op);
        
    },
	setTablaProdAnalista: function(data){
        var tbody = '';
        
        $.each(data, function(i, val){
			if (val['nombre'].indexOf('EDITOR') < 0){
                var tr = class_av.var.tr_prod_analista.replace('<usuario>', val['nombre'])
                                .replace('<cla>', val['clase'])
                                .replace('<per>', val['periodica'])
                                .replace('<total>', val['total'] );
                tbody += tr;
			}
        });
                
        var tabla = class_av.var.tabla_prod_analista
                .replace('<body>', tbody);
        
        $('#div_tabla').html(tabla);
        
        var op = {
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                extend: 'csvHtml5',
                                text: 'Exportar CSV',
                                exportOptions: {
                                    columns: [0,1,2,3]
                                }
                            }
                        ],
                        order: [[ 0, 'asc' ]],
                        bLengthChange: false,
                        paging: false,
                        pagingType: 'input',
                        autoWidth: true,
                        columnDefs: [
                            {
                                render: function (data, type, full, meta) {
                                    //Sustituye el valor de la celda por esto agregando un div para que se mantenga dentro del tamaño definido
                                    return '<div style="width: 100%; text-align: left; white-space: normal;">' + data + '</div>';
                                },
                                targets: [0,1,2,3]
                            }
                        ],
                        //Reajusta el ancho de las columnas
                        drawCallback: function( settings ) {
                            $(this).DataTable().columns.adjust();
                        }
                    }; 
        class_utils.setTabla('tbl_produccion', op);
        
    },
	setTablaProdPC: function(data){
        var tbody = '';
        var categorias = class_utils.unique_obj(class_av.var.tproduccionpc,'fecha').map(fechas => fechas.fecha);
        var usuarios = class_utils.unique_obj(class_av.var.tproduccionpc,'usuario').map(usuario => usuario.usuario);
        var usuarios2 = [];
        var articulos = {};
        var maximo = {};
        var minimo = {};
        
        $.each(usuarios, function(i, val){
            var obj = {};
            obj.name = val;
            var filtro = class_utils.filter_prop(class_av.var.tproduccionpc, 'usuario', val);
            articulos[val] = [];
            maximo[val] = [];
            minimo[val] = [];
            
            articulos[val] = filtro.length;
            if(filtro.length > 0){
                maximo[val] = filtro.reduce((max, obj) => Math.max(max, obj.tiempo), -Infinity);
                minimo[val] = filtro.reduce((min, obj) => Math.min(min, obj.tiempo), Infinity);
            }else{
                maximo[val] = 0;
                minimo[val] = 0;
            }
            
            obj.totalSeconds = (filtro
                                .map(res => res.tiempo)
                                .filter(tiempo => !isNaN(tiempo))
                                .map(tiempo => Number(tiempo) / 1000 )
                                .reduce((total, tiempo) => parseFloat((total + tiempo).toFixed(2)), null));
            
            obj.maxSeconds = Number(maximo[val])/1000;
            obj.minSeconds = Number(minimo[val])/1000;
            obj.hours = Math.floor(obj.totalSeconds / 3600);
            obj.minutes = Math.floor((obj.totalSeconds % 3600) / 60);
            obj.seconds = Math.floor(obj.totalSeconds % 60);
            obj.minutesMax = Math.floor((obj.maxSeconds % 3600) / 60);
            obj.secondsMax = Math.floor(obj.maxSeconds % 60);
            obj.minutesMin = Math.floor((obj.minSeconds % 3600) / 60);
            obj.secondsMin = Math.floor(obj.minSeconds % 60);
            
            obj.promedio = obj.totalSeconds / articulos[val];
            obj.promMinutes = Math.floor((obj.promedio % 3600) / 60);
            obj.promSeconds = Math.floor(obj.promedio % 60);
            
            usuarios2.push(obj);
        });
        
        $.each(data, function(i, val){
                var nombre = val['nombre'].replace(',', '').replace('OJS', '').replace('SciELO', '').replace(' ', '');
                var us = class_utils.find_prop(usuarios2, 'name', nombre);
                if(us == undefined){
                    us = {};
                    us.hours = '00';
                    us.minutes = '00';
                    us.seconds = '00';
                    us.porcentaje = 'N/A';
                    us.minutesMin = '00';
                    us.secondsMin = '00';
                    us.minutesMax = '00';
                    us.secondsMax = '00';
                    us.promMinutes = '00';
                    us.promSeconds = '00';
                }
                
                us.porcentaje = (us.totalSeconds/(categorias.length * 8 * 60 * 60) * 100).toFixed(2) + '%';
                
                var tr = class_av.var.tr_prod.replace('<usuario>', val['nombre'])
                                .replace('<cla>', val['clase'])
                                .replace('<per>', val['periodica'])
                                .replace('<hr_to>', (categorias.length * 8) + 'h' )
                                .replace('<hr_tr>', (us.hours+'').padStart(2, '0') + 'h ' + (us.minutes+'').padStart(2, '0') + 'm ' + (us.seconds+'').padStart(2, '0') + 's' )
                                .replace('<hr_p>', (us.porcentaje+'').replace('NaN','00').padStart(6, '0') )
                                .replace('<t_min>', (us.minutesMin+'').padStart(2, '0') + 'm ' + (us.secondsMin+'').padStart(2, '0') + 's'  )
                                .replace('<t_max>', (us.minutesMax+'').padStart(2, '0') + 'm ' + (us.secondsMax+'').padStart(2, '0') + 's'  )
                                .replace('<t_prom>', (us.promMinutes+'').padStart(2, '0') + 'm ' + (us.promSeconds+'').padStart(2, '0') + 's'  )
                                ;
                tbody += tr;
        });
                
        var tabla = class_av.var.tabla_prod
                .replace('<body>', tbody)
                .replace('tbl_produccion', 'tbl_produccionPC');
        
        $('#div_tablaPC').html(tabla);
        
        var op = {
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                extend: 'csvHtml5',
                                text: 'Exportar CSV',
                                exportOptions: {
                                    columns: [0,1,2,3,4,5,6,7,8]
                                }
                            }
                        ],
                        order: [[ 0, 'asc' ]],
                        bLengthChange: false,
                        paging: false,
                        pagingType: 'input',
                        autoWidth: true,
                        columnDefs: [
                            {
                                render: function (data, type, full, meta) {
                                    //Sustituye el valor de la celda por esto agregando un div para que se mantenga dentro del tamaño definido
                                    return '<div style="width: 100%; text-align: left; white-space: normal;">' + data + '</div>';
                                },
                                targets: [0,1,2]
                            }
                        ],
                        //Reajusta el ancho de las columnas
                        drawCallback: function( settings ) {
                            $(this).DataTable().columns.adjust();
                        }
                    }; 
        class_utils.setTabla('tbl_produccionPC', op);
        
    },
	setTablaProdPCAnalista: function(data){
        var tbody = '';
        
        $.each(data, function(i, val){               
                var tr = class_av.var.tr_prod_analista.replace('<usuario>', val['nombre'])
                                .replace('<cla>', val['clase'])
                                .replace('<per>', val['periodica'])
                                .replace('<total>', parseInt(val['clase']) + parseInt(val['periodica']) );
                tbody += tr;
        });
                
        var tabla = class_av.var.tabla_prod_analista
                .replace('<body>', tbody)
                .replace('tbl_produccion', 'tbl_produccionPC');
        
        $('#div_tablaPC').html(tabla);
        
        var op = {
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                extend: 'csvHtml5',
                                text: 'Exportar CSV',
                                exportOptions: {
                                    columns: [0,1,2]
                                }
                            }
                        ],
                        order: [[ 0, 'asc' ]],
                        bLengthChange: false,
                        paging: false,
                        pagingType: 'input',
                        autoWidth: true,
                        columnDefs: [
                            {
                                render: function (data, type, full, meta) {
                                    //Sustituye el valor de la celda por esto agregando un div para que se mantenga dentro del tamaño definido
                                    return '<div style="width: 100%; text-align: left; white-space: normal;">' + data + '</div>';
                                },
                                targets: [0,1,2]
                            }
                        ],
                        //Reajusta el ancho de las columnas
                        drawCallback: function( settings ) {
                            $(this).DataTable().columns.adjust();
                        }
                    }; 
        class_utils.setTabla('tbl_produccionPC', op);
        
    },
    setGraficaProd: function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartColumn2));
        var categorias = class_utils.unique_obj(class_av.var.tproduccion,'fecha').map(fechas => fechas.fecha);
        var usuarios = class_utils.unique_obj(class_av.var.tproduccion,'usuario').map(usuario => usuario.usuario);
        var series = [];
        var articulos = {};
        var maximo = {};
        var minimo = {};
        
        $.each(usuarios, function(i, val){
            var obj = {};
            obj.name = val;
            var filtro = class_utils.filter_prop(class_av.var.tproduccion, 'usuario', val);
            obj.data = [];
            articulos[val] = [];
            maximo[val] = [];
            minimo[val] = [];
            
            $.each(categorias, function(i2, val2){
                var filtro2 = class_utils.filter_prop(filtro, 'fecha', val2);
                
                articulos[val][val2] = filtro2.length;
                if(filtro2.length > 0){
                    maximo[val][val2] = filtro2.reduce((max, obj) => Math.max(max, obj.tiempo), -Infinity);
                    minimo[val][val2] = filtro2.reduce((min, obj) => Math.min(min, obj.tiempo), Infinity);
                }else{
                    maximo[val][val2] = 0;
                    minimo[val][val2] = 0;
                }
                
               obj.data.push(filtro2
                        .map(res => res.tiempo)
                        .filter(tiempo => !isNaN(tiempo))
                        .map(tiempo => Number(tiempo) / 1000 )
                        .reduce((total, tiempo) => parseFloat((total + tiempo).toFixed(2)), null));
            });
            series.push(obj);
        });
        
        grafica.title.text = 'Tiempo estimado de uso';
        grafica.plotOptions.column = {stacking: "normal"};
        //grafica.plotOptions.series = {events: [], point: {events: []}, dataLabels: {enabled: true, format: "{y:f}"}};
        grafica.plotOptions.series = {events: [], point: {events: []}, dataLabels: {enabled: true}};
        grafica.plotOptions.series.dataLabels.formatter = function () {
            var totalSeconds = this.y;
            var hours = Math.floor(totalSeconds / 3600);
            var minutes = Math.floor((totalSeconds % 3600) / 60);
            var seconds = Math.floor(totalSeconds % 60);
            return hours + 'h ' + minutes + 'm ' + seconds + 's';
          };
        grafica.series = series;
        grafica.stackLabels = {enabled: true};
        grafica.xAxis.categories = categorias;
        grafica.yAxis = {allowDecimals: true, title: {text: "Analista"}, stackLabels: {enabled: true}};
        grafica.yAxis.stackLabels.formatter = function(){
            var totalSeconds = this.total;
            var hours = Math.floor(totalSeconds / 3600);
            var minutes = Math.floor((totalSeconds % 3600) / 60);
            var seconds = Math.floor(totalSeconds % 60);
            return hours + 'h ' + minutes + 'm ' + seconds + 's';
        };
        grafica.tooltip.formatter = function() {
                var totalSeconds = this.y;
                var articuloSeconds = this.y/articulos[this.series.name][this.x];
                var maxSeconds = Number(maximo[this.series.name][this.x])/1000;
                var minSeconds = Number(minimo[this.series.name][this.x])/1000;
                var hours = Math.floor(totalSeconds / 3600);
                var minutes = Math.floor((totalSeconds % 3600) / 60);
                var seconds = Math.floor(totalSeconds % 60);
                var hoursArt = Math.floor(articuloSeconds / 3600);
                var minutesArt = Math.floor((articuloSeconds % 3600) / 60);
                var secondsArt = Math.floor(articuloSeconds % 60);
                var minutesMax = Math.floor((maxSeconds % 3600) / 60);
                var secondsMax = Math.floor(maxSeconds % 60);
                var minutesMin = Math.floor((minSeconds % 3600) / 60);
                var secondsMin = Math.floor(minSeconds % 60);
                
                return '<table style="font-size:11px"><tr><td style="color:'+this.series.color+';padding:0">'+this.series.name+':</td></tr>' +
                        '<tr><td style="padding:0">Artículos: '+ articulos[this.series.name][this.x] +'</td></tr>'+
                        '<tr><td style="padding:0">Tiempo promedio: '+ hoursArt + 'h ' + minutesArt + 'm ' + secondsArt + 's' +'</td></tr>' +
                        '<tr><td style="padding:0">Tiempo máximo: '+ minutesMax + 'm ' + secondsMax + 's' +'</td></tr>' +
                        '<tr><td style="padding:0">Tiempo mínimo: '+ minutesMin + 'm ' + secondsMin + 's' +'</td></tr>' +
                        '<tr><td style="padding:0">Tiempo total: '+ hours + 'h ' + minutes + 'm ' + seconds + 's' +'</td></tr></table>';
            };
        grafica.chart.height='1000px';
        Highcharts.chart('div_tiempos', grafica);
    },
	setGraficaProdPC: function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartColumn2));
        var categorias = class_utils.unique_obj(class_av.var.tproduccionpc,'fecha').map(fechas => fechas.fecha);
        var usuarios = class_utils.unique_obj(class_av.var.tproduccionpc,'usuario').map(usuario => usuario.usuario);
        var series = [];
        var articulos = {};
        var maximo = {};
        var minimo = {};
        
        $.each(usuarios, function(i, val){
            var obj = {};
            obj.name = val;
            var filtro = class_utils.filter_prop(class_av.var.tproduccionpc, 'usuario', val);
            obj.data = [];
            articulos[val] = [];
            maximo[val] = [];
            minimo[val] = [];
            
            $.each(categorias, function(i2, val2){
                var filtro2 = class_utils.filter_prop(filtro, 'fecha', val2);
                
                articulos[val][val2] = filtro2.length;
                if(filtro2.length > 0){
                    maximo[val][val2] = filtro2.reduce((max, obj) => Math.max(max, obj.tiempo), -Infinity);
                    minimo[val][val2] = filtro2.reduce((min, obj) => Math.min(min, obj.tiempo), Infinity);
                }else{
                    maximo[val][val2] = 0;
                    minimo[val][val2] = 0;
                }
                
               obj.data.push(filtro2
                        .map(res => res.tiempo)
                        .filter(tiempo => !isNaN(tiempo))
                        .map(tiempo => Number(tiempo) / 1000 )
                        .reduce((total, tiempo) => parseFloat((total + tiempo).toFixed(2)), null));
            });
            series.push(obj);
        });
        
        grafica.title.text = 'Tiempo estimado de uso en palabras clave';
        grafica.plotOptions.column = {stacking: "normal"};
        //grafica.plotOptions.series = {events: [], point: {events: []}, dataLabels: {enabled: true, format: "{y:f}"}};
        grafica.plotOptions.series = {events: [], point: {events: []}, dataLabels: {enabled: true}};
        grafica.plotOptions.series.dataLabels.formatter = function () {
            var totalSeconds = this.y;
            var hours = Math.floor(totalSeconds / 3600);
            var minutes = Math.floor((totalSeconds % 3600) / 60);
            var seconds = Math.floor(totalSeconds % 60);
            return hours + 'h ' + minutes + 'm ' + seconds + 's';
          };
        grafica.series = series;
        grafica.stackLabels = {enabled: true};
        grafica.xAxis.categories = categorias;
        grafica.yAxis = {allowDecimals: true, title: {text: "Analista"}, stackLabels: {enabled: true}};
        grafica.yAxis.stackLabels.formatter = function(){
            var totalSeconds = this.total;
            var hours = Math.floor(totalSeconds / 3600);
            var minutes = Math.floor((totalSeconds % 3600) / 60);
            var seconds = Math.floor(totalSeconds % 60);
            return hours + 'h ' + minutes + 'm ' + seconds + 's';
        };
        grafica.tooltip.formatter = function() {
                var totalSeconds = this.y;
                var articuloSeconds = this.y/articulos[this.series.name][this.x];
                var maxSeconds = Number(maximo[this.series.name][this.x])/1000;
                var minSeconds = Number(minimo[this.series.name][this.x])/1000;
                var hours = Math.floor(totalSeconds / 3600);
                var minutes = Math.floor((totalSeconds % 3600) / 60);
                var seconds = Math.floor(totalSeconds % 60);
                var hoursArt = Math.floor(articuloSeconds / 3600);
                var minutesArt = Math.floor((articuloSeconds % 3600) / 60);
                var secondsArt = Math.floor(articuloSeconds % 60);
                var minutesMax = Math.floor((maxSeconds % 3600) / 60);
                var secondsMax = Math.floor(maxSeconds % 60);
                var minutesMin = Math.floor((minSeconds % 3600) / 60);
                var secondsMin = Math.floor(minSeconds % 60);
                
                return '<table style="font-size:11px"><tr><td style="color:'+this.series.color+';padding:0">'+this.series.name+':</td></tr>' +
                        '<tr><td style="padding:0">Artículos: '+ articulos[this.series.name][this.x] +'</td></tr>'+
                        '<tr><td style="padding:0">Tiempo promedio: '+ hoursArt + 'h ' + minutesArt + 'm ' + secondsArt + 's' +'</td></tr>' +
                        '<tr><td style="padding:0">Tiempo máximo: '+ minutesMax + 'm ' + secondsMax + 's' +'</td></tr>' +
                        '<tr><td style="padding:0">Tiempo mínimo: '+ minutesMin + 'm ' + secondsMin + 's' +'</td></tr>' +
                        '<tr><td style="padding:0">Tiempo total: '+ hours + 'h ' + minutes + 'm ' + seconds + 's' +'</td></tr></table>';
            };
        grafica.chart.height='1000px';
        Highcharts.chart('div_tiemposPC', grafica);
    }
};

$(class_av.ready);



