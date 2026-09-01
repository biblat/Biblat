<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
error_reporting(0);

class Metametrics extends CI_Controller {
    
    public function __construct(){
            parent::__construct();
            $this->output->enable_profiler($this->config->item('enable_profiler'));
            $this->template->set_partial('biblat_js', 'javascript/biblat', array(), TRUE, FALSE);
            $this->template->set_partial('submenu', 'layouts/submenu');
            $this->template->set_partial('search', 'layouts/search');
            $this->template->set_breadcrumb(_('Inicio'), site_url('/'));
            $this->template->set('class_method', $this->router->fetch_class().$this->router->fetch_method());
    }
    
    public function index(){
        $data = array();
        $pos = strpos(uri_string(), 'simulador');
        $pos2 = strpos(uri_string(), 'postular');
        if($pos == false){
            $data['simulador'] = false;
        }else{
            $data['simulador'] = true;
        }
        if($pos2 == false){
            $data['postularPrimera'] = false;
        }else{
            $data['postularPrimera'] = true;
        }
        $data['page_title'] = _('MetaMetrics');
        $this->template->set_layout('default_sel');
        $this->template->title(_('MetaMetrics'));
        $data['page_subtitle'] = _('Métricas de cumplimiento en los metadatos de OJS');
        $this->template->set_meta('description', _('MetaMetrics'));
        $this->template->js('assets/js/highcharts/phantomjs/highcharts8.js');
        $this->template->js('assets/js/highcharts/phantomjs/highcharts-more8.js');
        $this->template->js('assets/js/highcharts/phantomjs/drilldown8.js');
        $this->template->js('assets/js/apigoogle/api.js');
        $this->template->js('assets/js/apigoogle/getaccesstokenfromserviceaccount.js');
        $this->template->js('assets/js/flip/flip.js');
        $this->template->js('assets/js/utils/utils.js');
        $this->template->css('css/jquery.slider.min.css');
        $this->template->css('css/colorbox.css');
        $this->template->js('js/jquery.slider.min.js');
        $this->template->js('js/jquery.serializeJSON.min.js');
        $this->template->js('js/colorbox.js');
		$this->template->js('assets/js/jspdf/jspdf.js');
        $this->template->js('js/Aptos-normal.js');
        $this->template->js('js/env.js');
        $this->template->js('assets/js/datatables/datatables.min.js');
        $this->template->js('assets/js/datatables/input.js');
        $this->template->set_partial('main_js', 'verificador/verificador.js', array(), TRUE, FALSE);
        $this->template->build('verificador/verificador', $data);
    }
	
	public function beta(){
        $data = array();
        $pos = strpos(uri_string(), 'simulador');
        $pos2 = strpos(uri_string(), 'postular');
        if($pos == false){
            $data['simulador'] = false;
        }else{
            $data['simulador'] = true;
        }
        if($pos2 == false){
            $data['postularPrimera'] = false;
        }else{
            $data['postularPrimera'] = true;
        }
        $data['page_title'] = _('MetaMetrics');
        $this->template->set_layout('default_sel');
        $this->template->title(_('MetaMetrics'));
        $data['page_subtitle'] = _('Métricas de cumplimiento en los metadatos de OJS');
        $this->template->set_meta('description', _('MetaMetrics'));
        $this->template->js('assets/js/highcharts/phantomjs/highcharts8.js');
        $this->template->js('assets/js/highcharts/phantomjs/highcharts-more8.js');
        $this->template->js('assets/js/highcharts/phantomjs/drilldown8.js');
        $this->template->js('assets/js/apigoogle/api.js');
        $this->template->js('assets/js/apigoogle/getaccesstokenfromserviceaccount.js');
        $this->template->js('assets/js/flip/flip.js');
        $this->template->js('assets/js/utils/utils.js');
        $this->template->css('css/jquery.slider.min.css');
        $this->template->css('css/colorbox.css');
        $this->template->js('js/jquery.slider.min.js');
        $this->template->js('js/jquery.serializeJSON.min.js');
        $this->template->js('js/colorbox.js');
		$this->template->js('assets/js/jspdf/jspdf.js');
        $this->template->js('js/Aptos-normal.js');
        $this->template->js('js/env.js');
        $this->template->js('assets/js/datatables/datatables.min.js');
        $this->template->js('assets/js/datatables/input.js');
        $this->template->set_partial('main_js', 'verificador/verificador2.js', array(), TRUE, FALSE);
        $this->template->build('verificador/verificador', $data);
    }
    
    public function sobreMetaMetrics(){
        $data = array();
        $data['page_title'] = _('¿Qué es MetaMetrics?');
        $this->template->title(_('¿Qué es MetaMetrics?'));
        $this->template->set_breadcrumb(_('Metametrics'));
        $this->template->set_meta('description', _('¿Qué es MetaMetrics?'));
        $this->template->build('verificador/info_metametrics', $data);
    }
    
