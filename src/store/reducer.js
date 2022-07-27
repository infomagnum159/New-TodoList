import {
    ADD, CHANG_INPUT_VALUE, CLOSE_ERROR_MODAL,
    DECREASE,
    FETCH_COUNTER_FAILURE,
    FETCH_COUNTER_REQUEST,
    FETCH_COUNTER_SUCCESS, FETCH_TASKS_FAILURE, FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS,
    INCREASE,
    SUBTRACT
} from "./actions";

const initialState = {
    counter: 15,
    loading: false,
    error: null,
    todoList: null,
    newTask: ''
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
      case INCREASE:
          return {...state, counter: state.counter + 1};
      case DECREASE:
          return {...state, counter: state.counter - 1};
      case ADD:
          return {...state, counter: state.counter + action.payload};
      case SUBTRACT:
          return {...state, counter: state.counter - action.payload};
      case FETCH_COUNTER_REQUEST:
      case FETCH_TASKS_REQUEST:
          return {...state, loading: true};
      case FETCH_COUNTER_SUCCESS:
          return {...state, loading: false, counter: action.payload};
      case FETCH_COUNTER_FAILURE:
      case FETCH_TASKS_FAILURE:
          return {...state, loading: false};
      case FETCH_TASKS_SUCCESS:
          return {
              ...state,
              loading: false,
              todoList: action.tasks !== null ? Object.keys(action.tasks).map(task => ({
                  ...action.tasks[task],
                  id: task
              })) : null,
              newTask: '',
              error: null
          }
      case CHANG_INPUT_VALUE:
          return {...state, newTask: action.value};
      case CLOSE_ERROR_MODAL:
          return {...state, error: null};
      default:
          return state;
  }
};
export default reducer;