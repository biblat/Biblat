<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require 'vendor/autoload.php';
require 'vendor/google-api/vendor/autoload.php';
require 'vendor/phpgangsta/vendor/phpgangsta/googleauthenticator/PHPGangsta/GoogleAuthenticator.php';

class Buscar extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->output->enable_profiler($this->config->item('enable_profiler'));
		$this->template->set_partial('biblat_js', 'javascript/biblat', array(), TRUE, FALSE);
		$this->template->set_partial('submenu', 'layouts/submenu');
		$this->template->set_partial('search', 'layouts/search');
		$this->template->set_breadcrumb(_('Inicio'), site_url('/'));
		$this->template->set_breadcrumb(_('Buscar'));
		$this->template->set('class_method', $this->router->fetch_class().$this->router->fetch_method());
	}

	public function index($filtro="", $disciplina="", $slug="", $textoCompleto=""){
		if( $this->input->get_post('csrf_token') ){
			if( $this->input->get_post('csrf_token') !== $this->session->userdata('csrf_token') ){
				http_response_code(403);
			}else{
				$nuevo_token = bin2hex(random_bytes(32));
				$this->session->set_userdata('csrf_token', $nuevo_token);
			}
		}
		
		if(!$this->validaSolicitud()){
			http_response_code(403);
		}
		
		$queryFields='';
        $queryFrom='';
		
		if($this->input->get_post('filtro') == 'ia' || $filtro == 'ia'){
			$returnURL = site_url(preg_replace('%[/]+%', '/', "buscar/{$this->input->get_post('filtro')}/".rawurlencode($this->input->get_post('slug'))));
			if ($this->input->get_post('ajax')){
				$this->output->enable_profiler(false);
				echo $returnURL;
				return;
			}
				$disciplina =null;
				// URL de la aplicación Python
				 $url = base_url('buscadoria/search_ai');

				 // Datos que deseas enviar en la solicitud POST
				 $data = array(
					 'input_text' => rawurldecode($slug)//$this->input->get_post('slug')
				 );

				 // Inicializar cURL
				 $ch = curl_init($url);

				 // Configurar opciones de cURL
				 curl_setopt($ch, CURLOPT_POST, true); // Indicar que es una solicitud POST
				 curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data)); // Enviar los datos
				 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Obtener la respuesta como una cadena

				 // Ejecutar la solicitud y obtener la respuesta
				 $response = curl_exec($ch);

				 // Cerrar la sesión cURL
				 curl_close($ch);

				 $this->load->database();

				 $queryFields="SELECT s.sistema,
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
				 $queryFrom="FROM \"mvSearch_all\" s
						 WHERE  sistema in (".$response.")";
				 
				 $query = "{$queryFields}
							{$queryFrom}
								ORDER BY ARRAY_POSITION(ARRAY[{$response}]::varchar[], sistema::varchar)
							";
		}else{
		
		/*Arrego con descripcion y sql para cada indice*/
		$indiceArray['palabra-clave'] = array('sql' => 'palabrasClaveSlug', 'descripcion' => _('Palabras clave'));
		$indiceArray['articulo'] = array('sql' => 'articuloSlug', 'descripcion' => _('Artículo'));
		$indiceArray['autor'] = array('sql' => 'autoresSlug', 'descripcion' => _('Autor'));
		$indiceArray['institucion'] = array('sql' => 'institucionesSlug', 'descripcion' => _('Institución'));
		$indiceArray['revista'] = array('sql' => 'revistaSlug', 'descripcion' => _('Revista'));
		$indiceArray['pais'] = array('sql' => 'paisRevistaSlug', 'descripcion' => _('País'));
		$indiceArray['disciplina'] = array('sql' => 'id_disciplina', 'descripcion' => _('Disciplina'));
		/*Si se hizo una consulta con POST redirigimos a una url correcta*/
		if($this->input->get_post('slug')):
			if($this->input->get_post('filtro') == "institucion"):
				$this->session->set_userdata('buscaIns', $this->get_control_autoridades($this->input->get_post('slug')));
			endif;
			
			if($this->input->get_post('textoCompleto')):
				$textoCompleto="texto-completo";
			endif;
			//print_r($_POST); die();
			if($this->input->get_post('filtro') === "todos"):
				$_POST['filtro'] = "";
			endif;
			if($this->input->get_post('filtro') === "avanzada"):
				$biblatDB = $this->load->database('biblat', TRUE);
				if($this->input->get_post('slug') == "[]" || $this->input->get_post('slug') == NULL):
					$this->output->enable_profiler(false);
					echo site_url('buscar');
					return;
				endif;
				$filters=json_decode($this->input->get_post('slug'), TRUE);
				$where = "";
				foreach ($filters as $filter):
					if(isset($filter['andor'])):
						$filter['andor']['value'] = strtoupper($filter['andor']['value']);
						$where .= "
						{$filter['andor']['value']} ";
					endif;
					switch ($filter['operator']['value']):
						case 'eq':
								$where .= " \"{$indiceArray[$filter['field']['value']]['sql']}\"='{$filter['value']['value']}'";
							break;
						case 'in':
							$paises = implode("','", explode(',', $filter['value']['value']));
							$where .= " \"{$indiceArray[$filter['field']['value']]['sql']}\" IN ('{$paises}')";
							break;

						default:
							$slugQuerySearch = slugQuerySearch(slugSearch($filter['value']['value']), $indiceArray[$filter['field']['value']]['sql']);
							$where .= $slugQuerySearch['where'];
							break;
					endswitch;
				endforeach;
				$hash = md5($this->input->get_post('slug'));
				$session['search'] = $filters;
				$session['query'] = $where;
				$this->session->set_userdata('search{'.$hash.'}', json_encode($session));
				$where = str_replace("'", "\\'", $where);
				$query="SELECT \"advancedSearchHashInsert\"('{$hash}', '{$this->input->get_post('slug')}', E'{$where}')";
				$biblatDB->query($query);
				$_POST['slug'] = $hash;
			endif;
			$returnURL = site_url(preg_replace('%[/]+%', '/', "buscar/{$this->input->get_post('filtro')}/{$this->input->get_post('disciplina')}/".slugSearch($this->input->get_post('slug'))."/{$textoCompleto}"));
			if($this->input->get_post('ajax')):
				$this->output->enable_profiler(false);
				echo $returnURL;
				return;
			endif;
			redirect($returnURL, 'refresh');
		endif;
		/*Si no exite ningun dato redirigimos al index*/
		if($disciplina == "" || $slug == ""):
			redirect(base_url(), 'refresh');
		endif;
		/*Variables para vistas*/
		$data = array();

		/*Header title*/
		$data['header']['title'] = _sprintf('Búsqueda: "%s"', slugSearchClean($slug));
		/*Result title*/
		$data['main']['page_title'] = _sprintf('Resultados de la búsqueda: %s', slugSearchClean($slug));
		/*Consultas*/
		$this->load->database();
		/*Creando la consulta para los resultados*/
		$whereTextoCompleto = "";
		$data['main']['textoCompleto'] = FALSE;
		if ($textoCompleto == "texto-completo"):
			$whereTextoCompleto = "AND url IS NOT NULL";
			$data['main']['textoCompleto'] = TRUE;
		endif;

		$whereDisciplina = "";
		if ($disciplina != "null"):
			/*Obteniendo id de la disciplina*/
			$query = "SELECT * from disciplinas WHERE slug='{$disciplina}'";
			$query = $this->db->query($query);
			$disciplina = $query->row_array();
			$query->free_result();
			$whereDisciplina = "AND id_disciplina={$disciplina['id_disciplina']}";
		endif;

		$slugQuerySearch = slugQuerySearch($slug);
		if( $filtro != "null"):
			if($filtro == "institucion" && strlen($this->session->userdata('buscaIns')) > 0){
				$slugQuerySearch = slugQuerySearch($slug, $indiceArray[$filtro]['sql'], $this->session->userdata('buscaIns'));
			}else{
				$slugQuerySearch = slugQuerySearch($slug, $indiceArray[$filtro]['sql']);
			}
			$data['header']['title'] = _sprintf('Búsqueda por %s: "%s"', strtolower($indiceArray[$filtro]['descripcion']), slugSearchClean($slug));
			$data['main']['page_title'] = _sprintf('Resultados de la búsqueda por %s: %s', strtolower($indiceArray[$filtro]['descripcion']), slugSearchClean($slug));
		endif;
		if($filtro == "avanzada"):
			if ( ! $this->session->userdata('search{'.$slug.'}')):
				$biblatDB = $this->load->database('biblat', TRUE);
				$advancedSearch = $biblatDB->query("SELECT search, query FROM \"advancedSearchHash\" WHERE hash='{$slug}' LIMIT 1");
				if($advancedSearch->num_rows() < 1):
					redirect(base_url(), 'refresh');
				endif;
				$advancedSearch = $advancedSearch->row_array();
				$advancedSearch['search'] = json_decode($advancedSearch['search'], TRUE);
				$this->session->set_userdata('search{'.$slug.'}', json_encode($advancedSearch));
			endif;
			$advancedSearch = json_decode($this->session->userdata('search{'.$slug.'}'), TRUE);
			$slugQuerySearch['where'] = $advancedSearch['query'];
			$data['main']['search']['json'] = json_encode($advancedSearch['search']);
			$data['header']['title'] = _('Búsqueda avanzada');
			$data['main']['page_title'] = _('Resultados de la búsqueda');
		endif;
		$data['main']['search']['filtro'] = $filtro;

		$queryFields="SELECT s.sistema,
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
		$queryFrom="FROM \"mvSearch_all\" s
				WHERE  {$slugQuerySearch['where']} {$whereTextoCompleto} {$whereDisciplina}";
		$query = "{$queryFields}
		{$queryFrom}
				ORDER BY \"anioRevista\" DESC, regexp_replace(volumen, '([0-9]+?)[^0-9].+?$', '\1') DESC, regexp_replace(numero, '([0-9]+?)[^0-9].+?$', '\1') DESC, \"articuloSlug\"";

		}
		
		$queryCount = "SELECT count (*) as total {$queryFrom}";
		$queryCount = str_replace("mvSearch_all", "mvSearch_count", $queryCount);

		/*Creando paginacion*/
		if($disciplina == "null"):
			$disciplina = array();
			$disciplina['slug'] = "";
			$disciplina['disciplina'] = "";
		endif;
		$data['header']['filtro'] = $filtro;
		if($filtro == "null"):
			$filtro = "";
			$data['header']['filtro'] = "todos";
		endif;
		if ($textoCompleto == "texto-completo"):
			$paginationURL = site_url(preg_replace('%[/]+%', '/',"buscar/{$filtro}/{$disciplina['slug']}/{$slug}/{$textoCompleto}"));
		else:
			$paginationURL = site_url(preg_replace('%[/]+%', '/',"buscar/{$filtro}/{$disciplina['slug']}/{$slug}"));
			$data['main']['paginationURL'] = $paginationURL;
		endif;
		$perPage = 20;
		
		if (strpos($query, 'generalSlug') !== false) {
			$patron = "/'.*?%.{0,3}%.*?'/";
			if (preg_match($patron, $query)) {
				$this->insertIP();
				redirect('main');
			}
        }
		
		$ip = $this->get_ip(); // Obtener la IP del visitante

		// Lista de prefijos de IP denegadas
		$denied_ips = [
                    "157.55.39",
                    "20.15.133",
                    "207.46.13",
                    "40.77.167",
                    "52.167.144",
                    "47.82",
                    "66.249",
                    "192.178.6",
                    "14.63.199",
                    "216.244.91",
                    "172.214.134",
                    "89.117.55",
					"148.204.63",
					"45.78",
					"216.152",
					"20.171.207",
					"23.231",
					"216.152",
					"108.187",
					"192.238"
                ];

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
			redirect('main');
		}
		
		$articulosResultado = articulosResultado($query, $queryCount, $paginationURL, $perPage, $countCompleto=TRUE);

		$data['main']['links'] = $articulosResultado['links'];
		/*Datos de la busqueda*/
		$data['main']['search']['slug'] = slugSearchClean($slug);
		$data['main']['search']['disciplina'] = $disciplina['disciplina'];
		$data['main']['search']['total'] = $articulosResultado['totalRows'];
		$data['main']['search']['totalCompleto'] = $articulosResultado['totalCompleto'];
		$data['main']['search'] = $data['main']['search'];
		$data['header']['slugHighLight']=slugHighLight($slug);
		/*Resultados de la página*/
		$data['main']['resultados']=$articulosResultado['articulos'];
		$this->db->close();
		/*Vistas*/
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
		$this->template->set_partial('view_article', 'revista/index');
		$this->template->build('buscar/index', $data['main']);
	}

	public function getList(){
		$this->output->enable_profiler(FALSE);
		$result = array(
				'paises' => $this->getPaises(),
				'disciplinas' => $this->getDisciplinas()
			);
		echo json_encode($result);
	}

	public function getPaises(){
		$this->output->enable_profiler(FALSE);
		$this->load->database();
		$query = "SELECT \"paisRevistaSlug\", \"paisRevista\" FROM \"mvPais\" WHERE \"paisRevistaSlug\" <> 'internacional'";
		$query = $this->db->query($query);
		$paises = $query->result_array();
		$result = array();
		foreach ($paises as $pais):
			$row['id'] = $pais['paisRevistaSlug'];
			$row['label'] = $pais['paisRevista'];
			$result[] = $row;
		endforeach;
		return $result;
	}
	public function getDisciplinas(){
		$this->output->enable_profiler(FALSE);
		if(! $this->session->userdata('discipliasBusqueda') ){
			$this->load->database();
			$query = "SELECT id_disciplina, disciplina FROM \"mvDisciplina\" WHERE id_disciplina <> '23'";
			$query = $this->db->query($query);
			$disciplinas = $query->result_array();
			$query->free_result();
			$this->db->close();
			$session = array();
			foreach ($disciplinas as $disciplina):
				$row['id'] = $disciplina['id_disciplina'];
				$row['label'] = $disciplina['disciplina'];
				$session[] = $row;
			endforeach;
			$this->session->set_userdata('discipliasBusqueda', json_encode($session));
		}
		return json_decode($this->session->userdata('discipliasBusqueda'), TRUE);
	}
	
	public function validaSolicitud(){
            // Obtén la IP del cliente
            //$ip_cliente = $this->input->ip_address();

            // Verifica si la IP está dentro del rango 132.248.*
            //if (strpos($ip_cliente, '132.248.') === 0) {
                // IP permitida, sin restricciones
                //return true;
            //}
            $rate_limit = [];
            $block_until = $this->session->userdata('block_until') ?: null;
            
            $now = time();
            
            // Verifica si el usuario está bloqueado
            if ($block_until && $now < $block_until) {
                return false; // Usuario bloqueado hasta el siguiente día
            }
            
            if (!$this->session->userdata('rate_limit')) {
                $now = time();
                $rate_limit[] = $now;
                $this->session->set_userdata('rate_limit', $rate_limit);
            }else{
                $rate_limit = $this->session->userdata('rate_limit');
            }

            //  Elimina solicitudes más antiguas de un período de tiempo (ejemplo: 1 minuto)
            $rate_limit = array_filter($rate_limit, function($timestamp) use ($now) {
                return $now - $timestamp < 60;
            });

            // Verifica el número de solicitudes restantes
            if (count($rate_limit) >= 20) { // Permite solo 10 solicitudes por minuto
                //show_error('Límite de solicitudes alcanzado. Inténtelo más tarde.', 429);
                // Bloquea al usuario hasta el siguiente día si excede el límite
                $midnight = strtotime('tomorrow midnight');
                $this->session->set_userdata('block_until', $midnight);
				$this->insertIP();
                return false;
            }

            // Registra la nueva solicitud
            $rate_limit[] = $now;
            $rate_limit = array_unique($rate_limit);
            $this->session->set_userdata('rate_limit', $rate_limit);
            return true;
        }
		
		public function insertIP(){
            $ip = $this->get_ip();
            $this->load->database();
            $query="Insert into ip_blacklist values(NOW()::timestamp::date, '" . $ip . "')";
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
		
		private function get_control_autoridades($institucion){           
            putenv("GOOGLE_APPLICATION_CREDENTIALS=credentials2.json");
            $client = new Google_Client();
            $client->setApplicationName('Biblat');
            $client->setScopes(Google_Service_Sheets::SPREADSHEETS_READONLY);
            $client->useApplicationDefaultCredentials();
            // ID de la hoja de cálculo
            $spreadsheetId = sheetControlAutoridades;
            
            // Inicializar el cliente
            $service = new Google_Service_Sheets($client);

            // Rango de celdas 
            $range = hojaControl;

            // Leer datos de la hoja de cálculo
             try {
                $response = $service->spreadsheets_values->get($spreadsheetId, $range);
                $values = $response->getValues();
            } catch (Exception $e) {
                return 'Error1';
            }

            $columnas = [];
            $codigo = mt_rand(100000, 999999).'';
            $existe = FALSE;

            if (empty($values)) {
                return 'Error2';
            } else {
                $renglon = 0;
                $encontrado = false;
                foreach ($values as $x => $v){
                    //Recorrido de los encabezados
                    if($x == 0){
                        foreach ($v as $x2 => $v2){
                            $columnas[$x2] = $v2;
                        }
                        $idx_tipo = array_search('Tipo de dato', $columnas);
                        $idx_variantes = array_search('Variantes', $columnas);
                        $idx_nombre_normalizado = array_search('Nombre normalizado', $columnas);
                        $idx_aprobado = array_search('Aprobado', $columnas);
                    }
                    
                    foreach ($v as $x2 => $v2){
                        if (!isset($v[$idx_tipo], $v[$idx_aprobado])) continue;
                        
                        if($x2 == $idx_tipo){
                            if($v2 == 'Nombre de la institución de afiliación' && $v[$idx_aprobado] == 'sí'){
                                $cadena1 = $v[$idx_variantes];
                                $cadena2 = trim($v[$idx_nombre_normalizado]);
                                $cadena3 = trim($institucion);
                                
                                $arreglo1 = strlen($cadena1) > 0 ? array_map('trim', explode(";", $cadena1)): [];

                                if (!in_array($cadena2, $arreglo1) && $cadena2 !== '') {
                                    $arreglo1[] = $cadena2;
                                }
                                
                                if(in_array($cadena3, $arreglo1)){
                                    $encontrado = true;
                                    $cadena_instituciones = implode(";", $arreglo1);
                                    return $cadena_instituciones;
                                }
                            }
                        }
                    }
                }
                return 'No encontrado';
            }
        }
}
