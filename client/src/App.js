import React, { useState } from 'react';

import './App.css';
// import Input from '../src/component/Input';
import Post from '../src/component/Output';
// import cloud1 from './cloud1.png'
import cloud2 from './cloud2.png'

function App() {
  return (
    <>
    <div>
      {/* <embed src={} loop="true" autostart="true" width="2"
         height="0"> */}
      <div className="App">
      <img className='cloud1 cloud11' src={cloud2}/>
      <img className='cloud1 cloud12' src={cloud2}/>
      <img className='cloud1 cloud13' src={cloud2}/>
        <div className='AppContainer'>
        <img className='cloud2 cloud14' src={cloud2}/>
        <img className='cloud2 cloud15' src={cloud2}/>
          <div className="content">
            {/* <Input/> */}
            <Post/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;