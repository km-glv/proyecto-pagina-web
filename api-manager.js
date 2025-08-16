// API Manager, Manejo de conexiones con APIs externas
class APIManager {
    constructor() {
        this.baseUrls = {
            demre: 'https://api.demre.cl/v1', // URL hipotética
            mineduc: 'https://api.mineduc.cl/v1', // URL hipotética
            universidades: 'https://api.universidades.cl/v1' // URL hipotética, no me lo se
        };
        this.cache = new Map();
        this.cacheTimeout = 30 * 60 * 1000; // 30 minutos
    }

    // Método de peticiones HTTP
    async makeRequest(url, options = {}) {
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            timeout: 5000, // 5 segundos timeout
            ...options
        };

        try {
            const response = await Promise.race([
                fetch(url, defaultOptions),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Timeout')), defaultOptions.timeout)
                )
            ]);
            
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.warn('Error en petición API:', error.message);
            throw error;
        }
    }

    // Cache simple para evitar peticiones repetidas
    getCached(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }
        return null;
    }

    setCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    // Obtener carreras desde API del DEMRE
    async obtenerCarrerasDEMRE(año = new Date().getFullYear()) {
        const cacheKey = `demre_carreras_${año}`;
        const cached = this.getCached(cacheKey);
        
        if (cached) {
            return cached;
        }

        try {
            const url = `${this.baseUrls.demre}/carreras?año=${año}`;
            const data = await this.makeRequest(url);
            
            // Transformar datos al formato interno
            const carrerasFormateadas = this.transformarDatosDEMRE(data);
            
            this.setCache(cacheKey, carrerasFormateadas);
            return carrerasFormateadas;
        } catch (error) {
            console.warn('Error obteniendo datos del DEMRE, usando datos locales:', error);
            return null;
        }
    }

    // Obtener información de universidades
    async obtenerUniversidades() {
        const cacheKey = 'universidades';
        const cached = this.getCached(cacheKey);
        
        if (cached) {
            return cached;
        }

        try {
            const url = `${this.baseUrls.universidades}/instituciones`;
            const data = await this.makeRequest(url);
            
            this.setCache(cacheKey, data);
            return data;
        } catch (error) {
            console.warn('Error obteniendo universidades, usando datos locales:', error);
            return null;
        }
    }

    // Obtener vacantes en tiempo real
    async obtenerVacantesActualizadas(codigoCarrera) {
        try {
            const url = `${this.baseUrls.demre}/vacantes/${codigoCarrera}`;
            const data = await this.makeRequest(url);
            return data;
        } catch (error) {
            console.warn('Error obteniendo vacantes actualizadas:', error);
            return null;
        }
    }

    // Transformar datos del DEMRE al formato interno
    transformarDatosDEMRE(datosAPI) {
        return datosAPI.carreras?.map(carrera => ({
            nombre: carrera.nombre_carrera,
            universidad: this.mapearUniversidad(carrera.codigo_institucion),
            area: this.mapearArea(carrera.area_conocimiento),
            puntajeCorte: carrera.puntaje_corte_último_matriculado,
            nem: carrera.puntaje_nem_ponderado,
            ranking: carrera.puntaje_ranking_ponderado,
            vacantes: carrera.vacantes_ofrecidas,
            duracion: carrera.duracion_nominal,
            modalidad: carrera.modalidad,
            ciudad: carrera.sede_principal,
            codigo: carrera.codigo_carrera,
            ponderaciones: {
                lectora: carrera.pond_competencia_lectora / 100,
                matematica: carrera.pond_competencia_matematica / 100,
                electiva: carrera.pond_prueba_electiva / 100,
                nem: carrera.pond_nem / 100,
                ranking: carrera.pond_ranking / 100
            }
        })) || [];
    }

    // Mapear códigos de universidad a nuestros identificadores
    mapearUniversidad(codigoInstitucion) {
        const mapeo = {
            '001': 'uchile',
            '002': 'puc',
            '003': 'usach',
            '004': 'udec',
            '005': 'uv',
            '006': 'utfsm',
            // Agregar más mapeos según sea necesario
        };
        return mapeo[codigoInstitucion] || 'otra';
    }

    // Mapear áreas de conocimiento
    mapearArea(areaAPI) {
        const mapeo = {
            'Ciencias de la Salud': 'medicina',
            'Ingeniería': 'ingenieria',
            'Derecho': 'derecho',
            'Administración y Comercio': 'economia',
            'Educación': 'educacion',
            'Ciencias Básicas': 'ciencias',
            'Arte y Arquitectura': 'arte',
            'Ciencias Sociales': 'social'
        };
        return mapeo[areaAPI] || 'otra';
    }

    // Método para APIs de universidades específicas
    async obtenerDatosUniversidadEspecifica(universidadId) {
        const urls = {
            'uchile': 'https://api.uchile.cl/carreras',
            'puc': 'https://api.uc.cl/admision/carreras',
            'usach': 'https://api.usach.cl/carreras'
            // Agregar más URLs según disponibilidad
        };

        const url = urls[universidadId];
        if (!url) {
            return null;
        }

        try {
            return await this.makeRequest(url);
        } catch (error) {
            console.warn(`Error obteniendo datos de ${universidadId}:`, error);
            return null;
        }
    }

    // Obtener datos del Ministerio de Educación
    async obtenerDatosMineduc() {
        try {
            const url = `${this.baseUrls.mineduc}/instituciones-educacion-superior`;
            return await this.makeRequest(url);
        } catch (error) {
            console.warn('Error obteniendo datos del Mineduc:', error);
            return null;
        }
    }

    // Verificar estado de las APIs
    async verificarEstadoAPIs() {
        const estado = {
            demre: false,
            mineduc: false,
            universidades: false
        };

        // Para desarrollo, simular que las APIs no están disponibles
        // En producción, aquí harías las verificaciones reales
        console.log('🔍 Verificando estado de APIs...');
        
        // Simular verificación rápida sin hacer peticiones reales
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('APIs oficiales no configuradas - usando datos locales');
                resolve(estado);
            }, 500);
        });
    }
}

// Simulador de API para desarrollo/testing
class APISimulator {
    constructor() {
        this.simulatedData = {
            carreras: [
                {
                    codigo_carrera: '001001',
                    nombre_carrera: 'Medicina',
                    codigo_institucion: '001',
                    area_conocimiento: 'Ciencias de la Salud',
                    puntaje_corte_último_matriculado: 750,
                    puntaje_nem_ponderado: 700,
                    puntaje_ranking_ponderado: 700,
                    vacantes_ofrecidas: 115,
                    duracion_nominal: '7 años',
                    modalidad: 'Presencial',
                    sede_principal: 'Santiago',
                    pond_competencia_lectora: 30,
                    pond_competencia_matematica: 30,
                    pond_prueba_electiva: 20,
                    pond_nem: 10,
                    pond_ranking: 10
                }
                // Más datos simulados...
            ]
        };
    }

    async obtenerCarreras() {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.simulatedData;
    }
}

// Exportar para uso en otros archivos
window.APIManager = APIManager;
window.APISimulator = APISimulator;
