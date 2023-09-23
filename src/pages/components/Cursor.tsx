import React from 'react'

const Cursor = ({ animStart }) => {
  return (
    <div
      className={`inline-block h-8 w-4 bg-gray-100 ${
        animStart && 'animate-blinking-cursor'
      }`}
    />
  )
}

export default Cursor
