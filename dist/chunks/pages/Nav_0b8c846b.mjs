/* empty css                                 */import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, e as addAttribute, u as unescapeHTML, f as renderComponent, F as Fragment, g as renderSlot } from '../astro_0ad4388a.mjs';
import 'clsx';
import { optimize } from 'svgo';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { ClipboardIcon, CrossCircledIcon } from '@radix-ui/react-icons';

const SPRITESHEET_NAMESPACE = `astroicon`;

const baseURL = "https://api.astroicon.dev/v1/";
const requests = /* @__PURE__ */ new Map();
const fetchCache = /* @__PURE__ */ new Map();
async function get(pack, name) {
  const url = new URL(`./${pack}/${name}`, baseURL).toString();
  if (requests.has(url)) {
    return await requests.get(url);
  }
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }
  let request = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("svg")) {
      throw new Error(`[astro-icon] Unable to load "${name}" because it did not resolve to an SVG!

Recieved the following "Content-Type":
${contentType}`);
    }
    const svg = await res.text();
    fetchCache.set(url, svg);
    requests.delete(url);
    return svg;
  };
  let promise = request();
  requests.set(url, promise);
  return await promise;
}

const splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
const splitAttrs = (str) => {
  let res = {};
  let token;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = " " + (str || "") + " ";
    while (token = splitAttrsTokenizer.exec(str)) {
      res[token[1]] = token[3];
    }
  }
  return res;
};
function optimizeSvg(contents, name, options) {
  return optimize(contents, {
    plugins: [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs",
      {
        name: "cleanupIDs",
        params: { prefix: `${SPRITESHEET_NAMESPACE}:${name}` }
      },
      "removeRasterImages",
      "removeUselessDefs",
      "cleanupNumericValues",
      "cleanupListOfValues",
      "convertColors",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeViewBox",
      "cleanupEnableBackground",
      "removeHiddenElems",
      "removeEmptyText",
      "convertShapeToPath",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      "convertPathData",
      "convertTransform",
      "removeEmptyAttrs",
      "removeEmptyContainers",
      "mergePaths",
      "removeUnusedNS",
      "sortAttrs",
      "removeTitle",
      "removeDesc",
      "removeDimensions",
      "removeStyleElement",
      "removeScriptElement"
    ]
  }).data;
}
const preprocessCache = /* @__PURE__ */ new Map();
function preprocess(contents, name, { optimize }) {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  if (optimize) {
    contents = optimizeSvg(contents, name);
  }
  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while (token = domParserTokenizer.exec(contents)) {
      const tag = token[2];
      if (tag === "svg") {
        const attrs = splitAttrs(token[3]);
        result = contents.slice(domParserTokenizer.lastIndex).replace(/<\/svg>/gim, "").trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }
}
function normalizeProps(inputProps) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : void 0;
  const height = h ? toAttributeSize(h) : void 0;
  return { ...inputProps, width, height };
}
const toAttributeSize = (size) => String(size).replace(/(?<=[0-9])x$/, "em");
async function load(name, inputProps, optimize) {
  const key = name;
  if (!name) {
    throw new Error("<Icon> requires a name!");
  }
  let svg = "";
  let filepath = "";
  if (name.includes(":")) {
    const [pack, ..._name] = name.split(":");
    name = _name.join(":");
    filepath = `/src/icons/${pack}`;
    let get$1;
    try {
      const files = /* #__PURE__ */ Object.assign({

});
      const keys = Object.fromEntries(
        Object.keys(files).map((key2) => [key2.replace(/\.[cm]?[jt]s$/, ""), key2])
      );
      if (!(filepath in keys)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const mod = files[keys[filepath]];
      if (typeof mod.default !== "function") {
        throw new Error(
          `[astro-icon] "${filepath}" did not export a default function!`
        );
      }
      get$1 = mod.default;
    } catch (e) {
    }
    if (typeof get$1 === "undefined") {
      get$1 = get.bind(null, pack);
    }
    const contents = await get$1(name, inputProps);
    if (!contents) {
      throw new Error(
        `<Icon pack="${pack}" name="${name}" /> did not return an icon!`
      );
    }
    if (!/<svg/gim.test(contents)) {
      throw new Error(
        `Unable to process "<Icon pack="${pack}" name="${name}" />" because an SVG string was not returned!

Recieved the following content:
${contents}`
      );
    }
    svg = contents;
  } else {
    filepath = `/src/icons/${name}.svg`;
    try {
      const files = /* #__PURE__ */ Object.assign({});
      if (!(filepath in files)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const contents = files[filepath];
      if (!/<svg/gim.test(contents)) {
        throw new Error(
          `Unable to process "${filepath}" because it is not an SVG!

Recieved the following content:
${contents}`
        );
      }
      svg = contents;
    } catch (e) {
      throw new Error(
        `[astro-icon] Unable to load "${filepath}". Does the file exist?`
      );
    }
  }
  const { innerHTML, defaultProps } = preprocess(svg, key, { optimize });
  if (!innerHTML.trim()) {
    throw new Error(`Unable to parse "${filepath}"!`);
  }
  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) }
  };
}

