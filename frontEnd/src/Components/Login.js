import React, { Component } from 'react';
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import FormControl from './element/FormControl';
import {Link} from 'react-router-dom'
import StateContext from '../Context/StateContext';
class Login extends Component {
    static contextType=StateContext
    componentDidMount=()=>{
        if(this.context.user.firstName===""){
            console.log("i am in the f")
            this.context.getLoginStatus()
        }
    }
    onSubmit=(data)=>{
        console.log(data)
        alert(JSON.stringify(data))
        this.context.Login(data)
    }
    initialValues={
        id: '',
        password: ''
    }
    validationSchema=Yup.object({
        id: Yup.string().email("invalid email").required("required"),
        password: Yup.string().required()
    })
    render() {
        return (
            <section className="login-page">
                <div className="image">
                    
                </div>
                <Formik initialValues={this.initialValues}
               validationSchema={this.validationSchema}
               onSubmit={this.onSubmit}>
                <Form>
                    <div className="logo-cover">
                        <div className="logo"></div>
                    </div>
                    <FormControl control="input" label="Email" name="id"/>
                    <FormControl control="password" label="password" name="password"/>
                    <button className="btn">Login</button>
                    <Link to="/signup"><button className="S-btn" onClick={(e)=>{}}>Sign up</button></Link>
                </Form>
                </Formik>
                
            </section>
        );
    }
}

export default Login;
