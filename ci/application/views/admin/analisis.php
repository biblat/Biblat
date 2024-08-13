<script>
    const cons =    { 
                        rol: Object.freeze( { val: '<?php echo $rol; ?>'}),
                        pal_cla: Object.freeze( { val: '<?php echo $pal_cla; ?>'}),
                        res: Object.freeze( { val: '<?php echo $res; ?>'})
                    };
</script>

<style>
    input[type="checkbox"]{
        display: none;
    }
    input[type="checkbox"] + label:before {
    border: 1px solid #7f83a2;
    content: "\00a0";
    display: inline-block;
    font: 16px/1em sans-serif;
    height: 16px;
    margin: 0 .25em 0 0;
    padding: 0;
    vertical-align: top;
    width: 16px;
  }
  input[type="checkbox"]:checked + label:before {
    --background: #3d404e;
    color: #ff8000;
    content: "\2714";
    text-align: center;
  }
  input[type="checkbox"]:checked + label:after {
    font-weight: bold;
  }
  .edita_palabra, .edita_keyword{
      color: gray;
      cursor: pointer;
  }
  .edita_palabra:hover, .edita_keyword:hover, .sug-ciudad-clic:hover{
      color: #ff8000!important;
  }
  .despacio {
    transition: all 3s;
  }
</style>
<div class="row"><br></div>
<!--center><div class="row"><b>Meta del departamento:</b> 1000 Registros</div></center>
<div class="row"><br></div>
<div class="row"><br></div>
<div class="progress">
  
</div-->

