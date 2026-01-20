<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
error_reporting(0);

class Adminb extends CI_Controller {
    
    public function __construct(){
            parent::__construct();
            //if (in_array($this->get_ip(), unserialize(IPS))){
			if ($this->session->userdata('usuario')){
                $this->output->enable_profiler($this->config->item('enable_profiler'));
                $this->template->set_partial('biblat_js', 'javascript/biblat', array(), TRUE, FALSE);
                $this->template->set_partial('submenu', 'layouts/submenu');
                $this->template->set_partial('search', 'layouts/search');
                $this->template->set_breadcrumb(_('Inicio'), site_url('/'));
                $this->template->set('class_method', $this->router->fetch_class().$this->router->fetch_method());

                $this->template->js('assets/js/highcharts/phantomjs/highcharts8.js');
                $this->template->js('assets/js/apigoogle/api.js');
                $this->template->js('assets/js/apigoogle/getaccesstokenfromserviceaccount.js');
                $this->template->js('assets/js/apigoogle/client.js');
                $this->template->css('css/jquery.slider.min.css');
                $this->template->js('js/env.js');
                $this->template->css('css/colorbox.css');
                $this->template->js('js/jquery.slider.min.js');
                $this->template->js('js/jquery.serializeJSON.min.js');
                $this->template->js('js/colorbox.js');
                $this->template->js('assets/js/utils/utils.js');
                $this->template->js('assets/js/datatables/datatables.min.js');
				$this->template->js('assets/js/datatables/jszip.js');
                $this->template->js('assets/js/datatables/input.js');
            }else{
                redirect('main');
            }
    }
    
