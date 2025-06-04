

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
    successUrl:string,
    failureUrl:string,
    Email:string,
})=>{
    const response = await axios.post(`${api}/api/AuthApi/sendEmailConfirmationMail`,data,{
         headers:{
            'Content-Type':'application/json',
        }
    },)
    return response
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

export const refreshAccessToken = async () => {
    try{
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem('token')

    if (!refreshToken) {
        throw new Error("No refresh token available.");
    }

    const data = {
        refreshToken,
        accessToken,
    }

    const response = await axios.post(`${api}/api/AuthApi/refreshToken`, data, {
        headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("acessTokenExpiresIn", response.data.accessTokenExpires);
        localStorage.setItem("refreshToken",response.data.refreshToken)
        return response.data.token;
    } else {
        throw new Error("Failed to refresh token.");
    }
}
catch(err){
    console.log(err)
}
};
