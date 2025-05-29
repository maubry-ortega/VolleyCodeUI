# VolleyCodeUI - Generador de Interfaces desde Texto

¡Bienvenido a VolleyCodeUI! Un proyecto innovador que transforma una sintaxis de texto simple en interfaces de usuario dinámicas y funcionales utilizando React, TypeScript y Vite. Inspirado en la simplicidad y el poder de la abstracción.

## 📜 Descripción General

VolleyCodeUI te permite definir la estructura y los componentes básicos de una interfaz de usuario mediante una notación de pseudocódigo intuitiva. El sistema parsea este texto, lo convierte en un Árbol de Sintaxis Abstracto (AST) y finalmente renderiza componentes React correspondientes.

Esto facilita la creación rápida de prototipos, la generación de UIs dinámicas y explora un enfoque novedoso para el desarrollo de interfaces.

## 🧩 ¿Cómo funciona?

El proceso es simple pero poderoso, siguiendo la filosofía de "descubrir sentido en la simplicidad":

1.  **Definición con Pseudocódigo**: Escribes la estructura de tu UI usando una sintaxis especial. Por ejemplo:

    ```plaintext
    [Container]
        [Title] Bienvenido
        [Text] Esta es una interfaz generada por texto
        [Button primary] Empezar
    ```

2.  **Parseo Inteligente**: El parser (`src/lib/parser.ts`) analiza este texto. Identifica los diferentes elementos, sus propiedades y su anidamiento. Cada línea se procesa para extraer la información relevante.

3.  **Generación de Componentes**: El renderizador (`src/lib/renderer.tsx`) toma la estructura parseada (el AST) y la transforma en componentes React reales. Cada tipo de elemento en el pseudocódigo tiene un componente React correspondiente en `src/components/`.

4.  **Renderizado en React**: La aplicación principal (`src/App.tsx`) utiliza estas funciones para mostrar la interfaz generada, permitiendo una visualización y prueba instantánea.

## ✨ Características Clave

*   **Sintaxis Simple y Estructurada**: Define UIs complejas con una notación fácil de aprender y leer. La indentación se usa para indicar anidamiento dentro de los contenedores.
*   **Componentes Soportados**:
    *   `[Container]`: Agrupa otros elementos. Puede contener otros `Container` para estructuras más complejas.
    *   `[Title]`: Para mostrar títulos o encabezados.
    *   `[Text]`: Para párrafos de texto o descripciones.
    *   `[Button "Texto del botón" color=valor]`: Para botones interactivos.
        *   El texto del botón va entre comillas.
        *   El `color` es opcional y puede ser `blue` (defecto), `red`, `green`, `yellow`, o `gray`. Por ejemplo: `[Button "Aceptar" color=green]`.
        *   También se soporta una sintaxis simplificada para colores primarios o por defecto: `[Button primary] Texto Botón` o `[Button] Texto Botón`.
*   **Extensible**: Fácil de añadir nuevos tipos de elementos y componentes.
*   **Desarrollo Rápido**: Ideal para prototipado y generación dinámica de interfaces.
*   **Basado en Tecnologías Modernas**: Construido con React, TypeScript, Vite y TailwindCSS.

## 🚀 Empezando

1.  Clona el repositorio.
2.  Instala las dependencias: `pnpm install` (o `npm install` / `yarn install`).
3.  Inicia el servidor de desarrollo: `pnpm dev` (o `npm run dev` / `yarn dev`).

Abre tu navegador en la dirección indicada y comienza a experimentar cambiando el texto en el área designada.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si tienes ideas para mejorar VolleyCodeUI, nuevas características o encuentras algún error, por favor abre un issue o envía un pull request.

---
*Un proyecto de Maubry para explorar nuevas fronteras en la creación de UIs.*
