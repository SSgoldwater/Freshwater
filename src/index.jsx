console.log('Hello Freshwater');
import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {

  times10(number) {
    return number * 10
  }

  render () {
    var number = 100;

    return (
      <div>
        <p> Hello React!</p>
        <h2> OK OK { this.times10(number) }</h2>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
