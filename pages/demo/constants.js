import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
// import SimpleImage from "@editorjs/simple-image";
import ChangeCase from "editorjs-change-case";
import RawTool from "@editorjs/raw";
import ColorPlugin from "editorjs-text-color-plugin";
import Paragraph from "@editorjs/paragraph";
// import ImageTool from "eimg/src";
import createGenericInlineTool, {ItalicInlineTool, UnderlineInlineTool} from "editorjs-inline-tool";
import ImageTool from "~/plugins/image-master";

export const EDITOR_JS_TOOLS1 = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  // simpleImage: SimpleImage
};

export const EDITOR_JS_TOOLS_2 = {
  embed: Embed,
  raw: RawTool,
  // simpleImage: SimpleImage,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
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
    inlineToolbar: true,
  },
  paragraph: {
    class: Paragraph,
    config: {
      placeholder: ".",
      inlineToolbar: true,
    }
  },
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
  italic: ItalicInlineTool,
  underline: UnderlineInlineTool,
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
}


export const EDITOR_JS_TOOLS_3 = {
  embed: Embed,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        async uploadByFile(file) {
          console.log('uploadByFile', file)
          if(file.type.includes('image')) {
            let img = file
            img.imgUrl = URL.createObjectURL(file)
            return {
              success: 1,
              file: {
                url: img.imgUrl
              }
            }
          }
        },
        async uploadByUrl(url){
          console.log('uploadByUrl', url)
          return {
            success: 1,
            file: {
              url: url,
              // any other image data you want to store, such as width, height, color, extension, etc
            }
          }
        },
      },
    }
  },
}


// export const EDITOR_JS_TOOLS_2 = {
//   // style: StyleInlineTool,
//   changeCase: {
//     class: ChangeCase,
//     config: {
//       showLocaleOption: true, // enable locale case options
//       locale: 'tr' // or ['tr', 'TR', 'tr-TR']
//     }
//   },
//   inlineCode: {
//     class: InlineCode,
//     shortcut: 'CMD+SHIFT+M',
//   },
//   raw: RawTool,
//   Marker: {
//     // class: Marker,
//     class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
//     config: {
//       defaultColor: '#FFBF00',
//       type: 'marker',
//     },
//     shortcut: 'CMD+SHIFT+M',
//   },
//   header: {
//     class: Header,
//     inlineToolbar: true,
//     shortcut: "CMD+SHIFT+H"
//   },
//   list: {
//     class: List,
//     // class: NestedList,
//     inlineToolbar: true,
//   },
//   paragraph: {
//     class: Paragraph,
//     config: {
//       placeholder: ".",
//       inlineToolbar: true,
//     }
//   },
//   // add custom tags or overwrite default tools of editorjs by using the same
//   // name (eg. `bold` or `italic`)
//   bold: {
//     class: createGenericInlineTool({
//       sanitize: {
//         strong: {},
//       },
//       shortcut: 'CMD+B',
//       tagName: 'STRONG',
//       toolboxIcon:
//         '<svg class="icon icon--bold" width="12px" height="14px"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bold"></use></svg>',
//     }),
//   },
//   // or use a pre-defined tool instead
//   italic: ItalicInlineTool,
//   underline: UnderlineInlineTool,
//   // toggle: {
//   //   class: ToggleBlock,
//   //   inlineToolbar: true,
//   // },
//   // image: {
//   //   class: ImageTool,
//   //   // config: {
//   //   //   // endpoints: {
//   //   //     // byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
//   //   //     // byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
//   //   //   // }
//   //   // }
//   // },
//   // linkTool: {
//   //   class: LinkTool,
//   //   config: {
//   //     endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
//   //   }
//   // },
//   // attaches: {
//   //   class: AttachesTool,
//   //   config: {
//   //     endpoint: 'http://localhost:3000/'
//   //   }
//   // },
//   // linkTool: {
//   //   class: LinkTool,
//   //   config: {
//   //     endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
//   //   }
//   // },
//   embed: Embed,
//   table: {
//     class: Table,
//   },
//   Color: {
//     class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
//     config: {
//       colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
//       defaultColor: '#FF1300',
//       type: 'text',
//     }
//   },
// }
