<style>
.center {
  display: flex;
  align-items: center;
  background-color: white;
  justify-content: center;
}
</style>
<div class="row">
    <dd style="margin-left: 20px">
        <p>MetaMetrics encuentra errores de catalogación e indización en los registros de OJS. Conozca más acerca de lo que se evalúa, <a href="{site_url('sobre-metametrics')}" target="_blank">aquí</a>.</p>

        {if !$simulador and !$postularPrimera}
            <p>Seleccione alguna de las revistas ya evaluadas por la herramienta para realizar una prueba.</p>

            <p>O si desea verificar alguna otra revista, ingrese la URL oai</p>
        {/if}
        
        {if $simulador}
            <p>
                <b>Atención:</b> está utilizando un simulador de la evaluación de metadatos, los resultados arrojados son meramente informativos. Para postular una revista haga clic <a href="{site_url('postular-revista/metametrics')}">aquí</a>.
            </p>
            <p>Ingrese la URL oai de su revista.</p>
        {/if}
        
        {if $postularPrimera}
        <p>Si usted es editor de una revista que desea postular para BIBLAT, por favor, comience con la evaluación de metadatos.</p>
        {/if}
    </dd>
    
    <div id="div_grafica" class="col-sm-12 form-group" >
        <label for="grafica">URL oai de su revista</label>
        <input type="text" class="form-control" name="grafica" id="url_oai" style="display:none" placeholder="Ingrese la dirección OAI de su revista. Ejemplo: http://revistas.unam.mx/revista/oai">
        <select class="form-control" name="oai" id="url_oai_sel" style="display:none">
        </select>
        {if !$simulador and !$postularPrimera}
            <br><br>
            <label for="anio">Año de revisión</label>
            <select class="form-control" name="anio" id="anio" style="max-width:200px">
            </select>
        {/if}
        <div id="div_secciones" style="display:none">
            <br>
            <label>Secciones</label>
            <p>Se encontraron las siguientes secciones en la revista, si alguna(s) de ellas no cuenta(n) con contenido indizable (artículos originales, ensayos, reseñas de libro, revisiones bibliográficas, notas de más de una cuartilla, informes técnicos o cartas al editor), de clic para quitar la selección y no considerar para la evaluación los documentos incluídos en dicha(s) seccion(es).</p>
            <div id="group_secciones">
                
            </div>
        </div>
    </div>
</div>
<div class="row"><br></div>
<div class="row">
    <center>
        <button type="button" class="btn btn-warning" id="btn_verificar">Verificar</button>
    </center>
</div>
<div class="row"><br></div>

{if !$simulador and !$postular}
<a href="{site_url('sobre-metametrics')}" style="font-size: 15px"><b>Sobre MetaMetrics</b></a>
<br><br>
{/if}

<div id="url_vacia" style="display: none">
    <center><b>No ha seleccionado ni ingresado ninguna URL</b></center>
</div>
<div id="url_invalida" style="display: none">
    <center><b>La URL que ingresó no es válida<br><br>
            Si sólo escribió la URL de su revista, intente agregar al final "/oai"<br><br>
            Ejemplo: http://revistas.unam.mx/revista/oai</b>
    </center>
</div>
<div id="plugin" style="display: none">
    <center><b>Al parecer no tiene instalada la versión más reciente del plugin BIBLAT</b></center>
</div>
<div id="error" style="display: none">
    <center><b>Ocurrió un error al intentar obtener su información</b></center>
</div>
<div id="sinDatos" style="display: none">
    <center><b>No se encontraron publicaciones para el año seleccionado</b></center>
</div>
<div id="numFasciculos" style="display: none">
    <center><b>Al parecer su revista no cuenta con al menos 3 fascículos publicados, aún así, puede seleccionar un año en particular para su revisión.</b></center>
    <br><br>
    <center>
        <b>Si su portal aloja múltiples revistas, asegúrese de indicar la URL de una revista en específico, la URL contiene el identificador de la revista</b><br><br>
        <b>Ejemplo:</b> https://bibliographica.iib.unam.mx/index.php/<span style="font-size:20px"><b>RB</b></span>/oai
    
    </center>
</div>
<div>
    <center>
        <b><span id="estatus"></span></b>
    </center>
