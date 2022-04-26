                <p><b>{_('Información General')}</b></p><br>

                <p>{$clase=_('Citas Latinoamericanas en Ciencias Sociales y Humanidades') $periodica=_('Índice de Revistas Latinoamericanas en Ciencias') _sprintf('¡Gracias por su interés en BIBLAT! Al elegirnos, usted estará contribuyendo al desarrollo de indicadores y productos bibliométricos que impulsen la toma de decisiones en el entorno editorial académico; además, su revista será incluida en los resultados de búsqueda de los metabuscadores en internet y formará parte de %s o %s, dos de las bases de datos pioneras en América Latina, portal %s y catálogo %s.','<a href="http://alephv23.cichcu.unam.mx:8991/F/?func=find-b-0&local_base=cla01" target="_blank"><acronym title="$clase">CLASE</acronym></a>','<a href="http://alephv23.cichcu.unam.mx:8991/F/?func=find-b-0&local_base=per01" target="_blank"><acronym title="$periodica">PERIÓDICA</acronym></a>','<a href="http://biblat.unam.mx" target="_blank">BIBLAT</a>','<a href="http://alephv23.cichcu.unam.mx:8993/F/?func=find-b-0&local_base=ser01" target="_blank">SERIUNAM</a>')}</p><br>
                
                <p>{_('CLASE y PERIÓDICA son las dos bases de datos fuente constitutivas de BIBLAT. CLASE está especializada en revistas de ciencias sociales y humanidades, y PERIÓDICA en ciencias exactas y naturales, incluyendo medicina.')}<span style='color:rgb(61, 133, 198)'>{_(' Se consideran todas las revistas científicas editadas en América Latina y el Caribe.')}</span></p><br>
                
                <p>{_('Por su parte, SERIUNAM es el catálogo de todas las revistas disponibles en el Sistema Bibliotecario y de Información de la UNAM.')}</p><br>
                
                <p>{_('Al postular una revista, podrá unirse a la Hemeroteca Virtual Latinoamericana (HEVILA), un proyecto estrictamente académico y sin costo para la difusión de los textos completos. Si desea participar, deberá aceptar el resguardo de una copia de los archivos PDF en la Hemeroteca y que los registros de su revista incluyan un enlace a HEVILA, sin que ello suponga ninguna cesión de derechos ni de exclusividad.')}</p><br>
                
                <p>{_('Para más información')} <a href="#contacto">{_(' contáctenos.')}</a></p><br><br>
                
                <p><b>{_('Proceso de Evaluación')}</b></p><br>
                
                <p>{_('Para incorporarse a BIBLAT, su revista debe cumplir un mínimo de 40 criterios editoriales, proporcionar los datos de identificación y del comité científico, y enviar los metadatos de los artículos publicados en los últimos 3 fascículos. El procedimiento es el siguiente:')}</p><br>                
                
                <ol>                    
                        <li>{_('El editor debe completar el ')} <a href="{site_url('postular-revista/preevaluacion')}">{_('formulario de pre-evaluación')}</a> {_(' siguiendo las instrucciones que allí mismo se proporcionan.')}</li>
                        
                        <li>{_('El editor deberá enviar los metadatos de sus artículos  y su carta de postulación de acuerdo con las instrucciones que obtendrá al finalizar el proceso de pre-evaluación.')}</li>
                        
                        <li>{_('El Comité de Evaluación validará el resultado de la pre-evaluación. Si el Comité determina que ésta es correcta, se le enviará por correo electrónico una carta de aceptación y su revista será indizada en CLASE o PERIÓDICA, BIBLAT y catálogo SERIUNAM. De lo contrario, el Comité emitirá las recomendaciones que considere pertinentes para realizar una nueva postulación cuando haya solventado los criterios no cumplidos.')}</li>                                               
                        
                        <li>{_('El equipo de analistas de BIBLAT valida, convierte y normaliza los metadatos recibidos y los carga a las bases de datos CLASE, PERIÓDICA y portal BIBLAT.')}</li>
                </ol><br>
                
                <p>{_('BIBLAT recibe solicitudes todos los días y el tiempo estimado de dictaminación es de cuatro semanas, dependiendo de la cantidad de solicitudes recibida.')}</p><br><br>
                
                <p><b>{_('¿Qué evaluamos?')}</b></p><br>
                
                <p>{_('Se evalúan 48 criterios editoriales, de los cuales, del 1 al 33 son obligatorios y deben ser cumplidos para que las revistas sean consideradas en el proceso de postulación. Los criterios 34 al 48 son un referente de calidad editorial y se exige un mínimo de 7 criterios.')}</p><br>
                                
                <p>{_('Todas las revistas son evaluadas por nuestro Comité de Evaluación a partir de 3 tipos de criterios.')}</p><br>                    
                
                <ol type=a>
			<li>{_('Normalización editorial: Aseguran la correcta identificación de la revista. Un título, el ISSN y una periodicidad regular al inicio de cada período, son parte de estos criterios. ')}</li>

			<li>{_('Gestión y visibilidad: Se refiere a la existencia de un equipo editorial formal que trabaja para la revista. Además, se valora que la publicación ya esté indizada en otros sistemas (salvo que sea una revista con menos de 1 año de existencia).')}</li>

			<li>{_('Metadatos de indización: En cada artículo publicado deben constar los metadatos necesarios: título, autor(es) con su afiliación institucional, resúmenes y palabras clave en al menos dos idiomas.')}</li>
                </ol><br><br>
                
		<div class="page_title">
            <hr/>
            <h4>{_('Plantilla de evaluación del Comité de Evaluación de Revistas de CLASE, PERIÓDICA y Catálogo SERIUNAM')}</h4>
            <hr/>
        </div>
		
                <p>{_('Para ir directamente al proceso de pree-valuación, haga clic en este ')} <a href="{site_url('postular-revista/preevaluacion')}">{_('enlace')}</a></p>
                <br>
                
		<table class="table table-striped table-bordered table-hover">
			<thead>
				<tr class="encabezado">
                                    <td style="background-color: #ff800040"><b>{_('No.')}</b></td>
                                    <td style="background-color: #ff800040"><b>{_('Requisitos obligatorios')}</b></td>
					<!--<td>{_('Puntos')}</td>-->
				</tr>
			</thead>
			<tbody>
				<tr>
					<td id="1">1</td>
					<td><b>{_('Mención de un editor o responsable de la revista:')}</b> {_('Se valora positivamente la mención de un editor, director o responsable de la revista.')}</td>
				</tr>
				<tr>
					<td id="2">2</td>
					<td><b>{_('Datos del organismo responsable y lugar de edición:')}</b> {_('Se valora positivamente si la revista proporciona información suficiente para la identificación y localización del organismo editor o institución responsable, así como los datos del lugar de edición. Los datos pueden ser: nombre completo de la institución editora, dirección postal, ciudad o lugar de edición, teléfonos, correo electrónico o sitio web.')}</td>
				</tr>
				<tr>
					<td id="3">3</td>
					<td><b>{_('Existencia de tabla de contenidos o índice:')}</b> {_('Se valora positivamente si la revista proporciona la tabla de contenido o sumario en la que consten, entre otros, los nombres de los autores, título del trabajo y páginas.')}</td>
				</tr>
				<tr>
					<td id="4">4</td>
					<td><b>{_('Identificación de los autores personales o institucionales en los documentos:')}</b> {_('Los trabajos deben estar firmados por los autores con nombre y apellidos o declaración de autor institucional.')}</td>
				</tr>
				<tr>
					<td id="5">5</td>
					<td><b>{_('Referencias bibliográficas en los documentos:')}</b> {_('Los documentos publicados deben proporcionar una lista de referencias bibliográficas, obras citadas o notas bibliográficas al pie de página. La presencia de estas referencias será valorada solamente en artículos, ensayos o reseñas y no en cartas al editor, editoriales, entrevistas, reportajes u otro tipo de documentos que no suelen citar referencias bibliográficas.')}</td>
				</tr>
				<tr>
					<td id="6">6</td>
					<td><b>{_('Membrete bibliográfico en cubiertas o páginas de presentación:')}</b> {_('Estas deberán incluir al menos el título completo de la revista, así como ISSN, volumen, número, fecha y membrete bibliográfico.')}</td>
				</tr>
				<tr>
					<td id="7">7</td>
					<td><b>{_sprintf('60%% de contenido indizable:')}</b> {_sprintf('Al menos el 60%% de los documentos publicados en un fascículo, deben ser: artículos originales, ensayos, reseñas de libro, revisiones bibliográficas, notas de más de una cuartilla, informes técnicos o cartas al editor.')}</td>
				</tr>
				<tr>
					<td id="8">8</td>
					<td><b>{_('ISSN:')}</b> {_('Es obligatorio contar con código ISSN e ISSN para la versión electrónica en su caso.')}</td>
				</tr>
				<tr>
					<td id="9">9</td>
					<td><b>{_('Mención del objetivo de la revista:')}</b> {_('En el fascículo se debe hacer mención de los objetivos que la publicación persigue. Puede valorarse también si hace explícita su especialización temática y/o la audiencia a la que va dirigida.')}</td>
				</tr>
				<tr>
					<td id="10">10</td>
					<td><b>{_('Mención de periodicidad:')}</b> {_('Para su valoración la revista debe declarar su periodicidad sin ambigüedad o bien el número de ejemplares que ofrece al año. Este criterio califica solamente la mención de periodicidad, no su cumplimiento.')}</td>
				</tr>
				<tr>
					<td id="11">11</td>
					<td><b>{_('Periodicidad semestral o más frecuente:')}</b> {_('Califica positivamente si la periodicidad de la revista es semestral o más frecuente, ya que se aprecia que cumpla con su misión de difundir sus contenidos en el menor tiempo posible.')}</td>
				</tr>
				<tr>
					<td id="12">12</td>
					<td><b>{_('Cumplimiento de periodicidad:')}</b> {_('Se entiende que una revista cumple su periodicidad si a lo largo del año publica el número de fascículos que se corresponden con la periodicidad expresada por la revista (por ejemplo, tres fascículos al año, en el caso de las revistas cuatrimestrales). Por lo tanto, para poder calificar este criterio es indispensable que la revista explicite el número de ejemplares que ofrece al año (No aplica en periodicidad continua).')}</td>
				</tr>
                                <tr>
					<td id="13">13</td>
					<td><b>{_('Disponibilidad de contenidos retrospectivos:')}</b> {_('Aplica a revistas electrónicas y el requisito se refiere al acceso a números y documentos en texto completo publicados anteriormente, considerando un lapso de tiempo de 5 años al menos o desde que se inició la publicación de la revista.')}</td>
				</tr>                                
				<tr>
					<td id="14">14</td>
					<td><b>{_('Existencia de un consejo, comité o cuerpo editorial:')}</b> {_('Deberá constar en la revista la existencia de un cuerpo editorial que apoye al editor en diversas responsabilidades inherentes a la gestión de la revista o bien a la evaluación de las contribuciones, y deberán proporcionarse los nombres de cada uno de los que forman parte de esas instancias.')}</td>
				</tr>
				<tr>
					<td id="15">15</td>
					<td><b>{_('Servicios de indización que cubren la revista:')}</b> {_('Califica positivamente si la revista está incluida en algún servicio de índices y resúmenes, directorios, catálogos, hemerotecas virtuales y listas del núcleo básico de revistas nacionales, entre otros servicios de información. Este campo califica positivamente solamente si el servicio de información es mencionado por la propia revista.')}</td>
				</tr>
				<tr>
					<td id="16">16</td>
					<td><b>{_('Clasificación de los tipos de documentos publicados (Tabla de contenido)')}</b> {_('ya sea por los tipos de documentos publicados (artículo original, revisiones, reseñas, por ej.) o por temáticas específicas.')}</td>
				</tr>
				<tr>
					<td id="17">17</td>
					<td><b>{_('Instrucciones a los autores:')}</b> {_('Califica positivamente si aparecen las instrucciones a los autores sobre el envío de originales.')}</td>
				</tr>
				<tr>
					<td id="18">18</td>
					<td><b>{_('Normas para referencias bibliográficas:')}</b> {_('En las instrucciones a los autores deben indicarse las normas de elaboración de las referencias bibliográficas basadas en alguna norma internacional ampliamente aceptada (APA, Harvard, ISO, Vancouver u alguna otra).')}</td>
				</tr>
				<tr>
					<td id="19">19</td>
					<td><b>{_('Membrete bibliográfico al inicio del documento:')}</b> {_('Califica positivamente si éste aparece al inicio de cada artículo e identifica a la fuente. Para darlo por cumplido, cada documento ya sea en PDF y/o HTML, debe incluir un membrete que contenga por lo menos: título completo o abreviado, DOI y la numeración de la revista (año, volumen, número, parte, mes).')}</td>
				</tr>
				<tr>
					<td id="20">20</td>
					<td><b>{_('Membrete bibliográfico en cada página del documento:')}</b> {_('Califica positivamente si el membrete que identifica al documento (PDF y/o HTML) aparece en páginas pares o impares del artículo, no necesariamente en ambas.')}</td>
				</tr>
				<tr>
					<td id="21">21</td>
					<td><b>{_('Uso del identificador de recursos uniforme (URI):')}</b> {_('Por ejemplo, Handle o el Digital Object Identifier (DOI) para cada uno de los documentos publicados. Este requisito aplica para las revistas electrónicas.')}</td>
				</tr>
				<tr>
					<td id="22">22</td>
					<td><b>{_('Descarga individual de contenidos:')}</b> {_('Permite la descarga de los artículos de manera individual.')}</td>
				</tr>
				<tr>
					<td id="23">23</td>
					<td><b>{_('Fechas de recepción y/o aceptación del documento:')}</b> {_('Califica positivamente sólo si indica ambas fechas. Esta información puede ser localizada al inicio o al final de cada artículo y es sólo exigible para artículos originales.')}</td>
				</tr>
				<tr>
					<td id="24">24</td>
					<td><b>{_('Resumen del documento:')}</b> {_('Califica positivamente si se incluyen resúmenes en el idioma original del trabajo.')}</td>
				</tr>
				<tr>
					<td id="25">25</td>
					<td><b>{_('Resumen del documento en dos idiomas:')}</b> {_('Califica positivamente si se incluyen resúmenes en el idioma original del trabajo y en un segundo idioma.')}</td>
					<!--<td>(1 pt)</td>-->
				</tr>
				<tr>
					<td id="26">26</td>
					<td><b>{_('Afiliación de los autores:')}</b> {_('Deberá proporcionarse el nombre de la institución de trabajo del autor o autores de cada artículo.')}</td>
				</tr>
				<tr>
					<td id="27">27</td>
					<td><b>{_('Palabras clave:')}</b> {_('Deben proporcionarse palabras clave, en cualquier idioma, que describan el contenido del documento. Al igual que con los resúmenes, las palabras clave se valoran solamente en artículos.')}</td>
				</tr>
				<tr>
					<td id="28">28</td>
					<td><b>{_('Palabras clave en dos idiomas:')}</b> {_('Las palabras clave deben proporcionarse en dos idiomas y al igual que en el criterio referido al idioma de los resúmenes, en este caso tampoco se considera obligatorio que estén presentes en otro tipo de documentos diferentes a los artículos.')}</td>
				</tr>
				<tr>
					<td id="29">29</td>
					<td><b>{_('Mención del sistema de arbitraje por pares:')}</b> {_('En la revista deberá constar que el procedimiento empleado para la selección de los artículos a publicar es el arbitraje por pares.')}</td>
				</tr>
				<tr>
					<td id="30">30</td>
					<td><b>{_('Sistema de arbitraje doble ciego:')}</b> {_('En la revista deberá constar que el procedimiento empleado para la selección de los artículos a publicar es el arbitraje por pares especificando que sea mediante el sistema "doble ciego".')}</td>
				</tr>
				<tr>
					<td id="31">31</td>
					<td><b>{_('Mención de originalidad de los documentos:')}</b> {_('Califica positivamente si en la presentación de la revista o en las instrucciones a los autores se menciona explícitamente esta exigencia para los trabajos sometidos a publicación.')}</td>
				</tr>
				<tr>
					<td id="32">32</td>
					<td><b>{_('Apertura institucional del consejo, comité o cuerpo editorial:')}</b> {_sprintf('Para calificar positivamente, los cuerpos editoriales deberán contar con evaluadores externos a la entidad editora, por lo que deberá constar su afiliación institucional. Al menos el 50%% de los miembros del consejo editorial deberán pertenecer a instituciones diferentes a la editora, de lo contrario no calificará positivamente.')}</td>
				</tr>
                                <tr>
					<td id="33">33</td>
					<td><b>{_('Declaración de política de derecho de autor respecto al acceso de los documentos:')}</b> {_sprintf('En particular se recomienda utilizar licencias Creative Commons (https://creativecommons.org/licenses). La información del tipo de licencia adoptada por la revista debe constar obligatoriamente en los formatos PDF, XML y otros que utilice la revista para la publicación en línea.')}</td>
				</tr>                                
			</tbody>
                        <thead>
				<tr class="encabezado">
                                    <td style="background-color: #ff800040"></td>
                                        <td style="background-color: #ff800040"><b>{_('Requisitos no obligatorios:')}</b> {_('Son un referente de calidad para las revistas y agregan puntajes extras en la presente evaluación.')}</td>
				</tr>
                        </thead>
                        <tbody>
                            <tr>
				<td id="34">34</td>
				<td><b>{_('Adopción de códigos de ética:')}</b> {_('La revista debe informar su adhesión a normas y códigos de ética internacionales: Pueden ser los establecidos por el Committee on Publication Ethics (Code of Conduct and Best Practices Guidelines for Journals Editors, COPE https://publicationethics.org), por el Council of Science Editors (http://www.councilscienceeditors.org), Council for International Organizations of Medical Sciences (CIOMS, http://cioms.ch), el International Committee of Medical Journal Editors (ICJME, http://www.icmje.org), algún otro o bien, tener su propio código de ética.')}</td>
                            </tr>
                            <tr>
				<td id="35">35</td>
				<td><b>{_('Fuentes de financiamiento:')}</b> {_('Indicar si la revista efectúa cobro por el procesamiento de artículos (APC).')}</td>
                            </tr>
                            <tr>
				<td id="36">36</td>
				<td><b>{_('Formato de dictaminación visible:')}</b> {_('Es público y disponible el formulario de evaluación utilizado por los dictaminadores.')}</td>
                            </tr>
                            <tr>
				<td id="37">37</td>
				<td><b>{_('Publicación al inicio del periodo programado:')}</b> {_('Para aprobar este punto se requiere que la publicación de los contenidos de la revista se realice al inicio del período según la frecuencia definida por la revista. Para tal efecto, se verifica la frecuencia definida por la revista y la fecha observada en el sitio web de la revista. La fecha en que se debe publicar es al comienzo del periodo declarado. Este punto es obviado si la revista ha adoptado el modelo de publicación continua.')}</td>
                            </tr>
                            <tr>
				<td id="38">38</td>
				<td><b>{_('Tiempo de procesamiento de los manuscritos:')}</b> {_('El tiempo promedio de procesamiento de los manuscritos debe ser como máximo de hasta 6 (seis) meses, considerando el tiempo entre las fechas de recepción y de decisión final en cuanto a la publicación, y de hasta 12 (doce) meses, considerando el tiempo entre las fechas de recepción y publicación del manuscrito. Sin embargo, se recomienda un ciclo total medio de 6 (seis) meses.')}</td>
                            </tr>
                            <tr>
				<td id="39">39</td>
				<td><b>{_('Recepción continua de manuscritos:')}</b> {_('La recepción de artículos para su dictaminación y probable publicación por la revista debe estar disponible de forma continua, es decir, no es válido que las revistas suspendan la recepción de manuscritos en ningún período por ninguna razón.')}</td>
                            </tr>
                            <tr>
                                <td id="40">40</td>
                                <td>
                                    <p><b>{_('Periodicidad y número de artículos publicados por año aceptables:')}</b> {_('La periodicidad y el número de artículos publicados al año son indicadores del flujo de producción editorial de la revista y de la producción científica del área temática correspondiente. Los valores de referencia requeridos dependen del área temática en la que la revista está clasificada.')}</p>                                
                                    <p>{_('Se valora como la mejor práctica editorial la publicación continua de artículos, esto es, que los documentos se publiquen en línea tan pronto como sean aprobados y editados. En este caso, los artículos quedan reunidos en un volumen anual con o sin ediciones periódicas (números). Cuando no se adoptan ediciones (números), la publicación de los artículos debe ocurrir a lo largo del año (ver punto 38). Cuando los artículos se reúnen en ediciones periódicas, éstas deben estar finalizadas preferentemente al inicio del período.')}</p>
                                </td>
                            </tr>
                            <tr>
                                <td id="41">41</td>
                                <td>
                                    <p><b>{_('Composición e internacionalidad de los editores y del cuerpo editorial (Editores asociados o Editores por sección):')}</b></p>
                                    <p>{_('Las revistas pueden adoptar diferentes estructuras y denominaciones de instancias de gestión editorial. Estas estructuras y las funciones que realizan deben estar documentadas formalmente y actualizadas periódicamente/anualmente.')}</p>
                                    <p>
                                        <ul>
                                            <li>{_('Editores-jefes: Todas las revistas deben tener uno o más editores-jefes definidos, con afiliación nacional o extranjera. Los editores-jefes son investigadores nacionales o extranjeros reconocidos en el área de la revista y su afiliación institucional y sus currículos actualizados deben estar disponibles en línea y accesibles de preferencia por los respectivos números de registro del ORCID. Son responsables del desarrollo e implantación de la política y gestión editorial y del desempeño final de las revistas. En el nivel de coordinación editorial, las revistas pueden tener vice editores o editores asistentes.')}</li>
                                        </ul>
                                    </p>
                                </td>    
                            </tr>
                            <tr>
                                <td id="42">42</td>
                                <td>
                                    <p><b>{_('Cuerpo de editores asociados o de sección:')}</b> {_('La gestión editorial debe contar preferentemente con uno o más grupos definidos de editores que colaboran activa y sistemáticamente con el editor jefe en la gestión del flujo de evaluación de manuscritos, con énfasis en la selección e interacción con los evaluadores y autores. En general, estos editores se agrupan bajo la denominación de editores asociados o editores de sección, son parte formal del equipo editorial y contribuyen sistemáticamente a la evaluación de manuscritos. Bajo la denominación de editores asociados o de sección, deben ser listados solamente investigadores que contribuyen sistemáticamente con la evaluación de manuscritos. Los editores ad hoc que colaboran en la evaluación esporádica de manuscritos, después de la solicitud del editor jefe o incluso de un editor asociado, deben ser listados por separado.')}</b></p>
                                    <p>{_('Las revistas pueden adoptar diferentes estructuras y denominaciones de instancias de gestión editorial. Estas estructuras y las funciones que realizan deben estar documentadas formalmente y actualizadas periódicamente/anualmente.')}</p>
                                    <p>{_('Las revistas deben maximizar la internacionalización del cuerpo de editores.')}</p>
                                </td>    
                            </tr>
                            <tr>
                                <td id="43">43</td>
                                <td>
                                    <b>{_('Internacionalidad de los dictaminadores/árbitros:')}</b> {_('Los expertos encargados de la dictaminación de los artículos deben ser investigadores nacionales y extranjeros reconocidos en el tema de los manuscritos que evalúan. Debe maximizarse la participación de árbitros afiliados a instituciones extranjeras.')}
                                </td>    
                            </tr>
                            <tr>
                                <td id="44">44</td>
                                <td>
                                    <b>{_('Identificación de la afiliación institucional e internacionalidad de los autores:')}</b> {_('Se requiere el registro exhaustivo de las afiliaciones de los autores para la identificación del origen institucional y geográfico de las investigaciones publicadas. Así, todos los tipos de documentos, sin excepción, deben tener autoría con especificación completa de las instancias institucionales y geográficas a las que están afiliados cada uno de los autores. Cada instancia institucional es identificada por nombres de hasta tres niveles jerárquicos o programáticos y por la ubicación geográfica (ciudad, estado y país) en que está localizada. Cuando un autor está afiliado a más de una instancia, cada afiliación debe identificarse por separado. Cuando dos o más autores están afiliados a la misma instancia, la identificación de la instancia se realiza una vez. Cuando el autor no tiene afiliación institucional se registra la afiliación indicando que se trata de un investigador autónomo, incluyendo los demás elementos de la localización geográfica.')}
                                    <p>{_('Las instancias académicas son las afiliaciones más comunes de los autores. Las estructuras típicas de afiliación académica combinan normalmente dos o tres niveles jerárquicos, como por ejemplo: departamento-universidad, programa de post-graduación-universidad, instituto de investigación-universidad, hospital-facultad de medicina-universidad, etc. Son comunes también institutos, empresas o fundaciones públicas o privadas relacionadas con investigación y desarrollo. También se presentan instancias que desarrollan o participan en investigación que son órganos de gobierno, ligados a ministerios, secretarías estatales o municipales. Otros autores también están afiliados a empresas nacionales y multinacionales. También los autores están afiliados a instancias programáticas o involucrando a comunidades de investigadores o profesionales que funcionan en torno a un programa, proyecto o red y pueden tener vida limitada.')}</p>
                                    <p>{_('La presentación de la afiliación debe guardar uniformidad en todos los documentos y se recomienda el siguiente formato:')}</p>
                                    <p>
                                        <ul>
                                            <li>{_('La identificación de las afiliaciones debe venir agrupada, justo debajo de los nombres de los autores, en líneas distintas. Los nombres y las afiliaciones se relacionan entre sí por etiquetas;')}</li>
                                            <li>{_('La identificación de las instancias institucionales, cuando proceda, deberá indicar las unidades jerárquicas correspondientes. Se recomienda que las unidades jerárquicas se presenten en orden decreciente, por ejemplo, universidad, facultad y departamento;')}</li>
                                            <li>{_('En ningún caso las afiliaciones deben venir acompañadas de mini currículos de los autores. En todo caso éstos deben ser publicados separadamente de las afiliaciones como notas del autor;')}</li>
                                            <li>{_('Los nombres de las instituciones y programas deberán presentarse por extenso y en el idioma original de la institución o en la versión en inglés, cuando la escritura no sea latina. Por ejemplo:')}</li>
                                            <ul>
                                                <li>{_('Universidade de São Paulo, Instituto de Quimica, São Paulo. Brasil')}</li>
                                                <li>{_('Universidad Nacional Autónoma de México, Instituto de Investigaciones Biomédicas, Departamento de Pediatría, Ciudad de México, México;')}</li>
                                                <li>{_('John Hopkins University, Bloomberg School of Public Health, Baltimore, Maryland. United States of America')}</li>
                                            </ul>
                                            <li>{_('Los nombres de los autores deben venir acompañados de los respectivos números de registro del ORCID.')}</li>                                            
                                        </ul>
                                    </p>
                                    <p>{_('Las revistas deben maximizar la internacionalización de la afiliación de los autores.')}</p>
                                </td>    
                            </tr>
                            <tr>
                                <td id="45">45</td>
                                <td>
                                    <b>{_('Normalización de los textos, citas y referencias bibliográficas')}</b>
                                    <p>{_('Las revistas deben especificar en las instrucciones a los autores las normas que siguen para la estructuración y presentación de los textos y para la presentación y formato de las citas y de las referencias bibliográficas.')}</p>
                                    <p>{_('La estructuración de los textos es dependiente de las áreas temáticas y tipos de documentos. Las revistas deben de preferencia seguir las patrones y prácticas más comunes en las respectivas áreas temáticas. Algunas áreas temáticas cuentan con guías y directrices para la publicación de ciertos tipos de investigaciones, como es el caso de la Red Equator para las ciencias de la salud: http://www.equator-network.org.')}</p>
                                    <p>{_('Para las citas y referencias bibliográficas se recomienda la adopción fiel de normas establecidas formalmente como estándares nacional y/o internacional y más utilizadas internacionalmente en el área temática de la revista. La adopción precisa de normas bibliográficas es esencial para viabilizar el proceso de marcación y generación estructurada de los textos en XML. Las citas y referencias bibliográficas se utilizan cuando se utilizan textos, métodos, datos, archivos históricos, colecciones y programas informáticos en los artículos.')}</p>
                                    <p>{_('Sólo las referencias listadas al final del texto en una sección bien definida se marcarán para permitir su carga en las bases de datos para su inclusión en las métricas de citas. Las referencias bibliográficas que aparecen en notas al pie de la página y no incluidas en la lista de referencias al final del artículo no serán marcadas y no participarán en las métricas de SciELO.')}</p>
                                </td>
                            </tr>
                            <tr>
                                <td id="46">46</td>
                                <td>
                                    <p><b>{_('Declaración de la contribución de autores y colaboradores:')}</b> {_('La autoría de un documento atribuye crédito e implica la responsabilidad del contenido publicado. Las revistas deben instruir a los autores a registrar al final de los artículos la contribución de cada uno de los autores y colaboradores, expresada en las instrucciones a los autores, con la utilización de dos criterios mínimos de autoría:')}</b></p>
                                    <p>
                                        <ol type="a">
                                            <li>{_('Participar activamente en la discusión de los resultados;')}</li>
                                            <li>{_('Revisión y aprobación de la versión final del trabajo.')}</li>
                                        </ol>
                                    </p>
                                    <p>{_('Se recomienda orientarse con la guía CRediT:')}<a href="http://docs.casrai.org/CRediT" target="_blank">http://docs.casrai.org/CRediT</a></p>
                                    <p>{_('CRediT [online]. CASRAI Disponible en:')}<a href="http://docs.casrai.org/CRediT" target="_blank">http://docs.casrai.org/CRediT</a></p>
                                    <p>{_('Lecturas recomendadas:')}</p>
                                    <p>
                                        <ul>
                                            <li>{_('Criterios de autoría preservan la integridad en la comunicación científica ( publicado en blog SciELO en Perspectiva ):')} <a href="https://blog.scielo.org/es/2018/03/14/criterios-de-autoria-preservan-la-integridad-en-la-comunicacion-cientifica/#.XKKlO_ZFyUk" target="_blank">https://blog.scielo.org/es/2018/03/14/criterios-de-autoria-preservan-la-integridad-en-la-comunicacion-cientifica/#.XKKlO_ZFyUk</a></li>
                                            <li>{_('Los créditos del autor … ¿autor de qué? ( publicado en blog SciELO en Perspectiva ):')} <a href="https://blog.scielo.org/es/2014/07/17/los-creditos-del-autor-autor-de-que/#.XKKmKvZFyUk" target="_blank">https://blog.scielo.org/es/2014/07/17/los-creditos-del-autor-autor-de-que/#.XKKmKvZFyUk</a></li>                                             
                                        </ul>
                                    </p>
                                </td>    
                            </tr>
                            <tr>
                                <td id="47">47</td>
                                <td>
                                    <b>{_('Adopción de lineamiento de Ciencia Abierta:')}</b> {_('La Ciencia Abierta preconiza la apertura de todos los componentes que fundamentan la comunicación de la investigación, como son los métodos, datos y programas de computadora. Esta apertura pretende contribuir a acelerar la publicación de las investigaciones, facilitar la evaluación de los manuscritos, la replicabilidad de las investigaciones y reutilización de los datos recolectados. En este sentido, se requiere la implantación de los siguientes avances:')}
                                    <p>
                                        <ul>
                                            <li>{_('Aceleración de la publicación de las investigaciones mediante la publicación contínua;')}</li>
                                            <li>{_('Aceleración de la publicación de las investigaciones mediante preprints, entendido como manuscritos listos para envío a revistas y que están disponibles en acceso abierto en la Web en repositorios de preprints antes de la presentación formal a una revista. Las revistas deberán especificar en las instrucciones a los autores los criterios de aceptación de preprints;')}</li>
                                            <li>{_('Identificación y recomendación de repositorios de datos por área temática para orientar el depósito de estos datos: Se recomienda la adopción de los principios FAIR (Findable, Accessible, Interoperable y Reutilizable) para la calificación de los repositorios de datos;')}</li>
                                            <li>{_('Adopción de las directrices TOP (Transparencia y Openness Promotion) para la calificación de los artículos y revistas con relación a la cita y referencia de datos, métodos, programas de computadora, etc.')}</li>                                            
                                            <li>{_('Disponibilidad de los datos de la investigación: La disponibilidad de los datos de las investigaciones utilizados en los artículos en repositorios de acceso abierto, siguiendo patrones de registro que aseguran la autoría, el uso y citación de los datos, así como del artículo correspondiente, es recomendable pues contribuye a la replicabilidad de las investigaciones, aumenta la visibilidad y las citas de las investigaciones y de las revistas.')}</li>                                            
                                        </ul>
                                    </p>
                                </td>    
                            </tr>
                            <tr>
                                <td id="48">48</td>
                                <td>
                                    <p><b>{_('Erratas y retractaciones:')}</b> {_('Los editores deben mencionar en las instrucciones a los autores, que permiten la publicación de erratas y por otra parte se responsabilizan de la retractación de artículos.')}</p>
                                </td>
                            </tr>
 
                        </tbody>                            
		</table><br>
                
                <p><b>{_('Fuentes')}</b></p>
                <p>{_('La actualización de la plantilla de evaluación de CLASE, PERIÓDICA y SERIUNAM retomó (en algunos puntos con las mismas palabras incluso) los criterios adoptados por:')}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{_('SciELO-Brasil:')}</b> <a target="_blank" href="http://www.scielo.br/avaliacao/Criterios_SciELO_Brasil_versao_revisada_atualizada_outubro_20171206_EN.pdf"> {_('http://www.scielo.br/avaliacao/Criterios_SciELO_Brasil_versao_revisada_atualizada_outubro_20171206_EN.pdf')} </a></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{_('Latindex - Características del Catálogo 2.0:')}</b> <a target="_blank" href="http://www.latindex.org/latindex/meto2"> {_('http://www.latindex.org/latindex/meto2')}</a></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{_('RedALyC:')}</b> <a target="_blank" href="https://www.redalyc.org/redalyc/editores/evaluacionCriterios.html"> {_('https://www.redalyc.org/redalyc/editores/evaluacionCriterios.html')}</a></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{_('DOAJ:')}</b> <a target="_blank" href="https://www.doaj.org/application/new"> {_('https://www.doaj.org/application/new')}</a></p><br><br>
                
                <p id="contacto"><b>{_('Contáctenos')}</b></p><br>
                
                <p><b>{_('Información general')}</b></p>
                
                <p>
                    Manuel Alejandro Flores Chávez<br>
                    <a href="mailto:biblat_comite@dgb.unam.mx">biblat_comite@dgb.unam.mx</a>
                </p>
                
                <p><b>{_('Dudas acerca del estatus de su revista en BIBLAT, CLASE o PERIÓDICA')}</b></p>
                
                <p>
                    Guadalupe Argüello Mendoza<br>
                    <a href="mailto:biblat_gestion@dgb.unam.mx">biblat_gestion@dgb.unam.mx</a>
                </p>
                
                <p><b>{_('Certificados de indización BIBLAT, CLASE y PERIÓDICA')}</b></p>
                
                <p>
                    Blanca Estela Aguilar Rocha<br>
                    <a href="mailto:baguilar@dgb.unam.mx">baguilar@dgb.unam.mx</a>
                </p>
                
                <p><b>{_('Certificados de indización SERIUNAM')}</b></p>
                
                <p>
                    Luis Javier Felix Acosta<br>
                    <a href="mailto:ljfelixa@dgb.unam.mx">ljfelixa@dgb.unam.mx</a>
                </p>
                
                <p>{_('Para cualquier otra consulta escriba a <a href="mailto:biblat_comite@dgb.unam.mx">biblat_comite@dgb.unam.mx</a>.')}</p><br><br>
		