import './sass/main.scss';
import { refs } from './js/refs.js';
import Images from './js/imagesClass.js';
import { invalidRequest } from './js/notifications.js';
import * as basicLightbox from 'basiclightbox';

import imagesTpl from './templates/images.hbs';

const imagesList = new Images();

refs.form.addEventListener('submit', onClickButtonSubmit);
refs.loadMore.addEventListener('click', fetchMoreArticles);
refs.list.addEventListener('click', onImageClick);

function onClickButtonSubmit(e) {
  e.preventDefault();

  imagesList.query = e.currentTarget.elements.query.value;

  if (imagesList.query === '') {
    return invalidRequest();
  }

  imagesList.resetPage();
  refs.list.innerHTML = '';
  fetchArticles();
}

function fetchArticles() {
  imagesList.fetchImages()
    .then(images => {
      renderImages(images);

      if (refs.list.children.length !== 0) {
        refs.loadMore.style.display = 'inline-block';
      } else {
        refs.loadMore.style.display = 'none';
      };
    });
}

function renderImages(images) {
  refs.list.insertAdjacentHTML('beforeend', imagesTpl(images));
}

function fetchMoreArticles() {
  imagesList.fetchImages()
    .then(images => {
      renderMoreImages(images);

      refs.loadMore.style.display = 'inline-block';
    });
}

function renderMoreImages(images) {
  refs.list.insertAdjacentHTML('beforeend', imagesTpl(images));
  refs.loadMore.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
});
}

function onImageClick(e) {
  if (e.target.nodeName === 'IMG') {
    const largeImage = e.target.dataset.action;
    const tags = e.target.alt;

    const instance = basicLightbox.create(
      `<img src='${largeImage}' alt='${tags}'>`,
    );
    instance.show();
  }
}
