<template>
  <div class="table__wrapper ">
    <table class="table">
      <!--見出し-->
      <thead>
      <tr>
        <th>タイトル</th>
        <th>サブタイトル</th>
        <th>著者</th>
        <th>借りる/返す</th>
      </tr>
      </thead>
      <tfoot>
      <tr>
        <th>タイトル</th>
        <th>サブタイトル</th>
        <th>著者</th>
        <th>借りる/返す</th>
      </tr>
      </tfoot>
      <!--データ-->
      <tbody>
      <tr v-for="book in books" :key="book.isbn">
        <td>
          <nuxt-link :to="{ name:'detail-isbn', params: { isbn: book.isbn, book: book } }">{{ book.title }}</nuxt-link>
        </td>
        <td>{{ book.subTitle }}</td>
        <td>{{ book.author }}</td>
        <td v-if="book.borrowDate === ''"><a class="button is-primary is-outlined" @click="rental(book)">借りる</a></td>
        <td v-else><a class="button is-danger is-outlined" @click="rental(book)">返す({{ book.borrower }})</a></td>
      </tr>
      </tbody>
    </table>
  </div>
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
    },
    methods: {
      rental(book) {
        this.$emit('event-rental', book);
      }
    }
  }
</script>

<style scoped>
  .table__wrapper {
    overflow-x: auto;
  }
</style>
