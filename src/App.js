import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Counter from "./containers/Counter/Counter";
import Layout from "./components/Layout/Layout"
import TodoList from "./containers/ToDoList/TodoList";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Counter} />
                <Route path="/todo" component={TodoList} />
                <Route render={() => <h1>404 page not found</h1>} />
            </Switch>
        </Layout>
    );
}

export default App;