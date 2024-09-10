import { Formik, Form, Field, ErrorMessage} from "formik";
import PropTypes from 'prop-types'
import * as yup from "yup";

import '../components_css/FormModel.css'
import { Link } from "react-router-dom";

const FormModel = ({isRegister, isLogin}) => {

    const handleClickLogin = (values) => {
        console.log(values)
    }
    const validationLogin = yup.object().shape({
        email: yup
        .string()
        .email("Insira um email válido.")
        .required("Este campo é obrigatório."),
        password: yup
        .string()
        .min(8, "A senha deve ter ao menos 8 dígitos")
        .required("Este campo é obrigatório."),
    })
    const validationRegister = yup.object().shape({
        email: yup
        .string()
        .email("Insira um email válido.")
        .required("Este campo é obrigatório."),
        password: yup
        .string()
        .min(8, "A senha deve ter ao menos 8 dígitos")
        .required("Este campo é obrigatório."),
        confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "As senhas devem ser iguais.")
    })

  return (
    <div className="container">
        {isLogin ? 
        <Formik
        initialValues={{}}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}>
            <Form className="login-form">
                <h1>Login</h1>
                <div className="login-form-group">
                    <label htmlFor="email">Email</label>
                    <Field id="email" name="email" className="form-field" placeHolder="Insira seu email" />

                    <ErrorMessage component="span" name="email" className="form-error"/>
                </div>
                <div className="login-form-group">
                    
                    <label htmlFor="password">Senha</label>
                    <Field id="password" name="password" className="form-field" placeHolder="Insira sua senha" />

                    <ErrorMessage component="span" name="password" className="form-error"/>
                </div>
                <Link to={'/register'}><p>Não possui conta? Clique para se registrar</p></Link>
                <button type="submit" className="button">Login</button>
            </Form>
        </Formik>
        : null}
        {isRegister ? 
            <Formik
            initialValues={{}}
            onSubmit={handleClickLogin}
            validationSchema={validationRegister}
            >
                <Form className="register-form">
                    <div className="register-form-group">
                        <Field name="email" className="form-field" placeHolder="Insira seu email" />
                        <ErrorMessage component="span" name="email" className="form-error"/>
                    </div>
                    <div className="register-form-group">
                        <Field name="password" className="form-field" placeHolder="Insira sua senha" />
                        <ErrorMessage component="span" name="password" className="form-error"/>
                    </div>
                    <div className="register-form-group">
                        <Field name="confirmPassword" className="form-field" placeHolder="Insira sua senha" />
                        <ErrorMessage component="span" name="password" className="form-error"/>
                    </div>
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
