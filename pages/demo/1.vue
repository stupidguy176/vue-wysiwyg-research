<template>
  <div>
    <div style="display: flex; justify-content: center">
      <h1>Demo 1</h1>
    </div>
    <div class="editorx_body">
      <div class id="codex-editor3"/>
    </div>
    <button style="margin-left: 30%;" type="button" name="button" @click="save()">save</button>
    <div class="editorx_body">
      <pre>{{value}}</pre>
    </div>
  </div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import {EDITOR_JS_TOOLS1} from "./constants";

export default {
  data() {
    return {
      value: null
    };
  },
  methods: {
    save: function() {
      editor.save().then(savedData => {
        this.value = savedData;
      });
    },
    myEditor: function() {
      window.editor = new EditorJS({
        holder: "codex-editor3",
        autofocus: true,
        /**
         * This Tool will be used as default
         */
        initialBlock: "paragraph",
        tools: EDITOR_JS_TOOLS1,
        data: {

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

<style lang="css" scoped>
.editorx_body {
  width: 60%;
  margin-left: 20%;
  border: 2px solid #f1f3f5;
  box-sizing: border-box;
}
</style>
