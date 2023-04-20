<!DOCTYPE html>
<html lang="en">
    <head>
        <title>{$template.title}</title>
        <meta http-equiv="Expires" content="0">
        <meta http-equiv="Last-Modified" content="0">
        <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
        <meta http-equiv="Pragma" content="no-cache">
        <meta name="resource-type" content="document" />
        <meta name="robots" content="all, index, follow"/>
        <meta name="googlebot" content="all, index, follow" />
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
{foreach $template.meta name content}
{if $name == "keywords"}
        <meta name="{$name}" content="{foreach $content keyword}{$keyword}, {/foreach}" />
{else}
        <meta name="{$name}" content="{$content}" />
{/if}
{/foreach}
{foreach $template.metadata key metadata }
        {$metadata}
{/foreach}
        <link rel="icon" href="{base_url('assets/img/favicon.ico')}" type="image/x-icon"/>
        <link rel="stylesheet" href="{base_url('assets/css/bootstrap.min.css')}" type="text/css" />
        <link rel="stylesheet" href="{base_url('css/jquery-ui.min.css')}" type="text/css" />
        <link rel="stylesheet" href="{base_url('assets/css/academicons.css')}" type="text/css" />
        <link rel="stylesheet" href="{base_url('assets/css/font-awesome.min.css')}" type="text/css" />
        <link rel="stylesheet" href="{base_url('assets/js/pnotify/jquery.pnotify.default.css')}" type="text/css" />
        <link rel="stylesheet" href="{base_url('assets/js/select2_410/select2.min.css')}" />
		<link rel="stylesheet" href="{base_url('assets/css/contenido.css')}" />
        <link rel="stylesheet" href="{base_url('assets/js/datatables/datatables.min.css')}" />																	   																							  
{if $canonical}
        <link rel="canonical" href="{$canonical}" />
{/if}
{foreach $template.css file}
        <link rel="stylesheet" href="{$file}" type="text/css" />
{/foreach}
        <link rel="stylesheet" href="{base_url('assets/css/biblat.css')}" type="text/css" />
{foreach supported_langs() key curlang}
        {if lang_iso_code() != $curlang.iso}<link rel="alternate" href="{site_url($lang->switch_uri($key))}" hreflang="{$curlang.iso}" />{/if}
{/foreach}
        <!--[if lt IE 9]>
            <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
            <script src="http://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
        {if $ENVIRONMENT == "production"}{literal}<!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-33940112-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-33940112-1');
        </script>{/literal}{/if}
        {if $class_method == "mainindex"}{literal}<script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "WebSite",
          "url": "http://biblat.unam.mx/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "http://biblat.unam.mx/buscar/?slug={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
        </script>{/literal}{/if}
        {literal}<script type="application/ld+json">
        {
          "@context" : "http://schema.org",
          "@type" : "WebSite",
          "name" : "Biblat",
          "alternateName" : "Bibliografía Latinoamericana",
          "url" : "http://biblat.unam.mx/"
        }
        </script>{/literal}
    </head>
      <body>
        <header>
            <div class="container">
                <div class="row">   
                    <div id="biblat-logo" class="col-md-4 hidden-xs hidden-sm{if $class_method == "mainindex"} biblat-logo-main{/if}">
                        <a href="{site_url('/')}" title="{_('Bibliografía Latinoamericana')}">
                            <!--<span class="bl-single"></span><br/>-->
							<img src="/img/biblat.png"/><br/>
                            <span class="bl-large"></span><br/>
                            <span class="bl-sub"></span><br/>
                            <span></span><br/>
                        </a>
                    </div>
                    <div id="menu" class="col-md-8">
                        <div class="row">
                            <div id="dgb-unam" class="col-md-12 text-right hidden-xs hidden-sm">
                                {if $uri->segment(2) == "scielo"}<a href="http://scielo.org" title="Scientific Electronic Library Online" target="_blank"><span style="position:absolute;right:200px" class="bl-scielo fa-5x"></span></a>{/if}
                                <a href="http://dgb.unam.mx" title="{_('Dirección General de Bibliotecas')}" target="_blank"><!--span class="bl-dgb fa-5x"></span--><span><img style="width:100px;position:absolute;top:10px;right:100px " src="{base_url('img/logo_dgbsdi.svg')}"></span></a>
                                <a href="http://www.unam.mx" title="{_('Universidad Nacional Autónoma de México')}" target="_blank"><span class="bl-unam fa-5x"></span></a>
                            </div>
                            <div class="col-md-12 navbar-main">
                                <nav class="navbar navbar-default" role="navigation">
                                    <div class="container-fluid">
                                        <div class="navbar-header hidden-md hidden-lg">
                                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse-1">
                                                <span class="sr-only">Toggle navigation</span>
                                                <span class="icon-bar"></span>
                                                <span class="icon-bar"></span>
                                                <span class="icon-bar"></span>
                                            </button>
                                            <a class="navbar-brand" href="{base_url()}" title="{_('Bibliografía Latinoamericana')}"><!--span class="bl-single"></span--><img height="30px" src="/img/biblat_min.png"/></a>
                                        </div>
                                        <div class="collapse navbar-collapse navbar-right" id="bs-navbar-collapse-1">
                                            <ul class="nav navbar-nav">
                                                <li class="dropdown">
                                                    <a href="{site_url('nucleorevistas')}" class="dropdown-toggle"><span style="background-color: #e12b30;padding: 10px">{_('Núcleo Central')}</span></a>
                                                </li>
                                                <li class="dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">{_('Sobre Biblat')}<span class="caret"></span></a>
                                                    <ul class="dropdown-menu" role="menu">
                                                        <li><a href="{site_url('sobre-biblat')}">{_('¿Qué es Biblat?')}</a></li>
                                                        <li><a href="{site_url('clase-y-periodica')}">{_('Clase y Periódica')}</a></li>
                                                        <li><a href="{site_url('manual-de-indizacion')}">{_('Manual de indización')}</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="{site_url('scielo')}">{_('SciELO')}</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="#">{_('Tutoriales')}</a></li>
                                                        <li><a href="{site_url('materiales-de-difusion')}">{_('Materiales de difusión')}</a></li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">{_('Bibliometría')}<span class="caret"></span></a>
                                                    <ul class="dropdown-menu" role="menu">
                                                        <li><a href="{site_url('bibliometria/descripcion-biblat')}">{_('Descripción')}</a></li>
                                                        <li><a href="{site_url('bibliometria/metodologia-biblat')}">{_('Metodología')}</a></li>
                                                        <li class="divider"></li>
                                                        <li class="dropdown">
                                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">{_('Frecuencias')}<span class="caret"></span></a>
                                                            <ul class="dropdown-menu" role="menu">
                                                                <li><a href="{site_url('frecuencias/autor')}">{_('Autor')}</a></li>
                                                                <li><a href="{site_url('frecuencias/institucion')}">{_('Institución')}</a></li>
                                                                <li><a href="{site_url('frecuencias/pais-afiliacion')}">{_('País de afiliación')}</a></li>
                                                                <li><a href="{site_url('frecuencias/revista')}">{_('Revista')}</a></li>
                                                                <li><a href="{site_url('frecuencias/disciplina')}">{_('Disciplina')}</a></li>
                                                            </ul>
                                                        </li>
                                                        <li class="divider"></li>
                                                        <li class="dropdown">
                                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">{_('Indicadores')}<span class="caret"></span></a>
                                                            <ul class="dropdown-menu" role="menu">
                                                                <li><a href="{site_url('indicadores/indice-coautoria')}">{_('Índice de coautoría')}</a></li>
                                                                <!--<li><a href="{site_url('indicadores/tasa-documentos-coautorados')}">{_('Tasa de documentos coautorados')}</a></li>-->
                                                                <!--<li><a href="{site_url('indicadores/grado-colaboracion')}">{_('Grado de colaboración')}</a></li>-->
                                                                <!--<li><a href="{site_url('indicadores/indice-colaboracion')}">{_('Índice de colaboración')}</a></li>-->
                                                                <li><a href="{site_url('indicadores/modelo-elitismo')}">{_('Modelo de elitismo')}</a></li>
                                                                <li><a href="{site_url('indicadores/indice-densidad-documentos')}">{_('Índice de densidad de documentos')}</a></li>
                                                                <li><a href="{site_url('indicadores/indice-concentracion')}">{_('Índice de concentración temática')}</a></li>
                                                                <li><a href="{site_url('indicadores/modelo-bradford-revista')}">{_('Modelo de Bradford (Revista)')}</a></li>
                                                                <li><a href="{site_url('indicadores/modelo-bradford-institucion')}">{_('Modelo de Bradford (Institucional)')}</a></li>
                                                                <li><a href="{site_url('indicadores/productividad-exogena')}">{_('Tasa de autoría exógena por revista')}</a></li>
                                                                <li><a href="{site_url('indicadores/productividad-exogenah')}">{_('Tasa anual de autoría exógena dividida por país')} <sup><span style="font-size: 10px" class="fa fa-certificate"> </span> <span style="font-size: 10px">Nuevo</span></sup> </a></li>
																<li><a href="{site_url('indicadores/frecuencias-institucion-documento')}">{_('Documentos de una revista por institución')} <sup><span style="font-size: 10px" class="fa fa-certificate"> </span> <span style="font-size: 10px">Nuevo</span></sup> </a></li>
                                                                <li><a href="{site_url('indicadores/frecuencias-institucion-documentoh')}">{_('Documentos anuales de una revista por institución')} <sup><span style="font-size: 10px" class="fa fa-certificate"> </span> <span style="font-size: 10px">Nuevo</span></sup> </a></li>
                                                                <li><a href="{site_url('indicadores/coautoria-pais')}">{_('Coautoría entre países')} <sup><span style="font-size: 10px" class="fa fa-certificate"> </span> <span style="font-size: 10px">Nuevo</span></sup></a></li>
                                                            </ul>
                                                        </li>
                                                        <li class="divider"></li>
                                                        <!--li class="dropdown">
                                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">{_('Indicadores SciELO')}<span class="caret"></span></a>
                                                            <ul class="dropdown-menu" role="menu">
                                                                <li><a href="{site_url('scielo/indicadores/distribucion-articulos-coleccion')}">{_('Distribución de artículos por colección')}</a></li>
                                                                <li><a href="{site_url('scielo/indicadores/distribucion-revista-coleccion')}">{_('Distribución de revistas por colección')}</a></li>
                                                                <li><a href="{site_url('scielo/indicadores/indicadores-generales-revista')}">{_('Indicadores generales por revista')}</a></li>
                                                                <li><a href="{site_url('scielo/indicadores/citacion-articulos-edad')}">{_('Distribución de artículos por edad del documento citado')}</a></li>
                                                                <li><a href="{site_url('scielo/indicadores/citacion-articulos-tipo')}">{_('Distribución de artículos por tipo del documento citado')}</a></li>
                                                            </ul>
                                                        </li-->
                                                        <!--<li class="divider"></li>-->
                                                        <li><a href="{site_url('bibliometria/indicadores-por-revista')}">{_('Indicadores por revista')}</a></li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">{_('MetaMetrics')}<span class="caret"></span></a>
                                                    <ul class="dropdown-menu" role="menu">
                                                        <li><a href="{site_url('sobre-metametrics')}">{_('¿Qué es MetaMetrics?')}</a></li>
                                                        <li><a href="{site_url('metametrics')}">{_('Validador de Metadatos')}</a></li>
                                                        <li><a href="{site_url('metametrics/estadisticas')}">{_('Estadísticas de uso')}</a></li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">{_('Postular una revista')}<span class="caret"></span></a>
                                                    <ul class="dropdown-menu" role="menu">
                                                        <li><a href="{site_url('postular-revista/criterios-de-seleccion')}">{_('Criterios de selección de revistas')}</a></li>
                                                        <li><a href="{site_url('metametrics/simulador')}">{_('Simulador de validación de metadatos')}</a></li>
                                                        <li><a href="{site_url('preevaluacion/simulador')}">{_('Simulador de preevaluacion editorial')}</a></li>
                                                        <li><a href="{site_url('postular-revista/metametrics')}">{_('Iniciar proceso de evaluación')}</a></li>
                                                    </ul>
                                                </li>
                                                <!--li><a href="#">{_('Políticas de acceso')}</a></li-->
                                                <li class="dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">{_('Documentos')}<span class="caret"></span></a>
                                                    <ul class="dropdown-menu" role="menu">
                                                        <li><a href="{site_url('documentos/bibliografia')}">{_('Bibliografía')}</a></li>
                                                        <li><a href="{site_url('documentos/presentaciones')}">{_('Presentaciones PPT')}</a></li>
                                                        <li><a href="{site_url('documentos/multimedia')}">{_('Archivos multimedia')}</a></li>
														<li><a href="{site_url('documentos/guias')}">{_('Guías')}</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <div class="visible-xs-block">
                                                {$template.partials.submenu}
                                            </div>
                                        </div><!-- /.navbar-collapse -->
                                    </div><!-- /.container -->
                                </nav>
                            </div><!--col-md-12-->
{if $class_method != "mainindex"}
                            <div class="col-md-12 hidden-xs hidden-sm">
                                {$template.partials.search}
                            </div>
{/if}
                        </div><!--row-->
                    </div><!--menu--> 
                </div><!--row--> 
            </div><!--container--> 
        </header>
{if $class_method != "mainindex"}
        <div class="container">
            <div id="heading" class="row">
                <div class="col-sm-9">
                    <ol class="breadcrumb">
{foreach $template.breadcrumbs breadcrumb}
{if $breadcrumb.uri != ''}
                        <li itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a href="{$breadcrumb.uri}" itemprop="url"><span itemprop="title">{$breadcrumb.name}</span></a></li>
{else}
                        <li itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><span itemprop="title">{$breadcrumb.name}</span></li>
{/if}
{/foreach}
                    </ol>
{if $page_title}
                    <div class="page_title">
                        <hr/>
                        <h4>
                            {$page_title} {if $simulador}(Simulador){/if}
                            {if $postularPrimera}(Primera evaluación){/if}
                            {if $postularSegunda}(Segunda evaluación){/if}
                        </h4>
                        {if $page_subtitle}
                        <h5 style="color:black">{$page_subtitle}</h5>
                        {/if}
                        <hr/>
                    </div>
{/if}
                </div>
                <div class="col-sm-3 hidden-xs">
                    <nav class="navbar navbar-default navbar-right" role="navigation">
                        <div class="container-fluid">
{$template.partials.submenu}
                        </div>
                    </nav>
                </div>
            </div><!--heading-->
        </div><!--container-fluid-->
{/if}
        <div id="main" class="container text-justify">
            {$template.body}
            <div class="clearfix"></div>
        </div><!--container-fluid-->
        <footer class="container">
            <div id="sitemap" class="row hidden-xs">
                <div class="col-xs-9 col-xs-offset-3 col-sm-3 col-sm-offset-1 col-md-3 col-md-offset-1">
                    <ul class="list-unstyled">
                      <li><a href="{site_url('sobre-biblat')}">{_('¿Qué es Biblat?')}</a></li>
                      <li><a href="{site_url('clase-y-periodica')}">{_('Clase y Periódica')}</a></li>
                      <li><a href="{site_url('manual-de-indizacion')}">{_('Manual de indización')}</a></li>
                      <li><a href="{site_url('scielo')}">{_('SciELO')}</a></li>
                      <li><a href="#">{_('Tutoriales')}</a></li>
                      <li><a href="{site_url('materiales-de-difusion')}">{_('Materiales de difusión')}</a></li>
                    </ul>
                </div>
                <div class="col-xs-9 col-xs-offset-3 col-sm-3 col-sm-offset-1 col-md-3 col-md-offset-1">
                    <ul class="list-unstyled">
                      <li><a href="{site_url('bibliometria/descripcion-biblat')}">{_('Descripción')}</a></li>
                      <li><a href="{site_url('bibliometria/metodologia-biblat')}">{_('Metodología')}</a></li>
                      <li><a href="{site_url('frecuencias')}">{_('Frecuencias')}</a></li>
                      <li><a href="{site_url('indicadores')}">{_('Indicadores')}</a></li>
                      <li><a href="#">{_('Indicadores SciELO')}</a></li>
                      <li><a href="#">{_('Indicadores por revista')}</a></li>
                    </ul>
                </div>
                <div class="col-xs-9 col-xs-offset-3 col-sm-3 col-sm-offset-1 col-md-3 col-md-offset-1">
                    <ul class="list-unstyled">
                      <li><a href="{site_url('postular-revista/criterios-de-seleccion')}">{_('Criterios de selección de revistas')}</a></li>
                      <li><a href="#">{_('Políticas de acceso')}</a></li>
                      <li><a href="{site_url('documentos/bibliografia')}">{_('Bibliografía')}</a></li>
                      <li><a href="#">{_('Presentaciones PPT')}</a></li>
                      <li><a href="#">{_('Archivos multimedia')}</a></li>
                    </ul>
                </div>
            </div><!--sitemap-->
            <div class="row">
                <div id="copyright" class="text-center">
                    {_sprintf('® Derechos reservados. 2009 - %d. Dirección General de Bibliotecas, Universidad Nacional Autónoma de México (UNAM). Esta página y sus contenidos pueden ser utilizados y reproducidos con fines no lucrativos, siempre y cuando no se mutile, se cite la fuente completa y su dirección electrónica. De otra forma, requiere permiso previo por escrito de la institución.', date('Y'))} <a href="{site_url('creditos')}">{_('CRÉDITOS')}</a>
                </div>
            </div>
        </footer>
        <div id="loading" style="display:none;">
            <h2 style="white-space:nowrap;">
                <img src="{base_url('img/loading.gif')}" /><br/>{_('Espere un momento...')}
            </h2>
        </div>
        <script src="{base_url('assets/js/jquery.js')}"></script>
        <script src="{base_url('assets/js/bootstrap.min.js')}"></script>
        <script src="{base_url('js/jquery-ui.min.js')}"></script>
        <script src="{base_url('js/jquery.autosize.min.js')}"></script>
        <script src="{base_url('js/jquery.validate.min.js')}"></script>
        <script src="{base_url('assets/js/pnotify/jquery.pnotify.min.js')}"></script>
        <script src="{base_url('assets/js/select2_410/select2.min.js')}"></script>
        <script src="{base_url('js/jquery.blockUI.js')}"></script>
        <script src="{base_url('assets/js/advancedsearch/js/evol.advancedSearch.min.js')}"></script>
{foreach $template.js file}
        <script src="{$file}"></script>
{/foreach}
        <script>
{if $template.partials.biblat_js}
            {$template.partials.biblat_js}
{/if}
{if $template.partials.view_js}
            {$template.partials.view_js}
{/if}
{if $template.partials.main_js}
			{$template.partials.main_js}
{/if}
</script>
    </body>
</html>