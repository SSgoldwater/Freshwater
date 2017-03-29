import React from 'react';

export default React.createClass({
  render () {
    console.log(this.props.children)
    return (
      <div>
        <p>App</p>
        {this.props.children}
      </div>
    );
  }
});
