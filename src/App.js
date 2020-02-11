import React, { Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/CardLIst';
import { SearchBox } from './components/search-box/SearchBox';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: '',
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }
  // If We don't use arrow function it gives an error setState of undefined.
  // We need to bind this in constructor function.
  // Because When the page first loads, it will read constructor first.

  // handleChange(e) {
  //   this.setState({ searchField: e.target.value });
  // }

  // Arrow function allows us set the context of 'this' whatever was declarative in the first place.
  // It allows us to set 'this' when handleChange function  is defined.
  // So we declared here and this points to App component.
  // It automatically bind 'this'.

  handleChange = e => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase()),
    );

    return (
      <div className='App'>
        <h1> Monsters Rolodex </h1>
        <SearchBox placeholder='search monsters' handleChange={this.handleChange} />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
