// Metro360 - Main Application Logic & Utility Engine

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initAuthUI();
  initStatsCounters();
});

// Toast System
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const iconMap = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  toast.innerHTML = `
    <span class="toast-icon">${iconMap[type] || 'ℹ️'}</span>
    <span class="toast-msg">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Theme Engine
function initTheme() {
  const savedTheme = localStorage.getItem('metro360_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('metro360_theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.innerHTML = theme === 'dark' ? '<span class="theme-icon">☀️</span>' : '<span class="theme-icon">🌙</span>';
  }
}

// Navigation & Mobile Menu
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }
}

// Auth State UI Update
function initAuthUI() {
  const currentUser = getCurrentUser();
  const navActions = document.querySelector('.nav-actions');

  if (currentUser && navActions) {
    const loginBtn = navActions.querySelector('a[href*="login.html"]');
    const regBtn = navActions.querySelector('a[href*="register.html"]');

    if (loginBtn) loginBtn.style.display = 'none';
    if (regBtn) regBtn.style.display = 'none';

    // Role target page map
    const rolePages = {
      owner: 'pages/owner.html',
      lmo: 'pages/lmo.html',
      gatc: 'pages/gatc.html',
      manufacturer: 'pages/manufacturer.html',
      directorate: 'pages/admin.html',
      consumer: 'pages/consumer.html'
    };

    let targetPage = rolePages[currentUser.role] || 'pages/owner.html';
    // adjust path if already inside pages/ directory
    if (window.location.pathname.includes('/pages/')) {
      targetPage = targetPage.replace('pages/', '');
    }

    const userBadge = document.createElement('div');
    userBadge.className = 'user-nav-badge';
    userBadge.innerHTML = `
      <a href="${targetPage}" class="btn btn-sm btn-primary" title="Go to Dashboard">
        👤 ${currentUser.name.split(' ')[0]} (${currentUser.role.toUpperCase()})
      </a>
      <button class="btn btn-sm btn-outline" onclick="logoutUser()">Logout</button>
    `;
    navActions.appendChild(userBadge);
  }
}

function quickLogin(roleName) {
  const db = getDB();
  const targetUser = db.users.find(u => u.role === roleName);
  if (targetUser) {
    setCurrentUser(targetUser);
    showToast(`Logged in as ${targetUser.name} (${targetUser.role.toUpperCase()})`, 'success');
    
    const rolePages = {
      owner: 'pages/owner.html',
      lmo: 'pages/lmo.html',
      gatc: 'pages/gatc.html',
      manufacturer: 'pages/manufacturer.html',
      directorate: 'pages/admin.html',
      consumer: 'pages/consumer.html'
    };

    let targetPage = rolePages[roleName] || 'pages/owner.html';
    if (window.location.pathname.includes('/pages/')) {
      targetPage = targetPage.replace('pages/', '');
    }
    setTimeout(() => {
      window.location.href = targetPage;
    }, 600);
  }
}

function logoutUser() {
  setCurrentUser(null);
  showToast('Logged out successfully', 'info');
  setTimeout(() => {
    window.location.href = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
  }, 500);
}

// Stats counter animation
function initStatsCounters() {
  const statElements = document.querySelectorAll('.stat-num[data-target]');
  if (!statElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            el.innerText = target;
            clearInterval(timer);
          } else {
            el.innerText = count;
          }
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statElements.forEach(el => observer.observe(el));
}

// Fee Calculation Logic (Legal Metrology Fee Structure Rules)
function calculateLegalMetrologyFee(category, capacityVal) {
  let fee = 500;
  if (category.includes('Weighing Scale') || category.includes('Class III')) {
    if (capacityVal > 100) fee = 1500;
    else if (capacityVal > 30) fee = 800;
    else fee = 500;
  } else if (category.includes('Fuel') || category.includes('Dispensing')) {
    fee = 2500;
  } else if (category.includes('Weighbridge')) {
    fee = 7500;
  } else if (category.includes('Flow Meter')) {
    fee = 3500;
  } else if (category.includes('Spring Balance')) {
    fee = 300;
  }
  return fee;
}

// Legal Metrology Verification Calculation Engine
function runVerificationCalculation(nominal, observed, instrumentCategory) {
  const nom = parseFloat(nominal);
  const obs = parseFloat(observed);
  if (isNaN(nom) || isNaN(obs)) return null;

  const err = obs - nom;
  const errorPercent = ((err / nom) * 100).toFixed(3);

  // Maximum Permissible Error (MPE) thresholds based on Legal Metrology Rules
  let mpeAllowed = 0.001 * nom; // default 0.1%
  if (instrumentCategory.includes('Weighing Scale')) {
    mpeAllowed = nom <= 5000 ? 5 : 10; // in grams
  } else if (instrumentCategory.includes('Fuel')) {
    mpeAllowed = nom * 0.005; // 0.5% MPE for fuel dispensing
  } else if (instrumentCategory.includes('Weighbridge')) {
    mpeAllowed = nom * 0.001; // 0.1% MPE
  }

  const isCompliant = Math.abs(err) <= mpeAllowed;

  return {
    nominal: nom,
    observed: obs,
    error: err.toFixed(3),
    errorPercent: errorPercent,
    mpeAllowed: mpeAllowed,
    isCompliant: isCompliant,
    verdict: isCompliant ? 'PASS — COMPLIANT WITH LEGAL METROLOGY RULES' : 'REJECTED — EXCEEDS MAXIMUM PERMISSIBLE ERROR (MPE)'
  };
}

// SVG QR Generator Graphic
function generateSVGQR(text, size = 160) {
  // Generates a stylized SVG matrix representing a QR code
  const seed = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const cells = 15;
  const cellSize = size / cells;
  let rects = '';

  // Draw positioning squares (corners)
  const drawCorner = (x, y) => {
    rects += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${3 * cellSize}" height="${3 * cellSize}" fill="#2563eb" rx="4"/>`;
    rects += `<rect x="${(x + 0.5) * cellSize}" y="${(y + 0.5) * cellSize}" width="${2 * cellSize}" height="${2 * cellSize}" fill="#ffffff" rx="2"/>`;
    rects += `<rect x="${(x + 1) * cellSize}" y="${(y + 1) * cellSize}" width="${cellSize}" height="${cellSize}" fill="#2563eb" rx="1"/>`;
  };

  drawCorner(1, 1);
  drawCorner(11, 1);
  drawCorner(1, 11);

  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      // Avoid corner zones
      if ((r < 5 && c < 5) || (r < 5 && c > 9) || (r > 9 && c < 5)) continue;

      const val = (r * 17 + c * 31 + seed) % 5;
      if (val === 0 || val === 2) {
        rects += `<rect x="${c * cellSize + 1}" y="${r * cellSize + 1}" width="${cellSize - 2}" height="${cellSize - 2}" fill="#3b82f6" rx="1.5"/>`;
      }
    }
  }

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border-radius:12px; padding:10px; box-shadow:0 4px 20px rgba(0,0,0,0.15);">
      ${rects}
    </svg>
  `;
}

// Print Digital Certificate Window Generator
function openCertificateWindow(idi) {
  const db = getDB();
  const inst = db.instruments.find(i => i.idi === idi);
  if (!inst) {
    showToast('Instrument certificate record not found', 'error');
    return;
  }

  const qrSvg = generateSVGQR(inst.qrPayload, 140);

  const certHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Official Certificate of Verification — ${inst.idi}</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 40px; }
        .cert-card { max-width: 800px; margin: 0 auto; background: #fff; border: 12px double #1e3a8a; border-radius: 12px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: relative; }
        .header { text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; }
        .emblem { font-size: 40px; margin-bottom: 5px; }
        .gov-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #475569; }
        .cert-name { font-size: 24px; font-weight: 900; color: #1e3a8a; margin: 10px 0 5px; text-transform: uppercase; letter-spacing: 1px; }
        .sub-text { font-size: 12px; color: #64748b; font-style: italic; }
        .cert-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0; }
        .field { background: #f1f5f9; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #2563eb; }
        .field label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; display: block; margin-bottom: 4px; }
        .field span { font-size: 15px; font-weight: 700; color: #0f172a; }
        .qr-section { display: flex; align-items: center; justify-content: space-between; margin-top: 30px; padding-top: 20px; border-top: 2px dashed #cbd5e1; }
        .signature-box { text-align: center; }
        .sig-line { width: 200px; border-bottom: 2px solid #0f172a; margin-bottom: 8px; margin-top: 40px; }
        .sig-title { font-size: 13px; font-weight: 700; color: #1e3a8a; }
        .stamp-seal { display: inline-block; background: #eff6ff; border: 2px solid #2563eb; color: #1e40af; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-top: 10px; }
        .watermark { position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); font-size: 80px; font-weight: 900; color: rgba(37,99,235,0.05); pointer-events: none; text-transform: uppercase; }
        @media print { body { background: none; padding: 0; } .cert-card { box-shadow: none; border-color: #000; } }
      </style>
    </head>
    <body>
      <div class="cert-card">
        <div class="watermark">LEGAL METROLOGY</div>
        <div class="header">
          <div class="emblem">🏛️</div>
          <div class="gov-title">Department of Legal Metrology &middot; Govt. of India</div>
          <div class="cert-name">Certificate of Verification &amp; Stamping</div>
          <div class="sub-text">Issued under Section 24 of the Legal Metrology Act, 2009 &amp; General Rules, 2011</div>
        </div>
        
        <div class="cert-grid">
          <div class="field"><label>Instrument Digital ID (IDI)</label><span>${inst.idi}</span></div>
          <div class="field"><label>Certificate Number</label><span>${inst.certificateNo}</span></div>
          <div class="field"><label>Instrument Category</label><span>${inst.category}</span></div>
          <div class="field"><label>Brand &amp; Model / Serial</label><span>${inst.brandModel} (${inst.serialNo})</span></div>
          <div class="field"><label>Owner / Business Name</label><span>${inst.ownerName}</span></div>
          <div class="field"><label>GSTIN / Entity ID</label><span>${inst.gstin}</span></div>
          <div class="field"><label>Verification Date</label><span>${inst.verificationDate}</span></div>
          <div class="field"><label>Expiry Date</label><span style="color:#059669">${inst.expiryDate}</span></div>
        </div>

        <div style="background:#eff6ff; padding:12px; border-radius:8px; font-size:13px; color:#1e40af; margin-bottom:20px;">
          📌 <strong>Official Seal &amp; Verification Note:</strong> This instrument has been inspected, tested, and found to conform to prescribed standards. Seal Number: <strong>${inst.stampDetails}</strong>.
        </div>

        <div class="qr-section">
          <div>
            ${qrSvg}
            <div style="font-size:10px; color:#64748b; margin-top:4px; text-align:center;">Scan to Verify Online</div>
          </div>
          <div class="signature-box">
            <div class="stamp-seal">SEAL VALIDATED</div>
            <div class="sig-line"></div>
            <div class="sig-title">${inst.lmoName}</div>
            <div style="font-size:11px; color:#64748b;">Legal Metrology Officer (${inst.lmoId})</div>
          </div>
        </div>
      </div>
      <script>
        window.onload = function() {
          // auto trigger print dialog option after 800ms
        };
      </script>
    </body>
    </html>
  `;

  const printWin = window.open('', '_blank', 'width=900,height=750');
  printWin.document.write(certHTML);
  printWin.document.close();
}
