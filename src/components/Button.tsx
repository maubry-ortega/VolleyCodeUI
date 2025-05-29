// # VolleyDevByMaubry [1/4] "Como un río que fluye sin detenerse, cada botón invita al movimiento y la acción."

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties; // Add style prop
}

export default function Button({ children, onClick, className = '', style }: ButtonProps) { // Destructure style
  return (
    <button
      onClick={onClick}
      // Combine base classes with passed className.
      // The renderer ensures that if 'style' is passed for custom colors, 'className' here won't contain conflicting bg-* classes.
      className={`px-4 py-2 rounded text-white hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-1 ${className}`}
      style={style} // Apply the style prop here
    >
      {children}
    </button>
  );
}
