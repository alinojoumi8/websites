// The gateway diagram as one plain SVG file, with named layers and ids.
import type { APIRoute } from 'astro';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GatewaySvg } from '../../components/diagrams/GatewayFlow';

export const GET: APIRoute = () =>
  new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${renderToStaticMarkup(createElement(GatewaySvg, { selected: 'gateway' }))}\n`, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
