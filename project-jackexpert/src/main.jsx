import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  createBrowserRouter, 
  RouterProvider,
} from 'react-router-dom'

import App from './App.jsx'
import Tasks from './pages/Tasks.jsx'
import ErrorPage from './error-page.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import Home2 from './pages/Home2.jsx'

const router = createBrowserRouter([
  {
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path:'/',
        element: <Home/>
      },
      { 
        path: "my_tasks",
        element: <Tasks/>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
