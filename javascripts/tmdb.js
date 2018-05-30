/* eslint camelcase: 0 */

const dom = require('./dom');

let tmdbKey = '';
let imageConfig = {};

const setKey = (key) => {
  tmdbKey = key;
  getConfig();
};

const getImageConfig = () => {
  return imageConfig;
};

const getConfig = () => {
  tmdbConfiguration()
    .then((result) => {
      imageConfig = result.images;
    })
    .catch((err) => {
      console.error('Error with tmdb config', err);
    });
};

const tmdbConfiguration = () => {
  return new Promise((resolve, reject) => {
    $.ajax(`https://api.themoviedb.org/3/configuration?api_key=${tmdbKey}`)
      .done((data) => {
        resolve(data);
      })
      .fail((error) => {
        reject(error);
      });
  });
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
      dom.domString(results, imageConfig, 'movies');
    })
    .catch((err) => {
      console.error('search error',err);
    });
};

module.exports = {
  showResults,
  setKey,
  getImageConfig,
};
