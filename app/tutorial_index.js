var USER_DATA = {
  name: 'Tyler McGinnis',
  username: 'tylermcginnis',
  image: 'https://avatars0.githubusercontent.com/u/2933430?v=3$s=460'
}

var React = require('react');
var ReactDOM = require('react-dom');


/* Test your components against FIRST
  Focused
  Independent
  Reusable
  Small
  Testable
*/

var ProfilePic = React.createClass({
  render: function () {
    return <img src={this.props.imageUrl} style={{height: 100, width: 100}}></img>
  }
});

var Link = React.createClass({
  // Method for the onClick function
  changeURL: function() {
    window.location.replace(this.props.href)
  },
  render: function() {
    return (
      <span style={{color: 'blue', cursor: 'pointer'}}
      onClick={this.changeURL}>
        {this.props.children}
      </span>
    )
  }
})

var ProfileLink = React.createClass({
  render: function () {
    return (
      <div>
        <Link href={'https://www.github.com/' +  this.props.username}>
          {this.props.username}
        </Link>
      </div>
    );
  }
});

var ProfileName = React.createClass({
  render: function (){
    return <div>{this.props.name}</div>
  }
});

// Container Component for all the above
var Avatar = React.createClass({
  render: function () {
    return(
      // MAke sure these are wrapped in an element(span, etc.)
      <div>
        <ProfilePic imageUrl={this.props.user.image}/>
        <ProfileName name={this.props.user.name}/>
        <ProfileLink username={this.props.user.username}/>
      </div>
    );
  }
});

ReactDOM.render(<Avatar user={USER_DATA} />, document.getElementById('app'));

// // First Component
// var HelloWorld = React.createClass({
//   // Render is required -- specifies what the UI does
//   render: function () {
//     // Returns the variavles that are passed in to the invoked Component
//     console.log(this.props)
//     return (
//       <div>Hello, {this.props.name}</div>
//     )
//   }
// });
//
// // Tells where everything is rendered to
// // Invokes Component
// // Grab element and render Component to it
// ReactDOM.render(<HelloWorld name="Tyler"/>, document.getElementById('app'));
