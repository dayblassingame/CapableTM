import React, { useState, useEffect } from "react";
import './App.scss'
import Task from "./Task";
import NewTaskModal from "./NewTaskModal";

export function App({taskProp}){    
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
    const [tasks, setTasks] = useState([]);
    const [id, setId] = useState(0);

    useEffect(()=>{
        let taskList = []
        taskProp.forEach((task, i) =>{
            task.id = i;
            taskList = [...taskList, task];
        })
        setTasks([...taskList])
        setId(taskList.length)
    }, [])

    const submitNewTask =(e)=>{
        e.preventDefault();

        const timezone = new Date().getTimezoneOffset();
        const date = new Date(e.target.date.value);

        const newTask = {
            name: e.target.name.value,
            details: e.target.details.value,
            currentStage: 0,
            id: id,
            key: id,
            dueDate: (new Date(date.getTime()+timezone*60000))
        }
        setId(id+1);
        setTasks([...tasks, newTask])
    }

    return(
        <main id='main' className='ctm-main-dashboard'>
            <span className="ctm-newTaskContainer">
                <button id='newTaskBtn' 
                onClick={(()=>{
                    const modal = document.getElementById('newTaskModal');
                    modal.classList.remove('display-none');
                    const newTaskBtn = document.getElementById('newTaskBtn');
                    newTaskBtn.classList.add('display-none');
                })}> Add New Task</button>
            </span>
            <NewTaskModal submit={submitNewTask}/>
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