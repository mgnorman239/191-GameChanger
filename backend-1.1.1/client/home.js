var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  })

//Some place holder texts
//This instance will cover the winning title
var winnerTitle = new Vue({
  el: "#winner-title",
  data: {
    message: 'WINNER'
  }
})

//This instance will cover the winning project descriptions.
var winnerDescription = new Vue({
  el: "#winner-description",
  data: {
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  }
})