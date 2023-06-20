class_admin = {
    cons: {
        DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
        option_oai: '<option value="<url>"><revista></option>',
        get_oai: '/metametrics/get_oai?oai=<oai>&years=<years>',
        //td_num: '<a href="#" id="<anio>__<num>" class="thumbnail" style="color:#fff; background-color: #f0ad4e; border-color: #eea236; width:100px; text-align:center"><num></a>',
        td_num: '<button type="button" class="btn btn-warning nums" id="<anio>__<num>"><num></button>',
        idiomas: {
                    'es_ES' : 'Español',
                    'en_US' : 'Inglés',
                    'pt_BR' : 'Portugués'
                },
        idiomasTit: {
                'Español' : 'spa',
                'Inglés' : 'eng',
                'Portugués' : 'por'
            },
        idiomasRes: {
            'Español' : 'a',
            'Inglés' : 'i',
            'Portugués' : 'p'
        },
        pub_id: {
            '3.3.0.11': 'publication_id',
            '3.3.0': 'publication_id',
            '3.2.0': 'publication_id',
            '3.1.2': 'submission_id',
            '3.0.0': 'submission_id',
            '2.4.0': 'article_id',
            '2.3.0': 'article_id'
        },
        pub_id_auth: {
            '3.3.0.11': 'publication_id',
            '3.3.0': 'publication_id',
            '3.2.0': 'publication_id',
            '3.1.2': 'submission_id',
            '3.0.0': 'submission_id',
            '2.4.0': 'submission_id',
            '2.3.0': 'submission_id'
        },
        pub_id_file: {
            '3.3.0.11': 'submission_id',
            '3.3.0': 'submission_id',
            '3.2.0': 'submission_id',
            '3.1.2': 'submission_id',
            '3.0.0': 'submission_id',
            '2.4.0': 'article_id',
            '2.3.0': 'article_id'
        },
        er: {
            'letra' : /^.*[A-z].*$/,
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
                /^páginas\s*iniciales$/,
                /in\s*memóriam/,
                /entrevista\s*a/,
                /in\s*memoriam/,
                /book\s*review/,
                /^review$/,
                /interview\s*to/,
                /em memória/,
                /revisão\s*do\s*livro/,
                /^editorial\s*/,
                /^editorial:/,
                /^editorial./,
                /^expediente\s*\(/,
                /^tesis/,
                /^edition$/,
                /^edição$/,
                /^edición$/,
                /^portada$/,
                /^páginas\s*preliminares$/,
                /^autores$/,
                /^normas\s*para\s*autores/,
                /^nota.*comité\s*editorial/,
                /^advertencia\s*editorial$/
            ]
        },
    },
    var: {
        revistasJSON: [],
        init: true,
        url_oai: '',
        data: '',
        revistas: '',
        revista: {},
        registros:{},
    },
    initClient: function() {
        if (class_admin.var.init){
            class_admin.var.init = false;
            var object = {
                private_key: env.P_K,
                client_email: b(env.C_E),
                scopes: class_admin.cons.SCOPES,
            };
            gapi.load("client", async function(){
                gapi.auth.setToken(await GetAccessTokenFromServiceAccount.do(object));
                gapi.client.init({
                    discoveryDocs: class_admin.cons.DISCOVERY_DOCS,
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
                                    //if(val[14] == '1'){
                                        class_admin.var.revistasJSON.push(JSON.parse(JSON.stringify(Object.assign({}, val))));
                                    //}
                                }
                        });
                        class_admin.var.revistasJSON.sort(class_utils.order_by(0));
                        options += class_admin.cons.option_oai.replace('<revista>', "").replace('<url>',"");
                        $.each(class_admin.var.revistasJSON, function(i, val){
                            try{
                                options += class_admin.cons.option_oai.replace('<revista>', val[0].trim()).replace('<url>',val[9].trim());
                            } catch (error) {
                                console.log(error);
                            }
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
        class_admin.initClient();
        class_admin.control();
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
        
        $('#btn_ojs').off('click').on('click', function(){
            loading.start();
            class_admin.var.revista = class_utils.find_prop(class_admin.var.revistasJSON, 0, $('#select2-revista_sel-container').text());
            var anio = $('#anio').val();
            $.when( class_utils.getResource(class_admin.cons.get_oai.replace('<oai>', $('#revista_sel').val()).replace('<years>', anio)))
            .then(function(resp_ojs){
                if(resp_ojs.resp == 'Fail'){
                    $('#respOJS').html('No se encontró el plugin');
                }else{
                
                class_admin.var.data = resp_ojs;
                var ids_issue = '';
                var arr_ids_issue = [];
                var issue = class_utils.filter_prop(resp_ojs.i, 'year', anio);
                issue = issue.sort(class_utils.order_by_arr(['year', 'volume', 'number']));
                var data_ss = '';
                var data_p = '';

                //Intercambio de valores en las tablas de opciones de envíos y en publicaciones
                if (['3.1.2', '3.0.0'].indexOf(resp_ojs.ver) !== -1){
                    var temp = JSON.parse(JSON.stringify(resp_ojs.ss));
                    data_ss = JSON.parse(JSON.stringify(resp_ojs.p));
                    data_p = temp;
                }else{
                    data_p = JSON.parse(JSON.stringify(resp_ojs.p));
                    data_ss = JSON.parse(JSON.stringify(resp_ojs.ss));
                }

                //ids en issues
                if( ['3.3.0.11', '3.3.0', '3.2.0'].indexOf(resp_ojs.ver) !== -1 ){
                    $.each(issue, function(i,val){
                        ids_issue = class_utils.filter_prop(resp_ojs.ps, 'setting_name', 'issueId');
                        ids_issue = class_utils.filter_prop(ids_issue, 'setting_value', val.issue_id + '');

                        $.each(ids_issue, function(i2, val2){
                            arr_ids_issue.push(val2.publication_id);
                        });
                    });
                }else{
                    $.each(issue, function(i,val){
                        ids_issue = class_utils.filter_prop(data_ss, 'issue_id', val.issue_id + '');
                        $.each(ids_issue, function(i2, val2){
                            arr_ids_issue.push(val2[class_admin.cons.pub_id[resp_ojs.ver]]);
                        });
                    });
                }

                //total de publicaciones
                var publicaciones_vigentes = class_utils.filter_prop(data_p, 'status', '3');
                
                var tabla = '';
                $.each(issue, function(i, val){
                    var publicaciones = class_utils.filter_prop_arr(publicaciones_vigentes, class_admin.cons.pub_id[resp_ojs.ver], arr_ids_issue);
                    if(publicaciones.length < 0){
                        var arr=[];
                        $.each(arr_ids_issue, function(i2, val2){
                            val2 = val2 +'';
                        });
                        publicaciones = class_utils.filter_prop_arr(publicaciones_vigentes, class_admin.cons.pub_id[resp_ojs.ver], arr_ids_issue);
                    }
                    if(publicaciones.length > 0){
                        tabla += class_admin.cons.td_num.replaceAll('<anio>', val.year).replaceAll('<num>', 'V'+val.volume+'N'+val.number) + ' ';
                    }
                });
                
                if(tabla !== ''){
                    $('#respOJS').html('<b>Números en OJS:</b> ' +  tabla);
                    
                    $('.nums').off().on('click',function(e){
                        e.preventDefault();
                        var id = this.id;
                        $.confirm({
                            title: '',
                            content: 'Se ingresarán a Biblat los documentos encontrados en el número seleccionado: <b>' + this.id.replace('__', ' ') + '</b>',
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
                                            $('#mensajeFin').html('');
                                            var anio = id.split('__')[0];
                                            var vol = id.split('__')[1].split('V')[1].split('N')[0];
                                            var num = id.split('__')[1].split('V')[1].split('N')[1];
                                            class_admin.registrosCLAPER(anio, vol, num);
                                        }
                                }
                            }
                        });
                    });
                }else{
                    $('#respOJS').html('<b>Números en OJS:</b> No se encontraron números en OJS');
                }
                
                }
                
                loading.end();
            })
        });
        
    },
    registrosCLAPER: function(anio, vol, num){
        loading.start();
        var issue = '';
        var ids_issue = '';
        var arr_ids_issue = [];
        //Issue
        issue = class_utils.filter_prop(class_admin.var.data.i, 'year', anio);
        if (vol !== 'null'){
            issue = class_utils.filter_prop(issue, 'volume', vol);
        }
        if (num !== 'null'){
            issue = class_utils.filter_prop(issue, 'number', num);
        }
        issue = issue[0].issue_id + '';
        console.log(issue);
        var data_ss = '';
        var data_p = '';

        //Intercambio de valores en las tablas de opciones de envíos y en publicaciones
        if (['3.1.2', '3.0.0'].indexOf(class_admin.var.data.ver) !== -1){
            var temp = JSON.parse(JSON.stringify(class_admin.var.data.ss));
            data_ss = JSON.parse(JSON.stringify(class_admin.var.data.p));
            data_p = temp;
        }else{
            data_p = JSON.parse(JSON.stringify(class_admin.var.data.p));
            data_ss = JSON.parse(JSON.stringify(class_admin.var.data.ss));
        }

        //ids en issues
        if( ['3.3.0.11', '3.3.0', '3.2.0'].indexOf(class_admin.var.data.ver) !== -1 ){
            ids_issue = class_utils.filter_prop(class_admin.var.data.ps, 'setting_name', 'issueId');
            ids_issue = class_utils.filter_prop(ids_issue, 'setting_value', issue);

            $.each(ids_issue, function(i, val){
                arr_ids_issue.push(val.publication_id);
            });
        }else{
            ids_issue = class_utils.filter_prop(data_ss, 'issue_id', issue);
            $.each(ids_issue, function(i, val){
                arr_ids_issue.push(val[class_admin.cons.pub_id[class_admin.var.data.ver]]);
            });
        }
        console.log(arr_ids_issue);

        //total de publicaciones
        var publicaciones_vigentes = class_utils.filter_prop(data_p, 'status', '3');

        var publicaciones = [];
        var arr_id_pubs = [];
        //id's de las publicaciones
        $.each(publicaciones_vigentes, function(i,val){
            //Revisión de que sólo existe una versión
            var num_envios = class_utils.filter_prop(publicaciones_vigentes, class_admin.cons.pub_id_file[class_admin.var.data.ver], val[class_admin.cons.pub_id_file[class_admin.var.data.ver]]);
            if(num_envios.length > 1){
                num_envios = num_envios.sort(class_utils.order_by(class_admin.cons.pub_id[class_admin.var.data.ver]));
            }

            //Revisión si es contenido indizable
            var indizable = class_utils.filter_prop(class_admin.var.data.ps, class_admin.cons.pub_id[class_admin.var.data.ver], val[class_admin.cons.pub_id[class_admin.var.data.ver]]);
            indizable = class_utils.filter_prop(indizable, 'setting_name', 'title');
            var coincide_titulo = false;
            $.each(class_admin.cons.er.titulo_completo, function(i_er, val_er){
                $.each(indizable, function(i_tit, val_tit){
                    try{
                        if( val_er.test(val_tit.setting_value.toLowerCase().trim()) ){
                            coincide_titulo = true;
                            return false;
                        }
                    }catch(e){

                    }
                });
            });

            if(!coincide_titulo){
                //Si existe la propiedad versión se tomará la mayor
                if('version' in val){
                    if(val.version == num_envios[num_envios.length-1].version){
                        if( arr_ids_issue.indexOf(val[class_admin.cons.pub_id[class_admin.var.data.ver]]) !== -1){
                            arr_id_pubs.push(val[class_admin.cons.pub_id[class_admin.var.data.ver]]);
                            publicaciones.push(val);
                        }
                    }
                }else{
                    if( arr_ids_issue.indexOf(val[class_admin.cons.pub_id[class_admin.var.data.ver]]) !== -1){
                        arr_id_pubs.push(val[class_admin.cons.pub_id[class_admin.var.data.ver]]);
                        publicaciones.push(val);
                    }
                }
            }
        });

        console.log(arr_id_pubs);
        console.log(publicaciones);

        //Publicaciones en issue
        var publicaciones_ajustes = '';
        var publicaciones_ajustes = class_utils.filter_prop_arr(class_admin.var.data.ps, class_admin.cons.pub_id[class_admin.var.data.ver], arr_id_pubs);

        class_admin.var.registros.idioma_principal = class_admin.var.data.j[0].primary_locale;
        class_admin.var.registros.editor = class_utils.find_prop(class_admin.var.data.js, 'setting_name', 'publisherInstitution').setting_value;
        class_admin.var.registros.doc = [];

        console.log(publicaciones_ajustes);

        $.each(publicaciones, function(i,val){
            var ps = class_utils.filter_prop(publicaciones_ajustes, class_admin.cons.pub_id[class_admin.var.data.ver], val[class_admin.cons.pub_id[class_admin.var.data.ver]]);
            var doc = {};

            doc.base = class_admin.var.revista[1].trim();
            doc.pais = class_admin.var.revista[6].trim();
            doc.issn = class_admin.var.revista[5].trim();
            doc.revista = class_admin.var.revista[0].trim();
            doc.institucion_editora = class_admin.var.revista[8].trim();
            doc.ciudad_editora = class_admin.var.revista[7].trim();
            doc.fecha_publicacion = anio.trim();
            doc.disciplina = class_admin.var.revista[2].trim();

            var doi = '';
            if( class_admin.var.data.ver == '2.3.0' ){
                if( [null, '', undefined].indexOf(val['doi']) == -1 ){
                    doi = val['doi'];
                }
            }else{
                var val_doi = class_utils.find_prop(ps, 'setting_name', 'pub-id::doi');
                if ( val_doi !== undefined ){
                    if( [null, '', undefined].indexOf(val_doi['setting_value']) == -1 ){
                        doi = val_doi.setting_value;
                    }
                }
            }
            doc.doi = doi.trim();

            //Revisa el idioma del documento, si no está especificado, toma el principal de la revista
            if('locale' in val)
                doc.locale = ( [null, '', undefined].indexOf(val['locale']) == -1 )?val['locale']:class_admin.var.registros.idioma_principal;
            else{
                var locale_ss = class_utils.filter_prop(data_ss, class_admin.cons.pub_id[class_admin.var.data.ver], val[class_admin.cons.pub_id[class_admin.var.data.ver]]).locale;
                if( [null, '', undefined].indexOf(locale_ss) == -1  )
                    doc.locale = locale_ss
                else
                    doc.locale = class_admin.var.registros.idioma_principal;

            }

            doc.idioma = class_admin.cons.idiomas[doc.locale];

            var titulo = class_utils.filter_prop(ps, 'setting_name', 'title');
            var arr_titulo = [];
            $.each(titulo, function(i2, val2){
                var obj = {};
                var prefix = class_utils.filter_prop(ps, 'setting_name', 'prefix');
                prefix = class_utils.filter_prop(prefix, 'locale', val2['locale']);
                if(prefix.length > 0){
                    prefix = prefix[0].setting_value;
                }else{
                    prefix = undefined;
                }

                if( val2['locale'] == doc.locale || val2['locale'].indexOf(doc.locale) !== -1 ){
                    doc.titulo_original = class_utils.cleanHtml(val2['setting_value']);
                    if(['', undefined, null].indexOf(prefix) == -1){
                        doc.titulo_original = prefix + ' ' + doc.titulo_original;
                    }
                    if(doc.idioma == undefined){
                        doc.idioma = class_admin.cons.idiomas[val2['locale']];
                    }
                    //doc.titulo_original = val2['setting_value'].replace(/<[^>]+>/g, '').trim();
                }else{
                    obj.titulo = class_utils.cleanHtml(val2['setting_value']);
                    if(['', undefined, null].indexOf(prefix) == -1){
                        obj.titulo = prefix + ' ' + obj.titulo;
                    }
                    obj.idioma = class_admin.cons.idiomas[val2['locale']];
                }
                if ('idioma' in obj && obj.titulo !== '')
                    arr_titulo.push(obj);
            });

            doc.titulo = arr_titulo;

            var resumen = class_utils.filter_prop(ps, 'setting_name', 'abstract');
            var arr_resumen = [];
            var arr_idioma = [];
            $.each(resumen, function(i, val){
                var obj = {};
                obj.resumen = class_utils.cleanHtml(val['setting_value']);
                obj.idioma = class_admin.cons.idiomas[val.locale];
                if( 'resumen' in obj && obj.resumen !== ''){
                    arr_resumen.push(obj);
                    arr_idioma.push(obj.idioma);
                }
            });

            doc.resumen = arr_resumen;
            doc.idioma_resumen = (arr_idioma.indexOf('Español') !== -1)?'Español':'';
            doc.idioma_resumen += (arr_idioma.indexOf('Portugués') !== -1)?(doc.idioma_resumen != '')?', portugués':'Portugués':'';
            doc.idioma_resumen += (arr_idioma.indexOf('Inglés') !== -1)?(doc.idioma_resumen != '')?', inglés':'Inglés':'';

            doc.anio = anio.trim();
            if(['', undefined, null, '0'].indexOf(vol) !== -1){
                doc.volumen = 's/v'
            }else{
                doc.volumen = (class_admin.cons.er.letra.test(vol.trim()))?'':'V' + vol.trim();
            }
            doc.numero = (class_admin.cons.er.letra.test(num.trim()))?'':'N' + num.trim();
            doc.parte = ( num.toUpperCase().indexOf('ESPECIAL') !== -1)?'especial':'';
            doc.mes = '';
            doc.refs = 'Refs.';
            if ( ['2.3.0', '2.4.0', '3.1.2', '3.0.0'].indexOf(class_admin.var.data.ver) != -1 ){
                doc.paginas = val['pages'].trim();
            }else{
                var tmp = class_utils.find_prop(ps, 'setting_name', 'pages');
                if(tmp !== undefined){
                    doc.paginas = tmp['setting_value'].trim();
                }else{
                    doc.paginas = '';
                }
            }

            var arr_palabras_clave = [];
            var obj_palabras_clave = [];
            //palabras clave
            if ( ['3.3.0.11', '3.3.0', '3.2.0', '3.1.2', '3.0.0'].indexOf(class_admin.var.data.ver) != -1 ){
                arr_palabras_clave = class_utils.filter_prop(class_admin.var.data.c_v_e_s, 'assoc_id', val[class_admin.cons.pub_id[class_admin.var.data.ver]]);
                $.each(arr_palabras_clave, function(i2, val2){
                    if( obj_palabras_clave[val2.locale] == undefined){
                        obj_palabras_clave[val2.locale] = [];
                    }
                    var arr_palabras_clave2 = val2.setting_value.split(';');
                    $.each(arr_palabras_clave2, function(i3, val3){
                        obj_palabras_clave[val2.locale].push(val3.trim());
                    });
                });
                doc.palabras_clave = obj_palabras_clave['es_ES'];
                doc.keywords = obj_palabras_clave['en_US'];
            }

            if ( ['2.3.0', '2.4.0'].indexOf(class_admin.var.data.ver) != -1 ){
                var arr_palabras_clave = class_utils.filter_prop(ps, 'setting_name', 'subject');
                $.each(arr_palabras_clave, function(i2, val2){
                    //Si no hay valor en locale, asigna las palabras clave en el idioma principal de la revista
                    var locale = class_admin.var.registros.idioma_principal;
                    if(['', undefined, null].indexOf(val2.locale) == -1){
                        locale = val2.locale;
                    }
                    if( obj_palabras_clave[locale] == undefined){
                        obj_palabras_clave[locale] = [];
                    }
                    obj_palabras_clave[locale] = obj_palabras_clave[locale].concat(val2.setting_value.split(';')); 
                });
                doc.palabras_clave = obj_palabras_clave['es_ES'];
                doc.keywords = obj_palabras_clave['en_US'];
            }

            //texto completo
            if ( ['3.3.0.11', '3.3.0', '3.2.0', '3.1.2', '3.0.0'].indexOf(class_admin.var.data.ver) != -1 ){
                var textos = class_utils.filter_prop(class_admin.var.data.pg, class_admin.cons.pub_id[class_admin.var.data.ver], val[class_admin.cons.pub_id[class_admin.var.data.ver]]);

                //Filtro por idioma, pero puede variar y no encontrarlo
                //textos = class_utils.filter_prop(textos, 'locale', doc.locale);

                $.each(textos, function(i2, val2){
                    var tipo = val2['label'].toLowerCase();
                    if( tipo.indexOf('pdf') !== -1){
                        doc.textoPDF = class_admin.var.revista[9].replace('oai', 'article/view') + '/' + val[class_admin.cons.pub_id_file[class_admin.var.data.ver]] + '/' + val2['galley_id'];
                    }
                    if( tipo.indexOf('html') !== -1){
                        doc.textoHTML = class_admin.var.revista[9].replace('oai', 'article/view') + '/' + val[class_admin.cons.pub_id_file[class_admin.var.data.ver]] + '/' + val2['galley_id'];
                    }
                });
            }

            if ( ['2.3.0', '2.4.0'].indexOf(class_admin.var.data.ver) != -1 ){
                var textos = class_utils.filter_prop(class_admin.var.data.pg, class_admin.cons.pub_id[class_admin.var.data.ver], val[class_admin.cons.pub_id[class_admin.var.data.ver]]);
                textos = class_utils.filter_prop(textos, 'locale', val['locale']);

                $.each(textos, function(i2, val2){
                    var tipo = val2['label'].toLowerCase();
                    if( tipo.indexOf('pdf') !== -1){
                        doc.textoPDF = class_admin.var.revista[9].replace('oai', 'article/view') + '/' + val[class_admin.cons.pub_id[class_admin.var.data.ver]] + '/' + val2['galley_id'];
                    }
                    if( tipo.indexOf('html') !== -1){
                        doc.textoHTML = class_admin.var.revista[9].replace('oai', 'article/view') + '/' + val[class_admin.cons.pub_id[class_admin.var.data.ver]] + '/' + val2['galley_id'];
                    }
                });
            }

            doc.autores = [];
            var instituciones = [];

            //Autores
            var id_autores = class_utils.filter_prop( class_admin.var.data.a, class_admin.cons.pub_id_auth[class_admin.var.data.ver], val[class_admin.cons.pub_id[class_admin.var.data.ver]]);
            //Para detectar si la secuencia de autores inicia en cero o en uno
            var id_cero = false;
            //arreglo de secuencias para saber si existe alguna repetida
            var seqs = [];
            var num_repetidos = [];
            $.each(id_autores, function(i2, val2){
                if( parseInt(val2['seq']) == 0){
                    id_cero = true;
                }
                if( seqs.indexOf(val2['seq']) == -1 ){
                    seqs.push(val2['seq']);
                    num_repetidos[parseInt(val2['seq'])] = 0;
                    val2.suma = 0;
                }else{
                    num_repetidos[parseInt(val2['seq'])] ++;
                    val2.suma = num_repetidos[parseInt(val2['seq'])];
                }
            });
            seqs.sort();
            console.log(id_autores);
            $.each(id_autores, function(i2, val2){
                var as = class_utils.filter_prop(class_admin.var.data.as, 'author_id', val2['author_id']);
                var obj = {};
                var id = seqs.indexOf(val2['seq']) + 1;
                if ( id_cero ){
                    //obj.id = i2 +1;
                    var suma = 0;
                    for(var s = parseInt(val2['seq'])-1; s >= 0; s--){
                        if(num_repetidos[s] !== undefined){
                            suma += num_repetidos[s];
                        }
                    }
                    console.log(id);
                    console.log(val2.suma);
                    console.log(suma);
                    obj.id = id + val2.suma + suma;
                }else{
                    var suma = 0;
                    for(var s = parseInt(val2['seq'])-1; s > 0; s--){
                        if(num_repetidos[s] !== undefined){
                            suma += num_repetidos[s];
                        }
                    }
                    console.log(id);
                    console.log(val2.suma);
                    console.log(suma);
                    obj.id = id + val2.suma + suma;
                }
                obj.mail = val2['email'].trim();
                //Si en el url encuentra la palabra orcid
                if('url' in val2){
                    if([undefined, null, ''].indexOf(val2['url']) == -1){
                        obj.orcid = (val2['url'].indexOf('orcid') == -1)?'':val2['url'].trim();
                    }else{
                        obj.orcid = '';
                    }
                }else{
                    obj.orcid = '';
                }

                //Si no encotró en el campo de url el orcid
                if( obj.orcid == '' ){
                    //Revisa primero si existe el campo 'url'
                    var tmp_as = class_utils.filter_prop(as, 'setting_name', 'url');
                    if(tmp_as.length >0){
                        var tmp = class_utils.find_prop(tmp_as, 'locale', val['locale']);
                        tmp = (tmp == undefined)?class_utils.find_prop(tmp_as, 'locale', class_admin.var.registros.idioma_principal):tmp;
                        tmp = (tmp == undefined)?tmp_as[0]['setting_value']:'';
                        obj.orcid = tmp.trim();
                    }else{
                        obj.orcid = '';
                    }

                    //Si el orcid sigue vacío o la url no contiene la palabra 'orcid'
                    if(obj.orcid == '' || obj.orcid.indexOf('orcid') == -1){
                        var tmp_as = class_utils.filter_prop(as, 'setting_name', 'orcid');
                        if(tmp_as.length >0){
                            var tmp = class_utils.find_prop(tmp_as, 'locale', val['locale']);
                            tmp = (tmp == undefined)?class_utils.find_prop(tmp_as, 'locale', class_admin.var.registros.idioma_principal):tmp;
                            tmp = (tmp == undefined)?tmp_as[0]['setting_value']:'';
                            obj.orcid = tmp.trim();
                        }else{
                            obj.orcid = '';
                        }
                    }
                }

                obj.orcid = obj.orcid.replace('https://orcid.org/', '').replace('http://orcid.org/', '');

                if ( ['2.3.0', '2.4.0', '3.0.0'].indexOf(class_admin.var.data.ver) != -1 ){
                    obj.apellido = class_utils.cleanHtml(val2['last_name']);
                    obj.nombre = class_utils.cleanHtml(val2['first_name']);
                    obj.nombre += (val2['middle_name'].trim() == '')?'':' ' + class_utils.cleanHtml(val2['middle_name']);
                    obj.nombre = obj.apellido + ', ' + obj.nombre;
                }else{
                    var tmp='';
                    var tmp2='';
                    var tmp_as = class_utils.filter_prop(as, 'setting_name', 'familyName');
                    if(tmp_as.length >0){
                        tmp = class_utils.find_prop(tmp_as, 'locale', val['locale']);
                        tmp = (tmp == undefined)?class_utils.find_prop(tmp_as, 'locale', class_admin.var.registros.idioma_principal):tmp;
                        tmp = (tmp == undefined)?tmp_as[0]['setting_value']:tmp['setting_value'];
                        obj.apellido = class_utils.cleanHtml(tmp);
                    }else{
                        obj.apellido = '';
                    }

                    var tmp2_as = class_utils.filter_prop(as, 'setting_name', 'givenName');
                    if(tmp2_as.length >0){
                        tmp2 = class_utils.find_prop(tmp2_as, 'locale', val['locale']);
                        tmp2 = (tmp2 == undefined)?class_utils.find_prop(tmp2_as, 'locale', class_admin.var.registros.idioma_principal):tmp2;
                        tmp2 = (tmp2 == undefined)?tmp2_as[0]['setting_value']:tmp2['setting_value'];
                        obj.nombre = obj.apellido + ', ' + class_utils.cleanHtml(tmp2);
                    }else{
                        obj.nombre = '';
                    }
                }

                var tmp='';
                tmp_as = class_utils.filter_prop(as, 'setting_name', 'affiliation');
                if(tmp_as.length >0){
                    tmp = class_utils.find_prop(tmp_as, 'locale', val['locale']);
                    tmp = (tmp == undefined)?class_utils.find_prop(tmp_as, 'locale', class_admin.var.registros.idioma_principal):tmp;
                    tmp = (tmp == undefined)?tmp_as[0]['setting_value']:tmp['setting_value'];
                    obj.institucion = class_utils.cleanHtml(tmp);
                    if([null, '', undefined].indexOf(obj.institucion) == -1){
                        if( instituciones.indexOf(obj.institucion) == -1){
                            instituciones.push(obj.institucion);
                        }
                        obj.id_inst = instituciones.indexOf(obj.institucion)+1;
                    }
                }else{
                    obj.institucion = '';
                }

                doc.autores.push(obj);
                doc.fechaIngreso = (new Date()).getFullYear()+'-'+((new Date()).getMonth()+1)+'-'+((new Date()).getDate()+'').padStart(2,'0');
            });

            class_admin.var.registros.doc.push(doc);
        });
        /*console.log(class_admin.data_inserta_article());*/
        $.ajax({
                    type: 'POST',
                    url: "<?=site_url('metametrics/ws_insert');?>",
                    data: class_admin.data_inserta_article(),
            }).done(function() {
                    loading.end();
                    $('#mensajeFin').html('<b>Se han ingresado correctamente ' + class_admin.var.registros.doc.length + ' documentos.</b>');
                    console.log('done');
            }).fail(function(){
                    loading.end();
                    $('#mensajeFin').html('<b>Ocurrió un error al intentar guardar los documentos.</b>');
                    console.log('fail');
            });

    },
    data_inserta_article: function(){
        var data = {};
        var data_int = [];
        var columns = ['revista', 'articulo', 'issn', 'doi', 'paisRevista', 'anioRevista', 'disciplinaRevista'];
        $.each(class_admin.var.registros.doc, function(i,val){
            var obj = {};
            var objDes = {};
            var arrArt = [];
            var objRes = {};
            var arrURL = [];
            $.each(val.titulo, function(i,val){
                arrArt.push({a: val.titulo, y: class_admin.cons.idiomasTit[val.idioma]});
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
                objRes[class_admin.cons.idiomasRes[val.idioma]] = val.resumen;
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
    }
};

$(class_admin.ready);



