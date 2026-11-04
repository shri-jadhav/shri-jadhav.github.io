/**
 * Shripad Jadhav - Cybersecurity & Cloud Security Portfolio
 * Interactive Functionality: Terminal, MITRE Explorer, Filter, Modals, Theme
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTerminal();
  initProjectFilters();
  initMitreExplorer();
  initProjectModals();
  initContactForm();
  initCopyButtons();
  initSmoothScroll();
});

/* ==========================================================================
   Theme Management (Default: Clean Minimal Light, Optional: Stealth SOC Dark)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('shripad-theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('shripad-theme', next);
      updateThemeIcon(next);
      showToast(`Switched to ${next === 'dark' ? 'Stealth SOC Dark' : 'Clean Minimal Light'} mode`);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  themeToggle.innerHTML = theme === 'dark' 
    ? `<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
    : `<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  themeToggle.setAttribute('title', `Toggle ${theme === 'light' ? 'Dark' : 'Light'} Mode`);
}

/* ==========================================================================
   Interactive SOC Terminal Widget
   ========================================================================== */
function initTerminal() {
  const termInput = document.getElementById('termInput');
  const termBody = document.getElementById('termBody');
  const termChips = document.querySelectorAll('.term-chip');
  const termToggleBtn = document.getElementById('termToggleBtn');
  const terminalContainer = document.getElementById('socTerminal');

  if (!termInput || !termBody) return;

  const commandHistory = [];
  let historyIndex = -1;

  // Toggle terminal focus
  if (termToggleBtn && terminalContainer) {
    termToggleBtn.addEventListener('click', () => {
      terminalContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      termInput.focus();
    });
  }

  // Quick Chips
  termChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        termInput.value = cmd;
        handleCommand(cmd);
      }
    });
  });

  // Terminal Input Event
  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = termInput.value.trim();
      if (command) {
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        handleCommand(command);
        termInput.value = '';
      }
    } else if (e.key === 'ArrowUp') {
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        termInput.value = commandHistory[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        termInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        termInput.value = '';
      }
      e.preventDefault();
    }
  });

  function handleCommand(cmd) {
    const raw = cmd.toLowerCase().trim();
    appendOutput(`<span class="term-prompt">shripad@soc-workstation:~$</span> <span class="term-cmd">${escapeHTML(cmd)}</span>`);

    switch (raw) {
      case 'help':
        appendOutput(`
<span class="term-accent">Available SOC Console Commands:</span>
  <span class="term-cmd">bio</span>         - About Shripad, education & engineering ethos
  <span class="term-cmd">projects</span>    - Cloud security tools & homelab architectures
  <span class="term-cmd">threats</span>     - Threat reports (Midnight Blizzard, Change Healthcare, Colonial)
  <span class="term-cmd">mitre</span>       - MITRE ATT&CK detection engineering matrix
  <span class="term-cmd">skills</span>      - Languages, cloud security, SIEM & forensic toolsets
  <span class="term-cmd">certs</span>       - AWS Academy, Johns Hopkins, Deepfence & AWS modules
  <span class="term-cmd">contact</span>     - Direct contact info, GitHub & LinkedIn
  <span class="term-cmd">theme</span>       - Toggle between Light and Stealth SOC mode
  <span class="term-cmd">clear</span>       - Clear the console output
        `);
        break;

      case 'bio':
        appendOutput(`
<span class="term-success">● Shripad Jadhav</span> | Cybersecurity Undergraduate (B.Tech CSE, Exp. 2028)
• University: Mukesh Patel School of Technology Management & Engineering (MPSTME), NMIMS Mumbai
• Focus: Cloud Security Architecture, SOC Operations, Detection Engineering & Incident Response
• Philosophy: "Fail-closed by design, validate STS callers before audit, and correlate alerts into actionable intelligence."
• Seeking: Security Engineering & Tier-2/3 SOC Internships (Summer 2027/2028)
        `);
        break;

      case 'projects':
        appendOutput(`
<span class="term-accent">Production Security Projects:</span>
1. <span class="term-cmd">VYRA</span> [AWS Cloud Security Workbench]
   - Fail-closed read-only posture assessor with STS caller account validation.
   - Terraform plan gate with 4 blocking checks (public access, encryption removal, wildcard admin, open ports).
   - SARIF 2.1.0 export, offline tests, Bandit & Ruff checks.
   - GitHub: <a href="https://github.com/shri-jadhav/VYRA" target="_blank" style="color:#58a6ff;">github.com/shri-jadhav/VYRA</a>

2. <span class="term-cmd">Wazuh SOC Homelab</span> [SIEM & Detection Engineering]
   - Single-node Wazuh 4.14.9 SIEM + Windows Security event forwarding over TLS.
   - Python correlation engine: 6 ATT&CK-mapped rules (brute force, spraying, MFA fatigue, privesc).
   - Validated via 37 unit tests & 10-scenario synthetic benchmark.
   - GitHub: <a href="https://github.com/shri-jadhav/homelab.lv4" target="_blank" style="color:#58a6ff;">github.com/shri-jadhav/homelab.lv4</a>

3. <span class="term-cmd">DrainSentinel</span> [AWS Serverless Storm Drain Risk Platform]
   - FastAPI on AWS Lambda, DynamoDB encryption + PITR, S3 presigned URLs, AWS SAM.
   - 33 passing pytest tests and strict least-privilege IAM policies.

4. <span class="term-cmd">ZeroGate Cloud</span> [Zero Trust Access & Identity Security]
   - NIST SP 800-207 aligned identity-aware proxy with Keycloak & AWS IAM OIDC (no static keys).
   - Policy-as-code CI checks with OPA/Conftest & Wazuh telemetry correlation.
   - GitHub: <a href="https://github.com/shri-jadhav/ZeroGate" target="_blank" style="color:#58a6ff;">github.com/shri-jadhav/ZeroGate</a>
        `);
        break;

      case 'threats':
        appendOutput(`
<span class="term-warn">Threat Analysis & Investigation Reports:</span>
• <span class="term-cmd">Microsoft Midnight Blizzard (2024)</span>: Password spraying against non-MFA legacy tenant, OAuth token escalation, high-volume Exchange access.
• <span class="term-cmd">Change Healthcare Ransomware (2024)</span>: Single-factor portal credential compromise, lateral movement, catastrophic healthcare supply chain impact.
• <span class="term-cmd">Colonial Pipeline Ransomware (2021)</span>: Dark-web credential on unmonitored legacy VPN, lack of OT/IT segmentation, proactive pipeline shutdown.
• Full SOC Reports Repository: <a href="https://github.com/shri-jadhav/soc-incident-reports" target="_blank" style="color:#58a6ff;">github.com/shri-jadhav/soc-incident-reports</a>
        `);
        break;

      case 'mitre':
        appendOutput(`
<span class="term-accent">MITRE ATT&CK Lab Correlation Coverage:</span>
• <span class="term-cmd">T1110</span> (Brute Force) - Windows Event ID 4625 burst threshold correlation
• <span class="term-cmd">T1110.003</span> (Password Spraying) - Low-frequency multi-account login failures
• <span class="term-cmd">T1621</span> (MFA Fatigue / Push Spam) - High-frequency MFA push notifications
• <span class="term-cmd">T1078</span> (Valid Accounts) - Anomalous off-hours admin logon (Event ID 4624 Type 10)
• <span class="term-cmd">T1003</span> (OS Credential Dumping) - LSASS memory read & Sysmon Event 10
• <span class="term-cmd">T1210</span> (Exploitation of Remote Services) - EternalBlue MS17-010 PCAP traffic
        `);
        break;

      case 'skills':
        appendOutput(`
<span class="term-success">Technical Skills Inventory:</span>
• Languages: Python, JavaScript, SQL, C++, Java
• Security: Threat Detection, Event Correlation, MITRE ATT&CK, SIEM, Incident Response, Threat Hunting, Malware Analysis, OWASP Top 10, OAuth 2.0, RBAC
• Cloud & DevOps: AWS (IAM, S3, CloudTrail, GuardDuty, Security Hub, Config, Lambda), Terraform, Docker, Git, GitHub Actions, pytest, SARIF
• Tools: Wazuh, Splunk, Wireshark, Metasploit, Kali Linux, PowerShell, Sigma rules, tcpdump, Nmap
        `);
        break;

      case 'certs':
        appendOutput(`
<span class="term-accent">Certifications & Training:</span>
• AWS Academy Graduate - Cloud Security Foundations
• Advanced Malware & Network Anomaly Detection (Johns Hopkins University / Coursera)
• Operationalizing Cloud Security with Deepfence ThreatMapper
• AWS Modules: IAM, GuardDuty, Detective, Security Incident Response, Secrets Manager, Network Firewall, Firewall Manager, Inspector, Security Lake, Encryption Fundamentals
        `);
        break;

      case 'contact':
        appendOutput(`
<span class="term-success">Direct Contact Coordinates:</span>
• Email:    <a href="mailto:shripadjadhav1979@gmail.com" style="color:#58a6ff;">shripadjadhav1979@gmail.com</a>
• Phone:    +91 9892301256
• Location: Mumbai, Maharashtra, India
• GitHub:   <a href="https://github.com/shri-jadhav" target="_blank" style="color:#58a6ff;">github.com/shri-jadhav</a>
• LinkedIn: Available in header / footer
        `);
        break;

      case 'theme':
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.click();
        break;

      case 'clear':
        termBody.innerHTML = '';
        break;

      default:
        appendOutput(`<span class="term-warn">Command not recognized: '${escapeHTML(raw)}'. Type <span class="term-cmd">help</span> for a list of available commands.</span>`);
        break;
    }

    termBody.scrollTop = termBody.scrollHeight;
  }

  function appendOutput(html) {
    const div = document.createElement('div');
    div.className = 'term-output-line';
    div.innerHTML = html;
    termBody.appendChild(div);
  }
}

