import React from 'react';
import PropTypes from 'prop-types';

function Output({id, title}) {
    return (
        <div className='Container'>
            <div className='box'>
                <div className='Output_name'>{title}</div>
                <img className='Output_image'  
                src={`https://source.unsplash.com/random?sig=${id}`}
                alt="image"/>
            </div>
        </div>
    )
}

Output.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
};

export default Output;