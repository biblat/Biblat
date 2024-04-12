<style>
    .despacio {
      transition: all 3s;
    }
</style>

<div class="row">
    <div id="div_usuario" class="col-sm-12 form-group" >
        <label for="usuario">Usuarios</label>
        <select class="form-control" name="usuario" id="usuario_sel" style="display:none">
        </select>
    </div>
</div>

<div class="row"><br></div>

<div class="row">
    <div id="div_revista" class="col-sm-12 form-group" >
        <label for="revista">Revistas</label>
        <select class="form-control" name="revista" id="revista_sel" style="display:none;width: 100%" width="100%">
        </select>
    </div>
</div>

<div class="row"><br></div>

<div class="row">
    <div class="col-sm-12">
        <span><b>Año:</b></span><br>
        <select class="form-control" name="año" id="anio_rev" style="width:50%" width="50%">
        </select>
    </div>
    <div class="col-sm-12"><br></div>
    <div class="col-sm-12">
        <span><b>Volumen (seleccionar del listado o especificar):</b></span><br><br>
        <div style="margin-left:50px">
            <span>Listado:</span><br>
            <div id="div_sel_numero">
                <select class="form-control" name="número" id="sel_numero" style="width:50%;" width="50%">
                </select>
            </div>
            <br><br>
            <div>
                <span>Especificar:</span><br>
                <span style="width:50px;display:inline-block"><b>Vol. :</b></span><input id='txt_vol' style="width:50px;"><span>&nbsp;&nbsp;</span><input type="checkbox" id="sin_vol" value="0" class="check"><span>&nbsp;</span>Sin volumen<br><br>
                <span style="width:50px;display:inline-block"><b>Num. :</b></span><input id='txt_num' style="width:50px;"><span>&nbsp;&nbsp;</span><input type="checkbox" id="sin_num" value="0" class="check"><span>&nbsp;</span>Sin número<br><br>
                <span style="width:50px;display:inline-block"><b>Parte :</b></span> 
                <input type="checkbox" id="p_esp" class="check"><span>&nbsp;</span>Especial <span>&nbsp;&nbsp;</span> 
                <input type="checkbox" id="p_sup" class="check"><span>&nbsp;</span>Suplemento <span>&nbsp;&nbsp;</span> 
                <input type="checkbox" id="p_est" class="check"><span>&nbsp;</span>Estación del año <span>&nbsp;&nbsp;</span> 
                <input type="checkbox" id="p_mes" class="check"><span>&nbsp;</span>Mes(es) <span>&nbsp;&nbsp;</span>
                <input type="checkbox" id="p_no" class="check"><span>&nbsp;</span>No aplica<br><br>
                <div id="div_suplemento" style="display:none"><span style="display:inline-block"><b>Número de suplemento :&nbsp;</b></span><input id='txt_num_sup' style="width:50px;"><span>&nbsp;&nbsp;</span><input type="checkbox" id="sin_num_sup" value="0" class="check"><span>&nbsp;</span>Sin número<br><br></div>
                <div id="div_especial" style="display:none"><span style="display:inline-block"><b>Número de especial :&nbsp;</b></span><input id='txt_num_esp' style="width:50px;"><span>&nbsp;&nbsp;</span><input type="checkbox" id="sin_num_esp" value="0" class="check"><span>&nbsp;</span>Sin número<br><br></div>
                <div id="div_estacion" style="display:none">
                <span style="display:inline-block"><b>Estación :&nbsp;</b></span>
                <select class="form-control" name="estacion" id="sel_estacion" style="width:150px;display:inline-block">
                    <option value="primavera" selected>Primavera</option>
                    <option value="verano">Verano</option>
                    <option value="otoño">Otoño</option>
                    <option value="invierno">Invierno</option>
                </select><br><br>
                </div>
                <div id="div_mes" style="display:none">
                <span style="display:inline-block"><b>Mes (Desde):&nbsp;</b></span>
                <select class="form-control" name="mes_d" id="sel_mes1" style="width:150px;display:inline-block">
                    <option value="ene" selected>Enero</option>
                    <option value="feb">Febrero</option>
                    <option value="mar">Marzo</option>
                    <option value="abr">Abril</option>
                    <option value="may">Mayo</option>
                    <option value="jun">Junio</option>
                    <option value="jul">Julio</option>
                    <option value="ago">Agosto</option>
                    <option value="sept">Septiembre</option>
                    <option value="oct">Octubre</option>
                    <option value="nov">Noviembre</option>
                    <option value="dic">Diciembre</option>
                </select>
                <span id="span_mes2" style="display:inline-block"><b> - Mes (Hasta):&nbsp;</b></span>
                <select class="form-control" name="mes_h" id="sel_mes2" style="width:150px;display:inline-block">
                    <option value="ene" selected>Enero</option>
                    <option value="feb">Febrero</option>
                    <option value="mar">Marzo</option>
                    <option value="abr">Abril</option>
                    <option value="may">Mayo</option>
                    <option value="jun">Junio</option>
                    <option value="jul">Julio</option>
                    <option value="ago">Agosto</option>
                    <option value="sept">Septiembre</option>
                    <option value="oct">Octubre</option>
                    <option value="nov">Noviembre</option>
                    <option value="dic">Diciembre</option>
                </select>
                <input type="checkbox" id="un_mes" value="0" class="check"><span>&nbsp;</span>Sólo un mes
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row"><br></div>

<div class="row">
    <div class="col-sm-12">
        <center>
            <button type="button" class="btn btn-warning" id="btn_asignar" style="display:none">Asignar revista</button>
            <button type="button" class="btn btn-warning" id="btn_guardar" style="display:none">Guardar cambios</button>
        </center>
    </div>
    <br><br>
    <div class="col-sm-12">
        <center><div id="mensajeFin"></div></center>
    </div>
</div>

<div class="row"><br></div>

<div class="row">
    <div id="div_otras_revistas" class="col-sm-12" style="display:none">
    </div>
</div>

<div class="row"><br></div>

<div class="row">
    <div id="div_revistas_documentos" class="col-sm-12" style="display:none">
    </div>
</div>

<div class="row"><br></div>

