// https://github.com/rizki4106/editorjs-viewer/blob/master/table/index.js
const parseTableHead = (el) => {
  if (!el.data.withHeadings) {
    return ''
  }

  let tableHead = '',
    headRow = el.data.content[0]

  if (!headRow) {
    return ''
  }

  headRow.forEach(cell => {
    tableHead += `<th>${cell}</th>`
  })
  return `<thead><tr>${tableHead}</tr></thead>`
}

const parseTableBody = (el) => {
  let startRow = 1,
      tableBody = ''
  if (!el.data.withHeadings) {
    startRow = 0
  }
  for(let i = startRow; i < el.data.content.length; i++){
    tableBody += `<tr>`
    el.data.content[i].forEach(cell => {
      tableBody += `<td>${cell}</td>`
    })
    tableBody += `</tr>`
  }
  return tableBody
}

const parseEmbed = ({ data }) => {
  switch (data.service) {
    case "vimeo":
      return `<iframe src="${data.embed}" height="${data.height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
    case "youtube":
      return `<iframe width="${data.width}" height="${data.height}" src="${data.embed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    default:
      return `(Unsupported embed: ${data.embed})`
  }
}

import edjsHTML from 'editorjs-html'

export const edjsParser = edjsHTML({
  table: (el) => {
    return `<table>${parseTableHead(el)}<tbody>${parseTableBody(el)}</tbody></table>`
  },
  delimiter: () => {
    return '<div class="ce-delimiter"></div>'
  },
  // Custom for text-align tune. Original: https://github.com/pavittarx/editorjs-html/blob/master/src/transforms.ts
  header: ({ data, tunes }) => {
    return `<h${data.level} style="text-align: ${tunes.textAlign.alignment}">${data.text}</h${data.level}>`
  },
  paragraph: ({ data, tunes }) => {
    return `<p class="m-0" style="text-align: ${tunes.textAlign.alignment}">${data.text}</p>`
  },
  embed: (block) => {
    return `<div style="text-align: center;" class="embed-wrapper">${parseEmbed(block)}</div>`
  },
  image: (block) => {
    const data = block.data
    const defaultTag = () => {
      return 'div'
    }
    const tunesParserMap = {
      'textAlign': ({ tunes }) => `block-align-${tunes.textAlign.alignment}`
    }
    const tunes = block.tunes
    const tuneClassArr = []
    if (tunes) {
      for(const tuneName in tunesParserMap) {
        if (tunes[tuneName]) {
          tuneClassArr.push(tunesParserMap[tuneName](block))
        }
      }
    }
    const tag = defaultTag(block)
    const caption = data.caption ? data.caption : "Image"
    const classArr = []
    if (data.withBorder) {
      tuneClassArr.push('img-border')
    }
    if (data.stretched) {
      classArr.push('img-stretched')
      if(data.withBackground) {
        classArr.push('img-stretched-with-background')
      }
    }
    if (data.withBackground) {
      tuneClassArr.push('img-background')
    }
    const classes = tuneClassArr.length > 0 ? `class="${tuneClassArr.join(' ')}"` : ''
    return `<${tag} ${classes}><img
      ${classArr.length > 0 ? `class="${classArr.join(' ')}"`: ''}
      src="${data.file && data.file.url ? data.file.url : data.url}"
      alt="${caption}"
    /></${tag}>`
  },
  // header: withTunes(defaultParser, ({ data }) => `h${data.level}`),
  // paragraph: withTunes(defaultParser, () => 'p'),
})

export default edjsParser
