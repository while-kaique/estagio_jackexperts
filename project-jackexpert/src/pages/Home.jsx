
import { useState } from 'react';
import '../components_css/Home.css'
import { useRef } from 'react';


const Home = () => {

  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const scrollLeftRef = useRef(0);
  const cardsWrapperRef = useRef(null)

  const handleMouseDown = (e) => {
    setIsDown(true)
    const startX = e.pageX - cardsWrapperRef.current.offsetLeft;
    setStartX(startX)
    scrollLeftRef.current = cardsWrapperRef.current.scrollLeft;
    console.log('passou DOWN')
  };

  const handleMouseLeave = () => {
    setIsDown(false)
  };

  const handleMouseUp = () => {
    setIsDown(false)
    
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - cardsWrapperRef.current.offsetLeft;
    console.log(x);
    const walk = (x - startX); // Ajusta a velocidade de arraste
    cardsWrapperRef.current.scrollLeft = scrollLeftRef.current - walk;
    console.log(`walk: ${walk}, scrollLeftRef.current: $ scrollLeft - walk: ${cardsWrapperRef.current.scrollLeft}`);
  };  

  return (
    <>
      <section className="initInfo">
        <h1>Olá, Kaique!</h1>
        <p>Tenha um ótimo dia.</p>
      </section>

      <section className="task_categ">
        <div className="my_tasks active"><h1>Salvas</h1></div>
        <div className="running_tasks"><h1>Em progresso</h1></div>
        <div className="complete_tasks"><h1>Concluídas</h1></div>
      </section>

      <section className="containerCards">

        <div 
          className='cards' 
          ref={cardsWrapperRef}
          onMouseDown={(e)=>{handleMouseDown(e)}} 
          onMouseLeave={()=>{handleMouseLeave()}} 
          onMouseUp={()=>{handleMouseUp()}} 
          onMouseMove={(e)=>{handleMouseMove(e)}}
        >
          <div className="degree"></div>
          <div className="card active" id="card1"></div>
          <div className="card" id="card2"></div>
          <div className="card" id="card3"></div>
          <div className="card" id="card4"></div>
          <div className="card" id="card5"></div>
        </div>
      </section>

      <button type="button">SETA</button>
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