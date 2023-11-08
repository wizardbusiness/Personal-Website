/* empty css                                 */import { c as createAstro, a as createComponent, r as renderTemplate, e as addAttribute, f as renderComponent, i as renderHead, m as maybeRenderHead, g as renderSlot } from '../astro_0ad4388a.mjs';
import 'clsx';
import { $ as $$Nav } from './Nav_0b8c846b.mjs';
import $$ScrollToPageBtn from './ScrollToPageBtn_4ffd9ec6.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useMemo, useState, useEffect } from 'react';
/* empty css                                 */import $$About from './About_e02aa6b1.mjs';
import $$Portfolio from './Portfolio_d3cbf07a.mjs';
import $$Tech from './Tech_9d6f51a1.mjs';
/* empty css                                 */
const $$Astro$4 = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/gabriel/Documents/projects/Personal-Website/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$3 = createAstro();
const $$CommonHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$CommonHead;
  return renderTemplate`<head><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta charset="utf-8"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Lunar Dev</title><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="my personal site">${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head>`;
}, "/Users/gabriel/Documents/projects/Personal-Website/src/layouts/CommonHead.astro", void 0);

const $$Astro$2 = createAstro();
const $$MainLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$MainLayout;
  return renderTemplate`<html class="w-full">${renderComponent($$result, "CommonHead", $$CommonHead, {})}${maybeRenderHead()}<body class="flex h-screen w-full flex-grow justify-center bg-slate-800 font-sans">${renderSlot($$result, $$slots["page"])}</body></html>`;
}, "/Users/gabriel/Documents/projects/Personal-Website/src/layouts/main-layout.astro", void 0);

const $$Astro$1 = createAstro();
const $$ContentLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ContentLayout;
  return renderTemplate`${maybeRenderHead()}<main class="flex h-full w-full flex-col items-center overflow-scroll p-8 pb-0 pt-4"><header class="flex w-full">${renderSlot($$result, $$slots["nav"])}</header>${renderSlot($$result, $$slots["subheader"])}<div data-info-container class="animate-impact flex h-full flex-col gap-8 bg-white p-8 text-gray-600 shadow-xl">${renderSlot($$result, $$slots["about"])}${renderSlot($$result, $$slots["portfolio"])}${renderSlot($$result, $$slots["tech"])}</div></main>`;
}, "/Users/gabriel/Documents/projects/Personal-Website/src/layouts/content-layout.astro", void 0);

const Cursor = ({ animStart }) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `inline-block h-8 w-4 bg-gray-100 ${animStart && "animate-blinking-cursor"}`
    }
  );
};

const createSkylineBg = (numStructs, direction) => {
  const structs = [];
  let i = 0;
  while (i < numStructs) {
    structs.push(
      /* @__PURE__ */ jsx(
        SkylineShape,
        {
          delay: i,
          baseHeight: i % 3 * 10,
          direction
        },
        `struct${i}`
      )
    );
    i++;
  }
  return structs;
};
function SkylineShape({ delay, baseHeight, direction }) {
  const [addedClass, setAddedClass] = useState("");
  useEffect(() => {
    setAddedClass("build");
  }, []);
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const width = `${randomIntFromInterval(10, 30)}px`;
  const height = `${randomIntFromInterval(30, 70) + baseHeight}px`;
  const shapeStyles = {
    height,
    width,
    clipPath: `polygon(12% 0, 92% 0, 92% 50%, 92% 100%, 12% 100%, 12% 50%)`,
    transitionDelay: direction === "right" ? `${400 - delay * 200}ms` : `${delay * 200}ms`
  };
  return /* @__PURE__ */ jsx("div", { "data-effect": true, style: shapeStyles, className: `structure bg-slate-100` });
}
const Skyline = () => {
  const skylineLeft = useMemo(() => createSkylineBg(3, "left"), []);
  const skylineRight = useMemo(() => createSkylineBg(3, "right"), []);
  return /* @__PURE__ */ jsxs("div", { "data-effect-container": true, className: "absolute h-32 w-1/2", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-2 flex items-end gap-2 self-end", children: skylineLeft }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-2 flex items-end gap-2 self-end", children: skylineRight })
  ] });
};

function SubHeader({ msg, blinkCursor }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [text, setText] = useState(" ");
  useEffect(() => {
    if (!msg[msgIndex])
      return;
    const interval = msg[msgIndex - 1] === "." ? 500 : 55;
    const typeChars = setInterval(() => {
      setText((prevText) => prevText += msg[msgIndex]);
      setMsgIndex((prevMsgIndex) => prevMsgIndex += 1);
    }, interval);
    return () => clearInterval(typeChars);
  }, [msgIndex]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-subheader": true,
      className: "relative flex h-32 w-2/5 translate-x-1 items-center justify-center gap-2 whitespace-nowrap text-gray-100 before:h-32 before:w-full before:animate-squish-down before:rounded-md before:bg-foggy-glass",
      children: /* @__PURE__ */ jsxs("div", { className: "absolute flex flex-nowrap gap-2", children: [
        /* @__PURE__ */ jsx("h1", { className: "no-wrap h-10 text-center font-mono text-4xl", children: msgIndex === msg.length && text.split(" ").map((str, index) => {
          const key = str + index;
          if (!str.includes("."))
            return /* @__PURE__ */ jsx("span", { className: "font-extrabold", children: str + " " }, key);
          else
            return str + " ";
        }) || text }),
        /* @__PURE__ */ jsx(Cursor, { animStart: blinkCursor && msgIndex === msg.length })
      ] })
    }
  );
}

const $$Astro = createAstro();
const $$MainContent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainContent;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "page": ($$result2) => renderTemplate`${renderComponent($$result2, "ContentLayout", $$ContentLayout, { "data-info-page": true, "slot": "page" }, { "about": ($$result3) => renderTemplate`${renderComponent($$result3, "About", $$About, { "slot": "about" })}`, "nav": ($$result3) => renderTemplate`${renderComponent($$result3, "Nav", $$Nav, { "slot": "nav" }, { "default": ($$result4) => renderTemplate`${maybeRenderHead()}<div data-scrollable class="h-1/2 w-fit self-center justify-self-center">${renderComponent($$result4, "ScrollToPageBtn", $$ScrollToPageBtn, { "scrollDirection": "up", "url": "/" })}</div>` })}`, "portfolio": ($$result3) => renderTemplate`${renderComponent($$result3, "Portfolio", $$Portfolio, { "slot": "portfolio" })}`, "subheader": ($$result3) => renderTemplate`<div data-subheader-main class="relative z-10 flex h-32 w-2/3 animate-fall-to justify-center">${renderComponent($$result3, "Skyline", Skyline, {})}${renderComponent($$result3, "SubHeader", SubHeader, { "blinkCursor": false, "msg": "Dream it. Build it.", "client:load": true, "data-astro-transition-persist": "subheader", "client:component-hydration": "load", "client:component-path": "/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/SubHeader", "client:component-export": "default" })}</div>`, "tech": ($$result3) => renderTemplate`${renderComponent($$result3, "Tech", $$Tech, { "slot": "tech" })}` })}` })}`;
}, "/Users/gabriel/Documents/projects/Personal-Website/src/pages/MainContent.astro", "self");

const $$file = "/Users/gabriel/Documents/projects/Personal-Website/src/pages/MainContent.astro";
const $$url = "/MainContent";

const MainContent = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$MainContent,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$MainLayout as $, MainContent as M };
