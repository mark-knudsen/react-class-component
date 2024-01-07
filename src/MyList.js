import "./App.css";
import React from "react";


class MyList extends React.Component {

  render() {
    const { todos, onToggleEdit, onDeleteTask } = this.props;

    const mylist = todos.map((todo) => {
        //console.log("Todo ID:", todo.id);
        return (
          <li className="todo_item" key={todo.id}>
            {todo.name}
            <button className="edit" onClick={() => onToggleEdit(todo)}>Edit</button>
            <button className="remove" onClick={() => onDeleteTask(todo.id)}>Remove</button>
          </li>
        );
      });
      

    return <ul className="todo_wrapper">{mylist}</ul>;
  }
}

export default MyList;
