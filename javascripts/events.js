/* eslint camelcase: 0 */

const tmdb = require('./tmdb');
const firebaseApi = require('./firebaseApi');
const dom = require('./dom');

const showSearch = () => {
  $('#myMovies').addClass('hide');
  $('#authScreen').addClass('hide');
  $('#search').removeClass('hide');
};

const showMyMovies = () => {
  $('#myMovies').removeClass('hide');
  $('#authScreen').addClass('hide');
  $('#search').addClass('hide');
};

const showSignIn = () => {
  $('#myMovies').addClass('hide');
  $('#authScreen').removeClass('hide');
  $('#search').addClass('hide');
};

const bindEvents = () => {
  $('#searchBtn').on('click', () => {
    $('.active').removeClass('active');
    $('#searchBtn').addClass('active');
    showSearch();
  });

  $('#myMoviesBtn').on('click', () => {
    $('.active').removeClass('active');
    $('#myMoviesBtn').addClass('active');
    showMyMovies();
    getAllMoviesEvent();
  });

  $('#authBtn').on('click', () => {
    $('.active').removeClass('active');
    $('#authBtn').addClass('active');
    showSignIn();
  });
};

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      const searchWords = $('#searchBar').val().replace(' ', '%20');
      tmdb.showResults(searchWords);
    }
  });
};

const saveMovieToWishListEvent = () => {
  $(document).on('click', '.addMovieToWishlist', (e) => {
    const movieToAddCard = $(e.target).closest('.movie');
    const movieToAdd = {
      title: movieToAddCard.find('.movie-title').text(),
      overview: movieToAddCard.find('.movie-overview').text(),
      poster_path: movieToAddCard.find('img').data('poster'),
      rating: 0,
      isWatched: false,
    };
    firebaseApi.saveMovieToWishlist(movieToAdd)
      .then(() => {
        movieToAddCard.remove();
      })
      .catch((error) => {
        console.error('error in saving movie', error);
      });
  });
};

const getAllMoviesEvent = () => {
  firebaseApi.getAllMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies');
    })
    .catch((error) => {
      console.error('error in get all movies', error);
    });
};

const initializer = () => {
  bindEvents();
  pressEnter();
  saveMovieToWishListEvent();
};

module.exports = {
  initializer,
};

// const myLinks = () => {
//   $(document).click((e) => {
//     if (e.target.id === 'authBtn') {
//       $('#myMovies').addClass('hide');
//       $('#search').addClass('hide');
//       $('#authScreen').removeClass('hide');
//       $('.active').removeClass('active');
//       $('#authBtn').addClass('active');
//     } else if (e.target.id === 'myMoviesBtn') {
//       $('#myMovies').removeClass('hide');
//       $('#search').addClass('hide');
//       $('#authScreen').addClass('hide');
//       $('.active').removeClass('active');
//       $('#myMoviesBtn').addClass('active');
//       getAllMoviesEvent();
//     } else if (e.target.id === 'searchBtn') {
//       $('#myMovies').addClass('hide');
//       $('#search').removeClass('hide');
//       $('#authScreen').addClass('hide');
//       $('.active').removeClass('active');
//       $('#searchBtn').addClass('active');
//     }
//   });
// };

// module.exports = myLinks;
