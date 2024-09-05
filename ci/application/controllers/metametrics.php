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
        $this->template->js('js/env.js');
        $this->template->js('assets/js/datatables/datatables.min.js');
        $this->template->js('assets/js/datatables/input.js');
        $this->template->set_partial('main_js', 'verificador/verificador.js', array(), TRUE, FALSE);
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
        $data = curl_exec($ch);
        $info = curl_getinfo($ch);
        curl_close($ch);
        if ($info['http_code'] == '404') {
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
}