import React, { useState, useEffect } from "react";
import Cursor from "./Cursor";

const TaglineMsg = ({ msg, blinkCursor }) => {
  const [text, setText] = useState(" ");
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (!msg[msgIndex]) return;
    const interval = msg[msgIndex - 1] === "." ? 500 : 55; // pause on end of sentence.
    const typeChars = setInterval(() => {
      setText((prevText) => (prevText += msg[msgIndex]));
      setMsgIndex((prevMsgIndex) => (prevMsgIndex += 1));
    }, interval);
    return () => clearInterval(typeChars);
  }, [msgIndex]);

  return (
    <div className="flex items-center gap-2">
      <h1 className="no-wrap h-fit text-center font-mono text-xl lg:text-3xl">
        {(msgIndex === msg.length &&
          text.split(" ").map((str, index) => {
            const key = str + index;
            if (!str.includes("."))
              return (
                <span key={key} className="font-extrabold">
                  {str + " "}
                </span>
              );
            else return str + " ";
          })) ||
          text}
      </h1>
      <Cursor animStart={blinkCursor && msgIndex === msg.length} />
    </div>
  );
};

export default TaglineMsg;
