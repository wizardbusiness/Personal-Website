import React, { forwardRef, type MutableRefObject } from "react";
import * as Accordion from '@radix-ui/react-accordion';

interface AccordionList {
  items: string[];
}

const AccordionList = ({items}: AccordionList) => (
  items.map((item, index) => 
    <AccordionContent key={`${item}${index}`}>{item}</AccordionContent>)
);
  
const TechList = ({ categories }) => {
  const list = categories.map((category: string, index: number) => (
    <Accordion.Root key={category + index} className="text-2xl" type="multiple">
      <Accordion.Item value={category}>
        <AccordionTrigger>{category}</AccordionTrigger>
        <AccordionList items={['react', 'javascript', 'typescript']}></AccordionList>
      </Accordion.Item>
      {" "}
    </Accordion.Root>
  ));
  return <ul>{list}</ul>;
};

interface AccordionI {
  children: string,
}

const AccordionTrigger = forwardRef(({ children, ...props }: AccordionI, forwardedRef: MutableRefObject<HTMLButtonElement>) => (
  <Accordion.Header>
    <Accordion.Trigger 
      {...props}
      ref={forwardedRef}
    >
      +
      {children}
    </Accordion.Trigger>
  </Accordion.Header>
));


const AccordionContent = forwardRef(({ children, ...props}: AccordionI, forwardRef: MutableRefObject<HTMLDivElement>) => (
  <Accordion.Content
    {...props}
    ref={forwardRef}
  >
    <div>{children}</div>
  </Accordion.Content>
))



export default TechList;
