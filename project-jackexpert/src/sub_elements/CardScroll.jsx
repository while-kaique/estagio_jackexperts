import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import './CardScroll.css'


const CardScroll = ({handleShowCards, showCards}) => {

  const cards = useRef([])
  const cardsWrappler = useRef(null)
  const [canClickNext, setCanClickNext] = useState([false, true, false, false, false])
  const [canClickPrev, setCanClickPrev] = useState([false, false, false, false, false])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(()=>{
    if (!showCards){
      setCanClickNext([false, true, false, false, false])
      setCanClickPrev([false, false, false, false, false])
      setCurrentIndex(0)
      cards.current.forEach(card => {
        switch (Number(card.id)) {
          case 0:
            card.classList.add('active')
            break;
          case 1:
            card.classList.add('next')
            break;
          default:
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

  const handleCardChange = (index) => {
    setCurrentIndex(index)
    
    cards.current.forEach(card => {
      card.classList.remove('active')
      card.classList.remove('next')
      card.classList.remove('prev')
    });
    
    const newCanClickPrev = canClickPrev.map((val, i) => i === index - 1);
    
    const newCanClickNext = canClickNext.map((val, i) => i === index + 1);
    
    setCanClickPrev(newCanClickPrev);
    setCanClickNext(newCanClickNext);

    cards.current[index]
    if (cards.current[index + 1]) {
      cards.current[index + 1].classList.add('next');
    }
    if (cards.current[index - 1]) {
      cards.current[index - 1].classList.add('prev');
    }

    /// PROXIMA ETAPA: AVANÇAR SCROLL
    cardsWrappler.current.scrollLeft = index * 300
  }

  return (
    <section className="containerPjCards">
      <div className={`pj_cards ${showCards ? 'show' : ''}`} ref={cardsWrappler}>
        <div className="card first active" 
          id={0} 
          ref={(el) => cards.current[0] = el}
          onClick={()=> handleCardChange(0)}
        ></div>

        <div className="card next" 
          id={1} 
          ref={(el) => cards.current[1] = el}
          onClick={()=> handleCardChange(1)}
        ></div>

        <div className="card" 
          id={2} 
          ref={(el) => cards.current[2] = el}
          onClick={()=> handleCardChange(2)}
        ></div>

        <div className="card" 
          id={3} 
          ref={(el) => cards.current[3] = el}
          onClick={()=> handleCardChange(3)}
        ></div>

        <div className="card" 
          id={4} 
          ref={(el) => cards.current[4] = el}
          onClick={()=> handleCardChange(4)}
        ></div>
        {!showCards ? <div className="card empty" onClick={()=>{handleShowCards()}}></div> : null}

      </div>

      {!showCards ? 
      <div className="navigation-dots">
        <div
          className={`dot ${currentIndex === 0 ? 'active' : ''}`}
          onClick={() => handleCardChange(0)}
        ></div>
        <div
          className={`dot ${currentIndex === 1 ? 'active' : ''}`}
          onClick={() => handleCardChange(1)}
        ></div>
        <div
          className={`dot ${currentIndex === 2 ? 'active' : ''}`}
          onClick={() => handleCardChange(2)}
        ></div>
        <div
          className={`dot ${currentIndex === 3 ? 'active' : ''}`}
          onClick={() => handleCardChange(3)}
        ></div>
        <div
          className={`dot ${currentIndex === 4 ? 'active' : ''}`}
          onClick={() => handleCardChange(4)}
        ></div>
      </div> : null}
    </section>
  )
}

CardScroll.propTypes = {
    showCards: PropTypes.bool,
    handleShowCards: PropTypes.func,
}

export default CardScroll