import { useRef, useState } from "react";
import PropTypes from 'prop-types';
import './CardScroll2.css'


const CardScroll2 = () => {

  const cards = useRef([])
  const cardsWrappler = useRef(null)
  const [canClick, setCanClick] = useState([false, true, false, false, false])

  const handleCard = (nextCard) => {
    const index = Number(nextCard.target.id);
    
    cards.current.forEach(card => {
      card.classList.remove('active')
      card.classList.remove('next')
    });
    
    const newCanClick = canClick.map((val, i) => i === index + 1);
    
    setCanClick(newCanClick);

    nextCard.target.classList.add('active');
    if (cards.current[index + 1]) {
      cards.current[index + 1].classList.add('next');
    }

    /// PROXIMA ETAPA: MUDAR LEFT
    console.log(cardsWrappler.current.scrollLeft)
    cardsWrappler.current.scrollLeft += 300
  }

  return (
    <section className="containerCards">
      <div className='cards' ref={cardsWrappler}>
        <div className="card first active" id={0} 
        ref={(el) => cards.current[0] = el}
        onClick={canClick[0] ? (e)=>{handleCard(e)} : null}
        >{canClick[0] ? <h1>Olá</h1> : null}</div>
        <div className="card next" id={1} 
        ref={(el) => cards.current[1] = el}
        onClick={canClick[1] ? (e)=>{handleCard(e)} : null}
        >{canClick[1] ? <h1>Olá</h1> : null}</div>
        <div className="card" id={2}
        ref={(el) => cards.current[2] = el}
        onClick={canClick[2] ? (e)=>{handleCard(e)} : null}
        >{canClick[2] ? <h1>Olá</h1> : null}</div>
        <div className="card" id={3}
        ref={(el) => cards.current[3] = el}
        onClick={canClick[3] ? (e)=>{handleCard(e)} : null}
        >{canClick[3] ? <h1>Olá</h1> : null}</div>
        <div className="card" id={4}
        ref={(el) => cards.current[4] = el}
        onClick={canClick[4] ? (e)=>{handleCard(e)} : null}
        >{canClick[4] ? <h1>Olá</h1> : null}</div>
      </div>
    </section>
  )
}

CardScroll2.propTypes = {
    showCards: PropTypes.bool,
}

export default CardScroll2