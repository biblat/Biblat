<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('slug')):
	function slug($name,$utf=false){

		$sname = trim($name); //remover espacios vacios

		$sname = mb_strtolower(preg_replace('/\s+/','-',$sname), 'UTF-8'); // pasamos todo a minusculas y cambiamos todos los espacios por -

		if($utf){ // si el texto no viene en formato utf8 se le manda a codificar como tal.
			$sname = utf8_decode($sname);
		}
		// Lista de caracteres latinos y sus correspondientes para slug
		$table = array(
			'á'=>'a', 'à'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'ā'=>'a', 'ă'=>'a', 'ą'=>'a', 'Á'=>'a', 'Â'=>'a', 'Ã'=>'a', 'Ä'=>'a', 'Å'=>'a', 'Ā'=>'a', 'Ă'=>'a', 'Ą'=>'a', 'è'=>'e', 'é'=>'e', 'é'=>'e', 'ê'=>'e', 'ë'=>'e', 'ē'=>'e', 'ĕ'=>'e', 'ė'=>'e', 'ę'=>'e', 'ě'=>'e', 'Ē'=>'e', 'Ĕ'=>'e', 'Ė'=>'e', 'Ę'=>'e', 'Ě'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'ì'=>'i', 'ĩ'=>'i', 'ī'=>'i', 'ĭ'=>'i', 'Ì'=>'i', 'Í'=>'i', 'Î'=>'i', 'Ï'=>'i', 'Ì'=>'i', 'Ĩ'=>'i', 'Ī'=>'i', 'Ĭ'=>'i', 'ó'=>'o', 'ô'=>'o', 'õ'=>'o', 'ö'=>'o', 'ō'=>'o', 'ŏ'=>'o', 'ő'=>'o', 'Ò'=>'o', 'Ó'=>'o', 'Ô'=>'o', 'Õ'=>'o', 'Ö'=>'o', 'Ō'=>'o', 'Ŏ'=>'o', 'Ő'=>'o', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ü'=>'u', 'ũ'=>'u', 'ū'=>'u', 'ŭ'=>'u', 'ů'=>'u', 'Ù'=>'u', 'Ú'=>'u', 'Û'=>'u', 'Ü'=>'u', 'Ũ'=>'u', 'Ū'=>'u', 'Ŭ'=>'u', 'Ů'=>'u', 'ç'=>'c', 'Ç'=>'c', 'ÿ'=>'y', '&'=>'-', ','=>'-', '.'=>'-', 'ñ'=>'n', 'Ñ'=>'n', 'Š'=>'s', 'š'=>'s', 'Ž'=>'z', 'ž'=>'z', 'Ý'=>'y', 'Þ'=>'b', 'ß'=>'s', 'ø'=>'o', 'ý'=>'y', 'þ'=>'b'
		);

		$sname = strtr($sname, $table); // remplazamos los acentos, etc, por su correspondientes
		$sname = preg_replace("/[^A-Za-z0-9-]+/", "", $sname); // eliminamos cualquier caracter que no sea de la a-z o 0 al 9 o -
		$sname = preg_replace("/-+/", "-", $sname);/*Eliminamos guiones dobles*/

		return $sname;
	}
endif;

if ( ! function_exists('slugClean')):
	function slugClean($string){
		$rstring = trim($string);
		$rstring = preg_replace('/[-+&]/',' ', $rstring);
		$rstring = preg_replace("/\s+/", ' ', $rstring);
		return $rstring;
	}
endif;

