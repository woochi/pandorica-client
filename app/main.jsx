import 'babel-polyfill';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, NotFoundRoute, Link, browserHistory, IndexRedirect } from 'react-router';
import Socket from 'socket.io-client';
import store from './store';
import api from 'lib/api';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FastClick from 'fastclick';

import Site from 'containers/Site';
import Application from 'containers/Application'
import HomePage from 'containers/HomePage'
import TasksPage from 'containers/TasksPage';
import NotificationsPage from 'containers/NotificationsPage';
import NotFoundPage from 'containers/NotFoundPage'
import LoginPage from 'containers/LoginPage';
import SignupPage from 'containers/SignupPage';

import 'styles/common.scss';

//const socket = Socket('localhost:3000');

const rootElement = document.getElementById('content');

injectTapEventPlugin();
FastClick.attach(document.body);

function requireAuth(nextState, replace) {
  if (!api.isLoggedIn()) {
    replace({}, '/login');
  }
}

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Site}>
        <IndexRedirect to="login"/>
        <Route path="login" component={LoginPage}/>
        <Route path="signup" component={SignupPage}/>
        <Route path="app" component={Application} onEnter={requireAuth}>
          <IndexRedirect to="home"/>
          <Route name="home" path="home" component={HomePage} />
          <Route name="notifications" path="notifications" component={NotificationsPage}/>
          <Route name="tasks" path="tasks" component={TasksPage}/>
        </Route>
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>
), rootElement);