/* ==========================================================================
   Project Category Filter Tabs
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   Interactive MITRE ATT&CK Matrix Explorer
   ========================================================================== */
const mitreData = {
  'T1110': {
    name: 'Brute Force',
    tactic: 'Credential Access',
    dataSource: 'Windows Event ID 4625 (Logon Failure), Linux auth.log, AWS CloudTrail ConsoleLogin',
    detectionRule: 'Sigma & Python: Triggers when >= 5 failed authentication events occur within 60 seconds from a single IP/host with sub-status 0xC000006A (bad password).',
    homelabValidation: 'Simulated via Hydra & PowerShell test harness. Verified 100% catch rate in Wazuh SOC homelab benchmark without alerting on normal user typo rate.'
  },
  'T1110.003': {
    name: 'Password Spraying',
    tactic: 'Credential Access',
    dataSource: 'Windows Event ID 4625 across distinct Usernames, Azure AD / Okta auth telemetry',
    detectionRule: 'Correlates single source IP attempting identical common passwords across >= 10 distinct usernames over an expanded 30-minute evaluation window to bypass standard lockout thresholds.',
    homelabValidation: 'Tested against synthetic AD environment with 50 test accounts; rule flagged the source IP on the 10th distinct target username within 180 seconds.'
  },
  'T1621': {
    name: 'MFA Fatigue / Push Notification Spamming',
    tactic: 'Credential Access',
    dataSource: 'IdP Authentication Logs, RADIUS / Duo / Authenticator telemetry, Keycloak audit events',
    detectionRule: 'Detects >= 3 push challenges generated for a single identity in under 2 minutes followed immediately by a successful logon from an un-enrolled device fingerprint.',
    homelabValidation: 'Modeled after the Uber & Midnight Blizzard credential compromise tradecraft in ZeroGate testing suite.'
  },
  'T1078': {
    name: 'Valid Accounts / Anomalous Privilege Usage',
    tactic: 'Defense Evasion / Initial Access',
    dataSource: 'Windows Event ID 4624 (Type 10 RemoteInteractive / Type 3 Network), AWS STS GetCallerIdentity',
    detectionRule: 'Flags logon events to sensitive bastion hosts outside defined baseline operational hours or from unauthorized CIDR blocks, correlated against group membership (Event ID 4728/4732).',
    homelabValidation: 'Implemented in VYRA AWS workbench to validate STS caller against expected account ID before reading security posture configurations.'
  },
  'T1003': {
    name: 'OS Credential Dumping (LSASS)',
    tactic: 'Credential Access',
    dataSource: 'Sysmon Event ID 10 (ProcessAccess), Windows Event ID 4656, Splunk endpoint telemetry',
    detectionRule: 'Monitors non-system processes requesting PROCESS_VM_READ (0x0010) or PROCESS_QUERY_INFORMATION (0x0400) permissions to lsass.exe.',
    homelabValidation: 'Investigated in TryHackMe Tier-2 SOC capstone during Conti ransomware kill-chain analysis using Splunk queries.'
  },
  'T1210': {
    name: 'Exploitation of Remote Services (MS17-010 EternalBlue)',
    tactic: 'Lateral Movement',
    dataSource: 'Network PCAP, Wireshark, Zeek SMB logs, Suricata Alert ID 2024218',
    detectionRule: 'Detects oversized SMBv1 transaction packets and trans2 session setup anomalies targeting TCP port 445 without prior negotiation.',
    homelabValidation: 'Reconstructed attack flow from raw PCAP in LaunchED Global SOC internship; verified containment and mitigation via firewall blocking.'
  }
};

