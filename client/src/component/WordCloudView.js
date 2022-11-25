import React from "react";
import ReactWordcloud from "react-wordcloud";
import axios from "axios";
import folder from './PictureFolderIcon.png'
import loader from './Loading.png'
import Error from './Alert.png'
import notFound from './ImageNotFound.png'
import './Loading.css';


export default class WordCloudDisplay extends React.Component {

	statuses = {
		IDLE: "idle",	// ยังไม่ได้ไส่ input
		LOADING: "loading", // ไส่ input กำลังสร้าง word cloud
		ERROR: "error", // เกิด error
		SUCCESS: "sucess", // สร้าง word cloud จาก input สำเร็จ
		SUCCESS_EMPTY_VALUE: "success_empty_value" // สำเร็จ แต่ word cloud ว่างเปล่า
	}

	constructor(props) {
		super(props)
		this.state = {
			words: [],
			status: this.statuses.IDLE,
			loading: false
		}
	}

	wordcloudRenderOptions = {
		colors: ["#38aecc", "#0090c1", "#183446", "#046e8f"],
		enableTooltip: true,
		deterministic: true,
		fontFamily: "impact, Lucida Console, Monospace",
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
		this.setState({ status: this.statuses.LOADING })
        this.setState({ loading: true })
        // request word count from backend server
        axios.post(
            "https://twitter-word-cloud-dblk.vercel.app/api/word_cloud", 
            { keywords: this.props.keywords },
            { headers: { "Content-Type": "multipart/form-data" } }
        )
		.then(res => {
            this.setState({ 
				words: res.data, 
				status: res.data.length > 0 ? this.statuses.SUCCESS : this.statuses.SUCCESS_EMPTY_VALUE,
				loading: false 
			})
        })
		.catch(err => {
            console.log(err)
            alert(err.message)
            this.setState({
				words: [], 
				status: this.statuses.ERROR,
				loading: false 
			})
        })
	}

	render() {

		switch (this.state.status) {

			// idle
			case this.statuses.IDLE:

				return (
					<div style={{ display: 'flex', justifyContent: 'center',}}>
						<div style={{ width: 600, height: 600, zIndex: 40,display: 'flex',flexDirection:"column",justifyContent: 'center',alignItems: "center"}}>
							Waiting for input...
							<img className="img" src={folder}/>
						</div>
					</div>
				)

			// loading
			case this.statuses.LOADING:

				return (
					<div style={{ display: 'flex', justifyContent: 'center',
					}}>
						<div style={{ width: 600, height: 600, zIndex: 40,display: 'flex',flexDirection:"column",justifyContent: 'center',alignItems: "center"}}>
							Loading...
							<img className="img rotate" src={loader}/>
						</div>
					</div>
				)

			// error
			case this.statuses.ERROR:

				return (
					<div style={{ display: 'flex', justifyContent: 'center',
					}}>
						<div style={{ width: 600, height: 600, zIndex: 40,display: 'flex',flexDirection:"column",justifyContent: 'center',alignItems: "center"}}>
							Error!!!
							<img className="img" src={Error}/>
						</div>
					</div>
				)

			// success
			case this.statuses.SUCCESS:

				return (
					<div style={{
						display: 'flex',
						justifyContent: 'center',
					}}>
						<div className="WordCloudContainer">
							<ReactWordcloud words={this.state.words} size={[ 580, 580 ]} options={this.wordcloudRenderOptions} />
						</div>
					</div>
				)

			// success but empty word cloud
			case this.statuses.SUCCESS_EMPTY_VALUE:

				return (
					<div style={{ display: 'flex', justifyContent: 'center',
					}}>
						<div style={{ width: 600, height: 600, zIndex: 40,display: 'flex',flexDirection:"column",justifyContent: 'center',alignItems: "center"}}>
							{'I cant found any tweets with the specified keywords :^('}
							<img className="img" src={notFound}/>
						</div>
					</div>
				)
		}

	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.keywords && prevProps.keywords !== this.props.keywords) {
			this.fetchWordCount();
		}
	}

}