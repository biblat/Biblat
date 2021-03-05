<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Indicadores extends CI_Controller {

	public $indicadores = array();
	public $disciplinas = array();
	public $queryFields="sistema,
					articulo,
					\"articuloSlug\",
					revista,
					\"revistaSlug\",
					\"paisRevista\",
					\"anioRevista\",
					volumen,
					numero,
					periodo,
					paginacion,
					url,
					\"autoresJSON\",
					\"institucionesJSON\"";

	public $soloPaisRevista = array('indice-coautoria', 'tasa-documentos-coautorados', 'grado-colaboracion', 'modelo-elitismo', 'indice-colaboracion', 'frecuencias-institucion-documento', 'frecuencias-institucion-documentoh', 'productividad-exogenah', 'coautoria-pais');
	public $soloPaisAutor = array('indice-coautoria', 'tasa-documentos-coautorados', 'indice-colaboracion');
	public $revistaHidden = array('indice-concentracion', 'productividad-exogena');
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
		$this->load->driver('minify');
		/*Variables globles*/
		$data = array();
		/*Highcharts config*/
		$this->highcharts['line'] = array(
			'chart' => array(
					'type' => 'line',
					'width' => 1000,
					'height' => 550,
					'backgroundColor' => 'transparent'
				),
			'title' => array('text' => null),
			'credits' => array(
					'href' => site_url('/'),
					'text' => _sprintf('Fuente: %s', 'biblat.unam.mx')
				),
			'yAxis' => array(
					'allowDecimals' => TRUE,
					'min' => 0,
					'title' => NULL,
					'labels' => array('format' => '{value}')
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
		$this->highcharts['column'] = $this->highcharts['line'];
		$this->highcharts['column']['chart']['type'] = "column";
		$this->highcharts['column']['xAxis'] = array('type' => 'category', 'title' => array('text' => _('Título de revista')));
		$this->highcharts['column']['legend'] = array('enabled' => FALSE);
		$this->highcharts['column']['series'][] = array(
						'name' => _('Revistas'),
						'colorByPoint' => TRUE
					);
		$this->highcharts['column']['plotOptions']['series']['dataLabels']['format'] = "{y:.4f}";
		$this->highcharts['areaspline'] = $this->highcharts['line'];
		$this->highcharts['areaspline']['chart']['type'] = "areaspline";
		$this->highcharts['areaspline']['xAxis'] = array('allowDecimals' => TRUE);
		$this->highcharts['areaspline']['plotOptions']['series']['dataLabels']['enabled'] = FALSE;
		$this->highcharts['areaspline']['plotOptions']['series']['marker']['enabled'] = FALSE;
		$this->highcharts['areaspline']['plotOptions']['series']['trackByArea'] = TRUE;
		$this->highcharts['treemap'] = $this->highcharts['line'];
		unset($this->highcharts['treemap']['chart']);
		unset($this->highcharts['treemap']['yAxis']);
		unset($this->highcharts['treemap']['xAxis']);
		unset($this->highcharts['treemap']['plotOptions']);
		unset($this->highcharts['treemap']['legend']);
		unset($this->highcharts['treemap']['tooltip']);
		/*v2*/
		$this->highcharts['treemap']['colorAxis'] =
			array(
				'minColor' => '#FFFFFF',
				'maxColor' => '#'.substr(md5(rand(1,1000)), 0, 6)
			);
		$this->highcharts['treemap']['series'] = 
		[array(
			'type' => 'treemap',
			#v1'layoutAlgorithm' => 'stripes',
			'layoutAlgorithm' => 'squarified',
			#v1'alternateStartingDirection' => true,
			'data' => [], 
			/*v1
			'levels' => [array(
				'level' => 1,
				'layoutAlgorithm' => 'sliceAndDice',
				'dataLabels' => array(
					'enabled' => true,
					'align' => 'left',
					'verticalAlign' => 'top',
					'style' => array(
						'fontSize' => '10px',
						'fontWeight' => 'bold'
					)
				)
			)]*/
		)];
		$this->highcharts['donut'] = $this->highcharts['line'];
		unset($this->highcharts['donut']['legend']);
		unset($this->highcharts['donut']['chart']);
		unset($this->highcharts['donut']['tooltip']);
		$this->highcharts['donut']['chart'] = array(
			'type' => 'pie',
			'width' => 1000,
                        'height' => 550,
                        'backgroundColor' => 'transparent',
			'options3d' => array(
				'enabled' => true,
				'alpha' => 45
			)
		);
		$this->highcharts['donut']['plotOptions'] = array(
			'pie' => array(
				'innerSize' => 100,
				'depth' => 45,
				'dataLabels' => array(
					'style' => array(
						'fontSize' => '10px'
					)
				)
			)
		);
                $this->highcharts['stackColumn'] = $this->highcharts['line'];
                $this->highcharts['stackColumn']['chart']['type'] = "column";
                //$this->highcharts['stackColumn']['chart']['type'] = "bar";
		$this->highcharts['stackColumn']['legend'] = array('enabled' => FALSE);
                $this->highcharts['stackColumn']['stackLabels']['enabled'] = TRUE;
		$this->highcharts['stackColumn']['plotOptions']['series']['dataLabels']['format'] = "{y:f}";
                $this->highcharts['stackColumn']['plotOptions']['column']['stacking'] = 'normal';
                //$this->highcharts['stackColumn']['plotOptions']['series']['stacking'] = 'normal';
                $this->highcharts['stackColumn']['yAxis'] = array('allowDecimals' => FALSE);
                $this->highcharts['columnDrillDown'] = $this->highcharts['stackColumn'];
                unset($this->highcharts['columnDrillDown']['plotOptions']['column']);
                unset($this->highcharts['columnDrillDown']['stackLabels']);
                unset($this->highcharts['columnDrillDown']['xAxis']);
                $this->highcharts['columnDrillDown']['xAxis']['type'] = "category";
                $this->highcharts['venn'] = $this->highcharts['line'];
                unset($this->highcharts['venn']['xAxis']);
                unset($this->highcharts['venn']['yAxis']);
                unset($this->highcharts['venn']['legend']);
                unset($this->highcharts['venn']['series']);
                $this->highcharts['venn']['series'][] = array(
                                                        'type' => 'venn',
                                                        'data' => []
                );
                //$this->highcharts['venn']['plotOptions'] = array('tooltip' => []);
                //$this->highcharts['stackColumn']['tooltip']['shared'] = TRUE;
		/*Lista de indicadores*/
		$this->indicadores = array(
								'indice-coautoria' => _('Índice de coautoría'),
								'tasa-documentos-coautorados' => _('Tasa de documentos coautorados'),
								'grado-colaboracion' => _('Grado de colaboración (Índice Subramanyan)'),
								'modelo-elitismo' => _('Modelo de elitismo (Price)'),
								'indice-colaboracion' => _('Índice de colaboración (Índice de Lawani)'),
								'indice-densidad-documentos' => _('Índice de densidad de documentos Zakutina y Priyenikova'),
								'indice-concentracion' => _('Índice de concentración (Índice Pratt)'),
								'modelo-bradford-revista' => _('Modelo de Bradford por revista'),
								'modelo-bradford-institucion' => _('Modelo de Bradford por institución (Afiliación del autor)'),
								'productividad-exogena' => _('Tasa de autoría exógena'),
								'productividad-exogenah' => _('Tasa anual de autoría exógena por país'),
								'frecuencias-institucion-documento' => _('Representación institucional'),
                                                                'frecuencias-institucion-documentoh' => _('Evolución de representación institucional'),
                                                                'coautoria-pais' => _('Coautoría por país')
							);
		/*Disciplinas*/
		$this->load->database();
		$query = "SELECT id_disciplina, disciplina, slug FROM \"mvDisciplina\"";
		$queryResult = $this->db->query($query);
		$disciplina = array();
		foreach ($queryResult->result_array() as $row):
			$disciplina['disciplina'] = $row['disciplina'];
			$disciplina['id_disciplina'] = $row['id_disciplina'];
			$disciplinas[$row['slug']] = $disciplina;
		endforeach;
		$this->disciplinas = $disciplinas;
		$this->db->close();

		$this->load->vars($data);

		$this->output->enable_profiler($this->config->item('enable_profiler'));
		$this->template->set_partial('biblat_js', 'javascript/biblat', array(), TRUE, FALSE);
		$this->template->set_partial('submenu', 'layouts/submenu');
		$this->template->set_partial('search', 'layouts/search');
		$this->template->set_breadcrumb(_('Inicio'), site_url('/'));
		$this->template->set_breadcrumb(_('Bibliometría'));
		$this->template->set('class_method', $this->router->fetch_class().$this->router->fetch_method());
		$this->template->set('disciplinas', $this->disciplinas);
		$this->template->set('indicadores', $this->indicadores);
	}

	public function index($indicador="")
	{
		$data = array();
		$data['indicador'] = $indicador;
		/*Vistas*/
		$data['page_title'] = $indicador != "" ? $this->indicadores[$indicador] : _('Indicadores bibliométricos');
		$this->template->set_partial('view_js', 'indicadores/index_js', $data, TRUE, FALSE);
		$this->template->title($indicador != "" ? _sprintf('Indicadores bibliométricos - %s', $this->indicadores[$indicador]) : _('Indicadores bibliométricos'));
		$this->template->css('css/jquery.slider.min.css');
		$this->template->css('css/colorbox.css');
		$this->template->js('js/jquery.slider.min.js');
		$this->template->js('js/jquery.serializeJSON.min.js');
		$this->template->js('js/colorbox.js');
		$this->template->js('assets/js/html2canvas.js');
		$this->template->js('//www.google.com/jsapi');
		$this->template->js('assets/js/jquery.table2excel.min.js');
		if( in_array($data['indicador'],array('frecuencias-institucion-documento','productividad-exogena','coautoria-pais')) ){
			$this->template->js('assets/js/highcharts/phantomjs/highcharts8.js');
                        $this->template->js('assets/js/highcharts/phantomjs/drilldown8.js');
                        $this->template->js('assets/js/highcharts/phantomjs/venn8.js');
                }else
			$this->template->js('assets/js/highcharts/highcharts.js');
		$this->template->js('assets/js/highcharts/phantomjs/treemap.js');
		if( in_array($data['indicador'],array('frecuencias-institucion-documento')) )
			$this->template->js('assets/js/highcharts/phantomjs/highcharts-3d8.js');
		else
			$this->template->js('assets/js/highcharts/phantomjs/highcharts-3d.js');
		$this->template->js('assets/js/highcharts-legend-highlighter.src.js');
		$this->template->js('assets/js/rgbcolor.js');
		$this->template->js('assets/js/StackBlur.js');
		$this->template->js('assets/js/canvg.js');
		$this->template->set_meta('description', $data['page_title']);
		$this->template->set_breadcrumb(_('Indicadores bibliométricos'));
		$this->template->build('indicadores/index', $data);
	}

	public function getChartData(){
		$this->output->enable_profiler(false);
		switch ($_POST['indicador']):
			case 'modelo-bradford-revista':
			case 'modelo-bradford-institucion':
				return $this->getChartDataBradford();
				break;
			case 'indice-concentracion':
			case 'productividad-exogena':
				return $this->getChartDataPrattExogena();
				break;
			case 'frecuencias-institucion-documento':                        
                        	return $this->getChartFrecuencias();
                                break;
                        case 'frecuencias-institucion-documentoh':
                                $args['h'] = true;
                                $args['drill'] = true;
                                return $this->getChartFrecuencias($args);
				break;
                        case 'productividad-exogenah':
                                $args['h'] = true;
                                $args['drill'] = false;
                                return $this->getChartFrecuencias($args);
				break;
                        case 'coautoria-pais':
                                return $this->getVennDiagram();
                                break;
			default:
				return $this->getChartDataLine();
				break;
		endswitch;
	}

	public function getChartDataLine(){
		$series = array();
		$this->load->database();
		/*Convirtiendo el periodo en dos fechas*/
		$_POST['periodo'] = explode(";", $_POST['periodo']);
		/*Generamos el arreglo de periodos*/
		$periodos = $this->getPeriodos($_POST);

		/*Consulta para cada indicador*/
		$indicador['indice-coautoria'] = array(
			'campoTabla' => "coautoria AS valor FROM \"mvIndiceCoautoriaPrice",
			'title' => array(
					'revista' => '<div class="text-center nowrap"><h4>'._('Índice de Coautoría').'</h4><br/>'._('Promedio de autores por artículo en la revista').'</div>',
					'paisRevista' => '<div class="text-center nowrap"><h4>'._('Índice de Coautoría').'</h4><br/>'._('Promedio de autores por artículo en las revistas del país').'</div>',
					'paisAutor' => '<div class="text-center nowrap"><h4>'._('Índice de Coautoría').'</h4><br/>'._('Promedio de autores por artículo en el país').'</div>'
				),
			'vTitle' => _('Índice de Coautoría'),
			'hTitle' => _('Año'),
			'tooltip' => array(
					'revista' => _('<b>{series.name}</b><br/>Promedio de autores por artículo en el año {point.category}: <b>{point.y}</b>'),
					'paisRevista' => _('<b>{series.name}</b><br/>Promedio de autores por artículo en las revistas del país en el año {point.category}: <b>{point.y}</b>'),
					'paisAutor' => _('<b>{series.name}</b><br/>Promedio de autores por artículo según país del autor año {point.category}: <b>{point.y}</b>'),
				)
			);
		$indicador['tasa-documentos-coautorados'] = array(
			'campoTabla' => "\"tasaCoautoria\" AS valor FROM \"mvTasaCoautoria",
			'title' => array(
					'revista' => '<div class="text-center nowrap"><h4>'._('Tasa de Documentos Coautorados').'</h4><br/>'._('Media de documentos con autoría múltiple por revista').'</div>',
					'paisRevista' => '<div class="text-center nowrap"><h4>'._('Tasa de Documentos Coautorados').'</h4><br/>'._('Media de documentos con autoría múltiple en las revistas del país').'</div>',
					'paisAutor' => '<div class="text-center nowrap"><h4>'._('Tasa de Documentos Coautorados').'</h4><br/>'._('Media de documentos con autoría múltiple en el país').'</div>',
				),
			'vTitle' => _('Tasa de documentos'),
			'hTitle' => _('Año'),
			'tooltip' => array(
					'revista' => _('<b>{series.name}</b><br/>Proporción de artículos en coautoría en el año {point.category}: <b>{point.y}</b>'),
					'paisRevista' => _('<b>{series.name}</b><br/>Proporción de artículos en coautoría en las revistas del país en el año {point.category}: <b>{point.y}</b>'),
					'paisAutor' => _('<b>{series.name}</b><br/>Proporción de artículos en coautoría en el país en el año {point.category}: <b>{point.y}</b>'),
				)
			);
		$indicador['grado-colaboracion'] = array(
			'campoTabla' => "subramayan AS valor FROM \"mvSubramayan",
			'title' => array(
					'revista' => '<div class="text-center nowrap"><h4>'._('Grado de Colaboración (Índice de Subramanyan)').'</h4><br/>'._('Proporción de artículos con autoría múltiple').'</div>',
					'paisRevista' => '<div class="text-center nowrap"><h4>'._('Grado de Colaboración (Índice de Subramanyan)').'</h4><br/>'._('Proporción de artículos con autoría múltiple en las revistas del país').'</div>',
				),
			'vTitle' => _('Grado de Colaboración'),
			'hTitle' => _('Año'),
			'tooltip' => array(
					'revista' => _('<b>{series.name}</b><br/>Proporción de artículos con autoría múltiple en el año {point.category}: <b>{point.y}</b>'),
					'paisRevista' => _('<b>{series.name}</b><br/>Proporción de artículos con autoría múltiple en las revistas del país en el año {point.category}: <b>{point.y}</b>')
				)
			);
		$indicador['modelo-elitismo'] = array(
			'campoTabla' => "price AS valor FROM \"mvIndiceCoautoriaPrice",
			'title' => array(
					'revista' => '<div class="text-center nowrap"><h4>'._('Modelo de Elitismo (Price)').'</h4><br/>'._('Grupo de autores más productivos por revista').'</div>',
					'paisRevista' => '<div class="text-center nowrap"><h4>'._('Modelo de Elitismo (Price)').'</h4><br/>Grupo de autores más productivos por revista</div>',
				),
			'vTitle' => _('Cantidad de autores'),
			'hTitle' => _('Año'),
			'tooltip' => array(
					'revista' => _('<b>{series.name}</b><br/>Cantidad de autores que conforman la elite en el año {point.category}: <b>{point.y}</b>'),
					'paisRevista' => _('<b>{series.name}</b><br/>Cantidad de autores que conforman la elite en el año {point.category}: <b>{point.y}</b>')
				)
			);
		$indicador['indice-colaboracion'] = array(
			'campoTabla' => "lawani AS valor FROM \"mvLawani",
			'title' => array(
					'revista' => '<div class="text-center nowrap"><h4>'._('Índice de Colaboración (Índice de Lawani)').'</h4><br/>'._('Peso promedio de autores por artículo.').'</div>',
					'paisRevista' => '<div class="text-center nowrap"><h4>'._('Índice de Colaboración (Índice de Lawani)').'</h4><br/>'._('Peso promedio del número de autores por artículo en las revistas del país').'</div>',
					'paisAutor' => '<div class="text-center nowrap"><h4>'._('Índice de Colaboración (Índice de Lawani)').'</h4><br/>'._('Peso promedio del número de autores por artículo en el país').'</div>'
				),
			'vTitle' => _('Índice de Colaboración'),
			'hTitle' => _('Año'),
			'tooltip' => array(
					'revista' => _('<b>{series.name}</b><br/>Proporción de coautores por artículo en el año {point.category}: <b>{point.y}</b>'),
					'paisRevista' => _('<b>{series.name}</b><br/>Proporción de coautores por artículo en las revistas del país en el año {point.category}: <b>{point.y}</b>'),
					'paisAutor' => _('<b>{series.name}</b><br/>Proporción de coautores por artículo en el país en el año {point.category}: <b>{point.y}</b>')
				)
			);
		$indicador['indice-densidad-documentos'] = array(
			'campoTabla' => "zakutina AS valor FROM \"mvZakutina",
			'title' => array(
					'revista' => '<div class="text-center nowrap"><h4>'._('Índice de Densidad de Documentos Zakutina y Priyenikova').'</h4><br/>'._('Títulos con mayor cantidad de artículos').'</div>'
				),
			'vTitle' => _('Índice de densidad'),
			'hTitle' => _('Año'),
			'tooltip' => array(
					'revista' => _('<b>{series.name}</b><br/>Cantidad de documentos por revista en el año {point.category}: <b>{point.y}</b>'),
				)
			);

		$selection = 'revista';
		if (isset($_POST['revista'])):
			$data['dataTable']['cols'][] = array('id' => '', 'label' => _('Revista/Año'), 'type' => 'string');
			$query = "SELECT revista AS title, anio, {$indicador[$_POST['indicador']]['campoTabla']}Revista\" WHERE \"revistaSlug\" IN (";
			$revistaOffset=1;
			$revistaTotal= count($_POST['revista']);
			foreach ($_POST['revista'] as $revista):
				$query .= "'{$revista}'";
				if($revistaOffset < $revistaTotal):
					$query .=",";
				endif;
				$revistaOffset++;
			endforeach;
			$query .=") AND anio BETWEEN '{$_POST['periodo'][0]}' AND '{$_POST['periodo'][1]}'";
		elseif (isset($_POST['paisRevista'])):
			$data['dataTable']['cols'][] = array('id' => '', 'label' => _('País/Año'), 'type' => 'string');
			$selection = 'paisRevista';
			$query = "SELECT \"paisRevista\" AS title, anio, {$indicador[$_POST['indicador']]['campoTabla']}PaisRevista\" WHERE \"paisRevistaSlug\" IN (";
			$paisOffset=1;
			$paisTotal= count($_POST['paisRevista']);
			foreach ($_POST['paisRevista'] as $pais):
				$query .= "'{$pais}'";
				if($paisOffset < $paisTotal):
					$query .=",";
				endif;
				$paisOffset++;
			endforeach;
			$query .=") AND anio BETWEEN '{$_POST['periodo'][0]}' AND '{$_POST['periodo'][1]}' AND id_disciplina='{$this->disciplinas[$_POST['disciplina']]['id_disciplina']}'";
		elseif (isset($_POST['paisAutor'])):
			$data['dataTable']['cols'][] = array('id' => '', 'label' => _('País/Año'), 'type' => 'string');
			$selection = 'paisAutor';
			$query = "SELECT \"paisAutor\" AS title, anio, {$indicador[$_POST['indicador']]['campoTabla']}PaisAutor\" WHERE \"paisAutorSlug\" IN (";
			$paisOffset=1;
			$paisTotal= count($_POST['paisAutor']);
			foreach ($_POST['paisAutor'] as $pais):
				$query .= "'{$pais}'";
				if($paisOffset < $paisTotal):
					$query .=",";
				endif;
				$paisOffset++;
			endforeach;
			$query .=") AND anio BETWEEN '{$_POST['periodo'][0]}' AND '{$_POST['periodo'][1]}' AND id_disciplina='{$this->disciplinas[$_POST['disciplina']]['id_disciplina']}'";
		endif;


		$query = $this->db->query($query);
		$indicadores = array();
		foreach ($query->result_array() as $row ):
			$indicadores[$row['title']][$row['anio']] = round($row['valor'], 2);
		endforeach;
		/*Generando filas para gráfica y columnas para la tabla*/
		$setDataTableRows = false;
		$data['highchart'] = $this->highcharts['line'];
		$data['highchart']['yAxis']['title'] = array('text' => $indicador[$_POST['indicador']]['vTitle']);
		$data['highchart']['tooltip']['pointFormat'] = $indicador[$_POST['indicador']]['tooltip'][$selection];
		foreach ($periodos as $periodo):
			$data['highchart']['xAxis']['categories'][] = $periodo;
			$data['dataTable']['cols'][] = array('id' => '','label' => $periodo, 'type' => 'string');
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
							'v' => _number_format($vindicador[$periodoDT])
						);
					endforeach;
					$data['dataTable']['rows'][]['c'] = $cc;
				endif;
			endforeach;
			$setDataTableRows = true;
		endforeach;
		foreach ($series as $key => $value):
			$data['highchart']['series'][] = array(
					'id' => slug($key),
					'name' => $key,
					'data' => $value
				);
		endforeach;

		/*Opciones para la tabla*/
		$data['tableOptions'] = array(
				'allowHtml' => true,
				'showRowNumber' => false,
				'cssClassNames' => array(
					'headerCell' => 'text-center',
					'tableCell' => 'text-left nowrap'
					)
			);
		/*Titulo de la gráfica*/
		$data['chartTitle'] = $indicador[$_POST['indicador']]['title'][$selection];
		$data['tableTitle'] = "<h4 class=\"text-center\">{$this->indicadores[$_POST['indicador']]}</h4>";
		if($this->preview)
			return $data['highchart'];
		header('Content-Type: application/json');
		echo json_encode($data, true);
	}

	public function getChartDataBradford(){
		$indicador['modelo-bradford-revista'] = array(
				'sufix' => "Revista",
				'title' => '<div class="text-center nowrap"><h4>'._('Modelo matemático de Bradford').'</h4><br/>'._('Distribución de artículos por revista').'</div>',
				'tableTitle' => '<h3>'._('Modelo matemático de Bradford').'</h3>',
				'hAxisTitle' => _('Logaritmo de la cantidad acumulada de títulos de revista'),
				'hAxisTitleGroup' => _('Títulos de revista'),
				'titleGroup' => '<div class="text-center nowrap"><h4>'._('Modelo matemático de Bradford').'</h4><br/>'._('Zona %s de revistas más productivas').'</div>',
				'tableTitleGroup' => '<h3>'._('Zona %s de revistas más productivas').'</h3>',
				'tooltip' => "<b>{series.name}</b><br/>Artículos: <b>{series.options.articles}</b><br/>Títulos de revista: <b>{series.options.titles}</b>",
				'tooltipGroup' => "<b>{point.name}</b><br/>Cantidad de artículos: <b>{point.y}</b>"
			);
		$indicador['modelo-bradford-institucion'] = array(
				'sufix' => "Institucion",
				'title' => '<div class="text-center nowrap"><h4>'._('Modelo matemático de Bradford').'</h4><br/>'._('Distribución de artículos por instituciones.').'</div>',
				'tableTitle' => '<h3>'._('Modelo matemático de Bradford por institución (afiliación del autor)').'</h3>',
				'hAxisTitle' => _('Logaritmo de la cantidad acumulada de instituciones'),
				'hAxisTitleGroup' => _('Institución'),
				'titleGroup' => '<div class="text-center nowrap"><h4>'._('Modelo matemático de Bradford por institución (afiliación del autor)').'</h4><br/>'._('Zona %s de instituciones más productivas por disciplina').'</div>',
				'tableTitleGroup' => '<h4>'._('Zona %s de instituciones más productivas por disciplina').'</h4>',
				'tooltip' => "<b>{series.name}</b><br/>Artículos: <b>{series.options.articles}</b><br/>Instituciones: <b>{series.options.titles}</b>",
				'tooltipGroup' => "<b>{point.name}</b><br/>Cantidad de artículos: <b>{point.y}</b>"
			);
		$idDisciplina=$this->disciplinas[$_POST['disciplina']]['id_disciplina'];
		$query = "SELECT articulos, frecuencia, \"articulosXfrecuenciaAcumulado\", \"logFrecuenciaAcumulado\" FROM \"vBradford{$indicador[$_POST['indicador']]['sufix']}\" WHERE id_disciplina={$idDisciplina}";
		$query = $this->db->query($query);
		/*Ultimo valor del arreglo*/
		$last = current(array_slice($query->result_array(), -1));
		$promedio = $last['articulosXfrecuenciaAcumulado']/3;
		$grupos = array();
		/*Variables para las gráficas*/
		$data = array();
		$data['highchart']['bradford'] = $this->highcharts['areaspline'];
		$data['highchart']['bradford']['xAxis']['title']['text'] = $indicador[$_POST['indicador']]['hAxisTitle'];
		$data['highchart']['bradford']['yAxis']['title']['text'] = _('Cantidad acumulada de artículos');
		$data['highchart']['bradford']['series'] = array(
				array('name' => _('Zona núcleo'), 'id' => 0),
				array('name' => _('Zona 2'), 'id' => 1),
				array('name' => _('Zona 3'), 'id' => 3),
			);
		$data['highchart']['bradford']['tooltip']['pointFormat'] = $indicador[$_POST['indicador']]['tooltip'];;
		/*Columnas de la tabla de bradford*/
		$data['table']['bradford']['cols'][] = array('id' => '','label' => _('Logaritmo de la cantidad acumulada de títulos de revista'),'type' => 'number');
		$data['table']['bradford']['cols'][] = array('id' => '','label' => _('Cantidad acumulada de artículos'),'type' => 'number');
		/*Generando filas*/
		$firstGroup = array(
				'2' => false,
				'3' => false
			);
		$rowNumber=0;
		/*Segmentando grupos*/
		foreach ($query->result_array() as $row):
			$articulosXfrecuenciaAcumulado = (int)$row['articulosXfrecuenciaAcumulado'];
			$articuloXfrecuencia = $row['articulos'] * $row['frecuencia'];
			if ($articulosXfrecuenciaAcumulado < $promedio):
				$grupos['1']['lim']['y'] = $articulosXfrecuenciaAcumulado;
				$data['highchart']['bradford']['series'][0]['titles'] += $row['frecuencia'];
				$data['highchart']['bradford']['series'][0]['articles'] = $articulosXfrecuenciaAcumulado;
			elseif ($articulosXfrecuenciaAcumulado > $promedio && ($articulosXfrecuenciaAcumulado - $promedio) < ($articuloXfrecuencia / 2)):
				$grupos['1']['lim']['y'] = $articulosXfrecuenciaAcumulado;
				$data['highchart']['bradford']['series'][0]['titles'] += $row['frecuencia'];
				$data['highchart']['bradford']['series'][0]['articles'] = $articulosXfrecuenciaAcumulado;
			elseif ($articulosXfrecuenciaAcumulado < ($promedio * 2)):
				$grupos['2']['lim']['y'] = $articulosXfrecuenciaAcumulado;
				$data['highchart']['bradford']['series'][1]['titles'] += $row['frecuencia'];
				$data['highchart']['bradford']['series'][1]['articles'] = $articulosXfrecuenciaAcumulado - $grupos['1']['lim']['y'];;
			elseif ($articulosXfrecuenciaAcumulado > ($promedio * 2) && ($articulosXfrecuenciaAcumulado - ($promedio * 2)) < ($articuloXfrecuencia / 2)):
				$grupos['2']['lim']['y'] = $articulosXfrecuenciaAcumulado;
				$data['highchart']['bradford']['series'][1]['titles'] += $row['frecuencia'];
				$data['highchart']['bradford']['series'][1]['articles'] = $articulosXfrecuenciaAcumulado - $grupos['1']['lim']['y'];;
			else:
				$grupos['3']['lim']['y'] = $articulosXfrecuenciaAcumulado;
				$data['highchart']['bradford']['series'][2]['titles'] += $row['frecuencia'];
				$data['highchart']['bradford']['series'][2]['articles'] = $articulosXfrecuenciaAcumulado - $grupos['2']['lim']['y'];
			endif;
		endforeach;
		/*Agregado columnas a la fila*/
		foreach ($query->result_array() as $row):
			$articulosXfrecuenciaAcumulado = (int)$row['articulosXfrecuenciaAcumulado'];
			$ct = array();
			$ct[] = array('v' => number_format($row['logFrecuenciaAcumulado'], 4, '.', ''));
			$ct[] = array('v' => $articulosXfrecuenciaAcumulado);
			if($articulosXfrecuenciaAcumulado <= $grupos['1']['lim']['y']):
				$data['highchart']['bradford']['series'][0]['data'][] = array(round($row['logFrecuenciaAcumulado'], 4), $articulosXfrecuenciaAcumulado);
			elseif ($articulosXfrecuenciaAcumulado <= $grupos['2']['lim']['y']):
				if(!$firstGroup['2']):
					$data['highchart']['bradford']['series'][0]['data'][] = array(round($row['logFrecuenciaAcumulado'], 4), $articulosXfrecuenciaAcumulado);
					$firstGroup['2'] = true;
					$rowNumber++;
				endif;
				$data['highchart']['bradford']['series'][1]['data'][] = array(round($row['logFrecuenciaAcumulado'], 4), $articulosXfrecuenciaAcumulado);
			else:
				if(!$firstGroup['3']):
					$data['highchart']['bradford']['series'][1]['data'][] = array(round($row['logFrecuenciaAcumulado'], 4), $articulosXfrecuenciaAcumulado);
					$firstGroup['3'] = true;
					$rowNumber++;
				endif;
				$data['highchart']['bradford']['series'][2]['data'][] = array(round($row['logFrecuenciaAcumulado'], 4), $articulosXfrecuenciaAcumulado);
			endif;
			$data['table']['bradford']['rows'][]['c'] = $ct;
			$rowNumber++;
		endforeach;
		/*Creando lista de revistas con su total de articulos agrupados según los límites calculados anteriormente*/
		$column = strtolower($indicador[$_POST['indicador']]['sufix']);
		$query = "SELECT {$column}, \"{$column}Slug\" AS slug, articulos FROM \"mvArticulosDisciplina{$indicador[$_POST['indicador']]['sufix']}\" WHERE id_disciplina={$idDisciplina} ORDER BY articulos DESC";
		$query = $this->db->query($query);
		$revistaInstitucion = array();
		foreach ($query->result_array() as $row) :
			$acumulado += $row['articulos'];
			$rowData['articulos'] = $row['articulos'];
			$rowData['slug'] = $row['slug'];
			if ($acumulado <= $grupos['1']['lim']['y']):
				$revistaInstitucion['1'][$row[$column]] = $rowData;
			elseif ($acumulado <= $grupos['2']['lim']['y']):
				$revistaInstitucion['2'][$row[$column]] = $rowData;
			else:
				$revistaInstitucion['3'][$row[$column]] = $rowData;
			endif;
		endforeach;
		/*Ordenando grupos alfabeticamnete*/
		//ksort($revistaInstitucion['1']);
		//ksort($revistaInstitucion['2']);
		//ksort($revistaInstitucion['3']);
		/*Datos para la gráfica del grupo1*/
		$data['highchart']['group1'] = $this->highcharts['column'];
		$data['highchart']['group1']['plotOptions']['series']['dataLabels']['format'] = "{y}";
		$data['highchart']['group1']['xAxis']['title'] = array('text' => $indicador[$_POST['indicador']]['hAxisTitleGroup']);
		$data['highchart']['group1']['yAxis']['title'] = array('text' => _('Cantidad de artículos'));
		$data['highchart']['group1']['tooltip']['pointFormat'] = $indicador[$_POST['indicador']]['tooltipGroup'];
		$data['highchart']['group2'] = $data['highchart']['group1'];
		/*Columnas de la tabla del grupo1*/
		$data['table']['group1']['cols'][] = array('id' => '','label' => _('Título de revista'),'type' => 'string');
		$data['table']['group1']['cols'][] = array('id' => '','label' => _('Cantidad de artículos'),'type' => 'number');
		/*Agregado filas y columnas*/
		foreach ($revistaInstitucion['1'] as $label => $value):
			$data['highchart']['group1']['series'][0]['data'][] = array(
					'id' => $value['slug'],
					'name' => $label,
					'y' => parse_number($value['articulos'])
				);
			/*Agregando filas a la tabla*/
			$ct = array();
			$ct[] = array('v' => $label);
			$ct[] = array('v' => (int)$value['articulos']);
			$data['table']['group1']['rows'][]['c'] = $ct;
		endforeach;
		/*Datos para la gráfica del grupo2*/
		/*Columnas de la tabla del grupo2*/
		$data['table']['group2']['cols'][] = array('id' => '','label' => _('Título de revista'),'type' => 'string');
		$data['table']['group2']['cols'][] = array('id' => '','label' => _('Cantidad de artículos'),'type' => 'number');
		/*Agregado filas y columnas*/
		foreach ($revistaInstitucion['2'] as $label => $value):
			$data['highchart']['group2']['series'][0]['data'][] = array(
					'id' => $value['slug'],
					'name' => $label,
					'y' => parse_number($value['articulos'])
				);
			/*Agregando filas a la tabla*/
			$ct = array();
			$ct[] = array('v' => $label);
			$ct[] = array('v' => (int)$value['articulos']);
			$data['table']['group2']['rows'][]['c'] = $ct;
		endforeach;
		/*Columnas de la tabla del grupo3*/
		$data['table']['group3']['cols'][] = array('id' => '','label' => _('Título de revista'),'type' => 'string');
		$data['table']['group3']['cols'][] = array('id' => '','label' => _('Cantidad de artículos'),'type' => 'number');
		/*Agregado filas y columnas*/
		foreach ($revistaInstitucion['3'] as $label => $value):
			/*Agregando filas a la tabla*/
			$ct = array();
			$ct[] = array('v' => $label);
			$ct[] = array('v' => (int)$value['articulos']);
			$data['table']['group3']['rows'][]['c'] = $ct;
		endforeach;

		$data['last'] = $last;
		$data['revistaInstitucion'] = $revistaInstitucion;
		$data['title']['bradford'] = $indicador[$_POST['indicador']]['title'];
		$data['title']['group1'] = _sprintf($indicador[$_POST['indicador']]['titleGroup'], "núcleo");
		$data['title']['group2'] = _sprintf($indicador[$_POST['indicador']]['titleGroup'], "2");
		$data['table']['title']['bradford'] = $indicador[$_POST['indicador']]['tableTitle'];
		$data['table']['title']['group1'] = _sprintf($indicador[$_POST['indicador']]['tableTitleGroup'], "núcleo");
		$data['table']['title']['group2'] = _sprintf($indicador[$_POST['indicador']]['tableTitleGroup'], "2");
		$data['table']['title']['group3'] = _sprintf($indicador[$_POST['indicador']]['tableTitleGroup'], "3");
		/*Opciones para la tabla*/
		$data['tableOptions'] = array(
				'allowHtml' => true,
				'showRowNumber' => false,
				'cssClassNames' => array(
					'headerCell' => 'text-center',
					'tableCell' => 'text-left nowrap'
					)
			);
		$data['tblGrpOpt'] = array(
				'allowHtml' => true,
				'showRowNumber' => true,
				'cssClassNames' => array(
					'headerCell' => 'text-center',
					'tableCell' => 'text-left nowrap'
					)
			);
		if($this->preview)
			return $data['highchart'];
		header('Content-Type: application/json');
		echo json_encode($data, true);
	}

	public function getChartDataPrattExogena($limit=10){
		//$limit *= 2;
		$data = array();
                /*Convirtiendo el periodo en dos fechas*/
		$_POST['periodo'] = explode(";", $_POST['periodo']);
		/*Generamos el arreglo de periodos*/
		$periodos = $this->getPeriodos($_POST);
                $data['periodo'] = $periodos;
                $total=count($periodos);
                $queryPeriodos = "";
                if($periodos[0] > 0 ){
                    $offset=1;
                    $queryPeriodos .=" and anio in(";
                    foreach ($periodos as $p):
                        $queryPeriodos .= "'{$p}'";
                        if($offset < $total):
                                $queryPeriodos .=",";
                        endif;
                        $offset++;
                    endforeach;
                    $queryPeriodos .=")";
                }
                $data['periodo'] = $periodos;
		$idDisciplina=$this->disciplinas[$_POST['disciplina']]['id_disciplina'];
		$indicador['indice-concentracion'] = array(
				'sql' => "SELECT revista, \"revistaSlug\", pratt AS indicador FROM \"mvPratt\" WHERE id_disciplina={$idDisciplina}",
				'title' => _('Índice de concentración temática'),
				'chartTitle' => '<div id="chartTitle"><div class="text-center nowrap"><h4>'._('Índice de concentración (Índice de Pratt)').'</h4><br/>'._('Distribución decreciente de las revistas considerando su grado de concentración temática').'</div></div>',
				'tooltip' => "<b>{point.name}</b><br/>Nivel de especialización de la revista: <b>{point.y}</b>"
			);
		$indicador['productividad-exogena'] = array(
				'sql' => "SELECT revista, \"revistaSlug\", sum(autores)/sum(documentos) AS indicador FROM \"mvProductividadExogenaAnioRevista\" WHERE id_disciplina={$idDisciplina} {$queryPeriodos} group by revista, \"revistaSlug\"",
				'title' => _('Proporción de autoría exógena'),
				'chartTitle' => '<div id="chartTitle" class="text-center nowrap"><h4>'._('Tasa de autoría exógena').'</h4><br/>'._('Distribución decreciente de las revistas considerando la proporción de autoría exógena').'</div>',
				'tooltip' => "<b>{point.name}</b><br/>Proporción de autores extranjeros: <b>{point.y}</b>"
			);
		$query = $indicador[$_POST['indicador']]['sql'];
		if (isset($_POST['revista'])):
			$revistaTotal= count($_POST['revista']);
			if( $revistaTotal > 1 ):
				$query .= " AND \"revistaSlug\" IN (";
				$revistaOffset=1;
				foreach ($_POST['revista'] as $revista):
					$query .= "'{$revista}'";
					if($revistaOffset < $revistaTotal):
						$query .=",";
					endif;
					$revistaOffset++;
				endforeach;
				$query .= ")";
			endif;
		endif;
		$query .= " ORDER BY indicador DESC";
		$query = $this->db->query($query);
		$offset = 0;
		$grupo = 0;
		$c = array();
		$data['highchart'] = array();
		$totalRows = $query->num_rows();
		$first = current(array_slice($query->result_array(), 0));
		$vAxisMax = round($first['indicador'], 1) + 1/10;
		$data['table']['cols'][] = array('id' => '','label' => _('Título de revista'),'type' => 'string');
		$data['table']['cols'][] = array('id' => '','label' => $indicador[$_POST['indicador']]['title'],'type' => 'number');
		$series = array();
		foreach ($query->result_array() as $key => $row):
			if(!isset($data['highchart'][$grupo])):
				$data['highchart'][$grupo] = $this->highcharts['column'];
				$data['highchart'][$grupo]['tooltip']['pointFormat'] = $indicador[$_POST['indicador']]['tooltip'];
				$data['highchart'][$grupo]['yAxis']['max'] = $vAxisMax;
			endif;
			if ( isset($_POST['revista']) and count($_POST['revista']) == 1 and $row['revistaSlug'] == $_POST['revista'][0] ):
				$data['highchart'][$grupo]['series'][0]['data'][] = array(
					'id' => $row['revistaSlug'],
					'name' => $row['revista'],
					'y' => round($row['indicador'], 4),
					'dataLabels' => array(
						'borderColor' => 'blue',
						'borderWidth' => 2
						)
				);			
				$data['highchart'][$grupo]['selected'] = true;
			else:
				$data['highchart'][$grupo]['series'][0]['data'][] = array(
					'id' => $row['revistaSlug'],
					'name' => $row['revista'],
					'y' => round($row['indicador'], 4)
				);
			endif;
			$data['journal'][$grupo][] = $row['revistaSlug'];
			$offset++;
			/*Filas de la tabla*/
			$cc = array();
			$cc[] = array('v' => $row['revista']);
			$cc[] = array('v' => number_format($row['indicador'], 4, '.', ''));
			$data['table']['rows'][]['c'] = $cc;
			if($offset == $limit || $offset == $totalRows):
				$offset = 0;
				$totalRows -= $limit;
				$grupo++;
			endif;
		endforeach;
		/*Opciones para la tabla*/
		$data['tableOptions'] = array(
				'allowHtml' => true,
				'showRowNumber' => false,
				'cssClassNames' => array(
					'headerCell' => 'text-center',
					'tableCell' => 'text-left nowrap'
					)
			);
		$data['chartTitle'] = $indicador[$_POST['indicador']]['chartTitle'];
		$data['tableTitle'] = "<h4 class=\"text-center\">{$this->indicadores[$_POST['indicador']]}</h4>";
		if($this->preview)
			return $data['highchart'];
		header('Content-Type: application/json');
		echo json_encode($data, true);

	}

	public function getFrecuencias($revista){
		$this->output->enable_profiler(false);
		$idDisciplina=$this->disciplinas[$_POST['disciplina']]['id_disciplina'];
		switch ($_POST['indicador']):
			case 'indice-concentracion':
				$query = "SELECT \"descriptoresJSON\", \"frecuenciaDescriptorJSON\" FROM \"mvPratt\" WHERE id_disciplina={$idDisciplina} AND \"revistaSlug\"='{$revista}'";
				$query = $this->db->query($query);
				$row = $query->row_array();
				$descriptores = json_decode($row['descriptoresJSON']);
				$frecuencias = json_decode($row['frecuenciaDescriptorJSON']);
				$data = array();
				$data['table']['cols'][] = array('id' => '','label' => _('Descriptor'),'type' => 'string');
				$data['table']['cols'][] = array('id' => '','label' => _('Frecuencia'),'type' => 'number');
				foreach ($descriptores as $key => $value):
					$c = array();
					$c[] = array('v' => $value);
					$c[] = array('v' => $frecuencias[$key]);
					$data['table']['rows'][]['c'] = $c;
				endforeach;
				break;

			case 'productividad-exogena':
				$query = "SELECT \"paisAutor\", \"autores\" FROM \"mvAutoresRevistaPais\" WHERE \"revistaSlug\"='{$revista}' ORDER BY autores DESC, \"paisAutor\"";
				$query = $this->db->query($query);
				$row = $query->row_array();
				$data = array();
				$data['table']['cols'][] = array('id' => '','label' => _('País'),'type' => 'string');
				$data['table']['cols'][] = array('id' => '','label' => _('Frecuencia'),'type' => 'number');
				foreach ($query->result_array() as $row ):
					$c = array();
					$c[] = array('v' => $row['paisAutor']);
					$c[] = array('v' => $row['autores']);
					$data['table']['rows'][]['c'] = $c;
				endforeach;
				break;
		endswitch;
		/*Opciones para la tabla*/
		$data['tableOptions'] = array(
				'allowHtml' => true,
				'showRowNumber' => false,
				'cssClassNames' => array(
					'headerCell' => 'text-center',
					'tableCell' => 'text-left nowrap'
					)
			);
		header('Content-Type: application/json');
		echo json_encode($data, true);
	}

	public function getRevistasPaises(){
		$this->output->enable_profiler(false);
		$data = array();

		/*Revistas en disciplina*/
		$indicadorTabla['indice-coautoria']="CoautoriaPriceZakutina";
		$indicadorTabla['tasa-documentos-coautorados']="TasaLawani";
		$indicadorTabla['grado-colaboracion']="Subramayan";
		$indicadorTabla['modelo-elitismo']="CoautoriaPriceZakutina";
		$indicadorTabla['indice-colaboracion']="TasaLawani";
		$indicadorTabla['indice-densidad-documentos']="CoautoriaPriceZakutina";
		$indicadorTabla['indice-concentracion']="mvPratt";
		$indicadorTabla['modelo-bradford-revista']="";
		$indicadorTabla['modelo-bradford-institucion']="";
		$indicadorTabla['productividad-exogena']="mvProductividadExogena";
		$indicadorTabla['frecuencias-institucion-documento']="CoautoriaPriceZakutina";
                $indicadorTabla['frecuencias-institucion-documentoh']="CoautoriaPriceZakutina";
                $indicadorTabla['productividad-exogenah']="CoautoriaPriceZakutina";
                $indicadorTabla['coautoria-pais']="CoautoriaPriceZakutina";

		$this->load->database();
		if(in_array($_POST['indicador'], $this->revistaHidden)):
			$query = "SELECT revista, \"revistaSlug\" FROM \"{$indicadorTabla[$_POST['indicador']]}\" WHERE id_disciplina='{$this->disciplinas[$_POST['disciplina']]['id_disciplina']}'";
		else:
			$query = "SELECT revista, \"revistaSlug\" FROM \"mvPeriodosRevista{$indicadorTabla[$_POST['indicador']]}\" WHERE id_disciplina='{$this->disciplinas[$_POST['disciplina']]['id_disciplina']}'";
		endif;
		$query = $this->db->query($query);
		foreach ($query->result_array() as $row ):
			$revista = array(
					'val' => $row['revistaSlug'],
					'text' => htmlspecialchars($row['revista'])
				);
			$data['revistas'][] = $revista;
		endforeach;
		if(in_array($_POST['indicador'], $this->soloPaisRevista)):
			$query = "SELECT \"paisRevista\", \"paisRevistaSlug\" FROM \"mvPeriodosPaisRevista{$indicadorTabla[$_POST['indicador']]}\" WHERE id_disciplina='{$this->disciplinas[$_POST['disciplina']]['id_disciplina']}'";
			$query = $this->db->query($query);
			foreach ($query->result_array() as $row ):
				$revista = array(
						'val' => $row['paisRevistaSlug'],
						'text' => htmlspecialchars($row['paisRevista'])
					);
				$data['paisesRevistas'][] = $revista;
			endforeach;
		endif;

		if(in_array($_POST['indicador'], $this->soloPaisAutor)):
			$query = "SELECT \"paisAutor\", \"paisAutorSlug\" FROM \"mvPeriodosPaisAutor{$indicadorTabla[$_POST['indicador']]}\" WHERE id_disciplina='{$this->disciplinas[$_POST['disciplina']]['id_disciplina']}'";
			$query = $this->db->query($query);
			foreach ($query->result_array() as $row ):
				$revista = array(
						'val' => $row['paisAutorSlug'],
						'text' => htmlspecialchars($row['paisAutor'])
					);
				$data['paisesAutores'][] = $revista;
			endforeach;
		endif;

		$this->db->close();
		header('Content-Type: application/json');
		echo json_encode($data, true);
	}

	public function getPeriodos($request=null){
		$this->output->enable_profiler(false);
		if($request != null):
			$data['periodos'] = range($request['periodo'][0], $request['periodo'][1]);
			return $data['periodos'];
		endif;

		$data = array();
		$this->load->database();
		$query = "";
		/*Periodos por revista*/
		/*Consulta para cada indicador*/
		$indicadorTabla['indice-coautoria']="mvIndiceCoautoriaPrice";
		$indicadorTabla['tasa-documentos-coautorados']="mvTasaCoautoria";
		$indicadorTabla['grado-colaboracion']="mvSubramayan";
		$indicadorTabla['modelo-elitismo']="mvIndiceCoautoriaPrice";
		$indicadorTabla['indice-colaboracion']="mvLawani";
		$indicadorTabla['indice-densidad-documentos']="mvZakutina";
		$indicadorTabla['indice-concentracion']="";
		$indicadorTabla['modelo-bradford-revista']="";
		$indicadorTabla['modelo-bradford-institucion']="";
		$indicadorTabla['productividad-exogena']="mvProductividadExogenaAnio";
		$indicadorTabla['productividad-exogenah']="mvProductividadExogenaAnioPais";
		$indicadorTabla['frecuencias-institucion-documento']="mvFrecuenciaInstitucionAnio";
		$indicadorTabla['frecuencias-institucion-documentoh']="mvFrecuenciaInstitucionAnio";
		$indicadorTabla['coautoria-pais']="mvDocumentosCoautoria";


		if (isset($_POST['revista'])):
			$query = "SELECT min(anio) AS \"anioBase\", max(anio) AS \"anioFinal\" FROM \"{$indicadorTabla[$_POST['indicador']]}Revista\" WHERE \"revistaSlug\" IN (";
			$revistaOffset=1;
			$revistaTotal= count($_POST['revista']);
			foreach ($_POST['revista'] as $revista):
				$query .= "'{$revista}'";
				if($revistaOffset < $revistaTotal):
					$query .=",";
				endif;
				$revistaOffset++;
			endforeach;
			$query .= ")";
		elseif (isset($_POST['paisRevista']) && in_array($_POST['indicador'], $this->soloPaisRevista)):
			$query = "SELECT min(anio) AS \"anioBase\", max(anio) AS \"anioFinal\" FROM \"{$indicadorTabla[$_POST['indicador']]}PaisRevista\" WHERE \"paisRevistaSlug\" IN (";
			$paisOffset=1;
			$paisTotal= count($_POST['paisRevista']);
			foreach ($_POST['paisRevista'] as $pais):
				$query .= "'{$pais}'";
				if($paisOffset < $paisTotal):
					$query .=",";
				endif;
				$paisOffset++;
			endforeach;
			$query .= ") AND id_disciplina='{$this->disciplinas[$_POST['disciplina']]['id_disciplina']}'";
		elseif (isset($_POST['paisAutor']) && in_array($_POST['indicador'], $this->soloPaisAutor)):
			$query = "SELECT min(anio) AS \"anioBase\", max(anio) AS \"anioFinal\" FROM \"{$indicadorTabla[$_POST['indicador']]}PaisAutor\" WHERE \"paisAutorSlug\" IN (";
			$paisOffset=1;
			$paisTotal= count($_POST['paisAutor']);
			foreach ($_POST['paisAutor'] as $pais):
				$query .= "'{$pais}'";
				if($paisOffset < $paisTotal):
					$query .=",";
				endif;
				$paisOffset++;
			endforeach;
			$query .= ") AND id_disciplina='{$this->disciplinas[$_POST['disciplina']]['id_disciplina']}'";
		endif;

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
		$scaleOffset = $data['anioBase'];
		while ( $scaleOffset < $data['anioFinal']):
			$scale[] = $scaleOffset;
			if($scaleOffset % 5 > 0):
				$scaleOffset += (5 - $scaleOffset % 5);
			else:
				$scaleOffset += 5;
				if($scaleOffset <= $data['anioFinal']):
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

	public function getAutoresPrice($revistaPais, $anio){
		$this->output->enable_profiler(false);
		$idDisciplina=$this->disciplinas[$_POST['disciplina']]['id_disciplina'];
		if(isset($_POST['revista'])):
			$query = "SELECT autor, documentos FROM \"mvAutorRevista\" WHERE \"revistaSlug\"='{$revistaPais}' AND anio='{$anio}' ORDER BY documentos DESC";
		else:
			$query = "SELECT autor, documentos FROM \"mvAutorPais\" WHERE \"paisRevistaSlug\"='{$revistaPais}' AND anio='{$anio}' ORDER BY documentos DESC";
		endif;
		$query = $this->db->query($query);
		$data = array();
		$data['table']['cols'][] = array('id' => '','label' => _('Autor'),'type' => 'string');
		$data['table']['cols'][] = array('id' => '','label' => _('Documentos'),'type' => 'number');
		foreach ($query->result_array() as $row):
			$c = array();
			$c[] = array('v' => "<a href='".site_url(sprintf('frecuencias/autor/%s/documento', slug($row['autor'])))."'>{$row['autor']}</a>");
			$c[] = array('v' => $row['documentos']);
			$data['table']['rows'][]['c'] = $c;
		endforeach;
		/*Opciones para la tabla*/
		$data['tableOptions'] = array(
				'allowHtml' => true,
				'showRowNumber' => false,
				'cssClassNames' => array(
					'headerCell' => 'text-center',
					'tableCell' => 'text-left nowrap'
					)
			);
		header('Content-Type: application/json');
		echo json_encode($data, true);
	}

	public function bradfordDocumentos(){
		$uri_args = $this->uri->uri_to_assoc(2);
		$args['slug'] = $uri_args['revista'];
		$args['query'] = "SELECT {$this->queryFields} FROM \"vDocumentosBradfordFull\" WHERE \"revistaSlug\"='{$uri_args['revista']}'";
		$args['queryCount'] = "SELECT count(*) AS total FROM \"vDocumentosBradfordFull\" WHERE \"revistaSlug\"='{$uri_args['revista']}'";
		$args['paginationURL'] = site_url("indicadores/modelo-bradford-revista/disciplina/{$uri_args['disciplina']}/revista/{$uri_args['revista']}/documentos");
		if(isset($_POST['ajax']) || $ajax):
			$args['paginationURL'] = site_url("indicadores/modelo-bradford-revista/disciplina/{$uri_args['disciplina']}/revista/{$uri_args['revista']}/documentos/ajax");
			$args['ajax'] = true;
		endif;
		/*Datos de la revista*/
		$this->load->database();
		$queryRevista = "SELECT revista FROM \"vSearchFull\" WHERE \"revistaSlug\"='{$uri_args['revista']}' LIMIT 1";
		$queryRevista = $this->db->query($queryRevista);
		$this->db->close();
		$queryRevista = $queryRevista->row_array();
		$args['breadcrumb'][] = array('title' => _('Modelo de Bradford por revista'), 'link' => 'indicadores/modelo-bradford-revista');
		$args['breadcrumb'][] = array('title' => $this->disciplinas[$uri_args['disciplina']]['disciplina'], 'link' => "indicadores/modelo-bradford-revista/disciplina/{$uri_args['disciplina']}");
		$args['page_title'] = sprintf('%s (%%d documentos)', $queryRevista['revista']);
		$args['title'] = _sprintf('%s (%%d documentos)', $queryRevista['revista']);
		return $this->_renderDocuments($args);
	}

	private function _renderDocuments($args){
		/*Obtniendo los registros con paginación*/
		$query = "{$args['query']} ORDER BY \"anioRevista\" DESC, regexp_replace(volumen, '([0-9]+?)[^0-9].+?$', '\1') DESC, regexp_replace(numero, '([0-9]+?)[^0-9].+?$', '\1') DESC, \"articuloSlug\"";
		$articulosResultado = articulosResultado($query, $args['queryCount'], $args['paginationURL'], $resultados=20);
		/*Vistas*/
		$data = array();
		$data['main']['links'] = $articulosResultado['links'];
		$data['main']['resultados']=$articulosResultado['articulos'];
		$data['header']['title'] = sprintf($args['title'], $articulosResultado['totalRows']);
		$data['header']['slugHighLight']=slugHighLight($args['slug']);
		$data['main']['page_title'] = sprintf($args['page_title'], $articulosResultado['totalRows']);
		$data['page_title'] = $data['main']['page_title'];
		$this->template->set_partial('view_js', 'buscar/header', $data['header'], TRUE, FALSE);
		$this->template->css('assets/css/colorbox.css');
		$this->template->css('assets/css/colorboxIndices.css');
		$this->template->js('assets/js/colorbox.js');
		$this->template->js('assets/js/jquery.highlight.js');
		if(ENVIRONMENT === "production"):
			$this->template->js('//s7.addthis.com/js/300/addthis_widget.js#pubid=herz');
		endif;
		$this->template->title($data['header']['title']);
		$this->template->set_breadcrumb(_('Indicadores'), site_url('indicadores'));
		if(isset($args['breadcrumb'])):
			foreach ($args['breadcrumb'] as $breadcrumb) {
				$this->template->set_breadcrumb($breadcrumb['title'], site_url($breadcrumb['link']));
			}
		endif;
		$this->template->set_meta('description', _('Frecuencias'));
		$this->template->build('revista/index', $data['main']);
	}

	public function preview(){
		$uri_string = uri_string();
		if (preg_match('%indicadores/(...+?)%', $uri_string)):
			if (preg_match('%indicadores/(.+?)(/.*|$)%', $uri_string)):
				$_POST['indicador']=preg_replace('%.+?/indicadores/(.+?)(/.*|$)%', '\1', $uri_string);
			endif;
			if (preg_match('%.*?/disciplina/(.+?)(/.*|$)%', $uri_string)):
				$_POST['disciplina']=preg_replace('%.*?/disciplina/(.+?)(/.*|$)%', '\1', $uri_string);
			endif;
			if (preg_match('%.*?/revista/(.+?)($|/[0-9]{4}-[0-9]{4})%', $uri_string)):
				$_POST['revista']=preg_split('/[\s\/]+/', preg_replace('%.*?/revista/(.+?)(/[0-9]{4}-[0-9]{4}|/preview\.png|$)%', '\1', $uri_string));
			endif;
			if (preg_match('%.*?/pais-revista/(.+?)(/[0-9]{4}-[0-9]{4}|$)%', $uri_string)):
				$_POST['paisRevista']=preg_split('/[\s\/]+/', preg_replace('%.*?/pais-revista/(.+?)(/[0-9]{4}-[0-9]{4}|/preview\.png|$)%', '\1', $uri_string));
			endif;
			if (preg_match('%.*?/pais-autor/(.+?)(/[0-9]{4}-[0-9]{4}|$)%', $uri_string)):
				$_POST['paisAutor']=preg_split('/[\s\/]+/', preg_replace('%.*?/pais-autor/(.+?)(/[0-9]{4}-[0-9]{4}|/preview\.png|$)%', '\1', $uri_string));
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
		if(!isset($_POST['periodo']) && preg_match('/(productividad-exogenah)/', $_POST['indicador'])):
			$periodos = $this->getPeriodos();
			$_POST['periodo'] = "{$periodos['anioBase']};{$periodos['anioFinal']}";
		endif;
		if(!isset($_POST['periodo']) && !preg_match('/(modelo-bradford-revista|modelo-bradford-institucion|indice-concentracion|productividad-exogena)/', $_POST['indicador'])):
			$periodos = $this->getPeriodos();
			$_POST['periodo'] = "{$periodos['anioBase']};{$periodos['anioFinal']}";
		endif;																																								  
		$chartData = $this->getChartData();
		if(!preg_match('/(productividad-exogenah)/', $_POST['indicador']))																		  
		if(preg_match('/(indice-concentracion|productividad-exogena)/', $_POST['indicador']))
			$chartData = $chartData[0];
		if(preg_match('/modelo-bradford-(revista|institucion)/', $_POST['indicador']))
			$chartData = $chartData['bradford'];
		/* Ajustando valores de la gráfica para la vista previa*/
		unset($chartData['subtitle'], $chartData['xAxis']['title']);
		if(isset($chartData['series']))
		foreach ($chartData['series'] as $key => $value):
			$chartData['series'][$key]['showInLegend'] = FALSE;
		endforeach;
		$chartData['subtitle'] = array('text' => $this->indicadores[$_POST['indicador']]);
		$chartData['yAxis']['title'] = '';
		$chartData['chart']['width'] = 1000;
		$chartData['chart']['height'] = 550;
		$valsize = 50;
		$chartData['title']['style']['fontSize'] = "{$valsize}px";
		$chartData['subtitle']['style']['fontSize'] = "{$valsize}px";
		if(isset($_GET['width'])):
			$wpercent = $_GET['width']/$chartData['chart']['width'];
			$chartData['chart']['width'] = $chartData['chart']['width']*$wpercent;
			$chartData['chart']['height'] = $chartData['chart']['height']*$wpercent;
			$chartData['title']['style']['fontSize'] = ($valsize*$wpercent)."px";
			$chartData['subtitle']['style']['fontSize'] = ($valsize*$wpercent)."px";
		endif;
		$chartData['colors'] = $this->colors;
		if(preg_match('/(productividad-exogenah|coautoria-pais)/', $_POST['indicador'])):
			unset($chartData['subtitle']);
			unset($chartData['series'][0]['showInLegend']);
			unset($chartData['colors']);
			#unset($chartData['yAxis']);
			#unset($chartData['tooltip']);
			#unset($chartData['plotOptions']);
			#unset($chartData['chart']);
		endif;		
		if(preg_match('/(frecuencias-institucion-documento)/', $_POST['indicador'])):
			if(isset($_GET['width']))
				$chartData['chart']['plotOptions']['pie']['innerSize'] = $chartData['chart']['width']/10;	
			unset($chartData['subtitle']);
			#unset($chartData['yAxis']);
			#unset($chartData['xAxis']);
			#treemap
			#unset($chartData['chart']);
			unset($chartData['colors']);
			#unset($chartData['title']);
			#$chartData['title']='Titulo';
			#unset($chartData['credits']);
			unset($chartData['series'][0]['showInLegend']);
		endif;
		#echo json_encode($chartData);exit(0);
		$hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
		$request = array(
				'infile' => json_encode($chartData),
				#'infile' => $cadena,
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

	public function getChartFrecuencias($args = array('h' => false, 'drill' => false)){
		$series = array();
		$this->load->database();
		/*Convirtiendo el periodo en dos fechas*/
		$_POST['periodo'] = explode(";", $_POST['periodo']);
		/*Generamos el arreglo de periodos*/
		$periodos = $this->getPeriodos($_POST);
                $data['periodo'] = $periodos;               
		/*Consulta para cada indicador*/
		$indicador['frecuencias-institucion-documento'] = array(
			'campoTabla' => "coautoria AS valor FROM \"mvIndiceCoautoriaPrice",
			'title' => array(
					'revista' => '<div class="text-center nowrap"><h4>'._('Representación institucional').'</h4><br/>'._('Número de documentos por institución de afiliación del autor').'</div>'
				),
			'vTitle' => _('Índice de representación'),
			'hTitle' => _('Año'),
			'tooltip' => array(
					'revista' => _('<b>{series.name}</b><br/>Cantidad de documentos por institución en el año {point.category}: <b>{point.y}</b>'),
				),
                        'tableCols' => [
                                            array('id' => '','label' => _('Institución'),'type' => 'string'),
                                            array('id' => '','label' => _('No. de participaciones'),'type' => 'number')
                                        ]
			);
                
		$selection = 'revista';
		if (isset($_POST['revista'])):
			//$data['dataTable']['cols'][] = array('id' => '','label' => _('Institución'),'type' => 'string');
                        //$data['dataTable']['cols'][] = array('id' => '','label' => _('No. de participaciones'),'type' => 'number');                                               
                        if($args['drill'])
                            $data['highchart'] = $this->highcharts['columnDrillDown'];
                        elseif($args['h'])
                            $data['highchart'] = $this->highcharts['stackColumn'];
                        else
                            $data['highchart'] = $this->highcharts['donut'];
                        $offset=1;
                        $total=count($periodos);
                        
                        $anioMin=$periodos[0];
			$queryPeriodos .="(";
                        foreach ($periodos as $p):
				$queryPeriodos .= "'{$p}'";
				if($offset < $total):
					$queryPeriodos .=",";
				endif;
				$offset++;
			endforeach;
                        $queryPeriodos .=")";
                        
                        $queryRevistas .="(";
                        $revistaOffset=1;
			$revistaTotal=count($_POST['revista']);
			foreach ($_POST['revista'] as $revista):
				$queryRevistas .= "'{$revista}'";
				if($revistaOffset < $revistaTotal):
					$queryRevistas .=",";
				endif;
				$revistaOffset++;
			endforeach;
                        $queryRevistas .=")";
                        
                        $indicador['frecuencias-institucion-documentoh'] = array(
                            'title' => array(
					'revista' => '<div class="text-center nowrap"><h4>'._('Evolución de representación institucional').'</h4><br/>'._('Participación institucional anual en los documentos publicados por la revista').'</div>'
				),
                            'sql' => "select
                                                    distinct \"institucionSlug\" slug, (array_agg(institucion))[1] nombre 
                                                from 
                                                    \"mvFrecuenciaInstitucionAnioRevista\" 
                                                where 
                                                    \"revistaSlug\" in " . $queryRevistas ."
                                                and 
                                                    anio in ". $queryPeriodos . "
                                                group by 
                                                    \"institucionSlug\" 
                                                order by nombre desc",
                            'sql2' => "select \"institucionSlug\" nombre, anio, documentos val from \"mvFrecuenciaInstitucionAnioRevista\" where \"anio\" in ". $queryPeriodos . " and \"revistaSlug\" in " . $queryRevistas,
                            'sql3' => "select anio, sum(documentos) val from \"mvFrecuenciaInstitucionAnioRevista\" where \"anio\" in ". $queryPeriodos . " and \"revistaSlug\" in " . $queryRevistas . " group by anio",
                            'sql4' => "select institucion nombre, anio, documentos val from \"mvFrecuenciaInstitucionAnioRevista\" where \"anio\" in ". $queryPeriodos . " and \"revistaSlug\" in " . $queryRevistas . " order by anio asc, nombre asc",
							'sql5' => "select anio, count(distinct \"institucionSlug\") val from \"mvFrecuenciaInstitucionAnioRevista\" where anio in ". $queryPeriodos . " and \"revistaSlug\" in " . $queryRevistas . " group by anio order by anio asc",																																																							   
                            'yAxis' => array('allowDecimals' => FALSE, 'title' => array('text' => 'Institución')),
                            'tableCols' => [
                                            array('id' => '','label' => _('Año'),'type' => 'string'),
                                            array('id' => '','label' => _('Institución'),'type' => 'string'),
                                            array('id' => '','label' => _('No. de participaciones'),'type' => 'number')
                                        ]
                        );
                        
                        $indicador['productividad-exogenah'] = array(
                            'title' => array(
					'revista' => '<div class="text-center nowrap"><h4>'._('Tasa anual de autoría exógena por país').'</h4><br/></div>'
				),
                            'sql' => "select
                                                    distinct \"paisAutorSlug\" slug, (array_agg(\"paisAutor\"))[1] nombre 
                                                from 
                                                    \"mvProductividadExogenaAnioPaisRevista\" 
                                                where 
                                                    \"revistaSlug\" in " . $queryRevistas ."
                                                and 
                                                    anio in ". $queryPeriodos . "
                                                group by 
                                                    \"paisAutorSlug\" 
                                                order by nombre desc",
                            'sql2' =>  "select \"paisAutorSlug\" slug, \"paisAutor\" nombre,anio, exogena val from \"mvProductividadExogenaAnioPaisRevista\" where \"anio\" in ". $queryPeriodos . " and \"revistaSlug\" in " . $queryRevistas,
                            'yAxis' => array('allowDecimals' => TRUE, 'title' => array('text' => 'País'), 'stackLabels' => array('enabled' => TRUE)),
                            'tableCols' => [
                                            array('id' => '','label' => _('Año'),'type' => 'string'),
                                            array('id' => '','label' => _('País'),'type' => 'string'),
                                            array('id' => '','label' => _('Proporción de autoría exógena'),'type' => 'number')
                                        ]
                        );
                        
                        if($args['drill']){
                            $query = $indicador[$_POST['indicador']]['sql3'];
                            $query = $this->db->query($query);
                            
                            $data['highchart']['series'][0]['name']="Instituciones totales";
                            $data['highchart']['series'][0]['colorByPoint']=true;
                            $data['highchart']['yAxis']['title']['text']='Instituciones / Documentos';
							$data['highchart']['series'][0]['headerFormat']='<span style="font-size:11px">{point.y} Documentos</span><br>';																											   
                            //$data['highchart']['tooltip']['headerFormat']='<span style="font-size:11px">{point.y} Documentos</span><br>';
                            //$data['highchart']['tooltip']['pointFormat']='<span style="font-size:12px">{point.name}</span><br>';
                            
                            $cont=0;
                            foreach ($query->result_array() as $key => $row ):
                                $data['highchart']['series'][0]['data'][$cont]['name']=$row['anio'];
                                $data['highchart']['series'][0]['data'][$cont]['y']=intval($row['val']);
                                $data['highchart']['series'][0]['data'][$cont]['drilldown']=$row['anio'];
                                $cont++;
                            endforeach;
                            
							$data['highchart']['series'][1]['name']="Instituciones diferentes";
                            $data['highchart']['series'][1]['type']="spline";
                            $data['highchart']['series'][1]['color']="#021b4f";
                            $data['highchart']['series'][1]['headerFormat']='<span style="font-size:11px">{point.y} Instituciones</span><br>';
                            
                            $query = $indicador[$_POST['indicador']]['sql5'];
                            $query = $this->db->query($query);
                            
                            $cont=0;
                            foreach ($query->result_array() as $key => $row ):
                                $data['highchart']['series'][1]['data'][$cont]=intval($row['val']);
                                $cont++;
                            endforeach;																   
                            $query = $indicador[$_POST['indicador']]['sql4'];
                        }
                        elseif($args['h']){
                            $queryInstituciones = $indicador[$_POST['indicador']]['sql'];
                        
                            $queryInstituciones = $this->db->query($queryInstituciones);
                        
                            $cont=0;
                            foreach ($queryInstituciones->result_array() as $key => $row ):
                                $data['highchart']['series'][$cont]['name']=$row['nombre'];
                                $data['highchart']['aux'][$row['slug']]=$cont;
                                foreach ($periodos as $p):
                                    $data['highchart']['series'][$cont]['data'][$p - $anioMin] = null;
                                endforeach;
                                $cont++;
                            endforeach;
                            
                            $query = $indicador[$_POST['indicador']]['sql2'];
                            $data['highchart']['yAxis'] = $indicador[$_POST['indicador']]['yAxis'];
                        }    
                        else{
                            $query = " with consulta as (
					select 
						institucion, \"revistaSlug\" revista, sum(documentos) documentos
					from 
						\"mvFrecuenciaInstitucionAnioRevista\"
                                        where
                                                \"anio\" in ". $queryPeriodos . "
                                        group by 
                                                (institucion, \"revistaSlug\") 
					/*having 
						sum(documentos) > 5
					union
					select 
						'Instituciones con máximo 5 participaciones', \"revistaSlug\" revista, 5 
					from 
						\"mvFrecuenciaInstitucionAnioRevista\"
                                        where
                                                \"anio\" in ". $queryPeriodos . "
                                        group by 
                                                (institucion, \"revistaSlug\")
					having 
						sum(documentos) <= 5*/
					)	
					select 
						institucion, documentos 
					from 
						consulta 
					where 
						revista in (" . $queryRevistas . ") order by institucion desc";
                        }    
										   
										   
							 
									   
				  
		  
					 
			  
										 
		endif;
                
                $data['dataTable']['cols'] = $indicador[$_POST['indicador']]['tableCols'];
                
                $data['query'] = $query;
                if($args['h'] && !$args['drill'])
                    $data['highchart']['xAxis']['categories'] = $periodos;
                
		$query = $this->db->query($query);
		$indicadores = array();
		$values= [];
                $cont=0;
                $valAnt=0;
                if($args['drill'])
                    $data['highchart']['drilldown']['series']=[];
		foreach ($query->result_array() as $key => $row ):
                        if($args['drill']){
                            if($valAnt != $row['anio'] && $valAnt != 0){
                                array_push(
                                    $data['highchart']['drilldown']['series'], 
                                    array(
										'tooltip' => array( 
                                                            'headerFormat' => '<span style="font-size:11px">{point.y} Documentos</span><br>',
                                                            'pointFormat' => '<span style="font-size:12px">{point.name}</span><br>'
                                                    ),
                                        'name' => $valAnt,
                                        'id' => $valAnt,
                                        'data' => $obj
                                    )
                                );
                                $cont = 0;
                                $obj=[];
                            }
                            $obj[$cont]=[$row['nombre'],intval($row['val'])];
                            $valAnt = $row['anio'];
                            $cont++;
                            if ($row['val'] === end($query->result_array())['val'] && $row['nombre'] === end($query->result_array())['nombre']) {
                                array_push(
                                    $data['highchart']['drilldown']['series'], 
                                    array(
										'tooltip' => array( 
                                                            'headerFormat' => '<span style="font-size:11px">{point.y} Documentos</span><br>',
                                                            'pointFormat' => '<span style="font-size:12px">{point.name}</span><br>'
                                                    ),
                                        'name' => $valAnt,
                                        'id' => $valAnt,
                                        'data' => $obj
                                    )
                                );
                            }
                            $cc = array();
                            $cc[] = array('v' => $row['anio']);
                            $cc[] = array('v' => $row['nombre']);
                            $cc[] = array('v' => intval($row['val']));
                            $data['dataTable']['rows'][]['c'] = $cc;
                        }elseif($args['h']){
                            if($_POST['indicador'] == 'productividad-exogenah')
                                $rowval = floatval(number_format(floatval($row['val']),2));
                            else
                                $rowval = intval($row['val']);
                            
                            $data['highchart']['series'][$data['highchart']['aux'][$row['slug']]]['data'][$row['anio']-$anioMin] = $rowval;
                            $cc = array();
                            $cc[] = array('v' => $row['anio']);
                            $cc[] = array('v' => $row['nombre']);
                            $cc[] = array('v' => floatval(number_format(floatval($row['val']),2)));
                            $data['dataTable']['rows'][]['c'] = $cc;
                        }   
                        else{
                            array_push($values,
				[$row['institucion'], intval($row['documentos'])]);
						  
                            /*Filas de la tabla*/
                            $cc = array();
                            $cc[] = array('v' => $row['institucion']);
                            $cc[] = array('v' => intval($row['documentos']));
                            $data['dataTable']['rows'][]['c'] = $cc;
                        }
                        
                        /*if(ord($row['institucionSlug']) == 117)
                            $data['highchart']['series'][$data['highchart']['aux'][$row['institucionSlug']]]['stack'] = 'U';
                        else
                            $data['highchart']['series'][$data['highchart']['aux'][$row['institucionSlug']]]['stack'] = 'Z';
			*/
                        
		endforeach;
			
		if($args['drill']){
                    $data['highchart']['title'] = array(
                            'text' => 'Evolución de representación institucional',
                            'style' => array(
                                    'fontSize' => '12px'
                            )
                    );
                }elseif($args['h']){
                    $data['highchart']['title'] = array(
                            'text' => 'Tasa anual de autoría exógena por país',
                            'style' => array(
                                    'fontSize' => '12px'
                            )
                    );
                }else{
                    $data['highchart']['title'] = array(
                            'text' => 'Representación institucional',
                            'style' => array(
                                    'fontSize' => '12px'
                            )
                    );
                }
                if(!$args['h'])
                    $data['highchart']['series'][0] = array(
			'name' => 'Documentos',
			'data' => $values
                    );
                   
		/*Generando filas para gráfica y columnas para la tabla*/
		$setDataTableRows = false;
		#$data['highchart']['yAxis']['title'] = array('text' => $indicador[$_POST['indicador']]['vTitle']);
		#$data['highchart']['tooltip']['pointFormat'] = $indicador[$_POST['indicador']]['tooltip'][$selection];
	       /*	
		foreach ($series as $key => $value):
			#$data['highchart']['series']['data'][] = array(
			array_push($data['highchart']['series']['data'],
				array(
					'id' => slug($key),
					'name' => $key,
					'data' => $value
				));
		endforeach;*/

		/*Opciones para la tabla*/
		$data['tableOptions'] = array(
				'allowHtml' => true,
				'showRowNumber' => false,
				'cssClassNames' => array(
					'headerCell' => 'text-center',
					'tableCell' => 'text-left nowrap'
					)
			);
		#echo json_encode($data['highchart']);
		#exit(0);
		/*Titulo de la gráfica*/
		$data['chartTitle'] = $indicador[$_POST['indicador']]['title'][$selection];
		$data['tableTitle'] = "<h4 class=\"text-center\">{$this->indicadores[$_POST['indicador']]}</h4>";
		if($this->preview)
			return $data['highchart'];
		$data['highchart']['title']=null;
		header('Content-Type: application/json');
		echo json_encode($data, true);
	}
        
        public function getVennDiagram(){
		$data = array();
		$this->load->database();
		/*Convirtiendo el periodo en dos fechas*/
		$_POST['periodo'] = explode(";", $_POST['periodo']);
		/*Generamos el arreglo de periodos*/
		$periodos = $this->getPeriodos($_POST);
                
		$selection = 'revista';
		if (isset($_POST['revista'])):
                    $data['highchart'] = $this->highcharts['venn'];
                    $offset=1;
                    $total=count($periodos);
                        
                    $anioMin=$periodos[0];
                    $queryPeriodos .="(";
                    foreach ($periodos as $p):
			$queryPeriodos .= "'{$p}'";
			if($offset < $total)
                            $queryPeriodos .=",";
			$offset++;
                    endforeach;
                    $queryPeriodos .=")";
                        
                    $queryRevistas .="(";
                    $revistaOffset=1;
                    $revistaTotal=count($_POST['revista']);
                    foreach ($_POST['revista'] as $revista):
			$queryRevistas .= "'{$revista}'";
			if($revistaOffset < $revistaTotal)
                            $queryRevistas .=",";
			$revistaOffset++;
                    endforeach;
                    $queryRevistas .=")";
                        
                    $indicador['coautoria-pais'] = array(
                            'title' => array(
					'revista' => '<div class="text-center nowrap"><h4>'._('Coautoría por país').'</h4><br/></div>'
				),
                            'sql' => "select
                                                    paises, replace(replace(replace(replace(paises,'\"','') ,'\','') ,',{',',') ,'}}','}') paisesrep, count(1) documentos 
                                                from 
                                                    \"mvDocumentosCoautoriaRevista\" 
                                                where 
                                                    \"revistaSlug\" in " . $queryRevistas ."
                                                and 
                                                    anio in ". $queryPeriodos . "
                                                group by 
                                                    1,2
                                                order by 3 desc",
                            'tableCols' => [
                                            array('id' => '','label' => _('Países participantes'),'type' => 'string'),
                                            array('id' => '','label' => _('Número de participaciones'),'type' => 'number')
                                        ]
                        );
                    
                endif;
                    
                        $data['dataTable']['cols'] = $indicador[$_POST['indicador']]['tableCols'];
                        
                        $query = $indicador[$_POST['indicador']]['sql'];
                        $query = $this->db->query($query);
                            
                        $cont=0;
                        $llaves = array('{','}','"','\\');
                        foreach ($query->result_array() as $key => $row ):
                            $paises = explode(',', str_replace($llaves,'',$row['paisesrep']));
                            $sets = [];
                            $sets_tabla = [];
                            $resto = null;
                            foreach ($paises as $i => $pais){
                                if( ($i == 0 && count($paises) <= 2 && strpos($row['paises'], '"{') !== false) || ($i == 0 && count($paises) >2 && strpos($row['paises'], '"{') !== false))
                                    array_push($sets,$pais);
                                else
                                    if($resto == null)
                                        $resto = $pais;
                                    else
                                        $resto .= '∩' . $pais;
                            }
                            $sets_tabla = $sets;
                            if($resto != null){
                                array_push($sets,$resto);
                                if( strpos($resto,'∩') === false )
                                    array_push($sets_tabla, $resto);
                                else{
                                    $array_resto = explode('∩', $resto);
                                    foreach ($array_resto as $j => $elem):
                                        array_push($sets_tabla, $elem);
                                    endforeach;
                                }
                            }
                            
                            $data['highchart']['series'][0]['data'][$cont]['sets']=$sets;
                            $data['highchart']['series'][0]['data'][$cont]['value']=intval($row['documentos']);
                            $cont++;
                            
                            /*Filas de la tabla*/
                            $cc = array();
                            $cc[] = array('v' => $sets_tabla);
                            $cc[] = array('v' => intval($row['documentos']));
                            $data['dataTable']['rows'][]['c'] = $cc;
                        endforeach;
                        
		$data['highchart']['title'] = array(
			'text' => 'Coautoría por país',
			'style' => array(
				'fontSize' => '12px'
			)
		);
                
		/*Generando filas para gráfica y columnas para la tabla*/
		$setDataTableRows = false;

		/*Opciones para la tabla*/
		$data['tableOptions'] = array(
				'allowHtml' => true,
				'showRowNumber' => false,
				'cssClassNames' => array(
					'headerCell' => 'text-center',
					'tableCell' => 'text-left nowrap'
					)
			);
                
		/*Titulo de la gráfica*/
		$data['chartTitle'] = $indicador[$_POST['indicador']]['title'][$selection];
		$data['tableTitle'] = "<h4 class=\"text-center\">{$this->indicadores[$_POST['indicador']]}</h4>";
		if($this->preview)
			return $data['highchart'];
		$data['highchart']['title']=null;                
		$data['indicador']=$indicador['coautoria-pais'];
		header('Content-Type: application/json');
		echo json_encode($data, true);
	}
        
}
/* End of file indicadores.php */
/* Location: ./application/controllers/indicadores.php */
