<!--<template>-->
<!--  <div class="wrapper">-->
<!--    <div class="title">demo link fetch</div>-->
<!--    <div class="link">-->
<!--      <div class="item" @click="copyToClipboard(item)" v-for="item in links">{{item}}</div>-->
<!--    </div>-->
<!--    <input v-model="myLink" >-->
<!--    <button @click="test()">check</button>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--import fetch from 'node-fetch'-->
<!--// import domino from 'domino'-->
<!--// import {getMetadata} from 'page-metadata-parser'-->
<!--import getMetaData from 'metadata-scraper'-->
<!--// const getMetaData = require('metadata-scraper')-->

<!--export default {-->
<!--  name: "demo 4",-->
<!--  data() {-->
<!--    return {-->
<!--      myLink: '',-->
<!--      links: [-->
<!--        'https://www.gogojungle.co.jp',-->
<!--        'https://www.youtube.com/watch?v=0tm2OZj0Uug',-->
<!--        'https://www.gogojungle.co.jp/finance/navi/articles/45001',-->
<!--        'https://vuejs.org/guide/essentials/forms.html#checkbox',-->
<!--      ]-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    copyToClipboard(txt) {-->
<!--      navigator.clipboard.writeText(txt);-->
<!--      this.myLink = txt;-->
<!--      // alert("Copied the text: " + txt);-->
<!--    },-->
<!--    async runMe(url) {-->
<!--      const data = await getMetaData(url)-->
<!--      console.log('=====================')-->
<!--      console.log(data)-->
<!--    },-->
<!--    async feu(url) {-->
<!--      if(!url) return-->
<!--      const response = await fetch(url,{-->
<!--        // cache: 'no-store',-->
<!--        // headers: {-->
<!--        //   'If-None-Match': etag-->
<!--        // },-->
<!--      });-->
<!--      // const html = await response.text();-->
<!--      // const doc = domino.createWindow(html).document;-->
<!--      // const metadata = getMetadata(doc, url);-->
<!--      console.log('-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;')-->
<!--      // console.log(metadata);-->

<!--      await this.runMe(url)-->
<!--      // fetch(url, { mode: 'no-cors'})-->
<!--      // fetch(url,{-->
<!--      //     // method: 'GET',-->
<!--      //     // mode: 'no-cors',-->
<!--      //     // headers: {-->
<!--      //     //   'Content-Type': 'application/json',-->
<!--      //     // }-->
<!--      //   })-->
<!--      //   .then((response) => {-->
<!--      //     console.log('&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;')-->
<!--      //     console.log(response)-->
<!--      //     // response.json()-->
<!--      //   })-->
<!--      //   .then((data) => console.log(data));-->

<!--    },-->
<!--    test() {-->
<!--      this.feu(this.myLink)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="css">-->
<!--:root {-->
<!--  &#45;&#45;primary: #2C3E50;-->
<!--  &#45;&#45;secondary: #94adc7;-->
<!--}-->

<!--.title {-->
<!--  color: var(&#45;&#45;primary);-->
<!--}-->
<!--.wrapper {-->
<!--  padding: 20px;-->
<!--}-->
<!--input {-->
<!--  font-size: 16px;-->
<!--  width: 100%;-->
<!--  height: 40px;-->
<!--}-->
<!--button {-->
<!--  height: 40px;-->
<!--  width: 90px;-->
<!--  border: none;-->
<!--  background: var(&#45;&#45;primary);-->
<!--  color: white;-->
<!--  border-radius: 4px;-->
<!--  cursor: pointer;-->
<!--  margin-top: 1.33em;-->
<!--}-->
<!--.link {-->
<!--  padding: 20px 0px;-->
<!--}-->
<!--.item {-->
<!--  cursor: pointer;-->
<!--  padding: 10px 0px;-->
<!--  color: var(&#45;&#45;primary);-->
<!--  transition-duration: 1s;-->
<!--}-->
<!--.item:hover {-->
<!--  background: var(&#45;&#45;secondary);-->
<!--}-->
<!--</style>-->
