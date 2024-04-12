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
        option: '<option value="<valor>"><opcion></option>',
    },
    var: {
        numeros: '',
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
                                    if(['Analista', 'Editor'].indexOf(val[1]) !== -1){
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
                        
                        /*$.when(class_utils.getResource('/datos/allrevistas/')) 
                        .then(function(resp_revista){*/
                            gapi.client.sheets.spreadsheets.values.get({
                                spreadsheetId: b(env.sId),
                                range: b(env.s),
                            }).then(function(response2) {
                                var revistas = response2.result.values;
                                var options = '';
                                $.each(revistas, function(i, val){
                                        if(i>0){
                                                class_asir.var.revistasJSON.push(JSON.parse(JSON.stringify(Object.assign({}, val))));
                                        }
                                });
                                class_asir.var.revistasJSON.sort(class_utils.order_by(0));
                            var options='';
                            
                            options += class_asir.cons.option_revista.replace('<revista>', "").replace("<val>", "");
                            $.each(class_asir.var.revistasJSON, function(i, val){
                                try{
                                    options += class_asir.cons.option_revista.replace('<revista>', val[0].trim()).replace("<val>", val[0].trim());
                                } catch (error) {
                                    console.log(error);
                                }
                            });
                            
                            $('#revista_sel').show();
                            $('#revista_sel').html(options);
                            $('#revista_sel').select2({ tags: true, placeholder: "Seleccione una revista", allowClear: true});
                            
                            class_asir.control();
                            class_asir.control_na();
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
            var anio_rev = $('#anio_rev').val();
            
            var v = null;
            var n = null;
            var m = null;
            var p = null;
            var numero = $('#sel_numero').val();
            rev =  rev + ' # ' + anio_rev + ' # ' + numero;

            if(numero !== '' && numero !== undefined){
                v = numero.split('V')[1];
                if(v !== null && v !== undefined){
                    v = v.split('N')[0];
                    v = v.trim();
                }
                if(v == '' || v == 's/v'){
                    v = null;
                }
                
                n = numero.split('N')[1];
                if( n !== null && n !== undefined ){
                    n = n.split(' ')[0];
                    n = n.trim();
                }
                if(n == '' || n == 's/n'){
                    n = null;
                }
                
                m = numero.split(' Mes:')[1]
                if( m !== null && m !== undefined ){
                    m = m.split(' Parte:')[0];
                    m = m.trim();
                }
                if(m == '' ){
                    m = null;
                }
                
                p = numero.split(' Parte:')[1];
                if(p !== null && p !== undefined){
                    p = p.trim();
                }
                if(p == '' ){
                    p = null;
                }
            }
            
            var obj = {};
            var objDes = {};
            
            var sin_vol = $('#sin_vol').prop('checked');
            var vol = $('#txt_vol').val().trim();
            
            var sin_num = $('#sin_num').prop('checked');
            var num = $('#txt_num').val().trim();
            
            var p_esp = $('#p_esp').prop('checked');
            var p_sup = $('#p_sup').prop('checked');
            var p_est = $('#p_est').prop('checked');
            var p_mes = $('#p_mes').prop('checked');
            var p_no = $('#p_no').prop('checked');
            var sin_num_esp = $('#sin_num_esp').prop('checked');
            var sin_num_sup = $('#sin_num_sup').prop('checked');
            var un_mes = $('#un_mes').prop('checked');
            var sel_estacion = $('#sel_estacion').val();
            var txt_num_esp = $('#txt_num_esp').val();
            var txt_num_sup = $('#txt_num_sup').val();
            var sel_mes1 = $('#sel_mes1').val();
            var sel_mes2 = $('#sel_mes2').val();
            
            if( vol !== '' && !sin_vol)
                objDes['a'] = 'V' + vol;
            if( num !== '' && !sin_num)
                objDes['b'] = 'N' + num;
            
            var parte = '';
            var mes = '';
            
            //Revisa si indicó que No aplica
            if( !p_no ){
                
                if(p_esp){
                    parte = 'especial';
                }
                if( !sin_num_esp ){
                    if( !isNaN(txt_num_esp)){
                        parte += txt_num_esp;
                    }
                }
                
                if(p_sup){
                    parte = 'suplemento';
                }
                if( !sin_num_sup ){
                    if( !isNaN(txt_num_sup)){
                        parte += txt_num_sup;
                    }
                }
                
                if(p_est){
                    parte = sel_estacion;
                }
                
                if(p_mes){
                    mes = sel_mes1;
                    
                    if(!un_mes){
                        mes = mes + '-' + sel_mes2;
                    }
                }
            }
            
            if( parte != '' ){
                objDes['d'] = parte;
            }
            
            if( mes != '' ){
                objDes['c'] = mes;
            }
            
            if( numero !== ""){
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
            }else{
                rev = rev + 'V' + vol + 'N' + num + ((mes !== '')?(' Mes: ' + mes):'') + ((parte !== '')?(' Parte:' + parte):'');
            }
            
            obj['descripcionBibliografica'] = JSON.stringify(objDes);
            
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
    control_na: function(){
        var options = "";
        options += class_asir.cons.option.replace('<opcion>', "").replace("<valor>", "");
        for(var anio_i=(new Date().getFullYear()); anio_i >= 1900; anio_i--){
            options += class_asir.cons.option.replace('<opcion>', anio_i).replace("<valor>", anio_i);
        }

        $('#anio_rev').html(options);
        
        $('#anio_rev').select2({ tags: false, placeholder: "Seleccione un año", allowClear: true});
        
        $('#revista_sel, #anio_rev').on('change', function(){
            var revista = $('#revista_sel').val();
            var anio = $('#anio_rev').val();
            if( revista !== '' && anio !== '' ){
                $('#div_sel_numero').hide();
                $.when(
                    class_utils.getResource('/datos/revista_num/'+class_utils.slug(revista)+'/'+anio)
                ).then(function(resp){
                    var numeros = "";
                    if(resp.length > 0){
                        numeros = resp[0].numero;
                        class_asir.var.numeros = numeros;
                    }
                    class_asir.revista_numeros(numeros);
                    $('#div_sel_numero').show();
                });
            }
            $('#txt_vol, #txt_num, #txt_num_esp, #txt_num_sup').val('');
            $('#txt_vol, #txt_num, #txt_num_esp, #txt_num_sup').prop('disabled', false);
            $('.check').prop('disabled', false);
            $('.check').prop('checked', false);
            $('#div_especial, #div_suplemento, #div_estacion, #div_mes').hide();
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
        
        $('#un_mes').off('change').on('change', function(){
            if(this.checked){
                $('#sel_mes2').val('ene');
                $('#sel_mes2').prop('disabled', true);
                $('#sel_mes2').hide();
                $('#span_mes2').hide();
            }else{
                $('#sel_mes2').prop('disabled', false);
                $('#sel_mes2').show();
                $('#span_mes2').show();
            }
        });
        
        $('#p_esp, #p_sup, #p_est, #p_no, #p_mes').off('change').on('change', function(){
            var clic_id=this.id;
            var clic_checked=this.checked;
            $.each(['p_esp', 'p_sup', 'p_est', 'p_mes', 'p_no'], function(i, val){
                if(clic_id !== val && clic_checked){
                    if( ['p_esp', 'p_sup', 'p_est', 'p_no'].indexOf(clic_id) !== -1){
                        if( ['p_esp', 'p_sup', 'p_est', 'p_no'].indexOf(val) !== -1){
                            $('#'+val).prop('checked', false);
                        }
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
                    }
                    if( ['p_mes', 'p_no'].indexOf(clic_id) !== -1){
                        if( ['p_mes', 'p_no'].indexOf(val) !== -1){
                            $('#'+val).prop('checked', false);
                        }
                        if(val == 'p_mes'){
                            $('#div_mes').hide();
                            $('#mes_h').prop('disabled', false);
                            $('#sel_mes2').prop('checked', false);
                            $('#sel_mes1').val('ene');
                            $('#sel_mes2').val('ene');
                        }
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
                        if(val == 'p_mes'){
                            $('#div_mes').show();
                        }
                    }else{
                        if( ['p_esp', 'p_sup', 'p_est'].indexOf(clic_id) !== -1){
                            $('#div_especial, #div_suplemento, #div_estacion').hide();
                        }
                        if( ['p_mes'].indexOf(clic_id) !== -1){
                            $('#div_mes').hide();
                        }
                    }
                }
            });
        });
    },
    revista_numeros: function(numeros){
        if(numeros !== ""){
            numeros = numeros.replaceAll('{','').replaceAll('}','').replaceAll('\"','').split(',');
            var options = "";
            options += class_asir.cons.option.replace('<opcion>', "").replace("<valor>", "");
            $.each(numeros, function(i,val){
                options += class_asir.cons.option.replace('<opcion>', val).replace("<valor>", val);
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
            options += class_asir.cons.option.replace('<opcion>', "").replace("<valor>", "");
            $('#sel_numero').html(options);
            $('#sel_numero').select2({ tags: true, placeholder: "No existen números", allowClear: true});
            $('#sel_numero').prop('disabled', true);
            $('#txt_vol').val('');
            $('#txt_vol').prop('disabled', false);
            $('#txt_num').val('');
            $('#txt_num').prop('disabled', false);
        }
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
