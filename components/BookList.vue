<template>
  <table class="table">
    <!--見出し-->
    <thead>
    <tr>
      <th>ISBN</th>
      <th>タイトル</th>
      <th>サブタイトル</th>
      <th>著書</th>
    </tr>
    </thead>
    <tfoot>
    <tr>
      <th>ISBN</th>
      <th>タイトル</th>
      <th>サブタイトル</th>
      <th>著書</th>
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
  export default {
    name: "BookList",
    computed: {
      books() {
        return this.$store.state.books.list;
      }
    }
  }
</script>

<style scoped>

</style>
