
import React from 'react'

const Button = ({
  text="Button", 
  color="text-black", id="", 
  otherClassName="", 
  type="" as "submit" | "reset" | "button" | undefined,
  href=""
  }) => {
  return (
    <a href={href}>
        <button 
        className={`button px-4 py-2 rounded-3xl cursor-pointer font-medium ${color} ${otherClassName}`}
        id={id}
        type={type}
        style={{
          backgroundColor: '#FFBD4B',
          color: '#000144'
        }}
        >
            {text}
        </button>
    </a>
  )
}

export default Button