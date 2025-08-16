// Script para agregar ponderaciones por defecto a carreras que no las tienen
// Este script se ejecuta una vez para completar la base de datos

const ponderacionesPorArea = {
    medicina: {
        lectora: 25,
        matematica: 20,
        electiva: 25,  // Ciencias
        nem: 15,
        ranking: 15
    },
    ingenieria: {
        lectora: 15,
        matematica: 40,
        electiva: 20,  // Ciencias
        nem: 15,
        ranking: 10
    },
    derecho: {
        lectora: 40,
        matematica: 10,
        electiva: 20,  // Historia
        nem: 15,
        ranking: 15
    },
    social: {
        lectora: 35,
        matematica: 15,
        electiva: 20,  // Historia
        nem: 15,
        ranking: 15
    },
    educacion: {
        lectora: 30,
        matematica: 20,
        electiva: 20,
        nem: 15,
        ranking: 15
    },
    economia: {
        lectora: 25,
        matematica: 30,
        electiva: 15,
        nem: 15,
        ranking: 15
    },
    arte: {
        lectora: 30,
        matematica: 20,
        electiva: 20,
        nem: 15,
        ranking: 15
    },
    ciencias: {
        lectora: 20,
        matematica: 35,
        electiva: 25,  // Ciencias
        nem: 10,
        ranking: 10
    }
};

// Función para completar ponderaciones faltantes
function completarPonderaciones() {
    carreras.forEach(carrera => {
        if (!carrera.ponderaciones) {
            carrera.ponderaciones = ponderacionesPorArea[carrera.area] || {
                lectora: 25,
                matematica: 25,
                electiva: 20,
                nem: 15,
                ranking: 15
            };
        }
    });
    
    console.log('Ponderaciones completadas para todas las carreras');
}

// Ejecutar la función
if (typeof carreras !== 'undefined') {
    completarPonderaciones();
}