<div class="row" style="">
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
            <!--div class="col-sm-12">
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
            <div class="col-sm-12"><br></div-->
            <div class="col-sm-12" id="div_titulos">
                <span><b>Título del artículo:</b></span><br>
                <input id='titulo_na' style="min-width: 100%" type="text" data-placement="top">
                <br><span><b>Páginas del artículo:</b></span><br>
                <input id="de_p" style="min-width: 10%" type="text" data-placement="top" placeholder="Página inicial"> - 
                <input id="a_p" style="min-width: 10%" type="text" data-placement="top" placeholder="Página final">
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
    <div class="col-xs-12" id="div-filtro" style="">
        <div class="btn-group" role="group">
        <!-- Split button -->
        <div class="btn-group">
            <button type="button" class="btn btn-warning" id="btn-filtro" style="width:160px;border-radius:5px">Filtrar por :</button>
            <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="border-radius:5px">
            <span class="caret"></span>
            <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" style="border-radius:5px">
                <li><a class="li-filtro" id="estatus">Estatus</a></li>
                <li><a class="li-filtro" id="fechaAsignado">Fecha asignado</a></li>
                <li><a class="li-filtro" id="mes">Completados por mes</a></li>
                <li><a class="li-filtro" id="revista">Revista</a></li>
            </ul>
        </div>
        </div>
        <div class="btn-group" role="group">
            <!-- Split button -->
            <div class="btn-group">
              <button type="button" class="btn" id="btn-filtro2" style="border-radius:5px">Seleccione</button>
              <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="border-radius:5px">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu" id="ul-filtro" style="border-radius:5px">
              </ul>
            </div>
        </div>
        <br><br>
            <button id="remove" type="button" class="btn btn-default btn-sm" style="display: none">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Quitar filtro
            </button>
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
                            {if $rol == "Editor"}
                                <button id="save-full" type="button" class="btn btn-dark"><i class="fa fa-thumbs-up" aria-hidden="true" style="color: darkgreen;"></i> <span>Completado</span></button>
                            {else}
                                <button id="save-no-indizable" type="button" class="btn btn-dark"><i class="fa fa-thumbs-down" aria-hidden="true" style="color: darkred;"></i> <span>No indizable</span></button>
                                <button id="save-full" type="button" class="btn btn-dark"><i class="fa fa-thumbs-up" aria-hidden="true" style="color: darkgreen;"></i> <span>Análisis completo</span></button>
                                <button id="save-full-pc" type="button" class="btn btn-dark"><i class="fa fa-thumbs-up" aria-hidden="true" style="color: darkgreen;"></i> <span>Análisis de palabras clave completo</span></button>
                            {/if}
                      </center>
                  </h5>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                  <h5 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#articulo">
                          Artículo
                      </a><a href="<?=site_url("adminb/ayuda_articulos");?>" target="_blank" style="padding: 5px"><i class="fa fa-question-circle" style="color: #ff8000;"></i></a>
                      <button id="save-article" type="button" class="btn btn-dark" style="float: right;"><i class="fa fa-file" aria-hidden="true" style="color: #ff8000;"></i><span> Guardar artículo</span></button>
                      <button id="save-pc" type="button" class="btn btn-dark" style="float: right;"><i class="fa fa-list-ol" aria-hidden="true" style="color: #ff8000;"></i><span> Guardar palabras clave</span></button>
                      <br><br>
                  </h5>
                </div>
                <div id="articulo" class="panel-collapse collapse in">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-xs-12">
                                <span><b>Idioma(s) del documento:</b></span><br>
                                <select id='idiomaDocumento' multiple="multiple" width="100%" style="width: 100%">
                                    <option value="Español" >Español</option>
                                    <option value="Portugués" >Portugués</option>
                                    <option value="Inglés" >Inglés</option>
                                    <option value="Francés" >Francés</option>
                                    <option value="Italiano" >Italiano</option>
                                    <option value="Alemán" >Alemán</option>
                                    <option value="Ruso" >Ruso</option>
                                    <option value="Otro" >Otro</option>
                                </select>
                            </div>
                        </div>
                        <div class="row"><br></div>
                        <div class="row">
                            <div class="col-xs-8">
                                <span><b>Título:</b></span><br><input id='titulo' style="min-width: 100%" type="text" data-toggle="tooltip" data-placement="top" title="Presione [Enter] para realizar revisión" class="tooltip-titulo">
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
                                        <option value="Francés" >Francés</option>
                                        <option value="Italiano" >Italiano</option>
                                        <option value="Alemán" >Alemán</option>
                                        <option value="Ruso" >Ruso</option>
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
                                <span><b>Título traducido:</b></span><br><input id='titulo2' style="min-width: 100%" type="text" data-toggle="tooltip" data-placement="top" title="Presione [Enter] para realizar revisión" class="tooltip-titulo">
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
                                        <option value="Francés" >Francés</option>
                                        <option value="Italiano" >Italiano</option>
                                        <option value="Alemán" >Alemán</option>
                                        <option value="Ruso" >Ruso</option>
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
                                <span><b>Título traducido:</b></span><br><input id='titulo3' style="min-width: 100%" type="text" data-toggle="tooltip" data-placement="top" title="Presione [Enter] para realizar revisión" class="tooltip-titulo">
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
                                        <option value="Francés" >Francés</option>
                                        <option value="Italiano" >Italiano</option>
                                        <option value="Alemán" >Alemán</option>
                                        <option value="Ruso" >Ruso</option>
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
                                <span><b>URL1:</b></span><br><input id="url1" style="min-width: 100%" type="url">
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
                                <span><b>URL2:</b></span><br><input id="url2" style="min-width: 100%" type="url">
                            </div>
                            <div class="col-xs-4">
                                <span><b>Tipo URL2:</b></span><br>
                                <select id='tipourl2' style="min-width: 100%">
                                    <option value="html" >HTML</option>
                                    <option value="pdf" >PDF</option>
                                </select>
                            </div>
                        </div>
                        <!--comentar-->
                        <div class="row" id="div_resumen_esp" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <span><b>Resumen en español:</b></span><br>
                                <textarea id="resumen_esp" style="width: 100%; height: 100px; overflow-y: scroll;"></textarea>
                            </div>
                        </div>
                        <div class="row" id="div_resumen_ing" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <span><b>Resumen en inglés:</b></span><br>
                                <textarea id="resumen_ing" style="width: 100%; height: 100px; overflow-y: scroll;"></textarea>
                            </div>
                        </div>
                        <div class="row" id="div_resumen_por" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <span><b>Resumen en portugués:</b></span><br>
                                <textarea id="resumen_por" style="width: 100%; height: 100px; overflow-y: scroll;"></textarea>
                            </div>
                        </div>
                        <div class="row" id="div_resumen_otro" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <span><b>Resumen en otro idioma:</b></span><br>
                                <textarea id="resumen_otro" style="width: 100%; height: 100px; overflow-y: scroll;"></textarea>
                            </div>
                        </div>
                        
                        {if $rol == "Editor"}
                        <div class="row">
                            <br>
                            <br>
                            <div class="col-xs-12">
                                <p>
                                    <b>Las palabras clave serán asignadas posteriormente por el equipo de Analistas de Biblat en la correspondiente revisión del artículo.</b>
                                <p>
                            </div>
                        </div>
                        {/if}
                        
                        <div class="row" id="div_palabras_clave_texto" style="display:none">
                            <br>
                            <br>
                            <div class="col-xs-12">
                                <p>
                                A continuación se muestran las palabras claves sugeridas, palabras asentadas por autores y palabras extraídas del texto.
                                <p>
                                    (I) Seleccione las adecuadas para el artículo.<br>
                                    (II) Edite la palabra si determina que existe un término más adecuado para sustituir, considere que en adelante si se encuentra nuevamente el mismo término, se realizará la misma sustitución de manera automática.
                                </p>
                                </p>
                            </div>
                        </div>
                        
                        <div class="row" id="div_cargando_pc" style="display:none">
                            <div class="col-xs-12">
                                <b>Obteniendo palabras clave</b> ...<i id="check-titulo-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>
                            </div>
                        </div>
                        
                        <div class="row" id="div_palabras_clave_autor" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <span><b>Palabras clave guardadas:</b></span><br>
                                <span id="palabras_clave_autores"></span>
                            </div>
                        </div>
                        <div class="row" id="div_palabras_clave" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <span><b>Palabras clave sugeridas de acuerdo al texto:</b></span><br>
                                <span id="palabras_clave"></span>
                            </div>
                        </div>
                        <div class="row" id="div_palabras_clave2" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <span id="palabras_clave2"></span>
                            </div>
                        </div>
                        <div class="row">
                            <br>
                            <center>
                                <button id="add-palabra" type="button" class="btn btn-dark" style="display:none"><img class="imagen" src="{base_url('img/palabra-clave.png')}" style="filter: invert(0.5) sepia(9) hue-rotate(0deg) saturate(1000%);height:20px;display:inline-block"><span> Agregar palabra clave</span></button>
                            </center>
                        </div>
                        <div class="row" id="div_palabras_clave_n" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <span id="palabras_clave_n"></span>
                            </div>
                        </div>
                        <div class="row" id="div_keywords" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <span><b>Palabras clave traducidas al inglés:</b></span><br>
                                <span id="keywords"></span>
                            </div>
                        </div>
                        <div class="row">
                            <br>
                            <center>
                                <button id="add-keyword" type="button" class="btn btn-dark" style="display:none"><img class="imagen" src="{base_url('img/palabra-clave.png')}" style="filter: invert(0.5) sepia(9) hue-rotate(0deg) saturate(1000%);height:20px;display:inline-block"><span> Agregar keyword</span></button>
                            </center>
                        </div>
                        <div class="row" id="div_keywords_n" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <span id="keywords_n"></span>
                            </div>
                        </div>
                        <div class="row">
                            <br>
                            <center>
                                <button id="import-ai" type="button" class="btn btn-dark" style="display:none"><img class="imagen" src="{base_url('img/aie.png')}" style="filter: invert(0.5) sepia(9) hue-rotate(0deg) saturate(1000%);height:20px;display:inline-block"><span> Extraer de PDF</span></button>
                            </center>
                        </div>
                        <!--comentar-->
                    </div>
                </div>
            </div>
            <div class="panel panel-default" id="panelInstituciones">
                <div class="panel-heading">
                  <h5 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#instituciones" id="accordionInstituciones">
                        Instituciones
                      </a><a href="<?=site_url("adminb/ayuda_instituciones");?>" target="_blank" style="padding: 5px"><i class="fa fa-question-circle" style="color: #ff8000;"></i></a>
                      <button id="save-instituciones" type="button" class="btn btn-dark" style="float: right;"><i class="fa fa-university" aria-hidden="true" style="color: #ff8000;"></i><span> Guardar instituciones</span></button>
                      <br><br>
                  </h5>
                </div>
                <div id="instituciones" class="panel-collapse collapse">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="col-xs-12">
                                <input type="checkbox" id="es-corporativo" value="corporativo"><label for="es-corporativo" style="padding: 10px;"><b>Es autor corporativo</b></label>
                            </div>
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
            <div class="panel panel-default" id="avisoAutores" style="display:none">
                <div class="panel-heading">
                    <h5 class="panel-title">
                        <b>Nota:</b> Al indicar en el bloque de Instituciones que se trata de un autor corporativo, el bloque de Autores no es necesario y por lo tanto no se muestra.
                    </h5>  
                </div>
            </div>
            <div class="panel panel-default" id="panelAutores">
                <div class="panel-heading">
                  <h5 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#autores" id="accordionAutores">
                        Autores
                      </a><a href="<?=site_url("adminb/ayuda_autores");?>" target="_blank" style="padding: 5px"><i class="fa fa-question-circle" style="color: #ff8000;"></i></a>
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