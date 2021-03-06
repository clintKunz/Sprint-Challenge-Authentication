import React, { Component } from 'react';
import axios from 'axios';

class Jokes extends Component {
  state = {
    jokes: [],
    intro: 'Logging in...'
  }
  
  render() {
    return (
      <div>
        {this.state.jokes.length === 0 ? (
            <h2>{this.state.intro}</h2>
        ) : (
        <div>
            <h2>You asked for it,</h2>
            <ul>
                {this.state.jokes.map(joke => 
                <li key={joke.id}>{joke.setup}...{joke.punchline}</li>
                )}
            </ul>
        </div>
        )}
      </div>
    );
  }

  componentDidMount() {
      const token = localStorage.getItem('jwt');
      if (!token) {
          this.setState({
            intro: 'Access denied, you may need to log in'
          })
      }
      const endpoint = 'http://localhost:3300/api/jokes';
      const options = {
        headers: {
          Authorization: token
        }
      }

      axios.get(endpoint, options).then(res => {
          console.log(res.data);
          this.setState({ jokes: res.data })
      }).catch(err => {
          console.error('Error', err);
      })
  }
}

export default Jokes;