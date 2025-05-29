import axios from 'axios'

const api = process.env.NEXT_PUBLIC_API_BASE


export const addblog = async(data:{
    title:string,
    body:string,
    summary:string,
    date:string,
  
})=>{
    const response = await axios.post(`${api}/api/BlogApi/createNewBlog`,data,{
        headers:{
            'Content-Type':'application/json',
            'token':`Bearer ${localStorage.getItem("token")}`
        }
    
    },)
    return response
}