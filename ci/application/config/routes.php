<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/
$langs = "^(?:es|en|fr|pt|ca)";


$route['default_controller'] = "main";
$route['404_override'] = '';

$route['api/([^/]+?)/([^/]+?)\.(xml|json|csv|html|php|serialize)(.*?$)'] = "api/$1/$2/format/$3$4";
$route['api/([^/]+?)\.(xml|json|csv|html|php|serialize)(.*?$)'] = "api/$1/index/format/$2$3";


$route[$langs.'$'] = $route['default_controller'];

$route[$langs.'/creditos'] = 'main/creditos';
$route[$langs.'/documentos/bibliografia'] = 'main/bibliografia';
$route[$langs.'/documentos/presentaciones'] = 'main/presentaciones';
$route[$langs.'/documentos/multimedia'] = 'main/multimedia';
$route[$langs.'/documentos/guias'] = 'main/guias';
$route[$langs.'/sitemap'] = 'main/sitemap';
$route[$langs.'/contacto'] = 'main/contacto';
$route[$langs.'/contacto/submit'] = 'main/contactoSubmit';
$route[$langs.'/sobre-biblat'] = 'main/sobreBiblat';
$route[$langs.'/clase-y-periodica'] = 'main/clasePeriodica';
$route[$langs.'/scielo'] = 'main/scielo';
$route[$langs.'/materiales-de-difusion'] = 'main/materialesDifusion';
$route[$langs.'/revista'] = 'indice/alfabetico';
$route[$langs.'/revista/solicitud/documento'] = 'revista/solicitudDocumento';
$route[$langs.'/bibliometria/descripcion-biblat'] = 'main/descripcionBiblat';
$route[$langs.'/bibliometria/metodologia-biblat'] = 'main/metodologiaBiblat';
$route[$langs.'/postular-revista/criterios-de-seleccion'] = 'main/criteriosSeleccion';
$route[$langs.'/postular-revista/preevaluacion'] = 'main/preevaluacion';
$route[$langs.'/bibliometria/indicadores-scielo'] = 'main/indicadoresScielo';
$route[$langs.'/bibliometria/indicadores-por-revista(.*)'] = 'main/indicadoresRevista$1';
$route[$langs.'/manual-de-indizacion'] = 'main/manualIndizacion';
$route[$langs.'/dashboardmu'] = 'main/dashboardmu';

$route[$langs.'/conacyt/revista(.*)'] = 'conacyt/pdf_viewer/revista$1';
$route[$langs.'/conacyt/area(.*)'] = 'conacyt/pdf_viewer/area$1';
$route[$langs.'/conacyt/reporte(.*)'] = 'conacyt/pdf_viewer/reporte$1';

$route[$langs.'/buscar/getList'] = 'buscar/getList';
$route[$langs.'/buscar/(autor|articulo|institucion|revista|palabra-clave|avanzada)/(.+)/(texto-completo)(.*)'] = 'buscar/index/$1/null/$2/$3$4';
$route[$langs.'/buscar/(.*)/(.*)/(texto-completo)(.*)'] = 'buscar/index/null/$1/$2/$3$4';
$route[$langs.'/buscar/(.*)/(texto-completo)(.*)'] = 'buscar/index/null/null/$1/$2$3';
$route[$langs.'/buscar/(autor|articulo|institucion|revista|palabra-clave|avanzada)/(.+)/([0-9]+$)'] = 'buscar/index/$1/null/$2/$3';
$route[$langs.'/buscar/(.*)/(.*)/([0-9]+$)'] = 'buscar/index/null/$1/$2/$3';
$route[$langs.'/buscar/(.*)/([0-9]+$)'] = 'buscar/index/null/null/$1/$2';
$route[$langs.'/buscar/(autor|articulo|institucion|revista|palabra-clave|avanzada)/(.+)'] = 'buscar/index/$1/null/$2';
$route[$langs.'/buscar/(.*)/(.*)'] = 'buscar/index/null/$1/$2';
$route[$langs.'/buscar/(.*)'] = 'buscar/index/null/null/$1';

$route[$langs.'/revista/(.+)/articulo/(.+)'] = "revista/articulo/revista/$1/articulo/$2";
$route[$langs.'/revista/(.+)/numeros'] = "revista/numeros/$1";
$route[$langs.'/revista/(.*)'] = "revista/index/$1";
/*≠≠≠≠≠≠≠≠ Indicadores Biblat ≠≠≠≠≠≠≠≠*/
$route[$langs.'/indicadores/(indice-coautoria|tasa-documentos-coautorados|grado-colaboracion|modelo-elitismo|indice-colaboracion|indice-densidad-documentos|indice-concentracion|modelo-bradford-revista|modelo-bradford-institucion|productividad-exogena|frecuencias-institucion-documento|coautoria-pais)(.*)/preview\.png$'] = "indicadores/preview/$1";

