<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
error_reporting(0);
require 'vendor/autoload.php';
require 'vendor/google-api/vendor/autoload.php';

class Sesion extends CI_Controller {
    
    public function __construct(){
            parent::__construct();
            $this->output->enable_profiler($this->config->item('enable_profiler'));
            $this->template->set_partial('biblat_js', 'javascript/biblat', array(), TRUE, FALSE);
            $this->template->set_partial('submenu', 'layouts/submenu');
            $this->template->set_partial('search', 'layouts/search');
            $this->template->set_breadcrumb(_('Inicio'), site_url('/'));
            $this->template->set('class_method', $this->router->fetch_class().$this->router->fetch_method());
    }
    
    public function index(){
        if (in_array($_SERVER['REMOTE_ADDR'], unserialize(IPS))){
            $data = array();
            $data['page_title'] = _('Biblat Central');
            $this->template->set_layout('default_sel');
            $this->template->title(_('Inicio Sesión'));
            //$data['page_subtitle'] = _('');
            $this->template->set_meta('description', _('Inicio Sesión'));
            $this->template->js('assets/js/apigoogle/api.js');
            $this->template->js('assets/js/apigoogle/getaccesstokenfromserviceaccount.js');
            $this->template->js('assets/js/apigoogle/client.js');
            $this->template->css('css/jquery.slider.min.css');
            $this->template->js('js/env.js');
            $this->template->set_partial('main_js', 'sesion/sesion.js', array(), TRUE, FALSE);
            $this->template->build('sesion/sesion', $data);
        }
        
    }
	
	public function editores($inicio='inicio'){
        if($inicio == 'inicio'){
            $this->session->unset_userdata('codigo');
        }
        $data = array();
        $data['encabezado'] = 'Ingrese su correo registrado como editor en Biblat';
        if ($this->session->userdata('codigo')) {
            $data['encabezado'] = 'Ingrese el código que recibió en su correo';
            $data['codigo'] = TRUE;
        }
        
        $data['page_title'] = _('Inicio de sesión para editores');
        $this->template->set_layout('default_sel');
        $this->template->title(_('Inicio de sesión para editores'));
        //$data['page_subtitle'] = _('');
        $this->template->set_meta('description', _('Inicio Sesión'));
        $this->template->js('assets/js/apigoogle/api.js');
        $this->template->js('assets/js/apigoogle/getaccesstokenfromserviceaccount.js');
        $this->template->js('assets/js/apigoogle/client.js');
        $this->template->css('css/jquery.slider.min.css');
        $this->template->js('js/env.js');
        $this->template->js('assets/js/highcharts/phantomjs/highcharts8.js');
        $this->template->js('assets/js/utils/utils.js');
        $this->template->set_partial('main_js', 'sesion/editor.js', array(), TRUE, FALSE);
        $this->template->build('sesion/editor', $data);
    }
    
    function multi_attach_mail($to, $subject, $message, $senderMail, $senderName, $files){
        $asunto = 'INICIO EDITORES BIBLAT';
        $cabeceras = 'From: BIBLAT <'. $senderMail . ">\r\n";
        $cabeceras  .= 'MIME-Version: 1.0' . "\r\n";
        $cabeceras .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
        $cabeceras .= 'SPF: pass' . "\r\n";
        $cabeceras .= 'DKIM-Signature: <your-dkim-signature>' . "\r\n";
        $cabeceras .= 'DMARC-Filter: OpenDMARC Filter v1.3.2' . "\r\n";
        $cabeceras .= 'Bounce-Tag: tag' . "\r\n";

        // Envía el correo
        $mail = mail($to, $asunto, $message, $cabeceras);
            
        //function return true, if email sent, otherwise return fasle
        if($mail){ return TRUE; } else { return FALSE; }
    }
    
