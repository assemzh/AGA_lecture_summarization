import React from 'react';
import './App.css';
import ContentEditable from 'react-contenteditable';
import ReactPlayer from 'react-player'



class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            detail: "Medium",
            mouseOverTimeout: false,
            selectedWord: null,
            wikiDefinition:null,
            wikiLink:null,
            showVideo: false,
            pressCount: 0
        }

        this.ContentEditable = React.createRef();
        this.hoverSpan = this.hoverSpan.bind(this);
        this.moveVideo = this.moveVideo.bind(this);
        this.setTimer = this.setTimer.bind(this);
        this.handleImagePress = this.handleImagePress.bind(this);
        // this.findVideo = this.findVideo.bind(this);
    }

    handleImagePress(event) {
    const DOUBLECLICK_TIMEOUT = 300;
    this.setState({ pressCount: this.state.pressCount+1 });

        setTimeout(() => {
            if (this.state.pressCount === 0) { return }

            if (this.state.pressCount === 1) {
            this.moveVideo(event);
            } else if (this.state.pressCount === 2) {
            this.hoverSpan(event);
            }

            this.setState({ pressCount: 0 });
        }, DOUBLECLICK_TIMEOUT);

    }

    setTimer() {
        console.log("setTimer");
        this.setState({hoverTimer: new Date()});
    }

    // IT CAN GET THE TEXT INSIDE THE SPAN, SO PUT EVERY WORD INSIDE A SPAN
    hoverSpan(event) {
        if (event.target.nodeName === "SPAN") {
            // var timestamp = event.target.className;
            // this.navigateTo(timestamp);

            console.log(" Input to wiki:");
            // console.log({selectedWord: event.target.textContent});
            const data = {selectedWord: event.target.textContent};

            fetch('/flask-backend/wiki', {
                method: 'POST', // or 'PUT'
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data["url"]);
                this.setState({selectedWord: data["keyword"]})
                this.setState({wikiDefinition: data["result"]})
                this.setState({wikiLink: data["url"]})
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        }
    }

    moveVideo(event) {
        if (event.target.nodeName === "SPAN") {
            var timestamp = event.target.className;
            if (timestamp !== "undefined") {
              console.log(timestamp)
              this.navigateTo(timestamp);
            }else{
              console.log("Null timestamp")
            }
        }
    }

    componentDidMount() {
        // console.log(this.ContentEditable.current);
        this.ContentEditable.current.addEventListener("click", this.handleImagePress);
        // this.ContentEditable.current.addEventListener("dblclick", this.hoverSpan);
        // this.ContentEditable.current.addEventListener("mouseover", this.hoverSpan);
    }

    handleClick(name) {
      // console.log(name);
      this.setState({detail: name});
      this.props.setDetail(name);


    }

    findVideo(url) {
        url = url.replace("watch?v=", "embed/")
        // console.log("findVideo")
        // var vid = url.split('v=')[1]
        // var ampersandPosition = vid.indexOf('&')
        // if(ampersandPosition !== -1) {
        //     vid = vid.substring(0, ampersandPosition)
        // }
        var component = <div className="row video-container">
                            <ReactPlayer ref={player => {this.player = player}}
                                        url = {this.props.url}
                                        onSeek = {this.handleSeek}
                                        playing
                                        controls
                                        width='100%'
                                        height='100%'
                                        // onSeek={(e)=>console.log('onSeek', e)}
                                        />
                        </div>
        return component
    }

    handleSeek = p => {
        // console.log('handleSeek', this.player.current)
        this.player.setState({ seeking: true })
        // this.player.seekTo(parseFloat(e.target.value))
        // if(this.player.current !== null) {
        //     console.log('seeking to', p)
        this.player.seekTo(p)
        // }
        setTimeout(()=>this.player.setState({ seeking: false }), 800)
    }

    navigateTo(ts) {
        // console.log(ts, this.player)
        if (!this.state.showVideo) {
            this.setState({showVideo: true})
        }
        if (this.player){
            // console.log('HERE', this.player)
            this.player.props.onSeek(ts)
            // var total = this.player.current.getDuration()
            // console.log('total', total)
            // this.player.seekTo(ts/total, )
            // this.player.seekTo(ts)
        }

    }
    render() {
        var component = this.findVideo(this.props.url)
        var btns = ["Low", "Medium", "High"];
        // console.log('main', this.props.url)
        return (
            <div className="container-fluid min-vh-100">
                <div className="row">
                    <div className="col-6 video-col">
                        {/* <div className="row video-container">
                            <iframe title="video"
                            src="https://www.youtube.com/embed/tgbNymZ7vqY"
                            className="video"/>
                        </div> */}
                        {component}
                        <div className="row video-info-container">
                            <div>
                                <h4 className="subtitle">Title</h4>
                                Author
                                <br/>
                                # Visualizations
                            </div>

                        </div>
                        <hr/>
                        <div className="row complexity-info-container">
                            <div className="row">
                            <div className="col-7">
                                <h2 className="subtitle">Level of Detail</h2>
                                How summarized you want your lecture to be
                            </div>
                            <div className="col-4">
                                <div className="col-btn">
                                    {btns.map((name, idx) => (
                                        <button type="button" key={"btn" + name}
                                        className={(name === this.state.detail)? "btn btn-light detail-btn" : "btn btn-dark detail-btn"}
                                        onClick={() => this.handleClick(name)}>
                                            {name}
                                        </button>
                                    ))}
                                    {/* <button type="button" className="btn btn-light detail-btn">Low</button>
                                    <button type="button" className="btn btn-light detail-btn">Medium</button>
                                    <button type="button" className="btn btn-light detail-btn">High</button> */}
                                </div>
                            </div>
                            </div>

                        </div>
                        <hr/>
                        {/* <div className="col-btn">
                                <button type="button" key={"btnSummarize"}
                                className={"btn btn-light detail-btn"}
                                onClick={this.props.createSpanSummary}>
                                    Summarize
                                </button>
                        </div> */}

                    </div>
                    <div className="col-6 text-col">
                        <div className="container">
                            <div className="summary-header">
                                <button type="button" className="btn btn-danger"
                                onClick={() => this.props.setPage("edit")}>Show Original Text</button>
                            </div>
                            <div className="summary">
                            {(this.state.selectedWord !== null) ?
                                <div className="container-fluid add-info">
                                    <h3 className="subtitle title-add-info">{this.state.selectedWord}</h3>
                                    <button type="button" className="btn btn-danger btnEdit btn-add-info"
                                        onClick={() => this.setState({selectedWord: null})}>Close</button>
                                    <div>
                                        <i>{this.state.wikiDefinition}</i>
                                    </div>
                                    <div>
                                        Learn more on  <a href={this.state.wikiLink}>Wikipedia</a>.
                                    </div>
                                </div>
                                :
                                <div/>
                                }
                                <ContentEditable
                                innerRef={this.ContentEditable}

                                // html={this.props.summary}
                                html={(this.props.sentSpan === undefined) ? "Summarizing..." : this.props.sentSpan}
                                // disabled={false}
                                disabled={true}
                                onChange={this.props.editSummary}/>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
