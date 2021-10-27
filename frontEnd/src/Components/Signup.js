import React, { Component, useRef } from 'react';
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import FormControl from './element/FormControl';
import {Link} from 'react-router-dom'
import StateContext from '../Context/StateContext';
class Signup extends Component {
    static contextType=StateContext
    onSubmit=(data)=>{
        //console.log(data)
        alert(JSON.stringify(data))
        this.context.Signup(data)
    }
    initialValues={
        firstName: "",
        lastName: "",
        id: '',
        password: '',
        phone: "",
        confirmPassword:""
    }
    validationSchema=Yup.object({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        id: Yup.string().email("invalid email").required(),
        password: Yup.string().required(),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'),null],"Password must match").required(),
        phone: Yup.string().required()
    })
    componentDidMount=()=>{
        console.log("hiiiiiii")
    }
    render() {
       return (
            <section className="login-page">
                <div className="image"></div>
                <Formik initialValues={this.initialValues}
               validationSchema={this.validationSchema}
               onSubmit={this.onSubmit}>
                <Form>
                    <div className="logo-cover">
                        <div className="c-logo"></div>
                    </div>
                    <FormControl control="input" label="First name" name="firstName"/>
                    <FormControl control="input" label="Last name" name="lastName"/>
                    <FormControl control="input" label="Email" name="id"/>
                    <FormControl control="input" label="phone number" name="phone"/>
                    <FormControl control="password" label="password" name="password"/>
                    <FormControl control="password" label=" confirm password" name="confirmPassword"/>
                    <button type="submit" className="btn"  >Sign up</button>
                    <Link to="/"><button className="S-btn">Already have an account</button></Link>
                </Form>
                </Formik>
                
            </section>
        );
    }
}

export default Signup;
