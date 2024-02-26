import { useState } from 'react'

import useTasks from '../../hooks/useTasks'

import './index.css'

const Form = ({ onSuccess }) => {
  const { addTask } = useTasks()

  const [task, setTask] = useState('')

  const handleAddTask = (event) => {
    event.preventDefault()
    addTask(task)
    setTask('')
    onSuccess()
  }
  
  return (
    <div className="form-container">
      <form onSubmit={handleAddTask} aria-label="form">
        <input
          data-testid="task-input"
          placeholder="Task name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button 
          type="submit" 
          data-testid="task-submit"
          disabled={!task} 
          style={{ 
            cursor: !task ? 'not-allowed' : 'pointer',
            backgroundColor: !task ? 'gray' : '#2196F3'
          }}
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default Form