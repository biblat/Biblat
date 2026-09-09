<script>
    const cons =    { 
                        rol: Object.freeze( { val: '<?php echo $rol; ?>'}),
                        pal_cla: Object.freeze( { val: '<?php echo $pal_cla; ?>'}),
                        res: Object.freeze( { val: '<?php echo $res; ?>'}),

                        /*
                         * Interruptores temporales de liberación.
                         * Use true/false para habilitar u ocultar cada parte durante las pruebas/liberación.
                         */
                        features: Object.freeze({
                            // El modo portátil nunca se habilita para Editores.
                            mostrar_portatil: 'Editor' != '<?php echo $rol; ?>' && (false || 'Administrador' == '<?php echo $rol; ?>'),
                            mostrar_ia_disciplinas: false || 'Administrador' == '<?php echo $rol; ?>',
                            // Los Editores no realizan la revisión de palabras clave.
                            mostrar_ia_palabras_clave: 'Editor' != '<?php echo $rol; ?>' && (false || 'Administrador' == '<?php echo $rol; ?>'),
                            // Indicador "IA" en la columna Estatus del listado.
                            mostrar_indicador_ia: false || 'Administrador' == '<?php echo $rol; ?>',
                            mostrar_consulta_finalizados: false || 'Administrador' == '<?php echo $rol; ?>',
                            // Permite a Analistas/Administradores devolver un registro cerrado a revisión.
                            mostrar_reabrir_finalizados: false || 'Administrador' == '<?php echo $rol; ?>',
                        })
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

  /* Indicador compacto de registro ya procesado por IA en el listado. */
  .ia-status-slot {
      display: inline-block;
      margin-left: 5px;
      min-width: 0;
      vertical-align: middle;
  }

  .ia-status-chip {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      padding: 2px 6px;
      border: 1px solid #ff8000;
      border-radius: 10px;
      background: #fff7ed;
      color: #d96d00;
      font-size: 10px;
      font-weight: 700;
      line-height: 1.2;
      white-space: nowrap;
  }

  /* Acceso visible al modo consulta para registros finalizados. */
  .consulta-status-slot {
      display: inline-block;
      margin-left: 6px;
      vertical-align: middle;
  }

  .consulta-eye {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      border: 1px solid #d7d7d7;
      border-radius: 50%;
      background: #ffffff;
      color: #ff8000;
      cursor: pointer;
      font-size: 12px;
      line-height: 1;
      vertical-align: middle;
      transition: background .15s ease, border-color .15s ease, color .15s ease;
  }

  .consulta-eye:hover,
  .consulta-eye:focus {
      border-color: #ff8000;
      background: #fff4e8;
      color: #d96d00;
      outline: none;
  }

  /* Reabrir un registro finalizado para devolverlo a edición. */
  .reabrir-status-slot {
      display: inline-block;
      margin-left: 4px;
      vertical-align: middle;
  }

  .reabrir-status-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      border: 1px solid #c8d8e8;
      border-radius: 50%;
      background: #ffffff;
      color: #337ab7;
      cursor: pointer;
      font-size: 12px;
      line-height: 1;
      vertical-align: middle;
      transition: background .15s ease, border-color .15s ease, color .15s ease;
  }

  .reabrir-status-btn:hover,
  .reabrir-status-btn:focus {
      border-color: #337ab7;
      background: #eef6fc;
      color: #245580;
      outline: none;
  }


  /* ==============================================================
   * Presentación de palabras clave
   * - verde: término con coincidencia exacta en catálogo Biblat
   * - naranja: aproximación / término fuera de catálogo
   * - relleno: término seleccionado y por tanto se guardará
   * ============================================================== */
  .pc-titulo-ia {
      margin-top: 12px;
      padding: 12px 16px;
      background: #fafafa;
      border-left: 4px solid #ff8000;
      border-radius: 6px;
      margin-bottom: 7px;
      font-size: 15px;
      font-weight: 700;
  }

  .pc-ayuda-ia {
      margin: 0;
      color: #666666;
      font-size: 12px;
      line-height: 1.45;
  }

  .pc-leyenda {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      margin: 7px 0 10px;
      color: #666666;
      font-size: 11px;
  }

  .pc-leyenda-item {
      display: inline-flex;
      align-items: center;
      gap: 5px;
  }

  .pc-leyenda-muestra {
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid;
  }

  .pc-leyenda-muestra.exacta {
      border-color: #3c763d;
  }

  .pc-leyenda-muestra.aprox {
      border-color: #ff8000;
  }

  .pc-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 18px;
      align-items: start;
      margin-top: 8px;
  }

  .pc-lado {
      min-width: 0;
  }

  .pc-lado-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px 12px;
      align-items: start;
  }

  .pc-chip-item,
  .pc-sugerencia-item {
      width: 100%;
      min-width: 0;
      margin: 0;
  }

  .pc-chip-item {
      display: inline-flex;
      align-items: center;
      gap: 5px;
  }

  .pc-chip {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      column-gap: 8px;
      width: 100% !important;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
      margin: 0 !important;
      padding: 6px 10px 6px 12px;
      border-radius: 16px;
      white-space: normal !important;
      box-shadow: none;
      transition: background .14s ease, border-color .14s ease, color .14s ease, box-shadow .14s ease;
  }

  .pc-chip-text {
      min-width: 0;
      text-align: left;
      white-space: normal;
      overflow-wrap: anywhere;
      word-break: normal;
  }

  .pc-chip .badge {
      position: static !important;
      display: inline-block;
      margin: 0 !important;
      justify-self: end;
      flex: none;
      white-space: nowrap;
  }

  .pc-chip.pc-exacta.badge-secondary {
      background: #ffffff !important;
      border: 1px solid #3c763d;
      color: #333333;
  }

  .pc-chip.pc-exacta.badge-secondary:hover {
      background: #eef8f0 !important;
  }

  .pc-chip.pc-exacta.badge-warning {
      background: #3c763d !important;
      border: 1px solid #3c763d;
      color: #ffffff;
      box-shadow: 0 2px 5px rgba(60,118,61,.18);
  }

  .pc-chip.pc-exacta.badge-warning .badge {
      background: #dff0d8;
      color: #2b542c;
  }

  .pc-chip.pc-aprox.badge-secondary {
      background: #ffffff !important;
      border: 1px solid #ff8000;
      color: #333333;
  }

  .pc-chip.pc-aprox.badge-secondary:hover {
      background: #fff4e8 !important;
  }

  .pc-chip.pc-aprox.badge-warning {
      background: #ff8000 !important;
      border: 1px solid #ff8000;
      color: #111111;
      box-shadow: 0 2px 5px rgba(255,128,0,.16);
  }

  .pc-chip.pc-aprox.badge-warning .badge {
      background: #ffd6a8;
      color: #6b3a00;
  }

  .pc-chip.badge-secondary:not(.pc-exacta):not(.pc-aprox) {
      background: #ffffff !important;
      border: 1px solid #ff8000;
      color: #333333;
  }

  .pc-chip.badge-warning:not(.pc-exacta):not(.pc-aprox) {
      background: #ff8000 !important;
      border: 1px solid #ff8000;
      color: #111111;
  }

  .pc-chip-item .edita_palabra,
  .pc-chip-item .edita_keyword {
      margin-left: 2px;
      flex: 0 0 auto;
  }

  .pc-sugerencia-item {
      align-self: start;
  }

  .pc-sugerencia-cabecera {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 3px;
  }

  .pc-principal-slot {
      display: flex;
      align-items: center;
      min-width: 0;
      width: 100%;
  }

  .pc-sugerencia-toggle {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      align-self: flex-start;
      margin-top: 2px;
      padding: 2px 0;
      border: 0;
      background: transparent;
      color: #d96d00;
      cursor: pointer;
      font-size: 11px;
  }

  .pc-sugerencia-toggle:hover,
  .pc-sugerencia-toggle:focus {
      color: #b95d00;
      text-decoration: underline;
      outline: none;
  }

  .pc-sugerencia-toggle .fa {
      transition: transform .18s ease;
  }

  .pc-sugerencia-toggle.abierto .fa {
      transform: rotate(180deg);
  }

  .pc-aproximaciones-panel {
      display: none;
      margin-top: 3px;
      padding: 1px 0 0 8px;
  }

  .pc-sugerencias-catalogo {
      margin: 3px 0 0 0;
      padding-left: 18px;
      font-size: 11px;
  }

  .pc-sugerencias-catalogo li {
      margin: 3px 0;
      color: #444444;
  }

  .pc-sugerencia-opcion {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 0;
      border: 0;
      background: transparent;
      color: #333333;
      cursor: pointer;
      font: inherit;
      text-align: left;
  }

  .pc-sugerencia-opcion:hover,
  .pc-sugerencia-opcion:focus {
      color: #d96d00;
      text-decoration: underline;
      outline: none;
  }

  .pc-sugerencia-opcion .badge {
      font-size: 10px;
      line-height: 1.2;
  }

  @media (max-width: 991px) {
      .pc-layout {
          grid-template-columns: 1fr;
          gap: 12px;
      }
  }

  @media (max-width: 767px) {
      .pc-lado-grid {
          grid-template-columns: 1fr;
      }
  }

  /* Clasificación temática */
  #bloque_clasificacion_tematica {
      margin-top: 8px;
  }

  .clasificacion-titulo-general {
      margin: 4px 0 12px 0;
      font-size: 15px;
      font-weight: 700;
  }

  .clasificacion-ayuda {
      color: #777777;
      font-size: 12px;
      font-weight: normal;
      margin-left: 8px;
  }

  .clasificacion-card {
      margin-bottom: 14px;
      padding: 14px 16px;
      background: #ffffff;
      border: 1px solid #e3e3e3;
      border-left: 4px solid #ff8000;
      border-radius: 7px;
  }

  .clasificacion-card-titulo {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      font-weight: 700;
  }

  .clasificacion-numero {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #ff8000;
      color: #111111;
      font-size: 12px;
  }

  .clasificacion-origen {
      display: none;
      margin-left: auto;
      padding: 2px 8px;
      border-radius: 10px;
      background: #f2f2f2;
      color: #666666;
      font-size: 10px;
      font-weight: normal;
  }

  .ia-sugerencia {
      display: none;
      margin-top: 5px;
      color: #777777;
      font-size: 11px;
  }

  .evidencia-box {
      display: none;
      margin-top: 10px;
      padding: 9px 11px;
      background: #fafafa;
      border: 1px solid #e6e6e6;
      border-radius: 5px;
  }

  .evidencia-cabecera {
      margin-bottom: 5px;
      color: #555555;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .2px;
  }

  .evidencia-texto {
      color: #444444;
      font-size: 12px;
      line-height: 1.45;
  }

  .evidencia-texto.colapsada {
      max-height: 4.35em;
      overflow: hidden;
  }

  .evidencia-texto.expandida {
      max-height: none;
      overflow: visible;
  }

  .evidencia-toggle {
      display: none;
      margin: 5px 0 0 0;
      padding: 0;
      border: 0;
      background: transparent;
      color: #d96d00;
      cursor: pointer;
      font-size: 11px;
  }

  .evidencia-toggle:hover {
      text-decoration: underline;
  }


  /* Sugerencias IA de disciplina y subdisciplina.
   * Ninguna se selecciona automáticamente. Las tarjetas comparten el mismo
   * estilo tenue para que se identifiquen como ayuda y no como dato capturado. */
  .clasificacion-sugerencias-ia {
      display: none;
      margin-top: 10px;
  }

  .clasificacion-sugerencia-card {
      margin-top: 8px;
      padding: 9px 10px;
      border: 1px solid #e5e5e5;
      /*border-left: 3px solid #ff8000;*/
      border-radius: 5px;
      background: #fffaf4;
      transition: background .15s ease, border-color .15s ease, box-shadow .15s ease;
  }

  .clasificacion-sugerencia-card.seleccionada {
      background: #fff0df;
      border-color: #f2b36f;
      box-shadow: 0 0 0 2px rgba(255,128,0,.08);
  }

  .clasificacion-sugerencia-cabecera {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 0;
  }

  /*
   * La etiqueta SUGERENCIA es informativa y no es clicable.
   * Sólo el valor sugerido funciona como enlace de selección. El gap equivale
   * visualmente a un tab entre los dos puntos y el valor.
   */
  .clasificacion-sugerencia-seleccion {
      display: inline-flex;
      align-items: baseline;
      min-width: 0;
      gap: 14px;
      line-height: 1.35;
  }

  .clasificacion-sugerencia-etiqueta {
      flex: 0 0 auto;
      color: #d96d00;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .25px;
      white-space: nowrap;
  }

  .clasificacion-sugerencia-seleccionar-link {
      min-width: 0;
      padding: 2px 0;
      border: 0;
      background: transparent;
      color: #222222;
      cursor: pointer;
      text-align: left;
      font-size: 12px;
      font-weight: 700;
      line-height: 1.35;
      overflow-wrap: anywhere;
  }

  /* Sólo el valor cambia de color al pasar el mouse. */
  .clasificacion-sugerencia-seleccionar-link:hover,
  .clasificacion-sugerencia-seleccionar-link:focus {
      color: #d96d00;
      text-decoration: underline;
      outline: none;
  }

  .clasificacion-sugerencia-valor {
      color: inherit;
      font: inherit;
  }

  /* El signo de interrogación sólo abre/cierra el sustento. */
  .clasificacion-sugerencia-ayuda {
      flex: 0 0 auto;
      padding: 1px 3px;
      border: 0;
      background: transparent;
      color: #222222;
      cursor: pointer;
      font-size: 14px;
      font-weight: 700;
      line-height: 1;
  }

  .clasificacion-sugerencia-ayuda:hover,
  .clasificacion-sugerencia-ayuda:focus {
      color: #d96d00;
      outline: none;
  }

  .clasificacion-sugerencia-card.seleccionada .clasificacion-sugerencia-seleccionar-link {
      color: #222222;
  }

  .clasificacion-sugerencia-card.seleccionada .clasificacion-sugerencia-seleccionar-link:hover,
  .clasificacion-sugerencia-card.seleccionada .clasificacion-sugerencia-seleccionar-link:focus {
      color: #d96d00;
  }

  .clasificacion-sugerencia-evidencia {
      display: none;
      margin-top: 7px;
      padding-top: 7px;
      border-top: 1px solid #eee3d7;
  }

  .clasificacion-sugerencia-evidencia-texto {
      color: #555555;
      font-size: 11px;
      line-height: 1.4;
  }

  @media (max-width: 767px) {
      .clasificacion-card .col-sm-6 + .col-sm-6 {
          margin-top: 14px;
      }
  }


  /* Consulta de registros ya finalizados: se reutiliza la misma ficha,
   * pero toda la captura queda bloqueada. */
  #aviso_solo_lectura {
      display: none;
      margin: 0 0 14px 0;
      padding: 11px 13px;
      border: 1px solid #f0c48e;
      border-left: 4px solid #ff8000;
      border-radius: 6px;
      background: #fff8ef;
      color: #5e4a31;
      font-size: 12px;
  }
  #accordion.modo-solo-lectura input,
  #accordion.modo-solo-lectura select,
  #accordion.modo-solo-lectura textarea,
  #accordion.modo-solo-lectura button,
  #accordion.modo-solo-lectura .select2-selection,
  #accordion.modo-solo-lectura .pc-chip,
  #accordion.modo-solo-lectura .pc-sugerencia-toggle,
  #accordion.modo-solo-lectura .edita_palabra,
  #accordion.modo-solo-lectura .edita_keyword {
      pointer-events: none !important;
  }
  #accordion.modo-solo-lectura input,
  #accordion.modo-solo-lectura select,
  #accordion.modo-solo-lectura textarea {
      background: #f6f6f6 !important;
      color: #555 !important;
  }

  /* ==============================================================
   * Familia visual de botones para guardar secciones.
   * Todos los guardados comparten la misma identidad: blanco +
   * borde naranja. Así se distinguen de las acciones finales como
   * Análisis completo / No indizable sin asignar un color distinto
   * a Artículo, Instituciones y Autores.
   * ============================================================== */
  .btn-guardar-seccion {
      background: #ffffff;
      border: 1px solid #ff8000;
      color: #555555;
      border-radius: 5px;
      font-weight: 500;
      box-shadow: none;
      transition: background .15s ease, border-color .15s ease, color .15s ease, box-shadow .15s ease;
  }

  .btn-guardar-seccion .fa,
  .btn-guardar-seccion .glyphicon {
      color: #ff8000 !important;
      margin-right: 4px;
  }

  .btn-guardar-seccion:hover,
  .btn-guardar-seccion:focus {
      background: #fff4e8;
      border-color: #e67300;
      color: #333333;
      outline: none;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
  }

  .btn-guardar-seccion:active,
  .btn-guardar-seccion.active {
      background: #ffe7cc;
      border-color: #cc6600;
      color: #222222;
      box-shadow: inset 0 1px 2px rgba(0,0,0,.08);
  }

  .btn-guardar-seccion[disabled],
  .btn-guardar-seccion.disabled {
      background: #f7f7f7;
      border-color: #d8d8d8;
      color: #999999;
      opacity: .7;
  }

  .btn-guardar-seccion[disabled] .fa,
  .btn-guardar-seccion.disabled .fa {
      color: #aaaaaa !important;
  }

  /* Botón duplicado al final del acordeón para evitar volver arriba. */
  .guardar-final {
      margin-top: 28px;
      padding-top: 15px;
      padding-bottom: 5px;
      border-top: 1px solid #eeeeee;
      text-align: right;
  }

  .guardar-final .btn-guardar-seccion {
      min-width: 180px;
      padding: 8px 14px;
  }

  @media (max-width: 767px) {
      .guardar-final .btn-guardar-seccion {
          width: 100%;
      }
  }


  /* ==============================================================
   * Preferencia global de orden para Ciudad / Institución / Dependencia.
   * Es una opción de interfaz, no un dato del artículo.
   * ============================================================== */
  .catalog-order-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 5px 12px;
      border-bottom: 1px solid #eeeeee;
      width: 100%;
      margin-top: 8px;
      padding-top: 8px;
      color: #666666;
      font-size: 11px;
      font-weight: normal;
      text-align: center;
  }

  .catalog-order-label {
      font-weight: 600;
      color: #555555;
  }

  .catalog-order-option {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 2px 3px;
      border: 0;
      background: transparent;
      color: #666666;
      cursor: pointer;
      font-size: 11px;
      font-weight: normal;
      line-height: 1.2;
  }

  .catalog-order-option:hover,
  .catalog-order-option:focus {
      color: #333333;
      text-decoration: none;
      outline: none;
  }

  .catalog-order-dot {
      width: 11px;
      height: 11px;
      border: 2px solid #a9a9a9;
      border-radius: 50%;
      background: #ffffff;
      box-sizing: border-box;
  }

  .catalog-order-option.active {
      color: #333333;
      font-weight: 600;
  }

  .catalog-order-option.active .catalog-order-dot {
      border-color: #ff8000;
      background: #ff8000;
      box-shadow: inset 0 0 0 2px #ffffff;
  }


  /* ==============================================================
   * Acciones finales duplicadas al final del formulario.
   * Reutilizan los botones originales mediante .guardar-duplicado,
   * por lo que conservan las mismas validaciones y confirmaciones.
   * ============================================================== */
  .acciones-finales-bottom {
      display: none;
      margin: 20px 0 6px;
      padding: 18px 14px;
      border: 1px solid #e3e3e3;
      border-radius: 7px;
      background: #fafafa;
      text-align: center;
  }

  .acciones-finales-bottom-titulo {
      display: block;
      margin-bottom: 12px;
      color: #555555;
      font-size: 12px;
      font-weight: 700;
  }

  .acciones-finales-bottom-botones {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 9px;
      flex-wrap: wrap;
  }

  @media (max-width: 767px) {
      .acciones-finales-bottom-botones {
          flex-direction: column;
          align-items: stretch;
      }

      .acciones-finales-bottom-botones .btn {
          width: 100%;
      }
  }

  /* ==============================================================
   * Acciones finales del registro.
   * Se distinguen de los botones de guardado por color semántico:
   *   - completar: verde
   *   - no indizable: rojo
   * En reposo conservan fondo blanco para no saturar la interfaz;
   * al pasar el mouse se vuelven sólidos para reforzar que son
   * acciones finales/importantes.
   * ============================================================== */
  .btn-finalizar {
      background: #ffffff;
      border: 1px solid #3c763d;
      color: #3c763d;
      border-radius: 5px;
      font-weight: 600;
      box-shadow: none;
      transition: background .15s ease, border-color .15s ease, color .15s ease, box-shadow .15s ease, transform .08s ease;
  }

  .btn-finalizar .fa,
  .btn-finalizar .glyphicon {
      color: #3c763d !important;
      margin-right: 4px;
      transition: color .15s ease;
  }

  .btn-finalizar:hover,
  .btn-finalizar:focus {
      background: #3c763d;
      border-color: #315f32;
      color: #ffffff;
      outline: none;
      box-shadow: 0 2px 5px rgba(60,118,61,.22);
  }

  .btn-finalizar:hover .fa,
  .btn-finalizar:focus .fa,
  .btn-finalizar:hover .glyphicon,
  .btn-finalizar:focus .glyphicon {
      color: #ffffff !important;
  }

  .btn-finalizar:active,
  .btn-finalizar.active {
      background: #2b542c;
      border-color: #234624;
      color: #ffffff;
      box-shadow: inset 0 1px 2px rgba(0,0,0,.16);
      transform: translateY(1px);
  }

  .btn-no-indizable {
      background: #ffffff;
      border: 1px solid #a94442;
      color: #a94442;
      border-radius: 5px;
      font-weight: 600;
      box-shadow: none;
      transition: background .15s ease, border-color .15s ease, color .15s ease, box-shadow .15s ease, transform .08s ease;
  }

  .btn-no-indizable .fa,
  .btn-no-indizable .glyphicon {
      color: #a94442 !important;
      margin-right: 4px;
      transition: color .15s ease;
  }

  .btn-no-indizable:hover,
  .btn-no-indizable:focus {
      background: #a94442;
      border-color: #8f3836;
      color: #ffffff;
      outline: none;
      box-shadow: 0 2px 5px rgba(169,68,66,.22);
  }

  .btn-no-indizable:hover .fa,
  .btn-no-indizable:focus .fa,
  .btn-no-indizable:hover .glyphicon,
  .btn-no-indizable:focus .glyphicon {
      color: #ffffff !important;
  }

  .btn-no-indizable:active,
  .btn-no-indizable.active {
      background: #843534;
      border-color: #6f2d2c;
      color: #ffffff;
      box-shadow: inset 0 1px 2px rgba(0,0,0,.16);
      transform: translateY(1px);
  }

  .btn-finalizar[disabled],
  .btn-finalizar.disabled,
  .btn-no-indizable[disabled],
  .btn-no-indizable.disabled {
      background: #f7f7f7;
      border-color: #d8d8d8;
      color: #999999;
      opacity: .7;
      box-shadow: none;
      transform: none;
  }

  .btn-finalizar[disabled] .fa,
  .btn-finalizar.disabled .fa,
  .btn-no-indizable[disabled] .fa,
  .btn-no-indizable.disabled .fa {
      color: #aaaaaa !important;
  }
