import React, { useState, forwardRef, type MutableRefObject } from "react";
import * as Accordion from "@radix-ui/react-accordion";

type category = string;
type categoryItems = string[];

interface categories {
  [name: category]: categoryItems;
}

interface TechList {
  categories: categories;
}

const TechList = ({ categories }: TechList) => {
  const list = Object.keys(categories).map(
    (category: string, index: number) => (
      <Accordion.Root
        key={category + index}
        className="text-2xl leading-relaxed"
        type="multiple"
      >
        <AccordionedList categories={categories} category={category} />{" "}
      </Accordion.Root>
    ),
  );
  return <ul>{list}</ul>;
};

interface AccordionedListProps {
  categories: categories;
  category: category;
}

const AccordionedList = ({ categories, category }: AccordionedListProps) => {
  const [open, setOpen] = useState(false);
  const handleSetOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };
  return (
    <Accordion.Item className="overflow-hidden" value={category}>
      <AccordionTrigger handleSetOpen={handleSetOpen}>
        {category}
      </AccordionTrigger>
      <AccordionedListItems items={categories[category]}></AccordionedListItems>
    </Accordion.Item>
  );
};

interface AccordionTrigger {
  handleSetOpen: () => void;
  children: string;
}

const AccordionTrigger = forwardRef(
  (
    { children, handleSetOpen, ...props }: AccordionTrigger,
    forwardedRef: MutableRefObject<HTMLButtonElement>,
  ) => (
    <Accordion.Header>
      <Accordion.Trigger
        onClick={() => handleSetOpen()}
        {...props}
        ref={forwardedRef}
      >
        + {children}
      </Accordion.Trigger>
    </Accordion.Header>
  ),
);

interface AccordionedListItemsProps {
  items: categoryItems;
}

const AccordionedListItems = ({ items }: AccordionedListItemsProps) => {
  const list = items.map((item, index) => {
    const lastItem = index === items.length - 1 ? true : false;
    return (
      <div
        key={`item${index}`}
        className={`flex items-center border-l-2 border-gray-300 text-lg text-gray-200 ${
          lastItem
            ? "before:absolute before:z-10 before:h-4 before:w-1 before:-translate-x-1 before:translate-y-[56%] before:bg-slate-600"
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

interface AccordionContentProps {
  children: JSX.Element[];
}

const AccordionContent = forwardRef(
  (
    { children, ...props }: AccordionContentProps,
    forwardRef: MutableRefObject<HTMLDivElement>,
  ) => {
    return (
      <Accordion.Content
        className="overflow:hidden radix-state-closed:animate-close-accordion radix-state-open:animate-open-accordion"
        {...props}
        ref={forwardRef}
      >
        {children}
      </Accordion.Content>
    );
  },
);

export default TechList;
