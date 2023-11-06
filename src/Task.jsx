import React from "react";

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
        <li key={id}> 
            <span>
                <label>{name}</label>
                <button id='delete' name='delete' onClick={handler}>X</button>
                <p>{details}</p>
            </span>
            <span>
                <p>{formatDate(date)}</p>
                <button id='prev' name='prev' onClick={handler}>{'<<'}</button>
                <button id='next' name='next' onClick={handler}>{'>>'}</button>
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