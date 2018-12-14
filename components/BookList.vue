<template>
  <table class="table">
    <!--見出し-->
    <thead>
    <tr>
      <th>ISBN</th>
      <th>タイトル</th>
      <th>サブタイトル</th>
      <th>著者</th>
      <th>貸出状況</th>
    </tr>
    </thead>
    <tfoot>
    <tr>
      <th>ISBN</th>
      <th>タイトル</th>
      <th>サブタイトル</th>
      <th>著者</th>
      <th>貸出状況</th>
    </tr>
    </tfoot>
    <!--データ-->
    <tbody>
    <tr v-for="book in books" :key="book.isbn">
      <td><nuxt-link :to="{ name:'detail-isbn', params: { isbn: book.isbn } }">{{ book.isbn }}</nuxt-link></td>
      <td>{{ book.title }}</td>
      <td>{{ book.subTitle }}</td>
      <td>{{ book.author }}</td>
      <td v-if="book.borrowDate === ''"><span class="tag is-success">貸出可能</span></td>
      <td v-else><span class="tag is-danger">貸出中</span></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import {db} from '~/plugins/firebase.js'
  import {mapGetters} from 'vuex'

  export default {
    name: "BookList",
    created() {
      this.$store.dispatch('setBooks', db.collection('books'))
    },
    computed: {
      ...mapGetters({books: 'getBooks'})
    }
  }
</script>

<style scoped>

</style>
