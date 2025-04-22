import React from 'react';

type ButtonProps = {
  text?: string;
  color?: string;
  id?: string;
  otherClassName?: string;
  type?: 'submit' | 'reset' | 'button';
  href?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text = 'Button',
  color = 'text-black',
  id = '',
  otherClassName = '',
  type = 'button',
  href = '',
  onClick = () => {}
}) => {
  // Common button styles
  const baseClasses = 'px-4 py-2 rounded-3xl cursor-pointer font-medium';
  
  // Render as link if href is provided
  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${color} ${otherClassName}`} id={id}>
        {text}
      </a>
    );
  }

  // Default button
  return (
    <button
      className={`${baseClasses} ${color} ${otherClassName}`}
      id={id}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;