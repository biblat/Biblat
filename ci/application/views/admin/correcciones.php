<style>
.corr-card{
    border:1px solid #e3e3e3;
    border-left:4px solid #ff8000;
    border-radius:7px;
    background:#fff;
    margin-bottom:15px;
    padding:14px 16px;
}
.corr-title{
    font-size:15px;
    font-weight:700;
    margin-bottom:14px;
}
.corr-subtitle{
    font-size:12px;
    font-weight:700;
    color:#666;
    margin:12px 0 8px;
}
.corr-readonly{
    background:#f6f6f6!important;
    color:#666!important;
}
.corr-item{
    border-top:1px solid #eee;
    padding:12px 0;
}
.corr-item:first-child{
    border-top:0;
}
.corr-item-actions{
    text-align:right;
    margin-bottom:7px;
}
.corr-actions{
    display:flex;
    justify-content:flex-end;
    gap:8px;
    flex-wrap:wrap;
    margin:20px 0 40px;
}
.corr-list-add{
    float:right;
}
.corr-help{
    font-size:11px;
    color:#777;
    font-weight:normal;
}
/* ==========================================================
 * Tabla de resultados de Correcciones
 * No usamos Responsive de DataTables porque convertía cada fila
 * en una ficha vertical. La tabla conserva sus columnas y, sólo
 * si el viewport es muy angosto, usa desplazamiento horizontal.
 * ========================================================== */
#corr_resultados{
    margin-top:12px;
    padding:0;
    background:#ffffff;
}

#tbl_correcciones{
    width:100% !important;
    font-size:12px;
    border-collapse:separate !important;
    border-spacing:0;
    table-layout:fixed;
}

#tbl_correcciones thead th{
    background:#fafafa;
    color:#444444;
    font-size:11px;
    font-weight:700;
    border-top:1px solid #dddddd !important;
    border-bottom:2px solid #ff8000 !important;
    padding:9px 8px !important;
    vertical-align:middle;
    white-space:nowrap;
}

#tbl_correcciones tbody td{
    padding:9px 8px !important;
    vertical-align:top;
    border-bottom:1px solid #eeeeee;
    background:#ffffff;
}

#tbl_correcciones tbody tr:hover td{
    background:#fffaf4;
}

#tbl_correcciones .corr-col-sistema{
    width:120px;
    white-space:nowrap;
    font-weight:600;
}

#tbl_correcciones .corr-col-articulo{
    width:42%;
    white-space:normal !important;
    line-height:1.35;
    overflow-wrap:anywhere;
}

#tbl_correcciones .corr-col-revista{
    width:18%;
    white-space:normal !important;
    line-height:1.35;
}

#tbl_correcciones .corr-col-anio,
#tbl_correcciones .corr-col-vol,
#tbl_correcciones .corr-col-num{
    width:65px;
    text-align:center;
    white-space:nowrap;
}

#tbl_correcciones .corr-col-doi{
    width:15%;
    white-space:normal !important;
    overflow-wrap:anywhere;
}

#tbl_correcciones .corr-col-accion{
    width:85px;
    text-align:center;
    white-space:nowrap;
}

#tbl_correcciones .corr-editar{
    background:#ffffff;
    border:1px solid #ff8000;
    color:#555555;
    border-radius:4px;
}

#tbl_correcciones .corr-editar:hover,
#tbl_correcciones .corr-editar:focus{
    background:#fff4e8;
    border-color:#e67300;
    color:#333333;
}

/* Barra superior e inferior de DataTables */
#tbl_correcciones_wrapper .corr-dt-toolbar{
    margin:0 0 10px 0;
    padding:8px 10px;
    border:1px solid #eeeeee;
    border-radius:6px;
    background:#fafafa;
}

#tbl_correcciones_wrapper .dataTables_filter{
    text-align:left;
}

#tbl_correcciones_wrapper .dataTables_filter label{
    margin:0;
    font-size:12px;
    font-weight:600;
    color:#555555;
}

#tbl_correcciones_wrapper .dataTables_filter input{
    height:30px;
    margin-left:7px;
    padding:4px 8px;
    border:1px solid #cccccc;
    border-radius:4px;
    background:#ffffff;
}

#tbl_correcciones_wrapper .dataTables_info{
    padding-top:7px;
    color:#777777;
    font-size:11px;
    text-align:right;
}

#tbl_correcciones_wrapper .corr-dt-footer{
    margin-top:10px;
}

#tbl_correcciones_wrapper .dataTables_paginate{
    text-align:right;
}

