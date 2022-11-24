import React, { useState } from 'react';

import './App.css';
import WordCloudView from '../src/component/WordCloudView';
import Input from '../src/component/Input';
import Output from '../src/component/Output';
// import cloud1 from './cloud1.png'
import cloud2 from './cloud2.png'

function App() {

  const [keywordInput, setKeywordInput] = useState()

  return (
    <div className="App">
      {/* <embed src={} loop="true" autostart="true" width="2"
         height="0"> */}
      <img className='cloud1 cloud11' src={cloud2}/>
      <img className='cloud1 cloud12' src={cloud2}/>
      <img className='cloud1 cloud13' src={cloud2}/>
        <div className='AppContainer'>
        <img className='cloud2 cloud14' src={cloud2}/>
        <img className='cloud2 cloud15' src={cloud2}/>
          <div className="content">
            <Input/>
            <WordCloudView/>
          </div>
        </div>
    </div>
  );
}

export default App;