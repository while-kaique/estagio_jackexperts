
import { Outlet } from 'react-router-dom'
import AuthWrappler from './AuthWrappler'

const EspecialElement = () => {
  return (
    <AuthWrappler>
        <Outlet/>
    </AuthWrappler>
  )
}

export default EspecialElement