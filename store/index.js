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
      setBooks: firebaseAction(async ({bindFirebaseRef}, ref) => {
        ref = ref.orderBy('title');
        await bindFirebaseRef('books', ref);
      })
    },
    getters: {
      getBooks: (state) => {
        return state.books
      },
      getBook: (state) => (id) => {
        return state.books.filter((book) => {
          return book.id === id;
        })[0];
      }
    },
  })
};

export default createStore
