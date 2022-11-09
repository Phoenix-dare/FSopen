import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createAnecdote= async (content) => {  
    const response = await axios.post(baseUrl, content)  
    return response.data
}
const updateAnecdote = async (content,id) => {
  const response = await axios.put(baseUrl+'/'+id,content)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll,createAnecdote,updateAnecdote }