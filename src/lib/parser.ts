// # VolleyDevByMaubry [2/4] "Descubrir sentido en la simplicidad: transformar palabras en estructuras que hablan sin ruido."

export type ButtonElement = {
  type: 'Button';
  label: string;
  color: string;
};

export type ContainerElement = {
  type: 'Container';
  children: UIElement[];
};

export type TitleElement = {
  type: 'Title';
  content: string;
};

export type TextElement = {
  type: 'Text';
  content: string;
};

export type UIElement = ButtonElement | ContainerElement | TitleElement | TextElement;

export function parseUI(text: string): UIElement[] {
  const lines = text.split('\n');
  const elements: UIElement[] = [];
  const containerStack: ContainerElement[] = [];
  let currentIndentation = 0;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const indentation = line.length - line.trimStart().length;

    // Adjust container stack based on indentation
    while (indentation < currentIndentation && containerStack.length > 0) {
      containerStack.pop();
      currentIndentation -= 4; // Assuming 4 spaces for indentation
    }

    let element: UIElement | null = null;

    // Button: Button "Text" color=blue
    const buttonRegex = /^Button\s+"(.+?)"(?:\s+color=(\w+))?$/i;
    let match = trimmedLine.match(buttonRegex);
    if (match) {
      element = { type: 'Button', label: match[1], color: match[2] || 'blue' };
    }

    // Title: [Title] Some title text
    const titleRegex = /^\[Title\]\s*(.*)$/i;
    match = trimmedLine.match(titleRegex);
    if (match) {
      element = { type: 'Title', content: match[1] };
    }

    // Text: [Text] Some paragraph text
    const textRegex = /^\[Text\]\s*(.*)$/i;
    match = trimmedLine.match(textRegex);
    if (match) {
      element = { type: 'Text', content: match[1] };
    }

    // Container: [Container]
    const containerRegex = /^\[Container\]$/i;
    match = trimmedLine.match(containerRegex);
    if (match) {
      const newContainer: ContainerElement = { type: 'Container', children: [] };
      element = newContainer;
    }

    if (element) {
      if (containerStack.length > 0) {
        containerStack[containerStack.length - 1].children.push(element);
      } else {
        elements.push(element);
      }

      if (element.type === 'Container') {
        containerStack.push(element as ContainerElement);
        currentIndentation = indentation + 4; // Expect children to be indented further
      }
    }
  }

  return elements;
}
