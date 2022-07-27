import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTask, changedTaskForm, removeTask, getToDo} from "../../store/actions";
import Tasks from "../../components/Tasks/Tasks";
import Task from "../../components/Task/Task";
import TaskForm from "../../components/TaskForm/TaskForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import './ToDoList.css'

const TodoList = () => {
    const todoList = useSelector(state => state.todoList);
    const newTask = useSelector(state => state.newTask);
    const loading = useSelector(state => state.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getToDo());
    }, [dispatch]);

    return (
        <div className="TodoList">
            <TaskForm
                task={newTask}
                onChange={event => dispatch(changedTaskForm(event))}
                sendHandler={event => dispatch(addTask(newTask, event))}
            />
            {todoList !== null ?
                <Tasks>
                    {
                        loading &&
                        <div className="preloader">
                            <Spinner />
                        </div>
                    }
                    {todoList.map(task => <Task
                        key={task.id}
                        id={task.id}
                        task={task.text}
                        onClick={() => dispatch(removeTask(task.id))}
                    />)}
                </Tasks> : <p>Add new task ...</p>
            }
        </div>
    );
};

export default TodoList;