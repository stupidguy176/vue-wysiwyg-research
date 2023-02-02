export const IMAGE_TYPE = 'image'

export const isBlobUrl = (str = '') => {
  return str && str.startsWith('blob')
}

export function getExtFromMimeType(mimetype) {
  if(!mimetype) return ''
  const ext = mimetype.split('/')
  return ext.pop().toLowerCase()
}

export const blobUrlToFile = (blobUrl, filename = 'ggj-image') => {
  return new Promise((resolve) => {
    fetch(blobUrl)
    .then((res) => {
      res.blob().then((blob) => {
        const ext = getExtFromMimeType(blob.type)
        const file = new File([blob], `${filename}.${ext}`, {type: blob.type})
        resolve({file: file, url: blobUrl})
      })
    })
    .catch(() => {
      resolve({file: undefined, url: blobUrl})
    })
  })
}

export function checkExtension(file, exts) {
    if(!file.name) return false
    let name = file.name.split('.').length > 1 ? file.name.split('.').pop().toLowerCase() : ''
    return exts.indexOf(`.${name}`) !== -1
}

export function checkFileSize(file, maxSize) {
    // convert to MB
    // comment note unit
    // checkFileSize(fileSizeNumber, maxSize)
    // if(!fileSizeNumber) return 0
    if(!file.size || file.size < 0) return false
    return file.size / 1024 / 1024 < maxSize
}


export function isGogoDomain(url) {
  // these rules are apply for staging and production env
  const rules = [
    /^\//, // relative path,
    /^(http(s)?:\/\/)?fx-on(\.com|\.gogojungle\.net)(\/.+)?$/, // fx-on
    /^(http(s)?:\/\/)?skijan(\.com|\.gogojungle\.com)(\/.+)?$/, // skijan
    /^(http(s)?:\/\/)?(accounts|myaccount)\.gogojungle(\.net|\.co\.jp)(\/.+)?$/, // accounts, myaccount
    /^(http(s)?:\/\/)?real-trade(\.tech|\.gogojungle\.com)(\/.+)?$/, // real-trade
    /^(http(s)?:\/\/)?(www\.)?(labo\.|gogo\.)?gogojungle(\.net|\.co\.jp)(\/.+)?$/, // labo, surface (.gogojungle.co.jp, .gogojungle.net)
  ]

  return rules.some(rgx => rgx.test(url))
}

export function parseJSON(raw) {
  try {
    return JSON.parse(raw)
  } catch (err) {
    return false
  }
}

// export function isUrlValid(userInput) {
//   const res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
//   return Boolean(res)
// }
