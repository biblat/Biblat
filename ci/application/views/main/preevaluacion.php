<div class="row" id="row_comenzar">
    <div class="col-md-12">
    ¡Postule su revista ahora!<br>
    La evaluación de las revistas consta de 48 criterios: 33 de los cuales son obligatorios y 15 opcionales. Para aprobar se requiere el cumplimiento de 40 criterios: los 33 obligatorios y, al menos, 7 opcionales.<b>{_(' Se consideran todas las revistas científicas editadas en América Latina y el Caribe.')}</b><br>
    Inicie la pre-evaluación dando clic en el botón de "Comenzar". Posteriormente, los criterios se desplegarán consecutivamente y podrá navegar a través de ellos mediante la barra de números que se encontrará en la parte inferior. Para cada criterio cumplido, haga clic en el botón "Cumplo este criterio"; de lo contrario, déjelo en blanco. Podrá observar el cumplimiento alcanzado en la gráfica del lado derecho.<br>
    {if !$simulador}
    Si reúne los criterios obligatorios, podrá enviar la postulación de la revista. En caso de no cumplir con dichos criterios, le proporcionaremos un resumen de la pre-evaluación, misma que será de utilidad para procurar el cumplimiento de los criterios faltantes y realizar posteriormente la postulación.<br>
    Los resultados obtenidos en esta pre-evaluación deberán ser revisados y validados por el Comité Evaluación para emitir el dictamen definitivo de aprobación.
    {/if}
    <div class="row"><br></div>
        <center>
            <button type="button" class="btn btn-warning" id="btn_comenzar">Comenzar</button>
        </center>
    <div class="row"><br><br><br></div>
    </div>
</div>
<div id="content">
    
</div>

