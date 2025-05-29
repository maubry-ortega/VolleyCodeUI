// # VolleyDevByMaubry [I4b/1] "Select: a curated choice, a dropdown whisper of preferences."
import React, { useId } from 'react';

// Omit 'size' as it can conflict or behave unexpectedly depending on browser/OS if not explicitly handled.
// We manage children directly.
interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string; // Optional label for the select element
  // children will be the <Option> components passed from the renderer
  // id is part of SelectHTMLAttributes
  // Custom style props for the wrapper div
  bgColor?: string;
  textColor?: string; // For the label or if select text could inherit
  rounded?: string;
  shadow?: string;
  align?: string;   // For content within the wrapper (label)
  padding?: string; // For the wrapper div
  margin?: string;  // For the wrapper div
  // width and height for the wrapper div are not typically set here, but on the <select> or via className
}

export default function Select(props: SelectProps) {
  const { 
    // Custom style-related attributes for the wrapper (destructured to not spread on <select>)
    bgColor,
    textColor, // This textColor from general attributes might apply to the label.
    rounded,   // These apply to the wrapper div via className/style from renderer.
    shadow,
    align,
    padding,   // Renderer processes these into className/style for the wrapper.
    margin,
    // Specific props for Select functionality and elements
    className = '', // This className is for the wrapper div
    style,          // This style is for the wrapper div
    label, 
    children, 
    id: providedId, 
    // Remaining props are for the <select> element itself
    ...selectSpecificProps 
  } = props;

  const internalId = useId();
  const id = providedId || internalId;

  const baseContainerClasses = 'my-1 w-full'; // Base for the wrapper div
  const baseSelectClasses = 'border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer';
  const labelClasses = 'block text-sm font-medium text-gray-700 mb-1';

  // Note: If `textColor` was intended for the select's text itself, the <select> element
  // would need to receive that style or class. Currently, `processStyleAttributes` generates
  // `textColor` which would apply to the wrapper via `style` or `className`.
  // Select elements are notoriously hard to style text color directly via parent.
  // For now, wrapper gets styled.

  return (
    <div className={`${baseContainerClasses} ${className}`} style={style}>
      {label && <label htmlFor={id} className={labelClasses}>{label}</label>}
      <select
        id={id}
        {...selectSpecificProps} // Spreads name, defaultValue, required, disabled, onChange etc.
        className={baseSelectClasses} // <select> has its own base classes, not general styling from wrapper
      >
        {children}
      </select>
    </div>
  );
}