</style>
<div class="row"><br></div>
<!--center><div class="row"><b>Meta del departamento:</b> 1000 Registros</div></center>
<div class="row"><br></div>
<div class="row"><br></div>
<div class="progress">
  
</div-->

<div class="row" style="">
    <div class="col-sm-12">
        <center>
        <button id="btn_nuevo_articulo" type="button" class="btn btn-warning">
            <i class="fa fa-file" aria-hidden="true"></i><span> Agregar artículo </span></button>
        </center>
    </div>
</div>

<div class="row">
    <div class="col-sm-12">
        <div class="row" id="div_nuevo_articulo" style="display:none;">
            <div class="col-sm-12">
                <span><b>Revista:</b></span><br>
                <select class="form-control" name="revista" id="revista_sel" style="width:100%" width="100%">
                </select>
            </div>
            <div class="col-sm-12"><br></div>
            <!--div class="col-sm-12">
                <span><b>Año:</b></span><br>
                <select class="form-control" name="año" id="anio_rev" style="width:50%" width="50%">
                </select>
            </div>
            <div class="col-sm-12"><br></div>
            <div class="col-sm-12">
                <span><b>Seleccionar del listado o especificar:</b></span><br><br>
                <span>Listado:</span><br>
                <select class="form-control" name="número" id="sel_numero" style="width:50%;" width="50%">
                </select>
                <br><br>
                <div>
                    <span>Especificar:</span><br>
                    <span style="width:50px;display:inline-block"><b>Vol. :</b></span><input id='txt_vol' style="width:50px;"><span>&nbsp;&nbsp;</span><input type="checkbox" id="sin_vol" value="0" class="check"><span>&nbsp;</span>Sin volumen<br><br>
                    <span style="width:50px;display:inline-block"><b>Num. :</b></span><input id='txt_num' style="width:50px;"><span>&nbsp;&nbsp;</span><input type="checkbox" id="sin_num" value="0" class="check"><span>&nbsp;</span>Sin número<br><br>
                    <span style="width:50px;display:inline-block"><b>Parte :</b></span> <input type="checkbox" id="p_esp" class="check"><span>&nbsp;</span>Especial <span>&nbsp;&nbsp;</span> <input type="checkbox" id="p_sup" class="check"><span>&nbsp;</span>Suplemento <span>&nbsp;&nbsp;</span> <input type="checkbox" id="p_est" class="check"><span>&nbsp;</span>Estación del año <span>&nbsp;&nbsp;</span> <input type="checkbox" id="p_no" class="check"><span>&nbsp;</span>No aplica<br><br>
                    <div id="div_suplemento" style="display:none"><span style="display:inline-block"><b>Número de suplemento :&nbsp;</b></span><input id='txt_num_sup' style="width:50px;"><span>&nbsp;&nbsp;</span><input type="checkbox" id="sin_num_sup" value="0" class="check"><span>&nbsp;</span>Sin número<br><br></div>
                    <div id="div_especial" style="display:none"><span style="display:inline-block"><b>Número de especial :&nbsp;</b></span><input id='txt_num_esp' style="width:50px;"><span>&nbsp;&nbsp;</span><input type="checkbox" id="sin_num_esp" value="0" class="check"><span>&nbsp;</span>Sin número<br><br></div>
                    <div id="div_estacion" style="display:none">
                    <span style="display:inline-block"><b>Estación :&nbsp;</b></span>
                    <select class="form-control" name="estacion" id="sel_estacion" style="width:150px;display:inline-block">
                        <option value="primavera" selected>Primavera</option>
                        <option value="verano">Verano</option>
                        <option value="otoño">Otoño</option>
                        <option value="invierno">Invierno</option>
                    </select>
                    </div>
                </div>
            </div>
            <div class="col-sm-12"><br></div-->
            <div class="col-sm-12" id="div_titulos">
                <span><b>Título del artículo:</b></span><br>
                <input id='titulo_na' style="min-width: 100%" type="text" data-placement="top">
                <br><span><b>Páginas del artículo:</b></span><br>
                <input id="de_p" style="min-width: 10%" type="text" data-placement="top" placeholder="Página inicial"> - 
                <input id="a_p" style="min-width: 10%" type="text" data-placement="top" placeholder="Página final">
                </div>
            <div class="col-sm-12"><br><br></div>
            <center>
                <button id="agrega_titulo_na" type="button" class="btn btn-default btn-sm"> 
                    <span class="glyphicon glyphicon-plus" aria-hidden="true" style="color: #ff8000;"></span> Agregar otro título 
                </button> 
            </center>
            <div class="col-sm-12"><br><br><br></div>
            <div class="col-sm-12">
                <center>
                <button id="btn_agregar_na" type="button" class="btn btn-warning"><span> Guardar </span></button>
                <button id="btn_cancelar_na" type="button" class="btn btn-warning"><span> Cancelar </span></button>
                </center>
            </div>
        </div>
    </div>
