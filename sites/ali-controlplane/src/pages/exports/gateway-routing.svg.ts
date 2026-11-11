// The payment-routing diagram as one plain SVG file, with named layers and ids.
// Layers: #floor, #rails (rail-*), #nodes (node-*), #labels-strategy, #labels-architecture.
import type { APIRoute } from 'astro';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RoutingSvg } from '../../components/diagrams/Routing';

export const GET: APIRoute = () =>
  new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${renderToStaticMarkup(createElement(RoutingSvg, { view: 'architecture', lit: ['gateway'] }))}\n`, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
