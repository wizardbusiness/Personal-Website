import React, { forwardRef, type MutableRefObject } from "react";
import * as Accordion from "@radix-ui/react-accordion";

const TechList = ({ categories }) => {
  const list = Object.keys(categories).map(
    (category: string, index: number) => (
      <Accordion.Root
        key={category + index}
        className="text-2xl"
        type="multiple"
      >
        <Accordion.Item value={category}>
          <AccordionTrigger>{category}</AccordionTrigger>
          <AccordionList items={categories[category]}></AccordionList>
        </Accordion.Item>{" "}
      </Accordion.Root>
    ),
  );
  return <ul>{list}</ul>;
};

interface AccordionI {
  lastItem?: boolean;
  children: string;
}

const AccordionTrigger = forwardRef(
  (
    { children, ...props }: AccordionI,
    forwardedRef: MutableRefObject<HTMLButtonElement>,
  ) => (
    <Accordion.Header>
      <Accordion.Trigger {...props} ref={forwardedRef}>
        +{children}
      </Accordion.Trigger>
    </Accordion.Header>
  ),
);

interface AccordionList {
  items: string[];
}

const AccordionList = ({ items }: AccordionList) =>
  items.map((item, index) => {
    const lastItem = index === items.length - 1 ? true : false;
    return (
      <AccordionContent lastItem={lastItem} key={`${item}${index}`}>
        {item}
      </AccordionContent>
    );
  });

const AccordionContent = forwardRef(
  (
    { children, lastItem, ...props }: AccordionI,
    forwardRef: MutableRefObject<HTMLDivElement>,
  ) => (
    <Accordion.Content {...props} ref={forwardRef}>
      <div
        className={`flex items-center border-l-2 border-gray-300 text-lg text-gray-600 ${
          lastItem
            ? "before:absolute before:z-10 before:h-4 before:w-1 before:-translate-x-1 before:translate-y-[56%] before:bg-white"
            : ""
        } translate-x-4`}
      >
        <div className="h-0.5 w-8 bg-gray-300" />
        &nbsp;{children}
      </div>
    </Accordion.Content>
  ),
);

export default TechList;
