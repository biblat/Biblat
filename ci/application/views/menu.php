	<div id="header">
		<a href="<?=site_url('/');?>"><img src="<?=base_url('/img/biblat_complete.png');?>" alt="logotipo Biblat" usemap="#logo-biblatMap" id="logo-biblat"></a>
		<map name="logo-biblatMap">
			<area shape="rect" coords="12,9,261,88" href="<?=site_url('/');?>">
		</map>
		<img src="<?=base_url('/img/logos_unam_dgb.jpg');?>" alt="logotipo unam, logotipo dgb" width="196" height="86" usemap="#logo-unamdgbMap" id="logo-unamdgb">
		<map name="logo-unamdgbMap">
			<area shape="rect" coords="10,6,101,75" href="http://dgb.unam.mx/" target="_blank">
			<area shape="rect" coords="125,8,191,79" href="http://www.unam.mx/" target="_blank">
		</map>
		<br class="cf"]>
	</div><!--end header-->

	<div class="menu">
		<ul>
			<li>
				<a href="javascript:;" title="<?php _e('Sobre Biblat');?>"><?php _e('Sobre Biblat');?></a>
				<ul>
					<li><a href="<?=site_url('sobre-biblat');?>" title="<?php _e('¿Qué es Biblat?');?>"><?php _e('¿Qué es Biblat?');?></a></li>
					<li><a href="<?=site_url('clase-y-periodica');?>" title="<?php _e('Clase y Periódica');?>"><?php _e('Clase y Periódica');?></a></li>
					<li><a href="<?=site_url('manual-de-indizacion');?>" title="<?php _e('Manual de indización');?>"><?php _e('Manual de indización');?></a></li>
					<li><a href="<?=site_url('scielo');?>" title="<?php _e('SciELO');?>"><?php _e('SciELO');?></a></li>
					<li><a href="javascript:;" title="<?php _e('Tutoriales');?>"><?php _e('Tutoriales');?></a></li>
					<li><a href="<?=site_url('materiales-de-difusion');?>" title="<?php _e('Materiales de difusión');?>"><?php _e('Materiales de difusión');?></a></li>
				</ul>
			</li>
			<li>
				<a href="javascript:;" title="<?php _e('Bibliometría');?>"><?php _e('Bibliometría');?></a>
				<ul>
					<li><a href="<?=site_url('bibliometria/descripcion-biblat');?>" title="<?php _e('Descripción');?>"><?php _e('Descripción');?></a></li>
					<li><a href="<?=site_url('bibliometria/metodologia-biblat');?>" title="<?php _e('Metodología');?>"><?php _e('Metodología');?></a></li>
					<li>
						<a href="<?=site_url('frecuencias');?>" title="<?php _e('Frecuencias');?>"><?php _e('Frecuencias');?></a>
						<ul>
							<li><a href="<?=site_url('frecuencias/autor');?>" title="<?php _e('Autor');?>"><?php _e('Autor');?></a></li>
							<li><a href="<?=site_url('frecuencias/institucion');?>" title="<?php _e('Institución');?>"><?php _e('Institución');?></a></li>
							<li><a href="<?=site_url('frecuencias/pais-afiliacion');?>" title="<?php _e('País de afiliación del autor');?>"><?php _e('País de afiliación');?></a></li>
							<li><a href="<?=site_url('frecuencias/revista');?>" title="<?php _e('Revista');?>"><?php _e('Revista');?></a></li>
							<li><a href="<?=site_url('frecuencias/disciplina');?>" title="<?php _e('Disciplina');?>"><?php _e('Disciplina');?></a></li>
						</ul>
					</li>
					<li>
						<a href="<?=site_url('indicadores');?>" title="<?php _e('Indicadores');?>"><?php _e('Indicadores');?></a>
						<ul>
							<li><a href="<?=site_url('indicadores/indice-coautoria');?>" title="<?php _e('Índice de coautoría');?>"><?php _e('Índice de coautoría');?></a></li>
							<li><a href="<?=site_url('indicadores/tasa-documentos-coautorados');?>" title="<?php _e('Tasa de documentos coautorados');?>"><?php _e('Tasa de documentos coautorados');?></a></li>
							<li><a href="<?=site_url('indicadores/grado-colaboracion');?>" title="<?php _e('Grado de colaboración (Índice Subramanyan)');?>"><?php _e('Grado de colaboración');?></a></li>
							<li><a href="<?=site_url('indicadores/indice-colaboracion');?>" title="<?php _e('Índice de colaboración (Índice de Lawani)');?>"><?php _e('Índice de colaboración');?></a></li>
							<li><a href="<?=site_url('indicadores/modelo-elitismo');?>" title="<?php _e('Modelo de elitismo (Price)');?>"><?php _e('Modelo de elitismo');?></a></li>
							<li><a href="<?=site_url('indicadores/indice-densidad-documentos');?>" title="<?php _e('Índice de densidad de documentos Zakutina y Priyenikova');?>"><?php _e('Índice de densidad de documentos');?></a></li>
							<li><a href="<?=site_url('indicadores/indice-concentracion');?>" title="<?php _e('Índice de concentración (Índice Pratt)');?>"><?php _e('Índice de concentración');?></a></li>
							<li><a href="<?=site_url('indicadores/modelo-bradford-revista');?>" title="<?php _e('Modelo de Bradford por revista');?>"><?php _e('Modelo de Bradford por revista');?></a></li>
							<li><a href="<?=site_url('indicadores/modelo-bradford-institucion');?>" title="<?php _e('Modelo de Bradford por institución (Afiliación del autor)');?>"><?php _e('Modelo de Bradford por institución');?></a></li>
							<li><a href="<?=site_url('indicadores/productividad-exogena');?>" title="<?php _e('Tasa de autoría exógena');?>"><?php _e('Tasa de autoría exógena');?></a></li>
						</ul>
					</li>
					<li><a href="javascript:;" title="<?php _e('Indicadores SciELO');?>"><?php _e('Indicadores SciELO');?></a></li>
					<li><a href="javascript:;" title="<?php _e('Indicadores por revista');?>"><?php _e('Indicadores por revista');?></a></li>
				</ul>
			</li>
			<li>
				<a href="javascript:;" title="<?php _e('Postular una revista');?>"><?php _e('Postular una revista');?></a>
				<ul>
					<li><a href="<?=site_url('postular-revista/criterios-de-seleccion');?>" title="<?php _e('Criterios de selección de revistas');?>"><?php _e('Criterios de selección de revistas');?></a></li>
				</ul>
			</li>
			<li><a href="javascript:;" title="<?php _e('Políticas de acceso');?>"><?php _e('Políticas de acceso');?></a></li>
			<span class="noBorde"><li>
			<a href="javascript:;" title="<?php _e('Documentos');?>"><?php _e('Documentos');?></a>
				<ul>
					<li><a href="<?=site_url('documentos/bibliografia');?>" title="<?php _e('Bibliografía');?>"><?php _e('Bibliografía');?></a></li>
					<li><a href="javascript:;" title="<?php _e('Presentaciones PPT');?>"><?php _e('Presentaciones PPT');?></a></li>
					<li><a href="javascript:;" title="<?php _e('Archivos multimedia');?>"><?php _e('Archivos multimedia');?></a></li>
				</ul>
			</li></span>
		</ul>
	</div>     	 
