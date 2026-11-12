# Digital Khetala Hisab-Kitab: Bilingual Website Copy Master Reference
**Document Version:** 1.0.0  
**Target Sub-path:** `https://www.sauravkarki1.com.np/khetala/` (English) and `https://www.sauravkarki1.com.np/khetala/np/` (Nepali)  
**Target Platform:** Static HTML5 / CSS3 / Vanilla JavaScript on GitHub Pages  
**Audience:** Subagent 3 (Frontend Developer), Project Lead, and Reviewers  
**Language Availability:** English (Default) & Nepali / नेपाली (Devanagari)  

---

## 1. Executive Content Summary & Source-of-Truth Alignment

This document contains the complete, publication-grade, bilingual website copy for the official website of **Digital Khetala Hisab-Kitab** (डिजिटल खेताला हिसाब-किताब).

### 1.1 Strict Truthfulness & Zero-Fabrication Mandate
All copy is grounded exclusively in verified technical capabilities and authentic cultural realities documented in `DIGITAL_KHETALA_COMPLETE_PROJECT_CONTEXT.md` and the Flutter application codebase (`lib/l10n/app_en.arb`, `app_ne.arb`, `tables.dart`, `money.dart`, and passing automated test suites):
- **NO Invented Testimonials:** No fake quotes attributed to imaginary farmers.
- **NO Fabricated Metrics:** No inflated download counts (e.g. "Trusted by 100,000+ farms"). Real metrics used: 100% offline, integer paisa (1 NPR = 100 paisa), 351 automated tests, ~70.2 MB APK size, Android 6.0+ support.
- **NO Fake Partnerships:** No fabricated endorsements from government ministries or corporate sponsors.
- **Real Origin & Developer:** Created by Saurav Karki, software engineer from Birtamode, Jhapa, Koshi Province, Nepal (`sauravkarki279@gmail.com`).

### 1.2 Core Problem Solved
Smallholder farmers and labor contractors in Eastern Nepal (tea estates in Jhapa and Ilam, potato and cardamom farms in the hills) have traditionally tracked daily agricultural labor ("khetala") in pocket-sized paper notebooks.
1. **Monsoon Degradation:** Rain and field mud destroy paper notebooks, obliterating months of work and advance records.
2. **Advance Payment ("Peshki" / पेश्की) Disputes:** Workers take cash advances before Dashain or emergencies. When wage settlement arrives, memory lapses spark painful disputes.
3. **Fractional Units:** Tea picking is compensated by weight (kg), while field work is paid in full or partial days (0.5 day). Manual math leads to calculation errors and mutual distrust.
4. **Calendar Mismatch:** Standard accounting tools only support Gregorian dates (AD), while rural Nepal operates strictly in Bikram Sambat (वि.सं.).

---

## 2. Structured JSON Files for Direct Frontend Consumption

The website content is programmatically structured in two production JSON files ready for consumption by scripts or static site templates:
- **English Dictionary:** `khetala/content/en.json`
- **Nepali Dictionary:** `khetala/content/ne.json`
- **Release Manifest:** `khetala/downloads/version.json`

---

## 3. Bilingual Master Copy: English Version (`/khetala/`)

### 3.1 Metadata & SEO Headers
```html
<title>Digital Khetala Hisab-Kitab | Offline Agricultural Accounting for Nepal</title>
<meta name="description" content="Offline-first mobile accounting application for Nepali farmers and tea growers. Track daily labor (khetala), tea picking by kg, cash advances (peshki), and wage settlements in Bikram Sambat (वि.सं.) with exact integer paisa arithmetic.">
<meta name="keywords" content="khetala hisab kitab, nepali agricultural accounting, tea picking calculation, bikram sambat ledger, offline farm bookkeeping, peshki hisab, jhapa ilam agriculture app, saurav karki">
<link rel="canonical" href="https://www.sauravkarki1.com.np/khetala/">
<link rel="alternate" hreflang="en" href="https://www.sauravkarki1.com.np/khetala/">
<link rel="alternate" hreflang="ne" href="https://www.sauravkarki1.com.np/khetala/np/">
```

### 3.2 Navigation Bar
- **Brand Title:** Digital Khetala
- **Brand Subtitle:** Hisab-Kitab
- **Navigation Links:**
  - Why Digital (`#problem`)
  - Features (`#features`)
  - App Preview (`#showcase`)
  - How It Works (`#how-it-works`)
  - Install Guide (`#install`)
  - FAQ (`#faq`)
  - About (`#about`)
  - Contact (`#contact`)
- **Action Buttons:**
  - `Download APK` (`#install` or direct APK link)
  - `नेपाली` (Switch to `/khetala/np/`)

