/* empty css                                 */import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, g as renderSlot, f as renderComponent, e as addAttribute, h as renderTransition } from '../astro_0ad4388a.mjs';
import 'clsx';
import $$ScrollToPageBtn from './ScrollToPageBtn_4ffd9ec6.mjs';
import { $ as $$Nav } from './Nav_0b8c846b.mjs';
import { $ as $$Avatar } from './Avatar_c9b4b30b.mjs';
/* empty css                                 */import 'html-escaper';
import 'svgo';
import 'react/jsx-runtime';
import 'react';
import '@radix-ui/react-toast';
import '@radix-ui/react-icons';
import '@astrojs/internal-helpers/path';

const $$Astro$1 = createAstro();
const $$LandingPgLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LandingPgLayout;
  return renderTemplate`${maybeRenderHead()}<main class="flex flex-col items-center w-full p-8 pt-4 h-full">${renderSlot($$result, $$slots["nav"])}${renderSlot($$result, $$slots["avatar"])}<div class="text-gray-200 p-8"><h1 class="font-mono text-9xl text-center tracking-tighter p-3">Gabriel Kime</h1><h2 class="font-mono text-4xl text-center tracking-tighter p-3">Full-Stack Developer</h2></div>${renderSlot($$result, $$slots["subheader"])}${renderSlot($$result, $$slots["scroll-down"])}</main>`;
}, "/Users/gabriel/Documents/projects/Personal-Website/src/layouts/landing-pg-layout.astro", void 0);

const $$Astro = createAstro();
const $$LandingPage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LandingPage;
  const anim = {
    old: {
      name: "riseto",
      duration: "0.5s",
      easing: "ease-out",
      fillMode: "forwards"
    },
    new: {
      name: "riseto",
      duration: "0.5s",
      easing: "ease-out",
      fillMode: "forwards"
    }
  };
  const rise = {
    forwards: anim,
    backwards: anim
  };
  return renderTemplate`${renderComponent($$result, "LandingPgLayout", $$LandingPgLayout, {}, { "avatar": ($$result2) => renderTemplate`${renderComponent($$result2, "Avatar", $$Avatar, { "slot": "avatar", "imgSrc": "src/images/BeachHeadshotB&W.png" })}`, "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="animate-rise-to"></div>`, "nav": ($$result2) => renderTemplate`${renderComponent($$result2, "Nav", $$Nav, { "slot": "nav" })}`, "scroll-down": ($$result2) => renderTemplate`<div class="translate-y-32">${renderComponent($$result2, "ScrollToPageBtn", $$ScrollToPageBtn, { "url": "/MainContent", "scrollDirection": "down" })}</div>`, "subheader": ($$result2) => renderTemplate`<div data-subheader-landing class="flex h-32 w-2/3 justify-center"${addAttribute(renderTransition($$result2, "r2e67boh", rise, ""), "data-astro-transition-scope")}>${renderComponent($$result2, "SubHeader", null, { "blinkCursor": true, "msg": "Dream it. Build it.", "client:only": true, "data-astro-transition-persist": "subheader", "client:component-hydration": "only", "client:component-path": "/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/SubHeader", "client:component-export": "default" })}</div>` })}`;
}, "/Users/gabriel/Documents/projects/Personal-Website/src/pages/LandingPage.astro", "self");

const $$file = "/Users/gabriel/Documents/projects/Personal-Website/src/pages/LandingPage.astro";
const $$url = "/LandingPage";

export { $$LandingPage as default, $$file as file, $$url as url };
