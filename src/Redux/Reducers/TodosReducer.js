import { createSlice } from "@reduxjs/toolkit";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../Utils/localStorageUtils";

const initialState = loadFromLocalStorage("todosState") || {
  todos: [],
  filter: "All",
  editingNoteId: null,
  emptyTitleNoteInput: false,
  emptyNoteInput: false,
  isFinishEdit: true,
  isComplete: false,
  isTitleNoteEmpty: false,
  isNoteEmpty: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      saveToLocalStorage("todosState", state);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveToLocalStorage("todosState", state);
    },
    completeTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      saveToLocalStorage("todosState", state);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    toggleEdit: (state, action) => {
      state.editingNoteId = action.payload;
      saveToLocalStorage("todosState", state);
    },
    updateTodo: (state, action) => {
      const { id, title, note } = action.payload;
      const task = state.todos.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.note = note;
        state.editingNoteId = null;
        saveToLocalStorage("todosState", state);
    }
    },
    setEmptyNoteInput: (state, action) => {
      state.emptyNoteInput = action.payload;
    },
    setEmptyTitleNoteInput: (state, action) => {
      state.emptyTitleNoteInput = action.payload;
    },
    toggleFinishEdit: (state, action) => {
      state.isFinishEdit = action.payload;
    },
    uncompleteWarning: (state, action) => {
      state.isComplete = action.payload;
    },
    toggleEmptyNote: (state, action) => {
      state.isNoteEmpty = action.payload;
    },
    toggleEmptyTitleNote: (state, action) => {
      state.isTitleNoteEmpty = action.payload;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  completeTodo,
  setFilter,
  toggleEdit,
  updateTodo,
  setEmptyNoteInput,
  setEmptyTitleNoteInput,
  toggleFinishEdit,
  uncompleteWarning,
  toggleEmptyNote,
  toggleEmptyTitleNote,
} = todosSlice.actions;
export default todosSlice.reducer;
