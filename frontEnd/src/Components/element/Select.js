import React from'react'
import {Field,ErrorMessage} from 'formik'
import TextError from './TextError'
export default function Select(props) {
    const {name,label,options,...set}=props
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field as="select" name={name} id={name} {...set}>
            {
                    options.map(option=>{
                        return  <option key={option.value} value={option.value}>
                            {option.key}
                        </option>
                    })
                }
            </Field>
            <ErrorMessage name={name}   component={TextError}/>
        </div>
    )
}
