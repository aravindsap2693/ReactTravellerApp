import React from 'react';

interface HotelCardProps {
  backdrop: string;
}

const Card: React.FC<HotelCardProps> = ({ backdrop }) => {
  return (
    <div style={{ color: 'lightgrey' }}>
      {backdrop} upcoming
    </div>
  );
};

export default Card;
