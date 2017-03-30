import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import { NavLink } from 'react-router-dom';
import styles from './styles/NavigationStyles';


class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false }
  }

  toggleDrawer = () => this.setState({ open: !this.state.open });

  closeDrawer = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <AppBar
          style={ styles.appBar }
          title="Freshwater"
          titleStyle={ styles.appBarTitle }
          onLeftIconButtonTouchTap={ this.toggleDrawer }
        />
        <Drawer
          open={ this.state.open }
          docked={ false }
          onRequestChange={ this.closeDrawer }
        >
          <Menu onItemTouchTap={ this.closeDrawer }>
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
