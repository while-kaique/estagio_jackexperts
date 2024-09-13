import { useEffect, useState } from "react";
import '../components_css/Header.css'
import Menu from "../sub_elements/Menu";

import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";


const Header = () => {

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  const [screenSize, setScreenSize] = useState(getCurrentDimension().width);

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
        <Menu/>
        <Link to={'/login'}><FaUserCircle className="log_reg"/></Link>
      </div>
      
      : <div>não passou</div>}
    </header>
  )
}

export default Header