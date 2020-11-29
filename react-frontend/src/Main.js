import React from 'react';
import './App.css';
import ContentEditable from 'react-contenteditable';
import ReactPlayer from 'react-player'
import axios from 'axios';



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
        this.exportHTML = this.exportHTML.bind(this);
        // this.findVideo = this.findVideo.bind(this);
    }

    exportHTML(){
       var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
       var footer = "</body></html>";
       var sourceHTML = header+document.getElementById("source-html").innerHTML+footer;

       var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
       var fileDownload = document.createElement("a");
       document.body.appendChild(fileDownload);
       fileDownload.href = source;
       fileDownload.download = 'YTsummary.docx';
       fileDownload.click();
       document.body.removeChild(fileDownload);
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
            axios.post('https://aga-sum.herokuapp.com/flask-backend/wiki', data)
            // fetch('/flask-backend/wiki', {
            //     method: 'POST', // or 'PUT'
            //     headers: {
            //     'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data),
            // })
            .then(response => response['data'])
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
                        {component}
                        <div className="row video-info-container">
                            <div>
                                <h5 className="subtitle"> {this.props.title }</h5>
                                <br/>
                            </div>

                        </div>
                        <hr/>
                        <div className="row complexity-info-container">
                            <div className="row">
                            <div className="col-7">
                                <h4 className="subtitle">Level of Detail</h4>
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

                            <button type="button" className="btn btn-success mr-1" id="btn-export" onClick={() => this.exportHTML()}>Export</button>
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
                                <div class="border-bottom"> <h4 class="d-flex justify-content-center">Summary</h4>
                                  <i class="d-flex justify-content-center">Click to navigate and double-click to see the definition.</i>
                                </div>
                                <div class="container pt-3">
                                <ContentEditable
                                innerRef={this.ContentEditable}
                                id = 'source-html'
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
            </div>
        );
    }
}

export default Main;
