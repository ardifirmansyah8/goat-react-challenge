import { MdDeleteOutline } from "react-icons/md";

import useTasks from "../../hooks/useTasks";

import './index.css'

const TodoItem = ({ task, onSuccess }) => {
  const { updateTask, deleteTask } = useTasks()

  const handleCheckboxChange = (event) => {
    const isCompleted = event.target.checked
    updateTask(task.id, isCompleted)
    onSuccess()
  }

  const handleDelete = () => {
    deleteTask(task.id)
    onSuccess()
  }

  return (
    <div className='todo-item'>
      <label className="checkbox">
        <input
          type="checkbox"
          data-testid={`checkbox-${task.id}`}
          checked={task.completed}
          onChange={handleCheckboxChange}
        />
        <span className="checkmark"></span>
      </label>
      <span data-testid={`span-${task.id}`} className={task.completed ? 'done' : ''}>{task.title}</span>
      <button data-testid={`delete-${task.id}`} onClick={() => handleDelete()}><MdDeleteOutline /></button>
    </div>
  )
}

export default TodoItem