### 3.3 Hero Section
- **Eyebrow Badge:** `100% Offline Agricultural Accounting`
- **Main Headline:** No More Ruined Paper Registers. Exact, Dispute-Free Labor Accounting for Nepali Farms.
- **Subheadline:** Built specifically for Nepal's tea gardens, potato fields, and rural agricultural contractors. Record daily farm labor (khetala), weight-based tea harvesting, cash advances (peshki), and wage settlements—100% offline with native Bikram Sambat (वि.सं.) and exact paisa arithmetic.
- **Primary Call to Action:** Download Free APK (v1.0.0)
- **Secondary Call to Action:** Explore Core Features
- **Release Micro-Copy:** Free Android App • v1.0.0 • 70.2 MB • Zero Ads
- **Trust Badges:**
  1. *100% Offline Drift SQLite:* Runs in remote fields without cellular network or internet.
  2. *Exact Integer Paisa:* 1 NPR = 100 paisa arithmetic eliminates floating-point rounding errors.
  3. *Bikram Sambat (वि.सं.):* Native Nepali calendar with monthly ledger grouping from Baisakh to Chaitra.
  4. *Zero Ads & Private:* Your farm records stay strictly on your device; no monetization of your data.
- **Interactive Preview Card:**
  - Farm Name: *Karki Tea & Cardamom Estate (Birtamode, Jhapa)*
  - Worker: *Ram Bahadur Rai*
  - Task: *Green Leaf Tea Picking (24.5 kg @ रू 28/kg = रू 686.00)*
  - Payment: *रू 1,500 Cash Advance (पेश्की)*
  - Net Balance: *रू 814.00 Owed to Worker*
  - Calendar Tag: *२५ कार्तिक २०८३ (वि.सं.)*

### 3.4 Agricultural Problem vs Digital Solution (`#problem`)
- **Section Tag:** The Agricultural Reality
- **Section Title:** Why Paper Notebooks Fail Nepali Farms & How Digital Khetala Solves It
- **Description:** For generations, Nepali farm owners, tea garden managers, and village labor contractors have recorded khetala in pocket registers. Here is why handwritten registers cause financial loss and how Digital Khetala Hisab-Kitab eliminates wage disputes permanently.

| # | Real Problem in Nepali Agriculture | Digital Khetala Solution | Category |
|---|---|---|---|
| **01** | **Monsoon Rain & Damaged Registers:** Paper notebooks get soaked in sudden downpours, smeared with mud, or torn. A single lost page destroys months of attendance and advance records. | **Drift SQLite Local Storage:** All records are stored securely in internal flash storage. Never requires internet and can be backed up to an encrypted JSON file with one tap. | Durability |
| **02** | **Payday Advance (पेश्की) Disputes:** Workers take cash advances before Dashain, Tihar, or family emergencies. On payday weeks later, disagreements arise over how much cash was given. | **Immutable Timestamped Payment Records:** Payments are logged with whole rupees, timestamps, payment type (advance, wage, recovery), and an unalterable audit log. | Financial Integrity |
| **03** | **Fractional Calculations in Tea Picking:** Tea plucking is paid by weight (e.g. 17.5 kg at रू 26.50/kg) while plowing is paid in partial days (0.5 day). Manual pocket-calculator math creates rounding discrepancies. | **Exact Integer Paisa Arithmetic:** 1 NPR = 100 paisa arithmetic with arbitrary-precision decimal quantity calculations and BigInt half-up rounding. Zero floating point drift. | Mathematical Precision |
| **04** | **Verbal Disagreements at Final Settlement:** Reading handwritten scribbles with crossed-out lines creates tension and accusations of unfair accounting between owners and laborers. | **Printable A4 PDF Statements:** Instant official statements with 25-row pagination, itemized daily tasks, rates, payments, and running balances ready to print or WhatsApp. | Transparency |
| **05** | **Gregorian (AD) Calendar Mismatch:** Standard finance apps only support January-December. Nepali farming cycles and festival wage settlements run strictly in Bikram Sambat (वि.सं.). | **Native Bikram Sambat (वि.सं.) Engine:** Built-in Nepali date picker, month headers from Baisakh to Chaitra, and dual BS/AD date formatting powered by `nepali_utils`. | Cultural Fit |

### 3.5 The 8 Core Verified Systems (`#features`)
- **Section Tag:** Engineered for Fieldwork
- **Section Title:** 8 Core Verified Systems Built for Real Agricultural Conditions
- **Description:** Every capability is implemented in production code, verified with 351 automated tests, and tuned for instant performance on budget Android smartphones in rural Nepal.

1. **100% Offline Drift SQLite Engine:**
   Every worker, attendance entry, rate override, and cash payment is stored locally on your device in a high-performance SQLite database with full foreign key constraints (`PRAGMA foreign_keys = ON`). Zero dependence on cellular network or mobile data. Sub-millisecond latency with Write-Ahead Logging (WAL) preventing data loss during sudden battery drain.
2. **Exact Integer Paisa Arithmetic:**
   Money is never stored as floating-point numbers (`double`). Every monetary figure is tracked as integer paisa (1 Nepalese Rupee = 100 paisa). Eliminates cumulative IEEE-754 precision drift. Decimal quantities (e.g., 23.75 kg) use BigInt unscaled arithmetic with half-up rounding to the nearest paisa.
