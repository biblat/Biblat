<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
error_reporting(0);

class Indizacion extends CI_Controller {
    
    public function __construct(){
            parent::__construct();
            $this->output->enable_profiler($this->config->item('enable_profiler'));
            $this->template->set_partial('biblat_js', 'javascript/biblat', array(), TRUE, FALSE);
            $this->template->set_partial('submenu', 'layouts/submenu');
            $this->template->set_partial('search', 'layouts/search');
            $this->template->set_breadcrumb(_('Inicio'), site_url('/'));
            $this->template->set('class_method', $this->router->fetch_class().$this->router->fetch_method());
            $this->template->js('assets/js/highcharts/phantomjs/highcharts8.js');
            $this->template->js('js/env.js');
            $this->template->js('assets/js/utils/utils.js');
    }
    
    public function index(){
        $data = array();
        $data['page_title'] = _('BibLex IA - Asistente de indización');
        $this->template->set_layout('default_sel');
        $this->template->title(_('BibLex IA - Asistente de indización'));
        $this->template->set_meta('description', _('BibLex IA - Asistente de indización'));
        $this->template->set_partial('main_js', 'catalogacion/catalogacion.js', array(), TRUE, FALSE);
        $this->template->build('catalogacion/catalogacion', $data);
    }
    
    public function api(){
        $data = array();
        $data['page_title'] = _('Indización vía API');
        $this->template->set_layout('default_sel');
        $this->template->title(_('Indización vía API'));
        $this->template->set_meta('description', _('Indización vía API'));
        $this->template->set_partial('main_js', 'catalogacion/catalogacion_api.js', array(), TRUE, FALSE);
        $this->template->build('catalogacion/catalogacion_api', $data);
    }
    
	public function send_indizacion()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            show_error('Method not allowed', 405);
            return;
        }

        //$python_url = 'http://127.0.0.1:5000/send_indizacion';
        $python_url = 'http://server-biblex:9000/send_indizacion';

        $text = (string) $this->input->post('text', true);

        $hasFile = !empty($_FILES['file']['tmp_name']) && is_uploaded_file($_FILES['file']['tmp_name']);

        if (!$hasFile && trim($text) === '') {
            $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode(['resp' => json_encode(['error' => "Debes enviar 'text' o 'file'."] , JSON_UNESCAPED_UNICODE)]));
            return;
        }

        $ch = curl_init();

        $post_fields = [
            'text' => $text,
        ];

        if ($hasFile) {
            $post_fields['file'] = new CURLFile(
                $_FILES['file']['tmp_name'],
                $_FILES['file']['type'] ?? 'application/pdf',
                $_FILES['file']['name'] ?? 'archivo.pdf'
            );
        }

        curl_setopt_array($ch, [
            CURLOPT_URL => $python_url,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $post_fields,     // multipart/form-data automático
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_TIMEOUT => 180,                 // Gemini puede tardar
        ]);

        $body = curl_exec($ch);

        if ($body === false) {
            $err = curl_error($ch);
            curl_close($ch);

            $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode(['resp' => json_encode(['error' => 'No se pudo conectar al servicio', 'detail' => $err], JSON_UNESCAPED_UNICODE)]));
            return;
        }

        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        // Python en éxito manda {"resp":"<json string>"}.
        // En error a veces manda {"error":"Solo PDF"} con HTTP 400.
        // Para que JS siga funcionando igual, normaliza a siempre regresar {"resp":"<json string>"} con 200.
        $decoded = json_decode($body, true);

        if (is_array($decoded) && array_key_exists('resp', $decoded)) {
            // ya viene en el formato esperado por JS
            $out = $body;
        } else {
            // error u otro formato: dentro de resp como string JSON
            $errObj = is_array($decoded) ? $decoded : ['error' => 'Respuesta inválida del servicio'];
            $out = json_encode(['resp' => json_encode($errObj, JSON_UNESCAPED_UNICODE)], JSON_UNESCAPED_UNICODE);
        }

        $this->output
            ->set_content_type('application/json')
            ->set_output($out);
    }
   
}