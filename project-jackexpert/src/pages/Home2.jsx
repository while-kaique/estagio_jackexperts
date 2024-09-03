import { useState, useRef } from 'react';
import './Home2.css';

const Home2 = () => {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const cardsWrapperRef = useRef(null);
  const scrollLeftRef = useRef(0); // Usando uma referência para scrollLeft

  const handleMouseDown = (e) => {
    setIsDown(true);
    const startX = e.pageX - cardsWrapperRef.current.offsetLeft;
    setStartX(startX);
    scrollLeftRef.current = cardsWrapperRef.current.scrollLeft; // Atualiza a referência
    console.log('MouseDown - startX:', startX);
    console.log('MouseDown - scrollLeft:', scrollLeftRef.current);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - cardsWrapperRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Ajusta a velocidade de arraste
    cardsWrapperRef.current.scrollLeft = scrollLeftRef.current - walk; // Atualiza a rolagem
    console.log(`MouseMove - x: ${x}`);
    console.log(`MouseMove - walk: ${walk}`);
    console.log(`MouseMove - scrollLeft: ${scrollLeftRef.current}`);
  };

  const handleTouchStart = (e) => {
    setIsDown(true);
    const startX = e.touches[0].pageX - cardsWrapperRef.current.offsetLeft;
    setStartX(startX);
    scrollLeftRef.current = cardsWrapperRef.current.scrollLeft;
  };

  const handleTouchEnd = () => {
    setIsDown(false);
  };

  const handleTouchMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - cardsWrapperRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    cardsWrapperRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <div className="container">
      <div
        className="cards-wrapper"
        ref={cardsWrapperRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <div className="card">Card 1</div>
        <div className="card">Card 2</div>
        <div className="card">Card 3</div>
        <div className="card">Card 4</div>
        <div className="card">Card 5</div>
        <div className="card">Card 6</div>
        <div className="card">Card 7</div>
        <div className="card">Card 8</div>
      </div>
    </div>
  );
};

export default Home2;
