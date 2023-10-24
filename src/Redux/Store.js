import { configureStore } from '@reduxjs/toolkit';
import TodosReducer from './Reducers/TodosReducer';

export const store = configureStore({
  reducer: {
    todos: TodosReducer,
  },
});
