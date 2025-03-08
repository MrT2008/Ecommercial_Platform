
import React from 'react'

const Button = ({text="Button", 
  color="text-black", id="", 
  otherClassName="", 
  type="" as "submit" | "reset" | "button" | undefined,}) => {
  return (
    <button 
    className={`button px-4 py-2 rounded-3xl cursor-pointer font-medium ${color} ${otherClassName}`}
    id={id}
    type={type}
    onClick={() => console.log("Button Clicked")}
    // Direct the button to another page 
    >
        {text}
    </button>
  )
}

export default Button