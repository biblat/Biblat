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
<form id="formPDF">
<div id="otro_sistema">
    <div class="row">
        <div class="col-md-11 col-md-offset-1">
            <b>Texto del artículo</b>
        </div>
    </div>
    <div class="row">
        <div class="col-md-11 col-md-offset-1">
            <textarea name="texto" id="texto_art" class="form" style="width:100%; height: 250px; max-height: 400px; overflow-y: auto"></textarea>
        </div>
    </div>
</div>
<div class="row"><br></div>
<div class="row">
        <div class="col-sm-12">
            <center>
                <input type="file" name="archivo" id="archivo" accept=".pdf">
                <!--<button type="submit" class="btn btn-warning">Importar archivo</button>-->
            </center>
        </div>
    </div>
<div class="row"><br></div>
<div class="row">
    <div style="margin-left: 100px">
        <button type="submit" class="btn btn-warning" id="btn_generar">Generar palabras clave</button>
    </div>
</div>
</form>
<div class="row"><br></div>

<div class="row" id="resultados" style="display:none">
    <div class="col-md-11 col-md-offset-1">
        <b>Resultado en idioma original:</b><br>
        <div id="div_resultado_orig" style="margin-left: 50px;">
        </div><br>
        <b>Resultado en español:</b><br>
        <div style="margin-left: 50px;">
            <b>Palabras clave:</b><br>
            <div id="div_resultado_esp" style="margin-left: 50px;">
            </div>
            <b>Entidades:</b><br>
            <div id="div_resultado_ent" style="margin-left: 50px;">
            </div><br>
        </div>
        <b>Resultado alineado a catálogo en Biblat:</b><br>
        <div id="div_resultado_biblat" style="margin-left: 50px;">
        </div>
    </div>
</div>

<div class="row"><br></div>