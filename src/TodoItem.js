import React, { Component } from "react";
import "spacers/dist/spacers.css";
import "bulma/css/bulma.min.css";
import "./App.css";

class TodoItem extends Component {
  onDelete = () => this.props.deleteTodo(this.props.item.id);

  onEdit = () => this.props.editTodo(this.props.item);

  render() {
    const { item } = this.props;
    return (
      <div className="notification mb-1">
        <button
          onClick={this.onDelete}
          className="delete is-medium"
          style={centeredStyle}
        />
        <span
          className="has-text-weight-semibold has-text-grey todo-item"
          onDoubleClick={this.onEdit}
          title="Double click to edit"
        >
          {item.name}
        </span>
      </div>
    );
  }
}
const centeredStyle = {
  top: "50%",
  transform: "translateY(-50%)"
};
export default TodoItem;
