

import hitsTpl from './templates/articles.hbs';
import './css/styles.css';
import NewsApiService from './js/news-servis';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import LoadMoreBtn from './js/components/load-more-btn';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// ===api key for pixabay==25024610-b715c2d32e80bfb8f3c0998cb===

const refs = {
   searchForm: document.querySelector('.search-form'),
   hitsContainer: document.querySelector('.gallery'),
   loadMoreBtn: document.querySelector('.load-more'),
   searchFormButton: document.querySelector('.search-form button'),
   searchFormInput: document.querySelector('.search-form input'),
   loadMoreBtnSpan: document.querySelector('.load-more span'),
};

//===============style and class=========================
refs.searchFormButton.insertAdjacentHTML("afterbegin", "<span>&#128269;</span>");
refs.loadMoreBtn.insertAdjacentHTML("afterbegin", "<span class='label'>Load more</span>");
refs.loadMoreBtn.setAttribute('class', 'button load-more');
refs.loadMoreBtn.setAttribute('data-action', 'load-more');
refs.searchForm.setAttribute("style", "display: flex; justify-content: center; padding: 8px; margin-bottom: 24px; background-color: mediumblue;");
refs.searchFormInput.setAttribute("style", "cursor: pointer;");
refs.searchFormButton.setAttribute("style", "cursor: pointer;");
refs.hitsContainer.setAttribute("style", "display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); grid-gap: 20px; padding: 0; margin: 0; list-style: none;  max-width: calc(100vw - 80px); margin-left: auto; margin-right: auto; margin-bottom: 30px;");
refs.loadMoreBtn.setAttribute("style", "margin: 0 auto; cursor: pointer; padding: 10px 20px; color: #fafafa; background-color: rgb(76, 76, 238); border-radius: 3px;");

const pageLength = 40;
const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
   selector: '[data-action="load-more"]',
   hidden: true,
});



refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
   e.preventDefault();
   newsApiService.query = e.currentTarget.elements.searchQuery.value;
   if (newsApiService.query === '') {
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
   };
   loadMoreBtn.show();
   newsApiService.resetPage();
   clearArticlesContainer();
   fetchArticles();
};

function fetchArticles() {
   loadMoreBtn.disable();
   newsApiService.fetchArticles().then(results => {
      appendArticlesMarkup(results);
      loadMoreBtn.enable();
   });
};

// =======SimpleLightbox============
let lightbox = new SimpleLightbox('.gallery a', { doubleTapZoom: 1.2, captionDelay: 300 });

function appendArticlesMarkup(results) {

   if (results.length === 0) {
      refs.loadMoreBtn.setAttribute('class', 'load-more btn btn-primary button is-hidden');
      lightbox.refresh();
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
   } else if (results.length < pageLength && results.length > 0) {
      refs.loadMoreBtn.setAttribute('class', 'load-more btn btn-primary button is-hidden');
      refs.hitsContainer.insertAdjacentHTML('beforeend', hitsTpl(results));
      lightbox.refresh();
      return Notify.info("We're sorry, but you've reached the end of search results.");
   }
   refs.hitsContainer.insertAdjacentHTML('beforeend', hitsTpl(results));
   lightbox.refresh();
};

function clearArticlesContainer() {
   refs.hitsContainer.innerHTML = '';
};





