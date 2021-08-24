import React,{createRef, useRef, useState} from 'react'
import {Field,ErrorMessage} from 'formik'
import TextError from './TextError'

export default function Input(props) {
    const {label,name,...rest}=props
    const [Visiblity, setVisiblity] = useState(false)
    const type=Visiblity===true?'text':'password'
    const classNameCss=Visiblity===true?'cut-eye':'eye'
    return (
        <div className="form-element">
            <div className="password-field"  >
                <Field id={name} name={name} type={type} {...rest} placeholder={label} />
                {<div className={classNameCss} onClick={() => {
                    Visiblity === true ? setVisiblity(false) : setVisiblity(true)
                }}>
                </div>}

            </div>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}
