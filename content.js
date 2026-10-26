(() => {
  'use strict';
  const ID = 'yt-transcript-copy-custom';
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const visible = e => !!(e && e.getClientRects().length);
  const txt = e => (e?.innerText || e?.textContent || '').trim();
  const panels = 'ytd-transcript-renderer, ytd-transcript-search-panel-renderer, yt-transcript-renderer, [class*="transcript-panel"], [class*="transcript-search-panel"]';
  const rows = 'ytd-transcript-segment-renderer, yt-transcript-segment-renderer, transcript-segment-view-model, [class*="transcript-segment-view-model"], [class*="transcript-segment-renderer"]';
  const controls = /^(?:文字起こしを表示|文字起こしを開く|文字起こし|Show transcript|View transcript)$/i;

  function extract() {
    const containers = [...document.querySelectorAll(panels)].filter(visible);
    const roots = containers.length ? containers : [document];
    for (const root of roots) {
      const segments = [...root.querySelectorAll(rows)];
      const result = segments
        .map(el => el.innerText || el.textContent || '')
        .filter(value => value.trim());
      if (result.length) return result;
      const body = root.querySelector('#segments-container');
      const value = body && (body.innerText || body.textContent || '');
      if (value && value.trim()) return [value];
    }
    return [];
  }
  function openButton() {
    return [...document.querySelectorAll('button, [role="button"], ytd-button-renderer, tp-yt-paper-button')]
      .find(el => visible(el) && !el.closest('#' + ID) && controls.test(txt(el)));
  }
  async function ensureOpen() {
    if (extract().length) return;
    let btn = openButton();
    if (!btn) {
      const expand = document.querySelector('ytd-watch-metadata #description-inline-expander #expand, ytd-text-inline-expander #expand');
      if (expand) { expand.click(); await sleep(450); }
      btn = openButton();
    }
    if (btn) (btn.querySelector('button') || btn).click();
    for (let i = 0; i < 40; i++) {
      if (extract().length) return;
      await sleep(250);
    }
  }
  async function write(value) {
    try { await navigator.clipboard.writeText(value); return; } catch (_) {}
    const area = document.createElement('textarea');
    area.value = value;
    area.style.cssText = 'position:fixed;top:0;left:-9999px';
    document.body.append(area); area.select();
    const ok = document.execCommand('copy'); area.remove();
    if (!ok) throw new Error('クリップボードへの書き込みが拒否されました');
  }
  async function copy(button) {
    if (button.disabled) return;
    button.disabled = true; button.textContent = 'Wait';
    try {
      await ensureOpen();
      const lines = extract();
      if (!lines.length) throw new Error('字幕を読み取れませんでした。YouTubeの画面構造が未対応か、字幕がありません。');
      await write(lines.join('\n'));
      button.textContent = 'Copied';
    } catch (err) {
      button.textContent = 'Failed';
      alert('文字起こしをコピーできませんでした。\n' + err.message);
    } finally {
      setTimeout(() => { button.textContent = 'Copy Text'; button.disabled = false; }, 3000);
    }
  }
  function mount() {
    if (location.pathname !== '/watch') { document.getElementById(ID)?.remove(); return; }
    if (document.getElementById(ID)) return;
    const actions = document.querySelector('ytd-watch-metadata #top-level-buttons-computed, ytd-watch-metadata #actions-inner, ytd-watch-metadata #actions');
    if (!actions) return;
    const btn = document.createElement('button');
    btn.id = ID; btn.type = 'button'; btn.textContent = 'Copy Text';
    btn.style.cssText = 'border:0;border-radius:20px;background:#dbeafe;color:#123b73;padding:10px 14px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;margin:0 6px;';
    btn.addEventListener('click', () => copy(btn)); actions.append(btn);
  }
  new MutationObserver(mount).observe(document.documentElement, {childList:true,subtree:true});
  document.addEventListener('yt-navigate-finish', mount); mount();
})();


