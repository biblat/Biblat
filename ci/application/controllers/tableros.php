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
    }
    
    public function metametrics(){
        $data = array();
        $data['page_title'] = _('Estadísticas de uso');
        $this->template->set_layout('default_sel');
        $this->template->title(_('Tablero Metametrics'));
        $data['page_subtitle'] = _('Ranking MetaMetrics');
        $this->template->set_meta('description', _('MetaMetrics'));
        $this->template->set_partial('main_js', 'tableros/metametrics.js', array(), TRUE, FALSE);
        $this->template->build('tableros/metametrics', $data);
    }
    
    public function nucleorevistas(){
        $data = array();
        $data['page_title'] = _('Núcleo central de revistas');
        $this->template->set_layout('default_sel');
        $this->template->title(_('Núcleo central de revistas'));
        //$data['page_subtitle'] = _('Ranking MetaMetrics');
        $this->template->set_meta('description', _('Núcleo central de revistas'));
        $this->template->set_partial('main_js', 'tableros/nucleo_revistas.js', array(), TRUE, FALSE);
        $this->template->build('tableros/nucleo_revistas', $data);
    }
	
	public function redes_investigacion(){
        $data = array();
        $data['page_title'] = _('Redes de investigación');
        $this->template->set_layout('default_sel');
        $this->template->title(_('Redes de investigación'));
        $this->template->set_meta('description', _('Redes de investigación'));
        $this->template->build('tableros/redes_investigacion', $data);
    }
    
    public function dictaminacion(){
        $data = array();
        $data['page_title'] = _('Monitor Latinoamericano de Dictaminadores');
        $this->template->set_layout('default_sel');
        $this->template->title(_('Monitor Latinoamericano de Dictaminadores'));
        $this->template->set_meta('description', _('Monitor Latinoamericano de Dictaminadores'));
        $this->template->build('tableros/dictaminacion', $data);
    }
	
	public function geoimpacto() {
        /*$path = 'assets/maps/regional.html';
        if (file_exists($path)) {
            $this->output
                ->set_content_type('text/html')
                ->set_output(file_get_contents($path));
        } else {
            show_404();
        }*/
		$data = array();
        $data['page_title'] = _('Geoimpacto territorial');
        $this->template->set_layout('default_sel');
        $this->template->title(_('Geoimpacto territorial'));
        $this->template->set_meta('description', _('Geoimpacto territorial'));
        $this->template->build('tableros/geoimpacto', $data);
    }
	
	public function geoimpacto_mapa() {
        $path = 'assets/maps/regional.html';
        if (file_exists($path)) {
            $this->output
                ->set_content_type('text/html')
                ->set_output(file_get_contents($path));
        } else {
            show_404();
        }
    }
    
    public function get_nucleo(){
        $this->load->database();
        $query = '
        with conteo as (

		with revistas as(
		select 
		case when 
		slug(a.revista) in (select slug from revistas_scielo) or 
		a.issn in (select issn from revistas_scielo) or
			a.issn in (select issn2 from revistas_scielo)
			then
		\'Scielo-BIBLAT\'
		else
		\'BIBLAT\'
		end as coleccion,
		case when
		substring(a.sistema,1,3) = \'CLA\' then
		\'CLASE\'
		else
		\'PERIÓDICA\'
		end as base, 
		a.issn, 
		a.revista,
		slug(a.revista) slug, 
		a."paisRevista", 
		a."anioRevista", 
		a."disciplinaRevista"
		from article a
		where slug(a.revista) in (
					select rev from (
						select rev, count(1) num from(
							select distinct slug(revista) rev, "anioRevista" from article
							where "anioRevista" in (
								(SELECT EXTRACT(\'Year\' FROM CURRENT_DATE)-5)::text,
								(SELECT EXTRACT(\'Year\' FROM CURRENT_DATE)-4)::text,
								(SELECT EXTRACT(\'Year\' FROM CURRENT_DATE)-3)::text,
								(SELECT EXTRACT(\'Year\' FROM CURRENT_DATE)-2)::text,
								(SELECT EXTRACT(\'Year\' FROM CURRENT_DATE)-1)::text
							)
						)a group by 1
					)b where num >= 5
				)
		and
		a."anioRevista" in (
			(SELECT EXTRACT(\'Year\' FROM CURRENT_DATE)-5)::text,
			(SELECT EXTRACT(\'Year\' FROM CURRENT_DATE)-4)::text,
			(SELECT EXTRACT(\'Year\' FROM CURRENT_DATE)-3)::text,
			(SELECT EXTRACT(\'Year\' FROM CURRENT_DATE)-2)::text,
			(SELECT EXTRACT(\'Year\' FROM CURRENT_DATE)-1)::text
			)
		)
		select
			max(revista) revista,
			max(issn) issn,
			"anioRevista" anio,
			coleccion,
			base,
			slug,
			max("paisRevista") pais,
			max("disciplinaRevista") disciplina,
			count(1) docs
		from revistas r
		group by coleccion, base, slug, "anioRevista"
			)

        select  
                max(revista) revista,
                max(issn) issn,
                max(coleccion) coleccion,
                max(base) base,
                slug,
                max(pais) pais,
                max(disciplina) disciplina,
                MAX(docs) FILTER (WHERE anio = (EXTRACT(\'Year\' FROM CURRENT_DATE) - 5)::text) AS anio1,
                MAX(docs) FILTER (WHERE anio = (EXTRACT(\'Year\' FROM CURRENT_DATE) - 4)::text) AS anio2,
                MAX(docs) FILTER (WHERE anio = (EXTRACT(\'Year\' FROM CURRENT_DATE) - 3)::text) AS anio3,
                MAX(docs) FILTER (WHERE anio = (EXTRACT(\'Year\' FROM CURRENT_DATE) - 2)::text) AS anio4,
                MAX(docs) FILTER (WHERE anio = (EXTRACT(\'Year\' FROM CURRENT_DATE) - 1)::text) AS anio5
        from conteo c
        group by
            slug
        order by 1';
        $query = $this->db->query($query);
        
        $myarray = array();
        foreach ($query->result_array() as $row)
        {
            $myarray[] = $row;
        }

        echo json_encode($myarray);
    }
}