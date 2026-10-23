(function () {
  'use strict';

  /* ================= constants ================= */
  var NOW = new Date();
  var TODAY = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());   // real date: the app opens on today
  var TODAY_KEY = TODAY.getFullYear() + '-' + ('0' + (TODAY.getMonth() + 1)).slice(-2) + '-' + ('0' + TODAY.getDate()).slice(-2);
  var LUNCH_A = 720, LUNCH_B = 780;                  // 12:00 to 13:00, same as LunchBreak.swift
  var MIN_T = 360, MAX_T = 1230;
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var P = {   // SF Symbols approximated with inline paths
    login: 'M10 17l5-5-5-5v3H3v4h7v3zM19 3h-7v2h7v14h-7v2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z',
    sun: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM11 1h2v3h-2zM11 20h2v3h-2zM1 11h3v2H1zM20 11h3v2h-3zM4.2 5.6l1.4-1.4 2.1 2.1-1.4 1.4zM16.3 17.7l1.4-1.4 2.1 2.1-1.4 1.4zM5.6 19.8l-1.4-1.4 2.1-2.1 1.4 1.4zM17.7 7.7l-1.4-1.4 2.1-2.1 1.4 1.4z',
    plane: 'M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z',
    hour: 'M6 2h12v4l-4 6 4 6v4H6v-4l4-6-4-6z',
    fork: 'M7 2v8a2 2 0 0 0 2 2v10h2V12a2 2 0 0 0 2-2V2h-2v6H11V2H9v6H7V2zm10 0c-2 2-3 5-3 8h3v12h2V2z',
    bed: 'M3 18V8h2v5h14v-2a3 3 0 0 0-3-3h-6v5H5V6H3v14h2v-2h14v2h2v-6H3z',
    lock: 'M17 9V7a5 5 0 0 0-10 0v2H5v12h14V9zm-8 0V7a3 3 0 0 1 6 0v2z',
    check: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.500 14.500L6 12l1.400-1.400 3.100 3.100 6.100-6.100L18 9z',
    cal: 'M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2zm-2 8h14v10H5z',
    bell: 'M12 22a2.500 2.500 0 0 0 2.400-2h-4.800A2.500 2.500 0 0 0 12 22zm7-6v-5a7 7 0 0 0-5.500-6.800V3.500a1.500 1.500 0 0 0-3 0v.7A7 7 0 0 0 5 11v5l-2 2v1h18v-1z',
    trash: 'M9 3v1H4v2h16V4h-5V3zM5 8l1 13h12l1-13z',
    pen: 'M3 17.250V21h3.750L17.800 9.940l-3.750-3.750zM20.700 7.040a1 1 0 0 0 0-1.410l-2.340-2.340a1 1 0 0 0-1.410 0l-1.830 1.830 3.750 3.750z',
    imp: 'M12 3v10.200l3.600-3.600L17 11l-5 5-5-5 1.400-1.400L11 13.200V3zM5 17h14v4H5z',
    exp: 'M12 16V5.800L8.400 9.400 7 8l5-5 5 5-1.400 1.400L13 5.800V16zM5 13h2v6h10v-6h2v8H5z'
  };
  function ic(n) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + P[n] + '"/></svg>'; }
  var FP = '<svg class="fp" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 4a8 8 0 0 0-8 8v1"/><path d="M12 7.5a4.500 4.500 0 0 0-4.500 4.500c0 3 .5 5 1.500 7"/><path d="M12 11a1 1 0 0 0-1 1c0 2.500.5 5 2 7.500"/><path d="M16.500 12c0 2 .3 4 1.200 5.800"/><path d="M12 4a8 8 0 0 1 8 8c0 1.500-.2 3-.7 4.300"/></svg>';

  /* ================= state ================= */
  var S;
  function initialTime() { var m = NOW.getHours() * 60 + NOW.getMinutes(); return m >= 360 && m <= 1230 ? m : 510; }
  function initState() {
    S = {
      splash: true, tab: 'home', t: initialTime(), playing: false, theme: S ? S.theme : 'light',
      status: 'notCheckedIn', inT: null, outT: null, goal: 8,
      records: {}, name: 'Alex', cutoff: 1, rHour: '08', rMin: '00', isAM: true,
      installKey: TODAY_KEY, mOff: 0, pendingAvatar: null, avatar: null, saved: false
    };
  }
  function sampleData() {
    var r = {};
    var pm = new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, 1), dim = new Date(pm.getFullYear(), pm.getMonth() + 1, 0).getDate();
    function put(d, i, o, type) { r[key(new Date(pm.getFullYear(), pm.getMonth(), d))] = { inT: i, outT: o, type: type }; }
    for (var d = 1; d <= dim; d++) {
      var wd = new Date(pm.getFullYear(), pm.getMonth(), d).getDay();
      if (wd === 0 || wd === 6) continue;
      if (d % 9 === 0) put(d, 485, null, 'checkedIn');
      else if (d % 13 === 0) put(d, null, null, 'fullDayLeave');
      else put(d, 480 + (d * 7) % 25, 1030 + (d * 11) % 40, 'checkedOut');
    }
    return r;
  }

  /* ================= helpers ================= */
  var $ = function (id) { return document.getElementById(id); };
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function hhmm(m) { return pad(Math.floor(m / 60)) + ':' + pad(Math.round(m % 60)); }
  function ampm(m) { var h = Math.floor(m / 60), mm = Math.round(m % 60), s = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + pad(mm) + ' ' + s; }
  function clk(m) { var h = Math.floor(m / 60) % 12 || 12; return h + ':' + pad(Math.round(m % 60)); }
  function parse(s) { var p = s.split(':'); return +p[0] * 60 + +p[1]; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function key(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function overlap(a, b) { return b > a ? Math.max(0, Math.min(b, LUNCH_B) - Math.max(a, LUNCH_A)) : 0; }
  function worked(t) { return S.inT == null || t <= S.inT ? 0 : (t - S.inT) - overlap(S.inT, t); }       // minutes, lunch removed
  function remaining(t) { return Math.max(S.goal * 60 - worked(t), 0); }
  function lunchNow(t) { return t >= LUNCH_A && t < LUNCH_B; }
  function hm(m) { return Math.floor(m / 60) + 'h ' + Math.floor(m % 60) + 'm'; }
  function userName() { return S.name || 'Alex'; }
  function reminderMin() { var h = parseInt(S.rHour, 10) || 8, m = parseInt(S.rMin, 10) || 0; h = S.isAM ? (h === 12 ? 0 : h) : (h === 12 ? 12 : h + 12); return h * 60 + m; }

  /* ================= overlays ================= */
  function show(html, mid) { var o = $('overlay'); o.className = 'overlay' + (mid ? ' mid' : ''); o.innerHTML = html; o.hidden = false; }
  function hide() { $('overlay').hidden = true; $('overlay').innerHTML = ''; }
  function alertBox(title, msg, buttons) {
    show('<div class="alert" role="alertdialog" aria-modal="true"><div class="bd"><h4>' + esc(title) + '</h4>' + (msg ? '<p>' + esc(msg).replace(/\n/g, '<br>') + '</p>' : '') + '</div><div class="bt">' +
      buttons.map(function (b) { return '<button class="' + (b.cls || '') + '" data-a="' + b.a + '">' + esc(b.t) + '</button>'; }).join('') + '</div></div>', true);
  }
  function banner(title, body) {
    var el = document.createElement('div'); el.className = 'nt';
    el.innerHTML = '<img src="logo.png" alt=""><div><b>' + esc(title) + '</b><span>' + esc(body) + '</span></div><small>now</small>';
    $('toasts').appendChild(el); setTimeout(function () { el.remove(); }, 4600);
  }
  function savedToast(text) {
    var el = document.createElement('div'); el.className = 'saved';
    el.innerHTML = '<svg viewBox="0 0 24 24"><path d="' + P.check + '"/></svg>' + esc(text);
    $('toasts').appendChild(el); setTimeout(function () { el.remove(); }, 1600);
  }
  function notifications(prev, now) {
    function cross(x) { return prev < x && now >= x; }
    if (cross(reminderMin())) banner('Attendance Reminder', 'Have you checked in today?');
    if (S.status === 'checkedIn') {
      var g = S.goal * 60, w0 = worked(prev), w1 = worked(now);
      if (w0 < g - 60 && w1 >= g - 60) banner('Attendance Reminder', '1 hour remaining before completing ' + S.goal + ' working hours');
      if (w0 < g && w1 >= g) banner('Goal completed 🎉', "You've worked your full " + S.goal + ' hours today. Do you want to check out?');
    }
  }

  /* ================= actions ================= */
  function addRecord(ds, i, o, type) { S.records[ds] = { inT: i, outT: o, type: type }; }
  function doCheckIn() { S.status = 'checkedIn'; S.goal = 8; S.inT = S.t; S.outT = null; addRecord(TODAY_KEY, S.inT, null, 'checkedIn'); render(); }
  function doCheckOut() { S.status = 'checkedOut'; S.outT = S.t; addRecord(TODAY_KEY, S.inT, S.outT, 'checkedOut'); hide(); render(); }

  /* ================= HOME ================= */
  function ring(size, lw, color, frac, ccw, track) {
    var r = size / 2, f = Math.max(0, Math.min(1, frac));
    return '<svg viewBox="0 0 ' + size + ' ' + size + '" aria-hidden="true"><circle cx="' + r + '" cy="' + r + '" r="' + r + '" fill="none" stroke="' + (track || color) + '" stroke-opacity="' + (lw === 22 ? '.12' : '.1') + '" stroke-width="' + lw + '"/>' +
      (f > 0 ? '<circle cx="' + r + '" cy="' + r + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="' + lw + '" stroke-linecap="round" pathLength="100" stroke-dasharray="' + (f * 100) + ' 100" transform="' + (ccw ? 'translate(' + size + ' 0) scale(-1 1) ' : '') + 'rotate(-90 ' + r + ' ' + r + ')"/>' : '') + '</svg>';
  }
  function attCards(ci, co) {
    return '<div class="pair"><div class="card att" style="color:var(--green)">' + ic('login') + '<small>CHECK-IN</small><b>' + (ci != null ? ampm(ci) : '--:--') + '</b></div>' +
      '<div class="card att" style="color:var(--pink)">' + ic('login') + '<small>CHECK-OUT</small><b>' + (co != null ? ampm(co) : '--:--') + '</b></div></div>';
  }
  function remainCard(color, icon, title, time) {
    return '<div class="remain" style="background:color-mix(in srgb,' + color + ' 18%,transparent);color:' + color + '">' + ic(icon) + '<span class="t">' + title + '</span><b>' + time + '</b></div>';
  }
  function header(sub, trailing, flat) {
    return '<div class="hdr"' + (flat ? ' style="padding-inline:0"' : '') + '><img src="' + (S.avatar || 'logo.png') + '" alt="Avatar"><div class="tx"><h2>' + esc(trailing.title) + '</h2><p>' + esc(sub) + '</p></div>' + (trailing.html || '') + '</div>';
  }

  function renderHome() {
    var t = S.t, st = S.status, h = '<div class="vstack g14">';
    var greet = (Math.floor(t / 60) < 12 ? 'Good morning, ' : 'Hello, ') + userName();
    var sub = { notCheckedIn: 'Ready to start your day?', checkedIn: 'Stay hungry, stay foolish', checkedOut: 'Starting strong is good. Finishing strong is epic', fullDayLeave: 'Take a deep breath and let it all go', afternoonShift: 'Persist until mission is accomplished' }[st];
    h += header(sub, { title: greet });

    if (st === 'notCheckedIn') {
      h += '<button class="btn-main" data-a="checkin">' + FP + 'Check In</button>';
      h += '<div class="acts"><button class="card act sun" data-a="aft">' + ic('sun') + 'Afternoon Shift</button><button class="card act leave" data-a="leave">' + ic('plane') + 'Leave</button></div>';
      h += '<div class="card prog"><span class="badge" style="color:var(--red);background:color-mix(in srgb,var(--red) 15%,transparent)">Not Checked In</span>' +
        '<div class="ringbox">' + ring(180, 16, '#34C759', 0) + '<div class="ringtx" style="color:var(--green)"><b style="font-size:56px">0h</b><span style="color:var(--fg)">of 8h Goal</span></div></div>' +
        '<p class="desc">Your time is valuable. Check in to start tracking your progress today.</p></div>';
      h += attCards(null, null) + remainCard('#34C759', 'hour', 'REMAINING', '8h 0m');
    } else if (st === 'checkedIn') {
      var rem = remaining(t), g = S.goal * 60, lunch = lunchNow(t), done = rem <= 0;
      var col = lunch ? 'var(--orange)' : (done ? '#215426' : 'var(--green)');
      var w = Math.max(g - rem, 0), hrs = Math.floor(w / 60), mins = Math.floor(w % 60);
      var big = done ? S.goal + 'h' : (mins > 0 ? hrs + 'h ' + mins + 'm' : hrs + 'h');
      var rh = Math.floor(rem / 60), text;
      if (lunch) text = 'Lunch break — timer paused until 1:00 PM 🍱';
      else if (done) text = 'Goal reached! You can check out now. 🎉';
      else if (rh <= 1) text = (rh === 1 ? '1 hour' : 'less than 1 hour') + ' remaining before completing ' + S.goal + ' working hours';
      else text = 'Your time is valuable. Keep up the great work!';
      h += '<button class="btn-main" data-a="checkout">' + ic('login') + 'Check Out</button>';
      h += '<div class="card prog checked"><span class="badge" style="color:' + col + ';background:color-mix(in srgb,' + col + ' 15%,transparent)">' + (lunch ? 'Lunch time' : done ? 'Completed' : 'Checked-in') + '</span>' +
        '<div class="ringbox s190">' + ring(190, 16, col === 'var(--green)' ? '#34C759' : (col === 'var(--orange)' ? '#FF9500' : '#215426'), w / g, false, '#34C759') + '<div class="ringtx" style="color:' + col + '"><b style="font-size:48px">' + big + '</b><span style="color:var(--fg)">of ' + S.goal + 'h Goal</span></div></div>' +
        '<p class="desc">' + text + '</p></div>';
      h += attCards(S.inT, null);
      h += lunch ? remainCard('#FF9500', 'fork', 'LUNCH TIME', 'Paused') : remainCard('#FF9500', 'hour', 'REMAINING', hm(Math.ceil(rem)));
    } else if (st === 'afternoonShift') {
      var left = Math.max(720 - t, 0), active = left <= 0, ts = Math.floor(left / 60) + 'h ' + Math.floor(left % 60) + 'm';
      h += '<div class="aft"><div class="ringbox s260">' + ring(260, 22, '#AF52DE', Math.min(1, left / 240), true) + '<div class="ringtx"><b class="big" style="font-size:52px">' + ts + '</b><span style="color:var(--fg2);margin-top:8px">UNTIL START</span></div></div>' +
        '<p class="sub">Check-in active in ' + ts + '</p>' +
        '<button class="lock" data-a="aftin" ' + (active ? '' : 'disabled') + '><svg viewBox="0 0 24 24"><path d="' + (active ? P.check : P.lock) + '"/></svg>Check In</button>' +
        '<p class="note">Disabled until 12:00 PM</p></div>';
    } else if (st === 'checkedOut') {
      h += '<div class="card done"><span class="badge" style="color:var(--green);background:color-mix(in srgb,var(--green) 15%,transparent);padding-block:8px">Checked out</span><div class="in"><div class="sp">✨</div><h3>Completed</h3><p>Great job! You have completed<br>your work hours for today.</p></div></div>';
      h += attCards(S.inT, S.outT);
    } else {
      h += '<div class="card leavecard"><img src="sleepingcat.png" alt="Sleeping cat"><h3>Full-day Leave</h3><p>Have a nice day!</p></div>';
    }
    $('screen-home').innerHTML = h + '</div>';
  }

  /* ================= REPORT ================= */
  function monthDate() { return new Date(TODAY.getFullYear(), TODAY.getMonth() + S.mOff, 1); }
  function clampDay(d, m) { var c = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate(); return Math.min(Math.max(d, 1), c); }
  function periodRange() {
    var f = monthDate(), c = S.cutoff;
    if (c <= 1) return { s: f, e: new Date(f.getFullYear(), f.getMonth() + 1, 0) };
    var pm = new Date(f.getFullYear(), f.getMonth() - 1, 1);
    return { s: new Date(pm.getFullYear(), pm.getMonth(), clampDay(c, pm)), e: new Date(f.getFullYear(), f.getMonth(), clampDay(c - 1, f)) };
  }
  function periodTitle() {
    var p = periodRange(), f = monthDate();
    if (S.cutoff <= 1) return MONTHS[f.getMonth()] + ' ' + f.getFullYear();
    return p.s.getDate() + ' ' + MONTHS[p.s.getMonth()].slice(0, 3) + ' – ' + p.e.getDate() + ' ' + MONTHS[p.e.getMonth()].slice(0, 3) + ' ' + p.e.getFullYear();
  }
  function weekdays() {
    var p = periodRange(), out = [], d = new Date(p.s);
    while (d <= p.e) { var w = d.getDay(); if (w !== 0 && w !== 6) out.push(new Date(d)); d.setDate(d.getDate() + 1); }
    return out;
  }
  function dayInfo(d) {
    var k = key(d), r = S.records[k];
    if (r) {
      var type = r.type === 'fullDayLeave' ? 'leave' : r.type === 'checkedIn' ? (k === TODAY_KEY ? 'checkedIn' : 'partial') : 'completed';
      return { date: d, inT: r.inT, outT: r.outT, type: type };
    }
    return { date: d, type: (d < TODAY && key(d) >= S.installKey) ? 'missing' : 'none' };   // history starts on the day the app was first opened
  }
  function totalH(i) {
    if (i.inT == null || i.outT == null) return null;
    var m = i.outT - i.inT; if (m < 0) m += 1440;
    return Math.floor(m / 60) + 'h' + (m % 60 > 0 ? (m % 60) + 'm' : '');
  }
  var TYPE = { completed: ['--green', 'rgba(52,199,89,.08)', 'rgba(52,199,89,.25)'], checkedIn: ['--green', 'rgba(52,199,89,.05)', 'rgba(52,199,89,.2)'], partial: ['--orange', 'rgba(255,149,0,.1)', 'rgba(255,149,0,.3)'], leave: ['--blue', 'rgba(0,122,255,.08)', 'rgba(0,122,255,.3)'], missing: ['--red', 'rgba(255,59,48,.08)', 'rgba(255,59,48,.3)'], none: [null, 'rgba(142,142,147,.03)', 'rgba(142,142,147,.12)'] };
  function cellHtml(i) {
    var t = TYPE[i.type], numCol = i.type === 'completed' || i.type === 'checkedIn' ? '#215426' : (t[0] ? 'var(' + t[0] + ')' : 'var(--fg)');
    var c = '';
    if (i.type === 'completed') c = '<span style="font-size:10px;font-weight:600;color:var(--green)">' + hhmm(i.inT) + '</span><span style="font-size:10px;font-weight:600;color:rgba(255,59,48,.75)">' + hhmm(i.outT) + '</span><b style="font-size:11px">' + totalH(i) + '</b>';
    else if (i.type === 'checkedIn') c = '<b style="font-size:11px;color:var(--green)">' + hhmm(i.inT) + '</b>';
    else if (i.type === 'partial') c = '<span style="font-size:10px;font-weight:600;color:var(--orange)">' + hhmm(i.inT) + '</span><b style="font-size:7px;color:var(--orange)">INCOMPLETE</b>';
    else if (i.type === 'leave') c = '<span style="font-size:18px;line-height:1.2">🏝️</span><b style="font-size:8px;color:var(--blue)">LEAVE</b>';
    else if (i.type === 'missing') c = '<span style="font-size:13px;font-weight:700;color:var(--red);line-height:1.2">✕</span><b style="font-size:8px;color:var(--red)">MISSING</b>';
    var isT = key(i.date) === TODAY_KEY;
    return '<button class="cell' + (isT ? ' today' : '') + '" data-a="day" data-d="' + key(i.date) + '" style="background:' + t[1] + ';border-color:' + (isT ? 'var(--green)' : t[2]) + '" aria-label="' + i.date.getDate() + ' ' + MONTHS[i.date.getMonth()] + '"><span class="n" style="color:' + numCol + '">' + i.date.getDate() + '</span><span class="c">' + c + '</span></button>';
  }
  function renderReport() {
    var wd = weekdays(), infos = wd.map(dayInfo), cnt = function (t) { return infos.filter(function (i) { return i.type === t; }).length; };
    var lead = wd.length ? Math.max(0, wd[0].getDay() - 1) : 0, h = '<div class="vstack" style="gap:6px">';
    h += header('Track your monthly performance', { title: 'Attendance Report', html: '<button class="imp" data-a="import" aria-label="Import CSV">' + ic('imp') + '</button>' }, true).replace('style="padding-inline:0"', 'style="padding:6px 0 0"');
    h += '<div class="card cal"><div class="cal-head"><h3>' + periodTitle() + '</h3><div class="cal-nav"><button data-a="prev" aria-label="Previous"><svg viewBox="0 0 12 18"><path d="M9 2 3 9l6 7"/></svg></button><button data-a="next" aria-label="Next"><svg viewBox="0 0 12 18"><path d="M3 2l6 7-6 7"/></svg></button></div></div>';
    h += '<div class="dow">' + ['M', 'T', 'W', 'T', 'F'].map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div><div class="days">';
    for (var i = 0; i < lead; i++) h += '<span></span>';
    h += infos.map(cellHtml).join('') + '</div>';
    h += '<div class="sums">' + [['completed', 'On time', 'green'], ['partial', 'Incomplete', 'orange'], ['missing', 'Missing', 'red'], ['leave', 'Leave', 'blue']].map(function (x) {
      return '<div class="sum" style="background:color-mix(in srgb,var(--' + x[2] + ') 8%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--' + x[2] + ') 25%,transparent)"><b style="color:var(--' + x[2] + ')">' + cnt(x[0]) + '</b><span>' + x[1] + '</span></div>';
    }).join('') + '</div><p class="hint">Tap a cell to view daily punch details</p></div>';
    h += '<button class="export" data-a="export">' + ic('exp') + 'Export attendance (CSV)</button></div>';
    $('screen-report').innerHTML = h;
  }

  function dayTitle(d) { return DAYS[d.getDay()] + ', ' + d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear(); }
  function dayDetail(ds, edit) {
    var p = ds.split('-'), d = new Date(+p[0], +p[1] - 1, +p[2]), i = dayInfo(d), body = '', btn;
    if (edit) {
      if (!S.edit || S.edit.ds !== ds) S.edit = { ds: ds, ci: i.inT != null ? i.inT : 480, hasCo: i.outT != null || i.type === 'completed', co: i.outT != null ? i.outT : 1020 };
      var ci = S.edit.ci, hasCo = S.edit.hasCo, co = S.edit.co;
      show('<div class="sheet"><div class="grab"></div><h3>' + dayTitle(d) + '</h3><div class="form"><div class="r"><span>Check-in</span><input type="time" id="e-in" value="' + hhmm(ci) + '"></div>' +
        '<div class="r"><span>Has check-out</span><button class="switch' + (hasCo ? ' on' : '') + '" id="e-sw" role="switch" aria-checked="' + hasCo + '" data-a="sw"></button></div>' +
        (hasCo ? '<div class="r"><span>Check-out</span><input type="time" id="e-out" value="' + hhmm(co) + '"></div>' : '') + '</div>' +
        '<button class="sbtn pri" data-a="save-edit" data-d="' + ds + '" data-co="' + (hasCo ? 1 : 0) + '">Save</button><button class="link" data-a="cancel-edit" data-d="' + ds + '">Cancel</button></div>');
      return;
    }
    if (i.type === 'completed') body = '<div class="dcards"><div class="dcard" style="background:color-mix(in srgb,var(--green) 10%,transparent)"><small>CHECK-IN</small><b style="color:var(--green)">' + hhmm(i.inT) + '</b></div><div class="dcard" style="background:color-mix(in srgb,var(--pink) 10%,transparent)"><small>CHECK-OUT</small><b style="color:var(--pink)">' + hhmm(i.outT) + '</b></div></div><div class="dcard" style="background:color-mix(in srgb,var(--blue) 10%,transparent)"><small>TOTAL HOURS</small><b style="color:var(--blue)">' + (totalH(i) || '-') + '</b></div>';
    else if (i.type === 'checkedIn' || i.type === 'partial') body = '<div class="dcards"><div class="dcard" style="background:color-mix(in srgb,var(--green) 10%,transparent)"><small>CHECK-IN</small><b style="color:var(--green)">' + hhmm(i.inT) + '</b></div><div class="dcard" style="background:color-mix(in srgb,var(--pink) 10%,transparent)"><small>CHECK-OUT</small><b style="color:var(--pink)">--:--</b></div></div><p class="st" style="font-size:13px;color:var(--' + (i.type === 'partial' ? 'orange' : 'green') + ')">' + (i.type === 'partial' ? 'Incomplete — missing check-out' : 'Checked in — not checked out yet') + '</p>';
    else if (i.type === 'leave') body = '<div class="big">🏝️</div><p class="st" style="font-size:20px;color:var(--blue)">Full-day Leave</p>';
    else if (i.type === 'missing') body = '<div class="big" style="color:var(--red)">⊗</div><p class="st" style="font-size:18px;color:var(--red)">Missing attendance</p>';
    else body = '<p class="st sec">No record for this day</p>';
    show('<div class="sheet"><div class="grab"></div><h3>' + dayTitle(d) + '</h3>' + body + '<button class="sbtn" data-a="edit" data-d="' + ds + '">✎ Edit</button></div>');
  }

  /* export / import */
  function exportSheet() {
    var p = periodRange();
    show('<div class="sheet"><div class="grab"></div><h3>Export attendance</h3><div class="form"><div class="r"><span>From</span><input type="date" id="x-from" value="' + key(p.s) + '"></div><div class="r"><span>To</span><input type="date" id="x-to" value="' + key(p.e) + '"></div></div>' +
      '<button class="sbtn pri h54" data-a="do-export">' + ic('exp').replace('<svg', '<svg width="18" height="18" fill="currentColor"') + 'Export attendance</button><button class="link" data-a="close">Cancel</button></div>');
  }
  function doExport() {
    var f = $('x-from').value, t = $('x-to').value, lines = ['date,checkin,checkout'];
    Object.keys(S.records).sort().forEach(function (k) {
      var r = S.records[k]; if (k < f || k > t) return;
      lines.push(k + ',' + (r.inT != null ? hhmm(r.inT) : '') + ',' + (r.outT != null ? hhmm(r.outT) : ''));
    });
    hide();
    try {
      var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv' }));
      a.download = 'attendance_' + f.replace(/-/g, '') + '_' + t.replace(/-/g, '') + '.csv'; document.body.appendChild(a); a.click(); a.remove();
    } catch (e) { /* download unavailable */ }
  }
  function doImport(text) {
    var n = 0;
    text.split(/[\r\n]+/).forEach(function (line) {
      var c = line.split(',').map(function (x) { return x.trim(); });
      if (c.length < 2 || !/^\d{4}-\d{2}-\d{2}$/.test(c[0]) || !/^\d{1,2}:\d{2}$/.test(c[1])) return;
      var o = c.length >= 3 && /^\d{1,2}:\d{2}$/.test(c[2]) ? parse(c[2]) : null;
      addRecord(c[0], parse(c[1]), o, o == null ? 'checkedIn' : 'checkedOut'); n++;
    });
    alertBox('Import attendance', n > 0 ? 'Imported ' + n + ' day(s) successfully.' : 'No valid rows found.\nFormat: YYYY-MM-DD, HH:mm, HH:mm', [{ t: 'OK', a: 'close', cls: 'b' }]);
    render();
  }

  /* ================= PROFILE ================= */
  function renderProfile() {
    $('screen-profile').innerHTML = '<div class="pro">' +
      header('Your account & preferences', { title: 'Profile' }, true) +
      '<button class="avatar" data-a="avatar" aria-label="Change avatar"><img src="' + (S.pendingAvatar || S.avatar || 'logo.png') + '" alt="Avatar"><i>' + ic('pen') + '</i></button>' +
      '<input type="file" id="av-file" accept="image/*" hidden>' +
      '<div class="pcard"><h4>Your Name</h4><input class="name-in" id="p-name" placeholder="Name" value="' + esc(S.name) + '" autocomplete="off" maxlength="24"></div>' +
      '<div class="pcard"><div class="hd"><h4 class="m">Attendance Period</h4>' + ic('cal') + '</div><div class="line"><span>Cycle starts on day</span><button class="menu-btn" data-a="cut-menu">' + S.cutoff + '</button></div>' +
      '<p class="cap">' + (S.cutoff <= 1 ? 'Normal calendar month.' : 'From day ' + S.cutoff + ' of last month to day ' + (S.cutoff - 1) + ' of this month.') + '</p></div>' +
      '<div class="pcard"><div class="hd"><h4 class="m">Daily Check-in Reminder</h4>' + ic('bell') + '</div><div class="timeline"><button class="tbox" data-a="h-menu">' + S.rHour + '</button><span class="colon">:</span><button class="tbox" data-a="m-menu">' + S.rMin + '</button>' +
      '<div class="ampm"><button data-a="am" class="' + (S.isAM ? 'on' : '') + '">AM</button><button data-a="pm" class="' + (S.isAM ? '' : 'on') + '">PM</button></div></div><p class="every">EVERY WORKDAY</p></div>' +
      '<button class="save" data-a="save-profile">Save</button>' +
      '<button class="reset" data-a="reset-menu">' + ic('trash') + 'Reset data</button></div>';
    var f = $('av-file');
    f.addEventListener('change', function () {
      var file = f.files && f.files[0]; if (!file) return;
      var rd = new FileReader(); rd.onload = function () { S.pendingAvatar = rd.result; renderProfile(); }; rd.readAsDataURL(file);
    });
  }
  function pickMenu(items, current, kind) {
    show('<div class="menu" role="menu">' + items.map(function (x) { return '<button role="menuitem" class="' + (String(x.v) === String(current) ? 'on' : '') + '" data-a="pick" data-k="' + kind + '" data-v="' + x.v + '">' + x.l + '</button>'; }).join('') + '</div>', true);
  }

  /* ================= SPLASH ================= */
  function renderSplash() {
    $('splash').innerHTML = '<div class="glow"></div><div class="dc" style="width:55px;height:55px;opacity:.25;left:calc(50% - 135px - 27px);top:calc(50% - 160px - 27px)"></div><div class="dc" style="width:70px;height:70px;opacity:.18;left:calc(50% + 135px - 35px);top:calc(50% + 150px - 35px)"></div>' +
      '<div class="hero"><img src="logo.png" alt="Time app icon"></div><h1>Time</h1><p>Never Miss Your<br>Attendance</p>' +
      '<div class="dots"><i></i><i></i><i></i></div><button class="gs" data-a="start">Get Started</button>';
    $('splash').hidden = !S.splash;
  }

  /* ================= render / events ================= */
  function render() {
    $('clock').textContent = ampm(S.t);
    $('sbTime').textContent = clk(S.t);
    $('slider').value = S.t;
    $('play').textContent = S.playing ? '❚❚ Pause' : '▶ Play';
    $('device').dataset.theme = S.theme;
    $('th-light').classList.toggle('on', S.theme === 'light'); $('th-dark').classList.toggle('on', S.theme === 'dark');
    if (S.tab === 'home') renderHome();
    if (S.tab === 'report') renderReport();
  }
  function showTab(tab) {
    S.tab = tab; hide();
    ['home', 'report', 'profile'].forEach(function (k) { $('screen-' + k).hidden = k !== tab; });
    document.querySelectorAll('.tab').forEach(function (b) { b.classList.toggle('on', b.dataset.tab === tab); });
    if (tab === 'profile') renderProfile(); else render();
  }
  function setTime(t, play) {
    t = Math.max(MIN_T, Math.min(MAX_T, t)); var prev = S.t; S.t = t;
    if (play) notifications(prev, t);
    render();
  }

  function onClick(e) {
    var b = e.target.closest('[data-a]'); if (!b) { if (e.target.id === 'overlay') hide(); return; }
    var a = b.dataset.a;
    switch (a) {
      case 'start': S.splash = false; S.installKey = TODAY_KEY; $('splash').hidden = true; break;
      case 'checkin': doCheckIn(); break;
      case 'checkout':
        if (worked(S.t) >= S.goal * 60) doCheckOut();
        else alertBox('Confirm Early Check-out?', "You haven't completed your " + S.goal + '-hour shift today. Are you sure you want to end your shift early?', [{ t: 'Cancel', a: 'close', cls: 'b' }, { t: 'Check Out', a: 'confirm-out', cls: 'd' }]);
        break;
      case 'confirm-out': doCheckOut(); break;
      case 'aft': S.status = 'afternoonShift'; render(); break;
      case 'aftin': if (S.t >= 720) { S.status = 'checkedIn'; S.goal = 4; S.inT = S.t; S.outT = null; addRecord(TODAY_KEY, S.inT, null, 'checkedIn'); render(); } break;
      case 'leave': S.status = 'fullDayLeave'; addRecord(TODAY_KEY, null, null, 'fullDayLeave'); render(); break;
      case 'close': hide(); break;
      case 'prev': S.mOff -= 1; render(); break;
      case 'next': S.mOff += 1; render(); break;
      case 'day': dayDetail(b.dataset.d, false); break;
      case 'edit': S.edit = null; dayDetail(b.dataset.d, true); break;
      case 'cancel-edit': S.edit = null; dayDetail(b.dataset.d, false); break;
      case 'sw': if ($('e-in').value) S.edit.ci = parse($('e-in').value); if ($('e-out') && $('e-out').value) S.edit.co = parse($('e-out').value); S.edit.hasCo = !S.edit.hasCo; dayDetail(S.edit.ds, true); break;
      case 'save-edit':
        var vi = $('e-in').value, vo = $('e-out') ? $('e-out').value : '', ds = b.dataset.d, co = S.edit && S.edit.hasCo && vo ? parse(vo) : null;
        addRecord(ds, parse(vi || '08:00'), co, co == null ? 'checkedIn' : 'checkedOut'); S.edit = null; hide(); render(); break;
      case 'export': exportSheet(); break;
      case 'do-export': doExport(); break;
      case 'import': var inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.csv,text/csv,text/plain';
        inp.addEventListener('change', function () { var f = inp.files[0]; if (!f) return; var rd = new FileReader(); rd.onload = function () { doImport(String(rd.result)); }; rd.readAsText(f); }); inp.click(); break;
      case 'avatar': $('av-file').click(); break;
      case 'cut-menu': var it = [{ v: 1, l: '1 (Calendar month)' }]; for (var d = 2; d <= 31; d++) it.push({ v: d, l: d }); pickMenu(it, S.cutoff, 'cut'); break;
      case 'h-menu': var hs = []; for (var h = 1; h <= 12; h++) hs.push({ v: pad(h), l: pad(h) }); pickMenu(hs, S.rHour, 'h'); break;
      case 'm-menu': var ms = []; for (var m = 0; m < 60; m++) ms.push({ v: pad(m), l: pad(m) }); pickMenu(ms, S.rMin, 'm'); break;
      case 'pick': var k = b.dataset.k, v = b.dataset.v; if (k === 'cut') S.cutoff = +v; if (k === 'h') S.rHour = v; if (k === 'm') S.rMin = v; S.name = $('p-name') ? $('p-name').value : S.name; hide(); renderProfile(); break;
      case 'am': S.isAM = true; renderProfile(); break;
      case 'pm': S.isAM = false; renderProfile(); break;
      case 'save-profile': S.name = $('p-name').value; if (S.pendingAvatar) { S.avatar = S.pendingAvatar; S.pendingAvatar = null; } renderProfile(); savedToast('Saved'); break;
      case 'reset-menu': alertBox('Reset all attendance data?', 'This deletes all check-in/check-out records.', [{ t: 'Cancel', a: 'close', cls: 'b' }, { t: 'Reset', a: 'confirm-reset', cls: 'd' }]); break;
      case 'confirm-reset': S.records = {}; S.status = 'notCheckedIn'; S.inT = S.outT = null; hide(); savedToast('Saved'); break;
    }
  }

  /* ================= scaling to fit ================= */
  function fit() {
    var s = Math.min(1, (window.innerWidth - 32) / 426);
    if (window.innerWidth >= 860) s = Math.min(s, Math.max(0.6, (window.innerHeight - 24) / 898));
    $('deviceWrap').style.setProperty('--s', Math.max(0.5, s).toFixed(3));
  }

  /* ================= boot ================= */
  initState();
  renderSplash();
  document.addEventListener('click', onClick);
  document.querySelectorAll('.tab').forEach(function (b) { b.addEventListener('click', function () { showTab(b.dataset.tab); }); });
  $('slider').addEventListener('input', function () { setTime(+this.value, false); });
  $('play').addEventListener('click', function () { S.playing = !S.playing; render(); });
  $('reset').addEventListener('click', function () { var th = S.theme; delete S.records[TODAY_KEY]; S.playing = false; S.status = 'notCheckedIn'; S.inT = S.outT = null; S.goal = 8; S.t = initialTime(); hide(); render(); });
  $('sample').addEventListener('click', function () { var r = sampleData(); Object.keys(r).forEach(function (k) { S.records[k] = r[k]; }); S.mOff = -1; S.cutoff = 1; showTab('report'); });
  $('th-light').addEventListener('click', function () { S.theme = 'light'; render(); });
  $('th-dark').addEventListener('click', function () { S.theme = 'dark'; render(); });
  [['8:30 AM', 510], ['11:55 AM', 715], ['12:30 PM', 750], ['1:05 PM', 785], ['3:45 PM', 945], ['5:30 PM', 1050]].forEach(function (p) {
    var b = document.createElement('button'); b.textContent = p[0]; b.addEventListener('click', function () { setTime(p[1], false); }); $('presets').appendChild(b);
  });
  setInterval(function () { if (S.playing) { if (S.t >= MAX_T) { S.playing = false; render(); } else setTime(S.t + 1, true); } }, 140);
  document.querySelectorAll('.screen').forEach(function (el) { el.style.paddingTop = el.dataset.top + 'px'; });
  $('todayLabel').textContent = DAYS[TODAY.getDay()].slice(0, 3) + ' ' + TODAY.getDate() + ' ' + MONTHS[TODAY.getMonth()] + ' ' + TODAY.getFullYear();
  window.addEventListener('resize', fit); fit();
  showTab('home');
})();
