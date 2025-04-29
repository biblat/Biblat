<div id="carousel-biblat" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <!--<ol class="carousel-indicators">-->
    <!--<li data-target="#carousel-biblat" data-slide-to="0" class="active"></li>-->
    <!--<li data-target="#carousel-biblat" data-slide-to="1"></li>-->
    <!--<li data-target="#carousel-biblat" data-slide-to="2"></li>-->
    <!--<li data-target="#carousel-biblat" data-slide-to="3"></li>-->
  <!--</ol>-->

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    <div id="aviso" style="height:80px;color:white;background-color:red;text-align: center; padding: 10px; font-weight: bold;font-size: 16px" class="item">
        <br>
        AVISO DE MANTENIMIENTO: jueves 1 de Agosto, a partir de las 7:00 y hasta las 9:00 horas.
    </div>
    <div id="primer" style="height:80px" class="item active">
       <a target="_blank" href="{base_url('archivos/pdf/manual_indizacion_ojs_2ed.pdf')}"><img class="img-responsive center-block" src="{base_url('img/slides/banner-MANUAL.svg')}"/></a>
    </div>
    <div style="height:80px" class="item">
       <a target="_blank" href="{site_url('sobre-metametrics')}"><img class="img-responsive center-block" src="{base_url('img/slides/banner-metametrics.jpg')}"/></a>
    </div>
    <div style="height:80px" class="item">
       <a target="_blank" href="{site_url('documentos/multimedia#indicadores')}"><img class="img-responsive center-block" src="{base_url('img/slides/Indicadores-BIBLAT2.jpg')}"/></a>
    </div>
    <div style="height:80px" class="item">
        <a target="_blank" href="{site_url('postular-revista/metametrics')}"><img class="img-responsive center-block" src="{base_url('img/slides/banner-biblat-2.svg')}"/></a>
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
    <div class="col-md-10 col-md-offset-1">{$template.partials.search}</div>