    function inicio_editores(){
        if( isset($_POST['correo']) || isset($_POST['codigo'])){
            if( isset($_POST['correo']) ){
                $correos = $_POST['correo'];
                putenv("GOOGLE_APPLICATION_CREDENTIALS=credentials2.json");
                $client = new Google_Client();
                $client->setApplicationName('Biblat');
                $client->setScopes(Google_Service_Sheets::SPREADSHEETS_READONLY);
                $client->useApplicationDefaultCredentials();

                // Inicializar el cliente
                $service = new Google_Service_Sheets($client);

                // ID de la hoja de cálculo
                $spreadsheetId = sheetEditores;

                // Rango de celdas 
                $range = hojaEditores;

                // Leer datos de la hoja de cálculo
                $response = $service->spreadsheets_values->get($spreadsheetId, $range);
                $values = $response->getValues();

                $columnas = [];
                $codigo = mt_rand(100000, 999999).'';
                $existe = FALSE;

                if (empty($values)) {
                    echo json_encode(["res" => "error"]);
                } else {
                    foreach ($values as $x => $v){
                        //Recorrido de los encabezados
                        if($x == 0){
                            foreach ($v as $x2 => $v2){
                                $columnas[$x2] = $v2;
                            }
                            $idx_usuario = array_search('Usuario', $columnas);
                            $idx_rol = array_search('Rol', $columnas);
                            $idx_nombre = array_search('Nombre', $columnas);
                            $idx_aleph = array_search('Aleph', $columnas);
                        }

                        foreach ($v as $x2 => $v2){
                            if($x2 == $idx_usuario){
                                if($v2 == $correos && $v[$idx_rol] == 'Editor'){
                                    $usuario_data = array(
                                        'usuario' => $v[$idx_usuario],
                                        'nombre' => $v[$idx_nombre],
                                        'rol' => $v[$idx_rol],
                                        'usu_base' => $v[$idx_aleph],
                                        'pal_cla' => TRUE,
                                        'res' => TRUE,
                                        'logueado' => FALSE,
                                        'codigo'=> $codigo
                                    );
                                    $existe = TRUE;
                                    $this->session->set_userdata($usuario_data);
                                }
                                break;
                            }
                        }
                    }
                }
                if( $existe ){
                    $mensaje = "Estimado(a) editor(a):<br><br>".
                            "Su código de inicio es el siguiente: " . $codigo;
    
                    $this->multi_attach_mail($correos,
                            "Código de Inicio",
                            $mensaje,
                            "biblat_comite@dgb.unam.mx",
                            "Inicio Editores Biblat",
                            null
                            );
                    echo json_encode(["res" => "success"]);
                }else{
                    echo json_encode(["res" => "error"]);
                }
            }
            if( isset($_POST['codigo']) ){
                if( $this->session->userdata('codigo') ){
                    if( $_POST['codigo'] == $this->session->userdata('codigo') ){
                        $this->session->unset_userdata('codigo');
                        echo json_encode(["res" => "success"]);
                    }else{
                        echo json_encode(["res" => "error"]);
                    }
                }
            }
        }
    }
    
    public function valida(){      
        putenv("GOOGLE_APPLICATION_CREDENTIALS=credentials2.json");
        $client = new Google_Client();
        $client->setApplicationName('Biblat');
        $client->useApplicationDefaultCredentials();
                
        $payload = $client->verifyIdToken($_POST['id_token']);
        if ($payload) {
          $user_id = $payload['sub'];
          $email = $payload['email'];


            // Devolver una respuesta exitosa al cliente
            $usuario_data = array(
                'usuario' => $_POST['usuario'],
                'nombre' => $_POST['nombre'],
                'rol' => $_POST['rol'],
                'usu_base' => $_POST['usu_base'],
                'logueado' => TRUE
            );
            $this->session->set_userdata($usuario_data);
            
            if($_POST['rol'] == 'Administrador' or $_POST['rol'] == 'Analista'){
                header('Content-Type: application/json');
                echo json_encode(["page" => "adminb"]);
            }
            
        } else {
            // El token de autenticación no es válido
            header('Content-Type: application/json');
            echo json_encode(["page" => "main"]);
        }
    }
}
