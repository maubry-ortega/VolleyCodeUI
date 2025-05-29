// # VolleyDevByMaubry [2/4] "Descubrir sentido en la simplicidad: transformar palabras en estructuras que hablan sin ruido."

export type UIElement = {
  type: 'Button';
  label: string;
  color: string;
};

export function parseUI(text: string): UIElement[] {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

  const elements: UIElement[] = [];

  for (const line of lines) {
    // Sintaxis: Button "Texto" color=blue
    const regex = /^Button\s+"(.+?)"(?:\s+color=(\w+))?$/i;
    const match = line.match(regex);

    if (match) {
      const label = match[1];
      const color = match[2] || 'blue';
      elements.push({ type: 'Button', label, color });
    }
  }

  return elements;
}
