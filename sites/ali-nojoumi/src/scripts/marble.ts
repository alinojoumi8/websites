// Mathematical marbling after Aubrey Jaffer. Every ink drop and comb stroke is
// an invertible map, so a fragment walks the strokes backwards to find its pigment.

export const PIGMENTS: [number, number, number][] = [
  [0.114, 0.247, 0.659], // cobalt
  [0.847, 0.212, 0.122], // vermilion
  [0.91, 0.639, 0.09], // ochre
  [0.078, 0.071, 0.059], // ink
  [0.812, 0.886, 0.765], // eye-ease green
  [0.957, 0.945, 0.902], // ivory
  [0.965, 0.651, 0.698], // pink
];
const GROUND: [number, number, number] = [0.957, 0.945, 0.902];
const MAX_OPS = 110;

const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 R; uniform int N; uniform highp sampler2D D; uniform sampler2D B; uniform float hasB;
uniform vec3 P[7]; uniform vec3 G;
out vec4 o;
vec3 paint(vec2 q){
  for (int i = N - 1; i >= 0; i--) {
    vec4 a = texelFetch(D, ivec2(0, i), 0);
    vec4 b = texelFetch(D, ivec2(1, i), 0);
    int k = int(a.w + .5);
    if (k == 0) {
      vec2 d = q - a.xy; float l = dot(d, d), r = a.z * a.z;
      if (l < r) return P[int(b.x + .5)];
      q = a.xy + d * sqrt(1. - r / l);
    } else {
      vec2 m = b.xy; vec2 n = vec2(-m.y, m.x); float s = dot(q - a.xy, n), dd;
      if (k == 1) { dd = abs(s); } else { float t = mod(s, b.w); dd = min(t, b.w - t); }
      q -= m * a.z * pow(.5, dd / b.z);
    }
  }
  if (hasB > .5) return texture(B, vec2(q.x / (R.x / R.y), q.y)).rgb;
  return G;
}
void main(){
  vec2 uv = gl_FragCoord.xy / R.y;
  vec3 c = paint(uv + vec2(-.375, -.125) / R.y) + paint(uv + vec2(.125, -.375) / R.y) + paint(uv + vec2(.375, .125) / R.y) + paint(uv + vec2(-.125, .375) / R.y);
  o = vec4(c * .25, 1.);
}`;

type Op = { k: 0 | 1 | 2; x: number; y: number; v: number; a: number; b: number; c: number; d: number; t0: number; dur: number };

const out3 = (t: number) => 1 - Math.pow(1 - t, 3);

export class Marble {
  gl: WebGL2RenderingContext;
  canvas: HTMLCanvasElement;
  ops: Op[] = [];
  aspect = 1;
  /** True when WebGL runs on the CPU. Such machines get the static paper instead of the live shader. */
  software = false;
  private loc: Record<string, WebGLUniformLocation | null> = {};
  private data = new Float32Array(2 * MAX_OPS * 4);
  private tex: WebGLTexture;
  private base: WebGLTexture | null = null;
  private hasBase = false;
  private scale: number;

  static create(canvas: HTMLCanvasElement, scale = 1): Marble | null {
    const gl = canvas.getContext('webgl2', { antialias: false, preserveDrawingBuffer: true, powerPreference: 'low-power' });
    if (!gl) return null;
    try {
      return new Marble(canvas, gl, scale);
    } catch {
      return null;
    }
  }

  private constructor(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext, scale: number) {
    this.canvas = canvas;
    this.gl = gl;
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : '';
    this.software = !import.meta.env.DEV && /swiftshader|llvmpipe|software|basic render/i.test(renderer);
    this.scale = scale;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
      return s;
    };
    const pr = gl.createProgram()!;
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error('link');
    gl.useProgram(pr);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const p = gl.getAttribLocation(pr, 'p');
    gl.enableVertexAttribArray(p);
    gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);
    for (const n of ['R', 'N', 'D', 'B', 'hasB', 'P', 'G']) this.loc[n] = gl.getUniformLocation(pr, n);
    gl.uniform3fv(this.loc.P, new Float32Array(PIGMENTS.flat()));
    gl.uniform3fv(this.loc.G, new Float32Array(GROUND));
    gl.uniform1i(this.loc.D, 0);
    gl.uniform1i(this.loc.B, 1);
    this.tex = gl.createTexture()!;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, 2, MAX_OPS, 0, gl.RGBA, gl.FLOAT, this.data);
    this.resize();
  }

  resize() {
    const w = Math.max(2, Math.round(this.canvas.clientWidth * this.scale));
    const h = Math.max(2, Math.round(this.canvas.clientHeight * this.scale));
    this.canvas.width = w;
    this.canvas.height = h;
    this.aspect = w / h;
    this.gl.viewport(0, 0, w, h);
  }

  drop(x: number, y: number, r: number, color: number, t0 = 0, dur = 0) {
    this.push({ k: 0, x, y, v: r, a: color, b: 0, c: 0, d: 0, t0, dur });
  }
  comb(x: number, y: number, dx: number, dy: number, z: number, sharp: number, t0 = 0, dur = 0) {
    const l = Math.hypot(dx, dy) || 1;
    this.push({ k: 1, x, y, v: z, a: dx / l, b: dy / l, c: sharp, d: 0, t0, dur });
  }
  rake(x: number, y: number, dx: number, dy: number, z: number, sharp: number, spacing: number, t0 = 0, dur = 0) {
    const l = Math.hypot(dx, dy) || 1;
    this.push({ k: 2, x, y, v: z, a: dx / l, b: dy / l, c: sharp, d: spacing, t0, dur });
  }
  private push(op: Op) {
    if (this.ops.length >= MAX_OPS) this.bake();
    this.ops.push(op);
  }

  render(now = Infinity) {
    const { gl } = this;
    const n = this.ops.length;
    const d = this.data;
    let busy = false;
    let live = 0;
    for (let i = 0; i < n; i++) {
      const op = this.ops[i];
      if (now < op.t0) { busy = true; continue; }
      let f = 1;
      if (op.dur > 0) {
        f = Math.min(1, (now - op.t0) / op.dur);
        if (f < 1) busy = true;
        f = out3(f);
      }
      const j = live * 8;
      d[j] = op.x; d[j + 1] = op.y; d[j + 2] = op.v * f; d[j + 3] = op.k;
      if (op.k === 0) { d[j + 4] = op.a; d[j + 5] = 0; d[j + 6] = 0; d[j + 7] = 0; }
      else { d[j + 4] = op.a; d[j + 5] = op.b; d[j + 6] = op.c; d[j + 7] = op.d; }
      live++;
    }
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    // texture is 2 columns wide and MAX_OPS tall; data is laid out row by row
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 2, MAX_OPS, gl.RGBA, gl.FLOAT, d);
    gl.uniform2f(this.loc.R, this.canvas.width, this.canvas.height);
    gl.uniform1i(this.loc.N, live);
    gl.uniform1f(this.loc.hasB, this.hasBase ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    return busy;
  }

  bake() {
    const { gl } = this;
    this.render();
    if (!this.base) {
      this.base = gl.createTexture();
    }
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.base);
    gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, 0, 0, this.canvas.width, this.canvas.height, 0);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
    gl.activeTexture(gl.TEXTURE0);
    this.hasBase = true;
    this.ops = [];
  }

  destroy() {
    this.gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
}

/** Lays down a full pattern: scattered drops, then combed passes. */
export function layPattern(m: Marble, seed: number, opts: { start?: number; spread?: number; grow?: number; count?: number } = {}) {
  let s = seed >>> 0 || 1;
  const rnd = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const { start = 0, spread = 0, grow = 0, count = 62 } = opts;
  const A = m.aspect;
  const inks = [0, 1, 2, 3, 0, 1, 2, 4, 5, 0, 1, 6];
  for (let i = 0; i < count; i++) {
    const x = rnd() * A;
    const y = rnd();
    const big = rnd();
    const r = big > 0.82 ? 0.11 + rnd() * 0.1 : 0.03 + rnd() * 0.075;
    m.drop(x, y, r, inks[Math.floor(rnd() * inks.length)], start + (i / count) * spread, grow);
  }
  const combs = start + spread;
  const c1 = combs * 1 + (spread ? 0.05 : 0);
  m.rake(0, 0, 0, 1, 0.5, 0.05, 0.2, c1, spread ? 0.5 : 0);
  m.rake(0, 0.1, 1, 0, -0.34, 0.04, 0.14, c1 + (spread ? 0.34 : 0), spread ? 0.46 : 0);
  m.rake(0.03, 0, 0, 1, 0.13, 0.016, 0.055, c1 + (spread ? 0.68 : 0), spread ? 0.38 : 0);
}
