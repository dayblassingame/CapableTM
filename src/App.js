import React, { useState, useEffect } from "react";
import './App.scss'
import Task from "./Task";
import NewTaskModal from "./NewTaskModal";
import {BsChevronUp} from 'react-icons/bs';

//displays agile board
export function App({taskProp}){    
    const [stages, setStages] = useState([
         {
            name: 'To-do',
            accordion: true,
            tasks: [],
        },
        {
            name: 'In Progress',
            accordion: true,
            tasks: [],
        },
        {
            name: 'Under Review',
            accordion: true,
            tasks: [],
        },
        {
            name: 'Done',
            accordion: true,
            tasks: [],
        }
    ]);
    const [id, setId] = useState(0);

    //load initial saved task board
    useEffect(()=>{
        let tempStageList = [...stages];

        taskProp.forEach((task, i) => {
            task.id = i;
            tempStageList[task.currentStage].tasks.push(task);
        })

        setId(taskProp.length)
        setStages([...tempStageList])

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

        //increment id for next new task
        setId(id+1);

        //add task to to-do list
        let tempObject = {
            name: stages[0].name,
            accordion: stages[0].accordion
        };
        tempObject.tasks = [...stages[0].tasks, newTask];

        setStages([tempObject, ...(stages.slice(1))]);
        //clear information from form fields
        clearForm();

        //hide form display new task btn
        const modal = document.getElementById('newTaskModal');
        modal.classList.add('display-none');
        const newTaskBtn = document.getElementById('newTaskBtn');
        newTaskBtn.classList.remove('display-none');   
    }

    //delete or move tasks to prev or next column
    const taskHandler = (stage, id, operation) =>{

        const taskToMove = stages[stage].tasks.find((a) => a.id == id);

        setStages(stages.map((item, index) => {
            if(index == stage){
                return{
                    ...item,
                    tasks: stages[stage].tasks.filter(a => a.id != id)
                }
            }else if(index == stage+operation){
                taskToMove.currentStage = stage + operation;
                return{
                    ...item,
                    tasks: [...stages[index].tasks, taskToMove]
                }
            }else{
                return item
            }
        }))
    }
    
    return(
        <main className="ctm-L-wrapper">
                <span className="ctm-C-newTaskContainer">
                    <button id='newTaskBtn' className="ctm-C-button ctm-C-newTaskButton"
                    onClick={(()=>{
                        const modal = document.getElementById('newTaskModal');
                        modal.classList.add('ctm-C-newTaskModalContainer');
                        const newTaskBtn = document.getElementById('newTaskBtn');
                        newTaskBtn.classList.add('display-none');
                    })}> Add New Task</button>
                </span>
                <NewTaskModal submit={submitNewTask}/>
                <span className="ctm-L-tasklistsContainer">
                        {stages.map((stage, index) => {
                            return(
                                <ul className='ctm-L-tasklist' key={stage+index}>
                                    <label className="ctm-L-taskListHeading"><b>{stage.name}</b></label>
                                    <button id={stage.name+'Accordion'} disabled={stage.tasks.length==0} className={stage.accordion ? 'ctm-C-button accordionOpen' : 'ctm-C-button accordionOpen accordionClosed'}
                                    onClick={()=>setStages(stages.map(item=>{
                                        if(item.name == stage.name)
                                            return {...item, accordion: !item.accordion}
                                        else
                                            return item;
                                    }))

                                    }><BsChevronUp/></button>
                                    <span 
                                    id={stage.name +'li'} className={stage.accordion ? '':'display-none'}>
                                        {
                                            stage.tasks.map((task) =>{
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