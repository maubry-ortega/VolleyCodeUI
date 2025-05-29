// # VolleyDevByMaubry [C1/4] "The container holds the world, yet is defined by its contents."
import React, { PropsWithChildren } from 'react';

interface ContainerProps extends PropsWithChildren {}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="p-4 border rounded shadow-md my-2">
      {children}
    </div>
  );
};

export default Container;
