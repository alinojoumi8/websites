// The threshold-signing diagram as one plain SVG file, with named layers and ids.
import type { APIRoute } from 'astro';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { VaultSvg, initialSigners } from '../../components/diagrams/ThresholdVault';

// Shown part-way through: Treasury has its two approvals, Operations has one.
const signers = initialSigners().map((s, i) => ({ ...s, ok: [0, 1, 3].includes(i) }));

export const GET: APIRoute = () =>
  new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${renderToStaticMarkup(createElement(VaultSvg, { signers }))}\n`, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
