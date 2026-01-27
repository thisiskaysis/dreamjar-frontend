// src/components/hero/HeroRenderer.js

export class Renderer {
  #vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main() {
  gl_Position = position;
}`;

  #fragmtSrc = `#version 300 es
precision highp float;

out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x, R.y)

// Returns a pseudo random number for a given point (white noise)
float rnd(vec2 p) {
  p = fract(p * vec2(12.9898, 78.233));
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

// Returns a pseudo random number for a given point (value noise)
float noise(in vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = rnd(i);
  float b = rnd(i + vec2(1.0, 0.0));
  float c = rnd(i + vec2(0, 1.0));
  float d = rnd(i + 1.0);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Returns a pseudo random number for a given point (fractal noise)
float fbm(vec2 p) {
  float t = 0.0, a = 1.0;
  mat2 m = mat2(1.0, -0.5, 0.2, 1.2);
  for (int i = 0; i < 5; i++) {
    t += a * noise(p);
    p *= 2.0 * m;
    a *= 0.5;
  }
  return t;
}

float clouds(vec2 p) {
  float d = 1.0, t = 0.0;
  for (float i = 0.0; i < 3.0; i++) {
    float a = d * fbm(i * 10.0 + p.x * 0.2 + 0.2 * (1.0 + i) * p.y + d + i * i + p);
    t = mix(t, d, a);
    d = a;
    p *= 2.0 / (i + 1.0);
  }
  return t;
}

void main(void) {
  vec2 uv = (FC - 0.5 * R) / MN;
  vec3 col = vec3(0.0);
  float bg = clouds(vec2(uv.x + T * 0.5, -uv.y));
  uv *= 1.0 - 0.3 * (sin(T * 0.2) * 0.5 + 0.5);

  for (float i = 1.0; i < 12.0; i++) {
    uv += 0.1 * cos(i * vec2(0.1 + 0.01 * i, 0.8) + i * i + T * 0.5 + 0.1 * uv.x);
    vec2 p = uv;
    float d = length(p);
    col += 0.00125 / d * (cos(sin(i) * vec3(1.0, 2.0, 3.0)) + 1.0);
    float b = noise(i + p + bg * 1.731);
    col += 0.002 * b / length(max(p, vec2(b * p.x * 0.02, p.y)));
    col = mix(col, 
    0.4 * vec3(
        bg * (0.7 + 0.3 * sin(T * 0.1)),
        bg * (0.6 + 0.3 * cos(T * 0.12)),
        bg * (0.9 + 0.2 * sin(T * 0.08))
    ), 
d);

  }

  O = vec4(col, 1.0);
}`;

  #vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

  constructor(canvas, scale) {
    this.canvas = canvas;
    this.scale = scale;
    this.gl = canvas.getContext("webgl2");
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
    this.shaderSource = this.#fragmtSrc;
    this.mouseMove = [0, 0];
    this.mouseCoords = [0, 0];
    this.pointerCoords = [0, 0];
    this.nbrOfPointers = 0;
    this.setup();
    this.init();
  }

  get defaultSource() {
    return this.#fragmtSrc;
  }

  updateShader(source) {
    this.reset();
    this.shaderSource = source;
    this.setup();
    this.init();
  }

  updateMove(deltas) {
    this.mouseMove = deltas;
  }
  updateMouse(coords) {
    this.mouseCoords = coords;
  }
  updatePointerCoords(coords) {
    this.pointerCoords = coords;
  }
  updatePointerCount(nbr) {
    this.nbrOfPointers = nbr;
  }
  updateScale(scale) {
    this.scale = scale;
    this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
  }

  compile(shader, source) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      this.canvas.dispatchEvent(
        new CustomEvent("shader-error", { detail: gl.getShaderInfoLog(shader) })
      );
    }
  }

  reset() {
    const { gl, program, vs, fs } = this;
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;
    if (gl.getShaderParameter(vs, gl.DELETE_STATUS)) {
      gl.detachShader(program, vs);
      gl.deleteShader(vs);
    }
    if (gl.getShaderParameter(fs, gl.DELETE_STATUS)) {
      gl.detachShader(program, fs);
      gl.deleteShader(fs);
    }
    gl.deleteProgram(program);
  }

  setup() {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    this.compile(this.vs, this.#vertexSrc);
    this.compile(this.fs, this.shaderSource);
    this.program = gl.createProgram();
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    const gl = this.gl;
    const program = this.program;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.#vertices), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    program.resolution = gl.getUniformLocation(program, "resolution");
    program.time = gl.getUniformLocation(program, "time");
    program.move = gl.getUniformLocation(program, "move");
    program.touch = gl.getUniformLocation(program, "touch");
    program.pointerCount = gl.getUniformLocation(program, "pointerCount");
    program.pointers = gl.getUniformLocation(program, "pointers");
  }

  render(now = 0) {
    const { gl, program, buffer, canvas, mouseMove, mouseCoords, pointerCoords, nbrOfPointers } = this;
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.uniform2f(program.resolution, canvas.width, canvas.height);
    gl.uniform1f(program.time, now * 1e-3);
    gl.uniform2f(program.move, ...mouseMove);
    gl.uniform2f(program.touch, ...mouseCoords);
    gl.uniform1i(program.pointerCount, nbrOfPointers);
    gl.uniform2fv(program.pointers, pointerCoords);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

// ---------------- PointerHandler Class ----------------
export class PointerHandler {
  constructor(element, scale) {
    this.scale = scale;
    this.active = false;
    this.pointers = new Map();
    this.lastCoords = [0, 0];
    this.moves = [0, 0];

    const map = (element, scale, x, y) => [x * scale, element.height - y * scale];

    element.addEventListener("pointerdown", (e) => {
      this.active = true;
      this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
    });

    element.addEventListener("pointerup", (e) => {
      if (this.count === 1) this.lastCoords = this.first;
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener("pointerleave", (e) => {
      if (this.count === 1) this.lastCoords = this.first;
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener("pointermove", (e) => {
      if (!this.active) return;
      this.lastCoords = [e.clientX, e.clientY];
      this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
      this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
    });
  }

  getScale() {
    return this.scale;
  }

  updateScale(scale) {
    this.scale = scale;
  }

  reset() {
    this.pointers.clear();
    this.active = false;
    this.moves = [0, 0];
  }

  get count() {
    return this.pointers.size;
  }

  get move() {
    return this.moves;
  }

  get coords() {
    return this.pointers.size > 0
      ? Array.from(this.pointers.values()).map((p) => [...p]).flat()
      : [0, 0];
  }

  get first() {
    return this.pointers.values().next().value || this.lastCoords;
  }
}
