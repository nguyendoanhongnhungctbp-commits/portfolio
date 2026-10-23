/* ============================================================
   TRANG WAITLIST — waitlist.html
   ------------------------------------------------------------
   Landing page cho giai đoạn web chưa mở onboard: chỉ cho đăng ký
   danh sách chờ. Dùng lại ICONS, escapeHtml, renderHow, renderFooter,
   EMAIL_PATTERN của app.js và chữ ở data.js (LANDING, WAITLIST).

   Ba trạng thái của thẻ "Join the Waitlist" (ba bản thiết kế):
     form      — mẫu đăng ký
     duplicate — email đã có trong danh sách (viền đỏ, nhãn Already registered)
     done      — "You're on the list!"

   Prototype không có máy chủ: danh sách chờ chỉ nằm ở localStorage của
   trình duyệt này (khoá pw_waitlist). Nút Reset ở landing chính xoá luôn.
   ============================================================ */

const WAITLIST_WARNING_ICON = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 3 19.5h18z"/><path d="M12 10v4.2M12 16.8v.1"/></svg>';

let waitlistState = 'form';     // 'form' | 'duplicate' | 'done'
let waitlistError = null;       // 'required' | 'invalid' | null
let waitlistEmail = '';
let waitlistName = '';

function readWaitlist() {
  try {
    const list = JSON.parse(localStorage.getItem(WAITLIST.storageKey) ?? '[]');
    return Array.isArray(list) ? list : [];
  } catch (error) {
    return [];
  }
}

function saveWaitlistEntry(entry) {
  try {
    localStorage.setItem(WAITLIST.storageKey, JSON.stringify([...readWaitlist(), entry]));
  } catch (error) {
    // Trình duyệt chặn lưu trữ: vẫn báo thành công, chỉ là tải lại thì mất.
  }
}

function renderWaitlistTopbar() {
  const { brand, nav } = LANDING;
  const links = nav
    .map(({ label, href, isCurrent }) => {
      const target = href.startsWith('#/') ? WAITLIST.directoryHref : href;
      return `<a href="${escapeHtml(target)}"${isCurrent ? ' class="is-current" aria-current="page"' : ''}>${escapeHtml(label)}</a>`;
    })
    .join('');

  return `
  <header class="topbar">
    <div class="wrap">
      <a class="brand" href="#top">
        <span class="brand-mark">${escapeHtml(brand.name)}</span>
        <span>
          <span class="brand-name">${escapeHtml(brand.name)}</span>
          <span class="brand-sub">${escapeHtml(brand.tagline)}</span>
        </span>
      </a>
      <nav class="nav" aria-label="Main">${links}</nav>
    </div>
  </header>`;
}

function renderWaitlistCard() {
  const c = WAITLIST.card;
  const done = waitlistState === 'done';
  const duplicate = waitlistState === 'duplicate';
  const error = duplicate ? 'duplicate' : waitlistError;

  const head = `
      <div class="wl-head">
        <span class="wl-tag">${escapeHtml(c.tag)}</span>
        <span class="wl-state"><i class="dot"></i>${escapeHtml(done ? c.confirmed.badge : c.issuance)}</span>
      </div>`;
  const foot = `<p class="wl-secure">${ICONS.lock}${escapeHtml(c.secureNote)}</p>`;

  if (done) {
    return `
    <aside class="wl-card is-done" id="waitlist">
      ${head}
      <div class="wl-done">
        <span class="wl-done-mark">${ICONS.check}</span>
        <h2>${escapeHtml(c.confirmed.title)}</h2>
        <p>${escapeHtml(c.confirmed.lead)}</p>
      </div>
      <a class="btn btn-outline wl-explore" href="${escapeHtml(WAITLIST.directoryHref)}">${escapeHtml(WAITLIST.exploreLabel)} ${ICONS.arrowRight}</a>
      ${foot}
    </aside>`;
  }

  let message = '';
  if (error === 'duplicate') {
    message = c.errors.duplicate.map((line) => `<span>${escapeHtml(line)}</span>`).join('');
  } else if (error) {
    message = `<span>${escapeHtml(c.errors[error])}</span>`;
  }

  return `
    <aside class="wl-card" id="waitlist">
      ${head}
      <h2>${escapeHtml(c.title)}</h2>
      <p class="wl-lead">${escapeHtml(c.lead)}</p>

      <form id="wl-form" novalidate>
        <div class="wl-label-row">
          <label for="wl-email">${escapeHtml(c.emailLabel)} *</label>
          ${duplicate ? `<span class="wl-badge">${ICONS.info}${escapeHtml(c.duplicateBadge)}</span>` : ''}
        </div>
        <input id="wl-email" class="wl-input${error ? ' has-error' : ''}" type="email" inputmode="email" autocomplete="email"
               placeholder="${escapeHtml(c.emailPlaceholder)}" value="${escapeHtml(waitlistEmail)}"
               ${error ? 'aria-invalid="true" aria-describedby="wl-error"' : ''}>
        ${message ? `<p class="wl-error" id="wl-error" role="alert">${WAITLIST_WARNING_ICON}<span class="wl-error-lines">${message}</span></p>` : ''}

        <div class="wl-label-row">
          <label for="wl-name">${escapeHtml(c.nameLabel)} <small>${escapeHtml(c.nameOptional)}</small></label>
        </div>
        <input id="wl-name" class="wl-input" type="text" autocomplete="name"
               placeholder="${escapeHtml(c.namePlaceholder)}" value="${escapeHtml(waitlistName)}">

        <button class="btn btn-primary wl-submit" type="submit">${escapeHtml(c.submitLabel)} ${ICONS.checkBadge}</button>
      </form>
      ${foot}
    </aside>`;
}

