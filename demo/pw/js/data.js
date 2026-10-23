/* ============================================================
   PW — Nội dung landing page
   Toàn bộ chữ hiển thị nằm ở đây. Sửa nội dung thì sửa file này,
   không cần chạm app.js.
   ============================================================ */

/* ============================================================
   CỜ HỖ TRỢ DỰNG GIAO DIỆN
   ------------------------------------------------------------
   Tất cả đang TẮT — app chạy đúng như bản sẽ đem đi bảo vệ.

   allowRepeatRegistration: bật thành true để tắt kiểm tra "email đã
   tồn tại", cho phép đăng ký lại nhiều lần bằng cùng một email khi
   cần vào thẳng màn KYC mà không phải xoá localStorage.

   quickFillPassword: bật thành true thì biểu tượng chìa khoá ở ô mật khẩu
   của trang Log in thành nút điền sẵn mật khẩu thử (DEV_TEST_PASSWORD)
   để test cho nhanh.

   quickFillRegister: bật thành true thì biểu tượng toà nhà (ô tên pháp nhân)
   và biểu tượng người (ô họ tên cá nhân) ở trang Register thành nút điền
   sẵn cả form bằng dữ liệu thử của Nova / Emily (DEV_TEST_REGISTRATION).
   Không tự tick điều khoản.

   Bất kỳ cờ nào đang bật đều được in cảnh báo ra Console của trình
   duyệt, để không bao giờ lỡ đem bản còn bật cờ đi bảo vệ.
   ============================================================ */
const DEV_FLAGS = {
  allowRepeatRegistration: false,
  quickFillPassword: false,
  quickFillRegister: false,
};

/* Mật khẩu thử dùng chung cho các tài khoản demo (Apex, Nova, Emily) — chỉ dùng cho cờ quickFillPassword */
const DEV_TEST_PASSWORD = '123456Aa@';

/* Dữ liệu thử cho cờ quickFillRegister: Nova (Company · UK · 51–200 → Class 2) và Emily (Individual · Singapore → Class 0).
   Khớp dữ liệu test của người dùng (TC-004 / TC-005). */
const DEV_TEST_REGISTRATION = {
  nova: {
    name: 'Nova Harbor Ltd.', representative: 'Daniel Brooks', email: 'nova@gmail.com',
    headcount: '51-200', country: 'United Kingdom',
  },
  emily: {
    name: 'Emily Carter', email: 'emily@gmail.com', country: 'Singapore',
  },
};

const LANDING = {
  brand: { name: 'PW', tagline: 'Business Recognition' },

  /* Nút đặt lại bản demo — do bản code thêm, thiết kế không vẽ */
  resetLabel: 'Reset',
  resetConfirm: 'Reset the demo? All registered accounts and demo changes will be erased, and the site returns to its default state (Apex with 4 Titles and 2 wallets; Nova and Emily not registered).',

  nav: [
    { label: 'How it works', href: '#how',    isCurrent: true  },
    { label: 'Titles',       href: '#titles', isCurrent: false },
    { label: 'Directory',    href: '#/public-directory', isCurrent: false },
  ],

  hero: {
    tag: 'On-chain title protocol',
    headline: 'Verifiable Business Recognition,',
    headlineAccent: 'Secured on the Blockchain.',
    lead: 'PW issues cryptographically authenticated business Titles — verifiable on-chain — for forward-thinking enterprises, family offices, and sovereign leaders.',
    facts: [
      { key: 'Verification',  value: 'Publicly verifiable' },
      { key: 'Security',      value: 'Tamper-proof records' },
      { key: 'Accessibility', value: 'No crypto wallet needed' },
    ],
  },

  /* Thẻ mẫu danh hiệu ở cột phải của hero */
  specimen: {
    issuerLabel: 'Protocol Title',
    status: 'Active / Verifiable',
    category: 'Business titles · Investor',
    name: 'Investor',
    description: 'Cryptographic proof of accredited partnership & executive syndicate status.',
    rows: [
      { key: 'Issuer',          value: 'PW Protocol Trust' },
      { key: 'Security Status', value: 'Immutable Lock', isVerified: true, icon: 'lock' },
      { key: 'Consensus',       value: 'Node Validated', isVerified: true, icon: 'check' },
      { key: 'Title Hash',      value: 'ID: #PW-88204-INV', isHash: true },
    ],
    ledgerState: 'Live Ledger State',
    ledgerLink: 'View Ledger Block',
  },

  trust: {
    claimBefore: 'Trusted by over ',
    claimHighlight: '450+ enterprise leaders',
    claimAfter: ', verified institutions, and sovereign strategic partners worldwide.',
    /* Ba tên đối tác (Apex Alliance, Horizon Equity, Crown Ventures) đã bỏ theo yêu cầu */
    partners: [],
  },

  how: {
    tag: 'Methodology',
    heading: 'How it works',
    lead: 'A seamless transition from traditional corporate verification to permanent digital registry.',
    steps: [
      {
        accent: 'blue',
        tag: 'KYC & AML verified',
        heading: 'Register & Complete KYC',
        body: 'Rapid corporate identity verification. Our compliance desk confirms executive status and business incorporation within hours.',
        chip: 'Jurisdiction Check • LEI Registry',
        chipIcon: 'check',
      },
      {
        accent: 'purple',
        tag: 'Automated mint',
        heading: 'Acquire or Gift a Title',
        body: 'Select a Title. Our smart protocol deploys automated custody without requiring manual crypto wallet setup or technical overhead.',
        chip: 'Zero Crypto Friction • Institutional Fiat',
        chipIcon: 'lock',
      },
      {
        accent: 'green',
        tag: 'Global provenance',
        heading: 'Verify On-Chain',
        body: 'Instant, cryptographic validity available 24/7 across our public verification directory and sovereign partner API endpoints.',
        chip: 'Immutable Public Ledger Directory',
        chipIcon: 'globe',
      },
    ],
  },

  titles: {
    tag: 'Partnership titles',
    heading: 'Choose your title',
    status: 'Active / Verifiable',
    cards: [
      {
        name: 'Philanthropist',
        description: 'Championing institutional social impact and corporate endowment.',
        designatedFor: 'Grant makers, patron leaders, ESG founders, and sovereign endowment officers.',
        series: 'Series Alpha Validated',
      },
      {
        name: 'Investor',
        description: 'Validating strategic venture alliances, co-underwriting mandates, and capital syndicates.',
        designatedFor: 'Angel syndicates, venture partners, institutional allocators, and family principals.',
        series: 'Series Prime Priority',
      },
      {
        name: 'Bridge',
        description: 'Recognizing cross-border expansion, deal brokerage, and strategic institutional alliances.',
        designatedFor: 'Ecosystem builders, M&A advisors, strategic operators, and global trade counsels.',
        series: 'Series Global Connectivity',
      },
    ],
  },

  footer: {
    copyright: '© 2026 PW Protocol. All rights reserved.',
    links: ['Legal Finality', 'Smart Custody', 'Cryptographic Proof'],
  },
};

/* ============================================================
   TRANG WAITLIST — waitlist.html
   ------------------------------------------------------------
   Landing page cho giai đoạn web CHƯA mở onboard: chỉ cho đăng ký
   danh sách chờ. Đo từ ba bản thiết kế
   design/PW — Landing Page (Optimized Flow).png  (và - Error, - Confirmed).
   Thiết kế còn dải ba tên đối tác (Apex Alliance…) nhưng người dùng đã
   yêu cầu bỏ ở landing chính, nên ở đây cũng bỏ (`LANDING.trust.partners`).
   ============================================================ */
const WAITLIST = {
  storageKey: 'pw_waitlist',
  /* Hai liên kết đi sang bản web đầy đủ nằm kế bên */
  directoryHref: 'index.html#/public-directory',
  exploreLabel: 'Explore the Directory',

  card: {
    tag: 'Priority protocol allocation',
    issuance: 'Q1 Issuance',
    title: 'Join the Waitlist',
    lead: 'Register your institution for prioritized access to digital distinction certificates.',
    emailLabel: 'Work Email',
    emailPlaceholder: 'e.g. alistair@vance-holdings.ch',
    nameLabel: 'Full Name',
    nameOptional: '(Optional)',
    namePlaceholder: 'e.g. Lord Alistair Vance',
    submitLabel: 'Join Waitlist',
    secureNote: 'Institutional-grade · Strict confidentiality',
    duplicateBadge: 'Already registered',
    /* Bản code — thiết kế chỉ vẽ lỗi trùng email */
    errors: {
      required: 'Please enter your work email.',
      invalid: 'Please enter a valid email address.',
      duplicate: ['This email is already on the waitlist.', "We'll email your invite when PW opens."],
    },
    confirmed: {
      badge: 'Verified Spot',
      title: 'You’re on the list!',
      lead: "We've saved your spot — we'll email your invite when PW opens.",
    },
  },

  titles: {
    learnMoreLabel: 'Learn more',
  },
};

/* ============================================================
   Bậc quy mô doanh nghiệp → Class
   ------------------------------------------------------------
   Mockup chỉ nêu một bậc: "51-200 employees" → class 2.
   Các bậc còn lại và quy tắc đặt tên nhãn (Standard / Premium /
   Enterprise) là GIẢ ĐỊNH, chưa được xác nhận trong BRD.
   ============================================================ */
const HEADCOUNT_BRACKETS = [
  { id: '1-10',        label: '1-10 employees',         classIndex: 0 },
  { id: '11-50',       label: '11-50 employees',        classIndex: 1 },
  { id: '51-200',      label: '51-200 employees',       classIndex: 2 },
  { id: '201-500',     label: '201-500 employees',      classIndex: 3 },
  { id: '501-1000',    label: '501-1,000 employees',    classIndex: 4 },
  { id: '1001-5000',   label: '1,001-5,000 employees',  classIndex: 5 },
  { id: '5001-10000',  label: '5,001-10,000 employees', classIndex: 6 },
  { id: '10000-plus',  label: '10,000+ employees',      classIndex: 7 },
];

/* Nhãn hiển thị bên phải dải class. GIẢ ĐỊNH. */
const CLASS_TIERS = [
  { upToClassIndex: 2, label: 'Standard class' },
  { upToClassIndex: 5, label: 'Premium class' },
  { upToClassIndex: 7, label: 'Enterprise class' },
];

/* Danh sách rút gọn cho bản demo, không phải danh mục ISO đầy đủ */
const COUNTRIES = [
  'United States', 'United Kingdom', 'Switzerland', 'Singapore', 'Germany',
  'France', 'Netherlands', 'Japan', 'South Korea', 'Australia',
  'Canada', 'United Arab Emirates', 'Viet Nam', 'Estonia', 'Norway',
];

/* ============================================================
   Nội dung màn hình đăng ký
   ============================================================ */
const REGISTER = {
  badge: 'PW • Business Recognition',
  heading: 'Create your account',
  lead: 'Create your account to get verified, then purchase or receive Titles.',

  accountTypeLabel: 'Account type',
  accountTypes: [
    { id: 'company',    label: 'Company',    icon: 'building' },
    { id: 'individual', label: 'Individual', icon: 'person' },
  ],

  /* Nhãn và placeholder khác nhau giữa hai loại tài khoản, theo đúng hai bản thiết kế */
  fields: {
    company: {
      legalName:      { label: 'Registered legal entity name', placeholder: 'Enter the registered company name', icon: 'building' },
      representative: { label: 'Authorized representative full name', placeholder: 'Enter the representative\u2019s full name', icon: 'badge' },
      email:          { label: 'Work email', placeholder: 'name@company.com' },
      country:        { label: 'Country of incorporation' },
    },
    individual: {
      fullName: { label: 'Full name', placeholder: 'Enter your full name', icon: 'person' },
      email:    { label: 'Email', placeholder: 'name@example.com' },
      country:  { label: 'Country' },
    },
    email:     { icon: 'mail' },
    headcount: { label: 'Organization headcount' },
    password:  { label: 'Password' },
    confirm:   { label: 'Confirm password', hint: 'At least 8 characters, with a number and a symbol.' },
  },

  classBanner: {
    prefix: 'Your class:',
    suffix: '(based on headcount)',
  },

  strength: {
    label: 'Strength',
    /* Chỉ số 0 ứng với ô mật khẩu còn trống — để rỗng, không hiện chữ gì.
       Ba mức sau ứng với số quy tắc đã đạt. */
    levels: ['', 'Weak', 'Fair', 'Strong'],
  },

  terms: {
    before: 'I agree to the ',
    termsLink: 'Terms of Service',
    between: ' and ',
    privacyLink: 'Privacy Policy',
    after: '.',
  },

  kycNotice: "You'll complete a quick identity check (KYC) next to activate purchasing.",
  submitLabel: 'Create account →',
  reassurance: 'Bank-grade encryption · Your data stays private',
  loginPrompt: 'Already have an account?',
  loginLabel: 'Log in',

  errors: {
    legalNameRequired:      'Please enter the registered legal entity name.',
    fullNameRequired:       'Please enter your full legal name.',
    representativeRequired: 'Please enter the authorized representative\u2019s full name.',
    emailRequired:          'Please enter your email address.',
    emailInvalid:           'Please enter a valid email address.',
    emailTaken:             'This email is already registered. Log in instead.',
    headcountRequired:      'Please select your organization headcount.',
    countryRequired:        'Please select a country.',
    passwordTooShort:       'Please use at least 8 characters.',
    passwordNeedsNumber:    'Please include at least one number.',
    passwordNeedsSymbol:    'Please include at least one symbol.',
    confirmMismatch:        'Passwords do not match. Please try again.',
    termsRequired:          'Please accept the Terms of Service and Privacy Policy.',
    storageUnavailable:     'This browser blocks secure storage, so the account cannot be saved.',
  },
};

/* ============================================================
   Nội dung màn đăng nhập
   Bản thiết kế có hai trạng thái: bình thường và lỗi.
   ============================================================ */
const LOGIN = {
  badge: 'PW • Business Recognition',
  heading: 'Log in to your account',
  lead: 'Access your titles and dashboard.',

  email:    { label: 'Email', placeholder: 'you@company.com' },
  password: { label: 'Password', forgotLabel: 'Forgot password?' },
  rememberLabel: 'Remember me',

  submitLabel: 'Log in →',
  dividerLabel: 'or',
  passkeyLabel: 'Log in with passkey',

  signupPrompt: 'New to PW?',
  signupLabel: 'Create account',
  footerNote: 'Protected by bank-grade encryption.',

  errors: {
    emailRequired:    'Please enter your email address.',
    emailInvalid:     'Please enter a valid email address.',
    passwordRequired: 'Please enter your password.',
    /* Dùng chung một thông báo cho mọi trường hợp sai — không tiết lộ
       email đó có tồn tại hay không. Đây là thực hành tiêu chuẩn. */
    credentials:      'Incorrect email or password. Please try again.',
  },
};

/* ============================================================
   Nội dung màn xác minh danh tính (KYC)
   ============================================================ */
/* Màn thông báo được tặng danh hiệu — đo từ design/PW — Recipient Gift Notification.png (2x).
   Hiện cho người nhận ngay sau khi đăng nhập nếu còn quà chưa xem. Người tặng, lời nhắn, tên danh hiệu và mã Title lấy từ lần mua tặng;
   thiết kế vẽ người tặng kèm chức danh (Alex Chen, CIO) nhưng hệ thống không có chức danh nên chỉ ghi người đại diện nếu có. */
const GIFT_NOTICE = {
  badge: 'PW \u2022 Business Recognition',
  heading: 'You\u2019ve received a Gifted Title',
  lead: '{sender} has assigned and gifted an institutional smart legal title to your registry account.',
  fromPrefix: 'From:',
  specHeading: 'Title spec',
  standardHeading: 'Token standard',
  titleNameLabel: 'Title name',
  standardPill: 'ERC-3643',
  recipientLabel: 'Recipient',
  titleIdLabel: 'Title ID',
  copyLabel: 'Copy Title ID',
  verifiedNote: 'Cryptographically Verified & Active',
  viewLabel: 'View my title',
  footnote: 'This title confers full partnership governance rights across verified directories.',
};

