// Variables globales
let carrerasDisponibles = [];
let filtrosActivos = {
    area: '',
    universidad: ''
};
let apiManager = null;
let modoAPI = false; // true para usar APIs, false para datos locales

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Inicializar aplicación
async function initializeApp() {
    try {
        // Inicializar API Manager solo si está disponible
        if (window.APIManager) {
            apiManager = new APIManager();
            await verificarDisponibilidadAPIs();
        } else {
            console.log('🔧 Modo básico - APIs no disponibles');
            modoAPI = false;
        }
        
        // Configurar event listeners
        setupEventListeners();
        
        // Poblar filtros
        populateUniversityFilter();
        
        // Mostrar estado de APIs
        mostrarEstadoAPIs();
        
        // Cargar configuración guardada
        cargarConfiguracion();
        
    } catch (error) {
        console.error('Error inicializando aplicación:', error);
        // Continuar con funcionalidad básica
        setupEventListeners();
        populateUniversityFilter();
    }
}

// Verificar disponibilidad de APIs
async function verificarDisponibilidadAPIs() {
    try {
        if (!apiManager) return;
        
        const estadoAPIs = await apiManager.verificarEstadoAPIs();
        modoAPI = estadoAPIs.demre || estadoAPIs.universidades;
        
        if (modoAPI) {
            console.log('✅ APIs disponibles - Usando datos en tiempo real');
            await cargarDatosDesdeAPI();
        } else {
            console.log('⚠️ APIs no disponibles - Usando datos locales');
        }
    } catch (error) {
        console.warn('Error verificando APIs:', error);
        modoAPI = false;
    }
}

// Cargar datos desde API
async function cargarDatosDesdeAPI() {
    try {
        mostrarIndicadorCarga('Actualizando datos desde fuentes oficiales...');
        
        // Obtener carreras desde DEMRE
        const carrerasAPI = await apiManager.obtenerCarrerasDEMRE();
        
        if (carrerasAPI && carrerasAPI.length > 0) {
            // Combinar datos de API con datos locales
            window.carreras = [...carrerasAPI, ...window.carreras];
            
            // Actualizar filtros con nuevas universidades
            populateUniversityFilter();
            
            console.log(`✅ Cargadas ${carrerasAPI.length} carreras desde API`);
        }
        
        ocultarIndicadorCarga();
    } catch (error) {
        console.error('Error cargando datos desde API:', error);
        ocultarIndicadorCarga();
    }
}

