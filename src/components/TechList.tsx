import React, {
  useState,
  forwardRef,
  useEffect,
  type MutableRefObject,
} from "react";
import * as Accordion from "@radix-ui/react-accordion";
import AccordionBtnIcon from "./AccordionBtn";

interface TechList {
  categories: categories;
}

interface categories {
  [name: category]: categoryItems;
}

type category = string;
type categoryItems = string[];

const TechList = ({ categories }: TechList) => {
  const [openItems, setOpenItems] = useState([]);
  const [openAll, setOpenAll] = useState(false);

  useEffect(() => {
    openAll === true ? setOpenItems(allValues) : setOpenItems([]);
  }, [openAll]);

  useEffect(() => {
    if (openItems.length === allValues.length) setOpenAll(true);
    else if (openItems.length === 0) setOpenAll(false);
  }, [openItems]);

  const allValues = Object.keys(categories);

  const handleSetOpenAll = () => {
    setOpenAll(!openAll);
    // setOpenItems((prev) => (prev.length === 0 ? allValues : []));
  };
  const list = Object.keys(categories).map(
    (category: string, index: number) => (
      <AccordionedList
        value={category}
        key={category + index}
        categories={categories}
        category={category}
        openItems={openItems}
        openAll={openAll}
      />
    ),
  );

  return (
    <div data-tech-list className="pl-2 pt-6">
      <button
        data-open-all={openAll}
        onClick={handleSetOpenAll}
        className="lg:text-4xl"
      >
        <AccordionBtnIcon height={20} width={20} active={openAll} />
      </button>
      <Accordion.Root
        value={openItems}
        onValueChange={setOpenItems}
        className="text-xl leading-relaxed lg:text-2xl"
        type="multiple"
      >
        {list}
      </Accordion.Root>
    </div>
  );
};

interface AccordionedList {
  categories: categories;
  category: category;
  openAll: boolean;
  openItems: string[];
  value: string;
}

const AccordionedList = ({
  categories,
  category,
  openItems,
  value,
}: AccordionedList) => {
  return (
    <Accordion.Item className="h-fit overflow-hidden pl-1" value={value}>
      <AccordionTrigger open={openItems.includes(value)}>
        {category}
      </AccordionTrigger>
      <AccordionedListItems items={categories[category]}></AccordionedListItems>
    </Accordion.Item>
  );
};

interface AccordionTrigger {
  open: boolean;
  children: string;
}

const AccordionTrigger = forwardRef(
  (
    { children, open, ...props }: AccordionTrigger,
    forwardedRef: MutableRefObject<HTMLButtonElement>,
  ) => (
    <Accordion.Header>
      <Accordion.Trigger {...props} ref={forwardedRef}>
        <span className="flex items-center gap-2">
          <AccordionBtnIcon height={15} width={15} active={open} />
          {children}
        </span>
      </Accordion.Trigger>
    </Accordion.Header>
  ),
);

interface AccordionedListItemsProps {
  items: categoryItems;
  category?: string;
}

const AccordionedListItems = ({
  items,
  category,
}: AccordionedListItemsProps) => {
  const list = items.map((item, index) => {
    const lastItem = index === items.length - 1 ? true : false;
    return (
      <div
        key={`item${index}`}
        className={`flex items-center border-l-2 border-gray-300 text-lg text-gray-200 ${
          lastItem
            ? "before:absolute before:h-4 before:w-2 before:-translate-x-1 before:translate-y-[57%] before:bg-blue-smoke"
            : ""
        } translate-x-4`}
      >
        <div
          id={`${category ? "last-sect" : null}`}
          className="h-0.5 w-8 bg-gray-300"
        />
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
