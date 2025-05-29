// # VolleyDevByMaubry [3/4] "Colores que susurran emociones, formas que despiertan sentido: la UI como poesía en movimiento."

import React from 'react';
import Button from '../components/Button';
import type { UIElement } from './parser';

interface RendererProps {
  elements: UIElement[];
}

export function renderUI(elements: UIElement[]) {
  return elements.map((el, i) => {
    switch (el.type) {
      case 'Button':
        const colorClasses: Record<string, string> = {
          blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-400',
          red: 'bg-red-600 hover:bg-red-700 focus:ring-red-400',
          green: 'bg-green-600 hover:bg-green-700 focus:ring-green-400',
          yellow: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300',
          gray: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-400',
        };

        const className = colorClasses[el.color.toLowerCase()] || colorClasses.blue;

        return (
          <Button key={i} className={className}>
            {el.label}
          </Button>
        );

      default:
        return null;
    }
  });
}
