import { useEffect, useRef } from 'react';
import { pointer } from '../lib/pointer';

/**
 * The plate. A fixed WebGL layer that engraves guilloche line-work behind the page.
 * The pointer is a lamp: lines near it brighten and take the foil colours.
 * Without WebGL2 the page keeps its plain plate ground. Nothing depends on this layer.
 */

const VERT = `#version 300 es
in vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPtr;
uniform float uScroll;
uniform float uLamp;
out vec4 frag;

const float PI = 3.141592653589793;
const vec3 STEEL = vec3(0.50, 0.59, 0.70);
const vec3 COPPER = vec3(0.86, 0.50, 0.22);
const vec3 GOLD = vec3(0.96, 0.78, 0.42);
const vec3 EMER = vec3(0.14, 0.74, 0.55);

// A hairline at every whole value of f. Fades out before it can alias.
float hair(float f, float w){
  float aa = fwidth(f);
  float d = abs(f - floor(f + 0.5));
  float l = 1.0 - smoothstep(w * 0.5 * aa, (w * 0.5 + 1.0) * aa, d);
  return l * smoothstep(0.60, 0.22, aa);
}

mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

// One woven guilloche band: two wavy ring families that cross each other.
float band(vec2 p, float R, float halfW, float n, float amp, float freq, float ph){
  float r = length(p);
  float a = atan(p.y, p.x);
  float wob = amp * sin(n * a + ph);
  float w1 = r + wob;
  float w2 = r - wob;
  float m1 = smoothstep(halfW, halfW * 0.9, abs(w1 - R));
  float m2 = smoothstep(halfW, halfW * 0.9, abs(w2 - R));
  return max(hair(w1 * freq, 1.0) * m1, hair(w2 * freq, 1.0) * m2);
}

float rosette(vec2 p, float t){
  float l = 0.0;
  l = max(l, band(p, 0.600, 0.070, 20.0, 0.055, 86.0, t));
  l = max(l, band(p, 0.415, 0.055, 14.0, 0.044, 100.0, -t * 1.4 + 1.0));
  l = max(l, band(p, 0.275, 0.045, 10.0, 0.034, 122.0, t * 1.9 + 2.0));
  l = max(l, band(p, 0.165, 0.036, 7.0, 0.026, 150.0, -t * 2.3));
  l = max(l, band(p, 0.075, 0.030, 5.0, 0.018, 180.0, t * 2.8));
  return l;
}

void main(){
  // Tall screens get a smaller, calmer pattern.
  float tall = smoothstep(1.0, 0.5, uRes.x / uRes.y);
  float z = mix(1.0, 1.75, tall);
  vec2 uv = z * (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float hw = z * 0.5 * uRes.x / uRes.y;

  // The plate drifts up more slowly than the page.
  vec2 q = uv;
  q.y -= uScroll * 0.34;

  // Rosettes repeat down the plate and swap sides.
  float T = 1.55;
  float cell = floor(q.y / T + 0.5);
  float side = mod(abs(cell), 2.0);
  vec2 c = vec2(mix(-0.58, 0.62, side) * hw, cell * T - 0.06);
  vec2 p = q - c;
  float spin = uTime * 0.012 + uScroll * 0.10 + cell * 0.7;
  p = rot(spin) * p;
  float t = uTime * 0.05 + (uPtr.x - 0.5) * 1.6;
  float l = rosette(p, t);

  // Wave ribbons run across the plate between the rosettes.
  float ry = q.y - (cell + 0.5) * T;
  float wob = 0.034 * sin(q.x * 6.0 + cell * 2.0 + uTime * 0.04) + 0.010 * sin(q.x * 17.0 - uTime * 0.03);
  float ribbon = max(hair((ry + wob) * 110.0, 1.0) * smoothstep(0.05, 0.044, abs(ry + wob)), hair((ry - wob) * 110.0, 1.0) * smoothstep(0.05, 0.044, abs(ry - wob)));
  float ry2 = q.y - (cell - 0.5) * T;
  ribbon = max(ribbon, max(hair((ry2 + wob) * 110.0, 1.0) * smoothstep(0.05, 0.044, abs(ry2 + wob)), hair((ry2 - wob) * 110.0, 1.0) * smoothstep(0.05, 0.044, abs(ry2 - wob))));
  l = max(l, ribbon * 0.8);

  // The lamp.
  vec2 m = vec2((uPtr.x - 0.5) * 2.0 * hw, (0.5 - uPtr.y) * z);
  float d = length(uv - m);
  float glow = exp(-d * d * 5.5) * uLamp;
  float k = 0.5 + 0.5 * sin(dot(uv - m, vec2(3.4, 2.2)) + uPtr.x * 5.0 + uTime * 0.12);
  vec3 foil = mix(mix(COPPER, GOLD, smoothstep(0.0, 0.5, k)), EMER, smoothstep(0.45, 1.0, k));
  vec3 col = mix(STEEL, foil, clamp(glow * 1.5, 0.0, 1.0));

  float vig = mix(1.0, 0.55, smoothstep(0.5, 1.5, length(uv * vec2(0.75, 1.0))));
  float a = l * (mix(0.07, 0.05, tall) + glow * 0.62) * vig;
  frag = vec4(col * a, a);
}`;

