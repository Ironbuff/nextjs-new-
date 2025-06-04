

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
    
},blogId:string)=>{
    const response = await axios.put(`${api}/api/BlogApi/updateBlog/${blogId}`,data?.formdata,{
        headers:{
            'Content-Type':'multipart/formdata',
            'Authorization':`Bearer ${localStorage.getItem('token')} `
        }
    },)
    return response
}

export const getblogs = async () => {
    const response = await axios.get(`${api}/api/BlogApi/getBlogs`, {
    headers: {
      'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "true",
    }
  });
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

export const AddComment = async(data:{
  blogId:string,
  Timestamp:string,
  commentText:string
})=>{
  const response = await axios.post(`${api}/api/CommentApi/createComment`,data,{
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem('token')}`,
    }
  })
  return response
}

export const getComment = async(blogId:string)=>{
  const response = await axios.get(`${api}/api/CommentApi/getCommentsByBlogId/${blogId}`,{
     headers:{
         'Content-Type':'application/json',
         "ngrok-skip-browser-warning": "true",
       }
  })

  return response
}

export const DeleteComment = async(commentId:string)=>{
  const response = await axios.delete(`${api}/api/CommentApi/deleteComment/${commentId}`,{
     headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem('token')}`,
      
    }
  })
  return response
}

export const getCommentByCid = async(commentId:string)=>{
  const response = await axios.get(`${api}/api/CommentApi/getCommentsByCommentId/${commentId}`,{
    headers:{
      'Content-Type':'application/json',
      "ngrok-skip-browser-warning":"true",
    }
  })
  return response
}

export const EditComment = async(data:{
  id:string,
  userId:string|null,
  commentText:string,
  commentId:string,
  TimeStamp:string,
})=>{
  const response = await axios.put(`${api}/api/CommentApi/updateComment/${data.commentId}`,data,{
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem('token')}`
    }
  })
  return response
}

export const reactOnBlog = async(data:{blogId:string,reaction:1|-1,userId:string})=>{
  const response = await axios.post(`${api}/api/ReactionApi/reactOnBlog`,data,{
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem('token')}`
    }
  })
  return response
}

export const getReactionCount = async(data:{blogId:string,reaction:1|-1})=>{
  const response = await axios.get(`${api}/api/ReactionApi/getReactionCountByBlogId/${data.blogId}/${data.reaction}`,{
    headers:
    {
      'Content-Type':'application/json',
      "ngrok-skip-browser-warning":"true",
    }
  })
  return response
}


