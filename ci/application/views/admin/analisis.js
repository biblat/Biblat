// cambios 70,71, 2396, 2398, 3136, 4959
class_av = {
    cons: {
        DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
        option: '<option value="<valor>"><opcion></option>',
        option_badge: '<option value="<valor>"><opcion> i-badge<num>f-badge</option>',
        //caracteres: /!|#|\$|%|&|\(|\/|\\|\)|=|\?|¿|¡|,|;|:|_|\[|{|}|]|\+|\*|\~|<|>|\'|\"|’/g
        caracteres: /[^a-zA-Z0-9 ]/g,
		//char_i: /\(|\)|,|`|;|:|=|#|\/|\.|@|\[|\]|\|«|»|\*|'/g,
        char_i : /[()`,;:=#\/.@[\]|«»*']/g,
        cargando: '<i id="check-titulo-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>',
        estatus:{
            A: 'Sin movimiento',
            R: 'En revisión',
            C: 'Completado',
            B: 'No indizable',
			D: 'Corrección',
            APC: 'Sin movimiento PC',
            RPC: 'En revisión PC',
            CPC: 'Completado PC',
        },
		estatusPC:{
            A: 'Sin movimiento PC',
            R: 'En revisión PC',
            C: 'Completado PC',
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
        meses:{
            '1': 'Enero',
            '2': 'Febrero',
            '3': 'Marzo',
            '4': 'Abril',
            '5': 'Mayo',
            '6': 'Junio',
            '7': 'Julio',
            '8': 'Agosto',
            '9': 'Septiembre',
            '10': 'Octubre',
            '11': 'Noviembre',
            '12': 'Diciembre',
        },
        palabra_clave: '<div class="pc-chip-item"><button id="<palabra-slug>" class="btn badge-secondary esp palabra_clave pc-chip" type="button">'+
                        '<span class="pc-chip-text"><palabra></span><span class="badge"><num></span>'+
                        '<div id="<palabra-slug>-sustituye"></div>'+
                        '</button><i id="e-<palabra>-<palabra-slug>" class="fa fa-pencil edita_palabra" aria-hidden="true"></i></div>',
        palabra_clave_n: '<div class="pc-chip-item"><button id="<palabra-slug>" class="btn new_p badge-secondary esp palabra_clave pc-chip" type="button">'+
                        '<span class="pc-chip-text"><palabra></span><span class="badge"><num></span>'+
                        '<div id="<palabra-slug>-sustituye"></div>'+
                        '</button></div>',
        keyword: '<div class="pc-chip-item"><button id="<palabra-slug>" class="btn badge-secondary keyword palabra_clave pc-chip" type="button">'+
                        '<span class="pc-chip-text"><palabra></span><span class="badge"><num></span>'+
                        '<div id="<palabra-slug>-sustituye"></div>'+
                        '</button><i id="e-<palabra>-<palabra-slug>" class="fa fa-pencil edita_keyword" aria-hidden="true"></i></div>',
        keyword_n: '<div class="pc-chip-item"><button id="<palabra-slug>" class="btn new_k badge-secondary keyword palabra_clave pc-chip" type="button">'+
                        '<span class="pc-chip-text"><palabra></span><span class="badge"><num></span>'+
                        '<div id="<palabra-slug>-sustituye"></div>'+
                        '</button></div>',
        palabra_clave_sustituye: '<br><center><i class="fa fa-arrow-down" aria-hidden="true"></i><center><br><palabra> <span class="badge"><num></span>'
    },   
    var: {
        //servidor: 'http://localhost:5000',
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
        palabras_clave0: null,
        palabras_clave_n: [],
		palabras_sustituye: [],
        keywords: [],
        keywords0: null,
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
        tiempo_analisis: 0,
        tiempo_inactividad: 0,
        recargando: false,
        solo_lectura: false,
        fechaActual: (new Date()).getFullYear() + '-' + ('0' + ((new Date()).getMonth() + 1)).slice(-2) + '-' + ('0' + (new Date()).getDate()).slice(-2),
        institucion_anterior: '',
        institucion_cambio: '',
        institucion_diccionario: {},
        // Cache del indicador IA para no consultar dos veces el mismo sistema al paginar.
        ia_status_cache: {},
        ia_status_pendientes: {},
		selectedData: '',
        tabla: '<table id="tbl_articulos" class="display responsive nowrap" style="width:100%;font-size:11px">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th rowspan="1" style="max-width:150px">Revista</th>' +
                                    '<th rowspan="1" style="max-width:60px">ISSN</th>' +
                                    '<th rowspan="1" style="max-width:60px">Número</th>' +
                                    '<th rowspan="1" >Artículo</th>' +
                                    '<th rowspan="1" style="max-width:60px">Url 1</th>' +
                                    '<th rowspan="1" style="max-width:60px">Url 2</th>' +
                                    '<th rowspan="1" style="max-width:60px">Fecha<br>asignado</th>' +
                                    '<th rowspan="1" style="max-width:60px">Fecha<br>completado</th>' +
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
            <td><fecha_c></td>\n\
            <td><span id="estatus-<id_estatus>" style="background-color:<color>" class="badge"><estatus></span><span class="ia-status-slot" data-sistema="<sistema_ia>"></span><span class="consulta-status-slot" data-sistema="<sistema_consulta>"><consulta></span></td>',
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
                                    <div id="div-valor-anterior-<id>" style="font-size:12px; display: none; "> \n\
                                        <span><b>Corrección en registros anteriores:</b></span> <span id="valor-anterior-<id>"></span>\n\
                                    </div> \n\
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

    /*
     * Tooltips seguros.
     *
     * La pantalla recrea muchos Select2 dinámicamente. Inicializar el plugin
     * tooltip sobre todos los .select2-container deja instancias asociadas a
     * elementos ocultos o sustituidos y algunas terminan calculando su posición
     * desde (0,0), por eso aparecían en la esquina inferior izquierda.
     *
     * Para estos controles conservamos únicamente el atributo title nativo del
     * navegador. Antes se destruye cualquier instancia jQuery UI/Bootstrap que
     * hubiera quedado asociada al elemento y se eliminan tooltips huérfanos.
     */
    tooltip_seguro: function(selector) {
        var $els = $(selector);
        if(!$els.length){
            return;
        }

        $els.each(function(){
            var $el = $(this);
            var titulo = $el.attr('title') || $el.data('ui-tooltip-title') || '';

            try{
                if($el.data('ui-tooltip')){
                    $el.tooltip('destroy');
                }
            }catch(e){}

            try{
                if($el.data('bs.tooltip')){
                    $el.tooltip('destroy');
                }
            }catch(e){}

            $el.removeAttr('aria-describedby');
            if(titulo){
                $el.attr('title', titulo);
            }
        });

        // Limpia globos que hayan quedado ligados a un elemento Select2 ya reemplazado.
        $('.ui-tooltip[role="tooltip"], body > .tooltip[role="tooltip"]').remove();
    },

    initClient: function() {
        $.when(class_utils.getResource('/datos/articulos/'),
        class_utils.getResource('/datos/tabla_by_user/usuario_institution_dic')
        ) 
        .then(function(resp_articulos, resp_institucion_dict){
			
			/*Trae catálogos de palabras clave*/
            if( cons.pal_cla.val == '1'){
                $.when(
                    class_utils.getResource('/datos/palabras'),
                    class_utils.getResource('/datos/keywords')
                ) 
                .then(function(resp_palabras, resp_keywords){
                    class_av.var.palabras_clave0 = resp_palabras[0];
                    class_av.var.keywords0 = resp_keywords[0];
                });
            }
			
            class_av.var.articulosJSON = resp_articulos[0];
            if(resp_institucion_dict[0].length !== 0){
                    if( resp_institucion_dict[0][0].instituciones ){
                        class_av.var.institucion_diccionario = JSON.parse(resp_institucion_dict[0][0].instituciones);
                    }
            }
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
								
								if( $('#tipo_documento').val() == 'Errata' ){
                                    $('#div_busca_original').show();
                                }else{
                                    $('#sistema_original').text('');
                                    $('#titulo_original').text('');
                                    $('#div_busca_original').hide();
                                }
                                
                                if( $('#tipo_documento').val() == 'Documento retractado' || $('#tipo_documento').val() == 'Errata'){
                                    $('#row_errata').css('border-top', 'solid');
                                    $('#row_errata').css('border-bottom', 'solid');
                                    $('#row_errata').css('border-color', 'lightgrey');
                                    $('#row_errata').css('border-width', '1px');
                                    $('#div_nota_general').show();
                                    $('#nota_general').val('');
									if( $('#tipo_documento').val() == 'Documento retractado')
                                        $('#txt_nota_general').html('<b>Nota general:</b>');
                                    else
                                        $('#txt_nota_general').html('<b>Nota general (Documento original):</b>');
                                }else{
                                    $('#row_errata').css('border-top', '');
                                    $('#row_errata').css('border-bottom', '');
                                    $('#row_errata').css('border-color', '');
                                    $('#row_errata').css('border-width', '');
                                    $('#nota_general').val('');
                                    $('#div_nota_general').hide();
                                }
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
    /* ============================================================
     * ZIP portátil generado en el navegador.
     * Método STORE (sin compresión) para máxima compatibilidad y sin
     * depender de ZipArchive/php_zip.dll en el servidor XAMPP.
     * ============================================================ */
    portatil_crc_table: null,
    portatil_get_crc_table: function(){
        if(class_av.portatil_crc_table){
            return class_av.portatil_crc_table;
        }
        var table = new Uint32Array(256);
        for(var n = 0; n < 256; n++){
            var c = n;
            for(var k = 0; k < 8; k++){
                c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
            }
            table[n] = c >>> 0;
        }
        class_av.portatil_crc_table = table;
        return table;
    },
    portatil_crc32: function(bytes){
        var table = class_av.portatil_get_crc_table();
        var c = 0xFFFFFFFF;
        for(var i = 0; i < bytes.length; i++){
            c = table[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
        }
        return (c ^ 0xFFFFFFFF) >>> 0;
    },
    portatil_u16: function(v){
        return new Uint8Array([v & 255, (v >>> 8) & 255]);
    },
    portatil_u32: function(v){
        return new Uint8Array([v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255]);
    },
    portatil_concat: function(parts){
        var total = 0;
        parts.forEach(function(p){ total += p.length; });
        var out = new Uint8Array(total);
        var pos = 0;
        parts.forEach(function(p){ out.set(p, pos); pos += p.length; });
        return out;
    },
    portatil_dos_date: function(d){
        var year = Math.max(1980, Math.min(2107, d.getFullYear()));
        var date = ((year - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
        var time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
        return {date: date, time: time};
    },
    portatil_make_zip: function(files){
        if(typeof TextEncoder === 'undefined'){
            throw new Error('Este navegador no dispone de TextEncoder. Use una versión reciente de Chrome, Edge o Firefox.');
        }

        var enc = new TextEncoder();
        var localParts = [];
        var centralParts = [];
        var offset = 0;
        var centralSize = 0;
        var now = class_av.portatil_dos_date(new Date());
        var names = Object.keys(files);

        if(names.length === 0){
            throw new Error('No hay archivos para incluir en el ZIP.');
        }
        if(names.length > 65535){
            throw new Error('Demasiados archivos para ZIP32.');
        }

        names.forEach(function(name){
            var nameBytes = enc.encode(name);
            var data = enc.encode(String(files[name]));
            var crc = class_av.portatil_crc32(data);
            var flags = 0x0800;
            var method = 0; // STORE

            if(data.length > 0xFFFFFFFF || offset > 0xFFFFFFFF){
                throw new Error('El paquete excede el límite ZIP32.');
            }

            var localHeader = class_av.portatil_concat([
                class_av.portatil_u32(0x04034b50),
                class_av.portatil_u16(20),
                class_av.portatil_u16(flags),
                class_av.portatil_u16(method),
                class_av.portatil_u16(now.time),
                class_av.portatil_u16(now.date),
                class_av.portatil_u32(crc),
                class_av.portatil_u32(data.length),
                class_av.portatil_u32(data.length),
                class_av.portatil_u16(nameBytes.length),
                class_av.portatil_u16(0)
            ]);

            localParts.push(localHeader, nameBytes, data);

            var centralHeader = class_av.portatil_concat([
                class_av.portatil_u32(0x02014b50),
                class_av.portatil_u16(20),
                class_av.portatil_u16(20),
                class_av.portatil_u16(flags),
                class_av.portatil_u16(method),
                class_av.portatil_u16(now.time),
                class_av.portatil_u16(now.date),
                class_av.portatil_u32(crc),
                class_av.portatil_u32(data.length),
                class_av.portatil_u32(data.length),
                class_av.portatil_u16(nameBytes.length),
                class_av.portatil_u16(0),
                class_av.portatil_u16(0),
                class_av.portatil_u16(0),
                class_av.portatil_u16(0),
                class_av.portatil_u32(0),
                class_av.portatil_u32(offset)
            ]);

            centralParts.push(centralHeader, nameBytes);
            centralSize += centralHeader.length + nameBytes.length;
            offset += localHeader.length + nameBytes.length + data.length;
        });

        if(centralSize > 0xFFFFFFFF || offset > 0xFFFFFFFF){
            throw new Error('El paquete excede el límite ZIP32.');
        }

        var end = class_av.portatil_concat([
            class_av.portatil_u32(0x06054b50),
            class_av.portatil_u16(0),
            class_av.portatil_u16(0),
            class_av.portatil_u16(names.length),
            class_av.portatil_u16(names.length),
            class_av.portatil_u32(centralSize),
            class_av.portatil_u32(offset),
            class_av.portatil_u16(0)
        ]);

        return new Blob(localParts.concat(centralParts).concat([end]), {type: 'application/zip'});
    },
    portatil_control: function(){
        $('#btn_exportar_portatil').off('click').on('click', function(){
            class_av.portatil_exportar();
        });

        $('#btn_importar_portatil').off('click').on('click', function(){
            var features = (typeof cons !== 'undefined' && cons.features) ? cons.features : {};
            if(cons.rol.val === 'Editor' || features.mostrar_portatil !== true){
                return false;
            }
            $('#input_importar_portatil').val('').trigger('click');
        });

        $('#input_importar_portatil').off('change').on('change', function(){
            var file = this.files && this.files.length ? this.files[0] : null;
            if(!file){
                return;
            }
            class_av.portatil_importar_validar(file);
        });
    },
    portatil_importar_resumen_html: function(obj, titulo){
        obj = obj || {};
        var html = '<div style="text-align:left">';
        if(titulo){
            html += '<b>' + titulo + '</b><br><br>';
        }
        html += '<b>Paquete:</b> ' + String(obj.package_id || '') + '<br>';
        html += '<b>Registros en el ZIP:</b> ' + Number(obj.total || 0) + '<br>';
        if(obj.modo === 'validar'){
            html += '<b>Listos para importar:</b> ' + Number(obj.aplicables || 0) + '<br>';
            //html += '<b>Movimientos de bitácora listos (incluye procedencia):</b> ' + Number(obj.bitacora_aplicable || 0) + '<br>';
        }else{
            html += '<b>Importados:</b> ' + Number(obj.importados || 0) + '<br>';
            //html += '<b>Movimientos de bitácora guardados (incluye procedencia):</b> ' + Number(obj.bitacora_importada || 0) + '<br>';
        }
        html += '<b>Conflictos:</b> ' + Number(obj.conflictos || 0) + '<br>';
        html += '<b>Omitidos:</b> ' + Number(obj.omitidos || 0) + '<br>';
        html += '<b>Errores:</b> ' + Number(obj.errores || 0);

        var problemas = (obj.detalle || []).filter(function(x){
            return x && ['conflicto','error','omitido'].indexOf(String(x.estado || '')) !== -1;
        });
        if(problemas.length){
            html += '<hr style="margin:10px 0"><b>Detalle:</b><ul style="max-height:230px;overflow:auto;padding-left:20px">';
            problemas.slice(0, 20).forEach(function(x){
                var sis = $('<div>').text(String(x.sistema || '')).html();
                var est = $('<div>').text(String(x.estado || '')).html();
                var msg = $('<div>').text(String(x.mensaje || '')).html();
                html += '<li><b>' + sis + '</b> [' + est + ']: ' + msg + '</li>';
            });
            if(problemas.length > 20){
                html += '<li>... y ' + (problemas.length - 20) + ' resultado(s) más.</li>';
            }
            html += '</ul>';
        }
        html += '</div>';
        return html;
    },
    portatil_importar_peticion: function(file, modo, onSuccess){
        var $btn = $('#btn_importar_portatil');
        var textoOriginal = (modo === 'validar') ? ' Validando ...' : ' Importando ...';
        var fd = new FormData();
        fd.append('archivo', file, file.name || 'biblat_retorno.zip');
        fd.append('modo', modo);

        $btn.prop('disabled', true);
        $btn.find('span').text(textoOriginal);
        loading.start();

        var xhr = new XMLHttpRequest();
        xhr.open('POST', "<?=site_url('metametrics/portatil_importar_v110');?>", true);
        xhr.responseType = 'text';

        xhr.onload = function(){
            loading.end();
            $btn.prop('disabled', false);
            $btn.find('span').text(' Importar');

            var texto = xhr.responseText || '';
            var obj = null;
            try{
                obj = JSON.parse(texto);
            }catch(e){}

            if(xhr.status < 200 || xhr.status >= 300 || !obj || obj.resp !== 'success'){
                var msg = (obj && obj.mensaje) ? obj.mensaje : 'No fue posible ' + (modo === 'validar' ? 'validar' : 'importar') + ' el paquete portátil.';
                if(!obj && texto){
                    msg += ' Respuesta: ' + texto.substring(0, 300).replace(/\s+/g, ' ');
                }
                class_av.mensaje($('<div>').text(String(msg || '')).html());
                return;
            }
            if(typeof onSuccess === 'function'){
                onSuccess(obj);
            }
        };

        xhr.onerror = function(){
            loading.end();
            $btn.prop('disabled', false);
            $btn.find('span').text(' Importar');
            class_av.mensaje('Ocurrió un error de red al ' + (modo === 'validar' ? 'validar' : 'importar') + ' el ZIP portátil.');
        };
        xhr.send(fd);
    },
    portatil_importar_validar: function(file){
        if(!file){
            return false;
        }
        if(!/\.zip$/i.test(file.name || '')){
            class_av.mensaje('Seleccione el archivo ZIP generado con <b>Generar ZIP para importar</b> en la versión portátil.');
            return false;
        }
        if(file.size > (25 * 1024 * 1024)){
            class_av.mensaje('El ZIP de retorno supera 25 MB y no será importado.');
            return false;
        }

        class_av.portatil_importar_peticion(file, 'validar', function(obj){
            var aplicables = Number(obj.aplicables || 0);
            var html = class_av.portatil_importar_resumen_html(obj, 'Vista previa de importación');
            if(aplicables <= 0){
                class_av.mensaje(html + '<br><b>No hay registros que puedan importarse.</b>');
                return;
            }

            html += '<br><br>Se aplicarán únicamente los <b>' + aplicables + '</b> registro(s) validados. ' +
                    'Los conflictos y errores se dejarán sin modificar.<br><br><b>¿Desea continuar?</b>';
            $.confirm({
                title: '',
                content: html,
                columnClass: 'col-md-8 col-md-offset-2',
                buttons: {
                    cancelar: {
                        text: 'Cancelar',
                        action: function(){}
                    },
                    aceptar: {
                        text: 'Importar',
                        btnClass: 'btn-warning',
                        action: function(){
                            class_av.portatil_importar_aplicar(file);
                        }
                    }
                }
            });
        });
    },
    portatil_importar_aplicar: function(file){
        class_av.portatil_importar_peticion(file, 'aplicar', function(obj){
            var html = class_av.portatil_importar_resumen_html(obj, 'Resultado de la importación');
            var importados = Number(obj.importados || 0);
            if(importados > 0){
                html += '<br><br>La lista se recargará para mostrar los cambios importados.';
                class_av.var.ia_status_cache = {};
                class_av.mensaje(html, function(){
                    window.location.reload();
                });
            }else{
                class_av.mensaje(html);
            }
        });
    },
    portatil_exportar: function(){
        /*
         * El flujo portátil no forma parte de las funciones del Editor.
         * Esta validación protege además de una invocación programática.
         */
        if(cons.rol.val === 'Editor'){
            return false;
        }

        if(!Array.isArray(class_av.var.articulosJSON) || class_av.var.articulosJSON.length === 0){
            class_av.mensaje('No hay artículos disponibles para exportar.');
            return false;
        }

        /*
         * Los catálogos de Google Sheets ya fueron cargados por initClient().
         * Se mandan sólo esos catálogos al servidor; palabras/keywords y los
         * catálogos institucionales se obtienen directamente de PostgreSQL.
         */
        if(!class_av.var.catalogos ||
           !Array.isArray(class_av.var.catalogos.tipo_documento) || class_av.var.catalogos.tipo_documento.length === 0 ||
           !Array.isArray(class_av.var.catalogos.disciplina) || class_av.var.catalogos.disciplina.length === 0 ||
           !Array.isArray(class_av.var.catalogos.pais) || class_av.var.catalogos.pais.length === 0){
            class_av.mensaje('Los catálogos aún se están cargando. Espere unos segundos e intente nuevamente.');
            return false;
        }

        /*
         * Fase 1.9: no mandamos al exportador registros cuyo flujo ya esté
         * finalizado. Esta comprobación del navegador reduce trabajo, pero la
         * validación definitiva se vuelve a hacer contra PostgreSQL.
         *
         * Un artículo con estatus=C puede seguir siendo exportable si tiene una
         * revisión PC activa (estatusPC A/R).
         */
        var articulosExportables = class_av.var.articulosJSON.filter(function(a){
            var estatus = String(a.estatus == null ? '' : a.estatus);
            var estatusPC = String(a.estatusPC == null ? '' : a.estatusPC);
            var analisisNormalActivo = ['C','B'].indexOf(estatus) === -1;
            var revisionPCActiva = ['A','R'].indexOf(estatusPC) !== -1;
            return analisisNormalActivo || revisionPCActiva;
        });
        var omitidosFinalizados = Math.max(0, class_av.var.articulosJSON.length - articulosExportables.length);
        var sistemas = articulosExportables
            .map(function(a){ return a.sistema; })
            .filter(function(s){ return s !== undefined && s !== null && String(s).trim() !== ''; });

        if(sistemas.length === 0){
            class_av.mensaje('No hay artículos pendientes para exportar. Los registros ya completados o no indizables no se incluyen en el paquete portátil.');
            return false;
        }

        /* Los catálogos grandes de palabras ya están cargados en el navegador.
         * No los mandamos a PHP ni PHP los vuelve a consultar: se incorporan al
         * paquete justo antes de construir el ZIP. */
        if(cons.pal_cla.val === '1' &&
           (class_av.var.palabras_clave0 === null || class_av.var.keywords0 === null)){
            class_av.mensaje('Los catálogos de palabras clave todavía están cargando. Espere unos segundos e intente Exportar nuevamente.');
            return false;
        }

        var payload = {
            sistemas: sistemas,
            rol: cons.rol.val,
            pal_cla: cons.pal_cla.val,
            res: cons.res.val
        };

        var $btn = $('#btn_exportar_portatil');
        $btn.prop('disabled', true);
        $btn.find('span').text(' Preparando ZIP ...');
        loading.start();

        var xhr = new XMLHttpRequest();
        xhr.open('POST', "<?=site_url('metametrics/portatil_preparar_v110');?>", true);
        xhr.responseType = 'text';
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        xhr.onload = function(){
            loading.end();
            $btn.prop('disabled', false);
            $btn.find('span').text(' Exportar');

            var textoRespuesta = xhr.responseText || '';
            var obj = null;
            var errorParse = null;
            try{
                obj = JSON.parse(textoRespuesta);
            }catch(e){
                errorParse = e;
            }

            if(xhr.status < 200 || xhr.status >= 300){
                var mensaje = obj && obj.mensaje ? obj.mensaje : 'No fue posible preparar el paquete portátil. HTTP ' + xhr.status + '.';
                if(obj){
                    if(obj.etapa) mensaje += ' Etapa: ' + obj.etapa + '.';
                    if(obj.php_error) mensaje += ' Error PHP: ' + obj.php_error;
                }else if(textoRespuesta){
                    var iniErr = textoRespuesta.substring(0, 400).replace(/\s+/g, ' ');
                    mensaje += ' Respuesta: ' + iniErr;
                }
                class_av.mensaje(mensaje);
                return;
            }

            if(!obj){
                var contentType = xhr.getResponseHeader('Content-Type') || '(sin Content-Type)';
                var inicio = textoRespuesta.substring(0, 180).replace(/\s+/g, ' ');
                if(textoRespuesta.substring(0, 2) === 'PK'){
                    class_av.mensaje('El servidor está devolviendo un ZIP directamente. Eso indica que todavía está ejecutando una versión anterior de Metametrics.php. Esta fase debe responder JSON desde portatil_preparar_v110.');
                }else if(/^\s*</.test(textoRespuesta)){
                    class_av.mensaje('El servidor devolvió HTML en lugar de JSON (' + contentType + '). Puede ser una redirección de sesión, un 404 o un error PHP. Inicio de respuesta: ' + inicio);
                }else if(textoRespuesta.trim() === ''){
                    class_av.mensaje('El servidor devolvió una respuesta vacía (' + contentType + '). Esto normalmente significa que PHP se interrumpió antes de responder. Revise el log de Apache/PHP; la Fase 1.5 también intenta devolver la etapa exacta si ocurre un error fatal.');
                }else{
                    class_av.mensaje('La respuesta del servidor no es JSON válido (' + contentType + '). ' + (errorParse ? errorParse.message + '. ' : '') + 'Inicio: ' + inicio);
                }
                return;
            }

            if(obj.resp !== 'success'){
                var mensajeServidor = obj.mensaje || ('El servidor respondió resp=' + String(obj.resp) + '.');
                if(obj.etapa) mensajeServidor += ' Etapa: ' + obj.etapa + '.';
                if(obj.php_error) mensajeServidor += ' Error PHP: ' + obj.php_error;
                class_av.mensaje(mensajeServidor);
                return;
            }

            if(obj.export_version !== '1.10'){
                class_av.mensaje('El servidor respondió con una versión distinta del exportador (' + String(obj.export_version || 'sin versión') + '). Verifique que Metametrics.php Fase 1.9 esté instalado.');
                return;
            }

            if(!obj.paquete || typeof obj.index_html !== 'string' || obj.index_html.length === 0){
                var faltan = [];
                if(!obj.paquete) faltan.push('paquete');
                if(typeof obj.index_html !== 'string' || obj.index_html.length === 0) faltan.push('index_html');
                class_av.mensaje('El servidor respondió correctamente, pero faltan: ' + faltan.join(', ') + '.');
                return;
            }

            try{
                $btn.prop('disabled', true);
                $btn.find('span').text(' Construyendo ZIP ...');

                /*
                 * Estos catálogos ya viven en memoria en la aplicación web.
                 * Se incorporan aquí para no hacer que PHP los consulte, duplique
                 * y serialice nuevamente.
                 */
                obj.paquete.catalogos = obj.paquete.catalogos || {};
                $.each(class_av.var.catalogos || {}, function(k, v){
                    obj.paquete.catalogos[k] = v;
                });
                obj.paquete.catalogos.palabras = class_av.var.palabras_clave0 || [];
                obj.paquete.catalogos.keywords = class_av.var.keywords0 || [];

                var paqueteJson = JSON.stringify(obj.paquete);
                var manifestJson = JSON.stringify(obj.manifest || {}, null, 2);
                var files = {
                    'index.html': obj.index_html,
                    'data/paquete.js': 'window.BIBLAT_PAQUETE = ' + paqueteJson + ';',
                    'manifest.json': manifestJson,
                    'LEEME.txt': obj.leeme || 'BIBLAT CENTRAL PORTATIL'
                };

                var blob = class_av.portatil_make_zip(files);
                if(!blob || blob.size <= 22){
                    throw new Error('El ZIP generado no contiene archivos.');
                }

                var nombre = obj.filename || 'biblat_portatil.zip';
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = nombre;
                document.body.appendChild(a);
                a.click();
                setTimeout(function(){
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                }, 1500);

                var mb = (blob.size / (1024 * 1024)).toFixed(1);
                class_av.mensaje('Paquete portátil generado correctamente (' + mb + ' MB, 4 archivos).');
            }catch(e){
                class_av.mensaje('No fue posible construir el ZIP en el navegador: ' + (e.message || e));
            }finally{
                $btn.prop('disabled', false);
                $btn.find('span').text(' Exportar');
            }
        };

        xhr.onerror = function(){
            loading.end();
            $btn.prop('disabled', false);
            $btn.find('span').text(' Exportar');
            class_av.mensaje('Ocurrió un error de red al preparar el paquete portátil.');
        };

        xhr.send(JSON.stringify(payload));
    },
    ready: function(){
        loading.start();

        // Interruptor temporal de la interfaz portátil.
        var features = (typeof cons !== 'undefined' && cons.features) ? cons.features : {};
        var portatilActivo =
            (features.mostrar_portatil === true) &&
            (cons.rol.val !== 'Editor');
        $('#bloque_portatil').toggle(portatilActivo);
        $('#btn_exportar_portatil, #btn_importar_portatil').prop('disabled', !portatilActivo);
        // Se mostrará artículo por artículo sólo si existe sugerencia IA real.
        $('#clasificacion_ayuda_ia').hide();

        class_av.initClient();
        class_av.filtro();
        class_av.portatil_control();
        class_av.var.tiempo_inactividad = Date.now();
    },
    aplicar_modo_solo_lectura: function(activo){
        activo = (activo === true);
        class_av.var.solo_lectura = activo;
        $('#accordion').toggleClass('modo-solo-lectura', activo);
        $('#aviso_solo_lectura').toggle(activo);

        if(activo){
            // Un registro abierto para consulta nunca debe dejar cambios pendientes.
            // Algunos select2 disparan eventos change durante la carga inicial, por lo
            // que limpiamos explícitamente las banderas al entrar en sólo lectura.
            class_av.var.cambios_documento = false;
            class_av.var.cambios_institucion = false;
            class_av.var.cambios_autor = false;
            $('#save-no-indizable, #save-full, #save-full-pc, #save-article, #save-pc, #save-instituciones, #save-autores, #agrega-institucion, #agrega-autor, #add-palabra, #add-keyword, #import-ai, #add-errata, #importar_original').hide();
            $('#accordion').find('input, select, textarea').prop('disabled', true);
        }else{
            $('#accordion').removeClass('modo-solo-lectura');
            $('#aviso_solo_lectura').hide();
            // Estos controles no dependen del flujo normal/PC; el resto se ajusta
            // después con la lógica existente al cargar cada artículo.
            $('#save-instituciones, #save-autores, #agrega-institucion, #agrega-autor').show();
        }
    },
    control: function(){
        document.addEventListener('mousemove', function(event) {
            if(class_av.var.solo_lectura){
                class_av.var.tiempo_inactividad = Date.now();
                return;
            }
            if(!class_av.var.recargando){
                if( Date.now() - class_av.var.tiempo_inactividad > (60000 * 20) ){
                    class_av.var.recargando = true;
                    class_av.set_bitacora('Recarga', class_av.var.tiempo_analisis);
                    class_av.var.tiempo_analisis = 0;
                    window.location.reload();
                }else{
                    class_av.var.tiempo_inactividad = Date.now();
                }
            }
        });
        
        $(document).off('click.consultaFinalizada', '.consulta-eye').on('click.consultaFinalizada', '.consulta-eye', function(e){
            e.preventDefault();
            e.stopPropagation();
            var sistema = String($(this).data('sistema') || '');
            if(sistema === ''){
                return false;
            }
            /*
             * Los registros finalizados sólo se pueden abrir desde este botón.
             * Marcamos temporalmente que el clic proviene del icono de consulta
             * y reutilizamos el flujo normal de carga en modo sólo lectura.
             */
            var $registro = $('.' + sistema + '.sistema').first();
            if($registro.length){
                $registro.data('consulta-desde-ojo', true);
                try{
                    $registro.trigger('click');
                }finally{
                    $registro.removeData('consulta-desde-ojo');
                }
            }
            return false;
        });
        
        $('.sistema').off('click').on('click', function(e){
            class_utils.cancelaPeticiones();
            var _id = this.id;
            var sistema = _id.split('__')[0];
            var soloLectura = $(this).hasClass('cerrado');
            var consultaDesdeOjo = ($(this).data('consulta-desde-ojo') === true);

            /*
             * Un artículo finalizado no se abre haciendo clic en el título.
             * Su ficha almacenada sólo se puede consultar desde el icono de ojo.
             */
            if(soloLectura && !consultaDesdeOjo){
                return false;
            }

            var estabaSoloLectura = (class_av.var.solo_lectura === true);

            // La comprobación pertenece al registro que estamos abandonando, no al
            // que vamos a abrir. Si el actual era sólo lectura, no puede existir nada
            // que guardar y por tanto no debe aparecer el aviso de cambios pendientes.
            if(!estabaSoloLectura && class_av.cambios_sin_guardar('sistema', this)){
                return false;
            }

            class_av.aplicar_modo_solo_lectura(false);
            class_av.var.solo_lectura = soloLectura;
            class_av.var.tiempo_analisis = soloLectura ? 0 : Date.now();
            
            class_av.var.cambios_autor = false;
            class_av.var.cambios_documento = false;
            class_av.var.cambios_institucion = false;
            class_av.var.cambios_de_inicio = true;
            class_av.var.count_palabras_clave = 0;
            class_av.var.count_keywords = 0;
            class_av.var.palabras_clave_n = [];
            class_av.var.keywords_n = [];
            class_av.var.institucion_anterior = '';
            
            $('#keywords_n').empty();
            $('#palabras_clave_n').empty();
            $('#div-instituciones').find('*').off('change');
            $('#div-instituciones').empty();
            $('#div-autores').find('*').off('change');
            $('#div-autores').empty();
            
            $.each(['#div_palabras_clave_autor', '#div_palabras_clave', '#div_palabras_clave2', '#div_palabras_clave_n', '#div_keywords_n', '#div_keywords_texto', '#div_keywords', '#add-palabra', '#add-keyword'], function(i,val){
                    $(val).hide();
                });
            $('.ia-sugerencia, .evidencia-box, .clasificacion-origen').hide();
            $('.evidencia-texto').empty().removeClass('expandida').addClass('colapsada');
            $('.evidencia-toggle').hide().text('Ver más');
            
            // Los registros finalizados sí se pueden abrir, pero sólo en modo consulta.
            
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
                var revision_pc = ['A', 'R'].indexOf(class_av.var.documentoJSON[0].estatusPC) !== -1;
        
                if(revision_pc){
                    $('#save-no-indizable, #panelInstituciones, #panelAutores, #save-article, #save-full').hide();
                    $('#save-pc, #save-full-pc').show();
                    $('#idiomaDocumento, #titulo, #idioma, #titulo2, #idioma2, #titulo3, #idioma3, #tipo_documento, \n\
                        #disciplina1, #disciplina2, #disciplina3, #subdisciplina1, #subdisciplina2, #subdisciplina3, \n\
                        #url1, #url2, #tipourl1, #tipourl2').prop("disabled", true);
                }else{
                    $('#save-no-indizable, #panelInstituciones, #panelAutores, #save-article, #save-full').show();
                    $('#save-pc, #save-full-pc').hide();
                    $('#idiomaDocumento, #titulo, #idioma, #titulo2, #idioma2, #titulo3, #idioma3, #tipo_documento, \n\
                        #disciplina1, #disciplina2, #disciplina3, #subdisciplina1, #subdisciplina2, #subdisciplina3, \n\
                        #url1, #url2, #tipourl1, #tipourl2').prop("disabled", false);
                }
               
                
                if(!revision_pc){
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
                
                if(!revision_pc){
                    if(class_av.var.corporativo == 1){
                        $('#es-corporativo')[0].checked = true;
                    }else{
                        $('#es-corporativo')[0].checked = false;
                    }
                    class_av.autor_corporativo(true);
                }
                
                //Lectura del pdf
                /*$.when(
                    class_utils.setResource(class_av.var.servidor + class_av.var.app + '/get_pdf/', {url: url_pdf}, true)
                ) 
                .then(function(resp_pdf){*/
                    
                    var setArticulo = function(resp_pdf){
                        class_av.var.texto_pdf = resp_pdf.result;

                        /**** Búsqueda de título en pdf *********/
                        //if(url_pdf !== ''){
                            //class_av.busca_en_pdf(url_pdf, class_av.var.documentoJSON[0].articulo, '#check-titulo', '#titulo');
                            if(!revision_pc){
                                class_av.busca_en_pdf(class_av.var.texto_pdf, class_av.var.documentoJSON[0].articulo, '#check-titulo', '#titulo');
                            }
                        //}

                        class_av.tooltip_seguro('.tooltip-titulo:visible');
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
                            if(!revision_pc){
                                class_av.texto_idioma(class_av.var.documentoJSON[0].articulo, idiomas[0], '#check-idioma', '#idioma');
                            }
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
                            
                            if(!revision_pc){
                                class_av.busca_en_pdf(class_av.var.texto_pdf, class_av.var.documentoJSON[0].titulo2, '#check-titulo2', '#titulo2');
                                class_av.texto_idioma(class_av.var.documentoJSON[0].titulo2, class_av.var.documentoJSON[0].idioma2, '#check-idioma2', '#idioma2');
                            }

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
                            
                            if(!revision_pc){
                                class_av.busca_en_pdf(class_av.var.texto_pdf, class_av.var.documentoJSON[0].titulo3, '#check-titulo3', '#titulo3');
                                class_av.texto_idioma(class_av.var.documentoJSON[0].titulo3, class_av.var.documentoJSON[0].idioma3, '#check-idioma3', '#idioma3');
                            }

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
						
						if(class_av.var.documentoJSON[0].tipo_documento == 'Errata'){
                            $('#row_errata').css('border-top', 'solid');
                            $('#row_errata').css('border-bottom', 'solid');
                            $('#row_errata').css('border-color', 'lightgrey');
                            $('#row_errata').css('border-width', '1px');
                            $('#div_busca_original').show();
                            $('#div_nota_general').show();
                            
                            $('#div_datos_original').show();
                            $('#sistema_original').text(class_av.var.documentoJSON[0].sistemaErrata);
                            $('#titulo_original').text(class_av.var.documentoJSON[0].original);
                            $('#nota_general').val(class_av.var.documentoJSON[0].nota_original);
                        }else{
                            if( class_av.var.documentoJSON[0].tipo_documento == 'Documento retractado' ){
                                $('#row_errata').css('border-top', 'solid');
                                $('#row_errata').css('border-bottom', 'solid');
                                $('#row_errata').css('border-color', 'lightgrey');
                                $('#row_errata').css('border-width', '1px');
                                $('#div_nota_general').show();
								$('#nota_general').val(class_av.var.documentoJSON[0].notaGeneral);
                            }else{
                                $('#row_errata').css('border-top', '');
                                $('#row_errata').css('border-bottom', '');
                                $('#row_errata').css('border-color', '');
                                $('#row_errata').css('border-width', '');
                                $('#div_busca_original').hide();
                                $('#div_nota_general').hide();
                            }
                        }
                        
                        if( class_av.var.documentoJSON[0].tipo_documento == 'Documento retractado' )
                            $('#txt_nota_general').html('<b>Nota general:</b>');
                        else
                            $('#txt_nota_general').html('<b>Nota general (Documento original):</b>');

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
						
						$('#resumen_esp').val(class_av.var.documentoJSON[0]['Resumen español']);
                        $('#resumen_ing').val(class_av.var.documentoJSON[0]['Resumen inglés']);
                        $('#resumen_por').val(class_av.var.documentoJSON[0]['Resumen portugués']);
                        $('#resumen_otro').val(class_av.var.documentoJSON[0]['Resumen otro']);

                        class_av.control_aa(class_av.var.documentoJSON[0].estatusPC, class_av.var.documentoJSON[0].fechaAsignado);

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
                        if(soloLectura){
                            class_av.aplicar_modo_solo_lectura(true);
                        }
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
						
						var safeTooltip = function(selector) {
                            class_av.tooltip_seguro(selector);
                        };

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
                                            //$('#ciudad-'+val2.id).html(opciones_ciudades[val2.pais+'-'+class_av.var.corporativo]);
                                            $('#ciudad-'+val2.id).empty();
                                            $('#ciudad-'+val2.id).select2({ tags: true, placeholder: "Seleccione o escriba una ciudad", allowClear: true, data: opciones_ciudades[val2.pais+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                                            $('#select2-ciudad-'+val2.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
											safeTooltip('#select2-ciudad-'+val2.id+'-container');
                                            $('#select2-ciudad-'+val2.id+'-container').on('click', function(){var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());});
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
                                            class_av.tooltip_seguro('.select2-container:visible');
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
                                            //$('#dependencia-'+val2.id).html(opciones_dependencias[val2.institucion+'-'+class_av.var.corporativo]);
                                            $('#dependencia-'+val2.id).empty();
                                            $('#dependencia-'+val2.id).select2({ tags: true, placeholder: "Seleccione o escriba una dependencia", allowClear: true,  width: 'resolve', data: opciones_dependencias[val2.institucion+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                                            $('#select2-dependencia-'+val2.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                            safeTooltip('#select2-dependencia-'+val2.id+'-container');
                                            $('#select2-dependencia-'+val2.id+'-container').on('click', function(){var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());});
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
                                            if(class_av.var.institucion_diccionario[val2.institucion] !== undefined){
                                                $('#valor-anterior-'+val2.id).html(class_av.var.institucion_diccionario[val2.institucion]);
                                                $('#div-valor-anterior-'+val2.id).show();
                                            }
                                            $('#sug-ciudad-'+val2.id).html(opciones_sug_ciudades[val2.institucion]);
                                            class_av.seleccion_sug_ciudad();
                                            //$('#sug-ciudad-'+val2.id).select2({ tags: true, placeholder: "Sugerencias encontradas", allowClear: true});
                                            $('#check-ins-bib-'+val2.id).show();
                                            $('#check-ins-bib-'+val2.id+'-load').hide();
                                            $('#check-ins-bib-'+val2.id+'-true').show();
                                                if( class_av.var.corporativo == 0 ){
                                                    $('#div-sug-ciudad-'+val2.id).show();
                                                }
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

                                    //$('#institucion-'+val2.id).html(opciones_instituciones[val2.pais+'-'+class_av.var.corporativo]);
                                    $('#institucion-'+val2.id).empty();
                                    $('#institucion-'+val2.id).select2({ tags: true, placeholder: "Seleccione o escriba una institución", allowClear: true,  width: 'resolve', data: opciones_instituciones[val2.pais+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                                    $('#select2-institucion-'+val2.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                    safeTooltip('#select2-institucion-'+val2.id+'-container');
                                    $('#select2-institucion-'+val2.id+'-container').on('click', function(){
                                        var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());
                                        class_av.set_institucion_anterior('#'+this.id.replace('select2-','').replace('-container',''));
                                    });
                                    if(val2.institucion !== null && val2.institucion !== undefined && val2.institucion !== ''){
                                        //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                                        if ($('#institucion-'+val2.id).find("option[value='" + val2.institucion.replaceAll('"', "&quot;").replaceAll("'", "&#39;") + "']").length) {
                                            $('#institucion-'+val2.id).val(val2.institucion).trigger('change');
                                        }else{
                                            var newOption = new Option(val2.institucion, val2.institucion.replaceAll('"', "&quot;").replaceAll("'", "&#39;"), true, true);
                                            $('#institucion-'+val2.id).append(newOption).trigger('change');
                                        }

                                       //$('#institucion-'+val2.id).val(val2.institucion).trigger('change');
                                        class_av.busca_en_pdf(class_av.var.texto_pdf, val2.institucion, '#check-ins-'+val2.id, '#institucion-'+val2.id)
                                        .then(function(){
                                            $('#institucion-'+val2.id).on('change', function(){
                                                 class_av.var.cambios_institucion = (true && !es_inicio);
                                                 class_av.set_institucion_change_all('#institucion-'+val2.id);
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
                                        class_utils.getResource('/datos/ciudad_by_pais/'+val.pais.replaceAll(class_av.cons.char_i,''), true),
                                        class_utils.getResource('/datos/institucion_by_pais/'+val.pais.replaceAll(class_av.cons.char_i,'')+'/'+class_av.var.corporativo, true)
                                    ) 
                                    .then(function(resp_ciudad, resp_institucion){
                                        //setTimeout(function(){                
                                            peticiones --;
                                            /*********ciudad*******************/
                                            //var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                            var options = [{id:'', text:'', num:0}];
                                            $.each(resp_ciudad[0], function(i2, val2){
                                                //options += class_av.cons.option.replace('<valor>', val2.ciudad).replace('<opcion>', val2.ciudad);
                                                var obj = {
                                                    id: val2.ciudad,
                                                    text: val2.ciudad,
                                                    num: val2.count
                                                }
                                                options.push(obj);
                                            });
                                            opciones_ciudades[val.pais+'-'+class_av.var.corporativo] = JSON.parse(JSON.stringify(options));
                                            //$('#ciudad-'+val.id).html(opciones_ciudades[val.pais+'-'+class_av.var.corporativo]);
                                            $('#ciudad-'+val.id).empty();
                                            $('#ciudad-'+val.id).select2({ tags: true, placeholder: "Seleccione o escriba una ciudad", allowClear: true, data: opciones_ciudades[val.pais+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                                            $('#select2-ciudad-'+val.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                            safeTooltip('#select2-ciudad-'+val.id+'-container');
                                            $('#select2-ciudad-'+val.id+'-container').on('click', function(){var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());});

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
                                            //options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                            options = [{id:'', text:'', num:0}];
                                            $.each(resp_institucion[0], function(i2, val2){
                                                //options += class_av.cons.option.replace('<valor>', val2.institucion.replaceAll('"', "&quot;")).replace('<opcion>', val2.institucion);
                                                var obj = {
                                                    id: val2.institucion,
                                                    text: val2.institucion,
                                                    num: val2.count
                                                }
                                                options.push(obj);
                                            });
                                            opciones_instituciones[val.pais+'-'+class_av.var.corporativo] = JSON.parse(JSON.stringify(options));
                                            //$('#institucion-'+val.id).html(opciones_instituciones[val.pais+'-'+class_av.var.corporativo]);
                                            $('#institucion-'+val.id).empty();
                                            $('#institucion-'+val.id).select2({ tags: true, placeholder: "Seleccione o escriba una institución", allowClear: true,  width: 'resolve', data: opciones_instituciones[val.pais+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                                            $('#select2-institucion-'+val.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                            safeTooltip('#select2-institucion-'+val.id+'-container');
                                            $('#select2-institucion-'+val.id+'-container').on('click', function(){
                                                var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());
                                                class_av.set_institucion_anterior('#'+this.id.replace('select2-','').replace('-container',''));
                                            });

                                            //Si hay un valor de institución se preselecciona
                                            if(val.institucion !== null && val.institucion !== undefined && val.institucion !== ''){
                                                //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                                                if ($('#institucion-'+val.id).find("option[value='" + val.institucion.replaceAll('"', "&quot;").replaceAll("'", "&#39;") + "']").length) {
                                                    $('#institucion-'+val.id).val(val.institucion).trigger('change');
                                                }else{
                                                    var newOption = new Option(val.institucion, val.institucion.replaceAll('"', "&quot;").replaceAll("'", "&#39;"), true, true);
                                                    $('#institucion-'+val.id).append(newOption).trigger('change');
                                                }

                                                //if(url_pdf !== ''){
                                                    //class_av.busca_en_pdf(url_pdf, val.institucion, '#check-ins-'+val.id, '#institucion-'+val.id);
                                                    class_av.busca_en_pdf(class_av.var.texto_pdf, val.institucion, '#check-ins-'+val.id, '#institucion-'+val.id)
                                                    .then(function(){
                                                        $('#institucion-'+val.id).on('change', function(){
                                                            class_av.var.cambios_institucion = (true && !es_inicio);
                                                            class_av.set_institucion_change_all('#institucion-'+val.id);
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
                                    //var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                    //options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                    //options += class_av.cons.option.replace('<valor>', val.institucion.replaceAll('"', "&quot;")).replace('<opcion>', val.institucion);
                                    var options = [{id:'', text:'', num:0}];
                                    var obj = {
                                                    id: val.institucion,
                                                    text: val.institucion,
                                                    num: val.count
                                                }
                                    options.push(obj);

                                    //$('#institucion-'+val.id).html(options);
                                    $('#institucion-'+val.id).empty();
                                    $('#institucion-'+val.id).select2({ tags: true, placeholder: "Seleccione o escriba una institución", allowClear: true,  width: 'resolve', data: options, templateResult: class_av.formato_badge});
                                    $('#select2-institucion-'+val.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                    safeTooltip('#select2-institucion-'+val.id+'-container');
                                    $('#select2-institucion-'+val.id+'-container').on('click', function(){
                                        var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());
                                        class_av.set_institucion_anterior('#'+this.id.replace('select2-','').replace('-container',''));
                                    });
                                    $('#institucion-'+val.id).val(val.institucion).trigger('change');
                                    $('#institucion-'+val.id).on('change', function(){
                                        class_av.var.cambios_institucion = (true && !es_inicio);
                                        class_av.set_institucion_change_all('#institucion-'+val.id);
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
                                if(class_av.var.institucion_diccionario[val.institucion] !== undefined){
                                    $('#valor-anterior-'+val.id).html(class_av.var.institucion_diccionario[val.institucion]);
                                    $('#div-valor-anterior-'+val.id).show();
                                }

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
                                            /*var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                            $.each(resp_dependencias[0], function(i2, val2){
                                                options += class_av.cons.option.replace('<valor>', val2.dependencia.replace('"', "&quot;")).replace('<opcion>', val2.dependencia);
                                            });*/
                                            var options = [{id:'', text:'', num:0}];
                                            $.each(resp_dependencias[0], function(i2, val2){
                                                //options += class_av.cons.option.replace('<valor>', val2.ciudad).replace('<opcion>', val2.ciudad);
                                                var obj = {
                                                    id: val2.dependencia,
                                                    text: val2.dependencia,
                                                    num: val2.count
                                                }
                                                options.push(obj);
                                            });
                                            opciones_dependencias[val.institucion+'-'+class_av.var.corporativo] = JSON.parse(JSON.stringify(options));
                                            //$('#dependencia-'+val.id).html(opciones_dependencias[val.institucion+'-'+class_av.var.corporativo]);
                                            $('#dependencia-'+val.id).empty();
                                            $('#dependencia-'+val.id).select2({ tags: true, placeholder: "Seleccione o escriba una dependencia", allowClear: true,  width: 'resolve', data: opciones_dependencias[val.institucion+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                                            $('#select2-dependencia-'+val.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                            safeTooltip('#select2-dependencia-'+val.id+'-container');
                                            $('#select2-dependencia-'+val.id+'-container').on('click', function(){var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());});
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
                                                if( class_av.var.corporativo == 0 ){
                                                    $('#div-sug-ciudad-'+val.id).show();
                                                }
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
                                                options += '<li>' + '<span style="cursor:pointer" class="sug-ciudad-clic" data-toggle="tooltip" title="[Clic] para copiar en campo Ciudad" id="op-sug-ciudad-'+val.id+'">' + val2.ciudad + '</span>' +
                                                            '<span class="badge badge-secondary" style="font-size: 10px; margin-left: 10px;">'+val2.count+'</span>'+
                                                            '<span class="badge badge-secondary despacio" style="font-size: 10px;margin-left: 10px;background-color: #343a40;display:none">Copiado en campo Ciudad!</span></li>';
                                            });
                                            opciones_sug_ciudades[val.institucion] = options;
                                            $('#sug-ciudad-'+val.id).html(opciones_sug_ciudades[val.institucion]);
                                            class_av.seleccion_sug_ciudad();
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
                        
                        if(!revision_pc){
                            recorrido_instituciones(class_av.var.institucionesJSON);
                        }

                        /******************************************************************/
                        $('#div-autores').html('');

                        $('#accordionAutores').html('Cargando Autores (0/'+class_av.var.autoresJSON.length+') ...');
                        $('#accordionAutores').prop('href', '');

                        /*********institucion*******************/
                        if(!revision_pc){
                            class_av.var.a_opciones_instituciones = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                            $.each(class_av.var.institucionesJSON, function(i,val){
                                var op_institucion = val.institucion;
                                if(val.dependencia !== undefined && val.dependencia !== null && val.dependencia !== ''){
                                    op_institucion = op_institucion + ' - ' + val.dependencia;
                                }
                                class_av.var.a_opciones_instituciones += class_av.cons.option.replace('<valor>', val.id).replace('<opcion>', op_institucion);
                            });
                        }

                        var total2 = 0;
                        //$.each(class_av.var.autoresJSON, function(i,val){
                        var recorrido_autores = function(arr_autores){
                            var es_inicio = true;
                            if(arr_autores.length == 0){
                                $('#accordionAutores').html('Autores');
                                $('#accordionAutores').prop('href', '#autores');
                                class_av.evento_borra_autor();
                                class_av.change_nombre();
                                class_av.change_orcid();
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
                            safeTooltip('#select2-a-institucion-'+val.id+'-container');
                            if(val['institucionId'] !== null){
                                institucion = class_utils.find_prop(class_av.var.institucionesJSON, 'id',val['institucionId'])
                                if(institucion !== undefined){
                                    institucion = institucion['institucion'];
                                }
                                $('#a-institucion-'+val.id).val(val['institucionId']).trigger('change');
                            }
                            $('#a-institucion-'+val.id).on('change', function(){
                                    class_av.var.cambios_autor = (true && !es_inicio);
                                });
                            $('#nombre-'+val.id).val(val.nombre);
                            $('#orcid-'+val.id).val(val.orcid);
							safeTooltip('#nombre-'+val.id);
                            safeTooltip('#orcid-'+val.id);
                            class_av.tooltip_seguro('#nombre-'+val.id);
                            class_av.tooltip_seguro('#orcid-'+val.id);

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
                        
                        if(!revision_pc){
                            recorrido_autores(class_av.var.autoresJSON);
                        }

                        //class_av.evento_borra_autor();
                        //class_av.change_nombre();
                        //class_av.change_orcid();

                        //$('#save-no-indizable').show();
                        //$('#save-full').show();
                        //$('#save-article').show();
                        $('#save-instituciones').show();
                        $('#save-autores').show();

                        class_av.var.cambios_de_inicio = false;
                    };
                    
					
					if(!revision_pc){
						$.ajax({
							url:class_av.var.servidor + class_av.var.app + '/get_pdf/', 
							type:'POST',
							timeout: 90000,
							data: {url: url_pdf},
							cache:false,
							dataType:"json"
						}).done(function(resp_pdf){
							setArticulo(resp_pdf);
						}).fail(function(){
							var resp_pdf = {'result': 'fallo'};
							setArticulo(resp_pdf);
						});
					}else{
                        setArticulo('');
                    }
                //});
            });
            
            },500);
            },500);
        });
        class_av.control_guarda();
        
        $('#btn_nuevo_articulo').off('click').on('click', function(){
            $('#div-filtro').hide();
            $('#accordion').hide();
            $('#div_nuevo_articulo').show();
            $('#div_tabla').hide();
            $('#btn_nuevo_articulo').hide();
            class_av.revistas_asignadas();
            class_av.initRevistas();
        });
        
        $('#btn_cancelar_na').off('click').on('click', function(){
            $('#div-filtro').show();
            $('#txt_vol, #txt_num, #txt_num_esp, #txt_num_sup').val('');
            $('#txt_vol, #txt_num, #txt_num_esp, #txt_num_sup').prop('disabled', false);
            $('.check').prop('disabled', false);
            $('.check').prop('checked', false);
            $('#div_especial, #div_suplemento, #div_estacion').hide();
            $('#div_nuevo_articulo').hide();
            $('#div_tabla').show();
            $('#btn_nuevo_articulo').show();
        });
		
		$('#add-errata').off('click').on('click', function(){
            class_av.prompt_articulo();
         });
		 
		$('#importar_original').off('click').on('click', function(){
            class_av.autores_errata();
         });
    },
    control_aa: function(pc, fa){
        /*
         * Los resúmenes conservan la lógica existente.
         * estatusPC (pc) NO determina si se muestran o cargan palabras clave.
         */
        if(cons.res.val == "1" || fa == null){
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
        }else{
            $.each(['#div_resumen_esp', '#div_resumen_ing', '#div_resumen_por', '#div_resumen_otro', '#div_palabras', '#div_palabras_clave_texto'], function(i,val){
                $(val).hide();
            });
        }

        // Los cambios de URL sólo marcan cambios del documento.
        // Ya no son condición para consultar palabras clave.
        $('#url1, #url2, #tipourl1, #tipourl2').off('change').on('change', function(e){
            class_av.var.cambios_documento = true;
        });

        /*
         * Se intenta cargar palabras clave para cualquier artículo que abra
         * un usuario con la funcionalidad habilitada, sea manual o cosechado.
         */
        if(cons.pal_cla.val == "1"){
            function checkPC() {
                const interval = setInterval(() => {
                    if (class_av.var.palabras_clave0 !== null && class_av.var.keywords0 !== null) {
                        clearInterval(interval);
                        class_av.palabras_clave();
                    }else{
                        var features = (typeof cons !== 'undefined' && cons.features) ? cons.features : {};
                        if(features.mostrar_ia_palabras_clave === true){
                            $('#div_cargando_pc').show();
                        }else{
                            $('#div_palabras_clave_texto, #div_cargando_pc').hide();
                        }
                    }
                }, 500);
            }
            checkPC();
        }else{
            $('#div_palabras_clave_texto, #div_cargando_pc').hide();
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
    evento_borra_autor: function(){
        $('.borra-autor').off('click').on('click', function(){
            var partes = this.id.split('-');
            var borra_id = parseInt(partes[partes.length - 1], 10);

            if (!isNaN(borra_id)) {
                class_av.borra_autor(borra_id);
            }
        });
    },
    borra_autor: function(id){
        id = parseInt(id, 10);

        if (isNaN(id)) {
            console.log('ID inválido:', id);
            return false;
        }

        var indexAutor = class_av.var.autoresJSON.findIndex(function(autor){
            return parseInt(autor.id, 10) === id;
        });

        if (indexAutor === -1) {
            console.log('No se encontró el autor en autoresJSON:', id);
            console.log(class_av.var.autoresJSON.map(function(a){ return a.id; }));
            return false;
        }

        // Elimina del DOM
        $('#div-autor-' + id).remove();

        // Elimina del arreglo
        class_av.var.autoresJSON.splice(indexAutor, 1);

        // Renumera TODO para garantizar ids consecutivos
        $.each(class_av.var.autoresJSON, function(i, val){
            var oldId = parseInt(val.id, 10);
            var newId = i + 1;

            if (oldId !== newId) {
                var $divAutor = $('#div-autor-' + oldId);

                // Cambia IDs internos
                $divAutor.find('[id]').each(function() {
                    this.id = this.id.replace(
                        new RegExp('(^|-)' + oldId + '(?=-|$)'),
                        '$1' + newId
                    );
                });

                // Cambia "for" de labels, si existen
                $divAutor.find('[for]').each(function() {
                    var oldFor = $(this).attr('for');

                    $(this).attr(
                        'for',
                        oldFor.replace(
                            new RegExp('(^|-)' + oldId + '(?=-|$)'),
                            '$1' + newId
                        )
                    );
                });

                // Cambia el ID del contenedor
                $divAutor.attr('id', 'div-autor-' + newId);

                // Actualiza el JSON
                val.id = String(newId);
            } else {
                val.id = String(newId);
            }

            // Actualiza el número visible, ya con el ID nuevo
            $('#numAut-' + newId).html(String(newId));
        });

        class_av.evento_borra_autor();

        class_av.var.cambios_autor = (true && !class_av.var.cambios_de_inicio);

        console.log('Autores después de borrar:', class_av.var.autoresJSON.map(function(a){
            return a.id;
        }));
    },
    evento_borra_institucion: function(){
        $('.borra-institucion').off('click').on('click', function(){
            var borra_id = this.id.split('-')[2];
            class_av.borra_institucion(borra_id);
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
        class_av.tooltip_seguro('.select2-container:visible');
        
        //Debido a que en el evento de borrar hay cambios en los ids, se revisan los anteriores para areglar la parte del select
        for(var id_atras = parseInt(id)-1; id_atras > 0; id_atras--){
            if($('#a-institucion-'+id_atras)){
                $('#a-institucion-'+id_atras).on('change', function(){
                    class_av.var.cambios_autor = (true && !class_av.var.cambios_de_inicio);
                });
                $('#a-institucion-'+id_atras).select2({ tags: false, placeholder: "Seleccione una institución", allowClear: true});
                $('#select2-a-institucion-'+id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                class_av.tooltip_seguro('.select2-container:visible');
            }
        }
        
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
                var num_titulo = id_h.replace('#idioma', '');
                var id_titulo = '#titulo' + num_titulo;
                $(id_titulo).prop("disabled", false);
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
                var num_titulo = id_h.replace('#idioma', '');
                var id_titulo = '#titulo' + num_titulo;
                $(id_h).prop("disabled", false);
                $(id_titulo).prop("disabled", false);
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
                            texto += '<li>' + val.nombre + ': ' + val.orcid + '<span class="badge badge-secondary" style="font-size: 10px; margin-left: 10px;">'+val.count+'</span>';
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
    /* ============================================================
     * Indicador IA del listado.
     * Sólo consulta los registros visibles (máximo pageLength) y conserva
     * el resultado en memoria para no repetir peticiones al volver de página.
     * Un registro se marca cuando genera_pc contiene palabras/sugerencias
     * y también una clasificación temática (disciplina).
     * ============================================================ */
    ia_tiene_contenido: function(valor){
        if(valor === undefined || valor === null){
            return false;
        }

        if(typeof valor === 'string'){
            var limpio = valor.trim();
            var bajo = limpio.toLowerCase();
            if(limpio === '' || bajo === 'null' || bajo === 'sin resultado' ||
               bajo === '"sin resultado"' || limpio === '[]' || limpio === '{}'){
                return false;
            }
            if(limpio.charAt(0) === '[' || limpio.charAt(0) === '{' || limpio.charAt(0) === '"'){
                try{
                    return class_av.ia_tiene_contenido(JSON.parse(limpio));
                }catch(e){
                    return true;
                }
            }
            return true;
        }

        if(Array.isArray(valor)){
            if(valor.length === 0){
                return false;
            }
            for(var i = 0; i < valor.length; i++){
                if(class_av.ia_tiene_contenido(valor[i])){
                    return true;
                }
            }
            return false;
        }

        if(typeof valor === 'object'){
            var keys = Object.keys(valor);
            for(var k = 0; k < keys.length; k++){
                if(class_av.ia_tiene_contenido(valor[keys[k]])){
                    return true;
                }
            }
            return false;
        }

        return Boolean(valor);
    },
    ia_registro_trabajado: function(registro){
        if(!registro || typeof registro !== 'object'){
            return false;
        }

        // Para palabras, [] también cuenta como proceso terminado: significa que la IA
        // trabajó el registro aunque no hubiera coincidencias útiles en el catálogo.
        var tienePalabras = [
            registro.biblat_exactas,
            registro.biblat_sugerencias,
            registro.biblat_exactas_en,
            registro.biblat_sugerencias_en
        ].some(function(v){
            if(v === undefined || v === null){
                return false;
            }
            if(typeof v === 'string'){
                var t = v.trim().toLowerCase();
                return t !== '' && t !== 'null' && t !== 'sin resultado' && t !== '"sin resultado"';
            }
            return true;
        });

        var disciplinas = registro.disciplinas;
        if(typeof disciplinas === 'string'){
            try{
                disciplinas = JSON.parse(disciplinas);
            }catch(e){
                disciplinas = {};
            }
        }

        var tieneDisciplina = false;
        if(disciplinas && typeof disciplinas === 'object' && !Array.isArray(disciplinas)){
            $.each([1,2,3], function(i,n){
                if(class_av.ia_tiene_contenido(disciplinas['disciplina'+n])){
                    tieneDisciplina = true;
                    return false;
                }
            });
        }

        return tienePalabras && tieneDisciplina;
    },
    pinta_indicador_ia: function(sistema, trabajado){
        $('.ia-status-slot').filter(function(){
            return String($(this).attr('data-sistema') || '') === String(sistema || '');
        }).each(function(){
            if(trabajado){
                $(this).html(
                    '<span class="ia-status-chip" title="Palabras clave y clasificación temática generadas por IA">' +
                    '<i class="fa fa-magic" aria-hidden="true"></i> IA</span>'
                );
            }else{
                $(this).empty();
            }
        });
    },
    actualiza_indicadores_ia: function(){
        var features = (typeof cons !== 'undefined' && cons.features) ? cons.features : {};
        if(features.mostrar_indicador_ia !== true){
            $('.ia-status-slot').empty();
            return;
        }

        var sistemas = [];
        $('#tbl_articulos tbody .ia-status-slot').each(function(){
            var sistema = String($(this).attr('data-sistema') || '').trim();
            if(sistema !== '' && sistemas.indexOf(sistema) === -1){
                sistemas.push(sistema);
            }
        });

        $.each(sistemas, function(i, sistema){
            if(Object.prototype.hasOwnProperty.call(class_av.var.ia_status_cache, sistema)){
                class_av.pinta_indicador_ia(sistema, class_av.var.ia_status_cache[sistema] === true);
                return;
            }

            if(class_av.var.ia_status_pendientes[sistema]){
                return;
            }
            class_av.var.ia_status_pendientes[sistema] = true;

            $.ajax({
                url: '/datos/tabla_by_campo_fdw/genera_pc/sistema/' + encodeURIComponent(sistema),
                dataType: 'json',
                cache: true
            }).done(function(registros){
                var registro = (Array.isArray(registros) && registros.length > 0) ? registros[0] : null;
                var trabajado = class_av.ia_registro_trabajado(registro);
                class_av.var.ia_status_cache[sistema] = trabajado;
                class_av.pinta_indicador_ia(sistema, trabajado);
            }).fail(function(){
                // Ante un error no se pinta el chip; se cachea para evitar una tormenta
                // de reintentos al avanzar y regresar entre páginas.
                class_av.var.ia_status_cache[sistema] = false;
                class_av.pinta_indicador_ia(sistema, false);
            }).always(function(){
                delete class_av.var.ia_status_pendientes[sistema];
            });
        });
    },
    pinta_icono_consulta: function(sistema, mostrar){
        var $slot = $('.consulta-status-slot[data-sistema="' + sistema + '"]');

        if(!$slot.length){
            return;
        }

        mostrar =
            mostrar === true &&
            cons.features.mostrar_consulta_finalizados === true;

        if(!mostrar){
            $slot.empty();
            return;
        }

        $slot.html(
            '<button type="button" class="consulta-eye" data-sistema="' + sistema + '" ' +
            'title="Ver datos almacenados" aria-label="Ver datos almacenados">' +
            '<i class="fa fa-eye" aria-hidden="true"></i>' +
            '</button>'
        );
    },
    setTabla: function(data){
        var tbody = '';
        var total_meta = 0;
        
        $.each(data, function(i, val){
            var texto1 = (val['url1'] == null)?'':'Ver artículo';
            var texto2 = (val['url2'] == null)?'':'Ver artículo';
            var art_class = '';
            var art_style = '';
            if( ['A','R'].indexOf(val['estatusPC']) !== -1 ){
                art_class = 'sistema';
                art_style = 'cursor:pointer;color:#ff8000'
            }else{
                art_class = ( ['C','B'].indexOf(val['estatus']) == -1 )?'sistema':'sistema cerrado';
                // Los finalizados ya no son navegables desde el título.
                art_style = ( ['C','B'].indexOf(val['estatus']) == -1 )?'cursor:pointer;color:#ff8000':'cursor:default;color:#777777';
            }
            //var art_class = 'sistema';
            //var art_style = 'cursor:pointer;color:#ff8000';
            var mostrar_consulta =
                cons.features.mostrar_consulta_finalizados === true &&
                art_class.indexOf('cerrado') !== -1;
            var consulta_html = mostrar_consulta
                ? '<button type="button" class="consulta-eye" data-sistema="' + val['sistema'] + '" title="Ver datos almacenados" aria-label="Ver datos almacenados"><i class="fa fa-eye" aria-hidden="true"></i></button>'
                : '';
            val['articulo'] = val['articulo'].replace(/<[^>]+>/g, '');
            var tr = class_av.var.tr.replace('<revista>', val['revista'])
                            .replace('<issn>', val['issn'])
                            .replace('<numero>', val['numero'])
                            .replace('<id>', val['sistema'] + '__' + val['revista'] + '__' + val['articulo'])
                            .replace('<sistema>', val['sistema'])
                            .replace('<sistema_ia>', val['sistema'])
                            .replace('<sistema_consulta>', val['sistema'])
                            .replace('<consulta>', consulta_html)
                            .replace('<id_estatus>', val['sistema'])
                            .replace('<art>', val['articulo'])
                            .replace('<url1>', val['url1'])
                            .replace('<url2>', val['url2'])
                            .replace('<texto1>', texto1)
                            .replace('<texto2>', texto2)
                            .replace('<fecha>', ((['C','R','A'].indexOf(val['estatusPC'])==-1)?'<fecha>':val['fechaAsignadoPC']))
                            .replace('<fecha>', ((val['fechaAsignado']==null)?'':val['fechaAsignado']))
                            .replace('<fecha_c>', ((['C','R','A'].indexOf(val['estatusPC'])!==-1)?val['fechaPC']:'<fecha_c>'))
                            .replace('<fecha_c>', ((val['estatus']=='C')?val['fecha']:''))
                            .replace('<estatus>', ((val['estatusPC']==null)?'<estatus>':'<estatus_pc>'+val['estatusPC']))
                            .replace('<estatus>', '<estatus>'+val['estatus'])
                            .replace('<color>', ((val['estatusPC']==null)?'<color>':'<color>'+val['estatusPC']))
                            .replace('<color>', ((val['estatusPC']==null)?'<color>'+val['estatus']:'<color>'))
                            .replace('<estatus>R', 'En revisión')
                            .replace('<estatus>C', 'Completado')
                            .replace('<estatus>B', 'No indizable')
                            .replace('<estatus>A', 'Sin movimiento')
							.replace('<estatus>D', 'Corrección')
                            .replace('<estatus_pc>R', 'En revisión PC')
                            .replace('<estatus_pc>C', 'Completado PC')
                            .replace('<estatus_pc>A', 'Sin movimiento PC')
                            .replace('<color>R', 'goldenrod')
                            .replace('<color>C', 'darkgreen')
                            .replace('<color>B', 'darkred')
							.replace('<color>D', 'darkblue')
                            .replace('<style>', art_style)
                            .replace('<class>', art_class)
                            .replaceAll('undefined', '');
            tbody += tr;
        });
       
        //$('.progress').html(class_av.var.barra_avance.replaceAll('<avance>', ( total_meta/1000*100 ).toFixed(2)));
        
        var tabla = class_av.var.tabla
                .replace('<body>', tbody);
        
        var oculta = {};
        var targets =[0,1,2,3,4,5,6];
        if(cons.rol.val == 'Editor'){
            oculta = 
                {
                    targets: 6,
                    visible: false,
                    searchable: false
                };
        }
        
        $('#div_tabla').html(tabla);
        var op = {
                        order: [[ 0, 'asc' ]],
                        bLengthChange: false,
                        pageLength: 10,
                        pagingType: 'input',

                        // Mantiene la paginación en la misma posición entre páginas.
                        // Se deja más alto el cuerpo para que en páginas con filas cortas
                        // no aparezca innecesariamente la barra de desplazamiento interna.
                        scrollY: '70vh',
                        scrollCollapse: false,
                        autoWidth: true,
                        columnDefs: [
                            oculta,
                            {
                                render: function (data, type, full, meta) {
                                    //Sustituye el valor de la celda por esto agregando un div para que se mantenga dentro del tamaño definido
                                    return '<div style="width: 100%; text-align: left; white-space: normal;">' + data + '</div>';
                                },
                                targets: targets
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
                            class_av.actualiza_indicadores_ia();
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
                        class_utils.getResource('/datos/ciudad_by_pais/'+pais.replaceAll(class_av.cons.char_i,''), true),
                        class_utils.getResource('/datos/institucion_by_pais/'+pais.replaceAll(class_av.cons.char_i,'')+'/'+class_av.var.corporativo, true)
                    ) 
                    .then(function(resp_ciudad, resp_institucion){
                        setTimeout(function(){                
                            $('#ciudad-'+id+'-load').hide();
                            $('#div-ciudad-'+id).show();
                            /*********ciudad*******************/
                            //var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                            var options = [{id:'', text:'', num:0}];
                            $.each(resp_ciudad[0], function(i2, val2){
                                //options += class_av.cons.option.replace('<valor>', val2.ciudad).replace('<opcion>', val2.ciudad);
                                var obj = {
                                    id: val2.ciudad,
                                    text: val2.ciudad,
                                    num: val2.count
                                }
                                options.push(obj);
                            });
                            opciones_ciudades[pais+'-'+class_av.var.corporativo] = '';
                            opciones_ciudades[pais+'-'+class_av.var.corporativo] = JSON.parse(JSON.stringify(options));
                            //$('#ciudad-'+id).html(opciones_ciudades[pais+'-'+class_av.var.corporativo]);
                            $('#ciudad-'+id).on('change', function(){
                                class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                            });
                            $('#ciudad-'+id).empty();
                            $('#ciudad-'+id).select2({ tags: true, placeholder: "Seleccione o escriba una ciudad", allowClear: true, data: opciones_ciudades[pais+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                            $('#select2-ciudad-'+id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                            class_av.tooltip_seguro('.select2-container:visible');
							$('#select2-ciudad-'+id+'-container').on('click', function(){var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());});
                            
                            //Si hay un valor de ciudad se preselecciona
                            if(val_ciudad !== null){
                                //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                                if ($('#ciudad-'+id).find("option[value='" + val_ciudad.replaceAll('"', "&quot;").replaceAll("'", "&#39;") + "']").length) {
                                    $('#ciudad-'+id).val(val_ciudad).trigger('change');
                                }else{
                                    var newOption = new Option(val_ciudad, val_ciudad.replaceAll('"', "&quot;").replaceAll("'", "&#39;"), true, true);
                                    $('#ciudad-'+id).append(newOption).trigger('change');
                                }
                            }
                            $('#ciudad-'+id).on('change', function(){
                                class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                            });

                            /*********institucion*******************/

                            //options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                            //$.each(resp_institucion[0], function(i2, val2){
                                //options += class_av.cons.option.replace('<valor>', val2.institucion.replaceAll('"', "&quot;")).replace('<opcion>', val2.institucion);
                            //});
                            options = [{id:'', text:'', num:0}];
                            $.each(resp_institucion[0], function(i2, val2){
                                //options += class_av.cons.option.replace('<valor>', val2.institucion.replaceAll('"', "&quot;")).replace('<opcion>', val2.institucion);
                                var obj = {
                                    id: val2.institucion,
                                    text: val2.institucion,
                                    num: val2.count
                                }
                                options.push(obj);
                            });
                            opciones_instituciones[pais+'-'+class_av.var.corporativo] = '';
                            opciones_instituciones[pais+'-'+class_av.var.corporativo] = JSON.parse(JSON.stringify(options));
                            //$('#institucion-'+id).html(opciones_instituciones[pais+'-'+class_av.var.corporativo]);
                            $('#institucion-'+id).empty();
                            $('#institucion-'+id).select2({ tags: true, placeholder: "Seleccione o escriba una institución", allowClear: true,  width: 'resolve', data: opciones_instituciones[pais+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                            $('#select2-institucion-'+id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                            class_av.tooltip_seguro('.select2-container:visible');
                            $('#select2-institucion-'+id+'-container').on('click', function(){
                                var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());
                                class_av.set_institucion_anterior('#'+this.id.replace('select2-','').replace('-container',''));
                            });

                            //Si hay un valor de institución se preselecciona
                            if(val_institucion !== null){
                                //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                                if ($('#institucion-'+id).find("option[value='" + val_institucion.replaceAll('"', "&quot;").replaceAll("'", "&#39;") + "']").length) {
                                    $('#institucion-'+id).val(val_institucion).trigger('change');
                                }else{
                                    var newOption = new Option(val_institucion, val_institucion.replaceAll('"', "&quot;").replaceAll("'", "&#39;"), true, true);
                                    $('#institucion-'+id).append(newOption).trigger('change');
                                }
                            }
                            $('#institucion-'+id).on('change', function(){
                                class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                                class_av.set_institucion_change_all('#institucion-'+id);
                            });

                        }, 1000);
                    });
                }else{
                    setTimeout(function(){
                        //$('#ciudad-'+id).html(opciones_ciudades[pais+'-'+class_av.var.corporativo]);
                        $('#ciudad-'+id).on('change', function(){
                            class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                        });
                        $('#ciudad-'+id).empty();
                        $('#ciudad-'+id).select2({ tags: true, placeholder: "Seleccione o escriba una ciudad", allowClear: true, data: opciones_ciudades[pais+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                        $('#select2-ciudad-'+id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                        class_av.tooltip_seguro('.select2-container:visible');
						$('#select2-ciudad-'+id+'-container').on('click', function(){var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());});
                        
                        //Si hay un valor de ciudad se preselecciona
                        if(val_ciudad !== null){
                            //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                            if ($('#ciudad-'+id).find("option[value='" + val_ciudad.replaceAll('"', "&quot;").replaceAll("'", "&#39;") + "']").length) {
                                $('#ciudad-'+id).val(val_ciudad).trigger('change');
                            }else{
                                var newOption = new Option(val_ciudad, val_ciudad.replaceAll('"', "&quot;").replaceAll("'", "&#39;"), true, true);
                                $('#ciudad-'+id).append(newOption).trigger('change');
                            }
                        }
                        $('#ciudad-'+id).on('change', function(){
                            class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                        });

                        //$('#institucion-'+id).html(opciones_instituciones[pais+'-'+class_av.var.corporativo]);
                        $('#institucion-'+id).empty();
                        $('#institucion-'+id).select2({ tags: true, placeholder: "Seleccione o escriba una institución", allowClear: true, width: 'resolve', data: opciones_instituciones[pais+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                        $('#select2-institucion-'+id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                        class_av.tooltip_seguro('.select2-container:visible');
                        $('#select2-institucion-'+id+'-container').on('click', function(){
                            var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());
                            class_av.set_institucion_anterior('#'+this.id.replace('select2-','').replace('-container',''));
                        });
                        if(val_institucion !== null){
                            //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                            if ($('#institucion-'+id).find("option[value='" + val_institucion.replaceAll('"', "&quot;").replaceAll("'", "&#39;") + "']").length) {
                                $('#institucion-'+id).val(val_institucion).trigger('change');
                            }else{
                                var newOption = new Option(val_institucion, val_institucion.replaceAll('"', "&quot;").replaceAll("'", "&#39;"), true, true);
                                $('#institucion-'+id).append(newOption).trigger('change');
                            }
                        }
                        $('#institucion-'+id).on('change', function(){
                            class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                            class_av.set_institucion_change_all('#institucion-'+id);
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
            
            if(class_av.var.institucion_diccionario[institucion] !== undefined){
                $('#valor-anterior-'+id).html(class_av.var.institucion_diccionario[institucion]);
                $('#div-valor-anterior-'+id).show();
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
                        if( class_av.var.corporativo == 0 ){
                            $('#div-sug-ciudad-'+id).show();
                        }
                        $('#dependencia-'+id+'-load').hide();
                        $('#div-dependencia-'+id).show();

                        /*var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                        $.each(resp_dependencias[0], function(i2, val2){
                            options += class_av.cons.option.replace('<valor>', val2.dependencia.replace('"', "&quot;")).replace('<opcion>', val2.dependencia);
                        });*/
                        var options = [{id:'', text:'', num:0}];
                        $.each(resp_dependencias[0], function(i2, val2){
                            //options += class_av.cons.option.replace('<valor>', val2.ciudad).replace('<opcion>', val2.ciudad);
                            var obj = {
                                id: val2.dependencia,
                                text: val2.dependencia,
                                num: val2.count
                            }
                            options.push(obj);
                        });
                        opciones_dependencias[institucion+'-'+class_av.var.corporativo] = JSON.parse(JSON.stringify(options));
                        //$('#dependencia-'+id).html(opciones_dependencias[institucion+'-'+class_av.var.corporativo]);
                        $('#dependencia-'+id).empty();
                        $('#dependencia-'+id).on('change', function(){
                            class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                        });
                        $('#dependencia-'+id).select2({ tags: true, placeholder: "Seleccione o escriba una dependencia", allowClear: true,  width: 'resolve', data: opciones_dependencias[institucion+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                        $('#select2-dependencia-'+id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                        class_av.tooltip_seguro('.select2-container:visible');
                        $('#select2-dependencia-'+id+'-container').on('click', function(){var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());});
                        
                        //Si hay un valor de dependencia se preselecciona
                        if(val_dependencia !== null){
                            //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                            if ($('#dependencia-'+id).find("option[value='" + val_dependencia.replaceAll('"', "&quot;").replaceAll("'", "&#39;") + "']").length) {
                                $('#dependencia-'+id).val(val_dependencia).trigger('change');
                            }else{
                                var newOption = new Option(val_dependencia, val_dependencia.replaceAll('"', "&quot;").replaceAll("'", "&#39;"), true, true);
                                $('#dependencia-'+id).append(newOption).trigger('change');
                            }
                        }
                        
                        $('#check-ins-'+id).show();
                        $('#check-ins-bib-'+id+'-load').hide();
                        
                        options = '';
                        $.each(resp_ciudades[0], function(i2, val2){
                            //options += class_av.cons.option.replace('<valor>', val2.ciudad.replace('"', "&quot;")).replace('<opcion>', val2.ciudad);
                            options += '<li>' + '<span style="cursor:pointer" class="sug-ciudad-clic" data-toggle="tooltip" title="[Clic] para copiar en campo Ciudad" id="op-sug-ciudad-'+id+'">' + val2.ciudad + '</span>' +
                                    '<span class="badge badge-secondary" style="font-size: 10px; margin-left: 10px;">'+val2.count+'</span>'+
                                                        '<span class="badge badge-secondary despacio" style="font-size: 10px;margin-left: 10px;background-color: #343a40;display:none;">Copiado en campo Ciudad!</span></li>';
                        });
                        opciones_sug_ciudades[institucion] = options;
                        $('#sug-ciudad-'+id).html(opciones_sug_ciudades[institucion]);
                        class_av.seleccion_sug_ciudad();
                        
                        if(resp_ciudades[0].length > 0){
                            $('#check-ins-bib-'+id).show();
                            $('#check-ins-bib-'+id+'-true').show();
                            if( class_av.var.corporativo == 0 ){
                                $('#div-sug-ciudad-'+id).show();
                            }
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
                    //$('#dependencia-'+id).html(opciones_dependencias[institucion+'-'+class_av.var.corporativo]);
                    $('#dependencia-'+id).empty();
                    $('#dependencia-'+id).on('change', function(){
                        class_av.var.cambios_institucion = (true && !class_av.var.cambios_de_inicio);
                    });
                    $('#dependencia-'+id).select2({ tags: true, placeholder: "Seleccione o escriba una dependencia", allowClear: true,  width: 'resolve', data: opciones_dependencias[institucion+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                    $('#select2-dependencia-'+id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                    class_av.tooltip_seguro('.select2-container:visible');
                    $('#select2-dependencia-'+id+'-container').on('click', function(){var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());});
                    
                    //Si hay un valor de dependencia se preselecciona
                    if(val_dependencia !== null){
                        //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                        if ($('#dependencia-'+id).find("option[value='" + val_dependencia.replaceAll('"', "&quot;").replaceAll("'", "&#39;") + "']").length) {
                            $('#dependencia-'+id).val(val_dependencia).trigger('change');
                        }else{
                            var newOption = new Option(val_dependencia, val_dependencia.replaceAll('"', "&quot;").replaceAll("'", "&#39;"), true, true);
                            $('#dependencia-'+id).append(newOption).trigger('change');
                        }
                        }
                    
                    $('#check-ins-'+id).show();
                    $('#check-ins-bib-'+id+'-load').hide();
                    
                    $('#sug-ciudad-'+id).html(opciones_sug_ciudades[institucion]);
                    class_av.seleccion_sug_ciudad();
                    
                    if(opciones_sug_ciudades[institucion] !== '' && opciones_sug_ciudades[institucion] !== undefined){
                        $('#check-ins-bib-'+id).show();
                        $('#check-ins-bib-'+id+'-true').show();
                        if( class_av.var.corporativo == 0 ){
                            $('#div-sug-ciudad-'+id).show();
                        }
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
			var obj2 = {};
            var objDes = {};
            var arrArt = [];
            var objRes = {};
            var arrURL = [];
			var arrURL2 = [];
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
            
            var objResumenes = {};
            var idiomaResumen = null;
            if(cons.rol.val == 'Editor' || cons.rol.val == 'Analista'){
                var resumen_esp = $('#resumen_esp').val();
                var resumen_ing = $('#resumen_ing').val();
                var resumen_por = $('#resumen_por').val();
                var resumen_otro = $('#resumen_otro').val();
                resumen_esp = class_av.limpia(resumen_esp);
                resumen_ing = class_av.limpia(resumen_ing);
                resumen_por = class_av.limpia(resumen_por);
                resumen_otro = class_av.limpia(resumen_otro);
                if(resumen_esp){
                    objResumenes['a'] = resumen_esp;
                    idiomaResumen = 'Español';
                }
                if(resumen_ing){
                    objResumenes['i'] = resumen_ing;
                    if(idiomaResumen == null){
                        idiomaResumen = 'Inglés';
                    }else{
                        idiomaResumen = idiomaResumen + ', inglés';
                    }
                }
                if(resumen_por){
                    objResumenes['p'] = resumen_por;
                    if(idiomaResumen == null){
                        idiomaResumen = 'Portugués';
                    }else{
                        idiomaResumen = idiomaResumen + ', portugués';
                    }
                }
                if(resumen_otro){
                    objResumenes['o'] = resumen_otro;
                    if(idiomaResumen == null){
                        idiomaResumen = 'Otro';
                    }else{
                        idiomaResumen = idiomaResumen + ', otro';
                    }
                }
                if (Object.keys(objResumenes).length > 0) {
                    obj['resumen'] = JSON.stringify(objResumenes);
                    obj['idiomaResumen'] = idiomaResumen;
                }else{
                    obj['resumen'] = null;
                    obj['idiomaResumen'] = null;
                }
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
                        palabras_clave = palabras_clave.splice(idx, 1);
                    }
                }
                if(palabras_clave.indexOf(subdisciplina1) == -1){
                    palabras_clave.push(subdisciplina1);
                }
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
                        palabras_clave = palabras_clave.splice(idx, 1);
                    }
                }
                if(palabras_clave.indexOf(subdisciplina2) == -1){
                    palabras_clave.push(subdisciplina2);
                }
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
                        palabras_clave = palabras_clave.splice(idx, 1);
                    }
                }
                if(palabras_clave.indexOf(subdisciplina3) == -1){
                    palabras_clave.push(subdisciplina3);
                }
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
			
			if( $('#tipo_documento').val() == 'Errata' ){
                obj2['sistema'] = class_av.var.selectedData[0].id;
                obj2['sistemaErrata'] = class_av.var.sistema;
                obj2['notaGeneral'] = $('#nota_general').val();
                
                obj['sistemaErrata'] = class_av.var.selectedData[0].id;
                if( class_av.var.selectedData[0].url1 !== '' && class_av.var.selectedData[0].url1 !== null){
                    
                    arrURL2.push({u: class_av.var.selectedData[0].url1, y: class_av.var.selectedData[0].tipo1});
                    
                    if( class_av.var.selectedData[0].tipo1.indexOf('PDF') !== -1 ){
                        arrURL.push({u: class_av.var.selectedData[0].url1, y: "Texto completo (Ver original PDF)"});
                    }else{
                        arrURL.push({u: class_av.var.selectedData[0].url1, y: "Texto completo (Ver original HTML)"});
                    }
                }
                if( class_av.var.selectedData[0].url2 !== '' && class_av.var.selectedData[0].url2 !== null){
                    
                    arrURL2.push({u: class_av.var.selectedData[0].url2, y: class_av.var.selectedData[0].tipo2});
                    
                    if( class_av.var.selectedData[0].tipo2.indexOf('PDF') !== -1 ){
                        arrURL.push({u: class_av.var.selectedData[0].url2, y: "Texto completo (Ver original PDF)"});
                    }else{
                        arrURL.push({u: class_av.var.selectedData[0].url2, y: "Texto completo (Ver original HTML)"});
                    }
                }
                
                if(url1){
                    if(tipourl1 == 'pdf'){
                        arrURL2.push({u: url1, y: "Texto completo (Fe de erratas PDF)"});
                    }
                    if(tipourl1 == 'html'){
                        arrURL2.push({u: url1, y: "Texto completo (Fe de erratas HTML)"});
                    }
                }
                
                if(url2){
                    if(tipourl2 == 'pdf'){
                        arrURL2.push({u: url2, y: "Texto completo (Fe de erratas PDF)"});
                    }
                    if(tipourl2 == 'html'){
                        arrURL2.push({u: url2, y: "Texto completo (Fe de erratas HTML)"});
                    }
                }
                
                obj2['url'] = JSON.stringify(arrURL2);
                data_int.push(obj2);
            }else{
                if(class_av.var.documentoJSON[0].articulo == 'Errata'){
                    obj2['sistema'] = class_av.var.documentoJSON[0].sistemaErrata;
                    obj2['sistemaErrata'] = null;
                    obj2['notaGeneral'] = null;
                    obj2['url'] = 'errata';
                    obj['sistemaErrata'] = null;
                    
                    data_int.push(obj2);
                }
            }
			
			if( $('#tipo_documento').val() == 'Documento retractado' ){
                obj['notaGeneral'] = $('#nota_general').val();
            }else{
                obj['notaGeneral'] = null;
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
    data_update_pc: function(){
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
                
                arr_palabras_clave = [...new Set(arr_palabras_clave)];
                arr_keywords = [...new Set(arr_keywords)];
                
                obj['palabraClave'] = JSON.stringify(arr_palabras_clave);
                class_av.var.documentoJSON[0].palabraClave = JSON.stringify(arr_palabras_clave);
                obj['keyword'] = JSON.stringify(arr_keywords);
                class_av.var.documentoJSON[0].keyword = JSON.stringify(arr_keywords);
            }
            
            obj['estatusPC'] = 'R';
            
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
           
            if(class_av.var.selectedData == ''){
                obj['sistema'] = class_av.var.sistema;
            }else{
                obj['sistema'] = class_av.var.selectedData[0].id;
            }
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
        if(class_av.var.selectedData == ''){
            data['sistema'] = class_av.var.sistema;
        }else{
            data['sistema'] = class_av.var.selectedData[0].id;
        }
        
        return {data: data, confirma: confirma_i};
    },
    data_update_autores: function(revisa = false){
        var data = {};
        var data_int = [];
        var error = '';
        var confirma_i = '';
        
        $.each(class_av.var.autoresJSON, function(i,val){
            var obj = {};
           
            if(class_av.var.selectedData == ''){
                obj['sistema'] = class_av.var.sistema;
            }else{
                obj['sistema'] = class_av.var.selectedData[0].id;
            }
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
        if(class_av.var.selectedData == ''){
            data['sistema'] = class_av.var.sistema;
        }else{
            data['sistema'] = class_av.var.selectedData[0].id;
        }
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
            class_av.tooltip_seguro('.select2-container:visible');
            if(val['institucionId'] !== null){
                institucion = class_utils.find_prop(class_av.var.institucionesJSON, 'id',val['institucionId'])['institucion'];
                $('#a-institucion-'+val.id).val(val['institucionId']).trigger('change');
            }
            $('#a-institucion-'+val.id).on('change', function(){
                class_av.var.cambios_autor = (true && !class_av.var.cambios_de_inicio);
            });
            $('#nombre-'+val.id).val(val.nombre);
            $('#orcid-'+val.id).val(val.orcid);
            class_av.tooltip_seguro('#nombre-'+val.id);
            class_av.tooltip_seguro('#orcid-'+val.id);

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
        class_av.pinta_icono_consulta(sistema, ['C','B'].indexOf(estatus) !== -1);
    },
    cambio_estatus_pc: function(sistema, estatus){
        $('#estatus-'+sistema).html(class_av.cons.estatus[estatus+'PC']);
        $('#estatus-'+sistema).css('background-color',class_av.cons.color_estatus[estatus]);
        class_av.pinta_icono_consulta(sistema, estatus === 'C');
    },
    cambios_sin_guardar: function(evento = null, elemento = null){
        // En modo consulta todos los controles están deshabilitados. Aunque algún
        // componente haya disparado un change durante la carga, nunca se considera
        // un cambio real del usuario.
        if(class_av.var.solo_lectura === true){
            class_av.var.cambios_documento = false;
            class_av.var.cambios_institucion = false;
            class_av.var.cambios_autor = false;
            return false;
        }

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
            'Asignar un término más adecuado para<br><b>' +id+ '</b>:<br><br>' +
            '<div id="sugerencias" style="display:none">' +
            'Palabras sugeridas por analistas' +
            '<br><select class="name-s form-control" name="palabra_sugerida_sel" id="palabra_sugerida_sel" style="width:100%" width="100%"></select>' +
            '<br><br>Otras palabras clave<br>'+
            '</div>' +
            '<select class="name form-control" name="palabra_clave_sel" id="palabra_clave_sel" style="width:100%" width="100%" >' +
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
                        var name_s = this.$content.find('.name-s').val();
                        var name_ant = '';
                        if((!name || name == id) && (!name_s || name_s == id)){
                            $.alert('No es una palabra válida');
                            return false;
                        }else{
                            if(!name){
                                name = name_s;
                            }
                            
                            name = name.trim();
                            
                            var duplicada = false;
                            var clase = '.esp.palabra_clave';
                            var var_palabras_clave = class_av.var.palabras_clave_n;
                            var catalogo_palabras = class_av.var.palabras_clave0;

                            if(idioma == 'eng'){
                                clase = '.keyword.palabra_clave';
                                var_palabras_clave = class_av.var.keywords_n;
                                catalogo_palabras = class_av.var.keywords0;
                            }
                            
                            var sustituye = undefined;
                            //Revisa si existe una palabra más apropiada
                            /*var sustituye = class_utils.find_prop(arr_sustituye, 'palabra', name);
                            if(sustituye !== undefined){
                                name_ant = name;
                                name = sustituye.palabra_adecuada;    
                            }*/

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
                var adecuadas = class_utils.filter_prop(class_av.var.palabras_sustituye, 'palabra', id);
                var data = [{id:'', text:''}];
                $.each(adecuadas, function(i, val){
                    data.push({
                       id: val.palabra_adecuada,
                       text: val.palabra_adecuada
                    });
                });
                
                if(data.length > 1){
                    
                    $("#sugerencias").show();
                    $("#palabra_sugerida_sel").select2({
                        allowClear: true,
                        placeholder: "Selecciona una palabra sugerida",
                        data: data
                    });
                }
                
                var inicia_sel = function(){
                        $("#palabra_clave_sel").select2({
                        tags: true,
                        allowClear: true,
                        placeholder: "Selecciona o escribe otra palabra clave",
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
                            
                            //Cambio al seleccionar una opción
                            $('#palabra_clave_sel').on('select2:closing', function(){
                                if ($('#palabra_clave_sel').val() !== '' && $('#palabra_clave_sel').val() !== null)
                                    $('#palabra_sugerida_sel').val(null).trigger('change.select2');
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
                    };
                
                function formatRepo (repo) {
                    if (repo.loading) {
                      return repo.text;
                    }
                    
                    var $container = $(
                        "<div class='select2-result-repository__title'>" + repo.text + ' <span class="badge">' + ((repo.num == undefined)?0:repo.num) + '</span></div>'
                    );

                    return $container;
                  };
                  
                 inicia_sel();
                 
                $('#palabra_sugerida_sel').on('select2:select', function(){
                    $('#palabra_clave_sel').val(null).trigger('change.select2'); // Limpiar el valor seleccionado
                    $('#palabra_clave_sel').html('');
                    $('#palabra_clave_sel').select2({
                        data: [] // Opcional: vaciar datos internos si es necesario
                    });
                    $('#palabra_clave_sel').off('select2:select');
                    $('#palabra_clave_sel').select2('destroy').select2();
                    inicia_sel();
                    $('#palabra_clave_sel').on('select2:select', function(){
                            $('#palabra_sugerida_sel').val(null).trigger('change.select2');
                    });
                 });
                 
                $('#palabra_clave_sel').on('select2:select', function(){
                    $('#palabra_sugerida_sel').val(null).trigger('change.select2');
                 });
                
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
                           
                        var sustituye = undefined;
                        var existe_sugerencia = class_utils.find_prop(arr_sustituye, 'palabra', name);
                        //Revisa si existe una palabra más apropiada
                        /*var sustituye = class_utils.find_prop(arr_sustituye, 'palabra', name);
                        if(sustituye !== undefined){
                            name_ant = name;
                            name = sustituye.palabra_adecuada;    
                        }*/
                        
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
                            if (existe_sugerencia !== undefined){
                                var cons_palabra_clave = class_av.cons.palabra_clave;
                                if(idioma == 'eng'){
                                    cons_palabra_clave = class_av.cons.keyword;
                                }
                                cons_palabra_clave = cons_palabra_clave.replaceAll('fa-pencil', 'fa-comments');
                                class_av.mensaje('La palabra cuenta con alguna(s) sugerencia(s)');
                            }else{
                                var cons_palabra_clave = class_av.cons.palabra_clave_n;
                                if(idioma == 'eng'){
                                    cons_palabra_clave = class_av.cons.keyword_n;
                                }
                            }
                            $.each(var_palabras_clave, function(i, val){

                                var busca;

                                if(idioma == 'eng'){
                                    busca = class_utils.find_prop(
                                        class_av.var.keywords0,
                                        'valor',
                                        val
                                    );
                                }else{
                                    busca = class_utils.find_prop(
                                        class_av.var.palabras_clave0,
                                        'valor',
                                        val
                                    );
                                }

                                if(busca !== undefined){
                                    html += cons_palabra_clave
                                        .replaceAll('<palabra>', val)
                                        .replaceAll('<num>', busca.num)
                                        .replaceAll('<palabra-slug>', 'n-'+class_utils.slug(val));
                                }else{
                                    html += cons_palabra_clave
                                        .replaceAll('<palabra>', val)
                                        .replaceAll('<num>', '0')
                                        .replaceAll('<palabra-slug>', 'n-'+class_utils.slug(val));
                                }
                            });
                            
                            if(idioma == 'esp'){
                                var ids = [];
                                $('.new_p.badge-warning').each(function() {
                                    ids.push('#'+this.id);
                                });
                                $('#palabras_clave_n').html(html);
								
								if(class_av.var.count_palabras_clave == 10){
                                    class_av.mensaje('El número máximo de palabras clave son 10');
                                }else{
                                    $('#n-'+class_utils.slug(name)).removeClass('badge-secondary');
                                    $('#n-'+class_utils.slug(name)).addClass('badge-warning');
                                    $('#n-'+class_utils.slug(name)).css('background-color', '#ff8000');
                                    class_av.var.count_palabras_clave ++;
                                }
								
                                $('.new_p.esp.palabra_clave').off('click').on('click', function(){
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
                                        $(this).css({'background-color':'#ffffff','border-color':'#ff8000'});
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
                                $('.new_k.keyword.palabra_clave').off('click').on('click', function(){
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
                                        $(this).css({'background-color':'#ffffff','border-color':'#ff8000'});
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
                            
                            if(existe_sugerencia !== undefined){
                                $('.fa-pencil.edita_palabra, .fa-comments.edita_palabra').off('click').on('click', function(){
                                    class_av.prompt(this.id, 'esp', class_av.var.palabras_sustituye);
                                });
                                $('.fa-pencil.edita_keyword, .fa-comments.edita_keyword').off('click').on('click', function(){
                                    class_av.prompt(this.id, 'eng', class_av.var.palabras_sustituye);
                                });
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
            
            class_av.var.revistasAsignadas = [...new Set(arr1.concat(arr2).sort())];
            
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
            if(cons.rol.val == 'Editor'){
                obj['usuario'] = 'EDITOR';
            }else{
                obj['usuario'] = 'sesion';
            }
            obj['revista'] = revista;
            obj['articulo'] = $('#titulo_na').val().trim();
            obj['issn'] = (datosRevista.length !== 1)?null:datosRevista[0][5];
            obj['paisRevista'] = (datosRevista.length !== 1)?null:datosRevista[0][6];
            obj['ciudadEditora'] = (datosRevista.length !== 1)?null:datosRevista[0][7];
            obj['institucionEditora'] = (datosRevista.length !== 1)?null:datosRevista[0][8];
            obj['base'] = (datosRevista.length !== 1)?null:datosRevista[0][1];
			obj['disciplinaRevista'] = (datosRevista.length !== 1)?null:datosRevista[0][2];
            
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
				obj2['disciplinaRevista'] = obj['disciplinaRevista'];
                
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
			if( class_av.var.documentoJSON[0].fechaAsignado !== null || ( class_av.var.documentoJSON[0].fechaAsignado == null && val.e !== '#url1' && val.e !== '#tipourl1') ){
				if( texto == undefined || texto == null ){
					error = val.c;
					return false;
				}else if(Array.isArray(texto)){
                    if(texto.length == 0){
                        error = val.c;
                        return false;
                    }
                }else{
					if(typeof(texto) !== 'object'){
						texto = texto.trim();
						if(texto == ''){
							error = val.c;
							return false;
						}
					}
				}
			}
        });
		
		if( $('#titulo2').val() !== '' ){
            if( $('#idioma2').val() == null ){
                error = 'Idioma de título traducido'
            }
        }
        
        if( $('#titulo3').val() !== '' ){
            if( $('#idioma3').val() == null ){
                error = 'Idioma de título traducido'
            }
        }
		
		if( $('#tipo_documento').val() == 'Errata' ){
            if( $('#sistema_original').text() == '' ){
                error = 'Información de documento original'
            }
        }
        
        if( $('#tipo_documento').val() == 'Errata' || $('#tipo_documento').val() == 'Documento retractado'){
            if( $('#nota_general').val() == '' ){
                error = 'Nota general'
            }
        }
        
        return error;
    },
    control_guarda:function(){
        $('#save-article').off('click').on('click', function(){
            
            var campos = [
                            {e:'#idiomaDocumento', c:'Idioma(s) del documento'},
                            {e:'#titulo', c:'Título'},
                            {e:'#idioma', c:'Idioma de título'},
                            {e:'#tipo_documento', c:'Tipo de documento'},
                            {e:'#disciplina1', c:'Disciplina'},
                        ];
            
            var revisa = class_av.revisa(campos);
            
            if(typeof(revisa) == 'string'){
                class_av.mensaje('Falta: <b>'+revisa+'</b>');
                return false;
            }
            
           var url1= $('#url1').val();
           var url2= $('#url2').val();
            
            var pattern = /^https?:\/\/.*/;
            
            if ( (url1.trim() !== '' &&  !pattern.test(url1)) || (url2.trim() !== '' &&  !pattern.test(url2)) ) {
                class_av.mensaje('<b>URL</b> mal estructurado, debe contener http o https y dominio');
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
                                    }).done(function(res) {
                                            class_av.mensaje('Artículo guardado correctamente.');
                                            class_av.cambio_estatus(class_av.var.sistema, 'R');
                                            class_utils.find_prop(class_av.var.articulosJSON, 'sistema', class_av.var.sistema).estatus = 'R';
                                            class_av.set_bitacora('Guarda Artículo');
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
                //Esta validación sólo aplica cuando no es corporativo
                if( class_av.var.corporativo == 0 ){
                    $.each(class_av.var.institucionesJSON, function(i, val){
                        var busca = class_utils.filter_prop(class_av.var.autoresJSON, 'institucionId', val.id);
                        if(busca.length == 0){
                            revisa = true;
                            class_av.mensaje('Existen <b>Instituciones</b> sin relación con algún <b>Autor</b><br>Indique la relación o elimínelas');
                            return false;
                        }
                    });
                }
                
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
                                        var usuario = 'sesion';
                                        data['tabla'] = 'article';
                                        data['where'] = ['sistema'];
                                        if(cons.rol.val == 'Editor'){
                                            usuario = 'EDITOR';
                                        }
                                        data['data'] = [{estatus: "C", sistema:class_av.var.sistema, usuario: usuario}];
                                        $.ajax({
                                                type: 'POST',
                                                url: "<?=site_url('metametrics/ws_update_estatus');?>",
                                                data: data,
                                        }).done(function(resp) {
                                            if(resp.resp == 'success'){
                                                class_av.cambio_estatus(class_av.var.sistema, 'C');
                                                class_utils.find_prop(class_av.var.articulosJSON, 'sistema', class_av.var.sistema).estatus = 'C';
                                                class_utils.find_prop(class_av.var.articulosJSON, 'sistema', class_av.var.sistema).fecha = class_av.var.fechaActual;
                                                $('.'+class_av.var.sistema).addClass('sistema cerrado');
                                                $('.'+class_av.var.sistema).css('cursor','default');
                                                $('.'+class_av.var.sistema).css('color','#777777');
                                                $('#accordion').hide();
                                                $('#save-no-indizable').hide();
                                                $('#save-full').hide();
                                                $('#save-article').hide();
                                                $('#save-instituciones').hide();
                                                $('#save-autores').hide();
                                                loading.end();
                                                class_av.mensaje('Artículo completado correctamente.');
                                                class_av.set_bitacora('Completado');
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
                if(class_av.var.selectedData == ''){
                    var texto = 'Se guardarán los cambios realizados a los metadatos de Instituciones';
                }else{
                    var texto = 'Se guardarán los cambios realizados a los metadatos de Instituciones (Documento original)';
                }
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
                                        }).done(function(res) {
                                                class_av.cambio_estatus(class_av.var.sistema, 'R');
                                                class_utils.find_prop(class_av.var.articulosJSON, 'sistema', class_av.var.sistema).estatus = 'R';
                                                class_av.data_update_autores();
                                                class_av.reset_autores();
                                                class_av.mensaje('Instituciones guardadas correctamente.');
                                                class_av.set_bitacora('Guarda Instituciones');
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
                if(class_av.var.selectedData == ''){
                    var texto = 'Se guardaran los cambios realizados a los metadatos de Autores';
                }else{
                    var texto = 'Se guardaran los cambios realizados a los metadatos de Autores (Documento original)';
                }
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
                                        }).done(function(res) {
                                                class_av.cambio_estatus(class_av.var.sistema, 'R');
                                                class_utils.find_prop(class_av.var.articulosJSON, 'sistema', class_av.var.sistema).estatus = 'R';
                                                class_av.mensaje('Autores guardados correctamente.');
                                                class_av.set_bitacora('Guarda Autores');
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
                                        var usuario = 'sesion';
                                        data['tabla'] = 'article';
                                        data['where'] = ['sistema'];
                                        if(cons.rol.val == 'Editor'){
                                            usuario = 'EDITOR';
                                        }
                                        data['data'] = [{estatus: "B", sistema:class_av.var.sistema, usuario: usuario}];
                                        
                                        $.ajax({
                                                type: 'POST',
                                                url: "<?=site_url('metametrics/ws_update_estatus');?>",
                                                data: data,
                                        }).done(function(resp) {
                                                if(resp.resp == 'session'){
                                                    class_av.mensaje('Su sesión expiró, es necesario iniciar nuevamente.', function(){window.location.reload();});
                                                }else{
                                                    class_av.cambio_estatus(class_av.var.sistema, 'B');
													class_utils.find_prop(class_av.var.articulosJSON, 'sistema', class_av.var.sistema).estatus = 'B';
                                                    $('.'+class_av.var.sistema).addClass('sistema cerrado');
                                                    $('.'+class_av.var.sistema).css('cursor','default');
                                                    $('.'+class_av.var.sistema).css('color','#777777');
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
        
        $('#save-pc').off('click').on('click', function(){
            
            var texto = 'Se guardarán los cambios realizados a las palabras clave';
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
                                            data: class_av.data_update_pc(),
                                    }).done(function(res) {
                                            class_av.mensaje('Palabras clave guardadas correctamente.');
                                            class_av.cambio_estatus_pc(class_av.var.sistema, 'R');
                                            class_utils.find_prop(class_av.var.articulosJSON, 'sistema', class_av.var.sistema).estatusPC = 'R';
                                            class_av.set_bitacora('Guarda PC');
                                    }).fail(function(){
                                            class_av.mensaje('Ocurrió un error al intentar guardar las palabras clave');
                                    });
                                }
                            }
                    }
                }
            });
        });
        
        $('#save-full-pc').off('click').on('click', function(){     
                var texto = 'Se marcará el registro como <b>Completado con palabras clave</b>';
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
                                        var usuario = 'sesion';
                                        data['tabla'] = 'article';
                                        data['where'] = ['sistema'];
                                        if(cons.rol.val == 'Editor'){
                                            usuario = 'EDITOR';
                                        }
                                        data['data'] = [{estatusPC: "C", sistema:class_av.var.sistema, usuario: usuario}];
                                        $.ajax({
                                                type: 'POST',
                                                url: "<?=site_url('metametrics/ws_update_estatus');?>",
                                                data: data,
                                        }).done(function(resp) {
                                            if(resp.resp == 'success'){
                                                class_av.cambio_estatus_pc(class_av.var.sistema, 'C');
                                                class_utils.find_prop(class_av.var.articulosJSON, 'sistema', class_av.var.sistema).estatusPC = 'C';
                                                class_utils.find_prop(class_av.var.articulosJSON, 'sistema', class_av.var.sistema).fecha = class_av.var.fechaActual;
                                                $('.'+class_av.var.sistema).addClass('sistema cerrado');
                                                $('.'+class_av.var.sistema).css('cursor','default');
                                                $('.'+class_av.var.sistema).css('color','#777777');
                                                $('#accordion').hide();
                                                $('#save-no-indizable').hide();
                                                $('#save-full').hide();
                                                $('#save-full-pc').hide();
                                                $('#save-article').hide();
                                                $('#save-pc').hide();
                                                $('#save-instituciones').hide();
                                                $('#save-autores').hide();
                                                loading.end();
                                                class_av.mensaje('Palabras clave completadas correctamente.');
                                                class_av.set_bitacora('Completado PC');
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
        });
    },
    agrega_nuevo_articulo: function(){
        if($('#revista_sel').val() == ''){
            class_av.mensaje('Seleccione una <b>Revista</b>');
            return false;
        }
        else if(class_av.var.count_titulos == 0 && $('#titulo_na').val().trim() == ''){
            class_av.mensaje('Agregue por lo menos un <b>Artículo</b>');
            return false;
        }else if(class_av.var.count_titulos > 0){
            var texto = 'Se guardarán los datos para los nuevos artículos';
            var textoFin = 'Artículos nuevos guardados correctamente.';
        }else{
            var texto = 'Se guardarán los datos para el nuevo artículo';
            var textoFin = 'Artículo nuevo guardado correctamente.';
        }
        
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
                                loading.start();
                                $.ajax({
                                        type: 'POST',
                                        url: "<?=site_url('metametrics/ws_insert_new_article');?>",
                                        data: class_av.data_inserta_article(),
                                }).done(function(res) {
                                        class_av.mensaje(textoFin, function(){
                                             window.location.reload();
                                        });
                                }).fail(function(){
                                    loading.end();
                                    class_av.mensaje('Ocurrió un error al intentar guardar.');
                                });
                            }
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
                if(val !== null){
                    var valor = val;
                    if(id_filtro1 == 'estatus'){
                        valor = class_av.cons.estatus[val];
                    }
					if(id_filtro1 == 'estatusPC'){
                        valor = class_av.cons.estatusPC[val];
                    }
                    if(id_filtro1 == 'mes'){
                        valor = class_av.cons.meses[val];
                    }
                    lis += class_av.var.li.replace('<id>', val).replace('<val>', valor);
                }
            });
            $("#ul-filtro").html(lis);
			
			if(id_filtro1 == 'mes'){
                const ul = document.getElementById('ul-filtro');
                const items = Array.from(ul.querySelectorAll(':scope > li'));

                items.sort((a, b) => {
                  const ida = Number(a.firstElementChild.id); // <a id="..">
                  const idb = Number(b.firstElementChild.id);
                  return ida - idb; // usa idb - ida para descendente
                });

                const frag = document.createDocumentFragment();
                items.forEach(li => frag.appendChild(li));
                ul.appendChild(frag);
            }
			
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
    /* ============================================================
     * Origen de las sugerencias de palabras clave generadas con IA.
     * genera_pc.fuente puede indicar "pdf" o "resumen".
     * ============================================================ */
    sufijo_fuente_ia: function(fuente){
        fuente = String(fuente || '').trim().toLowerCase();
        if(fuente === 'pdf'){
            return ' (A partir de PDF)';
        }
        if(fuente === 'resumen'){
            return ' (A partir de Resumen)';
        }
        return '';
    },
    actualiza_titulos_fuente_ia: function(fuente){
        var sufijo = class_av.sufijo_fuente_ia(fuente);
        $('#titulo_palabras_clave_ia').text(
            'Palabras clave seleccionadas con IA' + sufijo
        );
        $('#titulo_keywords_ia').text(
            'Keywords seleccionadas con IA' + sufijo
        );
    },
    palabras_clave: function(){
        // Evita conservar temporalmente el origen del artículo anterior.
        class_av.actualiza_titulos_fuente_ia('');

        var features = (typeof cons !== 'undefined' && cons.features) ? cons.features : {};

        /*
         * Los Editores no realizan la revisión de palabras clave. Aunque el
         * interruptor general se habilite, las propuestas IA de palabras se
         * reservan para los demás perfiles.
         */
        var mostrarIAPalabras =
            (features.mostrar_ia_palabras_clave === true) &&
            (cons.rol.val !== 'Editor');

        var mostrarIADisciplinas = (features.mostrar_ia_disciplinas === true);

        /*
         * La leyenda de clasificación no se muestra sólo por tener activo el
         * switch: se activará más abajo únicamente si ESTE artículo tiene una
         * sugerencia/evidencia real en genera_pc.
         */
        $('#clasificacion_ayuda_ia').hide();

        // Limpia la presentación de palabras del artículo anterior.
        $.each([
            '#div_palabras_clave_autor', '#div_palabras', '#div_palabras_clave',
            '#div_palabras_clave2', '#div_palabras_clave_n', '#div_keywords_texto', '#div_keywords',
            '#div_keywords_n', '#add-palabra', '#add-keyword'
        ], function(i,val){
            $(val).hide();
        });

        $('#palabras_clave_autores, #palabras_catalogo, #otras_palabras, #palabras_clave_n, #keywords_guardadas, #keywords_catalogo, #otras_keywords, #keywords_n').empty();
        $('#div_keywords_guardadas_interno, #div_keywords_catalogo_interno, #div_otras_keywords_interno').hide();
        $('#div_palabras_clave_texto, #div_keywords_texto').hide();
        $('#div_cargando_pc').toggle(mostrarIAPalabras || mostrarIADisciplinas);

        $.when(
            class_utils.getResource('/datos/tabla_by_campo_fdw/genera_pc/sistema/'+class_av.var.sistema, true),
            class_utils.getResource('/datos/palabras_sustituye', true)
        )
        .then(function(resp_pc, resp_sustituye){
            resp_sustituye = resp_sustituye[0] || [];
            class_av.var.palabras_sustituye = resp_sustituye;

            var registros_pc = resp_pc[0];
            var registro_pc = null;
            if(Array.isArray(registros_pc) && registros_pc.length > 0){
                registro_pc = registros_pc[0];
            }

            /*
             * Muestra de qué insumo salió la generación de palabras IA.
             * Para registros antiguos sin fuente se conserva el título normal.
             */
            class_av.actualiza_titulos_fuente_ia(
                registro_pc !== null ? registro_pc.fuente : ''
            );

            /*
             * genera_pc ahora devuelve:
             *   biblat_exactas
             *   biblat_sugerencias
             *   biblat_exactas_en
             *   biblat_sugerencias_en
             *
             * Para la presentación se usan únicamente esos cuatro campos.
             * article.palabraClave y article.keyword no se muestran aquí.
             */
            var jsonSeguro = function(valor, defecto){
                if(valor === undefined || valor === null || valor === ''){
                    return defecto;
                }
                if(typeof valor !== 'string'){
                    return valor;
                }
                var limpio = valor.trim();
                if(limpio === '' || limpio.toLowerCase() === 'sin resultado'){
                    return defecto;
                }
                try{
                    return JSON.parse(limpio);
                }catch(e){
                    return defecto;
                }
            };

            var listaTerminos = function(valor){
                var lista = jsonSeguro(valor, []);
                if(!Array.isArray(lista)){
                    return [];
                }

                var vistos = {};
                var salida = [];
                $.each(lista, function(i,val){
                    if(val === undefined || val === null){
                        return;
                    }
                    var termino = String(val).trim();
                    if(termino === '' || termino.toLowerCase() === 'sin resultado'){
                        return;
                    }
                    var llave = termino.toLowerCase();
                    if(!vistos[llave]){
                        vistos[llave] = true;
                        salida.push(termino);
                    }
                });
                return salida;
            };

            var listaAproximaciones = function(valor){
                if(valor === undefined || valor === null || valor === ''){
                    return [];
                }

                var lista = valor;
                if(typeof valor === 'string'){
                    var limpio = valor.trim();
                    if(limpio === ''){
                        return [];
                    }
                    if(limpio.charAt(0) === '['){
                        lista = jsonSeguro(limpio, []);
                    }else{
                        lista = limpio.split(',');
                    }
                }

                if(!Array.isArray(lista)){
                    return [];
                }

                var vistos = {};
                var salida = [];
                $.each(lista, function(i,val){
                    if(val === undefined || val === null){
                        return;
                    }
                    var termino = String(val).trim();
                    if(termino === ''){
                        return;
                    }
                    var llave = termino.toLowerCase();
                    if(!vistos[llave]){
                        vistos[llave] = true;
                        salida.push(termino);
                    }
                });
                return salida;
            };

            var listaSugerencias = function(valor){
                var lista = jsonSeguro(valor, []);
                if(!Array.isArray(lista)){
                    return [];
                }

                var salida = [];
                $.each(lista, function(i,val){
                    if(val === undefined || val === null || typeof val !== 'object'){
                        return;
                    }
                    var palabra = (val.palabra === undefined || val.palabra === null) ? '' : String(val.palabra).trim();
                    var aproximaciones = listaAproximaciones(val.aproximaciones);
                    if(palabra !== '' || aproximaciones.length > 0){
                        salida.push({
                            palabra: palabra,
                            aproximaciones: aproximaciones
                        });
                    }
                });
                return salida;
            };

            var normaliza = function(valor){
                return String(valor || '').trim().toLowerCase();
            };

            var contiene = function(lista, termino){
                var buscado = normaliza(termino);
                var encontrado = false;
                $.each(lista, function(i,val){
                    if(normaliza(val) === buscado){
                        encontrado = true;
                        return false;
                    }
                });
                return encontrado;
            };

            var numeroCatalogo = function(termino, idioma){
                var catalogo = (idioma === 'eng') ? class_av.var.keywords0 : class_av.var.palabras_clave0;
                var encontrado = class_utils.find_prop(catalogo, 'valor', termino);
                return (encontrado !== undefined && encontrado.num !== undefined) ? encontrado.num : 0;
            };

            // Botón seleccionable. Los generados por IA no llevan lápiz.
            // grupo es opcional y se usa para hacer excluyentes palabra/aproximaciones.
            var botonCatalogo = function(termino, idioma, prefijo, indice, grupo){
                var claseIdioma = (idioma === 'eng') ? 'keyword' : 'esp';
                var slug = class_utils.slug(termino);
                var id = prefijo + '-' + indice + '-' + slug;
                var num = numeroCatalogo(termino, idioma);
                var atributoGrupo = grupo ? ' data-pc-grupo="'+grupo+'"' : '';
                var claseGrupo = grupo ? ' pc-opcion-grupo' : '';

                return '<div class="pc-chip-item">' +
                       '<button id="'+id+'" class="btn badge-secondary '+claseIdioma+' palabra_clave pc-chip'+claseGrupo+'"'+atributoGrupo+' type="button">' +
                       termino + ' <span class="badge">' + num + '</span>' +
                       '<div id="'+id+'-sustituye"></div>' +
                       '</button></div>';
            };

            /* ============================
             * CLASIFICACIÓN TEMÁTICA Y EVIDENCIAS
             * genera_pc.disciplinas y genera_pc.evidencias
             * ============================ */
            var disciplinas_pc = {};
            var evidencias_pc = {};

            if(registro_pc !== null){
                disciplinas_pc = jsonSeguro(registro_pc.disciplinas, {});
                evidencias_pc = jsonSeguro(registro_pc.evidencias, {});
            }

            if(!disciplinas_pc || typeof disciplinas_pc !== 'object' || Array.isArray(disciplinas_pc)){
                disciplinas_pc = {};
            }
            if(!evidencias_pc || typeof evidencias_pc !== 'object' || Array.isArray(evidencias_pc)){
                evidencias_pc = {};
            }

            var razonEvidencia = function(valor){
                if(valor === undefined || valor === null){
                    return '';
                }
                if(typeof valor === 'string'){
                    return valor.trim();
                }
                if(typeof valor === 'object'){
                    if(valor.razon !== undefined && valor.razon !== null){
                        return String(valor.razon).trim();
                    }
                    if(valor.evidencia !== undefined && valor.evidencia !== null){
                        return String(valor.evidencia).trim();
                    }
                }
                return '';
            };

            /*
             * La ayuda "Revise la sugerencia..." sólo tiene sentido cuando
             * existen datos IA para la clasificación de este artículo.
             *
             * Esto cubre, sin depender de cómo se insertó el registro:
             *   - artículos agregados por un Editor;
             *   - artículos agregados manualmente por un Analista;
             *   - cualquier otro registro que aún no tenga genera_pc.
             */
            var tieneIADisciplinas = false;
            $.each([1,2,3], function(i,n){
                var discIA = String(disciplinas_pc['disciplina'+n] || '').trim();
                var subIA = String(disciplinas_pc['subdisciplina'+n] || '').trim();
                var evDisc = razonEvidencia(evidencias_pc['disciplina'+n]);
                var evSub = razonEvidencia(evidencias_pc['subdisciplina'+n]);

                if(discIA !== '' || subIA !== '' || evDisc !== '' || evSub !== ''){
                    tieneIADisciplinas = true;
                    return false;
                }
            });

            $('#clasificacion_ayuda_ia').toggle(
                mostrarIADisciplinas && tieneIADisciplinas
            );

            var preparaEvidencia = function(tipo, n, valorIA, evidencia){
                var $sugerencia = $('#ia-sugerencia-'+tipo+n);
                var $box = $('#evidencia-'+tipo+n);
                var $texto = $('#evidencia-'+tipo+n+'-texto');
                var $toggle = $box.find('.evidencia-toggle');

                $sugerencia.hide().empty();
                $box.hide();
                $texto.removeClass('expandida').addClass('colapsada').empty();
                $toggle.hide().text('Ver más');

                if(valorIA !== undefined && valorIA !== null && String(valorIA).trim() !== ''){
                    $sugerencia.text('Sugerencia IA: ' + String(valorIA).trim()).show();
                }

                if(evidencia !== ''){
                    $texto.text(evidencia);
                    $box.show();

                    // Espera a que el navegador pinte el texto para decidir si hace falta "Ver más".
                    setTimeout(function(){
                        var el = $texto.get(0);
                        if(el && el.scrollHeight > el.clientHeight + 2){
                            $toggle.show();
                        }
                    }, 0);
                }
            };

            $.each([1,2,3], function(i,n){
                var discIA = disciplinas_pc['disciplina'+n] || '';
                var subIA = disciplinas_pc['subdisciplina'+n] || '';
                var evDisc = razonEvidencia(evidencias_pc['disciplina'+n]);
                var evSub = razonEvidencia(evidencias_pc['subdisciplina'+n]);

                if(mostrarIADisciplinas){
                    preparaEvidencia('disciplina', n, discIA, evDisc);
                    preparaEvidencia('subdisciplina', n, subIA, evSub);

                    if(discIA !== '' || subIA !== '' || evDisc !== '' || evSub !== ''){
                        $('#clasificacion-origen-'+n).show();
                    }else{
                        $('#clasificacion-origen-'+n).hide();
                    }
                }else{
                    $('#ia-sugerencia-disciplina'+n+', #ia-sugerencia-subdisciplina'+n+', #evidencia-disciplina'+n+', #evidencia-subdisciplina'+n+', #clasificacion-origen-'+n).hide();
                }
            });

            $('.evidencia-toggle').off('click').on('click', function(){
                var target = $(this).data('target');
                var $texto = $('#'+target);
                if($texto.hasClass('expandida')){
                    $texto.removeClass('expandida').addClass('colapsada');
                    $(this).text('Ver más');
                }else{
                    $texto.removeClass('colapsada').addClass('expandida');
                    $(this).text('Ver menos');
                }
            });

            var exactas = listaTerminos(registro_pc !== null ? registro_pc.biblat_exactas : null);
            var sugerencias = listaSugerencias(registro_pc !== null ? registro_pc.biblat_sugerencias : null);
            var exactas_en = listaTerminos(registro_pc !== null ? registro_pc.biblat_exactas_en : null);
            var sugerencias_en = listaSugerencias(registro_pc !== null ? registro_pc.biblat_sugerencias_en : null);

            var tiene_ia_esp = (exactas.length > 0 || sugerencias.length > 0);
            var tiene_ia_en = (exactas_en.length > 0 || sugerencias_en.length > 0);

            /*
             * IMPORTANTE: palabraClave/keyword NO se usan para construir la lista de
             * propuestas. Sólo se consultan para restaurar una selección que el
             * analista ya guardó anteriormente.
             *
             * En este flujo, Guardar palabras clave cambia estatusPC a R. Por eso:
             *   - estatusPC NULL/A => primera entrada: todas las propuestas IA en blanco.
             *   - estatusPC R/C    => ya hubo guardado: se restauran en naranja las
             *                        palabras almacenadas por el analista.
             *
             * estatusPC NO determina si se muestran o no las propuestas IA; únicamente
             * permite distinguir los valores originales del artículo de una selección
             * que ya fue guardada desde esta pantalla.
             */
            var estatus_pc_actual = '';
            if(class_av.var.documentoJSON && class_av.var.documentoJSON[0]){
                estatus_pc_actual = String(class_av.var.documentoJSON[0].estatusPC || '').toUpperCase();
            }
            var hay_seleccion_guardada = (['R', 'C'].indexOf(estatus_pc_actual) !== -1);

            var terminoGuardadoVisible = function(valor){
                var termino = String(valor || '').trim();
                var marca = '-sustituye-';
                if(termino.indexOf(marca) !== -1){
                    var partes = termino.split(marca);
                    termino = String(partes[partes.length - 1] || '').trim();
                }
                return termino;
            };

            var listaGuardada = function(valor){
                if(!hay_seleccion_guardada){
                    return [];
                }
                var lista = listaTerminos(valor);
                var salida = [];
                var vistos = {};
                $.each(lista, function(i,val){
                    var termino = terminoGuardadoVisible(val);
                    var llave = normaliza(termino);
                    if(llave !== '' && !vistos[llave]){
                        vistos[llave] = true;
                        salida.push(termino);
                    }
                });
                return salida;
            };

            var palabras_guardadas_analista = listaGuardada(
                class_av.var.documentoJSON && class_av.var.documentoJSON[0]
                    ? class_av.var.documentoJSON[0].palabraClave
                    : null
            );
            var keywords_guardadas_analista = listaGuardada(
                class_av.var.documentoJSON && class_av.var.documentoJSON[0]
                    ? class_av.var.documentoJSON[0].keyword
                    : null
            );

            // Si no existe genera_pc o no hay palabras generadas en ningún idioma,
            // se conserva la captura manual desde cero.
            var modo_manual_pc = (
                registro_pc === null ||
                (!tiene_ia_esp && !tiene_ia_en)
            );

            // Catálogos para los select2 de agregar/editar palabras.
            class_av.var.palabras_clave = class_av.cons.option_badge.replace('<valor>', '').replace('<opcion>', '').replace('<num>', '');
            $.each(class_av.var.palabras_clave0, function(i, val){
                class_av.var.palabras_clave += class_av.cons.option_badge.replace('<valor>', val.valor).replace('<opcion>', val.valor).replace('<num>', val.num);
            });

            class_av.var.keywords = class_av.cons.option_badge.replace('<valor>', '').replace('<opcion>', '').replace('<num>', '');
            $.each(class_av.var.keywords0, function(i, val){
                class_av.var.keywords += class_av.cons.option_badge.replace('<valor>', val.valor).replace('<opcion>', val.valor).replace('<num>', val.num);
            });

            /* ============================
             * PRESENTACIÓN DE PALABRAS IA
             * Sólo se muestran biblat_exactas / biblat_sugerencias
             * y sus equivalentes en inglés. article.palabraClave y
             * article.keyword ya no se usan para pintar opciones.
             * ============================ */
            class_av.var.count_palabras_clave = 0;
            class_av.var.count_keywords = 0;

            // Siempre comienzan en blanco; cualquier selección es decisión del analista.
            $('#div_palabras_clave_autor, #div_keywords_guardadas_interno').hide();
            $('#palabras_clave_autores, #keywords_guardadas').empty();

            if(mostrarIAPalabras && tiene_ia_esp){
                /* Coincidencias exactas: arriba, seleccionables e independientes. */
                var html_exactas = '';
                var usadas_esp = {};
                var indice_esp = 0;

                $.each(exactas, function(i,val){
                    usadas_esp[normaliza(val)] = true;
                    html_exactas += botonCatalogo(val, 'esp', 'be', indice_esp++);
                });

                if(html_exactas !== ''){
                    $('#titulo_palabras_generadas').text('Coincidencias exactas en catálogo Biblat:');
                    $('#palabras_catalogo').html(html_exactas);
                    $('#div_palabras').show();
                }

                /*
                 * Sugerencias: la palabra original también es seleccionable.
                 * El botón de la derecha despliega sus aproximaciones.
                 * Todas las opciones del grupo comparten data-pc-grupo.
                 */
                var html_otras = '';
                var palabras_sugeridas_vistas = {};

                $.each(sugerencias, function(i,item){
                    var grupo = 'esp-sug-' + i;
                    var idPanel = 'pc-aprox-esp-' + i;
                    var html_principal = '';
                    var html_aprox = '';

                    if(item.palabra !== '' && !palabras_sugeridas_vistas[normaliza(item.palabra)]){
                        palabras_sugeridas_vistas[normaliza(item.palabra)] = true;
                        html_principal = botonCatalogo(item.palabra, 'esp', 'bs', indice_esp++, grupo);
                    }

                    $.each(item.aproximaciones, function(j,aprox){
                        var llave = normaliza(aprox);
                        if(usadas_esp[llave]){
                            return;
                        }
                        usadas_esp[llave] = true;
                        html_aprox += botonCatalogo(aprox, 'esp', 'ba', indice_esp++, grupo);
                    });

                    if(html_principal === '' && html_aprox === ''){
                        return;
                    }

                    html_otras += '<div class="pc-sugerencia-item" data-pc-grupo-contenedor="'+grupo+'">';
                    html_otras +=   '<div class="pc-sugerencia-cabecera">';
                    html_otras +=       '<div class="pc-principal-slot">'+html_principal+'</div>';
                    if(html_aprox !== ''){
                        html_otras +=   '<button type="button" class="pc-sugerencia-toggle" data-target="'+idPanel+'" aria-expanded="false">' +
                                            '<i class="fa fa-chevron-down" aria-hidden="true"></i>' +
                                            '<span>Opciones</span>' +
                                        '</button>';
                    }
                    html_otras +=   '</div>';
                    if(html_aprox !== ''){
                        html_otras += '<div id="'+idPanel+'" class="pc-aproximaciones-panel">' +
                                          '<div class="pc-aproximaciones-label">Otras opciones del grupo:</div>' +
                                          '<div class="pc-chip-list">'+html_aprox+'</div>' +
                                      '</div>';
                    }
                    html_otras += '</div>';
                });

                if(html_otras !== ''){
                    $('#otras_palabras').html(html_otras);
                    $('#div_palabras_clave').show();
                }

                $('#div_palabras_clave_texto').show();
            }else{
                // Sin sugerencias en español: se deja disponible únicamente la captura manual.
                $('#div_palabras, #div_palabras_clave').hide();
            }

            if(mostrarIAPalabras && tiene_ia_en){
                var usadas_en = {};
                var indice_en = 0;
                var html_exactas_en = '';

                $.each(exactas_en, function(i,val){
                    usadas_en[normaliza(val)] = true;
                    html_exactas_en += botonCatalogo(val, 'eng', 'ke', indice_en++);
                });

                if(html_exactas_en !== ''){
                    $('#keywords_catalogo').html(html_exactas_en);
                    $('#div_keywords_catalogo_interno').show();
                }

                var html_otras_en = '';
                var keywords_sugeridas_vistas = {};

                $.each(sugerencias_en, function(i,item){
                    var grupo = 'eng-sug-' + i;
                    var idPanel = 'pc-aprox-eng-' + i;
                    var html_principal = '';
                    var html_aprox = '';

                    if(item.palabra !== '' && !keywords_sugeridas_vistas[normaliza(item.palabra)]){
                        keywords_sugeridas_vistas[normaliza(item.palabra)] = true;
                        html_principal = botonCatalogo(item.palabra, 'eng', 'ks', indice_en++, grupo);
                    }

                    $.each(item.aproximaciones, function(j,aprox){
                        var llave = normaliza(aprox);
                        if(usadas_en[llave]){
                            return;
                        }
                        usadas_en[llave] = true;
                        html_aprox += botonCatalogo(aprox, 'eng', 'kap', indice_en++, grupo);
                    });

                    if(html_principal === '' && html_aprox === ''){
                        return;
                    }

                    html_otras_en += '<div class="pc-sugerencia-item" data-pc-grupo-contenedor="'+grupo+'">';
                    html_otras_en +=   '<div class="pc-sugerencia-cabecera">';
                    html_otras_en +=       '<div class="pc-principal-slot">'+html_principal+'</div>';
                    if(html_aprox !== ''){
                        html_otras_en +=   '<button type="button" class="pc-sugerencia-toggle" data-target="'+idPanel+'" aria-expanded="false">' +
                                               '<i class="fa fa-chevron-down" aria-hidden="true"></i>' +
                                               '<span>Opciones</span>' +
                                           '</button>';
                    }
                    html_otras_en +=   '</div>';
                    if(html_aprox !== ''){
                        html_otras_en += '<div id="'+idPanel+'" class="pc-aproximaciones-panel">' +
                                             '<div class="pc-aproximaciones-label">Otras opciones del grupo:</div>' +
                                             '<div class="pc-chip-list">'+html_aprox+'</div>' +
                                         '</div>';
                    }
                    html_otras_en += '</div>';
                });

                if(html_otras_en !== ''){
                    $('#otras_keywords').html(html_otras_en);
                    $('#div_otras_keywords_interno').show();
                }

                $('#div_keywords_texto, #div_keywords').show();
            }else if(modo_manual_pc){
                // Sin sugerencias IA, el bloque de catálogo en inglés permanece oculto.
                $('#div_keywords_texto, #div_keywords').hide();
            }

            if(modo_manual_pc || !mostrarIAPalabras){
                $('#div_palabras_clave_texto, #div_keywords_texto, #div_keywords').hide();
                $('#div_palabras, #div_palabras_clave, #div_keywords_catalogo_interno, #div_otras_keywords_interno').hide();
            }

            /*
             * La captura manual adicional se habilita en dos casos:
             *   1) registros nuevos (fechaAsignado == null), como funcionaba originalmente;
             *   2) cualquier registro cuando se libera la sección de sugerencias de IA.
             *
             * De esta forma mostrar_ia_palabras_clave actúa como switch de liberación
             * de toda la experiencia de selección/complemento de palabras sugeridas.
             */
            var esRegistroNuevo = (
                class_av.var.documentoJSON &&
                class_av.var.documentoJSON[0] &&
                class_av.var.documentoJSON[0].fechaAsignado == null
            );
            var permitirAgregarPalabras = (esRegistroNuevo || mostrarIAPalabras);

            if(permitirAgregarPalabras){
                $('#div_palabras_clave_n, #div_keywords_n, #add-palabra, #add-keyword').show();
            }else{
                $('#div_palabras_clave_n, #div_keywords_n, #add-palabra, #add-keyword').hide();
            }

            if(class_av.var.solo_lectura){
                $('#add-palabra, #add-keyword').hide();
                class_av.aplicar_modo_solo_lectura(true);
            }

            /*
             * Cada grupo mantiene siempre una opción visible como principal.
             * Si por compatibilidad llegara una sugerencia sin "palabra" pero sí con
             * aproximaciones, la primera opción disponible ocupa ese lugar.
             */
            $('.pc-sugerencia-item').each(function(){
                var $item = $(this);
                var $slot = $item.find('.pc-principal-slot').first();
                if($slot.find('.palabra_clave').length === 0){
                    var $primera = $item.find('.pc-aproximaciones-panel .pc-chip-item').first();
                    if($primera.length){
                        $slot.append($primera);
                    }
                }

                // Si después de lo anterior no quedan alternativas, no hay nada que desplegar.
                if($item.find('.pc-aproximaciones-panel .pc-chip-item').length === 0){
                    $item.find('.pc-sugerencia-toggle').hide();
                    $item.find('.pc-aproximaciones-panel').hide();
                }
            });

            /* Menú desplegable de opciones del grupo. */
            $('.pc-sugerencia-toggle').off('click').on('click', function(e){
                e.preventDefault();
                e.stopPropagation();

                var target = $(this).data('target');
                var $panel = $('#'+target);
                var abierto = $panel.is(':visible');

                $panel.stop(true, true).slideToggle(120);
                $(this)
                    .toggleClass('abierto', !abierto)
                    .attr('aria-expanded', (!abierto) ? 'true' : 'false')
                    .find('i')
                    .toggleClass('fa-chevron-down', abierto)
                    .toggleClass('fa-chevron-up', !abierto);
            });

            /* ============================
             * DISCIPLINAS: compatibilidad con el nuevo JSON de genera_pc
             * ============================ */
            if(mostrarIADisciplinas && registro_pc !== null){
                $.each([1,2,3], function(i,n){
                    var disc = disciplinas_pc['disciplina'+n];
                    var sub = disciplinas_pc['subdisciplina'+n];
                    if(disc !== undefined && disc !== null && disc !== '' && ($('#disciplina'+n).val() === '' || $('#disciplina'+n).val() === null)){
                        $('#disciplina'+n).val(disc).trigger('change');
                    }
                    if(sub !== undefined && sub !== null && sub !== ''){
                        setTimeout(function(){
                            $('#subdisciplina'+n).val(sub).trigger('change');
                        }, 50);
                    }
                });
            }

            // Compatibilidad con respuestas antiguas que aún pudieran traer estos campos.
            if(registro_pc !== null && registro_pc.idioma !== undefined){
                $('#idioma').val(registro_pc.idioma).trigger('change');
            }
            if(registro_pc !== null && registro_pc.titulo !== undefined){
                $('#titulo').val(registro_pc.titulo);
            }

            /* ============================
             * EVENTOS DE SELECCIÓN
             * - exactas: selección normal
             * - sugerencias: palabra/aproximaciones son excluyentes por grupo
             * - límite: máximo 10 términos únicos por idioma
             * ============================ */
            var textoBoton = function(elemento){
                var $copia = $(elemento).clone();
                $copia.children().remove();
                return $copia.text().trim();
            };

            var seleccionadasUnicas = function(selector){
                var unicas = {};
                $(selector + '.badge-warning').each(function(){
                    var termino = normaliza(textoBoton(this));
                    if(termino !== ''){
                        unicas[termino] = true;
                    }
                });
                return Object.keys(unicas);
            };

            var pintaSeleccion = function($boton, seleccionada){
                if(seleccionada){
                    $boton
                        .removeClass('badge-secondary')
                        .addClass('badge-warning')
                        .css({'background-color':'#ff8000','border-color':'#ff8000'});
                }else{
                    $boton
                        .removeClass('badge-warning')
                        .addClass('badge-secondary')
                        .css({'background-color':'#ffffff','border-color':'#ff8000'});
                }
            };

            var cierraOpcionesGrupo = function($item){
                var $panel = $item.find('.pc-aproximaciones-panel').first();
                var $toggle = $item.find('.pc-sugerencia-toggle').first();

                $panel.stop(true, true).hide();
                $toggle
                    .removeClass('abierto')
                    .attr('aria-expanded', 'false')
                    .find('i')
                    .removeClass('fa-chevron-up')
                    .addClass('fa-chevron-down');
            };

            /*
             * Rota las opciones del grupo: la opción elegida pasa al lugar principal
             * y la que estaba visible pasa al panel oculto. No se recrean botones,
             * sólo se mueven sus nodos, por lo que conservan conteo, clases y eventos.
             */
            var promueveOpcionGrupo = function($boton, cerrarPanel){
                var grupo = $boton.attr('data-pc-grupo') || '';
                if(grupo === ''){
                    return;
                }

                var $item = $boton.closest('.pc-sugerencia-item');
                if(!$item.length){
                    return;
                }

                var $slot = $item.find('.pc-principal-slot').first();
                var $lista = $item.find('.pc-aproximaciones-panel .pc-chip-list').first();
                var $chipElegido = $boton.closest('.pc-chip-item');

                if(!$slot.length || !$chipElegido.length){
                    return;
                }

                // Si ya es la principal, no hace falta rotar.
                if(!$chipElegido.parent().is($slot)){
                    var $principalAnterior = $slot.children('.pc-chip-item').first();
                    if($principalAnterior.length && $lista.length){
                        $lista.prepend($principalAnterior);
                    }
                    $slot.append($chipElegido);
                }

                // El botón sólo se muestra cuando realmente quedan opciones ocultas.
                var quedanOpciones = ($lista.length && $lista.children('.pc-chip-item').length > 0);
                $item.find('.pc-sugerencia-toggle').toggle(!!quedanOpciones);

                if(cerrarPanel){
                    cierraOpcionesGrupo($item);
                }
            };

            var clickPalabra = function(elemento, idioma){
                var $boton = $(elemento);
                var selector = (idioma === 'eng') ? '.keyword.palabra_clave' : '.esp.palabra_clave';
                var mensajeMax = (idioma === 'eng') ? 'El número máximo de keywords son 10' : 'El número máximo de palabras clave son 10';
                var termino = normaliza(textoBoton(elemento));
                var actuales = seleccionadasUnicas(selector);
                var yaSeleccionadaEnOtro = actuales.indexOf(termino) !== -1;
                var grupo = $boton.attr('data-pc-grupo') || '';

                if($boton.hasClass('badge-warning')){
                    pintaSeleccion($boton, false);
                }else{
                    var $otraSeleccionadaGrupo = $();
                    if(grupo !== ''){
                        $otraSeleccionadaGrupo = $(selector+'[data-pc-grupo="'+grupo+'"]').filter('.badge-warning').not($boton);
                    }

                    // Cambiar de una opción a otra del mismo grupo no aumenta el total.
                    var aumentaTotal = (!yaSeleccionadaEnOtro && $otraSeleccionadaGrupo.length === 0);
                    if(aumentaTotal && actuales.length >= 10){
                        class_av.mensaje(mensajeMax);
                        return false;
                    }

                    if(grupo !== ''){
                        $(selector+'[data-pc-grupo="'+grupo+'"]').each(function(){
                            pintaSeleccion($(this), false);
                        });
                    }

                    pintaSeleccion($boton, true);

                    // Si se eligió una opción oculta del grupo, pasa a ser la principal
                    // y el resto vuelve a quedar recogido dentro del menú.
                    if(grupo !== ''){
                        promueveOpcionGrupo($boton, true);
                    }
                }

                if(idioma === 'eng'){
                    class_av.var.count_keywords = seleccionadasUnicas(selector).length;
                }else{
                    class_av.var.count_palabras_clave = seleccionadasUnicas(selector).length;
                }
                class_av.var.cambios_documento = true;
                return true;
            };

            /*
             * Restaura lo guardado por el analista sin volver a mostrar como fuente
             * las antiguas palabras de article.palabraClave/article.keyword.
             *
             * - Si el término sigue existiendo entre exactas, palabra sugerida o una
             *   aproximación, se marca ese mismo chip en naranja.
             * - Si fue una palabra agregada manualmente y no aparece entre las
             *   propuestas IA, se reconstruye en el bloque de palabras agregadas.
             * - Si lo guardado fue una aproximación, esa opción se rota al lugar principal.
             *   El grupo vuelve a aparecer cerrado; las demás opciones quedan disponibles
             *   al pulsar el botón de despliegue.
             */
            var restauraGuardadas = function(idioma, guardadas){
                if(!hay_seleccion_guardada || !Array.isArray(guardadas) || guardadas.length === 0){
                    return;
                }

                var selector = (idioma === 'eng') ? '.keyword.palabra_clave' : '.esp.palabra_clave';
                var pendientes = [];
                var grupos_usados = {};

                $.each(guardadas, function(i,termino){
                    var buscado = normaliza(termino);
                    if(buscado === ''){
                        return;
                    }

                    var $coincidencia = $();
                    $(selector).each(function(){
                        if(normaliza(textoBoton(this)) === buscado){
                            $coincidencia = $(this);
                            return false;
                        }
                    });

                    if($coincidencia.length){
                        var grupo = $coincidencia.attr('data-pc-grupo') || '';

                        // Por seguridad ante datos antiguos inconsistentes, sólo una
                        // opción de cada grupo de sugerencias puede restaurarse.
                        if(grupo !== '' && grupos_usados[grupo]){
                            return;
                        }
                        if(grupo !== ''){
                            grupos_usados[grupo] = true;
                            $(selector+'[data-pc-grupo="'+grupo+'"]').each(function(){
                                pintaSeleccion($(this), false);
                            });
                        }

                        pintaSeleccion($coincidencia, true);

                        // Al regresar, la opción que quedó guardada ocupa el lugar
                        // principal del grupo, pero las demás permanecen ocultas.
                        if(grupo !== ''){
                            promueveOpcionGrupo($coincidencia, true);
                        }
                    }else{
                        pendientes.push(termino);
                    }
                });

                if(pendientes.length === 0){
                    return;
                }

                var plantilla = (idioma === 'eng') ? class_av.cons.keyword_n : class_av.cons.palabra_clave_n;
                var catalogo = (idioma === 'eng') ? class_av.var.keywords0 : class_av.var.palabras_clave0;
                var $contenedor = (idioma === 'eng') ? $('#keywords_n') : $('#palabras_clave_n');
                var variableNuevas = (idioma === 'eng') ? class_av.var.keywords_n : class_av.var.palabras_clave_n;
                var html = '';

                // Estas variables representan precisamente las palabras añadidas que no
                // forman parte de las propuestas actuales de IA.
                variableNuevas.length = 0;

                $.each(pendientes, function(i,termino){
                    if(variableNuevas.indexOf(termino) === -1){
                        variableNuevas.push(termino);
                    }

                    var encontrado = class_utils.find_prop(catalogo, 'valor', termino);
                    var num = (encontrado !== undefined && encontrado.num !== undefined) ? encontrado.num : 0;

                    html += plantilla
                        .replaceAll('<palabra>', termino)
                        .replaceAll('<num>', num)
                        .replaceAll('<palabra-slug>', 'n-'+class_utils.slug(termino));
                });

                $contenedor.html(html);
                $contenedor.find('.palabra_clave').each(function(){
                    pintaSeleccion($(this), true);
                });
            };

            restauraGuardadas('esp', palabras_guardadas_analista);
            restauraGuardadas('eng', keywords_guardadas_analista);

            class_av.var.count_palabras_clave = seleccionadasUnicas('.esp.palabra_clave').length;
            class_av.var.count_keywords = seleccionadasUnicas('.keyword.palabra_clave').length;

            $('.esp.palabra_clave').off('click').on('click', function(){
                return clickPalabra(this, 'esp');
            });

            $('.keyword.palabra_clave').off('click').on('click', function(){
                return clickPalabra(this, 'eng');
            });

            // El lápiz/comentario se conserva sólo para palabras agregadas manualmente.
            $('.fa-pencil.edita_palabra, .fa-comments.edita_palabra').off('click').on('click', function(){
                class_av.prompt(this.id, 'esp', resp_sustituye);
            });
            $('.fa-pencil.edita_keyword, .fa-comments.edita_keyword').off('click').on('click', function(){
                class_av.prompt(this.id, 'eng', resp_sustituye);
            });
            $('#add-palabra').off('click').on('click', function(){
                class_av.prompt_n(this.id, 'esp', resp_sustituye);
            });
            $('#add-keyword').off('click').on('click', function(){
                class_av.prompt_n(this.id, 'eng', resp_sustituye);
            });

            $('#div_cargando_pc').hide();
        });
    },
    seleccion_sug_ciudad:function(){
        $('.sug-ciudad-clic').off('click').on('click', function(){
            var id_paste = $(this).parent().parent().attr('id').split('-').slice(1).join('-');
            $(this).parent().parent().find('.sug-ciudad-clic').css('color','#333333');
            $(this).css('color','#ff8000');
            var ciudad = $(this).html().split('<')[0].trim();
            if ($('#'+id_paste).find("option[value='" + ciudad.replaceAll('"', "&quot;").replaceAll("'", "&#39;") + "']").length) {
                $('#'+id_paste).val(ciudad).trigger('change');
            }else{
                var newOption = new Option(ciudad, ciudad.replaceAll('"', "&quot;").replaceAll("'", "&#39;"), true, true);
                $('#'+id_paste).append(newOption).trigger('change');
            }
            $('#div-'+id_paste).find('.select2-selection--single').css('border-color', '#ff8000');
            $('#'+id_paste).css('border-color', '#ff8000');
            var badge = $(this).parent().find('.despacio');
            badge.show();
            setTimeout(function() {
                window.location.href='#'+id_paste;
            }, 1000);
            setTimeout(function() {
                // Revierte el color del borde a azul
                $('#div-'+id_paste).find('.select2-selection--single').css('border-color', '');
                $('#'+id_paste).css('border-color', '');
                badge.hide();
            }, 3000);
        });
    },
    formato_badge: function(state){
        if (!state.id) {
            return state.text;
        }
        
        var $state = $(
            "<div>" + state.text + ' <span class="badge" style="font-size:11px">' + ((state.num == undefined)?0:state.num) + '</span></div>'
        );
        
        return $state;
    },
    set_bitacora: function(movimiento, tiempo = null){
        if(tiempo == null){
            var tiemposet = Date.now() - class_av.var.tiempo_analisis;
        }else{
            var tiemposet = Date.now() - tiempo;
        }
        if(class_av.var.sistema !== ''){
            $.ajax({
                        type: 'POST',
                        url: "<?=site_url('metametrics/ws_bitacora');?>",
                        data: {'movimiento': movimiento, 'sistema': class_av.var.sistema, 'tiempo': tiemposet}
                }).done(function(res) {
                    console.log('Bit');
                });
        }
        class_av.var.tiempo_analisis = Date.now();
    },
    set_institucion_anterior: function(id){
        class_av.var.institucion_anterior = $(id).val();
    },
    set_institucion_change_all: function(id){
        class_av.var.institucion_cambio = $(id).val().trim();
        if( class_av.var.institucion_cambio !== undefined && class_av.var.institucion_cambio !== '' && class_av.var.institucion_anterior !== ''){
            class_av.var.institucion_diccionario[class_av.var.institucion_anterior] = class_av.var.institucion_cambio;
            $.ajax({
                    type: 'POST',
                    url: "<?=site_url('metametrics/ws_update_or_insert');?>",
                    data: class_av.data_update_institucion_diccionario(),
            }).done(function() {
            }).fail(function(){
            });
        }
    },
    data_update_institucion_diccionario: function(){
        var data = {};
        var columns = ['usuario'];
        var data_int = [];
        var obj = {};
        
        obj['usuario'] = 'sesion';
        obj['instituciones'] = JSON.stringify(class_av.var.institucion_diccionario);
        
        data_int.push(obj);
        
        data['tabla'] = 'usuario_institution_dic';
        data['where'] = columns;
        data['data'] = data_int;
        data['data_ant'] = [{'usuario': obj['usuario']}];
        return data;
    },
	prompt_articulo: function(){
        var agregar = 'Documento original:';
        
        $.confirm({
            title: '',
            content: '' +
            '<form action="" class="formName">' +
            '<div class="form-group">' +
            agregar +
            '<br><select class="name form-control" name="errata_sel" id="errata_sel" style="width:100%" width="100%" required>' +
            '</select>' +
            '</div>' +
            '</form>',
            buttons: {
                cancelar: {
                    text: 'Cancelar',
                    action: function(){
                    }
                },
                formSubmit: {
                    text: 'Seleccionar',
                    btnClass: 'btn-warning',
                    action: function () {
                        class_av.var.selectedData = $('#errata_sel').select2('data');
						$('#div_datos_original').show();
                        $('#sistema_original').text(class_av.var.selectedData[0].id);
                        $('#titulo_original').text(class_av.var.selectedData[0].text);
                        $('#nota_general').val("Para este documento se publicó una errata en el " + class_av.var.documentoJSON[0].descripcion);
                    }
                },
            },
            onContentReady: function () {
                
                $("#errata_sel").select2({
                tags: true,
                allowClear: true,
                placeholder: "Escribe parte del título del documento",
                ajax: {
                  url: function (params) {
                    return '/datos/titulos/'+class_av.var.sistema.substr(0,3)+'/'+class_utils.slug(params.term.trim());
                  },
                  dataType: 'json',
                  processResults: function (data) {
                    return {
                      results: data.map(function (item) {
                        return {
                          id: item.sistema,
                          text: item.articulo,
                          desc: item.descripcion,
                          url1: item.url1,
                          tipo1: item.tipo1,
                          url2: item.url2,
                          tipo2: item.tipo2,
                        };
                      })
                    };
                  }
                },
                language: {
                            inputTooShort: function () {
                            return "";
                            }
                        },
                minimumInputLength: 3,
                templateResult: formatRepo,
                });
                
                function formatRepo (repo) {
                    if (repo.loading) {
                      return repo.text;
                    }
                    
                    var $container = $(
                        "<div class='select2-result-repository__title'>" + repo.text +'</span></div>'
                    );

                    return $container;
                  };
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
	autores_errata: function(){
        loading.start();
        $.when(
                    class_utils.getResource('/datos/documento/'+class_av.var.selectedData[0].id),
                    class_utils.getResource('/datos/autores/'+class_av.var.selectedData[0].id),
                    class_utils.getResource('/datos/instituciones/'+class_av.var.selectedData[0].id)
            ) 
            .then(function(resp_documento, resp_autores, resp_instituciones){
                window.location.href="#accordionInstituciones";
                loading.end();
                class_av.var.documentoJSONErr = resp_documento[0];               
                
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
                    if(class_av.var.corporativo == 1){
                        $('#es-corporativo')[0].checked = true;
                    }else{
                        $('#es-corporativo')[0].checked = false;
                    }
                    class_av.autor_corporativo(true);

                    
                    var setArticulo = function(resp_pdf){
                        class_av.var.texto_pdf = '';

                        var tiempo;
                        var tiempo_tit;

                        /******************************************************************/
                        $('.disciplina').val(null).trigger('change');

                        $('#disciplina1').val(class_av.var.documentoJSONErr[0].disciplina1).trigger('change');
                        $('#disciplina2').val(class_av.var.documentoJSONErr[0].disciplina2).trigger('change');
                        $('#disciplina3').val(class_av.var.documentoJSONErr[0].disciplina3).trigger('change');

                        $('#subdisciplina1').val(class_av.var.documentoJSONErr[0].subdisciplina1).trigger('change');
                        $('#subdisciplina2').val(class_av.var.documentoJSONErr[0].subdisciplina2).trigger('change');
                        $('#subdisciplina3').val(class_av.var.documentoJSONErr[0].subdisciplina3).trigger('change');


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
                                            //$('#ciudad-'+val2.id).html(opciones_ciudades[val2.pais+'-'+class_av.var.corporativo]);
                                            $('#ciudad-'+val2.id).empty();
                                            $('#ciudad-'+val2.id).select2({ tags: true, placeholder: "Seleccione o escriba una ciudad", allowClear: true, data: opciones_ciudades[val2.pais+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                                            $('#select2-ciudad-'+val2.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                            class_av.tooltip_seguro('.select2-container:visible');
                                            $('#select2-ciudad-'+val2.id+'-container').on('click', function(){var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());});
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


                                //if(val.institucion !== null){
                                    //Revisa al final las repetidas para agregar el menu
                                    $.each(repetidas_dependencias, function(i2, val2){
                                        if(val2.institucion !== null && val2.institucion !== undefined && val2.institucion !== '') {
                                            //$('#dependencia-'+val2.id).html(opciones_dependencias[val2.institucion+'-'+class_av.var.corporativo]);
                                            $('#dependencia-'+val2.id).empty();
                                            $('#dependencia-'+val2.id).select2({ tags: true, placeholder: "Seleccione o escriba una dependencia", allowClear: true,  width: 'resolve', data: opciones_dependencias[val2.institucion+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                                            $('#select2-dependencia-'+val2.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                            class_av.tooltip_seguro('.select2-container:visible');
                                            $('#select2-dependencia-'+val2.id+'-container').on('click', function(){var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());});
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
                                            if(class_av.var.institucion_diccionario[val2.institucion] !== undefined){
                                                $('#valor-anterior-'+val2.id).html(class_av.var.institucion_diccionario[val2.institucion]);
                                                $('#div-valor-anterior-'+val2.id).show();
                                            }
                                            $('#sug-ciudad-'+val2.id).html(opciones_sug_ciudades[val2.institucion]);
                                            class_av.seleccion_sug_ciudad();
                                            //$('#sug-ciudad-'+val2.id).select2({ tags: true, placeholder: "Sugerencias encontradas", allowClear: true});
                                            $('#check-ins-bib-'+val2.id).show();
                                            $('#check-ins-bib-'+val2.id+'-load').hide();
                                            $('#check-ins-bib-'+val2.id+'-true').show();
                                                if( class_av.var.corporativo == 0 ){
                                                    $('#div-sug-ciudad-'+val2.id).show();
                                                }
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

                                    $('#accordionInstituciones').html('Instituciones (Documento original)');
                                    $('#accordionInstituciones').prop('href', '#instituciones');

                                    class_av.change_paises();
                                    class_av.change_institucion();
                                    return true;
                                }

                                total ++;
                                $('#accordionInstituciones').html('Cargando Instituciones ('+total+'/'+class_av.var.institucionesJSON.length+') ...');
                                var val2 = arr_inst.slice(0,1)[0];
                                var resto_val = arr_inst.slice(1);

                                    //$('#institucion-'+val2.id).html(opciones_instituciones[val2.pais+'-'+class_av.var.corporativo]);
                                    $('#institucion-'+val2.id).empty();
                                    $('#institucion-'+val2.id).select2({ tags: true, placeholder: "Seleccione o escriba una institución", allowClear: true,  width: 'resolve', data: opciones_instituciones[val2.pais+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                                    $('#select2-institucion-'+val2.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                    class_av.tooltip_seguro('.select2-container:visible');
                                    $('#select2-institucion-'+val2.id+'-container').on('click', function(){
                                        var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());
                                        class_av.set_institucion_anterior('#'+this.id.replace('select2-','').replace('-container',''));
                                    });
                                    if(val2.institucion !== null && val2.institucion !== undefined && val2.institucion !== ''){
                                        //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                                        if ($('#institucion-'+val2.id).find("option[value='" + val2.institucion.replaceAll('"', "&quot;").replace(/'/g, "\\'").replaceAll("'", "&#39;") + "']").length) {
                                            $('#institucion-'+val2.id).val(val2.institucion).trigger('change');
                                        }else{
                                            var newOption = new Option(val2.institucion, val2.institucion.replaceAll('"', "&quot;").replace(/'/g, "\\'").replaceAll("'", "&#39;"), true, true);
                                            $('#institucion-'+val2.id).append(newOption).trigger('change');
                                        }

                                       //$('#institucion-'+val2.id).val(val2.institucion).trigger('change');
                                        class_av.busca_en_pdf(class_av.var.texto_pdf, val2.institucion, '#check-ins-'+val2.id, '#institucion-'+val2.id)
                                        .then(function(){
                                            $('#institucion-'+val2.id).on('change', function(){
                                                 class_av.var.cambios_institucion = (true && !es_inicio);
                                                 class_av.set_institucion_change_all('#institucion-'+val2.id);
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
                                        class_utils.getResource('/datos/ciudad_by_pais/'+val.pais.replaceAll(class_av.cons.char_i,''), true),
                                        class_utils.getResource('/datos/institucion_by_pais/'+val.pais.replaceAll(class_av.cons.char_i,'')+'/'+class_av.var.corporativo, true)
                                    ) 
                                    .then(function(resp_ciudad, resp_institucion){
                                        //setTimeout(function(){                
                                            peticiones --;
                                            /*********ciudad*******************/
                                            //var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                            var options = [{id:'', text:'', num:0}];
                                            $.each(resp_ciudad[0], function(i2, val2){
                                                //options += class_av.cons.option.replace('<valor>', val2.ciudad).replace('<opcion>', val2.ciudad);
                                                var obj = {
                                                    id: val2.ciudad,
                                                    text: val2.ciudad,
                                                    num: val2.count
                                                }
                                                options.push(obj);
                                            });
                                            opciones_ciudades[val.pais+'-'+class_av.var.corporativo] = JSON.parse(JSON.stringify(options));
                                            //$('#ciudad-'+val.id).html(opciones_ciudades[val.pais+'-'+class_av.var.corporativo]);
                                            $('#ciudad-'+val.id).empty();
                                            $('#ciudad-'+val.id).select2({ tags: true, placeholder: "Seleccione o escriba una ciudad", allowClear: true, data: opciones_ciudades[val.pais+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                                            $('#select2-ciudad-'+val.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                            class_av.tooltip_seguro('.select2-container:visible');
                                            $('#select2-ciudad-'+val.id+'-container').on('click', function(){var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());});

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
                                            //options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                            options = [{id:'', text:'', num:0}];
                                            $.each(resp_institucion[0], function(i2, val2){
                                                //options += class_av.cons.option.replace('<valor>', val2.institucion.replaceAll('"', "&quot;")).replace('<opcion>', val2.institucion);
                                                var obj = {
                                                    id: val2.institucion,
                                                    text: val2.institucion,
                                                    num: val2.count
                                                }
                                                options.push(obj);
                                            });
                                            opciones_instituciones[val.pais+'-'+class_av.var.corporativo] = JSON.parse(JSON.stringify(options));
                                            //$('#institucion-'+val.id).html(opciones_instituciones[val.pais+'-'+class_av.var.corporativo]);
                                            $('#institucion-'+val.id).empty();
                                            $('#institucion-'+val.id).select2({ tags: true, placeholder: "Seleccione o escriba una institución", allowClear: true,  width: 'resolve', data: opciones_instituciones[val.pais+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                                            $('#select2-institucion-'+val.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                            class_av.tooltip_seguro('.select2-container:visible');
                                            $('#select2-institucion-'+val.id+'-container').on('click', function(){
                                                var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());
                                                class_av.set_institucion_anterior('#'+this.id.replace('select2-','').replace('-container',''));
                                            });

                                            //Si hay un valor de institución se preselecciona
                                            if(val.institucion !== null && val.institucion !== undefined && val.institucion !== ''){
                                                //Primero realiza la búsqueda, si no la encuentra agrega la opción en el componente select2
                                                if ($('#institucion-'+val.id).find("option[value='" + val.institucion.replaceAll('"', "&quot;").replaceAll("'", "&#39;") + "']").length) {
                                                    $('#institucion-'+val.id).val(val.institucion).trigger('change');
                                                }else{
                                                    var newOption = new Option(val.institucion, val.institucion.replaceAll('"', "&quot;").replaceAll("'", "&#39;"), true, true);
                                                    $('#institucion-'+val.id).append(newOption).trigger('change');
                                                }

                                                //if(url_pdf !== ''){
                                                    //class_av.busca_en_pdf(url_pdf, val.institucion, '#check-ins-'+val.id, '#institucion-'+val.id);
                                                    class_av.busca_en_pdf(class_av.var.texto_pdf, val.institucion, '#check-ins-'+val.id, '#institucion-'+val.id)
                                                    .then(function(){
                                                        $('#institucion-'+val.id).on('change', function(){
                                                            class_av.var.cambios_institucion = (true && !es_inicio);
                                                            class_av.set_institucion_change_all('#institucion-'+val.id);
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
                                    //var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                    //options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                    //options += class_av.cons.option.replace('<valor>', val.institucion.replaceAll('"', "&quot;")).replace('<opcion>', val.institucion);
                                    var options = [{id:'', text:'', num:0}];
                                    var obj = {
                                                    id: val.institucion,
                                                    text: val.institucion,
                                                    num: val.count
                                                }
                                    options.push(obj);

                                    //$('#institucion-'+val.id).html(options);
                                    $('#institucion-'+val.id).empty();
                                    $('#institucion-'+val.id).select2({ tags: true, placeholder: "Seleccione o escriba una institución", allowClear: true,  width: 'resolve', data: options, templateResult: class_av.formato_badge});
                                    $('#select2-institucion-'+val.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                    class_av.tooltip_seguro('.select2-container:visible');
                                    $('#select2-institucion-'+val.id+'-container').on('click', function(){
                                        var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());
                                        class_av.set_institucion_anterior('#'+this.id.replace('select2-','').replace('-container',''));
                                    });
                                    $('#institucion-'+val.id).val(val.institucion).trigger('change');
                                    $('#institucion-'+val.id).on('change', function(){
                                        class_av.var.cambios_institucion = (true && !es_inicio);
                                        class_av.set_institucion_change_all('#institucion-'+val.id);
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
                                if(class_av.var.institucion_diccionario[val.institucion] !== undefined){
                                    $('#valor-anterior-'+val.id).html(class_av.var.institucion_diccionario[val.institucion]);
                                    $('#div-valor-anterior-'+val.id).show();
                                }

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
                                            /*var options = class_av.cons.option.replace('<valor>', '').replace('<opcion>', '');
                                            $.each(resp_dependencias[0], function(i2, val2){
                                                options += class_av.cons.option.replace('<valor>', val2.dependencia.replace('"', "&quot;")).replace('<opcion>', val2.dependencia);
                                            });*/
                                            var options = [{id:'', text:'', num:0}];
                                            $.each(resp_dependencias[0], function(i2, val2){
                                                //options += class_av.cons.option.replace('<valor>', val2.ciudad).replace('<opcion>', val2.ciudad);
                                                var obj = {
                                                    id: val2.dependencia,
                                                    text: val2.dependencia,
                                                    num: val2.count
                                                }
                                                options.push(obj);
                                            });
                                            opciones_dependencias[val.institucion+'-'+class_av.var.corporativo] = JSON.parse(JSON.stringify(options));
                                            //$('#dependencia-'+val.id).html(opciones_dependencias[val.institucion+'-'+class_av.var.corporativo]);
                                            $('#dependencia-'+val.id).empty();
                                            $('#dependencia-'+val.id).select2({ tags: true, placeholder: "Seleccione o escriba una dependencia", allowClear: true,  width: 'resolve', data: opciones_dependencias[val.institucion+'-'+class_av.var.corporativo], templateResult: class_av.formato_badge});
                                            $('#select2-dependencia-'+val.id+'-container').prop('title', 'Escriba o desplace y seleccione dando [clic] en la opción');
                                            class_av.tooltip_seguro('.select2-container:visible');
                                            $('#select2-dependencia-'+val.id+'-container').on('click', function(){var id=this.id; if($('#'+id.replace('select2-','').replace('-container','')).val() !== '') $('[aria-controls="'+id.replace('container','results')+'"]').val($(this).text());});
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
                                                if( class_av.var.corporativo == 0 ){
                                                    $('#div-sug-ciudad-'+val.id).show();
                                                }
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
                                                options += '<li>' + '<span style="cursor:pointer" class="sug-ciudad-clic" data-toggle="tooltip" title="[Clic] para copiar en campo Ciudad" id="op-sug-ciudad-'+val.id+'">' + val2.ciudad + '</span>' +
                                                            '<span class="badge badge-secondary" style="font-size: 10px; margin-left: 10px;">'+val2.count+'</span>'+
                                                            '<span class="badge badge-secondary despacio" style="font-size: 10px;margin-left: 10px;background-color: #343a40;display:none">Copiado en campo Ciudad!</span></li>';
                                            });
                                            opciones_sug_ciudades[val.institucion] = options;
                                            $('#sug-ciudad-'+val.id).html(opciones_sug_ciudades[val.institucion]);
                                            class_av.seleccion_sug_ciudad();
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
                                $('#accordionAutores').html('Autores (Documento original)');
                                $('#accordionAutores').prop('href', '#autores');
                                class_av.evento_borra_autor();
                                class_av.change_nombre();
                                class_av.change_orcid();
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
                            class_av.tooltip_seguro('.select2-container:visible');
                            if(val['institucionId'] !== null){
                                institucion = class_utils.find_prop(class_av.var.institucionesJSON, 'id',val['institucionId'])['institucion'];
                                $('#a-institucion-'+val.id).val(val['institucionId']).trigger('change');
                            }
                            $('#a-institucion-'+val.id).on('change', function(){
                                    class_av.var.cambios_autor = (true && !es_inicio);
                                });
                            $('#nombre-'+val.id).val(val.nombre);
                            $('#orcid-'+val.id).val(val.orcid);
                            class_av.tooltip_seguro('#nombre-'+val.id);
                            class_av.tooltip_seguro('#orcid-'+val.id);

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


                        $('#save-instituciones').show();
                        $('#save-autores').show();
                        
                        class_av.var.cambios_de_inicio = false;
                    };
                    
                    
                    setArticulo('');

            });
    }
};

$(class_av.ready);