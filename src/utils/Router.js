import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from '../components/App';
import Main from '../components/main/Main';
import WaterDash from '../components/waterdash/WaterDash';
import ToDo from '../components/todo/ToDo';
import Rewards from '../components/rewards/Rewards';
import Login from '../components/layout/Login';

const FWRouter = (
  <MuiThemeProvider>
    <Router>
      <div>
        <Route path="/" component={ App }/>
        <Route path="/main" component={ Main }/>
        <Route path="/todo" component={ ToDo }/>
        <Route path="/waterdash" component={ WaterDash }/>
        <Route path="/rewards" component={ Rewards }/>
        <Route path="/login" component={ Login }/>
      </div>
    </Router>
  </MuiThemeProvider>
);

export default FWRouter;
