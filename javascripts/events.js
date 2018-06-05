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
    if (e.key === 'Enter' && !$('#search').hasClass('hide')) {
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
      dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies', true);
    })
    .catch((error) => {
      console.error('error in get all movies', error);
    });
};

const getWatchedMoviesEvent = () => {
  firebaseApi.getWatchedMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies', true);
    })
    .catch((error) => {
      console.error('error in get watched movies', error);
    });
};

const getWishlistMoviesEvent = () => {
  firebaseApi.getWishlistMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies', true);
    })
    .catch((error) => {
      console.error('error in get wishlist movies', error);
    });
};

const deleteMovieFromFirebase = () => {
  $(document).on('click', '.deleteMovieFromCollectionEvent', (e) => {
    const movieToDeleteId = $(e.target).closest('.movie').data('firebaseId');
    firebaseApi.deleteMovieFromDb(movieToDeleteId)
      .then(() => {
        getAllMoviesEvent();
      })
      .catch((error) => {
        console.error('could not reprint from db: ', error);
      });
  });
};

const updateMovieEvent = () => {
  $(document).on('click', '.updateMovieToWatched', (e) => {
    const movieToUpdateId = $(e.target).closest('.movie').data('firebaseId');
    const movieToUpdateCard = $(e.target).closest('.movie');
    const updatedMovie = {
      title: movieToUpdateCard.find('.movie-title').text(),
      overview: movieToUpdateCard.find('.movie-overview').text(),
      poster_path: movieToUpdateCard.find('img').data('poster'),
      rating: 0,
      isWatched: true,
    };
    firebaseApi.updateMovieToWatchedInDb(updatedMovie, movieToUpdateId)
      .then(() => {
        getAllMoviesEvent();
      })
      .catch((errrrrrorrrrrr) => {
        console.error('error in updating movie: ', errrrrrorrrrrr);
      });
  });
};

const filterEvents = () => {
  $('#filterButtons').on('click', (e) => {
    const classList = e.target.classList;
    if (classList.contains('wishlist')) {
      // show only isWatched: false;
      getWishlistMoviesEvent();
    } else if (classList.contains('watched')) {
      // show only isWatched: true;
      getWatchedMoviesEvent();
    } else {
      getAllMoviesEvent();
    }
  });
};

const authEvents = () => {
  $('#sign-in-btn').click((e) => {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const password = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        $('.active').removeClass('active');
        $('#myMoviesBtn').addClass('active');
        showMyMovies();
        getAllMoviesEvent();
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  });

  $('#register-link').click(() => {
    $('#login-form').addClass('hide');
    $('#registration-form').removeClass('hide');
  });

  $('#sign-in-link').click(() => {
    $('#login-form').removeClass('hide');
    $('#registration-form').addClass('hide');
  });
};

const initializer = () => {
  bindEvents();
  pressEnter();
  saveMovieToWishListEvent();
  deleteMovieFromFirebase();
  updateMovieEvent();
  filterEvents();
  authEvents();
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
