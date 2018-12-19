<template>
  <div class="container">
    <h3 class="title">本の編集</h3>
    <div class="field">
      <label class="label">ISBN</label>
      <div class="field has-addons">
        <div class="control is-expanded">
          <input class="input" type="text" placeholder="ISBNを入力してください"
                 v-model="form.isbn">
        </div>
        <div class="control">
          <a class="button is-info" v-on:click="inputFromApi()">
            APIから取得
          </a>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">タイトル</label>
      <div class="control">
        <input class="input" type="text" placeholder="タイトルを入力してください"
               v-model="form.title">
      </div>
    </div>
    <div class="field">
      <label class="label">サブタイトル</label>
      <div class="control">
        <input class="input" type="text" placeholder="サブタイトルを入力してください"
               v-model="form.subTitle">
      </div>
    </div>
    <div class="field">
      <label class="label">著者</label>
      <div class="control">
        <input class="input" type="text" placeholder="著者を入力してください"
               v-model="form.author">
      </div>
    </div>
    <div class="field">
      <label class="label">想定読者</label>
      <div class="control">
        <input class="input" type="text" placeholder="想定読者を入力してください"
               v-model="form.targetReader">
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button name="submit" class="button is-link" v-on:click="submit">更新</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {db} from '~/plugins/firebase.js'
  import axios from 'axios'

  export default {
    data() {
      return {
        form: Object.assign({}, this.$store.getters.getBook(this.$route.params.id))
      };
    },
    methods: {
      submit() {
        let bookRef = db.collection('books').doc(this.$route.params.id);
        bookRef.set(this.form, {merge: true})
          .then(() => {
            window.location.href = '/';
          });
      },
      async inputFromApi() {
        let {data} = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.form.isbn}`);
        if (!data.items) {
          window.alert('データが存在しません');
          return;
        }
        let bookData = data.items[0].volumeInfo;
        this.form.title = bookData.title ? bookData.title : '';
        this.form.subTitle = bookData.subtitle ? bookData.subtitle : '';
        this.form.author = bookData.authors[0] ? bookData.authors[0] : '';
      }
    }
  }
</script>

<style>
</style>
