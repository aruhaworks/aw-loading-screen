(() => {
  const $ = id => document.getElementById(id);
  const C = Config;
  const esc = s => String(s).replace(/</g, '&lt;');

  document.title = C.server.name;
  if (C.video.grayscale) document.body.classList.add('bw');

  // ---------- static text ----------
  $('loading-title').textContent = C.loading.title;
  $('mark-text').textContent = C.server.name.slice(0, 3).toUpperCase();
  $('city').textContent = C.server.city;
  $('ticker-label').textContent = C.ticker.label;
  if (C.server.logo) {
    $('logo-img').src = C.server.logo; $('logo-img').hidden = false;
    document.querySelector('.mark').style.display = 'none';
  }

  // ---------- video ----------
  const video = $('bg-video');
  
  if (C.video.enabled && C.video.files.length) {
    video.src = C.video.files[Math.floor(Math.random() * C.video.files.length)];
    video.muted = C.video.muted;
    video.play().catch(() => {});
    video.addEventListener('error', () => video.remove());
  } else video.remove();

  // ---------- clock ----------
  const tick = () => {
    const o = { hour: 'numeric', minute: '2-digit', hour12: C.clock.format === 12 };
    if (C.clock.format === 24) o.hour = '2-digit';
    if (C.clock.showSeconds) o.second = '2-digit';
    if (C.clock.timeZone) o.timeZone = C.clock.timeZone;
    $('clock').textContent = new Date().toLocaleTimeString('en-US', o);
  };
  if (C.clock.enabled) { tick(); setInterval(tick, 1000); } else $('clock').hidden = true;

  // ---------- weather ----------
  if (C.weather.enabled) {
    const c = C.weather.temperature;
    const t = C.weather.unit === 'F' ? Math.round(c * 9 / 5 + 32) : Math.round(c);
    $('weather-icon').textContent = C.weather.icon;
    $('weather-temp').textContent = `${t}°${C.weather.unit}`;
    $('weather-cond').textContent = C.weather.condition;
  } else $('weather-box').hidden = true;

  // ---------- ticker ----------
  const track = $('ticker-track');
  const html = C.ticker.messages.map(m => `<span>${esc(m)}</span>`).join('');
  track.innerHTML = html + html;
  track.style.animationDuration = `${Math.max(track.scrollWidth / 2 / C.ticker.speed, 10)}s`;

  // ---------- animated welcome text ----------
  const wel = $('welcome');
  let wi = 0;
  const showWelcome = () => {
    const text = C.welcome.messages[wi++ % C.welcome.messages.length];
    wel.innerHTML = [...text].map((ch, i) =>
      ch === ' ' ? '<span class="sp"></span>'
                 : `<span class="ch" style="animation-delay:${i * 35}ms">${esc(ch)}</span>`).join('');
  };
  showWelcome();
  if (C.welcome.messages.length > 1) setInterval(showWelcome, C.welcome.interval);

  // ---------- stages + progress ----------
  const list = $('stage-list');
  const stages = C.loading.stages.map(name => {
    const li = document.createElement('li');
    li.className = 'stage';
    li.innerHTML = `<span>${esc(name)}</span><div class="bar"><i></i></div>`;
    list.appendChild(li);
    return { li, fill: li.querySelector('i') };
  });

  function setProgress(f) {
    const p = Math.max(0, Math.min(1, f));
    const n = stages.length;
    stages.forEach((s, i) => {
      const local = Math.max(0, Math.min(1, p * n - i));
      s.fill.style.width = `${local * 100}%`;
      s.li.classList.toggle('done', local >= 1);
      s.li.classList.toggle('active', local > 0 && local < 1);
    });
    $('status-text').textContent = `${C.loading.statusText} (${Math.round(p * 100)}%)`;
  }
  setProgress(0);
  window.addEventListener('message', e => {
    if (e.data && e.data.eventName === 'loadProgress') setProgress(e.data.loadFraction);
  });
  if (!window.invokeNative) {          // browser preview: fake loading
    let f = 0;
    const d = setInterval(() => { f += Math.random() * 0.025; setProgress(f); if (f >= 1) clearInterval(d); }, 350);
  }

  // ---------- music ----------
  const audio = $('audio'), vol = $('volume'), btn = $('mute-btn');
  if (!C.music.enabled || !C.music.files.length) {
    $('music-box').hidden = true;
  } else {
    const order = C.music.files.map((_, i) => i);
    if (C.music.shuffle) order.sort(() => Math.random() - 0.5);
    let idx = 0;
    const load = () => { audio.src = C.music.files[order[idx % order.length]]; audio.play().catch(() => {}); };
    audio.volume = C.music.volume; vol.value = C.music.volume * 100;
    audio.addEventListener('ended', () => { idx++; if (idx < order.length || C.music.loop) load(); });
    load();
    const icon = () => btn.classList.toggle('off', audio.muted || audio.volume === 0);
    vol.addEventListener('input', () => { audio.volume = vol.value / 100; audio.muted = false; icon(); });
    btn.addEventListener('click', () => { if (audio.paused) audio.play().catch(() => {}); audio.muted = !audio.muted; icon(); });
    document.addEventListener('click', () => { if (audio.paused) audio.play().catch(() => {}); }, { once: true });
  }
})();
