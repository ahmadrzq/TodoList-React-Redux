import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  filter: 'All'
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    completeTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },
    setFilter: (state, action) => {
        state.filter = action.payload
    }
  },
});

export const { addTodo, removeTodo, completeTodo, setFilter } = todosSlice.actions;
export default todosSlice.reducer;
