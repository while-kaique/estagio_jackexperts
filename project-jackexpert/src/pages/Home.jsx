
import { useState, useRef } from 'react';
import '../components_css/Home.css'
import CardScroll from '../sub_elements/CardScroll';


const Home = () => {

  const [showCards, setShowCards] = useState(false)
  const taskCategories = useRef([])

  const handleShowCards = () => {
    setShowCards(true)
  }
  const handleTaskCategory = (e) => {
    taskCategories.current.forEach(div => {
      console.log(div.classList + ' ANTES DO REMOVE')
      div.classList.remove('active')
      console.log(div.classList + ' DEPOIS DO REMOVE')
    });
    console.log(e.target.classList + ' ANTES DO add')
    e.target.classList.add('active')
    console.log(e.target.classList + ' DEPOIS DO add')
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
      <CardScroll showCards={showCards}/>

      <button type="button" onClick={()=>{handleShowCards()}}>SETA REAL</button>
      <button type="button">SETA</button>
      <button type="button">SETA</button>
      <button type="button">SETA</button>
      <button type="button">SETA</button>
      <h1>eae</h1>
      <h1>eae</h1>
      <h1>eae</h1>
      <h1>eae</h1>
    </>
  )
}

export default Home