<div class="row">
    <div class="col-xs-12">
        <center>
            <div><b><span id="mensaje">{$encabezado}</span></b></div>
            <br><br>
            <form id="envio_editor" method="post" style="dispaly:true">
                {if $codigo}
                    <input id="codigo" name="codigo" maxlength="10" required="" style="width:300px"><br><br>
                {else}
                    <input id="correo" name="correo" type="email" required="" style="width:300px"><br><br>
                {/if}
                <button id="enviar" type="submit" class="btn btn-warning" ><span>Enviar</span></button>
            </form>
            <div id="google_btn" style="dispaly:none"></div>
            <br><br>
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

