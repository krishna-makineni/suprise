/**
 * QR Code & Printable Love Card Generator for "It's Always Us ❤️"
 * 
 * Usage:
 *   node scripts/generate-qr.js
 *   or:
 *   node scripts/generate-qr.js https://your-actual-deployed-domain.vercel.app
 */

import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';

// 1. Determine target URL: CLI argument > loveStoryConfig.productionUrl
let targetUrl = process.argv[2];

if (!targetUrl) {
  try {
    const configPath = path.resolve('src/data/loveStory.js');
    const content = fs.readFileSync(configPath, 'utf8');
    const match = content.match(/productionUrl:\s*["']([^"']+)["']/);
    if (match && match[1]) {
      targetUrl = match[1];
    }
  } catch (err) {
    console.warn('Could not read loveStory.js directly, using default.');
  }
}

if (!targetUrl) {
  targetUrl = 'https://its-always-us.vercel.app';
}

console.log(`\n==================================================`);
console.log(`Generating QR Code for: ${targetUrl}`);
console.log(`==================================================\n`);

const outDir = path.resolve('public/assets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const pngPath = path.join(outDir, 'qr-code.png');
  const svgPath = path.join(outDir, 'qr-code.svg');
  const printablePath = path.resolve('public/printable-qr-card.html');

  // Options: high error correction level (H or M) with proper quiet zone (margin 4)
  const qrOptions = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 1.0,
    margin: 4,
    width: 1024,
    color: {
      dark: '#652D42', // Deep burgundy high contrast
      light: '#FFFFFF', // Clean white quiet zone
    },
  };

  // 1. Generate High-Res PNG
  await QRCode.toFile(pngPath, targetUrl, qrOptions);
  console.log(`✓ High-Res PNG QR Code generated at: ${pngPath}`);

  // 2. Generate Clean Vector SVG
  const svgString = await QRCode.toString(targetUrl, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 4,
    color: {
      dark: '#652D42',
      light: '#FFFFFF',
    },
  });
  fs.writeFileSync(svgPath, svgString, 'utf8');
  console.log(`✓ Vector SVG QR Code generated at: ${svgPath}`);

  // 3. Generate High-Quality Printable Love Card HTML (Printable & Exportable to PDF)
  const cardHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Printable Romantic Card — It's Always Us</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Playfair+Display:ital,wght@0,500;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&family=Caveat:wght@600&display=swap');

    @page {
      size: A5 portrait;
      margin: 1cm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: #F8F5F2;
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #652D42;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }

    .no-print-bar {
      margin-bottom: 24px;
      text-align: center;
    }

    .print-btn {
      background: #652D42;
      color: #FFF;
      border: none;
      padding: 12px 28px;
      border-radius: 999px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(101, 45, 66, 0.25);
    }

    .print-btn:hover {
      background: #522335;
    }

    /* Elegant physical card design (4x6 or A5 proportion) */
    .romantic-card {
      width: 420px;
      max-width: 100%;
      background: #FFFDFB;
      border: 2px solid #D7B98E;
      border-radius: 24px;
      padding: 44px 36px;
      text-align: center;
      box-shadow: 0 16px 40px rgba(101, 45, 66, 0.12);
      position: relative;
    }

    .card-border-inner {
      position: absolute;
      inset: 12px;
      border: 1px dashed #D7B98E;
      border-radius: 16px;
      pointer-events: none;
      opacity: 0.6;
    }

    .card-seal {
      width: 48px;
      height: 48px;
      margin: 0 auto 16px;
      background: radial-gradient(circle, #EAD7BA, #D7B98E);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      box-shadow: 0 4px 10px rgba(215, 185, 142, 0.4);
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 22px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #652D42;
      margin-bottom: 6px;
    }

    .subtitle {
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      font-size: 18px;
      color: #8C3D5A;
      margin-bottom: 24px;
    }

    .qr-container {
      background: #FFFFFF;
      padding: 16px;
      border-radius: 16px;
      display: inline-block;
      box-shadow: 0 6px 20px rgba(101, 45, 66, 0.08);
      border: 1px solid #F7DDE3;
      margin-bottom: 24px;
    }

    .qr-container img {
      width: 220px;
      height: 220px;
      display: block;
    }

    .instructions {
      font-size: 13px;
      color: #75324C;
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .instructions strong {
      display: block;
      color: #652D42;
      margin-bottom: 4px;
    }

    .destination-url {
      font-size: 11px;
      color: #A36A7D;
      word-break: break-all;
    }

    .footer-note {
      margin-top: 24px;
      font-family: 'Caveat', cursive;
      font-size: 22px;
      color: #D98C9A;
    }

    @media print {
      body {
        background: transparent;
        padding: 0;
      }
      .no-print-bar {
        display: none;
      }
      .romantic-card {
        box-shadow: none;
        border: 2px solid #D7B98E;
      }
    }
  </style>
</head>
<body>

  <div class="no-print-bar">
    <button class="print-btn" onclick="window.print()">Print / Save Card as PDF 💌</button>
  </div>

  <div class="romantic-card">
    <div class="card-border-inner"></div>

    <div class="card-seal">❤️</div>

    <h1>SCAN TO OPEN MY HEART ❤️</h1>
    <p class="subtitle">A little world, made just for you.</p>

    <div class="qr-container">
      <img src="assets/qr-code.png" alt="Love Story QR Code" />
    </div>

    <div class="instructions">
      <strong>Open your iPhone Camera app</strong>
      Point your camera at this code to open our private story in Safari.
    </div>

    <div class="destination-url">
      ${targetUrl}
    </div>

    <div class="footer-note">
      Forever &amp; Always Us
    </div>
  </div>

</body>
</html>`;

  fs.writeFileSync(printablePath, cardHtml, 'utf8');
  console.log(`✓ Printable QR Card generated at: ${printablePath}`);
  console.log(`\nAll QR deliverables are ready!`);
}

run().catch((err) => {
  console.error('Error generating QR assets:', err);
  process.exit(1);
});