const KYC = {
  eyebrow: 'Institutional regulatory gateway',
  heading: 'Verify your identity',

  legalName: {
    label: 'Legal Entity or Personal Name',
    /* Ô này được điền tự động từ tài khoản vừa đăng ký. Placeholder chỉ hiện
       khi vào thẳng #/kyc mà chưa đăng ký tài khoản nào. */
    placeholder: 'Enter the legal entity or personal name',
  },
  documentType: {
    label: 'Verification Document Type',
    /* Giấy tờ pháp nhân dành cho tài khoản Company, giấy tờ tuỳ thân dành
       cho tài khoản Individual — thiết kế gộp chung một danh sách. */
    options: {
      company: [
        'Articles of Incorporation / Org.',
        'Certificate of Good Standing',
        'Business Registration Extract',
      ],
      individual: [
        'Passport',
        'National ID Card',
        "Driver's Licence",
      ],
    },
  },
  documentId: {
    label: 'Document Identification / Registry No.',
    /* Người dùng tự nhập. Bản thiết kế hiển thị ô đã điền (DE-LLC-7840192-B); bản code
       dùng chữ chung để không ai tưởng đó là giá trị điền sẵn. */
    placeholder: 'Enter the registry number',
    /* Tài khoản Individual: số giấy tờ tuỳ thân, không phải số đăng ký doanh nghiệp. */
    placeholderIndividual: 'Enter the document number',
  },

  upload: {
    label: 'Upload documents',
    dropPrefix: 'Drop enterprise records here, or ',
    browseLabel: 'browse files',
    hint: 'Accepts PDF, JPG, or PNG up to 25MB.',
    acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    acceptedExtensions: ['.pdf', '.jpg', '.jpeg', '.png'],
    maxBytes: 25 * 1024 * 1024,
    uploadedLabel: 'Uploaded',
    removeLabel: 'Remove file',
  },

  securityNote: 'Your information is encrypted and stored securely.',
  saveDraftLabel: 'Save Draft & Exit',
  submitLabel: 'Submit for verification →',
  /* Sau khi bị từ chối, nút nộp ghi chữ này — thiết kế không vẽ */
  resubmitLabel: 'Re-submit for verification →',
  helpPrompt: 'Need help?',
  helpLabel: 'Contact support',

  errors: {
    legalNameRequired:  'Please enter the legal entity or personal name.',
    documentIdRequired: 'Please enter the document identification number.',
    documentsRequired:  'Please upload at least one document.',
    fileTooLarge:       'Sorry, this file exceeds the 25MB limit.',
    fileWrongType:      'Please upload a PDF, JPG, or PNG file.',
  },

  /* Màn sau khi gửi hồ sơ — theo design/PW — KYC Verification (In Review).png.
     Mã tham chiếu và tên pháp nhân do code sinh ra từ tài khoản vừa đăng ký. */
  review: {
    /* Chỉ nói "in review" MỘT lần (tiêu đề); thiết kế còn pill và chữ trong vòng tròn — đã bỏ vì lặp. */
    heading: 'Your documents are in review',
    body: 'We are reviewing your submitted documentation. This typically takes 1\u20132 business days. Purchasing and title access will unlock once approved.',
    referenceLabel: 'Reference number',
    entityLabel: 'Submitted entity',
    estimateLabel: 'Estimated time',
    estimateValue: '1\u20132 Business Days',
    dashboardLabel: 'Go to Member Dashboard',
  },

  /* Màn sau khi admin duyệt — theo design/PW — KYC Verification (Approved).png.
     Mã tham chiếu, tên pháp nhân, Class và ngày do code lấy từ tài khoản. */
  approved: {
    statusLabel: 'Verified & active',
    heading: 'You\u2019re verified \u2014 your account is active',
    body: 'Your identity has been verified. You can now purchase and gift institutional Titles across authorized corporate directories.',
    classPrefix: 'Your class:',
    classWord: 'Class',
    classNote: 'Tier assigned based on company verified headcount',
    classBadge: 'Auto-assigned',
    verifiedOnLabel: 'Verified on',
    todayPrefix: 'Today, ',
    referenceLabel: 'Reference ID',
    copyLabel: 'Copy reference ID',
    entityLabel: 'Entity',
    dashboardLabel: 'Go to Dashboard',
    purchaseLabel: 'Purchase a Title',
    custodyNote: 'Encrypted & institutional-grade custody \u00b7 Audit reference recorded',
    helpPrompt: 'Need assistance?',
    helpLabel: 'Contact institutional support',
  },

};

/* ============================================================
   Nội dung màn Member Dashboard
   ------------------------------------------------------------
   Đây là màn đầu tiên sau khi đăng nhập thành công.

   Bản thiết kế vẽ một tài khoản đã dùng lâu (27.000 điểm, 4 NFT,
   2 ví, một chuỗi hoạt động). Bản code này KHÔNG chép các con số
   đó — tài khoản demo vừa đăng ký nên chưa có gì, và màn hình phải
   nói đúng sự thật đó. Vì vậy mỗi khối có thêm phần `empty`.
   ============================================================ */
const DASHBOARD = {
  brand: { name: 'PW', tagline: 'Business Recognition' },

  networkStatus: { label: 'Network status', value: 'Secured' },

  /* Chỉ mục đầu có màn hình thật. Hai mục sau chưa được dựng —
     xem phần "Giới hạn hiện tại" trong README. */
  nav: [
    { id: 'dashboard',   label: 'Member Dashboard',     icon: 'grid',       route: '#/dashboard' },
    { id: 'acquisition', label: 'Acquisition & Gifting', icon: 'checkBadge', route: '#/acquisition' },
    { id: 'directory',   label: 'Public Directory',      icon: 'book',       route: '#/directory' },
  ],

  notificationsLabel: 'Notifications',
  /* Bản code — thiết kế chưa vẽ hộp thông báo; nội dung dựng từ những việc admin/thành viên khác đã làm với tài khoản này */
  notifications: {
    heading: 'Notifications',
    empty: 'You’re all caught up. New updates will appear here.',
    newLabel: 'New',
    gift: { title: 'Title received', body: '{giver} gifted you {name} ({id}).' },
    award: { title: 'Award granted', body: 'PW granted you the {name} award ({id}).' },
    pointsAdded: { title: 'Points added', body: '{amount} PTS were added to your balance. Reason: {reason}.' },
    pointsRemoved: { title: 'Points deducted', body: '{amount} PTS were deducted from your balance. Reason: {reason}.' },
    revoked: { title: 'Title revoked', body: '{name} ({id}) has been revoked by PW. Reason: {reason}.' },
  },
  accountMenuLabel: 'Account',

  heading: 'Dashboard',
  classPrefix: 'Class',

  /* ============================================================
     Trạng thái KYC của tài khoản demo
     ------------------------------------------------------------
     Luồng duyệt KYC chưa được thiết kế nên prototype không có ai
     duyệt hồ sơ. Người dùng đã quyết định: tài khoản demo coi như
     ĐÃ được duyệt, đúng như bản thiết kế dashboard vẽ.

     Đổi thành 'review' hoặc 'required' là xem lại được hai nhãn kia
     — cả ba vẫn dựng đủ.
     ============================================================ */
  demoKycState: 'verified',

  /* Nhãn trạng thái KYC hiển thị ngay dưới tiêu đề. Giữ đủ ba trạng
     thái để khi có luồng duyệt thật thì dùng lại được ngay. */
  kycStates: {
    verified: { label: 'KYC verified',  tone: 'green', icon: 'check' },
    review:   { label: 'KYC in review', tone: 'amber', icon: 'info',  link: 'View status' },
    required: { label: 'Not yet KYC',   tone: 'grey',  icon: 'alert', link: 'Complete KYC' },
    rejected: { label: 'KYC rejected',  tone: 'red',   icon: 'alert' },
  },

  /* Thông báo hồ sơ KYC bị từ chối ở đầu Dashboard — thiết kế không vẽ */
  kycRejected: {
    heading: 'Your KYC submission was not approved',
    reasonPrefix: 'Reason:',
    resubmitLabel: 'Re-submit KYC',
  },

  stats: {
    points: {
      label: 'Point balance',
      historyLabel: 'View history',
      unit: 'PTS',
      note: 'You\'ll earn points from your first Title purchase.',
    },
    ranking: {
      label: 'Ranking',
      rankSuffix: 'in Public Directory',
      emptyValue: 'Not ranked yet',
      infoLabel: 'How ranking is counted',
      note: 'Only Titles kept in your PW wallet or a linked wallet are counted.',
    },
    titles: {
      label: 'Titles owned',
      badge: 'Total',
      /* Tiếng Anh phân biệt số ít / số nhiều: "1 Award" nhưng "3 Distinctions" */
      distinctionsLabel: { one: 'Title', other: 'Titles' },
      awardsLabel:       { one: 'Award',       other: 'Awards'       },
    },
  },

  wallets: {
    heading: 'My wallets',
    nftLabel: { one: 'NFT', other: 'NFTs' },
    linkLabel: 'Link wallet',
    copyLabel: 'Copy address',
    unlinkLabel: 'Unlink',
    footnote: 'Each wallet can be linked to only one PW account.',
    empty: {
      heading: 'You don\'t have a wallet yet',
      body: 'Your wallet is ready once you get your first Title, or you can link one you already own.',
    },
  },

  titles: {
    heading: 'My Titles',

    /* Huy hiệu góc phải mỗi thẻ danh hiệu, chọn theo trường `kind`.

       CỐ Ý không có `distinction`: gần như thẻ nào cũng là distinction nên
       nhãn đó không phân biệt được gì, chỉ làm chật đầu thẻ. Thiếu khoá thì
       renderPill() tự bỏ qua, không cần sửa app.js.

       Trường `kind: 'distinction'` vẫn giữ trong từng danh hiệu vì ô số liệu
       "Titles owned" còn đếm theo nó ("4 Distinctions · 1 Award"). */
    kinds: {
      award: { label: 'Award', tone: 'purple', icon: 'lock' },
    },

    empty: {
      heading: 'No Titles yet',
      body: 'Titles you buy or receive as a gift will appear here.',
      action: 'Browse Titles →',
    },
  },

  activity: {
    heading: 'Recent activity',
    empty: {
      heading: 'Nothing here yet',
      body: 'Wallet links, purchases, transfers, and point accruals are listed here in the order they settle on-chain.',
    },
  },

  /* Khối tài khoản ở đáy thanh bên */
  account: {
    walletFallback: 'No wallet linked',
    logOutLabel: 'Log out',
  },

  /* Hiện khi vào thẳng #/dashboard mà chưa đăng nhập */
  signedOut: 'Log in to view your dashboard.',

  /* Màn Point history — mở từ nút "View history" ở ô Point balance (Dashboard) và ở khối Use points (Payment). Thiết kế chưa vẽ,
     chữ do bản code đặt. `sample` là lịch sử điểm của hồ sơ mẫu Apex (10% giá Class 4 của ba danh hiệu mua trước đó = 2,450 PTS). */
  pointHistory: {
    heading: 'Point history',
    lead: 'Every change to your point balance, newest first.',
    backLabel: 'Back to Dashboard',
    balanceLabel: 'Current balance',
    earnedLabel: 'Total earned',
    usedLabel: 'Total used',
    unit: 'PTS',
    balanceAfter: 'Balance',
    listHeading: 'Transactions',
    empty: { heading: 'No point activity yet', note: 'You earn 10% of the amount you pay on every Title purchase.' },
    events: {
      earned: 'Points earned',
      earnedGift: 'Points earned · gift',
      received: 'Points earned · gift received',
      redeemed: 'Points redeemed',
      adjusted: 'Points adjusted',
    },
    sample: [
      { at: '2026-08-18T10:05:41Z', detail: 'Investor (#PW-2026-INV-10233) · 10% of CHF 9,000.00', delta: 900 },
      { at: '2026-09-12T11:30:07Z', detail: 'Bridge (#PW-2026-BRG-20417) · 10% of CHF 6,500.00', delta: 650 },
      { at: '2026-09-22T16:38:12Z', detail: 'Investor (#PW-2025-INV-99810) · 10% of CHF 9,000.00', delta: 900 },
    ],
  },

  /* ============================================================
     DỮ LIỆU MẪU LẤY NGUYÊN TỪ BẢN THIẾT KẾ
     ------------------------------------------------------------
     Toàn bộ số liệu dưới đây chép từ design/PW Registry — Member
     Dashboard.png để màn hình dựng ra giống hệt bản thiết kế.

     ĐÂY KHÔNG PHẢI DỮ LIỆU THẬT. Prototype chưa có màn mua danh
     hiệu, liên kết ví hay sổ hoạt động nên không có nguồn nào sinh
     ra chúng. Khi nào có, thay nguồn trong readMemberProfile() ở
     js/app.js — phần dựng giao diện không phải sửa.

     Địa chỉ ví lưu đúng chuỗi rút gọn mà bản thiết kế hiển thị
     (`addressLabel`), không lưu địa chỉ đầy đủ, vì bản thiết kế
     không cho biết địa chỉ đầy đủ là gì.
     ============================================================ */
  /* Hồ sơ của tài khoản mới: chưa có điểm, hạng, ví, danh hiệu hay hoạt động nào —
     chỉ có tên, Class và nhãn KYC. */
  emptyProfile: {
    points: 0,
    rank: null,
    wallets: [],
    titles: [],
    activity: [],
  },

  /* Chỉ tài khoản mang tên này nhận hồ sơ mẫu bên dưới (Apex có sẵn 4 NFT). Mọi tài
     khoản khác — ví dụ Nova — bắt đầu bằng `emptyProfile`. */
  demoProfileOwner: 'Apex Global Syndicate Inc.', // = DEMO_MEMBER_ACCOUNT.legalName

  demoProfile: {
    /* Không có kycState ở đây: trạng thái KYC lấy từ tài khoản thật
       qua resolveKycState() trong js/app.js, không lấy từ dữ liệu mẫu. */
    points: 2450, // 10% giá Class 4: Investor 900 + Investor 900 + Bridge 650
    pointsNote: 'Year-2 discount',

    rank: 12,

    /* Mặc định tài khoản mẫu có 4 NFT: 3 danh hiệu đã mua + 1 award. Ba cái ở ví giữ hộ
       (Investor #PW-2025-INV-99810, Bridge, award Philanthropist); Investor thứ hai (#PW-2026-INV-10233) đã chuyển sang ví cá nhân và bị khoá. Mốc thời gian
       dưới đây (mintedAt, các dòng Recent activity, ngày liên kết ví, dòng GRANT_MINT mẫu của Audit
       Logs) là MỘT dòng thời gian thống nhất — sửa một chỗ phải sửa các chỗ còn lại. Ngày không có
       trong thiết kế là dữ liệu mẫu. */
    memberSince: '2024-10-01',

    wallets: [
      {
        id: 'pw-custodial',
        name: 'PW wallet',
        // Ví giữ hộ không gắn nhãn "Custodial" (người dùng yêu cầu bỏ).
        addressLabel: '0x4f3a…9c21',
        meta: 'Managed by Circle',
        nftCount: 3,
        canUnlink: false,
      },
      {
        id: 'ledger-personal',
        name: 'Ledger — personal',
        badge: { label: 'Verified', tone: 'green', icon: 'check' },
        addressLabel: '0x8b2e…41d7',
        meta: 'Linked 24 Sep 2026, 09:12 UTC',
        nftCount: 1,
        canUnlink: true,
      },
    ],

    titles: [
      {
        id: '#PW-2025-INV-99810',
        walletId: 'pw-custodial',
        name: 'Investor',
        kind: 'distinction',
        mintedAt: '2026-09-22T16:38:12Z',
        pills: [
          { label: 'PW wallet' },
        ],
        detail: 'ERC-3643 · Issued 22 Sep 2026 · Transfer available (one-time)',
        primaryAction: 'Transfer',
        secondaryAction: 'View on-chain',
      },
      {
        id: '#PW-2026-INV-10233',
        walletId: 'ledger-personal',
        name: 'Investor',
        kind: 'distinction',
        mintedAt: '2026-08-18T10:05:41Z',
        pills: [
          { label: 'Personal wallet · Ledger', tone: 'green' },
          { label: 'Locked', icon: 'lock' },
        ],
        detail: 'ERC-3643 · Issued 18 Aug 2026 · Wallet 0x8b2e…41d7 · One-time transfer used — locked in this wallet',
        note: 'Locked — transfer already used',
        secondaryAction: 'View on-chain',
      },
      {
        id: '#PW-2026-BRG-20417',
        walletId: 'pw-custodial',
        name: 'Bridge',
        kind: 'distinction',
        mintedAt: '2026-09-12T11:30:07Z',
        pills: [
          { label: 'PW wallet' },
        ],
        detail: 'ERC-3643 · Issued 12 Sep 2026 · Transfer available (one-time)',
        primaryAction: 'Transfer',
        secondaryAction: 'View on-chain',
      },
      {
        id: '#PW-2026-AWD-00412',
        walletId: 'pw-custodial',
        name: 'Philanthropist',
        kind: 'award',
        mintedAt: '2026-05-18T11:15:30Z',
        pills: [
          { label: 'PW wallet' },
          { label: 'Soulbound', tone: 'purple' },
        ],
        detail: 'ERC-5484 · Granted 18 May 2026 · Non-transferable',
        secondaryAction: 'View on-chain',
      },
    ],

    /* `detail` cắt thành từng đoạn để tô màu được mà vẫn escape đủ.
       Đoạn không có `tone` dùng màu chữ phụ mặc định. */
    activity: [
      {
        id: 'investor-transferred',
        title: 'Transfer completed',
        state: { label: 'Settled', tone: 'green' },
        detail: [
          { text: 'Investor (' },
          { text: '#PW-2026-INV-10233', tone: 'blue' },
          { text: ') transferred to ' },
          { text: 'Ledger — personal (0x8b2e…41d7)', tone: 'strong' },
          { text: ' and locked' },
        ],
        timestamp: '25 Sep 2026, 13:40 UTC',
      },
      {
        id: 'wallet-linked',
        title: 'Wallet linked',
        state: { label: 'Verified', tone: 'green' },
        detail: [
          { text: 'Ledger — personal (' },
          { text: '0x8b2e…41d7', tone: 'blue' },
          { text: ') verified via cryptographic signature' },
        ],
        timestamp: '24 Sep 2026, 09:12 UTC',
      },
      {
        id: 'points-earned',
        title: 'Points earned',
        state: { label: 'Settled', tone: 'green' },
        detail: [
          { text: '+900 PTS', tone: 'green' },
          { text: ' accrued from Investor Title acquisition settlement' },
        ],
        timestamp: '22 Sep 2026, 16:40 UTC',
      },
      {
        id: 'bridge-points',
        title: 'Points earned',
        state: { label: 'Settled', tone: 'green' },
        detail: [
          { text: '+650 PTS', tone: 'green' },
          { text: ' accrued from Bridge Title acquisition settlement' },
        ],
        timestamp: '12 Sep 2026, 11:31 UTC',
      },
      {
        id: 'bridge-issued',
        title: 'Title issued',
        state: { label: 'Settled', tone: 'green' },
        detail: [
          { text: 'Bridge (' },
          { text: '#PW-2026-BRG-20417', tone: 'blue' },
          { text: ') issued on-chain and deposited to ' },
          { text: 'PW wallet', tone: 'strong' },
        ],
        timestamp: '12 Sep 2026, 11:30 UTC',
      },
      {
        id: 'investor-points',
        title: 'Points earned',
        state: { label: 'Settled', tone: 'green' },
        detail: [
          { text: '+900 PTS', tone: 'green' },
          { text: ' accrued from Investor Title acquisition settlement' },
        ],
        timestamp: '18 Aug 2026, 10:06 UTC',
      },
      {
        id: 'investor-issued',
        title: 'Title issued',
        state: { label: 'Settled', tone: 'green' },
        detail: [
          { text: 'Investor (' },
          { text: '#PW-2026-INV-10233', tone: 'blue' },
          { text: ') issued on-chain and deposited to ' },
          { text: 'PW wallet', tone: 'strong' },
        ],
        timestamp: '18 Aug 2026, 10:05 UTC',
      },
      {
        id: 'award-granted',
        title: 'Award granted',
        state: { label: 'Settled', tone: 'green' },
        detail: [
          { text: 'Philanthropist (' },
          { text: '#PW-2026-AWD-00412', tone: 'blue' },
          { text: ') granted by PW and deposited to ' },
          { text: 'PW wallet', tone: 'strong' },
        ],
        timestamp: '18 May 2026, 11:15 UTC',
      },
    ],
  },
};

