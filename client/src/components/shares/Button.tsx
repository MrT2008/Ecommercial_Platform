
import React from 'react'

const Button = ({text="Button", 
  color="text-black", 
  otherClassName="", 
  type="" as "submit" | "reset" | "button" | undefined,
  href="",
  onClick = () => {}
  }) => {
    const ButtonElement = () => {
      return (
        <button 
        className={`button px-4 py-2 rounded-3xl cursor-pointer font-medium ${color} ${otherClassName}`}
        type={type}
        onClick={onClick}
        >
            {text}
        </button>
      )
    }
  return href ? <a href={href} title={text}><ButtonElement /></a> : <ButtonElement />
}

export default Button