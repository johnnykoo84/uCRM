import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import * as smartComponents from './components/smartComponents';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk),
));

const history = syncHistoryWithStore(browserHistory, store);

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={smartComponents.Header}>
        <IndexRoute component={smartComponents.Home} />
        <Route path="signup" component={smartComponents.SignUp} />
        <Route path="login" component={smartComponents.Login} />
        <Route path="admin" component={smartComponents.Admin}>
          <Route path="manage" component={smartComponents.Manage}>
            <Route path="dashboard" component={smartComponents.Dashboard} />
          </Route>
        </Route>
        <Route path="staff" component={smartComponents.Staff} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// <Route path="/" component={헤더}>
//   <IndexRoute component={소개} />
//   <Route path="signUp" component={SignUp} />
//   <Route path="logIn" component={LogIn} />
//   <Route path="admin" component={Admin}>
//     fs
//     ds
//     dsf
//     sdf
//   </Route>oute>
//   <Route path="staff" component={Staff}>
//     sdf
//     sdf
//     sdf
//     sdf
//   </Route>
// </Route>
