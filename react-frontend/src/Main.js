import React from 'react';
import './App.css';
import ContentEditable from 'react-contenteditable';



class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            detail: "Medium",
            mouseOverTimeout: false,
            selectedWord: null,
            wikiDefinition:null,
            wikiLink:null,
        }

        this.ContentEditable = React.createRef();
        this.hoverSpan = this.hoverSpan.bind(this);
        // this.findVideo = this.findVideo.bind(this);
    }

    // IT CAN GET THE TEXT INSIDE THE SPAN, SO PUT EVERY WORD INSIDE A SPAN
    hoverSpan(event) {
        if (event.target.nodeName === "SPAN") {
            // console.log(event.target.textContent);
            // this.setState({selectedWord: event.target.textContent})
            // if (this.state.mouseOverTimeout) {
            //     clearTimeout(this.state.mouseOverTimeout);
            // }

            // this.mouseOverTimeout = setTimeout(() => {
            //     console.log(event.target.textContent);
            //     this.setState()
            //     this.state.mouseOverTimeout = false;
            // }, 1000)
            console.log(" Input to wiki:");
            console.log({selectedWord: event.target.textContent});
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
              console.log(data["url"]);
              this.setState({selectedWord: data["keyword"]})
              this.setState({wikiDefinition: data["result"]})
              this.setState({wikiLink: data["url"]})
            })
            .catch((error) => {
              console.error('Error:', error);
            })
        }
    }

    componentDidMount() {
        console.log(this.ContentEditable.current);
        this.ContentEditable.current.addEventListener("dblclick", this.hoverSpan);
    }

    handleClick(name) {
      console.log(name);
      this.setState({detail: name});
      this.props.setDetail(name);


    }

    findVideo(url) {
        url = url.replace("watch?v=", "embed/")
        var component = <div className="row video-container">
                            <iframe title="video"
                            src={url}
                            className="video"/>
                        </div>
        return component
    }

    render() {

        var btns = ["Low", "Medium", "High"];
        console.log('main', this.props.url)
        var component = this.findVideo(this.props.url)
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
                        <div className="col-btn">
                                <button type="button" key={"btnSummarize"}
                                className={"btn btn-light detail-btn"}
                                onClick={this.props.createSpanSummary}>
                                    Summarize
                                </button>
                        </div>

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
                                html={this.props.summary}
                                disabled={false}
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
