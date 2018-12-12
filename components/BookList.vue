<template>
  <table class="table">
    <!--見出し-->
    <thead>
    <tr>
      <th>ISBN</th>
      <th>タイトル</th>
      <th>サブタイトル</th>
      <th>著者</th>
    </tr>
    </thead>
    <tfoot>
    <tr>
      <th>ISBN</th>
      <th>タイトル</th>
      <th>サブタイトル</th>
      <th>著者</th>
    </tr>
    </tfoot>
    <!--データ-->
    <tbody>
    <tr v-for="book in books" :key="book.isbn">
      <td>{{ book.isbn }}</td>
      <td>{{ book.title }}</td>
      <td>{{ book.subTitle }}</td>
      <td>{{ book.author }}</td>
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
