/**
 * script.js — content.js の内容からページを組み立てる（通常は編集不要）
 */
(function () {
  "use strict";

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const list = (items, cls) => (items && items.length ? `<ul class="${cls}">${items.map((i) => `<li>${i}</li>`).join("")}</ul>` : "");
  const arrow = (url, text, cls) => `<a class="btn ${cls || ""}" href="${esc(url)}" target="_blank" rel="noopener">${text}</a>`;

  function setMeta(selector, value) {
    const el = document.querySelector(selector);
    if (el && value != null) el.setAttribute("content", value);
  }

  function applyMeta(m) {
    document.title = m.pageTitle;
    setMeta('meta[name="description"]', m.description);
    setMeta('meta[property="og:title"]', m.pageTitle);
    setMeta('meta[property="og:description"]', m.description);
    setMeta('meta[property="og:url"]', m.siteUrl);
  }

  function videoBlock(v) {
    return `
      <div class="hero__video">
        <h2 class="sub-heading">${v.heading}</h2>
        <video controls playsinline preload="metadata" poster="${esc(v.poster)}" aria-label="${esc(v.label)}" width="${v.width}" height="${v.height}">
          <source src="${esc(v.src)}" type="video/mp4">
        </video>
        ${v.caption ? `<p class="hero__caption">${v.caption}</p>` : ""}
      </div>`;
  }

  // バナー → 解説動画（あれば）→ 完成CM → ボタン
  function hero(h) {
    return `
    <section class="hero" aria-labelledby="hero-title">
      <div class="container hero__stack">
        <h1 class="visually-hidden" id="hero-title">${h.titleLines.join(" ")}</h1>
        <figure class="hero__banner"><img src="${esc(h.image.src)}" alt="${esc(h.image.alt)}" width="1080" height="1080"></figure>
        ${h.tutorial ? videoBlock(h.tutorial) : ""}
        ${h.video ? videoBlock(h.video) : ""}
        <a class="btn btn--ghost" href="#${esc(h.buttonTarget)}" data-scroll>${h.buttonText}</a>
      </div>
    </section>`;
  }

  function topCta(c, url) {
    const image = c.image
      ? `<a class="cta-soft__image" href="${esc(url)}" target="_blank" rel="noopener"><img src="${esc(c.image.src)}" alt="${esc(c.image.alt)}" width="1855" height="848"></a>`
      : "";
    return `
    <section class="container" aria-labelledby="top-cta-title">
      <div class="cta-soft">
        ${image}
        <div class="cta-soft__text">
          <h2 class="cta-soft__title" id="top-cta-title">${c.heading}</h2>
          <p>${c.text}</p>
        </div>
        ${arrow(url, c.buttonText)}
      </div>
    </section>`;
  }

  function learn(l) {
    const intro = l.intro ? `<div class="point-box point-box--lead"><p>${l.intro}</p></div>` : "";
    return `
    <section class="section" aria-labelledby="learn-title">
      <div class="container">
        <div class="learn">
          <h2 class="heading heading--side" id="learn-title">${l.heading}</h2>
          ${list(l.items, "check-list")}
        </div>
        ${intro}
      </div>
    </section>`;
  }

  function figure(f) {
    const img = `<img src="${esc(f.src)}" alt="${esc(f.alt)}" loading="lazy">`;
    const body = f.zoom ? `<a href="${esc(f.src)}" target="_blank" rel="noopener">${img}</a>` : img;
    const hint = f.zoom ? "（タップで拡大）" : "";
    return `<figure class="figure${f.size ? " figure--" + f.size : ""}">${body}<figcaption>${f.caption}${hint}</figcaption></figure>`;
  }

  // 書き換える場所（【 】）を目立たせる
  const highlightSlots = (text) => esc(text).replace(/【[^】\n]*】/g, '<span class="slot-label">$&</span>');

  function prompt(p, id) {
    const text = p.plain ? esc(p.text) : highlightSlots(p.text);
    const pre = `<pre class="prompt__text" id="${id}">${text}</pre>`;
    const body = p.fold ? `<details class="prompt__fold"><summary>プロンプトの中身を見る</summary>${pre}</details>` : pre;
    return `
      <div class="prompt">
        <p class="prompt__label">${p.label}</p>
        ${body}
        <button type="button" class="btn btn--outline copy-btn" data-copy-target="${id}">
          <span class="copy-btn__label">プロンプトをコピーする</span>
          <span class="copy-btn__done" role="status" aria-live="polite">コピーしました</span>
        </button>
      </div>`;
  }

  function point(p) {
    const ex = p.examples && p.examples.length
      ? `<p class="point-box__ex">${p.examplesLabel || "例"}</p>${list(p.examples, "point-box__list")}`
      : "";
    const src = p.source ? `<p class="source"><a class="text-link" href="${esc(p.source.url)}" target="_blank" rel="noopener">${p.source.text}</a></p>` : "";
    return `<aside class="point-box"><p class="point-box__label">${p.label}</p><p>${p.text}</p>${ex}${src}</aside>`;
  }

  function step(s, i) {
    const id = "step" + (i + 1);
    const body = (s.paragraphs || []).map((p) => `<p>${p}</p>`).join("");
    return `
    <section class="step" id="${id}" aria-labelledby="${id}-title">
      <div class="container">
        <header class="step__head">
          <p class="step__no" aria-hidden="true"><span>STEP</span>${s.number}</p>
          <div>
            <h2 class="step__title" id="${id}-title"><span class="visually-hidden">STEP ${s.number}　</span>${s.title}</h2>
            <p class="step__lead">${s.lead}</p>
          </div>
        </header>
        <div class="step__body">
          ${body}
          ${list(s.list, "check-list")}
          ${(s.figures || []).map(figure).join("")}
          ${(s.prompts || []).map((p, k) => prompt(p, id + "-prompt" + k)).join("")}
          ${s.point ? point(s.point) : ""}
        </div>
      </div>
    </section>`;
  }

  function summary(s) {
    return `
    <section class="section section--soft" aria-labelledby="summary-title">
      <div class="container">
        <h2 class="heading" id="summary-title">${s.heading}</h2>
        ${list(s.items, "check-list")}
        ${s.note ? `<p class="summary__note">${s.note}</p>` : ""}
        <aside class="point-box"><p class="point-box__label">${s.nextStep.label}</p><p>${s.nextStep.text}</p></aside>
      </div>
    </section>`;
  }

  function finalCta(c, t, url) {
    const pains = c.pains.map((p) => `<li class="pain__bubble">${p}</li>`).join("");
    const rows = c.solutions
      .map((r) => `<li class="solve__row"><p class="solve__pain">${r.pain}</p><p class="solve__give">${r.give}</p></li>`)
      .join("");
    return `
    <section class="section section--soft" id="line" aria-labelledby="pain-title">
      <div class="container">
        <h2 class="heading" id="pain-title">${c.painHeading}</h2>
        <ul class="pain">${pains}</ul>
        <p class="bridge">${c.bridge}</p>
        <div class="cta-final">
          <h2 class="cta-final__title" id="final-cta-title">${c.heading}</h2>
          <p class="cta-final__lead">${c.lead}</p>
          <p class="solve__label">${c.solutionsLabel}</p>
          <ul class="solve">${rows}</ul>
          <p class="cta-final__caution">${c.caution}</p>
          ${arrow(url, c.buttonText, "btn--large")}
        </div>
        <div class="textbook">
          <p>${t.bridge}</p>
          <a class="textbook__banner" href="${esc(url)}" target="_blank" rel="noopener">
            <img src="${esc(t.banner)}" alt="${esc(t.bannerAlt)}" loading="lazy">
          </a>
          <p>${t.support}</p>
        </div>
      </div>
    </section>`;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(() => true, () => false);
    }
    return Promise.resolve(false);
  }

  function bind() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".copy-btn[data-copy-target]");
      if (btn) {
        const target = document.getElementById(btn.dataset.copyTarget);
        copyText(target.textContent).then((ok) => {
          if (!ok) return;
          btn.classList.add("is-copied");
          clearTimeout(btn._t);
          btn._t = setTimeout(() => btn.classList.remove("is-copied"), 2200);
        });
        return;
      }
      const link = e.target.closest("a[data-scroll]");
      if (link) {
        const dest = document.querySelector(link.getAttribute("href"));
        if (dest) {
          e.preventDefault();
          dest.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        }
      }
    });
  }

  function init() {
    const main = document.getElementById("main");
    if (typeof CONTENT === "undefined") return;
    const c = CONTENT;
    applyMeta(c.meta);
    main.innerHTML =
      hero(c.hero) +
      topCta(c.topCta, c.lineUrl) +
      learn(c.learn) +
      c.steps.map(step).join("") +
      summary(c.summary) +
      finalCta(c.finalCta, c.textbook, c.lineUrl);
    document.getElementById("footer").innerHTML = `<p>${c.footer.copyright}</p><p>${c.footer.notice}</p>`;
    bind();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
