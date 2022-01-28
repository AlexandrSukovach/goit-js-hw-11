import { Notify } from 'notiflix/build/notiflix-notify-aio';
// console.log(refs.searchFormButton.value);
const axios = require('axios');
export default class NewsApiService {
   constructor() {
      this.searchQuery = '';
      this.page = 1;
      this.reg_page = 0;
      this.pageLength = 40;
   };

   // ================async/await================

   async fetchArticles() {
      // =================axios===================
      const response = await axios.get(`https://pixabay.com/api/?key=25024610-b715c2d32e80bfb8f3c0998cb&image_type=photo&orientation=horizontal&safesearch=true&q=${this.searchQuery}&per_page=40&page=${this.page}`)

      // console.log(response.data.totalHits)
      if (this.page === 1 && response.data.hits !== 0) {
         Notify.success(`Hooray! We found ${response.data.hits} images.`);
      }
      let hits = response.data.hits
      this.incrementPage();
      return await hits;
   };
   incrementPage() {
      this.page += 1;
   };
   resetPage() {
      this.page = 1;
   };
   get query() {
      return this.searchQuery;
   };
   set query(newQuery) {
      this.searchQuery = newQuery;
   };
};

































































// ===========================без-async/await/axios===============================

// export default class NewsApiService {
//    constructor() {
//       this.searchQuery = '';
//       this.page = 1;
//       this.reg_page = 0;
//       this.hit_leng = 0;
//    };
//    fetchArticles() {
//       // console.log('do-', this);
//       return fetch(`https://pixabay.com/api/?key=25024610-b715c2d32e80bfb8f3c0998cb&image_type=photo&orientation=horizontal&safesearch=true&q=${this.searchQuery}&per_page=40&page=${this.page}`)
//          .then(response => {
//             // console.log(response.json)
//             return response.json()
//          })
//          .then(({ hits }) => {
//             // console.log('this.reg_page-', this.reg_page)
//             // this.reg_page += 40;
//             // this.hit_leng += hits.length;
//             // // console.log('this.hit_leng-', this.hit_leng)
//             // // console.log('hits.length-', hits.length)
//             // // console.log('this.reg_page-', this.reg_page)
//             this.incrementPage();
//             return hits;
//          });
//    };
//    incrementPage() {
//       this.page += 1;
//       // console.log('this.page-', this.page)
//       // this.reg_page += 40;
//       // console.log('this.reg_page-', this.reg_page)
//       // // this.hit_leng += hits.length;
//       // console.log('this.hit_leng-', this.hit_leng)
//       // console.log('hits.length-', this.hits.length)
//    };
//    resetPage() {
//       this.page = 1;
//    };
//    get query() {
//       return this.searchQuery;
//    };
//    set query(newQuery) {
//       this.searchQuery = newQuery;
//    };
// };
