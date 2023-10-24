import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  filter: "All",
  editingNoteId: null,
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
      state.filter = action.payload;
    },
    toggleEdit: (state, action) => {
      state.editingNoteId = action.payload;
    },
    updateTodo: (state, action) => {
      const { id, title, note } = action.payload;
      const task = state.todos.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.note = note;
      }
    },
  },
});

export const { addTodo, removeTodo, completeTodo, setFilter, toggleEdit, updateTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
