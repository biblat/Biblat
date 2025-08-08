{if $articulo}
<div itemscope itemtype="http://schema.org/Article">
	<table class="table table-striped {if $ajax}articulo{/if}" {if $mail} border="1" style="border-collapse:collapse; width:650px;"{/if}>
{if !$mai}
		<caption class="text-center"> 
			{if $ajax}{$articulo.articulo}{/if}
			<div class="addthis_toolbox addthis_default_style center-block" addthis:url="{site_url("revista/$articulo.revistaSlug/articulo/$articulo.articuloSlug")}" addthis:title="{$articulo.articulo}">
				<a class="addthis_button_mendeley" style="cursor:pointer"></a>
				<a class="addthis_button_facebook" style="cursor:pointer"></a>
				<a class="addthis_button_twitter" style="cursor:pointer"></a>
				<a class="addthis_button_email" style="cursor:pointer"></a>
				<a class="addthis_button_print" style="cursor:pointer"></a>
				<a class="addthis_button_compact"></a>
				<a class="addthis_counter addthis_bubble_style"></a>
			</div>
			<br/>
		</caption>
{/if}
		<tbody>
				<tr {if !$mail}style="display:none;"{/if}>
					<td class="nowrap"><strong>{_('Título del documento:')}</strong></td>
					<td><a href="{site_url("revista/$articulo.revistaSlug/articulo/$articulo.articuloSlug")}" title="{$articulo.revista}"><span itemprop="name">{$articulo.articulo}</span></a></td>
				</tr>
{if $articulo.revista}
				<tr>
					<td class="nowrap"><strong>{_('Revista:')}</strong></td>
					<td><a href="{site_url("revista/$articulo.revistaSlug")}" title="{$articulo.revista}">{$articulo.revista}</a></td>
				</tr>
{/if}
				<tr>
					<td class="nowrap"><strong>{_('Base de datos:')}</strong></td>
					<td>{$articulo.database}</td>
				</tr>
				<tr>
					<td class="nowrap"><strong>{_('Número de sistema:')}</strong></td>
					<td>{$articulo.sistema}</td>
				</tr>
{if $articulo.issn}
				<tr>
					<td class="nowrap"><strong>{_('ISSN:')}</strong></td>
					<td>{$articulo.issn}</td>
				</tr>
{/if}
{if $articulo.autoresHTML}
				<tr>
					<td class="nowrap"><strong>{_('Autores:')}</strong></td>
					<td>{$articulo.autoresHTML}</td>
				</tr>
{/if}
{if $articulo.institucionesHTML}
				<tr>
					<td class="nowrap"><strong>{_('Instituciones:')}</strong></td>
					<td>{$articulo.institucionesHTML}</td>
				</tr>
{/if}
{if $articulo.anioRevista}
				<tr>
					<td class="nowrap"><strong>{_('Año:')}</strong></td>
					<td> <span itemprop="datePublished">{$articulo.anioRevista}</span></td>
				</tr>
{/if}
{if $articulo.periodo}
				<tr>
					<td class="nowrap"><strong>{_('Periodo:')}</strong></td>
					<td>{ucname($articulo.periodo)}</td>
				</tr>
{/if}
{if $articulo.volumen}
				<tr>
					<td class="nowrap"><strong>{_('Volumen:')}</strong></td>
					<td>{$articulo.volumen}</td>
				</tr>
{/if}
{if $articulo.numero}
				<tr>
					<td class="nowrap"><strong>{_('Número:')}</strong></td>
					<td>{$articulo.numero}</td>
				</tr>
{/if}
{if $articulo.paginacion}
				<tr>
					<td class="nowrap"><strong>{_('Paginación:')}</strong></td>
					<td><span itemprop="pageStart">{$articulo.paginacionFirst}</span>{if $articulo.paginacionLast}-<span itemprop="pageEnd">{$articulo.paginacionLast}</span>{/if}</td>
				</tr>
{/if}
{if $articulo.paisRevista}
				<tr>
					<td class="nowrap"><strong>{_('País:')}</strong></td>
					<td>{$articulo.paisRevista}</td>
				</tr>
{/if}
{if $articulo.idioma}
				<tr>
					<td class="nowrap"><strong>{_('Idioma:')}</strong></td>
					<td>{$articulo.idioma}</td>
				</tr>
{/if}
{if $articulo.tipoDocumento}
				<tr>
					<td class="nowrap"><strong>{_('Tipo de documento:')}</strong></td>
					<td>{$articulo.tipoDocumento}</td>
				</tr>
{/if}
{if $articulo.enfoqueDocumento}
				<tr>
					<td class="nowrap"><strong>{_('Enfoque:')}</strong></td>
					<td>{$articulo.enfoqueDocumento}</td>
				</tr>
{/if}
{if $articulo.resumenHTML}
			{foreach $articulo.resumenHTML resumen}
				<tr>
					<td class="nowrap"><strong>{$resumen.title}</strong></td>
					<td class="text-justify"><span itemprop="description">{$resumen.body}</span></td>
				</tr>
			{/foreach}
{/if}
{if $articulo.disciplinasHTML}
				<tr>
					<td class="nowrap"><strong>{_('Disciplinas:')}</strong></td>
					<td>{$articulo.disciplinasHTML}</td>
				</tr>
{/if}
{if $articulo.palabrasClaveHTML}
				<tr>
					<td class="nowrap"><strong>{_('Palabras clave:')}</strong></td>
					<td>{$articulo.palabrasClaveHTML}</td>
				</tr>
{/if}
{if $articulo.keywordHTML}
				<tr>
					<td class="nowrap"><strong>{_('Keyword:')}</strong></td>
					<td>{$articulo.keywordHTML}</td>
				</tr>
{/if}
{if $articulo.url}
				<tr>
					<td class="nowrap"><strong>{_('Texto completo:')}</strong></td>
					<td>
{foreach $articulo.url url}
{if is_array($url)}
						<a href="{$url['u']}" target="_blank">{$url['y']}</a>
{else}
						<a href="{$url}" target="_blank">{$url}</a>
{/if}
{/foreach}
					</td>
				</tr>
{elseif !$mail AND ! $articulo.url}
				<tr id="solicitudDocumento">
					<td colspan="2"><b>{_('Solicitud del documento')}</b> <span id="sd-enable" class="fa fa-caret-right "></span> <span id="sd-disable" class="fa fa-caret-down "></span></td>
				</tr>
				<tr class="solicitudDocumento">
					<td colspan="2">
						{if strtotime('now') > strtotime('2015-06-26 23:59:59.0') AND strtotime('now') < strtotime('2015-07-27')}
						<p class="temporal">{_('Debido al período vacacional, el servicio de solicitud de documentos se suspenderá a partir del día 26 de junio de 2015 y se reanudará el día 27 de julio de 2015.')}</p>
						{else}
						<!--form id="formSolicitudDocumento" action="{site_url('revista/solicitud/documento')}" method="POST" class="contacto"-->
                        <form id="formSolicitudDocumento2" method="POST" class="contacto">
							<fieldset>
								<b>{_('Nota:')}</b> {_('El envío del documento tiene costo.')}<br/><br/>
								<label>{_('Nombre')}</label><br/>
								<input class="form-control" type="text" name="from" required data-msg-required="{_('El nombre es requerido')}"/><br/>
								<label>{_('Dirección de correo electrónico')}</label><br/>
								<input class="form-control" type="email" name="email" placeholder="me@domain.com" required data-msg-required="{_('El correo electrónico es requerido')}" title="{_('Por favor, proporciona un correo electrónico válido')}"/><br/>
								<label>{_('Institución')}</label><br/>
								<input class="form-control" type="text" name="instituto" required data-msg-required="{_('La institución es requerida')}"/><br/>
								<label>{_('Teléfono')}</label><br/>
								<input class="form-control" type="text" name="telefono"/><br/>
								<input type="hidden" name="database" value="{$articulo.database}"/>
								<input type="hidden" name="sistema" value="{$articulo.sistema}"/>
								<input type="hidden" name="revista" value="{$articulo.revistaSlug}"/>
								<input type="hidden" name="articulo" value="{$articulo.articuloSlug}"/>
								<input type="hidden" name="url" value="{current_url()}"/>
								<div class="text-justify">
								{_('Los documentos originales pueden ser consultados en el Departamento de Información y Servicios Documentales, ubicado en el Anexo de la Dirección General de Bibliotecas (DGB), circuito de la Investigación Científica a un costado del Auditorio Nabor Carrillo, zona de Institutos entre Física y Astronomía. Ciudad Universitaria UNAM.')} <a id="showmap" href="javascript:;">{_('Ver mapa')}</a><br/><img id="mapa-anexo" style="display:none" src="{base_url('img/mapa-anexo.jpg')}" border="0" width="100%"/>{_('Mayores informes: Departamento de Información y Servicios Documentales, Tels. (5255) 5622-3960, 5622-3964, e-mail: sinfo@dgb.unam.mx, Horario: Lunes a viernes (8 a 16 hrs.)')}<br/><br/></div>
								<div class="text-center">
								<div id='recaptcha'>{$recaptcha->render()}</div>
								<input id='enviar_solicitud' class="fa btn btn-default" type="button" value="{_('Enviar')}   &#xf0e0;"/>
                                <br><br>
								<div id="resultado-solicitud"></div>
								</div>
								
							</fieldset>
						</form>
						{/if}
					</td>
				</tr>
{/if}
		</tbody>
	</table>
</div>
{/if}