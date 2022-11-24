import "../styles/KeywordForm.css"
import React from "react"

export default class KeywordForm extends React.Component {

	constructor() {
		super()
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
		alert(this.state.keywordInput)
		event.preventDefault()
	}

	render() {
		return (
			<header className="KeywordForm">
				<form onSubmit={this.submitForm}>
					<input className="Input" type="Inputheader" value={this.state.keywordInput} onChange={this.updateKeywordInput} name="keywords" />
					<input className="SubBTN" type="submit" value="create" />
				</form>
			</header>
		)
	}
}