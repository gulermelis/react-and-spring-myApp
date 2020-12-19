import React from 'react';
import { Label, Input, FormFeedback} from  'reactstrap';


export const InputForm = props => {
    const {label,name, error, onChange,type } = props;
    return(
        <div className="form-group">
                    <Label>{label}</Label>
                    <Input name={name}  onChange={ onChange } invalid={error ? true : null} type={type}/>
                    <FormFeedback>{error}</FormFeedback> 
          
                </div>
    );
}
