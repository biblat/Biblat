<style>

    .seccion-estadisticas {
        border: 1px solid #d8d8d8;
        border-radius: 4px;
        background-color: #ffffff;
        margin-bottom: 20px;
    }

    .seccion-estadisticas-header {
        background-color: #f5f5f5;
        border-bottom: 1px solid #d8d8d8;
        padding: 11px 15px;
        font-size: 16px;
    }

    .seccion-estadisticas-body {
        background-color: #ffffff;
        padding: 25px 45px 30px 45px;
    }

    .tabla-estadisticas {
        width: 100%;
        margin-bottom: 0;
        background-color: #ffffff;
    }

    .tabla-estadisticas thead th {
        background-color: #f5f5f5;
        border: 1px solid #dddddd;
        padding: 10px 12px;
        text-align: center;
        vertical-align: middle;
        font-weight: bold;
    }

    .tabla-estadisticas tbody td {
        border: 1px solid #dddddd;
        padding: 12px;
        vertical-align: middle;
    }

    .tabla-estadisticas .base {
        font-weight: bold;
        width: 20%;
    }

    .tabla-estadisticas .numero {
        text-align: center;
        font-size: 16px;
    }

    .tabla-estadisticas .fila-total td {
        background-color: #f5f5f5;
        font-weight: bold;
    }

</style>


<div class="seccion-estadisticas">

    <div class="seccion-estadisticas-header">
        <span>
            Números generales
        </span>
    </div>

    <div class="seccion-estadisticas-body">

        <div class="table-responsive">

            <table class="tabla-estadisticas">

                <thead>

                    <tr>

                        <th>
                            Base
                        </th>

                        <th>
                            Revistas
                        </th>

                        <th>
                            Artículos
                        </th>

                        <th>
                            Artículos con enlace a texto completo
                        </th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td class="base">
                            CLASE
                        </td>

                        <td
                            id="revistas_clase"
                            class="numero">
                            -
                        </td>

                        <td
                            id="articulos_clase"
                            class="numero">
                            -
                        </td>

                        <td
                            id="texto_completo_clase"
                            class="numero">
                            -
                        </td>

                    </tr>


                    <tr>

                        <td class="base">
                            PERIÓDICA
                        </td>

                        <td
                            id="revistas_periodica"
                            class="numero">
                            -
                        </td>

                        <td
                            id="articulos_periodica"
                            class="numero">
                            -
                        </td>

                        <td
                            id="texto_completo_periodica"
                            class="numero">
                            -
                        </td>

                    </tr>


                    <tr class="fila-total">

                        <td class="base">
                            TOTAL
                        </td>

                        <td
                            id="revistas_total"
                            class="numero">
                            -
                        </td>

                        <td
                            id="articulos_total"
                            class="numero">
                            -
                        </td>

                        <td
                            id="texto_completo_total"
                            class="numero">
                            -
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>

</div>