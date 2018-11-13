import React from 'react';
import PropTypes from 'prop-types';
import Editor from "./Editor";

const render = (props) => {
    return (
        <div className="Edit">
            <Editor {...props}/>
        </div>
    );
};

module.exports =  render;
