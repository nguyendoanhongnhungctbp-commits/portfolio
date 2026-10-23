/* ============================================================
   BỘ TÀI LIỆU TRAINING CỦA TRỢ LÝ AI — web/js/kb.js
   ------------------------------------------------------------
   Đây là "kho tài liệu" của RAG: mỗi mục là một tài liệu ngắn. assistant.js
   cắt chúng thành đoạn nhỏ (chunk), lập chỉ mục rồi tìm đoạn liên quan cho
   mỗi câu hỏi.

   TÀI LIỆU CHỈ CHỨA QUY TẮC VÀ CÁCH LÀM — những điều ít đổi (giá theo Class,
   10% điểm, chuyển một lần…). SỐ LIỆU ĐANG THAY ĐỔI (tổng danh hiệu đã phát hành,
   số NFT của một thành viên, điểm, hạng, số pháp nhân…) KHÔNG nằm ở đây: trợ lý
   đọc trực tiếp từ web mỗi lần được hỏi (xem `readLiveFacts` / `TOOLS` trong
   assistant.js), nên mua thêm một Title là câu trả lời đổi ngay.

   QUY TẮC KHI SỬA: đổi quy tắc ở web (giá, quy tắc điểm, luồng chuyển NFT…) thì
   sửa luôn ở đây. Mỗi đoạn cách nhau một dòng trống, câu ngắn, một ý một câu.
   Chữ tiếng Anh vì giao diện web là tiếng Anh.
   ============================================================ */
