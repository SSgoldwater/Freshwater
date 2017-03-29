console.log('Hello Freshwater');
import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return (
      <p>Hello Freshwater!</p>
    );
  }
}

render(<App/>, document.getElementById('app'));
