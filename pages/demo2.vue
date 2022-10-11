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
import Marker from '@editorjs/marker';
// import StyleInlineTool from "editorjs-style";
// import ToggleBlock from 'editorjs-toggle-block';
// import ImageTool from '@editorjs/image';
// import LinkTool from '@editorjs/link';
// import AttachesTool from '@editorjs/attaches';
import Embed from '@editorjs/embed';
import NestedList from '@editorjs/nested-list';
// import LinkTool from '@editorjs/link';
import Table from 'editorjs-table';

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
        console.log(savedData);
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
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },
          header: {
            class: Header,
            shortcut: "CMD+SHIFT+H"
          },
          list: {
            // class: List
            class: NestedList,
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
          // toggle: {
          //   class: ToggleBlock,
          //   inlineToolbar: true,
          // },
          // image: {
          //   class: ImageTool,
          //   // config: {
          //   //   // endpoints: {
          //   //     // byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
          //   //     // byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
          //   //   // }
          //   // }
          // },
          // linkTool: {
          //   class: LinkTool,
          //   config: {
          //     endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
          //   }
          // },
          // attaches: {
          //   class: AttachesTool,
          //   config: {
          //     endpoint: 'http://localhost:3000/'
          //   }
          // },
          // linkTool: {
          //   class: LinkTool,
          //   config: {
          //     endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
          //   }
          // },
          embed: Embed,
          table: {
            class: Table,
          }
        },
        onReady: function() {
          console.log("ready");
        },
        onChange: function() {
          console.log("change");
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
  /* width: 62%;
  margin-left: 15%; */
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
