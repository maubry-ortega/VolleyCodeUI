# VolleyCodeUI - Generador de Interfaces desde Texto

¡Bienvenido a VolleyCodeUI! Un proyecto innovador que transforma una sintaxis de texto simple en interfaces de usuario dinámicas y funcionales utilizando React, TypeScript y Vite. Inspirado en la simplicidad y el poder de la abstracción.

## 📜 Descripción General

VolleyCodeUI te permite definir la estructura y los componentes básicos de una interfaz de usuario mediante una notación de pseudocódigo intuitiva. El sistema parsea este texto, lo convierte en un Árbol de Sintaxis Abstracto (AST) y finalmente renderiza componentes React correspondientes.

Esto facilita la creación rápida de prototipos, la generación de UIs dinámicas y explora un enfoque novedoso para el desarrollo de interfaces.

## 🧩 ¿Cómo funciona?

El proceso es simple pero poderoso, siguiendo la filosofía de "descubrir sentido en la simplicidad":

1.  **Definición con Pseudocódigo**: Escribes la estructura de tu UI usando una sintaxis que define el tipo de elemento, seguido opcionalmente por un texto principal entre comillas y luego pares de `atributo=valor`. Por ejemplo:

    ```plaintext
    Container width="90%" margin="0 auto" padding=6 bgColor=white rounded=lg shadow=md
        Title "Bienvenido a VolleyCodeUI" align=center textColor=blue-700
        Text "Explora los componentes y sus capacidades de estilo." align=center textColor=gray-600 margin="0 0 4 0"
        
        Input placeholder="Escribe algo aquí..." width="50%" margin="0 auto 4 auto" padding=3 rounded=md
        
        Container align=center
            Button "¡Comenzar!" color=green shadow=md rounded=lg textColor=white
            Button "Más Info" color=gray margin="0 0 0 2"
    ```

2.  **Parseo Inteligente**: El parser (`src/lib/parser.ts`) analiza este texto. Identifica los diferentes elementos, su texto principal (si aplica), sus atributos (incluyendo atributos de estilo generales y específicos del componente) y su anidamiento. Cada línea se procesa para extraer la información relevante.

3.  **Generación de Componentes**: El renderizador (`src/lib/renderer.tsx`) toma la estructura parseada (el AST) y la transforma en componentes React reales. Cada tipo de elemento en el pseudocódigo tiene un componente React correspondiente en `src/components/`.

4.  **Renderizado en React**: La aplicación principal (`src/App.tsx`) utiliza estas funciones para mostrar la interfaz generada, permitiendo una visualización y prueba instantánea.

## ✨ Características Clave

