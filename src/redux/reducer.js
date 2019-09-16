import { createSelector } from "reselect";

//Action types
import {
  ADD_TODO,
  UPDATE_FILTER,
  UPDATE_TODO_STATUS,
  CLEAR_COMPLETED
} from "./actions.js";

export const VisibilityFilters = {
  SHOW_ALL: "All",
  SHOW_ACTIVE: "Active",
  SHOW_COMPLETED: "Completed"
};

const INITIAL_STATE = {
  todos: [],
  filter: VisibilityFilters.SHOW_ALL
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo]
      };
    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.todo.id
            ? { ...action.todo, complete: action.complete }
            : todo
        )
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.complete)
      };
    default:
      return state;
  }
};

// Selectors
// /Define functions that return the parts of the state that are relevant.
const getTodosSelector = state => state.todos;
const getFilterSelector = state => state.filter;

export const getVisibleTodosSelector = createSelector(
  //Tell reselect that these functions should be observed for changes.
  getTodosSelector,
  getFilterSelector,
  //Define the output based on the state values.
  (todos, filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(todo => todo.complete);
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(todo => !todo.complete);
      default:
        return todos;
    }
  }
);
