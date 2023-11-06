import React, { useState } from "react";

export default function NewTaskModal(props){
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState(()=>{
        const initialDate= new Date();
        return (initialDate.getFullYear() + '-' + (initialDate.getMonth()+1) + '-' + (initialDate.getDate() < 10 ? ('0'+initialDate.getDate()) : initialDate.getDate()))
    });

    const clearForm = () =>{
        setName('')
        setDetails('')
        setDate(()=>{
            const initialDate= new Date();
            return (initialDate.getFullYear() + '-' + (initialDate.getMonth()+1) + '-' + (initialDate.getDate() < 10 ? ('0'+initialDate.getDate()) : initialDate.getDate()))
        })
    }

    return(
        <div id='newTaskModal' className='display-none'>
            <form onSubmit={(e)=> props.submit(e, clearForm)}>
                <span>
                    <label><b>Task Name</b></label>
                    <input required type='text' name='name' value={name} onChange={(e)=>setName(e.target.value)}/>
                </span>
                <span>
                    <label><b>Description</b></label>
                    <input required type='text' name='details' value={details} onChange={(e)=>setDetails(e.target.value)}/>
                </span>
                <span>
                    <label><b>Due Date</b></label>
                    <input required type='date' name='date' 
                    min={new Date()} value={date} onChange={(e) => setDate(e.target.value)}/>
                </span>
                <button type='submit'>Finish</button>
            </form>
        </div>
    )
}