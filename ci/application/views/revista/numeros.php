<div class="page_title">
    <hr/>
    <h4>{$revista}</h4>
    <hr/>
</div>
<center>
<table style="border-spacing:2px;border-collapse:separate;">
    <th width="50px" style="text-align:center;background-color:#FF8000;min-width:100px;">Año</th>
    <th width="100px" style="text-align:center;background-color:#FF8000;min-width:100px;">Volumen</th>
    <th colspan="100" style="background-color:#FF8000;padding-left:20px;">Número</th>
    {foreach $numeros numero}
        <tr>
            <td style="text-align:center;background-color:#ddd">
                &nbsp;{$numero.anio}
            </td>
            <td style="text-align:center;background-color:#ddd">
                &nbsp;{$numero.vol}
            </td>
            {foreach $numero.num num}
            <td width="50px" style="text-align:center;background-color:#f5f5f5;min-width:100px;">
                &nbsp;{$num}
            </td>
            {/foreach}
        </tr>
    {/foreach}
</table>
</center>
