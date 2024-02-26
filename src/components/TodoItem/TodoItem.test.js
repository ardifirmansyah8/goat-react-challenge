import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import TodoItem from '.'
import userEvent from '@testing-library/user-event'

const task = { id: 1, title: 'Task 1', completed: false }

describe('TodoItem', () => {
  const mockOnSuccess = jest.fn()

  test('renders tasks correctly', () => {
    render(
      <TodoItem task={task} onSuccess={mockOnSuccess} />,
    )
    expect(screen.getByText(task.title)).toBeInTheDocument()
  })

  test('user click checkbox', async () => {
    render(
      <TodoItem task={task} onSuccess={mockOnSuccess} />,
    )
    await userEvent.click(screen.getByTestId('checkbox-1'))

    waitFor(() => {
      expect(screen.getByTestId('span-1')).toHaveClass('done')
    })
  })

  test('user click delete button', async () => {
    render(
      <TodoItem task={task} onSuccess={mockOnSuccess} />,
    )
    await userEvent.click(screen.getByTestId('delete-1'))
    waitFor(() => expect(mockOnSuccess).toHaveBeenCalledTimes(1))
  })
})