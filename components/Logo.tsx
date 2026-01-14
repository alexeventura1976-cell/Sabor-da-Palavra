
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <img 
      src="logo.png" 
      alt="Sabor da Palavra Logo" 
      className={`${className} object-contain`}
      onError={(e) => {
        // Fallback caso o arquivo logo.png ainda não tenha sido enviado para a pasta
        e.currentTarget.src = 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/sabor-da-palavra-logo-placeholder.png';
        e.currentTarget.className += " opacity-50 grayscale";
      }}
    />
  );
};

export default Logo;