$route[$langs.'/indicadores/modelo-bradford-revista/disciplina/(.*)/revista/(.*)/documentos(.*)'] = "indicadores/bradfordDocumentos/$1$2";
$route[$langs.'/indicadores/(indice-coautoria|tasa-documentos-coautorados|grado-colaboracion|modelo-elitismo|indice-colaboracion|indice-densidad-documentos|indice-concentracion|modelo-bradford-revista|modelo-bradford-institucion|productividad-exogena|frecuencias-institucion-documento|coautoria-pais)(.*)'] = "indicadores/index/$1";

/*≠≠≠≠≠≠≠≠ Indicadores SciELO ≠≠≠≠≠≠≠≠*/
$route[$langs.'/scielo/indicadores/((distribucion|citacion)-(articulos|revista|articulos-area|articulos-afiliacion)-(coleccion|area-revista|edad|tipo))(.*)/preview\.png$'] = "scielo/indicadores/preview/$1";
$route[$langs.'/scielo/indicadores/(indicadores-generales-revista)(.*)/preview\.png$'] = "scielo/indicadores/preview/$1";

$route[$langs.'/scielo/indicadores/((distribucion|citacion)-(articulos|revista|articulos-area|articulos-afiliacion)-(coleccion|area-revista|edad|tipo))(.*)'] = "scielo/indicadores/index/$1";
$route[$langs.'/scielo/indicadores/(indicadores-generales-revista)(.*)'] = "scielo/indicadores/index/$1";

/*≠≠≠≠≠≠≠≠ Frecuencias por autor ≠≠≠≠≠≠≠≠*/
$route[$langs.'/frecuencias/autor/([^/]+)'] = "frecuencias/autor/slug/$1";
$route[$langs.'/frecuencias/autor/([^/]+)/(ordenar/.*|export/excel$)'] = "frecuencias/autor/slug/$1/$2";

$route[$langs.'/frecuencias/autor/([^/]+)/documento'] = "frecuencias/autorDocumentos/$1";
$route[$langs.'/frecuencias/autor/([^/]+)/documento/([0-9]+$)'] = "frecuencias/autorDocumentos/$1/$2";

$route[$langs.'/frecuencias/autor/(.+?)/\bcoautoria\b/([^/]+)$'] = "frecuencias/autorCoautoriaDocumentos/$1/$2";
$route[$langs.'/frecuencias/autor/(.+?)/\bcoautoria\b/([^/]+)/[0-9^/]+$'] = "frecuencias/autorCoautoriaDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/autor/(.+?)/\bcoautoria\b(.*)'] = "frecuencias/autorCoautoria/autorSlug/$1$2";

/*≠≠≠≠≠≠≠≠ Frecuencias por institución ≠≠≠≠≠≠≠≠*/
$route[$langs.'/frecuencias/institucion/([^/]+)'] = "frecuencias/institucion/slug/$1";
$route[$langs.'/frecuencias/institucion/([^/]+)/(ordenar/.*|export/excel$)'] = "frecuencias/institucion/slug/$1/$2";

$route[$langs.'/frecuencias/institucion/([^/]+)/documento'] = "frecuencias/institucionDocumentos/$1";
$route[$langs.'/frecuencias/institucion/([^/]+)/documento/([0-9]+$)'] = "frecuencias/institucionDocumentos/$1/$2";

$route[$langs.'/frecuencias/institucion/(.+?)/\bpais\b/([^/]+)$'] = "frecuencias/institucionPaisDocumentos/$1/$2";
$route[$langs.'/frecuencias/institucion/(.+?)/\bpais\b/([^/]+)/[0-9^/]+$'] = "frecuencias/institucionPaisDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/institucion/(.+?)/\bpais\b(.*)'] = "frecuencias/institucionPais/institucionSlug/$1$2";

$route[$langs.'/frecuencias/institucion/(.+?)/\brevista\b/([^/]+)$'] = "frecuencias/institucionRevistaDocumentos/$1/$2";
$route[$langs.'/frecuencias/institucion/(.+?)/\brevista\b/([^/]+)/[0-9^/]+$'] = "frecuencias/institucionRevistaDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/institucion/(.+?)/\brevista\b(.*)'] = "frecuencias/institucionRevista/institucionSlug/$1$2";

