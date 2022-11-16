<template>
  <div>
    <div style="display: flex; justify-content: center">
      <h1>Demo 3</h1>
    </div>
    <div class="editorx_body">
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
import {EDITOR_JS_TOOLS_3} from "./constants";

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
        tools: EDITOR_JS_TOOLS_3,
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

<style lang="css" scoped>
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
