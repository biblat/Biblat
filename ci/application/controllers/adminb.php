<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
error_reporting(0);

class Adminb extends CI_Controller {
    
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
        if($this->session->userdata('usuario')){
            $data = array();
            $data['page_title'] = _('Administrador');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Administrador'));
            $data['page_subtitle'] = $this->session->userdata('nombre');
            $this->template->set_meta('description', _('Administrador'));
            $this->template->js('assets/js/apigoogle/api.js');
            $this->template->js('assets/js/apigoogle/getaccesstokenfromserviceaccount.js');
            $this->template->js('assets/js/apigoogle/client.js');
            $this->template->css('css/jquery.slider.min.css');
            $this->template->js('js/env.js');
            //$this->template->set_partial('main_js', 'sesion/sesion.js', array(), TRUE, FALSE);
            $this->template->build('admin/admin', $data);
        }else{
            redirect('main');
        }
    }
    
}
