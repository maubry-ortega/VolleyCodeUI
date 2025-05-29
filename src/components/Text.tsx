// # VolleyDevByMaubry [C3/4] "Text weaves the tapestry of understanding."
import React, { PropsWithChildren } from 'react';

interface TextProps extends PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  // Add custom styling attributes if they were to be handled directly by Text,
  // but renderer already processes them into className and style.
  // So, no need to list bgColor, textColor etc. here unless Text had specific logic for them.
}

const Text: React.FC<TextProps> = ({ children, className = '', style }) => {
  const baseClasses = "text-base my-2"; // Default classes from original component
  return (
    <p className={`${baseClasses} ${className}`} style={style}>
      {children}
    </p>
  );
};

export default Text;
