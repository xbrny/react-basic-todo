import React from "react";
import Proptypes from "prop-types";
import "spacers/dist/spacers.css";
import "bulma/css/bulma.min.css";
import "./App.css";

import TodoItem from "./TodoItem";

TodoList.propTypes = {
  todos: Proptypes.array,
  deleteTodo: Proptypes.func.isRequired,
  editTodo: Proptypes.func.isRequired
};
function TodoList({ todos, deleteTodo, editTodo }) {
  if (!todos) {
    return null;
  }
  const sortedTodos = todos.sort((a,b) => b.id - a.id)
  return (
    <div>
      {sortedTodos.map(todo => (
        <TodoItem
          key={todo.id}
          item={todo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}
export default TodoList;
