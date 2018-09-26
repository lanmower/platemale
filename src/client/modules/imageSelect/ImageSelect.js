import React from 'react';
import PropTypes from 'prop-types';
//import Select from 'react-select';
import Select from '@material-ui/core/Select';

class ImageSelect extends React.Component {
  constructor(props) {
    super(props)
    const {
      value
    } = this.props;

    this.state = {value};
  }

  render() {

    const {
      options,
      onChange,
      value,
      path
    } = this.props;

    const Option = (props) => {
      const {innerRef, innerProps, data, children} = props;
      const {tabIndex, onClick, onMouseMove, onMouseOver} = innerProps;
      console.log(props)
      return (
        <div ref={innerRef} tabIndex={tabIndex} onClick={onClick} onMouseMove={onMouseMove} onMouseOver={onMouseOver}><img style={{height:"4em"}} src={'/images/'+path+'/'+data.value+".png"}/></div>
      );
    }
    const SingleValue = (props) => {
      if(option.value) {
        return (
          <img  ref={props.innerRef} props={props.innerProps} style={{height:"100%"}} src={'/images/'+path+'/'+props.data.value+".png"}/>

        );
      }
    }
    console.log("IMAGESELECT", options);
    return (
		<Select
			onInputChange={(inputValue) => this._inputValue = inputValue}
			options={options}
			components={{Option, SingleValue}}
			value={value}
			onChange={onChange}
		/>
    );
  }
}

ImageSelect.defaultProps = {
    title: '',
    options: {},
    onChange: ()=>{},
    value: ''
};

ImageSelect.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  path: PropTypes.string.isRequired
};

module.exports =  ImageSelect;
