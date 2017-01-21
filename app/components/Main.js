var React = require('react');
// Transition group --npm installed
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
// import css files with style-loader!css-loader in the webpack.config
// also npm installed
require('../main.css');

//React.cloneElement() will allow us to give the children a key which is
// required with the ReactCssTransitionGroup element
var Main = React.createClass({
  render: function () {
    return (
      <div className='main-container'>
        <ReactCSSTransitionGroup
          transitionName="appear"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
            {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
});

module.exports = Main;
