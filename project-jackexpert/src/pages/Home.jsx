
import { useState, useRef } from 'react';
import '../components_css/Home.css'
import CardScroll2 from '../sub_elements/CardScroll2';
import { CgMathPlus } from "react-icons/cg";


const Home = () => {

  const [showCards, setShowCards] = useState(false)
  const taskCategories = useRef([])

  const handleShowCards = () => {
    setShowCards(true)
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
        <h1>Olá, Kaique!</h1>
        <p>Tenha um ótimo dia.</p>
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
      <CardScroll2 showCards={showCards}/>

      <button type="button" className='btn_showMore' onClick={()=>{handleShowCards()}}><CgMathPlus className='arrowIcon'/></button>
      <h1>eae</h1>
      <h1>eae</h1>
      <h1>eae</h1>
      <h1>eae</h1>
    </>
  )
}

export default Home