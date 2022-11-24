import React, { useEffect, useState } from 'react';

import './App.css';
import WordCloudView from '../src/component/WordCloudView';
import Input from '../src/component/Input';
import Output from '../src/component/Output';
// import cloud1 from './cloud1.png'
import cloud2 from './cloud2.png'

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      keywordInput: ""
    }
  }

  onKeywordSubmit = (event, keywords) => {
    this.setState({ keywordInput: keywords })
    console.log(keywords)
    event.preventDefault()
  }

  render() {
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
              <Input onKeywordSubmit={this.onKeywordSubmit}/>
              <WordCloudView keywords={this.state.keywordInput}/>
            </div>
          </div>
      </div>
    );    
  }

}