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


<div class="row">
    <div class="col-xs-6" id="div-filtro" style="">
        <div class="btn-group" role="group">
        <!-- Split button -->
        <div class="btn-group">
            <button type="button" class="btn btn-warning" id="btn-filtro" style="width:160px;border-radius:5px">Filtrar por :</button>
            <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="border-radius:5px">
            <span class="caret"></span>
            <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" style="border-radius:5px">
                <li><a class="li-filtro" id="mes">Mes</a></li>
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
            <br><br>
    </div>
    <div class="col-xs-6" id="div-anio" style="">
        <div class="btn-group" role="group">
        <!-- Split button -->
        <div class="btn-group">
            <button type="button" class="btn btn-warning" id="btn-filtro-anio" style="width:160px;border-radius:5px">2025</button>
            <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="border-radius:5px">
            <span class="caret"></span>
            <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" style="border-radius:5px">
				<li><a class="li-filtro-anio" id="2026">2026</a></li>
                <li><a class="li-filtro-anio" id="2025">2025</a></li>
                <li><a class="li-filtro-anio" id="2024">2024</a></li>
                <li><a class="li-filtro-anio" id="2023">2023</a></li>
                <li><a class="li-filtro-anio" id="2022">2022</a></li>
                <li><a class="li-filtro-anio" id="2021">2021</a></li>
                <li><a class="li-filtro-anio" id="2020">2020</a></li>
                <li><a class="li-filtro-anio" id="2019">2019</a></li>
                <li><a class="li-filtro-anio" id="2018">2018</a></li>
                <li><a class="li-filtro-anio" id="2017">2017</a></li>
                <li><a class="li-filtro-anio" id="2016">2016</a></li>
                <li><a class="li-filtro-anio" id="2015">2015</a></li>
                <li><a class="li-filtro-anio" id="2014">2014</a></li>
            </ul>
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

<div class="row"><br><br><br><br><br><br><br></div>