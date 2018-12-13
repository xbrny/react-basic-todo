import React, { Component } from "react";
import "spacers/dist/spacers.css";
import "bulma/css/bulma.min.css";
import "./App.css";
import axios from "axios";

import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

class App extends Component {
  state = {
    todos: [],
    todoTextInput: "",
    todoUpdateId: null,
    notification: null,
    isEditMode: false,
    isLoading: true
  };

  apiEndpoint = "https://5c1149e97e18800013bc38df.mockapi.io";

  componentDidMount() {
    axios
      .get(`${this.apiEndpoint}/todos`)
      .then(result => result.data)
      .then(todos => {
        setTimeout(() => {
          this.setState({ todos, isLoading: false });
        }, 500);
      });
  }

  handleOnInputChange = e => {
    this.setState({ todoTextInput: e.target.value });
  };

  addTodo = e => {
    e.preventDefault();

    axios
      .post(`${this.apiEndpoint}/todos`, {
        id: Date.now(),
        name: this.state.todoTextInput
      })
      .then(response => response.data)
      .then(todo => {
        this.setState(state => {
          return {
            todos: [...this.state.todos, todo],
            todoTextInput: "",
            notification: "Task added successfully"
          };
        });

        setTimeout(() => {
          this.setState({ notification: null });
        }, 2000);
      });
  };

  deleteTodo = id => {
    axios
      .delete(`${this.apiEndpoint}/todos/${id}`)
      .then(response => response.data)
      .then(todo => {
        this.setState(state => {
          const todos = state.todos.filter(todo => todo.id !== id);
          return {
            todos,
            notification: "Task deleted successfully"
          };
        });

        setTimeout(() => {
          this.setState({ notification: null });
        }, 2000);
      });
  };

  editTodo = todo => {
    this.setState({
      isEditMode: true,
      todoTextInput: todo.name,
      todoUpdateId: todo.id
    });
  };

  updateTodo = e => {
    e.preventDefault();

    axios
      .put(`${this.apiEndpoint}/todos/${this.state.todoUpdateId}`, {
        name: this.state.todoTextInput
      })
      .then(response => response.data)
      .then(newTodo => {
        this.setState(state => {
          const todos = state.todos.map(todo => {
            if (todo.id === newTodo.id) {
              return newTodo;
            }
            return todo;
          });

          return {
            todos,
            todoUpdateId: null,
            isEditMode: false,
            todoTextInput: "",
            notification: "Task updated successfully"
          };
        });
      });

    setTimeout(() => {
      this.setState({ notification: null });
    }, 2000);
  };

  render() {
    const {
      todos,
      todoTextInput,
      isEditMode,
      notification,
      isLoading
    } = this.state;

    return (
      <section className="section has-text-grey">
        {notification && (
          <div
            style={toaster}
            className="notification is-success has-text-right"
          >
            {notification}
          </div>
        )}
        <div className="container">
          {/* START HEADER */}
          <h1 className="is-size-2 is-uppercase has-text-weight-semibold has-text-centered mb-1">
            Todo List
          </h1>
          {/* END HEADER */}

          {/* START TODO COLUMN */}
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    <TodoForm
                      todoText={todoTextInput}
                      onChange={this.handleOnInputChange}
                      addTodo={isEditMode ? this.updateTodo : this.addTodo}
                      isEditMode={isEditMode}
                    />
                    {isLoading && (
                      <div className="has-text-centered">
                        <div className="icon has-text-primary is-large">
                          <i className="fas fa-spinner fa-pulse fa-3x mx-auto" />
                        </div>
                      </div>
                    )}
                    {!isLoading && !isEditMode && (
                      <TodoList
                        editTodo={this.editTodo}
                        todos={todos}
                        deleteTodo={this.deleteTodo}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* END TODO COLUMN */}
          </div>
          {/* END TODO ROW */}
        </div>
      </section>
    );
  }
}

const toaster = {
  position: "absolute",
  top: "50px",
  right: "5%",
  zIndex: 2000,
  opacity: ".8"
};

export default App;
