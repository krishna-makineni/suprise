import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import jsQR from 'jsqr';

const pngPath = path.resolve('public/assets/qr-code.png');

if (!fs.existsSync(pngPath)) {
  console.error('QR code PNG file does not exist:', pngPath);
  process.exit(1);
}

const buffer = fs.readFileSync(pngPath);
const png = PNG.sync.read(buffer);

const code = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);

if (code) {
  console.log('----------------------------------------------------');
  console.log('✓ QR Code Successfully Decoded!');
  console.log('Decoded Data:', code.data);
  console.log('Width x Height:', png.width, 'x', png.height);
  console.log('----------------------------------------------------');
} else {
  console.error('Failed to decode QR code.');
  process.exit(1);
}
