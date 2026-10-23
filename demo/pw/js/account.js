/* ============================================================
   PW — Lưu tài khoản demo trong trình duyệt
   ------------------------------------------------------------
   KHÔNG lưu mật khẩu gốc. Mật khẩu được dẫn xuất bằng PBKDF2
   (SHA-256, 100.000 vòng, salt ngẫu nhiên 16 byte) rồi chỉ lưu
   chuỗi dẫn xuất. Đăng nhập dẫn xuất lại và so sánh.

   Hai vai: 'member' là thành viên (Apex dựng sẵn hoặc các tài khoản người dùng
   tự đăng ký — nhiều tài khoản cùng lúc), 'admin' là tài khoản dựng sẵn khai báo trong
   js/data.js — cũng chỉ lưu salt + chuỗi dẫn xuất, không lưu mật khẩu.

   LƯU Ý: xác thực và phân vai chạy hoàn toàn phía trình duyệt nên KHÔNG
   phải bảo mật thật — chỉ đủ để demo luồng đăng ký → đăng nhập.
   Hệ thống thật phải xác thực và phân quyền ở máy chủ.
   ============================================================ */

const AccountStore = {
  ACCOUNTS_KEY: 'pw_demo_accounts',
  ACCOUNT_KEY: 'pw_demo_account', // khoá cũ, chỉ để chuyển dữ liệu
  REMEMBERED_EMAIL_KEY: 'pw_demo_remembered_email',
  SESSION_KEY: 'pw_demo_signed_in',
  SESSION_MEMBER_KEY: 'pw_demo_member',
  /* Khi khác null, read() trả về tài khoản này — admin dùng để dựng hồ sơ từng thành viên. */
  contextAccount: null,

  PBKDF2_ITERATIONS: 100000,
  DERIVED_BITS: 256,

  isSupported() {
    return typeof crypto !== 'undefined' && crypto.subtle && typeof crypto.subtle.deriveBits === 'function';
  },

  /** Dẫn xuất mật khẩu thành chuỗi hex. Mật khẩu gốc không bao giờ rời khỏi hàm này. */
  async derive(password, saltHex) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: hexToBytes(saltHex), iterations: this.PBKDF2_ITERATIONS, hash: 'SHA-256' },
      key,
      this.DERIVED_BITS,
    );
    return bytesToHex(new Uint8Array(bits));
  },

  /**
   * Mọi tài khoản người dùng tự đăng ký trong trình duyệt này (Nova, Emily…), không gồm Apex dựng sẵn.
   * Bản cũ chỉ lưu MỘT tài khoản ở khoá `pw_demo_account` — tự chuyển sang danh sách ở lần đọc đầu.
   */
  registeredList() {
    try {
      let list;
      const raw = localStorage.getItem(this.ACCOUNTS_KEY);
      if (raw) {
        list = JSON.parse(raw);
      } else {
        const legacy = localStorage.getItem(this.ACCOUNT_KEY);
        list = legacy ? [JSON.parse(legacy)] : [];
        if (legacy) {
          localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(list));
          localStorage.removeItem(this.ACCOUNT_KEY);
        }
      }
      // Hồ sơ nộp từ bản cũ chỉ có mốc nộp, chưa có trạng thái → coi là đang chờ duyệt.
      return list.map((account) => (account.kycSubmittedAt && !account.kycStatus ? { ...account, kycStatus: 'review' } : account));
    } catch (error) {
      return [];
    }
  },

  /** Mã nhận diện thành viên trong phiên: email viết thường (Apex thì 'apex'). */
  keyOf(account) {
    return account.email.trim().toLowerCase();
  },

  registeredByKey(key) {
    return this.registeredList().find((account) => this.keyOf(account) === key) ?? null;
  },

  /** Sửa một tài khoản đã đăng ký rồi ghi lại cả danh sách. Trả về bản đã sửa, hoặc null nếu không có. */
  updateRegistered(key, change) {
    const list = this.registeredList();
    const index = list.findIndex((account) => this.keyOf(account) === key);
    if (index < 0) return null;
    const updated = { ...list[index] };
    change(updated);
    list[index] = updated;
    localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(list));
    return updated;
  },

  /** Mọi thành viên của bản demo: Apex dựng sẵn rồi đến các tài khoản đã đăng ký, theo thứ tự đăng ký. */
  members() {
    return [
      { ...DEMO_MEMBER_ACCOUNT, memberId: 'apex' },
      ...this.registeredList().map((account) => ({ ...account, memberId: this.keyOf(account) })),
    ];
  },

  /** Thành viên đang đăng nhập (Apex hoặc một tài khoản đã đăng ký); null nếu chưa ai. */
  read() {
    if (this.contextAccount) return this.contextAccount;
    let memberId = null;
    try { memberId = sessionStorage.getItem(this.SESSION_MEMBER_KEY); } catch (error) { /* trình duyệt chặn lưu trữ */ }
    if (memberId === 'apex') return { ...DEMO_MEMBER_ACCOUNT, memberId: 'apex' };
    const account = memberId ? this.registeredByKey(memberId) : null;
    return account ? { ...account, memberId } : null;
  },

  exists() {
    return this.read() !== null;
  },

  hasEmail(email) {
    const typed = email.trim().toLowerCase();
    return typed === DEMO_MEMBER_ACCOUNT.email.toLowerCase() || this.registeredByKey(typed) !== null;
  },

  /**
   * Lưu tài khoản (thêm vào danh sách; trùng email thì thay bản cũ). `password` chỉ dùng để
   * dẫn xuất rồi bị bỏ đi, không bao giờ được ghi xuống đĩa.
   */
  async save({ accountType, legalName, representative, email, country, headcountBracketId, classIndex, password }) {
    if (!this.isSupported()) {
      throw new Error('Trình duyệt không hỗ trợ Web Crypto nên không thể lưu tài khoản an toàn.');
    }
    const saltHex = bytesToHex(crypto.getRandomValues(new Uint8Array(16)));
    const record = {
      accountType,
      legalName: legalName.trim(),
      representative: representative.trim(),
      email: email.trim(),
      country,
      headcountBracketId,
      classIndex,
      saltHex,
      passwordHashHex: await this.derive(password, saltHex),
      createdAt: new Date().toISOString(),
    };
    const rest = this.registeredList().filter((account) => this.keyOf(account) !== this.keyOf(record));
    localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify([...rest, record]));
    return record;
  },

  /**
   * Trả về bản ghi tài khoản nếu khớp, ngược lại null. Không phân biệt lý do sai.
   * Bản ghi luôn có `role`: 'admin' cho tài khoản dựng sẵn trong js/data.js,
   * 'member' cho thành viên (Apex dựng sẵn hoặc tài khoản tự đăng ký).
   */
  async verify(email, password) {
    if (!this.isSupported()) return null;
    const typed = email.trim().toLowerCase();

    // Admin có sẵn, không cần đăng ký — xem khối ADMIN_ACCOUNT trong js/data.js.
    if (typed === ADMIN_ACCOUNT.email.toLowerCase()) {
      const hashHex = await this.derive(password, ADMIN_ACCOUNT.saltHex);
      return hashHex === ADMIN_ACCOUNT.passwordHashHex ? { ...ADMIN_ACCOUNT, role: 'admin' } : null;
    }

    // Apex dựng sẵn.
    if (typed === DEMO_MEMBER_ACCOUNT.email.toLowerCase()) {
      const hashHex = await this.derive(password, DEMO_MEMBER_ACCOUNT.saltHex);
      return hashHex === DEMO_MEMBER_ACCOUNT.passwordHashHex
        ? { ...DEMO_MEMBER_ACCOUNT, role: 'member', memberId: 'apex' } : null;
    }

    const account = this.registeredByKey(typed);
    if (!account) return null;
    const hashHex = await this.derive(password, account.saltHex);
    return hashHex === account.passwordHashHex ? { ...account, role: 'member', memberId: typed } : null;
  },

  /**
   * Đánh dấu thành viên đang đăng nhập đã gửi hồ sơ KYC → trạng thái 'review', chờ admin.
   * `submission` chỉ gồm loại giấy tờ, số giấy tờ và TÊN + KÍCH THƯỚC tệp
   * (nội dung tệp không bao giờ được đọc) — để màn duyệt của admin, chạy ở
   * phiên khác, có gì mà hiển thị.
   */
  markKycSubmitted(submission) {
    const current = this.read();
    if (!current || current.memberId === 'apex') return null;
    return this.updateRegistered(current.memberId, (account) => {
      account.kycSubmittedAt = new Date().toISOString();
      account.kycStatus = 'review';
      account.kycSubmission = submission;
      delete account.kycRejection;
      delete account.kycDecidedAt;
      delete account.kycResultSeen;
      delete account.kycDraft;
    });
  },

  /** Lưu bản nháp form KYC (loại giấy tờ, số giấy tờ, tên + kích thước tệp) của thành viên đang đăng nhập. */
  saveKycDraft(draft) {
    const current = this.read();
    if (!current || current.memberId === 'apex') return null;
    return this.updateRegistered(current.memberId, (account) => { account.kycDraft = draft; });
  },

  /**
   * Ghi quyết định của admin lên tài khoản `key` (email viết thường). Duyệt: giữ Class
   * admin đã chốt. Từ chối: bỏ mốc nộp để thành viên nộp lại được, giữ lý do.
   */
  decideKyc(key, { approved, classIndex, reason, message }) {
    return this.updateRegistered(key, (account) => {
      account.kycDecidedAt = new Date().toISOString();
      delete account.kycResultSeen;
      if (approved) {
        account.kycStatus = 'approved';
        account.classIndex = classIndex;
      } else {
        account.kycStatus = 'rejected';
        account.kycRejection = { reason, message };
        delete account.kycSubmittedAt;
      }
    });
  },

  /** Thành viên đã xem kết quả duyệt — lần đăng nhập sau không đẩy về #/kyc nữa. */
  markKycResultSeen() {
    const current = this.read();
    if (!current || current.memberId === 'apex' || current.kycResultSeen) return; // Apex dựng sẵn, không có gì để ghi
    this.updateRegistered(current.memberId, (account) => { account.kycResultSeen = true; });
  },

  /**
   * Phiên đăng nhập của bản demo. Dùng sessionStorage nên đóng tab là
   * mất — chỉ để tải lại trang không bị văng khỏi dashboard. KHÔNG
   * phải phiên đăng nhập thật: không có token, không có máy chủ.
   *
   * Ô lưu trữ giữ luôn VAI đang đăng nhập ('member' hoặc 'admin') để
   * router biết đẩy về dashboard hay admin portal.
   */
  signIn(role = 'member', memberId = null) {
    try {
      sessionStorage.setItem(this.SESSION_KEY, role);
      if (role === 'member') sessionStorage.setItem(this.SESSION_MEMBER_KEY, memberId);
      else sessionStorage.removeItem(this.SESSION_MEMBER_KEY);
    } catch (error) { /* trình duyệt chặn lưu trữ */ }
  },

  signOut() {
    try {
      sessionStorage.removeItem(this.SESSION_KEY);
      sessionStorage.removeItem(this.SESSION_MEMBER_KEY);
    } catch (error) { /* trình duyệt chặn lưu trữ */ }
  },

  /** Vai đang đăng nhập, hoặc null nếu chưa đăng nhập. */
  signedInRole() {
    let stored = null;
    try { stored = sessionStorage.getItem(this.SESSION_KEY); } catch (error) { return null; }
    if (!stored) return null;
    if (stored === 'admin') return 'admin';
    // Admin không cần tài khoản đã đăng ký, thành viên thì cần.
    return this.exists() ? 'member' : null;
  },

  isSignedIn() {
    return this.signedInRole() !== null;
  },

  isAdmin() {
    return this.signedInRole() === 'admin';
  },

  rememberedEmail() {
    try {
      return localStorage.getItem(this.REMEMBERED_EMAIL_KEY) ?? '';
    } catch (error) {
      return '';
    }
  },

  /** Chỉ ghi nhớ email — không bao giờ ghi nhớ mật khẩu. */
  setRememberedEmail(email) {
    try {
      if (email) localStorage.setItem(this.REMEMBERED_EMAIL_KEY, email.trim());
      else localStorage.removeItem(this.REMEMBERED_EMAIL_KEY);
    } catch (error) {
      /* trình duyệt chặn lưu trữ — bỏ qua, không phải lỗi nghiêm trọng */
    }
  },
};

function bytesToHex(bytes) {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{2}/g).map((pair) => parseInt(pair, 16)));
}
