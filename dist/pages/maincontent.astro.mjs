export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';
import 'react';
import 'react-dom/server';

const page = () => import('../chunks/pages/MainContent_fab9d874.mjs').then(n => n.M);

export { page };
