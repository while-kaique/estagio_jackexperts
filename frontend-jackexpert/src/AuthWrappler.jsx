
import axios from 'axios';

function AuthWrapper({ children }) {

    async function refreshToken() {
        try {
          const response = await axios.post('http://localhost:8800/token', {}, { 
            withCredentials: true // Inclui cookies na requisição
        }).catch(() => console.log('DEU RUIM'));;
      
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('jwtToken', data.token); // Atualiza o access token
            return true;
          } else {
            return false;
          }
        } catch {
          console.error('Erro ao renovar o token');
          return false;
        }
    }
    refreshToken()
  return children;
}

export default AuthWrapper;