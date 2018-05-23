/* eslint camelcase: 0 */

const dom = require('./dom');

let tmdbKey = '';

const setKey = (key) => {
  tmdbKey = key;
};

const searchTMDB = (txt) => {
  return new Promise((resolve, reject) => {
    $.ajax(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${txt}`)
      .done((result) => {
        resolve(result.results);
      })
      .fail((errrorrrr) => {
        reject(errrorrrr);
      });
  });
};

const showResults = (searchText) => {
  searchTMDB(searchText)
    .then((results) => {
      dom.domString(results);
    })
    .catch((err) => {
      console.error('search error',err);
    });
};

module.exports = {
  showResults,
  setKey,
};
