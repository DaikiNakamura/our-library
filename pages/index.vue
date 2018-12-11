<template>
  <div class="container">
    <h3 class="title">書籍一覧</h3>
    <book-list />
  </div>
</template>

<script>
  import BookList from '~/components/BookList.vue'

  export default {
    components: {
      BookList
    }
  }
</script>

<style>
</style>
