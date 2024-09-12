
// import { useParams } from "react-router-dom"

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import '../pages_css/Task.css'

import { FaArrowLeftLong } from 'react-icons/fa6'
import { FiEdit3 } from "react-icons/fi";

const Task = () => {

  const goBack = () => {
    navigate(-1)
  }

  const [ userId, setUserId ] = useState(null)

  useEffect((() => {
      const token = localStorage.getItem('jwtToken');
      console.log(token)
      
      axios.get("http://localhost:8800/task",{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
          setUserId(res.data.user.id)
      })
      .catch((err) =>{
        setUserId(err.response.data.user.id)
      })
    }), [])
  

  const navigate = useNavigate()

  const init_task = {title: 'Fazer cocô', startTime: '07/09/2024', endTime: '07/09/2024', description: 'Eu preciso MUITO cortar o rabo do macaco.'}
  const [task] = useState(init_task)
  const [confirmScreen, setConfirmScreen] = useState(false)
  // const { taskId, projectId } = useParams()

  const handleSave = () => {
    setConfirmScreen(true)
  }
  const handleYes = () =>{
    setConfirmScreen(false)
    navigate(-1)
  }
  const handleNo = ()=>{
    setConfirmScreen(false)
  }

  return (  
    <>
      {userId ? 
        <div className="task">
          
          {/* HEADER DO CARD */}
          {confirmScreen ?
          <div className="confirmSave">
            <div className="confirmCard">
              <h1>Tem certeza que deseja salvar essas informações?</h1>
              <div className="button">
                <div id='yes' onClick={()=>{handleYes()}}><p>Sim</p></div>
                <div id='no'  onClick={()=>{handleNo()}}><p>Não</p></div>
              </div>
            </div>
          </div> : null}
          <section className="cardHeader">
            <div className='task_backLink' onClick={navigate(-1)}><FaArrowLeftLong className="task_backIcon"/></div>
            <div className="init">
              <h1 id='init_title'>Sua Tarefa</h1>
              <div className="save" onClick={()=>{handleSave()}}><FiEdit3/></div>
              </div>
            <section className="title">
              <h1>Título</h1>
              <h2>{task.title}</h2>
            </section>
            <section className="date">
              <h1>Início</h1>
              <h2>{task.startTime}</h2>
            </section>
          </section>

          {/* DESCRIÇÃO DO CARD */}
          <section className="cardDesc">
            <div className="desc">
              <h1>Descrição</h1>
              <p lang='pt-br'>{task.description}</p>
            </div>
          </section>

        </div> : 
        <div>
          <div className='denied_backLink' onClick={goBack}><FaArrowLeftLong className="denied_backicon"/></div>
          <h1 className='acess-denied'>Ops... Você não é autorizado a ver as páginas de seus projetos sem se logar anteriormente</h1>
        </div>
      }
    </>
  )
}

export default Task