import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      value: "",
    };
  }
  onChange = (e) => {
    this.setState({ value: e.target.value });
  };
  onAddTask = (e) => {
    e.preventDefault();

    const obj = {
      name: this.state.value,
      id: Date.now(),
    };
    if (this.state.value !== "") {
      this.setState({ todos: this.state.todos.concat(obj) });
      this.setState({ value: "" });
    }
  };

  onDeleteTask = (itemId) => {
    this.setState({
      todos: [...this.state.todos].filter((id) => id.id !== itemId),
    });
  };

  render() {
    const mylist = this.state.todos.map((todo) => (
      <li className="todo_item">
        {todo.name}

        <button>Edit</button>
        <button onClick={() => this.onDeleteTask(todo.id)}>Remove</button>
      </li>
    ));

    return (
      <>
        <div className="App">
          <form onSubmit={this.onAddTask}>
            <input
              placeholder="typeyour task"
              value={this.state.value}
              onChange={this.onChange}
            />
            <button onClick={this.onAddTask}>Add Item</button>
          </form>

          <ul className="todo_wrapper">{mylist}</ul>
        </div>
      </>
    );
  }
}

export default App;