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

const todoList = [
  {
    title: "Learn React",
    estimateTime: "1 month"
  },
  {
    title: "Go on a trip to Great Ocean Road",
    estimateTime: "2 days"
  },
  {
    title: "Travel to other state, e.g. Tasmania, Canberra & Queensland",
    estimateTime: "5 - 6 days"
  }
]

function TodoList(props) {
  const listArray = props.list;
  const listItems = listArray.map(item =>
    <li>{item.title + ": " + item.estimateTime}</li>
  );
  return (
    <ul className='todo-list'>
      {listItems}
    </ul>
  );
}

const ReversedTodoList = (props) =>
  <ul className='reversed-todo-list'>
    {
      props.list.slice(0).reverse().map(item =>
        <li>{item.estimateTime + ": " + item.title}</li>
      )
    }
  </ul>

class App extends Component {
  render() {
    let helloWorld = <h1>Welcome to Viet Chip Journal XD</h1>;
    let creator = {
      firstName: 'Alex',
      lastName: 'Vuong'
    }
    return (
      <div className="App">
        <div className="author-intro">
          {helloWorld}
          <h2>My name is:</h2>
          <p>{creator.firstName} {creator.lastName}</p>
        </div>
        <div className="book-list">
          <h3>These books are in my book I am reading:</h3>
          {/* Apply arrow function with one param, needs no parenthesises */}
          {list.map(item =>
              <div key={item.objectID}>
                <span>
                  <a href={item.url}>{item.title}</a>
                </span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
              </div>
          )}
        </div>
        <h3 style={{color:'green'}}>These are my hobbies:</h3>
        <table className="hobbies-table">
          <tbody>
            <tr>
              <th>Hobby</th>
              <th>Rate</th>
            </tr>
            {/* Two params, wrapped inside parenthesises */}
            {hobbies.map((item, index) =>
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.rate}</td>
              </tr>
            )}
          </tbody>
        </table>
        <h3 style={{color:'orange'}}>To-do list:</h3>
        <TodoList list={todoList} />
        <h3 style={{color:'red', fontStyle:'italic', fontWeight:'900'}}>Reversed To-do list:</h3>
        <ReversedTodoList list={todoList} />
      </div>
    );
  }
}

export default App;
