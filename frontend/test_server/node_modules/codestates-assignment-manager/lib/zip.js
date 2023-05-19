const { createWriteStream, unlinkSync } = require("fs")
const archiver = require("archiver")
const { Base64Encode } = require('base64-stream')
const getStream = require('get-stream')

const zip = (filename) => {
  const out = createWriteStream(filename)
  const archive = archiver('zip', { zlib: { level: 9 }})
  const encoder = new Base64Encode()

  return new Promise((resolve, reject) => {
    archive
    .glob('**', {
      ignore: ['node_modules/**', filename]
    })
    .on('error', err => reject(err))
    .pipe(out)

    let base64str;
    getStream(archive.pipe(encoder)).then(str => {
      base64str = str
    })

    out.on('close', async () => {
      // console.log(base64str)
      setTimeout(() => {
        unlinkSync(filename)
      }, 1000)
      resolve(base64str)
    })

    archive.finalize()
  })
}

module.exports = zip;