/* ============================================================
   Nội dung màn Acquisition & Gifting — Bước 1: chọn danh hiệu
   ------------------------------------------------------------
   Đo từ design/PW — Acquisition & Gifting (Step 1_ Select Title).png.

   Bản thiết kế CHỈ có bước 1. Các bước sau (chọn người nhận, thanh
   toán, mint) chưa được vẽ nên chưa dựng — nút "Continue to Recipient"
   giữ nguyên hình thức nhưng chưa dẫn đi đâu.

   TIỀN TỆ: toàn ứng dụng dùng MỘT cách viết — mã tiền đứng trước số,
   dính liền bằng dấu cách không ngắt: "CHF 1,500", "CHF 3,500.00".
   Các file thiết kế viết không thống nhất (có chỗ "$1,500 CHF", có chỗ
   "$3,500.00 CHF", có chỗ "CHF 3,500.00"); bản code chọn cách cuối vì
   đó là cách viết đúng chuẩn và là bản thiết kế mới nhất.

   Mỗi danh hiệu lưu ba dạng:
     amountLabel  '1,500'     — hiển thị ngắn ở thẻ chọn danh hiệu
     amountExact  '1,500.00'  — hiển thị đủ hai số lẻ ở các bảng tóm tắt
     priceAmount  1500        — số thật để tính toán
   ============================================================ */
const ACQUISITION = {
  /* Chỉ thành viên đã được admin duyệt KYC mới mua được danh hiệu — thiết kế không vẽ
     trường hợp chưa duyệt, dải báo này do bản code thêm. */
  kycGate: {
    review:   'Your KYC is in review. You can purchase Titles once it is approved.',
    rejected: 'Your last KYC submission was not approved. Submit your documents again to unlock purchasing.',
    required: 'Complete KYC verification to unlock purchasing.',
    kycLink:  'Go to KYC',
  },
  heading: 'Acquisition & Gifting',
  lead: 'Acquire and assign verified Titles to your entity or gifted partners.',

  stepHeading: 'Select a Title',

  priceLabel: 'Price',
  currency: 'CHF',
  selectLabel: 'Select',
  selectedLabel: 'Selected',

  footerNote: 'Encrypted legal ledger record with automated institutional custody.',
  continueLabel: 'Continue to Recipient →',

  /* Ba danh hiệu và mô tả lấy nguyên từ bản thiết kế. Chú ý: mô tả ở
     đây KHÁC mô tả cùng tên trên landing page — hai chỗ dùng hai bản
     copy khác nhau, không phải chép thiếu. */
  titles: [
    {
      id: 'philanthropist',
      code: 'PHI',
      name: 'Philanthropist',
      description: 'Validates corporate philanthropic stewardship and ESG endowments across verified registries.',
    },
    {
      id: 'investor',
      code: 'INV',
      name: 'Investor',
      description: 'Validates tier-1 syndicate underwriting and strategic co-investment rights worldwide.',
    },
    {
      id: 'bridge',
      code: 'BRG',
      name: 'Bridge',
      description: 'Facilitates multi-lateral corporate deal syndication and verified sovereign node access.',
    },
  ],

  /* Bản thiết kế vẽ Investor đang được chọn sẵn */
  defaultSelectedId: 'investor',

  /* BẢNG GIÁ THEO CLASS (CHF) — theo bảng giá nghiệp vụ, thay cho ba mức cố định 1.500 / 3.500 / 2.500
     của thiết kế. Giá phụ thuộc Class của người MUA (Class 0–7 theo số nhân sự). */
  priceTable: [
    { classIndex: 0, philanthropist: 1000,  bridge: 1500,  investor: 2000  },
    { classIndex: 1, philanthropist: 1500,  bridge: 2000,  investor: 3000  },
    { classIndex: 2, philanthropist: 2000,  bridge: 3000,  investor: 4000  },
    { classIndex: 3, philanthropist: 3000,  bridge: 4500,  investor: 6000  },
    { classIndex: 4, philanthropist: 4500,  bridge: 6500,  investor: 9000  },
    { classIndex: 5, philanthropist: 6500,  bridge: 9500,  investor: 13000 },
    { classIndex: 6, philanthropist: 9000,  bridge: 13000, investor: 18000 },
    { classIndex: 7, philanthropist: 12000, bridge: 18000, investor: 25000 },
  ],
};

/* ============================================================
   Nội dung màn Acquisition & Gifting — Bước 2: chọn người nhận
   ------------------------------------------------------------
   Đo từ hai file trong design/:
     PW — Acquisition & Gifting (Step 2_ Gift to Verified Recipient).png
     PW — Acquisition & Gifting (Step 2_ Gift to Verified Recipient) (2).png

   HAI FILE LÀ CÙNG MỘT MÀN. Cột trái giống hệt nhau, chỉ khác panel
   bên phải. Cả hai biến thể đều được dựng; đổi `summaryVariant` để
   xem bản kia.

   TIỀN TỆ: bản thiết kế mới nhất ghi "CHF 3,500.00" (mã tiền đứng
   trước). File (2) cũ hơn ghi "$3,500.00 CHF" — trộn ký hiệu đô la
   với CHF. Bản code theo bản mới: mã tiền đứng trước, không ký hiệu $.

   Danh sách người nhận là DỮ LIỆU MẪU chép từ bản thiết kế. Prototype
   không có danh bạ thành viên thật.
   ============================================================ */
const RECIPIENT = {
  eyebrow: 'Smart legal title',

  assignHeading: 'Assign Recipient',

  modes: [
    { id: 'self', label: 'For Myself',      icon: 'person' },
    { id: 'gift', label: 'Gift to Someone', icon: 'gift'   },
  ],
  defaultModeId: 'self',

  /* Nhánh "For Myself" — danh hiệu cấp thẳng cho pháp nhân của chính mình.
     Tên pháp nhân KHÔNG nằm ở đây: lấy thật từ tài khoản đã đăng ký. */
  self: {
    heading: 'Recipient: You',
    verifiedNote: '(Already verified)',
    statusLabel: 'KYC verified · Active',
    info: "The title will be directly registered and bound to your organization's digital vault immediately upon settlement. Corporate bylaws attestation is synchronized on-chain.",
    dispatchNote: 'Your vault is provisioned automatically upon settlement.',
    backLabel: '← Back to Title',

    /* Thẻ phụ ở cột phải, chỉ hiện ở nhánh này */
    issued: {
      heading: 'Issued by PW',
      body: 'Delivered to your PW wallet right after payment · Verifiable on-chain · One-time transfer',
    },
  },

  search: {
    placeholder: 'Search verified member, company, or identifier…',
    hint: 'Search by verified member name, company, or institutional identifier.',
    /* Bản thiết kế vẽ ô này đã gõ sẵn "Marcus Vance" và danh bạ hiện luôn
       bên dưới. Bản code KHÔNG điền sẵn: ô bắt đầu trống, danh bạ chỉ hiện
       kết quả khớp sau khi gõ. Đây là ô tìm kiếm thật, không phải ảnh tĩnh. */
    emptyPrompt: 'Type a name, company, or identifier to search the directory.',
    noResults: 'No verified member matches that search.',
    moreNote: 'Showing the first {shown} of {total} matches \u2014 keep typing to narrow it down.',
  },

  directoryLabel: 'Accredited vault directory',

  verifiedLabel: 'Verified',
  unverifiedLabel: 'Not verified',

  recipients: [
    {
      id: 'marcus-vance',
      initials: 'MV',
      name: 'Marcus Vance (Vance Holdings AG)',
      shortName: 'Marcus Vance',
      /* Mã hồ sơ trong sổ đăng ký công khai — danh hiệu được tặng cộng vào thẻ này */
      entityId: 'PW-IND-0402',
      did: 'DID:PW:CH-ZURICH-992014-MV',
      email: 'marcus@vanceholdings.ch',
      uid: 'UID-91028391',
      isVerified: true,
    },
    {
      id: 'elena-rostova',
      initials: 'ER',
      name: 'Elena Rostova (Helios Energy GmbH)',
      shortName: 'Elena Rostova',
      entityId: 'PW-IND-0311',
      did: 'DID:PW:DE-MUNICH-440192-ER',
      email: 'elena@helios.eu',
      uid: 'UID-4401928',
      isVerified: false,
      blockedReason: "Hasn't completed KYC — can't receive a title yet",
    },
  ],
  /* Không chọn sẵn ai — người dùng tự tìm rồi chọn */
  defaultRecipientId: null,

  giftMessage: {
    label: 'Gift message (optional)',
    maxLength: 500,
    /* Bản thiết kế vẽ sẵn một lời nhắn mẫu trong ô. Bản code để TRỐNG —
       người dùng chưa gõ gì thì ô phải trống, giống ô tìm kiếm. */
  },

  dispatchNote: 'Recipient vault provisioning and cryptographic dispatch are handled automatically upon settlement.',

  resetLabel: 'Reset selection',
  continueLabel: 'Continue to Payment →',

  /* ------------------------------------------------------------
     Panel bên phải — hai biến thể từ hai file thiết kế.
     Đổi giá trị này để xem bản kia:
       'registry' → file thứ nhất  (Sovereign Registry Title)
       'preview'  → file thứ hai   (Title Preview / ERC-721L)
     ------------------------------------------------------------ */
  summaryVariant: 'preview',

  /* Biến thể 1 — Sovereign Registry Title */
  registry: {
    heading: 'Sovereign registry title',
    designationLabel: 'Title designation',
    /* Tên danh hiệu + hậu tố này. Bản thiết kế chỉ vẽ "INVESTOR PARTNER"
       nên hậu tố "Partner" là GIẢ ĐỊNH cho hai danh hiệu còn lại. */
    designationSuffix: 'Partner',
    idLabel: 'ID: #PW-2024-99810',
    beneficiaryLabel: 'Beneficiary',
    beneficiaryEmpty: '—',
    rows: [
      { label: 'Jurisdiction',   value: 'Zug, Switzerland' },
      { label: 'Custody type',   value: 'Automated Vault Allocation' },
      { label: 'Settlement tier', value: 'Cryptographic Finality', tone: 'green' },
    ],
    protocolLabel: 'Issuance protocol',
    protocolValue: 'EIP-3643',

    breakdown: {
      heading: 'Settlement breakdown',
      baseSuffix: 'Title — Base',
      feeLabel: 'Protocol Vault Notary Fee',
      feeValue: 'WAIVED (CHF 0.00)',
      totalLabel: 'Total Due',
    },
  },

  /* Biến thể 2 — Title Preview / ERC-721L */
  preview: {
    heading: 'Title preview',
    standard: 'ERC-721L / JURIDICAL',
    series: 'SERIES 2025-A',
    titleLabel: 'Title',
    baseSuffix: 'Title',
    /* Thiết kế vẽ 'Signatories: 2/2 Validated' và 'Immutable' — chưa mint nên bản code đổi sang câu chưa xảy ra (xem README). */
    signatories: 'Signatories validated at issuance',
    immutableLabel: 'Immutable once minted',
    rows: [
      { label: 'On-Chain Vault Notary Fee', value: 'SPONSORED', tone: 'green' },
      { label: 'Network Binding Protocol',  value: '$0.00' },
    ],
    totalLabel: 'Total Due',
  },
};

/* ============================================================
   Nội dung màn Acquisition & Gifting — Bước 3: thanh toán
   ------------------------------------------------------------
   Đo từ design/PW — Acquisition & Gifting (Step 3_ Payment & Settlement).png

   Bản thiết kế vẽ sẵn 500 điểm đã nhập và ô điều khoản đã tích. Bản
   code ĐỂ TRỐNG cả hai — người dùng chưa thao tác thì chưa có gì, giống
   ô tìm kiếm và ô lời nhắn ở bước 2.

   Số tiền trên màn này được TÍNH, không đóng cứng:
     Tổng phải trả = giá danh hiệu − điểm đã dùng
     Điểm thưởng   = 10% số tiền thực trả (quy tắc ghi trong thiết kế)
   ============================================================ */
