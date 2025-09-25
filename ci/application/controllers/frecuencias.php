<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Frecuencias extends CI_Controller {

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
					url->>0 AS url,
					\"autoresJSON\",
					\"institucionesJSON\"";

	public function __construct()
	{
		parent::__construct();
		
		$this->output->enable_profiler($this->config->item('enable_profiler'));
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
		$data['disciplinas'] = $this->disciplinas;
		$this->db->close();

		$this->template->set_partial('biblat_js', 'javascript/biblat', array(), TRUE, FALSE);
		$this->template->set_partial('submenu', 'layouts/submenu');
		$this->template->set_partial('search', 'layouts/search');
		$this->template->set_breadcrumb(_('Inicio'), site_url('/'));
		$this->template->set_breadcrumb(_('Bibliometría'));
		$this->template->set('class_method', $this->router->fetch_class().$this->router->fetch_method());
	}

	public function index()
	{
		$data = array();
		$data['page_title'] = _('Frecuencias');
		$this->template->set_partial('view_js', 'frecuencias/header_index',$data['header'], TRUE);
		$this->template->title(_('Frecuencias'));
		$this->template->set_meta('description', _('Frecuencias'));
		$this->template->build('frecuencias/index', $data);
	}

	public function autor(){
		
		//$this->insertIP('frecuencias autor');
                
		$ip = $this->get_ip(); // Obtener la IP del visitante

		// Lista de prefijos de IP denegadas
		$denied_ips = unserialize(IPsBlock);

		// Lista de IPs permitidas
		$pass_ips = [
			"148.204.63.19",
			"148.204.63.195"
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
			//$this->insertIP('bloqueo frecuencias autor');
			redirect('main');
		}else{
			$this->insertIP('frecuencias autor');
		}
		
		
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaAutorDocumentos\"";
		$args['sortBy'] = array('autor', 'autorSlug', 'coautorias','documentos');
		$args['query'] = "SELECT * FROM \"mvFrecuenciaAutorDocumentos\"";
		$args['querySlug'] = "SELECT nombre AS unslug FROM author WHERE slug='{$args['slug']}' LIMIT 1";
		$args['where'] = "WHERE \"autorSlug\"='{$args['slug']}'";
		$args['breadcrumbSlug'][] = array('title' => _('Autor'), 'link' => 'frecuencias/autor');
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Autor'),
				'width' => 200
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'AutorSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Coautorías'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por autor');
		$data['header']['gridTitle'] = _sprintf('Frecuencia de documentos por autor');
		$data['main']['page_title'] = _('Autor');
		/*XML vars*/
		$args['xls']['cols'] = array( _('Autor'), _('Coautorías'), _('Documentos') );
		$args['xls']['query'] = "SELECT autor, coautorias, documentos FROM \"mvFrecuenciaAutorDocumentos\" %s ORDER BY documentos DESC, autor";
		$args['xls']['fileName'] = "Frecuencia-Autor.csv";
		$section = array('', '', '/coautoria', '/documento');
		$data['header']['section'] = json_encode($section, true);
		return $this->_renderFrecuency($args, $data);
	}

	public function autorDocumentos($slug){
		$args['slug'] = $slug;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vAutorDocumentos\" WHERE \"autorSlug\"='{$slug}'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaAutorDocumentos\" WHERE \"autorSlug\"='{$slug}'";
		$args['paginationURL'] = site_url("frecuencias/autor/{$slug}/documento");
		/*Datos del autor*/
		$this->load->database();
		$queryAutor = "SELECT nombre AS autor FROM author WHERE slug='{$slug}' LIMIT 1";
		$queryAutor = $this->db->query($queryAutor);
		
		/*Datos del humanindex*/
		$query = "SELECT encode(rfc::bytea, 'base64') AS rfc FROM humanindex WHERE slug='{$slug}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		if($query['rfc']){
			$rfc = $query['rfc'];
		}
		$this->db->close();
		
		$queryAutor = $queryAutor->row_array();
		$args['breadcrumb'][] = array('title' => _('Autor'), 'link' => 'frecuencias/autor');
		$args['breadcrumb'][] = array('title' => $queryAutor['autor'], 'link' => "frecuencias/autor/{$slug}");
		$args['page_title'] = sprintf('%s (%%d documentos)', $queryAutor['autor']);
		if($rfc){
                    $args['page_title'] .= '<br>' . "<a target='_blank' href='https://www.humanindex.unam.mx/humanindex/pagina/pagina_publicaciones.php?rfc={$rfc}'><img src='/img/hidx.png' style='width: 50px; height: 50px;'></a>&nbsp;&nbsp;&nbsp;Ver publicaciones en Humanindex";
                }
		$args['title'] = _sprintf('%s (%%d documentos)', $queryAutor['autor']);
		return $this->_renderDocuments($args);
	}

	public function autorCoautoria(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('autorCoautoria', 'autorCoSlug', 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Autor'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'autorCoSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaAutorCoautoria\" WHERE \"autorSlug\"='{$args['autorSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaAutorCoautoria\" WHERE \"autorSlug\"='{$args['autorSlug']}'";
		$this->load->database();
		$query = "SELECT nombre AS autor FROM author WHERE slug='{$args['autorSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$autor = $query['autor'];
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por autor "%s", coautores', $autor);
		$data['header']['gridTitle'] = _sprintf('Número de documentos por coautor del autor:<br/> %s', $autor);
		$data['main']['breadcrumb'][] = array('title' => _('Autor'), 'link' => 'frecuencias/autor');
		$data['main']['breadcrumb'][] = array('title' => $autor, 'link' => "frecuencias/autor/{$args['autorSlug']}");
		$data['main']['page_title'] = sprintf('%s/Coautoría', $autor);
		/*XML vars*/
		$args['xls']['cols'] = array( _('Autor'), _('Documentos'));
		$args['xls']['query'] = "SELECT autorCoautoria, documentos FROM \"mvFrecuenciaAutorCoautoria\" WHERE \"institucionSlug\"='{$args['institucionSlug']}' %s ORDER BY documentos DESC, pais";
		$args['xls']['fileName'] = "Frecuencia-{$autor}-Coautorias.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function autorCoautoriaDocumentos($autor, $coautor){
		$args['slug'] = $coautor;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vAutorCoautoriaDocumentos\" WHERE \"autorSlug\"='{$autor}' AND \"autorCoSlug\"='$coautor'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaAutorCoautoria\" WHERE \"autorSlug\"='{$autor}' AND \"autorCoSlug\"='{$coautor}'";
		$args['paginationURL'] = site_url("frecuencias/autor/{$autor}/coautoria/{$coautor}");
		/*Datos del autor*/
		$this->load->database();
		$query = "SELECT nombre AS autor FROM author WHERE slug='{$autor}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$autor = array(
				'slug' => $autor,
				'autor' => $query['autor']
			);
		/*Datos del coautor*/
		$query = "SELECT nombre AS coautor FROM author WHERE slug='{$coautor}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$coautor = array(
				'slug' => $coautor,
				'coautor' => $query['coautor']
			);
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('Autor'), 'link' => 'frecuencias/autor');
		$args['breadcrumb'][] = array('title' => $autor['autor'], 'link' => "frecuencias/autor/{$autor['slug']}");
		$args['breadcrumb'][] = array('title' => _('Coautoría'), 'link' => "frecuencias/autor/{$autor['slug']}/coautoria");
		$args['page_title'] = sprintf('%s / %s (%%d documentos)', anchor("frecuencias/autor/{$autor['slug']}/coautoria", _sprintf('%s/Coautoría', $autor['autor']), _("title= \"{$autor['autor']}/Coautoría\"")), $coautor['coautor']);
		$args['title'] = _sprintf('%s (%%d documentos)', $autor['autor']);
		return $this->_renderDocuments($args);
	}

	public function institucion(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('institucion', 'institucionSlug', 'paises', 'revistas', 'autores', 'disciplinas', 'coautorias','documentos');
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaInstitucionDARP\" {$where}";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaInstitucionDARP\"";
		$args['querySlug'] = "SELECT institucion AS unslug FROM institution WHERE slug='{$args['slug']}' LIMIT 1";
		$args['where'] = "WHERE \"institucionSlug\"='{$args['slug']}'";
		$args['breadcrumbSlug'][] = array('title' => _('Institución'), 'link' => 'frecuencias/institucion');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Institución'),
				'width' => 200
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'institucionSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('País-Revista'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Revistas'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Autores'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Disciplinas'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Instituciones coautoras'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		/*XML vars*/
		$args['xls']['cols'] = array( _('Institución'), _('Países'), _('Revistas'), _('Autores'), _('Disciplinas'), _('Coautoría institucional'), _('Documentos'));
		$args['xls']['query'] = "SELECT institucion, paises, revistas, autores, disciplinas, coautorias,documentos FROM \"mvFrecuenciaInstitucionDARP\" %s ORDER BY documentos DESC, institucion";
		$args['xls']['fileName'] = "Frecuencia-Institucion.csv";
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por institución');
		$data['header']['gridTitle'] = _sprintf('Número de documentos por país de publicación de la revista, título de la revista, autor y disciplina, por institución de afiliación del autor');
		$data['main']['page_title'] = _('Institución');
		$section = array('', '', '/pais', '/revista', '/autor', '/disciplina', '/coautoria','/documento');
		$data['header']['section'] = json_encode($section, true);
		return $this->_renderFrecuency($args, $data);
	}

	public function institucionDocumentos($slug){
		$args['slug'] = $slug;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vInstitucionDocumentos\" WHERE \"institucionSlug\"='{$slug}'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaInstitucionDARP\" WHERE \"institucionSlug\"='{$slug}'";
		$args['paginationURL'] = site_url("frecuencias/institucion/{$slug}/documento");
		/*Datos de la institucion*/
		$this->load->database();
		$queryInstitucion = "SELECT institucion FROM institution WHERE slug='{$slug}' LIMIT 1";
		$queryInstitucion = $this->db->query($queryInstitucion);
		$this->db->close();
		$queryInstitucion = $queryInstitucion->row_array();
		$args['breadcrumb'][] = array('title' => _('Institución'), 'link' => "frecuencias/institucion");
		$args['breadcrumb'][] = array('title' => $queryInstitucion['institucion'], 'link' => "frecuencias/institucion/{$slug}");
		$args['page_title'] = sprintf('%s (%%d documentos)', $queryInstitucion['institucion']);
		$args['title'] = _sprintf('%s (%%d documentos)', $queryInstitucion['institucion']);
		return $this->_renderDocuments($args);
	}

	public function institucionPais(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('paisRevista', 'paisRevistaSlug', 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('País'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'paisRevistaSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaInstitucionPais\" WHERE \"institucionSlug\"='{$args['institucionSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaInstitucionPais\" WHERE \"institucionSlug\"='{$args['institucionSlug']}'";
		$this->load->database();
		$query = "SELECT institucion FROM institution WHERE slug='{$args['institucionSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$institucion = $query['institucion'];
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por institución "%s", países de publicación', $institucion);
		$data['header']['gridTitle'] = _sprintf('Número de documentos por país de publicación de la revista de la institución:<br/> %s', $institucion);
		$data['main']['breadcrumb'][] = array('title' => _('Institución'), 'link' => "frecuencias/institucion");
		$data['main']['breadcrumb'][] = array('title' => $institucion, 'link' => "frecuencias/institucion/{$args['institucionSlug']}");
		$data['main']['page_title'] = sprintf('%s/País', $institucion);
		/*XML vars*/
		$args['xls']['cols'] = array( _('País'), _('Documentos'));
		$args['xls']['query'] = "SELECT \"paisRevista\", documentos FROM \"mvFrecuenciaInstitucionPais\" WHERE \"institucionSlug\"='{$args['institucionSlug']}' %s ORDER BY documentos DESC, pais";
		$args['xls']['fileName'] = "Frecuencia-{$institucion}-Paises.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function institucionPaisDocumentos($institucion, $pais){
		$args['slug'] = $pais;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vInstitucionDocumentos\" WHERE \"institucionSlug\"='{$institucion}' AND \"paisRevistaSlug\"='$pais'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaInstitucionPais\" WHERE \"institucionSlug\"='{$institucion}' AND \"paisRevistaSlug\"='{$pais}'";
		$args['paginationURL'] = site_url("frecuencias/institucion/{$institucion}/pais/{$pais}");
		/*Datos de la institucion*/
		$this->load->database();
		$query = "SELECT institucion FROM institution WHERE slug='{$institucion}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$institucion = array(
				'slug' => $institucion,
				'institucion' => $query['institucion']
			);
		/*Datos del país*/
		$query = "SELECT \"paisRevista\" FROM \"vSearchFull\" WHERE \"paisRevistaSlug\"='{$pais}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$pais = array(
				'slug' => $pais,
				'paisRevista' => $query['paisRevista']
			);
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('Institución'), 'link' => "frecuencias/institucion");
		$args['breadcrumb'][] = array('title' => $institucion['institucion'], 'link' => "frecuencias/institucion/{$institucion['slug']}");
		$args['breadcrumb'][] = array('title' => _('País'), 'link' => "frecuencias/institucion/{$institucion['slug']}/pais");
		$args['page_title'] = sprintf('%s (%%d documentos)', $pais['paisRevista']);
		$args['title'] = _sprintf('%s (%%d documentos)', $institucion['institucion']);
		return $this->_renderDocuments($args);
	}

	public function institucionRevista(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('revista', 'revistaSlug', 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Revista'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'revistaSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaInstitucionRevista\" WHERE \"institucionSlug\"='{$args['institucionSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaInstitucionRevista\" WHERE \"institucionSlug\"='{$args['institucionSlug']}'";
		$this->load->database();
		$query = "SELECT institucion FROM institution WHERE slug='{$args['institucionSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$institucion = $query['institucion'];
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por institución "%s", revistas de publicación', $institucion);
		$data['header']['gridTitle'] = _sprintf('Número de documentos publicados por revista de la institución: <br/>%s', $institucion);
		$data['main']['breadcrumb'][] = array('title' => _('Institución'), 'link' => "frecuencias/institucion");
		$data['main']['page_title'] = $institucion;
		/*XML vars*/
		$args['xls']['cols'] = array( _('Revista'), _('Documentos'));
		$args['xls']['query'] = "SELECT revista, documentos FROM \"mvFrecuenciaInstitucionRevista\" WHERE \"institucionSlug\"='{$args['institucionSlug']}' %s ORDER BY documentos DESC, revista";
		$args['xls']['fileName'] = "Frecuencia-{$institucion}-Revistas.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function institucionRevistaDocumentos($institucion, $revista){
		$args['slug'] = $revista;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vInstitucionDocumentos\" WHERE \"institucionSlug\"='{$institucion}' AND \"revistaSlug\"='$revista'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaInstitucionRevista\" WHERE \"institucionSlug\"='{$institucion}' AND \"revistaSlug\"='{$revista}'";
		$args['paginationURL'] = site_url("frecuencias/institucion/{$institucion}/revista/{$revista}");
		/*Datos de la institucion*/
		$this->load->database();
		$query = "SELECT institucion FROM institution WHERE slug='{$institucion}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$institucion = array(
				'slug' => $institucion,
				'institucion' => $query['institucion']
			);
		/*Datos del país*/
		$query = "SELECT revista FROM \"vSearchFull\" WHERE \"revistaSlug\"='{$revista}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$revista = array(
				'slug' => $revista,
				'revista' => $query['revista']
			);
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('Institución'), 'link' => "frecuencias/institucion");
		$args['breadcrumb'][] = array('title' => $institucion['institucion'], 'link' => "frecuencias/institucion/{$institucion['slug']}");
		$args['breadcrumb'][] = array('title' => _('Revista'), 'link' => "frecuencias/institucion/{$institucion['slug']}/revista");
		$args['page_title'] = sprintf('%s (%%d documentos)', $revista['revista']);
		$args['title'] = _sprintf('%s (%%d documentos)', $institucion['institucion']);
		return $this->_renderDocuments($args);
	}

	public function institucionAutor(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('autor', 'autorSlug', 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Autor'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'autorSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaInstitucionAutor\" WHERE \"institucionSlug\"='{$args['institucionSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaInstitucionAutor\" WHERE \"institucionSlug\"='{$args['institucionSlug']}'";
		$this->load->database();
		$query = "SELECT institucion FROM institution WHERE slug='{$args['institucionSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$institucion = $query['institucion'];
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por institución "%s", autor', $institucion);
		$data['header']['gridTitle'] = _sprintf('Número de documentos publicados por autor adscritos a la institución: <br/>%s', $institucion);
		$data['main']['breadcrumb'][] = array('title' => _('Institución'), 'link' => "frecuencias/institucion");
		$data['main']['breadcrumb'][] = array('title' => $institucion, 'link' => "frecuencias/institucion/{$args['institucionSlug']}");
		$data['main']['page_title'] = sprintf('%s/Autor', $institucion);
		/*XML vars*/
		$args['xls']['cols'] = array( _('Autor'), _('Documentos'));
		$args['xls']['query'] = "SELECT autor, documentos FROM \"mvFrecuenciaInstitucionAutor\" WHERE \"institucionSlug\"='{$args['institucionSlug']}' %s ORDER BY documentos DESC, autor";
		$args['xls']['fileName'] = "Frecuencia-{$institucion}-Autores.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function institucionAutorDocumentos($institucion, $autor){
		$args['slug'] = $autor;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vInstitucionAutorDocumentos\" WHERE \"institucionSlug\"='{$institucion}' AND \"autorSlug\"='$autor'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaInstitucionAutor\" WHERE \"institucionSlug\"='{$institucion}' AND \"autorSlug\"='{$autor}'";
		$args['paginationURL'] = site_url("frecuencias/institucion/{$institucion}/autor/{$autor}");
		/*Datos de la institucion*/
		$this->load->database();
		$query = "SELECT institucion FROM institution WHERE slug='{$institucion}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$institucion = array(
				'slug' => $institucion,
				'institucion' => $query['institucion']
			);
		/*Datos del país*/
		$query = "SELECT nombre AS autor FROM author WHERE slug='{$autor}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$autor = array(
				'slug' => $autor,
				'autor' => $query['autor']
			);
		/*Datos del humanindex*/
		$query = "SELECT encode(rfc::bytea, 'base64') AS rfc FROM humanindex WHERE slug='{$autor['slug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		if($query['rfc']){
			$rfc = $query['rfc'];
		}
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('Institución'), 'link' => "frecuencias/institucion");
		$args['breadcrumb'][] = array('title' => $institucion['institucion'], 'link' => "frecuencias/institucion/{$institucion['slug']}");
		$args['breadcrumb'][] = array('title' => _('Autor'), 'link' => "frecuencias/institucion/{$institucion['slug']}/autor");
		$args['page_title'] = sprintf('%s (%%d documentos)', $autor['autor']);
		if($rfc){
                    $args['page_title'] .= '<br>' . "<a target='_blank' href='https://www.humanindex.unam.mx/humanindex/pagina/pagina_publicaciones.php?rfc={$rfc}'><img src='/img/hidx.png' style='width: 50px; height: 50px;'></a>&nbsp;&nbsp;&nbsp;Ver publicaciones en Humanindex";
                }
		$args['title'] = _sprintf('%s (%%d documentos)', $institucion['institucion']);
		return $this->_renderDocuments($args);
	}

	public function institucionDisciplina(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('disciplina', 'disciplinaSlug', 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Disciplina'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'disciplinaSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaInstitucionDisciplina\" WHERE \"institucionSlug\"='{$args['institucionSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaInstitucionDisciplina\" WHERE \"institucionSlug\"='{$args['institucionSlug']}'";
		$this->load->database();
		$query = "SELECT institucion FROM institution WHERE slug='{$args['institucionSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$institucion = $query['institucion'];
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por institución "%s", disciplina', $institucion);
		$data['header']['gridTitle'] = _sprintf('Número de documentos publicados por disciplina en la institución: <br/>%s', $institucion);
		$data['main']['breadcrumb'][] =  array('title' => _('Institución'), 'link' => "frecuencias/institucion");
		$data['main']['breadcrumb'][] =  array('title' => $institucion, 'link' => "frecuencias/institucion/{$args['institucionSlug']}");
		$data['main']['page_title'] = sprintf('%s/Disciplina', $institucion);
		/*XML vars*/
		$args['xls']['cols'] = array( _('Disciplina'), _('Documentos'));
		$args['xls']['query'] = "SELECT disciplina, documentos FROM \"mvFrecuenciaInstitucionDisciplina\" WHERE \"institucionSlug\"='{$args['institucionSlug']}' %s ORDER BY documentos DESC, autor";
		$args['xls']['fileName'] = "Frecuencia-{$institucion}-Disciplinas.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function institucionDisciplinaDocumentos($institucion, $disciplina){
		$args['slug'] = $disciplina;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vInstitucionDocumentos\" WHERE \"institucionSlug\"='{$institucion}' AND \"disciplinaSlug\"='$disciplina'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaInstitucionDisciplina\" WHERE \"institucionSlug\"='{$institucion}' AND \"disciplinaSlug\"='{$disciplina}'";
		$args['paginationURL'] = site_url("frecuencias/institucion/{$institucion}/disciplina/{$disciplina}");
		/*Datos de la institucion*/
		$this->load->database();
		$query = "SELECT institucion FROM institution WHERE slug='{$institucion}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$institucion = array(
				'slug' => $institucion,
				'institucion' => $query['institucion']
			);
		/*Datos de la disciplina*/
		$query = "SELECT disciplina FROM disciplinas WHERE slug='{$disciplina}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$disciplina = array(
				'slug' => $disciplina,
				'disciplina' => $query['disciplina']
			);
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('Institución'), 'link' => "frecuencias/institucion");
		$args['breadcrumb'][] = array('title' => $institucion['institucion'], 'link' => "frecuencias/institucion/{$institucion['slug']}");
		$args['breadcrumb'][] = array('title' => _('Disciplina'), 'link' => "frecuencias/institucion/{$institucion['slug']}/disciplina");
		$args['page_title'] = sprintf('%s (%%d documentos)', $disciplina['disciplina']);
		$args['title'] = _sprintf('%s (%%d documentos)', $institucion['institucion']);
		return $this->_renderDocuments($args);
	}

	public function institucionCoautoria(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('institucionCoautoria', 'institucionCoSlug', 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Institución'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'institucionSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaInstitucionCoautoria\" WHERE \"institucionSlug\"='{$args['institucionSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaInstitucionCoautoria\" WHERE \"institucionSlug\"='{$args['institucionSlug']}'";
		$this->load->database();
		$query = "SELECT institucion FROM institution WHERE slug='{$args['institucionSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$institucion = $query['institucion'];
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por institución "%s", disciplina', $institucion);
		$data['header']['gridTitle'] = _sprintf('Número de documentos en coautoría en la institución: <br/>%s', $institucion);
		$data['main']['breadcrumb'][] = array('title' => _('Institución'), 'link' => "frecuencias/institucion");
		$data['main']['breadcrumb'][] = array('title' => $institucion, 'link' => "frecuencias/institucion/{$args['institucionSlug']}");
		$data['main']['page_title'] = sprintf('%s/Coautoría', $institucion);
		/*XML vars*/
		$args['xls']['cols'] = array( _('Institución'), _('Documentos'));
		$args['xls']['query'] = "SELECT \"institucionCoautoria\", documentos FROM \"mvFrecuenciaInstitucionCoautoria\" WHERE \"institucionSlug\"='{$args['institucionSlug']}' %s ORDER BY documentos DESC, autor";
		$args['xls']['fileName'] = "Frecuencia-{$institucion}-Coautoria.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function institucionCoautoriaDocumentos($institucion, $coautoria){
		$args['slug'] = $coautoria;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vInstitucionCoautoriaDocumentos\" WHERE \"institucionSlug\"='{$institucion}' AND \"institucionCoSlug\"='$coautoria'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaInstitucionCoautoria\" WHERE \"institucionSlug\"='{$institucion}' AND \"institucionCoSlug\"='{$coautoria}'";
		$args['paginationURL'] = site_url("frecuencias/institucion/{$institucion}/coautoria/{$coautoria}");
		/*Datos de la institucion*/
		$this->load->database();
		$query = "SELECT institucion FROM institution WHERE slug='{$institucion}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$institucion = array(
				'slug' => $institucion,
				'institucion' => $query['institucion']
			);
		/*Datos de la institucion coautoria*/
		$query = "SELECT institucion AS coautoria FROM institution WHERE slug='{$coautoria}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$coautoria = array(
				'slug' => $coautoria,
				'coautoria' => $query['coautoria']
			);
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('Institución'), 'link' => "frecuencias/institucion");
		$args['breadcrumb'][] = array('title' => $institucion['institucion'], 'link' => "frecuencias/institucion/{$institucion['slug']}");
		$args['breadcrumb'][] = array('title' => _('Coautoría'), 'link' => "frecuencias/institucion/{$institucion['slug']}/coautoria");
		$args['page_title'] = sprintf('%s (%%d documentos)', $coautoria['coautoria']);
		$args['title'] = _sprintf('%s (%%d documentos)', $institucion['institucion']);
		return $this->_renderDocuments($args);
	}

	public function paisAfiliacion(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('paisInstitucion', 'paisInstitucionSlug', 'instituciones', 'autores', 'disciplinas', 'coautorias','documentos');
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaPaisAfiliacion\" {$where}";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaPaisAfiliacion\"";
		$args['querySlug'] = $query = "SELECT pais AS unslug FROM institution WHERE \"paisInstitucionSlug\"='{$args['slug']}' LIMIT 1";
		$args['where'] = "WHERE \"paisInstitucionSlug\"='{$args['slug']}'";
		$args['breadcrumbSlug'][] = array('title' => _('País de afiliación'), 'link' => 'frecuencias/pais-afiliacion');
		/*XML vars*/
		$args['xls']['cols'] = array( _('País de afiliación'), _('Instituciones'), _('Autores'), _('Disciplinas'), _('Paises coautores'), _('Documentos') );
		$args['xls']['query'] = "SELECT \"paisInstitucion\", instituciones, autores, documentos FROM \"mvFrecuenciaPaisAfiliacion\" %s ORDER BY documentos DESC, \"paisInstitucion\"";
		$args['xls']['fileName'] = "Frecuencia-PaisAfiliacion.csv";
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('País de afiliación'),
				'width' => 200
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'institucionSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Instituciones'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Autores'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Disciplinas'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Paises coautores'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por institución');
		$data['header']['gridTitle'] = _sprintf('Número de documentos por institución, autor y disciplina por país de la institución del autor');
		$data['main']['page_title'] = _('País de afiliación');
		$section = array('', '', '/institucion', '/autor', '/disciplina', '/coautoria', '/documento');
		$data['header']['section'] = json_encode($section, true);
		return $this->_renderFrecuency($args, $data);
	}

	public function paisAfiliacionDocumentos($slug){
		$args['slug'] = $slug;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vPaisAfiliacionDocumentos\" WHERE \"paisInstitucionSlug\"='{$slug}'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaPaisAfiliacion\" WHERE \"paisInstitucionSlug\"='{$slug}'";
		$args['paginationURL'] = site_url("frecuencias/pais-afiliacion/{$slug}/documento");
		/*Datos del país de afiliacion*/
		$this->load->database();
		$query = "SELECT pais AS \"paisInstitucion\" FROM institution WHERE \"paisInstitucionSlug\"='{$slug}' LIMIT 1";
		$query = $this->db->query($query);
		$this->db->close();
		$query = $query->row_array();
		$args['breadcrumb'][] = array('title' => _('País de afiliación'), 'link' => "frecuencias/pais-afiliacion");
		$args['breadcrumb'][] = array('title' => $query['paisInstitucion'], 'link' => "frecuencias/pais-afiliacion/{$slug}");
		$args['page_title'] = sprintf('%s (%%d documentos)', $query['paisInstitucion']);
		$args['title'] = _sprintf('País de afiliación: %s (%%d documentos)', $query['paisInstitucion']);
		return $this->_renderDocuments($args);
	}

	public function paisAfiliacionInstitucion(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('institucion', 'institucionSlug', 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Institución'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'institucionSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaPaisAfiliacionInstitucion\" WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaPaisAfiliacionInstitucion\" WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}'";
		$this->load->database();
		$query = "SELECT \"paisInstitucion\" FROM \"mvFrecuenciaPaisAfiliacionInstitucion\" WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por país de afiliación "%s", instituciones', $query['paisInstitucion']);
		$data['header']['gridTitle'] = _sprintf('Número de documentos por institución de afiliación del autor del país:<br/> %s', $query['paisInstitucion']);
		$data['main']['breadcrumb'][] = array('title' => _('País de afiliación'), 'link' => "frecuencias/pais-afiliacion");
		$data['main']['breadcrumb'][] = array('title' => $query['paisInstitucion'], 'link' => "frecuencias/pais-afiliacion/{$args['paisInstitucionSlug']}");
		$data['main']['page_title'] = sprintf('%s/Institución', $query['paisInstitucion']);
		/*XML vars*/
		$args['xls']['cols'] = array( _('Institución'), _('Documentos'));
		$args['xls']['query'] = "SELECT institucion, documentos FROM \"mvFrecuenciaPaisAfiliacionInstitucion\" WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}' %s ORDER BY documentos DESC, institucion";
		$args['xls']['fileName'] = "Frecuencia-{$query['paisInstitucion']}-Instituciones.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function paisAfiliacionInstitucionDocumentos($pais, $institucion){
		$args['slug'] = $institucion;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vPaisAfiliacionInstitucionDocumentos\" WHERE \"paisInstitucionSlug\"='{$pais}' AND \"institucionSlug\"='{$institucion}'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaPaisAfiliacionInstitucion\" WHERE \"paisInstitucionSlug\"='{$pais}' AND \"institucionSlug\"='{$institucion}'";
		$args['paginationURL'] = site_url("frecuencias/pais-afiliacion/{$pais}/institucion/{$institucion}");
		/*Datos de la institucion*/
		$this->load->database();
		$query = "SELECT institucion FROM institution WHERE slug='{$institucion}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$institucion = array(
				'slug' => $institucion,
				'institucion' => $query['institucion']
			);
		/*Datos del país*/
		$query = "SELECT pais FROM institution WHERE \"paisInstitucionSlug\"='{$pais}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$pais = array(
				'slug' => $pais,
				'pais' => $query['pais']
			);
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('País de afiliación'), 'link' => "frecuencias/pais-afiliacion");
		$args['breadcrumb'][] = array('title' => $pais['pais'], 'link' => "frecuencias/pais-afiliacion/{$pais['slug']}");
		$args['breadcrumb'][] = array('title' => _('Institución'), 'link' => "frecuencias/pais-afiliacion/{$pais['slug']}/institucion");
		$args['page_title'] = sprintf('%s (%%d documentos)', $institucion['institucion']);
		$args['title'] = _sprintf('País de afiliación: %s/%s (%%d documentos)', $pais['pais'], $institucion['institucion']);
		return $this->_renderDocuments($args);
	}

	public function paisAfiliacionAutor(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('autor', 'autorSlug', 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Autor'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'autorSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaPaisAfiliacionAutor\" WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaPaisAfiliacionAutor\" WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}'";
		$this->load->database();
		$query = "SELECT \"paisInstitucion\" FROM \"mvFrecuenciaPaisAfiliacionAutor\" WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias país de afiliación "%s", autores', $query['paisInstitucion']);
		$data['header']['gridTitle'] = _sprintf('Número de documentos por autor del país de institución de afiliación:<br/> %s', $query['paisInstitucion']);
		$data['main']['breadcrumb'][] = array('title' => _('País de afiliación'), 'link' => "frecuencias/pais-afiliacion");
		$data['main']['breadcrumb'][] = array('title' => $query['paisInstitucion'], 'link' => "frecuencias/pais-afiliacion/{$args['paisInstitucionSlug']}");
		$data['main']['page_title'] = sprintf('%s/Autor', $query['paisInstitucion']);
		/*XML vars*/
		$args['xls']['cols'] = array( _('Autor'), _('Documentos') );
		$args['xls']['query'] = "SELECT autor, documentos FROM \"mvFrecuenciaPaisAfiliacionAutor\" WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}' %s ORDER BY documentos DESC, autor";
		$args['xls']['fileName'] = "Frecuencia-{$query['paisInstitucion']}-Autores.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function paisAfiliacionAutorDocumentos($pais, $autor){
		$args['slug'] = $autor;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vPaisAfiliacionAutorDocumentos\" WHERE \"paisInstitucionSlug\"='{$pais}' AND \"autorSlug\"='{$autor}'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaPaisAfiliacionAutor\" WHERE \"paisInstitucionSlug\"='{$pais}' AND \"autorSlug\"='{$autor}'";
		$args['paginationURL'] = site_url("frecuencias/pais-afiliacion/{$pais}/autor/{$autor}");
		/*Datos del autor*/
		$this->load->database();
		$query = "SELECT nombre AS autor FROM author WHERE slug='{$autor}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$autor = array(
				'slug' => $autor,
				'autor' => $query['autor']
			);
		/*Datos del país*/
		$query = "SELECT pais FROM institution WHERE \"paisInstitucionSlug\"='{$pais}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$pais = array(
				'slug' => $pais,
				'pais' => $query['pais']
			);
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('País de afiliación'), 'link' => "frecuencias/pais-afiliacion");
		$args['breadcrumb'][] = array('title' => $pais['pais'], 'link' => "frecuencias/pais-afiliacion/{$pais['slug']}");
		$args['breadcrumb'][] = array('title' => _('Autor'), 'link' => "frecuencias/pais-afiliacion/{$pais['slug']}/autor");
		$args['page_title'] = sprintf('%s (%%d documentos)', $autor['autor']);
		$args['title'] = _sprintf('País de afiliación: %s/%s (%%d documentos)', $pais['pais'], $autor['autor']);
		return $this->_renderDocuments($args);
	}

	public function paisAfiliacionDisciplina(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('disciplina', 'disciplinaSlug', 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Disciplina'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'disciplinaSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaPaisAfiliacionDisciplina\" WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaPaisAfiliacionDisciplina\" WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}'";
		$this->load->database();
		$query = "SELECT pais AS \"paisInstitucion\" FROM institution WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias país de afiliación "%s", autores', $query['paisInstitucion']);
		$data['header']['gridTitle'] = _sprintf('Número de documentos por autor del país de institución de afiliación:<br/> %s', $query['paisInstitucion']);
		$data['main']['breadcrumb'][] = array('title' => _('País de afiliación'), 'link' => "frecuencias/pais-afiliacion");
		$data['main']['breadcrumb'][] = array('title' => $query['paisInstitucion'], 'link' => "frecuencias/pais-afiliacion/{$args['paisInstitucionSlug']}");
		$data['main']['page_title'] = sprintf('%s/Disciplina', $query['paisInstitucion']);
		/*XML vars*/
		$args['xls']['cols'] = array( _('Autor'), _('Documentos') );
		$args['xls']['query'] = "SELECT disciplina, documentos FROM \"mvFrecuenciaPaisAfiliacionDisciplina\" WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}' %s ORDER BY documentos DESC, autor";
		$args['xls']['fileName'] = "Frecuencia-{$query['paisInstitucion']}-Disciplinas.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function paisAfiliacionDisciplinaDocumentos($pais, $disciplina){
		$args['slug'] = $disciplina;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vPaisAfiliacionDocumentos\" WHERE \"paisInstitucionSlug\"='{$pais}' AND \"disciplinaSlug\"='{$disciplina}'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaPaisAfiliacionDisciplina\" WHERE \"paisInstitucionSlug\"='{$pais}' AND \"disciplinaSlug\"='{$disciplina}'";
		$args['paginationURL'] = site_url("frecuencias/pais-afiliacion/{$pais}/disciplina/{$disciplina}");
		/*Datos de la disciplina*/
		$this->load->database();
		$query = "SELECT disciplina FROM disciplinas WHERE slug='{$disciplina}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$disciplina = array(
				'slug' => $disciplina,
				'disciplina' => $query['disciplina']
			);
		/*Datos del país*/
		$query = "SELECT pais FROM institution WHERE \"paisInstitucionSlug\"='{$pais}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$pais = array(
				'slug' => $pais,
				'pais' => $query['pais']
			);
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('País de afiliación'), 'link' => "frecuencias/pais-afiliacion");
		$args['breadcrumb'][] = array('title' => $pais['pais'], 'link' => "frecuencias/pais-afiliacion/{$pais['slug']}");
		$args['breadcrumb'][] = array('title' => _('Disciplina'), 'link' => "frecuencias/pais-afiliacion/{$pais['slug']}/disciplina");
		$args['page_title'] = sprintf('%s (%%d documentos)', $disciplina['disciplina']);
		$args['title'] = _sprintf('País de afiliación: %s/%s (%%d documentos)', $pais['pais'], $disciplina['disciplina']);
		return $this->_renderDocuments($args);
	}

	public function paisAfiliacionCoautoria(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('paisInstitucionCoautoria', 'paisInstitucionCoSlug', 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('País coautor'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'paisInstitucionCoSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaPaisAfiliacionCoautoria\" WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaPaisAfiliacionCoautoria\" WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}'";
		$this->load->database();
		$query = "SELECT pais AS \"paisInstitucion\" FROM institution WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias país de afiliación "%s", paises', $query['paisInstitucion']);
		$data['header']['gridTitle'] = _sprintf('Número de documentos en coautoría por país de institución de afiliación:<br/> %s', $query['paisInstitucion']);
		$data['main']['breadcrumb'][] = array('title' => _('País de afiliación'), 'link' => "frecuencias/pais-afiliacion");
		$data['main']['breadcrumb'][] = array('title' => $query['paisInstitucion'], 'link' => "frecuencias/pais-afiliacion/{$args['paisInstitucionSlug']}");
		$data['main']['page_title'] = sprintf('%s/Coautoría', $query['paisInstitucion']);
		/*XML vars*/
		$args['xls']['cols'] = array( _('País coautor'), _('Documentos') );
		$args['xls']['query'] = "SELECT \"paisInstitucionCoautoria\", documentos FROM \"mvFrecuenciaPaisAfiliacionCoautoria\" WHERE \"paisInstitucionSlug\"='{$args['paisInstitucionSlug']}' %s ORDER BY documentos DESC, autor";
		$args['xls']['fileName'] = "Frecuencia-{$query['paisInstitucion']}-Coautoria.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function paisAfiliacionCoautoriaDocumentos($pais, $coautoria){
		$args['slug'] = $coautoria;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vPaisAfiliacionCoautoriaDocumentos\" WHERE \"paisInstitucionSlug\"='{$pais}' AND \"paisInstitucionCoSlug\"='{$coautoria}'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaPaisAfiliacionCoautoria\" WHERE \"paisInstitucionSlug\"='{$pais}' AND \"paisInstitucionCoSlug\"='{$coautoria}'";
		$args['paginationURL'] = site_url("frecuencias/pais-afiliacion/{$pais}/coautoria/{$coautoria}");
		/*Datos del país coautor*/
		$this->load->database();
		$query = "SELECT pais AS coautoria FROM institution WHERE \"paisInstitucionSlug\"='{$coautoria}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$coautoria = array(
				'slug' => $coautoria,
				'coautoria' => $query['coautoria']
			);
		/*Datos del país*/
		$query = "SELECT pais FROM institution WHERE \"paisInstitucionSlug\"='{$pais}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$pais = array(
				'slug' => $pais,
				'pais' => $query['pais']
			);
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('País de afiliación'), 'link' => "frecuencias/pais-afiliacion");
		$args['breadcrumb'][] = array('title' => $pais['pais'], 'link' => "frecuencias/pais-afiliacion/{$pais['slug']}");
		$args['breadcrumb'][] = array('title' => _('Coautoría'), 'link' => "frecuencias/pais-afiliacion/{$pais['slug']}/coautoria");
		$args['page_title'] = sprintf('%s (%%d documentos)', $coautoria['coautoria']);
		$args['title'] = _sprintf('País de afiliación: %s/%s (%%d documentos)', $pais['pais'], $coautoria['coautoria']);
		return $this->_renderDocuments($args);
	}

	public function disciplina(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('disciplinaRevista', 'disciplinaSlug', 'instituciones', 'paises', 'revistas', 'documentos');
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaDisciplina\" {$where}";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaDisciplina\"";
		$args['querySlug'] = $query = "SELECT disciplina AS unslug FROM disciplinas WHERE slug='{$args['slug']}' LIMIT 1";
		$args['where'] = "WHERE \"disciplinaSlug\"='{$args['slug']}'";
		$args['breadcrumbSlug'][] = array('title' => _('Disciplina'), 'link' => 'frecuencias/disciplina');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Disciplina'),
				'width' => 200
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'disciplinaSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Institución'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('País-Revista'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Revistas'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		/*XML vars*/
		$args['xls']['cols'] = array( _('Disciplina'), _('Institución'), _('Países'), _('Revistas'), _('Documentos'));
		$args['xls']['query'] = "SELECT disciplina, paises, revistas, instituciones, documentos FROM \"mvFrecuenciaDisciplina\" %s ORDER BY documentos DESC, disciplina";
		$args['xls']['fileName'] = "Frecuencia-Disciplina.csv";
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por disciplina');
		$data['header']['gridTitle'] = _sprintf('Número de documentos por institución de afiliación del autor, país de la revista y título de la revista, por disciplina');
		$data['main']['page_title'] = _('Disciplina');
		$section = array('', '', '/institucion', '/pais', '/revista', '/documento');
		$data['header']['section'] = json_encode($section, true);
		return $this->_renderFrecuency($args, $data);
	}

	public function disciplinaDocumentos($slug){
		$args['slug'] = $slug;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vSearchFull\" WHERE \"disciplinaSlug\"='{$slug}'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaDisciplina\" WHERE \"disciplinaSlug\"='{$slug}'";
		$args['paginationURL'] = site_url("frecuencias/disciplina/{$slug}/documento");
		/*Datos de la disciplina*/
		$this->load->database();
		$queryDisciplina = "SELECT disciplina  FROM disciplinas WHERE slug='{$slug}' LIMIT 1";
		$queryDisciplina = $this->db->query($queryDisciplina);
		$this->db->close();
		$queryDisciplina = $queryDisciplina->row_array();
		$args['breadcrumb'][] = array('title' => _('Disciplina'), 'link' => 'frecuencias/disciplina');
		$args['breadcrumb'][] = array('title' => $queryDisciplina['disciplina'], 'link' => "frecuencias/disciplina/{$slug}");
		$args['page_title'] = sprintf('%s (%%d documentos)', $queryDisciplina['disciplina']);
		$args['title'] = _sprintf('%s (%%d documentos)', $queryDisciplina['disciplina']);
		return $this->_renderDocuments($args);
	}

	public function disciplinaInstitucion(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('institucion', 'institucionSlug', 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Institución'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'institucionSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaDisciplinaInstitucion\" WHERE \"disciplinaSlug\"='{$args['disciplinaSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaDisciplinaInstitucion\" WHERE \"disciplinaSlug\"='{$args['disciplinaSlug']}'";
		$this->load->database();
		$query = "SELECT disciplina FROM disciplinas WHERE slug='{$args['disciplinaSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$disciplina = $query['disciplina'];
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por disciplina "%s", institución de afiliación del autor', $disciplina);
		$data['header']['gridTitle'] = _sprintf('Número de documentos por institución de afiliación del autor de la disciplina:<br/> %s', $disciplina);
		$data['main']['breadcrumb'][] = array('title' => _('Disciplina'), 'link' => "frecuencias/disciplina");
		$data['main']['breadcrumb'][] = array('title' => $disciplina, 'link' => "frecuencias/disciplina/{$args['disciplinaSlug']}");
		$data['main']['page_title'] = sprintf('%s/Institución', $disciplina);
		/*XML vars*/
		$args['xls']['cols'] = array( _('Institución'), _('Documentos'));
		$args['xls']['query'] = "SELECT institucion, documentos FROM \"mvFrecuenciaDisciplinaInstitucion\" WHERE \"disciplinaSlug\"='{$args['disciplinaSlug']}' %s ORDER BY documentos DESC, institucion";
		$args['xls']['fileName'] = "Frecuencia-{$disciplina}-Instituciones.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function disciplinaInstitucionDocumentos($disciplina, $institucion){
		$args['slug'] = $institucion;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vInstitucionDocumentos\" WHERE \"disciplinaSlug\"='{$disciplina}' AND \"institucionSlug\"='$institucion'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaDisciplinaInstitucion\" WHERE \"disciplinaSlug\"='{$disciplina}' AND \"institucionSlug\"='{$institucion}'";
		$args['paginationURL'] = site_url("frecuencias/disciplina/{$disciplina}/institucion/{$institucion}");
		/*Datos de la disciplina*/
		$this->load->database();
		$query = "SELECT disciplina FROM disciplinas WHERE slug='{$disciplina}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$disciplina = array(
				'slug' => $disciplina,
				'disciplina' => $query['disciplina']
			);
		/*Datos de la institución*/
		$query = "SELECT institucion FROM institution WHERE slug='{$institucion}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$institucion = array(
				'slug' => $institucion,
				'institucion' => $query['institucion']
			);
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('Disciplina'), 'link' => "frecuencias/disciplina");
		$args['breadcrumb'][] = array('title' => $disciplina['disciplina'], 'link' => "frecuencias/disciplina/{$disciplina['slug']}");
		$args['breadcrumb'][] = array('title' => _('Institución'), 'link' => "frecuencias/disciplina/{$disciplina['slug']}/institucion");
		$args['page_title'] = sprintf('%s (%%d documentos)', $institucion['institucion']);
		$args['title'] = _sprintf('%s (%%d documentos)', $disciplina['disciplina']);
		return $this->_renderDocuments($args);
	}

	public function disciplinaPais(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('paisRevista', 'paisRevistaSlug' , 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('País-Revista'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'paisRevistaSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaDisciplinaPais\" WHERE \"disciplinaSlug\"='{$args['disciplinaSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaDisciplinaPais\" WHERE \"disciplinaSlug\"='{$args['disciplinaSlug']}'";
		$this->load->database();
		$query = "SELECT disciplina FROM disciplinas WHERE slug='{$args['disciplinaSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$disciplina = $query['disciplina'];
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por disciplina "%s", países de publicación de la revista', $disciplina);
		$data['header']['gridTitle'] = _sprintf('Número de documentos por país de la revista de la disciplina:<br/> %s', $disciplina);
		$data['main']['breadcrumb'][] = array('title' => _('Disciplina'), 'link' => "frecuencias/disciplina");
		$data['main']['breadcrumb'][] = array('title' => $disciplina, 'link' => "frecuencias/disciplina/{$args['disciplinaSlug']}");
		$data['main']['page_title'] = sprintf('%s/País', $disciplina);
		/*XML vars*/
		$args['xls']['cols'] = array( _('País'), _('Documentos'));
		$args['xls']['query'] = "SELECT \"paisRevista\", documentos FROM \"mvFrecuenciaDisciplinaPais\" WHERE \"disciplinaSlug\"='{$args['disciplinaSlug']}' %s ORDER BY documentos DESC, pais";
		$args['xls']['fileName'] = "Frecuencia-{$disciplina}-Paises.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function disciplinaPaisDocumentos($disciplina, $pais){
		$args['slug'] = $pais;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vSearchFull\" WHERE \"disciplinaSlug\"='{$disciplina}' AND \"paisRevistaSlug\"='$pais'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaDisciplinaPais\" WHERE \"disciplinaSlug\"='{$disciplina}' AND \"paisRevistaSlug\"='{$pais}'";
		$args['paginationURL'] = site_url("frecuencias/disciplina/{$disciplina}/pais/{$pais}");
		/*Datos de la disciplina*/
		$this->load->database();
		$query = "SELECT disciplina FROM disciplinas WHERE slug='{$disciplina}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$disciplina = array(
				'slug' => $disciplina,
				'disciplina' => $query['disciplina']
			);
		/*Datos del país*/
		$query = "SELECT \"paisRevista\" FROM \"vSearchFull\" WHERE \"paisRevistaSlug\"='{$pais}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$pais = array(
				'slug' => $pais,
				'paisRevista' => $query['paisRevista']
			);
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('Disciplina'), 'link' => "frecuencias/disciplina");
		$args['breadcrumb'][] = array('title' => $disciplina['disciplina'], 'link' => "frecuencias/disciplina/{$disciplina['slug']}");
		$args['breadcrumb'][] = array('title' => _('País'), 'link' => "frecuencias/disciplina/{$disciplina['slug']}/pais");
		$args['page_title'] = sprintf('%s (%%d documentos)', $pais['paisRevista']);
		$args['title'] = _sprintf('%s (%%d documentos)', $disciplina['disciplina']);
		return $this->_renderDocuments($args);
	}

	public function disciplinaRevista(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('revista', 'revistaSlug', 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Revista'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'revistaSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaDisciplinaRevista\" WHERE \"disciplinaSlug\"='{$args['disciplinaSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaDisciplinaRevista\" WHERE \"disciplinaSlug\"='{$args['disciplinaSlug']}'";
		$this->load->database();
		$query = "SELECT disciplina FROM disciplinas WHERE slug='{$args['disciplinaSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$disciplina = $query['disciplina'];
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por disciplina "%s", revistas de publicación', $disciplina);
		$data['header']['gridTitle'] = _sprintf('Número de documentos publicados por revista de la disciplina: <br/>%s', $disciplina);
		$data['main']['breadcrumb'][] = array('title' => _('Disciplina'), 'link' => "frecuencias/disciplina");
		$data['main']['breadcrumb'][] = array('title' => $disciplina, 'link' => "frecuencias/disciplina/{$args['disciplinaSlug']}");
		$data['main']['page_title'] = sprintf('%s/Revista', $disciplina);
		/*XML vars*/
		$args['xls']['cols'] = array( _('Revista'), _('Documentos'));
		$args['xls']['query'] = "SELECT revista, documentos FROM \"mvFrecuenciaDisciplinaRevista\" WHERE \"disciplinaSlug\"='{$args['disciplinaSlug']}' %s ORDER BY documentos DESC, revista";
		$args['xls']['fileName'] = "Frecuencia-{$disciplina}-Revistas.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function disciplinaRevistaDocumentos($disciplina, $revista){
		$args['slug'] = $revista;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vSearchFull\" WHERE \"disciplinaSlug\"='{$disciplina}' AND \"revistaSlug\"='$revista'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaDisciplinaRevista\" WHERE \"disciplinaSlug\"='{$disciplina}' AND \"revistaSlug\"='{$revista}'";
		$args['paginationURL'] = site_url("frecuencias/disciplina/{$disciplina}/revista/{$revista}");
		/*Datos de la disciplina*/
		$this->load->database();
		$query = "SELECT disciplina FROM disciplinas WHERE slug='{$disciplina}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$disciplina = array(
				'slug' => $disciplina,
				'disciplina' => $query['disciplina']
			);
		/*Datos de la revista*/
		$query = "SELECT revista FROM \"vSearchFull\" WHERE \"revistaSlug\"='{$revista}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$revista = array(
				'slug' => $revista,
				'revista' => $query['revista']
			);
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('Disciplina'), 'link' => "frecuencias/disciplina");
		$args['breadcrumb'][] = array('title' => $disciplina['disciplina'], 'link' => "frecuencias/disciplina/{$disciplina['slug']}");
		$args['breadcrumb'][] = array('title' => _('Revista'), 'link' => "frecuencias/disciplina/{$disciplina['slug']}/revista");
		$args['page_title'] = sprintf('%s (%%d documentos)', $revista['revista']);
		$args['title'] = _sprintf('%s (%%d documentos)', $disciplina['disciplina']);
		return $this->_renderDocuments($args);
	}

	private function _renderFrecuency($args, $data){
		$where = "";
		if ($args['export'] == "excel"):
			if(isset($args['slug']))
				$where = $args['where'];
			$args['xls']['queryTotal'] = "{$args['queryTotal']} {$where}";
			$args['xls']['query'] =  sprintf($args['xls']['query'], $where);
			return $this->_excel($args['xls']);
		endif;
		if(isset($args['slug'])):
			$this->load->database();
			$query = $this->db->query($args['querySlug']);
			$query = $query->row_array();
			$this->db->close();
			$where = $args['where'];
			$data['main']['breadcrumb'] = $args['breadcrumbSlug'];
			$data['main']['page_title'] = $query['unslug'];
		endif;
		if (isset($_POST['ajax'])):
			$this->load->database();
			/*Obtniendo el total de registros*/
			$query = $this->db->query("{$args['queryTotal']} {$where}");
			$query = $query->row_array();
			$data['main']['total'] = $query['total'];
			/*Filas de la tabla*/
			$sort = explode("-", $args['ordenar']);
			$order = $sort[0];
			$orderDir = strtoupper($sort[1]);
			$offset = $args['resultados'] * ($args['pagina']-1);
			$query = "{$args['query']} {$where} ORDER BY \"{$order}\" {$orderDir} LIMIT {$args['resultados']} OFFSET {$offset}";
			$query = $this->db->query($query);
			$result = array();
			$result['totalRecords']=$data['main']['total'];
			$result['curPage']=$_POST['page'];
			$result['data']=array();
			$rowNumber=1;
			foreach ($query->result_array() as $row):
				$rowResult = array();
				foreach ($args['sortBy'] as $col):
					$rowResult[]=$row[$col];
				endforeach;
				$result['data'][]=$rowResult;
				$rowNumber++;
			endforeach;
			$query->free_result();
			$this->db->close();
			$this->output->enable_profiler(false);
			header('Content-Type: application/json');
			echo json_encode($result, true);
			return 0;
		endif;
		/*Vistas*/
		$data['header']['colModel'] = json_encode($args['cols'], true);
		$data['header']['sortBy'] = json_encode($args['sortBy'], true);
		$data['header']['sortDir'] = $args['orderDir'];
		$data['header']['sortIndx'] = array_search($args['defaultOrder'], $args['sortBy']);
		$data['header']['args'] = pqgrid_args($args);

		$data['page_title'] = $data['main']['page_title'];
		$this->template->set_partial('view_js', 'frecuencias/header', $data['header'], TRUE, FALSE);
		$this->template->css('css/jquery-ui.min.css');
		$this->template->css('assets/js/pqgrid/pqgrid.dev.css');
		$this->template->css('assets/js/pqgrid/themes/Office/pqgrid.css');
		$this->template->css('css/jquery.contextMenu.css');
		$this->template->css('js/prettify/prettify.sunburst.css');
		$this->template->js('js/jquery-ui.min.js');
		$this->template->js('assets/js/pqgrid/pqgrid.dev.js');
		$this->template->js('assets/js/pqgrid/localize/pq-localize-es.js');
		$this->template->js('js/jquery.contextMenu.js');
		$this->template->js('js/prettify/prettify.js');
		$this->template->title($data['header']['title']);
		$this->template->set_breadcrumb(_('Frecuencias'), site_url('frecuencias'));
		if(isset($data['main']['breadcrumb'])):
			foreach ($data['main']['breadcrumb'] as $breadcrumb) {
				$this->template->set_breadcrumb($breadcrumb['title'], site_url($breadcrumb['link']));
			}
		endif;
		$this->template->set_meta('description', _('Frecuencias'));
		$this->template->build('frecuencias/common', $data);
	}

	public function revista(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('revista', 'revistaSlug', 'autores', 'instituciones', 'anios','documentos');
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaRevista\" {$where}";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaRevista\"";
		$args['querySlug'] = "SELECT revista AS unslug FROM \"mvFrecuenciaRevista\" WHERE \"revistaSlug\"='{$args['slug']}' LIMIT 1";
		$args['where'] = "WHERE \"revistaSlug\"='{$args['slug']}'";
		$args['breadcrumbSlug'][] = array('title' => _('Revista'), 'link' => 'frecuencias/revista');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Revista'),
				'width' => 200
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'revistaSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Autores'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Instituciones'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Años'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por revista');
		$data['header']['gridTitle'] = _sprintf('Número de documentos publicados por revista y autor');
		$data['main']['page_title'] = _('Revista');
		$section = array('', '', '/autor', '/institucion', '/anio', '/documento');
		$data['header']['section'] = json_encode($section, true);
		/*XML vars*/
		$args['xls']['cols'] = array( _('Revista'), _('Autores'), _('Instituciones'), _('Años'), _('Documentos') );
		$args['xls']['query'] = "SELECT revista, autores, instituciones, anios, documentos FROM \"mvFrecuenciaRevista\" %s ORDER BY documentos DESC, revista";
		$args['xls']['fileName'] = "Frecuencia-Revista.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function revistaDocumentos($slug){
		$args['slug'] = $slug;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vSearchFull\" WHERE \"revistaSlug\"='{$slug}'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaRevista\" WHERE \"revistaSlug\"='{$slug}'";
		$args['paginationURL'] = site_url("frecuencias/revista/{$slug}/documento");
		/*Datos del país de afiliacion*/
		$this->load->database();
		$query = "SELECT revista FROM \"vSearchFull\" WHERE \"revistaSlug\"='{$slug}' LIMIT 1";
		$query = $this->db->query($query);
		$this->db->close();
		$query = $query->row_array();
		$args['breadcrumb'][] = array('title' => _('Revista'), 'link' => 'frecuencias/revista');
		$args['breadcrumb'][] = array('title' => $query['revista'], 'link' => "frecuencias/revista/{$slug}");
		$args['page_title'] = sprintf('%s (%%d documentos)', $query['revista']);
		$args['title'] = _sprintf('Revista: %s (%%d documentos)', $query['revista']);
		return $this->_renderDocuments($args);
	}

	public function revistaAutor(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('autor', 'autorSlug', 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Autor'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'autorSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaRevistaAutor\" WHERE \"revistaSlug\"='{$args['revistaSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaRevistaAutor\" WHERE \"revistaSlug\"='{$args['revistaSlug']}'";
		$this->load->database();
		$query = "SELECT revista FROM \"vSearchFull\" WHERE \"revistaSlug\"='{$args['revistaSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por revista: %s, autores', $query['revista']);
		$data['header']['gridTitle'] = _sprintf('Número de documentos publicados por autor en la revista:<br/> %s', $query['revista']);
		$data['main']['breadcrumb'][] = array('title' => _('Revista'), 'link' => "frecuencias/revista");
		$data['main']['breadcrumb'][] = array('title' => $query['revista'], 'link' => "frecuencias/revista/{$args['revistaSlug']}");
		$data['main']['page_title'] = sprintf('%s / Autor', $query['revista']);
		/*XML vars*/
		$args['xls']['cols'] = array( ('Autor'), _('Documentos') );
		$args['xls']['query'] = "SELECT autor, documentos FROM \"mvFrecuenciaRevistaAutor\" WHERE \"revistaSlug\"='{$args['revistaSlug']}' %s ORDER BY documentos DESC, autor";
		$args['xls']['fileName'] = "Frecuencia-{$query['revista']}-Autores.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function revistaAutorDocumentos($revista, $autor){
		$args['slug'] = $autor;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vAutorDocumentos\" WHERE \"revistaSlug\"='{$revista}' AND \"autorSlug\"='$autor'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaRevistaAutor\" WHERE \"revistaSlug\"='{$revista}' AND \"autorSlug\"='{$autor}'";
		$args['paginationURL'] = site_url("frecuencias/revista/{$revista}/autor/{$autor}");
		/*Datos de la revista*/
		$this->load->database();
		$query = "SELECT revista FROM \"vSearchFull\" WHERE \"revistaSlug\"='{$revista}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$revista = array(
				'slug' => $revista,
				'revista' => $query['revista']
			);
		/*Datos del autor*/
		$query = "SELECT nombre AS autor FROM author WHERE slug='{$autor}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$autor = array(
				'slug' => $autor,
				'autor' => $query['autor']
			);
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('Revista'), 'link' => "frecuencias/revista");
		$args['breadcrumb'][] = array('title' => $revista['revista'], 'link' => "frecuencias/revista/{$revista['slug']}");
		$args['breadcrumb'][] = array('title' => _('Autor'), 'link' => "frecuencias/revista/{$revista['slug']}/autor");
		$args['page_title'] = sprintf('%s (%%d documentos)', $autor['autor']);
		$args['title'] = _sprintf('Revista: %s/%s (%%d documentos)', $revista['revista'], $autor['autor']);
		return $this->_renderDocuments($args);
	}

	public function revistaAnio(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "anio";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('anio', 'anio', 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Año'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'anio',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaRevistaAnio\" WHERE \"revistaSlug\"='{$args['revistaSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaRevistaAnio\" WHERE \"revistaSlug\"='{$args['revistaSlug']}'";
		$this->load->database();
		$query = "SELECT revista FROM \"vSearchFull\" WHERE \"revistaSlug\"='{$args['revistaSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por revista: %s, autores', $query['revista']);
		$data['header']['gridTitle'] = _sprintf('Cobertura por años de la revista:<br/> %s', $query['revista']);
		$data['main']['breadcrumb'][] = array('title' => _('Revista'), 'link' => "frecuencias/revista");
		$data['main']['breadcrumb'][] = array('title' => $query['revista'], 'link' => "frecuencias/revista/{$args['revistaSlug']}");
		$data['main']['page_title'] = sprintf('%s / Año', $query['revista']);
		$args['xls']['cols'] = array( ('Año'), _('Documentos') );
		$args['xls']['query'] = "SELECT autor, documentos FROM \"mvFrecuenciaRevistaAutor\" WHERE \"revistaSlug\"='{$args['revistaSlug']}' %s ORDER BY documentos DESC, autor";
		$args['xls']['fileName'] = "Frecuencia-{$query['revista']}-Años.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function revistaAnioDocumentos($revista, $anio){
		$args['slug'] = $anio;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vSearchFull\" WHERE \"revistaSlug\"='{$revista}' AND \"anioRevista\"='$anio'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaRevistaAnio\" WHERE \"revistaSlug\"='{$revista}' AND anio='{$anio}'";
		$args['paginationURL'] = site_url("frecuencias/revista/{$revista}/anio/{$anio}");
		$args['firstPageNumber'] = TRUE;
		/*Datos de la revista*/
		$this->load->database();
		$query = "SELECT revista FROM \"vSearchFull\" WHERE \"revistaSlug\"='{$revista}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$revista = array(
				'slug' => $revista,
				'revista' => $query['revista']
			);
		/*Datos del año*/
		$anio = array(
				'slug' => $anio,
				'anio' => $anio
			);
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('Revista'), 'link' => "frecuencias/revista");
		$args['breadcrumb'][] = array('title' => $revista['revista'], 'link' => "frecuencias/revista/{$revista['slug']}");
		$args['breadcrumb'][] = array('title' => _('Año'), 'link' => "frecuencias/revista/{$revista['slug']}/anio");
		$args['page_title'] = sprintf('%s (%%d documentos)', $anio['anio']);
		$args['title'] = _sprintf('Revista: %s/%s (%%d documentos)', $revista['revista'], $anio['anio']);
		return $this->_renderDocuments($args);
	}

	public function revistaInstitucion(){
		$args = $this->uri->ruri_to_assoc();
		$args['defaultOrder'] = "documentos";
		$args['orderDir'] = "DESC";
		$args['sortBy'] = array('institucion', 'institucionSlug', 'documentos');
		/*Columnas de la tabla*/
		$args['cols'][] = array(
				'editable' => false,
				'title' => _('Institución'),
				'width' => 320
			);
		$args['cols'][] = array(
				'editable' => false,
				'hidden' => true,
				'title' => 'institucionSlug',
				'width' => 200
			);
		$args['cols'][] = array(
				'align' => 'center',
				'editable' => false,
				'title' => _('Documentos'),
				'width' => 100,
				'className' => 'pq-link'
			);
		$args['queryTotal'] = "SELECT count(*) AS total FROM \"mvFrecuenciaRevistaInstitucion\" WHERE \"revistaSlug\"='{$args['revistaSlug']}'";
		$args['query'] = "SELECT * FROM \"mvFrecuenciaRevistaInstitucion\" WHERE \"revistaSlug\"='{$args['revistaSlug']}'";
		$this->load->database();
		$query = "SELECT revista FROM \"vSearchFull\" WHERE \"revistaSlug\"='{$args['revistaSlug']}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$this->db->close();
		$data = array();
		$data['header']['title'] = _sprintf('Frecuencias por revista: %s, autores', $query['revista']);
		$data['header']['gridTitle'] = _sprintf('Número de documentos publicados por institución de afiliación del autor en la revista:<br/> %s', $query['revista']);
		$data['main']['breadcrumb'][] = array('title' => _('Revista'), 'link' => "frecuencias/revista");
		$data['main']['breadcrumb'][] = array('title' => $query['revista'], 'link' => "frecuencias/revista/{$args['revistaSlug']}");
		$data['main']['page_title'] = sprintf('%s / Institución', $query['revista']);
		/*XML vars*/
		$args['xls']['cols'] = array( ('Autor'), _('Documentos') );
		$args['xls']['query'] = "SELECT autor, documentos FROM \"mvFrecuenciaRevistaAutor\" WHERE \"revistaSlug\"='{$args['revistaSlug']}' %s ORDER BY documentos DESC, autor";
		$args['xls']['fileName'] = "Frecuencia-{$query['revista']}-Instituciones.csv";
		return $this->_renderFrecuency($args, $data);
	}

	public function revistaInstitucionDocumentos($revista, $institucion){
		$args['slug'] = $institucion;
		$args['query'] = "SELECT {$this->queryFields} FROM \"vInstitucionDocumentos\" WHERE \"revistaSlug\"='{$revista}' AND \"institucionSlug\"='$institucion'";
		$args['queryCount'] = "SELECT documentos AS total FROM \"mvFrecuenciaRevistaInstitucion\" WHERE \"revistaSlug\"='{$revista}' AND \"institucionSlug\"='{$institucion}'";
		$args['paginationURL'] = site_url("frecuencias/revista/{$revista}/institucion/{$institucion}");
		/*Datos de la revista*/
		$this->load->database();
		$query = "SELECT revista FROM \"vSearchFull\" WHERE \"revistaSlug\"='{$revista}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$revista = array(
				'slug' => $revista,
				'revista' => $query['revista']
			);
		/*Datos de la institucion*/
		$this->load->database();
		$query = "SELECT institucion FROM institution WHERE slug='{$institucion}' LIMIT 1";
		$query = $this->db->query($query);
		$query = $query->row_array();
		$institucion = array(
				'slug' => $institucion,
				'institucion' => $query['institucion']
			);
		$this->db->close();
		$args['breadcrumb'][] = array('title' => _('Revista'), 'link' => "frecuencias/revista");
		$args['breadcrumb'][] = array('title' => $revista['revista'], 'link' => "frecuencias/revista/{$revista['slug']}");
		$args['breadcrumb'][] = array('title' => _('Institución'), 'link' => "frecuencias/revista/{$revista['slug']}/institucion");
		$args['page_title'] = sprintf('%s (%%d documentos)', $institucion['institucion']);
		$args['title'] = _sprintf('Revista: %s/%s (%%d documentos)', $revista['revista'], $institucion['institucion']);
		return $this->_renderDocuments($args);
	}

	private function _renderDocuments($args){
		/*Obtniendo los registros con paginación*/
		$query = "{$args['query']} ORDER BY \"anioRevista\" DESC, regexp_replace(volumen, '([0-9]+?)[^0-9].+?$', '\1') DESC, regexp_replace(numero, '([0-9]+?)[^0-9].+?$', '\1') DESC, \"articuloSlug\"";
		if($args['firstPageNumber']):
			$articulosResultado = articulosResultado($query, $args['queryCount'], $args['paginationURL'], $resultados=20, FALSE, TRUE);
		else:
			$articulosResultado = articulosResultado($query, $args['queryCount'], $args['paginationURL'], $resultados=20);
		endif;
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
		$this->template->set_breadcrumb(_('Frecuencias'), site_url('frecuencias'));
		if(isset($args['breadcrumb'])):
			foreach ($args['breadcrumb'] as $breadcrumb) {
				$this->template->set_breadcrumb($breadcrumb['title'], site_url($breadcrumb['link']));
			}
		endif;
		$this->template->set_meta('description', _('Frecuencias'));
		$this->template->build('revista/index', $data['main']);
	}
	private function _excel($xls){
		@set_time_limit(3000);
		$this->load->database();
		/*Sheets*/
		$query = $this->db->query($xls['queryTotal']);
		$query = $query->row_array();
		$sheetLimit = 1048576;
		$sheets = ceil($query['total'] / $sheetLimit);
		// echo $sheets;
		// print_r($xls); die();
		for ($i=0; $i < $sheets; $i++) :
			$data = array();
			$data[] = $xls['cols'];
			$offset = $i * $sheetLimit;
			$query = $this->db->query("{$xls['query']} LIMIT {$sheetLimit} OFFSET {$offset}");
			$this->output->enable_profiler(false);
			header('Content-Type: application/vnd.ms-excel; charset=utf-8');
			header('Content-Disposition: attachment;filename="'.$xls['fileName'].'"');
			header('Cache-Control: max-age=0');
			$colsTotal=1;
			foreach ($xls['cols'] as $col):
				if(preg_match("/\s/", $col)):
					echo "\"{$col}\"";
				else:
					echo $col;
				endif;
				if($colsTotal < count($xls['cols'])):
					echo ", ";
				else:
					echo ", \n";
				endif;
				$colsTotal++;
			endforeach;
			foreach ($query->result_array() as $row):
				$colsTotal=1;
				foreach ($row as $col):
					if(preg_match("/\s/", $col)):
						echo "\"{$col}\"";
					else:
						echo $col;
					endif;
					if($colsTotal < count($xls['cols'])):
						echo ", ";
					else:
						echo ", \n";
					endif;
					$colsTotal++;
				endforeach;
			endforeach;
			$query->free_result();
		endfor;
		$this->db->close();
	}

	public function test(){
		$this->load->database();
		$query="SELECT s.* FROM
 (SELECT DISTINCT ON(sistema) sistema FROM \"vPaisAfiliacionDocumentos\" WHERE \"paisInstitucionSlug\"='republica-dominicana') t
 INNER JOIN \"vSearchFull\" s on t.sistema=s.sistema";
 		$query = $this->db->query($query);

 		header('Content-Type: application/vnd.ms-excel; charset=utf-8');
		header('Content-Disposition: attachment;filename="republica-dominicana.csv"');
		header('Cache-Control: max-age=0');
		echo '"articulo", "revista", "pais", "issn", "idioma", "anio", "volumen", "numero", "periodo", "paginacion", "url", "tipoDocumento", "enfoqueDocumento", "autores", "instituciones", "disciplinas", "palabrasClave"';
		echo "\n";
 		foreach ($query->result_array() as $row):
 			/*Generando arreglo de autores*/
			if($row['autoresJSON'] != NULL):
				$row['autores'] = json_decode($row['autoresJSON'], TRUE);
			endif;
			unset($row['autoresJSON']);
			/*Generando arreglo de instituciones*/
			if($row['institucionesJSON'] != NULL):
				$row['instituciones'] = json_decode($row['institucionesJSON'], TRUE);
			endif;
			unset($row['institucionesJSON']);
			$autores="";
			$autorOffset=1;
			foreach($row['autores'] as $autor):
				$autores .= "{$autor['a']} ({$autor['z']})";
				if($autorOffset < count($row['autores'])):
					$autores .= "; ";
 				endif;
				$autorOffset++;
			endforeach;
			$instituciones="";
			$institucionOffset=1;
			foreach($row['instituciones'] as $institucion):
				$instituciones .= "({$institucion['z']}) {$institucion['u']}";
				if($institucionOffset < count($row['instituciones'])):
					$instituciones .= "; ";
 				endif;
				$institucionOffset++;
			endforeach;
			$row['disciplinas'] = json_decode($row['disciplinasJSON']);
			$disciplinas="";
			$disciplinaOffset=1;
			foreach ($row['disciplinas'] as $disciplina):
				$disciplinas .= "{$disciplina}";
				if($disciplinaOffset < count($row['disciplinas'])):
					$disciplinas .= "; ";
 				endif;
				$disciplinaOffset++;
			endforeach;
			$row['palabrasClave'] = json_decode($row['palabrasClaveJSON']);
			$palabrasClave="";
			$palabraClaveOffset=1;
			foreach ($row['palabrasClave'] as $palabraClave):
				$palabrasClave .= "{$palabraClave}";
				if($palabraClaveOffset < count($row['palabrasClave'])):
					$palabrasClave .= "; ";
 				endif;
				$palabraClaveOffset++;
			endforeach;
			$result = "\"{$row['articulo']}\", \"{$row['revista']}\", \"{$row['paisRevista']}\", \"{$row['issn']}\", \"{$row['idioma']}\", \"{$row['anioRevista']}\", \"{$row['volumen']}\", \"{$row['numero']}\", \"{$row['periodo']}\", \"{$row['paginacion']}\", \"{$row['url']}\", \"{$row['tipoDocumento']}\", \"{$row['enfoqueDocumento']}\", \"{$autores}\", \"{$instituciones}\", \"{$disciplinas}\", \"{$palabrasClave}\"\n";
 			echo $result;
 		endforeach;
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

}

/* End of file frecuencias.php */
/* Location: ./application/controllers/frecuencias.php */