export default function Guilloche() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    // ?plate=off skips the WebGL layer. It is a switch for performance tests.
    const off = new URLSearchParams(window.location.search).get('plate') === 'off';
    const gl = off ? null : canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'low-power' });
    if (!gl) {
      document.documentElement.classList.add('no-gl');
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uPtr = gl.getUniformLocation(prog, 'uPtr');
    const uScroll = gl.getUniformLocation(prog, 'uScroll');
    const uLamp = gl.getUniformLocation(prog, 'uLamp');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    // Drops to half resolution, then to a still plate, on devices that cannot keep up.
    // A software renderer (no graphics card) gets the still plate at once.
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : '';
    let still = /swiftshader|llvmpipe|software|basic render/i.test(renderer);
    let quality = still ? 0.75 : 1;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75) * quality;
      w = Math.round(window.innerWidth * dpr);
      h = Math.round(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };
    resize();

    let raf = 0;
    let running = true;
    const start = performance.now();
    // The lamp is bright while the pointer moves and dims when it rests, so text stays easy to read.
    let lamp = 0.3;
    let px = pointer.x;
    let py = pointer.y;
    const draw = () => {
      const moved = Math.abs(pointer.x - px) + Math.abs(pointer.y - py) > 0.0006;
      px = pointer.x;
      py = pointer.y;
      const target = moved ? 1 : 0.24;
      lamp += (target - lamp) * (target > lamp ? 0.14 : 0.012);
      const time = reduce ? 12 : (performance.now() - start) / 1000;
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uPtr, pointer.sx, pointer.sy);
      gl.uniform1f(uScroll, window.scrollY / Math.max(1, window.innerHeight));
      gl.uniform1f(uLamp, reduce || still ? 0.45 : lamp);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    let prev = 0;
    let frames = 0;
    let slow = 0;
    const loop = (now: number) => {
      if (!running || still) return;
      const dt = now - prev;
      prev = now;
      const t0 = performance.now();
      draw();
      const cost = performance.now() - t0;
      if (frames++ > 3 && dt < 1000) slow = dt > 50 || cost > 9 ? slow + 1 : Math.max(0, slow - 0.2);
      if (slow >= 5) {
        slow = 0;
        frames = 0;
        if (quality > 0.5) {
          quality = 0.5;
          resize();
        } else {
          still = true;
          draw();
          return;
        }
      }
      raf = requestAnimationFrame(loop);
    };

    const onVis = () => {
      running = !document.hidden;
      cancelAnimationFrame(raf);
      frames = 0;
      if (running && !reduce && !still) raf = requestAnimationFrame(loop);
    };
    const onResize = () => {
      resize();
      if (reduce || still) draw();
    };
    const onScrollStill = () => draw();

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);
    // The plate waits for a quiet moment, so it never competes with the first paint.
    const begin = () => {
      canvas.style.opacity = '1';
      if (still) {
        draw();
      } else if (reduce) {
        draw();
        window.addEventListener('scroll', onScrollStill, { passive: true });
        window.addEventListener('pointermove', onScrollStill, { passive: true });
      } else {
        raf = requestAnimationFrame(loop);
      }
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(begin, { timeout: 1500 })
      : window.setTimeout(begin, 400);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('scroll', onScrollStill);
      window.removeEventListener('pointermove', onScrollStill);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-0 transition-opacity duration-[1600ms]"
    />
  );
}
