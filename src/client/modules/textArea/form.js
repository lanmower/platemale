import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import TextArea from '@material-ui/core/TextField';

module.exports =  ({field, state, onChange})=>{
  return (<div><TextArea
                    id={field.name}
                    label={field.label}
                    margin="normal"
                    value={state[field.name]}
                    onChange={onChange}
                  /></div>);
}
