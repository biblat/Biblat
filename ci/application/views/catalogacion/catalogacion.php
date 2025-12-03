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
        Este módulo de indización incorpora un sistema de procesamiento empleando inteligencia artificial generativa para extraer conceptos clave más representativos del contenido de un artículo (no por frecuencia)​. El sistema genera una propuesta preliminar de términos candidatos. Posteriormente, se ejecuta un proceso de correspondencia semántica con el vocabulario controlado histórico de Biblat, con el propósito de normalizar la selección y garantizar la coherencia terminológica dentro del catálogo.
        <br>Para iniciar el proceso, ingrese el texto del artículo en el espacio habilitado o cargue el archivo correspondiente en formato PDF.
    </div>
    
    <div class="col-md-12">
        <br>
        <span id="usos-sugeridos" style="color: #DF6521;cursor: pointer"><span class="fa fa-plus fa-fw"> </span>Usos sugeridos​</span>
    <div style="display: none" id="usos-sugeridos-div">
        <ul>
            <li>Para autores: utilice este sistema para identificar los términos que mejor representan el contenido de su artículo y utilícelos como palabras clave. Para una precisión mayor se recomienda optar por términos que coinciden con el vocabulario controlado de Biblat.​</li>
            <li>Para editores: elija mejores términos para representar el contenido dentro del registro en OJS. Se sugiere siempre informar al autor del documento. Para una precisión mayor se recomienda optar por términos que coinciden con el vocabulario controlado de Biblat.</li>
        </ul>
    </div>
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
    <div style="margin-left: 150px; width:80%; font-size: 11px">
        <p>
            * Advertencia y descargo de responsabilidad​<br>
              Esta aplicación funciona con el modelo de lenguaje Gemini en su versión gratuita. Biblat no es responsable de los resultados obtenidos, tampoco almacena copias de los archivos o del texto utilizado, ni tiene control sobre el uso que el proveedor del modelo (Google) pueda hacer de los datos. Este servicio se ofrece únicamente para efectos académicos. Se recomienda utilizar únicamente información para la cual el usuario tenga permiso o autorización.​
              <br>Toda aplicación que trabaja con inteligencia artificial puede cometer errores, se debe verificar los resultados en todo momento.
        </p>
    </div>
</div>
<div class="row">
    <div style="margin-left: 100px">
        <button type="submit" class="btn btn-warning" id="btn_generar">Generar palabras clave</button>
    </div>
</div>
</form>
<div class="row"><br></div>

<div class="row" id="resultados" style="display:none">
    <div class="col-md-11 col-md-offset-1">
        <b>Resultado en idioma original:</b><span class="fa fa-question-circle fa-fw" data-toggle="tooltip" data-placement="top" title="Se muestran las palabras clave en el idioma original del documento y tal como aparecen en el mismo"> </span><br>
        <div id="div_resultado_orig" style="margin-left: 50px;">
        </div><br>
        <b>Resultado en español:</b><br>
        <div style="margin-left: 50px;">
            <b>Palabras clave:</b><span class="fa fa-question-circle fa-fw" data-toggle="tooltip" data-placement="top" title="Se muestran las palabras clave traducidas automáticamente al español. La traducción puede ser imprecisa y solo tiene fines orientativos"> </span><br>
            <div id="div_resultado_esp" style="margin-left: 50px;">
            </div>
            <b>Entidades:</b><span class="fa fa-question-circle fa-fw" data-toggle="tooltip" data-placement="top" title='Se muestran los nombres de países e instituciones que son relevantes para el contexto o contenido del documento. También son palabras clave, pero se presentan agrupadas bajo "Entidades" para una mejor distinción'> </span><br>
            <div id="div_resultado_ent" style="margin-left: 50px;">
            </div><br>
        </div>
        <b>Resultado alineado a vocabulario Biblat:</b><br>
        <div style="margin-left: 50px;">
            <b>Coinicidencias exactas:</b><span class="fa fa-question-circle fa-fw" data-toggle="tooltip" data-placement="top" title="Términos que son idénticos en el documento original y el vocabulario normalizado de Biblat"> </span><br>
            <div id="div_resultado_bib_exact" style="margin-left: 50px;">
            </div>
            <b>Aproximaciones:</b><span class="fa fa-question-circle fa-fw" data-toggle="tooltip" data-placement="top" title="Términos del vocabulario normalizado de Biblat que posiblemente corresponden a variantes o formas relacionadas del término usado en el documento original"> </span><br>
            <div id="div_resultado_bib_aprox" style="margin-left: 50px;">
            </div>
            <!--b>Entidades:</b><br>
            <div id="div_resultado_bib_ent" style="margin-left: 50px;">
            </div--><br>
        </div>
    </div>
</div>

<div class="row"><br></div>