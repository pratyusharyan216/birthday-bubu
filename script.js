(() => {
  const C = window.BIRTHDAY;
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s = "") => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- Fill in content ----------
  document.title = `Happy Birthday, ${C.name} 💙`;
  document.querySelectorAll("[data-name]").forEach((n) => (n.textContent = C.name));
  $("#tagline").textContent = C.tagline;
  $("#fromName").textContent = C.from;

  // Load the script font up front so her name never shows in a fallback font
  if (document.fonts && document.fonts.load) document.fonts.load('1em "Parisienne"');

  // Envelope: cycle through her nicknames, settle on the last one
  $("#introLine").textContent = C.envelopeLine || "for";
  const introName = $("#introName");
  const names = C.envelopeNames && C.envelopeNames.length ? C.envelopeNames : [C.name];
  introName.textContent = names[0];
  names.slice(1).forEach((n, k) => {
    setTimeout(() => {
      introName.classList.add("swap-out");
      setTimeout(() => {
        introName.textContent = n;
        introName.classList.remove("swap-out");
        if (k === names.length - 2) introName.classList.add("final");
      }, 450);
    }, 1400 * (k + 1));
  });

  // Birthday countdown
  const [by, bm, bd] = (C.birthday || "").split("-").map(Number);
  if (by) {
    const start = new Date(by, bm - 1, bd), end = new Date(by, bm - 1, bd + 1);
    const cd = $("#countdown");
    const pad = (n) => String(n).padStart(2, "0");
    const tickCd = () => {
      const now = new Date();
      if (now >= end) { cd.hidden = true; return; }
      cd.hidden = false;
      if (now >= start) {
        cd.classList.add("today");
        $("#cdUnits").hidden = true;
        $("#cdLabel").textContent = "It's your birthday today! 🎉";
        return;
      }
      let t = Math.floor((start - now) / 1000);
      $("#cdD").textContent = Math.floor(t / 86400);
      $("#cdH").textContent = pad(Math.floor((t % 86400) / 3600));
      $("#cdM").textContent = pad(Math.floor((t % 3600) / 60));
      $("#cdS").textContent = pad(t % 60);
      $("#cdLabel").textContent = `until your birthday on ${start.toLocaleDateString(undefined, { day: "numeric", month: "long" })} 💙`;
      setTimeout(tickCd, 1000);
    };
    tickCd();
  }

  // Name page
  if (C.fullName) {
    $("#nameLine").textContent = C.nameLine || "";
    const word = $("#nameWord");
    word.setAttribute("aria-label", C.fullName);
    [...C.fullName].forEach((ch, i) => {
      const l = el("span", "nm-letter", esc(ch));
      l.style.setProperty("--i", i);
      l.setAttribute("aria-hidden", "true");
      word.appendChild(l);
    });
    const ac = $("#acrostic");
    [...C.fullName].forEach((ch, i) => {
      const line = (C.nameLetters || [])[i];
      if (!line) return;
      const li = el("li", "reveal", `<b>${esc(ch.toUpperCase())}</b><span>${esc(line)}</span>`);
      li.style.setProperty("--k", i);
      ac.appendChild(li);
    });
    const sp = $("#nameSparkles");
    for (let i = 0; i < 26; i++) {
      const s = el("span", null, i % 3 ? "✦" : "♥");
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.fontSize = 8 + Math.random() * 16 + "px";
      s.style.setProperty("--d", 2 + Math.random() * 3 + "s");
      s.style.setProperty("--delay", Math.random() * 3 + "s");
      if (i % 3 === 0) s.style.color = "var(--rose)";
      sp.appendChild(s);
    }
  } else {
    document.querySelector(".name-page").remove();
  }

  // Cupid page: tap → pull the string → arrow flies → heart is hit → next line
  if (C.cupidLines && C.cupidLines.length) {
    const lines = C.cupidLines;
    const scene = $("#cupidScene"), string = $("#cupidString"), heart = $("#cupidHeart");
    const lineEl = $("#cupidLine"), count = $("#cupidCount"), btn = $("#cupidBtn");
    $("#cupidTitle").textContent = C.cupidTitle || "";
    $("#cupidSub").textContent = C.cupidSubtitle || "";
    lines.forEach(() => count.appendChild(el("span", null, "♡")));
    let shot = 0, firing = false;
    const btnLabels = C.cupidButtons && C.cupidButtons.length ? C.cupidButtons : ["Let my heart find yours 💙"];
    btn.textContent = btnLabels[0];

    // The heart bursts into roses
    const rosesOut = () => {
      const b = $("#cupidBurst");
      const n = 16;
      for (let k = 0; k < n; k++) {
        const r = el("span", null, '<svg viewBox="-52 -52 104 104"><use href="#roseTop" x="-52" y="-52" width="104" height="104" /></svg>');
        const a = (k / n) * Math.PI * 2 + Math.random() * 0.4, d = 60 + Math.random() * 90;
        r.style.setProperty("--dx", `${Math.cos(a) * d}px`);
        r.style.setProperty("--dy", `${Math.sin(a) * d}px`);
        r.style.setProperty("--rot", `${(Math.random() - 0.5) * 240}deg`);
        r.style.width = r.style.height = `${26 + Math.random() * 22}px`;
        r.style.animationDelay = `${Math.random() * 0.12}s`;
        b.appendChild(r);
        setTimeout(() => r.remove(), 1700);
      }
    };

    const shoot = () => {
      if (firing) return;
      firing = true;
      ensureMusic();
      scene.classList.add("pull");
      string.setAttribute("d", "M150 84 L128 128 L150 172");
      setTimeout(() => {
        scene.classList.replace("pull", "fire");
        string.setAttribute("d", "M150 84 L150 128 L150 172");
        setTimeout(() => {
          scene.classList.replace("fire", "reload");
          heart.classList.remove("hit");
          void heart.getBoundingClientRect();
          heart.classList.add("hit");
          rosesOut();
          lineEl.classList.remove("show");
          const text = lines[shot % lines.length];
          // the line arrives once the roses have burst out
          setTimeout(() => {
            lineEl.textContent = text;
            lineEl.classList.add("show");
          }, 650);
          shot++;
          [...count.children].forEach((c, i) => {
            const on = i < (shot > lines.length ? ((shot - 1) % lines.length) + 1 : shot);
            c.textContent = on ? "♥" : "♡";
            c.classList.toggle("on", on);
          });
          btn.textContent = btnLabels[Math.min(shot, btnLabels.length - 1)];
          setTimeout(() => { scene.classList.remove("reload"); firing = false; }, 1700);
        }, 430);
      }, 380);
    };
    scene.addEventListener("click", shoot);
    scene.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); shoot(); } });
    btn.addEventListener("click", shoot);
  } else {
    document.querySelector(".cupid-page").remove();
  }

  // Notes
  $("#notesTitle").textContent = C.notesTitle || "Little notes for you";
  $("#notesSub").textContent = C.notesSubtitle || "Tap each one to open it";
  const notesGrid = $("#notesGrid");
  C.notes.forEach((n) => {
    const b = el("button", "note reveal");
    b.innerHTML = `
      <div class="note-inner">
        <div class="note-face note-front"><span class="heart">💙</span><p>${esc(n.front)}</p></div>
        <div class="note-face note-back">${esc(n.back)}</div>
      </div>`;
    b.addEventListener("click", () => { b.classList.toggle("flipped"); ensureMusic(); });
    notesGrid.appendChild(b);
  });

  // Photos and videos share the same lists — videos are spotted by file type
  const isVideo = (f = "") => /\.(mp4|webm|mov|m4v)$/i.test(f);
  const missing = (file) =>
    `this.outerHTML='<div class=&quot;ph-empty&quot;><b>♡</b>add ${esc(file)}</div>'`;
  const photoHTML = (file, alt) =>
    isVideo(file)
      ? `<video src="${esc(file)}#t=0.1" muted loop playsinline autoplay preload="metadata" onerror="${missing(file)}"></video>
         <span class="play-badge" aria-hidden="true">▶</span>`
      : `<img src="${esc(file)}" alt="${esc(alt)}" loading="lazy" onerror="${missing(file)}">`;

  // Gallery
  $("#photosTitle").textContent = C.photosTitle || "Us, in pictures";
  $("#photosSub").textContent = C.photosSubtitle || "Tap a photo to see it bigger";
  const gallery = $("#gallery");
  C.photos.forEach((p, i) => {
    const f = el("figure", "polaroid reveal");
    f.style.setProperty("--r", `${(i % 2 ? 1 : -1) * (1 + (i * 7) % 4)}deg`);
    f.innerHTML = `<div class="ph">${photoHTML(p.file, p.caption)}</div><figcaption>${esc(p.caption)}</figcaption>`;
    f.addEventListener("click", () => { openLightbox(i); if (!isVideo(p.file)) ensureMusic(); });
    gallery.appendChild(f);
  });

  // Timeline
  const tl = $("#timeline");
  C.memories.forEach((m) => {
    const li = el("li", "tl-item reveal");
    li.innerHTML = `<div class="tl-card">
      <span class="tl-date">${esc(m.date)}</span>
      <h3>${esc(m.title)}</h3>
      <p>${esc(m.text)}</p>
      ${!m.photo ? "" : isVideo(m.photo)
        ? `<video src="${esc(m.photo)}" controls playsinline preload="metadata" onerror="this.remove()"></video>`
        : `<img src="${esc(m.photo)}" alt="${esc(m.title)}" loading="lazy" onerror="this.remove()">`}
    </div>`;
    tl.appendChild(li);
  });

  // Letter
  const lb = $("#letterBody");
  C.letter.forEach((para) => lb.appendChild(el("p", null, esc(para))));

  // ---------- Floating hearts ----------
  const hearts = $(".hearts");
  const glyphs = ["♥", "♡", "♥", "✿"];
  for (let i = 0; i < 18; i++) {
    const s = el("span", null, glyphs[i % glyphs.length]);
    s.style.left = Math.random() * 100 + "%";
    s.style.fontSize = 12 + Math.random() * 22 + "px";
    s.style.animationDuration = 12 + Math.random() * 14 + "s";
    s.style.animationDelay = -Math.random() * 20 + "s";
    hearts.appendChild(s);
  }

  // ---------- Music ----------
  // One main song; the notes / photos sections can have their own, which
  // crossfade in while that section is on screen.
  const audio = $("#audio");
  const player = $("#player");
  const tracks = { main: C.song };
  if (C.notesSong && C.notesSong.file) tracks.notes = C.notesSong;
  if (C.photosSong && C.photosSong.file) tracks.photos = C.photosSong;
  const positions = {};
  let current = null, userPaused = false, started = false, fadeTimer = null;

  const setPlaying = (on) => {
    player.classList.toggle("paused", !on);
    $("#playIcon").textContent = on ? "❚❚" : "▶";
  };
  const showTrack = (t) => {
    $("#trackTitle").textContent = t.title || "Our Song";
    $("#trackArtist").textContent = t.artist || "";
  };
  const fade = (to, ms, done) => {
    clearInterval(fadeTimer);
    const from = audio.volume, t0 = Date.now();
    fadeTimer = setInterval(() => {
      const k = Math.min(1, (Date.now() - t0) / ms);
      audio.volume = from + (to - from) * k;
      if (k === 1) { clearInterval(fadeTimer); done && done(); }
    }, 30);
  };
  function switchTo(key) {
    if (!tracks[key] || key === current) return;
    const load = () => {
      if (current) positions[current] = audio.currentTime;
      current = key;
      audio.src = tracks[key].file;
      showTrack(tracks[key]);
      audio.addEventListener("loadedmetadata", () => {
        if (positions[key]) audio.currentTime = positions[key];
      }, { once: true });
      audio.volume = 0;
      if (started && !userPaused) audio.play().catch(() => setPlaying(false));
      fade(1, 900);
    };
    if (current && !audio.paused) fade(0, 600, load);
    else load();
  }
  let videoPlaying = false, musicBeforeVideo = false;
  function ensureMusic() {
    if (!started || userPaused || videoPlaying || !audio.paused) return;
    audio.play().catch(() => {});
  }

  audio.addEventListener("play", () => setPlaying(true));
  audio.addEventListener("pause", () => setPlaying(false));
  audio.addEventListener("error", () => {
    if (!audio.getAttribute("src")) return;
    $("#trackArtist").textContent = `add ${tracks[current].file} to play a song`;
    setPlaying(false);
  });
  $("#playBtn").addEventListener("click", () => {
    if (audio.paused) { userPaused = false; audio.play().catch(() => {}); }
    else { userPaused = true; audio.pause(); }
  });
  switchTo("main");

  // ---------- Open envelope ----------
  $("#openBtn").addEventListener("click", function () {
    this.classList.add("open");
    started = true;
    audio.volume = 1;
    audio.play().catch(() => setPlaying(false));
    setTimeout(() => {
      $("#intro").classList.add("gone");
      const site = $("#site");
      site.hidden = false;
      site.classList.add("show");
      player.hidden = false;
      $("#pager").hidden = false;
      enter(0);
      confetti(180);
    }, 1300);
  }, { once: true });

  // ---------- Pages ----------
  const pages = [...document.querySelectorAll(".page")];
  const dots = $("#dots");
  let page = -1;

  pages.forEach((_, i) => {
    const d = el("button");
    d.setAttribute("aria-label", `Go to page ${i + 1}`);
    d.addEventListener("click", () => go(i));
    dots.appendChild(d);
  });

  // Show page i and float its content in, one piece after another
  function enter(i) {
    page = i;
    pages.forEach((p, j) => p.classList.toggle("active", j === i));
    const pg = pages[i];
    pg.scrollTop = 0;
    const items = pg.querySelectorAll(".reveal");
    items.forEach((n) => { n.style.transitionDelay = "0s"; n.classList.remove("in"); });
    void pg.offsetWidth;
    items.forEach((n, k) => {
      n.style.transitionDelay = `${0.15 + Math.min(k, 10) * 0.12}s`;
      n.classList.add("in");
    });
    [...dots.children].forEach((d, j) => d.classList.toggle("on", j === i));
    $("#prevBtn").disabled = i === 0;
    switchTo(pg.dataset.song || "main");
  }

  function go(i) {
    if (i === page || i < 0 || i >= pages.length) return;
    ensureMusic();
    enter(i);
  }

  $("#nextBtn").addEventListener("click", () => go(page === pages.length - 1 ? 0 : page + 1));
  $("#prevBtn").addEventListener("click", () => go(page - 1));

  // Swipe left / right on phones
  let tx = 0, ty = 0;
  $("#site").addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  $("#site").addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) go(page + (dx < 0 ? 1 : -1));
  }, { passive: true });

  // ---------- Lightbox ----------
  let lbIndex = 0;
  const box = $("#lightbox");
  const lbImg = $("#lbImg"), lbVid = $("#lbVid");
  function openLightbox(i) {
    lbIndex = (i + C.photos.length) % C.photos.length;
    const p = C.photos[lbIndex];
    const vid = isVideo(p.file);
    lbVid.pause();
    lbImg.hidden = vid;
    lbVid.hidden = !vid;
    if (vid) {
      lbVid.src = p.file;
      lbVid.play().catch(() => {});
    } else {
      lbVid.removeAttribute("src");
      lbImg.src = p.file;
      lbImg.alt = p.caption;
    }
    $("#lbCap").textContent = p.caption;
    box.hidden = false;
  }
  function closeLightbox() {
    box.hidden = true;
    lbVid.pause();
  }
  // Pause the song while a video plays with sound, then bring it back
  lbVid.addEventListener("play", () => {
    if (!videoPlaying) musicBeforeVideo = !audio.paused;
    videoPlaying = true;
    audio.pause();
  });
  const videoStopped = () => {
    if (!videoPlaying) return;
    videoPlaying = false;
    if (musicBeforeVideo && !userPaused) audio.play().catch(() => {});
  };
  lbVid.addEventListener("pause", videoStopped);
  lbVid.addEventListener("ended", videoStopped);
  document.querySelectorAll(".tl-card video").forEach((v) => {
    v.addEventListener("play", () => lbVid.dispatchEvent(new Event("play")));
    v.addEventListener("pause", videoStopped);
  });
  $("#lbClose").onclick = closeLightbox;
  $("#lbPrev").onclick = (e) => { e.stopPropagation(); openLightbox(lbIndex - 1); };
  $("#lbNext").onclick = (e) => { e.stopPropagation(); openLightbox(lbIndex + 1); };
  box.addEventListener("click", (e) => { if (e.target === box) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (!wishBox.hidden) {
      if (e.key === "Escape") closeWish();
      return;
    }
    if (box.hidden) {
      if (page < 0) return;
      if (e.key === "ArrowRight") go(page + 1);
      if (e.key === "ArrowLeft") go(page - 1);
      return;
    }
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
    if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
  });

  // ---------- Cake ----------
  $("#cake").addEventListener("click", function () {
    if (this.classList.contains("out")) return;
    this.classList.add("out");
    $("#cakeHint").textContent = "Yay! 🎉";
    const msg = $("#wishMsg");
    msg.textContent = C.wishMessage;
    msg.hidden = false;
    confetti(260);
    if (wishReady) {
      // Start inside the tap so phones allow sound, then show it after the confetti
      wishVid.play().then(() => { if (wishBox.hidden) { wishVid.pause(); wishVid.currentTime = 0; } }).catch(() => {});
      const cakePage = page;
      setTimeout(() => { if (page === cakePage) openWish(); }, 2200);
    }
  });

  // ---------- Video after the candles ----------
  const wishBox = $("#wishBox"), wishVid = $("#wishVideo");
  // Skipped only when there is no video, or the file is missing
  let wishReady = !!C.wishVideo;
  if (wishReady) {
    wishVid.addEventListener("error", () => (wishReady = false), { once: true });
    wishVid.src = C.wishVideo;
  }
  function openWish() {
    if (!wishBox.hidden) return;
    musicBeforeVideo = !audio.paused;
    videoPlaying = true;
    audio.pause();
    wishBox.hidden = false;
    wishVid.currentTime = 0;
    wishVid.play().catch(() => {});
  }
  function closeWish() {
    if (wishBox.hidden) return;
    wishBox.hidden = true;
    wishVid.pause();
    videoPlaying = false;
    if (musicBeforeVideo && !userPaused) audio.play().catch(() => {});
    $("#wishReplay").hidden = false;
  }
  wishVid.addEventListener("ended", closeWish);
  $("#wishClose").addEventListener("click", closeWish);
  wishBox.addEventListener("click", (e) => { if (e.target === wishBox) closeWish(); });
  $("#wishReplay").addEventListener("click", openWish);

  // ---------- Confetti ----------
  const cv = $("#confetti");
  const ctx = cv.getContext("2d");
  let parts = [], running = false;
  const colors = ["#4a8fe7", "#c3dafc", "#8ec5ff", "#1f55b5", "#ffffff", "#6f8fe0"];
  function confetti(n) {
    cv.width = innerWidth * devicePixelRatio;
    cv.height = innerHeight * devicePixelRatio;
    for (let i = 0; i < n; i++) {
      parts.push({
        x: innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: innerHeight * 0.45,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 14 - 4,
        s: 5 + Math.random() * 7,
        r: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        c: colors[(Math.random() * colors.length) | 0],
        heart: Math.random() < 0.25,
      });
    }
    if (!running) { running = true; requestAnimationFrame(tick); }
  }
  function tick() {
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts.forEach((p) => {
      p.vy += 0.32; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
      if (p.heart) { ctx.font = `${p.s * 2}px serif`; ctx.fillText("♥", 0, 0); }
      else ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      ctx.restore();
    });
    parts = parts.filter((p) => p.y < innerHeight + 40);
    if (parts.length) requestAnimationFrame(tick);
    else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  }
})();
