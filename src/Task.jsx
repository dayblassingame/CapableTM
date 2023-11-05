import React from "react";

export default function Task(props){
    const id = props.id;
    const name = props.name;
    const details = props.details;
    let date = props.date;
    let stage = props.stage;

    return(
        <li key={id}> 
            <span>
                <label>{name}</label>
                <button id='delete'>X</button>
                <p>{details}</p>
            </span>
            <span>
                <p>{formatDate(date)}</p>
                <button id='prev'>{'<<'}</button>
                <button id='next'>{'>>'}</button>
            </span>
        </li>
    );
}

export function formatDate(date){
    const month= date.getMonth();
    const day = date.getDay();
    const year = date.getFullYear();

    return(month + "/" + day + "/" + year.toString().slice(2));
}