if ( ! function_exists('slugSearch')):
	function slugSearch($name,$utf=false){

		$sname = trim($name); //remover espacios vacios

		$sname = mb_strtolower(preg_replace('/\s+/','-',$sname), 'UTF-8'); // pasamos todo a minusculas y cambiamos todos los espacios por -

		if($utf){ // si el texto no viene en formato utf8 se le manda a codificar como tal.
			$sname = utf8_decode($sname);
		}
		// Lista de caracteres latinos y sus correspondientes para slug
		$table = array(
			'á'=>'a', 'à'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'ā'=>'a', 'ă'=>'a', 'ą'=>'a', 'Á'=>'a', 'Â'=>'a', 'Ã'=>'a', 'Ä'=>'a', 'Å'=>'a', 'Ā'=>'a', 'Ă'=>'a', 'Ą'=>'a', 'è'=>'e', 'é'=>'e', 'é'=>'e', 'ê'=>'e', 'ë'=>'e', 'ē'=>'e', 'ĕ'=>'e', 'ė'=>'e', 'ę'=>'e', 'ě'=>'e', 'Ē'=>'e', 'Ĕ'=>'e', 'Ė'=>'e', 'Ę'=>'e', 'Ě'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'ì'=>'i', 'ĩ'=>'i', 'ī'=>'i', 'ĭ'=>'i', 'Ì'=>'i', 'Í'=>'i', 'Î'=>'i', 'Ï'=>'i', 'Ì'=>'i', 'Ĩ'=>'i', 'Ī'=>'i', 'Ĭ'=>'i', 'ó'=>'o', 'ô'=>'o', 'õ'=>'o', 'ö'=>'o', 'ō'=>'o', 'ŏ'=>'o', 'ő'=>'o', 'Ò'=>'o', 'Ó'=>'o', 'Ô'=>'o', 'Õ'=>'o', 'Ö'=>'o', 'Ō'=>'o', 'Ŏ'=>'o', 'Ő'=>'o', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ü'=>'u', 'ũ'=>'u', 'ū'=>'u', 'ŭ'=>'u', 'ů'=>'u', 'Ù'=>'u', 'Ú'=>'u', 'Û'=>'u', 'Ü'=>'u', 'Ũ'=>'u', 'Ū'=>'u', 'Ŭ'=>'u', 'Ů'=>'u', 'ç'=>'c', 'Ç'=>'c', 'ÿ'=>'y', ','=>'-', '.'=>'-', 'ñ'=>'n', 'Ñ'=>'n', 'Š'=>'s', 'š'=>'s', 'Ž'=>'z', 'ž'=>'z', 'Ý'=>'y', 'Þ'=>'b', 'ß'=>'s', 'ø'=>'o', 'ý'=>'y', 'þ'=>'b'
		);

		$sname = strtr($sname, $table); // remplazamos los acentos, etc, por su correspondientes
		$sname = preg_replace("/[^A-Za-z0-9-+&\"]+/", "", $sname); // eliminamos cualquier caracter que no sea de la a-z o 0 al 9 o -
		$sname = preg_replace("/-+/", "-", $sname);/*Eliminamos guiones dobles*/
		$sname = preg_replace("/\++/", "+", $sname);/*Eliminamos signos + dobles*/
		$sname = preg_replace("/\&+/", "&", $sname);/*Eliminamos signos & dobles*/
		$sname = preg_replace("/(-\+-|\+-|-\+)/", "+", $sname);
		$sname = preg_replace("/(-\&-|\&-|-\&)/", "&", $sname);

		return $sname;
	}
endif;

if ( ! function_exists('slugSearchClean') ):
	function slugSearchClean($string){
		$rstring = trim($string);
		$rstring = urldecode($rstring);
		$rstring = preg_replace("/&+/", " & ", $rstring);
		$rstring = preg_replace("/\++/", " + ", $rstring);
		$rstring = preg_replace("/-+/", " ", $rstring);

		return $rstring;
	}
endif;

if ( ! function_exists('slugQuerySearch') ):
	function slugQuerySearch($string, $whereField="generalSlug", $catalogoAutoIns=null){
		$rstring['where'] = "";
		$operador = NULL;
		if ( strrpos($string, "+") > 0):
			$operador['char'] = "+";
			$operador['query'] = " OR ";
		endif;
		if ( strrpos($string, "&") > 0):
			$operador['char'] = "&";
			$operador['query'] = " AND ";
		endif;
		if ( strrpos($string, "+") > 0 && strrpos($string, "&") > 0 && strrpos($string, "&") > strrpos($string, "+")):
			$operador['char'] = "+";
			$operador['query'] = " OR ";
		endif;
		if( $operador != NULL):
			$astring = explode($operador['char'], $string);
			foreach ($astring as $key => $value):
				$astring[$key] = slugClean($value);
				$astring[$key] = trim($astring[$key]);
				$astring[$key] =explode(" ", $astring[$key]);
			endforeach;

			$totalIndex = count($astring);
			$currentIndex = 1;
			foreach ($astring as $words):
				$rstring['where'] .= "\"{$whereField}\" ~~ '%";
				$totalIndexW = count($words);
				$currentIndexW = 1;
				foreach ($words as $word):
					$rstring['where'] .="{$word}";
					if($currentIndexW < $totalIndexW):
						$rstring['where'] .= "_";
					endif;
					$currentIndexW++;
				endforeach;
				$rstring['where'] .= "%'";
				if($currentIndex < $totalIndex):
					$rstring['where'] .= $operador['query'];
				endif;
				$currentIndex++;
			endforeach;
		else:
			$astring = slugClean($string);
			$astring = trim($astring);
			$astring = explode(" ", $astring);
			if( count($astring) > 1 ):
                            if( is_null($catalogoAutoIns) ){
				$totalIndex = count($astring);
				$currentIndex = 1;
				$rstring['where'] .= "\"{$whereField}\" ~~ '%";
				foreach ($astring as $word):
					$rstring['where'] .= "{$word}";
					if($currentIndex < $totalIndex):
						$rstring['where'] .= "_";
					endif;
					$currentIndex++;
				endforeach;
				$rstring['where'] .= "%'";
                            }else{
                                $conditions = [];
                                $cstring = explode(';', $catalogoAutoIns);
                                foreach ($cstring as $value) {
                                    $conditions[] = "\"{$whereField}\" ~~ format('%%%s%%',replace(regexp_replace(slug('{$value}'), '-+', '-', 'g'),'-', '_'))";
                                }
                                $rstring['where'] .= implode(' OR ', $conditions);
                            }
			else:
				$rstring['where'] .= "\"{$whereField}\" ~~ '%{$astring[0]}%'";
			endif;
		endif;
		$rstring = str_replace("%22", " ", $rstring);
		return $rstring;
	}
