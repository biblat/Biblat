class_editor = {
    ready: function(){
        class_editor.initGoogleSignIn();
    },
    setQR: function(qr, page){
        $('#auth').show();
        $('#div_envio_editor').hide();
        $('#div_envio_editor2').show();
        if(qr !== "0"){
            $('#mensaje').html('Escanea este código QR con la aplicación Google Authenticator para generar un código de inicio<br><br>');
            $('#qr').attr('src', qr);
        }else{
            $('#auth').remove();
            $('#mensaje').html('Ingresa tu código de inicio<br><br>');
        }
        var cont =0;
        $('#envio_editor2').on('submit', function(e){
            e.preventDefault();
            $('#error, #no-valido').hide();
            loading.start();
            var codigo = $('#codigo').val();
            $.ajax({
                    type: 'POST',
                    url: "<?=site_url('sesion/inicio_editores');?>",
                    data: {codigo: codigo},
            }).done(function(resp) {
                resp = JSON.parse(resp);
                $('#error').hide();
                if(resp.res == 'success'){
                    $('#no-valido').hide();
                    loading.end();
                    window.location.href = '<?=site_url("'+page+'");?>';
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
                  class_editor.initGoogleAccount("Inicie sesión con su cuenta de Google registrada en Biblat Central");
                  loading.end();
            }
          });
        });
    },
    initGoogleAccount: function(mensaje){
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
        var email = profile.getEmail();
        var objUsr={};
        objUsr.editor = true;
        objUsr.id_token = googleUser.wc.id_token;
        
        $.ajax({
            type: 'POST',
            url: "<?=site_url('sesion/inicio_editores');?>",
            data: {correo: email},
        }).done(function(resp) {
            resp = JSON.parse(resp);
            $('#error').hide();
            if(resp.res == 'success'){
                $.post('<?=site_url("sesion/valida");?>', objUsr, function(result){
                    loading.end();
                    if(result.page !== 'main'){
                        class_editor.setQR(resp.qr, result.page);
                    }else{
                        window.location.href = '<?=site_url("'+result.page+'");?>';
                    }
                });
            }else{
                loading.end();
                class_editor.initGoogleAccount();
                $('#no-registrado').show();
            }
        });
        // Ocultar el botón de inicio de sesión
        document.getElementById('google_btn').style.display = 'none';
    },
    handleGoogleSignIn2: function(response) {
        // decodeJwtResponse() is a custom function defined by you
        // to decode the credential response.
        $('#no-registrado').hide();
        var token = response.credential;
        var parts = token.split('.');
        var encodedPayload = parts[1];
        var decodedPayload = atob(encodedPayload);
        var responsePayload = JSON.parse(decodedPayload);
        $.ajax({
                type: 'POST',
                url: "<?=site_url('sesion/inicio_editores');?>",
                data: {correo: responsePayload.email},
        }).done(function(resp) {
            resp = JSON.parse(resp);
            $('#error').hide();
            if(resp.res == 'success'){
                var objUsr={};
                objUsr.editor = true;
                objUsr.id_token = token;
                $.post('<?=site_url("sesion/valida");?>', objUsr, function(result){
                    loading.end();
                    if(result.page !== 'main'){
                        class_editor.setQR(resp.qr, result.page);
                    }else{
                        window.location.href = '<?=site_url("'+result.page+'");?>';
                    }
                });
            }else{
                loading.end();
                class_editor.initGoogleAccount();
                $('#no-registrado').show();
            }
        });
    }
};

$(class_editor.ready);
