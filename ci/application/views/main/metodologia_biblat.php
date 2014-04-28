<div class="contenido">
	<div class="flagContainer">
		<p class="flag">
			<em>
				<?php _e('Metodología');?>
			</em>
		</p>
	</div>
	<div class="textoJ">
		<?php _printf('La base de datos de %s está conformada por %s y %s, dos bases de datos de alcance latinoamericano y multidisciplinar. En la primera, se almacenan y recuperan los registros bibliográficos de artículos de revistas especializadas en Ciencias Sociales y Humanidades, mientras que en la segunda, los artículos de las revistas especializadas en Ciencia y Tecnología.','<span class="biblat">Biblat</span>','<a href="http://clase.unam.mx" target="_blank">CLASE</a>','<a href="http://periodica.unam.mx" target="_blank">PERIÓDICA</a>');?><br></br>
		<?php _printf('Para la generación de las frecuencias e indicadores bibliométricos se %s se basa en una muestra con las características siguientes:','<span class="biblat">Biblat</span>');?><br></br>
		<?php _e('De ambas bases se consideraron:');?><br></br>
		<ul>
			<li><?php _e('Sólo el tipo de documento “artículo”.');?></li>
			<li><?php _printf('%s  y %s cuentan con registros que datan de 1970. Sin embargo, en los primeros 10 años los registros presentan problemas de normalización de sus campos, vacíos de información en períodos importantes así como limitaciones en los datos registrados. De 1980 en adelante, los registros presentan una mejor consistencia no obstante que, para el caso de algunas revistas y períodos de tiempo, se observan lagunas considerables. A pesar de estas carencias, se integraron todos los años con el propósito de presentar la mayor información posible, además de que la información de los años recientes se actualiza paulatina y sistemáticamente.','<a href="http://clase.unam.mx" target="_blank">CLASE</a>','<a href="http://periodica.unam.mx" target="_blank">PERIÓDICA</a>');?></li>
			<li><?php _e('Sólo aquellas revistas que han sido indizadas al menos durante cinco años consecutivos.');?></li>
			<li><?php _e('Sólo se consideran artículos cuyo autor aparece con su país e institución de afiliación institucional o corporativa.');?></li>
			<li><?php _e('Se descartaron los registros de las revistas de difusión.');?></li>
			<li><?php _e('Las variables utilizadas en la conformación de los indicadores, son:');?><br></br>
				<ul>
					<li><?php _e('Tipología documental');?></li>
					<li><?php _e('Autores');?></li>
					<li><?php _e('Tipología de autoría');?></li>
					<li><?php _e('Título de la revista');?></li>
					<li><?php _e('Volumen de la revista');?></li>
					<li><?php _e('Disciplinas');?></li>
					<li><?php _e('Entidad editora');?></li>
					<li><?php _e('País de adscripción de la institución del autor');?></li>
					<li><?php _e('País de publicación de la revista');?></li>
					<li><?php _e('Temáticas o descriptores');?></li>
					<li><?php _e('Fecha de publicación');?></li>
				</ul>	
			</li>
		</ul><br></br>
		<b><?php _e('Información sobre institución de afiliación del autor:');?></b> <?php _printf('%s proporciona información sobre la adscripción institucional (o lugar de trabajo) de los autores de los artículos publicados en las revistas indizadas en %s y %s, lo cual permite generar reportes cuantitativos sobre la producción de artículos considerando a las instituciones, organismos o centros de investigación en los que los autores desempeñan su actividad académica. La generación de estos reportes es posible dado que %s y %s compilan desde el inicio de ambas bases de datos la información sobre la adscripción institucional del autor. Sin embargo, es necesario considerar la evolución de los criterios adoptados por dichas bases en la indización de esta información, dado que de ello depende su representación estadística.','<span class="biblat">Biblat</span>','<a href="http://clase.unam.mx" target="_blank">CLASE</a>','<a href="http://periodica.unam.mx" target="_blank">PERIÓDICA</a>','<a href="http://clase.unam.mx" target="_blank">CLASE</a>','<a href="http://periodica.unam.mx" target="_blank">PERIÓDICA</a>');?><br></br>
		<b><?php _printf('Hasta 1998, se registraban hasta tres niveles jerárquicos de cada institución: la Institución y sus Dependencias y Subdependencias. A partir de 1998, sólo se codifican dos niveles: Institución y Dependencia, incluyendo ciudad, estado (o división político-administrativa) y país.');?></b><br></br>
		<b><?php _printf('Hasta 1987, sólo se registraba la información de adscripción institucional del primer autor. A partir de 1988, %s y %s registran todas las instituciones diferentes que aparecen en el documento. A partir de junio de 2009, se implementa una nueva política para la codificación de esta información, consistente en el registro de todas las instituciones (manteniendo el criterio de vincular a cada autor con solo una institución) que aparecen en el documento (ver metodología en %s','<a href="http://clase.unam.mx" target="_blank">CLASE</a>','<a href="http://periodica.unam.mx" target="_blank">PERIÓDICA</a>','<a href="http://bibliotecas.unam.mx/eventos/manual/adscinstitucion.html" target="_blank">Manual de Indización</a>)');?></b><br></br><br></br>
		<p class="textoTitulo centrado"><?php _e('Normas de indización de la adscripción institucional de los autores');?></p>
		<?php _e('Para que una institución sea registrada se requiere que en el documento indizado se consignen al menos tres datos: el nombre de la institución, la ciudad y el país en que se localiza.');?>
		<?php _e('Por cada institución se registran hasta dos niveles diferentes en jerarquía:');?><br></br>
		<b><?php _e('Nombre de la Institución:');?></b> <?php _e('es el caso de universidades, ministerios, secretarías de estado, empresas u organismos internacionales, por citar los ejemplos más comunes.');?><br></br>
		<b><?php _e('Nombre de la dependencia:');?></b> <?php _e('consistente en aquellas entidades ubicadas en el nivel inferior inmediato de una institución: áreas, centros de investigación, departamentos, direcciones y facultades, por ejemplo.');?><br></br>
		<?php _e('Complementariamente se incluye la siguiente información para cada institución:');?><br></br>
		<ul>
			<li><?php _e('Nombre de la ciudad');?></li>
			<li><?php _e('Nombre de la división político-administrativa en que se ubica la ciudad');?></li>
			<li><?php _e('Nombre del país');?></li>
			<li><?php _e('Correo electrónico del primer autor');?></li>
		</ul><br></br>
		<?php _e('Solamente se registra una institución por autor. En caso de que un autor aparezca vinculado a distintas instituciones, el criterio adoptado para elegir la institución es aquella en la cual el autor desempeña su actividad académica en el momento en que se produjo el documento; en caso de que esto sea así para más de una institución se registra la que aparece en primer término.');?><br></br>
		<?php _e('También se consideran como instituciones de adscripción aquellas que, durante un período de tiempo determinado, acogen a profesores o investigadores visitantes, así como a becarios y alumnos de posgrado.');?><br></br>
		<?php _e('No se consideran instituciones de adscripción a las instituciones que patrocinaron la investigación que dio lugar al documento o las instituciones en donde el autor obtuvo sus grados académicos. Tampoco se ingresan direcciones personales.');?><br></br>
		<b><?php _printf('Sesgo hacia el país productor de las bases de datos:');?></b> <?php _e('No obstante que %s y %s son las bases de datos multidisciplinarias con más títulos de publicaciones periódicas latinoamericanas de carácter académico, lo cierto es que presentan el mismo fenómeno que enfrentan muchos servicios de información en los que predomina la información del país en donde se produce la base de datos, lo cual se manifiesta, en este caso, en el predominio de las revistas mexicanas. Por otra parte, la aparición y la consolidación de la publicación electrónica, en particular, de las publicaciones de acceso libre a través de Internet, han permitido vencer la barrera de la distancia geográfica y con ello equilibrar la representatividad por país de edición de las revistas indizadas en %s y %s. De particular importancia ha sido, en este sentido, la indización de revistas disponibles en texto completo en las diversas hemerotecas virtuales de la región que surgieron a inicios de este siglo.','<a href="http://clase.unam.mx" target="_blank">CLASE</a>','<a href="http://periodica.unam.mx" target="_blank">PERIÓDICA</a>','<a href="http://clase.unam.mx" target="_blank">CLASE</a>','<a href="http://periodica.unam.mx" target="_blank">PERIÓDICA</a>');?><br></br>
		<b><?php _printf('Normalización y actualización permanente:');?></b> <?php _printf('las bases de datos %s y %s se normalizan constantemente y de manera retrospectiva. Esto quiere decir, en primer lugar, que la información contenida en las bases está sujeta a procesos de revisión y corrección recurrentes y, en segundo lugar, que frecuentemente y por diversas causas, algunos fascículos de revistas son indizados con dos o más años de retraso. Esto implica que los datos para una revista no siempre se indizan en el mismo año de publicación ni en el siguiente. La repercusión que esto tiene en la generación de indicadores bibliométricos es que la información retrospectiva también está sujeta a modificaciones frecuentes.','<a href="http://clase.unam.mx" target="_blank">CLASE</a>','<a href="http://periodica.unam.mx" target="_blank">PERIÓDICA</a>');?><br></br>
	</div>

	<div class="flagContainer">
		<p class="flag">
			<em>
				<?php _e('Frecuencias');?>
			</em>
		</p>
	</div>
	<div class="textoJ">
		<?php _printf('Frecuencias disponibles en %s:','<span class="biblat">Biblat</span>');?><br></br>
		<?php _e('Por autor:');?><br></br>
		<ul>
			<li><a href="<?=site_url("frecuencias/autor");?>" target="_blank"><?php _e('Número de documentos publicados por autor');?></a></li>
		</ul><br></br>
		<?php _e('Por institución de afiliación del autor:');?><br></br>
		<ul>
			<li><a href="<?=site_url("frecuencias/institucion");?>" target="_blank"><?php _e('Número de documentos publicados por institución');?></a></li>
			<li><a href="<?=site_url("frecuencias/institucion");?>" target="_blank"><?php _e('Número de documentos publicados por institución según el país de la revista');?></a></li>
			<li><a href="<?=site_url("frecuencias/institucion");?>" target="_blank"><?php _e('Número de documentos publicados por institución según la revista de publicación');?></a></li>
			<li><a href="<?=site_url("frecuencias/institucion");?>" target="_blank"><?php _e('Número de documentos publicados por autor según su institución de adscripción');?></a></li>
			<li><a href="<?=site_url("frecuencias/institucion");?>" target="_blank"><?php _e('Número de documentos publicados por disciplina según la institución');?></a></li>
		</ul><br></br>
		<?php _e('Por país de institución de afiliación del autor:');?><br></br>
		<ul>
			<li><a href="<?=site_url("frecuencias/pais-afiliacion");?>" target="_blank"><?php _e('Número de documentos publicados por país de la institución de afiliación del autor');?></a></li>
			<li><a href="<?=site_url("frecuencias/pais-afiliacion");?>" target="_blank"><?php _e('Número de documentos por institución de afiliación por país');?></a></li>
			<li><a href="<?=site_url("frecuencias/pais-afiliacion");?>" target="_blank"><?php _e('Número de documentos por autor según país de institución de afiliación');?></a></li>
			<li><?php _e('Número de documentos por disciplina según país de la institución del autor');?></li>
		</ul><br></br>
		<?php _e('Por disciplina:');?><br></br>
		<ul>
			<li><?php _e('Número de documentos publicados por disciplina');?></li>
			<li><?php _e('Número de documentos publicados por disciplina y revista');?></li>
			<li><?php _e('Número de documentos publicados por disciplina e institución de afiliación del autor');?></li>
			<li><?php _e('Número de documentos publicados por disciplina y país de la revista');?></li>
			<li><?php _e('Número de documentos publicados por disciplina y país de la institución de afiliación del autor');?></li>
		</ul><br></br>
		<?php _e('Por revista:');?><br></br>
		<ul>
			<li><a href="<?=site_url("frecuencias/revista");?>" target="_blank"><?php _e('Número de documentos publicados por revista');?></a></li>
			<li><a href="<?=site_url("frecuencias/revista");?>" target="_blank"><?php _e('Número de documentos publicados por autor y revista');?></a></li>
			<li><?php _e('Número de documentos publicados por institución de afiliación del autor en las revistas');?></li>
			<li><?php _e('Número de artículos publicados por año');?></li>
		</ul><br></br>
	</div>

	<div class="flagContainer">
		<p class="flag">
			<em>
				<?php _e('Indicadores');?>
			</em>
		</p>
	</div>
	<div class="textoJ">
		<?php _e('El módulo de Indicadores proporciona 13 indicadores bibliométricos agrupados, de acuerdo con su especificidad, en tres rubros:');?><br></br>
		<ul>
			<li><b><?php _e('De autoría y colaboración entre autores');?></b> <?php _printf('(4 indicadores)');?></li>
			<li><b><?php _e('De productividad de los autores');?></b> <?php _printf('(2 indicadores)');?></li>
			<li><b><?php _e('De Concentración – Dispersión, Núcleo básico de revistas y densidad de la información');?></b> <?php _printf('( 4 indicadores)');?></li>
			<li><b><?php _e('Coautorías');?></b> <?php _printf('(3 indicadores)');?></li>
		</ul><br></br>
		<?php _printf('Estos indicadores se enfocan en la obtención de datos objetivos que nos dan cuenta del comportamiento y las regularidades de la producción científica contenida en %s.','<span class="biblat">Biblat</span>');?><br></br>
	</div>

	<div id="info-indice-coautoria" class="infoBox">
		<p class="textoTitulo centrado"><a href="<?=site_url("indicadores/indice-coautoria");?>" target="_blank"><?php _e('Índice de Coautoría');?></a><sup>1</sup></p>
		<p class="textoL">
			<?php _e('Este indicador muestra el número promedio de autores por artículo.');?><br/>
		</p>
		<p class="textoL ident1"><?php _e('La formulación matemática es:');?></p>
		<div class="textoL ident2 formula">
			<span><i>Ic</i> = </span>
			<div class="fraction">
				<span class="fup"><i>Caf</i></span>
				<span class="bar">/</span>
				<span class="fdn"><i>Cd</i></span>
			</div>
		</div>
		<p class="textoL ident1">
			<?php _e('Donde:');?><br/>
			<i>Caf</i> = <?php _e('Cantidad de autores firmantes');?><br/>
			<i>Cd</i> = <?php _e('Cantidad de documentos');?>
		</p>
		<p class="textoL">
			<?php _e('El resultado del indicador da cuenta del número promedio de autores por artículo por revista, país de publicación de la revista o país de la institución de afiliación de los autores, así como su evolución temporal.');?><br></br>
		</p>
	</div>
		
	<div id="info-tasa-documentos-coautorados" class="infoBox">
		<p class="textoTitulo centrado"><a href="<?=site_url("indicadores/tasa-documentos-coautorados");?>" target="_blank"><?php _e('Tasa de Documentos Coautorados');?></a><sup>2</sup></p>
		<p class="textoL">
			<?php _e('El valor numérico indica la proporción de artículos con autoría múltiple.');?>
		</p>
		<p class="textoL ident1"><?php _e('La formulación matemática es:');?></p>
		<div class="textoL ident2 formula">
			<i>Tdc</i> = 
				<div class="fraction">
					<span class="fup"><i>Cta</i></span>
					<span class="bar">/</span>
					<span class="fdn"><i>Ctd</i></span>
				</div>
		</div>
		<p class="textoL ident1">
			<?php _e('Donde:');?><br/>
			<i>Cta</i> = <?php _e('Cantidad total de documentos con autoría multiple');?><br/>
			<i>Ctd</i> = <?php _e('Cantidad total de documentos');?>
		</p>
		<p class="textoL">
			<?php _e('Brinda información sobre la proporción de artículos con autoría múltiple por título de la revista, país de publicación de la revista o país de la institución de afiliación de los autores, así como su evolución temporal. Se interpreta que valores cercanos a 1 muestran mayor cantidad de documentos en coautoría.');?>
		</p>
	</div>

	<div id="info-grado-colaboracion" class="infoBox">
		<p class="textoTitulo centrado"><a href="<?=site_url("indicadores/grado-colaboracion");?>" target="_blank"><?php _e('Grado de Colaboración (Índice de Subramanyan)');?></a><sup>3</sup></p>
		<p class="textoL">
				<?php _e('El valor numérico indica la proporción de artículos con autoría múltiple.');?>
		</p>
		<p class="textoL ident1"><?php _e('La formulación matemática es:');?></p>
		<div class="textoL formula ident2">
			<i>GC</i> = 
			<div class="fraction">
				<span class="fup"><i>N<sub>m</sub></i></span>
				<span class="bar">/</span>
				<span class="fdn"><i>N<sub>m</sub> + N<sub>s</sub></i></span>
			</div>
		</div>
		<p class="textoL ident2">
			<?php _e('Donde:');?><br/>
			<i>N<sub>m</sub></i> = <?php _e('Total de documentos con autoría múltiple.');?><br/>
			<i>N<sub>s</sub></i> = <?php _e('Total de documentos escritos por un solo autor.');?>
		</p>
		<p class="textoL">
			<?php _e('El valor numérico indica la proporción de documentos escritos en colaboración y los documentos con autoría simple, indicado el grado de colaboración por título de revista o país de publicación de la revista. Se interpreta que valores cercanos a 0 muestran un fuerte componente de autoría simple, mientras que los cercanos a 1 denotan una fuerte proporción de autoría múltiple.');?>
		</p>
	</div>

	<div id="info-indice-colaboracion" class="infoBox">
		<p class="textoTitulo centrado"><a href="<?=site_url("indicadores/indice-colaboracion");?>" target="_blank"><?php _e('Índice de Colaboración (Índice de Lawani)');?></a><sup>4</sup></p>
		<p class="textoL ident1"><?php _e('La formulación matemática es:');?></p>
		<div class="textoL ident2 formula">
			<i>IC</i> = 
			<span class="intsuma">
				<span class="lim">N</span>
				<span class="sum-frac">&sum;</span>
				<span class="lim"><i>i</i>=1</span>
			</span>
			<div class="fraction">
				<span class="fup"><i>j<sub>i</sub> n<sub>j</sub></i></span>
				<span class="bar">/</span>
				<span class="fdn"><i>N</i></span>
			</div>
		</div>
		<p class="textoL ident1">
			<?php _e('Donde:');?><br/>
			<i>N</i> = <?php _e('Total de documentos.');?><br/>
			<i>j<sub>i</sub></i> = <?php _e('Número de firmas (autores) por documentos.');?><br/>
			<i>n<sub>i</sub></i> =  <?php _e('Cantidad de documentos con autoría múltiple.');?>
		</p>
		<p class="textoL">
			<?php _e('Proporciona el peso promedio del número de autores por documento.');?><br/>
			<?php _e('El valor numérico representa el promedio de autores por documento.');?><br/>
		</p>				
	</div>

	<div id="info-modelo-elitismo" class="infoBox">
		<p class="textoTitulo centrado"><a href="<?=site_url("indicadores/modelo-elitismo");?>" target="_blank"><?php _e('Modelo de Elitismo (Price)');?></a><sup>5</sup></p>
		<p class="textoL ident1"><?php _e('La formulación matemática es:');?></p>
		<div class="textoL ident2 formula">
				<i>E</i> = 
				<span class="radical">&radic;</span><span class="radicand"><i>N</i></span>
		</div>
		<p class="textoL ident1">
			<?php _e('Donde:');?><br/>
			<i>E</i> = <?php _printf('Elite de autores que publican el 50%% de los trabajos.');?><br/>
			<i>N</i> = <?php _e('Población total de autores.');?>
		</p>
		<p class="textoL">
			<?php _e('Es uno de los indicadores más importantes para medir la productividad científica de los autores ya que identifica la elite de autores más productivos por título de revista o país de publicación de la revista.');?><br/>
		</p>				
	</div>

	<div id="info-indice-densidad-documentos" class="infoBox">
		<p class="textoTitulo centrado"><a href="<?=site_url("indicadores/indice-densidad-documentos");?>" target="_blank"><?php _e('Índice de Densidad de Documentos Zakutina y Priyenikova');?></a><sup>6</sup></p>
		<p class="textoL ident1"><?php _e('La formulación matemática es:');?></p>
		<div class="textoL ident2 formula">
				<i>p</i> = 
				<div class="fraction">
					<span class="fup"><i>Rn</i></span>
					<span class="bar">/</span>
					<span class="fdn"><i>N</i></span>
				</div>
		</div>
		<p class="textoL ident1">
			<?php _e('Donde');?>:<br/>
			<i>Rn</i> = &sum; <?php _e('Artículos');?>.<br/>
			<i>N</i> = &sum; <?php _e('Títulos de revistas');?>.
		</p>
		<p class="textoL">
			<?php _e('Índice que identifica los títulos con mayor densidad de información.');?><br/>
			<?php _e('El valor numérico proporciona la cantidad de documentos publicados por revista o país de publicación de la revista al año.');?>
		</p>
	</div>

	<div id="info-indice-concentracion" class="infoBox">
		<p class="textoTitulo centrado"><a href="<?=site_url("indicadores/indice-concentracion");?>" target="_blank"><?php _e('Índice de concentración temática (Índice de Pratt)');?></a><sup>7</sup></p>
		<p class="textoL ident1"><?php _e('La formulación matemática es:');?></p>
		<div class="textoL ident2 formula">
				<i>C</i> = 
				<div class="fraction">
					<span class="fup">2{[(<i>n</i>+1)/2]-<i>q</i>}</span>
					<span class="bar">/</span>
					<span class="fdn"><i>n</i>-1</span>
				</div>
		</div>
		<p class="textoL ident1">
			<?php _e('Donde:');?><br/>
			<i>C</i> = <?php _e('Índice de concentración de Pratt.');?><br/>
			<i>n</i> = <?php _e('Número de categorías.');?><br/>
			<i>q</i> = <?php _e('&sum; del producto del rango por la frecuencia de una categoría dada, dividido por la cantidad de ítems en todas las categorías.');?>
		</p>
		<p class="textoJ">
				<?php _e('Muestra las revistas de la disciplina seleccionada ordenándolas según su grado de especialización en proporción con todas las categorías existentes por título de revista y basándose en los descriptores de los documentos publicados. El valor numérico representa el nivel de concentración temática basándose en sus descriptores. Además de proporcionar frecuencias de los descriptores existentes. Se interpreta que valores cercanos a 1 muestran mayor grado de especialización.');?><br/>
		</p>				
	</div>

	<div id="info-modelo-bradford-revista" class="infoBox">
		<p class="textoTitulo centrado"><a href="<?=site_url("indicadores/modelo-bradford-revista");?>" target="_blank"><?php _e('Modelo de Bradford por revista');?></a><sup>8</sup><br/>
		<p class="textoL ident1"><?php _e('La formulación matemática es:');?></p>
		<div class="textoL ident2 formula">
				<i>p</i>:<i>p</i><sub>1</sub>:<i>p</i><sub>2</sub>:1:<i>n</i><sub>1</sub>:<i>n</i><sub>2</sub>
		</div>
		<p class="textoL ident1">
			<?php _e('Donde:');?><br/>
			<i>p</i> = <?php _e('Cantidad de títulos por zona.');?><br/>
			<i>n</i> = <?php _e('Multiplicador o factor de proporcionalidad de títulos por zona.');?>
		</p>
		<p class="textoL">
			<?php _e('Este indicador mide la concentración - dispersión de la información por revista identificando tres zonas: los títulos de revistas más importantes para la disciplina conformado por los títulos más productivos y especializados (zona núcleo), grupo de títulos con menor concentración de artículos en la disciplina (segunda zona) y tercer zona que representan el resto de títulos relacionados con la disciplina. Además de mostrar la cantidad de títulos y artículos por zona.');?><br/>
		</p>
	</div>

	<div id="info-modelo-bradford-institucion" class="infoBox">
		<p class="textoTitulo centrado"><a href="<?=site_url("indicadores/indice-concentracion");?>" target="_blank"><?php _e('Modelo de Bradford (Productividad institucional)');?></a><br/>
		</p>
		<p class="textoL ident1"><?php _e('La formulación matemática es:');?></p>
		<div class="textoL ident2 formula">
				<i>p</i>:<i>p</i><sub>1</sub>:<i>p</i><sub>2</sub>:1:<i>n</i><sub>1</sub>:<i>n</i><sub>2</sub>
		</div>
		<p class="textoL ident1">
			<?php _e('Donde:');?><br/>
			<i>p</i> = <?php _e('Cantidad de instituciones por zona.');?><br/>
			<i>n</i> = <?php _e('Multiplicador o factor de proporcionalidad de instituciones por zona.');?>
		</p>
		<p class="textoL">
			<?php _e('Es una variante del modelo original de Bradford. Este indicador mide la concentración - dispersión de la información por institución de adscripción del autor, identificando tres zonas: las instituciones más importantes para la disciplina conformado por aquellas más productivas y especializadas (zona núcleo), grupo de instituciones con menor concentración de artículos publicados en la disciplina (segunda zona) y  tercer zona  que presentan el resto de instituciones relacionadas con la disciplina. Además de mostrar la cantidad de instituciones y artículos por zona.');?><br/>
		</p>
	</div>

	<p class="textoTitulo centrado"><a href="<?=site_url("indicadores/productividad-exogena");?>" target="_blank"><?php _e('Productividad exógena por título de revista');?></a></p>
	<p class="textoJ">
		<?php _e('Es un indicador que se utiliza para medir el grado de internacionalización de las revistas, considerando la proporción de autores cuya institución de afiliación es de una nacionalidad distinta a la de la revista. Proporciona la tasa de productividad exógena por revista y la frecuencia de nacionalidad de sus autores.');?><br/>

	<p class="textoTitulo centrado"><?php _e('Regionalización de la producción institucional');?></p>
	<p class="textoJ">
		<?php _e('Número de artículos publicados por institución de afiliación del autor según país de publicación de la revistas [institución de afiliación + país de la institución de afiliación del autor + país de publicación de la revista]');?><br/>
		<?php _e('Evolución temporal');?><br/>

	<p class="textoTitulo centrado"><?php _e('Coautoría por institución de afiliación del autor');?></p>
	<p class="textoJ">
		<?php _e('Número de documentos publicados en coautoría de acuerdo con la institución de afiliación del autor [institución de afiliación del autor : misma institución y otras]');?><br/>
		<?php _e('Evolución temporal');?><br/>
		
	<p class="textoTitulo centrado"><?php _e('Coautoría según país de la institución de afiliación del autor');?></p>
	<p class="textoJ">
		<?php _e('Número de documentos publicados en coautoría de acuerdo con el país de la institución de afiliación del autor [país de la institución de afiliación del autor : misma institución y otras]');?><br/>
		<?php _e('Evolución temporal');?><br/>
	</p><br></br>
	<div class="textoJ">
		<?php _printf('Contacto para comentarios y consultas: %s','<a href="mailto:biblat@dgb.unam.mx">biblat@dgb.unam.mx</a>');?><br></br>
	</div>
</div>