import React, { useState } from 'react';

import './App.css';
import Header from './component/Header';
import Input from './component/Input';
import Post from './component/Output';

let id = 1;

function App() {
  const [tags, setPosts] = useState([]);

  function addPost(newPost) {
    setPosts([{ id, title: newPost }, ...tags]);
    id += 1;
  }

  

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