const PAYMENT = {
  backLabel: '← Back to Dashboard',

  points: {
    heading: 'Points & discount',
    historyLabel: 'View point history',

    discount: {
      label: 'Year-2 loyalty discount (20%)',
      rate: 0.2,
      /* Số năm thành viên tối thiểu — do BA chốt (SRS ghi TBD cách đếm "Year 2") */
      requiredYears: 2,
      /* Ngưỡng điểm tối thiểu: SRS (BR02) ghi TBD — 1,000 PTS là số mẫu của bản demo */
      minPoints: 1000,
      eligibleLabel: 'Eligible',
      statusLabel: 'Not yet eligible',
      eligibleNote: 'Your 20% loyalty discount is applied to this purchase.',
      /* {date} = ngày tròn đủ số năm; {min} / {points} điền lúc chạy */
      waitNote: 'Available from {date} — requires 2 years of membership and a minimum balance of {min} PTS.',
      pointsNote: 'Requires a minimum balance of {min} PTS (you have {points}).',
      dashboardEligible: 'Year-2 discount: eligible now',
      dashboardWait: 'Year-2 discount: eligible from {date}',
    },

    useLabel: 'Use points',
    balanceLabel: 'Available balance:',
    unit: 'PTS',
    /* null nghĩa là nút "Max" — dùng hết mức có thể */
    quickValues: [0, 500, 1000, null],
    maxLabel: 'Max',
    hint: 'Points used here are deducted from your balance after payment succeeds.',
  },

  /* ============================================================
     Khối thanh toán bằng thẻ
     ------------------------------------------------------------
     Thiết kế có bốn trạng thái, xem `design/Html → Body.png`:
       1 Đã chọn thẻ đã lưu   2 Đang thêm thẻ mới
       3 Thẻ nhập sai          4 Chưa có thẻ nào đã lưu

     BẢO MẬT: `savedCards` CỐ Ý không có số thẻ đầy đủ — chỉ thương
     hiệu, bốn số cuối và hạn dùng. Số thẻ người dùng gõ vào chỉ nằm
     trong bộ nhớ của form, không ghi localStorage, không log.
     Để `savedCards: []` là xem được trạng thái 4.
     ============================================================ */
  method: {
    heading: 'Payment method',
    lead: 'Pay by credit or debit card.',

    addLabel: 'Add new card',
    cancelLabel: 'Cancel',
    newCardLabel: 'New card',
    defaultBadge: 'Default',
    setDefaultAction: 'Set as default',
    removeAction: 'Remove',
    addCardAction: 'Add card',
    addCardHint: 'Saves the card without paying.',
    maskLabel: '••••',
    expiryPrefix: 'Expires',

    savedCards: [
      { id: 'visa-4492', brandId: 'visa', brandName: 'Visa', last4: '4492', expiry: '11/28', isDefault: true },
    ],

    fields: {
      number:  { label: 'Card number',   placeholder: '1234 5678 9012 3456' },
      expiry:  { label: 'Expiry date',   placeholder: 'MM / YY' },
      cvc:     { label: 'Security code', placeholder: 'CVC' },
      name:    { label: 'Name on card',  placeholder: 'Name as shown on the card' },
      country: { label: 'Billing country' },
    },
    defaultCountry: 'Switzerland',

    saveLabel: 'Save this card for future purchases',
    setDefaultLabel: 'Set as default payment method',

    brands: [
      { id: 'visa',  label: 'VISA' },
      { id: 'mc',    label: 'MC'   },
      { id: 'amex',  label: 'AMEX' },
    ],

    securityNote: 'Payments are processed securely by our payment provider. PW never stores your full card number.',

    errors: {
      numberRequired: 'Please enter the card number.',
      numberInvalid:  "This card number isn't valid. Please check the digits and try again.",
      expiryRequired: 'Please enter the expiry date.',
      expiryInvalid:  'Please enter the expiry date as MM / YY.',
      expired:        'This card has expired. Please use a different card.',
      cvcInvalid:     'Please enter the 3 or 4 digit security code.',
      nameRequired:   'Please enter the name shown on the card.',
    },
  },

  billing: {
    heading: 'Billing details',
    modifyLabel: 'Modify entity',
    statusLabel: 'KYC verified',
    /* Thiết kế vẽ địa chỉ San Francisco + Tax ID US-EIN + LEI; bản code suy ra từ tài khoản (xem billingDetailsOf trong app.js) */
    /* Hệ thống không thu địa chỉ, nên dùng ĐỊA CHỈ MẪU (bịa, chỉ để demo) theo quốc gia đã đăng ký;
       quốc gia không có trong bảng thì chỉ hiện tên quốc gia. Mã số lấy từ số giấy tờ đã nộp ở bước KYC. */
    idLabelCompany: 'Registry no.',
    idLabelIndividual: 'Document no.',
    sampleAddresses: {
      'United States':        '350 Harbor Street, Suite 2100, New York, NY 10001',
      'United Kingdom':       '22 Bishopsgate Court, Level 14, London EC2N 4BQ',
      'Switzerland':          'Bahnhofstrasse 45, 8001 Zürich',
      'Singapore':            '1 Raffles Quay, #20-01, Singapore 048583',
      'Germany':              'Friedrichstraße 68, 10117 Berlin',
      'France':               '15 Rue de la Paix, 75002 Paris',
      'Netherlands':          'Herengracht 280, 1016 BX Amsterdam',
      'Japan':                '1-9-2 Marunouchi, Chiyoda-ku, Tokyo 100-0005',
      'South Korea':          '152 Teheran-ro, Gangnam-gu, Seoul 06236',
      'Australia':            '100 Harbour Avenue, Sydney NSW 2000',
      'Canada':               '200 Bay Street, Suite 3200, Toronto, ON M5J 2J2',
      'United Arab Emirates': 'Level 12, Gate Avenue, DIFC, Dubai',
      'Viet Nam':             '72 Le Thanh Ton, District 1, Ho Chi Minh City',
      'Estonia':              'Pärnu mnt 12, 10148 Tallinn',
      'Norway':               'Karl Johans gate 25, 0159 Oslo',
    },

    terms: {
      before: 'I agree to the ',
      issuanceLink: 'Title Issuance Terms',
      between: ' and the ',
      custodyLink: 'Legal Custody Agreement',
      after: '.',
    },
  },

  summary: {
    heading: 'Order Summary',
    orderId: '#PW-2025-INV-99810',
    targetLabel: 'Acquisition target',
    beneficiaryLabel: 'Beneficiary recipient',
    verifiedLabel: 'Verified entity',
    escrowLabel: 'Escrow Allocation Lock',
    escrowValue: '100% Guaranteed',

    priceLabel: 'Title price',
    discountLabel: 'Year-2 discount (20%)',
    discountValue: '— (Not eligible)',
    discountAppliedPrefix: '-',
    pointsLabel: 'Points used',
    feeLabel: 'Registration & custody fee',
    feeValue: 'Waived',

    totalLabel: 'Settlement total',
    totalNote: 'Net due upon submission',

    reward: {
      /* Thưởng chia đều ba phần, mỗi phần 10% số tiền thực trả: người mua · người nhận · hệ thống
         (phần hệ thống không hiển thị). Mua cho chính mình thì chỉ có một phần của người dùng. */
      rate: 0.1,
      note: '10% of the amount paid to buyer and to recipient.',
      selfNote: '10% of the amount paid.',
    },

    payLabel: 'Pay & issue Title',
    footnote: '256-bit encrypted settlement · Escrow guaranteed',
  },

  desk: {
    label: 'Dedicated desk',
    body: 'Need wire assistance or split-signatory approvals?',
    linkLabel: 'Contact Institutional Vault Desk.',
  },
};

/* ============================================================
   Nội dung màn kết quả sau khi thanh toán
   ------------------------------------------------------------
   Đo từ design/PW — Acquisition Outcome (Issuing Title).png

   Màn này ĐỨNG RIÊNG: không có thanh bên, không có thanh trên.

   Bản thiết kế vẽ trạng thái ĐANG PHÁT HÀNH (bước 2 chạy dở), không
   phải trạng thái đã xong. Bản code dựng đúng trạng thái đó và DỪNG
   ở đấy — prototype không có chuỗi khối thật để chạy tiếp, và màn
   "đã phát hành xong" chưa được vẽ.
   ============================================================ */
const OUTCOME = {
  brand: 'PW • Business recognition',
  stateLabel: 'Issuing title',

  heading: 'Payment received — issuing your title',
  lead: "Your payment has settled. We're minting the title certificate on-chain and depositing it into the recipient's vault. This usually takes under a minute.",

  steps: [
    {
      status: 'done',
      title: 'Payment settled',
      note: 'Verified instant settlement via Escrow Rails',
      statusLabel: 'Completed',
    },
    {
      status: 'active',
      title: 'Minting Title',
      note: 'Generating immutable smart title cryptographic title',
      badge: 'ERC-3643',
    },
    {
      status: 'queued',
      title: 'Depositing to recipient vault',
      note: 'Delivery into authenticated custodian registry',
      statusLabel: 'Queued',
    },
  ],

  labels: {
    title: 'Title',
    beneficiary: 'Beneficiary',
    reference: 'Reference ID',
    timestamp: 'Timestamp',
    amount: 'Amount paid',
    allocation: 'Allocation',
    specification: 'Specification',
  },
  copyLabel: 'Copy reference ID',
  allocationSuffix: 'credited to syndicate reserve',
  specification: 'ERC-3643 · Institutional Permissioned Title',

  notice: "You can safely leave this page — you'll be notified when issuance completes.",
  issuingLabel: 'Issuing…',
  dashboardLabel: 'Go to Dashboard',
  footnote: 'Encrypted legal ledger record with automated institutional custody.',

  strip: {
    status: 'Status: Encrypted // TLS 1.3',
    jurisdiction: 'Jurisdiction: Delaware VIP',
  },

  /* ============================================================
     Trạng thái ĐÃ PHÁT HÀNH XONG
     ------------------------------------------------------------
     Đo từ `design/PW — Acquisition Outcome (Issuing Title - success).png`.
     Cùng một màn với trạng thái đang phát hành, chỉ đổi nội dung —
     vì vậy để chung trong OUTCOME chứ không tách tuyến riêng.
     ============================================================ */
  success: {
    stateLabel: 'Issued',
    heading: 'Your Title is in your wallet',
    /* Tên danh hiệu chèn vào giữa hai đoạn này */
    leadBefore: '',
    leadAfter: ' has been issued on-chain and deposited into your PW wallet.',
    /* Bản code — mua để TẶNG: danh hiệu thuộc về người nhận, không vào ví của người mua. {recipient} điền lúc chạy. */
    giftLeadAfter: ' has been issued on-chain and deposited into {recipient}’s PW vault.',
    giftHeading: 'Your gift has been delivered',
    giftSteps: [
      { status: 'done', title: 'Payment settled',            statusLabel: 'Done' },
      { status: 'done', title: 'Title issued on-chain',      badge: 'ERC-3643'  },
      { status: 'done', title: 'Deposited to recipient’s vault', statusLabel: 'Done' },
    ],
    giftWalletName: 'Recipient’s PW vault',
    giftWalletMeta: 'Delivered to the recipient',

    steps: [
      { status: 'done', title: 'Payment settled',      statusLabel: 'Done' },
      { status: 'done', title: 'Title issued on-chain', badge: 'ERC-3643'  },
      { status: 'done', title: 'Deposited to your wallet', statusLabel: 'Done' },
    ],

    labels: {
      title:    'Title',
      owner:    'Owner',
      wallet:   'Wallet',
      titleId:  'Title ID',
      issuedOn: 'Issued on',
      amount:   'Amount paid',
      points:   'Points earned',
      recipientPoints: 'Recipient earns',
      ranking:  'Ranking',
    },
    walletName: 'PW wallet',
    walletMeta: 'Managed by Circle',
    copyWalletLabel: 'Copy wallet address',
    copyTitleIdLabel: 'Copy Title ID',
    pointsSuffix: 'added to your balance',
    rankingLabel: 'Counts toward ranking',

    /* "View on-chain" nằm ngay trong dòng Title ID, không phải nút riêng */
    onchainLabel: 'View on-chain',

    dashboardLabel: 'Go to Dashboard',
  },

  /* ============================================================
     Mục dashboard sinh ra sau khi phát hành xong
     ============================================================ */
  issuedTitle: {
    kind: 'distinction',

    /* Ví nhận danh hiệu mới — khớp `id` trong DASHBOARD.demoProfile.wallets */
    walletId: 'pw-custodial',

    /* Mã danh hiệu sinh ra: #PW-2026-<mã>-<số>. Số chạy từ đây.
       GIẢ ĐỊNH cho bản demo, không phải quy tắc đánh số thật. */
    serialBase: 41207,

    /* Mỗi danh hiệu được tính đẩy thứ hạng lên bấy nhiêu bậc.
       GIẢ ĐỊNH cho bản demo — thứ hạng thật còn phụ thuộc người khác. */
    rankGainPerTitle: 2,

    pills: [
      { label: 'PW wallet' },
    ],
    detailPrefix: 'ERC-3643 · Issued',
    detailSuffix: '· Transfer available (one-time)',
    primaryAction: 'Transfer',
    secondaryAction: 'View on-chain',
  },

  /* Bản code — dòng Recent activity của người mua khi tặng danh hiệu */
  receivedActivity: {
    title: 'Title received',
    state: { label: 'Settled', tone: 'green' },
    middle: ') received as a gift from ',
  },

  giftedActivity: {
    title: 'Title gifted',
    state: { label: 'Settled', tone: 'green' },
    middle: ') gifted to ',
  },

  issuedActivity: {
    title: 'Title issued',
    state: { label: 'Settled', tone: 'green' },
    middle: ') issued on-chain and deposited to ',
    walletLabel: 'PW wallet',
  },
};

/* ============================================================
   MÀN PUBLIC DIRECTORY
   ------------------------------------------------------------
   Đo từ `design/PW — Public Directory - Log in.png`.

   Ba pháp nhân dưới đây là TOÀN BỘ dữ liệu mẫu trong bản thiết kế.
   Bốn ô số liệu phía trên ghi con số lớn hơn nhiều (318 pháp nhân) —
   đó là số liệu mẫu của bản thiết kế, không khớp với ba thẻ. Giữ
   nguyên cả hai, không tự bịa thêm pháp nhân cho khớp.
   ============================================================ */
