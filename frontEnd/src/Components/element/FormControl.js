import React from 'react'
import Input from './Input'
import Select from './Select'
import Password from './Password'
export default function FormControl(props) {
   
    const {control,...rest}=props
    switch(control){
        case 'input' :
            return <Input {...rest }/>
        case  'select':
            return <Select {...rest}/>
        case 'password':
            return <Password {...rest}/>
        default:
            return null
    }
}
