
import { FaArrowLeftLong } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import '../pages_css/JWTRecuse.css'
import { useEffect, useState } from "react"

const JWTRecuse = () => {
    const [count, setCount] = useState(5)
    const navigate = useNavigate()
    
  useEffect(() => {
    // Inicia o intervalo ao montar o componente
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1); // Usar o prevCount para garantir o valor atualizado
    }, 1000);

    // Cancela o intervalo e navega após 5 segundos
    const timeout = setTimeout(() => {
      clearInterval(interval); // Limpa o intervalo
      navigate('/login'); // Navega para a página de login
    }, 5000);

    // Limpa o intervalo e o timeout quando o componente for desmontado
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);


  return (
    <div>
      <div className='denied_backLink' onClick={()=>{navigate('/')}}><FaArrowLeftLong className="denied_backicon"/></div>
      <h1 className='acess-denied'>Você deve realizar login para ter acesso a essa página.</h1>
      <p className='acess-denied'>Estamos lhe direcionando para a página de login em {count}...</p>
    </div>
  )
}

export default JWTRecuse