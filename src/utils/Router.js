import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import App from '../components/App';
import WaterDash from '../components/WaterDash';
import Main from '../components/Main';

const FWRouter = (
  <Router>
    <div>
      <Route path="/" component={App}/>
      <Route path="/main" component={Main}/>
      <Route path="/waterdash" component={WaterDash}/>
    </div>
  </Router>
);

export default FWRouter;
