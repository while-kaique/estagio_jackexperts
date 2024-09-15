import { useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

import './CardScroll.css'


const CardScroll = ({fiveProjects, userProjects, handleShowCards, showCards}) => {
  const navigate = useNavigate()
  console.log(userProjects)
  const months = {
    '01': 'Janeiro',
    '02': 'Fevereiro',
    '03': 'Março',
    '04': 'Abril',
    '05': 'Maio',
    '06': 'Junho',
    '07': 'Julho',
    '08': 'Agosto',
    '09': 'Setembro',
    '10': 'Outubro',
    '11': 'Novembro',
    '12': 'Dezembro'
  };

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

  const handleCardChange = (index, card, id) => {
    console.log(id)
    if (card.currentTarget){
      if (card.currentTarget.className.indexOf('active') !== -1) {
        navigate(`/projects/${id}`)
      }
    }
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

    cards.current[index].classList.add('active')
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
          onClick={(e)=> handleCardChange(0, e, fiveProjects[0].project.id)}
        >
          {fiveProjects[0].project == false ? 
            null :
            <div className="projectCard">
              <span className="project-categ"><h2>{fiveProjects[0].project.category}</h2></span>
              <h1 className="project-title">{
              fiveProjects[0].project.name
              }</h1>
              <h3 className="project-date">{`Dia ${fiveProjects[0].project.date.split('T')[0].split('-')[2]} de ${months[fiveProjects[0].project.date.split('T')[0].split('-')[1]]} de ${fiveProjects[0].project.date.split('T')[0].split('-')[0]}`}</h3>
            </div>
          }
        </div>

        <div className="card next" 
          id={1} 
          ref={(el) => cards.current[1] = el}
          onClick={(e)=> handleCardChange(1, e, fiveProjects[1].project.id)}
        >
          {fiveProjects[1].project == false ? 
            null :
            <div className="projectCard">
              <span className="project-categ"><h2>{fiveProjects[1].project.category}</h2></span>
              <h1 className="project-title">{fiveProjects[1].project.name}</h1>
              <h3 className="project-date">{`Dia ${fiveProjects[1].project.date.split('T')[0].split('-')[2]} de ${months[fiveProjects[0].project.date.split('T')[0].split('-')[1]]} de ${fiveProjects[0].project.date.split('T')[0].split('-')[0]}`}</h3>
            </div> 
          }
          </div>

        <div className="card" 
          id={2} 
          ref={(el) => cards.current[2] = el}
          onClick={(e)=> handleCardChange(2, e, fiveProjects[2].project.id)}
        >
          {fiveProjects[2].project == false ? 
            null :
            <div className="projectCard">
              <span className="project-categ"><h2>{fiveProjects[2].project.category}</h2></span>
              <h1 className="project-title">{fiveProjects[2].project.name}</h1>
              <h3 className="project-date">{`Dia ${fiveProjects[2].project.date.split('T')[0].split('-')[2]} de ${months[fiveProjects[0].project.date.split('T')[0].split('-')[1]]} de ${fiveProjects[0].project.date.split('T')[0].split('-')[0]}`}</h3>
            </div> 
          }
        </div>

        <div className="card" 
          id={3} 
          ref={(el) => cards.current[3] = el}
          onClick={(e)=> handleCardChange(3, e, fiveProjects[3].project.id)}
        >
          {fiveProjects[3].project == false ? 
            null :
            <div className="projectCard">
              <span className="project-categ"><h2>{fiveProjects[3].project.category}</h2></span>
              <h1 className="project-title">{fiveProjects[3].project.name}</h1>
              <h3 className="project-date">{`Dia ${fiveProjects[2].project.date.split('T')[0].split('-')[3]} de ${months[fiveProjects[0].project.date.split('T')[0].split('-')[1]]} de ${fiveProjects[0].project.date.split('T')[0].split('-')[0]}`}</h3>
            </div> 
          }
        </div>

        <div className="card" 
          id={4} 
          ref={(el) => cards.current[4] = el}
          onClick={(e)=> handleCardChange(4, e, fiveProjects[4].project.id)}
        >
          {fiveProjects[4].project == false ? 
            null :
            <div className="projectCard">
              <span className="project-categ"><h2>{fiveProjects[4].project.category}</h2></span>
              <h1 className="project-title">{fiveProjects[4].project.name}</h1>
              <h3 className="project-date">{`Dia ${fiveProjects[2].project.date.split('T')[0].split('-')[4]} de ${months[fiveProjects[0].project.date.split('T')[0].split('-')[1]]} de ${fiveProjects[0].project.date.split('T')[0].split('-')[0]}`}</h3>
            </div> 
          }
        </div>
        
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
        > </div>
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
    userProjects: PropTypes.array,
    fiveProjects: PropTypes.array,
}

export default CardScroll