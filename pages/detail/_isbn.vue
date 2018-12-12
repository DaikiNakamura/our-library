<template>
  <div class="container" v-if="book">
    <h1 class="title">{{ book.title }}</h1>
    <h2 class="subtitle">{{ book.subTitle }}</h2>
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
      const bookData = data.items[0].volumeInfo;
      console.log(bookData);
      return {
        book: {
          title: bookData.title,
          subTitle: bookData.subtitle
        }
      };
    }
  }
</script>

<style>
</style>
