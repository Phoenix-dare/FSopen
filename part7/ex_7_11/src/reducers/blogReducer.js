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
    }
  }
})

export const { allBlogs,createBlog } = blogSlice.actions

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





export default blogSlice.reducer

