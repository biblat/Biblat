<script type='text/javascript' src='https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js'></script>
<script src="https://badge.dimensions.ai/badge.js" charset="utf-8"></script>
<script type="text/javascript" src="//cdn.plu.mx/widget-popup.js"></script>
<script type="application/javascript" src="https://cdn.scite.ai/badge/scite-badge-latest.min.js"></script>
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
                <div class="col-xs-12 col-md-12">
                    {if $resultado.doi}
                    <div class="col-xs-12 col-md-6">
                        <div style="display: flex; align-items: center; justify-content: center">
							<div style="display: inline;" class='altmetric-embed'  data-badge-type='medium-donut' data-link-target='_blank' data-doi='{$resultado.doi}' data-badge-popover='bottom' title="Altmetric"></div>
							<div style="display: inline;">&nbsp;&nbsp;&nbsp;</div>
							<div style="display: inline;"><span data-style="medium_circle" class="__dimensions_badge_embed__" data-doi="{$resultado.doi}" data-legend="hover-bottom" title="Dimensions"></span></div>
							<div style="display: inline;"><a href="https://plu.mx/plum/a/?doi={$resultado.doi}" class="plumx-plum-print-popup" data-size="big" data-popup="bottom" title="PlumX"></a></div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-6">
                        <div style="display: flex; align-items: center; justify-content: center">
							<div style="display: inline;"><div  class="scite-badge" data-doi="{$resultado.doi}" data-layout="vertical" data-show-zero='false' data-tally-show='true' data-show-labels='true' data-section-tally-show='false' data-small='true' data-tooltip-placement="bottom"/></div></div>
							<div style="display: inline;"><div class="scite-badge" data-doi="{$resultado.doi}" data-show-zero='false' data-tally-show='false' data-section-tally-show='true' data-show-labels='true' data-section-tally-layout='vertical' data-chart-type='donut' data-small='true' data-tooltip-placement="bottom"></div></div>
                        </div>
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