endif;

if ( ! function_exists('slugHighLight') ):
	function slugHighLight($string){
		$sname = sprintf("\"%s[.\\\"]?\"", trim($string));
		$sname = preg_replace("/[&+]/", "\", \"", $sname);
		$sname = preg_replace("/a/", "[aáàâãäåāăą]", $sname);
		$sname = preg_replace("/e/", "[eéèêėēĕěę]", $sname);
		$sname = preg_replace("/i/", "[iìíîïìĩīĭ]", $sname);
		$sname = preg_replace("/o/", "[oóôõöōŏőø]", $sname);
		$sname = preg_replace("/u/", "[uùùûüũūŭů]", $sname);
		$sname = preg_replace("/c/", "[çc]", $sname);
		$sname = preg_replace("/y/", "[ýÿy]", $sname);
		$sname = preg_replace("/n/", "[ñn]", $sname);
		$sname = preg_replace("/s/", "[šs]", $sname);
		$sname = preg_replace("/z/", "[žz]", $sname);
		$sname = preg_replace("/b/", "[þÞßb]", $sname);
		$sname = preg_replace("/-+/", "[\\\\\\s.,+&-()\\\\\"]+", $sname);
		$sname = str_replace("%22", "\\\\b", $sname);

		return $sname;
	}
endif;

