import React, { useState, useEffect } from 'react';
    import db from './db';
    import './index.css';

    function App() {
      const [todos, setTodos] = useState([]);
      const [newTodo, setNewTodo] = useState('');

      useEffect(() => {
        loadTodos();
      }, []);

      const loadTodos = async () => {
        const allTodos = await db.todos.toArray();
        setTodos(allTodos);
      };

      const addTodo = async () => {
        if (newTodo.trim()) {
          await db.todos.add({ text: newTodo, completed: false });
          setNewTodo('');
          loadTodos();
        }
      };

      const toggleTodo = async (id) => {
        const todo = await db.todos.get(id);
        await db.todos.update(id, { completed: !todo.completed });
        loadTodos();
      };

      const deleteTodo = async (id) => {
        await db.todos.delete(id);
        loadTodos();
      };

      return (
        <div className="todo-container">
          <h1>Todo App</h1>
          <div>
            <input
              type="text"
              className="todo-input"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add new todo"
            />
            <button className="todo-button" onClick={addTodo}>
              Add Todo
            </button>
          </div>
          <div>
            {todos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <div>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.text}
                  </span>
                </div>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    export default App;
