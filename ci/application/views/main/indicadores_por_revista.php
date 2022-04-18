<div class="text-center">
	<nav>
	  <ul class="pagination hidden-xs hidden-sm">
{foreach range('A', 'Z') i}	  
		<li {if $i == $letra}class="active" {/if}><a href="{$il=lower($i) site_url('bibliometria/indicadores-por-revista/$il')}">{$i}</a></li>
{/foreach}
	  </ul>
	  {$alpha_links}
	</nav>
</div>
<div class="panel-group" id="accordion">
	<div class="panel panel-default">
        <div class="panel-heading">
          <h5 class="panel-title">
              <div style="display:inline-block;width:70px;"><b>No.</b></div><b>Revista</b><span style="float:right;"><div style="display:inline-block;width:100px;"><b>Números</b></div><b>Documentos</b></span>
          </h5>
        </div>
    </div>								 		  
{foreach $revistas key revista}
	<div class="panel panel-default">
	    <div class="panel-heading">
	      <h5 class="panel-title">
	        {if $revista.disciplinaSlug}<a data-toggle="collapse" data-parent="#accordion" href="#{$revista.revistaSlug}">{/if}
                    <div style="display:inline-block;width:70px;">{$key + 1}</div> {$revista.revista} {if $revista.disciplinaSlug}<sup><span class="fa fa-pie-chart"></span></sup>{/if}
	        {if $revista.disciplinaSlug}</a>{/if}
                <span style="float:right;">
                    <div style="display:inline-block;width:100px;"><b><a class="numeros" style="color:#555;" onMouseOver="this.style.cssText='color: #ff8000'"  onMouseOut="this.style.cssText='color: #555'" href="{site_url('revista/$revista.revistaSlug/numeros')}"><span class="fa fa-table"></span></a></b></div>
                    <div style="display:inline-block;width:50px;text-align:right;">
                        <a class="enlace" style="color:#ff8000" href="{site_url('revista/$revista.revistaSlug')}" title="{$revista.revista}">{number_format($revista.articulos)}</a>
                    </div>
                </span>
	      </h5>
	    </div>
	    <div id="{$revista.revistaSlug}" class="panel-collapse collapse">
	    	<ul class="list-group">
{if $revista.coautoriapricezakutina}
				<li class="list-group-item"><a href="{site_url('indicadores/indice-coautoria/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><span class="fa fa-line-chart"></span> {_('Índice de coautoría')}</a>&nbsp;
                                    <a class="manual" href="#co-{$revista.revistaSlug}"><span class="fa fa fa-code"></span><b>Ver</b> enlace</a>
                                </li>
				<div id="manual" style="display:none">
                                    <div id="co-{$revista.revistaSlug}">
                                    <div class="page_title">
                                      <hr/>
                                      <h4>{_('Índice de coautoría')}</h4>
                                      <hr/>
                                    </div>
				    <div class="form-group">
  					<label for="comment">{_('Código HTML')}</label>
					<textarea class="form-control codehtml" rows="10" readonly style="resize: none; height: 50px"><div style="width:200px"><a href="{site_url('indicadores/indice-coautoria/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><img src="{site_url('indicadores/indice-coautoria/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug/preview.png')}"></a></div></textarea>
				    </div>
                                    <button class="btn copy-code">
                                    <div id="code">Copiar código</div>
                                    </button>
				    </div>
                                </div>
				<li class="list-group-item"><a href="{site_url('indicadores/modelo-elitismo/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><span class="fa fa-line-chart"></span> {_('Modelo de Elitismo')}</a></li>
				<li class="list-group-item"><a href="{site_url('indicadores/indice-densidad-documentos/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><span class="fa fa-line-chart"></span> {_('Índice de densidad de documentos')}</a></li>
{/if}
{if $revista.subramayan}
				<!--li class="list-group-item"><a href="{site_url('indicadores/grado-colaboracion/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><span class="fa fa-line-chart"></span> {_('Grado de colaboración (Índice Subramanyan)')}</a></li-->
{/if}
{if $revista.tasalawani}
				<!--li class="list-group-item"><a href="{site_url('indicadores/tasa-documentos-coautorados/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><span class="fa fa-line-chart"></span> {_('Tasa de documentos coautorados')}</a></li-->
				<!--li class="list-group-item"><a href="{site_url('indicadores/indice-colaboracion/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><span class="fa fa-line-chart"></span> {_('Índice de colaboración (Índice de Lawani)')}</a></li-->
{/if}
{if $revista.generalesrevista}
				<!--li class="list-group-item"><a href="{site_url('scielo/indicadores/indicadores-generales-revista/coleccion/$revista.networkSlug/revista/$revista.revistaSlug')}"><span class="fa fa-line-chart"></span><span class="bl-scielo"></span> {_('Indicadores generales por revista')}</a></li-->
{/if}
{if $revista.networkjournaldistribution}
				<!--li class="list-group-item"><a href="{site_url('scielo/indicadores/distribucion-articulos-coleccion/coleccion/$revista.networkSlug/revista/$revista.revistaSlug')}"><span class="fa fa-line-chart"></span><span class="bl-scielo"></span> {_('Distribución de artículos por colección y revista')}</a></li-->
{/if}
{foreach $revista.agedocjournalcitation edad}
				<!--li class="list-group-item"><a href="{site_url('scielo/indicadores/citacion-articulos-edad/edad/$edad/revista/$revista.revistaSlug')}"><span class="fa fa-line-chart"></span><span class="bl-scielo"></span> {_sprintf('Distribución de artículos según edad del documento de %s años y revista citante', '<b>$edad</b>')}</a></li-->
{/foreach}
{foreach $revista.doctypejournalcitation tipok tipov}
				<!--li class="list-group-item"><a href="{site_url('scielo/indicadores/citacion-articulos-tipo/tipo-documento/$tipok/revista/$revista.revistaSlug')}"><span class="fa fa-line-chart"></span><span class="bl-scielo"></span> {_sprintf('Distribución de artículos done el tipo de documento citado es %s y revista citante', '<b>$tipok</b>')}</a></li-->
{/foreach}
{if $revista.disciplinaSlug}							
				<li class="list-group-item"><a href="{site_url('indicadores/productividad-exogena/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><span class="fa fa-line-chart"></span> {_('Tasa de autoría exógena por revista')}</a>&nbsp;
                                    <a class="manual" href="#tae-{$revista.revistaSlug}"><span class="fa fa fa-code"></span><b>Ver</b> enlace</a>
                                </li>
								<li class="list-group-item"><a href="{site_url('indicadores/productividad-exogenah/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><span class="fa fa-line-chart"></span> {_('Tasa anual de autoría exógena dividida por país')}</a>&nbsp;
                                    <a class="manual" href="#taeh-{$revista.revistaSlug}"><span class="fa fa fa-code"></span><b>Ver</b> enlace</a>
                                </li>																																																																																																		  									 
				<li class="list-group-item"><a href="{site_url('indicadores/indice-concentracion/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><span class="fa fa-line-chart"></span> {_('Índice de concentración temática')}</a>&nbsp;
                                    <a class="manual" href="#ic-{$revista.revistaSlug}"><span class="fa fa fa-code"></span><b>Ver</b> enlace</a>
                                </li>
				<li class="list-group-item"><a href="{site_url('indicadores/frecuencias-institucion-documento/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><span class="fa fa-line-chart"></span> {_('Documentos de una revista por institución')}</a>&nbsp;
                                    <a class="manual" href="#fid-{$revista.revistaSlug}"><span class="fa fa fa-code"></span><b>Ver</b> enlace</a>
                                </li>
								<li class="list-group-item"><a href="{site_url('indicadores/frecuencias-institucion-documentoh/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><span class="fa fa-line-chart"></span> {_('Documentos anuales de una revista por institución')}</a>&nbsp;
                                    <a class="manual" href="#fidh-{$revista.revistaSlug}"><span class="fa fa fa-code"></span><b>Ver</b> enlace</a>
                                </li>																																																																	  																																				  									 
                                <div style="display:none">
                                    <div id="fid-{$revista.revistaSlug}">
                                    <div class="page_title">
                                      <hr/>
                                      <h4>{_('Documentos de una revista por institución')}</h4>
                                      <hr/>
                                    </div>
				    <div class="form-group">
  					<label for="comment">{_('Código HTML')}</label>
					<textarea class="form-control codehtml" rows="10" readonly style="resize: none; height: 50px"><div style="width:200px"><a href="{site_url('indicadores/frecuencias-institucion-documento/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><img src="{site_url('indicadores/frecuencias-institucion-documento/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug/preview.png')}"></a></div></textarea>
				    </div>
                                    <button class="btn copy-code">
                                    <div id="code">Copiar código</div>
                                    </button>
                                    </div>
                                </div>
								<div style="display:none">
                                    <div id="fidh-{$revista.revistaSlug}">
                                    <div class="page_title">
                                      <hr/>
                                      <h4>{_('Documentos anuales de una revista por institución')}</h4>
                                      <hr/>
                                    </div>
				    <div class="form-group">
  					<label for="comment">{_('Código HTML')}</label>
					<textarea class="form-control codehtml" rows="10" readonly style="resize: none; height: 50px"><div style="width:200px"><a href="{site_url('indicadores/frecuencias-institucion-documentoh/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><img src="{site_url('indicadores/frecuencias-institucion-documentoh/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug/preview.png')}"></a></div></textarea>
				    </div>
                                    <button class="btn copy-code">
                                    <div id="code">Copiar código</div>
                                    </button>
                                    </div>
                                </div>										   
				<div style="display:none">
                                    <div id="tae-{$revista.revistaSlug}">
                                    <div class="page_title">
                                      <hr/>
                                      <h4>{_('Tasa de autoría exógena por revista')}</h4>
                                      <hr/>
                                    </div>
				    <div class="form-group">
  					<label for="comment">{_('Código HTML')}</label>
					<textarea class="form-control codehtml" rows="10" readonly style="resize: none; height: 50px"><div style="width:200px"><a href="{site_url('indicadores/productividad-exogena/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><img src="{site_url('indicadores/productividad-exogena/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug/preview.png')}"></a></div></textarea>
				    </div>
                                    <button class="btn copy-code">
                                    <div id="code">Copiar código</div>
                                    </button>
                                    </div>
                                </div>
								<div style="display:none">
                                    <div id="taeh-{$revista.revistaSlug}">
                                    <div class="page_title">
                                      <hr/>
                                      <h4>{_('Tasa anual de autoría exógena dividida por país')}</h4>
                                      <hr/>
                                    </div>
				    <div class="form-group">
  					<label for="comment">{_('Código HTML')}</label>
					<textarea class="form-control codehtml" rows="10" readonly style="resize: none; height: 50px"><div style="width:200px"><a href="{site_url('indicadores/productividad-exogenah/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><img src="{site_url('indicadores/productividad-exogenah/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug/preview.png')}"></a></div></textarea>
				    </div>
                                    <button class="btn copy-code">
                                    <div id="code">Copiar código</div>
                                    </button>
                                    </div>
                                </div>						  
				<div style="display:none">
                                    <div id="ic-{$revista.revistaSlug}">
                                    <div class="page_title">
                                      <hr/>
                                      <h4>{_('Índice de concentración temática')}</h4>
                                      <hr/>
                                    </div>
				    <div class="form-group">
  					<label for="comment">{_('Código HTML')}</label>
					<textarea class="form-control codehtml" rows="10" readonly style="resize: none; height: 50px"><div style="width:200px"><a href="{site_url('indicadores/indice-concentracion/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug')}"><img src="{site_url('indicadores/indice-concentracion/disciplina/$revista.disciplinaSlug/revista/$revista.revistaSlug/preview.png')}"></a></div></textarea>
				    </div>
                                    <button class="btn copy-code">
                                    <div id="code">Copiar código</div>
                                    </button>
                                    </div>
                                </div>
{/if}	 
			</ul>
		</div>
	</div>
{/foreach}
</div>
<span style="float:right; font-size:16px">Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{number_format($registrosTotalArticulos)}</span>
<br/>
<br/>																																							
<br/>
