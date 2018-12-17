<template>
  <div class="container">
    <h1 class="title">{{ book.title }}</h1>
    <h2 class="subtitle">{{ book.subTitle }}</h2>
    <hr/>
    <div class="media">
      <figure class="media-left">
        <p class="image is-128x128">
          <img v-bind:src="book.imageUrl">
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
        <nuxt-link :to="{ name:'edit-isbn', params: { isbn: book.isbn, book: book, id: id } }" class="button is-success">編集</nuxt-link>
      </p>
      <p class="control">
        <a class="button is-danger" @click="deleteBook(id)">
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
    async asyncData({params}) {

      let apiBookData = {};
      let {data} = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${params.isbn}`);
      if (data.items && data.items.length > 0) {
        let apiData = data.items[0].volumeInfo;
        let imageLinks = apiData.imageLinks ? apiData.imageLinks : null;
        apiBookData = {
          title: apiData.title,
          subTitle: apiData.subtitle,
          description: apiData.description,
          publisher: apiData.publisher,
          imageUrl: imageLinks ? imageLinks.smallThumbnail : ''
        };
      }

      return {
        id: params.book.id,
        book: Object.assign({}, params.book, apiBookData)
      };
    },
    methods: {
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
