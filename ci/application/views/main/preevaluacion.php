<div class="row" id="row_comenzar">
    <div class="col-md-12">
    ¡Postule su revista ahora!<br>
    Le presentaremos 44 criterios que tomamos en consideración, 33 son obligatorios.<br>
    Navegue a través de ellos con ayuda de la barra de números que se encontrará en la parte inferior, para cada criterio cumplido haga clic en el botón "Cumplo este criterio", de lo contrario, déjelo en blanco. Podrá bservar su progreso en la gráfica del lado derecho.<br>
    Si reúne los criterios obligatorios, podrá decidir postular su revista y enviarnos la información que le solicitaremos, de no cumplir con dichos criterios, le proporcionaremos un resumen de su preevaluación, cuando esté seguro de cumplir con los criterios faltantes podrá realizarla nuevamente.
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
        <div class="row">
        <div class="col-md-3">
            <label for="nombre">Nombre completo del editor:</label>
        </div>
        <div class="col-md-3">
            <input id="nombre" type="text" style="width:100%">
        </div>
        <div class="col-md-3">
            <label for="correo">Correo electrónico:</label>
        </div>
        <div class="col-md-3">
            <input id="correo" type="text" style="width:100%">
        </div>
        </div>
        <div class="row"><br></div>
        <div class="row">
        <div class="col-md-3">
            <label for="nombre_revista">Título de la revista:</label>
        </div>
        <div class="col-md-9">
            <input id="nombre_revista" type="text" style="width:100%">
        </div>
        </div>
        <div class="row"><br></div>
        <div class="row">
        <div class="col-md-3">
            <label for="issn">ISSN:</label>
        </div>
        <div class="col-md-3">
            <input id="issn" type="text" style="width:100%">
        </div>
        <div class="col-md-3">
            <label for="pais">País de edición:</label>
        </div>
        <div class="col-md-3">
            <input id="pais" type="text" style="width:100%">
        </div>
        </div>
        <div class="row"><br></div>
        <div class="row">
        <div class="col-md-3">
            <label for="organizacion">Organización que edita:</label>
        </div>
        <div class="col-md-9">
            <input id="organizacion" type="text" style="width:100%">
        </div>
        </div>
        <div class="row"><br></div>
        <div class="row">
        <div class="col-md-3">
            <label for="periodicidad">Periodicidad:</label>
        </div>
        <div class="col-md-3">
            <input id="periodicidad" type="text" style="width:100%">
        </div>
        <div class="col-md-3">
            <label for="ciudad">Ciudad:</label>
        </div>
        <div class="col-md-3">
            <input id="ciudad" type="text" style="width:100%">
        </div>
        </div>
        <div class="row"><br></div>
        <div class="row">
        <div class="col-md-12">
            <input id="autorizo" type="checkbox">&nbsp;
            <b>AUTORIZO</b> que los archivos PDF de mi revista sean alojados en la colección Hemeroteca Virtual Latinoamericana (HEVILA).
        </div>
        </div>
        <div class="row"><br></div>
        <div id="div_btn_postular">
        <center>
            <button type="button" class="btn btn-warning" id="btn_postular">Postular revista</button>
        </center>
        </div>
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
            <div class="row">
                <div class="col-md-3">
                    <label for="correo2">Correo electrónico:</label>
                </div>
                <div class="col-md-3">
                    <input id="correo2" type="text" style="width:100%">
                </div>
            </div>
            <div class="row"><br></div>
            <center>
                <button type="button" class="btn btn-warning" id="btn_enviar">Enviar avance</button>
            </center>
            <div class="row"><br><br><br></div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="col-md-12" id="resultado"></div>
    </div>
</div>