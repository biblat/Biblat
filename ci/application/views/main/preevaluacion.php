<div class="row" id="row_comenzar">
    <div class="col-md-12">
    ¡Postule su revista ahora!<br>
    La evaluación de las revistas consta de 48 criterios: 33 de los cuales son obligatorios y 15 opcionales. Para aprobar se requiere el cumplimiento de 40 criterios: los 33 obligatorios y, al menos, 7 opcionales.<span style='color:#ff8000'>{_(' Se consideran todas las revistas científicas editadas en América Latina y el Caribe.')}</span><br>
    Inicie la pre-evaluación dando clic en el botón de "Comenzar". Posteriormente, los criterios se desplegarán consecutivamente y podrá navegar a través de ellos mediante la barra de números que se encontrará en la parte inferior. Para cada criterio cumplido, haga clic en el botón "Cumplo este criterio"; de lo contrario, déjelo en blanco. Podrá observar el cumplimiento alcanzado en la gráfica del lado derecho.<br>
    Si reúne los criterios obligatorios, podrá enviar la postulación de la revista. En caso de no cumplir con dichos criterios, le proporcionaremos un resumen de la pre-evaluación, misma que será de utilidad para procurar el cumplimiento de los criterios faltantes y realizar posteriormente la postulación.<br>
    Los resultados obtenidos en esta pre-evaluación deberán ser revisados y validados por el Comité Evaluación para emitir el dictamen definitivo de aprobación.
    <div class="row"><br></div>
        <center>
            <button type="button" class="btn btn-warning" id="btn_comenzar">Comenzar</button>
        </center>
    <div class="row"><br><br><br></div>
    </div>
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
        Su revista cuenta con los puntos suficientes, si desea postularla ingrese los siguientes datos:
        </div>
        </div>
        <div class="row"><br></div>
        <form id="form_postular">
        <div class="row">
        <div class="col-md-3">
            <label for="nombre">Nombre completo del editor:</label>
        </div>
        <div class="col-md-3">
            <input id="nombre" class="form" type="text" style="width:100%;text-transform:uppercase" required="required">
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
            <label for="nombre_revista">Título de la revista:</label>
        </div>
        <div class="col-md-9">
            <input id="nombre_revista" class="form" type="text" style="width:100%;text-transform:uppercase" required="required">
        </div>
        </div>
        <div class="row"><br></div>
        <div class="row">
        <div class="col-md-3">
            <label for="issn">ISSN:</label>
        </div>
        <div class="col-md-3">
            <input id="issn" class="form" type="text" style="width:100%;text-transform:uppercase" required="required" pattern="[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9A-Za-z]$" title="Formato XXXX-XXXX">
        </div>
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
        <div class="row"><br></div>
        <div class="row">
        <div class="col-md-3">
            <label for="organizacion">Organización que edita:</label>
        </div>
        <div class="col-md-9">
            <input id="organizacion" class="form" type="text" style="width:100%;text-transform:uppercase" required="required">
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
            <label for="ciudad">Ciudad:</label>
        </div>
        <div class="col-md-3">
            <input id="ciudad" class="form" type="text" style="width:100%;text-transform:uppercase" required="required">
        </div>
        </div>
		<div class="row"><br></div>
        <div class="row">
        <div class="col-md-3">
            <label for="url_revista">URL de la revista:</label>
        </div>
        <div class="col-md-9">
            <input id="url_revista" class="form" type="text" style="width:100%">
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