// Generates a soft, romantic music box / piano chime ambient melody WAV
import fs from 'fs';
import path from 'path';

const sampleRate = 44100;
const durationSeconds = 18;
const numSamples = sampleRate * durationSeconds;
const numChannels = 2;
const bytesPerSample = 2; // 16-bit

const buffer = Buffer.alloc(44 + numSamples * numChannels * bytesPerSample);

// RIFF header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + numSamples * numChannels * bytesPerSample, 4);
buffer.write('WAVE', 8);

// fmt subchunk
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
buffer.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * numChannels * bytesPerSample, 28); // ByteRate
buffer.writeUInt16LE(numChannels * bytesPerSample, 32); // BlockAlign
buffer.writeUInt16LE(16, 34); // BitsPerSample

// data subchunk
buffer.write('data', 36);
buffer.writeUInt32LE(numSamples * numChannels * bytesPerSample, 40);

// Gentle romantic chord sequence: Cmaj9 -> Am9 -> Fmaj7 -> Gsus4 -> C
// Notes in Hz
const notes = [
  // Arpeggio 1 (Cmaj9)
  { note: 261.63, time: 0.0, dur: 4.0 }, // C4
  { note: 329.63, time: 0.4, dur: 3.5 }, // E4
  { note: 392.00, time: 0.8, dur: 3.0 }, // G4
  { note: 493.88, time: 1.2, dur: 2.8 }, // B4
  { note: 587.33, time: 1.6, dur: 2.5 }, // D5

  // Arpeggio 2 (Am9)
  { note: 220.00, time: 3.6, dur: 4.0 }, // A3
  { note: 261.63, time: 4.0, dur: 3.5 }, // C4
  { note: 329.63, time: 4.4, dur: 3.0 }, // E4
  { note: 392.00, time: 4.8, dur: 2.8 }, // G4
  { note: 493.88, time: 5.2, dur: 2.5 }, // B4

  // Arpeggio 3 (Fmaj7)
  { note: 174.61, time: 7.2, dur: 4.0 }, // F3
  { note: 261.63, time: 7.6, dur: 3.5 }, // C4
  { note: 329.63, time: 8.0, dur: 3.0 }, // E4
  { note: 349.23, time: 8.4, dur: 2.8 }, // F4
  { note: 523.25, time: 8.8, dur: 2.5 }, // C5

  // Arpeggio 4 (G6 / Gsus4)
  { note: 196.00, time: 10.8, dur: 4.0 }, // G3
  { note: 293.66, time: 11.2, dur: 3.5 }, // D4
  { note: 392.00, time: 11.6, dur: 3.0 }, // G4
  { note: 440.00, time: 12.0, dur: 2.8 }, // A4
  { note: 587.33, time: 12.4, dur: 2.5 }, // D5

  // Final Resolution (C)
  { note: 261.63, time: 14.2, dur: 3.8 }, // C4
  { note: 329.63, time: 14.5, dur: 3.5 }, // E4
  { note: 392.00, time: 14.8, dur: 3.2 }, // G4
  { note: 523.25, time: 15.1, dur: 2.9 }, // C5
];

let offset = 44;
for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  let sampleVal = 0;

  for (const n of notes) {
    if (t >= n.time && t < n.time + n.dur) {
      const dt = t - n.time;
      // Soft bell / piano decay envelope
      const env = Math.exp(-dt * 2.2) * (1 - Math.exp(-dt * 60));
      // Fundamental + gentle warm harmonics
      const osc = Math.sin(2 * Math.PI * n.note * dt) * 0.7 +
                  Math.sin(4 * Math.PI * n.note * dt) * 0.2 +
                  Math.sin(6 * Math.PI * n.note * dt) * 0.05;
      sampleVal += osc * env;
    }
  }

  // Soft master warmth and limiter
  sampleVal = Math.tanh(sampleVal * 0.45) * 0.65;
  const intVal = Math.max(-32768, Math.min(32767, Math.floor(sampleVal * 32767)));

  // Left channel
  buffer.writeInt16LE(intVal, offset);
  // Right channel (slight stereo pan nuance)
  buffer.writeInt16LE(intVal, offset + 2);
  offset += 4;
}

const outDir = path.resolve('public/assets/audio');
fs.writeFileSync(path.join(outDir, 'romantic-melody.wav'), buffer);
console.log('Successfully generated romantic-melody.wav');