function initMitreExplorer() {
  const techBtns = document.querySelectorAll('.mitre-tech-btn');
  const panel = document.getElementById('mitreDetailPanel');
  if (!panel) return;

  techBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      techBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const techId = btn.getAttribute('data-tech');
      const data = mitreData[techId];

      if (data) {
        panel.innerHTML = `
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
            <div>
              <span class="badge badge-blue" style="font-family:var(--font-mono);">${techId}</span>
              <strong style="font-size:1.1rem; color:var(--text-primary); margin-left:0.5rem;">${data.name}</strong>
            </div>
            <span class="badge badge-amber">${data.tactic}</span>
          </div>
          <div style="margin-bottom:0.75rem;">
            <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); font-weight:700; margin-bottom:0.25rem;">Telemetry & Log Sources:</div>
            <div style="font-size:0.875rem; font-family:var(--font-mono); color:var(--text-secondary); background:var(--bg-card); padding:0.5rem 0.75rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle);">${escapeHTML(data.dataSource)}</div>
          </div>
          <div style="margin-bottom:0.75rem;">
            <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); font-weight:700; margin-bottom:0.25rem;">Detection Engineering Logic:</div>
            <div style="font-size:0.875rem; color:var(--text-secondary); line-height:1.5;">${escapeHTML(data.detectionRule)}</div>
          </div>
          <div>
            <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); font-weight:700; margin-bottom:0.25rem;">Homelab & Capstone Validation:</div>
            <div style="font-size:0.875rem; color:var(--accent-emerald); font-weight:500; line-height:1.5;">${escapeHTML(data.homelabValidation)}</div>
          </div>
        `;
      }
    });
  });
}