3. **Native Bikram Sambat (वि.सं.) Calendar & Ledger:**
   Manage your farm ledger according to the official calendar of Nepal. Custom offline BS date picker covering past, present, and future agricultural seasons. Worker ledgers automatically group entries chronologically by Nepali year and month (Baisakh through Chaitra) with dual BS/AD display.
4. **Worker Profiles & Date-Effective Rate Overrides:**
   Register regular and seasonal workers with name, phone number, address, and opening balances. Set default rates per task (e.g. Tea Picking: रू 28/kg, Plowing: रू 850/day). Configure worker-specific rate overrides with custom validity windows (e.g., tractor operators or senior pickers).
5. **Historical Rate Immutability & Audited Voids:**
   If you change a task's default rate midway through the season, past work entries are never recomputed. Silent deletion is strictly prevented: erroneous entries are marked with status `voided` with a mandatory reason, appending an immutable `AuditEvent` capturing complete before-and-after JSON snapshots.
6. **Professional A4 PDF Worker Statements:**
   Generate clean, official, printable PDF account statements for any worker with a single tap. Formatted specifically for standard A4 printing with 25-row chunking to effortlessly handle multi-month ledgers without memory crashes. Share directly via WhatsApp or print wirelessly.
7. **Twice-Daily Offline Field Reminders:**
   Configured for 5:00 PM (end of field shift) and 8:00 PM (post-dinner review). 100% offline local notifications that trigger reliably without internet or cell service, asking to verify today's khetala entries so no labor is forgotten.
8. **Optional Same-Account Cloud Sync & Conflict Resolution:**
   For households where one member records work in the village and another manages finances in town, optional Cloud Firestore synchronization keeps devices updated. Batched uploads and incremental pulls preserve mobile data and battery life, with side-by-side visual conflict resolution at `/conflicts`.

### 3.6 Application Showcase & Screenshots (`#showcase`)
- **Screen 1: Farm Dashboard:** Instant summary cards displaying active workers, total outstanding wages owed, total cash advances paid out, and rapid one-tap action buttons.
- **Screen 2: Daily Work Entry:** Select worker, pick task, choose attendance type (Full Day, Partial Day, or Manual), enter quantity, and inspect live earnings calculation.
- **Screen 3: Date-Wise Nepali Ledger:** Chronological accounting ledger grouped by Nepali month. Inspect every work day, harvested weight, cash advance, and running balance row by row.
- **Screen 4: A4 PDF Statement Export:** Export high-resolution printable PDF statements formatted with 25 rows per page, complete header details, farm name, and itemized accounts.

### 3.7 Step-by-Step Workflow (`#how-it-works`)
1. **Add Workers & Set Task Rates:** Create profiles for your regular or seasonal workers. Configure default rates for common tasks like tea plucking (रू/kg), plowing, digging, or daily labor (रू/day).
2. **Log Daily Work & Attendance:** When the field shift ends at 5:00 PM, open the app, pick each worker, and enter their hours or harvested kilograms. Earnings calculate immediately down to the paisa.
3. **Record Advance Payments (Peshki):** Whenever handing cash to a worker before festivals or for medical needs, log the whole rupee amount instantly. The ledger updates the worker's balance on the spot.
4. **Settle Wages with 1-Tap PDF Statements:** On settlement day, open the worker's ledger, review their net balance, and generate an official A4 PDF statement. Print it or share it digitally with zero disagreements.

### 3.8 Android APK Installation Guide (`#install`)
- **Step 1: Download the Official APK:** Tap the 'Download APK' button on this website from your Android smartphone browser to download `Hisab-Kitab-release.apk` (70.2 MB).
- **Step 2: Accept Browser Download Notice:** Android will display a standard notification: "File might be harmful. Do you want to download Hisab-Kitab-release.apk anyway?". Tap "Download anyway".
- **Step 3: Open the Downloaded File:** Once the download completes, tap the download notification or open your phone's Downloads folder and tap `Hisab-Kitab-release.apk`.
- **Step 4: Allow Installation from Unknown Sources:** If prompted with "For your security, your phone is not allowed to install unknown apps from this source", tap Settings and toggle "Allow from this source" ON, then tap Back.
- **Step 5: Complete Installation & Open:** If Google Play Protect displays "Unrecognized app", tap "More details" and select "Install anyway". Tap "Open" to begin!
- **Security Checksum:** Official APK SHA-256: `670b6c4787ee67676e30de68e2a7bb533c902fa54f585aed8bc617461e8d00dc`.
- **Zero Invasive Permissions Reassurance:** Requests only Notifications (for 5 PM / 8 PM reminders) and Storage (to save PDF statements and JSON backups). Never accesses camera, contacts, microphone, or GPS.

### 3.9 Frequently Asked Questions (`#faq`)
1. **Does Digital Khetala Hisab-Kitab require an internet connection to work?**  
   *Answer:* No. The application is 100% offline-first. All worker profiles, attendance records, task rates, payments, and running balances are saved directly into your phone's local SQLite database. You can use every core feature in remote fields with zero cell signal.
2. **Is the app completely free to use? Are there hidden fees or subscriptions?**  
   *Answer:* Yes, Digital Khetala Hisab-Kitab is completely free to download and use. There are no monthly subscriptions, no locked features, no paid tiers, and zero third-party advertisements.
