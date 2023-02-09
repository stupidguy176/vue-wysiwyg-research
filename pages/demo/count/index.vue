<template>
  <div>
    <div>
      <button class="submit-btn" type="button" name="button" @click="onSetDefaultData()">Set default</button>
      <button class="submit-btn" type="button" name="button" @click="onResetData()">Reset</button>
      <button class="submit-btn" type="button" name="button" @click="onSaveData()">Save</button>
      <button class="submit-btn" type="button" name="button" @click="save()">Check</button>
      <div class="wrapper-count">
        <div class="count-itm">Count:<pre>{{countValue}}</pre></div>
      </div>
      <div class="wrapper-count">
        <div class="count-itm">Count:<pre>{{countValueNew}}</pre></div>
      </div>
    </div>
    <div class="wrapper">
      <div class="editor-body">
        <div class id="codex-editor" />
      </div>
    </div>
    <div class="editorx_body">
      <pre>{{value}}</pre>
    </div>
  </div>
</template>

<script>
import EditorJS from "@editorjs/editorjs"
import Embed from "@editorjs/embed"
import InlineCode from "@editorjs/inline-code"
import Delimiter from "@editorjs/delimiter"
import ColorPlugin from "editorjs-text-color-plugin"
import Header from "@editorjs/header"
import List from "@editorjs/list"
import Paragraph from "@editorjs/paragraph"
import Table from "@editorjs/table"
import Undo from 'editorjs-undo'
import {UnderlineInlineTool} from "editorjs-inline-tool"
import AlignmentBlockTune from "./aligment-tool"
import ImageTool from "../../../resources/packages/editorjs-image/dist/bundle"

const optFile = {
  maxFiles: 20,
  acceptType: '.png, .jpeg, .jpg, .webp',
  maxSize: 5
}

import {
  IMAGE_TYPE,
  checkExtension,
  checkFileSize,
  isBlobUrl,
} from "./common"
import editorContent from "@/pages/demo/count/demoData";

