import { useEffect, useState } from "react";


const Header = () => {

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  const [screenSize, setScreenSize] = useState(getCurrentDimension().width);
  const [menuIsOpen, setMenuIsOpen] = useState(false);


  useEffect(() => {
    const updateDimension = () => { 
      setScreenSize(getCurrentDimension().width);
    };
    window.addEventListener("resize", updateDimension);

    console.log(screenSize)

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);
  return (
    <header>
      {screenSize >= 480 ? 
      
      <div className="header">
        <div className="menuIcon">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        {menuIsOpen ? <div></div> : null}
        <div className="log_reg">
           
        </div>
      </div>
      
      : <div>não passou</div>}
    </header>
  )
}

export default Header