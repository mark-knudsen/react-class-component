import "./App.css";
import React, { Component } from "react";
import MyList from "./MyList";

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      value: "",
      editing: false,
      currentid: "",
      currentValue: "",
    };
  }

  // Added Lifecycle methods from line 17-34 - NEW
  componentDidMount() {
    console.log("Todo mounted");

    // Simulating an event listener setup
    window.addEventListener("resize", this.handleResize);
  }
  componentDidUpdate(prevProps, prevState) {
    // This lifecycle method is called whenever the component updates.
    // You can compare the current props and state with the previous ones.
    // It's a good place to perform side effects when props or state change.
    // considered unsafe for asynchronous updates!
    console.log("Todo is updated");
  }

  componentWillUnmount() {
    console.log("Component will unmount");

    // Simulating cleanup or removing event listeners
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    console.log("Window resized");
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

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onDeleteTask = (itemId) => {
    this.setState({
      todos: [...this.state.todos].filter((id) => id.id !== itemId),
    });
  };

  onEditTodo = (id, newValue) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, name: newValue }; // Return the updated todo
        }
        return todo; // Return unchanged todos
      }),
    }));
  };
/*   onEditTodo = (id, newValue) => {
    this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.name = newValue;
      }
    });
  }; */
  

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
    return (
      <div className="App">
        {this.state.editing === false ? (
          <form onSubmit={this.onAddTask}>
            <input
              placeholder="Type your task"
              value={this.state.value}
              onChange={this.onChange}
            />
            <button onClick={this.onAddTask}>Add ToDo</button>
          </form>
        ) : (
          <form onSubmit={this.onSubmitEditTodo}>
            <input
              placeholder="edit your task"
              value={this.state.currentValue}
              name={this.state.currentValue}
              onChange={this.onEditInputChange}
            />
            <button onClick={this.onSubmitEditTodo}>Update ToDo</button>
          </form>
        )}

        {/* Render MyList component passing necessary props */}
        <MyList todos={this.state.todos} onToggleEdit={this.onToggleEdit} onDeleteTask={this.onDeleteTask} />
      </div>
    );
  }
}

export default Todo;
