// cambios 51,52, 2271, 2373
class_av = {
    cons: {
        DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
        option: '<option value="<valor>"><opcion></option>',
        option_badge: '<option value="<valor>"><opcion> i-badge<num>f-badge</option>',
        //caracteres: /!|#|\$|%|&|\(|\/|\\|\)|=|\?|¿|¡|,|;|:|_|\[|{|}|]|\+|\*|\~|<|>|\'|\"|’/g
        caracteres: /[^a-zA-Z0-9 ]/g,
        char_i: /\(|\)|,|;|:|=|'/g,
        cargando: '<i id="check-titulo-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>',
        estatus:{
            A: 'Sin movimiento',
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
            'Español': 'spa',
            'Portugués': 'por',
            'Inglés': 'eng',
            'Italiano': 'ita',
            'Francés': 'fre',
            'Alemán': 'ger',
            'Ruso': 'rus'
        },
        palabra_clave: '<div class="col-xs-3"><button id="<palabra-slug>" class="btn badge-secondary esp palabra_clave" style="margin-left:5px; margin-bottom: 5px; cursor: pointer; width:90%; word-wrap: break-word; white-space: normal;" type="button">'+
                        '<palabra> <span class="badge"><num></span>'+
                        '<div id="<palabra-slug>-sustituye"></div>'+
                        '</button><i id="e-<palabra>-<palabra-slug>" class="fa fa-pencil edita_palabra" aria-hidden="true"></i></div>',
        palabra_clave_n: '<div class="col-xs-3"><button id="<palabra-slug>" class="btn new_p badge-secondary esp palabra_clave" style="margin-left:5px; margin-bottom: 5px; cursor: pointer; width:100%; word-wrap: break-word; white-space: normal;" type="button">'+
                        '<palabra> <span class="badge"><num></span>'+
                        '<div id="<palabra-slug>-sustituye"></div>'+
                        '</button></div>',
        keyword: '<div class="col-xs-3"><button id="<palabra-slug>" class="btn badge-secondary keyword palabra_clave" style="margin-left:5px; margin-bottom: 5px; cursor: pointer; width:90%; word-wrap: break-word; white-space: normal;" type="button">'+
                        '<palabra> <span class="badge"><num></span>'+
                        '<div id="<palabra-slug>-sustituye"></div>'+
                        '</button><i id="e-<palabra>-<palabra-slug>" class="fa fa-pencil edita_keyword" aria-hidden="true"></i></div>',
        keyword_n: '<div class="col-xs-3"><button id="<palabra-slug>" class="btn new_k badge-secondary keyword palabra_clave" style="margin-left:5px; margin-bottom: 5px; cursor: pointer; width:90%; word-wrap: break-word; white-space: normal;" type="button">'+
                        '<palabra> <span class="badge"><num></span>'+
                        '<div id="<palabra-slug>-sustituye"></div>'+
                        '</button></div>',
        palabra_clave_sustituye: '<br><center><i class="fa fa-arrow-down" aria-hidden="true"></i><center><br><palabra> <span class="badge"><num></span>'
    },   
    var: {
        //servidor: 'http://localhost:5001',
        //app: '',
        servidor: 'https://biblat.unam.mx',
        app: '/scielo-claper',
        usuariosJSON: [],
        analistasJSON: [],
        documentoJSON: '',
        autoresJSON: '',
        institucionesJSON: '',
        revistasJSON: [],
        init: true,
        url_oai: '',
        data: '',
        revistas: '',
        revistasAsignadas: [],
        palabras_clave: [],
        palabras_clave0: [],
        palabras_clave_n: [],
        keywords: [],
        keywords0: [],
        keywords_n: [],
        count_palabras_clave: 0,
        count_keywords: 0,
        revista: {},
        registros:{},
        count_titulos: 0,
        numeros:'',
        corporativo: 0,
        url_ia:'',
        arr_busca_pdf: [],
        tabla: '<table id="tbl_articulos" class="display responsive nowrap" style="width:100%;font-size:11px">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th rowspan="1" style="max-width:150px">Revista</th>' +
                                    '<th rowspan="1" style="max-width:70px">ISSN</th>' +
                                    '<th rowspan="1" style="max-width:70px">Número</th>' +
                                    '<th rowspan="1" >Artículo</th>' +
                                    '<th rowspan="1" style="max-width:100px">Url 1</th>' +
                                    '<th rowspan="1" style="max-width:100px">Url 2</th>' +
                                    '<th rowspan="1" style="max-width:100px">Fecha asignado</th>' +
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
            <td><fecha></td>\n\
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
                                <div class="col-xs-6 div-ciudad" style="display:true;"> \n\
                                    <span><b>Ciudad:</b></span><br>\n\
                                    <div id="div-ciudad-<id>" style="display: true" class="institucion">\n\
                                        <select id="ciudad-<id>" style="width: 100%" class="ciudades form-control institucion" data-toggle="tooltip" data-placement="top"> </select> \n\
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
                                    <span><b>Nombre:</b></span><br><input id="nombre-<id>" style="min-width: 100%" type="text" class="autor nombres" data-toggle="tooltip" data-placement="top" title="Presione [Enter] para realizar revisión"> \n\
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
                                    <span><b>ORCID:</b></span><br><input id="orcid-<id>" style="min-width: 100%" type="text" class="autor orcids" data-toggle="tooltip" data-placement="top" title="Presione [Enter] para realizar revisión"> \n\
                                    <div id="check-orcid-pdf-<id>" style="display: none" class="orcid"> \n\
                                        <i class="fa fa-file-pdf-o" aria-hidden="true" style="color: darkred"></i> \n\
                                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i> \n\
                                        <i id="check-orcid-pdf-<id>-load" class="fa fa-spinner fa-pulse orcid" aria-hidden="true" style="color: #ff8000; display: true"></i> \n\
                                        <i id="check-orcid-pdf-<id>-broken" class="fa fa-chain-broken orcid" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-orcid-pdf-<id>-false" class="fa fa-exclamation-circle orcid" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-orcid-pdf-<id>-true" class="fa fa-star orcid" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                    </div> \n\
                                    <div id="check-orcid-<id>" style="display: none" class="orcid"> \n\
                                        <img id="check-orcid-orcid" src="/img/orcid.png" style="height: 15px"/> \n\
                                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i> \n\
                                        <i id="check-orcid-<id>-load" class="fa fa-spinner fa-pulse orcid" aria-hidden="true" style="color: #ff8000; display: true"></i> \n\
                                        <i id="check-orcid-<id>-broken" class="fa fa-chain-broken orcid" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-orcid-<id>-false" class="fa fa-exclamation-circle orcid" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        <i id="check-orcid-<id>-true" class="fa fa-star orcid" aria-hidden="true" style="color: #ff8000; display: none"></i> \n\
                                        &nbsp;&nbsp<i id="check-orcid-<id>-expand" class="fa fa-sort-asc" aria-hidden="true" style="cursor: pointer;display:none"></i></span> \n\
                                        <span id="check-orcid-<id>-texto" style="display:false; font-size:12px" class="orcid"></span> \n\
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
        html_titulo: '      <div id="div_titulo_na-<id>"> \
                            <br><span><b>Título del artículo:</b></span><br> \
                            <input id="titulo_na-<id>" style="min-width: 90%" type="text" data-placement="top"> \
                            <span id="borra-titulo_na-<id>" class="glyphicon glyphicon-remove borra-titulo" aria-hidden="true" style="color: #ff8000;cursor:pointer"></span> \
                            <br><span><b>Páginas artículo:</b></span><br> \
                            <input id="de_na-<id>" style="min-width: 10%" type="text" data-placement="top" placeholder="Página inicial"> - \
                            <input id="a_na-<id>" style="min-width: 10%" type="text" data-placement="top" placeholder="Página final"> \
                            </div>',
        li: '<li><a class="li-filtro2" id="<id>"><val></a></li>',
        opciones_paises: '',
        a_opciones_instituciones: '',
        texto_pdf: '',
        catalogos: { 
                        tipo_documento: [],
                        disciplina: [],
                        disciplina_eng: [],
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
                            var id_disciplina_eng = catalogos[0].indexOf('Discipline');
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
                                    if(val[id_disciplina_eng].trim() != ''){
                                        var arr_disc = val[id_disciplina_eng].split(';');
                                        var disc = arr_disc[0].trim();
                                        class_av.var.catalogos['disciplina_eng'].push(disc);
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
                            $('#tipo_documento').select2({ tags: false, placeholder: "Seleccione un tipo de documento", allowClear: true});
                            
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
                        }).catch(function(){
                            location.reload();
                        });
                    }).catch(function(){
                        location.reload();
                    });
                });
        });
    },
    initRevistas: function() {
        if (class_av.var.init){
            class_av.var.init = false;
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
                        range: b(env.s),
                    }).then(function(response) {
                        var revistas = response.result.values;
                        var options = '';
                        $.each(revistas, function(i, val){
                                if(i>0){
                                        class_av.var.revistasJSON.push(JSON.parse(JSON.stringify(Object.assign({}, val))));
                                }
                        });
                        class_av.var.revistasJSON.sort(class_utils.order_by(0));
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
        loading.start();
        class_av.initClient();
        class_av.filtro();
    },
    control: function(){
        $('.sistema').off('click').on('click', function(e){
            class_utils.cancelaPeticiones();
            var _id = this.id;
            var sistema = _id.split('__')[0];
            
            if(class_av.cambios_sin_guardar('sistema', this)){
                return false;
            }
            
            $.ajax({
                    type: 'POST',
                    url: "<?=site_url('metametrics/ws_bitacora');?>",
                    data: {'evento': 'Inicio de análisis', 'sistema': sistema}
            }).done(function() {
                console.log('Inicio');
            });
            
            class_av.var.cambios_autor = false;
            class_av.var.cambios_documento = false;
            class_av.var.cambios_institucion = false;
            class_av.var.cambios_de_inicio = true;
            class_av.var.count_palabras_clave = 0;
            class_av.var.count_keywords = 0;
            class_av.var.palabras_clave_n = [];
            class_av.var.keywords_n = [];
            
            $('#keywords_n').empty();
            $('#palabras_clave_n').empty();
            $('#div-instituciones').find('*').off('change');
            $('#div-instituciones').empty();
            $('#div-autores').find('*').off('change');
            $('#div-autores').empty();
            
            $.each(['#div_palabras_clave_autor', '#div_palabras_clave', '#div_palabras_clave2', '#div_palabras_clave_n', '#div_keywords_n', '#div_keywords', '#add-palabra', '#add-keyword'], function(i,val){
                    $(val).hide();
                });
            
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
                class_av.var.autoresJSON = resp_autores[0].map(function(item){
                                                                    return {
                                                                            ...item, // Copiar todas las propiedades del elemento original
                                                                            id2: parseInt(item.id) // Agregar la nueva propiedad id2 con el valor numérico de id
                                                                    };
                                                                });
                class_av.var.institucionesJSON = resp_instituciones[0].map(function(item){
                                                                            return {
                                                                                ...item, // Copiar todas las propiedades del elemento original
                                                                                id2: parseInt(item.id) // Agregar la nueva propiedad id2 con el valor numérico de id
                                                                            };
                                                                        });
                var corporativo = 0;
                class_av.var.corporativo = 0;
                
                if(class_av.var.institucionesJSON !== undefined){
                    class_av.var.institucionesJSON.sort(class_utils.order_by('id2'));
                    corporativo = class_utils.filter_prop(class_av.var.institucionesJSON, 'corporativo', '1').length;
                    if(corporativo > 0){
                        class_av.var.corporativo = 1;
                    }
                }
                
                if(class_av.var.autoresJSON !== undefined){
                    class_av.var.autoresJSON.sort(class_utils.order_by('id2'));
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
                
                if(class_av.var.corporativo == 1){
                    $('#es-corporativo')[0].checked = true;
                }else{
                    $('#es-corporativo')[0].checked = false;
                }
                class_av.autor_corporativo(true);
                
                //Lectura del pdf
                $.when(
                    class_utils.setResource(class_av.var.servidor + class_av.var.app + '/get_pdf/', {url: url_pdf}, true)
                ) 
                .then(function(resp_pdf){
                    class_av.var.texto_pdf = resp_pdf.result;

                    /**** Búsqueda de título en pdf *********/
                    //if(url_pdf !== ''){
                        //class_av.busca_en_pdf(url_pdf, class_av.var.documentoJSON[0].articulo, '#check-titulo', '#titulo');
                        class_av.busca_en_pdf(class_av.var.texto_pdf, class_av.var.documentoJSON[0].articulo, '#check-titulo', '#titulo');
                    //}

                    $('.tooltip-titulo').tooltip();
                    $('#titulo').val(class_av.var.documentoJSON[0].articulo.replace(/<[^>]+>/g, ''));
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
                    var idiomas = [''];
                    if(class_av.var.documentoJSON[0].idioma !== null && class_av.var.documentoJSON[0].idioma !== undefined){
                        idiomas = class_av.var.documentoJSON[0].idioma.split(',').map(function(item) {
                                                                                        return item.trim().charAt(0).toUpperCase() + item.trim().toLowerCase().slice(1);
                                                                                    });
                    }
                    $("#idioma").val(idiomas[0]);
                    /****Búsqueda idioma ********/
                    if(idiomas[0] !== ''){
                        class_av.texto_idioma(class_av.var.documentoJSON[0].articulo, idiomas[0], '#check-idioma', '#idioma');
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
                            if (e.key === "Enter" || $('#titulo2').val().trim() == '') {
                                if($('#titulo2').val().trim() == ''){
                                    $('#idioma2').val('');
                                    $('#check-idioma2').hide();
                                    $('#check-titulo2').hide();
                                }else{
                                    clearTimeout(tiempo);
                                    $('#titulo2').prop("disabled", true);
                                    tiempo = setTimeout(function() {
                                        class_av.texto_idioma($('#titulo2').val(), $('#idioma2').val(), '#check-idioma2', '#idioma2');
                                        class_av.busca_en_pdf(class_av.var.texto_pdf, $('#titulo2').val(), '#check-titulo2', '#titulo2');
                                    }, 1000);
                                }
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
                            if (e.key === "Enter" || $('#titulo3').val().trim() == '') {
                                if($('#titulo3').val().trim() == ''){
                                    $('#idioma3').val('');
                                    $('#check-idioma3').hide();
                                    $('#check-titulo3').hide();
                                }else{
                                    clearTimeout(tiempo);
                                    $('#titulo3').prop("disabled", true);
                                    tiempo = setTimeout(function() {
                                        class_av.texto_idioma($('#titulo3').val(), $('#idioma3').val(), '#check-idioma3', '#idioma3');
                                        class_av.busca_en_pdf(class_av.var.texto_pdf, $('#titulo3').val(), '#check-titulo3', '#titulo3');
                                    }, 1000);
                                }
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
                    
                    class_av.control_aa();
                    
                    $('#idiomaDocumento').select2({ tags: false, placeholder: "Seleccione uno o más idiomas", allowClear: true});
                    $('#idiomaDocumento').val(idiomas).trigger('change');
                    
                    $('#import-ai').off('click').on('click', function(){
                        
                    });
                    
                    /******************************************************************/
                    $('#es-corporativo').off('click').on('click', function(){
                        if(this.checked){
                            class_av.var.corporativo = 1;
                        }else{
                            class_av.var.corporativo = 0;
                        }
                        class_av.autor_corporativo();
                    });
                    
                    
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
                        class_av.var.cambios_autor = (true && !class_av.var.cambios_de_inicio);
                    });
                    
                    loading.end();

                    $('#accordionInstituciones').html('Cargando Instituciones (0/'+class_av.var.institucionesJSON.length+') ...');
                    $('#accordionInstituciones').prop('href', '');
                    
                    if(class_av.var.institucionesJSON.length == 0){
                        $('#accordionInstituciones').html('Instituciones');
                        $('#accordionInstituciones').prop('href', '#instituciones');
                    }
                    
                    
                    var total = 0;
                    var revisaRepetidas = function(){
                        var es_inicio = true;
                        //$.each(class_av.var.institucionesJSON, function(i,val){

                            //if(val.pais !== null){
                                //Revisa al final las repetidas para agregar el menu
                                $.each(repetidas_ciudades, function(i2, val2){
                                    if(val2.pais !== null && val2.pais !== undefined && val2.pais !== '') {
                                        $('#ciudad-'+val2.id).html(opciones_ciudades[val2.pais+'-'+class_av.var.corporativo]);
                                        $('#ciudad-'+val2.id).select2({ tags: true, placeholder: "Seleccione o escriba una ciudad", allowClear: true});
                                        $('#select2-ciudad-'+val2.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                        $('.select2-container').tooltip();
                                        $('.select2-selection--single').css('-webkit-user-select', 'text');
                                        $('.select2-selection--single').css('cssText', '-webkit-user-select: text !important;');
                                        if(val2.ciudad !== null){
                                           $('#ciudad-'+val2.id).val(val2.ciudad).trigger('change');
                                        }
                                        $('#ciudad-'+val2.id).on('change', function(){
                                            class_av.var.cambios_institucion = (true && !es_inicio);
                                        });
                                        if(class_av.var.corporativo == 1){
                                            $('.div-ciudad').hide();
                                        }
                                    }
                                });
                                    
                                //Revisa al final las repetidas para agregar el menu
                                /*$.each(repetidas_instituciones, function(i2, val2){
                                    if(val2.pais == val.pais) {
                                        $('#institucion-'+val2.id).html(opciones_instituciones[val.pais+'-'+class_av.var.corporativo]);
                                        $('#institucion-'+val2.id).select2({ tags: true, placeholder: "Seleccione o escriba una institución", allowClear: true});
                                        $('#select2-institucion-'+val2.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                        $('.select2-container').tooltip();
                                        if(val2.institucion !== null){
                                            //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                                            if ($('#institucion-'+val2.id).find("option[value='" + val2.institucion.replaceAll('"', "&quot;") + "']").length) {
                                                $('#institucion-'+val2.id).val(val2.institucion).trigger('change');
                                            }else{
                                                var newOption = new Option(val2.institucion, val2.institucion.replaceAll('"', "&quot;"), true, true);
                                                $('#institucion-'+val2.id).append(newOption).trigger('change');
                                            }
                                           //$('#institucion-'+val2.id).val(val2.institucion).trigger('change');
                                           alert('en repetidas');
                                           class_av.busca_en_pdf(class_av.var.texto_pdf, val2.institucion, '#check-ins-'+val2.id, '#institucion-'+val2.id);
                                        }
                                        $('#institucion-'+val2.id).on('change', function(){
                                            class_av.var.cambios_institucion = (true && !es_inicio);
                                        });
                                    }
                                });*/
                            //}

                            //if(val.institucion !== null){
                                //Revisa al final las repetidas para agregar el menu
                                $.each(repetidas_dependencias, function(i2, val2){
                                    if(val2.institucion !== null && val2.institucion !== undefined && val2.institucion !== '') {
                                        $('#dependencia-'+val2.id).html(opciones_dependencias[val2.institucion+'-'+class_av.var.corporativo]);
                                        $('#dependencia-'+val2.id).select2({ tags: true, placeholder: "Seleccione o escriba una dependencia", allowClear: true});
                                        $('#select2-dependencia-'+val2.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                        $('.select2-container').tooltip();
                                        $('.select2-selection--single').css('-webkit-user-select', 'text');
                                        $('.select2-selection--single').css('cssText', '-webkit-user-select: text !important;');
                                        if(val2.dependencia !== null){
                                            $('#dependencia-'+val2.id).val(val2.dependencia).trigger('change');
                                        }
                                        $('#dependencia-'+val2.id).on('change', function(){
                                            class_av.var.cambios_institucion = (true && !es_inicio);
                                        });
                                    }
                                });

                                //Revisa al final las repetidas para agregar el menu
                                $.each(repetidas_sug_ciudades, function(i2, val2){
                                    if(val2.institucion !== null && val2.institucion !== undefined && val2.institucion !== '') {
                                        $('#sug-ciudad-'+val2.id).html(opciones_sug_ciudades[val2.institucion]);
                                        //$('#sug-ciudad-'+val2.id).select2({ tags: true, placeholder: "Sugerencias encontradas", allowClear: true});
                                        $('#check-ins-bib-'+val2.id).show();
                                        $('#check-ins-bib-'+val2.id+'-load').hide();
                                        $('#check-ins-bib-'+val2.id+'-true').show();
                                            $('#div-sug-ciudad-'+val2.id).show();
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
                            //}

                        //});
                        
                        var recorrido_inst = function(arr_inst){
                            var es_inicio = true;
                            if(arr_inst.length == 0){
                                $('.select2-container').css('max-width','100%');
                                /********* función para borrar *************/
                                class_av.evento_borra_institucion();

                                $('#accordionInstituciones').html('Instituciones');
                                $('#accordionInstituciones').prop('href', '#instituciones');

                                class_av.change_paises();
                                class_av.change_institucion();
                                return true;
                            }
                            
                            total ++;
                            $('#accordionInstituciones').html('Cargando Instituciones ('+total+'/'+class_av.var.institucionesJSON.length+') ...');
                            var val2 = arr_inst.slice(0,1)[0];
                            var resto_val = arr_inst.slice(1);
                            
                                $('#institucion-'+val2.id).html(opciones_instituciones[val2.pais+'-'+class_av.var.corporativo]);
                                $('#institucion-'+val2.id).select2({ tags: true, placeholder: "Seleccione o escriba una institución", allowClear: true});
                                $('#select2-institucion-'+val2.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                $('.select2-container').tooltip();
                                $('.select2-selection--single').css('-webkit-user-select', 'text');
                                $('.select2-selection--single').css('cssText', '-webkit-user-select: text !important;');
                                if(val2.institucion !== null && val2.institucion !== undefined && val2.institucion !== ''){
                                    //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                                    if ($('#institucion-'+val2.id).find("option[value='" + val2.institucion.replaceAll('"', "&quot;") + "']").length) {
                                        $('#institucion-'+val2.id).val(val2.institucion).trigger('change');
                                    }else{
                                        var newOption = new Option(val2.institucion, val2.institucion.replaceAll('"', "&quot;"), true, true);
                                        $('#institucion-'+val2.id).append(newOption).trigger('change');
                                    }
                                   //$('#institucion-'+val2.id).val(val2.institucion).trigger('change');
                                    class_av.busca_en_pdf(class_av.var.texto_pdf, val2.institucion, '#check-ins-'+val2.id, '#institucion-'+val2.id)
                                    .then(function(){
                                        $('#institucion-'+val2.id).on('change', function(){
                                             class_av.var.cambios_institucion = (true && !es_inicio);
                                         });
                                         recorrido_inst(resto_val);
                                   });
                                }else{
                                    recorrido_inst(resto_val);
                                }
                        }
                        
                        recorrido_inst(repetidas_instituciones);
                        
                        es_inicio = false;
                    };
                    
                    //$.each(class_av.var.institucionesJSON, function(i,val){
                    var recorrido_instituciones = function(arr_instituciones){
                        var es_inicio = true;
                        if(arr_instituciones.length == 0){
                            revisaRepetidas();
                            return true;
                        }
                        
                        var peticiones = 2;
                        var val = arr_instituciones.slice(0,1)[0];
                        var resto_val = arr_instituciones.slice(1);
                        
                        var html_institucion = class_av.var.html_institucion.replaceAll('<id>', val.id);
                        $('#div-instituciones').append(html_institucion);
                        $('#pais-'+val.id).html(class_av.var.opciones_paises);
                        $('#pais-'+val.id).select2({ tags: false, placeholder: "Seleccione un país", allowClear: true});

                        if( val.pais == null && (val.institucion !== null && val.institucion !== undefined && val.institucion !== '') ){
                            //Si existe un país válido en el texto de institución, lo asigna a país
                            var res_pais = class_av.busca_pais(val.institucion);
                            if( res_pais ){
                                val.pais = res_pais;
                            }
                        }
                        
                        if(val.pais !== null && val.pais !== '' && val.pais !== undefined){
                            espera_cambios = false;
                            $('#pais-'+val.id).val(val.pais).trigger('change');
                            $('#pais-'+val.id).on('change', function(){
                                class_av.var.cambios_institucion = (true && !es_inicio);
                            });
                            //Revisa si ya se trajo el catálogo para este país
                            if( !opciones_ciudades.hasOwnProperty(val.pais+'-'+class_av.var.corporativo) ){
                                total ++;
                                $('#accordionInstituciones').html('Cargando Instituciones ('+total+'/'+class_av.var.institucionesJSON.length+') ...');
                                //peticiones ++;
                                opciones_ciudades[val.pais+'-'+class_av.var.corporativo] = '';
                                opciones_instituciones[val.pais+'-'+class_av.var.corporativo] = '';
                                /*********** Ciudades e instituciones según país *******************/
                                $.when(
                                    class_utils.getResource('/datos/ciudad_by_pais/'+val.pais.replaceAll(',',''), true),
                                    class_utils.getResource('/datos/institucion_by_pais/'+val.pais.replaceAll(',','')+'/'+class_av.var.corporativo, true)
                                ) 
                                .then(function(resp_ciudad, resp_institucion){
                                    //setTimeout(function(){                
                                        peticiones --;
                                        /*********ciudad*******************/
                                        var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                        $.each(resp_ciudad[0], function(i2, val2){
                                            options += class_av.cons.option.replace('<valor>', val2.ciudad).replace('<opcion>', val2.ciudad);
                                        });
                                        opciones_ciudades[val.pais+'-'+class_av.var.corporativo] = options;
                                        $('#ciudad-'+val.id).html(opciones_ciudades[val.pais+'-'+class_av.var.corporativo]);
                                        $('#ciudad-'+val.id).select2({ tags: true, placeholder: "Seleccione o escriba una ciudad", allowClear: true});
                                        $('#select2-ciudad-'+val.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                        $('.select2-container').tooltip();
                                        
                                        //Si hay un valor de ciudad se preselecciona
                                        if(val.ciudad !== null && val.ciudad !== undefined && val.ciudad !== ''){
                                            $('#ciudad-'+val.id).val(val.ciudad).trigger('change');
                                        }
                                        $('#ciudad-'+val.id).on('change', function(){
                                            class_av.var.cambios_institucion = (true && !es_inicio);
                                        });
                                        if(class_av.var.corporativo == 1){
                                            $('.div-ciudad').hide();
                                        }

                                        /*********institucion*******************/
                                        options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                        $.each(resp_institucion[0], function(i2, val2){
                                            options += class_av.cons.option.replace('<valor>', val2.institucion.replaceAll('"', "&quot;")).replace('<opcion>', val2.institucion);
                                        });
                                        opciones_instituciones[val.pais+'-'+class_av.var.corporativo] = options;
                                        $('#institucion-'+val.id).html(opciones_instituciones[val.pais+'-'+class_av.var.corporativo]);
                                        $('#institucion-'+val.id).select2({ tags: true, placeholder: "Seleccione o escriba una institución", allowClear: true,  width: 'resolve'});
                                        $('#select2-institucion-'+val.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                        $('.select2-container').tooltip();
                                        $('.select2-selection--single').css('-webkit-user-select', 'text');
                                        $('.select2-selection--single').css('cssText', '-webkit-user-select: text !important;');
                                        
                                        //Si hay un valor de institución se preselecciona
                                        if(val.institucion !== null && val.institucion !== undefined && val.institucion !== ''){
                                            //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                                            if ($('#institucion-'+val.id).find("option[value='" + val.institucion.replaceAll('"', "&quot;") + "']").length) {
                                                $('#institucion-'+val.id).val(val.institucion).trigger('change');
                                            }else{
                                                var newOption = new Option(val.institucion, val.institucion.replaceAll('"', "&quot;"), true, true);
                                                $('#institucion-'+val.id).append(newOption).trigger('change');
                                            }
                                            //if(url_pdf !== ''){
                                                //class_av.busca_en_pdf(url_pdf, val.institucion, '#check-ins-'+val.id, '#institucion-'+val.id);
                                                class_av.busca_en_pdf(class_av.var.texto_pdf, val.institucion, '#check-ins-'+val.id, '#institucion-'+val.id)
                                                .then(function(){
                                                    $('#institucion-'+val.id).on('change', function(){
                                                        class_av.var.cambios_institucion = (true && !es_inicio);
                                                    });

                                                    //Ya que se terminan las peticiones por país, se revisan instituciones del mismo país
                                                    if( peticiones == 0 ){
                                                        peticiones --;
                                                        //revisaRepetidas();
                                                        es_inicio = false;
                                                        recorrido_instituciones(resto_val);
                                                    }
                                                });
                                            //}
                                        }else{
                                            $('#institucion-'+val.id).on('change', function(){
                                                class_av.var.cambios_institucion = (true && !es_inicio);
                                            });

                                            //Ya que se terminan las peticiones por país, se revisan instituciones del mismo país
                                            if( peticiones == 0 ){
                                                peticiones --;
                                                //revisaRepetidas();
                                                es_inicio = false;
                                                recorrido_instituciones(resto_val);
                                            }
                                        }
                                    //}, 3000);
                                });
                            }else{
                                peticiones --;
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
                                if( peticiones == 0 ){
                                    peticiones --;
                                    //revisaRepetidas();
                                    es_inicio = false;
                                    recorrido_instituciones(resto_val);
                                }
                            }
                        }else{
                            total ++;
                            $('#accordionInstituciones').html('Cargando Instituciones ('+total+'/'+class_av.var.institucionesJSON.length+') ...');
                            peticiones --;
                            //Generalmente no hay país puesto que no existe un campo de donde extraerlo,
                            //Si no se encontró tampoco dentro del texto de institución
                            /*********institucion*******************/
                            if(val.institucion !== null && val.institucion !== undefined && val.institucion !== ''){
                                var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                options += class_av.cons.option.replace('<valor>', val.institucion.replaceAll('"', "&quot;")).replace('<opcion>', val.institucion);

                                $('#institucion-'+val.id).html(options);
                                $('#institucion-'+val.id).select2({ tags: true, placeholder: "Seleccione o escriba una institución", allowClear: true,  width: 'resolve'});
                                $('#select2-institucion-'+val.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                $('.select2-container').tooltip();
                                $('.select2-selection--single').css('-webkit-user-select', 'text');
                                $('.select2-selection--single').css('cssText', '-webkit-user-select: text !important;');
                                $('#institucion-'+val.id).val(val.institucion).trigger('change');
                                $('#institucion-'+val.id).on('change', function(){
                                    class_av.var.cambios_institucion = (true && !es_inicio);
                                });
                                //if(url_pdf !== ''){
                                    //class_av.busca_en_pdf(url_pdf, val.institucion, '#check-ins-'+val.id, '#institucion-'+val.id);
                                    class_av.busca_en_pdf(class_av.var.texto_pdf, val.institucion, '#check-ins-'+val.id, '#institucion-'+val.id)
                                    .then(function(){
                                        if( peticiones == 0 ){
                                            peticiones --;
                                            //revisaRepetidas();
                                            es_inicio = false;
                                            recorrido_instituciones(resto_val);
                                        }
                                    });
                                //}
                            }else{
                                if( peticiones == 0 ){
                                    peticiones --;
                                    //revisaRepetidas();
                                    es_inicio = false;
                                    recorrido_instituciones(resto_val);
                                }
                            }
                        }

                        /************************Dependencias*****************/
                        if(val.institucion !== null && val.institucion !== '' && val.institucion !== undefined){
                            //Revisa si ya se trajo el catálogo para este país
                            if( !opciones_dependencias.hasOwnProperty(val.institucion+'-'+class_av.var.corporativo) ){
                                //peticiones++;
                                opciones_dependencias[val.institucion+'-'+class_av.var.corporativo] = '';
                                /*********** dependencias según institucion *******************/
                                $.when(
                                    class_utils.getResource('/datos/dependencia_by_institucion/'+val.institucion.replaceAll(class_av.cons.char_i,'')+'/'+class_av.var.corporativo, true),
                                    class_utils.getResource('/datos/ciudad_by_institucion/'+val.institucion.replaceAll(class_av.cons.char_i, ''), true)
                                ) 
                                .then(function(resp_dependencias, resp_ciudades){
                                    //setTimeout(function(){   
                                        peticiones--;
                                        var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                        $.each(resp_dependencias[0], function(i2, val2){
                                            options += class_av.cons.option.replace('<valor>', val2.dependencia.replace('"', "&quot;")).replace('<opcion>', val2.dependencia);
                                        });
                                        opciones_dependencias[val.institucion+'-'+class_av.var.corporativo] = options;										 
                                        $('#dependencia-'+val.id).html(opciones_dependencias[val.institucion+'-'+class_av.var.corporativo]);
                                        $('#dependencia-'+val.id).select2({ tags: true, placeholder: "Seleccione o escriba una dependencia", allowClear: true});
                                        $('#select2-dependencia-'+val.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                        $('.select2-container').tooltip();
                                        $('.select2-selection--single').css('-webkit-user-select', 'text');
                                        $('.select2-selection--single').css('cssText', '-webkit-user-select: text !important;');
                                        if(val.dependencia !== null){
                                            $('#dependencia-'+val.id).val(val.dependencia).trigger('change');
                                        }
                                        $('#dependencia-'+val.id).on('change', function(){
                                            class_av.var.cambios_institucion = (true && !es_inicio);
                                        });

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
                                            peticiones --;
                                            //revisaRepetidas();
                                            es_inicio = false;
                                            recorrido_instituciones(resto_val);
                                        }
                                    //}, 1000);
                                });
                            }else{
                                peticiones --;
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
                                    peticiones --;
                                    //revisaRepetidas();
                                    es_inicio = false;
                                    recorrido_instituciones(resto_val);
                                }
                            }
                        }else{
                            peticiones --;
                            setTimeout(function(){
                                if( peticiones == 0 ){
                                    peticiones --;
                                    //revisaRepetidas();
                                    es_inicio = false;
                                    recorrido_instituciones(resto_val);
                                } 
                            }, 2000);
                        }
                    };//);
                    
                    recorrido_instituciones(class_av.var.institucionesJSON);
                    
                    /******************************************************************/
                    $('#div-autores').html('');

                    $('#accordionAutores').html('Cargando Autores (0/'+class_av.var.autoresJSON.length+') ...');
                    $('#accordionAutores').prop('href', '');

                    /*********institucion*******************/
                    class_av.var.a_opciones_instituciones = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                    $.each(class_av.var.institucionesJSON, function(i,val){
                        var op_institucion = val.institucion;
                        if(val.dependencia !== undefined && val.dependencia !== null && val.dependencia !== ''){
                            op_institucion = op_institucion + ' - ' + val.dependencia;
                        }
                        class_av.var.a_opciones_instituciones += class_av.cons.option.replace('<valor>', val.id).replace('<opcion>', op_institucion);
                    });
                    
                    var total2 = 0;
                    //$.each(class_av.var.autoresJSON, function(i,val){
                    var recorrido_autores = function(arr_autores){
                        var es_inicio = true;
                        if(arr_autores.length == 0){
                            $('#accordionAutores').html('Autores');
                            $('#accordionAutores').prop('href', '#autores');
                            return true;
                        }
                        
                        total2 ++;
                        $('#accordionAutores').html('Cargando Autores ('+total2+'/'+class_av.var.autoresJSON.length+') ...');
                        var val = arr_autores.slice(0,1)[0];
                        var resto_val = arr_autores.slice(1);
                        
                        var html_autor = class_av.var.html_autor.replaceAll('<id>', val.id);
                        var institucion = null;
                        $('#div-autores').append(html_autor);
                        $('#a-institucion-'+val.id).html(class_av.var.a_opciones_instituciones);
                        $('#a-institucion-'+val.id).select2({ tags: false, placeholder: "Seleccione una institución", allowClear: true});
                        $('#select2-a-institucion-'+val.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                        $('.select2-container').tooltip();
                        if(val['institucionId'] !== null){
                            institucion = class_utils.find_prop(class_av.var.institucionesJSON, 'id',val['institucionId'])['institucion'];
                            $('#a-institucion-'+val.id).val(val['institucionId']).trigger('change');
                        }
                        $('#a-institucion-'+val.id).on('change', function(){
                                class_av.var.cambios_autor = (true && !es_inicio);
                            });
                        $('#nombre-'+val.id).val(val.nombre);
                        $('#orcid-'+val.id).val(val.orcid);
                        $('#nombre-'+val.id).tooltip();
                        $('#orcid-'+val.id).tooltip();
                        $('.select2-selection--single').css('-webkit-user-select', 'text');
                        $('.select2-selection--single').css('cssText', '-webkit-user-select: text !important;');
                        
                        class_av.orcid_por_nombre(val.nombre, institucion, val.orcid, '#check-nombre-'+val.id, '#nombre-'+val.id)
                        .then(function(){
                            if(val.nombre !== null && val.nombre !== '' && val.nombre !== undefined){
                                var nombre = val.nombre.split(',');
                                if(nombre[1]){
                                    nombre = nombre[1] + ' ' + nombre[0];
                                }
                                class_av.busca_en_pdf(class_av.var.texto_pdf, nombre, '#check-nombre-pdf-'+val.id, '#nombre-'+val.id);
                                class_av.busca_en_pdf(class_av.var.texto_pdf, val.orcid, '#check-orcid-pdf-'+val.id, '#orcid-'+val.id);
                                class_av.nombre_por_orcid(val.orcid, val.nombre, institucion, '#check-orcid-'+val.id, '#orcid-'+val.id)
                                .then(function(){
                                    class_av.biblat_por_nombre(val.nombre, institucion, '#check-nombre-bib-'+val.id, '#nombre-'+val.id)
                                    .then(function(){
                                        es_inicio = false;
                                        recorrido_autores(resto_val);
                                    });
                                });
                            }else{
                                es_inicio = false;
                                recorrido_autores(resto_val);
                            }
                        });
                    };//});
                    
                    recorrido_autores(class_av.var.autoresJSON);
                      
                    class_av.evento_borra_autor();
                    class_av.change_nombre();
                    class_av.change_orcid();
                    
                    $('#save-no-indizable').show();
                    $('#save-full').show();
                    $('#save-article').show();
                    $('#save-instituciones').show();
                    $('#save-autores').show();
                    
                    class_av.var.cambios_de_inicio = false;
                });
            });
            
            },500);
            },500);
        });
        class_av.control_guarda();
        
        $('#btn_nuevo_articulo').off('click').on('click', function(){
            $('#accordion').hide();
            $('#div_nuevo_articulo').show();
            $('#div_tabla').hide();
            $('#btn_nuevo_articulo').hide();
            class_av.revistas_asignadas();
            class_av.initRevistas();
        });
        
        $('#btn_cancelar_na').off('click').on('click', function(){
            $('#txt_vol, #txt_num, #txt_num_esp, #txt_num_sup').val('');
            $('#txt_vol, #txt_num, #txt_num_esp, #txt_num_sup').prop('disabled', false);
            $('.check').prop('disabled', false);
            $('.check').prop('checked', false);
            $('#div_especial, #div_suplemento, #div_estacion').hide();
            $('#div_nuevo_articulo').hide();
            $('#div_tabla').show();
            $('#btn_nuevo_articulo').show();
        });
    },
    control_aa: function(){
        if(cons.res.val == "1"){
            var textarea = document.getElementById('resumen_esp');
            // Clonamos el elemento textarea para conservar sus atributos y valores
            var nuevoTextarea = textarea.cloneNode(true);
            // Reemplazamos el textarea original con el clon
            textarea.parentNode.replaceChild(nuevoTextarea, textarea);

            textarea = document.getElementById('resumen_ing');
            nuevoTextarea = textarea.cloneNode(true);
            textarea.parentNode.replaceChild(nuevoTextarea, textarea);

            textarea = document.getElementById('resumen_por');
            nuevoTextarea = textarea.cloneNode(true);
            textarea.parentNode.replaceChild(nuevoTextarea, textarea);

            textarea = document.getElementById('resumen_otro');
            nuevoTextarea = textarea.cloneNode(true);
            textarea.parentNode.replaceChild(nuevoTextarea, textarea);

            $('#resumen_esp, #resumen_ing, #resumen_por, #resumen_otro').css('overflow-y', 'scroll');
            
            $.each(['#div_resumen_esp', '#div_resumen_ing', '#div_resumen_por', '#div_resumen_otro'], function(i,val){
                $(val).show();
            });
        }
         
        if(cons.pal_cla.val == "1"){
            $('#url1, #url2, #tipourl1, #tipourl2').off('change').on('change', function(e){
                    class_av.var.cambios_documento = true;
                    if( ($('#url1').val() !== '' && $("#tipourl1").val() == 'pdf') || ($('#url2').val() !== '' && $("#tipourl2").val() == 'pdf')){
                        class_av.palabras_clave();
                        //$('#import-ai').show();
                    }
            });
            
            if( ($('#url1').val() !== '' && $("#tipourl1").val() == 'pdf') || ($('#url2').val() !== '' && $("#tipourl2").val() == 'pdf')){
                class_av.palabras_clave();
                //$('#import-ai').show();
            }
        }
    },
    control_na: function(){
        $('#revista_sel, #anio_rev').on('change', function(){
            var revista = $('#revista_sel').val();
            var anio = $('#anio_rev').val();
            if( revista !== '' && anio !== '' ){
                $('#sel_numero').hide();
                $.when(
                    class_utils.getResource('/datos/revista_num/'+class_utils.slug(revista)+'/'+anio)
                ).then(function(resp){
                    var numeros = "";
                    if(resp.length > 0){
                        numeros = resp[0].numero;
                        class_av.var.numeros = numeros;
                    }
                    class_av.revista_numeros(numeros);
                    $('#sel_numero').show();
                });
            }
            $('#txt_vol, #txt_num, #txt_num_esp, #txt_num_sup').val('');
            $('#txt_vol, #txt_num, #txt_num_esp, #txt_num_sup').prop('disabled', false);
            $('.check').prop('disabled', false);
            $('.check').prop('checked', false);
            $('#div_especial, #div_suplemento, #div_estacion').hide();
        });
        
        $('#sel_numero').on('change', function(){
            if(this.value == ""){
                $('.check').prop('disabled', false);
                $('#txt_vol').prop('disabled', false);
                $('#txt_num').prop('disabled', false);
            }else{
                $('.check').prop('disabled', true);
                $('#txt_vol').val('');
                $('#txt_vol').prop('disabled', true);
                $('#txt_num').val('');
                $('#txt_num').prop('disabled', true);
                $('.check').prop('checked', false);
            }
        });
        
        $('#sin_vol').off('change').on('change', function(){
            if(this.checked){
                $('#txt_vol').val('');
                $('#txt_vol').prop('disabled', true);
            }else{
                $('#txt_vol').prop('disabled', false);
            }
        });
        
        $('#sin_num').off('change').on('change', function(){
            if(this.checked){
                $('#txt_num').val('');
                $('#txt_num').prop('disabled', true);
            }else{
                $('#txt_num').prop('disabled', false);
            }
        });
        
        $('#sin_num_esp').off('change').on('change', function(){
            if(this.checked){
                $('#txt_num_esp').val('');
                $('#txt_num_esp').prop('disabled', true);
            }else{
                $('#txt_num_esp').prop('disabled', false);
            }
        });
        
        $('#sin_num_sup').off('change').on('change', function(){
            if(this.checked){
                $('#txt_num_sup').val('');
                $('#txt_num_sup').prop('disabled', true);
            }else{
                $('#txt_num_sup').prop('disabled', false);
            }
        });
        
        $('#p_esp, #p_sup, #p_est, #p_no').off('change').on('change', function(){
            var clic_id=this.id;
            var clic_checked=this.checked;
            $.each(['p_esp', 'p_sup', 'p_est', 'p_no'], function(i, val){
                if(clic_id !== val && clic_checked){
                    $('#'+val).prop('checked', false);
                    if(val == 'p_esp'){
                        $('#div_especial').hide();
                        $('#txt_num_esp').val('');
                        $('#txt_num_esp').prop('disabled', false);
                        $('#sin_num_esp').prop('checked', false);
                    }
                    if(val == 'p_sup'){
                        $('#div_suplemento').hide();
                        $('#txt_num_sup').val('');
                        $('#txt_num_sup').prop('disabled', false);
                        $('#sin_num_sup').prop('checked', false);
                    }
                    if(val == 'p_est'){
                        $('#div_estacion').hide();
                    }
                }else{
                    if(clic_checked){
                        if(val == 'p_esp'){
                            $('#div_especial').show();
                        }
                        if(val == 'p_sup'){
                            $('#div_suplemento').show();
                        }
                        if(val == 'p_est'){
                            $('#div_estacion').show();
                        }
                    }else{
                        $('#div_especial, #div_suplemento, #div_estacion').hide();
                    }
                }
            });
        });
        
        $('#btn_agregar_na').off('click').on('click', function(){
            class_av.agrega_nuevo_articulo();
        });
        
        $('#agrega_titulo_na').off('click').on('click', function(){
            class_av.var.count_titulos++;
            var id_tit = class_av.var.count_titulos;
            var html_titulo = class_av.var.html_titulo.replaceAll('<id>', id_tit);
            $('#div_titulos').append(html_titulo);
            $('.borra-titulo').off('click').on('click', function(){
                var id_clic = parseInt(this.id.split('-')[2]);
                $('#div_titulo_na-'+id_clic).remove();
                $.each($('.borra-titulo'), function(i, val){
                    //REcorrido de los títulos y reemplaza el id restando 1
                    var id_ciclo = val.id;
                    var num_ciclo = parseInt(val.id.split('-')[2]);
                    if(num_ciclo > id_clic){
                        $('#'+id_ciclo)[0].id = val.id.replace(num_ciclo, num_ciclo-1);
                        $('#div_titulo_na-'+num_ciclo)[0].id = 'div_titulo_na-'+(num_ciclo-1);
                        $('#titulo_na-'+num_ciclo)[0].id = 'titulo_na-'+(num_ciclo-1);
                        $('#de_na-'+num_ciclo)[0].id = 'de_na-'+(num_ciclo-1);
                        $('#a_na-'+num_ciclo)[0].id = 'a_na-'+(num_ciclo-1);
                    }
                });
                class_av.var.count_titulos--;
            });
        });
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
        class_av.var.cambios_autor = (true && !class_av.var.cambios_de_inicio);
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
    autor_corporativo: function(inicio=false){
        if(class_av.var.corporativo == 1){
            $.each(class_av.var.institucionesJSON, function(i, val){
                $('.div-ciudad').hide();
                class_av.change_paises(val.id);
                $('#pais-'+val.id).change();
                class_av.change_institucion(val.id);
                $('#institucion-'+val.id).change();
                $('#avisoAutores').show();
                $('#panelAutores').hide();
                if(!inicio){
                    class_av.var.cambios_institucion = true; 
                }
            });
        }else{
            $.each(class_av.var.institucionesJSON, function(i, val){
                $('.div-ciudad').show();
                class_av.change_paises(val.id);
                $('#pais-'+val.id).change();
                class_av.change_institucion(val.id);
                $('#institucion-'+val.id).change();
                $('#avisoAutores').hide();
                $('#panelAutores').show();
                if(!inicio){
                    class_av.var.cambios_institucion = true; 
                }
            });
        }
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
        $('#pais-'+id).on('change', function(){
            class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
        });
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
        $('#a-institucion-'+id).on('change', function(){
            class_av.var.cambios_autor = (true && !class_av.var.cambios_de_inicio);
        });
        $('#a-institucion-'+id).select2({ tags: false, placeholder: "Seleccione una institución", allowClear: true});
        $('#select2-a-institucion-'+id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
        $('.select2-container').tooltip();
        
        //Debido a que en el evento de borrar hay cambios en los ids, se revisan los anteriores para areglar la parte del select
        for(var id_atras = parseInt(id)-1; id_atras > 0; id_atras--){
            if($('#a-institucion-'+id_atras)){
                $('#a-institucion-'+id_atras).on('change', function(){
                    class_av.var.cambios_autor = (true && !class_av.var.cambios_de_inicio);
                });
                $('#a-institucion-'+id_atras).select2({ tags: false, placeholder: "Seleccione una institución", allowClear: true});
                $('#select2-a-institucion-'+id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                $('.select2-container').tooltip();
            }
        }
        
        $('.select2-selection--single').css('-webkit-user-select', 'text');
        $('.select2-selection--single').css('cssText', '-webkit-user-select: text !important;');
        
        $('#borra-autor-'+id).off('click').on('click', function(){
            class_av.borra_autor(id);
        });
        
        class_av.change_nombre(id);
        class_av.change_orcid(id);
        class_av.var.cambios_autor = (true && !class_av.var.cambios_de_inicio);
    },
    busca_en_pdf: function(url_pdf, texto, id, id_h){
        return new Promise(function(resolve, reject) {
            $(id).hide();
            $(id + '-load').show();
            $(id + '-load').show();
            $(id + '-broken').hide();
            $(id + '-false').hide();
            $(id + '-half').hide();
            $(id + '-true').hide();
            $(id + '-texto').html('');
            $(id + '-texto').hide();
            
            if(texto == null || texto == '' || texto == undefined || url_pdf == null || url_pdf == '' || url_pdf == undefined){
                resolve();
                return false;
            }
            
            try{
                texto = class_utils.slug(texto.replaceAll(class_av.cons.caracteres,'.'));
            }catch(error){
                resolve();
                return false;
            }
            
            $(id).show();
            
            if(url_pdf == 'fallo'){
                $(id + '-load').hide();
                $(id + '-broken').show();
                resolve();
                return false;
            }
            
            if(id_h == null){
                $(id + '-load').hide();
                $(id + '-texto').html('Título corto');
                $(id + '-texto').show();
                resolve();
                return false;
            }
            
            /*if(class_av.var.arr_busca_pdf.indexOf(texto) !== -1){
                 $(id + '-load').hide();
                 $(id_h).prop("disabled", false);
                 resolve();
                return false;
            }else{
                class_av.var.arr_busca_pdf.push(texto);
            }*/
            
            $.when(
                //class_utils.getResource('http://localhost:5001/texto_en_pdf/'+class_utils.slug(texto.replaceAll(class_av.cons.caracteres,'.'))+'/url/'+url_pdf)
                class_utils.setResource(class_av.var.servidor + class_av.var.app + '/texto_en_textopdf/',{texto: texto, textopdf: url_pdf})
            ).then(function(resp_pdf){
                setTimeout(function(){
                    $(id + '-load').hide();
                    if(resp_pdf.result == 'fallo'){
                        $(id + '-broken').show();
                    }else{
                        $(id + '-broken').hide();
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
                    if(resp_pdf.result == 'no encontrado'){
                        $(id + '-false').show();
                    }else{
                        $(id + '-false').hide();
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
                resolve();
                $(id_h).prop("disabled", false);
            });
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
        return new Promise(function(resolve, reject) {
            $(id).hide();
            $(id + '-load').show();
            $(id + '-broken').hide();
            $(id + '-false').hide();
            $(id + '-true').hide();
            $(id + '-expand').hide();
            $(id + '-texto').html('');
            $(id + '-texto').hide();
            
            if(nombre == null || nombre == ''){
                resolve();
                return false;
            }
            
            $(id).show();
            
            $.when(
                class_utils.getResource('/datos/autor_by_nombre/'+nombre.replaceAll(class_av.cons.char_i, '')+'/'+class_av.var.sistema, true)
            ).then(function(resp){
                //setTimeout(function(){
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
                //}, 1000);
            }).fail(function(){
                $(id + '-load').hide();
                $(id + '-texto').html('Sin comparar');
                $(id + '-texto').show();
            }).always(function(){
                $(id_h).prop("disabled", false);
                resolve();
            });
        });
    },
    orcid_por_nombre: function(nombre, institucion, orcid, id, id_h){
        return new Promise(function(resolve, reject) {
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
                resolve();
                return false;
            }
            
            $(id).show();
            
            $.when(
                class_utils.setResource(class_av.var.servidor + class_av.var.app + '/orcid_por_nombre/',{nombre: nombre}, true)
            ).then(function(resp){
                //setTimeout(function(){
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
                //}, 1000);
            }).fail(function(){
                $(id + '-load').hide();
                $(id + '-texto').html('Sin comparar');
                $(id + '-texto').show();
            }).always(function(){
                $(id_h).prop("disabled", false);
                resolve();
            });
        });
    },
    nombre_por_orcid: function(orcid, nombre, institucion, id, id_h){
        return new Promise(function(resolve, reject) {
            $(id).hide();
            $(id + '-load').show();
            $(id + '-broken').hide();
            $(id + '-false').hide();
            $(id + '-true').hide();
            $(id + '-expand').hide();
            $(id + '-texto').html('');
            $(id + '-texto').hide();
            
            if(orcid == null || orcid == ''){
                resolve();
                return false;
            }
            
            $(id).show();
            
            $.when(
                class_utils.setResource(class_av.var.servidor + class_av.var.app + '/nombre_por_orcid/',{orcid: orcid}, true)
            ).then(function(resp){
                //setTimeout(function(){
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
                //}, 1000);
            }).fail(function(){
                $(id + '-load').hide();
                $(id + '-texto').html('Sin comparar');
                $(id + '-texto').show();
            }).always(function(){
                $(id_h).prop("disabled", false);
                resolve();
            });
        });
    },
    setTabla: function(data){
        var tbody = '';
        var total_meta = 0;
        
        $.each(data, function(i, val){
            var texto1 = (val['url1'] == null)?'':'Ver artículo';
            var texto2 = (val['url2'] == null)?'':'Ver artículo';
            var art_class = ( ['C','B'].indexOf(val['estatus']) == -1 )?'sistema':'cerrado';
            //var art_class = 'sistema';
            var art_style = ( ['C','B'].indexOf(val['estatus']) == -1 )?'cursor:pointer;color:#ff8000':'';
            //var art_style = 'cursor:pointer;color:#ff8000';
            val['articulo'] = val['articulo'].replace(/<[^>]+>/g, '');
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
                            .replace('<fecha>', val['fechaAsignado'])
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
                            //Evento para ocultar o mostrar la paginación si existen o no registros después de una búsqueda
                            if ($(this).DataTable().page.info().recordsDisplay > 0) {
                                $('.dataTables_paginate').show();
                            }else{
                                $('.dataTables_paginate').hide();
                            }
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
            
            var val_ciudad = $('#ciudad-'+id).val();
            if(val_ciudad == undefined){
                val_ciudad = null;
            }else{
                if(val_ciudad == ''){
                    val_ciudad = null;
                }
            }
            
            if(pais !== null && pais !== '' && pais !== undefined){
                if( !opciones_ciudades.hasOwnProperty(pais+'-'+class_av.var.corporativo) ){
                    $('#div-ciudad-'+id).hide();
                    $('#ciudad-'+id+'-load').show();

                    /*********** Ciudades e instituciones según país *******************/
                    $.when(
                        class_utils.getResource('/datos/ciudad_by_pais/'+pais.replaceAll(',',''), true),
                        class_utils.getResource('/datos/institucion_by_pais/'+pais.replaceAll(',','')+'/'+class_av.var.corporativo, true)
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
                            opciones_ciudades[pais+'-'+class_av.var.corporativo] = '';
                            opciones_ciudades[pais+'-'+class_av.var.corporativo] = options;
                            $('#ciudad-'+id).html(opciones_ciudades[pais+'-'+class_av.var.corporativo]);
                            $('#ciudad-'+id).on('change', function(){
                                class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                            });
                            $('#ciudad-'+id).select2({ tags: true, placeholder: "Seleccione o escriba una ciudad", allowClear: true});
                            $('#select2-ciudad-'+id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                            $('.select2-container').tooltip();
                            
                            //Si hay un valor de ciudad se preselecciona
                            if(val_ciudad !== null){
                                //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                                if ($('#ciudad-'+id).find("option[value='" + val_ciudad.replaceAll('"', "&quot;") + "']").length) {
                                    $('#ciudad-'+id).val(val_ciudad).trigger('change');
                                }else{
                                    var newOption = new Option(val_ciudad, val_ciudad.replaceAll('"', "&quot;"), true, true);
                                    $('#ciudad-'+id).append(newOption).trigger('change');
                                }
                            }
                            $('#ciudad-'+id).on('change', function(){
                                class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                            });

                            /*********institucion*******************/

                            options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                            $.each(resp_institucion[0], function(i2, val2){
                                options += class_av.cons.option.replace('<valor>', val2.institucion.replaceAll('"', "&quot;")).replace('<opcion>', val2.institucion);
                            });
                            opciones_instituciones[pais+'-'+class_av.var.corporativo] = '';
                            opciones_instituciones[pais+'-'+class_av.var.corporativo] = options;
                            $('#institucion-'+id).html(opciones_instituciones[pais+'-'+class_av.var.corporativo]);
                            $('#institucion-'+id).select2({ tags: true, placeholder: "Seleccione o escriba una institución", allowClear: true,  width: 'resolve'});
                            $('#select2-institucion-'+id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                            $('.select2-container').tooltip();
                            $('.select2-selection--single').css('-webkit-user-select', 'text');
                            $('.select2-selection--single').css('cssText', '-webkit-user-select: text !important;');

                            //Si hay un valor de institución se preselecciona
                            if(val_institucion !== null){
                                //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                                if ($('#institucion-'+id).find("option[value='" + val_institucion.replaceAll('"', "&quot;") + "']").length) {
                                    $('#institucion-'+id).val(val_institucion).trigger('change');
                                }else{
                                    var newOption = new Option(val_institucion, val_institucion.replaceAll('"', "&quot;"), true, true);
                                    $('#institucion-'+id).append(newOption).trigger('change');
                                }
                            }
                            $('#institucion-'+id).on('change', function(){
                                class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                            });

                        }, 1000);
                    });
                }else{
                    setTimeout(function(){
                        $('#ciudad-'+id).html(opciones_ciudades[pais+'-'+class_av.var.corporativo]);
                        $('#ciudad-'+id).on('change', function(){
                            class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                        });
                        $('#ciudad-'+id).select2({ tags: true, placeholder: "Seleccione o escriba una ciudad", allowClear: true});
                        $('#select2-ciudad-'+id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                        $('.select2-container').tooltip();
                        
                        //Si hay un valor de ciudad se preselecciona
                        if(val_ciudad !== null){
                            //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                            if ($('#ciudad-'+id).find("option[value='" + val_ciudad.replaceAll('"', "&quot;") + "']").length) {
                                $('#ciudad-'+id).val(val_ciudad).trigger('change');
                            }else{
                                var newOption = new Option(val_ciudad, val_ciudad.replaceAll('"', "&quot;"), true, true);
                                $('#ciudad-'+id).append(newOption).trigger('change');
                            }
                        }
                        $('#ciudad-'+id).on('change', function(){
                            class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                        });

                        $('#institucion-'+id).html(opciones_instituciones[pais+'-'+class_av.var.corporativo]);
                        $('#institucion-'+id).select2({ tags: true, placeholder: "Seleccione o escriba una institución", allowClear: true/*,  width: 'Auto'*/});
                        $('#select2-institucion-'+id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                        $('.select2-container').tooltip();
                        $('.select2-selection--single').css('-webkit-user-select', 'text');
                        $('.select2-selection--single').css('cssText', '-webkit-user-select: text !important;');
                        if(val_institucion !== null){
                            //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                            if ($('#institucion-'+id).find("option[value='" + val_institucion.replaceAll('"', "&quot;") + "']").length) {
                                $('#institucion-'+id).val(val_institucion).trigger('change');
                            }else{
                                var newOption = new Option(val_institucion, val_institucion.replaceAll('"', "&quot;"), true, true);
                                $('#institucion-'+id).append(newOption).trigger('change');
                            }
                        }
                        $('#institucion-'+id).on('change', function(){
                            class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                        });
                        $('#ciudad-'+id+'-load').hide();
                        $('#div-ciudad-'+id).show();
                    }, 1000);
                }
            }
                if(!class_av.var.cambios_de_inicio){
                    class_av.var.cambios_institucion = true;
                }
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
            
            var val_dependencia = $('#dependencia-'+id).val();
            if(val_dependencia == undefined){
                val_dependencia = null;
            }else{
                if(val_dependencia == ''){
                    val_dependencia = null;
                }
            }
            
            class_av.busca_en_pdf(class_av.var.texto_pdf, institucion, '#check-ins-'+id, '#institucion-'+id);
            //Revisa si ya se trajo el catálogo para este país
            if( !opciones_dependencias.hasOwnProperty(institucion+'-'+class_av.var.corporativo) && institucion !== '' && institucion !== null){
                opciones_dependencias[institucion+'-'+class_av.var.corporativo] = '';
                /*********** dependencias según institucion *******************/
                $.when(
                    class_utils.getResource('/datos/dependencia_by_institucion/'+institucion.replaceAll(class_av.cons.char_i,'')+'/'+class_av.var.corporativo, true),
                    class_utils.getResource('/datos/ciudad_by_institucion/'+institucion.replaceAll(class_av.cons.char_i, ''), true)
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
                        opciones_dependencias[institucion+'-'+class_av.var.corporativo] = options;
                        $('#dependencia-'+id).html(opciones_dependencias[institucion+'-'+class_av.var.corporativo]);
                        $('#dependencia-'+id).on('change', function(){
                            class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                        });
                        $('#dependencia-'+id).select2({ tags: true, placeholder: "Seleccione o escriba una dependencia", allowClear: true});
                        $('#select2-dependencia-'+id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                        $('.select2-container').tooltip();
                        $('.select2-selection--single').css('-webkit-user-select', 'text');
                        $('.select2-selection--single').css('cssText', '-webkit-user-select: text !important;');
                        
                        //Si hay un valor de dependencia se preselecciona
                        if(val_dependencia !== null){
                            //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                            if ($('#dependencia-'+id).find("option[value='" + val_dependencia.replaceAll('"', "&quot;") + "']").length) {
                                $('#dependencia-'+id).val(val_dependencia).trigger('change');
                            }else{
                                var newOption = new Option(val_dependencia, val_dependencia.replaceAll('"', "&quot;"), true, true);
                                $('#dependencia-'+id).append(newOption).trigger('change');
                            }
                        }
                        
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
                    $('#dependencia-'+id).html(opciones_dependencias[institucion+'-'+class_av.var.corporativo]);
                    $('#dependencia-'+id).on('change', function(){
                        class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                    });
                    $('#dependencia-'+id).select2({ tags: true, placeholder: "Seleccione o escriba una dependencia", allowClear: true});
                    $('#select2-dependencia-'+id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                    $('.select2-container').tooltip();
                    $('.select2-selection--single').css('-webkit-user-select', 'text');
                    $('.select2-selection--single').css('cssText', '-webkit-user-select: text !important;');
                    
                    //Si hay un valor de dependencia se preselecciona
                    if(val_dependencia !== null){
                        //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                        if ($('#dependencia-'+id).find("option[value='" + val_dependencia.replaceAll('"', "&quot;") + "']").length) {
                            $('#dependencia-'+id).val(val_dependencia).trigger('change');
                        }else{
                            var newOption = new Option(val_dependencia, val_dependencia.replaceAll('"', "&quot;"), true, true);
                            $('#dependencia-'+id).append(newOption).trigger('change');
                        }
                        }
                    
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
            if(!class_av.var.cambios_de_inicio){
                class_av.var.cambios_institucion = true;
            }
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
            class_av.var.cambios_autor = (true && !class_av.var.cambios_de_inicio);
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
            class_av.var.cambios_autor = (true && !class_av.var.cambios_de_inicio);
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
            //var idioma = $('#idioma').val();
            var idioma = $('#idiomaDocumento').val().join(', ').charAt(0).toUpperCase() + $('#idiomaDocumento').val().join(', ').toLowerCase().slice(1);
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
            }else{
                obj['articuloIdiomas'] = null;
            }
            
            var tipo_documento = $('#tipo_documento').val();
            obj['documento'] = JSON.stringify({a: tipo_documento});
            
            var disciplina1 = $('#disciplina1').val();
            disciplina1 = class_av.limpia(disciplina1);
            var busca_idx1 = -1;
            if(disciplina1){
                arrDisc.push(disciplina1);
                //Busca la correspondiente en inglés
                busca_idx1 = class_av.var.catalogos['disciplina'].indexOf(disciplina1);
            }
            
            var disciplina2 = $('#disciplina2').val();
            disciplina2 = class_av.limpia(disciplina2);
            var busca_idx2 = -1;
            if(disciplina2){
                arrDisc.push(disciplina2);
                busca_idx2 = class_av.var.catalogos['disciplina'].indexOf(disciplina2);
            }
            
            var disciplina3 = $('#disciplina3').val();
            disciplina3 = class_av.limpia(disciplina3);
            var busca_idx3 = -1;
            if(disciplina3){
                arrDisc.push(disciplina3);
                busca_idx3 = class_av.var.catalogos['disciplina'].indexOf(disciplina3);
            }
            
            obj['disciplinas'] = JSON.stringify(arrDisc);
            
            var palabras_clave = JSON.parse(class_av.var.documentoJSON[0].palabraClave);
            if(palabras_clave == null || cons.pal_cla.val == "1"){
                palabras_clave = [];
            }
            
            var keywords = JSON.parse(class_av.var.documentoJSON[0].keyword);
            if(keywords == null || cons.pal_cla.val == "1"){
                keywords = [];
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
                var disc_eng = class_av.var.catalogos['disciplina_eng'][busca_idx1];
                var idx_sub = class_av.var.catalogos[disciplina1].indexOf(subdisciplina1);
                keywords.push( class_av.var.catalogos[disc_eng][idx_sub] );
                keywords = [...new Set(keywords)];
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
                var disc_eng = class_av.var.catalogos['disciplina_eng'][busca_idx2];
                var idx_sub = class_av.var.catalogos[disciplina2].indexOf(subdisciplina2);
                keywords.push( class_av.var.catalogos[disc_eng][idx_sub] );
                keywords = [...new Set(keywords)];
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
                var disc_eng = class_av.var.catalogos['disciplina_eng'][busca_idx3];
                var idx_sub = class_av.var.catalogos[disciplina3].indexOf(subdisciplina3);
                keywords.push( class_av.var.catalogos[disc_eng][idx_sub] );
                keywords = [...new Set(keywords)];
            }
            
            obj['subdisciplinas'] = JSON.stringify(arrSubdisc);
            //obj['palabraClave'] = JSON.stringify(palabras_clave);
            //class_av.var.documentoJSON[0].palabraClave = JSON.stringify(palabras_clave);

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
            
            if(cons.pal_cla.val == "1"){
                arr_palabras_clave = [];
                $('.esp.palabra_clave.badge-warning').each(function() {
                    var palabra = $(this).html(); // Obtener el texto dentro del botón actual
                    var palabra_sustituye = '';
                    //busca si hay sustitución de palabra
                    if( palabra.indexOf('fa-arrow-down') !== -1 ){
                        palabra_sustituye = palabra.split('<br>')[2].split('<span')[0].trim();
                    }
                    palabra = palabra.split('<span')[0].trim();
                    if(palabra_sustituye !== ''){
                        palabra = palabra + '-sustituye-' + palabra_sustituye;
                    }
                    arr_palabras_clave.push(palabra);
                });
                
                arr_keywords = [];
                $('.keyword.palabra_clave.badge-warning').each(function() {
                    var palabra = $(this).html(); // Obtener el texto dentro del botón actual
                    var palabra_sustituye = '';
                    //busca si hay sustitución de palabra
                    if( palabra.indexOf('fa-arrow-down') !== -1 ){
                        palabra_sustituye = palabra.split('<br>')[2].split('<span')[0].trim();
                    }
                    palabra = palabra.split('<span')[0].trim();
                    if(palabra_sustituye !== ''){
                        palabra = palabra + '-sustituye-' + palabra_sustituye;
                    }
                    arr_keywords.push(palabra);
                });
                
                arr_palabras_clave = arr_palabras_clave.concat(palabras_clave);
                arr_keywords = arr_keywords.concat(keywords);
                
                arr_palabras_clave = [...new Set(arr_palabras_clave)];
                arr_keywords = [...new Set(arr_keywords)];
                
                obj['palabraClave'] = JSON.stringify(arr_palabras_clave);
                class_av.var.documentoJSON[0].palabraClave = JSON.stringify(arr_palabras_clave);
                obj['keyword'] = JSON.stringify(arr_keywords);
                class_av.var.documentoJSON[0].keyword = JSON.stringify(arr_keywords);
            }else{
                obj['palabraClave'] = JSON.stringify(palabras_clave);
                obj['keyword'] = JSON.stringify(keywords);
                class_av.var.documentoJSON[0].palabraClave = JSON.stringify(palabras_clave);
                class_av.var.documentoJSON[0].keyword = JSON.stringify(keywords);
            }
            
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
        var data_corp = [];
        var error = '';
        var confirma_i = '';
        var revisa_duplicado = [];
        
        $.each(class_av.var.institucionesJSON, function(i,val){
            var obj = {};
            var obj_corp = {};
           
            obj['sistema'] = class_av.var.sistema;
            obj['id'] = parseInt(val.id);
            
            var pais = $('#pais-'+val.id).val();
            pais = class_av.limpia(pais);
            val.pais = null;
            if(pais){
                obj['pais'] = pais;
                val.pais = pais;
            }else{
                error = 'Falta <b>País</b> de Institución ' + (i+1);
                return false;
            }
            
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
            alert(institucion);
            if(institucion){
                if( 
                    institucion.toLowerCase().indexOf('departamento') !== -1 ||
                    institucion.toLowerCase().indexOf('facultad') !== -1 ||
                    institucion.toLowerCase().indexOf('. ') !== -1 ||
                    institucion.toLowerCase().indexOf(', '+pais.toLowerCase()) !== -1
                ){
                    if(confirma_i == ''){
                        confirma_i = 'Al parecer el campo contiene información adicional<br>Confirma que estas Instituciones son correctas:';
                    }
                    confirma_i += '<br>('+(i+1)+') <b>' + institucion + '</b>';
                    error == 'corregir';
                }
                
                obj['institucion'] = institucion;
                val.institucion = institucion;
            }else{
                error = 'Falta nombre de <b>Institución</b> ' + (i+1);
                return false;
            }
            
            
            
            data_int.push(obj);
            
            obj_corp = JSON.parse(JSON.stringify(obj));
            delete obj_corp.ciudad;
            data_corp.push(obj_corp);
            
            if( revisa_duplicado.indexOf(obj.pais + '-' + obj.ciudad + '-' + obj.institucion + '-' + obj.dependencia) == -1 ){
                revisa_duplicado.push(obj.pais + '-' + obj.ciudad + '-' + obj.institucion + '-' + obj.dependencia);
            }else{
                error = 'Existen <b>Instituciones</b> duplicadas<br>Mantenga sólo un registro y elimine las demás';
                return false;
            }
        });
        
        if(error !== ''){
            if(error !== 'corregir'){
                return error;
            }
        }
        
        data['corporativo'] = class_av.var.corporativo;
        data['tabla_autores'] = 'author';
        data['tabla_instituciones'] = 'institution';
        data['tabla_corporativo'] = 'author_coorp';
        data['where'] = ['sistema', 'id'];
        data['where_delete'] = ['sistema'];
        data['data_instituciones'] = data_int;
        data['data_corporativo'] = data_corp;
        
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
        
        return {data: data, confirma: confirma_i};
    },
    data_update_autores: function(revisa = false){
        var data = {};
        var data_int = [];
        var error = '';
        var confirma_i = '';
        
        $.each(class_av.var.autoresJSON, function(i,val){
            var obj = {};
           
            obj['sistema'] = class_av.var.sistema;
            obj['id'] = parseInt(val.id);
            obj['email'] = val.email;
            
            var orcid = $('#orcid-'+val.id).val();
            orcid = class_av.limpia(orcid);
            val.ciudad = null;
            if(orcid){
                if(revisa){
                    var er_orcid = /^[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9]([0-9]|X)/;
                    if( !er_orcid.test(orcid) ){
                        error = 'Error en <b>ORCID</b> ' + (i+1);
                        return false;
                    }
                }
                obj['orcid'] = orcid;
                val.orcid = orcid;
            }
            
            var nombre = $('#nombre-'+val.id).val();
            nombre = class_av.limpia(nombre);
            val.nombre = null;
            if(nombre){
                if(revisa){
                    if( 
                        nombre.toLowerCase().indexOf('-') !== -1
                    ){
                        if(confirma_i == ''){
                            confirma_i = 'Se encontraron guiones "-", confirma que estos Nombres son correctos:';
                        }
                        confirma_i += '<br>('+(i+1)+') <b>' + nombre + '</b>';
                        error == 'corregir';
                    }
                }
                
                obj['nombre'] = nombre;
                val.nombre = nombre;
            }else{
                if(revisa){
                    error = 'Falta nombre de <b>Autor</b> ' + (i+1);
                    return false;
                }
            }
            
            var institucion = $('#a-institucion-'+val.id).val();
            institucion = class_av.limpia(institucion);
            val.institucionId = null;
            if(institucion){
                obj['institucionId'] = institucion;
                val.institucionId = institucion;
            }
            
            data_int.push(obj);
        });
        
        if(error !== ''){
            if(error !== 'corregir'){
                return error;
            }
        }
        
        data['tabla_autores'] = 'author';
        data['where'] = ['sistema', 'id'];
        data['where_delete'] = ['sistema'];
        data['data_autores'] = data_int;
        data['sistema'] = class_av.var.sistema;
        return {data: data, confirma: confirma_i};
    },
    reset_autores: function(){
        $('#div-autores').html('');
        class_av.var.a_opciones_instituciones = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
        $.each(class_av.var.institucionesJSON, function(i,val){
            var op_institucion = val.institucion;
            if(val.dependencia !== undefined && val.dependencia !== null && val.dependencia !== ''){
                op_institucion = op_institucion + ' - ' + val.dependencia;
            }
            class_av.var.a_opciones_instituciones += class_av.cons.option.replace('<valor>', val.id).replace('<opcion>', op_institucion);
        });

        $.each(class_av.var.autoresJSON, function(i,val){
            var html_autor = class_av.var.html_autor.replaceAll('<id>', val.id);
            var institucion = null;
            $('#div-autores').append(html_autor);
            $('#a-institucion-'+val.id).html(class_av.var.a_opciones_instituciones);
            $('#a-institucion-'+val.id).select2({ tags: false, placeholder: "Seleccione una institución", allowClear: true});
            $('#select2-a-institucion-'+val.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
            $('.select2-container').tooltip();
            if(val['institucionId'] !== null){
                institucion = class_utils.find_prop(class_av.var.institucionesJSON, 'id',val['institucionId'])['institucion'];
                $('#a-institucion-'+val.id).val(val['institucionId']).trigger('change');
            }
            $('#a-institucion-'+val.id).on('change', function(){
                class_av.var.cambios_autor = (true && !class_av.var.cambios_de_inicio);
            });
            $('#nombre-'+val.id).val(val.nombre);
            $('#orcid-'+val.id).val(val.orcid);
            $('#nombre-'+val.id).tooltip();
            $('#orcid-'+val.id).tooltip();
            $('.select2-selection--single').css('-webkit-user-select', 'text');
            $('.select2-selection--single').css('cssText', '-webkit-user-select: text !important;');

            class_av.orcid_por_nombre(val.nombre, institucion, val.orcid, '#check-nombre-'+val.id, '#nombre-'+val.id);
            if(val.nombre !== null){
                var nombre = val.nombre.split(',');
                if(nombre[1]){
                    nombre = nombre[1] + ' ' + nombre[0];
                }
                class_av.busca_en_pdf(class_av.var.texto_pdf, nombre, '#check-nombre-pdf-'+val.id, '#nombre-'+val.id);
                class_av.biblat_por_nombre(val.nombre, institucion, '#check-nombre-bib-'+val.id, '#nombre-'+val.id);
                class_av.nombre_por_orcid(val.orcid, val.nombre, institucion, '#check-orcid-'+val.id, '#orcid-'+val.id);
            }
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
    prompt: function(id, idioma, arr_sustituye){
        var id_s = id.split('-').slice(2).join('-')+'-sustituye';
        id = id.split('-')[1];
        $.confirm({
            title: '',
            content: '' +
            '<form action="" class="formName">' +
            '<div class="form-group">' +
            'Asignar un término más adecuado para<br> <b>' +id+ '</b>:' +
            '<br><select class="name form-control" name="palabra_clave_sel" id="palabra_clave_sel" style="width:100%" width="100%" required>' +
            '</select>' +
            '</div>' +
            '</form>',
            buttons: {
                cancelar: {
                    text: 'Restablecer',
                    //btnClass: 'btn-red',
                    action: function(){
                        $('#'+id_s).html('');
                    }
                },
                formSubmit: {
                    text: 'Enviar',
                    btnClass: 'btn-warning',
                    action: function () {
                        var name = this.$content.find('.name').val();
                        var name_ant = '';
                        if(!name || name == id){
                            $.alert('No es una palabra válida');
                            return false;
                        }else{
                            name = name.trim();
                            
                            var duplicada = false;
                            var clase ='.esp.palabra_clave';
                            var var_palabras_clave = class_av.var.palabras_clave_n;
                            if(idioma == 'eng'){
                                clase ='.keyword.palabra_clave';
                                var_palabras_clave = class_av.var.keywords_n;
                            }
                            
                            //Revisa si existe una palabra más apropiada
                            var sustituye = class_utils.find_prop(arr_sustituye, 'palabra', name);
                            if(sustituye !== undefined){
                                name_ant = name;
                                name = sustituye.palabra_adecuada;    
                            }

                            $(clase).each(function() {
                                var palabra = $(this).html();
                                var palabra1 = palabra.split('<span')[0].trim();
                                var palabra2 = palabra.split('<br>');

                                if( palabra2[2] !== undefined){
                                    palabra2 = palabra2[2].split('<span')[0].trim();
                                }

                                if(palabra1 == name || palabra2 == name || var_palabras_clave.indexOf(name) !== -1){
                                    duplicada = true;
                                    return true;
                                }
                            });
                            
                            if(duplicada){
                                if(sustituye !== undefined){
                                    class_av.mensaje('Se encontró una palabra que fue considerada más adecuada: <b>'+name+'</b><br><br>Esta palabra ya se encuentra en las opciones para seleccionar');
                                }else{
                                    class_av.mensaje('La palabra ya se encuentra en las opciones para seleccionar');
                                }
                                return false;
                            }else{
                                var num = class_utils.find_prop(class_av.var.palabras_clave0,'valor',name);
                                if(num == undefined){num=0;}else{num=num.num;}
                                $('#'+id_s).html(class_av.cons.palabra_clave_sustituye.replaceAll('<palabra>', name).replaceAll('<num>', num));
                                if(sustituye !== undefined){
                                    class_av.mensaje('Se encontró una palabra que fue considerada más adecuada:<br><br>\n\
                                                        <b>'+id+'</b> no será sustituida por <b>' + name_ant +'</b><br><br>\n\
                                                        <b>'+id+'</b> será sustituida por <b>' + name +'</b>');
                                }else{
                                    class_av.mensaje('<b>'+id+'</b> será sustituida por <b>'+name+'</b>');
                                }
                            }
                        }
                    }
                },
            },
            onContentReady: function () {
                $("#palabra_clave_sel").select2({
                tags: true,
                allowClear: true,
                placeholder: "Selecciona o escribe una palabra clave",
                ajax: {
                  url: '/datos/vacio',
                  dataType: 'json',
                  delay: 1000,
                  data: (params) => {
                    return {
                      q: params.term,
                    }
                  },
                  processResults: (data, params) => {
                    var arr_busca = class_av.var.palabras_clave0;
                    if(idioma == 'eng'){
                        arr_busca = class_av.var.keywords0;
                    }
                    const results = class_utils.filter_prop_er(arr_busca,'valor',new RegExp("^" + params.term + ".*", "i")).map(item => {
                      return {
                        id: item.valor,
                        text: item.valor,
                        num: item.num
                      };
                    });
                    return {
                      results: results,
                    }
                  }
                },
                language: {
                            inputTooShort: function () {
                            return "";
                            }
                        },
                minimumInputLength: 2,
                templateResult: formatRepo,
                });
                
                function formatRepo (repo) {
                    if (repo.loading) {
                      return repo.text;
                    }
                    
                    var $container = $(
                        "<div class='select2-result-repository__title'>" + repo.text + ' <span class="badge">' + ((repo.num == undefined)?0:repo.num) + '</span></div>'
                    );

                    return $container;
                  };
                
                  /*
                  function formatRepoSelection (repo) {
                    return repo.valor;
                  }*/
                  
                  $('.jconfirm').css('z-index',0);
                
                // bind to events
                var jc = this;
                this.$content.find('form').on('submit', function (e) {
                    // if the user submits the form by pressing enter in the field.
                    e.preventDefault();
                    jc.$$formSubmit.trigger('click'); // reference the button and click it
                });
            }
        });
    },
    prompt_n: function(id, idioma, arr_sustituye){
        var agregar = 'Agregar palabra clave:';
        if(idioma == 'eng'){
            agregar = 'Agregar keyword:';
        }
        
        $.confirm({
            title: '',
            content: '' +
            '<form action="" class="formName">' +
            '<div class="form-group">' +
            agregar +
            '<br><select class="name form-control" name="palabra_clave_sel" id="palabra_clave_sel" style="width:100%" width="100%" required>' +
            '</select>' +
            '</div>' +
            '</form>',
            buttons: {
                cancelar: {
                    text: 'Cancelar',
                    //btnClass: 'btn-red',
                    action: function(){
                        //$('#'+id_s).html('');
                    }
                },
                formSubmit: {
                    text: 'Agregar',
                    btnClass: 'btn-warning',
                    action: function () {
                        var name = this.$content.find('.name').val();
                        name = name.trim();
                        var name_ant = '';
                        //var palabras = $('.esp.palabra_clave');
                        var duplicada = false;
                        var clase ='.esp.palabra_clave';
                        var var_palabras_clave = class_av.var.palabras_clave_n;
                        if(idioma == 'eng'){
                            clase ='.keyword.palabra_clave';
                            var_palabras_clave = class_av.var.keywords_n;
                        }
                                                
                        //Revisa si existe una palabra más apropiada
                        var sustituye = class_utils.find_prop(arr_sustituye, 'palabra', name);
                        if(sustituye !== undefined){
                            name_ant = name;
                            name = sustituye.palabra_adecuada;    
                        }
                        
                        $(clase).each(function() {
                            var palabra = $(this).html();
                            var palabra1 = palabra.split('<span')[0].trim();
                            var palabra2 = palabra.split('<br>');

                            if( palabra2[2] !== undefined){
                                palabra2 = palabra2[2].split('<span')[0].trim();
                            }
                            
                            if(palabra1 == name || palabra2 == name || var_palabras_clave.indexOf(name) !== -1){
                                duplicada = true;
                                return true;
                            }
                        });
                        
                        if(duplicada){
                            if(sustituye !== undefined){
                                class_av.mensaje('Se encontró una palabra que fue considerada más adecuada: <b>'+name+'</b><br><br>Esta palabra ya se encuentra en las opciones para seleccionar');
                            }else{
                                class_av.mensaje('La palabra ya se encuentra en las opciones para seleccionar');
                            }
                            return false;
                        }else if(name == ''){
                            $.alert('No es una palabra válida');
                            return false;
                        }else{
                            if(idioma == 'esp'){
                                class_av.var.palabras_clave_n.push(name);
                            }else{
                                class_av.var.keywords_n.push(name);
                            }
                            var html= '';
                            var cons_palabra_clave = class_av.cons.palabra_clave_n;
                            if(idioma == 'eng'){
                                cons_palabra_clave = class_av.cons.keyword_n;
                            }
                            $.each(var_palabras_clave, function(i, val){
                                var busca = class_utils.find_prop(class_av.var.palabras_clave0,'valor',val);
                                if(busca !== undefined){
                                    html += cons_palabra_clave.replaceAll('<palabra>', val).replaceAll('<num>', busca.num).replaceAll('<palabra-slug>', 'n-'+class_utils.slug(val));
                                }else{
                                    html += cons_palabra_clave.replaceAll('<palabra>', val).replaceAll('<num>', '0').replaceAll('<palabra-slug>', 'n-'+class_utils.slug(val));
                                }
                            });
                            
                            if(idioma == 'esp'){
                                var ids = [];
                                $('.new_p.badge-warning').each(function() {
                                    ids.push('#'+this.id);
                                });
                                $('#palabras_clave_n').html(html);
                                $('.esp.palabra_clave').off('click').on('click', function(){
                                    if( $(this).hasClass('badge-secondary') ){
                                        if(class_av.var.count_palabras_clave == 10){
                                            class_av.mensaje('El número máximo de palabras clave son 10');
                                        }else{
                                            $(this).removeClass('badge-secondary');
                                            $(this).addClass('badge-warning');
                                            $(this).css('background-color', '#ff8000');
                                            class_av.var.count_palabras_clave ++;
                                        }
                                    }else{
                                        $(this).removeClass('badge-warning');
                                        $(this).addClass('badge-secondary');
                                        $(this).css('background-color', '#F0F0F0');
                                        class_av.var.count_palabras_clave --;
                                    }
                                });
                                $.each(ids, function(i, val){
                                    $(val).removeClass('badge-secondary');
                                    $(val).addClass('badge-warning');
                                    $(val).css('background-color', '#ff8000');
                                });
                            }else{
                                var ids = [];
                                $('.new_k.badge-warning').each(function() {
                                    ids.push('#'+this.id);
                                });
                                $('#keywords_n').html(html);
                                $('.keyword.palabra_clave').off('click').on('click', function(){
                                    if( $(this).hasClass('badge-secondary') ){
                                        if(class_av.var.count_keywords == 10){
                                            class_av.mensaje('El número máximo de keywords son 10');
                                        }else{
                                            $(this).removeClass('badge-secondary');
                                            $(this).addClass('badge-warning');
                                            $(this).css('background-color', '#ff8000');
                                            class_av.var.count_keywords ++;
                                        }
                                    }else{
                                        $(this).removeClass('badge-warning');
                                        $(this).addClass('badge-secondary');
                                        $(this).css('background-color', '#F0F0F0');
                                        class_av.var.count_keywords --;
                                    }
                                });
                                $.each(ids, function(i, val){
                                    $(val).removeClass('badge-secondary');
                                    $(val).addClass('badge-warning');
                                    $(val).css('background-color', '#ff8000');
                                });
                            }
                            
                            if(sustituye !== undefined){
                                class_av.mensaje('Se encontró una palabra que fue considerada más adecuada:<br><br><b>'+name_ant+'</b> será sustituida por <b>' + name +'</b>');
                            }else{
                                class_av.mensaje('<b>'+ name +'</b> ha sido agregada correctamente');
                            }
                        }
                    }
                },
            },
            onContentReady: function () {
                $("#palabra_clave_sel").select2({
                tags: true,
                allowClear: true,
                placeholder: "Selecciona o escribe una palabra clave",
                ajax: {
                  url: '/datos/vacio',
                  dataType: 'json',
                  delay: 1000,
                  data: (params) => {
                    return {
                      q: params.term,
                    }
                  },
                  processResults: (data, params) => {
                    var arr_busca = class_av.var.palabras_clave0;
                    if(idioma == 'eng'){
                        arr_busca = class_av.var.keywords0;
                    }
                    const results = class_utils.filter_prop_er(arr_busca,'valor',new RegExp("^" + params.term + ".*", "i")).map(item => {
                      return {
                        id: item.valor,
                        text: item.valor,
                        num: item.num
                      };
                    });
                    return {
                      results: results,
                    }
                  }
                },
                language: {
                            inputTooShort: function () {
                            return "";
                            }
                        },
                minimumInputLength: 2,
                templateResult: formatRepo,
                });
                
                function formatRepo (repo) {
                    if (repo.loading) {
                      return repo.text;
                    }
                    
                    var $container = $(
                        "<div class='select2-result-repository__title'>" + repo.text + ' <span class="badge">' + ((repo.num == undefined)?0:repo.num) + '</span></div>'
                    );

                    return $container;
                  };
                
                  /*
                  function formatRepoSelection (repo) {
                    return repo.valor;
                  }*/
                  
                  $('.jconfirm').css('z-index',0);
                
                // bind to events
                var jc = this;
                this.$content.find('form').on('submit', function (e) {
                    // if the user submits the form by pressing enter in the field.
                    e.preventDefault();
                    jc.$$formSubmit.trigger('click'); // reference the button and click it
                });
            }
        });
    },
    revistas_asignadas: function(){
        loading.start();
        $.when(
                class_utils.getResource('/datos/revistas_articulo_by_nombre'),
                class_utils.getResource('/datos/revistas_by_nombre')
        ) 
        .then(function(resp1, resp2){
            var arr1 = [];
            if(resp1[0].length > 0){
                if(resp1[0][0].revistas !== null){
                    arr1 = JSON.parse(resp1[0][0].revistas);
                }
            }
            
            var arr2 = [];
            if(resp2[0].length > 0){
                if(resp2[0][0].revistas !== null){
                    arr2 = JSON.parse(resp2[0][0].revistas);
                }
            }
            
            class_av.var.revistasAsignadas = arr1.concat(arr2).sort();
            
            var options = "";
            
            options += class_av.cons.option.replace('<opcion>', "").replace("<valor>", "");
            $.each(class_av.var.revistasAsignadas, function(i, val){
                try{
                    options += class_av.cons.option.replace('<opcion>', val).replace("<valor>", val);
                } catch (error) {
                    console.log(error);
                }
            });

            $('#revista_sel').html(options);
            $('#revista_sel').select2({ tags: false, placeholder: "Seleccione una revista", allowClear: true});
            
            options = "";
            options += class_av.cons.option.replace('<opcion>', "").replace("<valor>", "");
            for(var anio_i=(new Date().getFullYear()); anio_i >= 1900; anio_i--){
                options += class_av.cons.option.replace('<opcion>', anio_i).replace("<valor>", anio_i);
            }
            
            $('#anio_rev').html(options);
            $('#anio_rev').select2({ tags: false, placeholder: "Seleccione un año", allowClear: true});
            
            class_av.control_na();
            class_av.var.count_titulos= 0;
            loading.end();
        });
    },
    revista_numeros: function(numeros){
        if(numeros !== ""){
            numeros = numeros.replace('{','').replace('}','').split(',');
            var options = "";
            options += class_av.cons.option.replace('<opcion>', "").replace("<valor>", "");
            $.each(numeros, function(i,val){
                options += class_av.cons.option.replace('<opcion>', val).replace("<valor>", val);
            });
            $('#sel_numero').html(options);
            $('#sel_numero').select2({ tags: true, placeholder: "Seleccione un número", allowClear: true});
            $('#sel_numero').prop('disabled', false);
            $('#sel_numero').on('change', function(){
                if($('#sel_numero').val()!==""){
                    $('#txt_vol').val('');
                    $('#txt_vol').prop('disabled', true);
                    $('#txt_num').val('');
                    $('#txt_num').prop('disabled', true);
                }else{
                    $('#txt_vol').prop('disabled', false);
                    $('#txt_num').prop('disabled', false);
                }
            });
        }else{
            options += class_av.cons.option.replace('<opcion>', "").replace("<valor>", "");
            $('#sel_numero').html(options);
            $('#sel_numero').select2({ tags: true, placeholder: "No existen números", allowClear: true});
            $('#sel_numero').prop('disabled', true);
            $('#txt_vol').val('');
            $('#txt_vol').prop('disabled', false);
            $('#txt_num').val('');
            $('#txt_num').prop('disabled', false);
        }
    },
    data_inserta_article: function(){
        var data = {};
        var data_int = [];
        var columns = ['revista', 'articulo', 'issn', 'paisRevista', 'anioRevista', 'disciplinaRevista', ];
        var revista_sel = $('#revista_sel').val().trim();
        var revista = revista_sel.split('#')[0].trim();
        var datosRevista = class_utils.filter_prop(class_av.var.revistasJSON, 0, revista);
        
       
            var obj = {};
            var objDes = {};
            
            obj['sistema'] = '';
            obj['usuario'] = 'sesion';
            obj['revista'] = revista;
            obj['articulo'] = $('#titulo_na').val().trim();
            obj['issn'] = (datosRevista.length !== 1)?null:datosRevista[0][5];
            obj['paisRevista'] = (datosRevista.length !== 1)?null:datosRevista[0][6];
            obj['ciudadEditora'] = (datosRevista.length !== 1)?null:datosRevista[0][7];
            obj['institucionEditora'] = (datosRevista.length !== 1)?null:datosRevista[0][8];
            obj['base'] = (datosRevista.length !== 1)?null:datosRevista[0][1];
            
            var anio = revista_sel.split('#')[1].trim();
            obj['anioRevista'] = anio;
            
            var descripcion = revista_sel.split('#')[2].trim();
            
            var v = descripcion.split('V')[1];
            if(v !== null && v !== undefined){
                v = v.split('N')[0];
                v = v.trim();
            }
            if(v == '' || v == 's/v'){
                v = null;
            }

            var n = descripcion.split('N')[1];
            if( n !== null && n !== undefined ){
                n = n.split(' ')[0];
                n = n.trim();
            }
            if(n == '' || n == 's/n'){
                n = null;
            }

            var m = descripcion.split(' Mes:')[1]
            if( m !== null && m !== undefined ){
                m = m.split(' Parte:')[0];
                m = m.trim();
            }
            if(m == '' ){
                m = null;
            }

            var p = descripcion.split(' Parte:')[1];
            if(p !== null && p !== undefined){
                p = p.trim();
            }
            if(p == '' ){
                p = null;
            }
            
            if(v !== null){
                objDes['a'] = 'V'+v;
            }
            if(n !== null){
                objDes['b'] = 'N'+n;
            }
            if(m !== null){
                objDes['c'] = m;
            }
            if(p !== null){
                objDes['d'] = p;
            }
            
            var p_ini = $('#de_p').val().trim();
            var p_fin = $('#a_p').val().trim();
            
            if(p_ini !== ''){
                p_ini = 'P' + p_ini;
            
                if(p_fin !== ''){
                    p_ini = p_ini + '-' + p_fin;
                }
                
                objDes['e'] = p_ini;
            }
            
            obj['descripcionBibliografica'] = JSON.stringify(objDes);
            obj['fechaIngreso'] = (new Date()).getFullYear()+'-'+(((new Date()).getMonth()+1)+'').padStart(2,'0')+'-'+((new Date()).getDate()+'').padStart(2,'0');
        
        data_int.push(obj);
        
        //Recorrido por si se agregaron más títulos
        var num = 1;
        var encontrados = 0;
        //var titulos = [];
        while( encontrados < class_av.var.count_titulos ){
            if($('#titulo_na-'+num)[0] !== undefined){
                //titulos.push( $('#titulo_na-'+num).val());
                var obj2 = {};
                obj2['sistema'] = obj['sistema'];
                obj2['usuario'] = obj['usuario'];
                obj2['revista'] = obj['revista'];
                obj2['articulo'] = $('#titulo_na-'+num).val().trim();
                obj2['issn'] = obj['issn'];
                obj2['paisRevista'] = obj['paisRevista'];
                obj2['ciudadEditora'] = obj['ciudadEditora'];
                obj2['institucionEditora'] = obj['institucionEditora'];
                obj2['anioRevista'] = obj['anioRevista'];
                obj2['base'] = obj['base'];
                obj2['fechaIngreso'] = obj['fechaIngreso'];
                
                var p_ini = $('#de_na-'+num).val().trim();
                var p_fin = $('#a_na-'+num).val().trim();

                if(p_ini !== ''){
                    p_ini = 'P' + p_ini;

                    if(p_fin !== ''){
                        p_ini = p_ini + '-' + p_fin;
                    }
                    var num_des = obj['descripcionBibliografica'].indexOf(':"P');
                    obj2['descripcionBibliografica'] = obj['descripcionBibliografica'].substring(0, num_des+2) + p_ini + '"}';
                }else{
                    obj2['descripcionBibliografica'] = obj['descripcionBibliografica'];
                }
                data_int.push(obj2);
                encontrados++;
            }
            num++;
        }
        
        data['tabla'] = 'article';
        data['where'] = columns;
        data['data'] = data_int;
        return data;
    },
    revisa: function(campos){
        var error = false;
        
        $.each(campos, function(i, val){
            var texto = $(val.e).val();
            if( texto == undefined || texto == null ){
                error = val.c;
                return false;
            }else{
                if(typeof(texto) !== 'object'){
                    texto = texto.trim();
                    if(texto == ''){
                        error = val.c;
                        return false;
                    }
                }
            }
        });
        
        return error;
    },
    control_guarda:function(){
        $('#save-article').off('click').on('click', function(){
            
            var campos = [
                            {e:'#idiomaDocumento', c:'Idioma(s) del documento'},
                            {e:'#tipo_documento', c:'Tipo de documento'},
                            {e:'#titulo', c:'Título'},
                            {e:'#disciplina1', c:'Disciplina'}
                        ];
            
            var revisa = class_av.revisa(campos);
            
            if(typeof(revisa) == 'string'){
                class_av.mensaje('Falta: <b>'+revisa+'</b>');
                return false;
            }
            
            var texto = 'Se guardarán los cambios realizados a los metadatos del Artículo';
            var envio = true;
            
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
                                if(envio){
                                    envio = false;
                                    class_av.var.cambios_documento = false;
                                    $.ajax({
                                            type: 'POST',
                                            url: "<?=site_url('metametrics/ws_update_article');?>",
                                            data: class_av.data_update_article(),
                                    }).done(function() {
                                            class_av.mensaje('Artículo guardado correctamente.');
                                            class_av.cambio_estatus(class_av.var.sistema, 'R');
                                    }).fail(function(){
                                            class_av.mensaje('Ocurrió un error al intentar guardar el Artículo');
                                    });
                                }
                            }
                    }
                }
            });
        });
        
        $('#save-full').off('click').on('click', function(){
            
            if(class_av.cambios_sin_guardar()){
                return true;
            }else{
                
                var revisa = false;
                $.each(class_av.var.institucionesJSON, function(i, val){
                    var busca = class_utils.filter_prop(class_av.var.autoresJSON, 'institucionId', val.id);
                    if(busca.length == 0){
                        revisa = true;
                        class_av.mensaje('Existen <b>Instituciones</b> sin relación con algún <b>Autor</b><br>Indique la relación o elimínelas');
                        return false;
                    }
                });
                
                if(revisa){
                    return true;
                }
                
                var texto = 'Se marcará el registro como <b>Completado</b>';
                var envio = true;
                
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
                                    if(envio){
                                        envio = false;
                                        $(this).prop('disabled', true);
                                        loading.start();
                                        var data = {};
                                        data['tabla'] = 'article';
                                        data['where'] = ['sistema'];
                                        data['data'] = [{estatus: "C", sistema:class_av.var.sistema}];
                                        $.ajax({
                                                type: 'POST',
                                                url: "<?=site_url('metametrics/ws_update_estatus');?>",
                                                data: data,
                                        }).done(function(resp) {
                                            if(resp.resp == 'success'){
                                                class_av.cambio_estatus(class_av.var.sistema, 'C');
                                                $('.'+class_av.var.sistema).removeClass('sistema');
                                                $('.'+class_av.var.sistema).addClass('cerrado');
                                                $('.'+class_av.var.sistema).css('cursor','');
                                                $('.'+class_av.var.sistema).css('color','');
                                                $('#accordion').hide();
                                                $('#save-no-indizable').hide();
                                                $('#save-full').hide();
                                                $('#save-article').hide();
                                                $('#save-instituciones').hide();
                                                $('#save-autores').hide();
                                                loading.end();
                                                class_av.mensaje('Artículo completado correctamente.');
                                                window.location.href="#div_tabla";
                                            }else{
                                                class_av.mensaje('Ocurrió un error, intente completar nuevamente');
                                            }
                                        }).fail(function(){
                                            class_av.mensaje('Ocurrió un error, intente completar nuevamente');
                                        });
                                    }
                                }
                        }
                    }
                });
            }
        });
        
        $('#save-instituciones').off('click').on('click', function(){
            
            var concluye = function(){
                var texto = 'Se guardarán los cambios realizados a los metadatos de Instituciones';
                var envio = true;

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
                                    if(envio){
                                        envio = false;
                                        class_av.var.cambios_institucion = false;
                                        $.ajax({
                                                type: 'POST',
                                                url: "<?=site_url('metametrics/ws_insert_instituciones');?>",
                                                data: JSON.stringify(instituciones.data),
                                                contentType: 'application/json'
                                        }).done(function() {
                                                class_av.cambio_estatus(class_av.var.sistema, 'R');
                                                class_av.data_update_autores();
                                                class_av.reset_autores();
                                                class_av.mensaje('Instituciones guardadas correctamente.');
                                        }).fail(function(){
                                            class_av.mensaje('Ocurrió un error al intentar guardar Instituciones');
                                        });
                                    }
                                }
                        }
                    }
                });
            };
            
            var instituciones = class_av.data_update_instituciones();
            
            if( typeof(instituciones) == 'string' ){
                class_av.mensaje(instituciones);
                return false;
            }else{
                if(instituciones.confirma !== ''){
                    $.confirm({
                        title: '',
                        content: instituciones.confirma,
                        buttons: {
                            cancelar: {
                                    text: 'Revisar',
                                    //btnClass: 'btn-red',
                                    action: function(){

                                    }
                            },
                            aceptar: {
                                    text: 'Confirmar',
                                    btnClass: 'btn-warning',
                                    action: function(){
                                        concluye();
                                    }
                            }
                        }
                    });
                }else{
                    concluye();
                }
            }
            
        });
        
        $('#save-autores').off('click').on('click', function(){
            
            var concluye = function(){
                var texto = 'Se guardaran los cambios realizados a los metadatos de Autores';
                var envio = true;

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
                                    if(envio){
                                        envio = false;
                                        class_av.var.cambios_autor = false;
                                        $.ajax({
                                                type: 'POST',
                                                url: "<?=site_url('metametrics/ws_insert_autores');?>",
                                                data: JSON.stringify(autores.data),
                                                contentType: 'application/json'
                                        }).done(function() {
                                                class_av.cambio_estatus(class_av.var.sistema, 'R');
                                                class_av.mensaje('Autores guardados correctamente.');
                                        }).fail(function(){
                                            class_av.mensaje('Ocurrió un error al intentar guardar Autores');
                                        });
                                    }
                                }
                        }
                    }
                });
            };
            
            var autores = class_av.data_update_autores(true);
            
            if( typeof(autores) == 'string' ){
                class_av.mensaje(autores);
                return false;
            }else{
                if(autores.confirma !== ''){
                    $.confirm({
                        title: '',
                        content: autores.confirma,
                        buttons: {
                            cancelar: {
                                    text: 'Revisar',
                                    //btnClass: 'btn-red',
                                    action: function(){

                                    }
                            },
                            aceptar: {
                                    text: 'Confirmar',
                                    btnClass: 'btn-warning',
                                    action: function(){
                                        concluye();
                                    }
                            }
                        }
                    });
                }else{
                    concluye();
                }
            }
            
        });
        
        $('#save-no-indizable').off('click').on('click', function(){
            
            if(class_av.cambios_sin_guardar()){
                return true;
            }else{
            
                var texto = 'Se marcará el registro como <b>No Indizable</b>';
                var envio = true;

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
                                    if(envio){
                                        envio = false;
                                        var data = {};
                                        data['tabla'] = 'article';
                                        data['where'] = ['sistema'];
                                        data['data'] = [{estatus: "B", sistema:class_av.var.sistema}];
                                        $.ajax({
                                                type: 'POST',
                                                url: "<?=site_url('metametrics/ws_update_estatus');?>",
                                                data: data,
                                        }).done(function(resp) {
                                                if(resp.resp == 'session'){
                                                    class_av.mensaje('Su sesión expiró, es necesario iniciar nuevamente.', function(){window.location.reload();});
                                                }else{
                                                    class_av.cambio_estatus(class_av.var.sistema, 'B');
                                                    $('.'+class_av.var.sistema).removeClass('sistema');
                                                    $('.'+class_av.var.sistema).addClass('cerrado');
                                                    $('.'+class_av.var.sistema).css('cursor','');
                                                    $('.'+class_av.var.sistema).css('color','');
                                                    $('#accordion').hide();
                                                    window.location.href="#div_tabla";
                                                }
                                        });
                                    }
                                }
                        }
                    }
                });
            }
        });
    },
    agrega_nuevo_articulo: function(){
        if(class_av.var.count_titulos > 0){
            var texto = 'Se guardarán los datos para los nuevos artículos';
            var textoFin = 'Artículos nuevos guardados correctamente.';
        }else{
            var texto = 'Se guardarán los datos para el nuevo artículo';
            var textoFin = 'Artículo nuevo guardado correctamente.';
        }
            
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
                            $.ajax({
                                    type: 'POST',
                                    url: "<?=site_url('metametrics/ws_insert_new_article');?>",
                                    data: class_av.data_inserta_article(),
                            }).done(function() {
                                    class_av.mensaje(textoFin, function(){
                                         window.location.reload();
                                    });
                            }).fail(function(){
                                class_av.mensaje('Ocurrió un error al intentar guardar.');
                            });
                        }
                }
            }
        });
    },
    filtro: function(){
        $(".li-filtro").off('click').on('click', function(){
            $('#btn-filtro').html($(this).html() + ' :');
            var id_filtro1 = this.id;
            var sel = class_utils.unique(class_av.var.articulosJSON, this.id).sort();
            var lis = '';
            $.each(sel, function(i,val){
                var valor = val;
               if(id_filtro1 == 'estatus'){
                   valor = class_av.cons.estatus[val];
               }
               lis += class_av.var.li.replace('<id>', val).replace('<val>', valor);
            });
            $("#ul-filtro").html(lis);
            $('#btn-filtro2').html("Seleccione");
            $(".li-filtro2").off('click').on('click', function(){
                $('#btn-filtro2').html($(this).html());
                var filtro = class_utils.filter_prop(class_av.var.articulosJSON, id_filtro1, this.id);
                class_av.setTabla(filtro);
                $('#remove').show();
            });
        });
        $("#remove").off('click').on('click', function(){
            $('#remove').hide();
            $('#btn-filtro').html("Filtrar por :");
            $('#btn-filtro2').html("Seleccione");
            $("#ul-filtro").html("");
            class_av.setTabla(class_av.var.articulosJSON);
        });
    },
    palabras_clave: function(){
        //loading.start();
        $('#div_palabras_clave_texto, #div_cargando_pc').show();
        var url ='';
        if( ($('#url1').val() !== '' && $("#tipourl1").val() == 'pdf') ){
            url = $('#url1').val();
        }else if( $('#url2').val() !== '' && $("#tipourl2").val() == 'pdf' ){
            url = $('#url2').val();
        }
        $.when(
                class_utils.setResource(class_av.var.servidor + class_av.var.app + '/ia_metadata/', {url: url}, true),
                class_utils.getResource('/datos/palabras', true),
                class_utils.getResource('/datos/keywords', true),
                class_utils.getResource('/datos/palabras_sustituye', true),

            ) 
            .then(function(resp_pdf, resp_palabras, resp_keywords, resp_sustituye){
                resp_palabras = resp_palabras[0];
                resp_keywords = resp_keywords[0];
                resp_sustituye = resp_sustituye[0];
                resp_pdf = resp_pdf[0];

                class_av.var.palabras_clave0 = resp_palabras;
                class_av.var.palabras_clave = class_av.cons.option_badge.replace('<valor>', '').replace('<opcion>', '').replace('<num>', '');
                $.each(resp_palabras, function(i, val){
                    class_av.var.palabras_clave += class_av.cons.option_badge.replace('<valor>', val.valor).replace('<opcion>', val.valor).replace('<num>', val.num);
                });

                class_av.var.keywords0 = resp_keywords;
                class_av.var.keywords = class_av.cons.option_badge.replace('<valor>', '').replace('<opcion>', '').replace('<num>', '');
                $.each(resp_keywords, function(i, val){
                    class_av.var.keywords += class_av.cons.option_badge.replace('<valor>', val.valor).replace('<opcion>', val.valor).replace('<num>', val.num);
                });

                if( resp_pdf.disciplinas !== undefined){
                    if( resp_pdf.disciplinas[0] !== undefined && $('#disciplina1').val() == '' ){
                        $('#disciplina1').val(resp_pdf.disciplinas[0]);
                        $('#disciplina1').change();
                    }
                    if( resp_pdf.disciplinas[1] !== undefined && $('#disciplina2').val() == ''){
                        $('#disciplina2').val(resp_pdf.disciplinas[1]);
                        $('#disciplina2').change();
                    }
                    if( resp_pdf.disciplinas[2] !== undefined && $('#disciplina3').val() == ''){
                        $('#disciplina3').val(resp_pdf.disciplinas[2]);
                        $('#disciplina3').change();
                    }
                }

                if( resp_pdf.idioma !== undefined ){
                    $('#idioma').val(resp_pdf.idioma);
                    $('#idioma').change();
                }

                var palabras_doc = [];
                var agrega = [];
                var revisa_palabras = [];

                if (class_av.var.documentoJSON[0].palabraClave !== undefined && class_av.var.documentoJSON[0].palabraClave !== null && class_av.var.documentoJSON[0].palabraClave !== ''){
                    palabras_doc = JSON.parse(class_av.var.documentoJSON[0].palabraClave);
                    revisa_palabras = JSON.parse(class_av.var.documentoJSON[0].palabraClave);
                    $('#div_palabras_clave_texto').show();
                    $('#div_palabras_clave_autor').show();
                    var html = '';
                    $.each(palabras_doc, function(i, val){
                        var busca = class_utils.find_prop(resp_palabras,'valor',val);
                        //busca si existe en las palabras para cambiar o si ya es una de las adecuadas
                        var adecuada = class_utils.find_prop(resp_sustituye,'palabra',val);
                        var adecuada_bloqueada = class_utils.find_prop(resp_sustituye,'palabra_adecuada',val);
                        var cons_palabra_clave = class_av.cons.palabra_clave;
                        
                        //En cualquiera de los dos casos se bloquea
                        if(adecuada !== undefined){
                            agrega.push(adecuada.palabra_adecuada);
                            agrega.push(adecuada.palabra);
                            val = adecuada.palabra_adecuada;
                            palabras_doc[i] = val;
                            cons_palabra_clave = cons_palabra_clave.replaceAll('fa-pencil', 'fa-lock');
                        }
                        if(adecuada_bloqueada !== undefined){
                            agrega.push(adecuada_bloqueada.palabra_adecuada);
                            agrega.push(adecuada_bloqueada.palabra);
                            val = adecuada_bloqueada.palabra_adecuada;
                            palabras_doc[i] = val;
                            cons_palabra_clave = cons_palabra_clave.replaceAll('fa-pencil', 'fa-lock');
                        }
                        if(busca !== undefined){
                            html += cons_palabra_clave.replaceAll('<palabra>', val).replaceAll('<num>', busca.num).replaceAll('<palabra-slug>', 'a-'+class_utils.slug(val));
                        }else{
                            html += cons_palabra_clave.replaceAll('<palabra>', val).replaceAll('<num>', '0').replaceAll('<palabra-slug>', 'a-'+class_utils.slug(val));
                        }
                    });
                    $('#palabras_clave_autores').html(html);
                }
                palabras_doc = palabras_doc.concat(agrega);

                $('#div_palabras_clave').show();
                var palabras_pdf=[];
                agrega = [];
                resp_pdf.palabras = [...new Set(resp_pdf.palabras)];
                
                if( resp_pdf.palabras !== undefined && resp_pdf.palabras !== "Sin resultado"){
                    $.each(resp_pdf.palabras, function(i, val){
                        var busca = palabras_doc.indexOf(val);
                        if( busca == -1 ){
                            palabras_pdf.push(val);
                        }
                    });

                    html = '';
                    $.each(palabras_pdf, function(i, val){
                        var busca = class_utils.find_prop(resp_palabras,'valor',val);
                        //busca si existe en las palabras para cambiar o si ya es una de las adecuadas
                        var adecuada = class_utils.find_prop(resp_sustituye,'palabra',val);
                        var adecuada_bloqueada = class_utils.find_prop(resp_sustituye,'palabra_adecuada',val);
                        var cons_palabra_clave = class_av.cons.palabra_clave;
                        
                        //En cualquiera de los dos casos se bloquea
                        if(adecuada !== undefined){
                            agrega.push(adecuada.palabra_adecuada);
                            agrega.push(adecuada.palabra);
                            val = adecuada.palabra_adecuada;
                            palabras_pdf[i] = val;
                            cons_palabra_clave = cons_palabra_clave.replaceAll('fa-pencil', 'fa-lock');
                        }
                        if(adecuada_bloqueada !== undefined){
                            agrega.push(adecuada.palabra_adecuada);
                            agrega.push(adecuada.palabra);
                            val = adecuada_bloqueada.palabra_adecuada;
                            palabras_doc[i] = val;
                            cons_palabra_clave = cons_palabra_clave.replaceAll('fa-pencil', 'fa-lock');
                        }
                        if(busca !== undefined){
                            html += cons_palabra_clave.replaceAll('<palabra>', val).replaceAll('<palabra-slug>', 't-'+class_utils.slug(val)).replaceAll('<num>', busca.num);
                        }else{
                            html += cons_palabra_clave.replaceAll('<palabra>', val).replaceAll('<palabra-slug>', 't-'+class_utils.slug(val)).replaceAll('<num>', '0');
                        }
                    });

                    //$('#palabras_clave').html(resp_pdf.palabras.join("; "));
                    $('#palabras_clave').html(html);
                }
                palabras_pdf = palabras_pdf.concat(agrega);
                
                resp_pdf.palabras_b = [...new Set(resp_pdf.palabras_b)];
                
                if( resp_pdf.palabras_b !== undefined && resp_pdf.palabras_b !== "Sin resultado"){
                    $('#div_palabras_clave2').show();
                    var palabrasb_pdf=[];
                    
                    $.each(resp_pdf.palabras_b, function(i, val){
                        var busca = palabras_doc.indexOf(val);
                        var busca2 = palabras_pdf.indexOf(val);
                        if( busca == -1 && busca2 == -1 ){
                            palabrasb_pdf.push(val);
                        }
                    });

                    html = '';
                    $.each(palabrasb_pdf, function(i, val){
                        var busca = class_utils.find_prop(resp_palabras,'valor',val);
                        //busca si existe en las palabras para cambiar o si ya es una de las adecuadas
                        var adecuada = class_utils.find_prop(resp_sustituye,'palabra',val);
                        var adecuada_bloqueada = class_utils.find_prop(resp_sustituye,'palabra_adecuada',val);
                        var cons_palabra_clave = class_av.cons.palabra_clave;
                        
                        //En cualquiera de los dos casos se bloquea
                        if(adecuada !== undefined){
                            val = adecuada.palabra_adecuada;
                            cons_palabra_clave = cons_palabra_clave.replaceAll('fa-pencil', 'fa-lock');
                        }
                        if(adecuada_bloqueada !== undefined){
                            val = adecuada_bloqueada.palabra_adecuada;
                            cons_palabra_clave = cons_palabra_clave.replaceAll('fa-pencil', 'fa-lock');
                        }
                        if(busca !== undefined){
                            html += cons_palabra_clave.replaceAll('<palabra>', val).replaceAll('<palabra-slug>', 't-'+class_utils.slug(val)).replaceAll('<num>', busca.num);
                        }else{
                            html += cons_palabra_clave.replaceAll('<palabra>', val).replaceAll('<palabra-slug>', 't-'+class_utils.slug(val)).replaceAll('<num>', '0');
                        }
                    });
                    //$('#palabras_clave2').html(resp_pdf.palabras_b.join("; "));
                    $('#palabras_clave2').html(html);
                }

                //Sin repetidos
                resp_pdf.keywords = [...new Set(resp_pdf.keywords)];

                if( (resp_pdf.keywords !== undefined && resp_pdf.keywords !== "Sin resultado") || 
                    (class_av.var.documentoJSON[0].keyword !== undefined && class_av.var.documentoJSON[0].keyword !== null && class_av.var.documentoJSON[0].keyword !== '')
                        ){
                    $('#div_keywords').show();
                    var palabrasb_pdf=[];
                    agrega = [];
                    
                    if((resp_pdf.keywords !== undefined && resp_pdf.keywords !== "Sin resultado")){
                        $.each(resp_pdf.keywords, function(i, val){
                            if( palabrasb_pdf.indexOf(val) == -1 ){
                                palabrasb_pdf.push(val);
                            }
                        });
                    }
                    
                    if((class_av.var.documentoJSON[0].keyword !== undefined && class_av.var.documentoJSON[0].keyword !== null && class_av.var.documentoJSON[0].keyword !== '')){
                        $.each(JSON.parse(class_av.var.documentoJSON[0].keyword), function(i, val){
                            if( palabrasb_pdf.indexOf(val) == -1 ){
                                palabrasb_pdf.push(val);
                            }
                        });
                    }

                    html = '';
                    $.each(palabrasb_pdf, function(i, val){
                        var busca = class_utils.find_prop(resp_keywords,'valor',val);
                        var adecuada = class_utils.find_prop(resp_sustituye,'palabra',val);
                        var adecuada_bloqueada = class_utils.find_prop(resp_sustituye,'palabra_adecuada',val);
                        var cons_keyword = class_av.cons.keyword;
                        
                        //En cualquiera de los dos casos se bloquea
                        if(adecuada !== undefined){
                            agrega.push(adecuada.palabra_adecuada);
                            agrega.push(adecuada.palabra);
                            val = adecuada.palabra_adecuada;
                            palabras_doc[i] = val;
                            cons_keyword = cons_keyword.replaceAll('fa-pencil', 'fa-lock');
                        }
                        if(adecuada_bloqueada !== undefined){
                            agrega.push(adecuada_bloqueada.palabra_adecuada);
                            agrega.push(adecuada_bloqueada.palabra);
                            val = adecuada_bloqueada.palabra_adecuada;
                            palabras_doc[i] = val;
                            cons_keyword = cons_keyword.replaceAll('fa-pencil', 'fa-lock');
                        }
                        
                        
                        if(busca !== undefined){
                            html += cons_keyword.replaceAll('<palabra>', val).replaceAll('<palabra-slug>', 'k-'+class_utils.slug(val)).replaceAll('<num>', busca.num);
                        }else{
                            html += cons_keyword.replaceAll('<palabra>', val).replaceAll('<palabra-slug>', 'k-'+class_utils.slug(val)).replaceAll('<num>', '0');
                        }
                    });
                    //$('#palabras_clave2').html(resp_pdf.palabras_b.join("; "));
                    $('#keywords').html(html);
                }

                    $('.esp.palabra_clave').off('click').on('click', function(){
                        if( $(this).hasClass('badge-secondary') ){
                            if(class_av.var.count_palabras_clave == 10){
                                class_av.mensaje('El número máximo de palabras clave son 10');
                            }else{
                                $(this).removeClass('badge-secondary');
                                $(this).addClass('badge-warning');
                                $(this).css('background-color', '#ff8000');
                                class_av.var.count_palabras_clave ++;
                            }
                        }else{
                            $(this).removeClass('badge-warning');
                            $(this).addClass('badge-secondary');
                            $(this).css('background-color', '#F0F0F0');
                            class_av.var.count_palabras_clave --;
                        }
                    });
                    
                    $('.keyword.palabra_clave').off('click').on('click', function(){
                        if( $(this).hasClass('badge-secondary') ){
                            if(class_av.var.count_keywords == 10){
                                class_av.mensaje('El número máximo de keywords son 10');
                            }else{
                                $(this).removeClass('badge-secondary');
                                $(this).addClass('badge-warning');
                                $(this).css('background-color', '#ff8000');
                                class_av.var.count_keywords ++;
                            }
                        }else{
                            $(this).removeClass('badge-warning');
                            $(this).addClass('badge-secondary');
                            $(this).css('background-color', '#F0F0F0');
                            class_av.var.count_keywords --;
                        }
                    });

                    $('.fa-pencil.edita_palabra').off('click').on('click', function(){
                       class_av.prompt(this.id, 'esp', resp_sustituye);
                    });
                    $('.fa-pencil.edita_keyword').off('click').on('click', function(){
                       class_av.prompt(this.id, 'eng', resp_sustituye);
                    });
                    $('#add-palabra').off('click').on('click', function(){
                       class_av.prompt_n(this.id, 'esp', resp_sustituye);
                    });
                    $('#add-keyword').off('click').on('click', function(){
                       class_av.prompt_n(this.id, 'eng', resp_sustituye);
                    });
                    
                    $('.fa-lock.edita_palabra').off('click');

                if( resp_pdf.titulo !== undefined ){
                    $('#titulo').val(resp_pdf.titulo);
                    $('#titulo').prop("disabled", true);
                        tiempo = setTimeout(function() {
                            class_av.texto_idioma($('#titulo').val(), $('#idioma').val(), '#check-idioma', '#idioma');
                            class_av.busca_en_pdf(url, $('#titulo').val(), '#check-titulo', '#titulo');
                            //class_av.busca_en_pdf(class_av.var.texto_pdf, $('#titulo').val(), '#check-titulo', '#titulo');
                        }, 1000);
                }
                
                $.each(revisa_palabras, function(i,val){
                    if( $('#a-'+class_utils.slug(val)).length ){
                        $('#a-'+class_utils.slug(val)).removeClass('badge-secondary');
                        $('#a-'+class_utils.slug(val)).addClass('badge-warning');
                        $('#a-'+class_utils.slug(val)).css('background-color', '#ff8000');
                        class_av.var.count_palabras_clave ++;
                    }
                    else if( $('#t-'+class_utils.slug(val)).length ){
                        $('#t-'+class_utils.slug(val)).removeClass('badge-secondary');
                        $('#t-'+class_utils.slug(val)).addClass('badge-warning');
                        $('#t-'+class_utils.slug(val)).css('background-color', '#ff8000');
                        class_av.var.count_palabras_clave ++;
                    }
                });
                
                if (class_av.var.documentoJSON[0].keyword !== undefined && class_av.var.documentoJSON[0].keyword !== null && class_av.var.documentoJSON[0].keyword !== ''){
                    $.each(JSON.parse(class_av.var.documentoJSON[0].keyword), function(i,val){
                        if( $('#k-'+class_utils.slug(val)).length ){
                            $('#k-'+class_utils.slug(val)).removeClass('badge-secondary');
                            $('#k-'+class_utils.slug(val)).addClass('badge-warning');
                            $('#k-'+class_utils.slug(val)).css('background-color', '#ff8000');
                            class_av.var.count_keywords ++;
                        }
                    });
                }
                
                $.each(['#div_palabras_clave_autor', '#div_palabras_clave', '#div_palabras_clave2', '#div_palabras_clave_n', '#div_keywords_n', '#div_keywords', '#add-palabra', '#add-keyword'], function(i,val){
                    $(val).show();
                });
                $('#div_cargando_pc').hide();
                //loading.end();
            });
    }
};

$(class_av.ready);



