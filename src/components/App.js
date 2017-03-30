import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navigation from './layout/Navigation';

class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider>
        <div>
          <Navigation/>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
};

export default App;
