// Variables globales
let carrerasDisponibles = [];
let filtrosActivos = {
    area: '',
    universidad: '',
    region: ''
};

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando aplicación...');
    setupEventListeners();
    populateUniversityFilter();
    cargarConfiguracion();
    mostrarEstadoBasico();
});

// Mostrar estado básico
function mostrarEstadoBasico() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const statusDiv = document.createElement('div');
    statusDiv.className = 'api-status';
    statusDiv.innerHTML = `
        <div style="
            background: rgba(255, 193, 7, 0.1);
            border: 1px solid #ffc107;
            color: #856404;
            padding: 10px 15px;
            border-radius: 8px;
            margin-top: 15px;
            font-size: 0.9rem;
            text-align: center;
        ">
            🟡 Modo básico - Datos referenciales 2024
        </div>
    `;
    header.appendChild(statusDiv);
}

// Configurar event listeners
function setupEventListeners() {
    const form = document.getElementById('scoreForm');
    const areaFilter = document.getElementById('areaFilter');
    const universityFilter = document.getElementById('universityFilter');
    const regionFilter = document.getElementById('regionFilter');

    if (form) form.addEventListener('submit', handleFormSubmit);
    if (areaFilter) areaFilter.addEventListener('change', handleAreaFilter);
    if (universityFilter) universityFilter.addEventListener('change', handleUniversityFilter);
    if (regionFilter) regionFilter.addEventListener('change', handleRegionFilter);
}

// Poblar el filtro de universidades
function populateUniversityFilter() {
    const universityFilter = document.getElementById('universityFilter');
    if (!universityFilter) return;
    
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
    
    if (!resultsSection || !resultsContainer) return;
    
    // Mostrar loading
    resultsContainer.innerHTML = '<div class="loading">Calculando opciones disponibles...</div>';
    resultsSection.style.display = 'block';
    
    // Simular tiempo de carga para mejor UX
    setTimeout(() => {
        carrerasDisponibles = calcularCarrerasDisponibles(puntajes);
        renderizarCarreras(carrerasDisponibles);
        actualizarEstadisticas(carrerasDisponibles);
    }, 1000);
}

// Calcular puntaje ponderado según las ponderaciones de cada carrera
function calcularPuntajePonderado(puntajes, carrera) {
    // Ponderaciones por defecto si no están definidas
    const ponderacionesDefault = {
        lectora: 25,
        matematica: 25,
        electiva: 20,
        nem: 15,
        ranking: 15
    };
    
    const pond = carrera.ponderaciones || ponderacionesDefault;
    
    const puntajePonderado = 
        (puntajes.competenciaLectora * pond.lectora / 100) +
        (puntajes.matematica * pond.matematica / 100) +
        (puntajes.electiva * pond.electiva / 100) +
        (puntajes.nem * pond.nem / 100) +
        (puntajes.ranking * pond.ranking / 100);
    
    return puntajePonderado;
}

// Calcular carreras disponibles
function calcularCarrerasDisponibles(puntajes) {
    return carreras
        .map(carrera => {
            const puntajePonderado = calcularPuntajePonderado(puntajes, carrera);
            const margenSobre = puntajePonderado - carrera.puntajeCorte;
            const desglosePuntajes = calcularDesglosePuntajes(puntajes, carrera);
            
            return {
                ...carrera,
                puntajePonderado: Math.round(puntajePonderado),
                margenSobre,
                esElegible: puntajePonderado >= carrera.puntajeCorte,
                desglosePuntajes
            };
        })
        .filter(carrera => carrera.esElegible)
        .sort((a, b) => b.puntajePonderado - a.puntajePonderado);
}

// Calcular desglose de puntajes según ponderaciones
function calcularDesglosePuntajes(puntajes, carrera) {
    const ponderacionesDefault = {
        lectora: 25,
        matematica: 25,
        electiva: 20,
        nem: 15,
        ranking: 15
    };
    
    const pond = carrera.ponderaciones || ponderacionesDefault;
    
    return {
        lectora: Math.round(puntajes.competenciaLectora * pond.lectora / 100),
        matematica: Math.round(puntajes.matematica * pond.matematica / 100),
        electiva: Math.round(puntajes.electiva * pond.electiva / 100),
        nem: Math.round(puntajes.nem * pond.nem / 100),
        ranking: Math.round(puntajes.ranking * pond.ranking / 100)
    };
}

