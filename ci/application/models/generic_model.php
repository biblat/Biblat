<?php
error_reporting(0);
//error_reporting(E_ALL);

class Generic_model extends CI_Model { 
	public function __construct() {
		parent::__construct();
	}
	
	    /*
            * Actualiza los datos que cumplan con el $arr_where y los datos $data, sólo se usa $data_ant si se actualizará algún dato que se encuentre en el arr_where
            *
            * arr_where: arreglo de nombres de los campos where
            * data_ant : valores a biscar en el where
            */
        /*
         * Asignación SEGURA por número de revista (CLASE/PERIÓDICA, cosecha 99).
         * No se utilizan LIKE ni criterios bibliográficos omitidos.
         * Si volumen, número o parte no tienen valor, deben faltar en el JSON.
         * Esta función recibe el formato de data_valor_actualiza() del JS corregido.
         */
        public function update_asigna($tabla, $arr_where, $data, $data_ant = null) {
            $db = $this->load->database('', TRUE);

            if ($tabla !== 'article' || $data_ant !== null || !is_array($data) || count($data) === 0) {
                return array('resp'=>'error', 'mensaje'=>'Solicitud de asignación inválida.');
            }

            $actualizados = 0;
            $criterios_ultimo = array();
            $db->trans_begin();

            foreach ($data as $value) {
                if (!is_array($value)) {
                    $db->trans_rollback();
                    return array('resp'=>'error', 'mensaje'=>'El registro de asignación no es válido.');
                }

                $revista = isset($value['revista']) ? trim((string)$value['revista']) : '';
                $anio = isset($value['anioRevista']) ? (string)$value['anioRevista'] : '';
                $base = isset($value['base']) ? strtoupper(trim((string)$value['base'])) : '';
                $volumen = isset($value['volumen']) ? trim((string)$value['volumen']) : '';
                $numero = isset($value['numero']) ? trim((string)$value['numero']) : '';
                $parte = isset($value['parte']) ? trim((string)$value['parte']) : '';

                $pc = array_key_exists('asignadoPC', $value);
                $normal = array_key_exists('asignado', $value);
                if ($revista === '' || !preg_match('/^\d{4}$/', $anio) ||
                    !in_array($base, array('PER', 'CLA'), true) || ($normal === $pc) ||
                    ($volumen === '' && $numero === '' && $parte === '')) {
                    $db->trans_rollback();
                    return array('resp'=>'error', 'mensaje'=>'No hay datos suficientes para identificar un número de revista sin ambigüedad.');
                }

                $campo = $pc ? 'asignadoPC' : 'asignado';
                $estatus = $pc ? 'estatusPC' : 'estatus';
                $fecha = $pc ? 'fechaAsignadoPC' : 'fechaAsignado';
                $analista = trim((string)$value[$campo]);
                if ($analista === '') {
                    $db->trans_rollback();
                    return array('resp'=>'error', 'mensaje'=>'Es necesario seleccionar un analista o SIN.');
                }

                $sin_asignar = ($analista === 'SIN');
                $cambios = array(
                    $campo => $sin_asignar ? null : $analista,
                    $estatus => $sin_asignar ? null : 'A',
                    $fecha => $sin_asignar ? null : date('Y-m-d')
                );

                // Nunca cruza PER99 con CLA99 ni modifica los registros PER01/CLA01.
                $db->where('sistema ~ ' . $db->escape('^'.$base.'99'), null, false);
                $db->where('revista', $revista);
                $db->where('anioRevista', $anio);

                // Coincidencia literal de volúmenes reales, incluidos romanos (VXLIV).
                // Sólo los marcadores de AUSENCIA se agrupan: s/n, Ns/n, nulo, etc.
                // s/n NO equivale a cualquier número y no tocará, por ejemplo, N3.
                $valores = array('a'=>$volumen, 'b'=>$numero, 'd'=>$parte);
                foreach ($valores as $llave => $dato) {
                    // NULLIF evita errores si la descripción se guardó como texto vacío.
                    $expr = "UPPER(BTRIM(COALESCE(NULLIF(BTRIM(\"descripcionBibliografica\"::text), '')::jsonb->>'" . $llave . "', '')))";
                    $dato = strtoupper(trim((string)$dato));

                    // CORRECCIÓN: el backend ya aceptaba NS/N en BD, pero no como
                    // parámetro de búsqueda. Se añaden los alias de ausencia al WHERE.
                    $marcadores = array('', 'S/N', 'S/V', 'NS/N', 'VS/V', 'NULL');
                    if (in_array($dato, $marcadores, true)) {
                        $db->where($expr." IN ('', 'S/N', 'S/V', 'NS/N', 'VS/V', 'NULL')", null, false);
                    } else {
                        $db->where($expr.' = '.$db->escape($dato), null, false);
                    }
                }

                if ($pc) {
                    // PC permitido aunque análisis normal esté en C; respeta bloqueos.
                    $db->where("(estatus IS NULL OR estatus <> 'B')", null, false);
                    $db->where("(\"estatusPC\" IS NULL OR \"estatusPC\" NOT IN ('C','B'))", null, false);
                } else {
                    // En análisis normal, C y B quedan estrictamente protegidos.
                    $db->where("(estatus IS NULL OR estatus NOT IN ('C','B'))", null, false);
                }

                if (!$db->update('article', $cambios)) {
                    $db->trans_rollback();
                    return array('resp'=>'error', 'mensaje'=>'Ocurrió un error al actualizar los artículos.');
                }
                $filas = (int)$db->affected_rows();
                $actualizados += $filas;

                if ($filas === 0) {
                    // Diagnóstico disponible en logs de CodeIgniter si se habilita debug.
                    log_message('debug', '[ASIGNACION] Ningún artículo actualizado: ' . $db->last_query());
                }
                $criterios_ultimo = array(
                    'revista'=>$revista, 'anioRevista'=>$anio, 'base'=>$base,
                    'volumen'=>$volumen, 'numero'=>$numero, 'parte'=>$parte
                );
            }

            if ($db->trans_status() === false) {
                $db->trans_rollback();
                return array('resp'=>'error', 'mensaje'=>'No se pudo completar la transacción.');
            }
            $db->trans_commit();
            return array(
                'resp'=>'success',
                'actualizados'=>$actualizados,
                'mensaje'=>$actualizados > 0 ? 'Asignación realizada.' : 'No hubo registros elegibles para ese número de revista.',
                // Cuando no actualiza ninguno, inspecciona este campo en Network/Response.
                'criterios_sin_coincidencias'=>$actualizados === 0 ? $criterios_ultimo : null
            );
        }
        
