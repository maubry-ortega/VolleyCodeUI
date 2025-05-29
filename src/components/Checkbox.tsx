// # VolleyDevByMaubry [I2/1] "Checkbox: a small square for a big decision, a mark of choice."
import React, { useId } from 'react';

// Omit 'type' from standard InputHTMLAttributes as it's fixed to "checkbox"
// Omit 'size' as it's not standard for checkbox and can conflict with other props if not handled carefully
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: string;
  // id is part of InputHTMLAttributes, but we manage it with useId if not provided
}

export default function Checkbox({ 
  className = '', 
  label, 
  id: providedId, 
  ...props 
}: CheckboxProps) {
  const internalId = useId(); // React hook for generating unique IDs
  const id = providedId || internalId; // Use providedId if available, otherwise use generated internalId

  // Base classes for styling the component
  const baseContainerClasses = 'flex items-center gap-2 my-1'; // my-1 for some default vertical spacing
  const inputClasses = 'h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer';
  const labelClasses = 'text-sm text-gray-700 cursor-pointer';

  return (
    <div className={`${baseContainerClasses} ${className}`}>
      <input
        type="checkbox"
        id={id}
        {...props} // Spreads other props like name, value, checked, defaultChecked, onChange, disabled etc.
        className={inputClasses}
      />
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
    </div>
  );
}
