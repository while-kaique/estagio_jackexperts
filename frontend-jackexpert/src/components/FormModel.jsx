import { Formik, Form, Field, ErrorMessage} from "formik";
import PropTypes from 'prop-types'
import * as yup from "yup";
import axios from 'axios'

import '../components_css/FormModel.css'
import { Link, useNavigate } from "react-router-dom";

const FormModel = ({isRegister, isLogin}) => {
    
    
    const navigate = useNavigate()
    
    const handleClickLogin = (values) => {
        axios.post("http://localhost:8800/login", {
            email: values.email,
            password: values.password
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

  return (
    <div className="container">
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
        
        
    </div>
  )
  
}

FormModel.propTypes = {
    isRegister: PropTypes.bool,
    isLogin: PropTypes.bool,
}

export default FormModel
