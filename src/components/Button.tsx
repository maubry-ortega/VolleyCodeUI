// # VolleyDevByMaubry [1/4] "Como un río que fluye sin detenerse, cada botón invita al movimiento y la acción."

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, onClick, className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded text-white hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-1 ${className}`}
    >
      {children}
    </button>
  );
}
