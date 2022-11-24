import React, { useState } from 'react';

import './App.css';
import Header from '../../src/component/Header';
import Input from '../../src/component/Input';
import Post from '../../src/component/Output';

let id = 1;

function App() {
  

  return (
    <>
    <div>
      <Header/>
      <div className="App">
        <div className='AppContainer'>
          <Input addPost={addPost}/>
          {tags.map((post) => (
          <Post
            id={post.id}
            title={post.title}
          />
            ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;