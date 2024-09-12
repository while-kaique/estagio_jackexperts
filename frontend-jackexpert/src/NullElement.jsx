
import { Outlet } from 'react-router-dom'
import AuthWrappler from './AuthWrappler'

const NullElement = () => {
  return (
    <AuthWrappler>
        <Outlet/>
    </AuthWrappler>
  )
}

export default NullElement