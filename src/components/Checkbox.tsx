// # VolleyDevByMaubry [I2/1] "Checkbox: a small square for a big decision, a mark of choice."
import React, { useId } from 'react';

// Omit 'type' from standard InputHTMLAttributes as it's fixed to "checkbox"
// Omit 'size' as it's not standard for checkbox and can conflict with other props if not handled carefully
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: string;
  // id is part of InputHTMLAttributes
  // Add custom style props that might be passed via attributes and processed by renderer into style/className
  // These are for the wrapper div, primarily.
  bgColor?: string;
  textColor?: string; // Less common for checkbox wrapper, but possible
  rounded?: string;
  shadow?: string;
  align?: string;   // For content within the wrapper if it becomes more complex
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
}

export default function Checkbox(props: CheckboxProps) {
  const { 
    // Props for the wrapper div styling (processed by renderer into className and style)
    // We destructure them here so they are not spread onto the <input> element.
    bgColor,
    textColor,
    rounded,
    shadow,
    align,
    padding,
    margin,
    width, // Width for the wrapper div
    height, // Height for the wrapper div
    // Specific props for Checkbox functionality and inner elements
    className = '', // This className is for the wrapper div
    style,          // This style is for the wrapper div
    label, 
    id: providedId, 
    // Remaining props are for the <input type="checkbox"> itself
    ...inputSpecificProps 
  } = props;

  const internalId = useId();
  const id = providedId || internalId;

  const baseContainerClasses = 'flex items-center gap-2 my-1';
  const inputClasses = 'h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer';
  const labelClasses = 'text-sm text-gray-700 cursor-pointer';

  return (
    <div className={`${baseContainerClasses} ${className}`} style={style}>
      <input
        type="checkbox"
        id={id}
        {...inputSpecificProps} // Spreads name, value, defaultChecked, onChange, disabled etc.
        className={inputClasses} // Input has its own specific classes, not general ones
      />
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
    </div>
  );
}