const PW_KB = [
  {
    id: 'platform-overview',
    title: 'About PW',
    text: `PW is a Business Partner Recognition and Verification Platform. It issues cryptographically authenticated business Titles that anyone can verify publicly, for enterprises, family offices and sovereign leaders.

There are three kinds of Titles: Philanthropist, Investor and Bridge. Each Title is issued as an NFT. Titles bought by members use the ERC-3643 permissioned standard and can be transferred once. Awards granted by PW use the ERC-5484 soulbound standard and can never be transferred.

The platform works in three steps. First, register and complete KYC. Second, acquire a Title for yourself or gift one to another verified entity. Third, anyone can verify the Title on-chain through the Public Directory.

You do not need a crypto wallet or any technical knowledge: PW creates and manages a wallet for you. Payments are made by card. In this environment payments and blockchain steps are a demonstration and no real money is moved.`,
  },
  {
    id: 'accounts-kyc',
    title: 'Accounts and KYC',
    text: `PW has two account types: Company and Individual. To register, enter your details, choose a password with at least 8 characters including a number and a symbol, confirm it and accept the Terms of Service and Privacy Policy. After registering you are signed in automatically.

Before you can buy a Title, receive a gift or receive an Award, your account must pass KYC (identity verification). Open "Verify your identity", fill in the legal name, the registry or document number, upload a supporting document (PDF, PNG or JPG, up to 25 MB) and submit. You can save a draft and continue later, and remove an uploaded file before submitting.

A KYC request has four statuses: Not submitted, KYC in review, Approved and Rejected. A PW administrator reviews the request. If it is approved you can start purchasing. If it is rejected you see the reason and the administrator's message on your Dashboard and can click "Re-submit KYC" with new documents.

A Company declares its number of employees at registration, which sets its Class. An Individual account is always Class 0. The administrator compares the declaration with your documents and may change the Class when approving; changing the Class always requires a written reason.`,
  },
  {
    id: 'login-session',
    title: 'Logging in and your account menu',
    text: `Log in with your email and password. If either is wrong you see "Incorrect email or password". You can tick "Remember me" and use "Forgot password?" on the login page.

Click the round avatar at the top right to open the account menu. It shows your name and wallet address and has a "Log out" item. After logging out you cannot return to your Dashboard with the Back button.

Members and administrators use the same login page. Members see the Member Dashboard, Acquisition & Gifting and the Public Directory. Administrators only see the Public Directory and the Admin Portal; a member cannot open admin pages.`,
  },
  {
    id: 'dashboard-guide',
    title: 'Your Dashboard',
    text: `The Member Dashboard header shows your company name, Class and KYC status. Below it are three summary cards.

Point Balance shows your points (PTS) with a "View history" link that opens the Point history screen with every change to your balance. Ranking shows your rank in the Public Directory and how many NFTs are counted. Titles Owned shows the total number of NFTs and how many of them are Titles and how many are Awards.

My wallets lists your PW wallet and any linked wallets, with the number of NFTs in each and an Unlink button for linked wallets. My Titles shows one card per NFT with its Token ID, issue date, wallet and actions (Transfer, View on-chain). Recent activity lists purchases, gifts, transfers, awards, points and revocations, newest first.

A new account with no Titles sees empty states such as "No Titles yet" until the first purchase.`,
  },
  {
    id: 'title-types',
    title: 'The three Titles',
    text: `Philanthropist champions institutional social impact and corporate endowment. It is designated for grant makers, patron leaders, ESG founders and sovereign endowment officers. Series: Alpha Validated.

Investor validates strategic venture alliances, co-underwriting mandates and capital syndicates. It is designated for angel syndicates, venture partners, institutional allocators and family principals. Series: Prime Priority.

Bridge recognises cross-border expansion, deal brokerage and strategic institutional alliances. It is designated for ecosystem builders, M&A advisors, strategic operators and global trade counsels. Series: Global Connectivity.

Each Title is unique and has a Token ID such as #PW-2026-INV-41207, where INV, BRG and PHI stand for Investor, Bridge and Philanthropist. Awards carry an AWD code. The Title preview on the purchase screen shows the selected Title and what you pay.`,
  },
  {
    id: 'classes-pricing',
    title: 'Classes and Title prices',
    text: `The price of a Title depends on the Class of the buyer. Class is set by company headcount: Class 0 is 1-10 employees (Micro), Class 1 is 11-50 (Small), Class 2 is 51-200 (SME), Class 3 is 201-500 (Mid-market), Class 4 is 501-1,000 (Large), Class 5 is 1,001-5,000 (Enterprise), Class 6 is 5,001-10,000 (Major Enterprise) and Class 7 is 10,000 or more (Global Enterprise).

PW sells three Titles: Philanthropist, Bridge and Investor. Prices in CHF per Class (Philanthropist / Bridge / Investor): Class 0: 1,000 / 1,500 / 2,000. Class 1: 1,500 / 2,000 / 3,000. Class 2: 2,000 / 3,000 / 4,000. Class 3: 3,000 / 4,500 / 6,000. Class 4: 4,500 / 6,500 / 9,000. Class 5: 6,500 / 9,500 / 13,000. Class 6: 9,000 / 13,000 / 18,000. Class 7: 12,000 / 18,000 / 25,000.

When you gift a Title, the price is based on the buyer's Class, not the recipient's. The registration and custody fee is waived and the network fee is covered by PW.

The prices above are list prices. The Year-2 discount, when you are eligible, is taken off at the Order Summary.`,
  },
  {
    id: 'buying-gifting',
    title: 'Buying and gifting a Title',
    text: `To buy a Title open "Acquisition & Gifting" in the left menu, choose Philanthropist, Investor or Bridge, then continue. Only members whose KYC is approved can buy; otherwise the screen explains that KYC is required.

Step 2 is the recipient. "For Myself" issues the Title to your own entity. "Gift to Someone" lets you search any entity in the system by name or ID, add an optional message of up to 500 characters and send the Title to that entity. A gift recipient must be KYC-verified; entities that have not completed KYC cannot be selected. "Reset selection" clears the recipient and message.

Step 3 is the payment. Choose a saved card or add a new one, optionally use points, tick the Title Issuance Terms and the Legal Custody Agreement, then click "Pay & issue Title". The button stays disabled until the terms are ticked. You can cancel before paying with "Back to Dashboard" and nothing is charged.

When you gift a Title the recipient sees a notification screen the next time they log in and the Title appears in their wallet; there is nothing for them to accept. Both the buyer and the recipient earn 10% of the amount paid in points. A gift Title does not appear in the buyer's own Titles.`,
  },
  {
    id: 'payment-cards',
    title: 'Paying by card',
    text: `Payments use credit or debit cards. In this environment only sandbox cards are used and no real money is moved.

Click "+ Add new card" and enter the card number, expiry date (MM / YY), security code (3 or 4 digits), name on card and billing country. The card brand (Visa, Mastercard, American Express) is recognised from the number. Invalid details show an error under the field: the card number must be valid, the expiry date must not be in the past, the code must have 3 or 4 digits and the name is required.

You can tick "Save this card for future purchases" and "Set as default payment method", or click "Add card" to save a card without paying. Saved cards appear with their brand, last four digits and expiry date; you can set another card as default or remove one. Only the brand, last four digits and expiry are stored, never the full number.

Billing details are filled in from your account (address and registration number) and the billing country defaults to your registered country.`,
  },
  {
    id: 'issuance-minting',
    title: 'What happens after you pay',
    text: `After "Pay & issue Title" the screen shows "Payment received — issuing your title" with three steps: Payment settled, Minting Title (ERC-3643) and Depositing to the recipient vault. In this environment it finishes in a few seconds.

When it is done the screen says "Your Title is in your wallet" and shows the owner, the wallet, the Title ID with a copy button, the amount paid, the points earned and the time. Click "Go to Dashboard" to see the new Title in My Titles.

Your first purchase for yourself creates your PW wallet automatically. Later purchases use the same wallet. For a gift the screen says "Your gift has been delivered" and the Title goes to the recipient's wallet.

Points for the purchase are credited only after the payment is confirmed. The Title also appears in the Public Directory and raises the rank of its owner.`,
  },
  {
    id: 'points-discount',
    title: 'Points and the Year-2 discount',
    text: `You earn reward points on every Title purchase: 10% of the amount you actually pay, credited after the payment is confirmed. 1 CHF equals 1 point, and any fraction of a point is rounded up to the next whole point. For example, paying CHF 4,000 earns 400 PTS.

When you buy a Title as a gift, both the buyer and the recipient earn 10% of the amount paid. A Title granted by an administrator as an Award earns no points.

You can use points to pay: each point reduces the total by CHF 1, up to your balance and the price of the Title. On the Payment step choose 0, 500, 1,000 or Max. The points are deducted from your balance after the payment succeeds.

The Year-2 loyalty discount takes 20% off the Title price. A member is eligible when the account is at least 2 years old and the point balance is at least 1,000 PTS. If you are not eligible, the Payment step shows "Not yet eligible" with the date you reach 2 years, or the minimum balance you are missing. The discount is applied first, then points, and reward points are calculated on what you finally pay.

Your balance and every change to it are shown on the Dashboard ("Point Balance") and in "View history". An administrator can correct a balance for exceptions, but a balance can never go below zero.`,
  },
  {
    id: 'wallets-transfer',
    title: 'Wallets and transfers',
    text: `Your Titles are held in a PW wallet that PW manages for you through Circle. You do not need to own any crypto or set up a wallet yourself.

You can link a non-custodial wallet that you own (for example a Ledger or MetaMask wallet). Open "Link wallet", enter a name and the 0x address, then sign a message in your wallet to prove you own it. Signing is free and nothing is sent on-chain. If the signature comes from a different wallet than the address you entered, the wallet is not linked. A wallet address must start with 0x and have 40 hexadecimal characters. A wallet that is already linked to your account cannot be linked twice, and a wallet that is already linked to another PW account cannot be linked to yours (each wallet belongs to one account only). Linked wallets show a Verified badge.

A Title can be transferred once, from your PW wallet to a wallet of your own. Click "Transfer" on the Title card, choose your linked wallet or enter another address (you must sign with it to prove you own it) and continue. The network fee is covered by PW. After the transfer the Title is locked in the destination wallet and can no longer be transferred or moved back to PW. Titles in a linked wallet still count toward your ranking.

Awards are soulbound and can never be transferred. A revoked Title cannot be transferred either. You can only transfer to wallets that you own.

If you unlink a wallet, the NFTs in it are removed from your account and no longer count toward your ranking until you link the same wallet again.`,
  },
  {
    id: 'awards-revocation',
    title: 'Awards and revocation',
    text: `An Award is a special honour that a PW administrator grants to a KYC-verified company or individual. It is issued as a soulbound NFT directly to the recipient's PW wallet; if the recipient has no wallet yet, one is created. Awards cannot be transferred and earn no reward points.

Every Award carries a citation written by the administrator, which is shown on the recipient's public profile. The award categories are Philanthropist, Investor and Bridge. An Award cannot be granted to an entity that has not completed KYC.

Only a PW administrator can revoke an NFT. The administrator chooses a reason (fraud or misrepresentation, KYC invalidated, issued in error, or other), may add a note to the holder and must confirm. A revoked NFT is labelled Revoked, is no longer counted toward the holder's ranking and cannot be transferred. Revocation cannot be undone.

You will be notified when you receive an Award or when one of your Titles is revoked: open the bell icon at the top of the Dashboard.`,
  },
  {
    id: 'directory-ranking',
    title: 'Public Directory and ranking',
    text: `The Public Directory lists accredited entities and the NFTs they own. A member appears in it only after the KYC request is approved. Anyone can open it without logging in. Search by entity name, entity ID or a Title ID, filter by Investor, Philanthropist or Bridge, and sort by Highest Ranking, Lowest Ranking, Name A-Z or Name Z-A. Six entities are shown per page.

The four counters at the top show Titles issued, Accredited entities with the number of jurisdictions, Public verifications and Protocol trust health. Titles issued and Accredited entities update live as members register, buy Titles or receive Awards.

Each card shows the entity name, type (Company or Individual), ID, number of NFTs owned, location, the number of Titles and Awards, the Title tags and the rank. Click "View profile" to open the entity's dossier with its Titles, Awards and a Share Dossier button that copies a link to the profile. A profile shows the first six Titles with a "Show all" button.

Ranking is based on the number of NFTs an entity owns, including Awards: more NFTs means a higher rank. When two entities have the same number, members of the platform are listed first. Revoked NFTs and NFTs in an unlinked wallet are not counted. The rank shown on your Dashboard is the same rank shown on your Directory card.`,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    text: `The bell icon at the top of the Dashboard lists what has happened to your account: Titles you received as gifts, Awards granted by PW, points added or deducted by an administrator and Titles that were revoked, newest first.

A red dot on the bell means there are notifications you have not read. Opening the panel marks them as read. New ones are tagged "New" until you reload the page.

When someone gifts you a Title you also see a notification screen the first time you log in afterwards; click "View my title" to go to your Dashboard.`,
  },
  {
    id: 'admin-portal',
    title: 'What PW administrators do',
    text: `PW administrators use the Admin Portal, which has five modules. KYC Review: approve or reject registration requests, check the declared headcount against the documents and change the Class with a reason. Grant Award: give a soulbound Award with a citation to a verified entity. Adjust Points: add or remove points to correct a balance, with a reason. Revoke NFT: revoke an NFT with a reason. Audit Logs: a read-only record of every administrative action.

The Audit Log shows the time, the signer node, the action type (for example KYC_APPROVE, GRANT_MINT, POINTS_ADJUST, NFT_REVOKE), the target entity, the reason and a transaction hash. Entries cannot be edited or deleted. It can be filtered by action type, signer and dates, searched, and exported as a CSV file.

Members cannot open admin pages. If you need a KYC decision, an Award, a points correction or a revocation, contact PW support.`,
  },
  {
    id: 'waitlist-launch',
    title: 'Waitlist before launch',
    text: `Before the platform opens for onboarding, institutions can join the waitlist on the PW landing page. Enter a work email (required) and optionally your full name, then click "Join Waitlist". You see "You're on the list!" and PW emails your invite when it opens.

If the email is already on the waitlist you see "This email is already on the waitlist. We'll email your invite when PW opens." An empty or invalid email shows an error under the field.`,
  },
  {
    id: 'troubleshooting',
    title: 'Common problems and fixes',
    text: `"This email is already registered. Log in instead." The email already has an account: log in, or use another email.

"Incorrect email or password." Check the email and password and try again.

I cannot buy a Title. Your KYC must be approved first. Check the status in the Dashboard header; if it is in review wait for the administrator, and if it is rejected re-submit with new documents.

A gift recipient cannot be selected. Recipients must have completed KYC. Entities without approved KYC are shown as not verified.

"This address is not valid. It must start with 0x and have 40 hex characters." Enter a full wallet address.

"The signature came from wallet … which does not match the address you entered." Sign with the wallet whose address you entered.

There is no Transfer button on my Title. The Title is an Award (soulbound), is revoked, or has already used its one transfer.

"Pay & issue Title" is disabled. Tick the Title Issuance Terms and the Legal Custody Agreement.

The Year-2 discount is not applied. You need an account at least 2 years old and at least 1,000 PTS.

My rank dropped. A Title was revoked or a wallet holding NFTs was unlinked; those NFTs no longer count.

An administrator cannot deduct more points than the balance. A balance never goes below zero.`,
  },
  {
    id: 'glossary',
    title: 'Glossary',
    text: `Title: a business recognition issued as an NFT: Philanthropist, Investor or Bridge. Award: a special honour granted by PW, soulbound and not transferable. NFT: the digital token that proves a Title or Award. Token ID: the unique code of one NFT.

Class: the pricing tier from 0 to 7, set by company headcount. KYC: Know Your Customer, the identity verification every member completes. PTS: reward points; one point is worth CHF 1 when used to pay.

PW wallet: the wallet PW creates and manages for you through Circle. Linked wallet: a wallet you own that you proved by signing a message. Soulbound: bound to its owner and cannot be transferred. Custody: who holds the keys of a wallet.

Dossier: the public profile of an entity in the Public Directory. Ranking: the position of an entity by number of NFTs owned. Citation: the text an administrator writes to justify an Award, shown on the public profile.`,
  },
  {
    id: 'about-assistant',
    title: 'About this assistant',
    text: `The PW assistant explains how this platform works and can look up your own account details when you are logged in. It cannot show information about other members.

The assistant reads live figures from the platform every time you ask, such as the number of Titles issued, your points, your rank and your Titles, so the answer reflects what you see on screen right now.

The assistant does not give investment, legal or tax advice and does not predict prices. For account-specific problems, or anything it cannot answer, contact PW support.`,
  },
];
