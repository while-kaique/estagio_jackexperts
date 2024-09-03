import { useRef, useState } from "react";
import PropTypes from 'prop-types';
import './CardScroll.css'


const CardScroll = ({showCards}) => {

    const [isDown, setIsDown] = useState(false)
    const [startX, setStartX] = useState(0)
    const scrollLeftRef = useRef(0);
    const cardsWrapperRef = useRef(null)
  
    const handleMouseDown = (e) => {
      setIsDown(true)
      const startX = e.pageX - cardsWrapperRef.current.offsetLeft;
      setStartX(startX)
      scrollLeftRef.current = cardsWrapperRef.current.scrollLeft;
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
      const walk = (x - startX) * 1.5; // Ajusta a velocidade de arraste
      cardsWrapperRef.current.scrollLeft = scrollLeftRef.current - walk;
    };  
  
    // MOBILE TOUCH SCROLL
    // MOBILE TOUCH SCROLL
  
    const handleTouchStart = (e) => {
      setIsDown(true);
      const startX = e.touches[0].pageX - cardsWrapperRef.current.offsetLeft;
      setStartX(startX);
      scrollLeftRef.current = cardsWrapperRef.current.scrollLeft;
      console.log('handleTouchStart');
    };
  
    const handleTouchEnd = () => {
      setIsDown(false);
      console.log('handleTouchEnd');
    };
  
    const handleTouchMove = (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - cardsWrapperRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      cardsWrapperRef.current.scrollLeft = scrollLeftRef.current - walk;
      console.log('handleTouchMove');
    };
  return (
    <section className="containerCards">
        {showCards ? 
            <div className='cards show'>
                <div className="card" id="card1"></div>
                <div className="card" id="card2"></div>
                <div className="card" id="card3"></div>
                <div className="card" id="card4"></div>
                <div className="card" id="card5"></div>
            </div> 
            :
            <div 
            className='cards' 
            ref={cardsWrapperRef}
            onMouseDown={(e)=>{handleMouseDown(e)}} 
            onMouseLeave={()=>{handleMouseLeave()}} 
            onMouseUp={()=>{handleMouseUp()}} 
            onMouseMove={(e)=>{handleMouseMove(e)}}
            onTouchStart={(e)=>{handleTouchStart(e)}}
            onTouchEnd={(e)=>{handleTouchEnd(e)}}
            onTouchMove={(e)=>{handleTouchMove(e)}}
            >
                <div className="degree"></div>
                <div className="card first" id="card1"></div>
                <div className="card" id="card2"></div>
                <div className="card" id="card3"></div>
                <div className="card" id="card4"></div>
                <div className="card" id="card5"></div>
            </div>
            }

        
    </section>
  )
}

CardScroll.propTypes = {
    showCards: PropTypes.bool,
}

export default CardScroll