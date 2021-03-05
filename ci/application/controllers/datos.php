<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require(APPPATH.'libraries/REST_Controller.php');

class Datos extends REST_Controller {
	public function __construct()
	{
		parent::__construct();
	}

	public function datosPais_get(){
		$data = array();
		$this->load->database();
		$query = "select \"paisRevistaSlug\" pais, count(\"revista\") revistas, sum(art) articulos from(" .
                            "select ve.\"paisRevistaSlug\", ve.\"revista\", count(1) art from \"mvPaisRevistaArticulo\" ve group by 1,2".
                            ") a group by \"paisRevistaSlug\"";
		
		$query = $this->db->query($query);
		
		$this->response($query->result_array(), 200);
	}
        
        public function datosRevistas_get(){
            $data = array();
            $this->load->database();
            $query = "select ve.\"revista\", ve.\"revistaSlug\", ve.\"paisRevistaSlug\" pais, count(1) art from \"mvPaisRevistaArticulo\" ve group by 1,2,3";

            $query = $this->db->query($query);

            $this->response($query->result_array(), 200);
        }
        
        public function disciplinaPais_get(){
            $data = array();
            $this->load->database();
            $query = "select ve.\"paisRevistaSlug\" pais, ve.\"disciplinaRevista\" disciplina, count(1) art from \"mvPaisRevistaArticulo\" ve group by 1,2";

            $query = $this->db->query($query);

            $this->response($query->result_array(), 200);
        }
        
        public function anioPais_get(){
            $data = array();
            $this->load->database();
            $query = "select ve.\"paisRevistaSlug\" pais, ve.\"anioRevista\" anio, count(1) art from \"mvPaisRevistaArticulo\" ve group by 1,2";

            $query = $this->db->query($query);

            $this->response($query->result_array(), 200);
        }
        
        public function frec_institucion_get($institucion='',$limit=''){
            $data = array();
            $this->load->database();
            $query = "SELECT * FROM \"mvFrecuenciaInstitucionDARP\"";
            if($institucion != '' && $institucion != 'sin')
                $query .= ' where "institucionSlug"=\''.$institucion.'\'';
            if($institucion == 'sin' && $limit != '')
                $query .= ' order by documentos desc limit ' . $limit;
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function frec_institucion_pais_get($institucion=''){
            $data = array();
            $this->load->database();
            $query = 'SELECT * FROM "mvFrecuenciaInstitucionPais"';
            if($institucion !== '')
                $query .= ' where "institucionSlug"=\''.$institucion.'\'';
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function frec_institucion_disc_get($institucion=''){
            $data = array();
            $this->load->database();
            $query = 'SELECT * FROM "mvFrecuenciaInstitucionDisciplina"';
            if($institucion !== '')
                $query .= ' where "institucionSlug"=\''.$institucion.'\'';
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function frec_institucion_autor_get($institucion='',$limit=''){
            $data = array();
            $this->load->database();
            $query = 'SELECT * FROM "mvFrecuenciaInstitucionAutor"';
            if($institucion != '' && $institucion != 'sin')
                $query .= ' where "institucionSlug"=\''.$institucion.'\'';
            if($limit != '')
                $query .= ' order by documentos desc limit ' . $limit;
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function frec_institucion_coautoria_get($institucion='',$limit=''){
            $data = array();
            $this->load->database();
            $query = 'SELECT * FROM "mvFrecuenciaInstitucionCoautoria"';
            if($institucion != '' && $institucion != 'sin')
                $query .= ' where "institucionSlug"=\''.$institucion.'\'';
            if($limit != '')
                $query .= ' order by documentos desc limit ' . $limit;
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function frec_ipdr_get($institucion){
            $data = array();
            $this->load->database();
            $query = 'SELECT t."institucionSlug", t."revistaSlug", t."paisRevistaSlug", t."disciplinaSlug", (array_agg(t."disciplinaRevista"))[1] AS "disciplinaRevista", (array_agg(t."paisRevista"))[1] AS "paisRevista", (array_agg(t.revista))[1] AS revista, (array_agg(t.institucion))[1] AS institucion, sum(t.documentos) AS documentos
                FROM ( SELECT i.slug AS "institucionSlug", (array_agg(i.institucion))[1] AS institucion, s."paisRevistaSlug", s."paisRevista", s."disciplinaRevista", s."disciplinaSlug", s."revistaSlug", s.revista, count(DISTINCT s.sistema) AS documentos
                        FROM institution i
                        JOIN "vSearchFull" s ON i.sistema::text = s.sistema::text
                        GROUP BY i.slug, s."revistaSlug", s.revista, s."paisRevistaSlug", s."paisRevista", s."disciplinaSlug", s."disciplinaRevista"
                        ORDER BY i.slug, s."revistaSlug", (count(DISTINCT s.sistema)) DESC) t
                where t."institucionSlug"=\'' . $institucion .'\'
                GROUP BY t."institucionSlug", t."revistaSlug", t."paisRevistaSlug", t."disciplinaSlug", t."disciplinaRevista"
                order by "paisRevista" asc';
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
}