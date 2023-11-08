/* empty css                                 */import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead } from '../astro_0ad4388a.mjs';
import 'clsx';
import 'html-escaper';

const $$Astro = createAstro();
const $$Portfolio = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Portfolio;
  return renderTemplate`${maybeRenderHead()}<div><h2 class="font-mono font-semibold text-3xl">Constructions</h2><div class="flex gap-2 text-2xl"><a>Stewpot</a><a>Plantr</a><a>SeeQr</a></div></div>`;
}, "/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/Portfolio.astro", void 0);

const $$file = "/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/Portfolio.astro";
const $$url = "/components/Portfolio";

export { $$Portfolio as default, $$file as file, $$url as url };
