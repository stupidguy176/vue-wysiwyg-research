<template>
  <div>
    <div style="display: flex; justify-content: center">
      <h1>Mypage</h1>
    </div>
    <div class="editorx_body">
      <div class id="codex-editor"/>
    </div>
  </div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import {EDITOR_JS_TOOLS_MYPAGE} from "../mypage/const";

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
        tools: EDITOR_JS_TOOLS_MYPAGE,
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
</style>