$route[$langs.'/frecuencias/institucion/(.+?)/\bautor\b/([^/]+)$'] = "frecuencias/institucionAutorDocumentos/$1/$2";
$route[$langs.'/frecuencias/institucion/(.+?)/\bautor\b/([^/]+)/[0-9^/]+$'] = "frecuencias/institucionAutorDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/institucion/(.+?)/\bautor\b(.*)'] = "frecuencias/institucionAutor/institucionSlug/$1$2";

$route[$langs.'/frecuencias/institucion/(.+?)/\bdisciplina\b/([^/]+)$'] = "frecuencias/institucionDisciplinaDocumentos/$1/$2";
$route[$langs.'/frecuencias/institucion/(.+?)/\bdisciplina\b/([^/]+)/[0-9^/]+$'] = "frecuencias/institucionDisciplinaDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/institucion/(.+?)/\bdisciplina\b(.*)'] = "frecuencias/institucionDisciplina/institucionSlug/$1$2";

$route[$langs.'/frecuencias/institucion/(.+?)/\bcoautoria\b/([^/]+)$'] = "frecuencias/institucionCoautoriaDocumentos/$1/$2";
$route[$langs.'/frecuencias/institucion/(.+?)/\bcoautoria\b/([^/]+)/[0-9^/]+$'] = "frecuencias/institucionCoautoriaDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/institucion/(.+?)/\bcoautoria\b(.*)'] = "frecuencias/institucionCoautoria/institucionSlug/$1$2";

/*≠≠≠≠≠≠≠≠ Frecuencias por país de afiliación ≠≠≠≠≠≠≠≠*/
$route[$langs.'/frecuencias/pais-afiliacion'] = "frecuencias/paisAfiliacion";
$route[$langs.'/frecuencias/pais-afiliacion/(ordenar/.*|export/excel$)'] = "frecuencias/paisAfiliacion/$1";
$route[$langs.'/frecuencias/pais-afiliacion/([^/]+)'] = "frecuencias/paisAfiliacion/slug/$1";
$route[$langs.'/frecuencias/pais-afiliacion/([^/]+)/(ordenar/.*|export/excel$)'] = "frecuencias/paisAfiliacion/slug/$1/$2";

$route[$langs.'/frecuencias/pais-afiliacion/([^/]+)/documento'] = "frecuencias/paisAfiliacionDocumentos/$1";
$route[$langs.'/frecuencias/pais-afiliacion/([^/]+)/documento/([0-9]+$)'] = "frecuencias/paisAfiliacionDocumentos/$1/$2";

$route[$langs.'/frecuencias/pais-afiliacion/(.+?)/\binstitucion\b/([^/]+)$'] = "frecuencias/paisAfiliacionInstitucionDocumentos/$1/$2";
$route[$langs.'/frecuencias/pais-afiliacion/(.+?)/\binstitucion\b/([^/]+)/[0-9^/]+$'] = "frecuencias/paisAfiliacionInstitucionDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/pais-afiliacion/(.+?)/\binstitucion\b(.*)'] = "frecuencias/paisAfiliacionInstitucion/paisInstitucionSlug/$1$2";

$route[$langs.'/frecuencias/pais-afiliacion/(.+?)/\bautor\b/([^/]+)$'] = "frecuencias/paisAfiliacionAutorDocumentos/$1/$2";
$route[$langs.'/frecuencias/pais-afiliacion/(.+?)/\bautor\b/([^/]+)/[0-9^/]+$'] = "frecuencias/paisAfiliacionAutorDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/pais-afiliacion/(.+?)/\bautor\b(.*)'] = "frecuencias/paisAfiliacionAutor/paisInstitucionSlug/$1$2";

$route[$langs.'/frecuencias/pais-afiliacion/(.+?)/\bdisciplina\b/([^/]+)$'] = "frecuencias/paisAfiliacionDisciplinaDocumentos/$1/$2";
$route[$langs.'/frecuencias/pais-afiliacion/(.+?)/\bdisciplina\b/([^/]+)/[0-9^/]+$'] = "frecuencias/paisAfiliacionDisciplinaDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/pais-afiliacion/(.+?)/\bdisciplina\b(.*)'] = "frecuencias/paisAfiliacionDisciplina/paisInstitucionSlug/$1$2";

$route[$langs.'/frecuencias/pais-afiliacion/(.+?)/\bcoautoria\b/([^/]+)$'] = "frecuencias/paisAfiliacionCoautoriaDocumentos/$1/$2";
$route[$langs.'/frecuencias/pais-afiliacion/(.+?)/\bcoautoria\b/([^/]+)/[0-9^/]+$'] = "frecuencias/paisAfiliacionCoautoriaDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/pais-afiliacion/(.+?)/\bcoautoria\b(.*)'] = "frecuencias/paisAfiliacionCoautoria/paisInstitucionSlug/$1$2";