if ( ! function_exists('articulosResultado') ):
	function articulosResultado($query, $queryCount, $paginationURL, $perPage, $countCompleto=FALSE, $firstPageNumber=FALSE){
		/**/
		$resultado = array();
		/*Load libraries*/
		$ci=& get_instance();
		$ci->load->database();
		//$ci->load->library('session');
		$ci->load->library('pagination');
		//print_r($ci->session->all_userdata());die();
		if ( ! $ci->session->userdata('query{'.md5($queryCount).'}')):
			$queryTotalRows = $ci->db->query($queryCount);
			$queryTotalRows = $queryTotalRows->row_array();
			$ci->session->set_userdata('query{'.md5($queryCount).'}', $queryTotalRows['total']);
		endif;
		if($countCompleto):
			$queryCountCompleto = "{$queryCount} AND url IS NOT NULL";
			if ( ! $ci->session->userdata('query{'.md5($queryCountCompleto).'}')):
				$queryTotalCompleto = $ci->db->query($queryCountCompleto);
				$queryTotalCompleto = $queryTotalCompleto->row_array();
				$ci->session->set_userdata('query{'.md5($queryCountCompleto).'}', $queryTotalCompleto['total']);
			endif;
			$totalCompleto=(int)$ci->session->userdata('query{'.md5($queryCountCompleto).'}');
			$resultado['totalCompleto'] = $totalCompleto;
		endif;

		$totalRows=(int)$ci->session->userdata('query{'.md5($queryCount).'}');

		$uri_segment = $ci->uri->total_segments();
		if(preg_match('/[0-9a-f]{32}/', $ci->uri->segment($uri_segment))):
			$uri_segment++;
		endif;

		$config['base_url'] = $paginationURL;
		$config['uri_segment'] = $uri_segment;
		$config['total_rows'] = $totalRows;
		$config['per_page'] = $perPage;
		$config['use_page_numbers'] = true;
		if($firstPageNumber):
			$config['first_url'] = "$paginationURL/1";
		endif;
		$config['first_link'] = "&laquo;";
		$config['last_link'] = "&raquo;";
		$config['next_link'] = "&rsaquo;";
		$config['prev_link'] = "&lsaquo;";
		$config['cur_tag_open'] = '<li class="active"><a href="javascript:;">';
		$config['cur_tag_close'] = '</a></li>';
		$config['num_tag_open'] = '<li>';
		$config['num_tag_close'] = '</li>';
		$config['prev_tag_open'] = '<li>';
		$config['prev_tag_close'] = '</li>';
		$config['next_tag_open'] = '<li>';
		$config['next_tag_close'] = '</li>';
		$config['first_tag_open'] = '<li>';
		$config['first_tag_close'] = '</li>';
		$config['last_tag_open'] = '<li>';
		$config['last_tag_close'] = '</li>';
		$config['full_tag_open'] = '<ul class="pagination">';
		$config['full_tag_close'] = '</ul>';
		$config['use_page_numbers'] = TRUE;
		$ci->pagination->initialize($config);

		$resultado['links'] = $ci->pagination->create_links();
		$resultado['totalRows'] = $totalRows;

		$offset = (($ci->pagination->cur_page - 1) * $config['per_page']);
		if ($offset < 0 ):
			$offset = 0;
		endif;
		$query = "{$query} LIMIT {$config['per_page']} OFFSET {$offset}";
		$query = $ci->db->query($query);
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
			$row['url'] = json_decode($row['url'], TRUE);
			/*Limpiando caracteres html*/
			$row = htmlspecialchars_deep($row);
			/*Creando valores para el checkbox*/
			$row['checkBoxValue'] = "{$row['sistema']}";
			$row['checkBoxId'] = "chk_{$row['checkBoxValue']}";
			/*Enlace para agregar referencia*/
			$row['addRef'] = "<a class=\"add-ref\" id=\"{$row['checkBoxId']}\" href=\"javascript:;\">"._("Agregar referencia.")."</a>";
			/*Creando link en caso de que exista texto completo*/
			$row['articuloLink'] = anchor("revista/{$row['revistaSlug']}/articulo/{$row['articuloSlug']}", $row['articulo'], array('title' => $row['articulo'], 'class' => 'registro'));
			if( $row['url'] != NULL):
				if (is_array($row['url']))
					$row['url'] = $row['url']['u'];
				$img = '<i class="fa fa-file-text-o fa-lg"></i>';
				if(preg_match('/.*pdf.*/', $row['url'])):
					$img = '<span class="fa fa-file-pdf-o fa-lg"></span>';
				endif;
				$row['downloadLink'] = "<a href=\"{$row['url']}\" target=\"_blank\" title=\""._('Mostrar artículo en texto completo')."\" class=\"text\">{$img}</a>";
			endif;
			$row['mendeleyLink'] = "<a class=\"text\" target=\"_blank\" href=\"http://www.mendeley.com/import/?url=".urlencode(site_url("revista/{$row['revistaSlug']}/articulo/{$row['articuloSlug']}"))."\" title=\""._('Agregue este artículo a su biblioteca Mendeley')."\"><span class=\"ai ai-mendeley-square fa-lg\"></span></a>";

			/*Creando lista de autores en html*/
			$row['autoresHTML'] = "";
			if(isset($row['autores'])):
				$totalAutores = count($row['autores']);
				$indexAutor = 1;
				foreach ($row['autores'] as $autor):
					$autorSlug = slug($autor['a']);
					$row['autoresHTML'] .= anchor("frecuencias/autor/{$autorSlug}", $autor['a'], 'title="'._sprintf('Frecuencias por autor: %s', $autor['a']).'"');
					if ( isset($autor['z']) ):
						$row['autoresHTML'] .= "<sup>{$autor['z']}</sup>";
					endif;
					if ( isset($autor['r']) ):
						$row['autoresHTML'] .= "&nbsp;<a target='_blank' href='https://www.humanindex.unam.mx/humanindex/pagina/pagina_publicaciones.php?rfc={$autor['r']}'><img src='/img/hidx.png' style='width: 30px; height: 30px;' title='Ver publicaciones del autor en Humanindex'></a>&nbsp;&nbsp;";
					endif;
					if($indexAutor < $totalAutores):
						$row['autoresHTML'] .= "; ";
					endif;
					$indexAutor++;
				endforeach;
			endif;
			/*Creando lista de instituciones html*/
			$row['institucionesHTML'] = "";
			if(isset($row['instituciones'])):
				$totalInstituciones = count($row['instituciones']);
				$indexInstitucion = 1;
				foreach ($row['instituciones'] as $key => $institucion):
					$row['institucionesHTML'] .= sprintf('<sup>%s</sup>%s%s%s%s', $institucion['z'], empty($institucion['u'])?NULL:anchor("frecuencias/institucion/".slug($institucion['u']), $institucion['u'], 'title="'._sprintf('Frecuencias por intitución: %s', $institucion['u']).'"').", ", empty($institucion['v'])?NULL:"{$institucion['v']}, ", empty($institucion['w'])?NULL:"{$institucion['w']}. ", empty($institucion['x'])?NULL:anchor("frecuencias/pais-afiliacion/".slug($institucion['x']), $institucion['x'], 'title="'._sprintf('Frecuencias por país de afiliación: %s', $institucion['x']).'"'));

					// $row['institucionesHTML'] .= "<sup>{$key}</sup>{$institucion}";
					if($indexInstitucion < $totalInstituciones):
						$row['institucionesHTML'] .= "; ";
					endif;
					$indexInstitucion++;
				endforeach;
			endif;
			/*Creando el detalle de la revista*/
			if(!empty($row['volumen'])):
				$row['volumen'] = _sprintf('Vol. %s', $row['volumen']);
			endif;
			if(!empty($row['numero'])):
				$row['numero'] = _sprintf('Núm. %s', $row['numero']);
			endif;
			if(!empty($row['periodo'])):
				$row['periodo'] = ucname($row['periodo']);
			endif;
			if(!empty($row['paginacion'])):
				$row['paginacion'] = _sprintf('Pág. %s', $row['paginacion']);
			endif;
			$row['detalleRevista'] = "[<a href=\"".site_url("frecuencias/revista/{$row['revistaSlug']}")."\" title=\""._sprintf('Frecuencias por revista: %s', $row['revista'])."\">{$row['revista']}</a>, {$row['paisRevista']}, {$row['anioRevista']} {$row['volumen']} {$row['numero']} {$row['periodo']}, {$row['paginacion']}]";

			$resultado['articulos'][++$offset] = $row;
		endforeach;
		$query->free_result();
		$ci->db->close();
		//print_r($resultado);
		//die();
		return $resultado;
	}
