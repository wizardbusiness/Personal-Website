import React from "react";

const TechList = ({ categories }) => {
  const list = categories.map((category: string, index: number) => (
    <li key={category + index} className="text-xl">
      {" "}
      + {category}
    </li>
  ));
  return <ul>{list}</ul>;
};

export default TechList;
