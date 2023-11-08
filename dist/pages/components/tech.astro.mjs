export { renderers } from '../../renderers.mjs';
export { onRequest } from '../../_empty-middleware.mjs';
import 'react';
import 'react-dom/server';

const page = () => import('../../chunks/pages/Tech_9d6f51a1.mjs');

export { page };
