<style>
.center {
  display: flex;
  align-items: center;
  background-color: white;
  justify-content: center;
}
</style>
<div class="row">
    <div class="col-md-12">
        Este módulo de indización incorpora un sistema de procesamiento empleando inteligencia artificial para identificar conceptos clave presentes en el contenido de un artículo. El sistema genera una propuesta preliminar de términos candidatos. Posteriormente, se ejecuta un proceso de correspondencia semántica con el vocabulario controlado histórico de Biblat, con el propósito de normalizar la selección y garantizar la coherencia terminológica dentro del catálogo.
        <br>Para iniciar el proceso, ingrese el texto del artículo en el espacio habilitado o cargue el archivo correspondiente en formato PDF.
    </div>
</div>
<div class="row"><br></div>

<div id="otro_sistema">
    <div class="row">
        <div class="col-md-11 col-md-offset-1">
            <b>API_KEY Gemini</b>
        </div>
    </div>
    <div class="row">
        <div class="col-md-11 col-md-offset-1">
            <input id="api_key" class="form" style="width:100%">
        </div>
    </div>
</div>
<div class="row"><br></div>
<div class="row">
    <div style="margin-left: 110px">
        <button type="submit" class="btn btn-warning" id="btn_cifrar">Cifrar mi API_KEY</button>
    </div>
</div>

<div class="row"><br></div>

<div class="row">
    <div class="col-md-11 col-md-offset-1">
        <b>API_KEY cifrada:</b><br>
        <div id="res_api_key" style="margin-left: 50px;"></div>
    </div>
</div>
    
<div class="row"><br><br></div>
