import React, { useState } from "react";

//modal for user to enter new task
export default function NewTaskModal(props){
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState(()=>{
        const initialDate= new Date();
        return (initialDate.getFullYear() + '-' + (initialDate.getMonth()+1) + '-' + (initialDate.getDate() < 10 ? ('0'+initialDate.getDate()) : initialDate.getDate()))
    });

    //reset form fields
    const clearForm = () =>{
        setName('')
        setDetails('')
        setDate(()=>{
            const initialDate= new Date();
            return (initialDate.getFullYear() + '-' + (initialDate.getMonth()+1) + '-' + (initialDate.getDate() < 10 ? ('0'+initialDate.getDate()) : initialDate.getDate()))
        })
    }

    const handleCancel = () =>{
        clearForm();

        const modal = document.getElementById('newTaskModal');
        modal.classList.add('display-none');
        const newTaskBtn = document.getElementById('newTaskBtn');
        newTaskBtn.classList.remove('display-none'); 
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
                <button type='button'  className="ctm-C-button" onClick={handleCancel}>Cancel</button>
                <button type='submit'  className="ctm-C-button" >Finish</button>
            </form>
        </div>
    )
}