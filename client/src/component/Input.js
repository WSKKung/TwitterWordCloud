import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Input({ addPost }) {
  const [input, setInput] = useState('');

  function onChange(event) {
    setInput(event.target.value);
  }

  function onKeyDown(event) {
    const newPost = event.target.value;
    if (event.key === 'Enter' && newPost) {
      addPost(newPost);
      setInput('');
    }
  }

  return (
    <div className='Container'>
        <div>
          <header className='Header'>
            <img className='logo' src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png" alt=""></img>
              Word Cloud API
            </header>
            <div className='Inputheader'> KEYWORD(S) </div>
            <input 
                className='Input' 
                type="text" 
                placeholder="#HASHTAG" 
                value={input}
                onChange={onChange}
                onKeyDown={onKeyDown}
				        
            />
            <button type="submit" className='btnInput' >
              CREATE
            </button>
        </div>
    </div>
  );
}

Input.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default Input;