import React from 'react';
import FBLogin from '../../assets/FBLogin.png';
import facebookbox from '../../assets/facebook-box.png';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, Redirect } from 'react-router-dom';
import AuthActions from '../../actions/AuthActions';
import AuthStore from '../../stores/AuthStore';
import AuthConstants from '../../actions/AuthActions';
import AppStore from '../../stores/AppStore';
import styles from './styles/LoginStyles';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: null,
        token: null,
        name: null,
        picUrl: null
      }
    }
  }

  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);

    let _fb;
    if (AppStore.getPlatform() == "system") {
      _fb = FB;
    } else {
      console.log('setting connect plugin');
      _fb = facebookConnectPlugin;
    }

    this.setState({ fb: _fb });
  };

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  };

  _onChange = () => {
    const _user = AuthStore.getUser();
    this.setState({ user: _user });
  }

  _getUser() {
    console.log('getUser');
    const _loginCB = (res) => { 
      console.log('loginSuccess');
      const _token = res.authResponse.accessToken;
      const _id = res.authResponse.userID;
      this.state.fb.api('/me', ['public_profile'], (res) => {
        console.log('get /me success');
        const _name = res.name;
        this.state.fb.api('/me?fields=picture', ['public_profile'], (res) => {
          console.log('get /me/picture success');
          console.log(res);
          const _picUrl = res.picture.data.url;
          console.log(_id, _token, _name);

          AuthActions.setUser({
            id: _id,
            token: _token,
            name: _name,
            picUrl: _picUrl 
          });
        });
      });
    };

    if (AppStore.getPlatform() == "system") {
      this.state.fb.login(_loginCB);
    } else {
      this.state.fb.login(["public_profile"], _loginCB);
    }
  }


  fbLogin = () => {
    const _this = this;
    this.state.fb.getLoginStatus((response) => {
      console.log('response = ' + response.status);
      if (response.status === 'connected') {
        let uid = response.authResponse.userID;
        let accessToken = response.authResponse.accessToken;
      } else if (response.status === 'not_authorized') {
        // the user is logged in to Facebook, 
        // but has not authenticated your app
      } else {
        _this._getUser();
      }
    });
  }

  fbLogout = () => {
    this.state.fb.getLoginStatus((response) => {
      if (response.status === 'connected') {
        this.state.fb.logout((res) => {
          console.log('Logout res: ', res);
        });
      }
    });
  }

  render() { 
    if (this.state.user.token != null) {
      return (
        <Redirect to="/main"/>
      );
    } else {
      return (
        <div style={ styles.container }>
          <RaisedButton 
            labelColor={ "#ffffff" }
            backgroundColor={ "#3B5998" }
            label={ "Login with Facebook" }
            icon={ <img src={ facebookbox }/> }
            onTouchTap={ this.fbLogin }
          />
          <RaisedButton 
            labelColor={ "#ffffff" }
            backgroundColor={ "#3B5998" }
            label={ "Logout" }
            icon={ <img src={ facebookbox }/> }
            onTouchTap={ this.fbLogout }
          />
          <p>{ this.state.user.name }</p>
        </div>
      )
    }
  }
}

export default Login;
