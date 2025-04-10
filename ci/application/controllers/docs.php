<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
error_reporting(0);

class Docs extends CI_Controller {
    
    public function __construct(){
            parent::__construct();
                $this->output->enable_profiler($this->config->item('enable_profiler'));
                $this->template->set_partial('biblat_js', 'javascript/biblat', array(), TRUE, FALSE);
                $this->template->set_partial('submenu', 'layouts/submenu');
                $this->template->set_partial('search', 'layouts/search');
                $this->template->set_breadcrumb(_('Inicio'), site_url('/'));
                $this->template->set('class_method', $this->router->fetch_class().$this->router->fetch_method());
                $this->template->js('assets/js/utils/utils.js');
    }
    
    public function pta2025(){   
            $data = array();
            $this->template->set_layout('default_sel');
            $this->template->build('admin/documentos/documento1', $data);
    }
}
?>