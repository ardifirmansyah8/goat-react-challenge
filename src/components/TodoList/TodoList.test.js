import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoList from './'
import useTasks from '../../hooks/useTasks'
import userEvent from '@testing-library/user-event'

jest.mock('../../hooks/useTasks')

const mockUseTasks = {
  tasks: [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
  ],
  getTasks: jest.fn(),
  addTask: jest.fn(),
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
}

describe('TodoList', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders the component', () => {
    useTasks.mockReturnValue(mockUseTasks)
    
    render(<TodoList />)
    expect(screen.getByText('TODO LIST')).toBeInTheDocument()
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
  })

  test('renders empty task', () => {
    useTasks.mockReturnValue({
      ...mockUseTasks,
      tasks: [],
    })
    
    render(<TodoList />)
    expect(screen.getByText('No tasks to show')).toBeInTheDocument()
  })

  test('handles adding a new task', async () => {
    useTasks.mockReturnValue(mockUseTasks)

    render(<TodoList />)
    const input = screen.getByTestId('task-input')
    const btn = screen.getByTestId('task-submit')

    await userEvent.type(input, 'New task')
    expect(btn).toBeEnabled()
    
    await userEvent.click(btn)
    expect(input).toHaveValue('')
  })

  test('user click checkbox', async () => {
    useTasks.mockReturnValue(mockUseTasks)
    render(<TodoList />)
    await userEvent.click(screen.getByTestId('checkbox-1'))

    waitFor(() => {
      expect(screen.getByTestId('span-1')).toHaveClass('done')
    })
  })
})