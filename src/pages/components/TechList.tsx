import React, { useState, forwardRef, type MutableRefObject } from "react";
import * as Accordion from "@radix-ui/react-accordion";

const TechList = ({ categories }) => {
  const list = Object.keys(categories).map(
    (category: string, index: number) => (
      <Accordion.Root
        key={category + index}
        className="text-2xl"
        type="multiple"
      >
        <AccordionItem categories={categories} category={category} />{" "}
      </Accordion.Root>
    ),
  );
  return <ul>{list}</ul>;
};

interface AccordionList {
  items: string[];
  open: boolean;
}

const AccordionedList = ({ items, open }: AccordionList) => {
  const list = items.map((item, index) => {
    const lastItem = index === items.length - 1 ? true : false;
    return (
      <div
        key={`item${index}`}
        className={`flex items-center border-l-2 border-gray-300 text-lg text-gray-600 ${
          lastItem
            ? "before:absolute before:z-10 before:h-4 before:w-1 before:-translate-x-1 before:translate-y-[56%] before:bg-white"
            : ""
        } translate-x-4`}
      >
        <div className="h-0.5 w-8 bg-gray-300" />
        &nbsp;{item}
      </div>
    );
  });
  return <AccordionContent>{list}</AccordionContent>;
};

const AccordionItem = ({ category, categories }) => {
  const [open, setOpen] = useState(false);
  const handleSetOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };
  return (
    <Accordion.Item className="overflow-hidden" value={category}>
      <AccordionTrigger handleSetOpen={handleSetOpen}>
        {category}
      </AccordionTrigger>
      <AccordionedList
        open={open}
        items={categories[category]}
      ></AccordionedList>
    </Accordion.Item>
  );
};

interface AccordionI {
  lastItem?: boolean;
  handleSetOpen?: () => void;
  children: string;
  open?: boolean;
}

const AccordionTrigger = forwardRef(
  (
    { children, handleSetOpen, ...props }: AccordionI,
    forwardedRef: MutableRefObject<HTMLButtonElement>,
  ) => (
    <Accordion.Header>
      <Accordion.Trigger
        onClick={() => handleSetOpen()}
        {...props}
        ref={forwardedRef}
      >
        +{children}
      </Accordion.Trigger>
    </Accordion.Header>
  ),
);

const AccordionContent = forwardRef(
  ({ children, ...props }, forwardRef: MutableRefObject<HTMLDivElement>) => {
    return (
      <Accordion.Content
        className="overflow:hidden radix-state-open:animate-open-accordion radix-state-closed:animate-close-accordion"
        {...props}
        ref={forwardRef}
      >
        {children}
      </Accordion.Content>
    );
  },
);

export default TechList;
