import React, { useState } from "react";
import './App.scss'

export function App({taskProp}){
    let id = 0;
    const stages = [
        {
            name: 'To-do',
            accordion: true,
        },
        {
            name: 'In Progress',
            accordion: true,
        },
        {
            name: 'Under Review',
            accordion: true,
        },
        {
            name: 'Done',
            accordion: true,
        }
    ]

    let taskList = [];

    stages.forEach((stage) =>{
        taskList.push([]);
    })

    taskProp.forEach((task) =>{
        taskList[task.currentStage].push(task);
    })
    const [tasks, setTasks] = useState([taskList]);


    return(
        <main id='main' className='ctm-main-dashboard'>
            <span className="ctm-newTaskContainer">
                <button id='newTask'> Add New Task</button>
            </span>
            <span >

            </span>
            <span className="ctm-tasklistsContainer">
                 <ul>
                    {
                        stages.map((stage)=>{
                            
                        })
                    }
                 </ul>
            </span>

        </main>
    )
}