// Configuración de APIs para el Simulador FUAS
const API_CONFIG = {
    // URLs de APIs oficiales (estas son ejemplos, necesitarías las URLs reales)
    endpoints: {
        // DEMRE - Departamento de Evaluación, Medición y Registro Educacional
        demre: {
            base: 'https://api.demre.cl/v1',
            carreras: '/admision/carreras',
            puntajes: '/admision/puntajes-corte',
            vacantes: '/admision/vacantes',
            estadisticas: '/estadisticas/proceso-admision'
        },
        
        // Ministerio de Educación
        mineduc: {
            base: 'https://api.mineduc.cl/v1',
            universidades: '/instituciones/universidades',
            acreditacion: '/acreditacion/instituciones',
            carreras: '/carreras/reconocidas'
        },
        
        // Portal de datos abiertos
        datosAbiertos: {
            base: 'https://api.datos.gob.cl/v1',
            educacion: '/datasets/educacion-superior',
            matriculas: '/datasets/matriculas-educacion-superior'
        }
    },

    // Configuración de cache
    cache: {
        defaultTTL: 30 * 60 * 1000, // 30 minutos
        maxSize: 100, // máximo 100 entradas en cache
        keys: {
            carreras: 'carreras_data',
            universidades: 'universidades_data',
            puntajes: 'puntajes_corte_data'
        }
    },

    // Configuración de reintentos
    retry: {
        maxAttempts: 3,
        delay: 1000, // 1 segundo
        backoffMultiplier: 2
    },

    // Mapeos para normalizar datos
    mappings: {
        universidades: {
            '001': { id: 'uchile', nombre: 'Universidad de Chile' },
            '002': { id: 'puc', nombre: 'Pontificia Universidad Católica de Chile' },
            '003': { id: 'usach', nombre: 'Universidad de Santiago de Chile' },
            '004': { id: 'udec', nombre: 'Universidad de Concepción' },
            '005': { id: 'uv', nombre: 'Universidad de Valparaíso' },
            '006': { id: 'utfsm', nombre: 'Universidad Técnica Federico Santa María' },
            '007': { id: 'utem', nombre: 'Universidad Tecnológica Metropolitana' },
            '008': { id: 'umce', nombre: 'Universidad Metropolitana de Ciencias de la Educación' }
        },
        
        areas: {
            'Ciencias de la Salud': 'medicina',
            'Ingeniería y Tecnología': 'ingenieria',
            'Ciencias Jurídicas': 'derecho',
            'Administración y Comercio': 'economia',
            'Educación': 'educacion',
            'Ciencias Básicas': 'ciencias',
            'Arte y Arquitectura': 'arte',
            'Ciencias Sociales': 'social'
        }
    }
};

// APIs de universidades específicas (ejemplos)
const UNIVERSITY_APIS = {
    uchile: {
        base: 'https://admision.uchile.cl/api/v1',
        carreras: '/carreras',
        puntajes: '/puntajes-corte',
        vacantes: '/vacantes-disponibles'
    },
    
    puc: {
        base: 'https://admisionpregrado.uc.cl/api/v1',
        carreras: '/carreras',
        requisitos: '/requisitos-admision'
    },
    
    usach: {
        base: 'https://admision.usach.cl/api/v1',
        carreras: '/oferta-academica',
        proceso: '/proceso-admision'
    }
};

// Datos de ejemplo para APIs que no estén disponibles
const MOCK_API_RESPONSES = {
    carreras: {
        data: [
            {
                codigo_carrera: '21030',
                nombre_carrera: 'Medicina',
                codigo_institucion: '001',
                nombre_institucion: 'Universidad de Chile',
                area_conocimiento: 'Ciencias de la Salud',
                puntaje_promedio_último_matriculado: 750.5,
                puntaje_corte: 745.2,
                vacantes_ofrecidas: 115,
                vacantes_disponibles: 12,
                duracion_nominal: 7,
                modalidad: 'Presencial',
                sede_principal: 'Santiago',
                ponderaciones: {
                    competencia_lectora: 30,
                    competencia_matematica: 30,
                    prueba_electiva: 20,
                    nem: 10,
                    ranking: 10
                },
                ultima_actualizacion: new Date().toISOString()
            }
        ],
        metadata: {
            total_registros: 1,
            fecha_actualizacion: new Date().toISOString(),
            fuente: 'DEMRE',
            año_proceso: new Date().getFullYear()
        }
    }
};

// Función para obtener configuración de API según el ambiente
function getAPIConfig(environment = 'production') {
    const configs = {
        development: {
            ...API_CONFIG,
            // Usar APIs de desarrollo o mock
            useMockData: true,
            debugMode: true
        },
        
        production: {
            ...API_CONFIG,
            useMockData: false,
            debugMode: false
        },
        
        testing: {
            ...API_CONFIG,
            useMockData: true,
            debugMode: true,
            cache: { ...API_CONFIG.cache, defaultTTL: 1000 } // Cache corto para testing
        }
    };
    
    return configs[environment] || configs.production;
}

// Detectar automáticamente el ambiente
function detectEnvironment() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'development';
    }
    
    if (window.location.hostname.includes('test') || window.location.hostname.includes('staging')) {
        return 'testing';
    }
    
    return 'production';
}

// Exportar configuración
window.API_CONFIG = getAPIConfig(detectEnvironment());
window.UNIVERSITY_APIS = UNIVERSITY_APIS;
window.MOCK_API_RESPONSES = MOCK_API_RESPONSES;
