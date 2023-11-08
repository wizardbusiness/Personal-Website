import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import './chunks/astro_0ad4388a.mjs';
import 'clsx';
import 'mime';
import { compile } from 'path-to-regexp';
import 'html-escaper';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

new TextEncoder();

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.c7d8df74.js"}],"styles":[{"type":"external","src":"/_astro/LandingPage.5c0827ea.css"},{"type":"inline","content":"@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n"},{"type":"external","src":"/_astro/MainContent.64a255b6.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.a1467f34.js"}],"styles":[{"type":"external","src":"/_astro/LandingPage.5c0827ea.css"},{"type":"inline","content":"@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n"},{"type":"external","src":"/_astro/MainContent.64a255b6.css"}],"routeData":{"route":"/landingpage","type":"page","pattern":"^\\/LandingPage\\/?$","segments":[[{"content":"LandingPage","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/LandingPage.astro","pathname":"/LandingPage","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.9df897fa.js"}],"styles":[{"type":"external","src":"/_astro/LandingPage.5c0827ea.css"},{"type":"external","src":"/_astro/MainContent.64a255b6.css"},{"type":"inline","content":"@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n"}],"routeData":{"route":"/maincontent","type":"page","pattern":"^\\/MainContent\\/?$","segments":[[{"content":"MainContent","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/MainContent.astro","pathname":"/MainContent","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/LandingPage.5c0827ea.css"}],"routeData":{"route":"/components/scrolltopagebtn","type":"page","pattern":"^\\/components\\/ScrollToPageBtn\\/?$","segments":[[{"content":"components","dynamic":false,"spread":false}],[{"content":"ScrollToPageBtn","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/components/ScrollToPageBtn.astro","pathname":"/components/ScrollToPageBtn","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/LandingPage.5c0827ea.css"}],"routeData":{"route":"/components/portfolio","type":"page","pattern":"^\\/components\\/Portfolio\\/?$","segments":[[{"content":"components","dynamic":false,"spread":false}],[{"content":"Portfolio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/components/Portfolio.astro","pathname":"/components/Portfolio","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/LandingPage.5c0827ea.css"}],"routeData":{"route":"/components/avatar","type":"page","pattern":"^\\/components\\/Avatar\\/?$","segments":[[{"content":"components","dynamic":false,"spread":false}],[{"content":"Avatar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/components/Avatar.astro","pathname":"/components/Avatar","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/LandingPage.5c0827ea.css"}],"routeData":{"route":"/components/about","type":"page","pattern":"^\\/components\\/About\\/?$","segments":[[{"content":"components","dynamic":false,"spread":false}],[{"content":"About","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/components/About.astro","pathname":"/components/About","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/LandingPage.5c0827ea.css"}],"routeData":{"route":"/components/tech","type":"page","pattern":"^\\/components\\/Tech\\/?$","segments":[[{"content":"components","dynamic":false,"spread":false}],[{"content":"Tech","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/components/Tech.astro","pathname":"/components/Tech","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.a1467f34.js"}],"styles":[{"type":"external","src":"/_astro/LandingPage.5c0827ea.css"}],"routeData":{"route":"/components/nav","type":"page","pattern":"^\\/components\\/Nav\\/?$","segments":[[{"content":"components","dynamic":false,"spread":false}],[{"content":"Nav","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/components/Nav.astro","pathname":"/components/Nav","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.14b5b446.js"}],"styles":[{"type":"external","src":"/_astro/LandingPage.5c0827ea.css"}],"routeData":{"route":"/resume","type":"page","pattern":"^\\/Resume\\/?$","segments":[[{"content":"Resume","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Resume.astro","pathname":"/Resume","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","compressHTML":true,"componentMetadata":[["/Users/gabriel/Documents/projects/Personal-Website/src/pages/LandingPage.astro",{"propagation":"in-tree","containsHead":false}],["/Users/gabriel/Documents/projects/Personal-Website/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/LandingPage@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/gabriel/Documents/projects/Personal-Website/src/pages/MainContent.astro",{"propagation":"in-tree","containsHead":true}],["/Users/gabriel/Documents/projects/Personal-Website/src/pages/Resume.astro",{"propagation":"none","containsHead":true}],["\u0000@astro-page:src/pages/MainContent@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,n)=>{let s=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),s();break}});for(let e of n.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/LandingPage@_@astro":"pages/landingpage.astro.mjs","\u0000@astro-page:src/pages/MainContent@_@astro":"pages/maincontent.astro.mjs","\u0000@astro-page:src/pages/components/ScrollToPageBtn@_@astro":"pages/components/scrolltopagebtn.astro.mjs","\u0000@astro-page:src/pages/components/Portfolio@_@astro":"pages/components/portfolio.astro.mjs","\u0000@astro-page:src/pages/components/Avatar@_@astro":"pages/components/avatar.astro.mjs","\u0000@astro-page:src/pages/components/About@_@astro":"pages/components/about.astro.mjs","\u0000@astro-page:src/pages/components/Tech@_@astro":"pages/components/tech.astro.mjs","\u0000@astro-page:src/pages/components/Nav@_@astro":"pages/components/nav.astro.mjs","\u0000@astro-page:src/pages/Resume@_@astro":"pages/resume.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/src/pages/components/About.astro":"chunks/pages/About_e02aa6b1.mjs","/src/pages/LandingPage.astro":"chunks/pages/LandingPage_3e4c0181.mjs","/src/pages/components/Portfolio.astro":"chunks/pages/Portfolio_d3cbf07a.mjs","/src/pages/Resume.astro":"chunks/pages/Resume_551e3cb5.mjs","/src/pages/components/ScrollToPageBtn.astro":"chunks/pages/ScrollToPageBtn_4ffd9ec6.mjs","/src/pages/components/Tech.astro":"chunks/pages/Tech_9d6f51a1.mjs","/src/pages/index.astro":"chunks/pages/index_15436125.mjs","\u0000@astrojs-manifest":"manifest_a72eb58b.mjs","/Users/gabriel/Documents/projects/Personal-Website/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_3769332a.mjs","/Users/gabriel/Documents/projects/Personal-Website/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_9828e1e9.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.9df897fa.js","@astrojs/react/client.js":"_astro/client.7e0fa3e5.js","/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/SubHeader":"_astro/SubHeader.45cd7a68.js","/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/TechList.tsx":"_astro/TechList.bde55daf.js","/Users/gabriel/Documents/projects/Personal-Website/src/pages/components/ContactInfo":"_astro/ContactInfo.8200fca9.js","/astro/hoisted.js?q=2":"_astro/hoisted.a1467f34.js","/astro/hoisted.js?q=3":"_astro/hoisted.14b5b446.js","/astro/hoisted.js?q=0":"_astro/hoisted.c7d8df74.js","astro:scripts/before-hydration.js":""},"assets":[]});

export { manifest };
