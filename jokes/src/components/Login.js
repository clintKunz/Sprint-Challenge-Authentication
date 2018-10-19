import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input name="username" value={this.state.username} onChange={this.handleInputChange} type="text" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" value={this.state.password} onChange={this.handleInputChange} type="password" />
        </div>
        <div>
          <button type="submit">Signin</button>
        </div>
      </form>
    );
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit = e =>  {
    e.preventDefault();  
    const endpoint = 'http://localhost:3300/api/login';

      axios.post(endpoint, this.state).then(res => {
          console.log(res.data);
          localStorage.setItem('jwt', res.data.token);
          window.alert('Access granted');
          this.props.history.push('/jokes');
      }).catch(err => {
          console.error('Error', err);
          window.alert('Error: Invalid username or password');
      })
  }
}

export default Login;