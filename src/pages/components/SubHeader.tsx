import React, { useEffect, useState, useMemo } from "react";
import Cursor from "./Cursor";
import Skyline from "./Skyline";
import "../../styles/cityscapeStyles.css";

export default function SubHeader({ msg, renderSkyline }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [text, setText] = useState(" ");

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
    <div className="before:h-32 before:w-full before:rounded-md before:bg-foggy-glass relative flex h-32 w-2/5 translate-x-1 items-center justify-center gap-2 rounded-md text-gray-100 shadow-lg">
      <div className="absolute flex gap-2">
        <h1 className="no-wrap h-10 text-center font-mono text-4xl">
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
        <Cursor animStart={msgIndex === msg.length} />
      </div>
    </div>
  );
}
