This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).

# My first interaction with ReactJS

*I use the book the Road to React by Robin Wieruch*

## First chapter

### React
- JSX is the language that React use
- Component is like a class (in object-oriented programming)
- Instance / DOM node, React render this to the view
- Element, describe the **type + property** of instance (and also of component) ?? (still no idea what that is)
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

- There is the class components with implementable local states, and there is the functional stateless components - ones that are functions and do not have any states or methods
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