*   **Sintaxis Simple y Estructurada**: Define UIs complejas con una notación fácil de aprender y leer: `Elemento "Texto principal opcional" atributo1=valor1 atributo2="valor con espacios" ...`. La indentación se usa para indicar anidamiento dentro de los elementos contenedores como `Container`, `RadioGroup` y `Select`.
*   **Componentes Soportados**:
    *   `Container`: Agrupa otros elementos. Puede anidar otros `Container`s.
        *   Ejemplo: `Container padding=4 bgColor="#f0f0f0"`
    *   `Title "Texto del título"`: Para encabezados.
        *   Ejemplo: `Title "Mi Página Increíble" align=center textColor=blue-600`
    *   `Text "Párrafo de texto"`: Para párrafos.
        *   Ejemplo: `Text "Este es un texto descriptivo importante." textColor="#333"`
    *   `Button "Texto del botón"`: Botones interactivos.
        *   Atributos Específicos:
            *   `color`: Define el color de fondo del botón. Acepta nombres predefinidos (`blue`, `red`, `green`, `yellow`, `gray`), valores hexadecimales (`#RRGGBB`), RGB (`rgb(R,G,B)`) o RGBA (`rgba(R,G,B,A)`).
                *   Ejemplos: `Button "Primario" color=blue`, `Button "Alerta" color="#e53e3e"`
    *   `Input`: Campos de entrada de texto.
        *   Atributos Específicos: `placeholder`, `value` (valor inicial), `type` (text, email, password, number, etc.), `name`, `id`.
        *   Ejemplo: `Input placeholder="Tu nombre" name=userName width="50%"`
    *   `Checkbox "Etiqueta del checkbox"`: Para selecciones booleanas.
        *   Atributos Específicos: `checked` ("true" o "false" para estado inicial), `value`, `name`, `id`.
        *   Ejemplo: `Checkbox "Acepto los términos" checked=true name=terms`
    *   `RadioGroup "Leyenda del grupo"`: Agrupa botones de radio. Requiere un atributo `name` para la funcionalidad del grupo.
        *   Atributos Específicos: `name` (para el grupo), `id`.
        *   Ejemplo de Grupo:
            ```plaintext
            RadioGroup "Elige una opción" name=myChoice
                Radio "Opción Alpha" value=alpha checked=true
                Radio "Opción Beta" value=beta
            ```
    *   `Radio "Etiqueta del radio"`: Botón de opción individual, debe estar dentro de un `RadioGroup`.
        *   Atributos Específicos: `value`, `checked` ("true" o "false"), `id`.
    *   `Select "Etiqueta del select"`: Un menú desplegable.
        *   Atributos Específicos: `name`, `id`, `required` ("true" o "false"). La selección inicial se maneja con `selected=true` en un `Option`.
        *   Ejemplo de Select:
            ```plaintext
            Select "Elige tu fruta" name=fruit
                Option "Manzana" value=apple
                Option "Banana" value=banana selected=true
                Option "Naranja" value=orange disabled=true
            ```
    *   `Option "Texto a mostrar"`: Opción dentro de un `Select`.
        *   Atributos Específicos: `value`, `selected` ("true" o "false"), `disabled` ("true" o "false").
    *   `Image`: Para mostrar imágenes.
        *   Atributos Específicos: `src` (URL de la imagen, **obligatorio**), `alt` (texto alternativo), `width`, `height` (como números o con unidades CSS).
        *   Ejemplo: `Image src="https://via.placeholder.com/150" alt="Imagen de ejemplo" width=150 height=100`
    *   `Icon`: Placeholder para mostrar iconos (actualmente muestra texto descriptivo).
        *   Atributos Específicos: `name` (identificador del icono, **obligatorio**), `color` (para el color del icono), `size` (para el tamaño), `label` (para accesibilidad).
        *   Ejemplo: `Icon name=star color=gold size=24 label="Favorito"`
    *   `Tag "Texto de la etiqueta"`: Para mostrar pequeñas etiquetas o badges.
        *   Atributos Específicos: `color` (para el tema de color del tag, e.g., `blue`, `green`, `#FF0000`), `size` (`sm`, `md`, `lg`).
        *   Ejemplo: `Tag "Nuevo" color=green size=sm`

*   **🎨 Atributos de Estilo Generales**: La mayoría de los componentes aceptan los siguientes atributos para personalización fina:
    *   `padding`: Espaciado interno. Ejemplos: `padding=4` (escala Tailwind), `padding="10px"`, `padding="2 4"` (vertical horizontal), `padding="1 2 3 4"` (arriba derecha abajo izquierda).
    *   `margin`: Espaciado externo. Similar a `padding`. Ejemplos: `margin=2`, `margin="0 auto"`.
    *   `align`: Para alineación de texto. Valores: `left`, `center`, `right`, `justify`. Ejemplo: `Text "Centrado" align=center`. (Nota: para alinear elementos dentro de un `Container` tipo flex/grid, se usarían propiedades de contenedor o `self-*` en los hijos, no implementado como atributo genérico `align` en hijos aún).
    *   `rounded` (o `radius`, `border-radius`): Redondez de bordes. Valores: `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full` (Tailwind) o valores CSS (e.g., `rounded="10px"`). Ejemplo: `Button "Redondeado" rounded=full`.
    *   `shadow`: Sombra de caja. Valores: `sm`, `md`, `lg`, `xl`, `2xl`, `inner`, `none`. Ejemplo: `Container shadow=lg`.
    *   `textColor`: Color del texto. Valores: nombres de color Tailwind (e.g., `red-500`, `blue-700`), hexadecimales (`#RRGGBB`), RGB (`rgb(R,G,B)`), RGBA. Ejemplo: `Title "Título Oscuro" textColor="#333333"`.
    *   `bgColor`: Color de fondo. Similar a `textColor`. Ejemplo: `Container bgColor=gray-100`. (Nota: En componentes como `Button` y `Tag`, su atributo `color` específico para el tema tiene precedencia para el fondo).
    *   `width`, `height`: Dimensiones del elemento. Valores: `auto`, `full` (100%), `screen` (100vw/vh), fracciones Tailwind (`1/2`, `3/4`), numéricos Tailwind (`w-24`), o valores CSS (`300px`, `50%`, `75vw`). Ejemplo: `Input placeholder="Ancho completo" width=full`.

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
