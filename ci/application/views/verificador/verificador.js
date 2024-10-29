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
            'doblemayus' : /([A-Z][A-Z]|[A-Z]\.[A-Z])/,
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
        var campos_califica = 13;
        var total_califica = total * campos_califica;
        
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
        
        var campos_califica = 13;
        var total_califica = total * campos_califica;
        
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
        
        var campos_califica = 13;
        var total_califica = total * campos_califica;
        
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
                        class_utils.getResource('/metametrics/get_url_validate?url='+url)
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
            licencias = class_utils.unique(licencias,'setting_value');
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
                class_utils.getResource('/metametrics/get_contents_validate?url='+val)
            )
            .then(function(resp){
                if(resp.resp == 'Fail'){
                    if(!repite){
                        setTimeout(function(){class_ver.valida_lic(licencias, res, total, num, true);},100);
                        return 0;
                    }
                    $.each(class_utils.filter_prop(res, 'setting_value', val), function(i, val_url){
                        val_url.resuelve = 0;
                        val_url.nombre = 'sin';
                    });
                }else{
                    //val.resuelve = 1;
                    //val.nombre = resp.resp;
                    $.each(class_utils.filter_prop(res, 'setting_value', val), function(i, val_url){
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
        var url = $('#'+class_ver.var.id_oai).val();
        
        $.each(enlaces.slice(0,rango), function(i,val){
            
            if('submission_id' in val){
                url = url.replace('oai', 'article/view/') + val.submission_id + '/' + val.galley_id;
            }else if('publication_id' in val){
                var submission_id = class_utils.find_prop(class_ver.var.salida.p, 'publication_id', val.publication_id).submission_id;
                url = url.replace('oai', 'article/view/') + submission_id + '/' + val.galley_id;
            }else if('article_id' in val){
                url = url.replace('oai', 'article/view/') + val.article_id + '/' + val.galley_id;
            }
            $.when(
                class_utils.getResource('/metametrics/get_contents_validate?url='+url)
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
        }).fail(function(){
            $('#error').show();
            class_ver.var.plugin = 'No';
            class_ver.setBitacora(2);
            loading.end();
            return 0;
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
    }
};

$(class_ver.ready);



