import { createContext, useState } from 'react'
import {
  toastErrorNotify,
  toastSuccessNotify,
} from "../helpers/toastNotify.js";
import axios from "axios"
import React from "react";


export const AuthContext = createContext()

const url = "https://back-end-my-blog-app.herokuapp.com/"

const AuthContextProvider = (props) => {

  const [currentUser, setCurrentUser] = useState();
  const [myKey, setMyKey] = useState();

  const createUser = async (email, password, navigate, firstName, lastName, usernick) => {
    try {
      const res = await axios.post(`${url}users/register/`, {
        username: usernick,
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
        password1: password
      });
      console.log(res)
      if (res.data.token) {
        setMyKey(res.data.token)
        localStorage.setItem('currentUserToken', res.data.token)
        localStorage.setItem('currentUserUsername', res.data.username)
        localStorage.setItem('currentUserID', res.data.id)
        setCurrentUser(res.data.username)
        toastSuccessNotify("Registered in succesfully. Please login to continue")
        navigate("/")
      }
    }
    catch (error) {
      toastErrorNotify(error.message)
    }
  }

  const signIn = async (email, password, navigate) => {
    try {
      const res = await axios.post(`${url}users/auth/login/`, {
        email: email,
        password: password
      });
      const myToken = await res.data.key
      console.log(res.status)
      if (myToken) {
        setMyKey(myToken)
        localStorage.setItem('currentUserToken', res.data.key)
        setCurrentUser(res.data.user.username)
        localStorage.setItem('currentUserUsername', res.data.user.username)
        localStorage.setItem('currentUserID', res.data.user.id)
        console.log(res.data);
        toastSuccessNotify("Logged in succesfully")
        navigate("/")
      }
    }
    catch (error) {
      toastErrorNotify(error.message)
    }
  }


  const logOut = async (navigate) => {
    try {
      const res = await axios.post(`${url}users/auth/logout/`)
      if (res.status === 200) {
        toastSuccessNotify("Logged out succesfully")
        setCurrentUser(false)
        setMyKey(false)
        localStorage.removeItem('currentUserToken')
        localStorage.removeItem('currentUserUsername')
        localStorage.removeItem('currentUserID')
        navigate("/")
      }
      console.log(res)
    } catch (error) {
      toastErrorNotify(error.message)
    }
  };


  let value = {
    currentUser,
    createUser,
    signIn,
    logOut,
    myKey

  }
  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;
