import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment'

const commentSlice = createSlice({
    name: 'comment',
    initialState: [],
    reducers: {
        allComments(state, action) {
            const comments = action.payload
            return comments
        },
        createComment(state, action) {
            const newComment = action.payload
            return state.concat(newComment)
        },
    },
})
export const { allComments, createComment } = commentSlice.actions

export const getAll = (id) => {
    return async (dispatch) => {
        const comments = await commentService.getComments(id)
        dispatch(allComments(comments.comments))
    }
}

export const addComment = (comment, id) => {
    return async (dispatch) => {
        const newComment = await commentService.postComments(comment, id)
        dispatch(createComment(newComment))
    }
}
export default commentSlice.reducer
