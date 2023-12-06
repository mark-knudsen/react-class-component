import "./App.css";
import React, { Component } from "react";

/*
  According to: https://react.dev/reference/react/Component#adding-state-to-a-class-component
  1) "The state of a class component is available as this.state. 
  The state field must be an object. Do not mutate the state directly. 
  If you wish to change the state, call setState with the new state." 

  2) "Defining state in class components is equivalent to calling useState in function components."
*/

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      value: "",
      editing: false,     // added for Edit a To-do Task
      currentid: "",      // added for Edit a To-do Task
      currentValue: "",   // added for Edit a To-do Task
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

  onEditTodo = (id, newValue) => {
    this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.name = newValue;
      }
    });
  };

  onSubmitEditTodo = (e) => {
    e.preventDefault();

    this.onEditTodo(this.state.currentid, this.state.currentValue);
    this.setState({ editing: false });
  };

  onToggleEdit = (todo) => {
    this.setState({ editing: true });
    this.setState({ currentid: todo.id });
    this.setState({ currentValue: todo.name });
  };

  onEditInputChange = (e) => {
    this.setState({ currentValue: e.target.value });
  };

  render() {
    const mylist = this.state.todos.map((todo) => (
      <li className="todo_item">
        {todo.name}

        <button className="edit" onClick={() => this.onToggleEdit(todo)}>Edit</button>
        <button className="remove" onClick={() => this.onDeleteTask(todo.id)}>Remove</button>
      </li>
    ));

    return (
      <div className="App">
        {this.state.editing === false ? (
          <form onSubmit={this.onAddTask}>
            <input
              placeholder="typeyour task"
              value={this.state.value}
              onChange={this.onChange}
            />
            <button onClick={this.onAddTask}>Add Item</button>
          </form>
        ) : (
          <form onSubmit={this.onSubmitEditTodo}>
            <input
              placeholder="edit your task"
              value={this.state.currentValue}
              name={this.state.currentValue}
              onChange={this.onEditInputChange}
            />
            <button onClick={this.onSubmitEditTodo}>Update Item</button>
          </form>
        )}

        <ul className="todo_wrapper">{mylist}</ul>
      </div>
    );
  }
}

export default App;