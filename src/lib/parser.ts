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

export interface InputElement {
  type: 'Input';
  attributes: {
    placeholder?: string;
    value?: string;
    type?: string;
    name?: string;
    id?: string;
    [key: string]: string | undefined; // Allow other string attributes
  };
}

export interface CheckboxElement {
  type: 'Checkbox';
  text: string; // The label text for the checkbox
  attributes: {
    checked?: string; // "true" or "false"
    value?: string;
    name?: string;
    id?: string;
    [key: string]: string | undefined;
  };
}

export interface RadioButtonElement {
  type: 'RadioButton';
  text: string; // Label for the radio button
  attributes: {
    value?: string;
    checked?: string; // "true" or "false"
    id?: string;
    [key: string]: string | undefined;
  };
}

export interface RadioGroupElement {
  type: 'RadioGroup';
  text: string; // Legend for the group
  children: RadioButtonElement[]; // Specifically RadioButtonElement
  attributes: {
    name?: string; // This will be the 'name' for all radio buttons in the group
    id?: string;
    [key: string]: string | undefined;
  };
}

export interface OptionElement {
  type: 'Option';
  text: string; // Display text of the option
  attributes: {
    value?: string;
    selected?: string; // "true" or "false"
    disabled?: string; // "true" or "false"
    [key: string]: string | undefined;
  };
}

export interface SelectElement {
  type: 'Select';
  text: string; // Label for the select element
  children: OptionElement[]; // Specifically OptionElement
  attributes: {
    name?: string;
    id?: string;
    required?: string; // "true" or "false"
    [key: string]: string | undefined;
  };
}

export interface ImageElement {
  type: 'Image';
  attributes: {
    src: string; // Mandatory, but parser collects all attributes as strings. Renderer will check.
    alt?: string;
    width?: string;
    height?: string;
    title?: string;
    loading?: "eager" | "lazy";
    [key: string]: string | undefined;
  };
}

export interface IconElement {
  type: 'Icon';
  attributes: {
    name: string; // Mandatory, but parser collects all attributes as strings. Renderer will check.
    color?: string;
    size?: string;
    label?: string; // Accessibility label
    [key: string]: string | undefined;
  };
}

export interface TagElement {
  type: 'Tag';
  text: string; // The content of the tag
  attributes: {
    color?: string;
    size?: string;
    [key: string]: string | undefined;
  };
}