/*≠≠≠≠≠≠≠≠ Frecuencias por revista ≠≠≠≠≠≠≠≠*/
$route[$langs.'/frecuencias/revista/([^/]+)'] = "frecuencias/revista/slug/$1";
$route[$langs.'/frecuencias/revista/([^/]+)/(ordenar/.*|export/excel$)'] = "frecuencias/revista/slug/$1/$2";

$route[$langs.'/frecuencias/revista/([^/]+)/documento'] = "frecuencias/revistaDocumentos/$1";
$route[$langs.'/frecuencias/revista/([^/]+)/documento/([0-9]+$)'] = "frecuencias/revistaDocumentos/$1/$2";

$route[$langs.'/frecuencias/revista/(.+?)/\bautor\b/([^/]+)$'] = "frecuencias/revistaAutorDocumentos/$1/$2";
$route[$langs.'/frecuencias/revista/(.+?)/\bautor\b/([^/]+)/[0-9^/]+$'] = "frecuencias/revistaAutorDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/revista/(.+?)/\bautor\b(.*)'] = "frecuencias/revistaAutor/revistaSlug/$1$2";

$route[$langs.'/frecuencias/revista/(.+?)/\binstitucion\b/([^/]+)$'] = "frecuencias/revistaInstitucionDocumentos/$1/$2";
$route[$langs.'/frecuencias/revista/(.+?)/\binstitucion\b/([^/]+)/[0-9^/]+$'] = "frecuencias/revistaInstitucionDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/revista/(.+?)/\binstitucion\b(.*)'] = "frecuencias/revistaInstitucion/revistaSlug/$1$2";

$route[$langs.'/frecuencias/revista/(.+?)/\banio\b/(\d{4})($|/$)'] = "frecuencias/revistaAnioDocumentos/$1/$2/1";
$route[$langs.'/frecuencias/revista/(.+?)/\banio\b/(\d{4})/[0-9^/]+$'] = "frecuencias/revistaAnioDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/revista/(.+?)/\banio\b(.*)'] = "frecuencias/revistaAnio/revistaSlug/$1$2";

/*≠≠≠≠≠≠≠≠ Frecuencias por disciplina ≠≠≠≠≠≠≠≠*/
$route[$langs.'/frecuencias/disciplina/([^/]+)'] = "frecuencias/disciplina/slug/$1";
$route[$langs.'/frecuencias/disciplina/([^/]+)/(ordenar/.*|export/excel$)'] = "frecuencias/disciplina/slug/$1/$2";

$route[$langs.'/frecuencias/disciplina/([^/]+)/documento'] = "frecuencias/disciplinaDocumentos/$1";
$route[$langs.'/frecuencias/disciplina/([^/]+)/documento/([0-9]+$)'] = "frecuencias/disciplinaDocumentos/$1/$2";

$route[$langs.'/frecuencias/disciplina/(.+?)/\binstitucion\b/([^/]+)$'] = "frecuencias/disciplinaInstitucionDocumentos/$1/$2";
$route[$langs.'/frecuencias/disciplina/(.+?)/\binstitucion\b/([^/]+)/[0-9^/]+$'] = "frecuencias/disciplinaInstitucionDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/disciplina/(.+?)/\binstitucion\b(.*)'] = "frecuencias/disciplinaInstitucion/disciplinaSlug/$1$2";

$route[$langs.'/frecuencias/disciplina/(.+?)/\bpais\b/([^/]+)$'] = "frecuencias/disciplinaPaisDocumentos/$1/$2";
$route[$langs.'/frecuencias/disciplina/(.+?)/\bpais\b/([^/]+)/[0-9^/]+$'] = "frecuencias/disciplinaPaisDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/disciplina/(.+?)/\bpais\b(.*)'] = "frecuencias/disciplinaPais/disciplinaSlug/$1$2";

$route[$langs.'/frecuencias/disciplina/(.+?)/\brevista\b/([^/]+)$'] = "frecuencias/disciplinaRevistaDocumentos/$1/$2";
$route[$langs.'/frecuencias/disciplina/(.+?)/\brevista\b/([^/]+)/[0-9^/]+$'] = "frecuencias/disciplinaRevistaDocumentos/$1/$2/$3";
$route[$langs.'/frecuencias/disciplina/(.+?)/\brevista\b(.*)'] = "frecuencias/disciplinaRevista/disciplinaSlug/$1$2";



// URI like '/en/about' -> use controller 'about'
$route[$langs.'/(.+)$'] = "$1";
/* End of file routes.php */
/* Location: ./application/config/routes.php */
