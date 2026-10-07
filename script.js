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
  document.title = `Happy Birthday, ${C.name} 💖`;
  document.querySelectorAll("[data-name]").forEach((n) => (n.textContent = C.name));
  $("#tagline").textContent = C.tagline;
  $("#fromName").textContent = C.from;

  // Envelope: cycle through her nicknames, settle on the last one
  $("#introLine").textContent = C.envelopeLine || "for";
  const introName = $("#introName");
  const names = C.envelopeNames && C.envelopeNames.length ? C.envelopeNames : [C.name];
  introName.textContent = names[0];
  names.slice(1).forEach((n, k) => {
    setTimeout(() => {
      introName.textContent = n;
      if (k === names.length - 2) introName.classList.add("final");
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
      $("#cdLabel").textContent = `until your birthday on ${start.toLocaleDateString(undefined, { day: "numeric", month: "long" })} 💖`;
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
  } else {
    document.querySelector(".name-page").remove();
  }

  // Notes
  const notesGrid = $("#notesGrid");
  C.notes.forEach((n) => {
    const b = el("button", "note reveal");
    b.innerHTML = `
      <div class="note-inner">
        <div class="note-face note-front"><span class="heart">💌</span><p>${esc(n.front)}</p></div>
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
    started = true;
    audio.volume = 1;
    audio.play().catch(() => setPlaying(false));
    $("#intro").hidden = true;
    $("#site").hidden = false;
    player.hidden = false;
    $("#pager").hidden = false;
    enter(0);
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
    [...dots.children].forEach((d, j) => d.classList.toggle("on", j === i));
    $("#prevBtn").disabled = i === 0;
    $("#nextLabel").textContent = C.princessLine || "Happiest Birthday, My Princess";
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
  });

})();