/* ==========================================================================
   Project Architecture Modals (Deep Dives)
   ========================================================================== */
const projectDetails = {
  'vyra': {
    title: 'VYRA | AWS Cloud Security Workbench',
    subtitle: 'Fail-Closed Posture Assessor & Shift-Left Terraform Policy Gate',
    github: 'https://github.com/shri-jadhav/VYRA',
    tags: ['Python', 'AWS STS / S3 / IAM / CloudTrail', 'Terraform', 'SARIF 2.1.0', 'pytest', 'Bandit', 'Ruff'],
    content: `
      <h4 style="margin-bottom:0.5rem; color:var(--text-primary);">Architecture & Security Design</h4>
      <p style="color:var(--text-secondary); font-size:0.925rem; line-height:1.6; margin-bottom:1rem;">
        VYRA was engineered around a core zero-trust tenet: <strong>never trust caller assumptions</strong>. Before auditing any AWS service, VYRA calls <code>sts:GetCallerIdentity</code> and verifies that the evaluated account ID matches an explicit whitelist. If the validation fails, execution terminates immediately (fail-closed), preventing misconfigured cross-account audits.
      </p>
      <h4 style="margin-bottom:0.5rem; color:var(--text-primary);">Zero-Data-Leak Audit Policy</h4>
      <p style="color:var(--text-secondary); font-size:0.925rem; line-height:1.6; margin-bottom:1rem;">
        Unlike broad CSPM scrapers, VYRA operates on purely metadata and configuration queries. S3 object contents, database rows, and secret payloads are strictly excluded. Read operations target S3 PublicAccessBlock, IAM inline and attached policies, CloudTrail multi-region logging, and GuardDuty detector statuses.
      </p>
      <h4 style="margin-bottom:0.5rem; color:var(--text-primary);">Terraform CI Plan Gate</h4>
      <p style="color:var(--text-secondary); font-size:0.925rem; line-height:1.6; margin-bottom:1rem;">
        Integrates into CI/CD pipelines to intercept Terraform plans before deployment. Four blocking gates enforce:
        <ul style="margin:0.5rem 0 1rem 1.25rem; color:var(--text-secondary); font-size:0.9rem;">
          <li>Public bucket policies or ACLs granting global access</li>
          <li>Removal or disabling of server-side encryption (SSE-KMS / AES-256)</li>
          <li>Wildcard admin permissions (<code>Action: "*", Resource: "*"</code>) in IAM policies</li>
          <li>Sensitive administration ports (SSH 22, RDP 3389, WinRM 5985) open to <code>0.0.0.0/0</code></li>
        </ul>
        Outputs standard <strong>SARIF 2.1.0</strong> for direct ingestion into GitHub Code Scanning security tabs.
      </p>
    `
  },
  'wazuh': {
    title: 'Wazuh SOC Homelab | SIEM & Detection Engineering',
    subtitle: 'TLS Event Streaming, Sigma Rules & 37 Unit-Tested Behavioral Correlations',
    github: 'https://github.com/shri-jadhav/homelab.lv4',
    tags: ['Wazuh 4.14.9', 'Docker', 'WSL2', 'Python', 'Windows Security Events', 'Sigma', 'MITRE ATT&CK'],
    content: `
      <h4 style="margin-bottom:0.5rem; color:var(--text-primary);">Homelab Topology & Ingestion</h4>
      <p style="color:var(--text-secondary); font-size:0.925rem; line-height:1.6; margin-bottom:1rem;">
        Configured a resilient, locally bound single-node Wazuh SIEM manager running on Ubuntu 24.04 via WSL2/Docker. Windows workstation endpoints forward high-fidelity Security Event Logs (4624, 4625, 4728, 4732, 4672) over TLS 1.3 with mutual authentication.
      </p>
      <h4 style="margin-bottom:0.5rem; color:var(--text-primary);">Custom Detection Engine</h4>
      <p style="color:var(--text-secondary); font-size:0.925rem; line-height:1.6; margin-bottom:1rem;">
        Developed a custom Python stateful event correlation pipeline that complements Wazuh XML decoders. Six ATT&CK-mapped detection rules analyze temporal event streams:
        <ul style="margin:0.5rem 0 1rem 1.25rem; color:var(--text-secondary); font-size:0.9rem;">
          <li><strong>T1110.001 Brute Force:</strong> Detects bursts of Event 4625 within 60s windows</li>
          <li><strong>T1110.003 Password Spraying:</strong> Multi-target single-password failures over 30 mins</li>
          <li><strong>T1621 MFA Fatigue:</strong> Rapid push challenges followed by unexpected logon success</li>
          <li><strong>T1078 Privilege Escalation:</strong> Rapid membership addition to privileged security groups (4728/4732)</li>
        </ul>
      </p>
      <h4 style="margin-bottom:0.5rem; color:var(--text-primary);">Verification & Synthetic Benchmark</h4>
      <p style="color:var(--text-secondary); font-size:0.925rem; line-height:1.6; margin-bottom:1rem;">
        Validated with a comprehensive test suite of <strong>37 unit tests</strong> and a 10-scenario synthetic adversary replay script simulating realistic lateral movement and credential theft without polluting production telemetry.
      </p>
    `
  },
  'drainsentinel': {
    title: 'DrainSentinel | AWS Serverless Storm Drain Risk Platform',
    subtitle: 'Serverless GIS Architecture with End-to-End Least-Privilege IAM & KMS Encryption',
    github: 'https://github.com/shri-jadhav',
    tags: ['Python', 'FastAPI', 'AWS Lambda', 'DynamoDB', 'S3', 'AWS SAM', 'React', 'Leaflet'],
    content: `
      <h4 style="margin-bottom:0.5rem; color:var(--text-primary);">Serverless Architecture & Role</h4>
      <p style="color:var(--text-secondary); font-size:0.925rem; line-height:1.6; margin-bottom:1rem;">
        Co-developed a high-scale serverless platform that maps stormwater drain blockage risks across municipal zones. Serves a responsive React + Leaflet map interface backed by FastAPI services deployed to AWS Lambda via API Gateway.
      </p>
      <h4 style="margin-bottom:0.5rem; color:var(--text-primary);">Security Implementation & Infrastructure-as-Code</h4>
      <p style="color:var(--text-secondary); font-size:0.925rem; line-height:1.6; margin-bottom:1rem;">
        As lead cloud security architect, configured infrastructure using <strong>AWS SAM</strong> with uncompromising security defaults:
        <ul style="margin:0.5rem 0 1rem 1.25rem; color:var(--text-secondary); font-size:0.9rem;">
          <li>DynamoDB tables configured with customer-managed KMS encryption and Point-in-Time Recovery (PITR)</li>
          <li>S3 storage for sensor telemetry and drone imagery configured with private ACLs, bucket policies blocking all public access, and short-lived presigned URLs for client uploads</li>
          <li>Distributed execution traced via AWS X-Ray for anomaly detection and latency debugging</li>
          <li>Zero hardcoded credentials: all secrets passed via NoEcho parameters and AWS Secrets Manager</li>
        </ul>
      </p>
      <h4 style="margin-bottom:0.5rem; color:var(--text-primary);">Testing</h4>
      <p style="color:var(--text-secondary); font-size:0.925rem; line-height:1.6; margin-bottom:1rem;">
        Backed by <strong>33 passing pytest tests</strong> covering API endpoints, authorization boundaries, mock DynamoDB operations (Moto), and GIS boundary calculations.
      </p>
    `
  },
  'zerogate': {
    title: 'ZeroGate Cloud | Zero Trust Access & Cloud Identity Platform',
    subtitle: 'NIST SP 800-207 Aligned Identity-Aware Proxy & Static Credential Elimination',
    github: 'https://github.com/shri-jadhav/ZeroGate',
    tags: ['Keycloak', 'Wazuh', 'Terraform', 'OPA / Conftest', 'GitHub Actions', 'AWS IAM OIDC', 'NIST 800-207'],
    content: `
      <h4 style="margin-bottom:0.5rem; color:var(--text-primary);">Zero Trust Core Concept</h4>
      <p style="color:var(--text-secondary); font-size:0.925rem; line-height:1.6; margin-bottom:1rem;">
        ZeroGate models an enterprise Zero Trust access architecture aligned with <strong>NIST SP 800-207</strong>. Traditional perimeter VPNs are replaced with identity-aware proxies backed by Keycloak, enforcing contextual access controls based on user role, device health, and network telemetry.
      </p>
      <h4 style="margin-bottom:0.5rem; color:var(--text-primary);">Eliminating Static Cloud Keys</h4>
      <p style="color:var(--text-secondary); font-size:0.925rem; line-height:1.6; margin-bottom:1rem;">
        Implemented federated role assumption via <strong>AWS IAM OIDC</strong> for GitHub Actions and internal services. Long-lived IAM access keys (<code>AKIA...</code>) are completely eliminated in favor of ephemeral STS credentials.
      </p>
      <h4 style="margin-bottom:0.5rem; color:var(--text-primary);">Continuous Policy & Telemetry Pipeline</h4>
      <p style="color:var(--text-secondary); font-size:0.925rem; line-height:1.6; margin-bottom:1rem;">
        Employs Open Policy Agent (OPA/Conftest) for policy-as-code linting during pull requests, coupled with Wazuh correlation monitoring identity anomalies, DNS queries, proxy logs, and AWS CloudTrail management events.
      </p>
    `
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalBody = document.getElementById('modalBody');
  const modalGithubLink = document.getElementById('modalGithubLink');
  const modalClose = document.getElementById('modalClose');

  if (!modalOverlay) return;

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const data = projectDetails[projectId];

      if (data) {
        modalTitle.textContent = data.title;
        modalSubtitle.textContent = data.subtitle;
        modalBody.innerHTML = data.content;
        if (modalGithubLink) {
          modalGithubLink.href = data.github;
        }
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   Copy to Clipboard Helpers & Toast
   ========================================================================== */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast('Failed to copy. Please copy manually.');
        });
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg style="width:1.25rem; height:1.25rem; color:#22c55e;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
    <span>${escapeHTML(message)}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==========================================================================
   Contact Form (Client-Side mailto generator)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('senderSubject').value.trim() || 'Cybersecurity / Opportunity Inquiry';
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    const mailtoUrl = `mailto:shripadjadhav1979@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject} - ${name}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailtoUrl;

    showToast('Opening default email client with your drafted message...');
  });
}

/* ==========================================================================
   Smooth Scrolling & Active Nav Highlighting
   ========================================================================== */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
