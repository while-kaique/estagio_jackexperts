import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  createBrowserRouter, 
  RouterProvider,
} from 'react-router-dom'

import App from './App.jsx'
import Task from './pages/Task.jsx'
import ErrorPage from './error-page.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import LowerHeader from './components/LowerHeader.jsx'
import EspecialElement from './EspecialElement.jsx'
import CreateProject from './pages/CreateProject.jsx'
import Project from './pages/pROJECT.JSX'

const router = createBrowserRouter([
  {
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path:'/',
        element: <Home/>
      }
    ]
  },
  {
    element: <LowerHeader/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: 'login',
        element: <Login/>

      },
      {
        path: 'register',
        element: <Register/>

      },
      {
        path: 'createProject',
        element: <CreateProject/>
      }
    ]
  },
  {
    element: <EspecialElement/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: 'task',
        element: <Task/>
      },
      {
        path: 'projects/:id',
        element: <Project/>
      },
      
    ]
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
