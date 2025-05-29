// # VolleyDevByMaubry [4/4] "En la interacción nace la creación, y en la creación, un reflejo del alma del programador."

import React, { useState } from 'react';
import { parseUI } from './lib/parser';
import { renderUI } from './lib/renderer';

export default function App() {
  const [input, setInput] = useState<string>(`Container width=90% height=auto
    Title "VolleyCodeUI Showcase"
    Text "Demonstrating new syntax and features like custom sizes and colors."

    Container width=60% height=200px
        Title "Custom Styled Buttons"
        Button "Hex Color" color=#C70039 id=hexBtn
        Button "RGB Color" color=rgb(255,195,0)
        Button "RGBA Color" color=rgba(100,100,255,0.8)
        Button "Named (Yellow)" color=yellow
    
    Container
        Title "Nested Content Area"
        Text "This container has default sizing and contains another button."
        Button "Default Button"`);

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

