eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 a(b){2 c=\'\';4(2 1=0;1<b.5;1++){c+=\'\'+b.6(1).7(8)}9 c}',13,13,'|i|var|function|for|length|charCodeAt|toString|16|return|||'.split('|'),0,{}));
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 b(a){3 a=a.5();3 c="";6(3 1=0;1<a.7;1+=2)c+=8.9(d(a.e(1,2),f));g c}',17,17,'|i||var|function|toString|for|length|String|fromCharCode||||parseInt|substr|16|return'.split('|'),0,{}));

/*function handleGoogleSignIn(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    var token = response.credential;
    var parts = token.split('.');
    var encodedPayload = parts[1];
    var decodedPayload = atob(encodedPayload);
    var responsePayload = JSON.parse(decodedPayload);
    alert('hola');
    $.post('<?=site_url("adminb/listado");?>', {"id_token": response.credential}, function(result){
        
    });
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
}

function initGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: '',
      auto_select: true,
      callback: handleGoogleSignIn
    });
    const parent = document.getElementById('google_btn');
    google.accounts.id.renderButton(parent, {theme: "filled_blue"});
    google.accounts.id.prompt();
}

$(document).ready(function() {
    initGoogleSignIn();
});
*/

function initGoogleAccount(mensaje){
    $("#mensaje").html(mensaje);
    google.accounts.id.initialize({
            client_id: b(env.C_I),
            callback: handleGoogleSignIn2
        });
    const parent = document.getElementById('google_btn');
    google.accounts.id.renderButton(parent, {theme: "filled_blue"});
    google.accounts.id.prompt();
    // Mostrar el botón de inicio de sesión
    document.getElementById('google_btn').style.display = 'block';
}

function handleGoogleSignIn2(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    var token = response.credential;
    var parts = token.split('.');
    var encodedPayload = parts[1];
    var decodedPayload = atob(encodedPayload);
    var responsePayload = JSON.parse(decodedPayload);
    LeerSheet(responsePayload.email, token);
}

function handleGoogleSignIn(googleUser) {
  // Aquí puedes obtener información del usuario que ha iniciado sesión.
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  LeerSheet(profile.getEmail(), googleUser.wc.id_token);
  // Ocultar el botón de inicio de sesión
  document.getElementById('google_btn').style.display = 'none';
}

function initGoogleSignIn() {
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
        handleGoogleSignIn(user);
      } else {
            initGoogleAccount("Inicie sesión con su cuenta institucional Biblat");
            loading.end();
      }
    });
  });
}

initGoogleSignIn();

function LeerSheet(usuario, token){
    var cons = {
        DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
    };
    
    var object = {
                private_key: env.P_K,
                client_email: b(env.C_E),
                scopes: cons.SCOPES,
            };
    var objUsr={};
    gapi.load("client", async function(){
                gapi.auth.setToken(await GetAccessTokenFromServiceAccount.do(object));
                gapi.client.init({
                    discoveryDocs: cons.DISCOVERY_DOCS,
                }).then(function () {
                    //Lectura de hoja de cálculo, se requiere el ID y la hoja de la que leerá
                    gapi.client.sheets.spreadsheets.values.get({
                        spreadsheetId: b(env.sId),
                        range: "Usuarios",
                    }).then(function(res) {
                        $.each(res.result.values, function(i,val){
                            if(i > 0){
                                if(val[0] == usuario){
                                    objUsr.usuario = usuario;
                                    objUsr.nombre = val[2];
                                    objUsr.rol = val[1];
                                    objUsr.usu_base = val[3];
                                    return false;
                                }
                            }
                        });
                        if(objUsr.usuario == undefined){
                            initGoogleAccount("Su usuario no está registrado en Biblat");
                            loading.end();
                        }else{
                            //Existe una sesión y es usuario en Biblat
                            objUsr.id_token = token;
                            $.post('<?=site_url("sesion/valida");?>', objUsr, function(result){
                                window.location.href = '<?=site_url("'+result.page+'");?>';
                            });
                        }
                    });
                });
    });
}