<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Challenge extends CI_Controller {

    private $verified_seconds = 1800;
    private $challenge_seconds = 300;

    public function __construct() {
        parent::__construct();

        $this->load->library('session');
        $this->load->helper(array('url', 'html'));
    }

    public function index() {
        $return = $this->input->get('return', TRUE);
        $return = $return ? rawurldecode($return) : '/';

        if (!$this->is_safe_return($return)) {
            $return = '/';
        }

        $token = $this->secure_hex(16);

        $checkbox_id = 'biblat_chk_' . $this->secure_hex(4);
        $checkbox_name = 'biblat_human_' . $this->secure_hex(4);
        $label_id = 'biblat_lbl_' . $this->secure_hex(4);
        $honeypot_name = 'website_' . $this->secure_hex(4);

        $labels = array(
            'Confirmo que deseo consultar Biblat',
            'Verificar acceso a Bibliografía Latinoamericana',
            'Continuar como usuario legítimo',
            'Confirmar acceso institucional'
        );

        $label_text = $labels[array_rand($labels)];

        $pos_top = mt_rand(18, 60);
        $pos_left = mt_rand(8, 55);

        $move_top_1 = mt_rand(16, 68);
        $move_left_1 = mt_rand(10, 58);

        $move_top_2 = mt_rand(16, 68);
        $move_left_2 = mt_rand(10, 58);

        $move_top_3 = mt_rand(16, 68);
        $move_left_3 = mt_rand(10, 58);

        $this->session->set_userdata('human_challenge', array(
            'token' => $token,
            'checkbox_name' => $checkbox_name,
            'honeypot_name' => $honeypot_name,
            'return' => $return,
            'created_at' => time()
        ));

        $this->load->view('challenge/index', array(
            'token' => $token,
            'checkbox_id' => $checkbox_id,
            'checkbox_name' => $checkbox_name,
            'label_id' => $label_id,
            'label_text' => $label_text,
            'honeypot_name' => $honeypot_name,

            'pos_top' => $pos_top,
            'pos_left' => $pos_left,

            'move_top_1' => $move_top_1,
            'move_left_1' => $move_left_1,

            'move_top_2' => $move_top_2,
            'move_left_2' => $move_left_2,

            'move_top_3' => $move_top_3,
            'move_left_3' => $move_left_3
        ));
    }

    public function verify() {
        if (strtoupper($this->input->server('REQUEST_METHOD')) !== 'POST') {
            show_error('Solicitud no válida', 403);
            return;
        }

        $challenge = $this->session->userdata('human_challenge');

        if (empty($challenge)) {
            show_error('La verificación no existe o expiró', 403);
            return;
        }

        $elapsed = time() - (int) $challenge['created_at'];

        if ($elapsed < 2 || $elapsed > $this->challenge_seconds) {
            $this->session->unset_userdata('human_challenge');
            show_error('La verificación expiró', 403);
            return;
        }

        $token = $this->input->post('token', TRUE);
        $checkbox = $this->input->post($challenge['checkbox_name'], TRUE);
        $honeypot = $this->input->post($challenge['honeypot_name'], TRUE);

        if (!empty($honeypot)) {
            $this->session->unset_userdata('human_challenge');
            show_error('Verificación incorrecta', 403);
            return;
        }

        if (
            empty($token) ||
            !$this->safe_equals($challenge['token'], $token) ||
            $checkbox !== '1'
        ) {
            show_error('Verificación incorrecta', 403);
            return;
        }

        $this->session->set_userdata('human_verified_until', time() + $this->verified_seconds);

        $return = $challenge['return'];

        $this->session->unset_userdata('human_challenge');

        redirect($return);
    }

    private function is_safe_return($return) {
        if (!is_string($return)) {
            return FALSE;
        }

        if (strpos($return, '/') !== 0) {
            return FALSE;
        }

        if (strpos($return, '//') === 0) {
            return FALSE;
        }

        return preg_match('#^/[A-Za-z0-9/_\-.?=&%]*$#', $return);
    }

    private function secure_hex($length = 16) {
        if (function_exists('random_bytes')) {
            return bin2hex(random_bytes($length));
        }

        if (function_exists('openssl_random_pseudo_bytes')) {
            return bin2hex(openssl_random_pseudo_bytes($length));
        }

        return bin2hex(substr(md5(uniqid(mt_rand(), TRUE)), 0, $length));
    }

    private function safe_equals($a, $b) {
        if (function_exists('hash_equals')) {
            return hash_equals($a, $b);
        }

        return $a === $b;
    }
}