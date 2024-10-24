
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
                                    '<th style="padding:15px">Registro</th>' +
                                '</tr>'+
                            '</thead>' +
                            '<tbody id="body_revistas"><body></tbody></table>',
        tr: '<tr><td><registro></td></tr>',
        option: '<li><a class="<class>" id="<option_id>"><option></a></li>'
            
    },
    initClient: function() {
        if (class_asi.var.init){
                        
                        $.when(class_utils.getResource('/datos/hevila/')) 
                        .then(function(resp_revista){
                            /*class_asi.var.revistasJSON = [
                                "/var/www/html/hevila/1.pdf",
                                "/var/www/html/hevila/ARBSAnnualreviewofbiomedicalsciences/2009/vol11/1.pdf",
                                "/var/www/html/hevila/ARBSAnnualreviewofbiomedicalsciences/2009/vol11/5.pdf",
                                "/var/www/html/hevila/ARBSAnnualreviewofbiomedicalsciences/2009/vol11/4.pdf",
                                "/var/www/html/hevila/ARBSAnnualreviewofbiomedicalsciences/2009/vol11/8.pdf",
                                "/var/www/html/hevila/ARBSAnnualreviewofbiomedicalsciences/2009/vol11/6.pdf",
                                "/var/www/html/hevila/ARBSAnnualreviewofbiomedicalsciences/2009/vol11/2.pdf",
                                "/var/www/html/hevila/ARBSAnnualreviewofbiomedicalsciences/2009/vol11/3.pdf",
                                "/var/www/html/hevila/ARBSAnnualreviewofbiomedicalsciences/2009/vol11/7.pdf",
                                "/var/www/html/hevila/ARBSAnnualreviewofbiomedicalsciences/2010/vol12/1.pdf",
                                "/var/www/html/hevila/ARBSAnnualreviewofbiomedicalsciences/2010/vol12/2.pdf",
                                "/var/www/html/hevila/ARBSAnnualreviewofbiomedicalsciences/2010/vol12/3.pdf"
                            ];*/
                            class_asi.var.revistasJSON = resp_revista;
                            
                            var options_anio = [];
                            var options_rev = [];
                            
                            $.each(class_asi.var.revistasJSON, function(i, val){
                                var res = val.split('/');
                                if(res[5] !== undefined && res[6] !== undefined){
                                    var rev = res[5];
                                    var anio = res[6];
                                    var option_anio = class_asi.var.option.replaceAll('<option>', anio).replaceAll('<option_id>', anio).replace('<class>', 'li-anio');
                                    var option_rev = class_asi.var.option.replaceAll('<option>', rev).replaceAll('<option_id>', rev).replace('<class>', 'li-rev');
                                    if( options_anio.indexOf(option_anio) == -1 ){
                                        options_anio.push(option_anio);
                                    }
                                    if( options_rev.indexOf(option_rev) == -1 ){
                                        options_rev.push(option_rev);
                                    }
                                }
                            });
                            
                            options_anio = options_anio.join(' ');
                            options_rev = options_rev.join(' ');
                            
                            $('#menu-anio').html(options_anio);
                            $('#menu-rev').html(options_rev);
                            
                            class_asi.setTabla([]);
                            //class_asi.control();
                            class_asi.filtro();
                            loading.end();
                        });
                        
                        //$('#revista_sel').show();
                        //$('#revista_sel').html(options);
                        //$('#revista_sel').select2({ tags: true, placeholder: "Seleccione una Revista", allowClear: true});
                    
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
                class_utils.setResource('http://localhost:5001' + '' + '/palabras_clave/', class_asi.var.arr_palabras_clave[id], true)
                //class_utils.setResource('https://biblat.unam.mx' + '/scielo-claper' + '/palabras_clave/', class_asi.var.arr_palabras_clave[id], true)
            ).then(function(){
            });
        });
    },
    filtro: function(){
        $(".li-rev").off('click').on('click', function(){
            loading.start();
            var id = this.id;
            var html = $(this).html();
            setTimeout(function(){
                $('#btn-rev').html(html);
                if(id == 'Todos'){
                    $('#btn-mes').html('Todos');
                    class_asi.setTabla(class_asi.var.revistasJSON);
                }else{
                    var regex = new RegExp(id);
                    var filter = class_asi.var.revistasJSON.filter(str => regex.test(str));
                    
                    var options_anio = [];
                    $.each(filter, function(i, val){
                        var res = val.split('/');
                        if(res[6] !== undefined){
                            var anio = res[6];
                            var option_anio = class_asi.var.option.replaceAll('<option>', anio).replaceAll('<option_id>', anio).replace('<class>', 'li-anio');
                            if( options_anio.indexOf(option_anio) == -1 ){
                                options_anio.push(option_anio);
                            }
                        }
                    });
                    
                    class_asi.setTabla(filter);
                    
                    var options_anio = options_anio.join(' ');
                    $('#menu-anio').html(options_anio);
                    
                    $('#btn-anio').html('Año:');
                    
                    $(".li-anio").off('click').on('click', function(){
                            $('#btn-anio').html($(this).html());
                            var id_anio = this.id;
                            var regex = new RegExp(id_anio);
                            loading.start();
                            setTimeout(function(){
                                if(id_anio == 'Todos'){
                                    var filter_anio = filter;
                                }else{
                                    var filter_anio = filter.filter(str => regex.test(str));
                                }
                                class_asi.setTabla(filter_anio);
                                loading.end();
                            },1000);
                    });
                }
                loading.end();
            },1000);
            
        });
        $("#remove").off('click').on('click', function(){
            $('#remove').hide();
            $('#btn-filtro').html("Filtrar por :");
            $('#btn-filtro2').html("Seleccione");
            $("#ul-filtro").html("");
            class_av.setTabla(class_av.var.articulosJSON);
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
                var url = val.replace('/var/www/html', 'https://biblat.unam.mx');
                var tr = class_asi.var.tr.replace('<registro>', '<a href="'+url+'" target="blank">'+url+'</a>');
     
                tbody += tr;
            //}
        });
        var tabla = class_asi.var.tabla
                .replace('<body>', tbody);
        
        $('#div_tabla').html(tabla);
        var op = {
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                extend: 'csvHtml5',
                                text: 'Exportar CSV',
                                exportOptions: {
                                    columns: [0] // Aquí indicas los índices de las columnas a exportar (0, 2 y 3 en este caso)
                                }
                            },
                            {
                                extend: 'excelHtml5',
                                text: 'Exportar Excel',
                                exportOptions: {
                                    columns: [0] // Igual que en el caso anterior, indicas los índices de las columnas a exportar
                                }
                            }
                        ],
                        order: [[ 0, 'asc' ]],
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
                                targets: [0]
                            },
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



