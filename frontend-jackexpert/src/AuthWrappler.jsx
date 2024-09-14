
import PropTypes from 'prop-types'
import axios from 'axios';
import { useState } from 'react';
import Loading from './components/Loading';
import Header from './components/Header.jsx'

// Cria o contexto

function AuthWrapper({ children }) {

  const [isAuthenticating, setIsAuthenticating] = useState(true)

  const verifyToken = () => {
    console.log('Verificando Token...')
    const token = localStorage.getItem('jwtToken');
    if (!token) return console.log('Não existe token atualmente');

    return axios.get('http://localhost:8800/verifyToken', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true // Inclui cookies na requisição
    })
    .then((res) => {
      console.log(res.data.msg)
      if (res.data.token){
        localStorage.setItem('jwtToken', res.data.token)
      }
      setIsAuthenticating(false)
    })
    .catch((err) => {
      console.log(err.response.data.msg);
      setIsAuthenticating(false)
    }); 
  };
  verifyToken()

  return (
      <>
        {isAuthenticating ? <Header/> : children}
        
      </>
  );
}


AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired // Valida que children deve ser um nó React (o que pode incluir strings, elementos, fragmentos, etc.)
};
export default AuthWrapper;
