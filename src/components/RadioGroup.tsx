// # VolleyDevByMaubry [I3b/1] "RadioGroup: a chorus of options, harmonized by a single query."
import React from 'react'; // useId is not strictly needed here if name is always passed by renderer

interface RadioGroupProps {
  label: string; // Legend for the fieldset
  name: string;  // Name for the radio group, passed to children by renderer
  children: React.ReactNode;
  className?: string;
  id?: string; // ID for the fieldset itself
}

export default function RadioGroup({ 
  label, 
  // name prop is received but primarily used by the renderer to pass to children RadioButtons.
  // It's included here for completeness if direct usage of RadioGroup with manual RadioButton children occurs.
  name, 
  children, 
  className = '', 
  id 
}: RadioGroupProps) {
  const baseClasses = 'border border-gray-300 rounded-md p-4 my-2';
  const legendClasses = 'text-sm font-medium text-gray-700 px-1';

  // The renderer will map over RadioButtonElement AST nodes and render RadioButton components,
  // passing the 'name' prop to each. This component just provides the fieldset and legend.
  return (
    <fieldset className={`${baseClasses} ${className}`} id={id} name={name /* Fieldset can also have a name attribute */}>
      <legend className={legendClasses}>{label}</legend>
      <div className="mt-2 space-y-1"> {/* space-y-1 for tighter packing of radio buttons if desired */}
        {children} 
      </div>
    </fieldset>
  );
}
