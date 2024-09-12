
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

import '../components_css/BackIcon.css'

const BackArrow = () => {

  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="backIcon" onClick={goBack}><FaArrowLeftLong/></div>
  )
}

export default BackArrow