</div>

{if $rol != "Editor"}
<div class="row" id="bloque_portatil" style="display:none; margin-top:14px; margin-bottom:10px;">
    <div class="col-sm-12">
        <center>
            <button id="btn_exportar_portatil" type="button" class="btn btn-warning">
                <i class="fa fa-download" aria-hidden="true"></i><span> Exportar</span>
            </button>
            <button id="btn_importar_portatil" type="button" class="btn btn-default" title="Importar el ZIP generado por Biblat Central portátil">
                <i class="fa fa-upload" aria-hidden="true"></i><span> Importar</span>
            </button>
            <input id="input_importar_portatil" type="file" accept=".zip,application/zip" style="display:none">
        </center>
    </div>
</div>
{/if}

<div class="row">
    <div class="col-xs-12" id="div-filtro" style="">
        <div class="btn-group" role="group">
        <!-- Split button -->
        <div class="btn-group">
            <button type="button" class="btn btn-warning" id="btn-filtro" style="width:160px;border-radius:5px">Filtrar por :</button>
            <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="border-radius:5px">
            <span class="caret"></span>
            <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" style="border-radius:5px">
                <li><a class="li-filtro" id="estatus">Estatus</a></li>
                {if $pal_cla == '1'}
                <li><a class="li-filtro" id="estatusPC">Estatus PC</a></li>
                {/if}
                <li><a class="li-filtro" id="fechaAsignado">Fecha asignado</a></li>
                <li><a class="li-filtro" id="mes">Completados por mes</a></li>
                <li><a class="li-filtro" id="revista">Revista</a></li>
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
    </div>
