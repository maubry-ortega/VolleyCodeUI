// # VolleyDevByMaubry [I1/1] "Input: where thought meets digital form, a gateway for expression."
import React from 'react';

// Extends standard InputHTMLAttributes for type safety and common input props like type, value, placeholder etc.
// className is also part of InputHTMLAttributes.
// Add known custom attributes to props so they can be destructured out.
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  bgColor?: string;
  textColor?: string;
  rounded?: string;
  shadow?: string;
  align?: string;
  padding?: string;
  margin?: string;
  // Note: 'width' and 'height' if passed directly and not standard HTML attributes for input
  // might also need to be listed, but they are often handled by `style` or specific HTML attributes.
  // For now, focusing on the most common custom ones from styleUtils.
}

export default function Input(props: InputProps) {
  const {
    // Destructure custom style-related props to prevent them from being spread onto the DOM element
    bgColor,
    textColor,
    rounded,
    shadow,
    align,
    padding,
    margin,
    // Destructure standard props that are handled separately or have defaults
    className = '',
    // Collect all other valid HTML input attributes into restProps
    ...restProps 
  } = props;

  const baseClasses = 'border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 my-1';
  return (
    <input
      {...restProps} // Spread only valid HTML attributes
      className={`${baseClasses} ${className}`} // className from props already includes Tailwind generated from custom attrs
    />
  );
}