// Renderizar carreras
function renderizarCarreras(carreras) {
    const resultsContainer = document.getElementById('resultsContainer');
    if (!resultsContainer) return;
    
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
    
    // Obtener ponderaciones (usar por defecto si no están definidas)
    const ponderacionesDefault = {
        lectora: 25,
        matematica: 25,
        electiva: 20,
        nem: 15,
        ranking: 15
    };
    const pond = carrera.ponderaciones || ponderacionesDefault;
    const desglose = carrera.desglosePuntajes;
    
    return `
        <div class="career-card" onclick="expandirCarrera(this)">
            <div class="career-header">
                <div>
                    <div class="career-title">${carrera.nombre}</div>
                    <div class="university-name">${universidades[carrera.universidad]}</div>
                    <span class="area-tag">${obtenerNombreArea(carrera.area)}</span>
                </div>
                <div class="score-info">
                    <div class="score-required">
                        ${carrera.puntajePonderado} pts
                        <span class="margin-indicator ${margenClase}">${margenTexto}</span>
                    </div>
                    <div class="ponderado-info">
                        Puntaje ponderado
                    </div>
                </div>
            </div>
            
            <div class="career-details">
                <div class="detail-item">
                    <div class="detail-label">Puntaje de Corte</div>
                    <div class="detail-value">${carrera.puntajeCorte}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Tu Puntaje</div>
                    <div class="detail-value" style="font-weight: 600;">${carrera.puntajePonderado}</div>
                </div>
                <div class="detail-item full-width">
                    <div class="detail-label">Ponderaciones de esta carrera</div>
                    <div class="ponderaciones-grid">
                        <div class="pond-item">Lectora: <strong>${pond.lectora}%</strong></div>
                        <div class="pond-item">Matemática: <strong>${pond.matematica}%</strong></div>
                        <div class="pond-item">Electiva: <strong>${pond.electiva}%</strong></div>
                        <div class="pond-item">NEM: <strong>${pond.nem}%</strong></div>
                        <div class="pond-item">Ranking: <strong>${pond.ranking}%</strong></div>
                    </div>
                </div>
                <div class="detail-item full-width">
                    <div class="detail-label">Desglose de tu puntaje ponderado</div>
                    <div class="desglose-grid">
                        <div class="desglose-item">
                            <span class="desglose-label">Lectora (${pond.lectora}%)</span>
                            <span class="desglose-value">${desglose.lectora} pts</span>
                        </div>
                        <div class="desglose-item">
                            <span class="desglose-label">Matemática (${pond.matematica}%)</span>
                            <span class="desglose-value">${desglose.matematica} pts</span>
                        </div>
                        <div class="desglose-item">
                            <span class="desglose-label">Electiva (${pond.electiva}%)</span>
                            <span class="desglose-value">${desglose.electiva} pts</span>
                        </div>
                        <div class="desglose-item">
                            <span class="desglose-label">NEM (${pond.nem}%)</span>
                            <span class="desglose-value">${desglose.nem} pts</span>
                        </div>
                        <div class="desglose-item">
                            <span class="desglose-label">Ranking (${pond.ranking}%)</span>
                            <span class="desglose-value">${desglose.ranking} pts</span>
                        </div>
                        <div class="desglose-total">
                            <span class="desglose-label"><strong>Total</strong></span>
                            <span class="desglose-value"><strong>${carrera.puntajePonderado} pts</strong></span>
                        </div>
                    </div>
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

// Expandir información de carrera
function expandirCarrera(element) {
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

// Manejar filtro por región
function handleRegionFilter(e) {
    filtrosActivos.region = e.target.value;
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
    
    if (filtrosActivos.region) {
        carrerasFiltradas = carrerasFiltradas.filter(carrera => 
            carrera.ciudad === filtrosActivos.region
        );
    }
    
    renderizarCarreras(carrerasFiltradas);
    actualizarEstadisticas(carrerasFiltradas);
}

// Actualizar estadísticas
function actualizarEstadisticas(carreras) {
    const statsText = document.getElementById('statsText');
    if (!statsText) return;
    
    if (carreras.length === 0) {
        statsText.textContent = 'No hay carreras que coincidan con los filtros aplicados.';
        return;
    }
    
    const universidadesUnicas = [...new Set(carreras.map(c => c.universidad))].length;
    const areasUnicas = [...new Set(carreras.map(c => c.area))].length;
    const promedioMargen = carreras.reduce((sum, c) => sum + c.margenSobre, 0) / carreras.length;
    const promedioPuntaje = carreras.reduce((sum, c) => sum + c.puntajePonderado, 0) / carreras.length;
    
    // Contar carreras por margen
    const carrerasSeguras = carreras.filter(c => c.margenSobre >= 30).length;
    const carrerasAjustadas = carreras.filter(c => c.margenSobre >= 10 && c.margenSobre < 30).length;
    const carrerasRiesgosas = carreras.filter(c => c.margenSobre < 10).length;
    
    statsText.innerHTML = `
        📊 <strong>${carreras.length}</strong> carreras disponibles en 
        <strong>${universidadesUnicas}</strong> universidades y 
        <strong>${areasUnicas}</strong> áreas académicas. <br>
        🎯 Puntaje promedio: <strong>${Math.round(promedioPuntaje)}</strong> pts | 
        Margen promedio: <strong>${promedioMargen >= 0 ? '+' : ''}${Math.round(promedioMargen)}</strong> pts | 
        ✅ <strong style="color: #10b981;">${carrerasSeguras}</strong> seguras | 
        ⚠️ <strong style="color: #f59e0b;">${carrerasAjustadas}</strong> ajustadas | 
        🔴 <strong style="color: #ef4444;">${carrerasRiesgosas}</strong> riesgosas
    `;
}

// Función para guardar configuración en localStorage
function guardarConfiguracion() {
    try {
        const puntajes = obtenerPuntajes();
        localStorage.setItem('fuasSimulatorData', JSON.stringify(puntajes));
    } catch (error) {
        console.warn('Error guardando configuración:', error);
    }
}

// Función para cargar configuración desde localStorage
function cargarConfiguracion() {
    try {
        const data = localStorage.getItem('fuasSimulatorData');
        if (data) {
            const puntajes = JSON.parse(data);
            const campos = [
                'competenciaLectora', 'matematica', 'electiva', 'nem', 'ranking'
            ];
            
            campos.forEach(campo => {
                const elemento = document.getElementById(campo);
                if (elemento && puntajes[campo]) {
                    elemento.value = puntajes[campo];
                }
            });
            
            if (puntajes.tipoMatematica) {
                const tipoMat = document.getElementById('tipoMatematica');
                if (tipoMat) tipoMat.value = puntajes.tipoMatematica;
            }
            
            if (puntajes.tipoElectiva) {
                const tipoElec = document.getElementById('tipoElectiva');
                if (tipoElec) tipoElec.value = puntajes.tipoElectiva;
            }
        }
    } catch (error) {
        console.warn('Error cargando configuración:', error);
    }
}

// Guardar configuración antes de salir
window.addEventListener('beforeunload', function() {
    const competenciaLectora = document.getElementById('competenciaLectora');
    if (competenciaLectora && competenciaLectora.value) {
        guardarConfiguracion();
    }
});

// Funciones de exportación y compartir (básicas)
function exportarDatosActualizados() {
    if (carrerasDisponibles.length === 0) {
        alert('No hay resultados para exportar. Primero busca carreras.');
        return;
    }
    
    const datos = {
        fecha: new Date().toISOString(),
        carreras: carrerasDisponibles.length,
        resultados: carrerasDisponibles
    };
    
    const dataStr = JSON.stringify(datos, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `simulador-fuas-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

function compartirResultados() {
    if (carrerasDisponibles.length === 0) {
        alert('No hay resultados para compartir. Primero busca carreras.');
        return;
    }
    
    if (navigator.share) {
        navigator.share({
            title: 'Mis opciones de carrera - Simulador FUAS',
            text: `Encontré ${carrerasDisponibles.length} carreras disponibles con mis puntajes.`,
            url: window.location.href
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('URL copiada al portapapeles');
        }).catch(() => {
            alert('No se pudo compartir automáticamente. URL: ' + url);
        });
    }
}
