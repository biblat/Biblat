class_totales = {
    var: {
        datos: null
    },

    initClient: function(){
        $.when(
            class_utils.getResource('/datos/totales_biblat')
        ).then(function(resp_totales){

            if(resp_totales[0] !== undefined){
                class_totales.var.datos = resp_totales[0];
                class_totales.mostrar_totales();
            }

            loading.end();
        });
    },

    ready: function(){
        loading.start();
        class_totales.initClient();
    },

    mostrar_totales: function(){

        var datos = class_totales.var.datos;

        $("#revistas_clase").html(
            class_totales.formato_numero(datos.revistas_clase)
        );

        $("#articulos_clase").html(
            class_totales.formato_numero(datos.articulos_clase)
        );

        $("#texto_completo_clase").html(
            class_totales.formato_numero(datos.texto_completo_clase)
        );


        $("#revistas_periodica").html(
            class_totales.formato_numero(datos.revistas_periodica)
        );

        $("#articulos_periodica").html(
            class_totales.formato_numero(datos.articulos_periodica)
        );

        $("#texto_completo_periodica").html(
            class_totales.formato_numero(datos.texto_completo_periodica)
        );


        $("#revistas_total").html(
            class_totales.formato_numero(datos.revistas_total)
        );

        $("#articulos_total").html(
            class_totales.formato_numero(datos.articulos_total)
        );

        $("#texto_completo_total").html(
            class_totales.formato_numero(datos.texto_completo_total)
        );
    },

    formato_numero: function(numero){

        if(numero === undefined || numero === null){
            numero = 0;
        }

        return Number(numero).toLocaleString('es-MX');
    }
};


$(class_totales.ready);