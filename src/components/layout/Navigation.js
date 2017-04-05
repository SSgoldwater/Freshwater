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
import styles from './styles/NavigationStyles';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      navOpen: false,
      user: {
        id: null,
        token: null,
        name: null,
        picUrl: null
      }
    }
  }

  componentWillMount() {
    AuthStore.addChangeListener(this._onChange);
  };

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  };

  _onChange = () => {
    const _user = AuthStore.getUser();
    this.setState({ user: _user });
  }

  _toggleDrawer = () => {
    this.setState({ navOpen: !this.state.navOpen });
  }

  _closeDrawer = () => {
    this.setState({ navOpen: false });
  }

  _openUserMenu = (event) => {
    this.setState({ 
      userMenuOpen: !this.state.userMenuOpen,
      userMenuAnchor: event.currentTarget
    });
  }

  _closeUserMenu = () => {
    this.setState({ userMenuOpen: false });
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
            />
            <MenuItem primaryText="Help &amp; feedback" />
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
