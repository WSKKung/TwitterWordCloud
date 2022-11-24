import React from "react";
import ReactWordcloud from "react-wordcloud";
import axios from "axios";



export default class WordCloudDisplay extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			words: [],
			loading: false
		}
	}

	wordcloudOptions = {
		colors: ["#38aecc", "#0090c1", "#183446", "#046e8f"],
		enableTooltip: true,
		deterministic: true,
		fontFamily: "impact",
		fontSizes: [8, 100],
		fontStyle: "normal",
		fontWeight: "normal",
		padding: 1,
		rotations: 0,
		scale: "log",
		spiral: "archimedean",
		transitionDuration: 0
	};

	fetchWordCount = async () => {
		console.log("Fetching for " + this.props.keywords + "... ")
		if (!this.props.keywords) return
		this.setState({ loading: true })
		axios.post(
			"http://localhost:5000/api/word_cloud", 
			{ keywords: this.props.keywords },
			{ headers: { "Content-Type": "multipart/form-data" } }
		).then(res => {
			this.setState({ words: res.data, loading: false })
		}).catch(err => {
			console.log(err)
			alert(err.message)
		})
		
	}

	render() {
		if (this.state.loading) {
			return (
				<div style={{
					display: 'flex',
					justifyContent: 'center',
				}}>
					<div style={{ width: 600, height: 600 }}>
						Loading...
					</div>
				</div>
			)
		}
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

	componentDidUpdate(prevProps, prevState) {
		if (this.props.keywords && prevProps.keywords !== this.props.keywords) {
			this.fetchWordCount();
		}
	}

}