endif;

if ( ! function_exists('getAbstract') ):
	function getAbstract($sistema, $idDatabase){

	}
endif;

if ( ! function_exists('remove_empty') ):
	function remove_empty($array) {
	  return array_filter($array, '_remove_empty_internal');
	}
endif;

if ( ! function_exists('_remove_empty_internal') ):
	function _remove_empty_internal($value) {
	  return !empty($value) || $value === 0;
	}
endif;

if ( ! function_exists('ucname') ):
	function ucname($string) {
		$string =ucwords(mb_strtolower($string, 'UTF-8'));

		foreach (array('-', '\'') as $delimiter) :
			if (strpos($string, $delimiter)!==false):
			$string =implode($delimiter, array_map('ucfirst', explode($delimiter, $string)));
			endif;
		endforeach;
		return $string;
	}
endif;

if ( ! function_exists('htmlspecialchars_deep') ):
	function htmlspecialchars_deep($mixed, $quote_style = ENT_QUOTES, $charset = 'UTF-8'){
		if (is_array($mixed)):
			foreach($mixed as $key => $value):
				$mixed[$key] = htmlspecialchars_deep($value, $quote_style, $charset);
			endforeach;
		elseif (is_string($mixed)):
			$mixed = htmlspecialchars(htmlspecialchars_decode($mixed, $quote_style), $quote_style, $charset);
		endif;
		return $mixed;
	}
endif;

if ( ! function_exists('pqgrid_args') ):
	function pqgrid_args($args){
		if( !empty($args['pagina']) ):
			return $args;
		endif;
		$args = array(
				'pagina' => 1,
				'resultados' => 20
			);
		return $args;
	}
endif;

if ( ! function_exists('array_unchunk') ):
	function array_unchunk($array)
	{
		return call_User_Func_Array('array_Merge',$array);
	}
endif;

if ( ! function_exists('_number_format') ):
	function _number_format($value){
		if ($value == NULL)
			return NULL;
		if (preg_match('/[0-9]*\.[0-9]/', $value))
			return number_format($value, 2, '.', ',');
		return number_format($value, 0, '.', ',');
	}
