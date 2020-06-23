import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './css/main.css';
import * as serviceWorker from './services/serviceWorker';

import HomeScreen from './components/HomeScreen';
import ScheduleScreen from './components/ScheduleScreen';
import MembershipsScreen from './components/MembershipsScreen';
import AdminLoginScreen from './components/AdminLoginScreen';
import AdminHomeScreen from './components/AdminHomeScreen';

const client = new ApolloClient({ uri: "http://localhost:5000/graphql" });

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Router>
        <div>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/schedule' component={ScheduleScreen} />
          <Route path='/memberships' component={MembershipsScreen} />
          <Route path='/admin/login' component={AdminLoginScreen} />
          <Route path='/admin' component={AdminHomeScreen} />
        </div>
      </Router>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
