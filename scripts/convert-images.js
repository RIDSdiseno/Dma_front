import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

// Config
const ASSETS_DIR = path.resolve('./src/assets')
const SIZES = [480, 800, 1200, 1600]
const QUALITY = 80
const EXTENSIONS = ['.jpg', '.jpeg', '.png']

async function ensureExists(file) {
  try {
    await fs.access(file)
    return true
  } catch {
    return false
  }
}

async function processFile(file) {
  const ext = path.extname(file).toLowerCase()
  if (!EXTENSIONS.includes(ext)) return

  const base = path.basename(file, ext)
  const input = path.join(ASSETS_DIR, file)

  for (const size of SIZES) {
    const outJpg = path.join(ASSETS_DIR, `${base}-${size}.jpg`)
    const outWebp = path.join(ASSETS_DIR, `${base}-${size}.webp`)
    const outAvif = path.join(ASSETS_DIR, `${base}-${size}.avif`)

    if (!(await ensureExists(outJpg))) {
      console.log(`Generating ${path.relative(process.cwd(), outJpg)} (${size}px) ...`)
      await sharp(input).resize({ width: size }).jpeg({ quality: QUALITY }).toFile(outJpg)
    }
    if (!(await ensureExists(outWebp))) {
      console.log(`Generating ${path.relative(process.cwd(), outWebp)} (${size}px webp) ...`)
      await sharp(input).resize({ width: size }).webp({ quality: QUALITY }).toFile(outWebp)
    }
    if (!(await ensureExists(outAvif))) {
      console.log(`Generating ${path.relative(process.cwd(), outAvif)} (${size}px avif) ...`)
      await sharp(input).resize({ width: size }).avif({ quality: QUALITY }).toFile(outAvif)
    }
  }

  // also generate full-size webp/avif copy
  const outWebpFull = path.join(ASSETS_DIR, `${base}.webp`)
  const outAvifFull = path.join(ASSETS_DIR, `${base}.avif`)
  if (!(await ensureExists(outWebpFull))) {
    console.log(`Generating ${path.relative(process.cwd(), outWebpFull)} (full webp) ...`)
    await sharp(input).webp({ quality: QUALITY }).toFile(outWebpFull)
  }
  if (!(await ensureExists(outAvifFull))) {
    console.log(`Generating ${path.relative(process.cwd(), outAvifFull)} (full avif) ...`)
    await sharp(input).avif({ quality: QUALITY }).toFile(outAvifFull)
  }
}

async function main() {
  console.log('Scanning', ASSETS_DIR)
  const entries = await fs.readdir(ASSETS_DIR)
  for (const e of entries) {
    const ext = path.extname(e).toLowerCase()
    if (EXTENSIONS.includes(ext)) {
      try {
        await processFile(e)
      } catch (err) {
        console.error('Error processing', e, err)
      }
    }
  }
  console.log('Done')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
