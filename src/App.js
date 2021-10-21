import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from './pages/Home';
import Suggestion from './pages/Suggestion';

const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/suggestion' component={Suggestion}/>
            <Redirect to='/'/>
        </Switch>
    );
};

export default App;