/* empty css                                 */import { c as createAstro, a as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead } from '../astro_0ad4388a.mjs';
import 'clsx';
import { $ as $$MainLayout } from './MainContent_fab9d874.mjs';
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
/* empty css                                 */
const $$Astro = createAstro();
const $$Resume = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Resume;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "page": ($$result2) => renderTemplate`${maybeRenderHead()}<embed src="src/images/GabrielKimeResume.pdf" type="application/pdf" width="100%" height="100%">` })}`;
}, "/Users/gabriel/Documents/projects/Personal-Website/src/pages/Resume.astro", void 0);

const $$file = "/Users/gabriel/Documents/projects/Personal-Website/src/pages/Resume.astro";
const $$url = "/Resume";

export { $$Resume as default, $$file as file, $$url as url };