    function file_get_contents_curl($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:7.0.1) Gecko/20100101 Firefox/7.0.1');
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_ENCODING, "identity");
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
        /*
        $data = file_get_contents($url);
        $html_encoded = htmlentities($data);
        return $html_encoded;*/
    }
    
    function file_get_contents_curl_404($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        //curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_ENCODING, "identity");
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        $data = curl_exec($ch);
        $info = curl_getinfo($ch);
        curl_close($ch);
        if ($info['http_code'] >= 400) {
            return true;
        }else{
            return false;
        }
    }
    
    function file_get_contents_curl2($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        //curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_ENCODING, "identity");
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
        curl_setopt($ch, CURLOPT_TIMEOUT, 600);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
        /*
        $data = file_get_contents($url);
        $html_encoded = htmlentities($data);
        return $html_encoded;*/
    }
    
    function file_get_contents_curl_proxy($url){
        $ch = curl_init();
                
        // Configura tu propio proxy y puerto
        $proxy_url = '72.206.181.97'; // Cambia esto con la URL de tu propio proxy
        $proxy_port = 64943; // Cambia esto con el número de puerto de tu propio proxy

        /*
        // Configuración de cURL
        curl_setopt($ch, CURLOPT_URL, $url);

        // Especifica tu propio proxy y puerto
        curl_setopt($ch, CURLOPT_PROXY, $proxy_url);
        curl_setopt($ch, CURLOPT_PROXYPORT, $proxy_port);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);*/
        
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_PROXY, $proxy_url.":".$proxy_port); // Proxy de Tor
        curl_setopt($ch, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5); // Tipo de proxy SOCKS5
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
        /*
        $data = file_get_contents($url);
        $html_encoded = htmlentities($data);
        return $html_encoded;*/
    }
    
    
    public function get_oai(){
        $oai = $_GET['oai'];
        $years = $_GET['years'];
        $url = $oai.'?verb=ListRecords&metadataPrefix=oai_biblat&years_'.$years.'&tk_'.rand();
        //$url = $oai.'?verb=ListRecords&from='.date("Y").'-01-01T02:00:00Z&until='.$years.'-12-31T03:00:00Z&metadataPrefix=oai_biblat&years_'.$years.'&tk_'.rand();
        $url2 = $oai.'?verb=ListRecords&from='. date("Y").'-01-01T02:00:00Z&until='. date("Y").'-12-01T03:00:00Z&metadataPrefix=oai_biblat&years_'.$years.'&tk_'.rand();
        $url3 = $oai.'?verb=ListRecords&from='. (date("Y")-1).'-01-01T02:00:00Z&until='. (date("Y")-1).'-12-01T03:00:00Z&metadataPrefix=oai_biblat&years_'.$years.'&tk_'.rand();
        $url4 = $oai.'?verb=ListRecords&from='. (date("Y")-2).'-01-01T02:00:00Z&until='. (date("Y")-2).'-12-01T03:00:00Z&metadataPrefix=oai_biblat&years_'.$years.'&tk_'.rand();
        
        $url = $this->file_get_contents_curl2($url);
        
        $dom = new DOMDocument();
        @$dom->loadHTML($url);
        
        $busca = strpos($url, 'noRecordsMatch');
        if ($busca !== false){
            $response = '{"resp": "noRecordsMatch"}';
            echo $response;
            return 0;
        }
        
        $token = explode('cursor=', $url)[1];
        $token = explode('</resumptionToken>', $token)[0];
        $token = explode('>', $token)[1];
        
        //obtenemos todos los div de la url
        $divs = $dom->getElementsByTagName('varfield');
        $version = '3';
        $ver = '';
        $exist_div = false;
        $anio_diferente = false;
        
        foreach( $divs as $div ){
            $exist_div = true;
            if( $div->getAttribute( 'id' ) === "000" ){
                $ver = explode("v", $div->nodeValue)[0];
                $busca = strpos($div->nodeValue, '2.3.0');
                if ($busca !== false){
                    $version = '2';
                    break;
                }
            }
        }
        
        $anio_encontrado = '';
        //Revisión para verificar el formato del año
		/*Tal vez ya no se requiere esta parte 2024-02											  
        $divs2 = $dom->getElementsByTagName('subfield');
        if($exist_div){
            foreach( $divs2 as $div2 ){
                if( $div2->getAttribute( 'label' ) === "c" ){
                    $anio_encontrado = $div2->nodeValue;
                    //Si el año no es de longitud 4, se hace la relación
                    if( strlen($anio_encontrado) != 4 ){
                        $espacio = strpos($anio_encontrado, " ");
                        
                        if ($espacio !== false) {
                            $anio_encontrado = explode(" ", $anio_encontrado)[1];
                        }
                        
                        if( strlen($anio_encontrado) != 4 ){
                        
                            $anio_diferente = true;
                            if($years == 0){
                                break;
                            }
                            $fixs = $dom->getElementsByTagName('fixfield');
                            foreach( $fixs as $fix ){
                                if( $fix->getAttribute( 'id' ) === "008" ){
                                    $anio_4 = explode(" ", $fix->nodeValue)[1];
                                    $years = intval($anio_encontrado) + (intval($years)-intval($anio_4));
                                    $url2 = $oai.'?verb=ListRecords&metadataPrefix=oai_biblat&years_'.$years.'&tk_'.rand();
                                    $url3 = $oai.'?verb=ListRecords&from='. date("Y").'-01-01T02:00:00Z&until='. date("Y").'-12-01T03:00:00Z&metadataPrefix=oai_biblat&years_'.$years.'&tk_'.rand();
                                    $url4 = $oai.'?verb=ListRecords&from='. (date("Y")-1).'-01-01T02:00:00Z&until='. (date("Y")-1).'-12-01T03:00:00Z&metadataPrefix=oai_biblat&years_'.$years.'&tk_'.rand();
                                    $exist_div = false;
                                }
                                break;
                            }
                            break;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
            }
        }*/
        
        $termina = 10;
        /*OTra que tal vez tampoco 2024-02*/
        while($exist_div == false && $termina != 0){
            $url_token = $oai.'?verb=ListRecords&resumptionToken=<token>&years_'.$years.'&tk_'.rand();
            $url_tk = str_replace('<token>', $token, $url_token);
            //$url = file_get_contents($url_tk);
            $url = $this->file_get_contents_curl2($url_tk);
            $dom2 = new DOMDocument();
            @$dom2->loadHTML($url);
            
            $token = explode('cursor=', $url)[1];
            $token = explode('</resumptionToken>', $token)[0];
            $token = explode('>', $token)[1];
            
            $divs = $dom2->getElementsByTagName('varfield');
            
            foreach( $divs as $div ){
                $exist_div = true;
                if( $div->getAttribute( 'id' ) === "000" ){
                    $ver = explode("v", $div->nodeValue)[0];
                    $busca = strpos($div->nodeValue, '2.3.0');
                    if ($busca !== false){
                        $version = '2';
                        break;
                    }
                }
            }
            $termina = $termina - 1;
        }
        
        /*
        //
        if( $exist_div == false ){
            //while($token !== '' && $exist_div == false){
                $url = file_get_contents($url2);
                $dom2 = new DOMDocument();
                @$dom2->loadHTML($url);
                $divs = $dom2->getElementsByTagName('varfield');
                foreach( $divs as $div ){
                    $exist_div = true;
                    if( $div->getAttribute( 'id' ) === "000" ){
                        $ver = explode("v", $div->nodeValue)[0];
                        $busca = strpos($div->nodeValue, '2.3.0');
                        if ($busca !== false){
                            $version = '2';
                            break;
                        }
                    }
                }
            //}
        }
        
        if( $exist_div == false ){
            //while($token !== '' && $exist_div == false){
                $url = file_get_contents($url3);
                $dom2 = new DOMDocument();
                @$dom2->loadHTML($url);
                $divs = $dom2->getElementsByTagName('varfield');
                foreach( $divs as $div ){
                    $exist_div = true;
                    if( $div->getAttribute( 'id' ) === "000" ){
                        $ver = explode("v", $div->nodeValue)[0];
                        $busca = strpos($div->nodeValue, '2.3.0');
                        if ($busca !== false){
                            $version = '2';
                            break;
                        }
                    }
                }
            //}
        }
        
        if( $exist_div == false ){
            //while($token !== '' && $exist_div == false){
                $url = file_get_contents($url4);
                $dom2 = new DOMDocument();
                @$dom2->loadHTML($url);
                $divs = $dom2->getElementsByTagName('varfield');
                foreach( $divs as $div ){
                    $exist_div = true;
                    if( $div->getAttribute( 'id' ) === "000" ){
                        $ver = explode("v", $div->nodeValue)[0];
                        $busca = strpos($div->nodeValue, '2.3.0');
                        if ($busca !== false){
                            $version = '2';
                            break;
                        }
                    }
                }
            //}
        }
        */
        
		/*Tampoco 2024-02				 
        if( $years == 0 ){
            $url = $oai.'?verb=ListRecords&metadataPrefix=oai_biblat&years_'.$anio_encontrado.'&tk_'.rand();
            $url = file_get_contents($url);
            $dom2 = new DOMDocument();
            @$dom2->loadHTML($url);
            $divs = $dom2->getElementsByTagName('varfield');
            foreach( $divs as $div ){
                $exist_div = true;
                if( $div->getAttribute( 'id' ) === "000" ){
                    $ver = explode("v", $div->nodeValue)[0];
                    $busca = strpos($div->nodeValue, '2.3.0');
                    if ($busca !== false){
                        $version = '2';
                        break;
                    }
                }
            }
        }*/
            
        if( $exist_div == false ){
            $response = '{"resp": "Fail"}';
            echo $response;
        }
        else{
            $ciphering = "AES-256-CBC";
            $iv_length = openssl_cipher_iv_length($ciphering);
            $options = 0;
            $encryption_iv = substr(hash('sha256', ''), 0, 16);
            $encryption_key = hash('sha256', '');

            $response = '{ "ver": "' . trim($ver) . '"';
            if ($version == '2'){
                foreach( $divs as $div ){
                    if( $div->getAttribute( 'id' ) === "db" ){
                        $db = $div->nodeValue;
                        $db = pack("H*",$db);

                        $arr_db = explode("xxx[", $db);
                        $obj = json_decode($arr_db[1]);
                        $response .= ',"i": [' . explode("]xxx", $arr_db[1])[0] . ']';
                        $response .= ', "j": [' . explode("]xxx", $arr_db[2])[0] . ']';
                        $response .= ', "js": [' . explode("]xxx", $arr_db[3])[0] . ']';
                        $response .= ', "ss": [' . explode("]xxx", $arr_db[4])[0] . ']';
                        $response .= ', "p": [' . explode("]xxx", $arr_db[5])[0] . ']';
                        $response .= ', "ps": [' . explode("]xxx", $arr_db[6])[0] . ']';
                        $response .= ', "is": [' . explode("]xxx", $arr_db[7])[0] . ']';
                        $response .= ', "a": [' . explode("]xxx", $arr_db[8])[0] . ']';
                        $response .= ', "as": [' . explode("]xxx", $arr_db[9])[0] . ']';
                        $response .= ', "s": [' . explode("]xxx", $arr_db[10])[0] . ']';
                        $response .= ', "ses": [' . explode("]xxx", $arr_db[11])[0] . ']';
                        $response .= ', "pg": [' . explode("]xxx", $arr_db[12])[0] . ']';
                        $response .= ', "num": [' . explode("]xxx", $arr_db[13])[0] . ']';
                        $response .= '} ';

                        //header('Content-Type: text/plain; charset=utf-8');
                        header('Content-Type: application/json; charset=utf-8');
                        echo $response;
                    }
                }
            }else{
                $dec = '';
                $subfield = null;
                foreach( $divs as $div ){
                    if( $div->getAttribute( 'id' ) === "db" ){
                        $subfield = $div;
                        break;
                    }
                }

                $divs = $subfield->getElementsByTagName('subfield');
                $subs = array("i", "j", "j_s", "ss", "p", "p_s", "i_s", "a", "a_s", "c_v_e_s", "s", "s_s", "p_g", "p_f", "num");
                $subs_exist = array();
                foreach( $divs as $div ){
                    if( in_array( $div->getAttribute( 'label' ), $subs)){
                        array_push($subs_exist, $div->getAttribute( 'label' ));
                        $db = $div->nodeValue;
                        $dec .= openssl_decrypt ($db, $ciphering, $encryption_key, $options, $encryption_iv);
                    }
                }
                $arr_db = explode("xxx[", $dec);
                $obj = json_decode($arr_db[1]);

                //De las opciones de la revista selecciona sólo las indispensables
                $string_js = '';
                
                //propiedades en journal
                $pieces = explode("},{", '[' . explode("]xxx", $arr_db[3])[0] . ']');
                $ops_js = array('"setting_name":"title"', '"setting_name":"name"', '"setting_name":"printIssn"', '"setting_name":"onlineIssn"', '"setting_name":"publisherInstitution"', '"setting_name":"supportedSubmissionLocales"');
                foreach( $pieces as $p ){
                    foreach( $ops_js as $op){
                        if( stripos($p, $op) !== false ){
                            if($string_js != ''){
                                $string_js .= ',';
                            }
                            $string_js .= '{' . str_replace('{', '',str_replace('[', '', str_replace(']', '', str_replace('}','',$p)))) . '}';
                        }
                    }
                }
                
                
                //propiedades en author settings
                $pieces = explode("},{", '[' . explode("]xxx", $arr_db[9])[0] . ']');
                $string_as = '';
                $ops_js = array('"setting_name":"affiliation"', '"setting_name":"orcid"', '"setting_name":"givenName"', '"setting_name":"familyName"');
                foreach( $pieces as $p ){
                    foreach( $ops_js as $op){
                        if( stripos($p, $op) !== false ){
                            if($string_as != ''){
                                $string_as .= ',{';
                            }
                            $string_as .= $p . '}';
                        }
                    }
                }
                
                //propiedades en pub settings
                $pieces = explode("},{", '[' . explode("]xxx", $arr_db[6])[0] . ']');
                $string_ps = '';
                $ops_js = array('"setting_name":"title"', '"setting_name":"cleanTitle"', '"setting_name":"issueId"', '"setting_name":"pages"', '"setting_name":"pub-id::doi"', '"setting_name":"doi"', '"setting_name":"abstract"', '"setting_name":"subject"', '"setting_name":"citationsRaw"', '"setting_name":"licenseURL"', '"setting_name":"licenseUrl"');
                foreach( $pieces as $p ){
                    foreach( $ops_js as $op){
                        if( stripos($p, $op) !== false ){
                            if($string_ps != ''){
                                $string_ps .= ',{';
                            }
                            $string_ps .= $p . '}';
                        }
                    }
                }

                $response .= ', "i": [' . explode("]xxx", $arr_db[1])[0] . ']';
                $response .= ', "j": [' . explode("]xxx", $arr_db[2])[0] . ']';
                //-----$response .= ', "js": ' . $arr_db[5];
                $response .= ', "js": ' . '[' . $string_js . ']';
                $response .= ', "ss": [' . explode("]xxx", $arr_db[4])[0] . ']';
                $response .= ', "p": [' . explode("]xxx", $arr_db[5])[0] . ']';
                $response .= ', "ps": [' . explode("]xxx", $arr_db[6])[0] . ']';
                //$response .= ', "ps": [' . $string_ps . ']';
                $response .= ', "is": [' . explode("]xxx", $arr_db[7])[0] . ']';
                $response .= ', "a": [' . explode("]xxx", $arr_db[8])[0] . ']';
                $response .= ', "as": [' . explode("]xxx", $arr_db[9])[0] . ']';
                //$response .= ', "as": [' . $string_as . ']';
                if( in_array( "c_v_e_s", $subs_exist) ){
                    $response .= ', "c_v_e_s": [' . explode("]xxx", $arr_db[10])[0] . ']';
                    $response .= ', "s": [' . explode("]xxx", $arr_db[11])[0] . ']';
                    $response .= ', "ses": [' . explode("]xxx", $arr_db[12])[0] . ']';
                    $response .= ', "pg": [' . explode("]xxx", $arr_db[13])[0] . ']';
                    $response .= ', "pf": [' . explode("]xxx", $arr_db[14])[0] . ']';
                    if(explode("]xxx", $arr_db[15])[0] + ']'!== null){
                        $response .= ', "num": [' . explode("]xxx", $arr_db[15])[0] . ']';
                    }
                }else{
                    $response .= ', "s": [' . explode("]xxx", $arr_db[10])[0] . ']';
                    $response .= ', "ses": [' . explode("]xxx", $arr_db[11])[0] . ']';
                    $response .= ', "pg": [' . explode("]xxx", $arr_db[12])[0] . ']';
                    $response .= ', "pf": [' . explode("]xxx", $arr_db[13])[0] . ']';
                    $response .= ', "num": [' . explode("]xxx", $arr_db[14])[0] . ']';
                }
                $response .= '}';
                /*
                $response = str_replace('"as": [[', '"as": [', $response);
                $response = str_replace('"as": [', '"as": [{', $response);
                $response = str_replace('"as": [{{', '"as": [{', $response);
                $response = str_replace('}]}], "s"', '}], "s"', $response);
                $response = str_replace('}]}], "c_v_e_s"', '}], "c_v_e_s"', $response);
                $response = str_replace('"as": [{]', '"as": []', $response);
                $response = str_replace('"ps": [[', '"ps": [', $response);
                $response = str_replace('"ps": [', '"ps": [{', $response);
                $response = str_replace('"ps": [{{', '"ps": [{', $response);
                $response = str_replace('}]}], "is"', '}], "is"', $response);
                $response = str_replace('"ps": [{]', '"ps": []', $response);*/
                

                //header('Content-Type: text/plain; charset=utf-8');
                header('Content-Type: application/json; charset=utf-8');
                echo $response;
            }
        }
    }
    
    public function get_data_by_issn(){
        $issn = $_GET['issn'];
        $url = 'https://portal.issn.org/resource/ISSN/' . $issn;
        $curl = $this->file_get_contents_curl($url);
        $dom = new DOMDocument();
        @$dom->loadHTML($curl);
        $divs = $dom->getElementsByTagName('p');
        $divsa = $dom->getElementsByTagName('a');
        $dds = $dom->getElementsByTagName('dd');
        $xpath = new DOMXPath($dom);

        $nodes = $xpath->query('//li[@data-key="resource-link"]/a');
        
        $titulo = '';
        $pais = '';
        $url = '';
        $tipo = '';
        
        foreach( $divs as $div ){
            $busca = strpos($div->nodeValue, 'Title proper');
            if( $busca !== false ){
                $titulo = $div->nodeValue;
                continue;
            }
            $busca = strpos($div->nodeValue, 'Country');
            if( $busca !== false ){
                $pais = $div->nodeValue;
                continue;
            }
            $busca = strpos($div->nodeValue, 'URL');
            if( $busca !== false ){
                $url = $div->nodeValue;
                continue;
            }
            $busca = strpos($div->nodeValue, 'Publisher');
            if( $busca !== false ){
                $publisher = $div->nodeValue;
                continue;
            }
        }
        
        foreach( $divsa as $div ){
            // Obtener el valor del atributo 'class'
            $class = $div->getAttribute('class');

            // Verificar si la clase contiene la cadena que buscas
            if (strpos($class, 'online-active') !== false) {
                $tipo = 'online';
                break;
            }
            if (strpos($class, 'print-active') !== false) {
                $tipo = 'print';
                break;
            }
        }
        
        $titulo = str_replace('Title proper:', '', $titulo);
        $titulo = trim($titulo);
        $titulo = trim($titulo, ".");
        
        $pais = str_replace('Country:', '', $pais);
        $pais = trim($pais);
        $pais = trim($pais, ".");
        
        $url = str_replace('URL:', '', $url);
        $busca = strpos($url, 'http');
        if( $busca !== false ){
            $url = explode("http", $url)[1];
            if($url !== ''){
                $url = 'http' . trim($url);
            }
        }
        
        $publisher = str_replace('Publisher:', '', $publisher);
        $publisher = trim($publisher);
        $publisher = trim($publisher, ".");
        
               foreach ($dds as $dd) {
            if ($dd->hasAttribute('data-key') && $dd->getAttribute('data-key') === 'title-proper') {
                $titulo = trim($dd->nodeValue);
                continue;
            }
            if ($dd->hasAttribute('data-key') && $dd->getAttribute('data-key') === 'issuing-bodies') {
                $publisher = trim($dd->nodeValue);
                continue;
            }
            if ($dd->hasAttribute('data-key') && $dd->getAttribute('data-key') === 'country') {
                $pais = trim($dd->nodeValue);
                continue;
            }
        }
        
        if ($nodes->length > 0) {
            $url = trim($nodes->item(0)->getAttribute('href'));
        }
        
        $response = '{ ';
        $response .= '"titulo": "' . $titulo . '"';
        $response .= ',"pais": "' . $pais . '"';
        $response .= ',"url": "' . $url . '"';
        $response .= ',"editor": "' . $publisher . '"';
        $response .= ',"tipo": "' . $tipo . '"';
        $response .= '} ';
        
        echo $response;
        
        /*
        @$dom->loadHTML($titulo);
        $divs = $dom->getElementsByTagName('h1');
        $titulo = $divs[0]->nodeValue;
        
        echo $titulo;
        /*
        @$dom->loadHTML($node->nodeValue);
        $nodes = $dom->getElementsByTagName('h3');*/
    }
    
    public function get_name_by_orcid(){
        $orcid = $_GET['orcid'];
        $url = 'https://pub.orcid.org/v3.0/'.$orcid.'/person';
        $curl = file_get_contents($url);
        if($curl == ''){
            $response = '{"resp": "Fail"}';
        }else{
            $nombre = explode('</common:source-name>',explode('<common:source-name>', $curl)[1])[0];
            if($nombre == ''){
                $given_name = explode('</personal-details:given-names>',explode('<personal-details:given-names>', $curl)[1])[0];
                $family_name = explode('</personal-details:family-name>',explode('<personal-details:family-name>', $curl)[1])[0];
                $nombre = $given_name . ' ' . $family_name;
            }
            $response = '{"resp": "'.$nombre.'"}';
        }
        echo $response;
    }
    
    public function get_doi_validate(){
        //10.3623/revisa.v%.n%.p926%
        //10.22201/iib.2594178xe.2021.1.92
        $doi = $_GET['doi'];
        $url = 'http://doi.org/api/handles/<doi>';
        $url = str_replace('<doi>', $doi, $url);
        $url = $this->file_get_contents_curl($url);
        echo $url;
    }
    
    public function get_url_validate(){
        //10.3623/revisa.v%.n%.p926%
        //10.22201/iib.2594178xe.2021.1.92
        $url = $_GET['url'];
        if( $this->file_get_contents_curl_404($url) ){
            $response = '{"resp": "Fail"}';
        }else{
            $text = $this->file_get_contents_curl($url);
            $dom = new DOMDocument();
            @$dom->loadHTML($text);
            $divs = $dom->getElementsByTagName('title');
            $busca = strpos($div->nodeValue, '404 Not Found');

            if( $busca !== false ){
                $response = '{"resp": "Fail"}';
            }else{
                $response = '{"resp": "Success"}';
            }
        }
        echo $response;
    }
    
    public function get_contents_validate(){
        $url = $_GET['url'];
        if( $this->file_get_contents_curl_404($url) ){
            $response = '{"resp": "Fail"}';
        }else{
            $response = '{"resp": "Success"}';
        }
        echo $response;
        /*$contents = file_get_contents($url);
        if( $contents == "" ){
            $response = '{"resp": "Fail"}';
        }else{
            $response = '{"resp": "Success"}';
        }
        echo $response;*/
    }
    
    public function ws_insert_article(){
        //$this->output->enable_profiler(false);
        if ($this->input->post()) {
            $this->load->model('generic_model');
            $this->generic_model->insert_if_ne_article($this->input->post('tabla'), $this->input->post('where'), $this->input->post('data'));
        }
    }
    
	public function ws_insert_new_article(){
        //$this->output->enable_profiler(false);
        if ($this->input->post()) {
            $this->load->model('generic_model');
            $this->generic_model->insert_if_ne_new_article($this->input->post('tabla'), $this->input->post('where'), $this->input->post('data'));
        }
    }

    public function ws_insert_instituciones(){
        //$this->output->enable_profiler(false);
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        if ($data) {
            $this->load->model('generic_model');
            //$this->generic_model->delete($this->input->post('tabla_autores'), $this->input->post('where_delete'), $this->input->post('data_autores'));
            if($data['data_instituciones']){
                
                //Si se marcó como autor corportativo
                if( $data['corporativo'] == 1 ){
                    //Inserta todas las que vengan en el arreglo
                    $this->generic_model->insert_if_ne($data['tabla_corporativo'], $data['where'], $data['data_corporativo']);
                    //Borra todas las instituciones
                    $this->generic_model->delete($data['tabla_instituciones'], $data['where_delete'], $data['data_instituciones']);
                    //Borra todos los autores
                    $this->generic_model->delete($data['tabla_autores'], $data['where_delete'], $data['data_autores']);
                    //Para cada una de ellas actualiza los campos "Slug"
                    $this->generic_model->update_function($data['tabla_corporativo'], $data['where_delete'], $data['data_corporativo'],
                            array('slug', 'paisSlug'), array('institucion', 'pais'), 'slug');
                }else{
                    //Borra todas los corporativos
                    $this->generic_model->delete($data['tabla_corporativo'], $data['where_delete'], $data['data_corporativo']);
                    //Primero Borra todas las instituciones
                    $this->generic_model->delete($data['tabla_instituciones'], $data['where_delete'], $data['data_instituciones']);
                    //Inserta todas las que vengan en el arreglo
                    $this->generic_model->insert_if_ne($data['tabla_instituciones'], $data['where'], $data['data_instituciones']);
                    //Para cada una de ellas actualiza los campos "Slug"
                    $this->generic_model->update_function($data['tabla_instituciones'], $data['where_delete'], $data['data_instituciones'],
                            array('slug', 'paisInstitucionSlug'), array('institucion', 'pais'), 'slug');
                }
                
            }else{
                $this->generic_model->delete($data['tabla_instituciones'], $data['where_delete'], array(array('sistema' => $data['sistema'])));
            }
            //Actualiza también los autores pir si hubo cambio de id
            $this->generic_model->update($data['tabla_autores'], $data['where'], $data['data_autores']);
        }
    }
    
    public function ws_insert_autores(){
        //$this->output->enable_profiler(false);
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        if ($data) {
            $this->load->model('generic_model');
            if($data['data_autores']){
                //Primero Borra todos los autores
                $this->generic_model->delete($data['tabla_autores'], $data['where_delete'], $data['data_autores']);
                //Inserta todas las que vengan en el arreglo
                $this->generic_model->insert_if_ne($data['tabla_autores'], $data['where'], $data['data_autores']);
                //Para cada una de ellas actualiza los campos "Slug"
                $this->generic_model->update_function($data['tabla_autores'], $data['where_delete'], $data['data_autores'],
                        array('slug'), array('nombre'), 'slug');
            }else{
                $this->generic_model->delete($data['tabla_autores'], $data['where_delete'], array(array('sistema' => $data['sistema'])));
            }
        }
    }
    
    public function ws_asigna(){
        //$this->output->enable_profiler(false);
        if ($this->input->post()) {
            $this->load->model('generic_model');
            echo $this->generic_model->update_asigna($this->input->post('tabla'), $this->input->post('where'), $this->input->post('data'));
        }
    }
    
    public function ws_update(){
        //$this->output->enable_profiler(false);
        if ($this->input->post()) {
            $this->load->model('generic_model');
            echo $this->generic_model->update($this->input->post('tabla'), $this->input->post('where'), $this->input->post('data'));
        }
    }
	
	public function ws_update_article(){
        //$this->output->enable_profiler(false);
        if ($this->input->post()) {
            $this->load->model('generic_model');
            echo $this->generic_model->update_article($this->input->post('tabla'), $this->input->post('where'), $this->input->post('data'));
        }
    }
	
	public function ws_update_or_insert(){
        //$this->output->enable_profiler(false);
        if ($this->input->post()) {
            $this->load->model('generic_model');
            echo $this->generic_model->update_or_insert($this->input->post('tabla'), $this->input->post('where'), $this->input->post('data'));
        }
    }
	
	public function ws_update_estatus(){
        //$this->output->enable_profiler(false);
        if($this->session->userdata('usu_base') == ""){
            $resp = '{"resp": "session"}';
        }else{
        
            if ($this->input->post()) {
                $this->load->model('generic_model');
                $this->generic_model->update_estatus($this->input->post('tabla'), $this->input->post('where'), $this->input->post('data'));
                $resp = '{"resp": "success"}';
            }
        }
        header('Content-Type: application/json; charset=utf-8');
        echo $resp;
    }
	
	public function ws_bitacora(){
        if ($this->input->post()) {
            $this->load->model('generic_model');
            $this->generic_model->insert_bitacora($this->input->post('movimiento'), $this->input->post('sistema'), $this->input->post('tiempo'));
        }
    }
	
    /* ============================================================
     * BIBLAT CENTRAL PORTÁTIL - EXPORTACIÓN
     * Fase 1: genera el ZIP autocontenido con datos y catálogos.
     * ============================================================ */
    public function portatil_preparar_v110(){
        $this->output->enable_profiler(false);
        @set_time_limit(300);

        /*
         * Diagnóstico Fase 1.9: si PHP muere antes de responder, devolvemos
         * un JSON pequeño indicando la etapa en la que ocurrió.
         */
        $portatil_stage = 'inicio';
        $portatil_finalizado = false;
        register_shutdown_function(function() use (&$portatil_stage, &$portatil_finalizado){
            if($portatil_finalizado){
                return;
            }
            $err = error_get_last();
            if(!$err || !in_array($err['type'], array(E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR), true)){
                return;
            }
            while(ob_get_level() > 0){
                @ob_end_clean();
            }
            if(!headers_sent()){
                http_response_code(500);
                header('Content-Type: application/json; charset=utf-8');
                header('Cache-Control: no-store');
            }
            echo json_encode(array(
                'resp' => 'error',
                'export_version' => '1.10',
                'mensaje' => 'PHP se interrumpió durante la exportación.',
                'etapa' => $portatil_stage,
                'php_error' => isset($err['message']) ? $err['message'] : 'Error fatal'
            ), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        });

        $usuario = $this->session->userdata('usu_base');
        if(!$usuario){
            return $this->portatil_error('Sesión no válida.', 401);
        }


        $raw = file_get_contents('php://input');
        $entrada = json_decode($raw, true);
        if(!is_array($entrada)){
            return $this->portatil_error('Solicitud de exportación inválida.', 400);
        }

        $sistemas = isset($entrada['sistemas']) && is_array($entrada['sistemas']) ? $entrada['sistemas'] : array();
        $sistemas = array_values(array_unique(array_filter(array_map('trim', $sistemas))));
        if(count($sistemas) === 0){
            return $this->portatil_error('No hay artículos para exportar.', 400);
        }

        $portatil_stage = 'conectando_bd';
        $db = $this->load->database('prueba', TRUE);
        $db_main = $this->load->database('', TRUE);

        /* Seguridad: sólo se exportan sistemas realmente asignados al usuario. */
        $portatil_stage = 'validando_sistemas';
        $db->select('sistema, estatus, "estatusPC", asignado, "asignadoPC"', false);
        $db->from('article');
        $db->where_in('sistema', $sistemas);
        /*
         * Fase 1.9 - protección de registros finalizados.
         *
         * Un artículo sólo puede viajar si el usuario tiene al menos un flujo
         * ACTIVO sobre él:
         *   - análisis normal: asignado al usuario y estatus distinto de C/B;
         *   - palabras clave: asignadoPC al usuario y estatusPC A/R.
         *
         * Esto permite que un artículo con estatus=C se exporte para revisión
         * de palabras clave cuando estatusPC=A/R. Lo que no se permite es
         * reabrir mediante el portátil un flujo que ya estaba cerrado.
         */
        $usuario_sql = $db->escape($usuario);
        $condicion_activa = '('.
            '(asignado = '.$usuario_sql." AND (estatus IS NULL OR estatus NOT IN ('C','B')))".
            ' OR '.
            '("asignadoPC" = '.$usuario_sql." AND \"estatusPC\" IN ('A','R'))".
        ')';
        $db->where($condicion_activa, null, false);
        // La v1 portátil no incluye el flujo de Erratas.
        $db->where("(documento->>'a' is null or documento->>'a' <> 'Errata')", null, false);
        $permitidos_rows = $db->get()->result_array();
        $permitidos = array_values(array_unique(array_column($permitidos_rows, 'sistema')));

        if(count($permitidos) === 0){
            return $this->portatil_error('No se encontraron artículos autorizados para exportar.', 403);
        }

        /* Conserva el orden de la lista que tenía el navegador. */
        $orden = array_flip($sistemas);
        usort($permitidos, function($a, $b) use ($orden){
            $oa = isset($orden[$a]) ? $orden[$a] : PHP_INT_MAX;
            $ob = isset($orden[$b]) ? $orden[$b] : PHP_INT_MAX;
            return $oa - $ob;
        });

        $portatil_stage = 'cargando_articulos';
        $articulos = $this->portatil_articulos($db, $permitidos, $usuario);
        $portatil_stage = 'cargando_documentos';
        $documentos = $this->portatil_documentos($db, $permitidos);
        $portatil_stage = 'cargando_autores';
        $autores = $this->portatil_autores($db, $permitidos);
        $portatil_stage = 'cargando_instituciones';
        $instituciones = $this->portatil_instituciones($db, $permitidos);

        /*
         * La aplicación en línea ya intenta deducir el país desde el texto de
         * la institución cuando institution.pais viene vacío. Replicamos esa
         * misma lógica antes de construir los catálogos portátiles; de lo
         * contrario un lote con países deducidos terminaba exportando [] en
         * ciudades_por_pais e instituciones_por_pais.
         */
        $catalogo_paises = array();
        $catalogo_pais_slugs = array();
        if(isset($entrada['catalogos']) && is_array($entrada['catalogos'])){
            if(isset($entrada['catalogos']['pais']) && is_array($entrada['catalogos']['pais'])){
                $catalogo_paises = $entrada['catalogos']['pais'];
            }
            if(isset($entrada['catalogos']['pais_slug']) && is_array($entrada['catalogos']['pais_slug'])){
                $catalogo_pais_slugs = $entrada['catalogos']['pais_slug'];
            }
        }
        $instituciones = $this->portatil_normaliza_paises_instituciones(
            $instituciones,
            $catalogo_paises,
            $catalogo_pais_slugs
        );

        $portatil_stage = 'cargando_genera_pc';
        $genera_pc = $this->portatil_genera_pc($db_main, $permitidos);
        $portatil_stage = 'cargando_catalogos_institucionales';
        $catalogos_ligeros = $this->portatil_catalogos_instituciones(
            $db,
            $instituciones,
            $articulos,
            $catalogo_paises,
            $catalogo_pais_slugs
        );

        $pal_cla = isset($entrada['pal_cla']) ? (string)$entrada['pal_cla'] : '0';
        $catalogos_palabras = array('palabras_sustituye' => array());
        if($pal_cla === '1'){
            /*
             * palabras/keywords NO se vuelven a consultar aquí. La pantalla ya
             * las tiene cargadas en class_av.var.palabras_clave0 / keywords0 y
             * el navegador las incorporará al ZIP. Esto evita duplicar cientos
             * de miles de registros dentro de la memoria de PHP.
             */
            $portatil_stage = 'cargando_sustituciones';
            $q_sust = $db_main->query('select palabra, palabra_adecuada from palabras_clave');
            if($q_sust){
                $catalogos_palabras['palabras_sustituye'] = $q_sust->result_array();
            }
        }

        $institucion_diccionario = array();
        $q_dic = $db_main->query('select instituciones from usuario_institution_dic where usuario = ?', array($usuario));
        if($q_dic && $q_dic->num_rows() > 0){
            $row_dic = $q_dic->row_array();
            if(!empty($row_dic['instituciones'])){
                $tmp_dic = json_decode($row_dic['instituciones'], true);
                if(is_array($tmp_dic)){
                    $institucion_diccionario = $tmp_dic;
                }
            }
        }

        $package_id = $this->portatil_uuid();
        $fecha = date('c');

        $por_sistema = array();
        foreach($permitidos as $sistema){
            $por_sistema[$sistema] = array(
                'listado' => isset($articulos[$sistema]) ? $articulos[$sistema] : array('sistema' => $sistema),
                'documento' => isset($documentos[$sistema]) ? $documentos[$sistema] : array('sistema' => $sistema),
                'autores' => isset($autores[$sistema]) ? $autores[$sistema] : array(),
                'instituciones' => isset($instituciones[$sistema]) ? $instituciones[$sistema] : array(),
                'genera_pc' => isset($genera_pc[$sistema]) ? $genera_pc[$sistema] : null
            );
        }
        
        /*
        * Ya quedaron incorporadas dentro de $por_sistema.
        */
       unset($articulos);
       unset($documentos);
       unset($autores);
       unset($instituciones);
       unset($genera_pc);
       unset($permitidos_rows);

        $firmas_articulos = array();
        foreach($por_sistema as $sistema => $original_articulo){
            $hash_articulo = $this->portatil_hash_array($original_articulo);
            $firmas_articulos[$sistema] = array(
                'hash' => $hash_articulo,
                'signature' => $this->portatil_firma_articulo($package_id, $usuario, $sistema, $hash_articulo)
            );
        }

        $paquete = array(
            'metadata' => array(
                'schema_version' => 1,
                'package_id' => $package_id,
                'usuario' => $usuario,
                'rol' => isset($entrada['rol']) ? (string)$entrada['rol'] : '',
                'pal_cla' => $pal_cla,
                'res' => isset($entrada['res']) ? (string)$entrada['res'] : '0',
                'exported_at' => $fecha,
                'total_articulos' => count($permitidos),
                'omitidos_no_exportables' => max(0, count($sistemas) - count($permitidos)),
                'excluye_finalizados' => true,
                'modo' => 'portable-hibrido',
                'pdfs_incluidos' => false,
                'agregar_articulo' => false,
                'erratas' => false,
                'article_signatures' => $firmas_articulos
            ),
            /*
             * Los catálogos ya presentes en el navegador (Google Sheets,
             * palabras y keywords) se agregan del lado cliente. Aquí sólo viajan
             * los catálogos obtenidos realmente del servidor para este paquete.
             */
            'catalogos' => array_merge(
                $catalogos_palabras,
                $catalogos_ligeros,
                array('institucion_diccionario' => $institucion_diccionario)
            ),
            'articulos' => $por_sistema
        );

        $json_flags = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES;
        $portatil_stage = 'serializando_articulos';

        $articulos_json_firma = json_encode($por_sistema, $json_flags);

        if($articulos_json_firma === false){
            return $this->portatil_error(
                'No fue posible serializar los artículos del paquete portátil.',
                500
            );
        }

        $hash_original = hash('sha256', $articulos_json_firma);

        /*
         * IMPORTANTE:
         * esta cadena puede ocupar varios MB y ya cumplió su propósito.
         * No debe seguir viva durante json_encode($respuesta).
         */
        unset($articulos_json_firma);

        $firma = $this->portatil_firma(
            $package_id,
            $usuario,
            $fecha,
            $hash_original
        );
        
        $manifest = array(
            'schema_version' => 1,
            'package_id' => $package_id,
            'usuario' => $usuario,
            'exported_at' => $fecha,
            'total_articulos' => count($permitidos),
            'excluye_finalizados' => true,
            'original_hash' => $hash_original,
            'signature' => $firma
        );

        /* La firma también queda disponible para el index.html y el ZIP de retorno. */
        $paquete['metadata']['original_hash'] = $hash_original;
        $paquete['metadata']['signature'] = $firma;
        $portatil_stage = 'leyendo_index_portatil';

        $index_path = APPPATH.'views/portatil/index.html';
        if(!file_exists($index_path)){
            return $this->portatil_error('No existe application/views/portatil/index.html.', 500);
        }

        /*
         * Fase 1.9:
         * Ya no construimos el ZIP en PHP. En algunos XAMPP/PHP 7.4 de Windows,
         * el ZIP construido manualmente puede descargarse pero Windows Explorer
         * mostrarlo vacío. El servidor entrega los datos y el navegador genera
         * el ZIP final con método STORE, sin ZipArchive ni php_zip.dll.
         */
        $index_html = @file_get_contents($index_path);
        if($index_html === false){
            return $this->portatil_error('No se pudo leer application/views/portatil/index.html.', 500);
        }

        $nombre = 'biblat_portatil_'.preg_replace('/[^A-Za-z0-9_-]/', '_', $usuario).'_'.date('Ymd_His').'.zip';
        $leeme =
            "BIBLAT CENTRAL PORTATIL\r\n\r\n".
            "1. Descomprima todo el contenido del ZIP.\r\n".
            "2. Abra index.html en Chrome, Edge o Firefox.\r\n".
            "3. Los enlaces a PDF/HTML requieren Internet, pero los PDF no están incluidos.\r\n".
            "4. El trabajo se guarda localmente en el navegador.\r\n".
            "5. Use 'Generar ZIP para importar' cuando termine.\r\n\r\n".
            "Esta versión no incluye Agregar artículo ni Erratas.\r\n".
            "Los análisis ya finalizados no se exportan.\r\n";

        $respuesta = array(
            'resp' => 'success',
            'export_version' => '1.10',
            'filename' => $nombre,
            'entries' => 4,
            'index_html' => $index_html,
            'paquete' => $paquete,
            'manifest' => $manifest,
            'leeme' => $leeme
        );

        $portatil_stage = 'serializando_respuesta';

        /*
         * A partir de aquí ya no construimos $respuesta ni $salida.
         * Se genera el mismo JSON directamente hacia la salida.
         */
        while(ob_get_level() > 0){
            @ob_end_clean();
        }

        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store, no-cache, must-revalidate');
        header('Pragma: no-cache');

        echo '{';

        echo '"resp":"success"';

        echo ',"export_version":"1.10"';

        echo ',"filename":';
        echo json_encode($nombre, $json_flags);

        echo ',"entries":4';

        echo ',"index_html":';
        echo json_encode($index_html, $json_flags);

        echo ',"paquete":{';

        echo '"metadata":';
        echo json_encode($paquete['metadata'], $json_flags);

        echo ',"catalogos":';
        echo json_encode($paquete['catalogos'], $json_flags);

        echo ',"articulos":{';

        $primero = true;

        foreach($por_sistema as $sistema => $articulo){

            if(!$primero){
                echo ',';
            }

            $primero = false;

            echo json_encode((string)$sistema, $json_flags);
            echo ':';
            echo json_encode($articulo, $json_flags);
        }

        echo '}'; // articulos

        echo '}'; // paquete

        echo ',"manifest":';
        echo json_encode($manifest, $json_flags);

        echo ',"leeme":';
        echo json_encode($leeme, $json_flags);

        echo '}';

        $portatil_finalizado = true;
        exit;
    }

    private function portatil_articulos($db, $sistemas, $usuario){
        $db->select('sistema, revista, "paisRevista", "anioRevista", "descripcionBibliografica", issn, articulo, url, estatus, "estatusPC", "fechaAsignado", "fechaAsignadoPC", asignado, "asignadoPC"', false);
        $db->from('article');
        $db->where_in('sistema', $sistemas);
        $rows = $db->get()->result_array();
        $out = array();
        foreach($rows as $row){
            $desc = $this->portatil_json_decode($row['descripcionBibliografica']);
            $urls = $this->portatil_json_decode($row['url']);
            $url1 = isset($urls[0]['u']) ? $urls[0]['u'] : null;
            $url2 = isset($urls[1]['u']) ? $urls[1]['u'] : null;
            $numero = (isset($row['anioRevista']) ? $row['anioRevista'] : '')
                    .(isset($desc['a']) ? $desc['a'] : '')
                    .(isset($desc['b']) ? $desc['b'] : '')
                    .(isset($desc['d']) && $desc['d'] !== '' ? ' - '.$desc['d'] : '');
            $row['numero'] = $numero;
            $row['url1'] = $url1;
            $row['url2'] = $url2;
            if(isset($row['asignadoPC']) && $row['asignadoPC'] !== $usuario){
                $row['estatusPC'] = null;
                $row['fechaAsignadoPC'] = null;
            }
            $out[$row['sistema']] = $row;
        }
        return $out;
    }

    private function portatil_documentos($db, $sistemas){
        $db->select('sistema, articulo, doi, idioma, estatus, "estatusPC", documento, "articuloIdiomas", resumen, disciplinas, subdisciplinas, "palabraClave", keyword, url, "notaGeneral", "sistemaErrata", "fechaAsignado"', false);
        $db->from('article');
        $db->where_in('sistema', $sistemas);
        $rows = $db->get()->result_array();
        $out = array();
        foreach($rows as $row){
            $doc = $this->portatil_json_decode($row['documento']);
            $titulos = $this->portatil_json_decode($row['articuloIdiomas']);
            $resumen = $this->portatil_json_decode($row['resumen']);
            $disciplinas = $this->portatil_json_decode($row['disciplinas']);
            $subdisciplinas = $this->portatil_json_decode($row['subdisciplinas']);
            $urls = $this->portatil_json_decode($row['url']);

            $row['tipo_documento'] = isset($doc['a']) ? $doc['a'] : null;
            $row['titulo2'] = isset($titulos[0]['a']) ? $titulos[0]['a'] : null;
            $row['idioma2'] = isset($titulos[0]['y']) ? $this->portatil_nombre_idioma($titulos[0]['y']) : null;
            $row['titulo3'] = isset($titulos[1]['a']) ? $titulos[1]['a'] : null;
            $row['idioma3'] = isset($titulos[1]['y']) ? $this->portatil_nombre_idioma($titulos[1]['y']) : null;
            $row['Resumen español'] = isset($resumen['a']) ? $resumen['a'] : null;
            $row['Resumen inglés'] = isset($resumen['i']) ? $resumen['i'] : null;
            $row['Resumen portugués'] = isset($resumen['p']) ? $resumen['p'] : null;
            $row['Resumen otro'] = isset($resumen['o']) ? $resumen['o'] : null;
            for($i=0; $i<3; $i++){
                $row['disciplina'.($i+1)] = isset($disciplinas[$i]) ? $disciplinas[$i] : null;
                $row['subdisciplina'.($i+1)] = isset($subdisciplinas[$i]) ? $subdisciplinas[$i] : null;
            }
            for($i=0; $i<2; $i++){
                $row['url'.($i+1)] = isset($urls[$i]['u']) ? $urls[$i]['u'] : null;
                if(isset($urls[$i]['y'])){
                    $row['tipourl'.($i+1)] = stripos($urls[$i]['y'], 'PDF') !== false ? 'pdf' : 'html';
                }else{
                    $row['tipourl'.($i+1)] = null;
                }
            }
            $out[$row['sistema']] = $row;
        }
        return $out;
    }

    private function portatil_autores($db, $sistemas){
        $db->select('sistema, id, nombre, orcid, "institucionId", email', false);
        $db->from('author');
        $db->where_in('sistema', $sistemas);
        $db->order_by('sistema, id');
        $rows = $db->get()->result_array();
        $out = array();
        foreach($rows as $row){
            if(!isset($out[$row['sistema']])) $out[$row['sistema']] = array();
            $out[$row['sistema']][] = $row;
        }
        return $out;
    }

    private function portatil_instituciones($db, $sistemas){
        $out = array();

        $db->select('sistema, id, institucion, dependencia, ciudad, pais', false);
        $db->from('institution');
        $db->where_in('sistema', $sistemas);
        $db->order_by('sistema, id');
        foreach($db->get()->result_array() as $row){
            $row['corporativo'] = 0;
            if(!isset($out[$row['sistema']])) $out[$row['sistema']] = array();
            $out[$row['sistema']][] = $row;
        }

        $db->select('sistema, id, institucion, dependencia, pais', false);
        $db->from('author_coorp');
        $db->where_in('sistema', $sistemas);
        $db->order_by('sistema, id');
        foreach($db->get()->result_array() as $row){
            $row['ciudad'] = '';
            $row['corporativo'] = 1;
            if(!isset($out[$row['sistema']])) $out[$row['sistema']] = array();
            $out[$row['sistema']][] = $row;
        }

        return $out;
    }

    private function portatil_genera_pc($db_main, $sistemas){
        $out = array();
        $db_main->from('claper_kw_fdw.genera_pc');
        $db_main->where_in('sistema', $sistemas);
        $q = $db_main->get();
        if(!$q) return $out;
        foreach($q->result_array() as $row){
            $out[$row['sistema']] = $row;
        }
        return $out;
    }

    private function portatil_slug_simple($texto){
        $texto = trim((string)$texto);
        if($texto === '') return '';
        $ascii = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $texto);
        if($ascii !== false) $texto = $ascii;
        $texto = strtolower($texto);
        $texto = preg_replace('/[^a-z0-9]+/', '-', $texto);
        return trim($texto, '-');
    }

    private function portatil_mapa_paises($catalogo_paises, $catalogo_pais_slugs){
        $map = array();
        $max_words = 1;
        foreach($catalogo_paises as $i => $pais){
            $pais = trim((string)$pais);
            if($pais === '') continue;
            $slug = '';
            if(isset($catalogo_pais_slugs[$i])){
                $slug = trim((string)$catalogo_pais_slugs[$i]);
            }
            if($slug === '') $slug = $this->portatil_slug_simple($pais);
            if($slug === '') continue;
            if(!isset($map[$slug])) $map[$slug] = $pais;
            $n = count(array_filter(explode('-', $slug), 'strlen'));
            if($n > $max_words) $max_words = $n;
        }
        return array($map, $max_words);
    }

    private function portatil_detecta_pais_texto($texto, $pais_por_slug, $max_words){
        $slug = $this->portatil_slug_simple($texto);
        if($slug === '') return '';
        $palabras = array_values(array_filter(explode('-', $slug), 'strlen'));
        $n = count($palabras);
        for($i=0; $i<$n; $i++){
            $limite = min($n, $i + max(1, (int)$max_words));
            for($fin=$i+1; $fin<=$limite; $fin++){
                $candidato = implode('-', array_slice($palabras, $i, $fin-$i));
                if(isset($pais_por_slug[$candidato])) return $pais_por_slug[$candidato];
            }
        }
        return '';
    }

    private function portatil_normaliza_paises_instituciones($instituciones_por_sistema, $catalogo_paises, $catalogo_pais_slugs){
        list($pais_por_slug, $max_words) = $this->portatil_mapa_paises($catalogo_paises, $catalogo_pais_slugs);
        if(count($pais_por_slug) === 0) return $instituciones_por_sistema;

        foreach($instituciones_por_sistema as $sistema => $lista){
            foreach($lista as $i => $row){
                $pais = isset($row['pais']) ? trim((string)$row['pais']) : '';
                if($pais !== ''){
                    $slug = $this->portatil_slug_simple($pais);
                    if(isset($pais_por_slug[$slug])){
                        $instituciones_por_sistema[$sistema][$i]['pais'] = $pais_por_slug[$slug];
                    }
                    continue;
                }

                $institucion = isset($row['institucion']) ? (string)$row['institucion'] : '';
                if($institucion !== ''){
                    $detectado = $this->portatil_detecta_pais_texto($institucion, $pais_por_slug, $max_words);
                    if($detectado !== ''){
                        $instituciones_por_sistema[$sistema][$i]['pais'] = $detectado;
                    }
                }
            }
        }
        return $instituciones_por_sistema;
    }

    private function portatil_catalogos_instituciones($db, $instituciones_por_sistema, $articulos_por_sistema=array(), $catalogo_paises=array(), $catalogo_pais_slugs=array()){
        list($pais_por_slug, $max_words) = $this->portatil_mapa_paises($catalogo_paises, $catalogo_pais_slugs);

        /* Países realmente presentes en las instituciones del paquete. */
        $paises = array();
        $slugs_presentes = array();
        foreach($instituciones_por_sistema as $lista){
            foreach($lista as $row){
                $pais = isset($row['pais']) ? trim((string)$row['pais']) : '';
                if($pais === '' && !empty($row['institucion'])){
                    $pais = $this->portatil_detecta_pais_texto($row['institucion'], $pais_por_slug, $max_words);
                }
                if($pais === '') continue;

                $slug = $this->portatil_slug_simple($pais);
                if($slug === '') continue;
                $canonico = isset($pais_por_slug[$slug]) ? $pais_por_slug[$slug] : $pais;
                $paises[$canonico] = true;
                $slugs_presentes[$slug] = $canonico;
            }
        }

        /*
         * Respaldo adicional: siempre incluimos también el país de la revista
         * de los artículos exportados. En muchos registros antiguos las
         * instituciones/autores no traen país, pero article.paisRevista sí.
         * Esto NO sustituye los países institucionales: los suma.
         */
        foreach($articulos_por_sistema as $sistema => $articulo){
            $pais_revista = isset($articulo['paisRevista']) ? trim((string)$articulo['paisRevista']) : '';
            if($pais_revista === '') continue;

            $slug = $this->portatil_slug_simple($pais_revista);
            if($slug === '') continue;

            $canonico = isset($pais_por_slug[$slug]) ? $pais_por_slug[$slug] : $pais_revista;
            $paises[$canonico] = true;
            $slugs_presentes[$slug] = $canonico;
        }

        $ciudades_pais = array();
        $instituciones_pais = array('0' => array(), '1' => array());
        $dependencias = array('0' => array(), '1' => array());
        $ciudades_institucion = array();

        if(count($slugs_presentes) > 0){
            $slugs = array_keys($slugs_presentes);
            $in = array();
            foreach($slugs as $slug) $in[] = $db->escape($slug);
            $in_sql = implode(',', $in);

            /*
             * IMPORTANTE: usamos las columnas slug que ya usa Datos.php en la
             * aplicación normal. Esto evita depender de que el texto de pais
             * coincida exactamente en mayúsculas, acentos o variantes.
             */
            $q = $db->query(
                'select "paisInstitucionSlug" pais_slug, ciudad, count(1) num '.
                'from institution '.
                'where "paisInstitucionSlug" in ('.$in_sql.') '.
                'and ciudad is not null and btrim(ciudad) <> \'\' '.
                'group by "paisInstitucionSlug", ciudad order by 1,2'
            );
            if($q){
                foreach($q->result_array() as $row){
                    $slug = trim((string)$row['pais_slug']);
                    $pais = isset($slugs_presentes[$slug]) ? $slugs_presentes[$slug] : (isset($pais_por_slug[$slug]) ? $pais_por_slug[$slug] : $slug);
                    if(!isset($ciudades_pais[$pais])) $ciudades_pais[$pais] = array();
                    $ciudades_pais[$pais][] = array('id'=>$row['ciudad'], 'text'=>$row['ciudad'], 'num'=>(int)$row['num']);
                }
            }

            $q = $db->query(
                'select "paisInstitucionSlug" pais_slug, institucion, count(1) num '.
                'from institution '.
                'where "paisInstitucionSlug" in ('.$in_sql.') '.
                'and institucion is not null and btrim(institucion) <> \'\' '.
                'group by "paisInstitucionSlug", institucion order by 1,2'
            );
            if($q){
                foreach($q->result_array() as $row){
                    $slug = trim((string)$row['pais_slug']);
                    $pais = isset($slugs_presentes[$slug]) ? $slugs_presentes[$slug] : (isset($pais_por_slug[$slug]) ? $pais_por_slug[$slug] : $slug);
                    if(!isset($instituciones_pais['0'][$pais])) $instituciones_pais['0'][$pais] = array();
                    $instituciones_pais['0'][$pais][] = array('id'=>$row['institucion'], 'text'=>$row['institucion'], 'num'=>(int)$row['num']);
                }
            }

            $q = $db->query(
                'select "paisSlug" pais_slug, institucion, count(1) num '.
                'from author_coorp '.
                'where "paisSlug" in ('.$in_sql.') '.
                'and institucion is not null and btrim(institucion) <> \'\' '.
                'group by "paisSlug", institucion order by 1,2'
            );
            if($q){
                foreach($q->result_array() as $row){
                    $slug = trim((string)$row['pais_slug']);
                    $pais = isset($slugs_presentes[$slug]) ? $slugs_presentes[$slug] : (isset($pais_por_slug[$slug]) ? $pais_por_slug[$slug] : $slug);
                    if(!isset($instituciones_pais['1'][$pais])) $instituciones_pais['1'][$pais] = array();
                    $instituciones_pais['1'][$pais][] = array('id'=>$row['institucion'], 'text'=>$row['institucion'], 'num'=>(int)$row['num']);
                }
            }

            /*
             * Dependencias de TODAS las instituciones pertenecientes a los
             * países presentes. Así el usuario puede cambiar de institución
             * dentro de uno de esos países y seguir teniendo su catálogo local.
             */
            $q = $db->query(
                'select institucion, dependencia, count(1) num '.
                'from institution '.
                'where "paisInstitucionSlug" in ('.$in_sql.') '.
                'and institucion is not null and btrim(institucion) <> \'\' '.
                'and dependencia is not null and btrim(dependencia) <> \'\' '.
                'group by institucion, dependencia order by 1,2'
            );
            if($q){
                foreach($q->result_array() as $row){
                    if(!isset($dependencias['0'][$row['institucion']])) $dependencias['0'][$row['institucion']] = array();
                    $dependencias['0'][$row['institucion']][] = array('id'=>$row['dependencia'], 'text'=>$row['dependencia'], 'num'=>(int)$row['num']);
                }
            }

            $q = $db->query(
                'select institucion, ciudad, count(1) num '.
                'from institution '.
                'where "paisInstitucionSlug" in ('.$in_sql.') '.
                'and institucion is not null and btrim(institucion) <> \'\' '.
                'and ciudad is not null and btrim(ciudad) <> \'\' '.
                'group by institucion, ciudad order by 1,2'
            );
            if($q){
                foreach($q->result_array() as $row){
                    if(!isset($ciudades_institucion[$row['institucion']])) $ciudades_institucion[$row['institucion']] = array();
                    $ciudades_institucion[$row['institucion']][] = array('id'=>$row['ciudad'], 'text'=>$row['ciudad'], 'num'=>(int)$row['num']);
                }
            }

            $q = $db->query(
                'select institucion, dependencia, count(1) num '.
                'from author_coorp '.
                'where "paisSlug" in ('.$in_sql.') '.
                'and institucion is not null and btrim(institucion) <> \'\' '.
                'and dependencia is not null and btrim(dependencia) <> \'\' '.
                'group by institucion, dependencia order by 1,2'
            );
            if($q){
                foreach($q->result_array() as $row){
                    if(!isset($dependencias['1'][$row['institucion']])) $dependencias['1'][$row['institucion']] = array();
                    $dependencias['1'][$row['institucion']][] = array('id'=>$row['dependencia'], 'text'=>$row['dependencia'], 'num'=>(int)$row['num']);
                }
            }
        }

        /* Resumen visible en paquete.js para poder comprobar rápidamente qué viajó. */
        $resumen = array(
            'paises' => array_keys($paises),
            'total_paises' => count($paises),
            'total_ciudades' => 0,
            'total_instituciones' => 0,
            'total_dependencias' => 0
        );
        foreach($ciudades_pais as $v) $resumen['total_ciudades'] += count($v);
        foreach($instituciones_pais['0'] as $v) $resumen['total_instituciones'] += count($v);
        foreach($instituciones_pais['1'] as $v) $resumen['total_instituciones'] += count($v);
        foreach($dependencias['0'] as $v) $resumen['total_dependencias'] += count($v);
        foreach($dependencias['1'] as $v) $resumen['total_dependencias'] += count($v);

        return array(
            'paises_exportados' => array_keys($paises),
            'ciudades_por_pais' => $ciudades_pais,
            'instituciones_por_pais' => $instituciones_pais,
            'dependencias_por_institucion' => $dependencias,
            'ciudades_por_institucion' => $ciudades_institucion,
            'catalogos_institucionales_resumen' => $resumen
        );
    }

    private function portatil_json_decode($valor){
        if(is_array($valor)) return $valor;
        if($valor === null || $valor === '') return array();
        $tmp = json_decode($valor, true);
        return is_array($tmp) ? $tmp : array();
    }

    private function portatil_nombre_idioma($codigo){
        $codigo = strtolower((string)$codigo);
        $map = array(
            'spa'=>'Español', 'esp'=>'Español', 'eng'=>'Inglés', 'por'=>'Portugués',
            'fre'=>'Francés', 'fra'=>'Francés', 'ita'=>'Italiano', 'ger'=>'Alemán',
            'deu'=>'Alemán', 'rus'=>'Ruso'
        );
        return isset($map[$codigo]) ? $map[$codigo] : 'Otro';
    }

    private function portatil_uuid(){
        try{
            return bin2hex(random_bytes(16));
        }catch(Exception $e){
            return sha1(uniqid('', true).mt_rand());
        }
    }

    private function portatil_hash_array($value){
        $canon = $this->portatil_canonicalize($value);
        return hash('sha256', json_encode($canon, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    }

    private function portatil_canonicalize($value){
        if(!is_array($value)) return $value;
        $keys = array_keys($value);
        $is_list = ($keys === range(0, count($value) - 1));
        if($is_list){
            $out = array();
            foreach($value as $v) $out[] = $this->portatil_canonicalize($v);
            return $out;
        }
        ksort($value, SORT_STRING);
        foreach($value as $k => $v) $value[$k] = $this->portatil_canonicalize($v);
        return $value;
    }

    private function portatil_firma_articulo($package_id, $usuario, $sistema, $hash_articulo){
        $key = (string)$this->config->item('encryption_key');
        if($key === '') $key = hash('sha256', __FILE__.FCPATH);
        return hash_hmac('sha256', $package_id.'|'.$usuario.'|'.$sistema.'|'.$hash_articulo, $key);
    }

    private function portatil_firma($package_id, $usuario, $fecha, $hash_original){
        $key = (string)$this->config->item('encryption_key');
        if($key === ''){
            $key = hash('sha256', __FILE__.FCPATH);
        }
        return hash_hmac('sha256', $package_id.'|'.$usuario.'|'.$fecha.'|'.$hash_original, $key);
    }

    private function portatil_error($mensaje, $status){
        $this->output->set_status_header($status);
        $this->output->set_content_type('application/json', 'utf-8');
        $this->output->set_output(json_encode(array('resp'=>'error', 'mensaje'=>$mensaje), JSON_UNESCAPED_UNICODE));
        return;
    }
    
    /* ============================================================================
     * BIBLAT CENTRAL PORTÁTIL - IMPORTACIÓN v1.10
     *
     * ============================================================================ */

    public function portatil_importar_v110(){
        $this->output->enable_profiler(false);
        @set_time_limit(300);

        $usuario = (string)$this->session->userdata('usu_base');
        if($usuario === ''){
            return $this->portatil_importar_respuesta(array(
                'resp' => 'error',
                'mensaje' => 'La sesión expiró. Inicie sesión nuevamente.'
            ), 401);
        }

        $modo = isset($_POST['modo']) ? strtolower(trim((string)$_POST['modo'])) : 'validar';
        if(!in_array($modo, array('validar', 'aplicar'), true)){
            return $this->portatil_importar_respuesta(array(
                'resp' => 'error',
                'mensaje' => 'Modo de importación no válido.'
            ), 400);
        }

        if(!isset($_FILES['archivo']) || !is_array($_FILES['archivo'])){
            return $this->portatil_importar_respuesta(array(
                'resp' => 'error',
                'mensaje' => 'Seleccione el ZIP generado por Biblat Central portátil.'
            ), 400);
        }

        $archivo = $_FILES['archivo'];
        if(!isset($archivo['error']) || (int)$archivo['error'] !== UPLOAD_ERR_OK){
            return $this->portatil_importar_respuesta(array(
                'resp' => 'error',
                'mensaje' => 'No fue posible recibir el archivo ZIP. Código de carga: '.(isset($archivo['error']) ? (int)$archivo['error'] : -1).'.'
            ), 400);
        }

        $max_zip = 25 * 1024 * 1024; // El ZIP de retorno sólo contiene JSON.
        $tam = isset($archivo['size']) ? (int)$archivo['size'] : 0;
        if($tam <= 0 || $tam > $max_zip){
            return $this->portatil_importar_respuesta(array(
                'resp' => 'error',
                'mensaje' => 'El ZIP de retorno está vacío o supera 25 MB.'
            ), 413);
        }

        $nombre = isset($archivo['name']) ? (string)$archivo['name'] : '';
        if(strtolower(pathinfo($nombre, PATHINFO_EXTENSION)) !== 'zip'){
            return $this->portatil_importar_respuesta(array(
                'resp' => 'error',
                'mensaje' => 'El archivo seleccionado no tiene extensión .zip.'
            ), 400);
        }

        try{
            $files = $this->portatil_importar_leer_zip_store($archivo['tmp_name']);
        }catch(Exception $e){
            return $this->portatil_importar_respuesta(array(
                'resp' => 'error',
                'mensaje' => $e->getMessage()
            ), 400);
        }

        if(!isset($files['manifest.json']) || !isset($files['trabajo.json'])){
            return $this->portatil_importar_respuesta(array(
                'resp' => 'error',
                'mensaje' => 'El ZIP no es un retorno válido de Biblat Central portátil: faltan manifest.json o trabajo.json.'
            ), 400);
        }

        $manifest = json_decode($files['manifest.json'], true);
        $trabajo = json_decode($files['trabajo.json'], true);
        if(!is_array($manifest) || !is_array($trabajo)){
            return $this->portatil_importar_respuesta(array(
                'resp' => 'error',
                'mensaje' => 'manifest.json o trabajo.json no contienen JSON válido.'
            ), 400);
        }

        $schema_manifest = isset($manifest['schema_version']) ? (int)$manifest['schema_version'] : 0;
        $schema_trabajo = isset($trabajo['schema_version']) ? (int)$trabajo['schema_version'] : 0;
        if($schema_manifest !== 1 || $schema_trabajo !== 1){
            return $this->portatil_importar_respuesta(array(
                'resp' => 'error',
                'mensaje' => 'Versión de esquema portátil no compatible.'
            ), 400);
        }

        $package_id = isset($manifest['package_id']) ? trim((string)$manifest['package_id']) : '';
        $usuario_paquete = isset($manifest['usuario']) ? trim((string)$manifest['usuario']) : '';
        $exported_at = isset($manifest['exported_at']) ? trim((string)$manifest['exported_at']) : '';
        $original_hash = isset($manifest['original_hash']) ? strtolower(trim((string)$manifest['original_hash'])) : '';
        $signature = isset($manifest['signature']) ? strtolower(trim((string)$manifest['signature'])) : '';

        if($package_id === '' || $usuario_paquete === '' || $exported_at === '' ||
           !preg_match('/^[a-f0-9]{64}$/', $original_hash) || !preg_match('/^[a-f0-9]{64}$/', $signature)){
            return $this->portatil_importar_respuesta(array(
                'resp' => 'error',
                'mensaje' => 'El manifiesto del paquete está incompleto o dañado.'
            ), 400);
        }

        if($usuario_paquete !== $usuario){
            return $this->portatil_importar_respuesta(array(
                'resp' => 'error',
                'mensaje' => 'Este paquete pertenece al usuario "'.$usuario_paquete.'" y la sesión actual corresponde a "'.$usuario.'".'
            ), 403);
        }

        if((string)(isset($trabajo['package_id']) ? $trabajo['package_id'] : '') !== $package_id ||
           (string)(isset($trabajo['usuario']) ? $trabajo['usuario'] : '') !== $usuario_paquete ||
           strtolower((string)(isset($trabajo['original_hash']) ? $trabajo['original_hash'] : '')) !== $original_hash ||
           strtolower((string)(isset($trabajo['signature']) ? $trabajo['signature'] : '')) !== $signature){
            return $this->portatil_importar_respuesta(array(
                'resp' => 'error',
                'mensaje' => 'trabajo.json no corresponde al manifest.json del mismo paquete.'
            ), 400);
        }

        $firma_esperada = $this->portatil_firma($package_id, $usuario_paquete, $exported_at, $original_hash);
        if(!hash_equals(strtolower($firma_esperada), $signature)){
            return $this->portatil_importar_respuesta(array(
                'resp' => 'error',
                'mensaje' => 'La firma del paquete no es válida. No se importó ningún registro.'
            ), 403);
        }

        $cambios = isset($trabajo['changes']) && is_array($trabajo['changes']) ? $trabajo['changes'] : array();
        if(count($cambios) > 5000){
            return $this->portatil_importar_respuesta(array(
                'resp' => 'error',
                'mensaje' => 'El paquete contiene demasiados registros para una sola importación.'
            ), 413);
        }

        $db = $this->load->database('prueba', TRUE);
        $rol_paquete = isset($trabajo['rol']) ? (string)$trabajo['rol'] : (isset($manifest['rol']) ? (string)$manifest['rol'] : '');

        $resultado = array(
            'resp' => 'success',
            'import_version' => '1.12',
            'modo' => $modo,
            'package_id' => $package_id,
            'total' => count($cambios),
            'aplicables' => 0,
            'importados' => 0,
            'bitacora_aplicable' => 0,
            'bitacora_importada' => 0,
            'conflictos' => 0,
            'errores' => 0,
            'omitidos' => 0,
            'detalle' => array()
        );

        foreach($cambios as $sistema_key => $entrada){
            $sistema = trim((string)$sistema_key);
            if($sistema === '' || strlen($sistema) > 64 || !preg_match('/^[A-Za-z0-9._:-]+$/', $sistema)){
                $resultado['errores']++;
                $resultado['detalle'][] = array('sistema'=>$sistema, 'estado'=>'error', 'mensaje'=>'Identificador de sistema no válido.');
                continue;
            }

            $evaluacion = $this->portatil_importar_evaluar($db, $usuario, $package_id, $exported_at, $sistema, $entrada);
            if($evaluacion['estado'] !== 'aplicable'){
                if($evaluacion['estado'] === 'conflicto') $resultado['conflictos']++;
                elseif($evaluacion['estado'] === 'omitido') $resultado['omitidos']++;
                else $resultado['errores']++;
                $resultado['detalle'][] = array(
                    'sistema' => $sistema,
                    'estado' => $evaluacion['estado'],
                    'mensaje' => $evaluacion['mensaje']
                );
                continue;
            }

            $resultado['aplicables']++;
            // A los movimientos realizados en portátil se suma un marcador de procedencia
            // que se genera en el servidor al aplicar la importación.
            $resultado['bitacora_aplicable'] += (isset($evaluacion['bitacora_count']) ? (int)$evaluacion['bitacora_count'] : 0) + 1;
            if($modo === 'validar'){
                $resultado['detalle'][] = array('sistema'=>$sistema, 'estado'=>'aplicable', 'mensaje'=>'Listo para importar.');
                continue;
            }

            // Repetimos la validación justo antes de escribir para reducir el riesgo
            // de sobrescribir un cambio ocurrido entre la vista previa y la importación.
            $evaluacion = $this->portatil_importar_evaluar($db, $usuario, $package_id, $exported_at, $sistema, $entrada);
            if($evaluacion['estado'] !== 'aplicable'){
                if($evaluacion['estado'] === 'conflicto') $resultado['conflictos']++;
                elseif($evaluacion['estado'] === 'omitido') $resultado['omitidos']++;
                else $resultado['errores']++;
                $resultado['detalle'][] = array(
                    'sistema' => $sistema,
                    'estado' => $evaluacion['estado'],
                    'mensaje' => $evaluacion['mensaje']
                );
                continue;
            }

            $db->trans_begin();
            try{
                $aplicado = $this->portatil_importar_aplicar($db, $usuario, $rol_paquete, $sistema, $entrada, $evaluacion);
                if($db->trans_status() === FALSE){
                    throw new Exception('PostgreSQL reportó un error al aplicar los cambios.');
                }
                $db->trans_commit();
                $resultado['importados']++;
                $resultado['bitacora_importada'] += isset($aplicado['bitacora']) ? (int)$aplicado['bitacora'] : 0;
                $resultado['detalle'][] = array('sistema'=>$sistema, 'estado'=>'importado', 'mensaje'=>'Importado correctamente.');
            }catch(Exception $e){
                $db->trans_rollback();
                $resultado['errores']++;
                $resultado['detalle'][] = array('sistema'=>$sistema, 'estado'=>'error', 'mensaje'=>$e->getMessage());
            }
        }

        return $this->portatil_importar_respuesta($resultado, 200);
    }

    private function portatil_importar_evaluar($db, $usuario, $package_id, $exported_at, $sistema, $entrada){
        if(!is_array($entrada)){
            return array('estado'=>'error', 'mensaje'=>'La entrada del artículo no es válida.');
        }

        $original = isset($entrada['original']) && is_array($entrada['original']) ? $entrada['original'] : null;
        $hash_original = isset($entrada['original_hash']) ? strtolower(trim((string)$entrada['original_hash'])) : '';
        $firma_original = isset($entrada['original_signature']) ? strtolower(trim((string)$entrada['original_signature'])) : '';
        $cambio = isset($entrada['cambio']) && is_array($entrada['cambio']) ? $entrada['cambio'] : array();

        if(!$original || !preg_match('/^[a-f0-9]{64}$/', $hash_original) || !preg_match('/^[a-f0-9]{64}$/', $firma_original)){
            return array('estado'=>'error', 'mensaje'=>'Faltan el original o la firma del artículo.');
        }

        $hash_calculado = $this->portatil_hash_array($original);
        if(!hash_equals($hash_calculado, $hash_original)){
            return array('estado'=>'error', 'mensaje'=>'El estado original del artículo fue modificado dentro del ZIP.');
        }

        $firma_calculada = $this->portatil_firma_articulo($package_id, $usuario, $sistema, $hash_original);
        if(!hash_equals(strtolower($firma_calculada), $firma_original)){
            return array('estado'=>'error', 'mensaje'=>'La firma original del artículo no es válida.');
        }

        if(!$cambio){
            return array('estado'=>'omitido', 'mensaje'=>'El registro no contiene cambios.');
        }

        $permitidos = array('documento'=>true, 'instituciones'=>true, 'autores'=>true, 'corporativo'=>true, 'finalizacion'=>true, 'bitacora'=>true);
        foreach($cambio as $k => $v){
            if(!isset($permitidos[$k])){
                return array('estado'=>'error', 'mensaje'=>'El ZIP contiene una sección de cambio no permitida: '.$k.'.');
            }
        }

        $finalizacion = isset($cambio['finalizacion']) && $cambio['finalizacion'] !== null ? strtoupper(trim((string)$cambio['finalizacion'])) : null;
        if(count($cambio) === 1 && array_key_exists('finalizacion', $cambio) && $finalizacion === null){
            return array('estado'=>'omitido', 'mensaje'=>'La finalización pendiente fue cancelada y no quedaron otros cambios.');
        }
        if(isset($cambio['corporativo']) && !isset($cambio['instituciones'])){
            return array('estado'=>'error', 'mensaje'=>'El indicador corporativo sólo puede cambiar junto con la sección Instituciones.');
        }
        if($finalizacion !== null && !in_array($finalizacion, array('B','C','CPC'), true)){
            return array('estado'=>'error', 'mensaje'=>'Estado de finalización no válido.');
        }

        $orig_listado = isset($original['listado']) && is_array($original['listado']) ? $original['listado'] : array();
        $orig_doc = isset($original['documento']) && is_array($original['documento']) ? $original['documento'] : array();
        $orig_pc = isset($orig_listado['estatusPC']) ? $orig_listado['estatusPC'] : (isset($orig_doc['estatusPC']) ? $orig_doc['estatusPC'] : null);
        $revision_pc = in_array((string)$orig_pc, array('A','R'), true);

        if($revision_pc && (isset($cambio['instituciones']) || isset($cambio['autores']) || isset($cambio['corporativo']))){
            return array('estado'=>'error', 'mensaje'=>'Una revisión de palabras clave no puede modificar instituciones ni autores.');
        }
        if($revision_pc && $finalizacion !== null && $finalizacion !== 'CPC'){
            return array('estado'=>'error', 'mensaje'=>'Una revisión de palabras clave sólo puede finalizar como CPC.');
        }
        if(!$revision_pc && $finalizacion === 'CPC'){
            return array('estado'=>'error', 'mensaje'=>'CPC sólo es válido para una revisión de palabras clave.');
        }

        $bitacora_count = 0;
        if(isset($cambio['bitacora'])){
            if(!is_array($cambio['bitacora'])){
                return array('estado'=>'error', 'mensaje'=>'La bitácora portátil no tiene un formato válido.');
            }
            $err = $this->portatil_importar_validar_bitacora($cambio['bitacora'], $exported_at);
            if($err !== '') return array('estado'=>'error', 'mensaje'=>$err);
            $bitacora_count = count($cambio['bitacora']);
        }

        $q = $db->query('SELECT sistema, asignado, "asignadoPC", estatus, "estatusPC" FROM article WHERE sistema = ? LIMIT 1', array($sistema));
        if(!$q || $q->num_rows() === 0){
            return array('estado'=>'error', 'mensaje'=>'El artículo ya no existe en Biblat Central.');
        }
        $actual_estado = $q->row_array();

        $asignado_ok = $revision_pc
            ? ((string)$actual_estado['asignadoPC'] === (string)$usuario)
            : ((string)$actual_estado['asignado'] === (string)$usuario);
        if(!$asignado_ok){
            return array('estado'=>'conflicto', 'mensaje'=>'El registro ya no está asignado a este usuario en el mismo flujo.');
        }

        $estatus_original = $revision_pc
            ? (isset($orig_listado['estatusPC']) ? $orig_listado['estatusPC'] : (isset($orig_doc['estatusPC']) ? $orig_doc['estatusPC'] : null))
            : (isset($orig_listado['estatus']) ? $orig_listado['estatus'] : (isset($orig_doc['estatus']) ? $orig_doc['estatus'] : null));
        $estatus_actual = $revision_pc ? $actual_estado['estatusPC'] : $actual_estado['estatus'];
        if($this->portatil_importar_scalar($estatus_original) !== $this->portatil_importar_scalar($estatus_actual)){
            return array('estado'=>'conflicto', 'mensaje'=>'El estatus cambió en la versión en línea después de exportar el paquete.');
        }

        if(isset($cambio['documento'])){
            if(!is_array($cambio['documento'])){
                return array('estado'=>'error', 'mensaje'=>'La sección documento no tiene un formato válido.');
            }
            $actual_doc = $this->portatil_importar_documento_actual($db, $sistema);
            if($actual_doc === null){
                return array('estado'=>'error', 'mensaje'=>'No fue posible leer el artículo actual.');
            }
            $cmp_original = $this->portatil_importar_documento_comparable($orig_doc, $revision_pc);
            $cmp_actual = $this->portatil_importar_documento_comparable($actual_doc, $revision_pc);
            if($this->portatil_importar_hash_comparable($cmp_original) !== $this->portatil_importar_hash_comparable($cmp_actual)){
                return array('estado'=>'conflicto', 'mensaje'=>'Los metadatos que se van a actualizar cambiaron en línea después de la exportación.');
            }
            $err = $this->portatil_importar_validar_documento($cambio['documento'], $revision_pc);
            if($err !== '') return array('estado'=>'error', 'mensaje'=>$err);
        }

        if(isset($cambio['instituciones'])){
            if(!is_array($cambio['instituciones'])){
                return array('estado'=>'error', 'mensaje'=>'La sección instituciones no tiene un formato válido.');
            }
            $actual_inst = $this->portatil_importar_instituciones_actuales($db, $sistema);
            $orig_inst = isset($original['instituciones']) && is_array($original['instituciones']) ? $original['instituciones'] : array();
            if($this->portatil_importar_hash_comparable($this->portatil_importar_normalizar_instituciones($actual_inst)) !==
               $this->portatil_importar_hash_comparable($this->portatil_importar_normalizar_instituciones($orig_inst))){
                return array('estado'=>'conflicto', 'mensaje'=>'Las instituciones cambiaron en línea después de la exportación.');
            }
            $corp = isset($cambio['corporativo']) ? ((int)$cambio['corporativo'] ? 1 : 0) : 0;
            $err = $this->portatil_importar_validar_instituciones($cambio['instituciones'], $corp);
            if($err !== '') return array('estado'=>'error', 'mensaje'=>$err);

            // Si sólo se guardaron instituciones, no dejamos autores apuntando a IDs eliminados.
            if(!$corp && !isset($cambio['autores'])){
                $ids = array();
                foreach($cambio['instituciones'] as $r){
                    if(is_array($r) && isset($r['id'])) $ids[(string)(int)$r['id']] = true;
                }
                $aut_actual = $this->portatil_importar_autores_actuales($db, $sistema);
                foreach($aut_actual as $a){
                    $iid = isset($a['institucionId']) ? $this->portatil_importar_scalar($a['institucionId']) : '';
                    if($iid !== '' && !isset($ids[(string)(int)$iid])){
                        return array('estado'=>'error', 'mensaje'=>'Al cambiar instituciones quedó un autor relacionado con una institución eliminada. Guarde también la sección Autores en la versión portátil.');
                    }
                }
            }
        }

        if(isset($cambio['autores'])){
            if(!is_array($cambio['autores'])){
                return array('estado'=>'error', 'mensaje'=>'La sección autores no tiene un formato válido.');
            }
            $actual_aut = $this->portatil_importar_autores_actuales($db, $sistema);
            $orig_aut = isset($original['autores']) && is_array($original['autores']) ? $original['autores'] : array();
            if($this->portatil_importar_hash_comparable($this->portatil_importar_normalizar_autores($actual_aut)) !==
               $this->portatil_importar_hash_comparable($this->portatil_importar_normalizar_autores($orig_aut))){
                return array('estado'=>'conflicto', 'mensaje'=>'Los autores cambiaron en línea después de la exportación.');
            }
            $corp = isset($cambio['corporativo']) ? ((int)$cambio['corporativo'] ? 1 : 0) : 0;
            if($corp){
                return array('estado'=>'error', 'mensaje'=>'Un autor corporativo no puede contener autores personales.');
            }
            $inst_destino = isset($cambio['instituciones']) ? $cambio['instituciones'] : $this->portatil_importar_instituciones_actuales($db, $sistema);
            $err = $this->portatil_importar_validar_autores($cambio['autores'], $inst_destino);
            if($err !== '') return array('estado'=>'error', 'mensaje'=>$err);
        }

        return array(
            'estado'=>'aplicable',
            'mensaje'=>'Listo para importar.',
            'revision_pc'=>$revision_pc,
            'finalizacion'=>$finalizacion,
            'bitacora_count'=>$bitacora_count
        );
    }

    private function portatil_importar_aplicar($db, $usuario, $rol_paquete, $sistema, $entrada, $evaluacion){
        $cambio = $entrada['cambio'];
        $revision_pc = !empty($evaluacion['revision_pc']);
        $finalizacion = isset($evaluacion['finalizacion']) ? $evaluacion['finalizacion'] : null;

        $toco = false;
        if(isset($cambio['documento'])){
            $this->portatil_importar_aplicar_documento($db, $sistema, $cambio['documento'], $revision_pc);
            $toco = true;
        }

        if(isset($cambio['instituciones'])){
            $corp = isset($cambio['corporativo']) ? ((int)$cambio['corporativo'] ? 1 : 0) : 0;
            $this->portatil_importar_aplicar_instituciones($db, $sistema, $cambio['instituciones'], $corp);
            $toco = true;
        }

        if(isset($cambio['autores'])){
            $this->portatil_importar_aplicar_autores($db, $sistema, $cambio['autores']);
            $toco = true;
        }

        // Un guardado normal deja el registro En revisión; una revisión PC deja estatusPC=R.
        if($toco){
            if($revision_pc){
                $db->where('sistema', $sistema)->update('article', array('estatusPC'=>'R'));
            }else{
                $db->where('sistema', $sistema)->update('article', array('estatus'=>'R'));
            }
        }

        if($finalizacion !== null){
            if($finalizacion === 'CPC'){
                $db->where('sistema', $sistema)->update('article', array('estatusPC'=>'C'));
            }elseif($finalizacion === 'C'){
                $db->where('sistema', $sistema)->update('article', array('estatus'=>'C'));
            }elseif($finalizacion === 'B'){
                $db->where('sistema', $sistema)->update('article', array('estatus'=>'B'));
            }
            $nombre_catalogador = (strcasecmp(trim((string)$rol_paquete), 'Editor') === 0) ? 'EDITOR' : $usuario;
            $this->portatil_importar_insertar_catalogador($db, $sistema, $nombre_catalogador);
        }

        $bitacora_insertada = 0;
        if(isset($cambio['bitacora']) && is_array($cambio['bitacora'])){
            $bitacora_insertada = $this->portatil_importar_aplicar_bitacora($db, $usuario, $sistema, $cambio['bitacora']);
        }

        /*
         * Marcador de procedencia.
         * Se crea EN EL SERVIDOR únicamente cuando el artículo se importó de forma
         * satisfactoria. tiempo=0 para que no altere las métricas de producción.
         * Se deja un marcador por evento de importación: si el artículo vuelve a
         * trabajarse en línea, los movimientos posteriores quedarán cronológicamente
         * después de "Importado portátil" y será sencillo distinguir el origen.
         */
        $bitacora_insertada += $this->portatil_importar_registrar_origen_portatil($db, $usuario, $sistema);

        return array('bitacora'=>$bitacora_insertada);
    }

    private function portatil_importar_aplicar_documento($db, $sistema, $d, $revision_pc){
        $palabras = $this->portatil_importar_lista($this->portatil_importar_get($d, 'palabraClave', array()));
        $keywords = $this->portatil_importar_lista($this->portatil_importar_get($d, 'keyword', array()));

        if($revision_pc){
            $db->where('sistema', $sistema)->update('article', array(
                'palabraClave' => json_encode($palabras, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                'keyword' => json_encode($keywords, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
            ));
            return;
        }

        $traducciones = array();
        for($i=2; $i<=3; $i++){
            $titulo = trim((string)$this->portatil_importar_get($d, 'titulo'.$i, ''));
            $idioma = trim((string)$this->portatil_importar_get($d, 'idioma'.$i, ''));
            if($titulo !== ''){
                $traducciones[] = array('a'=>$titulo, 'y'=>$this->portatil_importar_codigo_idioma($idioma));
            }
        }

        $disciplinas = array();
        $subdisciplinas = array();
        for($i=1; $i<=3; $i++){
            $v = trim((string)$this->portatil_importar_get($d, 'disciplina'.$i, ''));
            if($v !== '') $disciplinas[] = $v;
            $s = trim((string)$this->portatil_importar_get($d, 'subdisciplina'.$i, ''));
            if($s !== '') $subdisciplinas[] = $s;
        }

        $urls = array();
        for($i=1; $i<=2; $i++){
            $u = trim((string)$this->portatil_importar_get($d, 'url'.$i, ''));
            $tipo = strtolower(trim((string)$this->portatil_importar_get($d, 'tipourl'.$i, 'html')));
            if($u !== ''){
                $urls[] = array(
                    'u' => $u,
                    'y' => ($tipo === 'pdf') ? 'Texto completo (Ver PDF)' : 'Texto completo (Ver HTML)'
                );
            }
        }

        $update = array(
            'idioma' => trim((string)$this->portatil_importar_get($d, 'idioma', '')),
            'articuloIdiomas' => count($traducciones) ? json_encode($traducciones, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null,
            'documento' => json_encode(array('a'=>$this->portatil_importar_get($d, 'tipo_documento', null)), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'disciplinas' => json_encode($disciplinas, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'subdisciplinas' => json_encode($subdisciplinas, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'url' => json_encode($urls, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'palabraClave' => json_encode($palabras, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'keyword' => json_encode($keywords, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
        );

        $titulo = trim((string)$this->portatil_importar_get($d, 'articulo', ''));
        if($titulo !== ''){
            // Evita convertir un NULL original en el literal "SIN TÍTULO" al guardar otro campo.
            $q = $db->query('SELECT articulo FROM article WHERE sistema = ? LIMIT 1', array($sistema));
            $raw = ($q && $q->num_rows()) ? $q->row_array() : array();
            if(!($titulo === 'SIN TÍTULO' && (!isset($raw['articulo']) || $raw['articulo'] === null))){
                $update['articulo'] = $titulo;
            }
        }

        // IMPORTANTE: resumen e idiomaResumen no se tocan en la versión portátil.
        $db->where('sistema', $sistema)->update('article', $update);
    }

    private function portatil_importar_aplicar_instituciones($db, $sistema, $rows, $corporativo){
        $db->where('sistema', $sistema)->delete('institution');
        $db->where('sistema', $sistema)->delete('author_coorp');

        if($corporativo){
            // Este es el mismo comportamiento del flujo web: al convertir a corporativo se eliminan autores personales.
            $db->where('sistema', $sistema)->delete('author');
            foreach($rows as $i => $r){
                $row = array(
                    'sistema'=>$sistema,
                    'id'=>(int)$this->portatil_importar_get($r, 'id', $i+1),
                    'pais'=>$this->portatil_importar_null(trim((string)$this->portatil_importar_get($r, 'pais', ''))),
                    'institucion'=>$this->portatil_importar_null(trim((string)$this->portatil_importar_get($r, 'institucion', ''))),
                    'dependencia'=>$this->portatil_importar_null(trim((string)$this->portatil_importar_get($r, 'dependencia', '')))
                );
                $db->insert('author_coorp', $row);
            }
            $db->query('UPDATE author_coorp SET slug = slug(institucion), "paisSlug" = slug(pais) WHERE sistema = ?', array($sistema));
        }else{
            foreach($rows as $i => $r){
                $row = array(
                    'sistema'=>$sistema,
                    'id'=>(int)$this->portatil_importar_get($r, 'id', $i+1),
                    'pais'=>$this->portatil_importar_null(trim((string)$this->portatil_importar_get($r, 'pais', ''))),
                    'ciudad'=>$this->portatil_importar_null(trim((string)$this->portatil_importar_get($r, 'ciudad', ''))),
                    'institucion'=>$this->portatil_importar_null(trim((string)$this->portatil_importar_get($r, 'institucion', ''))),
                    'dependencia'=>$this->portatil_importar_null(trim((string)$this->portatil_importar_get($r, 'dependencia', '')))
                );
                $db->insert('institution', $row);
            }
            $db->query('UPDATE institution SET slug = slug(institucion), "paisInstitucionSlug" = slug(pais) WHERE sistema = ?', array($sistema));
        }
    }

    private function portatil_importar_aplicar_autores($db, $sistema, $rows){
        $db->where('sistema', $sistema)->delete('author');
        foreach($rows as $i => $r){
            $iid = $this->portatil_importar_get($r, 'institucionId', null);
            if($iid === '' || $iid === null) $iid = null;
            $row = array(
                'sistema'=>$sistema,
                'id'=>(int)$this->portatil_importar_get($r, 'id', $i+1),
                'nombre'=>$this->portatil_importar_null(trim((string)$this->portatil_importar_get($r, 'nombre', ''))),
                'orcid'=>$this->portatil_importar_null(trim((string)$this->portatil_importar_get($r, 'orcid', ''))),
                'institucionId'=>$iid,
                'email'=>$this->portatil_importar_null(trim((string)$this->portatil_importar_get($r, 'email', '')))
            );
            $db->insert('author', $row);
        }
        $db->query('UPDATE author SET slug = slug(nombre) WHERE sistema = ?', array($sistema));
    }

    private function portatil_importar_validar_bitacora($rows, $exported_at){
        if(count($rows) > 500) return 'La bitácora portátil contiene demasiados movimientos para un artículo.';

        $permitidos = array(
            'Guarda Artículo'=>true,
            'Completado'=>true,
            'Guarda Instituciones'=>true,
            'Guarda Autores'=>true,
            'Guarda PC'=>true,
            'Completado PC'=>true,
            'Recarga'=>true
        );

        $export_ts = strtotime((string)$exported_at);
        if($export_ts === false) $export_ts = time();
        // Un día de tolerancia evita problemas por zona horaria alrededor de medianoche.
        $min_fecha = date('Y-m-d', $export_ts - 86400);
        $max_fecha = date('Y-m-d', time() + 86400);

        foreach($rows as $i => $r){
            if(!is_array($r)) return 'Movimiento de bitácora '.($i+1).' no válido.';
            $mov = trim((string)$this->portatil_importar_get($r, 'movimiento', ''));
            if(!isset($permitidos[$mov])) return 'Movimiento de bitácora no permitido: '.$mov.'.';

            $fecha = trim((string)$this->portatil_importar_get($r, 'fecha', ''));
            if(!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha)) return 'Fecha de bitácora no válida.';
            $dt = DateTime::createFromFormat('Y-m-d', $fecha);
            if(!$dt || $dt->format('Y-m-d') !== $fecha) return 'Fecha de bitácora no válida.';
            if($fecha < $min_fecha || $fecha > $max_fecha) return 'La fecha de bitácora está fuera del periodo permitido para este paquete.';

            $tiempo = $this->portatil_importar_get($r, 'tiempo', null);
            if(!is_numeric($tiempo)) return 'Tiempo de bitácora no válido.';
            $tiempo = (int)$tiempo;
            if($tiempo < 0 || $tiempo > 86400000) return 'Tiempo de bitácora fuera de rango.';
        }
        return '';
    }

    private function portatil_importar_aplicar_bitacora($db, $usuario, $sistema, $rows){
        $insertados = 0;
        $ordinales = array();
        foreach($rows as $r){
            $mov = trim((string)$this->portatil_importar_get($r, 'movimiento', ''));
            $fecha = trim((string)$this->portatil_importar_get($r, 'fecha', ''));
            $tiempo = (int)$this->portatil_importar_get($r, 'tiempo', 0);

            /*
             * Idempotencia sin perder movimientos legítimos iguales. Si dos guardados
             * del mismo artículo duran exactamente lo mismo, ambos deben conservarse.
             * Por eso comparamos la cantidad ya existente contra el ordinal de esa
             * combinación dentro del ZIP, en vez de hacer un simple EXISTS.
             */
            $key = $mov."\n".$fecha."\n".$tiempo;
            if(!isset($ordinales[$key])) $ordinales[$key] = 0;
            $ordinales[$key]++;

            $q = $db->query(
                'SELECT COUNT(1) AS n FROM bitacora WHERE usuario = ? AND sistema = ? AND movimiento = ? AND fecha = CAST(? AS date) AND tiempo = ?',
                array($usuario, $sistema, $mov, $fecha, $tiempo)
            );
            $existentes = ($q && $q->num_rows() > 0) ? (int)$q->row()->n : 0;
            if($existentes >= $ordinales[$key]) continue;

            $ok = $db->query(
                'INSERT INTO bitacora (usuario, sistema, movimiento, fecha, tiempo) VALUES (?, ?, ?, CAST(? AS date), ?)',
                array($usuario, $sistema, $mov, $fecha, $tiempo)
            );
            if(!$ok) throw new Exception('No fue posible guardar la bitácora portátil.');
            $insertados++;
        }
        return $insertados;
    }

    private function portatil_importar_registrar_origen_portatil($db, $usuario, $sistema){
        $movimiento = 'Importado portátil';

        $ok = $db->query(
            'INSERT INTO bitacora (usuario, sistema, movimiento, fecha, tiempo) VALUES (?, ?, ?, NOW()::timestamp::date, ?)',
            array($usuario, $sistema, $movimiento, 0)
        );
        if(!$ok){
            throw new Exception('No fue posible registrar la procedencia portátil en bitácora.');
        }
        return 1;
    }

    private function portatil_importar_insertar_catalogador($db, $sistema, $nombre){
        $q = $db->query('SELECT COALESCE(MAX(id),0)+1 AS id FROM catalogador WHERE sistema = ?', array($sistema));
        $id = ($q && $q->num_rows()) ? (int)$q->row()->id : 1;
        $db->query(
            'INSERT INTO catalogador (sistema,id,nombre,nivel,fecha,hora) VALUES (?,?,?,10,NOW()::timestamp::date,LOCALTIME(0))',
            array($sistema, $id, $nombre)
        );
    }

    private function portatil_importar_validar_documento($d, $revision_pc){
        $palabras = $this->portatil_importar_lista($this->portatil_importar_get($d, 'palabraClave', array()));
        $keywords = $this->portatil_importar_lista($this->portatil_importar_get($d, 'keyword', array()));
        if(count($palabras) > 200 || count($keywords) > 200) return 'La cantidad de palabras clave excede el límite permitido.';
        foreach(array_merge($palabras, $keywords) as $p){
            if($this->portatil_importar_strlen($p) > 500) return 'Una palabra clave excede 500 caracteres.';
        }
        if($revision_pc) return '';

        $titulo = trim((string)$this->portatil_importar_get($d, 'articulo', ''));
        if($titulo === '') return 'El título del artículo no puede quedar vacío.';
        if($this->portatil_importar_strlen($titulo) > 5000) return 'El título del artículo es demasiado largo.';

        $tipo = trim((string)$this->portatil_importar_get($d, 'tipo_documento', ''));
        if(strcasecmp($tipo, 'Errata') === 0) return 'La versión portátil no admite convertir registros en Errata.';

        for($i=1; $i<=2; $i++){
            $url = trim((string)$this->portatil_importar_get($d, 'url'.$i, ''));
            if($url !== '' && !preg_match('~^https?://~i', $url)) return 'URL'.$i.' debe iniciar con http:// o https://.';
            if(strlen($url) > 10000) return 'URL'.$i.' es demasiado larga.';
        }
        return '';
    }

    private function portatil_importar_validar_instituciones($rows, $corporativo){
        if(count($rows) > 200) return 'La cantidad de instituciones excede el límite permitido.';
        $ids = array(); $dups = array();
        foreach($rows as $i => $r){
            if(!is_array($r)) return 'Institución '.($i+1).' no tiene un formato válido.';
            $id = (int)$this->portatil_importar_get($r, 'id', $i+1);
            if($id <= 0 || isset($ids[$id])) return 'Existen IDs de institución inválidos o duplicados.';
            $ids[$id] = true;
            $pais = trim((string)$this->portatil_importar_get($r, 'pais', ''));
            $inst = trim((string)$this->portatil_importar_get($r, 'institucion', ''));
            $ciudad = $corporativo ? '' : trim((string)$this->portatil_importar_get($r, 'ciudad', ''));
            $dep = trim((string)$this->portatil_importar_get($r, 'dependencia', ''));
            if($pais === '') return 'Falta País de Institución '.($i+1).'.';
            if($inst === '') return 'Falta nombre de Institución '.($i+1).'.';
            $key = $this->portatil_importar_lower($pais.'|'.$ciudad.'|'.$inst.'|'.$dep);
            if(isset($dups[$key])) return 'Existen instituciones duplicadas.';
            $dups[$key] = true;
            if($this->portatil_importar_strlen($inst) > 2000 || $this->portatil_importar_strlen($dep) > 2000 || $this->portatil_importar_strlen($pais) > 500 || $this->portatil_importar_strlen($ciudad) > 500){
                return 'Una institución contiene un campo demasiado largo.';
            }
        }
        return '';
    }

    private function portatil_importar_validar_autores($rows, $instituciones){
        if(count($rows) > 1000) return 'La cantidad de autores excede el límite permitido.';
        $ids_inst = array();
        foreach($instituciones as $r){
            if(is_array($r) && isset($r['id'])) $ids_inst[(string)(int)$r['id']] = true;
        }
        $ids = array();
        foreach($rows as $i => $r){
            if(!is_array($r)) return 'Autor '.($i+1).' no tiene un formato válido.';
            $id = (int)$this->portatil_importar_get($r, 'id', $i+1);
            if($id <= 0 || isset($ids[$id])) return 'Existen IDs de autor inválidos o duplicados.';
            $ids[$id] = true;
            $nombre = trim((string)$this->portatil_importar_get($r, 'nombre', ''));
            if($nombre === '') return 'Falta nombre de Autor '.($i+1).'.';
            if($this->portatil_importar_strlen($nombre) > 2000) return 'El nombre de un autor es demasiado largo.';
            $orcid = trim((string)$this->portatil_importar_get($r, 'orcid', ''));
            if($orcid !== '' && !preg_match('/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}([0-9]|X)$/', $orcid)){
                return 'ORCID inválido en Autor '.($i+1).'.';
            }
            $iid = $this->portatil_importar_scalar($this->portatil_importar_get($r, 'institucionId', ''));
            if($iid !== '' && !isset($ids_inst[(string)(int)$iid])) return 'Autor '.($i+1).' hace referencia a una institución inexistente.';
        }
        return '';
    }

    private function portatil_importar_documento_actual($db, $sistema){
        $q = $db->query(
            'SELECT articulo, idioma, estatus, "estatusPC", documento, "articuloIdiomas", disciplinas, "subdisciplinas", "palabraClave", keyword, url FROM article WHERE sistema = ? LIMIT 1',
            array($sistema)
        );
        if(!$q || !$q->num_rows()) return null;
        $r = $q->row_array();
        $doc_json = $this->portatil_importar_json($r['documento'], array());
        $art_id = $this->portatil_importar_json($r['articuloIdiomas'], array());
        $disc = $this->portatil_importar_json($r['disciplinas'], array());
        $sub = $this->portatil_importar_json($r['subdisciplinas'], array());
        $urls = $this->portatil_importar_json($r['url'], array());

        $out = array(
            'articulo' => ($r['articulo'] === null || $r['articulo'] === '') ? 'SIN TÍTULO' : $r['articulo'],
            'idioma' => $r['idioma'],
            'estatus' => $r['estatus'],
            'estatusPC' => $r['estatusPC'],
            'tipo_documento' => isset($doc_json['a']) ? $doc_json['a'] : null,
            'titulo2' => null, 'idioma2' => null,
            'titulo3' => null, 'idioma3' => null,
            'disciplina1' => isset($disc[0]) ? $disc[0] : null,
            'disciplina2' => isset($disc[1]) ? $disc[1] : null,
            'disciplina3' => isset($disc[2]) ? $disc[2] : null,
            'subdisciplina1' => isset($sub[0]) ? $sub[0] : null,
            'subdisciplina2' => isset($sub[1]) ? $sub[1] : null,
            'subdisciplina3' => isset($sub[2]) ? $sub[2] : null,
            'palabraClave' => json_encode($this->portatil_importar_lista($r['palabraClave']), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'keyword' => json_encode($this->portatil_importar_lista($r['keyword']), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'url1' => null, 'url2' => null, 'tipourl1' => null, 'tipourl2' => null
        );

        for($i=0; $i<2; $i++){
            if(isset($art_id[$i]) && is_array($art_id[$i])){
                $out['titulo'.($i+2)] = isset($art_id[$i]['a']) ? $art_id[$i]['a'] : null;
                $out['idioma'.($i+2)] = $this->portatil_importar_nombre_idioma(isset($art_id[$i]['y']) ? $art_id[$i]['y'] : '');
            }
            if(isset($urls[$i]) && is_array($urls[$i])){
                $out['url'.($i+1)] = isset($urls[$i]['u']) ? $urls[$i]['u'] : null;
                $tipo = isset($urls[$i]['y']) ? (string)$urls[$i]['y'] : '';
                $out['tipourl'.($i+1)] = stripos($tipo, 'PDF') !== false ? 'pdf' : (stripos($tipo, 'HTML') !== false ? 'html' : null);
            }
        }
        return $out;
    }

    private function portatil_importar_documento_comparable($d, $revision_pc){
        if(!is_array($d)) $d = array();
        if($revision_pc){
            return array(
                'palabraClave'=>$this->portatil_importar_lista($this->portatil_importar_get($d, 'palabraClave', array())),
                'keyword'=>$this->portatil_importar_lista($this->portatil_importar_get($d, 'keyword', array())),
                'estatusPC'=>$this->portatil_importar_scalar($this->portatil_importar_get($d, 'estatusPC', ''))
            );
        }
        $out = array();
        foreach(array(
            'articulo','idioma','tipo_documento','titulo2','idioma2','titulo3','idioma3',
            'disciplina1','disciplina2','disciplina3','subdisciplina1','subdisciplina2','subdisciplina3',
            'url1','url2','tipourl1','tipourl2','estatus'
        ) as $k){
            $out[$k] = $this->portatil_importar_scalar($this->portatil_importar_get($d, $k, ''));
        }
        $out['palabraClave'] = $this->portatil_importar_lista($this->portatil_importar_get($d, 'palabraClave', array()));
        $out['keyword'] = $this->portatil_importar_lista($this->portatil_importar_get($d, 'keyword', array()));
        return $out;
    }

    private function portatil_importar_autores_actuales($db, $sistema){
        $q = $db->query('SELECT sistema,id,nombre,orcid,"institucionId",email FROM author WHERE sistema = ? ORDER BY id', array($sistema));
        return $q ? $q->result_array() : array();
    }

    private function portatil_importar_instituciones_actuales($db, $sistema){
        $q = $db->query(
            'SELECT sistema,id,institucion,dependencia,ciudad,pais,0 AS corporativo FROM institution WHERE sistema = ? '
            .'UNION SELECT sistema,id,institucion,dependencia,\'\' AS ciudad,pais,1 AS corporativo FROM author_coorp WHERE sistema = ? ORDER BY id',
            array($sistema, $sistema)
        );
        return $q ? $q->result_array() : array();
    }

    private function portatil_importar_normalizar_autores($rows){
        $out = array();
        foreach((array)$rows as $r){
            if(!is_array($r)) continue;
            $out[] = array(
                'sistema'=>$this->portatil_importar_scalar($this->portatil_importar_get($r,'sistema','')),
                'id'=>(int)$this->portatil_importar_get($r,'id',0),
                'nombre'=>$this->portatil_importar_scalar($this->portatil_importar_get($r,'nombre','')),
                'orcid'=>$this->portatil_importar_scalar($this->portatil_importar_get($r,'orcid','')),
                'institucionId'=>$this->portatil_importar_scalar($this->portatil_importar_get($r,'institucionId','')),
                'email'=>$this->portatil_importar_scalar($this->portatil_importar_get($r,'email',''))
            );
        }
        usort($out, function($a,$b){ return $a['id'] <=> $b['id']; });
        return $out;
    }

    private function portatil_importar_normalizar_instituciones($rows){
        $out = array();
        foreach((array)$rows as $r){
            if(!is_array($r)) continue;
            $corp = (int)$this->portatil_importar_get($r,'corporativo',0) ? 1 : 0;
            $out[] = array(
                'sistema'=>$this->portatil_importar_scalar($this->portatil_importar_get($r,'sistema','')),
                'id'=>(int)$this->portatil_importar_get($r,'id',0),
                'institucion'=>$this->portatil_importar_scalar($this->portatil_importar_get($r,'institucion','')),
                'dependencia'=>$this->portatil_importar_scalar($this->portatil_importar_get($r,'dependencia','')),
                'ciudad'=>$corp ? '' : $this->portatil_importar_scalar($this->portatil_importar_get($r,'ciudad','')),
                'pais'=>$this->portatil_importar_scalar($this->portatil_importar_get($r,'pais','')),
                'corporativo'=>$corp
            );
        }
        usort($out, function($a,$b){ return $a['id'] <=> $b['id']; });
        return $out;
    }

    private function portatil_importar_hash_comparable($value){
        return hash('sha256', json_encode($this->portatil_canonicalize($value), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    }

    private function portatil_importar_get($arr, $key, $default=null){
        return (is_array($arr) && array_key_exists($key, $arr)) ? $arr[$key] : $default;
    }

    private function portatil_importar_scalar($v){
        if($v === null) return '';
        if(is_bool($v)) return $v ? '1' : '0';
        return trim((string)$v);
    }

    private function portatil_importar_null($v){
        return ($v === '' || $v === null) ? null : $v;
    }

    private function portatil_importar_json($v, $default=array()){
        if(is_array($v)) return $v;
        if($v === null || $v === '') return $default;
        $x = json_decode((string)$v, true);
        return is_array($x) ? $x : $default;
    }

    private function portatil_importar_lista($v){
        $arr = is_array($v) ? $v : $this->portatil_importar_json($v, array());
        $out = array(); $seen = array();
        foreach((array)$arr as $x){
            if(is_array($x) || is_object($x)) continue;
            $s = trim((string)$x);
            if($s === '') continue;
            $k = $this->portatil_importar_lower($s);
            if(isset($seen[$k])) continue;
            $seen[$k] = true;
            $out[] = $s;
        }
        return $out;
    }

    private function portatil_importar_strlen($s){
        return function_exists('mb_strlen') ? mb_strlen((string)$s, 'UTF-8') : strlen((string)$s);
    }

    private function portatil_importar_lower($s){
        return function_exists('mb_strtolower') ? mb_strtolower((string)$s, 'UTF-8') : strtolower((string)$s);
    }

    private function portatil_importar_codigo_idioma($nombre){
        $n = $this->portatil_importar_lower(trim((string)$nombre));
        $map = array(
            'español'=>'spa', 'portugués'=>'por', 'ingles'=>'eng', 'inglés'=>'eng',
            'francés'=>'fre', 'italiano'=>'ita', 'alemán'=>'ger', 'ruso'=>'rus'
        );
        return isset($map[$n]) ? $map[$n] : 'otro';
    }

    private function portatil_importar_nombre_idioma($codigo){
        $c = strtolower(trim((string)$codigo));
        $map = array(
            'spa'=>'Español','esp'=>'Español','por'=>'Portugués','eng'=>'Inglés',
            'fre'=>'Francés','fra'=>'Francés','ita'=>'Italiano','ger'=>'Alemán','deu'=>'Alemán','rus'=>'Ruso'
        );
        return isset($map[$c]) ? $map[$c] : 'Otro';
    }

    private function portatil_importar_leer_zip_store($path){
        $bin = @file_get_contents($path);
        if($bin === false || strlen($bin) < 30) throw new Exception('No fue posible leer el ZIP de retorno.');
        if(strlen($bin) > 25 * 1024 * 1024) throw new Exception('El ZIP de retorno supera el límite permitido.');

        $files = array();
        $pos = 0; $entries = 0; $len = strlen($bin); $total_data = 0;
        while($pos + 4 <= $len){
            $sig = $this->portatil_importar_u32($bin, $pos);
            if($sig === 0x02014b50 || $sig === 0x06054b50) break;
            if($sig !== 0x04034b50) throw new Exception('Estructura ZIP no válida.');
            if($pos + 30 > $len) throw new Exception('Cabecera ZIP truncada.');

            $flags = $this->portatil_importar_u16($bin, $pos + 6);
            $method = $this->portatil_importar_u16($bin, $pos + 8);
            $crc = $this->portatil_importar_u32($bin, $pos + 14);
            $comp = $this->portatil_importar_u32($bin, $pos + 18);
            $uncomp = $this->portatil_importar_u32($bin, $pos + 22);
            $name_len = $this->portatil_importar_u16($bin, $pos + 26);
            $extra_len = $this->portatil_importar_u16($bin, $pos + 28);

            if(($flags & 0x0001) !== 0) throw new Exception('El ZIP está cifrado y no puede importarse.');
            if(($flags & 0x0008) !== 0) throw new Exception('El ZIP usa descriptor de datos no compatible con la versión portátil.');
            if($method !== 0) throw new Exception('El ZIP usa compresión no compatible. Genérelo nuevamente desde Biblat Central portátil.');
            if($comp !== $uncomp) throw new Exception('Tamaños ZIP inconsistentes.');

            $data_pos = $pos + 30 + $name_len + $extra_len;
            if($data_pos + $comp > $len) throw new Exception('El ZIP está truncado.');
            $name = substr($bin, $pos + 30, $name_len);
            if($name === '' || strpos($name, '..') !== false || strpos($name, '\\') !== false || substr($name,0,1) === '/'){
                throw new Exception('Nombre de archivo no permitido dentro del ZIP.');
            }
            $data = substr($bin, $data_pos, $comp);
            $crc_actual = sprintf('%u', crc32($data));
            if(sprintf('%u', $crc) !== $crc_actual) throw new Exception('El ZIP está dañado (CRC inválido en '.$name.').');

            $entries++; $total_data += $uncomp;
            if($entries > 20 || $total_data > 40 * 1024 * 1024) throw new Exception('El ZIP excede los límites de seguridad.');
            if($name === 'manifest.json' || $name === 'trabajo.json') $files[$name] = $data;
            $pos = $data_pos + $comp;
        }
        return $files;
    }

    private function portatil_importar_u16($bin, $pos){
        $x = unpack('vval', substr($bin, $pos, 2));
        return (int)$x['val'];
    }

    private function portatil_importar_u32($bin, $pos){
        $x = unpack('Vval', substr($bin, $pos, 4));
        return (int)$x['val'];
    }

    private function portatil_importar_respuesta($obj, $status=200){
        while(ob_get_level() > 0) @ob_end_clean();
        if(!headers_sent()){
            http_response_code((int)$status);
            header('Content-Type: application/json; charset=utf-8');
            header('Cache-Control: no-store, no-cache, must-revalidate');
            header('Pragma: no-cache');
        }
        echo json_encode($obj, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
}