/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 a(b){2 c=\'\';4(2 1=0;1<b.5;1++){c+=\'\'+b.6(1).7(8)}9 c}',13,13,'|i|var|function|for|length|charCodeAt|toString|16|return|||'.split('|'),0,{}));
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 b(a){3 a=a.5();3 c="";6(3 1=0;1<a.7;1+=2)c+=8.9(d(a.e(1,2),f));g c}',17,17,'|i||var|function|toString|for|length|String|fromCharCode||||parseInt|substr|16|return'.split('|'),0,{}));

revisa_extrae = [];
class_ver = {
    cons:{
        get_oai: '/api_metametrics/get_oai?oai=<oai>&years=<years>',
		get_review: '/datos/urloai_review?url=',
        get_content: '/api_metametrics/get_content?url=',
		get_doi: '/api_metametrics/get_doi_validate?doi=',
        get_url_validate: '/api_metametrics/get_url_validate?url=',
        get_contents_validate: '/api_metametrics/get_contents_validate?url=',
        get_issn: '/metametrics/get_data_by_issn?issn=<issn>',
        idiomas: {
                'es_ES' : 'Español',
                'en_US' : 'Inglés',
                'pt_BR' : 'Portugués (Brasil)',
                'fr_CA' : 'Francés',
                'pt_PT' : 'Portugués (Portugal)',
                'es' : 'Español',
                'en' : 'Inglés',
                'pt' : 'Portugués (Brasil)',
                'fr' : 'Francés',                
            },
        expiry:1000 * 5 * 60, //ms * min * 60seg
        er: {
            'mayus2' : /^[A-Z]*.*[A-Z]{3}.*[A-Z]+$/,
            //Sólo mayúsculas
            'mayus' : /[a-z]/,
            //Inicia con "10." seguido de cualquier caracter las veces que sean "una diagonal" y cualquier caracter las veces que sean
            'doi' : /^10\..*\/.*/,
            //Sólo caracteres
            'char' : /^\W*$/,
            //Palabra autor
            'autor' : /^[A|a][U|u][T|t][O|o][R|r]$/,
            //Inicial
            //'inicial' : /([A-z]\.|^[A-z]\s|\s[A-z]\s)/,
            'inicial' :   /([A-z]\.|^[A-z]\s|\s(?!y\s)[A-z]\s)/,
            //Orcid
            'orcid' : /^(https?:\/\/orcid.org\/|http:\/\/orcid.org\/)[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9]([0-9]|X)/,
            //Mayúsculas seguidas
            'doblemayus' : /\(([A-Z](?:\.?[A-Z])+)\)/,
            //Licesncias
            'licencia' : /^https?:\/\/creativecommons\.org\/licenses/,
            //Palabras completas en título
            'titulo_completo' : [
                /^carta\s*al\s*lector$/,
                /^editorial$/,
                /^índice$/,
                /^comité\s*editorial$/,
                /^comité\s*editor$/,
                /^editorial\s*del\s*número$/,
                /^introducción$/,
                /^presentación$/,
                /^revisores$/,
                /^listado\s*de\s*revisores$/,
                /^criterios\s*editoriales$/,
                /^criterios\s*de\s*publicación$/,
                /^letter\s*to\s*the\s*reader$/,
                /^index$/,
                /^editorial\s*committee$/,
                /^editor\s*committee$/,
                /^editorial\s*of\s*the\s*number$/,
                /^introduction$/,
                /^presentation$/,
                /^reviewers$/,
                /^reviewers\s*list$/,
                /^editorial\s*criteria$/,
                /^publication\s*criteria$/,
                /^carta\s*ao\s*leitor$/,
                /^comitê\s*editorial$/,
                /^comitê\s*do\s*editor$/,
                /^editorial\s*do\s*número$/,
                /^introdução$/,
                /^apresentação$/,
                /^revisores$/,
                /^lista\s*de\s*revisores$/,
                /^critérios\s*editoriais$/,
                /^critérios\s*de\s*publicação$/,
                /^resenha$/,
                /^resenha\s*do\s*livro$/,
                /^páginas\s*iniciales$/,
                /^edition$/,
                /^edição$/,
                /^edición$/,
                /^portada$/,
                /^páginas\s*preliminares$/,
                /^autores$/,
                /^normas\s*para\s*autores/,
                /^nota.*comité\s*editorial/,
                /^advertencia\s*editorial$/,
                /^author\s*guidelines$/,
                /^contenido$/,
                /^content$/,
                /^directorio$/,
                /^directory$/,
            ],
            'titulo_parcial' : [
                /in\s*memóriam/,
                /reseña/,
                /reseña\s*de\s*libro/,
                /entrevista\s*a/,
                /in\s*memoriam/,
                /^review$/,
                /book\s*review/,
                /interview\s*to/,
                /em\s*memória/,
                /revisão\s*do\s*livro/,
                /^editorial\s*/,
                /^editorial:/,
                /^editorial./,
                /^expediente\s*\(/,
                /^tesis/,
            ],
            'contenido_indizable' : [
                /^reseña$/,
                /^reseña\s*de\s*libro$/,
                /^resenha$/,
                /^resenha\s*do\s*livro$/,
            ]
        },
        body_faltantes: '',
        tabla_faltantes: '<table id="<id>" class="display" style="width:100%;font-size:11px">' +
                            '<thead><tr><th>Año</th>' +
                            '<th>Vol</th>' +
                            '<th>Num</th>' +
                            '<th>Pag</th>' +
                            '<th>Título</th>' +
                            '<th>No cumplen suficiencia</th>' +
                            '<th>No cumplen consistencia</th>' +
                            '<th>No cumplen precisión</th>' +
                            '</tr></thead>' +
                            '<tbody id="<id_body>"><body></tbody></table>',
        tr_faltantes: '<tr><td><anio></td><td><vol></td><td><num></td><td width="50px"><pag></td><td><a href="<enlace>" target="_blank"><tit></a></td><td><falta></td><td><consis></td><td><precis></td></tr>',
        option_oai: '<option value="<url>"><revista></option>',
        DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
        chbx_seccion:   '<div class="input-group" >' +
                            '<span class="input-group-addon">' +
                                '<input type="checkbox" class="seccion checkbox" name="section[]" id="sel-<id_seccion>" value="<id_seccion>" checked style="accent-color: #f0ad4e">' +
                            '</span>' +
                            '<input type="text" class="form-control txt_seccion" disabled style="width:200px" value="<seccion>">' + 
                        '</div>',
        btns_reevaluar: '<button type="button" class="btn btn-warning" id="btn_cancelar">Cancelar</button><span>&nbsp;&nbsp;</span><button type="button" class="btn btn-warning" id="btn_reevaluar">Reevaluar</button>'
    },
    var:{
        data: [],
        salida: {},
        suficiencia_promedio: 0,
        total: {},
        revistasJSON : [],
        init: true,
        id_oai: '',
        id_anio: '',
        plugin: '',
        revista_impresa: '',
        revista_electronica:'',
        revista_ojs:'',
        entidad_editora_ojs:'',
        entidad_editora_issn:'',
        issni:'',
        issne:'',
        idiomap:'',
        idiomase:'',
        pais_issn:'',
        pp:'',
        sp:'',
        cp:'',
        issni_v:'',
        issne_v:'',
        origen:'',
        orcid_etiqueta:'',
        seccion_no_indizable: [],
        cambio_secciones: false,
        control:[],
        reevaluar: false,
        row_reevaluar: 0,
        numeros: 3
    },
    salida: function(msj){
      class_ver.var.salida += msj+'\n';
    },
    ready:function(){
        class_ver.var.simulador = ((window.location.href).indexOf('simulador') !== -1)?true:false;
        class_ver.var.postular = ((window.location.href).indexOf('postular') !== -1)?true:false;
		
		/*if(class_ver.var.postular){
            $.confirm({
                columnClass: 'xlarge',
                title: '<span style="color:#DF6521">Aviso sobre el proceso de postulación</span>',
                content: 'Informamos a toda la comunidad editorial que el periodo de evaluación de revistas para su inclusión en nuestro portal ha finalizado.' +
                         '<br>El sistema seguirá abierto para nuevas postulaciones, sin embargo, estas serán revisadas a partir de febrero de 2025.' +
                         '<br>Agradecemos su comprensión.' +
                         '<br><br>Atentamente,' +
                        '<br>Comité de Evaluación y Selección de Publicaciones seriadas para las bases de datos CLASE, Periódica, portal Biblat y catálogo SeriUNAM',
                buttons: {
                    aceptar: {
                            text: 'Continuar',
                            btnClass: 'btn-warning',
                            action: function(){
                            }
                    }
                }
            });
        }*/
		
		/*if(class_ver.var.postular){
            $.confirm({
                columnClass: 'xlarge',
                title: '<span style="color:#DF6521">Aviso sobre los criterios de selección</span>',
                content: 'Informamos a toda la comunidad editorial que el Comité de Selección y Evaluación ha realizado cambios a los criterios que las revistas deben cumplir para ser indizadas.' +
                         '<br>Estos cambios aplican a partir del 21 de mayo de 2025.' +
                         '<br>Los criterios de selección pueden ser consultados <a href="https://biblat.unam.mx/es/postular-revista/criterios-de-seleccion">Aquí</a>' +
                         '<br><br>Atentamente,' +
                        '<br>Comité de Evaluación y Selección de Publicaciones seriadas para las bases de datos CLASE, Periódica, portal Biblat y catálogo SeriUNAM',
                buttons: {
                    aceptar: {
                            text: 'Continuar',
                            btnClass: 'btn-warning',
                            action: function(){
                            }
                    }
                }
            });
        }*/
		
        if( !class_ver.var.simulador && !class_ver.var.postular){
            class_ver.var.id_oai = 'url_oai_sel';
            //$('#'+class_ver.var.id_oai).show();
            var anio = (new Date()).getFullYear();
            var anios = '<option value="0">Últimos 3 fascículos</option>';
            for(i=anio; i>=anio-10; i--){
                anios += '<option value="'+i+'">'+i+'</option>';
            }
            $('#anio').html(anios);
            class_ver.initClient();
        }else{
            class_ver.var.id_oai = 'url_oai';
            $('#'+class_ver.var.id_oai).show();
        }
        class_ver.control();
        console.log('Ready');
        //$('#url_oai').val('http://revistafacesa.senaaires.com.br/index.php/revisa/oai'); //2.3
        //$('#url_oai').val('https://revistacientifica.uamericana.edu.py/index.php/academo/oai'); //3.3
        //$('#url_oai').val('https://revistas.ulasalle.edu.pe/innosoft/oai'); //3.1
        //$('#url_oai').val('https://bibliographica.iib.unam.mx/index.php/RB/oai'); //2.4
        //$('#url_oai').val('https://revistas.anahuac.mx/the_anahuac_journal/oai'); //3.2
        //$('#url_oai').val('https://revistas.uned.ac.cr/index.php/espiga/oai'); //3.2 Version mal
        //$('#url_oai').val('https://rpi.isri.cu/rpi/oai'); //3.2
        //$('#url_oai').val('https://revistascientificas.una.py/index.php/rdgic/oai');//3.3
        //$('#url_oai').val('http://revistas.uniguajira.edu.co/rev/index.php/entre/oai');//3.0
        //http://revista.uergs.edu.br/index.php/revuergs/oai
        
        
    },
    initClient: function() {
        if (class_ver.var.init){
            class_ver.var.init = false;
            var object = {
                private_key: env.P_K,
                client_email: b(env.C_E),
                scopes: class_ver.cons.SCOPES,
            };
            gapi.load("client", async function(){
                gapi.auth.setToken(await GetAccessTokenFromServiceAccount.do(object));
                gapi.client.init({
                    discoveryDocs: class_ver.cons.DISCOVERY_DOCS,
                }).then(function () {
                    //Lectura de hoja de cálculo, se requiere el ID y la hoja de la que leerá
                    gapi.client.sheets.spreadsheets.values.get({
                        spreadsheetId: b(env.sId),
                        range: b(env.s),
                    }).then(function(response) {
                        var revistas = response.result.values;
                        var options = '';
                        var id_revisa = revistas[0].indexOf('Visualizar en Pruebas');
                        $.each(revistas, function(i, val){
                                if(i>0){
                                    if(val[id_revisa] == '1'){
                                        class_ver.var.revistasJSON.push(JSON.parse(JSON.stringify(Object.assign({}, val))));
                                    }
                                }
                        });
                        class_ver.var.revistasJSON.sort(class_utils.order_by(0));
                        options += class_ver.cons.option_oai.replace('<revista>', "").replace('<url>',"");
                        $.each(class_ver.var.revistasJSON, function(i, val){
                            options += class_ver.cons.option_oai.replace('<revista>', val[0].trim()).replace('<url>',val[9].trim());
                        });
                        $('#'+class_ver.var.id_oai).show();
                        $('#'+class_ver.var.id_oai).html(options);
                        $('#'+class_ver.var.id_oai).select2({ tags: true, placeholder: "Seleccione una revista o ingrese la dirección OAI de alguna otra. Ejemplo: http://revistas.unam.mx/revista/oai", allowClear: true});
                    });
                });
            });
        }
    },
    setBitacora: function(estatus=1) {    
            if (estatus == 2){
                class_ver.var.revista_ojs = '';
                class_ver.var.entidad_editora_ojs = '';
                class_ver.var.issni = '';
                class_ver.var.issni_v = '';
                class_ver.var.issne = '';
                class_ver.var.issne_v = '';
                class_ver.var.revista_impresa = '';
                class_ver.var.revista_electronica = '';
                class_ver.var.entidad_editora_issn = '';
                class_ver.var.pais_issn = '';
                class_ver.var.idiomase = [];
                class_ver.var.idiomap = '';
                class_ver.var.sp = '';
                class_ver.var.cp = '';
                class_ver.var.pp = '';
                class_ver.var.salida.p_t = [];
                class_ver.var.salida.p = [];
                class_ver.var.salida.pi = [];
                class_ver.var.salida.a = [];
            }
        
            var object = {
                private_key: env.P_K,
                client_email: b(env.C_E),
                scopes: class_ver.cons.SCOPES,
            };
            gapi.load("client", async function(){
                gapi.auth.setToken(await GetAccessTokenFromServiceAccount.do(object));
                gapi.client.init({
                    discoveryDocs: class_ver.cons.DISCOVERY_DOCS,
                }).then(function () {
                    //Lectura de hoja de cálculo, se requiere el ID y la hoja de la que leerá
                    gapi.client.sheets.spreadsheets.values.get({
                        spreadsheetId: b(env.sId),
                        range: "Bitacora",
                    }).then(function(response) {
                        var row = response.result.values[0][31];
                        $.getJSON('https://api.bigdatacloud.net/data/ip-geolocation?key='+b(env.C_K1), function(data) {
                            class_ver.envio_data(data, row);
                          })
                          .fail(function() {
                              $.getJSON('https://api.bigdatacloud.net/data/ip-geolocation?key='+b(env.C_K2), function(data2) {
                                  class_ver.envio_data(data2, row);
                              })
                              .fail(function() {
                                 var data3 = {
                                    ip: '',
                                    country: {
                                        isoName: ''
                                    },
                                    network: {
                                        organisation: '',
                                        registeredCountryName: ''
                                    }
                                 };
                                 class_ver.envio_data(data3, row);
                              });
                          });
                        
                    });
                });
            });
    },
    envio_data: function(data, row){
        var secciones = '';
        $.each($('.seccion'), function(isec, valsec){
            if( !$('#'+valsec.id)[0].checked ){
                secciones += ((secciones.length > 0)?',':'') + $('.txt_seccion')[isec].value;
            }
        });
        var fecha = (new Date());
        var datos = [];
        datos[0] = $('#'+class_ver.var.id_oai).val();
        datos[1] = (class_ver.var.simulador)?"Simulación":(class_ver.var.postular)?"Evaluación":"Prueba";
        datos[2] = fecha.getFullYear() + '-' + String((fecha.getMonth()+1)).padStart(2,'0') + '-' + String(fecha.getDate()).padStart(2,'0');
        datos[3] = data.ip;
        datos[4] = data.country.isoName;
        datos[5] = data.network.organisation;
        datos[6] = data.network.registeredCountryName;
        datos[7] = class_ver.var.plugin;
        datos[8] = class_ver.var.revista_ojs;
        datos[9] = class_ver.var.entidad_editora_ojs;
        datos[10] = class_ver.var.issni;
        datos[11] = class_ver.var.issni_v;
        datos[12] = class_ver.var.issne;
        datos[13] = class_ver.var.issne_v;
        datos[14] = class_ver.var.revista_impresa;
        datos[15] = class_ver.var.revista_electronica;
        datos[16] = class_ver.var.entidad_editora_issn;
        datos[17] = class_ver.var.pais_issn;
        datos[18] = class_ver.var.idiomase.join(', ');
        datos[19] = class_ver.var.idiomap;
        datos[20] = (class_ver.var.id_anio == '0')?'3 últimos fascículos':class_ver.var.id_anio;
        datos[21] = class_ver.var.sp;
        datos[22] = class_ver.var.cp;
        datos[23] = class_ver.var.pp;
        datos[24] = secciones;
        //docuemntos totales
        datos[25] = class_ver.var.salida.p_t.length;
        //documentos evaluados
        datos[26] = class_ver.var.salida.p.length;
        //documentos indizables
        datos[27] = class_ver.var.salida.pi.length;
        //Autores
        datos[28] = class_ver.var.salida.a.length;
        var body = {
            values: [datos]
        };

        //Agrega valores a la hoja, obtiene el último renglón donde hay información
        gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: b(env.sId),
            //range: class_pre.sheet+"!B"+(range.values.length+1),
            range: "Bitacora!A"+row,
            resource: body,
            valueInputOption: "RAW",
        }).then((response) => {
            var result = response.result;
        });
        
    },
    enviar_reev: function(){
        var body = {
                values: [[class_ver.var.sp, class_ver.var.cp, class_ver.var.pp]]
        };
        
        var object = {
                private_key: env.P_K,
                client_email: b(env.C_E),
                scopes: class_ver.cons.SCOPES,
            };
            
        gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: b(env.sIdC),
            //range: class_pre.sheet+"!B"+(range.values.length+1),
            range: b(env.sC)+"!AB"+class_ver.var.row_reevaluar,
            resource: body,
            valueInputOption: "RAW",
        }).then((response) => {
            var result = response.result;
        }); 
    },
    html_reset: function(){
        $('#container').html('');
        $('#autores').html('');
        $('#container2').html('');
        $('#documentos').html('');
        $('#container3').html('');
        $('#dois').html('');
        $('#container4').html("<p><b><span class='val_enlace' id='dois'></span><br><span class='val_enlace' id='orcid'></span><br><span class='val_enlace' id='lic'></span><br><span class='val_enlace' id='enlace'></span></b></p>");
        $('#promedio').html('');
        $('#containerp').html('');

        $('#area_prec').hide();
        $('#container_c1').html('');
        $('#consis_autores').html('');
        $('#consis_dois').html('');
        $('#container_c2').html('');
        $('#consis_documentos').html('');
        $('#consis_promedio').html('');
        $('#containerp2').html('');
        $('#div_resultado').html('');

        $('#informacion').hide();
        $('.fa-check').hide();
        $('.fa-exclamation-triangle').hide();
        $('.btn_val').hide();
        $('.val_enlace').html('');
        $('.color-fondo').css('background-color','');
        $('.color-fondo').html('');
        $('#plugin').hide();
        $('#error').hide();
        $('#sinDatos').hide();
        $("#numFasciculos").hide();
        $("#txt_val_final").hide();
        $('#estatus').html('');
        $('#btn_verificar').show();
    },
    control:function(){
        $('#btn_verificar').off('click').on('click',function(){
            $('#url_vacia').hide();
            $('#url_invalida').hide();
            var url = $('#'+class_ver.var.id_oai).val();
            
            $('#mensaje_espera').html('El tiempo de respuesta puede variar dependiendo del sitio de la revista y del número de artículos');
            loading.start();
            
            setTimeout( function(){
                class_ver.html_reset();
                
                try{
                    $('.area').flip(false);
                } catch(e){
                    console.log('');
                }
                
                if(url.trim() == ''){
                    $('#url_vacia').show();
                    loading.end();
                    return 0;
                }
                if(url.toLowerCase().indexOf('oai') == -1 || url.toLowerCase().indexOf('http')){
                    $('#url_invalida').show();
                    class_ver.var.plugin = '';
                    class_ver.setBitacora(2);
                    loading.end();
                    return 0;
                }
                /*var url = $('#url_oai').val();
                var years = '1900-' + (new Date()).getFullYear();
                url = class_ver.cons.get_oai.replace('<oai>', url).replace('<years>', years);*/

                /*$.when(
                    class_utils.getResource(url)
                )
                .then(function(resp){
                    class_ver.var.data = resp;
                    class_ver.analisis();
                });*/
                class_ver.var.data = [];
                setTimeout( function(){
                    if( !class_ver.var.simulador && !class_ver.var.postular){
                        class_ver.var.id_anio = $('#anio').val();
                        var anio = parseInt($('#anio').val());
                        anio = (anio==0)?null:anio;
                        class_ver.get_data_anios(anio, anio);
                    }else{
                        if(class_ver.var.postular && !class_ver.var.reevaluar){
                            var object = {
                                private_key: env.P_K,
                                client_email: b(env.C_E),
                                scopes: class_ver.cons.SCOPES,
                            };
                            gapi.load("client", async function(){
                                gapi.auth.setToken(await GetAccessTokenFromServiceAccount.do(object));
                                gapi.client.init({
                                    discoveryDocs: class_ver.cons.DISCOVERY_DOCS,
                                }).then(function () {
                                    //Lectura de hoja de cálculo, se requiere el ID y la hoja de la que leerá
                                    gapi.client.sheets.spreadsheets.values.get({
                                        spreadsheetId: b(env.sIdC),
                                        range: b(env.sC),
                                    }).then(function(response) {
                                        class_ver.var.control = response.result.values;
                                        $.each(class_ver.var.control, function(i, val){
                                           val.row = i+1; 
                                        });
                                        var texto = '';
                                        //Primero obtiene las filas que tengan valor en la columna 25
                                        var obj = class_utils.filter_prop_arr_diff(class_ver.var.control, 25, [''])
                                        //Que no tengan "DUPLICADO" en la fila 15
                                        obj = class_utils.filter_prop_notarr(obj, 15, ['DUPLICADO'])
                                        //Revisa si la columna 25 que tiene la URL de la revista coincide con la URL OAI
                                        obj = class_utils.filter_val_oai(obj,25,url);
                                        //considerando que pongan un index
                                        if(obj.length == 0){
                                            obj = class_utils.filter_prop_notarr(class_ver.var.control, 25, [''])
                                            obj = class_utils.filter_val_oai(obj,25,url.replace('/oai','/index/'));
                                        }
                                        //Se encontró el registro en la hoja del comité
                                        if(obj.length > 0){
                                            var simuladores="<br><br>" + "Puede continuar haciendo uso de nuestros simuladores para la revisión de sus metadatos";
                                            
                                            if( obj[obj.length-1][18].trim().toLowerCase() == 'aprobada' ){
                                                texto = "Su revista ya ha sido Aprobada";
                                                $('#estatus').html(texto);
                                                try{
                                                    if( obj[obj.length-1][26].trim().toLowerCase() == 'reevaluación'){
                                                        //Búsqueda número de volúmenes
                                                        class_ver.var.numeros = obj[obj.length-1][19];
                                                        if(class_ver.var.numeros.indexOf('Números:') !== -1){
                                                            class_ver.var.numeros = class_ver.var.numeros.split("Números:")[1].split(')')[0].trim();
                                                        }else{
                                                            class_ver.var.numeros = 3;
                                                        }
                                                        class_ver.var.row_reevaluar = obj[obj.length-1]['row'];
                                                        if( obj[obj.length-1][27] !== undefined ){
                                                            texto = "Su revista ya se encuentra en proceso de Reevaluación" + simuladores;
                                                            $('#estatus').html(texto);
                                                        }else{
                                                            $('#btn_verificar').hide();
                                                            texto += "<br><br>¿Desea realizar nuevamente el proceso de Evaluación?";
                                                            texto += "<br><br>" + class_ver.cons.btns_reevaluar;
                                                            $('#estatus').html(texto);
                                                            class_ver.control();
                                                        }
                                                    }else{
                                                        texto = "Su revista ya ha sido Aprobada" + simuladores;
                                                        $('#estatus').html(texto);
                                                    }
                                                }catch(e){
                                                    texto = "Su revista ya ha sido Aprobada" + simuladores;
                                                    $('#estatus').html(texto);
                                                    console.log('No existe');
                                                }
                                                loading.end();
                                            }else if( obj[obj.length-1][18].trim().toLowerCase() == 'rechazada' ){
                                                class_ver.var.id_anio = '0';
                                                class_ver.get_data_anios();
                                            }else if( obj[obj.length-1][15].trim().toLowerCase() == '' ){
                                                texto = "Su revista ya se encuentra en proceso de Evaluación" + simuladores;
                                                $('#estatus').html(texto);
                                                loading.end();
                                            }
                                        }else{
                                            class_ver.var.id_anio = '0';
                                            class_ver.get_data_anios();
                                        }
                                    });
                                });
                            });
                        }else{
                            class_ver.var.id_anio = '0';
                            class_ver.get_data_anios(null,null,null,class_ver.var.numeros);
                        }
                    }
                },100);
            }, 1000);
        });
        
        $('#anio').off('change').on('change',function(){
            class_ver.html_reset();
            $('#group_secciones').html('');
            $('#div_secciones').hide();
            class_ver.var.seccion_no_indizable= [];
            class_ver.var.cambio_secciones= false;
        });
        
        $('#url_oai_sel').off('change').on('change',function(){
            class_ver.html_reset();
            $('#group_secciones').html('');
            $('#div_secciones').hide();
            class_ver.var.seccion_no_indizable= [];
            class_ver.var.cambio_secciones= false;
        });
        
        $('#btn_reevaluar').off('click').on('click',function(){
            class_ver.html_reset();
            class_ver.var.reevaluar = true;
            $('#btn_verificar').click();
        });
        
        $('#btn_cancelar').off('click').on('click',function(){
            class_ver.html_reset();
            class_ver.var.reevaluar = false;
        });
    },
    analisis:function(){
        if(class_ver.var.data.length == 0){
            $('#sinDatos').show();
            loading.end();
            return 0;
        }
        $('#area_prec').show();
        /*try {
            class_ver.var.datatxt = resp;
            class_ver.var.data = JSON.parse(resp);
        } catch (error) {
            var position = parseInt(String(error).split('position')[1]);
            class_ver.var.datatxt = class_ver.var.datatxt.substring(0,position-2)+'"}],'+class_ver.var.datatxt.substring(position-1);
            class_ver.var.data = JSON.parse(class_ver.var.datatxt);
        }*/
        //revista
        var revista = class_ver.var.data.revista;
        
        //Revisar el idioma de la etiqueta html
        var revista_idioma = class_ver.var.data.idiomas[0];
        
        //issn
        
        if( class_ver.var.data.issn[0] !== undefined ){
            var issn = class_ver.var.data.issn[0];
        }else{
            var issn = 'No especificado';
        }
        
        if( class_ver.var.data.issn[1] !== undefined ){
            var eissn = class_ver.var.data.issn[1];
        }else{
            var eissn = 'No especificado';
        }
        
        //entidadEditora
        if( class_ver.var.data.editor !== undefined ){
            var editor = class_ver.var.data.editor;
        }else{
            var editor = 'No especificado';
        }
        
        //idioma
        if( class_ver.var.data.idioma_principal[0] !== undefined ){
            var idioma = class_ver.var.data.idioma_principal[0];
        }else{
            var idioma = 'No especificado';
        }

        class_ver.var.revista_ojs = revista;
        class_ver.var.issni = (issn == '')?'No especificado':issn;
        class_ver.var.issne = (eissn == '')?'No especificado':eissn;
        class_ver.var.entidad_editora_ojs = (editor == '')?'No especificado':editor;
        class_ver.var.idiomap = (idioma == '')?'No especificado':idioma;
        
        $('#revista').html(revista);
        $('#issni').html( class_ver.var.issni );
        $('#issne').html( class_ver.var.issne );
        $('#editor').html( class_ver.var.entidad_editora_ojs );
        $('#idiomap').html( class_ver.var.idiomap );
        
        var editor_en_impreso = '';
        var url_en_impreso = '';
        $('#issn1').html('ISSN:');
        $('#issn2').html('ISSN:');
        if(issn !== 'No especificado' ){
            url = class_ver.cons.get_issn.replace('<issn>', issn);
            $.when(
                class_utils.getResource(url)
            )
            .then(function(resp){
                class_ver.var.revista_impresa = resp.titulo.trim();
                $('#revistai').html(resp.titulo.trim());
                class_ver.var.pais_issn = resp.pais.trim();
                if($('#pais').text() == '')
                    $('#pais').html(resp.pais.trim());

                if(issn != 'No especificado'){
                    class_ver.var.issni_v = class_ver.verifica_valor('issni', resp.titulo.trim());
                    class_ver.verifica_valor('revistai', revista, resp.titulo.trim());
                }
                url_en_impreso = resp.url;
                if(resp.editor !== ''){
                    editor_en_impreso = resp.editor.trim();
                    $('#editorp').html(resp.editor.trim());
                    class_ver.verifica_valor('editorp', editor, resp.editor.trim());
                }
                if(resp.url !== ''){
                    $('#url').html(resp.url);
                    var resp_url = resp.url;
                    if(resp_url.indexOf("http") !== -1){
                        resp_url = resp_url.split('/')[2];
                    }else{
                        resp_url = resp_url.split('/')[0];
                    }
                    var url = $('#'+class_ver.var.id_oai).val().split('/')[2];
                    class_ver.verifica_valor('url', url, resp_url);
                }
                
                if(resp.tipo !== ''){
                    if(resp.tipo == 'online'){
                        $('#issn1').html('ISSN electrónico:');
                    }
                    if(resp.tipo == 'print'){
                        $('#issn1').html('ISSN impreso:');
                    }
                }
                
                if(eissn !== 'No espedificado'){
                    url = class_ver.cons.get_issn.replace('<issn>', eissn);
                    $.when(
                        class_utils.getResource(url)
                    )
                    .then(function(resp){
                        class_ver.var.revista_electronica = resp.titulo.trim();
                        $('#revistae').html(resp.titulo.trim());
                        
                        if($('#pais').text() == ''){
                            class_ver.var.pais_issn = resp.pais.trim();
                            $('#pais').html(resp.pais.trim());
                        }
                        
                        if(resp.tipo !== ''){
                            if(resp.tipo == 'online'){
                                $('#issn2').html('ISSN electrónico:');
                            }
                            if(resp.tipo == 'print'){
                                $('#issn2').html('ISSN impreso:');
                            }
                        }
                        
                        class_ver.var.issne_v = class_ver.verifica_valor('issne', resp.titulo.trim());
                        class_ver.verifica_valor('revistae', revista, resp.titulo.trim());
                        if(editor_en_impreso == ''){
                            if(resp.editor !== ''){
                                editor_en_impreso = resp.editor.trim();
                                $('#editorp').html(resp.editor.trim());
                                class_ver.verifica_valor('editorp', editor, resp.editor.trim());
                            }
                        }
                        if(url_en_impreso == ''){
                            $('#url').html(resp.url);
                            var resp_url = resp.url;
                            if(resp_url.indexOf("http") !== -1){
                                resp_url = resp_url.split('/')[2];
                            }else{
                                resp_url = resp_url.split('/')[0];
                            }
                            var url = $('#'+class_ver.var.id_oai).val().split('/')[2];
                            class_ver.verifica_valor('url', url, resp_url);
                        }
                    });
                }
                class_ver.var.entidad_editora_issn = editor_en_impreso;
            });
        }else{
            if(eissn !== 'No especificado'){
                url = class_ver.cons.get_issn.replace('<issn>', eissn);
                $.when(
                    class_utils.getResource(url)
                )
                .then(function(resp){
                    class_ver.var.revista_electronica = resp.titulo.trim();
                    $('#revistae').html(resp.titulo.trim());
                    
                    if($('#pais').text() == ''){
                        class_ver.var.pais_issn = resp.pais.trim();
                        $('#pais').html(resp.pais.trim());
                    }
                    
                    if(resp.tipo !== ''){
                        if(resp.tipo == 'online'){
                            $('#issn2').html('ISSN electrónico:');
                        }
                        if(resp.tipo == 'print'){
                            $('#issn2').html('ISSN impreso:');
                        }
                    }
                    
                    class_ver.var.issne_v = class_ver.verifica_valor('issne', resp.titulo.trim());
                    class_ver.verifica_valor('revistae', revista, resp.titulo.trim());
                    if(editor_en_impreso == ''){
                        if(resp.editor !== ''){
                            editor_en_impreso = resp.editor.trim(); 
                            $('#editorp').html(resp.editor.trim());
                            class_ver.verifica_valor('editorp', editor, resp.editor.trim());
                        }
                    }
                    if(url_en_impreso == ''){
                        $('#url').html(resp.url);
                        var resp_url = resp.url;
                        if(resp_url.indexOf("http") !== -1){
                            resp_url = resp_url.split('/')[2];
                        }else{
                            resp_url = resp_url.split('/')[0];
                        }
                        var url = $('#'+class_ver.var.id_oai).val().split('/')[2];
                        class_ver.verifica_valor('url', url, resp_url);
                    }
                    class_ver.var.entidad_editora_issn = editor_en_impreso;
                });
            }
        }

        
        //secciones
        /*
        if(!class_ver.var.cambio_secciones){
            var secciones = class_utils.filter_prop(class_ver.var.data.ses, 'locale', idioma_principal);
            var ids_secciones = class_utils.unique(secciones, 'section_id');
            var html_secciones = '';
            $.each(ids_secciones, function(is, vals){
                var nombre = '';
                var busca = class_utils.filter_prop(secciones, 'section_id', vals);
                var busca_abrev = class_utils.filter_prop(busca, 'setting_name', 'abbrev');
                if(busca_abrev.length > 0){
                    nombre = busca_abrev[0].setting_value;
                }
                var busca_tit = class_utils.filter_prop(busca, 'setting_name', 'title');
                if(busca_tit.length > 0){
                    nombre += ((nombre.length > 0)?':':'') + busca_tit[0].setting_value;
                }
                html_secciones += class_ver.cons.chbx_seccion.replaceAll('<id_seccion>', vals).replace('<seccion>', nombre);
            });
        
            $('#group_secciones').html(html_secciones);
        }
        
        $('#div_secciones').show();*/
        
        /*
        class_ver.var.seccion_no_indizable = [];
        $.each($('.seccion'), function(isec, valsec){
            if( !$('#'+valsec.id)[0].checked ){
                class_ver.var.seccion_no_indizable.push(String($('#'+valsec.id).val()));
            }
            $('#'+valsec.id).off('change').on('change', function(ic, valc){
                class_ver.var.cambio_secciones = true;
            });
        });*/

        //total de publicaciones
        var publicaciones = class_ver.var.data.articulos;
        var pubs_tmp = [];
        var publicaciones_indizables = [];
        
        //Datos completos de las publicaciones Año, vol, num, pages, tit
        arr_pubs = [];
        
        //Ids de las publicaciones vigentes
        arr_id_pubs = [];
        
        $.each(publicaciones, function(i,val){
            
            var indizable = val.titulo;
            var coincide_titulo = false;
            
            $.each(class_ver.cons.er.titulo_completo, function(i_er, val_er){
                $.each(indizable, function(i_tit, val_tit){
                    try{
                        if( val_er.test(val_tit.title.toLowerCase().trim()) ){
                            coincide_titulo = true;
                            return false;
                        }
                    }catch(e){

                    }
                });
            });
            
            if(!coincide_titulo){
                            $.each(class_ver.cons.er.titulo_parcial, function(i_t, val_t){
                                $.each(indizable, function(i_tit, val_tit){
                                    try{
                                        if( val_t.test(val_tit.title.toLowerCase().trim()) ){
                                            coincide_titulo = true;
                                            return false;
                                        }
                                    }catch(e){

                                    }
                                });
                            });
                    }
            
            if(!coincide_titulo){
                arr_pubs.push(val);
                arr_id_pubs.push(val.id);
                pubs_tmp.push(val);
                publicaciones_indizables.push(val);
            }

        });
        
        publicaciones = pubs_tmp;
        var publicaciones_totales = JSON.parse(JSON.stringify(publicaciones));

        //Búsqued ajustes publicaciones
        var publicaciones_ajustes = '';

        //pubs con DOI
        
        var publicaciones_doi_total = class_utils.filterdiff_prop(publicaciones, 'doi', [null, '', undefined]);                

        /** DOI que están vacíos ***/
        arr_pub_id = class_ver.get_pub_id2(publicaciones_doi_total);
        doi_faltantes = class_utils.filter_prop_notarr(publicaciones, 'id', arr_pub_id);

        //var res_dois = [];
        //publicaciones_doi = class_ver.valida_dois(publicaciones_doi, res_dois);

        var consistencia_doi = class_utils.filter_prop_er(publicaciones_doi_total, 'doi', class_ver.cons.er.doi);

        /** DOI no consistentes ***/
        arr_pubs_comp = publicaciones_doi_total;
        arr_pub_id = class_ver.get_pub_id2(consistencia_doi);
        doi_incons = class_utils.filter_prop_notarr(arr_pubs_comp, "id", arr_pub_id);

        //pubs con paginas
        var publicaciones_pags = class_utils.filterdiff_prop(publicaciones, 'pags', [null, '']);

        titulos = [];
        titulos_valor = [];
        titulos_mayus2 = [];
        titulos_idioma1 = [];
        titulos_idioma2 = [];
        titulos_idioma1_arr = [];
        titulos_idioma2_arr = [];
        titulos_i1_mayus = [];
        titulos_i2_mayus = [];
        var consis_titulos_i1 = [];
        var consis_titulos_i2 = [];
        var consis_autores = [];
        resumenes = [];
        resumenes_valor = [];
        resumenes_mayus2 = [];
        resumenes_idioma1 = [];
        resumenes_idioma2 = [];
        comp_resumenes_idioma1 = [];
        comp_resumenes_idioma2 = [];
        consis_resumenes_idioma1 = [];
        consis_resumenes_idioma2 = [];
        palabras_clave_idioma1 = [];
        palabras_clave_idioma2 = [];
        palabras_clave_idioma1_arr = [];
        palabras_clave_idioma2_arr = [];
         palabras_clave_idioma1b = [];
         palabras_clave_idioma2b = [];
         palabras_clave_idioma1b_arr = [];
         palabras_clave_idioma2b_arr = [];
         consis_palabras_clave_idioma1 = [];
         consis_palabras_clave_idioma2 = [];
         palabras_clave = [];
         palabras_clave_valor = [];
         palabras_clave_cinco = [];
        enlaces = [];
        enlaces_total = [];
        arr_enlaces_total = [];
        ids_revisa = '';
        
        idiomas_envio = [];
        //Obtiene idiomas envío
        $.each(publicaciones, function(ip, valp){
            $.each(valp.titulo, function(it, valt){
                if(idiomas_envio.indexOf(valt.lan) == -1){
                    idiomas_envio.push(valt.lan);
                }
            });
        });
        class_ver.var.idiomase = idiomas_envio;
        $('#idiomas').html( class_ver.var.idiomase.join(', ') );
        
        $.each(idiomas_envio, function(i,val){
            var obj =[];
            
            $.each(publicaciones, function(ip, valp){
                //título, resumen y palabas de acuerdo al idioma
                var titulo = class_utils.find_prop(valp.titulo, 'lan', val);
                var resumen = class_utils.find_prop(valp.resumen, 'lan', val);
                var palabra_clave = class_utils.find_prop(valp.palabra_clave, 'lan', val);
                
                //var obj_int = JSON.parse(JSON.stringify(valp));
                var obj_int = JSON.parse(JSON.stringify(valp));
                if(titulo !== undefined){
                    obj_int["titulo_idioma"] = titulo.title;
                }else{
                    obj_int["titulo_idioma"] = null;
                }
                if(resumen !== undefined){
                    obj_int["resumen_idioma"] = resumen.abstract;
                }else{
                    obj_int["resumen_idioma"] = null;
                }
                if(palabra_clave !== undefined){
                    obj_int["palabra_clave_idioma"] = palabra_clave.keyword;
                }else{
                    obj_int["palabra_clave_idioma"] = null;
                }
                obj.push(obj_int);
            });
            
            titulos[val] = obj;
            titulos_valor[val] = class_utils.filterdiff_prop(obj, 'titulo_idioma', [null, '']);
            titulos_mayus2[val] = class_utils.filter_prop_noter(titulos_valor[val], 'titulo_idioma', class_ver.cons.er.mayus);

            //Si es el idioma principal llena el arreglo que contienen los ids de titulos en ese idioma
            $.each(titulos[val],function(i2, val2){

                var idioma_doc = '';
                
                if(val2["idioma_articulo"] !== null){
                    idioma_doc = val2["idioma_articulo"];
                }else{
                    idioma_doc = class_ver.var.idiomap;
                }
               

                if( ['', null, undefined].indexOf(val2['titulo_idioma']) == -1 ){
                    if(idioma_doc == val){
                        if( titulos_idioma1.indexOf(val2["id"]) == -1 ){
                            titulos_idioma1.push(val2["id"]);
                            titulos_idioma1_arr.push(val2);
                        }
                    }else{
                        if( titulos_idioma2.indexOf(val2["id"]) == -1 ){
                            titulos_idioma2.push(val2["id"]);
                            //titulos_idioma2_arr.push(Object.assign(val2, pub));
                            titulos_idioma2_arr.push(val2);
                        }
                    }
                }
            });

            /**Títulos vacíos**/
            arr_pub_id = class_ver.get_pub_id2(titulos_idioma1_arr);
            titulos_i1_faltantes = class_utils.filter_prop_notarr(publicaciones, "id", arr_pub_id);

            /**Títulos en otro idioma vacíos**/
            arr_pub_id = class_ver.get_pub_id2(titulos_idioma2_arr);
            titulos_i2_faltantes = class_utils.filter_prop_notarr(publicaciones, "id", arr_pub_id);

            //títulos que No tienen el título completamente en mayúsculas
            titulos_i1_mayus = class_utils.filter_prop_er(titulos_idioma1_arr, 'titulo_idioma', class_ver.cons.er.mayus);
            //títulos que tienen longitud mayor a 1
            consis_titulos_i1 = class_utils.filter_len(titulos_i1_mayus, 'titulo_idioma', 1);

            /** Títulos no consistentes ***/
            arr_pubs_comp = titulos_idioma1_arr;
            arr_pub_id = class_ver.get_pub_id2(consis_titulos_i1);
            titulos_i1_incons = class_utils.filter_prop_notarr(arr_pubs_comp, "id", arr_pub_id);

            //títulos que No tienen el título completamente en mayúsculas
            titulos_i2_mayus = class_utils.filter_prop_er(titulos_idioma2_arr, 'titulo_idioma', class_ver.cons.er.mayus);
            //títulos que tienen longitud mayor a 1
            consis_titulos_i2 = class_utils.filter_len(titulos_i2_mayus, 'titulo_idioma', 1);

            /** Títulos otro idioma no consistentes ***/
            arr_pubs_comp = titulos_idioma2_arr;
            arr_pub_id = class_ver.get_pub_id2(consis_titulos_i2);
            titulos_i2_incons = class_utils.filter_prop_notarr(arr_pubs_comp, "id", arr_pub_id);
            
            resumenes[val] = obj;
            resumenes_valor[val] = class_utils.filterdiff_prop(obj, 'resumen_idioma', [null, '']);
            resumenes_mayus2[val] = class_utils.filter_prop_noter(resumenes_valor[val], 'resumen_idioma', class_ver.cons.er.mayus);

            //revisión primer idioma
            $.each(resumenes[val],function(i2, val2){
                var idioma_doc = '';
                
                if(val2["idioma_articulo"] !== null){
                    idioma_doc = val2["idioma_articulo"];
                }else{
                    idioma_doc = class_ver.var.idiomap;
                }

                if( ['', null, undefined].indexOf(val2['resumen_idioma']) == -1 ){
                    if(idioma_doc == val){
                        if( resumenes_idioma1.indexOf(val2["id"]) == -1 ){
                            resumenes_idioma1.push(val2["id"]);
                            comp_resumenes_idioma1.push(val2);
                        }
                    }else{
                        if( resumenes_idioma2.indexOf(val2["id"]) == -1 ){
                            resumenes_idioma2.push(val2["id"]);
                            comp_resumenes_idioma2.push(val2);
                        }
                    }
                }
            });

            arr_pub_id = class_ver.get_pub_id2(comp_resumenes_idioma1);
            resumenes_i1_faltantes = class_utils.filter_prop_notarr(arr_pubs, "id", arr_pub_id);

            arr_pub_id = class_ver.get_pub_id2(comp_resumenes_idioma2);
            resumenes_i2_faltantes = class_utils.filter_prop_notarr(arr_pubs, "id", arr_pub_id);

            consis_resumenes_idioma1 = class_utils.filter_prop_er(comp_resumenes_idioma1, 'resumen_idioma', class_ver.cons.er.mayus);
            consis_resumenes_idioma1 = class_utils.filter_len(consis_resumenes_idioma1, 'resumen_idioma', 100);

            /** Resúmenes no consistentes ***/
            arr_pubs_comp = comp_resumenes_idioma1.slice();
            arr_pub_id = class_ver.get_pub_id2(consis_resumenes_idioma1);
            resumenes_i1_incons = class_utils.filter_prop_notarr(arr_pubs_comp, "id", arr_pub_id);

            consis_resumenes_idioma2 = class_utils.filter_prop_er(comp_resumenes_idioma2, 'resumen_idioma', class_ver.cons.er.mayus);
            consis_resumenes_idioma2 = class_utils.filter_len(consis_resumenes_idioma2, 'resumen_idioma', 100);

            /** Resúmenes en otro idioma no consistentes ***/
            arr_pubs_comp = comp_resumenes_idioma2.slice();
            arr_pub_id = class_ver.get_pub_id2(consis_resumenes_idioma2);
            resumenes_i2_incons = class_utils.filter_prop_notarr(arr_pubs_comp, 'id', arr_pub_id);

            var filter = function(obj){
                return obj.filter(function(obj2){
                    //obj2 = obj2.setting_value.split(';');
                    obj2 = obj2["palabra_clave_idioma"];
                    return obj2.length >= 3;
                });
            };

            var filter2 = function(obj){
                return obj.filter(function(obj2){
                    obj2 = obj2.split(';');
                    return obj2.length >= 3;
                });
            };

            var filter3 = function(obj){
                return obj.filter(function(obj2){
                    return obj2 != undefined;
                });
            };
            
            palabras_clave[val] = obj;
                
                //revisión primer idioma
            $.each(palabras_clave[val],function(i2, val2){
                var idioma_doc = '';
                
                if(val2["idioma_articulo"] !== null){
                    idioma_doc = val2["idioma_articulo"];
                }else{
                    idioma_doc = class_ver.var.idiomap;
                }

                if( ['', null, undefined].indexOf(val2['palabra_clave_idioma']) == -1 ){
                    if(idioma_doc == val){
                        if( palabras_clave_idioma1.indexOf(val2["id"]) == -1 ){
                            palabras_clave_idioma1.push(val2["id"]);
                            palabras_clave_idioma1_arr.push(val2);
                        }
                    }else{
                        if( palabras_clave_idioma2.indexOf(val2["id"]) == -1 ){
                            palabras_clave_idioma2.push(val2["id"]);
                            palabras_clave_idioma2_arr.push(val2);
                        }
                    }
                }
            });

                palabras_clave_idioma1_arr = class_utils.filterdiff_prop(palabras_clave_idioma1_arr, 'palabra_clave_idioma', [undefined, null, '']);
                palabras_clave_idioma2_arr = class_utils.filterdiff_prop(palabras_clave_idioma2_arr, 'palabra_clave_idioma', [undefined, null, '']);

                /**Palabras clave vacíos**/
                arr_pub_id = class_ver.get_pub_id2(palabras_clave_idioma1_arr);
                palabras_clave_i1_faltantes = class_utils.filter_prop_notarr(arr_pubs, "id", arr_pub_id);

                /**Palabras clave otro idioma vacíos**/
                arr_pub_id = class_ver.get_pub_id2(palabras_clave_idioma2_arr);
                palabras_clave_i2_faltantes = class_utils.filter_prop_notarr(arr_pubs, "id", arr_pub_id);


                consis_palabras_clave_idioma1 = class_utils.filter_prop_er(palabras_clave_idioma1_arr, 'palabra_clave_idioma', class_ver.cons.er.mayus);
                consis_palabras_clave_idioma1 = class_utils.filter_len(consis_palabras_clave_idioma1, 'palabra_clave_idioma', 1);
                consis_palabras_clave_idioma1 = filter(consis_palabras_clave_idioma1);
                consis_palabras_clave_idioma2 = class_utils.filter_prop_er(palabras_clave_idioma2_arr, 'palabra_clave_idioma', class_ver.cons.er.mayus);
                consis_palabras_clave_idioma2 = class_utils.filter_len(consis_palabras_clave_idioma2, 'palabra_clave_idioma', 1);
                consis_palabras_clave_idioma2 = filter(consis_palabras_clave_idioma2);

                /** Palabras clave no consistentes ***/
                arr_pubs_comp = palabras_clave_idioma1_arr.slice();
                arr_pub_id = class_ver.get_pub_id2(consis_palabras_clave_idioma1);
                palabras_clave_i1_incons = class_utils.filter_prop_notarr(arr_pubs_comp, "id", arr_pub_id);

                /** Palabras clave idioma 2 no consistentes ***/
                arr_pubs_comp = palabras_clave_idioma2_arr.slice();
                arr_pub_id = class_ver.get_pub_id2(consis_palabras_clave_idioma2);
                palabras_clave_i2_incons = class_utils.filter_prop_notarr(arr_pubs_comp, "id", arr_pub_id);

                palabras_clave_valor[val] = class_utils.filterdiff_prop(obj, 'palabra_clave_idioma', [null, '']);
                palabras_clave_cinco[val] = filter(palabras_clave_valor[val]);
            
        });

        //Enlaces
        enlaces = JSON.parse(JSON.stringify(publicaciones));
        $.each(enlaces, function(i2, val2){
            if( arr_id_pubs.indexOf(val2["id"]) !== -1 ){
                if( enlaces_total.indexOf(val2["id"]) == -1 ){
                    //Solo enlaces a pdf o html
                    //if(['html', 'pdf'].indexOf(val2.label.toLowerCase()) !== -1){
                    if(val2.enlace_texto !== undefined){
                        if( class_utils.filter_prop(val2.enlace_texto, 'format', 'pdf').length > 0 || class_utils.filter_prop(val2.enlace_texto, 'format', 'html').length >0){
                            enlaces_total.push(val2["id"]);
                            arr_enlaces_total.push(val2);
                        }
                    }
                    //NOTA: Buscar opción para validar idioma
                }
            }
        });

        /** enlaces faltantes y no consistentes ***/
        arr_pubs_comp = arr_enlaces_total.slice();
        arr_pub_id = class_ver.get_pub_id2(arr_enlaces_total);
        enlaces_faltantes = class_utils.filter_prop_notarr(arr_pubs, "id", arr_pub_id);
        enlaces_incons = class_utils.filter_prop_notarr(arr_pubs_comp, "id", arr_pub_id);

        //Búsqueda de autores 1691
        //var autores = JSON.parse(JSON.stringify(class_ver.var.data.articulos));
        
        autores_nombre_total = [];
        var autores_nombre_compara = [];
        autores_nombre_id = [];
        var arr_id_autores = [];
        autores_pub_id = [];
        
        //Instituciones
        var instituciones = [];
        
        //Citas
        citas = [];
        
        //Licencia
        licencia = [];
        
        class_ver.var.data.articulos = publicaciones;
        
        //id's de las publicaciones
        $.each(class_ver.var.data.articulos, function(i, val){
            if(val.referencias && val.referencias.length > 0){
                citas.push(val);
            }
            $.each(val.licencia, function(i2, val2){
                val2["id"] = val.id;
                val2["numero"] = val.numero;
                val2["titulo"] = val.titulo;
                val2["enlace_texto"] = val.enlace_texto;
                licencia.push(val2);
            });
            $.each(val.autor, function(i2,val2){
                arr_id_autores.push(val.id+'-'+i2);
                val2["author_id"] = val.id+'-'+i2;
                val2["id"] = val.id;
                val2["numero"] = val.numero;
                val2["titulo"] = val.titulo;
                val2["enlace_texto"] = val.enlace_texto;
                instituciones.push(val2);
                if( autores_pub_id.indexOf(val.id)== -1 ){
                    autores_pub_id.push(val.id);
                }
                autores_nombre_total.push(val2);
            });
        });
        
        $.each(autores_nombre_total, function(i,val){
            if( autores_nombre_compara.indexOf(val['author_id']) == -1 ){
                autores_nombre_compara.push(val['author_id']);
                autores_nombre_id.push(val);
            }
        });
            consis_autores = class_utils.filter_prop_er(autores_nombre_id, 'name', class_ver.cons.er.mayus);
            consis_autores = class_utils.filter_len(consis_autores, 'name', 1);
            consis_autores = class_utils.filter_prop_noter(consis_autores, 'name', class_ver.cons.er.inicial);
            consis_autores = class_utils.filter_prop_noter(consis_autores, 'name', class_ver.cons.er.autor);
            consis_autores = class_utils.filter_prop_noter(consis_autores, 'name', class_ver.cons.er.char);

        
        autores_faltantes = class_utils.filter_prop_notarr(arr_pubs, "id", autores_pub_id);
        arr_pubs_b = class_utils.filter_prop_arr(arr_pubs, "id", autores_pub_id);

        /** Autores no consistentes ***/
        autores_pub_id = class_ver.get_pub_id(consis_autores);
        autores_incons = class_utils.filter_prop_notarr(arr_pubs_b, "id", autores_pub_id);

        var autores_apellido = [];


        //Autores con email 1691
        var autores_email = [];//class_utils.filterdiff_prop(autores, 'email', [null, '', undefined]);
        autores_pub_id = [];//class_ver.get_pub_id(autores_email);
        email_faltantes = [];//class_utils.filter_prop_notarr(arr_pubs, class_ver.cons.pub_id[class_ver.var.data.ver], autores_pub_id);

        //Autores con url = orcid
        var autores_url = class_utils.filterdiff_prop(autores_nombre_total, 'orcid', [null, '', undefined]);

        var autores_orcid = [];
        var consis_orcid = [];
        
        $.each(autores_url, function(i,val){
            if(autores_orcid.indexOf(val.author_id) == -1){
                autores_orcid.push(val.author_id);
                val.exist_url = true;
                consis_orcid.push(val);
            }
        });
        
        // En consis_orcid, están los ids de los autores que tienen registro de ORCID, pero se deben quitar aquellos que pertenezcan a un artículo donde haya más autores y que alguno de ellos no
        // cuente con el orcid, esto se hace en la funcion de get_pub_id

        autores_pub_id = class_ver.get_pub_id(consis_orcid);
        orcid_faltantes = class_utils.filter_prop_notarr(arr_pubs, "id", autores_pub_id);

        arr_pubs_b = class_utils.filter_prop_arr(arr_pubs, "id", autores_pub_id);
        
        var temp_consis_orcid = [];
        
        $.each(consis_orcid, function(i,val){
            temp_consis_orcid = temp_consis_orcid.concat(class_utils.filter_prop_er([val], 'orcid', class_ver.cons.er.orcid));
        });
        consis_orcid = temp_consis_orcid;
        

        autores_pub_id = class_ver.get_pub_id(consis_orcid);

        orcid_incons = class_utils.filter_prop_notarr(arr_pubs_b, "id", autores_pub_id);

        
        //Ya no se toma en cuenta el idioma en el que esté guardado el valor
        //instituciones = class_utils.filter_prop_arr(instituciones, 'locale', idioma_principal);
        //
        //Instituciones con valor
        instituciones_valor = class_utils.filterdiff_prop(instituciones, 'aff', [null, '', undefined]);
        instituciones_sinvalor = class_utils.filter_prop_arr(instituciones, 'aff', [null, '', undefined]);
                
        //Se obtienen los ids de las publicaciones que no tienen valor en la institución
        autores_pub_id_sv = class_ver.get_autores_pub_id2(instituciones_sinvalor);
        
        autores_pub_id = class_ver.get_autores_pub_id2(instituciones_valor);
        //instituciones_faltantes = class_utils.filter_prop_notarr(arr_pubs, class_ver.cons.pub_id[class_ver.var.data.ver], autores_pub_id);
        //Esta parte es para tomar los ids de publicaciones con instituciones faltantes
        instituciones_faltantes = class_utils.filter_prop_arr(arr_pubs, "id", autores_pub_id_sv);

        var consis_instituciones = class_utils.filter_prop_noter(instituciones_valor, 'aff', class_ver.cons.er.doblemayus);
        //instituciones que complan con esta expresión regular (inconsistentes)
        var inconsis_instituciones = class_utils.filter_prop_er(instituciones_valor, 'aff', class_ver.cons.er.doblemayus);

        arr_pubs_b = class_utils.filter_prop_arr(arr_pubs, "id", autores_pub_id);
        //autores_pub_id = class_ver.get_autores_pub_id2(consis_instituciones);
        autores_pub_id = class_ver.get_autores_pub_id2(inconsis_instituciones);

        instituciones_incons = class_utils.filter_prop_notarr(arr_pubs_b, "id", autores_pub_id);
        //ids de las publicaciones donde existan estas instituciones inconsistentes
        instituciones_incons = class_utils.filter_prop_arr(arr_pubs_b, "id", autores_pub_id);

        //issues
        var issues = class_ver.var.data.numeros;
        //anio
        var issues_anios = class_utils.filterdiff_prop(issues, 'year', [null, '', '0']);
        //volumen
        var issues_volumenes = class_utils.filterdiff_prop(issues, 'vol', [null, '', '0']);
        //number
        var issues_numeros = class_utils.filterdiff_prop(issues, 'num', [null, '', '0']);

        //Citas

        arr_pub_id = class_ver.get_pub_id2(citas);
        citas_faltantes = class_utils.filter_prop_notarr(arr_pubs, "id", arr_pub_id);
        //citas que tienen longitud mayor a 30
        //var consis_citas = class_utils.filter_len(citas, 'citations', 30);
        //AGREGAR CONSIS
        var consis_citas = citas;

        /** Citas no consistentes **/
        arr_pubs_comp = citas.slice();
        arr_pub_id = class_ver.get_pub_id2(consis_citas);
        citas_incons = class_utils.filter_prop_notarr(arr_pubs_comp, "id", arr_pub_id);

        //Licencia

        /** Licencias faltantes ***/
        arr_pub_id = class_ver.get_pub_id2(licencia);
        licencias_faltantes = class_utils.filter_prop_notarr(arr_pubs, "id", arr_pub_id);

        var consis_licencia = class_utils.filter_prop_er(licencia, 'license', class_ver.cons.er.licencia);

        /** Licencias no consistentes ***/
        arr_pubs_comp = licencia.slice();
        arr_pub_id = class_ver.get_pub_id2(consis_licencia);
        licencias_incons = class_utils.filter_prop_notarr(arr_pubs_comp, "id", arr_pub_id);

        /*** Termina ciclo por cada issue ***/

        class_ver.var.salida.revista = revista;
        class_ver.var.salida.issn = issn;
        class_ver.var.salida.eissn = eissn;
        //en version anerior es código del idioma
        class_ver.var.salida.ip = idioma;
        class_ver.var.salida.idioma = idioma;
        class_ver.var.salida.idiomas_envio = idiomas_envio;

        class_ver.var.salida.iss = issues;
        class_ver.var.salida.issav = issues_anios;
        class_ver.var.salida.issvv = issues_volumenes;
        class_ver.var.salida.issnv = issues_numeros;

        class_ver.var.salida.idp = arr_id_pubs;
        class_ver.var.salida.p_t = publicaciones_totales;
        class_ver.var.salida.p = publicaciones;
        class_ver.var.salida.pi = publicaciones_indizables;
        class_ver.var.salida.pd = publicaciones_doi_total;
        class_ver.var.salida.pdt = publicaciones_doi_total;
        class_ver.var.salida.pp = publicaciones_pags;
        class_ver.var.salida.pt = titulos;
        class_ver.var.salida.ptv = titulos_valor;
        class_ver.var.salida.pti1 = titulos_idioma1;
        class_ver.var.salida.pti2 = titulos_idioma2;
        class_ver.var.salida.ptm = titulos_mayus2;
        class_ver.var.salida.pr = resumenes;
        class_ver.var.salida.prv = resumenes_valor;
        class_ver.var.salida.pri1 = resumenes_idioma1;
        class_ver.var.salida.pri2 = resumenes_idioma2;
        class_ver.var.salida.prm = resumenes_mayus2;
        class_ver.var.salida.ppci1 = palabras_clave_idioma1;
        class_ver.var.salida.ppci2 = palabras_clave_idioma2;
        class_ver.var.salida.ppc = palabras_clave;
        class_ver.var.salida.ppcv = palabras_clave_valor;
        class_ver.var.salida.ppc5 = palabras_clave_cinco;

        class_ver.var.salida.ida = arr_id_autores;
        class_ver.var.salida.as = autores_nombre_total;
        class_ver.var.salida.a = autores_nombre_total;
        class_ver.var.salida.an = autores_nombre_id;
        class_ver.var.salida.aa = autores_apellido;
        class_ver.var.salida.ae = autores_email;
        class_ver.var.salida.ao = autores_orcid;

        class_ver.var.salida.i = instituciones;
        class_ver.var.salida.iv = instituciones_valor;

        class_ver.var.salida.en = enlaces;
        class_ver.var.salida.ent = enlaces_total;
        class_ver.var.salida.arr_ent = arr_enlaces_total;

        class_ver.var.salida.lic = licencia;
        class_ver.var.salida.cit = citas;

        class_ver.var.salida.consis_doi = consistencia_doi;
        class_ver.var.salida.consis_ti1 = consis_titulos_i1;
        class_ver.var.salida.consis_ti2 = consis_titulos_i2;
        class_ver.var.salida.consis_ri1 = consis_resumenes_idioma1;
        class_ver.var.salida.consis_ri2 = consis_resumenes_idioma2;
        class_ver.var.salida.consis_pci1 = consis_palabras_clave_idioma1;
        class_ver.var.salida.consis_pci2 = consis_palabras_clave_idioma2;
        class_ver.var.salida.consis_a = consis_autores;
        class_ver.var.salida.consis_or = consis_orcid;
        class_ver.var.salida.consis_ins = consis_instituciones;
        class_ver.var.salida.consis_lic = consis_licencia;
        class_ver.var.salida.consis_cit = consis_citas;


        var res_dois = [];
        publicaciones_doi = class_ver.valida_dois(publicaciones_doi_total, res_dois);

         //Armado de precisión
         /*
        doi_no_precisa = class_utils.filter_prop(class_ver.var.salida.pd, 'registrado', 0);
        doi_no_precisb = class_utils.filter_prop(class_ver.var.salida.pd, 'resuelve', 0);
        doi_no_precis = Object.assign(doi_no_precisa, doi_no_precisb);
        arr_precs = [ doi_no_precis ];*/


        //class_ver.graficaIssues();
        
        setTimeout(function(){
            $('#informacion').show();
            class_ver.graficaAuth();
            class_ver.graficaDocs();
            class_ver.graficaProm();
            class_ver.graficaAuthConsis();
            class_ver.graficaDocsConsis();
            class_ver.graficaPromConsis();
            setTimeout( function(){
                $('#container4').height($('#container_c1').height());
                loading.end();
            }, 1000);
        }, 2000);
        
        /*setTimeout( function(){
            $('#rev_orcid').height($('#container_c1').height())
        }, 1000);*/
    },
    graficaIssues:function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartRadialBar));
        grafica.xAxis.categories = ['Año', 'Volúmen', 'Número']
        
        var anio = class_ver.var.salida.issav.length / class_ver.var.salida.iss.length * 100;
        var volumen = class_ver.var.salida.issvv.length / class_ver.var.salida.iss.length * 100;
        var numero = class_ver.var.salida.issnv.length / class_ver.var.salida.iss.length * 100;
        
        var completos = [ 
                                (anio == 100)?100:0,
                                (volumen == 100)?100:0,
                                (numero == 100)?100:0,
                            ];
        var mas50 = [ 
                                (anio > 50 && anio < 100)?anio:0,
                                (volumen > 50 && volumen < 100)?volumen:0,
                                (numero > 50 && numero < 100)?numero:0,
                            ];
        var menos50 = [ 
                                (anio < 50)?anio:0,
                                (volumen < 50)?volumen:0,
                                (numero < 50)?numero:0,
                            ];
                              
        grafica.series = [
                                {'name': 'Completos', 'data': completos }, 
                                {'name': '+ 50%', 'data': mas50},
                                {'name': '- 50%', 'data': menos50}
                                ];
                                
        var num = 'Total de Números Publicados: ' + class_ver.var.salida.iss.length;
        $('#numeros').html(num);
        Highcharts.chart('container', grafica);
    },
    graficaAuth:function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartRadialBar));
        grafica.xAxis.categories = ['Autor', /*'Apellidos', 'Email',*/ 'Orcid', 'Afiliación']
        
        var nombre = class_ver.var.salida.an.length / class_ver.var.salida.a.length * 100;
        //var apellido = class_ver.var.salida.aa.length / class_ver.var.salida.a.length * 100;
        var email = class_ver.var.salida.ae.length / class_ver.var.salida.a.length * 100;
        var orcid = class_ver.var.salida.ao.length / class_ver.var.salida.a.length * 100;
        var instituciones = class_ver.var.salida.iv.length / class_ver.var.salida.i.length * 100;
        
        class_ver.suficiencia_promedio = ((nombre == 100)?1:0) + /*((email == 100)?1:0) +*/ ((orcid == 100)?1:0) + ((instituciones == 100)?1:0);
        
        var completos = [ 
                                parseFloat(nombre.toFixed(2)),
                                //(apellido == 100)?100:0,
                                //parseFloat(email.toFixed(2)),
                                parseFloat(orcid.toFixed(2)),
                                parseFloat(instituciones.toFixed(2))
                            ];
                            
        var sindato = [ 
                                100 - parseFloat((nombre).toFixed(2)),
                                //(apellido > 50 && apellido < 100)?apellido:0,
                                //100 - parseFloat((email).toFixed(2)),
                                100 - parseFloat((orcid).toFixed(2)),
                                100 - parseFloat((instituciones).toFixed(2))
                            ];
                              
        grafica.series = [
                                {'name': '% Completos', 'data': completos }, 
                                {'name': '% Sin dato', 'data': sindato},
                                ];
                                
        var num = 'Suficiencia en datos de Autores (Total: ' + class_ver.var.salida.a.length + ')<br>';
        $('#autores').html(num);
        Highcharts.chart('container2', grafica);
        $("#area_c2").flip({trigger: 'manual'});
        $('#btn_prom_suf').text('Ver Valoración');
        $('#btn_prom_suf').show();
        $("#btn_prom_suf").off('click').on('click', function(){
            $("#area_c2").flip('toggle');
            if($('#btn_prom_suf').text() == 'Ver Valoración')
                $('#btn_prom_suf').text('Regresar');
            else
                $('#btn_prom_suf').text('Ver Valoración');
        });
    },
    graficaDocs:function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartRadialBar));
        grafica.xAxis.categories = ['Título', 'Título traducido', /*'Título sin mayúsculas (Idioma principal)',*/ 'Resumen', 'Resumen traducido', 
                                    /*'Resumen sin mayúsculas (Idioma principal)',*/ 'Palabras clave', 'Palabras clave traducidas', 'Enlace texto completo',/*'Mínimo 5 palabras clave',*/
                                    'Referencias', 'Licencia', 'DOI'];
        
        //var tituloip = class_ver.var.salida.ptv[class_ver.var.salida.ip].length / class_ver.var.salida.p.length * 100;
        var c_i = class_ver.var.salida.pi.length / class_ver.var.salida.p_t.length * 100;
        var tituloip = class_ver.var.salida.pti1.length / class_ver.var.salida.p.length * 100;
        var titulo2i = class_ver.var.salida.pti2.length / class_ver.var.salida.p.length * 100;
        var titulom = (class_ver.var.salida.p.length - class_ver.var.salida.ptm[class_ver.var.salida.ip].length) / class_ver.var.salida.p.length * 100;
        //var resumenip = class_ver.var.salida.prv[class_ver.var.salida.ip].length / class_ver.var.salida.p.length * 100;
        var resumenip = class_ver.var.salida.pri1.length / class_ver.var.salida.p.length * 100;
        var resumen2i = class_ver.var.salida.pri2.length / class_ver.var.salida.p.length * 100;
        var resumenm = (class_ver.var.salida.p.length - class_ver.var.salida.prm[class_ver.var.salida.ip].length) / class_ver.var.salida.p.length * 100;
        //var palabra_claveip = class_ver.var.salida.ppc1[class_ver.var.salida.ip].length / class_ver.var.salida.p.length * 100;
        var palabra_claveip = class_ver.var.salida.ppci1.length / class_ver.var.salida.p.length * 100;
        var palabra_clave2i = class_ver.var.salida.ppci2.length / class_ver.var.salida.p.length * 100;
        var palabra_clave = class_ver.var.salida.ppc[class_ver.var.salida.ip].length / class_ver.var.salida.p.length * 100;
        var palabra_clave_cinco = class_ver.var.salida.ppc5[class_ver.var.salida.ip].length / class_ver.var.salida.p.length * 100;
        var enlaces = class_ver.var.salida.ent.length / class_ver.var.salida.p.length * 100;
        var citas = class_ver.var.salida.cit.length / class_ver.var.salida.p.length * 100;
        var licencia = class_ver.var.salida.lic.length / class_ver.var.salida.p.length * 100;
        var doi = class_ver.var.salida.pdt.length / class_ver.var.salida.p.length * 100;
        
        class_ver.suficiencia_promedio += ((tituloip == 100)?1:0) 
                                        + ((titulo2i == 100)?1:0) 
                                        + ((resumenip == 100)?1:0) 
                                        + ((resumen2i == 100)?1:0) 
                                        + ((palabra_claveip == 100)?1:0) 
                                        + ((palabra_clave2i == 100)?1:0) 
                                        + ((enlaces == 100)?1:0) 
                                        + ((citas == 100)?1:0) 
                                        + ((licencia == 100)?1:0) 
                                        + ((doi == 100)?1:0);
        
        var completos = [ 
                                //parseFloat(c_i.toFixed(2)),
                                parseFloat(tituloip.toFixed(2)),
                                parseFloat(titulo2i.toFixed(2)),
                                //(titulom == 100)?100:0,
                                parseFloat(resumenip.toFixed(2)),
                                parseFloat(resumen2i.toFixed(2)),
                                //(resumenm == 100)?100:0,
                                //(palabra_clave == 100)?100:0,
                                parseFloat(palabra_claveip.toFixed(2)),
                                parseFloat(palabra_clave2i.toFixed(2)),
                                //(palabra_clave_cinco == 100)?100:0,
                                parseFloat(enlaces.toFixed(2)),
                                parseFloat(citas.toFixed(2)),
                                parseFloat(licencia.toFixed(2)),
                                parseFloat(doi.toFixed(2))
                            ];
        var sindato = [ 
                                //parseFloat((100 - parseFloat(c_i.toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((tituloip).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((titulo2i).toFixed(2))).toFixed(2)),
                                //(titulom > 50 && titulom < 100)?titulom:0,
                                parseFloat((100 - parseFloat((resumenip).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((resumen2i).toFixed(2))).toFixed(2)),
                                //(resumenm > 50 && resumenm < 100)?resumenm:0,
                                parseFloat((100 - parseFloat((palabra_claveip).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((palabra_clave2i).toFixed(2))).toFixed(2)),
                                //(palabra_clave > 50 && palabra_clave < 100)?palabra_clave:0,
                                //(palabra_clave_cinco > 50 && palabra_clave_cinco < 100)?palabra_clave_cinco:0,
                                parseFloat((100 - parseFloat((enlaces).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((citas).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((licencia).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((doi).toFixed(2))).toFixed(2))
                            ];
                              
        grafica.series = [
                                {'name': '% Completos', 'data': completos }, 
                                {'name': '% Sin dato', 'data': sindato},
                                ];
                                
        var num = 'Suficiencia en datos del documentos (Total:' + class_ver.var.salida.p.length + ')' + 
                '<br>Contenido indizable: ' + parseFloat(c_i.toFixed(2)) + '%';
        $('#documentos').html(num);
        Highcharts.chart('container3', grafica);
    },
    graficaDois:function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartRadialBar));
        grafica.xAxis.categories = ["DOI registrado", "DOI resuelve", "ORCID resuelve", "URL licencia resuelve", "Enlace a texto resuelve"];
        
        var doi_registrado = class_utils.filter_prop(class_ver.var.salida.pd, 'registrado', 1);
        var doi_resuelve = class_utils.filter_prop(class_ver.var.salida.pd, 'resuelve', 1);
        var orcid_resuelve = class_utils.filter_prop(class_ver.var.salida.orcid, 'resuelve', 1);
        var lic_resuelve = class_utils.filter_prop(class_ver.var.salida.val_lic, 'resuelve', 1);
        var enl_resuelve = class_utils.filter_prop(class_ver.var.salida.val_enl, 'resuelve', 1);
        
        doi_registrado = (class_ver.var.salida.pd.length == 0)?0:(doi_registrado.length / class_ver.var.salida.pd.length * 100);
        doi_resuelve = (class_ver.var.salida.pd.length == 0)?0:(doi_resuelve.length / class_ver.var.salida.pd.length * 100);
        orcid_resuelve = (class_ver.var.salida.orcid.length == 0)?0:(orcid_resuelve.length / class_ver.var.salida.orcid.length * 100);
        lic_resuelve = (class_ver.var.salida.val_lic.length == 0)?0:(lic_resuelve.length / class_ver.var.salida.val_lic.length * 100);
        enl_resuelve = (class_ver.var.salida.val_enl.length == 0)?0:(enl_resuelve.length / class_ver.var.salida.val_enl.length * 100);
        
        var completos = [ 
                                parseFloat(doi_registrado.toFixed(2)),
                                parseFloat(doi_resuelve.toFixed(2)),
                                parseFloat(orcid_resuelve.toFixed(2)),
                                parseFloat(lic_resuelve.toFixed(2)),
                                parseFloat(enl_resuelve.toFixed(2))
                            ];
        
        var sindato = [ 
                parseFloat((100 - parseFloat((doi_registrado).toFixed(2))).toFixed(2)),
                parseFloat((100 - parseFloat((doi_resuelve).toFixed(2))).toFixed(2)),
                parseFloat((100 - parseFloat((orcid_resuelve).toFixed(2))).toFixed(2)),
                parseFloat((100 - parseFloat((lic_resuelve).toFixed(2))).toFixed(2)),
                parseFloat((100 - parseFloat((enl_resuelve).toFixed(2))).toFixed(2))
            ]
                              
        grafica.series = [
                                {'name': '% Válido', 'data': completos }, 
                                {'name': '% No Válido', 'data': sindato}
                                ];
                        
        var num = "Precisión en enlaces";
        $('#consis_dois').html(num);
        Highcharts.chart('container4', grafica);
        //$("#area_dois").flip();
        /*setTimeout( function(){
            $("#area_dois").flip(true);
            $("#area_dois").off(".flip");
        }, 1000);*/
        setTimeout( function(){
            class_ver.graficaPromPrec();
        }, 1000);
    },
    graficaOrcid:function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartRadialBar));
        grafica.xAxis.categories = ["ORCID resuelve"];
        
        var orcid_resuelve = class_utils.filter_prop(class_ver.var.salida.orcid, 'resuelve', 1);
        
        orcid_resuelve = parseFloat( (orcid_resuelve.length / class_ver.var.salida.orcid.length * 100).toFixed(2) );
        
        var completos = [ 
                                orcid_resuelve
                            ];
        
        var sindato = [ 
                100 - orcid_resuelve
            ]
                              
        grafica.series = [
                                {'name': '% Válido', 'data': completos }, 
                                {'name': '% No Válido', 'data': sindato}
                                ];
                        
        var num = "Precisión en ORCID";
        $('#consis_orcid').html(num);
        Highcharts.chart('container_orcid', grafica);
        $("#area_orcid").flip();
        setTimeout( function(){
            $("#area_orcid").flip(true);
            $("#area_orcid").off(".flip");
        }, 1000);
    },
    graficaProm:function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartRadialBar));
        grafica.xAxis.categories = ['Valoración']
        
        var total = class_ver.var.salida.p.length;
        var campos_califica = 10;
        var campos_autor = class_ver.var.salida.a.length * 3;
        var total_califica = (total * campos_califica) + campos_autor;
        
        var fallos =    autores_faltantes.length + orcid_faltantes.length + instituciones_faltantes.length + titulos_i1_faltantes.length + 
                        titulos_i2_faltantes.length + resumenes_i1_faltantes.length + resumenes_i2_faltantes.length + palabras_clave_i1_faltantes.length +
                        palabras_clave_i2_faltantes.length + enlaces_faltantes.length + citas_faltantes.length + licencias_faltantes.length + doi_faltantes.length;
        
        var puntos = total_califica - fallos;
        class_ver.var.total.suficiencia = puntos;
        
        var sp = parseFloat(((puntos * 100) / total_califica).toFixed(2));
        
        var completos = [ 
                                (sp >= 80)?sp:0,
                            ];
        var mas60 = [ 
                                (sp > 60 && sp < 80)?sp:0,
                            ];
        var menos60 = [ 
                                (sp < 60)?sp:0,
                            ];
        var prom = [sp];
        class_ver.var.sp = sp;
        var prom2 = [100-sp];
                              
        grafica.series = [
                                {'name': 'Excelente', 'data': completos }, 
                                {'name': 'Suficiente', 'data': mas60},
                                {'name': 'Bajo', 'data': menos60}
                                ];
        grafica.series = [
                                {'name': sp+' %', 'data': prom }, 
                                {'name': '', 'data': prom2}
                                ];
                                
        var color = (sp >= 80)?'green':(sp >= 60)?'lightgreen':'yellow';
                               
        grafica.colors = ['green', 'lightgreen', 'yellow'];
        grafica.colors = [color, 'white'];
        grafica.yAxis.tickInterval = 0;
        var num = 'Valoración considerando Suficiencia';
        $('#promedio').html(num);
        Highcharts.chart('containerp', grafica);
    },
    graficaAuthConsis:function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartRadialBar));
        grafica.xAxis.categories = ['Autor', 'Orcid', 'Afiliación']
        
        var nombre = (class_ver.var.salida.an.length == 0)?0:class_ver.var.salida.consis_a.length / class_ver.var.salida.an.length * 100;
        //var email = class_ver.var.salida.ae.length / class_ver.var.salida.a.length * 100;
        var orcid = (class_ver.var.salida.ao.length == 0)?0:class_ver.var.salida.consis_or.length / class_ver.var.salida.ao.length * 100;
        var instituciones = (class_ver.var.salida.iv.length == 0)?0:class_ver.var.salida.consis_ins.length / class_ver.var.salida.iv.length * 100;
        
        class_ver.consistencia_promedio = nombre + orcid + instituciones;
        
        var completos = [ 
                                parseFloat(nombre.toFixed(2)),
                                parseFloat(orcid.toFixed(2)),
                                parseFloat(instituciones.toFixed(2))
                            ];
                            
        var sindato = [ 
                                parseFloat((100 - parseFloat((nombre).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((orcid).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((instituciones).toFixed(2))).toFixed(2))
                            ];
                              
        grafica.series = [
                                {'name': '% Consistentes', 'data': completos }, 
                                {'name': '% No consistentes', 'data': sindato},
                                ];
                                
        var num = 'Consistencia en datos de autores';
        $('#consis_autores').html(num);
        Highcharts.chart('container_c1', grafica);
    },
    graficaDocsConsis:function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartRadialBar));
        grafica.xAxis.categories = ['Título', 'Título traducido', 'Resumen', 'Resumen traducido', 
                                    'Palabras clave', 'Palabras clave traducidas', 'Enlace texto completo',
                                    'Referencias', 'Licencia', 'DOI'];
        
        //var tituloip = class_ver.var.salida.ptv[class_ver.var.salida.ip].length / class_ver.var.salida.p.length * 100;
        var tituloip = (class_ver.var.salida.pti1.length == 0)?0:class_ver.var.salida.consis_ti1.length / class_ver.var.salida.pti1.length * 100;
        var titulo2i = (class_ver.var.salida.pti2.length == 0)?0:class_ver.var.salida.consis_ti2.length / class_ver.var.salida.pti2.length * 100;
        var resumenip = (class_ver.var.salida.pri1.length == 0)?0:class_ver.var.salida.consis_ri1.length / class_ver.var.salida.pri1.length * 100;
        var resumen2i = (class_ver.var.salida.pri2.length == 0)?0:class_ver.var.salida.consis_ri2.length / class_ver.var.salida.pri2.length * 100;
        var palabra_claveip = (class_ver.var.salida.ppci1.length == 0)?0:class_ver.var.salida.consis_pci1.length / class_ver.var.salida.ppci1.length * 100;
        var palabra_clave2i = (class_ver.var.salida.ppci2.length == 0)?0:class_ver.var.salida.consis_pci2.length / class_ver.var.salida.ppci2.length * 100;
        var enlaces = (class_ver.var.salida.p.length == 0)?0:class_ver.var.salida.ent.length / class_ver.var.salida.p.length * 100;
        var licencia = (class_ver.var.salida.lic.length == 0)?0:class_ver.var.salida.consis_lic.length / class_ver.var.salida.lic.length * 100;
        var citas = (class_ver.var.salida.cit.length == 0)?0:class_ver.var.salida.consis_cit.length / class_ver.var.salida.cit.length * 100;
        var doi = (class_ver.var.salida.pdt.length == 0)?0:class_ver.var.salida.consis_doi.length / class_ver.var.salida.pdt.length * 100;
        
        class_ver.consistencia_promedio += tituloip + titulo2i + resumenip + resumen2i + palabra_claveip + palabra_clave2i + enlaces + licencia + doi;
        
        var completos = [ 
                                parseFloat(tituloip.toFixed(2)),
                                parseFloat(titulo2i.toFixed(2)),
                                parseFloat(resumenip.toFixed(2)),
                                parseFloat(resumen2i.toFixed(2)),
                                parseFloat(palabra_claveip.toFixed(2)),
                                parseFloat(palabra_clave2i.toFixed(2)),
                                parseFloat(enlaces.toFixed(2)),
                                parseFloat(citas.toFixed(2)),
                                parseFloat(licencia.toFixed(2)),
                                parseFloat(doi.toFixed(2))
                            ];
        var sindato = [ 
                                parseFloat((100 - parseFloat((tituloip).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((titulo2i).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((resumenip).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((resumen2i).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((palabra_claveip).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((palabra_clave2i).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((enlaces).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((citas).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((licencia).toFixed(2))).toFixed(2)),
                                parseFloat((100 - parseFloat((doi).toFixed(2))).toFixed(2))
                            ];
                              
        grafica.series = [
                                {'name': '% Consistentes', 'data': completos }, 
                                {'name': '% No consistentes', 'data': sindato},
                                ];
                                
        var num = 'Consistencia en datos del documento';
        $('#consis_documentos').html(num);
        Highcharts.chart('container_c2', grafica);
    },
    graficaPromConsis:function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartRadialBar));
        grafica.xAxis.categories = ['Valoración']
        
        //var total = class_ver.var.total.suficiencia;
        var total = class_ver.var.salida.p.length;
        
        var campos_califica = 10;
        var campos_autor = class_ver.var.salida.a.length * 3;
        var total_califica = (total * campos_califica) + campos_autor;
        
        var fallos =    autores_incons.length + orcid_incons.length + instituciones_incons.length + titulos_i1_incons.length + 
                        titulos_i2_incons.length + resumenes_i1_incons.length + resumenes_i2_incons.length + palabras_clave_i1_incons.length +
                        palabras_clave_i2_incons.length + enlaces_incons.length + citas_incons.length + licencias_incons.length + doi_incons.length;
        
        //var puntos = total_califica - fallos;
        var puntos = class_ver.var.total.suficiencia - fallos;
        
        class_ver.var.total.consistencia = puntos;
        
        var sp = parseFloat(((puntos * 100) / total_califica).toFixed(2));
        class_ver.var.cp = sp;
        
        var completos = [ 
                                (sp >= 80)?sp:0,
                            ];
        var mas60 = [ 
                                (sp > 60 && sp < 80)?sp:0,
                            ];
        var menos60 = [ 
                                (sp < 60)?sp:0,
                            ];
        var prom = [sp];
        var prom2 = [100-sp];
        
        grafica.series = [
                                {'name': sp+' %', 'data': prom }, 
                                {'name': '', 'data': prom2}
                                ];
                                
        var color = (sp >= 80)?'green':(sp >= 60)?'lightgreen':'yellow';
        grafica.colors = [color, 'white'];
        grafica.yAxis.tickInterval = 0;
        
        var num = 'Valoración considerando Suficiencia y Consistencia';
        $('#consis_promedio').html(num);
        Highcharts.chart('containerp2', grafica);
        
        $("#area_cons").flip({trigger: 'manual'});
        $('#btn_prom_cons').text('Ver Valoración');
        $('#btn_prom_cons').show();
        $("#btn_prom_cons").off('click').on('click', function(){
            $("#area_cons").flip('toggle');
            if($('#btn_prom_cons').text() == 'Ver Valoración')
                $('#btn_prom_cons').text('Regresar');
            else
                $('#btn_prom_cons').text('Ver Valoración');
        });
    },
    graficaPromPrec:function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartRadialBar));
        grafica.xAxis.categories = ['Valoración Final']
        
        var txt80p = 'Un <b>porcentaje final de 80% o '
                    + 'superior</b>, cumplir con el <b>100% de suficiencia en la afiliación institucional de los autores</b> '
                    + 'y tener <b>60% de contenido indizable</b> (artículos originales, ensayos, reseñas de libro, revisiones bibliográficas, notas de más de una cuartilla, informes técnicos o cartas al editor) '
                    + 'permite a BIBLAT reutilizar los metadatos para indizar los '
                    + 'documentos de la revista.'
                    + ' A partir de ahora, puede postular su revista a '
                    + 'BIBLAT o evaluar otra revista.';
        
        var txt80 = 'Un <b>porcentaje final de 80% o '
                    + 'superior</b>, cumplir con el <b>100% de suficiencia en la afiliación institucional de los autores</b> '
                    + 'y tener <b>60% de contenido indizable</b> (artículos originales, ensayos, reseñas de libro, revisiones bibliográficas, notas de más de una cuartilla, informes técnicos o cartas al editor) '
                    + 'permite a BIBLAT reutilizar los metadatos para indizar los '
                    + 'documentos de la revista.'
        
        var txt_rep = 'Un <b>porcentaje final menor '
                        + 'a 80%</b>, no cumplir con el <b>100% de suficiencia en la afiliación institucional de los autores</b> '
                        + 'o tener <b>menos del 60% de contenido indizable</b> (artículos originales, ensayos, reseñas de libro, revisiones bibliográficas, notas de más de una cuartilla, informes técnicos o cartas al editor) '
                        + 'no permite a BIBLAT reutilizar los metadatos para indizar los '
                        + 'documentos de la revista. Consulte el cuadro que a parece a '
                        + 'continuación para conocer las posibles mejoras en los metadatos de '
                        + 'su revista y el <a href="/archivos/pdf/ManualDeIndizacionEnOJS_BuenasPracticas.pdf" target="_blank">Manual de indización en OJS: Buenas prácticas para la '
                        + 'región latinoamericana</a>.';
        
        var txt_anio = 'Se muestra el resultado final de la valoración con la información encontrada para el año ' + class_ver.var.id_anio + '.';
        
        var txtReevaluar = '<br><br><center><b>Se enviaron los porcentajes de valoración de su revista<br>Pronto nos pondremos en contacto con usted</b><center>';
        
        var btn_enviar_reev = '<br><br><center><button type="button" class="btn btn-warning btn_val" id="btn_enviar_reev" style="width: 250px;">Enviar resultados de Reevaluación</button><center>';
        
        var btn_postular = '<br><br><center><form method="post" action="preevaluacion" id="form_postular"><input type="hidden" id="url" name="url" value="'+$('#'+class_ver.var.id_oai).val()+'" /><button type="submit" class="btn btn-warning btn_val" id="btn_postular" style="width: 250px;">Continuar con segunda evaluación</button></form><center>';
        
        //var total = class_ver.var.total.suficiencia;
        var total = class_ver.var.salida.p.length;
        
        var campos_califica = 10;
        var campos_autor = class_ver.var.salida.a.length * 3;
        var total_califica = (total * campos_califica) + campos_autor;
        
        //var doi_registrado = class_utils.filter_prop(class_ver.var.salida.pd, 'registrado', 0);
        var doi_resuelve = class_utils.filter_prop(class_ver.var.salida.pd, 'resuelve', 0);
        var orcid_resuelve = class_utils.filter_prop(class_ver.var.salida.orcid, 'resuelve', 0);
        var lic_resuelve = class_utils.filter_prop(class_ver.var.salida.val_lic, 'resuelve', 0);
        var enl_resuelve = class_utils.filter_prop(class_ver.var.salida.val_enl, 'resuelve', 0);
        
        var fallos = doi_resuelve.length + orcid_resuelve.length + lic_resuelve.length + enl_resuelve.length;
        
        //var puntos = total_califica - fallos;
        var puntos = class_ver.var.total.consistencia - fallos;
        
        class_ver.var.total.precision = puntos;
        
        var sp = parseFloat(((puntos * 100) / total_califica).toFixed(2));
        class_ver.var.pp = sp;
        
        var completos = [ 
                                (sp >= 80)?sp:0,
                            ];
        var mas60 = [ 
                                (sp > 60 && sp < 80)?sp:0,
                            ];
        var menos60 = [ 
                                (sp < 60)?sp:0,
                            ];
        var prom = [sp];
        var prom2 = [100-sp];
        
        grafica.series = [
                                {'name': sp+' %', 'data': prom }, 
                                {'name': '', 'data': prom2}
                                ];
                                
        var color = (sp >= 80)?'green':(sp >= 60)?'lightgreen':'yellow';
        grafica.colors = [color, 'white'];
        grafica.yAxis.tickInterval = 0;
        
        var num = 'Valoración considerando Suficiencia, Consistencia y Precisión';
        $('#prec_promedio').html(num);
        Highcharts.chart('container_prec', grafica);
        
        $("#area_prec").flip({trigger: 'manual'});
        $('#btn_prom_prec').text('Ver Valoración Final');
        $('#btn_prom_prec').show();
        $("#btn_prom_prec").off('click').on('click', function(){
            $("#area_prec").flip('toggle');
            if($('#btn_prom_prec').text() == 'Ver Valoración Final')
                $('#btn_prom_prec').text('Regresar');
            else
                $('#btn_prom_prec').text('Ver Valoración Final');
        });
        
        //$('#txt_val_final').parent().css('min-height',$('#container_prec').height());
        
        $('#txt_val_final').show();
        var instituciones = class_ver.var.salida.iv.length / class_ver.var.salida.i.length * 100;
        
        if( class_ver.var.id_anio !== '0' & class_ver.var.id_anio !== ''){
            $('#txt_val_final').html(txt_anio);
        }else{
            if(class_ver.var.reevaluar){
                $('#txt_val_final').html(txt80 + btn_enviar_reev);
            }else{
                if( sp >= 80 && instituciones == 100){
                    if(class_ver.var.postular){
                        class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-metametrics', 'Aprobado', class_ver.cons.expiry);
                        $('#txt_val_final').html(txt80p + btn_postular);
                    }else{
                        $('#txt_val_final').html(txt80);
                    }
                }else{
                    $('#txt_val_final').html(txt_rep);
                }
            }
        }
        
        //$('#btn_postular').off('click').on('click', function(){
        /*$('#form_postular').off('submit').on('submit', function(){
            //e.preventDefault();
            var form = {};
            form.url = $('#'+class_ver.var.id_oai).val();
            window.location.href='preevaluacion';
        });*/
        
        $('#btn_enviar_reev').off('click').on('click', function(){
            class_ver.var.reevaluar = false;
            $('#txt_val_final').html(txt80 + txtReevaluar);
            class_ver.enviar_reev();
        });
		
		$('#btn_pdf').show();
        $('#btn_pdf').off('click').on('click', function(){
            class_ver.getPDF();
        });
    },
    verifica_valor: function(id, valor, compara=''){
        if(compara !== ''){
            if(valor != compara){
                $('#'+id).prop('style','background-color: yellow');
                $('#'+id+'-f').show();
                $('#'+id+'-t').hide();
                return false;
            }else{
                $('#'+id).prop('style','background-color: lightgreen');
                $('#'+id+'-t').show();
                $('#'+id+'-f').hide();
                return true;
            }
        }else{
            if($('#'+id).html() !== '' && valor !== ''){
                $('#'+id).prop('style','background-color: lightgreen');
                $('#'+id+'-t').show();
                $('#'+id+'-f').hide();
                return true;
            }else{
                $('#'+id).prop('style','background-color: yellow');
                $('#'+id+'-f').show();
                $('#'+id+'-t').hide();
                return false;
            }
        }
    },
    valida_dois: function(dois, res, total, num = 0){
        if(dois.length == 0){
            $('#dois').html("No hay DOI's para validar");
            class_ver.var.salida.pd = [];
            class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-doi'+'-'+class_ver.var.id_anio, class_ver.var.salida.pd, class_ver.cons.expiry);
            var res_orcid = [];
            class_ver.valida_orcid(class_ver.var.salida.consis_or, res_orcid);
            return 0;
        }
        
        var url = $('#'+class_ver.var.id_oai).val();
        
        var local_data = class_utils.getWithExpiry($('#'+class_ver.var.id_oai).val()+'-doi'+'-'+class_ver.var.id_anio);
        if(local_data !== null){
            if(local_data.length > 0){
                class_ver.var.salida.pd = local_data;
                var res_orcid = [];
                class_ver.valida_orcid(class_ver.var.salida.consis_or, res_orcid);
                return 0;
            }
        }
        
        var rango_fijo = 1;
        var rango = 1;
        
        if(num == 0)
            total = dois.length;
        var mensaje = "Verificando <num> de " + total + " DOI's";
        
        if(dois.length < rango){
            rango = dois.length;
        }
        
        var recibidos = 0;
        
        $.each(dois.slice(0,rango), function(i,val){
            $.when(
                //class_utils.getResource('http://biblat.local/verificador/get_doi_validate?doi='+val.setting_value)
                //class_utils.getResource('https://doi.org/'+val.setting_value)
                class_utils.getResource('/metametrics/get_doi_validate?doi='+val.doi)
            )
            .then(function(resp){
                var respuesta = resp.responseCode;
                
                if(respuesta == 100){
                    num = num + 1;
                    recibidos = recibidos + 1;
                    $('#dois').html(mensaje.replace('<num>', num));
                    val.registrado = 0;
                    val.resuelve = 0;
                    res.push(val);
                    if(recibidos == rango){
                        if(rango == rango_fijo && dois.length !== rango){
                            setTimeout(function(){class_ver.valida_dois(dois.slice(rango), res, total, num);},1000);
                        }else{
                            class_ver.var.salida.pd = res;
                            class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-doi'+'-'+class_ver.var.id_anio, class_ver.var.salida.pd, class_ver.cons.expiry);
                            //class_ver.graficaDois();
                            var res_orcid = [];
                            class_ver.valida_orcid(class_ver.var.salida.consis_or, res_orcid);
                            return res;
                        }
                    }
                }
                else{
                    //Registrado
                    val.registrado = 1;
                    //num = num + 1;
                    //recibidos = recibidos + 1;
                    //$('#dois').html(mensaje.replace('<num>', num));
                    //if (resp.responseCode){
                    //    val.responseCode = resp.responseCode;
                        //El doi está registrado
                    //}else{
                    //    val.responseCode = 0;
                    //}
                    
                    //var url = resp.resource.primary.URL;
                    var url = resp.values[0].data.value;
                    $.when(
                        class_utils.getResource(class_ver.cons.get_url_validate+url, false, 30000)
                    ).then(function(resp2){
                        num = num + 1;
                        recibidos = recibidos + 1;
                        $('#dois').html(mensaje.replace('<num>', num));

                        //Url válida
                        if(resp2.resp == 'Success'){
                            val.resuelve = 1;
                        }else{
                            val.resuelve = 0;
                        }

                        res.push(val);
                        if(recibidos == rango){
                            if(rango == rango_fijo && dois.length !== rango){
                                setTimeout(function(){class_ver.valida_dois(dois.slice(rango), res, total, num)},1000);
                            }else{
                                class_ver.var.salida.pd = res;
                                class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-doi'+'-'+class_ver.var.id_anio, class_ver.var.salida.pd, class_ver.cons.expiry);
                                var res_orcid = [];
                                class_ver.valida_orcid(class_ver.var.salida.consis_or, res_orcid);
                                //class_ver.graficaDois();
                                return res;
                            }
                        }

                    }).fail(function(){
                        num = num + 1;
                        recibidos = recibidos + 1;
                        $('#dois').html(mensaje.replace('<num>', num));
                        val.resuelve = 0;
                        res.push(val);
                        
                        if(recibidos == rango){
                            if(rango == rango_fijo && dois.length !== rango){
                                setTimeout(function(){class_ver.valida_dois(dois.slice(rango), res, total, num)},1000);
                            }else{
                                class_ver.var.salida.pd = res;
                                class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-doi'+'-'+class_ver.var.id_anio, class_ver.var.salida.pd, class_ver.cons.expiry);
                                var res_orcid = [];
                                class_ver.valida_orcid(class_ver.var.salida.consis_or, res_orcid);
                                //class_ver.graficaDois();
                                return res;
                            }
                        }
                    });
                }
            }).fail(function(){
                num = num + 1;
                recibidos = recibidos + 1;
                $('#dois').html(mensaje.replace('<num>', num));
                val.registrado = 0;
                val.resuelve = 0;
                res.push(val);
                if(recibidos == rango){
                    if(rango == rango_fijo && dois.length !== rango){
                        setTimeout(function(){class_ver.valida_dois(dois.slice(rango), res, total, num),1000});
                    }else{
                        class_ver.var.salida.pd = res;
                        class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-doi'+'-'+class_ver.var.id_anio, class_ver.var.salida.pd, class_ver.cons.expiry);
                        //class_ver.graficaDois();
                        var res_orcid = [];
                        class_ver.valida_orcid(class_ver.var.salida.consis_or, res_orcid);
                        return res;
                    }
                }
            });
        });
    },
    valida_orcid: function(orcid, res, total, num = 0, repite = false){
        if(orcid.length == 0){
            $('#orcid').html("No hay ORCID para validar");
            class_ver.var.salida.orcid = [];
            class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-orcid'+'-'+class_ver.var.id_anio, class_ver.var.salida.orcid, class_ver.cons.expiry);
            var res_lic = [];
            class_ver.valida_lic(class_ver.var.salida.lic, res_lic);
            //class_ver.valida_enlace(class_ver.var.salida.arr_ent, res_lic);
            return 0;
        }
        
        var url = $('#'+class_ver.var.id_oai).val();
        
        var local_data = class_utils.getWithExpiry($('#'+class_ver.var.id_oai).val()+'-orcid'+'-'+class_ver.var.id_anio);
        if(local_data !== null){
            if(local_data.length > 0){
                class_ver.var.salida.orcid = local_data;
                var res_lic = [];
                class_ver.valida_lic(class_ver.var.salida.lic, res_lic);
                return 0;
            }
        }
        
        var rango_fijo = 1;
        var rango = 1;
        if(num == 0){
            res = orcid;
            total = orcid.length;
        }
        /*
        if(num == 0){
            res = JSON.parse(JSON.stringify(orcid));
            if('orcid' in orcid[0]){
                orcid = class_utils.unique(orcid, 'orcid');
                class_ver.var.orcid_etiqueta = 'orcid';
            }else if('url' in orcid[0]){
                orcid = class_utils.unique(orcid, 'url');
                class_ver.var.orcid_etiqueta = 'url';
            }else{
                orcid = class_utils.unique(orcid,'setting_value');
                class_ver.var.orcid_etiqueta = 'setting_value';
            }
            total = orcid.length;
        }*/
        var mensaje = "Verificando <num> de " + total + " ORCID";
        
        if(orcid.length < rango){
            rango = orcid.length;
        }
        var recibidos = 0;
        
        $.each(orcid.slice(0,rango), function(i,val){
            //var reg_orcid = '';
            //reg_orcid = val[etiqueta];
            
            if('orcid' in val){
                class_ver.var.orcid_etiqueta = 'orcid';
            }else if('url' in val){
                class_ver.var.orcid_etiqueta = 'url';
            }else{
                class_ver.var.orcid_etiqueta = 'setting_value';
            }
            
            if('resuelve' in val){
                num = num + 1;
                recibidos = recibidos + 1;
                $('#orcid').html(mensaje.replace('<num>', num));

                if(recibidos == rango){
                    if(rango == rango_fijo && orcid.length !== rango){
                        setTimeout(function(){class_ver.valida_orcid(orcid.slice(rango), res, total, num);},100);
                    }else{
                        class_ver.var.salida.orcid = res;
                        class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-orcid'+'-'+class_ver.var.id_anio, class_ver.var.salida.orcid, class_ver.cons.expiry);
                        //class_ver.graficaOrcid();
                        //class_ver.graficaDois();
                        setTimeout(function(){
                            var res_lic = [];
                            class_ver.valida_lic(class_ver.var.salida.lic, res_lic);
                            //class_ver.valida_enlace(class_ver.var.salida.arr_ent, res_lic);
                        }, 1000);
                        return res;
                    }
                }
                return;
            }
            
            $.when(
                //class_utils.getResource('http://biblat.local/verificador/get_doi_validate?doi='+val.setting_value)
                class_utils.getResource('/metametrics/get_name_by_orcid?orcid='+val[class_ver.var.orcid_etiqueta].split('org/')[1])
            )
            .then(function(resp){
                if(resp.resp == 'Fail'){
                    if(!repite){
                        setTimeout(function(){class_ver.valida_orcid(orcid, res, total, num, true);},100);
                        return 0;
                    }
                    $.each(class_utils.filter_prop(res, class_ver.var.orcid_etiqueta, val[class_ver.var.orcid_etiqueta]), function(i, val_url){
                        val_url.resuelve = 0;
                        val_url.nombre = 'sin';
                    });
                }else{
                    $.each(class_utils.filter_prop(res, class_ver.var.orcid_etiqueta, val[class_ver.var.orcid_etiqueta]), function(i, val_url){
                        val_url.resuelve = 1;
                        val_url.nombre = resp.resp;
                    });
                }
                
                num = num + 1;
                recibidos = recibidos + 1;
                $('#orcid').html(mensaje.replace('<num>', num));

                if(recibidos == rango){
                    if(rango == rango_fijo && orcid.length !== rango){
                        setTimeout(function(){class_ver.valida_orcid(orcid.slice(rango), res, total, num);},100);
                    }else{
                        class_ver.var.salida.orcid = res;
                        class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-orcid'+'-'+class_ver.var.id_anio, class_ver.var.salida.orcid, class_ver.cons.expiry);
                        //class_ver.graficaOrcid();
                        //class_ver.graficaDois();
                        setTimeout(function(){
                            var res_lic = [];
                            class_ver.valida_lic(class_ver.var.salida.lic, res_lic);
                            //class_ver.valida_enlace(class_ver.var.salida.arr_ent, res_lic);
                        }, 1000);
                        return res;
                    }
                }

            }).fail(function(){
                num = num + 1;
                recibidos = recibidos + 1;
                $('#orcid').html(mensaje.replace('<num>', num));
                
                $.each(class_utils.filter_prop(res, class_ver.var.orcid_etiqueta, val[class_ver.var.orcid_etiqueta]), function(i, val_url){
                        val_url.resuelve = 0;
                        val_url.nombre = 'sin';
                    });
                
                if(recibidos == rango){
                    if(rango == rango_fijo && orcid.length !== rango){
                        setTimeout(function(){class_ver.valida_orcid(orcid.slice(rango), res, total, num);},100);
                    }else{
                        class_ver.var.salida.orcid = res;
                        class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-orcid'+'-'+class_ver.var.id_anio, class_ver.var.salida.orcid, class_ver.cons.expiry);
                        setTimeout(function(){
                            var res_lic = [];
                            class_ver.valida_lic(class_ver.var.salida.lic, res_lic);
                        }, 1000);
                        return res;
                    }
                }
            });
        });
    },
    valida_lic: function(licencias, res, total, num = 0, repite = false){
        if(licencias.length == 0){
            $('#lic').html("No hay Licencias para validar");
            class_ver.var.salida.val_lic = [];
            class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-lic'+'-'+class_ver.var.id_anio, class_ver.var.salida.val_lic, class_ver.cons.expiry);
            var res_enl = [];
            class_ver.valida_enlace(class_ver.var.salida.arr_ent, res_enl);
            return 0;
        }
        
        var url = $('#'+class_ver.var.id_oai).val();
        
        var local_data = class_utils.getWithExpiry($('#'+class_ver.var.id_oai).val()+'-lic'+'-'+class_ver.var.id_anio);
        if(local_data !== null){
            if(local_data.length > 0){
                class_ver.var.salida.val_lic = local_data;
                var res_enl = [];
                class_ver.valida_enlace(class_ver.var.salida.arr_ent, res_enl);
                return 0;
            }
        }
        
        var rango_fijo = 1;
        var rango = 1;
        if(num == 0){
            res = JSON.parse(JSON.stringify(licencias));
            licencias = class_utils.unique(licencias,'license');
            total = licencias.length;
        }
        var mensaje = "Verificando <num> de " + total + " Licencias";
        
        if(licencias.length < rango){
            rango = licencias.length;
        }
        var recibidos = 0;
        
        $.each(licencias.slice(0,rango), function(i,val){
            $.when(
                //class_utils.getResource('http://biblat.local/verificador/get_doi_validate?doi='+val.setting_value)
                class_utils.getResource(class_ver.cons.get_contents_validate+val)
            )
            .then(function(resp){
                if(resp.resp == 'Fail'){
                    if(!repite){
                        setTimeout(function(){class_ver.valida_lic(licencias, res, total, num, true);},100);
                        return 0;
                    }
                    $.each(class_utils.filter_prop(res, 'license', val), function(i, val_url){
                        val_url.resuelve = 0;
                        val_url.nombre = 'sin';
                    });
                }else{
                    //val.resuelve = 1;
                    //val.nombre = resp.resp;
                    $.each(class_utils.filter_prop(res, 'license', val), function(i, val_url){
                        val_url.resuelve = 1;
                        val_url.nombre = resp.resp;
                    });
                }
                num = num + 1;
                recibidos = recibidos + 1;
                $('#lic').html(mensaje.replace('<num>', num));

                //res.push(val);
                if(recibidos == rango){
                    if(rango == rango_fijo && licencias.length !== rango){
                        setTimeout(function(){class_ver.valida_lic(licencias.slice(rango), res, total, num);},100);
                    }else{
                        class_ver.var.salida.val_lic = res;
                        class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-lic'+'-'+class_ver.var.id_anio, class_ver.var.salida.val_lic, class_ver.cons.expiry);
                        //class_ver.graficaOrcid();
                        setTimeout(function(){
                            var res_enl = [];
                            //class_ver.valida_lic(class_ver.var.salida.lic, res_enl);
                            class_ver.valida_enlace(class_ver.var.salida.arr_ent, res_enl);
                        }, 1000);
                        return res;
                    }
                }

            })
            .fail(function(){
                setTimeout(function(){class_ver.valida_lic(licencias, res, total, num);},100);
            });
        });
    },
    valida_enlace: function(enlaces, res, total, num = 0, repite = false){
        if(enlaces.length == 0){
            $('#enlace').html("No hay enlaces para validar");
            class_ver.var.salida.val_enl = [];
            class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-enl'+'-'+class_ver.var.id_anio, class_ver.var.salida.val_enl, class_ver.cons.expiry);
            setTimeout(function(){
                class_ver.graficaDois();
                setTimeout(function(){
                    class_ver.resultado();
                    return 0;
                },1000);
            }, 1000);
        }
        
        var url = $('#'+class_ver.var.id_oai).val();
        
        var local_data = class_utils.getWithExpiry($('#'+class_ver.var.id_oai).val()+'-enl'+'-'+class_ver.var.id_anio);
        if(local_data !== null){
            if(local_data.length > 0){
                class_ver.var.salida.val_enl = local_data;
                setTimeout(function(){
                                class_ver.graficaDois();
                                setTimeout(function(){
                                    class_ver.resultado();
                                },1000);
                            }, 1000);
                return 0;
            }
        }
        
        var rango_fijo = 1;
        var rango = 1;
        if(num == 0)
            total = enlaces.length;
        var mensaje = "Verificando <num> de " + total + " Enlaces";
        
        if(enlaces.length < rango){
            rango = enlaces.length;
        }
        var recibidos = 0;
        var url = 'Error';
        
        $.each(enlaces.slice(0,rango), function(i,val){
           if ('enlace_texto' in val){
                if (val['enlace_texto'][0] !== undefined){
                    if (val['enlace_texto'][0]['format'] == 'pdf'){
                        url = val['enlace_texto'][0].url
                    }else{
                        if (val['enlace_texto'][1] !== undefined){
                            if (val['enlace_texto'][1]['format'] == 'pdf'){
                                url = val['enlace_texto'][1].url;
                            }
                        }
                    }
                }
            }
            $.when(
                class_utils.getResource(class_ver.cons.get_contents_validate+url)
            )
            .then(function(resp){
                if(resp.resp == 'Fail'){
                    if(!repite){
                        setTimeout(function(){class_ver.valida_enlace(enlaces, res, total, num, true);}, 1000);
                        return 0;
                    }
                    
                    val.resuelve = 0;
                    val.nombre = 'sin';
                }else{
                    val.resuelve = 1;
                    val.nombre = resp.resp;
                }
                
                num = num + 1;
                recibidos = recibidos + 1;
                $('#enlace').html(mensaje.replace('<num>', num));

                res.push(val);
                if(recibidos == rango){
                    if(rango == rango_fijo && enlaces.length !== rango){
                        setTimeout(function(){class_ver.valida_enlace(enlaces.slice(rango), res, total, num);},1000);
                    }else{
                        class_ver.var.salida.val_enl = res;
                        class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-enl'+'-'+class_ver.var.id_anio, class_ver.var.salida.val_enl, class_ver.cons.expiry);
                        //class_ver.graficaOrcid();
                        setTimeout(function(){
                            class_ver.graficaDois();
                            setTimeout(function(){
                                class_ver.resultado();
                            },1000);
                        }, 1000);
                        return res;
                    }
                }

            })
            .fail(function(){
                setTimeout(function(){class_ver.valida_enlace(enlaces, res, total, num);},100);
            });
        });
    },
    get_pub_id: function(autores){
        var autores_pub_id = [];
        var auth_ids = [];
        $.each(autores, function(i,val){
            auth_ids.push(val.author_id);
        });
        var articulos = JSON.parse(JSON.stringify(class_ver.var.data.articulos));
        
        $.each(articulos, function(i,val){
            var todos = val.autor;
            var completos = true;
            $.each(todos, function(i2, val2){
                if( auth_ids.indexOf(val2.author_id) == -1 ){
                    completos = false;
                    return 0;
                }
            });
            if( autores_pub_id.indexOf(val["id"]) == -1 && completos){
                autores_pub_id.push(val["id"]);
            }
        });
        return autores_pub_id;
    },
    get_pub_by_auth: function(autores){
        var autores_pub_id = [];
        var pub = [];
        $.each(autores, function(i,val){
            if( autores_pub_id.indexOf(val[class_ver.cons.pub_id_auth[class_ver.var.data.ver]]) == -1 ){
                autores_pub_id.push(val[class_ver.cons.pub_id_auth[class_ver.var.data.ver]]);
                pub.push(val);
            }
        });
        return pub;
    },
    get_pub_id2: function(arr){
        var arr_pub_id = [];
        $.each(arr, function(i,val){
            if( arr_pub_id.indexOf(val.id) == -1 ){
                arr_pub_id.push(val.id);
            }
        });
        return arr_pub_id;
    },
    get_autores_pub_id2: function(arr){
        var autores_pub_id = [];
        $.each(arr, function(i,val){
            if( autores_pub_id.indexOf(val.id) == -1 ){
                autores_pub_id.push(val.id);
            }
        });
        return autores_pub_id;
    },
    get_auth_id: function(arr){
        var author_id = [];
        $.each(arr, function(i,val){
            if( author_id.indexOf(val['author_id']) == -1 ){
                author_id.push(val['author_id']);
            }
        });
        return author_id;
    },
    get_data_anios: function(anio = null, anio_fin = null, num_issues = 0, evalua = 3, repetir = 3, anio_diferente = false){
        /* Si no se indica un año se obtienen desde el presente año los 3 últimos fascículos */
        /* Si se indica un año, traerá todos los años desde el indicado hasta donde encuentre hacia atrás */
        /* Si se indica un año fin, hasta ese año se obtendrá información */
        /* Si se indica anio_diferente, hará la búsqueda considerando que el año no es de longitud 4 */
        if (anio == null){
            //anio = (new Date()).getFullYear();
        }else{
            if(anio_fin !== null){
                evalua = null;
            }
        }
	var url = $('#'+class_ver.var.id_oai).val();
        if(anio == null){
            url = class_ver.cons.get_oai.replace('<oai>', url).replace('&years=<years>', '');
        }else{
            url = class_ver.cons.get_oai.replace('<oai>', url).replace('<years>', anio);
        }
        
        var local_data = class_utils.getWithExpiry($('#'+class_ver.var.id_oai).val()+'-'+class_ver.var.id_anio);
        if(local_data !== null){
            class_ver.var.data = local_data;
            class_ver.var.plugin = 'Si';
            class_ver.analisis();
            return 0;
        }
		
		var url_review = class_ver.cons.get_review + $('#'+class_ver.var.id_oai).val();
        if(anio !== null){
            url_review += '&anio=' + anio;
        }
        const hoy = new Date();
        const fecha = hoy.toISOString().split('T')[0];
        var date_review = class_ver.cons.get_content + $('#'+class_ver.var.id_oai).val()+'&from='+fecha;
		
		$.when(
            class_utils.getResource(url_review),
            class_utils.getResource(date_review)
        ).then(function(resp0, resp00){
            if(resp0[0][0] !== undefined){
                var hash1 = resp0[0][0].hash;
                var hash2 = resp00[0].resp;
				
				if(hash1 == 'Generando'){
                    $('#error').html('<center><b>Se está generando la valoración, intente nuevamente en unos minutos ...</b></center>');
                    $('#error').show();
                    loading.end();
                    return 0;
                }
                
                if(hash1 == hash2){
                    class_ver.var.data = JSON.parse(resp0[0][0].metadatos);
                    class_ver.var.plugin = 'Si';
                    class_ver.analisis();
                    return 0;
                }
            }
		
        $.when(
            class_utils.getResource(url)
        )
        .then(function(resp){
            if(resp.resp == 'Fail'){
                var url = $('#'+class_ver.var.id_oai).val();
                if( url.indexOf('/index/oai') !== -1 ){
                    var html = $('#plugin').html();
                    html += '<br><center> <b>Es posible también que la URL OAI que ingresó es incorrecta, puede probar con:</b></center>';
                    html += '<br><br><b><center><span style="font-size:18px">' + url.replace('/index/oai', '/oai') + '</span></center></b>';
                    $('#plugin').html(html);
                }
        
                $('#plugin').show();
                class_ver.var.plugin = 'No';
                class_ver.setBitacora(2);
                loading.end();
                return 0;
			}else if(Array.isArray(resp.res)){
                $('#error').html('<b>El sitio cuenta con más de una revista, estas son las URLs OAI que puede revisar:</b><br><br>' + resp.res.join("<br>"));
                $('#error').show();
                loading.end();
                return 0;
            }else if(resp.resp == 'Generando'){
                $('#error').html('<center><b>Se está generando la valoración, intente nuevamente en unos minutos ...</b></center>');
                $('#error').show();
                loading.end();
                return 0;
            }else{
                class_ver.var.plugin = 'Si';
                if(resp.resp == 'noRecordsMatch'){
                    if(repetir >0 ){
                        class_ver.get_data_anios(anio-1, anio_fin, num_issues, evalua, repetir-1);
                        return 0;
                    }else{
                        $("#numFasciculos").show();
                        class_ver.var.plugin = 'Si';
                        class_ver.setBitacora(2);
                        loading.end();
                        return 0;
                    }
                }else if(anio == null){
                    if( resp.numeros.length < 3 ){
                        $("#numFasciculos").show();
                        class_ver.var.plugin = 'Si';
                        class_ver.setBitacora(2);
                        loading.end();
                        return 0;
                    }
                }
            }
            var data = resp;
            var publicaciones = '';
            
            publicaciones = data.articulos;
            
            //Revisión de issues
            
            var issues_pre = resp.numeros;
            
            if(issues_pre.length == 0){
                publicaciones = [];
            }
            
                    //A qué número pertenece el artículo ??
            
            //alert(publicaciones.length);
            if(publicaciones.length > 0){
                if(class_ver.var.data.length == 0){
                    //alert('data igual a 0')
                    class_ver.var.data = resp;
                }else{
                    //$.each(class_ver.cons.campos, function(i,val){
                    $.each(['articulos', 'idiomas', 'numeros', 'revista'], function(i,val){
                        if(val in class_ver.var.data){
                            //alert('campo' + val);
                            function concatenarUnicos(arreglo1, arreglo2) {
                                const conjuntoResultante = new Set();
                                const arregloResultante = [];

                                // Concatena ambos arreglos
                                const arregloConcatenado = arreglo1.concat(arreglo2);

                                for (const objeto of arregloConcatenado) {
                                  const objetoStr = JSON.stringify(objeto);
                                  if (!conjuntoResultante.has(objetoStr)) {
                                    conjuntoResultante.add(objetoStr);
                                    arregloResultante.push(objeto);
                                  }
                                }

                                return arregloResultante;
                              }
                            class_ver.var.data[val] = concatenarUnicos(class_ver.var.data[val], resp[val]);
                            //class_ver.var.data[val] = resp[val].concat(class_ver.var.data[val]);
                        }
                    });
                }
            }
            
            //hará el recorrid hasta que no encuentre más publicaciones
            //alert('issues:' + num_issues + ' evalua:' + evalua +' repetir:' + repetir);
            if(evalua == null){
                if( anio_fin == anio ){
                    class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-'+class_ver.var.id_anio, class_ver.var.data, class_ver.cons.expiry);
                    class_ver.analisis();
                    return 0;
                }
                if( publicaciones.length > 0 ){
                    //alert('En evalua');
                    class_ver.get_data_anios(anio-1, anio_fin);
                    return 0;
                }
                if( repetir > 0 ){
                    //alert('En repetir');
                    class_ver.get_data_anios(anio-1, anio_fin, num_issues, evalua, repetir-1);
                    return 0;
                }else{
                    class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-'+class_ver.var.id_anio, class_ver.var.data, class_ver.cons.expiry);
                    class_ver.analisis();
                    return 0;
                }
            }
            
            if( publicaciones.length == 0 && evalua == null){
                //alert('Termina');
                return 0;
            }
            
            //total de issues
            //var issues = class_utils.filter_prop(data.i, 'published', '1');
            if(issues_pre.length == 0){
                var issues = [];
            }else{
                var issues = class_ver.var.data.numeros;
                //class_ver.var.data.i = issues_pre;
            }
            
            //Si con esta petición se obtienen los 3 números sólo se corta el arreglo
            //alert((issues.length + num_issues));
            //alert(evalua);
            var obj_extrae={};
            obj_extrae["numeros"] = JSON.parse(JSON.stringify(class_ver.var.data.numeros));
            obj_extrae["issues.length"] = issues.length;
            obj_extrae["evalua"] = evalua;
            revisa_extrae.push(obj_extrae);
            if (evalua !== null){
                //if( (issues.length + num_issues) >= evalua){
                if( (issues.length) >= evalua){
                    //alert(issues.length+' '+(3-num_issues));
                    //class_ver.var.data.i = class_ver.var.data.i.slice(issues.length-(evalua-num_issues));
                    var resto = class_ver.var.data.numeros.slice(3);
                    class_ver.var.data.numeros = class_ver.var.data.numeros.slice(0,3);
                    
                    if(resto.length > 0){
                        var actualiza_articulos = [];
                        $.each(class_ver.var.data.articulos, function(i_art, val_art){
                            $.each(resto, function(i_r, val_r){
                                var str_art = '';
                                var str_resto = '';

                                str_art += ('year' in val_art.numero)?(val_art.numero.year + '-'):'-';
                                str_art += ('vol' in val_art.numero)?(val_art.numero.vol + '-'):'-';
                                str_art += ('num' in val_art.numero)?(val_art.numero.num + '-'):'-';
                                str_art += ('mes' in val_art.numero)?(val_art.numero.mes + '-'):'-';
                                str_art += ('especial' in val_art.numero)?(val_art.numero.especial + '-'):'-';

                                str_resto += ('year' in val_r)?(val_r.year + '-'):'-';
                                str_resto += ('vol' in val_r)?(val_r.vol + '-'):'-';
                                str_resto += ('num' in val_r)?(val_r.num + '-'):'-';
                                str_resto += ('mes' in val_r)?(val_r.mes + '-'):'-';
                                str_resto += ('especial' in val_r)?(val_r.especial + '-'):'-';

                                var obj_extrae={};
                                obj_extrae["str_art"] = str_art;
                                obj_extrae["str_resto"] = str_resto;
                                revisa_extrae.push(obj_extrae);

                                if(str_art !== str_resto){
                                    actualiza_articulos.push(val_art);
                                }
                            });
                        });
                        class_ver.var.data.articulos = actualiza_articulos;
                    }
                    
                    class_utils.setWithExpiry($('#'+class_ver.var.id_oai).val()+'-'+class_ver.var.id_anio, class_ver.var.data, class_ver.cons.expiry);
                    class_ver.analisis();
                    return 0;
                }else{
                    //alert('Repetir:' + (issues.length + num_issues));
                    if(publicaciones.length > 0){
                        //class_ver.get_data_anios(anio-1, anio_fin, (issues.length + num_issues), evalua);
                        class_ver.get_data_anios(anio-1, anio_fin, (issues.length), evalua);
                    }else{
                        if(repetir >0 ){
                            //class_ver.get_data_anios(anio-1, anio_fin, (issues.length + num_issues), evalua, repetir-1);
                            class_ver.get_data_anios(anio-1, anio_fin, (issues.length), evalua, repetir-1);
                        }else{
                            if(class_ver.var.data.i == undefined && !anio_diferente){
                                //Si no se obtivieron datos, cabe la posibilidad que sea por el formato del año, se hará otro intento considerando esta posibilidad
                                class_ver.get_data_anios(0, null, null, null, null, true);
                            }else{
                                $("#numFasciculos").show();
                                class_ver.var.plugin = 'Si';
                                class_ver.setBitacora(2);
                                loading.end();
                                return 0;
                            }
                        }
                    }
                }
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 504 || jqXHR.status === 200) {
                $('#error').html('<center><b>La solicitud hacia el sitio de la revista está tardando demasiado<br>La valoración se sigue generando, intente en unos minutos ...</b></center>');
            } else if (textStatus === 'timeout') {
                $('#error').html('<center><b>La solicitud tardó demasiado</b></center>');
            } else {
                $('#error').html('<center><b>Ocurrió un error al intentar obtener su información</b></center>');
            }

            $('#error').show();
            class_ver.var.plugin = 'No';
            class_ver.setBitacora(2);
            loading.end();
            return 0;
        });
		
		});
    },
    resultado: function(){
                class_ver.setBitacora();
                var url = $('#'+class_ver.var.id_oai).val();
                dicc_tablas = ['Autor', 'Email', 'ORCID', 'Afiliación', 'Título', 'Título traducido', 'Resumen', 'Resumen traducido', 'Palabras clave', 'Palabras clave traducidas',
                                'Enlace', 'Referencias', 'Licencia', 'DOI'];
        //Armado de faltantes
                arr_faltantes = [   doi_faltantes, titulos_i1_faltantes, titulos_i2_faltantes, resumenes_i1_faltantes, resumenes_i2_faltantes,
                                        palabras_clave_i1_faltantes, palabras_clave_i2_faltantes, enlaces_faltantes, autores_faltantes,
                                        email_faltantes, orcid_faltantes, instituciones_faltantes, citas_faltantes, licencias_faltantes];
                
                orden_faltantes = [     autores_faltantes, email_faltantes, orcid_faltantes, instituciones_faltantes, titulos_i1_faltantes, titulos_i2_faltantes, 
                                        resumenes_i1_faltantes, resumenes_i2_faltantes, palabras_clave_i1_faltantes, palabras_clave_i2_faltantes, enlaces_faltantes, citas_faltantes,
                                        licencias_faltantes, doi_faltantes ];
                
                orden_tablas = ['autor', 'email', 'orcid', 'afiliacion', 'titulo', 'titulo_traducido', 'resumen', 'resumen_traducido', 'palabras_clave', 'palabras_clave_traducidas',
                                'enlace', 'referencia', 'licencia', 'doi'];
                
                //ordena primero el que tenga mayor número de registros para hacer un sólo recorrido
                arr_faltantes.sort(function(a, b){return b.length-a.length});
                
                tablas_faltantes = [[],[],[]];
                ids_faltantes = [];
                
                
                //Armado de inconsistentes
                arr_consis = [   doi_incons, titulos_i1_incons, titulos_i2_incons, resumenes_i1_incons, resumenes_i2_incons,
                                        palabras_clave_i1_incons, palabras_clave_i2_incons, enlaces_incons, autores_incons,
                                        orcid_incons, instituciones_incons, citas_incons, licencias_incons];
                
                orden_consis = [     autores_incons, [], orcid_incons, instituciones_incons, titulos_i1_incons, titulos_i2_incons, 
                                        resumenes_i1_incons, resumenes_i2_incons, palabras_clave_i1_incons, palabras_clave_i2_incons, enlaces_incons, citas_incons,
                                        licencias_incons, doi_incons ];
                
                orden_tablas_consis = ['autor', 'email', 'orcid', 'afiliacion', 'titulo', 'titulo_traducido', 'resumen', 'resumen_traducido', 'palabras_clave', 'palabras_clave_traducidas',
                                'enlace', 'referencia', 'licencia', 'doi'];
                
                //ordena primero el que tenga mayor número de registros para hacer un sólo recorrido
                arr_consis.sort(function(a, b){return b.length-a.length});
                
                tablas_consis = [];
                ids_consis = [];
                
                //Impresiciones
                arr_precis = [
                    class_utils.filter_prop(class_ver.var.salida.pd, 'resuelve', 0),
                    [], [], [], [], [], [], 
                    class_utils.filter_prop(class_ver.var.salida.val_enl, 'resuelve', 0),
                    [],
                    class_utils.filter_prop(class_ver.var.salida.orcid, 'resuelve', 0),
                    [], [],                    
                    class_utils.filter_prop(class_ver.var.salida.val_lic, 'resuelve', 0)
                ];
                
                orden_precis = [     
                    [], [], 
                    class_utils.filter_prop(class_ver.var.salida.orcid, 'resuelve', 0),
                    [], [], [], 
                    [], [], [], [], 
                    class_utils.filter_prop(class_ver.var.salida.val_enl, 'resuelve', 0),
                    [],
                    class_utils.filter_prop(class_ver.var.salida.val_lic, 'resuelve', 0),
                    class_utils.filter_prop(class_ver.var.salida.pd, 'resuelve', 0) ];
                                    
                arr_precis.sort(function(a, b){return b.length-a.length});
                ids_precis = [];
                         
                //Recorre con base en el primer elemento que es el de mayor número de elementos
                $.each(arr_faltantes[0], function(i, val){
                    $.each(orden_faltantes, function(i2, val2){
                        var obj = {};
                        if (val2[i] !== undefined && val2[i] !== []){
                            //var id = val2[i].year + '-' + val2[i].volume + '-' + val2[i].number + '-' + val2[i].pages + '-' + val2[i].title;
                            var posicion = ids_faltantes.indexOf(val2[i]["id"]);
                            //alert(posicion);
                            if( posicion == -1 ){
                                obj.year = val2[i].numero.year;
                                obj.volume = ( ['', undefined, null].indexOf(val2[i].numero.vol) !== -1 )?'':val2[i].numero.vol;
                                obj.number = ( ['', undefined, null].indexOf(val2[i].numero.num) !== -1 )?'':val2[i].numero.num;
                                obj.pages = ( ['', undefined, null].indexOf(val2[i].pags) !== -1 )?'':val2[i].pags;
                                obj.title = ( ['', undefined, null].indexOf(val2[i].titulo[0].title) !== -1 )?'<< No se encontró título >>':val2[i].titulo[0].title;
                                
                                
                                var enlace = class_utils.find_prop(val2[i].enlace_texto, 'format', 'html');
                                if(enlace !== undefined){
                                    obj.link = enlace["url"];
                                }else{
                                    obj.link = '#';
                                }
                                
                                ids_faltantes.push(val2[i]["id"]);
                                tablas_faltantes[0].push(obj);
                                tablas_faltantes[1].push(JSON.parse(JSON.stringify(obj)));
                                //alert(ids_faltantes[0]);
                                //alert(id);
                                //alert(tablas_faltantes.length);
                                posicion = ids_faltantes.indexOf(val2[i]["id"]);
                                //alert(posicion);
                            }
                            tablas_faltantes[0][posicion][orden_tablas[i2]] = dicc_tablas[i2];//orden_tablas[i2].replaceAll('_', ' ');
                        }
                    });
                });
                
                $.each(arr_consis[0], function(i, val){
                    $.each(orden_consis, function(i2, val2){
                        var obj = {};
                        if (val2[i] !== undefined && val2[i] !== []){
                            //var id = val2[i].year + '-' + val2[i].volume + '-' + val2[i].number + '-' + val2[i].pages + '-' + val2[i].title;
                            var posicion = ids_faltantes.indexOf(val2[i]["id"]);
                            var posicion_consis = ids_consis.indexOf(val2[i]["id"]);
                            
                            if( posicion_consis == -1 ){
                                ids_faltantes.push(val2[i]["id"]);
                            }
                            //alert(posicion);
                            if( posicion_consis == -1 ){
                                obj.year = val2[i].numero.year;
                                obj.volume = ( ['', undefined, null].indexOf(val2[i].numero.vol) !== -1 )?'':val2[i].numero.vol;
                                obj.number = ( ['', undefined, null].indexOf(val2[i].numero.num) !== -1 )?'':val2[i].numero.num;
                                obj.pages = ( ['', undefined, null].indexOf(val2[i].pags) !== -1 )?'':val2[i].pags;
                                obj.title = ( ['', undefined, null].indexOf(val2[i].titulo[0].title) !== -1 )?'<< No se encontró título >>':val2[i].titulo[0].title;
                                
                                var enlace = class_utils.find_prop(val2[i].enlace_texto, 'format', 'html');
                                if(enlace !== undefined){
                                    obj.link = enlace["url"];
                                }else{
                                    obj.link = '#';
                                }
                                
                                ids_consis.push(val2[i]["id"]);
                                tablas_faltantes[1].push(obj);
                                //alert(ids_faltantes[0]);
                                //alert(id);
                                //alert(tablas_faltantes.length);
                                posicion = ids_faltantes.indexOf(val2[i]["id"]);
                                //alert(posicion);
                            }
                            tablas_faltantes[1][posicion][orden_tablas_consis[i2]] = dicc_tablas[i2];//orden_tablas_consis[i2].replaceAll('_', ' ');
                        }
                    });
                });
                
                
                $.each(arr_precis[0], function(i, val){
                    $.each(orden_precis, function(i2, val2){
                        var obj = {};
                        if (val2[i] !== undefined && val2[i] !== []){
                            //var id = val2[i].year + '-' + val2[i].volume + '-' + val2[i].number + '-' + val2[i].pages + '-' + val2[i].title;
                            var posicion = ids_faltantes.indexOf(val2[i]["id"]);
                            var posicion_prec = ids_precis.indexOf(val2[i]["id"]);
                            //alert(posicion);
                            if( posicion == -1 ){
                                ids_faltantes.push(val2[i]["id"]);
                            }
                            if( posicion_prec == -1 ){
                                obj.year = val2[i].numero.year;
                                obj.volume = ( ['', undefined, null].indexOf(val2[i].numero.vol) !== -1 )?'':val2[i].numero.vol;
                                obj.number = ( ['', undefined, null].indexOf(val2[i].numero.num) !== -1 )?'':val2[i].numero.num;
                                obj.pages = ( ['', undefined, null].indexOf(val2[i].pags) !== -1 )?'':val2[i].pags;
                                obj.title = ( ['', undefined, null].indexOf(val2[i].titulo[0].title) !== -1 )?'<< No se encontró título >>':val2[i].titulo[0].title;
                                
                                var enlace = class_utils.find_prop(val2[i].enlace_texto, 'format', 'html');
                                if(enlace !== undefined){
                                    obj.link = enlace["url"];
                                }else{
                                    obj.link = '#';
                                }
                                
                                ids_precis.push(val2[i]["id"]);
                                if('orcid' in val2[i]){
                                    obj.orcid = val2[i].orcid;
                                }else if('url' in val2[i]){
                                    obj.orcid = val2[i].url;
                                }else if ( val2[i].setting_value == 'orcid'){
                                    obj.orcid = val2[i].setting_value;
                                }
                                
                                posicion = ids_faltantes.indexOf(val2[i]["id"]);
                                
                                tablas_faltantes[2][posicion] = obj;
                                //alert(posicion);
                            }
                            tablas_faltantes[2][posicion][orden_tablas_consis[i2]] = dicc_tablas[i2];
                        }
                    });
                });
                
                tablas_faltantes_orden = JSON.parse(JSON.stringify(tablas_faltantes));
                tablas_faltantes_orden.sort(function(a, b){return b.length-a.length});
                $.each(tablas_faltantes_orden[0], function(i,val){
                    if(tablas_faltantes_orden[0][i] == null){
                        if(tablas_faltantes_orden[1][i] == null){
                            tablas_faltantes_orden[0][i] = tablas_faltantes_orden[2][i];
                        }else{
                            tablas_faltantes_orden[0][i] = tablas_faltantes_orden[1][i];
                        }
                    }
                    Object.assign(tablas_faltantes_orden[0][i], tablas_faltantes_orden[1][i]);
                    Object.assign(tablas_faltantes_orden[0][i], tablas_faltantes_orden[2][i]);
                });
                
                //Tabla autor
                tabla = class_ver.cons.tabla_faltantes.replace('<id>', 'tbl_autores').replace('<id_body>', 'body_autores');
                var body = ''
                $.each(ids_faltantes, function(i,val){
                    var falta = '';
                    var falta_consis = '';
                    var falta_precis = '';
                    
                    $.each(orden_tablas, function(i2, val2){
                        if( tablas_faltantes[0][i] !== undefined ){
                            if(val2 in tablas_faltantes[0][i]){
                                if( falta != ''){
                                    falta += ', ';
                                }
                                falta += tablas_faltantes[0][i][val2];
                            }
                        }
                    });
                    
                    $.each(orden_tablas_consis, function(i2, val2){
                        if (tablas_faltantes[1][i] !== undefined){
                            if(tablas_faltantes[1][i][val2] !== undefined){
                                if(val2 in tablas_faltantes[1][i]){
                                    if( falta_consis != ''){
                                        falta_consis += ', ';
                                    }
                                    falta_consis += tablas_faltantes[1][i][val2];
                                }
                            }
                        }
                    });
                    
                    $.each(orden_tablas_consis, function(i2, val2){
                        if (tablas_faltantes[2][i] !== undefined){
                            if(tablas_faltantes[2][i][val2] !== undefined){
                                if(val2 in tablas_faltantes[2][i]){
                                    if( falta_precis != ''){
                                        falta_precis += ', ';
                                    }
                                    falta_precis += tablas_faltantes[2][i][val2];
                                    //alert(tablas_faltantes[2][i][val2]);
                                }
                            }
                        }
                    });
                    
                    if( falta != '' || falta_consis != '' || falta_precis != ''){
                        if (tablas_faltantes_orden[0][i] !== undefined){
                            body += class_ver.cons.tr_faltantes.replace('<anio>', tablas_faltantes_orden[0][i].year).replace('<vol>', tablas_faltantes_orden[0][i].volume).replace('<num>', tablas_faltantes_orden[0][i].number).replace('<pag>', tablas_faltantes_orden[0][i].pages).replace('<tit>', tablas_faltantes_orden[0][i].title).replace('<falta>', falta).replace('<consis>', falta_consis).replace('<precis>', falta_precis).replace('<enlace>', tablas_faltantes_orden[0][i].link);
                        }
                    }
                });
                tabla = tabla.replace('<body>', body);
                
                $('#div_resultado').html(tabla);

                class_utils.setTabla('tbl_autores',{"order": [[ 1, "desc" ]]});
    },
	getPDF: function(){
        
        function getBase64Image(url, callback) {
            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => callback(reader.result);
                    reader.readAsDataURL(blob);
                })
                .catch(error => console.error("Error al cargar la imagen:", error));
        };
        
        function generarTabla(doc, startX, startY, tableWidth, numColumns, data, longestColumn, finalY, Ypaginanueva) {
            if (!data.length || numColumns < 1) return; // Validación de datos

            const minRowHeight = 20; // Altura mínima de una fila
            const longestColumnWidth = 150; // Ancho fijo para la columna más larga
            const regularColumnWidth = (tableWidth - longestColumnWidth) / (numColumns - 1); // Ancho de otras columnas
            const colReducidas = {'col1': null, 'col2': null, 'col3': null};
            const colAumenta = {'col6': null, 'col7': null, 'col8': null};

            // Extraer nombres de las columnas desde la primera fila
            const columnNames = Object.keys(data[0]);

            let y = startY; // Iniciar en Y definida

            // Función para agregar una nueva página
            function nuevaPagina() {
                doc.addPage();
                y = Ypaginanueva; // Reiniciar Y en la nueva página
                
                doc.setFont("helvetica", "bold");
                doc.setFontSize(8);
                let x = startX;
                columnNames.forEach(col => {
                    let colWidth = col === longestColumn ? longestColumnWidth : regularColumnWidth;
                    if(col in colReducidas){
                        colWidth = colWidth - 20;
                    }
                    if(col in colAumenta){
                        colWidth = colWidth + 20;
                    }
                    
                    doc.setFillColor(230, 181, 111);
                    doc.rect(x, y, colWidth, minRowHeight + 15, 'DF');
                    doc.text( doc.splitTextToSize(data[0][col], colWidth), x + 5, y + 12);
                    x += colWidth;
                });
                
                doc.setFont("helvetica", "normal");
                y += minRowHeight + 15; // Mover a la siguiente fila
            }

            // Dibujar encabezados
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            let x = startX;
            columnNames.forEach(col => {
                let colWidth = col === longestColumn ? longestColumnWidth : regularColumnWidth;
                if(col in colReducidas){
                    colWidth = colWidth - 20;
                }
                if(col in colAumenta){
                    colWidth = colWidth + 20;
                }
                
                doc.setFillColor(230, 181, 111);
                doc.rect(x, y, colWidth, minRowHeight + 15, 'DF');
                doc.text(doc.splitTextToSize(data[0][col], colWidth), x + 5, y + 12);
                x += colWidth;
            });

            y += minRowHeight + 15; // Mover a la siguiente fila

            // Dibujar filas de datos con altura dinámica
            doc.setFont("helvetica", "normal");
            data.slice(1).forEach(row => { // Excluimos el encabezado (primer elemento)
                let maxHeight = minRowHeight; // Altura máxima inicial de la fila
                let cellTexts = [];
                let cellHref = [];

                // Calcular la altura más grande de la fila
                columnNames.forEach(col => {
                    let colWidth = col === longestColumn ? longestColumnWidth : regularColumnWidth;
                    if(col in colReducidas){
                        colWidth = colWidth - 20;
                    }
                    if(col in colAumenta){
                        colWidth = colWidth + 20;
                    }
                    
                    let text = '';
                    if(typeof row[col] == 'object'){
                        text = doc.splitTextToSize(row[col].text.toString(), colWidth - 10); // Ajuste del texto
                        cellHref.push(row[col].href);
                    }else{
                        text = doc.splitTextToSize(row[col].toString(), colWidth - 10); // Ajuste del texto
                        cellHref.push("");
                    }
                    cellTexts.push({ text, colWidth });
                    let rowHeight = text.length * 15; // Cada línea ocupa 10 puntos
                    if (rowHeight > maxHeight) {
                        maxHeight = rowHeight; // Ajustar la altura de la fila
                    }
                });

                // Verificar si la fila cabe en la página, si no, agregar nueva página
                if (y + maxHeight > finalY) {
                    nuevaPagina();
                }

                // Dibujar la fila
                x = startX;
                let i = 0;
                cellTexts.forEach(cell => {
                    if(cellHref[i] == ""){
                        doc.text(cell.text, x + 5, y + 12);
                    }else{
                        doc.setTextColor(0, 0, 255);
                        doc.textWithLink(cell.text[0], x + 5, y + 12, { url: cellHref[i] });
                        doc.setTextColor(0, 0, 0);
                    }
                    doc.rect(x, y, cell.colWidth, maxHeight);
                    x += cell.colWidth;
                    i++;
                });

                y += maxHeight; // Mover a la siguiente fila
            });
            
            return y;
        }

        
        // Destructure jsPDF from the UMD module
        const { jsPDF } = window.jspdf;

        // Initialize a new jsPDF instance
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',      // points, 72pt = 1 inch
          format: 'letter' // 'letter' = 612 x 792 pt
        });

        var font = "AAEAAAAUAQAABABAR0RFRgF5/boAAtOAAAACjEdQT1PtlGGtAALWDAAAd+BHU1VCn062nwADTewAAA80T1MvMkr5pwYAAAHIAAAAYFNUQVTR/M//AANdIAAAAHxjbWFwCHaCBgAAFkQAAAsMY3Z0ICGdFcYAADLkAAAAwGZwZ21Xiw8QAAAhUAAAD4NnYXNwAAcAGwAC03QAAAAMZ2x5Zi06/zMAAD20AAF92mhlYWQkovWaAAABTAAAADZoaGVhDPwN3gAAAYQAAAAkaG10eEImvNUAAAIoAAAUHGtlcm6guJNzAAG7kAABBExsb2NhJQ2CuQAAM6QAAAoQbWF4cAiEEOYAAAGoAAAAIG1ldGE2o3hTAANdnAAAAQJuYW1lb7af/wACv9wAABN1cG9zdP+fADIAAtNUAAAAIHByZXBwhf8TAAAw1AAAAg8AAQAAAAICj5wnOw1fDzz1AAsIAAAAAADdpHX6AAAAAOJoMjX8Af3NCXUIFAAAAAYAAgAAAAAAAAABAAAHg/2/AAAKJvwB+PIJdQgAAAAAAAAAAAAAAAAAAAAFBwABAAAFBwDAABAAcAAIAAIAEAAvAQAAAQJMD4MACAABAAQEfAGQAAUACAUzBM0AAACaBTMEzQAAAs0AZgLbAAACCwAEAgICAgIEIAAChwAAAAMAAAAAAAAAAE1TICAAwAAN/fwHg/2/AAAIFAIzIAABnwAAAAADzgVCAAAAIAADA8UAAAS3AAgEtwAIBLcACAS3AAgEtwAIBLcACAS3AAgEtwAIBLcACAS3AAgEtwAIBLcACAS3AAgEtwAIBLcACAS3AAgEtwAIBLcACAS3AAgEtwAIBLcACAS3AAgEtwAIB3f/3wd3/98E1QCwBYwAEgWKAGwFigBsBYoAbAWKAGwFigBsBYoAbAV9ALAFfQAABX0AAAV9ALAFfQAABjMAEgRzALAEcwCwBHMAsARzALAEcwCwBHMAsARzALAEcwA5BHMAsARzALAEcwCwBHMAsARzALAEcwCwBHMAsARzALAEcwCwBJEAXgR0AGkEcwCwBa4AbASBAFIEMgCwBDIAAgWrAGwFqwBsBasAbAWrAGwFqwBsBasAbAWoALAFqAASBagAsAIVALAEvACwAhUAsAIV/+4CFf/gAhX//AIVAKECFQChAhX/3AIVAKQCFf/5AhUALQIV/+cCpgAlAqYAJQSMALAEjACwBIwAsAP/ALAD/wCwA/8AsAP/ALAD/wCwA/8AAAZSALAFpgCwBaYAsAWmALAFpgCwBaYAsAWmALAFpgCwBdwAbAXcAGwF3ABsBdwAbAXcAGwF3ABsBdwAbAXcAGwF3ABsBdwAbAXcAGwF3ABsBdwAbAYiAGwGIgBsBiIAbAYiAGwGIgBsBiIAbAXcAGwF3ABsBdwAbAWKAGYF3ABsBdwAbAXcAGwIewBsBJ4AsASeALAF3ABsBNkAsATZALAE2QCwBNkAsASHAEwEhwBMBIcATASHAEwEhwBMBIcATASHAEwFWgCwA9QAEgPUABID1AASA9QAEgPUABIFcwCfBXMAnwVzAJ8FcwCfBXMAnwVzAJ8FcwCfBXMAnwYIAJ8GCACfBggAnwYIAJ8GCACfBggAnwVzAJ8FcwCfBXMAnwVzAJ8FcwCfBK8ACAQsAAgFcwCfByMAAgcjAAIHIwACByMAAgcjAAIEbAAOBFEAAARRAAAEUQAABFEAAARRAAAEUQAABHQAAARRAAAEUQAABFEAAAQgACcEIAAnBCAAJwQgACcDEQA4AxEAOAMRADgDEQA4AxEAOAMRADgDEQA4AxEAOAMRADgDEQA4AxEAOARAAGoEQABqBEAAagRAAGoEQABqBEAAagRAAGoEQABqBEAAagRAAGoEQABqBEAAAQRAAGoEQABqBEAAagRAAGoEQABqBEAAagRAAGoEQABqBEAAagRAAGoEQABqBsIAagbCAGoEfQChBH0AoQQzAGoEMwBqBDMAagQzAGoEMwBqBDMAagR8AGoEagBqBHwAagR8AGoEmABqBHwAagQ3AGoENwBqBDcAagQ3AGoENwBqBDcAagQ3AGoEN//4BDcAagQ3AGoENwBqBDcAagQ3AGoENwBqBDcAagQ3AGoENwBqA/cAXwIK//4ENwBqBDcAawQ3AGsD3wAnAmkAIAPgAEUDsQAAA+AARQPgAEUD4ABFA+AARQPgAEUEaQChBGkAIgRpAKEB6QCMAekAoQHpAJYB6f/oAen/zAHpAAAB6QCMAekAjAHp/8UB6QCNA9IAjAHpACMB6QAPAen/0gHp/+QB6f/kAen/zAPlAKED5QChA+UAoQPlAKECFQCWAhUAkgIVAJYCFQCWAkgAlgIVAAAG0wChBGkAoQRpAKEEzf++BGkAoQRpAKEEaQCh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BJ4AsAWKAGwGUgCwBYwAZgWKAGwFigBmBzIAnwS3AE8FBQCwBJsASwS4ADsFggBsBD0AEgMRADgDk/+oAxEAOASDAGoEXgCWA54AAARqAGoD9wBfA1QAYwRpAKEEZAB1AhYAlwPlAKEDngAABIAAoQOeAAADUQBjBGoAagSsACAEfQCXA2wAagSjAGoDZwAgBIUAlwVeAGoDrgAABZ0AlwZnAIkCFgCXAhb/6wIW/+IEhQCXBIUAlwSFAJcEagBqBmcAiQSDAGoD9wBfBGkAoQLcAKEEAAAgBJoAoQQzAGoEMwBqBDMAagRqAGoDmwBqA6kAoQPqAGoE8wAzBKcAOwReAJYEZAB1BV4AagSsACAEpwA7BH0AlwQzAGoB6f/kAw4AagR9AKEFSgChBH0AJAbTAJcEaQCIBHkAoQQSAGcEJwBEBGQAagOFADsCywDcCiYAsARGAGAERgDABEYAXQRGAGIERgA4BEYAXwRGAGAERgBfBEYAZARGAF0ERgBtBf4ATAX+AEwF/gBMBf4ATAX+AEwF/gBMBf4ATAX+AEwF/gBMBf4ATAX+AEwF/gBMBf4ATAX+AEwF/gBMBf4ATAX+AEwF/gBMBf4ATAX+AEwEWABfArcAGwRDAFMEQwBOBEYAOARHAFcEXABeA9EAHQQ+AGAEWwBWBJMAbwLeAEAEWABxBEYAYgRYAD0ERgBfBEYAYARSAF8EQwBkBEYAXQRGAGAERgDABEYAXQRGAGIERgA4BEYAXwRGAGAERgBfBEYAZARGAF0ERgBkBEYA6gRGAGEERgBiBEYANgRGAF8ERgBgBEYAXwRGAGQERgBdArgAMQK4AHkCuAA1ArgANgK4ABwCuAA3ArgAMQK4ACoCuAAzArgANQK4ADECuAB5ArgANQK4ADYCuAAcArgANwK4ADECuAAqArgAMwK4ADUBJP7BBhcAJAYHACQGlAA1Ba0AJAY8ADYF+AAkBpQANQaUADYGlAAcBfgAJAaUADcGBwAkBpQANgaUADcF5gAqArgAMQK4AHkCuAA1ArgANgK4ABwCuAA3ArgAMQK4ACoCuAAzArgANQK4ADECuAB5ArgANQK4ADYCuAAcArgANwK4ADECuAAqArgAMwK4ADUAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9wAAP9YAAD/3AAA/r8AAAAABGoAAAGgAAABoAAAAksApAIpAIACxgB2AsYAdgJJAKQCSQCAAkkApAJJAIAGiwCkAlgArQJLAKYEAwBSBAMAUgJJAKQDwgCmA6gAXQQ5AK0EHABSBEwANQOuAAACtwAXArcAFwK5AGMCuQBjA64AAAdcAAAHXAAAA64AAAOuAAACygBrAsoAawOuAAAHXAAAAlgAhAJYAEoCWwAHAlsASwJbAIgCWwBLAlsAhQJYAEoCWwAHAlsASwJbAIgCWwBLAikAgAOfAIADngCFA58AgAIpAIUCKQCAAikAhQNTAFoDUwBaAe4AWgHuAFoC9QCGAa8AhgNTAFoDUwBaAe4AWgHuAFoCaQAEBM0ASwHuADEB7gAxBDMAagRGAN0G+gBqBEYAJARYAHIERgBbB28AWgRGANQF+gBgBEYAcgYAAGAGAABgBf4AkwYnAF4F/gBgBygAbAUlAGoEegBMA8IAZgX+AEwDvwBqBf4ATAQzABsHAwBqAuwAOQGwAIYC3wCGAikAzAIpAMwDpABMBMgA2wOkAEwGlgB9CNUAsAX+AEwEoABgBJkANQRmACEERgBtBFgAUwRGAHQEWABTBFgAUwRGAGkERgBOBFgAagjjAAAERgAUBIUASwRYAAIFygCwBNUAbASgAGwEbgACBGYATgRGAFcERgA+BFgALwVWAJ8FMwChBIwAIwaqAGAERgAUBFgAFgRGADgIWQCwBEYAXgYrAKcF7QBMBEYAUARGAEwEWABUByQAXwRGACYD9wF+ArcAGQRGAHEDKwBgAysBQgRGAHEERgBxBEYAcQRGAL0ERgBxBEYAcQRGAHEERgBxBEYAcwRGAEcERgBGBEYAcQRGACUERgAlBEYAcQRGAJUF2QBMBI8AtQMrAGAF3wBmBLgAOwWUALAEAAAnBX4AYASAAKEEagBQBI8AlgacAGAJOQBgBEYBrATNAJ4EzQDUBM0AXATNANQEzQChBM0A1ATNAFwEzQDUBzMAXAREAFwERABcBf4ATAX+AEwF/gBMBf4ATAX+AEwF/gBMBf4ATAX+AEwF/gBMBf4ATAX+AL8DwgCmA40AOQYAAGADwgCoA8IAqgQA//YEAAG8BAD/9gQA//YEAAG8BAABvAAA/XEAAP1PAAABGwAAAP0AAAEbAAABGwAAAP0AAP+WBGoB4wS1/38EagEMAAABJwAAAcwAAAEGAAAB1wAAAT8AAAJD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AP8AOAEEACsA9wBDARAAQQEOAEUBEgBEAREASAEVAEcBFABVASMAUwEhAEwBGQBUASIATwEXAEoBIABXASYAWQEoASkAXAEsAF4BLgBdAS0AXwEvAGABMABjATMAZQE2AGQBNQE0AGgBOQB9AU4AawE8AHwBTQCDAVQAiAFZAIoBWwCJAVoAjAFdAI8BYACOAV8AjQFeAJYBaACVAWcAlAFmAKoBfACnAXkAmgFsAKkBewCmAXgAqAF6ALABgQC2AYcAtwC/AZAAwQGSAMABkQFkACMAJwA6ADwAOQA/BBkAWgEqAHYBRwCgAXIArQC6AYsAQgEPAH4BTwBmATcAFgDiABkA5QCBAVIAkAFhAJcBaQC8AY0A5wFQAPMA8gThBNsE4gTmBOME3gS4BLkEvATABMEEvgS3BLYEwgS/BLoEvQLtAy4C7gMvBBsEHALvAzADTQMxAzIDMwPcAssEswS1AuQD2wLlAuYC5wLpAuoDJQLrAuwDKwMsAy0DIwMoAyQDJwMpAyYDKgL1AzoDOwL2AvcC+AM8Az0DOQLwAzQC8QM1AvIDNgLzAzcC9AM4AwADRgMBA0cDAgNIAwMDSQMEA0oDBQNLAwYDTAM+Az8DQANBAvkDQgQdAvoDQwL7AvwDRANFAv0C/gL/AcEBwgHqAboB4gHhAeQB5QHmAd8B4AHnAcoBxwHUAdsBtgG3AbgBuQG/AcABwwHEAcUBxgHJAdUB1gHYAdcB2QHaAd4B3QHcAeMB6AHpAjkCOgI7AjwCQgJDAkYCRwJIAkkCTAJYAlkCWwJaAlwCXQJhAmACXwJmAmsCbAJEAkUCbQI9AmUCZAJnAmgCaQJiAmMCagJNAkoCVwJeAesCbgHsAm8B7QJwAe4CcQHvAnIB8AJzAfECdAHyAnUB8wJ2AfQCdwH1AngB9gJ5AfcCegTnBOgE6QTqBOsE7AIvArIEGgStBK4ErwSwBLEEqwSsAcgCSwIwArMCMQK0AbsCPgG9AkABvgJBAfgCewH5AnwB+gJ9AfsCfgH8An8B/QKAAf4CgQH/AoICAAKDAgIChQIDAoYCBAKHAgUCiAIGAokCBwKKAggCiwIJAowCCgKNAgsCjgIMAo8CDQKQAg4CDwKSAhACkwIRApQCEgKVAhMClgIUApcCFQKYApECFgKZAhcCmgIYApsCGQKcAhoCnQIbAp4CHAKf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SzlLZkuPS7VLvUviS+pL8kwOTBZMJ0wvTDdMZ0ybTNVNG01MTXlNr03lTi1Obk52TrtO/08HT0BPSE9QT59P3lAwUGNQnFD5USxRd1HTUkNSrVK1Ur1S6FMmUzJTe1OOU8VT81QnVFdUjVS9VP9VM1WJVc9V+lYkVlhWm1bJVwNXPldGV51X/VgFWBdYXliUWMVY+lk7WXJZg1mVWZ1Zrlm2WchZ21ntWipaO1pNWl9apVq3Wsla2lrsWv9bEVsjW1RbnlveW+Zb7lwsXGNcuF0SXWddb12pXgFeCV4aXixeNF5RXlleYV6fXu9fTl+dX/FgBGAMYB1gL2A3YD9gR2BPYFdghGCMYJRgnGDmYO5g9mEUYRxhJGFKYVJhWmFiYY9hl2GfYadhr2HwYkBiU2JlYndiiWKcYq5iwWLUYuZjAmMxYzljg2PFY+pkKmRnZKhk2WTkZPZk/mUGZQ5lFmVWZWJlbmXRZgxmSGabZudnMmdoZ3BnfGePZ9loLmhZaKJo8GkxaWBpq2nJafJqJWotajVqh2qPar5q+Gs8a3lroGvSbBdsUmyMbOJs9W0IbRxtLm1AbVNtZW14bYptnG2ubctt+W4BbjpuhW7QbxVvWm+Cb8NwBHBjcGtwc3B7cINwzXEbcSNxK3FecWZxkXHVcixyZ3KmcvhzRXN+c65zt3QYdFp0fnS4dQh1NXV6dc516nZSdqh293c4d4x39Xg8eJ15AXk9ebh6IXqSeu97X3vkfEx8y31MfaN+On7Af09/V396f4J/in+Sf5p/on+qf7J/un/ugBCASYBSgIGAioCSgJuAo4CsgLSAvIDEgMyA1IDcgOSA7ID0gPyBNoFZgWGBaoFygXuBg4GMgZSBnYHWgfeCKoJ0gpyC3oMjgz2Dl4Pgg+mD8oP7hASEDYQWhB+EKIQxhDqET4RghHGEgoSThKSEtYTGhNeE6IT5hQqFG4UshT2FToVXhWCFaYVyhXuFhIWNhZaFn4WohbGFuoXDhcyF1YXeheeF8IX5hgKGAoYChgKGAoYChg+GLoZJhmSGZIZkhmSGZIZthnmGmYa3htKG+ocGhxKHIodSh4KH0ogliC6IUIiDiI+I7Yk+iUeJW4lwiYGJiYmZiamJsYnBicyJ3YnlifWKBYorilCKmIrfiviLEYs2i1uLoovpjAGMGYwijC+MdoyCjKqM0Yz3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mQFL/slWbzokAZ78MgAABACh/wAEYQPOAAMABwALABEAI0ASAQUGcg8JCQgADGkADQgIBApyACsyETMzKxEzETMrMjAxYREzESERMxEjNSEVExEnJzMRAymn/NGnMQI6cgYJrQPO/DIDzvwyh4f/AAEAD3j+eQAFAKEAAAYGA84AAwAHAAsADwATAClAFA0BAQUGchEJCQgMEBAAAAgIBApyACsyETMRMxEzETMRMysyETMwMWERMxEhETMRIzUhFSERMxEhNSEVAwCn/PqnMQIRAjen/XACEQPO/DIDzvwyh4cDzvwyh4cAAAYAof8ABpkDzgADAAcACwAPABMAGQAvQBgNAQEFBnIRCQkIFwwUaQwQEAAACAgECnIAKzIRMxEzETMrMxEzETMrMhEzMDFhETMRIREzESM1IRUhETMRITUhFRMRJzUzEQMAp/z6pzECEQI3p/1wAhF0EK4DzvwyA878MoeHA878MoeH/wABABpt/nkABACh/wAD0APOAAMABwALAA8AIUAQAQUGcg0JCQwIYAAICAQKcgArMhEzGhDOMxI5KzIwMWERMxEhETMRIzUhFQERMxEDKaf80acxAjr+mp0DzvwyA878MoeH/wABNf7LAAACAKEAAAOaA84ACwAUABdACxQDAwABBnIMAApyACsyKxE5LzMwMXMRMxEzMhYWFRQGIyczMjY1NCYjI6GpwnezZNqyxMFud3htwQPO/pY6hHCjk4JSYmRKAAADAKEAAASzA84ACwAUABgAG0ANFAMDABYBBnIVDAAKcgArMjIrMhE5LzMwMXMRMxEzMhYWFRQGIyczMjY1NCYjIwERMxGhqZl3s2TaspuYbnd4bZgCwagDzv6WOoVvo5OCUmFlSv4cA878MgADACAAAARWA84ACwAUABgAG0ANFAMDABUCFgZyDAAKcgArMisyMhE5LzMwMWERMxEzMhYWFRQGIyczMjY1NCYjIwE1IRUBhaqZd7Rj2rKbmG54eW2Y/fEB3wPO/pY6hHCjk4JSYmRKAWOHhwACABb/8wWRA84AGwAkAB9AECQAABILGgZyExILchwJCnIAKzIrMisyETkvMzAxQTMyFhYVFAYjIREhAw4DIyM1MzI+AjcTIREzMjY1NCYjIwNnnHezZNuy/rz+5kwOMUhhPCANHzAmHAteAkqabnh4bpoCZDqEcKOT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/5MAAwC2/5MAAwC3/5MAAwC4/5MAAwC5/5MAAwC6/5MAAwC7/5MAAwC8/5MAAwC9/5MAAwPfACcAAwPgACcAAwPm/5UAAwPq/4UAAwQK/3kAAwQL/4AAAwQM/3kAAwQN/4AAAwQO/3kAAwQT/4UAAwQU/4UAAwQx/64AAwQz/48ABACT/6IABACU/6IABACV/6IABACW/6IABACX/6IABACs/5MABAC0/5MABAC1/5MABAC2/5MABAC3/5MABAC4/5MABAC5/5MABAC6/5MABAC7/5MABAC8/5MABAC9/5MABAPm/5UABAPq/4UABAQK/3kABAQL/4AABAQM/3kABAQN/4AABAQO/3kABAQT/4UABAQU/4UABAQx/64ABAQz/48ABQCT/6IABQCU/6IABQCV/6IABQCW/6IABQCX/6IABQCs/5MABQC0/5MABQC1/5MABQC2/5MABQC3/5MABQC4/5MABQC5/5MABQC6/5MABQC7/5MABQC8/5MABQC9/5MABQPm/5UABQPq/4UABQQK/3kABQQL/4AABQQM/3kABQQN/4AABQQO/3kABQQT/4UABQQU/4UABQQx/64ABQQz/48ABgCT/6IABgCU/6IABgCV/6IABgCW/6IABgCX/6IABgCs/5MABgC0/5MABgC1/5MABgC2/5MABgC3/5MABgC4/5MABgC5/5MABgC6/5MABgC7/5MABgC8/5MABgC9/5MABgPm/5UABgPq/4UABgQK/3kABgQL/4AABgQM/3kABgQN/4AABgQO/3kABgQT/4UABgQU/4UABgQz/48ABwCT/6IABwCU/6IABwCV/6IABwCW/6IABwCX/6IABwCs/5MABwC0/5MABwC1/5MABwC2/5MABwC3/5MABwC4/5MABwC5/5MABwC6/5MABwC7/5MABwC8/5MABwC9/5MABwPm/5UABwPq/4UABwQK/3kABwQL/4AABwQM/3kABwQN/4AABwQO/3kABwQT/4UABwQU/4UABwQz/48ACACT/6IACACU/6IACACV/6IACACW/6IACACX/6IACACs/5MACAC0/5MACAC1/5MACAC2/5MACAC3/5MACAC4/5MACAC5/5MACAC6/5MACAC7/5MACAC8/5MACAC9/5MACAPm/5UACAPq/4UACAQK/3kACAQL/4AACAQM/3kACAQN/4AACAQO/3kACAQT/4UACAQU/4UACAQx/64ACAQz/48ACQAc/9cACQBA/9cACQBB/9cACQCL//4ACQCN//4ACQCT/6IACQCU/6IACQCV/6IACQCW/6IACQCX/6IACQCY/98ACQCs/5MACQC0/5MACQC1/5MACQC2/5MACQC3/5MACQC4/5MACQC5/5MACQC6/5MACQC7/5MACQC8/5MACQC9/5MACQEMACcACQPgACcACQPm/5UACQPq/4UACQQK/3kACQQL/4AACQQM/3kACQQN/4AACQQO/3kACQQT/4UACQQU/4UACQQz/48ACgCT/6IACgCU/6IACgCV/6IACgCW/6IACgCX/6IACgCs/5MACgC0/5MACgC1/5MACgC2/5MACgC3/5MACgC4/5MACgC5/5MACgC6/5MACgC7/5MACgC8/5MACgC9/5MACgPm/5UACgPq/4UACgQK/3kACgQL/4AACgQM/3kACgQN/4AACgQO/3kACgQT/4UACgQU/4UACgQx/64ACgQz/48ACwCT/6IACwCU/6IACwCV/6IACwCW/6IACwCX/6IACwCs/5MACwC0/5MACwC1/5MACwC2/5MACwC3/5MACwC4/5MACwC5/5MACwC6/5MACwC7/5MACwC8/5MACwC9/5MACwPm/5UACwPq/4UACwQK/3kACwQL/4AACwQM/3kACwQN/4AACwQO/3kACwQT/4UACwQU/4UACwQx/64ACwQz/48ADACT/6IADACU/6IADACV/6IADACW/6IADACX/6IADACs/5MADAC0/5MADAC1/5MADAC2/5MADAC3/5MADAC4/5MADAC5/5MADAC6/5MADAC7/5MADAC8/5MADAC9/5MADAPm/5UADAPq/4UADAQK/3kADAQL/4AADAQM/3kADAQN/4AADAQO/3kADAQT/4UADAQU/4UADAQx/64ADAQz/48ADQCT/6IADQCU/6IADQCV/6IADQCW/6IADQCX/6IADQCs/5MADQC0/5MADQC1/5MADQC2/5MADQC3/5MADQC4/5MADQC5/5MADQC6/5MADQC7/5MADQC8/5MADQC9/5MADQPm/5UADQPq/4UADQQK/3kADQQL/4AADQQM/3kADQQN/4AADQQO/3kADQQT/4UADQQU/4UADQQx/64ADQQz/48ADgCT/6IADgCU/6IADgCV/6IADgCW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/+EAQAAR/+EAQAAV/+EAQAAX/+EAQAAY/5oAQACT/8gAQACr/9wAQACu//kAQACz/9UAQAC0/9IAQQAY/5oAQgAY/5oAQwAY/5oARAAY/5oARQAY/5oARQCr/9wAVgAB/98AVgAC/98AVgAD/98AVgAJ/98AVgAP/98AVgAR/98AVgAT/98AVgAU/98AVgAV/98AVgAX/98AVgAY/7wAVgBW/+EAVgDNAAgAVgDOAAgAVgDbAAgAVgDhAAgAVgDkAAgAVgPf/8gAVgPg/8gAVgPv//sAWAAYAAUAWAAc/7MAWAAd/7MAWAAe/7MAWAAf/7MAWABA/7MAWABWABwAWABp/7MAWABq/7MAWABs/7MAWABy/7MAWAB8/7MAWAB9/7MAWACA/7MAWACC/7MAWACG/7MAWACL/+kAWACM/+kAWACN/+kAWACO/+kAWACT/+QAWACY/8sAWACZ/8sAWACb/8sAWACc/8sAWACn/8sAWACo/8sAWACp/8sAWACr/+4AWACu/+4AWAC0/+YAWAC1/+YAWADN//QAWADO//QAWADV//QAWADb//QAWADf//QAWADh//QAWADq/9oAWADu/9oAWAD0/9oAWAD1/9oAWAD+/9oAWAD//9oAWAED/9oAWAEE/9oAWAEL//YAWAEx//gAWAEy//gAWAE6/9oAWAE7/9oAWAFD/9oAWAFN/9oAWAFR/9oAWAFT/9oAWAFY//gAWAFc/+EAWAFq/8UAWAFu/8UAWAF5/8UAWAF9/+cAWAF//+cAWAGF/+cAWAGG/+cAWAPm/9cAWAPo/64AWAPx/7MAWAQP/8IAWQBp/7MAWQCL/+kAWQD0/9oAWQPo/64AWgPo/64AWwABABkAWwACABkAWwADABkAWwAJABkAWwAPABkAWwARABkAWwATABkAWwAUABkAWwAVABkAWwAXABkAWwAYACsAWwAc/8gAWwAe/8gAWwAf/8gAWwBA/8gAWwBWABQAWwBp/8gAWwBq/8gAWwBs/8gAWwBy/8gAWwB0/8gAWwB8/8gAWwB9/8gAWwCA/8gAWwCC/8gAWwCG/8gAWwCT/4MAWwCU/4MAWwCV/4MAWwCW/4MAWwCX/4MAWwCY/8IAWwCZ/8IAWwCc/8IAWwCm/8IAWwCn/8IAWwCo/8IAWwCp/8IAWwCr/4IAWwCs/2YAWwCu/6cAWwCv/6cAWwCw/6cAWwCx/6cAWwCy/6cAWwC0/2YAWwC1/2YAWwC2/2YAWwC3/2YAWwC4/2YAWwC5/2YAWwC6/2YAWwC7/2YAWwC8/2YAWwC9/2YAWwDNABkAWwDOABkAWwDPABkAWwDbABkAWwDdABkAWwDfABkAWwDhABkAWwDkABkAWwD0AAUAWwD1AAUAWwD+AAUAWwD/AAUAWwE6AAUAWwE7AAUAWwFDAAUAWwFNAAUAWwFRAAUAWwFTAAUAWwFqAAIAWwFrAAIAWwFuAAIAWwF5AAIAWwF9/8YAWwF//8YAWwGF/8YAWwGG/8YAWwPm/3AAWwPq/z0AWwPw/5oAWwPxAAoAWwQK/zMAWwQL/2YAWwQM/zMAWwQN/2YAWwQO/zMAWwQP/8IAWwQT/64AWwQU/64AWwQx/4UAWwQz/1wAXACT/4MAXACU/4MAXACV/4MAXACW/4MAXACX/4MAXACr/4IAXACs/2YAXACu/6cAXACv/6cAXACw/6cAXACx/6cAXACy/6cAXAC0/2YAXAC1/2YAXAC2/2YAXAC3/2YAXAC4/2YAXAC5/2YAXAC6/2YAXAC7/2YAXAC8/2YAXAC9/2YAXAPm/3AAXAPq/z0AXAPw/5oAXAQK/zMAXAQL/2YAXAQM/zMAXAQN/2YAXAQO/zMAXAQT/64AXAQU/64AXAQx/4UAXAQz/1wAXgBA/8gAXgBE/8gAXgBp/8gAXgCT/4MAXgCU/4MAXgCV/4MAXgCW/4MAXgCX/4MAXgCY/8IAXgCn/8IAXgCr/4IAXgCs/2YAXgCu/6cAXgCv/6cAXgCw/6cAXgCx/6cAXgCy/6cAXgC0/2YAXgC1/2YAXgC2/2YAXgC3/2YAXgC4/2YAXgC5/2YAXgC6/2YAXgC7/2YAXgC8/2YAXgC9/2YAXgE6AAUAXgPm/3AAXgPq/z0AXgPw/5oAXgQK/zMAXgQL/2YAXgQM/zMAXgQN/2YAXgQO/zMAXgQT/64AXgQU/64AXgQx/4UAXgQz/1wAYAABABkAYAAUABkAYAAc/8gAYABA/8gAYABp/8gAYABq/8gAYACT/4MAYACU/4MAYACV/4MAYACW/4MAYACX/4MAYACY/8IAYACr/4IAYACs/2YAYACu/6cAYACv/6cAYACw/6cAYACx/6cAYACy/6cAYAC0/2YAYAC1/2YAYAC2/2YAYAC3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/1wAkwDz/1wAkwD0/1wAkwD1/1wAkwD2/1wAkwD3/1wAkwD4/1wAkwD5/1wAkwD6/1wAkwD8/1wAkwD9/1wAkwD+/1wAkwD//1wAkwEA/1wAkwEB/1wAkwEC/1wAkwED/1wAkwEE/1wAkwEF/1wAkwEH/1wAkwEI/1wAkwEJ/1wAkwEL/9QAkwEM/4cAkwEO/4cAkwEP/4cAkwEQ/4cAkwER/4cAkwES/4cAkwEX/6QAkwEhAC4AkwEp/6QAkwEx/6QAkwEy/6QAkwEz/6QAkwE1/6QAkwE2/6QAkwE3/6QAkwE4/6QAkwE5/6QAkwE6/1wAkwE7/1wAkwE8/1wAkwE9/1wAkwE+/1wAkwE//1wAkwFB/1wAkwFC/1wAkwFD/1wAkwFE/1wAkwFF/1wAkwFG/1wAkwFH/1wAkwFI/1wAkwFJ/1wAkwFK/1wAkwFL/1wAkwFM/1wAkwFN/1wAkwFO/1wAkwFP/1wAkwFQ/1wAkwFR/1wAkwFS/1wAkwFT/1wAkwFU/1wAkwFV/6QAkwFX/1wAkwFY/6QAkwFZ/6QAkwFa/6QAkwFb/6QAkwFc/5oAkwFd/5oAkwFe/5oAkwFf/5oAkwFg/5oAkwFh/5oAkwFi/5oAkwFq/7gAkwFr/7gAkwFu/7gAkwF5/7gAkwF6/7gAkwF9/7gAkwF//7gAkwGF/7gAkwGG/7gAkwGP/8MAkwPf/1cAkwPg/1cAkwPh/64AkwPi/64AkwPj/1cAkwPmAAUAkwPo/2YAkwPv/6kAkwPx/48AkwPz/48AkwP0/48AkwQI/1cAkwQJ/1cAkwQK/+gAkwQLAAoAkwQNAAoAkwQP/4UAkwQQ/7gAkwQR/4UAkwQt/7MAkwQzAFIAlAAB/6IAlAAC/6IAlAAD/6IAlAAE/6IAlAAF/6IAlAAG/6IAlAAH/6IAlAAI/6IAlAAJ/6IAlAAK/6IAlAAL/6IAlAAM/6IAlAAN/6IAlAAO/6IAlAAP/6IAlAAQ/6IAlAAR/6IAlAAS/6IAlAAT/6IAlAAU/6IAlAAV/6IAlAAW/6IAlAAX/6IAlAAY/0QAlAAZ/6IAlADN/2YAlADO/2YAlADP/2YAlADQ/2YAlADR/2YAlADS/2YAlADT/2YAlADU/2YAlADV/2YAlADW/2YAlADX/2YAlADZ/2YAlADa/2YAlADb/2YAlADc/2YAlADd/2YAlADe/2YAlADf/2YAlADg/2YAlADh/2YAlADi/2YAlADj/2YAlADk/2YAlADl/2YAlADo/1wAlADp/1wAlADq/1wAlADr/1wAlADs/1wAlADt/1wAlADu/1wAlADv/1wAlADw/1wAlADx/1wAlADy/1wAlADz/1wAlAD0/1wAlAD1/1wAlAD2/1wAlAD3/1wAlAD4/1wAlAD5/1wAlAD6/1wAlAD8/1wAlAD9/1wAlAD+/1wAlAD//1wAlAEA/1wAlAEB/1wAlAEC/1wAlAED/1wAlAEE/1wAlAEF/1wAlAEH/1wAlAEI/1wAlAEJ/1wAlAEM/4cAlAEO/4cAlAEP/4cAlAEQ/4cAlAER/4cAlAES/4cAlAEX/6QAlAEp/6QAlAEx/6QAlAEy/6QAlAEz/6QAlAE1/6QAlAE2/6QAlAE3/6QAlAE4/6QAlAE5/6QAlAE6/1wAlAE7/1wAlAE8/1wAlAE9/1wAlAE+/1wAlAE//1wAlAFB/1wAlAFC/1wAlAFD/1wAlAFE/1wAlAFF/1wAlAFG/1wAlAFH/1wAlAFI/1wAlAFJ/1wAlAFK/1wAlAFL/1wAlAFM/1wAlAFN/1wAlAFO/1wAlAFP/1wAlAFQ/1wAlAFR/1wAlAFS/1wAlAFT/1wAlAFU/1wAlAFV/6QAlAFX/1wAlAFY/6QAlAFZ/6QAlAFa/6QAlAFb/6QAlAFc/5oAlAFd/5oAlAFe/5oAlAFf/5oAlAFg/5oAlAFh/5oAlAFi/5oAlAPf/1cAlAPg/1cAlAPj/1cAlAPo/2YAlAPv/6kAlAPx/48AlAPz/48AlAP0/48AlAQI/1cAlAQJ/1cAlAQP/4UAlAQR/4UAlQAB/6IAlQAC/6IAlQAD/6IAlQAE/6IAlQAF/6IAlQAG/6IAlQAH/6IAlQAI/6IAlQAJ/6IAlQAK/6IAlQAL/6IAlQAM/6IAlQAN/6IAlQAO/6IAlQAP/6IAlQAQ/6IAlQAR/6IAlQAS/6IAlQAT/6IAlQAU/6IAlQAV/6IAlQAW/6IAlQAX/6IAlQAY/0QAlQAZ/6IAlQBp/8gAlQDN/2YAlQDO/2YAlQDP/2YAlQDQ/2YAlQDR/2YAlQDS/2YAlQDT/2YAlQDU/2YAlQDV/2YAlQDW/2YAlQDX/2YAlQDZ/2YAlQDa/2YAlQDb/2YAlQDc/2YAlQDd/2YAlQDe/2YAlQDf/2YAlQDg/2YAlQDh/2YAlQDi/2YAlQDj/2YAlQDk/2YAlQDl/2YAlQDo/1wAlQDp/1wAlQDq/1wAlQDr/1wAlQDs/1wAlQDt/1wAlQDu/1wAlQDv/1wAlQDw/1wAlQDx/1wAlQDy/1wAlQDz/1wAlQD0/1wAlQD1/1wAlQD2/1wAlQD3/1wAlQD4/1wAlQD5/1wAlQD6/1wAlQD8/1wAlQD9/1wAlQD+/1wAlQD//1wAlQEA/1wAlQEB/1wAlQEC/1wAlQED/1wAlQEE/1wAlQEF/1wAlQEH/1wAlQEI/1wAlQEJ/1wAlQEM/4cAlQEO/4cAlQEP/4cAlQEQ/4cAlQER/4cAlQES/4cAlQEX/6QAlQEp/6QAlQEx/6QAlQEy/6QAlQEz/6QAlQE1/6QAlQE2/6QAlQE3/6QAlQE4/6QAlQE5/6QAlQE6/1wAlQE7/1wAlQE8/1wAlQE9/1wAlQE+/1wAlQE//1wAlQFB/1wAlQFC/1wAlQFD/1wAlQFE/1wAlQFF/1wAlQFG/1wAlQFH/1wAlQFI/1wAlQFJ/1wAlQFK/1wAlQFL/1wAlQFM/1wAlQFN/1wAlQFO/1wAlQFP/1wAlQFQ/1wAlQFR/1wAlQFS/1wAlQFT/1wAlQFU/1wAlQFV/6QAlQFX/1wAlQFY/6QAlQFZ/6QAlQFa/6QAlQFb/6QAlQFc/5oAlQFd/5oAlQFe/5oAlQFf/5oAlQFg/5oAlQFh/5oAlQFi/5oAlQPf/1cAlQPg/1cAlQPh/64AlQPi/64AlQPj/1cAlQPo/2YAlQPv/6kAlQPx/48AlQPz/48AlQP0/48AlQQI/1cAlQQJ/1cAlQQK/+gAlQQP/4UAlQQR/4UAlQQzAFIAlgAB/6IAlgAC/6IAlgAD/6IAlgAE/6IAlgAF/6IAlgAG/6IAlgAH/6IAlgAI/6IAlgAJ/6IAlgAK/6IAlgAL/6IAlgAM/6IAlgAN/6IAlgAO/6IAlgAP/6IAlgAQ/6IAlgAR/6IAlgAS/6IAlgAT/6IAlgAU/6IAlgAV/6IAlgAW/6IAlgAX/6IAlgAY/0QAlgAZ/6IAlgDN/2YAlgDO/2YAlgDP/2YAlgDQ/2YAlgDR/2YAlgDS/2YAlgDT/2YAlgDU/2YAlgDV/2YAlgDW/2YAlgDX/2YAlgDZ/2YAlgDa/2YAlgDb/2YAlgDc/2YAlgDd/2YAlgDe/2YAlgDf/2YAlgDg/2YAlgDh/2YAlgDi/2YAlgDj/2YAlgDk/2YAlgDl/2YAlgDo/1wAlgDp/1wAlgDq/1wAlgDr/1wAlgDs/1wAlgDt/1wAlgDu/1wAlgDv/1wAlgDw/1wAlgDx/1wAlgDy/1wAlgDz/1wAlgD0/1wAlgD1/1wAlgD2/1wAlgD3/1wAlgD4/1wAlgD5/1wAlgD6/1wAlgD8/1wAlgD9/1wAlgD+/1wAlgD//1wAlgEA/1wAlgEB/1wAlgEC/1wAlgED/1wAlgEE/1wAlgEF/1wAlgEH/1wAlgEI/1wAlgEJ/1wAlgEM/4cAlgEO/4cAlgEP/4cAlgEQ/4cAlgER/4cAlgES/4cAlgEX/6QAlgEp/6QAlgEx/6QAlgEy/6QAlgEz/6QAlgE1/6QAlgE2/6QAlgE3/6QAlgE4/6QAlgE5/6QAlgE6/1wAlgE7/1wAlgE8/1wAlgE9/1wAlgE+/1wAlgE//1wAlgFB/1wAlgFC/1wAlgFD/1wAlgFE/1wAlgFF/1wAlgFG/1wAlgFH/1wAlgFI/1wAlgFJ/1wAlgFK/1wAlgFL/1wAlgFM/1wAlgFN/1wAlgFO/1wAlgFP/1wAlgFQ/1wAlgFR/1wAlgFS/1wAlgFT/1wAlgFU/1wAlgFV/6QAlgFX/1wAlgFY/6QAlgFZ/6QAlgFa/6QAlgFb/6QAlgFc/5oAlgFd/5oAlgFe/5oAlgFf/5oAlgFg/5oAlgFh/5oAlgFi/5oAlgPf/1cAlgPg/1cAlgPh/64AlgPi/64AlgPj/1cAlgPo/2YAlgPv/6kAlgPx/48AlgPz/48AlgP0/48AlgQI/1cAlgQJ/1cAlgQP/4UAlgQR/4UAlgQzAFIAlwAB/6IAlwAC/6IAlwAD/6IAlwAE/6IAlwAF/6IAlwAG/6IAlwAH/6IAlwAI/6IAlwAJ/6IAlwAK/6IAlwAL/6IAlwAM/6IAlwAN/6IAlwAO/6IAlwAP/6IAlwAQ/6IAlwAR/6IAlwAS/6IAlwAT/6IAlwAU/6IAlwAV/6IAlwAW/6IAlwAX/6IAlwAY/0QAlwAZ/6IAlwDN/2YAlwDO/2YAlwDP/2YAlwDQ/2YAlwDR/2YAlwDS/2YAlwDT/2YAlwDU/2YAlwDV/2YAlwDW/2YAlwDX/2YAlwDZ/2YAlwDa/2YAlwDb/2YAlwDc/2YAlwDd/2YAlwDe/2YAlwDf/2YAlwDg/2YAlwDh/2YAlwDi/2YAlwDj/2YAlwDk/2YAlwDl/2YAlwDo/1wAlwDp/1wAlwDq/1wAlwDr/1wAlwDs/1wAlwDt/1wAlwDu/1wAlwDv/1wAlwDw/1wAlwDx/1wAlwDy/1wAlwDz/1wAlwD0/1wAlwD1/1wAlwD2/1wAlwD3/1wAlwD4/1wAlwD5/1wAlwD6/1wAlwD8/1wAlwD9/1wAlwD+/1wAlwD//1wAlwEA/1wAlwEB/1wAlwEC/1wAlwED/1wAlwEE/1wAlwEF/1wAlwEH/1wAlwEI/1wAlwEJ/1wAlwEM/4cAlwEO/4cAlwEP/4cAlwEQ/4cAlwER/4cAlwES/4cAlwEX/6QAlwEp/6QAlwEx/6QAlwEy/6QAlwEz/6QAlwE1/6QAlwE2/6QAlwE3/6QAlwE4/6QAlwE5/6QAlwE6/1wAlwE7/1wAlwE8/1wAlwE9/1wAlwE+/1wAlwE//1wAlwFB/1wAlwFC/1wAlwFD/1wAlwFE/1wAlwFF/1wAlwFG/1wAlwFH/1wAlwFI/1wAlwFJ/1wAlwFK/1wAlwFL/1wAlwFM/1wAlwFN/1wAlwFO/1wAlwFP/1wAlwFQ/1wAlwFR/1wAlwFS/1wAlwFT/1wAlwFU/1wAlwFV/6QAlwFX/1wAlwFY/6QAlwFZ/6QAlwFa/6QAlwFb/6QAlwFc/5oAlwFd/5oAlwFe/5oAlwFf/5oAlwFg/5oAlwFh/5oAlwFi/5oAlwPf/1cAlwPg/1cAlwPh/64AlwPi/64AlwPj/1cAlwPo/2YAlwPv/6kAlwPx/48AlwPz/48AlwP0/48AlwQI/1cAlwQJ/1cAlwQP/4UAlwQR/4UAlwQzAFIAmAAB/98AmAAC/98AmAAD/98AmAAJ/98AmAAT/98AmAAV/98AmAAX/98AmAAY/5wAmABW/+QAmACz/+wAmADN//4AmAFc//4AmAFe//4AmAPf/80AmAPg/80AmAPv/+cAmQAB/98AmQAY/5wAmQBW/+QAmQFc//4AmQPf/80AmQPg/80AmgAY/5wAmwAY/5wAnAAB/98AnAAY/5wAnAFc//4AnAPf/80AnAPg/80AnQAY/5wAngAY/5wAngBW/+QAngPf/80AngPg/80AnwAY/5wAoAAB/5AAoAAC/5AAoAAD/5AAoAAE/5AAoAAF/5AAoAAG/5AAoAAH/5AAoAAI/5AAoAAJ/5AAoAAK/5AAoAAL/5AAoAAM/5AAoAAN/5AAoAAO/5AAoAAP/5AAoAAQ/5AAoAAR/5AAoAAS/5AAoAAT/5AAoAAU/5AAoAAV/5AAoAAW/5AAoAAX/5AAoAAZ/5AAoADo/6oAoADp/6oAoADq/6oAoADr/6oAoADs/6oAoADt/6oAoADu/6oAoADv/6oAoADw/6oAoADx/6oAoADy/6oAoADz/6oAoAD0/6oAoAD1/6oAoAD2/6oAoAD3/6oAoAD4/6oAoAD5/6oAoAD6/6oAoAD8/6oAoAD9/6oAoAD+/6oAoAD//6oAoAEA/6oAoAEB/6oAoAEC/6oAoAED/6oAoAEE/6oAoAEF/6oAoAEH/6oAoAEI/6oAoAEJ/6oAoAEM/5oAoAEO/5oAoAEP/5oAoAEQ/5oAoAER/5oAoAES/5oAoAE6/6oAoAE7/6oAoAE8/6oAoAE9/6oAoAE+/6oAoAE//6oAoAFB/6oAoAFC/6oAoAFD/6oAoAFE/6oAoAFF/6oAoAFG/6oAoAFH/6oAoAFI/6oAoAFJ/6oAoAFK/6oAoAFL/6oAoAFM/6oAoAFN/6oAoAFO/6oAoAFP/6oAoAFQ/6oAoAFR/6oAoAFS/6oAoAFT/6oAoAFU/6oAoAFX/6oAoQAB/5AAoQAC/5AAoQAD/5AAoQAE/5AAoQAF/5AAoQAG/5AAoQAH/5AAoQAI/5AAoQAJ/5AAoQAK/5AAoQAL/5AAoQAM/5AAoQAN/5AAoQAO/5AAoQAP/5AAoQAQ/5AAoQAR/5AAoQAS/5AAoQAT/5AAoQAU/5AAoQAV/5AAoQAW/5AAoQAX/5AAoQAZ/5AAoQDo/6oAoQDp/6oAoQDq/6oAoQDr/6oAoQDs/6oAoQDt/6oAoQDu/6oAoQDv/6oAoQDw/6oAoQDx/6oAoQDy/6oAoQDz/6oAoQD0/6oAoQD1/6oAoQD2/6oAoQD3/6oAoQD4/6oAoQD5/6oAoQD6/6oAoQD8/6oAoQD9/6oAoQD+/6oAoQD//6oAoQEA/6oAoQEB/6oAoQEC/6oAoQED/6oAoQEE/6oAoQEF/6oAoQEH/6oAoQEI/6oAoQEJ/6oAoQEM/5oAoQEO/5oAoQEP/5oAoQEQ/5oAoQER/5oAoQES/5oAoQE6/6oAoQE7/6oAoQE8/6oAoQE9/6oAoQE+/6oAoQE//6oAoQFB/6oAoQFC/6oAoQFD/6oAoQFE/6oAoQFF/6oAoQFG/6oAoQFH/6oAoQFI/6oAoQFJ/6oAoQFK/6oAoQFL/6oAoQFM/6oAoQFN/6oAoQFO/6oAoQFP/6oAoQFQ/6oAoQFR/6oAoQFS/6oAoQFT/6oAoQFU/6oAoQFX/6oAogAB/5AAogAC/5AAogAD/5AAogAE/5AAogAF/5AAogAG/5AAogAH/5AAogAI/5AAogAJ/5AAogAK/5AAogAL/5AAogAM/5AAogAN/5AAogAO/5AAogAP/5AAogAQ/5AAogAR/5AAogAS/5AAogAT/5AAogAU/5AAogAV/5AAogAW/5AAogAX/5AAogAZ/5AAogDo/6oAogDp/6oAogDq/6oAogDr/6oAogDs/6oAogDt/6oAogDu/6oAogDv/6oAogDw/6oAogDx/6oAogDy/6oAogDz/6oAogD0/6oAogD1/6oAogD2/6oAogD3/6oAogD4/6oAogD5/6oAogD6/6oAogD8/6oAogD9/6oAogD+/6oAogD//6oAogEA/6oAogEB/6oAogEC/6oAogED/6oAogEE/6oAogEF/6oAogEH/6oAogEI/6oAogEJ/6oAogEM/5oAogEO/5oAogEP/5oAogEQ/5oAogER/5oAogES/5oAogE6/6oAogE7/6oAogE8/6oAogE9/6oAogE+/6oAogE//6oAogFB/6oAogFC/6oAogFD/6oAogFE/6oAogFF/6oAogFG/6oAogFH/6oAogFI/6oAogFJ/6oAogFK/6oAogFL/6oAogFM/6oAogFN/6oAogFO/6oAogFP/6oAogFQ/6oAogFR/6oAogFS/6oAogFT/6oAogFU/6oAogFX/6oAowAB/5AAowAC/5AAowAD/5AAowAE/5AAowAF/5AAowAG/5AAowAH/5AAowAI/5AAowAJ/5AAowAK/5AAowAL/5AAowAM/5AAowAN/5AAowAO/5AAowAP/5AAowAQ/5AAowAR/5AAowAS/5AAowAT/5AAowAU/5AAowAV/5AAowAW/5AAowAX/5AAowAZ/5AAowDo/6oAowDp/6oAowDq/6oAowDr/6oAowDs/6oAowDt/6oAowDu/6oAowDv/6oAowDw/6oAowDx/6oAowDy/6oAowDz/6oAowD0/6oAowD1/6oAowD2/6oAowD3/6oAowD4/6oAowD5/6oAowD6/6oAowD8/6oAowD9/6oAowD+/6oAowD//6oAowEA/6oAowEB/6oAowEC/6oAowED/6oAowEE/6oAowEF/6oAowEH/6oAowEI/6oAowEJ/6oAowEM/5oAowEO/5oAowEP/5oAowEQ/5oAowER/5oAowES/5oAowE6/6oAowE7/6oAowE8/6oAowE9/6oAowE+/6oAowE//6oAowFB/6oAowFC/6oAowFD/6oAowFE/6oAowFF/6oAowFG/6oAowFH/6oAowFI/6oAowFJ/6oAowFK/6oAowFL/6oAowFM/6oAowFN/6oAowFO/6oAowFP/6oAowFQ/6oAowFR/6oAowFS/6oAowFT/6oAowFU/6oAowFX/6oApAAB/5AApAAC/5AApAAD/5AApAAE/5AApAAF/5AApAAG/5AApAAH/5AApAAI/5AApAAJ/5AApAAK/5AApAAL/5AApAAM/5AApAAN/5AApAAO/5AApAAP/5AApAAQ/5AApAAR/5AApAAS/5AApAAT/5AApAAU/5AApAAV/5AApAAW/5AApAAX/5AApAAZ/5AApADo/6oApADp/6oApADq/6oApADr/6oApADs/6oApADt/6oApADu/6oApADv/6oApADw/6oApADx/6oApADy/6oApADz/6oApAD0/6oApAD1/6oApAD2/6oApAD3/6oApAD4/6oApAD5/6oApAD6/6oApAD8/6oApAD9/6oApAD+/6oApAD//6oApAEA/6oApAEB/6oApAEC/6oApAED/6oApAEE/6oApAEF/6oApAEH/6oApAEI/6oApAEJ/6oApAEM/5oApAEO/5oApAEP/5oApAEQ/5oApAER/5oApAES/5oApAE6/6oApAE7/6oApAE8/6oApAE9/6oApAE+/6oApAE//6oApAFB/6oApAFC/6oApAFD/6oApAFE/6oApAFF/6oApAFG/6oApAFH/6oApAFI/6oApAFJ/6oApAFK/6oApAFL/6oApAFM/6oApAFN/6oApAFO/6oApAFP/6oApAFQ/6oApAFR/6oApAFS/6oApAFT/6oApAFU/6oApAFX/6oApQAB/5AApQAC/5AApQAD/5AApQAE/5AApQAF/5AApQAG/5AApQAH/5AApQAI/5AApQAJ/5AApQAK/5AApQAL/5AApQAM/5AApQAN/5AApQAO/5AApQAP/5AApQAQ/5AApQAR/5AApQAS/5AApQAT/5AApQAU/5AApQAV/5AApQAW/5AApQAX/5AApQAZ/5AApQDo/6oApQDp/6oApQDq/6oApQDr/6oApQDs/6oApQDt/6oApQDu/6oApQDv/6oApQDw/6oApQDx/6oApQDy/6oApQDz/6oApQD0/6oApQD1/6oApQD2/6oApQD3/6oApQD4/6oApQD5/6oApQD6/6oApQD8/6oApQD9/6oApQD+/6oApQD//6oApQEA/6oApQEB/6oApQEC/6oApQED/6oApQEE/6oApQEF/6oApQEH/6oApQEI/6oApQEJ/6oApQEM/5oApQEO/5oApQEP/5oApQEQ/5oApQER/5oApQES/5oApQE6/6oApQE7/6oApQE8/6oApQE9/6oApQE+/6oApQE//6oApQFB/6oApQFC/6oApQFD/6oApQFE/6oApQFF/6oApQFG/6oApQFH/6oApQFI/6oApQFJ/6oApQFK/6oApQFL/6oApQFM/6oApQFN/6oApQFO/6oApQFP/6oApQFQ/6oApQFR/6oApQFS/6oApQFT/6oApQFU/6oApQFX/6oApgAB/98ApgAY/5wApgBW/+QApgPf/80ApgPg/80ApwAY/5wApwBW/+QApwPf/80ApwPg/80AqAAY/5wAqABW/+QAqAPf/80AqAPg/80AqQAY/5wAqQBW/+QAqQPf/80AqQPg/80AqgAY/5wAqwAB/7MAqwAC/7MAqwAD/7MAqwAJ/7MAqwAP/7MAqwAT/7MAqwAU/7MAqwAV/7MAqwAX/7MAqwAY/0IAqwAc/9cAqwAe/9cAqwBA/9cAqwBE/9cAqwBW/5kAqwBX/5kAqwBp/9cAqwBq/9cAqwBs/9cAqwBy/9cAqwB0/9cAqwB8/9cAqwCA/9cAqwCC/9cAqwCL/+EAqwCN/+EAqwCO/+EAqwCz//gAqwDN/5cAqwDO/5cAqwDP/5cAqwDQ/5cAqwDR/5cAqwDS/5cAqwDT/5cAqwDU/5cAqwDV/5cAqwDW/5cAqwDX/5cAqwDZ/5cAqwDa/5cAqwDb/5cAqwDc/5cAqwDd/5cAqwDe/5cAqwDf/5cAqwDg/5cAqwDh/5cAqwDi/5cAqwDj/5cAqwDk/5cAqwDl/5cAqwDo/6kAqwDp/6kAqwDq/6kAqwDr/6kAqwDs/6kAqwDt/6kAqwDu/6kAqwDv/6kAqwDw/6kAqwDx/6kAqwDy/6kAqwDz/6kAqwD0/6kAqwD1/6kAqwD2/6kAqwD3/6kAqwD4/6kAqwD5/6kAqwD6/6kAqwD8/6kAqwD9/6kAqwD+/6kAqwD//6kAqwEA/6kAqwEB/6kAqwEC/6kAqwED/6kAqwEE/6kAqwEF/6kAqwEH/6kAqwEI/6kAqwEJ/6kAqwEL/88AqwEh/+4AqwEy/9wAqwE6/6kAqwE7/6kAqwE8/6kAqwE9/6kAqwE+/6kAqwE//6kAqwFB/6kAqwFC/6kAqwFD/6kAqwFE/6kAqwFF/6kAqwFG/6kAqwFH/6kAqwFI/6kAqwFJ/6kAqwFK/6kAqwFL/6kAqwFM/6kAqwFN/6kAqwFO/6kAqwFP/6kAqwFQ/6kAqwFR/6kAqwFS/6kAqwFT/6kAqwFU/6kAqwFV/9wAqwFX/6kAqwFY/9wAqwFc/7YAqwFe/7YAqwFl//gAqwFq/8EAqwFu/8EAqwF7/8EAqwGF/98AqwGG/98AqwGP/9oAqwPf/x4AqwPg/x4AqwPh/7MAqwPi/7MAqwPj/x4AqwPo/3sAqwPv/58AqwPx/5oAqwPz/5oAqwP0/5oAqwP9ACQAqwQI/x4AqwQJ/x4AqwQK//YAqwQLAAUAqwQP/7gAqwQQ/8gAqwQt/7gAqwQzAFIArAAB/5MArAAC/5MArAAD/5MArAAE/5MArAAF/5MArAAG/5MArAAH/5MArAAI/5MArAAJ/5MArAAK/5MArAAL/5MArAAM/5MArAAN/5MArAAO/5MArAAP/5MArAAQ/5MArAAR/5MArAAS/5MArAAT/5MArAAU/5MArAAV/5MArAAW/5MArAAX/5MArAAY/zMArAAZ/5MArABW/5UArABX/5UArADN/2wArADO/2wArADP/2wArADQ/2wArADR/2wArADS/2wArADT/2wArADU/2wArADV/2wArADW/2wArADX/2wArADZ/2wArADa/2wArADb/2wArADc/2wArADd/2wArADe/2wArADf/2wArADg/2wArADh/2wArADi/2wArADj/2wArADk/2wArADl/2wArADo/3EArADp/3EArADq/3EArADr/3EArADs/3EArADt/3EArADu/3EArADv/3EArADw/3EArADx/3EArADy/3EArADz/3EArAD0/3EArAD1/3EArAD2/3EArAD3/3EArAD4/3EArAD5/3EArAD6/3EArAD8/3EArAD9/3EArAD+/3EArAD//3EArAEA/3EArAEB/3EArAEC/3EArAED/3EArAEE/3EArAEF/3EArAEH/3EArAEI/3EArAEJ/3EArAEM/2YArAEO/2YArAEP/2YArAEQ/2YArAER/2YArAES/2YArAE6/3EArAE7/3EArAE8/3EArAE9/3EArAE+/3EArAE//3EArAFB/3EArAFC/3EArAFD/3EArAFE/3EArAFF/3EArAFG/3EArAFH/3EArAFI/3EArAFJ/3EArAFK/3EArAFL/3EArAFM/3EArAFN/3EArAFO/3EArAFP/3EArAFQ/3EArAFR/3EArAFS/3EArAFT/3EArAFU/3EArAFX/3EArAFc/4UArAFd/4UArAFe/4UArAFf/4UArAFg/4UArAFh/4UArAFi/4UArAFj/6QArAFq/3sArAFr/3sArAFs/3sArAFt/3sArAFu/3sArAFv/3sArAFw/3sArAFx/3sArAFy/3sArAFz/3sArAF0/3sArAF1/3sArAF2/3sArAF3/3sArAF4/3sArAF5/3sArAF6/3sArAF7/3sArAF8/3sArAF+/3sArAGE/6kArAPf/xQArAPg/xQArAPh/2YArAPi/2YArAPj/xQArAPo/3EArAPv/58ArAPx/5oArAPz/5oArAP0/5oArAQI/xQArAQJ/xQArAQP/4UArAQR/4UArAQt/5UArQAY/5wArgAB/+IArgAP/+IArgAU/+IArgAY/34ArgAc//kArgBA//kArgBW/9IArgBp//kArgBq//kArgBs//kArgBy//kArgCL//sArgCM//sArgCTAB8ArgDN/6sArgDO/6sArgDP/6sArgDQ/6sArgDR/6sArgDS/6sArgDT/6sArgDU/6sArgDV/6sArgDW/6sArgDX/6sArgDZ/6sArgDa/6sArgDb/6sArgDc/6sArgDd/6sArgDe/6sArgDf/6sArgDg/6sArgDh/6sArgDi/6sArgDj/6sArgDk/6sArgDl/6sArgDo/80ArgD0/80ArgEE/80ArgEy//QArgE6/80ArgE7/80ArgE9/80ArgFD/80ArgFV//QArgFY//QArgFc/90ArgFd/90ArgFq/+cArgFu/+cArgGF//4ArgGPAAgArgPf/4UArgPg/4UArgPh/9cArgPi/9cArgPj/4UArgPv/9wArgPx/+UArgQI/4UArgQJ/4UArgQLAAUArgQNAAUArgQzAFIArwAY/34ArwDN/6sArwDO/6sArwDP/6sArwDQ/6sArwDR/6sArwDS/6sArwDT/6sArwDU/6sArwDV/6sArwDW/6sArwDX/6sArwDZ/6sArwDa/6sArwDb/6sArwDc/6sArwDd/6sArwDe/6sArwDf/6sArwDg/6sArwDh/6sArwDi/6sArwDj/6sArwDk/6sArwDl/6sArwPf/4UArwPg/4UArwPj/4UArwQI/4UArwQJ/4UArwQzAFIAsAAY/34AsADN/6sAsADO/6sAsADP/6sAsADQ/6sAsADR/6sAsADS/6sAsADT/6sAsADU/6sAsADV/6sAsADW/6sAsADX/6sAsADZ/6sAsADa/6sAsADb/6sAsADc/6sAsADd/6sAsADe/6sAsADf/6sAsADg/6sAsADh/6sAsADi/6sAsADj/6sAsADk/6sAsADl/6sAsAPf/4UAsAPg/4UAsAPj/4UAsAQI/4UAsAQJ/4UAsAQzAFIAsQAY/34AsQDN/6sAsQDO/6sAsQDP/6sAsQDQ/6sAsQDR/6sAsQDS/6sAsQDT/6sAsQDU/6sAsQDV/6sAsQDW/6sAsQDX/6sAsQDZ/6sAsQDa/6sAsQDb/6sAsQDc/6sAsQDd/6sAsQDe/6sAsQDf/6sAsQDg/6sAsQDh/6sAsQDi/6sAsQDj/6sAsQDk/6sAsQDl/6sAsQPf/4UAsQPg/4UAsQPj/4UAsQQI/4UAsQQJ/4UAsQQzAFIAsgAY/34AsgDN/6sAsgDO/6sAsgDP/6sAsgDQ/6sAsgDR/6sAsgDS/6sAsgDT/6sAsgDU/6sAsgDV/6sAsgDW/6sAsgDX/6sAsgDZ/6sAsgDa/6sAsgDb/6sAsgDc/6sAsgDd/6sAsgDe/6sAsgDf/6sAsgDg/6sAsgDh/6sAsgDi/6sAsgDj/6sAsgDk/6sAsgDl/6sAsgPf/4UAsgPg/4UAsgPj/4UAsgQI/4UAsgQJ/4UAsgQzAFIAswABAAwAswACAAwAswADAAwAswAXAAwAswAc/9UAswBWABQAswBp/9UAswBq/9UAswCC/9UAswCG/9UAswCL/+kAswCY/+wAswCr//gAswC0AAgAswDN//YAswD0/+kAswE6/+kAswFq/+EAswPx/9cAtAAB/5MAtAAC/5MAtAAD/5MAtAAE/5MAtAAF/5MAtAAG/5MAtAAH/5MAtAAI/5MAtAAJ/5MAtAAK/5MAtAAL/5MAtAAM/5MAtAAN/5MAtAAO/5MAtAAP/5MAtAAQ/5MAtAAR/5MAtAAS/5MAtAAT/5MAtAAU/5MAtAAV/5MAtAAW/5MAtAAX/5MAtAAY/zMAtAAZ/5MAtAAc/9IAtAAd/9IAtAAe/9IAtAAf/9IAtABA/9IAtABW/5UAtABX/5UAtABp/9IAtABq/9IAtABy/9IAtAB8/9IAtAB9/9IAtACG/9IAtACL/9oAtACM/9oAtACN/9oAtACO/9oAtACzAAgAtAC0AAoAtAC+//sAtADN/2wAtADO/2wAtADP/2wAtADQ/2wAtADR/2wAtADS/2wAtADT/2wAtADU/2wAtADV/2wAtADW/2wAtADX/2wAtADZ/2wAtADa/2wAtADb/2wAtADc/2wAtADd/2wAtADe/2wAtADf/2wAtADg/2wAtADh/2wAtADi/2wAtADj/2wAtADk/2wAtADl/2wAtADm/9IAtADo/3EAtADp/3EAtADq/3EAtADr/3EAtADs/3EAtADt/3EAtADu/3EAtADv/3EAtADw/3EAtADx/3EAtADy/3EAtADz/3EAtAD0/3EAtAD1/3EAtAD2/3EAtAD3/3EAtAD4/3EAtAD5/3EAtAD6/3EAtAD8/3EAtAD9/3EAtAD+/3EAtAD//3EAtAEA/3EAtAEB/3EAtAEC/3EAtAED/3EAtAEE/3EAtAEF/3EAtAEH/3EAtAEI/3EAtAEJ/3EAtAEM/2YAtAEO/2YAtAEP/2YAtAEQ/2YAtAER/2YAtAES/2YAtAEW/9IAtAEX/8gAtAEk/9IAtAEn/9IAtAEr/+QAtAEy/8gAtAE6/3EAtAE7/3EAtAE8/3EAtAE9/3EAtAE+/3EAtAE//3EAtAFB/3EAtAFC/3EAtAFD/3EAtAFE/3EAtAFF/3EAtAFG/3EAtAFH/3EAtAFI/3EAtAFJ/3EAtAFK/3EAtAFL/3EAtAFM/3EAtAFN/3EAtAFO/3EAtAFP/3EAtAFQ/3EAtAFR/3EAtAFS/3EAtAFT/3EAtAFU/3EAtAFV/8gAtAFX/3EAtAFY/8gAtAFc/4UAtAFd/4UAtAFe/4UAtAFf/4UAtAFg/4UAtAFh/4UAtAFi/4UAtAFj/6QAtAFl/+8AtAFq/3sAtAFr/3sAtAFs/3sAtAFt/3sAtAFu/3sAtAFv/3sAtAFw/3sAtAFx/3sAtAFy/3sAtAFz/3sAtAF0/3sAtAF1/3sAtAF2/3sAtAF3/3sAtAF4/3sAtAF5/3sAtAF6/3sAtAF7/3sAtAF8/3sAtAF9/7MAtAF+/3sAtAGE/6kAtAPf/xQAtAPg/xQAtAPh/2YAtAPi/2YAtAPj/xQAtAPo/3EAtAPv/58AtAPx/5oAtAPz/5oAtAP0/5oAtAP9ACQAtAQI/xQAtAQJ/xQAtAQK/+8AtAQP/4UAtAQQ/64AtAQR/4UAtAQS/64AtAQt/5UAtAQzAFIAtQAB/5MAtQAC/5MAtQAD/5MAtQAE/5MAtQAF/5MAtQAG/5MAtQAH/5MAtQAI/5MAtQAJ/5MAtQAK/5MAtQAL/5MAtQAM/5MAtQAN/5MAtQAO/5MAtQAP/5MAtQAQ/5MAtQAR/5MAtQAS/5MAtQAT/5MAtQAU/5MAtQAV/5MAtQAW/5MAtQAX/5MAtQAY/zMAtQAZ/5MAtQAc/9IAtQAe/9IAtQBW/5UAtQBX/5UAtQCL/9oAtQCN/9oAtQDN/2wAtQDO/2wAtQDP/2wAtQDQ/2wAtQDR/2wAtQDS/2wAtQDT/2wAtQDU/2wAtQDV/2wAtQDW/2wAtQDX/2wAtQDZ/2wAtQDa/2wAtQDb/2wAtQDc/2wAtQDd/2wAtQDe/2wAtQDf/2wAtQDg/2wAtQDh/2wAtQDi/2wAtQDj/2wAtQDk/2wAtQDl/2wAtQDo/3EAtQDp/3EAtQDq/3EAtQDr/3EAtQDs/3EAtQDt/3EAtQDu/3EAtQDv/3EAtQDw/3EAtQDx/3EAtQDy/3EAtQDz/3EAtQD0/3EAtQD1/3EAtQD2/3EAtQD3/3EAtQD4/3EAtQD5/3EAtQD6/3EAtQD8/3EAtQD9/3EAtQD+/3EAtQD//3EAtQEA/3EAtQEB/3EAtQEC/3EAtQED/3EAtQEE/3EAtQEF/3EAtQEH/3EAtQEI/3EAtQEJ/3EAtQEM/2YAtQEO/2YAtQEP/2YAtQEQ/2YAtQER/2YAtQES/2YAtQE6/3EAtQE7/3EAtQE8/3EAtQE9/3EAtQE+/3EAtQE//3EAtQFB/3EAtQFC/3EAtQFD/3EAtQFE/3EAtQFF/3EAtQFG/3EAtQFH/3EAtQFI/3EAtQFJ/3EAtQFK/3EAtQFL/3EAtQFM/3EAtQFN/3EAtQFO/3EAtQFP/3EAtQFQ/3EAtQFR/3EAtQFS/3EAtQFT/3EAtQFU/3EAtQFX/3EAtQFc/4UAtQFd/4UAtQFe/4UAtQFf/4UAtQFg/4UAtQFh/4UAtQFi/4UAtQFj/6QAtQFq/3sAtQFr/3sAtQFs/3sAtQFt/3sAtQFu/3sAtQFv/3sAtQFw/3sAtQFx/3sAtQFy/3sAtQFz/3sAtQF0/3sAtQF1/3sAtQF2/3sAtQF3/3sAtQF4/3sAtQF5/3sAtQF6/3sAtQF7/3sAtQF8/3sAtQF+/3sAtQGE/6kAtQPf/xQAtQPg/xQAtQPh/2YAtQPi/2YAtQPj/xQAtQPo/3EAtQPv/58AtQPx/5oAtQPz/5oAtQP0/5oAtQQI/xQAtQQJ/xQAtQQK/+8AtQQP/4UAtQQQ/64AtQQR/4UAtQQS/64AtQQt/5UAtQQzAFIAtgAB/5MAtgAC/5MAtgAD/5MAtgAE/5MAtgAF/5MAtgAG/5MAtgAH/5MAtgAI/5MAtgAJ/5MAtgAK/5MAtgAL/5MAtgAM/5MAtgAN/5MAtgAO/5MAtgAP/5MAtgAQ/5MAtgAR/5MAtgAS/5MAtgAT/5MAtgAU/5MAtgAV/5MAtgAW/5MAtgAX/5MAtgAY/zMAtgAZ/5MAtgBW/5UAtgBX/5UAtgDN/2wAtgDO/2wAtgDP/2wAtgDQ/2wAtgDR/2wAtgDS/2wAtgDT/2wAtgDU/2wAtgDV/2wAtgDW/2wAtgDX/2wAtgDZ/2wAtgDa/2wAtgDb/2wAtgDc/2wAtgDd/2wAtgDe/2wAtgDf/2wAtgDg/2wAtgDh/2wAtgDi/2wAtgDj/2wAtgDk/2wAtgDl/2wAtgDo/3EAtgDp/3EAtgDq/3EAtgDr/3EAtgDs/3EAtgDt/3EAtgDu/3EAtgDv/3EAtgDw/3EAtgDx/3EAtgDy/3EAtgDz/3EAtgD0/3EAtgD1/3EAtgD2/3EAtgD3/3EAtgD4/3EAtgD5/3EAtgD6/3EAtgD8/3EAtgD9/3EAtgD+/3EAtgD//3EAtgEA/3EAtgEB/3EAtgEC/3EAtgED/3EAtgEE/3EAtgEF/3EAtgEH/3EAtgEI/3EAtgEJ/3EAtgEM/2YAtgEO/2YAtgEP/2YAtgEQ/2YAtgER/2YAtgES/2YAtgE6/3EAtgE7/3EAtgE8/3EAtgE9/3EAtgE+/3EAtgE//3EAtgFB/3EAtgFC/3EAtgFD/3EAtgFE/3EAtgFF/3EAtgFG/3EAtgFH/3EAtgFI/3EAtgFJ/3EAtgFK/3EAtgFL/3EAtgFM/3EAtgFN/3EAtgFO/3EAtgFP/3EAtgFQ/3EAtgFR/3EAtgFS/3EAtgFT/3EAtgFU/3EAtgFX/3EAtgFc/4UAtgFd/4UAtgFe/4UAtgFf/4UAtgFg/4UAtgFh/4UAtgFi/4UAtgFj/6QAtgFq/3sAtgFr/3sAtgFs/3sAtgFt/3sAtgFu/3sAtgFv/3sAtgFw/3sAtgFx/3sAtgFy/3sAtgFz/3sAtgF0/3sAtgF1/3sAtgF2/3sAtgF3/3sAtgF4/3sAtgF5/3sAtgF6/3sAtgF7/3sAtgF8/3sAtgF+/3sAtgGE/6kAtgPf/xQAtgPg/xQAtgPh/2YAtgPi/2YAtgPj/xQAtgPo/3EAtgPv/58AtgPx/5oAtgPz/5oAtgP0/5oAtgQI/xQAtgQJ/xQAtgQP/4UAtgQQ/64AtgQR/4UAtgQS/64AtgQt/5UAtgQzAFIAtwAB/5MAtwAC/5MAtwAD/5MAtwAE/5MAtwAF/5MAtwAG/5MAtwAH/5MAtwAI/5MAtwAJ/5MAtwAK/5MAtwAL/5MAtwAM/5MAtwAN/5MAtwAO/5MAtwAP/5MAtwAQ/5MAtwAR/5MAtwAS/5MAtwAT/5MAtwAU/5MAtwAV/5MAtwAW/5MAtwAX/5MAtwAY/zMAtwAZ/5MAtwBW/5UAtwBX/5UAtwDN/2wAtwDO/2wAtwDP/2wAtwDQ/2wAtwDR/2wAtwDS/2wAtwDT/2wAtwDU/2wAtwDV/2wAtwDW/2wAtwDX/2wAtwDZ/2wAtwDa/2wAtwDb/2wAtwDc/2wAtwDd/2wAtwDe/2wAtwDf/2wAtwDg/2wAtwDh/2wAtwDi/2wAtwDj/2wAtwDk/2wAtwDl/2wAtwDo/3EAtwDp/3EAtwDq/3EAtwDr/3EAtwDs/3EAtwDt/3EAtwDu/3EAtwDv/3EAtwDw/3EAtwDx/3EAtwDy/3EAtwDz/3EAtwD0/3EAtwD1/3EAtwD2/3EAtwD3/3EAtwD4/3EAtwD5/3EAtwD6/3EAtwD8/3EAtwD9/3EAtwD+/3EAtwD//3EAtwEA/3EAtwEB/3EAtwEC/3EAtwED/3EAtwEE/3EAtwEF/3EAtwEH/3EAtwEI/3EAtwEJ/3EAtwEM/2YAtwEO/2YAtwEP/2YAtwEQ/2YAtwER/2YAtwES/2YAtwE6/3EAtwE7/3EAtwE8/3EAtwE9/3EAtwE+/3EAtwE//3EAtwFB/3EAtwFC/3EAtwFD/3EAtwFE/3EAtwFF/3EAtwFG/3EAtwFH/3EAtwFI/3EAtwFJ/3EAtwFK/3EAtwFL/3EAtwFM/3EAtwFN/3EAtwFO/3EAtwFP/3EAtwFQ/3EAtwFR/3EAtwFS/3EAtwFT/3EAtwFU/3EAtwFX/3EAtwFc/4UAtwFd/4UAtwFe/4UAtwFf/4UAtwFg/4UAtwFh/4UAtwFi/4UAtwFj/6QAtwFq/3sAtwFr/3sAtwFs/3sAtwFt/3sAtwFu/3sAtwFv/3sAtwFw/3sAtwFx/3sAtwFy/3sAtwFz/3sAtwF0/3sAtwF1/3sAtwF2/3sAtwF3/3sAtwF4/3sAtwF5/3sAtwF6/3sAtwF7/3sAtwF8/3sAtwF+/3sAtwGE/6kAtwPf/xQAtwPg/xQAtwPh/2YAtwPi/2YAtwPj/xQAtwPo/3EAtwPv/58AtwPx/5oAtwPz/5oAtwP0/5oAtwQI/xQAtwQJ/xQAtwQP/4UAtwQQ/64AtwQR/4UAtwQS/64AtwQt/5UAtwQzAFIAuAAB/5MAuAAC/5MAuAAD/5MAuAAE/5MAuAAF/5MAuAAG/5MAuAAH/5MAuAAI/5MAuAAJ/5MAuAAK/5MAuAAL/5MAuAAM/5MAuAAN/5MAuAAO/5MAuAAP/5MAuAAQ/5MAuAAR/5MAuAAS/5MAuAAT/5MAuAAU/5MAuAAV/5MAuAAW/5MAuAAX/5MAuAAY/zMAuAAZ/5MAuABW/5UAuABX/5UAuADN/2wAuADO/2wAuADP/2wAuADQ/2wAuADR/2wAuADS/2wAuADT/2wAuADU/2wAuADV/2wAuADW/2wAuADX/2wAuADZ/2wAuADa/2wAuADb/2wAuADc/2wAuADd/2wAuADe/2wAuADf/2wAuADg/2wAuADh/2wAuADi/2wAuADj/2wAuADk/2wAuADl/2wAuADo/3EAuADp/3EAuADq/3EAuADr/3EAuADs/3EAuADt/3EAuADu/3EAuADv/3EAuADw/3EAuADx/3EAuADy/3EAuADz/3EAuAD0/3EAuAD1/3EAuAD2/3EAuAD3/3EAuAD4/3EAuAD5/3EAuAD6/3EAuAD8/3EAuAD9/3EAuAD+/3EAuAD//3EAuAEA/3EAuAEB/3EAuAEC/3EAuAED/3EAuAEE/3EAuAEF/3EAuAEH/3EAuAEI/3EAuAEJ/3EAuAEM/2YAuAEO/2YAuAEP/2YAuAEQ/2YAuAER/2YAuAES/2YAuAE6/3EAuAE7/3EAuAE8/3EAuAE9/3EAuAE+/3EAuAE//3EAuAFB/3EAuAFC/3EAuAFD/3EAuAFE/3EAuAFF/3EAuAFG/3EAuAFH/3EAuAFI/3EAuAFJ/3EAuAFK/3EAuAFL/3EAuAFM/3EAuAFN/3EAuAFO/3EAuAFP/3EAuAFQ/3EAuAFR/3EAuAFS/3EAuAFT/3EAuAFU/3EAuAFX/3EAuAFc/4UAuAFd/4UAuAFe/4UAuAFf/4UAuAFg/4UAuAFh/4UAuAFi/4UAuAFj/6QAuAFq/3sAuAFr/3sAuAFs/3sAuAFt/3sAuAFu/3sAuAFv/3sAuAFw/3sAuAFx/3sAuAFy/3sAuAFz/3sAuAF0/3sAuAF1/3sAuAF2/3sAuAF3/3sAuAF4/3sAuAF5/3sAuAF6/3sAuAF7/3sAuAF8/3sAuAF+/3sAuAGE/6kAuAPf/xQAuAPg/xQAuAPh/2YAuAPi/2YAuAPj/xQAuAPo/3EAuAPv/58AuAPx/5oAuAPz/5oAuAP0/5oAuAQI/xQAuAQJ/xQAuAQP/4UAuAQQ/64AuAQR/4UAuAQS/64AuAQt/5UAuAQzAFIAuQAB/5MAuQAC/5MAuQAD/5MAuQAE/5MAuQAF/5MAuQAG/5MAuQAH/5MAuQAI/5MAuQAJ/5MAuQAK/5MAuQAL/5MAuQAM/5MAuQAN/5MAuQAO/5MAuQAP/5MAuQAQ/5MAuQAR/5MAuQAS/5MAuQAT/5MAuQAU/5MAuQAV/5MAuQAW/5MAuQAX/5MAuQAY/zMAuQAZ/5MAuQBW/5UAuQBX/5UAuQDN/2wAuQDO/2wAuQDP/2wAuQDQ/2wAuQDR/2wAuQDS/2wAuQDT/2wAuQDU/2wAuQDV/2wAuQDW/2wAuQDX/2wAuQDZ/2wAuQDa/2wAuQDb/2wAuQDc/2wAuQDd/2wAuQDe/2wAuQDf/2wAuQDg/2wAuQDh/2wAuQDi/2wAuQDj/2wAuQDk/2wAuQDl/2wAuQDo/3EAuQDp/3EAuQDq/3EAuQDr/3EAuQDs/3EAuQDt/3EAuQDu/3EAuQDv/3EAuQDw/3EAuQDx/3EAuQDy/3EAuQDz/3EAuQD0/3EAuQD1/3EAuQD2/3EAuQD3/3EAuQD4/3EAuQD5/3EAuQD6/3EAuQD8/3EAuQD9/3EAuQD+/3EAuQD//3EAuQEA/3EAuQEB/3EAuQEC/3EAuQED/3EAuQEE/3EAuQEF/3EAuQEH/3EAuQEI/3EAuQEJ/3EAuQEM/2YAuQEO/2YAuQEP/2YAuQEQ/2YAuQER/2YAuQES/2YAuQE6/3EAuQE7/3EAuQE8/3EAuQE9/3EAuQE+/3EAuQE//3EAuQFB/3EAuQFC/3EAuQFD/3EAuQFE/3EAuQFF/3EAuQFG/3EAuQFH/3EAuQFI/3EAuQFJ/3EAuQFK/3EAuQFL/3EAuQFM/3EAuQFN/3EAuQFO/3EAuQFP/3EAuQFQ/3EAuQFR/3EAuQFS/3EAuQFT/3EAuQFU/3EAuQFX/3EAuQFc/4UAuQFd/4UAuQFe/4UAuQFf/4UAuQFg/4UAuQFh/4UAuQFi/4UAuQFj/6QAuQFq/3sAuQFr/3sAuQFs/3sAuQFt/3sAuQFu/3sAuQFv/3sAuQFw/3sAuQFx/3sAuQFy/3sAuQFz/3sAuQF0/3sAuQF1/3sAuQF2/3sAuQF3/3sAuQF4/3sAuQF5/3sAuQF6/3sAuQF7/3sAuQF8/3sAuQF+/3sAuQGE/6kAuQPf/xQAuQPg/xQAuQPh/2YAuQPi/2YAuQPj/xQAuQPo/3EAuQPv/58AuQPx/5oAuQPz/5oAuQP0/5oAuQQI/xQAuQQJ/xQAuQQP/4UAuQQQ/64AuQQR/4UAuQQS/64AuQQt/5UAuQQzAFIAugAB/5MAugAC/5MAugAD/5MAugAE/5MAugAF/5MAugAG/5MAugAH/5MAugAI/5MAugAJ/5MAugAK/5MAugAL/5MAugAM/5MAugAN/5MAugAO/5MAugAP/5MAugAQ/5MAugAR/5MAugAS/5MAugAT/5MAugAU/5MAugAV/5MAugAW/5MAugAX/5MAugAY/zMAugAZ/5MAugBW/5UAugBX/5UAugDN/2wAugDO/2wAugDP/2wAugDQ/2wAugDR/2wAugDS/2wAugDT/2wAugDU/2wAugDV/2wAugDW/2wAugDX/2wAugDZ/2wAugDa/2wAugDb/2wAugDc/2wAugDd/2wAugDe/2wAugDf/2wAugDg/2wAugDh/2wAugDi/2wAugDj/2wAugDk/2wAugDl/2wAugDo/3EAugDp/3EAugDq/3EAugDr/3EAugDs/3EAugDt/3EAugDu/3EAugDv/3EAugDw/3EAugDx/3EAugDy/3EAugDz/3EAugD0/3EAugD1/3EAugD2/3EAugD3/3EAugD4/3EAugD5/3EAugD6/3EAugD8/3EAugD9/3EAugD+/3EAugD//3EAugEA/3EAugEB/3EAugEC/3EAugED/3EAugEE/3EAugEF/3EAugEH/3EAugEI/3EAugEJ/3EAugEM/2YAugEO/2YAugEP/2YAugEQ/2YAugER/2YAugES/2YAugE6/3EAugE7/3EAugE8/3EAugE9/3EAugE+/3EAugE//3EAugFB/3EAugFC/3EAugFD/3EAugFE/3EAugFF/3EAugFG/3EAugFH/3EAugFI/3EAugFJ/3EAugFK/3EAugFL/3EAugFM/3EAugFN/3EAugFO/3EAugFP/3EAugFQ/3EAugFR/3EAugFS/3EAugFT/3EAugFU/3EAugFX/3EAugFc/4UAugFd/4UAugFe/4UAugFf/4UAugFg/4UAugFh/4UAugFi/4UAugFj/6QAugFq/3sAugFr/3sAugFs/3sAugFt/3sAugFu/3sAugFv/3sAugFw/3sAugFx/3sAugFy/3sAugFz/3sAugF0/3sAugF1/3sAugF2/3sAugF3/3sAugF4/3sAugF5/3sAugF6/3sAugF7/3sAugF8/3sAugF+/3sAugGE/6kAugPf/xQAugPg/xQAugPh/2YAugPi/2YAugPj/xQAugPo/3EAugPv/58AugPx/5oAugPz/5oAugP0/5oAugQI/xQAugQJ/xQAugQP/4UAugQQ/64AugQR/4UAugQS/64AugQt/5UAugQzAFIAuwAB/5MAuwAC/5MAuwAD/5MAuwAE/5MAuwAF/5MAuwAG/5MAuwAH/5MAuwAI/5MAuwAJ/5MAuwAK/5MAuwAL/5MAuwAM/5MAuwAN/5MAuwAO/5MAuwAP/5MAuwAQ/5MAuwAR/5MAuwAS/5MAuwAT/5MAuwAU/5MAuwAV/5MAuwAW/5MAuwAX/5MAuwAY/zMAuwAZ/5MAuwBW/5UAuwBX/5UAuwDN/2wAuwDO/2wAuwDP/2wAuwDQ/2wAuwDR/2wAuwDS/2wAuwDT/2wAuwDU/2wAuwDV/2wAuwDW/2wAuwDX/2wAuwDZ/2wAuwDa/2wAuwDb/2wAuwDc/2wAuwDd/2wAuwDe/2wAuwDf/2wAuwDg/2wAuwDh/2wAuwDi/2wAuwDj/2wAuwDk/2wAuwDl/2wAuwDo/3EAuwDp/3EAuwDq/3EAuwDr/3EAuwDs/3EAuwDt/3EAuwDu/3EAuwDv/3EAuwDw/3EAuwDx/3EAuwDy/3EAuwDz/3EAuwD0/3EAuwD1/3EAuwD2/3EAuwD3/3EAuwD4/3EAuwD5/3EAuwD6/3EAuwD8/3EAuwD9/3EAuwD+/3EAuwD//3EAuwEA/3EAuwEB/3EAuwEC/3EAuwED/3EAuwEE/3EAuwEF/3EAuwEH/3EAuwEI/3EAuwEJ/3EAuwEM/2YAuwEO/2YAuwEP/2YAuwEQ/2YAuwER/2YAuwES/2YAuwE6/3EAuwE7/3EAuwE8/3EAuwE9/3EAuwE+/3EAuwE//3EAuwFB/3EAuwFC/3EAuwFD/3EAuwFE/3EAuwFF/3EAuwFG/3EAuwFH/3EAuwFI/3EAuwFJ/3EAuwFK/3EAuwFL/3EAuwFM/3EAuwFN/3EAuwFO/3EAuwFP/3EAuwFQ/3EAuwFR/3EAuwFS/3EAuwFT/3EAuwFU/3EAuwFX/3EAuwFc/4UAuwFd/4UAuwFe/4UAuwFf/4UAuwFg/4UAuwFh/4UAuwFi/4UAuwFj/6QAuwFq/3sAuwFr/3sAuwFs/3sAuwFt/3sAuwFu/3sAuwFv/3sAuwFw/3sAuwFx/3sAuwFy/3sAuwFz/3sAuwF0/3sAuwF1/3sAuwF2/3sAuwF3/3sAuwF4/3sAuwF5/3sAuwF6/3sAuwF7/3sAuwF8/3sAuwF+/3sAuwGE/6kAuwPf/xQAuwPg/xQAuwPh/2YAuwPi/2YAuwPj/xQAuwPo/3EAuwPv/58AuwPx/5oAuwPz/5oAuwP0/5oAuwQI/xQAuwQJ/xQAuwQP/4UAuwQQ/64AuwQR/4UAuwQS/64AuwQt/5UAuwQzAFIAvAAB/5MAvAAC/5MAvAAD/5MAvAAE/5MAvAAF/5MAvAAG/5MAvAAH/5MAvAAI/5MAvAAJ/5MAvAAK/5MAvAAL/5MAvAAM/5MAvAAN/5MAvAAO/5MAvAAP/5MAvAAQ/5MAvAAR/5MAvAAS/5MAvAAT/5MAvAAU/5MAvAAV/5MAvAAW/5MAvAAX/5MAvAAY/zMAvAAZ/5MAvABW/5UAvABX/5UAvADN/2wAvADO/2wAvADP/2wAvADQ/2wAvADR/2wAvADS/2wAvADT/2wAvADU/2wAvADV/2wAvADW/2wAvADX/2wAvADZ/2wAvADa/2wAvADb/2wAvADc/2wAvADd/2wAvADe/2wAvADf/2wAvADg/2wAvADh/2wAvADi/2wAvADj/2wAvADk/2wAvADl/2wAvADo/3EAvADp/3EAvADq/3EAvADr/3EAvADs/3EAvADt/3EAvADu/3EAvADv/3EAvADw/3EAvADx/3EAvADy/3EAvADz/3EAvAD0/3EAvAD1/3EAvAD2/3EAvAD3/3EAvAD4/3EAvAD5/3EAvAD6/3EAvAD8/3EAvAD9/3EAvAD+/3EAvAD//3EAvAEA/3EAvAEB/3EAvAEC/3EAvAED/3EAvAEE/3EAvAEF/3EAvAEH/3EAvAEI/3EAvAEJ/3EAvAEM/2YAvAEO/2YAvAEP/2YAvAEQ/2YAvAER/2YAvAES/2YAvAE6/3EAvAE7/3EAvAE8/3EAvAE9/3EAvAE+/3EAvAE//3EAvAFB/3EAvAFC/3EAvAFD/3EAvAFE/3EAvAFF/3EAvAFG/3EAvAFH/3EAvAFI/3EAvAFJ/3EAvAFK/3EAvAFL/3EAvAFM/3EAvAFN/3EAvAFO/3EAvAFP/3EAvAFQ/3EAvAFR/3EAvAFS/3EAvAFT/3EAvAFU/3EAvAFX/3EAvAFc/4UAvAFd/4UAvAFe/4UAvAFf/4UAvAFg/4UAvAFh/4UAvAFi/4UAvAFj/6QAvAFq/3sAvAFr/3sAvAFs/3sAvAFt/3sAvAFu/3sAvAFv/3sAvAFw/3sAvAFx/3sAvAFy/3sAvAFz/3sAvAF0/3sAvAF1/3sAvAF2/3sAvAF3/3sAvAF4/3sAvAF5/3sAvAF6/3sAvAF7/3sAvAF8/3sAvAF+/3sAvAGE/6kAvAPf/xQAvAPg/xQAvAPh/2YAvAPi/2YAvAPj/xQAvAPo/3EAvAPv/58AvAPx/5oAvAPz/5oAvAP0/5oAvAQI/xQAvAQJ/xQAvAQP/4UAvAQQ/64AvAQR/4UAvAQS/64AvAQt/5UAvAQzAFIAvQAB/5MAvQAC/5MAvQAD/5MAvQAE/5MAvQAF/5MAvQAG/5MAvQAH/5MAvQAI/5MAvQAJ/5MAvQAK/5MAvQAL/5MAvQAM/5MAvQAN/5MAvQAO/5MAvQAP/5MAvQAQ/5MAvQAR/5MAvQAS/5MAvQAT/5MAvQAU/5MAvQAV/5MAvQAW/5MAvQAX/5MAvQAY/zMAvQAZ/5MAvQBW/5UAvQBX/5UAvQDN/2wAvQDO/2wAvQDP/2wAvQDQ/2wAvQDR/2wAvQDS/2wAvQDT/2wAvQDU/2wAvQDV/2wAvQDW/2wAvQDX/2wAvQDZ/2wAvQDa/2wAvQDb/2wAvQDc/2wAvQDd/2wAvQDe/2wAvQDf/2wAvQDg/2wAvQDh/2wAvQDi/2wAvQDj/2wAvQDk/2wAvQDl/2wAvQDo/3EAvQDp/3EAvQDq/3EAvQDr/3EAvQDs/3EAvQDt/3EAvQDu/3EAvQDv/3EAvQDw/3EAvQDx/3EAvQDy/3EAvQDz/3EAvQD0/3EAvQD1/3EAvQD2/3EAvQD3/3EAvQD4/3EAvQD5/3EAvQD6/3EAvQD8/3EAvQD9/3EAvQD+/3EAvQD//3EAvQEA/3EAvQEB/3EAvQEC/3EAvQED/3EAvQEE/3EAvQEF/3EAvQEH/3EAvQEI/3EAvQEJ/3EAvQEM/2YAvQEO/2YAvQEP/2YAvQEQ/2YAvQER/2YAvQES/2YAvQE6/3EAvQE7/3EAvQE8/3EAvQE9/3EAvQE+/3EAvQE//3EAvQFB/3EAvQFC/3EAvQFD/3EAvQFE/3EAvQFF/3EAvQFG/3EAvQFH/3EAvQFI/3EAvQFJ/3EAvQFK/3EAvQFL/3EAvQFM/3EAvQFN/3EAvQFO/3EAvQFP/3EAvQFQ/3EAvQFR/3EAvQFS/3EAvQFT/3EAvQFU/3EAvQFX/3EAvQFc/4UAvQFd/4UAvQFe/4UAvQFf/4UAvQFg/4UAvQFh/4UAvQFi/4UAvQFj/6QAvQFq/3sAvQFr/3sAvQFs/3sAvQFt/3sAvQFu/3sAvQFv/3sAvQFw/3sAvQFx/3sAvQFy/3sAvQFz/3sAvQF0/3sAvQF1/3sAvQF2/3sAvQF3/3sAvQF4/3sAvQF5/3sAvQF6/3sAvQF7/3sAvQF8/3sAvQF+/3sAvQGE/6kAvQPf/xQAvQPg/xQAvQPh/2YAvQPi/2YAvQPj/xQAvQPo/3EAvQPv/58AvQPx/5oAvQPz/5oAvQP0/5oAvQQI/xQAvQQJ/xQAvQQP/4UAvQQR/4UAvQQt/5UAvgAc/+cAvgAe/+cAvgBA/+cAvgBp/+cAvgBq/+cAvgBs/+cAvgBy/+cAvgB0/+cAvgB8/+cAvgCC/+cAvgCG/+cAvgC0//sAvgDN//0AvgDO//0AvgDb//0AvgDf//0AvgFVAAUAvgFc//YAvgFq//EAvgFu//EAvgF9//4AvgF///4AvgGF//4AvgPx/+YAvwAc/+cAvwAd/+cAwAAc/+cAwABA/+cAwABE/+cAwABp/+cAwACC/+cAwADN//0AwADO//0AwAFq//EAwAF9//4AwAGF//4AwQAc/+cAwQBp/+cAwQBq/+cAwQDN//0AwQFq//EAwQGF//4AzQCT/2EAzQCU/2EAzQCV/2EAzQCW/2EAzQCX/2EAzQCr/58AzQFl/+4AzQFm/+4AzQFn/+4AzQF9//4AzQF///4AzQGF//4AzQPm/9cAzQPw/64AzQQL/+EAzQQN/+EAzgCT/2EAzgCU/2EAzgCV/2EAzgCW/2EAzgCX/2EAzgCr/58AzgFl/+4AzgFm/+4AzgFn/+4AzgF9//4AzgPw/64AzgQL/+EAzwCT/2EAzwCU/2EAzwCV/2EAzwCW/2EAzwCX/2EAzwCr/58AzwFl/+4AzwF9//4AzwPm/9cAzwPw/64AzwQL/+EA0ACT/2EA0ACU/2EA0ACV/2EA0ACW/2EA0ACX/2EA0ACr/58A0APw/64A0QCT/2EA0QCU/2EA0QCV/2EA0QCW/2EA0QCX/2EA0QCr/58A0QPw/64A0gCT/2EA0gCU/2EA0gCV/2EA0gCW/2EA0gCX/2EA0gCr/58A0wCT/2EA0wCU/2EA0wCV/2EA0wCW/2EA0wCX/2EA0wCr/58A0wPw/64A1ACT/2EA1ACU/2EA1ACV/2EA1ACW/2EA1ACX/2EA1ACr/58A1APw/64A1QCT/2EA1QCU/2EA1QCV/2EA1QCW/2EA1QCX/2EA1QCr/58A1QFl/+4A1QGF//4A1QPw/64A1gCT/2EA1gCU/2EA1gCV/2EA1gCW/2EA1gCX/2EA1gCr/58A1gPw/64A1wCT/2EA1wCU/2EA1wCV/2EA1wCW/2EA1wCX/2EA1wCr/58A1wPw/64A2ACT/2EA2ACU/2EA2ACV/2EA2ACW/2EA2ACX/2EA2ACr/58A2APw/64A2QCT/2EA2QCU/2EA2QCV/2EA2QCW/2EA2QCX/2EA2QCr/58A2QPw/64A2gCT/2EA2gCU/2EA2gCV/2EA2gCW/2EA2gCX/2EA2gCr/58A2gPw/64A2wCT/2EA2wCU/2EA2wCV/2EA2wCW/2EA2wCX/2EA2wCr/58A2wFl/+4A2wFn/+4A2wF9//4A2wGF//4A2wPw/64A2wQL/+EA3ACT/2EA3ACU/2EA3ACV/2EA3ACW/2EA3ACX/2EA3ACr/58A3APw/64A3QCT/2EA3QCU/2EA3QCV/2EA3QCW/2EA3QCX/2EA3QCr/58A3QPw/64A3gCT/2EA3gCU/2EA3gCV/2EA3gCW/2EA3gCX/2EA3gCr/58A3gPw/64A3wCT/2EA3wCU/2EA3wCV/2EA3wCW/2EA3wCX/2EA3wCr/58A3wFl/+4A3wF9//4A3wGF//4A3wPw/64A4ACT/2EA4ACU/2EA4ACV/2EA4ACW/2EA4ACX/2EA4ACr/58A4AFl/+4A4AF9//4A4AF///4A4APm/9cA4APw/64A4AQL/+EA4QCT/2EA4QCU/2EA4QCV/2EA4QCW/2EA4QCX/2EA4QCr/58A4QFl/+4A4QF9//4A4QPw/64A4gCT/2EA4gCU/2EA4gCV/2EA4gCW/2EA4gCX/2EA4gCr/58A4gPw/64A4wCT/2EA4wCU/2EA4wCV/2EA4wCW/2EA4wCX/2EA4wCr/58A4wPw/64A5ACT/14A5ACU/14A5ACV/14A5ACW/14A5ACX/14A5ACr/64A5AF9//4A5APf/8IA5APg/8IA5APw/64A5QCT/14A5QCU/14A5QCV/14A5QCW/14A5QCX/14A5QCr/64A5QPw/64A5gCT/1wA5gCU/1wA5gCV/1wA5gCW/1wA5gCX/1wA5gCr/6wA5gF9/+wA5gF//+wA5gGF/+wA5gGG/+wA5gGP/+EA5gGR/+EA5gPf/8IA5gPg/8IA5gPw/64A5gQT/+cA5gQU/+cA5wCT/1wA5wCU/1wA5wCV/1wA5wCW/1wA5wCX/1wA5wCr/6wA5wPw/64A6ADN//QA6ADO//QA6ADP//QA6ADV//QA6ADb//QA6ADf//QA6ADg//QA6ADj//QA6ADk//QA6AF9//sA6AGF//sA6AGP/+wA6APf/8IA6APg/8IA6APw/64A6AQK//sA6AQL//EA6AQN//EA6AQT/+cA6AQU/+cA6QDN//QA6QF///sA6QPf/8IA6QPg/8IA6QPw/64A6QQL//EA6QQT/+cA6QQU/+cA6gDN//QA6gDO//QA6gDV//QA6gDf//QA6gDk//QA6gF9//sA6gGF//sA6gPf/8IA6gPg/8IA6gPw/64A6gQU/+cA6wDN//QA6wDj//QA6wGF//sA6wPf/8IA6wPg/8IA6wPw/64A6wQU/+cA7APw/64A7QPw/64A8AEZAIkA8AEbAIkA8AEeAIkA8AEhAIkA8AEjAIkA9ACT/14A9ACU/14A9ACV/14A9ACW/14A9ACX/14A9ACr/64A9AF9//4A9AF///4A9AGE/+EA9AGF//4A9AGP/+QA9AGQ/+QA9AGR/+QA9AGS/+QA9APf/8IA9APg/8IA9APm/74A9APw/64A9AQK//sA9AQL/+kA9AQN/+kA9AQT/+cA9AQU/+cA9QCT/14A9QCU/14A9QCV/14A9QCW/14A9QCX/14A9QF9//4A9QGE/+EA9QGF//4A9QGP/+QA9QGR/+QA9QPf/8IA9QPg/8IA9QQK//sA9QQU/+cA9gCT/14A9gCU/14A9gCV/14A9gCW/14A9gCX/14A9gCr/64A9gPg/8IA9gPw/64A9wCT/14A9wCU/14A9wCV/14A9wCW/14A9wCX/14A9wCr/64A9wF9//4A9wGP/+QA9wGR/+QA9wPf/8IA9wPg/8IA9wPw/64A9wQK//sA+ACT/14A+ACU/14A+ACV/14A+ACW/14A+ACX/14A+ACr/64A+AF9//4A+AGE/+EA+APf/8IA+APg/8IA+APw/64A+QCT/14A+QCU/14A+QCV/14A+QCW/14A+QCX/14A+QCr/64A+QPw/64A+gCT/14A+gCU/14A+gCV/14A+gCW/14A+gCX/14A+gCr/64A+gPw/64A+wCT/14A+wCU/14A+wCV/14A+wCW/14A+wCX/14A+wCr/64A+wPw/64A/ACT/14A/ACU/14A/ACV/14A/ACW/14A/ACX/14A/ACr/64A/APw/64A/QCT/14A/QCU/14A/QCV/14A/QCW/14A/QCX/14A/QCr/64A/QPw/64A/gCT/14A/gCU/14A/gCV/14A/gCW/14A/gCX/14A/gCr/64A/gF9//4A/gGE/+EA/gGP/+QA/gPf/8IA/gPg/8IA/gPw/64A/gQK//sA/gQL/+kA/gQT/+cA/wCT/14A/wCU/14A/wCV/14A/wCW/14A/wCX/14A/wCr/64A/wF9//4A/wGP/+QA/wGR/+QA/wPf/8IA/wPg/8IA/wPw/64A/wQK//sA/wQL/+kA/wQU/+cBAACT/14BAACU/14BAACV/14BAACW/14BAACX/14BAACr/64BAAPw/64BAQCT/14BAQCU/14BAQCV/14BAQCW/14BAQCX/14BAQCr/64BAQF9//4BAQPg/8IBAQPw/64BAgCT/14BAgCU/14BAgCV/14BAgCW/14BAgCX/14BAgCr/64BAgPw/64BAwCT/14BAwCU/14BAwCV/14BAwCW/14BAwCX/14BAwCr/64BAwF9//4BAwGP/+QBAwGR/+QBAwPf/8IBAwPg/8IBAwPw/64BAwQT/+cBBACT/14BBACU/14BBACV/14BBACW/14BBACX/14BBACr/64BBAGP/+QBBAGQ/+QBBAGS/+QBBAPf/8IBBAPg/8IBBAPw/64BBAQK//sBBAQL/+kBBQCT/14BBQCU/14BBQCV/14BBQCW/14BBQCX/14BBQCr/64BBQPw/64BBwCT/14BBwCU/14BBwCV/14BBwCW/14BBwCX/14BBwCr/64BBwPw/64BCACT/14BCACU/14BCACV/14BCACW/14BCACX/14BCACr/64BCAPw/64BCQCT/14BCQCU/14BCQCV/14BCQCW/14BCQCX/14BCQCr/64BCQPw/64BCwDN/9kBCwDO/9kBCwDP/9kBCwDV/9kBCwDb/9kBCwDf/9kBCwDg/9kBCwDh/9kBCwDj/9kBCwDk/9kBCwDo/+YBCwDq/+YBCwDr/+YBCwDu/+YBCwD0/+YBCwD1/+YBCwD4/+YBCwD+/+YBCwD//+YBCwEB/+YBCwED/+YBCwEE/+YBCwEM/+EBCwEhABkBCwE6/+YBCwE7/+YBCwE9/+YBCwFD/+YBCwFN/+YBCwFR/+YBCwFX/+YBCwFc/+YBCwFlAAwBCwF9AB8BCwF/AB8BCwGFAB8BCwGP//YBCwPf/64BCwPg/64BCwPqAFIBCwPx//EBCwP9ACkBCwQKAB8BCwQTAEABCwQUAEABCwQxAFIBCwQzAFIBDADN//EBDADo//EBDADu//EBDAD0//EBDAD1//EBDAD4//EBDAD+//EBDAEB//EBDAEkADMBDAEuAAgBDAE6//EBDAE7//EBDAE9//EBDAFD//EBDAFF//EBDAFR//EBDAFT//EBDAGFABQBDAP9ABQBDAP/ABQBDQPf/2sBDQPg/2sBDQPj/2sBDQQI/2sBDQQJ/2sBDQQxAFIBDQQzAFIBDgQxAFIBDgQzAFIBDwQxAFIBDwQzAFIBEAQxAFIBEAQzAFIBEQQxAFIBEQQzAFIBEgQxAFIBEgQzAFIBEwCT/5kBEwCU/5kBEwCV/5kBEwCW/5kBEwCX/5kBEwPw/64BFACT/5kBFACU/5kBFACV/5kBFACW/5kBFACX/5kBFAPw/64BFQCT/5kBFQCU/5kBFQCV/5kBFQCW/5kBFQCX/5kBFQPw/64BGADN//YBGwDN//YBJwDN/+kBJwDO/+kBJwDV/+kBJwDb/+kBJwDf/+kBJwDg/+kBJwDh/+kBJwDk/+kBJwDo/88BJwDp/88BJwDq/88BJwDr/88BJwDu/88BJwD0/88BJwD1/88BJwD+/88BJwD//88BJwED/88BJwEE/88BJwEM/+YBJwEu/+QBJwE6/88BJwE7/88BJwE9/88BJwFD/88BJwFN/88BJwFO/88BJwFR/88BJwFT/88BJwFX/88BJwFc/+QBJwFd/+QBJwFe/+QBJwFf/+QBJwFl//MBJwFq/+QBJwFr/+QBJwFt/+QBJwFu/+QBJwF5/+QBJwF6/+QBJwF7/+QBJwF9//0BJwF///0BJwGF//0BJwGG//0BJwGPAAIBJwQL//4BJwQN//4BJwQP/7gBKAD0/88BKAED/88BKAE6/88BLQDmABQBLQEZAGYBLQEbAGYBLQEeAGYBLQEhAGYBLQEjAGYBLQEnABQBLQFlAAoBLgDNAAcBLgDfAAcBLgEr/+4BMQCT/5kBMQCU/5kBMQCV/5kBMQCW/5kBMQCX/5kBMQF9//YBMQF///YBMQGF//YBMQGG//YBMQPm/9cBMQQL/9IBMQQN/9IBMgCT/5kBMgCU/5kBMgCV/5kBMgCW/5kBMgCX/5kBMgF9//YBMgF///YBMgGF//YBMgGG//YBMgPm/9cBMgQL/9IBMgQN/9IBMwCT/5kBMwCU/5kBMwCV/5kBMwCW/5kBMwCX/5kBMwPw/64BMwQL/9IBNQCT/5kBNQCU/5kBNQCV/5kBNQCW/5kBNQCX/5kBNQPw/64BNgCT/5kBNgCU/5kBNgCV/5kBNgCW/5kBNgCX/5kBNgF9//YBNgPw/64BNwCT/5kBNwCU/5kBNwCV/5kBNwCW/5kBNwCX/5kBNwPw/64BOACT/5kBOACU/5kBOACV/5kBOACW/5kBOACX/5kBOAPw/64BOQCT/5kBOQCU/5kBOQCV/5kBOQCW/5kBOQCX/5kBOQPw/64BOgCT/1wBOgCU/1wBOgCV/1wBOgCW/1wBOgCX/1wBOgCr/6wBOgF9/+wBOgF//+wBOgGE/98BOgGF/+wBOgGP/+EBOgGQ/+EBOgGR/+EBOgGS/+EBOgPf/8IBOgPg/8IBOgPm/74BOgPw/64BOgQK//sBOgQL/+kBOgQN/+kBOgQT/+cBOgQU/+cBOwCT/1wBOwCU/1wBOwCV/1wBOwCW/1wBOwCX/1wBOwCr/6wBOwF9/+wBOwF//+wBOwGE/98BOwGP/+EBOwGQ/+EBOwGS/+EBOwPf/8IBOwPg/8IBOwPw/64BOwQL/+kBPACT/1wBPACU/1wBPACV/1wBPACW/1wBPACX/1wBPACr/6wBPAPw/64BPQCT/1wBPQCU/1wBPQCV/1wBPQCW/1wBPQCX/1wBPQCr/6wBPQF9/+wBPQGP/+EBPQGR/+EBPQPw/64BPgCT/1wBPgCU/1wBPgCV/1wBPgCW/1wBPgCX/1wBPgCr/6wBPgPw/64BPwCT/1wBPwCU/1wBPwCV/1wBPwCW/1wBPwCX/1wBPwCr/6wBPwPw/64BQACT/1wBQACU/1wBQACV/1wBQACW/1wBQACX/1wBQACr/6wBQAPw/64BQQCT/1wBQQCU/1wBQQCV/1wBQQCW/1wBQQCX/1wBQQCr/6wBQQPw/64BQgCT/1wBQgCU/1wBQgCV/1wBQgCW/1wBQgCX/1wBQgCr/6wBQwCT/1wBQwCU/1wBQwCV/1wBQwCW/1wBQwCX/1wBQwCr/6wBQwF9/+wBQwF//+wBQwGF/+wBQwGP/+EBQwPf/8IBQwPg/8IBQwPw/64BRACT/1wBRACU/1wBRACV/1wBRACW/1wBRACX/1wBRACr/6wBRQCT/1wBRQCU/1wBRQCV/1wBRQCW/1wBRQCX/1wBRQCr/6wBRQPf/8IBRQPg/8IBRQPw/64BRgCT/1wBRgCU/1wBRgCV/1wBRgCW/1wBRgCX/1wBRgCr/6wBRgPw/64BRwPf/5oBRwPg/5oBRwPj/5oBRwQI/5oBRwQJ/5oBSAPf/5oBSAPg/5oBSAPj/5oBSAQI/5oBSAQJ/5oBSQPf/5oBSQPg/5oBSQPj/5oBSQQI/5oBSQQJ/5oBSgPf/5oBSgPg/5oBSgPj/5oBSgQI/5oBSgQJ/5oBSwPf/5oBSwPg/5oBSwPj/5oBSwQI/5oBSwQJ/5oBTAPf/5oBTAPg/5oBTAPj/5oBTAQI/5oBTAQJ/5oBTQCT/1wBTQCU/1wBTQCV/1wBTQCW/1wBTQCX/1wBTQCr/6wBTQF9/+wBTQGP/+EBTQPf/8IBTQPg/8IBTQPw/64BTgCT/1wBTgCU/1wBTgCV/1wBTgCW/1wBTgCX/1wBTgCr/6wBTgGP/+EBTgPg/8IBTgPw/64BTwCT/1wBTwCU/1wBTwCV/1wBTwCW/1wBTwCX/1wBTwCr/6wBTwPw/64BUACT/1wBUACU/1wBUACV/1wBUACW/1wBUACX/1wBUACr/6wBUAPw/64BUQCT/1wBUQCU/1wBUQCV/1wBUQCW/1wBUQCX/1wBUQCr/6wBUQF9/+wBUQGF/+wBUQPf/8IBUQPg/8IBUQPw/64BUQQT/+cBUgCT/1wBUgCU/1wBUgCV/1wBUgCW/1wBUgCX/1wBUgCr/6wBUgPw/64BUwCT/1wBUwCU/1wBUwCV/1wBUwCW/1wBUwCX/1wBUwCr/6wBUwF9/+wBUwGP/+EBUwPg/8IBUwPw/64BUwQU/+cBVACT/14BVACU/14BVACV/14BVACW/14BVACX/14BVACr/64BVAPw/64BVQCT/1wBVQCU/1wBVQCV/1wBVQCW/1wBVQCX/1wBVQCr/6wBVQF9/+wBVQF//+wBVQGF/+wBVQGG/+wBVQGP/+EBVQGR/+EBVQPf/8IBVQPg/8IBVQPw/64BVQQL/+kBVQQT/+cBVQQU/+cBVgCT/1wBVgCU/1wBVgCV/1wBVgCW/1wBVgCX/1wBVgCr/6wBVgPw/64BWADN/8MBWADO/8MBWADP/8MBWADV/8MBWADb/8MBWADd/8MBWADf/8MBWADg/8MBWADh/8MBWADj/8MBWADk/8MBWADo/+QBWADp/+QBWADq/+QBWADr/+QBWADu/+QBWADv/+QBWADx/+QBWAD0/+QBWAD1/+QBWAD4/+QBWAD+/+QBWAD//+QBWAEB/+QBWAED/+QBWAEE/+QBWAELAAIBWAEM/9wBWAER/9wBWAE6/+QBWAE7/+QBWAE9/+QBWAFD/+QBWAFF/+QBWAFN/+QBWAFO/+QBWAFR/+QBWAFT/+QBWAFX/+QBWAFc/+wBWAFd/+wBWAFe/+wBWAFf/+wBWAF9AB8BWAF/AB8BWAGFAB8BWAGGAB8BWAGP/+kBWAPf/1wBWAPg/1wBWAPj/1wBWAPmACQBWAPx/6oBWAPz/6oBWAP0/6oBWAQI/1wBWAQJ/1wBWAQKACkBWAQLACkBWAQNACkBWAQP//sBWAQxAGEBWQFe/+wBWQPf/1wBWQPg/1wBWQPj/1wBWQPx/6oBWQPz/6oBWQP0/6oBWQQI/1wBWQQJ/1wBWQQxAGEBWgDN/8MBWgDO/8MBWgDq/+QBWgD0/+QBWgE6/+QBWgFc/+wBWgPf/1wBWgPg/1wBWgPj/1wBWgPx/6oBWgPz/6oBWgP0/6oBWgQI/1wBWgQJ/1wBWgQxAGEBWwDN/8MBWwPf/1wBWwPg/1wBWwPj/1wBWwPx/6oBWwPz/6oBWwP0/6oBWwQI/1wBWwQJ/1wBWwQxAGEBXAFl//QBXAFn//QBXAF9/+cBXAF//+cBXAGF/+cBXAGG/+cBXAGP/+kBXAPf/+QBXAPg/+QBXAPm/9cBXAPw/64BXAQK/9oBXAQL/+EBXAQN/+EBXAQT/9IBXAQU/9IBXQF//+cBXQPg/+QBXQPw/64BXgEu//EBXgFl//QBXgFn//QBXgF9/+cBXgGF/+cBXgGP/+kBXgGR/+kBXgPf/+QBXgPg/+QBXgPm/9cBXgPw/64BXgQL/+EBXwFl//QBXwF9/+cBXwGF/+cBXwPf/+QBXwPg/+QBXwQN/+EBXwQT/9IBXwQU/9IBYAPw/64BYQPw/64BYgPw/64BYwCT/1wBYwCU/1wBYwCV/1wBYwCW/1wBYwCX/1wBYwCr/6wBYwF9/+wBYwF//+wBYwGP/+EBYwPf/8IBYwPg/8IBZQDN//gBZQDO//gBZQDP//gBZQDV//gBZQDb//gBZQDd//gBZQDf//gBZQDg//gBZQDh//gBZQDj//gBZQDk//gBZQDo//YBZQDq//YBZQDr//YBZQDu//YBZQDw//YBZQD0//YBZQD1//YBZQD2//YBZQD3//YBZQD4//YBZQD+//YBZQD///YBZQEB//YBZQED//YBZQEE//YBZQEMAAUBZQE6//YBZQE7//YBZQE8//YBZQE9//YBZQFD//YBZQFF//YBZQFN//YBZQFO//YBZQFR//YBZQFT//YBZQFX//YBZQFc//gBZQFe//gBZQPx//EBZQQP/+EBZgD0//YBagEbAA8BagQNAAcBcgELAFIBcgEjAI8BcgEmAGEBcgGxAFIBcgGyAFIBcgPf/3YBcgPg/3YBcgPj/3YBcgQI/3YBcgQJ/3YBcwELAFIBcwEjAI8BcwEmAGEBcwGxAFIBcwGyAFIBcwPf/3YBcwPg/3YBcwPj/3YBcwQI/3YBcwQJ/3YBdAEjAI8BdAEmAGEBdAGxAFIBdAGyAFIBdAPf/3YBdAPg/3YBdAPj/3YBdAQI/3YBdAQJ/3YBdQEjAI8BdQEmAGEBdQPf/3YBdQPg/3YBdQPj/3YBdQQI/3YBdQQJ/3YBdgELAFIBdgEjAI8BdgEmAGEBdgGxAFIBdgGyAFIBdgPf/3YBdgPg/3YBdgPj/3YBdgQI/3YBdgQJ/3YBdwELAFIBdwEjAI8BdwEmAGEBdwGxAFIBdwGyAFIBdwPf/3YBdwPg/3YBdwPj/3YBdwQI/3YBdwQJ/3YBfQDN//kBfQDO//kBfQDP//kBfQDV//kBfQDb//kBfQDf//kBfQDg//kBfQDh//kBfQDj//kBfQDk//kBfQDo/+wBfQDq/+wBfQDu/+wBfQDw/+wBfQDx/+wBfQD0/+wBfQD1/+wBfQD3/+wBfQD4/+wBfQD+/+wBfQD//+wBfQEB/+wBfQED/+wBfQEE/+wBfQEM//EBfQE6/+wBfQE7/+wBfQE9/+wBfQFD/+wBfQFF/+wBfQFN/+wBfQFR/+wBfQFT/+wBfQFc//QBfQFe//QBfQFf//QBfQFlAAoBfQF9ACkBfQGP//QBfQPf/2sBfQPg/2sBfQPj/2sBfQQI/2sBfQQJ/2sBfQQKAA8BfwDN//kBfwDb//kBfwDg//kBfwDo/+wBfwDu/+wBfwD0/+wBfwEE/+wBfwEM//EBfwE6/+wBfwE7/+wBfwFD/+wBfwFc//QBfwFd//QBfwFlAAoBfwF9ACkBfwGP//QBfwPf/4oBfwPg/4oBfwPj/4oBfwQI/4oBfwQJ/4oBfwQLABwBfwQNABwBfwQxAFIBfwQzAFIBgAPf/2sBgAPg/2sBgAPj/2sBgAQI/2sBgAQJ/2sBgAQxAFIBgAQzAFIBgQPf/2sBgQPg/2sBgQPj/2sBgQQI/2sBgQQJ/2sBgQQxAFIBgQQzAFIBggPf/2sBggPg/2sBggPj/2sBggQI/2sBggQJ/2sBggQxAFIBggQzAFIBgwPf/2sBgwPg/2sBgwPj/2sBgwQI/2sBgwQJ/2sBgwQxAFIBgwQzAFIBhADN//QBhADO//QBhADP//QBhADj//QBhADo/98BhADu/98BhAD0/98BhAD1/98BhAD+/98BhAE6/98BhAE7/98BhAFT/98BhAFX/98BhAFc/98BhAFq//QBhAGFABQBhAPx/9wBhQDN//kBhQDO//kBhQDV//kBhQDb//kBhQDf//kBhQDh//kBhQDo/+wBhQDp/+wBhQDq/+wBhQDr/+wBhQDu/+wBhQD0/+wBhQD1/+wBhQEB/+wBhQEM//EBhQE6/+wBhQE7/+wBhQFD/+wBhQFN/+wBhQFO/+wBhQFX/+wBhQFc//QBhQFd//QBhQFe//QBhQFf//QBhQPf/2sBhQPg/2sBhQPj/2sBhQQI/2sBhQQJ/2sBhQQLABwBhQQNABwBhQQxAFIBhQQzAFIBhgDo/+wBhgDq/+wBhgDu/+wBhgDv/+wBhgFc//QBhgFe//QBhgPf/2sBhgPg/2sBhgPj/2sBhgQI/2sBhgQJ/2sBhgQxAFIBhgQzAFIBhwPf/2sBhwPg/2sBhwPj/2sBhwQI/2sBhwQJ/2sBhwQxAFIBhwQzAFIBiAPf/2sBiAPg/2sBiAPj/2sBiAQI/2sBiAQJ/2sBiAQxAFIBiAQzAFIBiQPf/2sBiQPg/2sBiQPj/2sBiQQI/2sBiQQJ/2sBiQQxAFIBiQQzAFIBigPf/2sBigPg/2sBigPj/2sBigQI/2sBigQJ/2sBigQxAFIBigQzAFIBiwPf/2sBiwPg/2sBiwPj/2sBiwQI/2sBiwQJ/2sBiwQxAFIBiwQzAFIBjAPf/2sBjAPg/2sBjAPj/2sBjAQI/2sBjAQJ/2sBjQPf/2sBjQPg/2sBjQPj/2sBjQQI/2sBjQQJ/2sBjQQxAFIBjQQzAFIBjgPf/2sBjgPg/2sBjgPj/2sBjgQI/2sBjgQJ/2sBjgQxAFIBjgQzAFIBjwDN//YBjwDO//YBjwDP//YBjwDV//YBjwDb//YBjwDf//YBjwDg//YBjwDj//YBjwDk//YBjwDo/+EBjwDq/+EBjwDu/+EBjwDw/+EBjwD0/+EBjwD1/+EBjwD4/+EBjwD+/+EBjwD//+EBjwEB/+EBjwED/+EBjwEE/+EBjwEM//sBjwE6/+EBjwE7/+EBjwE9/+EBjwFD/+EBjwFF/+EBjwFN/+EBjwFT/+EBjwFX/+EBjwFc/+kBjwFe/+kBjwF9//QBjwF///QBjwGF//QBjwGG//QBkADo/+EBkADp/+EBkADu/+EBkQDN//YBkQDO//YBkQDf//YBkQDg//YBkQDo/+EBkQDu/+EBkQDw/+EBkQD0/+EBkQD1/+EBkQD//+EBkQED/+EBkQEE/+EBkQEM//sBkQE6/+EBkQFT/+EBkQFc/+kBkQFe/+kBkQGF//QBkgDN//YBkgDg//YBkgDo/+EBkgDu/+EBkgD0/+EBkgEE/+EBkgE6/+EBkgE7/+EBkgFc/+kBtgHS/4oBtgHT/6QBtgHU/6QBtgHX/4UBtgHe/4oBtgHn/4oBtgHq/4oBtgHs/4oBtgH1/6QBtgH2/6QBtgH9/4oBtgIE/4oBtgIF/6QBtgIG/6QBtgII/4oBtgIJ/4UBtgIK/4UBtgIU/4UBtgIl/6QBtgIm/6QBtgIn/6QBtgIo/4UBtgIu/6QBtgPq/64BtgQL/3YBtgQN/3YBtwHX/6QBtwIJ/6QBtwIK/6QBtwIU/6QBtwIo/6QBuAHX/6QBuAIJ/6QBuAIK/6QBuAIU/6QBuAIo/6QBuQG2/2EBuQG//4UBuQHL/3YBuQHf/3YBuQHu/2EBuQIQ/2sBuQIR/3YBuQIW/2EBuQIX/2EBuQIY/2EBuQI5/zMBuQI7/2sBuQI8/2sBuQI9/2sBuQI+/2sBuQI//2sBuQJA/2sBuQJB/2sBuQJC/z0BuQJD/3YBuQJE/3YBuQJF/3YBuQJG/58BuQJH/3YBuQJI/2sBuQJJ/2sBuQJK/2sBuQJL/2sBuQJM/2sBuQJN/2sBuQJO/00BuQJP/2sBuQJQ/2sBuQJR/3YBuQJS/2sBuQJT/2sBuQJU/3YBuQJW/5oBuQJX/5oBuQJY/3YBuQJZ/6kBuQJa/1cBuQJb/2sBuQJc/2sBuQJd/2sBuQJe/2sBuQJf/2sBuQJg/2sBuQJi/00BuQJj/2sBuQJk/5UBuQJl/3YBuQJm/3YBuQJr/2sBuQJs/4ABuQJu/5oBuQJw/2sBuQJx/00BuQJy/2sBuQJz/58BuQJ0/2sBuQJ2/4ABuQJ3/3YBuQJ4/5oBuQJ5/5oBuQJ6/3YBuQJ7/58BuQJ9/2sBuQJ+/2sBuQKB/2sBuQKC/2sBuQKD/2sBuQKE/2sBuQKF/3YBuQKG/3YBuQKI/5oBuQKJ/5oBuQKK/6kBuQKM/1cBuQKN/1cBuQKS/58BuQKT/2sBuQKU/00BuQKV/2sBuQKW/2sBuQKX/1cBuQKY/2sBuQKZ/zMBuQKa/zMBuQKb/zMBuQKc/3YBuQKd/3YBuQKe/3YBuQKf/58BuQKh/3YBuQKi/2sBuQKj/2sBuQKk/3YBuQKl/3YBuQKm/3YBuQKn/3YBuQKo/5oBuQKp/5oBuQKq/5oBuQKr/1cBuQKs/2sBuQKu/6kBuQKv/6kBuQKw/3YBuQKx/5oBuQKy/3YBuQK0/2sBuQPf/ykBuQPg/ykBuQPj/ykBuQPx/2EBuQPz/2EBuQP0/2EBuQQI/ykBuQQJ/ykBuQQQ/48BuQQS/48BugG2/2EBugG//4UBugHL/3YBugHf/3YBugHm/64BugHu/2EBugIQ/2sBugIR/3YBugIW/2EBugIX/2EBugIY/2EBugI5/zMBugI7/2sBugI8/2sBugI9/2sBugI+/2sBugI//2sBugJA/2sBugJB/2sBugJC/z0BugJD/3YBugJE/3YBugJF/3YBugJG/58BugJH/3YBugJI/2sBugJJ/2sBugJK/2sBugJL/2sBugJM/2sBugJN/2sBugJO/00BugJP/2sBugJQ/2sBugJR/3YBugJS/2sBugJT/2sBugJU/3YBugJW/5oBugJX/5oBugJY/3YBugJZ/6kBugJa/1cBugJb/2sBugJc/2sBugJd/2sBugJe/2sBugJf/2sBugJg/2sBugJi/00BugJj/2sBugJk/5UBugJl/3YBugJm/3YBugJr/2sBugJs/4ABugJu/5oBugJw/2sBugJx/00BugJy/2sBugJz/58BugJ0/2sBugJ2/4ABugJ3/3YBugJ4/5oBugJ5/5oBugJ6/3YBugJ7/58BugJ9/2sBugJ+/2sBugKB/2sBugKC/2sBugKD/2sBugKE/2sBugKF/3YBugKG/3YBugKI/5oBugKJ/5oBugKK/6kBugKM/1cBugKN/1cBugKS/58BugKT/2sBugKU/00BugKV/2sBugKW/2sBugKX/1cBugKY/2sBugKZ/zMBugKa/zMBugKb/zMBugKc/3YBugKd/3YBugKe/3YBugKf/58BugKh/3YBugKi/2sBugKj/2sBugKk/3YBugKl/3YBugKm/3YBugKn/3YBugKo/5oBugKp/5oBugKq/5oBugKr/1cBugKs/2sBugKu/6kBugKv/6kBugKw/3YBugKx/5oBugKy/3YBugK0/2sBugPf/ykBugPg/ykBugPj/ykBugPx/2EBugPz/2EBugP0/2EBugQI/ykBugQJ/ykBugQP/64BugQQ/48BugQR/64BugQS/48BuwG2/2EBuwG//4UBuwHL/3YBuwHf/3YBuwHu/2EBuwIQ/2sBuwIR/3YBuwIW/2EBuwIX/2EBuwIY/2EBuwI5/zMBuwI7/2sBuwI8/2sBuwI9/2sBuwI+/2sBuwI//2sBuwJA/2sBuwJB/2sBuwJC/z0BuwJD/3YBuwJE/3YBuwJF/3YBuwJG/58BuwJH/3YBuwJI/2sBuwJJ/2sBuwJK/2sBuwJL/2sBuwJM/2sBuwJN/2sBuwJO/00BuwJP/2sBuwJQ/2sBuwJR/3YBuwJS/2sBuwJT/2sBuwJU/3YBuwJW/5oBuwJX/5oBuwJY/3YBuwJZ/6kBuwJa/1cBuwJb/2sBuwJc/2sBuwJd/2sBuwJe/2sBuwJf/2sBuwJg/2sBuwJi/00BuwJj/2sBuwJk/5UBuwJl/3YBuwJm/3YBuwJr/2sBuwJs/4ABuwJu/5oBuwJw/2sBuwJx/00BuwJy/2sBuwJz/58BuwJ0/2sBuwJ2/4ABuwJ3/3YBuwJ4/5oBuwJ5/5oBuwJ6/3YBuwJ7/58BuwJ9/2sBuwJ+/2sBuwKB/2sBuwKC/2sBuwKD/2sBuwKE/2sBuwKF/3YBuwKG/3YBuwKI/5oBuwKJ/5oBuwKK/6kBuwKM/1cBuwKN/1cBuwKS/58BuwKT/2sBuwKU/00BuwKV/2sBuwKW/2sBuwKX/1cBuwKY/2sBuwKZ/zMBuwKa/zMBuwKb/zMBuwKc/3YBuwKd/3YBuwKe/3YBuwKf/58BuwKh/3YBuwKi/2sBuwKj/2sBuwKk/3YBuwKl/3YBuwKm/3YBuwKn/3YBuwKo/5oBuwKp/5oBuwKq/5oBuwKr/1cBuwKs/2sBuwKu/6kBuwKv/6kBuwKw/3YBuwKx/5oBuwKy/3YBuwK0/2sBuwPf/ykBuwPg/ykBuwPj/ykBuwPx/2EBuwPz/2EBuwP0/2EBuwQI/ykBuwQJ/ykBuwQQ/48BuwQS/48BvAG2/2EBvAG//4UBvAHL/3YBvAHf/3YBvAHm/64BvAHu/2EBvAIQ/2sBvAIR/3YBvAIW/2EBvAIX/2EBvAIY/2EBvAI5/zMBvAI7/2sBvAI8/2sBvAI9/2sBvAI+/2sBvAI//2sBvAJA/2sBvAJB/2sBvAJC/z0BvAJD/3YBvAJE/3YBvAJF/3YBvAJG/58BvAJH/3YBvAJI/2sBvAJJ/2sBvAJK/2sBvAJL/2sBvAJM/2sBvAJN/2sBvAJO/00BvAJP/2sBvAJQ/2sBvAJR/3YBvAJS/2sBvAJT/2sBvAJU/3YBvAJW/5oBvAJX/5oBvAJY/3YBvAJZ/6kBvAJa/1cBvAJb/2sBvAJc/2sBvAJd/2sBvAJe/2sBvAJf/2sBvAJg/2sBvAJi/00BvAJj/2sBvAJk/5UBvAJl/3YBvAJm/3YBvAJr/2sBvAJs/4ABvAJu/5oBvAJw/2sBvAJx/00BvAJy/2sBvAJz/58BvAJ0/2sBvAJ2/4ABvAJ3/3YBvAJ4/5oBvAJ5/5oBvAJ6/3YBvAJ7/58BvAJ9/2sBvAJ+/2sBvAKB/2sBvAKC/2sBvAKD/2sBvAKE/2sBvAKF/3YBvAKG/3YBvAKI/5oBvAKJ/5oBvAKK/6kBvAKM/1cBvAKN/1cBvAKS/58BvAKT/2sBvAKU/00BvAKV/2sBvAKW/2sBvAKX/1cBvAKY/2sBvAKZ/zMBvAKa/zMBvAKb/zMBvAKc/3YBvAKd/3YBvAKe/3YBvAKf/58BvAKh/3YBvAKi/2sBvAKj/2sBvAKk/3YBvAKl/3YBvAKm/3YBvAKn/3YBvAKo/5oBvAKp/5oBvAKq/5oBvAKr/1cBvAKs/2sBvAKu/6kBvAKv/6kBvAKw/3YBvAKx/5oBvAKy/3YBvAK0/2sBvAPf/ykBvAPg/ykBvAPj/ykBvAPx/2EBvAPz/2EBvAP0/2EBvAQI/ykBvAQJ/ykBvAQP/64BvAQQ/48BvAQR/64BvAQS/48BvQG2/2EBvQG//4UBvQHL/3YBvQHf/3YBvQHm/64BvQHu/2EBvQIQ/2sBvQIR/3YBvQIW/2EBvQIX/2EBvQIY/2EBvQI5/zMBvQI7/2sBvQI8/2sBvQI9/2sBvQI+/2sBvQI//2sBvQJA/2sBvQJB/2sBvQJC/z0BvQJD/3YBvQJE/3YBvQJF/3YBvQJG/58BvQJH/3YBvQJI/2sBvQJJ/2sBvQJK/2sBvQJL/2sBvQJM/2sBvQJN/2sBvQJO/00BvQJP/2sBvQJQ/2sBvQJR/3YBvQJS/2sBvQJT/2sBvQJU/3YBvQJW/5oBvQJX/5oBvQJY/3YBvQJZ/6kBvQJa/1cBvQJb/2sBvQJc/2sBvQJd/2sBvQJe/2sBvQJf/2sBvQJg/2sBvQJi/00BvQJj/2sBvQJk/5UBvQJl/3YBvQJm/3YBvQJr/2sBvQJs/4ABvQJu/5oBvQJw/2sBvQJx/00BvQJy/2sBvQJz/58BvQJ0/2sBvQJ2/4ABvQJ3/3YBvQJ4/5oBvQJ5/5oBvQJ6/3YBvQJ7/58BvQJ9/2sBvQJ+/2sBvQKB/2sBvQKC/2sBvQKD/2sBvQKE/2sBvQKF/3YBvQKG/3YBvQKI/5oBvQKJ/5oBvQKK/6kBvQKM/1cBvQKN/1cBvQKS/58BvQKT/2sBvQKU/00BvQKV/2sBvQKW/2sBvQKX/1cBvQKY/2sBvQKZ/zMBvQKa/zMBvQKb/zMBvQKc/3YBvQKd/3YBvQKe/3YBvQKf/58BvQKh/3YBvQKi/2sBvQKj/2sBvQKk/3YBvQKl/3YBvQKm/3YBvQKn/3YBvQKo/5oBvQKp/5oBvQKq/5oBvQKr/1cBvQKs/2sBvQKu/6kBvQKv/6kBvQKw/3YBvQKx/5oBvQKy/3YBvQK0/2sBvQPf/ykBvQPg/ykBvQPj/ykBvQPx/2EBvQPz/2EBvQP0/2EBvQQI/ykBvQQJ/ykBvQQP/64BvQQQ/48BvQQR/64BvQQS/48BvgHS/64BvgHT/5UBvgHU/5UBvgHX/64BvgHe/64BvgHn/64BvgHq/64BvgHs/64BvgH1/5UBvgH2/5UBvgH9/64BvgIE/64BvgIF/5UBvgIG/5UBvgII/64BvgIJ/64BvgIK/64BvgIU/64BvgIl/5UBvgIm/5UBvgIn/5UBvgIo/64BvgIu/5UBwwHX/58BwwIJ/58BwwIK/58BwwIU/58BwwIo/58BwwJa/4ABwwKM/4ABwwKN/4ABwwKX/4ABwwKr/4ABxAHX/6QBxAIJ/6QBxAIK/6QBxAIU/6QBxAIo/6QByQHX/58ByQIJ/58ByQIK/58ByQIU/58ByQIo/58ByQJa/4AByQKM/4AByQKN/4AByQKX/4AByQKr/4ABygHX/58BygIJ/58BygIK/58BygIU/58BygIo/58BygJa/4ABygKM/4ABygKN/4ABygKX/4ABygKr/4AB0AG2/5oB0AG//5oB0AHL/58B0AHf/58B0AHm/64B0AHu/5oB0AIR/58B0AIW/5oB0AIX/5oB0AIY/5oB0AJO/64B0AJi/64B0AJx/64B0AKU/64B0APf/uYB0APg/uYB0APj/uYB0AQI/uYB0AQJ/uYB0gG2/3sB0gG//5UB0gHL/4oB0gHf/4oB0gHu/3sB0gIQ/4oB0gIR/4oB0gIW/3sB0gIX/3sB0gIY/3sB0gI5/3EB0gI7/4oB0gI8/4oB0gI9/4oB0gI+/4oB0gI//4oB0gJA/6kB0gJB/4oB0gJC/2EB0gJD/3YB0gJE/3YB0gJF/3YB0gJG/6QB0gJH/3YB0gJI/4oB0gJJ/4oB0gJK/4oB0gJL/4oB0gJM/4oB0gJN/4oB0gJO/3YB0gJP/4oB0gJQ/4oB0gJR/3YB0gJS/4oB0gJT/4oB0gJU/3YB0gJY/3YB0gJZ/58B0gJa/4UB0gJb/4oB0gJc/4oB0gJd/4oB0gJe/4oB0gJf/4oB0gJg/4oB0gJi/3YB0gJj/4oB0gJk/4UB0gJl/3YB0gJm/3YB0gJr/4oB0gJs/4UB0gJw/4oB0gJx/3YB0gJy/4oB0gJz/6QB0gJ0/4oB0gJ2/5oB0gJ3/3YB0gJ6/3YB0gJ7/6QB0gJ9/4oB0gJ+/4oB0gKB/4oB0gKC/4oB0gKD/4oB0gKE/4oB0gKF/3YB0gKG/3YB0gKK/58B0gKM/4UB0gKN/4UB0gKP/6kB0gKQ/6kB0gKS/6QB0gKT/4oB0gKU/3YB0gKV/4oB0gKW/4oB0gKX/4UB0gKY/4oB0gKZ/3EB0gKa/3EB0gKb/3EB0gKc/3YB0gKd/3YB0gKe/3YB0gKf/6QB0gKh/4oB0gKi/4oB0gKj/4oB0gKk/3YB0gKl/3YB0gKm/3YB0gKn/3YB0gKr/4UB0gKs/4oB0gKu/58B0gKv/58B0gKw/3YB0gKy/3YB0gK0/4oB0gPf/1cB0gPg/1cB0gPj/1cB0gPo/5UB0gQI/1cB0gQJ/1cB0gQP/6kB0gQR/6kB0wG2/5UB0wG//5AB0wHL/5oB0wHf/5oB0wHu/5UB0wIR/5oB0wIW/5UB0wIX/5UB0wIY/5UB0wI5/2wB0wJC/1wB0wJD/4AB0wJE/4AB0wJF/4AB0wJG/6QB0wJH/4AB0wJO/3EB0wJR/4AB0wJU/4AB0wJY/4AB0wJa/64B0wJi/3EB0wJk/6kB0wJl/4AB0wJm/4AB0wJs/6kB0wJx/3EB0wJz/6QB0wJ3/4AB0wJ6/4AB0wJ7/6QB0wKF/4AB0wKG/4AB0wKM/64B0wKN/64B0wKS/6QB0wKU/3EB0wKX/64B0wKZ/2wB0wKa/2wB0wKb/2wB0wKc/4AB0wKd/4AB0wKe/4AB0wKf/6QB0wKh/4AB0wKk/4AB0wKl/4AB0wKm/4AB0wKn/4AB0wKr/64B0wKw/4AB0wKy/4AB0wPf/xQB0wPg/xQB0wPj/xQB0wPo/4UB0wPx/4UB0wPz/4UB0wP0/4UB0wQI/xQB0wQJ/xQB0wQP/5oB0wQR/5oB1AG2/5UB1AG//5AB1AHL/5oB1AHf/5oB1AHu/5UB1AIR/5oB1AIW/5UB1AIX/5UB1AIY/5UB1AI5/2wB1AJC/1wB1AJD/4AB1AJE/4AB1AJF/4AB1AJG/6QB1AJH/4AB1AJO/3EB1AJR/4AB1AJU/4AB1AJY/4AB1AJa/64B1AJi/3EB1AJk/6kB1AJl/4AB1AJm/4AB1AJs/6kB1AJx/3EB1AJz/6QB1AJ3/4AB1AJ6/4AB1AJ7/6QB1AKF/4AB1AKG/4AB1AKM/64B1AKN/64B1AKS/6QB1AKU/3EB1AKX/64B1AKZ/2wB1AKa/2wB1AKb/2wB1AKc/4AB1AKd/4AB1AKe/4AB1AKf/6QB1AKh/4AB1AKk/4AB1AKl/4AB1AKm/4AB1AKn/4AB1AKr/64B1AKw/4AB1AKy/4AB1APf/xQB1APg/xQB1APj/xQB1APo/4UB1APx/4UB1APz/4UB1AP0/4UB1AQI/xQB1AQJ/xQB1AQP/5oB1AQR/5oB1gJa/5oB1gKM/5oB1gKN/5oB1gKX/5oB1gKr/5oB3AHS/4UB3AHX/5UB3AHe/4UB3AHn/4UB3AHq/4UB3AHs/4UB3AH9/4UB3AIE/4UB3AII/4UB3AIJ/5UB3AIK/5UB3AIU/5UB3AIo/5UB3AQL/6QB3AQN/6QB3gHS/4UB3gHX/5UB3gHe/4UB3gHn/4UB3gHq/4UB3gHs/4UB3gH9/4UB3gIE/4UB3gII/4UB3gIJ/5UB3gIK/5UB3gIU/5UB3gIo/5UB3gQL/6QB3gQN/6QB3wHS/4UB3wHX/5UB3wHe/4UB3wHn/4UB3wHq/4UB3wHs/4UB3wH9/4UB3wIE/4UB3wII/4UB3wIJ/5UB3wIK/5UB3wIU/5UB3wIo/5UB3wQL/6QB3wQN/6QB4AHS/4UB4AHX/5UB4AHe/4UB4AHn/4UB4AHq/4UB4AHs/4UB4AH9/4UB4AIE/4UB4AII/4UB4AIJ/5UB4AIK/5UB4AIU/5UB4AIo/5UB4AQL/6QB4AQN/6QB5wHS/64B5wHT/5UB5wHU/5UB5wHX/64B5wHe/64B5wHn/64B5wHq/64B5wHs/64B5wH1/5UB5wH2/5UB5wH9/64B5wIE/64B5wIF/5UB5wIG/5UB5wII/64B5wIJ/64B5wIK/64B5wIU/64B5wIl/5UB5wIm/5UB5wIn/5UB5wIo/64B5wIu/5UB6gHS/64B6gHT/5UB6gHU/5UB6gHX/64B6gHe/64B6gHn/64B6gHq/64B6gHs/64B6gH1/5UB6gH2/5UB6gH9/64B6gIE/64B6gIF/5UB6gIG/5UB6gII/64B6gIJ/64B6gIK/64B6gIU/64B6gIl/5UB6gIm/5UB6gIn/5UB6gIo/64B6gIu/5UB7AHS/4UB7AHX/5UB7AHe/4UB7AHn/4UB7AHq/4UB7AHs/4UB7AH9/4UB7AIE/4UB7AII/4UB7AIJ/5UB7AIK/5UB7AIU/5UB7AIo/5UB7AQL/6QB7AQN/6QB7gHS/4oB7gHT/6QB7gHU/6QB7gHX/4UB7gHe/4oB7gHn/4oB7gHq/4oB7gHs/4oB7gH1/6QB7gH2/6QB7gH9/4oB7gIE/4oB7gIF/6QB7gIG/6QB7gII/4oB7gIJ/4UB7gIK/4UB7gIU/4UB7gIl/6QB7gIm/6QB7gIn/6QB7gIo/4UB7gIu/6QB7gPq/64B7gQL/3YB7gQN/3YB7wHS/4oB7wHT/6QB7wHU/6QB7wHX/4UB7wHe/4oB7wHn/4oB7wHq/4oB7wHs/4oB7wH1/6QB7wH2/6QB7wH9/4oB7wIE/4oB7wIF/6QB7wIG/6QB7wII/4oB7wIJ/4UB7wIK/4UB7wIU/4UB7wIl/6QB7wIm/6QB7wIn/6QB7wIo/4UB7wIu/6QB7wPq/64B7wQL/3YB7wQN/3YB8AHX/58B8AIJ/58B8AIK/58B8AIU/58B8AIo/58B8AJa/4AB8AKM/4AB8AKN/4AB8AKX/4AB8AKr/4AB8QHX/58B8QIJ/58B8QIK/58B8QIU/58B8QIo/58B8QJa/4AB8QKM/4AB8QKN/4AB8QKX/4AB8QKr/4AB9QG2/3sB9QG//5UB9QHL/4oB9QHf/4oB9QHu/3sB9QIQ/4oB9QIR/4oB9QIW/3sB9QIX/3sB9QIY/3sB9QI5/3EB9QI7/4oB9QI8/4oB9QI9/4oB9QI+/4oB9QI//4oB9QJA/6kB9QJB/4oB9QJC/2EB9QJD/3YB9QJE/3YB9QJF/3YB9QJG/6QB9QJH/3YB9QJI/4oB9QJJ/4oB9QJK/4oB9QJL/4oB9QJM/4oB9QJN/4oB9QJO/3YB9QJP/4oB9QJQ/4oB9QJR/3YB9QJS/4oB9QJT/4oB9QJU/3YB9QJY/3YB9QJZ/58B9QJa/4UB9QJb/4oB9QJc/4oB9QJd/4oB9QJe/4oB9QJf/4oB9QJg/4oB9QJi/3YB9QJj/4oB9QJk/4UB9QJl/3YB9QJm/3YB9QJr/4oB9QJs/4UB9QJw/4oB9QJx/3YB9QJy/4oB9QJz/6QB9QJ0/4oB9QJ2/5oB9QJ3/3YB9QJ6/3YB9QJ7/6QB9QJ9/4oB9QJ+/4oB9QKB/4oB9QKC/4oB9QKD/4oB9QKE/4oB9QKF/3YB9QKG/3YB9QKK/58B9QKM/4UB9QKN/4UB9QKP/6kB9QKQ/6kB9QKS/6QB9QKT/4oB9QKU/3YB9QKV/4oB9QKW/4oB9QKX/4UB9QKY/4oB9QKZ/3EB9QKa/3EB9QKb/3EB9QKc/3YB9QKd/3YB9QKe/3YB9QKf/6QB9QKh/4oB9QKi/4oB9QKj/4oB9QKk/3YB9QKl/3YB9QKm/3YB9QKn/3YB9QKr/4UB9QKs/4oB9QKu/58B9QKv/58B9QKw/3YB9QKy/3YB9QK0/4oB9QPf/1cB9QPg/1cB9QPj/1cB9QPo/5UB9QQI/1cB9QQJ/1cB9QQP/6kB9QQR/6kB9gG2/3sB9gG//5UB9gHL/4oB9gHf/4oB9gHu/3sB9gIQ/4oB9gIR/4oB9gIW/3sB9gIX/3sB9gIY/3sB9gI5/3EB9gI7/4oB9gI8/4oB9gI9/4oB9gI+/4oB9gI//4oB9gJA/6kB9gJB/4oB9gJC/2EB9gJD/3YB9gJE/3YB9gJF/3YB9gJG/6QB9gJH/3YB9gJI/4oB9gJJ/4oB9gJK/4oB9gJL/4oB9gJM/4oB9gJN/4oB9gJO/3YB9gJP/4oB9gJQ/4oB9gJR/3YB9gJS/4oB9gJT/4oB9gJU/3YB9gJY/3YB9gJZ/58B9gJa/4UB9gJb/4oB9gJc/4oB9gJd/4oB9gJe/4oB9gJf/4oB9gJg/4oB9gJi/3YB9gJj/4oB9gJk/4UB9gJl/3YB9gJm/3YB9gJr/4oB9gJs/4UB9gJw/4oB9gJx/3YB9gJy/4oB9gJz/6QB9gJ0/4oB9gJ2/5oB9gJ3/3YB9gJ6/3YB9gJ7/6QB9gJ9/4oB9gJ+/4oB9gKB/4oB9gKC/4oB9gKD/4oB9gKE/4oB9gKF/3YB9gKG/3YB9gKK/58B9gKM/4UB9gKN/4UB9gKP/6kB9gKQ/6kB9gKS/6QB9gKT/4oB9gKU/3YB9gKV/4oB9gKW/4oB9gKX/4UB9gKY/4oB9gKZ/3EB9gKa/3EB9gKb/3EB9gKc/3YB9gKd/3YB9gKe/3YB9gKf/6QB9gKh/4oB9gKi/4oB9gKj/4oB9gKk/3YB9gKl/3YB9gKm/3YB9gKn/3YB9gKr/4UB9gKs/4oB9gKu/58B9gKv/58B9gKw/3YB9gKy/3YB9gK0/4oB9gPf/1cB9gPg/1cB9gPj/1cB9gPo/5UB9gQI/1cB9gQJ/1cB9gQP/6kB9gQR/6kB9wPf/4oB9wPg/4oB9wPj/4oB9wQI/4oB9wQJ/4oB+AHX/58B+AIJ/58B+AIK/58B+AIU/58B+AIo/58B+AJa/4AB+AKM/4AB+AKN/4AB+AKX/4AB+AKr/4AB+QHX/6QB+QIJ/6QB+QIK/6QB+QIU/6QB+QIo/6QB+gHX/58B+gIJ/58B+gIK/58B+gIU/58B+gIo/58B+gJa/4AB+gKM/4AB+gKN/4AB+gKX/4AB+gKr/4AB+wHX/58B+wIJ/58B+wIK/58B+wIU/58B+wIo/58B+wJa/4AB+wKM/4AB+wKN/4AB+wKX/4AB+wKr/4AB/AHX/58B/AIJ/58B/AIK/58B/AIU/58B/AIo/58B/AJa/4AB/AKM/4AB/AKN/4AB/AKX/4AB/AKr/4AB/QHX/58B/QIJ/58B/QIK/58B/QIU/58B/QIo/58B/QJa/4AB/QKM/4AB/QKN/4AB/QKX/4AB/QKr/4AB/wG2/3sB/wG//5UB/wHL/4oB/wHf/4oB/wHu/3sB/wIQ/4oB/wIR/4oB/wIW/3sB/wIX/3sB/wIY/3sB/wI5/3EB/wI7/4oB/wI8/4oB/wI9/4oB/wI+/4oB/wI//4oB/wJA/6kB/wJB/4oB/wJC/2EB/wJD/3YB/wJE/3YB/wJF/3YB/wJG/6QB/wJH/3YB/wJI/4oB/wJJ/4oB/wJK/4oB/wJL/4oB/wJM/4oB/wJN/4oB/wJO/3YB/wJP/4oB/wJQ/4oB/wJR/3YB/wJS/4oB/wJT/4oB/wJU/3YB/wJY/3YB/wJZ/58B/wJa/4UB/wJb/4oB/wJc/4oB/wJd/4oB/wJe/4oB/wJf/4oB/wJg/4oB/wJi/3YB/wJj/4oB/wJk/4UB/wJl/3YB/wJm/3YB/wJr/4oB/wJs/4UB/wJw/4oB/wJx/3YB/wJy/4oB/wJz/6QB/wJ0/4oB/wJ2/5oB/wJ3/3YB/wJ6/3YB/wJ7/6QB/wJ9/4oB/wJ+/4oB/wKB/4oB/wKC/4oB/wKD/4oB/wKE/4oB/wKF/3YB/wKG/3YB/wKK/58B/wKM/4UB/wKN/4UB/wKP/6kB/wKQ/6kB/wKS/6QB/wKT/4oB/wKU/3YB/wKV/4oB/wKW/4oB/wKX/4UB/wKY/4oB/wKZ/3EB/wKa/3EB/wKb/3EB/wKc/3YB/wKd/3YB/wKe/3YB/wKf/6QB/wKh/4oB/wKi/4oB/wKj/4oB/wKk/3YB/wKl/3YB/wKm/3YB/wKn/3YB/wKr/4UB/wKs/4oB/wKu/58B/wKv/58B/wKw/3YB/wKy/3YB/wK0/4oB/wPf/1cB/wPg/1cB/wPj/1cB/wPo/5UB/wQI/1cB/wQJ/1cB/wQP/6kB/wQR/6kCAAHS/4UCAAHX/5UCAAHe/4UCAAHn/4UCAAHq/4UCAAHs/4UCAAH9/4UCAAIE/4UCAAII/4UCAAIJ/5UCAAIK/5UCAAIU/5UCAAIo/5UCAAQL/6QCAAQN/6QCBAG2/3sCBAG//5UCBAHL/4oCBAHf/4oCBAHu/3sCBAIQ/4oCBAIR/4oCBAIW/3sCBAIX/3sCBAIY/3sCBAI5/3ECBAI7/4oCBAI8/4oCBAI9/4oCBAI+/4oCBAI//4oCBAJA/6kCBAJB/4oCBAJC/2ECBAJD/3YCBAJE/3YCBAJF/3YCBAJG/6QCBAJH/3YCBAJI/4oCBAJJ/4oCBAJK/4oCBAJL/4oCBAJM/4oCBAJN/4oCBAJO/3YCBAJP/4oCBAJQ/4oCBAJR/3YCBAJS/4oCBAJT/4oCBAJU/3YCBAJY/3YCBAJZ/58CBAJa/4UCBAJb/4oCBAJc/4oCBAJd/4oCBAJe/4oCBAJf/4oCBAJg/4oCBAJi/3YCBAJj/4oCBAJk/4UCBAJl/3YCBAJm/3YCBAJr/4oCBAJs/4UCBAJw/4oCBAJx/3YCBAJy/4oCBAJz/6QCBAJ0/4oCBAJ2/5oCBAJ3/3YCBAJ6/3YCBAJ7/6QCBAJ9/4oCBAJ+/4oCBAKB/4oCBAKC/4oCBAKD/4oCBAKE/4oCBAKF/3YCBAKG/3YCBAKK/58CBAKM/4UCBAKN/4UCBAKP/6kCBAKQ/6kCBAKS/6QCBAKT/4oCBAKU/3YCBAKV/4oCBAKW/4oCBAKX/4UCBAKY/4oCBAKZ/3ECBAKa/3ECBAKb/3ECBAKc/3YCBAKd/3YCBAKe/3YCBAKf/6QCBAKh/4oCBAKi/4oCBAKj/4oCBAKk/3YCBAKl/3YCBAKm/3YCBAKn/3YCBAKr/4UCBAKs/4oCBAKu/58CBAKv/58CBAKw/3YCBAKy/3YCBAK0/4oCBAPf/1cCBAPg/1cCBAPj/1cCBAPo/5UCBAQI/1cCBAQJ/1cCBAQP/6kCBAQR/6kCBQG2/5UCBQG//5ACBQHL/5oCBQHf/5oCBQHu/5UCBQIR/5oCBQIW/5UCBQIX/5UCBQIY/5UCBQI5/2wCBQJC/1wCBQJD/4ACBQJE/4ACBQJF/4ACBQJG/6QCBQJH/4ACBQJO/3ECBQJR/4ACBQJU/4ACBQJY/4ACBQJi/3ECBQJk/6kCBQJl/4ACBQJm/4ACBQJs/6kCBQJx/3ECBQJz/6QCBQJ3/4ACBQJ6/4ACBQJ7/6QCBQKF/4ACBQKG/4ACBQKS/6QCBQKU/3ECBQKZ/2wCBQKa/2wCBQKb/2wCBQKc/4ACBQKd/4ACBQKe/4ACBQKf/6QCBQKh/4ACBQKk/4ACBQKl/4ACBQKm/4ACBQKn/4ACBQKw/4ACBQKy/4ACBQPf/xQCBQPg/xQCBQPj/xQCBQPo/4UCBQPx/4UCBQPz/4UCBQP0/4UCBQQI/xQCBQQJ/xQCBQQP/5oCBQQR/5oCBgG2/5UCBgG//5ACBgHL/5oCBgHf/5oCBgHu/5UCBgIR/5oCBgIW/5UCBgIX/5UCBgIY/5UCBgI5/2wCBgJC/1wCBgJD/4ACBgJE/4ACBgJF/4ACBgJG/6QCBgJH/4ACBgJO/3ECBgJR/4ACBgJU/4ACBgJY/4ACBgJi/3ECBgJk/6kCBgJl/4ACBgJm/4ACBgJs/6kCBgJx/3ECBgJz/6QCBgJ3/4ACBgJ6/4ACBgJ7/6QCBgKF/4ACBgKG/4ACBgKS/6QCBgKU/3ECBgKZ/2wCBgKa/2wCBgKb/2wCBgKc/4ACBgKd/4ACBgKe/4ACBgKf/6QCBgKh/4ACBgKk/4ACBgKl/4ACBgKm/4ACBgKn/4ACBgKw/4ACBgKy/4ACBgPf/xQCBgPg/xQCBgPj/xQCBgPo/4UCBgPx/4UCBgPz/4UCBgP0/4UCBgQI/xQCBgQJ/xQCBgQP/5oCBgQR/5oCBwJa/5oCBwKM/5oCBwKN/5oCBwKX/5oCBwKr/5oCCwHS/4UCCwHX/5UCCwHe/4UCCwHn/4UCCwHq/4UCCwHs/4UCCwH9/4UCCwIE/4UCCwII/4UCCwIJ/5UCCwIK/5UCCwIU/5UCCwIo/5UCCwQL/6QCCwQN/6QCDwHX/58CDwIJ/58CDwIK/58CDwIU/58CDwIo/58CDwJa/4ACDwKM/4ACDwKN/4ACDwKX/4ACDwKr/4ACFgHS/4oCFgHT/6QCFgHU/6QCFgHX/4UCFgHe/4oCFgHn/4oCFgHq/4oCFgHs/4oCFgH1/6QCFgH2/6QCFgH9/4oCFgIE/4oCFgIF/6QCFgIG/6QCFgII/4oCFgIJ/4UCFgIK/4UCFgIU/4UCFgIl/6QCFgIm/6QCFgIn/6QCFgIo/4UCFgIu/6QCFgPq/64CFgQL/3YCFgQN/3YCFwHS/4oCFwHT/6QCFwHU/6QCFwHX/4UCFwHe/4oCFwHn/4oCFwHq/4oCFwHs/4oCFwH1/6QCFwH2/6QCFwH9/4oCFwIE/4oCFwIF/6QCFwIG/6QCFwII/4oCFwIJ/4UCFwIK/4UCFwIU/4UCFwIl/6QCFwIm/6QCFwIn/6QCFwIo/4UCFwIu/6QCFwPq/64CFwQL/3YCFwQN/3YCHAHX/58CHAIJ/58CHAIK/58CHAIU/58CHAIo/58CHAJa/4ACHAKM/4ACHAKN/4ACHAKX/4ACHAKr/4ACHQHX/6QCHQIJ/6QCHQIK/6QCHQIU/6QCHQIo/6QCHgHX/6QCHgIJ/6QCHgIK/6QCHgIU/6QCHgIo/6QCJQG2/5UCJQG//5ACJQHL/5oCJQHf/5oCJQHu/5UCJQIR/5oCJQIW/5UCJQIX/5UCJQIY/5UCJQI5/2wCJQJC/1wCJQJD/4ACJQJE/4ACJQJF/4ACJQJG/6QCJQJH/4ACJQJO/3ECJQJR/4ACJQJU/4ACJQJY/4ACJQJa/64CJQJi/3ECJQJk/6kCJQJl/4ACJQJm/4ACJQJs/6kCJQJx/3ECJQJz/6QCJQJ3/4ACJQJ6/4ACJQJ7/6QCJQKF/4ACJQKG/4ACJQKM/64CJQKN/64CJQKS/6QCJQKU/3ECJQKX/64CJQKZ/2wCJQKa/2wCJQKb/2wCJQKc/4ACJQKd/4ACJQKe/4ACJQKf/6QCJQKh/4ACJQKk/4ACJQKl/4ACJQKm/4ACJQKn/4ACJQKr/64CJQKw/4ACJQKy/4ACJQPf/xQCJQPg/xQCJQPj/xQCJQPo/4UCJQPx/4UCJQPz/4UCJQP0/4UCJQQI/xQCJQQJ/xQCJQQP/5oCJQQR/5oCJgG2/5UCJgG//5ACJgHL/5oCJgHf/5oCJgHu/5UCJgIR/5oCJgIW/5UCJgIX/5UCJgIY/5UCJgI5/2wCJgJC/1wCJgJD/4ACJgJE/4ACJgJF/4ACJgJG/6QCJgJH/4ACJgJO/3ECJgJR/4ACJgJU/4ACJgJY/4ACJgJa/64CJgJi/3ECJgJk/6kCJgJl/4ACJgJm/4ACJgJs/6kCJgJx/3ECJgJz/6QCJgJ3/4ACJgJ6/4ACJgJ7/6QCJgKF/4ACJgKG/4ACJgKM/64CJgKN/64CJgKS/6QCJgKU/3ECJgKX/64CJgKZ/2wCJgKa/2wCJgKb/2wCJgKc/4ACJgKd/4ACJgKe/4ACJgKf/6QCJgKh/4ACJgKk/4ACJgKl/4ACJgKm/4ACJgKn/4ACJgKr/64CJgKw/4ACJgKy/4ACJgPf/xQCJgPg/xQCJgPj/xQCJgPo/4UCJgPx/4UCJgPz/4UCJgP0/4UCJgQI/xQCJgQJ/xQCJgQP/5oCJgQR/5oCJwG2/5UCJwG//5ACJwHL/5oCJwHf/5oCJwHu/5UCJwIR/5oCJwIW/5UCJwIX/5UCJwIY/5UCJwI5/2wCJwJC/1wCJwJD/4ACJwJE/4ACJwJF/4ACJwJG/6QCJwJH/4ACJwJO/3ECJwJR/4ACJwJU/4ACJwJY/4ACJwJa/64CJwJi/3ECJwJk/6kCJwJl/4ACJwJm/4ACJwJs/6kCJwJx/3ECJwJz/6QCJwJ3/4ACJwJ6/4ACJwJ7/6QCJwKF/4ACJwKG/4ACJwKM/64CJwKN/64CJwKS/6QCJwKU/3ECJwKX/64CJwKZ/2wCJwKa/2wCJwKb/2wCJwKc/4ACJwKd/4ACJwKe/4ACJwKf/6QCJwKh/4ACJwKk/4ACJwKl/4ACJwKm/4ACJwKn/4ACJwKr/64CJwKw/4ACJwKy/4ACJwPf/xQCJwPg/xQCJwPj/xQCJwPo/4UCJwPx/4UCJwPz/4UCJwP0/4UCJwQI/xQCJwQJ/xQCJwQP/5oCJwQR/5oCKgG2/2ECKgG//4UCKgHL/3YCKgHf/3YCKgHm/64CKgHu/2ECKgIQ/2sCKgIR/3YCKgIW/2ECKgIX/2ECKgIY/2ECKgI5/zMCKgI7/2sCKgI8/2sCKgI9/2sCKgI+/2sCKgI//2sCKgJA/2sCKgJB/2sCKgJC/z0CKgJD/3YCKgJE/3YCKgJF/3YCKgJG/58CKgJH/3YCKgJI/2sCKgJJ/2sCKgJK/2sCKgJL/2sCKgJM/2sCKgJN/2sCKgJO/00CKgJP/2sCKgJQ/2sCKgJR/3YCKgJS/2sCKgJT/2sCKgJU/3YCKgJW/5oCKgJX/5oCKgJY/3YCKgJZ/6kCKgJa/1cCKgJb/2sCKgJc/2sCKgJd/2sCKgJe/2sCKgJf/2sCKgJg/2sCKgJi/00CKgJj/2sCKgJk/5UCKgJl/3YCKgJm/3YCKgJr/2sCKgJs/4ACKgJu/5oCKgJw/2sCKgJx/00CKgJy/2sCKgJz/58CKgJ0/2sCKgJ2/4ACKgJ3/3YCKgJ4/5oCKgJ5/5oCKgJ6/3YCKgJ7/58CKgJ9/2sCKgJ+/2sCKgKB/2sCKgKC/2sCKgKD/2sCKgKE/2sCKgKF/3YCKgKG/3YCKgKI/5oCKgKJ/5oCKgKK/6kCKgKM/1cCKgKN/1cCKgKS/58CKgKT/2sCKgKU/00CKgKV/2sCKgKW/2sCKgKX/1cCKgKY/2sCKgKZ/zMCKgKa/zMCKgKb/zMCKgKc/3YCKgKd/3YCKgKe/3YCKgKf/58CKgKh/3YCKgKi/2sCKgKj/2sCKgKk/3YCKgKl/3YCKgKm/3YCKgKn/3YCKgKo/5oCKgKp/5oCKgKq/5oCKgKr/1cCKgKs/2sCKgKu/6kCKgKv/6kCKgKw/3YCKgKx/5oCKgKy/3YCKgK0/2sCKgPf/ykCKgPg/ykCKgPj/ykCKgPx/2ECKgPz/2ECKgP0/2ECKgQI/ykCKgQJ/ykCKgQP/64CKgQQ/48CKgQR/64CKgQS/48CKwJa/5oCKwKM/5oCKwKN/5oCKwKX/5oCKwKr/5oCLAJa/5oCLAKM/5oCLAKN/5oCLAKX/5oCLAKr/5oCLgG2/5UCLgG//5ACLgHL/5oCLgHf/5oCLgHu/5UCLgIR/5oCLgIW/5UCLgIX/5UCLgIY/5UCLgI5/2wCLgJC/1wCLgJD/4ACLgJE/4ACLgJF/4ACLgJG/6QCLgJH/4ACLgJO/3ECLgJR/4ACLgJU/4ACLgJY/4ACLgJa/64CLgJi/3ECLgJk/6kCLgJl/4ACLgJm/4ACLgJs/6kCLgJx/3ECLgJz/6QCLgJ3/4ACLgJ6/4ACLgJ7/6QCLgKF/4ACLgKG/4ACLgKM/64CLgKN/64CLgKS/6QCLgKU/3ECLgKX/64CLgKZ/2wCLgKa/2wCLgKb/2wCLgKc/4ACLgKd/4ACLgKe/4ACLgKf/6QCLgKh/4ACLgKk/4ACLgKl/4ACLgKm/4ACLgKn/4ACLgKr/64CLgKw/4ACLgKy/4ACLgPf/xQCLgPg/xQCLgPj/xQCLgPo/4UCLgPx/4UCLgPz/4UCLgP0/4UCLgQI/xQCLgQJ/xQCLgQP/5oCLgQR/5oCMAHS/4UCMAHX/5UCMAHe/4UCMAHn/4UCMAHq/4UCMAHs/4UCMAH9/4UCMAIE/4UCMAII/4UCMAIJ/5UCMAIK/5UCMAIU/5UCMAIo/5UCMAQL/6QCMAQN/6QCMQG2/5oCMQG//5oCMQHL/58CMQHf/58CMQHu/5oCMQIR/58CMQIW/5oCMQIX/5oCMQIY/5oCMQJx/64CMQKU/64CMQPf/uYCMQPg/uYCMQPj/uYCMQQI/uYCMQQJ/uYCPAPx/6QCPAPz/6QCPAP0/6QCPQPx/6QCPQPz/6QCPQP0/6QCPgPx/6QCPgPz/6QCPgP0/6QCPwPx/6QCPwPz/6QCPwP0/6QCQAPx/6QCQAPz/6QCQAP0/6QCQQJV/5oCQQJh/5oCQQKA/5oCQQKH/5oCQQKL/5oCVQJC/64CVQPf/5oCVQPg/5oCVQPj/5oCVQQI/5oCVQQJ/5oCVgPf/4oCVgPg/4oCVgPj/4oCVgQI/4oCVgQJ/4oCVwPf/4oCVwPg/4oCVwPj/4oCVwQI/4oCVwQJ/4oCXwJV/5oCXwJh/5oCXwKA/5oCXwKH/5oCXwKL/5oCYQJV/5oCYQJh/5oCYQKA/5oCYQKH/5oCYQKL/5oCYgJV/5oCYgJh/5oCYgKA/5oCYgKH/5oCYgKL/5oCYwJV/5oCYwJh/5oCYwKA/5oCYwKH/5oCYwKL/5oCbgPf/4oCbgPg/4oCbgPj/4oCbgQI/4oCbgQJ/4oCbwJV/5oCbwJh/5oCbwKA/5oCbwKH/5oCbwKL/5oCeAPf/4oCeAPg/4oCeAPj/4oCeAQI/4oCeAQJ/4oCeQPf/4oCeQPg/4oCeQPj/4oCeQQI/4oCeQQJ/4oCegPf/4oCegPg/4oCegPj/4oCegQI/4oCegQJ/4oCggJC/64CggPf/5oCggPg/5oCggPj/5oCggQI/5oCggQJ/5oCgwJV/5oCgwJh/5oCgwKA/5oCgwKH/5oCgwKL/5oChwPf/5oChwPg/5oChwPj/5oChwQI/5oChwQJ/5oCiAPf/4oCiAPg/4oCiAPj/4oCiAQI/4oCiAQJ/4oCiQPf/4oCiQPg/4oCiQPj/4oCiQQI/4oCiQQJ/4oCqAPf/4oCqAPg/4oCqAPj/4oCqAQI/4oCqAQJ/4oCqQPf/4oCqQPg/4oCqQPj/4oCqQQI/4oCqQQJ/4oCqgPf/4oCqgPg/4oCqgPj/4oCqgQI/4oCqgQJ/4oCrQPx/6QCrQPz/6QCrQP0/6QCsQPf/4oCsQPg/4oCsQPj/4oCsQQI/4oCsQQJ/4oCswJV/5oCswJh/5oCswKA/5oCswKH/5oCswKL/5oCzALe/4oCzALf/5UCzALi/64CzALs/4UCzAPq/58CzAQL/z0CzAQN/z0CzgLM/1wCzgLP/3ECzgLW/1wCzgMK/1wCzgMM/64CzgMO/3ECzgMQ/5UCzgMS/5UCzgMT/5UCzgMV/5UCzgMW/64CzgMY/1wCzgMa/2YCzgMb/1wCzgMc/1wCzgMe/2sCzgMf/1wCzgMh/2sCzgMi/3YCzgMm/2sCzgMn/2sCzgMo/2sCzgMp/1wCzgMq/3YCzgMr/1wCzgMs/3ECzgMt/5UCzgMu/5UCzgMw/5UCzgMy/1wCzgM0/1wCzgM1/1wCzgM2/5UCzgM//2YCzgNA/1wCzgNC/1wCzgNE/5UCzgPf/w8CzgPg/w8CzgPj/w8CzgQI/w8CzgQJ/w8CzgQP/5oCzgQR/5oCzwLe/5UCzwLf/5UCzwLs/5UCzwQL/1ICzwQN/1IC1QLg/64C1QQL/64C1QQN/64C1gLe/4oC1gLf/5UC1gLi/64C1gLs/4UC1gPq/58C1gQL/z0C1gQN/z0C3ALM/58C3ALW/58C3APf/twC3APg/twC3APj/twC3AQI/twC3AQJ/twC3gLM/4oC3gLP/1cC3gLW/4oC3gMK/y4C3gMM/5QC3gMO/z0C3gMQ/1wC3gMS/1wC3gMT/1wC3gMV/1wC3gMW/5QC3gMX/4oC3gMY/y4C3gMZ/58C3gMa/ykC3gMb/y4C3gMc/y4C3gMe/y4C3gMf/y4C3gMg/58C3gMh/y4C3gMi/z0C3gMm/y4C3gMn/y4C3gMo/y4C3gMp/y4C3gMq/z0C3gMr/y4C3gMs/z0C3gMt/1wC3gMu/1wC3gMw/1wC3gMy/y4C3gM0/y4C3gM1/y4C3gM2/1wC3gM//ykC3gNA/y4C3gNC/y4C3gNE/1wC3gPf/yQC3gPg/yQC3gPj/yQC3gPx/5oC3gPz/5oC3gP0/5oC3gQI/yQC3gQJ/yQC3gQP/64C3gQQ/58C3gQR/64C3gQS/58C3wLM/5oC3wLP/4UC3wLW/5oC3wMK/4AC3wMO/3EC3wMQ/5oC3wMS/5oC3wMT/5oC3wMV/5oC3wMY/4AC3wMb/4AC3wMc/4AC3wMe/64C3wMf/4AC3wMh/64C3wMi/64C3wMm/64C3wMn/64C3wMo/64C3wMp/4AC3wMq/64C3wMr/4AC3wMs/3EC3wMt/5oC3wMu/5oC3wMw/5oC3wMy/4AC3wM0/4AC3wM1/4AC3wM2/5oC3wNA/4AC3wNC/4AC3wNE/5oC3wPf/woC3wPg/woC3wPj/woC3wPx/5oC3wPz/5oC3wP0/5oC3wQI/woC3wQJ/woC3wQQ/6kC3wQS/6kC4ALh/64C4QLg/64C4QQL/64C4QQN/64C4gLM/64C4gLW/64C4gPf/xQC4gPg/xQC4gPj/xQC4gQI/xQC4gQJ/xQC5ALe/4oC5ALf/5UC5ALi/64C5ALs/4UC5APq/58C5AQL/z0C5AQN/z0C6QLM/5oC6QLP/4UC6QLW/5oC6QMK/4AC6QMO/3EC6QMQ/5oC6QMS/5oC6QMT/5oC6QMV/5oC6QMY/4AC6QMb/4AC6QMc/4AC6QMe/64C6QMf/4AC6QMh/64C6QMi/64C6QMm/64C6QMn/64C6QMo/64C6QMp/4AC6QMq/64C6QMr/4AC6QMs/3EC6QMt/5oC6QMu/5oC6QMw/5oC6QMy/4AC6QM0/4AC6QM1/4AC6QM2/5oC6QNA/4AC6QNC/4AC6QNE/5oC6QPf/woC6QPg/woC6QPj/woC6QPx/5oC6QPz/5oC6QP0/5oC6QQI/woC6QQJ/woC6QQQ/6kC6QQS/6kC7ALM/5oC7ALP/4UC7ALW/5oC7AMK/4AC7AMO/3EC7AMQ/5oC7AMS/5oC7AMT/5oC7AMV/5oC7AMY/4AC7AMb/4AC7AMc/4AC7AMe/64C7AMf/4AC7AMh/64C7AMi/64C7AMm/64C7AMn/64C7AMo/64C7AMp/4AC7AMq/64C7AMr/4AC7AMs/3EC7AMt/5oC7AMu/5oC7AMw/5oC7AMy/4AC7AM0/4AC7AM1/4AC7AM2/5oC7ANA/4AC7ANC/4AC7ANE/5oC7APf/woC7APg/woC7APj/woC7APx/5oC7APz/5oC7AP0/5oC7AQI/woC7AQJ/woC7AQQ/6kC7AQS/6kDDAPf/4oDDAPg/4oDDAPj/4oDDAQI/4oDDAQJ/4oDDwMkAFcDDwMlAFcDFAQL/6kDFAQN/6kDFgPf/4oDFgPg/4oDFgPj/4oDFgQI/4oDFgQJ/4oDFwMkAFcDFwMlAFcDJAMkAFwDJAMlAFwDJQMkAFwDJQMlAFwD2QQK/6QD2QQM/6QD2QQO/6QD2gQK/6QD2gQM/6QD2gQO/6QD3wAB//4D3wAc/7MD3wAe/7MD3wAf/7MD3wBA/7MD3wBp/7MD3wBy/7MD3wCG/7MD3wCL/+ED3wCN/+ED3wCO/+ED3wCT/1cD3wCU/1cD3wCV/1cD3wCW/1cD3wCX/1cD3wCY/80D3wCc/80D3wCr/z0D3wCs/xQD3wCu/5UD3wCv/5UD3wCw/5UD3wCx/5UD3wCy/5UD3wC0/xQD3wC1/xQD3wC2/xQD3wC3/xQD3wC4/xQD3wC5/xQD3wC6/xQD3wC7/xQD3wC8/xQD3wC9/xQD3wDo/8ID3wDu/8ID3wD0/8ID3wED/8ID3wEL/88D3wEN/2sD3wE6/8ID3wFc/+QD3wFl/6kD3wFm/6kD3wFn/6kD3wFo/6kD3wFp/6kD3wFq/8gD3wF9/2sD3wF//4oD3wGA/2sD3wGB/2sD3wGC/2sD3wGD/2sD3wGF/2sD3wGG/2sD3wGH/2sD3wGI/2sD3wGJ/2sD3wGK/2sD3wGL/2sD3wGM/2sD3wGN/2sD3wGO/2sD3wJV/5oD3wJh/5oD3wKA/5oD3wKH/5oD3wKL/5oD3wPq/woD3wQK/woD3wQL/woD3wQM/woD3wQN/woD3wQO/woD3wQP/48D3wQR/48D3wQT/woD3wQU/woD4AAB//4D4ACL/+ED4ACT/1cD4ACU/1cD4ACV/1cD4ACW/1cD4ACX/1cD4ACr/z0D4ACs/xQD4ACu/5UD4ACv/5UD4ACw/5UD4ACx/5UD4ACy/5UD4AC0/xQD4AC1/xQD4AC2/xQD4AC3/xQD4AC4/xQD4AC5/xQD4AC6/xQD4AC7/xQD4AC8/xQD4AC9/xQD4ADu/8ID4AEN/2sD4AFc/+QD4AFl/6kD4AFm/6kD4AFn/6kD4AFo/6kD4AFp/6kD4AF9/2sD4AF//4oD4AGA/2sD4AGB/2sD4AGC/2sD4AGD/2sD4AGF/2sD4AGG/2sD4AGH/2sD4AGI/2sD4AGJ/2sD4AGK/2sD4AGL/2sD4AGM/2sD4AGN/2sD4AGO/2sD4AJV/5oD4AJh/5oD4AKA/5oD4AKH/5oD4AKL/5oD4APq/woD4AQK/woD4AQL/woD4AQM/woD4AQN/woD4AQO/woD4AQP/48D4AQR/48D4AQT/woD4AQU/woD4wCT/1cD4wCU/1cD4wCV/1cD4wCW/1cD4wCX/1cD4wCr/z0D4wCs/xQD4wCu/5UD4wCv/5UD4wCw/5UD4wCx/5UD4wCy/5UD4wC0/xQD4wC1/xQD4wC2/xQD4wC3/xQD4wC4/xQD4wC5/xQD4wC6/xQD4wC7/xQD4wC8/xQD4wC9/xQD4wEN/2sD4wFl/6kD4wFm/6kD4wFn/6kD4wFo/6kD4wFp/6kD4wF9/2sD4wF//4oD4wGA/2sD4wGB/2sD4wGC/2sD4wGD/2sD4wGF/2sD4wGG/2sD4wGH/2sD4wGI/2sD4wGJ/2sD4wGK/2sD4wGL/2sD4wGM/2sD4wGN/2sD4wGO/2sD4wJV/5oD4wJh/5oD4wKA/5oD4wKH/5oD4wKL/5oD4wPq/woD4wQK/woD4wQL/woD4wQM/woD4wQN/woD4wQO/woD4wQP/48D4wQR/48D4wQT/woD4wQU/woD5wAc/3YD5wAd/3YD5wAe/3YD5wAf/3YD5wAg/3YD5wAh/3YD5wA5/3YD5wA8/3YD5wBA/3YD5wBB/3YD5wBC/3YD5wBD/3YD5wBE/3YD5wBF/3YD5wBp/3YD5wBq/3YD5wBr/3YD5wBs/3YD5wBt/3YD5wBu/3YD5wBv/3YD5wBw/3YD5wBx/3YD5wBy/3YD5wBz/3YD5wB0/3YD5wB1/3YD5wB2/3YD5wB3/3YD5wB4/3YD5wB5/3YD5wB6/3YD5wB7/3YD5wB8/3YD5wB9/3YD5wB+/3YD5wB//3YD5wCA/3YD5wCB/3YD5wCC/3YD5wCD/3YD5wCG/3YD5wCL/64D5wCM/64D5wCN/64D5wCO/64D5wCP/64D5wCQ/64D5wCR/64D5wCT/z0D5wCU/z0D5wCV/z0D5wCW/z0D5wCX/z0D5wCY/4AD5wCZ/4AD5wCa/4AD5wCb/4AD5wCc/4AD5wCd/4AD5wCe/4AD5wCf/4AD5wCg/4AD5wCh/4AD5wCi/4AD5wCj/4AD5wCk/4AD5wCl/4AD5wCm/4AD5wCn/4AD5wCo/4AD5wCp/4AD5wCq/4AD5wCr/ykD5wCs/zMD5wCt/4AD5wCu/1cD5wCv/1cD5wCw/1cD5wCx/1cD5wCy/1cD5wC0/zMD5wC1/zMD5wC2/zMD5wC3/zMD5wC4/zMD5wC5/zMD5wC6/zMD5wC7/zMD5wC8/zMD5wC9/zMD5wEN/48D5wFl/64D5wFm/64D5wFn/64D5wFo/64D5wFp/64D5wF9/48D5wF//48D5wGA/48D5wGB/48D5wGC/48D5wGD/48D5wGF/48D5wGG/48D5wGH/48D5wGI/48D5wGJ/48D5wGK/48D5wGL/48D5wGM/48D5wGN/48D5wGO/48D5wQK/woD5wQM/woD5wQO/woD5wQT/zMD5wQU/zMD5wQs/3YD5wQw/3YD5wQy/3YD6AAY/48D6ACT/2YD6ACU/2YD6ACV/2YD6ACW/2YD6ACX/2YD6ACr/3sD6ACs/3ED6AC0/3ED6AC1/3ED6AC2/3ED6AC3/3ED6AC4/3ED6AC5/3ED6AC6/3ED6AC7/3ED6AC8/3ED6AC9/3ED6gAB/4UD6gAC/4UD6gAD/4UD6gAE/4UD6gAF/4UD6gAG/4UD6gAH/4UD6gAI/4UD6gAJ/4UD6gAK/4UD6gAL/4UD6gAM/4UD6gAN/4UD6gAO/4UD6gAP/4UD6gAQ/4UD6gAR/4UD6gAS/4UD6gAT/4UD6gAU/4UD6gAV/4UD6gAW/4UD6gAX/4UD6gAY/xQD6gAZ/4UD6gBW/4UD6gBX/4UD6gCTABkD6gCrACkD6gCuACkD6gDN/9cD6gDu/+cD6gD0/+cD6gELAC4D6gEM/58D6gEO/58D6gEP/58D6gEQ/58D6gER/58D6gES/58D6gE6/+cD6gFc/8gD6gFlACMD6gFq/9wD6gF9AC4D6gF/AC4D6gG2/64D6gHu/64D6gIW/64D6gIX/64D6gIY/64D6gLM/58D6gLW/58D6gLlAIMD6gLmAIMD6gLnAIMD6gLoAGAD6gLpAP4D6gLqAGAD6gPf/woD6gPg/woD6gPj/woD6gQI/woD6gQJ/woD7wAB/6ED7wAC/6ED7wAD/6ED7wAE/6ED7wAF/6ED7wAG/6ED7wAH/6ED7wAI/6ED7wAJ/6ED7wAK/6ED7wAL/6ED7wAM/6ED7wAN/6ED7wAO/6ED7wAP/6ED7wAQ/6ED7wAR/6ED7wAS/6ED7wAT/6ED7wAU/6ED7wAV/6ED7wAW/6ED7wAX/6ED7wAY/ycD7wAZ/6ED7wAc//ED7wBA//ED7wBW/6QD7wBX/6QD7wBp//ED7wCL/8MD7wDN/3kD7wDO/3kD7wDP/3kD7wDQ/3kD7wDR/3kD7wDS/3kD7wDT/3kD7wDU/3kD7wDV/3kD7wDW/3kD7wDX/3kD7wDZ/3kD7wDa/3kD7wDb/3kD7wDc/3kD7wDd/3kD7wDe/3kD7wDf/3kD7wDg/3kD7wDh/3kD7wDi/3kD7wDj/3kD7wDk/3kD7wDl/3kD7wDo/4UD7wDp/4UD7wDq/4UD7wDr/4UD7wDs/4UD7wDt/4UD7wDu/4UD7wDv/4UD7wDw/4UD7wDx/4UD7wDy/4UD7wDz/4UD7wD0/4UD7wD1/4UD7wD2/4UD7wD3/4UD7wD4/4UD7wD5/4UD7wD6/4UD7wD8/4UD7wD9/4UD7wD+/4UD7wD//4UD7wEA/4UD7wEB/4UD7wEC/4UD7wED/4UD7wEE/4UD7wEF/4UD7wEH/4UD7wEI/4UD7wEJ/4UD7wEL/+cD7wEM/4MD7wEO/4MD7wEP/4MD7wEQ/4MD7wER/4MD7wES/4MD7wEx/+wD7wEy/+wD7wE6/4UD7wE7/4UD7wE8/4UD7wE9/4UD7wE+/4UD7wE//4UD7wFB/4UD7wFC/4UD7wFD/4UD7wFE/4UD7wFF/4UD7wFG/4UD7wFH/4UD7wFI/4UD7wFJ/4UD7wFK/4UD7wFL/4UD7wFM/4UD7wFN/4UD7wFO/4UD7wFP/4UD7wFQ/4UD7wFR/4UD7wFS/4UD7wFT/4UD7wFU/4UD7wFV/+wD7wFX/4UD7wFY/+wD7wFc/6kD7wFd/6kD7wFe/6kD7wFf/6kD7wFg/6kD7wFh/6kD7wFi/6kD7wFj/64D7wFl/9wD7wFq/6kD7wFr/6kD7wFs/6kD7wFt/6kD7wFu/6kD7wFv/6kD7wFw/6kD7wFx/6kD7wFy/6kD7wFz/6kD7wF0/6kD7wF1/6kD7wF2/6kD7wF3/6kD7wF4/6kD7wF5/6kD7wF6/6kD7wF7/6kD7wF8/6kD7wF9/+wD7wF+/6kD7wF//+wD7wGE/9UD7wGF/+wD8ACT/64D8ACU/64D8ACV/64D8ACW/64D8ACX/64D8ACr//gD8QCLAAUD8QCNAAUD8QCT/48D8QCU/48D8QCV/48D8QCW/48D8QCX/48D8QCr/5oD8QCs/5oD8QCu/+UD8QCz/9cD8QC0/5oD8QC1/5oD8QC2/5oD8QC3/5oD8QC4/5oD8QC5/5oD8QC6/5oD8QC7/5oD8QC8/5oD8QC9/5oD8QC+ABQD8QDAABQD8QLe/5oD8QLf/5oD8QLs/5oD8QNQ/2YD8QNW/7MD8wCT/48D8wCU/48D8wCV/48D8wCW/48D8wCX/48D8wCr/5oD8wCs/5oD8wC0/5oD8wC1/5oD8wC2/5oD8wC3/5oD8wC4/5oD8wC5/5oD8wC6/5oD8wC7/5oD8wC8/5oD8wC9/5oD8wLe/5oD8wLf/5oD8wLs/5oD8wNQ/2YD9ACT/48D9ACU/48D9ACV/48D9ACW/48D9ACX/48D9ACr/5oD9ACs/5oD9AC0/5oD9AC1/5oD9AC2/5oD9AC3/5oD9AC4/5oD9AC5/5oD9AC6/5oD9AC7/5oD9AC8/5oD9AC9/5oD9ALe/5oD9ALf/5oD9ALs/5oD9ANQ/2YD/ADN//sD/ADO//sD/ADd//sD/AEMABQD/AERABQD/AElAFID/ALlAFUD/ALmAFUD/ALnAFUD/ALpAMAD/gDN//sD/gElAFID/gLlAFUD/gLmAFUD/gLnAFUD/gLpAMAEAAEMABQEAAElAFIEAALlAFUEAALmAFUEAALnAFUEAALpAMAECACT/1cECACU/1cECACV/1cECACW/1cECACX/1cECACr/z0ECACs/xQECACu/5UECACv/5UECACw/5UECACx/5UECACy/5UECAC0/xQECAC1/xQECAC2/xQECAC3/xQECAC4/xQECAC5/xQECAC6/xQECAC7/xQECAC8/xQECAC9/xQECAEN/2sECAFl/6kECAFm/6kECAFn/6kECAFo/6kECAFp/6kECAF9/2sECAF//4oECAGA/2sECAGB/2sECAGC/2sECAGD/2sECAGF/2sECAGG/2sECAGH/2sECAGI/2sECAGJ/2sECAGK/2sECAGL/2sECAGM/2sECAGN/2sECAGO/2sECAJV/5oECAJh/5oECAKA/5oECAKH/5oECAKL/5oECAPq/woECAQK/woECAQL/woECAQM/woECAQN/woECAQO/woECAQP/48ECAQR/48ECAQT/woECAQU/woECQAB//4ECQAc/7MECQAe/7MECQBA/7MECQBp/7MECQBy/7MECQCL/+EECQCM/+EECQCN/+EECQCT/1cECQCU/1cECQCV/1cECQCW/1cECQCX/1cECQCY/80ECQCr/z0ECQCs/xQECQCu/5UECQCv/5UECQCw/5UECQCx/5UECQCy/5UECQC0/xQECQC1/xQECQC2/xQECQC3/xQECQC4/xQECQC5/xQECQC6/xQECQC7/xQECQC8/xQECQC9/xQECQDo/8IECQDq/8IECQDu/8IECQD0/8IECQD1/8IECQEL/88ECQEN/2sECQE6/8IECQFc/+QECQFe/+QECQFl/6kECQFm/6kECQFn/6kECQFo/6kECQFp/6kECQFq/8gECQF9/2sECQF//4oECQGA/2sECQGB/2sECQGC/2sECQGD/2sECQGF/2sECQGG/2sECQGH/2sECQGI/2sECQGJ/2sECQGK/2sECQGL/2sECQGM/2sECQGN/2sECQGO/2sECQJV/5oECQJh/5oECQKA/5oECQKH/5oECQKL/5oECQPq/woECQQK/woECQQL/woECQQM/woECQQN/woECQQO/woECQQP/48ECQQR/48ECQQT/woECQQU/woECgAB/4AECgAC/4AECgAD/4AECgAE/4AECgAF/4AECgAG/4AECgAH/4AECgAI/4AECgAJ/4AECgAK/4AECgAL/4AECgAM/4AECgAN/4AECgAO/4AECgAP/4AECgAQ/4AECgAR/4AECgAS/4AECgAT/4AECgAU/4AECgAV/4AECgAW/4AECgAX/4AECgAY/woECgAZ/4AECgBA/9IECgBW/6QECgBX/6QECgBp/9IECgCG/9IECgCTAAoECgCrAAoECgDN/9UECgDo/80ECgDq/80ECgDu/80ECgD0/80ECgEM/64ECgEO/64ECgEP/64ECgEQ/64ECgER/64ECgES/64ECgE6/80ECgFc/9wECgFe/9wECgG2/2YECgG//2YECgHL/3YECgHf/3YECgHu/2YECgIR/3YECgIW/2YECgIX/2YECgIY/2YECgJC/58ECgLM/z0ECgLP/2EECgLW/z0ECgPf/woECgPg/woECgPj/woECgPk/6MECgPl/6MECgPn/1wECgQI/woECgQJ/woECgQK/yUECgQM/yUECgQO/yUECwAB/2YECwAC/2YECwAD/2YECwAE/2YECwAF/2YECwAG/2YECwAH/2YECwAI/2YECwAJ/2YECwAK/2YECwAL/2YECwAM/2YECwAN/2YECwAO/2YECwAP/2YECwAQ/2YECwAR/2YECwAS/2YECwAT/2YECwAU/2YECwAV/2YECwAW/2YECwAX/2YECwAY/wAECwAZ/2YECwAc/7MECwBA/7MECwBW/4sECwBX/4sECwBp/7MECwCTAAUECwCrACQECwDN/4AECwDO/4AECwDP/4AECwDQ/4AECwDR/4AECwDS/4AECwDT/4AECwDU/4AECwDV/4AECwDW/4AECwDX/4AECwDZ/4AECwDa/4AECwDb/4AECwDc/4AECwDd/4AECwDe/4AECwDf/4AECwDg/4AECwDh/4AECwDi/4AECwDj/4AECwDk/4AECwDl/4AECwDo/4AECwDp/4AECwDq/4AECwDr/4AECwDs/4AECwDt/4AECwDu/4AECwDv/4AECwDw/4AECwDx/4AECwDy/4AECwDz/4AECwD0/4AECwD1/4AECwD2/4AECwD3/4AECwD4/4AECwD5/4AECwD6/4AECwD8/4AECwD9/4AECwD+/4AECwD//4AECwEA/4AECwEB/4AECwEC/4AECwED/4AECwEE/4AECwEF/4AECwEH/4AECwEI/4AECwEJ/4AECwEM/4oECwEO/4oECwEP/4oECwEQ/4oECwER/4oECwES/4oECwE6/4AECwE7/4AECwE8/4AECwE9/4AECwE+/4AECwE//4AECwFB/4AECwFC/4AECwFD/4AECwFE/4AECwFF/4AECwFG/4AECwFH/4AECwFI/4AECwFJ/4AECwFK/4AECwFL/4AECwFM/4AECwFN/4AECwFO/4AECwFP/4AECwFQ/4AECwFR/4AECwFS/4AECwFT/4AECwFU/4AECwFX/4AECwFc/3UECwFd/3UECwFe/3UECwFf/3UECwFg/3UECwFh/3UECwFi/3UECwFq/5EECwFr/5EECwFs/5EECwFt/5EECwFu/5EECwFv/5EECwFw/5EECwFx/5EECwFy/5EECwFz/5EECwF0/5EECwF1/5EECwF2/5EECwF3/5EECwF4/5EECwF5/5EECwF6/5EECwF7/5EECwF8/5EECwF+/5EECwPZ/6QECwPa/6QECwPf/wAECwPg/wAECwPj/wAECwQI/wAECwQJ/wAEDAAB/4AEDAAC/4AEDAAD/4AEDAAE/4AEDAAF/4AEDAAG/4AEDAAH/4AEDAAI/4AEDAAJ/4AEDAAK/4AEDAAL/4AEDAAM/4AEDAAN/4AEDAAO/4AEDAAP/4AEDAAQ/4AEDAAR/4AEDAAS/4AEDAAT/4AEDAAU/4AEDAAV/4AEDAAW/4AEDAAX/4AEDAAY/woEDAAZ/4AEDABW/6QEDABX/6QEDADN/9UEDAEM/64EDAEO/64EDAEP/64EDAEQ/64EDAER/64EDAES/64EDAG2/2YEDAG//2YEDAHL/3YEDAHf/3YEDAHu/2YEDAIR/3YEDAIW/2YEDAIX/2YEDAIY/2YEDAJC/58EDALM/z0EDALP/2EEDALW/z0EDAPf/woEDAPg/woEDAPj/woEDAPk/6MEDAPl/6MEDAPn/1wEDAQI/woEDAQJ/woEDAQK/yUEDAQM/yUEDAQO/yUEDQAB/2YEDQAC/2YEDQAD/2YEDQAE/2YEDQAF/2YEDQAG/2YEDQAH/2YEDQAI/2YEDQAJ/2YEDQAK/2YEDQAL/2YEDQAM/2YEDQAN/2YEDQAO/2YEDQAP/2YEDQAQ/2YEDQAR/2YEDQAS/2YEDQAT/2YEDQAU/2YEDQAV/2YEDQAW/2YEDQAX/2YEDQAY/wAEDQAZ/2YEDQBW/4sEDQBX/4sEDQBp/7MEDQCD/7MEDQCTAAUEDQDN/4AEDQDO/4AEDQDP/4AEDQDQ/4AEDQDR/4AEDQDS/4AEDQDT/4AEDQDU/4AEDQDV/4AEDQDW/4AEDQDX/4AEDQDZ/4AEDQDa/4AEDQDb/4AEDQDc/4AEDQDd/4AEDQDe/4AEDQDf/4AEDQDg/4AEDQDh/4AEDQDi/4AEDQDj/4AEDQDk/4AEDQDl/4AEDQDo/4AEDQDp/4AEDQDq/4AEDQDr/4AEDQDs/4AEDQDt/4AEDQDu/4AEDQDv/4AEDQDw/4AEDQDx/4AEDQDy/4AEDQDz/4AEDQD0/4AEDQD1/4AEDQD2/4AEDQD3/4AEDQD4/4AEDQD5/4AEDQD6/4AEDQD8/4AEDQD9/4AEDQD+/4AEDQD//4AEDQEA/4AEDQEB/4AEDQEC/4AEDQED/4AEDQEE/4AEDQEF/4AEDQEH/4AEDQEI/4AEDQEJ/4AEDQEM/4oEDQEO/4oEDQEP/4oEDQEQ/4oEDQER/4oEDQES/4oEDQEx/8MEDQEy/8MEDQE6/4AEDQE7/4AEDQE8/4AEDQE9/4AEDQE+/4AEDQE//4AEDQFB/4AEDQFC/4AEDQFD/4AEDQFE/4AEDQFF/4AEDQFG/4AEDQFH/4AEDQFI/4AEDQFJ/4AEDQFK/4AEDQFL/4AEDQFM/4AEDQFN/4AEDQFO/4AEDQFP/4AEDQFQ/4AEDQFR/4AEDQFS/4AEDQFT/4AEDQFU/4AEDQFX/4AEDQFc/3UEDQFd/3UEDQFe/3UEDQFf/3UEDQFg/3UEDQFh/3UEDQFi/3UEDQFl//QEDQFq/5EEDQFr/5EEDQFs/5EEDQFt/5EEDQFu/5EEDQFv/5EEDQFw/5EEDQFx/5EEDQFy/5EEDQFz/5EEDQF0/5EEDQF1/5EEDQF2/5EEDQF3/5EEDQF4/5EEDQF5/5EEDQF6/5EEDQF7/5EEDQF8/5EEDQF+/5EEDQPZ/6QEDQPa/6QEDQPf/wAEDQPg/wAEDQPj/wAEDQQI/wAEDQQJ/wAEDgAB/4AEDgAC/4AEDgAD/4AEDgAE/4AEDgAF/4AEDgAG/4AEDgAH/4AEDgAI/4AEDgAJ/4AEDgAK/4AEDgAL/4AEDgAM/4AEDgAN/4AEDgAO/4AEDgAP/4AEDgAQ/4AEDgAR/4AEDgAS/4AEDgAT/4AEDgAU/4AEDgAV/4AEDgAW/4AEDgAX/4AEDgAY/woEDgAZ/4AEDgBW/6QEDgBX/6QEDgEM/64EDgEO/64EDgEP/64EDgEQ/64EDgER/64EDgES/64EDgG2/2YEDgG//2YEDgHL/3YEDgHf/3YEDgHu/2YEDgIR/3YEDgIW/2YEDgIX/2YEDgIY/2YEDgJC/58EDgLM/z0EDgLP/2EEDgLW/z0EDgPf/woEDgPg/woEDgPj/woEDgPk/6MEDgPl/6MEDgPn/1wEDgQI/woEDgQJ/woEDgQK/yUEDgQM/yUEDgQO/yUEDwCT/7gEDwCr/8gEDwCs/64EDwCu//YEDwC0/64EDwC1/64EDwC2/64EDwC3/64EDwC4/64EDwC5/64EDwC6/64EDwC7/64EDwC8/64EDwC9/64EDwLe/58EDwLf/6kEDwLpAGEEDwLs/6kEEACT/4UEEACU/4UEEACV/4UEEACW/4UEEACX/4UEEACr/7gEEACs/4UEEACu/9cEEAC0/4UEEAC1/4UEEAC2/4UEEAC3/4UEEAC4/4UEEAC5/4UEEAC6/4UEEAC7/4UEEAC8/4UEEAC9/4UEEAGP/9wEEAHT/5oEEAHU/5oEEAH1/5oEEAH2/5oEEAIF/5oEEAIG/5oEEAIl/5oEEAIm/5oEEAIn/5oEEAIu/5oEEAPf/64EEAPg/64EEAPj/64EEAPm/4UEEAQI/64EEAQJ/64EEAQL/3AEEAQN/3AEEQCs/64EEQC0/64EEQC1/64EEQC2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OSBBbmRyjiBGdWNocy4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAiU29mdHdhcmUiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6IFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLkFwdG9zUmVndWxhclZlcnNpb24gMi4wMTsyNDA1MTMyMTA2Mzg7TzM2NUFwdG9zIGlzIGEgdHJhZGVtYXJrIG9mIHRoZSBNaWNyb3NvZnQgZ3JvdXAgb2YgY29tcGFuaWVzLk1pY3Jvc29mdCBzdXBwbGllZCBmb250LiBZb3UgbWF5IHVzZSB0aGlzIGZvbnQgdG8gY3JlYXRlLCBkaXNwbGF5LCBhbmQgcHJpbnQgY29udGVudCBhcyBwZXJtaXR0ZWQgYnkgdGhlIGxpY2Vuc2UgdGVybXMgb3IgdGVybXMgb2YgdXNlLCBvZiB0aGUgTWljcm9zb2Z0IHByb2R1Y3QsIHNlcnZpY2UsIG9yIGNvbnRlbnQgaW4gd2hpY2ggdGhpcyBmb250IHdhcyBpbmNsdWRlZC4gWW91IG1heSBvbmx5IChpKSBlbWJlZCB0aGlzIGZvbnQgaW4gY29udGVudCBhcyBwZXJtaXR0ZWQgYnkgdGhlIGVtYmVkZGluZyByZXN0cmljdGlvbnMgaW5jbHVkZWQgaW4gdGhpcyBmb250OyBhbmQgKGlpKSB0ZW1wb3JhcmlseSBkb3dubG9hZCB0aGlzIGZvbnQgdG8gYSBwcmludGVyIG9yIG90aGVyIG91dHB1dCBkZXZpY2UgdG8gaGVscCBwcmludCBjb250ZW50LiBBbnkgb3RoZXIgdXNlIGlzIHByb2hpYml0ZWQuaHR0cHM6Ly9kb2NzLm1pY3Jvc29mdC5jb20vdHlwb2dyYXBoeS9hYm91dFdlaWdodFdpZHRoT3B0aWNhbCBTaXplSXRhbGljAKkAIAAyADAAMgA0ACAATQBpAGMAcgBvAHMAbwBmAHQAIABDAG8AcgBwAG8AcgBhAHQAaQBvAG4ALgAgAEEAbABsACAAUgBpAGcAaAB0AHMAIABSAGUAcwBlAHIAdgBlAGQALgAgAFQAaABlACAAIgBrAGUAcgBuACIAIAB0AGEAYgBsAGUAIABvAGYAIAB0AGgAaQBzACAAZgBvAG4AdAAgAHcAYQBzACAAZABlAHYAZQBsAG8AcABlAGQAIABpAG4AIABwAGEAcgB0ACAAdQBzAGkAbgBnACAAYQAgAHMAdAB1AGQAeQAgAGIAeQAgAEEAbgBkAHIA6QAgAEYAdQBjAGgAcwAgAG8AbgAgAHQAaABlACAAcgBlAGwAZQB2AGEAbgBjAGUAIABvAGYAIABrAGUAcgBuAGkAbgBnACAAcABhAGkAcgBzACAAKABoAHQAdABwAHMAOgAvAC8AZwBpAHQAaAB1AGIALgBjAG8AbQAvAGEAbgBkAHIAZQAtAGYAdQBjAGgAcwAvAGsAZQByAG4AaQBuAGcALQBwAGEAaQByAHMALwBiAGwAbwBiAC8AbQBhAHMAdABlAHIALwBMAEkAQwBFAE4AUwBFAC4AbQBkACkALgAgAEMAbwBwAHkAcgBpAGcAaAB0ACAAMgAwADEAOQAgAEEAbgBkAHIA6QAgAEYAdQBjAGgAcwAuACAAUABlAHIAbQBpAHMAcwBpAG8AbgAgAGkAcwAgAGgAZQByAGUAYgB5ACAAZwByAGEAbgB0AGUAZAAsACAAZgByAGUAZQAgAG8AZgAgAGMAaABhAHIAZwBlACwAIAB0AG8AIABhAG4AeQAgAHAAZQByAHMAbwBuACAAbwBiAHQAYQBpAG4AaQBuAGcAIABhACAAYwBvAHAAeQAgAG8AZgAgAHQAaABpAHMAIABzAG8AZgB0AHcAYQByAGUAIABhAG4AZAAgAGEAcwBzAG8AYwBpAGEAdABlAGQAIABkAG8AYwB1AG0AZQBuAHQAYQB0AGkAbwBuACAAZgBpAGwAZQBzACAAKAB0AGgAZQAgACIAUwBvAGYAdAB3AGEAcgBlACIAKQAsACAAdABvACAAZABlAGEAbAAgAGkAbgAgAHQAaABlACAAUwBvAGYAdAB3AGEAcgBlACAAdwBpAHQAaABvAHUAdAAgAHIAZQBzAHQAcgBpAGMAdABpAG8AbgAsACAAaQBuAGMAbAB1AGQAaQBuAGcAIAB3AGkAdABoAG8AdQB0ACAAbABpAG0AaQB0AGEAdABpAG8AbgAgAHQAaABlACAAcgBpAGcAaAB0AHMAIAB0AG8AIAB1AHMAZQAsACAAYwBvAHAAeQAsACAAbQBvAGQAaQBmAHkALAAgAG0AZQByAGcAZQAsACAAcAB1AGIAbABpAHMAaAAsACAAZABpAHMAdAByAGkAYgB1AHQAZQAsACAAcwB1AGIAbABpAGMAZQBuAHMAZQAsACAAYQBuAGQALwBvAHIAIABzAGUAbABsACAAYwBvAHAAaQBlAHMAIABvAGYAIAB0AGgAZQAgAFMAbwBmAHQAdwBhAHIAZQAsACAAYQBuAGQAIAB0AG8AIABwAGUAcgBtAGkAdAAgAHAAZQByAHMAbwBuAHMAIAB0AG8AIAB3AGgAbwBtACAAdABoAGUAIABTAG8AZgB0AHcAYQByAGUAIABpAHMAIABmAHUAcgBuAGkAcwBoAGUAZAAgAHQAbwAgAGQAbwAgAHMAbwAsACAAcwB1AGIAagBlAGMAdAAgAHQAbwAgAHQAaABlACAAZgBvAGwAbABvAHcAaQBuAGcAIABjAG8AbgBkAGkAdABpAG8AbgBzADoAIABUAGgAZQAgAGEAYgBvAHYAZQAgAGMAbwBwAHkAcgBpAGcAaAB0ACAAbgBvAHQAaQBjAGUAIABhAG4AZAAgAHQAaABpAHMAIABwAGUAcgBtAGkAcwBzAGkAbwBuACAAbgBvAHQAaQBjAGUAIABzAGgAYQBsAGwAIABiAGUAIABpAG4AYwBsAHUAZABlAGQAIABpAG4AIABhAGwAbAAgAGMAbwBwAGkAZQBzACAAbwByACAAcwB1AGIAcwB0AGEAbgB0AGkAYQBsACAAcABvAHIAdABpAG8AbgBzACAAbwBmACAAdABoAGUAIABTAG8AZgB0AHcAYQByAGUALgBBAHAAdABvAHMAUgBlAGcAdQBsAGEAcgBWAGUAcgBzAGkAbwBuACAAMgAuADAAMQA7ADIANAAwADUAMQAzADIAMQAwADYAMwA4ADsATwAzADYANQBBAHAAdABvAHMAIABpAHMAIABhACAAdAByAGEAZABlAG0AYQByAGsAIABvAGYAIAB0AGgAZQAgAE0AaQBjAHIAbwBzAG8AZgB0ACAAZwByAG8AdQBwACAAbwBmACAAYwBvAG0AcABhAG4AaQBlAHMALgBNAGkAYwByAG8AcwBvAGYAdABTAHQAZQB2AGUAIABNAGEAdAB0AGUAcwBvAG4AaAB0AHQAcAA6AC8ALwB3AHcAdwAuAG0AaQBjAHIAbwBzAG8AZgB0AC4AYwBvAG0ALwB0AHkAcABvAGcAcgBhAHAAaAB5AC8AZgBvAG4AdABzAC8AbQBhAHQAdABlAHMAbwBuAHQAeQBwAG8AZwByAGEAcABoAGkAYwBzAC4AYwBvAG0ATQBpAGMAcgBvAHMAbwBmAHQAIABzAHUAcABwAGwAaQBlAGQAIABmAG8AbgB0AC4AIABZAG8AdQAgAG0AYQB5ACAAdQBzAGUAIAB0AGgAaQBzACAAZgBvAG4AdAAgAHQAbwAgAGMAcgBlAGEAdABlACwAIABkAGkAcwBwAGwAYQB5ACwAIABhAG4AZAAgAHAAcgBpAG4AdAAgAGMAbwBuAHQAZQBuAHQAIABhAHMAIABwAGUAcgBtAGkAdAB0AGUAZAAgAGIAeQAgAHQAaABlACAAbABpAGMAZQBuAHMAZQAgAHQAZQByAG0AcwAgAG8AcgAgAHQAZQByAG0AcwAgAG8AZgAgAHUAcwBlACwAIABvAGYAIAB0AGgAZQAgAE0AaQBjAHIAbwBzAG8AZgB0ACAAcAByAG8AZAB1AGMAdAAsACAAcwBlAHIAdgBpAGMAZQAsACAAbwByACAAYwBvAG4AdABlAG4AdAAgAGkAbgAgAHcAaABpAGMAaAAgAHQAaABpAHMAIABmAG8AbgB0ACAAdwBhAHMAIABpAG4AYwBsAHUAZABlAGQALgAgAFkAbwB1ACAAbQBhAHkAIABvAG4AbAB5ACAAKABpACkAIABlAG0AYgBlAGQAIAB0AGgAaQBzACAAZgBvAG4AdAAgAGkAbgAgAGMAbwBuAHQAZQBuAHQAIABhAHMAIABwAGUAcgBtAGkAdAB0AGUAZAAgAGIAeQAgAHQAaABlACAAZQBtAGIAZQBkAGQAaQBuAGcAIAByAGUAcwB0AHIAaQBjAHQAaQBvAG4AcwAgAGkAbgBjAGwAdQBkAGUAZAAgAGkAbgAgAHQAaABpAHMAIABmAG8AbgB0ADsAIABhAG4AZAAgACgAaQBpACkAIAB0AGUAbQBwAG8AcgBhAHIAaQBsAHkAIABkAG8AdwBuAGwAbwBhAGQAIAB0AGgAaQBzACAAZgBvAG4AdAAgAHQAbwAgAGEAIABwAHIAaQBuAHQAZQByACAAbwByACAAbwB0AGgAZQByACAAbwB1AHQAcAB1AHQAIABkAGUAdgBpAGMAZQAgAHQAbwAgAGgAZQBsAHAAIABwAHIAaQBuAHQAIABjAG8AbgB0AGUAbgB0AC4AIABBAG4AeQAgAG8AdABoAGUAcgAgAHUAcwBlACAAaQBzACAAcAByAG8AaABpAGIAaQB0AGUAZAAuAGgAdAB0AHAAcwA6AC8ALwBkAG8AYwBzAC4AbQBpAGMAcgBvAHMAbwBmAHQALgBjAG8AbQAvAHQAeQBwAG8AZwByAGEAcABoAHkALwBhAGIAbwB1AHQAVwBlAGkAZwBoAHQAVwBpAGQAdABoAE8AcAB0AGkAYwBhAGwAIABTAGkAegBlAEkAdABhAGwAaQBjAAAAAAMAAAAAAAD/nAAyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQACAAcACv//AA8AAQACAA4AAAAAAAACUgACAGAAAQAaAAEAHAAmAAEAKAA4AAEAOgA7AAEAPgA+AAEAQABZAAEAWwB+AAEAgACRAAEAkwCrAAEArgC5AAEAuwDuAAEA8ADyAAEA9AEFAAEBBwEJAAEBCwEMAAEBDgEpAAEBKwFPAAEBUQFjAAEBZQF9AAEBfwGKAAEBjAGuAAEBrwGyAAIBtgG2AAEBuAG6AAEBvQG9AAEBwAHKAAEBzAHOAAEB0AHU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AAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sAAAAA//EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+wAAAAAAAAAAAAD/4gAAAAAAAP/n//YAAAAAAAAAAAAAAAAAAP/nAAAAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKQAAAAAAAAAA/9cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/hAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/sAAAAAP/sAAAAAAAA/9cAAAAAAAAAAP/7/+wAAAAAAAAAAAAAAAD/+wAAAAAAAP/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApAAAAAAAAAAAAAAAAAAAAAAAFAAD/7AAAAAD/qQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/1wAAAAAAAP/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAAAAAAAAAD/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/XAAAAAAAAAAD/8QAAAAAAAAAAAAAAAAAA//sAAAAAAAAAAAAA/9cAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sAAP/xAAD/1wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/XAAJLcAAEAABMoE/+ACUAKwAAAAAAAAAA/+wAAAAAAAAAAAAA/9cAAAAA//EAAAAA/9wAAAAAAAAAAP/XAAAAAAAAAAAAAAAAAAD/4QAAAAAAAAAAAAAAAP/hAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/i/9IAAAAA/9cAAP/x/7MAAP/X/+wAAP/SAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAP/cAAAAAP+z/9wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/cAAAABQAAAAAAAAAAAAAAAAAAAAAAAP+a/8gABQAA/8j/3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/64AAAAAAAAAAAAAAAAAAAAA/9cAAAAAAAAAAAAAAAAAAAAAAAAAAP/XAAAAAAAAAAAAAP/cAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAA//sAAAAAAAAAAAAAAAAAAAAAAAD/1wAAAAAAAAAAACkAAP9mAAAAAP/IAAAAAP/DAAoAAAAAAAAAAAAA/3YAAAAAAAAAAAAAAAAAAP9mAAAAAAAA/74AAP+fAAD/7AAAAAAAAAAAAAAAAP/sAAD/7AAAAAAAAAAAAAAAAAAAAAD/7AAAAAD/3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/XAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/mgAAAAD/wwAA/ub/rgAA//EAAAAAAAAAAP+fAAAAAAAA/+wAAAAAAAD/mgAAAAD/1/+uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+wAAP/7AAAAAAAAAAAAAAAA/9cAAAAA/+wAAAAAAAAAAP/sAAAAAAAAAAAAAAAAAAD/1wAAAAAAAAAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//EAAAAAAAAAAP/XAAAAAAAAAAAAAP/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9f/wwAAAAD/1wAAAAD/swAAAAAAAAAA/9IAAAAAAAAAAP/IAAAAAAAAAAAAAAAAAAD/uAAAAAAAAP/XAAD/wwAA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AFkAQwBbAH4AUgCAAJEAdgCTAKsAiACuALkAoQC7AO4ArQDwAPIA4QD0AQQA5AEHAQkA9QELAQwA+AEOAR8A+gEhASkBDAErAU8BFQFRAWMBOgFlAX0BTQF/AYoBZgGMAa4BcgG2AbYBlQG4AboBlgG9Ab0BmQHAAcIBmgHEAcQBnQHJAcoBngHMAc4BoAHQAdIBowHWAdYBpgHhAeEBpwHkAeYBqAHyAfIBqwH0AfYBrAH5Af8BrwIDAgcBtgILAgsBuwIOAg4BvAISAhMBvQIVAhkBvwIdAh0BxAIhAiMBxQIqAioByAIsAi4ByQI1AjkBzAJDAkUB0QJHAkcB1AJMAk0B1QJRAlEB1wJTAlQB2AJWAlcB2gJZAlkB3AJgAmAB3QJkAmoB3gJtAm0B5QJwAnAB5gJ3AncB5wJ8AoAB6AKGAoYB7QKOApEB7gKZAp4B8gKgAqAB+AKkAqoB+QKsAqwCAAKvArECAQK0ArQCBAK3ArcCBQK6Ar0CBgK/AsACCgLGAs4CDALQAtUCFQLXAtgCGwLaAtoCHQLcAtwCHgLeAt8CHwLhAuECIQLkAukCIgLrAuwCKALwAvACKgLyAvICKwL2AvwCLAL+Av4CMwMCAwICNAMHAwkCNQMQAxACOAMWAxYCOQMYAxgCOgMiAyICOwMpAyoCPAMtAy0CPgNAA0ECPwNDA0MCQQQ+BD4CQgRFBEUCQwSfBJ8CRATnBOgCRQT4BPsCRwACAGMAAQAaAAAAHAAmABoAKAA4ACUAOgA7ADYAPgA+ADgAQABJADkASwBZAEMAWwB+AFIAgACRAHYAkwCrAIgArgC5AKEAuwDuAK0A8ADyAOEA9AEFAOQBBwEJAPYBCwEMAPkBDgEfAPsBIQEpAQ0BKwFPARYBUQFjATsBZQF9AU4BfwGKAWcBjAGuAXMBtgG2AZYBuAG6AZcBvQG9AZoBwAHKAZsBzAHOAaYB0AHUAakB1gHXAa4B3QHdAbAB4QHhAbEB4wHmAbIB8gHyAbYB9AH2AbcB+AH/AboCAwIHAcICCQIKAccCDgIPAckCEgIdAcsCHwIqAdcCLAIuAeMCNQI5AeYCPAI9AesCQwJNAe0CUQJRAfgCUwJUAfkCVgJXAfsCWQJaAf0CYAJgAf8CZAJqAgACbQJtAgcCcAJwAggCdwJ5AgkCewKAAgwChgKGAhICjgKSAhMCmQKgAhgCogKsAiACrwKxAisCtAK0Ai4CtwK3Ai8CugK9AjACvwLAAjQCxgLOAjYC0ALVAj8C1wLYAkUC2gLaAkcC3ALcAkgC3gLfAkkC4QLhAksC6gLsAkwC7wLwAk8C8gLyAlEC9gL2AlIC+AL8AlMC/gL+AlgDBwMHAlkDCQMJAloDDgMOAlsDEAMQAlwDEgMSAl0DFgMWAl4DGAMYAl8DHgMeAmADIgMiAmEDJAMkAmIDJwMnAmMDKwMrAmQDMAMwAmUDQANBAmYDQwNDAmgEPgQ+AmkERQRFAmoEnwSfAmsEswS1AmwE2wTbAm8E5wToAnAE7gUFAnIBNCjQKNAo0CjQKNAo0CjQKNAo0CjQKNAo0CjQKNAo0CjQKNAo0CjQKNAo0CjQKNAooCigKNYo1ijWKNYo1ijWKNYo1ijWKNYo1ijWKNYo1ijWKNYo1iiCKNYo3CjcKNwo3CjcKNwo3CjcKNwo3CjcKNwo3CjiKOIo4ijiKOIo4ijiKOIo4ijiKOIo4ijiKOIo4ijiKOIo4ijiKOIo4ijiKIgoiCjiKI4o4iiUKJQolCiUKJQolCiUKJQolCiUKJQolCiUKJQolCiUKJQolCiUKQApACkAKQApACkAKQApACkAKQApACiyKLIosiiyKLIosiiyKLIosiiyKLIosiiyKLIosiiyKLIosiiyKLIosiiyKLIouCi4KLgouCi4KLgouCi4KLgouCi4KLgouCi4KLgouCi4KLgovii+KKYoyijKKMooyijKKMoopijKKMoopijKKMooyijuKO4o7ijuKO4o7ijuKO4o7ijuKO4o7ijuKO4o7ijuKO4o7ijuKO4o7ijuKJoomijuKNYo1ijWKNYo1ijWKNYo1ijWKNYo1ijWKNYo1ijWKNYo1ijWKNYpBikGKQYpBikGKQYpBikGKQYpBikGKQYpBikGKQYpBikGKQYpBikGKNAo1ijWKNYo4ijcKNwo4ijcKNAo0CigKNYo4ijiKOIo4ijcKQApACkAKLIouCi4KLgo7ijEKKYoyijuKO4orCisKNwosiiyKLgovii+KO4o7ijuKMQo1ijWKNYoyikGKQYpBijQKNYo4ijcKOIo0CjWKNwo4ijcKOIo4ikAKOgpACjuKO4o9Cj6KQApBikGKQYAAgAbA9kD2gAHA98D4AABA+MD4wABA+QD5QAGA+YD5gAKA+cD5wALA+8D7wANBAgECQABBAoECgAFBAsECwAJBAwEDAAFBA0EDQAJBA4EDgAFBA8EDwACBBAEEAADBBEEEQACBBIEEgADBBMEFAAIBBUEFQACBBYEFgADBBcEFwACBBgEGAADBCwELAAEBDAEMAAEBDEEMQAMBDIEMgAEBDMEMwAOAAIAHAPZA9oACAPfA+AAAgPjA+MAAgPkA+UABwPmA+YADAPnA+cADQPvA+8ADgPwA/AACwPxA/QAAQP4A/sAAQQIBAkAAgQKBAoABgQLBAsACgQMBAwABgQNBA0ACgQOBA4ABgQPBA8AAwQQBBAABAQRBBEAAwQSBBIABAQTBBQACQQVBBUAAwQWBBYABAQXBBcAAwQYBBgABAQsBCwABQQwBDAABQQyBDIABQAxAAEAFAACABQAAwAUAAQAFAAFABQABgAUAAcAFAAIABQACQAUAAoAFAALABQADAAUAA0AFAAOABQADwAUABAAFAARABQAEgAUABMAFAAUABQAFQAUABYAFAAXABQAGQAUAFYABQBXAAUAk/+fAJT/nwCV/58Alv+fAJf/nwCr/64ArP+AAK7/swCv/7MAsP+zALH/swCy/7MAs//sALT/gAC1/4AAtv+AALf/gAC4/4AAuf+AALr/gAC7/4AAvP+AAL3/gAA1ABz/1wAd/9cAHv/XAB//1wAg/9cAIf/XADn/1wA8/9cAQP/XAEH/1wBC/9cAQ//XAET/1wBF/9cAaf/XAGr/1wBr/9cAbP/XAG3/1wBu/9cAb//XAHD/1wBx/9cAcv/XAHP/1wB0/9cAdf/XAHb/1wB3/9cAeP/XAHn/1wB6/9cAe//XAHz/1wB9/9cAfv/XAH//1wCA/9cAgf/XAIL/1wCD/9cAhv/XA/H/3APy/9wD8//cA/T/3AP4/9wD+f/cA/r/3AP7/9wELP/XBDD/1wQy/9cANwAB/+cAAv/nAAP/5wAE/+cABf/nAAb/5wAH/+cACP/nAAn/5wAK/+cAC//nAAz/5wAN/+cADv/nAA//5wAQ/+cAEf/nABL/5wAT/+cAFP/nABX/5wAW/+cAF//nABj/jwAZ/+cAVv/hAFf/4QCT/2YAlP9mAJX/ZgCW/2YAl/9mAKv/ewCs/3EArv/XAK//1wCw/9cAsf/XALL/1wCz/7MAtP9xALX/cQC2/3EAt/9xALj/cQC5/3EAuv9xALv/cQC8/3EAvf9xAL7/wgC//8IAwP/CAMH/wgGE/9kAAgAoAAEAFwAAABoAGwAXAD4APwAZAFgAXAAbAF4AXgAgAGAAYAAhAIQAhQAiAIcAigAkAJMAlwAoAKsArAAtAK4AwgAvAM0A7QBEAPAA8ABlAPQBBQBmAQcBCQB4AQsBGAB7ARoBGwCJAR4BHgCLAScBLACMAS4BLgCSATEBMwCTATUBRgCWAU0BYwCoAWUBZgC/AWgBawDBAW0BjgDFAZMBlQDnAZoBmgDqAZ8BpADrAaYBrgDxAbEBsQD6A98D4AD7A+MD4wD9A+gD6AD+A+oD6gD/A+8D7wEAA/ED9AEBA/gD+wEFBAgECQEJBC0ELQELAksj1CPUI9Qj1CHiI9Qj1CPUI9Qj1CHiI9Qj1CPUI9Qh4iPUI9Qj1CPUI9Qj1CPUIzIjMiO2JAokCiQKIegkCiQKIe4h7iHuIe4h7iPaI9oj2iPaI9oj2iH0I9oj2iPaI9oj2iH0I9oj2iPaI9oh+iPaI+wj+CP4I/gj+CIAI/gj4CPgI+Aj5iPmI+Yj5iPmI+YiBiPmI+Yj5iPmI+YjsCOwI8IiDCMgIyAjICISIyAjICQEJEYkRiRGIhgkRiRGJEYj+CP4I/gj+CP4Ih4j+CP4I/gj+CIeI/gj+CP4I/giHiP4I/gj+CP4I/gj+CP4I/gj+CIkI/4j/iP4IioiKiIqIjAjFCMUIxQiNiMUIjwiQiPII8gjyCJIIk4iZiJmImYiZiJmIlQiZiJmImAiYCJaImAiYCJgImYiZiJmImYiZiMgIz4jPiM+Iz4jPiPOI/Ij8iPyI/IibCPyI/Ij8iPyI7wjvCO8I7wkZCRkJGQkZCRkJGQiciRkJGQkZCRkI1wjXCNcI1wieCNcI1wjXCNcI1wieCNcI1wjXCNcIngjXCNcI1wjXCNcI1wjXCNiI2IkQCRAJDQkNCQ0In4kNCQ0JEAkQCRAIoQjaCNoI2gjaCNoI2giiiNoI2gjaCNoI2giiiNoI2gjaCNoI2gjbiNuJHYikCKQIpAikCKQIpAgniCeIJ4jqiOqI6ojqiOqI6ojqiKWI6ojqiOqI6ojqiQ6JDokOiOeIpwioiKuIq4iriKoIq4iriOkJC4kLiK0JC4iuiQuJC4kLiQiJCIkIiQiJCIiwCQiJCIkIiQiIsAkIiQiJCIkIiLAJCIkIiQiJCIkIiQiJCIkIiQiIsYkQCRAJEAjqiOqI6oizCNEI0QjRCLSI0Qi2CLeIuQi6iLqIuoi8CL2I5gjmCOYI5gjmCL8I5gjmCOYI5gi/COYI5gjmCOYI5gjmCOYI5gkHCOMI4wjjCOMI4wjhiN6I3ojeiN6IwIjeiN6I3ojeiMIIwgjCCMIJGokaiRqJGojDiRqJGokaiRqIw4kaiRqJGojDiRqJGokaiRqJGokaiRwJHAjkiOSI5IjkiOSI5Ij1CO2I+Yj5iPmI9oj2iPaIzgjwiPCJAQj4CP4I/4kCiPII84jFCPmI+YjsCMaI/gjICMgIyYjwiPCI8IjpCPgI+AkCiPII/Ij8iPOIywj5iPgI+AkBCPUI9QjMiPaIzgj+CP4I/gj5iPOI/gjPiPmJGQkZCRkI1wjaCNoI2gjdCOeI54kIiRAJDQjeiN6I4YjgCNEJDQj7COqI6okOiCeIJ4jSiQiI1AjniOeI54jViQ0IJ4j4CPgI+YjXCNcI2IjaCNuI24jdCQiJCIkIiPsI3ojeiN6I4AjhiRAI4wkQCOSI5gjmCOYI54kLiOkI6okaiRqJGokcCOwI9QjtiPmI9ojvCPgI/gj5iPCJAQkRiP4I/4jyCPyI84j1CPaI+Aj5iP4I/Ij5iPyI/gj7CPyI/Ij8iP4I/4kCiQEJAokECRkJBYkZCQuJBwkIiQoJCIkKCQuJDQkOiRAJEYkTCRSJFgkXiRkJGokaiRqAoolNh/qH+of5B/qH+Qf5B/kH+of5B/qH+Qf5B/kI4YlNh/qH/Af9iU2H/wgAiAII4wgDiU8Ja4gFCAUJa4gFCAaIMIgwiDCIMggwiVIIxQjFCMUIxQgICMUICAgICAgIxogJiVIIxQgLCAyJUgjViA4JZAloiCMIIwgjCWiID4lVCVUIEQlWiBoIGggaCV+IEolWiBoIFAgViVaIFwlMCBiJWAlYCVaIGglWiVaJVolWiW0JiAgbiBuJiAgbiB0JiAloiCMIIwgjCB6IIwgeiB6IHojvCWiIIwggCWiIIwloiCMIIAgkiCMIIYloiWiIIwgkiCYJaglqCWiIKQgniCeIKQjSiCqIKojSiCqI0ojSiVmJWYgsCVmJWYg5iDaINog2iC2IOYg2iC8IMIgyCDCIMggziDUINog4CDmIOwg8iNcI+Yg/iD+IPgg/iVyJWwhBCEEJYQlbCEEIQohECEWJU4hHCEcISIlwCE0ISghNCXGIS4lwCE0ITolwCFAI+whWCFGIVIhRiFSIVIhUiFYIUwhWCFSIVIhUiR8I+whWCFeIWQj7CFqIXAhdiSCIXwhjiYaJg4hgiGCJg4hgiGIIY4hjiGOIZQj/iQEIZokBCQEIaAkBCGmIaYhpiQKIawj/iQEIbIhuCP+JcwhviHEIcQmeiHKIdAh1iHWIdwh4hvcG9wh6CYUJhQiDCHuIgwlEiIAJhQiDCH0IfoiACIGJhQmFCIMJQYlBiISIh4iGCIeIh4iHiIeJQwl0iIqIiQiKiXSIioiMCXSJeQiVCI2IlQiPCJUIkIiQiJCJLIl5CJUIkgl5CJUJeQiVCJIIloiVCJOJeQl5CJUIloiYCYaJhomGiJsImYiZiJsJDoiciJyJDoiciQ6JDoieCJ+In4ifiJ+In4k9CUAIoQlACKKJPQlACKQJPQlACT0JQAikCKiJQAiliT0IpwioiXeJO4iriKuIqgiriToJCIk1iTWJNAkIiTWIrQkyiK6IsAixiLGIswlGCL8IwIi2CMCItgi2CL8ItIi/CLYItglJCUYIvwi3iUYIuQi6iLwJSoi9iUYIwIi/CL8IwIjCCU2JTwlQiMOJUIlSCMUIxojICNoJYojLCMmIywlYCMyJbQlVCWiJaglriVmIzgjPiVyI3ojRCNKI1AlWiV+JTAjViWiI1wjXCNiI2glYCVgJWAjbiVUJVQlriVmJWwlbCVyI3ojeiVaI3QlVCVUI3oltCOAI4YjjCOSI5gjniOkI6ojsCO2I7wloiO8I8IjyCPOI9Qj2iPgJUIlciWiI+YlfiXAJcYlxiPsI/Ij+CP+JAQkCiRSJFgmCCQWJBAkFiReJBwl5CYaJg4kIiQoJOgkLiQ0JDomDiRAJhQmFCYUG9wb3CRGJLgkTCRMJFIkWCReJF4kXiRkJg4b3CRqJGolWiRwJHYkfCSCJIgkjiSUJJokoCSmJKwksiS4JL4kxCTKJNAk1iTcJOIk6CYaJO4mGiUYJPQk+iUAJQYl0iUMJRIlGCUeJSQlKiUwJTYlPCVCJUglTiVUJaIlWiVgJbQmICWiJaglZiVsJXIleCV+JYQliiWiJZAlliWcJaIlqCWuJbQluiXAJcYlzCXSJdgl3iXkJeol8CX2JfwmAiYIJg4mFCYaJiAmJiYsHFQmMhxaHGAmOCY+JkQmRCZEJkQmRCZEJkQmRCZKJlAmViZcJmImaBxmJnQmbiZ0JnQmdCZ0JnQmdCZ0ANoAAf+FAAL/hQAD/4UABP+FAAX/hQAG/4UAB/+FAAj/hQAJ/4UACv+FAAv/hQAM/4UADf+FAA7/hQAP/4UAEP+FABH/hQAS/4UAE/+FABT/hQAV/4UAFv+FABf/hQAY/xQAGf+FAFb/hQBX/4UAkwAZAJQAGQCVABkAlgAZAJcAGQCrACkArAAfAK4AKQCvACkAsAApALEAKQCyACkAs//XALQAHwC1AB8AtgAfALcAHwC4AB8AuQAfALoAHwC7AB8AvAAfAL0AHwDN/9cAzv/XAM//1wDQ/9cA0f/XANL/1wDT/9cA1P/XANX/1wDW/9cA1//XANn/1wDa/9cA2//XANz/1wDd/9cA3v/XAN//1wDg/9cA4f/XAOL/1wDj/9cA5P/XAOX/1wDo/+cA6f/nAOr/5wDr/+cA7P/nAO3/5wDu/+cA7//nAPD/5wDx/+cA8v/nAPP/5wD0/+cA9f/nAPb/5wD3/+cA+P/nAPn/5wD6/+cA/P/nAP3/5wD+/+cA///nAQD/5wEB/+cBAv/nAQP/5wEE/+cBBf/nAQf/5wEI/+cBCf/nAQsALgEM/58BDQAuAQ7/nwEP/58BEP+fARH/nwES/58BOv/nATv/5wE8/+cBPf/nAT7/5wE//+cBQf/nAUL/5wFD/+cBRP/nAUX/5wFG/+cBR//nAUj/5wFJ/+cBSv/nAUv/5wFM/+cBTf/nAU7/5wFP/+cBUP/nAVH/5wFS/+cBU//nAVT/5wFX/+cBXP/IAV3/yAFe/8gBX//IAWD/yAFh/8gBYv/IAWUAIwFmACMBZwAjAWgAIwFpACMBav/cAWv/3AFs/9wBbf/cAW7/3AFv/9wBcP/cAXH/3AFy/9wBc//cAXT/3AF1/9wBdv/cAXf/3AF4/9wBef/cAXr/3AF7/9wBfP/cAX0ALgF+/9wBfwAuAYAALgGBAC4BggAuAYMALgGFAC4BhgAuAYcALgGIAC4BiQAuAYoALgGLAC4BjAAuAY0ALgGOAC4Bk//nAZT/5wGV/+cBlv/nAZf/5wGY/+cBmf/nAZr/5wGb/+cBnP/nAZ7/5wGf/+cBoP/nAaH/5wGi/+cBo//nAaT/5wGl/+cBpv/n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AhECEQAGAhMCEwAGAhUCFQAGAhYCFwALAhgCGQAPAhoCGwABAhwCHAAFAh0CHgAMAiECJAABAiUCJwAJAioCKgANAisCLAATAi0CLQABAi4CLgAJAjACMAAIAjECMQAdAjICMwALAjQCNAABAjYCOAAXAjkCOQAHAjoCOgAjAjsCOwAeAjwCQAAOAkECQQAKAkICQgACAkYCRgADAkcCRwAcAksCSwACAkwCTQADAlUCVQAZAlYCVwAEAlkCWQAaAlsCWwACAl0CXQACAl8CXwAKAmECYwAKAmoCagAHAm0CbQAHAm4CbgAEAm8CbwAKAnECcgAYAnMCdAADAngCegAEAnsCewACAnwCfAAcAn0CgAADAoECgQACAoICggAZAoMCgwAKAoQChAACAocChwAZAogCiQAEAooCigADAosCjAACAo4CjgAHApICkgADApQClAACApYClgACApgCmAACApkCmgAHAp8CnwADAqACoAAcAqgCqgAEAq0CrQAOAq4CrwAaArECsQAEArICsgAHArMCswAKArgCuAADAr0CvQADAr4CvgAYAsECwQACAsMCwwACAsYCxgAkAscCyQAHA98D4AARA+MD4wARBAgECQARBAoECgAbBAwEDAAbBA4EDgAbBA8EDwAUBBAEEAAVBBEEEQAUBBIEEgAVBBUEFQAUBBYEFgAVBBcEFwAUBBgEGAAVAAIAngG2AbYACQG/Ab8AHgHDAcMADAHEAcQAGgHLAcsAFgHOAc4AAwHRAdEAAwHSAdIABgHTAdQABQHVAdUAIAHWAdYAEQHXAdcACwHeAd4ABgHfAd8AFgHhAeEAHwHiAeMAAwHmAeYAIgHnAecABgHpAekAIQHqAeoABgHrAesAAwHsAewABgHuAe4ACQHwAfAADAH0AfQAAwH1AfYABQH3AfcAAwH4AfgADAH5AfkAGgH9Af0ABgICAgMAAwIEAgQABgIFAgYABQIHAgcAEQIIAggABgIJAgoACwIMAg0AGAIPAg8ADAIQAhAAAQIRAhEAFgIUAhQACwIWAhgACQIaAhsAAwIcAhwADAIdAh4AGQIhAiQAAwIlAicABQIoAigACwIrAiwAEQItAi0AAwIuAi4ABQIvAi8AAwIyAjMACQI0AjQAAwI2AjgAFwI5AjkAEgI6AjoAIwI7AkEAAQJCAkIAJAJDAkUAAgJG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ARsAFQEcAR0ABQEeAR4AFQEfAR8ABQEhASEAFQEiASIABQEjASMAFQEkASQABQElASUAKAEmASgABQEpASkACQEqASoABQErAS4AGwEvAS8AKQEwATAAKgExATMACQE1ATkACQE6AT8AAQFAAUAABQFBAVQAAQFVAVUACQFWAVYABQFXAVcAAQFYAVsACQFcAWIADgFjAWMABQFlAWkAFgFqAXwABwF9AX0ACAF+AX4ABwF/AYMACAGEAYQAMAGFAY4ACAGPAZIAFAGTAZwAAQGeAa4AAQGxAbIAHQPfA+AAEwPhA+IAIAPjA+MAEwPkA+UAIQPmA+YAKwPvA+8ALgPwA/AAJwPxA/QADAP4A/sADAP9A/0ADwP/A/8ADwQBBAEADwQDBAMADwQFBAUADwQHBAcADwQIBAkAEwQKBAoAHgQLBAsAIwQMBAwAHgQNBA0AIwQOBA4AHgQPBA8AGQQQBBAAGgQRBBEAGQQSBBIAGgQTBBQAIgQVBBUAGQQWBBYAGgQXBBcAGQQYBBgAGgQsBCwAHAQvBC8ALQQwBDAAHAQxBDEALAQyBDIAHAQzBDMALwABAqUAEAABAQgEsgACBDIELAACBCwKzgACBCYKzgACBCAKzgACCrYKzgACCrAKzgACCqoKzgAB/3kDzgABAjUFQgABAAL+mgABAAD++AABAjX+hAABAjX+ggABAAIAAAABAAAAAAABAjUAAAABAjUFywABAjUFOgABAjUFFAABAjcFxwABAjUGmwABAjUGoQABAjUGwwABAjUG9QABAjUGmQABAjUGZwABAjUGegABAjUFCwABAjUFYwABAjUFQAABAjUFRwABAjUFWgABAjcESwABAjUFNAABAjUDzgABAmMFQgABBUsFQgABBBUFQgABAWQFQgABAbkFYwABBFEDzgABBbUFQgABBEUDzgABAL4EeQABBboFQgABBFQDzgABAN8AEgABBUYAEgABB6UAEgABA6kAEgABA/kAEgABBp8AEgABATYAEgABA40AEgABA2oAEgABAuQAEgABAVMDvAABBJMAEgABASkAEgABBHYAEgABA50AEgABAUcAEgABA8sAEgABAnIAFAABAtkAEgABBUsAEgABBAgAEgABAfAAFAABA64AFAABAlz++AABAsn+ggABAr8AAAABAmr++AABAgoAAAABAu7+hAABAQr++AABAo7+hAABAlj+hAABAsz+hAABAu7++AABBD8AAAABAqUAAAABAqX+hAABAkf+ggABAkf+hAABAkf++AABAcH+ggABAev+hAABArr++AABAwD++AABAwAAAAABAroAAAABAin++AABAYn++AABAh/++AABAhf+ggABAmYAAAABAiz++AABAfH+kAABAPT++AABAif+hAABAif//AABAUH+hAABAUEAAAABAp4AAAABAjn+hAABAjT++AABA5IAAAABAPT+hAABAd3+ggABAgH+hAABAgH++AABAioAAAABAYEAAAABAUT+ggABAYH+hAABAjv++AABAt7+/QABAcIAAAABAkD++AABAkcAAAABAgIAAAABAlgAAAABAij+ggABAoIAAAABA54AAAABAigAAAABA5UAAAABAgEAAAABA/YAAAABAen+ggABAxMAAAABAh8AAAABA2EAAAABAiwAAAABAhEAAAABAekAAAABAt4ABQABBF8AAAABAcUAAAABAuQAAAABAkD+mgABAjsAAAABAicAAAABA2oAAAABAPQAAAABAVIAAAABAnIAAAABAhAAAAABAo4AAAABAesAAAABAjcAAAABAlwAAAABAmoAAAABAtUAAAABAQoAAAABAhgAAAABAikAAAABAu4AAAABAl4AAAABAykAAAABAskAAAABAoEAAAABAgsAAAABAc8AAAABAjQAAAABAzQAAAABAjkAAAABAhcAAAABAPT95QABAj4AAAABAswAAAABAi4AAAABAwD/+gABAvMAAAABAkMAAAABAYkAAAABAkAAAAABA5AAAAABAScAAAABAlsH3wABAlsGwwABAlsGiQABAlsGZwABAlsG9QABAkUHqAABAlsGmQABBG0GwwABAuoGwwABAuoGoQABAl0H3wABAl0GoQABAl0GiQABAl0GZwABAl0GmQABAu4GoQABAtUGwwABAQoGoQABAQoGiQABAQoGZwABAQoGmQABAbEGwwABAQoGwwABAukGwwABAukGmQABAu4H3wABAu4GiQABAu4GZwABAu4GwwABAu4GmQABBD8FQgABAmwGwwABAmwFQgABAkQGwwABAesGwwABAroGmwABAroGiQABAr8FQgABAr8GwwABAr8GiAABAr8GmQABAroGwwABAroGZwABAroFQgABAroG9QABAroGmQABA5UGmwABA5UGwwABAikGwwABAikGiQABAikGZwABAikGmQABAhQGwwABAhQGoQABAYkGzgABAYkGoQABAYkGwwABAYkGZgABAYkGmQABAi8FWgABAjMGdgABAi8GdgABAi8FYwABAi8FFAABAi8FCwABAi8FywABAiUG7QABAi8FOgABA2EFYwABAh4FYwABAh4FRwABAj4FQgABAmYDzgABAiYFWgABAioGdgABAiYGdgABAiYFRwABAiYFFAABAiYFCwABAiYFOgABAgsDzgABAfIDzgABAfIFWgABAfIFYwABAfAFFQABAfIFRwABAjUG1wABAPQFWgABAP4FFAABAPQFCwABAPQFRwABAPQFOgABAPQFYwABAfoD1wABAPEG1wABAPEFQQABAqEDzgABAjwFYwABAjwFOgABAjQFWgABAjgGdgABAjQGdgABAjQFFAABAjQFCwABAjQFYwABAjQFOgABA5IDzgABAZAFYwABAZADzgABAfcFYwABAioDzgABAUEDzgABAjcFWgABAjcFQAABAjcFFAABAjcFCwABAjcFywABAjcFOgABAuYFQAABAuYFYwABAdIFFAABAdIFOgABAccDzgABAccFYwABAccFRwABAkQGdgABAkAGdgABAkAFCwABAkAFywABAjIG7wABAkAFOgABA4oFYwABAkAFYwABAkAFWgABAkAFRwABAgUGwwABAl0GwwABAl0GmwABA3kFQgABAt4GwwABAt4GwQABAkYGwwABAkIFQgABAjQGwQABAyoFQgABAkQFQgABAqcFQgABAhYFQgABAlgFQgABA6gFQgABAiwFQgABAyIFQgABA3kGwQABAoUFQgABAlsGwQABAlsGmwABBG0FQgABAl0GwQABAtgFQgABAtgGmwABA3kGmwABAiwGmwABAtMGZgABAtMGmwABAu4GmwABAqcGmwABAkIGZgABAkIGmwABAkIGwwABAoUGmwABAyoGmwABA5UFQgABAi8DzgABAYcDzgABAYcFYwABAiYDzgABAiYFYwABAiYFQAABAnoFYwABAlcFWgABAf8FYwABAdIDzgABAdgFWgABAjADzgABAqkDzgABAfcDzgABAhUDzgABA/0DzgABAegDzgABAuMDzgABAfQDzgABAf8DzgABAusDzgABAs4DzgABAuEFWgABAiYFWwABAi8FQAABA2EDzgABAiMFWwABAhUD0QABAgsFQAABAuMFQAABAfQFQAABAk0FCwABAk0FQAABAjQFQAABAjYDzgABAjYFQAABAhUFQAABAdIFCwABAdIFQAABAdIFYwABAjAFQAABAqkFQAABAcUDzgABAuYDzgABAjcDzgABAkEFWgABAjcFYwABAfoFQgABA2oDzgABAPQFQAABAkADzgABAjgFWgABAkAFQAABA4oDzgABAbEFQgABAlsFQgABAnIFQgABAgUFQgABAl0FQgABAhQFQgABAtUFQgABAQoFQgABAkYFQgABAesFQgABAikFQgABAjcFQgABAAMFHgABAQoGmwABAikGmwABAtMFQgABAhgFQgABAi8FQgABAi8GmwABAu4FQgABAl4FQgABAuoFQgABAykFQgABAuoDCAABAYkFQgABAYkGmwABAfwDzgABAjwDzgABAPgDzgABAc8DzgABAjQDzgABAkIDzgABAzQDzgABAPgFQAABAkIFQAABAlQFYwABAk0DzgABAh4DzgABAPQDzgABAj4DzgABAukFQgABAjEDzgABAwAEeQAB/9EFHgABAvMFQgABAkMDzgAB/i8GeQABAAIFWgABAA4FYwABAYkGiAABAjAGeQABAk4GeQABAkAFFAABAjUGwQAB/iYH3wABAScFQgABA1395QABA10AAAABA6oAAAABA5AFQgABA10DzgABA1kFQQABAAAACgB4AB4AA0RGTFQBNmN5cmwBOmxhdG4BUAAsAXABeAKUAYABiAGQAZgBoAGgAaABoAGgAagBqAGwAbgBwAHIAdAB2AHgAeAB6AIAAfAB+AIAAoACCAKKAhACGAIgAigCMAI4AkACSAJQAlgCYAJoAnACeAAhYWFsdALwY2FzZQJIY2NtcAMAY2NtcAMUZGxpZwJOZG5vbQJUZnJhYwMKbGlnYQJabG51bQJgbG9jbAJmbG9jbAJsbG9jbAJybG9jbAJ4bG9jbAJ+bG9jbAKEbG9jbAKKbG9jbAKQbG9jbAKWbG9jbAKcbG9jbAKibnVtcgKob251bQKub3JkbgL4cG51bQK0c2luZgK6c3MwMQLAc3MwMgLGc3MwMwLMc3MwNALSc3VicwLYc3VwcwLedG51bQLkemVybwLqAlgAAAJUAANCR1IgAoRTUkIgArZVS1IgAugEEAAIQVpFIARAQ0FUIARyQ1JUIASkS0FaIATWTU9MIAUIUk9NIAU6VEFUIAVsVFJLIAWeAAEAAAABB9wAAwAAAAEHagABAAAAAQLAAAYAAAABAwYAAQAAAAECtgACAAAAAQMmAAEAAAABAqwAAQAAAAEDQAAGAAAAAQMYAAQAAAABAt4ABAAAAAEC3gABAAAAAQMKAAEAAAABBbAAAQAAAAECegABAAAAAQJ4AAEAAAABAnYAAQAAAAECdAABAAAAAQJyAAEAAAABAnAAAQAAAAECbgABAAAAAQLmAAQAAAABAo4AAQAAAAECXAABAAAAAQWEAAEAAAABBdgAAQAAAAEFogABAAAAAQYKAAQACAABAmYABAAIAAECZgABAAAAAQKEAAEAAAABBPYAAQAAAAEGLgABAAAAAQISAAEAAAABAhAABgAAAAIChAKWAAYAAAACAp4CsAAGAAAABAR4BK4EigScAAAAAQAkAAAAAQAlAAAAAQAYAAAAAQAmAAAAAQAgAAAAAQAHAAAAAQASAAAAAQAOAAAAAQAIAAAAAQAJAAAAAQANAAAAAQAMAAAAAQATAAAAAQAKAAAAAQALAAAAAQARAAAAAQAXAAAAAQAjAAAAAQAhAAAAAQAVBiIAAQAoBiAAAQApBh4AAQAqBhwAAQArAAAAAQAUAAAAAQAWAAAAAQAiAAAAAQAnAAAAAgAAAAEAAAACAB0AHwAAAAMAAgAEAAYAAAADABkAGgAbAAAABAACAAQABgAGAAD//wAVAAAAAQACAAQABQAGAAcACAAUABUAFgAXABgAGQAaABsAHAAdAB4AHwAgAAD//wAWAAAAAQACAAQABQAGAAcACAAKABQAFQAWABcAGAAZABoAGwAcAB0AHgAfACAAAP//ABYAAAABAAIABAAFAAYABwAIABAAFAAVABYAFwAYABkAGgAbABwAHQAeAB8AIAAA//8AFgAAAAEAAgAEAAUABgAHAAgAEwAUABUAFgAXABgAGQAaABsAHAAdAB4AHwAgAAEGTAABAAEGGgABAAEF7AAGAAEF7ACLAAEGcABrAAEGagB1AAEGZABHAAEF2v+7AAEGWABRAAEGSP/2AAEGGv/2AAEGHgALAAEFwgG2AAEF0gABBdgAAQXWAAEFugABBdQAAQW2AAEF0gABBbIAAQXQAAEFrgABBcgAAQX0AAEGFAACBfQF+gABBhIAAgW8BcAAAgYQAAICNQLGAAIGDgADA1kDWQNZAAIGDAAEAJAAlwFhAWkAAgYKAAQBtAG1AbQBtQADAAEGCAABBboAAAABAAAAHAADAAEGDAABBagAAAABAAAAHAADAAEFoAABBeoAAAABAAAAHgADAAEFjgABBeAAAAABAAAAHgAA//8AFQAAAAEAAwAEAAUABgAHAAgAFAAVABYAFwAYABkAGgAbABwAHQAeAB8AIAAA//8AFgAAAAEAAgAEAAUABgAHAAgACQAUABUAFgAXABgAGQAaABsAHAAdAB4AHwAgAAD//wAWAAAAAQACAAQABQAGAAcACAALABQAFQAWABcAGAAZABoAGwAcAB0AHgAfACAAAP//ABYAAAABAAIABAAFAAYABwAIAAwAFAAVABYAFwAYABkAGgAbABwAHQAeAB8AIAAA//8AFgAAAAEAAgAEAAUABgAHAAgADQAUABUAFgAXABgAGQAaABsAHAAdAB4AHwAgAAD//wAWAAAAAQACAAQABQAGAAcACAAOABQAFQAWABcAGAAZABoAGwAcAB0AHgAfACAAAP//ABYAAAABAAIABAAFAAYABwAIAA8AFAAVABYAFwAYABkAGgAbABwAHQAeAB8AIAAA//8AFgAAAAEAAgAEAAUABgAHAAgAEQAUABUAFgAXABgAGQAaABsAHAAdAB4AHwAgAAD//wAWAAAAAQACAAQABQAGAAcACAASABQAFQAWABcAGAAZABoAGwAcAB0AHgAfACAAAwAAAAEEIAABBCgAAQAAAAMAAwABA0IAAQNCAAAAAQAAAAMAAwABBCYAAQMwAAAAAQAAAAMAAwAAAAED6gACBAID8gABAAAAAwACBDwAEgDCAMMAxADFAMYAxwDIAMkE+ADKAMsAzAI2AjcCOAMHAwgDCQACBEoAEwIyAjMCNAK1ArYCtwK4ArkCugK7ArwCvQK+Ar8CwALBAsICwwLEAAIDxgAUA24DbwNwA3EDcgNzA3QDdQN2A3cDeAN5A3oDewN8A30DfgN/A4ADgQACA6gAFAOMA40DjgOPA5ADkQOSA5MDlAOVA3gDeQN6A3sDfAN9A34DfwOAA4EAAgOyAB4DggODA4QDhQOGA4cDiAOJA4oDiwNPA1ADUQNSA1MDVANVA1YDVwNYA4wDjQOOA48DkAORA5IDkwOUA5UAAgUwACMDbgNvA3ADcQNyA3MDdAN1A3YDdwNPA1ADUQNSA1MDVANVA1YDVwNYA/gD+QP6A/sEAgQDBAQEBQQGBAcEFQQWBBcEGAS0AAIEwgAjAZMBlAGVAZYBlwGYBPkBmQGaAZsBnAGdBPoBngGfAaABoQT7AaIBowGkAaUBpgGnAagBqQGqAasBrAGtAa4CxwLIAskCygABBMAAKgMSAxgEZAPUA+QD9AQEBBQEJAQ0BEQEVAPMAx4DJAMqAzADNgM8A0IDSANOA1QDWgNgA2YDbANyA3gDfgOEA4oDkAOWA5wDogOoA64DtAO6A8ADxgAAAQAAAAEBAAABAgAAAQMAAgR4AHMBtADCAMMAxADFAMYAxwDIAMkE+ADKAMsAzAG1AJAAlwGUAZUBlgGXAZgE+QGZAZoBmwGcAZ0E+gGeAZ8BoAGhBPsBogGjAaQBpQGmAacBqAGpAaoBqwGsAa0BrgEcAbUBYQFpAjICMwI0AjYCOALHAsUCtQK2ArcCuAK5AroCuwK8Ar0CvgK/AsACwQLCAsMCxgLEAsgCyQLKAwcDCAMJA1kDlgOXA5gDmQOaA5sDnAOdA54DnwOqA/gD+QP6A/sEAgQDBAQEBQQGBAcEFQQWBBcEGASVBJYElwSYBJkEmgSbBJwEtAABAAEBFgABAAECOgABAAED7wABAAEDUAABBF4AAQRgAAEEaAABBF4AAQABBLMAAgR0BIIAAQABASsAAQABAFsAAQABAGIAAQABAQsAAQRyAAEEfgABAAMBFgEkBLMAAgABA3gDgQAAAAIAAQSKBJEAAAADBB4EJAQqAAIBCwEWAAIBCwErAAIAAQOgA6kAAAACAAEDTwNYAAAAAQACAbEBsgABAAIAWwErAAEAAgHlAmgAAQADA08DbgOCAAEABACOAJYBXwFoAAEABAABAGkAzQE6AAEAAQOqAAEAAgABAM0AAQACAGkBOgACAAEDlgOfAAAAAQACARYBJAACAAIEtgS6AAAEvATDAAUAAQAHBLIExATFBMcEyATJBMoAAgAEAAEAzAAAAbYCOADMAssDCQFPA04DTgGOAAIAAgNPA1gAAAOMA5UACgACAAIDTwNYAAADbgN3AAoAAQASAEkASwBMAE0ATgBPAFAAUQBSAFMAVABVAeQB5QI1AtQC5wLrAAIAAgNPA1gAAANuA4EACgABABMBvwHLAdUCOwI8AkICRgJHAkgCSQJKAkwCTgJSAlUCWwJcAl0CawACAbQBkwACAjUCNwACA1ADeQACA1EDegACA1IDewACA1MDfAACA1QDfQACA1UDfgACA1YDfwACA1cDgAACA1gDgQACA24DjAACA28DjQACA3ADjgACA3EDjwACA3IDkAACA3MDkQACA3QDkgACA3UDkwACA3YDlAACA3cDlQACA3gDTwACA3kDUAACA3oDUQACA3sDUgACA3wDUwACA30DVAACA34DVQACA38DVgACA4ADVwACA4EDWAADA08DeANZAAcDuwPFA6EDlwNvA4MDjQAHA7wDxgOiA5gDcAOEA44ABwO9A8cDowOZA3EDhQOPAAcDvgPIA6QDmgNyA4YDkAAHA78DyQOlA5sDcwOHA5EABwPAA8oDpgOcA3QDiAOSAAcDwQPLA6cDnQN1A4kDkwAHA8IDzAOoA54DdgOKA5QABwPDA80DqQOfA3cDiwOVAAgDugPEA6ADlgNuA4IDjANZAAIABQDNAOUAAAEMAQwAGQEOARIAGgI5AjkAHwKZApsAIAACAAYDeAOBAAADjAOVAAoD8QP0ABQD/AQBABgEDwQSAB4EswSzACIAAgAFAM0AzQAAAeUB5QABA08DWAACA24DgQAMA4wDlQAgAAEAcwABAEkASwBMAE0ATgBPAFAAUQBSAFMAVABVAGkAjgCWAM4AzwDQANEA0gDTANQA1QDWANcA2ADZANoA2wDcAN0A3gDfAOAA4QDiAOMA5ADlAQwBDgEPARABEQESARYBOgFfAWgBvwHLAdUB5AI1AjkCOgI7AjwCQgJGAkcCSAJJAkoCTAJOAlICVQJbAlwCXQJoAmsCmQKaApsC1ALnAusDggOgA6EDogOjA6QDpQOmA6cDqAOpA+8D8QPyA/MD9AP8A/0D/gP/BAAEAQQPBBAEEQQSBIoEiwSMBI0EjgSPBJAEkQSzAS8AAgPoAF8AAgPoAbAAAgEkBD4AAwE6A98BrwACAQsBsQACARYBsgACASsAAAABAAEEtAABAAAABQABBLQAAQAAAAEAAAAFAAAAAgPoAAEAWwABAAAAEAAAAAID6AABASsAAQAAAA8AAQABAAgABAAAABQABAAAADQAAm9wc3oBOwAAd2dodAEEAAF3ZHRoAQUAAml0YWwBPAADAAgAHAAwADwAAgAAAAIBCQAMAAAACxmaABAAAAACAAEAAgEJAZAAAAFyAAABuAAAAAEAAgACAQkAZAAAAAEAAwACAQkAAAAAAAAAAQAAAAAAAAA0AAAAA2JpbGQAAAA0AAAAZGRsbmcAAACYAAAANXNsbmcAAADNAAAANWZvbnRUb29sczogNC40OS4wOyB1Zm8yZnQ6IDMuMS4wOyBnbHlwaHNMaWI6IDYuNi42OyBtc2ZvbnRsaWI6IDAuOS44OyBwcm9qZWN0IGdpdCByZXZpc2lvbjogNWNjMTBjNWNMYXRuLCBDeXJsLCBHcmVlaywgdmktTGF0biwgYmctQ3lybCwgc3ItQ3lybCwgdWstQ3lybExhdG4sIEN5cmwsIEdyZWVrLCB2aS1MYXRuLCBiZy1DeXJsLCBzci1DeXJsLCB1ay1DeXJsAAA=";
          // Crear una instancia temporal de jsPDF para registrar la fuente
          doc.addFileToVFS("Aptos.ttf", font);
          doc.addFont("Aptos.ttf", "Aptos", "normal");
      
      // Ruta de la imagen en tu servidor
            const imagePath = '/img/biblat_reporte.png'; // Ruta en el servidor
            
            getBase64Image(imagePath, function(base64Image) {
                doc.addImage(base64Image, 'PNG', 50, 50, 130, 55); // Ajusta las dimensiones según sea necesario
            

            // Agregar título
            doc.setFont('Aptos');
            doc.setFontSize(11);
                                                                //X  /Y
            doc.text('EVALUACIÓN DE METADATOS CON METAMETRICS', 370, 70, { align: 'center' });

            // Agregar subtítulo
            doc.setFontSize(10);
            const texto = "Sistema de revistas científicas latinoamericanas Biblat (CLASE+PERIÓDICA) \n"+
                            "Universidad Nacional Autónoma de México, Dirección General de Bibliotecas y \n"+
                            "Servicios Digitales de Información, Departamento de Bibliografía Latinoamericana";

            doc.text(texto, 370, 80, { align: 'center' });
            
            //Datos revista
            doc.setFont('Aptos', 'normal');
            doc.setFontSize(15);
            doc.text('DATOS DE LA REVISTA', 50, 200);
                  
            // Línea horizontal
            doc.setDrawColor(0, 51, 102); // Color azul oscuro
            doc.setLineWidth(3);
            doc.line(50, 205, 550, 205);
            
            //Variable para conteolar el desplazamiento de texto hacia abajo
            var desplazaY = 0;
            var separaY = 15;
            var referenciaY = 220;
            var textoAjustado = '';
            var anchoAjuste = "450";
            
            // Encabezados de la tabla
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text('Título:', 50, referenciaY);
            
            doc.setFont('Aptos', 'normal');
            doc.setFontSize(10);
            textoAjustado = doc.splitTextToSize(class_ver.var.salida.revista, anchoAjuste);
            doc.text(textoAjustado, 100, referenciaY);
            desplazaY = desplazaY + textoAjustado.length - 1;
            
            referenciaY += separaY + (desplazaY*separaY);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text('Editor:', 50, referenciaY);
            
            doc.setFont('Aptos', 'normal');
            doc.setFontSize(10);
            textoAjustado = doc.splitTextToSize(class_ver.var.data.editor, anchoAjuste);
            doc.text(textoAjustado, 100, referenciaY);
            desplazaY = desplazaY + textoAjustado.length - 1;
            
            referenciaY += separaY + (desplazaY*separaY);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text('ISSN-e:', 50, referenciaY);
            
            doc.setFont('Aptos', 'normal');
            doc.setFontSize(10);
            textoAjustado = doc.splitTextToSize(class_ver.var.salida.eissn, anchoAjuste);
            doc.text(textoAjustado, 100, referenciaY);
            desplazaY = textoAjustado.length - 1;
            
            referenciaY += separaY + (desplazaY*separaY);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text('ISSN:', 50, referenciaY);
            
            doc.setFont('Aptos', 'normal');
            doc.setFontSize(10);
            textoAjustado = doc.splitTextToSize(class_ver.var.salida.issn, anchoAjuste);
            doc.text(textoAjustado, 100, referenciaY);
            desplazaY = textoAjustado.length - 1;
            
            referenciaY += separaY + (desplazaY*separaY);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text('País:', 50, referenciaY);
            
            doc.setFont('Aptos', 'normal');
            doc.setFontSize(10);
            textoAjustado = doc.splitTextToSize(class_ver.var.pais_issn, anchoAjuste);
            doc.text(textoAjustado, 100, referenciaY);
            desplazaY = textoAjustado.length - 1;
            
            referenciaY += separaY + (desplazaY*separaY);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text('URL:', 50, referenciaY);
            
            doc.setFont('Aptos', 'normal');
            doc.setFontSize(10);
            textoAjustado = doc.splitTextToSize($('#'+class_ver.var.id_oai).val().replace("/oai", ""), anchoAjuste);
            doc.text(textoAjustado, 100, referenciaY);
            desplazaY = textoAjustado.length - 1;
            
            
            referenciaY += (separaY*3) + (desplazaY*separaY);
            //Resultados de la evaluación
            doc.setFont('Aptos', 'normal');
            doc.setFontSize(15);
            doc.text('RESULTADOS DE LA EVALUACIÓN', 50, referenciaY);
            
            referenciaY += 5;
            // Línea horizontal
            doc.setDrawColor(0, 51, 102); // Color azul oscuro
            doc.setLineWidth(3);
            doc.line(50, referenciaY, 550, referenciaY);
            
            
            // Texto
            doc.setFontSize(10);
            const textWidth = (612-50-50);
            const texto2 = "A continuación, se muestra la relación de documentos con posibles errores en la escritura o estructura de los metadatos. Cualquier corrección deberá efecutarse directamente en la base de datos de OJS, para una mejor referencia se recomienda la consulta del Manual de indización en OJS: Buenas prácticas para la región latinoamericana (2a edición).";
            const splitText = doc.splitTextToSize(texto2, textWidth);
            
            const startY = referenciaY + separaY;
            // Agregar texto al PDF con justificación manual
            // Dibujar texto línea por línea con justificación manual
            let y = startY;
            splitText.forEach(line => {
                const words = line.split(" ");
                if (words.length < 4) {
                    // Si la línea tiene una sola palabra, alíneala a la izquierda
                    doc.text(line, 50, y);
                } else {
                    const lineWidth = doc.getTextWidth(line);
                    const spaceWidth = (textWidth - lineWidth) / (words.length - 1); // Ajustar espacio entre palabras

                    let x = 50;
                    words.forEach((word, index) => {
                        doc.text(word, x, y);
                        x += doc.getTextWidth(word) + spaceWidth; // Mover posición a la derecha con espaciado
                    });
                }
                y += 13; // Ajuste de interlineado
            });
            
            //doc.text(splitText, 50, 345, { align: "left" });
            
            var data = class_ver.htmlToArrPdfHref(tabla);
                
            var tablaY = y + (separaY)
            // Parámetros:
            // startX = 50, startY = 100, tableWidth = 400, numColumns = 3
            // 'col2' será la columna más ancha (100px)
            // finalY = 700 (Si la tabla llega aquí, crea una nueva página)
            // Ypaginanueva = 50 (Donde inicia en una nueva página)
            var yTabla = generarTabla(doc, 50, tablaY, 500, 8, data, 'col5', 700, 100);
            
            
            doc.setFontSize(8);
            var textWidthFin = (612-50-50);
            const hoy = new Date();

            const dia = String(hoy.getDate()).padStart(2, '0');
            const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
            const anio = hoy.getFullYear();

            const fechaFormateada = `${dia}/${mes}/${anio}`;
            doc.text(fechaFormateada, 50, yTabla + 20);
            
            var textoFin = "Este documento es informativo, su uso es exclusivamente académico o para la mejora continua de la calidad editorial de las revistas. Biblat no tiene control sobre los sistemas OJS que generan la información contenida en este documento.";
            var splitTextFin = doc.splitTextToSize(textoFin, textWidthFin);
            doc.text(splitTextFin, 50, yTabla+40);
            textoFin = "Para cualquier duda comuníquese al correo electrónico mafloresc@dgb.unam.mx";
            doc.text(textoFin, 50, yTabla + 60);
            
      // ----- Finally, Save the PDF -----
      doc.save("Evaluacion "+class_ver.var.salida.revista+".pdf");
        });
    },
    htmlToArrPdf: function(htmlTabla){

        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlTabla;

        var tabla = tempDiv.querySelector('table');
        var encabezados = Array.from(tabla.querySelectorAll('thead th')).map((th, index) => ({
            key: `col${index + 1}`,
            label: th.textContent.trim()
        }));

        var filas = tabla.querySelectorAll('tbody tr');

        // Comenzamos con los encabezados como primera fila
        var data = [
            Object.fromEntries(encabezados.map(({ key, label }) => [key, label]))
        ];

        filas.forEach(fila => {
            var celdas = fila.querySelectorAll('td');
            var filaData = {};

            celdas.forEach((celda, index) => {
                var key = `col${index + 1}`;
                // Si la celda tiene un enlace, extrae solo el texto visible
                var enlace = celda.querySelector('a');
                if (enlace) {
                    filaData[key] = enlace.textContent.trim();
                } else {
                    filaData[key] = celda.textContent.trim();
                }
            });

            data.push(filaData);
        });

        return data;
    },
	htmlToArrPdfHref: function(htmlTabla) {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlTabla;

        var tabla = tempDiv.querySelector('table');
        var encabezados = Array.from(tabla.querySelectorAll('thead th')).map((th, index) => ({
            key: `col${index + 1}`,
            label: th.textContent.trim()
        }));

        var filas = tabla.querySelectorAll('tbody tr');

        var data = [
            Object.fromEntries(encabezados.map(({ key, label }) => [key, label]))
        ];

        filas.forEach(fila => {
            var celdas = fila.querySelectorAll('td');
            var filaData = {};

            celdas.forEach((celda, index) => {
                var key = `col${index + 1}`;
                var enlace = celda.querySelector('a');
                if (enlace) {
                    filaData[key] = {
                        text: enlace.textContent.trim(),
                        href: enlace.getAttribute('href')
                    };
                } else {
                    filaData[key] = celda.textContent.trim();
                }
            });

            data.push(filaData);
        });

        return data;
    }
};

$(class_ver.ready);



