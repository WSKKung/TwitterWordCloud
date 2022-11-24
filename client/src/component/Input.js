
import React from "react"

export default class KeywordForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			keywordInput: ""
		}
	}

	updateKeywordInput = (event) => {
		this.setState({ keywordInput: event.target.value })
	}

	submitForm = (event) => {
    this.props.onKeywordSubmit(event)
	}

	render() {
    return (
      <div>
        <header className='Header'>
              <img className='logo' src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png" alt=""></img>
                Word Cloud API
        </header>
        <div className='Container'>
          <div>
            <div className='Inputheader'> KEYWORD(S) </div>
            <form onSubmit={(event) => this.props.onKeywordSubmit(event, this.state.keywordInput)}>
              <input className="Input" type="Inputheader" value={this.state.keywordInput} onChange={this.updateKeywordInput} name="keywords" />
              <input className="btnInput" type="submit" value="create" />
            </form>
          </div>
        </div>
      </div>
      
    );   
  }
}


