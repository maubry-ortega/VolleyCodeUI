// # VolleyDevByMaubry [C1/4] "The container holds the world, yet is defined by its contents."
import React, { PropsWithChildren } from 'react';

interface ContainerProps extends PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = 'p-4 border rounded shadow-md my-2', // Default classes
  style 
}) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default Container;
