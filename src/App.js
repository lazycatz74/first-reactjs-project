import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
]

const hobbies = [
  {
      title: "Swimming",
      rate: 9
  },
  {
      title: "Playing games",
      rate: 4
  },
  {
      title: "Watching movies",
      rate: 7.5
  },
  {
      title: "Laiding",
      rate: 10
  }
]

class App extends Component {
  render() {
    let helloWorld = <h1>Welcome to Viet Chip Journal XD</h1>;
    let creator = {
      firstName: 'Alex',
      lastName: 'Vuong'
    }
    return (
      <div className="App">
        {helloWorld}
        <h2>My name is:</h2>
        <p>{creator.firstName} {creator.lastName}</p>
        <div className="bookList">
        <h3>These books are in my book I am reading:</h3>
          {list.map(function(item) {
            return (
              <div key={item.objectID}>
                <span>
                  <a href={item.url}>{item.title}</a>
                </span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
              </div>
            );
        })}
        </div>
        <h3 style={{color:'green'}}>These are my hobbies:</h3>
        <table className="hobbiesTable">
          <tr>
            <th>Hobby</th>
            <th>Rate</th>
          </tr>
          {hobbies.map(function(item, index) {
            return (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.rate}</td>
              </tr>
            )
          })}
        </table>
      </div>
    );
  }
}

export default App;
