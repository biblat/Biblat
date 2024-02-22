<div class="row"><br></div>
<!--center><div class="row"><b>Meta del departamento:</b> 1000 Registros</div></center>
<div class="row"><br></div>
<div class="row"><br></div>
<div class="progress">
  
</div-->

<div class="row" style="display:none">
    <div class="col-sm-12">
        <center>
        <button id="btn_nuevo_articulo" type="button" class="btn btn-warning">
            <i class="fa fa-file" aria-hidden="true"></i><span> Agregar artículo </span></button>
        </center>
    </div>
</div>

<div class="row">
    <div class="col-sm-12">
        <div class="row" id="div_nuevo_articulo" style="display:none;">
            <div class="col-sm-12">
                <span><b>Revista:</b></span><br>
                <select class="form-control" name="revista" id="revista_sel" style="width:100%" width="100%">
                </select>
            </div>
            <div class="col-sm-12"><br></div>
            <div class="col-sm-12">
                <span><b>Año:</b></span><br>
                <select class="form-control" name="año" id="anio_rev" style="width:50%" width="50%">
                </select>
            </div>
            <div class="col-sm-12"><br></div>
            <div class="col-sm-12">
                <span><b>Seleccionar del listado o especificar:</b></span><br><br>
                <span>Listado:</span><br>
                <select class="form-control" name="número" id="sel_numero" style="width:50%;" width="50%">
                </select>
                <br><br>
                <div>
                    <span>Especificar:</span><br>
                    <span style="width:50px;display:inline-block"><b>Vol. :</b></span><input id='txt_vol' style="width:50px;"><span>&nbsp;&nbsp;</span><input type="checkbox" id="sin_vol" value="0" class="check"><span>&nbsp;</span>Sin volumen<br><br>
                    <span style="width:50px;display:inline-block"><b>Num. :</b></span><input id='txt_num' style="width:50px;"><span>&nbsp;&nbsp;</span><input type="checkbox" id="sin_num" value="0" class="check"><span>&nbsp;</span>Sin número<br><br>
                    <span style="width:50px;display:inline-block"><b>Parte :</b></span> <input type="checkbox" id="p_esp" class="check"><span>&nbsp;</span>Especial <span>&nbsp;&nbsp;</span> <input type="checkbox" id="p_sup" class="check"><span>&nbsp;</span>Suplemento <span>&nbsp;&nbsp;</span> <input type="checkbox" id="p_est" class="check"><span>&nbsp;</span>Estación del año <span>&nbsp;&nbsp;</span> <input type="checkbox" id="p_no" class="check"><span>&nbsp;</span>No aplica<br><br>
                    <div id="div_suplemento" style="display:none"><span style="display:inline-block"><b>Número de suplemento :&nbsp;</b></span><input id='txt_num_sup' style="width:50px;"><span>&nbsp;&nbsp;</span><input type="checkbox" id="sin_num_sup" value="0" class="check"><span>&nbsp;</span>Sin número<br><br></div>
                    <div id="div_especial" style="display:none"><span style="display:inline-block"><b>Número de especial :&nbsp;</b></span><input id='txt_num_esp' style="width:50px;"><span>&nbsp;&nbsp;</span><input type="checkbox" id="sin_num_esp" value="0" class="check"><span>&nbsp;</span>Sin número<br><br></div>
                    <div id="div_estacion" style="display:none">
                    <span style="display:inline-block"><b>Estación :&nbsp;</b></span>
                    <select class="form-control" name="estacion" id="sel_estacion" style="width:150px;display:inline-block">
                        <option value="primavera" selected>Primavera</option>
                        <option value="verano">Verano</option>
                        <option value="otoño">Otoño</option>
                        <option value="invierno">Invierno</option>
                    </select>
                    </div>
                </div>
            </div>
            <div class="col-sm-12"><br></div>
            <div class="col-sm-12" id="div_titulos">
                <span><b>Título del artículo:</b></span><br>
                <input id='titulo_na' style="min-width: 100%" type="text" data-placement="top">
            </div>
            <div class="col-sm-12"><br><br></div>
            <center>
                <button id="agrega_titulo_na" type="button" class="btn btn-default btn-sm"> 
                    <span class="glyphicon glyphicon-plus" aria-hidden="true" style="color: #ff8000;"></span> Agregar otro título 
                </button> 
            </center>
            <div class="col-sm-12"><br><br><br></div>
            <div class="col-sm-12">
                <center>
                <button id="btn_agregar_na" type="button" class="btn btn-warning"><span> Guardar </span></button>
                <button id="btn_cancelar_na" type="button" class="btn btn-warning"><span> Cancelar </span></button>
                </center>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-sm-12">
        <div id="div_tabla" style="display:block">
        </div>
    </div>
