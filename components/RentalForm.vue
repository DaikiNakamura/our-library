<template>
  <div class="modal" v-bind:class="{ 'is-active': isShow }" v-if="targetBook">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" v-if="targetBook.borrowDate === ''">借りる</p>
        <p class="modal-card-title" v-else>返す</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <div v-if="targetBook.borrowDate === ''">
          <p><b>{{ targetBook.title }}</b></p>
          <p>を借りる場合、以下に名前を入力してください。</p>
          <input class="input is-primary" type="text" placeholder="名前" v-model="borrower">
        </div>
        <div v-else>
          <p><b>{{ targetBook.title }}</b></p>
          <p>を返却しますか？</p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" v-if="targetBook.borrowDate === ''" @click="rental">借りる</button>
        <button class="button is-danger" v-else @click="back">返す</button>
        <button class="button" @click="$emit('close')">キャンセル</button>
      </footer>
    </div>
  </div>
</template>

<script>
  import {db} from '~/plugins/firebase.js'
  import moment from 'moment'
  export default {
    name: "RentalForm",
    props: {
      isShow: Boolean,
      targetBook: Object
    },
    data() {
      return {
        borrower: ''
      }
    },
    methods: {
      rental() {
        var bookRef = db.collection('books').doc(this.targetBook.id);
        bookRef.set({
          borrower: this.borrower,
          borrowDate: moment().format('YYYYMMDD')
        }, { merge: true });
        this.$emit('close');
      },
      back() {
        var bookRef = db.collection('books').doc(this.targetBook.id);
        bookRef.set({
          borrower: '',
          borrowDate: ''
        }, { merge: true });
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>

</style>
