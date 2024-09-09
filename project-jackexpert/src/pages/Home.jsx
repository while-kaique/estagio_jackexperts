
import { useState, useRef } from 'react';
import '../pages_css/Home.css'
import CardScroll from '../sub_elements/CardScroll';
import { CgMathMinus } from "react-icons/cg";


const Home = () => {

  const [showCards, setShowCards] = useState(false)
  const taskCategories = useRef([])

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
      <h1 className='main_tasks'>Seus projetos favoritos</h1>
      <CardScroll showCards={showCards} handleShowCards={handleShowCards}/>

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