export type UIElement = ButtonElement | ContainerElement | TitleElement | TextElement | InputElement | CheckboxElement | RadioButtonElement | RadioGroupElement | OptionElement | SelectElement | ImageElement | IconElement | TagElement;

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
  // containerStack can now hold ContainerElement, RadioGroupElement, or SelectElement
  const containerStack: Array<ContainerElement | RadioGroupElement | SelectElement> = []; 
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
      case 'input':
        // Input elements typically don't have a "mainProperty" in the same way as Button/Title/Text.
        // All relevant properties (placeholder, value, type) are parsed as attributes.
        element = { type: 'Input', attributes };
        break;
      case 'checkbox':
        element = { type: 'Checkbox', text: mainProperty, attributes };
        break;
      case 'radiogroup':
        attributes._indentationLevel = indentation;
        const newRadioGroup: RadioGroupElement = { type: 'RadioGroup', text: mainProperty, children: [], attributes };
        element = newRadioGroup;
        break;
      case 'radio': // Keyword for RadioButtonElement
        // RadioButton should not have mainProperty in the same way, label is its mainProperty
        element = { type: 'RadioButton', text: mainProperty, attributes };
        break;
      case 'select':
        attributes._indentationLevel = indentation;
        const newSelect: SelectElement = { type: 'Select', text: mainProperty, children: [], attributes };
        element = newSelect;
        break;
      case 'option':
        element = { type: 'Option', text: mainProperty, attributes };
        break;
      case 'image':
        // Image elements derive all their data from attributes.
        // The 'mainProperty' (first quoted string) is typically not used for Image.
        if (mainProperty) {
          console.warn(`Parser Warning: Image element received a main quoted property ("${mainProperty}") which is unused. Define 'src', 'alt', etc., as attributes.`);
        }
        // Type assertion for attributes needed if we want strict typing on 'src' here,
        // but attributes are Record<string,string>. Renderer handles 'src' presence.
        element = { type: 'Image', attributes: attributes as ImageElement['attributes'] };
        break;
      case 'icon':
        // Icon elements derive all their data from attributes.
        // The 'mainProperty' (first quoted string) is typically not used for Icon.
        if (mainProperty) {
          console.warn(`Parser Warning: Icon element received a main quoted property ("${mainProperty}") which is unused. Define 'name', 'color', 'size', etc., as attributes.`);
        }
        // Renderer will handle 'name' presence.
        element = { type: 'Icon', attributes: attributes as IconElement['attributes'] };
        break;
      case 'tag':
        element = { type: 'Tag', text: mainProperty, attributes };
        break;
    }

    if (element) {
      const currentStackParent = containerStack.length > 0 ? containerStack[containerStack.length - 1] : null;

      if (currentStackParent) {
        if (indentation > (currentStackParent.attributes._indentationLevel as number)) {
          // Type checking for parent-child relationship
          if (currentStackParent.type === 'Container') {
             // Container can hold most things except direct RadioButton or Option
            if (element.type !== 'RadioButton' && element.type !== 'Option') {
              (currentStackParent.children as UIElement[]).push(element);
            } else {
              console.warn(`Parser Warning: ${element.type} "${element.text || ''}" found as direct child of Container. Expected specific parent.`);
            }
          } else if (currentStackParent.type === 'RadioGroup') {
            if (element.type === 'RadioButton') {
              (currentStackParent.children as RadioButtonElement[]).push(element as RadioButtonElement);
            } else {
              console.warn(`Parser Warning: Element type "${element.type}" found as direct child of RadioGroup. Expected RadioButton.`);
            }
          } else if (currentStackParent.type === 'Select') {
            if (element.type === 'Option') {
              (currentStackParent.children as OptionElement[]).push(element as OptionElement);
            } else {
              console.warn(`Parser Warning: Element type "${element.type}" found as direct child of Select. Expected Option.`);
            }
          }
          // Note: No 'else' here means if not matched, it won't be added as a child to currentStackParent.
          // This makes the type checks above effectively filters.
        } else {
           // This element is not a child of the current stack parent (e.g. sibling or less indented)
           // So, it should be added to the parent of the current stack parent, or to the root.
           // The stack adjustment at the beginning of the loop should correctly place it.
           containerStack.pop(); // Pop current parent from stack, it's no longer the active parent
           const newCurrentParent = containerStack.length > 0 ? containerStack[containerStack.length-1] : null;
           if (newCurrentParent && indentation > (newCurrentParent.attributes._indentationLevel as number) ) {
             // Try to add to the new current parent (grandparent) with type checks
             if (newCurrentParent.type === 'Container') {
                if (element.type !== 'RadioButton' && element.type !== 'Option') {
                    (newCurrentParent.children as UIElement[]).push(element);
                } else {
                     elements.push(element); // Fallback to root if type mismatch with new parent
                }
             } else if (newCurrentParent.type === 'RadioGroup' && element.type === 'RadioButton') {
                (newCurrentParent.children as RadioButtonElement[]).push(element as RadioButtonElement);
             } else if (newCurrentParent.type === 'Select' && element.type === 'Option')
                (newCurrentParent.children as OptionElement[]).push(element as OptionElement);
             else {
                elements.push(element); // Fallback: add to root if no suitable parent on stack or type mismatch
             }
           } else {
             elements.push(element); // Add to root elements if not child of anything on stack or stack becomes empty
           }
        }
      } else {
        // No active container/group/select on stack, add to root elements
        elements.push(element);
      }

      if (element.type === 'Container' || element.type === 'RadioGroup' || element.type === 'Select') {
        // If this new element can contain children, push it onto the stack.
        containerStack.push(element as ContainerElement | RadioGroupElement | SelectElement);
        currentIndentation = indentation; // The new container/group/select sets the current indentation context
      }
    }
  }
  // Clean up temporary _indentationLevel attribute
  const cleanupAttributes = (els: UIElement[]) => {
    els.forEach(el => {
      if (el.attributes && el.attributes._indentationLevel !== undefined) {
        delete el.attributes._indentationLevel;
      }
      if (el.type === 'Container' || el.type === 'RadioGroup' || el.type === 'Select') {
        cleanupAttributes(el.children);
      }
    });
  };
  cleanupAttributes(elements);
  return elements;
}
