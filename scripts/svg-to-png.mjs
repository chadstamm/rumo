import sharp from 'sharp'
import fs from 'node:fs'

const svgPath = '/Users/chadstamm/Desktop/Claude Code Projects/rumo/public/rumo-logo.svg'
const outPath = '/Users/chadstamm/Desktop/rumo-logo.png'

const svg = fs.readFileSync(svgPath)

await sharp(svg, { density: 600 })
  .resize({ width: 1200, fit: 'inside' })
  .png()
  .toFile(outPath)

console.log('Done:', outPath)