        public function update($tabla, $arr_where, $data, $data_ant = null){
                //$this->load->database('prueba');
				$this->load->database();
		if(isset($data_ant)){
			//Acomodo de nombre de campos where con su respectivo valor a buscar
			foreach ($data_ant as $x => $value){
				foreach ($arr_where as $aw){
					$array[$aw] = $value[$aw];
				}
				$this->db->where($array);
				$this->db->update($tabla, $data[$x]);
			}
		}else{
			foreach ($data as $value){
				foreach ($arr_where as $aw){
                                    if(isset($value[$aw])){
                                        $array[$aw] = $value[$aw];
                                    }
				}
                                foreach ($value as $x => $v){
                                    if($v == ''){
                                        $value[$x] = null;
                                    }
				}
                                $this->db->where($array);
				$this->db->update($tabla, $value);
			}
		}
        }
		
		public function update_article($tabla, $arr_where, $data, $data_ant = null){
			$this->load->database();
                $this->db->trans_start();
		if(isset($data_ant)){
			//Acomodo de nombre de campos where con su respectivo valor a buscar
			foreach ($data_ant as $x => $value){
				foreach ($arr_where as $aw){
					$array[$aw] = $value[$aw];
				}
				$this->db->where($array);
				$this->db->update($tabla, $data[$x]);
			}
		}else{
			foreach ($data as $value){
				foreach ($arr_where as $aw){
                                    if(isset($value[$aw])){
                                        $array[$aw] = $value[$aw];
                                    }
				}
                                foreach ($value as $x => $v){
                                    if($v == ''){
                                        $value[$x] = null;
                                    }
                                    //Revisa si el campo es palabraClave
                                    if($x == 'palabraClave' || $x == 'keyword'){
                                        //Revisa si existe la palabra sustituye para hacer el cambio
                                        if(strpos($v, '-sustituye-') !== false){
                                            $array_palabras = json_decode($v);
                                            $new_array_palabras = array();
                                            //REvisa en cada una de las palabras
                                            foreach ($array_palabras as $xp => $p){
                                                if(strpos($p, '-sustituye-') !== false){
                                                    $divide = explode('-sustituye-', $p);
                                                    array_push($new_array_palabras, $divide[1]);
                                                    $query =    "
                                                                INSERT INTO palabras_clave (palabra, palabra_adecuada)
                                                                SELECT '".$divide[0]."', '".$divide[1]."'
                                                                WHERE NOT EXISTS (
                                                                    SELECT palabra
                                                                    FROM palabras_clave
                                                                    WHERE palabra = '".$divide[0]."' AND palabra_adecuada = '".$divide[1]."'
                                                                )
                                                                ";
                                                    echo $query;
                                                    $query = $this->db->query($query);
                                                }else{
                                                    array_push($new_array_palabras, $p);
                                                }
                                            }
                                            $value[$x] = json_encode($new_array_palabras);
                                        }
                                    }
									
									if($x == 'url' && $v == 'errata'){
                                        unset($value['url']);
                                        $query = "
                                                UPDATE article
                                                        SET url = to_jsonb(
                                                            (
                                                                SELECT jsonb_agg(elem)
                                                                FROM jsonb_array_elements(url::jsonb) AS elem
                                                                WHERE elem->>'y' NOT ILIKE '%fe de erratas%'
                                                            )
                                                        )
                                                        WHERE sistema = '".$value['sistema']."'
                                                ";
                                                $query = $this->db->query($query);
                                    }
				}
                                $this->db->where($array);
				$this->db->update($tabla, $value);
			}
		}
                $this->db->trans_complete();
        }
                
