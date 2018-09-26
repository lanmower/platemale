import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

module.exports =  ({field, state, setState})=>{
  const {options, label, name, path} = field;
  const onChange = (event) => {
    const newState = {};
    newState[field.name] = event.target.value;
    setState(newState);
  }

  return (
    <div>
    <FormLabel>{label}</FormLabel>
    <Select value={state[name]} onChange={onChange} inputProps={{
              name,
            }}>
            {options.map(option => {
              return <MenuItem key={option.value} value={option.value}>{option.label}
                <img style={{height:"2em"}} src={'/images/'+path+'/'+option.value+".png"}/>
                </MenuItem>
            })}
    </Select>
    </div>
  );
}
