import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {applyMiddleware, createStore} from "redux";
import reducer from "./store/reducer";
import './index.css';
import {Provider} from "react-redux";
import thunkMiddleWare from "redux-thunk";
import {BrowserRouter} from "react-router-dom";


const store = createStore(reducer, applyMiddleware(thunkMiddleWare));
const app = (
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);