<style>
.center {
  display: flex;
  align-items: center;
  background-color: white;
  justify-content: center;
}
</style>

<div class="row">
    <div id="div_grafica" class="col-sm-12 form-group" >
        <label for="grafica">URL oai de su revista</label>
        <input type="text" class="form-control" name="grafica" id="url_oai">
    </div>
</div>
<div class="row"><br></div>
<div class="row">
    <center>
        <button type="button" class="btn btn-warning" id="btn_verificar">Verificar</button>
    </center>
</div>
<div class="row"><br></div>
<div id="informacion" style="display: none">
<div class="row">
    <div class="col-xs-12 col-sm-12">
        <b>Revista:</b>
        <span id='revista'></span>
    </div>
    <div class="col-xs-12 col-sm-12">
        <b>ISSN impreso:</b>
        <span id='issni'></span>
    </div>
    <div class="col-xs-12 col-sm-12">
        <b>ISSN electrónico:</b>
        <span id='issne'></span>
    </div>
</div>

<div class="row"><br></div>

<div class="row">  
    <div class="col-xs-12 col-sm-12">
        <b>Título en Portal ISSN (impreso):</b>
        <span id='revistai'></span>
    </div>
    <div class="col-xs-12 col-sm-12">
        <b>Título en Portal ISSN (online):</b>
        <span id='revistae'></span>
    </div>
</div>

<div class="row"><br></div>

<div class="row">  
    <div class="col-xs-12 col-sm-12">
        <b>Entidad editora:</b>
        <span id='editor'></span>
    </div>
    <div class="col-xs-12 col-sm-12">
        <b>URL en Portal ISSN:</b>
        <span id='url'></span>
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
    
<div id="area_c2">
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

<div id="area_cons">
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
    <div class="col-xs-12" id="rev_dois">
        <b><span id='consis_dois'></span></b>
        <br><br>
        <div id='container4' class="center">
            <p><b><span id='dois'></span></b></p>
            <br>
            <p><b><span id='orcid'></span></b></p>
        </div>
    </div>
    <!--div class="col-xs-6 back">
        <b><span id='consis_dois'></span></b>
        <br><br>
        <div id='container4'>
        </div>
    </div-->
</div>
    
<div class="row"><br></div>

<div class="row">
    <div class="col-xs-12">
        <div id="div_resultado">
        </div>
    </div>
</div>
