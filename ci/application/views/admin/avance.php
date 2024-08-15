<style>
    #avance-actual{
        transition: font-size 0.3s ease; 
    }
    .avance-mes{
        transition: font-size 0.3s ease;
    }
    #avance-actual:hover{
        font-size: 15px;
    }
    .avance-mes:hover{
        font-size: 15px;
    }
</style>

<script>
    const cons =    { 
                        rol: Object.freeze( { val: '<?php echo $rol; ?>'}),
						pal_cla: Object.freeze( { val: '<?php echo $pal_cla; ?>'})
                    };
</script>
<div class="row"><br></div>
<center><div class="row"><b>Meta del departamento:</b> 30,000 Registros</div></center>
<div class="row"><br></div>
<div class="row"><br></div>
<div class="progress esperado">
  
</div>
<div class="row"><div class="col-sm-12"><center id="avance-actual"><b>Avance:</b> <span id='avance_total'></span> Registros</center></div></div>
<div class="progress" style='height: 40px'>
  
</div>
<div class="row">
    <div class="col-sm-12">
        <div id="div_tabla" style="display:block">
        </div>
    </div>
</div>

<div class="row"><br><br></div>

<div class="row">
    <div class="col-sm-12">
        <div id="div_tablaPC" style="display:block">
        </div>
    </div>
</div>

<div class="row"><br><br></div>

<div class="row">
    <div class="col-sm-12">
        <div id="div_tiempos" style="display:block">
        </div>
    </div>
</div>

<div class="row"><br></div>