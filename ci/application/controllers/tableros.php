<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
error_reporting(0);

class Tableros extends CI_Controller {
    
    public function __construct(){
            parent::__construct();
            $this->output->enable_profiler($this->config->item('enable_profiler'));
            $this->template->set_partial('biblat_js', 'javascript/biblat', array(), TRUE, FALSE);
            $this->template->set_partial('submenu', 'layouts/submenu');
            $this->template->set_partial('search', 'layouts/search');
            $this->template->set_breadcrumb(_('Inicio'), site_url('/'));
            $this->template->set('class_method', $this->router->fetch_class().$this->router->fetch_method());
    }
    
    public function metametrics(){
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
        $data['page_title'] = _('Estadísticas de uso');
        $this->template->set_layout('default_sel');
        $this->template->title(_('Tablero Metametrics'));
        $data['page_subtitle'] = _('Ranking MetaMetrics');
        $this->template->set_meta('description', _('MetaMetrics'));
        $this->template->js('assets/js/highcharts/phantomjs/highcharts8.js');
        $this->template->js('assets/js/highcharts/phantomjs/highcharts-more8.js');
        $this->template->js('assets/js/highcharts/phantomjs/drilldown8.js');
        $this->template->js('assets/js/highcharts/phantomjs/treemap8.js');
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
        $this->template->set_partial('main_js', 'tableros/metametrics.js', array(), TRUE, FALSE);
        $this->template->build('tableros/metametrics', $data);
    }
    
}