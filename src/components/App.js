import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Index from '../pages/Index';  // 首页
import About from '../pages/About';  // 首页

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Index}/>
        <Route path="/about" exact component={About}/>
      </Switch>
    );
  }
}

export default hot(module)(App);
