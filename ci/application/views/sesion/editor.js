class_editor = {
    ready: function(){
        var cont = 0;
        if( $('#correo').length ) {
            $('#envio_editor').on('submit', function(e){
                e.preventDefault();
                $('#error, #no-registrado').hide();
                loading.start();
                var correo = $('#correo').val();
                $.ajax({
                        type: 'POST',
                        url: "<?=site_url('sesion/inicio_editores');?>",
                        data: {correo: correo},
                }).done(function(resp) {
                    resp = JSON.parse(resp);
                    $('#error').hide();
                    if(resp.res == 'success'){
                        loading.end();
                        $('#no-registrado').hide();
                        window.location.reload();
                    }else{
                        loading.end();
                        cont++;
                        if(cont == 3){
                            window.location.href = 'https://biblat.unam.mx';
                        }
                        $('#no-registrado').show();
                    }
                }).fail(function(){
                    loading.end();
                    $('#error').show();
                    $('#no-registrado').hide();
                });
            });
        }
        if( $('#codigo').length ) {
            $('#envio_editor').on('submit', function(e){
                e.preventDefault();
                $('#error, #no-valido').hide();
                loading.start();
                var codigo = $('#codigo').val();
                $.ajax({
                        type: 'POST',
                        url: "<?=site_url('sesion/codigo_editores');?>",
                        data: {codigo: codigo},
                }).done(function(resp) {
                    resp = JSON.parse(resp);
                    $('#error').hide();
                    if(resp.res == 'success'){
                        $('#no-valido').hide();
                        $('#envio_editor').hide();
                        $('#mensaje').html("Inicie sesión con su cuenta de Google");
                        $('#google_btn').show();
                        loading.end();
                        class_editor.initGoogleSignIn();
                    }else{
                        loading.end();
                        cont++;
                        if(cont == 3){
                            window.location.href = 'https://biblat.unam.mx';
                        }
                        $('#no-valido').show();
                    }
                }).fail(function(){
                    loading.end();
                    $('#error').show();
                    $('#no-valido').hide();
                });
            });
        }
    },
    initGoogleSignIn: function() {
        loading.start();
        gapi.load('auth2', function() {
          gapi.auth2.init({
            client_id: b(env.C_I),
          }).then(function() {
            // Comprobar si ya existe una sesión iniciada
            if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
              // Ocultar el botón de inicio de sesión
              document.getElementById('google_btn').style.display = 'none';

              // Obtener la información del usuario
              var user = gapi.auth2.getAuthInstance().currentUser.get();
              class_editor.handleGoogleSignIn(user);
            } else {
                  class_editor.initGoogleAccount("Inicie sesión con su cuenta de Google");
                  loading.end();
            }
          });
        });
    },
    initGoogleAccount: function(mensaje){
        $("#mensaje").html(mensaje);
        google.accounts.id.initialize({
                client_id: b(env.C_I),
                callback: class_editor.handleGoogleSignIn2
            });
        const parent = document.getElementById('google_btn');
        google.accounts.id.renderButton(parent, {theme: "filled_blue"});
        google.accounts.id.prompt();
        // Mostrar el botón de inicio de sesión
        document.getElementById('google_btn').style.display = 'block';
    },
    handleGoogleSignIn: function(googleUser) {
        var profile = googleUser.getBasicProfile();
        //Existe una sesión y es usuario en Biblat
        var objUsr={};
        objUsr.editor = true;
        objUsr.id_token = googleUser.wc.id_token;
        $.post('<?=site_url("sesion/valida");?>', objUsr, function(result){
            window.location.href = '<?=site_url("'+result.page+'");?>';
        });
        // Ocultar el botón de inicio de sesión
        document.getElementById('google_btn').style.display = 'none';
    }
};

$(class_editor.ready);
