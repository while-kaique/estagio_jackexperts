import './ProjectCards.css'
import PropTypes from 'prop-types'

const ProjectCards = ({projects}) => {
    const title = '123456789101'
    const newTitle = title.split('')

  return (
    <div id='projectPage'>
        <section className="containerPjCards">
            <div className="pj_cards">
                {projects.map(project => {
                    <div className="card">
                        <div className="projectCard">
                            <span className="project-categ"><h2>{project.category}</h2></span>
                            <h1 className="project-title">{project.title.length >= 11 ? 
                            
                            .map((letter, index) => {
                                if (index <= 10) {
                                    console.log(letter)
                                    return letter
                                }
                                if (index == 11) {
                                    return '...'
                                }}
                            ) : title}</h1>
                            <h3 className="project-date">10/10/2005</h3>
                        </div>
                    </div>
                })}
            </div>
        </section>
    </div>
  )
}   

ProjectCards.propTypes = {
    projects: PropTypes.array
}

export default ProjectCards