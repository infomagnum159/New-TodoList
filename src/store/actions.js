import axios from "axios";

export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';

export const FETCH_COUNTER_REQUEST = 'FETCH_COUNTER_REQUEST';
export const FETCH_COUNTER_SUCCESS = 'FETCH_COUNTER_SUCCESS';
export const FETCH_COUNTER_FAILURE = 'FETCH_COUNTER_FAILURE';

export const SAVE_COUNTER_REQUEST = 'SAVE_COUNTER_REQUEST';
export const SAVE_COUNTER_SUCCESS = 'SAVE_COUNTER_SUCCESS';
export const SAVE_COUNTER_FAILURE = 'SAVE_COUNTER_FAILURE';


export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const CHANG_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const CLOSE_ERROR_MODAL = 'CLOSE_ERROR_MODAL';



export const increase = () => ({type: INCREASE});
export const decrease = () => ({type: DECREASE});
export const add = value => ({type: ADD, payload: value});
export const subtract = value => ({type: SUBTRACT, payload: value});


export const fetchCounterRequest = () => ({type: FETCH_COUNTER_REQUEST});
export const fetchCounterSuccess = counter => ({type: FETCH_COUNTER_SUCCESS,payload: counter});
export const fetchCounterFailure = error => ({type: FETCH_COUNTER_FAILURE, payload: error});


const saveCounterRequest = () => ({type: SAVE_COUNTER_REQUEST});
const saveCounterSuccess = counter => ({type: SAVE_COUNTER_SUCCESS, payload: counter});
const saveCounterFailure = () => ({type: SAVE_COUNTER_FAILURE});


const fetchTasksRequest = () => ({type: FETCH_TASKS_REQUEST});
const fetchTasksSuccess = tasks => ({type: FETCH_TASKS_SUCCESS, tasks});
const fetchTasksError = error => ({type: FETCH_TASKS_FAILURE, error});

export const fetchCounter = () => {
    return async (dispatch, getState) => {
        try {
            console.log(getState());

            dispatch(fetchCounterRequest())
            console.log(getState());
            const response = await axios('https://burgerakbar-js14-default-rtdb.europe-west1.firebasedatabase.app/counter.json');
            if (response.data) {
                dispatch(fetchCounterSuccess(response.data))
                console.log(getState());
            } else {
                dispatch(fetchCounterSuccess(0))
            }
        } catch (e) {
            dispatch(fetchCounterFailure())
        }

    }
}

    export const saveCounter = () =>  {
        return async (dispatch, getState) => {
            try {
                const currentCounter = getState().counter;
                dispatch(saveCounterRequest())
                await axios.put('https://burgerakbar-js14-default-rtdb.europe-west1.firebasedatabase.app/counter.json', currentCounter)
            dispatch(saveCounterSuccess())
            }catch (e) {
                dispatch(saveCounterFailure())
            }
        }
    }

export const getToDo = () => {
    return async dispatch => {
        dispatch(fetchTasksRequest());
        try {
            const response = await axios.get('https://burgerakbar-js14-default-rtdb.europe-west1.firebasedatabase.app/tasks.json');
            dispatch(fetchTasksSuccess(response.data));
        } catch (event) {
            dispatch(fetchTasksError(event));
        }
    };
};

export const changedTaskForm = event => {
    return {type: CHANG_INPUT_VALUE, value: event.target.value};
};

export const addTask = (newTask, event) => {
    event.preventDefault();
    return async dispatch => {
        dispatch(fetchTasksRequest());
        const task = {
            text: newTask,
        };
        try {
            await axios.post('https://burgerakbar-js14-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', task);
            dispatch(getToDo());
        } catch (event) {
            dispatch(fetchTasksError(event));
        }
    };
};

export const removeTask = id => {
    return async dispatch => {
        dispatch(fetchTasksRequest());
        try {
            await axios.delete(`'https://burgerakbar-js14-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`);
            dispatch(getToDo());
        } catch (event) {
            dispatch(fetchTasksError(event));
        }
    };
};

export const closeModal = () => {
    return {type: CLOSE_ERROR_MODAL};
};


