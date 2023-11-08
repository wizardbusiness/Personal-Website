/* empty css                                 */import { c as createAstro, a as createComponent, r as renderTemplate, f as renderComponent } from '../astro_0ad4388a.mjs';
import 'clsx';
import { $ as $$MainLayout } from './MainContent_fab9d874.mjs';
import $$LandingPage from './LandingPage_3e4c0181.mjs';
import 'html-escaper';
import './Nav_0b8c846b.mjs';
import 'svgo';
import 'react/jsx-runtime';
import 'react';
import '@radix-ui/react-toast';
import '@radix-ui/react-icons';
import './ScrollToPageBtn_4ffd9ec6.mjs';
/* empty css                                 */import './About_e02aa6b1.mjs';
import './Portfolio_d3cbf07a.mjs';
import './Tech_9d6f51a1.mjs';
import '@radix-ui/react-accordion';
/* empty css                                 */import './Avatar_c9b4b30b.mjs';
import '@astrojs/internal-helpers/path';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "page": ($$result2) => renderTemplate`${renderComponent($$result2, "LandingPage", $$LandingPage, { "slot": "page" })}` })}`;
}, "/Users/gabriel/Documents/projects/Personal-Website/src/pages/index.astro", void 0);

const $$file = "/Users/gabriel/Documents/projects/Personal-Website/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
