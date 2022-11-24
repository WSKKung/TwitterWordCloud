import "../styles/KeywordForm.css"
import React from "react"

export default class KeywordForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			keywordInput: ""
		}
		this.updateKeywordInput = this.updateKeywordInput.bind(this)
		this.submitForm = this.submitForm.bind(this)
	}

	updateKeywordInput(event) {
		this.setState({ keywordInput: event.target.value })
	}

	submitForm(event) {
		event.preventDefault()
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
            <form onSubmit={() => this.props.onSubmit(this.state.keywordInput)}>
              <input className="Input" type="Inputheader" value={this.state.keywordInput} onChange={this.updateKeywordInput} name="keywords" />
              <input className="btnInput" type="submit" value="create" />
            </form>
          </div>
        </div>
      </div>
      
    );   
  }
}


