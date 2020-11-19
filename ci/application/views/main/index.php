<div id="carousel-biblat" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#carousel-biblat" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-biblat" data-slide-to="1"></li>
    <li data-target="#carousel-biblat" data-slide-to="2"></li>
    <li data-target="#carousel-biblat" data-slide-to="3"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
<!--    <div class="item active">
        {$svg}
    </div>-->
    <div class="item">
      <img class="img-responsive center-block" src="{base_url('img/slides/banners_02.jpg')}"/>
    </div>
    <div class="item active">
      <a href="{site_url('indicadores')}"><img class="img-responsive center-block" src="{base_url('img/slides/banners_03.jpg')}"/></a>
    </div>
    <div class="item">
      <a href="{site_url('frecuencias')}"><img class="img-responsive center-block" src="{base_url('img/slides/banners_04.jpg')}"/></a>
    </div>
  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-biblat" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#carousel-biblat" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div><!-- carousel-biblat -->

<div class="row" id="main-search">
    <div class="col-md-8 col-md-offset-2">{$template.partials.search}</div>
</div>
<div class="row" id="main-sections">
    <div class="col-md-6">
        <h3>{_('UN POCO DE NOSOTROS')}</h3>
        <p>{$biblat=_('Bibliografía Latinoamericana') _sprintf('%s es un portal especializado en revistas científicas y académicas publicadas en América Latina y el Caribe, que ofrece los siguientes servicios:','<span class="biblat"><acronym title="$biblat">Biblat</acronym></span>')}</p>
        <ul>
            <li>{$clase=_('Citas Latinoamericanas en Ciencias Sociales y Humanidades') $periodica=_('Índice de Revistas Latinoamericanas en Ciencias') _sprintf('Referencias bibliográficas y texto completo de los artículos y documentos publicados en más de 3,000 revistas indizadas en %s y %s.','<a href="http://alephv23.cichcu.unam.mx:8991/F/?func=find-b-0&local_base=cla01" target="_blank"><acronym title="$clase">CLASE</acronym></a>','<a href="http://alephv23.cichcu.unam.mx:8991/F/?func=find-b-0&local_base=per01" target="_blank"><acronym title="$periodica">PERIÓDICA</acronym></a>')}</li><br/>
            <li>{_sprintf('Visualización gráfica de indicadores extraídos de %s, %s, %s y de otras bases de datos.','<a href="http://alephv23.cichcu.unam.mx:8991/F/?func=find-b-0&local_base=cla01" target="_blank"><acronym title="$clase">CLASE</acronym></a>','<a href="http://alephv23.cichcu.unam.mx:8991/F/?func=find-b-0&local_base=per01" target="_blank"><acronym title="$periodica">PERIÓDICA</acronym></a>','<a href="http://www.scielo.org" target="_blank"><acronym title="Scientific Electronic Library Online">SciELO</acronym></a>')}</li><br/>
            <li>{_sprintf('Información sobre las %s de las revistas indizadas en %s , %s.','<a href="javascript:;">Políticas de acceso abierto</a>','<a href="http://alephv23.cichcu.unam.mx:8991/F/?func=find-b-0&local_base=cla01" target="_blank"><acronym title="$clase">CLASE</acronym></a>','<a href="http://alephv23.cichcu.unam.mx:8991/F/?func=find-b-0&local_base=per01" target="_blank"><acronym title="$periodica">PERIÓDICA</acronym></a>')}</li>
        </ul> 

        <p></p>
        <p class="text-right"><a class="leer_mas" href="{site_url('sobre-biblat')}">{_('Leer más')} <i class="fa fa-angle-double-right"></i></a></p>
    </div><!-- Un poco de nosotros -->
    <div class="col-md-6">
        <h3>{_('REVISTAS POR DISCIPLINA')}</h3>
        <div class="tagCloud"></div>
    </div><!-- Revistas por disciplina -->
    <div class="clearfix hidden-sm"></div>
    <div class="col-md-6">
        <h3>{_('REVISTA POR ORDEN ALFABÉTICO')}</h3>
        <div id="alfabetico">
            <p></p>
            <p class="text-center">
{foreach range('A', 'Z') i}
                <a class="abc" href="{$il=lower($i) site_url('indice/alfabetico/$il')}">{$i}</a>
{/foreach}
            </p>
            <p></p>
        </div>
    </div><!-- Revistas por ordern alfabético -->
    <div class="col-md-6">
        <h3>{_('REVISTAS POR PAÍS')}</h3>

        <div id="carousel-pais" class="carousel slide" data-ride="carousel">
          <!-- Wrapper for slides -->
          <div class="carousel-inner" role="listbox">
            <div class="item active">
                <a href="{site_url("indice/pais/internacional")}"><img class="img-responsive center-block" src="{base_url('img/america.jpg')}" title="{_('Internacional')}"></a>
                <div class="carousel-caption">{_('Internacional')}</div>
            </div>
{foreach $paises pais}
                <div class="item">
                    <a href="{site_url("indice/pais/$pais.paisRevistaSlug")}"><img class="img-responsive center-block" src="{base_url("img/$pais.paisRevistaSlug")}.jpg" title="{$pais.paisRevista}"></a>
                    <div class="carousel-caption">{$pais.paisRevista}</div>
                </div>
{/foreach}
          </div>

          <!-- Controls -->
          <a class="left carousel-control" href="#carousel-pais" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#carousel-pais" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
    </div><!-- Revistas por país -->
    <div class="clearfix hidden-sm"></div>
    <div class="col-md-6">
        <h3>{_('FRECUENCIAS (CLASE y PERIÓDICA)')}</h3>
        {$template.partials.frecuencias_accordion} 
    </div><!-- Frecuencias CLAPER -->
    <div class="col-md-6">
        <h3>{_('INDICADORES BIBLIOMÉTRICOS')}</h3>
        <div class="list-group list-main">
            <a class="list-group-item"href="{site_url('indicadores/indice-coautoria')}"><span class="fa fa-line-chart"></span> {_('Índice de coautoría')}</a>
            <a class="list-group-item"href="{site_url('indicadores/tasa-documentos-coautorados')}"><span class="fa fa-line-chart"></span> {_('Tasa de documentos coautorados')}</a>
            <a class="list-group-item"href="{site_url('indicadores/grado-colaboracion')}"><span class="fa fa-line-chart"></span> {_('Grado de colaboración (Índice de Subramanyan)')}</a>
            <a class="list-group-item"href="{site_url('indicadores/indice-colaboracion')}"><span class="fa fa-line-chart"></span> {_('Índice de colaboración (Índice de Lawani)')}</a>
            <a class="list-group-item"href="{site_url('indicadores/modelo-elitismo')}"><span class="fa fa-line-chart"></span> {_('Modelo de Elitismo (Price)')}</a>
            <a class="list-group-item"href="{site_url('indicadores/indice-densidad-documentos')}"><span class="fa fa-line-chart"></span> {_('Índice de densidad de documentos de Zakutina y Priyenikova')}</a>
            <a class="list-group-item"href="{site_url('indicadores/indice-concentracion')}"><span class="fa fa-line-chart"></span> {_('Índice de concentración temática (Pratt)')}</a>
            <a class="list-group-item"href="{site_url('indicadores/modelo-bradford-revista')}"><span class="fa fa-line-chart"></span> {_('Modelo de Bradford por revista')}</a>
            <a class="list-group-item"href="{site_url('indicadores/modelo-bradford-institucion')}"><span class="fa fa-line-chart"></span> {_('Modelo de Bradford (Productividad institucional)')}</a>
            <a class="list-group-item"href="{site_url('indicadores/productividad-exogena')}"><span class="fa fa-line-chart"></span> {_('Productividad exógena por título de revista')}</a>
			<a class="list-group-item"href="{site_url('indicadores/productividad-exogenah')}"><span class="fa fa-line-chart"></span> {_('Productividad exógena anual de una revista dividida por país')} <sup><span id="search-type" style="font-size: 10px" class="fa fa-certificate"> </span> <span style="font-size: 10px">Nuevo</span></a>
            <a class="list-group-item"href="{site_url('indicadores/frecuencias-institucion-documento')}"><span class="fa fa-line-chart"></span> {_('Documentos de una revista por institución de afiliación del autor')} <sup><span id="search-type" style="font-size: 10px" class="fa fa-certificate"> </span> <span style="font-size: 10px">Nuevo</span></a>
            <a class="list-group-item"href="{site_url('indicadores/frecuencias-institucion-documentoh')}"><span class="fa fa-line-chart"></span> {_('Documentos anuales de una revista por institución de afiliación del autor')} <sup><span id="search-type" style="font-size: 10px" class="fa fa-certificate"> </span> <span style="font-size: 10px">Nuevo</span></a>
            <a class="list-group-item"href="{site_url('indicadores/coautoria-pais')}"><span class="fa fa-line-chart"></span> {_('Representación de coautorías entre países')} <sup><span id="search-type" style="font-size: 10px" class="fa fa-certificate"> </span> <span style="font-size: 10px">Nuevo</span></a>
            <!--<a class="list-group-item"href="javascript:;"><span class="fa fa-line-chart"></span> {_('Regionalización de la producción institucional')}</a>-->
            <!--<a class="list-group-item"href="javascript:;"><span class="fa fa-line-chart"></span> {_('Coautoría según país de la institución de afiliación del autor')}</a>-->
        </div>
    </div><!-- Indicadores bibliometricos -->
    <div class="clearfix"></div>
    <div class="col-md-6">
        <h3>{_('INDICADORES SCIELO')}</h3>
        <div class="list-group list-main">
            <a class="list-group-item"href="{site_url('scielo/indicadores/distribucion-articulos-coleccion')}"><span class="fa fa-line-chart"></span> {_('Distribución de artículos por colección')}</a>
            <a class="list-group-item"href="{site_url('scielo/indicadores/distribucion-revista-coleccion')}"><span class="fa fa-line-chart"></span> {_('Distribución de revistas por colección')}</a>
            <a class="list-group-item"href="{site_url('scielo/indicadores/indicadores-generales-revista')}"><span class="fa fa-line-chart"></span> {_('Indicadores generales por revistas')}</a>
            <a class="list-group-item"href="{site_url('scielo/indicadores/citacion-articulos-edad')}"><span class="fa fa-line-chart"></span> {_('Distribución de artículos por edad del documento citado')}</a>
            <a class="list-group-item"href="{site_url('scielo/indicadores/citacion-articulos-tipo')}"><span class="fa fa-line-chart"></span> {_('Distribución de artículos por tipo del documento citado')}</a>
        </div>
    </div><!-- Indicadore SciELO -->
    <div class="col-md-6">
        <h3>{_('OTROS INDICADORES')}</h3>
        <img class="img-responsive center-block" src="{base_url('/img/indicadores.jpg')}" usemap="#Map" height="299" width="416">
            <map name="Map">
                <area shape="rect" coords="12,3,137,305" href="{site_url('bibliometria/indicadores-por-revista')}">
                <area shape="rect" coords="143,3,273,296" href="{site_url('conacyt')}">
                <area shape="rect" coords="282,2,407,298" href="javascript:;">
            </map>
    </div><!-- Otros indicadores -->
    <p></p>
</div>
