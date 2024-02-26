import { useState } from 'react'

import apiCall from '../api'

const endpoint = `/tasks`;

// Sort tasks so completed tasks are at the bottom
export const sortTasks = (tasks) => {
  return tasks.sort((a, b) => {
    if (a.completed === b.completed) {
      return 0
    }
    if (a.completed) {
      return 1
    }
    return -1
  })
}

const useTasks = () => {
  const [tasks, setTasks] = useState([])

  // Fetch tasks from the API
  const getTasks = async () => {
    try {
      const tasks = await apiCall(endpoint, 'GET')
      setTasks(sortTasks(tasks))
    } catch (error) {
      console.error('Error on getting tasks: ', error)
    }
  }

  // Add a new task to the API
  const addTask = async (title) => {
    const data = { title, completed: false }

    try {
      await apiCall(endpoint, 'POST', data)
    } catch (error) {
      console.error('Error on adding task: ', error)
    }
  }

  // Delete a task from the API
  const deleteTask = async (id) => {
    try {
      await apiCall(`${endpoint}/${id}`, 'DELETE')
      await getTasks()
    } catch (error) {
      console.error('Error on deleting task:', error)
    }
  }

  //  Update a task in the API
  const updateTask = async (id, completed) => {
    const data = { completed }

    try {
      await apiCall(`${endpoint}/${id}`, 'PATCH', data)
      await getTasks()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  return { tasks, getTasks, addTask, deleteTask, updateTask }
}

export default useTasks