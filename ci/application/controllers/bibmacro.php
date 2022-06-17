<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
error_reporting(0);

class Bibmacro extends CI_Controller {
    
    public function index(){
		$this->output->set_header('X-Frame-Options', 'ALLOW FROM http://digitalab-ssie.unam.mx/');
        $this->template->set_layout('bibmacro');
        $this->template->js('js/d3.js');
        $this->template->js('js/d3.layout.cloud.js');
        $this->template->js('assets/js/highcharts/phantomjs/highcharts8.js');
        $this->template->js('assets/js/highcharts/phantomjs/map8.js');
        $this->template->js('assets/js/highcharts/phantomjs/sunburst.js');
        $this->template->js('assets/js/highcharts/mapdata/latinoamerica.js');    
        $this->template->js('assets/js/highcharts/phantomjs/treemap8.js');
        $this->template->js('assets/js/datatables/datatables.min.js');
        $this->template->js('assets/js/datatables/input.js');
        $this->template->js('assets/js/utils/utils.js');
        $this->template->set_partial('main_js','bibmacro/mapa.js', array(), TRUE, FALSE);
        //$parse['template']['js'] = 
        //$parse['template']['partials']['utils_js'] = $this->load->view('js/utils.js', array(), TRUE);
        //$this->parser->parse('layouts/bibmacro');
        $this->template->build('bibmacro/bibmacro');
    }
    
}