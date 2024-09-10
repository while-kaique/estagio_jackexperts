
import { Link } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

import '../components_css/BackIcon.css'

const BackArrow = () => {
  return (
    <Link to={'/'}>
      <div className="backIcon"><FaArrowLeftLong/></div>
    </Link>
  )
}

export default BackArrow