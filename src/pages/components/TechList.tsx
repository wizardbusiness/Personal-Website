import React from 'react';

const TechList = ({categories}) => {
  const list = categories.map((category: string) => <li className='text-xl'> + {category}</li>)
  return (
    <ul>
      {list}
    </ul>
  )
}

export default TechList