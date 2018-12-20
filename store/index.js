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
      getBooks: (state) => ({titleKeyWord, sortKey, order}) => {

        // sort
        state.books.sort((a, b) => {
          if(!a.hasOwnProperty(sortKey) || !b.hasOwnProperty(sortKey)) {
            return 0;
          }
          let comparison = a[sortKey].toString().localeCompare(b[sortKey].toString());
          return comparison * order;
        });

        // keyWord
        if (titleKeyWord && titleKeyWord !== '') {
          return state.books.filter((book) => {
            return book.title.indexOf(titleKeyWord) > -1;
          });
        }

        return state.books;
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
