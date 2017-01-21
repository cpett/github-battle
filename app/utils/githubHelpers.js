var axios = require('axios');

// place for API credentials if required. github doesn't require them
var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var param = "?client_id=" + id + "&client_secret=" + sec;

function getUserInfo (username) {
  // returns a promise
  return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos (username) {
  // fetch username's repos
  return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getTotalStars (repos) {
  // calculate all the stars that the user has
  return repos.data.reduce(function (prev, current) {
    return prev + current.stargazers_count
  }, 0)
}

function getPlayersData (player) {
  // get repos
  // getTotalStars
  // return object with that data
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function (totalStars) {
      return {
        followers: player.followers,
        totalStars: totalStars
      }
    })
}

function calculateScores (players) {
  // return an array after algorithm to show winner
  // console.log(players[0].followers * 3 + players[0].totalStars);
  // console.log(players[1].followers * 3 + players[1].totalStars);
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
}

var helpers = {
  // loop over each player in array
  getPlayersInfo: function (players) {
    // fetch some data from github
    // need to npm install --save axios
    return axios.all(players.map(function (username) {
      // call getUserInfo --> evaluates to an array of promises
      return getUserInfo(username)
    }))
    .then(function (info) {
      return info.map(function (user) {
        // return only the data part of the object
        return user.data
      })
    })
    .catch(function (err) {console.warn('Error in getPlayersInfo', err)})
  },
  battle: function (players) {
    // these return promises, which allows axios to work
    var playerOneData = getPlayersData(players[0]);
    var playerTwoData = getPlayersData(players[1]);

    return axios.all([playerOneData, playerTwoData])
      .then(calculateScores)
      .catch(function (err) {console.warn('Error in getPlayersInfo: ', err)})
  }
};

module.exports = helpers;
