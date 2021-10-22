import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from './pages/Home';
import Open from './pages/Open';
import Playlist from './pages/Playlist';
import Suggestion from './pages/Suggestion';

const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/playlist' component={Playlist}/>
            <Route exact path='/playlist/open' component={Open}/>
            <Route exact path='/suggestion' component={Suggestion}/>
            <Redirect to='/'/>
        </Switch>
    );
};

export default App;