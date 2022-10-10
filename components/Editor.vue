<template>
  <div id="editorjs" />
</template>

<script>
// const edjsParser = edjsHTML();

import edjsHTML from './editorjs-html'
const edjsParser = edjsHTML()
// const edjsHTML = require("editorjs-html");
// const edjsParser = edjsHTML();

export default {
  name: 'Editor',
  props: {
    existingContent: { type: Object, default: () => {} }
  },
  data() {
    return {
      editor: null,
    }
  },
  async mounted() {
    const editorOptions = {
      id: 'editorjs',
      data: this.existingContent,
      onChange: this.onChange
    };
    this.editor = this.$editor(editorOptions);
    await this.editor.isReady;
  },
  methods: {
    async onChange() {
      try {
        const updatedData = await this.editor.save();
        console.log('Article data saved: ', updatedData)


        console.log('edjsParser edjsHTML', typeof edjsParser)
        console.log('edjsParser', edjsParser.parse(updatedData))

        // let html = edjsParser.parse(updatedData);
        //
        // console.log(html);



        this.$emit('contentChanged', updatedData);
      } catch (error) {
        console.log('Saving failed: ', error)
      }
    },
  }
}
</script>
