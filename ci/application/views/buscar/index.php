{if $resultados}
{if $search.disciplina != ""}
    <div class="page_title">
        <hr/>
        <h4>{_sprintf('<i>(%s documentos publicados en el área de <b>%s</b>)</i>', $search['total'], $search['disciplina'])}</h4>
        <hr/>
{else}
    <div class="page_title">
        <hr/>
        <h4>{_sprintf('<i>%s documentos publicados</i>', $search['total'])}
{if !$textoCompleto && $search.totalCompleto > 0}, {$atitle=_sprintf('mostrar %s resultados en texto completo', $search.totalCompleto) anchor("$paginationURL/texto-completo", _sprintf('<b>mostrar "%s" resultados en texto completo</b>', $search.totalCompleto), 'title="$atitle"')}{/if}
{if $textoCompleto}{_('en texto completo')}{/if}
		<br><br>
        <img src='/img/hidx.png' style='width: 50px; height: 50px;'> - Publicaciones del autor en Humanindex
        </h4>
      <hr/>
    </div>
{/if}
{$template.partials.view_article}
{else}
    <div class="page_title">
      <hr/>
      <h4>{_sprintf('No se encontraron resultados para la búsqueda por: "%s"', $search['slug'])}</h4>
      <hr/>
    </div>
{/if}
