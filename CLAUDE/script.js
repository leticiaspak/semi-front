'use strict';

/* ═══════════════════════════════════════════
   AURORA CANVAS  (fundo animado suave)
═══════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('bg');
  const ctx    = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Blobs de cor que flutuam
  const blobs = [
    { x: 0.20, y: 0.25, r: 0.40, color: '#8a3a00', speed: 0.00018, phase: 0.0 },
    { x: 0.75, y: 0.70, r: 0.38, color: '#6b1a00', speed: 0.00023, phase: 2.1 },
    { x: 0.55, y: 0.20, r: 0.32, color: '#4a1500', speed: 0.00014, phase: 4.4 },
    { x: 0.15, y: 0.80, r: 0.30, color: '#3d1000', speed: 0.00019, phase: 1.3 },
  ];

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    // Base muito escura
    ctx.fillStyle = '#0e0a06';
    ctx.fillRect(0, 0, W, H);

    // Blobs
    blobs.forEach(b => {
      const ox = Math.sin(t * b.speed + b.phase) * 0.08;
      const oy = Math.cos(t * b.speed * 1.3 + b.phase) * 0.07;
      const cx = (b.x + ox) * W;
      const cy = (b.y + oy) * H;
      const radius = b.r * Math.min(W, H);

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      g.addColorStop(0, b.color + 'cc');
      g.addColorStop(1, b.color + '00');
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();


/* ═══════════════════════════════════════════
   RIPPLE HOVER nos botões
═══════════════════════════════════════════ */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    btn.style.setProperty('--rx', ((e.clientX - r.left) / r.width  * 100) + '%');
    btn.style.setProperty('--ry', ((e.clientY - r.top)  / r.height * 100) + '%');
  });
});


/* ═══════════════════════════════════════════
   CALCULADORA
═══════════════════════════════════════════ */
const numEl  = document.getElementById('number');
const exprEl = document.getElementById('expr');

const opMap = { '÷': '/', '×': '*', '−': '-', '+': '+' };

let cur      = '0';
let prev     = null;
let op       = null;
let fresh    = false;   // true logo após "="

// ── display ───────────────────────────────
function render() {
  const len = cur.replace('-', '').replace('.', '').length;
  numEl.style.fontSize = len > 12 ? '1.8rem' : len > 9 ? '2.3rem' : len > 6 ? '2.7rem' : '3.2rem';
  numEl.textContent = cur;
}

function pop() {
  numEl.classList.remove('pop');
  void numEl.offsetWidth;
  numEl.classList.add('pop');
}

function litOp(symbol) {
  document.querySelectorAll('.btn.op').forEach(b => b.classList.remove('lit'));
  if (symbol) {
    document.querySelectorAll('.btn.op').forEach(b => {
      if (b.dataset.op === symbol) b.classList.add('lit');
    });
  }
}

// ── lógica ────────────────────────────────
function inputDigit(d) {
  if (fresh) { cur = d; fresh = false; }
  else cur = cur === '0' ? d : cur.length < 14 ? cur + d : cur;
  render();
}

function inputDot() {
  if (fresh) { cur = '0.'; fresh = false; render(); return; }
  if (!cur.includes('.')) { cur += '.'; render(); }
}

function inputOp(symbol) {
  if (op && !fresh) compute(false);
  prev  = cur;
  op    = symbol;
  fresh = false;
  exprEl.textContent = `${prev} ${symbol}`;
  litOp(symbol);
}

function fmt(n) {
  const s = parseFloat(n.toPrecision(12)).toString();
  return s;
}

function compute(final = true) {
  if (!op || prev === null) return;
  const a = parseFloat(prev);
  const b = parseFloat(cur);
  let res;
  switch (opMap[op]) {
    case '+': res = a + b; break;
    case '-': res = a - b; break;
    case '*': res = a * b; break;
    case '/':
      if (b === 0) { cur = 'Erro'; render(); return; }
      res = a / b; break;
  }
  if (final) {
    exprEl.textContent = `${prev} ${op} ${cur} =`;
    op    = null;
    fresh = true;
    litOp(null);
  } else {
    prev = fmt(res);
  }
  cur = fmt(res);
  render();
  pop();
}

function clear() {
  cur = '0'; prev = null; op = null; fresh = false;
  exprEl.textContent = '\u00a0';
  litOp(null);
  render();
}

function toggleSign() {
  if (cur === '0' || cur === 'Erro') return;
  cur = cur.startsWith('-') ? cur.slice(1) : '-' + cur;
  render();
}

function percent() {
  const n = parseFloat(cur);
  if (isNaN(n)) return;
  cur = fmt(n / 100);
  render();
}

// ── eventos de toque / clique ─────────────
document.querySelector('.grid').addEventListener('click', e => {
  const b = e.target.closest('.btn');
  if (!b) return;

  if      (b.dataset.d  !== undefined) inputDigit(b.dataset.d);
  else if (b.dataset.op !== undefined) inputOp(b.dataset.op);
  else switch (b.dataset.fn) {
    case 'dot':   inputDot();     break;
    case 'eq':    compute(true);  break;
    case 'clear': clear();        break;
    case 'sign':  toggleSign();   break;
    case 'pct':   percent();      break;
  }
});

// ── teclado ───────────────────────────────
const keyOpMap = { '/': '÷', '*': '×', '-': '−', '+': '+' };

document.addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key;
  if ('0123456789'.includes(k)) { inputDigit(k); return; }
  if (k === '.')                { inputDot();    return; }
  if (keyOpMap[k])              { inputOp(keyOpMap[k]); return; }
  if (k === 'Enter' || k === '=') { compute(true); return; }
  if (k === 'Escape')           { clear(); return; }
  if (k === 'Backspace') {
    if (fresh) { cur = '0'; fresh = false; }
    else cur = cur.length > 1 ? cur.slice(0, -1) : '0';
    render();
  }
});

// ── init ──────────────────────────────────
render();