3. **What happens if my phone restarts, runs out of battery, or has no SIM card?**  
   *Answer:* Your data remains completely safe. The local database uses SQLite with Write-Ahead Logging (WAL) and strict foreign key integrity. As soon as you save an entry, it is permanently written to physical flash memory. It does not disappear when your phone reboots or loses power.
4. **How does the app handle fractional work, such as tea picking in kilograms or half-day labor?**  
   *Answer:* The app natively supports fractional quantities. When recording tea harvesting, you can enter exact weights such as 18.75 kg. For daily labor, you can choose 'Partial Day' and enter 0.5. The engine multiplies the quantity by the applicable rate using integer paisa BigInt arithmetic and rounds half-up to the nearest paisa.
5. **What is 'Paisa Accuracy' and why does it matter?**  
   *Answer:* Standard computer spreadsheets and calculator apps use floating-point numbers (`double`), which accumulate subtle binary rounding errors (e.g. 0.1 + 0.2 = 0.30000000000000004). Over hundreds of daily entries, this creates discrepancies between paper registers and digital totals. Digital Khetala stores all money as exact integers in paisa (1 NPR = 100 paisa), eliminating math errors entirely.
6. **Can I use the Nepali Bikram Sambat (वि.सं.) calendar?**  
   *Answer:* Yes. Digital Khetala Hisab-Kitab features a native offline Bikram Sambat date picker. Your entire worker ledger is chronologically grouped by Nepali agricultural months (Baisakh, Jestha, Ashadh, etc.), matching exactly how farm labor and festival pay cycles operate in Nepal.
7. **What if I make a mistake when entering a payment or work entry? Can I delete it?**  
   *Answer:* To preserve financial honesty and prevent covert tampering, the app uses 'Audited Voids' instead of silent deletion. When you void an entry, you must supply a reason (e.g. 'Duplicate entry'). The record is marked void, its amount is immediately removed from the worker's balance, and a permanent before-and-after snapshot is recorded in the system audit log.
8. **Can multiple family members use the app across different phones?**  
   *Answer:* Yes. If you sign in to the same Google or Email account on two devices, the app uses Cloud Firestore to sync records automatically whenever internet connectivity is available. If an entry is modified on both devices simultaneously, the app flags the record and provides a side-by-side visual conflict resolution screen at `/conflicts`.
9. **How can I back up my data without using the internet?**  
   *Answer:* In the Settings screen, you can tap 'Export Backup' at any time. The app generates an encrypted, human-readable JSON backup file stamped with a SHA-256 checksum and saves it to your phone's storage. You can transfer this file to an SD card, a computer, or send it to your email.
10. **Is my farm's financial data private and secure?**  
    *Answer:* Yes, absolutely. By default, your data never leaves your device. If you optionally enable cloud sync, all records are stored in Google Cloud Firestore protected by strict security rules that isolate your household data from all other users. We never sell, track, analyze, or monetize your farm financial data.
11. **How do I share a wage statement with a worker?**  
    *Answer:* Open the worker's profile, select 'Generate Statement (PDF)', choose the date range (e.g. this month or all-time), and preview the statement. You can tap 'Share' to send the PDF directly to the worker via WhatsApp or Bluetooth, or connect to any wireless printer for physical paper copies.
12. **Why does Android warn that the file 'might be harmful' when I download the APK?**  
    *Answer:* Android displays this generic security warning for any application downloaded directly from a web browser instead of the Google Play Store. It is a standard operating system notice. Our APK is 100% clean, built with official Android SDKs, and contains no malicious code or trackers.
13. **Can I set different daily wage rates for different workers?**  
    *Answer:* Yes. While each task has a default rate (e.g. Daily Labor at रू 800), you can configure 'Rate Overrides' for specific workers. For instance, a tractor driver or senior worker can be assigned रू 1,000/day, which will automatically apply whenever you record work for them.
14. **If I update a crop rate midway through the season, will past records change?**  
    *Answer:* No. The application enforces historical rate immutability. When you record a work entry, the applicable rate and computed earnings are stamped permanently onto that entry. Updating default rates tomorrow will only apply to future work entries.

### 3.10 About the Developer & Project (`#about`)
- **Section Tag:** Origin & Purpose
- **Section Title:** Created for the Hardworking Agricultural Community of Nepal
- **Subtitle:** Born in the tea-growing heartland of Eastern Nepal to protect farm owners and daily laborers from record loss and bitter wage disputes.
- **Narrative:**
  In Nepal's agricultural belt—from the emerald tea gardens of Jhapa, Ilam, and Panchthar to the terraced potato and maize fields of the mid-hills—farm labor management has relied on the same fragile tool for over half a century: pocket-sized paper registers (खता/कापी).
  
  Every monsoon season brings the same recurring hardship. Heavy downpours soak notebooks in the field. Pages smudge with mud or tear apart during transport. Worse still, cash advances (पेश्की) handed to workers before major festivals like Dashain and Tihar are often jotted down on loose corners. When settlement day arrives months later, misplaced notes spark painful disagreements between families who have worked together for generations.
  
  Digital Khetala Hisab-Kitab was engineered by Saurav Karki, a software engineer born and raised in Birtamode, Jhapa. Having witnessed these exact struggles firsthand among local tea growers and agricultural families, Saurav set out to build a tool that truly respects the realities of rural Nepal.
  
  This is not an overcomplicated Silicon Valley SaaS app that requires fast 5G data or credit cards. It is an honest, offline-first agricultural ledger: 100% functional without internet, calculating to the exact paisa, speaking fluent Nepali in Bikram Sambat (वि.सं.), and empowering farmers with the clarity and dignity of modern technology.
