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
	public function update_asigna($tabla, $arr_where, $data, $data_ant = null){
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
                                $datos_json = [];
                                $json = false;
				foreach ($arr_where as $aw){
                                    if($aw == 'volumen'){
                                        if(isset($value['volumen'])){
                                            $datos_json['a'] = $value['volumen'];
                                            unset($value['volumen']);
                                             $json = true;
                                        }
                                    }
                                    if($aw == 'numero'){
                                        if(isset($value['numero'])){
                                            $datos_json['b'] = $value['numero'];
                                            unset($value['numero']);
                                            $json = true;
                                        }
                                    }
                                    if($aw == 'parte'){
                                        if(isset($value['parte'])){
                                            $datos_json['d'] = $value['parte'];
                                            unset($value['parte']);
                                            $json = true;
                                        }
                                    }
                                    
                                    if(isset($value[$aw])){
                                        $array[$aw] = $value[$aw];
                                    }
				}
                                $descripcion_bibliografica = '';
                                $jsonb ='';
                                $arr_datos_json = [];
                                if($json){
                                    $josnb = 'jsonb_build_object(';
                                    if(isset($datos_json['a'])){
                                        $josnb .= '\'a\', ?';
                                        array_push($arr_datos_json, $datos_json['a']);
                                        
                                    }
                                    if(isset($datos_json['b'])){
                                        if(isset($datos_json['a'])){
                                            $josnb .= ',';
                                        }
                                        $josnb .= '\'b\', ?';
                                        array_push($arr_datos_json, $datos_json['b']);
                                        
                                    }
                                    if(isset($datos_json['d'])){
                                        if(isset($datos_json['a']) or isset($datos_json['b'])){
                                            $josnb .= ',';
                                        }
                                        array_push($arr_datos_json, $datos_json['d']);
                                        
                                    }
                                    //$value['descripcionBibliografica'] = json_encode($datos_json);
                                }
                                 
                                if($value['asignado'] == 'SIN'){
                                    $value['asignado'] = NULL;
                                    $value['estatus'] = NULL;
                                    $value['fechaAsignado'] = NULL;
                                }
                                if (!empty($arr_datos_json)) {
                                    //$json_string = json_encode($datos_json);
                                    //$json_string = str_replace("{", "", $json_string);
                                    //$json_string = str_replace("}", "", $json_string);
                                    //echo $json_string;
                                    if(isset($datos_json['a'])){
                                        $datos_json_w = [];
                                        $datos_json_w['a'] = $datos_json['a'];
                                        $json_string = json_encode($datos_json_w);
                                        $json_string = str_replace("{", "", $json_string);
                                        $json_string = str_replace("}", "", $json_string);
                                        echo $json_string;
                                        $this->db->where("(replace(cast(\"descripcionBibliografica\" as text),' ','') like '%$json_string%')");
                                    }
                                    if(isset($datos_json['b'])){
                                        $datos_json_w = [];
                                        $datos_json_w['b'] = $datos_json['b'];
                                        $json_string = json_encode($datos_json_w);
                                        $json_string = str_replace("{", "", $json_string);
                                        $json_string = str_replace("}", "", $json_string);
                                        echo $json_string;
                                        $this->db->where("(replace(cast(\"descripcionBibliografica\" as text),' ','') like '%$json_string%')");
                                    }
                                    if(isset($datos_json['d'])){
                                        $datos_json_w = [];
                                        $datos_json_w['d'] = $datos_json['d'];
                                        $json_string = json_encode($datos_json_w);
                                        $json_string = str_replace("{", "", $json_string);
                                        $json_string = str_replace("}", "", $json_string);
                                        echo $json_string;
                                        $this->db->where("(replace(cast(\"descripcionBibliografica\" as text),' ','') like '%$json_string%')");
                                    }
                                    //$this->db->where("(replace(cast(\"descripcionBibliografica\" as text),' ','') like '%$json_string%')");
                                }
                                //$valores_a_excluir = array('C', 'B');
                                //$this->db->where_not_in('estatus', $valores_a_excluir);
                                $this->db->where("(estatus not in ('B', 'C') or estatus is NULL)");
                                $this->db->where($array);
				$this->db->update($tabla, $value);
                                return $query_construido;
			}
                        
                        /****
                         * foreach ($data as $value){
                                $datos_json = [];
                                $json = false;
				foreach ($arr_where as $aw){
                                    if($aw == 'volumen'){
                                        if(isset($value['volumen'])){
                                            $datos_json['a'] = $value['volumen'];
                                            unset($value['volumen']);
                                             $json = true;
                                        }
                                    }
                                    if($aw == 'numero'){
                                        if(isset($value['numero'])){
                                            $datos_json['b'] = $value['numero'];
                                            unset($value['numero']);
                                            $json = true;
                                        }
                                    }
                                    if($aw == 'parte'){
                                        if(isset($value['parte'])){
                                            $datos_json['c'] = $value['parte'];
                                            unset($value['parte']);
                                            $json = true;
                                        }
                                    }
                                    
                                    if(isset($value[$aw])){
					$array[$aw] = $value[$aw];
                                    }
				}
                                if($json){
                                    $descripcion_bibliografica = $this->db->select('jsonb_build_object(\'a\', ?, \'b\', ?, \'c\', ?) as descripcion_bibliografica', [
                                                                    $datos_json['a'],
                                                                    $datos_json['b'],
                                                                    $datos_json['c']
                                                                ])->get_compiled_select();
                                    //$value['descripcionBibliografica'] = json_encode($datos_json);
                                }
				$this->db->where($array);
                                $this->db->where("descripcionBibliografica = ($descripcion_bibliografica)", null, false);
				$this->db->update($tabla, $value);
                                return $query_construido;
			}
                         */
                        
		}
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
					if(isset($value[$aw])){
						$array[$aw] = $value[$aw];
					}
				}
				$this->db->where($array);
				$this->db->update($tabla, $value);
				
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
                            if( $data[$x]['usuario'] == 'sesion' ){
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
	
	public function insert_bitacora($evento, $sistema=''){
		$usuario = $this->session->userdata('usu_base');
		$hora = 'LOCALTIME(0)';
		$this->load->database();
		$query = 'insert into bitacora (
						"usuario", "sistema", "evento", "hora"
						) values('.
						"'".$usuario."',".
						"'".$sistema."',".
						"'".$evento."',".
						$hora.
						")";
		$query = $this->db->query($query);
	}
        
	public function limpia($string){
		$string = str_replace('\"', '"', $string);
		$string = str_replace("'", "''", $string);
		return $string;
	}
	   
}