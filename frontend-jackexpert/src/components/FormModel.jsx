import { Formik, Form, Field, ErrorMessage} from "formik";
import PropTypes from 'prop-types'
import * as yup from "yup";
import axios from 'axios'

import '../components_css/FormModel.css'
import { Link, useNavigate } from "react-router-dom";
import { FaBriefcase, FaHeart, FaHome, FaSchool, FaMusic, FaUsers, FaEllipsisH } from "react-icons/fa";

const FormModel = ({isRegister, isLogin, isCreatingProject, isCreatingCard}) => {
    
    
    const navigate = useNavigate()

    const categories = [
        { name: 'Escola', icon: <FaSchool /> },
        { name: 'Trabalho', icon: <FaBriefcase /> },
        { name: 'Relacionamento', icon: <FaHeart /> },
        { name: 'Casa', icon: <FaHome /> },
        { name: 'Lazer', icon: <FaMusic /> },
        { name: 'Família', icon: <FaUsers /> },
        { name: 'Outros', icon: <FaEllipsisH /> }
      ];
    
    const handleClickLogin = (values) => {
        axios.post("http://localhost:8800/login", {
            email: values.email,
            password: values.password
        }, {withCredentials: true})
        .then((res) => {
            console.log(res.data.msg)
            if (res.data.login){
                localStorage.setItem("jwtToken", res.data.token)
                alert(res.data.msg)
                navigate('/')
                return
            }
            alert(res.data.msg)
        })
        .catch(err => console.log(err.response.data.msg))
    }
    const handleClickRegister = (values) => {
        axios.post("http://localhost:8800/register", {
            name: values.name,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        })
        .then((res) => {
            if (res.data.login){
                localStorage.setItem("jwtToken", res.data.token)
                alert(res.data.msg)
                navigate('/')
            }
        })
        .catch(err => console.log(err.response.data.msg))
    }   
    const handleClickCreateProject = (values) => {
        console.log('criou projeto com os dados: ')
        console.log(values)
        alert('Projeto criado com sucesso!')
        navigate('/')
    }

    const validationLogin = yup.object().shape({
        email: yup
        .string()
        .email("Insira um email válido.")
        .required("Este campo é obrigatório."),
        password: yup
        .string()
        .required("Este campo é obrigatório."),
    })
    const validationRegister = yup.object().shape({
        name: yup
        .string(85)
        .max(40)
        .required("Este campo é obrigatório."),
        email: yup
        .string()
        .email("Insira um email válido.")
        .required("Este campo é obrigatório."),
        password: yup
        .string()
        .min(8, "A senha deve ter ao menos 8 dígitos")
        .max(20)
        .required("Este campo é obrigatório."),
        confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "As senhas devem ser iguais.")
        .required("Este campo é obrigatório.")
    })
    const validationCreateProject = yup.object().shape({
        name: yup.string()
        .min(3, 'O nome deve ter no mínimo 3 caracteres')
        .max(50,  'O título deve ter no máximo 50 caracteres')
        .required("Este campo é obrigatório."),
        
        category: yup.string()
        .oneOf(categories.map((category)=>{return category.name}), 'Categoria inválida')
        .required("Este campo é obrigatório."),

        description: yup.string()
        .min(10, 'A descrição deve ter pelo menos 10 caracteres')
        .max(200, 'A descrição não pode exceder 200 caracteres')
        .required('A descrição é obrigatória')
})

  return (
    <div className="container">
        
        {/* PÁGINA DE LOGIN */}
        {/* PÁGINA DE LOGIN */}
        {isLogin ? 
        <Formik
        initialValues={{email:'', password:''}}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}>
            <Form className="login-form">
                <h1>Login</h1>
                <div className="login-form-group">
                    <label htmlFor="email">Email</label>
                    <Field id="email" name="email" className="form-field" placeholder="Insira seu email" />

                    <ErrorMessage component="span" name="email" className="form-error"/>
                </div>
                <div className="login-form-group">
                    
                    <label htmlFor="password">Senha</label>
                    <Field id="password" name="password" type="password" className="form-field" placeholder="Insira sua senha" />

                    <ErrorMessage component="span" name="password" className="form-error"/>
                </div>
                <Link to={'/register'}><p>Não possui conta? Clique para se registrar</p></Link>
                <button type="submit" className="button">Login</button>
            </Form>
        </Formik>
        : null}

        {/* PÁGINA DE REGISTRO */}
        {/* PÁGINA DE REGISTRO */}
        {isRegister ? 
            <Formik
            initialValues={{name: '', email:'', password:'', confirmPassword: ''}}
            onSubmit={handleClickRegister}
            validationSchema={validationRegister}
            >
                <Form className="register-form">
                    <h1>Registrar</h1>
                    <div className="register-form-group">
                        <label htmlFor="name">Nome</label>
                        <Field id="name" name="name" className="form-field" placeholder="Insira seu nome" />

                        <ErrorMessage component="span" name="name" className="form-error"/>
                    </div>
                    <div className="register-form-group">
                    
                        <label htmlFor="email">Email</label>
                        <Field name="email" className="form-field" placeholder="Insira seu email" />
                        <ErrorMessage component="span" name="email" className="form-error"/>
                    </div>
                    <div className="register-form-group">
                    
                        <label htmlFor="password">Senha</label>
                        <Field name="password" className="form-field" type="password" placeholder="Insira sua senha" />
                        <ErrorMessage component="span" name="password" className="form-error"/>
                    </div>
                    <div className="register-form-group">
                    
                        <label htmlFor="confirmPassword">Senha</label>
                        <Field id="confirmPassword" name="confirmPassword" type="password" className="form-field" placeholder="Insira sua senha" />
                        <ErrorMessage component="span" name="confirmPassword" className="form-error"/>
                    </div>
                    <Link to={'/login'}><p>Já possui conta? Clique para se fazer login</p></Link>
                    <button type="submit" className="button">Register</button>

                </Form>
            </Formik>
        : null}

        {/* PÁGINA DE CRIAÇÃO DE PROJETOS */}
        {/* PÁGINA DE CRIAÇÃO DE PROJETOS */}

        {isCreatingProject ? 
            <div>
                <Formik
                initialValues={{name: '', category:'', description: ''}}
                onSubmit={handleClickCreateProject}
                validationSchema={validationCreateProject}
                >
                    {({ values, setFieldValue }) => (
                        <Form className="createProject-form">
                            <div className="create-project-form-group">
                                <label htmlFor="name">Nome do projeto</label>
                                <div className="field">
                                    <Field id="name" autoComplete='off' name="name" className="form-field"/>
                                </div>

                                
                                <ErrorMessage component="span" name="name" className="form-error"/>
                            </div>
                            <div className="create-project-form-group category">
                            
                                <label htmlFor="category">Categoria</label>
                                <div className="category-buttons">
                                    {categories.map((category, index)=>(
                                        <button className={values.category === category.name ? 'selected' : ''} key={index} type="button" onClick={()=> setFieldValue('category', category.name)}>
                                            <span>{category.name}</span>
                                        </button>
                                    ))}
                                </div>
                                <ErrorMessage component="span" name="category" className="form-error"/>
                            </div>
                            <div className="create-project-form-group description">
                            
                                <label htmlFor="description">Descrição do projeto</label>
                                <Field name="description" as="textarea" rows="5" autoComplete='off' className="form-field" />
                                <ErrorMessage component="span" name="description" className="form-error"/>
                            </div>
                            <button type="submit" className="button">Criar Tarefa</button>
                        </Form>
                    )}
                </Formik>
            </div> 
        : null}
        
        
    </div>
  )
  
}

FormModel.propTypes = {
    isRegister: PropTypes.bool,
    isLogin: PropTypes.bool,
    isCreatingProject: PropTypes.bool,
    isCreatingCard: PropTypes.bool,
}

export default FormModel
