// # VolleyDevByMaubry [SU1/X] "Style Utilities: a palette of functions to paint the UI with precision."

import React from 'react';

/**
 * Parses a shadow attribute value and returns a Tailwind class.
 * @param value - e.g., "sm", "md", "lg", "xl", "2xl", "inner", "none"
 * @returns Tailwind shadow class or empty string if invalid.
 */
export function parseShadow(value?: string): string {
  if (!value) return '';
  const shadowMap: Record<string, string> = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    inner: 'shadow-inner',
    none: 'shadow-none',
  };
  return shadowMap[value.toLowerCase()] || '';
}

/**
 * Parses a border-radius attribute value.
 * @param value - e.g., "sm", "md", "lg", "xl", "2xl", "3xl", "full", or a CSS value like "10px"
 * @returns Object with either className or style.
 */
export function parseBorderRadius(value?: string): { className?: string; style?: React.CSSProperties } {
  if (!value) return {};
  const lowerValue = value.toLowerCase();
  const radiusMap: Record<string, string> = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  };

  if (radiusMap[lowerValue]) {
    return { className: radiusMap[lowerValue] };
  }
  // Check if it's a numeric value (assume Tailwind scale if just number, or direct px if ends with px)
  // For simplicity, any value not in map is treated as a direct CSS value for inline style.
  if (!isNaN(Number(lowerValue))) { // e.g. "4", "8" - map to Tailwind's default spacing if possible or treat as px.
      // This part can be more complex if we want to map numbers to Tailwind spacing units precisely.
      // For now, let's assume if it's a number, it's a pixel value for simplicity, or user should use named sizes.
      // A more advanced version could try to map e.g. "4" to "rounded" if 4px is the base for "rounded".
      // However, direct CSS values are more flexible.
      return { style: { borderRadius: `${lowerValue}px` } };
  }
  // For values like "10px", "0.5rem", etc.
  if (lowerValue.endsWith('px') || lowerValue.endsWith('em') || lowerValue.endsWith('rem') || lowerValue.endsWith('%')) {
    return { style: { borderRadius: value } }; // Use original casing for style
  }
  
  return {}; // Fallback for unrecognized named values
}

/**
 * Parses a color attribute for text or background.
 * @param value - e.g., "red-500", "#FF0000", "rgb(255,0,0)"
 * @param property - "color" for text color, "backgroundColor" for background
 * @returns Object with either className or style.
 */
export function parseColor(value?: string, property: 'color' | 'backgroundColor' = 'color'): { className?: string; style?: React.CSSProperties } {
  if (!value) return {};
  const lowerValue = value.toLowerCase();

  // Simple check for direct hex/rgb/rgba values
  if (lowerValue.startsWith('#') || lowerValue.startsWith('rgb')) {
    return { style: { [property]: value } }; // Use original casing for style
  }

  // Attempt to map to Tailwind text/bg color classes
  // This is a simplified example. A full mapping would be extensive or require a different approach.
  // For text: text-red-500, text-blue-600 etc.
  // For background: bg-red-500, bg-blue-600 etc.
  // We assume value is like "red-500", "blue" (which might map to text-blue-500 or similar)
  // This is a placeholder for a more robust Tailwind color name mapping.
  // For now, let's assume direct CSS color names or specific Tailwind shades are passed.
  const commonColors = ['black', 'white', 'transparent', 'current'];
  if (commonColors.includes(lowerValue)) {
     if (property === 'color') return { className: `text-${lowerValue}` };
     if (property === 'backgroundColor') return { className: `bg-${lowerValue}` };
  }

  // Example: if value is "red-500", generate "text-red-500" or "bg-red-500"
  // This regex is basic and assumes a pattern like "name-shade" or just "name"
  const tailwindColorMatch = lowerValue.match(/^([a-z]+)(-(\d+))?$/);
  if (tailwindColorMatch) {
    const colorName = tailwindColorMatch[1];
    const shade = tailwindColorMatch[3];
    if (property === 'color') {
      return { className: `text-${colorName}${shade ? `-${shade}` : '-500'}` }; // Default to 500 shade if not specified
    }
    if (property === 'backgroundColor') {
      return { className: `bg-${colorName}${shade ? `-${shade}` : '-500'}` };
    }
  }
  
  // If not a recognized Tailwind pattern or direct value, could be a CSS named color for inline style
  // CSS named colors (e.g., "red", "blue") are valid for inline styles
  if (/^[a-zA-Z]+$/.test(lowerValue)) {
     return { style: { [property]: lowerValue } };
  }

  return {};
}

/**
 * Parses spacing attributes (padding, margin).
 * Input: value like "4" (Tailwind unit), "10px", "2 4" (py-2 px-4), "1 2 3 4" (pt-1 pr-2 pb-3 pl-4)
 * Prefix: "p" for padding, "m" for margin.
 * @returns Object with either className or style.
 */
export function parseSpacing(value?: string, prefix: 'p' | 'm' = 'p'): { className?: string; style?: React.CSSProperties } {
  if (!value) return {};
  const parts = value.trim().split(/\s+/);

  // Handle direct CSS values if value contains units like px, em, rem, %
  if (value.match(/px|em|rem|%/)) {
    const styleProperty = prefix === 'p' ? 'padding' : 'margin';
    return { style: { [styleProperty]: value } }; // Use original value
  }

  // Tailwind numeric scale
  if (parts.length === 1 && !isNaN(Number(parts[0]))) {
    return { className: `${prefix}-${parts[0]}` };
  }
  if (parts.length === 2 && !isNaN(Number(parts[0])) && !isNaN(Number(parts[1]))) {
    return { className: `${prefix}y-${parts[0]} ${prefix}x-${parts[1]}` };
  }
  if (parts.length === 4 && parts.every(part => !isNaN(Number(part)))) {
    return { className: `${prefix}t-${parts[0]} ${prefix}r-${parts[1]} ${prefix}b-${parts[2]} ${prefix}l-${parts[3]}` };
  }
  
  // If not a recognized pattern, return empty (or could log warning)
  return {};
}

/**
 * Parses text alignment attribute.
 * @param value - "left", "center", "right", "justify"
 * @returns Tailwind text alignment class or empty string.
 */
export function parseTextAlign(value?: string): string {
  if (!value) return '';
  const alignMap: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };
  return alignMap[value.toLowerCase()] || '';
}

/**
 * Parses width/height attributes.
 * @param value - e.g., "1/2", "full", "screen", "auto", "24" (Tailwind unit), "300px", "50%"
 * @param property - "width" or "height"
 * @returns Object with either className or style.
 */
export function parseSize(value?: string, property: 'width' | 'height' = 'width'): { className?: string; style?: React.CSSProperties } {
  if (!value) return {};
  const prefix = property === 'width' ? 'w' : 'h';

  // Tailwind specific keywords or fractions
  const tailwindKeywords = ['auto', 'full', 'screen', 'min', 'max', 'fit'];
  const fractionRegex = /^\d+\/\d+$/; // e.g., "1/2", "3/4"
  
  if (tailwindKeywords.includes(value) || fractionRegex.test(value)) {
    return { className: `${prefix}-${value}` };
  }

  // Tailwind numeric scale (e.g., "24" -> "w-24")
  if (!isNaN(Number(value))) {
    return { className: `${prefix}-${value}` };
  }

  // Direct CSS values (e.g., "300px", "50%")
  if (value.endsWith('px') || value.endsWith('%') || value.endsWith('vw') || value.endsWith('vh') || value.endsWith('em') || value.endsWith('rem')) {
    return { style: { [property]: value } };
  }

  return {}; // Fallback
}
