import { successRequest, invalidRequest } from './notifications.js';

const BASE_URL =
  'https://pixabay.com/api/?key=21846437-66fd09c28b54c2b2cddc581a4';

export default class Images {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const url = `${BASE_URL}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12`;

    return await fetch(url)
      .then(resp => resp.json())
      .then(({ hits }) => {
        if (hits.length === 0) {
          return invalidRequest();
        } else {
          this.incrementPage();
          successRequest();
          return hits;
        }
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}