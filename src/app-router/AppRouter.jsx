import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import NewBlog from "../pages/NewBlog";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import PostDetails from "../pages/PostDetails";

const AppRouter = () => {


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route
          path="/"
          element={
            <StyledEngineProvider injectFirst>
            <CssVarsProvider>
              <HomePage />
            </CssVarsProvider>
            </StyledEngineProvider>
          }/>
          <Route 
          path="/details/:id" 
          element={
            <StyledEngineProvider injectFirst>
            <CssVarsProvider>
              <PostDetails />
              </CssVarsProvider>
            </StyledEngineProvider>
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/newblog" element={<NewBlog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details/:id" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
