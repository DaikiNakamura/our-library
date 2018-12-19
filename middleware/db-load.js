import {db} from '~/plugins/firebase.js'
export default async ({ route, redirect, store }) => {
  // Storeにデータがない場合、Firebaseから再取得をする
  if(!store.state.books || store.state.books.length === 0) {
    await store.dispatch('setBooks', db.collection('books'));
  }
}
