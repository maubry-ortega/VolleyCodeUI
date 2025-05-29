// # VolleyDevByMaubry [V3/1] "Tag: a small label, a whisper of context, a highlight in the narrative."
import React from 'react';

interface TagProps {
  text: string;
  color?: string; // e.g., "blue", "green", "#FF0000", "rgb(255,0,0)"
  size?: string;  // e.g., "sm", "md", "lg"
  className?: string;
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
  let inlineStyle: React.CSSProperties = {};

  const lowerColor = color?.toLowerCase();

  if (lowerColor && namedColorClasses[lowerColor]) {
    colorClassNames = `${namedColorClasses[lowerColor].bg} ${namedColorClasses[lowerColor].text}`;
  } else if (lowerColor && (lowerColor.startsWith('#') || lowerColor.startsWith('rgb'))) {
    // For custom hex/rgb/rgba colors, apply directly to style.backgroundColor
    inlineStyle.backgroundColor = color; // Use original casing for style
    // Basic text contrast for hex, others might need more complex logic or a textColor attribute
    if (lowerColor.startsWith('#')) {
      colorClassNames = getContrastingTextColorForHex(lowerColor);
    } else {
      // For rgb/rgba, it's harder to get a simple contrast. Defaulting or requiring textColor attribute would be better.
      // For now, let's use a default that works okay on many light/medium custom backgrounds.
      colorClassNames = 'text-black'; // Or could be white, depending on typical custom color usage.
    }
  } else {
    // Default color if not specified or not recognized (e.g., use gray)
    colorClassNames = `${namedColorClasses.gray.bg} ${namedColorClasses.gray.text}`;
  }
  
  const baseClasses = 'inline-flex items-center font-medium rounded-full my-1';

  return (
    <span
      style={inlineStyle}
      className={`${baseClasses} ${currentSizeClasses} ${colorClassNames} ${className}`}
    >
      {text}
    </span>
  );
}
