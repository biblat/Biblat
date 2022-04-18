<div class="page_title">
    <hr/>
    <h4>{$revista}</h4>
    <hr/>
</div>
<center>
<table>
    <th width="50px" style="text-align:center;background-color:#FF8000">Año</th>
    <th width="100px" style="text-align:center;background-color:#FF8000">Volumen</th>
    <th colspan="100" style="background-color:#FF8000">Número</th>
    {foreach $numeros numero}
        <tr>
            <td style="text-align:center;background-color:#ddd">
                &nbsp;{$numero.anio}
            </td>
            <td style="text-align:center;background-color:#ddd">
                &nbsp;{$numero.vol}
            </td>
            {foreach $numero.num num}
            <td width="50px" style="background-color:#f5f5f5">
                &nbsp;{$num}
            </td>
            {/foreach}
        </tr>
    {/foreach}
</table>
</center>
