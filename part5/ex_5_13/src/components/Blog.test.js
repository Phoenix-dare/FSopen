import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('blog component renders title and author', () => {
  const blog = {
    title: 'Accessibility',
    author: 'JK Row'
  }
  const { container } =  render(<Blog blog={blog} />)
  const title = container.querySelector('.blog-title')
  const author = container.querySelector('.blog-author')

  expect(title).toHaveTextContent('Accessibility')
  expect(author).toHaveTextContent('by JK Row')


})