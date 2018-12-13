import React from "react";
import Proptypes from "prop-types";
import "spacers/dist/spacers.css";
import "bulma/css/bulma.min.css";
import "./App.css";

TodoForm.propTypes = {
  todoText: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  addTodo: Proptypes.func.isRequired,
  isEditMode: Proptypes.bool.isRequired
};
function TodoForm({ todoText, onChange, addTodo, isEditMode }) {
  return (
    <form onSubmit={addTodo}>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            type="text"
            className="input is-medium mb-1 is-rounded"
            placeholder="Add a task"
            value={todoText}
            onChange={onChange}
          />
        </div>
        <div className="control">
          <button
            type="submit"
            className="button is-fullwidth is-primary is-medium is-rounded"
            disabled={todoText.length < 6}
          >
            {isEditMode ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
}
export default TodoForm;
