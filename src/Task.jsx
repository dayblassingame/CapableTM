import React from "react";
import {AiOutlineClockCircle} from 'react-icons/ai';
import './App.scss';

//formats task array objects into task components
export default function Task(props){
    const id = props.id;
    const name = props.name;
    const details = props.details;
    let date = props.date;
    let stage = props.stage;

    const handler = (e) =>{
        switch(e.target.name){
            case 'prev':
                props.taskHandler(stage, id, 'prev')
                break;
            case 'next':
                props.taskHandler(stage, id, 'next')
                break;
            case 'delete':
                props.taskHandler(stage, id, 'del')
                break;
            }
    }

    return(
        <li className='ctm-C-taskListItem' key={id}> 
            <span className="ctm-C-listItemDisplay">
                <label>{name}</label>
                <button id='delete' name='delete'  className="ctm-C-button" onClick={handler}>X</button>
                <p>{details}</p>
            </span>
            <span className="taskListBottomContainer">
            <span className='clock'>
                    <AiOutlineClockCircle className='icon'/>
                    <p>{formatDate(date)}</p>
                </span>
                <span className="listItemControls">
                    <button id='prev' name='prev' className="ctm-C-button" disabled={stage === 0 ? true: false} onClick={handler}>{'<<'}</button>
                    <button id='next' name='next'  className="ctm-C-button" disabled={stage === 3? true: false} onClick={handler}>{'>>'}</button>
                </span>
            </span>
        </li>
    );
}

export function formatDate(date){    
    const month= date.getMonth() + 1;
   const day = date.getDate();
    const year = date.getFullYear();

    return(month + "/" + day + "/" + year.toString().slice(2));
}