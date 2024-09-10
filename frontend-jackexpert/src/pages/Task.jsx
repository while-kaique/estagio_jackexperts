
// import { useParams } from "react-router-dom"

import { useNavigate } from 'react-router-dom'
import '../pages_css/Task.css'
import { useState } from 'react'
import BackArrow from '../components/BackIcon.jsx'

const Task = () => {

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
    navigate('/')
  }
  const handleNo = ()=>{
    setConfirmScreen(false)
  }

  return (  
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
        <div className="init">
          <BackArrow/>
          <h1 id='init_title'>Sua Tarefa</h1>
          <div className="save" onClick={()=>{handleSave()}}></div>
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

    </div>
  )
}

export default Task