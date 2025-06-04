'use client'

import { AddComment, DeleteComment, EditComment, getComment, getCommentByCid } from '@/lib/api/blog'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { formatDistanceToNow } from "date-fns";

const Comment = ({ blogId }) => {
    interface data {
        userName: string;
        timestamp: string;
        commentText: string;
        userId: string;
        id: string;
    }

    const [commentText, setCommentText] = useState("");
    const [editCommentId, setEditCommentId] = useState<string | null>(null);
    const [editCommentText, setEditCommentText] = useState("");
    const [data, setData] = useState<data[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const Timestamp = new Date().toISOString()

    useEffect(() => {
        tokencatch();
        fetch();
    }, []);

    const fetch = async () => {
        try {
            const result = await getComment(blogId);
            if (result.status === 200) {
                setData(result.data);
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to fetch comments.");
        }
    };

    const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            
            const result = await AddComment({ blogId, commentText,Timestamp });
            if (result.status === 200) {
                fetch();
                toast.success("Comment added!");
                setCommentText("")
            }
        } catch (err) {
            console.log(err);
            toast.error("Please log in to comment.");
        }
    };

    const Edit = async (commentId: string) => {
        try {
            const result = await getCommentByCid(commentId);
            if (result.status === 200) {
                setEditCommentText(result.data.commentText);
                setEditCommentId(commentId);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to load comment for editing.");
        }
    };

    const handleEditComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await EditComment({ commentId: editCommentId, Timestamp, commentText: editCommentText, userId });
            if (result.status === 200) {
                fetch();
                setEditCommentId(null);
                toast.success("Comment updated!");
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to update comment.");
        }
    };

    const tokencatch = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const extractedUserId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            setUserId(extractedUserId);
        }
    };

    const handleDelete = async (commentId: string) => {
        try {
            const result = await DeleteComment(commentId);
            if (result.status === 200) {
                fetch();
                toast.success("Comment deleted!");
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete comment.");
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-y-2">
            {/* Add Comment Part */}
            <form onSubmit={addComment}>
                <div className="flex flex-col gap-y-2 w-full h-full">
                    <label htmlFor="comment">Add New Comment</label>
                    <textarea
                        className="w-full rounded-xl p-4 bg-transparent border-2 shadow-sm focus:ring-2 focus:ring-gray-700 transition-all ease-in-out duration-300"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button type="submit" className="px-2 py-2 rounded-lg bg-blue-700 flex items-center justify-center hover:bg-blue-800 shadow-sm transition-all ease-in-out duration-300">
                        Post Comment
                    </button>
                </div>
            </form>

            {/* Comment Body */}
            {data.map((item, i) => (
                <div key={i} className="flex flex-row justify-between w-full border-1 shadow-md rounded-2xl items-center px-10 bg-gray-600 text-neutral-300 py-4">
                    <div className="flex flex-col gap-y-2 w-full">
                        <div className="flex flex-row w-full">
                            <h1 className="flex flex-row gap-x-2 p-2 text-base font-semibold lg:w-[30%] w-full ">
                                @{item.userName}
                                <span className="lg:font-medium font-normal">{formatDistanceToNow(new Date(item.timestamp),{addSuffix:true})}</span>
                            </h1>

                            {item.userId === userId && editCommentId!== item.id && (
                                <div className="flex flex-row gap-x-2 items-center justify-center">
                                    <span className="hover:underline text-sm hover:text-blue-500 transition-all ease-in-out duration-300" onClick={() => Edit(item.id)}>
                                        Edit
                                    </span>
                                    <span className="hover:underline text-sm hover:text-blue-500 transition-all ease-in-out duration-300" onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </span>
                                </div>
                            )}
                        </div>

                        {editCommentId === item.id ? (
                            <form onSubmit={handleEditComment} className="p-1">
                                <input
                                    type="text"
                                    value={editCommentText}
                                    onChange={(e) => setEditCommentText(e.target.value)}
                                    className="border rounded-lg p-2 w-full text-neutral-900"
                                />
                                <div className="p-3 flex flex-row gap-x-2">
                                    <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">Save</button>
                                    <button type="button" onClick={() => setEditCommentId(null)} className="bg-gray-400 text-white p-2 rounded-lg">Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <p className="mb-2 border-2 rounded-xl lg:text-base text-sm border-gray-600 shadow-md px-2 py-2">{item.commentText}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comment;
