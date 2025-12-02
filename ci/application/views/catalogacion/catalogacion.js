class_cat = {
    cons:{
        send_pdf: '/api_metametrics/send_indizacion',
    },
    ready: function(){
        class_cat.control();
    },
    control: function(){
		$("#usos-sugeridos").on("click",function(event){
            $("#usos-sugeridos-div").show();
        });
		
        $("#formPDF").on("submit",function(event) {
            loading.start();
            $('#div_resultado_orig').html("");
            $('#div_resultado_esp').html("");
            $('#div_resultado_ent').html("");
            $('#div_resultado_bib_exact').html("");
			$('#div_resultado_bib_aprox').html("");
            $('#resultados').hide();
            
            event.preventDefault();  // Prevenir el comportamiento por defecto del formulario
            
            var formData = new FormData();
            formData.append("file", $("#archivo")[0].files[0]);
            formData.append("text", $("#texto_art").val());
            
             $.ajax({
                        url: class_cat.cons.send_pdf,  // URL de la aplicación Python
                        type: "POST",
                        data: formData,
                        contentType: false,  // No enviar cabeceras de tipo
                        processData: false,  // No procesar los datos
                        success: function(response) {
                            loading.end();
                            $('#resultados').show();
                            var obj=JSON.parse(response.resp);
                            $('#div_resultado_orig').html(obj.idioma_original);
                            $('#div_resultado_esp').html(obj.español_palabras);
                            $('#div_resultado_ent').html(obj.español_entidades);
                            //$('#div_resultado_biblat').html('equipo reutilizable, cooperativas, efectos ambientales, efectos sociales, gestión de residuos, inclución social, economía circular, justicia ambiental, calidad de vida');
                            $('#div_resultado_bib_exact').html(obj.biblat_exactas);
                            var biblat_aprox= '';
                            $.each(obj.biblat_sugerencias, function(i,val){
                                biblat_aprox += ('<b>' +  val.palabra + ': </b>'+val.aproximaciones+'<br>');
                            });
                            $('#div_resultado_bib_aprox').html(biblat_aprox);
                            //$('#div_resultado_bib_ent').html(obj.español_entidades);
                        },
                        error: function(xhr, status, error) {
                            $('#div_resultado_orig').html('Error al procesar el archivo');
                        }
                    });
             
            
            /*
            $.confirm({
                title: '',
                content: 'Se ingresarán a Biblat los documentos encontrados en el archivo seleccionado',
                buttons: {
                    cancelar: {
                            text: 'Cancelar',
                            //btnClass: 'btn-red',
                            action: function(){
                            }
                    },
                    aceptar: {
                            text: 'Aceptar',
                            btnClass: 'btn-warning',
                            action: function(){
                               var formData = new FormData();
                                formData.append("file", $("#archivo")[0].files[0]);
                                formData.append("revista", class_admin.var.revista[0].trim());
                                formData.append("base", class_admin.var.revista[1].trim());
                                formData.append("pais", class_admin.var.revista[6].trim());
                                formData.append("issn", class_admin.var.revista[5].trim());
                                formData.append("institucion_editora", class_admin.var.revista[8].trim());
                                formData.append("ciudad_editora", class_admin.var.revista[7].trim());
                                formData.append("disciplina", class_admin.var.revista[2].trim());

                                // Enviar el archivo a la aplicación Python
                                $.ajax({
                                    url: class_admin.cons.send_xml,  // URL de la aplicación Python
                                    type: "POST",
                                    data: formData,
                                    contentType: false,  // No enviar cabeceras de tipo
                                    processData: false,  // No procesar los datos
                                    success: function(response) {
                                        loading.end();
                                        $('#mensajeFin').html('<b>'+response+'</b>');
                                    },
                                    error: function(xhr, status, error) {
                                        $('#mensajeFin').html('Error al procesar el archivo');
                                    }
                                });
                            }
                    }
                }
            });
        
            */
        });
    }
};


$(class_cat.ready);