export default {
  name: "count",
  data() {
    return {
      value: null,
      countValue: null,
      countValueNew: null,
      editorContent
    };
  },
  mounted: function() {
    this.myEditor()
  },
  methods: {
    download(content, fileName, contentType) {
      var a = document.createElement("a");
      var file = new Blob([content], {type: contentType});
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
    },
    async onSaveData() {
      const content = await editor.save()
      this.download(JSON.stringify(content), 'json.txt', 'text/plain');
    },
    getTextLength(txt) {
      const realText = txt.replace(/<[^>]+>/g, '')
      return realText.length
    },
    async onCountCharacter() {
      const content = await editor.save()
      const blocks = content.blocks

      let count = 0

      for(let i = 0; i < blocks.length; i++) {

        if(blocks[i].type === 'header' || blocks[i].type === 'paragraph') {
          const text = blocks[i].data.text
          const num = this.getTextLength(text)
          count += num
        }

        if(blocks[i].type === 'list') {
          const items = blocks[i].data.items
          for(let j = 0; j < items.length; j++) {
            const num = this.getTextLength(items[j])
            count += num
          }
        }

        if(blocks[i].type === 'table') {
          const content = blocks[i].data.content
          for(let row = 0; row < content.length; row++) {
            const rowItem = content[row]
            for(let column = 0; column < rowItem.length; column++) {
              const num = this.getTextLength(rowItem[column])
              count += num
            }
          }
        }
      }

      this.countValue = count
    },
    countItem(block) {
      return new Promise((resolve => {
        let count = 0
        try {
          if(block.type !== 'header' && block.type !== 'paragraph' && block.type !== 'list' && block.type !== 'table') {
            resolve(count)
          }

          if(block.type === 'header' || block.type === 'paragraph') {
            const text = block.data.text
            const num = this.getTextLength(text)
            count += num
          }

          if(block.type === 'list') {
            const items = block.data.items
            for(let j = 0; j < items.length; j++) {
              const num = this.getTextLength(items[j])
              count += num
            }
          }

          if(block.type === 'table') {
            const content = block.data.content
            for(let row = 0; row < content.length; row++) {
              const rowItem = content[row]
              for(let column = 0; column < rowItem.length; column++) {
                const num = this.getTextLength(rowItem[column])
                count += num
              }
            }
          }

          resolve(count)
        } catch {
          resolve(count)
        }
      }))
    },
    async onCountCharacterNew() {
      const content = await editor.save()
      const blocks = content.blocks
      const array = await Promise.all(blocks.map(this.countItem))
      this.countValueNew = array.length ? array.reduce((a, b) => a + b) : 0
    },
    onSetDefaultData() {
      editor.render(editorContent)
    },
    onResetData() {
      editor.clear()
    },
    save: function() {
      editor.save().then(savedData => {
        this.value = savedData;
      });
    },
    myEditor: function() {
      let me = this,
        preValidateFile = (file) => {
          // VALIDATE TOTAL FILES
          // VALIDATE TYPE AND SIZE PER FILE
          return !(
            me.numImgs >= optFile.maxFiles ||
            !checkExtension(file, optFile.acceptType.split(/,\s*/)) ||
            !checkFileSize(file, optFile.maxSize)
          )
        }
      // TODO: - AN dynamic holder id
      window.editor = new EditorJS({
        holder: "codex-editor",
        autofocus: true,
        logLevel: process.env.NODE_ENV !== 'production' ? 'VERBOSE' : 'ERROR',
        placeholder: '',
        defaultBlock: "paragraph", // This Tool will be used as default
        inlineToolbar: ['bold', 'italic', 'underline', 'link', 'inlineCode', 'Color', 'Marker'],
        tools: {
          embed: {
            class: Embed,
            inlineToolbar: true,
            config: {
              services: {
                youtube: true
              }
            }
          },
          image: {
            class: ImageTool,
            tunes: ['textAlign'],
            config: {
              uploader: {
                async uploadByFile(file) {
                  if (!preValidateFile(file)) {
                    me.showWarning()
                    return {success: 0}
                  }

                  const blobUrl = URL.createObjectURL(file)
                  me.numImgs++
                  return {
                    success: 1,
                    file: {
                      url: blobUrl,
                    }
                  }
                },
                async uploadByUrl(url){
                  return {
                    success: 1,
                    file: {
                      url: url
                    }
                  }
                },
              },
              ggjConfig: {
                preValidateFile: preValidateFile
              },
            }
          },
          inlineCode: {
            class: InlineCode,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+M',
          },
          delimiter: Delimiter,
          Marker: {
            class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
            config: {
              customPicker: true,
              defaultColor: '#FFBF00',
              colorCollections: ['#37352F','#ffffff', '#787774', '#9F6B53', '#D9730F', '#CB912F', '#458262', '#347EA9', '#9065B0','#C14D8A','#D44C47'],
              type: 'marker',
            },
            shortcut: 'CMD+SHIFT+M',
          },
          header: {
            class: Header,
            inlineToolbar: true,
            tunes: ['textAlign'],
            shortcut: "CMD+SHIFT+H",
            config: {
              levels: [3, 4, 5],
              defaultLevel: 3
            }
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            }
          },
          paragraph: {
            class: Paragraph,
            tunes: ['textAlign'],
            inlineToolbar: true,
            config: {
              placeholder: "", // テキストを入力またはマークダウンを記述
              inlineToolbar: true,
            }
          },
          underline: UnderlineInlineTool,
          table: {
            class: Table,
            tunes: [],
          },
          Color: {
            class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
            config: {
              customPicker: true,
              colorCollections: ['#37352F','#ffffff', '#787774', '#9F6B53', '#D9730F', '#CB912F', '#458262', '#347EA9', '#9065B0','#C14D8A','#D44C47'],
              defaultColor: '#000000',
              type: 'text',
            }
          },
          textAlign: {
            class: AlignmentBlockTune,
            config:{
              default: "left",
              blocks: {
                image: 'center'
              }
            },
          },
        },
        onReady: function() {
          me.$emit('isReady')
          me.undoInstance = new Undo({
            editor: window.editor,
            onUpdate: me.onUndoUpdate,
          })
        },
        onChange: async (api, event) => {
          // console.log('----------------------------------')
          // const content = await api.saver.save()
          // console.log('content----------------------------')
          // console.log(content)
          // console.log('event')
          // console.log(event)
          // const detail = event.detail
          // // console.log('innerText---------------------------')
          // // console.log(detail.target.holder.innerText)
          // // console.log('outerText----------------------------')
          // // console.log(detail.target.holder.outerText)
          // console.log('index: ', detail.index)
          // console.log('textContent----------------------------')
          // console.log(detail.target.holder.textContent)
          // console.log('-------------------------------------')

          // console.log('api-------------------------------------')
          // console.log(api)
          // console.log('event-----------------------------------')
          // console.log(event)
          // console.log('event type------------------------------')
          // console.log(event.type)
          me.onCountCharacter()
          me.onCountCharacterNew()
          if(
            event.detail.index !== -1 &&
            event.detail.target.name === IMAGE_TYPE &&
            event.detail.target.holder &&
            event.type === 'block-removed'
          ) {
            // Decrease count temp blob file
            // -> Filter case image not selected / uploaded / error validation
            const imageEl = event.detail.target.holder.querySelector('.image-tool__image-picture')
            if (!imageEl || !isBlobUrl(imageEl.src)) {
              return
            }

            if (me.numImgs > 0) {
              me.numImgs -= 1
            }
          }
        }
      })
    },
  }
}
</script>

