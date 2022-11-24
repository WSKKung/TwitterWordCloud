import React from "react";
import ReactWordcloud from "react-wordcloud";
import axios from "axios";



export default class WordCloudDisplay extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			words: []
		}
	}

	wordcloudOptions = {
		colors: ["#1f77b4", "#FF0000"],
		enableTooltip: true,
		deterministic: true,
		fontFamily: "impact",
		fontSizes: [8, 100],
		fontStyle: "normal",
		fontWeight: "normal",
		padding: 1,
		rotations: 0,
		scale: "linear",
		spiral: "archimedean",
		transitionDuration: 0
	};

	fetchWordCount = async () => {
		console.log("Fetching from " + this.props.keywords + "... ")
		if (!this.props.keywords) return
		axios.post(
			"http://localhost:5000/api/word_cloud", 
			{ keywords: this.props.keywords },
			{ headers: { "Content-Type": "multipart/form-data" } }
		).then(res => {
			this.setState({ words: res.data })
		})
		
	}

	render() {
		return (
			<div style={{
				display: 'flex',
				justifyContent: 'center',
			}}>
				<div style={{ width: 600, height: 600 }}>
					<ReactWordcloud words={this.state.words} size={[ 600, 600 ]} options={this.wordcloudOptions} />
				</div>
			</div>
		)
	}

	componentDidUpdate(prevProps) {
		if (this.props.keywords && prevProps.keywords !== this.props.keywords) {
			this.fetchWordCount();
			alert("Fetching " + this.props.keywords)
		}
	}

}