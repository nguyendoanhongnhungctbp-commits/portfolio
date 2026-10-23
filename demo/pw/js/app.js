/* ============================================================
   PW — Dựng landing page từ nội dung trong data.js
   ------------------------------------------------------------
   Trang tĩnh, không định tuyến, không lưu trạng thái.
   Mỗi hàm render* trả về một chuỗi HTML cho đúng một khối.
   ============================================================ */

/* Escape để nội dung trong data.js không thể phá cấu trúc HTML */
const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (char) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

/* Icon nét mảnh, kế thừa màu từ phần tử cha qua currentColor */
const ICONS = {
  check:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8.4 12.1 2.4 2.4 4.8-5.2"/></svg>',
  lock:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4.5" y="10" width="15" height="9.5" rx="2.2"/><path d="M8 10V7.2a4 4 0 0 1 8 0V10"/></svg>',
  globe:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3.2 12h17.6M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18"/></svg>',
  shield: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.2 19 6v5.1c0 4.4-2.9 7.9-7 9.7-4.1-1.8-7-5.3-7-9.7V6z"/><path d="m9.2 12 2 2 3.6-3.8"/></svg>',
  card:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2.4"/><path d="M3 10h18"/></svg>',
  building: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3.5" width="11" height="17" rx="1.6"/><path d="M15 9h4.4a.6.6 0 0 1 .6.6v10.9M7.4 7.5h1.6M7.4 11h1.6M7.4 14.5h1.6M11.6 7.5h.4M11.6 11h.4M11.6 14.5h.4"/></svg>',
  person:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8.2" r="3.6"/><path d="M4.8 20.2a7.2 7.2 0 0 1 14.4 0"/></svg>',
  badge:    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.2" y="6.6" width="17.6" height="13.4" rx="2"/><path d="M9 6.6V5.2a1.6 1.6 0 0 1 1.6-1.6h2.8A1.6 1.6 0 0 1 15 5.2v1.4"/><path d="M3.2 12h17.6"/></svg>',
  mail:     '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.8" y="5" width="18.4" height="14" rx="2.2"/><path d="m3.6 7 8.4 6 8.4-6"/></svg>',
  eye:      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.2 12S5.8 5.5 12 5.5 21.8 12 21.8 12 18.2 18.5 12 18.5 2.2 12 2.2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
  eyeOff:   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.9 5.8A9.6 9.6 0 0 1 12 5.5c6.2 0 9.8 6.5 9.8 6.5a17 17 0 0 1-3.3 4.1M6.5 7.9A17 17 0 0 0 2.2 12S5.8 18.5 12 18.5a9.4 9.4 0 0 0 3.6-.7"/><path d="m3 3 18 18"/><path d="M10.2 10.3a2.9 2.9 0 0 0 3.9 4"/></svg>',
  info:     '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.2M12 7.9v.1"/></svg>',
  fingerprint: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4.4a7.6 7.6 0 0 1 7.6 7.6v2.4M4.4 14.4V12A7.6 7.6 0 0 1 8 5.5"/><path d="M8.2 12a3.8 3.8 0 0 1 7.6 0v4.6M12 12v6.4"/><path d="M6.6 17.8q.6-1.6.6-3.4"/></svg>',
  uploadCloud: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17.6A4.3 4.3 0 0 1 7.4 9a5.6 5.6 0 0 1 10.8 1.6 3.6 3.6 0 0 1-.6 7.1"/><path d="M12 12.4v7.2M9.2 15.2 12 12.4l2.8 2.8"/></svg>',
  file: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.6 3.2H7a2 2 0 0 0-2 2v13.6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.6z"/><path d="M13.6 3.2v5.4H19M8.6 13h6.8M8.6 16.6h4.4"/></svg>',
  trash: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.4 6.6h15.2M9.4 6.6V4.8a1.4 1.4 0 0 1 1.4-1.4h2.4a1.4 1.4 0 0 1 1.4 1.4v1.8"/><path d="M6.6 6.6 7.4 19a1.8 1.8 0 0 0 1.8 1.6h5.6a1.8 1.8 0 0 0 1.8-1.6l.8-12.4"/><path d="M10.4 10.4v6M13.6 10.4v6"/></svg>',
  key:      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="7.4" cy="12" r="3.6"/><path d="M11 12h9.4M17.6 12v3.1M20.4 12v2.2"/></svg>',
  passkey:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9.6" cy="8" r="3.5"/><path d="M3.4 19.6a6.2 6.2 0 0 1 10.3-4.6"/><circle cx="17.6" cy="16.4" r="2.5"/><path d="M17.6 18.9v2.3l1.3-.9"/></svg>',
  alert:    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.6v5M12 16v.1"/></svg>',
  padlock:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4.8" y="10.4" width="14.4" height="9.2" rx="2.2"/><path d="M8.2 10.4V7.6a3.8 3.8 0 0 1 7.6 0v2.8"/></svg>',
  grid:     '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.4" y="3.4" width="7" height="7" rx="1.4"/><rect x="13.6" y="3.4" width="7" height="7" rx="1.4"/><rect x="3.4" y="13.6" width="7" height="7" rx="1.4"/><rect x="13.6" y="13.6" width="7" height="7" rx="1.4"/></svg>',
  checkMark: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.6 4.6 4.6L19 7.2"/></svg>',
  chip: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/></svg>',
  refresh: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.4a8 8 0 0 0-13.6-4.5L3.4 9.8"/><path d="M3.4 5v4.8h4.8"/><path d="M4 12.6a8 8 0 0 0 13.6 4.5l3-2.9"/><path d="M20.6 19v-4.8h-4.8"/></svg>',
  sparkle: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m10 3.4 1.9 4.7 4.7 1.9-4.7 1.9L10 16.6 8.1 11.9 3.4 10l4.7-1.9z"/><path d="M17.6 14.4l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></svg>',
  headset: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14.4v-2.2a8 8 0 0 1 16 0v2.2"/><path d="M4 14.2h2.2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5.2a1.2 1.2 0 0 1-1.2-1.2zM20 14.2h-2.2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1a1.2 1.2 0 0 0 1.2-1.2z"/><path d="M20 18.8v.6a2.4 2.4 0 0 1-2.4 2.4H13"/></svg>',
  arrowRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.6 12h14.8M13.4 6l6 6-6 6"/></svg>',
  bank: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.4 9.2 12 4.4l8.6 4.8"/><path d="M5.6 10.6v6.2M9.4 10.6v6.2M14.6 10.6v4M18.4 10.6v3"/><path d="M3.4 19.4h10.2"/><path d="M18.2 16.1l2.9 1.1v2.1c0 1.5-1.1 2.7-2.9 3.3-1.8-.6-2.9-1.8-2.9-3.3v-2.1z"/></svg>',
  hexagon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.6 20.1 7v10L12 21.4 3.9 17V7z"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>',
  gift: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.4" y="10.6" width="17.2" height="9.8" rx="1.8"/><path d="M2.4 6.6h19.2v4H2.4zM12 6.6v13.8"/><path d="M12 6.6S10.8 3 8.6 3a2.1 2.1 0 0 0 0 3.6zM12 6.6S13.2 3 15.4 3a2.1 2.1 0 0 1 0 3.6z"/></svg>',
  linkOut:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.5 5H19v5.5M19 5l-7.8 7.8"/><path d="M18 14.5V18a1.8 1.8 0 0 1-1.8 1.8H6A1.8 1.8 0 0 1 4.2 18V7.8A1.8 1.8 0 0 1 6 6h3.5"/></svg>',
  nodes:    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M8.2 16.6 15.8 7.6M8.4 18h7.2"/></svg>',
  sort:     '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.5 4.5v15M4 8l3.5-3.5L11 8"/><path d="M16.5 19.5v-15M13 16l3.5 3.5L20 16"/></svg>',
  copy: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11.4" height="11.4" rx="2"/><path d="M15 6.4V5.6a2 2 0 0 0-2-2H5.6a2 2 0 0 0-2 2V13a2 2 0 0 0 2 2h.8"/></svg>',
  linkOff: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16.2 8.4 18 6.6a3.8 3.8 0 0 0-5.4-5.4"/><path d="M10.2 13.8a3.8 3.8 0 0 0 4 .9M8.8 9.6a3.8 3.8 0 0 0-1.4.9l-2.6 2.6a3.8 3.8 0 0 0 5.4 5.4l1.5-1.5"/><path d="m3 3 18 18"/></svg>',
  transfer: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8.4h14.4l-3.2-3.2M20 15.6H5.6l3.2 3.2"/></svg>',
  search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.4"/><path d="m15.6 15.6 4.4 4.4"/></svg>',
  bell: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 10.4a6 6 0 1 0-12 0c0 4.2-1.6 5.6-1.6 5.6h15.2s-1.6-1.4-1.6-5.6"/><path d="M13.7 19.4a2 2 0 0 1-3.4 0"/></svg>',
  checkBadge: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.3 1.8 2.9-.2.9 2.8 2.4 1.7-1 2.7 1 2.7-2.4 1.7-.9 2.8-2.9-.2L12 21l-2.3-1.8-2.9.2-.9-2.8-2.4-1.7 1-2.7-1-2.7 2.4-1.7.9-2.8 2.9.2z"/><path d="m9.2 12.1 2 2 3.6-3.9"/></svg>',
  book: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.4 5.4A1.6 1.6 0 0 1 5 3.8h4.4A2.6 2.6 0 0 1 12 6.4v12a2.2 2.2 0 0 0-2.2-2.2H5a1.6 1.6 0 0 1-1.6-1.6z"/><path d="M20.6 5.4A1.6 1.6 0 0 0 19 3.8h-4.4A2.6 2.6 0 0 0 12 6.4v12a2.2 2.2 0 0 1 2.2-2.2H19a1.6 1.6 0 0 0 1.6-1.6z"/></svg>',
  link: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.2 13.8a3.8 3.8 0 0 0 5.6.3l2.6-2.6a3.8 3.8 0 0 0-5.4-5.4l-1.5 1.5"/><path d="M13.8 10.2a3.8 3.8 0 0 0-5.6-.3l-2.6 2.6a3.8 3.8 0 0 0 5.4 5.4l1.5-1.5"/></svg>',
  logOut: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.6 20.2H6.2a2 2 0 0 1-2-2V5.8a2 2 0 0 1 2-2h3.4"/><path d="M15.6 16.2 19.8 12l-4.2-4.2M19.8 12H9.6"/></svg>',
  wallet: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.6 8.4A2.2 2.2 0 0 1 5.8 6.2h11.6a2.2 2.2 0 0 1 2.2 2.2v8.2a2.2 2.2 0 0 1-2.2 2.2H5.8a2.2 2.2 0 0 1-2.2-2.2z"/><path d="M3.6 10.4h16M16.4 14.2h.8"/></svg>',
  medal: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="14.6" r="5.2"/><path d="m8.4 9.6-3-6.2h4.2L12 8M15.6 9.6l3-6.2h-4.2"/><path d="m12 12.4.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z"/></svg>',
  history: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.8 12a8.2 8.2 0 1 0 2.5-5.9L3.6 8.8"/><path d="M3.6 4.2v4.6h4.6M12 7.8V12l3 1.8"/></svg>',
  pulse:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M7.5 12h2l1.8-3.4 2 6.6 1.6-3.2h1.6"/></svg>',

  /* --- Thêm cho màn hồ sơ công khai của pháp nhân --- */
  folder:      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.8 7.4a1.8 1.8 0 0 1 1.8-1.8h3.9l2 2.4h8.7a1.8 1.8 0 0 1 1.8 1.8v1"/><path d="M2.8 7.4v10.4a1.8 1.8 0 0 0 1.8 1.8h14a1.8 1.8 0 0 0 1.75-1.35l1.3-6.2a1 1 0 0 0-1-1.25H5.6a1.8 1.8 0 0 0-1.75 1.35z"/></svg>',
  close:       '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',

  /* --- Thêm cho màn Admin Portal --- */
  globeSearch: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 13.4A9 9 0 1 0 13 20.8"/><path d="M3.4 12h9.2M12 3a14 14 0 0 1 2.6 9M12 3a14 14 0 0 0 0 18"/><circle cx="17.4" cy="17.4" r="3.4"/><path d="m20.2 20.2 2.2 2.2"/></svg>',
  shieldUser:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.2 19 6v5.1c0 4.4-2.9 7.9-7 9.7-4.1-1.8-7-5.3-7-9.7V6z"/><circle cx="12" cy="10.4" r="2.1"/><path d="M8.6 16.2a3.8 3.8 0 0 1 6.8 0"/></svg>',
  userCheck:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9.4" cy="8" r="3.6"/><path d="M3 19.6a6.6 6.6 0 0 1 12.8-2.2"/><path d="m15.8 17.4 2 2 4-4.2"/></svg>',
  hourglass:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12M6 21h12M7 3c0 5 3 6 5 9-2 3-5 4-5 9M17 3c0 5-3 6-5 9 2 3 5 4 5 9"/></svg>',
  chevronDown: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  sliders:     '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.4 7.2h17.2M3.4 12h17.2M3.4 16.8h17.2"/><circle cx="8.4" cy="7.2" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="10" cy="16.8" r="2"/></svg>',
  receipt:     '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5.4 3.4h13.2v17.2l-2.2-1.4-2.2 1.4-2.2-1.4-2.2 1.4-2.2-1.4-2.2 1.4z"/><path d="M8.6 8h6.8M8.6 11.6h6.8M8.6 15.2h4"/></svg>',
  filter:      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.6 6.4h16.8M6.4 12h12M9.6 17.6h5.6"/></svg>',
  clock:       '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.6"/><path d="M12 7.2V12l3.2 2"/></svg>',

  chevronLeft:  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5.5 8.5 12l6.5 6.5"/></svg>',
  chevronRight: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5.5 15.5 12 9 18.5"/></svg>',
  arrowLeft: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19.4 12H4.6M10.6 6l-6 6 6 6"/></svg>',
  share:     '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="17.6" cy="5.8" r="2.6"/><circle cx="6.4" cy="12" r="2.6"/><circle cx="17.6" cy="18.2" r="2.6"/><path d="m8.7 10.8 6.6-3.7M8.7 13.2l6.6 3.7"/></svg>',
  download:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.6v10.2M8.4 10.6 12 14.2l3.6-3.6"/><path d="M4.4 16.4v2.2a1.8 1.8 0 0 0 1.8 1.8h11.6a1.8 1.8 0 0 0 1.8-1.8v-2.2"/></svg>',
  pin:       '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21.4s7-5.6 7-11A7 7 0 0 0 5 10.4c0 5.4 7 11 7 11z"/><circle cx="12" cy="10.2" r="2.6"/></svg>',
  calendar:  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.6" y="5.2" width="16.8" height="15.2" rx="2.2"/><path d="M3.6 9.6h16.8M7.8 3.4v3.4M16.2 3.4v3.4"/><circle cx="8.2" cy="13.6" r="1.1" fill="currentColor" stroke="none"/></svg>',
  pieChart:  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.6"/><path d="M12 3.4V12h8.6"/></svg>',
  rosette:   '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="10.2" r="6.4"/><path d="m12 6.8 1.1 2.2 2.4.35-1.75 1.7.4 2.4L12 12.3l-2.15 1.15.4-2.4L8.5 9.35l2.4-.35z"/><path d="m8.6 16.1-1.2 4.5 4.6-2 4.6 2-1.2-4.5"/></svg>',
  gavel:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5.4 18.6 7.4-7.4M14.6 4.2l5.2 5.2M17.2 1.6l5.2 5.2M11.4 7.4l5.2 5.2M2.8 21.2h7.2"/></svg>',
  shieldMark: '<svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.4 3.6 5.6v6.1c0 1.5.3 2.9.8 4.1L12 9.6l7.6 6.2c.5-1.2.8-2.6.8-4.1V5.6z"/><path d="M12 12.4 5.4 17.8c1.4 2 3.6 3.4 6.6 4.2 3-.8 5.2-2.2 6.6-4.2L12 12.4zm1.9 8.3h-3.8v-4.3h3.8z"/></svg>',
};

/* Icon riêng cho từng ô "fact" ở hero, theo đúng thứ tự trong data.js */
const HERO_FACT_ICONS = ['check', 'lock', 'card'];

/* `currentHref` để màn ngoài landing (ví dụ #/public-directory) tô đúng mục
   nav của mình. Bỏ trống thì dùng cờ isCurrent tĩnh trong js/data.js. */
function renderTopbar({ brand, nav }, currentHref) {
  const links = nav
    .map(({ label, href, isCurrent }) => {
      const on = currentHref ? href === currentHref : isCurrent;
      return `<a href="${escapeHtml(href)}"${on ? ' class="is-current" aria-current="page"' : ''}>${escapeHtml(label)}</a>`;
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
      <div class="nav-actions">
        <a class="btn btn-primary" href="#/register">Register</a>
        <a class="btn nav-login" href="#/login">Log in</a>
        <button class="btn nav-login nav-reset" type="button" data-reset-demo>${escapeHtml(LANDING.resetLabel)}</button>
      </div>
    </div>
  </header>`;
}

function renderHero({ hero }) {
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
  <section class="hero" id="top">
    <div class="wrap">
      <div>
        <span class="tag tag-green">${ICONS.shield}${escapeHtml(hero.tag)}</span>
        <h1>${escapeHtml(hero.headline)} <span class="accent">${escapeHtml(hero.headlineAccent)}</span></h1>
        <p class="hero-lead">${escapeHtml(hero.lead)}</p>
        <div class="hero-facts">${facts}</div>
      </div>

    </div>
  </section>`;
}

function renderTrust({ trust }) {
  const partners = trust.partners
    .map((name) => `<span>${escapeHtml(name)}</span>`)
    .join('');

  return `
  <section class="trust">
    <div class="wrap">
      <div class="trust-claim">
        ${ICONS.shield}
        <p>${escapeHtml(trust.claimBefore)}<b>${escapeHtml(trust.claimHighlight)}</b>${escapeHtml(trust.claimAfter)}</p>
      </div>
      ${partners ? `<div class="partners">${partners}</div>` : ''}
    </div>
  </section>`;
}

function renderHow({ how }) {
  const steps = how.steps
    .map(({ accent, tag, heading, body, chip, chipIcon }, index) => `
      <article class="step">
        <div class="step-head">
          <span class="step-num" data-accent="${escapeHtml(accent)}">0${index + 1}</span>
          <span class="label">${escapeHtml(tag)}</span>
        </div>
        <h3>${escapeHtml(heading)}</h3>
        <p>${escapeHtml(body)}</p>
        <div class="step-chip">${ICONS[chipIcon]}${escapeHtml(chip)}</div>
      </article>`)
    .join('');

  return `
  <section class="how" id="how">
    <div class="wrap">
      <span class="tag tag-grey">${escapeHtml(how.tag)}</span>
      <h2>${escapeHtml(how.heading)}</h2>
      <p class="how-lead">${escapeHtml(how.lead)}</p>
      <div class="steps">${steps}</div>
    </div>
  </section>`;
}

function renderTitles({ titles }) {
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
          <button class="btn btn-quiet" type="button" data-purchase-title>Purchase a Title</button>
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

function renderFooter({ brand, footer }) {
  const links = footer.links
    .map((label) => `<a href="#top">${escapeHtml(label)}</a>`)
    .join('');

  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="colophon">
        <b>${escapeHtml(brand.name)}</b>
        <span class="sep">|</span>
        <span>${escapeHtml(footer.copyright)}</span>
      </div>
      <nav aria-label="Legal">${links}</nav>
    </div>
  </footer>`;
}

function renderLandingPage(content) {
  return [
    renderTopbar(content),
    renderHero(content),
    renderTrust(content),
    renderHow(content),
    renderTitles(content),
    renderFooter(content),
  ].join('');
}


/* ============================================================
   MÀN ĐĂNG KÝ
   ------------------------------------------------------------
   BẢO MẬT: mật khẩu chỉ tồn tại trong bộ nhớ của form. Không ghi
   vào localStorage, không log, không gửi đi đâu — prototype này
   không có máy chủ, nên mọi hình thức lưu trữ đều là rủi ro thừa.
   ============================================================ */

const PASSWORD_RULES = [
  { test: (password) => password.length >= 8,          errorKey: 'passwordTooShort'    },
  { test: (password) => /\d/.test(password),           errorKey: 'passwordNeedsNumber' },
  { test: (password) => /[^A-Za-z0-9]/.test(password), errorKey: 'passwordNeedsSymbol' },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Số quy tắc mật khẩu đã đạt (0–3), dùng cho thanh đo độ mạnh. */
function measurePasswordStrength(password) {
  if (!password) return 0;
  return PASSWORD_RULES.filter((rule) => rule.test(password)).length;
}

function findHeadcountBracket(bracketId) {
  return HEADCOUNT_BRACKETS.find((bracket) => bracket.id === bracketId) ?? null;
}

/** Cá nhân luôn là class 0; doanh nghiệp lấy theo bậc nhân sự. */
function resolveClassIndex({ accountType, headcountBracketId }) {
  if (accountType === 'individual') return 0;
  return findHeadcountBracket(headcountBracketId)?.classIndex ?? null;
}

function resolveClassTierLabel(classIndex) {
  return CLASS_TIERS.find((tier) => classIndex <= tier.upToClassIndex)?.label ?? '';
}

/**
 * Kiểm tra toàn bộ form, trả về object lỗi theo tên trường.
 * Object rỗng nghĩa là hợp lệ.
 */
function validateRegistration(values) {
  const { errors: messages } = REGISTER;
  const errors = {};
  const isCompany = values.accountType === 'company';

  if (!values.legalName.trim()) {
    // Tên trường khác nhau giữa hai biến thể; gắn lỗi vào ô đang hiển thị
    // để người dùng thấy được, thay vì vào ô đã bị ẩn.
    errors[values.nameFieldName] = isCompany ? messages.legalNameRequired : messages.fullNameRequired;
  }
  if (isCompany && !values.representative.trim()) {
    errors.representative = messages.representativeRequired;
  }
  if (!values.email.trim()) {
    errors.email = messages.emailRequired;
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = messages.emailInvalid;
  }
  if (isCompany && !values.headcountBracketId) {
    errors.headcount = messages.headcountRequired;
  }
  if (!values.country) {
    errors.country = messages.countryRequired;
  }

  // Báo MỌI quy tắc chưa đạt, mỗi quy tắc một dòng (ô còn trống thì chỉ báo dòng đầu).
  const failedRules = PASSWORD_RULES.filter((rule) => !rule.test(values.password));
  if (failedRules.length) {
    errors.password = (values.password ? failedRules : failedRules.slice(0, 1))
      .map((rule) => messages[rule.errorKey])
      .join('\n');
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = messages.confirmMismatch;
  }
  if (!values.hasAgreedToTerms) {
    errors.terms = messages.termsRequired;
  }
  return errors;
}

/* ---------------- Mảnh giao diện dùng lại ---------------- */

function renderFieldError(fieldName) {
  return `<p class="field-error" id="error-${fieldName}" role="alert" hidden></p>`;
}

function renderTextField({ name, label, note, placeholder, icon, type = 'text', autocomplete, quickFill }) {
  // Cờ DEV quickFillRegister: biểu tượng đầu ô thành nút điền sẵn form bằng dữ liệu thử.
  const iconHtml = DEV_FLAGS.quickFillRegister && quickFill
    ? `<button class="control-icon" type="button" data-quick-fill="${quickFill}"
               aria-label="Fill the test data" title="Fill the test data">${ICONS[icon]}</button>`
    : `<span class="control-icon">${ICONS[icon]}</span>`;
  return `
    <div class="field" data-field="${name}">
      <div class="field-head">
        <label for="${name}">${escapeHtml(label)} <span class="required">*</span></label>
        ${note ? `<span class="field-note">${escapeHtml(note)}</span>` : ''}
      </div>
      <div class="control">
        <input id="${name}" name="${name}" type="${type}"
               placeholder="${escapeHtml(placeholder)}"
               autocomplete="${autocomplete}"
               aria-describedby="error-${name}">
        ${iconHtml}
      </div>
      ${renderFieldError(name)}
    </div>`;
}

function renderSelectField({ name, label, options, selectedValue }) {
  const choices = options
    .map(({ value, label: optionLabel }) =>
      `<option value="${escapeHtml(value)}"${value === selectedValue ? ' selected' : ''}>${escapeHtml(optionLabel)}</option>`)
    .join('');

  return `
    <div class="field" data-field="${name}">
      <div class="field-head">
        <label for="${name}">${escapeHtml(label)} <span class="required">*</span></label>
      </div>
      <div class="control">
        <select id="${name}" name="${name}" aria-describedby="error-${name}">${choices}</select>
      </div>
      ${renderFieldError(name)}
    </div>`;
}

function renderPasswordField({ name, label, autocomplete }) {
  return `
    <div class="field" data-field="${name}">
      <div class="field-head">
        <label for="${name}">${escapeHtml(label)} <span class="required">*</span></label>
      </div>
      <div class="control">
        <input id="${name}" name="${name}" type="password" autocomplete="${autocomplete}"
               placeholder="••••••••••••" aria-describedby="error-${name}">
        <button class="control-icon reveal" type="button"
                data-reveals="${name}" aria-label="Show password" aria-pressed="false">
          ${ICONS.eye}
        </button>
      </div>
      ${renderFieldError(name)}
    </div>`;
}

/* ---------------- Trang đăng ký ---------------- */

function renderRegisterPage(content) {
  const { fields, strength, terms } = content;

  const accountTypeOptions = content.accountTypes
    .map(({ id, label, icon }, index) => `
      <label class="type-option${index === 0 ? ' is-selected' : ''}">
        <input type="radio" name="accountType" value="${id}"${index === 0 ? ' checked' : ''}>
        ${ICONS[icon]}<span>${escapeHtml(label)}</span>
      </label>`)
    .join('');

  const strengthBars = [0, 1, 2]
    .map((index) => `<span class="strength-bar" data-index="${index}"></span>`)
    .join('');

  return `
  <main class="auth">
    <div class="auth-inner">
      <span class="auth-badge"><span class="brand-mark">PW</span>${escapeHtml(content.badge)}</span>
      <h1>${escapeHtml(content.heading)}</h1>
      <p class="auth-lead">${escapeHtml(content.lead)}</p>

      <form class="auth-card" id="register-form" novalidate>
        <fieldset class="type-picker">
          <legend class="field-label-sm">${escapeHtml(content.accountTypeLabel)}</legend>
          <div class="type-options">${accountTypeOptions}</div>
        </fieldset>

        <div data-company-only>
          ${renderTextField({ name: 'legalName', ...fields.company.legalName, autocomplete: 'organization', quickFill: 'nova' })}
          ${renderTextField({ name: 'representative', ...fields.company.representative, autocomplete: 'name' })}
        </div>

        <div data-individual-only hidden>
          ${renderTextField({ name: 'individualName', ...fields.individual.fullName, autocomplete: 'name', quickFill: 'emily' })}
        </div>

        ${renderTextField({
          name: 'email',
          label: fields.company.email.label,
          placeholder: fields.company.email.placeholder,
          icon: fields.email.icon,
          type: 'email',
          autocomplete: 'email',
        })}

        <div class="field-row" id="identity-row">
          <div data-company-only>
            ${renderSelectField({
              name: 'headcount',
              label: fields.headcount.label,
              selectedValue: '51-200',
              options: HEADCOUNT_BRACKETS.map(({ id, label }) => ({ value: id, label })),
            })}
          </div>
          ${renderSelectField({
            name: 'country',
            label: fields.company.country.label,
            selectedValue: 'United States',
            options: COUNTRIES.map((name) => ({ value: name, label: name })),
          })}
        </div>

        <div class="class-banner" data-company-only>
          <span class="class-banner-text">
            ${ICONS.grid}
            <span>${escapeHtml(content.classBanner.prefix)}
              <b id="class-value"></b>
              ${escapeHtml(content.classBanner.suffix)}</span>
          </span>
          <span class="tier-pill" id="class-tier"></span>
        </div>

        <div class="field-row">
          ${renderPasswordField({ name: 'password', label: fields.password.label, autocomplete: 'new-password' })}
          ${renderPasswordField({ name: 'confirmPassword', label: fields.confirm.label, autocomplete: 'new-password' })}
        </div>

        <!-- Yêu cầu mật khẩu và thanh đo trải hết chiều ngang, nằm dưới cả hai ô.
             Khác bản thiết kế Figma (hint nằm trong cột phải) — đổi theo yêu cầu
             vì ở cột phải nó bị vỡ hai dòng và tranh chỗ đọc với thanh đo. -->
        <div class="password-meter">
          <p class="field-hint">${escapeHtml(fields.confirm.hint)}</p>
          <div class="strength-head">
            <span class="field-label-sm">${escapeHtml(strength.label)}</span>
            <span id="strength-label">${escapeHtml(strength.levels[0])}</span>
          </div>
          <div class="strength-bars">${strengthBars}</div>
        </div>

        <div class="field" data-field="terms">
          <label class="checkbox">
            <input type="checkbox" name="terms" aria-describedby="error-terms">
            <span>${escapeHtml(terms.before)}<a href="#/register">${escapeHtml(terms.termsLink)}</a>${escapeHtml(terms.between)}<a href="#/register">${escapeHtml(terms.privacyLink)}</a>${escapeHtml(terms.after)}</span>
          </label>
          ${renderFieldError('terms')}
        </div>

        <p class="kyc-note">${ICONS.info}${escapeHtml(content.kycNotice)}</p>

        <button class="btn-create" type="submit">${escapeHtml(content.submitLabel)}</button>

        <p class="reassurance">${ICONS.shield}${escapeHtml(content.reassurance)}</p>
      </form>

      <p class="auth-foot">
        ${escapeHtml(content.loginPrompt)}
        <a class="link-button" href="#/login">${escapeHtml(content.loginLabel)}</a>
      </p>
    </div>
  </main>`;
}

/* ---------------- Gắn hành vi cho form ---------------- */

function readRegistrationValues(form) {
  const accountType = form.elements.accountType.value;
  const isCompany = accountType === 'company';
  const nameFieldName = isCompany ? 'legalName' : 'individualName';
  return {
    accountType,
    nameFieldName,
    legalName: form.elements[nameFieldName].value,
    representative: form.elements.representative.value,
    email: form.elements.email.value,
    headcountBracketId: isCompany ? form.elements.headcount.value : null,
    country: form.elements.country.value,
    password: form.elements.password.value,
    confirmPassword: form.elements.confirmPassword.value,
    hasAgreedToTerms: form.elements.terms.checked,
  };
}

function isVisible(element) {
  return element.offsetParent !== null;
}

function showFieldErrors(form, errors) {
  form.querySelectorAll('[data-field]').forEach((wrapper) => {
    const fieldName = wrapper.dataset.field;
    const message = isVisible(wrapper) ? errors[fieldName] : undefined;
    const output = wrapper.querySelector('.field-error');
    const input = wrapper.querySelector('input, select');

    output.textContent = message ?? '';
    output.hidden = !message;
    wrapper.classList.toggle('has-error', Boolean(message));
    if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
  });
}

function updateClassBanner(form) {
  const classIndex = resolveClassIndex({
    accountType: 'company',
    headcountBracketId: form.elements.headcount.value,
  });
  form.querySelector('#class-value').textContent = `class ${classIndex}`;
  form.querySelector('#class-tier').textContent = resolveClassTierLabel(classIndex);
}

function updateStrengthMeter(form) {
  const password = form.elements.password.value;
  const score = measurePasswordStrength(password);
  // Đã gõ nhưng chưa đạt quy tắc nào vẫn là "Weak", không phải "Awaiting input".
  const levelIndex = password ? Math.max(1, score) : 0;
  form.querySelector('#strength-label').textContent = REGISTER.strength.levels[levelIndex];
  form.querySelectorAll('.strength-bar').forEach((bar) => {
    bar.dataset.filled = Number(bar.dataset.index) < score ? 'true' : 'false';
  });
}

function setFieldLabel(form, fieldName, label) {
  form.querySelector(`[data-field="${fieldName}"] label`).firstChild.textContent = `${label} `;
}

function applyAccountType(form) {
  const accountType = form.elements.accountType.value;
  const isCompany = accountType === 'company';
  const variant = REGISTER.fields[isCompany ? 'company' : 'individual'];

  form.querySelectorAll('[data-company-only]').forEach((block) => { block.hidden = !isCompany; });
  form.querySelectorAll('[data-individual-only]').forEach((block) => { block.hidden = isCompany; });
  form.querySelectorAll('.type-option').forEach((option) => {
    option.classList.toggle('is-selected', option.querySelector('input').checked);
  });

  // Cá nhân: Country chiếm trọn hàng vì không còn ô headcount bên cạnh
  form.querySelector('#identity-row').classList.toggle('is-single', !isCompany);

  setFieldLabel(form, 'email', variant.email.label);
  form.elements.email.placeholder = variant.email.placeholder;
  setFieldLabel(form, 'country', variant.country.label);

  if (isCompany) updateClassBanner(form);
}

function togglePasswordReveal(button, form) {
  const input = form.elements[button.dataset.reveals];
  const willReveal = input.type === 'password';
  input.type = willReveal ? 'text' : 'password';
  button.setAttribute('aria-pressed', String(willReveal));
  button.setAttribute('aria-label', willReveal ? 'Hide password' : 'Show password');
  button.innerHTML = willReveal ? ICONS.eyeOff : ICONS.eye;
}

/** Cờ DEV quickFillRegister: điền cả form bằng dữ liệu thử của Nova (Company) hoặc Emily (Individual); không tự tick điều khoản. */
function quickFillRegistration(form, who) {
  const data = DEV_TEST_REGISTRATION[who];
  if (!data) return;
  const isCompany = who === 'nova';
  const typeRadio = form.querySelector(`input[name="accountType"][value="${isCompany ? 'company' : 'individual'}"]`);
  if (typeRadio && !typeRadio.checked) {
    typeRadio.checked = true;
    typeRadio.dispatchEvent(new Event('change', { bubbles: true }));
  }
  form.elements[isCompany ? 'legalName' : 'individualName'].value = data.name;
  if (isCompany) {
    form.elements.representative.value = data.representative;
    form.elements.headcount.value = data.headcount;
    form.elements.headcount.dispatchEvent(new Event('change', { bubbles: true }));
  }
  form.elements.email.value = data.email;
  form.elements.country.value = data.country;
  form.elements.password.value = DEV_TEST_PASSWORD;
  form.elements.confirmPassword.value = DEV_TEST_PASSWORD;
  updateStrengthMeter(form);
}

function bindRegisterForm() {
  const form = document.getElementById('register-form');
  if (!form) return;

  applyAccountType(form);
  updateStrengthMeter(form);

  form.addEventListener('change', (event) => {
    if (event.target.name === 'accountType') applyAccountType(form);
    if (event.target.name === 'headcount') updateClassBanner(form);
  });

  form.elements.password.addEventListener('input', () => updateStrengthMeter(form));

  form.addEventListener('click', (event) => {
    const revealButton = event.target.closest('.reveal');
    if (revealButton) togglePasswordReveal(revealButton, form);
    const quick = event.target.closest('[data-quick-fill]');
    if (quick) quickFillRegistration(form, quick.dataset.quickFill);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const values = readRegistrationValues(form);
    const errors = validateRegistration(values);

    // Một email chỉ đăng ký được một lần — trừ khi đang bật cờ dựng màn KYC
    if (!errors.email && (values.email.trim().toLowerCase() === DEMO_MEMBER_ACCOUNT.email.toLowerCase()
      || (!DEV_FLAGS.allowRepeatRegistration && AccountStore.hasEmail(values.email)))) {
      errors.email = REGISTER.errors.emailTaken;
    }
    showFieldErrors(form, errors);

    // Chặn theo kết quả kiểm tra, không dựa vào class trên DOM:
    // lỗi ở trường đang ẩn cũng phải chặn, dù không hiển thị được.
    if (Object.keys(errors).length > 0) {
      form.querySelectorAll('.has-error input, .has-error select').forEach((field, index) => {
        if (index === 0 && isVisible(field)) field.focus();
      });
      return;
    }

    try {
      await AccountStore.save({
        accountType: values.accountType,
        legalName: values.legalName,
        representative: values.representative,
        email: values.email,
        country: values.country,
        headcountBracketId: values.headcountBracketId,
        classIndex: resolveClassIndex(values),
        password: values.password,
      });
    } catch (error) {
      showFieldErrors(form, { password: REGISTER.errors.storageUnavailable });
      return;
    } finally {
      // Xoá mật khẩu khỏi DOM dù lưu thành công hay thất bại
      form.elements.password.value = '';
      form.elements.confirmPassword.value = '';
    }

    // Vừa tạo tài khoản xong thì coi như đã đăng nhập, để từ màn KYC đi tiếp vào Dashboard được.
    AccountStore.signIn('member', values.email.trim().toLowerCase());
    activateMember(values.email.trim());
    navigateTo('#/kyc');
  });
}

/* ============================================================
   MÀN ĐĂNG NHẬP
   ------------------------------------------------------------
   BẢO MẬT: giống màn đăng ký — mật khẩu chỉ nằm trong bộ nhớ của
   form, không lưu, không log, không gửi đi đâu. "Remember me"
   cũng không ghi gì xuống máy vì prototype chưa có phiên đăng nhập.
   ============================================================ */

function renderLoginPage(content) {
  return `
  <main class="auth login">
    <div class="login-card">
      <div class="login-head">
        <span class="auth-badge"><span class="brand-mark">PW</span>${escapeHtml(content.badge)}</span>
        <h1>${escapeHtml(content.heading)}</h1>
        <p class="auth-lead">${escapeHtml(content.lead)}</p>
      </div>

      <form id="login-form" novalidate>
        <div class="field" data-field="loginEmail">
          <div class="field-head">
            <label for="loginEmail">${escapeHtml(content.email.label)}</label>
          </div>
          <div class="control has-lead-icon">
            <span class="control-icon lead">${ICONS.mail}</span>
            <input id="loginEmail" name="loginEmail" type="email" autocomplete="email"
                   placeholder="${escapeHtml(content.email.placeholder)}"
                   aria-describedby="error-loginEmail" autofocus>
          </div>
          ${renderFieldError('loginEmail')}
        </div>

        <div class="field" data-field="loginPassword">
          <div class="field-head">
            <label for="loginPassword">${escapeHtml(content.password.label)}</label>
            <button class="text-link" type="button">${escapeHtml(content.password.forgotLabel)}</button>
          </div>
          <div class="control has-lead-icon">
            ${DEV_FLAGS.quickFillPassword
              ? `<button class="control-icon lead" type="button" id="quick-fill-password"
                         aria-label="Fill the test password" title="Fill the test password">${ICONS.key}</button>`
              : `<span class="control-icon lead">${ICONS.key}</span>`}
            <input id="loginPassword" name="loginPassword" type="password" autocomplete="current-password"
                   placeholder="••••••••••••" aria-describedby="error-loginPassword">
            <button class="control-icon reveal" type="button"
                    data-reveals="loginPassword" aria-label="Show password" aria-pressed="false">
              ${ICONS.eye}
            </button>
          </div>
          ${renderFieldError('loginPassword')}
        </div>

        <label class="checkbox remember">
          <input type="checkbox" name="remember">
          <span>${escapeHtml(content.rememberLabel)}</span>
        </label>

        <!-- Chỗ trống dành sẵn cho banner lỗi để nút không bị nhảy vị trí -->
        <div class="login-alert-slot">
          <p class="login-alert" id="login-alert" role="alert" hidden>
            ${ICONS.alert}<span id="login-alert-text"></span>
          </p>
        </div>

        <button class="btn-login" type="submit">${escapeHtml(content.submitLabel)}</button>
      </form>

      <div class="login-divider"><span>${escapeHtml(content.dividerLabel)}</span></div>

      <button class="btn-passkey" type="button">${ICONS.passkey}${escapeHtml(content.passkeyLabel)}</button>

      <p class="login-signup">
        ${escapeHtml(content.signupPrompt)}
        <a href="#/register">${escapeHtml(content.signupLabel)}</a>
      </p>
    </div>

    <p class="login-footnote">${ICONS.padlock}${escapeHtml(content.footerNote)}</p>
  </main>`;
}

/**
 * Kiểm tra form đăng nhập. Chỉ kiểm tra định dạng — prototype không có
 * máy chủ nên không có nguồn nào để đối chiếu thông tin đăng nhập.
 */
function validateLogin({ email, password }) {
  const { errors: messages } = LOGIN;
  const errors = {};

  if (!email.trim()) errors.loginEmail = messages.emailRequired;
  else if (!EMAIL_PATTERN.test(email.trim())) errors.loginEmail = messages.emailInvalid;

  if (!password) errors.loginPassword = messages.passwordRequired;

  return errors;
}

function showLoginAlert(form, message) {
  const alert = document.getElementById('login-alert');
  document.getElementById('login-alert-text').textContent = message ?? '';
  alert.hidden = !message;
  form.querySelectorAll('[data-field]').forEach((wrapper) => {
    wrapper.classList.toggle('has-error', Boolean(message));
  });
}

function bindLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  const rememberedEmail = AccountStore.rememberedEmail();
  if (rememberedEmail) {
    form.elements.loginEmail.value = rememberedEmail;
    form.elements.remember.checked = true;
  }

  form.addEventListener('click', (event) => {
    const revealButton = event.target.closest('.reveal');
    if (revealButton) togglePasswordReveal(revealButton, form);
    // Cờ DEV: bấm chìa khoá thì điền sẵn mật khẩu thử.
    if (event.target.closest('#quick-fill-password')) {
      form.elements.loginPassword.value = DEV_TEST_PASSWORD;
      form.elements.loginPassword.focus();
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const values = {
      email: form.elements.loginEmail.value,
      password: form.elements.loginPassword.value,
    };
    const errors = validateLogin(values);

    showFieldErrors(form, errors);
    if (Object.keys(errors).length > 0) {
      showLoginAlert(form, null);
      form.querySelector('.has-error input')?.focus();
      return;
    }

    const account = await AccountStore.verify(values.email, values.password);
    form.elements.loginPassword.value = '';

    if (!account) {
      showLoginAlert(form, LOGIN.errors.credentials);
      return;
    }

    // Chỉ ghi nhớ email khi người dùng chủ động tick — không bao giờ ghi nhớ mật khẩu
    AccountStore.setRememberedEmail(form.elements.remember.checked ? account.email : '');

    showLoginAlert(form, null);
    AccountStore.signIn(account.role, account.memberId);
    activateMember(account.role === 'admin' ? null : account.email);
    // Dữ liệu admin đã tạo (award, điểm, thu hồi, quyết định KYC) được giữ; chỉ đặt lại ô nhập của các màn admin.
    if (account.role === 'admin') {
      pendingGrant = null;
      pendingRevoke = null;
      revokeQuery = ''; revokeNftId = null; revokeNotice = null;
      pointsQuery = ''; pointsMember = null; pointsNotice = null;
    }
    // Admin vào thẳng cổng quản trị, thành viên vào dashboard.
    // Thành viên có kết quả KYC chưa xem thì vào thẳng màn đó trước.
    // Bị từ chối thì vào Dashboard trước (có thông báo và nút nộp lại), không đẩy về form.
    const unseenKycResult = account.role !== 'admin' && account.kycStatus === 'approved' && !account.kycResultSeen;
    const unseenGift = account.role !== 'admin' && Boolean(readUnseenGift());
    navigateTo(account.role === 'admin' ? '#/admin' : (unseenKycResult ? '#/kyc' : (unseenGift ? '#/gift' : '#/dashboard')));
  });
}

/* ============================================================
   MÀN XÁC MINH DANH TÍNH (KYC)
   ------------------------------------------------------------
   BẢO MẬT: tệp người dùng chọn KHÔNG được đọc nội dung, không
   tải lên đâu cả. Chỉ lấy tên, kích thước và kiểu MIME từ đối
   tượng File để hiển thị — prototype này không có máy chủ.
   ============================================================ */

/** Danh sách tệp đang hiển thị. Chỉ chứa metadata, không chứa nội dung tệp. */
let uploadedDocuments = [];

function formatFileSize(bytes) {
  const megabytes = bytes / (1024 * 1024);
  if (megabytes >= 1) return `${megabytes.toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function validateDocumentFile(file) {
  const { acceptedTypes, acceptedExtensions, maxBytes } = KYC.upload;
  const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  if (!acceptedTypes.includes(file.type) && !acceptedExtensions.includes(extension)) {
    return KYC.errors.fileWrongType;
  }
  if (file.size > maxBytes) return KYC.errors.fileTooLarge;
  return null;
}

function renderDocumentRow({ name, sizeLabel, note }, index) {
  const meta = [sizeLabel, note].filter(Boolean).join(' · ');
  return `
    <li class="doc-row">
      <span class="doc-icon">${ICONS.file}</span>
      <span class="doc-body">
        <span class="doc-name">
          ${escapeHtml(name)}
          <span class="doc-pill">${ICONS.check}${escapeHtml(KYC.upload.uploadedLabel)}</span>
        </span>
        <span class="doc-meta">${escapeHtml(meta)}</span>
      </span>
      <button class="doc-remove" type="button" data-remove="${index}"
              aria-label="${escapeHtml(KYC.upload.removeLabel)}: ${escapeHtml(name)}">
        ${ICONS.trash}
      </button>
    </li>`;
}

/** Mã tham chiếu hồ sơ KYC, dẫn xuất cố định từ email — cùng tài khoản luôn ra cùng mã. */
function kycReferenceNumber(account) {
  let hash = 7;
  for (const ch of account.email ?? '') hash = (hash * 31 + ch.charCodeAt(0)) % 90000;
  return `#KYC-${String(hash + 10000)}-PW`;
}

function renderKycReview(content, account) {
  const r = content.review;
  return `
  <main class="auth kyc kyc-review-page">
    <div class="kyc-inner">
      <header class="kyc-head">
        <span class="kyc-eyebrow"><i class="dot"></i>${escapeHtml(content.eyebrow)}</span>
        <h1>${escapeHtml(content.heading)}</h1>
      </header>

      <section class="kyc-card kyc-review">
        <div class="kr-ring" role="img" aria-label="${escapeHtml(r.heading)}">
          <svg viewBox="0 0 84 84" aria-hidden="true"><circle cx="42" cy="42" r="40" pathLength="100"/></svg>
          <span class="kr-ring-body">${ICONS.hourglass}</span>
        </div>
        <h2>${escapeHtml(r.heading)}</h2>
        <p class="kr-body">${escapeHtml(r.body)}</p>
        <dl class="kr-facts">
          <div><dt>${escapeHtml(r.referenceLabel)}</dt><dd class="kr-ref">${escapeHtml(kycReferenceNumber(account))}</dd></div>
          <div><dt>${escapeHtml(r.entityLabel)}</dt><dd>${escapeHtml(account.legalName ?? '')}</dd></div>
          <div><dt>${escapeHtml(r.estimateLabel)}</dt><dd class="kr-est">${escapeHtml(r.estimateValue)}</dd></div>
        </dl>
        <a class="btn-verify kr-go" href="#/dashboard">${escapeHtml(r.dashboardLabel)}${ICONS.arrowRight}</a>
        <p class="kr-help">
          ${escapeHtml(content.helpPrompt)}
          <button class="text-link" type="button">${escapeHtml(content.helpLabel)}</button>
        </p>
      </section>
    </div>
  </main>`;
}

function formatKycDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function renderKycApproved(content, account) {
  const r = content.approved;
  const decidedAt = account.kycDecidedAt ?? new Date().toISOString();
  const isToday = new Date(decidedAt).toDateString() === new Date().toDateString();
  const reference = kycReferenceNumber(account);
  return `
  <main class="auth kyc kyc-review-page kyc-approved-page">
    <div class="kyc-inner">
      <header class="kyc-head">
        <span class="kyc-eyebrow"><i class="dot"></i>${escapeHtml(content.eyebrow)}</span>
        <h1>${escapeHtml(content.heading)}</h1>
      </header>

      <section class="kyc-card kyc-review kyc-approved">
        <span class="ka-status">${ICONS.checkBadge}${escapeHtml(r.statusLabel)}</span>
        <span class="ka-seal" aria-hidden="true"><i>${ICONS.checkMark}</i></span>
        <h2>${escapeHtml(r.heading)}</h2>
        <p class="kr-body">${escapeHtml(r.body)}</p>

        <div class="ka-class">
          <span class="ka-class-mark" aria-hidden="true">${ICONS.medal}</span>
          <span class="ka-class-body">
            <b>${escapeHtml(r.classPrefix)} ${escapeHtml(r.classWord)} ${account.classIndex ?? 0}</b>
            <span>${escapeHtml(r.classNote)}</span>
          </span>
          <span class="ka-class-badge">${escapeHtml(r.classBadge)}</span>
        </div>

        <dl class="ka-facts">
          <div><dt>${escapeHtml(r.verifiedOnLabel)}</dt><dd>${isToday ? escapeHtml(r.todayPrefix) : ''}${escapeHtml(formatKycDate(decidedAt))}</dd></div>
          <div><dt>${escapeHtml(r.referenceLabel)}</dt>
            <dd class="ka-ref">${escapeHtml(reference)}
              <button class="ka-copy" type="button" id="ka-copy" data-ref="${escapeHtml(reference)}"
                      aria-label="${escapeHtml(r.copyLabel)}">${ICONS.copy}</button></dd></div>
          <div><dt>${escapeHtml(r.entityLabel)}</dt><dd>${escapeHtml(account.legalName ?? '')}</dd></div>
        </dl>

        <div class="ka-actions">
          <a class="ka-dashboard" href="#/dashboard">${escapeHtml(r.dashboardLabel)}</a>
          <a class="btn-verify ka-purchase" href="#/acquisition">${escapeHtml(r.purchaseLabel)}${ICONS.arrowRight}</a>
        </div>

        <p class="ka-custody">${ICONS.padlock}${escapeHtml(r.custodyNote)}</p>
      </section>

      <p class="kyc-help">
        ${escapeHtml(r.helpPrompt)}
        <button class="text-link" type="button">${escapeHtml(r.helpLabel)}</button>
      </p>
    </div>
  </main>`;
}

function renderKycPage(content) {
  const account = AccountStore.read();
  // Đã gửi hồ sơ thì chỉ còn màn chờ duyệt / đã duyệt — không cho nộp lại.
  if (account?.kycStatus === 'approved') return renderKycApproved(content, account);
  if (account?.kycSubmittedAt) return renderKycReview(content, account);
  const { upload } = content;
  const isIndividual = AccountStore.read()?.accountType === 'individual';
  const documentTypes = content.documentType.options[isIndividual ? 'individual' : 'company'];

  return `
  <main class="auth kyc">
    <div class="kyc-inner">
      <header class="kyc-head">
        <span class="kyc-eyebrow"><i class="dot"></i>${escapeHtml(content.eyebrow)}</span>
        <h1>${escapeHtml(content.heading)}</h1>
      </header>

      <form class="kyc-card" id="kyc-form" novalidate>
        ${renderTextField({
          name: 'kycLegalName',
          label: content.legalName.label,
          placeholder: content.legalName.placeholder,
          icon: 'building',
          autocomplete: 'organization',
        })}

        <div class="field-row">
          ${renderSelectField({
            name: 'kycDocumentType',
            label: content.documentType.label,
            selectedValue: documentTypes[0],
            options: documentTypes.map((o) => ({ value: o, label: o })),
          })}
          ${renderTextField({
            name: 'kycDocumentId',
            label: content.documentId.label,
            placeholder: isIndividual ? content.documentId.placeholderIndividual : content.documentId.placeholder,
            icon: 'fingerprint',
            autocomplete: 'off',
          })}
        </div>

        <div class="field" data-field="kycDocuments">
          <div class="field-head"><label for="kyc-file-input">${escapeHtml(upload.label)}</label></div>
          <div class="dropzone" id="dropzone">
            <span class="dropzone-icon">${ICONS.uploadCloud}</span>
            <p class="dropzone-title">
              ${escapeHtml(upload.dropPrefix)}<button class="dropzone-browse" type="button" id="browse-files">${escapeHtml(upload.browseLabel)}</button>
            </p>
            <p class="dropzone-hint">${escapeHtml(upload.hint)}</p>
            <input id="kyc-file-input" class="visually-hidden" type="file" multiple
                   accept="${escapeHtml(upload.acceptedExtensions.join(','))}">
          </div>
          ${renderFieldError('kycDocuments')}
        </div>

        <ul class="doc-list" id="doc-list"></ul>

        <p class="kyc-note">${ICONS.padlock}${escapeHtml(content.securityNote)}</p>

        <div class="kyc-actions">
          <button class="kyc-draft" type="button">${escapeHtml(content.saveDraftLabel)}</button>
          <button class="btn-verify" type="submit">${escapeHtml(account?.kycStatus === 'rejected' ? content.resubmitLabel : content.submitLabel)}</button>
        </div>
      </form>


      <p class="kyc-help">
        ${escapeHtml(content.helpPrompt)}
        <button class="text-link" type="button">${escapeHtml(content.helpLabel)}</button>
      </p>
    </div>
  </main>`;
}

function refreshDocumentList() {
  const list = document.getElementById('doc-list');
  if (!list) return;
  list.innerHTML = uploadedDocuments.map(renderDocumentRow).join('');
}

function addDocumentFiles(form, fileList) {
  const rejected = [];
  [...fileList].forEach((file) => {
    const problem = validateDocumentFile(file);
    if (problem) { rejected.push(problem); return; }
    // Chỉ giữ metadata — nội dung tệp không bao giờ được đọc.
    uploadedDocuments.push({ name: file.name, sizeLabel: formatFileSize(file.size) });
  });
  refreshDocumentList();
  showFieldErrors(form, rejected.length ? { kycDocuments: rejected[0] } : {});
}

function bindKycForm() {
  // Kết quả duyệt (đã duyệt hoặc bị từ chối) hiện ra lần đầu thì ghi nhận đã xem.
  const status = AccountStore.read()?.kycStatus;
  if (status === 'approved' || status === 'rejected') AccountStore.markKycResultSeen();

  document.getElementById('ka-copy')?.addEventListener('click', (event) => {
    navigator.clipboard?.writeText(event.currentTarget.dataset.ref).catch(() => {});
  });

  const form = document.getElementById('kyc-form');
  if (!form) return;

  // Người dùng vừa đăng ký xong nên màn này bắt đầu trống:
  // chưa có tệp nào, số hiệu giấy tờ để họ tự nhập.
  uploadedDocuments = [];
  refreshDocumentList();

  // Quay lại form sau khi bấm "Save Draft & Exit" thì nạp lại bản nháp.
  const draft = AccountStore.read()?.kycDraft;
  if (draft) {
    if (draft.documentType) form.elements.kycDocumentType.value = draft.documentType;
    form.elements.kycDocumentId.value = draft.documentId ?? '';
    uploadedDocuments = (draft.documents ?? []).map((doc) => ({ ...doc }));
    refreshDocumentList();
  }

  // Lưu nháp rồi về Member Dashboard (huy hiệu KYC ghi "Not yet KYC").
  form.querySelector('.kyc-draft')?.addEventListener('click', () => {
    AccountStore.saveKycDraft({
      documentType: form.elements.kycDocumentType.value,
      documentId: form.elements.kycDocumentId.value.trim(),
      documents: uploadedDocuments.map(({ name, sizeLabel }) => ({ name, sizeLabel })),
    });
    navigateTo('#/dashboard');
  });

  // Tên pháp nhân lấy từ tài khoản vừa đăng ký, không bắt nhập lại.
  // Vào thẳng #/kyc mà chưa có tài khoản thì để trống.
  form.elements.kycLegalName.value = AccountStore.read()?.legalName ?? '';

  const fileInput = document.getElementById('kyc-file-input');
  const dropzone = document.getElementById('dropzone');

  document.getElementById('browse-files').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    addDocumentFiles(form, fileInput.files);
    fileInput.value = '';
  });

  ['dragenter', 'dragover'].forEach((type) =>
    dropzone.addEventListener(type, (event) => {
      event.preventDefault();
      dropzone.classList.add('is-dragging');
    }));
  ['dragleave', 'drop'].forEach((type) =>
    dropzone.addEventListener(type, (event) => {
      event.preventDefault();
      dropzone.classList.remove('is-dragging');
    }));
  dropzone.addEventListener('drop', (event) => addDocumentFiles(form, event.dataTransfer.files));

  document.getElementById('doc-list').addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-remove]');
    if (!removeButton) return;
    uploadedDocuments.splice(Number(removeButton.dataset.remove), 1);
    refreshDocumentList();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const errors = {};
    if (!form.elements.kycLegalName.value.trim()) errors.kycLegalName = KYC.errors.legalNameRequired;
    if (!form.elements.kycDocumentId.value.trim()) errors.kycDocumentId = KYC.errors.documentIdRequired;
    if (uploadedDocuments.length === 0) errors.kycDocuments = KYC.errors.documentsRequired;

    showFieldErrors(form, errors);
    if (Object.keys(errors).length > 0) {
      form.querySelector('.has-error input, .has-error select')?.focus();
      return;
    }
    AccountStore.markKycSubmitted({
      documentType: form.elements.kycDocumentType.value,
      documentId: form.elements.kycDocumentId.value.trim(),
      documents: uploadedDocuments.map(({ name, sizeLabel }) => ({ name, sizeLabel })),
    });
    renderCurrentRoute();
    window.scrollTo(0, 0);
  });
}

/* ============================================================
   MÀN MEMBER DASHBOARD
   ------------------------------------------------------------
   Màn đầu tiên sau khi đăng nhập thành công, dựng theo
   design/PW Registry — Member Dashboard.png.

   NGUỒN DỮ LIỆU: readMemberProfile() là chỗ duy nhất quyết định
   màn hình hiển thị gì. Hiện nó ghép hai nguồn:

     - Danh tính (tên, class) lấy THẬT từ tài khoản đã đăng ký.
     - Danh mục (điểm, hạng, ví, danh hiệu, hoạt động) lấy từ
       DASHBOARD.demoProfile — dữ liệu mẫu chép từ bản thiết kế.

   Prototype chưa có màn mua danh hiệu hay liên kết ví nên không có
   nguồn thật cho phần danh mục. Khi có, chỉ sửa readMemberProfile();
   các hàm render* bên dưới không phải đụng tới.

   Mọi khối đều có nhánh rỗng, nên khi thay bằng tài khoản chưa có
   gì thì màn hình vẫn đúng chứ không vỡ.
   ============================================================ */

/**
 * Số tiền kiểu "CHF 3,500.00" — mã tiền đứng TRƯỚC số, nối bằng dấu cách
 * không ngắt nên không bao giờ vỡ dòng giữa mã tiền và con số.
 *
 * Đây là chỗ DUY NHẤT quyết định cách viết tiền của toàn ứng dụng.
 * Các file thiết kế viết không thống nhất; bản code chọn một cách.
 */
function formatMoney(amountLabel) {
  return `${escapeHtml(ACQUISITION.currency)}\u00a0${escapeHtml(amountLabel)}`;
}

/* Tông màu hợp lệ của pill. Giá trị lạ trong data.js rơi về 'grey'
   thay vì sinh ra class không có kiểu. */
const PILL_TONES = ['grey', 'blue', 'green', 'amber', 'purple', 'red'];

/** Chọn dạng số ít / số nhiều. Chỉ phục vụ tiếng Anh, đủ cho nội dung hiện tại. */
function pluralize(count, { one, other }) {
  return count === 1 ? one : other;
}

/** "2 awards" / "1 award" — dạng số ít/số nhiều của Public Directory và màn hồ sơ. */
function countLabel(count, suffix) {
  return `${count} ${count === 1 ? suffix.one : suffix.many}`;
}

/**
 * Pill trạng thái dùng chung cho huy hiệu KYC, ví, danh hiệu và hoạt động.
 * `icon` là khoá trong ICONS; riêng giá trị 'dot' dựng chấm tròn bằng CSS.
 */
function renderPill(pill) {
  // Sai khoá trong data.js thì bỏ qua pill đó, không làm vỡ cả trang.
  if (!pill) return '';
  const { label, tone, icon } = pill;
  const toneClass = PILL_TONES.includes(tone) ? tone : 'grey';
  const glyph = icon === 'dot' ? '<i class="dot"></i>' : (ICONS[icon] ?? '');
  return `<span class="pill pill-${toneClass}">${glyph}${escapeHtml(label)}</span>`;
}

/**
 * Trạng thái KYC của tài khoản đang đăng nhập, theo kết quả thật của admin
 * (`account.kycStatus`). Chưa nộp hồ sơ thì là 'required'.
 * `DASHBOARD.demoKycState` không còn được dùng.
 */
function resolveKycState(account) {
  // Trạng thái theo kết quả thật của admin; chưa nộp hồ sơ thì là 'required'.
  if (account.kycStatus === 'review') return 'review';
  if (account.kycStatus === 'approved') return 'verified';
  if (account.kycStatus === 'rejected') return 'rejected';
  return 'required';
}

/** Chỉ tài khoản đã được admin duyệt KYC mới mua được danh hiệu. */
function isKycApproved() {
  return AccountStore.read()?.kycStatus === 'approved';
}

/* ============================================================
   NHIỀU THÀNH VIÊN CÙNG LÚC (Apex dựng sẵn + tài khoản đăng ký, ví dụ Nova)
   ------------------------------------------------------------
   Trạng thái do chính thành viên tạo ra trong phiên (mua danh hiệu, liên kết ví,
   chuyển danh hiệu, gỡ ví) được giữ RIÊNG cho từng thành viên: đổi người đăng nhập
   thì cất của người cũ, nạp của người mới. Trạng thái do admin tạo (award, điểm,
   thu hồi) đã gắn `entityId` nên không cần tách.
   Admin cần dựng hồ sơ của từng thành viên thì dùng withMemberContext().
   ============================================================ */

const memberStates = new Map();
let activeMemberEmail = null;

function captureMemberState() {
  return { issuedTitles, issuedAt, completedTransfers, linkedWallets, unlinkedWallets };
}

function restoreMemberState(state) {
  issuedTitles = state?.issuedTitles ?? [];
  issuedAt = state?.issuedAt ?? null;
  completedTransfers = state?.completedTransfers ?? [];
  linkedWallets = state?.linkedWallets ?? [];
  unlinkedWallets = state?.unlinkedWallets ?? [];
}

/** Đổi người đang đăng nhập (null = admin hoặc chưa ai): cất trạng thái người cũ, nạp người mới. */
function activateMember(email) {
  if (activeMemberEmail === email) return;
  if (activeMemberEmail !== null) memberStates.set(activeMemberEmail, captureMemberState());
  restoreMemberState(email ? memberStates.get(email) : null);
  activeMemberEmail = email;
  // Dở dang bước mua của người trước thì bỏ.
  settlementAt = null;
  recipientModeId = RECIPIENT.defaultModeId;
  selectedRecipientId = RECIPIENT.defaultRecipientId;
  giftMessageText = '';
  recipientQuery = '';
}

/** Chạy `fn` như thể `account` đang đăng nhập — để admin đọc hồ sơ của từng thành viên. */
function withMemberContext(account, fn) {
  const saved = captureMemberState();
  const previousContext = AccountStore.contextAccount;
  const previousEmail = activeMemberEmail;
  const contextEmail = account.email;
  // Trong lúc dựng hồ sơ của `account`, người đang đăng nhập tạm thời là một thành viên "đã cất": trạng thái của họ (ví dụ quà họ đã tặng)
  // vẫn phải nhìn thấy được qua allIssuedTitles(), nên đưa vào memberStates và coi `account` là người đang dùng.
  const cachedPrevious = previousEmail !== null && previousEmail !== contextEmail && !memberStates.has(previousEmail);
  if (previousEmail !== null && previousEmail !== contextEmail) memberStates.set(previousEmail, saved);
  restoreMemberState(contextEmail === previousEmail ? saved : memberStates.get(contextEmail));
  activeMemberEmail = contextEmail;
  AccountStore.contextAccount = account;
  try {
    return fn();
  } finally {
    AccountStore.contextAccount = previousContext;
    activeMemberEmail = previousEmail;
    restoreMemberState(saved);
    if (cachedPrevious) memberStates.delete(previousEmail);
  }
}

/* ============================================================
   LƯU TRẠNG THÁI DEMO QUA LẦN TẢI LẠI
   ------------------------------------------------------------
   Mọi thay đổi trong phiên (mua danh hiệu, ví, chuyển, gỡ ví, award, điểm, thu hồi, quyết định KYC của admin…)
   được ghi vào localStorage['pw_demo_state'] sau mỗi lần dựng màn và khi rời trang, rồi nạp lại khi mở trang.
   Chỉ nút Reset ở landing page mới xoá. Phiên đăng nhập vẫn là sessionStorage (đóng tab thì phải đăng nhập lại).
   KHÔNG lưu số thẻ đầy đủ: chỉ có những gì nằm trong các biến dưới đây (thẻ đã lưu có khoá riêng, chỉ 4 số cuối).
   ============================================================ */

const STATE_KEY = 'pw_demo_state';
let isResettingDemo = false;
/* Quà tặng đã xem ở màn thông báo: `<email>|<mã Title>` */
let seenGiftNotices = [];
/* Thông báo chuông đã đọc: `<email>|<mã thông báo>` */
let seenNotifications = [];

function dateReplacer(key, value) {
  const raw = this[key];
  return raw instanceof Date ? { __date: raw.toISOString() } : value;
}

function dateReviver(key, value) {
  return value && typeof value === 'object' && typeof value.__date === 'string' ? new Date(value.__date) : value;
}

function persistState() {
  if (isResettingDemo) return;
  try {
    const members = new Map(memberStates);
    if (activeMemberEmail !== null) members.set(activeMemberEmail, captureMemberState());
    localStorage.setItem(STATE_KEY, JSON.stringify({
      members: [...members],
      grantedAwards, pointAdjustments, pointDrafts, revokedNfts, kycDecisions, handledReviewIds, seenGiftNotices, seenNotifications,
    }, dateReplacer));
  } catch (error) {
    // Trình duyệt chặn lưu trữ: demo vẫn chạy, chỉ là tải lại thì mất.
  }
}

function loadPersistedState() {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(STATE_KEY) ?? 'null', dateReviver);
  } catch (error) {
    return;
  }
  if (!saved) return;
  memberStates.clear();
  (saved.members ?? []).forEach(([email, state]) => memberStates.set(email, state));
  grantedAwards = saved.grantedAwards ?? [];
  pointAdjustments = saved.pointAdjustments ?? [];
  pointDrafts = saved.pointDrafts ?? [];
  revokedNfts = saved.revokedNfts ?? [];
  kycDecisions = saved.kycDecisions ?? [];
  handledReviewIds = saved.handledReviewIds ?? [];
  seenGiftNotices = saved.seenGiftNotices ?? [];
  seenNotifications = saved.seenNotifications ?? [];
  // Người đang đăng nhập nhận lại trạng thái của mình; trạng thái của họ không nằm trong memberStates khi đang dùng.
  restoreMemberState(activeMemberEmail ? memberStates.get(activeMemberEmail) : null);
  if (activeMemberEmail) memberStates.delete(activeMemberEmail);
}

/** Mọi lần chuyển NFT của mọi thành viên (đang đăng nhập + đã cất), kèm tên người chuyển — cho Audit Logs. */
function allCompletedTransfers() {
  const nameOfEmail = (email) => AccountStore.members().find((member) => member.email?.toLowerCase() === email?.toLowerCase())?.legalName ?? '';
  return [
    ...completedTransfers.map((entry) => ({ ...entry, holderEmail: activeMemberEmail, holderName: nameOfEmail(activeMemberEmail) })),
    ...[...memberStates]
      .filter(([email]) => email !== activeMemberEmail)
      .flatMap(([email, state]) => (state.completedTransfers ?? []).map((entry) => ({ ...entry, holderEmail: email, holderName: nameOfEmail(email) }))),
  ];
}

/** Mọi danh hiệu đã phát hành bởi mọi thành viên (đang đăng nhập + đã cất). */
function allIssuedTitles() {
  // Lần mua cũ lưu trước khi có `buyerName` thì lấy tên người mua từ tài khoản sở hữu bản ghi.
  const withBuyer = (email, list) => list.map((issued) => (issued.buyerName
    ? issued
    : { ...issued, buyerName: AccountStore.members().find((member) => member.email?.toLowerCase() === email?.toLowerCase())?.legalName ?? '' }));
  return [...withBuyer(activeMemberEmail, issuedTitles), ...[...memberStates]
    .filter(([email]) => email !== activeMemberEmail)
    .flatMap(([email, state]) => withBuyer(email, state.issuedTitles ?? []))];
}

/** Mã hồ sơ công khai của một thành viên: Apex dùng mã mẫu có sẵn, người khác mã sinh từ email. */
function entityIdOf(account) {
  if (isDemoProfileOwner(account)) return ADMIN.grant.registeredRecipient.entityId;
  let hash = 11;
  for (const ch of account.email ?? '') hash = (hash * 31 + ch.charCodeAt(0)) % 9000;
  return `PW-${account.accountType === 'individual' ? 'IND' : 'ORG'}-${String(hash + 1000)}`;
}

/** Tài khoản có tên trùng chủ hồ sơ mẫu (Apex) thì nhận hồ sơ mẫu. */
function isDemoProfileOwner(account) {
  return account.legalName?.trim().toLowerCase() === DASHBOARD.demoProfileOwner.toLowerCase();
}

/**
 * Gom dữ liệu hiển thị của thành viên đang đăng nhập.
 * Trả về null nếu chưa có tài khoản nào — router sẽ đẩy về #/login.
 */
/**
 * Hồ sơ Dashboard của thành viên đang đăng nhập. Hạng LẤY TỪ SỔ ĐĂNG KÝ (cùng con số ở Directory):
 * xếp theo số NFT, nhiều hơn thì hạng cao hơn. Chưa có NFT nào thì chưa có hạng.
 */
function readMemberProfile() {
  const profile = readMemberProfileRaw();
  const account = AccountStore.read();
  if (!profile || !account) return profile;
  const entry = readRegistryEntities().find((entity) => entity.id === entityIdOf(account));
  const hasNfts = profile.titles.some((title) => !title.revoked);
  return { ...profile, rank: hasNfts && entry ? entry.rank : null };
}

/** Hồ sơ Dashboard chưa có hạng — sổ đăng ký dựng từ bản này để không tự gọi lại chính nó. */
function readMemberProfileRaw() {
  const account = AccountStore.read();
  if (!account) return null;

  // Chỉ tài khoản Apex có sẵn hồ sơ mẫu; tài khoản khác bắt đầu trống.
  const base = isDemoProfileOwner(account)
    ? DASHBOARD.demoProfile
    : { ...DASHBOARD.demoProfile, ...DASHBOARD.emptyProfile, pointsNote: undefined };
  const profile = {
    ...base,
    name: account.legalName,
    classIndex: account.classIndex ?? 0,
    kycState: resolveKycState(account),
  };

  const withTitles = withReceivedGifts(issuedTitles.length ? withIssuedTitles(profile) : profile);
  // Ví liên kết phải có trước khi áp dụng chuyển danh hiệu để NFT chuyển vào ví mới được đếm.
  return withUnlinkedWallets(withTransfers(withLinkedWallets(withRevocations(withPointAdjustments(withGrantedAwards(withTitles))))));
}

/**
 * Hạng sau khi có thêm `gained` NFT được tính. Chưa có hạng thì NFT đầu tiên đưa vào
 * cuối bảng sổ đăng ký (sau mọi pháp nhân và Apex), các NFT sau mới đẩy hạng lên. Hạng nhỏ hơn là tốt hơn.
 */
function rankAfterGain(rank, gained, gainPerNft) {
  if (gained === 0) return rank;
  if (rank === null) return Math.max(1, DIRECTORY.entities.length + 2 - (gained - 1) * gainPerNft);
  return Math.max(1, rank - gained * gainPerNft);
}

/**
 * Award mà admin trao cho tài khoản này (Grant Award) hiện thêm ở Dashboard:
 * một thẻ trong My Titles, một dòng Recent activity, và +1 NFT ở ví giữ hộ.
 * Mỗi award đẩy hạng lên `rankGainPerAward` bậc và được tính vào ranking.
 */
function withGrantedAwards(profile) {
  const entry = ADMIN.grant.dashboardEntry;
  const mine = grantedAwards.filter((award) => award.entityId === entityIdOf(AccountStore.read()));
  if (!mine.length) return profile;

  const titles = mine.map((award) => ({
    id: award.ref,
    name: award.name,
    kind: 'award',
    pills: entry.pills,
    detail: entry.detail,
    secondaryAction: entry.secondaryAction,
  }));

  const activity = mine.map((award) => ({
    id: `award-granted-${award.ref}`,
    title: entry.activityTitle,
    state: entry.activityState,
    detail: [
      { text: `${award.name} (` },
      { text: award.ref, tone: 'blue' },
      { text: entry.activityMiddle },
      { text: entry.walletLabel, tone: 'strong' },
    ],
    timestamp: formatIssuedTime(award.grantedAt),
  }));

  return {
    ...profile,
    titles: [...titles, ...profile.titles],
    activity: [...activity, ...profile.activity],
    rank: rankAfterGain(profile.rank, mine.length, ADMIN.grant.rankGainPerAward),
    // Chưa có ví thì hệ thống tự tạo ví giữ hộ để nhận award, giống lần mua đầu.
    wallets: withCustodialWallet(profile.wallets, entry.walletId, mine.length)
      .map((wallet) => (wallet.id === entry.walletId
        ? { ...wallet, nftCount: wallet.nftCount + mine.length }
        : wallet)),
  };
}

/**
 * Ghép các danh hiệu đã phát hành trong phiên vào hồ sơ.
 *
 * Bốn thứ đổi theo, tất cả đều suy ra chứ không đóng cứng:
 *   - "My Titles"        thêm một thẻ cho mỗi danh hiệu
 *   - "Recent activity"  thêm một dòng cho mỗi lần phát hành
 *   - Ví giữ hộ          cộng số NFT
 *   - Thứ hạng           lên `rankGainPerTitle` bậc mỗi danh hiệu
 *   - Số điểm            trừ điểm đã dùng, cộng điểm thưởng
 *
 * Ba ô số liệu ("Titles owned", số Distinction/Award, "x of N NFTs")
 * vốn đã tính từ `profile.titles` nên tự đúng theo.
 *
 * Trạng thái này sống trong phiên xem trang — tải lại là mất, hồ sơ
 * quay về đúng dữ liệu mẫu ban đầu để thử lại luồng mua.
 */
function withIssuedTitles(profile) {
  const card = OUTCOME.issuedTitle;
  const entry = OUTCOME.issuedActivity;
  const gift = OUTCOME.giftedActivity;

  // Chỉ danh hiệu mua cho chính mình mới vào hồ sơ, ví và hạng; tặng thì chỉ ghi hoạt động và điểm.
  const owned = issuedTitles.filter((issued) => !issued.isGift);
  const gained = owned.length;

  const titles = owned.map((issued) => ({
    ...card,
    id: issued.titleId,
    name: issued.name,
    detail: `${card.detailPrefix} ${formatIssuedDate(issued.issuedAt)} ${card.detailSuffix}`,
  }));

  const activity = issuedTitles.map((issued) => ({
    id: `title-issued-${issued.titleId}`,
    title: issued.isGift ? gift.title : entry.title,
    state: issued.isGift ? gift.state : entry.state,
    detail: [
      { text: `${issued.name} (` },
      { text: issued.titleId, tone: 'blue' },
      { text: issued.isGift ? gift.middle : entry.middle },
      { text: issued.isGift ? issued.recipientName : entry.walletLabel, tone: 'strong' },
      // Điểm thưởng của người mua (10% số tiền thực trả) hiện ngay trong dòng hoạt động.
      { text: ` · +${issued.rewardPoints.toLocaleString('en-US')} PTS earned`, tone: 'green' },
    ],
    timestamp: formatIssuedTime(issued.issuedAt),
  }));

  // Số dư chạy theo đúng thứ tự của một đơn: trừ điểm đã dùng để
  // giảm tiền, rồi cộng điểm thưởng tính trên số tiền thực trả.
  const pointsSpent = issuedTitles.reduce((sum, issued) => sum + issued.usedPoints, 0);
  const pointsEarned = issuedTitles.reduce((sum, issued) => sum + issued.rewardPoints, 0);

  return {
    ...profile,
    points: profile.points - pointsSpent + pointsEarned,
    titles: [...titles, ...profile.titles],
    activity: [...activity, ...profile.activity],
    // Hạng nhỏ hơn là tốt hơn, và không thể vượt quá hạng nhất.
    rank: rankAfterGain(profile.rank, gained, card.rankGainPerTitle),
    wallets: withCustodialWallet(profile.wallets, card.walletId, gained)
      .map((wallet) => (wallet.id === card.walletId
        ? { ...wallet, nftCount: wallet.nftCount + gained }
        : wallet)),
  };
}

/**
 * Danh hiệu người khác mua tặng tài khoản này: hiện như một danh hiệu của mình (ví giữ hộ, được tính hạng, chuyển được một lần)
 * kèm ghi chú người tặng, thêm dòng Recent activity và điểm thưởng 10% cho người nhận.
 */
function withReceivedGifts(profile) {
  const account = AccountStore.read();
  if (!account) return profile;
  const entityId = entityIdOf(account);
  const received = allIssuedTitles().filter((issued) => issued.isGift && issued.recipientEntityId === entityId);
  if (!received.length) return profile;

  const card = OUTCOME.issuedTitle;
  const entry = OUTCOME.receivedActivity;
  const titles = received.map((issued) => ({
    ...card,
    id: issued.titleId,
    name: issued.name,
    mintedAt: new Date(issued.issuedAt).toISOString(),
    detail: `${card.detailPrefix} ${formatIssuedDate(issued.issuedAt)} ${card.detailSuffix}`,
    note: `Gifted by ${issued.buyerName || 'a PW member'}`,
  }));
  const activity = received.map((issued) => ({
    id: `title-received-${issued.titleId}`,
    title: entry.title,
    state: entry.state,
    detail: [
      { text: `${issued.name} (` },
      { text: issued.titleId, tone: 'blue' },
      { text: entry.middle },
      { text: issued.buyerName || 'a PW member', tone: 'strong' },
      { text: ` · +${(issued.recipientPoints ?? 0).toLocaleString('en-US')} PTS earned`, tone: 'green' },
    ],
    timestamp: formatIssuedTime(issued.issuedAt),
  }));
  const points = received.reduce((sum, issued) => sum + (issued.recipientPoints ?? 0), 0);

  return {
    ...profile,
    points: profile.points + points,
    titles: [...titles, ...profile.titles],
    activity: [...activity, ...profile.activity],
    wallets: withCustodialWallet(profile.wallets, card.walletId, received.length)
      .map((wallet) => (wallet.id === card.walletId ? { ...wallet, nftCount: wallet.nftCount + received.length } : wallet)),
  };
}

/**
 * Lần đầu mua danh hiệu cho mình thì hệ thống tự tạo ví giữ hộ (custodial) —
 * cùng dạng với ví của hồ sơ mẫu. Đã có ví đó rồi hoặc chưa mua gì thì giữ nguyên.
 */
function withCustodialWallet(wallets, custodialId, gained) {
  if (gained === 0 || wallets.some((wallet) => wallet.id === custodialId)) return wallets;
  const template = DASHBOARD.demoProfile.wallets.find((wallet) => wallet.id === custodialId);
  return template ? [{ ...template, nftCount: 0 }, ...wallets] : wallets;
}

/**
 * Chụp lại danh hiệu vừa phát hành. Gọi đúng một lần cho mỗi lần mua,
 * ngay tại thời điểm phát hành xong.
 */
function recordIssuedTitle() {
  // Lấy hồ sơ ĐANG CÓ, không lấy dữ liệu mẫu gốc: lần mua thứ hai phải
  // tính trên số điểm còn lại sau lần mua thứ nhất.
  const profile = readMemberProfile();
  if (!profile) return;

  const order = calculateOrder(profile);
  const serial = OUTCOME.issuedTitle.serialBase + issuedTitles.length;

  issuedAt = new Date();
  issuedTitles = [
    {
      titleId: `#PW-2026-${order.title.code}-${serial}`,
      name: order.title.name,
      // Mua để tặng: danh hiệu thuộc người nhận, không vào hồ sơ của người mua.
      isGift: recipientModeId === 'gift',
      // Thưởng chia 10% / 10% / 10%: người mua (rewardPoints), người nhận (cùng mức) và hệ thống (không hiển thị).
      recipientPoints: recipientModeId === 'gift' ? order.rewardPoints : 0,
      recipientEntityId: recipientModeId === 'gift' ? (findRecipient(selectedRecipientId)?.entityId ?? null) : null,
      // Người tặng — hiện ở ghi chú "Gifted by …" trên hồ sơ công khai của người nhận.
      buyerName: AccountStore.read()?.legalName ?? '',
      buyerRepresentative: AccountStore.read()?.representative ?? '',
      giftMessage: recipientModeId === 'gift' ? giftMessageText.trim() : '',
      recipientName: recipientModeId === 'gift' ? (findRecipient(selectedRecipientId)?.shortName ?? findRecipient(selectedRecipientId)?.name ?? '—') : null,
      total: order.total,
      discount: order.discount,
      usedPoints: order.usedPoints,
      rewardPoints: order.rewardPoints,
      issuedAt,
    },
    ...issuedTitles,
  ];

  // Đơn đã xong: đơn sau bắt đầu lại từ trống (điểm, điều khoản, người nhận, lời nhắn).
  pointsToUse = 0;
  hasAgreedToTerms = false;
  recipientModeId = RECIPIENT.defaultModeId;
  selectedRecipientId = RECIPIENT.defaultRecipientId;
  recipientQuery = '';
  giftMessageText = '';
}

/* `nav` để màn admin thay danh sách mục — thiết kế vai admin chỉ vẽ
   Public Directory và Admin Portal. Bỏ trống thì dùng nav của DASHBOARD. */
function renderDashboardSidebar(content, profile, currentRoute, nav) {
  const navItems = (nav ?? content.nav)
    .map(({ label, icon, route }) => {
      const isCurrent = route === currentRoute;
      return `
        <li>
          <button class="side-item${isCurrent ? ' is-current' : ''}" type="button"
                  data-route="${route ?? ''}"${isCurrent ? ' aria-current="page"' : ''}>
            ${ICONS[icon]}<span>${escapeHtml(label)}</span>
          </button>
        </li>`;
    })
    .join('');

  const walletLabel = profile.wallets[0]?.addressLabel ?? content.account.walletFallback;

  return `
  <aside class="side">
    <div class="side-brand">
      <span class="side-mark">${escapeHtml(content.brand.name)}</span>
      <span>
        <span class="side-name">${escapeHtml(content.brand.name)}</span>
        <span class="side-tagline">${escapeHtml(content.brand.tagline)}</span>
      </span>
    </div>

    <p class="side-status">
      <span>${escapeHtml(content.networkStatus.label)}</span>
      <span class="side-status-value"><i class="dot"></i>${escapeHtml(content.networkStatus.value)}</span>
    </p>

    <nav class="side-nav" aria-label="Dashboard">
      <ul>${navItems}</ul>
    </nav>

    <div class="side-account">
      <span class="side-avatar">${ICONS.person}</span>
      <span class="side-account-body">
        <span class="side-account-name">${escapeHtml(profile.name)}</span>
        <span class="side-account-wallet">${escapeHtml(walletLabel)}</span>
      </span>
    </div>
  </aside>`;
}

/* `label` là chữ ở mép trái thanh trên — chỉ màn admin dùng. */
/** Ảnh đại diện + menu tài khoản (tên, ví, Log out) — dùng ở thanh trên chung và thanh trên của hồ sơ pháp nhân. */
function renderAccountMenu(content, profile, walletLabel = profile?.wallets?.[0]?.addressLabel ?? content.account.walletFallback) {
  return `
      <div class="dash-account">
        <button class="dash-avatar" type="button" id="account-menu-btn" aria-haspopup="menu" aria-expanded="false"
                aria-label="${escapeHtml(content.accountMenuLabel)}">${ICONS.person}</button>
        <div class="dash-menu" id="account-menu" role="menu" hidden>
          <div class="dash-menu-who">
            <span class="side-avatar">${ICONS.person}</span>
            <span><b>${escapeHtml(profile?.name ?? '')}</b><small>${escapeHtml(walletLabel)}</small></span>
          </div>
          <button class="dash-menu-item" type="button" role="menuitem" id="log-out">${ICONS.logOut}${escapeHtml(content.account.logOutLabel)}</button>
        </div>
      </div>`;
}

/**
 * Thông báo của thành viên đang đăng nhập, dựng từ sổ: quà nhận được, award, cộng/trừ điểm, thu hồi.
 * Không lưu riêng — mỗi mục có mã ổn định để đánh dấu đã đọc.
 */
function readNotifications() {
  const account = AccountStore.read();
  if (!account || account.role === 'admin') return [];
  const text = DASHBOARD.notifications;
  const entityId = entityIdOf(account);
  const fill = (template, values) => Object.entries(values).reduce((out, [key, value]) => out.replace(`{${key}}`, value), template);
  const list = [];

  allIssuedTitles()
    .filter((issued) => issued.isGift && issued.recipientEntityId === entityId)
    .forEach((issued) => list.push({
      id: `gift|${issued.titleId}`, at: new Date(issued.issuedAt), tone: 'green', ...text.gift,
      body: fill(text.gift.body, { giver: issued.buyerName || 'A PW member', name: issued.name, id: issued.titleId }),
    }));

  grantedAwards.filter((award) => award.entityId === entityId).forEach((award) => list.push({
    id: `award|${award.ref}`, at: new Date(award.grantedAt), tone: 'green', ...text.award,
    body: fill(text.award.body, { name: award.name, id: award.ref }),
  }));

  pointAdjustments.filter((entry) => entry.entityId === entityId).forEach((entry) => {
    const kind = entry.delta < 0 ? text.pointsRemoved : text.pointsAdded;
    list.push({
      id: `points|${new Date(entry.at).getTime()}`, at: new Date(entry.at), tone: entry.delta < 0 ? 'red' : 'green', ...kind,
      body: fill(kind.body, {
        amount: formatPoints(Math.abs(entry.delta)),
        reason: (ADMIN.points.reasons.find(({ id }) => id === entry.reason)?.label ?? '').toLowerCase(),
      }),
    });
  });

  revokedNfts.filter((item) => item.entityId === entityId).forEach((item) => list.push({
    id: `revoke|${item.nftId}`, at: new Date(item.at), tone: 'red', ...text.revoked,
    body: fill(text.revoked.body, {
      name: item.name, id: item.nftId,
      reason: (ADMIN.revoke.reasons.find(({ id }) => id === item.reason)?.label ?? '').toLowerCase(),
    }),
  }));

  return list.sort((a, b) => b.at - a.at);
}

function isNotificationSeen(item) {
  return seenNotifications.includes(`${AccountStore.read()?.email?.toLowerCase()}|${item.id}`);
}

function renderNotifications(content) {
  const text = content.notifications;
  const items = readNotifications();
  const hasUnread = items.some((item) => !isNotificationSeen(item));
  const rows = items.map((item) => `
        <li class="notify-item tone-${item.tone}${isNotificationSeen(item) ? '' : ' is-new'}">
          <p class="notify-title">${escapeHtml(item.title)}${isNotificationSeen(item) ? '' : `<span class="notify-new">${escapeHtml(text.newLabel)}</span>`}</p>
          <p class="notify-body">${escapeHtml(item.body)}</p>
          <p class="notify-time">${escapeHtml(formatIssuedTime(item.at))}</p>
        </li>`).join('');
  return `
      <div class="dash-notify">
        <button class="dash-icon-btn" type="button" id="notify-btn" aria-haspopup="true" aria-expanded="false"
                aria-label="${escapeHtml(content.notificationsLabel)}${hasUnread ? ' (new)' : ''}">${ICONS.bell}${hasUnread ? '<i class="notify-dot" aria-hidden="true"></i>' : ''}</button>
        <div class="dash-menu notify-panel" id="notify-panel" hidden>
          <p class="notify-head">${escapeHtml(text.heading)}</p>
          ${items.length ? `<ul class="notify-list">${rows}</ul>` : `<p class="notify-empty">${escapeHtml(text.empty)}</p>`}
        </div>
      </div>`;
}

function renderDashboardTopbar(content, label, profile) {
  const walletLabel = profile?.wallets?.[0]?.addressLabel ?? content.account.walletFallback;
  return `
  <header class="dash-top">
    <div class="dash-top-inner">
      ${label ? `<span class="dash-top-label">${escapeHtml(label)}</span>` : ''}
      ${renderNotifications(content)}
      ${renderAccountMenu(content, profile, walletLabel)}
    </div>
  </header>`;
}

function describeYear2Dashboard(profile) {
  const rule = PAYMENT.points.discount;
  const year2 = readYear2Eligibility(profile);
  if (year2.eligible) return rule.dashboardEligible;
  return year2.timeOk ? rule.pointsNote.replace('{min}', rule.minPoints.toLocaleString('en-US')).replace('{points}', profile.points.toLocaleString('en-US')) : rule.dashboardWait.replace('{date}', year2.date);
}

function renderDashboardStats(content, profile) {
  const { points, ranking, titles } = content.stats;
  const hasRank = profile.rank !== null;
  const activeTitles = profile.titles.filter((title) => !title.revoked);
  const distinctionCount = activeTitles.filter((title) => title.kind === 'distinction').length;
  const awardCount = activeTitles.filter((title) => title.kind === 'award').length;

  return `
  <div class="stat-grid">
    <section class="card stat">
      <div class="stat-head">
        <h2 class="stat-label">${escapeHtml(points.label)}</h2>
        <button class="text-link" type="button" data-points-history>${escapeHtml(points.historyLabel)}</button>
      </div>
      <p class="stat-value">${escapeHtml(profile.points.toLocaleString('en-US'))}<span>${escapeHtml(points.unit)}</span></p>
      <p class="stat-note">${escapeHtml(profile.pointsNote ? describeYear2Dashboard(profile) : points.note)}</p>
    </section>

    <section class="card stat">
      <div class="stat-head">
        <h2 class="stat-label">${escapeHtml(ranking.label)}</h2>
        <span class="stat-info" title="${escapeHtml(ranking.infoLabel)}"
              aria-label="${escapeHtml(ranking.infoLabel)}">${ICONS.info}</span>
      </div>
      <p class="stat-value stat-value-text${hasRank ? '' : ' is-empty'}">
        ${hasRank ? `#${escapeHtml(profile.rank)} ${escapeHtml(ranking.rankSuffix)}` : escapeHtml(ranking.emptyValue)}
      </p>
      <p class="stat-note">${escapeHtml(ranking.note)}</p>
    </section>

    <section class="card stat">
      <div class="stat-head">
        <h2 class="stat-label">${escapeHtml(titles.label)}</h2>
        ${renderPill({ label: titles.badge, tone: 'blue' })}
      </div>
      <p class="stat-value">${activeTitles.length}</p>
      <p class="stat-note">
        <span class="accent-green">${distinctionCount} ${escapeHtml(pluralize(distinctionCount, titles.distinctionsLabel))}</span>
        · ${awardCount} ${escapeHtml(pluralize(awardCount, titles.awardsLabel))}
      </p>
    </section>
  </div>`;
}

function renderWalletRow(wallet, content) {
  const unlinkButton = wallet.canUnlink
    ? `<button class="btn-danger" type="button" data-unlink="${escapeHtml(wallet.id)}">${ICONS.linkOff}${escapeHtml(content.unlinkLabel)}</button>`
    : '';

  return `
    <li class="wallet-row">
      <span class="wallet-name">${escapeHtml(wallet.name)}</span>
      ${wallet.badge ? renderPill(wallet.badge) : ''}
      <span class="wallet-address">
        ${escapeHtml(wallet.addressLabel)}
        <button class="icon-button" type="button" data-copy="${escapeHtml(wallet.addressLabel)}"
                aria-label="${escapeHtml(content.copyLabel)}: ${escapeHtml(wallet.addressLabel)}">${ICONS.copy}</button>
      </span>
      <span class="wallet-meta">${escapeHtml(wallet.meta)}</span>
      <span class="wallet-count">${wallet.nftCount} ${escapeHtml(pluralize(wallet.nftCount, content.nftLabel))}</span>
      ${unlinkButton}
    </li>`;
}

function renderDashboardWallets(content, profile) {
  const { wallets } = content;

  const body = profile.wallets.length
    ? `<ul class="wallet-list">${profile.wallets.map((wallet) => renderWalletRow(wallet, wallets)).join('')}</ul>`
    : `
      <div class="empty">
        <span class="empty-icon">${ICONS.wallet}</span>
        <p class="empty-heading">${escapeHtml(wallets.empty.heading)}</p>
        <p class="empty-body">${escapeHtml(wallets.empty.body)}</p>
      </div>`;

  return `
  <section class="card panel">
    <div class="panel-head">
      <h2>${escapeHtml(wallets.heading)}</h2>
      <button class="btn-ghost" type="button" id="link-wallet">${ICONS.link}${escapeHtml(wallets.linkLabel)}</button>
    </div>
    ${body}
    <p class="panel-foot">${escapeHtml(wallets.footnote)}</p>
  </section>`;
}

/**
 * Thẻ danh hiệu. Hàng nút ở đáy có hai cách căn:
 * có nút chính thì dồn trái, không có thì dồn phải — đúng theo bản thiết kế.
 */
/**
 * Thẻ một danh hiệu người dùng đang sở hữu.
 * Tên class dùng tiền tố owned-title-* để không đụng .title-card của landing page.
 */
function renderOwnedTitle(title, kinds) {
  const kind = kinds[title.kind];
  const pills = title.pills.map(renderPill).join('');
  const note = title.note ? `<p class="owned-title-note">${escapeHtml(title.note)}</p>` : '';
  const primary = title.primaryAction
    ? `<button class="btn-primary-action" type="button" data-transfer="${escapeHtml(title.id)}">${ICONS.transfer}${escapeHtml(title.primaryAction)}</button>`
    : '';

  return `
    <article class="card owned-title">
      <div class="owned-title-head">
        <h3>${escapeHtml(title.name)}</h3>
        ${renderPill(kind)}
      </div>
      <p class="owned-title-id">${escapeHtml(title.id)}
        <button class="icon-button" type="button" data-copy="${escapeHtml(title.id)}"
                aria-label="${escapeHtml(OUTCOME.success.copyTitleIdLabel)}: ${escapeHtml(title.id)}">${ICONS.copy}</button>
      </p>
      <div class="owned-title-pills">${pills}</div>
      <p class="owned-title-detail">${escapeHtml(title.detail)}</p>
      <div class="owned-title-actions${title.primaryAction ? ' has-primary' : ''}">
        ${note}
        ${primary}
        <button class="btn-ghost" type="button">${escapeHtml(title.secondaryAction)}</button>
      </div>
    </article>`;
}

function renderDashboardTitles(content, profile) {
  const { titles } = content;

  const body = profile.titles.length
    ? `<div class="owned-title-grid">${profile.titles.map((title) => renderOwnedTitle(title, titles.kinds)).join('')}</div>`
    : `
      <div class="card panel">
        <div class="empty">
          <span class="empty-icon">${ICONS.medal}</span>
          <p class="empty-heading">${escapeHtml(titles.empty.heading)}</p>
          <p class="empty-body">${escapeHtml(titles.empty.body)}</p>
          <button class="btn-ghost" type="button" id="browse-titles">${escapeHtml(titles.empty.action)}</button>
        </div>
      </div>`;

  return `
  <section class="titles-block">
    <h2 class="section-heading">${escapeHtml(titles.heading)}</h2>
    ${body}
  </section>`;
}

/* Mô tả hoạt động cắt sẵn thành từng đoạn trong data.js để tô màu
   được mà vẫn escape từng đoạn, không phải nhét HTML vào dữ liệu. */
function renderActivityDetail(segments) {
  return segments
    .map(({ text, tone }) => (tone ? `<span class="ink-${tone}">${escapeHtml(text)}</span>` : escapeHtml(text)))
    .join('');
}

function renderActivityRow(entry) {
  return `
    <li class="activity-row">
      <span class="activity-body">
        <span class="activity-title">${escapeHtml(entry.title)}${renderPill(entry.state)}</span>
        <span class="activity-detail">${renderActivityDetail(entry.detail)}</span>
      </span>
      <time class="activity-time">${escapeHtml(entry.timestamp)}</time>
    </li>`;
}

function renderDashboardActivity(content, profile) {
  const { activity } = content;

  const body = profile.activity.length
    ? `<ul class="activity-list">${profile.activity.map(renderActivityRow).join('')}</ul>`
    : `
      <div class="empty">
        <span class="empty-icon">${ICONS.history}</span>
        <p class="empty-heading">${escapeHtml(activity.empty.heading)}</p>
        <p class="empty-body">${escapeHtml(activity.empty.body)}</p>
      </div>`;

  return `
  <section class="card panel">
    <div class="panel-head"><h2>${escapeHtml(activity.heading)}</h2></div>
    ${body}
  </section>`;
}

/**
 * Khung chung của khu vực đã đăng nhập: thanh bên + thanh trên.
 * Mọi màn sau khi đăng nhập đều dựng qua hàm này để chỉ có một nguồn
 * duy nhất cho phần khung.
 */
/* Bốn chỗ có thể thay qua `options`: `topbar` (màn hồ sơ pháp nhân thay hẳn
   thanh trên), `topbarLabel` (màn admin thêm chữ ở mép trái thanh trên),
   `modifier` (đổi nền vùng nội dung) và `nav` (màn admin đổi mục thanh bên).
   Bỏ trống thì năm màn thành viên chạy y như cũ. */
function renderDashboardShell(profile, currentRoute, bodyHtml, options = {}) {
  return `
  <div class="dash${options.modifier ? ` ${options.modifier}` : ''}">
    ${renderDashboardSidebar(DASHBOARD, profile, currentRoute, options.nav)}
    <main class="dash-main">
      ${options.topbar ?? renderDashboardTopbar(DASHBOARD, options.topbarLabel, profile)}
      <div class="dash-body">${bodyHtml}</div>
    </main>
  </div>`;
}

/**
 * Hồ sơ và mục thanh bên cho khung chung, khác nhau giữa hai vai.
 *
 * Public Directory và hồ sơ pháp nhân là sổ đăng ký công khai nên cả admin
 * lẫn thành viên đều xem được — nhưng admin không có tài khoản đã đăng ký,
 * `readMemberProfile()` trả null, nên phải lấy hồ sơ admin thay vào.
 */
function readShellContext() {
  if (AccountStore.isAdmin()) {
    return { profile: readAdminProfile(), options: { nav: ADMIN.nav } };
  }
  return { profile: readMemberProfile(), options: {} };
}

/** Hiện khi vào thẳng một tuyến cần đăng nhập — router sẽ đẩy về #/login ngay. */
function renderSignedOutGuard() {
  return `<main class="dash-guard"><p>${escapeHtml(DASHBOARD.signedOut)}</p></main>`;
}

/** Hồ sơ KYC bị admin từ chối: nêu lý do, lời nhắn của admin và nút nộp lại. */
function renderKycRejectedNotice(content) {
  const account = AccountStore.read();
  if (account?.kycStatus !== 'rejected') return '';
  const c = content.kycRejected;
  return `
        <div class="kyc-rejected dash-kyc-rejected">
          ${ICONS.alert}
          <span>
            <b>${escapeHtml(c.heading)}</b>
            ${escapeHtml(c.reasonPrefix)} ${escapeHtml(account.kycRejection?.reason ?? '')}
            ${account.kycRejection?.message ? `<em>${escapeHtml(account.kycRejection.message)}</em>` : ''}
          </span>
          <a class="btn-verify kyc-resubmit" href="#/kyc">${escapeHtml(c.resubmitLabel)}${ICONS.arrowRight}</a>
        </div>`;
}

function renderDashboardPage(content) {
  const profile = readMemberProfile();
  if (!profile) return renderSignedOutGuard();

  const kyc = content.kycStates[profile.kycState];

  const body = `
        <header class="dash-head">
          <h1>${escapeHtml(content.heading)}</h1>
          <p class="dash-sub">
            <span>${escapeHtml(profile.name)}</span>
            <span>${escapeHtml(content.classPrefix)} ${profile.classIndex}</span>
            <span>${renderPill(kyc)}${kyc.link ? `<a class="dash-kyc-link" href="#/kyc">${escapeHtml(kyc.link)}${ICONS.arrowRight}</a>` : ''}</span>
          </p>
        </header>

        ${renderKycRejectedNotice(content)}
        ${renderDashboardStats(content, profile)}
        ${renderDashboardWallets(content, profile)}
        ${renderDashboardTitles(content, profile)}
        ${renderDashboardActivity(content, profile)}
        ${renderLinkWalletModal()}
        ${renderUnlinkModal(profile)}`;

  return renderDashboardShell(profile, '#/dashboard', body);
}

function bindDashboardPage() {
  bindDashboardShell();
  document.getElementById('link-wallet')?.addEventListener('click', () => openLinkWallet());
  // "Browse Titles →" ở khối My Titles trống: sang tab Acquisition & Gifting.
  document.getElementById('browse-titles')?.addEventListener('click', () => navigateTo('#/acquisition'));
  bindLinkWalletModal();
  bindUnlinkWallet();

  // Nút "Transfer" trên thẻ danh hiệu mở màn chuyển danh hiệu.
  document.querySelectorAll('[data-transfer]').forEach((button) => {
    button.addEventListener('click', () => startTransfer(button.dataset.transfer));
  });
}

/** Hành vi của khung chung: đăng xuất và điều hướng thanh bên. */
function bindDashboardShell() {
  document.getElementById('log-out')?.addEventListener('click', () => {
    AccountStore.signOut();
    activateMember(null);
    navigateTo('#/login');
  });

  // Menu tài khoản ở góc trên: bấm ảnh đại diện để mở/đóng; bấm ra ngoài hoặc Esc để đóng.
  const menuButton = document.getElementById('account-menu-btn');
  const menu = document.getElementById('account-menu');
  if (menuButton && menu) {
    const setOpen = (open) => {
      menu.hidden = !open;
      menuButton.setAttribute('aria-expanded', String(open));
    };
    menuButton.addEventListener('click', (event) => { event.stopPropagation(); setOpen(menu.hidden); });
    menu.addEventListener('click', (event) => event.stopPropagation());
    document.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
  }

  // Chuông thông báo: mở hộp thì đánh dấu đã đọc (chấm đỏ tắt, dòng "New" giữ nguyên cho tới lần dựng lại).
  const notifyButton = document.getElementById('notify-btn');
  const notifyPanel = document.getElementById('notify-panel');
  if (notifyButton && notifyPanel) {
    const setNotifyOpen = (open) => {
      notifyPanel.hidden = !open;
      notifyButton.setAttribute('aria-expanded', String(open));
      if (!open) return;
      const email = AccountStore.read()?.email?.toLowerCase();
      const fresh = readNotifications().filter((item) => !isNotificationSeen(item)).map((item) => `${email}|${item.id}`);
      if (fresh.length) {
        seenNotifications = [...seenNotifications, ...fresh];
        notifyButton.querySelector('.notify-dot')?.remove();
        persistState();
      }
    };
    notifyButton.addEventListener('click', (event) => { event.stopPropagation(); setNotifyOpen(notifyPanel.hidden); });
    notifyPanel.addEventListener('click', (event) => event.stopPropagation());
    document.addEventListener('click', () => { notifyPanel.hidden = true; notifyButton.setAttribute('aria-expanded', 'false'); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { notifyPanel.hidden = true; notifyButton.setAttribute('aria-expanded', 'false'); } });
  }

  // Mục nav chưa có màn hình thì data-route rỗng — bấm vào không đi đâu cả.
  document.querySelectorAll('.side-item[data-route]').forEach((item) => {
    const { route } = item.dataset;
    if (route) item.addEventListener('click', () => navigateTo(route));
  });
}


/* ============================================================
   MÀN ACQUISITION & GIFTING — BƯỚC 1: CHỌN DANH HIỆU
   ------------------------------------------------------------
   Bản thiết kế chỉ có bước 1. Nút "Continue to Recipient" giữ
   nguyên hình thức nhưng chưa dẫn đi đâu vì các bước sau chưa
   được vẽ.

   Danh hiệu đang chọn chỉ sống trong phiên xem trang — không ghi
   vào localStorage, vì chưa có bước nào phía sau để dùng lại nó.
   ============================================================ */

let selectedTitleId = ACQUISITION.defaultSelectedId;

/**
 * Gắn giá theo Class của người đang đăng nhập (bảng `ACQUISITION.priceTable`).
 * Chưa có tài khoản (khách) thì tính Class 0. Trả về bản sao có `priceAmount`,
 * `amountLabel` (1,500) và `amountExact` (1,500.00).
 */
function withPrice(title) {
  const classIndex = AccountStore.read()?.classIndex ?? 0;
  const row = ACQUISITION.priceTable.find((item) => item.classIndex === classIndex) ?? ACQUISITION.priceTable[0];
  const amount = row[title.id];
  return {
    ...title,
    priceAmount: amount,
    amountLabel: amount.toLocaleString('en-US'),
    amountExact: formatAmount(amount),
  };
}

function findAcquisitionTitle(titleId) {
  const title = ACQUISITION.titles.find((item) => item.id === titleId);
  return title ? withPrice(title) : null;
}

function renderAcquisitionCard(title, isSelected, content) {
  const button = isSelected
    ? `<span class="acq-select is-selected">${ICONS.check}${escapeHtml(content.selectedLabel)}</span>`
    : `<button class="acq-select" type="button" data-select-title="${escapeHtml(title.id)}">${escapeHtml(content.selectLabel)}</button>`;

  return `
    <article class="acq-card${isSelected ? ' is-selected' : ''}"${isSelected ? ' aria-current="true"' : ''}>
      <h3>${escapeHtml(title.name)}</h3>
      <p class="acq-card-desc">${escapeHtml(title.description)}</p>
      <p class="acq-price">
        <span class="acq-price-label">${escapeHtml(content.priceLabel)}</span>
        <span class="acq-price-value">
          <span>${escapeHtml(content.currency)}</span>${escapeHtml(title.amountLabel)}
        </span>
      </p>
      ${button}
    </article>`;
}

function renderAcquisitionPage(content) {
  const profile = readMemberProfile();
  if (!profile) return renderSignedOutGuard();

  // Id lạ (ví dụ sửa nhầm data.js) thì rơi về danh hiệu đầu tiên thay vì vỡ trang.
  const selectedId = (findAcquisitionTitle(selectedTitleId) ?? content.titles[0]).id;

  const verified = isKycApproved();
  const gateKey = ['review', 'rejected'].includes(AccountStore.read()?.kycStatus) ? AccountStore.read().kycStatus : 'required';

  const cards = content.titles
    .map(withPrice)
    .map((title) => renderAcquisitionCard(title, title.id === selectedId, content))
    .join('');

  const body = `
        <header class="dash-head acq-head">
          <h1>${escapeHtml(content.heading)}</h1>
          <p class="acq-lead">${escapeHtml(content.lead)}</p>
        </header>

        <h2 class="section-heading acq-step">${escapeHtml(content.stepHeading)}</h2>
        <div class="acq-grid" id="acq-grid">${cards}</div>

        ${verified ? '' : `
        <p class="acq-gate">
          ${ICONS.alert}
          <span>${escapeHtml(content.kycGate[gateKey])}
            <a href="#/kyc">${escapeHtml(content.kycGate.kycLink)}</a></span>
        </p>`}

        <div class="acq-bar">
          <p class="acq-bar-note">${ICONS.padlock}${escapeHtml(content.footerNote)}</p>
          <button class="acq-continue" type="button" id="acq-continue"${verified ? '' : ' disabled'}>${escapeHtml(content.continueLabel)}</button>
        </div>`;

  return renderDashboardShell(profile, '#/acquisition', body);
}

function bindAcquisitionPage() {
  bindDashboardShell();

  document.getElementById('acq-grid')?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-select-title]');
    if (!button) return;
    selectedTitleId = button.dataset.selectTitle;
    renderCurrentRoute();
  });

  document.getElementById('acq-continue')?.addEventListener('click', () => {
    if (!isKycApproved()) return;
    // Vào màn người nhận từ bước chọn danh hiệu thì luôn bắt đầu ở "For Myself".
    recipientModeId = RECIPIENT.defaultModeId;
    navigateTo('#/recipient');
  });
}


/* ============================================================
   MÀN ACQUISITION & GIFTING — BƯỚC 2: CHỌN NGƯỜI NHẬN
   ------------------------------------------------------------
   Hai file thiết kế là cùng một màn, chỉ khác panel bên phải.
   Cả hai biến thể đều dựng; đổi RECIPIENT.summaryVariant trong
   data.js để xem bản kia.

   Bước 3 (thanh toán) chưa có thiết kế nên nút "Continue to
   Payment" giữ nguyên hình thức nhưng chưa dẫn đi đâu.

   Lựa chọn chỉ sống trong phiên xem trang, không ghi localStorage.
   ============================================================ */

let recipientModeId = RECIPIENT.defaultModeId;
let selectedRecipientId = RECIPIENT.defaultRecipientId;
let giftMessageText = '';
let recipientQuery = '';

/**
 * Người nhận quà tra được: hai bản ghi mẫu của thiết kế (Marcus, Elena) cùng các thành viên khác trong trình duyệt
 * (Apex và tài khoản đã đăng ký, trừ chính người đang mua). Thành viên chỉ nhận được khi KYC đã duyệt.
 */
function listRecipients() {
  const me = AccountStore.read();
  const members = AccountStore.members()
    .filter((account) => account.email?.toLowerCase() !== me?.email?.toLowerCase())
    .map((account) => {
      const approved = account.kycStatus === 'approved' || isDemoProfileOwner(account);
      const code = COUNTRY_CODES[account.country] ?? (account.country ?? '').slice(0, 2).toUpperCase();
      return {
        id: `member:${account.email.toLowerCase()}`,
        initials: entityInitials(account.legalName) || '?',
        name: account.legalName,
        shortName: account.legalName,
        entityId: entityIdOf(account),
        did: `DID:PW:${code}-${entityIdOf(account).slice(-4)}`,
        email: account.email,
        uid: `UID-${entityIdOf(account).replace(/\D/g, '')}`,
        isVerified: approved,
        blockedReason: approved ? undefined : "Hasn't completed KYC — can't receive a title yet",
      };
    });
  // Mọi pháp nhân đang có trong sổ đăng ký (318 pháp nhân của Directory), trừ hai bản ghi mẫu đã có ở trên. Đều là pháp nhân đã được công nhận.
  const known = new Set(RECIPIENT.recipients.map((person) => person.entityId));
  const typeLabel = (type) => (type === 'individual' ? 'Individual' : 'Company');
  const registry = DIRECTORY.entities
    .filter((entity) => !known.has(entity.id))
    .map((entity) => ({
      id: `entity:${entity.id}`,
      initials: entityInitials(entity.name) || '?',
      name: entity.name,
      shortName: entity.name,
      entityId: entity.id,
      did: `DID:PW:${(entity.location ?? '').split(',').pop().trim().toUpperCase() || 'XX'}-${entity.id.slice(-4)}`,
      meta: `${typeLabel(entity.type)} \u00b7 ${entity.id} \u00b7 ${entity.location ?? ''}`,
      isVerified: true,
    }));
  return [...members, ...RECIPIENT.recipients, ...registry];
}

/** Số kết quả tối đa hiện cùng lúc ở bước chọn người nhận. */
const RECIPIENT_RESULT_LIMIT = 8;

function findRecipient(recipientId) {
  return listRecipients().find((person) => person.id === recipientId) ?? null;
}

/**
 * Lọc danh bạ theo chuỗi tìm kiếm — khớp chuỗi con, không phân biệt hoa thường,
 * tìm trên tên, email và mã định danh.
 *
 * Trả về null khi chưa gõ gì: khác hẳn "gõ rồi nhưng không ra kết quả", nên
 * hai trường hợp hiển thị hai thông báo khác nhau.
 */
function searchRecipients(query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return null;
  return listRecipients().filter((person) =>
    [person.name, person.email, person.uid, person.entityId].some((field) => (field ?? '').toLowerCase().includes(needle)));
}

/** Danh hiệu đang chọn ở bước 1, dùng cho panel tóm tắt bên phải. */
function readSelectedTitle() {
  return findAcquisitionTitle(selectedTitleId) ?? withPrice(ACQUISITION.titles[0]);
}

function renderModeToggle(content) {
  const buttons = content.modes
    .map(({ id, label, icon }) => `
      <button class="rcp-mode${id === recipientModeId ? ' is-active' : ''}" type="button"
              data-mode="${escapeHtml(id)}"${id === recipientModeId ? ' aria-pressed="true"' : ' aria-pressed="false"'}>
        ${ICONS[icon] ?? ''}${escapeHtml(label)}
      </button>`)
    .join('');

  return `<div class="rcp-modes" role="group" aria-label="${escapeHtml(content.assignHeading)}">${buttons}</div>`;
}

function renderRecipientRow(person, content) {
  const isSelected = person.id === selectedRecipientId;
  const badge = person.isVerified
    ? `<span class="rcp-badge is-verified">${ICONS.checkBadge}${escapeHtml(content.verifiedLabel)}${ICONS.check}</span>`
    : `<span class="rcp-badge is-blocked">${escapeHtml(content.unverifiedLabel)}</span>`;

  const blocked = person.isVerified
    ? ''
    : `<p class="rcp-blocked">${ICONS.alert}${escapeHtml(person.blockedReason)}</p>`;

  // Chưa qua KYC thì không nhận được danh hiệu — khoá nút luôn, không chỉ làm mờ.
  return `
    <li>
      <button class="rcp-person${isSelected ? ' is-selected' : ''}" type="button"
              data-recipient="${escapeHtml(person.id)}"
              ${person.isVerified ? '' : 'disabled'}
              aria-pressed="${isSelected ? 'true' : 'false'}">
        <span class="rcp-avatar">${escapeHtml(person.initials)}</span>
        <span class="rcp-person-body">
          <span class="rcp-person-name">${escapeHtml(person.name)}</span>
          ${badge}
          <span class="rcp-person-meta">${escapeHtml(person.meta ?? `${person.email} · ${person.uid}`)}</span>
          ${blocked}
        </span>
        <span class="rcp-radio" aria-hidden="true"></span>
      </button>
    </li>`;
}

/** Nội dung khối danh bạ: lời nhắc, danh sách kết quả, hoặc báo không tìm thấy. */
function renderRecipientResults(content) {
  const matches = searchRecipients(recipientQuery);

  if (matches === null) {
    return `<li class="rcp-note">${escapeHtml(content.search.emptyPrompt)}</li>`;
  }
  if (matches.length === 0) {
    return `<li class="rcp-note">${escapeHtml(content.search.noResults)}</li>`;
  }
  // Đã chọn một người thì chỉ hiện người đó; gõ lại ô tìm kiếm để chọn người khác.
  const chosen = matches.find((person) => person.id === selectedRecipientId);
  if (chosen) return renderRecipientRow(chosen, content);
  // Sổ có hàng trăm pháp nhân: chỉ hiện các kết quả đầu, gõ thêm để thu hẹp.
  const shown = matches.slice(0, RECIPIENT_RESULT_LIMIT);
  const more = matches.length > shown.length
    ? `<li class="rcp-note">${escapeHtml(content.search.moreNote.replace('{shown}', shown.length).replace('{total}', matches.length))}</li>`
    : '';
  return shown.map((person) => renderRecipientRow(person, content)).join('') + more;
}

function renderRecipientPicker(content) {
  const rows = renderRecipientResults(content);
  const { giftMessage } = content;

  return `
    <div class="rcp-search">
      ${ICONS.search}
      <input id="rcp-search" type="search" autocomplete="off"
             value="${escapeHtml(recipientQuery)}"
             placeholder="${escapeHtml(content.search.placeholder)}"
             aria-label="${escapeHtml(content.search.hint)}">
    </div>
    <p class="rcp-hint">${escapeHtml(content.search.hint)}</p>

    <p class="rcp-directory-label">${escapeHtml(content.directoryLabel)}</p>
    <ul class="rcp-people" id="rcp-people">${rows}</ul>

    <div class="rcp-message-head">
      <label for="rcp-message">${escapeHtml(giftMessage.label)}</label>
      <span class="rcp-counter" id="rcp-counter">${giftMessageText.length} / ${giftMessage.maxLength}</span>
    </div>
    <textarea id="rcp-message" class="rcp-message" rows="3"
              maxlength="${giftMessage.maxLength}">${escapeHtml(giftMessageText)}</textarea>`;
}

function renderRegistrySummary(content, title, beneficiary) {
  const { registry } = content;
  const rows = [{ label: registry.beneficiaryLabel, value: beneficiary }, ...registry.rows]
    .map(({ label, value, tone }) => `
      <div class="rcp-spec-row">
        <dt>${escapeHtml(label)}</dt>
        <dd${tone === 'green' ? ' class="ink-green"' : ''}>${escapeHtml(value)}</dd>
      </div>`)
    .join('');

  const { breakdown } = registry;

  return `
    <section class="rcp-summary">
      <h2 class="rcp-summary-head">${ICONS.checkBadge}${escapeHtml(registry.heading)}</h2>

      <div class="rcp-plate">
        <p class="rcp-plate-label">${escapeHtml(registry.designationLabel)}</p>
        <p class="rcp-plate-name">${escapeHtml(title.name)} ${escapeHtml(registry.designationSuffix)}</p>
        <p class="rcp-plate-id">${escapeHtml(registry.idLabel)}</p>
      </div>

      <dl class="rcp-spec">${rows}</dl>

      <div class="rcp-protocol">
        <span>
          <span class="rcp-protocol-label">${escapeHtml(registry.protocolLabel)}</span>
          <span class="rcp-protocol-value">${escapeHtml(registry.protocolValue)}</span>
        </span>
        <span class="rcp-protocol-icon">${ICONS.checkBadge}</span>
      </div>
    </section>

    <section class="rcp-summary">
      <h2 class="rcp-summary-label">${escapeHtml(breakdown.heading)}</h2>
      <div class="rcp-cost">
        <span>${escapeHtml(title.name)} ${escapeHtml(breakdown.baseSuffix)}</span>
        <span class="rcp-cost-value">${formatMoney(title.amountExact)}</span>
      </div>
      <div class="rcp-cost">
        <span>${escapeHtml(breakdown.feeLabel)}</span>
        <span class="rcp-cost-value ink-green">${escapeHtml(breakdown.feeValue)}</span>
      </div>
      <div class="rcp-total">
        <span>${escapeHtml(breakdown.totalLabel)}</span>
        <strong>${formatMoney(title.amountExact)}</strong>
      </div>
    </section>`;
}

function renderPreviewSummary(content, title) {
  const { preview } = content;
  const rows = preview.rows
    .map(({ label, value, tone }) => `
      <div class="rcp-cost">
        <span>${escapeHtml(label)}</span>
        <span class="rcp-cost-value${tone === 'green' ? ' ink-green' : ''}">${escapeHtml(value)}</span>
      </div>`)
    .join('');

  return `
    <section class="rcp-summary">
      <div class="rcp-preview-head">
        <span class="rcp-summary-label">${escapeHtml(preview.heading)}</span>
        <span class="rcp-standard">${escapeHtml(preview.standard)}</span>
      </div>

      <div class="rcp-plate is-preview">
        <div class="rcp-preview-top">
          <span class="rcp-preview-icon">${ICONS.bank}</span>
          <span class="rcp-series">${escapeHtml(preview.series)}</span>
        </div>
        <p class="rcp-preview-label">${escapeHtml(preview.titleLabel)}</p>
        <p class="rcp-preview-name">${escapeHtml(title.name)}</p>

        <div class="rcp-preview-foot">
          <span>${escapeHtml(preview.signatories)}</span>
          <span>${escapeHtml(preview.immutableLabel)}</span>
        </div>
      </div>

      <div class="rcp-cost">
        <span>${escapeHtml(title.name)} ${escapeHtml(preview.baseSuffix)}</span>
        <span class="rcp-cost-value">${formatMoney(title.amountExact)}</span>
      </div>
      ${rows}
      <div class="rcp-total">
        <span>${escapeHtml(preview.totalLabel)}</span>
        <strong>${formatMoney(title.amountExact)}</strong>
      </div>
    </section>`;
}

/** Nhánh "For Myself": danh hiệu cấp thẳng cho pháp nhân của chính người dùng. */
function renderSelfRecipient(content, profile) {
  const { self } = content;

  return `
    <div class="rcp-self">
      <div class="rcp-self-head">
        <span class="rcp-self-icon">${ICONS.shield}</span>
        <span class="rcp-self-body">
          <span class="rcp-self-name">
            ${escapeHtml(self.heading)}<em>${escapeHtml(self.verifiedNote)}</em>
          </span>
          <span class="rcp-self-entity">${escapeHtml(profile.name)}</span>
        </span>
        <span class="rcp-self-status"><i class="dot"></i>${escapeHtml(self.statusLabel)}</span>
      </div>
      <p class="rcp-self-info">${ICONS.info}<span>${escapeHtml(self.info)}</span></p>
    </div>`;
}

function renderRecipientPage(content) {
  const profile = readMemberProfile();
  if (!profile) return renderSignedOutGuard();

  const isGifting = recipientModeId === 'gift';
  const title = readSelectedTitle();

  // Người thụ hưởng: người nhận đang chọn khi tặng, chính pháp nhân của mình
  // khi giữ lại. Chưa chọn ai thì để gạch ngang.
  const beneficiary = isGifting
    ? (findRecipient(selectedRecipientId)?.shortName ?? content.registry.beneficiaryEmpty)
    : profile.name;

  const summary = content.summaryVariant === 'preview'
    ? renderPreviewSummary(content, title)
    : renderRegistrySummary(content, title, beneficiary);

  const body = `
        <header class="dash-head rcp-head">
          <p class="rcp-eyebrow">${escapeHtml(content.eyebrow)}<i class="dot"></i></p>
          <h1>${escapeHtml(ACQUISITION.heading)}</h1>
          <p class="acq-lead">${escapeHtml(ACQUISITION.lead)}</p>
        </header>

        <div class="rcp-columns">
          <section class="rcp-panel">
            <div class="rcp-panel-head">
              <h2>${ICONS.person}${escapeHtml(content.assignHeading)}</h2>
              ${renderModeToggle(content)}
            </div>

            ${isGifting ? renderRecipientPicker(content) : renderSelfRecipient(content, profile)}

            <p class="rcp-dispatch">
              ${ICONS.padlock}${escapeHtml(isGifting ? content.dispatchNote : content.self.dispatchNote)}
            </p>

            ${isGifting ? '' : `
              <div class="rcp-self-actions">
                <button class="btn-ghost" type="button" id="rcp-back">${escapeHtml(content.self.backLabel)}</button>
                <button class="acq-continue" type="button" data-go-payment>${escapeHtml(content.continueLabel)}</button>
              </div>`}
          </section>

          <aside class="rcp-side">
            ${summary}
            ${isGifting ? '' : `
              <section class="rcp-summary rcp-issued">
                <p class="rcp-issued-head">${ICONS.checkBadge}${escapeHtml(content.self.issued.heading)}</p>
                <p class="rcp-issued-body">${escapeHtml(content.self.issued.body)}</p>
              </section>`}
          </aside>
        </div>

        ${isGifting ? `
          <div class="rcp-bar">
            <button class="btn-ghost" type="button" id="rcp-reset">${escapeHtml(content.resetLabel)}</button>
            <button class="acq-continue" type="button" data-go-payment${selectedRecipientId ? '' : ' disabled'}>${escapeHtml(content.continueLabel)}</button>
          </div>` : ''}`;

  return renderDashboardShell(profile, '#/acquisition', body);
}

function bindRecipientPage() {
  bindDashboardShell();

  document.querySelectorAll('[data-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      recipientModeId = button.dataset.mode;
      renderCurrentRoute();
    });
  });

  const search = document.getElementById('rcp-search');
  search?.addEventListener('input', () => {
    recipientQuery = search.value;
    // Gõ lại để chọn người khác: bỏ lựa chọn cũ rồi dựng lại cả bước (nút Continue và tóm tắt theo lựa chọn).
    if (selectedRecipientId) {
      selectedRecipientId = null;
      renderCurrentRoute();
      const next = document.getElementById('rcp-search');
      next?.focus();
      next?.setSelectionRange(next.value.length, next.value.length);
      return;
    }
    const list = document.getElementById('rcp-people');
    if (list) list.innerHTML = renderRecipientResults(RECIPIENT);
  });

  document.getElementById('rcp-people')?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-recipient]');
    if (!button || button.disabled) return;
    selectedRecipientId = button.dataset.recipient;
    renderCurrentRoute();
  });

  const message = document.getElementById('rcp-message');
  message?.addEventListener('input', () => {
    giftMessageText = message.value;
    document.getElementById('rcp-counter').textContent =
      `${giftMessageText.length} / ${RECIPIENT.giftMessage.maxLength}`;
  });

  document.getElementById('rcp-back')?.addEventListener('click', () => navigateTo('#/acquisition'));

  document.querySelectorAll('[data-go-payment]').forEach((button) => {
    button.addEventListener('click', () => navigateTo('#/payment'));
  });

  document.getElementById('rcp-reset')?.addEventListener('click', () => {
    recipientModeId = RECIPIENT.defaultModeId;
    selectedRecipientId = RECIPIENT.defaultRecipientId;
    giftMessageText = '';
    recipientQuery = '';
    renderCurrentRoute();
  });
}


/* ============================================================
   MÀN ACQUISITION & GIFTING — BƯỚC 3: THANH TOÁN & TẤT TOÁN
   ------------------------------------------------------------
   Số tiền trên màn này được TÍNH từ danh hiệu đang chọn và số điểm
   người dùng nhập, không đóng cứng theo bản thiết kế.

   Bản thiết kế vẽ sẵn 500 điểm và ô điều khoản đã tích. Bản code để
   trống cả hai — người dùng chưa thao tác thì chưa có gì.

   Đây là bước cuối có thiết kế. Nút "Pay & issue Title" chưa dẫn đi
   đâu vì màn kết quả chưa được vẽ.
   ============================================================ */

let pointsToUse = 0;
let hasAgreedToTerms = false;

/* ------------------------------------------------------------
   Trạng thái khối thanh toán bằng thẻ

   BẢO MẬT: `newCard` chỉ sống trong bộ nhớ của trang, đúng như mọi
   trạng thái khác của prototype. Số thẻ KHÔNG BAO GIỜ được ghi
   localStorage, không log, không đưa vào URL. Tải lại trang là mất.
   ------------------------------------------------------------ */
let selectedCardId = null; // null = chọn sẵn thẻ mặc định

/* Form thẻ mới chỉ mở khi bấm "Add new card" (kể cả khi chưa có thẻ lưu). Nút Pay mà chưa có thẻ nào thì tự mở form. */
let isAddingCard = false;

let newCard = {
  number: '',
  expiry: '',
  cvc: '',
  name: '',
  country: null, // null = chưa chọn: dùng quốc gia của tài khoản (xem billingCountry)
  save: true,
  setDefault: false,
};

/** Lỗi theo tên trường, rỗng nghĩa là chưa kiểm tra hoặc đã hợp lệ */
let cardErrors = {};

/** Định dạng tiền kiểu bản thiết kế: 3,500.00 */
function formatAmount(amount) {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Tính toàn bộ số tiền của đơn.
 *
 * Điểm dùng bị chặn hai đầu: không âm, và không vượt quá số điểm đang
 * có lẫn giá danh hiệu — không ai trả âm tiền.
 */
/**
 * Ưu đãi Year-2 (SRS UC16/BR02): đủ số năm thành viên VÀ số dư điểm ≥ ngưỡng.
 * Số năm do BA chốt là 2 (SRS ghi TBD cách đếm "Year 2"); `anniversary` là ngày tròn đủ số năm.
 */
function readYear2Eligibility(profile) {
  const account = AccountStore.read();
  const rule = PAYMENT.points.discount;
  const since = new Date(isDemoProfileOwner(account) ? DASHBOARD.demoProfile.memberSince : (account?.kycDecidedAt ?? account?.createdAt ?? Date.now()));
  const anniversary = new Date(since);
  anniversary.setUTCFullYear(anniversary.getUTCFullYear() + PAYMENT.points.discount.requiredYears);
  const timeOk = Date.now() > anniversary.getTime();
  const pointsOk = profile.points >= rule.minPoints;
  return {
    eligible: timeOk && pointsOk,
    timeOk,
    pointsOk,
    date: anniversary.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }),
  };
}

function calculateOrder(profile) {
  const title = readSelectedTitle();
  const year2 = readYear2Eligibility(profile);
  const discount = year2.eligible ? Math.round(title.priceAmount * PAYMENT.points.discount.rate) : 0;
  const payable = title.priceAmount - discount;
  const maxPoints = Math.min(profile.points, payable);
  const usedPoints = Math.max(0, Math.min(pointsToUse, maxPoints));
  const total = payable - usedPoints;

  return {
    title,
    year2,
    discount,
    maxPoints,
    usedPoints,
    total,
    // 1 CHF = 1 Point, số lẻ làm tròn LÊN (đề bài + BRD NFR-010).
    rewardPoints: Math.ceil(total * PAYMENT.summary.reward.rate),
  };
}

function describeYear2(year2, rule, profile) {
  if (year2.eligible) return rule.eligibleNote;
  const min = rule.minPoints.toLocaleString('en-US');
  return (year2.timeOk ? rule.pointsNote : rule.waitNote)
    .replace('{date}', year2.date).replace('{min}', min).replace('{points}', profile.points.toLocaleString('en-US'));
}

function renderPointsCard(content, profile, order) {
  const { points } = content;

  const quickButtons = points.quickValues
    .map((value) => {
      const resolved = value === null ? order.maxPoints : value;
      const label = value === null ? points.maxLabel : value.toLocaleString('en-US');
      const isActive = resolved === order.usedPoints;
      // Mức vượt quá số điểm đang có (hoặc vượt giá danh hiệu) thì khoá lại,
      // thay vì bấm vào rồi lặng lẽ bị cắt xuống còn mức trần.
      const isOverMax = resolved > order.maxPoints;
      return `<button class="pay-quick${isActive ? ' is-active' : ''}" type="button"
                      data-points="${resolved}"${isOverMax ? ' disabled' : ''}>${escapeHtml(label)}</button>`;
    })
    .join('');

  return `
    <section class="pay-card">
      <div class="pay-card-head">
        <h2>${ICONS.sparkle}${escapeHtml(points.heading)}</h2>
        <button class="text-link" type="button" data-points-history>${escapeHtml(points.historyLabel)}</button>
      </div>

      <div class="pay-inset">
        <p class="pay-discount-head">
          ${escapeHtml(points.discount.label)}
          <span class="pill ${order.year2.eligible ? 'pill-green' : 'pill-amber'}">${escapeHtml(order.year2.eligible ? points.discount.eligibleLabel : points.discount.statusLabel)}</span>
        </p>
        <p class="pay-muted">${escapeHtml(describeYear2(order.year2, points.discount, profile))}</p>
      </div>

      <div class="pay-inset">
        <div class="pay-points-head">
          <span class="pay-points-label">${escapeHtml(points.useLabel)}</span>
          <span class="pay-balance">
            ${escapeHtml(points.balanceLabel)}
            <b>${escapeHtml(profile.points.toLocaleString('en-US'))}</b> ${escapeHtml(points.unit)}
          </span>
        </div>

        <div class="pay-points-row">
          <label class="pay-points-field">
            <input id="pay-points" type="number" inputmode="numeric" min="0"
                   max="${order.maxPoints}" step="1" value="${order.usedPoints}"
                   aria-label="${escapeHtml(points.useLabel)}">
            <span>${escapeHtml(points.unit)}</span>
          </label>
          ${quickButtons}
        </div>

        <p class="pay-muted">${escapeHtml(points.hint)}</p>
      </div>
    </section>`;
}

/* ------------------------------------------------------------
   Kiểm tra thẻ

   Thuật toán Luhn là phép kiểm tra chữ số dùng chung của ngành thẻ:
   nó bắt được lỗi gõ nhầm một chữ số hoặc đảo hai chữ số liền nhau.
   Nó KHÔNG nói thẻ có thật hay còn tiền — chỉ đủ để dựng đúng trạng
   thái lỗi trong thiết kế mà không phải gọi ra ngoài.
   ------------------------------------------------------------ */
function luhnIsValid(digits) {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let value = Number(digits[i]);
    if (double) {
      value *= 2;
      if (value > 9) value -= 9;
    }
    sum += value;
    double = !double;
  }
  return sum % 10 === 0;
}

/** Nhận thương hiệu theo tiền tố. Trả về null khi chưa đủ căn cứ. */
function detectCardBrand(digits) {
  if (/^4/.test(digits)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'mc';
  if (/^3[47]/.test(digits)) return 'amex';
  return null;
}

const CARD_DIGITS_ONLY = /\D+/g;

/** "4242424242424242" → "4242 4242 4242 4242" (Amex: 4-6-5) */
function formatCardNumber(raw) {
  const digits = raw.replace(CARD_DIGITS_ONLY, '').slice(0, 19);
  const groups = detectCardBrand(digits) === 'amex' ? [4, 6, 5] : [4, 4, 4, 4, 3];
  const parts = [];
  let at = 0;
  for (const size of groups) {
    if (at >= digits.length) break;
    parts.push(digits.slice(at, at + size));
    at += size;
  }
  return parts.join(' ');
}

/** "1124" → "11 / 24", giữ nguyên khi người dùng mới gõ một chữ số */
function formatExpiry(raw) {
  const digits = raw.replace(CARD_DIGITS_ONLY, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
}

/**
 * Kiểm tra toàn bộ form thẻ. Object rỗng nghĩa là hợp lệ.
 * Hạn dùng so với tháng hiện tại: hết hạn tính từ cuối tháng ghi trên thẻ.
 */
function validateNewCard(card) {
  const messages = PAYMENT.method.errors;
  const errors = {};

  const digits = card.number.replace(CARD_DIGITS_ONLY, '');
  if (!digits) {
    errors.number = messages.numberRequired;
  } else if (digits.length < 13 || digits.length > 19 || !luhnIsValid(digits)) {
    errors.number = messages.numberInvalid;
  }

  const expiryDigits = card.expiry.replace(CARD_DIGITS_ONLY, '');
  if (!expiryDigits) {
    errors.expiry = messages.expiryRequired;
  } else if (expiryDigits.length !== 4) {
    errors.expiry = messages.expiryInvalid;
  } else {
    const month = Number(expiryDigits.slice(0, 2));
    const year = 2000 + Number(expiryDigits.slice(2));
    if (month < 1 || month > 12) {
      errors.expiry = messages.expiryInvalid;
    } else {
      const now = new Date();
      const expiresAfter = new Date(year, month, 1);
      if (expiresAfter <= new Date(now.getFullYear(), now.getMonth(), 1)) {
        errors.expiry = messages.expired;
      }
    }
  }

  const cvcDigits = card.cvc.replace(CARD_DIGITS_ONLY, '');
  if (cvcDigits.length < 3 || cvcDigits.length > 4) {
    errors.cvc = messages.cvcInvalid;
  }

  if (!card.name.trim()) {
    errors.name = messages.nameRequired;
  }

  return errors;
}


/* ---------------- Dựng khối thanh toán bằng thẻ ---------------- */

function renderBrandBadge(brandId, label, isSmall) {
  return `<span class="pay-brand${isSmall ? ' is-sm' : ''}" data-brand="${escapeHtml(brandId)}">${escapeHtml(label)}</span>`;
}

/** Dải thương hiệu trong ô số thẻ: thu về một khi đã nhận ra thẻ */
function renderNumberBrands(method, digits) {
  const detected = detectCardBrand(digits);
  const shown = detected ? method.brands.filter((brand) => brand.id === detected) : method.brands;
  return shown.map((brand) => renderBrandBadge(brand.id, brand.label, true)).join('');
}

function renderCardField(name, field, inner, error) {
  return `
    <div class="pay-field${error ? ' has-error' : ''}">
      <label for="card-${name}">${escapeHtml(field.label)}</label>
      ${inner}
      ${error ? `<p class="pay-field-error" role="alert">${ICONS.alert}${escapeHtml(error)}</p>` : ''}
    </div>`;
}

/** Quốc gia thanh toán mặc định = quốc gia của tài khoản (nếu có trong danh sách), không thì mặc định của thiết kế. */
function billingCountry() {
  if (newCard.country) return newCard.country;
  const own = AccountStore.read()?.country;
  return COUNTRIES.includes(own) ? own : PAYMENT.method.defaultCountry;
}

function renderNewCardForm(method) {
  const digits = newCard.number.replace(CARD_DIGITS_ONLY, '');
  const countries = COUNTRIES
    .map((country) => `<option value="${escapeHtml(country)}"${country === billingCountry() ? ' selected' : ''}>${escapeHtml(country)}</option>`)
    .join('');

  const number = renderCardField('number', method.fields.number, `
      <div class="pay-input pay-input-number">
        <input id="card-number" type="text" inputmode="numeric" autocomplete="cc-number"
               placeholder="${escapeHtml(method.fields.number.placeholder)}"
               value="${escapeHtml(newCard.number)}" data-card-field="number">
        <span class="pay-number-brands" id="card-number-brands">${renderNumberBrands(method, digits)}</span>
      </div>`, cardErrors.number);

  const expiry = renderCardField('expiry', method.fields.expiry, `
      <div class="pay-input">
        <input id="card-expiry" type="text" inputmode="numeric" autocomplete="cc-exp"
               placeholder="${escapeHtml(method.fields.expiry.placeholder)}"
               value="${escapeHtml(newCard.expiry)}" data-card-field="expiry">
      </div>`, cardErrors.expiry);

  const cvc = renderCardField('cvc', method.fields.cvc, `
      <div class="pay-input">
        <input id="card-cvc" type="password" inputmode="numeric" autocomplete="cc-csc" maxlength="4"
               placeholder="${escapeHtml(method.fields.cvc.placeholder)}"
               value="${escapeHtml(newCard.cvc)}" data-card-field="cvc">
      </div>`, cardErrors.cvc);

  const holder = renderCardField('name', method.fields.name, `
      <div class="pay-input">
        <input id="card-name" type="text" autocomplete="cc-name"
               placeholder="${escapeHtml(method.fields.name.placeholder)}"
               value="${escapeHtml(newCard.name)}" data-card-field="name">
      </div>`, cardErrors.name);

  const country = renderCardField('country', method.fields.country, `
      <div class="pay-input pay-input-select">
        <select id="card-country" autocomplete="billing country-name" data-card-field="country">${countries}</select>
      </div>`, null);

  return `
    ${number}
    <div class="pay-field-pair">${expiry}${cvc}</div>
    ${holder}
    ${country}
    <label class="pay-check${newCard.save ? ' is-on' : ''}">
      <input type="checkbox" id="card-save" data-card-field="save"${newCard.save ? ' checked' : ''}>
      <span>${escapeHtml(method.saveLabel)}</span>
    </label>
    <label class="pay-check${newCard.setDefault ? ' is-on' : ''}${newCard.save ? '' : ' is-disabled'}">
      <input type="checkbox" id="card-default" data-card-field="setDefault"
             ${newCard.setDefault ? ' checked' : ''}${newCard.save ? '' : ' disabled'}>
      <span>${escapeHtml(method.setDefaultLabel)}</span>
    </label>
    <div class="pay-newcard-actions">
      <button class="pay-add-card" type="button" id="card-add">${escapeHtml(method.addCardAction)}</button>
      <button class="pay-cancel-card" type="button" id="card-cancel">${escapeHtml(method.cancelLabel)}</button>
      <span class="pay-newcard-hint">${escapeHtml(method.addCardHint)}</span>
    </div>`;
}

function renderSavedCardRow(card, method, isSelected) {
  return `
    <li class="pay-saved-item${isSelected ? ' is-selected' : ''}">
      <button class="pay-saved${isSelected ? ' is-selected' : ''}" type="button"
              data-card="${escapeHtml(card.id)}" aria-pressed="${isSelected ? 'true' : 'false'}">
        <span class="pay-radio" aria-hidden="true"></span>
        ${renderBrandBadge(card.brandId, card.brandId.toUpperCase(), false)}
        <span class="pay-saved-text">
          <span class="pay-saved-name">
            ${escapeHtml(card.brandName)} ${escapeHtml(method.maskLabel)} ${escapeHtml(card.last4)}
            ${card.isDefault ? `<span class="pay-saved-default">${escapeHtml(method.defaultBadge)}</span>` : ''}
          </span>
          <span class="pay-saved-exp">${escapeHtml(method.expiryPrefix)} ${escapeHtml(card.expiry)}</span>
        </span>
      </button>
      <span class="pay-card-actions">
        ${card.isDefault ? '' : `<button class="pay-set-default" type="button" data-set-default="${escapeHtml(card.id)}">${escapeHtml(method.setDefaultAction)}</button>`}
        <button class="pay-remove-card" type="button" data-remove-card="${escapeHtml(card.id)}"
                aria-label="${escapeHtml(method.removeAction)} ${escapeHtml(card.brandName)} ${escapeHtml(method.maskLabel)} ${escapeHtml(card.last4)}">${escapeHtml(method.removeAction)}</button>
      </span>
    </li>`;
}

/* Thẻ đã lưu do người dùng thêm (tick "Save this card"). CHỈ lưu thương hiệu, bốn số cuối và hạn dùng — không bao giờ
   lưu số thẻ đầy đủ hay mã bảo mật (đúng ghi chú bảo mật ở PAYMENT.method). Lưu ở localStorage theo email thành viên để
   vào lại vẫn còn, và nút Reset xoá cùng mọi thứ khác. */
const SAVED_CARDS_KEY = 'pw_demo_saved_cards';
/* Thẻ mặc định do người dùng chọn lại: { email: mã thẻ }. Thắng cờ isDefault của từng thẻ, áp dụng cả cho thẻ mẫu của Apex. */
const DEFAULT_CARD_KEY = 'pw_demo_default_card';
/* Thẻ người dùng đã xoá: { email: [mã thẻ] }. Áp dụng cả cho thẻ mẫu Visa •••• 4492 của Apex. */
const REMOVED_CARDS_KEY = 'pw_demo_removed_cards';

function readRemovedCards() {
  try {
    return JSON.parse(localStorage.getItem(REMOVED_CARDS_KEY) ?? '{}') ?? {};
  } catch {
    return {};
  }
}

/** Xoá một thẻ đã lưu. Xoá thẻ mặc định thì thẻ đứng đầu còn lại thành mặc định (xem savedCardsOf). */
function removeSavedCard(cardId) {
  const account = AccountStore.read();
  if (!account) return;
  const key = memberCardKey(account);
  try {
    const removed = readRemovedCards();
    removed[key] = [...new Set([...(removed[key] ?? []), cardId])];
    localStorage.setItem(REMOVED_CARDS_KEY, JSON.stringify(removed));
  } catch {
    // Trình duyệt chặn lưu trữ: bỏ qua.
  }
  selectedCardId = null;
}

function readDefaultCards() {
  try {
    return JSON.parse(localStorage.getItem(DEFAULT_CARD_KEY) ?? '{}') ?? {};
  } catch {
    return {};
  }
}

/** Đặt một thẻ đã lưu làm mặc định (thẻ cũ mất nhãn Default). */
function setDefaultCard(cardId) {
  const account = AccountStore.read();
  if (!account) return;
  try {
    const store = readDefaultCards();
    store[memberCardKey(account)] = cardId;
    localStorage.setItem(DEFAULT_CARD_KEY, JSON.stringify(store));
  } catch {
    // Trình duyệt chặn lưu trữ: bỏ qua.
  }
  selectedCardId = null; // chọn sẵn thẻ mặc định mới
}

function readStoredCards() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_CARDS_KEY) ?? '{}') ?? {};
  } catch {
    return {};
  }
}

function memberCardKey(account) {
  return account ? AccountStore.keyOf(account) : null;
}

/** Thẻ đã lưu của thành viên đang đăng nhập: thẻ mẫu của Apex (nếu là Apex) cộng thẻ tự thêm; thẻ mặc định đứng đầu. */
function savedCardsOf() {
  const account = AccountStore.read();
  if (!account) return [];
  const added = readStoredCards()[memberCardKey(account)] ?? [];
  const base = isDemoProfileOwner(account) ? PAYMENT.method.savedCards : [];
  const demoteBase = added.some((card) => card.isDefault);
  let all = [...base.map((card) => (demoteBase ? { ...card, isDefault: false } : card)), ...added];
  const removedIds = readRemovedCards()[memberCardKey(account)] ?? [];
  all = all.filter((card) => !removedIds.includes(card.id));
  const chosen = readDefaultCards()[memberCardKey(account)];
  if (chosen && all.some((card) => card.id === chosen)) all = all.map((card) => ({ ...card, isDefault: card.id === chosen }));
  // Xoá mất thẻ mặc định thì thẻ đầu tiên còn lại thành mặc định.
  else if (all.length && !all.some((card) => card.isDefault)) all = all.map((card, index) => ({ ...card, isDefault: index === 0 }));
  return [...all.filter((card) => card.isDefault), ...all.filter((card) => !card.isDefault)];
}

/** Thẻ đang được chọn: thẻ người dùng vừa bấm nếu còn trong danh sách, không thì thẻ mặc định, không thì thẻ đầu. */
function activeSavedCardId(cards) {
  return (cards.find((card) => card.id === selectedCardId) ?? cards.find((card) => card.isDefault) ?? cards[0])?.id ?? null;
}

/** Ghi thẻ vừa thanh toán vào danh sách đã lưu (nếu người dùng tick Save). Trả về true khi có ghi. */
function saveNewCardIfWanted(force = false) {
  const account = AccountStore.read();
  if (!account || (!force && !newCard.save)) return false;
  const digits = newCard.number.replace(CARD_DIGITS_ONLY, '');
  const brandId = detectCardBrand(digits);
  const brand = PAYMENT.method.brands.find((item) => item.id === brandId);
  if (!brand) return false;
  const card = {
    id: `${brandId}-${digits.slice(-4)}-${newCard.expiry.replace(/\D+/g, '')}`,
    brandId,
    brandName: { visa: 'Visa', mc: 'Mastercard', amex: 'American Express' }[brandId],
    last4: digits.slice(-4),
    expiry: newCard.expiry.replace(/\s+/g, ''),
    isDefault: newCard.setDefault,
  };
  try {
    const store = readStoredCards();
    const key = memberCardKey(account);
    // Lưu lại đúng thẻ từng xoá thì thẻ đó không còn bị coi là đã xoá.
    const removed = readRemovedCards();
    if ((removed[key] ?? []).includes(card.id)) {
      removed[key] = removed[key].filter((id) => id !== card.id);
      localStorage.setItem(REMOVED_CARDS_KEY, JSON.stringify(removed));
    }
    let mine = (store[key] ?? []).filter((item) => item.id !== card.id);
    if (card.isDefault) mine = mine.map((item) => ({ ...item, isDefault: false }));
    // Thẻ đầu tiên của tài khoản chưa có thẻ nào tự thành mặc định.
    if (!card.isDefault && savedCardsOf().length === 0) card.isDefault = true;
    store[key] = [...mine, card];
    localStorage.setItem(SAVED_CARDS_KEY, JSON.stringify(store));
    // Thẻ mới đặt mặc định thì thắng lựa chọn mặc định đã đặt trước đó.
    if (card.isDefault) {
      const defaults = readDefaultCards();
      defaults[key] = card.id;
      localStorage.setItem(DEFAULT_CARD_KEY, JSON.stringify(defaults));
    }
    return true;
  } catch {
    return false;
  }
}

/** Đang nhập thẻ mới = form đã mở. Chưa có thẻ lưu thì form đóng cho tới khi bấm "Add new card". */
function isEnteringNewCard() {
  return isAddingCard;
}

function renderMethodCard(content) {
  const { method } = content;
  const savedCards = savedCardsOf();
  const hasSavedCards = savedCards.length > 0;
  const adding = isEnteringNewCard();

  /* Chưa có thẻ nào thì không có gì để chọn: form hiện thẳng, không radio */
  const saved = hasSavedCards
    ? `<ul class="pay-saved-list">${savedCards
        .map((card) => renderSavedCardRow(card, method, !adding && card.id === activeSavedCardId(savedCards)))
        .join('')}</ul>`
    : '';

  const newCardBlock = adding
    ? `<div class="pay-newcard">
         ${hasSavedCards ? `
         <button class="pay-newcard-head" type="button" data-card="new" aria-pressed="true">
           <span class="pay-radio is-on" aria-hidden="true"></span>
           <span>${escapeHtml(method.newCardLabel)}</span>
         </button>` : ''}
         ${renderNewCardForm(method)}
       </div>`
    : '';

  /* Liên kết đầu khối luôn là "+ Add new card" (mở form); nút Cancel nằm cạnh nút Add card trong form */
  const toggle = `<button class="pay-cardlink" type="button" id="pay-card-toggle"><i aria-hidden="true">+</i>${escapeHtml(method.addLabel)}</button>`;

  return `
    <section class="pay-card pay-method-card">
      <div class="pay-card-head">
        <div>
          <h2>${ICONS.card}${escapeHtml(method.heading)}</h2>
          <p class="pay-muted">${escapeHtml(method.lead)}</p>
        </div>
        ${toggle}
      </div>

      ${saved}
      ${newCardBlock}

      <div class="pay-secure">
        <p>${ICONS.padlock}${escapeHtml(method.securityNote)}</p>
        <div class="pay-brands">
          ${method.brands.map((brand) => renderBrandBadge(brand.id, brand.label, false)).join('')}
        </div>
      </div>
    </section>`;
}

/* ---------------- Nối sự kiện khối thanh toán bằng thẻ ---------------- */

/** Xoá lỗi của đúng một trường, không dựng lại cả trang để khỏi mất tiêu điểm */
function clearCardFieldError(input, name) {
  if (!cardErrors[name]) return;
  delete cardErrors[name];
  const field = input.closest('.pay-field');
  field?.classList.remove('has-error');
  field?.querySelector('.pay-field-error')?.remove();
}

function bindMethodCard() {
  const card = document.querySelector('.pay-method-card');
  if (!card) return;

  document.getElementById('pay-card-toggle')?.addEventListener('click', () => {
    // Form đang mở thì chỉ đưa con trỏ vào ô số thẻ; đóng form bằng nút Cancel trong form.
    if (!isAddingCard) {
      isAddingCard = true;
      cardErrors = {};
      renderCurrentRoute();
    }
    document.getElementById('card-number')?.focus();
  });

  // Nút Cancel trong form: bỏ thẻ đang nhập và đóng form.
  document.getElementById('card-cancel')?.addEventListener('click', () => {
    newCard = { number: '', expiry: '', cvc: '', name: '', country: null, save: true, setDefault: false };
    isAddingCard = false;
    cardErrors = {};
    renderCurrentRoute();
  });

  card.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-remove-card]');
    if (removeButton) {
      const target = savedCardsOf().find((item) => item.id === removeButton.dataset.removeCard);
      if (target && window.confirm(`${PAYMENT.method.removeAction} ${target.brandName} ${PAYMENT.method.maskLabel} ${target.last4}?`)) {
        removeSavedCard(target.id);
        renderCurrentRoute();
      }
      return;
    }
    const setDefault = event.target.closest('[data-set-default]');
    if (setDefault) {
      setDefaultCard(setDefault.dataset.setDefault);
      renderCurrentRoute();
      return;
    }
    const button = event.target.closest('[data-card]');
    if (!button || button.dataset.card === 'new') return;
    selectedCardId = button.dataset.card;
    isAddingCard = false;
    cardErrors = {};
    renderCurrentRoute();
  });

  // Nút "Add card": lưu thẻ vào danh sách mà chưa thanh toán.
  document.getElementById('card-add')?.addEventListener('click', () => {
    cardErrors = validateNewCard(newCard);
    if (Object.keys(cardErrors).length === 0 && saveNewCardIfWanted(true)) {
      newCard = { number: '', expiry: '', cvc: '', name: '', country: null, save: true, setDefault: false };
      isAddingCard = false;
      selectedCardId = null;
    }
    renderCurrentRoute();
    if (Object.keys(cardErrors).length > 0) {
      const firstBad = document.querySelector('.pay-field.has-error input');
      firstBad?.focus();
      firstBad?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  });

  card.querySelectorAll('[data-card-field]').forEach((input) => {
    const name = input.dataset.cardField;

    if (input.type === 'checkbox') {
      input.addEventListener('change', () => {
        newCard[name] = input.checked;
        input.closest('.pay-check')?.classList.toggle('is-on', input.checked);
        if (name !== 'save') return;
        // Bỏ lưu thẻ thì không còn gì để đặt làm mặc định.
        const asDefault = document.getElementById('card-default');
        if (!asDefault) return;
        asDefault.disabled = !input.checked;
        if (!input.checked) {
          asDefault.checked = false;
          newCard.setDefault = false;
        }
        const row = asDefault.closest('.pay-check');
        row?.classList.toggle('is-disabled', !input.checked);
        row?.classList.toggle('is-on', asDefault.checked);
      });
      return;
    }

    input.addEventListener('input', () => {
      // Định dạng tại chỗ rồi trả con trỏ về cuối — ô thẻ luôn gõ xuôi.
      if (name === 'number') input.value = formatCardNumber(input.value);
      if (name === 'expiry') input.value = formatExpiry(input.value);
      newCard[name] = input.value;

      if (name === 'number') {
        const brands = document.getElementById('card-number-brands');
        if (brands) {
          brands.innerHTML = renderNumberBrands(PAYMENT.method, input.value.replace(CARD_DIGITS_ONLY, ''));
        }
      }
      clearCardFieldError(input, name);
    });

    input.addEventListener('change', () => { newCard[name] = input.value; });
  });
}

/**
 * Địa chỉ + mã số ở khối Billing details, suy ra từ tài khoản: địa chỉ mẫu theo quốc gia đã đăng ký (hệ thống không thu
 * địa chỉ chi tiết) và số đăng ký / số giấy tờ đã nộp ở bước KYC (Apex dùng số đăng ký của hồ sơ mẫu).
 */
function billingDetailsOf(account, billing) {
  if (!account) return { address: '', identifiers: '' };
  const docId = isDemoProfileOwner(account) ? ADMIN.revoke.sample.registrationId : account.kycSubmission?.documentId;
  const label = account.accountType === 'individual' ? billing.idLabelIndividual : billing.idLabelCompany;
  return {
    address: [billing.sampleAddresses[account.country], account.country].filter(Boolean).join(', '),
    identifiers: docId ? `${label}: ${docId}` : '',
  };
}

function renderBillingCard(content, entityName) {
  const { billing } = content;
  const details = billingDetailsOf(AccountStore.read(), billing);

  return `
    <section class="pay-card">
      <div class="pay-card-head">
        <h2>${ICONS.file}${escapeHtml(billing.heading)}</h2>
        <button class="pay-modify" type="button">${escapeHtml(billing.modifyLabel)}</button>
      </div>

      <div class="pay-inset">
        <p class="pay-entity-head">
          <span class="pay-entity-name">${escapeHtml(entityName)}</span>
          <span class="pill pill-green"><i class="dot"></i>${escapeHtml(billing.statusLabel)}</span>
        </p>
        <p class="pay-entity-address">${escapeHtml(details.address)}</p>
        ${details.identifiers ? `<p class="pay-entity-ids">${escapeHtml(details.identifiers)}</p>` : ''}
      </div>

      <label class="pay-terms">
        <input type="checkbox" id="pay-terms"${hasAgreedToTerms ? ' checked' : ''}>
        <span>
          ${escapeHtml(billing.terms.before)}<a href="#/payment">${escapeHtml(billing.terms.issuanceLink)}</a>${escapeHtml(billing.terms.between)}<a href="#/payment">${escapeHtml(billing.terms.custodyLink)}</a>${escapeHtml(billing.terms.after)}
        </span>
      </label>
    </section>`;
}

function renderOrderSummary(content, order, beneficiary) {
  const { summary } = content;

  const pointsRow = order.usedPoints > 0
    ? `
      <div class="pay-row">
        <span>${escapeHtml(summary.pointsLabel)} (${escapeHtml(order.usedPoints.toLocaleString('en-US'))} ${escapeHtml(content.points.unit)})</span>
        <span class="ink-green">-${formatMoney(formatAmount(order.usedPoints))}</span>
      </div>`
    : '';

  return `
    <section class="pay-card pay-summary">
      <div class="pay-card-head">
        <h2>${ICONS.file}${escapeHtml(summary.heading)}</h2>
        <span class="pay-order-id">${escapeHtml(summary.orderId)}${renderCopyIcon(summary.orderId, 'Copy order ID')}</span>
      </div>

      <p class="pay-label">${escapeHtml(summary.targetLabel)}</p>
      <p class="pay-target">${escapeHtml(order.title.name)}</p>

      <div class="pay-inset">
        <p class="pay-label">${escapeHtml(summary.beneficiaryLabel)}</p>
        <p class="pay-beneficiary">
          <span>${escapeHtml(beneficiary.name)}</span>
          <span class="pill pill-green">${escapeHtml(summary.verifiedLabel)}</span>
        </p>
        <p class="pay-did">${escapeHtml(beneficiary.did)}</p>
      </div>

      <div class="pay-escrow">
        <span>${escapeHtml(summary.escrowLabel)}</span>
        <span class="ink-green">${ICONS.pulse}${escapeHtml(summary.escrowValue)}</span>
      </div>

      <div class="pay-row">
        <span>${escapeHtml(summary.priceLabel)}</span>
        <span>${formatMoney(formatAmount(order.title.priceAmount))}</span>
      </div>
      <div class="pay-row">
        <span>${escapeHtml(summary.discountLabel)}</span>
        ${order.discount > 0
          ? `<span class="ink-green">${summary.discountAppliedPrefix}${formatMoney(formatAmount(order.discount))}</span>`
          : `<span class="pay-muted">${escapeHtml(summary.discountValue)}</span>`}
      </div>
      ${pointsRow}
      <div class="pay-row">
        <span>${escapeHtml(summary.feeLabel)}</span>
        <span class="ink-green">${escapeHtml(summary.feeValue)}</span>
      </div>

      <div class="pay-total">
        <span>
          <span class="pay-label">${escapeHtml(summary.totalLabel)}</span>
          <span class="pay-muted">${escapeHtml(summary.totalNote)}</span>
        </span>
        <strong>${formatMoney(formatAmount(order.total))}</strong>
      </div>

      <div class="pay-reward">
        <span class="pay-reward-icon">${ICONS.sparkle}</span>
        <span>
          <span class="pay-reward-head">
            You earn +${escapeHtml(order.rewardPoints.toLocaleString('en-US'))} ${escapeHtml(content.points.unit)}${recipientModeId === 'gift'
              ? ` · Recipient earns +${escapeHtml(order.rewardPoints.toLocaleString('en-US'))} ${escapeHtml(content.points.unit)}`
              : ''}
          </span>
          <span class="pay-reward-note">${escapeHtml(recipientModeId === 'gift' ? summary.reward.note : summary.reward.selfNote)}</span>
        </span>
      </div>

      <button class="pay-submit" type="button" id="pay-submit"${hasAgreedToTerms ? '' : ' disabled'}>
        ${escapeHtml(summary.payLabel)}${ICONS.arrowRight}
      </button>
      <p class="pay-footnote">${ICONS.padlock}${escapeHtml(summary.footnote)}</p>
    </section>`;
}

function renderPaymentPage(content) {
  const profile = readMemberProfile();
  if (!profile) return renderSignedOutGuard();

  const order = calculateOrder(profile);
  const recipient = recipientModeId === 'gift' ? findRecipient(selectedRecipientId) : null;
  const beneficiary = recipient
    ? { name: recipient.name, did: recipient.did }
    : { name: profile.name, did: RECIPIENT.registry.beneficiaryEmpty };

  const body = `
        <header class="dash-head rcp-head">
          <h1>${escapeHtml(ACQUISITION.heading)}</h1>
          <p class="acq-lead">${escapeHtml(ACQUISITION.lead)}</p>
        </header>

        <button class="pay-back" type="button" id="pay-back">${escapeHtml(content.backLabel)}</button>

        <div class="pay-columns">
          <div class="pay-main">
            ${renderPointsCard(content, profile, order)}
            ${renderMethodCard(content)}
            ${renderBillingCard(content, profile.name)}
          </div>

          <aside class="pay-side">
            ${renderOrderSummary(content, order, beneficiary)}

            <section class="pay-card pay-desk">
              <span class="pay-desk-icon">${ICONS.headset}</span>
              <span>
                <span class="pay-label">${escapeHtml(content.desk.label)}</span>
                <span class="pay-desk-body">
                  ${escapeHtml(content.desk.body)}
                  <a href="#/payment">${escapeHtml(content.desk.linkLabel)}</a>
                </span>
              </span>
            </section>
          </aside>
        </div>`;

  return renderDashboardShell(profile, '#/acquisition', body);
}

function bindPaymentPage() {
  bindDashboardShell();

  document.getElementById('pay-back')?.addEventListener('click', () => navigateTo('#/dashboard'));

  const pointsField = document.getElementById('pay-points');
  pointsField?.addEventListener('input', () => {
    pointsToUse = Number(pointsField.value) || 0;
    renderCurrentRoute();
    // Dựng lại cả tuyến nên phải trả con trỏ về ô vừa gõ.
    const next = document.getElementById('pay-points');
    next?.focus();
    next?.setSelectionRange(next.value.length, next.value.length);
  });

  document.querySelectorAll('[data-points]').forEach((button) => {
    button.addEventListener('click', () => {
      pointsToUse = Number(button.dataset.points);
      renderCurrentRoute();
    });
  });

  bindMethodCard();

  document.getElementById('pay-submit')?.addEventListener('click', () => {
    // Chưa có thẻ lưu và chưa mở form: mở form để người dùng nhập (lỗi từng ô hiện ngay bên dưới).
    if (savedCardsOf().length === 0) isAddingCard = true;
    // Đang nhập thẻ mới thì phải hợp lệ mới cho đi tiếp.
    if (isEnteringNewCard()) {
      cardErrors = validateNewCard(newCard);
      if (Object.keys(cardErrors).length > 0) {
        renderCurrentRoute();
        const firstBad = document.querySelector('.pay-field.has-error input');
        firstBad?.focus();
        firstBad?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
      }
    }
    // Thanh toán xong thì lần mua sau lại chọn sẵn thẻ mặc định, không giữ thẻ vừa bấm.
    selectedCardId = null;
    if (isEnteringNewCard()) {
      saveNewCardIfWanted();
      // Xoá thông tin thẻ vừa nhập khỏi bộ nhớ trang; lần sau vào lại thì dùng thẻ đã lưu (hoặc nhập mới).
      newCard = { number: '', expiry: '', cvc: '', name: '', country: null, save: true, setDefault: false };
      isAddingCard = false;
    }
    settlementAt = new Date();
    issuedAt = null;
    navigateTo('#/outcome');
  });

  const terms = document.getElementById('pay-terms');
  terms?.addEventListener('change', () => {
    hasAgreedToTerms = terms.checked;
    // Chỉ bật/tắt nút, không dựng lại cả trang để ô tích không mất tiêu điểm.
    const submit = document.getElementById('pay-submit');
    if (submit) submit.disabled = !hasAgreedToTerms;
  });
}


/* ============================================================
   MÀN THÔNG BÁO ĐƯỢC TẶNG DANH HIỆU — #/gift
   ------------------------------------------------------------
   Đo từ design/PW — Recipient Gift Notification.png (2x).

   Người nhận thấy màn này ngay sau khi đăng nhập nếu có quà chưa xem (bản demo không có email / thông báo ngoài web).
   "View my title" đánh dấu đã xem rồi sang Dashboard (danh hiệu vốn đã tự nằm trong ví giữ hộ nên không có nút "Save to vault" như thiết kế).
   ============================================================ */

/** Quà đầu tiên (mới nhất) mà thành viên đang đăng nhập đã nhận nhưng chưa xem ở màn thông báo. */
function readUnseenGift() {
  const account = AccountStore.read();
  if (!account) return null;
  const entityId = entityIdOf(account);
  const key = (issued) => `${account.email.toLowerCase()}|${issued.titleId}`;
  return allIssuedTitles()
    .filter((issued) => issued.isGift && issued.recipientEntityId === entityId && !seenGiftNotices.includes(key(issued)))
    .sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt))[0] ?? null;
}

function markGiftSeen(issued) {
  const account = AccountStore.read();
  if (!account || !issued) return;
  const key = `${account.email.toLowerCase()}|${issued.titleId}`;
  if (!seenGiftNotices.includes(key)) seenGiftNotices = [...seenGiftNotices, key];
}

function renderGiftNoticePage(content) {
  const account = AccountStore.read();
  const gift = readUnseenGift();
  if (!account || !gift) return renderSignedOutGuard();

  const sender = gift.buyerName || 'A PW member';
  const from = `${sender}${gift.buyerRepresentative ? ` (${gift.buyerRepresentative})` : ''}`;
  // Tên pháp nhân đứng trước, người đại diện bên dưới; tài khoản cá nhân thì tên + loại tài khoản và quốc gia.
  const person = account.legalName;
  const org = account.accountType === 'individual' ? `Individual \u00b7 ${account.country ?? ''}` : (account.representative ?? '');

  return `
  <main class="auth gift-page">
    <div class="gift-wrap">
      <span class="auth-badge"><span class="brand-mark">PW</span>${escapeHtml(content.badge)}</span>

      <section class="gift-card">
        <span class="gift-seal" aria-hidden="true">${ICONS.medal}</span>
        <h1>${escapeHtml(content.heading)}</h1>
        <p class="gift-lead">${escapeHtml(content.lead.replace('{sender}', sender))}</p>

        <div class="gift-from">
          <p class="gift-from-head">${ICONS.mail}<span>${escapeHtml(content.fromPrefix)} ${escapeHtml(from)}</span></p>
          ${gift.giftMessage ? `<p class="gift-quote"><i aria-hidden="true">\u201c</i>${escapeHtml(gift.giftMessage)}</p>` : ''}
        </div>

        <div class="gift-spec">
          <p class="gift-spec-head"><span>${escapeHtml(content.specHeading)}</span><span>${escapeHtml(content.standardHeading)}</span></p>
          <div class="gift-name">
            <span>
              <small>${escapeHtml(content.titleNameLabel)}</small>
              <b>${escapeHtml(gift.name)}</b>
            </span>
            <span class="gift-standard">${escapeHtml(content.standardPill)}</span>
          </div>
          <div class="gift-pair">
            <div class="gift-cell">
              <small>${escapeHtml(content.recipientLabel)}</small>
              <b>${escapeHtml(person)}</b>
              <span class="gift-org">${escapeHtml(org)}</span>
            </div>
            <div class="gift-cell">
              <small>${escapeHtml(content.titleIdLabel)}</small>
              <b class="gift-id">${escapeHtml(gift.titleId)}
                <button class="gift-copy" type="button" data-copy="${escapeHtml(gift.titleId)}"
                        aria-label="${escapeHtml(content.copyLabel)}">${ICONS.copy}</button></b>
              <span class="gift-verified"><i class="dot"></i>${escapeHtml(content.verifiedNote)}</span>
            </div>
          </div>
        </div>

        <div class="gift-actions">
          <button class="gift-view" type="button" id="gift-view">${escapeHtml(content.viewLabel)}${ICONS.arrowRight}</button>
        </div>

        <p class="gift-foot">${ICONS.shield}${escapeHtml(content.footnote)}</p>
      </section>
    </div>
  </main>`;
}

function bindGiftNoticePage() {
  document.getElementById('gift-view')?.addEventListener('click', () => {
    markGiftSeen(readUnseenGift());
    navigateTo('#/dashboard');
  });
}

/* ============================================================
   MÀN POINT HISTORY — #/points
   ------------------------------------------------------------
   Lịch sử điểm của thành viên đang đăng nhập, mới nhất đứng đầu, kèm số dư sau mỗi dòng. Dựng từ những gì đã xảy ra:
   điểm thưởng mua danh hiệu (10%), điểm đã dùng để giảm giá, điểm thưởng khi được tặng danh hiệu và điểm admin chỉnh tay.
   Hồ sơ mẫu Apex có thêm ba dòng thưởng của các danh hiệu mua trước đó. Số dư cuối luôn bằng Point balance ở Dashboard.
   ============================================================ */

function readPointLedger() {
  const account = AccountStore.read();
  if (!account) return [];
  const content = DASHBOARD.pointHistory;
  const entityId = entityIdOf(account);
  const rows = [];

  if (isDemoProfileOwner(account)) {
    content.sample.forEach((row) => rows.push({ at: new Date(row.at), title: content.events.earned, detail: row.detail, delta: row.delta }));
  }
  issuedTitles.forEach((issued) => {
    const label = `${issued.name} (${issued.titleId})`;
    if (issued.usedPoints > 0) {
      rows.push({ at: issued.issuedAt, title: content.events.redeemed, detail: `Applied to ${label} purchase`, delta: -issued.usedPoints });
    }
    rows.push({
      at: issued.issuedAt,
      title: issued.isGift ? content.events.earnedGift : content.events.earned,
      detail: `${label} · 10% of CHF ${formatAmount(issued.total)}`,
      delta: issued.rewardPoints,
    });
  });
  allIssuedTitles()
    .filter((issued) => issued.isGift && issued.recipientEntityId === entityId)
    .forEach((issued) => rows.push({
      at: issued.issuedAt,
      title: content.events.received,
      detail: `${issued.name} (${issued.titleId}) gifted by ${issued.buyerName || 'a PW member'}`,
      delta: issued.recipientPoints ?? 0,
    }));
  pointAdjustments
    .filter((entry) => entry.entityId === entityId)
    .forEach((entry) => rows.push({
      at: entry.at,
      title: content.events.adjusted,
      detail: `${ADMIN.points.reasons.find(({ id }) => id === entry.reason)?.label ?? ''}${entry.note ? ` — ${entry.note}` : ''}`,
      delta: entry.delta,
    }));

  rows.sort((a, b) => a.at - b.at);
  let balance = 0;
  rows.forEach((row) => { balance += row.delta; row.balance = balance; });
  return rows.reverse();
}

function renderPointHistoryPage(content) {
  const profile = readMemberProfile();
  if (!profile) return renderSignedOutGuard();
  const ledger = readPointLedger();
  const earned = ledger.filter((row) => row.delta > 0).reduce((sum, row) => sum + row.delta, 0);
  const used = ledger.filter((row) => row.delta < 0).reduce((sum, row) => sum - row.delta, 0);

  const rows = ledger.map((row) => `
        <li class="ph-row">
          <span class="ph-mark ${row.delta < 0 ? 'is-out' : 'is-in'}" aria-hidden="true">${row.delta < 0 ? '−' : '+'}</span>
          <span class="ph-body">
            <b class="ph-title">${escapeHtml(row.title)}</b>
            <span class="ph-detail">${escapeHtml(row.detail)}</span>
            <span class="ph-time">${escapeHtml(formatIssuedTime(row.at))}</span>
          </span>
          <span class="ph-amount">
            <b class="${row.delta < 0 ? 'ink-red' : 'ink-green'}">${escapeHtml(formatSignedPoints(row.delta))} ${escapeHtml(content.unit)}</b>
            <small>${escapeHtml(content.balanceAfter)} ${escapeHtml(formatPoints(row.balance))}</small>
          </span>
        </li>`).join('');

  const list = ledger.length
    ? `<ul class="ph-list">${rows}</ul>`
    : `<div class="ph-empty"><b>${escapeHtml(content.empty.heading)}</b><p>${escapeHtml(content.empty.note)}</p></div>`;

  const body = `
        <header class="dash-head">
          <a class="ph-back" href="#/dashboard">${ICONS.arrowLeft}${escapeHtml(content.backLabel)}</a>
          <h1>${escapeHtml(content.heading)}</h1>
          <p class="dash-sub"><span>${escapeHtml(content.lead)}</span></p>
        </header>

        <div class="ph-summary">
          <section class="card stat">
            <h2 class="stat-label">${escapeHtml(content.balanceLabel)}</h2>
            <p class="stat-value">${escapeHtml(formatPoints(profile.points))}<span>${escapeHtml(content.unit)}</span></p>
          </section>
          <section class="card stat">
            <h2 class="stat-label">${escapeHtml(content.earnedLabel)}</h2>
            <p class="stat-value ink-green">${escapeHtml(formatPoints(earned))}<span>${escapeHtml(content.unit)}</span></p>
          </section>
          <section class="card stat">
            <h2 class="stat-label">${escapeHtml(content.usedLabel)}</h2>
            <p class="stat-value">${escapeHtml(formatPoints(used))}<span>${escapeHtml(content.unit)}</span></p>
          </section>
        </div>

        <section class="card ph-card">
          <h2 class="section-heading">${escapeHtml(content.listHeading)}</h2>
          ${list}
        </section>`;
  return renderDashboardShell(profile, '#/dashboard', body);
}

function bindPointHistoryPage() {
  bindDashboardShell();
}

/* ============================================================
   MÀN PUBLIC DIRECTORY
   ------------------------------------------------------------
   Đo từ design/PW — Public Directory - Log in.png.

   Dùng chung khung .dash với bốn màn sau đăng nhập. Bản thiết kế vẽ
   thanh bên hẹp hơn (278 so với 288) và vùng nội dung hẹp hơn (831
   so với 928) các màn còn lại; bản code GIỮ khung chung — xem README.

   Tìm kiếm, lọc và sắp xếp đều chạy thật trên ba pháp nhân mẫu.
   ============================================================ */

let directoryQuery = '';
let directoryFilterId = DIRECTORY.defaultFilterId;
let directorySortId = DIRECTORY.defaultSortId;

/** Trang đang xem của danh sách đầy đủ (1-based). Về 1 mỗi khi đổi tìm kiếm / lọc / sắp xếp. */
let directoryPage = 1;

/**
 * Sổ đăng ký đang hiển thị = dữ liệu mẫu + những gì xảy ra trong phiên:
 *   - award đã trao cộng vào số danh hiệu / số award của pháp nhân và thêm
 *     nhãn danh hiệu vào thẻ nếu chưa có;
 *   - tài khoản đã đăng ký thêm một thẻ, số liệu lấy từ hồ sơ Dashboard
 *     (`readMemberProfile()`) nên hạng và số danh hiệu khớp hai nơi.
 * Admin đăng nhập lại thì award mất, nên sổ về đúng dữ liệu mẫu.
 */
function readRegistryEntities() {
  const entities = DIRECTORY.entities.map((entity) => {
    const awards = grantedAwards.filter((award) => award.entityId === entity.id);
    const revoked = revokedNfts.filter((item) => item.entityId === entity.id);
    // Danh hiệu được người khác tặng (mua để tặng) cộng vào thẻ người nhận.
    const gifts = allIssuedTitles().filter((issued) => issued.isGift && issued.recipientEntityId === entity.id);
    // Mã token tra được ở ô tìm kiếm: hồ sơ thiết kế (nếu có) + award đã trao + danh hiệu được tặng.
    const designed = DOSSIERS[entity.id];
    const tokenIds = [
      ...(designed?.awards ?? []).map((award) => award.ref),
      ...(designed?.titles ?? []).map((title) => title.tokenId),
      ...awards.map((award) => award.ref),
      ...gifts.map((issued) => issued.titleId),
    ];
    if (!awards.length && !revoked.length && !gifts.length) return { ...entity, tokenIds };

    const revokedAwards = revoked.filter((item) => item.kind === 'award').length;
    const revokedTitles = revoked.length - revokedAwards;
    const revokedTitleNames = new Set(revoked.filter((item) => item.kind !== 'award').map((item) => item.name));
    const liveAwardNames = awards
      .filter((award) => !revoked.some((item) => item.nftId === award.ref))
      .map((award) => award.name);
    const liveGiftNames = gifts
      .filter((issued) => !revoked.some((item) => item.nftId === issued.titleId))
      .map((issued) => issued.name);

    return {
      ...entity,
      tokenIds,
      mintedTitles: entity.mintedTitles + awards.length + gifts.length - revoked.length,
      titleCount: entity.titleCount + gifts.length - revokedTitles,
      awardCount: entity.awardCount + awards.length - revokedAwards,
      titles: [...new Set([...entity.titles.filter((name) => !revokedTitleNames.has(name)), ...liveGiftNames, ...liveAwardNames])]
        .sort((x, y) => DIRECTORY.filters.findIndex((f) => f.id === x) - DIRECTORY.filters.findIndex((f) => f.id === y)),
      revokedCount: revoked.length,
    };
  });

  // Mỗi thành viên (Apex dựng sẵn, tài khoản đã đăng ký) một thẻ, số liệu lấy từ chính hồ sơ Dashboard của họ.
  // Chỉ thành viên đã được duyệt KYC mới có thẻ công khai (BRD FR-021: Directory liệt kê pháp nhân đã KYC); chờ duyệt hoặc bị từ chối thì chưa hiện.
  AccountStore.members().forEach((account) => {
    if (account.kycStatus !== 'approved') return;
    const profile = withMemberContext(account, readMemberProfileRaw);
    if (!profile) return;
    const active = profile.titles.filter((title) => !title.revoked);
    const owned = (kind) => active.filter((title) => title.kind === kind).length;
    entities.push({
      id: entityIdOf(account),
      name: account.legalName,
      type: account.accountType,
      sealTone: 'purple',
      tone: 'purple',
      rank: 0,
      mintedTitles: active.length,
      titleCount: owned('distinction'),
      awardCount: owned('award'),
      location: account.country,
      // Nhãn theo thứ tự của bộ lọc (Investor, Philanthropist, Bridge) như các thẻ khác.
      titles: [...new Set(active.map((title) => title.name))]
        .sort((x, y) => DIRECTORY.filters.findIndex((f) => f.id === x) - DIRECTORY.filters.findIndex((f) => f.id === y)),
      revokedCount: profile.titles.length - active.length,
      tokenIds: profile.titles.map((title) => title.id),
      memberSince: new Date(isDemoProfileOwner(account) ? DASHBOARD.demoProfile.memberSince : (account.kycDecidedAt ?? account.createdAt ?? Date.now())),
      isRegistered: true,
      account,
    });
  });

  // Hồ sơ KYC mẫu (hàng đợi của admin) được duyệt thì pháp nhân vào Directory ngay, chưa có NFT nào.
  const approvedSamples = new Set(kycDecisions.filter((item) => item.decision === 'approve' && ADMIN.reviews[item.reviewId]).map((item) => item.reviewId));
  approvedSamples.forEach((reviewId) => {
    const review = ADMIN.reviews[reviewId];
    let hash = 7;
    for (const ch of reviewId) hash = (hash * 31 + ch.charCodeAt(0)) % 9000;
    const jurisdiction = review.facts.find((fact) => fact.label.startsWith('Jurisdiction'))?.value ?? '';
    entities.push({
      id: `PW-ORG-${String(hash + 1000)}`,
      name: review.name,
      type: 'company',
      sealTone: 'blue',
      tone: 'blue',
      rank: 0,
      mintedTitles: 0,
      titleCount: 0,
      awardCount: 0,
      location: jurisdiction.split(' (')[0],
      titles: [],
      tokenIds: [],
    });
  });

  // Xếp hạng theo số NFT: nhiều hơn thì hạng cao hơn. Bằng nhau thì thành viên đứng trước, rồi giữ thứ tự cũ.
  entities.forEach((entity, index) => { entity.order = index; });
  [...entities]
    .sort((a, b) => b.mintedTitles - a.mintedTitles
      || Number(Boolean(b.isRegistered)) - Number(Boolean(a.isRegistered))
      || a.order - b.order)
    .forEach((entity, index) => { entity.rank = index + 1; });
  return entities;
}

/** Lọc theo ô tìm kiếm và theo danh hiệu, rồi sắp xếp. */
function readDirectoryEntities() {
  const query = directoryQuery.trim().toLowerCase();

  const matched = readRegistryEntities().filter((entity) => {
    // Tìm theo tên, mã pháp nhân hoặc mã token (có hay không có dấu #).
    const tokenNeedle = query.replace(/^#/, '');
    const matchesQuery = !query
      || entity.name.toLowerCase().includes(query)
      || entity.id.toLowerCase().includes(query)
      || (entity.tokenIds ?? []).some((id) => id.toLowerCase().replace(/^#/, '').includes(tokenNeedle));
    const matchesFilter = directoryFilterId === 'all'
      || entity.titles.includes(directoryFilterId);
    return matchesQuery && matchesFilter;
  });

  const sorters = {
    rank:     (a, b) => a.rank - b.rank,
    rankLow:  (a, b) => b.rank - a.rank,
    name:     (a, b) => a.name.localeCompare(b.name) || a.rank - b.rank,
    nameDesc: (a, b) => b.name.localeCompare(a.name) || a.rank - b.rank,
  };
  return matched.sort(sorters[directorySortId] ?? sorters.rank);
}

/** Chữ tắt dùng làm con dấu. Thiết kế dùng ảnh, bản code vẽ bằng CSS. */
function entityInitials(name) {
  return name
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

/** Tổng danh hiệu đang hiệu lực trong sổ đăng ký — một con số dùng chung cho Directory và Admin Portal. */
function readRegistryTitleTotal() {
  return readRegistryEntities().reduce((sum, entity) => sum + entity.mintedTitles, 0);
}

/**
 * Bốn ô số liệu: hai ô đầu tính theo sổ đăng ký đang hiển thị (318 pháp nhân, 1.482 danh hiệu,
 * 14 thẩm quyền khi chưa ai đăng ký) nên tài khoản đăng ký mới và mọi thay đổi trong phiên
 * (mua, award, thu hồi) cộng vào đó liền mạch. Hai ô sau giữ nguyên số liệu mẫu.
 */
function readDirectoryStats(stats) {
  const registry = readRegistryEntities();
  const titles = registry.reduce((sum, entity) => sum + entity.mintedTitles, 0);
  const jurisdictions = new Set(registry.map((entity) => jurisdictionOf(entity.location))).size;
  return stats.map((stat, index) => {
    if (index === 0) return { ...stat, value: titles.toLocaleString('en-US') };
    if (index === 1) return { ...stat, value: registry.length.toLocaleString('en-US'), suffix: `${jurisdictions} Jurisdictions` };
    return stat;
  });
}

function renderDirectoryStat(stat) {
  const suffix = stat.suffix
    ? `<span class="dir-stat-suffix${stat.suffixTone ? ` ink-${escapeHtml(stat.suffixTone)}` : ''}">${escapeHtml(stat.suffix)}</span>`
    : '';

  return `
    <section class="card dir-stat">
      <h3 class="dir-stat-label">${escapeHtml(stat.label)}</h3>
      <p class="dir-stat-value">
        <b${stat.valueTone ? ` class="ink-${escapeHtml(stat.valueTone)}"` : ''}>${escapeHtml(stat.value)}</b>
        ${suffix}
      </p>
      <p class="dir-stat-note">${escapeHtml(stat.note)}</p>
    </section>`;
}

function renderDirectoryEntity(entity, content) {
  const pills = entity.titles
    .map((title) => renderPill({ label: title, tone: content.titleTones[title] }))
    .join('') + (entity.revokedCount
    ? renderPill({ label: `${entity.revokedCount} ${ADMIN.revoke.dashboardEntry.revokedPill.label}`, tone: 'red' })
    : '');

  const counts = [
    countLabel(entity.titleCount, content.countsLabel.titles),
    countLabel(entity.awardCount, content.countsLabel.awards),
  ].join(' · ');

  return `
    <article class="card dir-entity" data-tone="${escapeHtml(entity.tone)}">
      <div class="dir-entity-head">
        <span class="dir-seal" data-shape="${entity.type === 'individual' ? 'round' : 'square'}"
              data-tone="${escapeHtml(entity.sealTone)}"
              aria-hidden="true">${escapeHtml(entityInitials(entity.name))}</span>
        <span class="dir-entity-name">${escapeHtml(entity.name)}</span>
        <span class="dir-rank${entity.rank === 1 ? ' is-top' : ''}">
          ${entity.rank === 1 ? ICONS.rosette : ''}
          <span>${escapeHtml(content.rankPrefix)} #${String(entity.rank).padStart(2, '0')}</span>
        </span>
      </div>

      <p class="dir-entity-code">
        <b>${escapeHtml(content.typeLabels[entity.type])}</b>
        <span>ID: ${escapeHtml(entity.id)}${renderCopyIcon(entity.id, 'Copy entity ID')}</span>
      </p>

      <div class="dir-entity-facts">
        <span>
          <span class="dir-fact-label">${escapeHtml(content.totalLabel)}</span>
          <b class="dir-fact-value">${entity.mintedTitles}</b>
        </span>
        <span class="is-right">
          <span class="dir-fact-label">${escapeHtml(content.locationLabel)}</span>
          <b class="dir-fact-value is-text">${escapeHtml(entity.location)}</b>
        </span>
      </div>

      <p class="dir-entity-counts">${escapeHtml(counts)}</p>

      <div class="dir-entity-titles">${pills}</div>

      <button class="dir-profile" type="button"${readDossier(entity.id) ? ` data-entity="${escapeHtml(entity.id)}"` : ''}>
        ${escapeHtml(content.profileLabel)}${ICONS.arrowRight}
      </button>
    </article>`;
}

/** Các nút trang: 1 2 3 … cuối, hoặc 1 … c-1 c c+1 … cuối, hoặc 1 … ba trang cuối. */
function directoryPageButtons(current, count) {
  if (count <= 6) return Array.from({ length: count }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 'gap', count];
  if (current >= count - 2) return [1, 'gap', count - 2, count - 1, count];
  return [1, 'gap', current - 1, current, current + 1, 'gap', count];
}

function renderDirectoryPagination(content, range) {
  const { pagination: page } = content;
  const { from, to, current, pageCount, total } = range;

  const pages = directoryPageButtons(current, pageCount)
    .map((item) => (item === 'gap'
      ? `<i class="dir-page-gap" aria-hidden="true">${escapeHtml(page.gapLabel)}</i>`
      : `<button class="dir-page${item === current ? ' is-on' : ''}" type="button" data-page="${item}"
              ${item === current ? 'aria-current="page"' : ''}>${item}</button>`))
    .join('');

  return `
    <nav class="dir-pager" aria-label="${escapeHtml(content.heading)}">
      <p>${escapeHtml(page.showingLabel.replace('{from}', from).replace('{to}', to).replace('{total}', total.toLocaleString('en-US')))}</p>
      <span class="dir-pager-steps">
        <button class="dir-page" type="button" data-page="prev" aria-label="${escapeHtml(page.prevLabel)}"${current <= 1 ? ' disabled' : ''}>${ICONS.chevronLeft}</button>
        ${pages}
        <button class="dir-page" type="button" data-page="next" aria-label="${escapeHtml(page.nextLabel)}"${current >= pageCount ? ' disabled' : ''}>${ICONS.chevronRight}</button>
      </span>
    </nav>`;
}

function renderDirectoryBody(content) {
  const matches = readDirectoryEntities();
  const isFiltered = directoryQuery.trim() !== '' || directoryFilterId !== 'all';

  /* Kết quả (đầy đủ hoặc đã tìm / lọc) chia trang thật. */
  const { pageSize } = content.pagination;
  const pageCount = Math.max(1, Math.ceil(matches.length / pageSize));
  const current = Math.min(directoryPage, pageCount);
  const entities = matches.slice((current - 1) * pageSize, current * pageSize);
  const range = { from: (current - 1) * pageSize + 1, to: (current - 1) * pageSize + entities.length, current, pageCount, total: matches.length };

  const chips = content.filters
    .map(({ id, label }) => `
      <button class="dir-chip${id === directoryFilterId ? ' is-on' : ''}" type="button"
              data-filter="${escapeHtml(id)}" aria-pressed="${id === directoryFilterId ? 'true' : 'false'}">
        ${escapeHtml(label)}
      </button>`)
    .join('');

  const sortOptions = content.sortOptions
    .map(({ id, label }) => `<option value="${escapeHtml(id)}"${id === directorySortId ? ' selected' : ''}>${escapeHtml(label)}</option>`)
    .join('');

  /* Rỗng vì bộ lọc và rỗng vì chưa có pháp nhân nào là hai chuyện khác nhau */
  const emptyState = isFiltered ? content.noMatch : content.empty;
  const list = entities.length
    ? `<div class="dir-grid">${entities.map((entity) => renderDirectoryEntity(entity, content)).join('')}</div>
       ${renderDirectoryPagination(content, range)}`
    : `
      <div class="card panel dir-empty">
        <div class="empty">
          <span class="empty-icon">${ICONS.book}</span>
          <p class="empty-heading">${escapeHtml(emptyState.heading)}</p>
          <p class="empty-body">${escapeHtml(emptyState.body)}</p>
          ${emptyState.action ? `<button class="btn-ghost" type="button" id="dir-clear">${escapeHtml(emptyState.action)}</button>` : ''}
        </div>
      </div>`;

  return `
        <section class="dir-hero">
          <span class="pill pill-green dir-tag">${ICONS.nodes}${escapeHtml(content.tag)}</span>
          <h1>${escapeHtml(content.heading)}</h1>
          <p class="dir-lead">${escapeHtml(content.lead)}</p>

          <div class="dir-controls">
            <div class="dir-search">
              ${ICONS.search}
              <input type="search" id="dir-search" value="${escapeHtml(directoryQuery)}"
                     placeholder="${escapeHtml(content.searchPlaceholder)}"
                     aria-label="${escapeHtml(content.searchLabel)}">
            </div>
            <div class="dir-sort">
              ${ICONS.sort}
              <label for="dir-sort">${escapeHtml(content.sortLabel)}</label>
              <select id="dir-sort">${sortOptions}</select>
            </div>
          </div>

          <div class="dir-filters">
            <span class="dir-filter-label">${escapeHtml(content.filterLabel)}</span>
            ${chips}
          </div>
        </section>

        <div class="dir-stats">${readDirectoryStats(content.stats).map(renderDirectoryStat).join('')}</div>

        ${list}`;
}

function renderDirectoryPage(content) {
  const { profile, options } = readShellContext();
  if (!profile) return renderSignedOutGuard();

  return renderDashboardShell(profile, '#/directory', renderDirectoryBody(content), options);
}

/* ------------------------------------------------------------
   Bản công khai — vào từ mục "Directory" trên landing page.
   Đo từ design/PW — Public Verification Directory.png.

   Khác bản đã đăng nhập đúng hai chỗ: khung bọc là thanh trên +
   chân trang của landing (không có thanh bên), và vùng nội dung
   rộng 1184 (.wrap của landing) thay vì 928.
   ------------------------------------------------------------ */

function renderPublicDirectoryPage(content) {
  return [
    renderTopbar(LANDING, '#/public-directory'),
    `<main class="dash dash-public"><div class="wrap">${renderDirectoryBody(content)}</div></main>`,
    renderFooter(LANDING),
  ].join('');
}

function bindDirectoryPage() {
  bindDashboardShell();
  bindDirectoryControls();
}

function bindPublicDirectoryPage() {
  bindDirectoryControls();
}

/** Tìm kiếm, sắp xếp, lọc và nút xem hồ sơ — dùng chung cho cả hai bản. */
function bindDirectoryControls() {
  const search = document.getElementById('dir-search');
  search?.addEventListener('input', () => {
    directoryQuery = search.value;
    directoryPage = 1;
    renderCurrentRoute();
    // Dựng lại cả tuyến nên phải trả con trỏ về ô vừa gõ.
    const next = document.getElementById('dir-search');
    next?.focus();
    next?.setSelectionRange(next.value.length, next.value.length);
  });

  document.getElementById('dir-sort')?.addEventListener('change', (event) => {
    directorySortId = event.target.value;
    directoryPage = 1;
    renderCurrentRoute();
  });

  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      directoryFilterId = button.dataset.filter;
      directoryPage = 1;
      renderCurrentRoute();
    });
  });

  document.getElementById('dir-clear')?.addEventListener('click', () => {
    directoryQuery = '';
    directoryFilterId = 'all';
    directoryPage = 1;
    renderCurrentRoute();
  });

  /* Chuyển trang: chỉ trang có dữ liệu mới chạy (1 và 2); nút 3 và 53 giữ hình thức. */
  document.querySelectorAll('[data-page]').forEach((button) => {
    button.addEventListener('click', () => {
      const pageCount = Math.max(1, Math.ceil(readDirectoryEntities().length / DIRECTORY.pagination.pageSize));
      const target = { prev: directoryPage - 1, next: directoryPage + 1 }[button.dataset.page] ?? Number(button.dataset.page);
      if (!Number.isInteger(target) || target < 1 || target > pageCount) return;
      directoryPage = target;
      renderCurrentRoute();
      window.scrollTo(0, 0);
    });
  });

  /* Chỉ pháp nhân đã có hồ sơ được thiết kế mới mang data-entity.
     Bốn pháp nhân còn lại giữ nguyên nút nhưng bấm không đi đâu.
     Khách chưa đăng nhập sang bản hồ sơ công khai, thành viên sang bản đầy đủ. */
  const dossierRoute = AccountStore.isSignedIn() ? '#/entity' : '#/public-entity';
  document.querySelectorAll('[data-entity]').forEach((button) => {
    button.addEventListener('click', () => {
      dossierEntityId = button.dataset.entity;
      navigateTo(dossierRoute);
    });
  });
}


/* ============================================================
   MÀN KẾT QUẢ SAU THANH TOÁN
   ------------------------------------------------------------
   Màn đứng riêng, không dùng khung .dash.

   Có HAI trạng thái, cùng một màn, hai bản thiết kế:
     - đang phát hành  → `PW — Acquisition Outcome (Issuing Title).png`
     - đã phát hành xong → `... (Issuing Title - success).png`

   Chỉ vào được sau khi bấm "Pay & issue Title" — mốc thời gian tất
   toán chính là thứ đánh dấu điều đó.

   Prototype không nối chuỗi khối thật nên không có gì để chờ: màn
   tự nhảy sang trạng thái xong sau `DEMO_ISSUE_DELAY_MS`. Đây là
   đường tắt cho bản demo, ghi rõ trong README.
   ============================================================ */

let settlementAt = null;

/** Mốc phát hành gần nhất. null nghĩa là màn vẫn đang ở trạng thái phát hành. */
let issuedAt = null;

/**
 * Các danh hiệu đã phát hành trong phiên xem trang, mới nhất đứng đầu.
 *
 * Mỗi mục là một BẢN CHỤP tại lúc phát hành — tên, mã, số tiền, điểm
 * thưởng — chứ không tính lại theo danh hiệu đang chọn. Chọn lại danh
 * hiệu khác ở bước 1 không được phép sửa thứ đã phát hành rồi.
 */
let issuedTitles = [];

/** Bộ đếm chuyển sang trạng thái xong; huỷ khi rời màn để không bắn nhầm. */
let issueTimer = null;

/** Mốc thời gian kiểu bản thiết kế: September 23, 2026 · 06:58:56 UTC */
function formatSettlementTime(date) {
  const day = date.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
  const time = date.toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC',
  });
  return `${day} · ${time} UTC`;
}

/** Kiểu ngắn ở màn đã phát hành xong: 23 Sep 2026, 06:59 UTC */
function formatIssuedTime(date) {
  const day = date.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
  });
  const time = date.toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit', timeZone: 'UTC',
  });
  return `${day}, ${time} UTC`;
}

/** Chỉ ngày, dùng cho dòng mô tả thẻ danh hiệu trên dashboard */
function formatIssuedDate(date) {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
  });
}

function renderOutcomeStep(step, index) {
  const marker = {
    done: `<span class="outcome-marker is-done">${ICONS.checkMark}</span>`,
    active: `<span class="outcome-marker is-active">${ICONS.refresh}</span>`,
    queued: `<span class="outcome-marker">${index + 1}</span>`,
  }[step.status];

  const aside = step.badge
    ? `<span class="outcome-step-badge">${escapeHtml(step.badge)}</span>`
    : `<span class="outcome-step-status is-${escapeHtml(step.status)}">${escapeHtml(step.statusLabel)}</span>`;

  return `
    <li class="outcome-step is-${escapeHtml(step.status)}">
      ${marker}
      <span class="outcome-step-body">
        <span class="outcome-step-title">${escapeHtml(step.title)}</span>
        ${step.note ? `<span class="outcome-step-note">${escapeHtml(step.note)}</span>` : ''}
      </span>
      ${aside}
    </li>`;
}

function renderOutcomeRow(label, value, extraClass = '') {
  return `
    <div class="outcome-row${extraClass ? ` ${extraClass}` : ''}">
      <dt>${escapeHtml(label)}</dt>
      <dd>${value}</dd>
    </div>`;
}

/** Dữ liệu dùng chung cho cả hai trạng thái của màn kết quả */
function readOutcomeContext() {
  const profile = readMemberProfile();
  if (!profile || !settlementAt) return null;

  const recipient = recipientModeId === 'gift' ? findRecipient(selectedRecipientId) : null;
  return {
    profile,
    order: calculateOrder(profile),
    beneficiary: recipient ? recipient.name : profile.name,
  };
}

function renderOutcomeIssuing(content, context) {
  const { order, beneficiary } = context;
  const { labels } = content;

  const steps = content.steps.map(renderOutcomeStep).join('');

  const rows = [
    renderOutcomeRow(labels.title, `<i class="outcome-dot"></i>${escapeHtml(order.title.name)}`),
    renderOutcomeRow(labels.beneficiary, escapeHtml(beneficiary)),
    renderOutcomeRow(labels.reference, `
      <span class="outcome-ref">${escapeHtml(PAYMENT.summary.orderId)}</span>
      <button class="icon-button" type="button" data-copy="${escapeHtml(PAYMENT.summary.orderId)}"
              aria-label="${escapeHtml(content.copyLabel)}">${ICONS.copy}</button>`),
    renderOutcomeRow(labels.timestamp, escapeHtml(formatSettlementTime(settlementAt))),
    renderOutcomeRow(labels.amount, formatMoney(formatAmount(order.total))),
    renderOutcomeRow(labels.allocation,
      `+${escapeHtml(order.rewardPoints.toLocaleString('en-US'))} ${escapeHtml(PAYMENT.points.unit)} ${escapeHtml(content.allocationSuffix)}`,
      'is-allocation'),
    renderOutcomeRow(labels.specification, escapeHtml(content.specification)),
  ].join('');

  return `
      <span class="outcome-spinner" aria-hidden="true"></span>
      <p class="outcome-state"><i class="outcome-dots"></i>${escapeHtml(content.stateLabel)}</p>

      <h1>${escapeHtml(content.heading)}</h1>
      <p class="outcome-lead">${escapeHtml(content.lead)}</p>

      <ol class="outcome-steps">${steps}</ol>
      <dl class="outcome-details">${rows}</dl>

      <p class="outcome-notice">${ICONS.bell}<span>${escapeHtml(content.notice)}</span></p>

      <button class="outcome-submit" type="button" disabled>
        <span class="outcome-spinner is-small" aria-hidden="true"></span>${escapeHtml(content.issuingLabel)}
      </button>
      <button class="outcome-secondary" type="button" id="outcome-dashboard">${escapeHtml(content.dashboardLabel)}</button>

      <p class="outcome-foot">${escapeHtml(content.footnote)}</p>`;
}

function renderOutcomeSuccess(content, context) {
  const { profile } = context;
  const done = content.success;
  const { labels } = done;

  // Bản chụp lúc phát hành, không tính lại theo danh hiệu đang chọn.
  const issued = issuedTitles[0];

  const steps = (issued.isGift ? done.giftSteps : done.steps).map(renderOutcomeStep).join('');
  const walletAddress = profile.wallets[0]?.addressLabel ?? '';

  const rows = [
    renderOutcomeRow(labels.title, `<i class="outcome-dot"></i>${escapeHtml(issued.name)}`),
    renderOutcomeRow(labels.owner, escapeHtml(issued.isGift ? issued.recipientName : profile.name)),
    issued.isGift
      ? renderOutcomeRow(labels.wallet, `
      <span class="outcome-wallet">
        <span class="outcome-wallet-line">${escapeHtml(done.giftWalletName)}</span>
        <span class="outcome-wallet-meta">${escapeHtml(done.giftWalletMeta)}</span>
      </span>`, 'is-stacked')
      : renderOutcomeRow(labels.wallet, `
      <span class="outcome-wallet">
        <span class="outcome-wallet-line">
          ${escapeHtml(done.walletName)}<i>·</i><b>${escapeHtml(walletAddress)}</b>
          <button class="icon-button" type="button" data-copy="${escapeHtml(walletAddress)}"
                  aria-label="${escapeHtml(done.copyWalletLabel)}">${ICONS.copy}</button>
        </span>
        <span class="outcome-wallet-meta">${escapeHtml(done.walletMeta)}</span>
      </span>`, 'is-stacked'),
    renderOutcomeRow(labels.titleId, `
      ${escapeHtml(issued.titleId)}
      <button class="icon-button" type="button" data-copy="${escapeHtml(issued.titleId)}"
              aria-label="${escapeHtml(done.copyTitleIdLabel)}">${ICONS.copy}</button>
      <button class="outcome-onchain" type="button">
        ${escapeHtml(done.onchainLabel)}${ICONS.linkOut}
      </button>`),
    renderOutcomeRow(labels.issuedOn, escapeHtml(formatIssuedTime(issued.issuedAt))),
    renderOutcomeRow(labels.amount, formatMoney(formatAmount(issued.total))),
    renderOutcomeRow(labels.points, `
      <b class="ink-green">+${escapeHtml(issued.rewardPoints.toLocaleString('en-US'))} ${escapeHtml(PAYMENT.points.unit)}</b>
      <span class="outcome-points-note">${escapeHtml(done.pointsSuffix)}</span>`),
    issued.isGift
      ? renderOutcomeRow(labels.recipientPoints, `<b class="ink-green">+${escapeHtml(issued.recipientPoints.toLocaleString('en-US'))} ${escapeHtml(PAYMENT.points.unit)}</b>`)
      : renderOutcomeRow(labels.ranking,
        `<span class="outcome-rank">${ICONS.sparkle}${escapeHtml(done.rankingLabel)}</span>`),
  ].join('');

  return `
      <span class="outcome-seal" aria-hidden="true">${ICONS.checkMark}</span>
      <p class="outcome-state is-issued"><i class="dot"></i>${escapeHtml(done.stateLabel)}</p>

      <h1>${escapeHtml(issued.isGift ? done.giftHeading : done.heading)}</h1>
      <p class="outcome-lead">${escapeHtml(done.leadBefore)}${escapeHtml(issued.name)}${escapeHtml(issued.isGift ? done.giftLeadAfter.replace('{recipient}', issued.recipientName) : done.leadAfter)}</p>

      <ol class="outcome-steps is-done">${steps}</ol>
      <dl class="outcome-details">${rows}</dl>

      <button class="outcome-secondary" type="button" id="outcome-dashboard">${escapeHtml(done.dashboardLabel)}</button>`;
}

function renderOutcomePage(content) {
  const context = readOutcomeContext();
  if (!context) return renderSignedOutGuard();

  const body = issuedAt
    ? renderOutcomeSuccess(content, context)
    : renderOutcomeIssuing(content, context);

  return `
  <main class="outcome">
    <p class="outcome-brand">
      <span class="outcome-mark">${escapeHtml(DASHBOARD.brand.name)}</span>
      ${escapeHtml(content.brand)}
    </p>

    <section class="outcome-card${issuedAt ? ' is-issued' : ''}">${body}</section>

    <footer class="outcome-strip">
      <span><i class="dot"></i>${escapeHtml(content.strip.status)}</span>
      <span>${escapeHtml(content.strip.jurisdiction)}</span>
    </footer>
  </main>`;
}

function bindOutcomePage() {
  document.getElementById('outcome-dashboard')?.addEventListener('click', () => navigateTo('#/dashboard'));

  clearTimeout(issueTimer);
  if (issuedAt) return;

  // Đường tắt cho bản demo: không có chuỗi khối thật để chờ.
  issueTimer = setTimeout(() => {
    if (issuedAt) return;
    // Rời màn chờ giữa chừng thì danh hiệu VẪN được phát hành — người
    // dùng đã trả tiền rồi. Chỉ dựng lại hai màn hiển thị kết quả;
    // dựng lại màn thanh toán sẽ xoá sạch thẻ đang gõ dở.
    recordIssuedTitle();
    if (location.hash === '#/outcome' || location.hash === '#/dashboard') {
      renderCurrentRoute();
    }
  }, DEMO_ISSUE_DELAY_MS);
}

/* ============================================================
   MÀN HỒ SƠ CÔNG KHAI CỦA PHÁP NHÂN
   ------------------------------------------------------------
   Đo từ design/PW — Public Directory - Log in 2.png.

   Vào bằng nút "View Public Profile" ở Public Directory. Dùng
   chung khung .dash nhưng thay thanh trên và đổi nền vùng nội
   dung sang đen — thiết kế màn này vẽ nền đen, khác #0f131e của
   năm màn kia.

   Pháp nhân đang xem chỉ sống trong phiên xem trang, giống mọi
   trạng thái khác. Tải lại trang là mất, và guard đẩy về
   #/directory vì không còn biết đang xem ai.
   ============================================================ */

let dossierEntityId = null;
/* Hồ sơ đã bấm "Show all" — nhớ theo pháp nhân nên mở hồ sơ khác thì tự thu gọn */
let dossierShowAllFor = null;
const DOSSIER_TITLES_SHOWN = 6;

/**
 * Danh hiệu / award mẫu của pháp nhân trong sổ chưa có hồ sơ thiết kế: số lượng khớp với thẻ ở Directory
 * (`titleCount`, `awardCount` gốc), tên lấy luân phiên từ nhãn danh hiệu của thẻ. Mã, ngày cấp và lời trích đều là
 * DỮ LIỆU MẪU do bản code sinh cố định; mã đầu tiên giữ đúng quy tắc `#PW-2026-<mã>-<4 số cuối mã hồ sơ>` cũ.
 */
function sampleNftsOf(entityId) {
  const base = DIRECTORY.entities.find((entity) => entity.id === entityId);
  if (!base || DOSSIERS[entityId]) return [];
  const tail = base.id.slice(-4);
  const suffix = (i) => (i ? `-${i + 1}` : '');
  const dates = ['March 14, 2026', 'May 02, 2026', 'July 21, 2026', 'August 30, 2026', 'September 18, 2026'];
  const tags = base.titles.length ? base.titles : ['Investor'];
  const codeOf = (name) => ACQUISITION.titles.find((item) => item.name === name)?.code ?? 'NFT';
  const distinctions = Array.from({ length: base.titleCount }, (_, i) => {
    const name = tags[i % tags.length];
    return { id: `#PW-2026-${codeOf(name)}-${tail}${suffix(i)}`, name, kind: 'distinction', issueDate: dates[i % dates.length] };
  });
  const awards = Array.from({ length: base.awardCount }, (_, i) => {
    const name = tags[i % tags.length];
    return {
      id: `#PW-2026-AWD-${tail}${suffix(i)}`, name, kind: 'award', granted: 'Apr 2026',
      citation: ADMIN.grant.citationSuggestions[name]?.[0] ?? '',
    };
  });
  return [...distinctions, ...awards];
}

/**
 * Thiết kế chỉ vẽ hai thẻ nhưng hồ sơ có `titleCount` danh hiệu: phần còn lại là DỮ LIỆU MẪU do bản code sinh cố định
 * (mã, ngày cấp, hash đều bịa) để "Show all" có đủ thẻ để hiện.
 */
function withSampleDossierTitles(designed, total) {
  const names = ['Investor', 'Bridge', 'Philanthropist'];
  const codeOf = (name) => ACQUISITION.titles.find((item) => item.name === name)?.code ?? 'NFT';
  const months = ['August 02, 2026', 'July 09, 2026', 'June 17, 2026', 'May 26, 2026', 'April 14, 2026', 'March 03, 2026', 'February 11, 2026', 'January 20, 2026', 'December 08, 2025', 'November 12, 2025'];
  const extra = Array.from({ length: Math.max(0, (total ?? designed.length) - designed.length) }, (_, i) => {
    const name = names[(i + 1) % names.length];
    const serial = String(30417 + i * 7919).slice(-5);
    const hex = (n) => (n * 2654435761 % 0xffff).toString(16).toUpperCase().padStart(4, '0');
    return {
      tone: name === 'Investor' ? 'blue' : 'purple',
      name,
      tokenId: `#PW-2025-${codeOf(name)}-${serial}`,
      issueDate: months[i % months.length],
      authority: 'PW',
      hash: `0X${hex(i + 3)}…${hex(i + 11)}`,
    };
  });
  return [...designed, ...extra];
}

/** Thẻ danh hiệu được tặng trên hồ sơ công khai của người nhận, kèm dòng "Gifted by …". */
function giftTitleCard(issued, entityId) {
  return {
    tone: { Investor: 'blue', Philanthropist: 'purple', Bridge: 'green' }[issued.name] ?? 'blue',
    name: issued.name,
    tokenId: issued.titleId,
    issueDate: new Date(issued.issuedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
    authority: 'PW',
    hash: fakeTxHash(issued.titleId).toUpperCase(),
    note: `Gifted by ${issued.buyerName || 'a PW member'}`,
    revoked: isNftRevoked(entityId, issued.titleId),
  };
}

/**
 * Hồ sơ công khai của một pháp nhân, hoặc null nếu chưa có.
 *
 * Hồ sơ đã được thiết kế (`DOSSIERS`) hoặc hồ sơ tối thiểu dựng từ những gì
 * pháp nhân đã nhận ở Grant Award. Award vừa trao luôn đứng đầu.
 */
function readDossier(entityId) {
  const entity = readRegistryEntities().find((item) => item.id === entityId);
  if (!entity) return null;

  const awards = grantedAwards
    .filter((award) => award.entityId === entityId)
    .map((award) => ({ ...award, revoked: isNftRevoked(entityId, award.ref) }));
  const designed = DOSSIERS[entityId];
  if (designed) {
    // Ô đầu là "Total minted titles" — phải khớp số trên thẻ ở Public Directory.
    const stats = designed.stats.map((stat, index) => (index === 0 ? { ...stat, value: String(entity.mintedTitles) } : stat));
    return {
      entity,
      detail: {
        ...designed,
        stats,
        titleCount: entity.titleCount,
        awards: [...awards, ...designed.awards.map((award) => ({ ...award, revoked: isNftRevoked(entityId, award.ref) }))],
        // Danh hiệu được tặng (mua để tặng) đứng đầu danh sách, kèm "Gifted by …"; mẫu sinh cố định đứng sau.
        titles: [
          ...allIssuedTitles().filter((issued) => issued.isGift && issued.recipientEntityId === entityId).map((issued) => giftTitleCard(issued, entityId)),
          ...withSampleDossierTitles(designed.titles, designed.titleCount)
            .map((title) => ({ ...title, revoked: isNftRevoked(entityId, title.tokenId) })),
        ],
      },
    };
  }
  // Tài khoản đã đăng ký luôn có hồ sơ; pháp nhân khác chỉ có sau khi nhận award.
  if (entity.isRegistered) {
    // Award mẫu sẵn có trên Dashboard (kind: 'award') cũng phải hiện ở hồ sơ công khai,
    // nếu không số award ở hai nơi lệch nhau. Ngày và lời trích là dữ liệu mẫu.
    const monthOf = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
    const owned = (withMemberContext(entity.account, readMemberProfile)?.titles ?? [])
      .filter((title) => title.kind === 'award' && !awards.some((award) => award.ref === title.id))
      .map((title) => ({
        name: title.name,
        kind: 'Awarded Title',
        granted: monthOf(title.mintedAt),
        citation: ADMIN.grant.citationSuggestions[title.name]?.[0] ?? '',
        ref: title.id,
        revoked: Boolean(title.revoked),
      }));
    return { entity, detail: buildAwardedDossier(entity, [...awards, ...owned], withMemberContext(entity.account, readOwnedDossierTitles)) };
  }
  // Pháp nhân khác: có hồ sơ khi là pháp nhân mẫu của sổ hoặc đã nhận award / được tặng danh hiệu trong phiên.
  const gifts = allIssuedTitles().filter((issued) => issued.isGift && issued.recipientEntityId === entityId);
  const card = (name, tokenId, issueDate, note) => ({
    tone: { Investor: 'blue', Philanthropist: 'purple', Bridge: 'green' }[name] ?? 'blue',
    name,
    tokenId,
    issueDate,
    authority: 'PW',
    hash: fakeTxHash(tokenId).toUpperCase(),
    note,
    revoked: isNftRevoked(entityId, tokenId),
  });
  const giftTitles = gifts.map((issued) => card(
    issued.name,
    issued.titleId,
    new Date(issued.issuedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
    `Gifted by ${issued.buyerName || 'a PW member'}`,
  ));
  const sample = entity.isGenerated ? [] : sampleNftsOf(entityId);
  const sampleTitles = sample.filter((nft) => nft.kind === 'distinction').map((nft) => card(nft.name, nft.id, nft.issueDate));
  const sampleAwards = sample.filter((nft) => nft.kind === 'award').map((nft) => ({
    name: nft.name, kind: 'Awarded Title', granted: nft.granted, citation: nft.citation, ref: nft.id, revoked: isNftRevoked(entityId, nft.id),
  }));
  if (!awards.length && !giftTitles.length && !sample.length) return null;
  return { entity, detail: buildAwardedDossier(entity, [...awards, ...sampleAwards], [...giftTitles, ...sampleTitles]) };
}

/**
 * Các danh hiệu (distinction) tài khoản đã đăng ký đang sở hữu, theo dạng thẻ của hồ sơ công khai:
 * lấy từ hồ sơ Dashboard nên gồm cả danh hiệu mua trước đó lẫn danh hiệu mua trong phiên.
 * Ngày cấp lấy từ chữ "Issued <ngày>" trên Dashboard; thẻ nào không ghi ngày thì để "—".
 */
function readOwnedDossierTitles() {
  const profile = readMemberProfile();
  if (!profile) return [];

  const issuedDate = (title) => {
    const match = title.detail?.match(/Issued (\d{1,2} \w{3} \d{4})/);
    const date = title.mintedAt ? new Date(title.mintedAt) : match ? new Date(`${match[1]} UTC`) : null;
    return date && !Number.isNaN(date.getTime())
      ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
      : '—';
  };

  return profile.titles
    .filter((title) => title.kind === 'distinction')
    .map((title) => ({
      tone: { Investor: 'blue', Philanthropist: 'purple', Bridge: 'green' }[title.name] ?? 'blue',
      name: title.name,
      tokenId: title.id,
      issueDate: issuedDate(title),
      authority: 'PW',
      hash: fakeTxHash(title.id).toUpperCase(),
      note: title.note?.startsWith('Gifted by') ? title.note : undefined,
      revoked: Boolean(title.revoked),
    }));
}

/** Hồ sơ tối thiểu chỉ gồm những gì có thật: tên, award đã nhận, nơi đặt trụ sở. */
function buildAwardedDossier(entity, awards, titles = []) {
  const stats = [
    { label: 'Total minted titles', value: String(entity.mintedTitles), suffix: 'Titles (active)', suffixTone: 'green', icon: 'hexagon', iconTone: 'blue' },
    { label: 'Primary title', value: titles[0]?.name ?? awards[0]?.name ?? '—', isText: true, icon: 'rosette', iconTone: 'purple' },
  ];
  if (entity.memberSince) {
    stats.push({
      label: 'Member since',
      value: entity.memberSince.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      isText: true, icon: 'calendar', iconTone: 'ink',
    });
  }
  return {
    lei: null,
    location: entity.location,
    statusPill: 'KYC verified',
    custodyValue: 'Fully Attested',
    stats,
    awards,
    titles,
  };
}


function renderDossierTopbar(content, profile) {
  return `
  <header class="dos-top">
    <div class="dos-top-inner">
      <button class="dos-back" type="button" id="dos-back">
        ${ICONS.arrowLeft}${escapeHtml(content.backLabel)}
      </button>
      ${renderAccountMenu(DASHBOARD, profile)}
    </div>
  </header>`;
}

function renderDossierStat(stat) {
  const suffix = stat.suffix
    ? `<span class="dos-stat-suffix${stat.suffixTone ? ` ink-${escapeHtml(stat.suffixTone)}` : ''}">${escapeHtml(stat.suffix)}</span>`
    : '';

  return `
    <section class="dos-stat">
      <h3 class="dos-stat-label">
        <span class="dos-stat-icon ink-${escapeHtml(stat.iconTone)}">${ICONS[stat.icon]}</span>
        ${escapeHtml(stat.label)}
      </h3>
      <p class="dos-stat-value">
        <b class="${stat.isText ? 'is-text' : ''}${stat.valueTone ? ` ink-${escapeHtml(stat.valueTone)}` : ''}">${escapeHtml(stat.value)}</b>
        ${suffix}
      </p>
    </section>`;
}

function renderDossierHero(content, entity, detail) {
  return `
  <section class="dos-hero">
    <div class="dos-identity">
      <span class="dos-seal" aria-hidden="true">
        ${ICONS.shieldMark}
        <i class="dos-seal-check">${ICONS.checkBadge}</i>
      </span>

      <div class="dos-identity-body">
        <h1>
          ${escapeHtml(entity.name)}
          <span class="pill pill-green"><i class="dot"></i>${escapeHtml(detail.statusPill)}</span>
          ${entity.rank == null ? '' : `<span class="pill pill-blue">${escapeHtml(content.rankPrefix)} #${String(entity.rank).padStart(2, '0')}</span>`}
        </h1>
        <p class="dos-meta">
          <span>${escapeHtml(content.idPrefix)} ${escapeHtml(entity.id)}${renderCopyIcon(entity.id, 'Copy entity ID')}</span>
          ${detail.lei ? `<span>${escapeHtml(content.leiPrefix)} ${escapeHtml(detail.lei)}</span>` : ''}
          <span class="dos-place">${ICONS.pin}${escapeHtml(detail.location)}</span>
        </p>
      </div>

      <p class="dos-custody">
        <span>
          <span class="dos-custody-label">${escapeHtml(content.custodyLabel)}</span>
          <b>${escapeHtml(detail.custodyValue)}</b>
        </span>
        <i class="dos-custody-mark">${ICONS.gavel}</i>
      </p>
    </div>

    <div class="dos-stats">${detail.stats.map(renderDossierStat).join('')}</div>
  </section>`;
}

function renderDossierAward(award, content) {
  return `
    <article class="dos-award">
      <div class="dos-award-head">
        <span class="dos-award-mark" aria-hidden="true">${ICONS.medal}</span>
        <span class="dos-award-who">
          <b>${escapeHtml(award.name)}</b>
          <span>${escapeHtml(award.kind)}</span>
        </span>
        <span class="dos-award-when">
          <span>${escapeHtml(content.grantedLabel)}</span>
          <b>${escapeHtml(award.granted)}</b>
        </span>
      </div>

      <div class="dos-award-pills">
        ${award.revoked
          ? `<span class="pill pill-red">${escapeHtml(ADMIN.revoke.dashboardEntry.revokedPill.label)}</span>`
          : `<span class="pill pill-green">${ICONS.sparkle}${escapeHtml(content.sourcePill)}</span>`}
      </div>

      <p class="dos-award-citation">${escapeHtml(award.citation)}</p>

      <p class="dos-award-foot">
        <span>${escapeHtml(content.refPrefix)} <b>${escapeHtml(award.ref)}</b>${renderCopyIcon(award.ref, 'Copy award ID')}</span>
        <button class="dos-award-verify" type="button">
          ${escapeHtml(content.verifyLabel)}${ICONS.arrowRight}
        </button>
      </p>
    </article>`;
}

function renderDossierAwards(content, awards) {
  return `
  <section class="dos-awards">
    <header class="dos-awards-head">
      <span class="dos-awards-mark" aria-hidden="true">${ICONS.medal}</span>
      <h2>${escapeHtml(content.heading)}</h2>
      <span class="pill pill-blue">${escapeHtml(countLabel(awards.filter((award) => !award.revoked).length, content.countSuffix))}</span>
    </header>
    <p class="dos-awards-lead">${escapeHtml(content.lead)}</p>

    <div class="dos-award-grid">
      ${awards.map((award) => renderDossierAward(award, content)).join('')}
    </div>
  </section>`;
}

function renderDossierTitle(title, content) {
  return `
    <article class="dos-title">
      <header class="dos-title-head">
        <h3>${escapeHtml(title.name)}</h3>
        ${title.revoked
          ? `<span class="dos-title-status is-revoked">${escapeHtml(ADMIN.revoke.dashboardEntry.revokedPill.label)}</span>`
          : `<span class="dos-title-status">${ICONS.check}${escapeHtml(content.statusLabel)}</span>`}
      </header>

      <p class="dos-token">
        <span>
          <span class="dos-token-label">${escapeHtml(content.tokenLabel)}</span>
          <b>${escapeHtml(title.tokenId)}</b>${renderCopyIcon(title.tokenId, 'Copy Title ID')}
        </span>
        <span class="dos-token-standard ink-${escapeHtml(title.tone)}">
          <i class="dot"></i>${escapeHtml(content.standardPill)}
        </span>
      </p>

      <dl class="dos-title-facts">
        <div>
          <dt>${escapeHtml(content.issueDateLabel)}</dt>
          <dd>${escapeHtml(title.issueDate)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(content.authorityLabel)}</dt>
          <dd>${escapeHtml(title.authority)}</dd>
        </div>
      </dl>

      ${title.note ? `<p class="dos-title-note">${ICONS.gift}${escapeHtml(title.note)}</p>` : ''}

      <p class="dos-title-foot">
        <span class="dos-hash">${ICONS.fingerprint}${escapeHtml(content.hashLabel)} ${escapeHtml(title.hash)}</span>
        <button class="dos-title-verify" type="button">
          ${escapeHtml(content.verifyLabel)}${ICONS.arrowRight}
        </button>
      </p>
    </article>`;
}

function renderDossierTitles(content, detail) {
  // Mặc định bày sáu thẻ; nút "Show all" đếm theo tổng số danh hiệu của pháp nhân và mở hết các thẻ.
  const total = detail.titleCount ?? detail.titles.length;
  if (!detail.titles.length) return '';
  const showAll = dossierShowAllFor === dossierEntityId;
  const shown = showAll ? detail.titles : detail.titles.slice(0, DOSSIER_TITLES_SHOWN);

  return `
  <section class="dos-titles">
    <header class="dos-titles-head">
      <h2>${escapeHtml(content.heading)}</h2>
      <span class="dos-standard">${ICONS.padlock}${escapeHtml(content.standardLabel)}</span>
    </header>

    <div class="dos-title-grid">
      ${shown.map((title) => renderDossierTitle(title, content)).join('')}
    </div>

    ${total > shown.length ? `<p class="dos-show-all">
      <button type="button" id="dos-show-all">${escapeHtml(content.showAllLabel.replace('{total}', total))}</button>
    </p>` : ''}
  </section>`;
}

/** Thân hồ sơ — dùng chung cho bản đã đăng nhập và bản công khai. */
function renderDossierBody(content, entity, detail) {
  return `
        <nav class="dos-crumb" aria-label="Breadcrumb">
          <p>
            <span>${escapeHtml(content.crumbLabel)}</span>
            <i aria-hidden="true">/</i>
            <b>${escapeHtml(entity.id)}</b>${renderCopyIcon(entity.id, 'Copy entity ID')}
          </p>
          <span class="dos-crumb-actions">
            <button class="dos-action" type="button" data-share-entity="${escapeHtml(entity.id)}">${ICONS.share}<span>${escapeHtml(content.shareLabel)}</span></button>
          </span>
        </nav>

        ${renderDossierHero(content, entity, detail)}
        ${renderDossierAwards(content.awards, detail.awards)}
        ${renderDossierTitles(content.titles, detail)}`;
}

function renderDossierPage(content) {
  const { profile, options } = readShellContext();
  if (!profile) return renderSignedOutGuard();

  const record = readDossier(dossierEntityId);
  // Guard ở router đã chặn, nhánh này chỉ để không bao giờ dựng màn rỗng.
  if (!record) return renderSignedOutGuard();

  return renderDashboardShell(profile, '#/directory', renderDossierBody(content, record.entity, record.detail), {
    ...options,
    modifier: 'dash-dossier',
    topbar: renderDossierTopbar(content, profile),
  });
}

/* ------------------------------------------------------------
   Bản công khai — vào từ nút "View profile" ở #/public-directory.
   Đo từ design/PW — Public Directory (Profile_ Aurelia Capital).png.

   Khác bản đã đăng nhập đúng hai chỗ:
   · khung bọc là thanh trên + chân trang của landing, và dải
     "Return to Public Directory" trải hết bề ngang (không nằm
     trong cột như bản đã đăng nhập);
   · thân hồ sơ dựng ở cột 926 rồi PHÓNG 1.28 lần thành 1184 —
     đúng cách thiết kế làm, xem README.
   ------------------------------------------------------------ */

function renderPublicDossierPage(content) {
  const record = readDossier(dossierEntityId);
  if (!record) return '';

  return [
    renderTopbar(LANDING, '#/public-entity'),
    `
    <div class="dos-return">
      <div class="wrap">
        <button class="dos-back" type="button" id="dos-back">
          ${ICONS.arrowLeft}${escapeHtml(content.backLabel)}
        </button>
      </div>
    </div>

    <main class="dash dos-public">
      <div class="wrap">
        <div class="dos-scale">${renderDossierBody(content, record.entity, record.detail)}</div>
      </div>
    </main>`,
    renderFooter(LANDING),
  ].join('');
}

function bindDossierShowAll() {
  document.getElementById('dos-show-all')?.addEventListener('click', () => {
    dossierShowAllFor = dossierEntityId;
    const scrollY = window.scrollY;
    renderCurrentRoute();
    window.scrollTo(0, scrollY);
  });
}

function bindPublicDossierPage() {
  document.getElementById('dos-back')?.addEventListener('click', () => navigateTo('#/public-directory'));
  bindDossierShowAll();
}

function bindDossierPage() {
  bindDashboardShell();
  document.getElementById('dos-back')?.addEventListener('click', () => navigateTo('#/directory'));
  bindDossierShowAll();
}


/* ============================================================
   MÀN ADMIN PORTAL — KYC REVIEW
   ------------------------------------------------------------
   Đo từ design/PW — Admin Portal (KYC Review).png.
   Tuyến #/admin, chỉ vai admin vào được (xem guard ở router).

   Dùng chung khung .dash nhưng đổi ba chỗ: thanh bên chỉ hai mục,
   thanh trên thêm chữ "ADMIN" ở mép trái, và thanh trên có nền tối
   hơn kèm vạch chia.

   Hàng đợi KYC là dữ liệu mẫu tĩnh — chưa có nút Duyệt / Từ chối vì
   thiết kế không vẽ. Xem README.
   ============================================================ */

/** Hồ sơ hiển thị ở thanh bên cho vai admin — không đọc tài khoản đã đăng ký. */
function readAdminProfile() {
  return {
    name: ADMIN_ACCOUNT.name,
    wallets: [{ addressLabel: ADMIN_ACCOUNT.walletLabel }],
  };
}

/* `currentRoute` để tô mục đang mở. Mục có `route` thì bấm được; ba mục
   còn lại chưa có thiết kế nên giữ hình thức, bấm không đi đâu. */
function renderAdminModules(content, currentRoute = '#/admin') {
  const items = content.items
    .map(({ label, icon, route, tone }) => {
      const isCurrent = route === currentRoute;
      return `
      <li>
        <button class="adm-module${isCurrent ? ' is-current' : ''}${tone === 'danger' ? ' is-danger' : ''}" type="button"
                ${route ? `data-module="${escapeHtml(route)}"` : ''}
                ${isCurrent ? 'aria-current="true"' : ''}>
          ${ICONS[icon]}<span>${escapeHtml(label)}</span>
        </button>
      </li>`;
    })
    .join('');

  return `
    <nav class="card adm-modules" aria-label="${escapeHtml(content.heading)}">
      <h2>${escapeHtml(content.heading)}</h2>
      <ul>${items}</ul>
    </nav>`;
}

/** Mục module nào có tuyến thì bấm được — dùng chung cho ba màn admin. */
function bindAdminModules() {
  document.querySelectorAll('[data-module]').forEach((button) => {
    button.addEventListener('click', () => navigateTo(button.dataset.module));
  });
}

function renderAdminActivity(content) {
  const stats = content.stats
    .map(({ label, value, tone, countsIssued, countsRevoked }) => `
      <div class="adm-stat">
        <span class="adm-stat-label">${escapeHtml(label)}</span>
        <b${tone ? ` class="ink-${escapeHtml(tone)}"` : ''}>${escapeHtml(countsIssued ? formatPoints(readRegistryTitleTotal()) : countsRevoked ? formatPoints(Number(value) + revokedNfts.length) : value)}</b>
      </div>`)
    .join('');

  return `
    <section class="card adm-activity">
      <span class="pill pill-green">${escapeHtml(content.pill)}</span>
      <div class="adm-stat-grid">${stats}</div>
    </section>`;
}

function renderAdminQueueRow(row, content) {
  return `
    <div class="adm-row" role="row">
      <span class="adm-cell adm-who" role="cell">
        ${row.reviewId
          ? `<button class="adm-open" type="button" data-review="${escapeHtml(row.reviewId)}">${escapeHtml(row.name)}</button>`
          : `<b>${escapeHtml(row.name)}</b>`}
        <span>${escapeHtml(row.registry)} · ${escapeHtml(row.place)}</span>
      </span>
      <span class="adm-cell" role="cell">
        <span class="pill">${escapeHtml(row.type)}</span>
      </span>
      <span class="adm-cell adm-when" role="cell">
        <span>${escapeHtml(row.ago)}</span>
        <b>${ICONS.clock}${escapeHtml(row.submittedAt)}</b>
      </span>
      <span class="adm-cell adm-docs" role="cell">
        ${ICONS.file}
        <span class="adm-doc-name">${escapeHtml(row.document)}</span>
        <button class="adm-doc-view" type="button">[${escapeHtml(content.viewLabel)}]</button>
      </span>
    </div>`;
}

function renderAdminQueue(content) {
  const head = content.columns
    .map((label) => `<span class="adm-cell" role="columnheader">${escapeHtml(label)}</span>`)
    .join('');

  const rows = readReviewQueue();
  const body = rows.length
    ? `<div class="adm-table" role="table">
         <div class="adm-row adm-row-head" role="row">${head}</div>
         ${rows.map((row) => renderAdminQueueRow(row, content)).join('')}
       </div>`
    : `<div class="card adm-empty">
         <div class="empty">
           <span class="empty-icon">${ICONS.userCheck}</span>
           <p class="empty-heading">${escapeHtml(content.empty.heading)}</p>
           <p class="empty-body">${escapeHtml(content.empty.body)}</p>
         </div>
       </div>`;

  return `
    <section class="adm-queue">
      <header class="card adm-queue-head">
        <div>
          <h2>${escapeHtml(content.heading)}</h2>
          <p>${escapeHtml(content.lead)}</p>
        </div>
        <span class="adm-queue-tools">
          <button class="adm-filter" type="button">${ICONS.filter}${escapeHtml(content.filterLabel)}</button>
          <button class="adm-refresh" type="button"
                  aria-label="${escapeHtml(content.refreshLabel)}">${ICONS.refresh}</button>
        </span>
      </header>
      ${body}
    </section>`;
}

/** Đầu trang — dùng chung cho #/admin và #/admin-review. Số hồ sơ chờ
    duyệt đếm theo hàng đợi THẬT nên duyệt xong là con số giảm theo. */
function renderAdminHead(content) {
  return `
        <header class="adm-head">
          <div>
            <h1>${escapeHtml(content.heading)}</h1>
            <p class="adm-lead">${escapeHtml(content.lead)}</p>
          </div>
          <p class="adm-pending">
            ${ICONS.shieldUser}
            <span>
              <span class="adm-pending-label">${escapeHtml(content.pending.label)}</span>
              <b>${escapeHtml(countLabel(readReviewQueue().length, content.pending.valueSuffix))}</b>
            </span>
          </p>
        </header>`;
}

function renderAdminPage(content) {
  const body = `
        ${renderAdminHead(content)}

        <div class="adm-grid">
          <div class="adm-side">
            ${renderAdminModules(content.modules)}
            ${renderAdminActivity(content.activity)}
          </div>

          <div class="adm-main">
            ${renderAdminQueue(content.queue)}

            <section class="card adm-protocols">
              <h2>${ICONS.info}${escapeHtml(content.protocols.heading)}</h2>
              ${content.protocols.lines.map((line) => `<p>${escapeHtml(line)}</p>`).join('')}
            </section>
          </div>
        </div>`;

  return renderDashboardShell(readAdminProfile(), '#/admin', body, {
    modifier: 'dash-admin',
    topbarLabel: content.topbarLabel,
    nav: content.nav,
  });
}

function bindAdminPage() {
  bindDashboardShell();
  bindAdminModules();

  /* Chỉ dòng đã có hồ sơ được thiết kế mới mang data-review. Hai dòng còn
     lại giữ nguyên tên nhưng không bấm được. */
  document.querySelectorAll('[data-review]').forEach((button) => {
    button.addEventListener('click', () => {
      reviewId = button.dataset.review;
      reviewVerifiedCount = '';
      reviewChangeReason = '';
      reviewChangeNote = '';
      reviewRejectReason = '';
      reviewMessage = '';
      reviewInternalNote = '';
      reviewError = null;
      navigateTo('#/admin-review');
    });
  });
}


/* ============================================================
   MÀN DUYỆT MỘT HỒ SƠ KYC
   ------------------------------------------------------------
   Đo từ design/PW — Admin Portal (KYC Review — Vance Holdings SA).png.
   Tuyến #/admin-review, chỉ vai admin. Vào bằng cách bấm tên pháp
   nhân trong hàng đợi ở #/admin.

   Dùng lại y nguyên khung và cột trái của #/admin; chỉ cột phải đổi
   nội dung. Mọi trạng thái chỉ sống trong phiên xem trang, giống các
   màn khác — tải lại là mất và guard đẩy về #/admin.

   Nguyên tắc "user chưa thao tác thì để trống" áp dụng đủ: thiết kế
   vẽ sẵn 3,200 nhân sự, lý do đổi Class và ô chọn lý do từ chối đang
   mở — bản code để trống hết. Xem README.
   ============================================================ */

let reviewId = null;
let reviewVerifiedCount = '';
let reviewChangeReason = '';
let reviewChangeNote = '';
let reviewRejectReason = '';
let reviewMessage = '';
let reviewInternalNote = '';
let reviewError = null;
/* Hồ sơ đã quyết định xong — biến mất khỏi hàng đợi */
let handledReviewIds = [];

/* Hồ sơ KYC thật do thành viên đã đăng ký nộp — khác ba dòng mẫu của thiết kế.
   Mã hồ sơ = tiền tố + email viết thường của thành viên. */
const SUBMITTED_REVIEW_PREFIX = 'submitted:';

function formatQueueAgo(iso) {
  const minutes = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (minutes < 1) return 'Just Now';
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'Min' : 'Mins'} Ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? 'Hour' : 'Hours'} Ago`;
  return hours < 48 ? 'Yesterday' : `${Math.floor(hours / 24)} Days Ago`;
}

/** Hồ sơ đang chờ duyệt của MỘT tài khoản đã đăng ký, dựng từ bản ghi tài khoản. Không có thì null. */
function buildSubmittedReview(account) {
  if (!account || account.kycStatus !== 'review' || !account.kycSubmittedAt) return null;
  const reviewId = `${SUBMITTED_REVIEW_PREFIX}${AccountStore.keyOf(account)}`;
  const submission = account.kycSubmission ?? {};
  const documents = submission.documents ?? [];
  const iso = account.kycSubmittedAt;
  const when = new Date(iso);
  const month = when.toLocaleDateString('en-GB', { month: 'short' });
  const isCompany = account.accountType !== 'individual';
  const bracket = findHeadcountBracket(account.headcountBracketId);
  return {
    reviewId,
    name: account.legalName,
    statusPill: account.country,
    tagline: `${isCompany ? 'Authorized representative' : 'Individual account'} \u00b7 ${isCompany ? account.representative : account.email}`,
    uid: `${ADMIN.review.submittedUidPrefix}${kycReferenceNumber(account).slice(1)}`,
    submittedAt: `${iso.slice(0, 10)} ${iso.slice(11, 16)} UTC`,
    // Cận dưới của Class đã gán lúc đăng ký — hai bảng bậc giờ trùng nhau.
    declaredCount: ADMIN.review.companyClass.classes.find((c) => c.index === (account.classIndex ?? 0))?.min ?? 1,
    facts: [
      { label: isCompany ? 'Legal entity name' : 'Full name', value: account.legalName },
      { label: 'Registry / document no.', value: submission.documentId ?? '\u2014' },
      { label: 'Jurisdiction',           value: account.country },
      { label: 'Document type',          value: submission.documentType ?? '\u2014' },
      { label: isCompany ? 'Authorized representative' : 'Account type', value: isCompany ? account.representative : 'Individual' },
      { label: 'Declared headcount',     value: isCompany ? (bracket?.label ?? '\u2014') : 'Not applicable' },
    ],
    documents: documents.map(({ name, sizeLabel }) => ({
      name, meta: `${sizeLabel} \u00b7 ${ADMIN.review.submittedDocumentNote}`, state: ADMIN.review.submittedDocumentState, icon: 'file',
    })),
    queueRow: {
      reviewId,
      name: account.legalName,
      registry: submission.documentId ?? '\u2014',
      place: account.country,
      type: isCompany ? 'Enterprise' : 'Individual',
      ago: formatQueueAgo(iso),
      submittedAt: `${when.getDate()} ${month} ${when.getFullYear()}, ${when.toTimeString().slice(0, 5)}`,
      document: documents[0]?.name ?? '\u2014',
    },
  };
}

/** Mọi hồ sơ thật đang chờ duyệt, nộp gần nhất đứng đầu. */
function readSubmittedReviews() {
  return AccountStore.registeredList()
    .map(buildSubmittedReview)
    .filter(Boolean)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

function isSubmittedReviewId(id) {
  return typeof id === 'string' && id.startsWith(SUBMITTED_REVIEW_PREFIX);
}

function readReview(id) {
  if (isSubmittedReviewId(id)) {
    return buildSubmittedReview(AccountStore.registeredByKey(id.slice(SUBMITTED_REVIEW_PREFIX.length)));
  }
  return ADMIN.reviews[id] ?? null;
}

/** Hàng đợi còn lại: các hồ sơ thật lên đầu, rồi các dòng mẫu chưa quyết định. */
function readReviewQueue() {
  return [
    ...readSubmittedReviews().map((review) => review.queueRow),
    ...ADMIN.queue.rows.filter((row) => !handledReviewIds.includes(row.reviewId)),
  ];
}

/** Bậc Class ứng với một số nhân sự. Trả về null nếu số không hợp lệ. */
function classIndexForHeadcount(count) {
  if (!Number.isFinite(count) || count < 1) return null;
  const found = ADMIN.review.companyClass.classes
    .find(({ min, max }) => count >= min && (max === null || count <= max));
  return found ? found.index : null;
}

/** Số nhân sự admin đã gõ, bỏ dấu phẩy. Chuỗi rỗng trả về null. */
function readVerifiedCount() {
  const digits = reviewVerifiedCount.replace(/[^\d]/g, '');
  return digits === '' ? null : Number(digits);
}

/**
 * Tính Class khai báo, Class sau khi đối chiếu tài liệu và có đổi hay không.
 * Chưa gõ gì thì Class sau = Class khai báo, coi như chưa đổi.
 */
function calculateReviewClass(detail) {
  const declaredIndex = classIndexForHeadcount(detail.declaredCount);
  const verifiedCount = readVerifiedCount();
  const verifiedIndex = verifiedCount === null ? null : classIndexForHeadcount(verifiedCount);
  const resultIndex = verifiedIndex ?? declaredIndex;
  return {
    declaredIndex,
    verifiedCount,
    resultIndex,
    hasChanged: verifiedIndex !== null && verifiedIndex !== declaredIndex,
  };
}

function findReviewClass(index) {
  return ADMIN.review.companyClass.classes.find((item) => item.index === index) ?? null;
}

function renderReviewFact(fact) {
  const glyph = fact.icon ? ICONS[fact.icon] : '';
  return `
    <div class="rev-fact">
      <span class="rev-fact-label">${escapeHtml(fact.label)}</span>
      <b${fact.tone ? ` class="ink-${escapeHtml(fact.tone)}"` : ''}>${glyph}${escapeHtml(fact.value)}</b>
    </div>`;
}

function renderReviewDocument(doc, content) {
  return `
    <div class="rev-doc">
      <span class="rev-doc-mark" aria-hidden="true">${ICONS[doc.icon]}</span>
      <span class="rev-doc-body">
        <b>${escapeHtml(doc.name)}</b>
        <span>${escapeHtml(doc.meta)}</span>
      </span>
      <span class="pill pill-green rev-doc-state">${escapeHtml(doc.state)}</span>
      <button class="rev-doc-view" type="button">
        ${escapeHtml(content.viewLabel)}${ICONS.linkOut}
      </button>
    </div>`;
}

function renderReviewClassTile(item, content, state) {
  const isResult = item.index === state.resultIndex;
  const isDeclared = item.index === state.declaredIndex;

  return `
    <div class="rev-class${isResult ? ' is-on' : ''}">
      ${isResult ? `<span class="rev-class-flag">${escapeHtml(content.recommendedLabel)}${ICONS.checkMark}</span>` : ''}
      <b>${escapeHtml(content.classPrefix)} ${item.index} · ${escapeHtml(item.range)}</b>
      <span>${escapeHtml(item.name)} · ${escapeHtml(content.tierPrefix)} ${item.index}</span>
      ${isResult && isDeclared ? `<span class="rev-class-match">${escapeHtml(content.matchLabel)}</span>` : ''}
    </div>`;
}

function renderReviewClassCard(content, detail, state) {
  const { verify } = content;

  const reasons = verify.reasons
    .map((label) => `<option value="${escapeHtml(label)}"${label === reviewChangeReason ? ' selected' : ''}>${escapeHtml(label)}</option>`)
    .join('');

  return `
    <section class="card rev-classes">
      <header class="rev-card-head">
        <h2><span class="rev-card-mark">${ICONS.badge}</span>${escapeHtml(content.heading)}</h2>
        <span class="rev-card-note ink-blue">${escapeHtml(content.note)}</span>
      </header>

      <div class="rev-class-grid">
        ${content.classes.map((item) => renderReviewClassTile(item, content, state)).join('')}
      </div>

      <h3 class="rev-sub">${escapeHtml(verify.heading)}</h3>

      <div class="rev-verify">
        <span class="rev-verify-cell">
          <span class="rev-fact-label">${escapeHtml(verify.declaredLabel)}</span>
          <b>${detail.declaredCount} · ${escapeHtml(content.classPrefix)} ${state.declaredIndex}</b>
        </span>
        <i class="rev-verify-arrow" aria-hidden="true">${ICONS.arrowRight}</i>
        <span class="rev-verify-cell">
          <span class="rev-fact-label">${escapeHtml(verify.verifiedLabel)}</span>
          <span class="rev-verify-input">
            <input type="text" inputmode="numeric" id="rev-count"
                   value="${escapeHtml(reviewVerifiedCount)}"
                   placeholder="${escapeHtml(verify.verifiedPlaceholder)}"
                   aria-label="${escapeHtml(verify.verifiedLabel)}">
            <span>${escapeHtml(verify.verifiedUnit)}</span>
          </span>
        </span>
        <span class="rev-verify-cell">
          <span class="rev-fact-label">${escapeHtml(verify.resultLabel)}</span>
          <b>${escapeHtml(content.classPrefix)} ${state.resultIndex}</b>
        </span>
        ${state.hasChanged ? `<span class="pill pill-red rev-changed"><i class="dot"></i>${escapeHtml(verify.changedPill)}</span>` : ''}
      </div>

      <p class="rev-field-label">
        ${escapeHtml(verify.reasonLabel)} <b class="ink-red">*</b>
        <span>${escapeHtml(verify.reasonHint)}</span>
      </p>
      <select class="rev-select${reviewError === 'changeReason' ? ' has-error' : ''}" id="rev-change-reason">
        <option value="">${escapeHtml(verify.reasonPlaceholder)}</option>
        ${reasons}
      </select>

      <textarea class="rev-textarea" id="rev-change-note" rows="2"
                placeholder="${escapeHtml(verify.notePlaceholder)}">${escapeHtml(reviewChangeNote)}</textarea>
    </section>`;
}

function renderReviewDecision(content, state) {
  const reasons = content.rejectionReasons
    .map(({ label, hint }) => `<option value="${escapeHtml(label)}"${label === reviewRejectReason ? ' selected' : ''}>${escapeHtml(label)} — ${escapeHtml(hint)}</option>`)
    .join('');

  const { warning } = content;
  const isRaise = state.resultIndex > state.declaredIndex;
  const lead = warning.lead
    .replace('{dir}', isRaise ? warning.raise : warning.lower)
    .replace('{from}', state.declaredIndex)
    .replace('{to}', state.resultIndex);

  return `
    <section class="card rev-decision">
      <header class="rev-card-head">
        <h2><span class="rev-card-mark is-blue">${ICONS.checkMark}</span>${escapeHtml(content.heading)}</h2>
      </header>

      <p class="rev-field-label">
        ${escapeHtml(content.rejectionLabel)} <b class="ink-red">*</b>
        <span>${escapeHtml(content.rejectionHint)}</span>
      </p>
      <select class="rev-select${reviewError === 'rejectReason' ? ' has-error' : ''}" id="rev-reject-reason">
        <option value="">${escapeHtml(content.rejectionPlaceholder)}</option>
        ${reasons}
      </select>

      <textarea class="rev-textarea" id="rev-message" rows="3"
                placeholder="${escapeHtml(content.messagePlaceholder)}">${escapeHtml(reviewMessage)}</textarea>

      <p class="rev-field-label is-divided">
        ${escapeHtml(content.internalLabel)}
        <span>${escapeHtml(content.internalHint)}</span>
      </p>
      <textarea class="rev-textarea" id="rev-internal" rows="3"
                placeholder="${escapeHtml(content.internalPlaceholder)}">${escapeHtml(reviewInternalNote)}</textarea>

      ${state.hasChanged ? `
        <p class="rev-warning">
          ${ICONS.alert}
          <span><b>${escapeHtml(lead)}</b> ${escapeHtml(warning.rule)}</span>
        </p>` : ''}

      ${reviewError ? `<p class="rev-error">${ICONS.alert}${escapeHtml(reviewError === 'changeReason' ? ADMIN.review.companyClass.verify.missingReason : content.missingRejection)}</p>` : ''}

      <div class="rev-actions">
        <button class="rev-draft" type="button" id="rev-draft">${escapeHtml(content.draftLabel)}</button>
        <button class="rev-reject" type="button" id="rev-reject">${ICONS.close}${escapeHtml(content.rejectLabel)}</button>
        <button class="rev-approve" type="button" id="rev-approve">${ICONS.checkMark}${escapeHtml(content.approveLabel)}</button>
      </div>
    </section>`;
}

function renderAdminReviewPage(content) {
  const detail = readReview(reviewId);
  if (!detail) return renderSignedOutGuard();

  const review = content.review;
  const state = calculateReviewClass(detail);

  const body = `
        ${renderAdminHead(content)}

        <div class="adm-grid">
          <div class="adm-side">
            ${renderAdminModules(content.modules)}
            ${renderAdminActivity(content.activity)}
          </div>

          <div class="adm-main">
            <nav class="rev-bar">
              <button class="rev-back" type="button" id="rev-back">
                ${ICONS.arrowLeft}${escapeHtml(review.backLabel)}
              </button>
              <span class="rev-submitted">${ICONS.clock}${escapeHtml(review.submittedLabel)} ${escapeHtml(detail.submittedAt)}</span>
              <span class="pill pill-purple"><i class="dot"></i>${escapeHtml(review.statusPill)}</span>
            </nav>

            <section class="card rev-entity">
              <header class="rev-entity-head">
                <span class="rev-entity-mark" aria-hidden="true">${ICONS.building}</span>
                <span class="rev-entity-who">
                  <b>${escapeHtml(detail.name)}
                    <span class="pill pill-green">${escapeHtml(detail.statusPill)}</span>
                  </b>
                  <span>${escapeHtml(detail.tagline)}</span>
                </span>
              </header>
              <p class="rev-uid">${escapeHtml(review.uidLabel)} <b>${escapeHtml(detail.uid)}</b></p>
              <div class="rev-facts">${detail.facts.map(renderReviewFact).join('')}</div>
            </section>

            <section class="card rev-docs">
              <header class="rev-card-head">
                <h2><span class="rev-card-mark">${ICONS.folder}</span>${escapeHtml(review.documents.heading)}</h2>
                <span class="rev-card-note">${escapeHtml(countLabel(detail.documents.length, review.documents.countSuffix))}</span>
              </header>
              <div class="rev-doc-list">
                ${detail.documents.map((doc) => renderReviewDocument(doc, review.documents)).join('')}
              </div>
            </section>

            ${renderReviewClassCard(review.companyClass, detail, state)}
            ${renderReviewDecision(review.decision, state)}

            <p class="rev-protocols">${ICONS.info}${escapeHtml(review.protocols)}</p>
          </div>
        </div>`;

  return renderDashboardShell(readAdminProfile(), '#/admin', body, {
    modifier: 'dash-admin',
    topbarLabel: content.topbarLabel,
    nav: content.nav,
  });
}

function bindAdminReviewPage() {
  bindDashboardShell();
  bindAdminModules();

  const back = () => navigateTo('#/admin');
  document.getElementById('rev-back')?.addEventListener('click', back);
  document.getElementById('rev-draft')?.addEventListener('click', back);

  const count = document.getElementById('rev-count');
  count?.addEventListener('input', () => {
    reviewVerifiedCount = count.value;
    reviewError = null;
    renderCurrentRoute();
    // Dựng lại cả tuyến nên phải trả con trỏ về ô vừa gõ.
    const next = document.getElementById('rev-count');
    next?.focus();
    next?.setSelectionRange(next.value.length, next.value.length);
  });

  document.getElementById('rev-change-reason')?.addEventListener('change', (event) => {
    reviewChangeReason = event.target.value;
    reviewError = null;
    renderCurrentRoute();
  });
  document.getElementById('rev-reject-reason')?.addEventListener('change', (event) => {
    reviewRejectReason = event.target.value;
    reviewError = null;
    renderCurrentRoute();
  });

  // Ba ô chữ chỉ cần nhớ nội dung, không cần dựng lại trang
  document.getElementById('rev-change-note')?.addEventListener('input', (e) => { reviewChangeNote = e.target.value; });
  document.getElementById('rev-message')?.addEventListener('input', (e) => { reviewMessage = e.target.value; });
  document.getElementById('rev-internal')?.addEventListener('input', (e) => { reviewInternalNote = e.target.value; });

  /* Hai điều kiện bắt buộc lấy thẳng từ dấu * trong thiết kế:
     đổi Class thì phải có lý do, từ chối thì phải chọn lý do. */
  const finish = (decision) => {
    // Hồ sơ thật thì ghi quyết định lên tài khoản — thành viên thấy ở phiên của họ.
    if (isSubmittedReviewId(reviewId)) {
      const key = reviewId.slice(SUBMITTED_REVIEW_PREFIX.length);
      const state = calculateReviewClass(readReview(reviewId));
      if (decision === 'approve') AccountStore.decideKyc(key, { approved: true, classIndex: state.resultIndex });
      else AccountStore.decideKyc(key, { approved: false, reason: reviewRejectReason, message: reviewMessage.trim() });
    }
    kycDecisions = [...kycDecisions, {
      reviewId, name: readReview(reviewId)?.name ?? reviewId, decision, at: new Date(),
      reason: decision === 'approve' ? reviewChangeReason : reviewRejectReason,
    }];
    if (!isSubmittedReviewId(reviewId)) handledReviewIds = [...handledReviewIds, reviewId];
    reviewId = null;
    navigateTo('#/admin');
  };

  document.getElementById('rev-approve')?.addEventListener('click', () => {
    const detail = readReview(reviewId);
    if (calculateReviewClass(detail).hasChanged && !reviewChangeReason) {
      reviewError = 'changeReason';
      renderCurrentRoute();
      return;
    }
    finish('approve');
  });

  document.getElementById('rev-reject')?.addEventListener('click', () => {
    if (!reviewRejectReason) {
      reviewError = 'rejectReason';
      renderCurrentRoute();
      return;
    }
    finish('reject');
  });
}


/* ============================================================
   MÀN GRANT AWARD
   ------------------------------------------------------------
   Đo từ design/PW — Admin Portal (Grant Award).png.
   Tuyến #/admin-award, chỉ vai admin. Vào bằng mục "2. Grant
   Award" ở cột trái.

   Dùng lại y nguyên khung, đầu trang và cột trái của #/admin;
   chỉ cột phải đổi nội dung.

   Nguyên tắc "user chưa thao tác thì để trống": thiết kế vẽ sẵn
   mã tra cứu, pháp nhân đã tìm thấy và lời trích — bản code để
   trống hết, pháp nhân chỉ hiện sau khi bấm Find.
   ============================================================ */

let awardQuery = '';
let awardRecipient = null;
let awardCategory = ADMIN.grant.defaultCategory;
let awardCitation = '';
let awardError = null;

/** Lần trao đang chạy ở màn phát hành; null khi chưa bấm Grant Award. */
let pendingGrant = null;

/** Mọi award đã trao trong phiên xem trang, mới nhất đứng đầu — hồ sơ pháp nhân đọc từ đây. */
let grantedAwards = [];
let grantTimer = null;

/**
 * Pháp nhân tra được: tài khoản đã đăng ký trong trình duyệt này cùng các
 * pháp nhân trong sổ đăng ký công khai. Chỉ tài khoản đăng ký mới có class
 * và ví (dữ liệu mẫu ở `registeredRecipient`) — sổ đăng ký không có hai thứ đó.
 */
function listAwardCandidates() {
  // Sổ công khai (kể cả pháp nhân mẫu vừa được duyệt KYC) + hồ sơ KYC mẫu chưa được duyệt hoặc đã bị từ chối.
  const candidates = readRegistryEntities().filter((entity) => !entity.isRegistered).map(({ id, name, type }) => ({
    entityId: id,
    code: null,
    name,
    kind: type === 'company' ? 'Company' : 'Individual',
  }));

  const approved = new Set(kycDecisions.filter((item) => item.decision === 'approve').map((item) => item.reviewId));
  ADMIN.queue.rows.filter((row) => !approved.has(row.reviewId)).forEach((row) => candidates.push({
    entityId: `queue-${row.registry}`,
    code: null,
    name: row.name,
    kind: row.type === 'Enterprise' ? 'Company' : 'Individual',
    pendingKyc: true,
  }));

  // Thành viên (Apex dựng sẵn + tài khoản đã đăng ký) lên đầu. Chỉ Apex có mã hồ sơ và ví mẫu.
  [...AccountStore.members()].reverse().forEach((account) => {
    candidates.unshift({
      ...(isDemoProfileOwner(account) ? ADMIN.grant.registeredRecipient : { code: null }),
      entityId: entityIdOf(account),
      name: account.legalName,
      kind: account.accountType === 'company' ? 'Company' : 'Individual',
      classIndex: account.classIndex ?? 0,
      account,
    });
  });
  return candidates;
}

/** Khớp một phần tên hoặc mã, không phân biệt hoa thường. */
function searchAwardCandidates(query) {
  const needle = query.trim().toLowerCase().replace(/^#/, '');
  if (!needle) return [];
  return listAwardCandidates().filter(({ code, name }) =>
    name.toLowerCase().includes(needle)
    || (code ?? '').toLowerCase().replace(/^#/, '').includes(needle));
}

/** Nút Find / Enter: lấy kết quả đầu tiên. */
function findAwardRecipient(query) {
  return searchAwardCandidates(query)[0] ?? null;
}

function renderAwardSuggestions(content, query) {
  if (!query.trim() || awardRecipient) return '';
  const matches = searchAwardCandidates(query);
  const items = matches.length
    ? matches.map(({ name, kind }, index) => `
        <li><button type="button" class="awd-suggest-item" data-index="${index}">
          <span>${escapeHtml(name)}</span><small>${escapeHtml(kind)}</small>
        </button></li>`).join('')
    : `<li class="awd-suggest-empty">${escapeHtml(content.suggestionsEmpty)}</li>`;
  return `<ul class="awd-suggest" id="awd-suggest">${items}</ul>`;
}

/** Pháp nhân trong sổ công khai coi như đã xác minh; tài khoản thành viên phải được duyệt KYC. */
function isAwardRecipientVerified(recipient) {
  if (recipient.pendingKyc) return false;
  return !recipient.account || recipient.account.kycStatus === 'approved';
}

function renderAwardRecipientBox(content, recipient) {
  const verified = isAwardRecipientVerified(recipient);
  return `
    <div class="awd-found">
      <p class="awd-found-head">
        <b>${escapeHtml(recipient.name)}</b>
        <span class="pill ${verified ? 'pill-green' : 'pill-amber'}">${escapeHtml(verified ? content.verifiedPill : content.unverifiedPill)}</span>
      </p>
      <p class="awd-found-meta">
        <span>${escapeHtml(recipient.kind)}${recipient.classIndex == null ? '' : ` · Class ${recipient.classIndex}`}</span>
        ${recipient.wallet ? `<span>${escapeHtml(content.walletLabel)} ${escapeHtml(recipient.walletKind)} · ${escapeHtml(recipient.wallet)}</span>` : ''}
      </p>
    </div>`;
}

function renderAwardForm(content) {
  const options = content.categories
    .map((label) => `<option value="${escapeHtml(label)}"${label === awardCategory ? ' selected' : ''}>${escapeHtml(label)}</option>`)
    .join('');

  return `
    <section class="card awd-form">
      <h2>${escapeHtml(content.formHeading)}</h2>

      <div class="awd-search">
        <span class="awd-search-field">
          ${ICONS.search}
          <input type="search" id="awd-query" value="${escapeHtml(awardQuery)}"
                 placeholder="${escapeHtml(content.searchPlaceholder)}"
                 aria-label="${escapeHtml(content.searchLabel)}">
        </span>
        <button class="awd-find" type="button" id="awd-find">
          ${ICONS.checkBadge}${escapeHtml(content.findLabel)}
        </button>
      </div>

      ${renderAwardSuggestions(content, awardQuery)}
      ${awardRecipient ? renderAwardRecipientBox(content, awardRecipient) : ''}
      ${awardError === 'notFound' ? `<p class="awd-error">${ICONS.alert}${escapeHtml(content.notFound)}</p>` : ''}

      <p class="awd-label">${escapeHtml(content.categoryLabel)}</p>
      <select class="awd-select" id="awd-category">${options}</select>

      <p class="awd-note">${ICONS.padlock}${escapeHtml(content.transferNote)}</p>

      <p class="awd-label">
        ${escapeHtml(content.citationLabel)}<b class="ink-red">*</b>
      </p>
      <textarea class="awd-textarea${awardError === 'citation' ? ' has-error' : ''}" id="awd-citation" rows="2"
                maxlength="${content.citationMax}"
                placeholder="${escapeHtml(content.citationPlaceholder)}">${escapeHtml(awardCitation)}</textarea>
      <p class="awd-counter">${awardCitation.length} / ${content.citationMax} ${escapeHtml(content.counterSuffix)}</p>
      <div class="awd-chips" role="group" aria-label="${escapeHtml(content.citationSuggestionsLabel)}">
        ${(content.citationSuggestions[awardCategory] ?? []).map((text, index) =>
          `<button type="button" class="awd-chip" data-index="${index}">${escapeHtml(text)}</button>`).join('')}
      </div>

      ${awardError && awardError !== 'notFound'
        ? `<p class="awd-error">${ICONS.alert}${escapeHtml({ recipient: content.missingRecipient, unverified: content.unverifiedRecipient }[awardError] ?? content.missingCitation)}</p>`
        : ''}

      <div class="awd-actions">
        <button class="awd-cancel" type="button" id="awd-cancel">${escapeHtml(content.cancelLabel)}</button>
        <button class="awd-submit" type="button" id="awd-submit">${escapeHtml(content.submitLabel)}</button>
      </div>
    </section>`;
}

function renderAwardPreview(content) {
  const { preview } = content;

  return `
    <aside class="awd-preview">
      <p class="awd-preview-label"><i class="dot"></i>${escapeHtml(preview.label)}</p>

      <div class="awd-cert">
        <header class="awd-cert-head">
          <span class="awd-cert-mark" aria-hidden="true">${ICONS.rosette}</span>
          <span class="awd-cert-issuer">
            <span>${escapeHtml(preview.issuerTop)}</span>
            <span>${escapeHtml(preview.issuerBottom)}</span>
          </span>
          <span class="pill pill-green">${escapeHtml(preview.soulboundPill)}</span>
        </header>

        <p class="awd-cert-conferred">${escapeHtml(preview.conferredLabel)}</p>
        <p class="awd-cert-name">${escapeHtml(awardRecipient ? awardRecipient.name : preview.emptyName)}</p>
        <i class="awd-cert-rule" aria-hidden="true"></i>

        <p class="awd-cert-badge">${escapeHtml(awardCategory)}</p>
        <p class="awd-cert-citation">${escapeHtml(awardCitation)}</p>
      </div>

      <p class="awd-preview-foot">${ICONS.fingerprint}${escapeHtml(preview.footnote)}</p>
    </aside>`;
}

function renderAdminAwardPage(content) {
  const grant = content.grant;

  const body = `
        ${renderAdminHead(content)}

        <div class="adm-grid">
          <div class="adm-side">
            ${renderAdminModules(content.modules, '#/admin-award')}
            ${renderAdminActivity(content.activity)}
          </div>

          <div class="adm-main">
            <section class="card awd-intro">
              <h1>${escapeHtml(grant.heading)}</h1>
              <p>${escapeHtml(grant.lead)}</p>
            </section>

            <div class="awd-grid">
              ${renderAwardForm(grant)}
              ${renderAwardPreview(grant)}
            </div>
          </div>
        </div>`;

  return renderDashboardShell(readAdminProfile(), '#/admin', body, {
    modifier: 'dash-admin',
    topbarLabel: content.topbarLabel,
    nav: content.nav,
  });
}

function bindAdminAwardPage() {
  bindDashboardShell();
  bindAdminModules();

  const grant = ADMIN.grant;
  const query = document.getElementById('awd-query');

  const runFind = () => {
    awardRecipient = findAwardRecipient(awardQuery);
    awardError = awardRecipient ? null : 'notFound';
    renderCurrentRoute();
  };

  /* Gõ tới đâu gợi ý tới đó: chỉ dựng lại danh sách gợi ý, không dựng lại cả
     tuyến, để ô nhập giữ nguyên con trỏ. */
  const refreshSuggestions = () => {
    document.getElementById('awd-suggest')?.remove();
    document.querySelector('.awd-search')
      ?.insertAdjacentHTML('afterend', renderAwardSuggestions(grant, awardQuery));
    bindSuggestionClicks();
  };

  const bindSuggestionClicks = () => {
    document.querySelectorAll('.awd-suggest-item').forEach((button) => {
      button.addEventListener('click', () => {
        const picked = searchAwardCandidates(awardQuery)[Number(button.dataset.index)];
        if (!picked) return;
        awardRecipient = picked;
        awardQuery = picked.name;
        awardError = null;
        renderCurrentRoute();
      });
    });
  };

  query?.addEventListener('input', () => {
    awardQuery = query.value;
    awardRecipient = null;
    awardError = null;
    document.querySelector('.awd-found')?.remove();
    document.querySelector('.awd-form > .awd-error')?.remove();
    refreshSuggestions();
  });
  bindSuggestionClicks();

  document.querySelectorAll('.awd-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      awardCitation = grant.citationSuggestions[awardCategory][Number(chip.dataset.index)];
      awardError = null;
      renderCurrentRoute();
    });
  });
  query?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { event.preventDefault(); runFind(); }
  });
  document.getElementById('awd-find')?.addEventListener('click', runFind);

  document.getElementById('awd-category')?.addEventListener('change', (event) => {
    awardCategory = event.target.value;
    renderCurrentRoute();
  });

  const citation = document.getElementById('awd-citation');
  citation?.addEventListener('input', () => {
    awardCitation = citation.value;
    awardError = null;
    renderCurrentRoute();
    // Dựng lại cả tuyến nên phải trả con trỏ về ô vừa gõ.
    const next = document.getElementById('awd-citation');
    next?.focus();
    next?.setSelectionRange(next.value.length, next.value.length);
  });

  const reset = () => {
    awardQuery = '';
    awardRecipient = null;
    awardCategory = grant.defaultCategory;
    awardCitation = '';
    awardError = null;
  };

  document.getElementById('awd-cancel')?.addEventListener('click', () => {
    reset();
    navigateTo('#/admin');
  });

  /* Hai điều kiện: phải có pháp nhân nhận, và lời trích là bắt buộc
     (dấu * trong thiết kế). */
  document.getElementById('awd-submit')?.addEventListener('click', () => {
    if (!awardRecipient) { awardError = 'recipient'; renderCurrentRoute(); return; }
    if (!isAwardRecipientVerified(awardRecipient)) { awardError = 'unverified'; renderCurrentRoute(); return; }
    if (!awardCitation.trim()) { awardError = 'citation'; renderCurrentRoute(); return; }
    pendingGrant = {
      recipient: awardRecipient,
      category: awardCategory,
      citation: awardCitation.trim(),
      awardId: `#PW-AWD-${grant.issuing.serialBase + grantedAwards.length}`,
      startedAt: new Date(),
      grantedAt: null,
    };
    reset();
    navigateTo('#/admin-issuing');
  });
}


/* ============================================================
   MÀN TRANSFER A DISTINCTION — #/transfer, #/transfer-status
   ------------------------------------------------------------
   Đo từ design/PW Registry — Transfer a Distinction (Destination).png.

   Vào từ nút "Transfer" trên thẻ danh hiệu ở Dashboard. Thành viên chọn
   đích đến (ví đã liên kết, hoặc địa chỉ khác), xem tóm tắt rồi bấm
   Continue. Thiết kế chỉ vẽ bước chọn đích; bước tiếp theo (đang chuyển →
   đã chuyển) dùng lại khung .outcome-* do bản code thêm. Chuyển xong thì
   danh hiệu bị khoá ở ví đích (chuyển được đúng một lần), Dashboard đổi theo.

   Trạng thái sống trong phiên xem trang, giống mọi màn khác.
   ============================================================ */

let transferTitleId = null;
let transferMode = 'linked';
let transferWalletId = null;
let transferAddress = '';
let transferError = null;

/** Lần chuyển đang chạy ở #/transfer-status; null khi chưa bấm Continue. */
let pendingTransfer = null;
let transferTimer = null;

/** Các lần chuyển đã hoàn tất trong phiên. */
let completedTransfers = [];

const EVM_ADDRESS = /^0x[a-fA-F0-9]{40}$/;

function shortenAddress(address) {
  return address.length > 14 ? `${address.slice(0, 6)}…${address.slice(-4)}` : address;
}

/** Danh hiệu có thể chuyển: thẻ có nút chính "Transfer" (đang giữ ở ví giữ hộ, chưa khoá, chưa thu hồi). */
function readTransferableTitle(profile = readMemberProfile()) {
  return profile?.titles.find((title) => title.id === transferTitleId && title.primaryAction === 'Transfer' && !title.revoked) ?? null;
}

/** Ví nguồn (giữ hộ), danh sách ví đã liên kết (mọi ví không phải ví giữ hộ) và ví đang chọn làm đích. */
function readTransferWallets(profile) {
  const linkedList = profile.wallets.filter((wallet) => wallet.id !== 'pw-custodial');
  return {
    from: profile.wallets.find((wallet) => wallet.id === 'pw-custodial') ?? profile.wallets[0],
    linkedList,
    linked: linkedList.find((wallet) => wallet.id === transferWalletId) ?? linkedList[0] ?? null,
  };
}

/** Đích đến đang chọn: tên, địa chỉ rút gọn, và có được tính hạng không. */
function readTransferDestination(profile) {
  const { linked } = readTransferWallets(profile);
  if (transferMode === 'linked') {
    return linked ? { name: linked.name, address: linked.addressLabel, walletId: linked.id, countsRanking: true } : null;
  }
  const typed = transferAddress.trim();
  return {
    // Ví nhập tay phải được ký xác minh là của chính người dùng, nên luôn mang tên ví chứ không phải "Another address".
    name: ownWalletName(typed),
    address: typed ? shortenAddress(typed) : '',
    // Chỉ chuyển được tới ví đã chứng minh quyền sở hữu, nên NFT luôn tiếp tục được tính hạng.
    countsRanking: true,
  };
}

function startTransfer(titleId) {
  transferTitleId = titleId;
  transferMode = 'linked';
  transferWalletId = null;
  transferAddress = '';
  transferError = null;
  navigateTo('#/transfer');
}

/** Phần đầu thẻ danh hiệu: bỏ đoạn "Transfer available…" khỏi dòng mô tả. */
function readTransferDetail(title) {
  return (title.detail ?? '').split(' · ').slice(0, 2).join(' · ');
}

function renderTransferSummary(content, profile) {
  const { summary } = content;
  const { from } = readTransferWallets(profile);
  const destination = readTransferDestination(profile);
  const walletLine = (name, address) => `
        <span class="xfr-sum-wallet"><b>${escapeHtml(name)}</b><i>·</i><code>${escapeHtml(address)}</code></span>`;

  const rankingKeeps = destination?.countsRanking ?? true;

  return `
    <aside class="card xfr-summary">
      <header>
        <h2>${escapeHtml(summary.heading)}</h2>
        <span aria-hidden="true">${ICONS.transfer}</span>
      </header>
      <dl>
        <div class="xfr-sum-block">
          <dt>${escapeHtml(summary.from)}</dt>
          <dd>${walletLine(from.name, from.addressLabel)}</dd>
        </div>
        <div class="xfr-sum-block">
          <dt>${escapeHtml(summary.to)}</dt>
          <dd>${destination?.address ? walletLine(destination.name, destination.address) : `<span class="xfr-sum-empty">${escapeHtml(summary.toEmpty)}</span>`}</dd>
        </div>
        <div class="xfr-sum-row">
          <dt>${escapeHtml(summary.ranking)}</dt>
          <dd>${rankingKeeps
            ? `<span class="pill pill-green">${ICONS.pulse}${escapeHtml(summary.keeps)}</span>`
            : `<span class="pill pill-amber">${escapeHtml(summary.stops)}</span>`}</dd>
        </div>
        <div class="xfr-sum-row">
          <dt>${escapeHtml(summary.transfer)}</dt>
          <dd class="xfr-sum-plain">${escapeHtml(summary.transferValue)}</dd>
        </div>
        <div class="xfr-sum-row">
          <dt>${escapeHtml(summary.after)}</dt>
          <dd><span class="pill pill-amber">${ICONS.padlock}${escapeHtml(summary.locked)}</span></dd>
        </div>
      </dl>
      <p class="xfr-fee">${ICONS.card}${escapeHtml(summary.fee)}</p>
    </aside>`;
}

function renderTransferPage(content) {
  const profile = readMemberProfile();
  if (!profile) return renderSignedOutGuard();
  const title = readTransferableTitle(profile);
  if (!title) return renderSignedOutGuard();

  const { nft, destination } = content;
  const { linked } = readTransferWallets(profile);
  const isLinked = transferMode === 'linked';

  const errors = {
    addressRequired: content.errors.addressRequired,
    addressInvalid: content.errors.addressInvalid,
    linkedElsewhere: content.errors.linkedElsewhere,
    noLinkedWallet: content.errors.noLinkedWallet,
  };

  const { linkedList } = readTransferWallets(profile);
  const walletRows = linkedList.map((wallet) => `
          <button type="button" class="xfr-wallet${wallet.id === linked?.id ? ' is-picked' : ''}" data-xfer-wallet="${escapeHtml(wallet.id)}"
                  aria-pressed="${wallet.id === linked?.id}">
            <span class="xfr-wallet-icon">${ICONS.wallet}</span>
            <b>${escapeHtml(wallet.name)}</b><i>·</i><code>${escapeHtml(wallet.addressLabel)}</code>
            <span class="pill pill-green">${ICONS.checkBadge}${escapeHtml(destination.linked.verified)}</span>
          </button>`).join('');

  const linkedBody = linked
    ? `
          <div class="xfr-wallets">${walletRows}</div>
          <p class="xfr-note is-good">${ICONS.checkBadge}<span>${escapeHtml(destination.linked.note)}</span></p>`
    : `<p class="xfr-note">${escapeHtml(destination.linked.none)}</p>`;

  const body = `
        <button class="xfr-back" type="button" id="xfr-back">${ICONS.arrowLeft}${escapeHtml(content.backLabel)}</button>

        <header class="xfr-head">
          <h1>${escapeHtml(content.heading)}</h1>
          <p>${escapeHtml(content.lead)}</p>
        </header>

        <div class="xfr-columns">
          <div class="xfr-main">
            <section class="card xfr-nft">
              <div class="xfr-nft-top">
                <h2>${escapeHtml(title.name)}</h2>
                <button class="xfr-change" type="button" id="xfr-change">${escapeHtml(nft.changeLabel)}${ICONS.linkOut}</button>
              </div>
              <p class="xfr-token">${escapeHtml(title.id)}${renderCopyIcon(title.id, 'Copy Title ID')}</p>
              <div class="xfr-meta">
                <span class="xfr-pill"><i class="dot"></i>${escapeHtml(nft.custodial)}</span>
                <span class="xfr-detail">${escapeHtml(readTransferDetail(title))}</span>
              </div>
            </section>

            <h2 class="xfr-section">${escapeHtml(destination.heading)}</h2>
            <p class="xfr-section-lead">${escapeHtml(destination.lead)}</p>

            <div class="xfr-options" role="radiogroup" aria-label="${escapeHtml(destination.heading)}">
              <div class="xfr-option${isLinked ? ' is-on' : ''}">
                <label class="xfr-option-head">
                  <input type="radio" name="xfr-mode" value="linked"${isLinked ? ' checked' : ''}>
                  <span class="xfr-radio"></span>
                  <b>${escapeHtml(destination.linked.label)}</b>
                  <em>${escapeHtml(destination.linked.tag)}</em>
                </label>
                <div class="xfr-option-body">${linkedBody}</div>
              </div>

              <div class="xfr-option${isLinked ? '' : ' is-on'}">
                <label class="xfr-option-head">
                  <input type="radio" name="xfr-mode" value="other"${isLinked ? '' : ' checked'}>
                  <span class="xfr-radio"></span>
                  <span class="xfr-option-who"><b>${escapeHtml(destination.other.label)}</b><small>${escapeHtml(destination.other.lead)}</small></span>
                </label>
                <div class="xfr-option-body">
                  <label class="xfr-address${transferError === 'addressRequired' || transferError === 'addressInvalid' || transferError === 'linkedElsewhere' ? ' has-error' : ''}">
                    <span class="xfr-hash" aria-hidden="true">#</span>
                    <input type="text" id="xfr-address" value="${escapeHtml(transferAddress)}" autocomplete="off" spellcheck="false"
                           placeholder="${escapeHtml(destination.other.placeholder)}" aria-label="${escapeHtml(destination.other.inputLabel)}"${isLinked ? ' disabled' : ''}>
                  </label>
                  <p class="xfr-hint">${ICONS.info}${escapeHtml(destination.other.hint)}</p>
                </div>
              </div>
            </div>

            <section class="xfr-policy">
              ${ICONS.padlock}
              <div><h3>${escapeHtml(content.policy.heading)}</h3><p>${escapeHtml(content.policy.body)}</p></div>
            </section>

            ${transferError ? `<p class="awd-error">${ICONS.alert}${escapeHtml(errors[transferError])}</p>` : ''}

            <div class="xfr-actions">
              <button class="xfr-cancel" type="button" id="xfr-cancel">${escapeHtml(content.cancelLabel)}</button>
              <button class="xfr-continue" type="button" id="xfr-continue">${escapeHtml(content.continueLabel)}${ICONS.arrowRight}</button>
            </div>
          </div>

          ${renderTransferSummary(content, profile)}
        </div>
        ${renderLinkWalletModal()}`;

  return renderDashboardShell(profile, '#/dashboard', body);
}

function bindTransferPage() {
  bindDashboardShell();
  bindLinkWalletModal();

  const refresh = (focusId) => {
    renderCurrentRoute();
    const next = focusId && document.getElementById(focusId);
    if (next) {
      next.focus();
      next.setSelectionRange?.(next.value.length, next.value.length);
    }
  };

  const toDashboard = () => navigateTo('#/dashboard');
  document.getElementById('xfr-back')?.addEventListener('click', toDashboard);
  document.getElementById('xfr-change')?.addEventListener('click', toDashboard);
  document.getElementById('xfr-cancel')?.addEventListener('click', toDashboard);

  document.querySelectorAll('[data-xfer-wallet]').forEach((button) => {
    button.addEventListener('click', () => {
      transferWalletId = button.dataset.xferWallet;
      transferError = null;
      refresh();
    });
  });

  document.querySelectorAll('input[name="xfr-mode"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      transferMode = radio.value;
      transferError = null;
      refresh(transferMode === 'other' ? 'xfr-address' : undefined);
    });
  });

  const address = document.getElementById('xfr-address');
  address?.addEventListener('input', () => {
    transferAddress = address.value;
    transferError = null;
    refresh('xfr-address');
  });

  document.getElementById('xfr-continue')?.addEventListener('click', () => {
    const profile = readMemberProfile();
    const title = readTransferableTitle(profile);
    if (!title) { toDashboard(); return; }

    const typed = transferAddress.trim();
    if (transferMode === 'linked' && !readTransferWallets(profile).linked) transferError = 'noLinkedWallet';
    else if (transferMode === 'other' && !typed) transferError = 'addressRequired';
    else if (transferMode === 'other' && !EVM_ADDRESS.test(typed)) transferError = 'addressInvalid';
    else if (transferMode === 'other' && !profile.wallets.some((wallet) => wallet.addressLabel.toLowerCase() === shortenAddress(typed).toLowerCase())
             && isWalletLinkedToOtherAccount(typed)) transferError = 'linkedElsewhere';
    else transferError = null;

    if (transferError) { refresh(); return; }

    const begin = (walletId) => {
      const latest = readMemberProfile();
      const destination = readTransferDestination(latest);
      const wallet = latest.wallets.find((item) => item.id === walletId) ?? null;
      pendingTransfer = {
        titleId: title.id,
        name: title.name,
        from: readTransferWallets(latest).from,
        destinationName: wallet?.name ?? destination.name,
        destinationAddress: wallet?.addressLabel ?? destination.address,
        isLinked: true,
        walletId,
        countsRanking: true,
        startedAt: new Date(),
        at: null,
      };
      navigateTo('#/transfer-status');
    };

    if (transferMode === 'linked') {
      begin(readTransferDestination(profile).walletId);
      return;
    }

    // Ví đã liên kết từ trước (cùng địa chỉ) đã được xác minh rồi — không ký lại.
    const known = profile.wallets.find((wallet) => wallet.addressLabel.toLowerCase() === shortenAddress(typed).toLowerCase());
    if (known) { begin(known.id); return; }

    // Ví mới: bắt buộc ký tin nhắn chứng minh quyền sở hữu rồi mới chuyển (và ví được liên kết luôn).
    openLinkWallet({ name: ownWalletName(typed), address: typed, onVerified: begin });
  });
}

/** Ghi lần chuyển. Chạy một lần, kể cả khi đã rời màn. */
function recordTransfer() {
  const pending = pendingTransfer;
  if (!pending || pending.at) return;
  pending.at = new Date();

  const { startedAt, from, ...entry } = pending;
  completedTransfers = [{ ...entry, fromAddress: from.addressLabel }, ...completedTransfers];
}

function renderTransferStatusPage(content) {
  const pending = pendingTransfer;
  if (!pending) return renderSignedOutGuard();

  const { status } = content;
  const done = pending.at;
  const walletText = (name, address) => `${escapeHtml(name)} · ${escapeHtml(address)}`;
  const toText = walletText(pending.destinationName, pending.destinationAddress);
  const fromText = walletText(pending.from.name, pending.from.addressLabel);

  let inner;
  if (!done) {
    const rows = [
      renderOutcomeRow(status.labels.title, `<i class="outcome-dot"></i>${escapeHtml(pending.name)}`),
      renderOutcomeRow(status.labels.tokenId, `<span class="outcome-ref">${escapeHtml(pending.titleId)}</span>`),
      renderOutcomeRow(status.labels.from, fromText),
      renderOutcomeRow(status.labels.to, toText),
      renderOutcomeRow(status.labels.timestamp, escapeHtml(formatSettlementTime(pending.startedAt))),
    ].join('');

    inner = `
      <span class="outcome-spinner" aria-hidden="true"></span>
      <p class="outcome-state"><i class="outcome-dots"></i>${escapeHtml(status.stateLabel)}</p>

      <h1>${escapeHtml(status.heading)}</h1>
      <p class="outcome-lead">${escapeHtml(status.lead)}</p>

      <ol class="outcome-steps">${status.steps.map(renderOutcomeStep).join('')}</ol>
      <dl class="outcome-details">${rows}</dl>

      <button class="outcome-submit" type="button" disabled>
        <span class="outcome-spinner is-small" aria-hidden="true"></span>${escapeHtml(status.transferringLabel)}
      </button>
      <button class="outcome-secondary" type="button" id="xfr-status-dashboard">${escapeHtml(status.dashboardLabel)}</button>

      <p class="outcome-foot">${escapeHtml(status.footnote)}</p>`;
  } else {
    const ok = status.success;
    const rows = [
      renderOutcomeRow(ok.labels.title, `<i class="outcome-dot"></i>${escapeHtml(pending.name)}`),
      renderOutcomeRow(ok.labels.tokenId, escapeHtml(pending.titleId)),
      renderOutcomeRow(ok.labels.from, fromText),
      renderOutcomeRow(ok.labels.to, toText),
      renderOutcomeRow(ok.labels.transferredOn, escapeHtml(formatIssuedTime(pending.at))),
      renderOutcomeRow(ok.labels.ranking, escapeHtml(pending.countsRanking ? ok.rankingKeeps : ok.rankingStops)),
    ].join('');

    inner = `
      <span class="outcome-seal" aria-hidden="true">${ICONS.checkMark}</span>
      <p class="outcome-state is-issued"><i class="dot"></i>${escapeHtml(ok.stateLabel)}</p>

      <h1>${escapeHtml(ok.heading)}</h1>
      <p class="outcome-lead">${escapeHtml(pending.name)}${escapeHtml(ok.leadAfter.replace('{destination}', pending.destinationName))}</p>

      <ol class="outcome-steps is-done">${ok.steps.map(renderOutcomeStep).join('')}</ol>
      <dl class="outcome-details">${rows}</dl>

      <button class="outcome-secondary" type="button" id="xfr-status-dashboard">${escapeHtml(ok.dashboardLabel)}</button>`;
  }

  return `
  <main class="outcome">
    <p class="outcome-brand">
      <span class="outcome-mark">${escapeHtml(DASHBOARD.brand.name)}</span>
      ${escapeHtml(OUTCOME.brand)}
    </p>

    <section class="outcome-card${done ? ' is-issued' : ''}">${inner}</section>

    <footer class="outcome-strip">
      <span><i class="dot"></i>${escapeHtml(OUTCOME.strip.status)}</span>
      <span>${escapeHtml(OUTCOME.strip.jurisdiction)}</span>
    </footer>
  </main>`;
}

function bindTransferStatusPage() {
  document.getElementById('xfr-status-dashboard')?.addEventListener('click', () => navigateTo('#/dashboard'));

  clearTimeout(transferTimer);
  if (!pendingTransfer || pendingTransfer.at) return;

  // Đường tắt demo: không có chuỗi khối thật để chờ.
  transferTimer = setTimeout(() => {
    recordTransfer();
    if (location.hash === '#/transfer-status' || location.hash === '#/dashboard') renderCurrentRoute();
  }, DEMO_ISSUE_DELAY_MS);
}

/**
 * Danh hiệu đã chuyển: thẻ ở Dashboard thành bản "Locked" (mất nút Transfer), thêm dòng ở
 * Recent activity, ví giữ hộ -1 NFT (ví Ledger +1 nếu chuyển vào ví đã liên kết). Đích là địa
 * chỉ lạ chưa chứng minh quyền sở hữu thì NFT không còn được tính hạng: số NFT được tính -1
 * và hạng tụt lại số bậc đã lên nhờ danh hiệu.
 */
function withTransfers(profile) {
  if (!completedTransfers.length) return profile;

  const card = TRANSFER.lockedCard;
  const byId = new Map(completedTransfers.map((entry) => [entry.titleId, entry]));
  const uncounted = completedTransfers.filter((entry) => !entry.countsRanking).length;

  const titles = profile.titles.map((title) => {
    const entry = byId.get(title.id);
    if (!entry) return title;
    return {
      ...title,
      pills: entry.countsRanking
        ? [{ ...card.verifiedPill, label: entry.destinationName.startsWith('Personal wallet') ? entry.destinationName : `Personal wallet · ${entry.destinationName.split(' — ')[0]}` }, card.locked]
        : [card.unverifiedPill, card.locked],
      detail: card.detail.replace('{address}', entry.destinationAddress),
      note: card.note,
      primaryAction: undefined,
    };
  });

  const activity = completedTransfers.map((entry) => ({
    id: `transfer-${entry.titleId}`,
    title: TRANSFER.activity.title,
    state: TRANSFER.activity.state,
    detail: [
      { text: `${entry.name} (` },
      { text: entry.titleId, tone: 'blue' },
      { text: TRANSFER.activity.middle },
      { text: `${entry.destinationName} (${entry.destinationAddress})`, tone: 'strong' },
    ],
    timestamp: formatIssuedTime(entry.at),
  }));

  return {
    ...profile,
    titles,
    activity: [...activity, ...profile.activity],
    rank: profile.rank === null ? null : profile.rank + uncounted * OUTCOME.issuedTitle.rankGainPerTitle,
    wallets: profile.wallets.map((wallet) => {
      if (wallet.id === 'pw-custodial') return { ...wallet, nftCount: Math.max(0, wallet.nftCount - completedTransfers.length) };
      const received = completedTransfers.filter((entry) => entry.isLinked && entry.walletId === wallet.id).length;
      return received ? { ...wallet, nftCount: wallet.nftCount + received } : wallet;
    }),
  };
}

/* ============================================================
   MODAL LINK A WALLET
   ------------------------------------------------------------
   Đo từ design/PW Registry — Member Dashboard (Link Wallet Modal - Step 01).png.

   Mở từ nút "Link wallet" ở Dashboard. Bước 1: tên ví, mạng (cố định Polygon),
   địa chỉ, ứng dụng ví. Bước 2 (bản code thêm): ký tin nhắn chứng minh quyền
   sở hữu. Bước 3: đã liên kết — ví hiện ở danh sách ví và Recent activity.

   Chỉ dựng lại phần modal khi gõ (không dựng lại cả Dashboard) để không nhảy
   về đầu trang. Trạng thái sống trong phiên xem trang.
   ============================================================ */

let linkOpen = false;
let linkStep = 1;
let linkName = '';
let linkAddress = '';
let linkApp = LINK_WALLET.apps.defaultId;
let linkError = null;
let linkSigning = false;
let linkTimer = null;

/** 'link' = liên kết ví từ Dashboard; 'transfer' = ký xác minh ví đích khi chuyển danh hiệu. */
let linkPurpose = 'link';
let linkOnVerified = null;
let linkSignerMismatch = false;

/** Các ví đã liên kết trong phiên, mới nhất đứng cuối danh sách ví. */
let linkedWallets = [];

/**
 * Ví đang gắn với một tài khoản KHÁC người đăng nhập (BR-07: mỗi ví chỉ liên kết với một tài khoản).
 * So bằng nhãn rút gọn như phần kiểm trùng trong cùng tài khoản. Chỉ thấy các tài khoản có trong cùng trình duyệt
 * (dữ liệu demo nằm ở localStorage); Apex dựng sẵn tính cả ví giữ hộ và ví Ledger, trừ ví Apex đã gỡ.
 */
function isWalletLinkedToOtherAccount(address) {
  const short = shortenAddress(address).toLowerCase();
  const apexEmail = DEMO_MEMBER_ACCOUNT.email.toLowerCase();
  const holds = (wallets, state) => wallets.some((wallet) => wallet.addressLabel.toLowerCase() === short
    && !(state?.unlinkedWallets ?? []).some((gone) => gone.id === wallet.id));

  const activeIsApex = activeMemberEmail?.toLowerCase() === apexEmail;
  if (!activeIsApex) {
    const apexState = [...memberStates].find(([email]) => email.toLowerCase() === apexEmail)?.[1];
    if (holds(DASHBOARD.demoProfile.wallets, apexState)) return true;
  }
  return [...memberStates].some(([email, state]) => email !== activeMemberEmail && holds(state.linkedWallets ?? [], state));
}

/** Liên kết ví (nếu chưa có) và trả về `id` của nó. Địa chỉ đã liên kết thì dùng lại, không tạo trùng. */
/** Tên ví nhập tay kèm 4 ký tự cuối địa chỉ để nhiều ví không trùng tên. */
function ownWalletName(address) {
  return TRANSFER.destination.other.ownName.replace('{tail}', address.trim().slice(-4));
}

function ensureLinkedWallet({ name, address, app }) {
  const short = shortenAddress(address).toLowerCase();

  // Liên kết lại đúng địa chỉ đã gỡ thì khôi phục ví cũ (NFT trong ví đó được tính hạng trở lại).
  const restored = unlinkedWallets.find((wallet) => wallet.addressLabel.toLowerCase() === short);
  if (restored) {
    unlinkedWallets = unlinkedWallets.filter((wallet) => wallet !== restored);
    return restored.id;
  }

  const known = (readMemberProfile()?.wallets ?? []).find((wallet) => wallet.addressLabel.toLowerCase() === short);
  if (known) return known.id;

  const id = `linked-${linkedWallets.length + 1}`;
  linkedWallets = [...linkedWallets, { id, name, addressLabel: shortenAddress(address), app, at: new Date() }];
  return id;
}

/**
 * Mở modal. Không có tham số: liên kết ví từ Dashboard (bước 1). Với `verify`: nhảy thẳng tới bước
 * ký xác minh cho ví đích của lần chuyển danh hiệu — chuyển chỉ được tới ví của chính người dùng.
 */
function openLinkWallet(verify = null) {
  linkOpen = true;
  linkPurpose = verify ? 'transfer' : 'link';
  linkOnVerified = verify?.onVerified ?? null;
  linkStep = verify ? 2 : 1;
  linkName = verify?.name ?? '';
  linkAddress = verify?.address ?? '';
  linkApp = verify ? 'other' : LINK_WALLET.apps.defaultId;
  linkError = null;
  linkSigning = false;
  linkSignerMismatch = false;
  renderCurrentRoute();
  document.getElementById('lw-name')?.focus();
}

function closeLinkWallet() {
  clearTimeout(linkTimer);
  linkOpen = false;
  linkSigning = false;
  renderCurrentRoute();
}

function renderLinkWalletModal() {
  if (!linkOpen) return '';
  const c = LINK_WALLET;
  const appLabel = c.apps.options.find(({ id }) => id === linkApp)?.label ?? '';
  const account = AccountStore.read();

  const errors = c.errors;
  const signerAddress = shortenAddress(`0x${fakeTxHash(`${linkAddress}signer`).replace(/^0x|…/g, '').padEnd(40, 'c')}`);
  const fieldError = (...keys) => (keys.includes(linkError) ? ' has-error' : '');

  let body;
  if (linkStep === 1) {
    const apps = c.apps.options.map(({ id, label }) => `
          <button type="button" class="lw-app${id === linkApp ? ' is-on' : ''}" data-app="${escapeHtml(id)}"
                  aria-pressed="${id === linkApp}">${id === linkApp ? '<i></i>' : ''}${escapeHtml(label)}</button>`).join('');

    body = `
      <p class="lw-label">${escapeHtml(c.name.label)}</p>
      <input class="lw-input${fieldError('nameRequired')}" id="lw-name" type="text" autocomplete="off" maxlength="40"
             value="${escapeHtml(linkName)}" placeholder="${escapeHtml(c.name.placeholder)}">
      <p class="lw-hint">${escapeHtml(c.name.hint)}</p>

      <p class="lw-label">${escapeHtml(c.network.label)}</p>
      <div class="lw-network" aria-label="${escapeHtml(c.network.lockedLabel)}">
        <i class="lw-dot"></i><b>${escapeHtml(c.network.value)}</b><span>${escapeHtml(c.network.tag)}</span>
        ${ICONS.padlock}
      </div>
      <p class="lw-hint">${escapeHtml(c.network.hint)}</p>

      <p class="lw-label">${escapeHtml(c.address.label)}</p>
      <div class="lw-input-wrap${fieldError('addressRequired', 'addressInvalid', 'duplicate', 'linkedElsewhere')}">
        <input class="lw-input" id="lw-address" type="text" autocomplete="off" spellcheck="false"
               value="${escapeHtml(linkAddress)}" placeholder="${escapeHtml(c.address.placeholder)}">
        <button class="lw-paste" type="button" id="lw-paste" aria-label="${escapeHtml(c.address.pasteLabel)}">${ICONS.copy}</button>
      </div>
      <p class="lw-hint">${escapeHtml(c.address.hint)}</p>

      <p class="lw-label">${escapeHtml(c.apps.label)}</p>
      <div class="lw-apps" role="group">${apps}</div>

      <p class="lw-note">${ICONS.info}<span>${escapeHtml(c.note)}</span></p>

      ${linkError ? `<p class="awd-error">${ICONS.alert}${escapeHtml(errors[linkError])}</p>` : ''}

      <div class="lw-actions">
        <button class="lw-cancel" type="button" id="lw-cancel">${escapeHtml(c.cancelLabel)}</button>
        <button class="lw-continue" type="button" id="lw-continue">${escapeHtml(c.continueLabel)}${ICONS.arrowRight}</button>
      </div>`;
  } else if (linkStep === 2) {
    const message = c.prove.message
      .replace('{address}', shortenAddress(linkAddress.trim()))
      .replace('{account}', account?.legalName ?? '')
      .replace('{nonce}', fakeTxHash(linkAddress.trim()).replace('…', ''));
    body = `
      <p class="lw-label">${escapeHtml(c.prove.messageLabel)}</p>
      <pre class="lw-message">${escapeHtml(message)}</pre>
      <p class="lw-note">${ICONS.info}<span>${escapeHtml(c.note)}</span></p>
      <button class="lw-demo" type="button" id="lw-wrong"${linkSigning ? ' disabled' : ''}>${escapeHtml(linkSignerMismatch ? c.prove.wrongWalletOnLabel : c.prove.wrongWalletLabel)}</button>
      ${linkError === 'signerMismatch' ? `<p class="awd-error">${ICONS.alert}${escapeHtml(errors.signerMismatch.replace('{signer}', signerAddress))}</p>` : ''}
      <div class="lw-actions">
        <button class="lw-cancel" type="button" id="lw-back"${linkSigning ? ' disabled' : ''}>${escapeHtml(linkPurpose === 'transfer' ? c.cancelLabel : c.prove.backLabel)}</button>
        <button class="lw-continue" type="button" id="lw-sign"${linkSigning ? ' disabled' : ''}>${escapeHtml(linkSigning ? c.prove.signingLabel : (linkPurpose === 'transfer' ? c.prove.transferSignLabel : c.prove.signLabel))}</button>
      </div>`;
  } else {
    body = `
      <p class="lw-done-seal" aria-hidden="true">${ICONS.checkMark}</p>
      <div class="lw-actions is-end">
        <button class="lw-continue" type="button" id="lw-done">${escapeHtml(c.done.doneLabel)}</button>
      </div>`;
  }

  const heading = linkStep === 1 ? c.heading : linkStep === 2 ? c.prove.heading : c.done.heading;
  const lead = linkStep === 1
    ? c.lead
    : linkStep === 2
      ? (linkPurpose === 'transfer' ? c.prove.transferLead : c.prove.lead.replace('{app}', appLabel))
      : c.done.lead.replace('{name}', linkName.trim());

  return `
  <div class="lw-overlay" id="lw-overlay" role="presentation">
    <section class="lw-modal" role="dialog" aria-modal="true" aria-labelledby="lw-title">
      <button class="lw-close" type="button" id="lw-close" aria-label="${escapeHtml(c.closeLabel)}">${ICONS.close}</button>
      <h2 id="lw-title">${escapeHtml(heading)}</h2>
      <p class="lw-lead">${escapeHtml(lead)}</p>
      ${body}
    </section>
  </div>`;
}

/** Dựng lại riêng modal rồi trả con trỏ về ô đang gõ. */
function refreshLinkWallet(focusId) {
  const overlay = document.getElementById('lw-overlay');
  if (!overlay) return;
  overlay.outerHTML = renderLinkWalletModal();
  bindLinkWalletModal();
  const next = focusId && document.getElementById(focusId);
  if (next) {
    next.focus();
    next.setSelectionRange?.(next.value.length, next.value.length);
  }
}

function bindLinkWalletModal() {
  const overlay = document.getElementById('lw-overlay');
  if (!overlay) return;

  overlay.addEventListener('mousedown', (event) => { if (event.target === overlay) closeLinkWallet(); });
  document.getElementById('lw-close')?.addEventListener('click', closeLinkWallet);
  document.getElementById('lw-cancel')?.addEventListener('click', closeLinkWallet);

  const name = document.getElementById('lw-name');
  name?.addEventListener('input', () => { linkName = name.value; linkError = null; refreshLinkWallet('lw-name'); });
  const address = document.getElementById('lw-address');
  address?.addEventListener('input', () => { linkAddress = address.value; linkError = null; refreshLinkWallet('lw-address'); });

  document.getElementById('lw-paste')?.addEventListener('click', async () => {
    try {
      linkAddress = (await navigator.clipboard.readText()).trim();
      linkError = null;
      refreshLinkWallet('lw-address');
    } catch (error) { /* trình duyệt chặn đọc clipboard — người dùng tự dán */ }
  });

  document.querySelectorAll('[data-app]').forEach((button) => {
    button.addEventListener('click', () => { linkApp = button.dataset.app; refreshLinkWallet(); });
  });

  document.getElementById('lw-continue')?.addEventListener('click', () => {
    const typed = linkAddress.trim();
    if (!linkName.trim()) linkError = 'nameRequired';
    else if (!typed) linkError = 'addressRequired';
    else if (!EVM_ADDRESS.test(typed)) linkError = 'addressInvalid';
    else if (readMemberProfile()?.wallets.some((wallet) => wallet.addressLabel.toLowerCase() === shortenAddress(typed).toLowerCase())) linkError = 'duplicate';
    else if (isWalletLinkedToOtherAccount(typed)) linkError = 'linkedElsewhere';
    else linkError = null;

    if (linkError) { refreshLinkWallet(); return; }
    linkStep = 2;
    refreshLinkWallet();
  });

  document.getElementById('lw-back')?.addEventListener('click', () => {
    if (linkPurpose === 'transfer') { closeLinkWallet(); return; }
    linkStep = 1;
    refreshLinkWallet();
  });

  document.getElementById('lw-wrong')?.addEventListener('click', () => {
    linkSignerMismatch = !linkSignerMismatch;
    linkError = null;
    refreshLinkWallet();
  });

  document.getElementById('lw-sign')?.addEventListener('click', () => {
    linkSigning = true;
    linkError = null;
    refreshLinkWallet();
    // Đường tắt demo: không có ví thật để ký.
    linkTimer = setTimeout(() => {
      linkSigning = false;

      // Chữ ký phải đến từ chính ví đã khai: ký bằng khoá khác thì không chứng minh được quyền sở hữu.
      if (linkSignerMismatch) {
        linkSignerMismatch = false;
        linkError = 'signerMismatch';
        refreshLinkWallet();
        return;
      }

      const walletId = ensureLinkedWallet({ name: linkName.trim(), address: linkAddress.trim(), app: linkApp });

      if (linkPurpose === 'transfer') {
        const done = linkOnVerified;
        linkOpen = false;
        linkOnVerified = null;
        done?.(walletId);
        return;
      }

      linkStep = 3;
      // Dashboard phải hiện ví mới ngay (ở phía sau modal).
      const scrollY = window.scrollY;
      renderCurrentRoute();
      window.scrollTo(0, scrollY);
    }, DEMO_ISSUE_DELAY_MS / 2);
  });

  document.getElementById('lw-done')?.addEventListener('click', closeLinkWallet);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && linkOpen && !linkSigning) closeLinkWallet();
});

/** Ví đã liên kết trong phiên: thêm vào danh sách ví và Recent activity. */
function withLinkedWallets(profile) {
  if (!linkedWallets.length) return profile;

  const entry = LINK_WALLET.activity;
  const wallets = linkedWallets.map((item) => ({
    id: item.id,
    name: item.name,
    badge: { label: 'Verified', tone: 'green', icon: 'check' },
    addressLabel: item.addressLabel,
    meta: `Linked ${formatIssuedTime(item.at)}`,
    nftCount: 0,
    canUnlink: true,
  }));
  const activity = linkedWallets.map((item) => ({
    id: `wallet-linked-${item.id}`,
    title: entry.title,
    state: entry.state,
    detail: [
      { text: `${item.name} (` },
      { text: item.addressLabel, tone: 'blue' },
      { text: entry.suffix },
    ],
    timestamp: formatIssuedTime(item.at),
  })).reverse();

  return { ...profile, wallets: [...profile.wallets, ...wallets], activity: [...activity, ...profile.activity] };
}

/* ============================================================
   UNLINK VÍ — hộp thoại xác nhận ở Dashboard
   ------------------------------------------------------------
   Gỡ một ví đã liên kết khỏi tài khoản (ví giữ hộ không gỡ được). NFT đang nằm
   ở ví đó vẫn ở nguyên trong ví (đã khoá, không chuyển ngược về PW) nhưng
   không còn được tính hạng. Liên kết lại đúng địa chỉ đó thì khôi phục.
   Trạng thái sống trong phiên xem trang.
   ============================================================ */

let unlinkTargetId = null;

/** Các ví đã gỡ trong phiên (giữ lại tên + địa chỉ để liên kết lại được). */
let unlinkedWallets = [];

function readEffectiveWalletId(title) {
  return completedTransfers.find((entry) => entry.titleId === title.id)?.walletId ?? title.walletId ?? 'pw-custodial';
}

function renderUnlinkModal(profile) {
  if (!unlinkTargetId) return '';
  const wallet = profile.wallets.find((item) => item.id === unlinkTargetId);
  if (!wallet) return '';
  const c = UNLINK_WALLET;

  const count = wallet.nftCount;
  const lead = count === 0 ? c.leadEmpty : count === 1 ? c.leadOne : c.leadMany.replace('{count}', count);

  return `
  <div class="lw-overlay" id="ul-overlay" role="presentation">
    <section class="lw-modal lw-modal-small" role="alertdialog" aria-modal="true" aria-labelledby="ul-title">
      <button class="lw-close" type="button" id="ul-close" aria-label="${escapeHtml(c.closeLabel)}">${ICONS.close}</button>
      <h2 id="ul-title">${escapeHtml(c.heading.replace('{name}', wallet.name))}</h2>
      <p class="lw-lead">${escapeHtml(lead)}</p>
      <p class="lw-note">${ICONS.info}<span>${escapeHtml(wallet.name)} · ${escapeHtml(wallet.addressLabel)}</span></p>
      <div class="lw-actions">
        <button class="lw-cancel" type="button" id="ul-cancel">${escapeHtml(c.cancelLabel)}</button>
        <button class="lw-danger" type="button" id="ul-confirm">${escapeHtml(c.confirmLabel)}</button>
      </div>
    </section>
  </div>`;
}

function rerenderKeepingScroll() {
  const scrollY = window.scrollY;
  renderCurrentRoute();
  window.scrollTo(0, scrollY);
}

function bindUnlinkWallet() {
  document.querySelectorAll('[data-unlink]').forEach((button) => {
    button.addEventListener('click', () => {
      unlinkTargetId = button.dataset.unlink;
      rerenderKeepingScroll();
    });
  });

  const close = () => { unlinkTargetId = null; rerenderKeepingScroll(); };
  const overlay = document.getElementById('ul-overlay');
  overlay?.addEventListener('mousedown', (event) => { if (event.target === overlay) close(); });
  document.getElementById('ul-close')?.addEventListener('click', close);
  document.getElementById('ul-cancel')?.addEventListener('click', close);

  document.getElementById('ul-confirm')?.addEventListener('click', () => {
    const wallet = readMemberProfile()?.wallets.find((item) => item.id === unlinkTargetId);
    if (wallet) {
      unlinkedWallets = [...unlinkedWallets, { id: wallet.id, name: wallet.name, addressLabel: wallet.addressLabel, at: new Date() }];
    }
    close();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && unlinkTargetId) { unlinkTargetId = null; rerenderKeepingScroll(); }
});

/**
 * Ví đã gỡ biến khỏi tài khoản: PW không còn biết ví đó của ai nên NFT trong ví đó cũng rời khỏi hồ sơ
 * (My Titles, Titles owned, hạng và thẻ Directory đều suy ra từ danh sách này nên tự giảm theo).
 * NFT vẫn nằm khoá trong ví; liên kết lại đúng địa chỉ thì NFT quay về. Thêm một dòng ở Recent activity.
 */
function withUnlinkedWallets(profile) {
  if (!unlinkedWallets.length) return profile;

  const gone = new Set(unlinkedWallets.map((wallet) => wallet.id));
  const card = UNLINK_WALLET;

  const titles = profile.titles.filter((title) => !gone.has(readEffectiveWalletId(title)));

  const activity = unlinkedWallets.map((wallet) => ({
    id: `wallet-unlinked-${wallet.id}`,
    title: card.activity.title,
    state: card.activity.state,
    detail: [
      { text: `${wallet.name} (` },
      { text: wallet.addressLabel, tone: 'blue' },
      { text: card.activity.suffix },
    ],
    timestamp: formatIssuedTime(wallet.at),
  })).reverse();

  return {
    ...profile,
    titles,
    wallets: profile.wallets.filter((wallet) => !gone.has(wallet.id)),
    activity: [...activity, ...profile.activity],
  };
}

/* ============================================================
   MÀN ADJUST POINTS — #/admin-points
   ------------------------------------------------------------
   Đo từ design/PW — Admin Portal (Adjust Points).png.

   Admin tìm một thành viên, cộng hoặc trừ điểm kèm lý do. Thành viên
   duy nhất có số dư thật là tài khoản đã đăng ký trong trình duyệt
   này, nên chỉ tài khoản đó tra được. Điểm chỉnh xong chạy thẳng vào
   `readMemberProfile()` → Dashboard, bước thanh toán, thẻ ở Directory.

   Trạng thái chỉ sống trong phiên xem trang và bị xoá mỗi lần admin
   đăng nhập lại, giống Grant Award.
   ============================================================ */

let pointsQuery = '';
let pointsMember = null;

/** Số điểm chỉnh, có dấu: '' | '-' | '250' | '-250'. Dương là cộng, âm là trừ. */
let pointsAmount = '';
let pointsReason = '';
let pointsReasonOpen = false;
let pointsNote = '';
let pointsError = null;
let pointsNotice = null;

/** Mọi lần chỉnh điểm trong phiên, mới nhất đứng đầu. */
let pointAdjustments = [];

/** Bản nháp chưa áp dụng — hiện trong lịch sử, chưa đổi số dư. */
let pointDrafts = [];

/** Thành viên tra được = tài khoản đã đăng ký (nơi duy nhất có số dư). */
function searchPointMembers(query) {
  const needle = query.trim().toLowerCase().replace(/^#/, '');
  if (!needle) return [];
  return listAwardCandidates().filter(({ account, name, code }) =>
    account && (name.toLowerCase().includes(needle)
      || (code ?? '').toLowerCase().replace(/^#/, '').includes(needle)));
}

function readPointsBalance() {
  return pointsMember?.account ? withMemberContext(pointsMember.account, readMemberProfile)?.points ?? 0 : 0;
}

function readPointsDelta() {
  return Number(pointsAmount) || 0;
}

/** Không cho trừ quá số dư: số trừ bị chặn lại ở đúng số điểm đang có (số dư không xuống dưới 0). */
function clampPointsAmount() {
  const delta = readPointsDelta();
  const balance = readPointsBalance();
  if (delta < 0 && balance + delta < 0) pointsAmount = balance > 0 ? String(-balance) : '-';
}

function formatPoints(value) {
  return value.toLocaleString('en-US');
}

function formatSignedPoints(delta) {
  return `${delta < 0 ? '-' : '+'}${formatPoints(Math.abs(delta))}`;
}

function renderPointsSuggestions(content) {
  if (!pointsQuery.trim() || pointsMember) return '';
  const matches = searchPointMembers(pointsQuery);
  const items = matches.length
    ? matches.map(({ name, kind }, index) => `
        <li><button type="button" class="awd-suggest-item" data-index="${index}">
          <span>${escapeHtml(name)}</span><small>${escapeHtml(kind)}</small>
        </button></li>`).join('')
    : `<li class="awd-suggest-empty">${escapeHtml(content.suggestionsEmpty)}</li>`;
  return `<ul class="awd-suggest" id="adp-suggest">${items}</ul>`;
}

function renderPointsReason(content) {
  const chosen = content.reasons.find(({ id }) => id === pointsReason);
  const options = content.reasons.map(({ id, label, hint }) => `
      <li><button type="button" role="option" class="adp-option${id === pointsReason ? ' is-on' : ''}"
                  data-reason="${escapeHtml(id)}" aria-selected="${id === pointsReason}">
        <b>${escapeHtml(label)}</b>${hint ? `<small>${escapeHtml(hint)}</small>` : ''}
      </button></li>`).join('');

  return `
      <div class="adp-reason">
        <button class="adp-reason-btn${pointsReasonOpen ? ' is-open' : ''}${chosen ? ' has-value' : ''}" type="button"
                id="adp-reason-btn" aria-haspopup="listbox" aria-expanded="${pointsReasonOpen}">
          <span>${escapeHtml(chosen ? chosen.label : content.reasonPlaceholder)}</span>${ICONS.chevronDown}
        </button>
        <p class="adp-hint">${escapeHtml(content.reasonHint)}</p>
        ${pointsReasonOpen ? `<ul class="adp-options" role="listbox">${options}</ul>` : ''}
      </div>`;
}

function renderPointsForm(content) {
  const balance = pointsMember ? readPointsBalance() : null;
  const delta = readPointsDelta();
  const newBalance = balance === null ? null : balance + delta;

  const errors = {
    notFound: content.notFound,
    member: content.missingMember,
    amount: content.invalidAmount,
    exceeds: content.exceedsBalance,
    reason: content.missingReason,
    note: content.missingNote,
  };

  return `
    <section class="card adp-form">
      <h1>${escapeHtml(content.heading)}</h1>
      <p class="adp-lead">${escapeHtml(content.lead)}</p>

      <p class="adp-label">${escapeHtml(content.memberLabel)}</p>
      <div class="awd-search">
        <span class="awd-search-field">
          ${ICONS.search}
          <input type="search" id="adp-query" value="${escapeHtml(pointsQuery)}"
                 placeholder="${escapeHtml(content.searchPlaceholder)}"
                 aria-label="${escapeHtml(content.searchLabel)}">
        </span>
        <button class="awd-find" type="button" id="adp-find">
          ${ICONS.checkBadge}${escapeHtml(content.findLabel)}
        </button>
      </div>
      ${renderPointsSuggestions(content)}
      ${pointsMember ? renderAwardRecipientBox(content, pointsMember) : ''}

      <p class="adp-label">${escapeHtml(content.balanceLabel)}</p>
      <div class="adp-balance">
        <span class="adp-balance-label">${escapeHtml(content.currentPointsLabel)}</span>
        <p><b>${balance === null ? escapeHtml(content.emptyValue) : formatPoints(balance)}</b><span>${escapeHtml(content.unit)}</span></p>
      </div>

      <p class="adp-label">${escapeHtml(content.adjustmentLabel)}</p>
      <div class="adp-amount-row">
        <div class="adp-amount">
          <label for="adp-amount">${escapeHtml(content.magnitudeLabel)}</label>
          <span class="adp-amount-field${pointsError === 'amount' || pointsError === 'exceeds' ? ' has-error' : ''}">
            <button type="button" id="adp-sign" class="adp-sign${pointsAmount.startsWith('-') ? ' is-minus' : ''}" aria-label="Switch between adding and deducting points">${pointsAmount.startsWith('-') ? '−' : '+'}</button>
            <input id="adp-amount" type="text" inputmode="numeric" autocomplete="off" maxlength="10"
                   value="${escapeHtml(pointsAmount.replace('-', '') === '' ? '' : formatPoints(Math.abs(Number(pointsAmount))))}" placeholder="0">
            <span>${escapeHtml(content.unit)}</span>
            <span class="adp-step">
              <button type="button" id="adp-minus" aria-label="${escapeHtml(content.decreaseLabel)}">−</button>
              <button type="button" id="adp-plus" aria-label="${escapeHtml(content.increaseLabel)}">+</button>
            </span>
          </span>
        </div>
        <div class="adp-new">
          <span class="adp-balance-label">${escapeHtml(content.newBalanceLabel)}</span>
          <p class="${newBalance !== null && newBalance < balance ? 'is-down' : ''}">${newBalance === null ? escapeHtml(content.emptyValue) : `${formatPoints(newBalance)} ${escapeHtml(content.unit)}`}</p>
        </div>
      </div>

      <p class="adp-label">${escapeHtml(content.reasonLabel)} <b class="ink-red">*</b></p>
      ${renderPointsReason(content)}

      <p class="adp-label adp-note-label">${escapeHtml(content.noteLabel)} · ${pointsNote.length}/${content.noteMax}</p>
      <textarea class="awd-textarea adp-note${pointsError === 'note' ? ' has-error' : ''}" id="adp-note" rows="3"
                maxlength="${content.noteMax}">${escapeHtml(pointsNote)}</textarea>

      ${pointsError ? `<p class="awd-error">${ICONS.alert}${escapeHtml(errors[pointsError])}</p>` : ''}
      ${pointsNotice ? `<p class="adp-notice">${ICONS.checkMark}<span>${escapeHtml(pointsNotice)}</span></p>` : ''}

      <div class="adp-actions">
        <button class="adp-draft" type="button" id="adp-draft">${escapeHtml(content.saveDraftLabel)}</button>
        <span>
          <button class="adp-cancel" type="button" id="adp-cancel">${escapeHtml(content.cancelLabel)}</button>
          <button class="awd-submit" type="button" id="adp-apply">${escapeHtml(content.applyLabel)}</button>
        </span>
      </div>
    </section>`;
}

function renderPointsAside(content) {
  const { activity } = content;

  const mine = pointAdjustments
    .filter((entry) => pointsMember && entry.entityId === pointsMember.entityId)
    .map((entry) => ({
      date: entry.at.toISOString().slice(0, 10),
      title: content.reasons.find(({ id }) => id === entry.reason)?.label ?? '',
      delta: entry.delta,
    }));
  const drafts = pointDrafts
    .filter((entry) => pointsMember && entry.entityId === pointsMember.entityId)
    .map((entry) => ({
      id: entry.id,
      isDraft: true,
      date: entry.at.toISOString().slice(0, 10),
      title: content.reasons.find(({ id }) => id === entry.reason)?.label ?? content.reasonPlaceholder,
      delta: entry.delta,
    }));
  const rows = pointsMember ? [...drafts, ...mine, ...activity.sample].slice(0, activity.limit + drafts.length) : [];

  const history = rows.length
    ? rows.map(({ id, isDraft, date, title, delta }) => `
      <li${isDraft ? ' class="is-draft"' : ''}>
        <span class="adp-act-date">${escapeHtml(date)}</span>
        <span class="adp-act-title">${isDraft
          ? `<button type="button" class="adp-draft-row" data-draft="${escapeHtml(id)}" title="${escapeHtml(content.resumeDraftLabel)}">${escapeHtml(title)}</button><em>${escapeHtml(content.draftLabel)}</em>`
          : escapeHtml(title)}</span>
        <b class="${isDraft ? 'ink-amber' : delta < 0 ? 'ink-red' : 'ink-green'}">${formatSignedPoints(delta)} ${escapeHtml(content.unit)}</b></li>`).join('')
    : `<li class="adp-act-empty">${escapeHtml(activity.empty)}</li>`;

  return `
    <aside class="adp-aside">
      <section class="card adp-activity">
        <header>
          <h2>${escapeHtml(activity.heading)}</h2>
          <span>${pointsMember ? escapeHtml(pointsMember.name) : ''}</span>
        </header>
        <ul>${history}</ul>
      </section>
    </aside>`;
}

function renderAdminPointsPage(content) {
  const body = `
        ${renderAdminHead(content)}

        <div class="adm-grid is-three">
          <div class="adm-side">
            ${renderAdminModules(content.modules, '#/admin-points')}
            ${renderAdminActivity(content.activity)}
          </div>

          ${renderPointsForm(content.points)}
          ${renderPointsAside(content.points)}
        </div>`;

  return renderDashboardShell(readAdminProfile(), '#/admin', body, {
    modifier: 'dash-admin',
    topbarLabel: content.topbarLabel,
    nav: content.nav,
  });
}

function bindAdminPointsPage() {
  bindDashboardShell();
  bindAdminModules();
  bindAuditLinks();

  const content = ADMIN.points;

  /* Dựng lại cả tuyến rồi trả con trỏ về ô đang gõ. */
  const refresh = (focusId) => {
    renderCurrentRoute();
    const next = focusId && document.getElementById(focusId);
    if (next) {
      next.focus();
      // Dựng lại cả tuyến làm mất con trỏ — đặt về cuối, nếu không chữ gõ tiếp sẽ chèn lên đầu (bị ngược).
      if (next.setSelectionRange) next.setSelectionRange(next.value.length, next.value.length);
    }
  };

  const query = document.getElementById('adp-query');
  query?.addEventListener('input', () => {
    pointsQuery = query.value;
    pointsMember = null;
    pointsError = null;
    pointsNotice = null;
    refresh('adp-query');
  });
  query?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { event.preventDefault(); document.getElementById('adp-find').click(); }
  });
  document.getElementById('adp-find')?.addEventListener('click', () => {
    pointsMember = searchPointMembers(pointsQuery)[0] ?? null;
    pointsError = pointsMember ? null : 'notFound';
    pointsNotice = null;
    refresh();
  });
  document.querySelectorAll('#adp-suggest .awd-suggest-item').forEach((button) => {
    button.addEventListener('click', () => {
      const picked = searchPointMembers(pointsQuery)[Number(button.dataset.index)];
      if (!picked) return;
      pointsMember = picked;
      pointsQuery = picked.name;
      pointsError = null;
      refresh();
    });
  });

  const amount = document.getElementById('adp-amount');
  amount?.addEventListener('input', () => {
    // Gõ "-" thì chuyển sang trừ, gõ "+" thì về cộng; không gõ dấu thì giữ dấu hiện tại.
    const isNegative = /\+/.test(amount.value) ? false : /[-−]/.test(amount.value) || pointsAmount.startsWith('-');
    const digits = amount.value.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
    pointsAmount = digits === '' ? (isNegative ? '-' : '') : `${isNegative ? '-' : ''}${digits}`;
    clampPointsAmount();
    pointsError = null;
    pointsNotice = null;
    refresh('adp-amount');
  });

  // Bấm dấu +/− trước ô số để đổi cộng ↔ trừ (gõ "+" / "-" trong ô vẫn dùng được).
  document.getElementById('adp-sign')?.addEventListener('click', () => {
    const digits = pointsAmount.replace('-', '');
    pointsAmount = pointsAmount.startsWith('-') ? digits : `-${digits}`;
    clampPointsAmount();
    pointsError = null;
    pointsNotice = null;
    refresh('adp-amount');
  });

  const step = (direction) => {
    const next = readPointsDelta() + direction * content.stepAmount;
    pointsAmount = next === 0 ? '' : String(next);
    clampPointsAmount();
    pointsError = null;
    pointsNotice = null;
    refresh('adp-amount');
  };
  document.getElementById('adp-minus')?.addEventListener('click', () => step(-1));
  document.getElementById('adp-plus')?.addEventListener('click', () => step(1));

  document.getElementById('adp-reason-btn')?.addEventListener('click', () => {
    pointsReasonOpen = !pointsReasonOpen;
    refresh();
  });
  document.querySelectorAll('[data-reason]').forEach((button) => {
    button.addEventListener('click', () => {
      pointsReason = button.dataset.reason;
      pointsReasonOpen = false;
      pointsError = null;
      refresh();
    });
  });

  const note = document.getElementById('adp-note');
  note?.addEventListener('input', () => {
    pointsNote = note.value;
    pointsError = null;
    refresh('adp-note');
  });

  const clearForm = () => {
    pointsAmount = '';
    pointsReason = '';
    pointsReasonOpen = false;
    pointsNote = '';
    pointsError = null;
  };

  /* Cancel bỏ hết, kể cả thành viên đang chọn. Save Draft cất bản nháp vào
     lịch sử và xoá các ô; bản nháp sống tới khi admin đăng nhập lại. */
  document.getElementById('adp-cancel')?.addEventListener('click', () => {
    clearForm();
    pointsQuery = '';
    pointsMember = null;
    pointsNotice = null;
    navigateTo('#/admin');
  });
  document.getElementById('adp-draft')?.addEventListener('click', () => {
    if (!pointsMember) pointsError = 'member';
    else if (!readPointsDelta()) pointsError = 'amount';
    else pointsError = null;
    if (pointsError) { pointsNotice = null; refresh(); return; }

    pointDrafts = [{
      id: `draft-${Date.now()}`,
      entityId: pointsMember.entityId,
      amount: pointsAmount,
      delta: readPointsDelta(),
      reason: pointsReason,
      note: pointsNote,
      at: new Date(),
    }, ...pointDrafts];
    pointsNotice = content.draftSavedNotice;
    clearForm();
    refresh();
  });

  /* Bấm một bản nháp trong lịch sử để làm tiếp: nạp lại các ô và bỏ nó khỏi danh sách. */
  document.querySelectorAll('[data-draft]').forEach((button) => {
    button.addEventListener('click', () => {
      const draft = pointDrafts.find((entry) => entry.id === button.dataset.draft);
      if (!draft) return;
      pointsAmount = draft.amount;
      pointsReason = draft.reason;
      pointsNote = draft.note;
      pointsReasonOpen = false;
      pointsError = null;
      pointsNotice = null;
      pointDrafts = pointDrafts.filter((entry) => entry !== draft);
      refresh();
    });
  });

  document.getElementById('adp-apply')?.addEventListener('click', () => {
    const amountValue = Number(pointsAmount);
    const delta = readPointsDelta();
    if (!pointsMember) pointsError = 'member';
    else if (!amountValue) pointsError = 'amount';
    else if (readPointsBalance() + delta < 0) pointsError = 'exceeds';
    else if (!pointsReason) pointsError = 'reason';
    else if (pointsReason === 'other' && !pointsNote.trim()) pointsError = 'note';
    else pointsError = null;

    if (pointsError) { pointsNotice = null; refresh(); return; }

    pointAdjustments = [{
      entityId: pointsMember.entityId,
      delta,
      reason: pointsReason,
      note: pointsNote.trim(),
      at: new Date(),
    }, ...pointAdjustments];

    pointsNotice = content.appliedNotice
      .replace('{name}', pointsMember.name)
      .replace('{balance}', formatPoints(readPointsBalance()));
    clearForm();
    refresh();
  });
}

/**
 * Điểm admin chỉnh tay cộng vào hồ sơ của tài khoản đăng ký: số dư đổi và
 * thêm một dòng ở Recent activity. Dashboard, bước thanh toán và thẻ ở
 * Directory đều đọc hồ sơ qua `readMemberProfile()` nên tự đúng theo.
 */
function withPointAdjustments(profile) {
  const mine = pointAdjustments.filter((entry) => entry.entityId === entityIdOf(AccountStore.read()));
  if (!mine.length) return profile;

  const entry = ADMIN.points.dashboardEntry;
  const activity = mine.map((adjustment) => ({
    id: `points-adjusted-${adjustment.at.getTime()}`,
    title: entry.title,
    state: entry.state,
    detail: [
      { text: `${formatSignedPoints(adjustment.delta)} PTS`, tone: adjustment.delta < 0 ? 'red' : 'green' },
      { text: ` ${ADMIN.points.reasons.find(({ id }) => id === adjustment.reason)?.label ?? ''}${entry.suffix}` },
    ],
    timestamp: formatIssuedTime(adjustment.at),
  }));

  return {
    ...profile,
    points: profile.points + mine.reduce((sum, adjustment) => sum + adjustment.delta, 0),
    activity: [...activity, ...profile.activity],
  };
}

/* ============================================================
   MÀN REVOKE NFT — #/admin-revoke
   ------------------------------------------------------------
   Đo từ design/PW — Admin Portal (Revoke NFT).png.

   Admin tìm một NFT, chọn lý do, tích ô xác nhận rồi thu hồi. NFT tra
   được là các NFT trong hồ sơ của tài khoản đã đăng ký (nơi duy nhất có
   NFT thật). Thu hồi xong NFT hiện là Revoked ở Dashboard và hồ sơ công
   khai, không còn được tính vào số lượng, hạng và số NFT được tính hạng.

   Trạng thái sống trong phiên xem trang, bị xoá mỗi lần admin đăng nhập
   lại — giống Grant Award và Adjust Points.
   ============================================================ */

let revokeQuery = '';
let revokeNftId = null;
let revokeReason = '';
let revokeReasonOpen = false;
let revokeNote = '';
let revokeConfirmed = false;
let revokeError = null;
let revokeNotice = null;

/** Các NFT đã thu hồi trong phiên, mới nhất đứng đầu. */
let revokedNfts = [];

/** Lần thu hồi đang chạy ở màn #/admin-revoking; null khi chưa bấm Revoke NFT. */
let pendingRevoke = null;
let revokeTimer = null;

/**
 * NFT tra được: các NFT của tài khoản đã đăng ký (thật, từ hồ sơ Dashboard) và của
 * sáu pháp nhân trong sổ đăng ký. Pháp nhân có hồ sơ thiết kế dùng mã token trong hồ
 * sơ; pháp nhân còn lại chỉ có tên danh hiệu trên thẻ nên mã được sinh theo quy tắc
 * `#PW-2026-<mã>-<4 số cuối mã hồ sơ>` — dữ liệu mẫu, không phải quy tắc thật.
 */
function listRevokableNfts() {
  const sample = ADMIN.revoke.sample;
  const items = [];

  AccountStore.members().forEach((account) => withMemberContext(account, () => {
    const profile = readMemberProfile();
    if (!profile) return;
    const wallet = profile.wallets[0];
    const holder = {
      entityId: entityIdOf(account),
      name: account.legalName,
      where: `${isDemoProfileOwner(account) ? sample.registrationId : (account.kycSubmission?.documentId ?? entityIdOf(account))} • ${account.country}`,
      wallet: wallet ? `${wallet.name} · ${wallet.addressLabel}` : '',
    };
    // Mỗi NFT nằm ở ví riêng của nó: Philanthropist đã chuyển sang ví cá nhân, danh hiệu vừa chuyển nằm ở ví đích.
    const walletOf = (title) => {
      const moved = completedTransfers.find((entry) => entry.titleId === title.id);
      if (moved) return `${moved.destinationName} · ${moved.destinationAddress}`;
      const home = profile.wallets.find((item) => item.id === (title.walletId ?? 'pw-custodial')) ?? wallet;
      return home ? `${home.name} · ${home.addressLabel}` : '';
    };
    profile.titles.forEach((title) => items.push({ title, holder: { ...holder, wallet: walletOf(title) } }));
  }));

  DIRECTORY.entities.forEach((entity) => {
    const holder = { entityId: entity.id, name: entity.name, where: `${entity.id} • ${entity.location}`, wallet: '' };
    const designed = DOSSIERS[entity.id];
    const nfts = designed
      ? [
        ...designed.titles.map((title) => ({ id: title.tokenId, name: title.name, kind: 'distinction' })),
        ...designed.awards.map((award) => ({ id: award.ref, name: award.name, kind: 'award' })),
      ]
      : sampleNftsOf(entity.id).map(({ id, name, kind }) => ({ id, name, kind }));
    grantedAwards
      .filter((award) => award.entityId === entity.id)
      .forEach((award) => nfts.push({ id: award.ref, name: award.name, kind: 'award' }));
    issuedTitles
      .filter((issued) => issued.isGift && issued.recipientEntityId === entity.id)
      .forEach((issued) => nfts.push({ id: issued.titleId, name: issued.name, kind: 'distinction' }));
    nfts.forEach((nft) => items.push({ title: { ...nft, revoked: isNftRevoked(entity.id, nft.id) }, holder }));
  });

  return items;
}

function searchRevokableNfts(query) {
  const needle = query.trim().toLowerCase().replace(/^#/, '');
  if (!needle) return [];
  return listRevokableNfts().filter(({ title, holder }) =>
    title.id.toLowerCase().replace(/^#/, '').includes(needle)
    || title.name.toLowerCase().includes(needle)
    || holder.name.toLowerCase().includes(needle));
}

/** Khoá chọn NFT gồm cả mã hồ sơ: hai pháp nhân có thể trùng mã token (dữ liệu mẫu của thiết kế). */
function revokeKey({ title, holder }) {
  return `${holder.entityId}|${title.id}`;
}

function isNftRevoked(entityId, nftId) {
  return revokedNfts.some((item) => item.entityId === entityId && item.nftId === nftId);
}

function readRevokeSelection() {
  return listRevokableNfts().find((item) => revokeKey(item) === revokeNftId) ?? null;
}

/** Thời điểm mint thật nếu NFT sinh ra trong phiên, ngược lại dùng số mẫu của thiết kế. */
function readMintTimestamp(title, sample) {
  const granted = grantedAwards.find((award) => award.ref === title.id);
  const issued = issuedTitles.find((entry) => entry.titleId === title.id);
  const at = granted?.grantedAt ?? issued?.issuedAt ?? (title.mintedAt ? new Date(title.mintedAt) : null);
  return at ? `${at.toISOString().slice(0, 10)} ${at.toISOString().slice(11, 19)} UTC` : sample.mintedAt;
}

function renderRevokeSuggestions(content) {
  if (!revokeQuery.trim() || revokeNftId) return '';
  const matches = searchRevokableNfts(revokeQuery);
  const items = matches.length
    ? matches.map(({ title, holder }, index) => `
        <li><button type="button" class="awd-suggest-item" data-index="${index}">
          <span>${escapeHtml(title.name)} · ${escapeHtml(title.id)}</span>
          <small>${escapeHtml(title.revoked ? content.card.statuses.revoked : holder.name)}</small>
        </button></li>`).join('')
    : `<li class="awd-suggest-empty">${escapeHtml(content.suggestionsEmpty)}</li>`;
  return `<ul class="awd-suggest" id="rvk-suggest">${items}</ul>`;
}

function renderRevokeCard(content, selection) {
  const { title, holder } = selection;
  const { card, sample } = content;
  const isRevoked = Boolean(title.revoked);
  const isAward = title.kind === 'award';

  return `
      <div class="rvk-card${isRevoked ? ' is-revoked' : ''}">
        <p class="rvk-card-top">
          <span class="rvk-status"><i class="dot"></i>${escapeHtml(card.statusLabel)} ${escapeHtml(isRevoked ? card.statuses.revoked : card.statuses.active)}</span>
          <span>${escapeHtml(card.tokenLabel)} ${escapeHtml(title.id)}</span>
        </p>

        <div class="rvk-card-cols">
          <div>
            <p class="rvk-key">${escapeHtml(card.holderLabel)}</p>
            <p class="rvk-holder">${escapeHtml(holder.name)}</p>
            <p class="rvk-where">${escapeHtml(holder.where)}</p>
            <span class="pill pill-green">${escapeHtml(card.verifiedPill)}</span>
          </div>
          <div>
            <p class="rvk-key">${escapeHtml(isAward ? card.awardLabel : card.distinctionLabel)}</p>
            <p class="rvk-award">${escapeHtml(title.name)}</p>
            ${isAward ? `<p class="rvk-soul">${ICONS.padlock}${escapeHtml(card.soulbound)}</p>` : ''}
          </div>
        </div>

        <div class="rvk-chain">
          <p><span>${escapeHtml(card.mintLabel)} ${escapeHtml(readMintTimestamp(title, sample))}</span>
             <span>${escapeHtml(card.contractLabel)} <b>${escapeHtml(sample.contract)}</b></span></p>
          ${holder.wallet ? `<p>${escapeHtml(card.walletLabel)} ${escapeHtml(holder.wallet)}</p>` : ''}
          <button type="button" class="rvk-onchain">${ICONS.padlock}${escapeHtml(card.onchainLabel)}${ICONS.linkOut}</button>
        </div>
      </div>`;
}

function renderRevokeReason(content) {
  const chosen = content.reasons.find(({ id }) => id === revokeReason);
  const options = content.reasons.map(({ id, label, hint }) => `
      <li><button type="button" role="option" class="adp-option${id === revokeReason ? ' is-on' : ''}"
                  data-rvk-reason="${escapeHtml(id)}" aria-selected="${id === revokeReason}">
        <b>${escapeHtml(label)}</b><small>${escapeHtml(hint)}</small>
      </button></li>`).join('');

  return `
      <div class="adp-reason">
        <button class="adp-reason-btn${revokeReasonOpen ? ' is-open' : ''}${chosen ? ' has-value' : ''}" type="button"
                id="rvk-reason-btn" aria-haspopup="listbox" aria-expanded="${revokeReasonOpen}">
          <span>${escapeHtml(chosen ? chosen.label : content.reasonPlaceholder)}</span>${ICONS.chevronDown}
        </button>
        <p class="adp-hint">${escapeHtml(content.reasonHint)}</p>
        ${revokeReasonOpen ? `<ul class="adp-options" role="listbox">${options}</ul>` : ''}
      </div>`;
}

function renderRevokeForm(content) {
  const selection = readRevokeSelection();
  const errors = {
    notFound: content.notFound,
    nft: content.missingNft,
    revoked: content.alreadyRevoked,
    reason: content.missingReason,
    note: content.missingNote,
    confirm: content.missingConfirm,
  };

  return `
    <section class="card rvk-form">
      <p class="adp-label rvk-first">${escapeHtml(content.findLabel)}</p>
      <div class="rvk-search">
        <span class="rvk-search-field">
          ${ICONS.search}
          <input type="search" id="rvk-query" value="${escapeHtml(revokeQuery)}"
                 placeholder="${escapeHtml(content.searchPlaceholder)}"
                 aria-label="${escapeHtml(content.searchLabel)}">
        </span>
        <button class="awd-find" type="button" id="rvk-find">${ICONS.checkBadge}${escapeHtml(content.findButton)}</button>
      </div>
      ${renderRevokeSuggestions(content)}
      ${selection ? renderRevokeCard(content, selection) : ''}

      <p class="adp-label">${escapeHtml(content.reasonLabel)} <b class="ink-red">*</b></p>
      ${renderRevokeReason(content)}

      <p class="adp-label rvk-note-label">${escapeHtml(content.noteLabel)}</p>
      <textarea class="awd-textarea rvk-note${revokeError === 'note' ? ' has-error' : ''}" id="rvk-note" rows="3"
                maxlength="${content.noteMax}">${escapeHtml(revokeNote)}</textarea>
      <p class="adp-label rvk-counter">${revokeNote.length} / ${content.noteMax} ${escapeHtml(content.counterSuffix)}</p>

      <label class="rvk-confirm${revokeError === 'confirm' ? ' has-error' : ''}">
        ${ICONS.alert}
        <input type="checkbox" id="rvk-confirm"${revokeConfirmed ? ' checked' : ''}>
        <span>${escapeHtml(content.confirmLabel)}</span>
      </label>

      ${revokeError ? `<p class="awd-error">${ICONS.alert}${escapeHtml(errors[revokeError])}</p>` : ''}
      ${revokeNotice ? `<p class="adp-notice">${ICONS.checkMark}${escapeHtml(revokeNotice)}</p>` : ''}

      <div class="rvk-actions">
        <button class="rvk-cancel" type="button" id="rvk-cancel">${escapeHtml(content.cancelLabel)}</button>
        <button class="rvk-submit" type="button" id="rvk-submit">${ICONS.gavel}${escapeHtml(content.submitLabel)}</button>
      </div>
    </section>`;
}

function renderRevokeAside(content) {
  const { recent } = content;

  const mine = revokedNfts.map((entry) => ({
    date: formatIssuedDate(entry.at),
    holder: entry.holder,
    title: `${entry.name} ${recent.kindLabels[entry.kind]}`,
    id: entry.nftId,
    reason: content.reasons.find(({ id }) => id === entry.reason)?.label ?? '',
    by: recent.adminName,
  }));
  const sample = recent.sample.map((entry) => ({
    ...entry, title: `${entry.title} ${recent.kindLabels[entry.kind]}`,
  }));

  const items = [...mine, ...sample].map(({ date, holder, title, id, reason, by }) => `
      <li>
        <b>${escapeHtml(date)} · ${escapeHtml(holder)}</b>
        <span>${escapeHtml(title)}</span>
        <span>${escapeHtml(id)}</span>
        <span>${escapeHtml(reason)} · ${escapeHtml(recent.byPrefix)} ${escapeHtml(by)}</span>
      </li>`).join('');

  return `
    <aside class="card rvk-recent">
      <h2>${escapeHtml(recent.heading)}</h2>
      <ul>${items}</ul>
    </aside>`;
}

function renderAdminRevokePage(content) {
  const revoke = content.revoke;

  const body = `
        ${renderAdminHead(content)}

        <div class="adm-grid">
          <div class="adm-side">
            ${renderAdminModules(content.modules, '#/admin-revoke')}
            ${renderAdminActivity(content.activity)}
          </div>

          <div class="adm-main">
            <section class="rvk-intro">
              <h1>${escapeHtml(revoke.heading)}<span class="rvk-badge">${escapeHtml(revoke.badge)}</span></h1>
              <p>${escapeHtml(revoke.lead)}</p>
            </section>

            <div class="rvk-grid">
              ${renderRevokeForm(revoke)}
              ${renderRevokeAside(revoke)}
            </div>
          </div>
        </div>`;

  return renderDashboardShell(readAdminProfile(), '#/admin', body, {
    modifier: 'dash-admin',
    topbarLabel: content.topbarLabel,
    nav: content.nav,
  });
}

function bindAdminRevokePage() {
  bindDashboardShell();
  bindAdminModules();

  const content = ADMIN.revoke;

  const refresh = (focusId) => {
    renderCurrentRoute();
    const next = focusId && document.getElementById(focusId);
    if (next) {
      next.focus();
      // Dựng lại cả tuyến làm mất con trỏ — đặt về cuối, nếu không chữ gõ tiếp sẽ chèn lên đầu (bị ngược).
      if (next.setSelectionRange) next.setSelectionRange(next.value.length, next.value.length);
    }
  };

  const query = document.getElementById('rvk-query');
  query?.addEventListener('input', () => {
    revokeQuery = query.value;
    revokeNftId = null;
    revokeError = null;
    revokeNotice = null;
    refresh('rvk-query');
  });
  query?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { event.preventDefault(); document.getElementById('rvk-find').click(); }
  });
  document.getElementById('rvk-find')?.addEventListener('click', () => {
    const found = searchRevokableNfts(revokeQuery)[0];
    revokeNftId = found ? revokeKey(found) : null;
    revokeError = found ? null : 'notFound';
    revokeNotice = null;
    refresh();
  });
  document.querySelectorAll('#rvk-suggest .awd-suggest-item').forEach((button) => {
    button.addEventListener('click', () => {
      const picked = searchRevokableNfts(revokeQuery)[Number(button.dataset.index)];
      if (!picked) return;
      revokeNftId = revokeKey(picked);
      revokeQuery = picked.title.id;
      revokeError = null;
      refresh();
    });
  });

  document.getElementById('rvk-reason-btn')?.addEventListener('click', () => {
    revokeReasonOpen = !revokeReasonOpen;
    refresh();
  });
  document.querySelectorAll('[data-rvk-reason]').forEach((button) => {
    button.addEventListener('click', () => {
      revokeReason = button.dataset.rvkReason;
      revokeReasonOpen = false;
      revokeError = null;
      refresh();
    });
  });

  const note = document.getElementById('rvk-note');
  note?.addEventListener('input', () => {
    revokeNote = note.value;
    revokeError = null;
    refresh('rvk-note');
  });

  document.getElementById('rvk-confirm')?.addEventListener('change', (event) => {
    revokeConfirmed = event.target.checked;
    revokeError = null;
  });

  const clearForm = () => {
    revokeReason = '';
    revokeReasonOpen = false;
    revokeNote = '';
    revokeConfirmed = false;
    revokeError = null;
  };

  document.getElementById('rvk-cancel')?.addEventListener('click', () => {
    clearForm();
    revokeQuery = '';
    revokeNftId = null;
    revokeNotice = null;
    navigateTo('#/admin');
  });

  document.getElementById('rvk-submit')?.addEventListener('click', () => {
    const selection = readRevokeSelection();
    if (!selection) revokeError = 'nft';
    else if (selection.title.revoked) revokeError = 'revoked';
    else if (!revokeReason) revokeError = 'reason';
    else if (revokeReason === 'other' && !revokeNote.trim()) revokeError = 'note';
    else if (!revokeConfirmed) revokeError = 'confirm';
    else revokeError = null;

    if (revokeError) { revokeNotice = null; refresh(); return; }

    const { title, holder } = selection;
    pendingRevoke = {
      entityId: holder.entityId,
      holder: holder.name,
      nftId: title.id,
      name: title.name,
      kind: title.kind,
      reason: revokeReason,
      note: revokeNote.trim(),
      startedAt: new Date(),
      at: null,
    };

    clearForm();
    revokeQuery = '';
    revokeNftId = null;
    revokeNotice = null;
    navigateTo('#/admin-revoking');
  });
}

/**
 * NFT bị thu hồi: thẻ ở Dashboard đổi nhãn thành Revoked và mất nút chuyển nhượng,
 * thêm một dòng ở Recent activity, số NFT được tính hạng giảm 1 và hạng tụt lại đúng
 * bằng số bậc đã lên khi nhận NFT đó. Các ô số liệu bỏ qua NFT đã thu hồi.
 */
function withRevocations(profile) {
  const mine = revokedNfts.filter((item) => item.entityId === entityIdOf(AccountStore.read()));
  if (!mine.length) return profile;

  const entry = ADMIN.revoke.dashboardEntry;
  const revokedIds = new Set(mine.map((item) => item.nftId));

  const rankLost = mine.reduce((sum, item) => sum
    + (item.kind === 'award' ? ADMIN.grant.rankGainPerAward : OUTCOME.issuedTitle.rankGainPerTitle), 0);

  const activity = mine.map((item) => ({
    id: `nft-revoked-${item.nftId}`,
    title: entry.title,
    state: entry.state,
    detail: [
      { text: `${item.name} (` },
      { text: item.nftId, tone: 'blue' },
      { text: `${entry.middle}${ADMIN.revoke.reasons.find(({ id }) => id === item.reason)?.label ?? ''}` },
    ],
    timestamp: formatIssuedTime(item.at),
  }));

  return {
    ...profile,
    titles: profile.titles.map((title) => (revokedIds.has(title.id)
      ? { ...title, revoked: true, pills: [entry.revokedPill], primaryAction: undefined, note: undefined }
      : title)),
    activity: [...activity, ...profile.activity],
    rank: profile.rank === null ? null : profile.rank + rankLost,
  };
}


/* ============================================================
   MÀN AUDIT LOGS — #/admin-audit
   ------------------------------------------------------------
   Đo từ design/PW — Admin Portal (Audit Logs).png.

   Nhật ký = năm dòng mẫu của thiết kế + những việc admin làm trong
   phiên xem trang (trao award, chỉnh điểm, thu hồi NFT, duyệt / từ
   chối KYC), mới nhất đứng đầu. Nhật ký không có chỗ sửa hay xoá —
   đúng câu trong thiết kế. Mục sinh ra trong phiên mất mỗi lần admin
   đăng nhập lại, giống các màn admin khác.
   ============================================================ */

let auditChipId = ADMIN.audit.defaultChipId;
let auditFilter = '';
let auditQuery = '';
let auditSignerId = 'all';
let auditFrom = '';
let auditTo = '';

function hasAuditFilters() {
  return auditChipId !== ADMIN.audit.defaultChipId || auditSignerId !== 'all' || auditFrom !== '' || auditTo !== '' || auditQuery.trim() !== '';
}

function resetAuditFilters() {
  auditChipId = ADMIN.audit.defaultChipId;
  auditFilter = '';
  auditQuery = '';
  auditSignerId = 'all';
  auditFrom = '';
  auditTo = '';
}

/** Quyết định duyệt KYC trong phiên — màn duyệt ghi vào đây để nhật ký đọc. */
let kycDecisions = [];

/** Mở Nhật ký đã lọc sẵn: các màn khác dùng để dẫn tới dòng vừa sinh ra. */
function openAuditLog({ chipId = 'all', query = '' } = {}) {
  resetAuditFilters();
  auditChipId = chipId;
  auditQuery = query;
  navigateTo('#/admin-audit');
}

/** Nút/liên kết mang data-audit-chip (và tuỳ chọn data-audit-query) dẫn sang Nhật ký. */
function bindAuditLinks() {
  document.querySelectorAll('[data-audit-chip]').forEach((button) => {
    button.addEventListener('click', () => openAuditLog({
      chipId: button.dataset.auditChip,
      query: button.dataset.auditQuery ?? '',
    }));
  });
}

/** Mã băm giả cho bản demo, cố định theo nội dung: 0x + 4 hex … 4 hex. */
function fakeTxHash(seed) {
  let h = 5381;
  for (let i = 0; i < seed.length; i += 1) h = ((h * 33) ^ seed.charCodeAt(i)) >>> 0;
  const hex = h.toString(16).padStart(8, '0');
  const rev = [...hex].reverse().join('');
  return `0x${hex.slice(0, 4)}…${rev.slice(0, 4)}`;
}

function formatAuditTime(date) {
  const day = date.toISOString().slice(0, 10);
  const time = date.toISOString().slice(11, 19);
  return `${day} ${time}`;
}

/** Toàn bộ nhật ký, mới nhất đứng đầu. */
function readAuditEntries() {
  const audit = ADMIN.audit;
  const members = AccountStore.members();
  const nameOf = (entityId) => members.find((member) => entityIdOf(member) === entityId)?.legalName
    ?? DIRECTORY.entities.find((entity) => entity.id === entityId)?.name ?? entityId;

  const events = [
    ...grantedAwards.map((award) => ({
      at: award.grantedAt, signer: 'master', action: 'GRANT_MINT', entityId: award.entityId,
      target: nameOf(award.entityId), sub: `${award.name} · ${award.ref}`,
      reason: award.citation,
    })),
    ...pointAdjustments.map((entry) => ({
      at: entry.at, signer: 'master', action: 'POINTS_ADJUST', entityId: entry.entityId,
      target: nameOf(entry.entityId),
      sub: `${formatSignedPoints(entry.delta)} PTS`,
      reason: [ADMIN.points.reasons.find(({ id }) => id === entry.reason)?.label, entry.note].filter(Boolean).join(' — '),
    })),
    ...revokedNfts.map((entry) => ({
      at: entry.at, signer: 'master', action: 'NFT_REVOKE', entityId: entry.entityId,
      target: entry.holder, sub: `${entry.name} · ${entry.nftId}`,
      reason: [ADMIN.revoke.reasons.find(({ id }) => id === entry.reason)?.label, entry.note].filter(Boolean).join(' — '),
    })),
    // Mua / nhận quà → mint NFT cho người nhận; chuyển ra ví tự quản → ghi một dòng (FR-013, FR-014; BRD ghi Audit cho cả hai).
    ...allIssuedTitles().map((issued) => {
      const owner = issued.isGift ? null : AccountStore.members().find((member) => member.legalName === issued.buyerName);
      return {
        at: issued.issuedAt, signer: 'master', action: 'NFT_MINT',
        entityId: issued.isGift ? issued.recipientEntityId : (owner ? entityIdOf(owner) : null),
        target: issued.isGift ? (issued.recipientName ?? '—') : (issued.buyerName || '—'),
        sub: `${issued.name} · ${issued.titleId}`,
        reason: issued.isGift ? `Gifted by ${issued.buyerName || 'a member'}` : 'Purchased by the holder',
      };
    }),
    ...allCompletedTransfers().filter((entry) => entry.at).map((entry) => {
      const owner = AccountStore.members().find((member) => member.email?.toLowerCase() === entry.holderEmail?.toLowerCase());
      return {
        at: entry.at, signer: 'hsm', action: 'NFT_TRANSFER', entityId: owner ? entityIdOf(owner) : null,
        target: entry.holderName || '—', sub: `${entry.name} · ${entry.titleId}`,
        reason: `To own wallet ${entry.destinationAddress}`,
      };
    }),
    ...kycDecisions.map((entry) => ({
      at: entry.at, signer: 'complianceCh', action: entry.decision === 'approve' ? 'KYC_APPROVE' : 'KYC_REJECT',
      target: entry.name, sub: entry.reviewId, reason: entry.reason ?? '',
    })),
  ]
    .sort((a, b) => a.at - b.at)
    .map((event, index) => ({
      ...event,
      time: formatAuditTime(event.at),
      block: audit.sessionBlockBase + index,
      hash: fakeTxHash(`${event.action}${event.target}${event.sub}${event.at.getTime()}`),
      reason: event.reason || '—',
      isSession: true,
    }))
    .reverse();

  const sample = audit.sample.map((entry) => ({
    ...entry,
    // Ba dòng mẫu nói về Apex: nối được sang hồ sơ của tài khoản đăng ký.
    entityId: entry.target === audit.sample[0].target ? ADMIN.grant.registeredRecipient.entityId : null,
    target: entry.target === audit.sample[0].target ? DEMO_MEMBER_ACCOUNT.legalName : entry.target,
    time: `${entry.at} UTC`.replace(/ UTC$/, ''),
    isSession: false,
  }));

  return [...events, ...sample];
}

function matchesAuditFilters(entry) {
  const audit = ADMIN.audit;
  if (auditChipId !== 'all' && audit.actions[entry.action].group !== auditChipId) return false;
  if (auditSignerId !== 'all' && entry.signer !== auditSignerId) return false;
  const day = entry.time.slice(0, 10);
  if (auditFrom && day < auditFrom) return false;
  if (auditTo && day > auditTo) return false;

  const haystack = [
    audit.signers[entry.signer].name, audit.signers[entry.signer].address,
    entry.target, entry.sub, entry.reason ?? '', entry.hash, entry.action, String(entry.block),
  ].join(' ').toLowerCase();

  const matches = (needle) => !needle.trim() || haystack.includes(needle.trim().toLowerCase().replace(/^#/, ''));
  return matches(auditFilter) && matches(auditQuery);
}

function renderAuditRow(entry, audit) {
  const signer = audit.signers[entry.signer];
  const action = audit.actions[entry.action];
  const timeText = entry.isSession ? `${entry.time} UTC` : `${entry.time} UTC`;

  return `
        <div class="aud-row" role="row">
          <div class="aud-cell aud-time" role="cell">
            <b>${escapeHtml(timeText)}</b>
            <span><i>#</i>${escapeHtml(audit.blockPrefix)} #${entry.block.toLocaleString('en-US')}</span>
          </div>
          <div class="aud-cell aud-signer" role="cell">
            <span class="aud-signer-icon">${ICONS[signer.icon]}</span>
            <span><b>${escapeHtml(signer.name)}</b><small>${escapeHtml(signer.address)}</small></span>
          </div>
          <div class="aud-cell" role="cell">
            <span class="aud-action is-${escapeHtml(action.tone)}"><i></i>${escapeHtml(entry.action)}</span>
          </div>
          <div class="aud-cell aud-target" role="cell">
            ${entry.entityId && readDossier(entry.entityId)
              ? `<button type="button" class="aud-target-link" data-entity="${escapeHtml(entry.entityId)}">${escapeHtml(entry.target)}</button>`
              : `<b>${escapeHtml(entry.target)}</b>`}
            <small>${escapeHtml(entry.sub)}</small>
          </div>
          <div class="aud-cell aud-reason" role="cell">${escapeHtml(entry.reason || '—')}</div>
          <div class="aud-cell aud-hash" role="cell">${escapeHtml(entry.hash)}</div>
        </div>`;
}

function renderAuditPage(content) {
  const audit = content.audit;
  const all = readAuditEntries();
  const rows = all.filter(matchesAuditFilters);
  const sessionCount = all.filter((entry) => entry.isSession).length;

  const chips = audit.chips.map(({ id, label }) => `
          <button class="aud-chip${id === auditChipId ? ' is-on' : ''}" type="button" data-chip="${escapeHtml(id)}"
                  aria-pressed="${id === auditChipId}">${escapeHtml(label)}</button>`).join('');

  const head = audit.columns.map(({ label }) => `<div class="aud-cell" role="columnheader">${escapeHtml(label)}</div>`).join('');
  const pages = audit.pagination.pages.map((label, index) => `
          <button class="aud-page${index === 0 ? ' is-on' : ''}" type="button"${index === 0 ? ' aria-current="page"' : ''}>${escapeHtml(label)}</button>`).join('');

  const body = `
        ${renderAdminHead(content)}

        <div class="adm-grid">
          <div class="adm-side">
            ${renderAdminModules(content.modules, '#/admin-audit')}
            ${renderAdminActivity(content.activity)}
          </div>

          <div class="adm-main">
            <section class="card aud-top">
              <header class="aud-head">
                <div>
                  <h1>${escapeHtml(audit.heading)}</h1>
                  <p>${escapeHtml(audit.lead)}</p>
                </div>
                <div class="aud-tools">
                  <button class="aud-icon-btn" type="button" id="aud-reset" aria-label="${escapeHtml(audit.refreshLabel)}">${ICONS.refresh}</button>
                  <button class="aud-export" type="button" id="aud-export">${ICONS.download}${escapeHtml(audit.exportLabel)}</button>
                </div>
              </header>

              <div class="aud-filter">
                <span class="aud-chips">${chips}</span>
                <span class="aud-count">${escapeHtml(audit.displaying
                  .replace('{shown}', rows.length)
                  .replace('{total}', (audit.baseTotal + sessionCount).toLocaleString('en-US')))}<i></i></span>
              </div>

              <div class="aud-filter-row">
                <label class="aud-select">
                  <span>${escapeHtml(audit.signerFilterLabel)}</span>
                  <select id="aud-signer">
                    <option value="all">${escapeHtml(audit.allSignersLabel)}</option>
                    ${Object.entries(audit.signers).map(([id, signer]) => `<option value="${escapeHtml(id)}"${id === auditSignerId ? ' selected' : ''}>${escapeHtml(signer.name)}</option>`).join('')}
                  </select>
                </label>
                <label class="aud-select">
                  <span>${escapeHtml(audit.fromLabel)}</span>
                  <input type="date" id="aud-from" value="${escapeHtml(auditFrom)}"${auditTo ? ` max="${escapeHtml(auditTo)}"` : ''}>
                </label>
                <label class="aud-select">
                  <span>${escapeHtml(audit.toLabel)}</span>
                  <input type="date" id="aud-to" value="${escapeHtml(auditTo)}"${auditFrom ? ` min="${escapeHtml(auditFrom)}"` : ''}>
                </label>
                <button class="aud-reset-link" type="button" id="aud-reset-link"${hasAuditFilters() ? '' : ' disabled'}>${escapeHtml(audit.resetLabel)}</button>
              </div>

            </section>

            <div class="aud-search">
              <span class="aud-search-field">
                ${ICONS.search}
                <input type="search" id="aud-query" value="${escapeHtml(auditQuery)}"
                       placeholder="${escapeHtml(audit.searchPlaceholder)}" aria-label="${escapeHtml(audit.searchLabel)}">
              </span>
                <button class="awd-find" type="button" id="aud-find">${ICONS.checkBadge}${escapeHtml(audit.findLabel)}</button>
            </div>

            <section class="card aud-card">
              <div class="aud-scroll">
                <div class="aud-table" role="table">
                  <div class="aud-row aud-row-head" role="row">${head}</div>
                  ${rows.length ? rows.map((entry) => renderAuditRow(entry, audit)).join('') : `<p class="aud-empty">${escapeHtml(audit.empty)}</p>`}
                </div>
              </div>

              <footer class="aud-foot">
                <p>${escapeHtml(audit.pagination.info)}</p>
                <nav aria-label="Pagination">
                  <button class="aud-page is-muted" type="button" disabled>${escapeHtml(audit.pagination.prevLabel)}</button>
                  ${pages}
                  <span class="aud-gap">${escapeHtml(audit.pagination.gapLabel)}</span>
                  <button class="aud-page" type="button">${escapeHtml(audit.pagination.lastPage)}</button>
                  <button class="aud-page is-next" type="button">${escapeHtml(audit.pagination.nextLabel)}</button>
                </nav>
              </footer>
            </section>
          </div>
        </div>`;

  return renderDashboardShell(readAdminProfile(), '#/admin', body, {
    modifier: 'dash-admin',
    topbarLabel: content.topbarLabel,
    nav: content.nav,
  });
}

function bindAuditPage() {
  bindDashboardShell();
  bindAdminModules();

  const audit = ADMIN.audit;

  /* Bấm tên đối tượng để mở hồ sơ công khai (khi pháp nhân đã có hồ sơ). */
  document.querySelectorAll('[data-entity]').forEach((button) => {
    button.addEventListener('click', () => {
      dossierEntityId = button.dataset.entity;
      navigateTo('#/entity');
    });
  });

  /* Gõ tới đâu lọc tới đó, giữ con trỏ ở cuối ô. */
  const refresh = (focusId) => {
    renderCurrentRoute();
    const next = focusId && document.getElementById(focusId);
    if (next) {
      next.focus();
      next.setSelectionRange(next.value.length, next.value.length);
    }
  };

  const query = document.getElementById('aud-query');
  query?.addEventListener('input', () => { auditQuery = query.value; refresh('aud-query'); });
  query?.addEventListener('keydown', (event) => { if (event.key === 'Enter') event.preventDefault(); });
  document.getElementById('aud-find')?.addEventListener('click', () => refresh('aud-query'));

  document.querySelectorAll('[data-chip]').forEach((button) => {
    button.addEventListener('click', () => { auditChipId = button.dataset.chip; refresh(); });
  });

  document.getElementById('aud-signer')?.addEventListener('change', (event) => { auditSignerId = event.target.value; refresh(); });
  document.getElementById('aud-from')?.addEventListener('change', (event) => { auditFrom = event.target.value; refresh(); });
  document.getElementById('aud-to')?.addEventListener('change', (event) => { auditTo = event.target.value; refresh(); });

  const reset = () => { resetAuditFilters(); refresh(); };
  document.getElementById('aud-reset')?.addEventListener('click', reset);
  document.getElementById('aud-reset-link')?.addEventListener('click', reset);

  /* Xuất đúng những dòng đang hiện. Tệp tạo ngay trong trình duyệt, không gửi đi đâu. */
  document.getElementById('aud-export')?.addEventListener('click', () => {
    const quote = (value) => `"${String(value).replace(/"/g, '""')}"`;
    const lines = [
      audit.columns.map(({ label }) => quote(label)).join(','),
      ...readAuditEntries().filter(matchesAuditFilters).map((entry) => [
        `${entry.time} UTC`, audit.signers[entry.signer].name, entry.action, `${entry.target} — ${entry.sub}`, entry.reason || '—', entry.hash,
      ].map(quote).join(',')),
    ];
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = audit.exportFile;
    link.click();
    URL.revokeObjectURL(url);
  });
}

/* ============================================================
   MÀN ĐANG THU HỒI / ĐÃ THU HỒI — #/admin-revoking
   ------------------------------------------------------------
   Sau khi bấm Revoke NFT. Cùng khung với màn phát hành của Grant Award
   (#/admin-issuing) và màn kết quả của thành viên, đổi sang trạng thái
   Revoking → Revoked (nhấn đỏ). Thiết kế chưa vẽ màn này.
   ============================================================ */

/** Ghi lần thu hồi vào sổ. Chạy một lần, kể cả khi đã rời màn. */
function recordRevocation() {
  const pending = pendingRevoke;
  if (!pending || pending.at) return;
  pending.at = new Date();
  const { startedAt, ...entry } = pending;
  revokedNfts = [entry, ...revokedNfts];
}

function readRevokeReasonLabel(pending) {
  return ADMIN.revoke.reasons.find(({ id }) => id === pending.reason)?.label ?? '';
}

function renderRevokingProgress(content, pending) {
  const rows = [
    renderOutcomeRow(content.labels.nft, `<i class="outcome-dot is-red"></i>${escapeHtml(pending.name)}`),
    renderOutcomeRow(content.labels.holder, escapeHtml(pending.holder)),
    renderOutcomeRow(content.labels.tokenId, `
      <span class="outcome-ref">${escapeHtml(pending.nftId)}</span>
      <button class="icon-button" type="button" data-copy="${escapeHtml(pending.nftId)}"
              aria-label="${escapeHtml(content.copyLabel)}">${ICONS.copy}</button>`),
    renderOutcomeRow(content.labels.reason, escapeHtml(readRevokeReasonLabel(pending))),
    renderOutcomeRow(content.labels.timestamp, escapeHtml(formatSettlementTime(pending.startedAt))),
    renderOutcomeRow(content.labels.specification, escapeHtml(content.specification)),
  ].join('');

  return `
      <span class="outcome-spinner" aria-hidden="true"></span>
      <p class="outcome-state is-revoking"><i class="outcome-dots"></i>${escapeHtml(content.stateLabel)}</p>

      <h1>${escapeHtml(content.heading)}</h1>
      <p class="outcome-lead">${escapeHtml(content.lead)}</p>

      <ol class="outcome-steps">${content.steps.map(renderOutcomeStep).join('')}</ol>
      <dl class="outcome-details">${rows}</dl>

      <button class="outcome-submit is-danger" type="button" disabled>
        <span class="outcome-spinner is-small" aria-hidden="true"></span>${escapeHtml(content.revokingLabel)}
      </button>
      <button class="outcome-secondary" type="button" data-revoke-nav="#/admin">${escapeHtml(content.portalLabel)}</button>

      <p class="outcome-foot">${escapeHtml(content.footnote)}</p>`;
}

function renderRevokingDone(content, pending) {
  const done = content.success;
  const { labels } = done;

  const rows = [
    renderOutcomeRow(labels.nft, `<i class="outcome-dot is-red"></i>${escapeHtml(pending.name)}`),
    renderOutcomeRow(labels.holder, escapeHtml(pending.holder)),
    renderOutcomeRow(labels.tokenId, `
      ${escapeHtml(pending.nftId)}
      <button class="icon-button" type="button" data-copy="${escapeHtml(pending.nftId)}"
              aria-label="${escapeHtml(content.copyLabel)}">${ICONS.copy}</button>
      <button class="outcome-onchain" type="button">
        ${escapeHtml(done.onchainLabel)}${ICONS.linkOut}
      </button>`),
    renderOutcomeRow(labels.reason, escapeHtml(readRevokeReasonLabel(pending))),
    renderOutcomeRow(labels.revokedOn, escapeHtml(formatIssuedTime(pending.at))),
    pending.note ? renderOutcomeRow(labels.note, escapeHtml(pending.note)) : '',
  ].join('');

  return `
      <span class="outcome-seal is-revoked" aria-hidden="true">${ICONS.gavel}</span>
      <p class="outcome-state is-issued is-revoked"><i class="dot"></i>${escapeHtml(done.stateLabel)}</p>

      <h1>${escapeHtml(done.heading)}</h1>
      <p class="outcome-lead">${escapeHtml(pending.name)}${escapeHtml(done.leadAfter)}</p>

      <ol class="outcome-steps is-done">${done.steps.map(renderOutcomeStep).join('')}</ol>
      <dl class="outcome-details">${rows}</dl>

      <button class="outcome-submit is-ready is-danger" type="button" id="revoke-directory">${escapeHtml(done.directoryLabel)}</button>
      <button class="outcome-secondary" type="button" data-revoke-nav="#/admin">${escapeHtml(done.portalLabel)}</button>`;
}

function renderAdminRevokingPage(content) {
  const pending = pendingRevoke;
  if (!pending) return renderSignedOutGuard();
  const processing = content.revoke.processing;
  const body = pending.at ? renderRevokingDone(processing, pending) : renderRevokingProgress(processing, pending);

  return `
  <main class="outcome">
    <p class="outcome-brand">
      <span class="outcome-mark">${escapeHtml(DASHBOARD.brand.name)}</span>
      ${escapeHtml(OUTCOME.brand)}
    </p>

    <section class="outcome-card${pending.at ? ' is-issued is-revoked' : ''}">${body}</section>

    <footer class="outcome-strip">
      <span><i class="dot"></i>${escapeHtml(OUTCOME.strip.status)}</span>
      <span>${escapeHtml(OUTCOME.strip.jurisdiction)}</span>
    </footer>
  </main>`;
}

function bindAdminRevokingPage() {
  bindAuditLinks();
  document.querySelectorAll('[data-revoke-nav]').forEach((button) => {
    button.addEventListener('click', () => navigateTo(button.dataset.revokeNav));
  });
  document.getElementById('revoke-directory')?.addEventListener('click', () => navigateTo('#/directory'));

  clearTimeout(revokeTimer);
  if (!pendingRevoke || pendingRevoke.at) return;

  // Đường tắt demo, giống màn phát hành: không có chuỗi khối thật để chờ.
  revokeTimer = setTimeout(() => {
    recordRevocation();
    if (location.hash === '#/admin-revoking') renderCurrentRoute();
  }, DEMO_ISSUE_DELAY_MS);
}

/* ============================================================
   MÀN PHÁT HÀNH AWARD — #/admin-issuing
   ------------------------------------------------------------
   Sau khi bấm Grant Award. Dùng lại khung màn kết quả của thành viên
   (.outcome-*) nhưng bỏ phần thanh toán: không có số tiền, điểm thưởng,
   mã đơn. Thiết kế chưa vẽ màn này — xem README.
   ============================================================ */

/** Ghi award vào hồ sơ pháp nhân. Chạy một lần, kể cả khi đã rời màn. */
function recordGrantedAward() {
  const grant = pendingGrant;
  if (!grant || grant.grantedAt) return;
  grant.grantedAt = new Date();
  grantedAwards = [{
    entityId: grant.recipient.entityId,
    name: grant.category,
    kind: 'Awarded Title',
    granted: grant.grantedAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }),
    citation: grant.citation,
    ref: grant.awardId,
    grantedAt: grant.grantedAt,
  }, ...grantedAwards];
}

function renderGrantIssuing(content, grant) {
  const rows = [
    renderOutcomeRow(content.labels.award, `<i class="outcome-dot"></i>${escapeHtml(grant.category)}`),
    renderOutcomeRow(content.labels.recipient, escapeHtml(grant.recipient.name)),
    renderOutcomeRow(content.labels.awardId, `
      <span class="outcome-ref">${escapeHtml(grant.awardId)}</span>
      <button class="icon-button" type="button" data-copy="${escapeHtml(grant.awardId)}"
              aria-label="${escapeHtml(content.copyLabel)}">${ICONS.copy}</button>`),
    renderOutcomeRow(content.labels.timestamp, escapeHtml(formatSettlementTime(grant.startedAt))),
    renderOutcomeRow(content.labels.specification, escapeHtml(content.specification)),
  ].join('');

  return `
      <span class="outcome-spinner" aria-hidden="true"></span>
      <p class="outcome-state"><i class="outcome-dots"></i>${escapeHtml(content.stateLabel)}</p>

      <h1>${escapeHtml(content.heading)}</h1>
      <p class="outcome-lead">${escapeHtml(content.lead)}</p>

      <ol class="outcome-steps">${content.steps.map(renderOutcomeStep).join('')}</ol>
      <dl class="outcome-details">${rows}</dl>

      <button class="outcome-submit" type="button" disabled>
        <span class="outcome-spinner is-small" aria-hidden="true"></span>${escapeHtml(content.issuingLabel)}
      </button>
      <button class="outcome-secondary" type="button" data-grant-nav="#/admin">${escapeHtml(content.portalLabel)}</button>

      <p class="outcome-foot">${escapeHtml(content.footnote)}</p>`;
}

function renderGrantSuccess(content, grant) {
  const done = content.success;
  const { labels } = done;
  const { recipient } = grant;

  const rows = [
    renderOutcomeRow(labels.award, `<i class="outcome-dot"></i>${escapeHtml(grant.category)}`),
    renderOutcomeRow(labels.recipient, escapeHtml(recipient.name)),
    recipient.wallet
      ? renderOutcomeRow(labels.wallet, `${escapeHtml(recipient.walletKind)}<i>·</i><b>${escapeHtml(recipient.wallet)}</b>`)
      : '',
    renderOutcomeRow(labels.awardId, `
      ${escapeHtml(grant.awardId)}
      <button class="icon-button" type="button" data-copy="${escapeHtml(grant.awardId)}"
              aria-label="${escapeHtml(content.copyLabel)}">${ICONS.copy}</button>
      <button class="outcome-onchain" type="button">
        ${escapeHtml(done.onchainLabel)}${ICONS.linkOut}
      </button>`),
    renderOutcomeRow(labels.grantedOn, escapeHtml(formatIssuedTime(grant.grantedAt))),
    renderOutcomeRow(labels.citation, escapeHtml(grant.citation)),
  ].join('');

  return `
      <span class="outcome-seal" aria-hidden="true">${ICONS.checkMark}</span>
      <p class="outcome-state is-issued"><i class="dot"></i>${escapeHtml(done.stateLabel)}</p>

      <h1>${escapeHtml(done.heading)}</h1>
      <p class="outcome-lead">${escapeHtml(grant.category)}${escapeHtml(done.leadAfter)}</p>

      <ol class="outcome-steps is-done">${done.steps.map(renderOutcomeStep).join('')}</ol>
      <dl class="outcome-details">${rows}</dl>

      <button class="outcome-submit is-ready" type="button" id="grant-profile">${escapeHtml(done.profileLabel)}</button>
      <button class="outcome-secondary" type="button" data-grant-nav="#/admin">${escapeHtml(done.portalLabel)}</button>`;
}

function renderAdminIssuingPage(content) {
  const grant = pendingGrant;
  if (!grant) return renderSignedOutGuard();
  const issuing = content.grant.issuing;
  const body = grant.grantedAt ? renderGrantSuccess(issuing, grant) : renderGrantIssuing(issuing, grant);

  return `
  <main class="outcome">
    <p class="outcome-brand">
      <span class="outcome-mark">${escapeHtml(DASHBOARD.brand.name)}</span>
      ${escapeHtml(OUTCOME.brand)}
    </p>

    <section class="outcome-card${grant.grantedAt ? ' is-issued' : ''}">${body}</section>

    <footer class="outcome-strip">
      <span><i class="dot"></i>${escapeHtml(OUTCOME.strip.status)}</span>
      <span>${escapeHtml(OUTCOME.strip.jurisdiction)}</span>
    </footer>
  </main>`;
}

function bindAdminIssuingPage() {
  bindAuditLinks();
  document.querySelectorAll('[data-grant-nav]').forEach((button) => {
    button.addEventListener('click', () => navigateTo(button.dataset.grantNav));
  });
  document.getElementById('grant-profile')?.addEventListener('click', () => {
    dossierEntityId = pendingGrant.recipient.entityId;
    navigateTo('#/entity');
  });

  clearTimeout(grantTimer);
  if (!pendingGrant || pendingGrant.grantedAt) return;

  // Đường tắt demo, giống màn kết quả của thành viên: không có chuỗi khối thật để chờ.
  grantTimer = setTimeout(() => {
    recordGrantedAward();
    if (location.hash === '#/admin-issuing') renderCurrentRoute();
  }, DEMO_ISSUE_DELAY_MS);
}


/* ============================================================
   Router — các tuyến, dùng hash để chạy được cả qua file://
   ============================================================ */

const ROUTES = {
  '#/register':  { render: () => renderRegisterPage(REGISTER),   bind: bindRegisterForm  },
  '#/login':     { render: () => renderLoginPage(LOGIN),         bind: bindLoginForm     },
  '#/kyc':       { render: () => renderKycPage(KYC),             bind: bindKycForm       },
  '#/dashboard':   { render: () => renderDashboardPage(DASHBOARD),     bind: bindDashboardPage,
                     requiresSignIn: true, memberOnly: true },
  '#/gift':        { render: () => renderGiftNoticePage(GIFT_NOTICE), bind: bindGiftNoticePage,
                     requiresSignIn: true, memberOnly: true, requiresGiftNotice: true },
  '#/points':      { render: () => renderPointHistoryPage(DASHBOARD.pointHistory), bind: bindPointHistoryPage,
                     requiresSignIn: true, memberOnly: true },
  '#/acquisition': { render: () => renderAcquisitionPage(ACQUISITION), bind: bindAcquisitionPage,
                     requiresSignIn: true, memberOnly: true },
  '#/recipient':   { render: () => renderRecipientPage(RECIPIENT),     bind: bindRecipientPage,
                     requiresSignIn: true, memberOnly: true, requiresVerifiedKyc: true },
  '#/payment':     { render: () => renderPaymentPage(PAYMENT),         bind: bindPaymentPage,
                     requiresSignIn: true, memberOnly: true, requiresRecipient: true, requiresVerifiedKyc: true },
  '#/outcome':     { render: () => renderOutcomePage(OUTCOME),         bind: bindOutcomePage,
                     requiresSignIn: true, requiresSettlement: true, memberOnly: true, requiresVerifiedKyc: true },
  '#/directory':   { render: () => renderDirectoryPage(DIRECTORY),     bind: bindDirectoryPage,
                     requiresSignIn: true },
  /* Bản công khai: KHÔNG cần đăng nhập — đúng dòng dẫn trong thiết kế
     "without requiring login credentials". Vào từ mục Directory ở landing. */
  '#/public-directory': { render: () => renderPublicDirectoryPage(DIRECTORY),
                          bind: bindPublicDirectoryPage },
  '#/entity':      { render: () => renderDossierPage(DOSSIER),         bind: bindDossierPage,
                     requiresSignIn: true, requiresEntity: true },
  '#/admin':       { render: () => renderAdminPage(ADMIN),             bind: bindAdminPage,
                     requiresSignIn: true, requiresAdmin: true },
  '#/admin-review': { render: () => renderAdminReviewPage(ADMIN),      bind: bindAdminReviewPage,
                      requiresSignIn: true, requiresAdmin: true, requiresReview: true },
  '#/admin-points': { render: () => renderAdminPointsPage(ADMIN),      bind: bindAdminPointsPage,
                     requiresSignIn: true, requiresAdmin: true },
  '#/transfer':      { render: () => renderTransferPage(TRANSFER),          bind: bindTransferPage,
                     requiresSignIn: true, memberOnly: true, requiresTransfer: true },
  '#/transfer-status': { render: () => renderTransferStatusPage(TRANSFER), bind: bindTransferStatusPage,
                     requiresSignIn: true, memberOnly: true, requiresTransferStatus: true },
  '#/admin-audit':  { render: () => renderAuditPage(ADMIN),             bind: bindAuditPage,
                     requiresSignIn: true, requiresAdmin: true },
  '#/admin-revoking': { render: () => renderAdminRevokingPage(ADMIN),   bind: bindAdminRevokingPage,
                     requiresSignIn: true, requiresAdmin: true, requiresRevoke: true },
  '#/admin-revoke': { render: () => renderAdminRevokePage(ADMIN),       bind: bindAdminRevokePage,
                     requiresSignIn: true, requiresAdmin: true },
  '#/admin-issuing': { render: () => renderAdminIssuingPage(ADMIN),     bind: bindAdminIssuingPage,
                     requiresSignIn: true, requiresAdmin: true, requiresGrant: true },
  '#/admin-award':  { render: () => renderAdminAwardPage(ADMIN),       bind: bindAdminAwardPage,
                      requiresSignIn: true, requiresAdmin: true },
  /* Hồ sơ pháp nhân bản công khai: không cần đăng nhập, nhưng vẫn phải biết
     đang xem pháp nhân nào — vào từ nút View profile ở #/public-directory. */
  '#/public-entity': { render: () => renderPublicDossierPage(DOSSIER),
                       bind: bindPublicDossierPage, requiresEntity: true,
                       fallback: '#/public-directory' },
  default:       { render: () => renderLandingPage(LANDING),     bind: null              },
};

function navigateTo(hash) {
  if (window.location.hash === hash) renderCurrentRoute();
  else window.location.hash = hash;
}

function renderCurrentRoute() {
  persistState();
  const root = document.getElementById('app');
  if (!root) {
    throw new Error('Could not find the #app element to mount the page.');
  }

  // Đường dẫn chia sẻ hồ sơ: nhớ pháp nhân rồi về địa chỉ chuẩn (guard bên dưới kiểm tra pháp nhân có tồn tại).
  const shared = /^#\/public-entity\?e=(.+)$/.exec(window.location.hash);
  if (shared) {
    dossierEntityId = decodeURIComponent(shared[1]);
    history.replaceState(null, '', '#/public-entity');
  }

  const route = ROUTES[window.location.hash] ?? ROUTES.default;

  // Dashboard chỉ xem được khi đã đăng nhập. Đây KHÔNG phải bảo vệ thật —
  // chỉ để luồng demo không rơi vào màn hình trống khi mở thẳng đường dẫn.
  if (route.requiresSignIn && !AccountStore.isSignedIn()) {
    navigateTo('#/login');
    return;
  }

  // Hai vai không vào màn của nhau. Public Directory và hồ sơ pháp nhân là
  // sổ đăng ký công khai nên cả hai đều xem được.
  if (route.requiresAdmin && !AccountStore.isAdmin()) {
    navigateTo('#/dashboard');
    return;
  }
  if (route.memberOnly && AccountStore.isAdmin()) {
    navigateTo('#/admin');
    return;
  }

  // Chưa được duyệt KYC thì không đi tiếp được khỏi bước chọn danh hiệu.
  if (route.requiresVerifiedKyc && !isKycApproved()) {
    navigateTo('#/acquisition');
    return;
  }

  // Màn kết quả chỉ có nghĩa sau khi đã bấm thanh toán.
  if (route.requiresSettlement && !settlementAt) {
    navigateTo('#/payment');
    return;
  }

  // Màn duyệt KYC chỉ có nghĩa khi biết đang mở hồ sơ nào.
  if (route.requiresReview && !readReview(reviewId)) {
    navigateTo('#/admin');
    return;
  }

  // Mua để tặng thì phải chọn người nhận trước khi thanh toán.
  if (route.requiresRecipient && recipientModeId === 'gift' && !selectedRecipientId) {
    navigateTo('#/recipient');
    return;
  }

  // Màn chuyển danh hiệu chỉ có nghĩa khi biết đang chuyển danh hiệu nào (và nó còn chuyển được).
  if (route.requiresTransfer && !readTransferableTitle()) {
    navigateTo('#/dashboard');
    return;
  }
  if (route.requiresTransferStatus && !pendingTransfer) {
    navigateTo('#/dashboard');
    return;
  }

  // Màn thông báo quà chỉ có nghĩa khi còn quà chưa xem.
  if (route.requiresGiftNotice && !readUnseenGift()) {
    navigateTo('#/dashboard');
    return;
  }

  // Màn thu hồi chỉ có nghĩa sau khi đã bấm Revoke NFT.
  if (route.requiresRevoke && !pendingRevoke) {
    navigateTo('#/admin-revoke');
    return;
  }

  // Màn phát hành award chỉ có nghĩa sau khi đã bấm Grant Award.
  if (route.requiresGrant && !pendingGrant) {
    navigateTo('#/admin-award');
    return;
  }

  // Hồ sơ pháp nhân chỉ có nghĩa khi biết đang xem ai — tải lại trang là mất.
  if (route.requiresEntity && !readDossier(dossierEntityId)) {
    navigateTo(route.fallback ?? '#/directory');
    return;
  }

  root.innerHTML = route.render();
  route.bind?.();

  // Đổi tuyến thì luôn về đầu trang; neo trong trang (#how, #titles) giữ nguyên vị trí.
  if (!ROUTES[window.location.hash] && window.location.hash) return;
  window.scrollTo(0, 0);
}

function warnAboutDevFlags() {
  const active = Object.entries(DEV_FLAGS).filter(([, isOn]) => isOn).map(([name]) => name);
  if (active.length) {
    console.warn(`[PW] Temporary dev flag is ON: ${active.join(', ')} — turn it off in js/data.js before the defence.`);
  }
}

/**
 * Đặt lại bản demo: xoá tài khoản đã đăng ký và phiên, rồi tải lại trang chủ
 * để mọi trạng thái trong bộ nhớ (admin, mua, ví…) về mặc định.
 */
function resetDemo() {
  if (!window.confirm(LANDING.resetConfirm)) return;
  isResettingDemo = true; // chặn lần ghi trạng thái lúc rời trang, nếu không dữ liệu vừa xoá lại được ghi về
  try {
    localStorage.clear();
    sessionStorage.clear();
  } catch (error) {
    // Trình duyệt chặn lưu trữ thì cũng không có gì để xoá.
  }
  history.replaceState(null, '', location.pathname);
  location.reload();
}

/** Nút copy nhỏ đặt cạnh một mã (mã đơn, mã hồ sơ, mã token…): chép `value` vào clipboard — xem copyToClipboard. */
function renderCopyIcon(value, label = 'Copy ID') {
  return `<button class="copy-inline" type="button" data-copy="${escapeHtml(value)}" aria-label="${escapeHtml(label)}: ${escapeHtml(value)}">${ICONS.copy}</button>`;
}

/** Chép `data-copy` của nút vào clipboard; trình duyệt chặn thì thôi, chỉ báo bằng biểu tượng khi chép được. */
function copyToClipboard(button) {
  const value = button.dataset.copy;
  if (!value || !navigator.clipboard) return;
  navigator.clipboard.writeText(value).then(() => {
    const original = button.innerHTML;
    button.innerHTML = ICONS.check;
    button.classList.add('is-copied');
    setTimeout(() => {
      button.innerHTML = original;
      button.classList.remove('is-copied');
    }, 1200);
  }).catch(() => {});
}

/** Share Dossier: chép đường dẫn mở thẳng hồ sơ công khai của pháp nhân (#/public-entity?e=<mã>). */
function shareEntityLink(button) {
  const link = `${window.location.href.split('#')[0]}#/public-entity?e=${encodeURIComponent(button.dataset.shareEntity)}`;
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(link).then(() => {
    const label = button.querySelector('span');
    const original = label.textContent;
    label.textContent = DOSSIER.copiedLabel;
    setTimeout(() => { label.textContent = original; }, 1500);
  }).catch(() => {});
}

function startApp() {
  warnAboutDevFlags();
  // Tải lại trang giữa phiên: nhận lại thành viên đang đăng nhập (phiên còn) và trạng thái demo đã lưu.
  activeMemberEmail = AccountStore.signedInRole() === 'member' ? AccountStore.read()?.email ?? null : null;
  loadPersistedState();
  window.addEventListener('pagehide', persistState);
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-reset-demo]')) resetDemo();
    // Nút trên thẻ danh hiệu ở landing: đã đăng nhập thì vào màn mua, chưa thì route guard đưa sang Log in.
    if (event.target.closest('[data-purchase-title]')) navigateTo('#/acquisition');
    if (event.target.closest('[data-points-history]')) navigateTo('#/points');
    const shareButton = event.target.closest('[data-share-entity]');
    if (shareButton) shareEntityLink(shareButton);
    // Nút copy: chép giá trị ở data-copy vào clipboard, đổi biểu tượng thành dấu tích một lúc.
    const copyButton = event.target.closest('[data-copy]');
    if (copyButton) copyToClipboard(copyButton);
  });
  renderCurrentRoute();
  window.addEventListener('hashchange', renderCurrentRoute);
}

// waitlist.html nạp app.js để dùng lại các khối landing (ICONS, renderHow, renderFooter…) nhưng KHÔNG chạy ứng dụng.
if (!window.PW_WAITLIST_PAGE) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp, { once: true });
  } else {
    startApp();
  }
}