</div>
<div class="row" id="main-sections">
    <div class="col-md-6" hidden>
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
    <div class="col-md-6" hidden>
        <h3>{_('REVISTAS POR DISCIPLINA')}</h3>
        <div class="tagCloud"></div>
    </div><!-- Revistas por disciplina -->
    <div class="clearfix hidden-sm"></div>
	<!-- Mapa -->
    <div class="row">
    <div class="col-md-8" style="">
        <br>
        <br>
        <div id="mapa-biblat" class="chart_data"></div>
    </div>
    <div class="col-md-4" style="" id="div_tabla">
        <center><br><br><div class="fa-2x" style="color:#ff8000"><i class="fa fa-refresh fa-spin"></i></div></center>
    </div>
    <!--<div class="col-md-3" style="">Documentos</div>-->
    </div>
    <div class="row">
        <div class="col-md-6" id="div_charttreemap">

        </div>
        <div class="col-md-6" id="div_chartcolumn">

        </div>
    </div>
    
    <div class="col-md-12">
        <h3>{_('REVISTA POR ORDEN ALFABÉTICO')}</h3>
        <div id="alfabetico">
            <p></p>
            <p class="text-center">
{foreach range('A', 'Z') i}
                <a target="_blank" class="abc" href="{$il=lower($i) site_url('bibliometria/indicadores-por-revista/$il')}">{$i}</a>
{/foreach}
            </p>
            <p></p>
        </div>
    </div><!-- Revistas por ordern alfabético -->
    <div class="col-md-6" hidden>
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




    <div class="col-md-12">
        <h3>{_('INDICADORES BIBLIOMÉTRICOS')}</h3>
	</div>	  
	<div class="col-md-6">					  
        <div class="list-group list-main">
            <a target="_blank" class="list-group-item"href="{site_url('indicadores/indice-coautoria')}"><span class="fa fa-line-chart"></span> {_('Índice de coautoría')}<br><p style="font-size:12px;margin-left:25px;margin-bottom:0px"><i>{_('Promedio de autores por artículo en la revista')}</i></p></a>
            <a target="_blank" class="list-group-item"href="{site_url('indicadores/modelo-elitismo')}"><span class="fa fa-line-chart"></span> {_('Modelo de Elitismo')}<br><p style="font-size:12px;margin-left:25px;margin-bottom:0px"><i>{_('Cantidad de autores más productivos por revista')}</i></p></a>
            <a target="_blank" class="list-group-item"href="{site_url('indicadores/indice-densidad-documentos')}"><span class="fa fa-line-chart"></span> {_('Índice de densidad de documentos')}<br><p style="font-size:12px;margin-left:25px;margin-bottom:0px"><i>{_('Promedio de artículos por número publicados por año')}</i></p></a>
            <a target="_blank" class="list-group-item"href="{site_url('indicadores/indice-concentracion')}"><span class="fa fa-line-chart"></span> {_('Índice de concentración temática')}<br><p style="font-size:12px;margin-left:25px;margin-bottom:0px"><i>{_('Distribución decreciente de las revistas considerando su grado de concentración temática')}</i></p></a>
			<a target="_blank" class="list-group-item"href="{site_url('indicadores/modelo-bradford-revista')}"><span class="fa fa-line-chart"></span> {_('Modelo de Bradford (Revista)')}<br><p style="font-size:12px;margin-left:25px;margin-bottom:0px"><i>{_('Distribución de artículos por revista')}</i></p></a>																																																																										   
            <a target="_blank" class="list-group-item"href="{site_url('indicadores/modelo-bradford-institucion')}"><span class="fa fa-line-chart"></span> {_('Modelo de Bradford (Institucional)')}<br><p style="font-size:12px;margin-left:25px;margin-bottom:0px"><i>{_('Distribución de artículos por instituciones')}</i></p></a>
		</div>																																						   
	</div>
    <div class="col-md-6">
		<div class="list-group list-main">
            <a target="_blank" class="list-group-item"href="{site_url('indicadores/productividad-exogena')}"><span class="fa fa-line-chart"></span> {_('Tasa de autoría exógena por revista')}<br><p style="font-size:12px;margin-left:25px;margin-bottom:0px"><i>{_('Distribución decreciente de las revistas considerando la proporción de autores extranjeros')}</i></p></a>
			<a target="_blank" class="list-group-item"href="{site_url('indicadores/productividad-exogenah')}"><span class="fa fa-line-chart"></span> {_('Tasa anual de autoría exógena dividida por país')} <sup><span style="font-size: 10px" class="fa fa-certificate"> </span> <span style="font-size: 10px">Nuevo</span></sup><br><p style="font-size:12px;margin-left:25px;margin-bottom:0px"><i>{_('Proporción anual total de autores extranjeros dividida por país')}</i></p></a>
            <a target="_blank" class="list-group-item"href="{site_url('indicadores/frecuencias-institucion-documento')}"><span class="fa fa-line-chart"></span> {_('Documentos de una revista por institución')} <sup><span style="font-size: 10px" class="fa fa-certificate"> </span> <span style="font-size: 10px">Nuevo</span></sup><br><p style="font-size:12px;margin-left:25px;margin-bottom:0px"><i>{_('Proporción de la participación de instituciones en los documentos de la revista')}</i></p></a>
            <a target="_blank" class="list-group-item"href="{site_url('indicadores/frecuencias-institucion-documentoh')}"><span class="fa fa-line-chart"></span> {_('Documentos anuales de una revista por institución')} <sup><span style="font-size: 10px" class="fa fa-certificate"> </span> <span style="font-size: 10px">Nuevo</span></sup><br><p style="font-size:12px;margin-left:25px;margin-bottom:0px"><i>{_('Participación institucional anual en los documentos publicados por la revista')}</i></p></a>
            <a target="_blank" class="list-group-item"href="{site_url('indicadores/coautoria-pais')}"><span class="fa fa-line-chart"></span> {_('Coautoría entre países')} <sup><span style="font-size: 10px" class="fa fa-certificate"> </span> <span style="font-size: 10px">Nuevo</span></sup><br><p style="font-size:12px;margin-left:25px;margin-bottom:0px"><i>{_('Colaboración entre autores según el país de afiliación institucional en una revista')}</i></p></a>
        </div>
    </div><!-- Indicadores bibliometricos -->
	
	
	
	
	
	
	
	<div class="col-md-6" hidden="">
        <h3>{_('FRECUENCIAS (CLASE y PERIÓDICA)')}</h3>
        {$template.partials.frecuencias_accordion} 
    </div><!-- Frecuencias CLAPER -->
    
    <div class="col-md-12">
        <h3>{_('FRECUENCIAS POR INSTITUCIÓN')}</h3>
    </div><!-- Frecuencias CLAPER -->
    
    <!--Tabla de frecuencias-->
        <div class="row" id="gridTable">
            <div class="col-md-4" style="padding-left: 30px" >
                <div id="div_tabla_frec"></div>
            </div>

            <div class="col-md-8">

                <div class="col-md-12 page_title" style="height:150px" id="subtitulo">

                </div>

                <div class="col-md-6" style="">
                    <div id="div_tabla_autor"></div>
                </div>

                <div class="col-md-6" style="">
                    <div id="div_tabla_coautoria"></div>
                </div>

            </div>

            <div class="col-md-8"></div>
        </div>
        <div class="row">
            <br>
        </div>
        <div class="row">
            <div class="col-md-2" style="font-size:11px;padding-left: 30px" id="div_tablasun"></div>
            <div class="col-md-5" style="height: 400px" id="div_chartcolumn_pais"></div>
            <div class="col-md-5" style="" id="div_chartsun"></div>
        </div>
    <!--Tabla de frecuencias-->													
    <div class="clearfix" hidden></div>
    <div class="col-md-6" hidden>
        <h3>{_('INDICADORES SCIELO')}</h3>
        <div class="list-group list-main">
            <a class="list-group-item"href="{site_url('scielo/indicadores/distribucion-articulos-coleccion')}"><span class="fa fa-line-chart"></span> {_('Distribución de artículos por colección')}</a>
            <a class="list-group-item"href="{site_url('scielo/indicadores/distribucion-revista-coleccion')}"><span class="fa fa-line-chart"></span> {_('Distribución de revistas por colección')}</a>
            <a class="list-group-item"href="{site_url('scielo/indicadores/indicadores-generales-revista')}"><span class="fa fa-line-chart"></span> {_('Indicadores generales por revistas')}</a>
            <a class="list-group-item"href="{site_url('scielo/indicadores/citacion-articulos-edad')}"><span class="fa fa-line-chart"></span> {_('Distribución de artículos por edad del documento citado')}</a>
            <a class="list-group-item"href="{site_url('scielo/indicadores/citacion-articulos-tipo')}"><span class="fa fa-line-chart"></span> {_('Distribución de artículos por tipo del documento citado')}</a>
        </div>
    </div><!-- Indicadore SciELO -->
    <div class="col-md-6" hidden>
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
