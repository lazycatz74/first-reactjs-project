import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const creator = {
  firstName: 'Alex',
  lastName: 'Vuong'
}

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
      id: '1',
      title: 'Swimming',
      rate: 9
  },
  {
      id: '2',
      title: 'Playing games',
      rate: 4
  },
  {
      id: '3',
      title: 'Watching movies',
      rate: 7.5
  },
  {
      id: '4',
      title: 'Laiding (just kidding)',
      rate: 10
  }
]

const todoList = [
  {
    id: '1',
    title: 'Learn React',
    estimateTime: '1 month'
  },
  {
    id: '2',
    title: 'Go on a trip to Great Ocean Road',
    estimateTime: '2 days'
  },
  {
    id: '3',
    title: 'Travel to other state, e.g. Tasmania, Canberra & Queensland',
    estimateTime: '5 - 6 days'
  }
]

function TodoList(props, index) {
  const listArray = props.list;
  const listItems = listArray.map(item =>
    <li key={item.id}>{item.title + ': ' + item.estimateTime}</li>
  );
  return (
    <ul className="todo-list">
      {listItems}
    </ul>
  );
}

const ReversedTodoList = (props, index) =>
  <ul className="reversed-todo-list">
    {
      props.list.slice(0).reverse().map(item =>
        <li key={props.list - item.id}>{item.estimateTime + ': ' + item.title}</li>
      )
    }
  </ul>

class App extends Component {

  /*
  * Pass in the props (input params)
  * Initiate the state of the App component
  */
  constructor(props) {
    super(props);

    this.state = {
      appCreator: creator,
      /*list: list,
      hobbies: hobbies,
      todoList: todoList */
      // ---Using shorthand--->>
      list,
      hobbies,
      todoList,
      uselessButton: <button>This button do nothing at all</button>
    };

    // About binding:
    // https://medium.freecodecamp.org/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }
  //  Another way of binding: use arrow function
  /*
  onDismiss = (id) => {
    console.log(this);
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }
  //
  //  Also, state can be declared with ease:
  //  state = { stateProps: value };
  //
  //  Also known as: `class field declaration`
  //  https://github.com/the-road-to-learn-react/react-alternative-class-component-syntax
  */

  render() {
    let appState = this.state; // make changes on the component's properties, not the variables defined outside of the component
    let helloWorld = <h1>Welcome to Viet Chip Journal XD</h1>;

    return (
      <div className="App">
        <div className="author-intro">
          {helloWorld}
          <h2>My name is:</h2>
          <p>{appState.appCreator.firstName} {appState.appCreator.lastName}</p>
        </div>
        <div className="book-list">
          <h3>These books are in my book I am reading:</h3>
          {/* Apply arrow function with one param, needs no parenthesises */}
          {appState.list.map(item =>
              <div key={item.objectID}>
                <span>
                  <a href={item.url}>{item.title}</a>
                </span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
                <span>
                  <button
                    onClick={() => this.onDismiss(item.objectID)}
                    type="button"
                  >
                    Dismiss
                  </button>
                </span>
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
            {appState.hobbies.map(item =>
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.rate}</td>
              </tr>
            )}
          </tbody>
        </table>
        <h3 style={{color:'orange'}}>To-do list:</h3>
        <TodoList list={appState.todoList} />
        <h3 style={{color:'red', fontStyle:'italic', fontWeight:'900'}}>Reversed To-do list:</h3>
        <ReversedTodoList list={appState.todoList} />
        {appState.uselessButton}
      </div>
    );
  }
}

export default App;
