/* empty css                                 */import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead } from '../astro_0ad4388a.mjs';
import 'clsx';
import 'html-escaper';

const $$Astro = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${maybeRenderHead()}<div><h2 class="font-mono font-semibold text-3xl pb-2">About Me</h2><p class="font-light text-2xl">
Hi, I'm <b>Gabriel</b>! I'm a full-stack software engineer who loves creating interesting apps and websites!
    You dream it, I'll handle the rest!
</p></div>`;
}, "/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/About.astro", void 0);

const $$file = "/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/About.astro";
const $$url = "/components/About";

export { $$About as default, $$file as file, $$url as url };
