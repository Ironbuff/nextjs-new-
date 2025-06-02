
"use client"



import axios from 'axios'

const api = process.env.NEXT_PUBLIC_API_BASE


export const addblog = async(formdata: FormData)=>{
    const response = await axios.post(`${api}/api/BlogApi/createNewBlog`,formdata,{
        headers:{
            'Content-Type':'multipart/formdata',
            'Authorization':`Bearer ${localStorage.getItem("token")}`
        }
    
    },)
    return response
}

export const updateblog = async(data:{
    formdata:FormData
})=>{
    const response = await axios.put(`${api}/api/BlogApi/updateBlog`,data,{
        headers:{
            'Content-Type':'multipart/formdata',
            'Authorization':`Bearer ${localStorage.getItem('token')} `
        }
    },)
    return response
}

export const getblogs = async () => {
  console.log('hello')
    const response = await axios.get(`${api}/api/BlogApi/getBlogs`, {
    headers: {
      'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "true",
    }
  });
    console.log('hello',response)

  return response; // <- return the actual data
}

export const getblogByid = async(id:string)=>{
     const response = await axios.get(`${api}/api/BlogApi/getBlogById/${id}` ,{
       headers:{
         'Content-Type':'application/json',
         "ngrok-skip-browser-warning": "true",
       }
     }) 
     return response  
}


export const deleteblog = async(blogId:number)=>{
  const response = await axios.delete(`${api}/api/BlogApi/deleteBlog/${blogId}`,{
       headers:{
         'Content-Type':'application/json',
         'Authorization':`Bearer ${localStorage.getItem('token')} `,
       }
  })
  return response
}

