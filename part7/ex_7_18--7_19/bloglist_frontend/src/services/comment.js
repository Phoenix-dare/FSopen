import axios from 'axios'
const baseUrl = '/api/blogs'

const getComments = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}/comments`)
    return response.data
}
const postComments = async (comment, id) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
    return response.data
}

export default { getComments, postComments }
