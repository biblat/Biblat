
		<p>{_('La base de datos de')} <span class="biblat"><acronym title="{_('Bibliografía Latinoamericana')}">Biblat</acronym></span> {$clase=_('Citas Latinoamericanas en Ciencias Sociales y Humanidades') $periodica=_('Índice de Revistas Latinoamericanas en Ciencias') _sprintf('está conformada por %s y %s, dos bases de datos de alcance latinoamericano y multidisciplinar. En la primera, se almacenan y recuperan los registros bibliográficos de artículos de revistas especializadas en Ciencias Sociales y Humanidades, mientras que en la segunda, los artículos de las revistas especializadas en Ciencia y Tecnología.','<a href="http://clase.unam.mx" target="_blank"><acronym title="$clase">CLASE</acronym></a>','<a href="http://periodica.unam.mx" target="_blank"><acronym title="$periodica">PERIÓDICA</acronym></a>')}</p>
		<p>{$biblat=_('Bibliografía Latinoamericana') _sprintf('Para la generación de las frecuencias e indicadores bibliométricos %s se basa en una muestra con las características siguientes:','<span class="biblat"><acronym title="$biblat">Biblat</acronym></span>')}</p>
		<p>{_('De ambas bases se consideraron:')}</p>
		<ul>
			<li>{_('Sólo el tipo de documento “artículo”.')}</li>
			<li>{_sprintf('%s y %s cuentan con registros que datan de 1970. Sin embargo, en los primeros 10 años los registros presentan problemas de normalización de sus campos, vacíos de información en períodos importantes así como limitaciones en los datos registrados. De 1980 en adelante, los registros presentan una mejor consistencia no obstante que, para el caso de algunas revistas y períodos de tiempo, se observan lagunas considerables. A pesar de estas carencias, se integraron todos los años con el propósito de presentar la mayor información posible, además de que la información de los años recientes se actualiza paulatina y sistemáticamente.','<a href="http://clase.unam.mx" target="_blank"><acronym title="$clase">CLASE</acronym></a>','<a href="http://periodica.unam.mx" target="_blank"><acronym title="$periodica">PERIÓDICA</acronym></a>')}</li>
			<li>{_('Sólo aquellas revistas que han sido indizadas al menos durante cinco años consecutivos.')}</li>
			<li>{_('Sólo se consideran artículos cuyo autor aparece con su país e institución de afiliación institucional o corporativa.')}</li>
			<li>{_('Se descartaron los registros de las revistas de difusión.')}</li>
			<li>{_('Las variables utilizadas en la conformación de los indicadores, son:')}<br></br>
			<ul>
				<li>{_('Tipología documental')}</li>
				<li>{_('Autores')}</li>
				<li>{_('Tipología de autoría')}</li>
				<li>{_('Título de la revista')}</li>
				<li>{_('Volumen de la revista')}</li>
				<li>{_('Disciplinas')}</li>
				<li>{_('Entidad editora')}</li>
				<li>{_('País de adscripción de la institución del autor')}</li>
				<li>{_('País de publicación de la revista')}</li>
				<li>{_('Temáticas o descriptores')}</li>
				<li>{_('Fecha de publicación')}</li>
			</ul>	
			</li>
		</ul>
		<p><b>{_('Información sobre institución de afiliación del autor:')}</b> {_sprintf('%s proporciona información sobre la adscripción institucional (o lugar de trabajo) de los autores de los artículos publicados en las revistas indizadas en %s y %s, lo cual permite generar reportes cuantitativos sobre la producción de artículos considerando a las instituciones, organismos o centros de investigación en los que los autores desempeñan su actividad académica. La generación de estos reportes es posible dado que %s y %s compilan desde el inicio de ambas bases de datos la información sobre la adscripción institucional del autor. Sin embargo, es necesario considerar la evolución de los criterios adoptados por dichas bases en la indización de esta información, dado que de ello depende su representación estadística.','<span class="biblat"><acronym title="$biblat">Biblat</acronym></span>','<a href="http://clase.unam.mx" target="_blank"><acronym title="$clase">CLASE</acronym></a>','<a href="http://periodica.unam.mx" target="_blank"><acronym title="$periodica">PERIÓDICA</acronym></a>','<a href="http://clase.unam.mx" target="_blank"><acronym title="$clase">CLASE</acronym></a>','<a href="http://periodica.unam.mx" target="_blank"><acronym title="$periodica">PERIÓDICA</acronym></a>')}</p>

		<p><strong>{_('Hasta 1998, se registraban hasta tres niveles jerárquicos de cada institución: la Institución y sus Dependencias y Subdependencias. A partir de 1998, sólo se codifican dos niveles: Institución y Dependencia, incluyendo ciudad, estado (o división político-administrativa) y país.')}</strong></p>

		<p><strong>{_sprintf('Hasta 1987, sólo se registraba la información de adscripción institucional del primer autor. A partir de 1988, %s y %s registran todas las instituciones diferentes que aparecen en el documento. A partir de junio de 2009, se implementa una nueva política para la codificación de esta información, consistente en el registro de todas las instituciones (manteniendo el criterio de vincular a cada autor con solo una institución) que aparecen en el documento (ver metodología en %s','<a href="http://clase.unam.mx" target="_blank"><acronym title="$clase">CLASE</acronym></a>','<a href="http://periodica.unam.mx" target="_blank"><acronym title="$periodica">PERIÓDICA</acronym></a>','<a href="http://bibliotecas.unam.mx/eventos/manual/adscinstitucion.html" target="_blank">Manual de Indización</a>)')}</strong></p><br></br>
		<div class="page_title">
            <hr/>
            <h4>{_('Normas de indización de la adscripción institucional de los autores')}</h4>
            <hr/>
        </div>
		<p>{_('Para que una institución sea registrada se requiere que en el documento indizado se consignen al menos tres datos: el nombre de la institución, la ciudad y el país en que se localiza.')}</p>

		<p>{_('Por cada institución se registran hasta dos niveles diferentes en jerarquía:')}</p>

		<p><b>{_('Nombre de la Institución:')}</b> {_('es el caso de universidades, ministerios, secretarías de estado, empresas u organismos internacionales, por citar los ejemplos más comunes.')}</p>
		<p><b>{_('Nombre de la dependencia:')}</b> {_('consistente en aquellas entidades ubicadas en el nivel inferior inmediato de una institución: áreas, centros de investigación, departamentos, direcciones y facultades, por ejemplo.')}</p>

		<p>{_('Complementariamente se incluye la siguiente información para cada institución:')}</p>
		<ul>
			<li>{_('Nombre de la ciudad')}</li>
			<li>{_('Nombre de la división político-administrativa en que se ubica la ciudad')}</li>
			<li>{_('Nombre del país')}</li>
			<li>{_('Correo electrónico del primer autor')}</li>
		</ul>

		<p>{_('Solamente se registra una institución por autor. En caso de que un autor aparezca vinculado a distintas instituciones, el criterio adoptado para elegir la institución es aquella en la cual el autor desempeña su actividad académica en el momento en que se produjo el documento; en caso de que esto sea así para más de una institución se registra la que aparece en primer término.')}</p>

		<p>{_('También se consideran como instituciones de adscripción aquellas que, durante un período de tiempo determinado, acogen a profesores o investigadores visitantes, así como a becarios y alumnos de posgrado.')}</p>

		<p>{_('No se consideran instituciones de adscripción a las instituciones que patrocinaron la investigación que dio lugar al documento o las instituciones en donde el autor obtuvo sus grados académicos. Tampoco se ingresan direcciones personales.')}</p>

		<p><b>{_('Sesgo hacia el país productor de las bases de datos:')}</b> {_sprintf('No obstante que %s y %s son las bases de datos multidisciplinarias con más títulos de publicaciones periódicas latinoamericanas de carácter académico, lo cierto es que presentan el mismo fenómeno que enfrentan muchos servicios de información en los que predomina la información del país en donde se produce la base de datos, lo cual se manifiesta, en este caso, en el predominio de las revistas mexicanas. Por otra parte, la aparición y la consolidación de la publicación electrónica, en particular, de las publicaciones de acceso libre a través de Internet, han permitido vencer la barrera de la distancia geográfica y con ello equilibrar la representatividad por país de edición de las revistas indizadas en %s y %s. De particular importancia ha sido, en este sentido, la indización de revistas disponibles en texto completo en las diversas hemerotecas virtuales de la región que surgieron a inicios de este siglo.','<a href="http://clase.unam.mx" target="_blank"><acronym title="$clase">CLASE</acronym></a>','<a href="http://periodica.unam.mx" target="_blank"><acronym title="$periodica">PERIÓDICA</acronym></a>','<a href="http://clase.unam.mx" target="_blank"><acronym title="$clase">CLASE</acronym></a>','<a href="http://periodica.unam.mx" target="_blank"><acronym title="$periodica">PERIÓDICA</acronym></a>')}</p>

                <p><b>{_('Normalización y actualización permanente:')}</b> {_sprintf('las bases de datos %s y %s se normalizan constantemente y de manera retrospectiva. Esto quiere decir, en primer lugar, que la información contenida en las bases está sujeta a procesos de revisión y corrección recurrentes y, en segundo lugar, que frecuentemente y por diversas causas, algunos fascículos de revistas son indizados con dos o más años de retraso. Esto implica que los datos para una revista no siempre se indizan en el mismo año de publicación ni en el siguiente. La repercusión que esto tiene en la generación de indicadores bibliométricos es que la información retrospectiva también está sujeta a modificaciones frecuentes.','<a href="http://clase.unam.mx" target="_blank"><acronym title="$clase">CLASE</acronym></a>','<a href="periodica" target="_blank"><acronym title="$periodica">PERIÓDICA</acronym></a>')}</p>
		
		<div class="page_title">
            <hr/>
            <h4>{_('Frecuencias')}</h4>
            <hr/>
        </div>

		<p>{_sprintf('Frecuencias disponibles en %s:','<span class="biblat"><acronym title="$biblat">Biblat</acronym></span>')}</p>
		<p>{_('Por autor:')}</p>
		<ul>
			<li><a href="{site_url("frecuencias/autor")}" target="_blank">{_('Número de documentos publicados por autor')}</a></li>
		</ul>
		<p>{_('Por institución de afiliación del autor:')}</p>
		<ul>
			<li><a href="{site_url("frecuencias/institucion")}" target="_blank">{_('Número de documentos publicados por institución')}</a></li>
			<li><a href="{site_url("frecuencias/institucion")}" target="_blank">{_('Número de documentos publicados por institución según el país de la revista')}</a></li>
			<li><a href="{site_url("frecuencias/institucion")}" target="_blank">{_('Número de documentos publicados por institución según la revista de publicación')}</a></li>
			<li><a href="{site_url("frecuencias/institucion")}" target="_blank">{_('Número de documentos publicados por autor según su institución de adscripción')}</a></li>
			<li><a href="{site_url("frecuencias/institucion")}" target="_blank">{_('Número de documentos publicados por disciplina según la institución')}</a></li>
		</ul>
		<p>{_('Por país de institución de afiliación del autor:')}</P>
		<ul>
			<li><a href="{site_url("frecuencias/pais-afiliacion")}" target="_blank">{_('Número de documentos publicados por país de la institución de afiliación del autor')}</a></li>
			<li><a href="{site_url("frecuencias/pais-afiliacion")}" target="_blank">{_('Número de documentos por institución de afiliación por país')}</a></li>
			<li><a href="{site_url("frecuencias/pais-afiliacion")}" target="_blank">{_('Número de documentos por autor según país de institución de afiliación')}</a></li>
			<li><a href="{site_url("frecuencias/pais-afiliacion")}" target="_blank">{_('Número de documentos por disciplina según país de la institución del autor')}</a></li>
		</ul>
		<p>{_('Por disciplina:')}</p>
		<ul>
			<li><a href="{site_url("frecuencias/disciplina")}" target="_blank">{_('Número de documentos publicados por disciplina')}</a></li>
			<li><a href="{site_url("frecuencias/disciplina")}" target="_blank">{_('Número de documentos publicados por disciplina y revista')}</a></li>
			<li><a href="{site_url("frecuencias/disciplina")}" target="_blank">{_('Número de documentos publicados por disciplina e institución de afiliación del autor')}</a></li>
			<li><a href="{site_url("frecuencias/disciplina")}" target="_blank">{_('Número de documentos publicados por disciplina y país de la revista')}</a></li>
			<li><a href="{site_url("frecuencias/disciplina")}" target="_blank">{_('Número de documentos publicados por disciplina y país de la institución de afiliación del autor')}</a></li>
		</ul>
		<p>{_('Por revista:')}</p>
		<ul>
			<li><a href="{site_url("frecuencias/revista")}" target="_blank">{_('Número de documentos publicados por revista')}</a></li>
			<li><a href="{site_url("frecuencias/revista")}" target="_blank">{_('Número de documentos publicados por autor y revista')}</a></li>
			<li><a href="{site_url("frecuencias/revista")}" target="_blank">{_('Número de documentos publicados por institución de afiliación del autor en las revistas')}</a></li>
			<li><a href="{site_url("frecuencias/revista")}" target="_blank">{_('Número de artículos publicados por año')}</a></li>
		</ul>
		<div class="page_title">
            <hr/>
            <h4>{_('Indicadores')}</h4>
            <hr/>
        </div>
			
		<p>{_('El módulo de Indicadores proporciona 11 indicadores bibliométricos agrupados, de acuerdo con su especificidad, en tres rubros:')}
		<ul>
			<li><b>{_('De autoría y colaboración entre autores')}</b> {_('(2 indicadores)')}</li>
			<li><b>{_('De productividad de los autores')}</b> {_('(2 indicadores)')}</li>
			<li><b>{_('De Concentración – Dispersión, Núcleo básico de revistas y densidad de la información')}</b> {_('(4 indicadores)')}</li>
			<li><b>{_('Coautorías')}</b> {_('(3 indicadores)')}</li>
		</ul>
		<p>{_sprintf('Estos indicadores se enfocan en la obtención de datos objetivos que nos dan cuenta del comportamiento y las regularidades de la producción científica contenida en %s.','<span class="biblat"><acronym title="$biblat">Biblat</acronym></span>')}</p>

		<div class="page_title">
            <hr/>
            <h4><a href="{site_url("indicadores/indice-coautoria")}" target="_blank">{_('Índice de Coautoría')}</a><span class="supIndice"><a class="referencia" href="#ref1"><sup>1</sup></a></span></h4>
            <hr/>
        </div>
				
		<p>{_('Este indicador muestra el número promedio de autores por artículo.')}</p>
		<p >{_('La formulación matemática es:')}</p>
		<div class="formula">
			<span><i>Ic</i> = </span>
			<div class="fraction">
				<span class="fup"><i>Caf</i></span>
				<span class="bar">/</span>
				<span class="fdn"><i>Cd</i></span>
			</div>
		</div>
		<p>
			{_('Donde:')}<br/>
			<i>Caf</i> = {_('Cantidad de autores firmantes')}<br/>
			<i>Cd</i> = {_('Cantidad de documentos')}
		</p>
		<p>{_('El resultado del indicador da cuenta del número promedio de autores por artículo por revista, país de publicación de la revista o país de la institución de afiliación de los autores, así como su evolución temporal.')}</p>
		<!--div class="page_title">
            <hr/>
            <h4><a href="{site_url("indicadores/tasa-documentos-coautorados")}" target="_blank">{_('Tasa de Documentos Coautorados')}</a><span class"supIndice"><a class="referencia" href="#ref2"><sup>2</sup></a></span></h4>
            <hr/>
        </div>	
		<p>{_('El valor numérico indica la proporción de artículos con autoría múltiple.')}</p>
		<p>{_('La formulación matemática es:')}</p>
		<div class="formula">
			<i>Tdc</i> = 
			<div class="fraction">
				<span class="fup"><i>Cta</i></span>
				<span class="bar">/</span>
				<span class="fdn"><i>Ctd</i></span>
			</div>
		</div>
		<p>
			{_('Donde:')}<br/>
			<i>Cta</i> = {_('Cantidad total de documentos con autoría multiple')}<br/>
			<i>Ctd</i> = {_('Cantidad total de documentos')}
		</p>
		<p>{_('Brinda información sobre la proporción de artículos con autoría múltiple por título de la revista, país de publicación de la revista o país de la institución de afiliación de los autores, así como su evolución temporal. Se interpreta que valores cercanos a 1 muestran mayor cantidad de documentos en coautoría.')}</p>
		-->
		<!--div class="page_title">
            <hr/>
            <h4><a href="{site_url("indicadores/grado-colaboracion")}" target="_blank">{_('Grado de Colaboración (Índice de Subramanyan)')}</a><a class="referencia" href="#ref3"><sup>3</sup></a></h4>
            <hr/>
        </div>

		<p>{_('El valor numérico indica la proporción de artículos con autoría múltiple.')}</p>
		<p>{_('La formulación matemática es:')}</p>
		<div class="formula">
			<i>GC</i> = 
			<div class="fraction">
				<span class="fup"><i>N<sub>m</sub></i></span>
				<span class="bar">/</span>
				<span class="fdn"><i>N<sub>m</sub> + N<sub>s</sub></i></span>
			</div>
		</div>
		<p>
			{_('Donde:')}<br/>
			<i>N<sub>m</sub></i> = {_('Total de documentos con autoría múltiple.')}<br/>
			<i>N<sub>s</sub></i> = {_('Total de documentos escritos por un solo autor.')}
		</p>
		<p>{_('El valor numérico indica la proporción de documentos escritos en colaboración y los documentos con autoría simple, indicado el grado de colaboración por título de revista o país de publicación de la revista. Se interpreta que valores cercanos a 0 muestran un fuerte componente de autoría simple, mientras que los cercanos a 1 denotan una fuerte proporción de autoría múltiple.')}</p>
        -->
		<!--div class="page_title">
            <hr/>
            <h4><a href="{site_url("indicadores/indice-colaboracion")}" target="_blank">{_('Índice de Colaboración (Índice de Lawani)')}</a><a class="referencia" href="#ref4"><sup>4</sup></a></h4>
            <hr/>
        </div>
		<p>{_('La formulación matemática es:')}</p>
		<div class="formula">
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
		<p>
			{_('Donde:')}<br/>
			<i>N</i> = {_('Total de documentos.')}<br/>
			<i>j<sub>i</sub></i> = {_('Número de firmas (autores) por documentos.')}<br/>
			<i>n<sub>i</sub></i> = {_('Cantidad de documentos con autoría múltiple.')}
		</p>
		<p>
			{_('Proporciona el peso promedio del número de autores por documento.')}<br/>
			{_('El valor numérico representa el promedio de autores por documento.')}<br/>
		</p>				
		-->
		<div class="page_title">
            <hr/>
            <h4><a href="{site_url("indicadores/modelo-elitismo")}" target="_blank">{_('Modelo de Elitismo (Price)')}</a><a class="referencia" href="#ref5"><sup>5</sup></a></h4>
            <hr/>
        </div>
		<p>{_('La formulación matemática es:')}</p>
		<div class="formula">
			<i>E</i> = 
			<span class="radical">&radic;</span><span class="radicand"><i>N</i></span>
		</div>
		<p>
			{_('Donde:')}<br/>
			<i>E</i> = {_sprintf('Elite de autores que publican el 50%% de los trabajos.')}<br/>
			<i>N</i> = {_('Población total de autores.')}
		</p>
		<p>{_('Es uno de los indicadores más importantes para medir la productividad científica de los autores ya que identifica la elite de autores más productivos por título de revista o país de publicación de la revista.')}</p>				
		<div class="page_title">
            <hr/>
            <h4><a href="{site_url("indicadores/indice-densidad-documentos")}" target="_blank">{_('Índice de Densidad de Documentos (Zakutina y Priyenikova)')}</a><a class="referencia" href="#ref6"><sup>6</sup></a></h4>
            <hr/>
        </div>
		<p>{_('La formulación matemática es:')}</p>
		<div class="formula">
			<i>p</i> = 
			<div class="fraction">
				<span class="fup"><i>Rn</i></span>
				<span class="bar">/</span>
				<span class="fdn"><i>N</i></span>
			</div>
		</div>
		<p>
			{_('Donde')}:<br/>
			<i>Rn</i> = &sum; {_('Artículos')}.<br/>
			<i>N</i> = &sum; {_('Títulos de revistas')}.
		</p>
		<p>
			{_('Índice que identifica los títulos con mayor densidad de información.')}<br/>
			{_('El valor numérico proporciona la cantidad de documentos publicados por revista o país de publicación de la revista al año.')}
		</p>

		<div class="page_title">
            <hr/>
            <h4><a href="{site_url("indicadores/indice-concentracion")}" target="_blank">{_('Índice de concentración temática (Índice Pratt)')}</a><a class="referencia" href="#ref7"><sup>7</sup></a></h4>
            <hr/>
        </div>
		<p>{_('La formulación matemática es:')}</p>
		<div class="formula">
			<i>C</i> = 
			<div class="fraction">
				<span class="fup">{literal}2{[(<i>n</i>+1)/2]-<i>q</i>}{/literal}</span>
				<span class="bar">/</span>
				<span class="fdn"><i>n</i>-1</span>
			</div>
		</div>
		<p>
			{_('Donde:')}<br/>
			<i>C</i> = {_('Índice de concentración de Pratt.')}<br/>
			<i>n</i> = {_('Número de categorías.')}<br/>
			<i>q</i> = {_('&sum; del producto del rango por la frecuencia de una categoría dada, dividido por la cantidad de ítems en todas las categorías.')}
		</p>
		<p>{_('Muestra las revistas de la disciplina seleccionada ordenándolas según su grado de especialización en proporción con todas las categorías existentes por título de revista y basándose en los descriptores de los documentos publicados. El valor numérico representa el nivel de concentración temática basándose en sus descriptores. Además de proporcionar frecuencias de los descriptores existentes. Se interpreta que valores cercanos a 1 muestran mayor grado de especialización.')}</p>				

		<div class="page_title">
            <hr/>
            <h4><a href="{site_url("indicadores/modelo-bradford-revista")}" target="_blank">{_('Modelo de Bradford (Revista)')}</a><a class="referencia" href="#ref8"><sup>8</sup></a></h4>
            <hr/>
        </div>
		<p>{_('La formulación matemática es:')}</p>
		<div class="formula">
			<i>p</i>:<i>p</i><sub>1</sub>:<i>p</i><sub>2</sub>:1:<i>n</i><sub>1</sub>:<i>n</i><sub>2</sub>
		</div>
		<p>
			{_('Donde:')}<br/>
			<i>p</i> = {_('Cantidad de títulos por zona.')}<br/>
			<i>n</i> = {_('Multiplicador o factor de proporcionalidad de títulos por zona.')}
		</p>
		<p>{_('Este indicador mide la concentración - dispersión de la información por revista identificando tres zonas: los títulos de revistas más importantes para la disciplina conformado por los títulos más productivos y especializados (zona núcleo), grupo de títulos con menor concentración de artículos en la disciplina (segunda zona) y tercer zona que representan el resto de títulos relacionados con la disciplina. Además de mostrar la cantidad de títulos y artículos por zona.')}</p>

		<div class="page_title">
            <hr/>
            <h4><a href="{site_url("indicadores/indice-concentracion")}" target="_blank">{_('Modelo de Bradford (Institucional)')}</a></h4>
            <hr/>
        </div>
		<p>{_('La formulación matemática es:')}</p>
		<div class="formula">
			<i>p</i>:<i>p</i><sub>1</sub>:<i>p</i><sub>2</sub>:1:<i>n</i><sub>1</sub>:<i>n</i><sub>2</sub>
		</div>
		<p>
			{_('Donde:')}<br/>
			<i>p</i> = {_('Cantidad de instituciones por zona.')}<br/>
			<i>n</i> = {_('Multiplicador o factor de proporcionalidad de instituciones por zona.')}
		</p>
		<p>{_('Es una variante del modelo original de Bradford. Este indicador mide la concentración - dispersión de la información por institución de adscripción del autor, identificando tres zonas: las instituciones más importantes para la disciplina conformado por aquellas más productivas y especializadas (zona núcleo), grupo de instituciones con menor concentración de artículos publicados en la disciplina (segunda zona) y tercer zona que presentan el resto de instituciones relacionadas con la disciplina. Además de mostrar la cantidad de instituciones y artículos por zona.')}</p>
			
		<div class="page_title">
            <hr/>
            <h4><a href="{site_url("indicadores/productividad-exogena")}" target="_blank">{_('Tasa de autoría exógena por revista')}</a></h4>
            <hr/>
        </div>
		<p>{_('Es un indicador que se utiliza para medir el grado de internacionalización de las revistas, considerando la proporción de autores cuya institución de afiliación es de una nacionalidad distinta a la de la revista. Proporciona la tasa de productividad exógena por revista y la frecuencia de nacionalidad de sus autores.')}</p>

		<div class="page_title">
            <hr/>
            <h4>{_('Regionalización de la producción institucional')}</h4>
            <hr/>
        </div>
		<p>{_('Número de artículos publicados por institución de afiliación del autor según país de publicación de la revistas [institución de afiliación + país de la institución de afiliación del autor + país de publicación de la revista]')}</p>
		<p>{_('Evolución temporal')}</p>
			
		<div class="page_title">
            <hr/>
            <h4>{_('Coautoría por institución de afiliación del autor')}</h4>
            <hr/>
        </div>
		<p>{_('Número de documentos publicados en coautoría de acuerdo con la institución de afiliación del autor [institución de afiliación del autor : misma institución y otras]')}</p>
		<p>{_('Evolución temporal')}</p>
			
		<div class="page_title">
            <hr/>
            <h4>{_('Coautoría según país de la institución de afiliación del autor')}</h4>
            <hr/>
        </div>
		<p>{_('Número de documentos publicados en coautoría de acuerdo con el país de la institución de afiliación del autor [país de la institución de afiliación del autor : misma institución y otras]')}</p>
		<p>{_('Evolución temporal')}</p>
		</p>
			
		<p>{_sprintf('Contacto para comentarios y consultas: %s','<a href="mailto:biblat@dgb.unam.mx">biblat@dgb.unam.mx</a>')}</p>

		<div style="display:none">
			<div id="ref1" class="text-justify">
				Gorbea Portal, Salvador (2005) <i>Modelo matemático de Lotka: Su aplicación a la producción científica latinoamericana en ciencias bibliotecológicas y de la información.</i> México: UNAM, pp. 68-71. Bellavista, J. et. al. (1997) Evaluación de la investigación. Madrid: Centro de Investigaciones Sociológicas.
			</div>
			<div id="ref2" class="text-justify">
				Gorbea Portal, Salvador (2005) <i>Modelo matemático de Lotka: Su aplicación a la producción científica latinoamericana en ciencias bibliotecológica y de la información.</i> México: UNAM, pp. 68-71. Bellavista, J. et. al. (1997) Evaluación de la investigación. Madrid: Centro de Investigaciones Sociológicas.
			</div>
			<div id="ref3" class="text-justify">
				Gorbea Portal, Salvador (2005) <i>Modelo matemático de Lotka: Su aplicación a la producción científica latinoamericana en ciencias bibliotecológica y de la información.</i> México: UNAM, pp. 68-71. Vinkler. P. (1993) Research contribution, authorship and team cooperativeness. Scientometrics 26(1) 270-272.
			</div>
			<div id="ref4" class="text-justify">
				Gorbea Portal, Salvador (2005) <i>Modelo matemático de Lotka: Su aplicación a la producción científica latinoamericana en ciencias bibliotecológica y de la información.</i> México: UNAM, pp. 68-71. Vinkler. P. (1993) Research contribution, authorship and team cooperativeness. Scientometrics 26(1) 270-272.
			</div>
			<div id="ref5" class="text-justify">
				Gorbea Portal, Salvador (2005) <i>Modelo teórico para el estudio métrico de la información documental.</i> España: Trea. Price, D. J. D. S. (1981) Hacia una ciencia de la ciencia. Barcelona: Ariel.
			</div>
			<div id="ref6" class="text-justify">
				Zakutina, G. P., Priyenikova, V. K. (1983) <i>Características y análisis del flujo de los documentos primarios.</i> La Habana: IDICT.
			</div>
			<div id="ref7" class="text-justify">
				Gorbea Portal, Salvador (2007) Principales revistas latinoamericanas en ciencias bibliotecológica y de la información: su difusión y su concentración temática y geográfica. <i>Investigación Bibliotecológica: Archivonomía, bibliotecología e información,</i> 21(42) 79-108. Pratt, A. D. (1977) A measure of class concentration in bibliometrics. Journal of the American Society for Information Science, 28(5) 285-292
			</div>
			<div id="ref8" class="text-justify">
				Gorbea Portal, Salvador (1996) <i>Modelo matemático de Bradford: su aplicación a las revistas latinoamericanas de las ciencias bibliotecológicas y de la información.</i> México: UNAM.
			</div>