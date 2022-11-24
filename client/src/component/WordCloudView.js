import React from "react";
import ReactWordcloud from "react-wordcloud";
import axios from "axios";

const wordcloudOptions = {
	colors: ["#1f77b4", "#FF0000"],
	enableTooltip: true,
	deterministic: true,
	fontFamily: "impact",
	fontSizes: [16, 128],
	fontStyle: "normal",
	fontWeight: "normal",
	padding: 1,
	rotations: 0,
	scale: "linear",
	spiral: "archimedean",
	transitionDuration: 0
  };

export default class WordCloudDisplay extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			words: []
		}
	}

	async fetchWordCount() {
		console.log("Fetching from " + this.props.keywords + "... ")
		if (!this.props.keywords) return
		let res = await axios.post(
			"http://localhost:5000/api/word_cloud", 
			{ keywords: this.props.keywords },
			{ headers: { "Content-Type": "multipart/form-data" } }
		)
		this.setState({ words: res.data })
	}

	render() {
		return (
			<div style={{
				display: 'flex',
				'justify-content': 'center',
			}}>
				<div className="wordCloudDisplay" style={{
					width: 600,
					height: 600,
				}}>
					<ReactWordcloud words={this.state.words} options={wordcloudOptions} />
				</div>
			</div>
		)
	}

	componentDidMount() {
		this.fetchWordCount()
	}
}