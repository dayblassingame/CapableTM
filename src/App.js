import React, { useState, useEffect } from "react";
import './App.scss'
import Task from "./Task";
import NewTaskModal from "./NewTaskModal";

//displays agile board
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

    //load initial saved task board
    useEffect(()=>{
        let taskList = []
        taskProp.forEach((task, i) =>{
            task.id = i;
            taskList = [...taskList, task];
        })
        setTasks([...taskList])
        setId(taskList.length)
    }, [])

    //function to add new Task to list and then hide form
    const submitNewTask =(e, clearForm)=>{
        e.preventDefault();

        const timezone = new Date().getTimezoneOffset();
        const date = new Date(e.target.date.value);

        //adjust date to account for timezone, add new task info & store in state array
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

        //clear information from form fields
        clearForm();

        //hide form display new task btn
        const modal = document.getElementById('newTaskModal');
        modal.classList.add('display-none');
        const newTaskBtn = document.getElementById('newTaskBtn');
        newTaskBtn.classList.remove('display-none');   
    }
    
    //move task to previous stage
    const taskHandler = (stage, id, operation) =>{

        const taskToMove = tasks.find((a) => a.id == id);
        let tempTasks =[...tasks];

        tempTasks = tempTasks.filter((task)=>
            task.id !== id
        )

        switch(operation){
            case 'prev':
                taskToMove.currentStage = stage - 1;
                tempTasks.push(taskToMove)
                break;
            case 'next':
                taskToMove.currentStage = stage + 1;
                tempTasks.push(taskToMove)
                break;
        }
        setTasks([...tempTasks])
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
                                                    taskHandler={taskHandler}
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