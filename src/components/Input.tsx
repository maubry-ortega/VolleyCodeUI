// # VolleyDevByMaubry [I1/1] "Input: where thought meets digital form, a gateway for expression."
import React from 'react';

// Extends standard InputHTMLAttributes for type safety and common input props like type, value, placeholder etc.
// className is also part of InputHTMLAttributes.
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = '', ...props }: InputProps) {
  const baseClasses = 'border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 my-1'; // Added my-1 for spacing
  return (
    <input
      {...props} // Spread all passed props (type, value, placeholder, name, id, etc.)
      className={`${baseClasses} ${className}`} // Combine base styles with any passed className from renderer
    />
  );
}
