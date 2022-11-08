import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, addLike, removeBlog, user }) => {

  const blogStyle = {
    paddingLeft: 5,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10,
    background: 'lightgreen',
    borderRadius: 15
  }
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(prev => !prev)
  }

  const handleLikes = async () => {

    addLike(blog, blog.id)
  }

  const handleDelete = () => {
    removeBlog(blog.id)
  }

  return (

    <div style={blogStyle} >
      <div>
        <h2 className='blog-title'>{blog.title}</h2>
        <h3 className='blog-author'> by {blog.author}</h3>
        <button onClick={toggleVisibility} className='toggle'> Show {visible ? 'less' : 'more'}</button>
      </div>
      {visible &&
        <>
          <a href={blog.url}>link:-{blog.url}</a>
          <p>likes:{blog.likes}</p>
          <button onClick={handleLikes}>like👍🏻</button>
          {user && blog.user.id === user.id ? <button onClick={handleDelete}>delete</button> : null}


        </>

      }

    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired

}

export default Blog