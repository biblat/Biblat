<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require(APPPATH.'libraries/REST_Controller.php');

class Datos extends REST_Controller {
	public function __construct()
	{
		parent::__construct();
		header('Content-Type: application/json');
	}

	public function datosPais_get(){
		$data = array();
		$this->load->database();
		$query = "select \"paisRevistaSlug\" pais, count(distinct slug(\"revista\")) revistas, sum(art) articulos from(" .
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
                        JOIN "mvSearch" s ON i.sistema::text = s.sistema::text
                        GROUP BY i.slug, s."revistaSlug", s.revista, s."paisRevistaSlug", s."paisRevista", s."disciplinaSlug", s."disciplinaRevista"
                        ORDER BY i.slug, s."revistaSlug", (count(DISTINCT s.sistema)) DESC) t
                where t."institucionSlug"=\'' . $institucion .'\'
                GROUP BY t."institucionSlug", t."revistaSlug", t."paisRevistaSlug", t."disciplinaSlug", t."disciplinaRevista"
                order by "paisRevista" asc';
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function tabla_get($tabla){
            if($tabla){
		$data = array();
		$biblatDB = $this->load->database('biblat', TRUE);
                $query = $biblatDB->get($tabla); 
		$this->response($query->result_array(), 200);
            }
            
            $this->response(NULL, 200);
	}
        
