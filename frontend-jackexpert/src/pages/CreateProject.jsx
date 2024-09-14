
import '../pages_css/CreateProject.css'
import FormModel from '../components/FormModel'

const CreateProject = () => {
  return (
    <div className="createP">
        <h1 className='createProject-title'>Criar novo projeto</h1>

        <FormModel isCreatingProject={true}/>
    </div>
  )
}

export default CreateProject