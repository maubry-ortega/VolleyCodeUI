// # VolleyDevByMaubry [I3a/1] "RadioButton: a singular choice among many, a focused selection."
import React, { useId } from 'react';

interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'name' | 'size'> {
  label: string;
  name: string; // Name is crucial for grouping, passed from RadioGroup/renderer
  // id is part of InputHTMLAttributes
}

export default function RadioButton({ 
  className = '', 
  label, 
  name, 
  id: providedId, 
  ...props 
}: RadioButtonProps) {
  const internalId = useId();
  const id = providedId || internalId;
  
  const baseContainerClasses = 'flex items-center gap-2 my-1';
  // Added 'form-radio' for potentially better default styling if a forms plugin for Tailwind is ever used.
  // Manually ensuring circular appearance with 'rounded-full'.
  const inputClasses = 'h-4 w-4 text-blue-600 border-gray-300 rounded-full focus:ring-blue-500 cursor-pointer form-radio';
  const labelClasses = 'text-sm text-gray-700 cursor-pointer';

  return (
    <div className={`${baseContainerClasses} ${className}`}>
      <input
        type="radio"
        id={id}
        name={name}
        {...props} // value, defaultChecked, checked, onChange, disabled etc.
        className={inputClasses}
      />
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
    </div>
  );
}
