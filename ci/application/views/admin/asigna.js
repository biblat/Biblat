class_asi = {
    cons: {
        DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
        option_analista: '<option value="<val>"><analista></option>',
        td_num: '<button type="button" class="btn btn-warning nums" id="<anio>__<num>"><num></button>',
    },   
    var: {
        usuariosJSON: [],
        usuariosPCJSON: [],
        revistasJSON: [],
        init: true,
        url_oai: '',
        data: '',
        revistas: '',
        revista: {},
        registros:{},
        select_asigna: '<select id="<id>" class="asigna"><options></select>',
        options_asigna: '',
        options_asigna_pc: '',
        arr_palabras_clave:[],
        generando_pc: false,
        revisa_pc: null,
        tabla: '<table id="tbl_revistas" class="display responsive nowrap" style="width:100%;font-size:11px">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th rowspan="1" style="padding:15px">Revista</th>' +
                                    '<th rowspan="1" style="padding:15px">Base</th>' +
                                    '<th rowspan="1" style="padding:15px">Anio</th>' +
                                    '<th rowspan="1" style="padding:15px">Volumen</th>' +
                                    '<th rowspan="1" style="padding:15px">Número</th>' +
                                    '<th rowspan="1" style="padding:15px">Parte</th>' +
                                    '<th rowspan="1" style="padding:15px">Artículos</th>' +
									'<th rowspan="1" style="padding:15px">Sin PDF</th>' +
                                    '<th rowspan="1" style="width:90px; padding:15px">Ingreso</th>' +
                                    '<th rowspan="1" style="width:90px; padding:15px">Asignado</th>' +
                                    '<th rowspan="1" style="padding:15px">Asignar a:</th>' +
                                    '<th style="padding:15px">Analista</th>' +
                                    '<th rowspan="1" style="padding:15px">Asignado PC</th>' +
                                    '<th rowspan="1" style="padding:15px">Asignar PC a:</th>' +
                                    '<th style="padding:15px">Analista PC</th>' +
                                '</tr>'+
                            '</thead>' +
                            '<tbody id="body_revistas"><body></tbody></table>',
        tr: '<tr><td><revista></td><td><base></td><td><anio></td><td><volumen></td><td><numero></td><td><parte></td><td><articulos></td><td><sinpdf></td><td><ingreso></td><td><asignado></td><td><select_asigna></td><td><vacio></td>' +
            '<td><asignado_pc></td><td><select_asigna_pc></td><td><vacio_pc></td>',
            
    },
    initClient: function() {
        if (class_asi.var.init){
            class_asi.var.init = false;
            var object = {
                private_key: env.P_K,
                client_email: b(env.C_E),
                scopes: class_asi.cons.SCOPES,
            };
            gapi.load("client", async function(){
                gapi.auth.setToken(await GetAccessTokenFromServiceAccount.do(object));
                gapi.client.init({
                    discoveryDocs: class_asi.cons.DISCOVERY_DOCS,
                }).then(function () {
                    //Lectura de hoja de cálculo, se requiere el ID y la hoja de la que leerá
                    gapi.client.sheets.spreadsheets.values.get({
                        spreadsheetId: b(env.sId),
                        range: b(env.s_2),
                    }).then(function(response) {
                        var revistas = response.result.values;
                        var options = '';
                        $.each(revistas, function(i, val){
                                if(i>0){
                                    if(val[1] == 'Analista'){
                                        class_asi.var.usuariosJSON.push(JSON.parse(JSON.stringify(Object.assign({}, val))));
                                        if(val[5] == '1'){
                                            class_asi.var.usuariosPCJSON.push(JSON.parse(JSON.stringify(Object.assign({}, val))));
                                        }
                                    }
                                }
                        });
                        class_asi.var.usuariosJSON.sort(class_utils.order_by(0));
                        options += class_asi.cons.option_analista.replace('<analista>', "Seleccione").replace("<val>", "SIN");
                        $.each(class_asi.var.usuariosJSON, function(i, val){
                            try{
                                options += class_asi.cons.option_analista.replace('<analista>', val[3].trim()).replace("<val>", val[3].trim());
                            } catch (error) {
                                console.log(error);
                            }
                        });
                        class_asi.var.options_asigna = options;
                        
                        options = '';
                        class_asi.var.usuariosPCJSON.sort(class_utils.order_by(0));
                        options += class_asi.cons.option_analista.replace('<analista>', "Seleccione").replace("<val>", "SIN");
                        $.each(class_asi.var.usuariosPCJSON, function(i, val){
                            try{
                                options += class_asi.cons.option_analista.replace('<analista>', val[3].trim()).replace("<val>", val[3].trim());
                            } catch (error) {
                                console.log(error);
                            }
                        });
                        class_asi.var.options_asigna_pc = options;
                        
                        $.when(class_utils.getResource('/datos/revista_estatus/')) 
                        .then(function(resp_revista){
                            class_asi.var.revistasJSON = resp_revista;
                            class_asi.setTabla(class_asi.var.revistasJSON);
                            class_asi.control();
                            loading.end();
                        });
                        
                        $('#revista_sel').show();
                        $('#revista_sel').html(options);
                        $('#revista_sel').select2({ tags: true, placeholder: "Seleccione una Revista", allowClear: true});
                    }).catch(function(){
                        location.reload();
                    });
                }).catch(function(){
                    location.reload();
                });
            });
        }
    },
    ready: function(){
        var anio = (new Date()).getFullYear();
        var anios='';
        for(var i=anio; i>=anio-50; i--){
            anios += '<option value="'+i+'">'+i+'</option>';
        }
        $('#anio').html(anios);
        loading.start();
        class_asi.initClient();
    },
    control: function(){
        $('#revista_sel').off('change').on('change', function(){
            $('#respBiblat').html('');
            $('#respOJS').html('');
            $('#mensajeFin').html('');
        });
        
        $('#anio').off('change').on('change', function(){
            $('#respBiblat').html('');
            $('#respOJS').html('');
            $('#mensajeFin').html('');
        });
        
        $('#btn_biblat').off('click').on('click', function(){
            loading.start();
            $.when(class_utils.getResource('/datos/revista_num/'+class_utils.slug($('#select2-revista_sel-container').text())+'/'+$('#anio').val())) 
            .then(function(resp_biblat){
                if(resp_biblat.length > 0){
                    var txtBiblat = resp_biblat[0].numero.replace('{', '').replace('}', '').replaceAll(',', ', ');
                    $('#respBiblat').html('<b>Números en Biblat:</b> ' + txtBiblat);
                }else{
                    $('#respBiblat').html('<b>Números en Biblat:</b> No se encontraron números en Biblat');
                }
                loading.end();
            });
        });
        
        $('.asigna').off('change').on('change', function(){
            var selected = this;
            var texto = 'Se asignará este número al usuario: <b>' + this.value + '</b>';
            if(this.value == 'SIN'){
                texto = 'Este número quedará <b>SIN ASIGNAR</b>';
            }
            $.confirm({
                title: '',
                content: texto,
                buttons: {
                    cancelar: {
                            text: 'Cancelar',
                            //btnClass: 'btn-red',
                            action: function(){
                                selected.selectedIndex = 0;
                            }
                    },
                    aceptar: {
                            text: 'Aceptar',
                            btnClass: 'btn-warning',
                            action: function(){
                                $.ajax({
                                        type: 'POST',
                                        url: "<?=site_url('metametrics/ws_asigna');?>",
                                        data: class_asi.data_valor_actualiza(selected.id, selected.value),
                                }).done(function() {
                                    class_asi.mensaje('Número actualizado correctamente', function(){location.reload();});
                                });
                            }
                    }
                }
            });
        });
        
        $('.asigna_pc').off('change').on('change', function(){
            var selected = this;
            var texto = 'Se asignará para <b>PALABRAS CLAVE</b> este número al usuario: <b>' + this.value + '</b>';
            if(this.value == 'SIN'){
                texto = 'Este número quedará <b>SIN ASIGNAR</b>';
            }
            $.confirm({
                title: '',
                content: texto,
                buttons: {
                    cancelar: {
                            text: 'Cancelar',
                            //btnClass: 'btn-red',
                            action: function(){
                                selected.selectedIndex = 0;
                            }
                    },
                    aceptar: {
                            text: 'Aceptar',
                            btnClass: 'btn-warning',
                            action: function(){
                                $.ajax({
                                        type: 'POST',
                                        url: "<?=site_url('metametrics/ws_asigna');?>",
                                        data: class_asi.data_valor_actualiza(selected.id, selected.value, true),
                                }).done(function() {
                                    class_asi.mensaje('Número actualizado correctamente', function(){location.reload();});
                                });
                            }
                    }
                }
            });
        });
        
        $('.genera_pc').off('click').on('click', function(){
            var id = this.id.split('_')[2];
            var this_externo =  this;
            $('.genera_pc').css('color', 'gray');
            $('.genera_pc').css('cursor', '');
            $('.genera_pc').off('click');
            class_asi.var.generando_pc = true;
            class_asi.var.revisa_pc = setInterval( function(){ class_asi.revisa_estatus(class_asi.var.arr_palabras_clave[id]) }, 10000 );
            $(this).parent().html('<i class="fa fa-refresh fa-spin" aria-hidden="true" style="color: #ff8000;" data-toggle="tooltip" data-placement="top" title="Generando palabras clave ..."></i>');
            $.when(
                //class_utils.setResource('http://localhost:5001' + '' + '/palabras_clave/', class_asi.var.arr_palabras_clave[id], true)
                class_utils.setResource('https://biblat.unam.mx' + '/scielo-claper' + '/palabras_clave/', class_asi.var.arr_palabras_clave[id], true)
            ).then(function(){
            });
        });
    },
    data_inserta_article: function(){
        var data = {};
        var data_int = [];
        var columns = ['revista', 'articulo', 'issn', 'doi', 'paisRevista', 'anioRevista', 'disciplinaRevista'];
        $.each(class_asi.var.registros.doc, function(i,val){
            var obj = {};
            var objDes = {};
            var arrArt = [];
            var objRes = {};
            var arrURL = [];
            $.each(val.titulo, function(i,val){
                arrArt.push({a: val.titulo, y: class_asi.cons.idiomasTit[val.idioma]});
            });
            
            obj['sistema'] = '';
            obj['revista'] = val.revista;
            obj['articulo'] = (['', undefined, null].indexOf(val.titulo_original) == -1)?val.titulo_original:(arrArt.length > 0)?arrArt[0].a:'';
            obj['issn'] = val.issn;
            obj['doi'] = (val.doi == '')?null:val.doi;
            obj['paisRevista'] = val.pais;
            obj['idioma'] = val.idioma;
            obj['ciudadEditora'] = (val.ciudad_editora == '')?null:val.ciudad_editora;
            obj['institucionEditora'] = (val.institucion_editora == '')?null:val.institucion_editora;
            obj['anioRevista'] = val.anio;
            obj['base'] = val.base;
            if( val.volumen !=='')
                objDes['a'] = val.volumen;
            if( val.numero !=='')
                objDes['b'] = val.numero;
            if( val.parte !=='')
                objDes['d'] = val.parte;
            if( val.paginas !=='')
                objDes['e'] = val.paginas;
            obj['descripcionBibliografica'] = (JSON.stringify(objDes) == '{}')?'':JSON.stringify(objDes);
            
            obj['articuloIdiomas'] = (arrArt.length > 0)?JSON.stringify(arrArt):'';
            $.each(val.resumen, function(i,val){
                objRes[class_asi.cons.idiomasRes[val.idioma]] = val.resumen;
            });
            obj['resumen'] = (JSON.stringify(objRes) == '{}')?'':JSON.stringify(objRes);
            obj['idiomaResumen'] = val.idioma_resumen;
            obj['disciplinaRevista'] = val.disciplina;
            var palabras = [];
            obj['palabraClave'] = null;
            if( val.palabras_clave != undefined ){
                $.each(val.palabras_clave, function(i2, val2){
                    palabras.push(val2.replaceAll('"', ''));
                });
                obj['palabraClave'] = JSON.stringify(palabras);
            }
            var keywords = [];
            obj['keyword'] = null;
            if( val.keywords != undefined ){
                $.each(val.keywords, function(i2, val2){
                    keywords.push(val2.replaceAll('"', ''));
                });
                obj['keyword'] = JSON.stringify(keywords);
            }
            if ('textoPDF' in val){
                arrURL.push({u: val.textoPDF, y: "Texto completo (Ver PDF)"});
            }
            if ('textoHTML' in val){
                arrURL.push({u: val.textoHTML, y: "Texto completo (Ver HTML)"});
            }
            obj['url'] = JSON.stringify(arrURL);
            data_int.push(obj);
            obj['fechaIngreso'] = val.fechaIngreso;
            obj['autores'] = val.autores;
        });
        
        data['tabla'] = 'article';
        data['where'] = columns;
        data['data'] = data_int;
        return data;
    },
    data_valor_actualiza(id, val, pc=false){
        var volumen = '';
        var numero = '';
        var parte = '';
        if(id.split('__')[2] !== ''){
            volumen = id.split('__')[2];
        }
        if(id.split('__')[3] !== ''){
            numero = id.split('__')[3];
        }
        if(id.split('__')[4] !== ''){
            parte = id.split('__')[4];
        }
        
        var estatus = '"estatus"';
        var asignado = '"asignado"';
        var fechaAsignado = '"fechaAsignado"';
        
        if(pc){
            estatus = '"estatusPC"';
            asignado = '"asignadoPC"';
            fechaAsignado = '"fechaAsignadoPC"';
        }
        
        var v_json = '	{'+
                            '"revista": ' + '"' + id.split('__')[0] + '"' + ',' +
                            '"anioRevista": ' + id.split('__')[1] + ',' +
                            asignado + ': ' + '"' + val + '"' + ',' +
                            estatus + ': ' + '"A"' + ',' +
                            fechaAsignado + ': ' + '"' + (new Date()).getFullYear()+'-'+(((new Date()).getMonth()+1)+'').padStart(2,'0')+'-'+((new Date()).getDate()+'').padStart(2,'0') + '"' +
                            ((volumen !== '')?(', "volumen": "V' + id.split('__')[2]+'"'):'' )+
                            ((numero !== '')?(', "numero": "N' + id.split('__')[3]+'"'):'' )+
                            ((parte !== '')?(', "parte": "' + id.split('__')[4]+'"'):'' )+
                            /*((volumen !== '')?(', "\\"descripcionBibliografica\\"->>\'a\'": "V' + id.split('-')[2]+'"'):'' )+
                            ((numero !== '')?(', "\\"descripcionBibliografica\\"->>\'b\'": "N' + id.split('-')[3]+'"'):'' )+
                            ((parte !== '')?(', "\\"descripcionBibliografica\\"->>\'c\'": "' + id.split('-')[4]+'"'):'' )+*/
                    '}';
        var data = '	{ "data": [' + v_json + ']}';
        data = JSON.parse(data);
        data['tabla'] = 'article';
        data['where'] = ['revista', 'anioRevista', 'volumen', 'numero', 'parte'];

        return data;
    },
    setTabla: function(data){
        var tbody = '';
        $.each(data, function(i, val){
            //Para pruebas de asignación asignado == null
            //if(val.asignado == null ){
                var id = val['revista'] + '__' +
                        val['anioRevista'] + '__' +
                        ((val['volumen'] == '' || val['volumen'].toLowerCase().indexOf('s') !== -1 )?'':val['volumen']) + '__' +
                        ((val['numero'] == '' || val['numero'].toLowerCase().indexOf('s') !== -1 )?'':val['numero']) + '__' +
                        ((val['parte'] == '')?'':val['parte']);
                
                var obj_revista = {
                    'revista': val['revista'],
                    'anio': val['anioRevista'],
                    'vol': val['volumen'],
                    'num': val['numero'],
                    'parte': val['parte'],
                    'id': id,
                    'pc_id': 'pc-'+class_utils.slug(id)
                };

                var tr = class_asi.var.tr.replace('<revista>', val['revista'])
                                .replace('<base>', val['base'])
                                .replace('<anio>', val['anioRevista'])
                                .replace('<volumen>', val['volumen'])
                                .replace('<numero>', val['numero'])
                                .replace('<parte>', val['parte'])
                                .replace('<articulos>', val['articulos'])
								.replace('<sinpdf>', val['sinpdf'])
                                .replace('<ingreso>', val['fecha'])
                                .replace('<asignado>', val['fecha_asignado'])
                                .replace('<select_asigna>', '<span  style="display:none">'+val['asignado']+'</span>'+class_asi.var.select_asigna.replace('<options>', class_asi.var.options_asigna.replace('"'+val['asignado']+'"', '"'+val['asignado']+'" selected')).replace('<id>', id))
                                .replace('<vacio>', val['asignado'])
                                .replace('<asignado_pc>', val['fecha_asignado_pc'])
                                .replaceAll('null', '');
                
                
                if(val['estatus'] == 'C'){
                    //tr = tr.replace('<select', '<select disabled');
                    //El artículo ya fue asignado para análisis
                    if(val['fecha_asignado'] !== null){
                        //Se deshabilita el combo para asignar
                        tr = tr.replace('class="asigna"', 'class="asigna" disabled');
                        //Si el indicador de análisis de palabras clave está completado
                        if(val['palabras_clave'] == 'C'){
                            //Muestra el combo para asignar análisis
                            tr = tr.replace('<select_asigna_pc>', '<span  style="display:none">'+val['asignado_pc']+'</span>'+class_asi.var.select_asigna.replace('class="asigna"', 'class="asigna_pc"').replace('<options>', class_asi.var.options_asigna_pc.replace('"'+val['asignado_pc']+'"', '"'+val['asignado_pc']+'" selected')).replace('<id>', id))
                                .replace('<vacio_pc>', val['asignado_pc']).replaceAll('null', '');
                        }else if(val['palabras_clave'] == null){
                            //Muestra icono para empezar a generar palabras clave
                            tr = tr.replace('<select_asigna_pc>', '<center id="'+obj_revista.pc_id+'"><i id="genera_pc_'+i+'" class="fa fa-cogs genera_pc" aria-hidden="true" style="color: #ff8000; cursor: pointer" data-toggle="tooltip" data-placement="top" title="[Clic] para generar palabras clave"></i></center>');
                            class_asi.var.arr_palabras_clave[i]=obj_revista;
                        }else if(val['palabras_clave'] == 'R'){
                            //Muestra que está trabajando en las palabras
                            class_asi.var.generando_pc = true;
                            tr = tr.replace('<select_asigna_pc>', '<center id="'+obj_revista.pc_id+'"><i class="fa fa-refresh fa-spin" aria-hidden="true" style="color: #ff8000;" data-toggle="tooltip" data-placement="top" title="Generando palabras clave ..."></i> ('+val['analizados']+')</center>');
                            class_asi.var.revisa_pc = setInterval( function(){ class_asi.revisa_estatus(obj_revista) }, 10000);
                        }
                    }
                }
                
                if(val['estatusPC'] == 'C'){
                    //tr = tr.replace('<select', '<select disabled');
                    tr = tr.replace('class="asigna_pc"', 'class="asigna_pc" disabled');
                }
                
                tbody += tr;
            //}
        });
        var tabla = class_asi.var.tabla
                .replace('<body>', tbody);
        
        $('#div_tabla').html(tabla);
        var op = {
                        deferRender: true,
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                extend: 'csvHtml5',
                                text: 'Exportar CSV',
                                exportOptions: {
                                    columns: [0,1,2,3,4,5,6,7,8,9,11,12,14] // Aquí indicas los índices de las columnas a exportar (0, 2 y 3 en este caso)
                                }
                            },
                            {
                                extend: 'excelHtml5',
                                text: 'Exportar Excel',
                                exportOptions: {
                                    columns: [0,1,2,3,4,5,6,7,8,9,11,12,14] // Igual que en el caso anterior, indicas los índices de las columnas a exportar
                                }
                            }
                        ],
                        order: [[ 1, 'asc' ]],
                        bLengthChange: false,
                        pageLength: 10,
                        //Opción para introducir el número de página en el footer de la tabla
                        pagingType: 'input',
                        autoWidth: true,
                        columnDefs: [
                            {
                                render: function (data, type, full, meta) {
                                    //Sustituye el valor de la celda por esto agregando un div para que se mantenga dentro del tamaño definido
                                    return '<div style="width: 100%; text-align: left; white-space: normal;">' + data + '</div>';
                                },
                                targets: [0,1,2,3,4,5,6,7,8,9,10,12,13]
                            },
                            {
                                visible: false,
                                searchable: true,
                                targets: [11,14]
                            }
                        ],
                        //Reajusta el ancho de las columnas
                        drawCallback: function( settings ) {
                            $(this).DataTable().columns.adjust();
                            //Evento para ocultar o mostrar la paginación si existen o no registros después de una búsqueda
                            if ($(this).DataTable().page.info().recordsDisplay > 0) {
                                $('.dataTables_paginate').show();
                            }else{
                                $('.dataTables_paginate').hide();
                            }
                            class_asi.control();
                            if(class_asi.var.generando_pc){
                                $('.genera_pc').css('color', 'gray');
                                $('.genera_pc').css('cursor', '');
                                $('.genera_pc').off('click');
                            }
                        }
                    }; 
        class_utils.setTabla('tbl_revistas', op);
        $('.buttons-csv span').html('Descargar .csv');
    },
    mensaje:function(texto, fn=null){
        $.confirm({
                title: '',
                content: texto,
                buttons: {
                    aceptar: {
                            text: 'Aceptar',
                            btnClass: 'btn-warning',
                            action: function(){
                                if(fn !== null){
                                    fn();
                                }else{
                                    return true;
                                }
                            }
                    }
                }
            });
    },
    revisa_estatus(obj_revista){
        $.when(class_utils.getResource('/datos/estatus_palabras/'+obj_revista.pc_id)) 
            .then(function(resp){
                if(resp[0].estatus == 'C'){
                    class_asi.var.generando_pc = false;
                    $('.genera_pc').css('color', '#ff8000');
                    $('.genera_pc').css('cursor', 'pointer');
                    class_asi.control();
                    clearInterval(class_asi.var.revisa_pc);
                    //Muestra el combo para asignar análisis
                    $('#'+obj_revista.pc_id).html('<span  style="display:none"></span>'+class_asi.var.select_asigna.replace('class="asigna"', 'class="asigna_pc"').replace('<options>', class_asi.var.options_asigna_pc).replace('<id>', obj_revista.id))
                        .replaceAll('null', '');
                }else if(resp[0].estatus == 'R'){
                    //Muestra que está trabajando en las palabras
                    class_asi.var.generando_pc = true;
                    $('#'+obj_revista.pc_id).html('<center><i class="fa fa-refresh fa-spin" aria-hidden="true" style="color: #ff8000;" data-toggle="tooltip" data-placement="top" title="Generando palabras clave ..."></i> ('+resp[0].analizados+')</center>');
                }
            });
    }
};

$(class_asi.ready);



