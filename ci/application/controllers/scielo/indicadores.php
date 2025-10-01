<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Indicadores extends CI_Controller {

	public $indicadores = array();
	public $indicadoresSite = array();
	public $areas = array();
	public $colecciones = array();
	public $ageRanges = array();
	public $docTypes = array();
	public $colors = array(
		'#3366CC',
		'#DC3912',
		'#FF9900',
		'#109618',
		'#990099',
		'#0099C6',
		'#DD4477',
		'#66AA00',
		'#B82E2E',
		'#316395',
		'#22AA99',
		'#AAAA11',
		'#6633CC',
		'#E67300',
		'#8B0707',
		'#651067'
	);
	public $highcharts = array();
	public $preview = FALSE;
	
	public function __construct()
	{
		parent::__construct();
		
		$this->reviewIP("indicadores scielo");
		
		$this->indicadoresSite = array(
			_('Publicación') => array(
					'distribucion-articulos-coleccion' => _('Distribución de artículos por colección'),
					'distribucion-revista-coleccion' => _('Distribución de revistas por colección'),
					// 'distribucion-articulos-afiliacion' => _('Distribución de artículos por país de afiliación'),
					// 'distribucion-articulos-revista-afiliacion' => _('Distribución de artículos por revista y país de afiliación'),
					// 'distribucion-articulos-publicacion-afiliacion' => _('Distribución de artículos por país de publicación y país de afiliación'),
					// 'distribucion-articulos-area-afiliacion' => _('Distribución de artículos por área y país de afiliación'),
					// 'distribucion-coautor-revista-afiliacion' => _('Distribución de artículos por revista y número de co-autores'),
					// 'distribucion-coautor-area-afiliacion' => _('Distribución de artículos por área y número de co-autores'),
				),
			_('Colección') => array(
					'indicadores-generales-revista' => _('Indicadores generales por revista')
				),
			_('Citación') => array(
					'citacion-articulos-edad' => _('Distribución de artículos por edad del documento citado'),
					'citacion-articulos-tipo' => _('Distribución de artículos por tipo del documento citado'),
					// 'citaction-articulos-area-revista' => _('Distribución de artículos por área y revista citada'),
					// 'citacion-articulos-afiliacion-revista' => _('Distribución de artículos por páis de afiliación y revista ciatada'),
				)
		);
		$this->indicadores = array(
			'distribucion-articulos-afiliacion' => array(
				'title' => _('Distribución de artículos por país de afiliación'),
				'update' => '08/12/2014'
				),
			'citacion-articulos-afiliacion-revista' => array(
				'title' => _('Distribución de artículos por páis de afiliación y revista citada'),
				'update' => '08/12/2014'
				),
			'distribucion-articulos-area-afiliacion' => array(
				'title' => _('Distribución de artículos por área y país de afiliación'),
				'update' => '08/12/2014'
				),
			'citaction-articulos-area-revista' => array(
				'title' => _('Distribución de artículos por área y revista citada'),
				'update' => '08/12/2014'
				),
			'distribucion-articulos-coleccion' => array(
				'title' => _('Distribución de artículos por colección'),
				'update' => '08/12/2014'
				),
			'distribucion-articulos-coleccion-afiliacion' => array(
				'title' => _('Distribución de artículos por colección y país de afiliación'),
				'update' => '08/12/2014'
				),
			'distribucion-articulos-coleccion-area' => array(
				'title' => _('Distribución de artículos por colección y área'),
				'update' => '18/06/2013'
				),
			'distribucion-articulos-coleccion-area-revista' => array(
				'title' => _('Distribución de artículos por colección, área y revista'),
				'update' => '08/12/2014'
				),
			'distribucion-articulos-coleccion-revista' => array(
				'title' => _('Distribución de artículos por colección y revista'),
				'update' => '08/12/2014'
				),
			'citacion-articulos-edad' => array(
				'title' => _('Distribución de artículos por edad del documento citado'),
				'update' => '08/12/2014'
				),
			'citacion-articulos-edad-afiliacion' => array(
				'title' => _('Distribución de artículos por edad del documento citado y país de afiliación citante'),
				'update' => '08/12/2014'
				),
			'citacion-articulos-edad-area' => array(
				'title' => _('Distribución de artículos por edad del documento citado y área citante'),
				'update' => '08/12/2014'
				),
			'citacion-articulos-edad-revista' => array(
				'title' => _('Distribución de artículos por edad del documento citado y revista citante'),
				'update' => '08/12/2014'
				),
			'distribucion-articulos-publicacion-afiliacion' => array(
				'title' => _('Distribución de artículos por país de publicación y país de afiliación'),
				'update' => '08/12/2014'
				),
			'distribucion-articulos-revista-afiliacion' => array(
				'title' => _('Distribución de artículos por revista y país de afiliación'),
				'update' => '08/12/2014'
				),
			'citacion-articulos-tipo' => array(
				'title' => _('Distribución de artículos por tipo del documento citado'),
				'update' => '08/12/2014'
				),
			'citacion-articulos-tipo-afiliacion' => array(
				'title' => _('Distribución de artículos por tipo del documento citado y país de afiliación citante'),
				'update' => '08/12/2014'
				),
			'citacion-articulos-tipo-area' => array(
				'title' => _('Distribución de artículos por tipo del documento citado y área citante'),
				'update' => '08/12/2014'
				),
			'citacion-articulos-tipo-revista' => array(
				'title' => _('Distribución de artículos por tipo del documento citado y revista citante'),
				'update' => '08/12/2014'
				),
			'distribucion-coautor-area-afiliacion' => array(
				'title' => _('Distribución de artículos por área y número de co-autores'),
				'update' => '08/12/2014'
				),
			'distribucion-coautor-revista-afiliacion' => array(
				'title' => _('Distribución de artículos por revista y número de co-autores'),
				'update' => '08/12/2014'
				),
			'distribucion-revista-coleccion' => array(
				'title' => _('Distribución de revistas por colección'),
				'update' => '08/12/2014'
				),
			'indicadores-generales-revista' => array(
				'title' => _('Indicadores generales por revista'),
				'update' => '08/12/2014'
				),
		);
		/*Colecciones*/
		$this->load->database('scielo');
		$query = "SELECT id, name, slug FROM \"vNetwork\"";
		$queryResult = $this->db->query($query);
		foreach ($queryResult->result_array() as $row):
			$this->colecciones['slug'][$row['slug']] = $row;
			$this->colecciones['id'][$row['id']] = $row;
		endforeach;
		$query = "SELECT id, name, slug FROM \"area\"";
		$queryResult = $this->db->query($query);
		foreach ($queryResult->result_array() as $row):
			$this->areas['slug'][$row['slug']] = $row;
			$this->areas['id'][$row['id']] = $row;
		endforeach;
		$query = "SELECT rango FROM \"vAgeRange\"";
		$queryResult = $this->db->query($query);
		$this->ageRanges = $queryResult->result_array();
		$query = "SELECT id, name, slug FROM \"docType\" ORDER BY slug";
		$queryResult = $this->db->query($query);
		foreach ($queryResult->result_array() as $row):
			$this->docTypes['slug'][$row['slug']] = $row;
			$this->docTypes['id'][$row['id']] = $row;
		endforeach;
		
		$this->db->close();

		$this->highcharts['barstack'] = array(
			'chart' => array(
					'type' => 'column',
					'width' => 1000,
					'height' => 550,
					'backgroundColor' => 'transparent'
				),
			'title' => array('text' => null),
			'subtitle' => array(
					'text' => _sprintf('Patrocinado por %s', '<i class="bl-conacyt"></i>'),
					'useHTML' => TRUE,
					'floating' => TRUE,
					'x' => 70,
					'y' => 5,
					'align' => 'left',
					'verticalAlign' => 'bottom',
					'style' => array(
							'fontSize' => '11px'
						)
				),
			'credits' => array(
					'href' => site_url('/'),
					'text' => _sprintf('Fuente: %s', 'biblat.unam.mx')
				),
			'yAxis' => array(
					'allowDecimals' => FALSE,
					'min' => 0,
					'title' => NULL
				),
			'legend' => array(
					'align' => 'right',
					'verticalAlign' => 'top',
					'highlightSeries' => array('enabled' => TRUE)
				),
			'plotOptions' => array(
					'column' => array('stacking' => 'normal'),
					'series' => array(
						'events' => array(),
						'point' => array('events' => array())
					)
				),
			'xAxis' => array(
					'categories' => array(),
					'title' => array('text' => _('Año'))
				),
			'series' => array()
		);

		$this->highcharts['line'] = array(
			'chart' => array(
					'type' => 'line',
					'width' => 1000,
					'height' => 550,
					'backgroundColor' => 'transparent'
				),
			'title' => array('text' => null),
			'subtitle' => array(
					'text' => _sprintf('Patrocinado por %s', '<i class="bl-conacyt"></i>'),
					'useHTML' => TRUE,
					'floating' => TRUE,
					'x' => 70,
					'y' => 5,
					'align' => 'left',
					'verticalAlign' => 'bottom',
					'style' => array(
							'fontSize' => '11px'
						)
				),
			'credits' => array(
					'href' => site_url('/'),
					'text' => _sprintf('Fuente: %s', 'biblat.unam.mx')
				),
			'yAxis' => array(
					'allowDecimals' => TRUE,
					'min' => 0,
					'title' => NULL
				),
			'legend' => array(
					'align' => 'right',
					'verticalAlign' => 'top',
					'highlightSeries' => array('enabled' => TRUE)
				),
			'plotOptions' => array(
					'series' => array(
						'events' => array(),
						'point' => array('events' => array()),
						'dataLabels' => array('enabled' => TRUE)
					)
				),
			'xAxis' => array(
					'categories' => array(),
					'title' => array('text' => _('Año'))
				),
			'series' => array(),
			'tooltip' => array('headerFormat' => '')
		);

		$this->output->enable_profiler($this->config->item('enable_profiler'));
		$this->template->set_partial('biblat_js', 'javascript/biblat', array(), TRUE, FALSE);
		$this->template->set_partial('submenu', 'layouts/submenu');
		$this->template->set_partial('search', 'layouts/search');
		$this->template->set_breadcrumb(_('Inicio'), site_url('/'));
		$this->template->set_breadcrumb(_('SciELO'));
		$this->template->set('class_method', $this->router->fetch_class().$this->router->fetch_method());
		$this->template->set('indicadores', $this->indicadoresSite);
		$this->template->set('colecciones', $this->colecciones['slug']);
		$this->template->set('areas', $this->areas['slug']);
		$this->template->set('ageRanges', $this->ageRanges);
		$this->template->set('docTypes', $this->docTypes['slug']);
	}

	public function index($indicador="")
	{
		$data = array();
		$data['indicador'] = $indicador;
		/*Vistas*/
		$data['page_title'] = $indicador != "" ? $this->indicadores[$indicador]['title'] : _('Indicadores bibliométricos');
		$this->template->set_partial('view_js', 'scielo/indicadores/index_js', $data, TRUE, FALSE);
		$this->template->title($indicador != "" ? _sprintf('Indicadores bibliométricos SciELO - %s', $this->indicadores[$indicador]['title']): _('Indicadores bibliométricos SciELO'));
		$this->template->css('css/jquery.slider.min.css');
		$this->template->css('css/colorbox.css');
		$this->template->js('js/jquery.slider.min.js');
		$this->template->js('js/jquery.serializeJSON.min.js');
		$this->template->js('js/colorbox.js');
		$this->template->js('assets/js/html2canvas.js');
		$this->template->js('assets/js/jquery.table2excel.min.js');
		$this->template->js('assets/js/highcharts/highcharts.js');
		$this->template->js('assets/js/highcharts-legend-highlighter.src.js');
		$this->template->js('assets/js/rgbcolor.js');
		$this->template->js('assets/js/StackBlur.js');
		$this->template->js('assets/js/canvg.js');
		$this->template->js('//www.google.com/jsapi');
		$this->template->set_meta('description', $data['page_title']);
		$this->template->set_breadcrumb(_('Indicadores bibliométricos'));
		$this->template->build('scielo/indicadores/index', $data);
	}

	public function getPeriodos($request=null){
		$this->output->enable_profiler(false);
		if($request != null):
			$data['periodos'] = range($request['periodo'][0], $request['periodo'][1]);
			return $data['periodos'];
		endif;

		$data = array();
		$query = NULL;
		
		switch ($_POST['indicador']) :
			case 'distribucion-articulos-coleccion':
			case 'distribucion-articulos-coleccion-area':
			case 'distribucion-articulos-coleccion-area-revista':
			case 'distribucion-articulos-coleccion-revista':
			case 'distribucion-articulos-coleccion-afiliacion':
			case 'distribucion-revista-coleccion':
			case 'citacion-articulos-edad':
			case 'citacion-articulos-edad-area':
			case 'citacion-articulos-edad-revista':
			case 'citacion-articulos-edad-afiliacion':
			case 'citacion-articulos-tipo':
			case 'citacion-articulos-tipo-area':
			case 'citacion-articulos-tipo-revista':
			case 'citacion-articulos-tipo-afiliacion':
				$query = $this->getPeriodosCollectionEdadTipoDoc();
				break;
			case 'indicadores-generales-revista':
				$query = $this->getPeriodosGeneral();
				break;
			default:
				break;
		endswitch;

		/*Realizando consulta*/
		$this->load->database('scielo');
		$query = $this->db->query($query);
		$rango = $query->row_array();
		$this->db->close();
		$anioBase = $rango['anioBase'];
		$anioFinal = $rango['anioFinal'];

		$data['result'] = true;
		$data['anioBase'] = (int)$anioBase;
		$data['anioFinal'] = (int)$anioFinal;
		if($this->preview)
			return $data;
		/*Generando escala*/
		$scale = array();
		$offset = $data['anioBase'];
		while ( $offset < $data['anioFinal']):	
			$scale[] = $offset;
			if($offset % 5 > 0):
				$offset += (5 - $offset % 5);
			else:
				$offset += 5;
				if($offset <= $data['anioFinal']):
					$scale[] = "|";
				endif;
			endif;
		endwhile;
		$scale[] = $data['anioFinal'];
		$data['scale'] = json_encode($scale, true);
		$heterogeneity = array();
		$scales = count($scale) - 1;
		foreach ($scale as $key => $value):
			if($value != $data['anioFinal'] && $value != $data['anioBase'] && $value != "|" && is_numeric($value)):
				$indice = $key;
				$porcentaje = number_format((($indice/$scales) * 100), 1, '.', '');
				$heterogeneity[] = "{$porcentaje}/{$value}";
			endif;
		endforeach;
		$data['heterogeneity'] = json_encode($heterogeneity, true);
		header('Content-Type: application/json');
		echo json_encode($data, true);
	}

	public function getChartData(){
		$this->output->enable_profiler(false);
		switch ($_POST['indicador']):
			case 'distribucion-articulos-coleccion':
				return $this->getChartCollection();
				break;
			case 'distribucion-articulos-coleccion-area':
			case 'distribucion-articulos-coleccion-area-revista':
			case 'distribucion-articulos-coleccion-revista':
			case 'distribucion-articulos-coleccion-afiliacion':
			case 'distribucion-revista-coleccion':
			case 'citacion-articulos-edad':
			case 'citacion-articulos-edad-area':
			case 'citacion-articulos-edad-revista':
			case 'citacion-articulos-edad-afiliacion':
			case 'citacion-articulos-tipo':
			case 'citacion-articulos-tipo-area':
			case 'citacion-articulos-tipo-revista':
			case 'citacion-articulos-tipo-afiliacion':
				return $this->getChartCollectionSub();
				break;
			case 'indicadores-generales-revista':
				return $this->getChartGeneral();
				break;
			default:
				break;
		endswitch;
	}

	public function getOptionData(){
		$this->output->enable_profiler(false);
		switch ($_POST['indicador']):
			case 'distribucion-articulos-coleccion':
				$this->getRevistaAfiliacionCollection();
				break;
			case 'distribucion-articulos-coleccion-area':
			case 'distribucion-articulos-coleccion-area-revista':
				$this->getRevistaCollectionArea();
				break;
			case 'indicadores-generales-revista':
				$this->getRevistasGeneral();
				break;
			case 'citacion-articulos-edad':
				$this->getRevistaAfiliacionEdad();
				break;
			case 'citacion-articulos-tipo':
				$this->getRevistaAfiliacionTipoDoc();
				break;
			case 'citaction-articulos-area-revista':
				$this->getRevistaArea();
				break;
			default:
				break;
		endswitch;
	}

	/*Gráficas*/
	public function getChartCollection()
	{
		$this->load->database();
		/*Convirtiendo el periodo en dos fechas*/
		$_POST['periodo'] = explode(";", $_POST['periodo']);
		/*Generamos el arreglo de periodos*/
		$periodos = $this->getPeriodos($_POST);
		/*Consulta para el indicador*/
		$indicador['distribucion-articulos-coleccion'] = array(
			'sql' => 'SELECT "networkId", anio, articulo, "otroDocumento" FROM "vNetworkDistributionPos"',
			'title' => '<div class="text-center nowrap"><h4>'._('Distribución de artículos por colección').'</h4></div>',
			'vTitle' => _('Documentos'),
			'hTitle' => _('Año'),
			'tooltip' => _('%s en la colección %s en el año %s: %s')
			);
		$query = $indicador[$_POST['indicador']]['sql'];
		$query .= " WHERE anio BETWEEN '{$_POST['periodo'][0]}' AND '{$_POST['periodo'][1]}'";
		$colecciones = array_keys($this->colecciones['slug']);
		if (isset($_POST['coleccion']) && count($_POST['coleccion']) > 0):
			$colecciones = $_POST['coleccion'];
		endif;
		$limit = 4;
		$queryOrder = ' ORDER BY position, anio';
		$data['journal'] = array();
		$groups = array_chunk($colecciones, $limit, TRUE);
		$data['table']['cols'][] = array('id' => 'year','label' => _('Colección'),'type' => 'string');
		$data['table']['cols'][] = array('id' => 'year','label' => _('Tipo'),'type' => 'string');
		foreach ($periodos as $periodo):
			$data['table']['cols'][] = array('id' => '','label' => $periodo, 'type' => 'number');
		endforeach;
		$tableRows = array();
		$series = array();
		$this->highcharts['barstack']['yAxis']['title'] = array('text' =>$indicador[$_POST['indicador']]['vTitle']);
		foreach ($groups as $key => $group):
			$data['highchart'][$key] = $this->highcharts['barstack'];
			$queryColeccion = " AND \"networkId\" IN (";
			$coleccionOffset=1;
			$coleccionTotal= count($group);
			foreach ($group as $coleccion):
				$queryColeccion .= "'{$this->colecciones['slug'][$coleccion]['id']}'";
				if($coleccionOffset < $coleccionTotal):
					$queryColeccion .=",";
				endif;
				$coleccionOffset++;
			endforeach;
			$queryColeccion .= ")";
			$queryRS = $this->db->query($query.$queryColeccion.$queryOrder);
			$totalRows = $queryRS->num_rows();
			foreach ($queryRS->result_array() as $row):
				$series[$key][$row['networkId']]['articulos'][] = parse_number($row['articulo']);
				$series[$key][$row['networkId']]['otroDocumento'][] = parse_number($row['otroDocumento']);
				if (!in_array($row['anio'], $data['highchart'][$key]['xAxis']['categories']))  
					$data['highchart'][$key]['xAxis']['categories'][] = $row['anio'];
				if(!isset($tableRows[$row['networkId']])):
					$tableRows[$row['networkId']] = array();
					$tableRows[$row['networkId']]['ca'][] = array('v' => _sprintf('SciELO %s', $this->colecciones['id'][$row['networkId']]['name']));
					$tableRows[$row['networkId']]['ca'][] = array('v' => _('Artículos originales'));
					$tableRows[$row['networkId']]['cb'][] = array('v' => '');
					$tableRows[$row['networkId']]['cb'][] = array('v' => _('Otro tipo de documetos'));
				endif;
				$tableRows[$row['networkId']]['ca'][] = array('v' => parse_number($row['articulo']), 'f' => _number_format($row['articulo']));
				$tableRows[$row['networkId']]['cb'][] = array('v' => parse_number($row['otroDocumento']), 'f' => _number_format($row['otroDocumento']));
				$offset++;
			endforeach;
		endforeach;
		$colors = $this->colors;
		foreach ($series as $groupk => $group):
			foreach ($group as $networkId => $serie):
				$color = array_shift($colors);
				array_push($colors, $color);
				$data['highchart'][$groupk]['series'][] = array(
						'name' => "SciELO {$this->colecciones['id'][$networkId]['name']}-otros",
						'data' => $serie['otroDocumento'],
						'stack' => slug($networkId),
						'showInLegend' => FALSE,
						'color' => adjustColorLightenDarken($color, -75)
					);
				$data['highchart'][$groupk]['series'][] = array(
						'name' => "SciELO {$this->colecciones['id'][$networkId]['name']}",
						'data' => $serie['articulos'],
						'stack' => slug($networkId),
						'color' => $color
					);
			endforeach;
		endforeach;
		foreach ($tableRows as $row):
			$data['table']['rows'][]['c'] = $row['ca'];
			$data['table']['rows'][]['c'] = $row['cb'];
		endforeach;
		/*Opciones para la tabla*/
		$data['tableOptions'] = array(
				'allowHtml' => true,
				'showRowNumber' => false,
				'sort' => 'disable',
				'cssClassNames' => array(
					'headerCell' => 'text-center',
					'tableCell' => 'text-left nowrap',
					)
			);
		$data['chartTitle'] = "<div class=\"text-center nowrap\"><h4>{$this->indicadores[$_POST['indicador']]['title']}</h4><h5><a href=\"http://www.scielo.org\" target=\"_blank\" class=\"scielo-update\"><span class=\"bl-scielo fa-2x\"></span> {$this->indicadores[$_POST['indicador']]['update']}</a></i></h5></div>";
		$data['tableTitle'] = "<h4 class=\"text-center\">{$this->indicadores[$_POST['indicador']]['title']}</h4>";
		if($this->preview)
			return $data['highchart'][0];
		header('Content-Type: application/json');	
		echo json_encode($data, true);
	}

	public function getChartCollectionSub()
	{
		$data = array();
		$labels = array();
		$series = array();
		$this->load->database();
		/*Convirtiendo el periodo en dos fechas*/
		$_POST['periodo'] = explode(";", $_POST['periodo']);
		/*Generamos el arreglo de periodos*/
		$periodos = $this->getPeriodos($_POST);
		
		/*Consulta para cada indicador*/
		$indicador['distribucion-articulos-coleccion-area'] = array(
			'sql' => "SELECT \"areaNetwork\" AS title, anio, articulos as valor FROM \"vNetworkAreaDistribution\"",
			'vTitle' => _('Artículos por área'),
			'hTitle' => _('Año'),
			'tooltip' => _('<b>{series.name}</b><br/>Número de artículos en el año {point.category}: <b>{point.y}</b>')
			);
		$indicador['distribucion-articulos-coleccion-area-revista'] = array(
			'sql' => "SELECT journal AS title, anio, articulos as valor FROM \"networkAreaJournalDistribution\"",
			'vTitle' => _('Artículos por área'),
			'hTitle' => _('Año'),
			'tooltip' => _('<b>{series.name}</b><br/>Número de artículos en el año {point.category}: <b>{point.y}</b>')
			);
		$indicador['distribucion-articulos-coleccion-revista'] = array(
			'sql' => "SELECT journal AS title, anio, articulos as valor FROM \"networkJournalDistribution\"",
			'vTitle' => _('Artículos por revista'),
			'hTitle' => _('Año'),
			'tooltip' => _('<b>{series.name}</b><br/>Número de artículos en el año {point.category}: <b>{point.y}</b>')
			);
		$indicador['distribucion-articulos-coleccion-afiliacion'] = array(
			'sql' => "SELECT \"affiliationNetwork\" AS title, anio, articulos as valor FROM \"vNetworkAffiliationDistribution\"",
			'vTitle' => _('Artículos por país de afiliación'),
			'hTitle' => _('Año'),
			'tooltip' => _('<b>{series.name}</b><br/>Número de artículos en el año {point.category}: <b>{point.y}</b>')
			);
		$indicador['distribucion-revista-coleccion'] = array(
			'sql' => "SELECT 'SciELO '||\"networkName\" AS title, anio, revistas as valor FROM \"vNetworkDistributionJ\"",
			'vTitle' => _('Revistas por coleccion'),
			'hTitle' => _('Año'),
			'tooltip' => _('<b>{series.name}</b><br/>Número de revistas en el año {point.category}: <b>{point.y}</b>')
			);
		$indicador['citacion-articulos-edad'] = array(
			'sql' => "SELECT \"rango\"||' "._('Años')."' AS title, anio, articulos as valor FROM \"ageDocCitation\"",
			'vTitle' => _('Número de artículos'),
			'hTitle' => _('Año'),
			'tooltip' => _('Edad del documento citado: <b>{series.name}</b><br/>Número de artículos publicados en el año {point.category}: <b>{point.y}</b>')
			);
		$indicador['citacion-articulos-edad-area'] = array(
			'sql' => "SELECT '"._('Área citante').": <b>'||\"areaName\"||'</b><br/>"._('Edad del documento citado').": <b>'||rango||' "._('Años')."</b>' AS title, anio, articulos as valor FROM \"vAgeDocAreaCitation\"",
			'vTitle' => _('Número de artículos'),
			'hTitle' => _('Año'),
			'tooltip' => _('{series.name}<br/>Número de artículos publicados en el año {point.category}: <b>{point.y}</b>')
			);
		$indicador['citacion-articulos-edad-revista'] = array(
			'sql' => "SELECT '"._('Revista citante').": <b>'||revista||'</b><br/>"._('Edad del documento citado').": <b>'||rango||' "._('Años')."</b>' AS title, anio, articulos as valor FROM \"ageDocJournalCitation\"",
			'vTitle' => _('Número de artículos'),
			'hTitle' => _('Año'),
			'tooltip' => _('{series.name}<br/>Número de artículos publicados en el año {point.category}: <b>{point.y}</b>')
			);
		$indicador['citacion-articulos-edad-afiliacion'] = array(
			'sql' => "SELECT '"._('País de afiliación citante').": <b>'||pais||'</b><br/>"._('Edad del documento citado').": <b>'||rango||' "._('Años')."</b>' AS title, anio, articulos as valor FROM \"ageDocAffiliationCitation\"",
			'vTitle' => _('Número de artículos'),
			'hTitle' => _('Año'),
			'tooltip' => _('{series.name}<br/>Número de artículos publicados en el año {point.category}: <b>{point.y}</b>')
			);
		$indicador['citacion-articulos-tipo'] = array(
			'sql' => "SELECT \"docTypeName\" AS title, anio, articulos as valor FROM \"vDocTypeDistribution\"",
			'vTitle' => _('Artículos citados por tipo de documento'),
			'hTitle' => _('Año'),
			'tooltip' => _('<b>Tipo de documento citado: {series.name}</b><br/>Número de artículos publicados en el año {point.category}: <b>{point.y}</b>')
			);
		$indicador['citacion-articulos-tipo-area'] = array(
			'sql' => "SELECT '"._('Área citante').": <b>'||\"areaName\"||'</b><br/>"._('Tipo de documento citado').": <b>'||\"docTypeName\"||'</b>' AS title, anio, articulos as valor FROM \"vDocTypeAreaCitation\"",
			'vTitle' => _('Número de artículos'),
			'hTitle' => _('Año'),
			'tooltip' => _('{series.name}<br/>Número de artículos publicados en el año {point.category}: <b>{point.y}</b>')
			);
		$indicador['citacion-articulos-tipo-revista'] = array(
			'sql' => "SELECT '"._('Revista citante').": <b>'||revista||'</b><br/>"._('Tipo de documento citado').": <b>'||\"docTypeName\"||'</b>' AS title, anio, articulos as valor FROM \"vDocTypeJournalCitation\"",
			'vTitle' => _('Número de artículos'),
			'hTitle' => _('Año'),
			'tooltip' => _('{series.name}<br/>Número de artículos publicados en el año {point.category}: <b>{point.y}</b>')
			);
		$indicador['citacion-articulos-tipo-afiliacion'] = array(
			'sql' => "SELECT "._('País de afiliación citante').": <b>'||pais||'</b><br/>"._('Tipo de documento citado').": <b>'||\"docTypeName\"||'</b>' AS title, anio, articulos as valor FROM \"vDocTypeAffiliationCitation\"",
			'vTitle' => _('Número de artículos'),
			'hTitle' => _('Año'),
			'tooltip' => _('{series.name}<br/>Número de artículos publicados en el año {point.category}: <b>{point.y}</b>')
			);

		$query = $indicador[$_POST['indicador']]['sql'];
		$query .= " WHERE anio BETWEEN '{$_POST['periodo'][0]}' AND '{$_POST['periodo'][1]}'";

		if (isset($_POST['coleccion'])):
			$labels[] = _('Colección');
			$query .= " AND \"networkId\" IN (";
			$offset=1;
			$total= count($_POST['coleccion']);
			foreach ($_POST['coleccion'] as $coleccion):
				$query .= "'{$this->colecciones['slug'][$coleccion]['id']}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif;

		if (isset($_POST['edad'])):
			$labels[] = _('Edad');
			$query .= " AND \"rango\" IN (";
			$offset=1;
			$total= count($_POST['edad']);
			foreach ($_POST['edad'] as $edad):
				$query .= "'{$edad}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif;

		if (isset($_POST['tipodoc'])):
			$labels[] = _('Tipo de documento');
			$query .= " AND \"docTypeId\" IN (";
			$offset=1;
			$total= count($_POST['tipodoc']);
			foreach ($_POST['tipodoc'] as $tipodoc):
				$query .= "'{$this->docTypes['slug'][$tipodoc]['id']}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif;
		
		if (isset($_POST['area'])):
			$labels[] = _('Area');
			$query .= " AND \"areaId\" IN (";
			$offset=1;
			$total= count($_POST['area']);
			foreach ($_POST['area'] as $area):
				$query .= "'{$this->areas['slug'][$area]['id']}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif;

		if (isset($_POST['revista'])):
			$labels[] = _('Revista');
			$query .= " AND \"revistaSlug\" IN (";
			$offset=1;
			$total= count($_POST['revista']);
			foreach ($_POST['revista'] as $revista):
				$query .= "'{$revista}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif;

		if (isset($_POST['paisAutor'])):
			$labels[] = _('Afiliación');
			$query .= " AND \"paisSlug\" IN (";
			$offset=1;
			$total= count($_POST['paisAutor']);
			foreach ($_POST['paisAutor'] as $paisAutor):
				$query .= "'{$paisAutor}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif;

		$data['dataTable']['cols'][] = array('id' => '', 'label' => implode(', ', $labels).'/'._('Año'), 'type' => 'string');
		$query = $this->db->query($query);
		$indicadores = array();
		foreach ($query->result_array() as $row ):
			$indicadores[$row['title']][$row['anio']] = round($row['valor'], 2);
		endforeach;
		/*Generando filas para gráfica y columnas para la tabla*/
		$setDataTableRows = false;
		$data['highchart'] = $this->highcharts['line'];
		$data['highchart']['yAxis']['title'] = array('text' => $indicador[$_POST['indicador']]['vTitle']);
		$data['highchart']['tooltip']['pointFormat'] = $indicador[$_POST['indicador']]['tooltip'];
		foreach ($periodos as $periodo):
			$data['highchart']['xAxis']['categories'][] = $periodo;
			$data['dataTable']['cols'][] = array('id' => '','label' => $periodo, 'type' => 'number');
			foreach ($indicadores as $kindicador => $vindicador):
				$series[$kindicador][] = parse_number($vindicador[$periodo]);
				/*dataTable rows*/
				if( ! $setDataTableRows ):
					$cc = array();
					$cc[] = array(
						'v' => $kindicador
					);
					foreach ($periodos as $periodoDT):
						$cc[] = array(
							'v' => parse_number($vindicador[$periodoDT]),
							'f' => _number_format($vindicador[$periodoDT]),
						);
					endforeach;
					$data['dataTable']['rows'][]['c'] = $cc;
				endif;
			endforeach;
			$setDataTableRows = true;
		endforeach;
		foreach ($series as $key => $value):
			$data['highchart']['series'][] = array(
					'name' => $key,
					'data' => $value
				);
		endforeach;

		/*Opciones para la tabla*/
		$data['tableOptions'] = array(
				'allowHtml' => true,
				'showRowNumber' => false,
				'sort' => 'disable',
				'cssClassNames' => array(
					'headerCell' => 'text-center',
					'tableCell' => 'text-left nowrap',
					)
			);
		/*Titulo de la gráfica*/
		$data['chartTitle'] = "<div class=\"text-center nowrap\"><h4>{$this->indicadores[$_POST['indicador']]['title']}</h4><h5><a href=\"http://www.scielo.org\" target=\"_blank\" class=\"scielo-update\"><span class=\"bl-scielo fa-2x\"></span> {$this->indicadores[$_POST['indicador']]['update']}</a></i></h5></div>";
		$data['tableTitle'] = "<h4 class=\"text-center\">{$this->indicadores[$_POST['indicador']]['title']}</h4>";
		if($this->preview)
			return $data['highchart'];
		header('Content-Type: application/json');
		echo json_encode($data, true);
	}

	public function getChartGeneral(){
		$data = array();
		$series = array();
		$charts = array(
			'fasciculos' => array('title' => 'Número de fascículos por revista', 'vTitle' => 'Fasciculos por revista', 'tooltip' => _('<b>{series.name}</b><br/>Número de fascículos en el año {point.category}: <b>{point.y}</b>')),
			'articulos' => array('title' => 'Número de artículos por revista', 'vTitle' => 'Artículos por revista', 'tooltip' => _('<b>{series.name}</b><br/>Número de artículos en el año {point.category}: <b>{point.y}</b>')), 
			'referencias' => array('title' => 'Número de referencias por revista', 'vTitle' => 'Referencias por revista', 'tooltip' => _('<b>{series.name}</b><br/>Número de referencias en el año {point.category}: <b>{point.y}</b>')), 
			'citas' => array('title' => 'Número de citas por revista', 'vTitle' => 'Citas por revista', 'tooltip' => _('<b>{series.name}</b><br/>Número de citas/autocitas en el año {point.category}: <b>{point.y}</b>')), 
			'factorImpacto' => array('title' => 'Factor de impacto por revista', 'vTitle' => 'Factor de impacto', 'tooltip' => _('<b>{series.name}</b><br/>Factor de impacto en el año {point.category}: <b>{point.y}</b>')),
			'indiceInmediatez' => array('title' => 'Índice de inmediatez por revista', 'vTitle' => 'Índice de inmediatez', 'tooltip' => _('<b>{series.name}</b><br/>Índice de inmediatez en el año {point.category}: <b>{point.y}</b>')),
			'vidaMedia' => array('title' => 'Vida media por revista', 'vTitle' => 'Vida media', 'tooltip' => _('<b>{series.name}</b><br/>Vida media en el año {point.category}: <b>{point.y}</b>'))
		);
		$data['update'] = "<h5><a href=\"http://www.scielo.org\" target=\"_blank\" class=\"scielo-update\"><span class=\"bl-scielo fa-2x\"></span> {$this->indicadores[$_POST['indicador']]['update']}</a></i></h5>";

		$tableCols = array(
				_('Año') => 'number',
				_('Colección') => 'string',
				_('Revista') => 'string',
				_('Fasciculos') => 'number',
				_('Artículos') => 'number',
				_('Referencias') => 'number',
				_('Citaciones') => 'number',
				_('Porcentaje de autocitación') => 'number',
				_('Factor de impacto') => 'number',
				_('Índice de inmediatez') => 'number',
				_('Vida media') => 'string'
			);
		foreach ($tableCols as $col => $type):
			$data['dataTable']['cols'][] = array('id' => '', 'label' => $col, 'type' => $type);
		endforeach;

		foreach ($charts as $key => $chart):
			$data['title'][$key] = $charts[$key]['title'];
			$data['highchart'][$key] = $this->highcharts['line'];
			if($key == "citas")
				$data['highchart'][$key] = $this->highcharts['barstack'];
			$data['highchart'][$key]['yAxis']['title'] = array('text' => $charts[$key]['vTitle']);
			$data['highchart'][$key]['tooltip']['pointFormat'] = $charts[$key]['tooltip'];
		endforeach;

		/*Convirtiendo el periodo en dos fechas*/
		$_POST['periodo'] = explode(";", $_POST['periodo']);
		/*Generamos el arreglo de periodos*/
		$periodos = $this->getPeriodos($_POST);

		$query = "SELECT * FROM \"indicadoresGeneralesRevista\" WHERE anio BETWEEN '{$_POST['periodo'][0]}' AND '{$_POST['periodo'][1]}'";
		if (isset($_POST['coleccion']) && count($_POST['coleccion']) > 0):
			$query .= " AND \"networkId\" IN (";
			$offset=1;
			$total= count($_POST['coleccion']);
			foreach ($_POST['coleccion'] as $coleccion):
				$query .= "'{$this->colecciones['slug'][$coleccion]['id']}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif;
		if (isset($_POST['revista']) && count($_POST['revista']) > 0):
			$query .= " AND \"revistaSlug\" IN (";
			$offset=1;
			$total= count($_POST['revista']);
			foreach ($_POST['revista'] as $revista):
				$query .= "'{$revista}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif;
		$this->load->database();
		$query = $this->db->query($query);
		$this->db->close();

		$indicadores = array();
		foreach ($query->result_array() as $row ):
			$indicadores[$row['journal']][$row['anio']] = $row;
		endforeach;

		/*Generando filas para gráficas y columnas para la tabla*/
		$setDataTableRows = false;
		foreach ($periodos as $periodo):
			foreach ($charts as $key => $chart):
				if (!in_array($periodo, $data['highchart'][$key]['xAxis']['categories']))  
					$data['highchart'][$key]['xAxis']['categories'][] = $periodo;
				foreach ($indicadores as $kindicador => $vindicador):
					$value = $vindicador[$periodo][$key];
					$tooltipv = $value;
					if(isset($series[$key][$kindicador]) || $value != NULL || count($_POST['revista']) > 1):
						switch ($key):
							case 'citas':
								$porcentajeAutocita = $vindicador[$periodo]['porcentajeAutoCita'] != NULL ? $vindicador[$periodo]['porcentajeAutoCita'] : 0;
								$citas = round($value * (1 - ($porcentajeAutocita / 100)));
								$autocitas = round($value * ($porcentajeAutocita / 100));
								$series[$key][$kindicador]['citas'][] = $citas;
								$series[$key][$kindicador]['autocitas'][] = $autocitas;
								break;
							case 'vidaMedia':
								$value = $value == '>10,0' ? 10.1 : $value;
							default:
									$series[$key][$kindicador][] = parse_number($value);
						endswitch;
					else:
						$data['highchart'][$key]['xAxis']['categories']=array();
					endif;
				endforeach;
			endforeach;
		endforeach;
		$colors = $this->colors;
		foreach ($series as $seriek => $chart):
			foreach ($chart as $key => $value):
				if($seriek == "citas"):
					$color = array_shift($colors);
					array_push($colors, $color);
					$data['highchart'][$seriek]['series'][] = array(
							'name' => $key."-autocitas",
							'data' => $value['autocitas'],
							'stack' => slug($key),
							'showInLegend' => FALSE,
							'color' => adjustColorLightenDarken($color, -75)
						);
					$data['highchart'][$seriek]['series'][] = array(
							'name' => $key,
							'data' => $value['citas'],
							'stack' => slug($key),
							'color' => $color
						);
				else:
					$data['highchart'][$seriek]['series'][] = array(
						'name' => $key,
						'data' => $value
					);
				endif;
			endforeach;
		endforeach;
		foreach ($indicadores as $journal):
			foreach ($journal as $periodo):
				$cc = array();
				$cc[] = array('v' => $periodo['anio']);
				$cc[] = array('v' =>  "SciELO ".$this->colecciones['id'][$periodo['networkId']]['name']);
				$cc[] = array('v' => $periodo['journal']);
				$cc[] = array('v' =>  $periodo['fasciculos']);
				$cc[] = array('v' =>  $periodo['articulos']);
				$cc[] = array('v' => $periodo['referencias']);
				$cc[] = array('v' => $periodo['citas']);
				$cc[] = array('v' => $periodo['porcentajeAutoCita']);
				$cc[] = array('v' => $periodo['factorImpacto']);
				$cc[] = array('v' => $periodo['indiceInmediatez']);
				$cc[] = array('v' => $periodo['vidaMedia']);
				$data['dataTable']['rows'][]['c'] = $cc;
			endforeach;
		endforeach;
		/*Opciones para la tabla*/
		$data['tableOptions'] = array(
				'allowHtml' => true,
				'showRowNumber' => false,
				'sort' => 'disable',	
				'cssClassNames' => array(
					'headerCell' => 'text-center',
					'tableCell' => 'text-left nowrap',
					)
			);
		$data['tableTitle'] = "<h4 class=\"text-center\">{$this->indicadores[$_POST['indicador']]['title']}</h4>";
		if($this->preview)
			return $data['highchart'];
		header('Content-Type: application/json');
		echo json_encode($data, true);
	}

	/*Periodos*/

	public function getPeriodosCollectionEdadTipoDoc(){
		$query = "";
		/*Consulta para cada indicador*/
		$indicadorTabla['distribucion-articulos-coleccion']="networkDistribution";
		$indicadorTabla['distribucion-articulos-coleccion-area']="networkAreaDistribution";
		$indicadorTabla['distribucion-articulos-coleccion-area-revista']="networkAreaJournalDistribution";
		$indicadorTabla['distribucion-articulos-coleccion-revista']="networkJournalDistribution";
		$indicadorTabla['distribucion-articulos-coleccion-afiliacion']="networkAffiliationDistribution";
		$indicadorTabla['distribucion-revista-coleccion']="networkDistribution";
		$indicadorTabla['citacion-articulos-edad']="ageDocCitation";
		$indicadorTabla['citacion-articulos-edad-area']="ageDocAreaCitation";
		$indicadorTabla['citacion-articulos-edad-revista']="ageDocJournalCitation";
		$indicadorTabla['citacion-articulos-edad-afiliacion']="ageDocAffiliationCitation";
		$indicadorTabla['citacion-articulos-tipo']="docTypeCitation";
		$indicadorTabla['citacion-articulos-tipo-area']="docTypeAreaCitation";
		$indicadorTabla['citacion-articulos-tipo-revista']="docTypeJournalCitation";
		$indicadorTabla['citacion-articulos-tipo-afiliacion']="docTypeAffiliationCitation";
		$query = "SELECT min(anio) AS \"anioBase\", max(anio) AS \"anioFinal\" FROM \"{$indicadorTabla[$_POST['indicador']]}\"";
		if (isset($_POST['coleccion']) && count($_POST['coleccion']) > 0):
			$query .= " WHERE \"networkId\" IN (";
			$offset=1;
			$total= count($_POST['coleccion']);
			foreach ($_POST['coleccion'] as $coleccion):
				$query .= "'{$this->colecciones['slug'][$coleccion]['id']}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif;

		if (isset($_POST['edad']) && count($_POST['edad']) > 0):
			$query .= " WHERE \"rango\" IN (";
			$offset=1;
			$total= count($_POST['edad']);
			foreach ($_POST['edad'] as $edad):
				$query .= "'{$edad}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif;

		if (isset($_POST['tipodoc']) && count($_POST['tipodoc']) > 0):
			$query .= " WHERE \"docTypeId\" IN (";
			$offset=1;
			$total= count($_POST['tipodoc']);
			foreach ($_POST['tipodoc'] as $tipodoc):
				$query .= "'{$this->docTypes['slug'][$tipodoc]['id']}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif;

		if (isset($_POST['area'])):
			$query .= " AND \"areaId\" IN (";
			$offset=1;
			$total= count($_POST['area']);
			foreach ($_POST['area'] as $area):
				$query .= "'{$this->areas['slug'][$area]['id']}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif; 

		if (isset($_POST['revista'])):
			$query .= " AND \"revistaSlug\" IN (";
			$offset=1;
			$total= count($_POST['revista']);
			foreach ($_POST['revista'] as $revista):
				$query .= "'{$revista}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif;

		if (isset($_POST['paisAutor'])):
			$query .= " AND \"paisSlug\" IN (";
			$offset=1;
			$total= count($_POST['paisAutor']);
			foreach ($_POST['paisAutor'] as $paisAutor):
				$query .= "'{$paisAutor}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif;

		return $query;
	}

	public function getPeriodosGeneral(){
		$query = "";
		$query = "SELECT min(anio) AS \"anioBase\", max(anio) AS \"anioFinal\" FROM \"indicadoresGeneralesRevista\"";
		if (isset($_POST['coleccion']) && count($_POST['coleccion']) > 0):
			$query .= " WHERE \"networkId\" IN (";
			$offset=1;
			$total= count($_POST['coleccion']);
			foreach ($_POST['coleccion'] as $coleccion):
				$query .= "'{$this->colecciones['slug'][$coleccion]['id']}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif;
		if (isset($_POST['revista']) && count($_POST['revista']) > 0):
			$query .= " AND \"revistaSlug\" IN (";
			$offset=1;
			$total= count($_POST['revista']);
			foreach ($_POST['revista'] as $revista):
				$query .= "'{$revista}'";
				if($offset < $total):
					$query .=",";
				endif;
				$offset++;
			endforeach;
			$query .= ")";
		endif;
		return $query;
	}

	/*Opciones*/
	public function getRevistaAfiliacionCollection(){
		$this->load->database();
		$offset=1;
		$total= count($_POST['coleccion']);
		$coleccionIN = "";
		foreach ($_POST['coleccion'] as $coleccion):
			$coleccionIN .= "'{$this->colecciones['slug'][$coleccion]['id']}'";
			if($offset < $total):
				$coleccionIN .=",";
			endif;
			$offset++;
		endforeach;
		$query = "SELECT \"networkId\", name, slug FROM \"vNetworkJournals\" WHERE \"networkId\" IN(${coleccionIN})";
		$query = $this->db->query($query);
		foreach ($query->result_array() as $row ):
			$data['revistas'][$this->colecciones['id'][$row['networkId']]['name']][$row['slug']] = htmlspecialchars($row['name']);
		endforeach;

		$query = "SELECT name, slug FROM \"vNetworksAffiliations\" WHERE \"networkId\" IN(${coleccionIN})";
		$query = $this->db->query($query);
		foreach ($query->result_array() as $row ):
			$data['paises'][$row['slug']] = htmlspecialchars($row['name']);
		endforeach;

		$this->db->close();
		header('Content-Type: application/json');
		echo json_encode($data, true);
	}

	public function getRevistaAfiliacionEdad(){
		$this->load->database();
		$offset=1;
		$total= count($_POST['edad']);
		$edadIN = "";
		foreach ($_POST['edad'] as $edad):
			$edadIN .= "'{$edad}'";
			if($offset < $total):
				$edadIN .=",";
			endif;
			$offset++;
		endforeach;
		$query = "SELECT revista, \"revistaSlug\" FROM \"ageDocJournalCitation\" WHERE \"rango\" IN(${edadIN}) ORDER BY \"revistaSlug\"";
		$query = $this->db->query($query);
		foreach ($query->result_array() as $row ):
			$data['revistas'][$row['revistaSlug']] = htmlspecialchars($row['revista']);
		endforeach;

		$query = "SELECT pais, \"paisSlug\" FROM \"ageDocAffiliationCitation\" WHERE \"rango\" IN(${edadIN}) ORDER BY \"paisSlug\"";
		$query = $this->db->query($query);
		foreach ($query->result_array() as $row ):
			$data['paises'][$row['paisSlug']] = htmlspecialchars($row['pais']);
		endforeach;

		$this->db->close();
		header('Content-Type: application/json');
		echo json_encode($data, true);
	}

	public function getRevistaAfiliacionTipoDoc(){
		$this->load->database();
		$offset=1;
		$total= count($_POST['tipodoc']);
		$tipodocIN = "";
		foreach ($_POST['tipodoc'] as $tipodoc):
			$tipodocIN .= "'{$this->docTypes['slug'][$tipodoc]['id']}'";
			if($offset < $total):
				$tipodocIN .=",";
			endif;
			$offset++;
		endforeach;
		$query = "SELECT revista, \"revistaSlug\" FROM \"docTypeJournalCitation\" WHERE \"docTypeId\" IN(${tipodocIN}) ORDER BY \"revistaSlug\"";
		$query = $this->db->query($query);
		foreach ($query->result_array() as $row ):
			$data['revistas'][$row['revistaSlug']] = htmlspecialchars($row['revista']);
		endforeach;

		$query = "SELECT pais, \"paisSlug\" FROM \"docTypeAffiliationCitation\" WHERE \"docTypeId\" IN(${tipodocIN}) ORDER BY \"paisSlug\"";
		$query = $this->db->query($query);
		foreach ($query->result_array() as $row ):
			$data['paises'][$row['paisSlug']] = htmlspecialchars($row['pais']);
		endforeach;

		$this->db->close();
		header('Content-Type: application/json');
		echo json_encode($data, true);
	}

	public function getRevistaCollectionArea(){
		$this->load->database();
		$offset=1;
		$total= count($_POST['coleccion']);
		$coleccionIN = "";
		foreach ($_POST['coleccion'] as $coleccion):
			$coleccionIN .= "'{$this->colecciones['slug'][$coleccion]['id']}'";
			if($offset < $total):
				$coleccionIN .=",";
			endif;
			$offset++;
		endforeach;
		$offset=1;
		$total= count($_POST['area']);
		$areaIN = "";
		foreach ($_POST['area'] as $area):
			$areaIN .= "'{$this->areas['slug'][$area]['id']}'";
			if($offset < $total):
				$areaIN .=",";
			endif;
			$offset++;
		endforeach;
		$query = "SELECT \"networkId\", \"areaId\", name, slug FROM \"vNetworkAreaJournals\" WHERE \"networkId\" IN({$coleccionIN}) AND \"areaId\" IN({$areaIN})";
		$query = $this->db->query($query);
		foreach ($query->result_array() as $row ):
			$networkName = $this->colecciones['id'][$row['networkId']]['name'];
			$areaName = $this->areas['id'][$row['areaId']]['name'];
			$data['revistas'][$networkName][$areaName][$row['slug']] = htmlspecialchars($row['name']);
		endforeach;

		$this->db->close();
		header('Content-Type: application/json');
		echo json_encode($data, true);
	}

	public function getRevistasGeneral(){
		$this->load->database();
		$offset=1;
		$total= count($_POST['coleccion']);
		$coleccionIN = "";
		foreach ($_POST['coleccion'] as $coleccion):
			$coleccionIN .= "'{$this->colecciones['slug'][$coleccion]['id']}'";
			if($offset < $total):
				$coleccionIN .=",";
			endif;
			$offset++;
		endforeach;
		$query = "SELECT \"networkId\", journal, \"revistaSlug\" FROM \"indicadoresGeneralesRevista\" WHERE \"networkId\" IN({$coleccionIN}) ORDER BY \"revistaSlug\"";
		$query = $this->db->query($query);
		foreach ($query->result_array() as $row ):
			$networkName = $this->colecciones['id'][$row['networkId']]['name'];
			$data['revistas'][$networkName][$row['revistaSlug']] = htmlspecialchars($row['journal']);
		endforeach;

		$this->db->close();
		header('Content-Type: application/json');
		echo json_encode($data, true);
	}

	public function preview(){
		$uri_string = uri_string();
		if (preg_match('%indicadores/(...+?)%', $uri_string)):
			if (preg_match('%indicadores/(.+?)(/.*|$)%', $uri_string)):
				$_POST['indicador']=preg_replace('%.+?/indicadores/(.+?)(/.*|$)%', '\1', $uri_string);
			endif;
			if (preg_match('%.*?/coleccion/(.+?)(/.*|$)%', $uri_string)):
				$_POST['coleccion']=preg_split('/[\s\/]+/', preg_replace('%.*?/coleccion/(.+?)(/area.*|/revista.*|/pais.*|/[0-9]{4}-[0-9]{4}|/preview\.png|$)%', '\1', $uri_string));
			endif;
			if (preg_match('%.*?/edad/(.+?)(/.*|$)%', $uri_string)):
				$_POST['edad']=preg_split('/[\s\/]+/', preg_replace('%.*?/edad/(.+?)(/area.*|/revista.*|/pais.*|/[0-9]{4}-[0-9]{4}|/preview\.png|$)%', '\1', $uri_string));
			endif;
			if (preg_match('%.*?/tipo-documento/(.+?)(/.*|$)%', $uri_string)):
				$_POST['tipodoc']=preg_split('/[\s\/]+/', preg_replace('%.*?/tipo-documento/(.+?)(/area.*|/revista/.*|/pais.*|/[0-9]{4}-[0-9]{4}|/preview\.png|$)%', '\1', $uri_string));
			endif;
			if (preg_match('%.*?/area/(.+?)(/.*|$)%', $uri_string)):
				$_POST['area']=preg_split('/[\s\/]+/', preg_replace('%.*?/area/(.+?)(/revista.*|/pais.*|/[0-9]{4}-[0-9]{4}|/preview\.png|$)%', '\1', $uri_string));
			endif;
			if (preg_match('%.*?/revista/(.+?)(/.*|$)%', $uri_string)):
				$_POST['revista']=preg_split('/[\s\/]+/',preg_replace('%.*?/revista/(.+?)(/area.*|/pais.*|/[0-9]{4}-[0-9]{4}|/preview\.png|$)%', '\1', $uri_string));
			endif;
			if (preg_match('%.*?/pais-revista/(.+?)(/.*|$)%', $uri_string)):
				$_POST['paisRevista']=preg_split('/[\s\/]+/', preg_replace('%.*?/pais-revista/(.+?)(/preview\.png|/.*|$)%', '\1', $uri_string));
			endif;
			if (preg_match('%.*?/pais-autor/(.+?)(/.*|$)%', $uri_string)):
				$_POST['paisAutor']=preg_split('/[\s\/]+/', preg_replace('%.*?/pais-autor/(.+?)(/area.*|/revista.*|/[0-9]{4}-[0-9]{4}|/preview\.png|$)%', '\1', $uri_string));
			endif;
			if (preg_match('%.*?/([0-9]{4})-([0-9]{4})%', $uri_string)):
				$_POST['periodo']=preg_replace('%.*?/([0-9]{4})-([0-9]{4})/preview\.png%', '\1;\2', $uri_string);
			endif;
			if(in_array($_POST['indicador'], array('distribucion-articulos-coleccion', 'citacion-articulos-edad', 'citacion-articulos-tipo'))):
				$sufix="";
				if(!empty($_POST['area']))
					$sufix = "-area";
				if(!empty($_POST['revista']))
					$sufix = "-revista";
				if(!empty($_POST['area']) && !empty($_POST['revista']))
					$sufix['indicador'] = "-area-revista";
				if(!empty($_POST['paisAutor']))
					$sufix = "-afiliacion";
				$_POST['indicador'] = "{$_POST['indicador']}{$sufix}";
			endif;
			$this->preview = TRUE;
		endif;
		if(!isset($_POST['periodo'])):
			$periodos = $this->getPeriodos();
			$_POST['periodo'] = "{$periodos['anioBase']};{$periodos['anioFinal']}";
		endif;
		$chartData = $this->getChartData();
		$title = array(
			'distribucion-articulos-coleccion' => _('Distribución de artículos por colección'),
			'distribucion-articulos-coleccion-area' => _('Distribución de artículos por colección y área'),
			'distribucion-articulos-coleccion-revista' => _('Distribución de artículos por revista'),
			'distribucion-articulos-coleccion-area-revista' => _('Distribución de artículos por revista'),
			'distribucion-articulos-coleccion-afiliacion' => _('Distribución de artículos por colección y país de afiliación'),
			'distribucion-revista-coleccion' => 'Distribución de revistas por colección',
			'indicadores-generales-revista' => array(),
			'citacion-articulos-edad' => _('Distribución de artículos por edad del documento citado'),
			'citacion-articulos-edad-area' => _('Distribución de artículos por edad del documento citado y área citante'),
			'citacion-articulos-edad-revista' => _('Distribución de artículos por edad del documento citado y revista citante'),
			'citacion-articulos-tipo' => _('Distribución de artículos por tipo del documento citado'),
			'citacion-articulos-tipo-area' => _('Distribución de artículos por tipo del documento citado y área citante'),
			'citacion-articulos-tipo-revista' => _('Distribución de artículos por tipo del documento citado y revista citante'),
			'citacion-articulos-tipo-afiliacion' => _('Distribución de artículos por tipo del documento citado y país de afiliación citante'),

		);
		if($_POST['indicador'] === "indicadores-generales-revista"):
			if(count($chartData['factorImpacto']['series']) > 0):
				$chartData = $chartData['factorImpacto'];
				$title['indicadores-generales-revista'] = _('Indicadores generales (FI)');
			else:
				$chartData = $chartData['articulos'];
				$title['indicadores-generales-revista'] = _('Número de artículos');
			endif;
		endif;
		/* Ajustando valores de la gráfica para la vista previa*/
		unset($chartData['subtitle'], $chartData['xAxis']['title']);
		foreach ($chartData['series'] as $key => $value):
			$chartData['series'][$key]['showInLegend'] = FALSE;
		endforeach;
		$chartData['yAxis']['title'] = '';
		$chartData['chart']['width'] = 400;
		$chartData['chart']['height'] = 250;
		if(isset($_GET['width'])):
			$wpercent = $_GET['width']/$chartData['chart']['width'];
			$chartData['chart']['width'] = 300*$wpercent;
			$chartData['chart']['height'] = 200*$wpercent;
		endif;
		$chartData['colors'] = $this->colors;
		$chartData['subtitle'] = array('text' => $title[$_POST['indicador']]);
		$hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
		$request = array(
				'infile' => json_encode($chartData),
				'type' => 'png',
				'rhost' => "{$_SERVER['REMOTE_ADDR']} ({$hostname})",
				'rurl'	=> $uri_string
			);

		$this->load->library('curl');
		$this->curl->post('http://127.0.0.1:3003', json_encode($request));
		$this->curl->setHeader('Content-Type', 'application/json');
		if ($this->curl->error) {
			echo 'Error: ' . $this->curl->error_code . ': ' . $this->curl->error_message;
		}else {
			header("Content-type: image/png");
			echo base64_decode($this->curl->response);
			exit(0);
		}
		echo "<pre>";
		var_dump($this->curl->request_headers);
		var_dump($this->curl->response_headers);
		$this->curl->close();
	}

	public function exportjs($issn=NULL){
		$this->output->enable_profiler(FALSE);
		header('Content-Type: application/javascript');
		$data = array('result' => FALSE);
		if ($issn != NULL):
			$this->load->library('curl');
			$this->curl->get(site_url("api/conacyt/indicadores.json/issn/{$issn}"));
			if (!$this->curl->error && !empty($this->curl->response)):
				$data['result'] = TRUE;
				$data['html_content'] = "";
				$indicators = (array)$this->curl->response->{$issn}->indicators;
				if(preg_match('/CONACYT/', $indicators[0]->title)):
					$indicator = array_shift($indicators);
					array_push($indicators, $indicator);
				endif;
				foreach ($indicators as $indicator):
					if(!preg_match('/Redalyc/', $indicator->title)):
						$htmlImg = "";
						if($indicator->img != NULL)
							$htmlImg = "<br/><img width='185' border='0' src='{$indicator->img}?width=250'/>";
						if(preg_match('/SciELO/', $indicator->title))
							$htmlImg = "<br/><img width='185' border='0' src='{$indicator->img}?width=300'/>";
						$data['html_content'] .= "<a href='{$indicator->url}'>{$indicator->title}{$htmlImg}</a><br/><br/>";
					endif;
				endforeach;
			endif;
		endif;
		$this->load->view('scielo/indicadores/exportjs', $data);
	}
	
	public function insertIP($pagina){
		$ip = $this->get_ip();
		$this->load->database();
		$query="Insert into ip_blacklist values(NOW()::timestamp::date, '" . $ip . "', '" . $pagina . "')";
		$this->db->query($query);
	}
        
	private function get_ip(){
		$realip = '';
		if ($_SERVER) {  
		   if ( $_SERVER["HTTP_X_FORWARDED_FOR"] ) {  
				   $realip = $_SERVER["HTTP_X_FORWARDED_FOR"];  
		   } elseif ( $_SERVER["HTTP_CLIENT_IP"] ) {  
				   $realip = $_SERVER["HTTP_CLIENT_IP"];  
		   } elseif ($_SERVER["REMOTE_ADDR"]){
				   $realip = $_SERVER["REMOTE_ADDR"];  
		   } else{
				   $realip = 'UNKNOWN';
		   }
		} else {  
				if ( getenv( 'HTTP_X_FORWARDED_FOR' ) ) {  
				   $realip = getenv( 'HTTP_X_FORWARDED_FOR' );  
				} elseif ( getenv( 'HTTP_CLIENT_IP' ) ) {  
				   $realip = getenv( 'HTTP_CLIENT_IP' );  
				} elseif (getenv( 'REMOTE_ADDR' )){  
				   $realip = getenv( 'REMOTE_ADDR' );  
				} else{
				   $realip = 'UNKNOWN';
				}
		}
		return $realip;
	}
	
	public function reviewIP($pagina){
		$ip = $this->get_ip(); // Obtener la IP del visitante

		// Lista de prefijos de IP denegadas
		$denied_ips = unserialize(IPsBlock);

		// Lista de IPs permitidas
		$pass_ips = [
			"148.204.63.19"
		];

		$blocked = false;

		foreach ($denied_ips as $prefix) {
			if (strpos($ip, $prefix) === 0) { // Si la IP empieza con un prefijo denegado
				// Verificamos si está en las excepciones
				$is_exception = false;
				foreach ($pass_ips as $pass) {
					if (strpos($ip, $pass) === 0) {
						$is_exception = true;
						break;
					}
				}

				if (!$is_exception) {
					$blocked = true;
					break;
				}
			}
		}

		if ($blocked) {
			#$this->insertIP('bloqueo ' . $pagina);
			redirect('error');
		}else{
			$this->insertIP($pagina);
		}
	}
}

/* End of file indicadores.php */
/* Location: ./application/controllers/indicadores.php */