
import { useState, useRef } from 'react';
import '../pages_css/Home.css'
import CardScroll from '../sub_elements/CardScroll';
import { CgMathMinus } from "react-icons/cg";

import axios from 'axios'


const Home = () => {
  const token = localStorage.getItem('jwtToken')
  const [showCards, setShowCards] = useState(false)

  const [userName, setUserName] = useState(false)
  const [userProjects, setUserProjects] = useState(false)
  const taskCategories = useRef([])

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
  })
  .catch(err => console.log(err.response.data.msg))

  const handleShowCards = () => {
    console.log('opa')
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
      <section className="initInfo">
        <h1>Olá, {userName ? userName : 'Jovem Garfanhoto'}!</h1>
        <p>{userName ? 'Tenha um ótimo dia.' : 'Faça login para ter acesso total ao Gerenciador de Tarefas.'}</p>
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
      <h1 className='main_tasks'>Seus projetos mais recentes</h1>
      {userProjects ? 
      <CardScroll userProjects={userProjects} showCards={showCards} handleShowCards={handleShowCards}/> :
      <CardScroll showCards={showCards} handleShowCards={handleShowCards}/>}

      {showCards ? 
      <button 
        type="button" 
        className='btn_showLess' 
        onClick={()=>{handleShowCards()}}
      >
          <CgMathMinus className='minusIcon'/>
      </button> : null}
    </>
  )
}

export default Home