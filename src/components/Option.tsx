// # VolleyDevByMaubry [I4a/1] "Option: a single path chosen from a branching river of possibilities."
import React from 'react';

// Extends standard OptionHTMLAttributes for type safety.
// Props like value, disabled, selected (for uncontrolled) are part of this.
// Children will be the display text.
interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

export default function Option({ children, ...props }: OptionProps) {
  // React handles the 'selected' attribute on <option> for uncontrolled selects
  // if the corresponding 'value' on the <select> matches this option's 'value',
  // or if this option's 'selected' prop is true upon initial render.
  // For VolleyCodeUI, we'll primarily rely on setting `defaultValue` on the parent `Select`
  // based on `selected="true"` attribute from the parser.
  return (
    <option {...props}>
      {children}
    </option>
  );
}