</div>
<div id="informacion" style="display: none">
<div class="row">
    <div class="col-xs-12 col-sm-12">
        <b>Revista:</b>
        <span id='revista'></span>
    </div>
    <div class="col-xs-12 col-sm-12">
        <b>Entidad editora:</b>
        <span id='editor'></span>
    </div>
    <div class="col-xs-12 col-sm-12">
        <b id="issn1">ISSN impreso:</b>
        <span id='issni' class="color-fondo"></span>
        <span id="issni-t" title="No se encontraron problemas con el ISSN impreso" class="fa fa-check fa-2x" style="color:lightgreen;margin-left:50px;display:none"></span>
        <span id="issni-f" title="Se encontraron diferencias con el ISSN impreso recuperado del Portal ISSN Internacional" class="fa fa-exclamation-triangle fa-2x" style="color:lightsalmon;margin-left:50px;display:none"></span>
    </div>
    <div class="col-xs-12 col-sm-12">
        <b id="issn2">ISSN electrónico:</b>
        <span id='issne' class="color-fondo"></span>
        <span id="issne-t" title="No se encontraron problemas con el ISSN electrónico" class="fa fa-check fa-2x" style="color:lightgreen;margin-left:50px;display:none"></span>
        <span id="issne-f" title="Se encontraron diferencias con el ISSN electrónico recuperado del Portal ISSN Internacional" class="fa fa-exclamation-triangle fa-2x" style="color:lightsalmon;margin-left:50px;display:none"></span>
    </div>
</div>

<div class="row"><br></div>

<div class="row">  
    <div class="col-xs-12 col-sm-12">
        <b>Título en Portal ISSN (impreso):</b>
        <span id='revistai' class="color-fondo"></span>
        <span id="revistai-t" title="No se encontraron diferencias con el título recuperado del Portal ISSN Internacional" class="fa fa-check fa-2x" style="color:lightgreen;margin-left:50px;display:none"></span>
        <span id="revistai-f" title="Se recomienda verificar el título de la revista registrado en el Portal ISSN Internacional. El título registrado no coincide con el publicado en OJS" class="fa fa-exclamation-triangle fa-2x" style="color:lightsalmon;margin-left:50px;display:none"></span>
    </div>
    <div class="col-xs-12 col-sm-12">
        <b>Título en Portal ISSN (online):</b>
        <span id='revistae' class="color-fondo"></span>
        <span id="revistae-t" title="No se encontraron diferencias con el título recuperado del Portal ISSN Internacional" class="fa fa-check fa-2x" style="color:lightgreen;margin-left:50px;display:none"></span>
        <span id="revistae-f" title="Se recomienda verificar el título de la revista registrado en el Portal ISSN Internacional. El título registrado no coincide con el publicado en OJS" class="fa fa-exclamation-triangle fa-2x" style="color:lightsalmon;margin-left:50px;display:none"></span>
    </div>
</div>

<div class="row"><br></div>

<div class="row">  
    <div class="col-xs-12 col-sm-12">
        <b>Entidad editora en portal ISSN:</b>
        <span id='editorp' class="color-fondo"></span>
        <span id="editorp-t" title="No se encontraron diferencias con la entidad editora recuperada del Portal ISSN Internacional" class="fa fa-check fa-2x" style="color:lightgreen;margin-left:50px;display:none"></span>
        <span id="editorp-f" title="Se recomienda verificar la entidad editora registrada en el Portal ISSN Internacional. La entidad editora registrada no coincide con la publicada en OJS" class="fa fa-exclamation-triangle fa-2x" style="color:lightsalmon;margin-left:50px;display:none"></span>
    </div>
    <div class="col-xs-12 col-sm-12">
        <b>URL en Portal ISSN:</b>
        <span id='url' class="color-fondo"></span>
        <span id="url-t" title="No se encontraron diferencias con el URL de la revista recuperado del Portal ISSN Internacional" class="fa fa-check fa-2x" style="color:lightgreen;margin-left:50px;display:none"></span>
        <span id="url-f" title="Se recomienda verificar el URL de la revista registrado en el Portal ISSN Internacional. El URL de la revista registrado no coincide con el publicado en OJS" class="fa fa-exclamation-triangle fa-2x" style="color:lightsalmon;margin-left:50px;display:none"></span>
    </div>
    <div class="col-xs-12 col-sm-12">
        <b>País en portal ISSN:</b>
        <span id='pais'></span>
    </div>
