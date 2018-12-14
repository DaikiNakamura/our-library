<template>
  <div class="container">
    <h3 class="title">書籍一覧</h3>
    <book-list @event-rental="rental" />
    <rental-form v-bind:isShow="isShowRentalForm" v-bind:targetBook="targetBook" @close="isShowRentalForm = false" />
  </div>
</template>

<script>
  import BookList from '~/components/BookList.vue'
  import RentalForm from '~/components/RentalForm.vue'

  export default {
    components: {
      BookList, RentalForm
    },
    data() {
      return {
        isShowRentalForm: true,
        targetBook: null
      }
    },
    methods: {
      rental(book) {
        this.targetBook = book;
        this.isShowRentalForm = true;
      }
    }
  }
</script>

<style>
</style>
