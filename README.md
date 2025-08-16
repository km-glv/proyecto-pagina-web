# 🎓 Simulador FUAS Valparaíso - Encuentra tu Carrera

Una aplicación web interactiva especializada en universidades de la región de Valparaíso, que permite a estudiantes chilenos descubrir qué carreras universitarias pueden estudiar según sus puntajes del Sistema de Acceso a la Educación Superior (FUAS).

## 🏛️ Universidades Incluidas

### Universidades Estatales
- **Universidad de Valparaíso (UV)** - Valparaíso
- **Universidad Técnica Federico Santa María (UTFSM)** - Valparaíso  
- **Universidad de Playa Ancha (UPLA)** - Valparaíso

### Universidades Privadas
- **Pontificia Universidad Católica de Valparaíso (PUCV)** - Valparaíso
- **Universidad Viña del Mar (UVM)** - Viña del Mar
- **Universidad de Aconcagua (UAC)** - Valparaíso
- **Universidad Nacional Andrés Bello (UNAB)** - Viña del Mar

## 📋 Características

- **Calculadora de Puntajes**: Ingresa tus puntajes de las pruebas FUAS, NEM y Ranking
- **🏛️ Enfoque Regional**: Especializado en universidades de Valparaíso
- **Base de Datos Curada**: Información actualizada de 35+ carreras en la región
- **Filtros Avanzados**: Filtra por área académica y universidad
- **Indicadores de Seguridad**: Muestra qué tan seguro es tu puntaje para cada carrera
- **Interfaz Responsiva**: Funciona perfectamente en móviles y escritorio
- **Guardado Automático**: Conserva tus puntajes entre sesiones
- **📊 Exportación**: Exporta resultados en formato JSON

## 🚀 Cómo usar

1. **Abre el archivo `index.html`** en tu navegador web
2. **Completa el formulario** con tus puntajes:
   - Competencia Lectora (150-850)
   - Competencia Matemática M1 o M2 (150-850)
   - Prueba Electiva: Historia o Ciencias (150-850)
   - NEM - Notas de Enseñanza Media (150-850)
   - Ranking de Egreso (150-850)
3. **Haz clic en "Buscar Carreras"**
4. **Explora los resultados** y usa los filtros para refinar tu búsqueda

## 📊 Información de Puntajes

### Componentes del FUAS:
- **Competencia Lectora**: Evalúa comprensión lectora y vocabulario
- **Competencia Matemática M1/M2**: 
  - M1: Matemática básica (1° y 2° medio)
  - M2: Matemática avanzada (3° y 4° medio)
- **Pruebas Electivas**:
  - Historia y Ciencias Sociales
  - Ciencias (Biología, Física, Química)

### Factores Adicionales:
- **NEM**: Promedio de notas de 1° a 4° medio
- **Ranking**: Posición relativa en tu generación

## 🎯 Indicadores de Seguridad

- 🟢 **Seguro** (+30 pts): Alta probabilidad de ingreso
- 🟡 **Ajustado** (+10 a +29 pts): Probabilidad moderada
- 🔴 **Riesgoso** (0 a +9 pts): Baja probabilidad, considera opciones alternativas

## 🏗️ Estructura del Proyecto

```
simulador-fuas-valparaiso/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── script-simple.js        # Lógica principal de la aplicación
├── data.js                 # Base de datos de carreras de Valparaíso
└── README.md               # Documentación
```

## � Áreas Académicas en Valparaíso

- 🏥 **Medicina y Salud**: Medicina, Enfermería, Kinesiología, Odontología
- ⚙️ **Ingeniería**: Civil Industrial, Informática, Eléctrica, Mecánica, Construcción
- ⚖️ **Derecho**: Derecho en universidades estatales y privadas
- 💼 **Economía y Negocios**: Ingeniería Comercial, Contador Auditor, Gastronomía
- 🎓 **Educación**: Pedagogías en diferentes especialidades
- 🎨 **Arte y Diseño**: Arquitectura, Diseño
- 👥 **Ciencias Sociales**: Psicología

## ⚠️ Importante

- Los puntajes de corte son **referenciales** y basados en procesos anteriores
- Pueden variar cada año según la demanda y otros factores
- **Siempre consulta fuentes oficiales** como el DEMRE y las universidades
- Esta herramienta es orientativa y no garantiza el ingreso
- **Enfoque regional**: Especializado en universidades de Valparaíso

## 🔧 Personalización

### Agregar nuevas carreras
Edita el archivo `data.js` y agrega nuevos objetos al array `carreras`:

```javascript
{
    nombre: 'Nueva Carrera',
    universidad: 'codigo_universidad',
    area: 'area_academica',
    puntajeCorte: 600,
    nem: 550,
    ranking: 550,
    vacantes: 50,
    duracion: '5 años',
    modalidad: 'Presencial',
    ciudad: 'Santiago'
}
```

### Agregar nuevas universidades
Agrega la universidad al objeto `universidades` en `data.js`:

```javascript
'codigo_univ': 'Nombre Completo de la Universidad'
```

## 🚀 Mejoras Futuras

- [x] Integración con APIs oficiales del DEMRE
- [x] Sistema de cache inteligente
- [x] Indicadores de estado de conexión
- [ ] Exportación de resultados a PDF
- [ ] Comparador de carreras
- [ ] Histórico de puntajes de corte
- [ ] Calculadora de beneficios estudiantiles
- [ ] Información de aranceles desde APIs
- [ ] Perfil de egresados
- [ ] Mapa de sedes universitarias
- [ ] Notificaciones push para cambios en vacantes
- [ ] Sistema de alertas personalizadas

## 📱 Compatibilidad

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Dispositivos móviles

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Para consultas o sugerencias, puedes contactar al desarrollador.

---

**Nota**: Esta aplicación es un proyecto educativo y no está afiliada oficialmente con el DEMRE o las universidades mencionadas.
