const {getAllMoviesEvent, showMyMovies,} = require('./events');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      $('.active').removeClass('active');
      $('#myMoviesBtn').addClass('active');
      showMyMovies();
      $('#myMoviesBtn, #searchBtn, #logout').removeClass('hide');
      $('#authBtn').addClass('hide');
      // call get Movies events
      getAllMoviesEvent();
    } else {
      // No user is signed in.
      $('.active').removeClass('active');
      $('#myMovies, #search').addClass('hide');
      $('#authBtn').addClass('active');
      $('#authScreen, #authBtn').removeClass('hide');
      $('#myMoviesBtn, #searchBtn, #logout').addClass('hide');
    }
  });
};

module.exports = {
  checkLoginStatus,
};
