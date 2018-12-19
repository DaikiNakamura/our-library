<template>
  <div class="container">
    <h1 class="title">{{ book.title }}</h1>
    <h2 class="subtitle">{{ book.subTitle }}</h2>
    <hr/>
    <div class="media">
      <figure class="media-left">
        <p>
          <img v-bind:src="book.imageUrl" class="image is-128x256">
        </p>
      </figure>
      <div class="media-content">
        <h3 class="title is-5">概要：</h3>
        <p>{{ book.description }}</p>
        <br/>
        <h3 class="title is-5">出版社：</h3>
        <p>{{ book.publisher }}</p>
      </div>
    </div>
    <div class="field is-grouped button-grouped">
      <p class="control">
        <a class="button is-link" href="/">
          戻る
        </a>
      </p>
      <p class="control">
        <nuxt-link :to="{ name:'edit', query: { id: $route.query.id } }" class="button is-success">編集</nuxt-link>
      </p>
      <p class="control">
        <a class="button is-danger" @click="deleteBook($route.query.id)">
          この本を削除する
        </a>
      </p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {db} from '~/plugins/firebase.js'

  export default {
    data() {
      return {
        apiBookData: null
      };
    },
    computed: {
      book() {
        return Object.assign({}, this.$store.getters.getBook(this.$route.query.id), this.apiBookData);
      }
    },
    mounted() {
      // APIからデータを取得
      this.setBookDetailFromGoogleBooks(this.book.isbn);
    },
    methods: {
      async setBookDetailFromGoogleBooks(isbn) {

        // APIから取得済みの場合は処理を抜ける
        if (this.apiBookData) {
          return;
        }

        // GoogleBooks API上のデータ
        let book = {};
        let {data} = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        if (data.items && data.items.length > 0) {
          let apiData = data.items[0].volumeInfo;
          let imageLinks = apiData.imageLinks ? apiData.imageLinks : null;
          book = {
            title: apiData.title,
            subTitle: apiData.subtitle,
            description: apiData.description,
            publisher: apiData.publisher,
            imageUrl: imageLinks ? imageLinks.smallThumbnail : ''
          };

          this.apiBookData = Object.assign({}, book);
        }
      },
      deleteBook(id) {
        db.collection('books').doc(id).delete()
          .then(() => {
            window.location.href = '/';
          });
      }
    }
  }
</script>

<style scoped>
  .button-grouped {
    margin-top: 50px;
  }
</style>
