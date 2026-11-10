import { useEffect, useRef } from 'react';
import { pointer, onPointer } from '../lib/pointer';
import { prefersReducedMotion } from '../lib/gsap';

/**
 * The cutting mat. A fixed WebGL canvas draws the grid for the whole page.
 * The grid moves with the scroll, and it swells under the pointer like a
 * loupe laid on the mat. With no WebGL, the CSS grid on <body> stays.
 */

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform vec2 uPtr;
uniform float uScroll;
uniform float uDpr;
uniform float uPress;
uniform float uLeft;

float gridLine(vec2 q, float step, float w) {
  vec2 g = abs(fract(q / step - 0.5) - 0.5) * step;
  float d = min(g.x, g.y) * uDpr;
  return 1.0 - smoothstep(w - 0.6, w + 0.6, d);
}

float diag(vec2 q, float step, float w) {
  float t = (q.x + q.y) * 0.70710678;
  float d = abs(fract(t / step - 0.5) - 0.5) * step * uDpr;
  return 1.0 - smoothstep(w - 0.6, w + 0.6, d);
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uDpr;
  vec2 d = p - uPtr;
  float r = length(d);
  float lens = exp(-(r * r) / (190.0 * 190.0)) * uPress;

  // The loupe: sample nearer to the pointer, so the grid looks bigger there.
  vec2 q = p - d * lens * 0.34;
  q.y += uScroll;
  q.x -= uLeft;

  float minor = gridLine(q, 20.0, 0.5 * uDpr);
  float major = gridLine(q, 100.0, 0.6 * uDpr);
  float dg = diag(q, 400.0, 0.5 * uDpr);

  float a = minor * 0.085 + major * 0.2 + dg * 0.05;
  a *= 1.0 + lens * 2.2;

  vec3 line = vec3(0.70, 0.89, 0.81);
  vec3 yel = vec3(1.0, 0.82, 0.12);
  vec3 col = mix(line, yel, lens * major * 0.9);

  // A soft pool of daylight under the loupe.
  float pool = lens * 0.07;
  float alpha = clamp(a + pool, 0.0, 1.0);
  vec3 rgb = col * a + vec3(0.85, 1.0, 0.93) * pool;
  gl_FragColor = vec4(rgb, alpha);
}
`;

export default function Mat() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      res: gl.getUniformLocation(prog, 'uRes'),
      ptr: gl.getUniformLocation(prog, 'uPtr'),
      scroll: gl.getUniformLocation(prog, 'uScroll'),
      dpr: gl.getUniformLocation(prog, 'uDpr'),
      press: gl.getUniformLocation(prog, 'uPress'),
      left: gl.getUniformLocation(prog, 'uLeft'),
    };

    const still = prefersReducedMotion();
    let dpr = 1;
    let dirty = true;
    let raf = 0;
    let sx = -9999;
    let sy = -9999;
    let press = 0;
    let lastScroll = -1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      dirty = true;
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const scroll = window.scrollY;
      const targetPress = !still && pointer.live ? 1 : 0;
      if (sx < -9000 && pointer.live) {
        sx = pointer.x;
        sy = pointer.y;
      }
      const dx = pointer.x - sx;
      const dy = pointer.y - sy;
      const dp = targetPress - press;
      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05 || Math.abs(dp) > 0.002) {
        sx += dx * 0.14;
        sy += dy * 0.14;
        press += dp * 0.08;
        dirty = true;
      }
      if (scroll !== lastScroll) {
        lastScroll = scroll;
        dirty = true;
      }
      if (!dirty) return;
      dirty = false;
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform2f(u.ptr, sx, sy);
      gl.uniform1f(u.scroll, scroll);
      gl.uniform1f(u.dpr, dpr);
      gl.uniform1f(u.press, press);
      gl.uniform1f(u.left, window.innerWidth >= 768 ? 28 : 0);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    resize();
    const off = onPointer(() => {});
    window.addEventListener('resize', resize);
    document.documentElement.classList.add('gl');
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      off();
      window.removeEventListener('resize', resize);
      document.documentElement.classList.remove('gl');
    };
  }, []);

  return <canvas ref={ref} className="mat-canvas" aria-hidden="true" />;
}
