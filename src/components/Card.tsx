// # VolleyDevByMaubry [C4/4] "A card is a canvas for a single thought."
import React, { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg my-4">
      {children}
    </div>
  );
};

export default Card;
