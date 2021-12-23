import React from 'react'

type ButtonType = 'button' | 'submit' | 'reset' | undefined

interface Props {
  children: React.ReactNode
  version: string
  type: ButtonType
  isDisabled: boolean
}
const Button = ({ children, version, type, isDisabled }: Props) => {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  version: 'primary',
  type: 'button',
  isDisabled: false,
}

export default Button
