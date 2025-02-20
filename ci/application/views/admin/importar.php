<form id="formXML">
<div class="row">
    <div id="div_grafica" class="col-sm-12 form-group" >
        <label for="grafica">Seleccione la Revista</label>
        <input type="text" class="form-control" name="grafica" id="revista" style="display:none">
        <select class="form-control" name="revista" id="revista_sel" style="display:none">
        </select>
        <br><br>
        <input type="file" name="archivo" id="archivo" accept=".zip" required>    
    </div>
</div>
<div class="row"><br></div>
<div class="row">
    <div class="col-sm-12">
        <center>
            <button type="submit" class="btn btn-warning">Importar archivo</button>
        </center>
    </div>
</div>
<div class="row"><br></div>
<div class="row">
    <div class="col-sm-12">
        <div id="respBiblat"></div>
        <br><br>
        <div id="respOJS"></div>
        <br><br>
        <center><div id="mensajeFin"></div></center>
    </div>
</div>
</form>
<div class="row"><br></div>

