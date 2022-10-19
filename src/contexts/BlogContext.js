import React, { createContext, useState, useEffect } from 'react'
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastNotify.js";
import FormData from 'form-data'
import axios from 'axios';

export const BlogContext = createContext()

const url = "http://127.0.0.1:8000/"

const BlogContextProvider = (props) => {

    const [posts, setPosts] = useState([])
    const [postDetails, setPostDetails] = useState([])
    const [firstGetCategory, setFirstGetCategory] = useState([])
    const [postLikeState, setPostLikeState] = useState()
    const [getLikeState, setGetLikeState] = useState([])
    const [getUserState, setGetUserState] = useState([])


    useEffect(() => {
        const getPosts = async () => {
            const getKey = localStorage.getItem('currentUserToken')
            if (getKey) {
                try {
                    const res = await axios.get(`${url}blogs/posts/`, { headers: { 'Authorization': `Token ${getKey}` } })
                    setPosts(res.data)
                    // console.log(res.data);
                }
                catch (error) {
                    toastErrorNotify(error.message)
                }
            } else {
                return;
            }
        }
        getPosts()
    }, [])

    const getPostDetails = async (id) => {
        const getKey = localStorage.getItem('currentUserToken')
        if (getKey) {
            try {
                const res = await axios.get(`${url}blogs/posts/${id}/`, { headers: { 'Authorization': `Token ${getKey}` } })
                setPostDetails(res.data)
                // console.log(res.data);
            }
            catch (error) {
                toastErrorNotify(error.message)
            }
        } else {
            return;
        }
    }

    useEffect(() => {
        const getCategory = async () => {
            const getKey = localStorage.getItem('currentUserToken')
            if (getKey) {
                try {
                    const res = await axios.get(`${url}blogs/categories/`, { headers: { 'Authorization': `Token ${getKey}` } })
                    setFirstGetCategory(res.data)
                    // console.log(res.data);
                }
                catch (error) {
                    toastErrorNotify(error.message)
                }
            } else {
                return;
            }
        }
        getCategory()
    }, [])




    const postPost = async (newTitle, newContext, category, selectedImage, navigate) => {
        let data = new FormData();
        data.append('title', newTitle)
        data.append('content', newContext)
        data.append("category_id", category)
        data.append('image', selectedImage, selectedImage.name)

        const getKey = localStorage.getItem('currentUserToken')
        if (getKey) {
            try {
                const res = await axios.post(`${url}blogs/posts/`, data,
                    {
                        headers: {
                            'Authorization': `Token ${getKey}`,
                        }
                    });
                toastSuccessNotify("Succesfully created new post")
                console.log(res.data)
                navigate('/')
            }
            catch (error) {
                toastErrorNotify(error.message)
            }
        } else {
            return;
        }
    }

    useEffect(() => {
        const getLike = async () => {
            const getKey = localStorage.getItem('currentUserToken')
            if (getKey) {
                try {
                    const res = await axios.get(`${url}blogs/likes/`,
                        {
                            headers: {
                                'Authorization': `Token ${getKey}`,
                            }
                        });
                    setGetLikeState(res.data)
                    // console.log(res.data)
                }
                catch (error) {
                    toastErrorNotify(error.message)
                }
            } else {
                return;
            }
        }
        getLike()
    }, [])

    const postLike = async (id) => {
        const getKey = localStorage.getItem('currentUserToken')
        if (getKey) {
            try {
                const res = await axios.post(`${url}blogs/likes/`, {
                    post: id
                },
                    {
                        headers: {
                            'Authorization': `Token ${getKey}`,
                        }
                    });
                toastSuccessNotify("Succesfully liked")
                console.log(res.data)
            }
            catch (error) {
                toastErrorNotify(error.message)
            }
        } else {
            return;
        }
    }



    const postDetailComment = async (comment, id) => {
        let data = new FormData();
        data.append('post', id)
        data.append('content', comment)

        const getKey = localStorage.getItem('currentUserToken')
        if (getKey) {
            try {
                const res = await axios.post(`${url}blogs/comments/`, data,
                    {
                        headers: {
                            'Authorization': `Token ${getKey}`,
                        }
                    });
                toastSuccessNotify("Succesfully added your comment")

                console.log(res.data)
            }
            catch (error) {
                toastErrorNotify(error.message)
            }
        } else {
            return;
        }
    }

    useEffect(() => {
        const getUser = async () => {
            const getKey = localStorage.getItem('currentUserToken')
            if (getKey) {
                try {
                    const res = await axios.get(`${url}users/auth/user/`, { headers: { 'Authorization': `Token ${getKey}` } })
                    setGetUserState(res.data)

                }
                catch (error) {
                    toastErrorNotify(error.message)
                }
            } else {
                return;
            }
        }
        getUser()
    }, [])

    const deletePost = async (id) => {
        const getKey = localStorage.getItem('currentUserToken')
        if (getKey) {
            try {
                const res = await axios.delete(`${url}blogs/posts/${id}`, { headers: { 'Authorization': `Token ${getKey}` } })
                toastSuccessNotify("Succesfully deleted post")
                console.log(res.data);
            }
            catch (error) {
                toastErrorNotify(error.message)
            }
        } else {
            return;
        }
    }


    const postUser = async (profileUsername, profileFirstName, profileLastName) => {
        let data = new FormData();
        data.append('username', profileUsername)
        data.append('first_name', profileFirstName)
        data.append('last_name', profileLastName)

        const getKey = localStorage.getItem('currentUserToken')
        if (getKey) {
            try {
                const res = await axios.put(`${url}users/auth/user/`, data, { headers: { 'Authorization': `Token ${getKey}` } })
                toastSuccessNotify("Succesfully edited your profile")
                console.log(res.data);
            }
            catch (error) {
                toastErrorNotify(error.message)
            }
        } else {
            return;
        }
    }


    const postUpdate = async (detailImage, newDetailTitle, newDetailContext, newCategory, id) => {
        let data = new FormData();
        data.append('title', newDetailTitle)
        data.append('content', newDetailContext)
        data.append("category_id", newCategory)
        data.append('image', detailImage, detailImage.name)

        const getKey = localStorage.getItem('currentUserToken')
        if (getKey) {
            try {
                const res = await axios.put(`${url}blogs/posts/${id}/`, data,
                    {
                        headers: {
                            'Authorization': `Token ${getKey}`,
                        }
                    });
                toastSuccessNotify("Succesfully updated post")
                console.log(res)
            }
            catch (error) {
                toastErrorNotify(error.message)
            }
        } else {
            return;
        }
    }


    const viewPost = async (id) => {
        let data = new FormData();
        data.append('post', id)

        const getKey = localStorage.getItem('currentUserToken')
        if (getKey) {
            try {
                const res = await axios.post(`${url}blogs/postdets/`, data, { headers: { 'Authorization': `Token ${getKey}` } })
                console.log(res.data);
            }
            catch (error) {
                toastErrorNotify(error.message)
            }
        } else {
            return;
        }
    }

    return (
        <BlogContext.Provider value={{
            //Post View Post
            viewPost,
            //Delete post
            deletePost,
            //Put Post
            postUpdate,
            //Post user
            postUser,
            //Get User
            getUserState,
            // Post Comment
            postDetailComment,
            //Get Like
            setGetLikeState,
            getLikeState,
            //Post Like
            postLike,
            setPostLikeState,
            postLikeState,
            // Post Details
            getPostDetails,
            setPostDetails,
            postDetails,
            // Get Category
            firstGetCategory,
            setFirstGetCategory,
            // Homepage Post
            setPosts,
            posts,
            // Post post
            postPost,
        }}>
            {props.children}
        </BlogContext.Provider>
    )

}
export default BlogContextProvider