</div>

<div class="row">
    <div class="col-sm-12">
        <div id="div_tabla" style="display:block">
        </div>
    </div>
</div>

<div class="row"><br></div>

<div class="row">
    <div class="col-sm-12">
        <div class="panel-group" id="accordion" style="display: none">
            <div class="panel panel-default">
                <div class="panel-heading">
                  <h5 class="panel-title">
                      <span id="titRevista"></span><br><br>
                      <b><span id="titArticulo"></span></b>
                      <br><br>
                      <center>
                            {if $rol == "Editor"}
                                <button id="save-full" type="button" class="btn btn-finalizar"><i class="fa fa-thumbs-up" aria-hidden="true"></i> <span>Completado</span></button>
                            {else}
                                <button id="save-no-indizable" type="button" class="btn btn-no-indizable"><i class="fa fa-thumbs-down" aria-hidden="true"></i> <span>No indizable</span></button>
                                <button id="save-full" type="button" class="btn btn-finalizar"><i class="fa fa-thumbs-up" aria-hidden="true"></i> <span>Análisis completo</span></button>
                                <button id="save-full-pc" type="button" class="btn btn-finalizar"><i class="fa fa-thumbs-up" aria-hidden="true"></i> <span>Análisis de palabras clave completo</span></button>
                            {/if}
                      </center>
                  </h5>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                  <h5 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#articulo">
                          Artículo
                      </a><a href="<?=site_url("adminb/ayuda_articulos");?>" target="_blank" style="padding: 5px"><i class="fa fa-question-circle" style="color: #ff8000;"></i></a>
                      <button id="save-article" type="button" class="btn btn-guardar-seccion" style="float: right;"><i class="fa fa-file" aria-hidden="true"></i><span> Guardar artículo</span></button>
                      <button id="save-pc" type="button" class="btn btn-dark" style="float: right;"><i class="fa fa-list-ol" aria-hidden="true" style="color: #ff8000;"></i><span> Guardar palabras clave</span></button>
                      <br><br>
                  </h5>
                </div>
                <div id="articulo" class="panel-collapse collapse in">
                    <div class="panel-body">
                        <div id="aviso_solo_lectura">
                            <i class="fa fa-lock" aria-hidden="true" style="color:#ff8000"></i>
                            <b>Registro finalizado — modo consulta.</b>
                            Se muestran los datos actualmente almacenados en Biblat Central para que pueda verificar el resultado, pero no se permite modificarlos ni volver a guardarlos.
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <span><b>Idioma(s) del documento:</b></span><br>
                                <select id='idiomaDocumento' multiple="multiple" width="100%" style="width: 100%">
                                    <option value="Español" >Español</option>
                                    <option value="Portugués" >Portugués</option>
                                    <option value="Inglés" >Inglés</option>
                                    <option value="Francés" >Francés</option>
                                    <option value="Italiano" >Italiano</option>
                                    <option value="Alemán" >Alemán</option>
                                    <option value="Ruso" >Ruso</option>
                                    <option value="Otro" >Otro</option>
                                </select>
                            </div>
                        </div>
                        <div class="row"><br></div>
                        <div class="row">
                            <div class="col-xs-8">
                                <span><b>Título:</b></span><br><input id='titulo' style="min-width: 100%" type="text" data-toggle="tooltip" data-placement="top" title="Presione [Enter] para realizar revisión" class="tooltip-titulo">
                                <div id="check-titulo" style="display: none">
                                    <i class="fa fa-file-pdf-o" aria-hidden="true" style="color: darkred"></i>
                                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                                    <span id="check-titulo-texto" style="display: false"></span>
                                    <i id="check-titulo-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>
                                    <i id="check-titulo-broken" class="fa fa-chain-broken" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo-false" class="fa fa-exclamation-circle" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo-half" class="fa fa-star-half-o" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo-true" class="fa fa-star" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <span><b>Idioma:</b></span><br>
                                    <select id='idioma' style="min-width: 100%">
                                        <option value="Español" >Español</option>
                                        <option value="Inglés" >Inglés</option>
                                        <option value="Portugués" >Portugués</option>
                                        <option value="Francés" >Francés</option>
                                        <option value="Italiano" >Italiano</option>
                                        <option value="Alemán" >Alemán</option>
                                        <option value="Ruso" >Ruso</option>
                                    </select>
                                <div id="check-idioma" style="display: none">
                                    <i id="check-idioma-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>
                                    <span id="check-idioma-texto" style="display: false"></span>
                                    <i id="check-idioma-true" class="fa fa-star" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-idioma-false" class="fa fa-exclamation-circle" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-8 traduccion-titulo2">
                                <br>
                                <span><b>Título traducido:</b></span><br><input id='titulo2' style="min-width: 100%" type="text" data-toggle="tooltip" data-placement="top" title="Presione [Enter] para realizar revisión" class="tooltip-titulo">
                                <div id="check-titulo2" style="display: none">
                                    <i class="fa fa-file-pdf-o" aria-hidden="true" style="color: darkred"></i>
                                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                                    <span id="check-titulo2-texto" style="display: false"></span>
                                    <i id="check-titulo2-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>
                                    <i id="check-titulo2-broken" class="fa fa-chain-broken" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo2-false" class="fa fa-exclamation-circle" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo2-half" class="fa fa-star-half-o" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo2-true" class="fa fa-star" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                </div>
                            </div>
                            <div class="col-xs-4 traduccion-titulo2">
                                <br>
                                <span><b>Idioma:</b></span><br>
                                    <select id='idioma2' style="min-width: 100%">
                                        <option value="Español" >Español</option>
                                        <option value="Inglés" >Inglés</option>
                                        <option value="Portugués" >Portugués</option>
                                        <option value="Francés" >Francés</option>
                                        <option value="Italiano" >Italiano</option>
                                        <option value="Alemán" >Alemán</option>
                                        <option value="Ruso" >Ruso</option>
                                    </select>
                                <div id="check-idioma2" style="display: none">
                                    <i id="check-idioma2-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>
                                    <span id="check-idioma2-texto" style="display: false"></span>
                                    <i id="check-idioma2-true" class="fa fa-star" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-idioma2-false" class="fa fa-exclamation-circle" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-8 traduccion-titulo3">
                                <br>
                                <span><b>Título traducido:</b></span><br><input id='titulo3' style="min-width: 100%" type="text" data-toggle="tooltip" data-placement="top" title="Presione [Enter] para realizar revisión" class="tooltip-titulo">
                                <div id="check-titulo3" style="display: none">
                                    <i class="fa fa-file-pdf-o" aria-hidden="true" style="color: darkred"></i>
                                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                                    <span id="check-titulo3-texto" style="display: false"></span>
                                    <i id="check-titulo3-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>
                                    <i id="check-titulo3-broken" class="fa fa-chain-broken" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo3-false" class="fa fa-exclamation-circle" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo3-half" class="fa fa-star-half-o" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-titulo3-true" class="fa fa-star" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                </div>
                            </div>
                            <div class="col-xs-4 traduccion-titulo3">
                                <br>
                                <span><b>Idioma:</b></span><br>
                                    <select id='idioma3' style="min-width: 100%">
                                        <option value="Español" >Español</option>
                                        <option value="Inglés" >Inglés</option>
                                        <option value="Portugués" >Portugués</option>
                                        <option value="Francés" >Francés</option>
                                        <option value="Italiano" >Italiano</option>
                                        <option value="Alemán" >Alemán</option>
                                        <option value="Ruso" >Ruso</option>
                                    </select>
                                <div id="check-idioma3" style="display: none">
                                    <i id="check-idioma3-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>
                                    <span id="check-idioma3-texto" style="display: false"></span>
                                    <i id="check-idioma3-true" class="fa fa-star" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                    <i id="check-idioma3-false" class="fa fa-exclamation-circle" aria-hidden="true" style="color: #ff8000; display: none"></i>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <br>
                        </div>
                        <div class="row">
                            <div class="col-xs-12 form-group">
                                <span><b>Tipo de documento:</b></span><br><select width="100%" style="width: 100%" id="tipo_documento" class="form-control">
                                    </select>
                            </div>
                        </div>
                        <div class="row" id="row_errata">
                            <div id="div_busca_original" class="col-xs-12 form-group" style="display:none">
                                <br>
                                <center>
                                    <button id="add-errata" type="button" class="btn btn-dark"><i class="fa fa-search" aria-hidden="true" style="color: #ff8000;"></i><span> Buscar documento original</span></button>
                                </center>
                                <br>
                                <div id="div_datos_original" style="display:none">
                                <span><b>No sistema:</b></span>&nbsp;&nbsp;&nbsp;<span id="sistema_original"></span>&nbsp;&nbsp;&nbsp;<button id="importar_original" type="button" class="btn btn-dark"><i class="fa fa-id-card-o" aria-hidden="true" style="color: #ff8000;"></i><span> Importar Autores e Instituciones para corrección</span></button><br>
                                <span><b>Título:</b></span>&nbsp;&nbsp;&nbsp;<span id="titulo_original"></span><br>
                                </div>
                            </div>
                            <div id="div_nota_general" class="col-xs-12 form-group" style="display:none">
                                <br>
                                <span id="txt_nota_general"><b>Nota general (Documento original):</b></span><br><input id='nota_general' style="min-width: 100%" type="text">
                            </div>
                        </div>
                        <div class="row">
                            <br>
                        </div>
                        <div class="row" id="bloque_clasificacion_tematica">
                            <div class="col-xs-12">
                                <div class="clasificacion-card" id="clasificacion-card-1">
                                    <!--<div class="clasificacion-card-titulo">
                                        <span class="clasificacion-numero">1</span>
                                        <span>Clasificación 1</span>
                                        <span class="clasificacion-origen" id="clasificacion-origen-1">Sugerencia IA disponible</span>
                                    </div>-->
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <span><b>Disciplina 1:</b></span><br>
                                            <select width="100%" style="width: 100%" id="disciplina1" class="form-control disciplina"></select>
                                            <div id="sugerencias-disciplina1" class="clasificacion-sugerencias-ia"></div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div id="divSubdisciplina1" style="display: none">
                                                <span><b>Subdisciplina 1:</b></span><br>
                                                <select width="100%" style="width: 100%" id="subdisciplina1" class="form-control"></select>
                                                <div id="sugerencias-subdisciplina1" class="clasificacion-sugerencias-ia"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="clasificacion-card" id="clasificacion-card-2">
