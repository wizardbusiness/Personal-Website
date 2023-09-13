import React from 'react'

const Cursor = ({animStart}) => {
  return (
    <div className={`h-8 w-4 bg-black ${animStart && 'animate-blinking-cursor'}`} />
  )
}

export default Cursor

