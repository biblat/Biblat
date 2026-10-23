<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

// Originaly CodeIgniter i18n library by Jérôme Jaglale
// http://maestric.com/en/doc/php/codeigniter_i18n
// modification by Yeb Reitsma

/*
in case you use it with the HMVC modular extension
uncomment this and remove the other lines
load the MX_Loader class */

//require APPPATH."third_party/MX/Lang.php";

//class MY_Lang extends MX_Lang {
 
class MY_Lang extends CI_Lang {


  /**************************************************
   configuration
  ***************************************************/
 
  // languages
  private $languages = array(
    'es' => array(
        'iso'   => 'es',
        'i18n'  => 'es_ES',
        'name'  => 'spanish',
        'title' => 'Español',
        'img'   => 'spanish.png'
      ),
    'en' => array(
        'iso'   => 'en',
        'i18n'  => 'en_US',
        'name'  => 'english',
        'title' => 'English',
        'img'   => 'english.png'
      ),
    'pt' => array(
      'iso'   => 'pt',
      'i18n'  => 'pt_BR',
      'name'  => 'portuguese',
      'title' => 'Português',
      'img'   => 'portuguese.png'
    ),
    'fr' => array(
        'iso'   => 'fr',
        'i18n'  => 'fr_FR',
        'name'  => 'french',
        'title' => 'Français',
        'img'   => 'french.png'
      ),
    'ca' => array(
        'iso'   => 'ca',
        'i18n'  => 'ca_ES',
        'name'  => 'catalan',
        'title' => 'Catalan',
        'img'   => 'catalan.png'
      )
  );
 
  // special URIs (not localized)
  private $special = array (
    "admin",
    "api"
  );
  
  // where to redirect if no language in URI
  private $uri;
  private $default_uri;
  private $lang_code;
 
  /**************************************************/
    
    
  function MY_Lang()
  {
    parent::__construct();
    
    global $CFG;
    global $URI;
    global $RTR;
    
    $this->uri = $URI->uri_string();
    $this->default_uri = $RTR->default_controller;
    
    $uri_segment = $this->get_uri_lang($this->uri);
    $this->lang_code = $uri_segment['lang'] ;
    
    $url_ok = false;
    if ((!empty($this->lang_code)) && (array_key_exists($this->lang_code, $this->languages)))
    {
        $language = $this->languages[$this->lang_code]['name'];
        $CFG->set_item('language', $language);
        $this->set_gettext_language();
        $url_ok = true;
    }
      
    if ((!$url_ok) && (!$this->is_special($uri_segment['parts'][0]))) // special URI -> no redirect
    { 
      // set default language
      $CFG->set_item('language', $this->languages[$this->default_lang()]['name']);
      $this->set_gettext_language();
      $uri = (!empty($this->uri)) ? $this->uri: $this->default_uri;
      if($uri === "main"):
        $uri="";
      endif;
      //OPB - modification to use i18n also without changing the .htaccess (without pretty url) 
      $index_url = empty($CFG->config['index_page']) ? '' : $CFG->config['index_page']."/";
      $new_url = $CFG->config['base_url'].$index_url.$this->default_lang().'/'.$uri;
      if(!empty($_SERVER['QUERY_STRING']))
        $new_url = "{$new_url}?{$_SERVER['QUERY_STRING']}";
      header("Location: " . $new_url, TRUE, 302);
      exit;
    }
  }

    
    
  // get current language
  // ex: return 'en' if language in CI config is 'english' 
  function lang()
  {
    global $CFG;        
    $language = $CFG->item('language');
    
    $lang = $this->recursive_array_search($language, $this->languages);
    if ($lang)
    {
      return $lang;
    }
    
    return NULL;    // this should not happen
  }

  function supported_langs(){
    return $this->languages;
  }

  function lang_array(){
    return $this->languages[$this->lang()];
  }
    
    
  function is_special($lang_code)
  {
    if ((!empty($lang_code)) && (in_array($lang_code, $this->special)))
      return TRUE;
    else
      return FALSE;
  }
 
   
  function switch_uri($lang)
	{
		// Obtener la URI actual
		$uri = trim((string) ($this->uri ?? ''), '/');

		// Verificar que el idioma solicitado exista
		if (!array_key_exists($lang, $this->languages))
		{
			return $uri;
		}

		// Si estamos en la página principal
		if ($uri === '')
		{
			return $lang;
		}

		// Identificar el idioma actual en la URI
		$uri_segment = $this->get_uri_lang($uri);

		// Si la URI ya contiene un idioma, sustituirlo
		if ($uri_segment !== FALSE && $uri_segment['lang'] !== NULL)
		{
			$uri_segment['parts'][0] = $lang;
			return implode('/', $uri_segment['parts']);
		}

		// Si no contiene idioma, agregarlo al inicio
		return $lang . '/' . $uri;
	}

  //check if the language exists
  //when true returns an array with lang abbreviation + rest
  function get_uri_lang($uri = '')
  {
    if (!empty($uri))
    {
      $uri = ($uri[0] == '/') ? substr($uri, 1): $uri;
      
      $uri_expl = explode('/', $uri, 2);
      $uri_segment['lang'] = NULL;
      $uri_segment['parts'] = $uri_expl;  
      
      if (array_key_exists($uri_expl[0], $this->languages))
      {
        $uri_segment['lang'] = $uri_expl[0];
      }
      return $uri_segment;
    }
    else
      return FALSE;
  }

    
  // default language: first element of $this->languages
  function default_lang()
  {
    $browser_lang = !empty($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? strtok(strip_tags($_SERVER['HTTP_ACCEPT_LANGUAGE']), ',') : 'en';
    $browser_lang = substr($browser_lang, 0,2);
    if(array_key_exists($browser_lang, $this->languages))
        return $browser_lang;
    else{
        reset($this->languages);
        return key($this->languages);
    }
  }
    
    
  // add language segment to $uri (if appropriate)
  function localized($uri)
  {
    if (!empty($uri))
    {
      $uri_segment = $this->get_uri_lang($uri);
      if (!$uri_segment['lang'])
      {

        if ((!$this->is_special($uri_segment['parts'][0])) && (!preg_match('/(.+)\.[a-zA-Z0-9]{2,4}$/', $uri)))
        {
          $uri = $this->lang() . '/' . $uri;
        }
      }
    }
    return $uri;
  }

  function set_gettext_language(){
    $language = $this->lang_array();
    $lang_path = FCPATH.APPPATH.'language/locales';
    putenv('LANG='.$language['i18n'].'.UTF-8');
    setlocale(LC_ALL, $language['i18n'].'.UTF-8');
    bindtextdomain('lang', $lang_path);
    textdomain('lang');
  }

  function recursive_array_search($needle,$haystack) {
    foreach($haystack as $key=>$value) {
        $current_key=$key;
        if($needle===$value OR (is_array($value) && $this->recursive_array_search($needle,$value) !== false)) {
            return $current_key;
        }
    }
    return false;
  }

} 

// END MY_Lang Class

/* End of file MY_Lang.php */
/* Location: ./application/core/MY_Lang.php */