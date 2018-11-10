import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '20';

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
  _isMounted = false;

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
      error: null,
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
    console.log('Cache data into results');
    this.setState({
        results: {
          ...results,
          [searchKey]: { hits: updatedHits, page }
        }
    });

    console.log(`Showing results til page ${this.state.results[searchKey].page}, total results: ${this.state.results[searchKey].hits.length}`);
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    console.log('Perfom searching "' + searchTerm + '" and fetching from API, page to be log: ' + page);
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_TAG}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
    //console.log('Fetched list is ' + (this.state.result && this.state.result.hits));
  }

  componentDidMount() {
    console.log('Mounting app');
    this._isMounted = true;

    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
    console.log('Finish mounting app');
  }

  componentWillMount() {
    this._isMounted = false;
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
    const { hits, page } = results[searchKey]

    console.log('Dismissing item with objectID: ' + id);
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      //  Create new object (maintain immutability) with Object.assign()
      //  newlist --override--> result
      //  result updated with newlist --override--> empty object {}
      //  result: Object.assign({}, this.state.result, { hits: updatedList })
      //  **CAUTION**
      //  the value results takes should be a completely new object (due to Immutability)
      results: {
         ...results,
         [searchKey]: { hits: updatedHits, page }
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
    console.log(this.state);

    const {
      appCreator,
      searchTerm,
      results,
      searchKey,
      error
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

    const responseMessage = (
      results &&
      results[searchKey] &&
      <h2 style={{ color: 'red' }}>You searched for {searchKey}, I found {results[searchKey].hits.length} results,
        displayed in {results[searchKey].page + 1} pages
      </h2>
    ) || null;

    if (error) console.log('Error is ' + error);

    return (
      <div className="page">
        <div className="author-intro">
          <h1>Welcome to Viet Chip Journal XD</h1>
          <h2>My name is:</h2>
          <p>{appCreator.firstName} {appCreator.lastName}</p>
          <h2>Please search here for latest news:</h2>
        </div>
        {/* Search bar */}
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
            buttonName="Press here to search"
          >
            <Button
              onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
            >
              More
            </Button>
          </Search>
        </div>
        {responseMessage}
        { error
          ? <div className="interactions table-empty">
            <h2>Something went wrong!</h2>
          </div>
          /* If results is null then list will be an empty array, thus table displays nothing */
          : <Table
            list={list}
            onDismiss={this.onDismiss}
          />
        }
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
const Search = ({ value, onChange, onSubmit, buttonName, children }) =>
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        {buttonName}
      </button>
      {children}
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
      <div className="table">
        <div className="table-header">
          <span style={{ width: '40%' }}>Article</span>
          <span style={midColumn}>Author</span>
          <span style={smallColumn}>Number of comments</span>
          <span style={smallColumn}>Points</span>
          <span style={smallColumn}></span>
        </div>
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
