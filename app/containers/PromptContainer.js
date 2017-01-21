var React = require('react');
// Keep the components responsible for render the UI in components
// and the ones responsible for rendering the business logic in containers
var Prompt = require('../components/Prompt');
var transparentBg = require('../styles').transparentBg

var PromptContainer = React.createClass({
  contextTypes: {
    // use only with reactRouter because it doesn't scale. But it helps pass the
    // route along --> dynamic routing so you don't have to pass it as a prop
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      username: ''
    }
  },
  // pass event (e) from the input
  handleUpdateUser: function (e) {
    this.setState({
      username: e.target.value
    })
  },
  handleSubmitUser: function (e) {
    e.preventDefault();
    //cache the username and clear it so not seen when backbutton is hit
    var username = this.state.username;
    this.setState({
      username: ''
    });
    if (this.props.routeParams.playerOne) {
      // got to /battle
      this.context.router.push({
        pathname: '/battle',
        // pass along query to battle for API
        query: {
          playerOne: this.props.routeParams.playerOne,
          playerTwo: this.state.username
        }
      })
    } else {
      // go to /playerTwo
      // pass the playerOne along as a routeParam bc it's saved in the state
      this.context.router.push('/playerTwo/' + this.state.username)
    }
  },
  render: function () {
      return (
        // the container with the UI specs
        <Prompt
          onSubmitUser={this.handleSubmitUser}
          onUpdateUser={this.handleUpdateUser}
          header={this.props.route.header}
          username={this.state.username} />
      )
  }
});

module.exports = PromptContainer;
