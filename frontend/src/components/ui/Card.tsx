import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
}) => {
  return (
    <div className={`card ${className}`}>
      {title && (
        <h2 className="card-title">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Card; 