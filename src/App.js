import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { compose } from 'recompose';

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
      isLoading: false,
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
        },
        isLoading: false
    });

    console.log(`Showing results til page ${this.state.results[searchKey].page}, total results: ${this.state.results[searchKey].hits.length}`);
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true });

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

  componentWillUnmount() {
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

    const {
      appCreator,
      searchTerm,
      results,
      searchKey,
      error,
      isLoading
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
            <ButtonWithConditionalRenderings
              isLoading={isLoading}
              onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
              error={error}
            >
              More
            </ButtonWithConditionalRenderings>
          </Search>
        </div>
        {responseMessage}
        <TableWithError
          list={list}
          onDismiss={this.onDismiss}
          error={error}
        >
        </TableWithError>
      </div>
    );
  }
}

const Button = ({
  onClick,
  className,
  children
}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

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

const Loading = () =>
  <div className="loading">
    Loading
    <FontAwesomeIcon icon={faSpinner} style={{marginLeft: '20px'}}/>
  </div>

const ErrorMessage = () =>
  <div className="interactions table-empty">
    <h2>Something went wrong!</h2>
  </div>

const EmptyMessage = () =>
  <div></div>

const withLoading = (Component) => ({ isLoading, ...rest }) => {
  console.log('THIS FUNCTION IS RUNNNING');
  return (
    isLoading
      ? <Loading />
      : <Component { ...rest } />
  );
}

const withError = (EitherComponent) => (Component) => ({ error, ...rest }) => {
  return (
    error
      ? <EitherComponent />
      : <Component { ...rest } />
  );
}

const withConditionalRenderings = compose (
  withError(EmptyMessage),
  withLoading
);

const ButtonWithConditionalRenderings = withConditionalRenderings(Button);

const TableWithError = (withError(ErrorMessage))(Table);

//  The class component version
//  We want to use the class component instead of the functional stateless one because
//  We want to trigger the focus method using the mounting lifecycle methods
class Search extends Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const {
      value,
      onChange,
      onSubmit,
      buttonName,
      children
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <input
           type="text"
           value={value}
           onChange={onChange}
           ref={el => this.input = el}
        />
        <button type="submit">
          {buttonName}
        </button>
        {children}
      </form>
    )
  }
}

/* The functional stateless component version
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
*/

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  buttonName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

Search.defaultProps = {
  value: DEFAULT_QUERY,
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  onDismiss: PropTypes.func,
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  className: '',
};

export default App;

export {
  Button,
  Search,
  Table,
};
