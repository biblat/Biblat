class_av = {
    cons: {
        DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
        option: '<option value="<valor>"><opcion></option>',
        //caracteres: /!|#|\$|%|&|\(|\/|\\|\)|=|\?|¿|¡|,|;|:|_|\[|{|}|]|\+|\*|\~|<|>|\'|\"|’/g
        caracteres: /[^a-zA-Z0-9 ]/g,
        char_i: /\(|\)|,|;|:/g,
        cargando: '<i id="check-titulo-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>',
        estatus:{
            R: 'En revisión',
            C: 'Completado',
            B: 'No indizable'
        },
        color_estatus:{
            R: 'goldenrod',
            C: 'darkgreen',
            B: 'darkred'
        },
        idiomas:{
            'Español': 'esp',
            'Portugués': 'por',
            'Inglés': 'eng'
        }
    },   
    var: {
        servidor: '',
        app: 'scielo-claper',
        usuariosJSON: [],
        analistasJSON: [],
        documentoJSON: '',
        autoresJSON: '',
        institucionesJSON: '',
        init: true,
        url_oai: '',
        data: '',
        revistas: '',
        revista: {},
        registros:{},
        tabla: '<table id="tbl_articulos" class="display responsive nowrap" style="width:100%;font-size:11px">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th rowspan="1" style="max-width:150px">Revista</th>' +
                                    '<th rowspan="1" style="max-width:70px">ISSN</th>' +
                                    '<th rowspan="1" style="max-width:70px">Número</th>' +
                                    '<th rowspan="1" >Artículo</th>' +
                                    '<th rowspan="1" style="max-width:100px">Url 1</th>' +
                                    '<th rowspan="1" style="max-width:100px">Url 2</th>' +
                                    '<th rowspan="1" style="max-width:100px">Estatus</th>' +
                                '</tr>'+
                            '</thead>' +
                            '<tbody id="body_revistas"><body></tbody></table>',
        tr: '<tr><td><revista></td>\n\
            <td><issn></td>\n\
            <td><numero></td>\n\
            <td><span id="<id>" class="<class> <sistema>" style="<style>" ><art></span></td>\n\
            <td><a href="<url1>" target="_blank"><texto1></a></td>\n\
            <td><a href="<url2>" target="_blank"><texto2></a></td>\n\
            <td><span id="estatus-<id_estatus>" style="background-color:<color>" class="badge"><estatus></span></td>',
        barra_avance:   '<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="<avance>" aria-valuemin="0" aria-valuemax="100" style="width: <avance>%">' +
                        '<span style="color:black"><b><avance> %</b></span>' +
                        '</div>',
        html_institucion: ' <div id="div-institucion-<id>"> \n\
                            <div class="row"> \n\
                                <div class="col-xs-12" style="text-align: right"> \n\
                                    <button id="borra-institucion-<id>" type="button" class="btn btn-default btn-sm borra-institucion institucion"> \n\
                                        <span class="glyphicon glyphicon-remove" aria-hidden="true" style="color: #ff8000;"></span> Borrar Institución \n\
                                    </button> \n\
                                </div> \n\
                            </div> \n\
                            <div class="row"> \n\
                                <div class="col-xs-6"> \n\
                                    <span><b>País:</b></span><br><select id="pais-<id>" style="width: 100%" class="form-control paises institucion"> </select> \n\
                                </div> \n\
                                <div class="col-xs-6"> \n\
                                    <span><b>Ciudad:</b></span><br>\n\
                                    <div id="div-ciudad-<id>" style="display: true" class="institucion">\n\
                                        <select id="ciudad-<id>" style="width: 100%" class="ciudades form-control institucion"> </select> \n\
                                    </div>\n\
                                    <i id="ciudad-<id>-load" class="fa fa-spinner fa-pulse institucion" aria-hidden="true" style="color: #ff8000; display: none"></i>\n\
                                </div> \n\
                            </div> \n\
                            <div class="row"> \n\
                                <br> \n\
                            </div> \n\
                            <div class="row"> \n\
                                <br> \n\
                            </div> \n\
                            <div class="row"> \n\
                                <div class="col-xs-6"> \n\
                                    <span><b>Institución:</b></span><br><select id="institucion-<id>" style="width: 100%" class="form-control instituciones institucion"> </select> \n\
                                    <div id="check-ins-<id>" style="display: none" class="institucion"> \n\
                                        <i class="fa fa-file-pdf-o" aria-hidden="true" style="color: darkred"></i> \n\
                                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i> \n\
                                        <span id="check-ins-<id>-texto" style="display: false" class="institucion"></span> \n\
                                        <i id="check-ins-<id>-load" class="fa fa-spinner fa-pulse institucion" aria-hidden="true" style="color: #ff8000; display: true"></i> \n\
                                        <i id="check-ins-<id>-broken" class="fa fa-chain-broken institucion" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-ins-<id>-false" class="fa fa-exclamation-circle institucion" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-ins-<id>-half" class="fa fa-star-half-o institucion" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-ins-<id>-true" class="fa fa-star institucion" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                    </div> \n\
                                    <div id="check-ins-bib-<id>" style="display: none" class="autor"> \n\
                                        <img id="check-ins-bib" src="/img/biblat_ico.png" style="height: 15px"/> \n\
                                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i> \n\
                                        <i id="check-ins-bib-<id>-true" class="fa fa-star autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <span id="check-ins-bib-<id>-texto" style="display:false; font-size:12px" class="autor"></span> \n\
                                        <i id="check-ins-bib-<id>-load" class="fa fa-spinner fa-pulse autor" aria-hidden="true" style="color: #ff8000; display: true"></i> \n\
                                        <i id="check-ins-bib-<id>-broken" class="fa fa-chain-broken autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-ins-bib-<id>-false" class="fa fa-exclamation-circle autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <div id="div-sug-ciudad-<id>" style="display: none" class="institucion">\n\
                                        <ul style="font-size:12px"><li>\n\
                                            <span><b>Sugerencias de ciudad por institución:</b>&nbsp;&nbsp<i id="check-ins-bib-<id>-expand" class="fa fa-sort-asc" aria-hidden="true" style="cursor: pointer;display:none"></i></span>\n\
                                            <br><ul id="sug-ciudad-<id>"> </ul> \n\
                                        <i id="sug-ciudad-<id>-load" class="fa fa-spinner fa-pulse institucion" aria-hidden="true" style="color: #ff8000; display: none"></i>\n\
                                        </li></ul>\n\
                                        </div>\n\
                                    </div> \n\
                                </div> \n\
                                <div class="col-xs-6"> \n\
                                    <div id="div-dependencia-<id>" style="display: true" class="institucion">\n\
                                        <span><b>Dependencia:</b></span><br><select id="dependencia-<id>" style="width: 100%" class="form-control dependencias institucion"> </select> \n\
                                    </div>\n\
                                    <i id="dependencia-<id>-load" class="fa fa-spinner fa-pulse institucion" aria-hidden="true" style="color: #ff8000; display: none"></i>\n\
                                </div> \n\
                            </div> \n\
                             <div class="row"> \n\
                                <div class="col-xs-6"> \n\
                                </div> \n\
                            </div> \n\
                            <div class="row"> \n\
                                <br>\n\
                                <div class="col-xs-5"><hr style="border-width: 5px;"> </div><div class="col-xs-2"><br><center>- <b><span id="numIns-<id>"><id></span></b> -</center></div><div class="col-xs-5"><hr style="border-width: 5px;"> </div>\n\
                            </div>\n\
                            <div class="row"> \n\
                                <br><br>\n\
                            </div>',
        html_autor:' <div id="div-autor-<id>"> \n\
                            <div class="row"> \n\
                                <div class="col-xs-12" style="text-align: right"> \n\
                                    <button id="borra-autor-<id>" type="button" class="btn btn-default btn-sm borra-autor autor"> \n\
                                        <span class="glyphicon glyphicon-remove" aria-hidden="true" style="color: #ff8000;"></span> Borrar Autor \n\
                                    </button> \n\
                                </div> \n\
                            </div> \n\
                            <div class="row"> \n\
                                <div class="col-sm-6"> \n\
                                    <span><b>Nombre:</b></span><br><input id="nombre-<id>" style="min-width: 100%" type="text" class="autor nombres"> \n\
                                    <div id="check-nombre-pdf-<id>" style="display: none"> \n\
                                        <i class="fa fa-file-pdf-o" aria-hidden="true" style="color: darkred"></i> \n\
                                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i> \n\
                                        <span id="check-nombre-pdf-<id>-texto" style="display: false"></span> \n\
                                        <i id="check-nombre-pdf-<id>-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i> \n\
                                        <i id="check-nombre-pdf-<id>-broken" class="fa fa-chain-broken" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-nombre-pdf-<id>-false" class="fa fa-exclamation-circle" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-nombre-pdf-<id>-half" class="fa fa-star-half-o" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-nombre-pdf-<id>-true" class="fa fa-star" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                    </div> \n\
                                    <div id="check-nombre-bib-<id>" style="display: none" class="autor"> \n\
                                        <img id="check-nombre-bib" src="/img/biblat_ico.png" style="height: 15px"/> \n\
                                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i> \n\
                                        <i id="check-nombre-bib-<id>-true" class="fa fa-star autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-nombre-bib-<id>-load" class="fa fa-spinner fa-pulse autor" aria-hidden="true" style="color: #ff8000; display: true"></i> \n\
                                        <i id="check-nombre-bib-<id>-broken" class="fa fa-chain-broken autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-nombre-bib-<id>-false" class="fa fa-exclamation-circle autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        &nbsp;&nbsp<i id="check-nombre-bib-<id>-expand" class="fa fa-sort-asc" aria-hidden="true" style="cursor: pointer;display:none"></i></span> \n\
                                        <span id="check-nombre-bib-<id>-texto" style="display:false; font-size:12px" class="autor"></span> \n\
                                    </div> \n\
                                    <div id="check-nombre-<id>" style="display: none" class="autor"> \n\
                                        <img id="check-nombre-orcid" src="/img/orcid.png" style="height: 15px"/> \n\
                                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i> \n\
                                        <i id="check-nombre-<id>-true" class="fa fa-star autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-nombre-<id>-load" class="fa fa-spinner fa-pulse autor" aria-hidden="true" style="color: #ff8000; display: true"></i> \n\
                                        <i id="check-nombre-<id>-broken" class="fa fa-chain-broken autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-nombre-<id>-half" class="fa fa-star-half-o autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-nombre-<id>-false" class="fa fa-exclamation-circle autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        &nbsp;&nbsp<i id="check-nombre-<id>-expand" class="fa fa-sort-asc" aria-hidden="true" style="cursor: pointer;display:none"></i></span> \n\
                                        <span id="check-nombre-<id>-texto" style="display:false; font-size:12px" class="autor"></span> \n\
                                    </div> \n\
                                </div> \n\
                                <div class="col-sm-6"> \n\
                                    <span><b>ORCID:</b></span><br><input id="orcid-<id>" style="min-width: 100%" type="text" class="autor orcids"> \n\
                                    <div id="check-orcid-pdf-<id>" style="display: none" class="autor"> \n\
                                        <i class="fa fa-file-pdf-o" aria-hidden="true" style="color: darkred"></i> \n\
                                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i> \n\
                                        <i id="check-orcid-pdf-<id>-load" class="fa fa-spinner fa-pulse autor" aria-hidden="true" style="color: #ff8000; display: true"></i> \n\
                                        <i id="check-orcid-pdf-<id>-broken" class="fa fa-chain-broken autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-orcid-pdf-<id>-false" class="fa fa-exclamation-circle autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-orcid-pdf-<id>-true" class="fa fa-star autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                    </div> \n\
                                    <div id="check-orcid-<id>" style="display: none" class="autor"> \n\
                                        <img id="check-orcid-orcid" src="/img/orcid.png" style="height: 15px"/> \n\
                                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i> \n\
                                        <i id="check-orcid-<id>-load" class="fa fa-spinner fa-pulse autor" aria-hidden="true" style="color: #ff8000; display: true"></i> \n\
                                        <i id="check-orcid-<id>-broken" class="fa fa-chain-broken autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-orcid-<id>-false" class="fa fa-exclamation-circle autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-orcid-<id>-true" class="fa fa-star autor" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        &nbsp;&nbsp<i id="check-orcid-<id>-expand" class="fa fa-sort-asc" aria-hidden="true" style="cursor: pointer;display:none"></i></span> \n\
                                        <span id="check-orcid-<id>-texto" style="display:false; font-size:12px" class="autor"></span> \n\
                                    </div> \n\
                                </div> \n\
                            </div> \n\
                            <div class="row"> \n\
                                <br> \n\
                            </div> \n\
                            <div class="row"> \n\
                                <div class="col-sm-11 col-md-6"> \n\
                                    <span><b>Institución:</b></span><br><select id="a-institucion-<id>" style="width: 100%" type="text" class="a-instituciones autor"> </select> \n\
                                </div> \n\
                                <!--div class="col-md-1"> \n\
                                    <br> \n\
                                    <i class="fa fa-refresh actualiza-instituciones" aria-hidden="true" title="Actualizar instituciones" style="color: #ff8000; cursor: pointer"></i>\n\
                                </div--> \n\
                            </div> \n\
                            <div class="row"> \n\
                                <br>\n\
                                <div class="col-xs-5"><hr style="border-width: 5px;"> </div><div class="col-xs-2"><br><center>- <b><span id="numAut-<id>"><id></span></b> -</center></div><div class="col-xs-5"><hr style="border-width: 5px;"> </div>\n\
                            </div>\n\
                    </div>',
        opciones_paises: '',
        a_opciones_instituciones: '',
        texto_pdf: '',
        catalogos: { 
                        tipo_documento: [],
                        disciplina: [],
                        pais: [],
                        pais_slug: [],
                    },
        max_largo_pais: 0,
        sistema: '',
        cambios_de_inicio: true,
        cambios_documento: false,
        cambios_autor: false,
        cambios_institucion: false
    },
    initClient: function() {
        $.when(class_utils.getResource('/datos/articulos/')) 
        .then(function(resp_articulos){
            class_av.var.articulosJSON = resp_articulos;
            class_av.setTabla(class_av.var.articulosJSON);
            var object = {
                private_key: env.P_K,
                client_email: b(env.C_E),
                scopes: class_av.cons.SCOPES,
            };
            
            gapi.load("client", async function(){
                    gapi.auth.setToken(await GetAccessTokenFromServiceAccount.do(object));
                    gapi.client.init({
                        discoveryDocs: class_av.cons.DISCOVERY_DOCS,
                    }).then(function () {
                        //Lectura de hoja de cálculo, se requiere el ID y la hoja de la que leerá
                        gapi.client.sheets.spreadsheets.values.get({
                            spreadsheetId: b(env.sId),
                            range: "Catálogos",
                        }).then(function(response) {
                            var catalogos = response.result.values;
                            var options = '';
                            		
                            var id_tipo_documento = catalogos[0].indexOf('Tipo de documento');
                            var id_disciplina = catalogos[0].indexOf('Disciplina');
                            var id_pais = catalogos[0].indexOf('País');
                            $.each(catalogos, function(i, val){
                                if(i>0){
                                    if(val[id_tipo_documento].trim() != ''){
                                        class_av.var.catalogos['tipo_documento'].push(val[id_tipo_documento].trim());
                                    }
                                    if(val[id_disciplina].trim() != ''){
                                        var arr_disc = val[id_disciplina].split(';');
                                        var disc = arr_disc[0].trim();
                                        class_av.var.catalogos['disciplina'].push(disc);
                                        class_av.var.catalogos[disc] = arr_disc.splice(1);
                                    }
                                    if(val[id_pais].trim() != ''){
                                        class_av.var.catalogos['pais'].push(val[id_pais].trim());
                                    }
                                }
                            });
                            
                            /**************************************************/
                            var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                            $.each(class_av.var.catalogos['tipo_documento'], function(i, val){
                                options += class_av.cons.option.replace('<valor>', val).replace('<opcion>', val);
                            });
                            $('#tipo_documento').html(options);
                            $('#tipo_documento').on('change', function(){
                                class_av.var.cambios_documento = (true && !class_av.var.cambios_de_inicio);
                            });
                            $('#tipo_documento').select2({ tags: true, placeholder: "Seleccione un tipo de documento", allowClear: true});
                            
                            /**************************************************/
                            options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                            $.each(class_av.var.catalogos['pais'], function(i, val){
                                options += class_av.cons.option.replace('<valor>', val).replace('<opcion>', val);
                                
                                //Catálogo para usar más adelante
                                class_av.var.catalogos['pais_slug'].push(class_utils.slug(val));
                                
                                //Máximo de palabras en catálogo de países, se usa más adelante
                                if( val.split(' ').length > class_av.var.max_largo_pais ){
                                    class_av.var.max_largo_pais = val.split(' ').length;
                                }
                            });
                            class_av.var.opciones_paises = options;
                            
                            /**************************************************/
                            options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                            $.each(class_av.var.catalogos['disciplina'], function(i, val){
                                options += class_av.cons.option.replace('<valor>', val).replace('<opcion>', val);
                            });
                            
                            $('#disciplina1').html(options);
                            $('#disciplina2').html(options);
                            $('#disciplina3').html(options);
                            
                            $('.disciplina').off('change').on('change', function(e){
                                var id_dis = this.id.slice(-1);
                                var disc = $('#disciplina'+id_dis).val();
                                
                                if(disc == null || disc == ''){
                                    $('#divSubdisciplina'+id_dis).hide();
                                    $('#subdisciplina'+id_dis).val(null).trigger('change');
                                    return false;
                                }
                                
                                //Si disciplina está en blanco o se selecciona una que no está en catálogo
                                if(disc == '' || !class_av.var.catalogos.hasOwnProperty(disc)){
                                    $('#divSubdisciplina'+id_dis).hide();
                                    $('#subdisciplina'+id_dis).val(null).trigger('change');
                                    $('#disciplina'+id_dis).val(null).trigger('change');
                                }else{
                                    $('#divSubdisciplina'+id_dis).show();

                                    var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                    $.each(class_av.var.catalogos[disc], function(i, val){
                                        options += class_av.cons.option.replace('<valor>', val).replace('<opcion>', val);
                                    });

                                    $('#subdisciplina'+id_dis).html(options);
                                    $('#subdisciplina'+id_dis).on('change', function(){
                                        class_av.var.cambios_documento = (true && !class_av.var.cambios_de_inicio);
                                    });
                                    $('#subdisciplina'+id_dis).select2({ tags: false, placeholder: "Seleccione una subdisciplina", allowClear: true});
                                }
                                
                                class_av.var.cambios_documento = (true && !class_av.var.cambios_de_inicio);
                            });
                            
                            $('.disciplina').select2({ tags: false, placeholder: "Seleccione una disciplina", allowClear: true});
                            
                            loading.end();
                        });
                    });
                });
        });
    },
    ready: function(){
        loading.start();
        class_av.initClient();
    },
    control: function(){
        $('.sistema').off('click').on('click', function(e){
            var _id = this.id;
            var sistema = _id.split('__')[0];
            
            if(class_av.cambios_sin_guardar('sistema', this)){
                return false;
            }
            
            class_av.var.cambios_autor = false;
            class_av.var.cambios_documento = false;
            class_av.var.cambios_institucion = false;
            class_av.var.cambios_de_inicio = true;
            
            //Cuando ya se marcó como completado o no indizable no se muestra el contenido
            if($('.'+sistema).hasClass('cerrado')){
                return false;
            }
            
            loading.start();
            $('#accordion').hide();
            
            class_av.var.sistema = sistema;
            var revista = _id.split('__')[1];
            var articulo = _id.split('__')[2];
            
            $('#articulo').collapse('hide');
            $('#instituciones').collapse('hide');
            $('#autores').collapse('hide');
            
            setTimeout(function(){
                $('#articulo').collapse('hide');
                $('#instituciones').collapse('hide');
                $('#autores').collapse('hide');
                setTimeout(function(){
                    $('#articulo').collapse('show');
                    $('#titRevista').html(revista);
                    $('#titArticulo').html(articulo);
            
            $.when(
                    class_utils.getResource('/datos/documento/'+sistema),
                    class_utils.getResource('/datos/autores/'+sistema),
                    class_utils.getResource('/datos/instituciones/'+sistema)
            ) 
            .then(function(resp_documento, resp_autores, resp_instituciones){
                class_av.var.documentoJSON = resp_documento[0];
                class_av.var.autoresJSON = resp_autores[0];
                class_av.var.institucionesJSON = resp_instituciones[0];
                
                if(class_av.var.institucionesJSON !== undefined){
                    class_av.var.institucionesJSON.sort(class_utils.order_by('id'));
                }
                
                if(class_av.var.autoresJSON !== undefined){
                    class_av.var.autoresJSON.sort(class_utils.order_by('id'));
                }
                
                /******************************************************************/
                var url_pdf='';
                if(class_av.var.documentoJSON[0].tipourl1 == 'pdf'){
                    //url_pdf = class_av.var.documentoJSON[0].url1.replaceAll('/','<slash>');
                    url_pdf = class_av.var.documentoJSON[0].url1;
                }else if(class_av.var.documentoJSON[0].tipourl2 == 'pdf'){
                    //url_pdf = class_av.var.documentoJSON[0].url2.replaceAll('/','<slash>');
                    url_pdf = class_av.var.documentoJSON[0].url2;
                }
                
                //Lectura del pdf
                $.when(
                    class_utils.setResource(class_av.var.servidor + class_av.var.app + '/get_pdf/', {url: url_pdf})
                ) 
                .then(function(resp_pdf){    
                    class_av.var.texto_pdf = resp_pdf.result;

                    /**** Búsqueda de título en pdf *********/
                    //if(url_pdf !== ''){
                        //class_av.busca_en_pdf(url_pdf, class_av.var.documentoJSON[0].articulo, '#check-titulo', '#titulo');
                        class_av.busca_en_pdf(class_av.var.texto_pdf, class_av.var.documentoJSON[0].articulo, '#check-titulo', '#titulo');
                    //}

                    $('#titulo').val(class_av.var.documentoJSON[0].articulo);
                    var tiempo;
                    $('#titulo').off('keyup').on('keyup', function(e){
                        if (e.key === "Enter") {
                            clearTimeout(tiempo);
                            //REvisa que exista una longitud en el texto oríginal del título y que lo que se ha escrito sea +- 10 caracteres que "el original"
                            // Comprobamos si es un carácter, un espacio o la tecla de borrar

                            //var len_articulo = class_av.var.documentoJSON[0].articulo.length;
                            //if( len_articulo == 0 || ( len_articulo > 0 && $('#titulo').val().length > len_articulo - 20)){
                                $('#titulo').prop("disabled", true);
                                tiempo = setTimeout(function() {
                                    class_av.texto_idioma($('#titulo').val(), $('#idioma').val(), '#check-idioma', '#idioma');
                                    //class_av.busca_en_pdf(url_pdf, $('#titulo').val(), '#check-titulo', '#titulo');
                                    class_av.busca_en_pdf(class_av.var.texto_pdf, $('#titulo').val(), '#check-titulo', '#titulo');
                                }, 1000);
                            //}else{
                                //class_av.busca_en_pdf(url_pdf, $('#titulo').val(), '#check-titulo', null);
                                //class_av.busca_en_pdf(class_av.var.texto_pdf, $('#titulo').val(), '#check-titulo', null);
                            //}
                        }
                        class_av.var.cambios_documento = true;
                    });

                    $("#idioma").val(null);
                    $("#idioma2").val(null);
                    $("#idioma3").val(null);
                    $("#tipourl1").val(null);
                    $("#tipourl2").val(null);


                    /******************************************************************/
                    $("#idioma").val(class_av.var.documentoJSON[0].idioma);
                    /****Búsqueda idioma ********/
                    if(class_av.var.documentoJSON[0].idioma !== ''){
                        class_av.texto_idioma(class_av.var.documentoJSON[0].articulo, class_av.var.documentoJSON[0].idioma, '#check-idioma', '#idioma');
                    }

                    var tiempo_tit;
                    $('#idioma').off('change').on('change', function(e){
                        clearTimeout(tiempo_tit);

                        //var len_articulo = class_av.var.documentoJSON[0].articulo.length;
                        //if( len_articulo == 0 || ( len_articulo > 0 && $('#titulo').val().length > len_articulo - 20)){
                            $('#idioma').prop("disabled", true);
                            tiempo_tit = setTimeout(function() {
                                class_av.texto_idioma($('#titulo').val(), $('#idioma').val(), '#check-idioma', '#idioma');
                            }, 1000);
                        //}
                        
                        class_av.var.cambios_documento = true;
                    });


                    
                        $('.traduccion-titulo2').show();
                        $('#titulo2').val(class_av.var.documentoJSON[0].titulo2);
                        $("#idioma2").val(class_av.var.documentoJSON[0].idioma2);
                        
                        $('#titulo2').off('keyup').on('keyup', function(e){
                            if (e.key === "Enter") {
                                clearTimeout(tiempo);
                                $('#titulo2').prop("disabled", true);
                                tiempo = setTimeout(function() {
                                    class_av.texto_idioma($('#titulo2').val(), $('#idioma2').val(), '#check-idioma2', '#idioma2');
                                    class_av.busca_en_pdf(class_av.var.texto_pdf, $('#titulo2').val(), '#check-titulo2', '#titulo2');
                                }, 1000);
                            }
                            class_av.var.cambios_documento = true;
                        });

                        class_av.busca_en_pdf(class_av.var.texto_pdf, class_av.var.documentoJSON[0].titulo2, '#check-titulo2', '#titulo2');
                        
                        class_av.texto_idioma(class_av.var.documentoJSON[0].titulo2, class_av.var.documentoJSON[0].idioma2, '#check-idioma2', '#idioma2');
                        
                        $('#idioma2').off('change').on('change', function(e){
                            clearTimeout(tiempo_tit);

                            $('#idioma2').prop("disabled", true);
                            tiempo_tit = setTimeout(function() {
                                class_av.texto_idioma($('#titulo2').val(), $('#idioma2').val(), '#check-idioma2', '#idioma2');
                            }, 1000);
                            class_av.var.cambios_documento = true;
                        });
                    

                    /******************************************************************/
                    
                        $('.traduccion-titulo3').show();
                        $('#titulo3').val(class_av.var.documentoJSON[0].titulo3);
                        $("#idioma3").val(class_av.var.documentoJSON[0].idioma3);
                        
                        $('#titulo3').off('keyup').on('keyup', function(e){
                            if (e.key === "Enter") {
                                clearTimeout(tiempo);
                                $('#titulo3').prop("disabled", true);
                                tiempo = setTimeout(function() {
                                    class_av.texto_idioma($('#titulo3').val(), $('#idioma3').val(), '#check-idioma3', '#idioma3');
                                    class_av.busca_en_pdf(class_av.var.texto_pdf, $('#titulo3').val(), '#check-titulo3', '#titulo3');
                                }, 1000);
                            }
                            class_av.var.cambios_documento = true;
                        });
                        
                        class_av.busca_en_pdf(class_av.var.texto_pdf, class_av.var.documentoJSON[0].titulo3, '#check-titulo3', '#titulo3');
                        
                        class_av.texto_idioma(class_av.var.documentoJSON[0].titulo3, class_av.var.documentoJSON[0].idioma3, '#check-idioma3', '#idioma3');
                        
                        $('#idioma3').off('change').on('change', function(e){
                            clearTimeout(tiempo_tit);

                            $('#idioma3').prop("disabled", true);
                            tiempo_tit = setTimeout(function() {
                                class_av.texto_idioma($('#titulo3').val(), $('#idioma3').val(), '#check-idioma3', '#idioma3');
                            }, 1000);
                            class_av.var.cambios_documento = true;
                        });
                    

                    /******************************************************************/
                    $('#tipo_documento').val(class_av.var.documentoJSON[0].tipo_documento).trigger('change');

                    /******************************************************************/
                    $('.disciplina').val(null).trigger('change');

                    $('#disciplina1').val(class_av.var.documentoJSON[0].disciplina1).trigger('change');
                    $('#disciplina2').val(class_av.var.documentoJSON[0].disciplina2).trigger('change');
                    $('#disciplina3').val(class_av.var.documentoJSON[0].disciplina3).trigger('change');
                    
                    $('#subdisciplina1').val(class_av.var.documentoJSON[0].subdisciplina1).trigger('change');
                    $('#subdisciplina2').val(class_av.var.documentoJSON[0].subdisciplina2).trigger('change');
                    $('#subdisciplina3').val(class_av.var.documentoJSON[0].subdisciplina3).trigger('change');

                    /******************************************************************/
                    $('#url1').val(class_av.var.documentoJSON[0].url1);
                    $('#url2').val(class_av.var.documentoJSON[0].url2);
                    $("#tipourl1").val(class_av.var.documentoJSON[0].tipourl1);
                    $("#tipourl2").val(class_av.var.documentoJSON[0].tipourl2);
                    
                    $('#url1, #url2, #tipourl1, #tipourl2').off('change').on('change', function(e){
                            class_av.var.cambios_documento = true;
                    });
                    
                    
                    class_av.var.cambios_de_inicio = false;
                    /******************************************************************/
                    $('#div-instituciones').html('');
                    opciones_ciudades = {};
                    var repetidas_ciudades = [];

                    opciones_instituciones = {};
                    var repetidas_instituciones = [];

                    opciones_dependencias = {};
                    var repetidas_dependencias = [];

                    opciones_sug_ciudades = {};
                    var repetidas_sug_ciudades = [];

                    $('#accordion').show();
                    window.location.href="#accordion";
                    
                    $('#agrega-institucion').off('click').on('click', function(){
                        class_av.agrega_institucion();
                        class_av.var.cambios_institucion = true;
                    });
                    
                    $('#agrega-autor').off('click').on('click', function(){
                        class_av.agrega_autor();
                        class_av.var.cambios_autor = true;
                    });
                    
                    loading.end();

                    $('#accordionInstituciones').html('Cargando Instituciones...');
                    $('#accordionInstituciones').prop('href', '');
                    
                    if(class_av.var.institucionesJSON.length == 0){
                        $('#accordionInstituciones').html('Instituciones');
                        $('#accordionInstituciones').prop('href', '#instituciones');
                    }

                    var revisaRepetidas = function(){

                        $.each(class_av.var.institucionesJSON, function(i,val){

                            if(val.pais !== null){
                                //Revisa al final las repetidas para agregar el menu
                                $.each(repetidas_ciudades, function(i2, val2){
                                    if(val2.pais == val.pais) {
                                        $('#ciudad-'+val2.id).html(opciones_ciudades[val.pais]);
                                        $('#ciudad-'+val2.id).select2({ tags: true, placeholder: "Seleccione una ciudad", allowClear: true});
                                        if(val2.ciudad !== null){
                                           $('#ciudad-'+val2.id).val(val2.ciudad).trigger('change');
                                        }
                                    }
                                });

                                //Revisa al final las repetidas para agregar el menu
                                $.each(repetidas_instituciones, function(i2, val2){
                                    if(val2.pais == val.pais) {
                                        $('#institucion-'+val2.id).html(opciones_instituciones[val.pais]);
                                        $('#institucion-'+val2.id).select2({ tags: true, placeholder: "Seleccione una institución", allowClear: true/*,  width: 'Auto'*/});
                                        if(val2.institucion !== null){
                                            //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                                            if ($('#institucion-'+val2.id).find("option[value='" + val2.institucion.replaceAll('"', "&quot;") + "']").length) {
                                                $('#institucion-'+val2.id).val(val2.institucion).trigger('change');
                                            }else{
                                                var newOption = new Option(val2.institucion, val2.institucion.replaceAll('"', "&quot;"), true, true);
                                                $('#institucion-'+val2.id).append(newOption).trigger('change');
                                            }
                                           //$('#institucion-'+val2.id).val(val2.institucion).trigger('change');
                                           class_av.busca_en_pdf(class_av.var.texto_pdf, val2.institucion, '#check-ins-'+val2.id, '#institucion-'+val2.id);
                                        }
                                    }
                                });
                            }

                            if(val.institucion !== null){
                                //Revisa al final las repetidas para agregar el menu
                                $.each(repetidas_dependencias, function(i2, val2){
                                    if(val2.institucion == val.institucion) {
                                        $('#dependencia-'+val2.id).html(opciones_dependencias[val.institucion]);
                                        $('#dependencia-'+val2.id).select2({ tags: true, placeholder: "Seleccione una dependencia", allowClear: true});
                                        if(val2.dependencia !== null){
                                            $('#dependencia-'+val2.id).val(val2.dependencia).trigger('change');
                                        }
                                    }
                                });

                                //Revisa al final las repetidas para agregar el menu
                                $.each(repetidas_sug_ciudades, function(i2, val2){
                                    if(val2.institucion == val.institucion) {
                                        $('#sug-ciudad-'+val2.id).html(opciones_sug_ciudades[val.institucion]);
                                        $('#sug-ciudad-'+val2.id).select2({ tags: true, placeholder: "Sugerencias encontradas", allowClear: true});
                                        $('#check-ins-bib-'+val2.id+'-expand').show();
                                        $('#check-ins-bib-'+val2.id+'-expand').on('click', function(){
                                            if($('#check-ins-bib-'+val2.id+'-expand').hasClass('fa fa-sort-desc')){
                                               $('#check-ins-bib-'+val2.id+'-expand').removeClass('fa-sort-desc');
                                               $('#check-ins-bib-'+val2.id+'-expand').addClass('fa-sort-asc');  
                                            }else{
                                               $('#check-ins-bib-'+val2.id+'-expand').addClass('fa-sort-desc');
                                               $('#check-ins-bib-'+val2.id+'-expand').removeClass('fa-sort-asc');
                                            }
                                           if( $('#sug-ciudad-'+val2.id).css('display') == 'none' ){
                                               $('#sug-ciudad-'+val2.id).show();
                                           }else{
                                               $('#sug-ciudad-'+val2.id).hide();
                                           }
                                        });
                                    }
                                });
                            }

                        });

                        $('.select2-container').css('max-width','100%');

                        /********* función para borrar *************/
                        class_av.evento_borra_institucion();

                        $('#accordionInstituciones').html('Instituciones');
                        $('#accordionInstituciones').prop('href', '#instituciones');
                        
                        class_av.change_paises();
                        class_av.change_institucion();
                    };

                    var peticiones = 0;

                    $.each(class_av.var.institucionesJSON, function(i,val){
                        var html_institucion = class_av.var.html_institucion.replaceAll('<id>', val.id);
                        $('#div-instituciones').append(html_institucion);
                        $('#pais-'+val.id).html(class_av.var.opciones_paises);
                        $('#pais-'+val.id).select2({ tags: false, placeholder: "Seleccione un país", allowClear: true});

                        if(val.pais == null){
                            //Si existe un país válido en el texto de institución, lo asigna a país
                            var res_pais = class_av.busca_pais(val.institucion);
                            if( res_pais ){
                                val.pais = res_pais;
                            }
                        }

                        if(val.pais !== null){
                            $('#pais-'+val.id).val(val.pais).trigger('change');
                            //Revisa si ya se trajo el catálogo para este país
                            if( !opciones_ciudades.hasOwnProperty(val.pais) ){
                                peticiones ++;
                                opciones_ciudades[val.pais] = '';
                                opciones_instituciones[val.pais] = '';
                                /*********** Ciudades e instituciones según país *******************/
                                $.when(
                                    class_utils.getResource('/datos/ciudad_by_pais/'+val.pais.replaceAll(',','')),
                                    class_utils.getResource('/datos/institucion_by_pais/'+val.pais.replaceAll(',',''))
                                ) 
                                .then(function(resp_ciudad, resp_institucion){
                                    setTimeout(function(){                     
                                        peticiones --;
                                        /*********ciudad*******************/
                                        var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                        $.each(resp_ciudad[0], function(i2, val2){
                                            options += class_av.cons.option.replace('<valor>', val2.ciudad).replace('<opcion>', val2.ciudad);
                                        });
                                        opciones_ciudades[val.pais] = options;
                                        $('#ciudad-'+val.id).html(opciones_ciudades[val.pais]);
                                        $('#ciudad-'+val.id).select2({ tags: true, placeholder: "Seleccione una ciudad", allowClear: true});
                                        
                                        //Si hay un valor de ciudad se preselecciona
                                        if(val.ciudad !== null){
                                            $('#ciudad-'+val.id).val(val.ciudad).trigger('change');
                                        }

                                        /*********institucion*******************/
                                        options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                        $.each(resp_institucion[0], function(i2, val2){
                                            options += class_av.cons.option.replace('<valor>', val2.institucion.replaceAll('"', "&quot;")).replace('<opcion>', val2.institucion);
                                        });
                                        opciones_instituciones[val.pais] = options;
                                        $('#institucion-'+val.id).html(opciones_instituciones[val.pais]);
                                        $('#institucion-'+val.id).select2({ tags: true, placeholder: "Seleccione una institución", allowClear: true,  width: 'resolve'});
                                        
                                        //Si hay un valor de institución se preselecciona
                                        if(val.institucion !== null){
                                            //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                                            if ($('#institucion-'+val.id).find("option[value='" + val.institucion.replaceAll('"', "&quot;") + "']").length) {
                                                $('#institucion-'+val.id).val(val.institucion).trigger('change');
                                            }else{
                                                var newOption = new Option(val.institucion, val.institucion.replaceAll('"', "&quot;"), true, true);
                                                $('#institucion-'+val.id).append(newOption).trigger('change');
                                            }
                                            //if(url_pdf !== ''){
                                                //class_av.busca_en_pdf(url_pdf, val.institucion, '#check-ins-'+val.id, '#institucion-'+val.id);
                                                class_av.busca_en_pdf(class_av.var.texto_pdf, val.institucion, '#check-ins-'+val.id, '#institucion-'+val.id);
                                            //}
                                        }
                                        
                                        //Ya que se terminan las peticiones por país, se revisan instituciones del mismo país
                                        if( peticiones == 0 ){
                                            revisaRepetidas();
                                        }
                                    }, 1000);
                                });
                            }else{
                                //Pone en pendientes las que sean del mismo país
                                var obj_repetidas_ciudades = {};
                                obj_repetidas_ciudades['id'] = val.id;
                                obj_repetidas_ciudades['pais'] = val.pais;
                                obj_repetidas_ciudades['ciudad'] = val.ciudad;
                                repetidas_ciudades.push(obj_repetidas_ciudades);

                                //Pone en pendientes las que sean del mismo país
                                var obj_repetidas_instituciones = {};
                                obj_repetidas_instituciones['id'] = val.id;
                                obj_repetidas_instituciones['pais'] = val.pais;
                                obj_repetidas_instituciones['institucion'] = val.institucion;
                                repetidas_instituciones.push(obj_repetidas_instituciones);
                            }
                        }else{
                            //Generalmente no hay país puesto que no existe un campo de donde extraerlo,
                            //Si no se encontró tampoco dentro del texto de institución
                            /*********institucion*******************/
                            if(val.institucion !== null){
                                var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                options += class_av.cons.option.replace('<valor>', val.institucion.replaceAll('"', "&quot;")).replace('<opcion>', val.institucion);

                                $('#institucion-'+val.id).html(options);
                                $('#institucion-'+val.id).select2({ tags: true, placeholder: "Seleccione una institución", allowClear: true,  width: 'resolve'});
                                $('#institucion-'+val.id).val(val.institucion).trigger('change');
                                //if(url_pdf !== ''){
                                    //class_av.busca_en_pdf(url_pdf, val.institucion, '#check-ins-'+val.id, '#institucion-'+val.id);
                                    class_av.busca_en_pdf(class_av.var.texto_pdf, val.institucion, '#check-ins-'+val.id, '#institucion-'+val.id);
                                //}
                            }
                        }                    

                        /************************Dependencias*****************/
                        if(val.institucion !== null){
                            //Revisa si ya se trajo el catálogo para este país
                            if( !opciones_dependencias.hasOwnProperty(val.institucion) ){
                                peticiones++;
                                opciones_dependencias[val.institucion] = '';
                                /*********** dependencias según institucion *******************/
                                $.when(
                                    class_utils.getResource('/datos/dependencia_by_institucion/'+val.institucion.replaceAll(class_av.cons.char_i,'')),
                                    class_utils.getResource('/datos/ciudad_by_institucion/'+val.institucion.replaceAll(class_av.cons.char_i, ''))
                                ) 
                                .then(function(resp_dependencias, resp_ciudades){
                                    peticiones--;
                                    var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                    $.each(resp_dependencias[0], function(i2, val2){
                                        options += class_av.cons.option.replace('<valor>', val2.dependencia.replace('"', "&quot;")).replace('<opcion>', val2.dependencia);
                                    });
                                    opciones_dependencias[val.institucion] = options;
                                    $('#dependencia-'+val.id).html(opciones_dependencias[val.institucion]);
                                    $('#dependencia-'+val.id).select2({ tags: true, placeholder: "Seleccione una dependencia", allowClear: true});
                                    if(val.dependencia !== null){
                                        $('#dependencia-'+val.id).val(val.dependencia).trigger('change');
                                    }
                                    
                                    $('#check-ins-bib-'+val.id).show();
                                    $('#check-ins-bib-'+val.id+'-load').hide();
                                    if(resp_ciudades[0].length > 0){
                                        $('#check-ins-bib-'+val.id+'-true').show();
                                        $('#div-sug-ciudad-'+val.id).show();
                                        $('#check-ins-bib-'+val.id+'-expand').show();
                                        $('#check-ins-bib-'+val.id+'-expand').on('click', function(){
                                           if($('#check-ins-bib-'+val.id+'-expand').hasClass('fa fa-sort-desc')){
                                                $('#check-ins-bib-'+val.id+'-expand').removeClass('fa-sort-desc');
                                                $('#check-ins-bib-'+val.id+'-expand').addClass('fa-sort-asc');  
                                             }else{
                                                $('#check-ins-bib-'+val.id+'-expand').addClass('fa-sort-desc');
                                                $('#check-ins-bib-'+val.id+'-expand').removeClass('fa-sort-asc');
                                             }
                                           if( $('#sug-ciudad-'+val.id).css('display') == 'none' ){
                                               $('#sug-ciudad-'+val.id).show();
                                           }else{
                                               $('#sug-ciudad-'+val.id).hide();
                                           }
                                        });
                                    }else{
                                        $('#check-ins-bib-'+val.id+'-false').show();
                                        $('#div-sug-ciudad-'+val.id).hide();
                                    }
                                    //options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                    options = '';
                                    $.each(resp_ciudades[0], function(i2, val2){
                                        //options += class_av.cons.option.replace('<valor>', val2.ciudad.replace('"', "&quot;")).replace('<opcion>', val2.ciudad);
                                        options += '<li>' + val2.ciudad + '</li>';
                                    });
                                    opciones_sug_ciudades[val.institucion] = options;
                                    $('#sug-ciudad-'+val.id).html(opciones_sug_ciudades[val.institucion]);
                                    //$('#sug-ciudad-'+val.id).select2({ tags: true, placeholder: "Sugerencias encontradas", allowClear: true});

                                    if( peticiones == 0 ){
                                        revisaRepetidas();
                                    }
                                });
                            }else{
                                //Pone en pendientes las que sean de la misma institución
                                var obj_repetidas_dependencias = {};
                                obj_repetidas_dependencias['id'] = val.id;
                                obj_repetidas_dependencias['institucion'] = val.institucion;
                                obj_repetidas_dependencias['dependencia'] = val.dependencia;
                                repetidas_dependencias.push(obj_repetidas_dependencias);

                                //Pone en pendientes las que sean de la misma institución
                                var obj_repetidas_ciudades = {};
                                obj_repetidas_ciudades['id'] = val.id;
                                obj_repetidas_ciudades['institucion'] = val.institucion;
                                obj_repetidas_ciudades['ciudad'] = val.ciudad;
                                repetidas_sug_ciudades.push(obj_repetidas_ciudades);

                                if( peticiones == 0 ){
                                    revisaRepetidas();
                                }
                            }
                        }else{
                            setTimeout(function(){
                                if( peticiones == 0 ){
                                    revisaRepetidas();
                                } 
                            }, 2000);
                        }
                    });
                    
                    /******************************************************************/
                    $('#div-autores').html('');

                    $('#accordionAutores').html('Cargando Autores...');
                    $('#accordionAutores').prop('href', '');

                    /*********institucion*******************/
                    class_av.var.a_opciones_instituciones = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                    $.each(class_av.var.institucionesJSON, function(i,val){
                        class_av.var.a_opciones_instituciones += class_av.cons.option.replace('<valor>', val.id).replace('<opcion>', val.institucion);
                    });

                    $.each(class_av.var.autoresJSON, function(i,val){
                        var html_autor = class_av.var.html_autor.replaceAll('<id>', val.id);
                        var institucion = null;
                        $('#div-autores').append(html_autor);
                        $('#a-institucion-'+val.id).html(class_av.var.a_opciones_instituciones);
                        $('#a-institucion-'+val.id).select2({ tags: true, placeholder: "Seleccione una institución", allowClear: true});
                        if(val['institucionId'] !== null){
                            institucion = class_utils.find_prop(class_av.var.institucionesJSON, 'id',val['institucionId'])['institucion'];
                            $('#a-institucion-'+val.id).val(val['institucionId']).trigger('change');
                        }
                        $('#nombre-'+val.id).val(val.nombre);
                        $('#orcid-'+val.id).val(val.orcid);
                        
                        class_av.orcid_por_nombre(val.nombre, institucion, val.orcid, '#check-nombre-'+val.id, '#nombre-'+val.id);
                        var nombre = val.nombre.split(',');
                        if(nombre[1]){
                            nombre = nombre[1] + ' ' + nombre[0];
                        }
                        class_av.busca_en_pdf(class_av.var.texto_pdf, nombre, '#check-nombre-pdf-'+val.id, '#nombre-'+val.id);
                        class_av.busca_en_pdf(class_av.var.texto_pdf, val.orcid, '#check-orcid-pdf-'+val.id, '#orcid-'+val.id);
                        class_av.nombre_por_orcid(val.orcid, val.nombre, institucion, '#check-orcid-'+val.id, '#orcid-'+val.id);
                        class_av.biblat_por_nombre(val.nombre, institucion, '#check-nombre-bib-'+val.id, '#nombre-'+val.id);
                        
                    });
                      
                    $('#accordionAutores').html('Autores');
                    $('#accordionAutores').prop('href', '#autores');
                    class_av.evento_borra_autor();
                    class_av.change_nombre();
                    class_av.change_orcid();
                });
            });
            
            },500);
            },500);
        });
        class_av.control_guarda();
    },
    borra_institucion: function(id){
        class_av.var.institucionesJSON.splice(id-1,1);
        $('#div-institucion-'+id).remove();
        $.each(class_av.var.institucionesJSON, function(i, val){
            if( parseInt(val.id) > id){
                //El texto al final del número de la institución
                $('#numIns-'+val.id).html(String(parseInt(val.id)-1));
                
                //A cada elemento dentro del div se le cambia el id por uno menor ya que hubo un borrado
                $('#div-institucion-'+val.id).find('[id*="-'+val.id+'"]').each(function() {
                    // Haz algo con los elementos que contienen "-1" en su ID
                    var elemento = $(this);
                    // Cambia el ID del elemento
                    elemento[0].id = elemento[0].id.replace('-'+val.id, '-'+String(parseInt(val.id)-1));
                });
                
                //Al final al div también se le hace el cambio del id
                $('#div-institucion-'+val.id)[0].id = 'div-institucion-' + String(parseInt(val.id)-1);

                //Lo mismo al elemento en JSON
                val.id = String(parseInt(val.id)-1);
            }
        });
        
        //A los autores que pertenecían a la institución eliminada se les elimina el ID, a los restantes se hace el recorrido hacia atrás del Id
        $.each(class_av.var.autoresJSON, function(i, val){
            if(val['institucionId'] == id){
                val['institucionId'] = null;
            }
            if( parseInt(val['institucionId']) > id){
                val['institucionId'] = String(parseInt(val['institucionId'])-1);
            }
        });
        
        class_av.reset_autores();
        class_av.evento_borra_institucion();
        class_av.var.cambios_institucion = true;
    },
    borra_autor: function(id){
        $('#div-autor-'+id).remove();
        class_av.var.autoresJSON.splice(id-1,1);
        $.each(class_av.var.autoresJSON, function(i, val){
            if( parseInt(val.id) > id){
                //El texto al final del número de la institución
                $('#numAut-'+val.id).html(String(parseInt(val.id)-1));
                
                //A cada elemento dentro del div se le cambia el id por uno menor ya que hubo un borrado
                $('#div-autor-'+val.id).find('[id*="-'+val.id+'"]').each(function() {
                    // Haz algo con los elementos que contienen "-1" en su ID
                    var elemento = $(this);
                    // Cambia el ID del elemento
                    elemento[0].id = elemento[0].id.replace('-'+val.id, '-'+String(parseInt(val.id)-1));
                });
                
                $('#div-autor-'+val.id)[0].id = 'div-autor-' + String(parseInt(val.id)-1);
                val.id = String(parseInt(val.id)-1);
            }
        });
        class_av.evento_borra_autor();
        class_av.var.cambios_autor = true;
    },
    evento_borra_institucion: function(){
        $('.borra-institucion').off('click').on('click', function(){
            var borra_id = this.id.split('-')[2];
            class_av.borra_institucion(borra_id);
        });
    },
    evento_borra_autor: function(){
        $('.borra-autor').off('click').on('click', function(){
            var borra_id = this.id.split('-')[2];
            class_av.borra_autor(borra_id);
        });
    },
    agrega_institucion: function(){
        var id = String(class_av.var.institucionesJSON.length+1);
        
        var obj_inst = {
            ciudad: '',
            dependencia: '',
            id: id,
            institucion: '',
            pais: '',
            sistema: class_av.var.sistema
        };
        class_av.var.institucionesJSON.push(obj_inst);
        
        var html_institucion = class_av.var.html_institucion.replaceAll('<id>', obj_inst.id);
        $('#div-instituciones').append(html_institucion);
        $('#pais-'+id).html(class_av.var.opciones_paises);
        $('#pais-'+id).select2({ tags: false, placeholder: "Seleccione un país", allowClear: true});
        
        //Debido a que en el evento de borrar hay cambios en los ids, se revisan los anteriores para areglar la parte del select
        for(var id_atras = parseInt(id)-1; id_atras > 0; id_atras--){
            if($('#pais-'+id_atras)){
                $('#pais-'+id_atras).select2({ tags: false, placeholder: "Seleccione un país", allowClear: true});
            }
        }
        
        $('#borra-institucion-'+id).off('click').on('click', function(){
            class_av.borra_institucion(id);
        });
        class_av.change_paises(id);
        class_av.change_institucion(id);
        class_av.var.cambios_institucion = true;
    },
    agrega_autor: function(){
        var id = String(class_av.var.autoresJSON.length+1);
        
        var obj_aut = {
            id: id,
            institucionId: null,
            nombre: null,
            orcid: null,
            sistema: class_av.var.sistema
        };
        class_av.var.autoresJSON.push(obj_aut);
        
        var html_autor = class_av.var.html_autor.replaceAll('<id>', id);
        $('#div-autores').append(html_autor);
        $('#a-institucion-'+id).html(class_av.var.a_opciones_instituciones);
        $('#a-institucion-'+id).select2({ tags: true, placeholder: "Seleccione una institución", allowClear: true});
        
        //Debido a que en el evento de borrar hay cambios en los ids, se revisan los anteriores para areglar la parte del select
        for(var id_atras = parseInt(id)-1; id_atras > 0; id_atras--){
            if($('#a-institucion-'+id_atras)){
                $('#a-institucion-'+id_atras).select2({ tags: true, placeholder: "Seleccione una institución", allowClear: true});
            }
        }
        
        $('#borra-autor-'+id).off('click').on('click', function(){
            class_av.borra_autor(id);
        });
        
        class_av.change_nombre(id);
        class_av.change_orcid(id);
        class_av.var.cambios_autor = true;
    },
    busca_en_pdf: function(url_pdf, texto, id, id_h){
            $(id).hide();
            $(id + '-load').show();
            $(id + '-load').show();
            $(id + '-broken').hide();
            $(id + '-false').hide();
            $(id + '-half').hide();
            $(id + '-true').hide();
            $(id + '-texto').html('');
            $(id + '-texto').hide();
            
            if(texto == null || texto == '' || url_pdf == null || url_pdf == ''){
                return false
            }
            
            $(id).show();
            
            if(url_pdf == 'fallo'){
                $(id + '-load').hide();
                $(id + '-broken').show();
                return false;
            }
            
            if(id_h == null){
                $(id + '-load').hide();
                $(id + '-texto').html('Título corto');
                $(id + '-texto').show();
                return false;
            }
            $.when(
                //class_utils.getResource('http://localhost:5001/texto_en_pdf/'+class_utils.slug(texto.replaceAll(class_av.cons.caracteres,'.'))+'/url/'+url_pdf)
                class_utils.setResource(class_av.var.servidor + class_av.var.app + '/texto_en_textopdf/',{texto: class_utils.slug(texto.replaceAll(class_av.cons.caracteres,'.')), textopdf: url_pdf})
            ).then(function(resp_pdf){
                setTimeout(function(){
                    $(id + '-load').hide();
                    if(resp_pdf.result == 'fallo'){
                        $(id + '-broken').show();
                    }else{
                        $(id + '-broken').hide();
                    }
                    if(resp_pdf.result == 'no encontrado'){
                        $(id + '-false').show();
                    }else{
                        $(id + '-false').hide();
                    }
                    if(resp_pdf.result == 'parte'){
                        if($(id + '-half')[0] == undefined){
                            $(id + '-false').show();
                        }
                        $(id + '-half').show();
                    }else{
                        if($(id + '-half')[0] == undefined){
                            $(id + '-false').hide();
                        }
                        $(id + '-half').hide();
                    }
                    if(resp_pdf.result == 'encontrado'){
                        $(id + '-true').show();
                    }else{
                        $(id + '-true').hide();
                    }
                },1000);
            }).fail(function(){
                $(id + '-load').hide();
                $(id + '-texto').html('Sin comparar');
                $(id + '-texto').show();
            }).always(function(){
                $(id_h).prop("disabled", false);
            });
    },
    texto_idioma: function(texto, idioma, id, id_h){
            $(id).hide();
            $(id + '-load').show();
            $(id + '-texto').html('');
            $(id + '-false').hide();
            $(id + '-true').hide();
            $(id + '-texto').hide();
            
            if(texto == null || texto == '' || idioma == null || texto == null){
                return false
            }
            
            $(id).show();
            
            $.when(
                class_utils.getResource(class_av.var.servidor + class_av.var.app + '/texto_idioma/'+texto.replaceAll(class_av.cons.caracteres,''))
            ).then(function(resp_idioma){
                setTimeout(function(){
                    $(id + '-load').hide();
                    if(resp_idioma.result == 'no encontrado'){
                        $(id + '-texto').html('No detectado');
                        $(id + '-texto').show();
                    }
                    else{
                        $(id + '-texto').html(resp_idioma.result);
                        $(id + '-texto').show();
                        if(resp_idioma.result == idioma){
                            $(id + '-true').show();
                        }else{
                            $(id + '-false').show();
                        }
                    }
                }, 1000);
            }).fail(function(){
                $(id + '-load').hide();
                $(id + '-texto').html('No detectado');
                $(id + '-texto').show();
            }).always(function(){
                $(id_h).prop("disabled", false);
            });
    },
    biblat_por_nombre: function(nombre, institucion, id, id_h){
            $(id).hide();
            $(id + '-load').show();
            $(id + '-broken').hide();
            $(id + '-false').hide();
            $(id + '-true').hide();
            $(id + '-expand').hide();
            $(id + '-texto').html('');
            $(id + '-texto').hide();
            
            if(nombre == null || nombre == ''){    
                return false
            }
            
            $(id).show();
            
            $.when(
                class_utils.getResource('/datos/autor_by_nombre/'+nombre.replaceAll(class_av.cons.char_i, '')+'/'+class_av.var.sistema)
            ).then(function(resp){
                setTimeout(function(){
                    $(id + '-load').hide();
                    if(resp.length == 0){
                        $(id + '-false').show();
                    }else{
                        $(id + '-false').hide();
                    }
                    if(resp.length > 0){
                        var texto = '';
                        $.each(resp, function(i,val){
                            texto += '<ul>';
                            texto += '<li>' + val.nombre + ': ' + val.orcid;
                            if(val.institucion !== undefined){
                                var style = "";
                                if(institucion !== null && institucion !== ""){
                                    if( class_utils.slug(val.institucion).indexOf(class_utils.slug(institucion)) !== -1 ||
                                        class_utils.slug(institucion).indexOf(class_utils.slug(val.institucion)) !== -1    ){
                                        style = "text-decoration: underline;";
                                    }
                                }
                                
                                texto += '<ul>';
                                texto += '<li style="'+style+'">' + val.institucion + '</li>';
                                texto += '</ul>';
                            }
                            texto += '</li>';
                            texto += '</ul>';
                        });
                        
                        $(id + '-true').show();
                        $(id + '-texto').html(texto);
                        $(id + '-texto').show();
                        
                        $(id + '-expand').show();
                        $(id+'-texto').show();
                        $(id+'-expand').removeClass('fa-sort-desc');
                        $(id+'-expand').addClass('fa-sort-asc'); 
                        
                        $(id+'-expand').off('click').on('click', function(){
                            if($(id+'-expand').hasClass('fa fa-sort-desc')){
                               $(id+'-expand').removeClass('fa-sort-desc');
                               $(id+'-expand').addClass('fa-sort-asc');  
                            }else{
                               $(id+'-expand').addClass('fa-sort-desc');
                               $(id+'-expand').removeClass('fa-sort-asc');
                            }
                            if( $(id+'-texto').css('display') == 'none' ){
                                $(id+'-texto').show();
                            }else{
                                $(id+'-texto').hide();
                            }
                        });
                    }
                }, 1000);
            }).fail(function(){
                $(id + '-load').hide();
                $(id + '-texto').html('Sin comparar');
                $(id + '-texto').show();
            }).always(function(){
                $(id_h).prop("disabled", false);
            });
    },
    orcid_por_nombre: function(nombre, institucion, orcid, id, id_h){
            $(id).hide();
            $(id + '-load').show();
            $(id + '-broken').hide();
            $(id + '-false').hide();
            $(id + '-true').hide();
            $(id + '-half').hide();
            $(id + '-expand').hide();
            $(id + '-texto').html('');
            $(id + '-texto').hide();
            
            if(nombre == null || nombre == ''){    
                return false
            }
            
            $(id).show();
            
            $.when(
                class_utils.setResource(class_av.var.servidor + class_av.var.app + '/orcid_por_nombre/',{nombre: nombre})
            ).then(function(resp){
                setTimeout(function(){
                    $(id + '-load').hide();
                    if(resp.result == 'fallo'){
                        $(id + '-broken').show();
                    }else{
                        $(id + '-broken').hide();
                    }
                    if(resp.result == 'no encontrado'){
                        $(id + '-false').show();
                    }else{
                        $(id + '-false').hide();
                    }
                    if(resp.result == 'encontrado'){
                        var texto = resp.orcid
                                    .split(';').join('<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
                                    .split(',').join('<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-')
                                    .split(':').join('<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-');
                        texto = '';
                        var registros = resp.orcid.split(';');
                        $.each(registros, function(i,val){
                            try{
                                var orcid = val.split(':')[0].trim();
                            }catch(e){}
                            try{
                                var instituciones = val.split(':')[1].trim();
                            }catch(e){}
                            if(i == 0){
                               texto += '<ul>';
                            }
                            texto += '<li>' + orcid;
                            if(instituciones !== undefined){
                                instituciones = instituciones.split(',');
                                $.each(instituciones, function(i2,val2){
                                    var style = "";
                                    if(institucion !== null && institucion !== ''){
                                        if( class_utils.slug(val2).indexOf(class_utils.slug(institucion)) !== -1 ||
                                            class_utils.slug(institucion).indexOf(class_utils.slug(val2)) !== -1    ){
                                            style = "text-decoration: underline;";
                                        }
                                    }
                                     if(i2 == 0){
                                        texto += '<ul>';
                                     }
                                        texto += '<li style="'+style+'">' + val2 + '</li>';
                                     if(i2 == instituciones.length -1){
                                         texto += '</ul>';
                                     }
                                });
                            }
                            texto += '</li>';
                            if(i == registros.length -1){
                                texto += '</ul>';
                            }
                        });
                            
                        $(id + '-texto').html(texto);
                        $(id + '-texto').show();

                        $(id + '-true').show();
                        
                        $(id + '-expand').show();
                        
                        $(id+'-texto').show();
                        $(id+'-expand').removeClass('fa-sort-desc');
                        $(id+'-expand').addClass('fa-sort-asc'); 
                        
                        $(id+'-expand').off('click').on('click', function(){
                            if($(id+'-expand').hasClass('fa fa-sort-desc')){
                               $(id+'-expand').removeClass('fa-sort-desc');
                               $(id+'-expand').addClass('fa-sort-asc');  
                            }else{
                               $(id+'-expand').addClass('fa-sort-desc');
                               $(id+'-expand').removeClass('fa-sort-asc');
                            }
                            if( $(id+'-texto').css('display') == 'none' ){
                                $(id+'-texto').show();
                            }else{
                                $(id+'-texto').hide();
                            }
                        });
                        /*var resp_orcid = resp.orcid.split(':');
                        $.each(resp_orcid, function(i, val){
                            if(val.indexOf(orcid) !== -1){
                                $(id + '-true').show();
                            }
                        });*/
                    }
                    if(resp.result == 'alterno'){
                        var resp_orcid = resp.orcid.split(' - ');
                        var texto = resp.orcid
                                    .split(';').join('<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
                                    .split('|').join('<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-')
                                    .split(':').join('<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-');
                            
                        texto = '';
                        var registros = resp.orcid.split(';');
                        $.each(registros, function(i,val){
                            try{
                                var orcid = val.split(':')[0].trim();
                            }catch(e){}
                            try{
                                var instituciones = val.split(':')[1].trim();
                            }catch(e){}
                            if(i == 0){
                               texto += '<ul>';
                            }
                            texto += '<li>' + orcid;
                            if(instituciones !== undefined){
                                instituciones = instituciones.split('|');
                                $.each(instituciones, function(i2,val2){
                                    var style = "";
                                    if(institucion !== null && institucion !== ""){
                                        if( class_utils.slug(val2).indexOf(class_utils.slug(institucion)) !== -1 ||
                                            class_utils.slug(institucion).indexOf(class_utils.slug(val2)) !== -1    ){
                                            style = "text-decoration: underline;";
                                        }
                                    }
                                    if(i2 == 0){
                                       texto += '<ul>';
                                    }
                                        texto += '<li style="'+style+'">' + val2 + '</li>';
                                    if(i2 == instituciones.length -1){
                                        texto += '</ul>';
                                    }
                                });
                            }
                            texto += '</li>';
                            if(i == registros.length -1){
                                texto += '</ul>';
                            }
                        });
                        
                        $(id + '-texto').html(texto);
                        $(id + '-texto').show();
                        
                        $(id + '-half').show();
                        
                        $(id + '-expand').show();
                        
                        $(id+'-texto').show();
                        $(id+'-expand').removeClass('fa-sort-desc');
                        $(id+'-expand').addClass('fa-sort-asc'); 
                        
                        $(id+'-expand').off('click').on('click', function(){
                            if($(id+'-expand').hasClass('fa fa-sort-desc')){
                               $(id+'-expand').removeClass('fa-sort-desc');
                               $(id+'-expand').addClass('fa-sort-asc');  
                            }else{
                               $(id+'-expand').addClass('fa-sort-desc');
                               $(id+'-expand').removeClass('fa-sort-asc');
                            }
                            if( $(id+'-texto').css('display') == 'none' ){
                                $(id+'-texto').show();
                            }else{
                                $(id+'-texto').hide();
                            }
                        });
                        /*var resp_orcid = resp.orcid.split(':');
                        $.each(resp_orcid, function(i, val){
                            if(val.indexOf(orcid) !== -1){
                                $(id + '-true').show();
                            }
                        });*/

                        /*if(resp_orcid.indexOf(orcid)!== -1){
                            $(id + '-true').show();
                        }else{
                            $(id + '-true').hide();
                        }*/
                        /*var texto = resp.orcid + ' - ' + resp.nombre;
                        if(resp.instituciones !== null){
                            texto += '<br>&nbsp;&nbsp;&nbsp;&nbsp;' + resp.instituciones.split(',').join('<br>&nbsp;&nbsp;&nbsp;');
                        }

                        $(id + '-texto').html(texto);
                        $(id + '-texto').show();*/
                    }
                }, 1000);
            }).fail(function(){
                $(id + '-load').hide();
                $(id + '-texto').html('Sin comparar');
                $(id + '-texto').show();
            }).always(function(){
                $(id_h).prop("disabled", false);
            });
    },
    nombre_por_orcid: function(orcid, nombre, institucion, id, id_h){
            $(id).hide();
            $(id + '-load').show();
            $(id + '-broken').hide();
            $(id + '-false').hide();
            $(id + '-true').hide();
            $(id + '-expand').hide();
            $(id + '-texto').html('');
            $(id + '-texto').hide();
            
            if(orcid == null || orcid == ''){    
                return false
            }
            
            $(id).show();
            
            $.when(
                class_utils.setResource(class_av.var.servidor + class_av.var.app + '/nombre_por_orcid/',{orcid: orcid})
            ).then(function(resp){
                setTimeout(function(){
                    $(id + '-load').hide();
                    if(resp.result == 'fallo'){
                        $(id + '-broken').show();
                    }else{
                        $(id + '-broken').hide();
                    }
                    if(resp.result == 'no encontrado' || resp.result == 'parte'){
                        $(id + '-false').show();
                    }else{
                        $(id + '-false').hide();
                    }
                    if(resp.result == 'encontrado'){
                        var texto = '<ul><li>' + resp.nombre;
                        if(resp.instituciones !== null && resp.instituciones !== ""){
                            //texto += '<br>&nbsp;&nbsp;&nbsp;&nbsp;' + resp.instituciones.split(',').join('<br>&nbsp;&nbsp;&nbsp;');
                            var registros = resp.instituciones.split(',')
                            $.each(registros, function(i,val){
                                var style = "";
                                if(institucion !== null && institucion !== ""){
                                    if( class_utils.slug(val).indexOf(class_utils.slug(institucion)) !== -1 ||
                                        class_utils.slug(institucion).indexOf(class_utils.slug(val)) !== -1    ){
                                        style = "text-decoration: underline;";
                                    }
                                }
                                if(i == 0){
                                   texto += '<ul>';
                                }
                                texto += '<li style="'+style+'">' + val + '</li>';
                                if(i == registros.length -1){
                                    texto += '</ul>';
                                }
                            });
                        }
                        texto += '</li></ul>';
                        
                        $(id + '-true').show();
                            
                        $(id + '-texto').html(texto);
                        $(id + '-texto').show();
                        
                        $(id + '-expand').show();
                        
                        $(id+'-texto').show();
                        $(id+'-expand').removeClass('fa-sort-desc');
                        $(id+'-expand').addClass('fa-sort-asc'); 
                        
                        $(id+'-expand').off('click').on('click', function(){
                            if($(id+'-expand').hasClass('fa fa-sort-desc')){
                               $(id+'-expand').removeClass('fa-sort-desc');
                               $(id+'-expand').addClass('fa-sort-asc');  
                            }else{
                               $(id+'-expand').addClass('fa-sort-desc');
                               $(id+'-expand').removeClass('fa-sort-asc');
                            }
                            if( $(id+'-texto').css('display') == 'none' ){
                                $(id+'-texto').show();
                            }else{
                                $(id+'-texto').hide();
                            }
                        });
                    }
                }, 1000);
            }).fail(function(){
                $(id + '-load').hide();
                $(id + '-texto').html('Sin comparar');
                $(id + '-texto').show();
            }).always(function(){
                $(id_h).prop("disabled", false);
            });
    },
    setTabla: function(data){
        var tbody = '';
        var total_meta = 0;
        
        $.each(data, function(i, val){
            var texto1 = (val['url1'] == null)?'':'Ver artículo';
            var texto2 = (val['url2'] == null)?'':'Ver artículo';
            var art_class = ( ['C','B'].indexOf(val['estatus']) == -1 )?'sistema':'cerrado';
            var art_style = ( ['C','B'].indexOf(val['estatus']) == -1 )?'cursor:pointer;color:#ff8000':'';
            var tr = class_av.var.tr.replace('<revista>', val['revista'])
                            .replace('<issn>', val['issn'])
                            .replace('<numero>', val['numero'])
                            .replace('<id>', val['sistema'] + '__' + val['revista'] + '__' + val['articulo'])
                            .replace('<sistema>', val['sistema'])
                            .replace('<id_estatus>', val['sistema'])
                            .replace('<art>', val['articulo'])
                            .replace('<url1>', val['url1'])
                            .replace('<url2>', val['url2'])
                            .replace('<texto1>', texto1)
                            .replace('<texto2>', texto2)
                            .replace('<estatus>', '<estatus>'+val['estatus'])
                            .replace('<color>', '<color>'+val['estatus'])
                            .replace('<estatus>R', 'En revisión')
                            .replace('<estatus>C', 'Completado')
                            .replace('<estatus>B', 'No indizable')
                            .replace('<estatus>A', 'Sin movimiento')
                            .replace('<color>R', 'goldenrod')
                            .replace('<color>C', 'darkgreen')
                            .replace('<color>B', 'darkred')
                            .replace('<style>', art_style)
                            .replace('<class>', art_class);
            tbody += tr;
        });
       
        //$('.progress').html(class_av.var.barra_avance.replaceAll('<avance>', ( total_meta/1000*100 ).toFixed(2)));
        
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
                            class_av.control();
                        }
                    }; 
        class_utils.setTabla('tbl_articulos', op);
        class_av.control();
        
    }, 
    busca_pais: function(institucion){
        
        var palabras = class_utils.slug(institucion).split('-');
        
        var pais_encontrado = false;
        
        $.each(palabras, function(i, val){
            var id_pais = class_av.var.catalogos['pais_slug'].indexOf(val);
            if( id_pais !== -1 ){
                //Se encontró país
                pais_encontrado = class_av.var.catalogos['pais'][id_pais];
                return false;
            }else{
                //Se armarán palabras compuestas
                for(var i2=i+2;(i2-i) <= class_av.var.max_largo_pais; i2++){
                    //Sólo hasta el límite del tamaño de "palabras"
                    if(i2 <= palabras.length){
                        id_pais = class_av.var.catalogos['pais_slug'].indexOf(palabras.slice(i,i2).join('-'));
                        if( id_pais !== -1 ){
                            pais_encontrado = class_av.var.catalogos['pais'][id_pais];
                            return false;
                        }
                    }
                }
            }
        });
        
        return pais_encontrado;
    },
    change_paises: function(id = null){
        /*****************Cambio de países******************/
        var id_change = '.paises';
        
        if(id !== null){
           id_change = '#pais-'+id;
        }
        
        $(id_change).on('change', function(e){
            var id = this.id.split('-')[1];
            var pais = $('#'+this.id).val();
            $('#check-ins-'+id).hide();
            
            //Valor existente
            var val_institucion = $('#institucion-'+id).val();
            if(val_institucion == undefined){
                val_institucion = null;
            }else{
                if(val_institucion == ''){
                    val_institucion = null;
                }
            }

            if( !opciones_ciudades.hasOwnProperty(pais) ){
                    opciones_ciudades[pais] = '';
                    opciones_instituciones[pais] = '';

                    $('#div-ciudad-'+id).hide();
                    $('#ciudad-'+id+'-load').show();

                    /*********** Ciudades e instituciones según país *******************/
                    $.when(
                        class_utils.getResource('/datos/ciudad_by_pais/'+pais.replaceAll(',','')),
                        class_utils.getResource('/datos/institucion_by_pais/'+pais.replaceAll(',',''))
                    ) 
                    .then(function(resp_ciudad, resp_institucion){
                        setTimeout(function(){                
                            $('#ciudad-'+id+'-load').hide();
                            $('#div-ciudad-'+id).show();
                            /*********ciudad*******************/
                            var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                            $.each(resp_ciudad[0], function(i2, val2){
                                options += class_av.cons.option.replace('<valor>', val2.ciudad).replace('<opcion>', val2.ciudad);
                            });
                            opciones_ciudades[pais] = options;
                            $('#ciudad-'+id).html(opciones_ciudades[pais]);
                            $('#ciudad-'+id).select2({ tags: true, placeholder: "Seleccione una ciudad", allowClear: true});

                            /*********institucion*******************/

                            options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                            $.each(resp_institucion[0], function(i2, val2){
                                options += class_av.cons.option.replace('<valor>', val2.institucion.replaceAll('"', "&quot;")).replace('<opcion>', val2.institucion);
                            });
                            opciones_instituciones[pais] = options;
                            $('#institucion-'+id).html(opciones_instituciones[pais]);
                            $('#institucion-'+id).select2({ tags: true, placeholder: "Seleccione una institución", allowClear: true,  width: 'resolve'});

                            //Si hay un valor de institución se preselecciona
                            if(val_institucion !== null){
                                //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                                if ($('#institucion-'+id).find("option[value='" + val_institucion.replaceAll('"', "&quot;") + "']").length) {
                                    alert('encontrada');
                                    $('#institucion-'+id).val(val_institucion).trigger('change');
                                }else{
                                    var newOption = new Option(val_institucion, val_institucion.replaceAll('"', "&quot;"), true, true);
                                    alert('no está');
                                    $('#institucion-'+id).append(newOption).trigger('change');
                                }
                            }

                        }, 1000);
                    });
                }else{
                    setTimeout(function(){
                        $('#ciudad-'+id).html(opciones_ciudades[pais]);
                        $('#ciudad-'+id).select2({ tags: true, placeholder: "Seleccione una ciudad", allowClear: true});

                        $('#institucion-'+id).html(opciones_instituciones[pais]);
                        $('#institucion-'+id).select2({ tags: true, placeholder: "Seleccione una institución", allowClear: true/*,  width: 'Auto'*/});
                        if(val_institucion !== null){
                            //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                            if ($('#institucion-'+id).find("option[value='" + val_institucion.replaceAll('"', "&quot;") + "']").length) {
                                $('#institucion-'+id).val(val_institucion).trigger('change');
                            }else{
                                var newOption = new Option(val_institucion, val_institucion.replaceAll('"', "&quot;"), true, true);
                                $('#institucion-'+id).append(newOption).trigger('change');
                            }
                        }
                        $('#ciudad-'+id+'-load').hide();
                        $('#div-ciudad-'+id).show();
                    }, 1000);
                }
                class_av.var.cambios_institucion = true;
        });
    },
    change_institucion: function(id= null){
        var id_change = '.instituciones';
        if(id !== null){
           id_change = '#institucion-'+id;
        }
        /****************Cambio de institución ***********/
        $(id_change).on('change', function(e){
            var id = this.id.split('-')[1];
            
            var institucion = $('#'+this.id).val();
            $('#check-ins-'+id).hide();
            $('#check-ins-bib-'+id).hide();
            $('#check-ins-bib-'+id+'-false').hide();
            $('#check-ins-bib-'+id+'-true').hide();
            $('#check-ins-bib-'+id+'-load').show();
            $('#check-ins-bib-'+id+'-expand').hide();
            $('#div-sug-ciudad-'+id).hide();
            $('#div-dependencia-'+id).hide();
            $('#sug-ciudad-'+id+'-load').show();
            $('#dependencia-'+id+'-load').show();
            
            class_av.busca_en_pdf(class_av.var.texto_pdf, institucion, '#check-ins-'+id, '#institucion-'+id);
            //Revisa si ya se trajo el catálogo para este país
            if( !opciones_dependencias.hasOwnProperty(institucion) && institucion !== '' && institucion !== null){
                opciones_dependencias[institucion] = '';
                /*********** dependencias según institucion *******************/
                $.when(
                    class_utils.getResource('/datos/dependencia_by_institucion/'+institucion.replaceAll(class_av.cons.char_i,'')),
                    class_utils.getResource('/datos/ciudad_by_institucion/'+institucion.replaceAll(class_av.cons.char_i, ''))
                ) 
                .then(function(resp_dependencias, resp_ciudades){
                    setTimeout(function(){
                        $('#sug-ciudad-'+id+'-load').hide();
                        $('#div-sug-ciudad-'+id).show();
                        $('#dependencia-'+id+'-load').hide();
                        $('#div-dependencia-'+id).show();

                        var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                        $.each(resp_dependencias[0], function(i2, val2){
                            options += class_av.cons.option.replace('<valor>', val2.dependencia.replace('"', "&quot;")).replace('<opcion>', val2.dependencia);
                        });
                        opciones_dependencias[institucion] = options;
                        $('#dependencia-'+id).html(opciones_dependencias[institucion]);
                        $('#dependencia-'+id).select2({ tags: true, placeholder: "Seleccione una dependencia", allowClear: true});
                        
                        $('#check-ins-'+id).show();
                        $('#check-ins-bib-'+id+'-load').hide();
                        
                        options = '';
                        $.each(resp_ciudades[0], function(i2, val2){
                            //options += class_av.cons.option.replace('<valor>', val2.ciudad.replace('"', "&quot;")).replace('<opcion>', val2.ciudad);
                            options += '<li>' + val2.ciudad + '</li>';
                        });
                        opciones_sug_ciudades[institucion] = options;
                        $('#sug-ciudad-'+id).html(opciones_sug_ciudades[institucion]);
                        
                        if(resp_ciudades[0].length > 0){
                            $('#check-ins-bib-'+id).show();
                            $('#check-ins-bib-'+id+'-true').show();
                            $('#div-sug-ciudad-'+id).show();
                            $('#check-ins-bib-'+id+'-expand').show();
                            $('#sug-ciudad-'+id).show();
                            $('#check-ins-bib-'+id+'-expand').removeClass('fa-sort-desc');
                            $('#check-ins-bib-'+id+'-expand').addClass('fa-sort-asc');
                            
                            $('#check-ins-bib-'+id+'-expand').off('click').on('click', function(){
                                        if($('#check-ins-bib-'+id+'-expand').hasClass('fa fa-sort-desc')){
                                           $('#check-ins-bib-'+id+'-expand').removeClass('fa-sort-desc');
                                           $('#check-ins-bib-'+id+'-expand').addClass('fa-sort-asc');  
                                        }else{
                                           $('#check-ins-bib-'+id+'-expand').addClass('fa-sort-desc');
                                           $('#check-ins-bib-'+id+'-expand').removeClass('fa-sort-asc');
                                        }
                                        
                                           if( $('#sug-ciudad-'+id).css('display') == 'none' ){
                                               $('#sug-ciudad-'+id).show();
                                           }else{
                                               $('#sug-ciudad-'+id).hide();
                                           }
                                        });
                        }else{
                            $('#check-ins-bib-'+id+'-false').show();
                            $('#div-sug-ciudad-'+id).hide();
                        }
                        //options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                        
                        //$('#sug-ciudad-'+id).select2({ tags: true, placeholder: "Sugerencias encontradas", allowClear: true})
                    },1000);
                });
            }else{
                setTimeout(function(){
                    $('#dependencia-'+id).html(opciones_dependencias[institucion]);
                    $('#dependencia-'+id).select2({ tags: true, placeholder: "Seleccione una dependencia", allowClear: true});
                    
                    $('#check-ins-'+id).show();
                    $('#check-ins-bib-'+id+'-load').hide();
                    
                    $('#sug-ciudad-'+id).html(opciones_sug_ciudades[institucion]);
                    
                    if(opciones_sug_ciudades[institucion] !== '' && opciones_sug_ciudades[institucion] !== undefined){
                        $('#check-ins-bib-'+id).show();
                        $('#check-ins-bib-'+id+'-true').show();
                        $('#div-sug-ciudad-'+id).show();
                        $('#check-ins-bib-'+id+'-expand').show();
                        
                        $('#sug-ciudad-'+id).show();
                        $('#check-ins-bib-'+id+'-expand').removeClass('fa-sort-desc');
                        $('#check-ins-bib-'+id+'-expand').addClass('fa-sort-asc');
                        $('#check-ins-bib-'+id+'-expand').off('click').on('click', function(){
                                        if($('#check-ins-bib-'+id+'-expand').hasClass('fa fa-sort-desc')){
                                           $('#check-ins-bib-'+id+'-expand').removeClass('fa-sort-desc');
                                           $('#check-ins-bib-'+id+'-expand').addClass('fa-sort-asc');  
                                        }else{
                                           $('#check-ins-bib-'+id+'-expand').addClass('fa-sort-desc');
                                           $('#check-ins-bib-'+id+'-expand').removeClass('fa-sort-asc');
                                        }
                                           if( $('#sug-ciudad-'+id).css('display') == 'none' ){
                                               $('#sug-ciudad-'+id).show();
                                           }else{
                                               $('#sug-ciudad-'+id).hide();
                                           }
                                        });
                    }else{
                        $('#check-ins-bib-'+id+'-false').show();
                        $('#div-sug-ciudad-'+id).hide();
                    }
                    //$('#sug-ciudad-'+id).select2({ tags: true, placeholder: "Sugerencias encontradas", allowClear: true});

                    $('#sug-ciudad-'+id+'-load').hide();
                    $('#dependencia-'+id+'-load').hide();
                    $('#div-dependencia-'+id).show();
                    
                    class_av.busca_en_pdf(class_av.var.texto_pdf, institucion, '#check-ins-'+id, '#institucion-'+id);
                },1000);
            }
            class_av.var.cambios_institucion = true;
        });
    },
    change_nombre: function(id=null){
        var id_change = '.nombres';
        if(id !== null){
           id_change = '#nombre-'+id;
        }
        var tiempo_nom;
        $(id_change).off('keyup').on('keyup', function(e){
            var id = this.id.split('-')[1];
            if (e.key === "Enter") {
                clearTimeout(tiempo_nom);
                $('#nombre-'+id).prop("disabled", true);
                tiempo_nom = setTimeout(function() {
                    class_av.busca_en_pdf(class_av.var.texto_pdf, $('#nombre-'+id).val(), '#check-nombre-pdf-'+id, '#nombre-'+id);
                    class_av.orcid_por_nombre($('#nombre-'+id).val(), $('#a-institucion-'+id).val(), $('#orcid-'+id).val(), '#check-nombre-'+id, '#nombre-'+id);
                    class_av.biblat_por_nombre($('#nombre-'+id).val(), $('#a-institucion-'+id).val(), '#check-nombre-bib-'+id, '#nombre-'+id);
                }, 1000);
            }
            class_av.var.cambios_autor = true;
        });
    },
    change_orcid: function(id=null){
        var id_change = '.orcids';
        if(id !== null){
           id_change = '#orcid-'+id;
        }
        var tiempo_nom;
        $(id_change).off('keyup').on('keyup', function(e){
            var id = this.id.split('-')[1];
            if (e.key === "Enter") {
                clearTimeout(tiempo_nom);
                $('#orcid-'+id).prop("disabled", true);
                tiempo_nom = setTimeout(function() {
                    class_av.busca_en_pdf(class_av.var.texto_pdf, $('#orcid-'+id).val(), '#check-orcid-pdf-'+id, '#orcid-'+id);
                    class_av.nombre_por_orcid($('#orcid-'+id).val(), $('#nombre-'+id).val(), $('#a-institucion-'+id).val(), '#check-orcid-'+id, '#orcid-'+id);
                }, 1000);
            }
            class_av.var.cambios_autor = true;
        });
    },
    limpia: function(palabra){
        if([undefined, null, ''].indexOf(palabra) !== -1){
            return false;
        }
        
        palabra = palabra.trim();
        
        if(palabra == ''){
            return false;
        }
        
        var char = true;
        while(char){
            //El último caracter de la palabra está entre los del arreglo?
            char = ([',', '.', ':', ';'].indexOf( palabra[palabra.length-1] ) !== -1)
            
            //Si es un cracter de puntuación lo elimina
            if(char){
                palabra = palabra.slice(0,palabra.length-1);
            }
            
            //Revisa nuevamente
            char = ([',', '.', ':', ';'].indexOf( palabra[palabra.length-1] ) !== -1)
        }
        return palabra;
    },
    data_update_article: function(){
        var data = {};
        var data_int = [];
        var columns = ['sistema'];
        $.each(class_av.var.documentoJSON, function(i,val){
            var obj = {};
            var objDes = {};
            var arrArt = [];
            var objRes = {};
            var arrURL = [];
            var arrDisc = [];
            var arrSubdisc = [];
           
            obj['sistema'] = class_av.var.sistema;
            var titulo = $('#titulo').val();
            var idioma = $('#idioma').val();
            titulo = class_av.limpia(titulo);
            if(titulo){
                obj['articulo'] = titulo;
                obj['idioma'] = idioma;
            }
            
            var titulo2 = $('#titulo2').val();
            var idioma2 = $('#idioma2').val();
            titulo2 = class_av.limpia(titulo2);
            if(titulo2){
                idioma2 = class_av.cons.idiomas[idioma2];
                arrArt.push({a: titulo2, y: idioma2});
            }
            
            var titulo3 = $('#titulo3').val();
            var idioma3 = $('#idioma3').val();
            titulo3 = class_av.limpia(titulo3);
            if(titulo3){
                idioma3 = class_av.cons.idiomas[idioma3];
                arrArt.push({a: titulo3, y: idioma3});
            }
            
            if(arrArt.length > 0){
                obj['articuloIdiomas'] = JSON.stringify(arrArt);
            }
            
            var tipo_documento = $('#tipo_documento').val();
            obj['documento'] = JSON.stringify({a: tipo_documento});
            
            var disciplina1 = $('#disciplina1').val();
            disciplina1 = class_av.limpia(disciplina1);
            if(disciplina1){
                arrDisc.push(disciplina1);
            }
            
            var disciplina2 = $('#disciplina2').val();
            disciplina2 = class_av.limpia(disciplina2);
            if(disciplina2){
                arrDisc.push(disciplina2);
            }
            
            var disciplina3 = $('#disciplina3').val();
            disciplina3 = class_av.limpia(disciplina3);
            if(disciplina3){
                arrDisc.push(disciplina3);
            }
            
            obj['disciplinas'] = JSON.stringify(arrDisc);
            
            var palabras_clave = JSON.parse(class_av.var.documentoJSON[0].palabraClave);
            if(palabras_clave == null){
                palabras_clave = [];
            }
            
            var subdisciplina1 = $('#subdisciplina1').val();
            subdisciplina1 = class_av.limpia(subdisciplina1);
            if(subdisciplina1){
                arrSubdisc.push(subdisciplina1);
                
                //Revisión de subdisciplinas anteriores y actualización de palabras clave
                if( class_av.var.documentoJSON[0].subdisciplina1 !== null){
                    var idx = palabras_clave.indexOf(class_av.var.documentoJSON[0].subdisciplina1);
                    if( idx !== -1){
                        //Elimina la subdisciplina de las palabras clave
                        palabras_clave.splice(idx, 1);
                    }
                }
                palabras_clave.push(subdisciplina1);
            }
            
            var subdisciplina2 = $('#subdisciplina2').val();
            subdisciplina2 = class_av.limpia(subdisciplina2);
            if(subdisciplina2){
                arrSubdisc.push(subdisciplina2);
                
                //Revisión de subdisciplinas anteriores y actualización de palabras clave
                if( class_av.var.documentoJSON[0].subdisciplina2 !== null){
                    var idx = palabras_clave.indexOf(class_av.var.documentoJSON[0].subdisciplina2);
                    if( idx !== -1){
                        //Elimina la subdisciplina de las palabras clave
                        palabras_clave.splice(idx, 1);
                    }
                }
                palabras_clave.push(subdisciplina2);
            }
            
            var subdisciplina3 = $('#subdisciplina3').val();
            subdisciplina3 = class_av.limpia(subdisciplina3);
            if(subdisciplina3){
                arrSubdisc.push(subdisciplina3);
                
                //Revisión de subdisciplinas anteriores y actualización de palabras clave
                if( class_av.var.documentoJSON[0].subdisciplina3 !== null){
                    var idx = palabras_clave.indexOf(class_av.var.documentoJSON[0].subdisciplina3);
                    if( idx !== -1){
                        //Elimina la subdisciplina de las palabras clave
                        palabras_clave.splice(idx, 1);
                    }
                }
                palabras_clave.push(subdisciplina3);
            }
            
            obj['subdisciplinas'] = JSON.stringify(arrSubdisc);
            obj['palabraClave'] = JSON.stringify(palabras_clave);
            class_av.var.documentoJSON[0].palabraClave = JSON.stringify(palabras_clave);

            var url1 = $('#url1').val();
            var tipourl1 = $('#tipourl1').val();
            
            url1 = class_av.limpia(url1);
            if(url1){
                if(tipourl1 == 'pdf'){
                    arrURL.push({u: url1, y: "Texto completo (Ver PDF)"});
                }
                if(tipourl1 == 'html'){
                    arrURL.push({u: url1, y: "Texto completo (Ver HTML)"});
                }
            }
            
            var url2 = $('#url2').val();
            var tipourl2 = $('#tipourl2').val();
            
            url2 = class_av.limpia(url2);
            if(url2){
                if(tipourl2 == 'pdf'){
                    arrURL.push({u: url2, y: "Texto completo (Ver PDF)"});
                }
                if(tipourl2 == 'html'){
                    arrURL.push({u: url2, y: "Texto completo (Ver HTML)"});
                }
            }
            
            obj['url'] = JSON.stringify(arrURL);
            
            obj['estatus'] = 'R';
            
            data_int.push(obj);
        });
        
        data['tabla'] = 'article';
        data['where'] = columns;
        data['data'] = data_int;
        return data;
    },
    data_update_instituciones: function(){
        var data = {};
        var data_int = [];
        $.each(class_av.var.institucionesJSON, function(i,val){
            var obj = {};
           
            obj['sistema'] = class_av.var.sistema;
            obj['id'] = parseInt(val.id);
            
            var ciudad = $('#ciudad-'+val.id).val();
            ciudad = class_av.limpia(ciudad);
            val.ciudad = null;
            if(ciudad){
                obj['ciudad'] = ciudad;
                val.ciudad = ciudad;
            }
            
            var dependencia = $('#dependencia-'+val.id).val();
            dependencia = class_av.limpia(dependencia);
            val.dependencia = null;
            if(dependencia){
                obj['dependencia'] = dependencia;
                val.dependencia = dependencia;
            }
            
            var institucion = $('#institucion-'+val.id).val();
            institucion = class_av.limpia(institucion);
            val.institucion = null;
            if(institucion){
                obj['institucion'] = institucion;
                val.institucion = institucion;
            }
            
            var pais = $('#pais-'+val.id).val();
            pais = class_av.limpia(pais);
            val.pais = null;
            if(pais){
                obj['pais'] = pais;
                val.pais = pais;
            }
            
            data_int.push(obj);
        });
        
        data['tabla_autores'] = 'author';
        data['tabla_instituciones'] = 'institution';
        data['where'] = ['sistema', 'id'];
        data['where_delete'] = ['sistema'];
        data['data_instituciones'] = data_int;
        
        //Sólo actualiza ids de instituciones
        var arrAutores = [];
        $.each(class_av.var.autoresJSON, function(i,val){
            var objAutores = {};
            objAutores['id'] = val.id;
            objAutores['sistema'] = val.sistema;
            objAutores['institucionId'] = val.institucionId;
            arrAutores.push(objAutores);
        });
        data['data_autores'] = arrAutores;
        data['sistema'] = class_av.var.sistema;
        return data;
    },
    data_update_autores: function(){
        var data = {};
        var data_int = [];
        $.each(class_av.var.autoresJSON, function(i,val){
            var obj = {};
           
            obj['sistema'] = class_av.var.sistema;
            obj['id'] = parseInt(val.id);
            obj['email'] = val.email;
            
            var orcid = $('#orcid-'+val.id).val();
            orcid = class_av.limpia(orcid);
            val.ciudad = null;
            if(orcid){
                obj['orcid'] = orcid;
                val.orcid = orcid;
            }
            
            var nombre = $('#nombre-'+val.id).val();
            nombre = class_av.limpia(nombre);
            val.nombre = null;
            if(nombre){
                obj['nombre'] = nombre;
                val.nombre = nombre;
            }
            
            var institucion = $('#a-institucion-'+val.id).val();
            institucion = class_av.limpia(institucion);
            val.institucion = null;
            if(institucion){
                obj['institucionId'] = institucion;
                val.institucionId = institucion;
            }
            
            data_int.push(obj);
        });
        
        data['tabla_autores'] = 'author';
        data['where'] = ['sistema', 'id'];
        data['where_delete'] = ['sistema'];
        data['data_autores'] = data_int;
        data['sistema'] = class_av.var.sistema;
        return data;
    },
    reset_autores: function(){
        $('#div-autores').html('');
        class_av.var.a_opciones_instituciones = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
        $.each(class_av.var.institucionesJSON, function(i,val){
            class_av.var.a_opciones_instituciones += class_av.cons.option.replace('<valor>', val.id).replace('<opcion>', val.institucion);
        });

        $.each(class_av.var.autoresJSON, function(i,val){
            var html_autor = class_av.var.html_autor.replaceAll('<id>', val.id);
            var institucion = null;
            $('#div-autores').append(html_autor);
            $('#a-institucion-'+val.id).html(class_av.var.a_opciones_instituciones);
            $('#a-institucion-'+val.id).select2({ tags: true, placeholder: "Seleccione una institución", allowClear: true});
            if(val['institucionId'] !== null){
                institucion = class_utils.find_prop(class_av.var.institucionesJSON, 'id',val['institucionId'])['institucion'];
                $('#a-institucion-'+val.id).val(val['institucionId']).trigger('change');
            }
            $('#nombre-'+val.id).val(val.nombre);
            $('#orcid-'+val.id).val(val.orcid);

            class_av.orcid_por_nombre(val.nombre, institucion, val.orcid, '#check-nombre-'+val.id, '#nombre-'+val.id);
            var nombre = val.nombre.split(',');
            if(nombre[1]){
                nombre = nombre[1] + ' ' + nombre[0];
            }
            class_av.busca_en_pdf(class_av.var.texto_pdf, nombre, '#check-nombre-pdf-'+val.id, '#nombre-'+val.id);
            class_av.biblat_por_nombre(val.nombre, institucion, '#check-nombre-bib-'+val.id, '#nombre-'+val.id);
            class_av.nombre_por_orcid(val.orcid, val.nombre, institucion, '#check-orcid-'+val.id, '#orcid-'+val.id);

        });

        $('#accordionAutores').html('Autores');
        $('#accordionAutores').prop('href', '#autores');
        class_av.evento_borra_autor();
        class_av.change_nombre();
        class_av.change_orcid();
    },
    cambio_estatus: function(sistema, estatus){
        $('#estatus-'+sistema).html(class_av.cons.estatus[estatus]);
        $('#estatus-'+sistema).css('background-color',class_av.cons.color_estatus[estatus]);
    },
    cambios_sin_guardar: function(evento = null, elemento = null){
        if( class_av.var.cambios_documento || class_av.var.cambios_institucion || class_av.var.cambios_autor){
            if(class_av.var.cambios_documento){
                var texto = 'Existen cambios sin guardar <b>Artículo</b>';
            }else if(class_av.var.cambios_institucion){
                var texto = 'Existen cambios sin guardar en <b>Instituciones</b>';
            }else if(class_av.var.cambios_autor){
                var texto = 'Existen cambios sin guardar en <b>Autores</b>';
            }
            $.confirm({
                title: '',
                content: texto,
                buttons: {
                    cancelar: {
                            text: 'Descartar Cambios',
                            //btnClass: 'btn-red',
                            action: function(){
                                class_av.var.cambios_documento = false;
                                class_av.var.cambios_institucion = false;
                                class_av.var.cambios_autor = false;
                                if(evento == 'sistema'){
                                    $(elemento).click();
                                }
                            }
                    },
                    aceptar: {
                            text: 'Regresar',
                            btnClass: 'btn-warning',
                            action: function(){
                                return true;
                            }
                    }
                }
            });
            return true;
        }else{
            return false;
        }
    },
    mensaje:function(texto){
        $.confirm({
                title: '',
                content: texto,
                buttons: {
                    aceptar: {
                            text: 'Aceptar',
                            btnClass: 'btn-warning',
                            action: function(){
                                return true;
                            }
                    }
                }
            });
    },
    control_guarda:function(){
        $('#save-article').off('click').on('click', function(){
            
            var texto = 'Se guardaran los cambios realizados a los metadatos del Artículo';
            
            $.confirm({
                title: '',
                content: texto,
                buttons: {
                    cancelar: {
                            text: 'Cancelar',
                            //btnClass: 'btn-red',
                            action: function(){
                                
                            }
                    },
                    aceptar: {
                            text: 'Aceptar',
                            btnClass: 'btn-warning',
                            action: function(){
                                class_av.var.cambios_documento = false;
                                $.ajax({
                                        type: 'POST',
                                        url: "<?=site_url('metametrics/ws_update');?>",
                                        data: class_av.data_update_article(),
                                }).done(function() {
                                        class_av.cambio_estatus(class_av.var.sistema, 'R');
                                });
                            }
                    }
                }
            });
        });
        
        $('#save-full').off('click').on('click', function(){
            
            if(class_av.cambios_sin_guardar()){
                return true;
            }else{
                
                var texto = 'Se marcará el registro como <b>Completado</b>';

                $.confirm({
                    title: '',
                    content: texto,
                    buttons: {
                        cancelar: {
                                text: 'Cancelar',
                                //btnClass: 'btn-red',
                                action: function(){

                                }
                        },
                        aceptar: {
                                text: 'Aceptar',
                                btnClass: 'btn-warning',
                                action: function(){
                                    /*$.ajax({
                                            type: 'POST',
                                            url: "<?=site_url('metametrics/ws_update');?>",
                                            data: class_av.data_update_article(),
                                    }).done(function() {*/
                                            class_av.cambio_estatus(class_av.var.sistema, 'C');
                                            $('.'+class_av.var.sistema).removeClass('sistema');
                                            $('.'+class_av.var.sistema).addClass('cerrado');
                                            $('.'+class_av.var.sistema).css('cursor','');
                                            $('.'+class_av.var.sistema).css('color','');
                                            $('#accordion').hide();
                                            window.location.href="#div_tabla";
                                    /*});*/
                                }
                        }
                    }
                });
            }
        });
        
        $('#save-instituciones').off('click').on('click', function(){
            
            var texto = 'Se guardaran los cambios realizados a los metadatos de Instituciones';
            
            $.confirm({
                title: '',
                content: texto,
                buttons: {
                    cancelar: {
                            text: 'Cancelar',
                            //btnClass: 'btn-red',
                            action: function(){
                                
                            }
                    },
                    aceptar: {
                            text: 'Aceptar',
                            btnClass: 'btn-warning',
                            action: function(){
                                class_av.var.cambios_institucion = false;
                                $.ajax({
                                        type: 'POST',
                                        url: "<?=site_url('metametrics/ws_insert_instituciones');?>",
                                        data: JSON.stringify(class_av.data_update_instituciones()),
                                        contentType: 'application/json'
                                }).done(function() {
                                        class_av.cambio_estatus(class_av.var.sistema, 'R');
                                        class_av.reset_autores();
                                        class_av.mensaje('Instituciones guardadas corretamente.');
                                }).fail(function(){
                                    class_av.mensaje('Ocurrió un error al intentar guardar Instituciones');
                                });
                            }
                    }
                }
            });
        });
        
        $('#save-autores').off('click').on('click', function(){
            
            var texto = 'Se guardaran los cambios realizados a los metadatos de Autores';
            
            $.confirm({
                title: '',
                content: texto,
                buttons: {
                    cancelar: {
                            text: 'Cancelar',
                            //btnClass: 'btn-red',
                            action: function(){
                                
                            }
                    },
                    aceptar: {
                            text: 'Aceptar',
                            btnClass: 'btn-warning',
                            action: function(){
                                class_av.var.cambios_autor = false;
                                $.ajax({
                                        type: 'POST',
                                        url: "<?=site_url('metametrics/ws_insert_autores');?>",
                                        data: JSON.stringify(class_av.data_update_autores()),
                                        contentType: 'application/json'
                                }).done(function() {
                                        class_av.cambio_estatus(class_av.var.sistema, 'R');
                                        class_av.mensaje('Autores guardados corretamente.');
                                }).fail(function(){
                                    class_av.mensaje('Ocurrió un error al intentar guardar Autores');
                                });
                            }
                    }
                }
            });
        });
        
        $('#save-no-indizable').off('click').on('click', function(){
            
            if(class_av.cambios_sin_guardar()){
                return true;
            }else{
            
                var texto = 'Se marcará el registro como <b>No Indizable</b>';

                $.confirm({
                    title: '',
                    content: texto,
                    buttons: {
                        cancelar: {
                                text: 'Cancelar',
                                //btnClass: 'btn-red',
                                action: function(){

                                }
                        },
                        aceptar: {
                                text: 'Aceptar',
                                btnClass: 'btn-warning',
                                action: function(){
                                    /*$.ajax({
                                            type: 'POST',
                                            url: "<?=site_url('metametrics/ws_update');?>",
                                            data: class_av.data_update_article(),
                                    }).done(function() {*/
                                            class_av.cambio_estatus(class_av.var.sistema, 'B');
                                            $('.'+class_av.var.sistema).removeClass('sistema');
                                            $('.'+class_av.var.sistema).addClass('cerrado');
                                            $('.'+class_av.var.sistema).css('cursor','');
                                            $('.'+class_av.var.sistema).css('color','');
                                            $('#accordion').hide();
                                            window.location.href="#div_tabla";
                                    /*});*/
                                }
                        }
                    }
                });
            }
        });
    }
};

$(class_av.ready);



