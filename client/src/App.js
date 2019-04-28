import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from './components/Dashboard/Dashboard.js';
import { Login } from './components/Login/Login.js';
import { Register } from './components/Register/Register.js';
import { PrivateRoute } from './components/PrivateRoute.js';
import './App.css';

class App extends Component {
        render() {
        return (
        <div className="App">
            <div className="App-content">
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path ="/register" component={Register}/>
                    <PrivateRoute path='/dashboard' component={Dashboard} />
                </Switch>
            </div>
        </div>
        );
    }
}

export default App;
