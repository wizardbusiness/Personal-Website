export { renderers } from '../../renderers.mjs';
export { onRequest } from '../../_empty-middleware.mjs';
import 'react';
import 'react-dom/server';

const page = () => import('../../chunks/pages/Nav_0b8c846b.mjs').then(n => n.N);

export { page };
