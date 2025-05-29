// # VolleyDevByMaubry [V2/1] "Icon: a symbol speaking volumes, a pictogram of purpose."
import React from 'react';

interface IconProps {
  name: string; // Name of the icon (e.g., "check-circle", "star")
  color?: string; // Icon's specific color prop
  size?: string;  // e.g., "24px", "1.5em", or a number that will be treated as px
  className?: string;
  title?: string; // For accessibility
  style?: React.CSSProperties; // General style prop from renderer
}

export default function Icon({ 
  name, 
  color, // Specific color prop for the icon graphic/text
  size, 
  className = '', 
  title,
  style: passedStyle // General style prop
}: IconProps) {
  // Start with styles passed from renderer (which might include general textColor via style.color)
  const finalStyle: React.CSSProperties = { ...passedStyle };

  // Icon's specific 'color' prop overrides general 'textColor' from passedStyle.color
  if (color) {
    finalStyle.color = color;
  }

  // Icon's specific 'size' prop sets fontSize (overriding if fontSize was in passedStyle)
  if (size) {
    finalStyle.fontSize = /^\d+$/.test(size) ? `${size}px` : size;
    // For a more robust SVG icon system, width/height might be better:
    // finalStyle.width = finalStyle.fontSize;
    // finalStyle.height = finalStyle.fontSize;
  }

  // Placeholder text - in a real implementation, this would render an SVG, an icon font class, or an <img>.
  // Display the final effective color and size if set.
  const effectiveColor = finalStyle.color || 'inherit';
  const effectiveSize = finalStyle.fontSize || 'inherit';
  const placeholderText = `[Icon: ${name}${effectiveColor !== 'inherit' ? ` | Color: ${effectiveColor}` : ''}${effectiveSize !== 'inherit' ? ` | Size: ${effectiveSize}` : ''}]`;
  
  const baseClasses = 'inline-flex items-center justify-center my-1 align-middle';

  return (
    <span 
      style={finalStyle} 
      className={`${baseClasses} ${className}`} 
      role="img" 
      aria-label={title || name} 
      title={title || `Icon: ${name}`} 
    >
      {placeholderText}
    </span>
  );
}