</div>

<div class="row"><br></div>

<div class="row">
    <div class="col-sm-12">
        <div class="panel-group" id="accordion" style="display: none">
            <div class="panel panel-default">
                <div class="panel-heading">
                  <h5 class="panel-title">
                      <span id="titRevista"></span><br><br>
                      <b><span id="titArticulo"></span></b>
                      <br><br>
                      <center>
                          <button id="save-no-indizable" type="button" class="btn btn-dark"><i class="fa fa-thumbs-down" aria-hidden="true" style="color: darkred;"></i> <span>No indizable</span></button>
                          <button id="save-full" type="button" class="btn btn-dark"><i class="fa fa-thumbs-up" aria-hidden="true" style="color: darkgreen;"></i> <span>Análisis completo</span></button>
                      </center>
                  </h5>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                  <h5 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#articulo">
                        Artículo
                      </a>
                      <button id="save-article" type="button" class="btn btn-dark" style="float: right;"><i class="fa fa-file" aria-hidden="true" style="color: #ff8000;"></i><span> Guardar artículo</span></button>
                      <br><br>
                  </h5>
                </div>
                <div id="articulo" class="panel-collapse collapse in">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-xs-8">
                                <span><b>Título:</b></span><br><input id='titulo' style="min-width: 100%" type="text" data-toggle="tooltip" data-placement="top" title="[Enter] para revisar">
                                <div id="check-titulo" style="display: none">
                                    <i class="fa fa-file-pdf-o" aria-hidden="true" style="color: darkred"></i>
                                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                                    <span id="check-titulo-texto" style="display: false"></span>
                                    <i id="check-titulo-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>
                                    <i id="check-titulo-broken" class="fa fa-chain-broken" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo-false" class="fa fa-exclamation-circle" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo-half" class="fa fa-star-half-o" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo-true" class="fa fa-star" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <span><b>Idioma:</b></span><br>
                                    <select id='idioma' style="min-width: 100%">
                                        <option value="Español" >Español</option>
                                        <option value="Inglés" >Inglés</option>
                                        <option value="Portugués" >Portugués</option>
                                    </select>
                                <div id="check-idioma" style="display: none">
                                    <i id="check-idioma-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>
                                    <span id="check-idioma-texto" style="display: false"></span>
                                    <i id="check-idioma-true" class="fa fa-star" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-idioma-false" class="fa fa-exclamation-circle" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-8 traduccion-titulo2">
                                <br>
                                <span><b>Título traducido:</b></span><br><input id='titulo2' style="min-width: 100%" type="text">
                                <div id="check-titulo2" style="display: none">
                                    <i class="fa fa-file-pdf-o" aria-hidden="true" style="color: darkred"></i>
                                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                                    <span id="check-titulo2-texto" style="display: false"></span>
                                    <i id="check-titulo2-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>
                                    <i id="check-titulo2-broken" class="fa fa-chain-broken" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo2-false" class="fa fa-exclamation-circle" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo2-half" class="fa fa-star-half-o" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo2-true" class="fa fa-star" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                </div>
                            </div>
                            <div class="col-xs-4 traduccion-titulo2">
                                <br>
                                <span><b>Idioma:</b></span><br>
                                    <select id='idioma2' style="min-width: 100%">
                                        <option value="Español" >Español</option>
                                        <option value="Inglés" >Inglés</option>
                                        <option value="Portugués" >Portugués</option>
                                    </select>
                                <div id="check-idioma2" style="display: none">
                                    <i id="check-idioma2-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>
                                    <span id="check-idioma2-texto" style="display: false"></span>
                                    <i id="check-idioma2-true" class="fa fa-star" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-idioma2-false" class="fa fa-exclamation-circle" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-8 traduccion-titulo3">
                                <br>
                                <span><b>Título traducido:</b></span><br><input id='titulo3' style="min-width: 100%" type="text">
                                <div id="check-titulo3" style="display: none">
                                    <i class="fa fa-file-pdf-o" aria-hidden="true" style="color: darkred"></i>
                                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                                    <span id="check-titulo3-texto" style="display: false"></span>
                                    <i id="check-titulo3-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>
                                    <i id="check-titulo3-broken" class="fa fa-chain-broken" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo3-false" class="fa fa-exclamation-circle" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo3-half" class="fa fa-star-half-o" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo3-true" class="fa fa-star" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                </div>
                            </div>
                            <div class="col-xs-4 traduccion-titulo3">
                                <br>
                                <span><b>Idioma:</b></span><br>
                                    <select id='idioma3' style="min-width: 100%">
                                        <option value="Español" >Español</option>
                                        <option value="Inglés" >Inglés</option>
                                        <option value="Portugués" >Portugués</option>
                                    </select>
                                <div id="check-idioma3" style="display: none">
                                    <i id="check-idioma3-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>
                                    <span id="check-idioma3-texto" style="display: false"></span>
                                    <i id="check-idioma3-true" class="fa fa-star" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-idioma3-false" class="fa fa-exclamation-circle" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <br>
                        </div>
                        <div class="row">
                            <div class="col-xs-12 form-group">
                                <span><b>Tipo de documento:</b></span><br><select width="100%" style="width: 100%" id="tipo_documento" class="form-control">
                                    </select>
                            </div>
                        </div>
                        <div class="row">
                            <br>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <span><b>Disciplina 1:</b></span><br><select width="100%" style="width: 100%" id="disciplina1" class="form-control disciplina"></select>
                                <div id="divSubdisciplina1" style="display: none">
                                    <br>
                                    <span><b>Subdisciplina 1:</b></span><br><select width="100%" style="width: 100%" id="subdisciplina1" class="form-control"></select>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <span><b>Disciplina 2:</b></span><br><select width="100%" style="width: 100%" id="disciplina2" class="form-control disciplina"></select>
                                <div id="divSubdisciplina2" style="display: none">
                                    <br>
                                    <span><b>Subdisciplina 2:</b></span><br><select width="100%" style="width: 100%" id="subdisciplina2" class="form-control"></select>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <span><b>Disciplina 3:</b></span><br><select width="100%" style="width: 100%" id="disciplina3" class="form-control disciplina"></select>
                                <div id="divSubdisciplina3" style="display: none">
                                    <br>
                                    <span><b>Subdisciplina 3:</b></span><br><select width="100%" style="width: 100%" id="subdisciplina3" class="form-control"></select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <br>
                        </div>
                        <div class="row">
                            <div class="col-xs-8">
                                <span><b>URL1:</b></span><br><input id="url1" style="min-width: 100%" type="text">
                            </div>
                            <div class="col-xs-4">
                                <span><b>Tipo URL1:</b></span><br>
                                <select id='tipourl1' style="min-width: 100%">
                                    <option value="html" >HTML</option>
                                    <option value="pdf" >PDF</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <br>
                            <div class="col-xs-8">
                                <span><b>URL2:</b></span><br><input id="url2" style="min-width: 100%" type="text">
                            </div>
                            <div class="col-xs-4">
                                <span><b>Tipo URL2:</b></span><br>
                                <select id='tipourl2' style="min-width: 100%">
                                    <option value="html" >HTML</option>
                                    <option value="pdf" >PDF</option>
                                </select>
                            </div>
                        </div>
                        <div class="row" id="div_palabras_clave" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <b>Palabras clave IA:</b><span id="palabras_clave"></span>
                            </div>
                        </div>
                        <div class="row" id="div_palabras_clave2" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <b>Palabras clave AB:</b><span id="palabras_clave2"></span>
                            </div>
                        </div>
                        <div class="row">
                            <br>
                            <center>
                                <button id="import-ai" type="button" class="btn btn-dark" style="display:none"><img class="imagen" src="{base_url('img/aie.png')}" style="filter: invert(0.5) sepia(9) hue-rotate(0deg) saturate(1000%);height:20px;display:inline-block"><span> Extraer de PDF</span></button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                  <h5 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#instituciones" id="accordionInstituciones">
                        Instituciones
                      </a>
                      <button id="save-instituciones" type="button" class="btn btn-dark" style="float: right;"><i class="fa fa-university" aria-hidden="true" style="color: #ff8000;"></i><span> Guardar instituciones</span></button>
                      <br><br>
                  </h5>
                </div>
                <div id="instituciones" class="panel-collapse collapse">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="panel-body" id="div-instituciones">
                                
                            </div>
                            <center>
                            <button id="agrega-institucion" type="button" class="btn btn-default btn-sm"> 
                                <span class="glyphicon glyphicon-plus" aria-hidden="true" style="color: #ff8000;"></span> Agregar Institución 
                            </button> 
                            </center>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                  <h5 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#autores" id="accordionAutores">
                        Autores
                      </a>
                      <button id="save-autores" type="button" class="btn btn-dark" style="float: right;"><i class="fa fa-users" aria-hidden="true" style="color: #ff8000;"></i><span> Guardar autores</span></button>
                      <br><br>
                  </h5>
                </div>
                <div id="autores" class="panel-collapse collapse">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="panel-body" id="div-autores">
                                
                            </div>
                            <center>
                            <button id="agrega-autor" type="button" class="btn btn-default btn-sm"> 
                                <span class="glyphicon glyphicon-plus" aria-hidden="true" style="color: #ff8000;"></span> Agregar Autor
                            </button> 
                            </center>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row"><br><br><br><br><br><br><br></div>