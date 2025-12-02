<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
error_reporting(0);

class Indizacion extends CI_Controller {
    
    public function __construct(){
            parent::__construct();
            $this->output->enable_profiler($this->config->item('enable_profiler'));
            $this->template->set_partial('biblat_js', 'javascript/biblat', array(), TRUE, FALSE);
            $this->template->set_partial('submenu', 'layouts/submenu');
            $this->template->set_partial('search', 'layouts/search');
            $this->template->set_breadcrumb(_('Inicio'), site_url('/'));
            $this->template->set('class_method', $this->router->fetch_class().$this->router->fetch_method());
            $this->template->js('assets/js/highcharts/phantomjs/highcharts8.js');
            $this->template->js('js/env.js');
            $this->template->js('assets/js/utils/utils.js');
    }
    
    public function index(){
        $data = array();
        $data['page_title'] = _('BibLex IA - Asistente de indización');
        $this->template->set_layout('default_sel');
        $this->template->title(_('BibLex IA - Asistente de indización'));
        $this->template->set_meta('description', _('BibLex IA - Asistente de indización'));
        $this->template->set_partial('main_js', 'catalogacion/catalogacion.js', array(), TRUE, FALSE);
        $this->template->build('catalogacion/catalogacion', $data);
    }
    
    public function api(){
        $data = array();
        $data['page_title'] = _('Indización vía API');
        $this->template->set_layout('default_sel');
        $this->template->title(_('Indización vía API'));
        $this->template->set_meta('description', _('Indización vía API'));
        $this->template->set_partial('main_js', 'catalogacion/catalogacion_api.js', array(), TRUE, FALSE);
        $this->template->build('catalogacion/catalogacion_api', $data);
    }
    
   
}