// # VolleyDevByMaubry [C3/4] "Text weaves the tapestry of understanding."
import React, { PropsWithChildren } from 'react';

interface TextProps extends PropsWithChildren {}

const Text: React.FC<TextProps> = ({ children }) => {
  return (
    <p className="text-base my-2">
      {children}
    </p>
  );
};

export default Text;
