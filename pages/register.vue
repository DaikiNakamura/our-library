<template>
  <div class="container">
    <h3 class="title">本の登録</h3>
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
    <div class="field is-grouped">
      <div class="control">
        <button name="submit" class="button is-link" v-on:click="submit">Submit</button>
      </div>
      <div class="control">
        <button name="reset" class="button is-text" v-on:click="reset">Reset</button>
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
        form: {
          isbn: '',
          title: '',
          subTitle: '',
          author: '',
          borrowDate: '',
          borrower: ''
        }
      }
    },
    methods: {
      reset() {
        this.form.isbn = '';
        this.form.title = '';
        this.form.subTitle = '';
        this.form.author = '';
      },
      submit() {
        db.collection('books').add(this.form);
        this.reset();
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
