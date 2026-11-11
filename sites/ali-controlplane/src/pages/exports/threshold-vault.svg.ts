// The two-layer threshold-signing diagram as one plain SVG file, with named layers and ids.
// Layers: #floor, #rails (rail-*), #departments (department-*, signer-*, gate-*), #wallet, #labels-*, #address.
import type { APIRoute } from 'astro';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ThresholdSvg, scripted } from '../../components/diagrams/Threshold';

// Shown part-way through: Treasury has its two approvals, Operations has one.
export const GET: APIRoute = () =>
  new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${renderToStaticMarkup(createElement(ThresholdSvg, { signers: scripted(0.4), view: 'architecture' }))}\n`, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
