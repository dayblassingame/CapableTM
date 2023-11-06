import React from "react";

export default function Task(props){
    const id = props.id;
    const name = props.name;
    const details = props.details;
    let date = props.date;
    let stage = props.stage;

    const handler = (e) =>{
        e.target.name == ('prev') ?
        props.handlePrev(stage, id) :
        props.handleNext(stage, id)
    }

    return(
        <li key={id}> 
            <span>
                <label>{name}</label>
                <button id='delete'>X</button>
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