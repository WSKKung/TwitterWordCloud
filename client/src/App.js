import React from 'react';
import Header from './components/Header';
import KeywordForm from './components/KeywordForm';
import WordCloudDisplay from './components/WordCloudDisplay';
import "./styles/App.css"

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <KeywordForm />
        <WordCloudDisplay />
      </div>
    );
  }

}
