import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './css/main.css';
import * as serviceWorker from './services/serviceWorker';
import dotenv from 'dotenv';

import HomeScreen from './components/HomeScreen';
import ScheduleScreen from './components/ScheduleScreen';
import MembershipsScreen from './components/MembershipsScreen';
import ContactScreen from './components/ContactScreen';
import AdminLoginScreen from './components/AdminLoginScreen';
import AdminHomeScreen from './components/AdminHomeScreen';

dotenv.config();

const client = new ApolloClient({ uri: process.env.PROXY + "/graphql"});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/' component={HomeScreen} />
        <Route path='/schedule' component={ScheduleScreen} />
        <Route path='/memberships' component={MembershipsScreen} />
        <Route path='/contact' component={ContactScreen} />
        <Route path='/admin/login' component={AdminLoginScreen} />
        <Route path='/admin' component={AdminHomeScreen} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
