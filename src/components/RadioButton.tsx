// # VolleyDevByMaubry [I3a/1] "RadioButton: a singular choice among many, a focused selection."
import React, { useId } from 'react';

interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'name' | 'size'> {
  label: string;
  name: string; 
  // id is part of InputHTMLAttributes
  // Custom style props for the wrapper div
  bgColor?: string;
  textColor?: string;
  rounded?: string;
  shadow?: string;
  align?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
}

export default function RadioButton(props: RadioButtonProps) {
  const {
    // Props for the wrapper div styling
    bgColor,
    textColor,
    rounded,
    shadow,
    align,
    padding,
    margin,
    width,  // Width for the wrapper div
    height, // Height for the wrapper div
    // Specific props for RadioButton functionality and inner elements
    className = '', // This className is for the wrapper div
    style,          // This style is for the wrapper div
    label,
    name, 
    id: providedId, 
    // Remaining props are for the <input type="radio"> itself
    ...inputSpecificProps 
  } = props;

  const internalId = useId();
  const id = providedId || internalId;
  
  const baseContainerClasses = 'flex items-center gap-2 my-1';
  const inputClasses = 'h-4 w-4 text-blue-600 border-gray-300 rounded-full focus:ring-blue-500 cursor-pointer form-radio';
  const labelClasses = 'text-sm text-gray-700 cursor-pointer';

  return (
    <div className={`${baseContainerClasses} ${className}`} style={style}>
      <input
        type="radio"
        id={id}
        name={name} // name is passed directly as it's a specific prop for RadioButton
        {...inputSpecificProps} // value, defaultChecked, onChange, disabled etc.
        className={inputClasses} // Input has its own specific classes
      />
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
    </div>
  );
}
