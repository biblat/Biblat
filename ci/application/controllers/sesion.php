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
	
	public function editores(){
        $data = array();
        $data['encabezado'] = 'Ingrese su correo registrado como editor en Biblat';
        //$this->session->unset_userdata('codigo');
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
        $headers = "From: INICIO EDITORES BIBLAT<inicio@biblat.unam.mx>";

        // boundary 
        $semi_rand = md5(time()); 
        $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x"; 

        // headers for attachment 
        $headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\""; 

        // multipart boundary 
        $message = "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" .
        "Content-Transfer-Encoding: 7bit\n\n" . $message . "\n\n"; 

        $message .= "--{$mime_boundary}--";
        $returnpath = "-f" . $senderMail;

        //send email
        $mail = @mail($to, $subject, $message, $headers, $returnpath); 

        //function return true, if email sent, otherwise return fasle
        if($mail){ return TRUE; } else { return FALSE; }
    }
    
    function inicio_editores(){
        $this->session->unset_userdata('codigo');
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
                        "inicio@biblat.unam.mx",
                        "Inicio Editores Biblat",
                        null
                        );
                echo json_encode(["res" => "success"]);
            }else{
                echo json_encode(["res" => "error"]);
            }
        }
    }
    
    function codigo_editores(){
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
