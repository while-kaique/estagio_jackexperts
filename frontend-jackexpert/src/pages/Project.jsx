
import { IoIosAdd } from 'react-icons/io'
import LowerHeader from '../components/LowerHeader'
import '../pages_css/Project.css'
import { useNavigate } from 'react-router-dom'
const Project = () => {

  const navigate = useNavigate()

  return (
    <>
        <div className="project-header">
          <LowerHeader/>
          <div id='date-button'>
            <h3 className="pj-date">Fevereiro, 2024</h3>
            <div className='project_addIcon' onClick={()=>{navigate('/add-task')}}><IoIosAdd className='project_icon'/>
                  <p>Adicionar Tarefa</p>
                </div>
          </div>
          <h1>Objetivo:</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio minus ab nostrum eius eum.</p>
        </div>

        <main>
            <h1>Tasks</h1>

            <div className="task">
                <div className="icon"></div>
            </div>
        </main>
    </>
  )
}

export default Project