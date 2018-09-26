import select from './select';
import textInput from './textInput';
import imageSelect from './imageSelect';
import slider from './slider';
import signature from './signature';
import user from './user';

const elements = {select, textInput, imageSelect, slider, signature, user};

module.exports =  ({field, state, setState})=>{
  return elements[field.element?field.element:'textInput'][field.view]({field, state, setState});
}
