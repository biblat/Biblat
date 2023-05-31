<?php
error_reporting(0);
//error_reporting(E_ALL);
class Generic_model extends CI_Model { 
	public function __construct() {
		parent::__construct();
		$this->load->database();
	}
	
	/*
	* Actualiza los datos que cumplan con el $arr_where y los datos $data, sólo se usa $data_ant si se actualizará algún dato que se encuentre en el arr_where
	*
	* arr_where: arreglo de nombres de los campos where
	* data_ant : valores a biscar en el where
	*/
	public function update($tabla, $arr_where, $data, $data_ant = null){
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
					$array[$aw] = $value[$aw];
				}
				$this->db->where($array);
				$this->db->update($tabla, $value);
			}
		}
	}
   
	public function insert($tabla, $data){
		foreach ($data as $x => $value){
			$this->db->insert($tabla, $value);
		}
	}
	
	/*
	*	Hace el select de la $tabla que cumpla con las condiciones $arr_where y $data
	*	Si no existe resultado realiza el insert de $data
	*
	*/
	
	public function insert_if_ne($tabla, $arr_where, $data){
		//Acomodo de nombre de campos where con su respectivo valor a buscar
		foreach ($data as $x => $value){
			foreach ($arr_where as $aw){
				$array[$aw] = $value[$aw];
			}
			$this->db->where($array);
			$q = $this->db->get($tabla);
			
			//Si no existe el registro hace el insert
			if($q->num_rows() == 0){
				$this->db->reset_query();
				$this->db->insert($tabla, $data[$x]);
			}
		}
	}
        
        public function insert_if_ne_article($tabla, $arr_where, $data){
            echo 'Hola';
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
                            $query = "select '".$data[$x]['base']."99' || lpad((cast(max(substring(sistema,6)) as  int)+1)::text,9,'0') as sistema from article";
                            $query = $this->db->query($query);
                            $res = $query->result_array();
                            $data[$x]['sistema'] = $res[0]['sistema'];
                            

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
	
	/*
	*	Realiza primero un select de la columna $columns_res, de la tabla $tabla_where cumpliendo con las condiciones $arr_where y los valores $data_where
	*	Hace el insert en $tabla_insert del registro $data_insert donde se cumpla con el valor obtenido de la columna $columns_res y que cumpla con las condiciones $arr_where y $data_insert
	*	
	*/
	public function insert_after_select	($tabla_where, $arr_where, $data_where, $columns_res, $tabla_insert, $arr_where_insert, $data_insert){
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
		foreach ($data as $value){
			foreach ($arr_where as $aw){
				$array[$aw] = $value[$aw];
			}
			$this->db->where($array);
			$this->db->delete($tabla);
		}
	}
        
        public function limpia($string){
            $string = str_replace('\"', '"', $string);
            $string = str_replace("'", "''", $string);
            return $string;
	}
	   
}