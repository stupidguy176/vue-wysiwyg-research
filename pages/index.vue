<template>
  <div >
    <div class="editorx_body">
      <!--editorjs id-->
      <div class id="codex-editor"/>
    </div>
    <button style="margin-left: 30%;" type="button" name="button" @click="save()">save</button>
    <div class="editorx_body">
      <pre>{{value}}</pre>
    </div>
  </div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import RawTool from "@editorjs/raw";
import ChangeCase from 'editorjs-change-case';
import InlineCode from '@editorjs/inline-code';
import Image from '@editorjs/image';
import Embed from '@editorjs/embed';
import Table from 'editorjs-table';
import ColorPlugin from 'editorjs-text-color-plugin';

import createGenericInlineTool, {
  ItalicInlineTool,
  UnderlineInlineTool,
} from 'editorjs-inline-tool'

export default {
  data() {
    return {
      value: null
    };
  },
  methods: {
    save: function() {
      editor.save().then(savedData => {
        console.log(savedData.blocks);
        this.value = savedData;
      });
    },
    myEditor: function() {
      window.editor = new EditorJS({
        holder: "codex-editor",
        autofocus: true,
        /**
         * This Tool will be used as default
         */
        initialBlock: "paragraph",
        tools: {
          // style: StyleInlineTool,
          changeCase: {
            class: ChangeCase,
            config: {
              showLocaleOption: true, // enable locale case options
              locale: 'tr' // or ['tr', 'TR', 'tr-TR']
            }
          },
          inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+M',
          },
          raw: RawTool,
          Marker: {
            class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
            config: {
              defaultColor: '#FFBF00',
              type: 'marker',
            },
            shortcut: 'CMD+SHIFT+M',
          },
          header: {
            class: Header,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+H"
          },
          list: {
            class: List,
            // class: NestedList,
            inlineToolbar: true,
          },
          paragraph: {
            class: Paragraph,
            config: {
              placeholder: ".",
              inlineToolbar: true,
            }
          },
          // add custom tags or overwrite default tools of editorjs by using the same
          // name (eg. `bold` or `italic`)
          bold: {
            class: createGenericInlineTool({
              sanitize: {
                strong: {},
              },
              shortcut: 'CMD+B',
              tagName: 'STRONG',
              toolboxIcon:
                '<svg class="icon icon--bold" width="12px" height="14px"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bold"></use></svg>',
            }),
          },
          // or use a pre-defined tool instead
          italic: ItalicInlineTool,
          underline: UnderlineInlineTool,
          image: Image,
          embed: Embed,
          table: {
            class: Table,
          },
          Color: {
            class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
            config: {
              colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
              defaultColor: '#FF1300',
              type: 'text',
            }
          },
        },
        onReady: function() {
          console.log("ready");
        },
        onChange: function(data) {
          console.log("change",data);
        }
      });
    }
  },
  mounted: function() {
    this.myEditor();
  }
};
</script>

<style lang="css" scoped >
.editorx_body {
  width: 60%;
  margin-left: 20%;
  border: 2px solid #f1f3f5;
  box-sizing: border-box;
}
.ce-block--focused {
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 0.5438550420168067) 35%,
    rgba(0, 212, 255, 1) 100%
  );
}
</style>
