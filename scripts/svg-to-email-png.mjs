import sharp from 'sharp'
import fs from 'node:fs'

const svgPath = '/Users/chadstamm/Desktop/Claude Code Projects/rumo/public/rumo-logo.svg'
const outPath = '/Users/chadstamm/Desktop/Claude Code Projects/rumo/public/rumo-logo-email.png'

const svg = fs.readFileSync(svgPath)

await sharp(svg, { density: 400 })
  .resize({ width: 600, fit: 'inside' })
  .png()
  .toFile(outPath)

console.log('Wrote', outPath)
