/* empty css                                 */import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, f as renderComponent } from '../astro_0ad4388a.mjs';
import { a as $$Icon } from './Nav_0b8c846b.mjs';
import 'clsx';
import 'html-escaper';
import 'svgo';
import 'react/jsx-runtime';
import 'react';
import '@radix-ui/react-toast';
import '@radix-ui/react-icons';

const $$Astro = createAstro();
const $$ScrollToPageBtn = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ScrollToPageBtn;
  const { url, scrollDirection } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")}${addAttribute(scrollDirection, "data-scroll-btn")} class="flex w-20 animate-pulse cursor-pointer flex-col items-center justify-self-start text-gray-400 hover:animate-none"><span class="m-0 translate-y-3 text-lg">Scroll</span>${renderComponent($$result, "Icon", $$Icon, { "pack": "ph", "name": `caret-${scrollDirection}`, "height": "60", "width": "60", "class": "text-gray-100" })}</a>`;
}, "/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/ScrollToPageBtn.astro", void 0);

const $$file = "/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/ScrollToPageBtn.astro";
const $$url = "/components/ScrollToPageBtn";

export { $$ScrollToPageBtn as default, $$file as file, $$url as url };