<!--BLOCK EDITOR CSS ONLY WORK IN LANG = CSS-->
<style lang="css">
.count-itm {
  display: flex;
  align-items: center;
  gap: 5px;
}
.wrapper {
  background: white;
  border: solid 2px #DDDDDD;
  border-radius: 5px;
}
.wrapper-count {
  display: flex;
  align-items: center;
  gap: 20px;
}
/* editor toolbar breakpoint */
@media only screen and (min-width: 651px) {
  .ce-block__content, .ce-toolbar__content {
    max-width: calc(100% - 114px) !important;
  }
}
.ce-block__content, .ce-toolbar__content {
  max-width: 100%;
  padding: 0 20px;
}
.cdx-block {
  max-width: 100%;
}
.image-tool__caption, .embed-tool__caption {
  display: none;
}
.ce-paragraph {
  font-size: 15px;
  font-weight: 500;
}
.ce-block__content h3 {
  font-size: 24px;
  font-weight: 700;
}
.ce-block__content h4 {
  font-size: 20px;
  font-weight: 700;
}
.ce-block__content h5 {
  font-size: 18px;
  font-weight: 700;
}
@media only screen and (max-width: 768px) {
  .ce-popover {
    min-height: 285px;
    /* bottom: calc(95px + env(safe-area-inset-bottom)); */
  }
}
@media only screen and (min-width: 768px) {
  .ce-paragraph {
    font-size: 18px;
  }
  .ce-block__content h3 {
    font-size: 28px;
  }
  .ce-block__content h4 {
    font-size: 24px;
  }
  .ce-block__content h5 {
    font-size: 18px;
  }
}
button[data-tool="underline"] {
  padding: 0 !important;
}
.cdx-block.embed-tool {
  margin: auto;
  text-align: center;
}


.cdx-block.embed-tool::before{
  content: '';
  /* padding-bottom: 56.25%; */
  width: 100%;
  height: 100%;
  display: block;
  z-index: -1;
  @media only screen and (min-width: 768px) {
    min-width: 640px;
    min-height: 360px;
  }
}
.cdx-block.embed-tool {
  width: 640px;
  height: 360px;
  margin: auto;
  position: relative;
}
.cdx-block.embed-tool iframe {
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  border: none;
  position: absolute;
  height: 360px;
  @media only screen and (min-width: 768px) {
    min-width: 640px;
    min-height: 360px;
  }
}
.submit-btn {
  background: white;
  border: solid 1px;
  padding: 10px 20px;
  margin: 10px 0;
  cursor: pointer;
}
</style>
<!--END BLOCK EDITOR CSS-->
