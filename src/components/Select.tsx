// # VolleyDevByMaubry [I4b/1] "Select: a curated choice, a dropdown whisper of preferences."
import React, { useId } from 'react';

// Omit 'size' as it can conflict or behave unexpectedly depending on browser/OS if not explicitly handled.
// We manage children directly.
interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string; // Optional label for the select element
  // children will be the <Option> components passed from the renderer
  // id is part of SelectHTMLAttributes
}

export default function Select({ 
  className = '', 
  label, 
  children, 
  id: providedId, 
  ...props 
}: SelectProps) {
  const internalId = useId();
  const id = providedId || internalId;

  const baseContainerClasses = 'my-1 w-full'; // Container for label and select
  const baseSelectClasses = 'border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer';
  const labelClasses = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <div className={`${baseContainerClasses} ${className}`}>
      {label && <label htmlFor={id} className={labelClasses}>{label}</label>}
      <select
        id={id}
        {...props} // Spreads name, defaultValue, required, disabled, onChange etc.
        className={baseSelectClasses}
      >
        {children}
      </select>
    </div>
  );
}
