<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Indice extends CI_Controller{
	public function __construct(){
		parent::__construct();
		
		$this->reviewIP("índice");
		
		$this->output->enable_profiler($this->config->item('enable_profiler'));
		$this->template->set_partial('biblat_js', 'javascript/biblat', array(), TRUE, FALSE);
		$this->template->set_partial('submenu', 'layouts/submenu');
		$this->template->set_partial('search', 'layouts/search');
		$this->template->set_breadcrumb(_('Inicio'), site_url('/'));
		$this->template->set_breadcrumb(_('Índice'));
		$this->template->set('class_method', $this->router->fetch_class().$this->router->fetch_method());
	}
	public function index(){

	}

	public function alfabetico($letra="a"){
		$this->load->library('pagination');
		$config['base_url'] = site_url('indice/alfabetico');
		$config['uri_segment'] = 4;
		$config['first_link'] = "&laquo;";
		$config['last_link'] = "&raquo;";
		$config['next_link'] = "&rsaquo;";
		$config['prev_link'] = "&lsaquo;";
		$config['cur_tag_open'] = '<li class="active text-uppercase"><a href="javascript:;">';
		$config['cur_tag_close'] = '</a></li>';
		$config['num_tag_open'] = '<li class="text-uppercase">';
		$config['num_tag_close'] = '</li>';
		$config['prev_tag_open'] = '<li>';
		$config['prev_tag_close'] = '</li>';
		$config['next_tag_open'] = '<li>';
		$config['next_tag_close'] = '</li>';
		$config['first_tag_open'] = '<li>';
		$config['first_tag_close'] = '</li>';
		$config['last_tag_open'] = '<li>';
		$config['last_tag_close'] = '</li>';
		$config['full_tag_open'] = '<ul class="pagination hidden-md hidden-lg">';
		$config['full_tag_close'] = '</ul>';
		$this->pagination->initialize($config);

		$data = array();
		$data['header']['title'] = _sprintf('Indice alfabético "%s"', strtoupper($letra));
		/*Consultas*/
		$this->load->database();
		$query = "SELECT revista, \"revistaSlug\", count(revista) AS articulos FROM \"mvSearch\" WHERE SUBSTRING(LOWER(revista), 1, 1)='{$letra}' GROUP BY revista, \"revistaSlug\" ORDER BY revista;";
		$query = $this->db->query($query);
		$data['alfabetico']['registrosTotalArticulos'] = 0;
		foreach ($query->result_array() as $row):
			if($row['revista'] == ""):
				$row['revista'] = _("[Título no definido]");
			endif;
			$data['alfabetico']['registros'][] = $row;
			$data['alfabetico']['registrosTotalArticulos'] += $row['articulos'];
		endforeach;
		$query->free_result();
		$this->db->close();
		$data['alfabetico']['letra'] = strtoupper($letra);
		$data['alfabetico']['alpha_links'] = $this->pagination->create_alpha_links();
		/*Vistas*/
		$data['alfabetico']['page_title'] = sprintf('Revistas por orden alfabético: %s', strtoupper($letra));
		$this->template->title(_sprintf('%s', $data['alfabetico']['page_title']));
		$this->template->set_meta('description', $data['alfabetico']['page_title']);
		$this->template->set_breadcrumb(_('Alfabético'));
		$this->template->build('indice/alfabetico', $data['alfabetico']);
	}

	public function disciplina($disciplina){
		$data = array();
		/*Consultas*/
		$this->load->database();
		/*Obteniendo lista de disciplinas*/
		$query = "SELECT * FROM \"mvDisciplina\"";
		$query = $this->db->query($query);
		foreach ($query->result_array() as $row):
			$data['disciplina']['disciplinas'][$row['slug']] = $row;
		endforeach;
		$query->free_result();
		$data['disciplina']['current'] = $data['disciplina']['disciplinas'][$disciplina];
		/*Obteniendo registros*/
		$query = "SELECT revista, \"revistaSlug\", count(revista) AS articulos FROM \"mvSearch\" WHERE id_disciplina = '{$data['disciplina']['current']['id_disciplina']}' GROUP BY revista, \"revistaSlug\" ORDER BY articulos DESC";
		$query = $this->db->query($query);
		$data['disciplina']['registrosTotalArticulos'] = 0;
		foreach ($query->result_array() as $row):
			if($row['revista'] == ""):
				$row['revista'] = "[Título no definido]";
			endif;
			$data['disciplina']['registros'][] = $row;
			$data['disciplina']['registrosTotalArticulos'] += $row['articulos'];
		endforeach;
		$this->db->close();
		/*Vistas*/
		$data['disciplina']['page_title'] = sprintf('Revistas del área de "%s"', $data['disciplina']['current']['disciplina']);
		$this->template->title(_sprintf('%s', $data['disciplina']['page_title']));
		$this->template->set_meta('description', $data['disciplina']['page_title']);
		$this->template->set_breadcrumb(_('Disciplina'));
		$this->template->build('indice/disciplina', $data['disciplina']);
	}

	public function pais($pais){
		$data = array();
		/*Consultas*/
		$this->load->database();
		/*Obteniendo lista de paises*/
		$query = "SELECT * FROM \"mvPais\"";
		$query = $this->db->query($query);
		foreach ($query->result_array() as $row):
			$data['pais']['paises'][$row['paisRevistaSlug']] = $row;
		endforeach;
		$query->free_result();
		$data['pais']['current'] = $data['pais']['paises'][$pais];
		/*Obteniendo registros*/
		$query = "SELECT revista, \"revistaSlug\", count(revista) AS articulos FROM \"mvSearch\" WHERE \"paisRevistaSlug\"='{$pais}' GROUP BY revista, \"revistaSlug\" ORDER BY articulos DESC";
		$query = $this->db->query($query);
		$data['pais']['registrosTotalArticulos'] = 0;
		foreach ($query->result_array() as $row):
			if($row['revista'] == ""):
				$row['revista'] = "[Título no definido]";
			endif;
			$data['pais']['registros'][] = $row;
			$data['pais']['registrosTotalArticulos'] += $row['articulos'];
		endforeach;
		$this->db->close();
		/*Vistas*/
		$data['pais']['page_title'] = sprintf('Revistas por país: "%s"', $data['pais']['current']['paisRevista']);
		$this->template->title(_sprintf('%s', $data['pais']['page_title']));
		$this->template->set_meta('description', $data['pais']['page_title']);
		$this->template->set_breadcrumb(_('País'));
		$this->template->build('indice/pais', $data['pais']);
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
			//$this->insertIP('bloqueo ' . $pagina);
			redirect('main');
		}else{
			$this->insertIP($pagina);
		}
	}
}