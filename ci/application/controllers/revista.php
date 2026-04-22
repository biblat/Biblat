<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Revista extends CI_Controller{

	public function __construct(){
		parent::__construct();
		
		$site = $_SERVER['HTTP_SEC_FETCH_SITE'] ?? '';
        $mode = $_SERVER['HTTP_SEC_FETCH_MODE'] ?? '';
        $user = $_SERVER['HTTP_SEC_FETCH_USER'] ?? '';
        $dest = $_SERVER['HTTP_SEC_FETCH_DEST'] ?? '';
		
		$check = $this->validateRequest('revistas_index', [
            'require_fetch_headers' => true,
            'allow_same_site'       => false,
            'allow_none'            => true, // false = bloquea URL escrita/favoritos
            'require_user_nav'      => true,
        ]);

        if (!$check['ok']) {
			//$this->insertIP('Error revista ' . $site . ' ' . $mode . ' ' . $user . ' ' . $dest);
			redirect('error');
			return;
		}
		
		$this->checkTrafficAndBlock();
		
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
			
	public function validateRequest(string $key, array $options = []): array
    {
        $defaults = [
            'require_fetch_headers' => true,
            'allow_same_site'       => false,
            'allow_none'            => false,
            'require_user_nav'      => true,
        ];

        $options = array_merge($defaults, $options);

        $fetchCheck = $this->validateFetchMetadata($options);
        if (!$fetchCheck['ok']) {
            return $fetchCheck;
        }

        return [
            'ok'     => true,
            'reason' => 'allowed',
        ];
    }


    /**
     * Valida headers Fetch Metadata.
     */
    protected function validateFetchMetadata(array $options): array
    {
        $site = $_SERVER['HTTP_SEC_FETCH_SITE'] ?? '';
        $mode = $_SERVER['HTTP_SEC_FETCH_MODE'] ?? '';
        $user = $_SERVER['HTTP_SEC_FETCH_USER'] ?? '';
        $dest = $_SERVER['HTTP_SEC_FETCH_DEST'] ?? '';
		$isMobile = $_SERVER['HTTP_SEC_CH_UA_MOBILE'] ?? '';
		
		#$referer = $_SERVER['HTTP_REFERER'] ?? '';
		#$ua      = $_SERVER['HTTP_USER_AGENT'] ?? '';
		#$this->insertIP('Error frecuencia s:' . $site . ' m:' . $mode . ' u:' . $user . ' d:' . $dest . ' mb:' . $isMobile . ' r:' . $referer . ' ua:' . $ua);

        // Si el navegador no manda estos headers y tú quieres modo estricto, bloquea.
        if ($options['require_fetch_headers']) {
            if ($site === '' || $mode === '') {
                return [
                    'ok'     => false,
                    'reason' => 'missing_fetch_metadata',
                    'meta'   => compact('site', 'mode', 'user', 'dest'),
                ];
            }
        }
		
		// Debe parecer navegación de documento HTML.
        if ($mode !== 'navigate' && !($mode == 'cors' && $dest == 'empty')) {
            return [
                'ok'     => false,
                'reason' => 'invalid_fetch_mode',
                'meta'   => compact('site', 'mode', 'user', 'dest'),
            ];
        }

        if ($dest !== '' && $dest !== 'document' && !($mode == 'cors' && $dest == 'empty')) {
            return [
                'ok'     => false,
                'reason' => 'invalid_fetch_dest',
                'meta'   => compact('site', 'mode', 'user', 'dest'),
            ];
        }

        // Permitimos solo same-origin, opcionalmente same-site o none.
        $allowedSites = ['same-origin'];

        if ($options['allow_same_site']) {
            $allowedSites[] = 'same-site';
        }

        if ($options['allow_none']) {
            $allowedSites[] = 'none';
        }
		
		if ($isMobile == '?1' || ($mode == 'navigate' && $user == '?1' && $dest == 'document') ){
			$allowedSites[] = 'cross-site';
		}

        if (!in_array($site, $allowedSites, true)) {
            return [
                'ok'     => false,
                'reason' => 'invalid_fetch_site',
                'meta'   => compact('site', 'mode', 'user', 'dest'),
            ];
        }

        // Si quieres que además venga explícitamente de interacción del usuario
		if ($isMobile != '?1'){
        if ($options['require_user_nav'] && $user !== '?1' && !($mode == 'cors' && $dest == 'empty')) {
            return [
                'ok'     => false,
                'reason' => 'missing_user_navigation',
                'meta'   => compact('site', 'mode', 'user', 'dest'),
            ];
        }
		}

        return [
            'ok'     => true,
            'reason' => 'fetch_metadata_valid',
            'meta'   => compact('site', 'mode', 'user', 'dest'),
        ];
    }
			
	protected function getPrefixes($ip)
	{
		$prefix24 = null;
		$prefix16 = null;

		if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
			$parts = explode('.', $ip);

			$prefix24 = $parts[0] . '.' . $parts[1] . '.' . $parts[2] . '.';
			$prefix16 = $parts[0] . '.' . $parts[1] . '.';
		}

		return array(
			'prefix24' => $prefix24,
			'prefix16' => $prefix16,
		);
	}

	protected function insertRequestLog($ip, $prefix24, $prefix16)
	{
		$this->load->database();

		$this->db->insert('request_log', array(
			'ip'         => $ip,
			'prefix24'   => $prefix24,
			'prefix16'   => $prefix16,
			'created_at' => date('Y-m-d H:i:s'),
		));
	}

	protected function countRecentByIp($ip, $minutes)
	{
		$this->load->database();

		$since = date('Y-m-d H:i:s', time() - ($minutes * 60));

		return (int)$this->db
			->where('ip', $ip)
			->where('created_at >=', $since)
			->count_all_results('request_log');
	}

	protected function countRecentByPrefix24($prefix24, $minutes)
	{
		$this->load->database();

		if (!$prefix24) {
			return 0;
		}

		$since = date('Y-m-d H:i:s', time() - ($minutes * 60));

		return (int)$this->db
			->where('prefix24', $prefix24)
			->where('created_at >=', $since)
			->count_all_results('request_log');
	}

	protected function countRecentByPrefix16($prefix16, $minutes)
	{
		$this->load->database();

		if (!$prefix16) {
			return 0;
		}

		$since = date('Y-m-d H:i:s', time() - ($minutes * 60));

		return (int)$this->db
			->where('prefix16', $prefix16)
			->where('created_at >=', $since)
			->count_all_results('request_log');
	}

	protected function countDistinctRecentPrefix24ByPrefix16($prefix16, $minutes)
	{
		$this->load->database();

		if (!$prefix16) {
			return 0;
		}

		$since = date('Y-m-d H:i:s', time() - ($minutes * 60));

		$sql = "
			SELECT COUNT(DISTINCT prefix24) AS total
			FROM request_log
			WHERE prefix16 = ?
			  AND created_at >= ?
		";

		$query = $this->db->query($sql, array($prefix16, $since));

		if (!$query || $query->num_rows() === 0) {
			return 0;
		}

		$row = $query->row();
		return (int)$row->total;
	}

	protected function isSpecialPrefix16($prefix16)
	{
		// Prefijos que conviene tratar con más cuidado
		// porque pueden ser bots/cdn/infraestructura
		$special = array(
			'17.22.',
			'17.241.',
			'17.246.',
			'66.249.',
			'220.181.',
			'87.250.',
			'5.255.',
		);

		return in_array($prefix16, $special, true);
	}

	protected function addTemporaryBlock($type, $value, $minutes, $reason)
	{
		$this->load->database();

		$now = date('Y-m-d H:i:s');
		$expires = date('Y-m-d H:i:s', time() + ($minutes * 60));

		$existing = $this->db
			->where('block_type', $type)
			->where('block_value', $value)
			->where('expires_at >=', $now)
			->get('blocked_networks')
			->row();

		if ($existing) {
			$this->db
				->where('id', $existing->id)
				->update('blocked_networks', array(
					'expires_at' => $expires,
					'reason'     => $reason ? $reason : $existing->reason,
				));
			return;
		}

		$this->db->insert('blocked_networks', array(
			'block_type'  => $type,
			'block_value' => $value,
			'reason'      => $reason,
			'expires_at'  => $expires,
			'created_at'  => $now,
		));
	}

	protected function isBlocked($ip, $prefix24, $prefix16)
	{
		$this->load->database();

		$now = date('Y-m-d H:i:s');

		$sql = "SELECT * FROM blocked_networks WHERE (";
		$params = array();

		$sql .= "(block_type = ? AND block_value = ?)";
		$params[] = 'ip';
		$params[] = $ip;

		if ($prefix24) {
			$sql .= " OR (block_type = ? AND block_value = ?)";
			$params[] = 'prefix24';
			$params[] = $prefix24;
		}

		if ($prefix16) {
			$sql .= " OR (block_type = ? AND block_value = ?)";
			$params[] = 'prefix16';
			$params[] = $prefix16;
		}

		$sql .= ") AND expires_at >= ? LIMIT 1";
		$params[] = $now;

		$query = $this->db->query($sql, $params);

		if (!$query) {
			return false;
		}

		if ($query->num_rows() > 0) {
			return $query->row();
		}

		return false;
	}
	
	protected function countActivePostgresConnections()
	{
		$this->load->database();

		$sql = "
			SELECT COUNT(*) AS total
			FROM pg_stat_activity
			WHERE datname = current_database()
			  AND pid <> pg_backend_pid()
			  AND state IN ('active', 'idle')
		";

		$query = $this->db->query($sql);

		if (!$query || $query->num_rows() === 0) {
			return 0;
		}

		$row = $query->row();
		return (int)$row->total;
	}

	protected function cleanExpiredBlocks()
	{
		$this->load->database();

		$this->db->where('expires_at <', date('Y-m-d H:i:s'))
				 ->delete('blocked_networks');
	}
	
	protected function cleanOldRequestLogs()
	{
			$this->load->database();

			$limitDate = date('Y-m-d H:i:s', time() - (2 * 24 * 60 * 60));

			$this->db->where('created_at <', $limitDate)
							 ->delete('request_log');
	}

	public function checkTrafficAndBlock()
	{
		$ip = trim($this->get_ip());

		$pass_ips = array(
			'148.204.63.19',
			'148.204.63.195',
		);

		if (!filter_var($ip, FILTER_VALIDATE_IP)) {
			redirect('error');
			return;
		}

		$prefixes = $this->getPrefixes($ip);
		$prefix24 = $prefixes['prefix24'];
		$prefix16 = $prefixes['prefix16'];

		if (in_array($ip, $pass_ips, true)) {
			$this->insertRequestLog($ip, $prefix24, $prefix16);
			$this->insertIP('frecuencias autor');
			return;
		}

		$this->cleanExpiredBlocks();
		$this->cleanOldRequestLogs();
		
		// Registrar primero la petición
		$this->insertRequestLog($ip, $prefix24, $prefix16);
		
		$existingBlock = $this->isBlocked($ip, $prefix24, $prefix16);
		if ($existingBlock) {
			redirect('error');
			return;
		}

		/// Ventanas
		$hitsIp1m   = $this->countRecentByIp($ip, 1);
		$hitsIp10m  = $this->countRecentByIp($ip, 10);
		$hitsIp1d   = $this->countRecentByIp($ip, 1440);

		$hits24_1m  = $this->countRecentByPrefix24($prefix24, 1);
		$hits24_10m = $this->countRecentByPrefix24($prefix24, 10);
		$hits24_1d  = $this->countRecentByPrefix24($prefix24, 1440);

		$hits16_10m = $this->countRecentByPrefix16($prefix16, 10);
		$hits16_1d  = $this->countRecentByPrefix16($prefix16, 1440);

		// Un año = 365 días
		$blockOneYearMinutes = 525600;

		// Umbrales
		$limitIp1m    = 30;
		$limitIp10m   = 150;
		$limitIp1d    = 200;

		$limit24_1m   = 30;
		$limit24_10m  = 200;
		$limit24_1d   = 300;

		$limit16_10m  = 300;
		$limit16_1d   = 400;

		// 1) Bloqueo por IP
		if ($hitsIp1m >= $limitIp1m) {
			$this->addTemporaryBlock('ip', $ip, $blockOneYearMinutes, 'Exceso de peticiones por IP en 1 min');
			redirect('error');
			return;
		}

		if ($hitsIp10m >= $limitIp10m) {
			$this->addTemporaryBlock('ip', $ip, $blockOneYearMinutes, 'Exceso de peticiones por IP en 10 min');
			redirect('error');
			return;
		}

		if ($hitsIp1d >= $limitIp1d) {
			$this->addTemporaryBlock('ip', $ip, $blockOneYearMinutes, 'Exceso de peticiones por IP en 1 día');
			redirect('error');
			return;
		}

		// 2) Bloqueo por /24
		if ($prefix24 && $hits24_1m >= $limit24_1m) {
			$this->addTemporaryBlock('prefix24', $prefix24, $blockOneYearMinutes, 'Exceso de peticiones por /24 en 1 min');
			redirect('error');
			return;
		}

		if ($prefix24 && $hits24_10m >= $limit24_10m) {
			$this->addTemporaryBlock('prefix24', $prefix24, $blockOneYearMinutes, 'Exceso de peticiones por /24 en 10 min');
			redirect('error');
			return;
		}

		if ($prefix24 && $hits24_1d >= $limit24_1d) {
			$this->addTemporaryBlock('prefix24', $prefix24, $blockOneYearMinutes, 'Exceso de peticiones por /24 en 1 día');
			redirect('error');
			return;
		}

		// 3) Bloqueo por /16
		if ($prefix16 && $hits16_10m >= $limit16_10m) {
			$this->addTemporaryBlock('prefix16', $prefix16, $blockOneYearMinutes, 'Exceso de peticiones por /16 en 10 min');
			redirect('error');
			return;
		}

		if ($prefix16 && $hits16_1d >= $limit16_1d) {
			$this->addTemporaryBlock('prefix16', $prefix16, $blockOneYearMinutes, 'Exceso de peticiones por /16 en 1 día');
			redirect('error');
			return;
		}

		$this->insertIP('frecuencias autor');
	}

	public function index($revistaSlug){
		
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
			redirect('error');
		}else{
			$this->insertIP();
		}
		
		
		
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
					resumen,
					regexp_replace(regexp_replace(doi,'[^a-z0-9]*$',''),'^[^a-z0-9]*','') doi";
		$queryFrom = "FROM \"mvSearch\" WHERE \"revistaSlug\"='{$revistaSlug}'";
		$query = "{$queryFields}
				{$queryFrom}
				ORDER BY \"anioRevista\" DESC, regexp_replace(volumen, '([0-9]+?)[^0-9].+?$', '\1') DESC, regexp_replace(numero, '([0-9]+?)[^0-9].+?$', '\1') DESC, \"articuloSlug\"";

		$queryCount = "SELECT count (DISTINCT sistema) as total {$queryFrom}";

		/*Paginación y resultados*/
		$paginationURL = site_url("/revista/{$revistaSlug}");
		$perPage = 10;
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
		
		//$this->insertIP('revista articulo');
                
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
			//$this->insertIP('bloqueo revista articulo');
			redirect('error');
		}else{
			$this->insertIP('revista articulo');
		}
		
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
                $to      = 'sinfo@dgb.unam.mx';
                $cc      = 'anoguezo@dgb.unam.mx';
                $subject = 'Solicitud de documento Biblat';

                $body = "A quien corresponda:\n\n"
                      . "El usuario con los siguientes datos:\n\n"
                      . "Nombre: {$data['from']}\n"
                      . "Correo electrónico: {$data['email']}\n"
                      . "Teléfono: {$data['telefono']}\n"
                      . "Instituto: {$data['instituto']}\n\n"
                      . "Ha solicitado el siguiente documento:\n\n"
                      . "{$data['fichaDocumento']}";

                // Genérico mailto
                $mailto = 'mailto:' . rawurlencode($to)
                        . '?cc=' . rawurlencode($cc)
                        . '&subject=' . rawurlencode($subject)
                        . '&body=' . rawurlencode($body);

                // Gmail
                $gmail = 'https://mail.google.com/mail/?view=cm&fs=1'
                       . '&to=' . rawurlencode($to)
                       . '&cc=' . rawurlencode($cc)
                       . '&su=' . rawurlencode($subject)
                       . '&body=' . rawurlencode($body);

                // Outlook/Hotmail
                $outlook = 'https://outlook.live.com/owa/?path=/mail/action/compose'
                        . '&to=' . rawurlencode($to . ',' . $cc)
                        . '&subject=' . rawurlencode($subject)
                        . '&body=' . rawurlencode($body);

                // Resultado exitoso
                $result = array(
                    'type'    => 'success',
                    'title' => _('La solicitud ha sido registrada. Elige cómo enviarla desde tu correo personal.'),
                    'links'   => array(
                        'mailto'  => $mailto,
                        'gmail'   => $gmail,
                        'outlook' => $outlook
                    )
                );
            endif;

            echo json_encode($result);
        }
		
	public function insertIP($pagina=''){
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
