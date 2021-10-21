import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from './pages/Home';

const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Redirect to='/'/>
        </Switch>
    );
};

export default App;