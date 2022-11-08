import { useState } from 'react';


const Blog = ({ blog,addLike,sortByLiked }) => {

  const blogStyle = {
    paddingLeft: 5,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10,
    background: "lightblue",
    borderRadius: 15
  }
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(prev => !prev);
  };

  const handleLikes = async () => {
    
    addLike(blog,blog.id)
  }

  return (

    <div style={blogStyle}>
            <div>
        <h2>{blog.title}</h2>
        <h3>by {blog.author}</h3>
        <button onClick={toggleVisibility}>Show {visible ? 'less' : 'more'}</button>
      </div>
      {visible &&
        <>
          <a href={blog.url}>link:-{blog.url}</a>
          <p>likes:{blog.likes}</p>
          <button onClick={handleLikes}>like👍🏻</button>


        </>



      }

    </div>
  )
}

export default Blog