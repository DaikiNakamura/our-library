<template>
  <div class="table__wrapper ">
    <div class="field">
      <div class="control">
        <input class="input" type="text" placeholder="タイトルでフィルターをかけることができます" v-model="keyWord">
      </div>
    </div>
    <table class="table is-fullwidth">
      <!--見出し-->
      <thead>
      <tr>
        <th @click="changeSort('title')">
          タイトル
          <i class="fa fa-sort-alpha-asc" v-if="sortKey==='title' && order === 1"></i>
          <i class="fa fa-sort-alpha-desc" v-if="sortKey==='title' && order === -1"></i>
        </th>
        <th @click="changeSort('subTitle')">
          サブタイトル
          <i class="fa fa-sort-alpha-asc" v-if="sortKey==='subTitle' && order === 1"></i>
          <i class="fa fa-sort-alpha-desc" v-if="sortKey==='subTitle' && order === -1"></i>
        </th>
        <th @click="changeSort('author')">
          著者
          <i class="fa fa-sort-alpha-asc" v-if="sortKey==='author' && order === 1"></i>
          <i class="fa fa-sort-alpha-desc" v-if="sortKey==='author' && order === -1"></i>
        </th>
        <th @click="changeSort('targetReader')">
          想定読者
          <i class="fa fa-sort-alpha-asc" v-if="sortKey==='author' && order === 1"></i>
          <i class="fa fa-sort-alpha-desc" v-if="sortKey==='author' && order === -1"></i>
        </th>
        <th>借りる/返す</th>
      </tr>
      </thead>
      <tfoot>
      <tr>
        <th @click="changeSort('title')">タイトル</th>
        <th @click="changeSort('subTitle')">サブタイトル</th>
        <th @click="changeSort('author')">著者</th>
        <th @click="changeSort('targetReader')">想定読者</th>
        <th>借りる/返す</th>
      </tr>
      </tfoot>
      <!--データ-->
      <tbody>
      <tr v-for="book in books" :key="book.isbn">
        <td>
          <nuxt-link :to="{ name:'detail', query: { id: book.id } }">{{ book.title }}</nuxt-link>
        </td>
        <td>{{ book.subTitle }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.targetReader }}</td>
        <td v-if="book.borrowDate === ''"><a class="button is-primary is-outlined" @click="rental(book)">借りる</a></td>
        <td v-else><a class="button is-danger is-outlined" @click="rental(book)">返す({{ book.borrower }})</a></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "BookList",
    data() {
      return {
        keyWord: '',
        sortKey: 'title',
        order: 1
      }
    },
    computed: {
      books() {
        return this.$store.getters.getBooks({
          titleKeyWord: this.keyWord,
          sortKey: this.sortKey,
          order: this.order
        });
      }
    },
    methods: {
      rental(book) {
        this.$emit('event-rental', book);
      },
      changeSort(sortKey) {
        this.sortKey = sortKey;
        this.order *= -1;
      }
    }
  }
</script>

<style scoped>
  .table__wrapper {
    overflow-x: auto;
  }
  .table th {
    cursor: pointer;
  }
</style>
