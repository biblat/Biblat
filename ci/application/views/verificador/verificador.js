/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class_ver = {
    cons:{
        get_oai: '/verificador/get_oai?oai=<oai>&years=<years>',
        get_issn: '/verificador/get_data_by_issn?issn=<issn>',
        idiomas: {
                'es_ES' : 'Español',
                'en_US' : 'Inglés',
                'pt_BR' : 'Portugués'
            },
        pub_id: {
            '3.2.0': 'publication_id',
            '3.1.2': 'submission_id',
            '2.4.0': 'article_id',
            '2.3.0': 'article_id'
        },
        er: {
            'mayus2' : /^[A-Z]*.*[A-Z]{3}.*[A-Z]+$/,
        }
    },
    var:{
        data: '',
        salida: {},
        suficiencia_promedio: 0
    },
    salida: function(msj){
      class_ver.var.salida += msj+'\n';
    },
    ready:function(){
        class_ver.control();
        console.log('Ready');
        //$('#url_oai').val('http://revistafacesa.senaaires.com.br/index.php/revisa/oai'); //2.3
        //$('#url_oai').val('https://revistacientifica.uamericana.edu.py/index.php/academo/oai'); //3.3
        //$('#url_oai').val('https://revistas.ulasalle.edu.pe/innosoft/oai'); //3.1
        $('#url_oai').val('https://bibliographica.iib.unam.mx/index.php/RB/oai'); //2.4
        //$('#url_oai').val('https://revistas.anahuac.mx/the_anahuac_journal/oai'); //3.2
        //$('#url_oai').val('https://revistas.uned.ac.cr/index.php/espiga/oai'); //3.2
        //$('#url_oai').val('https://rpi.isri.cu/rpi/oai');
        //$('#url_oai').val('https://revistascientificas.una.py/index.php/rdgic/oai');//3.3
        
    },
    control:function(){
        $('#btn_verificar').on('click',function(){
            loading.start();
            $('#container').html('');
            $('#autores').html('');
            $('#container2').html('');
            $('#documentos').html('');
            $('#container3').html('');
            $('#dois').html('');
            $('#container4').html('');
            $('#promedio').html('');
            $('#containerp').html('');
            $('#informacion').hide();
            var url = $('#url_oai').val();
            var years = '1900-' + (new Date()).getFullYear();
            url = class_ver.cons.get_oai.replace('<oai>', url).replace('<years>', years);
    
            $.when(
                class_utils.getResource(url)
            )
            .then(function(resp){
                loading.end();
                $('#informacion').show();
                class_ver.var.data = resp;
                //revista
                try{
                    var revista = class_utils.find_prop(class_ver.var.data.js, 'setting_name', 'title').setting_value;
                }catch(e){
                    var revista = class_utils.find_prop(class_ver.var.data.js, 'setting_name', 'name').setting_value;
                }
                //issn
                try{
                    var issn = class_utils.find_prop(class_ver.var.data.js, 'setting_name', 'printIssn').setting_value;
                }catch(e){
                    var issn = 'No especificado';
                }
                //eissn
                var eissn = class_utils.find_prop(class_ver.var.data.js, 'setting_name', 'onlineIssn').setting_value;
                //entidadEditora
                var editor = class_utils.find_prop(class_ver.var.data.js, 'setting_name', 'publisherInstitution').setting_value;
                //idioma
                var idioma = '';
                var idioma_principal = class_ver.var.data.j[0].primary_locale;
                if( idioma_principal.indexOf('es_') !== -1 )
                    idioma = 'Español';
                else if( idioma_principal.indexOf('pt_') !== -1 )
                    idioma = 'Portugués';
                else if( idioma_principal.indexOf('en_') !== -1 )
                    idioma = 'Inglés';
                
                $('#revista').html(revista);
                $('#issni').html( (issn == '')?'No especificado':issn );
                $('#issne').html( (eissn == '')?'No especificado':eissn );
                $('#editor').html( (editor == '')?'No especificado':editor );
                $('#idiomap').html( (idioma == '')?'No especificado':idioma );
                
                class_ver.verifica_valor('editor', editor);
                
                if(issn != ''){
                    url = class_ver.cons.get_issn.replace('<issn>', issn);
                    $.when(
                        class_utils.getResource(url)
                    )
                    .then(function(resp){
                        $('#revistai').html(resp.titulo);
                        if($('#pais').text() == '')
                            $('#pais').html(resp.pais);
                
                        class_ver.verifica_valor('issni', resp.titulo);
                        class_ver.verifica_valor('revistai', revista, resp.titulo);
                        
                    });
                }
                
                if(eissn != ''){
                    url = class_ver.cons.get_issn.replace('<issn>', eissn);
                    $.when(
                        class_utils.getResource(url)
                    )
                    .then(function(resp){
                        $('#revistae').html(resp.titulo);
                        $('#url').html(resp.url);
                        if($('#pais').text() == '')
                            $('#pais').html(resp.pais);
                
                        class_ver.verifica_valor('issne', resp.titulo);
                        class_ver.verifica_valor('url', resp.url);
                        class_ver.verifica_valor('revistae', revista, resp.titulo);
                        
                    });
                }
                
                //idiomas en envíos
                var idiomas = class_utils.find_prop(class_ver.var.data.js, 'setting_name', 'supportedSubmissionLocales').setting_value;
                idiomas = idiomas.split('"');
                var idiomas_envio = [];
                var s_idiomas_envio = '';
                $.each(idiomas, function(i,val){
                    if (val.indexOf('_') !== -1){
                        idiomas_envio.push(val);
                        s_idiomas_envio += ( (s_idiomas_envio == '')?'':', ' ) + class_ver.cons.idiomas[val];
                    }
                });
                $('#idiomas').html( (s_idiomas_envio == '')?'No especificado':s_idiomas_envio );
                
                //Intercambio de valores en las tablas de opciones de envíos y en publicaciones
                if (class_ver.var.data.ver == '3.1.2'){
                    var temp = JSON.parse(JSON.stringify(class_ver.var.data.ss));
                    class_ver.var.data.ss = JSON.parse(JSON.stringify(class_ver.var.data.p))
                    class_ver.var.data.p = temp;
                }
        
                //total de publicaciones
                var publicaciones = class_utils.filter_prop(class_ver.var.data.p, 'status', '3');
                
                var arr_id_pubs = [];
                //id's de las publicaciones
                $.each(publicaciones, function(i,val){
                    if (class_ver.var.data.ver == '3.2.0'){
                        arr_id_pubs.push(val.publication_id);
                    }else if (class_ver.var.data.ver == '3.1.2'){
                        arr_id_pubs.push(val.submission_id);
                    }else{
                        arr_id_pubs.push(val.article_id);
                    }
                });
                
                //Búsqued ajustes publicaciones
                var publicaciones_ajustes = '';
                if (class_ver.var.data.ver == '3.2.0'){
                    publicaciones_ajustes = class_utils.filter_prop_arr(class_ver.var.data.ps, 'publication_id', arr_id_pubs);
                }else if (class_ver.var.data.ver == '3.1.2'){
                    publicaciones_ajustes = class_utils.filter_prop_arr(class_ver.var.data.ps, 'submission_id', arr_id_pubs);
                }else{
                    publicaciones_ajustes = class_utils.filter_prop_arr(class_ver.var.data.ps, 'article_id', arr_id_pubs);
                }
                
                var arr_palabras_clave = [];
                var obj_palabras_clave = [];
                
                //palabras clave
                if ( ['3.2.0', '3.1.2'].indexOf(class_ver.var.data.ver) != -1 ){
                    arr_palabras_clave = class_utils.filter_prop_arr(class_ver.var.data.c_v_e_s, 'assoc_id', arr_id_pubs);
                    $.each(arr_palabras_clave, function(i, val){
                        if( obj_palabras_clave[val.locale] == undefined){
                            obj_palabras_clave[val.locale] = [];
                        }else{
                            if(obj_palabras_clave[val.locale][val.assoc_id] == undefined){
                                obj_palabras_clave[val.locale][val.assoc_id] = val.setting_value;
                            }else{
                                obj_palabras_clave[val.locale][val.assoc_id] += ';' + val.setting_value;
                            }
                        }
                    });
                }
                
                //pubs con DOI
                var publicaciones_doi = '';
                if (class_ver.var.data.ver == '2.3.0'){
                    publicaciones_doi = class_utils.filterdiff_prop(publicaciones, 'doi', [null, '', undefined]);
                }else{
                    publicaciones_doi = class_utils.filter_prop(publicaciones_ajustes, 'setting_name', 'pub-id::doi');
                    publicaciones_doi = class_utils.filterdiff_prop(publicaciones_doi, 'setting_value', [null, '', undefined]);
                }
                
                var res_dois = [];
                var publicaciones_doi_total = JSON.parse(JSON.stringify(publicaciones_doi));
                publicaciones_doi = class_ver.valida_dois(publicaciones_doi, res_dois);
                
                //pubs con paginas
                var publicaciones_pags = class_utils.filterdiff_prop(publicaciones, 'pags', [null, '']);
                
                
                var titulos = [];
                var titulos_valor = [];
                var titulos_mayus2 = [];
                var titulos_idioma1 = [];
                var titulos_idioma2 = [];
                var resumenes = [];
                var resumenes_valor = [];
                var resumenes_mayus2 = [];
                var resumenes_idioma1 = [];
                var resumenes_idioma2 = [];
                var palabras_clave_idioma1 = [];
                var palabras_clave_idioma2 = [];
                var palabras_clave = [];
                var palabras_clave_valor = [];
                var palabras_clave_cinco = [];
                var enlaces = [];
                var enlaces_total = [];
                
                $.each(idiomas_envio, function(i,val){
                    var obj = class_utils.filter_prop_arr(publicaciones_ajustes, 'setting_name', 'title');
                    obj = class_utils.filter_prop_arr(obj, 'locale', val);
                    titulos[val] = obj;
                    titulos_valor[val] = class_utils.filterdiff_prop(obj, 'setting_value', [null, '']);
                    titulos_mayus2[val] = class_utils.filter_prop_er(titulos_valor[val], 'setting_value', class_ver.cons.er.mayus2);
                    
                    //Si es el idioma principal llena el arreglo que contienen los ids de titulos en ese idioma
                    if(val == idioma_principal){
                        $.each(titulos[val],function(i2, val2){
                            if( titulos_idioma1.indexOf(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]) == -1 )
                                titulos_idioma1.push(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]);
                        });
                    //Si es en otro idioma llena el arreglo que contiene los ids de titulos en algún otro idioma
                    }else{
                        $.each(titulos[val],function(i2, val2){
                            if( titulos_idioma2.indexOf(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]) == -1 )
                                titulos_idioma2.push(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]);
                        });
                    }
                    
                    var obj2 = class_utils.filter_prop(publicaciones_ajustes, 'setting_name', 'abstract');
                    obj2 = class_utils.filter_prop_arr(obj2, 'locale', val);
                    resumenes[val] = obj2;
                    resumenes_valor[val] = class_utils.filterdiff_prop(obj2, 'setting_value', [null, '']);
                    resumenes_mayus2[val] = class_utils.filter_prop_er(resumenes_valor[val], 'setting_value', class_ver.cons.er.mayus2);
                    
                    //revisión primer idioma
                    if(val == idioma_principal){
                        $.each(resumenes[val],function(i2, val2){
                            if( resumenes_idioma1.indexOf(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]) == -1 )
                                resumenes_idioma1.push(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]);
                        });
                    }else{
                        $.each(resumenes[val],function(i2, val2){
                            if( resumenes_idioma2.indexOf(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]) == -1 )
                                resumenes_idioma2.push(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]);
                        });
                    }
                    
                    /*
                    //revisión primer idioma
                    if(i == 0){
                        $.each(titulos[val],function(i2, val2){
                            if( titulos_idioma1.indexOf(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]) == -1 )
                                titulos_idioma1.push(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]);
                        });
                    }
                    //revisión segundo idioma
                    if(i == 1){
                        $.each(titulos[val],function(i2, val2){
                            if( titulos_idioma1.indexOf(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]) != -1 )
                                titulos_idioma2.push(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]);
                        });
                    }
                    
                    var obj2 = class_utils.filter_prop(publicaciones_ajustes, 'setting_name', 'abstract');
                    obj2 = class_utils.filter_prop_arr(obj2, 'locale', val);
                    resumenes[val] = obj2;
                    resumenes_valor[val] = class_utils.filterdiff_prop(obj2, 'setting_value', [null, '']);
                    resumenes_mayus2[val] = class_utils.filter_prop_er(resumenes_valor[val], 'setting_value', class_ver.cons.er.mayus2);
                    
                    //revisión primer idioma
                    if(i == 0){
                        $.each(resumenes[val],function(i2, val2){
                            if( resumenes_idioma1.indexOf(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]) == -1 )
                                resumenes_idioma1.push(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]);
                        });
                    }
                    //revisión segundo idioma
                    if(i == 1){
                        $.each(resumenes[val],function(i2, val2){
                            if( resumenes_idioma1.indexOf(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]) != -1 )
                                resumenes_idioma2.push(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]);
                        });
                    }
                    */
                   
                    var filter = function(obj){
                        return obj.filter(function(obj2){
                            obj2 = obj2.setting_value.split(';');
                            return obj2.length >= 5;
                        });
                    };
                    
                    var filter2 = function(obj){
                        return obj.filter(function(obj2){
                            obj2 = obj2.split(';');
                            return obj2.length >= 5;
                        });
                    };
                    
                    var filter3 = function(obj){
                        return obj.filter(function(obj2){
                            return obj2 != undefined;
                        });
                    };
                    
                    if ( ['2.3.0', '2.4.0'].indexOf(class_ver.var.data.ver) != -1 ){
                        var obj3 = class_utils.filter_prop(publicaciones_ajustes, 'setting_name', 'subject');
                        obj3 = class_utils.filter_prop_arr(obj3, 'locale', val);
                        palabras_clave[val] = obj3;
                        
                        if(val == idioma_principal){
                            $.each(palabras_clave[val],function(i2, val2){
                                if( palabras_clave_idioma1.indexOf(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]) == -1 )
                                    palabras_clave_idioma1.push(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]);
                            });
                        }else{
                            $.each(palabras_clave[val],function(i2, val2){
                                if( palabras_clave_idioma2.indexOf(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]) == -1 )
                                    palabras_clave_idioma2.push(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]);
                            });
                        }
                        palabras_clave_idioma1 = class_utils.filterdiff_prop(palabras_clave_idioma1, 'setting_value', [null, '']);
                        palabras_clave_idioma2 = class_utils.filterdiff_prop(palabras_clave_idioma2, 'setting_value', [null, '']);
                        
                        palabras_clave_valor[val] = class_utils.filterdiff_prop(obj3, 'setting_value', [null, '']);
                        palabras_clave_cinco[val] = filter(palabras_clave_valor[val]);
                    }else{
                        palabras_clave[val] = filter3(obj_palabras_clave[val]);
                        if(val == idioma_principal){
                            palabras_clave_idioma1 = palabras_clave[val];
                        }else{
                            $.each(palabras_clave[val],function(i2, val2){
                                if( val2 != undefined ){
                                    if( palabras_clave_idioma2.indexOf(i2) == -1)
                                        palabras_clave_idioma2.push(i2);
                                }
                            });
                        }
                        palabras_clave_valor[val] = palabras_clave[val];
                        palabras_clave_cinco[val] = filter2(palabras_clave_valor[val]);
                    }

                    /*
                    if ( ['2.3.0', '2.4.0'].indexOf(class_ver.var.data.ver) != -1 ){
                        var obj3 = class_utils.filter_prop(publicaciones_ajustes, 'setting_name', 'subject');
                        obj3 = class_utils.filter_prop_arr(obj3, 'locale', val);
                        palabras_clave[val] = obj3;
                        palabras_clave_valor[val] = class_utils.filterdiff_prop(obj3, 'setting_value', [null, '']);
                        palabras_clave_cinco[val] = filter(palabras_clave_valor[val]);
                    }else{
                        palabras_clave[val] = filter3(obj_palabras_clave[val]);
                        palabras_clave_valor[val] = palabras_clave[val];
                        palabras_clave_cinco[val] = filter2(palabras_clave_valor[val]);
                    }*/
                });
                
                //Enlaces
                enlaces = class_ver.var.data.pg;
                $.each(enlaces, function(i2, val2){
                    if( arr_id_pubs.indexOf(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]) !== -1 ){
                        if( enlaces_total.indexOf(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]) == -1 ){
                            enlaces_total.push(val2[class_ver.cons.pub_id[class_ver.var.data.ver]]);
                        }
                    }
                });
                
                //Búsqueda de autores 1691
                var autores = '';
                if (class_ver.var.data.ver == '3.2.0'){
                    autores = class_utils.filter_prop_arr(class_ver.var.data.a, 'publication_id', arr_id_pubs);
                }else{
                    autores = class_utils.filter_prop_arr(class_ver.var.data.a, 'submission_id', arr_id_pubs);
                }
                    
                var arr_id_autores = [];
                //id's de las publicaciones
                $.each(autores, function(i,val){
                    //if (class_ver.var.data.ver == '3.2.0'){
                        arr_id_autores.push(val.author_id);
                    //}
                });
                
                var autores_s = '';
                //if (class_ver.var.data.ver == '3.2.0'){
                    autores_s = class_utils.filter_prop_arr(class_ver.var.data.as, 'author_id', arr_id_autores);
                //}
                //Autores con nombre 1691
                var autores_nombre = '';
                var autores_nombre_id = [];
                if ( ['3.2.0', '3.1.2'].indexOf(class_ver.var.data.ver) !== -1 ){
                    autores_nombre = class_utils.filter_prop_arr_or(autores_s, ['setting_name'], [["givenName", "familyName"]]);
                    autores_nombre = class_utils.filter_prop_arr_or(autores_nombre, ['locale'], [[idioma_principal]]);
                    autores_nombre = class_utils.filterdiff_prop(autores_nombre, 'setting_value', [null, '', undefined]);
                    $.each(autores_nombre, function(i,val){
                        if( autores_nombre_id.indexOf(val['author_id']) == -1 ){
                            autores_nombre_id.push(val['author_id']);
                        }
                    });
                }else{
                    autores_nombre = class_utils.filterdiff_prop_or(autores, ['first_name', 'last_name'], [[null, '', undefined], [null, '', undefined]]);
                    autores_nombre_id = autores_nombre;
                }
                var autores_apellido = [];
                /*
                if ( ['3.2.0', '3.1.2'].indexOf(class_ver.var.data.ver) !== -1 ){
                    autores_nombre = class_utils.filter_prop_arr_or(autores_s, ['setting_name'], [["givenName"]]);
                    autores_nombre = class_utils.filter_prop_arr_or(autores_nombre, ['locale'], [[idioma_principal]]);
                    autores_nombre = class_utils.filterdiff_prop(autores_nombre, 'setting_value', [null, '', undefined]);
                }else{
                    autores_nombre = class_utils.filterdiff_prop(autores, 'first_name', [null, '', undefined]);
                }
                //Autores con apellido 1691
                var autores_apellido = '';
                if ( ['3.2.0', '3.1.2'].indexOf(class_ver.var.data.ver) !== -1 ){
                    autores_apellido = class_utils.filter_prop_arr_or(autores_s, ['setting_name'], [["familyName"]]);
                    autores_apellido = class_utils.filter_prop_arr_or(autores_apellido, ['locale'], [[idioma_principal]]);
                    autores_apellido = class_utils.filterdiff_prop(autores_apellido, 'setting_value', [null, '', undefined]);
                }else{
                    autores_apellido = class_utils.filterdiff_prop(autores, 'last_name', [null, '', undefined]);
                }
                */
                
                //Autores con email 1691
                var autores_email = class_utils.filterdiff_prop(autores, 'email', [null, '', undefined]);
                
                //Autores con url = orcid
                var autores_url = class_utils.filterdiff_prop(autores, 'url', [null, '', undefined]);
                
                //Autores con orcid 0
                var autores_orcid_tmp = '';
                if ( ['3.2.0', '3.1.2'].indexOf(class_ver.var.data.ver) !== -1 ){
                    autores_orcid_tmp = class_utils.filter_prop_arr(autores_s, 'setting_name', "orcid");
                    autores_orcid_tmp = class_utils.filterdiff_prop(autores_orcid_tmp, 'setting_value', [null, '', undefined]);
                }else{
                    autores_orcid_tmp = class_utils.filterdiff_prop(autores, 'orcid', [null, '', undefined]);
                }
                
                var autores_orcid = [];
                //union autores url y orcid
                $.each(autores_url, function(i,val){
                    if(autores_orcid.indexOf(val.author_id) == -1)
                        autores_orcid.push(val.author_id);
                });
                $.each(autores_orcid_tmp, function(i,val){
                    if(autores_orcid.indexOf(val.author_id) == -1)
                        autores_orcid.push(val.author_id);
                });
                
                
                //Búsqueda de ajustes
                //Instituciones
                var instituciones = class_utils.filter_prop_arr(autores_s, 'setting_name', "affiliation");
                instituciones = class_utils.filter_prop_arr(instituciones, 'locale', idioma_principal);
                //Instituciones con valor
                var instituciones_valor = class_utils.filterdiff_prop(instituciones, 'setting_value', [null, '']);
                
                //issues
                var issues = class_utils.filter_prop(class_ver.var.data.i, 'published', '1');
                //anio
                var issues_anios = class_utils.filterdiff_prop(issues, 'year', [null, '', '0']);
                //volumen
                var issues_volumenes = class_utils.filterdiff_prop(issues, 'volume', [null, '', '0']);
                //number
                var issues_numeros = class_utils.filterdiff_prop(issues, 'number', [null, '', '0']);
                
                //Citas
                var citas = '';
                if ( ['2.3.0', '2.4.0', '3.1.2'].indexOf(class_ver.var.data.ver) != -1 ){
                    citas = class_utils.filterdiff_prop(publicaciones, 'citations', [null, '', undefined]);
                }else{
                    citas = class_utils.filter_prop(publicaciones_ajustes, 'setting_name', 'citationsRaw');
                    citas = class_utils.filterdiff_prop(citas, 'setting_value', [null, '', undefined]);
                }
                
                //Licencia
                var licencia = '';
                if ( ['2.3.0', '2.4.0', '3.1.2'].indexOf(class_ver.var.data.ver) != -1 ){
                    licencia = class_utils.filter_prop(publicaciones_ajustes, 'setting_name', 'licenseURL');
                    licencia = class_utils.filterdiff_prop(licencia, 'setting_value', [null, '', undefined]);
                }else{
                    licencia = class_utils.filter_prop(publicaciones_ajustes, 'setting_name', 'licenseUrl');
                    licencia = class_utils.filterdiff_prop(licencia, 'setting_value', [null, '', undefined]);
                }
                
                
                class_ver.var.salida.revista = revista;
                class_ver.var.salida.issn = issn;
                class_ver.var.salida.eissn = eissn;
                class_ver.var.salida.ip = idioma_principal;
                class_ver.var.salida.idioma = idioma;
                class_ver.var.salida.idiomas_envio = idiomas_envio;
                
                class_ver.var.salida.iss = issues;
                class_ver.var.salida.issav = issues_anios;
                class_ver.var.salida.issvv = issues_volumenes;
                class_ver.var.salida.issnv = issues_numeros;
                
                class_ver.var.salida.idp = arr_id_pubs;
                class_ver.var.salida.p = publicaciones;
                class_ver.var.salida.pd = publicaciones_doi;
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
                class_ver.var.salida.as = autores_s
                class_ver.var.salida.a = autores;
                class_ver.var.salida.an = autores_nombre_id;
                class_ver.var.salida.aa = autores_apellido;
                class_ver.var.salida.ae = autores_email;
                class_ver.var.salida.ao = autores_orcid;
                
                class_ver.var.salida.i = instituciones;
                class_ver.var.salida.iv = instituciones_valor;
                
                class_ver.var.salida.en = enlaces;
                class_ver.var.salida.ent = enlaces_total;
                
                class_ver.var.salida.lic = licencia;
                class_ver.var.salida.cit = citas;
                
                //class_ver.graficaIssues();
                class_ver.graficaAuth();
                class_ver.graficaDocs();
                class_ver.graficaProm();
            });
              
        });
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
        grafica.xAxis.categories = ['Autor', /*'Apellidos', */'Email', 'Orcid', 'Afiliación']
        
        var nombre = class_ver.var.salida.an.length / class_ver.var.salida.a.length * 100;
        //var apellido = class_ver.var.salida.aa.length / class_ver.var.salida.a.length * 100;
        var email = class_ver.var.salida.ae.length / class_ver.var.salida.a.length * 100;
        var orcid = class_ver.var.salida.ao.length / class_ver.var.salida.a.length * 100;
        var instituciones = class_ver.var.salida.iv.length / class_ver.var.salida.i.length * 100;
        
        class_ver.suficiencia_promedio = nombre + email + orcid + instituciones;
        
        var completos = [ 
                                (nombre == 100)?100:0,
                                //(apellido == 100)?100:0,
                                (email == 100)?100:0,
                                (orcid == 100)?100:0,
                                (instituciones == 100)?100:0,
                            ];
        var mas50 = [ 
                                (nombre > 50 && nombre < 100)?nombre:0,
                                //(apellido > 50 && apellido < 100)?apellido:0,
                                (email > 50 && email < 100)?email:0,
                                (orcid > 50 && orcid < 100)?orcid:0,
                                (instituciones > 50 && instituciones < 100)?instituciones:0,
                            ];
        var menos50 = [ 
                                (nombre < 50)?nombre:0,
                                //(apellido < 50)?apellido:0,
                                (email < 50)?email:0,
                                (orcid < 50)?orcid:0,
                                (instituciones < 50)?instituciones:0,
                            ];
                              
        grafica.series = [
                                {'name': 'Completos', 'data': completos }, 
                                {'name': '+ 50%', 'data': mas50},
                                {'name': '- 50%', 'data': menos50}
                                ];
                                
        var num = 'Total de Autores: ' + class_ver.var.salida.a.length;
        $('#autores').html(num);
        Highcharts.chart('container2', grafica);
    },
    graficaDocs:function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartRadialBar));
        grafica.xAxis.categories = ['Título', 'Título traducido', /*'Título sin mayúsculas (Idioma principal)',*/ 'Resumen', 'Resumen traducido', 
                                    /*'Resumen sin mayúsculas (Idioma principal)',*/ 'Palabras clave', 'Palabras clave traducidas', 'Enlace texto completo',/*'Mínimo 5 palabras clave',*/
                                    'Referencias', 'Licencia', 'DOI'];
        
        //var tituloip = class_ver.var.salida.ptv[class_ver.var.salida.ip].length / class_ver.var.salida.p.length * 100;
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
        
        class_ver.suficiencia_promedio += tituloip + titulo2i + resumenip + resumen2i + palabra_claveip + palabra_clave2i + enlaces + citas + licencia + doi;
        
        var completos = [ 
                                (tituloip == 100)?100:0,
                                (titulo2i == 100)?100:0,
                                //(titulom == 100)?100:0,
                                (resumenip == 100)?100:0,
                                (resumen2i == 100)?100:0,
                                //(resumenm == 100)?100:0,
                                //(palabra_clave == 100)?100:0,
                                (palabra_claveip == 100)?100:0,
                                (palabra_clave2i == 100)?100:0,
                                //(palabra_clave_cinco == 100)?100:0,
                                (enlaces == 100)?100:0,
                                (citas == 100)?100:0,
                                (licencia == 100)?100:0,
                                (doi == 100)?100:0
                            ];
        var mas50 = [ 
                                (tituloip > 50 && tituloip < 100)?tituloip:0,
                                (titulo2i > 50 && titulo2i < 100)?titulo2i:0,
                                //(titulom > 50 && titulom < 100)?titulom:0,
                                (resumenip > 50 && resumenip < 100)?resumenip:0,
                                (resumen2i > 50 && resumen2i < 100)?resumen2i:0,
                                //(resumenm > 50 && resumenm < 100)?resumenm:0,
                                (palabra_claveip > 50 && palabra_claveip < 100)?palabra_claveip:0,
                                (palabra_clave2i > 50 && palabra_clave2i < 100)?palabra_clave2i:0,
                                //(palabra_clave > 50 && palabra_clave < 100)?palabra_clave:0,
                                //(palabra_clave_cinco > 50 && palabra_clave_cinco < 100)?palabra_clave_cinco:0,
                                (enlaces > 50 && enlaces < 100)?enlaces:0,
                                (citas > 50 && citas < 100)?citas:0,
                                (licencia > 50 && licencia < 100)?licencia:0,
                                (doi > 50 && doi < 100)?doi:0
                            ];
        var menos50 = [ 
                                (tituloip < 50)?tituloip:0,
                                (titulo2i < 50)?titulo2i:0,
                                //(titulom < 50)?titulom:0,
                                (resumenip < 50)?resumenip:0,
                                (resumen2i < 50)?resumen2i:0,
                                //(resumenm < 50)?resumenm:0,
                                //(palabra_clave < 50)?palabra_clave:0,
                                (palabra_claveip < 50)?palabra_claveip:0,
                                (palabra_clave2i < 50)?palabra_clave2i:0,
                                //(palabra_clave_cinco < 50)?palabra_clave_cinco:0,
                                (enlaces < 50)?enlaces:0,
                                (citas < 50)?citas:0,
                                (licencia < 50)?licencia:0,
                                (doi < 50)?doi:0
                            ];
                              
        grafica.series = [
                                {'name': 'Completos', 'data': completos }, 
                                {'name': '+ 50%', 'data': mas50},
                                {'name': '- 50%', 'data': menos50}
                                ];
                                
        var num = 'Total de documentos: ' + class_ver.var.salida.p.length;
        $('#documentos').html(num);
        Highcharts.chart('container3', grafica);
    },
    graficaDois:function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartRadialBar));
        grafica.xAxis.categories = ["DOI registrado", "DOI resuelve"];
        
        var doi_registrado = class_utils.filter_prop(class_ver.var.salida.pd, 'registrado', 1);
        var doi_resuelve = class_utils.filter_prop(class_ver.var.salida.pd, 'resuelve', 1);
        
        doi_registrado = doi_registrado.length / class_ver.var.salida.pd.length * 100;
        doi_resuelve = doi_resuelve.length / class_ver.var.salida.pd.length * 100;
        
        var completos = [ 
                                (doi_registrado == 100)?100:0,
                                (doi_resuelve == 100)?100:0,
                            ];
        var mas50 = [ 
                                (doi_registrado > 50 && doi_registrado < 100)?doi_registrado:0,
                                (doi_resuelve > 50 && doi_resuelve < 100)?doi_resuelve:0,
                            ];
        var menos50 = [ 
                                (doi_registrado < 50)?doi_registrado:0,
                                (doi_resuelve < 50)?doi_resuelve:0,
                            ];
                              
        grafica.series = [
                                {'name': 'Completos', 'data': completos }, 
                                {'name': '+ 50%', 'data': mas50},
                                {'name': '- 50%', 'data': menos50}
                                ];
                                
        Highcharts.chart('container4', grafica);
    },
    graficaProm:function(){
        var grafica = JSON.parse(JSON.stringify(class_utils.chartRadialBar));
        grafica.xAxis.categories = ['Suficiencia promedio']
        
        var sp = class_ver.suficiencia_promedio/14;
        
        var completos = [ 
                                (sp == 100)?100:0,
                            ];
        var mas60 = [ 
                                (sp > 60 && sp < 100)?sp:0,
                            ];
        var menos60 = [ 
                                (sp < 60)?sp:0,
                            ];
                              
        grafica.series = [
                                {'name': 'Excelente', 'data': completos }, 
                                {'name': 'Suficiente', 'data': mas60},
                                {'name': 'Bajo', 'data': menos60}
                                ];
        
        var num = 'Suficiencia promedio';
        $('#promedio').html(num);
        Highcharts.chart('containerp', grafica);
    },
    verifica_valor: function(id, valor, compara=''){
        if(compara !== '')
            if(valor != compara)
                $('#'+id).prop('style','background-color: lightcoral');
            else
                $('#'+id).prop('style','background-color: lightgreen');
         else
            if(valor != '')
                $('#'+id).prop('style','background-color: lightgreen');
            else
                $('#'+id).prop('style','background-color: lightcoral');
    },
    valida_dois: function(dois, res, total, num = 0){
        var rango_fijo = 5;
        var rango = 5;
        
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
                class_utils.getResource('https://doi.org/'+val.setting_value)
            )
            .then(function(resp){
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
                var url = resp.resource.primary.URL;
                $.when(
                    class_utils.getResource('/verificador/get_url_validate?url='+url)
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
                        if(rango == rango_fijo){
                            class_ver.valida_dois(dois.slice(rango), res, total, num);
                        }else{
                            class_ver.var.salida.pd = res;
                            class_ver.graficaDois();
                            return res;
                        }
                    }
                    
                });
            }).fail(function(){
                num = num + 1;
                recibidos = recibidos + 1;
                $('#dois').html(mensaje.replace('<num>', num));
                val.registrado = 0;
                val.resuelve = 0;
                res.push(val);
                if(recibidos == rango){
                    if(rango == rango_fijo){
                        class_ver.valida_dois(dois.slice(rango), res, total, num);
                    }else{
                        class_ver.var.salida.pd = res;
                        class_ver.graficaDois();
                        return res;
                    }
                }
            });
        });
    }
};

$(class_ver.ready);

