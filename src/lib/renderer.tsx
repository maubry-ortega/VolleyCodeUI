// # VolleyDevByMaubry [3/4] "Colores que susurran emociones, formas que despiertan sentido: la UI como poesía en movimiento."

import React from 'react';
import Button from '../components/Button';
import Container from '../components/Container';
import Title from '../components/Title';
import Text from '../components/Text';
import type { UIElement, ButtonElement, ContainerElement, TitleElement, TextElement } from './parser';

interface RendererProps {
  elements: UIElement[];
}

export function renderUI(elements: UIElement[]) {
  return elements.map((el, i) => {
    switch (el.type) {
      case 'Button':
        const buttonEl = el as ButtonElement; // Cast to ButtonElement for attribute access
        const colorValue = buttonEl.attributes?.color?.toLowerCase();
        
        let buttonProps: React.ComponentProps<typeof Button> = {
          key: i,
          // Base classes that don't conflict with background should be defined in Button.tsx or here if needed.
          // For now, Button.tsx has: `px-4 py-2 rounded text-white hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-1`
          // We let Button.tsx handle its own base styling and only pass color-specific styles or classes.
        };

        const namedColorClasses: Record<string, string> = {
          blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-400',
          red: 'bg-red-600 hover:bg-red-700 focus:ring-red-400',
          green: 'bg-green-600 hover:bg-green-700 focus:ring-green-400',
          yellow: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300',
          gray: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-400',
        };

        if (colorValue && namedColorClasses[colorValue]) {
          buttonProps.className = namedColorClasses[colorValue];
        } else if (colorValue && (colorValue.startsWith('#') || colorValue.startsWith('rgb'))) {
          buttonProps.style = { backgroundColor: buttonEl.attributes.color }; // Use original casing for style
        } else {
          // Default color if no valid color attribute is provided
          buttonProps.className = namedColorClasses.blue;
        }
        
        return (
          <Button {...buttonProps}>
            {buttonEl.text}
          </Button>
        );
      
      case 'Container':
        const containerEl = el as ContainerElement;
        const dynamicStyles: React.CSSProperties = {};

        if (containerEl.attributes?.width) {
          dynamicStyles.width = containerEl.attributes.width;
        }
        if (containerEl.attributes?.height) {
          dynamicStyles.height = containerEl.attributes.height;
        }

        return (
          <Container key={i} style={dynamicStyles}>
            {renderUI(containerEl.children)}
          </Container>
        );

      case 'Title':
        const titleEl = el as TitleElement;
        return (
          <Title key={i}>
            {titleEl.content}
          </Title>
        );

      case 'Text':
        const textEl = el as TextElement;
        return (
          <Text key={i}>
            {textEl.content}
          </Text>
        );

      default:
        return null;
    }
  });
}
