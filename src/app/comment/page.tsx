'use client'

import { AddComment, DeleteComment, EditComment, getComment, getCommentByCid } from '@/lib/api/blog'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Comment = ({ blogId }) => {


    interface data {
        userName: string,
        timeStamp: string,
        commentText: string,
        userId: string,
        id: string,
        timestamp: string,
    }

    const [commentText, setCommentText] = useState("")
    const [commentId, setCommentId] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [editCommentText, setEditCommentText] = useState("")
    const Timestamp = new Date().toISOString() //first gives ISO format that is 2025-5-28T15:45:00 then with split('T') it creates new array ['2025-05-28','15:45:00']and [0] to take first element in the array
    const [data, setData] = useState<data[]>([])
    const [userId, setUserId] = useState<string | null>(null)



    useEffect(() => {
        tokencatch()
        fetch()
    }, [])

    const fetch = async () => {
        const result = await getComment(blogId)
        setData(result.data)
    }


    const addcomment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {

            const result = await AddComment({ blogId, Timestamp, commentText })
            if (result.status === 200) {
                fetch()
                toast.success('Comment Added')
            }
        }
        catch (err) {
            console.log(err)
            toast.error('please Login to System to Comment')
            
        }
    }
    
    


    const Edit = async (commentId) => {
        const result = await getCommentByCid(commentId)
        console.log(result)
        if (result.status === 200) {
            setEditCommentText(result.data.commentText)
            setCommentId(commentId)
            setIsEditing(true)
        }
    }
   

    const handleEditComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const id = blogId
            const commentText = editCommentText
            const result = await EditComment({ id, commentText, userId, commentId, Timestamp })
            console.log(result.status)
            if (result.status === 200) {
                fetch()
                setIsEditing(false)
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    const tokencatch = () => {
        const token = localStorage.getItem('token')
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]))
            const extractedUserId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
            setUserId(extractedUserId)
        }
    }

    const handleDelete = async (commentId: string) => {

        const result = await DeleteComment(commentId)
        if (result.status === 200) {
            fetch()
            toast.success('Comment Deleted')
        }
    }

    return (
        <div className='w-full h-full flex flex-col gap-y-2'>
            
           {/* {userId && (
            <> */}
               {/* Add Comment Part */}
            <form onSubmit={addcomment}>
                <div className='flex flex-col gap-y-2 w-full h-full'>

                    {/*Label for add comment  */}
                    <label htmlFor='comment'>
                        Add New Comment
                    </label>
                    <textarea
                        className='w-full rounded-xl p-4 h-[60] bg-transparent border-2 shadow-sm focus:ring-2 focus:ring-gray-700  transition-all ease-in-out duration-300'
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button
                        type='submit'
                        className='px-2 py-2 rounded-lg bg-blue-700 flex items-center justify-center hover:bg-blue-800 shadow-sm transition-all ease-in-out duration-300'
                    >
                        Post Comment
                    </button>
                </div>

            </form>
            {/* Comment Body */}
            {/* </>

           )}  */}
            
            {data && data.map((item, i) => (
                <div
                    key={i}
                    className='flex flex-row justify-between h-[40%] w-full border-1 shadow-md rounded-2xl items-center px-10 bg-gray-600 text-neutral-300'
                >
                    <div
                        className='flex flex-col gap-y-2 w-full '
                    >
                        <div
                            className='flex flex-row w-full'
                        >
                            <h1
                                className='flex flex-row gap-x-2 p-2 text-base font-semibold w-[20%] '
                            >
                                @{item.userName}
                                <span className='font-medium'>
                                    {item.timestamp.split('T')[0]}
                                </span>
                            </h1>

                            {item.userId === userId && isEditing === false && (

                                <div className='flex flex-row gap-x-2 items-center justify-center'>
                                    <span className='hover:underline text-sm hover:text-blue-500 transition-all ease-in-out duration-300' onClick={() => Edit(item.id)} >
                                        Edit
                                    </span>
                                    <span className='hover:underline text-sm hover:text-blue-500 transition-all ease-in-out duration-300' onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </span>
                                </div>
                            )}
                        </div>
                        {isEditing ? (
                            <form onSubmit={handleEditComment} className='p-1'>
                                <input
                                    type="text"
                                    value={editCommentText}
                                    onChange={(e) => setEditCommentText(e.target.value)}
                                    className="border rounded-lg p-2 w-full text-neutral-900"
                                />
                                <div className='p-3 flex flex-row gap-x-2'>
                                    <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">Save</button>
                                    <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-400 text-white p-2 rounded-lg">Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <p className='mb-2 border-2 rounded-xl border-gray-600 shadow-md  px-2 py-2'>
                                {item.commentText}
                            </p>
                        )}
                    </div>



                </div>
            ))

            }



        </div>
    )
}

export default Comment