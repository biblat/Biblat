class_asi = {
    cons: {
        DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
        option_analista: '<option value="<val>"><analista></option>',
        td_num: '<button type="button" class="btn btn-warning nums" id="<anio>__<num>"><num></button>',
    },   
    var: {
        usuariosJSON: [],
        revistasJSON: [],
        init: true,
        url_oai: '',
        data: '',
        revistas: '',
        revista: {},
        registros:{},
        select_asigna: '<select id="<id>" class="asigna"><options></select>',
        options_asigna: '',
        tabla: '<table id="tbl_revistas" class="display responsive nowrap" style="width:100%;font-size:11px">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th rowspan="1">Revista</th>' +
                                    '<th rowspan="1">Base</th>' +
                                    '<th rowspan="1">Anio</th>' +
                                    '<th rowspan="1">Volumen</th>' +
                                    '<th rowspan="1">Número</th>' +
                                    '<th rowspan="1">Parte</th>' +
                                    '<th rowspan="1">Artículos</th>' +
                                    '<th rowspan="1">Asignar a:</th>' +
                                    '<th></th>' +
                                '</tr>'+
                            '</thead>' +
                            '<tbody id="body_revistas"><body></tbody></table>',
        tr: '<tr><td><revista></td><td><base></td><td><anio></td><td><volumen></td><td><numero></td><td><parte></td><td><articulos></td><td><select_asigna></td><td><vacio></td>',
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
                        
                        $.when(class_utils.getResource('/datos/revista_estatus/')) 
                        .then(function(resp_revista){
                            class_asi.var.revistasJSON = resp_revista;
                            class_asi.setTabla(class_asi.var.revistasJSON);
                            class_asi.control();
                        });
                        
                        $('#revista_sel').show();
                        $('#revista_sel').html(options);
                        $('#revista_sel').select2({ tags: true, placeholder: "Seleccione una Revista", allowClear: true});
                    });
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
                                        alert('Actualizados');
                                });
                            }
                    }
                }
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
    data_valor_actualiza(id, val){
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
        
        var v_json = '	{'+
                            '"revista": ' + '"' + id.split('__')[0] + '"' + ',' +
                            '"anioRevista": ' + id.split('__')[1] + ',' +
                            '"asignado": ' + '"' + val + '"' + ',' +
                            '"estatus": ' + '"A"' +
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
            if(val.asignado == null){
                var id = val['revista'] + '__' +
                        val['anioRevista'] + '__' +
                        ((val['volumen'] == '' || val['volumen'].toLowerCase().indexOf('s') !== -1 )?'':val['volumen']) + '__' +
                        ((val['numero'] == '' || val['numero'].toLowerCase().indexOf('s') !== -1 )?'':val['numero']) + '__' +
                        ((val['parte'] == '')?'':val['parte']);

                var tr = class_asi.var.tr.replace('<revista>', val['revista'])
                                .replace('<base>', val['base'])
                                .replace('<anio>', val['anioRevista'])
                                .replace('<volumen>', val['volumen'])
                                .replace('<numero>', val['numero'])
                                .replace('<parte>', val['parte'])
                                .replace('<articulos>', val['articulos'])
                                .replace('<select_asigna>', '<span  style="display:none">'+val['asignado']+'</span>'+class_asi.var.select_asigna.replace('<options>', class_asi.var.options_asigna).replace('<id>', id))
                                .replace('"'+val['asignado']+'"', '"'+val['asignado']+'" selected')
                                .replace('<vacio>', val['asignado']);
                tbody += tr;
            }
        });
        var tabla = class_asi.var.tabla
                .replace('<body>', tbody);
        
        $('#div_tabla').html(tabla);
        var op = {
                        order: [[ 1, 'asc' ]],
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
                                targets: [0,1,2,3,4,5,6,7]
                            },
                            {
                                visible: false,
                                searchable: true,
                                targets: [8]
                            }
                        ],
                        //Reajusta el ancho de las columnas
                        drawCallback: function( settings ) {
                            $(this).DataTable().columns.adjust();
                            class_asi.control();
                        }
                    }; 
        class_utils.setTabla('tbl_revistas', op);
        
    }
};

$(class_asi.ready);


