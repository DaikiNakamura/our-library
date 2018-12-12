<template>
  <div class="container">
    <h3 class="title">本の登録</h3>
    <div class="field">
      <label class="label">ISBN</label>
      <div class="control">
        <input class="input" type="text" placeholder="ISBNを入力してください"
               v-model="form.isbn">
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
  export default {
    data() {
      return {
        form: {
          isbn: '',
          title: '',
          subTitle: '',
          author: ''
        }
      }
    },
    methods: {
      submit() {
        db.collection('books').add(this.form);
        this.form = {};
      },
      reset() {
        this.form = {};
      }
    }
  }
</script>

<style>
</style>
