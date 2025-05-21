# Proyecto de Testing con Playwright

## 📁 Estructura Base del Proyecto

```
src
├── common               # Componentes base (fixtures, helpers)
│   └── fixture-base.ts  # Configuración de pruebas reutilizable
├── pages                # Implementación del patrón Page Object Model (POM)
├── services-external    # Integración con servicios externos (e.g. yopmail)
├── setup
│   ├── sessions         # Sesiones guardadas para evitar login repetitivo
│   └── login-setup.ts   # Script de login para generar estados de sesión
├── tests
│   └── auth             # Pruebas organizadas por tipo (E2E, API, UI)
│       ├── E2E
│       ├── API
│       └── UI
├── utils                # Funciones utilitarias reutilizables

```

## 🧱 Patrón de Diseño: Page Object Model (POM)

El patrón **POM** permite encapsular los elementos y acciones de una página web en clases reutilizables.

Cada clase de página debe contener:

-   **Localizadores de elementos**: Atributos que representan los selectores.
    
-   **Métodos de acción**: Encapsulan flujos de usuario o acciones sobre la UI.
    

Esto permite:

✅ Mejor legibilidad del código de pruebas  
♻️ Reutilización de lógica en múltiples pruebas  
🧪 Separación clara entre pruebas y lógica de UI

## 🧪 Comandos Disponibles

| Comando            | Descripción                                                                 |
|--------------------|------------------------------------------------------------------------------|
| `npm test`         | Ejecuta todas las pruebas en los navegadores configurados                   |
| `npm run codegen`  | Inicia la herramienta de generación automática de código (Playwright Codegen) |
| `npm run report`   | Abre el reporte HTML de las pruebas ejecutadas anteriormente                |            |
| `npm run ui`       | Abre el modo UI de Playwright para ejecución visual y depuración            |


## 🧩 Extensión Recomendadada para VSCode

**Playwright Test for VSCode**  
Extensión oficial que ofrece integración completa con el entorno de desarrollo, permitiendo:

-   Ejecución de pruebas con un clic
    
-   Debug visual de los tests
    
-   Navegación entre fixtures, páginas y pruebas con facilidad