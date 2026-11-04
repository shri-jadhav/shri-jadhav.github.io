# Shripad Jadhav — Cybersecurity & Cloud Security Portfolio

A clean, minimalist, humanized, and high-performance portfolio website engineered for **Shripad Jadhav**, Cybersecurity undergraduate at NMIMS Mumbai specializing in Cloud Security, Detection Engineering, and SOC Operations.

Live Preview & Deployable to **GitHub Pages**, **Vercel**, or **Netlify**.

---

## ✨ Features & Architecture

- **Clean & Minimalist Light Theme (Default):** Crisp typography (`Plus Jakarta Sans` & `JetBrains Mono`), high-contrast readability, generous whitespace, and subtle elevations without visual bloat.
- **Stealth SOC Dark Mode:** Interactive 1-click toggle for night-time / SOC room aesthetics, persistent in `localStorage`.
- **Humanized Engineering Ethos:** Authentic "How I Approach Security" section detailing fail-closed posture verification, correlation vs noise, and adversary-centric defense.
- **Interactive SOC Terminal (`SOC-CLI`):** Fully interactive browser terminal supporting commands (`help`, `bio`, `projects`, `threats`, `mitre`, `skills`, `certs`, `contact`, `clear`) with quick execution chips.
- **Selected Security Projects:**
  - **VYRA (AWS Cloud Security Workbench):** Read-only fail-closed STS caller validation, 4 blocking Terraform plan gates, SARIF 2.1.0 export, Ruff & Bandit linting.
  - **Wazuh SOC Homelab (SIEM & Detection Engineering):** TLS Windows event streaming (4624, 4625, 4728), 6 MITRE correlation rules, 37 unit tests, and 10-scenario synthetic adversary benchmark.
  - **DrainSentinel (AWS Serverless Risk Platform):** FastAPI on Lambda, DynamoDB KMS + PITR, private S3 presigned URLs, AWS SAM, 33 pytest tests.
  - **ZeroGate Cloud (Zero Trust & Cloud Identity):** NIST SP 800-207 aligned, AWS IAM OIDC federated roles (zero static keys), OPA/Conftest CI checks.
- **Project Deep-Dive Modals:** Detailed architecture walkthroughs and direct GitHub source code links.
- **Threat Analysis Reports Grid:** Investigations into *Microsoft Midnight Blizzard (2024)*, *Change Healthcare Ransomware (2024)*, and *Colonial Pipeline (2021)* with direct links to the `soc-incident-reports` repository.
- **Interactive MITRE ATT&CK Matrix Explorer:** Clickable technique matrix (T1110, T1110.003, T1621, T1078, T1003, T1210) displaying data sources, detection logic, and homelab validation.
- **Hands-On SOC Capstone:** Complete breakdown of the LaunchED Global Tier-2 SOC internship (host hardening, Wireshark PCAP malware traffic analysis, Splunk Conti ransomware kill chain).
- **One-Click Contact & Form:** Instant copy for email/phone with feedback toast, plus a pre-filling email form.
- **ATS-Friendly Printable CV:** Clean standalone CV view (`resume.html`) with print-to-PDF formatting.
- **Zero Heavy Dependencies:** Pure HTML5, modern modular CSS, and vanilla ES6+ JS. Loads in milliseconds and scores 100/100 on Lighthouse.

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser by double clicking it.

Or run a local development server using Node.js:

```bash
# Start local server at http://localhost:3000
npm start
```

Or using Python:

```bash
python -m http.server 3000
```

---

## 🌐 Instant Deployment Instructions (Runs Directly on the Internet)

### Option 1: GitHub Pages (Recommended & 100% Free)

Since your GitHub username is **`shri-jadhav`**:

1. **Initialize Git and commit the files:**
   ```bash
   git init
   git add .
   git commit -m "feat: initial cybersecurity portfolio release"
   git branch -M main
   ```

2. **Create a new repository on GitHub:**
   - Go to [https://github.com/new](https://github.com/new)
   - Repository name: **`shri-jadhav.github.io`** (for root domain) OR **`portfolio`**
   - Make it **Public**
   - Do **NOT** initialize with README or license (we already have them)

3. **Push your code:**
   ```bash
   # If you named the repo shri-jadhav.github.io:
   git remote add origin https://github.com/shri-jadhav/shri-jadhav.github.io.git
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - In your GitHub repo, go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Source**, select **GitHub Actions** (the included `.github/workflows/deploy.yml` will automatically build and publish).
   - Your site will be live at:
     👉 **`https://shri-jadhav.github.io`**

---

### Option 2: Vercel (1-Click or CLI)

1. Run:
   ```bash
   npx vercel
   ```
2. Follow the 2-step prompt. It deploys instantly to a free `.vercel.app` URL with automatic SSL.

---

### Option 3: Netlify (Drag & Drop or CLI)

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop this folder (`d:\prf`).
3. Your site is live immediately!

---

## 📂 Project Structure

```
.
├── index.html                  # Main portfolio website
├── resume.html                 # ATS-friendly printable CV view
├── package.json                # Project scripts
├── vercel.json                 # Vercel configuration & security headers
├── netlify.toml                # Netlify configuration & security headers
├── README.md                   # Documentation & deployment guide
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions automated Pages deployment
├── css/
│   └── style.css               # Bespoke design system & styling
└── js/
    └── main.js                 # Terminal, MITRE explorer, modals & themes
```

---

## 👤 Author

**Shripad Jadhav**
- Email: [shripadjadhav1979@gmail.com](mailto:shripadjadhav1979@gmail.com)
- GitHub: [https://github.com/shri-jadhav](https://github.com/shri-jadhav)
- Location: Mumbai, Maharashtra, India
