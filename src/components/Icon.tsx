// # VolleyDevByMaubry [V2/1] "Icon: a symbol speaking volumes, a pictogram of purpose."
import React from 'react';

interface IconProps {
  name: string; // Name of the icon (e.g., "check-circle", "star")
  color?: string; // CSS color value
  size?: string;  // e.g., "24px", "1.5em", or a number that will be treated as px
  className?: string;
  title?: string; // For accessibility, if the icon itself needs a title
}

export default function Icon({ 
  name, 
  color, 
  size, 
  className = '', 
  title 
}: IconProps) {
  const style: React.CSSProperties = {};

  if (color) {
    style.color = color;
  }

  if (size) {
    // Basic handling: if size is a number or string of digits, append 'px'. Otherwise, use as is.
    style.fontSize = /^\d+$/.test(size) ? `${size}px` : size;
    // For a more robust SVG icon system, width/height might be better:
    // style.width = style.fontSize;
    // style.height = style.fontSize;
  }

  // Placeholder text - in a real implementation, this would render an SVG, an icon font class, or an <img>.
  const placeholderText = `[Icon: ${name}${color ? ` | Color: ${color}` : ''}${size ? ` | Size: ${size}` : ''}]`;
  
  // Basic classes for layout and to make it behave somewhat like an icon.
  const baseClasses = 'inline-flex items-center justify-center my-1 align-middle';

  return (
    <span 
      style={style} 
      className={`${baseClasses} ${className}`} 
      role="img" // Basic accessibility for a generic span acting as an icon
      aria-label={title || name} // Use title prop for aria-label, fallback to name
      title={title || `Icon: ${name}`} // Tooltip
    >
      {/* In a real library, you might use an <img>, <i> with classes, or <svg> here */}
      {placeholderText}
    </span>
  );
}
