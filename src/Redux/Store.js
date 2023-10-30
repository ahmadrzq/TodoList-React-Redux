import { configureStore } from "@reduxjs/toolkit";
import TodosReducer from "./Reducers/TodosReducer";
import { loadFromLocalStorage } from "../Utils/localStorage";

const preloadedState = {
  todos: loadFromLocalStorage("todosState") || {
    todos: [],
    filter: "All",
    editingNoteId: null,
    emptyTitleNoteInput: false,
    emptyNoteInput: false,
    isFinishEdit: true,
    isComplete: false,
    isTitleNoteEmpty: false,
    isNoteEmpty: false,
  },
};

export const store = configureStore({
  reducer: {
    todos: TodosReducer,
  },
  preloadedState: preloadedState,
});