- **Developer Details:**
  - Name: Saurav Karki
  - Role: Creator & Lead Software Engineer
  - Location: Birtamode, Jhapa, Koshi Province, Nepal
  - Email: `sauravkarki279@gmail.com`
  - GitHub: `https://github.com/saurav-karki1`
  - Portfolio: `https://www.sauravkarki1.com.np/`

### 3.11 Developer Contact & Feedback (`#contact`)
- **Title:** Developer Contact & Agricultural Feedback
- **Subtitle:** Have feedback, need assistance setting up the app, or want to suggest new features for Nepali farming? Reach out directly.
- **Direct Email:** `sauravkarki279@gmail.com`
- **Location:** Birtamode, Jhapa, Koshi Province, Nepal
- **Contact Form Fields:**
  - Name: `Your Name`
  - Email or Phone: `Your Email or Phone (e.g. 9800000000)`
  - Farm Type / Location: `e.g. Tea garden in Ilam / Potato farm in Jhapa`
  - Message: `Describe your experience, question, or feature suggestion...`
  - Action: `Send Message`

---

## 4. Bilingual Master Copy: Nepali Version (`/khetala/np/`)

### 4.1 Metadata & SEO Headers
```html
<title>डिजिटल खेताला हिसाब-किताब | नेपाली किसानका लागि अफलाइन डिजिटल खता</title>
<meta name="description" content="नेपालका चिया बगान, खेतबारी र कृषि ठेकेदारहरूका लागि अफलाइन मोबाइल एप। खेतालाको दैनिक हाजिरी, किलो अनुसारको चिया टिपाई, पेश्की र ज्याला भुक्तानीको हिसाब वि.सं. पात्रो र पैसा स्तरको शुद्धता सहित राख्नुहोस्।">
<meta name="keywords" content="डिजिटल खेताला हिसाब किताब, नेपाली कृषि हिसाब, चिया टिपाई हिसाब, वि सं पात्रो खता, अफलाइन बहीखाता, पेश्की हिसाब, झापा इलाम कृषि एप, सौरव कार्की">
<link rel="canonical" href="https://www.sauravkarki1.com.np/khetala/np/">
<link rel="alternate" hreflang="en" href="https://www.sauravkarki1.com.np/khetala/">
<link rel="alternate" hreflang="ne" href="https://www.sauravkarki1.com.np/khetala/np/">
```

### 4.2 Navigation Bar
- **ब्राण्ड नाम:** डिजिटल खेताला हिसाब-किताब
- **मेनु लिङ्कहरू:**
  - कापी किन असफल? (`#problem`)
  - मुख्य सुविधाहरू (`#features`)
  - एपको झलक (`#showcase`)
  - कसरी चल्छ? (`#how-it-works`)
  - इन्स्टल गाइड (`#install`)
  - प्रश्नोत्तर (FAQ) (`#faq`)
  - हाम्रो कथा (`#about`)
  - सम्पर्क (`#contact`)
- **बटनहरू:**
  - `APK डाउनलोड` (`#install` वा डाउनलोड लिंक)
  - `English` (`/khetala/` मा जानका लागि)

### 4.3 Hero Section (मुख्य परिचयात्मक खण्ड)
- **ब्याज:** `इन्टरनेट नचाहिने शतप्रतिशत अफलाइन कृषि हिसाब-किताब`
- **मुख्य शीर्षक:** भिजेका कापी र ज्यालाको विवाद अब सधैंका लागि बन्द। नेपाली किसानका लागि आधुनिक डिजिटल खता।
- **उपशीर्षक:** नेपालका चिया बगान, आलु खेती र ग्रामीण कृषि ठेकेदारहरूका लागि विशेष रूपमा निर्मित। खेतालाको दैनिक हाजिरी, किलो अनुसारको चिया टिपाई, पेश्की र ज्याला भुक्तानीको हिसाब अब मोबाइलमै। इन्टरनेट बिना १००% अफलाइन चल्ने, वि.सं. पात्रो र पैसा शुद्धता भएको भरपर्दो एप।
- **प्रमुख कार्य (CTA):** निशुल्क APK डाउनलोड गर्नुहोस् (v१.०.०)
- **दोस्रो कार्य:** मुख्य सुविधाहरू हेर्नुहोस्
- **संस्करण जानकारी:** निशुल्क एन्ड्रोइड एप • संस्करण १.०.० • ७०.२ MB • विज्ञापनरहित
- **विश्वासका ४ आधारहरू (Trust Badges):**
  1. *१००% अफलाइन SQLite डाटाबेस:* नेटवर्क नटिप्ने दुर्गम खेतबारी र चिया बगानमा इन्टरनेट बिना निर्बाध चल्ने।
  2. *पैसा स्तरको गणितीय शुद्धता:* १ रुपैयाँ = १०० पैसाको पूर्णाङ्क हिसाब, शून्य दशमलव वा फ्लोटिंग-पोइन्ट त्रुटि।
  3. *नेपाली वि.सं. पात्रो र महिनाबारी खता:* बैशाखदेखि चैतसम्मका नेपाली महिना अनुसार दैनिक हाजिरी र खता व्यवस्थापन।
  4. *विज्ञापनरहित र पूर्ण सुरक्षित:* तपाईंको खेतको आर्थिक विवरण फोनमै सुरक्षित रहन्छ, कुनै व्यावसायिक बिक्री हुँदैन।
