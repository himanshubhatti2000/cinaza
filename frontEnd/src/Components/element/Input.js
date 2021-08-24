import React from 'react'
import {Field,ErrorMessage} from 'formik'
import TextError from './TextError'
export default function Input(props) {
    const {label,name,type,...rest}=props
    return (
        <div className="form-element">
            <Field id={name} name={name} type={type} {...rest} placeholder={label}/>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}
