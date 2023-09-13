import React, {useEffect, useState} from 'react';

export default function SubHeader({msg}) {
  const [ msgIndex, setMsgIndex ] = useState(0);
  const [ text, setText ] = useState(" ");
  const [ bold, setBold ] = useState(false)

  useEffect(() => {
    if (!msg[msgIndex]) return;
    const interval = msg[msgIndex - 1] === "." ? 500 : 55; // pause on end of sentence.
    const typeChars = setInterval(() => {
      setText(prevText => prevText += msg[msgIndex]);
      setMsgIndex(prevMsgIndex => prevMsgIndex += 1);
    }, interval);
    return () => clearInterval(typeChars);
  }, [msgIndex])

  useEffect(() => {
    setBold(true)
    console.log('true')
  }, [msgIndex === msg.length])

  return (
    <h1 className="h-10 font-mono text-center text-4xl ">
          { 
            msgIndex === msg.length && text.split(" ").map((str, index) => {
              const key = str + index
              if (!str.includes(".")) return <span key={key} className="font-extrabold">{str + " "}</span>
              else return str + " ";
            })
            ||
            text
          }
        </h1>
  )
}