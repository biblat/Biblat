<script type='text/javascript' src='https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js'></script>
<script async src="https://badge.dimensions.ai/badge.js" charset="utf-8"></script>
<script type="text/javascript" src="//cdn.plu.mx/widget-popup.js"></script>
{if $links != ""}
    <div class="text-center">
      {$links}
    </div>
{/if}
      <table id="resultados" class="table table-striped table-hover">
      <tbody>
{foreach $resultados key resultado}
        <tr>
          <td>{$key}.-</td>
          <td>
                <div class="row">
                <div class="col-xs-12 col-md-9">
                    <span class="article-tittle">{$resultado.articuloLink}</span><br/>
                        {if $resultado.autoresHTML}
                                   {$resultado.autoresHTML}<br/>
                        {/if}
                        {if $resultado.institucionesHTML}
                                   {$resultado.institucionesHTML}<br/>
                        {/if}
                        {if $resultado.detalleRevista}
                                   {$resultado.detalleRevista}<br/>
                        {/if}
                        {if !$resultado.addRef}
                                   {$resultado.addRef}<br/>
                        {/if}
                        <br>
                </div>
                <div class="col-xs-12 col-md-3">
                    {if $resultado.doi}
                    <div style="display: flex; align-items: center; justify-content: center">
                        <div style="display: inline;" class='altmetric-embed'  data-badge-type='donut' data-link-target='_blank' data-doi='{$resultado.doi}' data-badge-popover='bottom' title="Altmetric"></div>
                        <div style="display: inline;">&nbsp;&nbsp;&nbsp;</div>
                        <div style="display: inline;"><span data-style="small_circle" class="__dimensions_badge_embed__" data-doi="{$resultado.doi}" data-legend="hover-bottom" title="Dimensions"></span></div>
                        <div style="display: inline;"><a href="https://plu.mx/plum/a/?doi={$resultado.doi}" class="plumx-plum-print-popup" data-size="medium" data-popup="bottom" title="PlumX"></a></div>
                    </div>
                    {/if}
                </div>
                </div>
          </td>
          <td class="nowrap text-right">
              {if $resultado.downloadLink}{$resultado.downloadLink}{/if} {$resultado.mendeleyLink}
          </td>
                </tr>
{/foreach}
      </tbody>
      </table>
{if $links != ""}
    <div class="text-center">
      {$links}
    </div>
{/if}