<!--                                    <div class="clasificacion-card-titulo">
                                        <span class="clasificacion-numero">2</span>
                                        <span>Clasificación 2</span>
                                        <span class="clasificacion-origen" id="clasificacion-origen-2">Sugerencia IA disponible</span>
                                    </div>-->
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <span><b>Disciplina 2:</b></span><br>
                                            <select width="100%" style="width: 100%" id="disciplina2" class="form-control disciplina"></select>
                                            <div id="sugerencias-disciplina2" class="clasificacion-sugerencias-ia"></div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div id="divSubdisciplina2" style="display: none">
                                                <span><b>Subdisciplina 2:</b></span><br>
                                                <select width="100%" style="width: 100%" id="subdisciplina2" class="form-control"></select>
                                                <div id="sugerencias-subdisciplina2" class="clasificacion-sugerencias-ia"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="clasificacion-card" id="clasificacion-card-3">
<!--                                    <div class="clasificacion-card-titulo">
                                        <span class="clasificacion-numero">3</span>
                                        <span>Clasificación 3</span>
                                        <span class="clasificacion-origen" id="clasificacion-origen-3">Sugerencia IA disponible</span>
                                    </div>-->
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <span><b>Disciplina 3:</b></span><br>
                                            <select width="100%" style="width: 100%" id="disciplina3" class="form-control disciplina"></select>
                                            <div id="sugerencias-disciplina3" class="clasificacion-sugerencias-ia"></div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div id="divSubdisciplina3" style="display: none">
                                                <span><b>Subdisciplina 3:</b></span><br>
                                                <select width="100%" style="width: 100%" id="subdisciplina3" class="form-control"></select>
                                                <div id="sugerencias-subdisciplina3" class="clasificacion-sugerencias-ia"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <br>
                        </div>
                        <div class="row">
                            <div class="col-xs-8">
                                <span><b>URL1:</b></span><br><input id="url1" style="min-width: 100%" type="url">
                            </div>
                            <div class="col-xs-4">
                                <span><b>Tipo URL1:</b></span><br>
                                <select id='tipourl1' style="min-width: 100%">
                                    <option value="html" >HTML</option>
                                    <option value="pdf" >PDF</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <br>
                            <div class="col-xs-8">
                                <span><b>URL2:</b></span><br><input id="url2" style="min-width: 100%" type="url">
                            </div>
                            <div class="col-xs-4">
                                <span><b>Tipo URL2:</b></span><br>
                                <select id='tipourl2' style="min-width: 100%">
                                    <option value="html" >HTML</option>
                                    <option value="pdf" >PDF</option>
                                </select>
                            </div>
                        </div>
                        <!--comentar-->
                        <div class="row" id="div_resumen_esp" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <span><b>Resumen en español:</b></span><br>
                                <textarea id="resumen_esp" style="width: 100%; height: 100px; overflow-y: scroll;"></textarea>
                            </div>
                        </div>
                        <div class="row" id="div_resumen_ing" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <span><b>Resumen en inglés:</b></span><br>
                                <textarea id="resumen_ing" style="width: 100%; height: 100px; overflow-y: scroll;"></textarea>
                            </div>
                        </div>
                        <div class="row" id="div_resumen_por" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <span><b>Resumen en portugués:</b></span><br>
                                <textarea id="resumen_por" style="width: 100%; height: 100px; overflow-y: scroll;"></textarea>
                            </div>
                        </div>
                        <div class="row" id="div_resumen_otro" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <span><b>Resumen en otro idioma:</b></span><br>
                                <textarea id="resumen_otro" style="width: 100%; height: 100px; overflow-y: scroll;"></textarea>
                            </div>
                        </div>
                        
                        {if $rol == "Editor"}
                        <div class="row">
                            <br>
                            <br>
                            <div class="col-xs-12">
                                <p>
                                    <b>Las palabras clave serán asignadas posteriormente por el equipo de Analistas de Biblat en la correspondiente revisión del artículo.</b>
                                <p>
                            </div>
                        </div>
                        {/if}
                        
                        <br>
                        <div class="row" id="div_palabras_clave_texto" style="display:none">
                            <div class="col-xs-12">
                                <div class="pc-titulo-ia" id="titulo_palabras_clave_ia">Palabras clave seleccionadas con IA</div>
                                <div class="pc-leyenda" aria-label="Leyenda de palabras clave">
                                    <span class="pc-leyenda-item"><span class="pc-leyenda-muestra exacta"></span> En catálogo Biblat</span>
                                    <span class="pc-leyenda-item"><span class="pc-leyenda-muestra aprox"></span> Aproximación</span>
                                </div>
                            </div>
                        </div>

                        <div class="row" id="div_cargando_pc" style="display:none">
                            <div class="col-xs-12">
                                <b>Obteniendo palabras clave</b> ...<i id="check-titulo-load" class="fa fa-spinner fa-pulse" aria-hidden="true" style="color: #ff8000; display: true"></i>
                            </div>
                        </div>

                        <div id="div_palabras_clave_autor" style="display:none"><span id="palabras_clave_autores"></span></div>

                        <div class="row" id="div_palabras" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <div class="pc-layout">
                                    <div class="pc-lado pc-lado-exactas">
                                        <div id="palabras_catalogo" class="pc-lado-grid"></div>
                                    </div>
                                    <div class="pc-lado pc-lado-aproximaciones">
                                        <div id="otras_palabras" class="pc-lado-grid"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row" id="div_palabras_clave" style="display:none"></div>
                        <div class="row" id="div_palabras_clave2" style="display:none"></div>

                        <div class="row">
                            <br>
                            <center>
                                <button id="add-palabra" type="button" class="btn btn-dark" style="display:none"><img class="imagen" src="{base_url('img/palabra-clave.png')}" style="filter: invert(0.5) sepia(9) hue-rotate(0deg) saturate(1000%);height:20px;display:inline-block"><span> Agregar palabra clave</span></button>
                            </center>
                        </div>

                        <div class="row" id="div_palabras_clave_n" style="display:none">
                            <span id="palabras_clave_n"></span>
                        </div>

                        <!-- Inglés: misma dinámica con biblat_exactas_en y biblat_sugerencias_en. -->
                        <div class="row" id="div_keywords_texto" style="display:none">
                            <div class="col-xs-12">
                                <div class="pc-titulo-ia" id="titulo_keywords_ia">Keywords seleccionadas con IA</div>
                                <div class="pc-leyenda" aria-label="Leyenda de keywords">
                                    <span class="pc-leyenda-item"><span class="pc-leyenda-muestra exacta"></span> En catálogo Biblat</span>
                                    <span class="pc-leyenda-item"><span class="pc-leyenda-muestra aprox"></span> Aproximación</span>
                                </div>
                            </div>
                        </div>

                        <div class="row" id="div_keywords" style="display:none">
                            <br>
                            <div class="col-xs-12">
                                <div id="div_keywords_guardadas_interno" style="display:none"><div id="keywords_guardadas"></div></div>
                                <div class="pc-layout">
                                    <div id="div_keywords_catalogo_interno" class="pc-lado pc-lado-exactas">
                                        <div id="keywords_catalogo" class="pc-lado-grid"></div>
                                    </div>
                                    <div id="div_otras_keywords_interno" class="pc-lado pc-lado-aproximaciones">
                                        <div id="otras_keywords" class="pc-lado-grid"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <br>
                            <center>
                                <button id="add-keyword" type="button" class="btn btn-dark" style="display:none"><img class="imagen" src="{base_url('img/palabra-clave.png')}" style="filter: invert(0.5) sepia(9) hue-rotate(0deg) saturate(1000%);height:20px;display:inline-block"><span> Agregar keyword</span></button>
                            </center>
                        </div>

                        <div class="row" id="div_keywords_n" style="display:none">
                            <span id="keywords_n"></span>
                        </div>
