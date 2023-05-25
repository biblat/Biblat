<style>
.center {
  display: flex;
  align-items: center;
  --background-color: white;
  justify-content: center;
}
</style>

<div class="row">
    <div class="col-xs-12">
        <p id="txtNucleo">
        </p>
    </div>
</div>

<div class="row"><br><br></div>

<div class="row">
    <div class="col-xs-12">
        <p id="txtTabla">
        </p>
    </div>
    <div class="col-xs-12">
        <br><br>
        <div class="col-xs-12" id="div-filtro" style="display: none">
            <div class="btn-group" role="group">
                <!-- Split button -->
                <div class="btn-group">
                  <button type="button" class="btn btn-warning" id='btn-filtro' style="width:100px">Filtrar por :</button>
                  <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="caret"></span>
                    <span class="sr-only">Toggle Dropdown</span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="li-filtro" id="base">Base</a></li>
                    <li><a class="li-filtro" id="coleccion">Colección</a></li>
                    <li><a class="li-filtro" id="disciplina">Disciplina</a></li>
                    <li><a class="li-filtro" id="pais">País</a></li>
                  </ul>
                </div>
            </div>

            <div class="btn-group" role="group">
                <!-- Split button -->
                <div class="btn-group">
                  <button type="button" class="btn" id='btn-filtro2'>Seleccione</button>
                  <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="caret"></span>
                    <span class="sr-only">Toggle Dropdown</span>
                  </button>
                  <ul class="dropdown-menu" id='ul-filtro'>
                  </ul>
                </div>
            </div>
            <br><br>
            <button id="remove" type="button" class="btn btn-default btn-sm" style="display: none">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Quitar filtro
            </button>
        </div>
    </div>
    <div class="col-xs-12">
        <div id="div_tabla" style="display:block">
        </div>
    </div>
</div>

<div class="row"><br><br></div>

<div class="row">
    <div class="col-xs-12">
        <p id="txtProcedencia">
        </p>
    </div>
    <div class="col-xs-12">
        <div id="container" class="center">
        </div>
    </div>
</div>

<div class="row"><br><br></div>

<div class="row">
    <div class="col-xs-6">
        <p id="txtScielo">
        </p>
        <div id="graficaPie1" class="center">
        </div>
    </div>
    <div class="col-xs-6">
        <p id="txtClaper">
        </p>
        <div id="graficaPie2" class="center">
        </div>
    </div>
</div>

<div class="row"><br><br></div>

<div class="row">
    <div class="col-xs-12">
        <p id="txtDisc">
        </p>
        <div id="container2" class="center">
        </div>
    </div>
</div>

<div class="row" id="clic"><br><br></div>

<div class="row" id="clics" style="display:none">
    <div class="col-xs-12">
        <p id="txtRed">
        </p>
    </div>
    <div class="col-xs-12" id="graficaRed">
        
    </div>
</div>

