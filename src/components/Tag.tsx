// # VolleyDevByMaubry [V3/1] "Tag: a small label, a whisper of context, a highlight in the narrative."
import React from 'react';

interface TagProps {
  text: string;
  color?: string; // e.g., "blue", "green", "#FF0000", "rgb(255,0,0)"
  size?: string;  // e.g., "sm", "md", "lg"
  className?: string;
  style?: React.CSSProperties; // Allow style prop from renderer
}

// Helper to get contrasting text color (very basic for hex only)
const getContrastingTextColorForHex = (hexColor?: string): string => {
  if (!hexColor || !hexColor.startsWith('#')) return 'text-gray-800'; // Default if not hex or undefined

  let rStr = '00', gStr = '00', bStr = '00';

  if (hexColor.length === 4) { // #RGB format
    rStr = hexColor.slice(1, 2) + hexColor.slice(1, 2);
    gStr = hexColor.slice(2, 3) + hexColor.slice(2, 3);
    bStr = hexColor.slice(3, 4) + hexColor.slice(3, 4);
  } else if (hexColor.length === 7) { // #RRGGBB format
    rStr = hexColor.slice(1, 3);
    gStr = hexColor.slice(3, 5);
    bStr = hexColor.slice(5, 7);
  } else {
    return 'text-gray-800'; // Not a valid hex for this basic check
  }

  const r = parseInt(rStr, 16);
  const g = parseInt(gStr, 16);
  const b = parseInt(bStr, 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? 'text-black' : 'text-white';
};

const namedColorClasses: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-800' },
  red: { bg: 'bg-red-100', text: 'text-red-800' },
  green: { bg: 'bg-green-100', text: 'text-green-800' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-800' }, // Default
  purple: { bg: 'bg-purple-100', text: 'text-purple-800' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-800' },
  // Add more named colors as needed
};

const sizeClasses: Record<string, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-0.5', // Adjusted py for md to be similar to sm
  lg: 'text-base px-3 py-1',   // Adjusted py for lg
};

export default function Tag({ text, color, size, className = '' }: TagProps) {
  const currentSizeClasses = sizeClasses[size?.toLowerCase() || 'md'] || sizeClasses.md;
  
  let colorClassNames = '';
  // Prioritize passed style, then compute internal styles
  let finalStyle: React.CSSProperties = { ...style }; // Start with style from props

  const lowerColor = color?.toLowerCase(); // Tag's specific 'color' prop for background/theme

  // Check if textColor is already set via general 'textColor' attribute (inline style)
  const hasGeneralTextColorStyle = finalStyle.color;
  // Check if textColor is already set via general 'textColor' attribute (Tailwind class in passed className)
  const hasGeneralTextColorClass = className?.includes('text-');


  if (lowerColor && namedColorClasses[lowerColor]) {
    colorClassNames = namedColorClasses[lowerColor].bg;
    if (!hasGeneralTextColorStyle && !hasGeneralTextColorClass) { // Only apply named text color if no general text color is set
      colorClassNames += ` ${namedColorClasses[lowerColor].text}`;
    }
  } else if (lowerColor && (lowerColor.startsWith('#') || lowerColor.startsWith('rgb'))) {
    finalStyle.backgroundColor = color; // Use original casing
    if (!hasGeneralTextColorStyle && !hasGeneralTextColorClass) { // Only apply contrast text color if no general text color
      if (lowerColor.startsWith('#')) {
        colorClassNames += ` ${getContrastingTextColorForHex(lowerColor)}`;
      } else {
        colorClassNames += ' text-black'; // Default for non-hex custom bg
      }
    }
  } else {
    // Default theme color if Tag's 'color' prop not specified AND no general 'bgColor' from style prop
    if (!finalStyle.backgroundColor && !className?.split(' ').some(cls => cls.startsWith('bg-'))) {
      colorClassNames = namedColorClasses.gray.bg;
      if (!hasGeneralTextColorStyle && !hasGeneralTextColorClass) { // And no general text color
         colorClassNames += ` ${namedColorClasses.gray.text}`;
      }
    }
  }
  
  const baseClasses = 'inline-flex items-center font-medium rounded-full my-1';

  return (
    <span
      style={finalStyle} // Apply merged styles
      className={`${baseClasses} ${currentSizeClasses} ${colorClassNames} ${className}`} // Passed className is last for higher specificity for general classes
    >
      {text}
    </span>
  );
}
