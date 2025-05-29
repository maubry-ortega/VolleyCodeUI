// # VolleyDevByMaubry [C2/4] "A title gives voice to the silent page."
import React, { PropsWithChildren } from 'react';

interface TitleProps extends PropsWithChildren {}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <h1 className="text-3xl font-bold my-3">
      {children}
    </h1>
  );
};

export default Title;
