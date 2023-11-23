<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
error_reporting(0);

class Adminb extends CI_Controller {
    
    public function __construct(){
            parent::__construct();
            if (in_array($this->get_ip(), IPS)){
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
        if($this->session->userdata('usuario')){
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
    
    public function asigna(){
        if($this->session->userdata('usuario')){
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
    
    public function avance(){
        if($this->session->userdata('usuario')){
            $this->template->set_breadcrumb(_('Menú Administrador'), site_url('adminb'));
            $this->template->set_breadcrumb(_('Avance'));
            $data = array();
            $data['page_title'] = _('Avance de análisis');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Avance'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
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
            $this->template->set_meta('description', _('Artículos'));
            $this->template->set_partial('main_js', 'admin/analisis.js', array(), TRUE, FALSE);
            $this->template->build('admin/analisis', $data);
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
