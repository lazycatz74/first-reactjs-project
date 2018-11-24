import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { Search, Button, Table, updateSearchTopStoriesState } from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <App />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

});

describe('Search', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Search buttonName="Search" onChange={() => true}>
        <div>Some children</div>
      </Search>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Search buttonName="Search">
        <div>Some children</div>
      </Search>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

});

describe('Button', () => {

  let callCount = 0;

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button onClick={() => callCount++}>Give me more</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Button onClick={() => callCount++}>Give me more</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('simultates click events', () => {
    const element = mount(
      <Button onClick={() => callCount++}>Click here</Button>
    );
    element.find('button').simulate('click');
    expect(callCount).toBe(1);
  });

});

describe('Table', () => {

  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 3, objectID: 'z' },
    ],
    sortKey: 'NONE',
    isSortReverese: false,
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table { ...props } />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Table { ...props } />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('shows two items in list', () => {
    const element = shallow(
      <Table { ...props } />
    );

    expect(element.find('.table-row').length).toBe(2);
  });

});

describe('Update search results state Fn', () => {

  it('return a new state', () => {
    const element = shallow(
      <App />
    );

    const newHits = [
      {title: 'book1', author: 'chip', objectID: '1'},
      {title: 'book2', author: 'alex', objectID: '2'},
    ];
    const page = 2;
    element.setState(updateSearchTopStoriesState(newHits, page));

    //Check if new hits are added
    expect(element.state().results.redux.hits).toHaveLength(2);
    expect(Object.is(
      element.state().results.redux.hits, [
        {title: 'book1', author: 'chip', objectID: '1'},
        {title: 'book2', author: 'alex', objectID: '2'},
      ]
    ));

    //Check new page
    expect(element.state('results')).toHaveProperty('redux.page', 2);
  });
});
