import { useState } from "react";


const Menu = () => {
  const [menuClass, setMenuClass] = useState('close');
  const [canMenu, setCanMenu] = useState(false);

  return (
    <>
    <div className="menuIcon" onClick={() => {
        setMenuClass('open')
        setCanMenu(true)
    }}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
    </div>
    {canMenu ? 
        <div className={`menu ${menuClass}`}>
        <div className="mainMenu">
            <section className="sectionClose">
            <div className="xbutton" onClick={() => {
                setMenuClass('close')
                setTimeout(() => {
                setCanMenu(false)
                }, 400);}}></div>
            </section>

            <ul className="tags">
                <li><a href="#">Minhas Tarefas</a></li>
                <li><a href="#">Concluídas</a></li>
                <li><a href="#">Canceladas</a></li>
            </ul>
        </div>
        </div> 
        : null}
    </>
  )
}

export default Menu