const $$Astro$4 = createAstro();
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Icon;
  let { name, pack, title, optimize = true, class: className, ...inputProps } = Astro2.props;
  let props = {};
  if (pack) {
    name = `${pack}:${name}`;
  }
  let innerHTML = "";
  try {
    const svg = await load(name, { ...inputProps, class: className }, optimize);
    innerHTML = svg.innerHTML;
    props = svg.props;
  } catch (e) {
    {
      throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
    }
  }
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(name, "astro-icon")}>${unescapeHTML((title ? `<title>${title}</title>` : "") + innerHTML)}</svg>`;
}, "/Users/gabriel/Documents/projects/Personal-Website/node_modules/astro-icon/lib/Icon.astro", void 0);

const sprites = /* @__PURE__ */ new WeakMap();
function trackSprite(request, name) {
  let currentSet = sprites.get(request);
  if (!currentSet) {
    currentSet = /* @__PURE__ */ new Set([name]);
  } else {
    currentSet.add(name);
  }
  sprites.set(request, currentSet);
}
const warned = /* @__PURE__ */ new Set();
async function getUsedSprites(request) {
  const currentSet = sprites.get(request);
  if (currentSet) {
    return Array.from(currentSet);
  }
  if (!warned.has(request)) {
    const { pathname } = new URL(request.url);
    console.log(`[astro-icon] No sprites found while rendering "${pathname}"`);
    warned.add(request);
  }
  return [];
}

const $$Astro$3 = createAstro();
const $$Spritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Spritesheet;
  const { optimize = true, style, ...props } = Astro2.props;
  const names = await getUsedSprites(Astro2.request);
  const icons = await Promise.all(names.map((name) => {
    return load(name, {}, optimize).then((res) => ({ ...res, name })).catch((e) => {
      {
        throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
      }
    });
  }));
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(`position: absolute; width: 0; height: 0; overflow: hidden; ${style ?? ""}`.trim(), "style")}${spreadAttributes({ "aria-hidden": true, ...props })} astro-icon-spritesheet>${icons.map((icon) => renderTemplate`<symbol${spreadAttributes(icon.props)}${addAttribute(`${SPRITESHEET_NAMESPACE}:${icon.name}`, "id")}>${unescapeHTML(icon.innerHTML)}</symbol>`)}</svg>`;
}, "/Users/gabriel/Documents/projects/Personal-Website/node_modules/astro-icon/lib/Spritesheet.astro", void 0);