// Mostrar indicador de carga
function mostrarIndicadorCarga(mensaje) {
    const indicator = document.createElement('div');
    indicator.id = 'api-loading-indicator';
    indicator.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 500;
        ">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="
                    width: 20px;
                    height: 20px;
                    border: 3px solid rgba(255,255,255,0.3);
                    border-top: 3px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
                ${mensaje}
            </div>
        </div>
    `;
    document.body.appendChild(indicator);
}

// Ocultar indicador de carga
function ocultarIndicadorCarga() {
    const indicator = document.getElementById('api-loading-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Mostrar estado de APIs en la interfaz
function mostrarEstadoAPIs() {
    try {
        const header = document.querySelector('header');
        if (!header) return;
        
        // Eliminar estado anterior si existe
        const existingStatus = document.querySelector('.api-status');
        if (existingStatus) {
            existingStatus.remove();
        }
        
        const statusDiv = document.createElement('div');
        statusDiv.className = 'api-status';
        statusDiv.innerHTML = `
            <div style="
                background: ${modoAPI ? 'rgba(40, 167, 69, 0.1)' : 'rgba(255, 193, 7, 0.1)'};
                border: 1px solid ${modoAPI ? '#28a745' : '#ffc107'};
                color: ${modoAPI ? '#155724' : '#856404'};
                padding: 10px 15px;
                border-radius: 8px;
                margin-top: 15px;
                font-size: 0.9rem;
                text-align: center;
            ">
                ${modoAPI ? 
                    '🟢 Conectado a fuentes oficiales - Datos actualizados' : 
                    '🟡 Modo offline - Datos referenciales del 2024'
                }
                <button onclick="actualizarDatos()" style="
                    background: none;
                    border: 1px solid currentColor;
                    color: currentColor;
                    padding: 5px 10px;
                    border-radius: 5px;
                    margin-left: 10px;
                    cursor: pointer;
                    font-size: 0.8rem;
                ">
                    🔄 Actualizar
                </button>
            </div>
        `;
        header.appendChild(statusDiv);
    } catch (error) {
        console.warn('Error mostrando estado de APIs:', error);
    }
}

// Configurar event listeners
function setupEventListeners() {
    const form = document.getElementById('scoreForm');
    const areaFilter = document.getElementById('areaFilter');
    const universityFilter = document.getElementById('universityFilter');

    form.addEventListener('submit', handleFormSubmit);
    areaFilter.addEventListener('change', handleAreaFilter);
    universityFilter.addEventListener('change', handleUniversityFilter);
}

// Poblar el filtro de universidades
function populateUniversityFilter() {
    const universityFilter = document.getElementById('universityFilter');
    const universidadesUnicas = [...new Set(carreras.map(c => c.universidad))];
    
    universidadesUnicas.forEach(univId => {
        const option = document.createElement('option');
        option.value = univId;
        option.textContent = universidades[univId];
        universityFilter.appendChild(option);
    });
}

// Manejar envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    const puntajes = obtenerPuntajes();
    
    if (!validarPuntajes(puntajes)) {
        alert('Por favor, completa todos los campos con puntajes válidos (150-850).');
        return;
    }
    
    mostrarResultados(puntajes);
}

// Obtener puntajes del formulario
function obtenerPuntajes() {
    return {
        competenciaLectora: parseFloat(document.getElementById('competenciaLectora').value) || 0,
        matematica: parseFloat(document.getElementById('matematica').value) || 0,
        electiva: parseFloat(document.getElementById('electiva').value) || 0,
        nem: parseFloat(document.getElementById('nem').value) || 0,
        ranking: parseFloat(document.getElementById('ranking').value) || 0,
        tipoMatematica: document.getElementById('tipoMatematica').value,
        tipoElectiva: document.getElementById('tipoElectiva').value
    };
}

// Validar puntajes
function validarPuntajes(puntajes) {
    const { competenciaLectora, matematica, electiva, nem, ranking } = puntajes;
    
    return [competenciaLectora, matematica, electiva, nem, ranking].every(puntaje => 
        puntaje >= 100 && puntaje <= 1000
    );
}

// Mostrar resultados
function mostrarResultados(puntajes) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Mostrar loading
    resultsContainer.innerHTML = '<div class="loading">Calculando opciones disponibles...</div>';
    resultsSection.style.display = 'block';
    
    // Simular tiempo de carga para mejor UX
    setTimeout(async () => {
        carrerasDisponibles = await calcularCarrerasDisponibles(puntajes);
        renderizarCarreras(carrerasDisponibles);
        actualizarEstadisticas(carrerasDisponibles);
    }, 1000);
}

// Renderizar carreras
function renderizarCarreras(carreras) {
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (carreras.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <h3>😞 No se encontraron carreras</h3>
                <p>Con los puntajes ingresados no hay carreras disponibles en nuestra base de datos.</p>
                <p>Te sugerimos:</p>
                <ul style="text-align: left; margin-top: 15px;">
                    <li>Revisar si ingresaste correctamente los puntajes</li>
                    <li>Considerar universidades privadas o institutos profesionales</li>
                    <li>Prepararte para rendir nuevamente las pruebas</li>
                </ul>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = carreras.map(carrera => crearTarjetaCarrera(carrera)).join('');
}

// Crear tarjeta de carrera
function crearTarjetaCarrera(carrera) {
    const margenClase = obtenerClaseMargen(carrera.margenSobre);
    const margenTexto = obtenerTextoMargen(carrera.margenSobre);
    
    return `
        <div class="career-card" onclick="expandirCarrera(this)">
            <div class="career-header">
                <div>
                    <div class="career-title">${carrera.nombre}</div>
                    <div class="university-name">${universidades[carrera.universidad]}</div>
                    <span class="area-tag">${obtenerNombreArea(carrera.area)}</span>
                </div>
                <div class="score-required">
                    ${carrera.puntajePonderado} pts
                    <span class="margin-indicator ${margenClase}">${margenTexto}</span>
                </div>
            </div>
            
            <div class="career-details">
                <div class="detail-item">
                    <div class="detail-label">Puntaje de Corte</div>
                    <div class="detail-value">${carrera.puntajeCorte}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Vacantes</div>
                    <div class="detail-value">${carrera.vacantes}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Duración</div>
                    <div class="detail-value">${carrera.duracion}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Modalidad</div>
                    <div class="detail-value">${carrera.modalidad}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Ciudad</div>
                    <div class="detail-value">${carrera.ciudad}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Margen</div>
                    <div class="detail-value">${carrera.margenSobre > 0 ? '+' : ''}${Math.round(carrera.margenSobre)} pts</div>
                </div>
            </div>
        </div>
    `;
}

// Obtener clase CSS para el margen
function obtenerClaseMargen(margen) {
    if (margen >= 30) return 'safe-margin';
    if (margen >= 10) return 'tight-margin';
    return 'risky-margin';
}

// Obtener texto descriptivo del margen
function obtenerTextoMargen(margen) {
    if (margen >= 30) return 'Seguro';
    if (margen >= 10) return 'Ajustado';
    return 'Riesgoso';
}

// Obtener nombre del área
function obtenerNombreArea(area) {
    const nombres = {
        medicina: 'Medicina y Salud',
        ingenieria: 'Ingeniería',
        derecho: 'Derecho',
        economia: 'Economía y Negocios',
        educacion: 'Educación',
        ciencias: 'Ciencias',
        arte: 'Arte y Humanidades',
        social: 'Ciencias Sociales'
    };
    return nombres[area] || area;
}

// Expandir información de carrera (funcionalidad futura)
function expandirCarrera(element) {
    // Aquí se puede agregar funcionalidad para mostrar más información
    element.style.transform = element.style.transform === 'scale(1.02)' ? 'scale(1)' : 'scale(1.02)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

// Manejar filtro por área
function handleAreaFilter(e) {
    filtrosActivos.area = e.target.value;
    aplicarFiltros();
}

// Manejar filtro por universidad
function handleUniversityFilter(e) {
    filtrosActivos.universidad = e.target.value;
    aplicarFiltros();
}

// Aplicar filtros
function aplicarFiltros() {
    if (carrerasDisponibles.length === 0) return;
    
    let carrerasFiltradas = carrerasDisponibles;
    
    if (filtrosActivos.area) {
        carrerasFiltradas = carrerasFiltradas.filter(carrera => 
            carrera.area === filtrosActivos.area
        );
    }
    
    if (filtrosActivos.universidad) {
        carrerasFiltradas = carrerasFiltradas.filter(carrera => 
            carrera.universidad === filtrosActivos.universidad
        );
    }
    
    renderizarCarreras(carrerasFiltradas);
    actualizarEstadisticas(carrerasFiltradas);
}

// Actualizar estadísticas
function actualizarEstadisticas(carreras) {
    const statsText = document.getElementById('statsText');
    
    if (carreras.length === 0) {
        statsText.textContent = 'No hay carreras que coincidan con los filtros aplicados.';
        return;
    }
    
    const universidadesUnicas = [...new Set(carreras.map(c => c.universidad))].length;
    const areasUnicas = [...new Set(carreras.map(c => c.area))].length;
    const promedioMargen = carreras.reduce((sum, c) => sum + c.margenSobre, 0) / carreras.length;
    
    statsText.innerHTML = `
        📊 <strong>${carreras.length}</strong> carreras disponibles en 
        <strong>${universidadesUnicas}</strong> universidades y 
        <strong>${areasUnicas}</strong> áreas académicas. 
        Margen promedio: <strong>${promedioMargen >= 0 ? '+' : ''}${Math.round(promedioMargen)}</strong> puntos.
    `;
}

// Función auxiliar para formatear números
function formatearNumero(numero) {
    return new Intl.NumberFormat('es-CL').format(numero);
}

// Función para exportar resultados (funcionalidad futura)
function exportarResultados() {
    if (carrerasDisponibles.length === 0) {
        alert('No hay resultados para exportar.');
        return;
    }
    
    // Aquí se puede implementar exportación a PDF o Excel
    console.log('Exportando resultados...', carrerasDisponibles);
}

// Función para compartir resultados (funcionalidad futura)
function compartirResultados() {
    if (navigator.share && carrerasDisponibles.length > 0) {
        navigator.share({
            title: 'Mis opciones de carrera - Simulador FUAS',
            text: `Encontré ${carrerasDisponibles.length} carreras disponibles con mis puntajes.`,
            url: window.location.href
        });
    }
}

// Función para guardar configuración en localStorage
function guardarConfiguracion() {
    const puntajes = obtenerPuntajes();
    localStorage.setItem('fuasSimulatorData', JSON.stringify(puntajes));
}

// Función para cargar configuración desde localStorage
function cargarConfiguracion() {
    const data = localStorage.getItem('fuasSimulatorData');
    if (data) {
        const puntajes = JSON.parse(data);
        document.getElementById('competenciaLectora').value = puntajes.competenciaLectora || '';
        document.getElementById('matematica').value = puntajes.matematica || '';
        document.getElementById('electiva').value = puntajes.electiva || '';
        document.getElementById('nem').value = puntajes.nem || '';
        document.getElementById('ranking').value = puntajes.ranking || '';
        document.getElementById('tipoMatematica').value = puntajes.tipoMatematica || 'm1';
        document.getElementById('tipoElectiva').value = puntajes.tipoElectiva || 'historia';
    }
}

// Cargar configuración al iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarConfiguracion();
});

// Guardar configuración antes de salir
window.addEventListener('beforeunload', function() {
    if (document.getElementById('competenciaLectora').value) {
        guardarConfiguracion();
    }
});

// Función para actualizar datos manualmente
async function actualizarDatos() {
    mostrarIndicadorCarga('Actualizando datos...');
    
    try {
        // Verificar APIs nuevamente
        await verificarDisponibilidadAPIs();
        
        if (modoAPI) {
            await cargarDatosDesdeAPI();
            
            // Si hay resultados mostrados, recalcular
            if (carrerasDisponibles.length > 0) {
                const puntajes = obtenerPuntajes();
                if (validarPuntajes(puntajes)) {
                    mostrarResultados(puntajes);
                }
            }
        }
        
        // Actualizar estado visual
        document.querySelector('.api-status').remove();
        mostrarEstadoAPIs();
        
    } catch (error) {
        console.error('Error actualizando datos:', error);
        alert('Error al actualizar datos. Inténtalo más tarde.');
    } finally {
        ocultarIndicadorCarga();
    }
}

// Función para obtener vacantes actualizadas de una carrera específica
async function obtenerVacantesActualizadas(codigoCarrera) {
    if (!modoAPI) return null;
    
    try {
        return await apiManager.obtenerVacantesActualizadas(codigoCarrera);
    } catch (error) {
        console.warn('Error obteniendo vacantes actualizadas:', error);
        return null;
    }
}

// Función mejorada para calcular carreras disponibles con datos de API
async function calcularCarrerasDisponibles(puntajes) {
    let carrerasCalculadas = carreras
        .map(carrera => {
            // Usar ponderaciones específicas si están disponibles desde API
            const puntajePonderado = carrera.ponderaciones ? 
                calcularPuntajePonderadoEspecifico(puntajes, carrera) :
                calcularPuntajePonderado(puntajes, carrera);
            
            const margenSobre = puntajePonderado - carrera.puntajeCorte;
            
            return {
                ...carrera,
                puntajePonderado: Math.round(puntajePonderado),
                margenSobre,
                esElegible: puntajePonderado >= carrera.puntajeCorte
            };
        })
        .filter(carrera => carrera.esElegible)
        .sort((a, b) => b.puntajePonderado - a.puntajePonderado);

    // Si estamos en modo API, intentar obtener vacantes actualizadas
    if (modoAPI) {
        for (let carrera of carrerasCalculadas) {
            if (carrera.codigo) {
                const vacantesActualizadas = await obtenerVacantesActualizadas(carrera.codigo);
                if (vacantesActualizadas) {
                    carrera.vacantes = vacantesActualizadas.vacantes_disponibles;
                    carrera.vacantesActualizadas = true;
                }
            }
        }
    }

    return carrerasCalculadas;
}

// Calcular puntaje ponderado con ponderaciones específicas de API
function calcularPuntajePonderadoEspecifico(puntajes, carrera) {
    const pond = carrera.ponderaciones;
    
    return (
        puntajes.competenciaLectora * pond.lectora +
        puntajes.matematica * pond.matematica +
        puntajes.electiva * pond.electiva +
        puntajes.nem * pond.nem +
        puntajes.ranking * pond.ranking
    );
}

// Función para exportar datos actualizados
async function exportarDatosActualizados() {
    if (!modoAPI) {
        alert('Función disponible solo con conexión a APIs oficiales.');
        return;
    }

    try {
        mostrarIndicadorCarga('Preparando exportación...');
        
        const datosCompletos = {
            fechaExportacion: new Date().toISOString(),
            fuente: 'APIs Oficiales',
            carreras: carrerasDisponibles,
            metadatos: {
                totalCarreras: carrerasDisponibles.length,
                universidades: [...new Set(carrerasDisponibles.map(c => c.universidad))],
                areas: [...new Set(carrerasDisponibles.map(c => c.area))]
            }
        };
        
        const dataStr = JSON.stringify(datosCompletos, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `simulador-fuas-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        ocultarIndicadorCarga();
    } catch (error) {
        console.error('Error exportando datos:', error);
        ocultarIndicadorCarga();
    }
}
