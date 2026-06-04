<!DOCTYPE html>
<html lang="es">
<head>
    <title>Verificación de acceso | Biblat</title>

    <meta charset="utf-8">
    <meta name="robots" content="noindex,nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" href="<?php echo base_url('assets/img/favicon.ico'); ?>" type="image/x-icon">
    <link rel="stylesheet" href="<?php echo base_url('assets/css/bootstrap.min.css'); ?>" type="text/css">
    <link rel="stylesheet" href="<?php echo base_url('assets/css/font-awesome.min.css'); ?>" type="text/css">
    <link rel="stylesheet" href="<?php echo base_url('assets/css/biblat.css'); ?>" type="text/css">

    <style>
        body {
            background: #f5f5f5;
        }

        .challenge-header {
            background: #fff;
            border-bottom: 1px solid #ddd;
            padding: 18px 0;
        }

        .challenge-logo-biblat {
            max-width: 220px;
        }

        .challenge-logo-dgb {
            max-width: 110px;
            margin-right: 25px;
        }

        .challenge-card {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 6px;
            margin-top: 45px;
            padding: 35px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .challenge-title {
            color: #114D66;
            margin-top: 0;
            font-weight: bold;
        }

        .challenge-stage {
            position: relative;
            min-height: 220px;
            margin-top: 25px;
            border: 1px dashed #c8c8c8;
            background: #FBFCEF;
            overflow: hidden;
        }

        .human-label {
            position: absolute;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 14px 18px;
            background: #ffffff;
            border: 2px solid #114D66;
            border-radius: 5px;
            color: #114D66;
            cursor: pointer;
            transition: all .35s ease;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            font-weight: normal;
        }

        .human-label:hover {
            background: #f7f7f7;
        }

        .human-label input {
            margin: 0;
            transform: scale(1.25);
        }

        .human-label-ok {
            border-color: #5cb85c;
            color: #2d6b2d;
            background: #f1fff1;
        }

        .hp-field {
            position: absolute;
            left: -9999px;
            top: -9999px;
            opacity: 0;
        }

        .challenge-footer {
            margin-top: 35px;
            font-size: 12px;
            color: #555;
        }

        @media (max-width: 768px) {
            .challenge-card {
                margin-top: 20px;
                padding: 20px;
            }

            .challenge-logo-biblat {
                max-width: 170px;
            }

            .challenge-stage {
                min-height: 260px;
            }

            .human-label {
                max-width: 85%;
                font-size: 13px;
            }
        }
    </style>
</head>

<body>

<!--header class="challenge-header">
    <div class="container">
        <div class="row">
            <div class="col-xs-7 col-sm-6">
                <a href="<?php echo site_url('/'); ?>" title="Bibliografía Latinoamericana">
                    <img src="<?php echo base_url('img/biblat.png'); ?>" class="challenge-logo-biblat" alt="Biblat">
                </a>
            </div>

            <div class="col-xs-5 col-sm-6 text-right">
                <img src="<?php echo base_url('img/logo_dgbsdi.svg'); ?>" class="challenge-logo-dgb" alt="DGBSDI">
                <span class="bl-unam fa-4x hidden-xs"></span>
            </div>
        </div>
    </div>
</header-->

<div class="container">
    <div class="row">
        <div class="col-sm-8 col-sm-offset-2">

            <div class="challenge-card">
                <h3 class="challenge-title">Verificación de acceso</h3>

                <p>
                    Para continuar hacia Biblat, confirme que la solicitud proviene de un navegador legítimo.
                </p>

                <form id="humanChallengeForm" method="post" action="<?php echo site_url('challenge/verify'); ?>">
                    <input type="hidden" name="token" value="<?php echo html_escape($token); ?>">
                    <input type="hidden" name="challenge_event" id="challenge_event" value="">
                    <input type="hidden" name="movement_done" id="movement_done" value="0">

                    <?php if (config_item('csrf_protection')): ?>
                        <input type="hidden"
                               name="<?php echo $this->security->get_csrf_token_name(); ?>"
                               value="<?php echo $this->security->get_csrf_hash(); ?>">
                    <?php endif; ?>

                    <input type="text"
                           name="<?php echo html_escape($honeypot_name); ?>"
                           value=""
                           class="hp-field"
                           autocomplete="off"
                           tabindex="-1">

                    <div class="challenge-stage">
                        <label
                            id="<?php echo html_escape($label_id); ?>"
                            class="human-label"
                            style="top: <?php echo (int) $pos_top; ?>%; left: <?php echo (int) $pos_left; ?>%;"
                        >
                            <input
                                type="checkbox"
                                id="<?php echo html_escape($checkbox_id); ?>"
                                name="<?php echo html_escape($checkbox_name); ?>"
                                value="1"
                                disabled
                            >
                            <span id="humanLabelText"><?php echo html_escape($label_text); ?></span>
                        </label>
                    </div>

                    <noscript>
                        <div class="alert alert-warning" style="margin-top:20px;">
                            Para continuar es necesario activar JavaScript en el navegador.
                        </div>
                    </noscript>
                </form>

                <div class="challenge-footer text-center">
                    Sistema de revistas científicas latinoamericanas Biblat.
                    Universidad Nacional Autónoma de México.
                </div>
            </div>

        </div>
    </div>
</div>

<script>
(function () {
    var form = document.getElementById('humanChallengeForm');
    var label = document.getElementById('<?php echo html_escape($label_id); ?>');
    var checkbox = document.getElementById('<?php echo html_escape($checkbox_id); ?>');
    var text = document.getElementById('humanLabelText');
    var eventInput = document.getElementById('challenge_event');
    var movementDone = document.getElementById('movement_done');

    var originalLabelId = '<?php echo html_escape($label_id); ?>';
    var originalCheckboxId = '<?php echo html_escape($checkbox_id); ?>';

    var submitted = false;

    var movements = [
        {
            top: '<?php echo (int) $move_top_1; ?>%',
            left: '<?php echo (int) $move_left_1; ?>%',
            text: 'Ubicando verificación institucional...'
        },
        {
            top: '<?php echo (int) $move_top_2; ?>%',
            left: '<?php echo (int) $move_left_2; ?>%',
            text: 'Preparando confirmación de acceso...'
        },
        {
            top: '<?php echo (int) $move_top_3; ?>%',
            left: '<?php echo (int) $move_left_3; ?>%',
            text: 'Confirme que desea continuar'
        }
    ];

    function moveChallenge(index) {
        if (index >= movements.length) {
            checkbox.disabled = false;
            movementDone.value = '1';
            text.textContent = 'Haga clic para continuar';
            label.id = originalLabelId + '_ready_' + Date.now();
            checkbox.id = originalCheckboxId + '_ready_' + Date.now();
            return;
        }

        label.style.top = movements[index].top;
        label.style.left = movements[index].left;
        text.textContent = movements[index].text;

        label.id = originalLabelId + '_move_' + index + '_' + Date.now();
        checkbox.id = originalCheckboxId + '_move_' + index + '_' + Date.now();

        setTimeout(function () {
            moveChallenge(index + 1);
        }, 650);
    }

    setTimeout(function () {
        moveChallenge(0);
    }, 500);

    checkbox.addEventListener('change', function () {
        if (!checkbox.checked || submitted) {
            return;
        }

        if (movementDone.value !== '1') {
            checkbox.checked = false;
            return;
        }

        submitted = true;

        text.textContent = 'Verificación completada. Continuando...';

        label.className += ' human-label-ok';
        eventInput.value = 'checked_' + Date.now();

        setTimeout(function () {
            form.submit();
        }, 500);
    });
})();
</script>

</body>
</html>