- **नमुना खता कार्ड (Interactive Preview):**
  - बगान/खेतको नाम: *कार्की चिया तथा अलैँची बगान (बिर्तामोड, झापा)*
  - कामदारको नाम: *रामबहादुर राई*
  - कामको विवरण: *हरियो चिया पत्ती टिपाई (२४.५ किलो @ रू २८/केजी = रू ६८६.००)*
  - दिएको पेश्की: *रू १,५०० पेश्की भुक्तानी*
  - बाँकी हिसाब: *रू ८१४ कामदारलाई बाँकी*
  - मिति: *२५ कार्तिक २०८३ (वि.सं.)*

### 4.4 वास्तविक कृषि समस्या र डिजिटल समाधान (`#problem`)
- **खण्ड परिचय:** वास्तविक कृषि समस्या र समाधान
- **शीर्षक:** कापी र बहीखाता किन नेपाली कृषिको भरपर्दो साथी हुन सक्दैनन्?
- **विवरण:** पुस्ताौंदेखि नेपाली किसान, चिया उत्पादक र कृषि ठेकेदारहरूले ससाना गोजी कापीमा खेतालाको हिसाब राख्दै आएका छन्। तर यिनै कापीहरूले गर्दा हुने आर्थिक नोक्सानी र त्यसको आधुनिक समाधान यहाँ प्रस्तुत छ।

| # | परम्परागत कापीको समस्या | डिजिटल खेतालाको आधुनिक समाधान | वर्ग |
|---|---|---|---|
| **०१** | **वर्षातको पानी र हिलोले कापी भिज्ने वा च्यातिने:** खेतबारी र चिया बगानमा अचानक पानी पर्दा खल्तीको कापी भिज्छ वा पाना च्यातिन्छ। एउटा पाना नष्ट हुँदा महिनौंदेखिको हाजिरी र पेश्कीको प्रमाण हराउँछ। | **ड्रिफ्ट एसक्यूलाइट (Drift SQLite) डाटाबेस:** सबै विवरण तपाईंको फोनको आन्तरिक मेमोरीमा सुरक्षित रहन्छ। इन्टरनेट चाहिँदैन र एक ट्यापमै सुरक्षित ब्याकअप निकाल्न सकिन्छ। | सुरक्षा र स्थायित्व |
| **०२** | **दशैं-तिहार र ज्याला भुक्तानीमा पेश्कीको विवाद:** कामदारहरूले चाडपर्व वा आपतविपतमा पेश्की (Advance) लिन्छन्। तर महिनापछि हिसाब गर्दा कति दिइएको थियो भन्नेमा प्रायः ठूलो भनाभन हुन्छ। | **प्रमाणीकृत भुक्तानी प्रविष्टि:** प्रत्येक भुक्तानी (नियमित ज्याला, पेश्की वा फिर्ता) मिति र समय सहित दर्ता हुन्छ। अडिट लग बस्ने भएकाले कुनै विवादको ठाउँ रहँदैन। | आर्थिक स्वच्छता |
| **०३** | **चियाको किलो र आधा दिनको हिसाबमा गडबडी:** चिया टिपाई तौल अनुसार हुन्छ (जस्तै १७.५ किलो प्रति किलो रू २६.५० का दरले) भने जोतखन वा गोडमेल दिनको हिसाबमा (०.५ दिन) हुन्छ। क्यालकुलेटर वा हातले हिसाब गर्दा दशमलवको फरक पर्छ। | **पैसा स्तरको पूर्णाङ्क गणितीय शुद्धता:** पैसा स्तरको पूर्णाङ्क गणित (१ रुपैयाँ = १०० पैसा) र बिग-इन्ट (BigInt) राउन्डिङ प्रविधि। कुनै पनि फ्लोटिंग-पोइन्ट त्रुटि बिना एक पैसाको पनि तलमाथि नहुने शुद्ध हिसाब। | गणितीय शुद्धता |
| **०४** | **हिसाब चुक्ता गर्दा केरमेट र अविश्वास:** सिजनको अन्त्यमा हिसाब चुक्ता गर्दा कापीमा कोरिएका केरमेट र अस्पष्ट अक्षरले गर्दा किसान र कामदार बीच असमझदारी र मनमुटाव सिर्जना हुन्छ। | **आधिकारिक A4 PDF विवरण:** एक ट्यापमै २५ हरफ प्रति पृष्ठ भएको सफा कामदार हिसाब विवरण PDF उत्पन्न गर्नुहोस्। प्रिन्ट गरेर दिन वा सिधै ह्वाट्सएपमा पठाउन सकिन्छ। | पारदर्शिता |
| **०५** | **विदेशी पात्रो (ई.सं.) र नेपाली महिना नमिल्ने समस्या:** बजारमा पाइने विदेशी हिसाब एपहरू जनवरी-डिसेम्बरमा चल्छन्। तर नेपालको खेतीपाती र गाउँघरको ज्याला बैशाखदेखि चैतसम्मका नेपाली महिनामा मात्र चल्दछ। | **नेपाली वि.सं. (Bikram Sambat) इन्जिन:** नेपाली वि.सं. पात्रो, नेपाली मिति छनोटकर्ता र बैशाखदेखि चैतसम्मका महिनाबारी खताहरू नेपालीमै उपलब्ध। | नेपाली पहिचान |

