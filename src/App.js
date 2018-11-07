import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_TAG = 'tags=story';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const creator = {
  firstName: 'Alex',
  lastName: 'Vuong'
}

class App extends Component {
  /**
   * Pass in the props (input params)
   * Initiate the state of the App component
   */
  constructor(props) {
    super(props);

    this.state = {
      appCreator: creator,
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
    };

    //  Bind methods here
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    //  If the result map is not null and there exists the older data of the searchKey
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    //  Add new hits if we are searching for more results of the same term
    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    //  Update the value of the key in the results map
    this.setState({
        results: {
          ...results,
          [searchKey]: { hits: updatedHits, page }
        }
    });
    console.log(`Showing results til page ${results[searchKey].page}, total results: ${results[searchKey].hits.length}`);

  }

  fetchSearchTopStories(searchTerm, page = 0) {
    console.log('Perfom searching and fetching form API, page to be log: ' + page);
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_TAG}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
    //console.log('Fetched list is ' + (this.state.result && this.state.result.hits));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  }

  onDismiss(id) {
    const { results, searchKey } = this.state;

    console.log('Dismissing item with objectID: ' + id);
    const isNotId = item => item.objectID !== id;
    const updatedList = results[searchKey].hits.filter(isNotId);

    this.setState({
      //  Create new object (maintain immutability) with Object.assign()
      //  newlist --override--> result
      //  result updated with newlist --override--> empty object {}
      //  result: Object.assign({}, this.state.result, { hits: updatedList })
      results: {
         ...results,
         [searchKey]: { hits: updatedList }
      }
    });
  }

  onSearchChange(event) {
    console.log('Changing search value');
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
    console.log('Render app');

    const {
      appCreator,
      searchTerm,
      results,
      searchKey
    } = this.state;

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="page">
        <div className="author-intro">
          <h1>Welcome to Viet Chip Journal XD</h1>
          <h2>My name is:</h2>
          <p>{appCreator.firstName} {appCreator.lastName}</p>
        </div>
        {/* Search bar */}
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Press here to search
          </Search>
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
          </Button>
        </div>
        {/* If results is null then list will be an empty array, thus table displays nothing */}
          <Table
            list={list}
            onDismiss={this.onDismiss}
          />
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
const Search = ({ value, onChange, onSubmit, children }) =>
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        {children}
      </button>
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

const Table = ({list, onDismiss}) => {
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
        {list.map(item =>
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
