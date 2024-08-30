
import '../components_css/Home.css'


const Home = () => {

  return (
    <>
      <section className="initInfo">
        <h1>Olá Kaique!</h1>
        <p>Tenha um ótimo dia.</p>
      </section>

      <section className="task_categ">
        <div className="my_tasks active"><h1>Salvas</h1></div>
        <div className="running_tasks"><h1>Em progresso</h1></div>
        <div className="complete_tasks"><h1>Concluídas</h1></div>
      </section>

      <section className="cards">
        <div className="card" id="card1"></div>
        <div className="card" id="card2"></div>
        <div className="card" id="card3"></div>
        <div className="card" id="card4"></div>
        <div className="card" id="card5 "></div>
      </section>
    </>
  )
}

export default Home