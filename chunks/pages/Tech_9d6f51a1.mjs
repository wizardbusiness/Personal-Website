/* empty css                                 */import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, f as renderComponent } from '../astro_0ad4388a.mjs';
import 'clsx';
import { jsx, jsxs } from 'react/jsx-runtime';
import { forwardRef, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import 'html-escaper';

const TechList = ({ categories }) => {
  const list = Object.keys(categories).map(
    (category, index) => /* @__PURE__ */ jsxs(
      Accordion.Root,
      {
        className: "text-2xl",
        type: "multiple",
        children: [
          /* @__PURE__ */ jsx(AccordionedList, { categories, category }),
          " "
        ]
      },
      category + index
    )
  );
  return /* @__PURE__ */ jsx("ul", { children: list });
};
const AccordionedList = ({ categories, category }) => {
  const [open, setOpen] = useState(false);
  const handleSetOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };
  return /* @__PURE__ */ jsxs(Accordion.Item, { className: "overflow-hidden", value: category, children: [
    /* @__PURE__ */ jsx(AccordionTrigger, { handleSetOpen, children: category }),
    /* @__PURE__ */ jsx(AccordionedListItems, { items: categories[category] })
  ] });
};
const AccordionTrigger = forwardRef(
  ({ children, handleSetOpen, ...props }, forwardedRef) => /* @__PURE__ */ jsx(Accordion.Header, { children: /* @__PURE__ */ jsxs(
    Accordion.Trigger,
    {
      onClick: () => handleSetOpen(),
      ...props,
      ref: forwardedRef,
      children: [
        "+",
        children
      ]
    }
  ) })
);
const AccordionedListItems = ({ items }) => {
  const list = items.map((item, index) => {
    const lastItem = index === items.length - 1 ? true : false;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: `flex items-center border-l-2 border-gray-300 text-lg text-gray-600 ${lastItem ? "before:absolute before:z-10 before:h-4 before:w-1 before:-translate-x-1 before:translate-y-[56%] before:bg-white" : ""} translate-x-4`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "h-0.5 w-8 bg-gray-300" }),
          " ",
          item
        ]
      },
      `item${index}`
    );
  });
  return /* @__PURE__ */ jsx(AccordionContent, { children: list });
};
const AccordionContent = forwardRef(
  ({ children, ...props }, forwardRef2) => {
    return /* @__PURE__ */ jsx(
      Accordion.Content,
      {
        className: "overflow:hidden radix-state-open:animate-open-accordion radix-state-closed:animate-close-accordion",
        ...props,
        ref: forwardRef2,
        children
      }
    );
  }
);

const $$Astro = createAstro();
const $$Tech = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Tech;
  const categories = {
    Languages: ["Typescript", "Javascript ES6+", "Python", "SQL", "HTML/CSS"],
    Runtimes: ["Node.js", "Electron.js"],
    "Frameworks/Libraries": [
      "React.js",
      "Redux",
      "Astro",
      "MaterialUI",
      "RadixUI",
      "Express.js"
    ],
    Testing: ["Jest", "Testing Library", "Selenium", "Puppeteer"]
  };
  return renderTemplate`${maybeRenderHead()}<div><h2 class="pb-3 font-mono text-3xl font-semibold">Tech I Use</h2>${renderComponent($$result, "TechList", TechList, { "client:load": true, "categories": categories, "client:component-hydration": "load", "client:component-path": "/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/TechList.tsx", "client:component-export": "default" })}</div>`;
}, "/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/Tech.astro", void 0);

const $$file = "/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/Tech.astro";
const $$url = "/components/Tech";

export { $$Tech as default, $$file as file, $$url as url };
