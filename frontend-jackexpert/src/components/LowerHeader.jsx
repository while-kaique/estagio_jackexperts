import { Outlet } from "react-router-dom"

import '../components_css/LowerHeader.css'

import BackArrow from "./BackIcon.jsx"


const LowerHeader = () => {
  return (
    <>
        <div className="lowerHeader">
            <BackArrow/>
        </div>
        <Outlet/>
    </>
  )
}

export default LowerHeader