### 4.5 ८ प्रमाणित प्राविधिक प्रणालीहरू (`#features`)
1. **१००% अफलाइन ड्रिफ्ट एसक्यूलाइट (Drift SQLite) डाटाबेस:**  
   प्रत्येक कामदारको नाम, ठेगाना, दैनिक हाजिरी, तोकिएको दर, र नगद भुक्तानी तपाईंको आफ्नै फोनको स्थानीय डाटाबेसमा पूर्ण रूपमा सुरक्षित रहन्छ। नेटवर्क नटिप्ने दुर्गम खेतबारीमा पनि तुरुन्त खुल्छ र फोनको ब्याट्री सकिएर बन्द भए पनि विवरण सुरक्षित राख्ने WAL प्रविधि जडित छ।
2. **पैसा स्तरको पूर्णाङ्क गणितीय शुद्धता:**  
   डिजिटल खेताला हिसाब-किताबमा रकमलाई कहिल्यै पनि दशमलव (double) मा राखिँदैन। प्रत्येक कारोबार पैसाको पूर्णाङ्कमा (१ रुपैयाँ = १०० पैसा) गणना गरिन्छ। दशमलव गडबडी (IEEE-754) को स्थायी अन्त्य, र चियाको तौलमा पैसाको आधा-माथि (half-up) गणितीय नियम लागू हुन्छ।
3. **नेपाली वि.सं. (Bikram Sambat) पात्रो र महिनाबारी खता:**  
   नेपालको राष्ट्रिय पात्रो अनुसार आफ्नो खेतीको हिसाब राख्नुहोस्। विगत, वर्तमान र आगामी सबै वर्षहरू समेट्ने नेपाली मिति छनोटकर्ता। कामदारको खता बैशाखदेखि चैतसम्मका नेपाली महिनाहरूमा स्वतः विभाजन हुने र वि.सं. तथा ई.सं. दुवै मिति प्रदर्शन हुने।
4. **कामदार प्रोफाइल र विशेष दर (Rate Overrides) व्यवस्थापन:**  
   कामदारको नाम, फोन नम्बर, ठेगाना र पुरानो कापीबाट सरेको सुरुवाती ब्यालेन्स सजिलै दर्ता गर्नुहोस्। प्रत्येक कामको पूर्वनिर्धारित दर तोक्ने (जस्तै चिया टिपाई रू २८/केजी, जोतखन रू ८५०/दिन) र दक्ष कामदारका लागि निश्चित अवधिका लागि विशेष दर तोक्ने व्यवस्था।
5. **अपरिवर्तनीय दर र पारदर्शी अडिट लग (Audited Voids):**  
   हिसाबमा कहिल्यै बेइमानी हुन सक्दैन। यदि भोलि कामको दर परिवर्तन गरियो भने पनि विगतमा रेकर्ड गरिएको कमाई जस्ताको तस्तै सुरक्षित रहन्छ। चुपचाप रेकर्ड मेटाउन पूर्ण निषेध गरिएको छ; गलत भएमा कारण खुलाएर 'रद्द' गर्नुपर्छ जसको अडिट लग बस्दछ।
6. **आधिकारिक ए-फोर (A4) कामदार हिसाब विवरण PDF:**  
   कुनै पनि कामदारको पूरा हिसाब विवरण एक ट्यापमै प्रिन्ट गर्न मिल्ने सफा PDF का रूपमा प्राप्त गर्नुहोस्। साधारण A4 कागजमा प्रिन्ट गर्न मिल्ने ढाँचा, धेरै महिनाको लामो हिसाब भए पनि प्रति पृष्ठ २५ हरफ मिलाएर सहजै खुल्ने र ह्वाट्सएपमा सेयर गर्न सकिने।
