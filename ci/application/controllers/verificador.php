<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
error_reporting(0);

class Verificador extends CI_Controller {
    
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
        $data['page_title'] = _('Verificador');
        $this->template->title(_('Verificador'));
        $this->template->set_meta('description', _('Verificador'));
        $this->template->js('assets/js/highcharts/phantomjs/highcharts8.js');
        $this->template->js('assets/js/highcharts/phantomjs/highcharts-more8.js');
        $this->template->js('assets/js/highcharts/phantomjs/drilldown8.js');
        $this->template->js('assets/js/utils/utils.js');
        $this->template->css('css/jquery.slider.min.css');
        $this->template->css('css/colorbox.css');
        $this->template->js('js/jquery.slider.min.js');
        $this->template->js('js/jquery.serializeJSON.min.js');
        $this->template->js('js/colorbox.js');
        $this->template->set_partial('main_js', 'verificador/verificador.js', array(), TRUE, FALSE);
        $this->template->build('verificador/verificador', $data);
    }
    
    function file_get_contents_curl($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
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
    
    public function get_oai(){
        $oai = $_GET['oai'];
        $years = $_GET['years'];
        $url = $oai.'?verb=ListRecords&metadataPrefix=oai_biblat&years_'.$years.'&tk_'.rand();
        $url = file_get_contents($url);
        
        $dom = new DOMDocument();
        @$dom->loadHTML($url);
        //obtenemos todos los div de la url
        $divs = $dom->getElementsByTagName('varfield');
        $version = '2';
        $ver = '';
        
        foreach( $divs as $div ){
            if( $div->getAttribute( 'id' ) === "000" ){
                $ver = explode("v", $div->nodeValue)[0];
                $busca = strpos($div->nodeValue, '2.3.0');
                if ($busca == false)
                    $version = '3';
            }
        }
        
        $ciphering = "AES-256-CBC";
        $iv_length = openssl_cipher_iv_length($ciphering);
        $options = 0;
        $encryption_iv = substr(hash('sha256', 'c09f6a9e157d253d0b2f0bcd81d338298950f246'), 0, 16);
        $encryption_key = hash('sha256', 'UNAM - Bibliografia Latinoamericana');
        
        $response = '{ "ver": "' . trim($ver) . '"';
        if ($version == '2'){
            foreach( $divs as $div ){
                if( $div->getAttribute( 'id' ) === "db" ){
                    $db = $div->nodeValue;
                    $db = pack("H*",$db);

                    $arr_db = explode("xxx", $db);
                    $obj = json_decode($arr_db[1]);
                    $response .= ',"i": ' . $arr_db[1];
                    $response .= ', "j": ' . $arr_db[3];
                    $response .= ', "js": ' . $arr_db[5];
                    $response .= ', "ss": ' . $arr_db[7];
                    $response .= ', "p": ' . $arr_db[9];
                    $response .= ', "ps": ' . $arr_db[11];
                    $response .= ', "is": ' . $arr_db[13];
                    $response .= ', "a": ' . $arr_db[15];
                    $response .= ', "as": ' . $arr_db[17];
                    $response .= ', "s": ' . $arr_db[19];
                    $response .= ', "ses": ' . $arr_db[21];
                    $response .= ', "pg": ' . $arr_db[23];
                    $response .= ', "num": ' . $arr_db[25];
                    $response .= '} ';
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
            foreach( $divs as $div ){
                if( in_array( $div->getAttribute( 'label' ), $subs)){
                    $db = $div->nodeValue;
                    $dec .= openssl_decrypt ($db, $ciphering, $encryption_key, $options, $encryption_iv);
                }
            }
            $arr_db = explode("xxx", $dec);
            $obj = json_decode($arr_db[1]);
            $response .= ', "i": ' . $arr_db[1];
            $response .= ', "j": ' . $arr_db[3];
            $response .= ', "js": ' . $arr_db[5];
            $response .= ', "ss": ' . $arr_db[7];
            $response .= ', "p": ' . $arr_db[9];
            $response .= ', "ps": ' . $arr_db[11];
            $response .= ', "is": ' . $arr_db[13];
            $response .= ', "a": ' . $arr_db[15];
            $response .= ', "as": ' . $arr_db[17];
            $response .= ', "c_v_e_s": ' . $arr_db[19];
            $response .= ', "s": ' . $arr_db[21];
            $response .= ', "ses": ' . $arr_db[23];
            $response .= ', "pg": ' . $arr_db[25];
            $response .= ', "num": ' . $arr_db[27];
            $response .= '} ';
            echo $response;
        }
    }
    
    public function get_data_by_issn(){
        $issn = $_GET['issn'];
        $url = 'https://portal.issn.org/resource/ISSN/' . $issn;
        $curl = $this->file_get_contents_curl($url);
        $dom = new DOMDocument();
        @$dom->loadHTML($curl);
        $divs = $dom->getElementsByTagName('p');
        $titulo = '';
        $pais = '';
        $url = '';
        
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
        }
        
        $titulo = str_replace('Title proper:', '', $titulo);
        $titulo = trim($titulo);
        $titulo = trim($titulo, ".");
        
        $pais = str_replace('Country:', '', $pais);
        $pais = trim($pais);
        $pais = trim($pais, ".");
        
        $url = str_replace('URL:', '', $url);
        $url = explode("http", $url)[1];
        $url = 'http' . trim($url);
        
        $response = '{ ';
        $response .= '"titulo": "' . $titulo . '"';
        $response .= ',"pais": "' . $pais . '"';
        $response .= ',"url": "' . $url . '"';
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
    
    public function get_doi_validate(){
        //10.3623/revisa.v%.n%.p926%
        //10.22201/iib.2594178xe.2021.1.92
        $doi = $_GET['doi'];
        $url = 'http://doi.org/api/handles/<doi>';
        $url = str_replace('<doi>', $doi, $url);
        $url = file_get_contents($url);
        echo $url;
    }
    
    public function get_url_validate(){
        //10.3623/revisa.v%.n%.p926%
        //10.22201/iib.2594178xe.2021.1.92
        $url = $_GET['url'];
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
        echo $response;
    }
}
