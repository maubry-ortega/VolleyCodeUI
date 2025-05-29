// # VolleyDevByMaubry [C2/4] "A title gives voice to the silent page."
import React, { PropsWithChildren } from 'react';

interface TitleProps extends PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
}

const Title: React.FC<TitleProps> = ({ children, className = '', style }) => {
  const baseClasses = "text-3xl font-bold my-3"; // Default classes from original component
  return (
    <h1 className={`${baseClasses} ${className}`} style={style}>
      {children}
    </h1>
  );
};

export default Title;
