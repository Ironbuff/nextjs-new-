
import axios from 'axios'

const api = process.env.NEXT_PUBLIC_API_BASE


export const registerUser = async(data:{
    username:string,
    email:string,
    password:string,
})=>{
    const response = await axios.post(`${api}/api/AuthApi/register`,data,{
        headers:{
            'Content-Type':'application/json',
        }
    },)
    return response
}

export const loginUser = async(data:{
    email:string,
    password:string,
})=>{
    const response = await axios.post(`${api}/api/AuthApi/login`,data,{
        headers:{
            'Content-Type':'application/json',
        }
    },)
    return response
}

export const Emailverification = async(data:{
    sucessUrl:string,
    failureUrl:string,
    email:string,
})=>{
    const response = await axios.post(`${api}/api/AuthApi/sendEmailConfirmationMail`,data,{
         headers:{
            'Content-Type':'application/json',
        }
    },)
    return response.data
}


export const forgetpassword = async(data:{
    email:string,
    redirectLink:string,
})=>{
    const response = await axios.post(`${api}/api/AuthApi/SendPasswordResetMail`,data,{
        headers:{
            'Content-Type':'application/json',
        }
    })
    return response
}
  

export const changePassword = async(data:{
    newpassword:string,
    token:string,
    userId:string,
})=>{
    const response = await axios.post(`${api}/api/AuthApi/confirmPassword`,data,{
        headers:{
            'Content-Type':'application/json',
        }
    })
    return response
}
