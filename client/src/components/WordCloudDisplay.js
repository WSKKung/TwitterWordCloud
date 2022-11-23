import React from "react";

export default class WordCloudDisplay extends React.Component {
	constructor() {
		super()
		this.state = {
			imageURL: ""
		}
	}

	async fetchImage() {
		let res = await fetch("https://i.imgur.com/fHyEMsl.jpg")
		let imgBlob = await res.blob()
		let imageObjectURL = URL.createObjectURL(imgBlob)
		this.setState({ imageURL: imageObjectURL })
	}

	render() {
		this.fetchImage()
		return (
		<p>
			<img src={this.state.imageURL}></img>
		</p>
		)
	}
}