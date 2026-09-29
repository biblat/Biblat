class_corr = {
    var:{
        sistema:'',
        inicio:0,
        tabla:null
    },

    idiomas:[
        '',
        'Español',
        'Inglés',
        'Portugués',
        'Francés',
        'Italiano',
        'Alemán',
        'Ruso'
    ],

    init:function(){
        $('#corr_btn_buscar').on('click', class_corr.buscar);

        $('#corr_busqueda').on('keypress', function(e){
            if(e.which === 13){
                e.preventDefault();
                class_corr.buscar();
            }
        });

        $('#corr_add_titulo').on('click', function(){
            class_corr.addTitulo({});
        });

        $('#corr_add_palabra').on('click', function(){
            class_corr.addLista('#corr_palabras', 'corr-palabra', '');
        });

        $('#corr_add_keyword').on('click', function(){
            class_corr.addLista('#corr_keywords', 'corr-keyword', '');
        });

        $('#corr_add_url').on('click', function(){
            class_corr.addUrl({});
        });

        $('#corr_add_institucion').on('click', function(){
            class_corr.addInstitucion({});
        });

        $('#corr_add_autor').on('click', function(){
            class_corr.addAutor({});
        });

        $('#corr_corporativo').on('change', function(){
            class_corr.actualizaCorporativo();
        });

        $('#corr_cancelar').on('click', function(){
            $('#corr_ficha').hide();
            class_corr.var.sistema = '';
        });

        $('#corr_guardar').on('click', class_corr.confirmarGuardar);
    },

    mensaje:function(txt){
        if(typeof $.alert === 'function'){
            $.alert(txt);
        }else{
            alert($('<div>').html(txt).text());
        }
    },

    esc:function(v){
        return $('<div>').text(
            v === null || v === undefined ? '' : String(v)
        ).html();
    },

    val:function(v){
        return v === null || v === undefined ? '' : v;
    },

    buscar:function(){
        var q = $('#corr_busqueda').val().trim();
        var tipo = $('#corr_tipo_busqueda').val();

        if(q.length < 2){
            class_corr.mensaje('Escriba al menos 2 caracteres.');
            return;
        }

        loading.start();

        $.ajax({
            url:"<?=site_url('datos/correcciones_buscar');?>",
            type:'GET',
            dataType:'json',
            data:{tipo:tipo,q:q}
        }).done(function(rows){
            class_corr.renderResultados(
                Array.isArray(rows) ? rows : []
            );
        }).fail(function(xhr){
            class_corr.mensaje(
                xhr.status === 401
                ? 'La sesión expiró.'
                : 'No fue posible realizar la búsqueda.'
            );
        }).always(function(){
            loading.end();
        });
    },

    renderResultados:function(rows){
        if(class_corr.var.tabla){
            class_corr.var.tabla.destroy();
            class_corr.var.tabla = null;
        }

        var $body = $('#tbl_correcciones tbody').empty();

        rows.forEach(function(r){
            $body.append(
                '<tr>'+
                    '<td class="corr-col-sistema">'+class_corr.esc(r.sistema)+'</td>'+
                    '<td class="corr-col-articulo" title="'+class_corr.esc(r.articulo)+'">'+class_corr.esc(r.articulo)+'</td>'+
                    '<td class="corr-col-revista">'+class_corr.esc(r.revista)+'</td>'+
                    '<td class="corr-col-anio">'+class_corr.esc(r.anioRevista)+'</td>'+
                    '<td class="corr-col-vol">'+class_corr.esc(r.volumen)+'</td>'+
                    '<td class="corr-col-num">'+class_corr.esc(r.numero)+'</td>'+
                    '<td class="corr-col-doi">'+class_corr.esc(r.doi)+'</td>'+
                    '<td class="corr-col-accion">'+
                        '<button type="button" '+
                                'class="btn btn-default btn-xs corr-editar" '+
                                'data-sistema="'+class_corr.esc(r.sistema)+'">'+
                            '<i class="fa fa-pencil" style="color:#ff8000"></i> '+
                            'Corregir'+
                        '</button>'+
                    '</td>'+
                '</tr>'
            );
        });

        $('#corr_resultados').show();

        class_corr.var.tabla = $('#tbl_correcciones').DataTable({
            pageLength:20,
            lengthChange:false,
            responsive:false,
            autoWidth:false,
            scrollX:true,
            order:[[1,'asc']],
            dom:
                "<'row corr-dt-toolbar'"+
                    "<'col-sm-7'f>"+
                    "<'col-sm-5'i>"+
                ">"+
                "t"+
                "<'row corr-dt-footer'<'col-sm-12'p>>",
            columnDefs:[
                {targets:0, width:'120px'},
                {targets:1, width:'42%'},
                {targets:2, width:'18%'},
                {targets:[3,4,5], width:'65px'},
                {targets:6, width:'15%'},
                {targets:7, width:'85px', orderable:false, searchable:false}
            ],
            language:{
                search:'Filtrar:',
                zeroRecords:'No se encontraron registros',
                info:'Mostrando _START_ a _END_ de _TOTAL_',
                infoEmpty:'Sin registros',
                paginate:{
                    previous:'Anterior',
                    next:'Siguiente'
                }
            }
        });

        $('#tbl_correcciones tbody')
            .off('click', '.corr-editar')
            .on('click', '.corr-editar', function(){
                class_corr.cargar($(this).data('sistema'));
            });
    },

    cargar:function(sistema){
        loading.start();

        $.ajax({
            url:"<?=site_url('datos/correccion');?>/"+
                encodeURIComponent(sistema),
            type:'GET',
            dataType:'json'
        }).done(function(resp){
            if(!resp || resp.resp !== 'success'){
                class_corr.mensaje(
                    resp && resp.mensaje
                    ? resp.mensaje
                    : 'No fue posible cargar el registro.'
                );
                return;
            }

            class_corr.var.sistema = sistema;
            class_corr.var.inicio = Date.now();

            class_corr.fillArticle(resp.article || {});
            class_corr.renderTitulos(
                resp.article && resp.article.titulosTraducidos
                ? resp.article.titulosTraducidos
                : []
            );
            class_corr.renderListas(resp.article || {});
            class_corr.renderUrls(
                resp.article && resp.article.urls
                ? resp.article.urls
                : []
            );
            class_corr.renderInstituciones(
                resp.instituciones || []
            );
            class_corr.renderAutores(
                resp.autores || []
            );

            $('#corr_corporativo').prop(
                'checked',
                String(resp.corporativo) === '1'
            );

            class_corr.actualizaCorporativo();

            $('#corr_sistema_titulo').text(sistema);
            $('#corr_ficha').show();

            $('html,body').animate({
                scrollTop:$('#corr_ficha').offset().top - 20
            }, 200);

        }).fail(function(xhr){
            class_corr.mensaje(
                xhr.status === 401
                ? 'La sesión expiró.'
                : 'No fue posible cargar el registro.'
            );
        }).always(function(){
            loading.end();
        });
    },

    fillArticle:function(a){
        [
            'sistema',
            'estatus',
            'asignado',
            'fechaAsignado',
            'estatusPC',
            'asignadoPC',
            'fechaAsignadoPC',
            'fechaIngreso',
            'fechaActualizado',

            'revista',
            'articulo',
            'issn',
            'doi',
            'anioRevista',
            'paisRevista',
            'ciudadEditora',
            'institucionEditora',

            'volumen',
            'numero',
            'mes',
            'parte',
            'paginas',

            'idioma',
            'tipoDocumento',
            'disciplinaRevista',
            'notaGeneral',

            'resumenEspanol',
            'resumenIngles',
            'resumenPortugues',
            'resumenOtro',
            'idiomaResumen',

            'sistemaErrata',
            'scieloid'
        ].forEach(function(k){
            $('#corr_'+k).val(class_corr.val(a[k]));
        });

        $('#corr_DSpace').prop(
            'checked',
            a.DSpace === true ||
            a.DSpace === 't' ||
            a.DSpace === 1 ||
            a.DSpace === '1'
        );

        var d = Array.isArray(a.disciplinas)
            ? a.disciplinas
            : [];

        var s = Array.isArray(a.subdisciplinas)
            ? a.subdisciplinas
            : [];

        for(var i=1;i<=3;i++){
            $('#corr_disciplina'+i).val(
                d[i-1] || ''
            );
            $('#corr_subdisciplina'+i).val(
                s[i-1] || ''
            );
        }
    },

    opcionesIdioma:function(actual){
        var html = '';

        class_corr.idiomas.forEach(function(i){
            html += '<option value="'+class_corr.esc(i)+'" '+
                    (i === actual ? 'selected' : '')+'>'+
                    class_corr.esc(i || 'Seleccione')+
                    '</option>';
        });

        if(
            actual &&
            class_corr.idiomas.indexOf(actual) === -1
        ){
            html += '<option value="'+class_corr.esc(actual)+
                    '" selected>'+
                    class_corr.esc(actual)+
                    '</option>';
        }

        return html;
    },

    renderTitulos:function(rows){
        $('#corr_titulos').empty();

        rows.forEach(function(r){
            class_corr.addTitulo(r);
        });
    },

    addTitulo:function(r){
        r = r || {};

        $('#corr_titulos').append(
            '<div class="corr-item corr-titulo-row">'+
                '<div class="corr-item-actions">'+
                    '<button type="button" '+
                            'class="btn btn-default btn-xs corr-del-row">'+
                        '<span class="glyphicon glyphicon-remove" '+
                              'style="color:#ff8000"></span> Borrar'+
                    '</button>'+
                '</div>'+
                '<div class="row">'+
                    '<div class="col-sm-9">'+
                        '<label>Título traducido</label>'+
                        '<input class="form-control ct-titulo" '+
                               'value="'+class_corr.esc(r.titulo)+'">'+
                    '</div>'+
                    '<div class="col-sm-3">'+
                        '<label>Idioma</label>'+
                        '<select class="form-control ct-idioma">'+
                            class_corr.opcionesIdioma(
                                class_corr.val(r.idioma)
                            )+
                        '</select>'+
                    '</div>'+
                '</div>'+
            '</div>'
        );

        class_corr.bindDeletes('#corr_titulos');
    },

    renderListas:function(a){
        $('#corr_palabras').empty();
        $('#corr_keywords').empty();

        (Array.isArray(a.palabrasClave)
            ? a.palabrasClave
            : []
        ).forEach(function(v){
            class_corr.addLista(
                '#corr_palabras',
                'corr-palabra',
                v
            );
        });

        (Array.isArray(a.keywords)
            ? a.keywords
            : []
        ).forEach(function(v){
            class_corr.addLista(
                '#corr_keywords',
                'corr-keyword',
                v
            );
        });
    },

    addLista:function(container, clase, valor){
        $(container).append(
            '<div class="corr-item '+clase+'-row">'+
                '<div class="row">'+
                    '<div class="col-sm-11">'+
                        '<input class="form-control '+clase+'" '+
                               'value="'+class_corr.esc(valor)+'">'+
                    '</div>'+
                    '<div class="col-sm-1" style="padding-top:2px">'+
                        '<button type="button" '+
                                'class="btn btn-default btn-sm corr-del-row">'+
                            '<span class="glyphicon glyphicon-remove" '+
                                  'style="color:#ff8000"></span>'+
                        '</button>'+
                    '</div>'+
                '</div>'+
            '</div>'
        );

        class_corr.bindDeletes(container);
    },

    renderUrls:function(rows){
        $('#corr_urls').empty();

        rows.forEach(function(r){
            class_corr.addUrl(r);
        });
    },

    addUrl:function(r){
        r = r || {};

        $('#corr_urls').append(
            '<div class="corr-item corr-url-row">'+
                '<div class="corr-item-actions">'+
                    '<button type="button" '+
                            'class="btn btn-default btn-xs corr-del-row">'+
                        '<span class="glyphicon glyphicon-remove" '+
                              'style="color:#ff8000"></span> Borrar'+
                    '</button>'+
                '</div>'+
                '<div class="row">'+
                    '<div class="col-sm-7">'+
                        '<label>URL</label>'+
                        '<input type="url" class="form-control cu-url" '+
                               'value="'+class_corr.esc(r.url)+'">'+
                    '</div>'+
                    '<div class="col-sm-5">'+
                        '<label>Tipo / descripción</label>'+
                        '<input class="form-control cu-tipo" '+
                               'value="'+class_corr.esc(r.tipo)+'" '+
                               'placeholder="Ej. Texto completo (Ver PDF)">'+
                    '</div>'+
                '</div>'+
            '</div>'
        );

        class_corr.bindDeletes('#corr_urls');
    },

    renderInstituciones:function(rows){
        $('#corr_instituciones').empty();

        if(!rows.length){
            class_corr.addInstitucion({});
            return;
        }

        rows.forEach(function(r){
            class_corr.addInstitucion(r);
        });
    },

    addInstitucion:function(r){
        r = r || {};

        var idx = $('#corr_instituciones .corr-inst-row').length + 1;
        var id = r.id !== undefined && r.id !== null
            ? r.id
            : idx;

        $('#corr_instituciones').append(
            '<div class="corr-item corr-inst-row">'+
                '<div class="corr-item-actions">'+
                    '<button type="button" '+
                            'class="btn btn-default btn-xs corr-del-row">'+
                        '<span class="glyphicon glyphicon-remove" '+
                              'style="color:#ff8000"></span> Borrar institución'+
                    '</button>'+
                '</div>'+
                '<div class="row">'+
                    '<div class="col-sm-1">'+
                        '<label>ID</label>'+
                        '<input type="number" class="form-control ci-id" '+
                               'value="'+class_corr.esc(id)+'">'+
                    '</div>'+
                    '<div class="col-sm-3">'+
                        '<label>País</label>'+
                        '<input class="form-control ci-pais" '+
                               'value="'+class_corr.esc(r.pais)+'">'+
                    '</div>'+
                    '<div class="col-sm-3 ci-ciudad-wrap">'+
                        '<label>Ciudad</label>'+
                        '<input class="form-control ci-ciudad" '+
                               'value="'+class_corr.esc(r.ciudad)+'">'+
                    '</div>'+
                    '<div class="col-sm-5">'+
                        '<label>Institución</label>'+
                        '<input class="form-control ci-institucion" '+
                               'value="'+class_corr.esc(r.institucion)+'">'+
                    '</div>'+
                '</div>'+
                '<div class="row" style="margin-top:8px">'+
                    '<div class="col-sm-12">'+
                        '<label>Dependencia</label>'+
                        '<input class="form-control ci-dependencia" '+
                               'value="'+class_corr.esc(r.dependencia)+'">'+
                    '</div>'+
                '</div>'+
            '</div>'
        );

        class_corr.bindDeletes('#corr_instituciones');
        class_corr.actualizaCorporativo();
    },

    renderAutores:function(rows){
        $('#corr_autores').empty();

        rows.forEach(function(r){
            class_corr.addAutor(r);
        });
    },

    addAutor:function(r){
        r = r || {};

        var idx = $('#corr_autores .corr-autor-row').length + 1;
        var id = r.id !== undefined && r.id !== null
            ? r.id
            : idx;

        $('#corr_autores').append(
            '<div class="corr-item corr-autor-row">'+
                '<div class="corr-item-actions">'+
                    '<button type="button" '+
                            'class="btn btn-default btn-xs corr-del-row">'+
                        '<span class="glyphicon glyphicon-remove" '+
                              'style="color:#ff8000"></span> Borrar autor'+
                    '</button>'+
                '</div>'+
                '<div class="row">'+
                    '<div class="col-sm-1">'+
                        '<label>ID</label>'+
                        '<input type="number" class="form-control ca-id" '+
                               'value="'+class_corr.esc(id)+'">'+
                    '</div>'+
                    '<div class="col-sm-4">'+
                        '<label>Nombre</label>'+
                        '<input class="form-control ca-nombre" '+
                               'value="'+class_corr.esc(r.nombre)+'">'+
                    '</div>'+
                    '<div class="col-sm-3">'+
                        '<label>ORCID</label>'+
                        '<input class="form-control ca-orcid" '+
                               'value="'+class_corr.esc(r.orcid)+'">'+
                    '</div>'+
                    '<div class="col-sm-4">'+
                        '<label>Email</label>'+
                        '<input class="form-control ca-email" '+
                               'value="'+class_corr.esc(r.email)+'">'+
                    '</div>'+
                '</div>'+
                '<div class="row" style="margin-top:8px">'+
                    '<div class="col-sm-3">'+
                        '<label>ID institución</label>'+
                        '<input type="number" '+
                               'class="form-control ca-institucionId" '+
                               'value="'+class_corr.esc(r.institucionId)+'">'+
                    '</div>'+
                '</div>'+
            '</div>'
        );

        class_corr.bindDeletes('#corr_autores');
    },

    bindDeletes:function(container){
        $(container)
            .find('.corr-del-row')
            .off('click')
            .on('click', function(){
                $(this).closest('.corr-item').remove();
            });
    },

    actualizaCorporativo:function(){
        var corp = $('#corr_corporativo').is(':checked');

        $('#corr_panel_autores').toggle(!corp);
        $('#corr_instituciones .ci-ciudad-wrap').toggle(!corp);
    },

    getTitulos:function(){
        var rows = [];

        $('#corr_titulos .corr-titulo-row').each(function(){
            var titulo = $(this).find('.ct-titulo').val().trim();
            var idioma = $(this).find('.ct-idioma').val();

            if(titulo !== ''){
                rows.push({
                    titulo:titulo,
                    idioma:idioma || ''
                });
            }
        });

        return rows;
    },

    getLista:function(selector){
        var out = [];

        $(selector).each(function(){
            var v = $(this).val().trim();
            if(v !== ''){
                out.push(v);
            }
        });

        return out;
    },

    getUrls:function(){
        var rows = [];
        var error = '';

        $('#corr_urls .corr-url-row').each(function(){
            var url = $(this).find('.cu-url').val().trim();
            var tipo = $(this).find('.cu-tipo').val().trim();

            if(url !== ''){
                if(!/^https?:\/\/.+/i.test(url)){
                    error = 'Hay una URL mal estructurada: <b>'+
                            class_corr.esc(url)+'</b>';
                    return false;
                }

                rows.push({
                    url:url,
                    tipo:tipo
                });
            }
        });

        if(error !== ''){
            throw new Error(error);
        }

        return rows;
    },

    getInstituciones:function(){
        var rows = [];

        $('#corr_instituciones .corr-inst-row').each(function(){
            rows.push({
                id:parseInt(
                    $(this).find('.ci-id').val(),
                    10
                ) || 0,
                pais:$(this).find('.ci-pais').val().trim(),
                ciudad:$(this).find('.ci-ciudad').val().trim(),
                institucion:$(this).find('.ci-institucion').val().trim(),
                dependencia:$(this).find('.ci-dependencia').val().trim()
            });
        });

        return rows;
    },

    getAutores:function(){
        var rows = [];

        $('#corr_autores .corr-autor-row').each(function(){
            var iid = $(this)
                .find('.ca-institucionId')
                .val()
                .trim();

            rows.push({
                id:parseInt(
                    $(this).find('.ca-id').val(),
                    10
                ) || 0,
                nombre:$(this).find('.ca-nombre').val().trim(),
                orcid:$(this).find('.ca-orcid').val().trim(),
                email:$(this).find('.ca-email').val().trim(),
                institucionId:iid === ''
                    ? null
                    : parseInt(iid, 10)
            });
        });

        return rows;
    },

    payload:function(){
        var disciplinas = [];
        var subdisciplinas = [];

        for(var i=1;i<=3;i++){
            var d = $('#corr_disciplina'+i).val().trim();
            var s = $('#corr_subdisciplina'+i).val().trim();

            if(d !== '') disciplinas.push(d);
            if(s !== '') subdisciplinas.push(s);
        }

        return {
            sistema:class_corr.var.sistema,

            article:{
                revista:$('#corr_revista').val().trim(),
                articulo:$('#corr_articulo').val().trim(),
                issn:$('#corr_issn').val().trim(),
                doi:$('#corr_doi').val().trim(),
                paisRevista:$('#corr_paisRevista').val().trim(),
                idioma:$('#corr_idioma').val().trim(),
                ciudadEditora:$('#corr_ciudadEditora').val().trim(),
                institucionEditora:$('#corr_institucionEditora').val().trim(),
                anioRevista:$('#corr_anioRevista').val().trim(),

                volumen:$('#corr_volumen').val().trim(),
                numero:$('#corr_numero').val().trim(),
                mes:$('#corr_mes').val().trim(),
                parte:$('#corr_parte').val().trim(),
                paginas:$('#corr_paginas').val().trim(),

                tipoDocumento:$('#corr_tipoDocumento').val().trim(),
                notaGeneral:$('#corr_notaGeneral').val().trim(),
                idiomaResumen:$('#corr_idiomaResumen').val().trim(),
                disciplinaRevista:$('#corr_disciplinaRevista').val().trim(),

                resumenEspanol:$('#corr_resumenEspanol').val().trim(),
                resumenIngles:$('#corr_resumenIngles').val().trim(),
                resumenPortugues:$('#corr_resumenPortugues').val().trim(),
                resumenOtro:$('#corr_resumenOtro').val().trim(),

                sistemaErrata:$('#corr_sistemaErrata').val().trim(),
                scieloid:$('#corr_scieloid').val().trim(),
                DSpace:$('#corr_DSpace').is(':checked')
            },

            titulosTraducidos:class_corr.getTitulos(),
            disciplinas:disciplinas,
            subdisciplinas:subdisciplinas,
            palabrasClave:class_corr.getLista(
                '#corr_palabras .corr-palabra'
            ),
            keywords:class_corr.getLista(
                '#corr_keywords .corr-keyword'
            ),
            urls:class_corr.getUrls(),

            corporativo:$('#corr_corporativo').is(':checked'),
            instituciones:class_corr.getInstituciones(),
            autores:$('#corr_corporativo').is(':checked')
                ? []
                : class_corr.getAutores(),

            tiempo:class_corr.var.inicio
                ? Date.now() - class_corr.var.inicio
                : 0
        };
    },

    confirmarGuardar:function(){
        if(class_corr.var.sistema === ''){
            return;
        }

        var payload;

        try{
            payload = class_corr.payload();
        }catch(e){
            class_corr.mensaje(e.message);
            return;
        }

        $.confirm({
            title:'Guardar corrección',
            content:
                'Se actualizarán los metadatos del registro <b>'+
                class_corr.esc(class_corr.var.sistema)+
                '</b>.<br><br>'+
                'El estatus y las asignaciones no se modificarán.',
            buttons:{
                cancelar:{
                    text:'Cancelar'
                },
                aceptar:{
                    text:'Guardar',
                    btnClass:'btn-warning',
                    action:function(){
                        class_corr.guardar(payload);
                    }
                }
            }
        });
    },

    guardar:function(payload){
        loading.start();

        $.ajax({
            url:"<?=site_url('metametrics/ws_guardar_correccion');?>",
            type:'POST',
            data:JSON.stringify(payload),
            contentType:'application/json; charset=utf-8',
            dataType:'json'
        }).done(function(resp){
            if(resp && resp.resp === 'success'){
                class_corr.mensaje(
                    'Corrección guardada correctamente.'
                );
                class_corr.cargar(
                    class_corr.var.sistema
                );
            }else{
                class_corr.mensaje(
                    resp && resp.mensaje
                    ? resp.mensaje
                    : 'No fue posible guardar la corrección.'
                );
            }
        }).fail(function(xhr){
            var msg = 'No fue posible guardar la corrección.';

            try{
                var r = JSON.parse(xhr.responseText);
                if(r.mensaje) msg = r.mensaje;
            }catch(e){}

            class_corr.mensaje(msg);
        }).always(function(){
            loading.end();
        });
    }
};

$(class_corr.init);