    public function index(){   
        if($this->session->userdata('usuario')){
            $this->template->set_breadcrumb(_('Menú ').$this->session->userdata('rol'));
            $data = array();
            $data['page_title'] = _($this->session->userdata('rol'));
            $this->template->set_layout('default_sel');
            $this->template->title(_('Administrador'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
            $data['rol'] = $this->session->userdata('rol');
            $this->template->set_meta('description', _($this->session->userdata('rol')));
            $this->template->build('admin/admin', $data);
        }else{
            redirect('main');
        }
    }
    
    public function cosecha(){
        if($this->session->userdata('usuario') && $this->session->userdata('rol') == 'Administrador'){
            $this->template->set_breadcrumb(_('Menú Administrador'), site_url('adminb'));
            $this->template->set_breadcrumb(_('Cosecha OJS'));
            $data = array();
            $data['page_title'] = _('Cosecha OJS');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Cosecha OJS'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
            $this->template->set_meta('description', _('Cosecha OJS'));
            $this->template->set_partial('main_js', 'admin/admin.js', array(), TRUE, FALSE);
            $this->template->build('admin/cosecha', $data);
        }else{
            redirect('main');
        }
    }
    
	public function asignarev(){
        if($this->session->userdata('usuario') && $this->session->userdata('rol') == 'Administrador'){
            $this->template->set_breadcrumb(_('Menú Administrador'), site_url('adminb'));
            $this->template->set_breadcrumb(_('Asignar revista'));
            $data = array();
            $data['page_title'] = _('Asignar revista');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Asignar revista'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
            $this->template->set_meta('description', _('Asignar revista'));
            $this->template->set_partial('main_js', 'admin/asignarev.js', array(), TRUE, FALSE);
            $this->template->build('admin/asignarev', $data);
        }else{
            redirect('main');
        }
    }							
    public function asigna(){
        if($this->session->userdata('usuario') && $this->session->userdata('rol') == 'Administrador'){
            $this->template->set_breadcrumb(_('Menú Administrador'), site_url('adminb'));
            $this->template->set_breadcrumb(_('Asignación'));
            $data = array();
            $data['page_title'] = _('Asignación de artículos');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Asignación'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
            $this->template->set_meta('description', _('Asignación'));
            $this->template->set_partial('main_js', 'admin/asigna.js', array(), TRUE, FALSE);
            $this->template->build('admin/asigna', $data);
        }else{
            redirect('main');
        }
    }
	
	public function hevila(){
        if($this->session->userdata('usuario') && $this->session->userdata('rol') == 'Administrador'){
            $this->template->set_breadcrumb(_('Menú Administrador'), site_url('adminb'));
            $this->template->set_breadcrumb(_('Hevila'));
            $data = array();
            $data['page_title'] = _('Hevila');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Hevila'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
            $this->template->set_meta('description', _('Hevila'));
            $this->template->set_partial('main_js', 'admin/hevila.js', array(), TRUE, FALSE);
            $this->template->build('admin/hevila', $data);
        }else{
            redirect('main');
        }
    }
    
    public function avance(){
        if($this->session->userdata('usuario')){
            $this->template->set_breadcrumb(_('Menú Administrador'), site_url('adminb'));
            $this->template->set_breadcrumb(_('Avance'));
            $data = array();
            $data['page_title'] = _('Avance de análisis');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Avance'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
			$data['rol'] = $this->session->userdata('rol');
			$data['pal_cla'] = $this->session->userdata('pal_cla');
            $this->template->set_meta('description', _('Avance'));
            $this->template->set_partial('main_js', 'admin/avance.js', array(), TRUE, FALSE);
            $this->template->build('admin/avance', $data);
        }else{
            redirect('main');
        }
    }
    
    public function analisis(){
        if($this->session->userdata('usuario')){
            $this->template->set_breadcrumb(_('Menú '.$this->session->userdata('rol')), site_url('adminb'));
            $this->template->set_breadcrumb(_('Análisis'));
            $data = array();
            $data['page_title'] = _('Artículos');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Artículos'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
            $data['rol'] = $this->session->userdata('rol');
            $data['pal_cla'] = $this->session->userdata('pal_cla');
            $data['res'] = $this->session->userdata('res');
            $this->template->set_meta('description', _('Artículos'));
            $this->template->set_partial('main_js', 'admin/analisis.js', array(), TRUE, FALSE);
            $this->template->build('admin/analisis', $data);
        }else{
            redirect('main');
        }
    }
	
	public function ayuda(){
        if($this->session->userdata('usuario')){
            $this->template->set_breadcrumb(_('Menú '.$this->session->userdata('rol')), site_url('adminb'));
            $this->template->set_breadcrumb(_('Centro de aprendizaje'));
            $data = array();
            $data['page_title'] = _('Centro de aprendizaje');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Centro de aprendizaje'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
            $this->template->set_meta('description', _('Centro de aprendizaje'));
            $this->template->build('admin/ayuda', $data);
        }else{
            redirect('main');
        }
    }
    
    public function ayuda_general(){
        if($this->session->userdata('usuario')){
            $this->template->set_breadcrumb(_('Menú '.$this->session->userdata('rol')), site_url('adminb'));
            $this->template->set_breadcrumb(_('Centro de aprendizaje'), site_url('adminb/ayuda'));
            $this->template->set_breadcrumb(_('General'));
            $data = array();
            $data['page_title'] = _('General');
            $this->template->set_layout('default_sel');
            $this->template->title(_('General'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
            $this->template->set_meta('description', _('Centro de aprendizaje'));
            $this->template->set_partial('main_js', 'admin/videos.js', array(), TRUE, FALSE);
            $this->template->build('admin/ayuda_general', $data);
        }else{
            redirect('main');
        }
    }
    
    public function ayuda_articulos(){
        if($this->session->userdata('usuario')){
            $this->template->set_breadcrumb(_('Menú '.$this->session->userdata('rol')), site_url('adminb'));
            $this->template->set_breadcrumb(_('Centro de aprendizaje'), site_url('adminb/ayuda'));
            $this->template->set_breadcrumb(_('Artículos'));
            $data = array();
            $data['page_title'] = _('Artículos');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Artículos'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
            $this->template->set_meta('description', _('Centro de aprendizaje'));
            $this->template->set_partial('main_js', 'admin/videos.js', array(), TRUE, FALSE);
            $this->template->build('admin/ayuda_articulos', $data);
        }else{
            redirect('main');
        }
    }
    
    public function ayuda_autores(){
        if($this->session->userdata('usuario')){
            $this->template->set_breadcrumb(_('Menú '.$this->session->userdata('rol')), site_url('adminb'));
            $this->template->set_breadcrumb(_('Centro de aprendizaje'), site_url('adminb/ayuda'));
            $this->template->set_breadcrumb(_('Autores'));
            $data = array();
            $data['page_title'] = _('Autores');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Autores'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
            $this->template->set_meta('description', _('Centro de aprendizaje'));
            $this->template->set_partial('main_js', 'admin/videos.js', array(), TRUE, FALSE);
            $this->template->build('admin/ayuda_autores', $data);
        }else{
            redirect('main');
        }
    }
    
    public function ayuda_instituciones(){
        if($this->session->userdata('usuario')){
            $this->template->set_breadcrumb(_('Menú '.$this->session->userdata('rol')), site_url('adminb'));
            $this->template->set_breadcrumb(_('Centro de aprendizaje'), site_url('adminb/ayuda'));
            $this->template->set_breadcrumb(_('Instituciones'));
            $data = array();
            $data['page_title'] = _('Instituciones');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Instituciones'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
            $this->template->set_meta('description', _('Centro de aprendizaje'));
            $this->template->set_partial('main_js', 'admin/videos.js', array(), TRUE, FALSE);
            $this->template->build('admin/ayuda_instituciones', $data);
        }else{
            redirect('main');
        }
    }
	
	public function importaXML(){
        if($this->session->userdata('usuario') && $this->session->userdata('rol') == 'Administrador'){
            $this->template->set_breadcrumb(_('Menú Administrador'), site_url('adminb'));
            $this->template->set_breadcrumb(_('Importar desde XML'));
            $data = array();
            $data['page_title'] = _('Importar desde XML');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Importar desde XML'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
            $this->template->set_meta('description', _('Importar desde XML'));
            $this->template->set_partial('main_js', 'admin/admin.js', array(), TRUE, FALSE);
            $this->template->build('admin/importar', $data);
        }else{
            redirect('main');
        }
    }
	
	public function importaZIP(){
        if($this->session->userdata('usuario') && $this->session->userdata('rol') == 'Administrador'){
            $this->template->set_breadcrumb(_('Menú Administrador'), site_url('adminb'));
            $this->template->set_breadcrumb(_('Importar desde ZIP'));
            $data = array();
            $data['page_title'] = _('Importar desde ZIP');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Importar desde ZIP'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
            $this->template->set_meta('description', _('Importar desde ZIP'));
            $this->template->set_partial('main_js', 'admin/admin.js', array(), TRUE, FALSE);
            $this->template->build('admin/importar_pdf', $data);
        }else{
            redirect('main');
        }
    }
	
	public function solicitudes(){
        if($this->session->userdata('usuario')){
            $this->template->set_breadcrumb(_('Menú '.$this->session->userdata('rol')), site_url('adminb'));
            $this->template->set_breadcrumb(_('Solicitudes'));
            $data = array();
            $data['page_title'] = _('Solicitudes');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Solicitudes'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
            $data['rol'] = $this->session->userdata('rol');
            $this->template->set_meta('description', _('Solicitudes'));
            $this->template->set_partial('main_js', 'admin/solicitudes.js', array(), TRUE, FALSE);
            $this->template->build('admin/solicitudes', $data);
        }else{
            redirect('main');
        }
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
