import React from 'react';
import AppBar from 'material-ui/AppBar';
import styles from './styles/NavigationStyles';

class Navigation extends React.Component {
  render() {
    return (
      <AppBar
        title="Freshwater"
        titleStyle={ styles.appBarTitle }
      />
    )
  }
}

export default Navigation;