</div>

<div class="row"><br></div>

<div class="row">  
    <div class="col-xs-12 col-sm-12">
        <b>Idiomas de publicación:</b>
        <span id='idiomas'></span>
    </div>
    <div class="col-xs-12 col-sm-12">
        <b>Idioma principal:</b>
        <span id='idiomap'></span>
    </div>
</div>
</div>

<div class="row"><br></div>

<div class="row">
    <div class="col-sm-6">
        <b><span id='numeros'></span></b>
        <br><br>
        <div id='container'>
        </div>
    </div>
</div>

<div class="row"><br></div>

<div class="row">
    <div class="col-xs-12">
        <button type="button" class="btn btn-warning btn_val" id="btn_prom_suf" style="float:right;width:150px;display:none">Ver promedio</button>
    </div>
</div>
<div class="area" id="area_c2">
    <div class="row front">
        <div class="col-xs-6 col-sm-6">
            <b><span id='autores'></span></b>
            <br><br>
                <div id='container2'> 
                </div>
        </div>
        <div class="col-xs-6 col-sm-6">
            <b><span id='documentos'></span></b>
            <br><br>
            <div id='container3'>
            </div>
        </div>
    </div>
    <div class="row back">
        <div class="col-xs-12">
            <b><span id='promedio'></span></b>
            <br><br>
            <div id='containerp'>
            </div>
        </div>
    </div>
</div>

<div class="row"><br></div>

<div class="row">
    <div class="col-xs-12">
        <button type="button" class="btn btn-warning btn_val" id="btn_prom_cons" style="float:right;width:150px;display:none">Ver promedio</button>
    </div>
</div>
<div class="area" id="area_cons">
    <div class="row front">
        <div class="col-xs-6 col-sm-6">
            <b><span id='consis_autores'></span></b>
            <br><br>
            <div id='container_c1'>
            </div>
        </div>
        <div class="col-xs-6 col-sm-6">
            <b><span id='consis_documentos'></span></b>
            <br><br>
            <div id='container_c2'>
            </div>
        </div>
    </div>
    <div class="row back">
        <div class="col-xs-12">
            <b><span id='consis_promedio'></span></b>
            <br><br>
            <div id='containerp2'>
            </div>
        </div>
    </div>
</div>

<div class="row"><br></div>

<div class="row">
    <div class="col-xs-12">
        <button type="button" class="btn btn-warning btn_val" id="btn_prom_prec" style="float:right;width:150px;display:none">Ver promedio Final</button>
    </div>
</div>
<div class="area" id="area_prec" style="display:none">
    <div class="row front">
        <div class="col-xs-12" id="rev_dois">
            <b><span id='consis_dois'></span></b>
            <br><br>
            <div id='container4' class="center">
                <p><b><span id='dois'></span></b></p>
                <br>
                <p><b><span id='orcid'></span></b></p>
            </div>
        </div>
    </div>
    <div class="row back">
        <!--div class="col-xs-6 col-sm-6">
            <b><span id='prec_promedio'></span></b>
            <br><br>
            <div style="background-color:white">
                <p style="padding: 25px"><span id="txt_val_final"></span></p>
            </div>
            <br><br>
        </div-->
<!--        <div class="col-xs-6 col-sm-6">-->
        <div class="col-xs-12">
            <b><span>&nbsp;</span></b>
            <br><br>
            <div id='container_prec'>
            </div>
        </div>
    </div>
</div>

<div class="row"><br></div>
    
<div class="row" style="background-color:white;margin:1px" style="display:none">
        <p style="padding: 25px"><span id="txt_val_final"></span></p>
</div>

<div class="row"><br></div>
<div class="row">
    <center>
        <button type="button" class="btn btn-warning" style="display:none" id="btn_pdf">Descargar Resumen en PDF</button>
    </center>
</div>
<div class="row"><br></div>

<div class="row">
    <div class="col-xs-12">
        <div id="div_resultado">
        </div>
    </div>
</div>
