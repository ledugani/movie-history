const tmdb = require('./tmdb');

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
      tmdb.showResults('cow');
    }
  });
};

const initializer = () => {
  bindEvents();
  pressEnter();
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
//     } else if (e.target.id === 'myMoviesBtn') {
//       $('#myMovies').removeClass('hide');
//       $('#search').addClass('hide');
//       $('#authScreen').addClass('hide');
//     } else if (e.target.id === 'searchBtn') {
//       $('#myMovies').addClass('hide');
//       $('#search').removeClass('hide');
//       $('#authScreen').addClass('hide');
//     }
//   });
// };

// module.exports = myLinks;