const $$Astro$2 = createAstro();
const $$SpriteProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SpriteProvider;
  const content = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}${renderComponent($$result, "Spritesheet", $$Spritesheet, {})}`;
}, "/Users/gabriel/Documents/projects/Personal-Website/node_modules/astro-icon/lib/SpriteProvider.astro", void 0);

const $$Astro$1 = createAstro();
const $$Sprite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Sprite;
  let { name, pack, title, class: className, x, y, ...inputProps } = Astro2.props;
  const props = normalizeProps(inputProps);
  if (pack) {
    name = `${pack}:${name}`;
  }
  const href = `#${SPRITESHEET_NAMESPACE}:${name}`;
  trackSprite(Astro2.request, name);
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(className, "class")}${addAttribute(name, "astro-icon")}>${title ? renderTemplate`<title>${title}</title>` : ""}<use${spreadAttributes({ "xlink:href": href, width: props.width, height: props.height, x, y })}></use></svg>`;
}, "/Users/gabriel/Documents/projects/Personal-Website/node_modules/astro-icon/lib/Sprite.astro", void 0);

Object.assign($$Sprite, { Provider: $$SpriteProvider });

const ContactInfo = () => {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(0);
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);
  return /* @__PURE__ */ jsxs(Toast.Provider, { duration: 700, swipeDirection: "right", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        "data-copy-info": true,
        className: "relative select-none decoration-double hover:underline",
        onClick: () => {
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            setOpen(true);
          }, 100);
        },
        children: "Contact"
      }
    ),
    /* @__PURE__ */ jsxs(
      Toast.Root,
      {
        className: "radix-state-open:animate-fade-in radix-state-closed:animate-fade-out items-center rounded-md border border-gray-400 bg-slate-600 p-3 focus:border-2",
        open,
        onOpenChange: setOpen,
        children: [
          /* @__PURE__ */ jsxs(Toast.Title, { className: "flex items-center gap-2 text-lg italic", children: [
            "Copied to Clipboard!",
            /* @__PURE__ */ jsx(ClipboardIcon, { height: 30, width: 30 }),
            /* @__PURE__ */ jsx(
              Toast.Action,
              {
                className: "flex justify-end",
                asChild: true,
                altText: "close dialog",
                children: /* @__PURE__ */ jsx("button", { className: "-translate-y-2 translate-x-2", children: /* @__PURE__ */ jsx(CrossCircledIcon, { height: 25, width: 25 }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Toast.Description, { asChild: true, children: /* @__PURE__ */ jsx("div", { className: "text-xl", children: "gabrieljkime@gmail.com" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Toast.Viewport, { className: "fixed right-36 top-0 z-20 flex w-96 max-w-[100vw] list-none flex-col items-center gap-4 p-4" })
  ] });
};

const $$Astro = createAstro();
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Nav;
  return renderTemplate`${maybeRenderHead()}<nav class="grid h-16 w-full grid-cols-nav-lg grid-rows-1 items-center text-gray-100"><div class="col-start-2 flex justify-center">${renderSlot($$result, $$slots["default"])}</div><section class="col-start-3 flex justify-end gap-3 text-2xl">${renderComponent($$result, "ContactInfo", ContactInfo, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/ContactInfo", "client:component-export": "default" })}<span data-contact-info class="position: fixed -z-10 h-0 w-0 text-transparent">gabrieljkime@gmail.com</span><a href="/Resume" target="_blank" class="decoration-double hover:underline">Resume</a></section><div class="col-start-4 p-2 text-center text-3xl">|</div><section class="col-start-5 flex gap-1"><a class="group flex items-center justify-center rounded-md pl-0 hover:bg-gray-100" href="https://github.com/wizardbusiness" target="_blank">${renderComponent($$result, "Icon", $$Icon, { "class": "justify-center group-hover:text-gray-800", "pack": "ant-design", "name": "github-outlined", "width": "35", "height": "35" })}</a><a class="group flex rounded-md p-1 hover:bg-gray-100" href="https://www.linkedin.com/in/gabriel-kime/" target="_blank">${renderComponent($$result, "Icon", $$Icon, { "class": "group-hover:text-gray-600", "pack": "ant-design", "name": "linkedin-outlined", "width": "35", "height": "35" })}</a></section></nav>`;
}, "/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/Nav.astro", void 0);

const $$file = "/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/Nav.astro";
const $$url = "/components/Nav";

const Nav = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Nav,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Nav as $, Nav as N, $$Icon as a };