        public function update_or_insert($tabla, $arr_where, $data, $data_ant = null){
                //$this->load->database('prueba');
				$this->load->database();
		if(isset($data_ant)){
			//Acomodo de nombre de campos where con su respectivo valor a buscar
			foreach ($data_ant as $x => $value){
				foreach ($arr_where as $aw){
					$array[$aw] = $value[$aw];
				}
				$this->db->where($array);
				$this->db->update($tabla, $data[$x]);
			}
		}else{
			foreach ($data as $value){
				foreach ($arr_where as $aw){
                                    if(isset($value[$aw])){
                                        if($value[$aw] == 'sesion'){
                                            $value[$aw] = $this->session->userdata('usu_base');
                                        }
                                        $array[$aw] = $value[$aw];
                                    }
				}
                                $this->db->where($array);
                                
                                //Revisa si existe
                                $q = $this->db->get($tabla);
			
                                //Si no existe el registro hace el insert
                                if($q->num_rows() == 0){
                                    $this->db->insert($tabla, $value);
                                }else{
									$this->db->where($array);									
                                    $this->db->update($tabla, $value);
                                }
			}
		}
	}
	
	public function update_estatus($tabla, $arr_where, $data){
		//$this->load->database('prueba');
		$this->load->database();
		$this->db->trans_start();
		$usuario = $this->session->userdata('usu_base');
		
		foreach ($data as $value){
				foreach ($arr_where as $aw){
                        //No actualiza al usuario en article
                        if(isset($value[$aw]) && $aw !== 'usuario'){
                            $array[$aw] = $value[$aw];
                        }
                    }
                    
                    if( $value['usuario'] == 'EDITOR' ){
                        $usuario = 'EDITOR';
                    }
                    
                    foreach ($value as $v => $val){
                        if($v !== 'usuario'){
                            $value2[$v] = $val;
                        }
                    }
                    
                    $this->db->where($array);
                    $this->db->update($tabla, $value2);
				
				$query = 'insert into catalogador (
						"sistema","id","nombre","nivel","fecha","hora"
						) values('.
						"'".$value['sistema']."',".
						"(select max(id)+1 from catalogador where sistema='".$value['sistema']."'),".
						"'".$usuario."',".
						"10,".
						"NOW()::timestamp::date,".
						"LOCALTIME(0))";
				
				$query = $this->db->query($query);
		}
		
		$this->db->trans_complete();
	}
   
	public function insert($tabla, $data){
                //$this->load->database('prueba');
				$this->load->database();
		foreach ($data as $x => $value){
			$this->db->insert($tabla, $value);
		}
	}
        
        public function update_function($tabla, $arr_where, $data, $columna, $columna_fn, $funcion){
                //$this->load->database('prueba');
				$this->load->database();
		foreach ($columna as $x => $value){
                    foreach ($arr_where as $y => $aw){
			$array[$aw] = $data[$y][$aw];
                    }
                    $this->db->where($array);
                    $this->db->set($columna[$x], $funcion . '(' . $columna_fn[$x] . ')', FALSE);
                    $this->db->update($tabla);
		}
	}
	
	/*
	*	Hace el select de la $tabla que cumpla con las condiciones $arr_where y $data
	*	Si no existe resultado realiza el insert de $data
	*
	*/
	
	public function insert_if_ne($tabla, $arr_where, $data){
                //$this->load->database('prueba');
				$this->load->database();
		//Acomodo de nombre de campos where con su respectivo valor a buscar
		foreach ($data as $x => $value){
                    
			// IMPORTANTE: nuevo WHERE para cada artículo
			$array = array();
			
			foreach ($arr_where as $aw){
				$array[$aw] = $value[$aw];
			}
			$this->db->where($array);
			$q = $this->db->get($tabla);
			
			//Si no existe el registro hace el insert
			if($q->num_rows() == 0){
                            $this->db->insert($tabla, $value);
			}
		}
	}
        
