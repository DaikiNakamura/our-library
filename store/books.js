export const state = () => ({
  list: [{
    isbn: '9784478420409',
    title: 'ザ・ゴール',
    subTitle: '企業の究極の目的とは何か',
    author: 'エリヤフ・ゴールドラット'
  }, {
    isbn: '9784478420416',
    title: 'ザ・ゴール2',
    subTitle: '思考プロセス',
    author: 'エリヤフ・ゴールドラット'
  }, {
    isbn: '9784478420447',
    title: 'チェンジ・ザ・ルール！',
    subTitle: 'なぜ、出せるはずの利益がでないのか',
    author: 'エリヤフ・ゴールドラット'
  }] // dummy data
});

export const mutations = {
  add (state, book) {
    state.list.push(book)
  }
};
