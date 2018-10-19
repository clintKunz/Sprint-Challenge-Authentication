import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: ''
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
          <label htmlFor="password">Confirm Password</label>
          <input name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} type="password" />
        </div>
        <div>
          <button type="submit">Register</button>
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
    if(this.state.password !== this.state.confirmPassword) {
        return window.alert('passwords do not match');
    }  
    const endpoint = 'http://localhost:3300/api/register';

    const username = this.state.username;
    const password = this.state.password; 
    const user = { username, password };


      axios.post(endpoint, user).then(res => {
          console.log(res.data);
          window.alert('Success');
          this.props.history.push('/login');
      }).catch(err => {
          console.error('Error', err);
          window.alert('Error: username already taken');
      })
  }
}

export default Register;