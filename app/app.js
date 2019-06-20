import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Todo from './modules/todo/todo';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Todo}/>
        </Switch>
      </Router>
    )
  }
}

export default connect(null, null)(App);