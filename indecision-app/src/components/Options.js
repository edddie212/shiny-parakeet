import React from 'react';
import Option from "./Option";

const Options = (props)=> {
    return <div>
        <div className='widget-header'>
            <h3 className='widget-header__title'>Your Options</h3>
            <br/>

        <button
            className='button button--link'
            onClick={props.handleDeleteOptions}>
            Remove All
        </button>
     </div>
        {
            props.options.map((option, index) => (
                <Option
                    key={option}
                    optionText={option}
                    count={++index}
                    handleDeleteOption={props.handleDeleteOption}
                />
            ))
        }
        {  props.options.length === 0 && <p className='widget__message'>Please add options to the list.</p> }
    </div>
        }

export default Options;