function renderWaitlistHero() {
  const { hero } = LANDING;
  const facts = hero.facts
    .map(({ key, value }, index) => `
      <div class="fact">
        ${ICONS[HERO_FACT_ICONS[index]]}
        <div>
          <div class="fact-k">${escapeHtml(key)}</div>
          <div class="fact-v">${escapeHtml(value)}</div>
        </div>
      </div>`)
    .join('');

  return `
  <section class="hero hero-waitlist" id="top">
    <div class="wrap">
      <div>
        <span class="tag tag-green">${ICONS.shield}${escapeHtml(hero.tag)}</span>
        <h1>${escapeHtml(hero.headline)} <span class="accent">${escapeHtml(hero.headlineAccent)}</span></h1>
        <p class="hero-lead">${escapeHtml(hero.lead)}</p>
        <div class="hero-facts">${facts}</div>
      </div>
      ${renderWaitlistCard()}
    </div>
  </section>`;
}

function renderWaitlistTitles() {
  const { titles } = LANDING;
  const cards = titles.cards
    .map(({ name, description, designatedFor, series }) => `
      <article class="title-card">
        <div class="title-card-head">
          <span class="who">PW</span>
          <span class="status">${escapeHtml(titles.status)}</span>
        </div>
        <h3>${escapeHtml(name)}</h3>
        <p>${escapeHtml(description)}</p>
        <div class="designated">
          <span class="label">Designated for</span>
          <p>${escapeHtml(designatedFor)}</p>
        </div>
        <div class="title-card-foot">
          <span class="series">${escapeHtml(series)}</span>
          <a class="btn btn-quiet" href="#waitlist">${escapeHtml(WAITLIST.titles.learnMoreLabel)}</a>
        </div>
      </article>`)
    .join('');

  return `
  <section class="titles" id="titles">
    <div class="wrap">
      <div class="titles-head">
        <div>
          <span class="tag tag-soft">${escapeHtml(titles.tag)}</span>
          <h2>${escapeHtml(titles.heading)}</h2>
        </div>
      </div>
      <div class="title-cards">${cards}</div>
    </div>
  </section>`;
}

function renderWaitlistPage() {
  document.getElementById('app').innerHTML = [
    renderWaitlistTopbar(),
    renderWaitlistHero(),
    renderTrust(LANDING),
    renderHow(LANDING),
    renderWaitlistTitles(),
    renderFooter(LANDING),
  ].join('');
  bindWaitlistForm();
}

/** Vẽ lại chỉ thẻ bên phải; giữ nguyên phần còn lại của trang. */
function refreshWaitlistCard(focusId) {
  const card = document.getElementById('waitlist');
  card.outerHTML = renderWaitlistCard();
  bindWaitlistForm();
  const next = focusId && document.getElementById(focusId);
  if (next) {
    next.focus();
    next.setSelectionRange?.(next.value.length, next.value.length);
  }
}

function bindWaitlistForm() {
  const form = document.getElementById('wl-form');
  if (!form) return;
  const email = document.getElementById('wl-email');
  const name = document.getElementById('wl-name');

  // Sửa lại ô email thì xoá lỗi đang hiện, giữ nguyên những gì đã gõ.
  email.addEventListener('input', () => {
    waitlistEmail = email.value;
    if (waitlistState === 'duplicate' || waitlistError) {
      waitlistState = 'form';
      waitlistError = null;
      refreshWaitlistCard('wl-email');
    }
  });
  name.addEventListener('input', () => { waitlistName = name.value; });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    waitlistEmail = email.value.trim();
    waitlistName = name.value.trim();
    const key = waitlistEmail.toLowerCase();

    if (!waitlistEmail) {
      waitlistError = 'required';
      waitlistState = 'form';
    } else if (!EMAIL_PATTERN.test(waitlistEmail)) {
      waitlistError = 'invalid';
      waitlistState = 'form';
    } else if (readWaitlist().some((entry) => entry.email === key)) {
      waitlistError = null;
      waitlistState = 'duplicate';
    } else {
      saveWaitlistEntry({ email: key, name: waitlistName, joinedAt: new Date().toISOString() });
      waitlistError = null;
      waitlistState = 'done';
    }
    refreshWaitlistCard(waitlistState === 'done' ? null : 'wl-email');
  });
}

renderWaitlistPage();
