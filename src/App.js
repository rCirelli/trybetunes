import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <main className="bg-slate-900 text-slate-100 w-screen h-screen">
        <BrowserRouter>
          <Switch>
            <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="/profile" component={ Profile } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/search" component={ Search } />
            <Route exact path="/" component={ Login } />
            <Route component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
