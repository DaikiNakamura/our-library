import Vuex from 'vuex'
import {firebaseMutations, firebaseAction} from 'vuexfire'

const createStore = () => {
  return new Vuex.Store({
    state: {
      books: []
    },
    mutations: {
      ...firebaseMutations
    },
    actions: {
      setBooks: firebaseAction(({bindFirebaseRef}, ref) => {
        ref = ref.orderBy('title');
        bindFirebaseRef('books', ref);
      })
    },
    getters: {
      getBooks: (state) => {
        return state.books
      }
    },
  })
};

export default createStore
