
import { IoIosAdd } from 'react-icons/io'
import LowerHeader from '../components/LowerHeader'
import '../pages_css/Project.css'
import { useNavigate } from 'react-router-dom'
import ProjectCards from '../sub_elements/ProjectCards'
import axios from 'axios'
import { useState } from 'react'
const Project = () => {

  const navigate = useNavigate()

  const [userProjects, setUserProjects] = useState([])
  const [isAuth, setIsAuth] = useState(false)

  
  const token = localStorage.getItem('jwtToken')

  axios.get('http://localhost:8800/project', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    withCredentials: true // Inclui cookies na requisição
  })
  .then(res => res.data.projects)
  .then((projects) => {
    const userProjects = projects
    setUserProjects(userProjects)
  })
  .catch(err => {
    setIsAuth(err.response.data.token)
    console.log(err.response.data.msg)
  })

  return (
    <>
        <div className="project-header">
          <LowerHeader/>

          <div id='date-button'>
            <h3 className="pj-title">Fevereiro, 2024</h3>
            <div className='project_addIcon' onClick={()=>{navigate('/add-task')}}><IoIosAdd className='project_icon'/>
                  <p>Adicionar Tarefa</p>
                </div>
          </div>

          <div id="obj-categ">
            <h1>Objetivo:</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio minus ab nostrum eius eum.</p>
          </div>
        </div>

        <main>
            <div className="tasks">
              <h1>Tasks</h1>
                <div className="icon"></div>
            </div>
            <ProjectCards projects={userProjects}/>
        </main>
    </>
  )
}

export default Project