const DIRECTORY = {
  tag: 'Institutional Public Access Registry',
  heading: 'Public Directory',
  lead: 'Search and cryptographically verify all issued PW business partnership titles, corporate entities, and verified leaders without requiring login credentials.',

  searchPlaceholder: 'Search by entity name, company, or Title ID…',
  searchLabel: 'Search the directory',

  sortLabel: 'Sort by:',
  /* Bản thiết kế chỉ vẽ một giá trị "Highest Ranking". Các lựa chọn còn lại là GIẢ ĐỊNH. "Most Titles" đã bỏ vì
     hạng chính là xếp theo số NFT nên trùng hẳn với "Highest Ranking". */
  sortOptions: [
    { id: 'rank',     label: 'Highest Ranking' },
    { id: 'rankLow',  label: 'Lowest Ranking'  },
    { id: 'name',     label: 'Name (A–Z)'      },
    { id: 'nameDesc', label: 'Name (Z–A)'      },
  ],
  defaultSortId: 'rank',

  filterLabel: 'Title:',
  filters: [
    { id: 'all',            label: 'All Titles'     },
    { id: 'Investor',       label: 'Investor'       },
    { id: 'Philanthropist', label: 'Philanthropist' },
    { id: 'Bridge',         label: 'Bridge'         },
  ],
  defaultFilterId: 'all',

  stats: [
    {
      label: 'Titles issued',
      value: '1,482',
      suffix: 'Active',
      suffixTone: 'green',
      note: 'Synchronized to Global Registry',
    },
    {
      label: 'Accredited entities',
      value: '318',
      valueTone: 'blue',
      suffix: '14 Jurisdictions',
      note: 'Verified AML / Legal Finality',
    },
    {
      label: 'Public verifications (24h)',
      value: '4,892',
      valueTone: 'purple',
      suffix: '+18% today',
      suffixTone: 'green',
      note: 'Cryptographic zero-knowledge queries',
    },
    {
      label: 'Protocol trust health',
      value: '100%',
      valueTone: 'green',
      suffix: 'Immutable',
      suffixTone: 'green',
      note: 'Zero unresolved disputes',
    },
  ],

  rankPrefix: 'Rank',
  totalLabel: 'NFTs owned',
  locationLabel: 'Location',
  profileLabel: 'View profile',

  typeLabels: { company: 'Company', individual: 'Individual' },

  /* Dòng "12 Titles · 2 Awards" dưới ô số liệu của mỗi thẻ */
  countsLabel: {
    titles: { one: 'Title', many: 'Titles' },
    awards: { one: 'Award', many: 'Awards' },
  },

  /* Phân trang: 6 thẻ mỗi trang. Số trang, nút trang và tổng số đều tính theo dữ liệu
     đang hiển thị (318 pháp nhân → 53 trang, cộng thêm tài khoản đăng ký thì nhiều hơn). */
  pagination: {
    pageSize: 6,
    showingLabel: 'Showing {from}–{to} of {total}',
    gapLabel: '…',
    prevLabel: 'Previous page',
    nextLabel: 'Next page',
  },

  entities: [
    {
      id: 'PW-ORG-0081',
      name: 'Aurelia Capital',
      type: 'company',
      sealTone: 'amber',
      rank: 1,
      mintedTitles: 14,
      titleCount: 12,
      awardCount: 2,
      location: 'Geneva, CH',
      titles: ['Investor', 'Philanthropist', 'Bridge'],
      /* tone = màu vầng sáng ở góc thẻ; sealTone = màu con dấu. Thiết kế
         cho hai màu này khác nhau ở vài thẻ, đều thuần thẩm mỹ. */
      tone: 'blue',
    },
    {
      id: 'PW-ORG-0144',
      name: 'Lancaster Holdings Ltd',
      type: 'company',
      sealTone: 'blue',
      rank: 2,
      mintedTitles: 9,
      titleCount: 8,
      awardCount: 1,
      location: 'London, UK',
      titles: ['Investor', 'Philanthropist'],
      tone: 'purple',
    },
    {
      id: 'PW-ORG-0299',
      name: 'Horizon Capital Europe',
      type: 'company',
      sealTone: 'green',
      rank: 3,
      mintedTitles: 7,
      titleCount: 7,
      awardCount: 0,
      location: 'Frankfurt, DE',
      titles: ['Bridge'],
      tone: 'green',
    },
    {
      id: 'PW-IND-0311',
      name: 'Elena Rostova',
      type: 'individual',
      sealTone: 'purple',
      rank: 4,
      mintedTitles: 6,
      titleCount: 5,
      awardCount: 1,
      location: 'Zurich, CH',
      titles: ['Philanthropist'],
      tone: 'blue',
    },
    {
      id: 'PW-ORG-0388',
      name: 'Nordline Partners AG',
      type: 'company',
      sealTone: 'blue',
      rank: 5,
      mintedTitles: 6,
      titleCount: 6,
      awardCount: 0,
      location: 'Basel, CH',
      titles: ['Investor', 'Bridge'],
      tone: 'purple',
    },
    {
      id: 'PW-IND-0402',
      name: 'Marcus Vance',
      type: 'individual',
      sealTone: 'green',
      rank: 6,
      mintedTitles: 5,
      titleCount: 4,
      awardCount: 1,
      location: 'Zurich, CH',
      titles: ['Investor'],
      tone: 'green',
    },
    /* ---- Trang 2 của Public Directory (design/PW — Public Verification Directory - 2.png).
       Sáu thẻ của trang 2: năm pháp nhân dưới đây và thẻ của tài khoản đã đăng ký (hạng #12,
       dựng trong readRegistryEntities). ---- */
    {
      id: 'PW-ORG-0455',
      name: 'Meridian Trust Group',
      type: 'company',
      sealTone: 'green',
      rank: 7,
      mintedTitles: 5,
      titleCount: 4,
      awardCount: 1,
      location: 'Singapore',
      titles: ['Investor', 'Bridge'],
      tone: 'blue',
    },
    {
      id: 'PW-ORG-0478',
      name: 'Castellan Partners',
      type: 'company',
      sealTone: 'amber',
      rank: 8,
      mintedTitles: 5,
      titleCount: 5,
      awardCount: 0,
      location: 'Luxembourg',
      titles: ['Investor', 'Philanthropist'],
      tone: 'purple',
    },
    {
      id: 'PW-ORG-0491',
      name: 'Brightwater Capital',
      type: 'company',
      sealTone: 'blue',
      rank: 9,
      mintedTitles: 5,
      titleCount: 5,
      awardCount: 0,
      location: 'Dublin, IE',
      titles: ['Bridge'],
      tone: 'green',
    },
    {
      id: 'PW-ORG-0508',
      name: 'Solaris Ventures',
      type: 'company',
      sealTone: 'amber',
      rank: 10,
      mintedTitles: 5,
      titleCount: 4,
      awardCount: 1,
      location: 'Lisbon, PT',
      titles: ['Philanthropist'],
      tone: 'blue',
    },
    {
      id: 'PW-ORG-0526',
      name: 'Fjordmark Holdings',
      type: 'company',
      sealTone: 'blue',
      rank: 11,
      mintedTitles: 5,
      titleCount: 5,
      awardCount: 0,
      location: 'Oslo, NO',
      titles: ['Investor', 'Bridge'],
      tone: 'purple',
    },
  ],

  /* Màu pill theo danh hiệu, dùng lại đúng ba màu của bảng màu .dash */
  titleTones: { Investor: 'blue', Philanthropist: 'purple', Bridge: 'green' },

  /* Không có kết quả vì bộ lọc — khác với sổ đăng ký rỗng hẳn */
  noMatch: {
    heading: 'No entity matches',
    body: 'Try a different name, company, or Title ID — or clear the title filter.',
    action: 'Clear filters',
  },

  /* Trạng thái rỗng, bật bằng nút "Test Empty" */
  empty: {
    heading: 'No entities published yet',
    body: 'Accredited entities appear here once their first Title is issued and synchronized to the global registry.',
  },
};

/* ============================================================
   PHẦN CÒN LẠI CỦA SỔ ĐĂNG KÝ — 318 pháp nhân, 1.482 danh hiệu
   ------------------------------------------------------------
   Thiết kế ghi 318 pháp nhân / 1.482 danh hiệu / 14 thẩm quyền nhưng chỉ vẽ sáu
   thẻ. Mười một pháp nhân ở trên là dữ liệu mẫu; Apex (tài khoản dựng sẵn, 4 NFT)
   và 306 pháp nhân sinh ở đây. Tổng = 11 + 1 + 306 = 318 pháp nhân. Số NFT rải theo đuôi dài từ 5 xuống 0 (bảng REGISTRY_SPREAD) nên tổng
   KHÔNG còn là 1.482 như thiết kế vẽ — các ô số liệu tính trực tiếp từ sổ. Tên, mã, nơi đặt trụ sở đều BỊA, sinh cố định
   (không ngẫu nhiên giữa các lần tải) nên số liệu không nhảy.
   Hạng xếp theo số NFT (nhiều hơn thì hạng cao hơn). Sáu hạng đầu là số của thiết kế
   (14, 9, 7, 6, 6, 5) nên mọi hạng sau đó tối đa 5 NFT. Tài khoản đăng ký mới (ví dụ Nova) được cộng thêm vào các con số này.
   ============================================================ */
const REGISTRY_TOTALS = { entities: 318 };

/* Số pháp nhân sinh thêm theo số NFT (5 → 0), tổng 306. Cộng 72 NFT của mười một pháp nhân mẫu và 4 NFT của Apex. */
const REGISTRY_SPREAD = [
  { titles: 5, entities: 40 },
  { titles: 4, entities: 55 },
  { titles: 3, entities: 70 },
  { titles: 2, entities: 60 },
  { titles: 1, entities: 45 },
  { titles: 0, entities: 36 },
];

/* Mười bốn thẩm quyền: tám nước đã có ở mười một pháp nhân mẫu + sáu nước thêm vào. */
const REGISTRY_CITIES = [
  'Geneva, CH', 'Zurich, CH', 'Basel, CH', 'London, UK', 'Manchester, UK', 'Frankfurt, DE', 'Munich, DE',
  'Singapore, SG', 'Luxembourg, LU', 'Dublin, IE', 'Lisbon, PT', 'Oslo, NO',
  'New York, US', 'Austin, US', 'Dubai, AE', 'Hong Kong, HK', 'Tokyo, JP', 'Paris, FR', 'Amsterdam, NL',
];

/* Mã thẩm quyền của nơi đặt trụ sở (cho ô "Jurisdictions"). */
const COUNTRY_CODES = {
  'United States': 'US', 'United Kingdom': 'UK', 'Switzerland': 'CH', 'Singapore': 'SG', 'Germany': 'DE',
  'France': 'FR', 'Netherlands': 'NL', 'Japan': 'JP', 'South Korea': 'KR', 'Australia': 'AU',
  'Canada': 'CA', 'United Arab Emirates': 'AE', 'Viet Nam': 'VN', 'Estonia': 'EE', 'Norway': 'NO',
};
const LOCATION_WITHOUT_CODE = { Singapore: 'SG', Luxembourg: 'LU' };

function jurisdictionOf(location) {
  const match = /,\s*([A-Z]{2})$/.exec(location);
  return match ? match[1] : (LOCATION_WITHOUT_CODE[location] ?? COUNTRY_CODES[location] ?? location);
}

