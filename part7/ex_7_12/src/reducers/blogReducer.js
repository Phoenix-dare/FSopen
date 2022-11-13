import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const initialState = []


const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    createBlog(state, action) {
      const content = action.payload
      return state.concat(content)
    },
    allBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    likeBlogs(state,action) {
        const updatedBlog = action.payload
        return state.map(item => item.id === updatedBlog.id ?
                            updatedBlog : item )
        
    },
    deleteBlog(state,action) {
        const id = action.payload
        return state.filter(item => item.id !== id)
    }

  }
})

export const { allBlogs, createBlog, likeBlogs ,deleteBlog } = blogSlice.actions

export const getBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(allBlogs(blogs))
  }
}
export const addNewblog = (blog) => {
  return async dispatch => {
    const newBlog= await blogService.createBlog(blog)
    dispatch(createBlog(newBlog))
  
  }
   }

export const blogLike = (blog,id) => {
    return async dispatch => {
        const updatedBlog = await blogService.updateBlog(blog,id)
        dispatch(likeBlogs(updatedBlog))
    }
}
export  const removeBlog =(id) => {
    return async dispatch => {
     await blogService.deleteBlog(id)
        dispatch(deleteBlog(id))
    }
}



export default blogSlice.reducer

