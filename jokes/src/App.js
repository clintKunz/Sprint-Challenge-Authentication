import React, { Component } from 'react';
import './App.css';
import { NavLink, Route } from 'react-router-dom';
import Login from './components/Login.js';
import Jokes from './components/Jokes.js';
import Register from './components/Register.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink exact to='/'>Register</NavLink>
            &nbsp; | &nbsp; 
            <NavLink to='/login'>Login</NavLink>
            &nbsp; | &nbsp; 
            <NavLink to='/jokes'>Jokes</NavLink>
            &nbsp; | &nbsp;
            <NavLink to='/' onClick={this.signout}>Logout</NavLink>
          </nav>
          <main>
            <Route exact path='/' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/jokes' component={Jokes} />
          </main>
        </header>
      </div>
    );
  }

  signout = () => {
    localStorage.removeItem('jwt');
  };
}



export default App;
