import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <img src="/Thumb.png" alt="REVOFF" className="h-12" />
    </Link>
  );
};

export default Logo;