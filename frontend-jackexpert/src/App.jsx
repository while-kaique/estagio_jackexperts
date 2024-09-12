
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import AuthWrappler from './AuthWrappler.jsx'

function App() {

  return (
    <>
      <AuthWrappler>
        <Header/>
        <Outlet/>
      </AuthWrappler>
    </>
  ) 
}

export default App
