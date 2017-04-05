import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthStore from '../../stores/AuthStore';
import AuthActions from '../../actions/AuthActions';
import AppStore from '../../stores/AppStore';
import styles from './styles/NavigationStyles';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      navOpen: false,
      user: AuthStore.getUser(),
      fb: null
    }
  }

  componentWillMount() {
    AuthStore.addChangeListener(this._onChange);
    this._setFB();
  };

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.fb != this.state.fb) {
      this._checkUserStatus();
    }
  }

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

  _checkUserStatus = () => {
    const _this = this;
    this.state.fb.getLoginStatus((res) => {
      if (res.status == 'connected') {
        const _token = res.authResponse.accessToken;
        const _id = res.authResponse.userID;

        _this.state.fb.api('/me', ['public_profile'], (res) => {
          const _name = res.name;

          _this.state.fb.api('/me?fields=picture', ['public_profile'], (res) => {
            const _picUrl = res.picture.data.url;

            AuthActions.setUser({
              id: _id,
              token: _token,
              name: _name,
              picUrl: _picUrl 
            });
          });
        });
      }
    });
  }

  _toggleDrawer = () => {
    this.setState({ navOpen: !this.state.navOpen });
  }

  _closeDrawer = () => {
    this.setState({ navOpen: false });
  }

  _openUserMenu = (event) => {
    event.preventDefault();

    this.setState({ 
      userMenuOpen: !this.state.userMenuOpen,
      userMenuAnchor: event.currentTarget
    });
  }

  _closeUserMenu = () => {
    this.setState({ userMenuOpen: false });
  }

  _logout = () => {
    this.setState({ userMenuOpen: false });
    this.state.fb.logout((res) => {
      AuthStore.setUser({
        id: null,
        token: null,
        name: null,
        picUrl: null
      });
    });
  }

  render() {
    const _loginButton = (
      <FlatButton
        label={ "Login" }
        containerElement={ <Link to={ "/login" }>Login</Link> }
      />
    )

    const _userPicButton = (
      <Avatar 
        src={ this.state.user.picUrl }
        style={ styles.avatar }
        size={ 45 }
        onTouchTap={ this._openUserMenu }
      />
    )

    return (
      <div>
        <AppBar
          style={ styles.appBar }
          title="Freshwater"
          titleStyle={ styles.appBarTitle }
          onLeftIconButtonTouchTap={ this._toggleDrawer }
          iconElementRight={
            this.state.user.picUrl ?
            _userPicButton : _loginButton
          }
        />
        <Popover
          open={ this.state.userMenuOpen }
          anchorEl={ this.state.userMenuAnchor }
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={ this._closeUserMenu }
        >
          <Menu>
            <MenuItem 
              primaryText="Logout"
              onTouchTap={ this._logout }
            />
            <MenuItem
              primaryText="Settings"
            />
          </Menu>
        </Popover>
        <Drawer
          open={ this.state.navOpen }
          docked={ false }
          onRequestChange={ this._closeDrawer }
        >
          <Menu onItemTouchTap={ this._closeDrawer }>
            <MenuItem containerElement={ <NavLink to="/main"/> }>
             Home
            </MenuItem>
            <MenuItem containerElement={ <NavLink to="/todo"/> }>
              Things To Do
            </MenuItem>
            <MenuItem containerElement={ <NavLink to="/waterdash"/> }>
             Water Quality Dashboard
            </MenuItem>
            <MenuItem containerElement={ <NavLink to="/rewards"/> }>
              Earn Rewards
            </MenuItem>
          </Menu>
        </Drawer>
      </div>
    )
  }
}

export default Navigation;
