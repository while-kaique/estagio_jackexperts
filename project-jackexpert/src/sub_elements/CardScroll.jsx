import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import './CardScroll.css'


const CardScroll = ({handleShowCards, showCards}) => {

  useEffect(()=>{
    if (!showCards){
      console.log('OI')
      setCanClickNext([false, true, false, false, false])
      setCanClickPrev([false, false, false, false, false])
      cards.current.forEach(card => {
        switch (Number(card.id)) {
          case 0:
            card.classList.add('active')
            break;
          case 1:
            card.classList.add('next')
            break;
          default:
              console.log('deu rim')
            break;
        }
      });
    } else {
      cards.current.forEach(card => {
        card.classList.remove('active')
        card.classList.remove('next')
        card.classList.remove('prev')
      })
    }
  },[showCards])

  const cards = useRef([])
  const cardsWrappler = useRef(null)
  const [canClickNext, setCanClickNext] = useState([false, true, false, false, false])
  const [canClickPrev, setCanClickPrev] = useState([false, false, false, false, false])

  const handleCardNext = (nextCard) => {
    const index = Number(nextCard.target.id);
    
    cards.current.forEach(card => {
      card.classList.remove('active')
      card.classList.remove('next')
      card.classList.remove('prev')
    });
    
    const newCanClickPrev = canClickPrev.map((val, i) => i === index - 1);
    
    const newCanClickNext = canClickNext.map((val, i) => i === index + 1);
    
    setCanClickPrev(newCanClickPrev);
    setCanClickNext(newCanClickNext);

    nextCard.target.classList.add('active');
    if (cards.current[index + 1]) {
      cards.current[index + 1].classList.add('next');
    }
    if (cards.current[index - 1]) {
      cards.current[index - 1].classList.add('prev');
    }

    /// PROXIMA ETAPA: MUDAR LEFT
    console.log(cardsWrappler.current.scrollLeft)
    cardsWrappler.current.scrollLeft += 300
  }

  const handleCardPrev = (prevCard) => {
    const index = Number(prevCard.target.id);

    
    cards.current.forEach(card => {
      card.classList.remove('active')
      card.classList.remove('next')
      card.classList.remove('prev')
    });

    const newCanClickPrev = canClickPrev.map((val, i) => i === index - 1);
    
    const newCanClickNext = canClickNext.map((val, i) => i === index + 1);
    
    setCanClickPrev(newCanClickPrev);
    setCanClickNext(newCanClickNext);

    prevCard.target.classList.add('active');
    if (cards.current[index + 1]) {
      cards.current[index + 1].classList.add('next');
    }
    if (cards.current[index - 1]) {
      cards.current[index - 1].classList.add('prev');
    }

    /// PROXIMA ETAPA: MUDAR LEFT
    console.log(cardsWrappler.current.scrollLeft)
    cardsWrappler.current.scrollLeft -= 300
  }

  return (
    <section className="containerPjCards">
      <div className={`pj_cards ${showCards ? 'show' : ''}`} ref={cardsWrappler}>
        <div className="card first active" 
          id={0} 
          ref={(el) => cards.current[0] = el}
          onClick={canClickNext[0] ? (e)=>{handleCardNext(e)} : canClickPrev[0] ? (e)=>{handleCardPrev(e)} : null}
        ></div>

        <div className="card next" 
          id={1} 
          ref={(el) => cards.current[1] = el}
          onClick={canClickNext[1] ? (e)=>{handleCardNext(e)} : canClickPrev[1] ? (e)=>{handleCardPrev(e)} : null}
        ></div>

        <div className="card" 
          id={2} 
          ref={(el) => cards.current[2] = el}
          onClick={canClickNext[2] ? (e)=>{handleCardNext(e)} : canClickPrev[2] ? (e)=>{handleCardPrev(e)} : null}
        ></div>

        <div className="card" 
          id={3} 
          ref={(el) => cards.current[3] = el}
          onClick={canClickNext[3] ? (e)=>{handleCardNext(e)} : canClickPrev[3] ? (e)=>{handleCardPrev(e)} : null}
        ></div>

        <div className="card" 
          id={4} 
          ref={(el) => cards.current[4] = el}
          onClick={canClickNext[4] ? (e)=>{handleCardNext(e)} : canClickPrev[4] ? (e)=>{handleCardPrev(e)} : null}
        ></div>
        {!showCards ? <div className="card empty" onClick={()=>{handleShowCards()}}></div> : null}

      </div>
      
    </section>
  )
}

CardScroll.propTypes = {
    showCards: PropTypes.bool,
    handleShowCards: PropTypes.func,
}

export default CardScroll