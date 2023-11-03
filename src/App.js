import React, { useState } from "react";
import './App.scss'
import Task from "./Task";

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

    let taskList = []
    taskProp.forEach((task) =>{
        task.id = id;
        taskList = [...taskList, task];
        id++;
    })
    const [tasks, setTasks] = useState(taskList);

    return(
        <main id='main' className='ctm-main-dashboard'>
            <span className="ctm-newTaskContainer">
                <button id='newTask'> Add New Task</button>
            </span>
            <span >

            </span>
            <span className="ctm-tasklistsContainer">
                    {stages.map((stage, index) => {
                        return(
                            <ul key={stage+index}>
                                <label>{stage.name}</label>
                                <span id={stage.name +'li'} >
                                    {
                                        tasks.map((task) =>{
                                            if(task.currentStage !== index)
                                                return;
                                            return(
                                                <Task
                                                    key={task.id}
                                                    id={task.id}
                                                    name={task.name}
                                                    details={task.details}
                                                    date={task.dueDate}
                                                    stage={task.currentStage}
                                                 />
                                            )
                                        })
                                    }
                                </span>
                            </ul>
                        )
                    })
                    }

            </span>

        </main>
    )
}