endif;

if ( ! function_exists('parse_number') ):
	function parse_number($value){
		setlocale(LC_NUMERIC, 'en_US');
		if ($value == NULL)
			return NULL;
		if (preg_match('/[0-9]*\.[0-9]/', $value))
			return (float)$value;
		return (int)$value;
	}
endif;

if ( ! function_exists('adjustColorLightenDarken') ):
	function adjustColorLightenDarken($color_code,$percentage_adjuster = 0) {
		$percentage_adjuster = round($percentage_adjuster/100,2);
		if(is_array($color_code)) {
			$r = $color_code["r"] - (round($color_code["r"])*$percentage_adjuster);
			$g = $color_code["g"] - (round($color_code["g"])*$percentage_adjuster);
			$b = $color_code["b"] - (round($color_code["b"])*$percentage_adjuster);

			return array("r"=> round(max(0,min(255,$r))),
				"g"=> round(max(0,min(255,$g))),
				"b"=> round(max(0,min(255,$b))));
		}
		else if(preg_match("/#/",$color_code)) {
			$hex = str_replace("#","",$color_code);
			$r = (strlen($hex) == 3)? hexdec(substr($hex,0,1).substr($hex,0,1)):hexdec(substr($hex,0,2));
			$g = (strlen($hex) == 3)? hexdec(substr($hex,1,1).substr($hex,1,1)):hexdec(substr($hex,2,2));
			$b = (strlen($hex) == 3)? hexdec(substr($hex,2,1).substr($hex,2,1)):hexdec(substr($hex,4,2));
			$r = round($r - ($r*$percentage_adjuster));
			$g = round($g - ($g*$percentage_adjuster));
			$b = round($b - ($b*$percentage_adjuster));

			return "#".str_pad(dechex( max(0,min(255,$r)) ),2,"0",STR_PAD_LEFT)
				.str_pad(dechex( max(0,min(255,$g)) ),2,"0",STR_PAD_LEFT)
				.str_pad(dechex( max(0,min(255,$b)) ),2,"0",STR_PAD_LEFT);
		}
	}
endif;

if ( ! function_exists('verifyEmail') ):

	function verifyEmail($toemail, $fromemail, $getdetails = false){
		$email_arr = explode("@", $toemail);
		$domain = array_slice($email_arr, -1);
		$domain = $domain[0];
		// Trim [ and ] from beginning and end of domain string, respectively
		$domain = ltrim($domain, "[");
		$domain = rtrim($domain, "]");
		if( "IPv6:" == substr($domain, 0, strlen("IPv6:")) ) {
			$domain = substr($domain, strlen("IPv6") + 1);
		}
		$mxhosts = array();
		if( filter_var($domain, FILTER_VALIDATE_IP) )
			$mx_ip = $domain;
		else
			getmxrr($domain, $mxhosts, $mxweight);
		if(!empty($mxhosts) )
			$mx_ip = $mxhosts[array_search(min($mxweight), $mxhosts)];
		else {
			if( filter_var($domain, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) ) {
				$record_a = dns_get_record($domain, DNS_A);
			}
			elseif( filter_var($domain, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6) ) {
				$record_a = dns_get_record($domain, DNS_AAAA);
			}
			if( !empty($record_a) )
				$mx_ip = $record_a[0]['ip'];
			else {
				$result   = "invalid";
				$details .= "No suitable MX records found.";
				return ( (true == $getdetails) ? array($result, $details) : $result );
			}
		}

		$connect = @fsockopen($mx_ip, 25);
		if($connect){
			if(preg_match("/^220/i", $out = fgets($connect, 1024))){
				fputs ($connect , "HELO $mx_ip\r\n");
				$out = fgets ($connect, 1024);
				$details .= $out."\n";

				fputs ($connect , "MAIL FROM: <$fromemail>\r\n");
				$from = fgets ($connect, 1024);
				$details .= $from."\n";
				fputs ($connect , "RCPT TO: <$toemail>\r\n");
				$to = fgets ($connect, 1024);
				$details .= $to."\n";
				fputs ($connect , "QUIT");
				fclose($connect);
				if(!preg_match("/^250/i", $from) || !preg_match("/^250/i", $to)){
					$result = "invalid";
				}
				else{
					$result = "valid";
				}
			}
		}
		else{
			$result = "invalid";
			$details .= "Could not connect to server";
		}
		if($getdetails){
			return array($result, $details);
		}
		else{
			return $result;
		}
	}
endif;
