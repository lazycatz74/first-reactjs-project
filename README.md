This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# My first interaction with ReactJS

*I use the book the Road to React by Robin Wieruch*

## First chapter

### React

- JSX is the language that React use

- *Component* is like a class (in object-oriented programming)
- *Instance* / DOM node, React render this to the view
- *Element*, describe the **type + property** of instance (and also of component) ?? (still no idea what that is)
  - They are plain objects. Example: `const element = <h1>Hello girls</h1>`
  - ***How it works:*** `element` --> `ReactDOM` ----render, transformation, bla bla bla----> `DOM` ----> `rendered UI on view`
  - **This is neither HTML nor JS**
  - **It is not a DOM element, DOM els are more complicated (I guess that they would have more attributes since they are used in rendering**
  
- Hot Module Replacement is rendering the app without reloading it on the browser

- **Immutability** is not changing the variable (or data structure ??)

### ES6

- `let & const`, `let` is more clarified than `var`

- Class, this concept is extracted from OOD. It is less used in React, here they prefer **Composition**

- Arrow function. They are awesome. They allow us to omit the curly braces (block body) and replace with (concise body)

## Second chapter

### I learned about the components in React

- There is the ***class components*** with implementable local states, and there is the ***functional stateless components*** - ones that are functions and do not have any states or methods

- A program should be divided into several nested components, they should be **composable** (can be used to define the children components) and **reuseable**

- Declare methods and bind it to the class (so that the method would always be possessed by *its class*, not an unknown class)
- Apply composition using `this.children`

### I used components to create UIs (forms: search, buttons)

- When using an input fields, the `value` properties should take the data in the state as the only source of truth

- **Immutability is applied for state**, changing state should be done with `setState()`
 
### ES6

- filter() and includes() methods of array prototype

### CSS styling with className or inline-styling

- `<div style={{ color: 'blue' }}>`

# React components have been proving their power, making me who controls them - a powerful mage!

## Third chapter, I keep digging a bit deeper into controlling the components of React

- I implement the content of some important lifecycle methods of the App component: Besides `render()`, there are `componentDidMount()` and `componentWillUnmount()`

  - `componentDidMount()` is triggered after the component renders for the first time. It will set up some state that could be changed during the lifecycle of the component. E.g. when we start a clock
  - `componentWillUnmount()` happens when the component is deleted from the DOM. This methods "turn off" the states initialised in mounting. E.g. stop the clock. ***Purpose:*** **to avoid some callbacks which may still be loading data**
  
 - I nest components: e.g. Button inside Search
 
 - I use the states of component to store API's data and use them in addition. This is a great advantage - since I have few clues of how to do it in JS (quite complex I suppose, https://www.robinwieruch.de/why-frameworks-matter/)
 
### Also, learning to integrate other APIs into my React environment is very beneficial
 
- **It helps get things done quicker with less coding**

- **It breaks some boundaries that restricted by our native brower/browsers**
 
 ### Hmm... So what about ES6 related techniques
 
- Aha! ***Object.assign*** vesus ***spread operator*** - Use them to create **new object, which are VERY ESSENTIAL to setting value of state (*You always want to put inside setState() a fresh object*)**

- Conditional rendering, use these guys:
  - `if` statement
  - `&&` operator. `true && something` returns `something`, `false && something` returns `false`. **ALWAYS**
  - ternary operator

### Something helpful that I should include in my program more often: ***ERROR HANDLING/BOUNDARIES***

## Fourth chapter: Testing my app

### Since we have reusable components, we can split and organise the components into seperate files

- The folder structure will look like: 
  - `src/components/App`, `src/components/Button`,... each has its public interface, which is `index.js` (and also `test.js` & `index.css`)
  - `index` file imports and exports all the components which its type generalised by Button, e.g. SubmitButton, SaveButton, CancelButton.
  - `src/components/constants/index.js`

- Note `export` & `export default`

### Testing!

- There are 3 layers that make up the testing pyramid:
  - Unit test: one component or function
  - Integration: two or more components combined together and perform and be tested as a single entity
  - End-to-end: simulation of real-life scenario
  
- **In React:** Component test = Unit test + Snapshot test
  - Unit: (use Enzyme) assert, manipulate & traverse React components (**play with the component state, methods**)
  - Snapshot: (use Jest) make a snapshot of your rendered component and compare it against future snapshots
  - ***Component Interface - another method to catch errors***
    - validate the type of data, assign default value for data
    - use PropTypes, Typescript and Flow
  - React Developer Tools (***HELPFUL***)

# There are still many features we can implement and improve in our React app, ADVANCED ONES

## Fifth chapter: Building extras

  - Focus on search field, using the `ref` attribute to trace the `input`'s DOM node that we use later
  
  - Loading indicator (by adding an `isLoad` state)
  
  - Higher-order components
    - They receive components as parameters and return a component that has been enhanced and refined
    - Example: `More` button --`withLoading`--> decides to indicate `Loading` or `More`
               `Table` --`withEmpty`--> decides to show alert message of empty data or `Table`
               `Table` --`withNull`--> decides to show nothing (no table available) or `Table`
           
  - Sort output results by clicking the header, click twice will show reverse result list ( we use **Lodash & classnames APIs** for this )
