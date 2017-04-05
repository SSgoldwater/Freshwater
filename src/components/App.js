import React from 'react';
import Navigation from './layout/Navigation';
import AppStore from '../stores/AppStore.js';
import AppActions from '../actions/AppActions';

class App extends React.Component {

  componentWillMount = () => {
    if (window.cordova) {
      if (window.cordova.platformId == "browser") {
        AppActions.setPlatform('browser');
      } else if (window.cordova.platformId =="android") {
        window.FB = facebookConnectPlugin; 
        AppActions.setPlatform('android');
      }
    } else {
      AppActions.setPlatform('system');
    }
  }

  render () {
    return (
      <div>
        <Navigation/>
        {this.props.children}
      </div>
    );
  }
};

export default App;