<?php if($this->router->fetch_class().$this->router->fetch_method() !== "mainindex"):?>
	<div class="searchContainer">
		<form action="<?=site_url('buscar');?>" class="searchform" method="post">
			<button id="options" class="icon-<?=(empty($filtro)? 'todos':$filtro);?>"></button>
			<ul class="optionsMenu">
				<li rel="todos"><i class="fa fa-cloud"></i><?php _e('Buscar en todos los campos');?></li>
				<li rel="palabra-clave"><i class="fa fa fa-key"></i><?php _e('Buscar por palabra clave');?></li>
				<li rel="autor"><i class="fa fa-user"></i><?php _e('Buscar por autor');?></li>
				<li rel="revista"><i class="fa fa-book"></i><?php _e('Buscar por revista');?></li>
				<li rel="institucion"><i class="fa fa fa-building-o"></i><?php _e('Buscar por institución');?></li>
				<li rel="articulo"><i class="fa fa-file-text-o"></i><?php _e('Buscar por artículo');?></li>
				<li rel="avanzada"><i class="fa fa-search-plus"></i><?php _e('Búsqueda avanzada');?></li>
			</ul>
			<button class="icon-search" type="submit"><span class="visuallyhidden">buscar</span></button>
			<input type="hidden" name="disciplina" value=""/>
			<input type="hidden" name="filtro" id="filtro" value="todos"/>
			<div id="advsearch"></div>
			<label>
				<span class="visuallyhidden"><?php _e('Buscar en Biblat');?></span>
	<?php if (isset($search['slug'])) :?>
				<textarea autocomplete="off" placeholder="<?php _e('Buscar en Biblat');?>" name="slug" id="slug"><?=$search['slug'];?></textarea>
	<?php else:?>
				<textarea autocomplete="off" placeholder="<?php _e('Buscar en Biblat');?>" value="" name="slug" id="slug"></textarea>
	<?php endif;?>
			</label>
		</form>
	</div><!--end search container-->
	<div id="banner">

	</div><!--end banner-->     
<div id="content_int">
<?php else:?>
	<div id="banner">
		<div id="mainSlider">
			<a href="javascript:;"><img src="<?=base_url('img/slide1.jpg');?>"></a>
		</div>
	</div><!--end banner-->    
<div id="content_int">
<?php endif;?>