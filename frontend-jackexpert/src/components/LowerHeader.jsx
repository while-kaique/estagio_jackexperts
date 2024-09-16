import { Outlet, useNavigate } from "react-router-dom"

import '../components_css/LowerHeader.css'

import AuthWrapper from "../AuthWrappler.jsx"
import { FaArrowLeftLong } from "react-icons/fa6"


const LowerHeader = () => {

  const navigate = useNavigate()

  return (
    <>
    <AuthWrapper>
        <div className="lowerHeader">
          <div onClick={()=>navigate('/')}> 
            <FaArrowLeftLong className="icon"/>
          </div>
        </div>
        <Outlet/>
    </AuthWrapper>
    </>
  )
}

export default LowerHeader