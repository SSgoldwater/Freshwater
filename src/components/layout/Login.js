import React from 'react';
import FBLogin from '../../assets/FBLogin.png';
import facebookbox from '../../assets/facebook-box.png';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
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
    this._setFB();
  };

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  };

  _onChange = () => {
    const _user = AuthStore.getUser();
    this.setState({ user: _user });
  }

  _setFB = () => {
    if (AppStore.getFB() == null) {
      setTimeout(() => { this._setFB() }, 50);
    } else {
      this.setState({ fb: AppStore.getFB() });
    }
  }

  _loginCB = (res) => { 
    const _token = res.authResponse.accessToken;
    const _id = res.authResponse.userID;
    this.state.fb.api('/me', ['public_profile'], (res) => {
      const _name = res.name;
      this.state.fb.api('/me?fields=picture', ['public_profile'], (res) => {
        const _picUrl = res.picture.data.url;

        AuthActions.setUser({
          id: _id,
          token: _token,
          name: _name,
          picUrl: _picUrl 
        });
      });
    });
  };

  _getUser() {
    if (AppStore.getPlatform() == "system") {
      this.state.fb.login(this._loginCB);
    } else {
      this.state.fb.login(["public_profile"], this._loginCB);
    }
  }

  fbLogin = () => {
    const _this = this;
    this.state.fb.getLoginStatus((response) => {
      if (response.status === 'connected') {
        let uid = response.authResponse.userID;
        let accessToken = response.authResponse.accessToken;
        _this._loginCB(response);
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
          <Paper
            zDepth={ 3 }
            style={ styles.loginPanel }
          >
            <RaisedButton 
              style={ styles.facebookButton }
              labelColor={ "#ffffff" }
              backgroundColor={ "#3B5998" }
              label={ "Login with Facebook" }
              icon={ <img src={ facebookbox }/> }
              onTouchTap={ this.fbLogin }
            />
          </Paper>
        </div>
      )
    }
  }
}

export default Login;
