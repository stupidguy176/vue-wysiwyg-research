// import Embed from "@editorjs/embed";
// import SimpleImage from "@editorjs/simple-image";
// import Warning from "@editorjs/warning";
// import LinkTool from "@editorjs/link";
// import Quote from "@editorjs/quote";
// import CheckList from "@editorjs/checklist";
// import Delimiter from "@editorjs/delimiter";
// import ChangeCase from "editorjs-change-case";
import ColorPlugin from "editorjs-text-color-plugin";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import createGenericInlineTool, {ItalicInlineTool, UnderlineInlineTool} from "editorjs-inline-tool";
import Table from "@editorjs/table";
import Embed from "~/plugins/embed-master/src";

export const EDITOR_JS_TOOLS_MYPAGE = {
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true
      }
    }
  },
  // image: SimpleImage,
  // warning: Warning,
  // linkTool: LinkTool,
  // quote: Quote,
  // checklist: CheckList,
  // delimiter: Delimiter,
  // changeCase: {
  //   class: ChangeCase,
  //   config: {
  //     showLocaleOption: true, // enable locale case options
  //     locale: 'tr' // or ['tr', 'TR', 'tr-TR']
  //   }
  // },
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
      colorCollections: ['#EC7878', '#9C27B0', '#673AB7', '#3F51B5', '#0070FF', '#03A9F4', '#00BCD4', '#4CAF50', '#8BC34A', '#CDDC39', '#FFF'],
      defaultColor: '#FF1300',
      type: 'text',
    }
  },
}
