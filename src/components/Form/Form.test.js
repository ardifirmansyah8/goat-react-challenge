import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Form from '.'
import userEvent from '@testing-library/user-event'

describe('Form', () => {
  const mockOnSuccess = jest.fn()

  test('renders correctly', () => {
    render(
      <Form onSuccess={mockOnSuccess} />,
    )
    expect(screen.getByPlaceholderText('Task name')).toBeInTheDocument()
    expect(screen.getByText('Add')).toBeInTheDocument()
  })

  test('user input new task then click add button', async () => {
    render(
      <Form onSuccess={mockOnSuccess} />,
    )

    const input = screen.getByTestId('task-input')
    const btn = screen.getByTestId('task-submit')

    await userEvent.type(input, 'New task')
    expect(btn).toBeEnabled()
    
    await userEvent.click(btn)
    expect(input).toHaveValue('')
  })
})