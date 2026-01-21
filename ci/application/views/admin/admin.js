class_admin = {
    cons: {
        DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
        option_oai: '<option value="<url>"><revista></option>',
        get_oai: '/api_metametrics/get_oai?oai=<oai>&years=<years>',
		send_xml: '/api_metametrics/send_xml?oai=<oai>&years=<years>',
		send_zip: '/api_metametrics/send_zip',
        //td_num: '<a href="#" id="<anio>__<num>" class="thumbnail" style="color:#fff; background-color: #f0ad4e; border-color: #eea236; width:100px; text-align:center"><num></a>',
        td_num: '<button type="button" class="btn btn-warning nums" id="<anio>__<num>"><num></button>',
        idiomas: {
                    'es_ES' : 'Español',
                    'en_US' : 'Inglés',
                    'pt_BR' : 'Portugués',
                    'es' : 'Español',
                    'en' : 'Inglés',
                    'pt' : 'Portugués'
                },
        idiomasTit: {
                'Español' : 'spa',
                'Inglés' : 'eng',
                'Portugués' : 'por',
                'Italiano': 'ita',
                'Francés': 'fre',
                'Alemán': 'ger',
                'Ruso': 'rus'
            },
        idiomasRes: {
            'Español' : 'a',
            'Inglés' : 'i',
            'Portugués' : 'p'
        },
        pub_id: {
            '3.4.0': 'publication_id',
            '3.3.0.11': 'publication_id',
            '3.3.0': 'publication_id',
            '3.2.0': 'publication_id',
            '3.1.2': 'submission_id',
            '3.0.0': 'submission_id',
            '2.4.0': 'article_id',
            '2.3.0': 'article_id'
        },
        pub_id_auth: {
            '3.4.0': 'publication_id',
            '3.3.0.11': 'publication_id',
            '3.3.0': 'publication_id',
            '3.2.0': 'publication_id',
            '3.1.2': 'submission_id',
            '3.0.0': 'submission_id',
            '2.4.0': 'submission_id',
            '2.3.0': 'submission_id'
        },
        pub_id_file: {
            '3.4.0': 'submission_id',
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
                /^advertencia\s*editorial$/,
				/^author\s*guidelines$/,
                /^contenido$/,
                /^content$/,
                /^directorio$/,
                /^directory$/,
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
                                        var obj = Object.assign({}, val);
                                        for (let key in obj) {
                                            if (typeof obj[key] === "string") {
                                              obj[key] = obj[key].trim();
                                            }
                                        }
                                        class_admin.var.revistasJSON.push(JSON.parse(JSON.stringify(obj)));
                                        //class_admin.var.revistasJSON.push(JSON.parse(JSON.stringify(Object.assign({}, val))));
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
                        loading.end();
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
        var anio = (new Date()).getFullYear();
        var anios='';
        for(var i=anio; i>=anio-50; i--){
            anios += '<option value="'+i+'">'+i+'</option>';
        }
        $('#anio').html(anios);
        loading.start();
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
                var issue = class_admin.var.data.numeros;
                issue = issue.sort(class_utils.order_by_arr(['year', 'vol', 'num']));
                var data_ss = '';
                var data_p = '';

                //total de publicaciones
                var publicaciones_vigentes = class_admin.var.data.articulos;
                
                var tabla = '';
                $.each(issue, function(i, val){
                    tabla += class_admin.cons.td_num.replaceAll('<anio>', val.year).replaceAll('<num>', 'V'+val.vol+'N'+val.num + ((val.especial !== undefined)?'Esp':'') ) + ' ';
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
                                            var num = id.split('__')[1].split('N')[1].split('Esp')[0];
                                            var especial = (id.indexOf('Esp') !== -1)?true:false;
                                            class_admin.registrosCLAPER(anio, vol, num, especial);
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
        
		$("#formXML").on("submit", function(event) {
            loading.start();
            class_admin.var.revista = class_utils.find_prop(class_admin.var.revistasJSON, 0, $('#select2-revista_sel-container').text());
            
            event.preventDefault();  // Prevenir el comportamiento por defecto del formulario
            
            $.confirm({
                title: '',
                content: 'Se ingresarán a Biblat los documentos encontrados en el archivo seleccionado',
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
                               var formData = new FormData();
                                formData.append("file", $("#archivo")[0].files[0]);
                                formData.append("revista", class_admin.var.revista[0].trim());
                                formData.append("base", class_admin.var.revista[1].trim());
                                formData.append("pais", class_admin.var.revista[6].trim());
                                formData.append("issn", class_admin.var.revista[5].trim());
                                formData.append("institucion_editora", class_admin.var.revista[8].trim());
                                formData.append("ciudad_editora", class_admin.var.revista[7].trim());
                                formData.append("disciplina", class_admin.var.revista[2].trim());

                                // Enviar el archivo a la aplicación Python
                                $.ajax({
                                    url: class_admin.cons.send_xml,  // URL de la aplicación Python
                                    type: "POST",
                                    data: formData,
                                    contentType: false,  // No enviar cabeceras de tipo
                                    processData: false,  // No procesar los datos
                                    success: function(response) {
                                        loading.end();
                                        $('#mensajeFin').html('<b>'+response+'</b>');
                                    },
                                    error: function(xhr, status, error) {
                                        $('#mensajeFin').html('Error al procesar el archivo');
                                    }
                                });
                            }
                    }
                }
            });
        });
		
		$("#formZIP").on("submit", function(event) {
            loading.start();
            
            event.preventDefault();  // Prevenir el comportamiento por defecto del formulario
            
            $.confirm({
                title: '',
                content: "Se ingresarán a Biblat los PDF's encontrados en el archivo seleccionado",
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
                               var formData = new FormData();
                                formData.append("file", $("#archivo")[0].files[0]);

                                // Enviar el archivo a la aplicación Python
                                $.ajax({
                                    url: class_admin.cons.send_zip,  // URL de la aplicación Python
                                    type: "POST",
                                    data: formData,
                                    contentType: false,  // No enviar cabeceras de tipo
                                    processData: false,  // No procesar los datos
                                    success: function(response) {
                                        loading.end();
                                        $('#mensajeFin').html('<b>Se ingresaron '+response.ok+" PDF's correctamente</b>");
                                    },
                                    error: function(xhr, status, error) {
                                        $('#mensajeFin').html('Error al procesar el archivo');
                                    }
                                });
                            }
                    }
                }
            });
        });
    },
    registrosCLAPER: function(anio, vol, num, especial){
        loading.start();
        var issue = '';
        var ids_issue = '';
        var arr_ids_issue = [];
        //Issue
        issue = class_utils.filter_prop(class_admin.var.data.numeros, 'year', anio);
        if (vol == 'null'){
            issue = class_utils.filter_prop(issue, 'vol', null);
        }else{
            issue = class_utils.filter_prop(issue, 'vol', vol);
        }
        if (num == 'null'){
            issue = class_utils.filter_prop(issue, 'num', null);
        }else{
            issue = class_utils.filter_prop(issue, 'num', num);
        }
		
        var issue_tmp = [];
        if (especial){
            issue_tmp = class_utils.filter_prop(issue, 'especial', 'especial');
            if (issue_tmp.length == 0)
                issue = class_utils.filter_prop(issue, 'especial', 'suplemento');
            else
                issue = issue_tmp;
        }else{
            issue = class_utils.filter_prop(issue, 'especial', undefined);
        }

        console.log(issue);
        var data_ss = '';
        var data_p = '';

       

        //total de publicaciones
        var publicaciones_vigentes = JSON.parse(JSON.stringify(class_admin.var.data.articulos));

        var publicaciones = [];
        var arr_id_pubs = [];
        //id's de las publicaciones
        $.each(publicaciones_vigentes, function(i,val){
            if(issue[0].num == val.numero.num && issue[0].vol == val.numero.vol && issue[0].especial == val.numero.especial){

                //Revisión si es contenido indizable
                var indizable = val.titulo;
                var coincide_titulo = false;
                $.each(class_admin.cons.er.titulo_completo, function(i_er, val_er){
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
                    publicaciones.push(val);
                }
            }
        });

        console.log(arr_id_pubs);
        console.log(publicaciones);

        //Publicaciones en issue
        var publicaciones_ajustes = '';

        class_admin.var.registros.idioma_principal = class_admin.var.data.idioma_principal[0];
        class_admin.var.registros.doc = [];

        console.log(publicaciones_ajustes);

        $.each(publicaciones, function(i,val){
            var doc = {};

            doc.base = class_admin.var.revista[1].trim();
            doc.pais = class_admin.var.revista[6].trim();
            doc.issn = class_admin.var.revista[5].trim();
            doc.revista = class_admin.var.revista[0].trim();
            doc.institucion_editora = class_admin.var.revista[8].trim();
            doc.ciudad_editora = class_admin.var.revista[7].trim();
            doc.fecha_publicacion = anio.trim();
            doc.disciplina = class_admin.var.revista[2].trim();
            
            doc.doi = (val.doi == null)?null:val.doi.trim();

            doc.locale = val.idioma_articulo;
            
            if(val.idioma_articulo == null || val.idioma_articulo == undefined)
                doc.idioma = class_admin.var.registros.idioma_principal;
            else
                doc.idioma = val.idioma_articulo.charAt(0).toUpperCase() + val.idioma_articulo.slice(1).toLowerCase();

            var titulo = val.titulo;
            var arr_titulo = [];
            $.each(titulo, function(i2, val2){
                var obj = {};
                
                if(val2.lan !== undefined){
                    if( val2['lan'] == doc.locale){
                        doc.titulo_original = class_utils.cleanHtml(val2.title);

                    }else{
                        obj.titulo = class_utils.cleanHtml(val2.title);

                        obj.idioma = val2.lan.charAt(0).toUpperCase() + val2.lan.slice(1).toLowerCase();
                    }
                    if ('idioma' in obj && obj.titulo !== '')
                        arr_titulo.push(obj);
                }
            });

            doc.titulo = arr_titulo;

            var resumen = val.resumen;
            var arr_resumen = [];
            var arr_idioma = [];
            $.each(resumen, function(i2, val2){
                var obj = {};
                obj.resumen = class_utils.cleanHtml(val2.abstract);
                if(val2.lan !== undefined){
                    obj.idioma = val2.lan.charAt(0).toUpperCase() + val2.lan.slice(1).toLowerCase();
                    if( 'resumen' in obj && obj.resumen !== ''){
                        arr_resumen.push(obj);
                        arr_idioma.push(obj.idioma);
                    }
                }
            });

            doc.resumen = arr_resumen;
            doc.idioma_resumen = (arr_idioma.indexOf('Español') !== -1)?'Español':'';
            doc.idioma_resumen += (arr_idioma.indexOf('Portugués') !== -1)?(doc.idioma_resumen != '')?', portugués':'Portugués':'';
            doc.idioma_resumen += (arr_idioma.indexOf('Inglés') !== -1)?(doc.idioma_resumen != '')?', inglés':'Inglés':'';

            doc.anio = anio.trim();
            if(['', undefined, null, '0', 'null'].indexOf(vol) !== -1){
                doc.volumen = 's/v'
            }else{
                doc.volumen = (class_admin.cons.er.letra.test(vol.trim()))?'s/v':'V' + vol.trim();
            }
            doc.numero = (class_admin.cons.er.letra.test(num.trim()))?'s/n':'N' + num.trim();
            doc.parte = '';
            if(especial){
                if (val.numero.especial.toUpperCase().indexOf('ESPECIAL') !== -1)
                    doc.parte = 'especial';
                if (val.numero.especial.toUpperCase().indexOf('SUPLEMENTO') !== -1)
                    doc.parte = 'supl';
            }
            doc.mes = '';
            if(val.numero.mes !== undefined){
                if(val.numero.mes !== 'null' && val.numero.mes !== null){
                    doc.mes = val.numero.mes
                }
            }
            doc.refs = 'Refs.';
            doc.paginas = '';
            if(val['pags'] !== undefined && val['pags'] !== null && val['pags'] !== 'null'){
                doc.paginas = val['pags'].trim();
            }

            var arr_palabras_clave = [];
            var obj_palabras_clave = [];
            //palabras clave
            arr_palabras_clave = val.palabra_clave;
            $.each(arr_palabras_clave, function(i2, val2){
                if( obj_palabras_clave[val2.lan] == undefined){
                    obj_palabras_clave[val2.lan] = [];
                }
                var arr_palabras_clave2 = val2.keyword;
                $.each(arr_palabras_clave2, function(i3, val3){
                    obj_palabras_clave[val2.lan].push(class_utils.cleanHtml(val3.trim()));
                });
            });
            doc.palabras_clave = obj_palabras_clave['español'];
            doc.keywords = obj_palabras_clave['inglés'];

            //texto completo
            var textos = val.enlace_texto;

            //Filtro por idioma, pero puede variar y no encontrarlo
            //textos = class_utils.filter_prop(textos, 'locale', doc.locale);

            $.each(textos, function(i2, val2){
                var tipo = val2['format'].toLowerCase();
                if( tipo.indexOf('pdf') !== -1){
                    doc.textoPDF = val2.url;
                }else
                if( tipo.indexOf('html') !== -1){
                    doc.textoHTML = val2.url;
                }
            });

            doc.autores = [];
            var instituciones = [];

            //Autores
            var id_autores = val.autor;
            $.each(id_autores, function(i2, val2){
                var obj = {};
                obj.id = i2+1;
                obj.mail = null;
                
                obj.orcid = val2.orcid
                
                if(obj.orcid !== null && obj.orcid !== undefined && obj.orcid !== 'null'){
                    obj.orcid = obj.orcid.replace('https://orcid.org/', '').replace('http://orcid.org/', '');
                }

                obj.nombre = class_utils.cleanHtml(val2.name);

                
                obj.institucion = class_utils.cleanHtml(val2.aff);
                if(obj.institucion == 'null'){
                    obj.institucion = null;
                }
                if([null, '', undefined].indexOf(obj.institucion) == -1){
                    if( instituciones.indexOf(obj.institucion) == -1){
                        instituciones.push(obj.institucion);
                    }
                    obj.id_inst = instituciones.indexOf(obj.institucion)+1;
                }

                doc.autores.push(obj);
                doc.fechaIngreso = (new Date()).getFullYear()+'-'+(((new Date()).getMonth()+1)+'').padStart(2,'0')+'-'+((new Date()).getDate()+'').padStart(2,'0');
            });

            class_admin.var.registros.doc.push(doc);
        });
            
            
        async function sendDataInBlocks(dataArray, blockSize) {
            const totalBlocks = Math.ceil(dataArray['data'].length / blockSize);

            for (let i = 0; i < totalBlocks; i++) {
                const startIndex = i * blockSize;
                const endIndex = Math.min(startIndex + blockSize, dataArray['data'].length);

                const blockData = dataArray['data'].slice(startIndex, endIndex);

                const postData = {
                    tabla: dataArray['tabla'],
                    where: dataArray['where'], // Aquí debes definir la variable "columns" que contiene los datos para "data['where']"
                    data: blockData,
                };

                try {
                    await $.ajax({
                        type: 'POST',
                        url: "<?=site_url('metametrics/ws_insert_article');?>",
                        data: postData,
                    });
                    console.log(`Block ${i + 1} sent successfully`);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } catch (error) {
                    console.error(`Error sending block ${i + 1}:`, error);
                    $('#mensajeFin').html('<b>Ocurrió un error al intentar guardar los documentos.</b>');
                    loading.end();
                    return; // Exit the function if an error occurs
                }
            }

            loading.end();
            $('#mensajeFin').html('<b>Se han ingresado correctamente ' + dataArray['data'].length + ' documentos.</b>');
            console.log('All blocks sent successfully');
        }

        // Uso de la función
        const dataArray = class_admin.data_inserta_article();
        const blockSize = 5; // Puedes cambiar el tamaño del bloque aquí (por ejemplo, 5 o 10)
        
        sendDataInBlocks(dataArray, blockSize);

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
            if( val.mes !=='')
                objDes['c'] = val.mes;
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



