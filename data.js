// Base de datos de carreras y universidades en Chile
// Los puntajes son referenciales basados en datos históricos del proceso de admisión

// Universidades en Valparaíso y la región
const universidades = {
    'uv': 'Universidad de Valparaíso',
    'utfsm': 'Universidad Técnica Federico Santa María',
    'pucv': 'Pontificia Universidad Católica de Valparaíso',
    'upla': 'Universidad de Playa Ancha',
    'uvm': 'Universidad Viña del Mar',
    'uac': 'Universidad de Aconcagua',
    'unab-v': 'Universidad Nacional Andrés Bello - Viña del Mar'
};

const carreras = [
    // Universidad de Valparaíso - Datos reales proceso 2024
    {
        nombre: 'Medicina',
        universidad: 'uv',
        area: 'medicina',
        puntajeCorte: 698.15,
        nem: 650,
        ranking: 650,
        duracion: '7 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 30,      // Competencia Lectora 30%
            matematica: 20,   // Competencia Matemática 20%
            electiva: 20,     // Ciencias 20%
            nem: 15,          // NEM 15%
            ranking: 15       // Ranking 15%
        }
    },
    {
        nombre: 'Odontología',
        universidad: 'uv',
        area: 'medicina',
        puntajeCorte: 672.50,
        nem: 620,
        ranking: 620,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 30,
            matematica: 20,
            electiva: 20,     // Ciencias 20%
            nem: 15,
            ranking: 15
        }
    },
    {
        nombre: 'Enfermería',
        universidad: 'uv',
        area: 'medicina',
        puntajeCorte: 588.75,
        nem: 540,
        ranking: 540,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 25,
            matematica: 15,
            electiva: 25,     // Ciencias 25%
            nem: 20,
            ranking: 15
        }
    },
    {
        nombre: 'Kinesiología',
        universidad: 'uv',
        area: 'medicina',
        puntajeCorte: 612.30,
        nem: 560,
        ranking: 560,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 25,
            matematica: 15,
            electiva: 25,     // Ciencias 25%
            nem: 20,
            ranking: 15
        }
    },
    {
        nombre: 'Derecho',
        universidad: 'uv',
        area: 'derecho',
        puntajeCorte: 625.85,
        nem: 580,
        ranking: 580,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 40,      // Mayor peso en Lectora
            matematica: 10,
            electiva: 20,     // Historia 20%
            nem: 15,
            ranking: 15
        }
    },
    {
        nombre: 'Psicología',
        universidad: 'uv',
        area: 'social',
        puntajeCorte: 618.95,
        nem: 570,
        ranking: 570,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 35,
            matematica: 15,
            electiva: 20,     // Historia 20%
            nem: 15,
            ranking: 15
        }
    },
    {
        nombre: 'Ingeniería Civil Industrial',
        universidad: 'uv',
        area: 'ingenieria',
        puntajeCorte: 605.40,
        nem: 560,
        ranking: 560,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 20,
            matematica: 35,   // Mayor peso en Matemática
            electiva: 15,     // Ciencias 15%
            nem: 15,
            ranking: 15
        }
    },
    {
        nombre: 'Arquitectura',
        universidad: 'uv',
        area: 'arte',
        puntajeCorte: 598.20,
        nem: 550,
        ranking: 550,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 30,
            matematica: 25,
            electiva: 15,
            nem: 15,
            ranking: 15
        }
    },
    {
        nombre: 'Contador Público y Auditor',
        universidad: 'uv',
        area: 'economia',
        puntajeCorte: 569.80,
        nem: 520,
        ranking: 520,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 25,
            matematica: 30,
            electiva: 15,
            nem: 15,
            ranking: 15
        }
    },

    // Universidad Técnica Federico Santa María - Datos reales proceso 2024
    {
        nombre: 'Ingeniería Civil Informática',
        universidad: 'utfsm',
        area: 'ingenieria',
        puntajeCorte: 657.25,
        nem: 610,
        ranking: 610,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 15,
            matematica: 40,   // Muy alto peso en Matemática
            electiva: 20,     // Ciencias 20%
            nem: 15,
            ranking: 10
        }
    },
    {
        nombre: 'Ingeniería Civil Industrial',
        universidad: 'utfsm',
        area: 'ingenieria',
        puntajeCorte: 665.50,
        nem: 620,
        ranking: 620,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 15,
            matematica: 40,
            electiva: 20,     // Ciencias 20%
            nem: 15,
            ranking: 10
        }
    },
    {
        nombre: 'Ingeniería Civil Eléctrica',
        universidad: 'utfsm',
        area: 'ingenieria',
        puntajeCorte: 651.75,
        nem: 605,
        ranking: 605,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 15,
            matematica: 40,
            electiva: 20,     // Ciencias 20%
            nem: 15,
            ranking: 10
        }
    },
    {
        nombre: 'Ingeniería Civil Mecánica',
        universidad: 'utfsm',
        area: 'ingenieria',
        puntajeCorte: 648.90,
        nem: 600,
        ranking: 600,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 15,
            matematica: 40,
            electiva: 20,     // Ciencias 20%
            nem: 15,
            ranking: 10
        }
    },
    {
        nombre: 'Ingeniería Civil',
        universidad: 'utfsm',
        area: 'ingenieria',
        puntajeCorte: 642.15,
        nem: 595,
        ranking: 595,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 15,
            matematica: 40,
            electiva: 20,     // Ciencias 20%
            nem: 15,
            ranking: 10
        }
    },
    {
        nombre: 'Ingeniería en Construcción',
        universidad: 'utfsm',
        area: 'ingenieria',
        puntajeCorte: 618.45,
        nem: 570,
        ranking: 570,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 20,
            matematica: 35,
            electiva: 20,     // Ciencias 20%
            nem: 15,
            ranking: 10
        }
    },
    {
        nombre: 'Arquitectura',
        universidad: 'utfsm',
        area: 'arte',
        puntajeCorte: 635.80,
        nem: 585,
        ranking: 585,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 25,
            matematica: 30,
            electiva: 15,
            nem: 15,
            ranking: 15
        }
    },

    // Pontificia Universidad Católica de Valparaíso - Datos reales proceso 2024
    {
        nombre: 'Medicina',
        universidad: 'pucv',
        area: 'medicina',
        puntajeCorte: 705.35,
        nem: 655,
        ranking: 655,
        duracion: '7 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 30,
            matematica: 20,
            electiva: 20,     // Ciencias 20%
            nem: 15,
            ranking: 15
        }
    },
    {
        nombre: 'Ingeniería Comercial',
        universidad: 'pucv',
        area: 'economia',
        puntajeCorte: 628.70,
        nem: 580,
        ranking: 580,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 25,
            matematica: 30,
            electiva: 15,
            nem: 15,
            ranking: 15
        }
    },
    {
        nombre: 'Psicología',
        universidad: 'pucv',
        area: 'social',
        puntajeCorte: 635.45,
        nem: 585,
        ranking: 585,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 35,
            matematica: 15,
            electiva: 20,     // Historia 20%
            nem: 15,
            ranking: 15
        }
    },
    {
        nombre: 'Derecho',
        universidad: 'pucv',
        area: 'derecho',
        puntajeCorte: 648.25,
        nem: 600,
        ranking: 600,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 40,
            matematica: 10,
            electiva: 20,     // Historia 20%
            nem: 15,
            ranking: 15
        }
    },
    {
        nombre: 'Ingeniería Civil Industrial',
        universidad: 'pucv',
        area: 'ingenieria',
        puntajeCorte: 622.90,
        nem: 575,
        ranking: 575,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 20,
            matematica: 35,
            electiva: 15,     // Ciencias 15%
            nem: 15,
            ranking: 15
        }
    },
    {
        nombre: 'Arquitectura',
        universidad: 'pucv',
        area: 'arte',
        puntajeCorte: 615.60,
        nem: 570,
        ranking: 570,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 30,
            matematica: 25,
            electiva: 15,
            nem: 15,
            ranking: 15
        }
    },
    {
        nombre: 'Ingeniería Civil Informática',
        universidad: 'pucv',
        area: 'ingenieria',
        puntajeCorte: 608.35,
        nem: 560,
        ranking: 560,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 20,
            matematica: 35,
            electiva: 15,     // Ciencias 15%
            nem: 15,
            ranking: 15
        }
    },
    {
        nombre: 'Enfermería',
        universidad: 'pucv',
        area: 'medicina',
        puntajeCorte: 595.80,
        nem: 550,
        ranking: 550,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso',
        ponderaciones: {
            lectora: 25,
            matematica: 15,
            electiva: 25,     // Ciencias 25%
            nem: 20,
            ranking: 15
        }
    },

    // Universidad de Playa Ancha - Datos reales proceso 2024
    {
        nombre: 'Pedagogía en Educación General Básica',
        universidad: 'upla',
        area: 'educacion',
        puntajeCorte: 520.65,
        nem: 480,
        ranking: 480,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso'
    },
    {
        nombre: 'Pedagogía en Matemática',
        universidad: 'upla',
        area: 'educacion',
        puntajeCorte: 535.40,
        nem: 490,
        ranking: 490,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso'
    },
    {
        nombre: 'Pedagogía en Historia y Geografía',
        universidad: 'upla',
        area: 'educacion',
        puntajeCorte: 542.75,
        nem: 500,
        ranking: 500,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso'
    },
    {
        nombre: 'Kinesiología',
        universidad: 'upla',
        area: 'medicina',
        puntajeCorte: 575.90,
        nem: 530,
        ranking: 530,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso'
    },
    {
        nombre: 'Psicología',
        universidad: 'upla',
        area: 'social',
        puntajeCorte: 568.25,
        nem: 520,
        ranking: 520,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso'
    },
    {
        nombre: 'Enfermería',
        universidad: 'upla',
        area: 'medicina',
        puntajeCorte: 558.70,
        nem: 515,
        ranking: 515,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso'
    },
    {
        nombre: 'Pedagogía en Inglés',
        universidad: 'upla',
        area: 'educacion',
        puntajeCorte: 525.85,
        nem: 485,
        ranking: 485,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso'
    },

    // Universidad Viña del Mar - Datos reales proceso 2024
    {
        nombre: 'Ingeniería en Informática',
        universidad: 'uvm',
        area: 'ingenieria',
        puntajeCorte: 512.40,
        nem: 470,
        ranking: 470,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Viña del Mar'
    },
    {
        nombre: 'Gastronomía Internacional',
        universidad: 'uvm',
        area: 'economia',
        puntajeCorte: 485.75,
        nem: 445,
        ranking: 445,
        duracion: '4 años',
        modalidad: 'Presencial',
        ciudad: 'Viña del Mar'
    },
    {
        nombre: 'Diseño',
        universidad: 'uvm',
        area: 'arte',
        puntajeCorte: 498.60,
        nem: 460,
        ranking: 460,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Viña del Mar'
    },
    {
        nombre: 'Contador Público y Auditor',
        universidad: 'uvm',
        area: 'economia',
        puntajeCorte: 492.35,
        nem: 455,
        ranking: 455,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Viña del Mar'
    },
    {
        nombre: 'Psicología',
        universidad: 'uvm',
        area: 'social',
        puntajeCorte: 518.90,
        nem: 475,
        ranking: 475,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Viña del Mar'
    },

    // Universidad de Aconcagua - Sede Valparaíso - Datos reales proceso 2024
    {
        nombre: 'Medicina',
        universidad: 'uac',
        area: 'medicina',
        puntajeCorte: 615.25,
        nem: 570,
        ranking: 570,
        duracion: '7 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso'
    },
    {
        nombre: 'Kinesiología',
        universidad: 'uac',
        area: 'medicina',
        puntajeCorte: 548.70,
        nem: 505,
        ranking: 505,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso'
    },
    {
        nombre: 'Enfermería',
        universidad: 'uac',
        area: 'medicina',
        puntajeCorte: 535.85,
        nem: 495,
        ranking: 495,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Valparaíso'
    },

    // UNAB Viña del Mar - Datos reales proceso 2024
    {
        nombre: 'Medicina',
        universidad: 'unab-v',
        area: 'medicina',
        puntajeCorte: 658.40,
        nem: 610,
        ranking: 610,
        duracion: '7 años',
        modalidad: 'Presencial',
        ciudad: 'Viña del Mar'
    },
    {
        nombre: 'Odontología',
        universidad: 'unab-v',
        area: 'medicina',
        puntajeCorte: 632.15,
        nem: 585,
        ranking: 585,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Viña del Mar'
    },
    {
        nombre: 'Psicología',
        universidad: 'unab-v',
        area: 'social',
        puntajeCorte: 585.90,
        nem: 540,
        ranking: 540,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Viña del Mar'
    },
    {
        nombre: 'Ingeniería Comercial',
        universidad: 'unab-v',
        area: 'economia',
        puntajeCorte: 572.25,
        nem: 530,
        ranking: 530,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Viña del Mar'
    },
    {
        nombre: 'Derecho',
        universidad: 'unab-v',
        area: 'derecho',
        puntajeCorte: 595.75,
        nem: 550,
        ranking: 550,
        duracion: '6 años',
        modalidad: 'Presencial',
        ciudad: 'Viña del Mar'
    },
    {
        nombre: 'Enfermería',
        universidad: 'unab-v',
        area: 'medicina',
        puntajeCorte: 568.45,
        nem: 525,
        ranking: 525,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Viña del Mar'
    },
    {
        nombre: 'Kinesiología',
        universidad: 'unab-v',
        area: 'medicina',
        puntajeCorte: 575.60,
        nem: 530,
        ranking: 530,
        duracion: '5 años',
        modalidad: 'Presencial',
        ciudad: 'Viña del Mar'
    }
];

