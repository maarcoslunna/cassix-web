/* Cassix · carrito (localStorage) y aviso de newsletter. Se carga en todas las páginas. */
(function () {
  'use strict';
  var sc = document.currentScript;
  var ROOT = sc && sc.src ? new URL('../', sc.src).href : '/';
  var IDX = /\.html$/.test(location.pathname) ? 'index.html' : '';
  function link(p) { return ROOT + p + (p.slice(-1) === '/' ? IDX : ''); }
  var P = {
    'hoodie-cassix-studio': { name: 'Hoodie CASSIX Studio', price:29.9, color: 'Amarillo pastel', img: 'img/hoodie-amarilla-cassix-studio-espalda-detalle-480.webp', path: 'producto/hoodie-cassix-studio/' },
    'camiseta-cassixwear': { name: 'Camiseta CASSIXWear', price:21.9, color: 'Blanco', img: 'img/camiseta-blanca-cassixwear-espalda-480.webp', path: 'producto/camiseta-cassixwear/' },
    'hoodie-casiopea': { name: 'Hoodie Casiopea', price:29.9, color: 'Burdeos', img: 'img/hoodie-burdeos-cassix-espalda-480.webp', path: 'producto/hoodie-casiopea/' },
    'camiseta-ringer-cassixwear': { name: 'Camiseta Ringer CASSIXWear', price:21.9, color: 'Azul marino', img: 'img/camiseta-ringer-azul-marino-cassixwear-espalda-480.webp', path: 'producto/camiseta-ringer-cassixwear/' }
  };
  var KEY = 'cx-cart';
  function get() { try { var d = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(d) ? d.filter(function (x) { return P[x.id] && x.q > 0; }) : []; } catch (e) { return []; } }
  function put(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} badge(); }
  function count() { return get().reduce(function (n, x) { return n + x.q; }, 0); }
  function add(id, size, q) {
    if (!P[id]) return; var a = get(), f = a.filter(function (x) { return x.id === id && x.size === size; })[0];
    if (f) f.q = Math.min(10, f.q + (q || 1)); else a.push({ id: id, size: size || 'M', q: q || 1 });
    put(a);
  }
  function badge() {
    var n = count(), c = document.querySelector('.cx-count'), a = document.querySelector('.cx-cart');
    if (c) { c.textContent = n; c.setAttribute('data-n', n); }
    if (a) a.setAttribute('aria-label', 'Carrito, ' + n + (n === 1 ? ' producto' : ' productos'));
  }
  window.CX = { products: P, link: link, cart: { get: get, set: put, add: add, count: count } };
  /* el contador siempre refleja el carrito real */
  window.cassixSetCart = function () { badge(); };
  document.addEventListener('cassix:add', function (e) {
    var d = e.detail || {}; add(d.product, d.size, 1); badge(); toast(d.product);
  });
  window.addEventListener('storage', function (e) { if (e.key === KEY) badge(); });

  /* ---------- estilos comunes ---------- */
  var css = '.cxt{position:fixed;left:50%;bottom:calc(20px + env(safe-area-inset-bottom,0px));transform:translate(-50%,30px);opacity:0;z-index:9000;display:flex;align-items:center;gap:16px;max-width:calc(100vw - 32px);padding:14px 18px;background:#0b0b0c;color:#f6f4ef;border:1px solid #f1e08a;font:600 .86rem/1.3 Archivo,Arial,sans-serif;transition:opacity .3s,transform .35s;pointer-events:none}'
    + '.cxt.on{opacity:1;transform:translate(-50%,0);pointer-events:auto}.cxt a{color:#f1e08a;font-weight:800;text-transform:uppercase;letter-spacing:.1em;font-size:.72rem;white-space:nowrap}'
    + '.cxnp{position:fixed;inset:0;z-index:9500;display:grid;place-items:center;padding:16px;background:rgba(11,11,12,.55);opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}.cxnp.on{opacity:1;visibility:visible}'
    + '.cxnp__box{container-type:inline-size;position:relative;width:min(460px,calc(100vw - 32px),calc(100dvh - 32px));aspect-ratio:1/1;background:#f6f4ef;color:#0b0b0c;border:2px solid #e6c95a;box-shadow:8px 8px 0 #0b0b0c;overflow:hidden;font-family:Archivo,"Helvetica Neue",Arial,sans-serif}'
    + '.cxnp__in{height:100%;overflow:auto;padding:7cqw 7cqw 9cqw;display:flex;flex-direction:column;justify-content:center;gap:3.2cqw}'
    + '.cxnp__x{position:absolute;top:0;right:0;width:46px;height:46px;border:0;background:#0b0b0c;color:#f1e08a;cursor:pointer;display:grid;place-items:center;z-index:2}.cxnp__x:hover{background:#f1e08a;color:#0b0b0c}.cxnp__x svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}'
    + '.cxnp__k{margin:0;font-weight:700;font-size:max(11px,2.7cqw);letter-spacing:.2em;text-transform:uppercase;display:flex;align-items:center;gap:10px}.cxnp__k::before{content:"";width:28px;height:2px;background:#0b0b0c}'
    + '.cxnp h2{margin:0;font-weight:900;font-stretch:122%;text-transform:uppercase;line-height:.95;letter-spacing:-.025em;font-size:clamp(26px,8.6cqw,40px);padding-right:30px}.cxnp h2 em{font-style:normal;background:#f1e08a;padding:0 .1em}'
    + '.cxnp p.cxnp__t{margin:0;font-size:max(13px,3.3cqw);line-height:1.45;color:rgba(11,11,12,.78)}'
    + '.cxnp form{display:grid;gap:2.2cqw;margin:0}.cxnp input[type=email]{box-sizing:border-box;width:100%;padding:3cqw 3.2cqw;border:2px solid #0b0b0c;background:#fff;font:400 max(14px,3.5cqw) Archivo,Arial,sans-serif;border-radius:0}.cxnp input[type=email][aria-invalid=true]{border-color:#a31515}'
    + '.cxnp input:focus-visible,.cxnp button:focus-visible,.cxnp a:focus-visible{outline:3px solid #e6c95a;outline-offset:2px}'
    + '.cxnp a{color:inherit}.cxnp__ck{display:flex;gap:8px;align-items:flex-start;font-size:max(11px,2.6cqw);line-height:1.35}.cxnp__ck input{margin-top:2px;flex:none}.cxnp__ck a{text-decoration:underline;text-underline-offset:2px}'
    + '.cxnp__e{margin:0;min-height:1em;font-size:max(11px,2.6cqw);color:#a31515}'
    + '.cxnp__go{display:flex;align-items:center;justify-content:space-between;width:100%;padding:3.3cqw 4cqw;border:0;background:#0b0b0c;color:#f1e08a;cursor:pointer;font:800 max(12px,3cqw) Archivo,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase}.cxnp__go:hover{background:#f1e08a;color:#0b0b0c;outline:2px solid #0b0b0c;outline-offset:-2px}'
    + '.cxnp__no{justify-self:start;background:none;border:0;padding:0;cursor:pointer;font:600 max(12px,3cqw) Archivo,Arial,sans-serif;text-decoration:underline;text-underline-offset:3px;color:#0b0b0c}'
    + '.cxnp__bar{position:absolute;left:0;right:0;bottom:0;height:6px;background:rgba(11,11,12,.12)}.cxnp__bar i{display:block;height:100%;width:100%;background:#0b0b0c;transform-origin:left;transform:scaleX(1)}'
    + '.cxnp__code{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:3cqw 4cqw;border:2px dashed #0b0b0c;background:#fff;font:900 max(18px,6cqw) Archivo,Arial,sans-serif;letter-spacing:.12em}.cxnp__code button{border:0;background:#0b0b0c;color:#f1e08a;padding:2cqw 3cqw;cursor:pointer;font:800 max(11px,2.6cqw) Archivo,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase}'
    + '@media (prefers-reduced-motion:reduce){.cxt,.cxnp{transition:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- toast de «añadido» ---------- */
  var tt, tm;
  function toast(id) {
    var p = P[id]; if (!p) return;
    if (!tt) { tt = document.createElement('div'); tt.className = 'cxt'; tt.setAttribute('role', 'status'); document.body.appendChild(tt); }
    tt.innerHTML = '<span></span><a href="' + link('carrito/') + '">Ver carrito</a>'; tt.firstChild.textContent = p.name + ' añadido al carrito';
    tt.classList.add('on'); clearTimeout(tm); tm = setTimeout(function () { tt.classList.remove('on'); }, 3200);
  }

  /* ---------- aviso de newsletter ---------- */
  var path = location.pathname;
  var skip = /carrito|mi-cuenta|finalizar/.test(path);
  var DUR = 10000;
  function popup() {
    var forced = location.hash === '#popup';
    try { if (!forced && sessionStorage.getItem('cx-np')) return; sessionStorage.setItem('cx-np', '1'); } catch (e) {}
    var wrap = document.createElement('div'); wrap.className = 'cxnp'; wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-modal', 'true'); wrap.setAttribute('aria-labelledby', 'cxnp-h');
    wrap.innerHTML = '<div class="cxnp__box"><button class="cxnp__x" type="button" aria-label="Cerrar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button>'
      + '<div class="cxnp__in" id="cxnp-in"><p class="cxnp__k">Cassix Club</p><h2 id="cxnp-h"><em>10% off</em> en tu primera compra</h2>'
      + '<p class="cxnp__t">Apúntate a la newsletter y te enviamos tu código. También te avisamos de los próximos drops.</p>'
      + '<form id="cxnp-f" novalidate><input id="cxnp-e" type="email" placeholder="Tu correo electrónico" autocomplete="email" inputmode="email" aria-label="Correo electrónico">'
      + '<label class="cxnp__ck"><input id="cxnp-k" type="checkbox"><span>Acepto recibir emails de Cassix y la <a href="' + link('privacidad/') + '">política de privacidad</a>. Puedo darme de baja cuando quiera.</span></label>'
      + '<p class="cxnp__e" id="cxnp-m" role="alert"></p><button class="cxnp__go" type="submit"><span>Quiero mi 10%</span><span aria-hidden="true">→</span></button></form>'
      + '<button class="cxnp__no" type="button" id="cxnp-no">No, gracias</button></div><div class="cxnp__bar" aria-hidden="true"><i id="cxnp-b"></i></div></div>';
    document.body.appendChild(wrap);
    var box = wrap.firstChild, bar = wrap.querySelector('#cxnp-b'), last = document.activeElement, left = DUR, t0 = 0, tmr = null, done = false;
    function tick() { // barra de cuenta atrás
      if (!t0) return; var r = Math.max(0, left - (performance.now() - t0)); bar.style.transform = 'scaleX(' + (r / DUR) + ')'; if (r > 0) requestAnimationFrame(tick);
    }
    function run() { if (done) return; t0 = performance.now(); clearTimeout(tmr); tmr = setTimeout(close, left); requestAnimationFrame(tick); }
    function pause() { if (!t0) return; left = Math.max(0, left - (performance.now() - t0)); t0 = 0; clearTimeout(tmr); }
    function close() { clearTimeout(tmr); t0 = 0; wrap.classList.remove('on'); document.removeEventListener('keydown', key); setTimeout(function () { wrap.remove(); }, 350); if (last && last.focus) try { last.focus({ preventScroll: true }); } catch (e) {} }
    function key(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', key);
    wrap.addEventListener('click', function (e) { if (e.target === wrap) close(); });
    wrap.querySelector('.cxnp__x').onclick = close; wrap.querySelector('#cxnp-no').onclick = close;
    box.addEventListener('pointerenter', pause); box.addEventListener('pointerleave', function () { if (!box.contains(document.activeElement) || document.activeElement === wrap.querySelector('.cxnp__x')) run(); });
    box.addEventListener('focusin', function (e) { if (e.target.matches('input')) pause(); });
    box.addEventListener('focusout', function () { setTimeout(function () { if (!box.matches(':hover') && !box.querySelector('input:focus')) run(); }, 0); });
    wrap.querySelector('#cxnp-f').addEventListener('submit', function (e) {
      e.preventDefault(); var em = wrap.querySelector('#cxnp-e'), k = wrap.querySelector('#cxnp-k'), m = wrap.querySelector('#cxnp-m');
      em.removeAttribute('aria-invalid');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim())) { m.textContent = 'Escribe un correo válido.'; em.setAttribute('aria-invalid', 'true'); em.focus(); return; }
      if (!k.checked) { m.textContent = 'Debes aceptar la política de privacidad.'; k.focus(); return; }
      done = true; pause();
      wrap.querySelector('#cxnp-in').innerHTML = '<p class="cxnp__k">Cassix Club</p><h2 id="cxnp-h">¡Ya estás <em>dentro!</em></h2><p class="cxnp__t">Este es tu código del 10% para tu primera compra. Úsalo en el carrito.</p>'
        + '<div class="cxnp__code"><span id="cxnp-c">CASSIX10</span><button type="button" id="cxnp-cp">Copiar</button></div><button class="cxnp__no" type="button" id="cxnp-ok">Seguir comprando</button>';
      bar.parentNode.style.display = 'none';
      wrap.querySelector('#cxnp-ok').onclick = close;
      wrap.querySelector('#cxnp-cp').onclick = function () { var b = this; (navigator.clipboard ? navigator.clipboard.writeText('CASSIX10') : Promise.reject()).then(function () { b.textContent = 'Copiado'; }, function () { b.textContent = 'CASSIX10'; }); };
      wrap.querySelector('#cxnp-ok').focus();
    });
    requestAnimationFrame(function () { wrap.classList.add('on'); run(); });
  }
  function init() { badge(); if (!skip) setTimeout(popup, 900); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
