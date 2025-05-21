                <p><b>{_('Información General')}</b></p><br>

                <p>{$clase=_('Citas Latinoamericanas en Ciencias Sociales y Humanidades') $periodica=_('Índice de Revistas Latinoamericanas en Ciencias') _sprintf('¡Gracias por su interés en BIBLAT! Al elegirnos, usted estará contribuyendo al desarrollo de indicadores y productos bibliométricos que impulsen la toma de decisiones en el entorno editorial académico; además, su revista será incluida en los resultados de búsqueda de los metabuscadores en internet y formará parte de %s o %s, dos de las bases de datos pioneras en América Latina, portal %s y catálogo %s.','<a href="https://clase.dgb.unam.mx" target="_blank"><acronym title="$clase">CLASE</acronym></a>','<a href="https://periodica.dgb.unam.mx" target="_blank"><acronym title="$periodica">PERIÓDICA</acronym></a>','<a href="http://biblat.unam.mx" target="_blank">BIBLAT</a>','<a href="https://seriunam.dgb.unam.mx/" target="_blank">SERIUNAM</a>')}</p><br>
                
                <p>{_('CLASE y PERIÓDICA son las dos bases de datos fuente constitutivas de BIBLAT. CLASE está especializada en revistas de ciencias sociales y humanidades, y PERIÓDICA en ciencias exactas y naturales, incluyendo medicina.')}<b>{_(' Se consideran todas las revistas científicas editadas en América Latina y el Caribe.')}</b></p><br>
                
                <p>{_('Por su parte, SERIUNAM es el catálogo de todas las revistas disponibles en el Sistema Bibliotecario y de Información de la UNAM.')}</p><br>
                
                <p>{_('Al postular una revista, podrá unirse a la Hemeroteca Virtual Latinoamericana (HEVILA), un proyecto estrictamente académico y sin costo para la difusión de los textos completos. Si desea participar, deberá aceptar el resguardo de una copia de los archivos PDF en la Hemeroteca y que los registros de su revista incluyan un enlace a HEVILA, sin que ello suponga ninguna cesión de derechos ni de exclusividad.')}</p><br>
                
                <p>{_('Para más información')} <a href="#contacto">{_(' contáctenos.')}</a></p><br><br>
                
                <p><b>{_('Proceso de Evaluación')}</b></p>
                
                <p>{_('Las revistas que deseen incorporarse a BIBLAT serán sometidas a tres evaluaciones, dos de ellas en línea y otra a cargo del Comité de Evaluación.')}</p><br>
                
                <dd style="margin-left: 50px;">
                    <p><b>{_('Primera evaluación. Validación de metadatos')}</b></p>
                    
                    <p>{_('Se analizará la calidad de los metadatos almacenados en la base de datos del sitio OJS de la revista para asegurarse que estén completos y sean consistentes, esta comprobación es automática a través de la herramienta')} <a href="{site_url('metametrics/simulador')}">MetaMetrics</a>. {_('Se recomienda consultar el ')} <a href="{base_url('archivos/pdf/manual_indizacion_ojs_2ed.pdf')}" target="_blank">{_('Manual de indización en OJS: Buenas prácticas para la región latinoamericana')}</a>{_(', a fin de conocer las características requeridas en los metadatos y realizar los ajustes en sus registros, si es el caso.')}</p><br>
                    
                    <p><b>{_('Segunda evaluación. Preevaluación editorial')}</b></p>
                    
                    <p>{_('A través del')} <a href="{site_url('preevaluacion/simulador')}">{_('módulo de preevaluación')}</a> {_('el editor autoevaluará si su revista cumple con un conjunto de criterios editoriales, tales como revisión por pares a doble ciego o el uso de identificadores persistentes para documentos (DOI) y autores (ORCID). Se recomienda consultar nuestra')} <a href="#plantilla">{_('Plantilla de evaluación.')}</a></p><br>
                    
                    <p><b>{_('Tercera evaluación. Revisión del Comité de Evaluación')}</b></p>
                    
                    <p>{_('El Comité de Evaluación revisará los resultados de la primera y segunda evaluaciones, verificará la información en el sitio web y emitirá un dictamen de aprobación o no-aprobación vía correo electrónico.')}</p><br>
                </dd>

                <p>{_('Los requisitos para que una revista sea evaluada son:')}</p>
                
                <ol>                    
                        <li>{_('Ser una revista académica, registrada y editada en países de América Latina y el Caribe.')}</li>
                        
                        <li>{_('Contar con la plataforma Open Journal System (OJS) y tener al menos 3 fascículos publicados.')}</li>
                        
                        <li>{_('Tener habilitado el protocolo OAI-PMH para la recolección de metadatos en OJS.')}</li>
                        
                </ol><br>
                
                <p>{_('Los pasos por seguir para que una revista sea evaluada son:')}</p>
                
                <ol>                    
                    <li>{_('Habilitar el protocolo OAI-PMH para la recolección de metadatos en el OJS de la revista a postular.')}</li>
                        
                        <li>{_('Someter su revista a la validación de metadatos a través de la herramienta')} <a href="{site_url('metametrics/simulador')}">MetaMetrics</a>. {_('El mínimo aceptable es 80% de cumplimiento en la calidad de los metadatos, siendo obligatorio cumplir con el 100% de los metadatos de afiliación institucional de los autores. Una vez aprobada esta validación el sistema le permitirá pasar a la siguiente evaluación, de lo contrario, le permitirá descargar los resultados del proceso.')}</li>
                        
                        <li>{_('Superada la validación de metadatos, deberá acceder al')} <a href="{site_url('preevaluacion/simulador')}">{_('módulo de preevaluación')}</a> {_('e indicar qué criterios cumple o no la revista postulante. Si cumple con al menos 28 puntos (23 obligatorios y 5 optativos) el sistema le solicitará algunos datos y le permitirá enviar su postulación al Comité, de lo contrario, le permitirá descargar los resultados del proceso.')}</li>
                        
                        <li>{_('El Comité revisará las postulaciones de las revistas que hayan superado la validación de metadatos y la preevaluación, en un plazo de hasta 1 mes emitirá un dictamen que será enviado al correo electrónico que se haya indicado durante la preevaluación.')}</li>
                </ol>
                
                <p>{_('Las tres evaluaciones son consecutivas, es decir, para avanzar a la segunda etapa debe superarse la primera y para avanzar a la tercera, debe superarse la segunda.')}</p><br><br>
                
                <p><b>{_('¿Qué evaluamos?')}</b></p><br>
                
                <p>{_('Se evalúan 32 criterios editoriales, de los cuales, del 1 al 23 son obligatorios y deben ser cumplidos para que las revistas sean consideradas en el proceso de postulación. Los criterios 24 al 32 son un referente de calidad editorial y se exige un mínimo de 5 criterios.')}</p><br>
                                
                <p>{_('Todas las revistas son evaluadas por nuestro Comité de Evaluación a partir de 3 tipos de criterios.')}</p><br>                    
                
                <ol type=a>
			<li>{_('Normalización editorial: Aseguran la correcta identificación de la revista. Un título, el ISSN y una periodicidad regular al inicio de cada período, son parte de estos criterios. ')}</li>

			<li>{_('Gestión y visibilidad: Se refiere a la existencia de un equipo editorial formal que trabaja para la revista. Además, se valora que la publicación ya esté indizada en otros sistemas (salvo que sea una revista con menos de 1 año de existencia).')}</li>

                        <li>{_('Metadatos de indización: En cada artículo publicado deben constar los metadatos necesarios: título, autor(es) con su afiliación institucional, resúmenes y palabras clave en al menos dos idiomas.')} <a href="{site_url('metametrics/simulador')}">{_('Este rubro se evalúa a través de la herramienta MetaMetrics.')}</a></li>
                </ol><br><br>
                
		<div class="page_title">
            <hr/>
            <h4 id="plantilla">{_('Plantilla de evaluación del Comité de Evaluación de Revistas de CLASE, PERIÓDICA y Catálogo SERIUNAM')}</h4>
            <hr/>
        </div>
		
                <p>{_('Para ir directamente al proceso de pree-valuación, haga clic en este ')} <a href="{site_url('preevaluacion/simulador')}">{_('enlace')}</a></p>
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
					<td><b>{_('Mención de un editor de la revista:')}</b> {_('Se valora positivamente la mención de un editor o director de la revista.')}</td>
				</tr>
				<tr>
					<td id="2">2</td>
					<td><b>{_('Datos del organismo responsable y lugar de edición:')}</b> {_('Se valora positivamente si la revista proporciona información suficiente para la identificación y localización del organismo editor o institución responsable, así como los datos del lugar de edición. Los datos pueden ser: nombre completo de la institución editora, dirección postal, ciudad o lugar de edición, teléfonos, correo electrónico o sitio web.')}</td>
				</tr>
				<tr>
					<td id="3">3</td>
					<td><b>{_('Existencia de tabla de contenido o índice:')}</b> {_('Se valora positivamente si la revista proporciona la tabla de contenido o sumario en la que consten, entre otros, los nombres de los autores, título del trabajo y páginas.')}</td>
				</tr>
				<tr>
					<td id="4">4</td>
					<td><b>{_('Membrete bibliográfico en la portada digital:')}</b> {_('Esta deberá incluir al menos el título completo de la revista, ISSN, año, volumen, número y membrete bibliográfico.')}</td>
				</tr>
				<tr>
					<td id="5">5</td>
					<td><b>{_('60%% de contenido indizable:')}</b> {_('Al menos el 60%% de los documentos publicados en un fascículo, deben ser: artículos originales, ensayos, reseñas de libro, revisiones bibliográficas, notas de más de una cuartilla, informes técnicos o cartas al editor.')}</td>
				</tr>
				<tr>
					<td id="6">6</td>
					<td><b>{_('ISSN:')}</b> {_('Es obligatorio contar con código ISSN para la versión electrónica de la revista y en caso de tener una versión impresa esta también deberá tener su propio código ISSN.')}</td>
				</tr>
				<tr>
					<td id="7">7</td>
					<td><b>{_sprintf('Mención del objetivo de la revista:')}</b> {_sprintf('En la portada digital se debe hacer mención de los objetivos que la publicación persigue. Puede valorarse también si hace explícita su especialización temática y/o la audiencia a la que va dirigida.')}</td>
				</tr>
				<tr>
					<td id="8">8</td>
                                        <td><b>{_('Periodicidad semestral o más frecuente:')}</b> {_('Califica positivamente si la revista es semestral o más frecuente, ya que se aprecia que cumpla con su misión de difundir sus contenidos en el menor tiempo posible.')}<br>
                                                                                                    {_('Validación de frecuencia: Se entiende que una revista cumple con este parámetro si a lo largo del año cumple con la periodicidad por la revista (por ejemplo, tres fascículos al año, en el caso de las revistas cuatrimestrales).')}<br>
                                                                                                    {_('Publicación al inicio del periodo programado: para aprobar este punto se requiere que la publicación de los contenidos de la revista se realice al inicio del período según la frecuencia. Para tal efecto, se verifica la frecuencia definida por la revista y la fecha observada en el sitio web de la revista. Cuando los artículos se reúnen en ediciones periódicas, éstas deben estar finalizadas preferentemente al inicio del período.')}<br>
                                                                                                    {_('Se valora como la mejor práctica editorial la publicación continua de artículos, esto es, que los documentos se publiquen en línea tan pronto como sean aprobados y editados. En este caso, los artículos quedan reunidos en un volumen anual con o sin ediciones periódicas (números). Cuando no se adoptan ediciones (números), la publicación de los artículos debe ocurrir a lo largo del año.')}<br>
                                                                                                    {_('Es deseable que el número de artículos publicados anualmente por una revista de publicación continua sea a mayor o igual a 36 documentos, que pueden ser: artículos, ensayos, reseñas de libro, revisiones bibliográficas, notas de más de una cuartilla, informes técnicos o cartas al editor.',.')}<br>
                                        </td>
                                </tr>
				<tr>
					<td id="9">9</td>
					<td><b>{_('Disponibilidad de contenidos retrospectivos:')}</b> {_('Aplica a revistas electrónicas y se refiere al acceso a números y documentos en texto completo publicados anteriormente a su postulación para la base de datos, para revistas con una antigüedad de seis años de su publicación electrónica se considera un periodo de al menos 5 años de disponibilidad. Para aquellas con menos de 5 años de antigüedad se considera un periodo de 3 años. En el caso de nuevas ediciones se consideran al menos 3 fascículos publicados a partir de su año de inicio. En el caso de revistas nuevas de publicación continua se consideran al menos 12 artículos en el año de inicio de su publicación.')}</td>
				</tr>
				<tr>
					<td id="10">10</td>
					<td><b>{_('Existencia de un consejo, comité o cuerpo editorial:')}</b> {_('Deberá constar en la revista la existencia de un cuerpo editorial que apoye al editor en diversas responsabilidades inherentes a la gestión de la revista o bien a la evaluación de las contribuciones y deberán proporcionarse los nombres de cada una de las personas que forman parte de esas instancias. Este consejo, comité o cuerpo editorial deberá contar con evaluadores externos a la entidad editora, lo que se hará constar mediante su afiliación institucional. Al menos el 30% de los miembros del consejo editorial deberán pertenecer a instituciones diferentes a la editora, de lo contrario no calificará positivamente.')}</td>
				</tr>
				<tr>
					<td id="11">11</td>
					<td><b>{_('Servicios de indización que cubren la revista:')}</b> {_('Califica positivamente si la revista está incluida en algún servicio de índices y resúmenes, directorios, catálogos, hemerotecas virtuales y listas del núcleo básico de revistas nacionales o internacionales, entre otros servicios de información. Este campo califica positivamente solo si el servicio de información es mencionado por la propia revista y sus enlaces son verificables.')}</td>
				</tr>
				<tr>
					<td id="12">12</td>
					<td><b>{_('Instrucciones a los autores:')}</b> {_('Califica positivamente si aparecen las instrucciones a los autores sobre el envío de originales en la página principal o de inicio de la revista.')}</td>
				</tr>
                                <tr>
					<td id="13">13</td>
					<td><b>{_('Identificación de autores en documentos:')}</b> {_('Los trabajos deben estar firmados por los autores, con nombre y apellidos o mediante declaración de autoría institucional. Es esencial registrar exhaustivamente las afiliaciones para identificar el origen institucional y geográfico de los documentos. Cada autor debe tener su afiliación especificada, incluyendo el nombre de la institución y su ubicación (ciudad, estado, país). Si un autor tiene múltiples afiliaciones, deben registrarse por separado. La presentación de las afiliaciones debe ser uniforme y seguir ciertas pautas, como agruparlas bajo los nombres de los autores y no incluir currículo. Los nombres de las instituciones deben presentarse completos y en el idioma original o traducidos al inglés si es necesario.')}</td>
				</tr>                                
				<tr>
					<td id="14">14</td>
					<td><b>{_('Referencias bibliográficas en los documentos:')}</b> {_('Los documentos publicados deben proporcionar una lista de referencias bibliográficas, obras citadas o notas bibliográficas al pie de página. La presencia de estas referencias será valorada solamente en artículos, ensayos, reseñas, datasets, archivos históricos, colecciones y programas informáticos y no en cartas al editor, editoriales, entrevistas, reportajes u otro tipo de documentos que no suelen incluir referencias bibliográficas')}
                                                                                                    <br>{_('Para las citas y referencias bibliográficas se recomienda la adopción fiel de normas establecidas como estándares internacionales o las más utilizadas en el área temática de la revista. (APA, Harvard, ISO, Vancouver o alguna otra).',')}</td>
				</tr>
				<tr>
					<td id="15">15</td>
					<td><b>{_('Membrete bibliográfico al inicio del documento:')}</b> {_('Califica positivamente si éste aparece al inicio de cada artículo e identifica a la fuente. Para darlo por cumplido, cada documento ya sea en PDF y/o HTML, debe incluir un membrete que contenga por lo menos: título completo o abreviado, algún identificador de recursos uniforme (URI) como pueden ser DOI, Handle o algún identificador alternativo nacional y la numeración de la revista (año, volumen, número, parte, mes).')}</td>
				</tr>
				<tr>
					<td id="16">16</td>
					<td><b>{_('Descarga individual de contenidos')}</b> {_('Permite la descarga de los artículos de manera individual.')}</td>
				</tr>
				<tr>
					<td id="17">17</td>
					<td><b>{_('Fechas de recepción y/o aceptación del documento:')}</b> {_('Califica positivamente sólo si indica ambas fechas. Esta información se puede ubicar al inicio o al final de cada artículo y es sólo exigible para artículos originales. El tiempo promedio de procesamiento de los manuscritos debe ser como máximo de hasta 6 (seis) meses, considerando el tiempo entre las fechas de recepción y de decisión final en cuanto a la publicación, y de hasta 12 (doce) meses, considerando el tiempo entre las fechas de recepción y publicación del manuscrito. Sin embargo, se recomienda un ciclo total medio de 6 (seis) meses.')}</td>
				</tr>
				<tr>
					<td id="18">18</td>
					<td><b>{_('Resumen del documento:')}</b> {_('Califica positivamente si se incluyen resúmenes del trabajo en el idioma original y en un segundo idioma.')}</td>
				</tr>
				<tr>
					<td id="19">19</td>
					<td><b>{_('Palabras clave:')}</b> {_('Deben proporcionarse palabras clave en el idioma original y en un segundo idioma, las cuales deben describir el contenido del documento. Al igual que con los resúmenes, las palabras clave se valoran solamente en artículos.')}</td>
				</tr>
				<tr>
					<td id="20">20</td>
					<td><b>{_('Mención del sistema de arbitraje:')}</b> {_('En la revista deberá constar que el procedimiento empleado para la selección de los artículos a publicar es el arbitraje, ya sea abierto o por pares mediante el sistema "doble ciego"')}</td>
				</tr>
				<tr>
					<td id="21">21</td>
					<td><b>{_('Mención de originalidad de los documentos:')}</b> {_('Califica positivamente si en la presentación de la revista o en las instrucciones a los autores se menciona explícitamente esta exigencia para los trabajos sometidos a publicación.')}</td>
				</tr>
				<tr>
					<td id="22">22</td>
					<td><b>{_('Declaración de política de derecho de autor respecto al acceso de los documentos:')}</b> {_('En particular se recomienda utilizar licencias Creative Commons (https://creativecommons.org/licenses). La información del tipo de licencia adoptada por la revista debe constar obligatoriamente en los formatos PDF, XML y otros que utilice la revista para la publicación en línea.')}</td>
				</tr>
				<tr>
					<td id="23">23</td>
					<td><b>{_('Fuentes de financiamiento:')}</b> {_('Indicar si la revista efectúa cobro por el procesamiento de artículos (APC) y/o mencionar cuáles son sus fuentes de financiamiento.')}</td>
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
				<td id="24">24</td>
				<td><b>{_('Adopción de códigos de ética:')}</b> {_('La revista debe informar su adhesión a normas y códigos de ética internacionales: Pueden ser los establecidos por el Committee on Publication Ethics (Code of Conduct and Best Practices Guidelines for Journals Editors, COPE https://publicationethics.org), por el Council of Science Editors (http://www.councilscienceeditors.org), Council for International Organizations of Medical Sciences (CIOMS, http://cioms.ch), el International Committee of Medical Journal Editors (ICJME, http://www.icmje.org), algún otro, o bien tener su propio código de ética y en este caso darlo a conocer.')}</td>
                            </tr>
                            <tr>
				<td id="25">25</td>
				<td><b>{_('Formato de dictaminación visible:')}</b> {_('Califica positivamente si este formato es público y está disponible.')}</td>
                            </tr>
                            <tr>
				<td id="26">26</td>
				<td><b>{_('Recepción continua de manuscritos:')}</b> {_('La recepción de artículos para su dictaminación y probable publicación por la revista debe estar disponible de forma continua, es decir, no es válido que las revistas suspendan la recepción de manuscritos en ningún período por ninguna razón.')}</td>
                            </tr>
                            <tr>
				<td id="27">27</td>
				<td><b>{_('Composición e internacionalidad de los editores y del cuerpo editorial (Editores asociados o Editores por sección:')}</b> {_('Las revistas pueden adoptar diferentes estructuras y denominaciones de instancias de gestión editorial. Estas estructuras y las funciones que realizan deben estar documentadas formalmente y actualizadas periódicamente/anualmente.')}
                                                                                                                                                                <br> {_('Editores-jefes: Todas las revistas deben tener uno o más editores-jefes definidos, con afiliación nacional o extranjera. Los editores-jefes son investigadores nacionales o extranjeros reconocidos en el área de la revista y su afiliación institucional y sus currículos actualizados deben estar disponibles en línea y accesibles de preferencia por los respectivos números de registro del ORCID. En el nivel de coordinación editorial, las revistas pueden tener vice editores o editores asistentes.')}</td>
                            </tr>
                            <tr>
				<td id="28">28</td>
				<td><b>{_('Internacionalidad de los dictaminadores/árbitros:')}</b> {_('Los expertos encargados de la dictaminación de los artículos deben ser investigadores nacionales y extranjeros reconocidos en el tema de los manuscritos que evalúan. Debe maximizarse la participación de árbitros afiliados a instituciones extranjeras.')}</td>
                            </tr>
                            <tr>
				<td id="29">29</td>
				<td><b>{_('Declaración de la contribución de autores y colaboradores:')}</b> 
                                    {_('La autoría de un documento atribuye crédito e implica la responsabilidad del contenido publicado. Las revistas deben instruir a los autores a registrar al final de los artículos la contribución de cada uno de los autores y colaboradores, expresada en las instrucciones a los autores, con la utilización de dos criterios mínimos de autoría:')}
                                    <ol type="a">
                                        <li>{_('a. Participar activamente en la discusión de los resultados;')}</li>
                                        <li>{_('b. Revisión y aprobación de la versión final del trabajo.')}</li>
                                    </ol>
                                </td>
                            </tr>
                            <tr>
                                <td id="30">30</td>
                                <td>
                                    <b>{_('Adopción de lineamiento de Ciencia Abierta:')}</b> {_('La Ciencia Abierta preconiza la apertura de todos los componentes que fundamentan la comunicación de la investigación, como son los métodos, datos y programas de computadora. Esta apertura pretende contribuir a acelerar la publicación de las investigaciones, facilitar la evaluación de los manuscritos, la replicabilidad de las investigaciones y reutilización de los datos recolectados. En este sentido, se requiere la implantación de los siguientes avances:')}
                                    <ul>
                                        <li>{_('Aceleración de la publicación de las investigaciones mediante preprints, entendido como manuscritos listos para envío a revistas y que están disponibles en acceso abierto en la Web en repositorios de preprints antes de la presentación formal a una revista. Las revistas deberán especificar en las instrucciones a los autores los criterios de aceptación de preprints;')}</li>
                                        <li>{_('Identificación y recomendación de repositorios de datos por área temática para orientar el depósito de estos datos: Se recomienda la adopción de los principios FAIR (Findable, Accessible, Interoperable y Reutilizable) para la calificación de los repositorios de datos;')}</li>
                                        <li>{_('Adopción de las directrices TOP (Transparencia y Openness Promotion) para la calificación de los artículos y revistas con relación a la cita y referencia de datos, métodos, programas de computadora, etc.')}</li>
                                        <li>{_('Disponibilidad de los datos de la investigación: La disponibilidad de los datos de las investigaciones utilizados en los artículos en repositorios de acceso abierto, siguiendo patrones de registro que aseguran la autoría, el uso y citación de los datos, así como del artículo correspondiente, es recomendable pues contribuye a la replicabilidad de las investigaciones, aumenta la visibilidad y las citas de las investigaciones y de las revistas.')}</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
				<td id="31">31</td>
				<td><b>{_('Erratas y retractaciones:')}</b> {_('Los editores deben mencionar en las instrucciones a los autores, que permiten la publicación de erratas y por otra parte se responsabilizan de la retractación de artículos.')}</td>
                            </tr>
                            <tr>
				<td id="32">32</td>
				<td><b>{_('Es recomendable la adopción de programas para la detección del plagio')}</td>
                            </tr>
 
                        </tbody>                            
		</table><br>
                
                <p><b>{_('Fuentes')}</b></p>
                <p>{_('La actualización de la plantilla de evaluación de CLASE, PERIÓDICA y SERIUNAM retomó (en algunos puntos con las mismas palabras incluso) los criterios adoptados por:')}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{_('SciELO-Brasil:')}</b> <a target="_blank" href="http://www.scielo.br/avaliacao/Criterios_SciELO_Brasil_versao_revisada_atualizada_outubro_20171206_EN.pdf"> {_('http://www.scielo.br/avaliacao/Criterios_SciELO_Brasil_versao_revisada_atualizada_outubro_20171206_EN.pdf')} </a></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{_('Latindex - Características del Catálogo 2.0:')}</b> <a target="_blank" href="https://latindex.org/latindex/postulacion/postulacionCatalogo"> {_('https://latindex.org/latindex/postulacion/postulacionCatalogo')}</a></p>
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
		