/* nexus-scene — Meritbyte "Nexus Engine" scroll-driven 3D scene (Three.js r128 UMD via window.THREE)
   One fixed WebGL canvas behind the DOM. Anchors: elements with [data-nx] give each 3D object a
   document position; on scroll the hero engine breaks apart and pieces fly to their sections. */
(function () {
  if (customElements.get('nexus-scene')) return;

  var TAU = Math.PI * 2;
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smoother(t) { t = clamp(t, 0, 1); return t * t * t * (t * (t * 6 - 15) + 10); }
  function fract(x) { return x - Math.floor(x); }

  customElements.define('nexus-scene', class extends HTMLElement {
    static get observedAttributes() { return ['accent', 'accent2', 'motion']; }

    connectedCallback() {
      if (this._started) return; this._started = true;
      this.style.cssText = 'display:block;position:fixed;inset:0;z-index:1;pointer-events:none;';
      var self = this, t0 = Date.now();
      (function poll() {
        if (window.THREE) { try { self._boot(); } catch (e) { console.error('nexus boot failed', e); self._fallback(); } }
        else if (Date.now() - t0 < 9000) setTimeout(poll, 60);
        else self._fallback();
      })();
    }

    disconnectedCallback() {
      this._dead = true;
      if (this._raf) cancelAnimationFrame(this._raf);
      if (this._un) this._un.forEach(function (f) { f(); });
      if (this._renderer) this._renderer.dispose();
    }

    attributeChangedCallback() { if (this._ready) this._retint(); }

    _fallback() {
      var d = document.createElement('div');
      d.style.cssText = 'position:absolute;inset:0;background:' +
        'radial-gradient(60% 50% at 72% 30%, rgba(85,224,255,.14), transparent 70%),' +
        'radial-gradient(50% 40% at 20% 70%, rgba(143,123,255,.10), transparent 70%);';
      this.appendChild(d);
    }

    /* ---------------- colors ---------------- */
    _colors() {
      var T = window.THREE;
      return {
        acc: new T.Color(this.getAttribute('accent') || '#55E0FF'),
        acc2: new T.Color(this.getAttribute('accent2') || '#8F7BFF'),
        ink: new T.Color('#EAF2FF'),
        dark: new T.Color('#141B2C'),
        red: new T.Color('#FF5D6E')
      };
    }

    _retint() {
      var C = this._colors(); var self = this;
      if (!this._scene) return;
      this._scene.traverse(function (o) {
        var m = o.material; if (!m) return;
        var tint = m.userData && m.userData.tint;
        if (tint === 'acc') { if (m.color) m.color.copy(C.acc); if (m.emissive) m.emissive.copy(C.acc); }
        if (tint === 'acc2') { if (m.color) m.color.copy(C.acc2); if (m.emissive) m.emissive.copy(C.acc2); }
        if (tint === 'accEm') { if (m.emissive) m.emissive.copy(C.acc); }
      });
      (this._lightsAcc || []).forEach(function (l) { l.color.copy(C.acc); });
      (this._lightsAcc2 || []).forEach(function (l) { l.color.copy(C.acc2); });
      (this._redraws || []).forEach(function (r) { r.draw('#' + C.acc.getHexString(), '#' + C.acc2.getHexString()); r.tex.needsUpdate = true; });
      this.C = C;
    }

    /* ---------------- boot ---------------- */
    _boot() {
      var T = window.THREE, self = this;
      this.C = this._colors();
      var calm = (this.getAttribute('motion') === 'calm');
      var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.speed = (calm || rm) ? 0.45 : 1;
      this.pf = (calm || rm) ? 0.55 : 1; // particle factor

      var renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.outputEncoding = T.sRGBEncoding;
      renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
      this.appendChild(renderer.domElement);
      this._renderer = renderer;

      var scene = new T.Scene(); this._scene = scene;
      this.fov = 42; this.camZ = 16;
      var camera = new T.PerspectiveCamera(this.fov, 1, 0.1, 260);
      camera.position.set(0, 0, this.camZ);
      this._camera = camera;

      /* lights */
      scene.add(new T.AmbientLight(0x2a3350, 1.15));
      var key = new T.PointLight(this.C.acc.getHex(), 1.15, 0, 2); key.position.set(9, 6, 10); scene.add(key);
      var rim = new T.DirectionalLight(this.C.acc2.getHex(), 0.65); rim.position.set(-8, -4, -6); scene.add(rim);
      var fill = new T.DirectionalLight(0xbfd4ff, 0.35); fill.position.set(2, 10, 4); scene.add(fill);
      this._lightsAcc = [key]; this._lightsAcc2 = [rim];
      this._redraws = [];

      /* shared sprite */
      this.glowTex = this._makeGlow();

      /* build */
      this._buildStars();
      this.pieces = {
        ai: this._buildCore(),
        code: this._buildBlocks(),
        web: this._buildPanels(),
        mkt: this._buildBeacon(),
        seo: this._buildLens(),
        cloud: this._buildCloud()
      };
      this.pieceOrder = [
        { key: 'code', stag: 0, eScale: 0.62, sScale: 1.12, spin: 0.10 },
        { key: 'ai', stag: 1, eScale: 0.92, sScale: 1.22, spin: 0.14 },
        { key: 'web', stag: 2, eScale: 0.80, sScale: 1.02, spin: 0.02 },
        { key: 'mkt', stag: 3, eScale: 0.52, sScale: 1.05, spin: 0.05, orbit: { r: 4.15, sp: 0.24, ph: 2.1, tilt: 0.32 } },
        { key: 'seo', stag: 4, eScale: 0.52, sScale: 1.0, spin: 0.06, orbit: { r: 4.15, sp: 0.24, ph: 5.25, tilt: -0.26 } },
        { key: 'cloud', stag: 5, eScale: 0.62, sScale: 1.1, spin: 0.03, eOff: [0, -3.55, 0] }
      ];
      var order = this.pieceOrder;
      for (var i = 0; i < order.length; i++) { var p = this.pieces[order[i].key]; p.user = { yaw: 0, pitch: 0, vy: 0, vp: 0 }; scene.add(p.group); }
      /* register piece materials/lights for flight-fade */
      var regFade = function (p2) {
        p2.mats = []; p2.lights = [];
        var seen = [];
        p2.group.traverse(function (o) {
          if (o.material && seen.indexOf(o.material) < 0) { seen.push(o.material); o.material.transparent = true; p2.mats.push({ m: o.material, iv: o.material.opacity === undefined ? 1 : o.material.opacity }); }
          if (o.isPointLight) p2.lights.push({ l: o, iv: o.intensity });
        });
      };
      for (var ri = 0; ri < order.length; ri++) regFade(this.pieces[order[ri].key]);

      this.minis = {};
      var miniKinds = { m1: 'qa', m2: 'gears', m3: 'shield', m4: 'canvas', m5: 'chart', m6: 'hub' };
      for (var k in miniKinds) { var mn = this._buildMini(miniKinds[k]); this.minis[k] = mn; scene.add(mn.group); }
      this.emblem = this._buildEmblem(); scene.add(this.emblem.group);
      this.heroCube = this._buildHeroCube(); scene.add(this.heroCube.group);

      /* state */
      this.mx = 0; this.my = 0; this.scrollSm = window.scrollY;
      this._mYaw = 0; this._mPitch = 0;
      this.engine = { yaw: 0, pitch: 0, uYaw: 0, uPitch: 0, vy: 0, vp: 0 };
      this._drag = null;

      /* listeners */
      var un = this._un = [];
      function on(t, ev, fn, op) { t.addEventListener(ev, fn, op || { passive: true }); un.push(function () { t.removeEventListener(ev, fn); }); }
      on(window, 'resize', function () { self._resize(); });
      on(window, 'pointermove', function (e) {
        self.mx = (e.clientX / self.vw) * 2 - 1; self.my = -(e.clientY / self.vh) * 2 + 1;
        if (self._drag) {
          var dx = e.clientX - self._drag.x, dy = e.clientY - self._drag.y;
          self._drag.x = e.clientX; self._drag.y = e.clientY; self._drag.moved += Math.abs(dx) + Math.abs(dy);
          if (self._drag.moved > 6) document.body.style.userSelect = 'none';
          var tgt = self._drag.tgt;
          tgt.vy = dx * 0.006; tgt.vp = dy * 0.004;
          tgt.uYaw += tgt.vy; tgt.uPitch = clamp(tgt.uPitch + tgt.vp, -0.7, 0.7);
        }
      });
      on(window, 'pointerdown', function (e) {
        if (e.target && e.target.closest && e.target.closest('a,button,input,textarea,select,[data-nodrag]')) return;
        self._drag = { x: e.clientX, y: e.clientY, moved: 0, tgt: self._dragTarget() };
      });
      on(window, 'pointerup', function () { self._drag = null; document.body.style.userSelect = ''; });
      on(window, 'blur', function () { self._drag = null; document.body.style.userSelect = ''; });

      this._resize();
      /* re-measure after layout settles (fonts, streaming) */
      var t = 0, iv = setInterval(function () { self._measure(); if (++t > 14) clearInterval(iv); }, 700);
      un.push(function () { clearInterval(iv); });
      if (window.ResizeObserver) { var ro = new ResizeObserver(function () { self._measure(); }); ro.observe(document.body); un.push(function () { ro.disconnect(); }); }

      this._clock = new T.Clock();
      this._ready = true;
      if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { if (!self._dead) self._retint(); }); }
      this._loop();
    }

    _dragTarget() {
      // piece whose section is centered → rotate it; otherwise the hero engine
      var mid = this.scrollSm + this.vh / 2, best = null, bd = 1e9;
      for (var i = 0; i < this.pieceOrder.length; i++) {
        var o = this.pieceOrder[i], a = this.anchors[o.key], p = this.pieces[o.key];
        if (!a || !p || p.e < 0.85) continue;
        var d = Math.abs(a.docY - mid);
        if (d < this.vh * 0.55 && d < bd) { bd = d; best = p.user; }
      }
      return best || this.engine;
    }

    /* ---------------- measure / resize ---------------- */
    _resize() {
      this.vw = window.innerWidth; this.vh = window.innerHeight;
      this._renderer.setSize(this.vw, this.vh);
      this._camera.aspect = this.vw / this.vh;
      this._camera.updateProjectionMatrix();
      this.upp = (2 * this.camZ * Math.tan(this.fov * Math.PI / 360)) / this.vh; // world units per px
      this.visH = this.upp * this.vh; this.visW = this.upp * this.vw;
      this.gs = clamp(this.vw / 1500, 0.52, 1.06); // global object scale
      this._measure();
    }

    _measure() {
      var els = document.querySelectorAll('[data-nx]');
      var a = {}; var sy = window.scrollY;
      for (var i = 0; i < els.length; i++) {
        var el = els[i], r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        var yf = el.getAttribute('data-nx-yf'); yf = yf === null ? 0.5 : parseFloat(yf);
        var oy = parseFloat(el.getAttribute('data-nx-oy') || '0');
        a[el.getAttribute('data-nx')] = { docY: sy + r.top + r.height * yf + oy, fx: (r.left + r.width / 2) / this.vw };
      }
      this.anchors = a;
    }

    _world(key, out) {
      var a = this.anchors[key];
      if (!a) { out.set(0, 0, 0); return out; }
      out.set((a.fx - 0.5) * this.visW, -a.docY * this.upp, 0);
      return out;
    }

    /* ---------------- textures ---------------- */
    _makeGlow() {
      var T = window.THREE, c = document.createElement('canvas'); c.width = c.height = 128;
      var x = c.getContext('2d'), g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.25, 'rgba(255,255,255,.55)');
      g.addColorStop(0.6, 'rgba(255,255,255,.12)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = g; x.fillRect(0, 0, 128, 128);
      var t = new T.CanvasTexture(c); return t;
    }
    _glyphTex(ch) {
      var T = window.THREE, c = document.createElement('canvas'); c.width = c.height = 96;
      var x = c.getContext('2d'); x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.font = '600 52px "IBM Plex Mono", monospace'; x.fillText(ch, 48, 52);
      return new T.CanvasTexture(c);
    }
    _sprite(color, scale, opacity, tint) {
      var T = window.THREE;
      var m = new T.SpriteMaterial({ map: this.glowTex, color: color.clone ? color.clone() : color, transparent: true, opacity: opacity === undefined ? 0.9 : opacity, blending: T.AdditiveBlending, depthWrite: false });
      m.userData.tint = tint || 'acc';
      var s = new T.Sprite(m); s.scale.setScalar(scale); return s;
    }

    /* ---------------- stars ---------------- */
    _buildStars() {
      var T = window.THREE, n = Math.floor(720 * this.pf), pos = new Float32Array(n * 3);
      for (var i = 0; i < n; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 90;
        pos[i * 3 + 1] = 16 - Math.random() * 210;
        pos[i * 3 + 2] = -10 - Math.random() * 30;
      }
      var g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(pos, 3));
      var m = new T.PointsMaterial({ map: this.glowTex, color: 0x9db8e8, size: 0.16, transparent: true, opacity: 0.5, blending: T.AdditiveBlending, depthWrite: false, sizeAttenuation: true });
      this.stars = new T.Points(g, m); this._scene.add(this.stars);
    }

    /* ---------------- AI: Neural Core ---------------- */
    _buildCore() {
      var T = window.THREE, C = this.C, g = new T.Group();
      var n = Math.floor(120 * this.pf) + 40, pts = [], pos = new Float32Array(n * 3);
      for (var i = 0; i < n; i++) {
        var ph = Math.acos(1 - 2 * (i + 0.5) / n), th = Math.PI * (1 + Math.sqrt(5)) * i;
        var r = 1.0 + (Math.random() - 0.5) * 0.16;
        var v = new T.Vector3(Math.sin(ph) * Math.cos(th) * r, Math.cos(ph) * r, Math.sin(ph) * Math.sin(th) * r);
        pts.push(v); pos.set([v.x, v.y, v.z], i * 3);
      }
      var pg = new T.BufferGeometry(); pg.setAttribute('position', new T.BufferAttribute(pos, 3));
      var pm = new T.PointsMaterial({ map: this.glowTex, color: C.acc.clone(), size: 0.16, transparent: true, opacity: 0.95, blending: T.AdditiveBlending, depthWrite: false });
      pm.userData.tint = 'acc';
      g.add(new T.Points(pg, pm));
      // synapse links
      var lp = [];
      for (var a = 0; a < n; a++) for (var b = a + 1; b < n; b++) {
        if (pts[a].distanceTo(pts[b]) < 0.52) lp.push(pts[a].x, pts[a].y, pts[a].z, pts[b].x, pts[b].y, pts[b].z);
      }
      var lg = new T.BufferGeometry(); lg.setAttribute('position', new T.Float32BufferAttribute(lp, 3));
      var lm = new T.LineBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.30, blending: T.AdditiveBlending, depthWrite: false });
      lm.userData.tint = 'acc';
      g.add(new T.LineSegments(lg, lm));
      // inner nucleus + outer cage
      var nm = new T.MeshBasicMaterial({ color: C.acc2.clone(), wireframe: true, transparent: true, opacity: 0.55 }); nm.userData.tint = 'acc2';
      var nucleus = new T.Mesh(new T.IcosahedronGeometry(0.46, 1), nm); g.add(nucleus);
      var cm = new T.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.10 });
      var cage = new T.Mesh(new T.IcosahedronGeometry(1.3, 1), cm); g.add(cage);
      var heart = this._sprite(C.acc.clone(), 2.6, 0.85); g.add(heart);
      var light = new T.PointLight(C.acc.getHex(), 1.0, 14, 2); g.add(light); this._lightsAcc.push(light);
      var self = this;
      return {
        group: g, e: 0, hover: 0,
        update: function (t, dt, e) {
          nucleus.rotation.y += dt * 0.8; nucleus.rotation.x += dt * 0.3;
          cage.rotation.y -= dt * 0.22;
          var pulse = 0.5 + 0.5 * Math.sin(t * 2.1);
          var boost = 1 + this.hover * 1.6;
          pm.opacity = (0.7 + 0.3 * pulse) * boost > 1 ? 1 : (0.7 + 0.3 * pulse) * Math.min(boost, 1.35);
          pm.size = 0.16 * (1 + this.hover * 0.5);
          lm.opacity = (0.22 + 0.18 * pulse) * boost;
          heart.material.opacity = 0.55 + 0.35 * pulse + this.hover * 0.4;
          heart.scale.setScalar(2.6 + pulse * 0.5 + this.hover * 1.2);
          light.intensity = 0.8 + pulse * 0.6 + this.hover * 1.4;
        }
      };
    }

    /* ---------------- Software: Code Matrix ---------------- */
    _buildBlocks() {
      var T = window.THREE, C = this.C, g = new T.Group();
      var cells = [];
      for (var x = -1; x <= 1; x++) for (var y = -1; y <= 1; y++) for (var z = -1; z <= 1; z++) {
        var m = Math.abs(x) + Math.abs(y) + Math.abs(z);
        if (m === 3 || m === 1) cells.push([x, y, z]); // 8 corners + 6 face centers
      }
      var geo = new T.BoxGeometry(0.6, 0.6, 0.6);
      var edge = new T.EdgesGeometry(geo);
      var bm = new T.MeshStandardMaterial({ color: 0x1b2436, metalness: 0.85, roughness: 0.32 });
      var blocks = [];
      for (var i = 0; i < cells.length; i++) {
        var em = new T.LineBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.75 }); em.userData.tint = 'acc';
        var mesh = new T.Mesh(geo, bm);
        mesh.add(new T.LineSegments(edge, em));
        var c = cells[i];
        var grid = new T.Vector3(c[0] * 0.74, c[1] * 0.74, c[2] * 0.74);
        var ang = (i / cells.length) * TAU;
        var shell = new T.Vector3(Math.cos(ang) * 2.3, Math.sin(ang * 2) * 0.7, Math.sin(ang) * 2.3);
        blocks.push({ mesh: mesh, grid: grid, shell: shell, dir: grid.clone().normalize(), ph: Math.random() * TAU, gp: (i % 4) });
        g.add(mesh);
      }
      // data seam lines
      var lp = [];
      for (var a = 0; a < blocks.length; a++) for (var b = a + 1; b < blocks.length; b++) {
        if (blocks[a].grid.distanceTo(blocks[b].grid) < 1.1) {
          lp.push(blocks[a].grid.x, blocks[a].grid.y, blocks[a].grid.z, blocks[b].grid.x, blocks[b].grid.y, blocks[b].grid.z);
        }
      }
      var lg = new T.BufferGeometry(); lg.setAttribute('position', new T.Float32BufferAttribute(lp, 3));
      var lm = new T.LineBasicMaterial({ color: C.acc2.clone(), transparent: true, opacity: 0.0, blending: T.AdditiveBlending, depthWrite: false });
      lm.userData.tint = 'acc2';
      g.add(new T.LineSegments(lg, lm));
      var tmp = new T.Vector3();
      return {
        group: g, e: 0,
        update: function (t, dt, e) {
          var swirl = t * 0.45;
          for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i];
            // snap: pull apart slowly, snap back sharp (per group phase)
            var cyc = fract(t * 0.16 + b.gp * 0.25);
            var ext = cyc < 0.7 ? smoother(cyc / 0.7) : smoother((1 - cyc) / 0.3);
            tmp.copy(b.shell).applyAxisAngle(new T.Vector3(0, 1, 0), swirl + b.ph * 0.1);
            var gx = b.grid.x + b.dir.x * ext * 0.5, gy = b.grid.y + b.dir.y * ext * 0.5, gz = b.grid.z + b.dir.z * ext * 0.5;
            b.mesh.position.set(lerp(tmp.x, gx, e), lerp(tmp.y, gy, e), lerp(tmp.z, gz, e));
            var wob = (1 - e) * 0.8;
            b.mesh.rotation.set(b.ph * wob, swirl * wob + b.ph, 0);
          }
          lm.opacity = e * (0.35 + 0.3 * Math.abs(Math.sin(t * 2.4)));
        }
      };
    }

    /* ---------------- Web: Layer Stack ---------------- */
    _panelTex(kind) {
      var T = window.THREE, c = document.createElement('canvas'); c.width = 512; c.height = 336;
      var tex = new T.CanvasTexture(c); tex.anisotropy = 4;
      var draw = function (acc, acc2) {
        var x = c.getContext('2d'); x.clearRect(0, 0, 512, 336);
        function rr(a, b, w, h, r) { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); }
        rr(2, 2, 508, 332, 22); x.fillStyle = 'rgba(9,14,26,.72)'; x.fill();
        x.strokeStyle = 'rgba(255,255,255,.22)'; x.lineWidth = 2; x.stroke();
        if (kind === 'ui') {
          x.fillStyle = 'rgba(255,255,255,.14)';
          x.beginPath(); x.arc(34, 32, 7, 0, TAU); x.arc(58, 32, 7, 0, TAU); x.arc(82, 32, 7, 0, TAU); x.fill();
          x.fillStyle = 'rgba(255,255,255,.9)'; rr(34, 74, 250, 22, 8); x.fill();
          x.fillStyle = 'rgba(255,255,255,.55)'; rr(34, 108, 190, 14, 7); x.fill();
          x.fillStyle = acc; rr(34, 148, 132, 36, 18); x.fill();
          x.strokeStyle = acc2; x.lineWidth = 3; x.beginPath();
          x.moveTo(320, 200); x.lineTo(352, 160); x.lineTo(384, 178); x.lineTo(420, 120); x.lineTo(462, 138); x.stroke();
          x.fillStyle = 'rgba(255,255,255,.10)'; rr(34, 216, 444, 84, 14); x.fill();
          x.fillStyle = acc; x.beginPath(); x.arc(462, 120, 5, 0, TAU); x.fill();
        } else if (kind === 'wire') {
          x.strokeStyle = 'rgba(255,255,255,.4)'; x.lineWidth = 2; x.setLineDash([7, 7]);
          rr(30, 32, 452, 60, 10); x.stroke();
          rr(30, 112, 214, 130, 10); x.stroke();
          rr(268, 112, 214, 130, 10); x.stroke();
          rr(30, 262, 452, 44, 10); x.stroke();
          x.setLineDash([]);
          x.strokeStyle = acc; x.beginPath(); x.moveTo(30, 62); x.lineTo(482, 62); x.stroke();
          x.strokeStyle = 'rgba(255,255,255,.28)'; x.beginPath(); x.moveTo(52, 150); x.lineTo(150, 240); x.moveTo(150, 150); x.lineTo(52, 240); x.stroke();
        } else {
          x.font = '500 21px "IBM Plex Mono", monospace';
          var rows = ['{ "id": 4021,', '  "svc": ["api","web"],', '  "uptime": 99.99,', '  "cache": "edge",', '  "deploy": "auto" }'];
          for (var i = 0; i < rows.length; i++) { x.fillStyle = i % 2 ? acc2 : 'rgba(220,232,255,.7)'; x.fillText(rows[i], 36, 62 + i * 42); }
          x.fillStyle = acc;
          for (var d = 0; d < 14; d++) { x.globalAlpha = 0.25 + 0.5 * Math.random(); x.beginPath(); x.arc(60 + d * 30, 296, 3.4, 0, TAU); x.fill(); }
          x.globalAlpha = 1;
        }
      };
      draw('#' + this.C.acc.getHexString(), '#' + this.C.acc2.getHexString());
      this._redraws.push({ draw: draw, tex: tex });
      return tex;
    }

    _buildPanels() {
      var T = window.THREE, g = new T.Group();
      var kinds = ['data', 'wire', 'ui'];
      var panels = [];
      var geo = new T.PlaneGeometry(2.9, 1.9);
      for (var i = 0; i < 3; i++) {
        var m = new T.MeshBasicMaterial({ map: this._panelTex(kinds[i]), transparent: true, opacity: 0.96, side: T.DoubleSide, depthWrite: false });
        var mesh = new T.Mesh(geo, m);
        // shell pose: wrap around core like a curved interface shell
        var ang = -0.7 + i * 0.7;
        var sp = new T.Vector3(Math.sin(ang) * 3.1, (i - 1) * 0.55, Math.cos(ang) * 3.1);
        var o = new T.Object3D(); o.position.copy(sp); o.lookAt(0, 0, 0); o.rotateY(Math.PI);
        // stack pose: isometric exploded stack
        var st = new T.Vector3(i * 0.16 - 0.16, i * 0.92 - 0.92, i * 0.05);
        var so = new T.Object3D(); so.position.copy(st); so.rotation.set(-0.5, 0.0, 0.06);
        panels.push({ mesh: mesh, sPos: sp, sQ: o.quaternion.clone(), tPos: st, tQ: so.quaternion.clone(), ph: i * 2.1 });
        g.add(mesh);
      }
      var q = new T.Quaternion();
      return {
        group: g, e: 0,
        update: function (t, dt, e) {
          for (var i = 0; i < panels.length; i++) {
            var p = panels[i];
            var bob = Math.sin(t * 0.9 + p.ph) * 0.09 * e;
            p.mesh.position.lerpVectors(p.sPos, p.tPos, e); p.mesh.position.y += bob;
            q.slerpQuaternions ? q.slerpQuaternions(p.sQ, p.tQ, e) : T.Quaternion.slerp(p.sQ, p.tQ, q, e);
            p.mesh.quaternion.copy(q);
            p.mesh.material.opacity = 0.5 + 0.46 * e;
          }
        }
      };
    }

    /* ---------------- Marketing: Signal Beacon ---------------- */
    _buildBeacon() {
      var T = window.THREE, C = this.C, g = new T.Group();
      var body = new T.Mesh(new T.CylinderGeometry(0.14, 0.44, 2.5, 4, 1), new T.MeshStandardMaterial({ color: 0x131a2c, metalness: 0.9, roughness: 0.28 }));
      body.rotation.y = Math.PI / 4; g.add(body);
      var em = new T.LineBasicMaterial({ color: C.acc2.clone(), transparent: true, opacity: 0.8 }); em.userData.tint = 'acc2';
      body.add(new T.LineSegments(new T.EdgesGeometry(body.geometry), em));
      var tipM = new T.MeshBasicMaterial({ color: C.acc.clone() }); tipM.userData.tint = 'acc';
      var tip = new T.Mesh(new T.OctahedronGeometry(0.17), tipM); tip.position.y = 1.45; g.add(tip);
      var halo = this._sprite(C.acc.clone(), 1.5, 0.9); halo.position.y = 1.45; g.add(halo);
      var baseM = new T.MeshBasicMaterial({ color: C.acc2.clone(), transparent: true, opacity: 0.35 }); baseM.userData.tint = 'acc2';
      var base = new T.Mesh(new T.RingGeometry(0.55, 0.6, 48), baseM); base.rotation.x = -Math.PI / 2; base.position.y = -1.34; g.add(base);
      // ripple rings pool
      var rings = [];
      for (var i = 0; i < 5; i++) {
        var rm = new T.MeshBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0, side: T.DoubleSide, blending: T.AdditiveBlending, depthWrite: false });
        rm.userData.tint = 'acc';
        var ring = new T.Mesh(new T.RingGeometry(0.96, 1.0, 72), rm);
        ring.rotation.x = -Math.PI / 2; ring.position.y = -1.0;
        rings.push({ mesh: ring, t: i / 5 }); g.add(ring);
      }
      // channel glyphs
      var glyphs = ['$', '@', '#', '>', '&', '%'], gl = [];
      for (var j = 0; j < glyphs.length; j++) {
        var gm = new T.SpriteMaterial({ map: this._glyphTex(glyphs[j]), color: C.acc.clone(), transparent: true, opacity: 0, depthWrite: false });
        gm.userData.tint = 'acc';
        var s = new T.Sprite(gm); s.scale.setScalar(0.42); gl.push({ s: s, ph: j / glyphs.length * TAU }); g.add(s);
      }
      return {
        group: g, e: 0,
        update: function (t, dt, e) {
          tip.rotation.y += dt * 2;
          halo.material.opacity = 0.55 + 0.35 * Math.sin(t * 3);
          for (var i = 0; i < rings.length; i++) {
            var r = rings[i]; r.t += dt * 0.22; if (r.t > 1) r.t -= 1;
            var s = 0.6 + r.t * (2.6 + 2.6 * e);
            r.mesh.scale.setScalar(s);
            r.mesh.material.opacity = (1 - r.t) * (0.10 + 0.38 * e);
          }
          for (var j = 0; j < gl.length; j++) {
            var o = gl[j], a = o.ph + t * 0.5;
            o.s.position.set(Math.cos(a) * 1.55, Math.sin(t * 0.8 + o.ph * 2) * 0.75, Math.sin(a) * 1.55);
            o.s.material.opacity = e * (0.4 + 0.3 * Math.sin(t * 2 + o.ph));
          }
        }
      };
    }

    /* ---------------- SEO: Deep Search ---------------- */
    _buildLens() {
      var T = window.THREE, C = this.C, g = new T.Group();
      var lens = new T.Group();
      var rimM = new T.MeshStandardMaterial({ color: 0x27314e, metalness: 0.92, roughness: 0.2 });
      lens.add(new T.Mesh(new T.TorusGeometry(0.92, 0.09, 16, 72), rimM));
      var edgeM = new T.MeshBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.9 }); edgeM.userData.tint = 'acc';
      lens.add(new T.Mesh(new T.TorusGeometry(0.92, 0.012, 8, 72), edgeM));
      var glassM = new T.MeshPhongMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.16, shininess: 90, side: T.DoubleSide }); glassM.userData.tint = 'acc';
      lens.add(new T.Mesh(new T.CircleGeometry(0.86, 48), glassM));
      lens.position.y = 1.15; lens.rotation.x = -Math.PI / 2 + 0.35;
      g.add(lens);
      // topo map
      var topo = new T.Group(); g.add(topo);
      var pg = new T.PlaneGeometry(7.4, 4.6, 46, 28);
      var peak = new T.Vector3(1.15, 0.35, 0), pk = new T.Vector2(1.15, -0.35);
      var pos = pg.attributes.position;
      var maxH = 0, maxV = new T.Vector3();
      for (var i = 0; i < pos.count; i++) {
        var vx = pos.getX(i), vy = pos.getY(i);
        var d2 = (vx - pk.x) * (vx - pk.x) + (vy - pk.y) * (vy - pk.y);
        var h = 1.55 * Math.exp(-d2 / 0.55) + 0.34 * Math.sin(vx * 1.6 + vy) * Math.cos(vy * 1.9) + 0.18 * Math.sin(vx * 3.1);
        pos.setZ(i, h);
        if (h > maxH) { maxH = h; maxV.set(vx, vy, h); }
      }
      pg.rotateX(-Math.PI / 2);
      var tm = new T.MeshBasicMaterial({ color: C.acc2.clone(), wireframe: true, transparent: true, opacity: 0.0 }); tm.userData.tint = 'acc2';
      var tmesh = new T.Mesh(pg, tm); tmesh.position.y = -1.9; topo.add(tmesh);
      var peakW = new T.Vector3(maxV.x, -1.9 + maxV.z, -maxV.y);
      var pgl = this._sprite(C.acc.clone(), 1.6, 0); pgl.position.copy(peakW); topo.add(pgl);
      // beam
      var from = new T.Vector3(0, 1.15, 0);
      var dir = peakW.clone().sub(from), len = dir.length();
      var beamM = new T.MeshBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false, side: T.DoubleSide }); beamM.userData.tint = 'acc';
      var beam = new T.Mesh(new T.CylinderGeometry(0.05, 0.52, len, 18, 1, true), beamM);
      beam.position.copy(from).add(dir.multiplyScalar(0.5));
      beam.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), peakW.clone().sub(from).normalize().negate());
      g.add(beam);
      return {
        group: g, e: 0, peak: pgl, beamM: beamM, topoM: tm,
        update: function (t, dt, e) {
          lens.rotation.z = Math.sin(t * 0.7) * 0.12;
          lens.position.y = 1.15 + Math.sin(t * 1.1) * 0.07;
          tm.opacity = e * 0.42;
          beamM.opacity = e * (0.14 + 0.06 * Math.sin(t * 5));
          pgl.material.opacity = e * (0.7 + 0.3 * Math.sin(t * 2.4));
        }
      };
    }

    /* ---------------- Cloud: Cloud Engine ---------------- */
    _buildCloud() {
      var T = window.THREE, C = this.C, g = new T.Group();
      var slabM = new T.MeshPhysicalMaterial({ color: 0x0c1220, metalness: 0.7, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.2 });
      var slabs = [];
      for (var i = 0; i < 3; i++) {
        var s = new T.Mesh(new T.BoxGeometry(2.35, 0.4, 1.5), slabM);
        s.position.y = -1.15 + i * 0.62; g.add(s); slabs.push(s);
        var em = new T.LineBasicMaterial({ color: 0x3a4a6e, transparent: true, opacity: 0.9 });
        s.add(new T.LineSegments(new T.EdgesGeometry(s.geometry), em));
        // LED strip
        var ledM = new T.MeshBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.9 }); ledM.userData.tint = 'acc';
        for (var d = 0; d < 5; d++) {
          var led = new T.Mesh(new T.PlaneGeometry(0.09, 0.06), ledM);
          led.position.set(-0.9 + d * 0.28, 0, 0.755); s.add(led);
        }
      }
      // cooling pipes
      var mkPipe = function (off) {
        var pts = [];
        for (var k = 0; k <= 10; k++) {
          var yy = -1.5 + k * 0.32;
          pts.push(new T.Vector3(Math.sin(yy * 2.4 + off) * 1.05, yy, Math.cos(yy * 2 + off) * 0.55));
        }
        var tube = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 40, 0.045, 8, false),
          new T.MeshBasicMaterial({ color: C.acc2.clone(), transparent: true, opacity: 0.75, blending: T.AdditiveBlending, depthWrite: false }));
        tube.material.userData.tint = 'acc2';
        return tube;
      };
      g.add(mkPipe(0)); g.add(mkPipe(2.6));
      // dissolve plume
      var n = Math.floor(240 * this.pf), P = new Float32Array(n * 3), meta = [];
      for (var j = 0; j < n; j++) {
        meta.push({ a: Math.random() * TAU, r: 0.2 + Math.random() * 0.9, y: Math.random() * 2.6, sp: 0.35 + Math.random() * 0.7 });
      }
      var geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(P, 3));
      var pm = new T.PointsMaterial({ map: this.glowTex, color: C.acc.clone(), size: 0.17, transparent: true, opacity: 0.7, blending: T.AdditiveBlending, depthWrite: false });
      pm.userData.tint = 'acc';
      var plume = new T.Points(geo, pm); g.add(plume);
      var self = this;
      return {
        group: g, e: 0,
        update: function (t, dt, e) {
          var H = 2.1 + e * 1.3;
          for (var j = 0; j < n; j++) {
            var m = meta[j];
            m.y += m.sp * dt * (0.8 + e); if (m.y > H) m.y -= H;
            m.a += dt * 0.5;
            var sprd = m.r * (0.9 + m.y * 0.42);
            P[j * 3] = Math.cos(m.a) * sprd;
            P[j * 3 + 1] = 0.05 + m.y;
            P[j * 3 + 2] = Math.sin(m.a) * sprd * 0.6;
          }
          geo.attributes.position.needsUpdate = true;
          pm.opacity = 0.4 + 0.35 * e;
          for (var i = 0; i < slabs.length; i++) slabs[i].position.x = Math.sin(t * 0.8 + i * 1.4) * 0.05 * e;
        }
      };
    }

    /* ---------------- expanded-service minis ---------------- */
    _buildMini(kind) {
      var T = window.THREE, C = this.C, g = new T.Group();
      var upd = function () {};
      if (kind === 'qa') {
        var wm = new T.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.22 });
        var outer = new T.Mesh(new T.BoxGeometry(1.5, 1.5, 1.5), wm); g.add(outer);
        var im = new T.MeshStandardMaterial({ color: 0x18213a, metalness: 0.6, roughness: 0.3, emissive: C.acc.clone(), emissiveIntensity: 0.5 }); im.userData.tint = 'acc';
        var inner = new T.Mesh(new T.BoxGeometry(0.62, 0.62, 0.62), im); g.add(inner);
        var sm = new T.MeshBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.25, side: T.DoubleSide, blending: T.AdditiveBlending, depthWrite: false }); sm.userData.tint = 'acc';
        var scan = new T.Mesh(new T.PlaneGeometry(1.5, 1.5), sm); scan.rotation.x = -Math.PI / 2; g.add(scan);
        upd = function (t, dt) { inner.rotation.y += dt * 0.9; inner.rotation.x += dt * 0.4; scan.position.y = Math.sin(t * 1.6) * 0.72; outer.rotation.y += dt * 0.15; };
      } else if (kind === 'gears') {
        var mk = function (r, teeth, col) {
          var gg = new T.Group();
          var gm = new T.MeshStandardMaterial({ color: 0x222c48, metalness: 0.85, roughness: 0.3 });
          gg.add(new T.Mesh(new T.CylinderGeometry(r, r, 0.16, 24), gm));
          var em2 = new T.MeshBasicMaterial({ color: col.clone(), transparent: true, opacity: 0.85 }); em2.userData.tint = col === C.acc ? 'acc' : 'acc2';
          gg.add(new T.Mesh(new T.TorusGeometry(r * 0.55, 0.02, 6, 40), em2)).children[gg.children.length - 1];
          var tooth = new T.BoxGeometry(0.14, 0.14, 0.16);
          for (var i = 0; i < teeth; i++) {
            var tm2 = new T.Mesh(tooth, gm), a = i / teeth * TAU;
            tm2.position.set(Math.cos(a) * (r + 0.07), 0, Math.sin(a) * (r + 0.07));
            tm2.rotation.y = -a; tm2.rotation.x = Math.PI / 2; // teeth in plane
            tm2.rotation.set(0, -a, 0);
            gg.add(tm2);
          }
          gg.rotation.x = Math.PI / 2;
          return gg;
        };
        var g1 = mk(0.62, 10, C.acc), g2 = mk(0.4, 7, C.acc2);
        g1.position.x = -0.42; g2.position.x = 0.66; g2.position.y = 0.14;
        g.add(g1); g.add(g2);
        upd = function (t, dt) { g1.rotation.y += dt * 0.7; g2.rotation.y -= dt * 1.09; };
      } else if (kind === 'shield') {
        var hm = new T.MeshBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.85 }); hm.userData.tint = 'acc';
        var hex = new T.Mesh(new T.TorusGeometry(0.85, 0.02, 6, 6), hm); g.add(hex);
        var fm = new T.MeshPhongMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.10, side: T.DoubleSide }); fm.userData.tint = 'acc';
        var face = new T.Mesh(new T.CircleGeometry(0.82, 6), fm); g.add(face);
        var core = this._sprite(C.acc2, 0.8, 0.8, 'acc2'); g.add(core);
        var n = 10, P = new Float32Array(n * 3), meta = [];
        for (var i = 0; i < n; i++) meta.push({ a: Math.random() * TAU, ph: Math.random() * TAU });
        var pg2 = new T.BufferGeometry(); pg2.setAttribute('position', new T.BufferAttribute(P, 3));
        var pm2 = new T.PointsMaterial({ map: this.glowTex, color: 0xff5d6e, size: 0.14, transparent: true, opacity: 0.9, blending: T.AdditiveBlending, depthWrite: false });
        var threats = new T.Points(pg2, pm2); g.add(threats);
        upd = function (t, dt) {
          hex.rotation.z += dt * 0.2; face.rotation.z += dt * 0.2;
          for (var i = 0; i < n; i++) {
            var m = meta[i];
            var r = 1.9 - Math.abs(Math.sin(t * 0.9 + m.ph)) * 1.02; // dive in, bounce at ~0.88
            P[i * 3] = Math.cos(m.a) * r; P[i * 3 + 1] = Math.sin(m.a) * r; P[i * 3 + 2] = 0.2;
          }
          pg2.attributes.position.needsUpdate = true;
        };
      } else if (kind === 'canvas') {
        var cg = new T.PlaneGeometry(1.9, 1.3, 26, 18);
        var cm2 = new T.MeshBasicMaterial({ color: C.acc2.clone(), wireframe: true, transparent: true, opacity: 0.5 }); cm2.userData.tint = 'acc2';
        var sheet = new T.Mesh(cg, cm2); sheet.rotation.x = -0.9; g.add(sheet);
        var dot = this._sprite(C.acc.clone(), 0.55, 0.95); g.add(dot);
        var pos2 = cg.attributes.position;
        upd = function (t, dt) {
          var cx = Math.sin(t * 0.7) * 0.6, cy = Math.cos(t * 0.5) * 0.35;
          for (var i = 0; i < pos2.count; i++) {
            var vx = pos2.getX(i), vy = pos2.getY(i);
            var d = Math.sqrt((vx - cx) * (vx - cx) + (vy - cy) * (vy - cy));
            pos2.setZ(i, Math.sin(d * 7 - t * 3.4) * 0.09 * Math.exp(-d * 1.4));
          }
          pos2.needsUpdate = true;
          dot.position.set(cx * 0.8, 0.15 + cy * 0.4, 0.55);
        };
      } else if (kind === 'chart') {
        var bars = [], bm2 = new T.MeshStandardMaterial({ color: 0x1a2440, metalness: 0.6, roughness: 0.35, emissive: C.acc.clone(), emissiveIntensity: 0.35 }); bm2.userData.tint = 'acc';
        var hts = [0.5, 0.85, 0.65, 1.25];
        for (var i = 0; i < 4; i++) {
          var b = new T.Mesh(new T.BoxGeometry(0.3, 1, 0.3), bm2);
          b.position.x = -0.72 + i * 0.48; bars.push({ m: b, h: hts[i], ph: i }); g.add(b);
        }
        var am = new T.LineBasicMaterial({ color: C.acc2.clone(), transparent: true, opacity: 0.9 }); am.userData.tint = 'acc2';
        var ag = new T.BufferGeometry(); ag.setAttribute('position', new T.Float32BufferAttribute([-0.9, -0.2, 0.3, -0.2, 0.35, 0.3, 0.35, 0.15, 0.3, 0.95, 0.85, 0.3], 3));
        g.add(new T.Line(ag, am));
        var tipM2 = new T.MeshBasicMaterial({ color: C.acc2.clone() }); tipM2.userData.tint = 'acc2';
        var cone = new T.Mesh(new T.ConeGeometry(0.09, 0.24, 12), tipM2);
        cone.position.set(0.95, 0.85, 0.3); cone.rotation.z = -0.72; g.add(cone);
        upd = function (t, dt) {
          for (var i = 0; i < bars.length; i++) {
            var b2 = bars[i], h = b2.h * (0.75 + 0.25 * Math.sin(t * 1.1 + b2.ph));
            b2.m.scale.y = h; b2.m.position.y = -0.75 + h / 2;
          }
        };
      } else { // hub
        var hm2 = new T.MeshStandardMaterial({ color: 0x1a2440, metalness: 0.8, roughness: 0.25, emissive: C.acc.clone(), emissiveIntensity: 0.6 }); hm2.userData.tint = 'acc';
        var core2 = new T.Mesh(new T.OctahedronGeometry(0.42), hm2); g.add(core2);
        var halo2 = this._sprite(C.acc.clone(), 1.3, 0.7); g.add(halo2);
        var sats = [], lm2 = new T.LineBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.4 }); lm2.userData.tint = 'acc';
        var LP = new Float32Array(3 * 2 * 3);
        var lg2 = new T.BufferGeometry(); lg2.setAttribute('position', new T.BufferAttribute(LP, 3));
        g.add(new T.LineSegments(lg2, lm2));
        var sm2 = new T.MeshStandardMaterial({ color: 0x2a3554, metalness: 0.7, roughness: 0.3 });
        for (var i = 0; i < 3; i++) {
          var s2 = new T.Mesh(new T.BoxGeometry(0.22, 0.16, 0.06), sm2); sats.push({ m: s2, ph: i / 3 * TAU }); g.add(s2);
        }
        upd = function (t, dt) {
          core2.rotation.y += dt * 0.8;
          for (var i = 0; i < sats.length; i++) {
            var s3 = sats[i], a = t * 0.6 + s3.ph;
            s3.m.position.set(Math.cos(a) * 1.15, Math.sin(a * 1.3) * 0.5, Math.sin(a) * 0.7);
            LP[i * 6] = 0; LP[i * 6 + 1] = 0; LP[i * 6 + 2] = 0;
            LP[i * 6 + 3] = s3.m.position.x; LP[i * 6 + 4] = s3.m.position.y; LP[i * 6 + 5] = s3.m.position.z;
          }
          lg2.attributes.position.needsUpdate = true;
          lm2.opacity = 0.25 + 0.2 * Math.sin(t * 3);
        };
      }
      return { group: g, update: upd, vis: 0 };
    }

    /* ---------------- finale emblem ---------------- */
    _buildEmblem() {
      var T = window.THREE, C = this.C, g = new T.Group();
      var m1 = new T.MeshBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.8 }); m1.userData.tint = 'acc';
      var r1 = new T.Mesh(new T.TorusGeometry(1.15, 0.015, 8, 80), m1); g.add(r1);
      var m2 = new T.MeshBasicMaterial({ color: C.acc2.clone(), transparent: true, opacity: 0.6 }); m2.userData.tint = 'acc2';
      var r2 = new T.Mesh(new T.TorusGeometry(0.82, 0.012, 8, 72), m2); r2.rotation.x = 1.1; g.add(r2);
      g.add(this._sprite(C.acc.clone(), 2.2, 0.8));
      var dm = new T.MeshBasicMaterial({ color: 0xffffff }); var dots = [];
      for (var i = 0; i < 3; i++) { var d = new T.Mesh(new T.SphereGeometry(0.04, 10, 10), dm); dots.push({ m: d, ph: i / 3 * TAU }); g.add(d); }
      return {
        group: g, vis: 0,
        update: function (t, dt) {
          r1.rotation.y += dt * 0.3; r1.rotation.x = 0.4;
          r2.rotation.z += dt * 0.5;
          for (var i = 0; i < dots.length; i++) { var a = t * 0.7 + dots[i].ph; dots[i].m.position.set(Math.cos(a) * 1.15, Math.sin(a) * 0.42, Math.sin(a) * 1.15 * 0.4); }
        }
      };
    }

    /* ---------------- hero: holographic data cube ---------------- */
    _buildHeroCube() {
      var T = window.THREE, C = this.C, g = new T.Group();
      var cube = new T.Group(); g.add(cube);
      var fades = []; // {m, op} materials faded out on disperse
      function fade(m, op) { m.transparent = true; fades.push({ m: m, op: op }); return m; }

      /* --- block assembly (4x4x4 shell) --- */
      var N = 4, pitch = 0.64, size = 0.56, half = (N - 1) / 2;
      var boxG = new T.BoxGeometry(size, size, size);
      var edgeG = new T.EdgesGeometry(boxG);
      var solidM = new T.MeshStandardMaterial({ color: 0x0d1526, metalness: 0.85, roughness: 0.32 });
      var glassM = new T.MeshPhongMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.13, shininess: 90 }); glassM.userData.tint = 'acc';
      var ghostM = new T.MeshBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.03, depthWrite: false }); ghostM.userData.tint = 'acc';
      var faintE = new T.LineBasicMaterial({ color: 0x8fb4ff, transparent: true, opacity: 0.15 });
      var wireMats = [], emMats = [];
      for (var w = 0; w < 5; w++) { var wm = new T.LineBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.6 }); wm.userData.tint = 'acc'; wireMats.push(wm); }
      for (var q = 0; q < 6; q++) { var em = new T.MeshStandardMaterial({ color: 0x0a1626, metalness: 0.4, roughness: 0.4, emissive: C.acc.clone(), emissiveIntensity: 1 }); em.userData.tint = 'accEm'; emMats.push(em); }
      var blocks = [], bi = 0;
      for (var x = 0; x < N; x++) for (var y = 0; y < N; y++) for (var z = 0; z < N; z++) {
        if (x > 0 && x < N - 1 && y > 0 && y < N - 1 && z > 0 && z < N - 1) continue;
        var rnd = fract(Math.sin(++bi * 127.1) * 43758.5);
        if (rnd < 0.2) continue;
        var base = new T.Vector3((x - half) * pitch, (y - half) * pitch, (z - half) * pitch);
        var mesh, kind = fract(rnd * 7.31);
        if (kind < 0.5) { mesh = new T.Mesh(boxG, solidM); mesh.add(new T.LineSegments(edgeG, faintE)); }
        else if (kind < 0.74) { mesh = new T.Mesh(boxG, ghostM); mesh.add(new T.LineSegments(edgeG, wireMats[bi % wireMats.length])); }
        else if (kind < 0.9) { mesh = new T.Mesh(boxG, glassM); mesh.add(new T.LineSegments(edgeG, wireMats[(bi + 2) % wireMats.length])); }
        else { mesh = new T.Mesh(boxG, emMats[bi % emMats.length]); mesh.add(new T.LineSegments(edgeG, faintE)); }
        mesh.position.copy(base);
        blocks.push({ m: mesh, base: base, dir: base.clone().normalize(), ph: rnd * TAU, amp: 3.5 + rnd * 4, tx: (rnd - 0.5) * 6, ty: (fract(rnd * 13.7) - 0.5) * 6 });
        cube.add(mesh);
      }

      /* --- glowing core + cage --- */
      var core = this._sprite(C.acc, 3.4, 0.85); cube.add(core);
      var light = new T.PointLight(C.acc.getHex(), 1.4, 22, 2); cube.add(light); this._lightsAcc.push(light);
      var cageM = fade(new T.LineBasicMaterial({ color: C.acc2.clone(), transparent: true, opacity: 0.22 }), 0.22); cageM.userData.tint = 'acc2';
      var cage = new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(3.55, 3.55, 3.55)), cageM); cage.visible = false; cube.add(cage);
      var cp = new Float32Array(8 * 3), ci = 0;
      for (var cx = -1; cx <= 1; cx += 2) for (var cy = -1; cy <= 1; cy += 2) for (var cz = -1; cz <= 1; cz += 2) { cp[ci++] = cx * 1.775; cp[ci++] = cy * 1.775; cp[ci++] = cz * 1.775; }
      var cg = new T.BufferGeometry(); cg.setAttribute('position', new T.BufferAttribute(cp, 3));
      var cdM = fade(new T.PointsMaterial({ map: this.glowTex, color: C.acc2.clone(), size: 0.22, transparent: true, opacity: 0.8, blending: T.AdditiveBlending, depthWrite: false }), 0.8); cdM.userData.tint = 'acc2';
      var cornerPts = new T.Points(cg, cdM); cornerPts.visible = false; cube.add(cornerPts);

      /* --- circuit traces --- */
      var seg = [], dot = [];
      var AX = [new T.Vector3(1, 0, 0), new T.Vector3(0, 1, 0), new T.Vector3(0, 0, 1)];
      for (var ti = 0; ti < 13; ti++) {
        var ax = ti % 3, sn = (ti % 2) ? 1 : -1;
        var a1 = AX[ax].clone().multiplyScalar(sn);
        var perp = AX[(ax + 1 + (ti % 2)) % 3].clone().multiplyScalar((ti % 4 < 2) ? 1 : -1);
        var p0 = new T.Vector3((fract(Math.sin(ti * 91.7) * 1e4) - 0.5) * 2.2, (fract(Math.sin(ti * 45.3) * 1e4) - 0.5) * 2.2, (fract(Math.sin(ti * 12.9) * 1e4) - 0.5) * 2.2);
        p0[['x', 'y', 'z'][ax]] = sn * 1.55;
        var p1 = p0.clone().add(a1.clone().multiplyScalar(0.7 + fract(Math.sin(ti * 7.7) * 1e3) * 1.1));
        var p2 = p1.clone().add(perp.multiplyScalar(0.5 + fract(Math.sin(ti * 3.3) * 1e3) * 1.0));
        seg.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z, p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        var pe = p2;
        if (ti % 2) { var p3 = p2.clone().add(a1.clone().multiplyScalar(0.5 + fract(Math.sin(ti * 5.1) * 1e3) * 0.8)); seg.push(p2.x, p2.y, p2.z, p3.x, p3.y, p3.z); pe = p3; }
        dot.push(pe.x, pe.y, pe.z);
      }
      var tg = new T.BufferGeometry(); tg.setAttribute('position', new T.Float32BufferAttribute(seg, 3));
      var trM = new T.LineBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.3, blending: T.AdditiveBlending, depthWrite: false }); trM.userData.tint = 'acc';
      cube.add(new T.LineSegments(tg, trM));
      var dg = new T.BufferGeometry(); dg.setAttribute('position', new T.Float32BufferAttribute(dot, 3));
      var dtM = new T.PointsMaterial({ map: this.glowTex, color: C.acc.clone(), size: 0.2, transparent: true, opacity: 0.7, blending: T.AdditiveBlending, depthWrite: false }); dtM.userData.tint = 'acc';
      cube.add(new T.Points(dg, dtM));

      /* --- satellite cubes + tethers --- */
      var sats = [];
      for (var si = 0; si < 10; si++) {
        var ss = 0.14 + fract(Math.sin(si * 17.9) * 1e3) * 0.17;
        var sg2 = new T.BoxGeometry(ss, ss, ss);
        var sm2; 
        if (si % 3 === 0) { sm2 = new T.Mesh(sg2, ghostM); sm2.add(new T.LineSegments(new T.EdgesGeometry(sg2), wireMats[si % wireMats.length])); }
        else { sm2 = new T.Mesh(sg2, solidM); sm2.add(new T.LineSegments(new T.EdgesGeometry(sg2), faintE)); }
        sats.push({ m: sm2, r: 2.4 + fract(Math.sin(si * 31.7) * 1e3) * 1.0, a: si / 10 * TAU, sp: 0.05 + (si % 3) * 0.03, y0: -1.6 + fract(Math.sin(si * 8.3) * 1e3) * 3.4, ph: si * 1.7 });
        g.add(sm2);
      }
      var TP = new Float32Array(5 * 6);
      var teG = new T.BufferGeometry(); teG.setAttribute('position', new T.BufferAttribute(TP, 3));
      var teM = fade(new T.LineBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.22, blending: T.AdditiveBlending, depthWrite: false }), 0.22); teM.userData.tint = 'acc';
      g.add(new T.LineSegments(teG, teM));

      /* --- vertical light streams --- */
      var ns = 22, SP = new Float32Array(ns * 6), smeta = [];
      for (var li = 0; li < ns; li++) {
        var below = li >= 16;
        smeta.push({ x: (Math.random() - 0.5) * 2.8, z: (Math.random() - 0.5) * 2.8, y: below ? -2 - Math.random() * 3 : 1.9 + Math.random() * 2.4, len: 0.4 + Math.random() * 0.8, sp: 0.7 + Math.random() * 1.2, dn: below });
      }
      var sgeo = new T.BufferGeometry(); sgeo.setAttribute('position', new T.BufferAttribute(SP, 3));
      var stM = fade(new T.LineBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.4, blending: T.AdditiveBlending, depthWrite: false }), 0.4); stM.userData.tint = 'acc';
      g.add(new T.LineSegments(sgeo, stM));

      /* --- pedestal rings --- */
      var base2 = new T.Group(); base2.position.y = -2.5; g.add(base2);
      var discM = fade(new T.MeshBasicMaterial({ map: this.glowTex, color: C.acc.clone(), transparent: true, opacity: 0.34, blending: T.AdditiveBlending, depthWrite: false }), 0.34); discM.userData.tint = 'acc';
      var discG = new T.CircleGeometry(2.7, 48); discG.rotateX(-Math.PI / 2);
      base2.add(new T.Mesh(discG, discM));
      var r1G = new T.TorusGeometry(1.85, 0.018, 8, 90); r1G.rotateX(Math.PI / 2);
      var r1M = fade(new T.MeshBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.85 }), 0.85); r1M.userData.tint = 'acc';
      var ring1 = new T.Mesh(r1G, r1M); base2.add(ring1);
      var arcs = new T.Group(); base2.add(arcs);
      var arcM = fade(new T.MeshBasicMaterial({ color: C.acc2.clone(), transparent: true, opacity: 0.55, side: T.DoubleSide }), 0.55); arcM.userData.tint = 'acc2';
      for (var ai2 = 0; ai2 < 3; ai2++) {
        var aG = new T.RingGeometry(2.28, 2.36, 48, 1, ai2 * TAU / 3, TAU * 0.21); aG.rotateX(-Math.PI / 2);
        arcs.add(new T.Mesh(aG, arcM));
      }
      var nt = 44, tp2 = new Float32Array(nt * 3);
      for (var ki = 0; ki < nt; ki++) { var ka = ki / nt * TAU; tp2[ki * 3] = Math.cos(ka) * 2.85; tp2[ki * 3 + 1] = 0; tp2[ki * 3 + 2] = Math.sin(ka) * 2.85; }
      var tkG = new T.BufferGeometry(); tkG.setAttribute('position', new T.BufferAttribute(tp2, 3));
      var tkM = fade(new T.PointsMaterial({ map: this.glowTex, color: C.acc.clone(), size: 0.09, transparent: true, opacity: 0.5, blending: T.AdditiveBlending, depthWrite: false }), 0.5); tkM.userData.tint = 'acc';
      var ticks = new T.Points(tkG, tkM); base2.add(ticks);
      var nk = Math.floor(40 * this.pf) + 10, KP = new Float32Array(nk * 3), kmeta = [];
      for (var mi = 0; mi < nk; mi++) kmeta.push({ a: Math.random() * TAU, r: 1.5 + Math.random() * 1.2, y: Math.random() * 1.7, sp: 0.25 + Math.random() * 0.5 });
      var kG = new T.BufferGeometry(); kG.setAttribute('position', new T.BufferAttribute(KP, 3));
      var kM = fade(new T.PointsMaterial({ map: this.glowTex, color: C.acc.clone(), size: 0.1, transparent: true, opacity: 0.55, blending: T.AdditiveBlending, depthWrite: false }), 0.55); kM.userData.tint = 'acc';
      base2.add(new T.Points(kG, kM));

      /* --- scanning plane --- */
      var scanM = new T.MeshBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.09, blending: T.AdditiveBlending, depthWrite: false, side: T.DoubleSide }); scanM.userData.tint = 'acc';
      var scanG = new T.PlaneGeometry(3.5, 3.5); scanG.rotateX(-Math.PI / 2);
      var scan = new T.Mesh(scanG, scanM); cube.add(scan);
      var sqG = new T.BufferGeometry().setFromPoints([new T.Vector3(-1.76, 0, -1.76), new T.Vector3(1.76, 0, -1.76), new T.Vector3(1.76, 0, 1.76), new T.Vector3(-1.76, 0, 1.76)]);
      var sqM = new T.LineBasicMaterial({ color: C.acc.clone(), transparent: true, opacity: 0.28, blending: T.AdditiveBlending, depthWrite: false }); sqM.userData.tint = 'acc';
      var sqLine = new T.LineLoop(sqG, sqM); sqLine.visible = false; cube.add(sqLine);

      /* --- precessing gyro rings --- */
      var gyM = fade(new T.MeshBasicMaterial({ color: C.acc2.clone(), transparent: true, opacity: 0.3 }), 0.3); gyM.userData.tint = 'acc2';
      var gy1 = new T.Mesh(new T.TorusGeometry(2.45, 0.014, 6, 96), gyM); gy1.visible = false; g.add(gy1);
      var gy2 = new T.Mesh(new T.TorusGeometry(2.72, 0.01, 6, 96), gyM); gy2.visible = false; g.add(gy2);

      /* --- orbiting service label rings --- */
      var selfL = this;
      var mkLabel = function (text) {
        var mc = document.createElement('canvas');
        var mctx = mc.getContext('2d'); mctx.font = '600 34px "IBM Plex Mono", monospace';
        mc.width = Math.ceil(mctx.measureText(text).width + 92); mc.height = 68;
        var tex2 = new T.CanvasTexture(mc); tex2.anisotropy = 4;
        var drawL = function (acc) {
          var W = mc.width, H = mc.height, c2 = mc.getContext('2d');
          c2.clearRect(0, 0, W, H);
          var rr2 = H / 2 - 2;
          c2.beginPath(); c2.moveTo(rr2 + 2, 2); c2.arcTo(W - 2, 2, W - 2, H - 2, rr2); c2.arcTo(W - 2, H - 2, 2, H - 2, rr2); c2.arcTo(2, H - 2, 2, 2, rr2); c2.arcTo(2, 2, W - 2, 2, rr2); c2.closePath();
          c2.fillStyle = 'rgba(7,13,26,.8)'; c2.fill();
          c2.strokeStyle = acc; c2.globalAlpha = 0.5; c2.lineWidth = 2.5; c2.stroke(); c2.globalAlpha = 1;
          c2.fillStyle = acc; c2.beginPath(); c2.arc(30, H / 2, 6, 0, TAU); c2.fill();
          c2.font = '600 34px "IBM Plex Mono", monospace'; c2.textBaseline = 'middle';
          c2.fillStyle = 'rgba(234,242,255,.95)'; c2.fillText(text, 50, H / 2 + 1);
        };
        drawL('#' + selfL.C.acc.getHexString());
        selfL._redraws.push({ draw: drawL, tex: tex2 });
        var mMat = new T.SpriteMaterial({ map: tex2, transparent: true, opacity: 0.95, depthWrite: false });
        var spr = new T.Sprite(mMat);
        var hgt = 0.36; spr.scale.set(hgt * mc.width / mc.height, hgt, 1);
        return { s: spr, bw: hgt * mc.width / mc.height, bh: hgt };
      };
      var ringDefs = [
        { r: 2.95, tx: 0.42, tz: 0.16, sp: 0.16, items: ['AI', 'ML', 'SOFTWARE', 'WEB', 'CLOUD', 'DEVOPS', 'SEO'] },
        { r: 3.42, tx: -0.34, tz: -0.2, sp: -0.11, items: ['MARKETING', 'SECURITY', 'DATA & BI', 'UI/UX', 'QA', 'MANAGED IT'] }
      ];
      var labels = [], ringGroups = [];
      for (var rd2 = 0; rd2 < ringDefs.length; rd2++) {
        var def = ringDefs[rd2];
        var rg = new T.Group(); rg.rotation.x = def.tx; rg.rotation.z = def.tz; g.add(rg);
        ringGroups.push({ g: rg, sp: def.sp });
        var lpts = [];
        for (var pa = 0; pa <= 96; pa++) lpts.push(new T.Vector3(Math.cos(pa / 96 * TAU) * def.r, 0, Math.sin(pa / 96 * TAU) * def.r));
        var plM = fade(new T.LineBasicMaterial({ color: C.acc2.clone(), transparent: true, opacity: 0.16, blending: T.AdditiveBlending, depthWrite: false }), 0.16); plM.userData.tint = 'acc2';
        var pathLine = new T.LineLoop(new T.BufferGeometry().setFromPoints(lpts), plM); pathLine.visible = false; rg.add(pathLine);
        for (var lj = 0; lj < def.items.length; lj++) {
          var lab = mkLabel(def.items[lj]);
          var ph2 = lj / def.items.length * TAU;
          lab.s.position.set(Math.cos(ph2) * def.r, 0, Math.sin(ph2) * def.r);
          rg.add(lab.s); labels.push(lab);
        }
      }
      var tv = new T.Vector3();

      var self = this;
      return {
        group: g, cube: cube,
        update: function (t, dt, hp) {
          var vis = 1 - hp;
          /* blocks: wave pops + disperse scatter */
          var sc = clamp(1 - hp * 1.15, 0, 1);
          for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i];
            var w = Math.sin(t * 0.55 + (b.base.x + b.base.y + b.base.z) * 1.15 + b.ph * 0.3);
            var pop = Math.max(0, w - 0.72) / 0.28 * 0.32;
            b.m.position.set(
              b.base.x + b.dir.x * (pop + hp * b.amp),
              b.base.y + b.dir.y * (pop + hp * b.amp),
              b.base.z + b.dir.z * (pop + hp * b.amp));
            b.m.scale.setScalar(Math.max(0.001, sc));
            b.m.rotation.set(hp * b.tx, hp * b.ty, 0);
          }
          for (var e2 = 0; e2 < emMats.length; e2++) emMats[e2].emissiveIntensity = (0.55 + 0.85 * Math.max(0, Math.sin(t * 2.1 - e2 * 1.05))) * (0.4 + 0.6 * vis);
          for (var w2 = 0; w2 < wireMats.length; w2++) wireMats[w2].opacity = (0.38 + 0.32 * Math.sin(t * 1.7 - w2 * 1.3)) * (0.25 + 0.75 * vis);
          core.material.opacity = (0.6 + 0.3 * Math.sin(t * 2.5)) * vis;
          core.scale.setScalar(4.0 + Math.sin(t * 2.5) * 0.6);
          light.intensity = (1.1 + 0.5 * Math.sin(t * 2.5)) * vis;
          cage.rotation.y = -t * 0.06;
          trM.opacity = (0.22 + 0.14 * Math.sin(t * 3.1)) * vis;
          dtM.opacity = (0.5 + 0.3 * Math.sin(t * 2.2)) * vis;
          /* satellites orbit + tethers */
          for (var s2 = 0; s2 < sats.length; s2++) {
            var st = sats[s2]; st.a += dt * st.sp;
            st.m.position.set(Math.cos(st.a) * st.r, st.y0 + Math.sin(t * 0.7 + st.ph) * 0.28, Math.sin(st.a) * st.r * 0.85);
            st.m.scale.setScalar(Math.max(0.001, vis));
            st.m.rotation.y += dt * 0.4; st.m.rotation.x += dt * 0.17;
            if (s2 < 5) {
              var L = st.m.position.length();
              TP[s2 * 6] = st.m.position.x; TP[s2 * 6 + 1] = st.m.position.y; TP[s2 * 6 + 2] = st.m.position.z;
              TP[s2 * 6 + 3] = st.m.position.x / L * 1.9; TP[s2 * 6 + 4] = st.m.position.y / L * 1.9; TP[s2 * 6 + 5] = st.m.position.z / L * 1.9;
            }
          }
          teG.attributes.position.needsUpdate = true;
          /* streams */
          for (var l2 = 0; l2 < smeta.length; l2++) {
            var sm3 = smeta[l2];
            sm3.y += sm3.sp * dt * (sm3.dn ? -1 : 1);
            if (!sm3.dn && sm3.y > 4.5) sm3.y = 1.9;
            if (sm3.dn && sm3.y < -5.0) sm3.y = -2.0;
            SP[l2 * 6] = sm3.x; SP[l2 * 6 + 1] = sm3.y; SP[l2 * 6 + 2] = sm3.z;
            SP[l2 * 6 + 3] = sm3.x; SP[l2 * 6 + 4] = sm3.y + sm3.len * (sm3.dn ? -1 : 1); SP[l2 * 6 + 5] = sm3.z;
          }
          sgeo.attributes.position.needsUpdate = true;
          /* pedestal */
          ring1.rotation.y += dt * 0.22;
          arcs.rotation.y -= dt * 0.34;
          ticks.rotation.y += dt * 0.06;
          for (var k2 = 0; k2 < kmeta.length; k2++) {
            var km = kmeta[k2]; km.y += km.sp * dt; if (km.y > 1.7) km.y = 0;
            KP[k2 * 3] = Math.cos(km.a) * km.r; KP[k2 * 3 + 1] = km.y; KP[k2 * 3 + 2] = Math.sin(km.a) * km.r;
          }
          kG.attributes.position.needsUpdate = true;
          base2.scale.setScalar(0.65 + 0.35 * vis);
          /* scan sweep */
          var swY = Math.sin(t * 0.55) * 1.5;
          scan.position.y = swY; sqLine.position.y = swY;
          scanM.opacity = (0.07 + 0.05 * (0.5 + 0.5 * Math.sin(t * 3))) * vis;
          sqM.opacity = (0.24 + 0.1 * Math.sin(t * 2.2)) * vis;
          /* gyro precession */
          gy1.rotation.x = 1.05 + Math.sin(t * 0.26) * 0.24; gy1.rotation.y += dt * 0.14;
          gy2.rotation.x = -0.55 + Math.cos(t * 0.21) * 0.2; gy2.rotation.y -= dt * 0.1;
          /* glitch pulse on one block */
          var gi = Math.floor(t * 1.6) % blocks.length, gp2 = fract(t * 1.6);
          blocks[gi].m.scale.multiplyScalar(1 + 0.16 * Math.sin(Math.PI * gp2) * vis);
          /* label orbits + depth fade */
          var gsc2 = g.scale.x || 1;
          for (var rg2 = 0; rg2 < ringGroups.length; rg2++) ringGroups[rg2].g.rotation.y += dt * ringGroups[rg2].sp;
          for (var lb = 0; lb < labels.length; lb++) {
            var la = labels[lb];
            la.s.getWorldPosition(tv);
            var nrm = clamp((tv.z - g.position.z) / (3.5 * gsc2), -1, 1) * 0.5 + 0.5;
            la.s.material.opacity = (0.35 + 0.65 * nrm) * vis;
            var lsc = 0.84 + 0.22 * nrm;
            la.s.scale.set(la.bw * lsc, la.bh * lsc, 1);
          }
          /* global fades */
          for (var f2 = 0; f2 < fades.length; f2++) fades[f2].m.opacity = Math.min(fades[f2].op, fades[f2].op * (vis * 1.4));
        }
      };
    }

    /* ---------------- frame loop ---------------- */
    _loop() {
      var self = this, T = window.THREE;
      var eng = new T.Euler(), off = new T.Vector3(), eP = new T.Vector3(), sP = new T.Vector3(), hero = new T.Vector3(), prj = new T.Vector3();
      var frame = function () {
        if (self._dead) return;
        self._raf = requestAnimationFrame(frame);
        var rdt = Math.min(self._clock.getDelta(), 0.05);
        var dt = rdt * self.speed;
        var t = self._clock.elapsedTime * self.speed;
        var sy = window.scrollY;
        self.scrollSm = lerp(self.scrollSm, sy, 1 - Math.exp(-9 * rdt));
        var s = self.scrollSm, vh = self.vh;

        /* camera */
        var cam = self._camera;
        cam.position.y = -(s + vh / 2) * self.upp + (self.my * 0.25);
        cam.position.x = lerp(cam.position.x, self.mx * 0.55, 0.06);
        cam.rotation.y = -self.mx * 0.012;
        self.stars.position.x = self.mx * 0.8;

        /* engine root */
        var e0 = self.engine;
        e0.vy *= 0.94; e0.vp *= 0.94;
        if (!self._drag || self._drag.tgt !== e0) { e0.uYaw += e0.vy; e0.uPitch = clamp(e0.uPitch + e0.vp, -0.7, 0.7); }
        var eYaw = t * 0.11 + e0.uYaw;
        var ePitch = 0.06 * Math.sin(t * 0.4) + e0.uPitch * 0.8;
        eng.set(ePitch, eYaw, 0);
        self._world('hero', hero);
        hero.y += Math.sin(t * 0.85) * 0.14; // levitate

        /* hero data-cube (disperse relative to measured hero anchor) */
        var hStart = Math.max(10, ((self.anchors.hero ? self.anchors.hero.docY : 0) - vh * 0.55));
        var hp = smoother((s - hStart) / (vh * 0.85));
        var hc = self.heroCube;
        hc.group.visible = hp < 0.996;
        if (hc.group.visible) {
          hc.group.position.copy(hero);
          /* cursor-proximity rotation: the core turns toward a nearby cursor */
          prj.copy(hero).project(cam);
          var hdx = self.mx - prj.x, hdy = self.my - prj.y;
          var hprox = 1 - smoother((Math.hypot(hdx, hdy) - 0.08) / 0.6);
          var tY = hdx * 0.8 * hprox, tP = clamp(-hdy * 0.5 * hprox, -0.55, 0.55);
          if (!isFinite(self._mYaw)) self._mYaw = 0;
          if (!isFinite(self._mPitch)) self._mPitch = 0;
          if (isFinite(tY)) self._mYaw = lerp(self._mYaw, tY, 0.05);
          if (isFinite(tP)) self._mPitch = lerp(self._mPitch, tP, 0.05);
          hc.group.scale.setScalar(self.gs * 1.45);
          hc.cube.rotation.set(0.5 + ePitch * 0.9 + self._mPitch, eYaw + 0.78 + self._mYaw, 0);
          hc.update(t, dt, hp);
        }

        /* pieces */
        var g2 = self.gs;
        for (var i = 0; i < self.pieceOrder.length; i++) {
          var od = self.pieceOrder[i], p = self.pieces[od.key], a = self.anchors[od.key];
          if (!a) continue;
          var depart = hStart + 20 + od.stag * 90;
          var arrive = Math.max(depart + 480, a.docY - vh * 0.55);
          var e = smoother((s - depart) / (arrive - depart));
          p.e = e;
          if (od.orbit) {
            var oa = t * od.orbit.sp + od.orbit.ph;
            off.set(Math.cos(oa) * od.orbit.r, Math.sin(oa) * od.orbit.r * od.orbit.tilt, Math.sin(oa) * od.orbit.r * 0.5);
          } else if (od.eOff) off.set(od.eOff[0], od.eOff[1], od.eOff[2]);
          else off.set(0, 0, 0);
          off.multiplyScalar(g2 * Math.min(1, e * 2.2)).applyEuler(eng);
          eP.copy(hero).add(off);
          self._world(od.key, sP);
          sP.y += Math.sin(t * 0.7 + i * 1.3) * 0.1; // gentle float at section
          p.group.position.lerpVectors(eP, sP, e);
          /* flight lane: recede in z and hug the target side so falling pieces never cross settled objects */
          var arc = Math.sin(Math.PI * e);
          p.group.position.z -= 3.4 * arc;
          p.group.position.x += (sP.x >= 0 ? 1.5 : -1.5) * arc;
          var u = p.user; u.vy *= 0.94; u.vp *= 0.94;
          if (!self._drag || self._drag.tgt !== u) { u.uYaw = u.uYaw || 0; u.uYaw += u.vy; u.uPitch = clamp((u.uPitch || 0) + u.vp, -0.7, 0.7); }
          p.group.rotation.set(
            ePitch * (1 - e) + (u.uPitch || 0) * e,
            eYaw * (1 - e) + (t * od.spin + (u.uYaw || 0)) * e + (od.orbit ? 0 : 0),
            0);
          p.group.scale.setScalar(lerp(od.eScale * 0.18, od.sScale, e) * g2);
          var alpha = 0.12 + 0.88 * smoother((e - 0.72) / 0.28);
          var dY = Math.abs(p.group.position.y - cam.position.y);
          if (dY < self.visH * 1.6) {
            var fm;
            for (var f3 = 0; f3 < p.mats.length; f3++) { fm = p.mats[f3]; fm.m.opacity = fm.iv; }
            for (var f4 = 0; f4 < p.lights.length; f4++) p.lights[f4].l.intensity = p.lights[f4].iv;
            p.update(t, dt, e);
            for (var f5 = 0; f5 < p.mats.length; f5++) { fm = p.mats[f5]; fm.iv = fm.m.opacity; fm.m.opacity = fm.iv * alpha; }
            for (var f6 = 0; f6 < p.lights.length; f6++) { var fl = p.lights[f6]; fl.iv = fl.l.intensity; fl.l.intensity = fl.iv * alpha; }
          }
          p.group.visible = dY < self.visH * 2.2 && e > 0.03;
        }

        /* AI hover reactivity */
        var ai = self.pieces.ai;
        prj.copy(ai.group.position).project(cam);
        var hd = Math.hypot(prj.x - self.mx, prj.y - self.my);
        if (isFinite(hd)) ai.hover = lerp(isFinite(ai.hover) ? ai.hover : 0, 1 - smoother((hd - 0.12) / 0.45), 0.08);

        /* minis */
        for (var k in self.minis) {
          var mn = self.minis[k], an = self.anchors[k];
          if (!an) { mn.group.visible = false; continue; }
          self._world(k, sP);
          var dd = Math.abs(sP.y - cam.position.y);
          mn.vis = lerp(mn.vis, dd < self.visH * 0.85 ? 1 : 0, 0.07);
          mn.group.visible = mn.vis > 0.02 && dd < self.visH * 1.4;
          if (!mn.group.visible) continue;
          sP.y += Math.sin(t * 0.9 + sP.x) * 0.06;
          mn.group.position.copy(sP);
          mn.group.scale.setScalar(0.62 * self.gs * (0.6 + 0.4 * mn.vis));
          mn.group.rotation.y = Math.sin(t * 0.4 + sP.x) * 0.3;
          mn.update(t, dt);
        }

        /* emblem */
        var em = self.emblem, fa = self.anchors.finale;
        if (fa) {
          self._world('finale', sP); sP.z = -3;
          var fd = Math.abs(sP.y - cam.position.y);
          em.vis = lerp(em.vis, fd < self.visH ? 1 : 0, 0.06);
          em.group.visible = em.vis > 0.02;
          em.group.position.copy(sP);
          em.group.scale.setScalar(1.6 * self.gs * (0.5 + 0.5 * em.vis));
          if (em.group.visible) em.update(t, dt);
        }

        self._renderer.render(self._scene, cam);
      };
      frame();
    }
  });
})();
