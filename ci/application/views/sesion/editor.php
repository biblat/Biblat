<div class="row">
    <div class="col-xs-12">
        <center>
            <div><b><span id="mensaje">Inicie sesión con su cuenta de Google registrada en Biblat Central</span></b></div>
            <div id="auth" style="display:none">
                <br>
                <center>
                    <img id="qr" src="">
                </center>
            </div>
            
            <div id="div_envio_editor" style="display:none">
                <br>
                <form id="envio_editor" method="post" >
                    Correo: <input id="correo" name="correo" type="email" required="" style="width:300px;"><br><br>
                    <button id="enviar" type="submit" class="btn btn-warning" ><span>Enviar</span></button>
                </form>
            </div>
            
            <div id="div_envio_editor2" style="display:none">
                <br>
                <form id="envio_editor2" method="post">
                    Código: <input id="codigo" name="codigo" maxlength="10" required="" style="width:300px;"><br><br>
                    <button id="enviar2" type="submit" class="btn btn-warning" ><span>Enviar</span></button>
                </form>
            </div>
            <br>
            <div id="google_btn" style="dispaly:none"></div>
            <br>
            <div class="alert alert-danger" role="alert" id="no-registrado" style="display:none">
                Correo no registrado
            </div>
            <div class="alert alert-danger" role="alert" id="no-valido" style="display:none">
                Código no válido para el usuario, intente de nuevo por favor
            </div>
            <div class="alert alert-danger" role="alert" id="error" style="display:none">
                Ocurrió un error, intente de nuevo por favor
            </div>
        </center>
    </div>
</div>

