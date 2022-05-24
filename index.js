import fs from 'fs/promises'
import p from 'path'

const results = {
  pass: 0,
  fail: []
}

let count = 0
function write () {
  count++
  // write dots up to three and then start again
  const str = Array.from(Array(count)).reduce((acc) => acc + '.', '')
  if (count % 3 === 0) {
    process.stdout.write(`\r${str}`)
  }
}

export function test(name, testFn) {
  write()

  try {
    testFn()
    results.pass = results.pass + 1
  } catch(e) {
    results.fail.push({
      name,
      reason: e.message,
      error: e
    })
  }
}

(async function () {
  const args = process.argv.slice(2)
  const pathOption = args[0]

  async function walkFiles (path) {
    const currentPath = p.resolve('.', path)
    const files = await fs.readdir(currentPath, {withFileTypes: true})
    for (const file of files) {
      if (file.isDirectory()) {
        await walkFiles(p.resolve(currentPath, file.name))
      } else if (file.name.includes('test.js')) {
        await import(`${currentPath}/${file.name}`)
      }
    }
  }
  await walkFiles(pathOption)

  console.log(`
    Pass: ${results.pass}
    Fail: ${results.fail.length}
    `)

  for (const f of results.fail){
    console.log('Fail: ', f.name)
    console.log('      ', f.reason)
    console.log(f.error)
  }
}())
