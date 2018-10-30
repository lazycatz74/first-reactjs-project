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

const isSearched = searchTerm => item =>
    //  Add condition
    item.title.toLowerCase().includes(searchTerm.toLowerCase());
/**
 * ES5
 function isSearched(searchTerm) {
   return function(item) {
     //  Add condition
     return item.title.toLowerCase().includes(searchTerm.toLowerCase());
   }
 }
 */

class App extends Component {
  /**
   * Pass in the props (input params)
   * Initiate the state of the App component
   */
  constructor(props) {
    super(props);

    this.state = {
      appCreator: creator,

      // list: list,
      // hobbies: hobbies,
      // todoList: todoList
      // ---Using shorthand--->>
      list,
      hobbies,
      searchTerm: '',
      todoList,
      uselessButton: <button>This button do nothing at all</button>
    };

    // About binding:
    // https://medium.freecodecamp.org/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  /**
   *
   Another way of binding: use arrow function
   onDismiss = (id) => {
     console.log(this);
     const isNotId = item => item.objectID !== id;
     const updatedList = this.state.list.filter(isNotId);
     this.setState({ list: updatedList });
   }
  //  Also, state can be declared with ease:
  //  state = { stateProps: value };
  //
  //  Also known as: `class field declaration`
  //  https://github.com/the-road-to-learn-react/react-alternative-class-component-syntax
  */

  render() {
    let appState = this.state; // make changes on the component's properties, not the variables defined outside of the component
    let helloWorld = <h1>Welcome to Viet Chip Journal XD</h1>;
    const { searchTerm, list } = this.state;

    return (
      <div className="page">
        <div className="author-intro">
          {helloWorld}
          <h2>My name is:</h2>
          <p>{appState.appCreator.firstName} {appState.appCreator.lastName}</p>
        </div>
        {/* Search bar */}
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange} // Happen immediately after the value is changed
          >
            Search bar:
          </Search>
        </div>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
        <h3 style={{color:'green'}}>These are my hobbies:</h3>
        <table className="hobbies-table">
          <tbody>
            <tr>
              {/**
                * Destructure list's properties here to assign table heading automatically
                */}
              <th>Hobby</th>
              <th>Rate</th>
            </tr>
            {/**
              * filter(() => item.title.includes(searchTerm))
              * Problem: this = filter, filter.state = undefined
              * Solution: pass in searchTerm as a param
              */}
            {appState.hobbies.filter(isSearched(searchTerm)).map(item => // Add filter here to perfom search
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

/* The class component version
class Search extends Component {
  render() {
    const { value, onChange, children } = this.props;
    return (
      <form>
        <span>{children} </span>
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
      </form>
    )
  }
}*/

// The functional stateless component version
const Search = ({ value, onChange, children }) =>
    <form>
      <span>{children} </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>

/*class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    /*const onHandleDismiss = () => {
        console.log('High-order functions in Javascript example:');
        console.log('The 2nd approach to assigning a func/method to an event handle');

        return this.onDismiss(item.objectID);
      }

    return (
      <div>
        <h3>These books are in my book I am reading:</h3>
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <Button onClick={() => onDismiss(item.objectID)}>
                DISMISS
              </Button>
            </span>
          </div>
        )}
      </div>
    );
  }
}*/

const Table = ({list, pattern, onDismiss}) => {
  const largeColumn = {
    width: '40%',
  };

  const midColumn = {
    width: '30%',
  };

  const smallColumn = {
    width: '10%',
  };

  return (
    <div>
      <h3>These books are in my book I am reading:</h3>
      <div className="table">
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID} className="table-row">
            <span style={{ width: '40%' }}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={midColumn}>{item.author}</span>
            <span style={smallColumn}>{item.num_comments}</span>
            <span style={smallColumn}>{item.points}</span>
            <span style={smallColumn}>
              <Button
                onClick={() => onDismiss(item.objectID)}
                className="button-inline"
              >
                DISMISS
              </Button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/*class Button extends Component {
  render() {
    const {
      onClick,
      className = '',
      children,
    } = this.props;

    console.log(className);
    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    );
  }
}*/

const Button = ({ onClick, className = '', children }) => {
  console.log(className);
  return (
    <button
      onClick={onClick}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}


export default App;
