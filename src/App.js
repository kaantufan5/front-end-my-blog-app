import "./App.css";
import { ToastContainer } from "react-toastify";
import AppRouter from "./app-router/AppRouter";
import AuthContextProvider from './contexts/AuthContext';
import BlogContextProvider from './contexts/BlogContext';


function App() {
  return (
    <div>
      <AuthContextProvider>
        <BlogContextProvider>
          <AppRouter />
          <ToastContainer />
        </BlogContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
