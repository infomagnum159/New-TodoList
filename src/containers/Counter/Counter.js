import React, {useEffect} from 'react';
import './Counter.css';
import {useDispatch, useSelector} from "react-redux";
import {add, decrease, fetchCounter, increase, saveCounter, subtract} from "../../store/actions";

const Counter = () => {

    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCounter())
    }, [dispatch])

    const increaseCounter = async () => {
        dispatch(increase());
       await dispatch(saveCounter());
        dispatch(fetchCounter());
    };
    const decreaseCounter = async () => {
        dispatch(decrease());
        await dispatch(saveCounter());
        dispatch(fetchCounter());
    };
    const plusCounter = async () => {
        dispatch(add(5));
        await dispatch(saveCounter());
        dispatch(fetchCounter());
    }
    const minusCounter = async () => {
        dispatch(subtract(5));
        await dispatch(saveCounter());
        dispatch(fetchCounter());
    }
    return (
        <div className="Counter">
            <h1>{counter}</h1>
            <button onClick={increaseCounter}>Increase</button>
            <button onClick={decreaseCounter}>Decrease</button>
            <button onClick={plusCounter}>Increase by 5</button>
            <button onClick={minusCounter}>Decrease by 5</button>
        </div>
    );
};

export default Counter;