const REGISTRY_FILLER = (() => {
  const prefixes = ['Alder', 'Brightwell', 'Cobalt', 'Delmar', 'Ember', 'Fairhaven', 'Granite', 'Halden', 'Ivory', 'Juniper',
    'Kestrel', 'Lumen', 'Northgate', 'Onyx', 'Pinecrest', 'Quill', 'Redwood', 'Solace', 'Tidewater', 'Umber',
    'Verity', 'Westmark', 'Yarrow', 'Zephyr', 'Arbor', 'Beacon', 'Crestline', 'Dunmore', 'Everly', 'Foxglove',
    'Gable', 'Harbor', 'Iron', 'Jasper', 'Kingsley', 'Larch', 'Marlow', 'Nimbus', 'Orchard', 'Pelham'];
  const suffixes = ['Capital', 'Holdings', 'Partners', 'Group', 'Ventures', 'Trust', 'Advisors', 'Industries', 'Logistics', 'Energy',
    'Maritime', 'Labs', 'Foods', 'Realty', 'Bancorp', 'Mining', 'Networks', 'Biotech', 'Aerospace', 'Media'];
  const forms = ['', '', 'AG', 'Ltd', 'SA', 'LLC', 'Inc.', 'NV', 'GmbH', 'PLC'];
  const firstNames = ['Anna', 'Benedict', 'Chloe', 'Daniel', 'Elise', 'Felix', 'Greta', 'Hugo', 'Iris', 'Jonas',
    'Kira', 'Leon', 'Maya', 'Nikolai', 'Olivia', 'Pavel', 'Rosa', 'Stefan', 'Tessa', 'Viktor'];
  const lastNames = ['Adler', 'Bauer', 'Chen', 'Duval', 'Eriksen', 'Fischer', 'Garnier', 'Hartmann', 'Ivanov', 'Jensen',
    'Keller', 'Laurent', 'Moretti', 'Novak', 'Okafor', 'Petrov', 'Quinn', 'Rossi', 'Sato', 'Weber'];

  // Bộ sinh số giả ngẫu nhiên cố định (mulberry32) — cùng hạt giống thì luôn ra cùng dãy.
  let seed = 318482;
  const random = () => {
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const taken = new Set([...DIRECTORY.entities.flatMap((entity) => [entity.name, entity.id]), 'PW-ORG-0412']);
  const count = REGISTRY_TOTALS.entities - DIRECTORY.entities.length - 1; // trừ Apex
  // Số NFT giảm dần ĐÚNG THEO HẠNG (ít NFT hơn thì hạng thấp hơn): 5, 4, 3, 2, 1 rồi 0.
  const counts = REGISTRY_SPREAD.flatMap(({ titles, entities }) => Array(entities).fill(titles));
  if (counts.length !== count) throw new Error(`REGISTRY_SPREAD must describe ${count} entities, got ${counts.length}`);

  const pick = (list) => list[Math.floor(random() * list.length)];
  const tones = ['blue', 'purple', 'green'];
  const seals = ['blue', 'purple', 'green', 'amber'];
  const distinctions = ['Investor', 'Philanthropist', 'Bridge'];

  return counts.map((mintedTitles, i) => {
    const isIndividual = i % 6 === 5;
    let name;
    do {
      name = isIndividual
        ? `${pick(firstNames)} ${pick(lastNames)}`
        : `${pick(prefixes)} ${pick(suffixes)}${(() => { const f = pick(forms); return f ? ` ${f}` : ''; })()}`;
    } while (taken.has(name));
    taken.add(name);

    let id;
    do { id = `PW-${isIndividual ? 'IND' : 'ORG'}-${String(100 + Math.floor(random() * 900)).padStart(4, '0')}`; }
    while (taken.has(id));
    taken.add(id);

    const awardCount = mintedTitles > 2 && random() < 0.18 ? 1 : 0;
    const shown = distinctions.filter(() => random() < 0.55);
    return {
      id,
      name,
      type: isIndividual ? 'individual' : 'company',
      sealTone: pick(seals),
      rank: 13 + i,
      mintedTitles,
      titleCount: mintedTitles - awardCount,
      awardCount,
      location: pick(REGISTRY_CITIES),
      titles: mintedTitles ? (shown.length ? shown : [pick(distinctions)]) : [],
      tone: pick(tones),
      isGenerated: true, // pháp nhân sinh thêm: chưa có hồ sơ công khai cho tới khi nhận award / quà
    };
  });
})();

DIRECTORY.entities.push(...REGISTRY_FILLER);


/* ============================================================
   MÀN HỒ SƠ CÔNG KHAI CỦA PHÁP NHÂN (Verified Entity Dossier)
   ------------------------------------------------------------
   Đo từ design/PW — Public Directory - Log in 2.png.
   Vào bằng nút "View Public Profile" ở Public Directory.

   DOSSIERS tra theo MÃ PHÁP NHÂN. Thiết kế chỉ vẽ MỘT pháp nhân
   (PW-ORG-0081 — Aurelia Capital) nên ở đây chỉ có một mục. Hai
   pháp nhân còn lại trong DIRECTORY chưa có nội dung nào được
   thiết kế, và dự án không tự bịa dữ liệu — nút của chúng vẫn
   giữ hình thức nhưng chưa dẫn đi đâu. Thêm một mục vào đây là
   màn hình tự chạy cho pháp nhân đó.

   Chữ dùng chung cho mọi pháp nhân nằm ở DOSSIER; chữ riêng của
   từng pháp nhân nằm trong DOSSIERS[mã].
   ============================================================ */

const DOSSIER = {
  backLabel: 'Return to Public Directory',

  crumbLabel: 'Verified Entity Dossier',
  shareLabel: 'Share Dossier',
  copiedLabel: 'Link copied',

  idPrefix: 'ID:',
  leiPrefix: 'LEI:',
  rankPrefix: 'Rank',
  custodyLabel: 'Custody verification',

  awards: {
    heading: 'Awards from PW',
    lead: 'Titles granted by PW to honor this partner',
    /* Đếm theo số thẻ thật, không đóng cứng */
    countSuffix: { one: 'award', many: 'awards' },
    grantedLabel: 'Granted',
    sourcePill: 'Awarded by PW',
    refPrefix: 'Ref',
    verifyLabel: 'Verify on-chain',
  },

  titles: {
    heading: 'Verified Titles',
    standardLabel: 'Standard: ERC-3643 Permissioned',
    statusLabel: 'Active & in good standing',
    tokenLabel: 'Token ID',
    standardPill: 'ERC-3643 Permissioned',
    issueDateLabel: 'Issue date',
    authorityLabel: 'Issuing authority',
    hashLabel: 'Hash:',
    verifyLabel: 'Verify on-chain',
    /* {total} được thay bằng tổng số danh hiệu của pháp nhân lúc dựng */
    showAllLabel: 'Show all {total} Titles',
  },
};

/* Dữ liệu mẫu của từng pháp nhân — chép đúng bản thiết kế.
   Mã LEI, mã token và mã băm đều là dữ liệu mẫu. */
const DOSSIERS = {
  'PW-ORG-0081': {
    lei: '5493006M7XYZ88K12089',
    location: 'Geneva / Zurich · Switzerland',
    statusPill: 'KYC verified',
    custodyValue: 'Fully Attested',

    stats: [
      { label: 'Total minted titles', value: '14',   suffix: 'Titles (active)', suffixTone: 'green', icon: 'hexagon',  iconTone: 'blue'   },
      { label: 'Cap table standing',  value: '100%', suffix: 'Good standing',   valueTone: 'green',  icon: 'pieChart', iconTone: 'green'  },
      /* isText: giá trị là câu chữ chứ không phải con số — nhẹ và nhỏ hơn */
      { label: 'Primary title', value: 'Investor & Bridge Leader', isText: true, icon: 'rosette',  iconTone: 'purple' },
      { label: 'Member since',        value: 'September 2024',           isText: true, icon: 'calendar', iconTone: 'ink'    },
    ],

    awards: [
      {
        name: 'Philanthropist',
        kind: 'Awarded Title',
        granted: 'Mar 2026',
        citation: 'Conferred for sustained cross-border philanthropic leadership and endowment of verified ESG initiatives.',
        ref: '#PW-AWD-1042',
      },
      {
        name: 'Bridge',
        kind: 'Awarded Title',
        granted: 'Nov 2025',
        citation: 'Recognized for facilitating multilateral corporate alliances and strategic cross-border deal syndication.',
        ref: '#PW-AWD-0917',
      },
    ],

    /* Tổng số danh hiệu của pháp nhân — trang bày sáu cái đầu, nút "Show all" mở hết và đếm theo
       con số này. Khớp với thẻ ở Public Directory. Thiết kế chỉ vẽ hai thẻ đầu; mười thẻ còn lại là
       dữ liệu mẫu sinh ở `withSampleDossierTitles` (app.js). */
    titleCount: 12,

    titles: [
      {
        tone: 'blue',
        name: 'Investor',
        tokenId: '#PW-2025-INV-99810',
        issueDate: 'September 22, 2026',
        authority: 'PW',
        hash: '0X82F…A1C9',
      },
      {
        /* Thiết kế ghi tên "Bridge" nhưng mã token vẫn là PHI (Philanthropist)
           — chữ sót lại từ bản trước. Giữ nguyên cả hai như thiết kế vẽ. */
        tone: 'purple',
        name: 'Bridge',
        tokenId: '#PW-2025-PHI-10492',
        issueDate: 'August 15, 2026',
        authority: 'PW',
        hash: '0X47E…C5D2',
      },
    ],
  },
};


/* ============================================================
   MÀN ADMIN PORTAL — KYC REVIEW
   ------------------------------------------------------------
   Đo từ design/PW — Admin Portal (KYC Review).png.
   Tuyến #/admin, chỉ tài khoản admin vào được.

   TÀI KHOẢN ADMIN DỰNG SẴN
   ------------------------------------------------------------
   Khác tài khoản thành viên: thành viên phải đăng ký mới có, còn
   admin có sẵn trong file này để demo luồng duyệt KYC.

   Mật khẩu gốc KHÔNG nằm ở đây — giống tài khoản thành viên, chỉ
   lưu salt và chuỗi dẫn xuất PBKDF2 (SHA-256, 100.000 vòng). Đổi
   mật khẩu admin thì phải dẫn xuất lại cặp này, xem web/README.md.

   Đây KHÔNG phải phân quyền thật: toàn bộ kiểm tra chạy phía trình
   duyệt, ai mở DevTools cũng sửa được. Chỉ đủ để demo hai vai.
   ============================================================ */

const ADMIN_ACCOUNT = {
  email: 'admin@gmail.com',
  saltHex: '0c7c69bc06fcdb4eae761e3e5411db30',
  passwordHashHex: 'ece9b5d3404a01851357701ed06308e11106ad45cb7c562f4f3c73474152251c',
  /* Tên và ví hiện ở đáy thanh bên, chép đúng bản thiết kế */
  name: 'Admin · Sarah Chen',
  walletLabel: '0x9F4C…B281',
};

/* Tài khoản thành viên dựng sẵn: Apex, đã qua KYC và đã có 4 NFT (hồ sơ mẫu ở
   DASHBOARD.demoProfile). Cùng cách lưu như admin — chỉ salt + chuỗi dẫn xuất.
   Cùng tồn tại với tài khoản người dùng tự đăng ký (ví dụ Nova). */
const DEMO_MEMBER_ACCOUNT = {
  accountType: 'company',
  legalName: 'Apex Global Syndicate Inc.',
  representative: 'Alexander Wright',
  email: 'apex@gmail.com',
  country: 'Switzerland',
  headcountBracketId: '501-1000',
  classIndex: 4,
  kycStatus: 'approved',
  kycSubmittedAt: '2026-05-17T19:20:00.000Z',
  kycDecidedAt: '2026-05-18T11:00:00.000Z',
  kycResultSeen: true,
  createdAt: '2026-05-17T18:00:00.000Z',
  saltHex: '6ea1d470a68aa59281ce050ebc2a653d',
  passwordHashHex: 'f11cee0dfe985673494445f56b009be95f4bddec996501c5f21c39afa997ae25',
};

const ADMIN = {
  topbarLabel: 'Admin',

  /* Thanh bên của admin chỉ có hai mục — thiết kế không vẽ Member
     Dashboard hay Acquisition & Gifting cho vai này. */
  nav: [
    { label: 'Public Directory', icon: 'book',        route: '#/directory' },
    { label: 'Admin Portal',     icon: 'shieldUser',  route: '#/admin'     },
  ],

  heading: 'Administrative Gateway',
  lead: 'Institutional jurisdiction ledger. Review entity accreditations, mint non-transferable titles, resolve stake allocation disparities, and enforce immutable governance revocations.',

  pending: {
    label: 'Pending actions',
    /* Đếm theo số dòng thật trong hàng đợi, không đóng cứng */
    valueSuffix: { one: 'Entity Review', many: 'Entity Reviews' },
  },

  modules: {
    heading: 'Administrative modules',
    /* Mục 1 và 2 đã có thiết kế; ba mục còn lại giữ hình thức, bấm
       không đi đâu. Xem README. */
    items: [
      { label: '1. KYC Review',    icon: 'userCheck', route: '#/admin'       },
      { label: '2. Grant Award',   icon: 'medal',     route: '#/admin-award' },
      { label: '3. Adjust Points', icon: 'sliders',   route: '#/admin-points' },
      { label: '4. Revoke NFT',    icon: 'gavel',     route: '#/admin-revoke', tone: 'danger' },
      { label: '5. Audit Logs',    icon: 'receipt',   route: '#/admin-audit' },
    ],
  },

  activity: {
    pill: 'Active',
    stats: [
      /* Không có `value`: số này tính từ sổ đăng ký, cùng con số với ô Titles issued ở Public Directory. */
      { label: 'Titles issued', countsIssued: true },
      { label: 'Revocations',   value: '3', tone: 'red', countsRevoked: true },
    ],
  },

  queue: {
    heading: 'Accreditation & KYC Queue',
    lead: 'Review identity documents and confirm the Class before members can buy or receive NFTs',
    filterLabel: 'Enterprise Only',
    refreshLabel: 'Refresh the queue',
    columns: ['Entity / legal name', 'Type', 'Submitted', 'Supporting documents'],
    viewLabel: 'View',

    /* Dữ liệu mẫu của bản thiết kế. Ba pháp nhân này KHÔNG trùng với
       sổ đăng ký công khai — hàng đợi là hồ sơ chờ duyệt, chưa lên
       sổ. Mốc thời gian cũng là chữ cố định trong thiết kế. */
    rows: [
      {
        /* Chỉ dòng này có hồ sơ chi tiết được thiết kế */
        reviewId: 'vance-holdings-sa',
        name: 'Vance Holdings SA',
        registry: 'CHE-391.204.992',
        place: 'Zurich',
        type: 'Enterprise',
        ago: '12 Mins Ago',
        submittedAt: '29 Sep 2026, 16:48',
        document: 'Incorporation_DE.pdf',
      },
      {
        name: 'Helios Clean Energy LP',
        registry: 'DEL-8839-441',
        place: 'United States',
        type: 'Enterprise',
        ago: '1 Hour Ago',
        submittedAt: '29 Sep 2026, 15:48',
        document: 'Tax_Cert_2024.pdf',
      },
      {
        name: 'Astris Family Office',
        registry: 'SGP-99210-LLC',
        place: 'Singapore',
        type: 'Enterprise',
        ago: 'Yesterday',
        submittedAt: '28 Sep 2026, 10:05',
        document: 'Attestation_SG.pdf',
      },
    ],

    empty: {
      heading: 'No entity is waiting for review',
      body: 'New accreditation requests appear here as soon as a member submits their identity documents.',
    },
  },



  /* ------------------------------------------------------------
     MÀN GRANT AWARD
     Đo từ design/PW — Admin Portal (Grant Award).png.
     Vào bằng mục "2. Grant Award" ở cột trái.
     ------------------------------------------------------------ */
  grant: {
    heading: 'Grant Award',
    lead: 'Award a special honor to a verified company or individual. It’s issued as a soulbound NFT directly to their PW wallet.',

    formHeading: 'Award details',
    searchPlaceholder: 'Entity name or code…',
    searchLabel: 'Search entities by name or code',
    findLabel: 'Find',
    /* Thiết kế không vẽ trạng thái không tìm thấy — xem README */
    notFound: 'Sorry, no entity matches that code.',

    verifiedPill: 'KYC verified',
    unverifiedPill: 'KYC not verified',
    walletLabel: 'Wallet:',

    categoryLabel: 'Award category',
    /* Ba danh hiệu dùng chung với sổ đăng ký công khai */
    categories: ['Investor', 'Philanthropist', 'Bridge'],
    defaultCategory: 'Philanthropist',

    transferNote: 'Awards can’t be transferred.',

    citationLabel: 'Citation (shown on the public profile)',
    /* Thiết kế vẽ ô này đã điền sẵn; bản code để trống và mượn chính câu
       đó làm chữ gợi ý. Xem README. */
    citationPlaceholder: 'Recognized for sustained cross-border philanthropic leadership in 2025–2026',
    citationMax: 500,
    counterSuffix: 'characters',
    /* Câu gợi ý theo danh hiệu — bấm vào là điền vào ô lời trích. Do bản
       code thêm, thiết kế không vẽ. */
    citationSuggestionsLabel: 'Suggestions',
    citationSuggestions: {
      Investor: [
        'Recognized for long-term capital commitment to verified, high-impact ventures.',
        'Honored for sustained, transparent investment in cross-border enterprise growth.',
        'Acknowledged for consistent stewardship of institutional capital in 2025–2026.',
      ],
      Philanthropist: [
        'Recognized for sustained cross-border philanthropic leadership in 2025–2026.',
        'Conferred for endowing verified ESG and community initiatives.',
        'Honored for exceptional charitable contributions and measurable social impact.',
      ],
      Bridge: [
        'Recognized for facilitating multilateral corporate alliances and cross-border deal syndication.',
        'Honored for connecting verified partners across markets and jurisdictions.',
        'Acknowledged for outstanding partnership-building within the PW network.',
      ],
    },
    suggestionsEmpty: 'No entity matches.',

    missingRecipient: 'Please find the award recipient first.',
    missingCitation: 'Please write a citation before granting the award.',
    unverifiedRecipient: 'Sorry, awards can only be granted to recipients who have completed KYC.',

    cancelLabel: 'Cancel',
    submitLabel: 'Grant Award',

    /* Mục sinh ra trên Dashboard của tài khoản khi nhận award (khớp mục
       kind: 'award' trong DASHBOARD.demoProfile.titles). */
    /* Mỗi award đẩy thứ hạng lên bấy nhiêu bậc — GIẢ ĐỊNH cho bản demo, cùng
       giá trị với danh hiệu mua (OUTCOME.issuedTitle.rankGainPerTitle). */
    rankGainPerAward: 2,

    dashboardEntry: {
      pills: [{ label: 'PW wallet' }, { label: 'Soulbound', tone: 'purple' }],
      detail: 'ERC-5484 · Non-transferable',
      secondaryAction: 'View on-chain',
      activityTitle: 'Award granted',
      activityState: { label: 'Settled', tone: 'green' },
      activityMiddle: ') granted by PW and deposited to ',
      walletId: 'pw-custodial',
      walletLabel: 'PW wallet',
    },

    /* Màn phát hành danh hiệu sau khi bấm Grant Award. Cùng khung với màn
       kết quả của thành viên (#/outcome) nhưng bỏ hết phần thanh toán. Thiết
       kế chưa vẽ màn này — chữ do bản code đặt. */
    issuing: {
      stateLabel: 'Issuing award',
      heading: 'Granting the award',
      lead: 'Minting the soulbound award on-chain and depositing it into the recipient’s PW wallet. This usually takes under a minute.',
      steps: [
        { status: 'done',   title: 'Award approved',            note: 'Authorised by PW administrator', statusLabel: 'Completed' },
        { status: 'active', title: 'Minting award',             note: 'Generating immutable soulbound award', badge: 'ERC-3643' },
        { status: 'queued', title: 'Depositing to recipient wallet', note: 'Delivery into authenticated custodian registry', statusLabel: 'Queued' },
      ],
      labels: { award: 'Award', recipient: 'Recipient', awardId: 'Award ID', timestamp: 'Timestamp', specification: 'Specification' },
      copyLabel: 'Copy award ID',
      specification: 'ERC-3643 · Soulbound Award',
      /* Số chạy của mã award: #PW-AWD-<serialBase + số award đã trao> */
      serialBase: 1043,
      issuingLabel: 'Issuing…',
      portalLabel: 'Back to Admin Portal',
      footnote: 'Recorded on the public profile once issued.',

      success: {
        stateLabel: 'Issued',
        heading: 'Award granted',
        leadAfter: ' has been issued on-chain and recorded on the recipient’s public profile.',
        steps: [
          { status: 'done', title: 'Award approved',       statusLabel: 'Done' },
          { status: 'done', title: 'Award issued on-chain', badge: 'ERC-3643' },
          { status: 'done', title: 'Deposited to recipient wallet', statusLabel: 'Done' },
        ],
        labels: { award: 'Award', recipient: 'Recipient', wallet: 'Wallet', awardId: 'Award ID', grantedOn: 'Granted on', citation: 'Citation' },
        onchainLabel: 'View on-chain',
        profileLabel: 'View public profile',
        auditLabel: 'View in Audit Log',
        portalLabel: 'Back to Admin Portal',
      },
    },

    preview: {
      label: 'Award preview',
      issuerTop: 'Award',
      issuerBottom: 'Granted by PW',
      soulboundPill: 'Soulbound',
      conferredLabel: 'Officially conferred to',
      emptyName: '—',
      footnote: 'Verifiable on-chain once issued.',
    },

    /* Pháp nhân tra được là tài khoản đã đăng ký trong trình duyệt này: tên,
       loại và class lấy từ tài khoản; mã tra cứu và ví là dữ liệu mẫu ở đây
       (ví khớp ví giữ hộ trên Dashboard). Gõ đúng mã hoặc một phần tên. */
    registeredRecipient: {
      /* Mã hồ sơ công khai sinh ra khi tài khoản đăng ký nhận danh hiệu đầu
         tiên — dữ liệu mẫu, BRD chưa nói cách cấp mã. */
      entityId: 'PW-ORG-0412',
      code: '#PW-2026-AWD-00412',
      walletKind: 'PW wallet',
      wallet: '0x4f3a…9c21',
    },
  },

  /* ------------------------------------------------------------
     MÀN ADJUST POINTS — #/admin-points
     Đo từ design/PW — Admin Portal (Adjust Points).png (export 2x,
     khung 1280 × 1778). Chữ của thiết kế, trừ các chữ đánh dấu "bản code".
     ------------------------------------------------------------ */
  points: {
    heading: 'Adjust Points',
    lead: 'Manually add or remove points to correct a member’s balance. Use only for exceptions.',

    memberLabel: '1. Member',
    searchPlaceholder: 'Search by member name or code…',
    searchLabel: 'Search members by name or code',
    findLabel: 'Find',
    /* Bản code — thiết kế không vẽ các trạng thái lỗi */
    notFound: 'Sorry, no member matches that name or code.',
    missingMember: 'Please find a member first.',
    suggestionsEmpty: 'No member matches.',
    verifiedPill: 'KYC verified',
    walletLabel: 'Wallet:',

    balanceLabel: '2. Current balance',
    currentPointsLabel: 'Current points',
    unit: 'PTS',
    emptyValue: '—',

    adjustmentLabel: '3. Adjustment',
    magnitudeLabel: 'Adjustment Magnitude (PTS)',
    /* Một ô duy nhất: số dương là cộng, số âm là trừ. Bước của hai nút +/−. */
    stepAmount: 100,
    decreaseLabel: 'Decrease points',
    increaseLabel: 'Increase points',
    newBalanceLabel: 'New balance',
    invalidAmount: 'Please enter a points amount greater than 0.',
    exceedsBalance: 'Sorry, you cannot deduct more points than the current balance.',

    reasonLabel: '4. Reason',
    reasonPlaceholder: 'Select a reason',
    reasonHint: 'Shown to the holder and saved to the Audit Log.',
    reasons: [
      { id: 'missing',  label: 'Missing points from a purchase' },
      { id: 'error',    label: 'Calculation error' },
      { id: 'reverse',  label: 'Reverse points (refund or revoked Title)' },
      { id: 'other',    label: 'Other', hint: 'Explain in the note below.' },
    ],
    missingReason: 'Please select a reason before applying.',
    missingNote: 'Please add a note — the "Other" reason requires one.',

    noteLabel: 'Note (optional)',
    noteMax: 500,

    saveDraftLabel: 'Save Draft',
    cancelLabel: 'Cancel',
    applyLabel: 'Apply Adjustment',
    /* Bản code — {name}, {balance} điền lúc chạy */
    appliedNotice: '{name} now has {balance} PTS.',
    auditLabel: 'View in Audit Log',
    draftSavedNotice: 'Draft saved to the history. Select it to continue.',
    draftLabel: 'Draft',
    resumeDraftLabel: 'Continue this draft',

    /* Cột phải: dữ liệu mẫu của thiết kế */
    attestation: {
      heading: 'Multi-sig attestation session',
      epoch: 'Epoch-W38',
      signers: [
        { name: 'Master Admin Node #7829',    address: '0x7F21…A104', status: 'Signed',          tone: 'green'  },
        { name: 'Vance Institutional Custody', address: '0xC4B8…392D', status: 'Awaiting co-sign…', tone: 'purple' },
      ],
      nonceLabel: 'Ledger nonce sequence',
      nonce: '#88921',
    },

    /* Lịch sử mẫu hiện dưới lịch sử các lần chỉnh trong phiên */
    activity: {
      heading: 'Recent point activity',
      empty: 'Find a member to see their point activity.',
      sample: [
        { date: '2026-08-14', title: 'Staking Epoch Rebalance', delta: 1200 },
        { date: '2026-06-30', title: 'Q2 Liquidity Yield',      delta: 3000 },
        { date: '2026-04-12', title: 'Administrative Correction', delta: -500 },
      ],
      limit: 4,
    },

    /* Dòng sinh ra ở Recent activity trên Dashboard của thành viên */
    dashboardEntry: {
      title: 'Points adjusted',
      state: { label: 'Settled', tone: 'green' },
      suffix: ' — adjusted by PW administrator',
    },
  },

  /* ------------------------------------------------------------
     MÀN REVOKE NFT — #/admin-revoke
     Đo từ design/PW — Admin Portal (Revoke NFT).png (export 2x,
     khung 1280 × 1572). Chữ của thiết kế, trừ các chữ đánh dấu "bản code".
     ------------------------------------------------------------ */
  revoke: {
    heading: 'Revoke NFT',
    badge: 'Irreversible',
    lead: 'Revoking sets this NFT’s status to Revoked on-chain. This can’t be undone.',

    findLabel: '1. Find NFT',
    searchPlaceholder: 'Search by token ID or holder name…',
    searchLabel: 'Search NFTs by token ID or holder name',
    findButton: 'Find',
    /* Bản code — thiết kế không vẽ các trạng thái lỗi */
    notFound: 'Sorry, no NFT matches that token ID or holder.',
    suggestionsEmpty: 'No NFT matches.',
    missingNft: 'Please find the NFT to revoke first.',
    alreadyRevoked: 'Sorry, this NFT has already been revoked.',
    missingReason: 'Please select a reason before revoking.',
    missingNote: 'Please add a note — the "Other" reason requires one.',
    missingConfirm: 'Please tick the confirmation box before revoking.',

    card: {
      statusLabel: 'Status:',
      statuses: { active: 'Active', revoked: 'Revoked' },
      tokenLabel: 'Token',
      holderLabel: 'Entity / legal holder',
      awardLabel: 'Award · granted by PW',
      distinctionLabel: 'Title · issued by PW',
      verifiedPill: 'KYC verified',
      soulbound: 'Soulbound',
      mintLabel: 'Mint Timestamp:',
      contractLabel: 'Contract:',
      walletLabel: 'Current wallet:',
      onchainLabel: 'View on-chain',
    },

    reasonLabel: '2. Reason',
    reasonPlaceholder: 'Select a reason',
    reasonHint: 'Shown to the holder and saved to the Audit Log.',
    reasons: [
      { id: 'fraud',  label: 'Fraud or misrepresentation', hint: 'Information or documents were false or misleading.' },
      { id: 'kyc',    label: 'KYC invalidated',            hint: 'The holder’s verification was revoked or has expired.' },
      { id: 'error',  label: 'Issued in error',            hint: 'The NFT was minted to the wrong recipient or by mistake.' },
      { id: 'other',  label: 'Other',                      hint: 'Explain in the note below.' },
    ],

    noteLabel: 'Note to holder (optional)',
    noteMax: 500,
    counterSuffix: 'characters',

    confirmLabel: 'I understand this can’t be undone. The Public Directory will show this NFT as Revoked.',
    cancelLabel: 'Cancel',
    submitLabel: 'Revoke NFT',
    /* Bản code — {name} điền lúc chạy */
    revokedNotice: '{name} has been revoked. The Public Directory now shows it as Revoked.',

    /* Màn thu hồi sau khi bấm Revoke NFT: dùng lại khung màn phát hành của
       Grant Award (#/admin-issuing). Thiết kế chưa vẽ — chữ do bản code đặt. */
    processing: {
      stateLabel: 'Revoking NFT',
      heading: 'Revoking the NFT',
      lead: 'Setting the NFT’s status to Revoked on-chain and updating the Public Directory. This usually takes under a minute.',
      steps: [
        { status: 'done',   title: 'Revocation approved',          note: 'Authorised by PW administrator', statusLabel: 'Completed' },
        { status: 'active', title: 'Updating on-chain status',     note: 'Writing the Revoked status to the token contract', badge: 'ERC-3643' },
        { status: 'queued', title: 'Updating Public Directory',    note: 'The NFT will be shown as Revoked', statusLabel: 'Queued' },
      ],
      labels: { nft: 'NFT', holder: 'Holder', tokenId: 'Token ID', reason: 'Reason', timestamp: 'Timestamp', specification: 'Specification' },
      copyLabel: 'Copy token ID',
      specification: 'ERC-3643 · Status set to Revoked',
      revokingLabel: 'Revoking…',
      portalLabel: 'Back to Admin Portal',
      footnote: 'Recorded in the Audit Log once revoked.',

      success: {
        stateLabel: 'Revoked',
        heading: 'NFT revoked',
        leadAfter: ' has been revoked on-chain and is now shown as Revoked in the Public Directory.',
        steps: [
          { status: 'done', title: 'Revocation approved',       statusLabel: 'Done' },
          { status: 'done', title: 'Status set to Revoked on-chain', badge: 'ERC-3643' },
          { status: 'done', title: 'Public Directory updated', statusLabel: 'Done' },
        ],
        labels: { nft: 'NFT', holder: 'Holder', tokenId: 'Token ID', reason: 'Reason', revokedOn: 'Revoked on', note: 'Note to holder' },
        onchainLabel: 'View on-chain',
        directoryLabel: 'View Public Directory',
        auditLabel: 'View in Audit Log',
        portalLabel: 'Back to Admin Portal',
      },
    },

    /* Dữ liệu mẫu của thiết kế cho NFT của tài khoản đăng ký */
    sample: {
      registrationId: 'CHE-391.204.992',
      mintedAt: '2024-11-14 09:22:14 UTC',
      contract: '0x7F2e09B2…889b',
    },

    recent: {
      heading: 'Recent revocations',
      byPrefix: 'by',
      adminName: 'Sarah Chen',
      kindLabels: { distinction: 'Title', award: 'Award' },
      sample: [
        { date: '12 May 2026', holder: 'Helios Clean Energy LP', title: 'Bridge', kind: 'distinction', id: '#PW-2026-BRG-00731', reason: 'KYC invalidated', by: 'Sarah Chen' },
        { date: '08 Jan 2026', holder: 'Vespera Capital',        title: 'Investor', kind: 'distinction', id: '#PW-2025-INV-00415', reason: 'Issued in error', by: 'Minh Tran' },
      ],
    },

    /* Dòng sinh ra ở Recent activity trên Dashboard của thành viên */
    dashboardEntry: {
      title: 'NFT revoked',
      state: { label: 'Revoked', tone: 'red' },
      middle: ') revoked on-chain — ',
      revokedPill: { label: 'Revoked', tone: 'red' },
    },
  },

  /* ------------------------------------------------------------
     MÀN AUDIT LOGS — #/admin-audit
     Đo từ design/PW — Admin Portal (Audit Logs).png (export 2x, khung
     1288 × 1465). Thiết kế cắt bảng ở cột "Target entity" (cuộn ngang);
     các cột sau đó do bản code thêm — xem README.
     ------------------------------------------------------------ */
  audit: {
    heading: 'Audit Logs',
    lead: 'Every admin and system action, with who did it and when. Entries can’t be edited or deleted.',
    refreshLabel: 'Reset filters',
    /* Bản code — hàng lọc thêm dưới các chip */
    signerFilterLabel: 'Signer',
    allSignersLabel: 'All signers',
    fromLabel: 'From',
    toLabel: 'To',
    resetLabel: 'Reset filters',
    exportLabel: 'Export CSV',
    exportFile: 'pw-audit-log.csv',

    filterPlaceholder: 'Filter by Node ID, Target, Hash, or Clause',
    filterLabel: 'Filter the log by node ID, subject, hash or clause',
    chips: [
      { id: 'all',         label: 'ALL' },
      { id: 'kyc',         label: 'KYC' },
      { id: 'awards',      label: 'Awards' },
      { id: 'points',      label: 'Points' },
      { id: 'revocations', label: 'Revocations' },
      { id: 'mints',       label: 'Mints' },
      { id: 'transfers',   label: 'Transfers' },
    ],
    defaultChipId: 'all',
    /* {shown} / {total} điền lúc chạy; tổng = 12,984 mẫu + số mục sinh ra trong phiên */
    displaying: 'Displaying {shown} of {total} entries',
    baseTotal: 12984,

    searchPlaceholder: 'Search by token ID, profile ID, node, hash or clause…',
    searchLabel: 'Search the log by token ID or profile ID',
    findLabel: 'Find',
    empty: 'No log entries match.',

    columns: [
      { id: 'time',   label: 'Timestamp' },
      { id: 'signer', label: 'Signer node / actor' },
      { id: 'action', label: 'Action type' },
      { id: 'target', label: 'Target entity' },
      { id: 'reason', label: 'Reason' },
      { id: 'hash',   label: 'Tx hash' },
    ],
    blockPrefix: 'Block',

    /* tone: màu chip hành động. group: nhóm của ô lọc nhanh. */
    actions: {
      NFT_REVOKE:    { tone: 'red',    group: 'revocations' },
      POINTS_ADJUST: { tone: 'purple', group: 'points' },
      GRANT_MINT:    { tone: 'blue',   group: 'awards' },
      NFT_MINT:      { tone: 'blue',   group: 'mints' },
      NFT_TRANSFER:  { tone: 'green',  group: 'transfers' },
      KYC_APPROVE:   { tone: 'green',  group: 'kyc' },
      KYC_REJECT:    { tone: 'red',    group: 'kyc' },
    },

    signers: {
      master:     { name: 'Master Node #7829',   address: '0x7F21…A104', icon: 'shield' },
      hsm:        { name: 'HSM Gate East',       address: '0x3B99…80B2', icon: 'chip' },
      complianceSg: { name: 'Compliance Node SG', address: '0x88CC…6791', icon: 'shieldUser' },
      complianceCh: { name: 'Compliance Node CH', address: '0x11AB…DF88', icon: 'shieldUser' },
    },

    /* Số khối bắt đầu của các mục sinh ra trong phiên (sau khối mẫu mới nhất) */
    sessionBlockBase: 4921799,

    /* Năm dòng mẫu của thiết kế. Phần chữ bị cắt ở mép phải (tên, mã hồ sơ)
       được bản code hoàn chỉnh tối thiểu; Tx hash là chữ bản code thêm. */
    sample: [
      { at: '2026-05-18 14:32:09', block: 4921798, signer: 'master', action: 'NFT_REVOKE',    target: 'Apex Global Syndicate Ltd', sub: 'CHE-391.204.992 · Zurich',     reason: 'KYC invalidated', hash: '0x9c1e…47d2' },
      { at: '2026-05-18 13:58:44', block: 4921741, signer: 'hsm',    action: 'POINTS_ADJUST', target: 'Apex Global Syndicate Ltd', sub: 'Manual balance correction',reason: 'Allocation Disparity', hash: '0x5a02…b8e1' },
      { at: '2026-05-18 11:15:30', block: 4921589, signer: 'master', action: 'GRANT_MINT',    target: 'Apex Global Syndicate Ltd', sub: 'Philanthropist · #PW-2026-AWD-00412', reason: 'Conferred for sustained cross-border philanthropic leadership', hash: '0x71fd…03aa' },
      { at: '2026-05-18 09:41:12', block: 4921412, signer: 'complianceSg', action: 'KYC_APPROVE', target: 'Astris Family Office', sub: 'SGP-99210-LLC · Singapore',      reason: '—', hash: '0xe4b7…9120' },
      { at: '2026-05-17 19:20:05', block: 4920891, signer: 'complianceCh', action: 'KYC_APPROVE', target: 'Vance Holdings SA',    sub: 'CHE-391.204.992 · Zurich',       reason: '—', hash: '0x2d68…f5c4' },
    ],

    pagination: {
      info: 'Page 1 of 2,597 · Showing latest signed HSM transactions',
      prevLabel: 'Previous',
      nextLabel: 'Next',
      pages: ['1', '2', '3'],
      gapLabel: '…',
      lastPage: '2,597',
    },
  },

  /* ------------------------------------------------------------
     MÀN DUYỆT MỘT HỒ SƠ KYC
     Đo từ design/PW — Admin Portal (KYC Review — Vance Holdings SA).png.
     Vào bằng cách bấm tên pháp nhân trong hàng đợi.
     ------------------------------------------------------------ */
  review: {
    /* Chữ cho hồ sơ thật do thành viên vừa đăng ký nộp — thiết kế chỉ vẽ Vance Holdings */
    submittedUidPrefix: '0x',
    submittedDocumentNote: 'Uploaded by applicant',
    submittedDocumentState: 'Received',
    backLabel: 'Back to KYC Queue',
    submittedLabel: 'Submitted:',
    statusPill: 'Pending accreditation',

    uidLabel: 'Entity UID:',

    documents: {
      heading: 'Submitted Legal & Compliance Documents',
      countSuffix: { one: 'document attached', many: 'documents attached' },
      viewLabel: 'View Document',
    },

    companyClass: {
      heading: 'Company Class',
      note: 'By headcount · pricing tier',
      recommendedLabel: 'Recommended',
      matchLabel: 'Matches declared headcount',

      /* Bậc nhân sự của màn duyệt. CHÚ Ý: khác HEADCOUNT_BRACKETS mà màn
         đăng ký đang dùng (1-10 / 11-50 / 51-200…) đúng một đơn vị ở mỗi
         mốc. Giữ nguyên cả hai theo đúng thiết kế từng màn — xem README. */
      classes: [
        /* Cùng một bảng với HEADCOUNT_BRACKETS ở màn đăng ký. Thiết kế duyệt KYC
           vẽ 1–9 / 10–49 / 50–199… lệch một đơn vị — đã gộp về bảng đăng ký. */
        { index: 0, range: '1–10',          name: 'Micro',             min: 1,     max: 10    },
        { index: 1, range: '11–50',         name: 'Small',             min: 11,    max: 50    },
        { index: 2, range: '51–200',        name: 'SME',               min: 51,    max: 200   },
        { index: 3, range: '201–500',       name: 'Mid-market',        min: 201,   max: 500   },
        { index: 4, range: '501–1,000',     name: 'Large',             min: 501,   max: 1000  },
        { index: 5, range: '1,001–5,000',   name: 'Enterprise',        min: 1001,  max: 5000  },
        { index: 6, range: '5,001–9,999',   name: 'Major Enterprise',  min: 5001,  max: 9999  },
        { index: 7, range: '10,000+',       name: 'Global Enterprise', min: 10000, max: null  },
      ],
      classPrefix: 'Class',
      tierPrefix: 'Tier',

      verify: {
        heading: 'Verify against documents',
        declaredLabel: 'Declared',
        verifiedLabel: 'Verified (from docs)',
        verifiedUnit: 'employees',
        verifiedPlaceholder: '—',
        resultLabel: 'Resulting class',
        changedPill: 'Class changed',
        reasonLabel: 'Reason for class change',
        reasonHint: '— required only when Class differs from declared',
        reasonPlaceholder: 'Select a reason…',
        reasons: [
          'Financial audit differs from declaration',
          'Registry filing differs from declaration',
          'Group headcount includes subsidiaries',
          'Declared figure outdated',
          'Other (explain in the note)',
        ],
        notePlaceholder: 'Add a short note referencing the document (e.g. “Deloitte 2025 audit, p.12 — 3,200 FTE”).',
        missingReason: 'Please select a reason for the Class change before approving.',
      },
    },

    decision: {
      heading: 'Decision',

      rejectionLabel: 'Rejection reason',
      rejectionHint: '— required only when rejecting',
      rejectionPlaceholder: 'Select a reason…',
      rejectionReasons: [
        { label: 'Documents incomplete or missing',          hint: 'Required KYC documents were not all provided' },
        { label: 'Documents unclear / illegible',            hint: 'Uploaded files can’t be read or verified'     },
        { label: 'Entity cannot be verified (registry mismatch)', hint: 'Details don’t match the official business registry' },
        { label: 'Headcount / Class cannot be confirmed',    hint: 'No document supports the declared headcount'  },
        { label: 'Suspected fraud — escalate',               hint: 'Flag for compliance review'                   },
        { label: 'Other (specify below)',                    hint: 'Requires a written explanation'               },
      ],
      missingRejection: 'Please select a rejection reason before submitting.',

      messagePlaceholder: 'Message to the applicant — shown to them so they can fix and resubmit (e.g. “Please re-upload a clear copy of your 2025 financial audit.”)',

      internalLabel: 'Internal note',
      internalHint: '— optional, for approval',
      internalPlaceholder: 'Optional note kept internal to the compliance team.',

      /* Nửa đầu đổi theo hướng tăng/giảm, nửa sau là quy định cố định */
      warning: {
        raise: 'raises',
        lower: 'lowers',
        lead: 'This change {dir} the Class (Class {from} → {to}).',
        rule: 'A change that lowers the Class (cheaper tier) requires a second reviewer’s approval before it takes effect.',
      },

      draftLabel: 'Save draft',
      rejectLabel: 'Reject',
      approveLabel: 'Approve KYC',
    },

    protocols: 'Granting accreditation activates cryptographic minting rights across all Smart Legal Ledger nodes. Rejections permanently invalidate submitted credentials and mandate re-issuance.',
  },

  /* Hồ sơ chi tiết, tra theo khoá `reviewId` của dòng trong hàng đợi.
     Thiết kế chỉ vẽ MỘT hồ sơ (Vance Holdings SA) nên ở đây chỉ có một
     mục; hai dòng còn lại chưa có nội dung nào được thiết kế nên tên của
     chúng không bấm được. Thêm một mục vào đây là màn tự chạy. */
  reviews: {
    'vance-holdings-sa': {
      name: 'Vance Holdings SA',
      statusPill: 'Swiss DLT regulated',
      tagline: 'Sovereign Investment Syndicate & Institutional Wealth Desks',
      uid: '0x742d…410b',
      submittedAt: '2026-05-17 19:20 UTC',

      /* Bậc nhân sự pháp nhân tự khai lúc đăng ký */
      declaredCount: 40,

      facts: [
        { label: 'Legal entity name',             value: 'Vance Holdings SA' },
        { label: 'Registration number',           value: 'CHE-391.204.992' },
        { label: 'Jurisdiction & regulatory body', value: 'Zurich, Switzerland (FINMA Regulated)' },
        { label: 'Entity classification',         value: 'Institutional Asset Manager / Sovereign Syndicate' },
        { label: 'Value-added tax ID',            value: 'CHE-391.204.992-TVA' },
        /* Thiết kế cắt mất dấu đóng ngoặc — xem README */
        { label: 'Beneficial ownership',          value: 'Fully Disclosed (Tier-1)', tone: 'green', icon: 'checkBadge' },
      ],

      documents: [
        { name: 'Certificate of Incorporation',            meta: 'PDF, 2.4 MB · Verified via Swiss Commercial Registry', state: 'Authentic', icon: 'file'        },
        { name: 'Articles of Association & Bylaws',        meta: 'PDF, 5.1 MB · Notarized Copy',                        state: 'Authentic', icon: 'gavel'       },
        { name: 'Ultimate Beneficial Ownership (UBO) Declaration', meta: 'PDF, 1.8 MB · HSM Signed',                    state: 'Encrypted', icon: 'badge'       },
        { name: 'Institutional Financial Audit 2025',      meta: 'PDF, 8.7 MB · Deloitte LLP Attestation',              state: 'Authentic', icon: 'pieChart'    },
        { name: 'Authorized Signatory Board Resolution',   meta: 'PDF, 940 KB · Dual Signer Authorization',             state: 'Authentic', icon: 'fingerprint' },
      ],
    },
  },

  protocols: {
    heading: 'Statutory Jurisdiction Protocols',
    lines: [
      'Granting an accreditation activates cryptographic minting rights across all Smart Legal Ledger nodes.',
      'Class (0–7, by headcount) determines the pricing tier.',
      'Rejections permanently invalidate submitted credentials and mandate re-issuance.',
    ],
  },
};


/* ============================================================
   Thời gian chờ ở màn "đang phát hành"
   ------------------------------------------------------------
   ĐÂY LÀ ĐƯỜNG TẮT CHO BẢN DEMO. Prototype không nối chuỗi khối
   thật nên không có gì để chờ: sau đúng chừng này mili-giây màn
   tự nhảy sang trạng thái đã phát hành xong.
   Đặt 0 là bỏ qua hẳn bước chờ.
   ============================================================ */
const DEMO_ISSUE_DELAY_MS = 3000;

/* ============================================================
   MÀN TRANSFER A DISTINCTION — #/transfer
   ------------------------------------------------------------
   Đo từ design/PW Registry — Transfer a Distinction (Destination).png
   (export 2x, khung 1288 × 1138). Vào từ nút "Transfer" trên thẻ
   danh hiệu ở Dashboard. Thiết kế chỉ vẽ bước chọn đích đến; màn
   đang chuyển / đã chuyển do bản code thêm (chữ ở `status`).
   ============================================================ */
const TRANSFER = {
  backLabel: 'Back to Dashboard',
  heading: 'Transfer a Title',
  lead: 'Move this Title out of your PW wallet. This can be done only once.',

  nft: {
    changeLabel: 'Change Title',
    custodial: 'PW wallet',
  },

  destination: {
    heading: 'Where should this Title go?',
    lead: 'Choose one of your linked wallets, or enter another wallet that you own.',

    linked: {
      label: 'My linked wallet',
      tag: 'Default',
      verified: 'Verified',
      copyLabel: 'Copy wallet address',
      note: 'Verified wallet — no new signature needed. This NFT will keep counting toward your ranking.',
      /* Bản code — chưa liên kết ví nào thì không có đích mặc định */
      none: 'No linked wallet yet. Link a wallet from the Dashboard, or use another address.',
    },

    other: {
      label: 'Another address',
      lead: 'Transfer to another wallet that you own. You’ll connect it and sign a message to prove ownership.',
      placeholder: '0x…',
      inputLabel: 'Recipient wallet address',
      hint: 'We check the address format and network (Polygon).',
      /* Bản code — tên đặt cho ví mới liên kết khi người dùng xác nhận đó là ví của mình */
      ownName: 'Personal wallet · {tail}',
    },
  },

  policy: {
    heading: 'One-time transfer policy',
    body: 'One-time transfer: after it is confirmed on-chain, this NFT is locked in the destination wallet and can’t be transferred again or moved back to PW.',
  },

  cancelLabel: 'Cancel',
  continueLabel: 'Continue',

  /* Bản code — thiết kế không vẽ trạng thái lỗi */
  errors: {
    addressRequired: 'Please enter the recipient wallet address.',
    addressInvalid: 'This address is not valid. It must start with 0x and have 40 hex characters.',
    linkedElsewhere: 'This wallet is already linked to another PW account. Each wallet can be linked to one account only.',
    noLinkedWallet: 'You have no linked wallet yet. Please choose “Another address”.',
  },

  summary: {
    heading: 'Transfer summary',
    from: 'From',
    to: 'To',
    toEmpty: '—',
    ranking: 'Ranking',
    keeps: 'Keeps counting',
    stops: 'Stops counting',
    transfer: 'Transfer',
    transferValue: 'One-time · will be used',
    after: 'After transfer',
    locked: 'Locked',
    fee: 'Network fee is covered by PW.',
  },

  /* Màn đang chuyển / đã chuyển — dùng lại khung .outcome-* */
  status: {
    stateLabel: 'Transferring',
    heading: 'Moving the Title',
    lead: 'Confirming the transfer on-chain and locking the Title in the destination wallet. This usually takes under a minute.',
    steps: [
      { status: 'done',   title: 'Transfer approved',            note: 'Authorised by the holder', statusLabel: 'Completed' },
      { status: 'active', title: 'Confirming on-chain',          note: 'Moving the token to the destination wallet', badge: 'ERC-3643' },
      { status: 'queued', title: 'Locking in destination wallet', note: 'The one-time transfer will be used', statusLabel: 'Queued' },
    ],
    labels: { title: 'Title', tokenId: 'Token ID', from: 'From', to: 'To', timestamp: 'Timestamp' },
    transferringLabel: 'Transferring…',
    dashboardLabel: 'Go to Dashboard',
    footnote: 'Network fee is covered by PW.',

    success: {
      stateLabel: 'Transferred',
      heading: 'Title transferred',
      leadAfter: ' has been moved to {destination} and is now locked there.',
      steps: [
        { status: 'done', title: 'Transfer approved',         statusLabel: 'Done' },
        { status: 'done', title: 'Confirmed on-chain',        badge: 'ERC-3643' },
        { status: 'done', title: 'Locked in destination wallet', statusLabel: 'Done' },
      ],
      labels: { title: 'Title', tokenId: 'Token ID', from: 'From', to: 'To', transferredOn: 'Transferred on', ranking: 'Ranking' },
      rankingKeeps: 'Keeps counting toward ranking',
      rankingStops: 'No longer counts toward ranking',
      dashboardLabel: 'Go to Dashboard',
    },
  },

  /* Thẻ danh hiệu sau khi chuyển (khớp mẫu "Locked" có sẵn ở DASHBOARD.demoProfile.titles) */
  lockedCard: {
    locked: { label: 'Locked', icon: 'lock' },
    verifiedPill: { label: 'Self-custody (verified)', tone: 'green' },
    unverifiedPill: { label: 'Self-custody (unverified)', tone: 'amber' },
    detail: 'ERC-3643 · Wallet {address} · One-time transfer used — locked in this wallet',
    note: 'Locked — transfer already used',
  },

  activity: {
    title: 'Transfer completed',
    state: { label: 'Settled', tone: 'green' },
    middle: ') transferred to ',
  },
};

/* ============================================================
   MODAL LINK A WALLET — mở từ nút "Link wallet" ở Dashboard
   ------------------------------------------------------------
   Đo từ design/PW Registry — Member Dashboard (Link Wallet Modal -
   Step 01).png (export 2x, khung 1280 × 1024). Thiết kế chỉ vẽ Step 01;
   bước chứng minh quyền sở hữu và màn kết quả do bản code thêm.
   ============================================================ */
const LINK_WALLET = {
  heading: 'Link a wallet',
  lead: 'Link a non-custodial wallet you own. NFTs in a linked wallet keep counting toward your ranking.',
  closeLabel: 'Close',

  name: {
    label: 'Wallet name',
    placeholder: 'e.g. Ledger — personal',
    hint: 'Only you see this name.',
  },

  network: {
    label: 'Network',
    value: 'Polygon (PoS)',
    tag: 'Mainnet',
    lockedLabel: 'Network is fixed',
    hint: 'PW NFTs are issued on Polygon.',
  },

  address: {
    label: 'Wallet address',
    placeholder: '0x…',
    pasteLabel: 'Paste address',
    hint: 'We check the format and network. You’ll prove ownership in the next step.',
  },

  apps: {
    label: 'Wallet app',
    options: [
      { id: 'metamask',      label: 'MetaMask' },
      { id: 'walletconnect', label: 'WalletConnect' },
      { id: 'ledger',        label: 'Ledger' },
      { id: 'other',         label: 'Other' },
    ],
    defaultId: 'metamask',
  },

  note: 'Each wallet can be linked to only one PW account. Linking is free — no transaction, no gas fee.',

  cancelLabel: 'Cancel',
  continueLabel: 'Continue',

  /* Bản code — thiết kế không vẽ trạng thái lỗi */
  errors: {
    nameRequired: 'Please name your wallet.',
    addressRequired: 'Please enter the wallet address.',
    addressInvalid: 'This address is not valid. It must start with 0x and have 40 hex characters.',
    linkedElsewhere: 'This wallet is already linked to another PW account. Each wallet can be linked to one account only.',
    duplicate: 'This wallet is already linked to your account.',
    /* {signer} điền lúc chạy */
    signerMismatch: 'The signature came from wallet {signer}, which does not match the address you entered. Please sign with your own wallet.',
  },

  /* Bước 02 và kết quả — do bản code thêm */
  prove: {
    heading: 'Prove you own this wallet',
    lead: 'Sign the message below in {app}. It’s free — nothing is sent on-chain.',
    messageLabel: 'Message to sign',
    message: 'Link wallet {address} to PW account “{account}”.\nNonce: {nonce}',
    backLabel: 'Back',
    signLabel: 'Sign message',
    signingLabel: 'Waiting for signature…',
    /* Bản code — công cụ thử: giả lập người dùng ký bằng khoá của ví khác */
    wrongWalletLabel: 'Demo: sign with a different wallet',
    wrongWalletOnLabel: 'Demo: signing with a different wallet (click to undo)',
    transferLead: 'Transfers are only allowed to a wallet you own. Sign the message below in your wallet to prove it — nothing is sent on-chain.',
    transferSignLabel: 'Sign and transfer',
  },

  done: {
    heading: 'Wallet linked',
    lead: '{name} is verified. NFTs you move there keep counting toward your ranking.',
    doneLabel: 'Done',
  },

  /* Dòng sinh ra ở Recent activity trên Dashboard */
  activity: {
    title: 'Wallet linked',
    state: { label: 'Verified', tone: 'green' },
    suffix: ') verified via cryptographic signature',
  },
};

/* Hộp thoại xác nhận Unlink ví (nút Unlink ở thẻ Wallets trên Dashboard). Thiết kế chưa vẽ — chữ do bản code đặt. */
const UNLINK_WALLET = {
  heading: 'Unlink {name}?',
  leadEmpty: 'This wallet will be removed from your account. You can link it again at any time.',
  leadOne: '1 NFT in this wallet will be removed from your account and will no longer count toward your ranking. Link this wallet again at any time to get it back.',
  leadMany: '{count} NFTs in this wallet will be removed from your account and will no longer count toward your ranking. Link this wallet again at any time to get them back.',
  cancelLabel: 'Cancel',
  confirmLabel: 'Unlink wallet',
  closeLabel: 'Close',
  activity: {
    title: 'Wallet unlinked',
    state: { label: 'Unlinked', tone: 'amber' },
    suffix: ') removed from your account',
  },
};
