// # VolleyDevByMaubry [I3b/1] "RadioGroup: a chorus of options, harmonized by a single query."
import React from 'react'; // useId is not strictly needed here if name is always passed by renderer

interface RadioGroupProps {
  label: string; // Legend for the fieldset
  name: string;  // Name for the radio group, passed to children by renderer
  children: React.ReactNode;
  className?: string;
  id?: string; // ID for the fieldset itself
  style?: React.CSSProperties; // Add style prop
}

export default function RadioGroup({ 
  label, 
  name, 
  children, 
  className = '', 
  id,
  style // Destructure style prop
}: RadioGroupProps) {
  const baseClasses = 'border border-gray-300 rounded-md p-4 my-2';
  const legendClasses = 'text-sm font-medium text-gray-700 px-1';

  return (
    <fieldset 
      className={`${baseClasses} ${className}`} 
      id={id} 
      name={name} // Fieldset can also have a name attribute
      style={style} // Apply style prop
    >
      <legend className={legendClasses}>{label}</legend>
      <div className="mt-2 space-y-1"> 
        {children} 
      </div>
    </fieldset>
  );
}
