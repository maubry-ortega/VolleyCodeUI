# VolleyCodeUI - Generador de Interfaces desde Texto

¡Bienvenido a VolleyCodeUI! Un proyecto innovador que transforma una sintaxis de texto simple en interfaces de usuario dinámicas y funcionales utilizando React, TypeScript y Vite. Inspirado en la simplicidad y el poder de la abstracción.

## 📜 Descripción General

VolleyCodeUI te permite definir la estructura y los componentes básicos de una interfaz de usuario mediante una notación de pseudocódigo intuitiva. El sistema parsea este texto, lo convierte en un Árbol de Sintaxis Abstracto (AST) y finalmente renderiza componentes React correspondientes.

Esto facilita la creación rápida de prototipos, la generación de UIs dinámicas y explora un enfoque novedoso para el desarrollo de interfaces.

## 🧩 ¿Cómo funciona?

El proceso es simple pero poderoso, siguiendo la filosofía de "descubrir sentido en la simplicidad":

1.  **Definición con Pseudocódigo**: Escribes la estructura de tu UI usando una sintaxis que define el tipo de elemento, seguido opcionalmente por un texto principal entre comillas y luego pares de `atributo=valor`. Por ejemplo:

    ```plaintext
    Container width=80%
        Title "Bienvenido a VolleyCodeUI"
        Text "Esta es una interfaz generada dinámicamente desde texto."
        Button "Empezar Aventura" color=blue id=startButton
    ```

2.  **Parseo Inteligente**: El parser (`src/lib/parser.ts`) analiza este texto. Identifica los diferentes elementos, su texto principal (si aplica), sus atributos (como `color`, `width`, `height`, etc.) y su anidamiento. Cada línea se procesa para extraer la información relevante.

3.  **Generación de Componentes**: El renderizador (`src/lib/renderer.tsx`) toma la estructura parseada (el AST) y la transforma en componentes React reales. Cada tipo de elemento en el pseudocódigo tiene un componente React correspondiente en `src/components/`.

4.  **Renderizado en React**: La aplicación principal (`src/App.tsx`) utiliza estas funciones para mostrar la interfaz generada, permitiendo una visualización y prueba instantánea.

## ✨ Características Clave

*   **Sintaxis Simple y Estructurada**: Define UIs complejas con una notación fácil de aprender y leer: `Elemento "Texto principal opcional" atributo1=valor1 atributo2="valor con espacios" ...`. La indentación se usa para indicar anidamiento dentro de los `Container`.
*   **Componentes Soportados**:
    *   `Container`: Agrupa otros elementos. Puede contener otros `Container` para estructuras más complejas.
        *   Atributos Soportados:
            *   `width`: Define el ancho del contenedor (e.g., `width=500px`, `width=75%`, `width=100vw`).
            *   `height`: Define la altura del contenedor (e.g., `height=300px`, `height=auto`, `height=50vh`).
            *   Ejemplo: `Container width=300px height=auto`
    *   `Title "Texto del título"`: Para mostrar títulos o encabezados. El texto principal va entre comillas.
        *   Ejemplo: `Title "Encabezado Principal"`
    *   `Text "Párrafo de texto"`: Para párrafos de texto o descripciones. El texto principal va entre comillas.
        *   Ejemplo: `Text "Este es un párrafo descriptivo."`
    *   `Button "Texto del botón" atributo=valor`: Para botones interactivos. El texto principal del botón va entre comillas.
        *   Atributos Soportados:
            *   `color`: Define el color del botón. Acepta:
                *   Nombres de colores predefinidos: `blue` (defecto), `red`, `green`, `yellow`, `gray`.
                    *   Ejemplo: `Button "Confirmar" color=green`
                *   Valores hexadecimales: `#RRGGBB` o `#RGB`.
                    *   Ejemplo: `Button "Rojo Hex" color=#FF0000`
                *   Valores RGB: `rgb(R,G,B)`.
                    *   Ejemplo: `Button "Verde RGB" color=rgb(76,175,80)`
                *   Valores RGBA: `rgba(R,G,B,A)`.
                    *   Ejemplo: `Button "Azul RGBA Transparente" color=rgba(0,0,255,0.7)`
            *   Otros atributos como `id` también pueden ser añadidos y serán almacenados, aunque no todos tengan un efecto visual directo sin modificaciones en el renderer.
                *   Ejemplo: `Button "Click Me" color=blue id=myButton`
*   **Extensible**: Fácil de añadir nuevos tipos de elementos, atributos y componentes.
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