<div class="row" id="row_preevaluacion" hidden>
    
    <!--<div class="col-md-9" style="height:500px;overflow: auto;">-->
    <div class="col-md-8">
        
        <div id="div_criterios">
        <div class="panel panel-warning">
            <div class="panel-heading" style="height:70px">
                <h3 id="ev_texto" class="panel-title"></h3>
            </div>
            <div class="panel-body" style="height:250px;position:relative">
                <p id="ev_descripcion"></p>
                <button type="button" class="btn btn-default" id="btn_cumplo" style="position:absolute;top: 80%;left: 40%;">
                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Cumplo este criterio
                </button>
            </div>
        </div>
        <center>
        <nav aria-label="">
            <ul id="pag" class="pagination">
            </ul>
        </nav>
        </center>
        </div>
        <br>
        <div id="div_postular" hidden="">
        <div class="row">
        <div class="col-md-12">
        {if $simulador}Su revista cuenta con los puntos suficientes para postularla.{/if}
        {if !$simulador}Su revista cuenta con los puntos suficientes, si desea postularla ingrese los siguientes datos:{/if}
        </div>
        </div>
        </div>
        <div id="div_postular2" hidden="">
        <div class="row"><br></div>
        <form id="form_postular">
        
        <div class="row">
            <div class="col-md-3">
                <label for="nombre_revista">Título de la revista:</label>
            </div>
            <div class="col-md-9">
                <input id="nombre_revista" class="form" type="text" style="width:100%" required="required">
            </div>
        </div>
            
        <div class="row"><br></div>
        
        <div class="row">
            <div class="col-md-3">
                <label for="issn">ISSN:</label>
            </div>
            <div class="col-md-3">
                <input id="issn" class="form" type="text" style="width:100%" pattern="[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9A-Za-z]$" title="Formato XXXX-XXXX">
            </div>
            <div class="col-md-3">
                <label for="issne">ISSN electrónico:</label>
            </div>
            <div class="col-md-3">
                <input id="issne" class="form" type="text" style="width:100%" pattern="[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9A-Za-z]$" title="Formato XXXX-XXXX">
            </div>
        </div>
        
        <div class="row"><br></div>
        
        <div class="row">
            <div class="col-md-3">
                <label for="organizacion">Organización que edita:</label>
            </div>
            <div class="col-md-9">
                <input id="organizacion" class="form" type="text" style="width:100%" required="required">
            </div>
        </div>
        
        <div class="row"><br></div>
        
        <div class="row">
            <div class="col-md-3">
                <label for="pais">País de edición:</label>
            </div>
            <div class="col-md-3">
                <!--<input id="pais" class="form" type="text" style="width:100%;text-transform:uppercase" required="required">-->
                <select id="pais" class="form" type="text" required="required">
                    <option value='Argentina'>Argentina</option>
                    <option value='Barbados'>Barbados</option>
                    <option value='Belice'>Belice</option>
                    <option value='Bolivia'>Bolivia</option>
                    <option value='Brasil'>Brasil</option>
                    <option value='Chile'>Chile</option>
                    <option value='Colombia'>Colombia</option>
                    <option value='Costa Rica'>Costa Rica</option>
                    <option value='Cuba'>Cuba</option>
                    <option value='Ecuador'>Ecuador</option>
                    <option value='El Salvador'>El Salvador</option>
                    <option value='Guatemala'>Guatemala</option>
                    <option value='Haití'>Haití</option>
                    <option value='Honduras'>Honduras</option>
                    <option value='Jamaica'>Jamaica</option>
                    <option selected value='México'>México</option>
                    <option value='Nicaragua'>Nicaragua</option>
                    <option value='Panamá'>Panamá</option>
                    <option value='Paraguay'>Paraguay</option>
                    <option value='Perú'>Perú</option>
                    <option value='Puerto Rico'>Puerto Rico</option>
                    <option value='República Dominicana'>República Dominicana</option>
                    <option value='Trinidad y Tobago'>Trinidad y Tobago</option>
                    <option value='Uruguay'>Uruguay</option>
                    <option value='Venezuela'>Venezuela</option>
                </select>
            </div>
            
        </div>
        
        <div id="otra_institucion">
            
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <span id="add_otra_institucion" style="cursor:pointer;font-size:15px"><i class="fa fa-plus-square" aria-hidden="true"></i>&nbsp;Agregar otra institución editora</sp<n>
            </div>
        </div>
        
        <div class="row"><br></div>
        
        <div class="row">
            <div class="col-md-3">
            <label for="periodicidad">Periodicidad:</label>
            </div>
            <div class="col-md-3">
                <select id="periodicidad" class="form" type="text" style="width:100%;height:25px" required="required">
                    <option value="">Seleccione</option>
                    <option value="MENSUAL">Mensual (doce veces al año)</option>
                    <option value="BIMESTRAL">Bimestral (seis veces al año)</option>
                    <option value="TRIMESTRAL">Trimestral (cuatro veces al año)</option>
                    <option value="CUATRIMESTRAL">Cuatrimestral (tres veces al año)</option>
                    <option value="SEMESTRAL">Semestral (dos veces por año)</option>
                    <option value="ANUAL">Anual (una vez al año)</option>
                    <option value="IRREGULAR">Irregular</option>
                    <option value="PUBLICACIÓN CONTINUA">Publicación continua</option>
                </select>
            </div>
            <div class="col-md-3">
            <label for="periodicidad_anterior">Periodicidad anterior:</label>
            </div>
            <div class="col-md-3">
                <select id="periodicidad_anterior" class="form" type="text" style="width:100%;height:25px">
                    <option value="">Seleccione</option>
                    <option value="MENSUAL">Mensual (doce veces al año)</option>
                    <option value="BIMESTRAL">Bimestral (seis veces al año)</option>
                    <option value="TRIMESTRAL">Trimestral (cuatro veces al año)</option>
                    <option value="CUATRIMESTRAL">Cuatrimestral (tres veces al año)</option>
                    <option value="SEMESTRAL">Semestral (dos veces por año)</option>
                    <option value="ANUAL">Anual (una vez al año)</option>
                    <option value="IRREGULAR">Irregular</option>
                    <option value="PUBLICACIÓN CONTINUA">Publicación continua</option>
                </select>
            </div>
        </div>
        
        <div class="row"><br></div>
        
        <div class="row">
            <div class="col-md-3">
                <label for="url_revista">URL de la revista:</label>
            </div>
            <div class="col-md-3">
                <input id="url_revista" type="url" class="form"  pattern="https?://.*" size="30" style="width:100%" title="Formato: http://example.com">
            </div>
            <div class="col-md-3">
                <label for="correo">Correo electrónico:</label>
            </div>
            <div class="col-md-3">
                <input id="correo" class="form" type="email" style="width:100%" required="required">
            </div>
        </div>
        
        <div class="row"><br></div>
            
        <div class="row">
            <div class="col-md-3">
                <label for="nombre">Nombre completo del editor:</label>
            </div>
            <div class="col-md-9">
                <input id="nombre" class="form" type="text" style="width:100%" required="required">
            </div>
        </div>
            
        <div class="row"><br></div>
        
        <div class="row">
            <div class="col-md-12">
                <label for="direccion">Dirección del editor:</label>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                Calle, Número y Sector / Barrio / Colonia:
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <input id="calle" class="form" type="text" style="width:100%">
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                Ciudad:
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <input id="ciudad" class="form" type="text" style="width:100%">
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                Estado / Provincia / Departamento:
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <input id="estado" class="form" type="text" style="width:100%">
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                Teléfono:
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <input id="telefono" class="form" type="text" style="width:100%">
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                Correo electrónico:
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <input id="correo_ed" class="form" type="email" style="width:100%">
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                Código Postal:
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <input id="cp" class="form" type="text" style="width:100%">
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                Apartado Postal:
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <input id="ap" class="form" type="text" style="width:100%">
            </div>
        </div>
        
        <div class="row"><br></div>
        
        <div class="row">
            <div class="col-md-3">
                <label for="tipo_arbitraje">Tipo de arbitraje:</label>
            </div>
            <div class="col-md-9">
                <input type="radio" id="a_d_c" name="tipo_arbitraje" value="1">
                Arbitraje doble ciego (Double blind peer review)
            </div>
            <div class="col-md-9 col-md-offset-3">
                <input type="radio" id="a_c" name="tipo_arbitraje" value="2">
                Arbitraje ciego (Blind peer review)
            </div>
            <div class="col-md-9 col-md-offset-3">
                <input type="radio" id="r_a" name="tipo_arbitraje" value="3">
                Revista arbitrada (Peer review)
            </div>
            <div class="col-md-9 col-md-offset-3">
                <input type="radio" id="a_a" name="tipo_arbitraje" value="4">
                Arbitraje abierto (Open peer review)
            </div>
            <div class="col-md-9 col-md-offset-3">
                <input type="radio" id="r_c" name="tipo_arbitraje" value="5">
                Revisión del Comité Editorial (Editorial review)
            </div>
        </div>
        
        <div class="row"><br></div>
        
        <div class="row">
            <div class="col-md-3">
                <label for="licencia">Licencia de la revista:</label>
            </div>
            <div class="col-md-9">
                <input type="radio" id="by" name="licencia" value="1">
                CC BY
            </div>
            <div class="col-md-9 col-md-offset-3">
                <input type="radio" id="by-nc-nd" name="licencia" value="2">
                CC BY-NC-ND
            </div>
            <div class="col-md-9 col-md-offset-3">
                <input type="radio" id="by-nc" name="licencia" value="3">
                CC BY-NC
            </div>
            <div class="col-md-9 col-md-offset-3">
                <input type="radio" id="by-nc-sa" name="licencia" value="4">
                CC BY-NC-SA
            </div>
            <div class="col-md-9 col-md-offset-3">
                <input type="radio" id="by-sa" name="licencia" value="5">
                CC BY-SA
            </div>
            <div class="col-md-9 col-md-offset-3">
                <input type="radio" id="own" name="licencia" value="6">
                Publisher's own license
            </div>
            <div class="col-md-9 col-md-offset-3">
                <input type="radio" id="by-nd" name="licencia" value="7">
                CC BY-ND
            </div>
            <div class="col-md-9 col-md-offset-3">
                <input type="radio" id="public" name="licencia" value="8">
                public domain
            </div>
        </div>
        
        <div class="row"><br></div>
        
        <div class="row">
            <div class="col-md-12">
                <label>Política de archivo en Repositorios de acceso abierto, según <a target="_blank" href="http://www.sherpa.ac.uk/romeo/search.php?la=en&fIDnum=|&version=&mode=advanced">Sherpa-Romeo</a> y <a target="_blank" href="http://diadorim.ibict.br/">Diadorim</a>:</label>
                <br>Para más información consulta la página 21 del documento: <a target="_blank" href="https://www.scielo.org.mx/avaliacao/Guia-CriteriosEvaluacion-ScieloMX.pdf">Criterios de SciELO-México para la admisión y permanencia de revistas</a>
            </div>
            <div class="col-md-9 col-md-offset-3">
                <input type="radio" id="green" name="acceso" value="1">
                Versión publicada (Published)&nbsp;&nbsp;<span style="font-size: 12px" class="fa fa-info-circle" title="Autoriza que los autores depositen en un repositorio la versión final publicada por la revista"></span>
            </div>
            <div class="col-md-9 col-md-offset-3">
                <input type="radio" id="blue" name="acceso" value="2">
                Versión aceptada (Accepted)&nbsp;&nbsp;<span style="font-size: 12px" class="fa fa-info-circle" title="Autoriza que los autores depositen en un repositorio la versión dictaminada del artículo (esto es aprobado por el dictamen de la revista)"></span>
            </div>
            <div class="col-md-9 col-md-offset-3">
                <input type="radio" id="yellow" name="acceso" value="3">
                Versión presentada (Submited)&nbsp;&nbsp;<span style="font-size: 12px" class="fa fa-info-circle" title="Autoriza que los autores depositen en un repositorio preprint la versión aún no dictaminada por la revista"></span>
            </div>
            <div class="col-md-9 col-md-offset-3">
                <input type="radio" id="white" name="acceso" value="4">
                No permite el depósito en ningún caso&nbsp;&nbsp;<span style="font-size: 12px" class="fa fa-info-circle" title="No permite el depósito en ningún caso"></span>
            </div>
        </div>
        
        <div class="row"><br></div>
        
        <div class="row">
            <div class="col-md-12">
                <label>Índices, catálogos y sistemas de información en los que está registrada la revista:</label>
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                Liga Latindex versión impresa
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <input id="latindex_impresa" class="form" type="text" style="width:100%" pattern="https?://.*" title="Formato: http://example.com">
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                Liga Latindex versión electrónica
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <input id="latindex_e" class="form" type="text" style="width:100%" pattern="https?://.*" title="Formato: http://example.com">
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                Liga DOAJ
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <input id="doaj" class="form" type="text" style="width:100%" pattern="https?://.*" title="Formato: http://example.com">
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                Liga SciELO
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <input id="scielo" class="form" type="text" style="width:100%"  pattern="https?://.*" title="Formato: http://example.com">
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                Liga RedALyC
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <input id="redalyc" class="form" type="text" style="width:100%"  pattern="https?://.*" title="Formato: http://example.com">
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                Liga Dialnet
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <input id="dialnet" class="form" type="text" style="width:100%"  pattern="https?://.*" title="Formato: http://example.com">
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                Liga REDIB
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <input id="redib" class="form" type="text" style="width:100%"  pattern="https?://.*" title="Formato: http://example.com">
            </div>
        </div>
        <div id="otro_sistema">
            <div class="row">
                <div class="col-md-9 col-md-offset-3">
                    Liga o nombre de otro sistema de informacion
                </div>
            </div>
            <div class="row">
                <div class="col-md-9 col-md-offset-3">
                    <input id="otro_sistema_1" class="form" type="text" style="width:100%">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <span id="add_otro_sistema" style="cursor:pointer;font-size:15px"><i class="fa fa-plus-square" aria-hidden="true"></i>&nbsp;Agregar otra liga o nombre</span>
            </div>
        </div>
        
        <div class="row"><br></div>
        
        <div class="row">
            <div class="col-md-12">
                <label>Miembros del Comité Científico:</label>
            </div>
        </div>
        <div id="otro_miembro">
            <div class="row">
                <div class="col-md-9 col-md-offset-3">
                    Nombre y apellidos
                </div>
            </div>
            <div class="row">
                <div class="col-md-9 col-md-offset-3">
                    <input id="otro_miembro_nombre_1" class="form" type="text" style="width:100%">
                </div>
            </div>
            <div class="row">
                <div class="col-md-9 col-md-offset-3">
                    Institución
                </div>
            </div>
            <div class="row">
                <div class="col-md-9 col-md-offset-3">
                    <input id="otro_miembro_institucion_1" class="form" type="text" style="width:100%">
                </div>
            </div>
            <div class="row">
                <div class="col-md-9 col-md-offset-3">
                    País de la institución
                </div>
            </div>
            <div class="row">
                <div class="col-md-9 col-md-offset-3">
                    <input id="otro_miembro_institucion_pais_1" class="form" type="text" style="width:100%">
                </div>
            </div>
            <div class="row">
                <div class="col-md-9 col-md-offset-3">
                    ORCID
                </div>
            </div>
            <div class="row">
                <div class="col-md-9 col-md-offset-3">
                    <input id="otro_miembro_orcid_1" class="form" type="text" style="width:100%">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 col-md-offset-3">
                <span id="add_otro_miembro" style="cursor:pointer;font-size:15px"><i class="fa fa-plus-square" aria-hidden="true"></i>&nbsp;Agregar otro miembro del comité</span>
            </div>
        </div>
        
        
        <div class="row"><br></div>
        <div class="row">
        <div class="col-md-12">
            <input id="autorizo" class="form" type="checkbox">&nbsp;
            <b>AUTORIZO</b> que los archivos PDF de mi revista sean alojados en la colección Hemeroteca Virtual Latinoamericana (HEVILA).
        </div>
        </div>
        <div class="row"><br></div>
        <div id="div_btn_postular">
        <center>
            <button type="submit" class="btn btn-warning" id="btn_postular">Postular revista</button>
        </center>
        </div>
        </form>
        <div class="row"><br><br><br></div>
        </div>
        <br>
        <div id="div_enviar" hidden="">
            <div class="row">
            <div class="col-md-12">
            Su revista aún no cuenta con los puntos suficientes para postularla, pero usted puede obtener un resumen de su preevaluación hasta el momento e intentarlo nuevamente en alguna otra ocasión.
            </div>
            </div>
            <div class="row"><br></div>
            <form id="form_enviar">
            <div class="row">
                <div class="col-md-3">
                    <label for="correo2">Correo electrónico:</label>
                </div>
                <div class="col-md-3">
                    <input id="correo2" class="form" type="email" style="width:100%" required="required">
                </div>
            </div>
            <div class="row"><br></div>
            <center>
                <button type="submit" class="btn btn-warning" id="btn_enviar" >Enviar avance</button>
            </center>
            </form>
            <div class="row"><br><br><br></div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="col-md-12" id="resultado"></div>
    </div>
</div>