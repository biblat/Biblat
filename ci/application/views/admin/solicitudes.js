class_av = {
    cons: {
        DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
        option: '<option value="<valor>"><opcion></option>',
        option_badge: '<option value="<valor>"><opcion> i-badge<num>f-badge</option>',
        //caracteres: /!|#|\$|%|&|\(|\/|\\|\)|=|\?|¿|¡|,|;|:|_|\[|{|}|]|\+|\*|\~|<|>|\'|\"|’/g
        caracteres: /[^a-zA-Z0-9 ]/g,
        //char_i: /\(|\)|,|`|;|:|=|#|\/|\.|@|\[|\]|\|«|»|\*|'/g,
        char_i : /[()`,;:=#\/.@[\]|«»*']/g,
        cargando: '<i id="check-titulo-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>',
        estatus:{
            A: 'Sin movimiento',
            R: 'En revisión',
            C: 'Completado',
            B: 'No indizable',
            APC: 'Sin movimiento PC',
            RPC: 'En revisión PC',
            CPC: 'Completado PC',
        },
        estatusPC:{
            A: 'Sin movimiento PC',
            R: 'En revisión PC',
            C: 'Completado PC',
        },
        color_estatus:{
            R: 'goldenrod',
            C: 'darkgreen',
            B: 'darkred'
        },
    },   
    var: {
        app: '',
        servidor: 'https://biblat.unam.mx',
        usuariosJSON: [],
        analistasJSON: [],
        documentoJSON: '',
        autoresJSON: '',
        institucionesJSON: '',
        revistasJSON: [],
        init: true,
        url_oai: '',
        data: '',
        revistas: '',
        revistasAsignadas: [],
        palabras_clave: [],
        palabras_clave0: null,
        palabras_clave_n: [],
        palabras_sustituye: [],
        keywords: [],
        keywords0: null,
        keywords_n: [],
        count_palabras_clave: 0,
        count_keywords: 0,
        revista: {},
        registros:{},
        count_titulos: 0,
        numeros:'',
        corporativo: 0,
        url_ia:'',
        arr_busca_pdf: [],
        tiempo_analisis: 0,
        tiempo_inactividad: 0,
        recargando: false,
        fechaActual: (new Date()).getFullYear() + '-' + ('0' + ((new Date()).getMonth() + 1)).slice(-2) + '-' + ('0' + (new Date()).getDate()).slice(-2),
        institucion_anterior: '',
        institucion_cambio: '',
        institucion_diccionario: {},
        selectedData: '',
        tabla: '<table id="tbl_articulos" class="display responsive nowrap" style="width:100%;font-size:11px">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th>Base</th>' +
                                    '<th>No. Sistema</th>' +
                                    '<th>Datos de usuario</th>' +
                                    
                                    '<th>Nombre</th>' +
                                    '<th>Correo</th>' +
                                    '<th>Institución</th>' +
                                    '<th>Teléfono</th>' +
                                    
                                    '<th>Revista</th>' +
                                    
                                    '<th>Revista</th>' +
                                    '<th>Año</th>' +
                                    '<th>Volúmen</th>' +
                                    '<th>Número</th>' +
                                    '<th>Páginas</th>' +
                                    
                                    '<th>Artículo</th>' +
                                    
                                    '<th>Artículo</th>' +
                                    
                                    '<th>Autores</th>' +
                                    '<th>Fecha</th>' +
                                '</tr>'+
                            '</thead>' +
                            '<tbody id="body_revistas"><body></tbody></table>',
        tr: '<tr><td style="min-width: 50px; max-width: 50px"><base></td>\n\
            <td style="min-width: 50px; max-width: 50px"><sistema></td>\n\
\n\
            <td style="min-width: 50px; max-width: 100px; word-break: break-word; overflow-wrap: anywhere;"><b>Nombre:&nbsp;</b><nombre><br><br><b>Correo:&nbsp;</b><correo><br><br><b>Institución:&nbsp;</b><institucion><br><br><b>Teléfono:&nbsp;</b><telefono></td>\n\
\n\
            <td style="min-width: 50px; max-width: 50px"><nombre2></td>\n\
            <td style="min-width: 50px; max-width: 50px"><correo2></td>\n\
            <td style="min-width: 50px; max-width: 50px"><institucion2></td>\n\
            <td style="min-width: 50px; max-width: 50px"><telefono2></td>\n\
\n\
            <td style="min-width: 50px; max-width: 100px; word-break: break-word; overflow-wrap: anywhere;"><b>Revista:</b>&nbsp;<revista><anio><vol><num></td>\n\
\n\
            <td style="min-width: 50px; max-width: 50px"><revista2></td>\n\
            <td style="min-width: 50px; max-width: 50px"><anio2></td>\n\
            <td style="min-width: 50px; max-width: 50px"><vol2></td>\n\
            <td style="min-width: 50px; max-width: 50px"><num2></td>\n\
            <td style="min-width: 50px; max-width: 50px"><pags2></td>\n\
\n\
            <td style="min-width: 50px; max-width: 100px; word-break: break-word; overflow-wrap: anywhere;"><b>Artículo:</b>&nbsp;<articulo><pags></td>\n\
\n\
            <td style="min-width: 50px; max-width: 50px"><articulo2></td>\n\
\n\
            <td style="min-width: 50px; max-width: 100px"><autores></td>\n\
            <td style="min-width: 50px; max-width: 50px"><fecha></td></tr>',
        li: '<li><a class="li-filtro2" id="<id>"><val></a></li>',
        opciones_paises: '',
        a_opciones_instituciones: '',
        texto_pdf: '',
        catalogos: { 
                        tipo_documento: [],
                        disciplina: [],
                        disciplina_eng: [],
                        pais: [],
                        pais_slug: [],
                    },
        max_largo_pais: 0,
        sistema: '',
        cambios_de_inicio: true,
        cambios_documento: false,
        cambios_autor: false,
        cambios_institucion: false,
        nombresMes: [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
          ]
    },
    initClient: function(anio='2026') {
        $.when(class_utils.getResource('/datos/solicitudes/'+anio),
        ) 
        .then(function(resp_articulos){
            
            class_av.var.articulosJSON = resp_articulos;

          (class_av.var.articulosJSON).forEach(item => {
            const mesNumero = parseInt(item.fecha.substring(5, 7), 10);
            item.mes = class_av.var.nombresMes[mesNumero - 1];
          });


            class_av.setTabla(class_av.var.articulosJSON);
            class_av.control();
            loading.end();
        });
    },
    ready: function(){
        loading.start();
        class_av.initClient();
    },
    control: function(){
        class_av.filtro();
    },
    setTabla: function(data){
        tbody = '';
        var total_meta = 0;
        
        $.each(data, function(i, val){

            var tr = class_av.var.tr.replace('<base>', val['base'])
                            .replace('<sistema>', val['sistema'])
                            .replace('<nombre>', val['nombre'])
                            .replace('<nombre2>', val['nombre'])
                            .replace('<correo>', val['correo'])
                            .replace('<correo2>', val['correo'])
                            .replace('<institucion>', val['institucion'])
                            .replace('<institucion2>', val['institucion'])
                            .replace('<telefono>', val['telefono'])
                            .replace('<telefono2>', val['telefono'])
                            .replace('<fecha>', val['fecha'])
                            .replace('<articulo>', val['articulo'])
                            .replace('<articulo2>', val['articulo'])
                            .replace('<revista>', val['revista'])
                            .replace('<revista2>', val['revista'])
                            .replace('<anio>', val['anio'] !== null ? `;&nbsp;&nbsp;<b>Año:</b>&nbsp;${val['anio']}`: '')
                            .replace('<anio2>', val['anio'])
                            .replace('<vol>', val['vol'] !== null ? `;&nbsp;&nbsp;<b>Vol:&nbsp;</b>${val['vol']}`: '')
                            .replace('<vol2>', val['vol'])
                            .replace('<num>', val['num'] !== null ? `;&nbsp;&nbsp;<b>Num:&nbsp;</b>${val['num']}`: '')
                            .replace('<num2>', val['num'])
                            .replace('<pags>', val['pags'] !== null ? `;&nbsp;&nbsp;<b>Pags:&nbsp;</b>${val['pags']}`: '')
                            .replace('<pags2>', val['pags'])
                            .replace('<autores>', val['autores'] !== null ? val['autores']: 'Sin información');
            tbody += tr;
        });
       
        //$('.progress').html(class_av.var.barra_avance.replaceAll('<avance>', ( total_meta/1000*100 ).toFixed(2)));
        
        var tabla = class_av.var.tabla
                .replace('<body>', tbody);
        
        var oculta = {};
        var targets =[0,1,2,7,13,15,16];
        //var targets =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
        /*if(cons.rol.val == 'Editor'){
            oculta = 
                {
                    targets: 6,
                    visible: false,
                    searchable: false
                };
        }*/
        oculta = 
                {
                    targets: [3,4,5,6,8,9,10,11,12,14],
                    visible: false,
                    searchable: false
                };
        
        $('#div_tabla').html(tabla);
        var op = {
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                extend: 'excelHtml5',
                                text: 'Exportar a Excel',
                                exportOptions: {
                                    columns: [0,1,3,4,5,6,8,9,10,11,12,14,15,16]
                                }
                            }
                        ],
                        order: [[ 16, 'desc' ]],
                        bLengthChange: false,
                        pageLength: 10,
                        pagingType: 'input',
                        autoWidth: true,
                        columnDefs: [
                            oculta,
                            {
                                render: function (data, type, full, meta) {
                                    //Sustituye el valor de la celda por esto agregando un div para que se mantenga dentro del tamaño definido
                                    return '<div style="width: 100%; text-align: left; white-space: normal;">' + data + '</div>';
                                },
                                targets: targets
                            }
                        ],
                        //Reajusta el ancho de las columnas
                        drawCallback: function( settings ) {
                            $(this).DataTable().columns.adjust();
                            //Evento para ocultar o mostrar la paginación si existen o no registros después de una búsqueda
                            if ($(this).DataTable().page.info().recordsDisplay > 0) {
                                $('.dataTables_paginate').show();
                            }else{
                                $('.dataTables_paginate').hide();
                            }
                            //class_av.control();
                        }
                    }; 
        tablaaa = class_utils.setTabla('tbl_articulos', op);
        //class_av.control();
        
    }, 
   
    mensaje:function(texto, fn=null){
        $.confirm({
                title: '',
                content: texto,
                buttons: {
                    aceptar: {
                            text: 'Aceptar',
                            btnClass: 'btn-warning',
                            action: function(){
                                if(fn !== null){
                                    fn();
                                }else{
                                    return true;
                                }
                            }
                    }
                }
            });
    },
   
    filtro: function(){
        $(".li-filtro").off('click').on('click', function(){
                $('#btn-filtro').html($(this).html() + ' :');
                var id_filtro1 = this.id;
                var sel = class_utils.unique(class_av.var.articulosJSON, this.id).sort();
                
                if(this.id == "mes"){
                    sel.sort((a, b) => {
                        return class_av.var.nombresMes.indexOf(a) - class_av.var.nombresMes.indexOf(b);
                    });
                }
                
                var lis = '';
                $.each(sel, function(i,val){
                    if(val !== null){
                        var valor = val;
                        lis += class_av.var.li.replace('<id>', val).replace('<val>', valor);
                    }
                });
                $("#ul-filtro").html(lis);
                $('#btn-filtro2').html("Seleccione");
                $(".li-filtro2").off('click').on('click', function(){
                    $('#btn-filtro2').html($(this).html());
                    var filtro = class_utils.filter_prop(class_av.var.articulosJSON, id_filtro1, this.id);
                    class_av.setTabla(filtro);
                    $('#remove').show();
                });
            });
            $("#remove").off('click').on('click', function(){
                $('#remove').hide();
                $('#btn-filtro').html("Filtrar por :");
                $('#btn-filtro2').html("Seleccione");
                $("#ul-filtro").html("");
                class_av.setTabla(class_av.var.articulosJSON);
            });
            
        $(".li-filtro-anio").off('click').on('click', function(){
                if($('#btn-filtro-anio').html() !== $(this).html()){
                    $('#btn-filtro-anio').html($(this).html());
                    $('#remove').hide();
                    $('#btn-filtro').html("Filtrar por :");
                    $('#btn-filtro2').html("Seleccione");
                    $("#ul-filtro").html("");
                    loading.start();
                    class_av.initClient(this.id);
                }
            });
        }
};

$(class_av.ready);



