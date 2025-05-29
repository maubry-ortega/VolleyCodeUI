// # VolleyDevByMaubry [2/4] "Descubrir sentido en la simplicidad: transformar palabras en estructuras que hablan sin ruido."

export type ButtonElement = {
  type: 'Button';
  text: string; // Changed from label
  attributes: Record<string, string>;
};

export type ContainerElement = {
  type: 'Container';
  children: UIElement[];
  attributes: Record<string, string>;
};

export type TitleElement = {
  type: 'Title';
  content: string;
  attributes: Record<string, string>;
};

export type TextElement = {
  type: 'Text';
  content: string;
  attributes: Record<string, string>;
};

export type UIElement = ButtonElement | ContainerElement | TitleElement | TextElement;

// Helper function to parse attributes
function parseAttributes(attributeString: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  if (!attributeString) return attributes;

  // Regex to match key=value pairs, value can be quoted or unquoted
  // Handles: key=value, key="value with spaces", key='value with single quotes'
  const attributeRegex = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s]+))/g;
  let match;
  while ((match = attributeRegex.exec(attributeString)) !== null) {
    const key = match[1];
    const value = match[2] || match[3] || match[4]; // match[2] for double quotes, match[3] for single, match[4] for unquoted
    attributes[key] = value;
  }
  return attributes;
}

export function parseUI(text: string): UIElement[] {
  const lines = text.split('\n');
  const elements: UIElement[] = [];
  const containerStack: ContainerElement[] = [];
  let currentIndentation = 0; // Tracks the indentation level of the current container context

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const indentation = line.length - line.trimStart().length;

    // Adjust container stack based on indentation
    // If current line is less indented than current container context, pop from stack
    while (containerStack.length > 0 && indentation < (containerStack[containerStack.length - 1].attributes._indentationLevel as number)) {
      containerStack.pop();
      // Update currentIndentation to the parent container's indentation, or 0 if stack is empty
      currentIndentation = containerStack.length > 0 ? (containerStack[containerStack.length - 1].attributes._indentationLevel as number) : 0;
    }
    
    // Regex to capture ElementType, an optional main quoted property, and the rest for attributes
    // Example: Button "Click Me" color=blue id=myButton
    // Group 1: ElementType (Button)
    // Group 2: Optional main property, quoted ("Click Me" or 'Click Me') - content inside quotes
    // Group 3: Rest of the string for attributes (color=blue id=myButton)
    const lineRegex = /^(\w+)(?:\s+(?:"([^"]*)"|'([^']*)'))?(.*)$/i;
    const lineMatch = trimmedLine.match(lineRegex);

    if (!lineMatch) continue; // Not a valid element line format

    const elementType = lineMatch[1];
    const mainProperty = lineMatch[2] || lineMatch[3] || ""; // Content of the first quoted string or empty
    const attributeString = lineMatch[4].trim();
    const attributes = parseAttributes(attributeString);

    let element: UIElement | null = null;

    switch (elementType.toLowerCase()) {
      case 'button':
        element = { type: 'Button', text: mainProperty, attributes };
        break;
      case 'title':
        element = { type: 'Title', content: mainProperty, attributes };
        break;
      case 'text':
        element = { type: 'Text', content: mainProperty, attributes };
        break;
      case 'container':
        // Store the container's own indentation level to manage its children's indentation
        attributes._indentationLevel = indentation; 
        const newContainer: ContainerElement = { type: 'Container', children: [], attributes };
        element = newContainer;
        break;
    }

    if (element) {
      const currentContainer = containerStack.length > 0 ? containerStack[containerStack.length - 1] : null;

      if (currentContainer) {
         // Child element must be more indented than its parent container
        if (indentation > (currentContainer.attributes._indentationLevel as number) ) {
          currentContainer.children.push(element);
        } else {
           // This element is not a child of the current container (e.g. sibling or less indented)
           // So, it should be added to the parent of the currentContainer, or to the root.
           // The loop for adjusting containerStack should have handled this.
           // If we reach here, it implies it's a sibling to the current container, or a new root.
           // The stack adjustment at the beginning of the loop should correctly place it.
           // For safety, we can re-check, but ideally the stack is already correct.
           if (containerStack.length > 1 && indentation <= (containerStack[containerStack.length - 2].attributes._indentationLevel as number) ) {
             // This case should be rare if stack logic is correct
             containerStack.pop(); // Pop current container
             containerStack[containerStack.length - 1].children.push(element); // Add to new current container (parent)
           } else {
             elements.push(element); // Add to root elements
           }
        }
      } else {
        // No active container, add to root elements
        elements.push(element);
      }

      if (element.type === 'Container') {
        // If this new element is a Container, push it onto the stack.
        // Its children will be added to it until an element with less or equal indentation is found.
        containerStack.push(element as ContainerElement);
        currentIndentation = indentation; // The new container sets the current indentation context for its children
      }
    }
  }
  // Clean up temporary _indentationLevel attribute
  const cleanupAttributes = (els: UIElement[]) => {
    els.forEach(el => {
      if (el.attributes && el.attributes._indentationLevel !== undefined) {
        delete el.attributes._indentationLevel;
      }
      if (el.type === 'Container') {
        cleanupAttributes(el.children);
      }
    });
  };
  cleanupAttributes(elements);
  return elements;
}
