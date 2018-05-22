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

module.exports = bindEvents;
