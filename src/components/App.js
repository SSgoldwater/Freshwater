import React from 'react';
import Navigation from './layout/Navigation';

export default React.createClass({
  render () {
    console.log(this.props.children)
    return (
      <div>
        <Navigation/>
        {this.props.children}
      </div>
    );
  }
});