7. **दैनिक साँझ ५:०० र रात ८:०० बजेको अफलाइन सम्झना:**  
   खेतको काम सकिने समय साँझ ५:०० र खानापछिको रात ८:०० बजे सम्झाउने शतप्रतिशत स्थानीय अफलाइन नोटिफिकेसन। आजको खेतालाको हिसाब भर्न विनम्र नेपाली भाषामा सम्झना गराउँछ।
8. **एउटै खाता क्लाउड सिङ्क र विवाद समाधान:**  
   घरको एक जनाले गाउँको खेतमा हाजिरी भर्ने र अर्कोले सहरबाट हिसाब हेर्ने परिवारका लागि सुरक्षित क्लाउड सिङ्कको व्यवस्था। दुईवटा फोनबाट एउटै कामदारको विवरण एकैपटक फेरिएमा `/conflicts` स्क्रिनमा हेरेर सही छनोट गर्न सकिन्छ।

---

## 5. Privacy Policy & Terms of Service Copy

### 5.1 Privacy Policy (`privacy.html` / Privacy Copy)
- **Effective Date:** November 10, 2026 (कार्तिक २५, २०८३)
- **Entity:** Saurav Karki, Birtamode, Jhapa, Nepal (`sauravkarki279@gmail.com`)
- **Key Principles:**
  1. *Local-First SQLite Storage:* All data remains on the user's phone flash storage by default. No data is transmitted to external servers without explicit user login.
  2. *Optional Google Cloud Firestore Sync:* Enabled only when users choose to sign in to enable multi-device review within their own household. Protected by strict Firestore security rules (`/households/{householdId}/*`).
  3. *Zero Commercial Monetization:* No selling of data, no tracking, no profiling, no third-party advertisements.
  4. *Minimal Permissions:* Only `POST_NOTIFICATIONS` (offline daily reminders) and local storage access (for PDF statements and JSON backups).
  5. *Data Deletion Rights:* Local database can be wiped at any time. Cloud account purge requests handled within 7 business days via `sauravkarki279@gmail.com`.

### 5.2 Terms of Service (`terms.html` / Terms Copy)
- **Effective Date:** November 10, 2026 (कार्तिक २५, २०८३)
- **Entity:** Saurav Karki, Birtamode, Jhapa, Nepal
- **Key Terms:**
  1. *Agricultural Bookkeeping Utility:* Provided free of charge for personal and agricultural business bookkeeping.
  2. *User Responsibility for Backups:* Users are responsible for their device hardware and exporting regular JSON backups.
  3. *Disclaimer of Formal Accounting Advice:* The software is a mathematical tool and does not replace formal legal, tax, or accounting advice. Wage agreements are governed by mutual consent and the laws of Nepal.
  4. *Warranty Disclaimer:* Provided "as is" with zero implied warranties.
  5. *Governing Jurisdiction:* Laws of Nepal; jurisdiction of the courts of Jhapa District, Nepal.

---

## 6. Official Release Manifest: v1.0.0+1 (`version.json`)

```json
{
  "app_name": "Digital Khetala Hisab-Kitab",
  "app_name_ne": "डिजिटल खेताला हिसाब-किताब",
  "package_name": "com.khetala.digital_khetala_hisab_kitab",
  "latest_version": "1.0.0",
  "build_number": 1,
  "version_code": 1,
  "release_date": "2026-11-10",
  "apk_filename": "Hisab-Kitab-release.apk",
  "file_size_bytes": 73613879,
  "file_size_mb": 70.2,
  "min_android_sdk": 23,
  "min_android_version": "Android 6.0 (Marshmallow)",
  "target_android_sdk": 34,
  "download_url": "https://github.com/saurav-karki1/portfolio-website/releases/download/v1.0.0/Hisab-Kitab-release.apk",
  "apk_sha256": "670b6c4787ee67676e30de68e2a7bb533c902fa54f585aed8bc617461e8d00dc",
  "force_update": false
}
```

---

## 7. Frontend Integration Guidelines for Subagent 3

1. **Routing & Directory Structure:**
   - English Landing Page: `/khetala/index.html`
   - Nepali Landing Page: `/khetala/np/index.html`
   - Privacy Policy: `/khetala/privacy.html`
   - Terms of Service: `/khetala/terms.html`
   - Downloads & Version Check: `/khetala/downloads/version.json`
2. **Devanagari Font Loading:**
   Preconnect to Google Fonts and load `Plus Jakarta Sans` for Latin characters alongside `Mukta` and `Noto Sans Devanagari` for Nepali script:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
   ```
3. **Language Persistence:**
   Store user language selection in `localStorage.setItem('khetala_preferred_lang', 'ne')`. When a user visits `/khetala/` with Nepali preferred, provide an unobtrusive banner or toggle to jump directly to `/khetala/np/`.
4. **Color Tokens Reference:**
   - Primary Agricultural Green: `#1E6F43` (Brand Accent / Dark Green)
   - Harvest Amber: `#D97706` (Accent / Gold)
   - Background Surface (Light): `#F8FAF7` (Crisp Tea Leaf Tone)
   - Deep Forest Obsidian (Dark Surfaces): `#0D2B1B` and `#121A15`
