<template>
  <div class="container" v-if="book">
    <h1 class="title">{{ book.title }}</h1>
    <h2 class="subtitle">{{ book.subTitle }}</h2>
    <hr />
    <div class="media">
      <figure class="media-left">
        <p class="image is-128x128">
          <img v-bind:src="book.imageUrl">
        </p>
      </figure>
      <div class="media-content">
        <h3 class="title is-5">概要：</h3>
        <p>{{ book.description }}</p>
        <br />
        <h3 class="title is-5">出版社：</h3>
        <p>{{ book.publisher }}</p>
      </div>
    </div>
  </div>
  <div class="container" v-else>
    GoogleBooksAPIにデータが存在しません。
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    async asyncData({params}) {
      let {data} = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${params.isbn}`);

      // Googleにデータが存在しない
      if (!data.items) {
        return {
          book: null
        };
      }

      // データ取得
      let bookData = data.items[0].volumeInfo;
      console.log(bookData);
      return {
        book: {
          title: bookData.title,
          subTitle: bookData.subtitle,
          description: bookData.description,
          publisher: bookData.publisher,
          imageUrl: bookData.imageLinks.smallThumbnail
        }
      };
    }
  }
</script>

<style>
</style>
