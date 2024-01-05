import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { v4 as uuidv4} from "uuid";
import "./task.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'  

export default function TaskForm() { 
        const emptyForm={task:"",priority:false, isDone:false}
        const [formData, setFormData] = useState(emptyForm) 
        const [tasks, setTasks] = useState([])
        const [taskChangeCount, setTaskChangeCount]=useState(0)

        useEffect( () => {
          if(taskChangeCount>0){

            localStorage.setItem("tasks",JSON.stringify(tasks))

          }

        },[taskChangeCount])

        useEffect( () => {

          const localStorageTaks = JSON.parse(localStorage.getItem("tasks"))
          setTasks(localStorageTaks ?? [])

        },[])

        function handleInputChange(event){
            setFormData(prev=>{
                return {
                ...prev,
                  [event.target.name]: event.target.type=="checkbox"?
                  event.target.checked:event.target.value
                }
            })
        }

        function removeTask(uuid){
          console.log(uuid);
          setTasks(prev=>prev.filter(item=>item.uuid!==uuid))
          setTaskChangeCount(prev=>prev+1)
        }

        function editTask(uuid){
          console.log(uuid);
          const task= tasks.find(item=>item.uuid==uuid)
          setFormData({...task, isEdited:true})
          setTaskChangeCount(prev=>prev+1)
        }

        function doneTask(uuid){
          const taskIndex= tasks.findIndex(item=>item.uuid==uuid)
          const task = tasks[taskIndex]
          task.isDone=!task.isDone
          const newTasks = tasks.slice()
          newTasks[taskIndex]=task
          setTasks(newTasks)
          setTaskChangeCount(prev=>prev+1)
        }

        function handleFormSubmit(event) {
          event.preventDefault()
          if(formData.isEdited){
            const taskIndex=tasks.findIndex(item=>item.uuid===formData.uuid)
            const newTasks = tasks.slice()
            newTasks[taskIndex]={...formData}
            setTasks(newTasks)
          }

          else if (formData.task.length >0) {
            formData.uuid=uuidv4()
            setTasks(
              prev=>
              [formData,...prev ]
            )
          }
          
          setFormData(emptyForm)
          event.target.reset()
          setTaskChangeCount(prev=>prev+1)
    }

  return (
    <>
    <div className="container main">
      <h1>TO DO</h1>
      <div className="container">
        <form className="container" onSubmit={handleFormSubmit}>
            <div className="row">
              <label htmlFor="input" className="task">Task:</label>
              <div>
                <input type="text" id="input" name="task" value={formData.task} onChange={handleInputChange}/>
              </div>
              <div>
                <button className="button-save" type="submit" role="button">Kaydet</button>
              </div> 
            </div>
            <div className="checkbox-area">              
                <div>
                  <label htmlFor="priority"><FontAwesomeIcon icon={faStar} size="lg" /></label>
                  <input className="checkbox" type="checkbox" id="priority" name="priority" checked={formData.priority} onChange={handleInputChange}/>
                </div>   
            </div>
        </form>
        <TaskList 
        tasks={tasks} 
        removeTask={removeTask} 
        editTask={editTask} 
        doneTask={doneTask}/>
      </div>
    </div>
    </>
  );
}
