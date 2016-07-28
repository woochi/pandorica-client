import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, NotFoundRoute, Link, browserHistory, IndexRedirect, IndexPath, Redirect } from 'react-router';
import store from './store';
import api from 'lib/api';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FastClick from 'fastclick';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Site from 'containers/Site';
import Application from 'containers/Application';
import HomePage from 'containers/HomePage';
import TasksPage from 'containers/TasksPage';
import QuestsPage from 'containers/QuestsPage';
import NotFoundPage from 'containers/NotFoundPage';
import LoginPage from 'containers/LoginPage';
import SignupPage from 'containers/SignupPage';
import QuestPage from 'containers/QuestPage';
import TaskSuccessPage from 'containers/TaskSuccessPage';
import IntroPage from 'containers/IntroPage';
import FactionSelectPage from 'containers/FactionSelectPage';
import ProfilePage from 'containers/ProfilePage';
import ChatPage from 'containers/ChatPage';
import ChatListPage from 'containers/ChatListPage';

import 'styles/common.scss';

const rootElement = document.getElementById('content');

injectTapEventPlugin();
FastClick.attach(document.body);

function requireAuth(nextState, replace) {
  if (!api.isLoggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

function checkAuth(nextState, replace) {
  if (api.isLoggedIn()) {
    replace('/app');
  }
}

function test(nextState, replace) {
  const id = nextState.params.id;
  const state = store.getState();
  const mission = state.getIn(['entities', 'tasks', id]) || state.getIn(['entities', 'quests', id])
  if (!mission) {
    replace('/app/quests');
  }
}

function checkFactionSelected(nextState, replace) {
  if (!store.getState().getIn(['form', 'signup', 'faction', 'value'])) {
    replace('/signup/faction');
  }
}

function requireAdmin(nextState) {
  // TODO
}

const muiTheme = getMuiTheme({
  fontFamily: 'Avenir',
  palette: {
    primary1Color: '#67d18a',
    textColor: '#333'
  },
  button: {
    height: 40
  },
  raisedButton: {
    letterSpacing: '2px',
    fontWeight: 'normal'
  },
});

render((
  <MuiThemeProvider muiTheme={muiTheme}>
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/">
          <Route component={Site} onEnter={checkAuth}>
            <IndexRoute component={IntroPage}/>
            <Route path="login" component={LoginPage}/>
            <Route path="signup">
              <IndexRedirect to="faction"/>
              <Route path="faction" component={FactionSelectPage}/>
              <Route path="complete" component={SignupPage} onEnter={checkFactionSelected}/>
            </Route>
          </Route>
          <Route path="app" component={Application} onEnter={requireAuth}>
            <IndexRedirect to="home"/>
            <Route path="home" component={HomePage}/>
            <Route path="quests" component={QuestsPage}/>
            <Route path="quests/:id" component={QuestPage}/>
            <Route path="quests/:id/success" component={TaskSuccessPage} onEnter={test}/>
            <Route path="tasks" component={TasksPage}/>
            <Route path="tasks/:id/success" component={TaskSuccessPage} onEnter={test}/>
            <Route path="chats" component={ChatListPage}/>
            <Route path="chats/:room" component={ChatPage}/>
            <Route path="profile" component={ProfilePage}/>
          </Route>
          <Route path="*" component={NotFoundPage} />
        </Route>
    </Router>
  </Provider>
  </MuiThemeProvider>
), rootElement);
