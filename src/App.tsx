import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';

import PrivateRoute from './components/Routers/PrivateRoute';
import PublicRoute from './components/Routers/PublicRoute';

import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                <PublicRoute exact={true} path='/' component={Login} />
                <PublicRoute path='/registration' component={Registration} />
                <PrivateRoute path='/dashboard' component={Dashboard} />
            </Switch>
        </Router>
    );
}

export default App;
