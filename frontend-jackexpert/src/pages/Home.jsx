
import { useState, useRef } from 'react';
import axios from 'axios'

import '../pages_css/Home.css'
import CardScroll from '../sub_elements/CardScroll';

import { CgMathMinus } from "react-icons/cg";
import { IoIosAdd } from "react-icons/io";

import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate()

  const token = localStorage.getItem('jwtToken')
  
  const [showCards, setShowCards] = useState(false)

  const [userName, setUserName] = useState(false)
  const [userProjects, setUserProjects] = useState([])
  const [fiveProjects, setFiveProjects] = useState([]);

  const [isLoading, setIsLoading] = useState(true)
  const taskCategories = useRef([])
  
  const get5Projects = (projects) => {
    for (let index = 0; index < 5; index++) {
      console.log('index: ', index)
      if (projects[index]) {
        setFiveProjects((prev)=>{
          const newProject = prev
          newProject.push(projects[index])
          return newProject
        })
      }
      setFiveProjects((prev)=>{
        const newProject = prev
        newProject.push(false)
        return newProject
      })
    }
  }


  axios.get('http://localhost:8800/home', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    withCredentials: true // Inclui cookies na requisição
  })
  .then(res => res.data.data)
  .then((data) => {
    if (data.name == userName){ return }
    setUserName(data.name)
    setUserProjects(data.projects)
    if (data.projects) {get5Projects(data.projects)}
    setTimeout(() => {
      setIsLoading(false)
    }, 50);
  })
  .catch(err => console.log(err.response.data.msg))

  const handleShowCards = () => {
    setShowCards(!showCards)
  }
  const handleTaskCategory = (e) => {
    taskCategories.current.forEach(div => {
      div.classList.remove('active')
    });
    e.target.classList.add('active')
  }

  return (
    <>
      {isLoading ? 
      
      <div>
        <section className="initInfo">
          <h1>Olá, Jovem Garfanhoto!</h1>
          <p>Faça login para ter acesso total ao Gerenciador de Tarefas.</p>
          </section>
        <Loading/>
      </div>
      :
      <div>
      
        <section className="initInfo">
          <h1>Olá, {userName ? userName : 'Jovem Garfanhoto'}!</h1>
          <p>{userName ? 'Tenha um ótimo dia' : 'Faça login para ter acesso total ao Gerenciador de Tarefas'}.</p>
        </section>
        <section className="task_categ">
          <div 
            className="my_tasks active" 
            onClick={(e)=>{handleTaskCategory(e)}}
            ref={(el) => taskCategories.current[0] = el}
          >
            Salvas
          </div>
          <div 
            className="running_tasks" 
            onClick={(e)=>{handleTaskCategory(e)}}
            ref={(el) => taskCategories.current[1] = el}
          >
            Em progresso
          </div>
          <div 
            className="complete_tasks" 
            onClick={(e)=>{handleTaskCategory(e)}}
            ref={(el) => taskCategories.current[2] = el}
          >
            Concluídas
          </div>
        </section>

        {/* CARD SCROLL */}
        {/* CARD SCROLL */}
        <h1 className='main_title'>Seus projetos</h1>
        {userProjects[0] ? 
          <CardScroll fiveProjects={fiveProjects} userProjects={userProjects} showCards={showCards} setShowCards={setShowCards} handleShowCards={handleShowCards}/>
           :
           <div className='no_projects'>
             <h2>Você não possui nenhum projeto ativo</h2>
             <div className='home_addIcon' onClick={()=>{navigate('/createProject')}}><IoIosAdd className='home_icon'/><p>Adicionar Projeto</p></div>
           </div>
        }

        {showCards ? 
          <button 
            type="button" 
            className='btn_showLess' 
            onClick={()=>{handleShowCards()}}
          >
              <CgMathMinus className='minusIcon'/>
          </button> 
          : null
        }
        
        <h1 className='main_title'>Seus cards</h1>
        {userProjects[0] ? 
          <CardScroll fiveProject={fiveProjects} userProjects={userProjects} showCards={showCards} handleShowCards={handleShowCards}/>
           :
           <div className='no_projects'>
             <h2>Você não possui nenhuma tarefa ativa</h2>
             <div className='home_addIcon' onClick={()=>{navigate('/createTask')}}><IoIosAdd className='home_icon'/><p>Adicionar tarefa</p></div>
           </div>
        }
      </div>
      }
    </>
  )
}

export default Home