#tbl_correcciones_wrapper .dataTables_paginate .paginate_button{
    border-radius:4px !important;
}

#tbl_correcciones_wrapper .dataTables_paginate .paginate_button.current,
#tbl_correcciones_wrapper .dataTables_paginate .paginate_button.current:hover{
    border:1px solid #ff8000 !important;
    background:#fff4e8 !important;
    color:#333333 !important;
}

/* DataTables puede envolver la tabla para scroll horizontal. */
#tbl_correcciones_wrapper .dataTables_scrollBody{
    border-bottom:0 !important;
}
</style>

<div class="row"><br></div>

<div class="row">
<div class="col-sm-12">

    <div class="corr-card">
        <div class="corr-title">Corrección de registros</div>

        <div class="row">
            <div class="col-sm-3">
                <label>Buscar por</label>
                <select id="corr_tipo_busqueda" class="form-control">
                    <option value="sistema">Número de sistema</option>
                    <option value="titulo">Título</option>
                </select>
            </div>

            <div class="col-sm-7">
                <label>Valor</label>
                <input id="corr_busqueda"
                       type="text"
                       class="form-control"
                       placeholder="Número de sistema o título">
            </div>

            <div class="col-sm-2">
                <label>&nbsp;</label><br>
                <button id="corr_btn_buscar"
                        type="button"
                        class="btn btn-warning"
                        style="width:100%">
                    <i class="fa fa-search"></i> Buscar
                </button>
            </div>
        </div>
    </div>

    <div id="corr_resultados" style="display:none">
        <table id="tbl_correcciones"
               class="table table-hover"
               style="width:100%">
            <thead>
                <tr>
                    <th>Sistema</th>
                    <th>Artículo</th>
                    <th>Revista</th>
                    <th>Año</th>
                    <th>Vol.</th>
                    <th>Núm.</th>
                    <th>DOI</th>
                    <th></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>

    <div id="corr_ficha" style="display:none;margin-top:20px">

        <!-- ================= CONTROL ================= -->
        <div class="corr-card">
            <div class="corr-title">
                Registro <span id="corr_sistema_titulo"></span>
                <span class="corr-help">
                    — datos de control sólo para consulta
                </span>
            </div>

            <div class="row">
                <div class="col-sm-4">
                    <label>Sistema</label>
                    <input id="corr_sistema"
                           class="form-control corr-readonly"
                           readonly>
                </div>
                <div class="col-sm-2">
                    <label>Estatus</label>
                    <input id="corr_estatus"
                           class="form-control corr-readonly"
                           readonly>
                </div>
                <div class="col-sm-3">
                    <label>Asignado</label>
                    <input id="corr_asignado"
                           class="form-control corr-readonly"
                           readonly>
                </div>
                <div class="col-sm-3">
                    <label>Fecha asignado</label>
                    <input id="corr_fechaAsignado"
                           class="form-control corr-readonly"
                           readonly>
                </div>
            </div>

            <div class="row" style="margin-top:10px">
                <div class="col-sm-2">
                    <label>Estatus PC</label>
                    <input id="corr_estatusPC"
                           class="form-control corr-readonly"
                           readonly>
                </div>
                <div class="col-sm-3">
                    <label>Asignado PC</label>
                    <input id="corr_asignadoPC"
                           class="form-control corr-readonly"
                           readonly>
                </div>
                <div class="col-sm-3">
                    <label>Fecha asignado PC</label>
                    <input id="corr_fechaAsignadoPC"
                           class="form-control corr-readonly"
                           readonly>
                </div>
                <div class="col-sm-4">
                    <label>Fecha de ingreso</label>
                    <input id="corr_fechaIngreso"
                           class="form-control corr-readonly"
                           readonly>
                </div>
            </div>
        </div>

        <!-- ================= PUBLICACION ================= -->
        <div class="corr-card">
            <div class="corr-title">Publicación</div>

            <div class="row">
                <div class="col-sm-8">
                    <label>Revista</label>
                    <input id="corr_revista" class="form-control">
                </div>
                <div class="col-sm-4">
                    <label>ISSN</label>
                    <input id="corr_issn" class="form-control">
                </div>
            </div>

            <div class="row" style="margin-top:10px">
                <div class="col-sm-8">
                    <label>DOI</label>
                    <input id="corr_doi" class="form-control">
                </div>
                <div class="col-sm-4">
                    <label>Año</label>
                    <input id="corr_anioRevista" class="form-control">
                </div>
            </div>

            <div class="row" style="margin-top:10px">
                <div class="col-sm-4">
                    <label>País de la revista</label>
                    <input id="corr_paisRevista" class="form-control">
                </div>
                <div class="col-sm-4">
                    <label>Ciudad editora</label>
                    <input id="corr_ciudadEditora" class="form-control">
                </div>
                <div class="col-sm-4">
                    <label>Institución editora</label>
                    <input id="corr_institucionEditora" class="form-control">
                </div>
            </div>
        </div>

        <!-- ================= DESCRIPCION BIBLIO ================= -->
        <div class="corr-card">
            <div class="corr-title">
                Descripción bibliográfica
                <span class="corr-help">
                    — se almacena internamente en descripcionBibliografica
                </span>
            </div>

            <div class="row">
                <div class="col-sm-2">
                    <label>Volumen</label>
                    <input id="corr_volumen"
                           class="form-control"
                           placeholder="Ej. V24">
                </div>
                <div class="col-sm-2">
                    <label>Número</label>
                    <input id="corr_numero"
                           class="form-control"
                           placeholder="Ej. N3">
                </div>
                <div class="col-sm-2">
                    <label>Mes</label>
                    <input id="corr_mes"
                           class="form-control">
                </div>
                <div class="col-sm-3">
                    <label>Parte</label>
                    <input id="corr_parte"
                           class="form-control">
                </div>
                <div class="col-sm-3">
                    <label>Páginas</label>
                    <input id="corr_paginas"
                           class="form-control"
                           placeholder="Ej. P232-234">
                </div>
            </div>
        </div>

        <!-- ================= ARTICULO ================= -->
        <div class="corr-card">
            <div class="corr-title">Artículo</div>

            <div class="row">
                <div class="col-sm-9">
                    <label>Título</label>
                    <input id="corr_articulo" class="form-control">
                </div>
                <div class="col-sm-3">
                    <label>Idioma(s) del documento</label>
                    <input id="corr_idioma"
                           class="form-control"
                           placeholder="Ej. Español, inglés">
                </div>
            </div>

            <div class="row" style="margin-top:10px">
                <div class="col-sm-6">
                    <label>Tipo de documento</label>
                    <input id="corr_tipoDocumento" class="form-control">
                </div>
                <div class="col-sm-6">
                    <label>Disciplina de la revista</label>
                    <input id="corr_disciplinaRevista" class="form-control">
                </div>
            </div>

            <div class="row" style="margin-top:10px">
                <div class="col-sm-12">
                    <label>Nota general</label>
                    <textarea id="corr_notaGeneral"
                              class="form-control"
                              rows="3"></textarea>
                </div>
            </div>
        </div>

        <!-- ================= TITULOS TRADUCIDOS ================= -->
        <div class="corr-card">
            <div class="corr-title">
                Títulos traducidos
                <button id="corr_add_titulo"
                        type="button"
                        class="btn btn-default btn-sm corr-list-add">
                    <span class="glyphicon glyphicon-plus"
                          style="color:#ff8000"></span>
                    Agregar título
                </button>
            </div>
            <div id="corr_titulos"></div>
        </div>

        <!-- ================= RESUMENES ================= -->
        <div class="corr-card">
            <div class="corr-title">Resúmenes</div>

            <label>Resumen en español</label>
            <textarea id="corr_resumenEspanol"
                      class="form-control"
                      rows="4"></textarea>

            <br>
            <label>Resumen en inglés</label>
            <textarea id="corr_resumenIngles"
                      class="form-control"
                      rows="4"></textarea>

            <br>
            <label>Resumen en portugués</label>
            <textarea id="corr_resumenPortugues"
                      class="form-control"
                      rows="4"></textarea>

            <br>
            <label>Resumen en otro idioma</label>
            <textarea id="corr_resumenOtro"
                      class="form-control"
                      rows="4"></textarea>

            <div class="row" style="margin-top:10px">
                <div class="col-sm-6">
                    <label>Idioma(s) del resumen</label>
                    <input id="corr_idiomaResumen" class="form-control">
                </div>
            </div>
        </div>

        <!-- ================= CLASIFICACION ================= -->
        <div class="corr-card">
            <div class="corr-title">Clasificación temática</div>

            <div class="row">
                <div class="col-sm-6">
                    <label>Disciplina 1</label>
                    <input id="corr_disciplina1" class="form-control">
                </div>
                <div class="col-sm-6">
                    <label>Subdisciplina 1</label>
                    <input id="corr_subdisciplina1" class="form-control">
                </div>
            </div>

            <div class="row" style="margin-top:10px">
                <div class="col-sm-6">
                    <label>Disciplina 2</label>
                    <input id="corr_disciplina2" class="form-control">
                </div>
                <div class="col-sm-6">
                    <label>Subdisciplina 2</label>
                    <input id="corr_subdisciplina2" class="form-control">
                </div>
            </div>

            <div class="row" style="margin-top:10px">
                <div class="col-sm-6">
                    <label>Disciplina 3</label>
                    <input id="corr_disciplina3" class="form-control">
                </div>
                <div class="col-sm-6">
                    <label>Subdisciplina 3</label>
                    <input id="corr_subdisciplina3" class="form-control">
                </div>
            </div>
        </div>

        <!-- ================= PC ================= -->
        <div class="corr-card">
            <div class="corr-title">
                Palabras clave
                <button id="corr_add_palabra"
                        type="button"
                        class="btn btn-default btn-sm corr-list-add">
                    <span class="glyphicon glyphicon-plus"
                          style="color:#ff8000"></span>
                    Agregar
                </button>
            </div>
            <div id="corr_palabras"></div>
        </div>

        <div class="corr-card">
            <div class="corr-title">
                Keywords
                <button id="corr_add_keyword"
                        type="button"
                        class="btn btn-default btn-sm corr-list-add">
                    <span class="glyphicon glyphicon-plus"
                          style="color:#ff8000"></span>
                    Agregar
                </button>
            </div>
            <div id="corr_keywords"></div>
        </div>

        <!-- ================= URL ================= -->
        <div class="corr-card">
            <div class="corr-title">
                Enlaces
                <button id="corr_add_url"
                        type="button"
                        class="btn btn-default btn-sm corr-list-add">
                    <span class="glyphicon glyphicon-plus"
                          style="color:#ff8000"></span>
                    Agregar URL
                </button>
            </div>

            <span class="corr-help">
                El campo Tipo/Descripción se conserva exactamente porque puede
                contener valores como Texto completo, Fe de erratas u Original.
            </span>

            <div id="corr_urls"></div>
        </div>

        <!-- ================= TECNICOS ================= -->
        <div class="corr-card">
            <div class="corr-title">Otros campos</div>

            <div class="row">
                <div class="col-sm-4">
                    <label>Sistema de errata</label>
                    <input id="corr_sistemaErrata" class="form-control">
                </div>
                <div class="col-sm-4">
                    <label>SciELO ID</label>
                    <input id="corr_scieloid" class="form-control">
                </div>
                <div class="col-sm-4">
                    <label>DSpace</label><br>
                    <label style="font-weight:normal">
                        <input id="corr_DSpace"
                               type="checkbox"
                               style="display:inline-block">
                        Sí
                    </label>
                </div>
            </div>

            <div class="row" style="margin-top:10px">
                <div class="col-sm-6">
                    <label>Última actualización</label>
                    <input id="corr_fechaActualizado"
                           class="form-control corr-readonly"
                           readonly>
                </div>
            </div>
        </div>

        <!-- ================= INSTITUCIONES ================= -->
        <div class="corr-card">
            <div class="corr-title">
                Instituciones
                <button id="corr_add_institucion"
                        type="button"
                        class="btn btn-default btn-sm corr-list-add">
                    <span class="glyphicon glyphicon-plus"
                          style="color:#ff8000"></span>
                    Agregar institución
                </button>
            </div>

            <label style="font-weight:normal;margin-bottom:12px">
                <input id="corr_corporativo"
                       type="checkbox"
                       style="display:inline-block">
                Es autor corporativo
            </label>

            <div id="corr_instituciones"></div>
        </div>

        <!-- ================= AUTORES ================= -->
        <div id="corr_panel_autores" class="corr-card">
            <div class="corr-title">
                Autores
                <button id="corr_add_autor"
                        type="button"
                        class="btn btn-default btn-sm corr-list-add">
                    <span class="glyphicon glyphicon-plus"
                          style="color:#ff8000"></span>
                    Agregar autor
                </button>
            </div>

            <div id="corr_autores"></div>
        </div>

        <div class="corr-actions">
            <button id="corr_cancelar"
                    type="button"
                    class="btn btn-default">
                Cerrar
            </button>

            <button id="corr_guardar"
                    type="button"
                    class="btn btn-warning">
                <i class="fa fa-save"></i>
                Guardar corrección
            </button>
        </div>
    </div>
</div>
</div>
