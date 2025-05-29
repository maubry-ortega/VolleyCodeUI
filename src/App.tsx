// # VolleyDevByMaubry [4/4] "En la interacción nace la creación, y en la creación, un reflejo del alma del programador."

import React, { useState } from 'react';
import { parseUI } from './lib/parser';
import { renderUI } from './lib/renderer';

export default function App() {
  const [input, setInput] = useState<string>(`Button "Hola Mundo"\nButton "Click me" color=red`);

  const elements = parseUI(input);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Taskflow UI - VolleyDevByMaubry</h1>

      <textarea
        className="w-full max-w-2xl h-40 p-4 rounded border border-gray-300 mb-6 resize-none font-mono text-lg"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
      />

      <div className="flex flex-wrap gap-4 max-w-2xl">
        {renderUI(elements)}
      </div>
    </div>
  );
}

