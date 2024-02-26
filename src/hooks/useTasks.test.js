import { renderHook, act } from '@testing-library/react-hooks'
import useTasks, { sortTasks } from './useTasks'
import apiCall from '../api'

jest.mock('../api')

describe('useTasks', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('sorts tasks correctly 1', () => {
    const unsortedTasks = [
      { id: 1, title: 'Task 1', completed: true },
      { id: 2, title: 'Task 2', completed: false },
    ]
    const sortedTasks = [
      { id: 2, title: 'Task 2', completed: false },
      { id: 1, title: 'Task 1', completed: true },
    ]
    expect(sortTasks(unsortedTasks)).toEqual(sortedTasks)
  })

  it('sorts tasks correctly 2', () => {
    const unsortedTasks = [
      { id: 1, title: 'Task 1', completed: true },
      { id: 2, title: 'Task 2', completed: true },
    ]
    const sortedTasks = [
        { id: 1, title: 'Task 1', completed: true },
        { id: 2, title: 'Task 2', completed: true },
    ]
    expect(sortTasks(unsortedTasks)).toEqual(sortedTasks)
  })

  it('gets tasks', async () => {
    const tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ]
    apiCall.mockResolvedValue(tasks)

    const { result } = renderHook(() => useTasks())

    await act(async () => {
      await result.current.getTasks()
    })

    expect(result.current.tasks).toEqual(sortTasks(tasks))
    expect(apiCall).toHaveBeenCalledWith('/tasks', 'GET')
  })

  it('gets tasks error', async () => {
    apiCall.mockImplementation(() => {
        throw new Error();
      });

    const { result } = renderHook(() => useTasks())

    await act(async () => {
      await result.current.getTasks()
    })

    expect(apiCall).rejects.toMatch('error');

  })

  it('add a task', async () => {
    const newTaskTitle = 'New Task'
    const { result } = renderHook(() => useTasks())

    apiCall.mockResolvedValueOnce([])

    await act(async () => {
      await result.current.addTask(newTaskTitle)
    })

    expect(apiCall).toHaveBeenCalledWith('/tasks', 'POST', {
      title: newTaskTitle,
      completed: false,
    })
    expect(apiCall).toHaveBeenCalledTimes(1)
  })

  it('deletes a task', async () => {
    const taskId = 1
    const { result } = renderHook(() => useTasks())

    apiCall.mockResolvedValueOnce([])

    await act(async () => {
      await result.current.deleteTask(taskId)
    })

    expect(apiCall).toHaveBeenCalledWith(`/tasks/${taskId}`, 'DELETE')
    expect(apiCall).toHaveBeenCalledTimes(2)
  })

  it('updates a task', async () => {
    const taskId = 1
    const completed = true
    const { result } = renderHook(() => useTasks())

    apiCall.mockResolvedValueOnce([])

    await act(async () => {
      await result.current.updateTask(taskId, completed)
    })

    expect(apiCall).toHaveBeenCalledWith(`/tasks/${taskId}`, 'PATCH', {
      completed,
    })
    expect(apiCall).toHaveBeenCalledTimes(2)
  })
})