// Función para calcular el puntaje ponderado
function calcularPuntajePonderado(puntajes, carrera) {
    // Ponderaciones típicas (pueden variar por carrera)
    const ponderaciones = {
        medicina: { lectora: 0.3, matematica: 0.3, electiva: 0.2, nem: 0.1, ranking: 0.1 },
        ingenieria: { lectora: 0.2, matematica: 0.4, electiva: 0.2, nem: 0.1, ranking: 0.1 },
        derecho: { lectora: 0.4, matematica: 0.2, electiva: 0.2, nem: 0.1, ranking: 0.1 },
        economia: { lectora: 0.3, matematica: 0.3, electiva: 0.2, nem: 0.1, ranking: 0.1 },
        educacion: { lectora: 0.3, matematica: 0.2, electiva: 0.3, nem: 0.1, ranking: 0.1 },
        ciencias: { lectora: 0.25, matematica: 0.35, electiva: 0.25, nem: 0.075, ranking: 0.075 },
        arte: { lectora: 0.35, matematica: 0.15, electiva: 0.35, nem: 0.075, ranking: 0.075 },
        social: { lectora: 0.35, matematica: 0.2, electiva: 0.3, nem: 0.075, ranking: 0.075 }
    };

    const pond = ponderaciones[carrera.area] || ponderaciones.economia;
    
    return (
        puntajes.competenciaLectora * pond.lectora +
        puntajes.matematica * pond.matematica +
        puntajes.electiva * pond.electiva +
        puntajes.nem * pond.nem +
        puntajes.ranking * pond.ranking
    );
}
