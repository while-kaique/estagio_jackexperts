import { Outlet } from "react-router-dom"

import '../components_css/LowerHeader.css'

import BackArrow from "./BackIcon.jsx"
import AuthWrapper from "../AuthWrappler.jsx"


const LowerHeader = () => {
  return (
    <>
    <AuthWrapper>
        <div className="lowerHeader">
            <BackArrow/>
        </div>
        <Outlet/>
    </AuthWrapper>
    </>
  )
}

export default LowerHeader