import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {  
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (newBlog) => {
  const config = {   
     headers: { Authorization: token },  
    }
  const response = await axios.post(baseUrl,newBlog,config)
  return response.data
}


const updateBlog = async (updatedBlog,id) => {
  const config = {   
    headers: { Authorization: token },  
   }
  const url=baseUrl+'/'+id
  const response = await axios.put(url,updatedBlog,config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll,createBlog,updateBlog,setToken }