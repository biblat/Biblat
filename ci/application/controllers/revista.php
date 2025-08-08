<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Revista extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->output->enable_profiler($this->config->item('enable_profiler'));
	    $this->template->set_partial('biblat_js', 'javascript/biblat', array(), TRUE, FALSE);
		$this->template->set_partial('submenu', 'layouts/submenu');
		$this->template->set_partial('search', 'layouts/search');
		$this->template->set_breadcrumb(_('Inicio'), site_url('/'));
		$this->template->set_breadcrumb(_('Revista'), site_url('revista'));
		$this->template->set('class_method', $this->router->fetch_class().$this->router->fetch_method());
	}

	private $database = array(
				'CLA01' => 'CLASE',
				'PER01' => 'PERIÓDICA'
			);

	public function index($revistaSlug){
		$data = array();
		/*Obteniendo articulos de la revista*/
		$queryFields="SELECT
					sistema,
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
					url->>0 AS url,
					\"autoresJSON\",
					\"institucionesJSON\",
					regexp_replace(regexp_replace(doi,'[^a-z0-9]*$',''),'^[^a-z0-9]*','') doi";
		$queryFrom = "FROM \"mvSearch\" WHERE \"revistaSlug\"='{$revistaSlug}'";
		$query = "{$queryFields}
				{$queryFrom}
				ORDER BY \"anioRevista\" DESC, regexp_replace(volumen, '([0-9]+?)[^0-9].+?$', '\1') DESC, regexp_replace(numero, '([0-9]+?)[^0-9].+?$', '\1') DESC, \"articuloSlug\"";

		$queryCount = "SELECT count (DISTINCT sistema) as total {$queryFrom}";

		/*Paginación y resultados*/
		$paginationURL = site_url("/revista/{$revistaSlug}");
		$perPage = 20;
		$articulosResultado = articulosResultado($query, $queryCount, $paginationURL, $perPage);
		/*Resultados de la página*/
		$data['main']['links'] = $articulosResultado['links'];
		$data['main']['search']['total'] = $articulosResultado['totalRows'];
		$data['main']['resultados'] = $articulosResultado['articulos'];
		$data['main']['revista'] = current($articulosResultado['articulos']);
		$data['main']['revista'] = $data['main']['revista']['revista'];
		/*Vistas*/
		$data['header']['title'] = _sprintf('%s', $data['main']['revista']);
		$breadcrumb = sprintf('%s (%%d documentos)', $data['main']['revista']);
		$data['main']['page_title'] = sprintf($breadcrumb, $articulosResultado['totalRows']);

		$this->template->set_partial('view_js', 'buscar/header', $data['header'], TRUE, FALSE);
		$this->template->title($data['header']['title']);
		$this->template->css('assets/css/colorbox.css');
		$this->template->css('assets/css/colorboxIndices.css');
		$this->template->js('assets/js/colorbox.js');
		$this->template->js('assets/js/jquery.highlight.js');
		$this->template->set_partial('main_js','revista/badges.js', array(), TRUE, FALSE);
		if(ENVIRONMENT === "production"):
			$this->template->js('//s7.addthis.com/js/300/addthis_widget.js#pubid=herz');
		endif;
		$this->template->set_meta('description', $data['main']['page_title']);
		$this->template->build('revista/index', $data['main']);
	}

	public function articulo($revista='', $articulo='', $mail=''){
		$uriVar = $this->uri->ruri_to_assoc();
		if($mail == 'true'):
			$uriVar['revista'] = $revista;
			$uriVar['articulo'] = $articulo;
			$uriVar['mail'] = $mail;
		endif;

		/*Consultas*/
		$this->load->database();
		$query = "SELECT
				s.sistema,
				s.articulo,
				s.\"articuloSlug\",
				s.revista,
				s.\"revistaSlug\",
				s.issn,
				s.\"anioRevista\",
				s.volumen,
				s.numero,
				s.periodo,
				s.paginacion,
				s.\"paisRevista\",
				s.idioma,
				s.\"tipoDocumento\",
				s.\"enfoqueDocumento\",
				s.\"autoresJSON\",
				s.\"institucionesJSON\",
				s.\"disciplinas\",
				s.\"palabraClave\",
				s.\"keyword\",
				s.\"resumen\",
				s.url
			FROM \"mvSearch\" s
			WHERE \"revistaSlug\"='{$uriVar['revista']}' AND \"articuloSlug\"='{$uriVar['articulo']}'";
		$query = $this->db->query($query);
		$articulo = $query->row_array();
		$query->free_result();
		$this->db->close();
		/*Ordenando los datos del articulo*/
		/*Generando arreglo de autores*/
		if($articulo['autoresJSON'] != NULL):
			$articulo['autores'] = json_decode($articulo['autoresJSON'], TRUE);
		endif;
		unset($articulo['autoresJSON']);
		/*Generando arreglo de instituciones*/
		if($articulo['institucionesJSON'] != NULL):
			$articulo['instituciones'] = json_decode($articulo['institucionesJSON'], TRUE);
		endif;
		unset($articulo['institucionesJSON']);
		/*Generando disciplinas*/
		$articulo['disciplinas'] = json_decode($articulo['disciplinas'], TRUE);
		/*Generando palabras clave*/
		if($articulo['palabraClave'] != NULL):
			$articulo['palabraClave'] = json_decode($articulo['palabraClave'], TRUE);
		endif;
		/*Generando keyword*/
		if($articulo['keyword'] != NULL):
			$articulo['keyword'] = json_decode($articulo['keyword'], TRUE);
		endif;
		/*Generando resumen*/
		if($articulo['resumen'] != NULL):
			$articulo['resumen'] = json_decode($articulo['resumen'], TRUE);
		endif;
		/*Generando ulr*/
		if($articulo['url'] != NULL):
			$articulo['url'] = json_decode($articulo['url'], TRUE);
		endif;

		/*Limpiando caracteres html*/
		$articulo = htmlspecialchars_deep($articulo);
		/*Creando lista de autores en html*/
		$articulo['autoresHTML'] = "";
		if(isset($articulo['autores'])):
			$totalAutores = count($articulo['autores']);
			$indexAutor = 1;
			foreach ($articulo['autores'] as $autor):
				$autorSlug = slug($autor['a']);
				$articulo['autoresHTML'] .= "<span itemprop=\"author\" itemscope itemtype=\"http://schema.org/Person\"><span itemprop=\"name\">".anchor("frecuencias/autor/{$autorSlug}", $autor['a'], 'title="'._sprintf('Frecuencias por autor: %s', $autor['a']).'"')."</span></span>";
				if ( isset($autor['z']) ):
					$articulo['autoresHTML'] .= "<sup>{$autor['z']}</sup>";
				endif;
				if($indexAutor < $totalAutores):
					$articulo['autoresHTML'] .= "<br/>";
				endif;
				$indexAutor++;
			endforeach;
		endif;
		/*Creando lista de instituciones html*/
		$articulo['institucionesHTML'] = "";
		if(isset($articulo['instituciones'])):
			$totalInstituciones = count($articulo['instituciones']);
			$indexInstitucion = 1;
			foreach ($articulo['instituciones'] as $institucion):
				$articulo['institucionesHTML'] .= sprintf('<sup>%s</sup>%s%s%s%s', $institucion['z'], empty($institucion['u'])?NULL:anchor("frecuencias/institucion/".slug($institucion['u']), $institucion['u'], 'title="'._sprintf('Frecuencias por intitución: %s', $institucion['u']).'"').", ", empty($institucion['v'])?NULL:"{$institucion['v']}, ", empty($institucion['w'])?NULL:"{$institucion['w']}. ", empty($institucion['x'])?NULL:anchor("frecuencias/pais-afiliacion/".slug($institucion['x']), $institucion['x'], 'title="'._sprintf('Frecuencias por país de afiliación: %s', $institucion['x']).'"'));
				if($indexInstitucion < $totalInstituciones):
					$articulo['institucionesHTML'] .= "<br/>";
				endif;
				$indexInstitucion++;
			endforeach;
		endif;

		/*Creando disciplinas HTML*/
		$articulo['disciplinasHTML'] = "";
		if(isset($articulo['disciplinas'])):
			$totalDisciplinas = count($articulo['disciplinas']);
			$indexDisciplina = 1;
			foreach ($articulo['disciplinas'] as $key => $disciplina):
				$articulo['disciplinasHTML'] .= "{$disciplina}";
				if($indexDisciplina < $totalDisciplinas):
					$articulo['disciplinasHTML'] .= ",<br/>";
				endif;
				$indexDisciplina++;
			endforeach;
		endif;

		/*Creando palabras clave HTML*/
		$articulo['palabrasClaveHTML'] = "";
		if(isset($articulo['palabraClave'])):
			$totalPalabrasClave = count($articulo['palabraClave']);
			$indexPalabraClave = 1;
			foreach ($articulo['palabraClave'] as $key => $palabraClave):
				$articulo['palabrasClaveHTML'] .= "{$palabraClave}";
				if($indexPalabraClave < $totalPalabrasClave):
					$articulo['palabrasClaveHTML'] .= ",<br/>";
				endif;
				$indexPalabraClave++;
			endforeach;
		endif;

		/*Creando keyword HTML*/
		$articulo['keywordHTML'] = "";
		if(isset($articulo['keyword'])):
			$totalKeyword = count($articulo['keyword']);
			$indexKeyword = 1;
			foreach ($articulo['keyword'] as $key => $keyword):
				$articulo['keywordHTML'] .= "{$keyword}";
				if($indexKeyword < $totalKeyword):
					$articulo['keywordHTML'] .= ",<br/>";
				endif;
				$indexKeyword++;
			endforeach;
		endif;
		/*Creando resumen HTML*/
		$articulo['resumenHTML'] = array();
		if(isset($articulo['resumen'])):
			foreach ($articulo['resumen'] as $key => $resumen):
				switch ($key):
					case 'a':
						$resumenHTML['title'] = _('Resumen en español');
						break;
					case 'p':
						$resumenHTML['title'] = _('Resumen en portugués');
						break;
					case 'i':
						$resumenHTML['title'] = _('Resumen en inglés')	;
						break;
					case 'o':
						$resumenHTML['title'] = _('Otro resumen');
						break;
				endswitch;
				$resumenHTML['body'] = $resumen;
				$articulo['resumenHTML'][] = $resumenHTML;
			endforeach;
		endif;

		if (isset($articulo['paginacion'])):
			$articulo['paginacionFirst'] = preg_replace("/[-\s]+/", "", preg_replace('/(^\s*\d+\s*?-|^\s*\d+?\s*$).*/m', '\1', $articulo['paginacion']));
			$articulo['paginacionLast'] = preg_replace("/[-\s]+/", "", preg_replace('/.*(-\s*\d+\s*?$|^\s*\d+?\s*$).*/m', '\1', $articulo['paginacion']));
		endif;

		/*Generando database*/
		$articulo['database'] = $this->database[substr($articulo['sistema'], 0, 5) ];
		/*Limpiando número de sistema*/
		$articulo['sistema'] = substr($articulo['sistema'], 5, 9);

		$articulo = remove_empty($articulo);

		$data['main']['articulo'] = $articulo;
		$data['header']['articulo'] = $data['main']['articulo'];
		$data['header']['title'] = _sprintf('%s', $articulo['articulo']);
		$data['main']['page_title'] = "<span itemprop=\"name\">{$articulo['articulo']}</span>";
		$data['main']['mail'] = FALSE;
		/*Vistas*/
		if(isset($_POST['ajax'])):
			$this->output->enable_profiler(FALSE);
			$data['main']['ajax'] = TRUE;
			$this->parser->parse('revista/articulo', $data['main']);
			return;
		endif;
		if(isset($uriVar['mail']) && $uriVar['mail'] == "true"):
			$this->output->enable_profiler(FALSE);
			$data['main']['mail'] = TRUE;
			return $this->parser->parse('revista/articulo', $data['main'], TRUE);
		endif;

		$this->template->set_partial('view_js', 'revista/articulo_header', array(), TRUE);
		$this->template->title($data['header']['title']);
		if(ENVIRONMENT === "production"):
			$this->template->js('//s7.addthis.com/js/300/addthis_widget.js#pubid=herz');
		endif;
		$this->template->set_meta('description', $articulo['articulo']);
		/*Article meta*/
		if(isset($articulo)):
			$this->template->set_breadcrumb($articulo['revista'], site_url("revista/{$articulo['revistaSlug']}"));
			$this->template->set_meta('citation_title', $articulo['articulo']);
			$this->template->set_meta('eprints.title', $articulo['articulo']);
			$this->template->set_meta('citation_journal_title', $articulo['revista']);
			if(isset($articulo['issn'])):
				$this->template->set_meta('citation_issn', $articulo['issn']);
			endif;
			$this->template->set_meta('eprints.type', "article");
			$this->template->set_meta('eprints.ispublished', "pub");
			$this->template->set_meta('eprints.date_type', "published");
			$this->template->set_meta('eprints.publication', $articulo['revista']);
			$this->template->set_meta('prism.publicationName', $articulo['revista']);
			if(isset($articulo['issn'])):
				$this->template->set_meta('prism.issn', $articulo['issn']);
			endif;
			$this->template->set_meta('dc.title', $articulo['articulo']);
			if(isset($articulo['numero'])):
				$this->template->set_meta('citation_issue', $articulo['numero']);
				$this->template->set_meta('prism.number', $articulo['numero']);
			endif;
			if(isset($articulo['volumen'])):
				$this->template->set_meta('citation_volume', $articulo['volumen']);
				$this->template->set_meta('eprints.volume', $articulo['volumen']);
			endif;
			if(isset($articulo['paginacion'])):
				$this->template->set_meta('citation_firstpage', $articulo['paginacionFirst']);
				$this->template->set_meta('citation_lastpage', $articulo['paginacionLast']);
				$this->template->set_meta('eprints.pagerange', $articulo['paginacion']);
				$this->template->set_meta('prism.startingPage', $articulo['paginacionFirst']);
				$this->template->set_meta('prism.endingPage', $articulo['paginacionLast']);
			endif;
			if(isset($articulo['anioRevista'])):
				$this->template->set_meta('citation_date', $articulo['anioRevista']);
				$this->template->set_meta('eprints.date', $articulo['anioRevista']);
				$this->template->set_meta('prism.publicationDate', $articulo['anioRevista']);
				$this->template->set_meta('dc.date', $articulo['anioRevista']);
			endif;
			if(isset($articulo['autores'])):
				foreach ($articulo['autores'] as $autor):
					$this->template->append_metadata(sprintf('<meta name="eprints.creators_name" content="%s" />', $autor['a']));
					$this->template->append_metadata(sprintf('<meta name="dc.creator" content="%s" />', $autor['a']));
					$this->template->append_metadata(sprintf('<meta name="citation_author" content="%s" />', $autor['a']));
					if((int)$autor['z'] > 0):
						$institucion = $articulo['instituciones'][(int)$autor['z']-1];
						$this->template->append_metadata(sprintf('<meta name="citation_author_institution" content="%s, %s, %s, %s" />', $institucion['u'], $institucion['v'], $institucion['w'], $institucion['x']));
					endif;
				endforeach;
			endif;
			if(isset($articulo["url"])):
				foreach ($articulo["url"] as $url):
					if (is_array($url))
						$url = $url['u'];
					if(preg_match('/.*pdf.*/', $url)):
						$this->template->set_meta('citation_pdf_url', $url);
					else:
						$this->template->set_meta('citation_fulltext_html_url', $url);
					endif;
				endforeach;
			endif;
		endif;
		/*Article meta*/
		$this->template->build('revista/articulo', $data['main']);
	}
	
	public function articulo_mail($revista='', $articulo='', $mail=''){
		$uriVar = $this->uri->ruri_to_assoc();
		if($mail == 'true'):
			$uriVar['revista'] = $revista;
			$uriVar['articulo'] = $articulo;
			$uriVar['mail'] = $mail;
		endif;

		/*Consultas*/
		$this->load->database();
		$query = "SELECT
				s.sistema,
				s.articulo,
				s.\"articuloSlug\",
				s.revista,
				s.\"revistaSlug\",
				s.issn,
				s.\"anioRevista\",
				s.volumen,
				s.numero,
				s.periodo,
				s.paginacion,
				s.\"paisRevista\",
				s.idioma,
				s.\"tipoDocumento\",
				s.\"enfoqueDocumento\",
				s.\"autoresJSON\",
				s.\"institucionesJSON\",
				s.\"disciplinas\",
				s.\"palabraClave\",
				s.\"keyword\",
				s.\"resumen\",
				s.url
			FROM \"mvSearch\" s
			WHERE \"revistaSlug\"='{$uriVar['revista']}' AND \"articuloSlug\"='{$uriVar['articulo']}'";
		$query = $this->db->query($query);
		$articulo = $query->row_array();
		$query->free_result();
		$this->db->close();
		/*Ordenando los datos del articulo*/
		
		/*Generando ulr*/
		if($articulo['url'] != NULL):
			$articulo['url'] = json_decode($articulo['url'], TRUE);
		endif;

		/*Limpiando caracteres html*/
		$articulo = htmlspecialchars_deep($articulo);
		/*Creando lista de autores en html*/

		if (isset($articulo['paginacion'])):
			$articulo['paginacionFirst'] = preg_replace("/[-\s]+/", "", preg_replace('/(^\s*\d+\s*?-|^\s*\d+?\s*$).*/m', '\1', $articulo['paginacion']));
			$articulo['paginacionLast'] = preg_replace("/[-\s]+/", "", preg_replace('/.*(-\s*\d+\s*?$|^\s*\d+?\s*$).*/m', '\1', $articulo['paginacion']));
		endif;

		/*Generando database*/
		$articulo['database'] = $this->database[substr($articulo['sistema'], 0, 5) ];
		/*Limpiando número de sistema*/
		$articulo['sistema'] = substr($articulo['sistema'], 5, 9);

		$articulo = remove_empty($articulo);

		$data['main']['articulo'] = $articulo;
		$data['header']['articulo'] = $data['main']['articulo'];
		$data['header']['title'] = _sprintf('%s', $articulo['articulo']);
		$data['main']['page_title'] = "<span itemprop=\"name\">{$articulo['articulo']}</span>";
		$data['main']['mail'] = FALSE;
		/*Vistas*/
		if(isset($_POST['ajax'])):
			$this->output->enable_profiler(FALSE);
			$data['main']['ajax'] = TRUE;
			$this->parser->parse('revista/articulo', $data['main']);
			return;
		endif;
		if(isset($uriVar['mail']) && $uriVar['mail'] == "true"):
			$this->output->enable_profiler(FALSE);
			$data['main']['mail'] = TRUE;
			return $this->parser->parse('revista/articulo', $data['main'], TRUE);
		endif;

		$this->template->set_partial('view_js', 'revista/articulo_header', array(), TRUE);
		$this->template->title($data['header']['title']);
		if(ENVIRONMENT === "production"):
			$this->template->js('//s7.addthis.com/js/300/addthis_widget.js#pubid=herz');
		endif;
		$this->template->set_meta('description', $articulo['articulo']);
		/*Article meta*/
		if(isset($articulo)):
			$this->template->set_breadcrumb($articulo['revista'], site_url("revista/{$articulo['revistaSlug']}"));
			$this->template->set_meta('citation_title', $articulo['articulo']);
			$this->template->set_meta('eprints.title', $articulo['articulo']);
			$this->template->set_meta('citation_journal_title', $articulo['revista']);
			if(isset($articulo['issn'])):
				$this->template->set_meta('citation_issn', $articulo['issn']);
			endif;
			$this->template->set_meta('eprints.type', "article");
			$this->template->set_meta('eprints.ispublished', "pub");
			$this->template->set_meta('eprints.date_type', "published");
			$this->template->set_meta('eprints.publication', $articulo['revista']);
			$this->template->set_meta('prism.publicationName', $articulo['revista']);
			if(isset($articulo['issn'])):
				$this->template->set_meta('prism.issn', $articulo['issn']);
			endif;
			$this->template->set_meta('dc.title', $articulo['articulo']);
			if(isset($articulo['numero'])):
				$this->template->set_meta('citation_issue', $articulo['numero']);
				$this->template->set_meta('prism.number', $articulo['numero']);
			endif;
			if(isset($articulo['volumen'])):
				$this->template->set_meta('citation_volume', $articulo['volumen']);
				$this->template->set_meta('eprints.volume', $articulo['volumen']);
			endif;
			if(isset($articulo['paginacion'])):
				$this->template->set_meta('citation_firstpage', $articulo['paginacionFirst']);
				$this->template->set_meta('citation_lastpage', $articulo['paginacionLast']);
				$this->template->set_meta('eprints.pagerange', $articulo['paginacion']);
				$this->template->set_meta('prism.startingPage', $articulo['paginacionFirst']);
				$this->template->set_meta('prism.endingPage', $articulo['paginacionLast']);
			endif;
			if(isset($articulo['anioRevista'])):
				$this->template->set_meta('citation_date', $articulo['anioRevista']);
				$this->template->set_meta('eprints.date', $articulo['anioRevista']);
				$this->template->set_meta('prism.publicationDate', $articulo['anioRevista']);
				$this->template->set_meta('dc.date', $articulo['anioRevista']);
			endif;
			if(isset($articulo['autores'])):
				foreach ($articulo['autores'] as $autor):
					$this->template->append_metadata(sprintf('<meta name="eprints.creators_name" content="%s" />', $autor['a']));
					$this->template->append_metadata(sprintf('<meta name="dc.creator" content="%s" />', $autor['a']));
					$this->template->append_metadata(sprintf('<meta name="citation_author" content="%s" />', $autor['a']));
					if((int)$autor['z'] > 0):
						$institucion = $articulo['instituciones'][(int)$autor['z']-1];
						$this->template->append_metadata(sprintf('<meta name="citation_author_institution" content="%s, %s, %s, %s" />', $institucion['u'], $institucion['v'], $institucion['w'], $institucion['x']));
					endif;
				endforeach;
			endif;
			if(isset($articulo["url"])):
				foreach ($articulo["url"] as $url):
					if (is_array($url))
						$url = $url['u'];
					if(preg_match('/.*pdf.*/', $url)):
						$this->template->set_meta('citation_pdf_url', $url);
					else:
						$this->template->set_meta('citation_fulltext_html_url', $url);
					endif;
				endforeach;
			endif;
		endif;
		/*Article meta*/
		$this->template->build('revista/articulo', $data['main']);
	}
	
	public function numeros($revista){
		$query = 'select revista, "anioRevista", volumen, numero || parte as numero from "mvNumerosRevista" where "revistaSlug"=\''.$revista.'\' order by 2 desc, 3 desc, NULLIF(regexp_replace(numero, \'\D\', \'999\', \'g\'), \'\')::numeric';
		$this->load->database();
		$query = $this->db->query($query);
		$numeros = $query->result_array();
		$this->db->close();
		$data['main']['numeros'] = $numeros;
		$arr_numeros = array();
		
		$vol=null;
		$volAnterior=null;
		$cont=-1;
		$contVol=0;
		$contNum=-1;
		$anioAnterior=0;
		$arr_numeros['revista']=$numeros[0]['revista'];
		foreach ($numeros as $row):
			if($anioAnterior.$volAnterior != $row['anioRevista'].$row['volumen']){
				$anioAnterior = $row['anioRevista'];
				$cont = $cont+1;
				$volAnterior = $row['volumen'];
				$vol = $row['volumen'];
				$contVol=0;
				$contNum=-1;
			}

			$contNum = $contNum +1;
			$arr_numeros['numeros'][$cont]['anio'] = trim($anioAnterior);
			$arr_numeros['numeros'][$cont]['vol'] = trim($vol);
			$arr_numeros['numeros'][$cont]['num'][$contNum] = trim($row['numero']);
		endforeach;
				
		$this->parser->parse('revista/numeros', $arr_numeros);
		return;
	}
	
	/*
	public function solicitudDocumento(){
		$this->output->enable_profiler(FALSE);
		$send_email = TRUE;
		$result = array(
					'type' => 'error',
					'title' => _('No se pudo enviar la solicitud')
				);
		if(empty($_POST['email']) || empty($_POST['from']) || empty($_POST['revista']) || empty($_POST['articulo'])):
			$send_email =FALSE;
		endif;

		$verify_email = verifyEmail($_POST['email'], $this->config->item('valitation_email'), true);
		if($verify_email[0] == 'invalid'):
			$send_email =FALSE;
			$result['title'] .= '<br/>'._('Correo electrónico no válido');
		endif;

		$captcha_answer = $this->input->post('g-recaptcha-response');
		$response = $this->recaptcha->verifyResponse($captcha_answer);

		if(!$response['success']):
			$send_email =FALSE;
			$result['title'] .= '<br/>'._('Verificación incorrecta');
		endif;

		if ($send_email):
			$biblatDB = $this->load->database('biblat', TRUE);
			$config['mailtype'] = 'html';
			$this->load->library('email');
			$this->email->initialize($config);
			$this->email->from('solicitud@biblat.unam.mx', 'Solicitud Biblat');
			$this->email->to('sinfo@dgb.unam.mx');
			// $this->email->to('achwazer@gmail.com');
			// $this->email->cc('anoguez@dgb.unam.mx');
			$this->email->subject('Solicitud de documento Biblat');
			$data = $_POST;
			$data['fichaDocumento'] = $this->articulo($data['revista'], $data['articulo'], 'true');
			$body = $this->parser->parse('revista/mail_solicitud', $data, TRUE);
			$this->email->message($body);
			$this->email->send();
			$this->email->clear();

			$this->email->from('anoguezo@dgb.unam.mx', 'Dra. Araceli Noguez O.');
			$this->email->to($_POST['email']);
			$this->email->subject('Solicitud de documento Biblat');
			$body = $this->parser->parse('revista/mail_solicitud_usuario', $data, TRUE);
			$this->email->message($body);
			$this->email->send();
			//Almacenando registro en la bitácora
			$database = ($data['database'] == "CLASE") ? 0 : 1;
			$ip = (isset($_SERVER['REDIRECT_GEOIP_ADDR'])) ? $_SERVER['REDIRECT_GEOIP_ADDR'] : $_SERVER['REMOTE_ADDR'];
			$pais = (isset($_SERVER['REDIRECT_GEOIP_COUNTRY_NAME'])) ? "'{$_SERVER['REDIRECT_GEOIP_COUNTRY_NAME']}'" : "NULL";
			$ciudad = (isset($_SERVER['REDIRECT_GEOIP_REGION_NAME'])) ? "'{$_SERVER['REDIRECT_GEOIP_REGION_NAME']}'" : "NULL";
			$session_id = $this->session->userdata('session_id');
                        $split_ip = explode(".", $ip);
                        $geoip = ((int)$split_ip[0] * pow(256,3)) + ((int)$split_ip[1] * pow(256,2)) + ((int)$split_ip[2] * pow(256,1)) + ((int)$split_ip[3] * pow(256,0));
			$query = "INSERT INTO \"logSolicitudDocumento\"(database, sistema, nombre, email, instituto, telefono, ip, pais, ciudad, session_id, geoip)
				VALUES ({$database}, '{$data['sistema']}', '{$data['from']}', '{$data['email']}', '{$data['instituto']}', '{$data['telefono']}', '{$ip}', {$pais}, {$ciudad}, '{$session_id}', {$geoip});";
			$biblatDB->query($query);
			$result = array(
					'type' => 'success',
					'title' => _('La solicitud ha sido enviada')
				);
		endif;
		echo json_encode($result);
	}*/
	
	function compact_text($html) {
            $txt = html_entity_decode(strip_tags($html), ENT_QUOTES | ENT_HTML5, 'UTF-8');
            // compacta espacios/tabs múltiples y normaliza saltos de línea
            $txt = preg_replace('/[ \t]+/', ' ', $txt);
            $txt = preg_replace("/(\r\n|\r|\n){2,}/", "\n\n", $txt);
            return trim($txt);
        }
        
	public function solicitudDocumento() {
            $this->output->enable_profiler(FALSE);
            $send_email = TRUE;

            $result = array(
                'type' => 'error',
                'title' => _('No se pudo enviar la solicitud')
            );

            // Validaciones básicas
            if (empty($_POST['email']) || empty($_POST['from']) || empty($_POST['revista']) || empty($_POST['articulo'])):
                $result = array(
                    'type' => 'error',
                    'title' => _('Faltan datos por completar')
                );
                $send_email = FALSE;
            endif;


            $captcha_answer = $this->input->post('g-recaptcha-response');
            $response = $this->recaptcha->verifyResponse($captcha_answer);

            if (!$response['success']):
                $send_email = FALSE;
                $result['title'] .= '<br/>' . _('Verificación incorrecta');
            endif;

            if ($send_email):
                $data = $_POST;

                // Obtener ficha del documento y convertir a texto plano
                $data['fichaDocumento'] = $this->compact_text($this->articulo_mail($data['revista'], $data['articulo'], 'true'));

                // Guardar en bitácora
                $biblatDB = $this->load->database('biblat', TRUE);
                $database = ($data['database'] == "CLASE") ? 0 : 1;
                $ip = (isset($_SERVER['REDIRECT_GEOIP_ADDR'])) ? $_SERVER['REDIRECT_GEOIP_ADDR'] : $_SERVER['REMOTE_ADDR'];
                $pais = (isset($_SERVER['REDIRECT_GEOIP_COUNTRY_NAME'])) ? "'{$_SERVER['REDIRECT_GEOIP_COUNTRY_NAME']}'" : "NULL";
                $ciudad = (isset($_SERVER['REDIRECT_GEOIP_REGION_NAME'])) ? "'{$_SERVER['REDIRECT_GEOIP_REGION_NAME']}'" : "NULL";
                $session_id = $this->session->userdata('session_id');
                $split_ip = explode(".", $ip);
                $geoip = ((int)$split_ip[0] * pow(256,3)) + ((int)$split_ip[1] * pow(256,2)) + ((int)$split_ip[2] * pow(256,1)) + ((int)$split_ip[3] * pow(256,0));

                $query = "INSERT INTO \"logSolicitudDocumento\"(database, sistema, nombre, email, instituto, telefono, ip, pais, ciudad, session_id, geoip)
                    VALUES ({$database}, '{$data['sistema']}', '{$data['from']}', '{$data['email']}', '{$data['instituto']}', '{$data['telefono']}', '{$ip}', {$pais}, {$ciudad}, '{$session_id}', {$geoip});";
                $biblatDB->query($query);

                // Construcción del mailto:
                $to = 'sinfo@dgb.unam.mx';
                $cc = 'anoguezo@dgb.unam.mx';
                $subject = 'Solicitud de documento Biblat';

                $body = <<<EOT
                    A quien corresponda:

                    El usuario con los siguientes datos:

                    Nombre: {$data['from']}
                    Correo electrónico: {$data['email']}
                    Teléfono: {$data['telefono']}
                    Instituto: {$data['instituto']}

                    Ha solicitado el siguiente documento:

                    {$data['fichaDocumento']}
                    EOT;

                $mailto = 'mailto:' . rawurlencode($to) .
                          '?cc=' . rawurlencode($cc) .
                          '&subject=' . rawurlencode($subject) .
                          '&body=' . rawurlencode($body);

                // Resultado exitoso
                $result = array(
                    'type' => 'success',
                    'title' => _('La solicitud ha sido registrada. Da clic para enviarla desde tu correo personal.'),
                    'mailto' => $mailto
                );
            endif;

            echo json_encode($result);
        }
}
