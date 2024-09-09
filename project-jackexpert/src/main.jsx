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
    path: "projects/:projectId/tasks/:taskId",
    element: <Task/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
