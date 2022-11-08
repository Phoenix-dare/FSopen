import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('blog component renders title and author', () => {
  const blog = {
    title: 'Accessibility',
    author: 'JK Row'
  }

  const { container } = render(<Blog blog={blog} />)
  const title = container.querySelector('.blog-title')
  const author = container.querySelector('.blog-author')

  expect(title).toHaveTextContent('Accessibility')
  expect(author).toHaveTextContent('by JK Row')


})

test('url and likes are displayed when show more button is clicked', async () => {
  const blog = {
    url : 'loremipsum.com',
    likes: 10
  }
  const { container } = render(<Blog blog={blog} />)
  const toggle = container.querySelector('.toggle')
  const user = userEvent.setup()
  await user.click(toggle)
  const  url = screen.getByText('link:-loremipsum.com')
  expect(url).toBeDefined()

  const  likes = screen.getByText('likes:10')
  expect(likes).toBeDefined()
})