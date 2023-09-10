import React, {useEffect, useState} from 'react';

export default function SubHeader({msg}) {
  const [ msgIndex, setMsgIndex ] = useState(0);
  const [ text, setText ] = useState('');

  useEffect(() => {
    if (!msg[msgIndex]) return
    const typeChars = setInterval(() => {
      setText(prevText => prevText += msg[msgIndex]);
      setMsgIndex(prevMsgIndex => prevMsgIndex += 1);
    }, 100);
    return () => clearInterval(typeChars);
  }, [])

  return (
      <h1>
        {text}
      </h1>

  )
}