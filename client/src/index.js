import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './css/main.css';
import * as serviceWorker from './services/serviceWorker';
import AuthProvider from './context/AuthContext';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';

import HomeScreen from './components/HomeScreen';
import ScheduleScreen from './components/ScheduleScreen';
import MembershipsScreen from './components/MembershipsScreen';
import AdminLoginScreen from './components/AdminLoginScreen';
import AdminHomeScreen from './components/AdminHomeScreen';
import AdminScheduleScreen from './components/AdminScheduleScreen';
import AdminForgotPasswordScreen from './components/AdminForgotPasswordScreen';
import AdminChangePasswordScreen from './components/AdminChangePasswordScreen';


//const client = new ApolloClient({ uri: "http://localhost:" + (process.env.PORT || "5000") + "/graphql" });

const client = new ApolloClient({ uri: "http://santerfitness.com/graphql"});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <AuthProvider>
        <Router>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/schedule' component={ScheduleScreen} />
          <Route path='/memberships' component={MembershipsScreen} />
          <PrivateRoute exact path='/admin' component={AdminHomeScreen} />
          <PrivateRoute path='/admin/schedule' component={AdminScheduleScreen} />
          <UnPrivateRoute path='/admin/login' component={AdminLoginScreen} />
          <UnPrivateRoute path='/admin/forgot' component={AdminForgotPasswordScreen} />
          <UnPrivateRoute path='/admin/reset/:token' component={AdminChangePasswordScreen} />
        </Router>
      </AuthProvider>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
