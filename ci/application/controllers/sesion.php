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
            $data['page_title'] = _('Inicio Sesión');
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