<div class="row">
                            <br>
                            <center>
                                <button id="import-ai" type="button" class="btn btn-dark" style="display:none"><img class="imagen" src="{base_url('img/aie.png')}" style="filter: invert(0.5) sepia(9) hue-rotate(0deg) saturate(1000%);height:20px;display:inline-block"><span> Extraer de PDF</span></button>
                            </center>
                        </div>
                        <div class="guardar-final">
                            <button id="save-article-bottom"
                                    type="button"
                                    class="btn btn-guardar-seccion guardar-duplicado"
                                    data-target="#save-article">
                                <i class="fa fa-file" aria-hidden="true"></i>
                                <span> Guardar artículo</span>
                            </button>
                        </div>
                        <!--comentar-->
                    </div>
                </div>
            </div>
            <div class="panel panel-default" id="panelInstituciones">
                <div class="panel-heading">
                  <h5 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#instituciones" id="accordionInstituciones">
                        Instituciones
                      </a><a href="<?=site_url("adminb/ayuda_instituciones");?>" target="_blank" style="padding: 5px"><i class="fa fa-question-circle" style="color: #ff8000;"></i></a>
                      <button id="save-instituciones" type="button" class="btn btn-guardar-seccion" style="float: right;"><i class="fa fa-university" aria-hidden="true"></i><span> Guardar instituciones</span></button>
                      <br><br>
                  </h5>
                </div>
                <div id="instituciones" class="panel-collapse collapse">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div id="orden_catalogos_institucionales" class="catalog-order-bar" aria-label="Orden de los catálogos institucionales">
                                <span class="catalog-order-label">Ordenamiento en catálogos:</span>
                                <button type="button" class="catalog-order-option" data-mode="frecuencia" aria-pressed="false">
                                    <span class="catalog-order-dot" aria-hidden="true"></span>
                                    <span>Por frecuencia</span>
                                </button>
                                <button type="button" class="catalog-order-option" data-mode="alfabetico" aria-pressed="false">
                                    <span class="catalog-order-dot" aria-hidden="true"></span>
                                    <span>Alfabético</span>
                                </button>
                            </div>
                            <div class="col-xs-12"><br><br></div>
                            <div class="col-xs-12">
                                <input type="checkbox" id="es-corporativo" value="corporativo"><label for="es-corporativo" style="padding: 10px;"><b>Es autor corporativo</b></label>
                            </div>
                            <div class="panel-body" id="div-instituciones">
                                
                            </div>
                            <center>
                            <button id="agrega-institucion" type="button" class="btn btn-default btn-sm"> 
                                <span class="glyphicon glyphicon-plus" aria-hidden="true" style="color: #ff8000;"></span> Agregar Institución 
                            </button> 
                            </center>

                            <div class="guardar-final">
                                <button id="save-instituciones-bottom"
                                        type="button"
                                        class="btn btn-guardar-seccion guardar-duplicado"
                                        data-target="#save-instituciones">
                                    <i class="fa fa-university" aria-hidden="true"></i>
                                    <span> Guardar instituciones</span>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="panel panel-default" id="avisoAutores" style="display:none">
                <div class="panel-heading">
                    <h5 class="panel-title">
                        <b>Nota:</b> Al indicar en el bloque de Instituciones que se trata de un autor corporativo, el bloque de Autores no es necesario y por lo tanto no se muestra.
                    </h5>  
                </div>
            </div>
            <div class="panel panel-default" id="panelAutores">
                <div class="panel-heading">
                  <h5 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#autores" id="accordionAutores">
                        Autores
                      </a><a href="<?=site_url("adminb/ayuda_autores");?>" target="_blank" style="padding: 5px"><i class="fa fa-question-circle" style="color: #ff8000;"></i></a>
                      <button id="save-autores" type="button" class="btn btn-guardar-seccion" style="float: right;"><i class="fa fa-users" aria-hidden="true"></i><span> Guardar autores</span></button>
                      <br><br>
                  </h5>
                </div>
                <div id="autores" class="panel-collapse collapse">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="panel-body" id="div-autores">
                                
                            </div>
                            <center>
                            <button id="agrega-autor" type="button" class="btn btn-default btn-sm"> 
                                <span class="glyphicon glyphicon-plus" aria-hidden="true" style="color: #ff8000;"></span> Agregar Autor
                            </button> 
                            </center>

                            <div class="guardar-final">
                                <button id="save-autores-bottom"
                                        type="button"
                                        class="btn btn-guardar-seccion guardar-duplicado"
                                        data-target="#save-autores">
                                    <i class="fa fa-users" aria-hidden="true"></i>
                                    <span> Guardar autores</span>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {if $rol != "Editor"}
            <div id="acciones-finales-bottom" class="acciones-finales-bottom">
                <span class="acciones-finales-bottom-titulo">Finalizar registro</span>
                <div class="acciones-finales-bottom-botones">
                    <button id="save-no-indizable-bottom"
                            type="button"
                            class="btn btn-no-indizable guardar-duplicado"
                            data-target="#save-no-indizable">
                        <i class="fa fa-thumbs-down" aria-hidden="true"></i>
                        <span>No indizable</span>
                    </button>
                    <button id="save-full-bottom"
                            type="button"
                            class="btn btn-finalizar guardar-duplicado"
                            data-target="#save-full">
                        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                        <span>Análisis completo</span>
                    </button>
                </div>
            </div>
            {/if}
        </div>
    </div>
</div>

<div class="row"><br><br><br><br><br><br><br></div>