        public function insert_if_ne_article($tabla, $arr_where, $data){
                $this->load->database();
                $query = "select '99' || lpad((cast(max(substring(sistema,6)) as  int)+1)::text,9,'0') as sistema from article";
                $query = $this->db->query($query);
                $res = $query->result_array();
                $sistema = $res[0]['sistema'];
            
                $this->db->trans_start();
				//Acomodo de nombre de campos where con su respectivo valor a buscar
				foreach ($data as $x => $value){
                    
                    // IMPORTANTE: nuevo WHERE para cada artículo
                    $array = array();
                    $volumen = '';
                    $numero = '';
    
                    foreach ($arr_where as $aw){

                        /*
                         * descripcionBibliografica requiere tratamiento especial.
                         * Sólo utilizamos:
                         *
                         * a = volumen
                         * b = número
                         *
                         * No usamos páginas, mes, suplemento, etc.
                         */
                        if ($aw === 'descripcionBibliografica') {

                            if (
                                isset($value[$aw]) &&
                                $value[$aw] !== '' &&
                                $value[$aw] !== null
                            ) {

                                $descripcion = json_decode($value[$aw], true);

                                if (
                                    json_last_error() === JSON_ERROR_NONE &&
                                    is_array($descripcion)
                                ) {

                                    if (
                                        isset($descripcion['a']) &&
                                        $descripcion['a'] !== ''
                                    ) {
                                        $volumen = trim((string)$descripcion['a']);
                                    }

                                    if (
                                        isset($descripcion['b']) &&
                                        $descripcion['b'] !== ''
                                    ) {
                                        $numero = trim((string)$descripcion['b']);
                                    }
                                }
                            }

                            continue;
                        }

                        /*
                         * Campos normales del WHERE
                         */
                        if (
                            isset($value[$aw]) &&
                            $value[$aw] !== '' &&
                            $value[$aw] !== null
                        ) {
                            $array[$aw] = $value[$aw];
                        }
                    }
                    $this->db->where($array);
                    
                    /*
                    * Comparación de volumen y número dentro del JSON
                    *
                    * descripcionBibliografica:
                    * {
                    *     "a": "V24",
                    *     "b": "N2",
                    *     "e": "P106-112"
                    * }
                    */
                   if ($volumen !== '') {

                       $this->db->where(
                           "\"descripcionBibliografica\"->>'a' = " .
                           $this->db->escape($volumen),
                           null,
                           false
                       );
                   }

                   if ($numero !== '') {

                       $this->db->where(
                           "\"descripcionBibliografica\"->>'b' = " .
                           $this->db->escape($numero),
                           null,
                           false
                       );
                   }
				   
                    $q = $this->db->get($tabla);
                    
			
                    //Si no existe el registro hace el insert
                    if($q->num_rows() == 0){
                            $sistema = $sistema + 1;
                            $data[$x]['sistema'] = $data[$x]['base'] . $sistema;
                            
                            $query = 'insert into article (
                                    "sistema","revista","articulo","issn","doi","paisRevista","idioma","ciudadEditora","institucionEditora","anioRevista",
                                    "descripcionBibliografica","articuloIdiomas","resumen","idiomaResumen","disciplinaRevista","palabraClave","keyword","fechaIngreso","url"
                                    ) values('.
                                    (($data[$x]['sistema'] == '') ? "null," : "'".$data[$x]['sistema']."',").
                                    (($data[$x]['revista'] == '') ? "null," : "'".$this->limpia($data[$x]['revista'])."',").
                                    (($data[$x]['articulo'] == '') ? "null," : "'".$this->limpia($data[$x]['articulo'])."',").
                                    (($data[$x]['issn'] == '') ? "null," : "'".$data[$x]['issn']."',").
                                    (($data[$x]['doi'] == '') ? "null," : "'".$data[$x]['doi']."',").
                                    (($data[$x]['paisRevista'] == '') ? "null," : "'".$data[$x]['paisRevista']."',").
                                    (($data[$x]['idioma'] == '') ? "null," : "'".$data[$x]['idioma']."',").
                                    (($data[$x]['ciudadEditora'] == '') ? "null," : "'".$data[$x]['ciudadEditora']."',").
                                    (($data[$x]['institucionEditora'] == '') ? "null," : "'".$data[$x]['institucionEditora']."',").
                                    (($data[$x]['anioRevista'] == '') ? "null," : "'".$data[$x]['anioRevista']."',").
                                    (($data[$x]['descripcionBibliografica'] == '') ? "null," : "'".$data[$x]['descripcionBibliografica']."',").
                                    (($data[$x]['articuloIdiomas'] == '') ? "null," : "'".$data[$x]['articuloIdiomas']."',").
                                    (($data[$x]['resumen'] == '') ? "null," : "'".$data[$x]['resumen']."',").
                                    (($data[$x]['idiomaResumen'] == '') ? "null," : "'".$data[$x]['idiomaResumen']."',").
                                    (($data[$x]['disciplinaRevista'] == '') ? "null," : "'".$data[$x]['disciplinaRevista']."',").
                                    (($data[$x]['palabraClave'] == '') ? "null," : "'".$this->limpia($data[$x]['palabraClave'])."',").
                                    (($data[$x]['keyword'] == '') ? "null," : "'".$this->limpia($data[$x]['keyword'])."',").
                                    "NOW()::timestamp::date,".
                                    //(($data[$x]['fechaIngreso'] == '') ? "null," : "'".$data[$x]['fechaIngreso']."',").
                                    (($data[$x]['url'] == '') ? "null)" : "'".$data[$x]['url']."')");

                            $query = $this->db->query($query);
                            
                             $query = 'insert into catalogador (
                                    "sistema","id","nombre","nivel","fecha","hora"
                                    ) values('.
                                    (($data[$x]['sistema'] == '') ? "null," : "'".$data[$x]['sistema']."',").
                                    "1,".
                                    "'OJS',".
                                    "10,".
                                    "NOW()::timestamp::date,".
                                    "LOCALTIME(0))";
                            
                             $query = $this->db->query($query);
                            
                            $arr_inst = array();
                            
                            foreach($data[$x]['autores'] as $a => $autor){
                                $query = 'insert into author ("sistema", "id", "nombre", "email", "institucionId", "orcid") 
                                            values('.
                                            "'".$data[$x]['sistema']."',".
                                            $autor['id'].",".
                                            (($autor['nombre'] == '') ? "null," : "'".$autor['nombre']."',").
                                            (($autor['mail'] == '') ? "null," : "'".$autor['mail']."',").
                                            (($autor['id_inst'] == '') ? "null," : "'".$this->limpia($autor['id_inst'])."',").
                                            (($autor['orcid'] == '') ? "null)" : "'".$autor['orcid']."')");
                                
                                $query = $this->db->query($query);
                                
                                if(isset($autor['id_inst']) && $autor['id_inst'] !== '' && !in_array( $autor['id_inst'], $arr_inst)){
                                    array_push($arr_inst, $autor['id_inst']);

                                    $query = 'insert into institution ("sistema", "id", "institucion") 
                                                values('.
                                                "'".$data[$x]['sistema']."',".
                                                $autor['id_inst'].",".
                                                (($autor['institucion'] == '') ? "null)" : "'".$autor['institucion']."')");

                                    $query = $this->db->query($query);
                                }
                            }

                    }
		}
                $this->db->trans_complete();
	}
        
        public function insert_if_ne_new_article($tabla, $arr_where, $data){
                //$this->load->database('prueba');
				$this->load->database();
                $query = "select '99' || lpad((cast(max(substring(sistema,6)) as  int)+1)::text,9,'0') as sistema from article";
                $query = $this->db->query($query);
                $res = $query->result_array();
                $sistema = $res[0]['sistema'];
            
                $this->db->trans_start();
		//Acomodo de nombre de campos where con su respectivo valor a buscar
		foreach ($data as $x => $value){
                    foreach ($arr_where as $aw){
                        if($value[$aw] !== '')
                            $array[$aw] = $value[$aw];
                    }
                    $this->db->where($array);
                    $q = $this->db->get($tabla);
                    
			
                    //Si no existe el registro hace el insert
                    if($q->num_rows() == 0){
                            $sistema = $sistema + 1;
                            $data[$x]['sistema'] = $data[$x]['base'] . $sistema;
                            
                            $usuario = 'DESC';
                            if( $data[$x]['usuario'] == 'sesion' || $data[$x]['usuario'] == 'EDITOR'){
                                $usuario = $this->session->userdata('usu_base');
                            }
                            
                            $query = 'insert into article (
                                    "sistema","revista","articulo","issn","doi","paisRevista","idioma","ciudadEditora","institucionEditora","anioRevista",
                                    "descripcionBibliografica","articuloIdiomas","resumen","idiomaResumen","disciplinaRevista","palabraClave","keyword","fechaIngreso",
                                    "estatus", "asignado","url"
                                    ) values('.
                                    (($data[$x]['sistema'] == '') ? "null," : "'".$data[$x]['sistema']."',").
                                    (($data[$x]['revista'] == '') ? "null," : "'".$this->limpia($data[$x]['revista'])."',").
                                    (($data[$x]['articulo'] == '') ? "null," : "'".$this->limpia($data[$x]['articulo'])."',").
                                    (($data[$x]['issn'] == '') ? "null," : "'".$data[$x]['issn']."',").
                                    (($data[$x]['doi'] == '') ? "null," : "'".$data[$x]['doi']."',").
                                    (($data[$x]['paisRevista'] == '') ? "null," : "'".$data[$x]['paisRevista']."',").
                                    (($data[$x]['idioma'] == '') ? "null," : "'".$data[$x]['idioma']."',").
                                    (($data[$x]['ciudadEditora'] == '') ? "null," : "'".$data[$x]['ciudadEditora']."',").
                                    (($data[$x]['institucionEditora'] == '') ? "null," : "'".$data[$x]['institucionEditora']."',").
                                    (($data[$x]['anioRevista'] == '') ? "null," : "'".$data[$x]['anioRevista']."',").
                                    (($data[$x]['descripcionBibliografica'] == '') ? "null," : "'".$data[$x]['descripcionBibliografica']."',").
                                    (($data[$x]['articuloIdiomas'] == '') ? "null," : "'".$data[$x]['articuloIdiomas']."',").
                                    (($data[$x]['resumen'] == '') ? "null," : "'".$data[$x]['resumen']."',").
                                    (($data[$x]['idiomaResumen'] == '') ? "null," : "'".$data[$x]['idiomaResumen']."',").
                                    (($data[$x]['disciplinaRevista'] == '') ? "null," : "'".$data[$x]['disciplinaRevista']."',").
                                    (($data[$x]['palabraClave'] == '') ? "null," : "'".$this->limpia($data[$x]['palabraClave'])."',").
                                    (($data[$x]['keyword'] == '') ? "null," : "'".$this->limpia($data[$x]['keyword'])."',").
                                    "NOW()::timestamp::date, 'A','".$usuario."',".
                                    //(($data[$x]['fechaIngreso'] == '') ? "null," : "'".$data[$x]['fechaIngreso']."',").
                                    (($data[$x]['url'] == '') ? "null)" : "'".$data[$x]['url']."')");

                            $query = $this->db->query($query);
							
							if( $data[$x]['usuario'] == 'EDITOR' ){
                                $usuario = 'EDITOR';
                            }
                            
                             $query = 'insert into catalogador (
                                    "sistema","id","nombre","nivel","fecha","hora"
                                    ) values('.
                                    (($data[$x]['sistema'] == '') ? "null," : "'".$data[$x]['sistema']."',").
                                    "1,".
                                    "'".$usuario."',".
                                    "10,".
                                    "NOW()::timestamp::date,".
                                    "LOCALTIME(0))";
                            
                             $query = $this->db->query($query);
                            
                            $arr_inst = array();							
                    }
		}
                $this->db->trans_complete();
	}
	
	/*
	*	Realiza primero un select de la columna $columns_res, de la tabla $tabla_where cumpliendo con las condiciones $arr_where y los valores $data_where
	*	Hace el insert en $tabla_insert del registro $data_insert donde se cumpla con el valor obtenido de la columna $columns_res y que cumpla con las condiciones $arr_where y $data_insert
	*	
	*/
	public function insert_after_select	($tabla_where, $arr_where, $data_where, $columns_res, $tabla_insert, $arr_where_insert, $data_insert){
                //$this->load->database('prueba');
				$this->load->database();
		//Acomodo de nombre de campos where con su respectivo valor a buscar
		foreach ($data_where as $x => $value){
			//Obtiene el valor de la columna indicada, este valor sirve de referencia para saber en que registro se hace el insert
			foreach ($arr_where as $aw){
				$array[$aw] = $value[$aw];
			}
			$this->db->reset_query();
			$this->db->select($columns_res);
			$this->db->where($array);
			$consulta = $this->db->get($tabla_where);
			$res_where = $consulta->result_array();
			
			//select del valor resultado en la tabla insert para saber si ya existe el valor
			//se asignan además las columnas indicadas en $arr_where_insert
			$this->db->reset_query();
			$this->db->select($columns_res);
			foreach ($arr_where_insert as $awi){
				$array2[$awi] = $data_insert[$x][$awi];
			}
			$array2[$columns_res] = $res_where[0][$columns_res];
			$this->db->where($array2);
			$res_column = $this->db->get($tabla_insert);
			//Si no existe el registro hace el insert
			if($res_column->num_rows() == 0){
				$this->db->reset_query();
				$data_insert[$x][$columns_res] = $res_where[0][$columns_res];
				$this->db->insert($tabla_insert, $data_insert[$x]);
			}else{
				$this->db->reset_query();
				$this->db->where($array2);
				$this->db->update($tabla_insert, $data_insert[$x]);
			}
		}
	}
	
	public function delete($tabla, $arr_where, $data){
                //$this->load->database('prueba');
				$this->load->database();
		foreach ($data as $value){
			foreach ($arr_where as $aw){
                                echo $value[$aw];
				$array[$aw] = $value[$aw];
			}
			$this->db->where($array);
			$this->db->delete($tabla);
		}
	}
	
	public function insert_bitacora($movimiento, $sistema='', $tiempo){
		$usuario = $this->session->userdata('usu_base');
		$hora = 'LOCALTIME(0)';
		$this->load->database();
		$query = 'insert into bitacora (
						"usuario", "sistema", "movimiento", "fecha", "tiempo"
						) values('.
						"'".$usuario."',".
						"'".$sistema."',".
						"'".$movimiento."',".
						"NOW()::timestamp::date,".
						"'".$tiempo."'".
						")";
		$query = $this->db->query($query);
	}

	public function limpia($string){
		$string = str_replace('\"', '"', $string);
		$string = str_replace("'", "''", $string);
		return $string;
	}
	
	    /*
        * ============================================================
        * CORRECCIONES - Métodos para Generic_model.php
        * ============================================================
        */

       private function corr_null($valor){
           if($valor === null) return null;

           if(is_string($valor)){
               $valor = trim($valor);
               return $valor === '' ? null : $valor;
           }

           return $valor;
       }

       private function corr_lista_limpia($lista){
           $out = array();

           foreach((array)$lista as $v){
               if(is_array($v) || is_object($v)) continue;

               $v = trim((string)$v);
               if($v !== ''){
                   $out[] = $v;
               }
           }

           return array_values($out);
       }

       private function corr_idioma_codigo($idioma){
           $mapa = array(
               'español' => 'spa',
               'ingles' => 'eng',
               'inglés' => 'eng',
               'portugues' => 'por',
               'portugués' => 'por',
               'frances' => 'fre',
               'francés' => 'fre',
               'italiano' => 'ita',
               'aleman' => 'ger',
               'alemán' => 'ger',
               'ruso' => 'rus'
           );

           $idioma = trim((string)$idioma);
           $llave = mb_strtolower($idioma, 'UTF-8');

           return isset($mapa[$llave])
               ? $mapa[$llave]
               : $idioma;
       }

       public function guardar_correccion($payload, $usuario){
           $db = $this->load->database('prueba', TRUE);

           $sistema = isset($payload['sistema'])
               ? trim((string)$payload['sistema'])
               : '';

           if($sistema === ''){
               throw new Exception('Falta el número de sistema.');
           }

           $qActual = $db->query(
               'SELECT * FROM article WHERE sistema = ? LIMIT 1',
               array($sistema)
           );

           if(!$qActual || $qActual->num_rows() === 0){
               throw new Exception('El artículo no existe.');
           }

           $actual = $qActual->row_array();

           $entrada = (
               isset($payload['article']) &&
               is_array($payload['article'])
           ) ? $payload['article'] : array();

           /*
            * Campos escalares que sí pueden corregirse.
            * Deliberadamente NO se incluyen:
            * sistema, estatus, asignado, fechaAsignado,
            * estatusPC, asignadoPC, fechaAsignadoPC, fechaIngreso.
            */
           $permitidos = array(
               'revista',
               'articulo',
               'issn',
               'doi',
               'paisRevista',
               'idioma',
               'ciudadEditora',
               'institucionEditora',
               'anioRevista',
               'notaGeneral',
               'idiomaResumen',
               'disciplinaRevista',
               'sistemaErrata',
               'scieloid'
           );

           $article = array();

           foreach($permitidos as $campo){
               if(array_key_exists($campo, $entrada)){
                   $article[$campo] = $this->corr_null($entrada[$campo]);
               }
           }

           $dspace_set = false;
            $dspace_valor = null;

            if(array_key_exists('DSpace', $entrada)){
                $dspace_set = true;

                if($entrada['DSpace'] === '' || $entrada['DSpace'] === null){
                    $dspace_valor = null;
                }else{
                    $dspace_valor = (
                        $entrada['DSpace'] === true ||
                        $entrada['DSpace'] === 1 ||
                        $entrada['DSpace'] === '1' ||
                        $entrada['DSpace'] === 'true' ||
                        $entrada['DSpace'] === 't'
                    );
                }
            }

           /*
            * =========================================================
            * descripcionBibliografica
            * No se expone JSON. Conservamos cualquier clave desconocida
            * que ya existiera y sólo editamos a-e.
            * =========================================================
            */
           $desc = json_decode(
               isset($actual['descripcionBibliografica'])
                   ? $actual['descripcionBibliografica']
                   : '',
               true
           );
           if(!is_array($desc)) $desc = array();

           $mapDesc = array(
               'volumen'=>'a',
               'numero'=>'b',
               'mes'=>'c',
               'parte'=>'d',
               'paginas'=>'e'
           );

           foreach($mapDesc as $campo=>$clave){
               if(!array_key_exists($campo, $entrada)) continue;

               $v = trim((string)$entrada[$campo]);

               if($v === ''){
                   unset($desc[$clave]);
               }else{
                   $desc[$clave] = $v;
               }
           }

           $article['descripcionBibliografica'] =
               count($desc) > 0
               ? json_encode($desc, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
               : null;

           /*
            * =========================================================
            * documento
            * Conserva claves desconocidas, edita sólo a.
            * =========================================================
            */
           $documento = json_decode(
               isset($actual['documento']) ? $actual['documento'] : '',
               true
           );
           if(!is_array($documento)) $documento = array();

           if(array_key_exists('tipoDocumento', $entrada)){
               $tipoDoc = trim((string)$entrada['tipoDocumento']);

               if($tipoDoc === ''){
                   unset($documento['a']);
               }else{
                   $documento['a'] = $tipoDoc;
               }
           }

           $article['documento'] =
               count($documento) > 0
               ? json_encode($documento, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
               : null;

           /*
            * =========================================================
            * resumen
            * Conserva claves adicionales y actualiza a/i/p/o.
            * =========================================================
            */
           $resumen = json_decode(
               isset($actual['resumen']) ? $actual['resumen'] : '',
               true
           );
           if(!is_array($resumen)) $resumen = array();

           $mapResumen = array(
               'resumenEspanol'=>'a',
               'resumenIngles'=>'i',
               'resumenPortugues'=>'p',
               'resumenOtro'=>'o'
           );

           foreach($mapResumen as $campo=>$clave){
               if(!array_key_exists($campo, $entrada)) continue;

               $v = trim((string)$entrada[$campo]);

               if($v === ''){
                   unset($resumen[$clave]);
               }else{
                   $resumen[$clave] = $v;
               }
           }

           $article['resumen'] =
               count($resumen) > 0
               ? json_encode($resumen, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
               : null;

           /*
            * Títulos traducidos.
            */
           $titulos = array();
           foreach(
               isset($payload['titulosTraducidos'])
                   ? (array)$payload['titulosTraducidos']
                   : array()
               as $r
           ){
               if(!is_array($r)) continue;

               $titulo = trim((string)(
                   isset($r['titulo']) ? $r['titulo'] : ''
               ));
               $idioma = trim((string)(
                   isset($r['idioma']) ? $r['idioma'] : ''
               ));

               if($titulo === '') continue;

               $fila = array('a'=>$titulo);
               if($idioma !== ''){
                   $fila['y'] = $this->corr_idioma_codigo($idioma);
               }

               $titulos[] = $fila;
           }

           $article['articuloIdiomas'] =
               count($titulos) > 0
               ? json_encode($titulos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
               : null;

           /*
            * Listas simples.
            */
           $disciplinas = $this->corr_lista_limpia(
               isset($payload['disciplinas']) ? $payload['disciplinas'] : array()
           );
           $subdisciplinas = $this->corr_lista_limpia(
               isset($payload['subdisciplinas']) ? $payload['subdisciplinas'] : array()
           );
           $palabras = $this->corr_lista_limpia(
               isset($payload['palabrasClave']) ? $payload['palabrasClave'] : array()
           );
           $keywords = $this->corr_lista_limpia(
               isset($payload['keywords']) ? $payload['keywords'] : array()
           );

           $article['disciplinas'] = count($disciplinas)
               ? json_encode($disciplinas, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
               : null;

           $article['subdisciplinas'] = count($subdisciplinas)
               ? json_encode($subdisciplinas, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
               : null;

           $article['palabraClave'] = count($palabras)
               ? json_encode($palabras, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
               : null;

           $article['keyword'] = count($keywords)
               ? json_encode($keywords, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
               : null;

           /*
            * URLs. La descripción se conserva como texto libre porque en la base
            * existen variantes como Texto completo, Fe de erratas, Original, etc.
            */
           $urls = array();

           foreach(
               isset($payload['urls'])
                   ? (array)$payload['urls']
                   : array()
               as $r
           ){
               if(!is_array($r)) continue;

               $url = trim((string)(
                   isset($r['url']) ? $r['url'] : ''
               ));
               $tipo = trim((string)(
                   isset($r['tipo']) ? $r['tipo'] : ''
               ));

               if($url === '') continue;

               $fila = array('u'=>$url);
               if($tipo !== ''){
                   $fila['y'] = $tipo;
               }

               $urls[] = $fila;
           }

           $article['url'] = count($urls)
               ? json_encode($urls, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
               : null;

           /*
            * Instituciones y autores.
            */
           $instituciones = (
               isset($payload['instituciones']) &&
               is_array($payload['instituciones'])
           ) ? $payload['instituciones'] : array();

           $autores = (
               isset($payload['autores']) &&
               is_array($payload['autores'])
           ) ? $payload['autores'] : array();

           $corporativo = !empty($payload['corporativo']);

           $tiempo = isset($payload['tiempo'])
               ? max(0, (int)$payload['tiempo'])
               : 0;

           $db->trans_begin();

           try{
               $db->set('fechaActualizado', 'NOW()', false);

                /*
                 * PostgreSQL requiere TRUE/FALSE reales para columnas boolean.
                 * CodeIgniter convertiría un boolean PHP a 1/0 si se manda
                 * dentro del arreglo $article.
                 */
                if($dspace_set){
                    if($dspace_valor === null){
                        $db->set('DSpace', 'NULL', false);
                    }else{
                        $db->set(
                            'DSpace',
                            $dspace_valor ? 'TRUE' : 'FALSE',
                            false
                        );
                    }
                }

                $db->where('sistema', $sistema);

                if(!$db->update('article', $article)){
                    throw new Exception('No fue posible actualizar el artículo.');
                }

               $db->where('sistema', $sistema)->delete('author');
               $db->where('sistema', $sistema)->delete('institution');
               $db->where('sistema', $sistema)->delete('author_coorp');

               if($corporativo){
                   foreach($instituciones as $i=>$r){
                       if(!is_array($r)) continue;

                       $row = array(
                           'sistema'=>$sistema,
                           'id'=>isset($r['id']) && (int)$r['id'] > 0
                               ? (int)$r['id']
                               : ($i+1),
                           'institucion'=>$this->corr_null(
                               isset($r['institucion']) ? $r['institucion'] : null
                           ),
                           'dependencia'=>$this->corr_null(
                               isset($r['dependencia']) ? $r['dependencia'] : null
                           ),
                           'pais'=>$this->corr_null(
                               isset($r['pais']) ? $r['pais'] : null
                           )
                       );

                       if(!$db->insert('author_coorp', $row)){
                           throw new Exception(
                               'No fue posible guardar el autor corporativo.'
                           );
                       }
                   }

                   $db->query(
                       'UPDATE author_coorp
                        SET slug = slug(institucion),
                            "paisSlug" = slug(pais)
                        WHERE sistema = ?',
                       array($sistema)
                   );
               }else{
                   foreach($instituciones as $i=>$r){
                       if(!is_array($r)) continue;

                       $row = array(
                           'sistema'=>$sistema,
                           'id'=>isset($r['id']) && (int)$r['id'] > 0
                               ? (int)$r['id']
                               : ($i+1),
                           'institucion'=>$this->corr_null(
                               isset($r['institucion']) ? $r['institucion'] : null
                           ),
                           'dependencia'=>$this->corr_null(
                               isset($r['dependencia']) ? $r['dependencia'] : null
                           ),
                           'ciudad'=>$this->corr_null(
                               isset($r['ciudad']) ? $r['ciudad'] : null
                           ),
                           'pais'=>$this->corr_null(
                               isset($r['pais']) ? $r['pais'] : null
                           )
                       );

                       if(!$db->insert('institution', $row)){
                           throw new Exception(
                               'No fue posible guardar una institución.'
                           );
                       }
                   }

                   $db->query(
                       'UPDATE institution
                        SET slug = slug(institucion),
                            "paisInstitucionSlug" = slug(pais)
                        WHERE sistema = ?',
                       array($sistema)
                   );

                   foreach($autores as $i=>$r){
                       if(!is_array($r)) continue;

                       $iid = isset($r['institucionId'])
                           ? trim((string)$r['institucionId'])
                           : '';

                       $row = array(
                           'sistema'=>$sistema,
                           'id'=>isset($r['id']) && (int)$r['id'] > 0
                               ? (int)$r['id']
                               : ($i+1),
                           'nombre'=>$this->corr_null(
                               isset($r['nombre']) ? $r['nombre'] : null
                           ),
                           'email'=>$this->corr_null(
                               isset($r['email']) ? $r['email'] : null
                           ),
                           'institucionId'=>$iid === ''
                               ? null
                               : (int)$iid,
                           'orcid'=>$this->corr_null(
                               isset($r['orcid']) ? $r['orcid'] : null
                           )
                       );

                       if(!$db->insert('author', $row)){
                           throw new Exception(
                               'No fue posible guardar un autor.'
                           );
                       }
                   }

                   $db->query(
                       'UPDATE author SET slug = slug(nombre)
                        WHERE sistema = ?',
                       array($sistema)
                   );
               }

               /*
                * La corrección queda auditada sin tocar el flujo editorial.
                */
               $db->set('usuario', $usuario);
               $db->set('sistema', $sistema);
               $db->set('movimiento', 'Corrección');
               $db->set('fecha', 'CURRENT_DATE', false);
               $db->set('tiempo', $tiempo);

               if(!$db->insert('bitacora')){
                   throw new Exception(
                       'No fue posible registrar la corrección en bitácora.'
                   );
               }

               if($db->trans_status() === FALSE){
                   throw new Exception(
                       'La transacción no pudo completarse.'
                   );
               }

               $db->trans_commit();
               return array('sistema'=>$sistema);

           }catch(Exception $e){
               $db->trans_rollback();
               throw $e;
           }
       }
	   
}