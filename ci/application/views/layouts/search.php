    <?php
        // Generar el token si no existe
        if (!$this->session->userdata('csrf_token')) {
            $csrf_token = bin2hex(random_bytes(32));
            $this->session->set_userdata('csrf_token', $csrf_token); // Guardar el token en la sesión
        } else {
            $csrf_token = $this->session->userdata('csrf_token');
        }
		
		$rate_limit_f = $this->session->userdata('rate_limit');
        $rate_limit_f = implode(',', $rate_limit_f);
    ?>
	<form action="{site_url('buscar')}" id="searchform" method="post" role="search" autocomplete="off">
        <div class="form-group">
            <div class="input-group">
                <div class="input-group-addon">
                    <div class="btn-group">
                        <button type="button" class="btn btn-search dropdown-toggle" data-toggle="dropdown">
                            <span id="search-type" class="fa fa-cloud fa-fw"> </span><span class="caret"></span>
                        </button>
                        <ul id="search-opts" class="dropdown-menu" role="menu">
                        <li rel="todos"><a href="#"><span id="op-todos" class="fa fa-cloud fa-fw"></span> {_('Buscar en todos los campos')}</a></li>
						<li rel="ia" style="display: none"><a href="#"><span id="op-ia" class="fa fa-file-text fa-fw"></span> {_('Buscar en título y resumen utilizando lenguaje natural')}</a></li>
                        <li rel="palabra-clave"><a href="#"><span id="op-palabra-clave" class="fa fa-key fa-fw"></span> {_('Buscar por palabra clave')}</a></li>
                        <li rel="autor"><a href="#"><span id="op-autor" class="fa fa-user fa-fw"></span> {_('Buscar por autor')}</a></li>
                        <li rel="revista"><a href="#"><span id="op-revista" class="fa fa-book fa-fw"></span> {_('Buscar por revista')}</a></li>
                        <li rel="institucion"><a href="#"><span id="op-institucion" class="fa fa-building fa-fw"></span> {_('Buscar por institución')}</a></li>
                        <li rel="articulo"><a href="#"><span id="op-articulo" class="fa fa-file-text-o fa-fw"></span> {_('Buscar por artículo')}</a></li>
                        <li rel="avanzada"><a href="#"><span id="op-avanzada" class="fa fa-search-plus fa-fw"></span> {_('Búsqueda avanzada')}</a></li>
                        </ul>
                    </div>
                </div>
                <textarea class="form-control" id="slug" name="slug" placeholder="{_('Buscar en Biblat')}">{if $search.slug}{$search.slug}{/if}</textarea>
                <div id="advsearch" class="form-control"></div>
                <div class="input-group-addon">
                    <button type="submit" class="btn btn-search"><span class="fa fa-search"></span></button>
                </div>
            </div><!--input-group-->
            <input type="hidden" name="disciplina" value=""/>
            <input type="hidden" name="filtro" id="filtro" value="todos"/>
			<input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf_token); ?>">
			<input type="hidden" name="rate" value="<?php echo $rate_limit_f; ?>">
        </div><!--form-group-->
    </form>