        public function revista_num_get($revista='',$anio=''){
            $data = array();
            $this->load->database();
            $query = 'WITH numeros AS (
                        SELECT max(article.revista::text) AS revista,
                        slug(article.revista) AS "revistaSlug",
                        article."anioRevista",
                        CASE
                            WHEN (article."descripcionBibliografica" ->> \'a\'::text) IS NULL THEN \'s/v\'::text
                            WHEN btrim(article."descripcionBibliografica" ->> \'a\'::text) = \'\'::text THEN \'s/v\'::text
                            ELSE replace(replace(upper(article."descripcionBibliografica" ->> \'a\'::text), \'V\'::text, \'\'::text), \'"\'::text, \'\'::text)
                        END AS volumen,
                        CASE
                            WHEN (article."descripcionBibliografica" ->> \'b\'::text) IS NULL THEN \'\'::text
                            WHEN btrim(article."descripcionBibliografica" ->> \'b\'::text) = \'\'::text THEN \'\'::text
                        ELSE replace(replace(upper(article."descripcionBibliografica" ->> \'b\'::text), \'N\'::text, \'\'::text), \'"\'::text, \'\'::text)
                        END AS numero,
                        CASE
                            WHEN (article."descripcionBibliografica" ->> \'d\'::text) IS NULL THEN \'\'::text
                            WHEN btrim(article."descripcionBibliografica" ->> \'d\'::text) = \'\'::text THEN \'\'::text
                            WHEN upper(article."descripcionBibliografica" ->> \'d\'::text) ~ \'P.*-\'::text THEN \'\'::text
                        ELSE replace(replace(article."descripcionBibliografica" ->> \'d\'::text, \'"\'::text, \'\'::text), \' \'::text, \'\'::text)
                        END AS parte
                        FROM article
                        WHERE article."anioRevista" IS NOT NULL and slug(article.revista) = \''.$revista.'\' and article."anioRevista" = \''.$anio.'\'
                        GROUP BY (slug(article.revista)), article."anioRevista", (
                        CASE
                            WHEN (article."descripcionBibliografica" ->> \'a\'::text) IS NULL THEN \'s/v\'::text
                            WHEN btrim(article."descripcionBibliografica" ->> \'a\'::text) = \'\'::text THEN \'s/v\'::text
                            ELSE replace(replace(upper(article."descripcionBibliografica" ->> \'a\'::text), \'V\'::text, \'\'::text), \'"\'::text, \'\'::text)
                        END), (
                        CASE
                            WHEN (article."descripcionBibliografica" ->> \'b\'::text) IS NULL THEN \'\'::text
                            WHEN btrim(article."descripcionBibliografica" ->> \'b\'::text) = \'\'::text THEN \'\'::text
                            ELSE replace(replace(upper(article."descripcionBibliografica" ->> \'b\'::text), \'N\'::text, \'\'::text), \'"\'::text, \'\'::text)
                        END), (
                        CASE
                            WHEN (article."descripcionBibliografica" ->> \'d\'::text) IS NULL THEN \'\'::text
                            WHEN btrim(article."descripcionBibliografica" ->> \'d\'::text) = \'\'::text THEN \'\'::text
                            WHEN upper(article."descripcionBibliografica" ->> \'d\'::text) ~ \'P.*-\'::text THEN \'\'::text
                            ELSE replace(replace(article."descripcionBibliografica" ->> \'d\'::text, \'"\'::text, \'\'::text), \' \'::text, \'\'::text)
                        END)
                    ORDER BY (slug(article.revista)), article."anioRevista", (
                          CASE
                              WHEN (article."descripcionBibliografica" ->> \'a\'::text) IS NULL THEN \'s/v\'::text
                              WHEN btrim(article."descripcionBibliografica" ->> \'a\'::text) = \'\'::text THEN \'s/v\'::text
                              ELSE replace(replace(upper(article."descripcionBibliografica" ->> \'a\'::text), \'V\'::text, \'\'::text), \'"\'::text, \'\'::text)
                          END), (NULLIF(regexp_replace(
                          CASE
                              WHEN (article."descripcionBibliografica" ->> \'b\'::text) IS NULL THEN \'\'::text
                              WHEN btrim(article."descripcionBibliografica" ->> \'b\'::text) = \'\'::text THEN \'\'::text
                              ELSE replace(replace(upper(article."descripcionBibliografica" ->> \'b\'::text), \'N\'::text, \'\'::text), \'"\'::text, \'\'::text)
                          END, \'\D\'::text, \'\'::text, \'g\'::text), \'\'::text)::numeric), (
                          CASE
                              WHEN (article."descripcionBibliografica" ->> \'d\'::text) IS NULL THEN \'\'::text
                              WHEN btrim(article."descripcionBibliografica" ->> \'d\'::text) = \'\'::text THEN \'\'::text
                              WHEN upper(article."descripcionBibliografica" ->> \'d\'::text) ~ \'P.*-\'::text THEN \'\'::text
                              ELSE replace(replace(article."descripcionBibliografica" ->> \'d\'::text, \'"\'::text, \'\'::text), \' \'::text, \'\'::text)
                          END)
                            )
                     SELECT 
                        numeros."anioRevista",
                        ARRAY_AGG(
                            CASE WHEN numeros.parte <> \'\' THEN
                                \'V\' || numeros.volumen || \'N\' || numeros.numero || \' \' || numeros.parte
                            ELSE
                                \'V\' || numeros.volumen || \'N\' || numeros.numero || numeros.parte
                            END
                        ) as numero
                       FROM numeros
                       group by numeros."anioRevista"';
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
		public function revista_estatus_get(){
            $data = array();
            //$this->load->database('prueba');
			$this->load->database();
            //and (estatus is null or (estatus <> \'C\' and estatus <> \'B\'))
            $query = 'SELECT max(article.revista::text) AS revista, max("paisRevista") pais, max(substr(article.sistema,1,3)) as base, 
                        case
                            when scieloid is not null then \'SciELO\'
                        else
                            \'OJS\'
                        end as cosecha,
                        max(asignado) as asignado, max("fechaIngreso") as fecha, max("fechaAsignado") as fecha_asignado,
                        max(substr("fechaIngreso",1,4)) as anio, max(substr("fechaIngreso",6,2)) as mes, 
                        max(article.estatus) as estatus,
                        max("asignadoPC") as asignado_pc, max("fechaAsignadoPC") as fecha_asignado_pc, max("estatusPC") as estatus_pc,
                        slug(article.revista) AS "revistaSlug",
                        article."anioRevista",
                        max(g.estatus) palabras_clave,
                        count(g.palabrasclaveia) analizados,
						count(case when ((url->0->>\'y\' like \'%PDF%\') or (url->1->>\'y\' like \'%PDF%\')) then 1 end) conpdf,
                        count(case when ((url->0->>\'y\' like \'%HTML%\') or (url->1->>\'y\' like \'%HTML%\')) then 1 end) conhtml,
                        CASE
                            WHEN (article."descripcionBibliografica" ->> \'a\'::text) IS NULL THEN \'s/v\'::text
                            WHEN btrim(article."descripcionBibliografica" ->> \'a\'::text) = \'\'::text THEN \'s/v\'::text
                            ELSE replace(replace(upper(article."descripcionBibliografica" ->> \'a\'::text), \'V\'::text, \'\'::text), \'"\'::text, \'\'::text)
                        END AS volumen,
                        CASE
                            WHEN (article."descripcionBibliografica" ->> \'b\'::text) IS NULL THEN \'\'::text
                            WHEN btrim(article."descripcionBibliografica" ->> \'b\'::text) = \'\'::text THEN \'\'::text
                        ELSE replace(replace(upper(article."descripcionBibliografica" ->> \'b\'::text), \'N\'::text, \'\'::text), \'"\'::text, \'\'::text)
                        END AS numero,
                        CASE
                            WHEN (article."descripcionBibliografica" ->> \'d\'::text) IS NULL THEN \'\'::text
                            WHEN btrim(article."descripcionBibliografica" ->> \'d\'::text) = \'\'::text THEN \'\'::text
                            WHEN upper(article."descripcionBibliografica" ->> \'d\'::text) ~ \'P.*-\'::text THEN \'\'::text
                        ELSE replace(replace(article."descripcionBibliografica" ->> \'d\'::text, \'"\'::text, \'\'::text), \' \'::text, \'\'::text)
                        END AS parte, count(1) articulos
                        FROM article
                        LEFT JOIN genera_pc g on article.sistema = g.sistema
                        WHERE article."anioRevista" IS NOT NULL and article.sistema ~ \'^(CLA|PER)99.*\' 
						
                        GROUP BY (slug(article.revista)), article."anioRevista", cosecha, (
                        CASE
                            WHEN (article."descripcionBibliografica" ->> \'a\'::text) IS NULL THEN \'s/v\'::text
                            WHEN btrim(article."descripcionBibliografica" ->> \'a\'::text) = \'\'::text THEN \'s/v\'::text
                            ELSE replace(replace(upper(article."descripcionBibliografica" ->> \'a\'::text), \'V\'::text, \'\'::text), \'"\'::text, \'\'::text)
                        END), (
                        CASE
                            WHEN (article."descripcionBibliografica" ->> \'b\'::text) IS NULL THEN \'\'::text
                            WHEN btrim(article."descripcionBibliografica" ->> \'b\'::text) = \'\'::text THEN \'\'::text
                            ELSE replace(replace(upper(article."descripcionBibliografica" ->> \'b\'::text), \'N\'::text, \'\'::text), \'"\'::text, \'\'::text)
                        END), (
                        CASE
                            WHEN (article."descripcionBibliografica" ->> \'d\'::text) IS NULL THEN \'\'::text
                            WHEN btrim(article."descripcionBibliografica" ->> \'d\'::text) = \'\'::text THEN \'\'::text
                            WHEN upper(article."descripcionBibliografica" ->> \'d\'::text) ~ \'P.*-\'::text THEN \'\'::text
                            ELSE replace(replace(article."descripcionBibliografica" ->> \'d\'::text, \'"\'::text, \'\'::text), \' \'::text, \'\'::text)
                        END)
                    ORDER BY (slug(article.revista)), article."anioRevista", (
                          CASE
                              WHEN (article."descripcionBibliografica" ->> \'a\'::text) IS NULL THEN \'s/v\'::text
                              WHEN btrim(article."descripcionBibliografica" ->> \'a\'::text) = \'\'::text THEN \'s/v\'::text
                              ELSE replace(replace(upper(article."descripcionBibliografica" ->> \'a\'::text), \'V\'::text, \'\'::text), \'"\'::text, \'\'::text)
                          END), (NULLIF(regexp_replace(
                          CASE
                              WHEN (article."descripcionBibliografica" ->> \'b\'::text) IS NULL THEN \'\'::text
                              WHEN btrim(article."descripcionBibliografica" ->> \'b\'::text) = \'\'::text THEN \'\'::text
                              ELSE replace(replace(upper(article."descripcionBibliografica" ->> \'b\'::text), \'N\'::text, \'\'::text), \'"\'::text, \'\'::text)
                          END, \'\D\'::text, \'\'::text, \'g\'::text), \'\'::text)::numeric), (
                          CASE
                              WHEN (article."descripcionBibliografica" ->> \'d\'::text) IS NULL THEN \'\'::text
                              WHEN btrim(article."descripcionBibliografica" ->> \'d\'::text) = \'\'::text THEN \'\'::text
                              WHEN upper(article."descripcionBibliografica" ->> \'d\'::text) ~ \'P.*-\'::text THEN \'\'::text
                              ELSE replace(replace(article."descripcionBibliografica" ->> \'d\'::text, \'"\'::text, \'\'::text), \' \'::text, \'\'::text)
                          END)';
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function avance_get($anio=null){
            $data = array();
            $this->load->database();
            
            if($anio == null){
                $txtAnio = 'extract(year from c.fecha) = extract(year from CURRENT_DATE)';
            }else{
                $txtAnio = 'extract(year from c.fecha) = ' . $anio;
            }
            
            $query = "
                    with registros as (
                        select 
                        distinct a.sistema,
                        asignado, estatus, nombre
                        from article a
                        inner join
                        catalogador c
                        on a.sistema = c.sistema
                        where 
                        (
                            c.nombre in ('OJS', 'SciELO')
                            and
                            estatus in ('A', 'R')
                        )
                        or
                        (
                            c.nombre <> 'OJS' and c.nombre <> 'SciELO'
                            and
                            estatus in ('C', 'B')
                            and
                            "
                            .$txtAnio.
                            "
                        )
                    )
                    select 
                        r.asignado analista, max(r.nombre) nombre,
                        (select count(1) from registros where asignado = r.asignado) total,
                        (select count(1) from registros where asignado = r.asignado and estatus ='R') revision,
                        (select count(1) from registros where asignado = r.asignado and estatus ='C') completados,
                        (select count(1) from registros where asignado = r.asignado and estatus ='B') borrados
                    from registros r
                    group by r.asignado
                    ";
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function avancepc_get($anio=null){
            $data = array();
            $this->load->database();
            
            if($anio == null){
                $txtAnio = 'extract(year from c.fecha) = extract(year from CURRENT_DATE)';
            }else{
                $txtAnio = 'extract(year from c.fecha) = ' . $anio;
            }
            
            $query = "
                    with registros as (
                        select 
                        distinct a.sistema,
                        \"asignadoPC\" asignado, \"estatusPC\" estatus, nombre
                        from article a
                        inner join
                        catalogador c
                        on a.sistema = c.sistema
                        where 
                        (
                            \"estatusPC\" in ('A', 'R')
                        )
                        or
                        (
                            \"estatusPC\" in ('C', 'B')
                            and
                            "
                            .$txtAnio.
                            "
                        )
                    )
                    select 
                        r.asignado analista, max(r.nombre) nombre,
                        (select count(1) from registros where asignado = r.asignado) total,
                        (select count(1) from registros where asignado = r.asignado and estatus ='R') revision,
                        (select count(1) from registros where asignado = r.asignado and estatus ='C') completados,
                        (select count(1) from registros where asignado = r.asignado and estatus ='B') borrados
                    from registros r
                    group by r.asignado
                    ";
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function avance_total_get($anio=null) {
            $data = array();
            $this->load->database();
            
            if($anio == null){
                $txtAnio = 'extract(year from c.fecha) = extract(year from CURRENT_DATE)';
            }else{
                $txtAnio = 'extract(year from c.fecha) = ' . $anio;
            }
            
            $query = "
                    with registros as (
                        select 
                        extract(Month from c.fecha) mes, estatus
                        from article a
                        inner join
                        catalogador c
                        on a.sistema = c.sistema
                        where 
                        (
                            estatus in ('C')
							and 
							c.id=2
							and
							c.nombre <> 'OJS' and c.nombre <> 'SciELO'
							and
                            "
                            .$txtAnio.
                            "
                        )
						or
						(
							estatus is null
							and
							c.nombre is not null
							and
							c.id = 1
							and
							c.nombre <> 'OJS' and c.nombre <> 'SciELO'
                            and
                            "
                            .$txtAnio.
                            "
						)
                    )
                    select 
                        r.mes, count(1) total
                    from registros r
                    group by r.mes
                    order by r.mes
                ";
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function articulos_get(){
            $data = array();
            //$this->load->database('prueba');
			$this->load->database();
			
            $usuario = $this->session->userdata('usu_base');
            $query = '
                        select
                            distinct
                            a.sistema,
                            revista,
                            "anioRevista" 
                            || coalesce("descripcionBibliografica"->>\'a\', \'\') 
                            || coalesce("descripcionBibliografica"->>\'b\', \'\')
                            || coalesce(\' - \' || ("descripcionBibliografica"->>\'d\')::text, \'\') numero,
                            issn,
                            coalesce(articulo, \'SIN TÍTULO\') as articulo,
                            url->0->>\'u\' url1,
                            url->1->>\'u\' url2,
                            estatus,
                            case when "asignadoPC" <> \''.$usuario.'\' then null else "estatusPC" end as "estatusPC",
                            "fechaAsignado",
                            case when "asignadoPC" <> \''.$usuario.'\' then null else "fechaAsignadoPC" end as "fechaAsignadoPC",
                            case when estatus = \'C\' then extract(month from fecha) end as mes,
                            case when "estatusPC" = \'C\' and "asignadoPC" = \''.$usuario.'\' then extract(month from fecha) else null end as "mesPC",
                            fecha
                        from article a
                        inner join
                        catalogador c
                        on a.sistema = c.sistema
                        where
                        (
                        (
                            estatus in (\'A\', \'R\')
                            and 
                            c.nombre in (\'OJS\', \'SciELO\')
                        )
                        or
                        (
                            (
                            estatus in (\'A\', \'R\', \'C\', \'B\')
                            or
                            "estatusPC" in (\'A\', \'C\')
                            )
                            and
                            c.nombre <> \'OJS\' and c.nombre <> \'SciELO\'
                            and
                            extract(year from c.fecha) = extract(year from CURRENT_DATE)
                        )
                        )
                        and c.id = (select max(id) from catalogador where sistema = a.sistema)
                        and ( asignado = \''.$usuario.'\' or "asignadoPC" = \''.$usuario.'\' )
                        and a.sistema ~ \'^(PER|CLA)99\'
                        order by 1
                    ';
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function autores_get($sistema){
            $data = array();
            //$this->load->database('prueba');
			$this->load->database();
            
            $query = "
                        select
                            sistema,
                            id,
                            nombre,
                            orcid,
                            \"institucionId\",
                            email
                        from author
                        where sistema = '".$sistema."'
                        order by 1
                    ";
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function instituciones_get($sistema){
            $data = array();
            //$this->load->database('prueba');
			$this->load->database();
            
            $query = "
                        select
                            sistema,
                            id,
                            institucion,
                            dependencia,
                            ciudad,
                            pais,
                            0 as corporativo
                        from institution
                        where sistema = '".$sistema."'
                        union
                        select
                            sistema,
                            id,
                            institucion,
                            dependencia,
                            '' as ciudad,
                            pais,
                            1 as corporativo
                        from author_coorp
                        where sistema = '".$sistema."'
                        order by 1
                    ";
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function documento_get($sistema){
            $data = array();
            //$this->load->database('prueba');
			$this->load->database();
			
            $query = '
                        select 
                            coalesce(articulo, \'SIN TÍTULO\') as articulo,
                            doi,
                            idioma,
                            estatus,
                            "estatusPC",
                            documento->>\'a\' tipo_documento,
                            case when "articuloIdiomas"->>0 is not null then
                                    case when "articuloIdiomas"->0->>\'y\' = \'spa\' then
                                            \'Español\'
                                    when "articuloIdiomas"->0->>\'y\' = \'esp\' then
                                            \'Español\'
                                    when "articuloIdiomas"->0->>\'y\' = \'eng\' then
                                            \'Inglés\'
                                    when "articuloIdiomas"->0->>\'y\' = \'por\' then
                                            \'Portugués\'
                                    else
                                            \'Otro\'
                                    end
                            else
                                    null
                            end idioma2,
                            case when "articuloIdiomas"->>0 is not null then
                                    "articuloIdiomas"->0->>\'a\'
                            else
                                    null
                            end titulo2,
                            case when "articuloIdiomas"->>1 is not null then
                                    case when "articuloIdiomas"->1->>\'y\' = \'spa\' then
                                            \'Español\'
                                    when "articuloIdiomas"->1->>\'y\' = \'esp\' then
                                            \'Español\'
                                    when "articuloIdiomas"->1->>\'y\' = \'eng\' then
                                            \'Inglés\'
                                    when "articuloIdiomas"->1->>\'y\' = \'por\' then
                                            \'Portugués\'
                                    else
                                            \'Otro\'
                                    end
                            else
                                    null
                            end idioma3,
                            case when "articuloIdiomas"->>1 is not null then
                                    "articuloIdiomas"->1->>\'a\'
                            else
                                    null
                            end titulo3,
                            case when resumen->>\'a\' is not null then
                                    resumen->>\'a\'
                            else
                                    null
                            end "Resumen español",
                            case when resumen->>\'i\' is not null then
                                    resumen->>\'i\'
                            else
                                    null
                            end "Resumen inglés",
                            case when resumen->>\'p\' is not null then
                                    resumen->>\'p\'
                            else
                                    null
                            end "Resumen portugués",

                            case when disciplinas->>0 is not null then
                                    disciplinas->>0
                            else
                                    null
                            end disciplina1,
                            case when disciplinas->>1 is not null then
                                    disciplinas->>1
                            else
                                    null
                            end disciplina2,
                            case when disciplinas->>2 is not null then
                                    disciplinas->>2
                            else
                                    null
                            end disciplina3,

                            case when "subdisciplinas"->>0 is not null then
                                    "subdisciplinas"->>0
                            else
                                    null
                            end subdisciplina1,
                            case when "subdisciplinas"->>1 is not null then
                                    "subdisciplinas"->>1
                            else
                                    null
                            end subdisciplina2,
                            case when "subdisciplinas"->>2 is not null then
                                    "subdisciplinas"->>2
                            else
                                    null
                            end subdisciplina3,
                            "palabraClave",
                            "keyword",
                            case when url->0 is not null then
                                    case when url->0->>\'y\' like \'%PDF%\' then
                                            \'pdf\'
                                    else
                                            \'html\'
                                    end
                            else
                                    null
                            end tipourl1,

                            case when url->0 is not null then
                                    url->0->>\'u\'
                            else
                                    null
                            end url1,

                            case when url->1 is not null then
                                    case when url->1->>\'y\' like \'%PDF%\' then
                                            \'pdf\'
                                    else
                                            \'html\'
                                    end
                            else
                                    null
                            end tipourl2,

                            case when url->1 is not null then
                                    url->1->>\'u\'
                            else
                                    null
                            end url2,
                            
                            "notaGeneral",
                            "sistemaErrata",
                            (Select a2.articulo from article a2 where a2.sistema = a1."sistemaErrata") original,
                            (Select a2."notaGeneral" from article a2 where a2.sistema = a1."sistemaErrata") nota_original,
                            
                            case when "descripcionBibliografica"->>\'a\' is not null then "descripcionBibliografica"->>\'a\' else \'\' end ||
                            case when "descripcionBibliografica"->>\'b\' is not null then "descripcionBibliografica"->>\'b\' else \'\' end ||
                            case when "descripcionBibliografica"->>\'c\' is not null then "descripcionBibliografica"->>\'c\' else \'\' end ||
                            case when "descripcionBibliografica"->>\'e\' is not null then \', \' || ("descripcionBibliografica"->>\'e\')::text else \'\' end as descripcion

                            from article where sistema = \''.$sistema.'\'
                        ';
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function ciudad_by_pais_get($pais){
            $data = array();
            //$this->load->database('prueba');
			$this->load->database();
            
            /*
            $query = "
                    select 
                        slug(ciudad) slug,
                        max(ciudad) ciudad
                    from institution 
                    where 
                        \"paisInstitucionSlug\" = slug('".$pais."') and ciudad is not null group by 1 order by 1
            ";*/
            
            $query = "
                    select 
                        ciudad, count(1)
                    from institution 
                    where 
                        \"paisInstitucionSlug\" = slug('".urldecode($pais)."') and ciudad is not null group by ciudad order by 1
            ";
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function ciudad_by_institucion_get($institucion){
            $data = array();
            //$this->load->database('prueba');
			$this->load->database();
            $query = "
                    select 
                        ciudad, count(1)
                    from institution 
                    where 
                        slug = slug('".urldecode($institucion)."') and ciudad is not null group by ciudad order by 1
            ";
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function institucion_by_pais_get($pais, $corporativo){
            $data = array();
            //$this->load->database('prueba');
			$this->load->database();

            if($corporativo == 0){
                $query = "
                        select 
                            institucion, count(1)
                        from institution 
                        where 
                            \"paisInstitucionSlug\" = slug('".urldecode($pais)."') and institucion is not null group by institucion order by 1
                ";
            }else{
                $query = "
                        select 
                            institucion, count(1)
                        from author_coorp 
                        where 
                            \"paisSlug\" = slug('".urldecode($pais)."') and institucion is not null group by institucion order by 1
                ";
            }
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function dependencia_by_institucion_get($institucion, $corporativo){
            $data = array();
            //$this->load->database('prueba');
			$this->load->database();
            
            if($corporativo == 0){
                $query = "
                        select 
                            dependencia, count(1)
                        from institution 
                        where 
                            slug = slug('".urldecode($institucion)."') and dependencia is not null group by dependencia order by 1
                ";
            }else{
                $query = "
                        select 
                            dependencia, count(1)
                        from author_coorp 
                        where 
                            slug = slug('".urldecode($institucion)."') and dependencia is not null group by dependencia order by 1
                ";
            }
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function autor_by_nombre_get($nombre, $sistema){
            $data = array();
            //$this->load->database('prueba');
			$this->load->database();
            
            $query = "
                        select 
                        a.nombre,
                        coalesce(a.orcid, 'Sin ORCID') orcid,
                        coalesce(i.institucion, '') || coalesce( ' - ' || i.dependencia, '') || ': ' || coalesce(i.pais || '; ', '') || coalesce(i.ciudad, '') institucion,
                        count(1)
                        from author a 
                        inner join 
                        institution i
                        on a.sistema = i.sistema and a.\"institucionId\" = i.id
                        where 
                        a.sistema <> '".$sistema."' 
                        and a.slug like replace(slug('".urldecode($nombre)."'),'-','%')
                        group by 1,2,3
            ";
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }									  
		public function allrevistas_get(){
            $data = array();
            //$this->load->database('prueba');
			$this->load->database();
            
            //select max(revista) revista from article where revista is not null group by slug(revista) order by 1
            
            $query = "          
                        select max(revista) revista from \"mvNumerosRevista\" where revista is not null group by slug(revista) order by 1
            ";
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
        
        public function revistas_articulo_by_nombre_get($nombre=null){
            $data = array();
            //$this->load->database('prueba');
			$this->load->database();
            
            if(!isset($nombre)){
                $nombre = $this->session->userdata('usu_base');
            }
            
            $query = "
                with asignadas as(					
                    select * from article where asignado is not null
                )
                select 
                    json_agg(distinct revista) revistas 
                from 
                    asignadas 
                where
                    asignado = '".$nombre."'
            ";
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);  
        }
        
        public function revistas_by_nombre_get($nombre=null){
            $data = array();
            //$this->load->database('prueba');
			$this->load->database();
            
            if(!isset($nombre)){
                $nombre = $this->session->userdata('usu_base');
            }
            
            //array_to_json(revistas) revistas
            $query = "
                select 
                    revistas
                from 
                    usuario_revista
                where 
                    usuario = '".$nombre."'
            ";
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);  
        }
		
		public function palabras_get(){
            $data = array();
            $this->load->database();
            $query = "
                        select valor, num from mvpalabrasclave
            ";
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);  
        }
        
        public function keywords_get(){
            $data = array();
            $this->load->database();
            $query = "
                        select valor, num from mvkeywords
            ";
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);  
        }
        
        public function palabras_sustituye_get(){
            $data = array();
            $this->load->database();
            $query = '
                        SELECT palabra, palabra_adecuada
                        FROM palabras_clave
            ';
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);  
        }
        
        public function vacio_get(){
            $data = array();
            $this->load->database();
            $query = "select 'biblat'";
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);  
        }
		
		public function produccion_get($mes, $anio){
            $data = array();
            $this->load->database();
            $query = "
                        with agrupado as( 
                            with reg as(
                                    select distinct c.sistema, id, case when c.id=1 then nombre||',ALEPH' else nombre end nombre, nivel, max(fecha) fecha, 1 num from catalogador c 
                                    inner join article a on a.sistema = c.sistema
                                    where
                                    c.nombre not in ('OJS', 'SciELO')
                                    and
                                        (
                                                (
                                                        a.estatus in ('C')
                                                        and 
                                                        c.id=2
                                                        and
                                                        c.nombre <> 'OJS' and c.nombre <> 'SciELO'
                                                )
                                                or
                                                (
                                                        a.estatus is null
                                                        and
                                                        c.nombre is not null
                                                        and
                                                        c.id = 1
                                                )
                                        )
                                    and
                                    extract(month from c.fecha) in (".$mes.") 
                                    and 
                                    extract(year from c.fecha) = ".$anio."
                                    group by 1,2,3,4,6

                                    union

                                    select distinct c.sistema, id, nombre, nivel, max(fecha) fecha, 2 num from catalogador c 
                                    inner join article a on a.sistema = c.sistema
                                    where
                                    c.nombre in ('OJS', 'SciELO')
                                    and
                                        (
                                                (
                                                        a.estatus in ('C')
                                                        and 
                                                        c.id=2
                                                        and
                                                        c.nombre <> 'OJS' and c.nombre <> 'SciELO'
                                                )
                                                or
                                                (
                                                        a.estatus is null
                                                        and
                                                        c.nombre is not null
                                                        and
                                                        c.id = 1
                                                )
                                        )
                                    and
                                    extract(month from c.fecha) in (".$mes.") 
                                    and 
                                    extract(year from c.fecha) = ".$anio."
                                    group by 1,2,3,4,6

                                    union
                                    
                                    select distinct sistema, id, nombre, nivel, max(fecha) fecha, 2 num from catalogador 
                                    where id=1 
                                    and nombre in ('OJS', 'SciELO') 
                                    and
                                    sistema not in (select sistema from article where estatus in ('B','R','A'))
                                    and sistema in (select sistema from catalogador where id=2 and nombre not in ('OJS', 'SciELO')  and extract(month from fecha) in (".$mes.") and extract(year from fecha) = ".$anio.")
                                    group by 1,2,3,4,6
                                    order by num
                            )
                            select 
                             replace(replace(replace(ARRAY_AGG(nombre)::text,'{',''),'}',''),'\"','') nombre,
                             COUNT(reg.sistema) filter (where reg.sistema like 'CLA%') clase,
                             COUNT(reg.sistema) filter (where reg.sistema like 'PER%') periodica 
                             from reg
                             group by sistema
                            )
                            select 
                                    nombre,
                                    COUNT(clase) filter (where a.clase > 0) clase,
                                    COUNT(periodica) filter (where a.periodica > 0) periodica
                            from agrupado a
                            group by nombre
                            order by nombre
            ";
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);  
        }
		
		public function produccion_analista_get($mes, $anio){
            $data = array();
            $this->load->database();
            $query = "
                        with agrupado as( 
                            with reg as(
                                    select distinct c.sistema, id, case when c.id=1 then nombre ||' - ALEPH' else nombre ||' - BIBLAT CENTRAL' end nombre, nivel, max(fecha) fecha, 1 num from catalogador c 
                                    inner join article a on a.sistema = c.sistema
                                    where
                                    c.nombre not in ('OJS', 'SciELO')
                                    and
                                        (
                                                (
                                                        a.estatus in ('C')
                                                        and 
                                                        c.id=2
                                                        and
                                                        c.nombre <> 'OJS' and c.nombre <> 'SciELO'
                                                )
                                                or
                                                (
                                                        a.estatus is null
                                                        and
                                                        c.nombre is not null
                                                        and
                                                        c.id = 1
                                                )
                                        )
                                    and
                                    extract(month from c.fecha) in (".$mes.") 
                                    and 
                                    extract(year from c.fecha) = ".$anio."
                                    group by 1,2,3,4,6
                            )
                            select 
                             replace(replace(replace(ARRAY_AGG(nombre)::text,'{',''),'}',''),'\"','') nombre,
                             COUNT(reg.sistema) filter (where reg.sistema like 'CLA%') clase,
                             COUNT(reg.sistema) filter (where reg.sistema like 'PER%') periodica 
                             from reg
                             group by sistema
                            )
                            select 
                                    nombre,
                                    COUNT(clase) filter (where a.clase > 0) clase,
                                    COUNT(periodica) filter (where a.periodica > 0) periodica,
									COUNT(clase) filter (where a.clase > 0) + COUNT(periodica) filter (where a.periodica > 0) total
                            from agrupado a
                            group by nombre
                            order by nombre
            ";
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);  
        }
		
		public function produccionpc_get($mes, $anio){
            $data = array();
            $this->load->database();
            $query = "
                        with agrupado as( 
                            with reg as(
                                    select distinct c.sistema, nombre, max(fecha) fecha, 1 num from catalogador c  
                                    inner join article a on a.sistema = c.sistema and c.nombre = a.\"asignadoPC\"
                                    where
                                    a.\"estatusPC\" in ('C')
                                    and
                                    extract(month from c.fecha) in (".$mes.") 
                                    and 
                                    extract(year from c.fecha) = ".$anio."
                                    group by 1,2
                            )
                            select 
                             replace(replace(ARRAY_AGG(nombre)::text,'{',''),'}','') nombre,
                             COUNT(reg.sistema) filter (where reg.sistema like 'CLA%') clase,
                             COUNT(reg.sistema) filter (where reg.sistema like 'PER%') periodica 
                             from reg
                             group by sistema
                            )
                            select 
                                    nombre,
                                    COUNT(clase) filter (where a.clase > 0) clase,
                                    COUNT(periodica) filter (where a.periodica > 0) periodica
                            from agrupado a
                            group by nombre
                            order by nombre
            ";
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);  
        }
        
        public function tiempo_produccion_get($mes, $anio){
            $data = array();
            $this->load->database();
            $query = "
                        select sistema, max(usuario) usuario, max(fecha) fecha, sum(tiempo) tiempo
                        from bitacora where movimiento <> 'Recarga'
                        and extract(month from fecha) = ".$mes." and extract(year from fecha) = ".$anio."
                        group by sistema order by 3,2,4
                    ";
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);  
        }
		
		public function tiempo_produccionpc_get($mes, $anio){
            $data = array();
            $this->load->database();
            $query = "
                        select sistema, max(usuario) usuario, max(fecha) fecha, sum(tiempo) tiempo
                        from bitacora where (movimiento <> 'Recarga' and movimiento ~ 'PC$')
                        and extract(month from fecha) = ".$mes." and extract(year from fecha) = ".$anio."
                        group by sistema order by 3,2,4
                    ";
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);  
        }
		
		public function tabla_by_user_get($tabla){
            $data = array();
            $this->load->database();
            $usuario = $this->session->userdata('usu_base');
            $query = "
                select * from ".$tabla." where usuario = '".$usuario."'
            ";
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);  
		}
		
		public function estatus_palabras_get($id){
            $data = array();
            $this->load->database();
            $query = "
                select count(1) analizados, max(estatus) estatus from genera_pc where id= '".$id."'
            ";
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);  
		}
        
        public function tabla_by_campo_get($tabla, $campo, $valor){
            $data = array();
            $this->load->database();
            if( $this->session->userdata('usu_base') ){
                $query = '
                    select * from "'.$tabla.'" where "'.$campo.'" = \''.$valor.'\'
                ';

                $query = $this->db->query($query);
                $this->response($query->result_array(), 200);  
            }
		}
			
		public function hevila_get(){
            if (in_array($_SERVER['REMOTE_ADDR'], unserialize(IPS)) || in_array($_SERVER['HTTP_X_REAL_IP'], unserialize(IPS))){
                // Inicializamos un array para la salida
				$output = [];

				// Ejecutar el comando 'find' con exec() y almacenar la salida en $output
				exec('find /var/www/html/hevila -type f', $output, $return_var);

				// Si $output no está vacío y el comando se ejecutó correctamente
				if ($return_var === 0 && !empty($output)) {
					// Procesar manualmente la salida: eliminar valores vacíos, si los hubiera
					$output_cleaned = array_filter($output, function($value) {
						return !empty($value); // Remover entradas vacías
					});

					// Construir manualmente la cadena JSON
					$json_output = '[';
					foreach ($output_cleaned as $index => $file) {
						// Escapar caracteres especiales y agregar comillas
						$json_output .= '"' . addslashes($file) . '"';
						// Si no es el último elemento, añadir una coma
						if ($index < count($output_cleaned) - 1) {
							$json_output .= ',';
						}
					}
					$json_output .= ']';

					// Establecer el tipo de contenido como JSON
					header('Content-Type: application/json');

					// Imprimir la salida en formato JSON
					echo $json_output;
				} else {
					// Si hubo algún error o no se encontró ningún archivo
					echo '{"error": "No se encontraron archivos o hubo un error en la ejecución."}';
				}
            }
        }

		public function cierraconecciones_get(){
            $this->load->database();
            $query = "
                SELECT pg_terminate_backend(pid)
                FROM pg_stat_activity
                WHERE datname = 'claper'
                AND pid <> pg_backend_pid()
                AND 
				(
					state = 'idle' or 
					now() - backend_start > interval '5 minutes'
				)
            ";
            
            $this->db->query($query);
            
            $this->db->close();
        }
		
		public function titulos_get($base, $titulo){
            $this->load->database();
            $query = "
                select 
                    sistema, 
                    articulo,
                    case when url->0->>'u' is not null then url->0->>'u' else '' end url1,
                    case when url->0->>'y' is not null then url->0->>'y' else '' end tipo1,
                    case when url->1->>'u' is not null then url->1->>'u' else '' end url2,
                    case when url->1->>'y' is not null then url->1->>'y' else '' end tipo2
                    from article where slug(articulo) like '%'||'".$titulo."'||'%' and sistema ~ '^".$base."' order by articulo
            ";
            
            $query = $this->db->query($query);
            $this->response($query->result_array(), 200);
        }
}