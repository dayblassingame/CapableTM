import React, { useState } from "react";
import './App.scss';

//modal for user to enter new task
export default function NewTaskModal(props){
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState(()=>{
        const initialDate= new Date();
        return (initialDate.getFullYear() + '-' + (initialDate.getMonth()+1) + '-' + (initialDate.getDate() < 10 ? ('0'+initialDate.getDate()) : initialDate.getDate()))
    });
    const [error, setError] = useState('')
    //reset form fields
    const clearForm = () =>{
        setName('')
        setDetails('')
        setDate(()=>{
            const initialDate= new Date();
            return (initialDate.getFullYear() + '-' + (initialDate.getMonth()+1) + '-' + (initialDate.getDate() < 10 ? ('0'+initialDate.getDate()) : initialDate.getDate()))
        })

        const modal = document.getElementById('newTaskModal');
        modal.classList.remove('ctm-C-newTaskModalContainer');
        const newTaskBtn = document.getElementById('newTaskBtn');
        newTaskBtn.classList.remove('display-none');
    }

    const authenticate = (e) => {
        e.preventDefault();
        try{
            const timezone = new Date().getTimezoneOffset();
            let parseDate = new Date(date);
            parseDate = (new Date(parseDate.getTime()+timezone*60000))
            const today = new Date();

            if(parseDate.getTime() > today.getTime()){
                props.submit(e, clearForm); 
                return; 
            }
            setError('Due date must be in the future.')
        }catch(err){
            console.log('cannot compare times');
        }
    }
    return(
        <div id='newTaskModal' className='display-none'>
            <form onSubmit={authenticate}>
                <span>
                    <label> Task Name </label>
                    <input required type='text' name='name' value={name} autoComplete='off' maxLength='40' onChange={(e)=>setName(e.target.value)}/>
                </span>
                <span>
                    <label> Due Date </label>
                    <input type='date' name='date' className="date" 
                    required min={new Date()} value={date} onChange={(e) => setDate(e.target.value)}/>
                    <p id='dateError' className="error">{error}</p>
 
                </span>
                <span>
                    <label> Description </label>
                    <textarea name = 'details' value={details} autoComplete='off' maxLength='300' onChange={(e)=>setDetails(e.target.value)}/>
                </span>
                <span className="newTaskModalControls" >
                    <button type='button'  className="ctm-C-button" onClick={clearForm}>Cancel</button>
                    <button type='submit'  className="ctm-C-button" >Finish</button>
                </span>
            </form>
        </div>
    )
}