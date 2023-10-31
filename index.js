require('file-loader?name=[name].[ext]!./index.html');

import React from "react";
import ReactDOM from "react-dom";
import {App} from './src/App'
const rootElement = document.getElementById('app');

let tasks = [
    {
        name:'walk dog',
        details:'stay in neightborhood',
        currentStage:0,
        dueDate: new Date()
    },
    {
        name:'clean house',
        details:'fridge, bathroom, and den',
        currentStage:0,
        dueDate: new Date()
    },
    {
        name:'cook dinner',
        details:'asian cuisine',
        currentStage:0,
        dueDate: new Date()
    },
    {
        name:'cook dinner',
        details:'indian cuisine',
        currentStage:3,
        dueDate: new Date()
    },
    {
        name:'cook dinner',
        details:'african cuisine',
        currentStage:0,
        dueDate: new Date()
    }
]

ReactDOM.render(<App taskProp={tasks}/>, rootElement);