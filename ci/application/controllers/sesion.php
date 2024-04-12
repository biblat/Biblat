<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
error_reporting(0);
require 'vendor/autoload.php';
require 'vendor/google-api/vendor/autoload.php';
require 'vendor/phpgangsta/vendor/autoload.php';

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
    
    function inicio_editores(){
        if( isset($_POST['correo']) || isset($_POST['codigo'])){
            putenv("GOOGLE_APPLICATION_CREDENTIALS=credentials2.json");
            $client = new Google_Client();
            $client->setApplicationName('Biblat');
            $client->setScopes(Google_Service_Sheets::SPREADSHEETS_READONLY);
            $client->useApplicationDefaultCredentials();
            // ID de la hoja de cálculo
            $spreadsheetId = sheetEditores;
            
            if( isset($_POST['correo']) ){
                $correos = $_POST['correo'];
                
                // Inicializar el cliente
                $service = new Google_Service_Sheets($client);

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
                    $renglon = 0;
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
                            $idx_llave = array_search('Llave', $columnas);
                        }

                        foreach ($v as $x2 => $v2){
                            if($x2 == $idx_usuario){
                                if($v2 == $correos && $v[$idx_rol] == 'Editor'){
                                    $renglon = $x;
                                    if($v[$idx_llave] == false){
                                        $llave = '0';
                                    }else{
                                        $llave = $v[$idx_llave];
                                    }
                                    $usuario_data = array(
                                        'usuario' => $v[$idx_usuario],
                                        'nombre' => $v[$idx_nombre],
                                        'rol' => $v[$idx_rol],
                                        'usu_base' => $v[$idx_aleph],
                                        'llave' => $llave,
                                        'coor_x' => $idx_llave,
                                        'coor_y' => $renglon,
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
                    if($this->session->userdata('llave') == '0'){
                        //Obtiene código QR
                        $auth = $this->auth_qr_get();
                        
                        $this->session->set_userdata('llave', $auth["llave"]);
                        // Ejecuta la solicitud
                        //$response = $service->execute($request);
                        echo json_encode(["res" => "success", "qr" => $auth["qr"]]);
                    }else{
                        echo json_encode(["res" => "success", "qr" => "0"]);
                    }
                    
                }else{
                    echo json_encode(["res" => "error"]);
                }
            }
            if( isset($_POST['codigo']) ){
                $ga = new PHPGangsta_GoogleAuthenticator();

                $gcode = $_POST['codigo'];

                $validacion = $ga->verifyCode($this->session->userdata('llave'), $gcode);

                if($validacion){
                    //HAsta que haga la primer validación se almacena la llave
                    $client->addScope(Google_Service_Sheets::SPREADSHEETS);
                    $service = new Google_Service_Sheets($client);
                    $range = 'Usuarios!'.chr($this->session->userdata('coor_x') + ord('A')).($this->session->userdata('coor_y')+1);

                    $values = [
                        [$this->session->userdata('llave')]
                    ];

                    // Crea una solicitud para escribir en la celda
                    $requestBody = new Google_Service_Sheets_ValueRange([
                        'values' => $values
                    ]);
                    $params = [
                        'valueInputOption' => 'RAW'
                    ];
                    $request = $service->spreadsheets_values->update($spreadsheetId, $range, $requestBody, $params);
                    
                    $this->session->set_userdata('logueado', TRUE);
                    echo json_encode(["res" => "success"]);
                }else{
                    echo json_encode(["res" => "error"]);
                }
            }
        }
    }
	
	public function auth_qr_get(){
        // Instancia de GoogleAuthenticator
        $ga = new PHPGangsta_GoogleAuthenticator();

        // Genera un nuevo secreto
        $secret = $ga->createSecret();
        
        // Obtiene la URL del código QR para escanear con la aplicación Google Authenticator
        $qrCodeUrl = $ga->getQRCodeGoogleUrl('Biblat Central', $secret);

        //echo 'Escanea este código QR con la aplicación Google Authenticator:<br>';
        //echo '<img src="' . $qrCodeUrl . '" alt="Código QR"><br>';

        // Genera un código de autenticación de 6 dígitos
        $oneTimePassword = $ga->getCode($secret);

        //echo 'Tu código de autenticación es: ' . $oneTimePassword;
        return ["qr" => $qrCodeUrl, "code" => $oneTimePassword, "llave" => $secret];
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

            if($_POST['editor']){
                // Devolver una respuesta exitosa al cliente
                //$this->session->set_userdata('logueado', TRUE);
            }else{
                // Devolver una respuesta exitosa al cliente
                $usuario_data = array(
                    'usuario' => $_POST['usuario'],
                    'nombre' => $_POST['nombre'],
                    'rol' => $_POST['rol'],
                    'usu_base' => $_POST['usu_base'],
                    'pal_cla' => $_POST['pal_cla'],
                    'res' => $_POST['res'],
                    'logueado' => TRUE
                );
                $this->session->set_userdata($usuario_data);
            }
            
            if($_POST['rol'] == 'Administrador' or $_POST['rol'] == 'Analista'){
                header('Content-Type: application/json');
                echo json_encode(["page" => "adminb"]);
            }else{
                if( $this->session->userdata('rol') == 'Editor'){
                    header('Content-Type: application/json');
                    echo json_encode(["page" => "adminb"]);
                }
            }
            
        } else {
            // El token de autenticación no es válido
            header('Content-Type: application/json');
            echo json_encode(["page" => "main"]);
        }
    }
    }
}
