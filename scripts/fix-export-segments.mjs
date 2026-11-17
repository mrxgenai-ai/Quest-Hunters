// Post-build fix for static export on Windows.
//
// Next.js prefetches route data from files like `demos/__next.demos.__PAGE__.txt`,
// but when building on Windows it writes them as `demos/__next.demos/__PAGE__.txt`.
// The browser then gets a 404 on prefetch. This copies every file inside a
// `__next.*` folder to the dot-joined name the browser actually requests.
// Safe to run on any OS: it skips files that already exist.

import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs"
import { join, relative, sep } from "node:path"
import { fileURLToPath } from "node:url"

const outDir = fileURLToPath(new URL("../out/", import.meta.url))

if (!existsSync(outDir)) {
  console.log("fix-export-segments: no out/ folder, skipping")
  process.exit(0)
}

let copied = 0

function filesIn(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? filesIn(p) : [p]
  })
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (!statSync(p).isDirectory()) continue
    if (name.startsWith("__next.")) {
      for (const file of filesIn(p)) {
        const target = `${p}.${relative(p, file).split(sep).join(".")}`
        if (!existsSync(target)) {
          copyFileSync(file, target)
          copied++
        }
      }
    } else {
      walk(p)
    }
  }
}

walk(outDir)
console.log(`fix-export-segments: ${copied} prefetch file(s) added`)
