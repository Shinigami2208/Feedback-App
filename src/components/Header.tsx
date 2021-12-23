import React from 'react'

interface Props {
  text: string,
  bgColor: string,
  textColor: string,
}

const Header = ({ text, bgColor, textColor }: Props) => {
  const headerStyle = {
    backgroundColor: bgColor,
    color: textColor,
  }
  return (
    <header style={headerStyle}>
      <div className="container">
        <h2>{text}</h2>
      </div>
    </header>
  )
}
export default Header
