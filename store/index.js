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
        await bindFirebaseRef('books', ref);
      })
    },
    getters: {
      getBooks: (state) => {
        return state.books
      },
      getBooksByKeyWord: (state) => (keyWord) => {
        return state.books.filter((book) => {
          let flg = false;
          if (book.title.indexOf(keyWord) > -1) {
            flg = true;
          }
          return flg;
        });
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
