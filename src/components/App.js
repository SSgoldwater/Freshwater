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
        AppActions.setFB(facebookConnectPlugin);
        AppActions.setPlatform('android');
      }
    } else {
      AppActions.setPlatform('system');
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '239746973163692',
          cookie     : true,
          xfbml      : true,
          version    : 'v2.8'
        });

        FB.AppEvents.logPageView();   
        AppActions.setFB(FB);
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
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
