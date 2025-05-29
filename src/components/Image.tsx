// # VolleyDevByMaubry [V1/1] "Image: a silent storyteller, a window to another world framed in pixels."
import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string; // src is mandatory for the component's props interface
  // alt, width, height, className, title, loading etc. are part of ImgHTMLAttributes
}

export default function Image({ 
  className = '', 
  alt = '', // Default alt to empty string for accessibility if not provided
  ...props 
}: ImageProps) {
  // Ensure src is present; though type system requires it, it's good practice for runtime if props could be manipulated.
  if (!props.src) {
    // This case should ideally be caught by TypeScript if Image is used directly in TSX with missing src.
    // When props come from parser attributes, renderer should ensure 'src' exists.
    // Fallback rendering if src is somehow missing at component level:
    return <div className="text-red-500 text-sm">[Image: Missing src]</div>;
  }

  const baseClasses = 'inline-block my-1 align-middle max-w-full h-auto'; // Ensure responsive behavior by default

  return (
    <img
      alt={alt} // Apply default or provided alt text
      {...props}  // Spreads src, width, height, title, loading etc.
      className={`${baseClasses} ${className}`} // Combine base styles with any passed className
    />
  );
}
