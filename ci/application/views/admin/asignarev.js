class_asir = {
    cons: {
        DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
        option_analista: '<option value="<val>"><analista></option>',
        option_revista: '<option value="<val>"><revista></option>',
        td_num: '<button type="button" class="btn btn-warning nums" id="<anio>__<num>"><num></button>',
        revistas_container: '<div class="panel-group"><revistas></div>',
        revistas_head1: '<div class="panel panel-default"><div class="panel-heading"><h5 class="panel-title"><b>Revistas asignadas por análisis de artículos</b></h5></div></div>',
        revistas_head2: '<div class="panel panel-default"><div class="panel-heading"><h5 class="panel-title"><b>Revistas asignadas</b></h5></div></div>',
        revistas_renglon: '<div class="panel panel-default"><div class="panel-heading"><h5 class="panel-title"><revista></h5></div></div>',
        revistas_renglon_x: '<div class="panel panel-default"><div class="panel-heading"><h5 class="panel-title" style="display: inline-block;"><revista></h5><div class="borra_rev" id="borra-<id>" style="display: inline-block;float: right;cursor:pointer"><span class="glyphicon glyphicon-remove" aria-hidden="true" style="color: #ff8000;"></span></div></div></div>',
        ya_asignada: 'La revista ya se encuentra en el listado.',
        asignada: 'La revista se agregó al listado.',
        borrada: 'La revista se eliminó del listado.',
        guardado: 'Los cambios se guardaron correctamente.',
    },
    var: {
        usuariosJSON: [],
        revistasJSON: [],
        revistasAsignadas1: [],
        revistasAsignadas2: [],
        init: true,
    },
    ready: function(){
        loading.start();
        class_asir.initClient();
        //class_admin.control();
    },
    initClient: function() {
        if (class_asir.var.init){
            class_asir.var.init = false;
            var object = {
                private_key: env.P_K,
                client_email: b(env.C_E),
                scopes: class_asir.cons.SCOPES,
            };
            gapi.load("client", async function(){
                gapi.auth.setToken(await GetAccessTokenFromServiceAccount.do(object));
                gapi.client.init({
                    discoveryDocs: class_asir.cons.DISCOVERY_DOCS,
                }).then(function () {
                    //Lectura de hoja de cálculo, se requiere el ID y la hoja de la que leerá
                    gapi.client.sheets.spreadsheets.values.get({
                        spreadsheetId: b(env.sId),
                        range: b(env.s_2),
                    }).then(function(response) {
                        var revistas = response.result.values;
                        var options = '';
                        $.each(revistas, function(i, val){
                                if(i>0){
                                    if(val[1] == 'Analista'){
                                        class_asir.var.usuariosJSON.push(JSON.parse(JSON.stringify(Object.assign({}, val))));
                                    }
                                }
                        });
                        class_asir.var.usuariosJSON.sort(class_utils.order_by(0));
                        options += class_asir.cons.option_analista.replace('<analista>', "").replace("<val>", "");
                        $.each(class_asir.var.usuariosJSON, function(i, val){
                            try{
                                options += class_asir.cons.option_analista.replace('<analista>', val[3].trim()).replace("<val>", val[3].trim());
                            } catch (error) {
                                console.log(error);
                            }
                        });
                        class_asir.var.options_asigna = options;
                        
                        $('#usuario_sel').show();
                        $('#usuario_sel').html(options);
                        $('#usuario_sel').select2({ tags: true, placeholder: "Seleccione un usuario", allowClear: true});
                        
                        $.when(class_utils.getResource('/datos/allrevistas/')) 
                        .then(function(resp_revista){
                            class_asir.var.revistasJSON = resp_revista;
                            var options='';
                            
                            options += class_asir.cons.option_revista.replace('<revista>', "").replace("<val>", "");
                            $.each(class_asir.var.revistasJSON, function(i, val){
                                try{
                                    options += class_asir.cons.option_revista.replace('<revista>', val.revista).replace("<val>", val.revista);
                                } catch (error) {
                                    console.log(error);
                                }
                            });
                            
                            $('#revista_sel').show();
                            $('#revista_sel').html(options);
                            $('#revista_sel').select2({ tags: true, placeholder: "Seleccione una revista", allowClear: true});
                            
                            class_asir.control();
                            loading.end();
                        });
                        
                    });
                });
            });
        }
    },
    revistas_asignadas: function(usuario){
        $.when(
                class_utils.getResource('/datos/revistas_articulo_by_nombre/'+usuario),
                class_utils.getResource('/datos/revistas_by_nombre/'+usuario)
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
            
            class_asir.var.revistasAsignadas1 = arr1;
            class_asir.var.revistasAsignadas2 = arr2;
            class_asir.mostrarRevistas();
        });
    },
    mostrarRevistas: function(){
        var arr1 = class_asir.var.revistasAsignadas1;
        var arr2 = class_asir.var.revistasAsignadas2;
        
        var rev1 = '';
        $.each(arr1, function(i, val){
            rev1 += class_asir.cons.revistas_renglon.replace('<revista>', val);
        });
        var rev2 = '';
        $.each(arr2, function(i, val){
            rev2 += class_asir.cons.revistas_renglon_x.replace('<revista>', val).replace('<id>', i);
        });
            
        rev1 = class_asir.cons.revistas_container.replace('<revistas>', class_asir.cons.revistas_head1 + rev1);
        rev2 = class_asir.cons.revistas_container.replace('<revistas>', class_asir.cons.revistas_head2 + rev2);

        if(arr1.length > 0){
            $('#div_revistas_documentos').show();
            $('#div_revistas_documentos').html(rev1);
        }else{
            $('#div_revistas_documentos').html("");
        }

        if(arr2.length > 0){
            $('#div_otras_revistas').show();
            $('#div_otras_revistas').html(rev2);
        }else{
            $('#div_otras_revistas').html("");
        }

        if(arr1.length == 0 && arr2.length == 0){
            $('#div_revistas_documentos').show();
            $('#div_revistas_documentos').html('<h5 class="panel-title"><b>No hay revistas asignadas</b></h5>');
        }
        
        class_asir.control2();
    },
    control: function(){
        $('#usuario_sel').on('change', function(){
            class_asir.revistas_asignadas(this.value);
        });
        
        $('#revista_sel').on('change', function(){
            $('#btn_asignar').show();
        });
        
        $('#btn_asignar').off('click').on('click', function(){
            var rev = $('#revista_sel').val();
            if( class_asir.var.revistasAsignadas1.indexOf(rev) == -1 && class_asir.var.revistasAsignadas2.indexOf(rev) == -1){
                class_asir.var.revistasAsignadas2.push(rev);
                class_asir.mensaje(class_asir.cons.asignada);
                class_asir.mostrarRevistas();
                $('#btn_guardar').show();
                class_asir.control_guarda();
            }else{
                class_asir.mensaje(class_asir.cons.ya_asignada);
            }
        });
    },
    control2: function(){        
        $('.borra_rev').off('click').on('click', function(){
            var id = parseInt(this.id.split('-')[1]);
            class_asir.var.revistasAsignadas2.splice(id,1);
            class_asir.mostrarRevistas();
            class_asir.mensaje(class_asir.cons.borrada);
            $('#btn_guardar').show();
            class_asir.control_guarda();
        });  
    },
    control_guarda:function(){
        $('#btn_guardar').off('click').on('click', function(){
            $('#btn_guardar').hide();
            var texto = 'Se guardarán los cambios en la asignación de revistas';
            
            $.confirm({
                title: '',
                content: texto,
                buttons: {
                    cancelar: {
                            text: 'Cancelar',
                            //btnClass: 'btn-red',
                            action: function(){
                                $('#btn_guardar').show();
                            }
                    },
                    aceptar: {
                            text: 'Aceptar',
                            btnClass: 'btn-warning',
                            action: function(){
                                $.ajax({
                                        type: 'POST',
                                        url: "<?=site_url('metametrics/ws_update_or_insert');?>",
                                        data: class_asir.data_update_asigna(),
                                }).done(function() {
                                    class_asir.mensaje(class_asir.cons.guardado);
                                }).fail(function(){
                                    class_asir.mensaje('Ocurrió un error al intentar guardar los cambios');
                                    $('#btn_guardar').show();
                                });
                            }
                    }
                }
            });
        });
    },
    data_update_asigna: function(){
        var data = {};
        var columns = ['usuario'];
        var data_int = [];
        var obj = {};
        
        obj['usuario'] = $('#usuario_sel').val();
        obj['revistas'] = JSON.stringify(class_asir.var.revistasAsignadas2);
        
        data_int.push(obj);
        
        data['tabla'] = 'usuario_revista';
        data['where'] = columns;
        data['data'] = data_int;
        return data;
    },
    mensaje: function(mensaje){
        var id=Date.now();
        $('#mensajeFin').append('<div id="'+id+'" style="opacity:1" class="alert alert-success despacio" role="alert">'+mensaje+'</div>');
        setTimeout(function(){
            $('#'+id).css('opacity', 0);
        },500);
        setTimeout(function(){
            $('#'+id).remove();
        },3000);
    }
};

$(class_asir.ready);
