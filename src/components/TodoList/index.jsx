import { useEffect } from 'react'

import Form from '../Form'
import TodoItem from '../TodoItem';
import useTasks from '../../hooks/useTasks'

import './index.css'

export default function TodoList() {
  const { tasks, getTasks, updateTask } = useTasks()

  const handleSuccess = () => {
    getTasks()
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="todolist">
      <h1>TODO LIST</h1>

      <Form onSuccess={() => handleSuccess()} />

      <div className="container">
          {tasks.length === 0 && <p>No tasks to show</p>}
          {tasks.length > 0 && tasks.map((task, index) => (
            <div key={task.id}>
              <TodoItem 
                task={task} 
                onSuccess={() => handleSuccess()}
              />
              {tasks.length - 1 !== index && <hr />}
            </div>
          ))}
      </div>
    </div>
  )
}